#!/usr/bin/env node

import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const MAX_PACKAGE_BYTES = 30 * 1024 * 1024;
const MAX_CSS_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_EDGE = 8192;
const MAX_IMAGE_PIXELS = 24_000_000;
const SAFE_ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const ASSET_TYPES = new Map([
  ['image/png', '.png'],
  ['image/jpeg', ['.jpg', '.jpeg']],
  ['image/webp', '.webp'],
]);

function imageDimensions(bytes, mimeType) {
  let width = 0;
  let height = 0;
  if (mimeType === 'image/png') {
    if (bytes.length < 24 || bytes.toString('ascii', 12, 16) !== 'IHDR') fail('Artwork PNG header is truncated or invalid');
    width = bytes.readUInt32BE(16);
    height = bytes.readUInt32BE(20);
    let offset = 8;
    while (offset + 12 <= bytes.length) {
      const length = bytes.readUInt32BE(offset);
      const kind = bytes.toString('ascii', offset + 4, offset + 8);
      if (kind === 'acTL') fail('Animated PNG assets are not supported');
      if (length > bytes.length - offset - 12 || kind === 'IEND') break;
      offset += length + 12;
    }
  } else if (mimeType === 'image/jpeg') {
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      if (bytes[offset] !== 0xff) { offset += 1; continue; }
      while (bytes[offset] === 0xff) offset += 1;
      const marker = bytes[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > bytes.length) break;
      const length = bytes.readUInt16BE(offset);
      if (length < 2 || offset + length > bytes.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        if (length < 7) break;
        height = bytes.readUInt16BE(offset + 3);
        width = bytes.readUInt16BE(offset + 5);
        break;
      }
      offset += length;
    }
  } else if (mimeType === 'image/webp') {
    const chunk = bytes.toString('ascii', 12, 16);
    if (chunk === 'VP8X' && bytes.length >= 30) {
      if (bytes[20] & 0x02) fail('Animated WebP assets are not supported');
      width = 1 + bytes.readUIntLE(24, 3);
      height = 1 + bytes.readUIntLE(27, 3);
    } else if (chunk === 'VP8L' && bytes.length >= 25 && bytes[20] === 0x2f) {
      width = 1 + bytes[21] + ((bytes[22] & 0x3f) << 8);
      height = 1 + ((bytes[22] & 0xc0) >> 6) + (bytes[23] << 2) + ((bytes[24] & 0x0f) << 10);
    } else if (chunk === 'VP8 ' && bytes.length >= 30 && bytes[23] === 0x9d && bytes[24] === 0x01 && bytes[25] === 0x2a) {
      width = bytes.readUInt16LE(26) & 0x3fff;
      height = bytes.readUInt16LE(28) & 0x3fff;
    }
  }
  if (!width || !height || width > MAX_IMAGE_EDGE || height > MAX_IMAGE_EDGE || width * height > MAX_IMAGE_PIXELS) {
    fail('Artwork dimensions are missing, unsupported, or exceed the safe image limit');
  }
  return { width, height };
}

function fail(message) {
  throw new Error(message);
}

function safeAsset(asset, label, required = false) {
  if (asset == null && !required) return null;
  if (!asset || typeof asset !== 'object') fail(`${label} is missing or invalid`);
  const extension = ASSET_TYPES.get(asset.mimeType);
  if (!extension) fail(`${label} has an unsupported image type`);
  if (typeof asset.filename !== 'string' || !SAFE_FILENAME.test(asset.filename) || asset.filename === '.' || asset.filename === '..') {
    fail(`${label} filename is unsafe`);
  }
  const extensions = Array.isArray(extension) ? extension : [extension];
  if (!extensions.some((value) => asset.filename.toLowerCase().endsWith(value))) fail(`${label} filename does not match its MIME type`);
  if (typeof asset.base64 !== 'string' || asset.base64.length > MAX_PACKAGE_BYTES * 1.4 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(asset.base64)) {
    fail(`${label} data is not valid base64`);
  }
  const bytes = Buffer.from(asset.base64, 'base64');
  if (!bytes.length || bytes.toString('base64') !== asset.base64) fail(`${label} data is empty or non-canonical`);
  if (asset.mimeType === 'image/png' && !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) fail(`${label} PNG signature is invalid`);
  if (asset.mimeType === 'image/jpeg' && !(bytes[0] === 0xff && bytes[1] === 0xd8)) fail(`${label} JPEG signature is invalid`);
  if (asset.mimeType === 'image/webp' && !(bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP')) fail(`${label} WebP signature is invalid`);
  const dimensions = imageDimensions(bytes, asset.mimeType);
  return { filename: asset.filename, bytes, dimensions };
}

function validateCssResources(css, artFilename) {
  // CSS escapes are unnecessary in generated themes and make raw-text checks ambiguous.
  if (css.includes('\\')) fail('Theme CSS escapes are not supported');
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  if (/\/\*|\*\//.test(withoutComments)) fail('Theme CSS contains an unterminated comment');
  const compact = withoutComments.replace(/\s+/g, '').toLowerCase();
  if (compact.includes('@import')) fail('Theme CSS imports are not supported');
  const urls = [...withoutComments.matchAll(/u\s*r\s*l\s*\(([^)]*)\)/gi)];
  const normalized = urls.map((match) => match[1].trim().replace(/^(["'])(.*)\1$/, '$2').trim());
  if (normalized.some((value) => value !== `./assets/${artFilename}`)) {
    fail('Theme CSS may reference only its bundled local artwork');
  }
  const noUrlFunctions = withoutComments.replace(/u\s*r\s*l\s*\([^)]*\)/gi, '');
  if (/https?\s*:|javascript\s*:|file\s*:|data\s*:/i.test(noUrlFunctions)) {
    fail('Theme CSS contains a remote or executable resource');
  }
}

function validatePackage(pkg) {
  if (!pkg || pkg.format !== 'codex-theme' || pkg.schemaVersion !== 1) fail('Unsupported Codex theme package format');
  const manifest = pkg.manifest;
  if (!manifest || typeof manifest !== 'object' || !SAFE_ID.test(manifest.id ?? '')) fail('Theme ID is missing or unsafe');
  if (typeof manifest.displayName !== 'string' || !manifest.displayName.trim() || manifest.displayName.length > 120) fail('Theme display name is missing or too long');
  if (!['light', 'dark'].includes(manifest.mode)) fail('Theme mode must be light or dark');
  if (typeof pkg.css !== 'string' || Buffer.byteLength(pkg.css, 'utf8') > MAX_CSS_BYTES) fail('Theme CSS is missing or too large');
  if (/expression\s*\(/i.test(pkg.css)) fail('Theme CSS contains an unsupported executable expression');
  if (!pkg.css.includes(`:root[data-codexthemes-theme="${manifest.id}"]`)) fail('Theme CSS does not match the package ID');
  const art = safeAsset(pkg.art, 'Artwork', true);
  const preview = safeAsset(pkg.preview, 'Preview');
  validateCssResources(pkg.css, art.filename);
  return { manifest, art, preview };
}

async function writeNewFile(filename, contents) {
  await fs.writeFile(filename, contents, { flag: 'wx', mode: 0o600 });
}

async function readBounded(file, maxBytes) {
  const chunks = [];
  let total = 0;
  while (total <= maxBytes) {
    const buffer = Buffer.allocUnsafe(Math.min(64 * 1024, maxBytes + 1 - total));
    const { bytesRead } = await file.read(buffer, 0, buffer.length, null);
    if (bytesRead === 0) break;
    total += bytesRead;
    if (total > maxBytes) fail('Package must be a regular file smaller than 30 MB');
    chunks.push(buffer.subarray(0, bytesRead));
  }
  return Buffer.concat(chunks, total).toString('utf8');
}

async function install(packagePath) {
  const file = await fs.open(packagePath, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0));
  let pkg;
  try {
    const stat = await file.stat();
    if (!stat.isFile() || stat.size < 1 || stat.size > MAX_PACKAGE_BYTES) fail('Package must be a regular file smaller than 30 MB');
    pkg = JSON.parse(await readBounded(file, MAX_PACKAGE_BYTES));
  } finally {
    await file.close();
  }
  const { manifest, art, preview } = validatePackage(pkg);
  const libraryRoot = path.resolve(process.env.CODEX_THEMES_HOME || path.join(os.homedir(), '.codexthemes'));
  const themesRoot = path.join(libraryRoot, 'themes');
  const destination = path.join(themesRoot, manifest.id);
  await fs.mkdir(themesRoot, { recursive: true, mode: 0o700 });
  try {
    await fs.lstat(destination);
    fail(`Theme already exists and was not overwritten: ${destination}`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  const staging = await fs.mkdtemp(path.join(themesRoot, `.${manifest.id}.install-`));
  try {
    const assetsDir = path.join(staging, 'assets');
    await fs.mkdir(assetsDir, { mode: 0o700 });
    const cssFile = path.join(staging, 'theme.css');
    const artFile = path.join(assetsDir, art.filename);
    await writeNewFile(cssFile, pkg.css);
    await writeNewFile(artFile, art.bytes);

    const installedManifest = { ...manifest, css: 'theme.css', art: `assets/${art.filename}` };
    if (preview) {
      const previewsDir = path.join(staging, 'previews');
      await fs.mkdir(previewsDir, { mode: 0o700 });
      await writeNewFile(path.join(previewsDir, preview.filename), preview.bytes);
      installedManifest.preview = `previews/${preview.filename}`;
    } else {
      delete installedManifest.preview;
    }
    await writeNewFile(path.join(staging, 'theme.json'), `${JSON.stringify(installedManifest, null, 2)}\n`);
    const readme = typeof pkg.readme === 'string' ? pkg.readme.slice(0, 100_000) : `# ${manifest.displayName}\n`;
    await writeNewFile(path.join(staging, 'README.md'), readme);
    await fs.mkdir(path.join(staging, 'state'), { mode: 0o700 });
    const verification = { status: 'imported-unverified', importedAt: new Date().toISOString() };
    await writeNewFile(path.join(staging, 'state', 'verification.json'), `${JSON.stringify(verification, null, 2)}\n`);
    try {
      await fs.lstat(destination);
      fail(`Theme appeared during installation and was not overwritten: ${destination}`);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
    await fs.rename(staging, destination);
    return destination;
  } catch (error) {
    await fs.rm(staging, { recursive: true, force: true });
    throw error;
  }
}

const packagePath = process.argv[2];
if (!packagePath || process.argv.length !== 3) {
  console.error('Usage: node scripts/install-theme-package.mjs /path/to/theme.codex-theme');
  process.exitCode = 2;
} else {
  install(path.resolve(packagePath))
    .then((themePath) => console.log(JSON.stringify({ status: 'installed-unverified', themePath }, null, 2)))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    });
}

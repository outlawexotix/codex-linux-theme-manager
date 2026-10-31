# Codex Linux Theme Manager

A public Codex plugin marketplace for creating, finding, installing, applying, and repairing themes in the Linux desktop app. It includes ten portable themes with distinct worlds, color palettes, and system-font pairings.

## Install the plugin

```bash
codex plugin marketplace add outlawexotix/codex-linux-theme-manager
codex plugin add codex-linux-theme-manager@codex-linux-theme-manager
```

## Theme collection

| Theme | Mode | Visual direction | Display / body fonts |
|---|---|---|---|
| Feral Crown | Dark | Antlered beast in a cedar swamp | DejaVu Serif Condensed / IBM Plex Sans |
| Dawn of the Pantheon | Light | Solar gods above a cloud temple | Noto Serif Display / Lato |
| The Drowned Leviathan | Dark | Abyssal monster among kelp and coral | IBM Plex Serif / Noto Sans |
| Neon Perseid | Dark | Violet orbital city and cyan meteor trails | Space Grotesk / DM Mono |
| Celestial Foundry | Light | Planetary forge and copper starlight | IBM Plex Sans Condensed / Noto Serif |
| Briar of Eld | Light | Thorned citadel in an enchanted forest | Noto Serif / DejaVu Sans |
| Wyvern Atlas | Dark | Wyvern above moonlit storm peaks | IBM Plex Serif / DejaVu Sans Condensed |
| Pyrestone Titan | Dark | Fire titan, basalt, and molten rivers | DejaVu Serif / Lato |
| Glacier Oracle | Light | Glacial sanctuary beneath an aurora | Noto Sans Display / Liberation Serif |
| Tempest Canticle | Light | Lightning over a cloud cathedral | Lato / DejaVu Sans Mono |

The catalog at `plugins/codex-linux-theme-manager/themes/catalog.json` lists each theme's ID, palette, typography, package, and preview. Pyrestone Titan's package now includes a **1672 × 941 WebP backdrop** designed for widescreen displays; other themes retain their own bundled artwork. Each package also contains a desktop design preview. Previews are illustrative and are not screenshots of the live Codex app.

The font files are not bundled. Theme font families use Linux system fonts with generic fallbacks, so a missing family falls back to the corresponding system serif or sans font.

## Install and apply a theme

1. Ask `codex-theme-library` to list the bundled themes and install the chosen package.
2. The bundled importer validates package format, paths, CSS resources, image signatures, and size. It never runs package scripts and refuses to overwrite an existing theme ID.
3. Ask `codex-theme-operations` to apply the installed theme and verify the live status.

Example requests:

- “List the bundled themes and install Feral Crown.”
- “Apply Pyrestone Titan and verify home and conversation pages.”
- “Roll back the last theme switch.”
- “Restore Codex's native appearance.”

## Artwork scope and verification

Bundled artwork is designed for the home and conversation pages. The native app layout and controls remain in place, and system pages such as settings do not inherit workspace artwork. Theme application is session-based and is verified by the switcher across open pages; a theme package being present does not mean that it is active. If a theme fails the live readability check, the switcher reverts it automatically.

This repository does not collect gallery impressions, downloads, or activations. The proposed manual discovery experiments and their success measures are in `docs/theme-discovery-experiments.md`.

The plugin source is in `plugins/codex-linux-theme-manager/`. `.agents/plugins/marketplace.json` registers the repository as a Codex Git marketplace.

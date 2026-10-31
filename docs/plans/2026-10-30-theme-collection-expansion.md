# Implementation Plan: Ten Codex Theme Packages

## Overview
Add the approved ten-theme roster to the public Linux theme manager as portable packages with original artwork, distinct palettes, and typography. Keep editable theme source in `~/.codexthemes/themes/`; store only shareable `.codex-theme` exports in the repository.

## Requirements
- Five light and five dark themes across beasts, gods, monsters, science fiction, fantasy, mythical creatures, and elemental worlds.
- Unique palette and display/body font pairing per theme.
- Artwork applies only to verified home and conversation pages; native layout and controls remain intact.
- Include a safe way to install a bundled package into the user's managed theme library.
- Update the catalog, plugin instructions, and public repository docs.

## Architecture Changes
- `themes/*.codex-theme`: portable theme packages, embedded original art and design preview.
- `themes/catalog.json`: IDs, modes, color palettes, typography, and descriptions.
- `scripts/install-theme-package.mjs`: dependency-free, path-safe import into `~/.codexthemes/themes/`.
- `plugins/codex-linux-theme-manager/skills/codex-theme-library/SKILL.md`: bundled catalog and install workflow.
- Root and plugin `README.md`: roster, typography, install commands, and evidence limits.
- `docs/theme-discovery-experiments.md`: lightweight discovery experiments and success thresholds.

## Implementation Steps

### Phase 1: Author and validate theme sources — Minimum Viable
1. Create ten managed source folders with design contracts, manifests, CSS, and generated artwork.
   - File: `~/.codexthemes/themes/<theme-id>/`
   - Action: Add the approved light/dark palettes, font pairs, scoped artwork, and native-compatible CSS.
   - Why: Keep source editable in the theme creator's canonical library.
   - Dependencies: Approved roster.
   - Risk: Medium (CSS has not yet been applied in the live app).
2. Create desktop and narrow design previews; run the theme validator and export packages.
   - File: `~/.codexthemes/exports/<theme-id>.codex-theme`
   - Action: Export only themes that pass static validation; label previews as designs, not app screenshots.
   - Why: Supply reviewable, portable packages without claiming live verification.
   - Dependencies: Step 1.
   - Risk: Low.

### Phase 2: Bundle and install — Core Experience
3. Add the portable packages and catalog to the plugin repository.
   - File: `themes/`
   - Action: Include all ten exports plus a JSON catalog and palette/font roster.
   - Why: Make the approved collection discoverable in the public plugin.
   - Dependencies: Phase 1.
   - Risk: Low.
4. Add a safe local package importer and update library workflow.
   - Files: `scripts/install-theme-package.mjs`; `plugins/codex-linux-theme-manager/skills/codex-theme-library/SKILL.md`
   - Action: Reject unsafe IDs/paths, executable content, remote CSS, invalid assets, oversized packages, and overwrites; install atomically into the managed library.
   - Why: Let users activate bundled packages through the existing switcher workflow.
   - Dependencies: Step 3.
   - Risk: Medium (processes third-party package data).
5. Update plugin version and public documentation; document two manual discovery experiments.
   - Files: `.codex-plugin/plugin.json`, `README.md`, `docs/theme-discovery-experiments.md`
   - Action: Describe modes, palettes, fonts, installation, and measurable download/activation experiments.
   - Why: Make the collection and its validation status clear.
   - Dependencies: Steps 3–4.
   - Risk: Low.

## Verification Strategy
- Run the creator's static validator on all ten managed theme folders.
- Export all ten with the creator's package exporter and check each package size and embedded assets.
- Run Node syntax validation on the installer and inspect safety checks; do not execute unknown package contents.
- Live apply/readability and route checks are not part of this pass because the user asked to keep the current theme active; request approval before apply/restore QA.

## Success Criteria
- [x] Ten distinct portable packages, five light and five dark.
- [x] Each package has unique original artwork, palette, and available font pair.
- [x] All ten pass static validation and export under 30 MB.
- [x] Package importer rejects unsafe paths/resources/assets and stages complete installs; existing theme IDs are rejected.
- [x] Public docs explain the install workflow and the current visual-QA evidence level.
- [x] Live app remains on Gilded Reliquary; the ten new themes remain marked unverified pending apply approval.

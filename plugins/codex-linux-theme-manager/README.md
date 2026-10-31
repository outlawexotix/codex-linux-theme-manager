# Codex Linux Theme Manager

Create and manage visual themes for the Codex desktop app on Linux. The plugin provides three workflows and ten bundled theme packages.

## Skills

- **codex-theme-design** — define palettes and typography, create original artwork, and repair themes with page-specific visual checks.
- **codex-theme-operations** — apply or switch themes, verify live page status, roll back, or restore the native appearance.
- **codex-theme-library** — browse the bundled catalog, inspect packages, and install a selected theme into the user theme library.

## Bundled packages

The `themes/` directory contains ten `.codex-theme` packages. `themes/catalog.json` is the browseable index for their IDs, modes, descriptions, palettes, fonts, and previews. Every package embeds its artwork and a design preview. Pyrestone Titan's bundled artwork is 1672 × 941 WebP; the other themes keep their individually authored assets. Previews show design intent and are not screenshots of an applied Codex session.

The themes cover beasts, gods, monsters, science fiction, fantasy, mythical creatures, and elemental settings. Five use light palettes and five use dark palettes. Fonts rely on named Linux system families with generic fallbacks and are not included in the packages.

## Install a theme

Ask `codex-theme-library` to install one of the bundled themes. The installer writes to `~/.codexthemes/themes/<theme-id>/` and refuses to replace an existing theme. It validates package paths, CSS references, image types, and size; it does not execute package content.

Installation does not activate the theme. Ask `codex-theme-operations` to apply it, then confirm the live status. The supported switcher owns the reversible runtime and reports which open pages were themed. If a live readability check fails, it reverts the attempted theme. A running Codex instance may need to be relaunched only through the supported flow, which requires explicit approval.

## Theme boundaries

Bundled background art is scoped to home and conversation pages. Settings and other system surfaces stay outside the workspace artwork scope. Native layout, controls, and interactions are preserved. Applying a theme is complete only after the switcher confirms active status on the open pages; static validation and design previews alone do not prove live behavior.

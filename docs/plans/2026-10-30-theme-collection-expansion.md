# Ten-theme collection: delivery record

## Goal

Publish ten portable Codex Linux themes with original artwork, individual palettes, and distinct display/body font pairings. Keep editable theme sources in `~/.codexthemes/themes/`; commit only the shareable packages and the marketplace installer to this repository.

## Delivered

- Ten `.codex-theme` packages and a catalog with five light and five dark directions.
- Themes spanning beasts, gods, monsters, science fiction, fantasy, mythical creatures, and elemental settings.
- A local package installer that validates IDs, file paths, CSS resources, image types/dimensions, and package size; it rejects executable content and existing theme IDs.
- Three plugin skills for design/repair, operations, and package discovery/installation.
- Rewritten public repository and plugin documentation that distinguishes package installation from live activation and design previews from real-app screenshots.
- Pyrestone Titan package refresh, version 1.0.1: its 384 × 384 artwork was replaced by a 1672 × 941 WebP widescreen image. The editable source was statically validated, the theme passed the live readability gate on three open pages, and the export was refreshed.

## Verification evidence and limits

The Pyrestone Titan source validator reports no errors or warnings. The local Linux Codex switcher reports Pyrestone Titan active on three open pages with readability passing; its declared `workspace` scope applies artwork to home and conversation pages. This is evidence for that local theme session only, not a live verification of all ten packages on other machines.

The bundled design previews are illustrative previews, not screenshots of the running app. The discovery experiments in `docs/theme-discovery-experiments.md` remain proposals: no gallery impression, download, preference-study, or install-success analytics are collected by this repository.

## Repository layout

- `plugins/codex-linux-theme-manager/themes/*.codex-theme` — portable packages.
- `plugins/codex-linux-theme-manager/themes/catalog.json` — names, modes, palettes, font pairings, and preview names.
- `plugins/codex-linux-theme-manager/scripts/install-theme-package.mjs` — safe import into the local theme library.
- `plugins/codex-linux-theme-manager/skills/` — design, operations, and library workflows.

## Release checklist

- [x] Ten packages are represented in the catalog, balanced across light and dark modes.
- [x] The bundled importer validates package data and refuses overwrites.
- [x] Pyrestone Titan uses the higher-definition artwork in both its active local source and exported package.
- [x] Public docs describe installation, activation, artwork scope, fonts, and evidence limits.

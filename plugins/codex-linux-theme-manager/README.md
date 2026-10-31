# Codex Linux Theme Manager

A Linux-focused Codex plugin for creating, finding, installing, applying, verifying, repairing, and restoring themes. It includes ten portable theme packages spanning mythical creatures, beasts, gods, monsters, science fiction, fantasy, and elemental worlds.

## Skills

- **codex-theme-design** — visual contract, palettes and typography, original backdrop art, safe page selectors, and live-app repair.
- **codex-theme-operations** — Linux switching, conversation-page checks, explicit restart approval, status verification, rollback, and native restore.
- **codex-theme-library** — bundled theme catalog, package inspection, safe local installation, and confirmation that a theme is present.

## Included collection

Browse `themes/catalog.json` for names, color palettes, font pairs, and modes. Each `.codex-theme` package embeds its own original backdrop and design preview. There are five light and five dark options. Artwork is scoped to home and conversation pages. The included previews illustrate the design and are not verified Codex screenshots.

Font families use system fonts with generic serif/sans fallbacks. They were present on the authoring Linux system but are not bundled, so another installation may display a fallback family.

## Use

Try these requests:

- “Create a Codex theme with this visual direction and verify it on home and conversation pages.”
- “List the bundled themes and install Glacier Oracle.”
- “Apply the active theme on Linux, verify home and conversation pages, and tell me how to restore the native look.”

The bundled importer writes themes to `~/.codexthemes/themes/<theme-id>/`, validates package assets and CSS, and refuses to overwrite an existing theme. Review CSS from outside this bundle before applying it; CSS can still restyle or hide app content. The plugin does not include a theme injector; apply and restore through the supported `codex-theme-switcher` skill when available. If a required host skill or supported installation route is unavailable, explain that dependency instead of inventing a command. Restarting Codex requires explicit user approval. Applying a theme is not complete until the status readback confirms it.

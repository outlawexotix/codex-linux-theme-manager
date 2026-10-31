# Codex Linux Theme Manager Marketplace

A public Git marketplace for designing, installing, and managing themes in the Codex Linux desktop app. The plugin includes ten portable themes in a mixed light/dark collection.

## Install the plugin

```bash
codex plugin marketplace add outlawexotix/codex-linux-theme-manager
codex plugin add codex-linux-theme-manager@codex-linux-theme-manager
```

## Included themes

| Theme | Mode | World | Display / body typography |
|---|---|---|---|
| Feral Crown | Dark | Antlered beast in a cedar swamp | DejaVu Serif Condensed / IBM Plex Sans |
| Dawn of the Pantheon | Light | Solar gods and a cloud temple | Noto Serif Display / Lato |
| The Drowned Leviathan | Dark | Abyssal monster, kelp, and coral | IBM Plex Serif / Noto Sans |
| Neon Perseid | Dark | Violet orbital city and cyan meteor trails | Space Grotesk / DM Mono |
| Celestial Foundry | Light | Planetary forge and copper starlight | IBM Plex Sans Condensed / Noto Serif |
| Briar of Eld | Light | Enchanted forest and thorned citadel | Noto Serif / DejaVu Sans |
| Wyvern Atlas | Dark | Wyvern above moonlit storm peaks | IBM Plex Serif / DejaVu Sans Condensed |
| Pyrestone Titan | Dark | Fire titan, basalt, and lava | DejaVu Serif / Lato |
| Glacier Oracle | Light | Glacial sanctuary and aurora | Noto Sans Display / Liberation Serif |
| Tempest Canticle | Light | Lightning and a cloud cathedral | Lato / DejaVu Sans Mono |

Each package includes its own original generated artwork, semantic palette, CSS, typography pairing, and desktop/narrow design previews. Its artwork is scoped to the Codex home and conversation pages; native geometry and interaction are preserved. The previews are design mockups, not screenshots of an applied theme.

Typography uses the named Linux system fonts shown above with generic serif/sans fallbacks. The named fonts were available on the authoring machine but are not bundled, so another system may render a fallback if a family is missing.

## Install and apply an included theme

Use `codex-theme-library` to browse the included catalog and install a selected `.codex-theme` package into `~/.codexthemes/themes/`. The bundled importer rejects remote CSS and unsafe paths, validates its images, and refuses to overwrite an existing theme. Then use `codex-theme-operations` to list and apply it with the supported theme switcher.

The plugin includes three skills:

- **codex-theme-design** — create and repair Linux Codex desktop themes, including palettes, typography, original backdrop art, and page-scoped visual rules.
- **codex-theme-operations** — apply, verify, switch, roll back, or restore themes with Linux conversation-page checks.
- **codex-theme-library** — browse the bundled gallery, inspect packages, and install them into the managed theme library.

Live application and contrast verification are separate from static validation. Do not describe a design preview as a real-app screenshot or a theme as active until the switcher status confirms it.

The plugin lives in `plugins/codex-linux-theme-manager/`; `.agents/plugins/marketplace.json` makes it installable through Codex's Git marketplace support.

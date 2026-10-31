# Codex Linux Theme Manager Marketplace

A public Git marketplace containing the Codex Linux Theme Manager plugin.

## Install

```bash
codex plugin marketplace add outlawexotix/codex-linux-theme-manager
codex plugin add codex-linux-theme-manager@codex-linux-theme-manager
```

The plugin includes three skills:

- **codex-theme-design** — create and repair Linux Codex desktop themes, including palettes, typography, and original backdrop art.
- **codex-theme-operations** — apply, verify, switch, roll back, or restore themes with Linux-specific conversation-page checks.
- **codex-theme-library** — discover and inspect theme packages and use supported installation tools.

This package supplies workflow guidance. It does not include a theme injector, gallery client, or theme artwork; those operations require compatible theme tools in the Codex environment. Relaunching Codex requires explicit approval.

The plugin lives in `plugins/codex-linux-theme-manager/`; `.agents/plugins/marketplace.json` makes it installable through Codex's Git marketplace support.

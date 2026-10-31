# Codex Linux Theme Manager

This local Codex plugin packages the repeatable theme workflow from the Linux desktop work: create and repair themes, discover and install theme packages, then apply, verify, roll back, or restore them.

## Skills

- **codex-theme-design** — visual contract, palette and typography, original backdrop art, safe page selectors, and live-app repair.
- **codex-theme-operations** — Linux switching, conversation-page checks, explicit restart approval, status verification, rollback, and native restore.
- **codex-theme-library** — discovery, package inspection, supported installation handoff, and confirmation that a theme is actually present.

## Use

Install this folder or its ZIP using a Codex plugin installation route supported by your desktop build. After installation, try:

- “Create a Codex theme with this visual direction and verify it on home and conversation pages.”
- “Find and install a dark gritty Codex theme, then tell me how to apply it.”
- “Check the active Codex theme and restore the native appearance if needed.”

The skills use available theme creator, switcher, finder, and installer tools when present. The package contains workflow guidance only; it does not include an injector, theme artwork, or theme gallery client. If a required host skill or supported installation route is unavailable, the workflow should say so rather than invent commands. Restarting Codex requires explicit user approval. Applying or installing a theme is not claimed complete until the relevant status or library readback confirms it.

Keep the editable source folder as your maintained copy. The ZIP in `dist/` has the plugin manifest and skills at its root.

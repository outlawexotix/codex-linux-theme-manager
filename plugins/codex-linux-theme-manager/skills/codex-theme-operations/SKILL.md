---
name: codex-theme-operations
description: List, apply, switch, verify, rollback, or restore a Codex desktop theme on Linux. Use when the user asks to activate a theme, check what is active, fix an app-page mismatch, or return to the native look.
---

# Apply and manage Codex themes on Linux

Use the installed `codex-theme-switcher` skill and its scripts when available; they own the reversible injection runtime and status format. This plugin does not ship a replacement injector or claim to modify the running app by itself. If the switcher is missing, state the dependency rather than inventing a command or editing the application bundle.

## Apply or switch

1. List installed themes and confirm the requested ID exists in the managed library. If it does not, route to `codex-theme-library`.
2. Apply with the supported switcher. A live loopback endpoint can allow hot switching; the first application session or a fully quit app can require relaunch.
3. Before any relaunch or forced clean relaunch, ask the user for explicit approval. Do not substitute a shell kill, custom restart script, scheduled task, or another theme injector.
4. A `scheduled` response means only that a restart/injection was queued. Probe status after launch and require the expected theme ID to be active across the open pages before reporting success.
5. Report the theme's background scope, whether artwork appears on conversations, and the available rollback/native-restore actions.

## Linux page verification and repair

Linux Codex is an Electron desktop app. Confirm behavior in the actual renderer; do not assume a browser-only preview proves the desktop app works. The current app shell uses `main[data-app-shell-main-surface]`, with `main.main-surface` as a legacy fallback. Page classification must identify visible home and conversation surfaces independently so route navigation updates each page's styles.

If a theme is missing on the conversation page:

1. Check switcher status for every page and inspect the conversation page registration/classification.
2. Confirm the theme CSS has a conversation-scoped selector only when the user's chosen background scope includes conversations.
3. Check readability on prose, code blocks, attachments, tool/activity rows, and the persistent composer. Avoid weakening the text veil or forcing broad opacity.
4. Repair the owning selector or token in the theme source with `codex-theme-design`; remove obsolete competing rules and increment the theme version.
5. Reapply and verify home and conversation separately. If hot reload leaves stale registrations/styles, request permission for the supported `--launch --relaunch` path and verify status afterward.

Do not treat a home-page pass as proof that conversation pages work. Do not use absence of the home marker as a conversation test; settings and system pages can also lack it.

## Rollback and native restore

- For a bad or unwanted switch, use the switcher's `rollback` operation to return to the previous theme. A readability failure should follow the switcher's automatic revert behavior.
- For the native Codex appearance, use the switcher's `restore` operation and confirm inactive/native status.
- If Codex is fully quit, a session-only injected theme may be gone; verify status before claiming it persisted.

Never edit app installation files or `app.asar`. Distinguish verified status from expected behavior, and mention any page or state that could not be inspected.

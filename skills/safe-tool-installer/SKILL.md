---
name: safe-tool-installer
description: Add missing capabilities safely without turning the workstation into a fireworks display.
---

# Safe Tool Installer

When a new tool is needed:
1. Classify it as repo-local, global, or external
2. Prefer repo-local
3. Ask before global or external changes
4. Log the request and reason in .agent/reports/tool-request.md

## Safe defaults
- shell scripts in scripts/
- local config files
- local wrappers

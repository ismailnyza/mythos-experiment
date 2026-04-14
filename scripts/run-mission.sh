#!/usr/bin/env bash
set -euo pipefail

echo "== Mythos mission bootstrap =="

if ! command -v openclaw >/dev/null 2>&1; then
  echo "ERROR: openclaw CLI not found in PATH."
  echo "Install/configure OpenClaw first, then rerun."
  exit 1
fi

PROMPT_FILE=".agent/mission-prompt.md"
cat > "$PROMPT_FILE" <<'PROMPT'
Read AGENTS.md first, then GOAL.md, MISSION_STATUS.md, TASK_BOARD.md, PROJECT_CONTEXT.md, PERMISSIONS.md, TOOLS.md, and relevant skills in skills/*/SKILL.md.

Your job:
- keep progressing toward the goal
- break the goal into executable tasks
- update mission files after meaningful actions
- verify before claiming done
- ask before risky actions
- use sub-agents when useful for bounded scoped work

Start now:
1. read the workspace files
2. write a concise task breakdown to .agent/reports/goal-breakdown.md
3. update TASK_BOARD.md and MISSION_STATUS.md
4. begin the highest-priority task
PROMPT

echo
echo "Launching OpenClaw in this workspace..."
echo "If your OpenClaw install uses a different subcommand shape, adapt the final command."
echo

# Common/basic invocation pattern. Adjust flags if your install differs.
openclaw agent -m "$(cat "$PROMPT_FILE")"

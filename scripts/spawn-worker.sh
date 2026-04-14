#!/usr/bin/env bash
set -euo pipefail

TASK="${1:-}"
if [ -z "$TASK" ]; then
  echo "Usage: $0 'narrow scoped task for sub-agent'"
  exit 1
fi

cat > .agent/reports/subagent-request.md <<EOF2
# Sub-agent Request

Task:
$TASK

Rules:
- stay in this workspace
- no risky actions
- write findings to .agent/reports/
EOF2

echo "Sub-agent request recorded in .agent/reports/subagent-request.md"
echo "Now ask the lead agent to spawn a sub-agent for this exact task."

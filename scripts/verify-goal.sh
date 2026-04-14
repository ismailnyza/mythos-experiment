#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "== Verifying mission =="
[ -f GOAL.md ] || { echo "GOAL.md missing"; exit 1; }
[ -f MISSION_STATUS.md ] || { echo "MISSION_STATUS.md missing"; exit 1; }
[ -f TASK_BOARD.md ] || { echo "TASK_BOARD.md missing"; exit 1; }

echo "Control files present."

if command -v git >/dev/null 2>&1; then
  echo "Git status:"
  git status --short || true
fi

echo "Basic verification complete."

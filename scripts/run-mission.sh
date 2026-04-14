#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "== Mythos mission bootstrap =="

if ! command -v openclaw >/dev/null 2>&1; then
  echo "ERROR: openclaw CLI not found in PATH."
  echo "Install/configure OpenClaw first, then rerun."
  exit 1
fi

PROMPT_FILE=".agent/mission-prompt.md"

echo
echo "Launching OpenClaw in this workspace..."
echo

TARGET_FLAG=""
TARGET_VALUE=""
MODEL_REF="${OPENCLAW_MODEL_REF:-deepseek/deepseek-chat}"
WORKSPACE_DIR="${OPENCLAW_WORKSPACE_DIR:-$REPO_ROOT}"
SYNC_DEFAULTS="${OPENCLAW_SYNC_DEFAULTS:-1}"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --agent|--session-id|--to)
      TARGET_FLAG="$1"
      TARGET_VALUE="${2:-}"
      shift 2
      ;;
    --model)
      MODEL_REF="${2:-}"
      shift 2
      ;;
    --workspace)
      WORKSPACE_DIR="${2:-}"
      shift 2
      ;;
    --no-sync-defaults)
      SYNC_DEFAULTS="0"
      shift
      ;;
    *)
      echo "ERROR: Unknown argument: $1"
      echo "Usage: ./scripts/run-mission.sh [--model <provider/model>] [--workspace <dir>] [--no-sync-defaults] (--agent <id> | --session-id <id> | --to <E.164>)"
      exit 1
      ;;
  esac
done

case "$TARGET_FLAG" in
  --agent|--session-id|--to)
    ;;
  "")
    echo "ERROR: OpenClaw now requires an explicit target."
    echo
    echo "Usage:"
    echo "  ./scripts/run-mission.sh --agent <agent-id>"
    echo "  ./scripts/run-mission.sh --session-id <session-id>"
    echo "  ./scripts/run-mission.sh --to <E.164>"
    echo
    echo "Defaults applied by this script:"
    echo "  model: ${MODEL_REF}"
    echo "  workspace: ${WORKSPACE_DIR}"
    echo
    echo "You can also export:"
    echo "  OPENCLAW_TARGET_FLAG=--agent"
    echo "  OPENCLAW_TARGET_VALUE=<agent-id>"
    echo "  OPENCLAW_MODEL_REF=${MODEL_REF}"
    echo "  OPENCLAW_WORKSPACE_DIR=${WORKSPACE_DIR}"
    echo
    echo "Helpful discovery commands:"
    echo "  openclaw sessions"
    echo "  openclaw agents --help"
    exit 1
    ;;
  *)
    echo "ERROR: Unsupported target flag: $TARGET_FLAG"
    echo "Use one of: --agent, --session-id, --to"
    exit 1
    ;;
esac

if [ -z "$TARGET_VALUE" ]; then
  echo "ERROR: Missing target value for $TARGET_FLAG"
  exit 1
fi

if [ -z "$MODEL_REF" ]; then
  echo "ERROR: Missing model ref for --model"
  exit 1
fi

if [ -z "$WORKSPACE_DIR" ]; then
  echo "ERROR: Missing workspace dir for --workspace"
  exit 1
fi

if [ "$SYNC_DEFAULTS" = "1" ]; then
  echo "Syncing OpenClaw defaults..."
  echo "  workspace: $WORKSPACE_DIR"
  echo "  model: $MODEL_REF"
  openclaw config set agents.defaults.workspace "$WORKSPACE_DIR"
  openclaw models set "$MODEL_REF"
  echo
fi

mkdir -p ".agent/reports"
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

openclaw agent "$TARGET_FLAG" "$TARGET_VALUE" --message "$(cat "$PROMPT_FILE")"

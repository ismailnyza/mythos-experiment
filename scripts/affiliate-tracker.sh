#!/usr/bin/env bash
set -euo pipefail

# Simple affiliate experiment tracker
# Tracks progress toward Phase 1 ($1 milestone)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

LOG_FILE="$REPO_ROOT/experiment-log.md"
REVENUE_FILE="$REPO_ROOT/revenue-log.md"

show_help() {
    cat <<EOF
Affiliate Experiment Tracker

Usage: $0 <command>

Commands:
  status     - Show current experiment status
  log-click  - Log a click (source, timestamp)
  log-conversion - Log a conversion (amount, source, proof)
  update-milestone - Update milestone status in revenue-log.md
  help       - Show this help

EOF
}

command_status() {
    echo "=== Affiliate Experiment Status ==="
    echo "Current time: $(date)"
    echo
    
    # Check experiment log
    if [ -f "$LOG_FILE" ]; then
        echo "Experiment log exists: $(wc -l < "$LOG_FILE") lines"
        grep -A5 -B5 "Experiment 1:" "$LOG_FILE" || echo "No experiment 1 details found"
    else
        echo "WARNING: experiment-log.md not found"
    fi
    
    echo
    # Check revenue log
    if [ -f "$REVENUE_FILE" ]; then
        echo "Revenue milestones:"
        grep -E "Phase [0-9]|Target|Status" "$REVENUE_FILE" || echo "No milestone data"
    else
        echo "WARNING: revenue-log.md not found"
    fi
    
    echo
    echo "Next action: Create DigitalOcean account and referral link"
}

command_log_click() {
    local source="${1:-unknown}"
    local timestamp=$(date -Iseconds)
    
    echo "Logging click from: $source"
    echo "Timestamp: $timestamp"
    
    # Append to experiment log
    cat >> "$LOG_FILE" <<EOF

### Click Event
- **Date**: $timestamp
- **Source**: $source
- **Type**: Click
- **Notes**: Initial click tracked

EOF
    
    echo "Click logged to experiment-log.md"
}

command_log_conversion() {
    local amount="${1:-0}"
    local source="${2:-unknown}"
    local proof="${3:-none}"
    local timestamp=$(date -Iseconds)
    
    echo "Logging conversion: \$$amount from $source"
    echo "Proof: $proof"
    
    # Append to experiment log
    cat >> "$LOG_FILE" <<EOF

### Conversion Event
- **Date**: $timestamp
- **Source**: $source
- **Amount**: \$$amount
- **Proof**: $proof
- **Type**: Conversion
- **Notes**: First revenue achieved!

EOF
    
    # Update revenue log if this is first $1
    if [ "$(echo "$amount >= 1" | bc -l 2>/dev/null || echo 0)" = "1" ]; then
        sed -i "s/Phase 1.*Not started/Phase 1   | First \$1 | In progress | $timestamp | First conversion/" "$REVENUE_FILE"
        echo "Phase 1 milestone updated to 'In progress'"
    fi
    
    echo "Conversion logged to experiment-log.md"
}

command_update_milestone() {
    local phase="${1:-1}"
    local status="${2:-completed}"
    local timestamp=$(date -Iseconds)
    
    case "$phase" in
        1)
            sed -i "s/Phase 1.*|.*|.*|.*|/Phase 1   | First \$1 | $status | $timestamp | /" "$REVENUE_FILE"
            echo "Phase 1 updated to: $status"
            ;;
        2)
            sed -i "s/Phase 2.*|.*|.*|.*|/Phase 2   | \$10      | $status | $timestamp | /" "$REVENUE_FILE"
            echo "Phase 2 updated to: $status"
            ;;
        3)
            sed -i "s/Phase 3.*|.*|.*|.*|/Phase 3   | \$100     | $status | $timestamp | /" "$REVENUE_FILE"
            echo "Phase 3 updated to: $status"
            ;;
        4)
            sed -i "s/Phase 4.*|.*|.*|.*|/Phase 4   | \$1000    | $status | $timestamp | /" "$REVENUE_FILE"
            echo "Phase 4 updated to: $status"
            ;;
        *)
            echo "Invalid phase: $phase (use 1-4)"
            ;;
    esac
}

main() {
    cd "$REPO_ROOT"
    
    if [ $# -eq 0 ]; then
        show_help
        exit 1
    fi
    
    case "$1" in
        status)
            command_status
            ;;
        log-click)
            command_log_click "${2:-unknown}"
            ;;
        log-conversion)
            command_log_conversion "${2:-0}" "${3:-unknown}" "${4:-none}"
            ;;
        update-milestone)
            command_update_milestone "${2:-1}" "${3:-completed}"
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
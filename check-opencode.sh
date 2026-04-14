#!/bin/bash

# Monitoring script for opencode persistent service

SERVICE_NAME="opencode-persistent.service"
LOG_FILE="/home/ismael/Desktop/mythos-experiment/opencode-monitor.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

check_service() {
    if systemctl --user is-active "$SERVICE_NAME" >/dev/null 2>&1; then
        log "Service $SERVICE_NAME is ACTIVE"
        return 0
    else
        log "Service $SERVICE_NAME is INACTIVE - attempting restart"
        systemctl --user restart "$SERVICE_NAME"
        
        sleep 5
        
        if systemctl --user is-active "$SERVICE_NAME" >/dev/null 2>&1; then
            log "Service $SERVICE_NAME RESTARTED successfully"
            return 0
        else
            log "Service $SERVICE_NAME FAILED to restart"
            return 1
        fi
    fi
}

check_process() {
    if pgrep -f "opencode-ai" >/dev/null 2>&1; then
        log "Opencode process is running"
        return 0
    else
        log "Opencode process NOT found"
        return 1
    fi
}

# Main monitoring
log "=== Opencode Monitor Check ==="

check_service
SERVICE_STATUS=$?

check_process
PROCESS_STATUS=$?

if [ $SERVICE_STATUS -eq 0 ] && [ $PROCESS_STATUS -eq 0 ]; then
    log "All systems OK"
    exit 0
else
    log "WARNING: Issues detected"
    exit 1
fi
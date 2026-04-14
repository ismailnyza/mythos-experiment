---
name: subagent-orchestrator
description: Delegate bounded work to sub-agents and merge their outputs safely.
---

# Subagent Orchestrator

Use only when parallelism or separation of concerns helps.

## Good tasks for sub-agents
- research
- independent validation
- isolated implementation spikes
- documentation drafts
- test generation

## Requirements
- narrow scope
- explicit output
- no risky actions without approval
- summarize results in .agent/reports/

## Merge back
Parent agent reviews sub-agent outputs before finalizing.

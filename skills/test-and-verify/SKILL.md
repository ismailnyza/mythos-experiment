---
name: test-and-verify
description: Verify completion before declaring success.
---

# Test and Verify

Before declaring a task done:
1. Run relevant local checks
2. Capture results
3. Update status files

## Preferred checks
- scripts/verify-goal.sh
- repo tests
- lint
- build
- smoke checks if available

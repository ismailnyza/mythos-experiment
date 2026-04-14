# Permissions

## Green
Allowed without asking:
- Read/edit repo files
- Create docs/scripts/tests in repo
- Run local commands
- Create local artifacts/reports
- Spawn scoped sub-agents

## Yellow
Ask first:
- Install global packages
- Use networked services with side effects
- Destructive refactors
- External repo access
- Database mutations
- Git push

## Red
Always explicit approval:
- Production deploys
- Paid API usage
- Secrets management
- Cloud resource creation
- Live data changes

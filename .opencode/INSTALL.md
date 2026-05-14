# API Registry for OpenCode

## What this does

API Registry helps your AI agent find the right public API before writing code.

Instead of guessing which API to use, your agent runs a search and gets a ranked,
evidence-backed shortlist filtered for your app type.

## Setup

Add this project as a plugin in your `opencode.json`:

```json
{
  "plugin": ["api-registry@git+https://github.com/lunaticbugbear/api-registry.git"]
}
```

Restart OpenCode. The skill registers automatically.

## Usage

Ask OpenCode naturally:

```
Search for APIs for my weather dashboard. Frontend only.
```

Or use the CLI directly:

```bash
npm run registry -- search "weather dashboard" --profile frontend-only
npm run registry -- export "weather dashboard" --format markdown
```

## Profiles

| Profile | Use when |
|---|---|
| `frontend-only` | Browser app, no backend. CORS matters. |
| `backend-required` | Server app. Keys stay private. |
| `prototype` | Quick demo. Free APIs only. |
| `production` | Stable app. Trusted APIs only. |
| `automation` | Scripts and workflows. |

## First run

The first search downloads ~1,400 APIs from the public-apis catalog.
This takes about 5–10 seconds. Every run after that is offline and near-instant.

## More

Full documentation: https://github.com/lunaticbugbear/api-registry

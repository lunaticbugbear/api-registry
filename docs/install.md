# Install API Registry in AI agents

## Claude Code

Clone repository and install dependencies:

```bash
git clone https://github.com/lunaticbugbear/api-registry.git
cd api-registry
npm install
```

Use skill docs from `skills/api-registry/SKILL.md` and agent contract from `agents/api-researcher/AGENT.md`.

First command auto-fetches the full `public-apis/public-apis` catalog into local `records.json`. If GitHub is unavailable, it falls back to bundled curated `apis.json`.

```bash
npm run registry -- search "weather dashboard" --profile frontend-only
```

## Codex CLI or other coding agents

Add this repository as a local tool folder in the agent workspace, then call the CLI command from agent instructions:

```bash
npm run registry -- search "<app idea>" --profile frontend-only
npm run registry -- export "<app idea>" --format json
npm run registry -- audit
```

Integration rule for agents:

1. Run search before choosing third-party APIs.
2. Prefer `recommended` records.
3. Respect `rejected` reasons and warnings.
4. If no good result exists, run agent research, validate output against `docs/agent-contract.md`, then add records.
5. Never hardcode paid/auth-heavy API choices without checking registry result first.

## Generic AI agent prompt snippet

```text
Before selecting external APIs for an app, run API Registry:

npm run registry -- search "{app idea}" --profile "{consumer profile}"

Use recommended APIs first. If results are weak, research new APIs, validate against the API Registry schema, and add them before continuing.
```

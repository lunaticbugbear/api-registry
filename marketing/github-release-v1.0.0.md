# API Registry v1.0.0

Turn an app idea into a ranked, evidence-backed API shortlist before you write code.

## Highlights

- Ranked API search for real app ideas like `weather dashboard`, `finance tracker`, and `job board`
- Profile-aware filtering for `frontend-only`, `backend-required`, `prototype`, `production`, and more
- Local-first registry that works offline after first bootstrap
- Export results as JSON or Markdown for Claude Code, Codex, and other AI agents
- Built-in audit flow for freshness, confidence, duplicates, and registry health

## Why this release matters

Most public API lists stop at discovery.
API Registry goes further:
- helps agents choose APIs that actually fit app constraints
- filters out bad frontend choices like broken CORS setups
- keeps evidence and confidence attached to records
- makes API selection repeatable instead of guesswork

## Included in v1.0.0

### Core CLI workflow
- `search`
- `export`
- `import`
- `add`
- `refresh`
- `audit`

### AI agent integration
- Beginner-friendly setup for Claude Code, Codex, and other coding agents
- Skill-driven workflow via `skills/api-registry/SKILL.md`
- Agent contract support via `agents/api-researcher/AGENT.md`

### Data quality and scoring
- Multi-factor scoring based on:
  - keyword relevance
  - runtime/profile fit
  - trust status
  - freshness
  - evidence-backed confidence
- Quality penalties for stale or incomplete records

### Release polish
- Stable tests and type safety cleanup
- Real demo asset in README
- Beginner-friendly docs rewrite
- GitHub Actions CI for tests + typecheck
- Release artifact validation coverage

## Quality checks

This release ships with:
- `186/186` tests passing
- `npm run typecheck` passing
- Release artifact validation for README, docs, examples, and demo transcript

## Quick start

```bash
git clone https://github.com/lunaticbugbear/api-registry.git
cd api-registry
npm install
npm run registry -- search "weather dashboard" --profile frontend-only
```

## Example use cases

- Weather dashboards
- Finance trackers
- Job boards
- AI tooling
- Automation workflows
- Frontend prototypes that need CORS-safe APIs

## Thanks

Built for developers and AI agents that need something better than “search Google and hope.”

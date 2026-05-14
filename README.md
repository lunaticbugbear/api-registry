<div align="center">

# API Registry for Claude Code

**Turn an app idea into a ranked, evidence-backed API shortlist before you write code.**

[![Node.js >=18](https://img.shields.io/badge/node-%3E%3D18-22c55e?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/tests-186%20passing-6e9f18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![MIT](https://img.shields.io/badge/license-MIT-f59e0b?style=for-the-badge)](LICENSE)

</div>

---

## Problem

AI app builders need reliable public API choices before implementation starts.
Public API lists are useful, but they rarely answer the question that actually matters:

> **Which API fits this frontend prototype, dashboard, automation, or production app — right now?**

## Value proposition

API Registry is a **local recommendation engine** that turns an app idea into a 
ranked, reusable API shortlist — scored dynamically by keyword relevance, 
CORS support, auth complexity, and data freshness. 

On first run, it auto-imports the full `public-apis` catalog from GitHub. It then 
maintains this state locally, allowing you to find, rank, and export normalized 
API metadata for Claude Code or any other AI agent — even when offline.

---

## What you get

| Capability | What it does |
|---|---|
| **Ranked API shortlists** | A recommendation engine that scores APIs by technical fit, not just keywords. |
| **Frontend-fit checks** | Automatically filters out CORS-broken APIs during search. |
| **Local-first registry** | Works entirely offline after bootstrap — keeps your planning fast and private. |
| **Evidence + confidence** | Tracks exactly *why* a piece of metadata is trusted, with direct source URLs. |
| **Agent-ready exports** | Emits clean JSON/Markdown for autonomous implementation planning. |
| **Health Audits** | Catches stale or low-confidence data before it impacts your implementation. |

---

## The Scoring Engine

Every result in the registry is ranked by a multi-factor engine to ensure you pick the 
most reliable API for your project:

- **Relevance (60%)**: Semantic match across name, description, tags, and category.
- **Runtime Fit (20%)**: Compatibility boost based on your profile (e.g., `--profile frontend-only`).
- **Trust Signal (20%)**: Bonuses for trusted status, high confidence evidence, and freshness.
- **Penalty System**: Points are deducted for missing docs, unknown CORS, or stale metadata.

> [!TIP]
> This engine ensures that a "perfect" keyword match that is stale and lacks docs won't 
> outrank a "good" match that is trusted and recently verified.

---

## Quick start

Prerequisite: Node.js 18 or later.

1. Clone and install: `git clone https://github.com/lunaticbugbear/api-registry.git && cd api-registry && npm install`.
2. Search: `npm run registry -- search "anime app" --profile frontend-only`.
3. First run auto-imports the full public-apis catalog; offline runs fall back to bundled curated seed records.

> Current distribution is clone-based. npm/package-manager install is planned after public release validation.

---

## Demo transcript

```bash
$ npm run registry -- search "weather dashboard" --profile frontend-only
search: weather dashboard
1. National Weather Service [weather] score=195
2. WeatherAPI [data] score=163.1
3. Open-Meteo [data] score=128.5
4. MetaWeather [data] score=113.5
5. Pirate Weather [data] score=113.5
6. US Weather [data] score=113.5
7. weather-api [data] score=113.5
8. HG Weather [data] score=106
9. QWeather [data] score=106
$ npm run registry -- export "weather dashboard" --format json
```

See [examples/weather-dashboard.json](examples/weather-dashboard.json) for the full export output.
For the generated full demo, see [examples/demo-transcript.md](examples/demo-transcript.md).

---

## Command reference

| Command | Purpose | Example |
|---|---|---|
| `add` | Validate and add one API record JSON file. | `npm run registry -- add api.json` |
| `search` | Rank APIs by query, profile fit, confidence, freshness, and completeness. | `npm run registry -- search "anime app" --profile frontend-only` |
| `import` | Import APIs from public-apis or a local markdown export. | `npm run registry -- import public-apis` |
| `refresh` | List stale records that need re-checking. | `npm run registry -- refresh` |
| `audit` | Validate registry quality and health metadata. | `npm run registry -- audit` |
| `export` | Produce JSON or Markdown for another skill or agent. | `npm run registry -- export "weather dashboard" --format json` |

---

## AI Agent Integration

### Claude Code
Use this repo as local API-selection tooling inside your workspace.

**Setup**

```bash
git clone https://github.com/lunaticbugbear/api-registry.git
cd api-registry
npm install
```

**Run it directly**

```bash
npm run registry -- search "anime app" --profile frontend-only
npm run registry -- export "weather dashboard" --format json
npm run registry -- audit
```

**Use skill + agent files**

- Skill definition: [`skills/api-registry/SKILL.md`](skills/api-registry/SKILL.md)
- Research agent contract: [`agents/api-researcher/AGENT.md`](agents/api-researcher/AGENT.md)

Recommended flow inside Claude Code:

1. Search local registry first.
2. Review recommended APIs, warnings, and rejected reasons.
3. Export shortlist into your planning or build workflow.
4. Only research externally when local results are weak, stale, or missing.

### Codex / Generic AI Agents
Tell your agent to call API Registry before picking any third-party API.

**Prompt snippet**

```text
Before selecting external APIs for this app, run:

npm run registry -- search "{app idea}" --profile "{consumer profile}"

If results look good, use recommended APIs first.
If results are weak, run:

npm run registry -- export "{app idea}" --format markdown --profile "{consumer profile}"

Respect warnings, rejected reasons, auth requirements, pricing, and CORS fit.
```

---

## Example exports

Real CLI export output lives in [`examples/`](examples/):

- [anime-app.json](examples/anime-app.json)
- [weather-dashboard.json](examples/weather-dashboard.json)
- [finance-tracker.json](examples/finance-tracker.json)
- [job-board.json](examples/job-board.json)
- [developer-tools.json](examples/developer-tools.json)

Regenerate examples after registry changes:

```bash
npm run generate:examples
npm run generate:demo
```

---

## Quality gates

Before calling the repo release-ready, run:

```bash
npm test
npm run typecheck
npm run registry -- audit
npm run demo
```

Current verification status:

- **Tests:** 186 passing
- **TypeScript:** strict mode clean
- **Runtime:** Node.js 18+
- **License:** MIT

---

## Project Structure

| Directory | Purpose |
|---|---|
| 📂 `agents/` | API Researcher agent contract and refresh/verification rules. |
| 📂 `data/` | Local registry state, aliases, contracts, and bundled seed records. |
| 📂 `docs/` | Schema, commands, install guide, and release docs. |
| 📂 `examples/` | Real generated CLI outputs and shortlist exports. |
| 📂 `scripts/` | Regeneration scripts for transcript and example artifacts. |
| 📂 `skills/` | Skill definitions that tell coding agents how to use registry flow. |
| 📂 `src/` | TypeScript implementation for CLI, search, import, export, refresh, and audit. |
| 📂 `tests/` | Vitest suite covering contracts, registry behavior, and release artifacts. |

---

## Documentation

- [Install guide](docs/install.md)
- [Schema reference](docs/schema.md)
- [Command reference](docs/commands.md)
- [Agent contract](docs/agent-contract.md)
- [Source policy](docs/source-policy.md)
- [Release checklist](docs/release-checklist.md)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).

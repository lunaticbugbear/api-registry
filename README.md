# API Registry for Claude Code

## Problem

AI app builders need reliable public API choices before implementation starts. Public API lists are useful, but they rarely answer which API fits a frontend prototype, dashboard, automation, or production app.

## Value proposition

API Registry turns an app idea into a ranked, reusable API shortlist with fit scores, auth, CORS, pricing, confidence, and source provenance. On first run, it automatically imports the full public-apis catalog from GitHub into local storage, falls back to a curated 32+ API seed set when offline, and exports normalized results for Claude Code, Codex, or other AI agents.

## Quick start

Prerequisite: Node.js 18 or later.

1. Clone and install: `git clone https://github.com/lunaticbugbear/api-registry.git && cd api-registry && npm install`.
2. Search: `npm run registry -- search "anime app" --profile frontend-only`.
3. First run auto-imports the full public-apis catalog; offline runs fall back to bundled curated seed records.

Current distribution is clone-based. npm/package-manager install is planned after public release validation.

## Demo transcript

$ npm run registry -- search "anime app" --profile frontend-only
search: anime app
1. AniList [entertainment] score=265
2. Jikan [entertainment] score=265
3. TVMaze [entertainment] score=175
4. MyAnimeList [data] score=148.5
5. AnimeFacts [data] score=138.5
6. AnimeNewsNetwork [data] score=138.5
7. Danbooru Anime [data] score=131
8. MangaDex [data] score=123.5
9. Mangapi [data] score=123.5
10. Rappi [data] score=123.5

$ npm run registry -- export "weather dashboard" --format json

See `examples/weather-dashboard.json` for the full export output.

## Install in AI agents

See [docs/install.md](docs/install.md) for Claude Code, Codex CLI, and generic agent integration instructions.

## Command reference

- `add`: validate and add one API record JSON file: `add <file>`.
- `search`: rank local APIs by query, profile fit, confidence, freshness, and completeness: `search <query> [--profile frontend-only] [--limit 10]`.
- `import`: import APIs from a curated source export such as public-apis markdown: `import <file>`.
- `refresh`: list stale records that need re-checking.
- `audit`: validate registry quality and update health metadata.
- `export`: produce a structured shortlist for another skill or agent: `export <query> --format json|markdown`.

## Examples

See `examples/anime-app.json`, `examples/weather-dashboard.json`, `examples/finance-tracker.json`, `examples/job-board.json`, and `examples/developer-tools.json` for real CLI export output.

## Documentation

- `docs/schema.md`
- `docs/commands.md`
- `docs/agent-contract.md`
- `docs/source-policy.md`
- `docs/release-checklist.md`
- `docs/linkedin-post.md`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

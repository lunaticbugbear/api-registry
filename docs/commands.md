# Command Reference

All commands start with `npm run registry --`. Think of `registry` as the name of the tool.

---

## `search` — Find APIs for your app

**What it does:** Searches the registry and returns a ranked list of APIs that match your app idea.

```bash
npm run registry -- search "weather dashboard" --profile frontend-only
```

**Options:**

| Option | What it means |
|---|---|
| `"your app idea"` | Describe what you are building in plain English. |
| `--profile frontend-only` | Only show APIs that work in a browser (safe CORS, no secret keys needed). |
| `--profile backend-required` | Show APIs that need a backend server (keys stay private). |
| `--profile prototype` | Prioritize free APIs with no account required. |

**Output explained:**
- `score=195` — Higher score = better match for your app and profile.
- `[weather]` — The API category.
- Entries prefixed with ⚠️ have warnings you should check before using.

---

## `export` — Save results for your agent to use

**What it does:** Runs a search and saves the full results to a file your AI agent can read.

```bash
npm run registry -- export "weather dashboard" --format json
npm run registry -- export "weather dashboard" --format markdown
```

Use `json` when your agent reads JSON. Use `markdown` for plain text handoff.

---

## `import` — Load more APIs into the registry

**What it does:** Downloads the full public-apis catalog and saves it locally.

```bash
npm run registry -- import public-apis
```

You usually don't need to run this manually — `search` triggers it automatically on first run.

---

## `add` — Add a single new API

**What it does:** Validates and saves one new API record that you provide.

```bash
npm run registry -- add my-api.json
```

The JSON file must follow the schema in [schema.md](schema.md).

---

## `refresh` — Find outdated records

**What it does:** Lists APIs that haven't been checked recently and may have stale data.

```bash
npm run registry -- refresh
```

---

## `audit` — Check registry health

**What it does:** Runs a full health check — finds duplicates, incomplete records, and low-confidence data.

```bash
npm run registry -- audit
```

Run this before sharing a shortlist or exporting results for an important project.

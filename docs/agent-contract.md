# Agent Contract

This document explains how the API Registry communicates with AI agents —
what they send in, and what they get back.

You only need this if you are **building or configuring an AI agent** that calls the registry.
If you are just using it from Claude Code or Codex, this is handled automatically.

---

## What is the api-researcher agent?

`api-researcher` is an agent role that kicks in when:
- The local registry has no results for a query.
- Existing results are stale (not checked recently).
- A record has low confidence and needs verification.

It goes out, researches, and brings back verified API data in the exact format the registry expects.

---

## input contract

```json
{
  "query": "weather dashboard",
  "category": "weather",
  "consumerProfile": "frontend-only",
  "maxResults": 5,
  "refresh": false
}
```

| Field | Required? | Meaning |
|---|---|---|
| `query` | ✅ | What kind of API you are looking for. |
| `category` | Optional | Narrow the search to a specific category. |
| `consumerProfile` | Optional | Filters results by profile (e.g. `frontend-only`). |
| `maxResults` | Optional | How many results to return. Default is 10. |
| `refresh` | Optional | Set `true` to force re-checking even fresh records. |

---

## output contract

```json
{
  "query": "weather dashboard",
  "generatedAt": "2026-05-14T00:00:00Z",
  "results": [ ... ],
  "findings": "Found 5 weather APIs with CORS support."
}
```

Each entry inside `results` is a full [ApiRecord](schema.md) plus:

| Extra field | Meaning |
|---|---|
| `score` | How well this result matches the query and profile. |
| `matched_fields` | Which fields (name, description, tags) triggered the match. |
| `matched_terms` | The specific keywords that matched. |
| `warnings` | Any known issues (e.g. "CORS status unknown", "docs link broken"). |

---

## malformed output

If the agent returns malformed or missing data:
- The registry **rejects it completely**.
- The existing registry data is **not changed**.
- The caller receives a list of validation errors.

This prevents bad data from silently entering the registry.

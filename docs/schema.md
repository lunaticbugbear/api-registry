# Schema Reference

This page explains the structure of an ApiRecord — what each field means and why it matters.

You need this if you want to **add a new API** to the registry.

---

## Example record

```json
{
  "id": "openweather",
  "name": "OpenWeatherMap",
  "description": "Real-time and forecast weather data for any location worldwide.",
  "category": "weather",
  "tags": ["weather", "forecast", "maps"],
  "homepage": "https://openweathermap.org/",
  "docsUrl": "https://openweathermap.org/api",
  "auth": "apiKey",
  "cors": "yes",
  "pricing": "freemium",
  "status": "trusted",
  "consumerProfiles": ["frontend-only", "dashboard", "prototype"],
  "evidence": [
    {
      "url": "https://openweathermap.org/api",
      "title": "OpenWeatherMap API docs",
      "checkedAt": "2026-05-14T00:00:00Z",
      "excerpt": "Free plan: 60 calls/minute. CORS supported."
    }
  ],
  "updatedAt": "2026-05-14T00:00:00Z"
}
```

---

## Field explanations

| Field | Required? | What to put here |
|---|---|---|
| `id` | ✅ | A unique short name, lowercase, no spaces (e.g. `openweather`). |
| `name` | ✅ | The full display name of the API. |
| `description` | ✅ | One or two sentences explaining what the API does. |
| `category` | ✅ | One of the supported categories (see below). |
| `tags` | Optional | Keywords that help matching (e.g. `["forecast", "maps"]`). |
| `homepage` | ✅ | The main website of the API provider. |
| `docsUrl` | ✅ | Direct link to the API documentation page. |
| `auth` | ✅ | How users authenticate. Options: `none`, `apiKey`, `OAuth`, `Bearer`. |
| `cors` | ✅ | Does the API allow browser requests? Options: `yes`, `no`, `unknown`. |
| `pricing` | ✅ | Cost model. Options: `free`, `freemium`, `paid`, `unknown`. |
| `status` | ✅ | Quality rating. Options: `trusted`, `needs_review`, `stale`, `rejected`. |
| `consumerProfiles` | Optional | Which profiles this API fits. See [commands.md](commands.md) for profile names. |
| `evidence` | Recommended | At least one source that verifies auth, CORS, and pricing claims. |
| `updatedAt` | ✅ | ISO date of last check (e.g. `2026-05-14T00:00:00Z`). |

---

## Supported categories

`weather`, `data`, `entertainment`, `finance`, `health`, `social`, `maps`,
`sports`, `news`, `ai`, `tools`, `food`, `travel`, `music`, `games`, `communication`.

---

## Evidence (why it matters)

Evidence is what makes a record **trustworthy**. Without it, the registry marks the record
as lower confidence and it scores lower in searches.

You can also attach field-level confidence from 1 to 10 with a source URL to any verified field.

A good evidence entry has:
- **`url`** — The exact page you checked.
- **`title`** — A short description of that page.
- **`checkedAt`** — When you checked it (ISO date).
- **`excerpt`** — A quote or note from the page confirming auth, CORS, or pricing.

---

## registry health

The overall registry health lives in `registry.json` and tracks schema version, import dates,
audit dates, freshness, and health score. Run `npm run registry -- audit` to check it.

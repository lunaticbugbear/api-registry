# API Registry for Claude Code

## Problem

AI app builders need reliable public API choices before implementation starts. Public API lists are useful, but they rarely answer which API fits a frontend prototype, dashboard, automation, or production app.

## Value proposition

API Registry turns an app idea into a ranked, reusable API shortlist with fit scores, auth, CORS, pricing, confidence, and source provenance. It stores everything locally and exports normalized results for other Claude Code skills or agents.

## Quick start

1. Clone and install: `git clone [repo-url] && cd api-registry && npm install`.
2. Run seed/audit check: `npm run registry -- audit`.
3. Search: `npm run registry -- search "anime app" --profile frontend-only`.

## Demo transcript

$ npm run registry -- search "anime app" --profile frontend-only
search: anime app
1. AniList [entertainment] score=265
2. Jikan [entertainment] score=265
3. TVMaze [entertainment] score=175

$ npm run registry -- export "weather dashboard" --format json
{
  "query": "weather dashboard",
  "consumer_profile": null,
  "recommended": [
    {
      "record": {
        "id": "national-weather-service",
        "name": "National Weather Service",
        "description": "US government weather alerts, forecasts, and observations API.",
        "category": "weather",
        "tags": [
          "weather",
          "alerts",
          "government"
        ],
        "homepage": "https://www.weather.gov/documentation/services-web-api",
        "docsUrl": "https://www.weather.gov/documentation/services-web-api",
        "auth": "User-Agent",
        "cors": "yes",
        "pricing": "free",
        "status": "trusted",
        "fit": {
          "frontend": 8,
          "backend": 9,
          "prototype": 9,
          "production": 8,
          "mobile": 8,
          "dashboard": 8,
          "automation": 8
        },
        "consumerProfiles": [
          "frontend-only",
          "prototype",
          "dashboard"
        ],
        "source": {
          "name": "curated-seed",
          "url": "https://www.weather.gov/documentation/services-web-api",
          "importedAt": "2026-05-13"
        },
        "evidence": [
          {
            "url": "https://www.weather.gov/documentation/services-web-api",
            "title": "National Weather Service documentation",
            "checkedAt": "2026-05-13",
            "excerpt": "Official API documentation or developer reference confirms public API details."
          }
        ],
        "confidence": [
          {
            "field": "homepage",
            "confidence": 9,
            "source": "https://www.weather.gov/documentation/services-web-api"
          },
          {
            "field": "docsUrl",
            "confidence": 9,
            "source": "https://www.weather.gov/documentation/services-web-api"
          },
          {
            "field": "auth",
            "confidence": 8,
            "source": "https://www.weather.gov/documentation/services-web-api"
          },
          {
            "field": "cors",
            "confidence": 7,
            "source": "https://www.weather.gov/documentation/services-web-api"
          },
          {
            "field": "pricing",
            "confidence": 7,
            "source": "https://www.weather.gov/documentation/services-web-api"
          }
        ],
        "updatedAt": "2026-05-13",
        "createdAt": "2026-05-13"
      },
      "score": 195,
      "matched_fields": [
        "name",
        "description",
        "category",
        "tags"
      ],
      "matched_terms": [
        "weather"
      ],
      "warnings": []
    },
    {
      "record": {
        "id": "weatherapi",
        "name": "WeatherAPI",
        "description": "Weather forecast, history, astronomy, and air quality API.",
        "category": "weather",
        "tags": [
          "forecast",
          "weather",
          "air-quality"
        ],
        "homepage": "https://www.weatherapi.com",
        "docsUrl": "https://www.weatherapi.com/docs/",
        "auth": "apiKey",
        "cors": "yes",
        "pricing": "free_tier",
        "status": "trusted",
        "fit": {
          "frontend": 8,
          "backend": 9,
          "prototype": 9,
          "production": 8,
          "mobile": 8,
          "dashboard": 8,
          "automation": 8
        },
        "consumerProfiles": [
          "frontend-only",
          "prototype",
          "dashboard"
        ],
        "source": {
          "name": "curated-seed",
          "url": "https://www.weatherapi.com/docs/",
          "importedAt": "2026-05-13"
        },
        "evidence": [
          {
            "url": "https://www.weatherapi.com/docs/",
            "title": "WeatherAPI documentation",
            "checkedAt": "2026-05-13",
            "excerpt": "Official API documentation or developer reference confirms public API details."
          }
        ],
        "confidence": [
          {
            "field": "homepage",
            "confidence": 9,
            "source": "https://www.weatherapi.com/docs/"
          },
          {
            "field": "docsUrl",
            "confidence": 9,
            "source": "https://www.weatherapi.com/docs/"
          },
          {
            "field": "auth",
            "confidence": 8,
            "source": "https://www.weatherapi.com/docs/"
          },
          {
            "field": "cors",
            "confidence": 7,
            "source": "https://www.weatherapi.com/docs/"
          },
          {
            "field": "pricing",
            "confidence": 7,
            "source": "https://www.weatherapi.com/docs/"
          }
        ],
        "updatedAt": "2026-05-13",
        "createdAt": "2026-05-13"
      },
      "score": 195,
      "matched_fields": [
        "name",
        "description",
        "category",
        "tags"
      ],
      "matched_terms": [
        "weather"
      ],
      "warnings": []
    },
    {
      "record": {
        "id": "open-meteo",
        "name": "Open-Meteo",
        "description": "Open weather forecast API with no API key for non-commercial use.",
        "category": "weather",
        "tags": [
          "forecast",
          "weather"
        ],
        "homepage": "https://open-meteo.com",
        "docsUrl": "https://open-meteo.com/en/docs",
        "auth": "No",
        "cors": "yes",
        "pricing": "free",
        "status": "trusted",
        "fit": {
          "frontend": 8,
          "backend": 9,
          "prototype": 9,
          "production": 8,
          "mobile": 8,
          "dashboard": 8,
          "automation": 8
        },
        "consumerProfiles": [
          "frontend-only",
          "prototype",
          "dashboard"
        ],
        "source": {
          "name": "curated-seed",
          "url": "https://open-meteo.com/en/docs",
          "importedAt": "2026-05-13"
        },
        "evidence": [
          {
            "url": "https://open-meteo.com/en/docs",
            "title": "Open-Meteo documentation",
            "checkedAt": "2026-05-13",
            "excerpt": "Official API documentation or developer reference confirms public API details."
          }
        ],
        "confidence": [
          {
            "field": "homepage",
            "confidence": 9,
            "source": "https://open-meteo.com/en/docs"
          },
          {
            "field": "docsUrl",
            "confidence": 9,
            "source": "https://open-meteo.com/en/docs"
          },
          {
            "field": "auth",
            "confidence": 8,
            "source": "https://open-meteo.com/en/docs"
          },
          {
            "field": "cors",
            "confidence": 7,
            "source": "https://open-meteo.com/en/docs"
          },
          {
            "field": "pricing",
            "confidence": 7,
            "source": "https://open-meteo.com/en/docs"
          }
        ],
        "updatedAt": "2026-05-13",
        "createdAt": "2026-05-13"
      },
      "score": 160,
      "matched_fields": [
        "description",
        "category",
        "tags"
      ],
      "matched_terms": [
        "weather"
      ],
      "warnings": []
    }
  ],
  "alternatives": [],
  "rejected": [],
  "warnings": [],
  "registry_health": {
    "schema_version": "api-registry",
    "last_imported_at": "2026-05-13",
    "last_audited_at": "2026-05-13",
    "freshness_days": 90,
    "health": "ok",
    "health_score": 8.7
  },
  "contract": {
    "type": "object",
    "required": [
      "records",
      "exportedAt"
    ],
    "properties": {
      "records": "ApiRecord[]",
      "exportedAt": "string"
    }
  },
  "exportedAt": "2026-05-13T00:00:00.000Z"
}

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

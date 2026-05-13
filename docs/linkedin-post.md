# LinkedIn Post

Building a new Claude Code session? You hit an API that needs auth, turns out it's paid, swap it out, find another manually. Repeat.

So I built an API Registry skill that automatically imports the full public-apis/public-apis catalog on first run, then keeps everything local.

Describe your app idea:
```
/api-registry search "anime app" --profile frontend-only
```

Get a ranked list scored by auth type, CORS, pricing, and fit. Public sources get normalized, ranked, and marked with confidence so weak or paid/auth-heavy options do not silently become the default.

Everything stored locally. Reusable across any Claude Code skill that needs to plan API-backed apps.

Works in Claude Code now, with install instructions for Codex CLI and other AI agents.

Open source → github.com/lunaticbugbear/api-registry

#ClaudeCode #AI #DeveloperTools #OpenSource #PublicAPIs

---

## Posting Tips

- Post on a weekday morning (08:00–10:00 WIB) for best reach
- Add a short screen recording or screenshot of the CLI output — visual posts get 3–5x more impressions
- Tag `#ClaudeCode` and `#Anthropic` — active communities right now
- First comment: paste the demo transcript from `examples/demo-transcript.md` as a "see it in action" thread

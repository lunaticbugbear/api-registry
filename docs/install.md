# Install Guide

This guide helps you set up API Registry so your AI coding agent can use it.
No prior experience with AI agents or coding tools is required.

---

## Step 1 — Install Node.js

API Registry requires **Node.js version 18 or later**.

If you are not sure whether you have Node.js installed, open a terminal and run:

```bash
node --version
```

If you see something like `v20.x.x`, you are good. If not, download it from:
👉 https://nodejs.org/ (click the **LTS** button — that is the recommended version)

---

## Step 2 — Download API Registry

```bash
git clone https://github.com/lunaticbugbear/api-registry.git
cd api-registry
npm install
```

This downloads the project and installs everything it needs. You only do this once.

---

## Step 3 — Run your first search

```bash
npm run registry -- search "weather dashboard" --profile frontend-only
```

**What happens on first run:**
- The tool downloads ~1,400 free public APIs from GitHub automatically.
- This takes about 5–10 seconds on a normal internet connection.
- Every run after that is near-instant and works offline.

You will see a ranked list of APIs matching your search. The number next to each
result (e.g. `score=195`) tells you how well it matches your app's needs.

---

## Step 4 — Connect it to your AI agent

### Claude Code
Open this project folder in Claude Code, then tell Claude:

```text
Use skills/api-registry/SKILL.md whenever I need to research or choose APIs.
```

Claude will now run registry searches automatically before picking any API.

### Codex CLI
Add this rule to your `AGENTS.md` file:

```text
Before choosing any third-party API, run:
  npm run registry -- search "<what your app does>" --profile "frontend-only"
Use the recommended APIs first.
```

### Any other AI agent
Paste this into your system prompt or project instructions:

```text
When you need an external API, do not guess. Run API Registry first:
  npm run registry -- search "{app idea}" --profile "{profile}"
Use recommended results. Respect warnings.
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `command not found: npm` | Install Node.js from https://nodejs.org/ |
| `command not found: git` | Install Git from https://git-scm.com/ |
| Search returns 0 results | Check your spelling, or try a broader term (e.g. "weather" instead of "live weather map") |
| First run seems frozen | Wait 15 seconds. It is downloading API data from GitHub. |

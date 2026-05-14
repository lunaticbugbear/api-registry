# Source Policy

This policy explains where API data in the registry comes from, and what makes a source trustworthy.

---

## Where does the data come from?

API Registry pulls from two sources:

1. **Curated seed records** — A hand-picked set of 32+ reliable APIs bundled inside the project.
   These are always available, even offline.

2. **public-apis catalog** — On first run, the tool imports ~1,400 APIs from the open-source
   [public-apis/public-apis](https://github.com/public-apis/public-apis) GitHub repository.
   This is one of the best official public/free API catalogs available for broad discovery.

---

## source provenance

Every record keeps source provenance so you can trace where claims came from. Good sources:
- Have a direct link to the official API documentation.
- Clearly state auth type, pricing, and CORS policy.
- Are checked recently (within the last 90 days).

---

## What gets rejected?

A source is rejected or downgraded if it has a concrete quality problem, for example:
- Links to broken or missing documentation.
- Contains repeatedly incorrect records (wrong CORS, fake pricing, etc.).
- Uses misleading licensing claims.
- Has not been updated in over 6 months with no explanation.

When something is uncertain (e.g. CORS policy not stated anywhere),
the record uses `"unknown"` — **never a guess**.

---

## How to add a new source

If you find an API that is not in the registry:
1. Create a record JSON following [schema.md](schema.md).
2. Add at least one `evidence` entry linking to the official docs.
3. Run `npm run registry -- add my-api.json` to validate and save it.
4. Submit a Pull Request if you want it included in the main registry.

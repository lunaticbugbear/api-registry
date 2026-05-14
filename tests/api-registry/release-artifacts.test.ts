import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runCli } from '../../src/api-registry/cli.js';
import { validateApiRecord } from '../../src/api-registry/validation.js';
import { generateIndex } from '../../src/api-registry/index-generator.js';
import type { Aliases, ApiRecord, Contracts, RegistryManifest } from '../../src/api-registry/types.js';

const DATA_DIR = join(process.cwd(), 'data', 'api-registry');
const DOCS_DIR = join(process.cwd(), 'docs');
const MARKETING_DIR = join(process.cwd(), 'marketing');
const EXAMPLES_DIR = join(process.cwd(), 'examples');
const README_PATH = join(process.cwd(), 'README.md');
const CONTRIBUTING_PATH = join(process.cwd(), 'CONTRIBUTING.md');
const LICENSE_PATH = join(process.cwd(), 'LICENSE');

function readRegistry(): { records: ApiRecord[]; aliases: Aliases; manifest: RegistryManifest; contracts: Contracts } {
  return {
    records: JSON.parse(readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8')),
    aliases: JSON.parse(readFileSync(join(DATA_DIR, 'aliases.json'), 'utf-8')),
    manifest: JSON.parse(readFileSync(join(DATA_DIR, 'registry.json'), 'utf-8')),
    contracts: JSON.parse(readFileSync(join(DATA_DIR, 'contracts.json'), 'utf-8')),
  };
}

function normalizeVolatileDates<T>(value: T): T {
  if (Array.isArray(value)) return value.map(normalizeVolatileDates) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (['exportedAt', 'updatedAt', 'createdAt', 'checkedAt', 'importedAt', 'last_imported_at', 'last_audited_at'].includes(key)) {
        result[key] = '__normalized_date__';
      } else {
        result[key] = normalizeVolatileDates(entry);
      }
    }
    return result as T;
  }
  return value;
}

const LINKEDIN_TEMPLATE = `Building a new Claude Code session? You hit an API that needs auth, turns out it's paid, swap it out, find another manually. Repeat.

So I built an API Registry skill that automatically imports the full public-apis/public-apis catalog on first run, then keeps everything local.

Describe your app idea:
\`\`\`
/api-registry search "anime app" --profile frontend-only
\`\`\`

Get a ranked list scored by auth type, CORS, pricing, and fit. Public sources get normalized, ranked, and marked with confidence so weak or paid/auth-heavy options do not silently become the default.

Everything stored locally. Reusable across any Claude Code skill that needs to plan API-backed apps.

Works in Claude Code now, with install instructions for Codex CLI and other AI agents.

Open source → github.com/lunaticbugbear/api-registry

#ClaudeCode #AI #DeveloperTools #OpenSource #PublicAPIs`;

describe('release artifacts', () => {
  describe('apis.json seed data', () => {
    let records: ApiRecord[];

    it('loads and parses apis.json', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);
      expect(Array.isArray(parsed)).toBe(true);
      records = parsed;
    });

    it('contains at least 30 APIs', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);
      expect(parsed.length).toBeGreaterThanOrEqual(30);
    });

    it('covers required categories', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);
      const categories = new Set(parsed.map((r: ApiRecord) => r.category));

      expect(categories.has('entertainment')).toBe(true);
      expect(categories.has('weather')).toBe(true);
      expect(categories.has('finance')).toBe(true);
      expect(categories.has('maps')).toBe(true);
      expect(categories.has('developer-tools')).toBe(true);
    });

    it('every record passes validateApiRecord', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);

      for (const record of parsed) {
        expect(() => validateApiRecord(record)).not.toThrow();
        for (const confidence of record.confidence) {
          expect(confidence.confidence).toBeGreaterThanOrEqual(1);
          expect(confidence.confidence).toBeLessThanOrEqual(10);
        }
      }
    });

    it('includes required seed API names', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);
      const names = new Set(parsed.map((r: ApiRecord) => r.name));

      for (const name of [
        'AniList',
        'Jikan',
        'TVMaze',
        'Open-Meteo',
        'National Weather Service',
        'WeatherAPI',
        'Alpha Vantage',
        'Frankfurter',
        'CoinGecko',
        'OpenStreetMap Nominatim',
        'OpenRouteService',
        'GitHub REST',
        'Stack Exchange',
        'npm Registry',
        'Hacker News',
        'Adzuna',
        'USAJOBS',
        'NewsAPI',
        'GNews',
        'Hugging Face',
        'REST Countries',
        'World Bank',
        'Pexels',
        'Unsplash',
        'Wikipedia REST',
        'RAWG',
      ]) {
        expect(names.has(name)).toBe(true);
      }
    });

    it('every trusted record has at least one evidence entry', () => {
      const raw = readFileSync(join(DATA_DIR, 'apis.json'), 'utf-8');
      const parsed = JSON.parse(raw);

      for (const record of parsed) {
        if (record.status === 'trusted') {
          expect(record.evidence.length).toBeGreaterThanOrEqual(1);
        }
      }
    });
  });

  describe('index.md generation', () => {
    it('generateIndex function is exported', () => {
      expect(typeof generateIndex).toBe('function');
    });

    it('index.md contains grouped sections for seeded categories', () => {
      const indexContent = readFileSync(join(DATA_DIR, 'index.md'), 'utf-8');

      expect(indexContent).toContain('Entertainment');
      expect(indexContent).toContain('Weather');
      expect(indexContent).toContain('Finance');
      expect(indexContent).toContain('Maps');
      expect(indexContent).toContain('Developer Tools');
    });

    it('index.md contains table headers', () => {
      const indexContent = readFileSync(join(DATA_DIR, 'index.md'), 'utf-8');

      expect(indexContent).toContain('Name');
      expect(indexContent).toContain('Auth');
      expect(indexContent).toContain('CORS');
      expect(indexContent).toContain('Pricing');
      expect(indexContent).toContain('Status');
    });
  });

  describe('schema.md documentation', () => {
    it('schema.md exists and contains ApiRecord field documentation', () => {
      const schemaContent = readFileSync(join(DATA_DIR, 'schema.md'), 'utf-8');

      expect(schemaContent).toContain('ApiRecord');
      expect(schemaContent).toContain('id');
      expect(schemaContent).toContain('name');
      expect(schemaContent).toContain('auth');
      expect(schemaContent).toContain('cors');
      expect(schemaContent).toContain('pricing');
      expect(schemaContent).toContain('status');
      expect(schemaContent).toContain('fit');
      expect(schemaContent).toContain('consumerProfiles');
    });
  });

  describe('public release documentation', () => {
    it('README contains problem, value, three-step quick start, transcript, commands, and contribution link', () => {
      const readme = readFileSync(README_PATH, 'utf-8');
      const transcript = readFileSync(join(EXAMPLES_DIR, 'demo-transcript.md'), 'utf-8').trim();

      expect(readme).toContain('## Problem');
      expect(readme).toContain('AI app builders need reliable public API choices before implementation starts.');
      expect(readme).toContain('## Value proposition');
      expect(readme).toContain('ranked, reusable API shortlist');
      expect(readme).toContain('## Quick start');
      const quickStart = readme.match(/## Quick start\r?\n([\s\S]*?)\r?\n## /)?.[1] ?? '';
      expect((quickStart.match(/^\d+\./gm) ?? []).length).toBeLessThanOrEqual(3);
      expect(quickStart).toContain('npm install');
      expect(quickStart).toContain('npm run registry -- search "anime app" --profile frontend-only');
      expect(quickStart).toContain('First run auto-imports the full public-apis catalog');
      expect(readme).toContain('## Demo transcript');
      expect(readme).toContain('$ npm run registry -- search "weather dashboard" --profile frontend-only');
      expect(readme).toContain('$ npm run registry -- export "weather dashboard" --format json');
      expect(transcript).toContain('$ npm run registry -- search "anime app" --profile frontend-only');
      expect(readme).toContain('## Command reference');
      for (const command of ['add', 'search', 'import', 'refresh', 'audit', 'export']) {
        expect(readme).toContain(`\`${command}\``);
      }
      expect(readme).toContain('[CONTRIBUTING.md](CONTRIBUTING.md)');
    });

    it('required docs exist and cover release topics', () => {
      const docs: Record<string, string[]> = {
        'schema.md': ['ApiRecord', 'field-level confidence', 'evidence', 'registry health'],
        'commands.md': ['add', 'search', 'import', 'refresh', 'audit', 'export'],
        'agent-contract.md': ['api-researcher', 'input contract', 'output contract', 'malformed output'],
        'source-policy.md': ['official public/free API catalogs', 'source provenance', 'concrete quality problem'],
        'release-checklist.md': ['npm test', 'npm run typecheck', 'registry audit', 'example validation', 'documentation freshness'],
      };

      for (const [fileName, requiredText] of Object.entries(docs)) {
        const content = readFileSync(join(DOCS_DIR, fileName), 'utf-8');
        for (const text of requiredText) expect(content).toContain(text);
      }
    });

    it('examples are real JSON CLI export output matching the export contract', async () => {
      const { contracts } = readRegistry();
      const examples = [
        ['anime-app.json', 'anime app'],
        ['weather-dashboard.json', 'weather dashboard'],
        ['finance-tracker.json', 'finance tracker'],
        ['job-board.json', 'job board'],
        ['developer-tools.json', 'developer tools'],
      ] as const;

      for (const [fileName, query] of examples) {
        const content = readFileSync(join(EXAMPLES_DIR, fileName), 'utf-8');
        const parsed = JSON.parse(content);
        const expectedOutput = await runCli(['export', query, '--format', 'json'], process.cwd());
        const expected = JSON.parse(expectedOutput);
        expect(parsed).toMatchObject({
          query,
          consumer_profile: null,
          recommended: expect.any(Array),
          alternatives: expect.any(Array),
          rejected: expect.any(Array),
          warnings: expect.any(Array),
          registry_health: expect.any(Object),
          contract: contracts.outputShapes.export,
          exportedAt: expect.any(String),
        });
        expect(parsed.recommended.length).toBeGreaterThan(0);
        expect(normalizeVolatileDates(parsed)).toEqual(normalizeVolatileDates(expected));
      }
    });

    it('demo transcript matches CLI output for required commands', async () => {
      const transcript = readFileSync(join(EXAMPLES_DIR, 'demo-transcript.md'), 'utf-8').trim();
      const searchOutput = await runCli(['search', 'anime app', '--profile', 'frontend-only'], process.cwd());
      const exportOutput = await runCli(['export', 'weather dashboard', '--format', 'json'], process.cwd());

      const expected = `$ npm run registry -- search "anime app" --profile frontend-only
${searchOutput}

$ npm run registry -- export "weather dashboard" --format json
${exportOutput}`;

      expect(transcript).toBe(expected);
    });
  });
});

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runCli } from '../src/api-registry/cli.js';

const cwd = process.cwd();

const EXAMPLES = [
  { file: 'anime-app.json', query: 'anime app' },
  { file: 'weather-dashboard.json', query: 'weather dashboard' },
  { file: 'finance-tracker.json', query: 'finance tracker' },
  { file: 'job-board.json', query: 'job board' },
  { file: 'developer-tools.json', query: 'developer tools' },
] as const;

async function main() {
  for (const { file, query } of EXAMPLES) {
    const output = await runCli(['export', query, '--format', 'json'], cwd);
    writeFileSync(join(cwd, 'examples', file), output + '\n');
    console.log(`Generated examples/${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

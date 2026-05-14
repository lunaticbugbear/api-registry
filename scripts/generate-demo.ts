import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runCli } from '../src/api-registry/cli.js';

const cwd = process.cwd();

async function main() {
  const searchOutput = await runCli(['search', 'anime app', '--profile', 'frontend-only'], cwd);
  const exportOutput = await runCli(['export', 'weather dashboard', '--format', 'json'], cwd);

  const transcript = `$ npm run registry -- search "anime app" --profile frontend-only
${searchOutput}

$ npm run registry -- export "weather dashboard" --format json
${exportOutput}`;

  writeFileSync(join(cwd, 'examples', 'demo-transcript.md'), transcript);
  console.log('Generated examples/demo-transcript.md');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import { readContentSources } from './content-files.mjs';
import { renderDocument } from '../assets/content-engine.js';

const data = await readContentSources();
const output = await format(renderDocument(data), { parser: 'html' });
if (process.argv.includes('--check')) {
  const source = await readFile('index.html', 'utf8');
  assert.ok(
    output === source,
    'Generated content is stale. Run npm run roadmap.',
  );
} else {
  await writeFile('index.html', output);
  console.log(
    `${data.clusters.flatMap((c) => c.groups.flatMap((g) => g.items)).length} items rendered from classified JSON content.`,
  );
}

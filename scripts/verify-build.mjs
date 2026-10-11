import assert from 'node:assert/strict';
import { readFile, readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const parseData = (html) =>
  JSON.parse(
    html.match(/<script[^>]*id="atlas-data"[^>]*>([\s\S]*?)<\/script>/)[1],
  );
const source = await readFile('index.html', 'utf8');
const output = await readFile('dist/index.html', 'utf8');
const data = parseData(output);
assert.deepEqual(
  data,
  parseData(source),
  'Build must preserve atlas data exactly.',
);
assert.equal(data.clusters.length, 12);
assert.equal(data.clusters.flatMap((c) => c.groups).length, 49);
assert.equal(
  data.clusters.flatMap((c) => c.groups.flatMap((g) => g.items)).length,
  data.review.expectedItems,
);
assert.equal(
  (output.match(/class="feature-check"/g) || []).length,
  data.review.expectedItems,
);
const files = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = `${dir}/${name}`;
    if ((await stat(path)).isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk('dist');
const manifest = JSON.parse(await readFile('data/manifest.json', 'utf8'));
const contentPaths = [
  './manifest.json',
  manifest.metadata,
  manifest.roadmap,
  manifest.interface,
  manifest.messages,
  manifest.review,
  ...(Object.hasOwn(manifest, 'componentCatalog')
    ? [manifest.componentCatalog]
    : []),
  ...(Object.hasOwn(manifest, 'developmentPlan')
    ? [manifest.developmentPlan]
    : []),
  ...manifest.clusters,
].map((path) => `data/${path.replace(/^\.\//, '')}`);
for (const path of contentPaths)
  assert.deepEqual(
    JSON.parse(await readFile(`dist/${path}`, 'utf8')),
    JSON.parse(await readFile(path, 'utf8')),
    `JSON content changed: ${path}`,
  );
const expected = [
  'dist/.nojekyll',
  'dist/index.html',
  'dist/assets/app.js',
  'dist/assets/exports.js',
  'dist/assets/content-engine.js',
  'dist/assets/content-templates.js',
  ...contentPaths.map((path) => `dist/${path}`),
  'dist/assets/styles.css',
  'dist/assets/favicon.svg',
  'dist/assets/fonts/OFL.txt',
  'dist/assets/fonts/outfit-latin.woff2',
  'dist/assets/fonts/outfit-latin-ext.woff2',
];
assert.deepEqual(
  files.sort(),
  expected.sort(),
  'Publish only explicitly allowed site files.',
);
const groups = {
  html: ['dist/index.html'],
  css: ['dist/assets/styles.css'],
  js: [
    'dist/assets/app.js',
    'dist/assets/exports.js',
    'dist/assets/content-engine.js',
    'dist/assets/content-templates.js',
  ],
  json: contentPaths.map((path) => `dist/${path}`),
  fonts: [
    'dist/assets/fonts/outfit-latin.woff2',
    'dist/assets/fonts/outfit-latin-ext.woff2',
  ],
};
const sizes = {};
for (const [name, paths] of Object.entries(groups)) {
  sizes[name] = { raw: 0, gzip: 0 };
  for (const path of paths) {
    const content = await readFile(path);
    sizes[name].raw += content.length;
    sizes[name].gzip += gzipSync(content).length;
  }
}
// Classified JSON is fetched by the browser engine. The generated snapshot keeps
// the complete experience readable and exportable when JSON requests fail.
// The explicit delivery-scope budget revision is recorded in docs/content-model.md.
// User-requested decisions, component catalog and the complete development plan are delivered
// both as a readable no-JS snapshot and classified JSON. Measured scope growth
// and the single budget set are recorded in docs/content-model.md.
assert.ok(sizes.html.gzip <= 376 * 1024, 'HTML gzip budget 376 KiB');
assert.ok(sizes.css.gzip <= 12 * 1024, 'CSS gzip budget12 KiB');
assert.ok(sizes.js.gzip <= 24 * 1024, 'JS gzip budget24 KiB');
assert.ok(sizes.json.gzip <= 192 * 1024, 'Content JSON gzip budget192 KiB');
const total = Object.values(sizes).reduce((sum, s) => sum + s.gzip, 0);
assert.ok(total <= 648 * 1024, 'Initial shared assets gzip budget648 KiB');
console.log(
  JSON.stringify(
    {
      status: 'pass',
      data: { clusters: 12, groups: 49, items: data.review.expectedItems },
      sizes,
      totalGzip: total,
      unnecessaryProfileAssets: 0,
    },
    null,
    2,
  ),
);
await mkdir('artifacts', { recursive: true });
await writeFile(
  'artifacts/build-verification.json',
  JSON.stringify({ sizes, totalGzip: total, files }, null, 2),
);

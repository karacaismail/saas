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
  326,
);
assert.equal((output.match(/class="feature-check"/g) || []).length, 326);
const files = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = `${dir}/${name}`;
    if ((await stat(path)).isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk('dist');
const expected = [
  'dist/.nojekyll',
  'dist/index.html',
  'dist/assets/app.js',
  'dist/assets/exports.js',
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
  js: ['dist/assets/app.js', 'dist/assets/exports.js'],
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
// The source-bounded roadmap adds 326 static notes, acceptance gates and links.
// Keep them readable without JavaScript and keep the lossless export data island.
// The explicit content-scope budget revision is recorded in docs/roadmap.md.
assert.ok(sizes.html.gzip <= 144 * 1024, 'HTML gzip budget 144 KiB');
assert.ok(sizes.css.gzip <= 12 * 1024, 'CSS gzip budget12 KiB');
assert.ok(sizes.js.gzip <= 12 * 1024, 'JS gzip budget12 KiB');
const total = Object.values(sizes).reduce((sum, s) => sum + s.gzip, 0);
assert.ok(total <= 200 * 1024, 'Initial shared assets gzip budget200 KiB');
console.log(
  JSON.stringify(
    {
      status: 'pass',
      data: { clusters: 12, groups: 49, items: 326 },
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

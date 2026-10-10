import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
// Keep text whitespace semantics while removing source-only indentation. The JSON
// data island is serialized separately so whitespace inside item strings is intact.
const source = await readFile('index.html', 'utf8');
const dataPattern = /(<script[^>]*id="atlas-data"[^>]*>)([\s\S]*?)(<\/script>)/;
const dataMatch = source.match(dataPattern);
if (!dataMatch) throw new Error('Atlas veri kaynağı bulunamadı.');
const dataIsland =
  dataMatch[1] +
  JSON.stringify(JSON.parse(dataMatch[2])).replaceAll('<', '\\u003c') +
  dataMatch[3];
const html = source
  .replace(dataPattern, '<!--ATLAS_DATA_ISLAND-->')
  .replace(/[\t ]*\n[\t ]*/g, ' ')
  .replace('<!--ATLAS_DATA_ISLAND-->', dataIsland);
await writeFile('dist/index.html', html);
await cp('assets', 'dist/assets', { recursive: true });
const manifest = JSON.parse(await readFile('data/manifest.json', 'utf8'));
const contentFiles = [
  './manifest.json',
  manifest.metadata,
  manifest.roadmap,
  manifest.interface,
  manifest.messages,
  manifest.review,
  ...manifest.clusters,
];
for (const path of contentFiles) {
  const relative = path.replace(/^\.\//, '');
  const target = `dist/data/${relative}`;
  await mkdir(target.slice(0, target.lastIndexOf('/')), { recursive: true });
  await writeFile(
    target,
    JSON.stringify(JSON.parse(await readFile(`data/${relative}`, 'utf8'))) +
      '\n',
  );
}
await writeFile('dist/.nojekyll', '');
console.log('Statik site dist/ içinde hazır.');

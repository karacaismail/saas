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
await writeFile('dist/.nojekyll', '');
console.log('Statik site dist/ içinde hazır.');

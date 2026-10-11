import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { loadProject, validateProject } from './project-model.mjs';
import {
  createTaskPacket,
  renderClusterPage,
  renderProjectHome,
  renderTaskPage,
  serializeTaskMarkdown,
} from '../assets/project-templates.js';

const project = validateProject(await loadProject());
const routeId = (id) => {
  if (typeof id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(id))
    throw new TypeError('Invalid project route identity');
  return id;
};
const write = async (path, content) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
};
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

// The unchanged legacy source stays independently readable at /atlas/. Only its
// asset URLs move one directory up; the complete data island is preserved.
const source = await readFile('index.html', 'utf8');
const dataPattern = /(<script[^>]*id="atlas-data"[^>]*>)([\s\S]*?)(<\/script>)/;
const dataMatch = source.match(dataPattern);
if (!dataMatch) throw new Error('Atlas veri kaynağı bulunamadı.');
const dataIsland =
  dataMatch[1] +
  JSON.stringify(JSON.parse(dataMatch[2])).replaceAll('<', '\\u003c') +
  dataMatch[3];
const atlasHtml = source
  .replace(dataPattern, '<!--ATLAS_DATA_ISLAND-->')
  .replace(/[\t ]*\n[\t ]*/g, ' ')
  .replaceAll('="./assets/', '="../assets/')
  .replace('<!--ATLAS_DATA_ISLAND-->', dataIsland);
await write('dist/atlas/index.html', atlasHtml);
await write('dist/index.html', renderProjectHome(project));

// Project templates are build-time code, never a browser dependency. Copy only
// the explicit shared legacy assets and the new workspace CSS/runtime.
const assetFiles = [
  'app.js',
  'exports.js',
  'content-engine.js',
  'content-templates.js',
  'styles.css',
  'favicon.svg',
  'fonts/OFL.txt',
  'fonts/outfit-latin.woff2',
  'fonts/outfit-latin-ext.woff2',
  'project.css',
  'project-app.js',
];
for (const path of assetFiles) {
  const target = `dist/assets/${path}`;
  await mkdir(dirname(target), { recursive: true });
  await cp(`assets/${path}`, target);
}
const manifest = JSON.parse(await readFile('data/manifest.json', 'utf8'));
const contentFiles = [
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
];
const projectFiles = [
  'project',
  'backend',
  'frontend',
  'adapters',
  'platform',
  'operations',
  'traceability',
].map((name) => `./project/${name}.json`);
for (const path of [...contentFiles, ...projectFiles]) {
  if (!/^\.\/[a-z0-9/.-]+\.json$/.test(path) || path.includes('..'))
    throw new TypeError('Invalid content file path');
  const relative = path.slice(2);
  await write(
    `dist/data/${relative}`,
    `${JSON.stringify(JSON.parse(await readFile(`data/${relative}`, 'utf8')))}\n`,
  );
}

for (const cluster of project.clusters)
  await write(
    `dist/clusters/${routeId(cluster.id)}/index.html`,
    renderClusterPage(project, cluster.id),
  );
for (const task of project.tasks) {
  const directory = `dist/tasks/${routeId(task.id)}`;
  const packet = createTaskPacket(project, task.id);
  await write(
    `${directory}/index.html`,
    renderTaskPage(project, task.id, packet),
  );
  await write(`${directory}/task.json`, `${JSON.stringify(packet, null, 2)}\n`);
  await write(`${directory}/task.md`, serializeTaskMarkdown(packet));
}
await write('dist/.nojekyll', '');
console.log('Statik site dist/ içinde hazır.');

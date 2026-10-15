import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { loadProject, validateProject } from './project-model.mjs';
import {
  createTaskPacket,
  createCurrentPlanPacket,
  renderLegacyScopeNotice,
  renderCurrentPlanPage,
  renderClusterPage,
  renderProjectHome,
  renderTaskPage,
  serializeTaskMarkdown,
  serializeCurrentPlanMarkdown,
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
const atlasShell = source
  .replace(dataPattern, '<!--ATLAS_DATA_ISLAND-->')
  .replace(/[\t ]*\n[\t ]*/g, ' ')
  .replaceAll('="./assets/', '="../assets/');
// Direct /atlas/ visitors see the current master before historical ownership.
// Only the built copy changes; the source snapshot and data island stay intact.
const contextMarker =
  '<details class="context-disclosure" id="context-details">';
const contextAt = atlasShell.indexOf(contextMarker);
const summaryEnd =
  atlasShell.indexOf('</summary>', contextAt) + '</summary>'.length;
const roadmapAt = atlasShell.indexOf('id="roadmap"', contextAt);
if (
  contextAt < 0 ||
  atlasShell.indexOf(contextMarker, contextAt + 1) >= 0 ||
  summaryEnd < contextAt + contextMarker.length ||
  roadmapAt < summaryEnd
)
  throw new Error('Atlas teknik bağlam alanı bulunamadı.');
const atlasNotice = renderLegacyScopeNotice(project);
if (!atlasNotice) throw new Error('Güncel ana karar notu bulunamadı.');
const atlasHtml = (
  atlasShell.slice(0, summaryEnd) +
  atlasNotice +
  atlasShell.slice(summaryEnd)
).replace('<!--ATLAS_DATA_ISLAND-->', dataIsland);
await write('dist/atlas/index.html', atlasHtml);
await write('dist/index.html', renderProjectHome(project));
for (const [planKey, slug, stem] of [
  ['currentPlan', 'plan', 'current-plan'],
  ['reusePlan', 'reuse', 'reuse-plan'],
]) {
  const packet = createCurrentPlanPacket(project, undefined, planKey);
  await write(
    `dist/${slug}/index.html`,
    renderCurrentPlanPage(project, undefined, planKey),
  );
  await write(
    `dist/${slug}/${stem}.json`,
    `${JSON.stringify(packet, null, 2)}\n`,
  );
  await write(`dist/${slug}/${stem}.md`, serializeCurrentPlanMarkdown(packet));
  for (const task of project.meta[planKey].tasks) {
    const directory = `dist/${slug}/tasks/${routeId(task.id)}`;
    const taskPacket = createCurrentPlanPacket(project, task.id, planKey);
    await write(
      `${directory}/index.html`,
      renderCurrentPlanPage(project, task.id, planKey),
    );
    await write(
      `${directory}/task.json`,
      `${JSON.stringify(taskPacket, null, 2)}\n`,
    );
    await write(
      `${directory}/task.md`,
      serializeCurrentPlanMarkdown(taskPacket),
    );
  }
}

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

// Publish the requested guides explicitly; never copy the whole docs or handoff tree.
const analysis = JSON.parse(
  await readFile('docs/frappe-roadmap-analysis.json', 'utf8'),
);
const documentationPaths = [
  'docs/frappe-roadmap-analysis.json',
  'docs/frappe-roadmap-analysis.md',
  'docs/frappe-roadmap-contracts/README.md',
  'docs/temporal-proposal-agents.md',
  ...analysis.executionBacklog.packets.map(({ contractPath }) => {
    if (
      typeof contractPath !== 'string' ||
      !/^docs\/frappe-roadmap-contracts\/[a-z0-9-]+\.json$/.test(contractPath)
    )
      throw new TypeError('Invalid public documentation path');
    return contractPath;
  }),
];
for (const path of documentationPaths) {
  const target = `dist/${path}`;
  await mkdir(dirname(target), { recursive: true });
  await cp(path, target);
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

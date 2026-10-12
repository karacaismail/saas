import assert from 'node:assert/strict';
import { lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { loadProject, validateProject } from './project-model.mjs';
import {
  createTaskPacket,
  createCurrentPlanPacket,
  renderCurrentPlanPage,
  renderProjectHome,
  serializeTaskMarkdown,
  serializeCurrentPlanMarkdown,
} from '../assets/project-templates.js';

const project = validateProject(await loadProject());
const routeId = (id) => {
  assert.ok(
    typeof id === 'string' && /^[a-z][a-z0-9-]*$/.test(id),
    'Safe route identity',
  );
  return id;
};
const parseIsland = (html, id) => {
  const match = html.match(
    new RegExp(`<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/script>`),
  );
  assert.ok(match, `Missing JSON island: ${id}`);
  return JSON.parse(match[1]);
};
const source = await readFile('index.html', 'utf8');
const output = await readFile('dist/atlas/index.html', 'utf8');
const data = parseIsland(output, 'atlas-data');
assert.deepEqual(
  data,
  parseIsland(source, 'atlas-data'),
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
assert.ok(
  !output.includes('="./assets/'),
  'Atlas asset URLs must resolve from /atlas/.',
);

const files = [];
async function walk(directory) {
  for (const name of (await readdir(directory)).sort()) {
    const path = `${directory}/${name}`;
    const info = await lstat(path);
    assert.ok(!info.isSymbolicLink(), `Do not publish symlinks: ${path}`);
    if (info.isDirectory()) await walk(path);
    else {
      assert.ok(info.isFile(), `Publish regular files only: ${path}`);
      files.push(path);
    }
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
].map((path) => {
  assert.ok(
    typeof path === 'string' &&
      /^\.\/[a-z0-9/.-]+\.json$/.test(path) &&
      !path.includes('..'),
    'Safe content path',
  );
  return `data/${path.slice(2)}`;
});
assert.equal(
  contentPaths.length,
  20,
  'Preserve all twenty canonical atlas documents.',
);
const projectPaths = [
  'project',
  'backend',
  'frontend',
  'adapters',
  'platform',
  'operations',
  'traceability',
].map((name) => `data/project/${name}.json`);
for (const path of [...contentPaths, ...projectPaths])
  assert.deepEqual(
    JSON.parse(await readFile(`dist/${path}`, 'utf8')),
    JSON.parse(await readFile(path, 'utf8')),
    `JSON content changed: ${path}`,
  );
const assetPaths = [
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
].map((path) => `assets/${path}`);
for (const path of assetPaths)
  assert.deepEqual(
    await readFile(`dist/${path}`),
    await readFile(path),
    `Asset content changed: ${path}`,
  );
const clusterRoutes = project.clusters.map(
  (cluster) => `clusters/${routeId(cluster.id)}/index.html`,
);
const taskRoutes = project.tasks.map(
  (task) => `tasks/${routeId(task.id)}/index.html`,
);
const expected = [
  'dist/.nojekyll',
  'dist/index.html',
  'dist/atlas/index.html',
  'dist/plan/index.html',
  'dist/plan/current-plan.json',
  'dist/plan/current-plan.md',
  ...project.meta.currentPlan.tasks.flatMap((task) =>
    ['index.html', 'task.json', 'task.md'].map(
      (name) => `dist/plan/tasks/${routeId(task.id)}/${name}`,
    ),
  ),
  'dist/reuse/index.html',
  'dist/reuse/reuse-plan.json',
  'dist/reuse/reuse-plan.md',
  ...project.meta.reusePlan.tasks.flatMap((task) =>
    ['index.html', 'task.json', 'task.md'].map(
      (name) => `dist/reuse/tasks/${routeId(task.id)}/${name}`,
    ),
  ),
  ...assetPaths.map((path) => `dist/${path}`),
  ...[...contentPaths, ...projectPaths].map((path) => `dist/${path}`),
  ...clusterRoutes.map((path) => `dist/${path}`),
  ...project.tasks.flatMap((task) =>
    ['index.html', 'task.json', 'task.md'].map(
      (name) => `dist/tasks/${routeId(task.id)}/${name}`,
    ),
  ),
];
assert.equal(
  new Set(expected).size,
  expected.length,
  'Publication routes must be unique.',
);
assert.deepEqual(
  files.sort(),
  expected.sort(),
  'Publish only explicitly allowed site files.',
);
assert.ok(
  !files.includes('dist/assets/project-templates.js'),
  'Build-only templates must not be published.',
);

const measure = async (paths) => {
  const size = { raw: 0, gzip: 0 };
  for (const path of paths) {
    const content = await readFile(path);
    size.raw += content.length;
    size.gzip += gzipSync(content).length;
  }
  return size;
};
const measureGroups = async (groups) => {
  const sizes = {};
  for (const [name, paths] of Object.entries(groups))
    sizes[name] = await measure(paths);
  return sizes;
};
const fontPaths = [
  'dist/assets/fonts/outfit-latin.woff2',
  'dist/assets/fonts/outfit-latin-ext.woff2',
];
// Keep the existing atlas delivery budget unchanged and independently measured.
const sizes = await measureGroups({
  html: ['dist/atlas/index.html'],
  css: ['dist/assets/styles.css'],
  js: [
    'dist/assets/app.js',
    'dist/assets/exports.js',
    'dist/assets/content-engine.js',
    'dist/assets/content-templates.js',
  ],
  json: contentPaths.map((path) => `dist/${path}`),
  fonts: fontPaths,
});
assert.ok(sizes.html.gzip <= 376 * 1024, 'Atlas HTML gzip budget376 KiB');
assert.ok(sizes.css.gzip <= 12 * 1024, 'Atlas CSS gzip budget12 KiB');
assert.ok(sizes.js.gzip <= 24 * 1024, 'Atlas JS gzip budget24 KiB');
assert.ok(sizes.json.gzip <= 192 * 1024, 'Atlas JSON gzip budget192 KiB');
const total = Object.values(sizes).reduce((sum, size) => sum + size.gzip, 0);
assert.ok(total <= 648 * 1024, 'Atlas shared assets gzip budget648 KiB');

const home = await readFile('dist/index.html', 'utf8');
assert.equal(
  home,
  renderProjectHome(project),
  'Workspace content must match the canonical project.',
);
const projectSizes = await measureGroups({
  html: ['dist/index.html'],
  css: ['dist/assets/project.css'],
  js: ['dist/assets/project-app.js'],
  fonts: fontPaths,
});
assert.ok(
  projectSizes.html.gzip <= 160 * 1024,
  'Workspace HTML gzip budget160 KiB',
);
assert.ok(
  projectSizes.css.gzip <= 16 * 1024,
  'Workspace CSS gzip budget16 KiB',
);
assert.ok(
  projectSizes.js.gzip <= 12 * 1024,
  'Workspace runtime gzip budget12 KiB',
);
const projectTotal = Object.values(projectSizes).reduce(
  (sum, size) => sum + size.gzip,
  0,
);
assert.ok(
  projectTotal <= 240 * 1024,
  'Workspace initial delivery gzip budget240 KiB',
);

const routeSizes = [];
const routeContents = new Map([
  ['index.html', home],
  ['atlas/index.html', output],
]);
const taskIds = project.tasks.map((task) => task.id);
async function verifyProjectPage(path, route, taskId) {
  const html =
    routeContents.get(path) ?? (await readFile(`dist/${path}`, 'utf8'));
  routeContents.set(path, html);
  const runtime = parseIsland(html, 'project-runtime');
  assert.equal(runtime.route, route, `Wrong route binding: ${path}`);
  assert.equal(
    runtime.projectRevision,
    project.revision,
    `Wrong project revision: ${path}`,
  );
  assert.equal(
    runtime.sourceDigest,
    project.meta.sourceDigest,
    `Wrong source revision: ${path}`,
  );
  assert.deepEqual(runtime.taskIds, taskIds, `Wrong task registry: ${path}`);
  assert.equal(runtime.taskId, taskId, `Wrong task binding: ${path}`);
  assert.deepEqual(
    runtime.ui,
    project.meta.ui,
    `Wrong interface copy: ${path}`,
  );
  assert.ok(
    html.includes('assets/project-app.js'),
    `Missing project runtime: ${path}`,
  );
  assert.ok(
    html.includes('assets/project.css'),
    `Missing project styles: ${path}`,
  );
  for (const asset of [
    'app.js',
    'exports.js',
    'content-engine.js',
    'content-templates.js',
    'styles.css',
  ])
    assert.ok(
      !html.includes(`assets/${asset}`),
      `Legacy asset on project page: ${path}`,
    );
  assert.ok(
    !html.includes('id="atlas-data"'),
    `Legacy data island on project page: ${path}`,
  );
  const size = { raw: Buffer.byteLength(html), gzip: gzipSync(html).length };
  if (route !== 'home')
    assert.ok(
      size.gzip <= 80 * 1024,
      `Project route HTML gzip budget80 KiB: ${path}`,
    );
  routeSizes.push({ path, route, ...size });
}
await verifyProjectPage('index.html', 'home');
for (const [planKey, slug, planStem] of [
  ['currentPlan', 'plan', 'current-plan'],
  ['reusePlan', 'reuse', 'reuse-plan'],
])
  for (const taskId of [
    undefined,
    ...project.meta[planKey].tasks.map((task) => task.id),
  ]) {
    const directory = taskId ? `${slug}/tasks/${routeId(taskId)}` : slug;
    const packet = createCurrentPlanPacket(project, taskId, planKey);
    const stem = taskId ? 'task' : planStem;
    assert.deepEqual(
      JSON.parse(await readFile(`dist/${directory}/${stem}.json`, 'utf8')),
      packet,
    );
    assert.equal(
      await readFile(`dist/${directory}/${stem}.md`, 'utf8'),
      serializeCurrentPlanMarkdown(packet),
    );
    assert.equal(
      await readFile(`dist/${directory}/index.html`, 'utf8'),
      renderCurrentPlanPage(project, taskId, planKey),
    );
    await verifyProjectPage(
      `${directory}/index.html`,
      taskId ? `${slug}-task` : slug,
    );
  }
for (const path of clusterRoutes) await verifyProjectPage(path, 'cluster');
for (const [index, task] of project.tasks.entries()) {
  const packet = createTaskPacket(project, task.id);
  assert.deepEqual(
    JSON.parse(await readFile(`dist/tasks/${task.id}/task.json`, 'utf8')),
    packet,
    `Task packet content changed: ${task.id}`,
  );
  assert.equal(
    await readFile(`dist/tasks/${task.id}/task.md`, 'utf8'),
    serializeTaskMarkdown(packet),
    `Task Markdown content changed: ${task.id}`,
  );
  await verifyProjectPage(taskRoutes[index], 'task', task.id);
}

// Validate actual local destinations and fragments, including task downloads and
// links back to the unchanged atlas. Other routes are not initial network cost.
const origin = 'https://saas.invalid';
const prefix = '/saas/';
const allowedFiles = new Set(files);
const fragmentIds = new Map();
for (const [path, html] of routeContents)
  fragmentIds.set(
    path,
    new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])),
  );
let localLinks = 0;
for (const [path, html] of routeContents) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].replaceAll('&amp;', '&');
    const url = new URL(reference, `${origin}${prefix}${path}`);
    if (url.origin !== origin) continue;
    assert.ok(
      url.pathname.startsWith(prefix),
      `Route escapes the project base: ${path} -> ${reference}`,
    );
    let target = decodeURIComponent(url.pathname.slice(prefix.length));
    if (!target || target.endsWith('/')) target += 'index.html';
    assert.ok(
      allowedFiles.has(`dist/${target}`),
      `Missing local route: ${path} -> ${reference}`,
    );
    if (url.hash)
      assert.ok(
        fragmentIds.get(target)?.has(decodeURIComponent(url.hash.slice(1))),
        `Missing local fragment: ${path} -> ${reference}`,
      );
    localLinks++;
  }
}
const maxRoute = (route) =>
  routeSizes
    .filter((entry) => entry.route === route)
    .reduce(
      (largest, entry) =>
        !largest || entry.gzip > largest.gzip ? entry : largest,
      undefined,
    );
const report = {
  status: 'pass',
  data: { clusters: 12, groups: 49, items: data.review.expectedItems },
  sizes,
  totalGzip: total,
  project: {
    counts: {
      clusters: project.clusters.length,
      tasks: project.tasks.length,
      requirements: project.traceability.items.length,
    },
    sizes: projectSizes,
    totalGzip: projectTotal,
    sourceData: await measure(projectPaths.map((path) => `dist/${path}`)),
    maxClusterRoute: maxRoute('cluster'),
    maxTaskRoute: maxRoute('task'),
    taskPacketsVerified: project.tasks.length,
    localLinksVerified: localLinks,
    routes: {
      home: 'index.html',
      atlas: 'atlas/index.html',
      clusters: clusterRoutes,
      tasks: taskRoutes,
    },
    routeSizes,
  },
  unnecessaryProfileAssets: 0,
  files,
};
console.log(
  JSON.stringify(
    {
      ...report,
      project: { ...report.project, routes: undefined, routeSizes: undefined },
      files: files.length,
    },
    null,
    2,
  ),
);
await mkdir('artifacts', { recursive: true });
await writeFile(
  'artifacts/build-verification.json',
  JSON.stringify(report, null, 2),
);

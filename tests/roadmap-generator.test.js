import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const root = new URL('../', import.meta.url);
const generator = fileURLToPath(new URL('scripts/update-roadmap.mjs', root));
const targets = [
  ['data island', /<script\b[^>]*\bid="atlas-data"[^>]*>[\s\S]*?<\/script>/g],
  ['cluster list', /<ol\b[^>]*\bclass="clusters"[^>]*>[\s\S]*?<\/ol>/g],
  ['rail navigation', /<aside\b[^>]*\bclass="rail"[^>]*>[\s\S]*?<\/aside>/g],
  [
    'cluster picker',
    /<div\b[^>]*\bclass="cluster-panel"[^>]*>\s*<fieldset\b[^>]*>[\s\S]*?<\/fieldset>\s*<\/div>/g,
  ],
  ['roadmap intro', /<section\b[^>]*\bid="roadmap"[^>]*>[\s\S]*?<\/section>/g],
  [
    'roadmap filters',
    /<details\b[^>]*\bid="roadmap-filters"[^>]*>[\s\S]*?<\/details>/g,
  ],
];
const normalized = (value) => value.replace(/\s+/g, ' ').trim();
const escaped = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function generate(cwd, check = false) {
  const result = spawnSync(
    process.execPath,
    [generator, ...(check ? ['--check'] : [])],
    { cwd, encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024 },
  );
  assert.ifError(result.error);
  assert.notEqual(result.status, null, result.stderr);
  return result;
}

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'saas-roadmap-generator-'));
  const manifest = JSON.parse(
    await readFile(new URL('data/manifest.json', root), 'utf8'),
  );
  const names = [
    './manifest.json',
    manifest.metadata,
    manifest.roadmap,
    manifest.interface,
    manifest.messages,
    manifest.review,
    ...(manifest.componentCatalog ? [manifest.componentCatalog] : []),
    ...(manifest.developmentPlan ? [manifest.developmentPlan] : []),
    ...manifest.clusters,
  ].map((path) => path.replace(/^\.\//, ''));
  const paths = [
    'index.html',
    ...names.map((name) => `data/${name}`),
    'tests/fixtures/original-inventory.json',
  ];
  assert.ok(
    paths.includes('data/clusters/12.json'),
    'Nested cluster data must be guarded against source writes',
  );
  const originals = await Promise.all(
    paths.map(async (path) => [
      path,
      await readFile(new URL(path, root), 'utf8'),
    ]),
  );
  t.after(async () => {
    try {
      for (const [path, original] of originals) {
        assert.equal(
          await readFile(new URL(path, root), 'utf8'),
          original,
          `tracked source changed: ${path}`,
        );
      }
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
  await Promise.all([
    copyFile(new URL('index.html', root), join(directory, 'index.html')),
    cp(new URL('data/', root), join(directory, 'data'), { recursive: true }),
    mkdir(join(directory, 'tests/fixtures'), { recursive: true }),
  ]);
  await copyFile(
    new URL('tests/fixtures/original-inventory.json', root),
    join(directory, 'tests/fixtures/original-inventory.json'),
  );
  return directory;
}

test('generator refreshes formatted visible roadmap metadata and is idempotent', async (t) => {
  const directory = await fixture(t);
  const index = join(directory, 'index.html');
  const roadmapPath = join(directory, 'data/roadmap.json');
  const roadmap = JSON.parse(await readFile(roadmapPath, 'utf8'));
  roadmap.baseline = 'Generator regresyonu & <kapsam> değişti.';
  roadmap.reviewedAt = '2099-12-31';
  roadmap.supportLabels.partial = 'Regresyon kısmi & <strong>kapsam</strong>';
  await writeFile(roadmapPath, JSON.stringify(roadmap));
  const clusterPath = join(directory, 'data/clusters/12.json');
  const cluster = JSON.parse(await readFile(clusterPath, 'utf8'));
  cluster.groups
    .flatMap((group) => group.items)
    .find((item) => item.assessment.support === 'partial').assessment.support =
    'external';
  await writeFile(clusterPath, JSON.stringify(cluster));

  const before = await readFile(index, 'utf8');
  assert.notEqual(generate(directory, true).status, 0);
  assert.equal(await readFile(index, 'utf8'), before, '--check must not write');
  let result = generate(directory);
  assert.equal(result.status, 0, result.stderr);
  const updated = await readFile(index, 'utf8');
  const intro = updated.match(
    /<section\b[^>]*\bid="roadmap"[^>]*>[\s\S]*?<\/section>/,
  )[0];
  assert.ok(normalized(intro).includes(escaped(roadmap.baseline)));
  assert.ok(
    intro.includes('&lt;kapsam&gt;'),
    'metadata must remain HTML-escaped',
  );
  assert.match(normalized(intro), /İnceleme: 2099-12-31\./);
  const overview = intro.match(
    /<div\b[^>]*\bclass="support-overview"[^>]*>([\s\S]*?)<\/div>/,
  )[1];
  const counts = Object.fromEntries(
    Object.keys(roadmap.supportLabels).map((code) => [code, 0]),
  );
  for (const step of roadmap.sequence) {
    const cluster = JSON.parse(
      await readFile(join(directory, `data/clusters/${step.id}.json`), 'utf8'),
    );
    for (const group of cluster.groups)
      for (const item of group.items) counts[item.assessment.support]++;
  }
  assert.deepEqual(
    [
      ...overview.matchAll(
        /<span\s*>\s*<strong\s*>\s*(\d+)\s*<\/strong\s*>([\s\S]*?)<\/span\s*>/g,
      ),
    ].map((match) => [Number(match[1]), normalized(match[2])]),
    Object.entries(roadmap.supportLabels).map(([code, label]) => [
      counts[code],
      escaped(label),
    ]),
    'visible support counts and labels must match source data',
  );
  const island = JSON.parse(
    updated.match(
      /<script\b[^>]*\bid="atlas-data"[^>]*>([\s\S]*?)<\/script>/,
    )[1],
  );
  assert.deepEqual(island.roadmap, roadmap);
  const filterLabel = updated.match(
    /<button\b[^>]*\bdata-support="partial"[^>]*>([\s\S]*?)<\/button\s*>/,
  )[1];
  assert.equal(normalized(filterLabel), escaped(roadmap.supportLabels.partial));
  result = generate(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(index, 'utf8'), updated, 'second regeneration');
  result = generate(directory, true);
  assert.equal(result.status, 0, result.stderr);
});

test('check rejects missing or duplicate generated targets without writing', async (t) => {
  const directory = await fixture(t);
  const index = join(directory, 'index.html');
  const initial = generate(directory);
  assert.equal(initial.status, 0, initial.stderr);
  const canonical = await readFile(index, 'utf8');
  for (const [name, pattern] of targets) {
    const matches = [...canonical.matchAll(pattern)];
    assert.equal(matches.length, 1, `${name}: fixture must have one target`);
    const block = matches[0][0];
    for (const mode of ['missing', 'duplicate']) {
      const changed = canonical.replace(block, () =>
        mode === 'missing' ? '' : `${block}\n${block}`,
      );
      const malformed = await format(changed, { parser: 'html' });
      await writeFile(index, malformed);
      assert.notEqual(
        generate(directory, true).status,
        0,
        `${name}: ${mode} target must fail --check`,
      );
      assert.equal(
        await readFile(index, 'utf8'),
        malformed,
        `${name}: read only`,
      );
    }
  }
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import { renderDocument, validateAtlas } from '../assets/content-engine.js';

const root = new URL('../', import.meta.url);
const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, root), 'utf8'));
const baseline = await readJson('tests/fixtures/content-baseline.json');
const strings = await readJson('tests/fixtures/content-strings.json');

async function sourceDocuments() {
  const manifest = await readJson('data/manifest.json');
  const paths = [
    manifest.metadata,
    manifest.roadmap,
    manifest.interface,
    manifest.messages,
    manifest.review,
    ...manifest.clusters,
  ];
  assert.equal(new Set(paths).size, paths.length, 'One owner per content file');
  assert.equal(manifest.clusters.length, 12);
  const documents = await Promise.all(
    paths.map((path) => readJson(`data/${path.replace(/^\.\//, '')}`)),
  );
  return { manifest, documents };
}

test('classified content preserves the entire frozen atlas, not only feature titles', async () => {
  const { documents } = await sourceDocuments();
  const [metadata, roadmap, _copy, _messages, _review, ...clusters] = documents;
  const projected = structuredClone(clusters);
  for (const c of projected)
    for (const g of c.groups)
      g.items = g.items.slice(
        0,
        baseline.clusters
          .find((old) => old.id === c.id)
          .groups.find((old) => old.id === g.id).items.length,
      );
  const model = { ...metadata, roadmap, clusters: projected };
  assert.deepEqual(model, baseline);
  assert.equal(clusters.flatMap((c) => c.groups).length, 49);
  const ids = clusters.flatMap((c) =>
    c.groups.flatMap((g) =>
      g.items.map((_item, index) => `${g.id}-${index + 1}`),
    ),
  );
  assert.equal(ids.length, 351);
  assert.equal(new Set(ids).size, 351);
});

test('classified JSON is content only, with no embedded markup, styles or programs', async () => {
  const { documents } = await sourceDocuments();
  function inspect(value, path = '') {
    if (typeof value === 'string') {
      assert.doesNotMatch(
        value,
        /<\/?(?:script|style|div|span|p|strong|a|details|input)\b[^>]*>/i,
        path,
      );
      assert.doesNotMatch(
        value,
        /(?:javascript:|data:text\/html|\bfunction\s*\([^)]*\)\s*\{|\b(?:import|export)\s+(?:const|function|\{))/i,
        path,
      );
    } else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        assert.ok(
          ![
            'html',
            'innerHTML',
            'css',
            'javascript',
            'script',
            'onClick',
          ].includes(key),
          `${path}.${key}`,
        );
        inspect(child, `${path}.${key}`);
      }
    } else
      assert.ok(
        value === null || ['number', 'boolean'].includes(typeof value),
        path,
      );
  }
  documents.forEach((document, index) => inspect(document, String(index)));
});

test('frozen content baselines cannot be silently regenerated with a migration', async () => {
  const hashes = {
    'content-baseline.json':
      '134cfdf802712781f18e26af278446b359bd4ed173b4268780552c9e7cf73d1a',
    'content-strings.json':
      '265e031845acc4f21551ba7e0529f9d873683cf8de129a857ef174d39ddd2f12',
  };
  for (const [file, expected] of Object.entries(hashes)) {
    const bytes = await readFile(new URL(`tests/fixtures/${file}`, root));
    assert.equal(
      createHash('sha256')
        .update(JSON.stringify(JSON.parse(bytes)))
        .digest('hex'),
      expected,
      file,
    );
  }
  assert.ok(strings.text.length > 2200);
});

test('the JSON renderer preserves every original readable phrase and accessible label', async () => {
  const data = await readContentSources();
  const html = renderDocument(data).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/g,
    '',
  );
  const decode = (value) =>
    value
      .replaceAll('&quot;', '"')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&amp;', '&');
  const rendered = decode(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  const leaves = (value) =>
    typeof value === 'string'
      ? [value]
      : value && typeof value === 'object'
        ? Object.values(value).flatMap(leaves)
        : [];
  for (const phrase of strings.text) {
    if (
      phrase === 'Tüm başlıkları genişlet' ||
      Object.values(data.interface.retiredCopy ?? {}).includes(phrase)
    ) {
      assert.ok(
        leaves(data.interface).includes(phrase),
        'Retired open-all copy is retained as content',
      );
    } else
      assert.ok(rendered.includes(phrase), `Original phrase lost: ${phrase}`);
  }
  for (const label of strings.attributes) {
    if (Object.values(data.interface.retiredCopy ?? {}).includes(label))
      assert.ok(
        leaves(data.interface).includes(label),
        'Superseded metadata is archived',
      );
    else
      assert.ok(decode(html).includes(label), `Accessible copy lost: ${label}`);
  }
});

test('CSV review column objects and extra columns are rejected before export can fail', async () => {
  const data = {
    ...structuredClone(baseline),
    interface: await readJson('data/interface.json'),
    messages: await readJson('data/messages.json'),
  };
  for (const columns of [
    { 0: 'Plan kapsamı', 1: 'Kapsam gerekçesi' },
    ['Plan kapsamı', 'Kapsam gerekçesi', 'Fazla sütun'],
  ]) {
    const mutated = structuredClone(data);
    mutated.messages.export.csv.reviewColumns = columns;
    assert.throws(() => validateAtlas(mutated), /Invalid content:/);
  }
});

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import { validateAtlas, renderDocument } from '../assets/content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';
const baseline = JSON.parse(
  await readFile(new URL('./fixtures/catalog-baseline.json', import.meta.url)),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const entries = (catalog) => catalog.sections.flatMap((s) => s.entries);
const leaves = (x) =>
  typeof x === 'string'
    ? [x]
    : x && typeof x === 'object'
      ? Object.values(x).flatMap(leaves)
      : [];
const readable = (s) =>
  s
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
test('component catalog preserves all384 full records106 decisions and adds only three explicit missing capabilities', () => {
  assert.equal(
    createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
    'eb1bf8ad29544dbbf6ea3191bdeba92bdf0dff4d17164121d5d4a1b6d7b631e7',
  );
  const projected = structuredClone(data.clusters);
  const additions = [];
  for (const c of projected)
    for (const g of c.groups) {
      const old = baseline.clusters
        .find((x) => x.id === c.id)
        .groups.find((x) => x.id === g.id);
      additions.push(
        ...g.items
          .slice(old.items.length)
          .map((_, i) => `${g.id}-${old.items.length + i + 1}`),
      );
      g.items = g.items.slice(0, old.items.length);
    }
  assert.deepEqual(projected, baseline.clusters);
  assert.deepEqual(
    additions.sort(),
    ['model-8', 'realtime-7', 'reports-9'].sort(),
  );
  assert.equal(data.review.decisions.length, 109);
  assert.deepEqual(
    data.review.decisions.slice(106).map((x) => x.id),
    [
      'component-metadata-adapter',
      'component-assignment-work-queue',
      'component-print-document-output',
    ],
  );
  assert.equal(data.review.expectedItems, 387);
  assert.deepEqual(
    data.review.decisions.slice(0, 106),
    baseline.review.decisions,
  );
  for (const key of ['groupDefaults', 'itemOverrides', 'decisionNotes'])
    for (const [id, value] of Object.entries(baseline.review[key]))
      assert.deepEqual(data.review[key][id], value);
  for (const key of [
    'roadmap',
    'messages',
    'sources',
    'generated',
    'classification',
  ])
    assert.deepEqual(data[key], baseline[key]);
  const all = new Set([...leaves(data.interface), ...leaves(data.review.copy)]);
  for (const s of [
    ...leaves(baseline.interface),
    ...leaves(baseline.review.copy),
  ])
    assert.ok(all.has(s), s);
});
test('all40families15views8providers have actionable Frappe boundaries and valid inventory links', () => {
  const c = data.componentCatalog;
  assert.ok(c, 'classified catalog must load');
  assert.equal(c.version, 1);
  assert.deepEqual(
    c.sections.map((s) => [s.id, s.entries.length]),
    [
      ['families', 40],
      ['views', 15],
      ['providers', 8],
    ],
  );
  assert.equal(new Set(entries(c).map((x) => x.id)).size, 63);
  const ids = new Set(
    data.clusters.flatMap((c) =>
      c.groups.flatMap((g) => g.items.map((_, i) => `${g.id}-${i + 1}`)),
    ),
  );
  for (const e of entries(c)) {
    for (const k of [
      'id',
      'title',
      'description',
      'frappe',
      'work',
      'acceptance',
    ])
      assert.ok(typeof e[k] === 'string' && e[k].trim(), `${e.id}.${k}`);
    assert.ok(['core', 'conditional', 'project'].includes(e.need));
    assert.ok(e.itemIds.length);
    for (const id of e.itemIds) assert.ok(ids.has(id), `${e.id}:${id}`);
  }
  const text = leaves(c).join(' ');
  for (const re of [
    /Ant Design X/u,
    /Tauri 2/u,
    /TanStack Router/u,
    /TanStack Query/u,
    /AG Grid/u,
    /TanStack Table/u,
    /docstatus/u,
    /Dynamic Link/u,
    /frm/u,
    /Keycloak/u,
  ])
    assert.match(text, re);
  assert.match(c.source.sha256, /^[a-f0-9]{64}$/);
  assert.equal(c.source.reviewedAt, '2026-10-11');
});
test('invalid component data is rejected atomically and executable-looking text is escaped', () => {
  assert.ok(data.componentCatalog);
  for (const mutate of [
    (c) => c.sections[0].entries[0].itemIds.push('unknown-999'),
    (c) => (c.sections[0].entries[0].need = 'always-ready'),
    (c) => (c.sections[0].entries[1].id = c.sections[0].entries[0].id),
    (c) => (c.sources[0].url = 'javascript:alert(1)'),
    (c) => (c.labels.work = null),
  ]) {
    const x = structuredClone(data);
    mutate(x.componentCatalog);
    assert.throws(() => validateAtlas(x), TypeError);
  }
  const x = structuredClone(data);
  x.componentCatalog.sections[0].entries[0].description =
    '<img src=x onerror=alert(1)>';
  const html = renderDocument(x);
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!html.includes('<img src=x onerror=alert(1)>'));
  assert.doesNotThrow(() => validateAtlas(baseline));
  assert.ok(!renderDocument(baseline).includes('id="component-catalog"'));
});
test('selected JSON and Markdown include every related catalog field without unrelated entries or inventory IDs', () => {
  assert.ok(data.componentCatalog);
  const id = data.componentCatalog.sections[0].entries[0].itemIds[0];
  const payload = buildSelection(data, [id]);
  const expected = entries(data.componentCatalog)
    .filter((e) => e.itemIds.includes(id))
    .map((e) => ({ ...e, itemIds: [id] }));
  assert.deepEqual(entries(payload.componentCatalog), expected);
  assert.deepEqual(
    payload.componentCatalog.source,
    data.componentCatalog.source,
  );
  assert.equal(payload.selectedCount, 1);
  const md = readable(serializeExport(payload, 'md').text);
  for (const e of expected)
    for (const s of leaves(e)) assert.ok(md.includes(s), s);
  for (const e of entries(data.componentCatalog).filter(
    (e) => !e.itemIds.includes(id),
  ))
    assert.ok(!md.includes(e.title), e.title);
  assert.deepEqual(JSON.parse(serializeExport(payload, 'json').text), payload);
  assert.equal(buildSelection(data, []).componentCatalog, undefined);
  assert.equal(buildSelection(baseline, [id]).componentCatalog, undefined);
  const all = data.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items.map((_, i) => `${g.id}-${i + 1}`)),
  );
  assert.deepEqual(
    buildSelection(data, all).componentCatalog,
    data.componentCatalog,
  );
});
test('all63 catalog disclosures are closed native accordions in static fallback with complete visible source content', () => {
  assert.ok(data.componentCatalog);
  const html = renderDocument(data);
  assert.equal((html.match(/class="catalog-entry"/g) || []).length, 63);
  assert.ok(!/<details[^>]*class="catalog-entry"[^>]*\bopen\b/.test(html));
  assert.ok(html.includes('name="atlas-components"'));
  for (const e of entries(data.componentCatalog))
    assert.ok(html.includes(`id="component-${e.id}"`), e.id);
  assert.ok(html.includes('id="component-catalog"'));
});

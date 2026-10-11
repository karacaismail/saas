import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import {
  renderDocument,
  resolvePlanning,
  validateAtlas,
} from '../assets/content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';

const baseline = JSON.parse(
  await readFile(new URL('./fixtures/mobile-baseline.json', import.meta.url)),
);
const stage = JSON.parse(
  await readFile(new URL('./fixtures/catalog-baseline.json', import.meta.url)),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const additions = [
  'channels-17',
  'channels-18',
  'channels-19',
  'releases-12',
  'releases-13',
  'identity-10',
  'ai-7',
];
const corrected = ['channels-12', 'channels-13', 'channels-15', 'identity-9'];
const decisionIds = [
  'stack',
  'ui',
  'devices',
  'lifecycle',
  'release',
  'ota',
  'store',
  'oidc',
  'login-theme',
  'social',
  'offline',
  'genui',
].map((x) => `mobile-${x}`);
const entries = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, i) => ({ id: `${g.id}-${i + 1}`, group: g.id, item })),
  ),
);
const byId = new Map(entries.map((x) => [x.id, x]));
const leaves = (value) =>
  typeof value === 'string'
    ? [value]
    : value && typeof value === 'object'
      ? Object.values(value).flatMap(leaves)
      : [];
const readable = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

test('mobile expansion preserves all377 complete items and94 decisions and archives replaced planning copy', () => {
  assert.equal(
    createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
    '2bb2fd8db2de90febc153ceb9950041fdddde4fa521f206a3d8df26ef0244c30',
  );
  const projected = structuredClone(stage.clusters);
  const added = [];
  for (const c of projected)
    for (const g of c.groups) {
      const old = baseline.clusters
        .find((x) => x.id === c.id)
        .groups.find((x) => x.id === g.id);
      added.push(
        ...g.items
          .slice(old.items.length)
          .map((_, i) => `${g.id}-${old.items.length + i + 1}`),
      );
      g.items = g.items.slice(0, old.items.length);
    }
  assert.deepEqual(projected, baseline.clusters);
  assert.deepEqual(added.sort(), [...additions].sort());
  assert.equal(entries.length, 387);
  assert.deepEqual(
    data.review.decisions.slice(0, 94),
    baseline.review.decisions,
  );
  assert.equal(data.review.decisions.length, 109);
  for (const key of ['groupDefaults', 'source', 'scopeLabels', 'coverage'])
    assert.deepEqual(data.review[key], baseline.review[key]);
  for (const [id, planning] of Object.entries(baseline.review.itemOverrides)) {
    if (corrected.includes(id))
      assert.deepEqual(
        data.interface.retiredCopy.mobile.itemOverrides[id],
        planning,
      );
    else assert.deepEqual(data.review.itemOverrides[id], planning, id);
  }
  for (const key of [
    'roadmap',
    'messages',
    'sources',
    'generated',
    'classification',
  ])
    assert.deepEqual(data[key], baseline[key], key);
  const current = new Set([
    ...leaves(data.interface),
    ...leaves(data.review.copy),
  ]);
  for (const text of [
    ...leaves(baseline.interface),
    ...leaves(baseline.review.copy),
  ])
    assert.ok(current.has(text), `Lost historical text: ${text}`);
});

test('Tauri2 and Ant Design X are binding while Capacitor and Capawesome remain unselected history', () => {
  assert.deepEqual(
    data.review.decisions.slice(94, 106).map((x) => x.id),
    decisionIds,
  );
  for (const d of data.review.decisions.slice(94, 106)) {
    assert.match(d.reason, /Kabul:/u, d.id);
    for (const id of d.itemIds) assert.ok(byId.has(id), `${d.id}: ${id}`);
  }
  const stack = data.review.decisions.find((x) => x.id === 'mobile-stack');
  assert.match(stack.reason, /Tauri 2/u);
  assert.match(stack.reason, /Android.*iOS/u);
  assert.match(
    data.review.decisions.find((x) => x.id === 'mobile-ui').reason,
    /Ant Design.*Ant Design X/u,
  );
  assert.equal(
    resolvePlanning(data.review, 'channels', 'channels-12').scope,
    'implementation',
  );
  assert.match(
    resolvePlanning(data.review, 'channels', 'channels-12').label,
    /Tarihsel.*Tauri 2/u,
  );
  for (const id of corrected)
    assert.match(
      resolvePlanning(data.review, byId.get(id).group, id).label,
      /Tauri 2/u,
      id,
    );
  for (const id of additions) {
    const item = byId.get(id)?.item;
    assert.ok(item, id);
    assert.equal(item.assessment.confidence, 'design', id);
    assert.equal(item.assessment.reviewedAt, '2026-10-11', id);
    assert.equal(item.assessment.support, 'external', id);
    for (const key of ['owner', 'note', 'acceptance'])
      assert.ok(item.assessment[key]?.trim(), `${id}.${key}`);
    assert.ok(item.assessment.sources.length, id);
  }
  for (const id of [
    'offline-mobile',
    'offline-desktop',
    'offline-storage',
    'offline-auth',
  ])
    assert.match(data.review.decisionNotes[id], /Tarihsel.*Tauri 2/u, id);
  const release = leaves(byId.get('releases-12')?.item).join(' ');
  assert.match(release, /masaüstü/u);
  assert.match(release, /mağaza/u);
  assert.match(release, /Capawesome/u);
  assert.match(leaves(byId.get('ai-7')?.item).join(' '), /katalog/u);
});

test('optional current labels and historical decision notes are validated and escaped without changing legacy planning', () => {
  const example = structuredClone(baseline);
  example.review.itemOverrides['channels-12'].label =
    'Tarihsel alternatif · Tauri 2';
  assert.equal(
    resolvePlanning(example.review, 'channels', 'channels-12').label,
    'Tarihsel alternatif · Tauri 2',
  );
  assert.deepEqual(
    resolvePlanning(baseline.review, 'channels', 'channels-12'),
    {
      scope: 'required',
      label: baseline.review.scopeLabels.required,
      reason: baseline.review.itemOverrides['channels-12'].reason,
    },
  );
  example.review.decisionNotes = {
    'offline-mobile': 'Tarihsel <img src=x onerror=alert(1)> · Tauri 2',
  };
  const html = renderDocument(validateAtlas(example));
  assert.ok(
    html.includes('Tarihsel &lt;img src=x onerror=alert(1)&gt; · Tauri 2'),
  );
  assert.ok(!html.includes('<img src=x'));
  for (const mutate of [
    (x) => {
      x.review.itemOverrides['channels-12'].label = { invalid: true };
    },
    (x) => {
      x.review.decisionNotes = { 'unknown-decision': 'Tarihsel' };
    },
    (x) => {
      x.review.decisionNotes = { 'offline-mobile': false };
    },
  ]) {
    const invalid = structuredClone(baseline);
    mutate(invalid);
    assert.throws(() => validateAtlas(invalid), /Invalid/);
  }
});

test('selected mobile content and historical context survive JSON Markdown and CSV without unrelated notes', () => {
  const selected = [...additions, ...corrected];
  const payload = buildSelection(data, selected);
  assert.equal(payload.selectedCount, 11);
  const json = JSON.parse(serializeExport(payload, 'json').text);
  const expected = data.review.decisions.filter((d) =>
    d.itemIds.some((id) => selected.includes(id)),
  );
  assert.deepEqual(json.review.decisions, expected);
  const expectedNotes = Object.fromEntries(
    Object.entries(data.review.decisionNotes).filter(([id]) =>
      expected.some((d) => d.id === id),
    ),
  );
  assert.deepEqual(json.review.decisionNotes, expectedNotes);
  const md = readable(serializeExport(payload, 'md').text);
  for (const note of Object.values(expectedNotes))
    assert.ok(md.includes(note), note);
  for (const item of json.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  )) {
    assert.deepEqual(
      item.assessment,
      byId.get(item.id).item.assessment,
      item.id,
    );
    assert.deepEqual(
      item.planning,
      resolvePlanning(data.review, byId.get(item.id).group, item.id),
      item.id,
    );
    for (const text of [
      item.text,
      item.assessment.note,
      item.assessment.acceptance,
      item.planning.label,
      item.planning.reason,
    ])
      assert.ok(md.includes(text), `${item.id}: missing text`);
  }
  const csv = serializeExport(payload, 'csv').text;
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('Tarihsel alternatif · Güncel mobil yol Tauri 2'));
  const unrelated = buildSelection(data, ['tenant-1']);
  assert.ok(
    !unrelated.review.decisionNotes ||
      Object.keys(unrelated.review.decisionNotes).length === 0,
  );
});

test('native fallback visibly marks superseded mobile choices and renders all seven additions', () => {
  const html = renderDocument(data);
  for (const id of additions)
    assert.ok(html.includes(`id="feature-${id}"`), id);
  assert.ok(html.includes('Tarihsel alternatif · Güncel mobil yol Tauri 2'));
  for (const note of Object.values(data.review.decisionNotes))
    assert.ok(
      html.includes(
        note
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;'),
      ),
    );
});

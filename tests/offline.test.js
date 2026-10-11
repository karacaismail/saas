import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import { renderDocument, resolvePlanning } from '../assets/content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';

const baseline = JSON.parse(
  await readFile(new URL('./fixtures/offline-baseline.json', import.meta.url)),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const additions = [
  'channels-10',
  'channels-11',
  'channels-12',
  'channels-13',
  'channels-14',
  'channels-15',
  'channels-16',
  'identity-9',
  'integrity-7',
  'integrity-8',
  'integrity-9',
  'integrity-10',
  'releases-11',
  'backup-7',
];
const targets = {
  architecture: ['channels-10', 'channels-1', 'channels-2'],
  web: ['channels-11'],
  mobile: ['channels-12'],
  desktop: ['channels-13'],
  extension: ['channels-14'],
  storage: ['channels-15'],
  outbox: ['events-4', 'events-5', 'channels-15'],
  sync: ['integrity-7', 'integration-7'],
  rules: ['integrity-8'],
  auth: ['identity-9', 'identity-1'],
  bootstrap: ['channels-16'],
  conflicts: ['integrity-1', 'realtime-5'],
  inventory: ['integrity-9'],
  migrations: ['releases-11', 'releases-4'],
  backup: ['backup-7', 'backup-4'],
  acceptance: ['integrity-10'],
};
const entries = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, i) => ({ id: `${g.id}-${i + 1}`, group: g.id, item })),
  ),
);
const byId = new Map(entries.map((e) => [e.id, e]));
const leaves = (value) =>
  typeof value === 'string'
    ? [value]
    : value && typeof value === 'object'
      ? Object.values(value).flatMap(leaves)
      : [];
const markdownText = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

test('offline expansion freezes all363 full records and all78 decisions without rewriting history', async () => {
  assert.equal(
    createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
    'c830949da7c9159bf2c95de3f8769bc7a48c9bd6fcc3ab5334eac640fb2dcced',
  );
  assert.equal(
    baseline.clusters.flatMap((c) => c.groups.flatMap((g) => g.items)).length,
    363,
  );
  // Project this stage through the immutable pre-mobile publication.
  const stage = JSON.parse(
    await readFile(new URL('./fixtures/mobile-baseline.json', import.meta.url)),
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
  assert.equal(data.review.expectedItems, 387);
  assert.equal(data.review.expectedGroups, 49);
  assert.deepEqual(
    data.review.addedItemIds.slice(0, 37),
    baseline.review.addedItemIds,
  );
  assert.equal(data.review.addedItemIds.length, 61);
  assert.deepEqual(
    data.review.decisions.slice(0, 78),
    baseline.review.decisions,
  );
  assert.equal(data.review.decisions.length, 109);
  for (const key of ['groupDefaults', 'source', 'scopeLabels', 'coverage'])
    assert.deepEqual(data.review[key], baseline.review[key], key);
  for (const [id, planning] of Object.entries(baseline.review.itemOverrides)) {
    if (['channels-2', 'channels-7'].includes(id)) {
      assert.equal(data.review.itemOverrides[id].scope, 'required', id);
      assert.notEqual(data.review.itemOverrides[id].reason, planning.reason);
    } else assert.deepEqual(data.review.itemOverrides[id], planning, id);
  }
  assert.deepEqual(data.roadmap, baseline.roadmap);
  assert.deepEqual(data.messages, baseline.messages);
  assert.deepEqual(
    {
      sources: data.sources,
      generated: data.generated,
      classification: data.classification,
    },
    baseline.metadata,
  );
  const currentCopy = new Set(leaves(data.interface));
  for (const text of leaves(baseline.interface))
    assert.ok(currentCopy.has(text), `Historical UI content lost: ${text}`);
  for (const text of leaves(baseline.review.copy))
    assert.ok(
      currentCopy.has(text) || leaves(data.review.copy).includes(text),
      `Historical review copy lost: ${text}`,
    );
});

test('all requested offline platform decisions link real capabilities and separate architecture from implementation proof', () => {
  const decisions = data.review.decisions.filter((d) =>
    d.id.startsWith('offline-'),
  );
  assert.deepEqual(
    decisions.map((d) => d.id),
    Object.keys(targets).map((id) => `offline-${id}`),
  );
  for (const decision of decisions) {
    for (const id of targets[decision.id.slice(8)])
      assert.ok(decision.itemIds.includes(id), `${decision.id}: ${id}`);
    for (const id of decision.itemIds)
      assert.ok(byId.has(id), `${decision.id}: dangling ${id}`);
    assert.match(decision.reason, /O[0-3]/u, `${decision.id}: delivery stage`);
    assert.match(decision.reason, /Kabul:/u, `${decision.id}: acceptance`);
  }
  for (const id of additions) {
    const e = byId.get(id);
    assert.ok(e, id);
    assert.equal(e.item.kind, 'g', id);
    assert.equal(e.item.assessment.confidence, 'design', id);
    assert.equal(e.item.assessment.reviewedAt, '2026-10-11', id);
    assert.notEqual(e.item.assessment.support, 'native', id);
    assert.equal(
      resolvePlanning(data.review, e.group, id).scope,
      id === 'channels-12' ? 'implementation' : 'required',
      id,
    );
    for (const key of ['owner', 'note', 'acceptance'])
      assert.ok(e.item.assessment[key]?.trim(), `${id}.${key}`);
    assert.ok(e.item.assessment.sources.length > 0, id);
    for (const s of e.item.assessment.sources)
      assert.equal(new URL(s.url).protocol, 'https:', id);
  }
});

test('offline critical requirements cover packaging, durable data, identity boundaries and four-day fault acceptance', () => {
  const text = (id) => leaves(byId.get(id)?.item).join(' ').toLowerCase();
  for (const [id, required] of Object.entries({
    'channels-11': [/vite/u, /pwa/u, /service worker/u],
    'channels-12': [/capacitor/u, /android/u, /ios/u, /aab/u, /apk/u, /ipa/u],
    'channels-13': [
      /tauri/u,
      /windows/u,
      /macos/u,
      /linux/u,
      /msi/u,
      /dmg/u,
      /appimage/u,
      /rpm/u,
      /deb/u,
    ],
    'channels-14': [/wxt/u, /manifest v3|mv3/u, /zip/u],
    'channels-15': [/sqlite/u, /indexeddb/u, /kota/u],
    'identity-9': [/keycloak/u, /pkce/u, /offline_access/u],
    'integrity-7': [/frappe/u, /cursor|imleç/u, /silme|tombstone/u],
    'integrity-8': [/python/u, /sunucu/u, /test/u],
    'integrity-9': [/stok/u, /onay|hak/u],
    'integrity-10': [/dört gün|4 gün/u, /yeniden başlat/u, /kayıt/u],
    'releases-11': [/imza/u, /kuyruk|outbox/u],
    'backup-7': [
      /yedek/u,
      /geri yükle/u,
      /özgün kaynak cihaz/u,
      /tekilleştirme penceresi/u,
    ],
  }))
    for (const pattern of required) assert.match(text(id), pattern, id);
});

test('selected offline capabilities export complete assessments and only related planning decisions in JSON and Markdown', () => {
  const selected = [...additions, 'events-4', 'events-5'];
  for (const id of selected) assert.ok(byId.has(id), id);
  const payload = buildSelection(data, selected);
  assert.equal(payload.schemaVersion, 3);
  assert.equal(payload.selectedCount, 16);
  const json = JSON.parse(serializeExport(payload, 'json').text);
  const expectedDecisions = data.review.decisions.filter((d) =>
    d.itemIds.some((id) => selected.includes(id)),
  );
  assert.deepEqual(json.review.decisions, expectedDecisions);
  const md = markdownText(serializeExport(payload, 'md').text);
  const items = json.clusters.flatMap((c) => c.groups.flatMap((g) => g.items));
  assert.deepEqual(items.map((x) => x.id).sort(), [...selected].sort());
  for (const item of items) {
    const source = byId.get(item.id);
    assert.deepEqual(item.assessment, source.item.assessment, item.id);
    assert.deepEqual(
      item.planning,
      resolvePlanning(data.review, source.group, item.id),
    );
    for (const value of [
      item.text,
      item.assessment.note,
      item.assessment.acceptance,
      item.planning.reason,
    ])
      assert.ok(md.includes(value), `${item.id}: missing export content`);
  }
  for (const decision of expectedDecisions)
    assert.ok(md.includes(decision.reason), decision.id);
  const csv = serializeExport(payload, 'csv').text;
  assert.ok(csv.startsWith('\uFEFF'));
  for (const item of items)
    assert.ok(csv.includes(item.text.replaceAll('"', '""')), item.id);
});

test('the static fallback and JSON renderer include the entire new offline plan without scripts in content', () => {
  const html = renderDocument(data);
  for (const id of additions) {
    const item = byId.get(id)?.item;
    assert.ok(item, id);
    assert.ok(html.includes(`id="feature-${id}"`), id);
    assert.ok(
      html.includes(
        item.text
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;'),
      ),
      id,
    );
  }
  for (const decision of data.review.decisions.filter((d) =>
    d.id.startsWith('offline-'),
  ))
    assert.ok(html.includes(decision.title), decision.id);
});

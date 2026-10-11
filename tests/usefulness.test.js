import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import { resolvePlanning } from '../assets/content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';

const baseline = JSON.parse(
  await readFile(
    new URL('./fixtures/usefulness-baseline.json', import.meta.url),
  ),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const additions = [
  'views-11',
  'views-12',
  'views-13',
  'views-14',
  'views-15',
  'views-16',
  'views-17',
  'forms-6',
  'integrity-6',
  'jobs-8',
  'support-9',
  'channels-9',
];
const recommendationIds = [
  'connection',
  'save-state',
  'draft-recovery',
  'session-resume',
  'undo-recovery',
  'uncertain-outcome',
  'data-freshness',
  'job-center',
  'partial-retry',
  'impact-preview',
  'actionable-errors',
  'service-status',
  'empty-states',
  'support-package',
  'saved-views',
  'share-links',
  'recents-pins',
  'templates',
  'calculation-explanation',
  'timezones',
  'keyboard-commands',
  'offline-sync',
  'edit-conflicts',
  'low-data',
  'notification-digest',
].map((id) => `useful-${id}`);
const criticalTargets = {
  connection: ['views-11'],
  'save-state': ['views-12'],
  'draft-recovery': ['forms-6'],
  'session-resume': ['forms-3', 'channels-8'],
  'undo-recovery': ['views-9', 'integrity-2', 'integrity-6'],
  'uncertain-outcome': ['views-13'],
  'data-freshness': ['views-14'],
  'job-center': ['jobs-8'],
  'partial-retry': ['integrity-4', 'jobs-3', 'transfer-3'],
  'impact-preview': ['views-15'],
  'actionable-errors': ['views-16'],
  'service-status': ['service-1', 'service-2'],
  'empty-states': ['views-8'],
  'support-package': ['support-9'],
  'saved-views': ['views-7'],
  'share-links': ['channels-8', 'views-7'],
  'recents-pins': ['shell-6', 'shell-9'],
  templates: ['views-17'],
  'calculation-explanation': ['reports-7'],
  timezones: ['locale-4', 'jobs-6'],
  'keyboard-commands': ['shell-9', 'channels-5'],
  'offline-sync': ['channels-7'],
  'edit-conflicts': ['integrity-1', 'realtime-5'],
  'low-data': ['channels-9'],
  'notification-digest': ['notifications-6'],
};
const benefitCategories = [
  {
    category: /kategori:\s*emeği ve veriyi koruyanlar/u,
    benefit: /fayda:\s*çok\s+yüksek/u,
  },
  {
    category: /kategori:\s*işi tamamlamayı kolaylaştıranlar/u,
    benefit: /fayda:\s*yüksek/u,
  },
  {
    category: /kategori:\s*günlük kullanımı hızlandıranlar/u,
    benefit: /fayda:\s*orta[\s/–—-]*yüksek/u,
  },
  {
    category: /kategori:\s*kullanıma bağlı değer sağlayanlar/u,
    benefit: /fayda:\s*bağlama\s+bağlı/u,
  },
];
const entries = data.clusters.flatMap((cluster) =>
  cluster.groups.flatMap((group) =>
    group.items.map((item, i) => ({
      id: `${group.id}-${i + 1}`,
      group: group.id,
      item,
    })),
  ),
);
const byId = new Map(entries.map((entry) => [entry.id, entry]));
const usefulDecisions = () =>
  data.review.decisions.filter((d) => d.id.startsWith('useful-'));

function readableMarkdown(value) {
  return value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function csvRows(source) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const csv = source.replace(/^\uFEFF/, '');
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (quoted && csv[i + 1] === '"') {
        value += '"';
        i++;
      } else quoted = !quoted;
    } else if (!quoted && (char === ',' || char === '\r')) {
      row.push(value);
      value = '';
      if (char === '\r') {
        assert.equal(csv[++i], '\n');
        rows.push(row);
        row = [];
      }
    } else value += char;
  }
  assert.equal(quoted, false);
  assert.equal(value, '');
  assert.deepEqual(row, []);
  return rows;
}

test('usefulness expansion preserves all 351 complete historical records and their positions', () => {
  assert.equal(
    createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
    '8fc2e4168d66fd552a1c75be515c1541ca56c4a8232feffe0c443aaf54296d1d',
    'Never regenerate the pre-usefulness data fixture to pass an expansion',
  );
  assert.equal(
    baseline.clusters.flatMap((c) => c.groups.flatMap((g) => g.items)).length,
    351,
  );
  const projected = structuredClone(data.clusters);
  for (const cluster of projected) {
    const oldCluster = baseline.clusters.find((c) => c.id === cluster.id);
    assert.ok(oldCluster, cluster.id);
    for (const group of cluster.groups) {
      const oldGroup = oldCluster.groups.find((g) => g.id === group.id);
      assert.ok(oldGroup, group.id);
      group.items = group.items.slice(0, oldGroup.items.length);
    }
  }
  assert.deepEqual(projected, baseline.clusters);
});

test('only the twelve declared tail capabilities expand the 49-heading inventory', () => {
  const added = [];
  for (const cluster of data.clusters) {
    const oldCluster = baseline.clusters.find((c) => c.id === cluster.id);
    for (const group of cluster.groups) {
      const oldGroup = oldCluster.groups.find((g) => g.id === group.id);
      added.push(
        ...group.items
          .slice(oldGroup.items.length)
          .map((_, i) => `${group.id}-${oldGroup.items.length + i + 1}`),
      );
    }
  }
  assert.deepEqual(added.sort(), [...additions].sort());
  assert.equal(entries.length, 363);
  assert.equal(data.clusters.length, 12);
  assert.equal(data.clusters.flatMap((c) => c.groups).length, 49);
  assert.equal(data.review.expectedItems, 363);
  assert.equal(data.review.expectedGroups, 49);
  assert.deepEqual(
    [...data.review.addedItemIds].sort(),
    [...baseline.review.addedItemIds, ...additions].sort(),
  );
  assert.equal(new Set(data.review.addedItemIds).size, 37);
});

test('the 53 earlier decisions and existing scope assignments remain unchanged, including all required integrations', () => {
  assert.equal(baseline.review.decisions.length, 53);
  assert.deepEqual(
    data.review.decisions.slice(0, 53),
    baseline.review.decisions,
  );
  assert.deepEqual(data.review.groupDefaults, baseline.review.groupDefaults);
  for (const [id, decision] of Object.entries(baseline.review.itemOverrides))
    assert.deepEqual(data.review.itemOverrides[id], decision, id);
  for (const key of ['source', 'scopeLabels', 'coverage'])
    assert.deepEqual(data.review[key], baseline.review[key], key);
  const oldIntegrationDecisions = baseline.review.decisions.filter((d) =>
    d.id.startsWith('integration-plan-'),
  );
  assert.equal(oldIntegrationDecisions.length, 8);
  for (const decision of oldIntegrationDecisions) {
    assert.deepEqual(
      data.review.decisions.find((d) => d.id === decision.id),
      decision,
    );
    for (const id of decision.itemIds) {
      const entry = byId.get(id);
      assert.ok(entry, id);
      assert.deepEqual(
        resolvePlanning(data.review, entry.group, id),
        resolvePlanning(baseline.review, entry.group, id),
        id,
      );
    }
  }
  for (const id of [
    'integration-5',
    'integration-9',
    'integration-10',
    'integration-11',
    'integration-12',
    'integration-13',
    'integration-14',
    'realtime-1',
    'realtime-3',
    'transfer-7',
  ]) {
    assert.equal(
      resolvePlanning(data.review, byId.get(id).group, id).scope,
      'required',
      id,
    );
  }
});

test('all 25 recommendations have categorized benefit, priority, acceptance and concrete valid item links', () => {
  const decisions = usefulDecisions();
  assert.deepEqual(
    decisions.map((d) => d.id),
    recommendationIds,
  );
  assert.deepEqual(
    Object.keys(criticalTargets).map((id) => `useful-${id}`),
    recommendationIds,
  );
  assert.equal(data.review.decisions.length, 78);
  for (const [index, decision] of decisions.entries()) {
    assert.ok(['add', 'merge'].includes(decision.kind), decision.id);
    assert.ok(decision.title.trim(), decision.id);
    for (const marker of ['Kategori:', 'Fayda:', 'Öncelik:', 'Kabul:'])
      assert.ok(decision.reason.includes(marker), `${decision.id}: ${marker}`);
    assert.ok(decision.itemIds.length > 0, decision.id);
    assert.equal(
      new Set(decision.itemIds).size,
      decision.itemIds.length,
      decision.id,
    );
    for (const id of decision.itemIds)
      assert.ok(byId.has(id), `${decision.id}: ${id}`);
    for (const id of criticalTargets[decision.id.slice('useful-'.length)])
      assert.ok(
        decision.itemIds.includes(id),
        `${decision.id} must retain the capability link ${id}`,
      );
    const category =
      benefitCategories[index < 7 ? 0 : index < 14 ? 1 : index < 21 ? 2 : 3];
    const reason = decision.reason.toLocaleLowerCase('tr-TR');
    assert.match(reason, category.category, `${decision.id}: benefit category`);
    assert.match(reason, category.benefit, `${decision.id}: benefit level`);
  }
  for (const id of additions)
    assert.ok(
      decisions.some((decision) => decision.itemIds.includes(id)),
      id,
    );
});

test('every new useful capability exports its full assessment and independent plan in JSON Markdown and unchanged CSV columns', () => {
  for (const id of additions)
    assert.ok(byId.has(id), `Missing capability ${id}`);
  const payload = buildSelection(data, additions);
  assert.equal(payload.schemaVersion, 3);
  assert.equal(payload.selectedCount, 12);
  const exported = JSON.parse(serializeExport(payload, 'json').text);
  const items = exported.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  );
  assert.deepEqual(items.map((item) => item.id).sort(), [...additions].sort());
  const markdown = readableMarkdown(serializeExport(payload, 'md').text);
  const rows = csvRows(serializeExport(payload, 'csv').text);
  assert.equal(rows.length, 13);
  for (const row of rows) assert.equal(row.length, 18);
  for (const item of items) {
    const original = byId.get(item.id);
    assert.deepEqual(item.assessment, original.item.assessment, item.id);
    assert.deepEqual(
      item.planning,
      resolvePlanning(data.review, original.group, item.id),
      item.id,
    );
    assert.equal(item.assessment.confidence, 'design', item.id);
    assert.ok(item.assessment.reviewedAt, item.id);
    for (const field of ['owner', 'note', 'acceptance'])
      assert.ok(item.assessment[field]?.trim(), `${item.id}.${field}`);
    assert.ok(item.assessment.sources.length > 0, item.id);
    for (const value of [
      item.text,
      item.assessment.owner,
      item.assessment.note,
      item.assessment.acceptance,
      item.planning.reason,
    ])
      assert.ok(markdown.includes(value), item.id);
    const row = rows.find((cells) => cells[6] === item.text);
    assert.ok(row, item.id);
    assert.equal(row[9], item.assessment.owner);
    assert.equal(row[11], item.assessment.note);
    assert.equal(row[12], item.assessment.acceptance);
    assert.equal(row[16], item.planning.label);
    assert.equal(row[17], item.planning.reason);
    for (const source of item.assessment.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assert.ok(markdown.includes(source.url), item.id);
      assert.ok(row[13].includes(source.url), item.id);
    }
  }
});

test('selecting a recommendation exports exactly the linked decisions and excludes unrelated recommendations', () => {
  const decisions = usefulDecisions();
  assert.equal(decisions.length, 25);
  for (const decision of decisions) {
    const selectedId = decision.itemIds[0];
    const payload = buildSelection(data, [selectedId]);
    const exported = JSON.parse(serializeExport(payload, 'json').text);
    const expected = data.review.decisions.filter((d) =>
      d.itemIds.includes(selectedId),
    );
    assert.equal(exported.selectedCount, 1, decision.id);
    assert.deepEqual(exported.review.decisions, expected, decision.id);
    assert.ok(
      exported.review.decisions.some((d) => d.id === decision.id),
      decision.id,
    );
    const markdown = readableMarkdown(serializeExport(payload, 'md').text);
    for (const linked of expected) {
      assert.ok(markdown.includes(linked.id), linked.id);
      assert.ok(markdown.includes(linked.title), linked.id);
      assert.ok(markdown.includes(linked.reason), linked.id);
    }
    for (const unrelated of decisions.filter(
      (d) => !d.itemIds.includes(selectedId),
    ))
      assert.equal(
        markdown.includes(`(${unrelated.id} ·`),
        false,
        unrelated.id,
      );
  }
});

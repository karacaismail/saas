import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { readContentSources } from '../scripts/content-files.mjs';
import {
  resolvePlanning,
  renderDocument,
  validateAtlas,
} from '../assets/content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';

const baseline = JSON.parse(
  await readFile(
    new URL('./fixtures/integration-baseline.json', import.meta.url),
  ),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const additions = [
  'integration-9',
  'integration-10',
  'integration-11',
  'integration-12',
  'integration-13',
  'integration-14',
  'transfer-7',
];
const entries = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, i) => ({ id: `${g.id}-${i + 1}`, group: g.id, item })),
  ),
);
const byId = new Map(entries.map((entry) => [entry.id, entry]));
const models = {
  webhook: ['integration-5'],
  rest: ['integration-9'],
  graphql: ['integration-10'],
  soap: ['integration-11'],
  websocket: ['realtime-1', 'realtime-3'],
  xml: ['integration-12'],
  formats: ['transfer-7'],
  'mcp-mapping': ['integration-13', 'integration-14'],
};
const hash = (value) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('new assessment provenance shows its own date while historical assessments retain their original date', () => {
  const html = renderDocument(data);
  for (const id of additions) {
    assert.equal(byId.get(id).item.assessment.reviewedAt, '2026-10-11', id);
    const start = html.indexOf(`id="feature-${id}"`);
    const section = html.slice(start, html.indexOf('<ul aria-label=', start));
    assert.match(
      section,
      /class="assessment-basis" data-reviewed-at="2026-10-11"/,
      id,
    );
    assert.doesNotMatch(
      section,
      /class="assessment-basis" data-reviewed-at="2026-10-10"/,
      id,
    );
  }
  const start = html.indexOf('id="feature-tenant-1"');
  const section = html.slice(start, html.indexOf('<ul aria-label=', start));
  assert.match(
    section,
    /class="assessment-basis" data-reviewed-at="2026-10-10"/,
  );
  assert.equal(
    Object.hasOwn(byId.get('tenant-1').item.assessment, 'reviewedAt'),
    false,
  );
});

test('invalid optional assessment dates are rejected instead of becoming misleading evidence', () => {
  for (const reviewedAt of [
    null,
    {},
    '',
    '2026-02-31',
    '2026-13-01',
    '2026-10-11T00:00:00Z',
  ]) {
    const changed = structuredClone(data);
    changed.clusters
      .flatMap((c) => c.groups)
      .find((g) => g.id === 'integration').items[8].assessment.reviewedAt =
      reviewedAt;
    assert.throws(
      () => validateAtlas(changed),
      /Invalid content: assessment.reviewedAt/,
    );
  }
});

function csvRows(csv) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const source = csv.replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === '"') {
      if (quoted && source[i + 1] === '"') {
        value += '"';
        i++;
      } else quoted = !quoted;
    } else if (!quoted && (char === ',' || char === '\r')) {
      row.push(value);
      value = '';
      if (char === '\r') {
        assert.equal(source[++i], '\n');
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

function readableMarkdown(value) {
  return value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

test('integration baseline freezes all 344 full records and permits only seven tail additions', () => {
  assert.equal(
    hash(baseline),
    '6eb2e2e6f874ad59cce85e5e22a04d4d219c54e111cc465536ef4eee8a09facd',
    'Never regenerate the pre-integration data fixture to pass a migration',
  );
  assert.equal(
    baseline.clusters.flatMap((c) => c.groups.flatMap((g) => g.items)).length,
    344,
  );
  const projected = structuredClone(data.clusters);
  const added = [];
  for (const c of projected)
    for (const g of c.groups) {
      const oldGroup = baseline.clusters
        .find((old) => old.id === c.id)
        .groups.find((old) => old.id === g.id);
      added.push(
        ...g.items
          .slice(oldGroup.items.length)
          .map((_, i) => `${g.id}-${oldGroup.items.length + i + 1}`),
      );
      g.items = g.items.slice(0, oldGroup.items.length);
    }
  assert.deepEqual(projected, baseline.clusters);
  assert.deepEqual(added.sort(), [...additions].sort());
  assert.equal(entries.length, 351);
  assert.equal(data.review.expectedItems, 351);
  assert.equal(data.review.addedItemIds.length, 25);
  assert.equal(
    hash(data.review.decisions.slice(0, 38)),
    '1536d1334c9478d7107fe179bc37d0b2e2aad86172fc7ae69adf9a4f2183f512',
  );
  assert.equal(data.review.source.itemCount, 402);
  assert.equal(data.review.source.clusterCount, 17);
});

test('all eight requested integration models are mandatory with explicit phased decisions', () => {
  assert.equal(data.review.reviewedAt, '2026-10-11');
  for (const [model, ids] of Object.entries(models)) {
    const decision = data.review.decisions.find(
      (d) => d.id === `integration-plan-${model}`,
    );
    assert.ok(decision, model);
    assert.match(decision.reason, /M[123]/);
    for (const id of ids) {
      assert.ok(byId.has(id), id);
      assert.ok(decision.itemIds.includes(id), `${model}: ${id}`);
      assert.equal(
        resolvePlanning(data.review, byId.get(id).group, id).scope,
        'required',
        id,
      );
    }
  }
  for (const id of [
    'integration-7',
    ...Array.from({ length: 6 }, (_, i) => `transfer-${i + 1}`),
  ])
    assert.equal(
      resolvePlanning(data.review, byId.get(id).group, id).scope,
      'required',
      id,
    );
  assert.equal(
    resolvePlanning(data.review, 'realtime', 'realtime-2').scope,
    'implementation',
  );
  for (const group of ['ai', 'rag', 'agents'])
    assert.equal(data.review.groupDefaults[group].scope, 'advanced');
  const websocket = data.review.itemOverrides['realtime-1'].reason;
  assert.match(websocket, /Socket\.IO/);
  assert.match(websocket, /WebSocket/);
  assert.match(data.review.itemOverrides['integration-5'].reason, /inbound/);
});

test('new gaps separate native foundations from product adapters and carry complete evidence', () => {
  const expected = {
    'integration-9': ['partial', 'integrate', /REST/, /OpenAPI/, /Keycloak/],
    'integration-10': ['absent', 'build', /GraphQL/, /resolver/, /N\+1/],
    'integration-11': ['absent', 'build', /SOAP/, /WSDL/, /fault/],
    'integration-12': ['absent', 'build', /XML/, /cursor/, /external entity/],
    'integration-13': ['absent', 'build', /MCP/, /Streamable HTTP/, /audience/],
    'integration-14': [
      'absent',
      'build',
      /AI Mapping/,
      /önizleme/,
      /deterministik/,
    ],
    'transfer-7': ['partial', 'extend', /JSON/, /CSV/, /XLSX/],
  };
  for (const [id, [support, action, ...concepts]] of Object.entries(expected)) {
    const item = byId.get(id)?.item;
    assert.ok(item, id);
    assert.equal(item.kind, 'g', id);
    assert.equal(item.assessment.support, support, id);
    assert.equal(item.assessment.action, action, id);
    assert.equal(item.assessment.confidence, 'design', id);
    for (const field of ['owner', 'note', 'acceptance'])
      assert.ok(item.assessment[field]?.trim(), `${id}.${field}`);
    assert.ok(item.assessment.sources.length, id);
    for (const source of item.assessment.sources) {
      assert.ok(source.title);
      assert.equal(new URL(source.url).protocol, 'https:');
    }
    const content = [
      item.text,
      item.assessment.note,
      item.assessment.acceptance,
    ].join(' ');
    for (const concept of concepts) assert.match(content, concept, id);
    assert.ok(
      data.review.decisions.some(
        (d) => d.id === `add-${id}` && d.itemIds.includes(id),
      ),
      id,
    );
  }
});

test('selected integration capabilities retain full assessment and scope metadata in JSON Markdown and CSV', () => {
  const ids = [...new Set(Object.values(models).flat())];
  const payload = buildSelection(data, ids);
  assert.equal(payload.selectedCount, 10);
  assert.equal(payload.schemaVersion, 3);
  const parsed = JSON.parse(serializeExport(payload, 'json').text);
  const selected = parsed.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  );
  assert.deepEqual(new Set(selected.map((i) => i.id)), new Set(ids));
  const markdown = readableMarkdown(serializeExport(payload, 'md').text);
  const rows = csvRows(serializeExport(payload, 'csv').text);
  assert.equal(rows.length, ids.length + 1);
  assert.equal(rows[0].length, 18);
  for (const item of selected) {
    assert.deepEqual(item.assessment, byId.get(item.id).item.assessment);
    assert.deepEqual(
      item.planning,
      resolvePlanning(data.review, byId.get(item.id).group, item.id),
    );
    assert.equal(item.planning.scope, 'required');
    assert.ok(markdown.includes(item.text), item.id);
    assert.ok(markdown.includes(item.assessment.note), item.id);
    assert.ok(markdown.includes(item.assessment.acceptance), item.id);
    assert.ok(markdown.includes(item.planning.reason), item.id);
    const row = rows.find((r) => r[6] === item.text);
    assert.ok(row, item.id);
    assert.equal(row.length, 18);
    assert.equal(row[9], item.assessment.owner);
    assert.equal(row[11], item.assessment.note);
    assert.equal(row[12], item.assessment.acceptance);
    assert.equal(row[16], item.planning.label);
    assert.equal(row[17], item.planning.reason);
    for (const source of item.assessment.sources) {
      assert.ok(markdown.includes(source.url), item.id);
      assert.ok(row[13].includes(source.url), item.id);
    }
  }
  for (const model of Object.keys(models))
    assert.ok(
      parsed.review.decisions.some((d) => d.id === `integration-plan-${model}`),
    );
  assert.ok(!selected.some((item) => item.id === 'ai-1'));
});

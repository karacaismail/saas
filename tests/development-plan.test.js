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
  await readFile(
    new URL('./fixtures/development-baseline.json', import.meta.url),
  ),
);
const data = await readContentSources();
configureExportMessages(data.messages.export);
const ids = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) => g.items.map((_, i) => `${g.id}-${i + 1}`)),
);
const stages = ['poc', 'mvp', 'post_mvp', 'scale', 'enterprise', 'maturity'];
const digest = (value) => createHash('sha256').update(value).digest('hex');
const readable = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

test('development planning preserves all eighteen existing content files byte for byte', async () => {
  assert.equal(
    digest(JSON.stringify(baseline)),
    'dc6320f87b400095b299d29537115ac40fec79f955197875a26800fa8af9e5d2',
  );
  assert.equal(Object.keys(baseline.files).length, 18);
  for (const [path, expected] of Object.entries(baseline.files))
    assert.equal(digest(await readFile(path)), expected, path);
  assert.equal(ids.length, 387);
  assert.equal(data.review.decisions.length, 109);
});

test('six ordered delivery stages allocate every existing item once without changing its scope', () => {
  const p = data.developmentPlan;
  assert.ok(p, 'Canonical development plan must load');
  assert.deepEqual(
    p.stages.map((s) => s.id),
    stages,
  );
  assert.deepEqual(
    p.assignments.map((a) => a.itemId),
    ids,
  );
  assert.equal(new Set(p.assignments.map((a) => a.itemId)).size, 387);
  for (const a of p.assignments) {
    assert.ok(p.units.some((u) => u.id === a.unitId));
    assert.ok(stages.includes(a.stageId));
    assert.ok(data.roadmap.actionLabels[a.delivery]);
    assert.ok(a.reason.trim());
  }
  const byId = new Map(p.units.map((u) => [u.id, u]));
  for (const a of p.assignments) {
    const groupId = a.itemId.slice(0, a.itemId.lastIndexOf('-'));
    if (resolvePlanning(data.review, groupId, a.itemId).scope === 'required')
      assert.equal(byId.get(a.unitId).need, 'required', a.itemId);
  }
  for (const u of p.units) {
    assert.ok(stages.indexOf(u.startsAt) <= stages.indexOf(u.targetStage));
    for (const dep of u.dependsOn) {
      assert.ok(byId.has(dep), `${u.id}: ${dep}`);
      if (u.need === 'required') assert.equal(byId.get(dep).need, 'required');
    }
  }
  for (const id of [
    'integration-9',
    'integration-10',
    'integration-11',
    'integration-12',
    'integration-13',
    'integration-14',
  ]) {
    const a = p.assignments.find((entry) => entry.itemId === id);
    assert.ok(a, id);
    assert.ok(['mvp', 'post_mvp'].includes(a.stageId), id);
    assert.equal(byId.get(a.unitId).need, 'required', id);
  }
});

test('invalid plan references, cycles, missing coverage and unsafe source URLs fail atomically', () => {
  assert.ok(data.developmentPlan);
  for (const mutate of [
    (p) => p.assignments.pop(),
    (p) => (p.assignments[1].itemId = p.assignments[0].itemId),
    (p) => (p.assignments[0].unitId = 'unknown-unit'),
    (p) => (p.assignments[0].stageId = 'later'),
    (p) => p.units[0].dependsOn.push(p.units[0].id),
    (p) => (p.units[0].kind = 'microservice-by-default'),
    (p) => (p.sources[0].url = 'javascript:alert(1)'),
    (p) => p.stages.reverse(),
  ]) {
    const x = structuredClone(data);
    mutate(x.developmentPlan);
    assert.throws(() => validateAtlas(x), TypeError);
  }
  const legacy = structuredClone(data);
  delete legacy.developmentPlan;
  assert.doesNotThrow(() => validateAtlas(legacy));
  assert.ok(!renderDocument(legacy).includes('id="development-plan"'));
  const x = structuredClone(data);
  x.developmentPlan.units[0].customWork = '<img src=x onerror=alert(1)>';
  const html = renderDocument(x);
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!html.includes('<img src=x onerror=alert(1)>'));
});

test('static plan uses closed independent native disclosures and meaningful existing item links', () => {
  assert.ok(data.developmentPlan);
  const html = renderDocument(data);
  assert.ok(html.includes('id="development-plan"'));
  assert.ok(html.includes('name="atlas-development-plan"'));
  assert.ok(!/<details[^>]*id="development-plan"[^>]*\bopen\b/.test(html));
  assert.ok(!/<details[^>]*class="plan-entry"[^>]*\bopen\b/.test(html));
  for (const a of data.developmentPlan.assignments)
    assert.ok(html.includes(`data-plan-item="${a.itemId}"`), a.itemId);
  assert.equal((html.match(/class="feature-check"/g) || []).length, 387);
  assert.equal((html.match(/class="catalog-entry"/g) || []).length, 63);
});

test('selected JSON and Markdown include only selected allocations with complete dependency context while CSV and legacy exports stay unchanged', () => {
  assert.ok(data.developmentPlan);
  const selected = ['tenant-1', 'integration-13'];
  const payload = buildSelection(data, selected);
  const plan = payload.developmentPlan;
  assert.ok(plan);
  assert.deepEqual(
    plan.assignments,
    data.developmentPlan.assignments.filter((a) => selected.includes(a.itemId)),
  );
  const unitIds = new Set(plan.units.map((u) => u.id));
  for (const u of plan.units)
    for (const dep of u.dependsOn) assert.ok(unitIds.has(dep), dep);
  const md = readable(serializeExport(payload, 'md').text);
  for (const a of plan.assignments) assert.ok(md.includes(a.reason), a.itemId);
  for (const u of plan.units) {
    assert.ok(md.includes(u.title), u.id);
    assert.ok(md.includes(u.customWork), u.id);
    assert.ok(md.includes(u.acceptance), u.id);
  }
  for (const u of data.developmentPlan.units.filter((u) => !unitIds.has(u.id)))
    assert.ok(!md.includes(u.customWork), u.id);
  assert.deepEqual(JSON.parse(serializeExport(payload, 'json').text), payload);
  const legacy = structuredClone(data);
  delete legacy.developmentPlan;
  assert.equal(buildSelection(legacy, selected).developmentPlan, undefined);
  assert.equal(buildSelection(data, []).developmentPlan, undefined);
  assert.equal(
    serializeExport(payload, 'csv').text,
    serializeExport(buildSelection(legacy, selected), 'csv').text,
  );
  assert.deepEqual(
    buildSelection(data, ids).developmentPlan,
    data.developmentPlan,
  );
});

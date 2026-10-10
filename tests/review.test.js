import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { readContentSources } from '../scripts/content-files.mjs';
import { renderDocument, validateAtlas } from '../assets/content-engine.js';
const root = new URL('../', import.meta.url);
const baseline = JSON.parse(
  await readFile(new URL('tests/fixtures/content-baseline.json', root), 'utf8'),
);
const model = await readContentSources();
const all = model.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, i) => ({ id: `${g.id}-${i + 1}`, group: g.id, item })),
  ),
);

test('reviewed expansion preserves every original field and adds only the declared 18 capabilities', () => {
  assert.equal(model.review?.version, 1);
  const projected = structuredClone(model.clusters);
  for (const c of projected)
    for (const g of c.groups)
      g.items = g.items.slice(
        0,
        baseline.clusters
          .find((x) => x.id === c.id)
          .groups.find((x) => x.id === g.id).items.length,
      );
  assert.deepEqual(projected, baseline.clusters);
  assert.equal(all.length, 344);
  const oldIds = new Set(
    baseline.clusters.flatMap((c) =>
      c.groups.flatMap((g) => g.items.map((_, i) => `${g.id}-${i + 1}`)),
    ),
  );
  const added = all
    .filter((x) => !oldIds.has(x.id))
    .map((x) => x.id)
    .sort();
  assert.equal(added.length, 18);
  assert.deepEqual([...model.review.addedItemIds].sort(), added);
  assert.equal(model.review.source.itemCount, 402);
  assert.equal(model.review.source.clusterCount, 17);
  assert.equal(model.review.coverage.length, 17);
  assert.equal(new Set(model.review.coverage.map((x) => x.id)).size, 17);
  for (const entry of model.review.coverage) {
    assert.ok(entry.title && entry.reason);
    assert.ok(entry.groupIds.length);
  }
});

test('every item has an independent scope decision and reviewed merges retain concrete targets', () => {
  assert.ok(model.review, 'review metadata must load with JSON');
  for (const { id, group } of all) {
    const p =
      model.review.itemOverrides[id] ?? model.review.groupDefaults[group];
    assert.ok(p && Object.hasOwn(model.review.scopeLabels, p.scope), id);
    assert.ok(p.reason?.trim(), id);
  }
  assert.equal(model.review.itemOverrides['identity-8'].scope, 'conditional');
  assert.equal(model.review.itemOverrides['channels-2'].scope, 'conditional');
  assert.equal(model.review.itemOverrides['modules-2'].scope, 'implementation');
  assert.equal(model.review.itemOverrides['ai-1'].scope, 'advanced');
  assert.equal(model.review.groupDefaults.access.scope, 'required');
  const ids = new Set(all.map((x) => x.id));
  for (const d of model.review.decisions) {
    assert.ok(d.title && d.reason);
    assert.ok(d.itemIds.length);
    for (const id of d.itemIds) assert.ok(ids.has(id), id);
  }
  for (const code of ['merge', 'defer', 'correct', 'add'])
    assert.ok(
      model.review.decisions.some((x) => x.kind === code),
      code,
    );
});

test('review schema rejects missing scopes, dangling decision targets and wrong inventory before mounting', () => {
  assert.ok(model.review);
  for (const mutate of [
    (d) => {
      delete d.review.groupDefaults.access;
    },
    (d) => {
      d.review.decisions[0].itemIds.push('missing-999');
    },
    (d) => {
      d.review.itemOverrides['missing-999'] = {
        scope: 'required',
        reason: 'Invalid target',
      };
    },
    (d) => {
      d.review.expectedItems = 343;
    },
    (d) => {
      d.review.coverage[0].groupIds.push('missing');
    },
    (d) => {
      delete d.review.copy.filterLabel;
    },
  ]) {
    const d = structuredClone(model);
    mutate(d);
    assert.throws(() => validateAtlas(d), /Invalid content:/);
  }
});

test('rendered review is readable without JavaScript and each feature has scope separate from source and Frappe support', () => {
  const html = renderDocument(model);
  assert.match(html, /id="scope-review"/);
  assert.match(html, /data-scope="required"/);
  assert.match(html, /data-scope="conditional"/);
  assert.match(html, /data-scope="advanced"/);
  assert.match(html, /data-scope="implementation"/);
  assert.equal((html.match(/class="scope-note"/g) || []).length, 344);
  assert.match(html, /data-scope-filter="required"/);
});

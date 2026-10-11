import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from '../assets/exports.js';

const baseline = JSON.parse(
  await readFile(new URL('./fixtures/content-baseline.json', import.meta.url)),
);
const messages = JSON.parse(
  await readFile(new URL('../data/messages.json', import.meta.url)),
);
configureExportMessages(messages.export);

function dataset(reviewed) {
  const data = structuredClone(baseline);
  if (reviewed)
    data.review = {
      version: 1,
      reviewedAt: '2026-10-10',
      scopeLabels: { required: 'Zorunlu temel' },
      source: {
        title: 'Export test kaynağı',
        itemCount: 402,
        clusterCount: 17,
        documents: [],
      },
      groupDefaults: {
        tenant: { scope: 'required', reason: 'Test kapsamı.' },
      },
      itemOverrides: {},
      decisions: [],
    };
  return data;
}

function item(data) {
  return data.clusters
    .flatMap((cluster) => cluster.groups)
    .find((group) => group.id === 'tenant').items[0];
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

const legacyHashes = {
  2: {
    json: '53cf853266cd61cf43e9c19fa9209e64310782f87deb466cb6c204c26e3aa68d',
    md: '7e8458e4fe304171106c13175cfbda5b952e5962922c3100df06f6a715ad225f',
    csv: '93c475439934d64c45d49775953413c806456d7c19278e3d5fc10669f43768b4',
  },
  3: {
    json: '7d6c6264b1162fb2248475771892f1dc99ae7f58e4ca32dbb48e7035f37baab2',
    md: '9f4207c6eefb68a7c8fc64d93787cfe1830ac56b29ba33dad83d6edcebfc5055',
    csv: 'f6bbeb565fcb977b984a51235bab1c27065a678a8ccf06ca9698827e94d30196',
  },
};

for (const reviewed of [false, true]) {
  const version = reviewed ? 3 : 2;
  test(`assessment date is optional and preserves every legacy v${version} export byte`, () => {
    const data = dataset(reviewed);
    const payload = buildSelection(data, ['tenant-1']);
    assert.equal(payload.schemaVersion, version);
    const assessment = payload.clusters[0].groups[0].items[0].assessment;
    assert.equal(Object.hasOwn(assessment, 'reviewedAt'), false);
    for (const format of ['json', 'md', 'csv'])
      assert.equal(
        createHash('sha256')
          .update(serializeExport(payload, format).text)
          .digest('hex'),
        legacyHashes[version][format],
        format,
      );
  });

  test(`v${version} JSON export retains an explicit assessment review date without changing its parent date`, () => {
    const data = dataset(reviewed);
    Object.assign(item(data).assessment, {
      confidence: 'design',
      reviewedAt: '2026-10-11',
    });
    const payload = buildSelection(data, ['tenant-1']);
    const parsed = JSON.parse(serializeExport(payload, 'json').text);
    assert.equal(parsed.schemaVersion, version);
    assert.deepEqual(
      parsed.clusters[0].groups[0].items[0].assessment,
      item(data).assessment,
    );
    assert.equal(parsed.roadmap.reviewedAt, '2026-10-10');
    if (reviewed) assert.equal(parsed.review.reviewedAt, '2026-10-10');
  });

  test(`v${version} Markdown and CSV expose the item date in confidence while retaining ${reviewed ? 18 : 16} columns`, () => {
    const data = dataset(reviewed);
    Object.assign(item(data).assessment, {
      confidence: 'design',
      reviewedAt: '2026-10-11',
    });
    const payload = buildSelection(data, ['tenant-1']);
    const markdown = serializeExport(payload, 'md').text.replace(/\\-/g, '-');
    assert.ok(markdown.includes('Mimari karar · 2026-10-11'));
    const rows = csvRows(serializeExport(payload, 'csv').text);
    assert.equal(rows.length, 2);
    for (const row of rows) assert.equal(row.length, reviewed ? 18 : 16);
    assert.equal(rows[1][10], 'Mimari karar · 2026-10-11');
  });
}

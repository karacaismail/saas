import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSelection, serializeExport } from '../assets/exports.js';

function atlas() {
  return {
    generated: 'must not leak',
    clusters: [
      {
        id: '01',
        title: 'Müşteri, kimlik ve erişim',
        short: 'Must not leak',
        groups: [
          {
            id: 'tenant',
            num: '01.1',
            title: 'Kiracı ve kurum',
            owns: 'Must not leak',
            items: [
              { kind: 'o', text: 'Kiracılık modelleri.', raw: 'Multi tenancy' },
              {
                kind: 'g',
                text: 'Şirket, şube ve ekip.',
                internal: 'Must not leak',
              },
              { kind: 'n', text: 'Yeni öneri.' },
            ],
          },
          {
            id: 'identity',
            num: '01.2',
            title: 'Kimlik',
            items: [{ kind: 'o', text: 'İki aşamalı doğrulama.' }],
          },
        ],
      },
      {
        id: '02',
        title: 'Modüller',
        groups: [
          {
            id: 'module-catalog',
            num: '02.1',
            title: 'Modül kataloğu',
            items: [{ kind: 'n', text: 'Güvenli kurulum.' }],
          },
        ],
      },
    ],
  };
}

function freezeDeep(value) {
  Object.freeze(value);
  for (const child of Object.values(value)) {
    if (child && typeof child === 'object') freezeDeep(child);
  }
  return value;
}

// A small CSV reader verifies that quoting and field boundaries survive export.
function readCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (char === '"') {
      if (quoted && input[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if (char === '\r' && input[index + 1] === '\n' && !quoted) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      index += 1;
    } else {
      cell += char;
    }
  }
  assert.equal(quoted, false, 'CSV must close every quoted field');
  assert.equal(cell, '', 'CSV must end with a record delimiter');
  return rows;
}

test('an empty selection and invalid IDs export no groups or clusters', () => {
  const expected = {
    schemaVersion: 1,
    title: 'SaaS özellik atlası',
    selectedCount: 0,
    clusters: [],
  };
  assert.deepEqual(buildSelection(atlas(), []), expected);
  assert.deepEqual(buildSelection(atlas()), expected);
  assert.deepEqual(
    buildSelection(atlas(), ['tenant-0', 'missing-1', 'tenant-99']),
    expected,
  );
});

test('selection preserves source order across clusters and groups and ignores duplicates', () => {
  const payload = buildSelection(atlas(), [
    'module-catalog-1',
    'tenant-3',
    'identity-1',
    'tenant-2',
    'tenant-2',
    'unknown-1',
  ]);
  assert.equal(payload.selectedCount, 4);
  assert.deepEqual(
    payload.clusters.map((cluster) => cluster.id),
    ['01', '02'],
  );
  assert.deepEqual(
    payload.clusters[0].groups.map((group) => group.id),
    ['tenant', 'identity'],
  );
  assert.deepEqual(
    payload.clusters[0].groups[0].items.map((item) => item.id),
    ['tenant-2', 'tenant-3'],
  );
  assert.equal(payload.clusters[1].groups[0].items[0].id, 'module-catalog-1');
});

test('selection copies only the public export contract and retains optional raw text', () => {
  const data = freezeDeep(atlas());
  const payload = buildSelection(
    data,
    new Set(['tenant-1', 'tenant-2', 'tenant-3']),
  );
  assert.deepEqual(payload.clusters, [
    {
      id: '01',
      title: 'Müşteri, kimlik ve erişim',
      groups: [
        {
          id: 'tenant',
          num: '01.1',
          title: 'Kiracı ve kurum',
          items: [
            {
              id: 'tenant-1',
              kind: 'o',
              label: 'Özgün kapsam',
              text: 'Kiracılık modelleri.',
              raw: 'Multi tenancy',
            },
            {
              id: 'tenant-2',
              kind: 'g',
              label: 'Kapsam içi eksik',
              text: 'Şirket, şube ve ekip.',
            },
            {
              id: 'tenant-3',
              kind: 'n',
              label: 'Yeni alan',
              text: 'Yeni öneri.',
            },
          ],
        },
      ],
    },
  ]);
  assert.notEqual(
    payload.clusters[0].groups[0].items[0],
    data.clusters[0].groups[0].items[0],
  );
});

test('JSON is a lossless Unicode export of the selected hierarchy', () => {
  const payload = buildSelection(atlas(), ['tenant-1', 'module-catalog-1']);
  const result = serializeExport(freezeDeep(payload), 'json');
  assert.deepEqual(JSON.parse(result.text), payload);
  assert.match(result.text, /SaaS özellik atlası/);
  assert.equal(result.mime, 'application/json;charset=utf-8');
  assert.equal(result.extension, 'json');
});

test('CSV preserves Turkish, commas, double quotes and embedded newlines', () => {
  const data = atlas();
  const original = 'Şube, "İstanbul"\nİkinci satır\r\nÜçüncü satır';
  data.clusters[0].groups[0].items[1].text = original;
  const result = serializeExport(
    buildSelection(data, ['tenant-2', 'module-catalog-1']),
    'csv',
  );
  const rows = readCsv(result.text);
  assert.equal(result.text[0], '\uFEFF');
  assert.ok(result.text.endsWith('\r\n'));
  assert.deepEqual(rows[0], [
    'Küme no',
    'Küme',
    'Başlık no',
    'Başlık',
    'Madde no',
    'Sınıf',
    'Madde',
  ]);
  assert.deepEqual(rows[1], [
    '01',
    'Müşteri, kimlik ve erişim',
    '01.1',
    'Kiracı ve kurum',
    '01.1.2',
    'Kapsam içi eksik',
    original,
  ]);
  assert.deepEqual(rows[2], [
    '02',
    'Modüller',
    '02.1',
    'Modül kataloğu',
    '02.1.1',
    'Yeni alan',
    'Güvenli kurulum.',
  ]);
  assert.equal(result.mime, 'text/csv;charset=utf-8');
  assert.equal(result.extension, 'csv');
});

test('CSV neutralizes spreadsheet formulas and control prefixes without removing text', () => {
  const values = [
    '=SUM(1,2)',
    '+1+1',
    '-1+1',
    '@SUM(A1)',
    '  =1+1',
    '\tformula',
    '\rformula',
    '\nformula',
    '  \tformula',
  ];
  for (const value of values) {
    const data = atlas();
    data.clusters[0].title = value;
    data.clusters[0].groups[0].title = value;
    data.clusters[0].groups[0].items[0].text = value;
    const rows = readCsv(
      serializeExport(buildSelection(data, ['tenant-1']), 'csv').text,
    );
    assert.equal(rows[1][1], `'${value}`);
    assert.equal(rows[1][3], `'${value}`);
    assert.equal(rows[1][6], `'${value}`);
  }
});

test('CSV leaves normal prose, whitespace, punctuation and internal formula characters intact', () => {
  const values = [
    '  Normal Türkçe metin',
    'SaaS + ERP',
    'E-posta ve oturum',
    'Değer = sonuç',
    'Satır\niçinde yeni satır',
  ];
  for (const value of values) {
    const data = atlas();
    data.clusters[0].groups[0].items[0].text = value;
    const rows = readCsv(
      serializeExport(buildSelection(data, ['tenant-1']), 'csv').text,
    );
    assert.equal(rows[1][6], value);
  }
});

test('Markdown includes selected cluster and heading hierarchy with checked items', () => {
  const result = serializeExport(
    buildSelection(atlas(), ['tenant-2', 'module-catalog-1']),
    'md',
  );
  assert.match(result.text, /^# SaaS özellik atlası\n/);
  assert.match(result.text, /## 01 · Müşteri, kimlik ve erişim/);
  assert.ok(result.text.includes('### 01\\.1 Kiracı ve kurum'));
  assert.ok(
    result.text.includes('- [x] **Kapsam içi eksik** Şirket, şube ve ekip\\.'),
  );
  assert.ok(result.text.includes('## 02 · Modüller'));
  assert.ok(!result.text.includes('İki aşamalı'));
  assert.equal(result.mime, 'text/markdown;charset=utf-8');
  assert.equal(result.extension, 'md');
});

test('Markdown escapes inline formatting, HTML, entities and structural newlines', () => {
  const data = atlas();
  data.clusters[0].title = '*Küme* <script>&copy;</script>';
  data.clusters[0].groups[0].title = '[Başlık](https://example.com)';
  data.clusters[0].groups[0].items[0].text =
    '**kalın** _vurgu_ `kod` [link](url) \\ yol\n# Başlık\r\n- madde <img src=x> &amp;';
  const text = serializeExport(buildSelection(data, ['tenant-1']), 'md').text;
  assert.ok(
    text.includes('\\*Küme\\* &lt;script&gt;&amp;copy;&lt;/script&gt;'),
  );
  assert.ok(text.includes('\\[Başlık\\]\\(https://example\\.com\\)'));
  assert.ok(
    text.includes(
      '\\*\\*kalın\\*\\* \\_vurgu\\_ \\`kod\\` \\[link\\]\\(url\\) \\\\ yol',
    ),
  );
  assert.ok(
    text.includes(
      '&#10;\\# Başlık&#13;&#10;\\- madde &lt;img src\\=x&gt; &amp;amp;',
    ),
  );
  assert.ok(!text.includes('<script>'));
  assert.equal(
    text.split('\n').filter((line) => line.startsWith('- [x]')).length,
    1,
  );
});

test('empty selections still produce a valid document in every supported format', () => {
  const payload = buildSelection(atlas(), []);
  assert.deepEqual(JSON.parse(serializeExport(payload, 'json').text), payload);
  assert.equal(readCsv(serializeExport(payload, 'csv').text).length, 1);
  assert.equal(serializeExport(payload, 'md').text, '# SaaS özellik atlası\n');
});

test('unsupported formats fail explicitly', () => {
  assert.throws(
    () => serializeExport(buildSelection(atlas(), []), 'pdf'),
    RangeError,
  );
});

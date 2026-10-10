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

function roadmapAtlas() {
  const data = atlas();
  data.roadmap = {
    version: 1,
    reviewedAt: '2026-10-10',
    target: 'Frappe Framework; headless frontend; Keycloak',
    baseline: 'Hedef sürüm seçilmedi; runtime kabulü değil.',
    supportLabels: {
      native: 'Çekirdekte var',
      external: 'Harici sorumluluk',
      verify: 'Doğrulanmalı',
    },
    actionLabels: { configure: 'Yapılandır', integrate: 'Entegre et' },
    confidenceLabels: {
      documented: 'Belge dayanağı',
      design: 'Mimari karar',
      verify: 'Doğrulama bekliyor',
    },
    internal: 'Must not leak',
  };
  Object.assign(data.clusters[0], {
    phase: 'Temel mimari',
    roadmapOrder: 2,
    rationale: 'Keycloak kimliği sağlar; Frappe yetki kontrolünü uygular.',
    dependsOn: ['02'],
    internal: 'Must not leak',
  });
  Object.assign(data.clusters[1], {
    phase: 'Temel mimari',
    roadmapOrder: 1,
    rationale: 'Önce platform sınırını tanımla.',
    dependsOn: [],
  });
  data.clusters[0].groups[0].items[0].assessment = {
    support: 'native',
    action: 'configure',
    owner: 'Frappe backend',
    confidence: 'documented',
    note: 'Çekirdek yeteneği var; hedef sürümde doğrulanacak.',
    acceptance: 'İki kiracının verileri API üzerinden izole kalır.',
    sources: [
      {
        title: 'Frappe belgeleri',
        url: 'https://docs.frappe.io/framework/user/en/basics/sites',
        internal: 'Must not leak',
      },
    ],
    internal: 'Must not leak',
  };
  data.clusters[1].groups[0].items[0].assessment = {
    support: 'external',
    action: 'integrate',
    owner: 'Keycloak + headless frontend',
    confidence: 'verify',
    note: 'Sürüm, token ve oturum entegrasyonu henüz doğrulanmadı.',
    acceptance: 'Süresi dolan token her API çağrısında reddedilir.',
    sources: [],
  };
  // Source order is the display/roadmap order; the stable IDs do not change.
  data.clusters.reverse();
  return data;
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

test('roadmap JSON keeps stable IDs, display order, context and complete assessment evidence', () => {
  const data = freezeDeep(roadmapAtlas());
  const payload = buildSelection(data, ['tenant-1', 'module-catalog-1']);
  assert.equal(payload.schemaVersion, 2);
  assert.equal(payload.selectedCount, 2);
  assert.deepEqual(
    payload.clusters.map((cluster) => [cluster.id, cluster.roadmapOrder]),
    [
      ['02', 1],
      ['01', 2],
    ],
  );
  assert.equal(payload.roadmap.baseline, data.roadmap.baseline);
  assert.equal(payload.roadmap.target, data.roadmap.target);
  assert.equal(payload.roadmap.reviewedAt, '2026-10-10');
  assert.deepEqual(payload.roadmap.supportLabels, data.roadmap.supportLabels);
  assert.equal(payload.clusters[1].phase, 'Temel mimari');
  assert.deepEqual(payload.clusters[1].dependsOn, ['02']);
  assert.equal(payload.clusters[1].rationale, data.clusters[1].rationale);
  const exported = payload.clusters[1].groups[0].items[0];
  const original = data.clusters[1].groups[0].items[0];
  assert.equal(exported.id, 'tenant-1');
  assert.equal(exported.kind, 'o');
  assert.equal(exported.assessment.note, original.assessment.note);
  assert.equal(exported.assessment.acceptance, original.assessment.acceptance);
  assert.deepEqual(exported.assessment.sources, [
    {
      title: 'Frappe belgeleri',
      url: 'https://docs.frappe.io/framework/user/en/basics/sites',
    },
  ]);
  assert.notEqual(exported.assessment, original.assessment);
  assert.notEqual(exported.assessment.sources, original.assessment.sources);
  assert.notEqual(
    exported.assessment.sources[0],
    original.assessment.sources[0],
  );
  assert.notEqual(payload.roadmap.supportLabels, data.roadmap.supportLabels);
  const json = serializeExport(payload, 'json').text;
  assert.deepEqual(JSON.parse(json), payload);
  assert.ok(!json.includes('Must not leak'));
  assert.ok(!json.includes('tenant-2'));
});

test('roadmap CSV appends labeled decision evidence without changing stable item numbering', () => {
  const data = roadmapAtlas();
  const assessment = data.clusters[1].groups[0].items[0].assessment;
  assessment.owner = '=HYPERLINK("unsafe")';
  assessment.note = 'Kısmen hazır, "özel" entegrasyon\nPoC gerekiyor.';
  const rows = readCsv(
    serializeExport(buildSelection(data, ['tenant-1']), 'csv').text,
  );
  assert.equal(rows[0][0], 'Küme kimliği');
  assert.deepEqual(rows[0].slice(7), [
    'Frappe yeterliliği',
    'Yapılacak iş',
    'Sorumlu',
    'Kanıt durumu',
    'Değerlendirme',
    'Kabul ölçütü',
    'Kaynaklar',
    'Etap',
    'Küme sırası',
  ]);
  assert.equal(rows[1][0], '01');
  assert.equal(rows[1][4], '01.1.1');
  assert.deepEqual(rows[1].slice(7), [
    'Çekirdekte var',
    'Yapılandır',
    `'${assessment.owner}`,
    'Belge dayanağı',
    assessment.note,
    assessment.acceptance,
    'Frappe belgeleri — https://docs.frappe.io/framework/user/en/basics/sites',
    'Temel mimari',
    '2',
  ]);
});

test('roadmap Markdown separates implementation decisions from original scope classification', () => {
  const data = roadmapAtlas();
  const text = serializeExport(
    buildSelection(data, ['module-catalog-1', 'tenant-1']),
    'md',
  ).text;
  assert.ok(text.includes('Frappe Framework; headless frontend; Keycloak'));
  assert.ok(text.includes('Hedef sürüm seçilmedi; runtime kabulü değil\\.'));
  assert.ok(text.includes('2026\\-10\\-10'));
  assert.ok(text.indexOf('## 02 · Modüller') < text.indexOf('## 01 · Müşteri'));
  assert.ok(text.includes('Etap: Temel mimari'));
  assert.ok(text.includes('Yol haritası sırası: 2'));
  assert.ok(text.includes('Bağımlılıklar: 02'));
  assert.ok(text.includes('- [x] **Özgün kapsam** Kiracılık modelleri\\.'));
  assert.ok(text.includes('Frappe yeterliliği: Çekirdekte var'));
  assert.ok(text.includes('Yapılacak iş: Yapılandır'));
  assert.ok(text.includes('Sorumlu: Frappe backend'));
  assert.ok(text.includes('Kanıt durumu: Belge dayanağı'));
  assert.ok(
    text.includes(
      'Değerlendirme: Çekirdek yeteneği var; hedef sürümde doğrulanacak\\.',
    ),
  );
  assert.ok(
    text.includes(
      'Kabul ölçütü: İki kiracının verileri API üzerinden izole kalır\\.',
    ),
  );
  assert.ok(
    text.includes('https://docs.frappe.io/framework/user/en/basics/sites'),
  );
  assert.ok(text.includes('Harici sorumluluk'));
  assert.ok(text.includes('Doğrulama bekliyor'));
});

test('roadmap exports preserve unknown assessments and escape unsafe metadata and source links', () => {
  const data = roadmapAtlas();
  const assessment = data.clusters[1].groups[0].items[0].assessment;
  assessment.support = 'future-support';
  assessment.action = 'future-action';
  assessment.confidence = 'future-confidence';
  assessment.note = '<script>unsafe</script>\n# forged heading';
  assessment.sources = [
    { title: '[unsafe](link)', url: 'javascript:alert(1)' },
    {
      title: 'Frappe API',
      url: 'https://docs.frappe.io/framework/api/(version)?q=source',
    },
  ];
  const payload = buildSelection(data, ['tenant-1']);
  assert.equal(
    payload.clusters[0].groups[0].items[0].assessment.support,
    'future-support',
  );
  const rows = readCsv(serializeExport(payload, 'csv').text);
  assert.equal(rows[1][7], 'future-support');
  assert.equal(rows[1][8], 'future-action');
  assert.equal(rows[1][10], 'future-confidence');
  const text = serializeExport(payload, 'md').text;
  assert.ok(
    text.includes('&lt;script&gt;unsafe&lt;/script&gt;&#10;\\# forged heading'),
  );
  assert.ok(!text.includes('](javascript:'));
  assert.ok(text.includes('javascript:alert\\(1\\)'));
  assert.ok(
    text.includes(
      '[Frappe API](https://docs.frappe.io/framework/api/%28version%29?q=source)',
    ),
  );
  assert.equal(
    text.split('\n').filter((line) => line.startsWith('- [x]')).length,
    1,
  );
});

test('empty roadmap selections retain version and decision baseline in every format', () => {
  const payload = buildSelection(roadmapAtlas(), []);
  assert.equal(payload.schemaVersion, 2);
  assert.equal(payload.selectedCount, 0);
  assert.deepEqual(payload.clusters, []);
  assert.equal(readCsv(serializeExport(payload, 'csv').text)[0].length, 16);
  assert.ok(
    serializeExport(payload, 'md').text.includes('runtime kabulü değil'),
  );
  assert.deepEqual(JSON.parse(serializeExport(payload, 'json').text), payload);
});

import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const data = JSON.parse(
  html.match(/<script[^>]*id="atlas-data"[^>]*>([\s\S]*?)<\/script>/)[1],
);
const rows = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, index) => ({ id: `${g.id}-${index + 1}`, item })),
  ),
);

test('all original item identities, wording and classifications survive roadmap reordering', async () => {
  const original = JSON.parse(
    await readFile(
      new URL('./fixtures/original-inventory.json', import.meta.url),
      'utf8',
    ),
  );
  const actual = rows.map(({ id, item }) => ({
    id,
    kind: item.kind,
    text: item.text,
    ...('raw' in item ? { raw: item.raw } : {}),
  }));
  const sort = (list) => list.sort((a, b) => a.id.localeCompare(b.id));
  const originalIds = new Set(original.map((row) => row.id));
  assert.deepEqual(
    sort(actual.filter((row) => originalIds.has(row.id))),
    sort(original),
  );
  assert.deepEqual(
    actual
      .filter((row) => !originalIds.has(row.id))
      .map((row) => row.id)
      .sort(),
    [...data.review.addedItemIds].sort(),
  );
});

test('every feature has a complete source-bounded Frappe assessment and acceptance gate', () => {
  assert.equal(data.roadmap?.version, 1);
  for (const { id, item } of rows) {
    const a = item.assessment;
    assert.ok(a, `${id}: assessment missing`);
    assert.ok(
      [
        'native',
        'partial',
        'ecosystem',
        'absent',
        'external',
        'verify',
      ].includes(a.support),
      id,
    );
    assert.ok(
      ['configure', 'extend', 'integrate', 'build', 'validate'].includes(
        a.action,
      ),
      id,
    );
    assert.ok(['documented', 'design', 'verify'].includes(a.confidence), id);
    for (const key of ['owner', 'note', 'acceptance'])
      assert.ok(a[key]?.trim(), `${id}: ${key}`);
    assert.ok(a.sources.length > 0, `${id}: sources`);
    for (const source of a.sources) {
      assert.ok(source.title?.trim(), id);
      assert.equal(new URL(source.url).protocol, 'https:');
    }
  }
});

test('roadmap order starts with operation, identity, security and data before monetization', () => {
  assert.deepEqual(
    data.clusters.map((c) => c.id),
    ['12', '01', '11', '05', '09', '04', '06', '07', '02', '03', '08', '10'],
  );
  data.clusters.forEach((c, i) => {
    assert.equal(c.roadmapOrder, i + 1);
    assert.ok(c.phase);
    assert.ok(c.rationale);
    assert.ok(Array.isArray(c.dependsOn));
  });
  assert.match(data.roadmap.baseline, /sürüm/i);
  assert.match(data.roadmap.target, /Keycloak/);
});

test('public roadmap ownership uses approved roles and the user-designated delivery owner', async () => {
  // The user's standing policy explicitly names Hüseyin Cengiz for new
  // CI/CD, signing and rollback plans; exceptions stay tied to exact delivery IDs.
  const approvedRoles = new Set([
    'AI ajan platformu',
    'AI araç güvenliği',
    'AI güvenlik politikası',
    'AI güvenliği',
    'AI kalite ve gözlem',
    'AI maliyet politikası',
    'AI onay akışı',
    'AI platformu',
    'AI veri güvenliği',
    'AI ürün yönetimi',
    'API platformu',
    'API ve frontend',
    'Arama + AI altyapısı',
    'Arama + Frappe backend',
    'Arama entegrasyonu',
    'BI entegrasyonu',
    'Backend dayanıklılık',
    'Backend e-posta',
    'Backend gözlem güvenliği',
    'Backend kayıt geçmişi',
    'Backend kötüye kullanım',
    'Backend mimarisi',
    'Backend ve DevOps ekibi',
    'Backend ve Keycloak güvenliği',
    'Backend ve frontend',
    'Backend veri tutarlılığı',
    'Backend önbellek',
    'Bildirim altyapısı',
    'Bildirim entegrasyonu',
    'Bildirim politikası',
    'Bildirim ürünü',
    'CRM uygulaması',
    'CRM ve veri kalitesi',
    'Demo veri ekibi',
    'Denetim altyapısı',
    'Denetim ve DevOps ekibi',
    'Denetim ve veri güvenliği',
    'Deney platformu',
    'Depolama entegrasyonu',
    'Destek uygulaması',
    'DevOps ekibi',
    'DevOps ekibi ve DNS operasyon ekibi',
    'DevOps ekibi ve backend',
    'DevOps ekibi ve müşteri operasyonu',
    'DevOps ekibi ve veri güvenliği',
    'DevOps ekibi ve ürün ekibi',
    'DevOps ekibi ve ürün iletişimi',
    'Dil altyapısı',
    'E-posta entegrasyonu',
    'E-posta operasyonu',
    'ERPNext + finans',
    'ERPNext + platform',
    'ERPNext + ödeme',
    'Entegrasyon güvenliği',
    'Entegrasyon platformu',
    'Faturalama + backend',
    'Faturalama + frontend',
    'Faturalama backend',
    'Finans entegrasyonu',
    'Finans ve domain ekipleri',
    'Frappe backend',
    'Frappe backend + frontend',
    'Frappe backend + headless frontend',
    'Frappe backend + platform',
    'Frontend + Frappe backend',
    'Frontend SEO',
    'Frontend onboarding',
    'Frontend ve DevOps ekibi',
    'Frontend ve bildirim',
    'Frontend ve hukuk',
    'Frontend ve veri güvenliği',
    'Frontend ölçüm',
    'Güvenlik mimarisi',
    'Güvenlik operasyonu',
    'Headless frontend',
    'Headless frontend + Frappe backend',
    'Headless frontend + Keycloak',
    'Headless frontend + backend',
    'Headless frontend + destek + Frappe backend',
    'Headless frontend + platform',
    'Hukuk ve DevOps ekibi',
    'Hukuk ve müşteri operasyonu',
    'Hukuk ve veri güvenliği',
    'Hukuk ve veri yaşam döngüsü',
    'Hukuk ve ürün',
    'Kanal entegrasyonu',
    'Keycloak',
    'Keycloak + backend',
    'Keycloak + frontend',
    'Keycloak + istemciler',
    'Keycloak kimlik',
    'Medya işleme',
    'Moderasyon ürünü',
    'Modül mimarisi',
    'Müşteri başarısı',
    'Müşteri sözleşmeleri ve finans',
    'Olay platformu',
    'Ortak çalışma',
    'Otomasyon entegrasyonu',
    'Pazarlama ölçüm',
    'Platform',
    'Platform + ERPNext',
    'Platform + backend',
    'Platform + backend + frontend',
    'Platform + frontend',
    'RAG kalite ve veri',
    'RAG platformu',
    'RAG veri hattı',
    'RAG yetkilendirme',
    'Raporlama güvenliği',
    'Raporlama ve domain ekipleri',
    'Raporlama ürünü',
    'Realtime altyapısı',
    'Realtime güvenliği',
    'Süreç altyapısı',
    'Süreç backend',
    'Süreç backend + frontend',
    'Takvim entegrasyonu',
    'Takvim ve rezervasyon',
    'Toplu işlem altyapısı',
    'Veri hakları',
    'Veri kalitesi',
    'Veri sürekliliği',
    'Veri ve olay platformu',
    'Veri yaşam döngüsü',
    'Veri yönetişimi',
    'Yetki ve destek güvenliği',
    'Ödeme + finans',
    'Ödeme entegrasyonu',
    'Ürün analitiği',
    'Ürün geri bildirimi',
    'Ürün iletişimi',
    'Ürün onboarding',
    'Ürün ve demo verisi',
    'İstemci uygulamaları',
    'İçerik ve frontend',
    'İçerik yönetimi',
    'İş olayı ve e-posta',
    'Şablon yönetimi',
  ]);
  const approvedOwner = (id, owner) =>
    approvedRoles.has(owner) ||
    (['releases-11', 'releases-12', 'channels-17'].includes(id) &&
      owner === 'Hüseyin Cengiz + istemci ekibi') ||
    (id === 'releases-13' && owner === 'Hüseyin Cengiz + ürün ekibi');
  const assessmentFiles = (
    await readdir(new URL('../data/clusters/', import.meta.url))
  )
    .filter((name) => /^\d+\.json$/.test(name))
    .sort();
  assert.ok(assessmentFiles.length > 0, 'assessment sources must be checked');
  for (const name of assessmentFiles) {
    const cluster = JSON.parse(
      await readFile(
        new URL(`../data/clusters/${name}`, import.meta.url),
        'utf8',
      ),
    );
    for (const group of cluster.groups)
      for (const [index, item] of group.items.entries()) {
        const id = `${group.id}-${index + 1}`,
          assessment = item.assessment;
        assert.ok(
          approvedOwner(id, assessment.owner),
          `${name}:${id}: owner must be an approved public role`,
        );
      }
  }
  for (const { id, item } of rows) {
    assert.ok(
      approvedOwner(id, item.assessment?.owner),
      `${id}: published owner must be an approved public role`,
    );
  }
});

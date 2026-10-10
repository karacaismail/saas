import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { format } from 'prettier';

const source = await readFile('index.html', 'utf8');
const island = /(<script[^>]*id="atlas-data"[^>]*>)([\s\S]*?)(<\/script>)/;
function singleMatch(input, pattern, name) {
  const matches = [...input.matchAll(new RegExp(pattern.source, 'g'))];
  assert.equal(
    matches.length,
    1,
    `${name}: exactly one generation target required.`,
  );
  return matches[0];
}
function replaceOnce(input, pattern, replacement, name) {
  singleMatch(input, pattern, name);
  return input.replace(pattern, replacement);
}
const data = JSON.parse(singleMatch(source, island, 'atlas-data')[2]);
const roadmap = JSON.parse(await readFile('data/roadmap.json', 'utf8'));
const assessments = Object.assign(
  {},
  ...(await Promise.all(
    ['01-06', '07-12'].map(async (part) =>
      JSON.parse(await readFile(`data/assessments-${part}.json`, 'utf8')),
    ),
  )),
);
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const original = JSON.parse(
  await readFile('tests/fixtures/original-inventory.json', 'utf8'),
);
assert.equal(
  Object.keys(assessments).length,
  original.length,
  'All 326 assessments required.',
);
const byId = new Map(data.clusters.map((c) => [c.id, c]));
data.roadmap = roadmap;
data.clusters = roadmap.sequence.map((step, index) => {
  const c = byId.get(step.id);
  assert.ok(c, 'Unknown cluster');
  Object.assign(c, step, { roadmapOrder: index + 1 });
  c.groups.forEach((g, groupIndex) => {
    g.num = `${String(index + 1).padStart(2, '0')}.${groupIndex + 1}`;
    g.items.forEach((item, itemIndex) => {
      const id = `${g.id}-${itemIndex + 1}`;
      const a = assessments[id];
      assert.ok(a, `${id}: assessment required`);
      assert.ok(
        Object.hasOwn(roadmap.supportLabels, a.support),
        `${id}: support`,
      );
      assert.ok(Object.hasOwn(roadmap.actionLabels, a.action), `${id}: action`);
      assert.ok(
        Object.hasOwn(roadmap.confidenceLabels, a.confidence),
        `${id}: confidence`,
      );
      for (const field of ['owner', 'note', 'acceptance'])
        assert.ok(a[field]?.trim(), `${id}: ${field}`);
      assert.ok(a.sources?.length, `${id}: sources`);
      a.sources.forEach((s) => {
        assert.equal(new URL(s.url).protocol, 'https:');
        assert.ok(s.title);
      });
      item.assessment = a;
    });
  });
  return c;
});
const sort = (list) => list.sort((a, b) => a.id.localeCompare(b.id));
assert.deepEqual(
  sort(
    data.clusters.flatMap((c) =>
      c.groups.flatMap((g) =>
        g.items.map((item, i) => ({
          id: `${g.id}-${i + 1}`,
          kind: item.kind,
          text: item.text,
          ...('raw' in item ? { raw: item.raw } : {}),
        })),
      ),
    ),
  ),
  sort(original),
  'Original inventory must remain unchanged.',
);
const groupMap = new Map(
  data.clusters.flatMap((c) => c.groups.map((g) => [g.id, g])),
);
const originLabels = { o: 'Özgün', g: 'İç eksik', n: 'Yeni alan' };

function renderFeature(item, g, index) {
  const id = `${g.id}-${index + 1}`,
    a = item.assessment;
  return `<li class="feature" id="feature-${id}" data-item="${id}" data-kind="${item.kind}" data-support="${a.support}" data-action="${a.action}">
    <label class="feature-label" for="check-${id}"><span class="check-target"><input class="feature-check" type="checkbox" id="check-${id}" value="${id}" disabled /></span><span class="feature-content"><span class="origin">${originLabels[item.kind]}</span><span class="feature-title">${escape(item.text)}</span></span></label>
    <div class="assessment-tags" role="group" aria-label="Frappe yeterliliği ve yapılacak iş"><span class="support-tag">${escape(roadmap.supportLabels[a.support])}</span><span>${escape(roadmap.actionLabels[a.action])}</span><span>${escape(a.owner)}</span></div>
    <details class="assessment"><summary>Değerlendirme ve kabul ölçütü<span class="sr-only">: ${escape(item.text)}</span></summary><div class="assessment-body"><p class="assessment-note">${escape(a.note)}</p><p><strong>Kabul ölçütü:</strong> ${escape(a.acceptance)}</p><p><strong>Dayanak:</strong> ${escape(roadmap.confidenceLabels[a.confidence])} · ${roadmap.reviewedAt}. Hedef sürüm ve kurulumda kabul bekliyor.</p><ul aria-label="Madde kaynakları">${a.sources.map((s) => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)}</a></li>`).join('')}</ul></div></details>
    ${'raw' in item ? `<p class="original-trace"><strong>İlk listedeki ifade:</strong> ${escape(item.raw)}</p>` : ''}
  </li>`;
}
function renderGroup(g) {
  return `<details class="group" id="group-${g.id}" data-group="${g.id}" open><summary><div><h3><span class="group-number">${g.num}</span>${escape(g.title)}</h3><p class="group-count"><span>${g.items.length}</span> madde</p></div><span class="group-toggle" aria-hidden="true"><span class="opened">Daralt</span><span class="closed">Aç</span></span></summary><p class="ownership"><strong>Yönettiği kayıtlar:</strong> ${escape(g.owns)}</p><ul class="features" role="list">${g.items.map((item, i) => renderFeature(item, g, i)).join('')}</ul><div class="relations"><p><strong>Alır:</strong> ${g.links.map(([target, label]) => `<a href="#group-${target}" data-jump="group-${target}">${escape(groupMap.get(target).num)} · ${escape(label)}</a>`).join('; ')}.</p><p><strong>Sunar:</strong> ${escape(g.provides)}</p><p class="source-links">${g.sources.map((id) => `<a href="#source-${id}" data-source="${id}">${escape(data.sources[id][0])}</a>`).join(' · ')}</p></div></details>`;
}
function renderCluster(c) {
  return `<li class="cluster" id="cluster-${c.id}" data-cluster="${c.id}"><header class="cluster-head"><span class="cluster-no" aria-hidden="true">${String(c.roadmapOrder).padStart(2, '0')}</span><div><p class="phase">${escape(c.phase)}</p><h2>${escape(c.title)}</h2><p class="cluster-meta"><span class="cluster-groups">${c.groups.length}</span> grup · <span class="cluster-items">${c.groups.reduce((sum, g) => sum + g.items.length, 0)}</span> madde</p><p class="cluster-rationale">${escape(c.rationale)}</p>${
    c.dependsOn.length
      ? `<p class="cluster-dependencies"><strong>Ön koşul:</strong> ${c.dependsOn
          .map((id) => {
            const d = byId.get(id);
            return `<a href="#cluster-${id}" data-jump="cluster-${id}">${escape(d.short)}</a>`;
          })
          .join(' · ')}</p>`
      : ''
  }</div></header>${c.groups.map(renderGroup).join('')}</li>`;
}
const counts = Object.fromEntries(
  Object.keys(roadmap.supportLabels).map((code) => [code, 0]),
);
for (const c of data.clusters)
  for (const g of c.groups)
    for (const item of g.items) counts[item.assessment.support]++;
const intro = `<section class="roadmap-intro" id="roadmap" aria-labelledby="roadmap-title"><h2 id="roadmap-title">Frappe ile geliştirme yol haritası</h2><p>Backend: <strong>Frappe Framework</strong>. SaaS admin paneli: <strong>bağımsız headless frontend</strong>. Giriş, MFA ve oturum: <strong>Keycloak</strong>. Backend yetkilendirmesi Frappe'te kalır.</p><p class="baseline">${escape(roadmap.baseline)} İnceleme: ${roadmap.reviewedAt}.</p><div class="support-overview" role="group" aria-label="Frappe yeterlilik dağılımı">${Object.entries(
  roadmap.supportLabels,
)
  .map(
    ([code, label]) =>
      `<span><strong>${counts[code]}</strong> ${escape(label)}</span>`,
  )
  .join(
    '',
  )}</div><details class="roadmap-guide"><summary>Etiketleri ve geliştirme sırasını nasıl okumalı?</summary><div class="note-body"><dl><dt>Çekirdekte var</dt><dd>Belgelenmiş backend kabiliyeti yeniden yazılmaz; yapılandırma, headless bağlama ve kabul testi yapılır.</dd><dt>Kısmen var</dt><dd>Alt yapı hazırdır; maddede istenen bütün alt işlevler hazır değildir. Kalan iş değerlendirmede belirtilir.</dd><dt>Ek Frappe uygulaması</dt><dd>ERPNext, CRM, Helpdesk, Insights veya Press gibi ayrı uygulama kararıdır. Framework kurulumu tek başına bu özelliği getirmez.</dd><dt>Çekirdekte hazır değil</dt><dd>İncelenen kaynaklarda hazır uçtan uca ürün kabiliyeti saptanmadı; özel geliştirme veya ayrı hizmet seçilir. Evrensel bir yokluk iddiası değildir.</dd><dt>Harici sorumluluk</dt><dd>Keycloak, headless frontend veya altyapı hizmeti bu işi üstlenir. Bağlantı ve sunucu izin denetimi yine geliştirme kapsamındadır.</dd><dt>Doğrulanmalı</dt><dd>Hedef sürüm, deneysel özellik veya kapsam kararı net değildir; PoC sonucu olmadan hazır kabul edilmez.</dd></dl><p><strong>İş etiketi:</strong> Yapılandır / Genişlet / Entegre et / Geliştir / PoC ile doğrula. Her maddede sorumlu katman, dayanak ve ayrı kabul ölçütü vardır. Yeterlilik etiketi planlama veya tamamlanma durumu değildir; checkbox yalnız dışa aktarım seçimidir.</p><p><strong>Güvenilirlik:</strong> Kanıtsız “güvenilmez” etiketi verilmez. Belge dayanağı üretim yeterliliği anlamına gelmez; yetki, izolasyon, hata ve yük kabulü hedef kurulumda ayrıca geçmelidir.</p><p><strong>Sıralama:</strong> Temel işletim → kimlik/izolasyon → güvenlik → veri → API sözleşmeleri → headless panel → süreç/iletişim → paket/tahsilat → iş alanları → ölçüm. Etaplar takvim veya efor tahmini değildir. Güvenlik ve işletim tüm etaplarda sürer; AI/RAG/ajanlar çekirdek API'den sonra ayrıca açılır. Eski madde kimlikleri ve tarayıcı seçimleri korunur.</p><p><strong>İlk karar kapısı:</strong> Frappe/Keycloak release'lerini sabitle; site başına kiracı modelini ve Keycloak subject → Frappe User eşlemesini doğrula. Issuer, audience, imza/JWKS, süre, token iptali, kiracı üyeliği ve her API'de kayıt/alan yetkisini test et. Frappe OAuth desteği Keycloak JWT'lerinin doğrudan kabul edildiğini kanıtlamaz. Tarayıcıya servis API anahtarı veya admin secret koyma.</p><p><a href="https://docs.frappe.io/framework/user/en/python-api/hooks#auth-hooks" target="_blank" rel="noopener noreferrer">Frappe Auth Hooks</a> · <a href="https://docs.frappe.io/framework/user/en/basics/sites" target="_blank" rel="noopener noreferrer">Frappe Sites</a> · <a href="https://www.keycloak.org/securing-apps/javascript-adapter" target="_blank" rel="noopener noreferrer">Keycloak OIDC istemcisi</a></p></div></details></section>`;
const filters = `<details class="roadmap-filters" id="roadmap-filters"><summary>Frappe yeterliliği ve yapılacak işe göre süz<span id="roadmap-filter-status" class="filter-status">Bütün yeterlilikler · Bütün işler</span></summary><div class="roadmap-filter-body"><fieldset><legend>Frappe yeterliliği</legend><div class="tag-filters"><button data-support="all" aria-pressed="true">Bütün yeterlilikler</button>${Object.entries(
  roadmap.supportLabels,
)
  .map(
    ([code, label]) =>
      `<button data-support="${code}" aria-pressed="false">${escape(label)}</button>`,
  )
  .join(
    '',
  )}</div></fieldset><fieldset><legend>Yapılacak iş</legend><div class="tag-filters"><button data-action="all" aria-pressed="true">Bütün işler</button>${Object.entries(
  roadmap.actionLabels,
)
  .map(
    ([code, label]) =>
      `<button data-action="${code}" aria-pressed="false">${escape(label)}</button>`,
  )
  .join('')}</div></fieldset></div></details>`;
let output = replaceOnce(
  source,
  island,
  (_, open, _json, close) =>
    open + JSON.stringify(data, null, 2).replaceAll('<', '\\u003c') + close,
  'atlas-data',
);
output = replaceOnce(
  output,
  /<ol\b(?=[^>]*\bclass="clusters")[^>]*>[\s\S]*?<\/ol>/,
  `<ol class="clusters" role="list">${data.clusters.map(renderCluster).join('')}</ol>`,
  'inventory',
);
output = replaceOnce(
  output,
  /(<aside\b(?=[^>]*\bclass="rail")[^>]*>[\s\S]*?<nav\b[^>]*>)[\s\S]*?(<\/nav>)/,
  (_, start, end) =>
    start +
    data.clusters
      .map(
        (c) =>
          `<a href="#cluster-${c.id}" data-jump="cluster-${c.id}" data-nav="${c.id}"><span class="nav-no" aria-hidden="true">${String(c.roadmapOrder).padStart(2, '0')}</span><span>${escape(c.short)}</span></a>`,
      )
      .join('') +
    end,
  'cluster navigation',
);
output = replaceOnce(
  output,
  /(<div\b(?=[^>]*\bclass="cluster-panel")[^>]*>\s*<fieldset\b[^>]*>)[\s\S]*?(<\/fieldset>)/,
  (_, start, end) =>
    start +
    `<legend class="sr-only">Küme seçimi</legend><label class="cluster-option"><input type="radio" name="cluster" value="all" checked /><span>Bütün kümeler</span></label>` +
    data.clusters
      .map(
        (c) =>
          `<label class="cluster-option"><input type="radio" name="cluster" value="${c.id}" /><span>${String(c.roadmapOrder).padStart(2, '0')} · ${escape(c.title)}</span></label>`,
      )
      .join('') +
    end,
  'cluster picker',
);
output = replaceOnce(
  output,
  /<section\b(?=[^>]*\bid="roadmap")[^>]*>[\s\S]*?<\/section>/,
  intro,
  'roadmap introduction',
);
output = replaceOnce(
  output,
  /<details\b(?=[^>]*\bid="roadmap-filters")[^>]*>[\s\S]*?<\/details>/,
  filters,
  'roadmap filters',
);
output = await format(output, { parser: 'html' });
if (process.argv.includes('--check'))
  assert.ok(
    output === source,
    'Roadmap HTML/data are stale. Run npm run roadmap.',
  );
else {
  await writeFile('index.html', output);
  console.log('326 madde için yol haritası ve statik görünüm güncellendi.');
}

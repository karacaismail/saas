# Paralel geliştirme proje modeli

Bu ek model, özellik atlasını silmeden Frappe kayıtları, headless frontend ve işletim artefaktları üzerinden bağımsız görev paketlerine dönüştürür. Atlasın 20 kanonik JSON dosyası ve 387 maddesi byte düzeyinde korunur. Eski 33 mimari birim ve 63 bileşen kataloğu girdisi yeni modele referansla bağlanır.

248 mikro küme ve 994 görev vardır; bu sayılar bir hedef, tamamlanma veya geliştirmeye hazır olma göstergesi değildir. 90 backend, 72 frontend, 38 adaptör, 16 platform ve 32 işletim kümesi bulunur. Görevler, farklı aşamalarda aynı artefakta eklenecek dosya kapsamlarını ayırdığı için küme başına sabit sayı yoktur. Sözleşme, şema, uygulama ve entegrasyon görevleri gerektiği yerde ayrıdır; her madde için otomatik test görevi üretilmez.

## Kanonik içerik ve yükleyici

- `data/project/project.json`: arayüz metinleri, katmanlar, altı ürün aşaması, G0–G6 waterfall kapıları, paralel geliştirme kuralları, ortak dosya sahipliği, birincil kaynaklar ve kaynak digest’i.
- `data/project/backend.json`: tek DocType veya tek native kayıt adaptörü sınırındaki kümeler.
- `data/project/frontend.json`: 40 aile, 15 görünüm, 8 sağlayıcı ve uygun tekil page/component kümeleri.
- `data/project/adapters.json`: tek API/protokol/hizmet adaptörü sınırındaki kümeler.
- `data/project/platform.json`: Tauri 2, Vite/PWA, WXT ve yerel veri yetenekleri.
- `data/project/operations.json`: tek bounded yapılandırma ve işletim çıktısı.
- `data/project/traceability.json`: bütün 387 maddenin tek primary görevi, supporting görevleri ve bütün 63 katalog girdisinin görev bağlantıları.

Bu JSON dosyalarında HTML, CSS veya JS bulunmaz. `scripts/project-model.mjs` içinde `loadProject(directory = process.cwd())` dosyaları okuyup `{meta, clusters, tasks, traceability, atlas, revision}` döndürür. `clusters[].tasks` tam görev nesneleridir; `tasks` aynı nesnelerin küme sırasıyla düz projeksiyonudur. `validateProject(project)` geçerli modeli döndürür, geçersiz modelde `TypeError` üretir. Kaynak atlas `readContentSources` ile aynı kaynaklardan yüklenir; ikinci, azaltılmış bir özellik kopyası tutulmaz.

`meta.sourceDigest`, sıralı 20 kaynak için `path + NUL + SHA256(bytes) + newline` dizisinin SHA-256 değeridir. `meta.sourceFiles` dosya yollarını ve tekil byte hashlerini içerir. Yükleyici hem manifestten çıkan tam kaynak kümesini hem mevcut disk byte’larını doğrular. Kaynak metin değişirse proje bağlantıları yeniden incelenmeden eski digest ile yayınlanamaz.

## Küme ve görev sınırı

Her kümede `id`, `title`, `unitId`, `layer`, `artifact`, `summary`, `tasks` bulunur. `artifact` türü `doctype`, `native_adapter`, `component`, `page`, `adapter` veya `config` olur. Özel backend kümesi en fazla bir DocType, frontend kümesi en fazla bir page veya component içerir. Child/kayıt ihtiyaçları ayrı kümelerde tanımlanır; parent JSON dosyasına ikinci worktree yazmaz.

Native User, Role, File, Workflow, Report, Version, Event ve ToDo kopyalanmaz; tek app-owned adaptör tarafından yeniden kullanılır. CRM Lead ve HD Ticket ayrı ekosistem App’lerine bağlı öneridir, Framework içinde hazır kabul edilmez. Özel DocType isimleri taslaktır; hedef Frappe release’i ve fiziksel ModuleDef G0–G2 kapılarında kesinleşir. Domain kayıtlarının dosya önerisi kendi domain Module dizininde, teknik adapter kayıtlarınınki Platform System dizinindedir.

Her görev şu sözleşmeyi taşır:

- `id`, `title`, `summary`, `clusterId`, `ownerRole`.
- `requirementIds`, `catalogEntryIds`: kaynağa referanslar; gerçek içerik ve bütün Frappe assessment alanları atlas bağlamından alınır.
- `stageId`, `gateId`, `readiness`: ürün aşaması ve waterfall işi ayrıdır. Bütün görevler şu anda `draft` durumundadır.
- `dependsOn`: `contract`, `implementation` veya `integration` türündeki görev referansları.
- `contractRefs`: kimlik ve sürüm; mevcut `version: 1` yalnız önerilen sözleşme sürümüdür, onaylı/frozen kanıtı değildir.
- `reads`, `owns`, `forbiddenWrites`: kesin okuma/yazma sınırı.
- `acceptance`: görev kapsamı ve ilgili kaynak kabul ölçütleri.
- `integration`: `baseCommit: null`, fragment hedefleri, `fragmentMode` ve `ownerLane: integration`.

Her gereksinimin tam bir primary görevi vardır; bu görev eski geliştirme planının ürün aşamasını korur. Frontend, provider, child kayıt ve diğer supporting görevler aynı gereksinime bağlanabilir. Sözleşme/şema/entegrasyon hazırlıkları primary özellik ataması olmadan ilgili küme bağlamını taşır. Sözleşmenin başlangıcı hem primary hem supporting gereksinimlerin en erken gerçek uygulama aşamasıdır; yalnız primary listeye bakarak supporting PoC uygulamasını daha geç sözleşmeye bağlamaz. PoC’te başlayan mimari birimlerin ilk bootstrap sözleşmesi ayrıca PoC gerekçesi taşır; enterprise-only kayıt şemaları bu gerekçeyle erkene çekilmez. Sonraki aşamada büyüyen bir artefakt için ayrı uygulama dosyası ve o aşamanın ayrı entegrasyon fragmentı vardır; ilk aşamanın teslimi sonraki aşama entegrasyonunu beklemez.

## Paralel çalışma ve birleştirme

G0 baseline → G1 sözleşme → G2 sahiplik → G3 paralel uygulama → G4 tek entegrasyon hattı → G5 aşama kabulü → G6 yayın/devir sırası her ürün aşamasında uygulanır. PoC, MVP, post_mvp, scale, enterprise ve maturity sprint veya durum sütunu değildir. Olgunluk yine ölçülmüş kanıtla belirlenir.

Frontend uygulaması backend implementasyonunu beklemez; onaylanmış contract fixture üzerinden başlar. Producer uygulamasına ihtiyaç olduğunda dependency türü açıkça `implementation` olmalıdır. Sözleşme bağımlılığı tamamlanmış backend anlamına gelmez.

Bir task yalnız kendi `owns` dosyasına yazar. hooks.py, modules.txt, patches.txt, routes, navigation, registry, package manifest, lockfile ve ortak paketleme ayarları bütün worker görevlerinde yasaktır. Yalnız `task.owns` yazma yetkisidir. Upstream görevin `fragmentMode: read_only_target` hedefi salt okunur öneri bağlamıdır; o dosyayı yazma yetkisi vermez. Yalnız ilgili G4 görevinin `fragmentMode: owned_output` çıktısı kendi benzersiz fragmentıdır. Integration owner bu fragmentları tek hatta ortak dosyalara işler. Entegrasyon görevlerinin de sahip olduğu çıktı yalnız kendi fragmentıdır; global dosya yazma yetkisini bu dokümantasyon görevinden çıkarmaz.

Ayrık dosya sahipliği metinsel merge conflict ihtimalini azaltır; sıfır Git conflict veya sıfır semantik çakışma garantisi vermez. Aynı sözleşme sürümü/digest, doğru base commit, bağımlılık sırası ve G4 uyum kontrolü gerekir. Hedef SaaS deposu kurulmadığı için base commit şu anda null’dır; bu dokümantasyon reposunun commit’i hedef SaaS baseline’ı gibi sunulmaz. Daha sonra baseline/sürüm dondurma ayrı ve incelenebilir model güncellemesidir.

## Korunan teknoloji kararları

Bulutta Frappe, bağımsız React/Ant Design/Pro frontend, Ant Design X/X Cards, TanStack Router/Query ve tamamen Keycloak login/auth korunur. AG Grid/TanStack Table tercihi PoC kararıdır. Mobil ve masaüstünde kesin seçim Tauri 2, web’de Vite/PWA, eklentide WXT/MV3’tür. Kaynak `channels-12` metnindeki Capacitor önerisi tarihsel içerik olarak korunur; güncel Tauri görev açıklaması bunun seçilmediğini belirtir. Mobil mağaza güncellemesi desktop updater veya doğrulanmış OTA anlamına gelmez. Bağımsız Keycloak giriş UI desteklenen güvenli protokol PoC’si tamamlanmadan hazır sayılmaz.

## Doğrulama sınırı

Validator; kimlikler, güvenli yollar, düz JSON içerik, bütün array/ref bağlantıları, kaynak digest’i, tekil dosya sahipliği, ortak dosya kilitleri, maksimum artefakt boyutu, dependency döngüleri, aşama sırası, tam 387 primary coverage, 63 katalog ve 33 birim coverage kontrolü yapar. Bu, gelecekteki SaaS kodunun izinlerini, gerçek worktree filesystem erişimini veya framework runtime davranışını kanıtlamaz. G2’de hedef repo manifestinden gerçek dosya izinleri; G4–G6’da gerçek ürün/CI/canlı kanıtı gerekir.

Task URL’si `tasks/<id>/`, cluster URL’si `clusters/<id>/` biçimindedir. Tekil görev ve seçili paket dışa aktarmaları JSON/Markdown olarak görev kapsamını, canonical requirement/assessment bağlamını, related catalogue entries ve dependency context’ini korumalıdır. Export seçimi tamamlandı durumu değildir.

## Paket sürümü ve kaynak koruması

`sourceDigest`, önceki20 kanonik kaynağın provenance özetidir. Ayrı `projectRevision`, yedi yeni JSON'un mantıksal meta/küme/görev/izlenebilirlik içeriğinin SHA-256 özetidir. Görev dosyaları, sahiplik, kabul veya sözleşme değiştiğinde yeni revision üretilir. Tarayıcı JSON ve Markdown paketlerinde kimlik, sürüm, kanonik sourceDigest ve projectRevision eşitliğini birlikte arar; eski görev paketi kopyalanmış veya seçili export'a katılmış sayılmaz. Bu digest bir imza veya erişim yetkisi değildir; tutarlı statik yayın kontrolüdür.

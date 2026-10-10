# Doğrulama kaydı

Tarih: 10 Ekim 2026, Europe/Istanbul. Ürün: statik SaaS Atlas.

## Kapsam ve ortam

Kaynak dosya SHA-256: `4cf596e6a3053f99866cf9032e5a94aaa355b3a979c9e2a4b55420188861ede3`. Kaynak JSON verisi değiştirilmedi; 12 küme /49 başlık /326 madde korundu. HTML sunumu, CSS, seçim/dışa aktarma, yerel saklama, geliştirme/test ve Pages yayın akışı yenidir. İçerikteki teknik referansları yeniden doğrulama bu UI işinin kapsamı değildir.

Gözlenen yerel ortam: macOS26.5.1 arm64, Node24.21.0, npm11.19.0. Lockfile: Playwright1.64.0, axe-core/playwright4.13.0, Prettier3.9.10. Tarayıcı motorları: Chromium156.0.8078.4, Firefox157.0, WebKit27.2. WebKit motor testi gerçek Safari testi değildir.

Komutlar repo kökünde `/Users/w6x/Developer/saas` çalıştırıldı. Üretim `dist/` HTTP sunucusu: 127.0.0.1:4173. Bir ortak HTML/CSS/JS/font seti; ayrı cihaz kabuğu veya özel profil paketi yoktur.

## RED → GREEN

- Başlangıç: 320×568 /Chromium /fare. Computed font Inter, yeşil rgb(20,97,62), mavi rgb(32,86,166); 0 checkbox. `BASE_URL=http://127.0.0.1:4174 npx playwright test --project=chromium --grep 'all 326 original entries'` bir beklenen hata verdi: checkbox sayısı0, beklenen326. Kanıt `artifacts/before/red-test.log` ve `artifacts/red-run/`.
- İlk320 kabulü: yeni326checkbox ve320→360→375→390→yatay→tablet→masaüstü senaryoları Chromium'da 2pass.
- Görsel inceleme: seçili320 görüntüsünde küme04 iki satıra kırılıyordu. `.cluster-no` kaynağında flex küçülmesi kapatıldı ve nowrap eklendi. Başlangıç görselleri `artifacts/before/`; yeni adaylar `tests/visual.spec.js-snapshots/`.
- 200% kök metin araştırması, inline flex metin alanının taşmasını ortaya çıkardı (320viewport /496scrollWidth). Regresyon ve düzeltme doğrulaması son sonuç tablosunda kaydedilir.

## Kontrol kapsamı

| Katman                                             | Durum / kapsam                                                                                                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formatter + JS syntax + Node export regresyonları  | pass: `npm run check`; 11 Node testi                                                                                                                             |
| Üretim veri/parça/bütçe                            | pass: `npm run build`; JSON kaynak/çıktı eşitliği, sayımlar, dosya allowlist ve gzip bütçeleri                                                                   |
| Tarayıcı işlevi                                    | İlk geniş çalıştırma:36pass/3skip; görsel karşılaştırmalı sonraki çalıştırma42pass/3skip; son sonuç aşağıda güncellenir                                          |
| Yerleşim                                           | 320×480,320×568,360×640,375×667,390×844,431/432/433×800,480×320,568×320,567/568/569×800,639/640/641×800,768×1024,1023/1024/1025×800,1280×900;3motor              |
| Giriş                                              | Fare, klavye Tab/Shift+Tab/Enter/Space/Escape/ok, Chromium/WebKit dokunma emülasyonu, Chromium dokunma+masaüstü hibrit bağlam                                    |
| Etkileşim                                          | Seçim/saklama/yeniden yükleme, Türkçe arama, filtreler, seçilenler, toplu seçim, üç biçimde gerçek dosya indirme, disclosure native open attribute               |
| Tipografi/renk/odak                                | Görünür metinlerin tümünde computed >=1rem ve400; Outfit zinciri; yeşil/kırmızı %100doygun; metin>=4.5:1; tek odak>=3:1; kapsayıcı gölge/outline yok             |
| Otomatik erişilebilirlik                           | axe WCAG2/2.1/2.2A/AA etiketleriyle seçili+açık panel durumu; ihlal0; bu tam WCAG uyumluluk iddiası değildir                                                     |
| Ağ                                                 | Soğuk bağlam, serviceWorkers:block; navigation öncesi request listener; uygulama/dokunma/resize etkileşimlerinde yalnız aynı origin ortak dosyalar               |
| Görsel regresyon                                   | macOS sabit ortamda320/1280×3motor, araçlar/dışa aktarma/üç seçili sınıf için18PNG aday ve sonraki deterministik karşılaştırma; bağımsız inceleme sonucu aşağıda |
| Linux CI görsel referans                           | not_run: macOS referansı farklı OS font rasterizer'ına karşı kıyaslanmaz; işlevsel CI ekran görüntülerini artifact olarak toplar                                 |
| Gerçek macOS Safari/iOS/Android                    | not_run; emülasyondan ayrı                                                                                                                                       |
| Sanal klavye/safe area/gerçek zoom/ekran okuyucusu | not_run; root büyütme ve viewportresize gerçek cihaz sertifikasyonu değildir                                                                                     |
| Kalem/TV/kiosk/karmaşık tablolar                   | not_applicable: bu envanter yolculuğunda özel davranış yok                                                                                                       |

Fine-pointer projelerinde yalnız dokunma testi3kez atlanır; aynı test üç ayrı touch/hybrid projede çalıştırılır. Bu3skip, dokunma testinin yapılmadığı anlamına gelmez.

## Kaynaklar ve bütçe

Build dosyaları: index.html, app.js, exports.js, styles.css, favicon.svg, iki Outfit WOFF2, font OFL notice, .nojekyll. Testler, raporlar, talimatlar ve node_modules yayın paketinde yoktur.

Yerel sunucu sıkıştırmasızdır. Soğuk Resource Timing gözlemi: CSS23721B; JS toplam15667B; fontlar46988B. Build gzip hesaplaması (Node zlib; KiB=1024B) yaklaşık HTML47889B, CSS4888B, JS5261B, fontlar46879B; toplam104917B. GitHub CDN transfer ölçümü değildir. Repo bütçesi HTML48KiB/CSS12KiB/JS12KiB/toplam150KiB. Tam değerler `artifacts/build-verification.json` içindedir.

## Son sonuç ve bağımsız inceleme

Son yerel tam çalıştırma: `npx playwright test --output=artifacts/final-browser-run` → **72 pass /3 skip**,25.2s. Üç skip fine-pointer projelerinin dokunma senaryosudur; ayrı üç dokunma/hibrit projede aynı senaryo pass. 11 Node testi, formatter/syntax ve build allowlist/veri/bütçe kontrolleri pass. 320×480/200%root,1024×768/200%root, metin aralığı, font yükleme hatası, depolama reddi ve dört bozuk saklama durumu da pass.200% taşma ve42.359px hedef için `artifacts/red-followup.log` RED, son tam çalışma GREEN. Ara CSS düzeltmesi ilk olarak yalnız hover seçicisine denk geldi ve test başarısız kalmayı sürdürdü; kural asıl `.feature-title` seçicisine taşınarak kapatıldı.

Üç motorda ek yapılandırılmış ağ/axe kanıtı6pass: `npx playwright test --project=chromium --project=firefox --project=webkit --grep 'cold navigation|automated WCAG' --reporter=json`. JSON ekleri `artifacts/structured/` içinde;3axe çıktısında ihlal0, request listelerinde yalnız aynı origin.

Son komutlar, hash manifesti, review diff ve stdout yerel `artifacts/` altında saklanır. İnceleyici salt okunurdur; komut/test/kurulum çalıştırmaz, dosya değiştirmez. Bağımsız değerlendirme son yayımlanan committen önce buraya işlenir.

Bağımsız görsel inceleme18PNG'yi piksel olarak inceledi:12değişmeyen ve6düzeltilmiş referans (320tools sayaçları,1280selection örtülmesi). Aynı tasarım talebindeki referanslar bağımsız değerlendirmede kullanılabilir bulundu; implementer tek başına onaylamadı. Tools/export1280×900; selected-inventory1280×420 gerçek kısa alan profilinde toolbar product davranışıyla static olur, maskeleme/forcedCSS yok. Üç320 sayaç ve üç1280selection değişimi için eski/actual/diff kanıtları `artifacts/count-diff/` ve `artifacts/selection-diff/`; öncekiler `artifacts/baseline-prior/` içinde.

İnceleme ayrıca generic legend div üzerindeki aria-label için role=group düzeltmesini istedi;6ağ/axe kontrolü yeniden pass,3axe çıktısında ihlal0 ve incomplete0. %200filtre etiketlerinin width0 olması `artifacts/label-red.log` ile RED; kök fonta uyan intrinsic grid ve tüm kelimeye alan testiyle kapatıldı. `artifacts/zoom-filter-after.json/png` düzeltme kanıtıdır.

Bağımsız salt okunur `standards-reviewer` sonucu: açık BLOCKER/MAJOR/MINOR bulgu kalmadı. Kapatılanlar:200% taşma/etiket kaybı, kısa alanda sticky örtüşme, küçük arama temizleme hedefi, sayaç kırılması ve legend semantiği. Kaynak aday commit'i `b3d98afdfb9ce0766db5bfe7d62b158f50723284`;37 dosyalık hash manifestiyle bağlandı. İlave intrinsic-grid sınırları431/432/433 ve567/568/569 için üç motorda3pass4.2s. İnceleyici komut/test çalıştırmadı; kayıtları ve18PNG'yi değerlendirdi. Trace yeniden oynatımı, gerçekcihazlar, GitHub CI ve canlı Pages bu bağımsız incelemenin kapsamı dışındadır.

## Frappe yol haritası güncellemesi — 10 Ekim 2026

Yukarıdaki kayıt ilk UI yayınının tarihsel kanıtıdır. Bu bölüm, `32cf07155ad1490c9d7d6fd9e18dc5e7574cfdfb` başlangıcından sonraki Frappe yeterlilik/yol haritası değişikliğini kapsar. Atlas statik dokümantasyondur; Frappe veya Keycloak kurulmadı, uygulama kabulü ve üretim güvenilirliği test edilmedi. Hedef Frappe/Keycloak release'leri seçilmedi.

326 özgün kimlik/metin/kind/raw değeri fixture ile korundu. Her maddeye yeterlilik, iş, genel sorumlu rolü, dayanak, açıklama, kabul ölçütü ve resmî kaynak eklendi. Dağılım:9 çekirdekte var,128 kısmen var,30 ek Frappe uygulaması,58 çekirdekte hazır değil,89 harici sorumluluk,12 doğrulanmalı. Renk/kaynak sınıfı, planlama ve checkbox seçimi bu yeterlilikten ayrıdır.

İşletim → kiracı/Keycloak/Frappe yetki sınırı → güvenlik → veri → API → headless panel → süreç → bildirim → paket/kota → ödeme → iş alanları → rapor/analitik sırası uygulandı. Küme/grup/madde kimlikleri ve eski localStorage anahtarı korunur; görünür numaralar yeni sırayı izler. JSON v2 bağlam/değerlendirme taşır; CSV16sütun ve Markdown kaynak/kabul ölçütünü korur; legacyv1export desteklenir.

RED kanıtları: `artifacts/roadmap-red.log` (assessment/sıra sözleşmesi), `artifacts/roadmap-browser-red.log` (beklenen326etiket,gerçek0), `artifacts/roadmap-exports-red.log` (11eski test pass/5yeni fail). Bütçe RED'i `artifacts/roadmap-build-first.log`: yeni statik kaynaklı doküman eski HTML48/toplam150KiB sınırını aştı. Gerekçe ve alternatifler `docs/roadmap.md` içinde; no-JS belge ve kayıpsız veri korunarak HTML144/toplam200KiB tek repo bütçesi kabul edildi; CSS/JS12KiB ve9dosya allowlist'i aynı kaldı.

Son build ölçümü: HTML938021B ham/141246B gzip; CSS25771B/5175B; JS22005B/6869B; font46988B/46879B; toplam200169B gzip. `npm run build` kaynak/görünüm güncelliği, veri/parça/allowlist/bütçe için pass. Bu Nodezlib hesabıdır; CDN aktarımı veya saha performansı ölçümü değildir. Ek runtime, CDN veya cihaza özel paket eklenmedi.

`npm run check`: formatter/JSsyntax ve20Node regresyonu pass. Yeni değerlendirme ve filtre akışı320px,200%kök font ve klavye odağıyla üç motorda6pass; JavaScript kapalı326açıklama/kaynak/native details akışı3pass. Altı yapılandırılmış axe çıktısında violation0/incomplete0. Soğuk ağ + açık panel axe kontrolleri6pass; yalnız aynı origin ortak kaynaklar. Kanıt: `artifacts/roadmap-structured/`, `artifacts/roadmap-no-js/`, `artifacts/roadmap-network/` ve ilgili JSON reporter kayıtları. Body ekleri JSON reporterdan kalıcı dosyalara çıkarıldı; HTML reporter ekleri varsayılan output klasöründe bulunmayabilir.

Kaynak araştırması `docs/sources-01-06.md` ve `docs/sources-07-12.md` içindedir. Son153benzersiz resmî kaynak URL'sinin tamamında HTTP200 kaydı var. İlk HEAD kontrolünde hata veren rate-limit ve Analytics URL'leri düzeltildi; Tag Manager HEAD404 döndürürken GET200 ile doğrulandı. Link erişilebilirliği teknik iddianın doğruluğu veya kurulu özellik kanıtı değildir. Hareketli version-15 dalı ve güncel release belgeleri hedef sürüm sabitlemesinin yerine geçmez.

Yerel ortam ve önceki geniş viewport/giriş matrisi aynı kaldı. Gerçek macOS Safari/iOS/Android, fiziksel cihaz, gerçek zoom/sanal klavye/safe area ve ekran okuyucu: not_run. WebKit motoru gerçek Safari değildir. Bu güncellemede çalışan backend, Keycloak token köprüsü, kiracı izolasyonu ve üretim yükü: not_run; bunlar madde kabul ölçütleri olarak planlandı.

Son yerel regresyon komutları: `BASE_URL=http://127.0.0.1:4173 npx playwright test tests/atlas.spec.js tests/roadmap.spec.js --output=artifacts/roadmap-functional-final` →75pass/3skip,43.1s; ardından `BASE_URL=http://127.0.0.1:4173 npx playwright test tests/visual.spec.js --output=artifacts/roadmap-visual-final` →6pass,5.4s. Birlikte81pass/3skip; üçskip fine-pointer projelerindeki dokunma testidir, ayrı üçtouch/hybrid proje pass. Linux CI görsel6testi macOS baseline karşılaştırması olduğu için ayrıca atlar; yerel görsel kanıt onun yerine CI başarısı sayılmaz.

18PNG aday, bağımsız inceleyici tarafından piksel olarak değerlendirildikten sonra referanslara kopyalandı; sonraki deterministik karşılaştırma6pass. Önce/sonra/fark `artifacts/roadmap-before/`, `artifacts/roadmap-candidates/`, `artifacts/roadmap-diffs/`; değişim listesi `artifacts/roadmap-visual-changes.json`. Yalnız doküman genişlemesi, yeni etiketler ve roadmap sırası kapsamındaki değişimler kabul edildi. İlk ignored aday config'inde URL-encoded snapshot template hatası ve eşzamanlı server kapanmasına bağlı kanıt koşusu hatası yaşandı; `artifacts/roadmap-candidates.log` ve `artifacts/roadmap-structured.json` başarısız kayıtları korunur. Config dosya yolu ve bağımsız yerel server düzeltilerek aday6pass ve yapılandırılmış6pass elde edildi; başarısız koşular kabul kanıtı sayılmaz.

Referansların kopyalanmasından sonra tek son tam koşu da çalıştırıldı: `BASE_URL=http://127.0.0.1:4173 npx playwright test --output=artifacts/roadmap-final-all` → **81pass/3skip**,43.6s; `artifacts/roadmap-final-all.log`. Böylece yeni no-JS akışı ve bütün18görsel karşılaştırması aynı son test setinde pass oldu.

Son bağımsız inceleme, biçimlendirilmiş çok satırlı roadmap-intro açılışının eşleşmeyerek iki özet sayacını eski bırakmasını buldu. `artifacts/roadmap-overview-red.log` DOM/veri sayımını başarısız gösterir; düzeltilmiş generator eski görünümü `--check` ile reddetti (`artifacts/roadmap-overview-check-red.log`). Altı üretim hedefi artık whitespace'e dayanıklı ve tam bir eşleşme zorunludur. İki yeni Node entegrasyon regresyonu geçici kopyada tarih/baseline/etiket/sınıf değişimi, kaçırılmış HTML, idempotence ve altı hedefin eksik/çift bulunmasını denetler; tracked kaynağı değiştirmez. İlk test yardımcı regex'i Prettier kapanış satırlarına uymadı; `artifacts/roadmap-generator-test-first.log` başarısız kayıt, sonraki22Nodepass bunun yerine geçer. Label interpolasyonları HTML-escaped kalır; test literal `<strong>` metnini de kapsar.

Öz-onay maddesi approvals-6, kaynak incelemesiyle partial/extend olarak düzeltildi: owner tabanlı apply_workflow denetimi ve Administrator istisnası, talep eden/owner ayrımı ile normal save/REST yollarının tümünü hazır kabul ettirmez. Somut sunucu politikası ve negatif kabul senaryoları eklendi; çalışan kurulumda güvenlik açığı testi yapılmadı.

Düzeltmelerden sonraki son koşular: `npm run check` → **22Nodepass**, formatter/syntaxpass; `npm run build` → pass; `BASE_URL=http://127.0.0.1:4173 npx playwright test --output=artifacts/roadmap-final-reviewed` → **81pass/3skip**,45.9s. DOM özet dağılımı9/128/30/58/89/12 ile JSON'a üç motorda eşit. Ek yapılandırılmış roadmap9testi pass; `artifacts/roadmap-overview-green/` içindeki üç açık-panel axe çıktısında violation0/incomplete0. Intro320/1280×3motor önce/sonra/fark PNG'leri `artifacts/roadmap-intro-*.png` içinde; bağımsız piksel incelemesinde açık görsel bulgu kalmadı.

Son bağımsız salt okunur standards-reviewer/QA sonucu: açık BLOCKER/MAJOR/MINOR kalmadı. Kapananlar: public kişi adları, üreticide sessiz eşleşmeme ve özet sayaçları, öz-onay yeterlilik sınırı, CSV kimlik/sıra adlandırması. İnceleyici159dosyalık hash manifestinde0uyuşmazlık doğruladı; kaynakları,22Node/81tarayıcı test kaydını, build ve ağ/axe çıktısını okudu.18aday+18fark görseli, açık panel/200%/no-JS ve altı yeni intro görseli piksel olarak incelendi. Resmî kaynak doğrulaması risk odaklı örneklemedir;326maddeye aynı derinlikte runtime kabulü değildir. İnceleyici komut/test çalıştırmadı; CI ve canlı yayın bu yerel incelemenin dışında, commit sonrasında ayrıca doğrulanır.

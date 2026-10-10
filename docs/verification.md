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

# Entegrasyon planı doğrulaması

11 Ekim 2026, Europe/Istanbul. Bu kayıt statik Atlas'ın içerik, görünüm ve export teslimini doğrular; gelecekteki Frappe entegrasyon servislerinin çalıştığını kanıtlamaz.

## Veri ve TDD

Önceki 344 kaydın tüm alanları, kaynakları, ilişkileri, küme/başlık sırası ve önceki 38 karar korunur. Yalnız mevcut grupların sonuna 7 kayıt eklenir: 12 küme, 49 başlık, 351 madde. Üç tarihsel immutable fixture değişmez. Yeni `integration-baseline.json` semantik SHA-256 değeri `6eb2e2e6f874ad59cce85e5e22a04d4d219c54e111cc465536ef4eee8a09facd` olarak sabittir. Tarihsel kaynak karşılaştırmasının 402 ifade/17 bölüm metadata'sı ve hashleri korunur; bu sayılar satır düzeyinde izlenebilirlik iddiası değildir.

İlk içerik testleri dört beklenen RED, ilk 320 px tarayıcı testleri iki beklenen RED verdi. Sonra yedi boşluk ve sekiz zorunlu modelin kapsam kararları eklendi. Bağımsız incelemede eski toplam etiket sayısı beklentisi bulundu; `351 * 3` olarak düzeltildi, renk/kontrast/ağırlık kontrolleri korunur.

Yeni değerlendirmelerin altında tarihsel global tarihin gösterilmesi de düzeltildi. Opsiyonel `assessment.reviewedAt` yalnız yedi yeni kayıtta 2026-10-11'dir; eski kayıtlar tarihsel global tarihi kullanır. Takvim dışı gün, boş/null/nesne ve timestamp biçimi reddedilir. JSON alanı kayıpsız taşır; Markdown/CSV mevcut kanıt durumu alanında tarihi gösterir. v3 18/v2 16 sütun ve şema sürümleri korunur. Tarih testleri RED→GREEN geçti; tarihsiz v2/v3 üç-format temsilî export çıktılarının altı sabit byte SHA'sı değişmez. Eski görünür ifade koruma testi değiştirilmedi.

## Ortam ve sonuç

Çalışma dizini `/Users/w6x/Developer/saas`; test sunucusu `http://127.0.0.1:4187`, üretim `dist/` dosyalarını sunar. macOS26.5.1 arm64, gözlenen Node24.21.0/npm11.19.0; manifest Node>=22, `.nvmrc`24.21.0. Lockfile Playwright1.64.0, axe4.13.0, Prettier3.9.10. Chromium156.0.8078.4, Firefox157.0, WebKit27.2; gerçek Safari ile eş tutulmaz. Hedef Frappe/Keycloak sürümleri bilinmiyor ve kurulmadı.

| Kontrol                                                                                                                                                          | Sonuç                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`                                                                                                                                                  | pass: formatter, JS syntax, 49 Node testi                                                                                            |
| `npm run build`                                                                                                                                                  | pass: generated snapshot güncelliği, kaynak/çıktı eşitliği, 351/49/12 sayımları, 29 dosya allowlist'i ve bütçe                       |
| `BASE_URL=http://127.0.0.1:4187 npx playwright test tests/integration.spec.js --project=chromium --reporter=line --output=artifacts/integration-dates-320-final` | pass: 2 yeni yolculuk, 320 px önceliği                                                                                               |
| `BASE_URL=http://127.0.0.1:4187 npx playwright test --reporter=line --output=artifacts/integration-final-browser`                                                | pass: 225, skip: 3; 3.7 dakika; üç motor ve ayrı touch/hybrid projeler                                                               |
| Görsel karşılaştırma                                                                                                                                             | pass: tools/export/selection ×320/1280 ×3 motor, 18 PNG; yalnız altı tools sayacı bağımsız önce/sonra/fark incelemesiyle güncellendi |
| Gerçek macOS/iOS Safari, Android cihazı, fiziksel ekran okuyucu/sanal klavye/zoom/yazdırma                                                                       | not_run; emülasyon ve kök font büyütme gerçek cihaz kanıtı değildir                                                                  |
| Frappe/API/protokol runtime, canlı Keycloak yetkisi, üretim güvenilirliği                                                                                        | not_run; bu teslim kapsamı planlama dokümantasyonudur                                                                                |

Üç skip fine-pointer projelerindeki dokunma senaryosudur; aynı senaryo ayrı Chromium-touch, WebKit-touch ve Chromium-hybrid projelerinde geçer. 320/360/375/390, kısa yatay telefon, tablet/masaüstü ve mevcut sınır komşuları; fare/klavye/dokunma, doğal sarım, 200% kök metin, font/JS/JSON/saklama hataları, tek açık accordion, seçim/arama ve JSON/CSV/Markdown gerçek indirmeleri kapsanır. Yeni maddelerin tarih ve tam değerlendirmesi JS kapalıyken de okunur. Yeni dokuz model kaydı seçilip filtre daraltıldığında bütün seçili kayıtlar ve ilgili plan kararları export edilir.

Son tam koşu tarih düzeltmesini içeren aynı dondurulmuş 29 dosyalık build üzerinde çalıştırıldı. Önceki 219 functional +6 visual sonuçları tarih öncesi ara build'e aittir, son kabul yerine kullanılmadı. Timeout45s, retry0, workers3 ve görsel toleranslar değiştirilmedi.

## Kanıt ve bütçe

Yerel `artifacts/integration-*` kayıtları RED/GREEN loglarını, tam stdout'u, kaynak/diff SHA manifestini, dondurulmuş üretim manifestini, görsel önce/sonra/farkları, bağımsız onay sonrası altı referans kopyasının byte hashlerini ve 320/390/1280 ekranlarını içerir. Tam 225-pass koşusunda `--reporter=line` kullanıldığı için yeni HTML reporter oluşmadı. Önceki işe ait stale rapor çıkarımı kullanılmadan `artifacts/integration-stale-report-unused/` içine ayrıldı. Aynı dondurulmuş build üzerinde yalnız kanıt eki üreten 39 senaryo `--reporter=line,html` ile yeniden çalıştırıldı: 39 pass, 1.0 dakika. Bu dar koşu tam koşu olarak sunulmaz. Güncel `integration-evidence-html` raporundan 39 JSON ve 30 PNG, kaynak attachment yolu ve SHA ile çıkarıldı; 15 axe sonucunda violation0/incomplete0 ve 29 üretim dosyası hash eşitliği doğrulandı. Manifest `artifacts/integration-evidence-structured-manifest.json`; test envanteri ve ham ZIP aynı prefix altındadır. Bu sonuçlar bütün WCAG uyumluluğu iddiası değildir. Bunlar public yayın paketine dahil değildir.

İlk kapsam ölçümü HTML191483B gzip olduğu için önceki HTML184KiB sınırı3067B aşıldı. Yedi tam değerlendirme ve 15 yeni kararın no-JS belge/veri teslimi için HTML192KiB olarak açıkça güncellendi; toplam360KiB, JSON104KiB, JS24KiB, CSS12KiB sınırları korundu. Son tarih düzeltmesiyle ölçüm HTML191896B, JSON95235B, JS18379B, CSS6655B, font46879B; toplam359044B gzip. Bu Nodezlib ölçümüdür; CDN aktarımı veya saha performansı iddiası değildir. Yeni runtime bağımlılığı, özel cihaz paketi veya üçüncü taraf isteği eklenmedi.

CI ve canlı Pages yerel kontrolden ayrı aşamalardır; commit/push sonrasında exact head CI, deploy ve canlı URL'nin dondurulmuş dosya hashleri ayrıca doğrulanır. Yerel başarı yayın başarısı olarak sunulmaz.

Bağımsız salt okunur inceleme sonucu: **No actionable findings.** Etiket sayacı MAJOR ve yeni değerlendirme tarihi MINOR bulguları düzeltme/test kanıtlarıyla kapandı. Son kaynak/diff, 32 dosyalık manifest, aynı buildde225/3 tam koşu, ayrı39 kanıt koşusu, güncel15axe ve görsel/odak/ağ kanıtları incelendi. Trace arşivleri açılmadı; CI/canlı yayın ve gerçek cihaz kontrolleri bu bağımsız yerel incelemenin kanıtı değildir.

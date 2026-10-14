# SaaS Proje Çerçevesi

[Canlı site](https://karacaismail.github.io/saas/) · [MIT lisansı](LICENSE)

Ana sayfa artık **paralel geliştirme çalışma alanıdır**: PoC → MVP → post_mvp → scale → enterprise → maturity aşamalarında, waterfall teslim kapılarıyla ilerleyen tekil görevler sunar. Her görev ayrı URL, JSON/Markdown paketi, kopyalama, bağımlılık, kabul ölçütü ve ayrık dosya sahipliği içerir. Görevler katman/aşama/arama ile süzülür; liste, mikro küme ve tablo görünümleri sayfalanır. Seçim, geliştirme ilerlemesi değildir.

248 mikro küme ve 994 görev, **387 mevcut gereksinimi ve 63 bileşen kataloğu kaydını** kapsar. Her backend kümesi en fazla bir DocType; her frontend kümesi en fazla bir page veya component sınırındadır. Frappe’nin native kayıtları yeniden yazılmaz; adaptör ve kabul işleri ayrılır. Ortak dosyalar yalnız integration sahibi tarafından değiştirilir. Bu model conflict riskini azaltır; sıfır conflict garantisi vermez. Bütün görevler, hedef SaaS deposu/sürümler/sözleşmeler/base commit dondurulana kadar taslaktır.

[Görev modeli ve waterfall kuralları](docs/project-model.md) · [Korunan özellik atlası](https://karacaismail.github.io/saas/atlas/)

[Yeniden kullanım mimarisi](https://karacaismail.github.io/saas/reuse/), CRM/HRMS/İBYS için tanım + ortak mekanizma + iş davranışı sınırını, mevcut kapsam eşleştirmesini ve üçüncü uygulama kabul deneyini açıklar. Önceki TDD planı ve 994 taslak görev korunur; yalnız üç yakın yeniden kullanım görevi ayrı sayfalar ve kayıpsız JSON/Markdown paketleriyle sunulur. Gerçek ürün kodu ve kurulu Frappe uygulamaları bu depoda doğrulanmış değildir. Kaynak ve uygulama sınırı [mimari notunda](docs/reuse-architecture.md) bulunur.

**2026-10-14 GenUI ve sağlayıcı kararı:** GenUI backend'den bağımsızdır ve kullanıcı tarafından geliştirilir; bu depo GenUI veya Frappe ürün kodu yazmaz. SaaS planının seçili sağlayıcısı Frappe'dir. Güncel kaynak `reusePlan.headlessReadiness`; 13 alandaki 52 kontrol, Desk'ten bağımsız Frappe sağlayıcı sözleşmesinin kabul yükümlülükleridir, yeni test veya hazır görev değildir. Hepsi `not_run`; ürün baseline'ı bilinmediği için runtime hazırlığı iddia edilmez. Eski GenUI birim/küme sahiplikleri tarihsel kayıttır ve harici GenUI'nin tüketici/host kabulü olarak okunur.

Frappe Framework backend, bağımsız React / Ant Design / Ant Design X frontend ve Keycloak için 12 küme, 49 başlık ve 387 maddelik geliştirme yol haritası. Her maddede Frappe yeterliliği, yapılacak iş, sorumlu katman, dayanak, kabul ölçütü ve kaynak bulunur. Özellikleri plan kapsamı/yeterlilik/iş/kaynak/küme ile süzün ve seçilenleri JSON, CSV veya Markdown olarak indirin.

Mavi **özgün kapsamı**, yeşil **kapsam içi eksikleri**, kırmızı **yeni alanları** gösterir. Üç sınıfta madde metni, kaynak etiketi ve checkbox aynı rengi taşır; renkler %100 doygundur ve normal metin kontrastı en az4.5:1'dir. Kaynak renkleri madde, legend ve filtre zeminlerinde%5 opaklıkla da kullanılır; yazılar tam opaktır. Yeterlilik ve iş etiketleri kategoriye göre pastel, sorumlu etiketleri ortak sakin tondadır. Renkler Frappe yeterliliği değildir. Yeterlilik etiketleri: **Çekirdekte var / Kısmen var / Ek Frappe uygulaması / Çekirdekte hazır değil / Harici sorumluluk / Doğrulanmalı**. Küme sırası altyapı ve güven sınırlarından ürün ve gelir modeline ilerler. ERPNext ve diğer ek uygulamalar Framework çekirdeği sayılmaz; Desk ekranları headless frontend'de otomatik hazır değildir.

Hedef Frappe/Keycloak release'leri seçilmedi. 2026-10-10 tarihli değerlendirme resmî dokümanlara dayanır; kurulu özellik, üretim güvenilirliği veya tamamlanmış iş kanıtı değildir. Etiketlerin anlamı ve mimari karar kapıları [yol haritası rehberinde](docs/roadmap.md) bulunur.

Seçimler tarayıcıda saklanır; sunucuya gönderilmez ve tamamlanma durumu değildir. Eski madde kimlikleri korunduğu için önceki seçimler devam eder. Filtreleri değiştirmek seçimi temizlemez. Dışa aktarma, aktif filtrede görünmese de işaretlenmiş tüm maddeleri içerir. JSON v3/Markdown küme → başlık → madde hiyerarşisini ve değerlendirme bağlamını, 18 sütunlu CSV bu yapıyı ve karar dayanağını korur. CSV Türkçe karakterler için UTF-8 BOM kullanır ve formül hücrelerini nötrler.

## Yerel geliştirme

Node >=22, npm; yerelde doğrulanan Node24.21.0. Üretimde sunucu veya runtime bağımlılığı yoktur.

```sh
npm ci
npm run roadmap
npm run check
npm run build
npm run dev
```

Tarayıcıda `http://127.0.0.1:4173` adresini açın. `dist/` yalnız yayın dosyalarını içerir.

Kümeler, başlıklar, maddeler ve tüm değerlendirmeler `data/clusters/<id>.json`; etiketler ve sıra `data/roadmap.json`; arayüz ve rehber metinleri `data/interface.json` ve `data/messages.json` içindedir. `npm run roadmap` aynı JS engine ile statik görünüm ve yükleme-hatası snapshot'ını üretir; build eski görünümü reddeder. Tam veri ve görünen metinler değişmez fixture'larla korunur.

Yerelde önce değişen davranışın hedefli regresyonlarını çalıştırın; nihai kaynak hazır olduğunda tam `npm run check` bir kez çalışır. Tam tarayıcı matrisi varsayılan olarak CI'dadır; aşağıdaki komut gerekçeli yerel tam koşu için kullanılabilir. `npm run test:policy`, testleri yürütmeden koleksiyon ve yapılandırma sınırlarını denetler; `npm run check` bunu otomatik çağırır. Risk seçimi, tekrar gerekçesi ve doğrudan CLI kullanımının sınırları [test politikasında](docs/test-policy.md) açıklanır.

```sh
npx playwright install chromium webkit
npm run test:browser
```

Playwright testleri gerçek Safari/iOS/Android sertifikasyonu değildir. Çalıştırılan kontroller ve sınırlar [doğrulama kaydında](docs/verification.md) bulunur.

## Yayın

`main` dalına push, `.github/workflows/pages.yml` aracılığıyla kontrolleri çalıştırır, statik siteyi paketler ve GitHub Pages'e dağıtır. Workflow Git commit üretmez. Public kaynak kodu servis veya kullanıcı verilerine erişim sağlamaz.

Outfit dosyaları Google Fonts'tan alınmıştır ve [SIL Open Font License](assets/fonts/OFL.txt) kapsamında dağıtılır. Proje kodunun lisansı MIT'dir. Font kaynağı: [Google Fonts Outfit](https://github.com/google/fonts/tree/main/ofl/outfit).

## İçerik kaynağı

Görünen bütün metinler sınıflandırılmış JSON dosyalarından gelir. `data/clusters/` altında 12 tam küme; `data/interface.json` ve `data/messages.json` içinde arayüz/rehber/çıktı metinleri bulunur. HTML ve JS kaynaklarına içerik eklemeyin. `npm run roadmap` eski atlas snapshot’ını üretir; build yeni görev çalışma alanını ve tekil sayfaları JSON’dan üretir. Atlas tarayıcı engine’i yalnız `/atlas/` sayfasında çalışır. Veri koruma ve düzenleme sözleşmesi [docs/content-model.md](docs/content-model.md) içindedir.

2026-10-10 karşılaştırması: sağlanan HTML ve Markdown aynı 402 maddelik, 17 kümeli kaynak haritadır. Mevcut 326 madde ve kimlikleri korunarak 18 gerçek boşluk eklendi. `data/review.json` zorunlu temel, ürüne bağlı, ileri aşama ve teknik tercih kapsamlarını; ekleme/birleştirme/erteleme/düzeltme kararlarını ve 17 kaynak kümesinin atlas karşılığını taşır. Ayrıntılar [kaynak incelemesinde](docs/source-review.md).

2026-10-11 entegrasyon planı: mevcut 344 maddenin bütün alanları ve kimlikleri korunarak 7 açık entegrasyon maddesi eklendi. Webhook, REST, GraphQL, SOAP, WebSocket, XML besleme, JSON/CSV/XLSX aktarımı ve MCP/AI Mapping bu projenin zorunlu yetenek kapsamıdır. Aşamalar teslim sırasıdır; ileri aşamada teslim etmek isteğe bağlı olmak anlamına gelmez. Frappe temeli, kalan iş, yön, bağımlılık ve kabul ölçütleri [entegrasyon planında](docs/integration-plan.md) açıklanır. Bu site, gelecekteki SaaS veri entegrasyonlarını çalıştıran bir servis değildir.

Entegrasyon tesliminin yerel test, veri koruma, bağımsız inceleme ve gerçek cihaz sınırları [doğrulama kaydında](docs/integration-verification.md) açıklanır.

## Faydalı panel deneyimleri

2026-10-11 kullanıcı onayıyla 25 öneri dört fayda grubunda planlandı. 13 öneri mevcut maddelerle eşleştirildi; 12 ayrı boşluk grup sonlarına eklendi. Önceki 351 kayıt ve 53 karar korunarak toplam 363 maddeye ulaşıldı. Fayda ve teslim önceliği zorunlu kapsamdan ayrıdır. Ayrıntılar [faydalı UX planında](docs/usefulness-plan.md), kayıpsızlık ve tarayıcı kanıtı [doğrulama kaydında](docs/usefulness-verification.md).

## Çoklu platform ve çevrimdışı varyant

2026-10-11 yeni mimari talebiyle bulutta Frappe, ortak headless istemci çekirdeği, Vite/PWA web, **Tauri 2 mobil ve masaüstü**, WXT/MV3 extension planlanır. Önceki Capacitor mobil önerisi kullanıcı kararıyla tarihsel alternatife alınmıştır. SQLite/IndexedDB, kalıcı outbox, özel Frappe sync, Keycloak sınırları, kural eşliği, offline yeniden açılış, stok hakkı, imzalı migration ve cihaz yedeği kabul koşullarıyla ele alındı. Önceki363 tam kayıt ve78 karar korunarak14 madde ve16 karar eklendi. Yalnız web dışı kanallar ve offline çalışma için eski erteleme kapsamı bu varyantta zorunlu oldu; diğer atamalar korunur. [Mimari ve dört günlük kesinti kabul planı](docs/offline-plan.md). Araçlar kurulmuş veya gelecekteki SaaS'ın çevrimdışı davranışı doğrulanmış sayılmaz.

## Kesin arayüz ve paketleme kararları

Ant Design ve Ant Design X ortak React frontend için; Tauri 2 Android/iOS ve Windows/macOS/Linux için kullanıcının kesin seçimidir. Ant Design Pro iş bileşenleri ve X Cards GenUI kataloğu bu aile içinde değerlendirilir. Capacitor/Capawesome seçilmiş bağımlılık değildir. Mobil temel yayın yolu imzalı mağaza paketidir; Tauri masaüstü updater mobil OTA desteği sayılmaz. 7 yeni madde ve 12 karar, önceki377 tam kayıt ve94 kararı koruyarak384/106 aşamasını oluşturur. [Mobil, kimlik ve GenUI planı](docs/mobile-plan.md).

## Uygulama bileşen kataloğu

40 uygulama ailesi, 15 koleksiyon görünümü ve 8 destek katmanı `data/component-catalog.json` içinde mevcut özelliklere bağlanır. Frappe yeterliliği, kalan headless iş ve kabul koşulları ayrı gösterilir. 384 kayıt ve106 karar korunarak yalnız metadata adaptörü, modüller arası iş kuyruğu ve şablonlu belge çıktısı eklenir; güncel toplam387 madde ve109 karardır. Seçili maddelerin ilgili katalog tanımları JSON/Markdown çıktısına katılır. [Katalog ve teknoloji sözleşmesi](docs/component-catalog.md).

TanStack Router ve TanStack Query seçilmiştir; AG Grid / TanStack Table kararı açıktır. Tamamen bağımsız Keycloak giriş UI hedefi korunur, tema veya standart yönlendirmeyle tamamlanmış sayılmaz; desteklenen protokol ve güvenlik PoC’si ayrıca gerekir.

## Aşamalı geliştirme ve modül sınırları

`data/development-plan.json`, **PoC → MVP → post_mvp → scale → enterprise → maturity** sırasını, aşama giriş/çıkış koşullarını ve mevcut 387 maddenin tamamının hangi mimari birimde, hangi aşamada ele alınacağını tanımlar. Yeni envanter maddesi eklenmez; 12 küme, 49 başlık, 387 madde, 109 inceleme kararı, mevcut kapsam atamaları ve tarihsel değerlendirmeler korunur. Önceki 18 içerik dosyasının byte hashleri `tests/fixtures/development-baseline.json` ile sabittir.

Hedef mimari düşük bağımlılıklı modüler monolittir. Frappe uygulamasındaki iş modülleri; ortak çekirdek, backend adaptörleri, headless frontend paketleri, platform adaptörleri, harici hizmetler ve operasyon sorumluluklarından ayrılır. Her birimin veri sahipliği, sözleşmeleri, bağımlılıkları, zorunlu/koşullu/opsiyonel niteliği ve özel geliştirme işi belirtilir. Teslim aşaması, zorunlu kapsam veya tamamlanma etiketi değildir; olgunluk düzeyi kanıtlarla ölçülür. Güncel mimari için yeni geliştirme planı esas alınır; eski kararlar tarihsel bağlamıyla korunur. Kesin Tauri 2, Ant Design / Ant Design X ve Keycloak kararları geçerlidir.

Önceki plan `/atlas/` içindeki kapalı teknik rehberde korunur; ana çalışma alanı bunu mikro görev modeline bağlar; modüllerdeki özellik bağlantıları aynı envanter maddelerine gider. JSON/Markdown seçimi, yalnız seçili madde atamalarını ve bunların birim/bağımlılık bağlamını taşır; bütün maddeler seçilirse planın tamamını korur. CSV 18 sütun ve planı olmayan legacy çıktı davranışı değişmez. Ayrıntılar [geliştirme planında](docs/development-plan.md), veri sözleşmesi [içerik modelinde](docs/content-model.md) bulunur. Bu belge gelecekteki SaaS'ın uygulanmış veya doğrulanmış mimarisi olduğu iddiasını taşımaz.

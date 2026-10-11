# Bulutta Frappe, ortak istemci çekirdeği ve çevrimdışı platformlar

2026-10-11 kullanıcı talebi. Bu belge, gelecekte geliştirilecek SaaS'ın çoklu platform ve çevrimdışı varyantını planlar. Atlasın kendisine Frappe, Vite, Service Worker, Capacitor, Tauri, WXT veya bir veritabanı kurulmaz. Çalışan çevrimdışı ürün ya da kayıpsızlık garantisi iddiası yoktur.

Merkez buluttaki Frappe'dir. Bağımsız headless frontend, ortak istemci iş/veri/senkronizasyon çekirdeği ve platform adapter'ları kullanır. Cihazda Frappe/Python sunucusu gerektirilmez. Login/auth tamamen Keycloak'ta kalır; sunucu kayıt ve alan yetkisini ayrıca uygular. Desteklenecek Frappe, Keycloak, paketleme araçları, işletim sistemleri ve SQLite eklentilerinin kesin sürümleri henüz seçilmedi. Araç aileleri kullanıcı kararıyla seçilmiştir; kesin release/OS matrisi uyumluluk kabulünden sonra sabitlenir. Güncel frontend React + Ant Design + Ant Design X; mobil ve masaüstü Tauri 2’dir. Önceki Capacitor notları tarihsel olarak korunur; güncel ayrıntılar [mobil planındadır](mobile-plan.md).

## Kayıpsız kapsam güncellemesi

Önceki 363 tam madde ve 78 inceleme kararı `tests/fixtures/offline-baseline.json` içinde donduruldu; semantik SHA-256 `c830949da7c9159bf2c95de3f8769bc7a48c9bd6fcc3ab5334eac640fb2dcced`. Eski madde metinleri, raw ifadeleri, değerlendirmeleri, kaynakları, ilişkileri ve sıraları değişmez. 14 tamamlayıcı madde mevcut grupların sonlarına eklenir: 377 madde, 49 başlık, 12 küme; özgün 326 sonrası 51 ekleme.

16 yeni `offline-*` kararı önceki 78 kararın sonuna eklenir. Yalnız `channels-2` (web dışı kanallar) ve `channels-7` (çevrimdışı çalışma) güncel kapsamı bu açık kullanıcı talebiyle `required` olur. Önceki erteleme kararları tarihsel metin olarak korunur; 2026-10-11 tarihli yeni kararlar bu iki alanı supersede eder. AI/RAG/ajanlar, diğer scope atamaları ve sekiz zorunlu entegrasyon modeli değişmez. Bu varyantın kabul koşulları bütün SaaS hizmetlerinin evrensel minimumu olarak sunulmaz. Değiştirilen arayüz ve review kopyası `interface.retiredCopy.offline.*` içinde tutulur.

## Platform ve sorumluluk matrisi

| Hedef                              | Planlanan seçim / çıktı                                                                                                                       | Envanter      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Ortak istemci çekirdeği            | Tasarım tokenları, bileşenler, iş kuralları, veri erişimi ve sync ortak; yerleşim, cihaz izinleri ve depo/anahtar adapter'ları platforma göre | `channels-10` |
| Web / SaaS                         | Vite üretim çıktısı + ayrıca geliştirilen PWA / Service Worker, önbellek ve offline açılış                                                    | `channels-11` |
| Android / iOS                      | Tauri 2; gömülü üretim varlıkları; Android AAB/APK, iOS IPA; ayrı imzalama ve mağaza süreçleri                                                | `channels-17` |
| Windows / macOS / Linux            | Tauri 2; EXE/MSI, APP/DMG, hedefe göre AppImage/DEB/RPM; ayrı işletim sistemi derleme/imzalama/dağıtım                                        | `channels-13` |
| Chrome extension                   | WXT + Manifest V3; paket içi yürütülebilir kod ve manifest, yayımlama ZIP'i; en az izin/CSP ve worker yeniden başlama                         | `channels-14` |
| Yerel veritabanı                   | Mobil/masaüstü SQLite adapter'ı, web/extension IndexedDB adapter'ı; aynı mantıksal veri/outbox sözleşmesi                                     | `channels-15` |
| Önceden hazırlanmış offline açılış | Gerekli uygulama varlıkları, yetkili çalışma verisi ve açıkça seçilmiş dosyalar; uygulama/cihaz yeniden başlatma                              | `channels-16` |

Tauri 2 Android/iOS ve masaüstünün kesin seçimidir; Capacitor eski, seçilmemiş alternatiftir. `channels-12` bu geçmişi görünür etiketle korur. Tek depo, bütün kodun yüzde yüz aynı olması anlamına gelmez. SQLite adaptörü, şifreleme, yedekleme veya sync motoru değildir. Tauri 2 SQLite adapterının bakım/işletim sistemi desteği ayrıca doğrulanır; Tauri SQL eklentisi tek başına uçtan uca çözüm sayılmaz. Webde PWA etiketi veya Service Worker kaydı, veriyle çevrimdışı çalışma kabulü değildir. Mobil/masaüstü açılışı uzaktaki web sayfasına bağımlı yapılmaz; extension çalıştırılabilir mantığı uzaktan indirmez.

## Veri akışı ve kaydetme sözleşmesi

Çevrimdışı desteklenen işlemler, ağ varken de yokken de ortak yerel veri yolunu kullanır. İş kaydı ile outbox gönderim kaydı aynı veritabanı transaction'ında kalıcılaşır; yalnız belleğe yazma başarı sayılmaz. Tarayıcı transaction atomicity ve fiziksel depolama dayanıklılığı aynı garanti değildir; desteklenen durability seçenekleri gerçek hedeflerde test edilir. Kota, depolama reddi, private browsing, kullanıcı temizliği ve cihaz kaybı ayrı hata durumlarıdır. Kalıcılık izni garanti kabul edilmez.

Durumlar kullanıcıya ayrı gösterilir: cihazda kaydedildi; merkeze gönderim bekliyor; merkez kabul etti; reddedildi veya çakıştı. “Aktarıldı” yalnız Frappe'nin kalıcı kabul sonucundan sonra gösterilir. Her operasyonun sabit kimliği vardır. Tekrarlar mümkündür; sunucu aynı tenant/operasyon kimliği için kalıcı tekilleştirme ve aynı kabul sonucunu sağlar. İstemci kaydı, outbox ve ack/checkpoint ilerlemesi crash sınırlarında test edilir; işlem başarıyla kaydedilmediyse başarı bildirimi verilmez. Mevcut `events-4`, `events-5`, `events-6`, `views-12` ve `views-13` tekrar eklenmeden bağlanır.

Özel Frappe sync uygulaması `integrity-7` kapsamındadır. Push komutlarını güncel tenant, kimlik, kayıt/alan yetkisi, şema ve iş kurallarıyla doğrular. Incremental pull için kapsamlı cursor/checkpoint, sıralama, sayfalama, silme işaretleri, yeniden bootstrap ve eski istemci politikası gerekir. Değişiklik verisi ve yetki filtresi aynı kiracı sınırını korur; başka kiracının verisi local depoya veya sync sonucuna karışmaz. Eski cursor veya retention boşluğu sessiz eksik veri yaratmaz. Cihaz, silme/yeniden yetkilendirme olaylarını uygun saklama ve yerel temizleme politikasına göre işler. Yedekten geri yüklenen bekleyen işlem özgün kaynak cihaz kapsamı, kimliği ve zarfıyla sürer; yeni cihazın güncel erişim yetkisi ayrıca doğrulanır. Sunucu tekilleştirme saklama penceresi izin verilen offline ve yedekten geri yükleme süresini kapsar; pencere dışındaki eski işlem sonuç sorgusu veya kontrollü uzlaştırmaya alınır, yeni işlem gibi kör tekrar edilmez.

Frappe REST/Document/database temelleri bu protokolün hazır olduğu anlamına gelmez. Sunucu `insert/save` doğrulama yollarını kullanır; controller validation'ını atlayan doğrudan veri yazımı sync için kaçış yolu yapılmaz. Frappe Python kuralları paketlenmiş web arayüzüne kendiliğinden taşınmaz. `integrity-8`, istemci ve sunucunun ortak test vektörleriyle kural sürümü, yuvarlama, tarih ve hesap sonuçlarını karşılaştırır; sunucu her gelen işlemi yeniden doğrular.

## Kimlik, çakışma ve merkezi iş sınırları

`identity-9`: ilk cihaz hazırlığı ve login çevrimiçidir. Public client, uygun Authorization Code + PKCE akışı ve native tarafta sistem tarayıcısı kullanılır; paket içine client secret/admin anahtarı konmaz. Keycloak `offline_access`, Keycloak sunucusundan token yenileme yeteneğidir, internetsiz login değildir. Tauri 2 sistem oturumu/tarayıcısı ve callback akışı için uygun özel auth adapter'ı doğrulanır; web Keycloak adapter'ı bunu hazır sağlamaz. Web adapter access/refresh tokenları için bellek saklama sınırı korunur; offline açılış için uzun ömürlü tokenları tarayıcı deposuna yazma çözümü üretilmez.

Önceden hazırlanmış cihazda yerel kilit açma, kimlik sağlayıcısından bağımsız yeni bir login olarak sunulmaz. Sınırlı süre/kayıt/işlem kapsamı, yerel anahtar koruma, tenant/kullanıcı ayrımı, cihaz saatiyle oynama politikası, erişim süresi dolması ve yeniden bağlanınca Keycloak/yetki doğrulaması tasarlanır. Bağlantısız cihaza anlık iptal ulaştırılamayacağı açıkça kabul edilir; çevrimiçi yetki reddi sonrasında kör senkronizasyon yapılmaz. Desteklenen veri duyarlılığına uygun OS key store veya eşdeğer adapter seçilir; web tarayıcısındaki anahtar koruma sınırları native kasayla eşit sayılmaz.

`integrity-1`, `realtime-5` ve `offline-conflicts`: iki cihaz aynı veriyi değiştirince sürüm kontrolü ve işlem türüne uygun çözüm kullanılır; sessiz son-yazan-kazan varsayılanı yoktur. Çözülmemiş işlem merkez kabulü almış sayılmaz; kullanıcı kararına ihtiyaç duyulan çakışma görünür ve yeniden işlenebilir kalır.

`integrity-9`: kopuk iki cihazın ortak stok, limit veya tekil kaynak tüketimini sıradan sync çözmez. Önceden tahsis edilmiş hak/rezervasyon veya merkezi onay politikası gerekir. Tahsis tükenince veya merkezi invariant doğrulanamıyorsa işlem bekletilir/reddedilir; “stok kesin ayrıldı” denmez. Belgeyi yerelde oluşturma ile ödeme, e-fatura, e-posta veya başka uzak servise gönderme ayrı aşamalardır; dış etkiler bağlantıyı ve gerekli güncel onayı bekler.

## Teslim sırası

| Aşama                       | Bağımlılık ve çıkış koşulu                                                                                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O0 — sözleşmeler            | Offline desteklenen/online zorunlu işlemler; sürümler ve platform desteği; ortak kural, local schema, tenant, auth, anahtar ve hak politikası belirlenir. Python kuralları için ortak test vektörleri hazırlanır. |
| O1 — yerel yol              | Webde320px kritik yolculukla başlanır; local kayıt/outbox atomicity, kaydetme durumları ve hazırlanmış offline restart doğrulanır. Paketleme araçlarının en küçük platform PoC'leri gömülü varlıklarla açılır.    |
| O2 — merkezle uzlaştırma    | Özel Frappe sync, kalıcı idempotency/ack, incremental pull/silme/cursor, yetki yeniden doğrulama, conflict ve merkezi hak politikaları birlikte kabul edilir.                                                     |
| O3 — teslim ve dayanıklılık | Platform başına build/imza/dağıtım, güvenli güncelleme, local migration/uyumlu geri dönüş, ayrı cihaz yedeği/restore ve dört günlük fault suite geçmeden varyant tamamlandı sayılmaz.                             |

Yeni14 madde bu istenen varyant için `required`, confidence `design` ve tarih2026-10-11 taşır. Frappe'nin API/transaction/validation temeli “kısmen var”; bağımsız istemci ve paketler haricî sorumluluk; özel sync, kural parity, depo ve güvenilirlik yükü ayrıca geliştirilir. Mevcut değerlendirmeler tarihsel olarak korunur; eski `channels-7` aşaması yerine yeni kapsam gerekçesi geçerlidir.

CI/CD'nin teknik kurulum, imzalama, deploy ve rollback sorumlusu Hüseyin Cengiz'dir; frontend/backend ekipleri derlenebilir paket ve uyum sözleşmelerini sağlar. Kabul, doğru imza ve gerçek platform açılışı, pending kayıtlı migration/restore, sürüm uyumu ve yeni sürüm sağlık kontrolüdür. GoDaddy DNS değişikliği bu talebin kapsamında değildir; gerekirse Hüseyin Cengiz kayıt gereksinimini hazırlar, Asistan Hüseyin GoDaddy'de uygular ve Hüseyin Cengiz servis sonucunu doğrular. Bu plan herhangi bir kişiye otomatik mesaj veya hesap/server değişikliği yetkisi vermez.

## İlk kabul senaryosu ve başarısızlık sınırları

`integrity-10`, uygulama/veri güvenliği kabulüdür; bu dokümantasyon değişikliğinin Playwright testleri gerçek SaaS offline testinin yerine geçmez.

1. Çevrimiçi hazırlanan cihazı dört gün bağlantısız kullan; izinli iş kayıtlarını ve gerekli dosyaları oluştur/düzenle.
2. Uygulamayı ve cihazı yeniden başlat; local veri, kuyruk ve sınırlı erişim politikasını doğrula. Henüz hazırlanmamış kurulumun internetsiz ilk login yapması beklenmez.
3. Kayıt sırasında süreci kapat, kota/depolama hatası üret. Başarı bildirilen kayıtlar geri açılışta bulunmalı; transaction dışı yarım iş/outbox bırakılmamalı.
4. Gönderim ve ack/checkpoint aşamalarında bağlantıyı tekrar kes; aynı kimliği yeniden gönder. Merkezde çift iş etkisi oluşmamalı, kabul sonucu sorgulanabilmeli.
5. İki cihazdan çakışan kayıt ve ayrılmış stok hakkı sınırını dene; sessiz ezme veya tahsisten fazla tüketim olmamalı.
6. Kuyruk doluyken güncelleme, başarısız local migration ve desteklenen rollback'i dene; pending işler kaybolmamalı. Uyumsuz geri dönüş güvenle engellenmeli.
7. Başka fiziksel ortamda tutulan şifreli cihaz yedeğini yeni cihazda geri yükle; anahtar kurtarma, kaydedilmiş ama gönderilmemiş işlemler, tekilleştirme ve tenant ayrımını doğrula.

Tek cihazın tek kopyası fiziksel olarak yok olursa sync bunu kurtaramaz. Henüz bağımsız yedeğe veya merkeze ulaşmamış işler için mutlak sıfır veri kaybı sözü verilmez; yedekleme ve görünür durumla ölçülebilir RPO/RTO belirlenir. İmza doğrulama, SQLite/IndexedDB transaction veya server yedeği tek başına tüm bu koşulları sağlamaz.

## Birincil kaynaklar

- [Vite production build](https://vite.dev/guide/build), [Capacitor workflow](https://capacitorjs.com/docs/basics/workflow), [Capacitor storage](https://capacitorjs.com/docs/guides/storage).
- [Tauri Vite](https://v2.tauri.app/start/frontend/vite/), [platform distribution](https://v2.tauri.app/distribute/), [SQL](https://v2.tauri.app/plugin/sql/), [signed updater](https://v2.tauri.app/plugin/updater/), [Stronghold](https://v2.tauri.app/plugin/stronghold/).
- [WXT manifest](https://wxt.dev/guide/essentials/config/manifest.html), [publishing](https://wxt.dev/guide/essentials/publishing.html), [Chrome packaged code/security](https://developer.chrome.com/docs/extensions/develop/migrate/improve-security), [MV3 worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle).
- [Workbox Service Worker](https://developer.chrome.com/docs/workbox/service-worker-overview/), [IndexedDB transactions](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction), [storage quotas/eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
- [Keycloak JS adapter](https://www.keycloak.org/securing-apps/javascript-adapter), [offline access](https://www.keycloak.org/docs/latest/server_admin/index.html#_offline-access), [RFC8252 native-app OAuth](https://www.rfc-editor.org/rfc/rfc8252.html).
- [Frappe REST](https://docs.frappe.io/framework/user/en/api/rest), [Document](https://docs.frappe.io/framework/user/en/api/document), [database](https://docs.frappe.io/framework/user/en/api/database), [transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html).

Cursor, yerel yetki süresi, stok hakkı ve fault senaryoları kaynakların otomatik sunduğu özellikler değildir; istenen mimariden türetilmiş tasarım/kabul gereksinimleridir. Görünen planın kanonik kaynağı küme JSONları ve `data/review.json`; JSONv3/Markdown seçili maddelerle ilgili kararları, CSV mevcut18 sütunda madde değerlendirmesi ve scope gerekçesini taşır.

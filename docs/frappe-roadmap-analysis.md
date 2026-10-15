# Yerel Frappe ve SaaS yol haritası değerlendirmesi

15 Ekim 2026. Bu belge kaynak incelemesi ve geliştirme hazırlığıdır. Ürün teslimi, canlı entegrasyon kabulü veya yeni görev registry’si değildir. Kanonik görevler `data/project/project.json`, mevcut katman dosyaları ve `traceability.json` içinde kalır.

## Ne anladık?

`/saas` bir yazılım geliştirme yol haritası ve yönerge uygulamasıdır. İncelenen 12 ana başlığın altındaki 387 gereksinimin tamamı bu planda tanımlıdır. Bu sayı, Frappe’nin veya gelecekteki headless ürünün 387 davranışı tamamladığı anlamına gelmez. GenUI backend’den bağımsızdır ve kullanıcı tarafından geliştirilir; burada GenUI motoru veya bileşenleri geliştirilmeyecek.

Asıl eksik, yeni başlık sayısından çok mevcut başlıkları uygulanabilir hâle getiren ayrıntıdır: hangi kurulu yetenek yeniden kullanılacak, hangi sürüm ve izin sözleşmesi geçerli, ilk tüketici hangisi ve başarı nasıl kanıtlanacak? Aynı eksik sözleşme birçok maddeyi etkiliyor. 386 kısmi yönerge değerlendirmesi, 386 ayrı servis, engine veya yeni test yazılacak demek değildir.

## İncelenen gerçek yerel kurulum

| Konu                          | Gözlenen durum                                                  | Kanıt sınırı                                                                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yerel kurulum                 | `frappe-suite-local-app-1`, `suite.localhost`, localhost:8096   | Uzak `egitim.metaframer.net` ile aynı deployment olduğu kanıtlanmadı.                                                                                                                       |
| Kurulum dosyaları             | `/Users/w6x/Documents/Codex/2026-10-06/fe/outputs/frappe-suite` | Kaynak ve yerel kurulum yönergeleri incelendi; servis değiştirilmedi.                                                                                                                       |
| Bench                         | `/home/frappe/instance/bench`                                   | Çalışan konteynerde gözlendi.                                                                                                                                                               |
| Siteye kurulu uygulamalar     | `frappe`, `suite`                                               | `bench --site suite.localhost list-apps --format json` sonucu. ERPNext/HRMS bu siteye kurulu değil.                                                                                         |
| Frappe kaynak commit’i        | `adf1fd0c2d6215ad4cac9976251198b2a35fbda6`                      | Çalışan konteynerde Git HEAD okundu.                                                                                                                                                        |
| Frappe sürümü                 | Dağıtım metadata’sı `17.0.0.dev0`, kaynak `17.0.0-dev`          | Geliştirme sürümü. v15/v16 dokümanları tek başına bu sürüm için API kanıtı sayılmaz.                                                                                                        |
| Suite sürümü                  | `0.0.1`                                                         | Kurulu dağıtım metadata’sı ve kaynak bildirimi.                                                                                                                                             |
| Suite kaynak commit’i         | `unknown`                                                       | Kaynak dizininde Git kaydı yok. Yerel build yönergesinin bildirdiği `27986331ba850e145af7baf3d833dbd7a4098687`, kurulu HEAD olarak doğrulanmış değildir.                                    |
| Çalışma zamanı                | Bench Python `3.14.8`, Node `v24.21.0`                          | Gözlenen sürümler; hedef ürün için onaylanmış destek matrisi değildir.                                                                                                                      |
| Etkin site metadata envanteri | `not_run`                                                       | Ek salt okunur Python okuması log yolu hatasıyla tamamlanmadı; dizin/servis değişikliği yapılmadı. Custom Field/Property Setter kayıtlarının gerçek içerikleri bu incelemeyle kanıtlanmadı. |

Bu, T-00 için somut bir **yerel inceleme baseline’ıdır**. Yerel kurulumun hedef SaaS ürün deposu olduğuna, uzak siteyle eşleştiğine veya Suite build zincirinin yeniden üretilebilirliğine karar verilmiş değildir. Kanonik ürün `baseCommit` alanına planlama deposunun commit’i yazılmayacak. T-00 ve R-00/R-01/R-02 kaynak bulgusu nedeniyle otomatik DONE olmayacak.

## İlk tur inceleme yöntemi ve tarihsel sayılar

Yerel uygulama kaynaklarından 4263 metin dosyalı, site ayarlarını, secretları ve müşteri verilerini içermeyen salt okunur bir snapshot alındı. 49 alt başlık, 387 gereksinim kimliği tam birer kez ele alınacak şekilde 72 bağımsız kaynak paketine ayrıldı. Claude CLI `claude-opus-5-5`, high ile 72 kaynak incelemesi; Codex CLI `gpt-6-astra`, high ile üç yeni metadata ihtiyacının bağımsız incelemesi yapıldı. Gerçek eşzamanlı CLI süreç zirvesi 73 olarak ölçüldü. Sonlu işler tamamlandığında sayıyı doldurmak için yeni iş üretilmedi.

İnceleyicilere ilgili kaynak kesitleri verildi; her dosyanın bütün yolları, tüm kurulu ayarlar ve müşteri verisi taranmış değildir. Görülmeyen yetenek `unknown` kalır. 387 maddenin kimlik kapsamı ve kaynak alıntılarının dosya/satır bağları kontrol edildi; yedi komşu satır işaretçisi düzeltildi. Alıntının bulunması, çıkarımın veya davranışın çalıştığını tek başına kanıtlamaz. Aşağıdaki tablo ilk turun tarihsel **ön değerlendirmesidir**; güncel 64 madde sonucu sonraki bölümde yer alır. Kanonik kabul durumlarını değiştirmez.

| Değerlendirme                      | Madde sayısı | Anlamı                                                                                                                      |
| ---------------------------------- | -----------: | --------------------------------------------------------------------------------------------------------------------------- |
| Yönerge kısmi                      |          386 | Amaç tanımlı; sürüm, yetki, sözleşme, bağımlılık veya uygulanabilir kabul ayrıntısı eksik.                                  |
| Yönerge yeterli                    |            1 | Bu incelemede `releases-12` yönergesinin sınırı yeterince açık bulundu. Tauri uygulaması veya mağaza teslimi doğrulanmadı.  |
| Yönerge tamamen yok                |            0 | İncelenen mevcut 387 kimlikte kapsam metni var. Bu, kullanıcı ihtiyacının evrensel olarak eksiksiz olduğu iddiası değildir. |
| Yerel kaynakta kısmi temel         |          287 | İlgili yapı taşları görülüyor; istenen uçtan uca davranış kanıtlanmış değil.                                                |
| Yerel kaynakta doğrudan temel      |            7 | İlgili native mekanizma doğrudan görülüyor; ürünün tamamlandığı anlamına gelmez.                                            |
| Yerel kurulu app kapsamı dışında   |           29 | Bu sitede kurulu olmayan uygulama yeteneğine dayanıyor; tüm Frappe ekosisteminde yok demek değildir.                        |
| Kaynak kesitleriyle belirlenemeyen |           64 | İlk turda belirlenemedi; ikinci turda bu 64 maddenin tamamı aşağıdaki üç durumdan birine bağlandı.                          |

İlk üç satır yönergeyi, son dört satır yerel kaynak temelini değerlendirir; birbirine eklenmez ve tamamlanma yüzdesine çevrilmez. İşlevsel headless kabul: **not_run**. Yeni test dosyası/senaryosu: **0**. Belgeye yapay TDD başarısızlığı üretilmedi.

## İkinci tur: 64 belirsiz maddenin güncel kaynak sonucu

64 maddenin tamamı yeniden incelendi: **VAR 0, KISMİ 53, YOK 11**. Belirsiz veya `needs_review` kalan madde: **0**. Kurulu olmayan uygulamalara dayanan **29 madde** ayrıca “kurulu değil - karar gerekli” listesinde tutulur. Bu sayılar kaynak değerlendirmesidir; ürünün tamamlanma oranı değildir.

Çalışan yerel bench içindeki Frappe ve Suite dizinlerinin 7.895 dosyalık güncel kopyası alındı. Yalnız `.git`, `node_modules`, Python bytecode/cache ve `.env` dosyaları dışarıda bırakıldı. DocType JSON/controller, hook, API, frontend, public kaynakları, fixture ve uygulama test kaynakları kopyada mevcuttur. Dosya envanteri, her satırın okunduğu anlamına gelmez; her maddede gerçek arama ve okuma kapsamı kayıtlıdır. Test kaynakları yalnız okundu; hiçbir test çalıştırılmadı.

Madde başına bir Temporal workflow/activity ile **64 Claude Opus 5.5 high terminal ajanı gerçekten aynı anda çalıştı**; zirve zamanı `2026-10-15T07:36:38.572Z`. 64 workflow tamamlandı. Kaynaklar salt okunur Grep/Read ile incelendi. Alıntıların dosya/satır bağları kontrol edildi; bir JavaScript Unicode kaçışının JSON’da farklı yazılması kaynaktaki literal yazımla düzeltildi. Ana entegrasyonda üç öneri de düzeltildi: GenUI/Frappe registry sahipliği, zaten var olan native kontrol için yapay RED önerisi ve preview sırasında yan etkili controller doğrulaması. Ham ajan önerileri özel yürütüm kaydında korundu. Yeni test dosyası/senaryosu/koşusu: **0 / 0 / 0**.

| Durum | Anlamı                                                                                                                                              |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| VAR   | İstenen davranışın kurulu uygulama kaynağında tamamı görülüyor. Runtime kabulü değildir.                                                            |
| KISMİ | Somut temel mevcut; istenen davranışın veya entegrasyonun eksik kısmı belirtilmiştir.                                                               |
| YOK   | İstenen uygulama, belirtilen yerel kaynak yollarında yapılan aramalarda bulunamadı. Frappe ekosistemi veya başka repo için yokluk iddiası değildir. |

Genel 387 maddelik kaynak tablosu: **340 kısmi temel**, **7 doğrudan kaynak mekanizması**, **11 yerel kaynakta bulunamayan davranış**, **29 kurulu olmayan app dayanağı**, **0 belirsiz**. Önceki doğrudan kaynak mekanizması sınıfı, ikinci turun tam davranış anlamındaki VAR sınıfıyla eş anlamlı değildir. 386 kısmi/1 yeterli yönerge değerlendirmesi değişmedi; bu tur yönergelerin kanıtını ve sonraki geliştirme adımlarını tamamlar.

Suite’in yerel `headless_provider` kodu upstream-native yeteneklerden ayrıdır. Kurulu app köklerinde React/Tauri/Keycloak uygulaması bulunamaması, başka repolarda hiç kod olmadığı anlamına gelmez. `genui-saas-panel` için aşağıdaki yerel pilot kanıtı korunur; bütün roadmap’in veya GenUI’nin tamamlandığı sonucu çıkarılmaz.

| Madde             | İkinci tur sonucu | İlk kaynak / arama kapsamı                                                                           |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `performance-5`   | KISMİ             | `frappe/frappe/utils/background_jobs.py:117`                                                         |
| `backup-7`        | KISMİ             | `frappe/frappe/api/v1.py:50`                                                                         |
| `service-3`       | KISMİ             | `frappe/frappe/email/doctype/notification/notification.json:76`                                      |
| `tenant-3`        | KISMİ             | `frappe/frappe/installer.py:66`                                                                      |
| `tenant-6`        | KISMİ             | `frappe/frappe/commands/site.py:223`                                                                 |
| `legal-5`         | KISMİ             | `frappe/frappe/email/queue.py:97`                                                                    |
| `governance-6`    | KISMİ             | `suite/suite/drive/utils/files.py:246`                                                               |
| `governance-7`    | KISMİ             | `frappe/frappe/commands/site.py:404`                                                                 |
| `search-3`        | YOK               | `suite/suite/store/search_store.py:41`                                                               |
| `ai-7`            | KISMİ             | `suite/suite/sheets/ai/client.py:51`                                                                 |
| `agents-4`        | KISMİ             | `frappe/frappe/automation_engine/runner.py:25`                                                       |
| `locale-2`        | YOK               | `frappe/frappe/public/js/frappe/ui/toolbar/fuzzy_match.js:87`                                        |
| `workflow-5`      | KISMİ             | `frappe/frappe/model/workflow.py:72`                                                                 |
| `workflow-6`      | KISMİ             | `frappe/frappe/automation_engine/runner.py:242`                                                      |
| `email-2`         | KISMİ             | `frappe/frappe/www/login.py:137`                                                                     |
| `realtime-2`      | KISMİ             | `frappe/frappe/realtime/__init__.py:30`                                                              |
| `realtime-4`      | KISMİ             | `frappe/frappe/desk/form/utils.py:31`                                                                |
| `realtime-7`      | KISMİ             | `frappe/frappe/desk/form/assign_to.py:72`                                                            |
| `entitlements-6`  | YOK               | `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:101`                             |
| `payments-3`      | YOK               | `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`                                     |
| `payments-4`      | KISMİ             | `frappe/frappe/integrations/doctype/integration_request/integration_request.py:33`                   |
| `payments-5`      | KISMİ             | `frappe/frappe/integrations/frappe_providers/cloud_billing.py:57`                                    |
| `crm-5`           | KISMİ             | `frappe/frappe/automation_engine/scheduler.py:180`                                                   |
| `crm-6`           | KISMİ             | `frappe/frappe/automation/doctype/automation_flow/automation_flow.json:89`                           |
| `analytics-1`     | KISMİ             | `frappe/frappe/website/doctype/website_settings/website_settings.json:261`                           |
| `analytics-2`     | KISMİ             | `frappe/frappe/website/doctype/website_settings/website_settings.json:220`                           |
| `analytics-6`     | KISMİ             | `frappe/frappe/utils/telemetry/pulse/client.py:20`                                                   |
| `analytics-7`     | KISMİ             | `frappe/frappe/public/js/frappe/utils/utils.js:2178`                                                 |
| `views-6`         | KISMİ             | `frappe/frappe/utils/messages.py:121`                                                                |
| `integration-5`   | KISMİ             | `frappe/frappe/integrations/doctype/webhook/webhook.py:20`                                           |
| `integration-10`  | YOK               | `frappe/frappe/api/__init__.py:97`                                                                   |
| `integration-11`  | YOK               | `frappe/frappe/app.py:341`                                                                           |
| `integration-13`  | KISMİ             | `frappe/frappe/api/v2.py:606`                                                                        |
| `releases-1`      | KISMİ             | `suite/.github/workflows/meet-sfu-build.yml:19`                                                      |
| `releases-12`     | YOK               | `suite/frontend/src/apps/mail/sw.ts:49`                                                              |
| `releases-13`     | KISMİ             | `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:128` |
| `security-2`      | KISMİ             | `frappe/frappe/hooks.py:500`                                                                         |
| `security-11`     | KISMİ             | `frappe/.github/workflows/linters.yml:72`                                                            |
| `security-12`     | YOK               | `frappe/.github/workflows/linters.yml:72`                                                            |
| `deployment-5`    | KISMİ             | `suite/suite/mail/api/admin.py:169`                                                                  |
| `integrity-6`     | KISMİ             | `frappe/frappe/core/doctype/deleted_document/deleted_document.py:44`                                 |
| `integrity-10`    | KISMİ             | `suite/frontend/src/apps/slides/stores/saving.js:62`                                                 |
| `shell-10`        | KISMİ             | `frappe/frappe/public/css/espresso/components/button.css:4`                                          |
| `channels-12`     | YOK               | `frappe/frappe/oauth.py:33`                                                                          |
| `channels-17`     | YOK               | `suite/frontend/vite.config.ts:84`                                                                   |
| `channels-19`     | KISMİ             | `suite/frontend/src/composables/useKeyboardInsets.ts:34`                                             |
| `notifications-4` | KISMİ             | `frappe/frappe/email/doctype/notification/notification.json:76`                                      |
| `notifications-9` | KISMİ             | `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:63`                       |
| `support-2`       | KISMİ             | `frappe/frappe/desk/desktop.py:712`                                                                  |
| `support-6`       | KISMİ             | `frappe/frappe/desk/desktop.py:735`                                                                  |
| `support-9`       | KISMİ             | `frappe/frappe/app.py:274`                                                                           |
| `reports-3`       | YOK               | `frappe/frappe/desk/query_report.py:49`                                                              |
| `reports-7`       | KISMİ             | `frappe/frappe/desk/doctype/number_card/number_card.py:127`                                          |
| `channels-4`      | KISMİ             | `suite/frontend/src/composables/useScreenSize.ts:16`                                                 |
| `channels-5`      | KISMİ             | `frappe/frappe/public/js/frappe/ui/page.js:235`                                                      |
| `views-11`        | KISMİ             | `frappe/frappe/__init__.py:1478`                                                                     |
| `observability-8` | KISMİ             | `suite/suite/meet/sfu-server/src/telemetry/Telemetry.ts:40`                                          |
| `access-4`        | KISMİ             | `frappe/frappe/core/doctype/user/user.py:1581`                                                       |
| `model-3`         | KISMİ             | `frappe/frappe/utils/nestedset.py:129`                                                               |
| `files-3`         | KISMİ             | `suite/suite/drive/webdav/put.py:920`                                                                |
| `usage-8`         | KISMİ             | `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`                                     |
| `content-3`       | KISMİ             | `frappe/frappe/website/website_generator.py:10`                                                      |
| `content-5`       | KISMİ             | `frappe/frappe/utils/change_log.py:64`                                                               |
| `content-8`       | KISMİ             | `frappe/frappe/model/workflow.py:72`                                                                 |

### Kurulu değil - karar gerekli: 29 madde

Yerel `bench --site suite.localhost list-apps --format json` çıktısı yalnız `frappe` ve `suite` gösterir. ERPNext/HRMS kurulmadı; hiçbir app kurulumu yapılmadı. Bu 29 maddenin dayanakları arasında CRM, Helpdesk ve Payments gibi ayrı uygulamalar da bulunur; hepsinin HRMS gerektirdiği varsayılmaz. Önce mevcut domain app’i mi, harici hizmeti mi, dar bir Frappe adapter’ını mı kullanacağımız sürüm/lisans ve veri sahipliğiyle kararlaştırılmalı. Mevcut görev kimlikleri korunur.

| Madde             | İhtiyaç                                                                                               | Durum                        |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------- |
| `service-4`       | Hizmet hedefi ihlali ve sözleşmeye bağlı hizmet kredisi kaydı.                                        | kurulu değil - karar gerekli |
| `catalog-1`       | Paket, plan, fiyat ve pricing table (paket-fiyat karşılaştırma tablosu) yönetimi.                     | kurulu değil - karar gerekli |
| `catalog-4`       | Aylık/yıllık, kullanıcı başına, kullanım bazlı ve karma fiyat modelleri.                              | kurulu değil - karar gerekli |
| `catalog-5`       | Ek modül, ek kullanıcı, ek kota ve müşteri özel fiyat teklifi.                                        | kurulu değil - karar gerekli |
| `subscriptions-1` | Abonelik başlatma, yenileme, iptal ve suspend (hizmeti askıya alma).                                  | kurulu değil - karar gerekli |
| `subscriptions-2` | Ücretsiz plan, deneme süresi ve denemeden ücretli plana geçiş.                                        | kurulu değil - karar gerekli |
| `subscriptions-4` | Dönem içi fiyat farkı, ödeme ek süresi ve yeniden etkinleştirme.                                      | kurulu değil - karar gerekli |
| `subscriptions-6` | İptal nedeni, duraklatma, bitiş tarihi ve yeniden abonelik.                                           | kurulu değil - karar gerekli |
| `campaigns-1`     | Kupon, kampanya ve indirim yönetimi.                                                                  | kurulu değil - karar gerekli |
| `campaigns-2`     | BOGO (Buy One, Get One — bir alana ek ürün) kampanyaları.                                             | kurulu değil - karar gerekli |
| `campaigns-3`     | Hedef kitle, geçerlilik süresi, bütçe ve kullanım sınırları.                                          | kurulu değil - karar gerekli |
| `campaigns-4`     | İndirim birleştirme, öncelik ve kapsam dışı ürün kuralları.                                           | kurulu değil - karar gerekli |
| `campaigns-5`     | İade/iptalde kupon haklarının düzeltilmesi ve suistimal denetimi.                                     | kurulu değil - karar gerekli |
| `payments-1`      | Ödeme sağlayıcısı, ödeme yöntemi ve tahsilat yönetimi.                                                | kurulu değil - karar gerekli |
| `crm-1`           | CRM (Customer Relationship Management — müşteri ilişkileri yönetimi) ve satış.                        | kurulu değil - karar gerekli |
| `crm-2`           | Müşteri adayı, kişi, firma, fırsat ve satış aşamaları.                                                | kurulu değil - karar gerekli |
| `releases-5`      | Demo verisi etkinleştirme.                                                                            | kurulu değil - karar gerekli |
| `integrity-9`     | Bağlantısız cihazlarda stok/kota hakkı ayırma, merkezi onay ve uzaktaki etkileri bağlantıya erteleme. | kurulu değil - karar gerekli |
| `finance-1`       | Sipariş, fatura, muhasebeleştirme ve ön muhasebe.                                                     | kurulu değil - karar gerekli |
| `finance-2`       | Para birimi, döviz kuru ve vergilendirme yönetimi.                                                    | kurulu değil - karar gerekli |
| `finance-4`       | Fatura bilgileri, numaralandırma, vergi profili ve yuvarlama kuralları.                               | kurulu değil - karar gerekli |
| `finance-5`       | Alacak/borç düzeltmeleri, ön ödeme, vade ve gecikme takibi.                                           | kurulu değil - karar gerekli |
| `finance-6`       | Banka, ödeme sağlayıcısı ve muhasebe kayıtlarını uzlaştırma.                                          | kurulu değil - karar gerekli |
| `finance-7`       | Muhasebe sistemi ve uygulanabilir e-belge entegrasyonları.                                            | kurulu değil - karar gerekli |
| `finance-9`       | Ertelenmiş gelir; hizmet dönemine göre gelir tanıma planı ve dönemsel muhasebeleştirme.               | kurulu değil - karar gerekli |
| `support-1`       | Helpdesk (destek merkezi), support (destek) ve ticket (destek talebi).                                | kurulu değil - karar gerekli |
| `support-4`       | SLA (Service Level Agreement — hizmet seviyesi anlaşması), öncelik ve yanıt süresi.                   | kurulu değil - karar gerekli |
| `reports-2`       | BI (Business Intelligence — iş zekâsı) panoları; BI Board.                                            | kurulu değil - karar gerekli |
| `reports-8`       | SaaS iş metrikleri: MRR, ARR, müşteri/gelir kaybı ve LTV; tanım, dönem ve kaynak uzlaştırması.        | kurulu değil - karar gerekli |

### Kaynağa göre sonraki geliştirme sırası

1. Yerel bench kanıtını T-00 kaynak/build eşlemesine ve R-00 tek yeniden kullanım envanterine bağla; Suite commit’i ve uzak ürün eşlemesi bilinmiyor kalır. İnceleme commit’i ürün baseline’ı yapılmaz.
2. Yerel üç davranış pilotunun dar kanıtını koruyarak R-01 izinli/sürümlü metadata sözleşmesini ve R-02 iki config tüketimini tamamla. T-01 Keycloak kimlik eşlemesi ile T-02 bağlantı sözleşmesi kendi gerçek bağımlılıklarıyla paralel ilerler; erken T-08 gerçek Frappe entegrasyonu ertelenmez.
3. Önce mevcut primitive’leri adapte et: kullanıcı adına erişimde süre/hedef/audit kısıtları, atama kuyruğunda referans kayıt izni, geri yüklemede önizleme ve ilişki doğrulaması, otomasyonda headless yürütüm sözleşmesi. Her maddenin ayrıntılı sonraki adımı ve mevcut görev eşlemesi aşağıdadır.
4. Qdrant, GraphQL/SOAP, müşteri lisansı, ödeme iadesi/itirazı, Tauri paketleme ve Metabase gibi yerel kaynakta bulunmayan davranışlar için önce sınır/sağlayıcı sözleşmesini belirle. GenUI motorunu kullanıcı geliştirir; burada Frappe sağlayıcı sorumluluğu tanımlanır. Kurulu olmayan 29 domain maddesinde karar gelmeden app kurulmaz.

Bu denetim sırasında uygulama kodu, şema, veritabanı, çalışan servisler ve kanonik görev durumları değiştirilmedi. Uygulama testleri tekrar koşulmadı; GitHub Pages yayını bu kaynak denetimi teslimine dahil edilmedi.

## On iki ana başlık: ne var, ne tamamlanacak?

Aşağıdaki sıra kanonik manifest sırasıdır. “Kısmi/yeterli” yönerge değerlendirmesidir; uygulama teslim sayısı değildir.

| Başlık                                 | Madde | Yönerge kısmi / yeterli | Yeniden kullanılacak temel ve tamamlanacak yönerge                                                                                                                                              |
| -------------------------------------- | ----: | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İşletim, dağıtım ve süreklilik         |    49 | 48 / 1                  | Yerel bench ve cache/iş kuyruğu temelleri var. Gerçek kaynak–build–sürüm eşlemesi, kapasite hedefi, yedek/geri dönüş ve dağıtım kabulü somutlaştırılmalı. Teknik sahip Hüseyin Cengiz.          |
| Müşteri, kimlik ve erişim              |    25 | 25 / 0                  | User/Role/site temelleri var. Tenant/site modeli, Keycloak kimliği → Frappe kullanıcı/rol/izin eşlemesi, oturum ve negatif erişim senaryosu eksik.                                              |
| Güvenlik, gizlilik ve veri yönetişimi  |    41 | 41 / 0                  | İzin ve belge yaşam döngüsü yapı taşları var. Alan/kayıt izolasyonu, dış istemci audit’i, saklama/silme ve doğrulanmış güvence sınırları açıklanmalı.                                           |
| Veri modeli, dosyalar ve arama         |    30 | 30 / 0                  | DocType, Custom Field, Property Setter ve Suite dosya yolları var. Etkin izinli metadata, revizyon ve şema değişim reçetesi eksik. Suite File override’ları dikkate alınmalı.                   |
| Entegrasyonlar, olaylar ve yapay zekâ  |    39 | 39 / 0                  | API/olay/iş kuyruğu yapı taşları var. Sürümlü query/action, hata/idempotency, harici AI sınırı ve olay teslim sözleşmesi eksik. GenUI’ye motor yazılmaz.                                        |
| Panel, ekranlar ve kişiselleştirme     |    57 | 57 / 0                  | Suite’in kendi UI kaynakları headless React/Ant ürün teslimi sayılmaz. İzinli metadata → ortak form/liste/detay, taslak koruma ve platform adapter sözleşmeleri tamamlanmalı. Grid kararı açık. |
| İş süreçleri, kurallar ve zamanlama    |    26 | 26 / 0                  | Native workflow, validation ve zamanlama temelleri var. Desk bağımsız izinli eylem, işlem sınırı, tekrar ve hata kabulü tanımlanmalı.                                                           |
| Bildirim, e-posta ve ortak çalışma     |    23 | 23 / 0                  | E-posta/realtime yapı taşları var. Headless kanal yetkisi, reconnect, teslim/okundu ve harici bildirim sınırları eksik. Yerel devre dışı kanallar canlı teslim sayılmaz.                        |
| Modüller, paketler ve kullanım hakları |    39 | 39 / 0                  | Rol ve app mekanizması abonelik hakkının tamamı değildir. Paket/hak/kota veri sahipliği, sunucuda enforcement ve kurulu olmayan domain app eşlemesi tamamlanmalı.                               |
| Tahsilat, faturalama ve finans         |    15 | 15 / 0                  | Çekirdek belge/API temeli finans ürünü değildir. Bu sitede ERPNext yok; seçilecek app/sağlayıcı, lisans/sürüm, ödeme ve mutabakat sınırı kanıtlanmalı. Otomatik app kurulmaz.                   |
| Müşteri operasyonları ve içerik        |    27 | 27 / 0                  | Suite içindeki iletişim/takvim/içerik parçaları incelendi. CRM/destek domain kapsamı ve kurulu app karşılığı, izinli kaynaklar ve ortak ekran tüketimi eksik.                                   |
| Raporlama, ürün ve pazarlama ölçümü    |    16 | 16 / 0                  | Rapor/sorgu yapı taşları var. İzinli rapor projection’ı, ölçüm sözlüğü, veri kaynağı/tazelik ve harici analitik sınırı tanımlanmalı.                                                            |

Tüm maddelerin tek tek gerekçesi ve en küçük sonraki adımı belgenin sonundadır. Aynı ortak eksik için tek sözleşme hazırlanır, ilgili mevcut kimlikler ona bağlanır; her başlık için yeni CRUD/ORM/engine açılmaz.

## Üç yeni ihtiyacın uygulanabilir sözleşmesi

Bu bölüm güncel kullanıcı ihtiyacının plan önerisidir. Native kaynak kanıtı ile henüz yazılmamış adapter davranışını ayırır. Mevcut görev kimlikleri korunur; ek tablo yeni görev registry’si değildir.

### 1. DocType değişince headless arayüz uyum sağlasın

Frappe etkin metadata oluştururken Custom Field ve Property Setter katmanlarını birleştiriyor: `frappe/frappe/model/meta.py:173–174`. Property Setter değişiminde native cache temizliği var: `frappe/frappe/custom/doctype/property_setter/property_setter.py:48`. Bu mekanizmalar React’in kendiliğinden güncellendiğini kanıtlamaz. Kaynak JSON’un değiştirilmesi de site şemasının uygulanmasıyla aynı şey değildir.

Önerilen akış: **siteye uygulanmış şema → izinli etkin metadata → revizyon karşılaştırması → istemci önbelleği yenileme → taslak uzlaştırma → ekranı güncelleme**.

- R-01 tek izinli projection sözleşmesine `sourceId`, hedef DocType, sözleşme sürümü, uygulanmış etkin şema revizyonu, sunum revizyonu ve izin kapsamı bağlanır. Revizyonu yalnız DocType `modified` alanından çıkarma; Custom Field, Property Setter ve izin değişiklikleri de etkiler. Sunum tanımı sunucu iş kuralının yerine geçmez.
- Ham `get_meta` doğrudan izinli projection sayılmaz: API v2’deki `frappe.only_for("All")` hedef alan/kayıt yetkisi kanıtı değildir (`frappe/frappe/api/v2.py:246`). Önce gerçek API ve Suite rota/izin etkisi doğrulanır; v2 kullanılabilirliği varsayılmaz.
- TanStack Query anahtarları site, oturum/izin kapsamı, source ve revizyona bağlı olur. Login/logout, rol değişimi ve şema revizyonu eski kapsamın metadata/veri cache’ini yeniden kullanmaz. Realtime olayı varsa sürümlü/izinli ipucu olarak kullanılır; kaçan olay için ekran açılışı ve kayıt öncesi yeniden kontrol sözleşmesi gerekir. Yeni genel olay altyapısı ön koşul yapılmaz.
- Uyumlu değerler `fieldname` üzerinden korunur. Yeni alan güvenli varsayılanıyla görünür; kaldırılmış, türü değişmiş veya izni kalkmış alan sessizce gönderilmez. İzni kalkmış alanın değeri yeni ekranda/önbellekte sunulmaz. Taslak kaydı güvenli duruma kadar engellenir ve anlaşılır fark gösterilir. Ekran yenilenirken kullanıcının odağı ve uyumlu girdileri korunur.

Kabul davranışı: uygulanmış alan eklemesi izinli istemcide görünür ve uyumlu taslak korunur; kaldırılan/tipi değişen/yetkisi kalkmış alan eski payload’la kaydedilemez. Bunlar test planı yükümlülüğüdür; bu incelemede çalıştırılmadı.

Mevcut eşleme: `model-1`, `model-4`, `model-7`, `model-8`, `forms-1`, `views-14`; `native-doctype-schema--implementation`, `permissioned-metadata--implementation`, `ui-provider-metadata--implementation`, `ui-provider-query--implementation-mvp` ve `ui-provider-realtime--implementation-mvp`. R-01 ortak sözleşme, R-02 iki config tüketimi; T-08 erken gerçek entegrasyon.

### 2. Headless arayüzden Custom Field eklenebilsin

Native Custom Field yaşam döngüsünde alan adı çakışma kontrolü, alan doğrulaması ve şema güncellemesi görülüyor: `frappe/frappe/custom/doctype/custom_field/custom_field.py:186,224,229`. Genel belge oluşturma native `insert()` kullanıyor (`frappe/frappe/api/v1.py:50`); etkin metadata Custom Field kayıtlarını katıyor (`frappe/frappe/model/meta.py:426`). Bu, her kullanıcının alan ekleyebileceği anlamına gelmez.

Kaynak Custom Field izin tanımında Administrator ve System Manager için create/write görülüyor; `track_changes` açık (`frappe/frappe/custom/doctype/custom_field/custom_field.json:556,564,575,585`). Bu kaynak varsayılanı, hedef site üzerindeki etkin Custom DocPerm/rol/kullanıcı iznini kanıtlamaz.

Önerilen akış: **yetki kontrolü → izinli alan taslağı → etki önizlemesi → native Custom Field kaydı → etkin metadata’yı yeniden okuma → revizyonu döndürme → ilk akışla arayüzü yenileme**.

- Custom Field oluşturma izni ile hedef DocType’ı özelleştirme yetkisi sunucuda birlikte kontrol edilir. UI düğmesini gizlemek yetkilendirme değildir. Gerçek Custom Field rol/permlevel tanımı ve Document kontrol zinciri hedef sitede doğrulanmadan rol adı garanti edilmez.
- İlk dilim tek hedef DocType’ta, güvenli bir alan eklemesidir. Alan tipi, uzunluk, seçenekler, varsayılan, Link hedefi ve permlevel için izinli özellik listesi native doğrulamayla birlikte tanımlanır. `flags`, `ignore_permissions`, `ignore_validate`, SQL veya çalıştırılabilir istemci betiği kabul edilmez.
- Mevcut native belge yaşam döngüsü kullanılır; ikinci ORM, CRUD veya validation kopyası yazılmaz. Tekrar isteği ve aynı `fieldname` çakışmasında ikinci alan üretilmez. İstek kimliği/sonuç eşlemesinin kapsamı hedef site ve aktöre bağlanır.
- Başarı, yalnız HTTP 200 değildir: kalıcı Custom Field kimliği, etkin metadata yeniden okuması ve yeni revizyon gerekir. Aktör/hedef/değişiklik/sonuç audit’e bağlanır. DDL başarısızlığı ve kısmi durum kurtarması açıkça tanımlanır; genel DB rollback’in tüm DDL etkilerini geri aldığı varsayılmaz.

Kabul davranışı: yetkisiz istek şemayı değiştirmez; yetkili ekleme yeniden okumada görünür; tekrar/çakışma ikinci alan oluşturmaz. İlk ihtiyacın yenileme davranışını yeniden kullanır.

Mevcut eşleme: `model-1`, `model-2`, `model-7`, `model-8`, `access-2`, `access-3`; `native-doctype-schema--implementation`, `native-doctype-schema--implementation-mvp`, `permissioned-metadata--implementation`, `native-role-scope--implementation`, `native-user-policy--implementation`. Yeni alan ekleme mevcut `model-2` kapsamından koparılmaz.

### 3. UX odaklı headless DocType editörü

Standart DocType özelleştirmesi Custom Field/Property Setter yoludur; custom DocType düzenlemesi ayrı native DocType yoludur. Customize Form, custom DocType’ı reddediyor (`frappe/frappe/custom/doctype/customize_form/customize_form.py:135`); DocType güncellemesinde native schema update var (`frappe/frappe/core/doctype/doctype/doctype.py:546`). Her DocType’ın aynı özellikleri düzenlenebilir varsayılmaz.

Önemli kaynak bulgusu: `fetch_to_customize`, Auto Repeat alanı oluşturabilen bir çağrı içeriyor (`customize_form.py:120`). Bu çağrı **salt okunur preview** olarak kullanılamaz. `make_property_setter` gibi izin atlayan iç helper’lar da public headless eyleme dönüştürülmez (`property_setter.py:100`).

Önerilen akış: **izinli etkin metadata → düzenleme taslağı → yazmasız önce/sonra farkı → etki sınıflandırması → kullanıcı onayı → sunucuda revizyon ve yetkiyi tekrar kontrol → uygun native kaydetme yolu → yeniden okuma**.

- Kullanıcı alan ekleme/sıralama/etiket/gruplama gibi işi anlaşılır bir editörde yapar. Temel şema ile sunum tercihleri ayrıdır; sunum-only tercih gereksiz DDL üretmez. Harici GenUI yalnız izinli JSON sözleşmesini tüketebilir; React callback/ReactNode model JSON’u sayılmaz.
- Önizleme hiçbir belge veya şema yazmaz. Uygulama anında temel revizyon tekrar karşılaştırılır; başka yönetici değiştirdiyse eski diff reddedilir ve güncel fark gösterilir. Native API’nin sunduğu sürüm/çatışma denetimi yeniden kullanılır; karşılamadığı sınır için en küçük adapter gerekçelendirilir.
- Alan türü değiştirme, yeniden adlandırma, silme, uzunluk daraltma, zorunluluk, unique ve index değişimleri mevcut veri etkisi açısından ayrı değerlendirilir. Veri taşıma, yedek/kurtarma ve açık migration onayı olmadan kırıcı değişiklik otomatik uygulanmaz. Trim Table normal “kaydet” eylemine bağlanmaz.
- UX için native doğrulama, izin ve audit atlanmaz. Standart app kaynağı UI’dan rastgele yeniden yazılmaz; app-owned schema değişikliğinin dağıtım/migration yolu ayrıca korunur. Custom DocType’lar da developer mode ve native korumalar atlanarak düzenlenmez.

Kabul davranışı: preview veri değiştirmez; eski revizyon uygulanmaz; kırıcı değişiklik sessizce kaydedilmez. Güvenli ekleme ve sunum değişiklikleri ilk iki akışın metadata yenilemesini kullanır.

Mevcut eşleme: `model-2`, `model-5`, `forms-1`, `forms-4`, `views-9`; `native-doctype-schema--implementation-mvp`, `native-doctype-schema--implementation-post-mvp`, `ui-family-16--implementation`, `ui-family-16--implementation-post-mvp`, `ui-family-07--implementation-mvp`, `ui-provider-metadata--implementation-mvp`. Mevcut aşamalar değiştirilecekse gerekçesi kanonik kayda yazılır; bağımsız yeni plan açılmaz.

## Geliştirme sırası ve sahiplik

Bu sıra mevcut T/R kartlarını açıklayan hazırlıktır; yeni görev listesi değildir. Ortak dosyaların tek integration sahibi olur. Her aktif uygulama dilimi tek davranış, dar üretim/test/fixture sahipliği taşır. Aynı dosyaya paralel iki yazıcı verilmez.

| Mevcut kart / alan                          | Somut sonraki iş                                                                                                                         | Bağımlılık ve bitiş kanıtı                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| T-00                                        | Yerel inceleme baseline’ını hedef ürün/site seçimi, Suite build revision’ı, manifest/lock ve gerçek dev/build/test komutlarıyla tamamla. | Yerel ve uzak deployment ayrımı; planlama commit’i ürün baseline’ı değildir. Teknik deployment kanıtı Hüseyin Cengiz.  |
| R-00                                        | Bu bulguları mevcut yeniden kullanım envanterine bağla; native/app/config/küçük adapter/domain ayrımını ilk DocType için kesinleştir.    | Kurulu app, sürüm, source yolu ve bir gerçek tüketici. 387 yeni görev üretme.                                          |
| T-01 ve T-02                                | Kimlik/rol/izin eşlemesi ile bağlantı/API/oturum sözleşmesini ayrı sahiplerde paralel netleştir.                                         | İkisi de T-00 hedefini kullanır. Kimlik sonucu hazır olmadan yetkili mutation veya son kullanıcı veri kabulü yapılmaz. |
| R-01                                        | İlk ihtiyacın sürümlü izinli metadata projection’ını tek sözleşme olarak tanımla.                                                        | Native etkin meta + alan/eylem izinleri + hata/revizyon; source registry ile GenUI capability registry ayrıdır.        |
| R-02                                        | Aynı ortak alanı iki config ile kullan; şema değişiminde uyumlu taslak korumayı doğrula.                                                 | R-01 ve seçilmiş bağlantı/kimlik bağlamı. İki config iki ayrı engine değildir.                                         |
| T-08                                        | Tek gerçek DocType, iki yetki kapsamı ve model çağrısı olmadan ilk page → Frappe → page akışını erkenden bağla.                          | Bütün platform bitişini bekleme. İzinli veri ve reddedilen erişim gerçek kanıtla kaydedilir.                           |
| Mevcut native-doctype-schema / UI görevleri | Önce Custom Field güvenli ekleme; sonra yazmasız editör diff’i ve onaylı native uygulama.                                                | İlk metadata/yenileme sözleşmesi tüketilir. Kırıcı schema migration ayrı onaylı kapsamdır.                             |
| Diğer 12 başlık tüketicileri                | Ortak sözleşmeye bağlanan dar reçeteleri mevcut görev kayıtlarına işle.                                                                  | Ek app yoksa yokluğu kaydet; otomatik app/servis kurma veya yeni backend seçme.                                        |

React + Ant Design/Pro + Ant Design X/X Cards, TanStack Router/Query, Keycloak, Tauri 2, Vite/PWA ve WXT/MV3 kararları korunur. Grid seçimi açık kalır. GenUI uygulaması kullanıcının işidir. Kaynak registry, query/action kataloğu ve GenUI component/capability registry’si birleştirilmez.

Güncel kullanıcı master talimatıyla analizde test yazılmaz; açık paketlerin test kapsamı donduruludur. Yeni davranışın gerçek RED testi veya gerçekleşmiş hatanın tek regresyon testi dışında yeni test dalgası/matris/fixture genişlemesi açılmaz. Uygulama sırasında gerçek RED ve aynı kontrolün GREEN logları kaydedilir. Gelecek anlamlı davranış değişikliği için gerekli başarısız kontrol → uygulama → aynı kontrolün geçmesi kullanılır. Güncel master talimatı önceki test/bütçe nedeniyle bekleme kayıtlarının üstündedir. Planlanmış test kapsamı bütün ajanlar için ortak ve donduruludur; yeni ajan veya görev bölme yeni test kapsamı açmaz. Her istisnanın gerekçesi, başlangıç/bitiş test sayısı ve gerçek RED/GREEN logları aynı iş paketinde kaydedilir. Mevcut zorunlu CI/yayın kapıları korunur; geçmiş kontroller yeni hata/değişiklik olmadan tekrarlanmaz. Bağımsız inceleme ve gerçek merge kanıtı olmadan DONE yazılmaz.

## Ne bitti, ne kaldı?

**Bitti:** gerçek yerel Frappe/Suite kurulumunun bulunması, 12 başlığın 387 maddesine kaynak değerlendirmesi, belirsiz 64 maddenin ikinci tur doğrulaması ve yerel headless şema pilotu. Pilot, metadata yenileme/taslak koruma, 11 tipte Custom Field ekleme ve güvenli etiket/açıklama düzenlemeyi kapsar; `f926e9b` kapanışında mevcut altı senaryo 6/6 geçti. Sonraki yerel R-02/T-08 dilimi iki config’i ve tek gerçek DocType’ta iki yetkiyle kayıt okuma/güncellemeyi ekledi; `6ea301c` kapanışında mevcut dosya 8/8 geçti.

**Kaldı:** yerel pilotun ötesindeki hedef ürün baseline’ını ve uzak deployment eşlemesini kesinleştirmek; ortak sözleşmeleri tüm ilgili kanonik tüketicilere uygulamak; Keycloak, domain app kapsamı, liste/grid ve platform paketlerini kendi kabul kanıtlarıyla tamamlamak. Yerel pilot ve kaynak değerlendirmesi bütün SaaS’ın tamamlandığını göstermez. GenUI motorunu kullanıcı geliştirir.

Statik build allowlist’i bu çalışma raporlarını Pages’e kopyalamaz; raporlar Git kaynağında, planın arayüz verisi Pages’te bulunur. Önceki 320 px taşmasının kaynağındaki üç uzun kaynak açıklaması düzeltildi: görünen commit 7 karakter, repo yolu doğal boşluklu; tam commit/URL kanıtı link hedefinde korunur. Kelime ortası bölme, metin küçültme veya yatay sayfa taşmasını gizleme kullanılmadı. Yerelde mevcut kapılar geçti: 79 Node kontrolü, build, 478 Chromium/WebKit ve 3 dokunma/hibrit testi. İki temel proje skip’i mevcut koşuldur; ilgili testler dokunma/hibrit projelerinde geçti. CI/yayın akışı, assertion ve test kapsamı değiştirilmedi. Bu commit’in uzak CI/yayın sonucu mevcut GitHub Actions kaydından ayrıca doğrulanır; yerel PASS uzak yayın kanıtı yerine geçmez.

Makineyle okunabilir birleşik tablo: [frappe-roadmap-analysis.json](./frappe-roadmap-analysis.json). Bu JSON kaynak değerlendirmesidir; mevcut görev registry’sini çoğaltmaz.

## Kullanıcı kararı gereken tek liste

1. **Kurulu olmayan app kapsamı:** yukarıda kimlikleri verilen 29 madde için gereken ERPNext/CRM/Helpdesk/Payments ve diğer domain yeteneklerinin ürün kapsamı, app/sağlayıcı ve sürümü. 29 sayısı app değil, gereksinim sayısıdır; bu karar gelmeden kurulum yapılmaz.
2. **Keycloak:** hedef realm/client ve Frappe kullanıcı/rol/site eşlemesi. Keycloak seçimi kesindir; açık konu uygulanacak kimlik sözleşmesidir. Yerel native cookie/CSRF pilotu SSO kabulü değildir.
3. **Grid:** React/Ant Design/TanStack kararları içinde kullanılacak liste/grid seçimi; ortak alan ve kayıt pilotunu engellemez.
4. **Suite / ürün baseline’ı:** kurulu Suite kaynak commit’i ve `egitim.metaframer.net` deployment’ının repo/build/site eşlemesi. Teknik deployment kanıtının sahibi **Hüseyin Cengiz**; kaynak incelemesi uzak deployment kanıtı yerine geçmez.

Bu kararlar, hazır yerel işlerin ve mevcut yayın düzeltmesinin ilerlemesini durdurmaz.

## Güncel yerel pilot teslimi — 15 Ekim 2026

Referans React/Ant Design/TanStack tüketicisinde **11 alan tipi** native Custom Field yoluyla ekleniyor: Data, Int, Float, Currency, Check, Date, Datetime, Select, Link, Small Text, Text. Select seçenekleri doğrulanır; Link hedefi native okuma izniyle süzülür. Her tip doğru form kontrolüyle görünür; etiket/açıklama düzenlemesi tipleri ve uyumlu taslağı korur. Tip değiştirme, alan silme ve oluşturma sonrası options/hedef değişikliği açıkça reddedilir.

Güncel kod/test kapanış commit’i **`f926e9b`**, tip uygulaması `4065c75`; mevcut altı senaryo **6/6 PASS, 35,8 saniye**. İlk tam koşudaki alan seçicisi hatası trace ile test zamanlaması olarak ayrıldı; beklenen tek alanı await eden kontrolle düzeltildi. Timeout veya assertion gevşetilmedi, yeni senaryo/tarayıcı eklenmedi. Yerel modül `suite.headless_provider.field_types`, mevcut `api` çekirdeğini kullanır. Kaynak detayları tüketicide `docs/headless-schema-delivery.md`, makine kanıtı JSON `localPilot` alanındadır; ilk Data pilotunun tarihsel kanıtı ayrıca korunur.

Yerel kimlik native Frappe cookie/CSRF’dir. Keycloak, genel iş kaydı CRUD’u, 11 tip dışındaki alanlar, kırıcı migration, karma Custom Field sırası, gerçek Safari/cihaz/native paket ve uzak production kabulü bu alan tipi teslimiyle tamamlanmış sayılmaz. Yerel R-02/T-08 kayıt okuma/yazma dilimi ayrı kanıtlanır. Suite kaynak commit’i ve uzak ürün deployment eşlemesi hâlâ bilinmiyor; ürün baseline’ı dondurulmadı. Bu kanıt 387 maddeyi, R kartlarını veya 52 headless kontrolünü topluca DONE yapmaz.

### Yerel R-02 / T-08: iki config ve gerçek kayıt turu

`genui-saas-panel` ana dalında `f045dcd`, son inceleme düzeltmesi `6ea301c` ile aynı `ControlledTextField` iki config’i tüketiyor (`src/components/ControlledTextField.tsx:13`, `src/features/records/RecordWorkspace.tsx:18`); mevcut şema ekranının Data alanı da aynı bileşeni kullanır. Alanın içinde ağ veya Frappe iş kuralı yoktur. Boş/Unicode değerler ve bağımsız iki config 320px akışında doğrulandı; taslak yazmak kayıt mutasyonu değildir.

`/settings?workspace=records` → `suite.headless_provider.records` → native `Headless Schema Pilot` kaydı → yeniden okuma çalıştı. Admin iki Data alanını okur/yazar; okuyucu yalnız açık alanı görür ve yazamaz. Native session/CSRF, alan/kayıt izinleri, row lock ve `Document.save()` korunur; eski `modified` ve yetkisiz alan payload’ı reddedilir. Kaynak: `frappe_provider/headless_provider/records.py:28`, `:37`; bağımsız istemci `shared/frappe/client.ts:563`, `:577`.

Aynı mevcut dosyada iki yeni davranış için test-first `16cebac`; dosya **1→1**, senaryo **6→8**. İlk RED ekran/RPC yokluğu; ilk uygulama koşusunda fixture’ın native `DocPerm.write=1` varsayılanı görüldü ve yalnız exact yerel reader rolü `write=0` ile düzeltildi. Assertion/timeout değişmedi. Son tam kapı **8/8 PASS, 48,7 saniye**; typecheck/lint/build/Python derleme geçti. Bağımsız kaynak/UI incelemesindeki iki somut kusur da kapandı: özel kayıt mutation cache’i scoped lifecycle/reset ile temizlenir; Input kenarlığı merkezi token ile en az3:1 kontrast sağlar. İki dar regresyon assertion’ı mevcut iki yeni senaryoda kaldı; dosya/senaryo sayısı değişmedi, gerçek RED logları korundu. Makine kanıtı `localPilot.recordFlowProof` içindedir. İnceleme ve paralel düzeltmeler aynı sonlu Temporal havuzunda çalıştı.

Bu kanıt yalnız yerel mevcut Data kaydının okuma/güncellemesidir; genel CRUD, 11 tipte kayıt kaydetme, Keycloak, uzak baseline veya bütün kanonik R-02/T-08 kabulü değildir. Kaynak değerlendirmesi **340 kısmi / 7 native temel / 11 yerelde bulunamayan / 29 kurulu olmayan app dayanağı** olarak korunur; görev durumları topluca DONE yapılmaz. Servis yeniden başlatma, app kurulumu veya GenUI motoru değişikliği yoktur.

## Madde bazında kaynak değerlendirmesi

Bu ek 387 mevcut kimliğin analizidir; görev durumu, atama veya yeni görev kimliği üretmez. “Eksik” önerileri, ilgili mevcut görev içinde incelenip tek ortak sözleşmeye bağlanmalıdır. Paketlerdeki öneriler kanonik kayıtlara otomatik uygulanmadı. “Kaynak temeli” yalnız bu yerel site/snapshot için geçerlidir.

Kaynak yolları snapshot içindeki app köküne göredir. Snapshot ve özel inceleme kanıtı yerel `saas-handoff-2026-10-14/execution-headless/frappe-roadmap-audit-20261015T054952Z` dizinindedir; public yayına site config’i, secret veya ham CLI oturum çıktısı alınmaz.

### İşletim, dağıtım ve süreklilik

#### performance-1 — Performance management (performans yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni p95/hata/kaynak hedefi istiyor ama hedef değer, kritik yol listesi ve ölçüm aracı tanımlı değil. Kaynakta monitor ve rapor çalışma süresi önbelleği var. Ancak bu, ürün performans programı değildir. Birincil görev cache-policy--implementation olarak eşlenmiş; bu eşleme performans yönetimiyle uyuşmuyor.

Eksik: Kritik yolculuk listesi (örn. list/get_list, rapor, Drive/Sheets autosave) ve sayısal p95/hata bütçesi yok; Ölçüm kaynağı belirsiz: Frappe monitor/recorder (v17-dev) mi, dış APM mi, karar yok; Görev eşlemesi cache-policy ile karışık; ayrı performans/ölçüm görev kimliği referansı yok; Temsilî yük profili (tenant sayısı, veri hacmi) tanımsız

Sonraki adım önerisi: Mevcut görev kaydında yalnız performance-1 için 2–3 kritik yol ve sayısal p95 hedefi yazılsın. Ölçüm kaynağı olarak v17-dev frappe.monitor seçimi kaynaktan doğrulansın. Görev eşlemesi, yeni registry açılmadan düzeltilsin.

Mevcut birincil görev: `cache-policy--implementation`. Kaynak: `frappe/frappe/desk/query_report.py:20`; `frappe/frappe/desk/query_report.py:175`.

#### performance-2 — Sunucu tarafı Redis önbellekleme.

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Çekirdekte Redis destekli cache kullanımı doğrudan görülüyor: hget generator, setex TTL ve hdel temizleme. Talimat yalnız 'yapılandır' diyor. Hangi veri cache'lenecek, tazelik kuralı ve hit/miss ölçüm yöntemi belirtilmemiş.

Eksik: Cache'lenecek veri sınıfları ve her biri için TTL/tazelik kuralı yok; Hit/miss metriğinin nereden okunacağı (Redis INFO, uygulama sayacı) tanımsız; Redis topolojisi (cache/queue ayrımı, HA) ve sahibi (Hüseyin Cengiz) belirtilmemiş; SQLite yolunda frappe.client_cache kullanımı ile Redis cache ayrımı not edilmemiş

Sonraki adım önerisi: Mevcut frappe.cache hget/setex/hdel desenleri referans gösterilsin. Görevde 1 veri sınıfı için TTL ve on_update invalidation kuralı yazılsın. Redis topoloji kararı DevOps devrine bağlansın.

Mevcut birincil görev: `cache-policy--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:116`; `frappe/frappe/rate_limiter.py:180`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:145`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:80`.

#### performance-3 — Kiracı bazlı önbellek anahtarı, süre, temizleme ve geçersizleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

make_key ve doc_events tabanlı temizleme primitifleri var. Ancak mevcut anahtarlar user/doctype bazlı ve site içi iş tenant boyutu içermiyor. Tenant modeli (site-per-tenant mi, site içi tenant mı) talimatta kararlaştırılmamış. Bu yüzden anahtar kapsamı tanımlanamıyor.

Eksik: Tenant modeli kararı yok; site başına tenant ise make_key yeterli olabilir, site içi tenant ise anahtar öneki sözleşmesi gerekir; Tenant kimliğinin kaynağı (Keycloak claim, User Permission, site) belirtilmemiş; Domain invalidation için hangi doc_events/on_update kancalarının kullanılacağı listelenmemiş; make_key'in site önekini nasıl uyguladığı bu excerpt'te görülmüyor (doğrulanmadı)

Sonraki adım önerisi: Önce tenant modeli kararı mevcut mimari kaydına yazılsın. Ardından anahtar şablonu 'tenant:domain:id' biçiminde ve invalidation kancası suite hooks doc_events deseniyle tek bir domain için tanımlansın.

Mevcut birincil görev: `cache-policy--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:173`; `frappe/frappe/permissions.py:309`; `suite/suite/hooks.py:229`.

#### performance-4 — Veri tabanı sorgu, indeks ve bağlantı havuzu yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta indeks/unique ekleme, has_index, sayfalama sınırı ve toplu ekleme tavanı var. v17-dev MariaDB, Postgres ve SQLite destekliyor. Talimat hangi DB motorunun hedeflendiğini ve bağlantı havuzu sahibini söylemiyor. Bağlantı havuzu kodu excerpt'te görülmüyor.

Eksik: Hedef DB motoru (MariaDB/Postgres/SQLite) ve yerel sitenin gerçek db_type'ı belirtilmemiş; Kritik sorgu listesi ve EXPLAIN/plan doğrulama yöntemi yok; Bağlantı havuzu (DB tarafı ya da proxy) ve gunicorn/worker sayısı ile ilişki tanımsız; Bağlantı baskısında beklenen davranış (timeout, 503, kuyruk) sayısal değil

Sonraki adım önerisi: Mevcut görevde DB motoru ve sitenin db_type değeri kaydedilsin. 1 kritik sorgu için on_doctype_update/add_index deseni ve plan kontrolü kabul ölçütü olarak yazılsın. Havuz kararı Hüseyin Cengiz'e devredilsin.

Mevcut birincil görev: `database-capacity--implementation`. Kaynak: `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`; `frappe/frappe/api/v2.py:162`; `frappe/frappe/client.py:246`; `frappe/frappe/query_builder/utils.py:41`.

#### performance-5 — Zaman aşımı, bağlantı sınırı ve arızalı bağımlılığa çağrıyı geçici kesme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Somut temel parçalar var. Frappe RQ kuyruk/iş timeout'ları mevcut: long kuyruğu 1500 sn; özel worker timeout'u ve enqueue(timeout=...) desteği var. DB statement timeout, enable_db_statement_timeout açıksa HTTP isteğinde http_timeout veya 300 sn, job'da job.timeout değerinin 1.5 katı olarak uygulanıyor. Suite JMAP istemcisinde httpx connect/read/write/pool timeout'ları ve sınırlı RetryPolicy (max_attempts=2) var. recorder_client'ta TIMEOUT=(2,5) kullanılıyor. link_preview'da connect 3 sn, read 4 sn, maxsize=1 bağlantı havuzu ve retries=False var. frappe/automation_engine içinde Redis'te tutulan, kural bazlı ardışık hata sayacı var: eşik aşılınca Automation Flow kalıcı olarak devre dışı kalıyor, bekleyen kuyruk Skipped yapılıyor ve sahibine bildirim gidiyor. Bu bir bağımlılık breaker'ı değil, iş akışı kuralı breaker'ıdır. suite/headless_provider (LOCAL PILOT, additive) yalnız advisory lock timeout'u içeriyor. Suite Vue frontend'inde yalnız istemci tarafı retry/backoff var.

Eksik: Dış bağımlılık başına genel bir circuit breaker yok: kapalı/açık/yarı açık durumları, açık kalma süresi ve devre açıkken yeni çağrıların kontrollü reddi bulunmuyor.; Anthropic çağrısında (suite/suite/sheets/ai/client.py:88-100) açık timeout veya breaker yok; davranış SDK varsayılanına bırakılmış.; frappe.integrations.utils.make_request'in varsayılanı timeout=None; dış çağrılar için merkezi timeout bütçesi ve bağımlılık envanteri yok.; Bağımlılık başına paylaşımlı bir eşzamanlı bağlantı sınırı politikası yok; link_preview'daki maxsize=1 yalnız o modülde geçerli.; Headless provider kontratında dış bağımlılık dayanıklılığı için bir yüzey yok.; Runtime functionalAcceptance: not_run.

Sonraki somut adım: Mevcut sırayı koruyun. 1) dependency-resilience--contract: yalnız Anthropic çağrısını kapsayın. Timeout (connect/read), hata eşiği, açık kalma süresi, yarı açık deneme sayısı ve açık devrede dönecek hata kontratını yazın. Breaker durumu, automation_engine'deki site anahtarlı Redis sayaç desenine benzer şekilde frappe.cache'te tutulsun. 2) dependency-resilience--implementation: anthropic.Anthropic(...) çağrısına açık timeout verin ve messages.create'i küçük bir breaker sarmalayıcısıyla sarın. Önce başarısız (RED) testi yazın: arızalı bağımlılık süre içinde kesilsin, eşikten sonra çağrı yapılmadan reddedilsin. Ardından GREEN'e getirin. 3) Aynı sarmalayıcıyı JMAP ve make_request çağrı noktalarına sonradan genişletin.

Önerilen bağımlılık/sıra: dependency-resilience--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `dependency-resilience--implementation`.

Kaynak kanıtı:

- `frappe/frappe/utils/background_jobs.py:117` — `"long": 1500,`
- `frappe/frappe/database/database.py:1692` — `timeout = frappe.conf.http_timeout or 300`
- `suite/suite/mail/jmap.py:308` — `RETRY_POLICY = RetryPolicy(max_attempts=2, max_retry_after=5.0)`
- `suite/suite/sheets/link_preview.py:134` — `return urllib3.HTTPConnectionPool(ip, port=port, maxsize=1, retries=False, timeout=timeout)`
- `frappe/frappe/automation_engine/runner.py:602` — `if frappe.cache.incr(_failure_key(rule.name)) >= threshold:`
- `suite/suite/sheets/ai/client.py:88` — `client = anthropic.Anthropic(api_key=api_key)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, *.py/toml/json/ts/js/vue); arama `(?i)circuit.?breaker|pybreaker|half.?open|backoff|tenacity`: Bağımlılık düzeyinde breaker kütüphanesi yok. tenacity yalnız retry için kullanılıyor. Breaker yalnız frappe/automation_engine'de kural bazlı. Suite frontend ve meet TS servislerinde yerel backoff var. 'half-open' eşleşmeleri yalnız zaman aralığı yorumlarında geçiyor.
- suite (*.py); arama `(?i)timeout\s*=`: JMAP (jmap.py, user_settings), recorder_client (2,5), link_preview (3/4 sn), suite_cloud DEFAULT_TIMEOUT (5,60) ve job/lock timeout'ları var.
- frappe/frappe/automation_engine (*.py); arama `(?i)breaker|consecutive_fail|failure_threshold|FAILURE`: runner.py:596-625'te Redis sayacı ve _trip_breaker var; flow'u kapatıyor. settings.py'de failure_threshold=10. Yarı açık durumu veya otomatik kurtarma yok.
- suite/suite/**/{ai,assistant,llm,agent}\*/**/*.py; arama `(?i)anthropic\.|Anthropic\(|max_retries|timeout`: sheets/ai/client.py yalnız hata eşlemesi yapıyor; açık timeout veya breaker yok.
- frappe/frappe {utils/background_jobs.py, integrations/utils.py, database/**, redis_wrapper.py, app.py, hooks.py}; arama `def make_request|job_timeout|JobTimeoutException|max_connections|pool_size|maxsize`: Kuyruk timeout'ları ve JobTimeoutException işleme var. make_request timeout=None. DB/HTTP bağlantı havuzu sınırı politikası yok.
- suite/suite (*.py); arama `RETRY_POLICY\s*=|class SuiteHTTPClient|limits=|max_connections|max_keepalive`: JMAP RetryPolicy var. httpx max_connections/limits kullanılmıyor. meet 'limits=' kayıt politikasına ait, bağlantıya değil.
- suite/suite/headless_provider; arama `(?i)timeout|rate_limit|breaker|max_conn|limit`: Yalnız advisory_lock timeout ve QueryTimeoutError işleme var. Dış bağımlılık dayanıklılığı yok.

Sınır: Yalnız Read/Glob/Grep ile statik kaynak incelemesi yapıldı. Test, komut veya runtime çalıştırılmadı; functionalAcceptance not_run.; Nginx/gunicorn/reverse proxy bağlantı sınırları ve site_config değerleri (http_timeout, enable_db_statement_timeout, exchange_*_timeout) kaynakta yok; deploy davranışı doğrulanamaz.; Anthropic, httpx ve jmaplib SDK varsayılan timeout/retry davranışları kurulu bağımlılık kaynağı dışında kaldığı için doğrulanmadı.; frappe/automation_engine'in upstream mı yerel ekleme mi olduğu kaynaktan ayrıştırılmadı. frappeCommit adf1fd0 içinde mevcut, suiteCommit bilinmiyor.; Derlenmiş public/dist bundle'ları davranış kanıtı sayılmadı. meet sfu/recorder TS servislerinin yerel backoff'u yalnız grep ile görüldü, satır satır okunmadı.

Temporal workflow: `saas-recheck-20261015t073528z-001`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### performance-6 — Aşırı yükte bekletme, kontrollü kapasite azaltma ve kiracı kaynak adaleti.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe'de site geneli CPU süresi tabanlı RateLimiter (429), user_based endpoint limiti ve Suite'te DocType ile yönetilen dinamik limit var. Uzun işler 'long' kuyruğuna gidiyor. Ancak tenant boyutlu sayaç, tenant başına kuyruk kotası ve backpressure yok. Talimat tenant kimliğini ve sınır aşım yanıtını tanımlamıyor.

Eksik: Tenant kimliğinin rate-limit anahtarına nasıl gireceği tanımsız (user_based kullanıcı bazlı, tenant bazlı değil); Kuyruk başına tenant kotası ve sınır aşımında kullanıcıya dönecek yanıt sözleşmesi yok; Kontrollü hizmet azaltma için hangi özelliklerin kapatılacağı listelenmemiş; create_rate_limit ignore_permissions=True ile ekliyor; bu yardımcı headless olarak dışa açılmamalı

Sonraki adım önerisi: Mevcut rate_limit(user_based/key) ve Suite Rate Limit DocType'ı yeniden kullanılsın. Görevde tenant anahtarı kaynağı ve 429/kuyruk-dolu yanıtı tanımlansın. create_rate_limit yalnız sunucu içi kalmalı.

Mevcut birincil görev: `tenant-fairness--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:79`; `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:111`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/desk/query_report.py:460`.

#### performance-7 — Uç içerik önbelleği, sıkıştırma ve medya dağıtımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Edge/CDN ve sıkıştırma reverse proxy sorumluluğu; nginx/CDN yapılandırması excerpt'te yok. Uygulama tarafında http_cache yardımcısı ve Slides service worker'da public bundle ile kullanıcıya özel cache ayrımı var. Talimat kimlikli API yanıtları için Cache-Control/Vary kuralını ve CDN'in hangi koşulda devreye gireceğini tanımlamıyor.

Eksik: CDN koşulu (medya hacmi eşiği) sayısal değil; Kimlikli yanıtlar için Cache-Control: private/no-store ve Vary kuralı yazılmamış; PWA/Tauri/SW kullanıcı cache'lerinin oturum kapanışında temizlenme kuralı yok; Drive medya dağıtımı (S3/boto3) ile uç cache sınırı tanımsız

Sonraki adım önerisi: Görevde public asset (suite/public/frontend) ve kimlikli API ayrımı Cache-Control kuralıyla yazılsın. Slides USER_CACHE_NAMES deseni diğer PWA yüzeyleri için logout temizleme ölçütü olarak referans alınsın. CDN kararı Hüseyin Cengiz'e devredilsin.

Mevcut birincil görev: `edge-delivery--implementation`. Kaynak: `suite/frontend/src/apps/slides/utils/slidesCaches.js:16`; `suite/frontend/src/apps/slides/utils/slidesCaches.js:17`; `frappe/frappe/client.py:13`; `suite/pyproject.toml:95`.

#### backup-1 — Veri tabanı, dosya, yapılandırma ve anahtar referanslarının yedeklenmesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü açık. Frappe kaynağında DB, public/private dosya ve site config yedeği için ayrı yollar var. Ancak restore manifestinin içeriği, anahtarın config yedeğinden ayrılması ve Suite'in site dışında çalışan servisleri talimatta tanımlı değil.

Eksik: Şifreleme anahtarı site_config içinde tutuluyor. Config yedeğinin anahtarı da taşıyıp taşımadığı ve public artifact'e sızmaması için redaksiyon kuralı yazılmamış.; Suite'in site dışındaki servisleri (sfu/stt/recorder/collab sunucuları, Stalwart mail) ve Keycloak realm'i bench yedeğinin kapsamında değil. Bunların yedek sahibi belirlenmemiş.; Kaynak dokümanlar sürüm belirtmeyen genel Frappe URL'leri. Yerel v17.0.0.dev0 (adf1fd0) komut ve bayraklarıyla eşlemesi yapılmamış.

Sonraki adım önerisi: server-backup--implementation içinde tek bir restore manifesti tanımlanmalı: DB dump, public ve private tar, secretlardan arındırılmış config ve yalnızca anahtar referans kimliği. Site dışı Suite servisleri ile Keycloak realm export'u, sahibi Hüseyin Cengiz olarak ayrı satırlarda listelenmeli.

Mevcut birincil görev: `server-backup--implementation`. Kaynak: `frappe/frappe/utils/backups.py:34`; `frappe/frappe/utils/backups.py:77`; `frappe/frappe/utils/backups.py:72`; `suite/pyproject.toml:88`; `suite/suite/mail/api/account.py:286`.

#### backup-2 — Şifreli, ayrı ortamda ve değiştirilmeye karşı korumalı yedek saklama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe kaynağında Fernet tabanlı yedek şifreleme ve restore sırasında env üzerinden anahtar verme var. Offsite için yalnızca Dropbox entegrasyonuna ait bir patch görünüyor. Değiştirilemez saklama, ayrı hesap ve retention için kaynakta da talimatta da somut bir sözleşme yok.

Eksik: Anahtarın yedekle aynı yerde (site_config) bulunmaması için saklama ve erişim ayrımı tanımsız.; Offsite hedef (S3 Object Lock ya da başka bir seçenek), saklama süresi ve üretim hesabından ayrı silme yetkisi kararlaştırılmamış.; Sahip 'DevOps ekibi' olarak genel yazılmış. Altyapı/güvenlik işi olduğu için Hüseyin Cengiz adıyla atanmalı.

Sonraki adım önerisi: Aynı görevde offsite hedef, retention süresi ve anahtarın yedekten ayrı tutulacağı yer kararı yazılmalı. Kabul provası: anahtarsız restore'un reddedilmesi ve üretim kimliğiyle offsite silmenin başarısız olması.

Mevcut birincil görev: `server-backup--implementation`. Kaynak: `frappe/frappe/utils/backups.py:20`; `frappe/frappe/commands/site.py:197`; `frappe/frappe/commands/site.py:265`; `frappe/frappe/patches/v11_0/set_dropbox_file_backup.py:9`.

#### backup-3 — Kiracı bazlı ve belirli zamana geri yükleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta site bütünüyle restore ve doctype/tablo düzeyinde kısmi yedek var. Bu kısmi yedek kiracıya ait satırları ayırmaz. PITR veritabanı motoruna bağlı, motor ise mariadb, postgres ve sqlite seçenekleri arasında henüz belirlenmemiş. Sheets snapshot restore'u yalnızca tek belge düzeyinde çalışır, felaket kurtarma değildir.

Eksik: Kiracı modeli (her kiracıya ayrı site mi, site içinde iş kiracısı mı) bağlanmadıkça seçici restore tanımlanamaz.; PITR için binlog/WAL arşivi gerekir. Bu Frappe dışında kalır ve motor seçimine bağlı bir bağımlılık olarak yazılmamış.; include/exclude_doctypes kısmi yedeğinin kiracı restore'u sayılmaması gerektiği belirtilmemiş.

Sonraki adım önerisi: tenant-restore--implementation önce kiracı=site eşlemesine ve DB motoru kararına bağlanmalı. Ardından izole bir sitede bench restore ile motor düzeyinde PITR provası tanımlanmalı ve diğer kiracıların etkilenmediği kontrol edilmeli.

Mevcut birincil görev: `tenant-restore--implementation`. Kaynak: `frappe/frappe/commands/site.py:26`; `frappe/frappe/utils/backups.py:154`; `frappe/frappe/commands/site.py:230`; `suite/suite/sheets/versioning/state.py:3`.

#### backup-4 — Otomatik geri yükleme doğrulaması ve veri bütünlüğü denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: zamanlanmış prova, ilişki/toplam/dosya kontrolü ve alarm. Kaynakta etkileşimsiz restore ve dosya türü tespiti gibi yapı taşları var. Otomatik doğrulama ve bütünlük denetimi kaynakta görülmedi. Prova ortamı, kontrol listesi ve alarm kanalı talimatta tanımsız.

Eksik: İzole prova sitesinin nerede ve kimin yetkisiyle açılacağı yazılmamış.; Hangi doctype sayımlarının ve File kayıtları ile dosya varlığı/hash eşleşmesinin kontrol edileceği tanımsız.; Bozuk yedek alarmının hedefi ve sahibi yok.

Sonraki adım önerisi: Mevcut CI ya da sunucu zamanlayıcısında (sahip Hüseyin Cengiz) tek bir prova işi tanımlanmalı: geçici sitede `restore --non-interactive`, ardından küçük ve sabit bir sayım/dosya kontrol listesi. Sonuç ve süre kaydedilmeli.

Mevcut birincil görev: `server-backup--implementation`. Kaynak: `frappe/frappe/commands/site.py:202`; `frappe/frappe/commands/site.py:281`; `frappe/frappe/commands/site.py:180`.

#### backup-5 — RPO (Recovery Point Objective — kabul edilebilir veri kaybı hedefi) takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

RPO'nun ne anlama geldiği açık. Ancak sayısal hedef, ölçüm kaynağı (son başarılı offsite yedeğin zamanı mı, PITR arşivi mi) ve alarm eşiği yok. Kaynakta yalnızca yedek üretimi var, RPO takibi yok.

Eksik: Kararlaştırılmış bir RPO değeri ve onu onaylayan kişi yok.; PITR olmadığında RPO'nun yedek aralığı ile offsite kopyalama gecikmesinin toplamı olduğu belirtilmemiş.; Site dışı Suite servisleri ve Keycloak için ayrı RPO tanımı yok.

Sonraki adım önerisi: İş tarafından bir RPO değeri onaylatılmalı. backup-4 provasında son kurtarılabilir zaman damgası ile kesinti anı arasındaki farkı hesaplayıp eşiğe göre alarm üreten tek bir ölçüm eklenmeli.

Mevcut birincil görev: `server-backup--implementation`. Kaynak: `frappe/frappe/utils/backups.py:56`; `frappe/frappe/utils/backups.py:168`.

#### backup-6 — RTO (Recovery Time Objective — hizmeti geri getirme süresi hedefi) takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü uçtan uca. Ancak RTO hedefi ve 'kritik kullanıcı akışı'nın somut tanımı (Keycloak girişi, headless React ve yetkili Frappe API okuması) eksik. Kaynakta yalnızca restore CLI'ı ve yetkili okuma uçları var. Keycloak ile istemciler snapshot'ta yok.

Eksik: Sayısal bir RTO hedefi yok.; Hazır olma probu tanımsız. Örneğin Keycloak token alındıktan sonra /api/resource üzerinden yetkili bir okuma.; Bağımlılıkların ayağa kalkma sırası yazılmamış: site dışı Suite servisleri, Keycloak, DNS. DNS tarafı Asistan Hüseyin'e, server tarafı Hüseyin Cengiz'e ait.

Sonraki adım önerisi: RTO değeri ve tek bir kritik akış probu tanımlanmalı. Aynı backup-4 provasında kesinti başlangıcından probun başarılı olmasına kadar geçen süre ölçülmeli.

Mevcut birincil görev: `server-backup--implementation`. Kaynak: `frappe/frappe/commands/site.py:165`; `frappe/frappe/api/v1.py:153`; `suite/pyproject.toml:89`.

#### backup-7 — Cihazdaki çalışma verisi ve eşitlenmemiş kayıtlar için şifreli bağımsız yedek, anahtar kurtarma ve geri yükleme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kaynakta ilgili iki parça var, ancak ikisi de bu maddenin gereğini karşılamıyor. (1) Suite'in Vue Slides istemcisi (upstream-native Suite kodu; headless_provider değil) eşitlenmemiş sunum düzenlemelerini aynı cihazda IndexedDB'de (DRAFTS_DB_NAME/'presentations') düz kayıt olarak tutuyor. Kayıtta dirty ve baseModified alanları bulunuyor; yükleme sırasında sunucu kopyasıyla karşılaştırılıp yerel taslak geri yükleniyor. Kalıcılık için navigator.storage.persist isteniyor. Bu taslak şifresiz, cihazdan bağımsız değil ve dışa aktarılamıyor; uygun olmayan durumda da sessizce atılıyor. (2) Frappe'nin sunucu tarafı site yedeği, isteğe bağlı olarak gpg ile şifreleniyor (encrypt_backup ayarı). Anahtar site config'deki backup_encryption_key'den alınıyor, yoksa üretiliyor. Bu yalnızca bulut DB/dosya yedeğidir; cihazdaki gönderilmemiş kayıtları içermez. Frappe v1 create_doc, idempotency anahtarı olmadan doğrudan insert() yapıyor. automation_engine outbox'ı sunucu içi otomasyon kuyruğudur, istemci mutasyon outbox'ı değildir. Meet E2EE/crypto.subtle kodu medya şifrelemesidir, yedekle ilgisi yoktur. suite/headless_provider (yerel pilot ek kod) içinde mutasyon, idempotency, outbox, yedek veya cihaz sözleşmesi bulunmuyor. Tauri, PWA ve WXT istemci kodu snapshot'ta yok.

Eksik: Cihaz verisi, outbox, mutasyon kimlikleri, şema/kural sürümü ve sync imlecini kapsayan şifreli yedek manifest şeması ve bunu üreten veya doğrulayan kod yok; Ayrı fiziksel ortama bağımsız yedekleme ve başka cihazda yetkili geri yükleme yok; Slides taslağı yalnızca aynı tarayıcı profilindeki IndexedDB'de duruyor; Anahtar kurtarma ve yedekten ayrı erişim politikası yok (Stronghold, OS keychain veya web için anahtar türetme bulunamadı); Bozuk veya yanlış anahtarlı yedeğin reddi, tenant kapsamı, saklama süresi ve kurtarma noktasının gösterimi yok; Sunucu tarafında idempotent mutasyon (mutasyon kimliği, tekilleştirme penceresi) ve sonuç sorgusu ucu yok; v1 create_doc doğrudan insert yapıyor; Geri yüklemede özgün cihaz kapsamı, işlem zarfı ve kimliğinin korunması ile yeni cihazın güncel yetkiyle doğrulanması (device-grant) yok; headless_provider'da istemci yedeği veya sync sözleşmesi yok

Sonraki somut adım: Mevcut bağımlılık sırası korunmalı. İlk adım sync-receipt--contract ve kernel-envelope--contract kapsamında headless_provider'a tek bir dar whitelisted uç eklemek olmalı. Bu uç ignore_permissions kullanmamalı ve yerel Frappe izinlerini yeniden kullanmalı. İstemci mutation_id'sini tenant ve cihaz kapsamında tekil bir makbuz DocType'ına yazıp insert'ü aynı işlemde yapmalı; tekrar gelen kimlik için kayıtlı sonucu dönmeli. Yanına bir sonuç sorgusu ucu eklenmeli ve önce RED/GREEN testi yazılmalı. Ardından client-backup--contract ile manifest JSON şeması yazılmalı: sürüm, tenant, cihaz kimliği, outbox, mutasyon kimlikleri, şema/kural sürümü, sync imleci, oluşturulma zamanı ve AEAD şifreleme ile anahtar kimliği. device-grant--contract ile yeni cihaz yetkilendirmesi tanımlanmalı. En son client-backup--implementation yapılmalı: önce tek bir istemcide (Tauri Stronghold veya web) şifreli dışa ve içe aktarma ile yanlış anahtar reddi eklenmeli. Suite Vue Slides taslağı referans alınabilir, ancak yeniden kullanılacak bir yedek mekanizması sayılmamalı.

Önerilen bağımlılık/sıra: client-backup--contract; kernel-envelope--contract; sync-receipt--contract; device-grant--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `client-backup--implementation`.

Kaynak kanıtı:

- `frappe/frappe/api/v1.py:50` — `return frappe.new_doc(doctype, **data).insert()`
- `suite/frontend/src/apps/slides/stores/saving.js:24` — `const req = indexedDB.open(DRAFTS_DB_NAME, DB_VERSION)`
- `suite/frontend/src/apps/slides/stores/saving.js:80` — `return savePresentationToLocalDB(record).then(() => true, () => false)`
- `suite/frontend/src/apps/slides/stores/presentation.js:274` — `const servedIsStale = local?.baseModified > doc.modified`
- `suite/frontend/src/apps/slides/stores/presentation.js:291` — `if (!landed) toast.warning('Changes that never reached the server were discarded.')`
- `frappe/frappe/utils/backups.py:778` — `key = frappe.conf.get(BACKUP_ENCRYPTION_CONFIG_KEY)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, *.{py,ts,js,json,vue}); arama `(?i)(idempotency|idempoten|mutation_id|client_mutation|dedup)`: 187 dosya eşleşti; çoğu ilgisiz dedup işi (arama, sidebar, mail index vb.). İstemci mutasyonu için idempotency uygulaması bulunamadı.
- source (frappe + suite); arama `(?i)(outbox|offline.?queue|pending.?mutation|syncQueue|unsynced)`: Eşleşenler: Frappe automation_engine outbox testi (sunucu içi), mail OutboxView (e-posta gönderim kuyruğu), Slides presentation.js/saving taslağı. Genel bir istemci mutasyon outbox'ı yok.
- suite/frontend/src; arama `(?i)(backup|encrypt|crypto\.subtle|recovery.?key|restore)`: 150 dosya eşleşti; Meet E2EE, Sheets/Writer sürüm geçmişi ve Slides taslak geri yükleme var. Cihaz verisi için şifreli bağımsız yedek yok.
- suite/suite/headless_provider; arama `(?i)(idempot|mutation|outbox|backup|device|sync)`: Yalnızca api.py:6'da 'native schema sync' yorumu var. Yedek, mutasyon veya cihaz sözleşmesi yok.
- suite/frontend/src/apps/slides/stores/saving.js; arama `(?i)(indexedDB|idb|openDB|encrypt|export const writeDraft|getPresentationFromLocalDB =)`: Düz IndexedDB store'u var, şifreleme yok.
- frappe/frappe/utils/backups.py; arama `(?i)(encrypt|backup_encryption_key|def get_or_generate_backup_encryption)`: Sunucu site yedeği için gpg şifreleme ve config anahtarı var; cihaz verisi kapsamda değil.
- source (dist/frontend build çıktıları hariç); arama `(?i)(crypto\.subtle|AES-GCM|deriveKey|stronghold|keychain|recovery.?key|backup.?manifest|exportDrafts|navigator\.storage\.persist)`: Yalnızca Meet E2EE, recorder ve Chromium süreç dosyaları eşleşti. Stronghold, keychain, kurtarma anahtarı ve yedek manifesti yok.
- source (*.{py,ts,js,json}); arama `(?i)(idempotency[-_ ]?key|X-Idempotency|request_id.*dedup)`: Yalnızca derlenmiş SheetEditor bundle'ındaki bir kütüphane satırı eşleşti; Frappe ve Suite API'sinde idempotency anahtarı yok.
- frappe/frappe/automation_engine; arama `(?i)(class .*Outbox|def .*outbox|idempoten)`: Yalnızca TestOutbox test sınıfı var; sunucu otomasyonuna ait, istemci yedeğiyle ilgisi yok.

Sınır: Yalnızca kaynak kod incelendi; functionalAcceptance=not_run. Dağıtım, cihaz ve runtime davranışı kanıtlanmadı.; Tauri, PWA ve WXT istemci kodu snapshot'ta yok; bu nedenle istemci tarafı yalnızca Suite Vue frontend'i üzerinden değerlendirildi.; public/dist ve public/frontend altındaki derlenmiş bundle'lar karar kanıtı olarak kullanılmadı.; automation_engine outbox ve Meet E2EE uygulamaları yalnızca ilgisizliklerini doğrulayacak kadar incelendi.; ERPNext/HRMS kurulu değil, değerlendirilmedi; suiteCommit bilinmiyor.; Test dosyaları yalnızca arama sonucu olarak görüldü, çalıştırılmadı.

Temporal workflow: `saas-recheck-20261015t073528z-002`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### service-1 — İç/dış status page (hizmet durumu sayfası).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: dışarıda yalnız kamuya açık bileşenler, içeride yetkili ayrıntı ve ana uygulama arızasında erişilebilirlik isteniyor. Kaynakta site içi sağlık primitifleri var: System Health Report, scheduler heartbeat ve monitor logu. Ancak System Health Report yalnız System Manager'a açık, site içinde anlık hesaplanan, kalıcı olmayan ve beta durumunda bir rapor. Kamuya açık ya da Frappe çökünce ayakta kalan bir durum yüzeyi yok.

Eksik: Bileşen kataloğu tanımlı değil; hangi bileşenin kamuya, hangisinin yalnız içeriye açık olduğu belirtilmemiş.; Sağlık sinyali sözleşmesi yok: hangi kaynağın (heartbeat, health report alanları, harici probe) hangi duruma eşleneceği belirsiz.; 'Ana uygulama arızasında erişilebilir' kabulü Frappe dışında barındırmayı gerektiriyor; barındırma ve bağımlılık sınırı ile altyapı sorumlusu tanımlı değil.; System Health Report'un v17-dev beta durumu ve yalnız System Manager'a açık olması için sürüm eşlemesi ve kararlılık notu yok.; Koşullu kapsam için seçimin kim tarafından ve hangi ölçütle yapılacağı yazılmamış.

Sonraki adım önerisi: status-page--implementation altında önce kapsam kararını yazın. Ardından iki tablo ekleyin: kamu/iç bileşen kataloğu ve sinyal→durum eşlemesi. Sinyal olarak is_scheduler_process_running, System Health Report alanları (salt okuma) ve harici probe kullanılabilir. Barındırma sınırını Frappe sitesi dışında tanımlayın; altyapı devrinin teknik sahibi olarak Hüseyin Cengiz adıyla belirtilsin.

Mevcut birincil görev: `status-page--implementation`. Kaynak: `frappe/frappe/desk/doctype/system_health_report/system_health_report.py:158`; `frappe/frappe/desk/doctype/system_health_report/system_health_report.py:4`; `frappe/frappe/desk/doctype/system_health_report/system_health_report.json:3`; `frappe/frappe/utils/scheduler.py:95`; `frappe/frappe/monitor.py:23`.

#### service-2 — Planlı bakım, bileşen arızası ve etkilenen kiracı görünümü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta site başına ikili bir maintenance_mode bayrağı ve scheduler duraklatma var; monitor kayıtları site adını taşıyor. Ancak zaman pencereli planlı bakım, bileşen→tenant bağımlılık modeli ve etkilenen tenant görünümü yok. Kabul metni ölçülebilir, fakat tenant'ın Frappe sitesine mi yoksa site içindeki bir kayda mı karşılık geldiği yazılmamış.

Eksik: Tenant tanımı eşlenmemiş: site başına tenant mı, aynı site içinde çok tenant mı? 'Etkilenen tenant' hesabı buna bağlı.; Bileşen→tenant bağımlılık modeli ve veri sahibi tanımlı değil.; Bakım penceresi sözleşmesi yok: zaman dilimi, başlangıç/bitiş, duyuru öncesi süre. Mevcut maintenance_mode yalnız açık/kapalı bir bayrak.; Planlı bakım yayını ile gerçek maintenance_mode/pause_scheduler geçişinin ilişkisi belirsiz: aynı mı, otomatik mi, onaylı mı?; service-1 ve service-3 ile ortak olay/bileşen kimliği tanımlanmamış.

Sonraki adım önerisi: incident-comms--implementation görevine üç karar ekleyin: tenant↔site eşlemesi, bileşen→tenant bağımlılık tablosu ve bakım penceresi alanları. maintenance_mode'un yayınla ilişkisini 'yalnız gözlenen durum, otomatik tetikleme yok' olarak sabitleyin. Yeni görev kaydı açmayın.

Mevcut birincil görev: `incident-comms--implementation`. Kaynak: `frappe/frappe/utils/scheduler.py:181`; `frappe/frappe/commands/scheduler.py:116`; `frappe/frappe/commands/scheduler.py:102`; `frappe/frappe/monitor.py:56`.

#### service-3 — Kesinti iletişimi, güncelleme geçmişi ve olay sonrası açıklama.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de kullanılabilecek genel primitifler var. (1) Notification DocType'ı Email, Slack, System Notification ve SMS kanallarıyla belge olaylarına bağlanabiliyor. send(), send_notification_by_channel'ı çağırıyor; evaluate_alert Python/Filters koşuluyla ve Value Change olayıyla tetikleniyor. (2) track_changes açık DocType'larda Document.save_version, Version kaydını ignore_permissions ile ekliyor. Version DocType'ında in_create=1 var; System Manager yalnız okuyup dışa aktarabiliyor, delete yalnız Administrator'da. (3) Navbar Settings'teki announcement_widget, Desk navbar'ının altında kapatılabilen, global ve tek metinli bir banner; toolbar.js ve navbar.html bunu boot üzerinden gösteriyor. Suite'te kesinti iletişimine en yakın şey, Suite Settings'teki contact_email alanının açıklaması ('planned downtime' bildirimlerinin adresi). Bu yalnız bir alan tanımı, iş akışı yok. Suite'in Vue arayüzündeki boot/config.ts yalnız 'mail server unavailable' ekranını ele alıyor. suite/headless_provider yerel pilot ek kod ve yalnız DocType metadata/şema düzenleme uçları sunuyor (session, metadata, create_field, preview_edit, apply_edit); incident sözleşmesi yok.

Eksik: Kurulu iki app'te de Incident/Outage/Status Page/Postmortem DocType'ı, controller'ı, API'si veya UI'ı yok.; Olay yaşam döngüsü (ilk bildirim → güncellemeler → çözüm) ve bu adımların zaman damgalarını koruyan model yok.; Yalnız ekleme yapılan güncelleme geçmişi yok. Version alan farkı tutuyor ama olay güncellemesi semantiği taşımıyor ve Administrator Version kaydını silebiliyor.; Hedef kitle/kanal sözleşmesi yok (iç kullanıcı, etkilenen tenant, kamu). Notification alıcıları belge bağlamından türetiliyor; tenant hedeflemesi yok. announcement_widget tek, global ve geçmişsiz bir metin.; Kamuya yayın öncesi onay adımı ve yetkili rolün native DocType izinlerine eşlenmesi yok.; Olay sonrası rapor bağlantısı, raporun sahibi ve şablonu yok.; Headless provider'da incident okuma/yazma sözleşmesi yok (React/AntD/GenUI tüketicileri için).

Sonraki somut adım: incident-comms--contract bağımlılığı tamamlandıktan sonra incident-comms--implementation altında en küçük adım: Suite'te custom bir 'Service Incident' DocType'ı. Alanlar: durum (Investigating/Identified/Monitoring/Resolved), started_at, resolved_at, hedef kitle (Internal/Affected Tenants/Public), postmortem Link alanı ve track_changes=1. Native izinler: yazan rol ve ayrı bir yayın onay rolü; ignore_permissions kullanılmayacak. Sıra: (1) başlık DocType'ı ve izinleri; ilk RED/GREEN testi yalnız 'çözümde resolved_at korunur ve sonra değiştirilemez' davranışı. (2) Yalnız ekleme yapılan 'Incident Update' child veya ayrı DocType'ı; controller'da güncelleme ve silme reddedilir. (3) Yayınlanan güncellemede mevcut Notification primitifinin Email/System Notification kanallarının kitleye göre bağlanması. (4) Postmortem bağlantısı. (5) Headless provider'a salt okunur incident uç noktası. Status page, Suite'in Vue arayüzünden ayrı bir tüketici olarak sonraya kalır.

Önerilen bağımlılık/sıra: incident-comms--contract; T-00; R-00; R-01. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `incident-comms--implementation`.

Kaynak kanıtı:

- `frappe/frappe/email/doctype/notification/notification.json:76` — `"options": "Email\nSlack\nSystem Notification\nSMS",`
- `frappe/frappe/email/doctype/notification/notification.py:401` — `self.send_notification_by_channel(doc, context)`
- `frappe/frappe/model/document.py:2043` — `not getattr(self.meta, "track_changes", False)`
- `frappe/frappe/core/doctype/version/version.json:71` — `"delete": 1,`
- `frappe/frappe/public/js/frappe/ui/toolbar/toolbar.js:159` — `let current_announcement = frappe.boot.navbar_settings.announcement_widget;`
- `suite/suite/suite_core/doctype/suite_settings/suite_settings.json:53` — `"description": "Where connected services send notices about this workspace, such as planned downtime or quota warnings."`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite (tüm app kökü); arama `(?i)incident|outage|status.?page|postmortem|post.mortem|downtime`: 26 dosya. Çoğu derlenmiş .map, lisans, test veya mail/meet/sheets içi ilgisiz kullanım. İlgili tek tanım suite_settings.json:53 contact_email açıklaması; incident DocType'ı veya API'si yok.
- frappe (tüm app kökü); arama `(?i)incident|outage|status.?page|postmortem|post.mortem`: 17 dosya: locale, lisans, playwright, ActivityTimeline docs ve client.py içinde 'incidental'. Incident/status page uygulaması yok.
- frappe/frappe (*.py); arama `(?i)incident|outage|status.?page|postmortem|post-incident|root.?cause|downtime`: Yalnız app.py maintenance_mode yorumu, bir test mesajı ve client.py 'incidental'. Olay iletişimi kodu yok.
- frappe/frappe/**/doctype/**/*.json; arama `(?i)incident|outage|announcement|broadcast|banner|maintenance.?mode|system.?notice`: navbar_settings, website_settings ve web_form. İlgili olan Navbar Settings announcement_widget.
- frappe/frappe; arama `announcement_widget`: navbar_settings.json/.py, toolbar.js:158-177 ve navbar.html:2-6. Global, kapatılabilir, localStorage tabanlı ve geçmişsiz tek banner.
- frappe/frappe/email/doctype/notification; arama `channel options; def send|evaluate_alert|trigger_notifications`: Dört kanal, koşul/Value Change tetikleme ve zamanlanmış daily/offset uygulaması okundu.
- frappe/frappe/model/document.py; core/doctype/version/version.json; arama `track_changes|save_version; permissions`: Version, ignore_permissions ile otomatik ekleniyor; in_create=1; delete yalnız Administrator rolünde.
- suite/suite/headless_provider; arama `(?i)incident|outage|notice|announce|notification|status ve ^def |@frappe.whitelist`: Incident terimi eşleşmesi yok. api.py yalnız session, metadata, create_field, preview_edit ve apply_edit sunuyor.

Sınır: Değerlendirme yalnız kaynak kodu okumasına dayanıyor. Çalışma zamanında işlevsel kabul yapılmadı (functionalAcceptance: not_run). Test yazılmadı veya çalıştırılmadı.; Suite commit'i bilinmiyor. Arama kapsamı yalnız dışa aktarılan frappe/ ve suite/ kökleri; ERPNext/HRMS ve harici status page araçları kapsam dışı.; Derlenmiş .map ve locale dosyalarındaki eşleşmeler davranış kanıtı sayılmadı.; suite/headless_provider yerel pilot ek koddur, upstream-native değildir.; Site yapılandırması, Notification kayıtları ve gerçek dağıtım/kanal (SMTP/Slack/SMS) ayarları görülmedi.

Temporal workflow: `saas-recheck-20261015t073528z-003`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### service-4 — Hizmet hedefi ihlali ve sözleşmeye bağlı hizmet kredisi kaydı.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Görev, Helpdesk SLA ve ERPNext değişmez defteri üzerine kurulu; ikisi de bu sitede yüklü değil (yalnız frappe ve suite yüklü). Suite'in kapsamı da muhasebe ya da helpdesk değil. Ham erişilebilirlik verisi için yalnız monitor durum kodları var; bunlar da sınırlı bir Redis listesine ve bench log dosyasına yazılıyor, sözleşme kanıtı olarak saklanmıyor.

Eksik: SLO tanımı yok: ölçüm kaynağı, pencere, hariç tutulan planlı bakım ve hesap formülü belirsiz.; Kredi kademeleri ve sözleşme dönemi modeli ile verinin sahibi tanımlı değil.; Muhasebe bağlantısı ERPNext'e bağlı, ancak ERPNext yüklü değil; alternatif hedef ya da kurulum kararı yok.; Ölçüm verisinin saklanma ve bütünlüğü belirsiz; monitor logu kanıt deposu değil.; GDPR kaynağı bu kalemle ilişkisiz; asıl gereken sözleşme kaynağı eksik.

Sonraki adım önerisi: service-credit--implementation için önce koşullu kapsam kararını alın. Kapsam açılırsa SLO/ölçüm/kredi formülünü ve muhasebe hedefini (ERPNext kurulumu ya da dış sistem) karar olarak yazın. Helpdesk ve ERPNext özelliklerini native sayan cümleleri 'yüklü değil' olarak düzeltin.

Mevcut birincil görev: `service-credit--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/monitor.py:109`; `frappe/frappe/monitor.py:16`.

#### releases-1 — DevOps (Development and Operations — geliştirme ve işletim birlikteliği) araç bağlantıları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream kaynakta iki somut primitive var. (1) Suite reposunda GitHub Actions tabanlı CI ve artifact hattı bulunuyor. suite-ci.yml dosyası bench get-app ve bench build adımlarını çalıştırıyor. meet-sfu-build.yml, meet-recorder-build.yml ve meet-stt-build.yml Docker Buildx ile ghcr.io'ya imaj itiyor. Bu iş akışlarında permissions bölümü contents:read ve packages:write ile sınırlı; GITHUB_TOKEN kullanılıyor ve sha etiketi üretiliyor. (2) Frappe çekirdeğindeki Webhook DocType, belge olaylarında dış HTTP uç noktasına istek gönderiyor (enqueue_webhook → send_webhook_request). İmza başlığı, yeniden deneme ve Webhook Request Log destekleniyor. Connected App ve OAuth Client genel dış araç bağlantısı sağlıyor. Pakette ayrıca [deploy.dependencies.apt] ffmpeg tanımı ve bench dışında konuşlanan bağımsız servis listesi var. Yerel pilot suite/headless_provider'da DevOps, CI veya release sözleşmesi yok; buradaki 'release' eşleşmeleri yalnız DB kilit bırakma kodu.

Eksik: Bu iş akışları upstream frappe/suite reposuna ait. Hedef SaaS için seçilmiş bir DevOps aracı yok: frappe_docker veya Press kararı kaynakta bulunmuyor; sorumlu da tam adla belirtilmemiş.; Frappe ve Suite uygulamasının birlikte paketlendiği site/bench imajı ve registry yolu tanımlı değil.; sheets/collab-server için Dockerfile ve imaj build iş akışı yok; CI'da yalnız test ediliyor.; Suite commit'i bilinmiyor; build çıktısını kaynak revizyonuna (frappe adf1fd0 + suite) bağlayan sözleşme yok.; Hedef org'a özel servis hesabı ve repo/artifact kapsamı tanımlı değil; mevcut izinler upstream GITHUB_TOKEN için.; Frappe içinde GitHub/GitLab/Jenkins/ArgoCD gibi DevOps araçlarına özel bağlayıcı DocType yok; mevcut olan genel Webhook ve OAuth/Connected App.; ffmpeg apt bağımlılığının imaja nasıl aktarılacağı tanımlı değil.; Headless provider tarafında deploy veya sürüm kimliği uç noktası yok.

Sonraki somut adım: Mevcut ci-pipeline--contract tamamlandıktan sonra ci-pipeline--implementation görevinde şu sırayla ilerleyin: 1) Tek dağıtım aracı kararını sorumlusunun tam adıyla yazın (frappe_docker veya Press). 2) frappe adf1fd0 ve suite commit'ini sabitleyen bir apps listesiyle site imajı build adımını tanımlayın; ffmpeg'i bu imaja ekleyin. 3) Mevcut meet-*-build.yml desenini (sha etiketi, en az yetki) hedef org registry'sine uyarlayın ve collab-server için eksik Dockerfile ile build adımını ekleyin. 4) Servis hesabını yalnız ilgili repo okuma ve paket yazma yetkisiyle sınırlayın. Yeni görev açmayın; testler yazılmadı ve çalıştırılmadı.

Önerilen bağımlılık/sıra: ci-pipeline--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ci-pipeline--implementation`.

Kaynak kanıtı:

- `suite/.github/workflows/meet-sfu-build.yml:19` — `  REGISTRY: ghcr.io`
- `suite/.github/workflows/meet-sfu-build.yml:27` — `      packages: write`
- `suite/.github/workflows/suite-ci.yml:128` — `          bench get-app suite $GITHUB_WORKSPACE --skip-assets`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:173` — `		res = send_webhook_request(webhook.request_method, request_url, headers, data, webhook.timeout)`
- `suite/pyproject.toml:35` — `[deploy.dependencies.apt]`
- `suite/pyproject.toml:88` — `    # standalone services, each deployed and run outside the Frappe site`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite (_.py,_.json,_.toml,_.yml,*.yaml); arama `(?i)(github|gitlab|bitbucket|jenkins|ci/cd|webhook)`: 33 dosya bulundu: .github/workflows altında CI ve imaj build iş akışları, ARC runner değerleri, pre-commit ve hooks.py. Python tarafındaki eşleşmeler mail/calendar push/exchange webhook'ları; DevOps bağlayıcısı değil.
- frappe/frappe; arama `(?i)(gitlab|jenkins|bitbucket|argocd|circleci|github_app|github api|api\.github\.com)`: Yalnız yardımcı GitHub API okumaları bulundu (change_log releases/advisories, boilerplate lisans, installer ve Social Login GitHub). DevOps araç bağlayıcısı yok.
- suite/suite/headless_provider; arama `(?i)(devops|ci/cd|pipeline|registry|deploy|release|artifact|webhook)`: Yalnız api.py içindeki DB kilit 'release' kodu bulundu; DevOps sözleşmesi yok.
- frappe/frappe/integrations/doctype/_/_.json; arama `glob`: Webhook, Webhook Request Log, Connected App, OAuth Client, Slack Webhook URL ve Integration Request var; CI/CD'ye özel DocType yok.
- frappe/frappe/integrations/doctype/webhook; arama `^def (enqueue_webhook|get_webhook_data|run_webhooks|_make_request)|requests\.request|webhook_secret|X-Frappe-Webhook-Signature`: Olay tetiklemeli HTTP gönderimi, HMAC imza başlığı ve yeniden deneme günlüğü uygulanmış.
- suite/suite/{meet/sfu-server,meet/recorder-server,sheets/collab-server}/Dockerfile*; arama `glob`: sfu-server ve recorder-server için Dockerfile var; collab-server için yok.
- suite/.github; arama `collab-server`: Yalnız suite-ci.yml içindeki test/değişiklik filtresinde geçiyor; imaj build veya push adımı yok.
- suite/.github/workflows (suite-ci, meet-recorder-build, meet-stt-build, arc-runner-image, assets); arama `(?i)(IMAGE_NAME|registry:|on:|bench get-app|bench build|docker)`: recorder, stt ve ARC runner imajları ghcr.io'ya itiliyor; Frappe/Suite site imajı build ve push edilmiyor.
- frappe/.github/workflows/*; arama `glob`: Upstream test, lint, release ve asset iş akışları var; dağıtım imajı iş akışı yok.

Sınır: Yalnız yerel kaynak anlık görüntüsü okundu (Read/Glob/Grep). Workflow'lar, testler ve build çalıştırılmadı; functionalAcceptance=not_run.; GitHub Actions iş akışları upstream frappe/suite reposuna aittir; hedef SaaS org'unda çalıştıkları kanıtlanmadı.; frappe_docker ve Press kurulu kaynakta yok; değerlendirilmedi.; Suite commit'i bilinmiyor; kaynak kimliği doğrulanamadı.; Registry/servis hesabı yetkileri ve secret değerleri kaynakla doğrulanamaz ve incelenmedi.; ERPNext/HRMS kurulu değil; kapsam dışı.

Temporal workflow: `saas-recheck-20261015t073528z-034`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### releases-2 — CI/CD (Continuous Integration / Continuous Delivery — sürekli entegrasyon / sürekli teslimat) güncelleme bağlantısı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni doğru: başarısız kontrol dağıtımı engellemeli. Kaynakta engelleme primitifleri var: migrate varsayılan olarak durur, --skip-failing yalnız bayrakla açılır, never_skip_patches hook'u mevcut, ruff yapılandırması var. Ancak pipeline aşamaları ve kapıları tanımlanmamış.

Eksik: Hangi kapıların çalışacağı listelenmemiş (ruff, frontend vitest, Frappe testleri, staging migrate); Üretimde --skip-failing yasağı ve kritik Suite patch'lerinin never_skip_patches'e eklenmesi yazılmamış; Suite hooks alıntısında görülmedi; Kabul edilen artifact sürümünün kaydı belirsiz: suite version 0.0.1 sabit, sourceHead null

Sonraki adım önerisi: Mevcut göreve kısa bir kapı listesi ekleyin: lint, birim testi, staging kopyasında --skip-failing olmadan migrate, ardından frappe ve suite revizyonunun kaydı. Altyapı adımlarını Hüseyin Cengiz'e devredin.

Mevcut birincil görev: `ci-pipeline--implementation`. Kaynak: `frappe/frappe/modules/patch_handler.py:48`; `frappe/frappe/modules/patch_handler.py:80`; `suite/pyproject.toml:47`.

#### releases-3 — Rollback (önceki sürüme dönüş) yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat, kod sürümünü düşürmenin şemayı ve veriyi geri döndürmediğini doğru söylüyor. Kaynakta tek bir rollback artifact'ı var (Sheets blob). Buna karşılık geri dönüşsüz adımlar da var: Drive File doctype'ı siliniyor, mail önbelleğinde rmtree çalışıyor. Ayrıca disk üzerindeki mail LMDB/blob ve arama indeksleri DB snapshot'ının dışında kalıyor.

Eksik: İleri yönlü (geri alınamaz) patch'lerin listesi ve bunlar için yalnız restore politikası yok; Snapshot kapsamı yalnız DB ve anahtarlar; mail data/blob/search dizinleri, Drive dosyaları ve S3 belirtilmemiş; RPO/RTO ve prova sıklığı yok; restore sırasında installer'ın set_as_patched davranışı açıklanmamış

Sonraki adım önerisi: release-rollback--implementation görevine şunları ekleyin: geri alınamaz patch envanteri (Drive entegrasyonu, mail namespace) ve DB, dosya ve önbellek dizinlerini birlikte kapsayan snapshot kapsamı. Prova kabulünü bu kapsamla eşleyin.

Mevcut birincil görev: `release-rollback--implementation`. Kaynak: `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:6`; `suite/suite/drive/patches/integrate_with_framework.py:60`; `suite/suite/mail/patches/migrate_cache_to_mail_namespace.py:51`; `frappe/frappe/installer.py:115`.

#### releases-4 — Migration engine (veri ve şema geçiş motoru).

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Frappe v17-dev'de patch motoru doğrudan kaynakta var: pre_model_sync, post_model_sync ve post_fixture_sync aşamaları, Patch Log ve SiteMigration. Ancak Suite patch'leri satır bazındaki hataları loglayıp patch'i başarılı sayıyor; bu, 'hata üretimde atlanmasın' kabulüyle çelişiyor. Sadece kaynak okumasına göre Sheets patch'inde tanımsız 'suite' adı kullanılıyor gibi görünüyor; bu durumda boş olmayan her belgede hata sessizce loglanır. Çalıştırılmadı, doğrulanmadı.

Eksik: Patch'lerin hangi bölüme (pre/post_model_sync, post_fixture_sync) yerleşeceğine dair kural yazılmamış; Satır bazında yutulan hatalar için politika yok: başarısız patch mi sayılacak, hata eşiği ne olacak; Arka plana ertelenen patch'lerin (Sieve enqueue) tamamlanma takibi yok; v16→v17 yükseltme yolu ve suite frappe>=16,<18 aralığının hangi sürümde test edileceği eşlenmemiş

Sonraki adım önerisi: schema-migration--implementation görevine bölüm kuralını, kritik patch'ler için never_skip_patches'i ve satır hatası politikasını ekleyin. Sheets patch'indeki şüpheli adı mevcut insan bütçesi içinde tek senaryoyla doğrulayın.

Mevcut birincil görev: `schema-migration--implementation`. Kaynak: `frappe/frappe/modules/patch_handler.py:79`; `frappe/frappe/migrate.py:142`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:66`; `suite/suite/drive/patches/integrate_with_framework.py:54`; `suite/suite/mail/patches/rebuild_automation_sieve_scripts.py:32`.

#### releases-5 — Demo verisi etkinleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kaynak gösterilen demo adımı Frappe CRM'e ait; CRM bu sitede kurulu değil (yalnız frappe ve suite kurulu). Suite'e ait bir demo mekanizması alıntıda görülmedi. Fixture'lar her migrate'te tüm sitelere senkronize edildiği için demo verisi için uygun değil.

Eksik: 'Demo tenant' kavramının Frappe sitesine nasıl eşlendiği tanımsız; Demo verisinin sıfırlanması ve kaldırılması, ayrıca demo verisinin gerçek siteye karışmasını engelleyen sınır yok; Fixture veya patch kullanımının yasak olduğu yazılmamış; Hangi Suite modülleri için demo verisi gerektiği belirtilmemiş

Sonraki adım önerisi: Önce koşullu kapsamı netleştirin. Gerekiyorsa demo-seed--implementation görevine şunu yazın: yalnız demo sitesinde, rol kontrolüyle çalışan, fixture dışı bir seed komutu ve geri alma adımı.

Mevcut birincil görev: `demo-seed--implementation`. Kaynak: `frappe/frappe/migrate.py:175`; `suite/suite/hooks.py:359`.

#### releases-6 — Sürüm paketi doğrulama, modül uyumu ve geçiş ilerlemesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Temel primitifler var: sürüm aralığı bildirimi, Installed Applications sürüm geçmişi, migrate sonunda version-update yayını ve Patch Log'daki skipped/traceback alanları. Ancak paket imzası, modül uyum matrisi ve aşama bazında ilerleme kaynakta yok. Patch Log yalnız System Manager ve Administrator rolleri tarafından okunabiliyor.

Eksik: İmza/doğrulama yöntemi ve doğrulanmamış paketi reddeden kapı tanımlanmamış; Uyum matrisi required_apps ve frappe-dependencies aralığına bağlanmamış; frappe dağıtım sürümü 'unknown'; Headless ilerleme için aşama olayı yok (yalnız bitişte version-update var); Patch Log'un headless sunumu için izin sınırı yazılmamış; releases-3 ile aynı ana görevi paylaşıyor ama doğrulama ve ilerleme kısmı ayrıştırılmamış

Sonraki adım önerisi: release-rollback--implementation altında, schema-migration--implementation'ı destekleyici görev olarak bağlayın; yeni görev açmayın. Uyum kuralını frappe-dependencies aralığı ve kurulu sürümlerden türetin. İlerleme görünümü Patch Log izinlerini korusun.

Mevcut birincil görev: `release-rollback--implementation`. Kaynak: `suite/pyproject.toml:45`; `frappe/frappe/migrate.py:162`; `frappe/frappe/migrate.py:108`; `frappe/frappe/core/doctype/patch_log/patch_log.json:60`.

#### releases-7 — Geçiş önkontrolü; uygulama geri dönüşü ile veri geri dönüşünü ayırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul anlamlı. Ancak talimat, v17-dev kaynağındaki gerçek migrate sırasına bağlanmamış. Bu sıra: faz bazlı transaction/commit sınırları (DDL ve dosya etkilerinin atomik geri alınması kanıtlanmadı), pre/post_model_sync ve post_fixture_sync patch'leri, Patch Log ile --skip-failing/never_skip_patches. Suite patch'lerinin bir kısmı geri alınamayan veri/dosya değişikliği yapıyor: owner için ham UPDATE, rmtree. Uygulama rollback'i bu değişiklikleri geri almaz.

Eksik: Önkontrol listesi yok: bekleyen patch'ler, skip-failing yasağı, migrate sonrası Error Log taraması.; Geri alınamayan patch sınıflandırması (veri/dosya mutasyonu) ve sürüm başına 'yalnız restore ile geri dönülebilir' işareti yok.; Restore uyumluluğu (eski sürüm yedeğinin yeni kodla yüklenmesi) ve RPO/RTO değerleri tanımsız.; Sheets patch'inde 'suite' adı içe aktarılmamış görünüyor. Hata yakalanıp loglandığı için patch tamamlanmış görünebilir; bu durum çalıştırılarak doğrulanmadı.

Sonraki adım önerisi: schema-migration--implementation altında tek sayfalık bir migrate runbook'u yaz. İçeriği: önkontrol, --skip-failing yasağı, migrate sonrası Patch Log ve Error Log kontrolü, patch başına 'uygulama rollback'i yeterli / restore şart' etiketi. Sheets patch'indeki ad hatasını ayrı bir kusur olarak doğrula.

Mevcut birincil görev: `schema-migration--implementation`. Kaynak: `frappe/frappe/migrate.py:47`; `frappe/frappe/modules/patch_handler.py:48`; `suite/suite/mail/patches/create_suite_user_role.py:47`; `suite/suite/mail/patches/migrate_cache_to_mail_namespace.py:51`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:6`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:66`; `frappe/frappe/installer.py:114`.

#### releases-8 — Demo verisini oluşturma/sıfırlama; gerçek veriden ayırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (yalnız etiketli demo tenant, dış servislere dokunmama) doğru. Ancak 'demo etiketi'nin nerede tutulacağı ve izolasyon birimi (ayrı site mi, aynı site mi) tanımsız. Fixtures her migrate'te yeniden senkronlandığı için demo verisinin taşıyıcısı olamaz. Suite'te Mail/JMAP gibi dış servis yan etkileri de var.

Eksik: Demo işaretinin yeri (site_config anahtarı vb.) ve reset'in hangi koşulda reddedileceği tanımlı değil.; Fixture ile demo seed ayrımı yok. Hooks'taki fixtures her migrate'te uygulanır.; Mail/JMAP, scheduler ve e-posta çıkışını kapatma mekanizması belirtilmemiş.; Seed'in izinli API'ler üzerinden mi yükleneceği belirtilmemiş. ignore_permissions yolu yasaklanmamış.

Sonraki adım önerisi: demo-seed--implementation için iki karar yaz: (1) demo ayrı bir site olsun ve site_config'te bir demo bayrağı taşısın; (2) reset bu bayrak yoksa çalışmasın, scheduler ve outbound mail kapalı olsun. Seed, fixtures dışında ve izin kontrollü insert ile yüklensin.

Mevcut birincil görev: `demo-seed--implementation`. Kaynak: `suite/suite/hooks.py:353`; `suite/suite/hooks.py:359`; `frappe/frappe/migrate.py:175`; `frappe/frappe/client.py:245`; `suite/suite/mail/patches/rebuild_automation_sieve_scripts.py:28`.

#### releases-9 — Bakım modu, kademeli güncelleme ve yayın sonrası sağlık kontrolü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta bakım ve migrate primitifleri var: in_migrate bayrağı, bakım modunda deferred insert flush, migrate sonunda 'version-update' realtime olayı. Ancak tek paylaşılan veritabanı üzerinde canary yapılırsa eski ve yeni kod aynı şemayı görür. Talimat bunu ve 'otomatik rollback'in şemayı geri almadığını ele almıyor. Bu, releases-7 ile çelişki riski taşıyor.

Eksik: Headless/API istemcileri için bakım yanıtı sözleşmesi tanımsız (HTTP durum kodu, Retry-After, istemci davranışı).; Sağlık kontrolünün kapsamı tanımsız: worker'lar, scheduler, realtime, Error Log artışı.; Canary için expand/contract şema uyumluluk kuralı yok. 'Hata rollback'i tetiklesin' ifadesi veri rollback'inden ayrılmamış.; Görev sahibi kişi olarak belirtilmemiş. Teknik kurulumun sahibi Hüseyin Cengiz olmalı.

Sonraki adım önerisi: release-rollback--implementation'a tek bir kural ekle: şema değiştiren sürümde canary yalnız geriye uyumlu (expand) fazda yapılsın. Sağlık eşiği ve bakım yanıtı sözleşmesi Hüseyin Cengiz tarafından yazılsın.

Mevcut birincil görev: `release-rollback--implementation`. Kaynak: `frappe/frappe/migrate.py:108`; `frappe/frappe/migrate.py:160`; `frappe/frappe/automation_engine/dispatch.py:59`; `frappe/frappe/migrate.py:37`.

#### releases-10 — Desteklenen sürümler, güvenlik güncelleme dönemi ve yaşam sonu (EOL) geçiş politikası.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Politika ihtiyacı doğru tanımlanmış. Ancak yerel taban bir sürüm değil: commit'e sabitlenmiş bir geliştirme dalı (17.0.0.dev0). Suite ise Frappe >=16,<18 aralığını kabul ediyor. Destek matrisi bu farkı ve Python 3.14 kısıtını ele almıyor. v16→v17 geçiş patch'leri kaynakta mevcut.

Eksik: Dev commit'in (adf1fd0) destekli sürüm sayılıp sayılmayacağı kararı yok.; Suite'in v16–v17 aralık beyanı ile gerçekte test edilen bileşim arasındaki ayrım yok.; Keycloak, frontend ve Tauri sürümleri için matris şablonu ve EOL bildirim kanalı tanımsız.

Sonraki adım önerisi: Tek bir destek matrisi tablosu tanımla: Frappe commit/sürümü, Suite, Python, Keycloak, istemci. Her satırda 'beyan edilen' ve 'denenmiş' ayrı sütunlarda olsun. Yeni bir görev açma; releases-6 uyum kontrolünü bu tabloya bağla.

Mevcut birincil görev: `release-rollback--implementation`. Kaynak: `frappe/pyproject.toml:7`; `suite/pyproject.toml:45`; `frappe/frappe/patches/v16_0/sidebar_archive.py:1`.

#### releases-11 — İmzalı istemci güncellemeleri ve yerel veritabanı migrationı; bekleyen outbox korunması ve doğrulanmış geri dönüş.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

İstemci tarafı kabul ölçütleri ayrıntılı. Ancak 'çoğalmadan eşitlensin' için sunucu tarafında idempotency sözleşmesi yok. v1 create_doc, istemci mutasyon kimliği olmadan doğrudan insert ediyor. Kaynakta sunucu tarafı dedup için örnek desen (automation queue dedup_key) ve meta/version-update primitifleri mevcut. Kaynaklarda Capacitor geçiyor, oysa Tauri seçili; bu bir tutarsızlık.

Eksik: Outbox tekrar oynatımı için sunucu tarafı dedup alanı/kuralı tanımsız (ör. Custom Field + unique). Bu kural izin kontrollü insert yolu üzerinden işlemeli.; Minimum istemci sürümü ve API uyum kapısı (eski istemcinin reddi) tanımsız.; Kaynak listesindeki Capacitor referansı, Tauri 2 kararıyla çelişiyor.

Sonraki adım önerisi: client-migration--implementation idempotency için mevcut integrity-7 sözleşmesine bağlansın: anahtar site/aktör/işlem kapsamında, istek içerik özetiyle eşleşsin; aynı anahtar farklı içerikle gelirse reddedilsin. Önceki sonuç yalnız güncel okuma yetkisiyle dönsün. Unique kısıt tek başına bu sözleşmenin tamamı değildir. Capacitor kaynağı tarihsel olarak etiketlensin; seçili Tauri kararı korunsun.

Mevcut birincil görev: `client-migration--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/automation_engine/dispatch.py:109`; `frappe/frappe/api/v2.py:649`; `frappe/frappe/migrate.py:108`.

#### releases-12 — Tauri 2 mobilde imzalı mağaza güncellemesi; masaüstü updater ile mobil OTA sınırını ayırma.

Yönerge: **Yeterli**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynağında Tauri 2 istemcisi yok: src-tauri, tauri.conf veya updater eklentisi bulunmuyor. Mağaza paketleme ve imza yapılandırması (keystore, signingConfig, fastlane/TestFlight, .apk/.aab/.ipa) da yok. Mobil OTA mekanizması ve masaüstü updater/mobil OTA sınırını tanımlayan kod da bulunmuyor. Bulunanlar bu maddeyle ilgisizdir. Suite'in Vue frontend'i bench asset'i olarak derleniyor. Web PWA tarafında iki service worker var: Slides için önbellek SW'si ve Mail için yalnız FCM bildirim SW'si (vite-plugin-pwa injectManifest, manifest:false). Her ikisi de skipWaiting/clients.claim ile yeni sürümü hemen etkinleştiriyor. Bu davranış, kullanıcı form doldururken zorla yenilememe veya outbox'ı koruyarak güncelleme kabulüne aykırı. Üstelik yalnız tarayıcı PWA kapsamında; Tauri mağaza veya OTA primitifi değil. headless_provider (yerel pilot, upstream değil) yalnız 'headless-metadata.v1' metadata sözleşmesi sunuyor; istemci sürümü, minimum sürüm veya güncelleme sözleşmesi yok. frappe/ui içindeki 'liveUpdates' eşleşmesi ActivityTimeline'ın gerçek zamanlı güncellemesi; OTA değil.

Eksik: Tauri 2 istemci projesi (src-tauri, tauri.conf, capabilities) ve React/AntDesign istemcisinin Tauri kabuğu; Masaüstü için Tauri updater eklentisi, imzalı güncelleme manifesti ve imza anahtarı yönetimi; Mobil için imzalı App Store/Google Play paketleme hattı (Android keystore/AAB, iOS provisioning/IPA); Masaüstü updater ile mobil mağaza/OTA yolunu ayıran açık yapılandırma veya sözleşme; İstemci native/şema sürümü ve minimum desteklenen sürüm sözleşmesi (Frappe provider tarafında da yok); Güncelleme ve migration sırasında form/outbox/dosya koruması, soğuk açılış sağlık kontrolü, veri kaybettirmeyen geri dönüş engeli; Mobil OTA PoC (yapılmadıkça desteklenmiyor sayılır); İmza anahtarının saklanma sorumluluğu ve rotasyonu (kaynakta yok, talimatta da tanımlı değil)

Sonraki somut adım: Mevcut bağımlılık sırası korunarak önce tauri-mobile-release--contract tamamlanmalı. Bu sözleşme şunları tanımlamalı: masaüstü yolu Tauri updater ile imzalı manifest, mobil yolu ise yalnız imzalı mağaza paketi; OTA, PoC doğrulanana kadar kapalı. Sözleşme istemcinin native/şema sürümünü ve minimum desteklenen sürümü de içermeli. İmza anahtarlarının sahibi ve rotasyon sorumlusu olarak Hüseyin Cengiz yazılmalı. Önerilen bağımlılık, client-migration--implementation, açık bağımlılık olarak eklenmeli. Ardından ayrı istemci reposunda (Frappe app'i değil) en küçük uygulama adımı atılmalı: React/Vite istemcisine minimal Tauri 2 kabuğu eklenmeli. Önce yalnız Android için imzalı debug olmayan bir AAB üretim hattı ve soğuk açılış sağlık kontrolü kurulmalı; bunun için RED/GREEN kanıtı gerekir. Masaüstü updater bundan sonra gelir. İstemci sürümünü dönen salt okunur provider ucu, gerekiyorsa en son eklenmeli. Suite'in Vue frontend'i ve SW'leri bu işin tabanı olarak kullanılmamalı.

Önerilen bağımlılık/sıra: tauri-mobile-release--contract; ui-family-01--contract; client-rule-parity--contract; keycloak-login--contract; önerilen: client-migration--implementation (releases-11). Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tauri-mobile-release--implementation`.

Kaynak kanıtı:

- `suite/frontend/src/apps/mail/sw.ts:49` — `self.skipWaiting()`
- `suite/suite/www/service-worker.js:219` — `self.skipWaiting();`
- `suite/frontend/vite.config.ts:126` — `manifest: false,`
- `suite/suite/headless_provider/api.py:26` — `CONTRACT_VERSION = "headless-metadata.v1"`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- sourceRoot (frappe/ + suite/ tamamı; po/pot/mo/csv/svg/min.js/map hariç); arama `(?i)tauri|capacitor|app[_ -]?store|google[_ -]?play|play[_ -]?store|live[_ -]?update|over[_ -]the[_ -]air|\bOTA\b`: 10 dosya eşleşti, hiçbiri Tauri, mağaza veya OTA ile ilgili değil. Eşleşmeler: frappe/ui ActivityTimeline'daki liveUpdates (gerçek zamanlı zaman çizelgesi), utils.js'teki 'dataURI', root.ts yorumundaki 'stores/', derlenmiş asset ve e2e dosyaları.
- sourceRoot (frappe/ + suite/ tamamı); arama `(?i)keystore|\.apk\b|\.aab\b|\.ipa\b|fastlane|testflight|provisioning[_ ]profile|signingConfig|tauri\.conf|src-tauri|minisign`: Eşleşme yok.
- sourceRoot (frappe/ + suite/ tamamı); arama `(?i)updater|skipWaiting|registerSW|onNeedRefresh|needRefresh|update[_ ]?available|code[_ -]?sign|minimum[_ ]?(app|client)[_ ]?version|force[_ ]?update|app[_ ]?version`: 76 dosya. İlgili olanlar yalnız suite web SW'leri (www/service-worker.js, mail/sw.ts, slides/service-worker.js) ve hooks.py'deki app_version; diğerleri derlenmiş bundle'lar veya alakasız eşleşmeler. Tauri updater veya istemci sürüm kapısı yok.
- suite/frontend/src/**, suite/suite/www/**, frappe/frappe/public/js/frappe/*.js, hooks.py; arama `(?i)skipWaiting|clients\.claim|updatefound|controllerchange|registration\.update|app_version|build_version|version.*(changed|mismatch)`: SW'ler skipWaiting/clients.claim ile hemen etkinleşiyor; korumalı güncelleme istemi (updatefound, needRefresh) yok.
- suite/suite/headless_provider/; arama `(?i)version|release|update|mobile|client`: Yalnız headless-metadata.v1 sözleşme sürümü ve şema kilidi; istemci sürüm/güncelleme sözleşmesi yok.
- suite/frontend/; arama `(?i)service-worker|serviceWorker|sw\.js|webmanifest|display.*standalone`: Web PWA manifesti ve SW kayıtları (SlidesShell, MailLayout) var. Bunlar tarayıcı PWA'sıdır; Tauri değildir.

Sınır: İnceleme yalnız kurulu frappe ve suite kaynağını kapsıyor; ayrı bir istemci reposu (React/Tauri) bu snapshot'ta yok ve değerlendirilmedi.; YOK, kurulu kaynak kapsamındaki yokluğu ifade eder; Tauri, mağaza ve OTA ekosisteminin genel yokluğu anlamına gelmez.; Derlenmiş asset'ler (public/dist, public/frontend/assets) yalnız grep ile tarandı, ayrıntılı okunmadı.; Hiçbir komut, test veya build çalıştırılmadı; functionalAcceptance not_run. Mağaza politikası, imza ve cihaz davranışı kaynakla kanıtlanamaz.; suiteCommit bilinmiyor; headless_provider yerel pilot ek koddur, upstream değildir.; ERPNext/HRMS kurulu değil, değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-035`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### releases-13 — Mobil mağaza kabulü ve yayın kapısı: gerçek uygulama faydası, izinler, indirilen kod ve login politikaları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de mağaza politikalarıyla ilişkili somut bir yapı taşı var: 'Personal Data Deletion Request' DocType'ı. Bu DocType e-posta doğrulaması, System Manager onayı, user_data_fields kapsamında alan anonimleştirme ve silme adımlarını yürütüyor. www/me.html'deki 'Delete Account' bağlantısı Website Settings'teki show_account_deletion_link bayrağıyla açılıyor. Onay bekleyen talepleri auto_account_deletion süresine göre otomatik işleyen zamanlanmış bir hook da tanımlı. Suite tarafında upstream Vue frontend'in bir PWA katmanı var: rota bazlı manifest enjeksiyonu (setPwaTags), display:standalone manifesti, Apple splash/ikon varlıkları ve VitePWA injectManifest ile service worker. Bu bir web kurulum yüzeyi; imzalı native mağaza paketi değil. suite/suite/headless_provider yerel pilot ekidir; yalnız şema metadata/düzenleme RPC'si sunuyor, yayın/izin/mağaza sözleşmesi içermiyor.

Eksik: Tauri/Capacitor/Cordova veya başka bir native mobil kabuk ve imzalı paket yapılandırması yok.; Native izin bildirimleri ve açıklamaları (NS*UsageDescription, uses-permission) ile bunların kullanılan eklentilerle eşlemesi yok.; Sürüm başına içerik sınıflandırması için kayıt yok (metin/görünüm, yeni işlev/veri/ödeme, native/izin değişikliği).; Yayın kapısı DocType'ı/API'si, onaylayıcı rolü ve inceleme kanıtı bağlantısı yok.; OTA/indirilen kod dağıtımını sınırlayan bir kapı yok; service worker'larda skipWaiting var ama içerik sınıfına bağlı onay kapısı yok.; Sign in with Apple ve Apple 4.8 değerlendirmesi yok.; Frappe'nin hesap silme akışı yalnız Frappe User kaydını anonimleştiriyor; Keycloak kimliğinin silinmesiyle entegrasyon yok.; Hesap silme bağlantısı bir site ayarına bağlı ve web sayfası (/me) olarak sunuluyor; Suite Vue arayüzünde veya headless provider sözleşmesinde uygulama içi hesap silme girişi yok.; Suite hooks.py'de suite verileri için user_data_fields bildirimi yok; mail tarafında kullanıcı devre dışı bırakılınca/silinince çalışan ayrı temizlik event'leri var.

Sonraki somut adım: tauri-mobile-release--implementation içinde, mevcut sözleşme bağımlılıkları (tauri-mobile-release--contract, keycloak-login--contract) tamamlandıktan sonra en küçük adım: 1) Yayın kapısı kontrol listesini sürümle birlikte versiyonlanan tek bir artefakt olarak tanımla. Alanlar: değişiklik sınıfı, native eklenti/izin farkı, izin açıklaması eşlemesi, login/4.8 değerlendirmesi, hesap silme yolu, inceleme kanıtı bağlantısı, onaylayıcı (ürün ekibi + Hüseyin Cengiz). 2) Hesap silme için Frappe'nin Personal Data Deletion Request akışını Keycloak kullanıcı silme/devre dışı bırakma ile eşleyen dar bir provider sözleşmesi yaz ve uygulama içinden erişilebilir bir giriş noktası tanımla. 3) Native/izin değişikliğinde OTA'yı reddeden tek bir kuralı gerçek RED/GREEN kanıtıyla ekle. Yeni görev açma.

Önerilen bağımlılık/sıra: tauri-mobile-release--contract; ui-family-01--contract; client-rule-parity--contract; keycloak-login--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tauri-mobile-release--implementation`.

Kaynak kanıtı:

- `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:128` — `def trigger_data_deletion(self):`
- `frappe/frappe/www/me.html:60` — `{% if frappe.db.get_single_value("Website Settings", "show_account_deletion_link") %}`
- `frappe/frappe/hooks.py:301` — `"frappe.website.doctype.personal_data_deletion_request.personal_data_deletion_request.process_data_deletion_request",`
- `suite/frontend/public/pwa/suite/manifest.webmanifest:6` — `"display": "standalone",`
- `suite/frontend/src/router/index.ts:319` — `function setPwaTags(to: RouteLocationNormalizedLoaded) {`
- `suite/frontend/vite.config.ts:119` — `strategies: 'injectManifest',`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, tamamı); arama `(?i)(app.?store|play.?store|google.?play|testflight|capacitor|tauri|cordova|in.?app.?review|store.?review|release.?gate)`: Yalnız derlenmiş dist/.map dosyalarında ve locale'de ilgisiz eşleşmeler var; kaynakta (dist/locale hariç) native kabuk veya mağaza yapılandırması yok. Sadece 'dataURI' ve 'Per-app' gibi yanlış pozitifler çıktı.
- source/ (frappe + suite, dist/public/frontend/locale hariç); arama `(?i)(delete.?(my.?)?account|account.?deletion|personal.?data.?deletion|PersonalDataDeletionRequest|delete_user_data|sign.?in.?with.?apple|apple.?login)`: Frappe'de Personal Data Deletion Request DocType'ı, web formları, Website Settings ve me.html bulundu. Suite'te yalnız mail hesap yönetimi/silme ile ilgili dosyalar var. Sign in with Apple yok.
- frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py; arama `(?i)(def |deletion|anonymi|delete)`: Doğrulama e-postası, yönetici bildirimi, anonimleştirme, silme adımları ve otomatik silme zamanlayıcısı uygulanmış.
- **/hooks.py (frappe + suite); arama `(?i)(user_data_fields|process_data_deletion_request)`: Yalnız frappe/frappe/hooks.py'de var (satır 301 ve 361); suite hooks.py'de user_data_fields bildirimi yok.
- source/ (dist/public/frontend/locale hariç); arama `(?i)(headless_provider|mobile_release|release_gate|store_review|permission_rationale|NSCameraUsage|uses-permission)`: Yalnız suite/suite/headless_provider/api.py çıktı; şema RPC'si, yayın/izin içeriği yok.
- suite/frontend; arama `(?i)(registerType|autoUpdate|skipWaiting|clientsClaim|injectManifest|VitePWA|precache)`: VitePWA injectManifest ve mail/slides service worker'larında skipWaiting var; sürüm kapısı yok.
- suite/frontend/src/router/index.ts; arama `(?i)(setPwaTags|manifest)`: Manifest, kurulabilir uygulama rotalarında çalışma zamanında enjekte ediliyor (web PWA).

Sınır: Yalnız Read/Grep/Glob ile yapılmış statik kaynak incelemesi; kod çalıştırılmadı, test yürütülmedi. functionalAcceptance: not_run.; Kaynak, Apple/Google mağaza kabulünü, cihaz davranışını veya güncel politika uyumunu kanıtlayamaz; kabul garantisi verilemez.; dist ve public/frontend altındaki derlenmiş bundle'lar davranış kanıtı sayılmadı.; Keycloak, Tauri 2 ve React/Ant Design istemcisi kurulu kaynakta yok; bunlarla entegrasyon değerlendirilemedi.; suiteCommit bilinmiyor; headless_provider yerel pilot ekidir, upstream değil.; ERPNext/HRMS kurulu değil; değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-036`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### deployment-1 — On-premises (müşterinin kendi ortamında kurulum) desteği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var: kurulum, Keycloak, backup ve sağlık kontrolü. Ancak talimat yalnız harici frappe_docker/bench kaynaklarına dayanıyor. Bağlayıcı yerel sürüm eşlemesi yok: Frappe 17.0.0-dev (adf1fd0c), Python 3.14 ve Suite 0.0.1; kurulu kaynak revizyonu unknown, yerel build bildirimi 2798633 doğrulanmadı. Kaynakta site kurulumu, backup ve worker teşhisi gibi CLI temel parçaları bulunuyor. Paketleme ve on-prem destek sözleşmesi ise kaynakta yok.

Eksik: Destek matrisi yok: Python >=3.14,<3.15, Frappe v17 geliştirme sürümü, Suite'in frappe >=16,<18 aralığı; geliştirme dalının on-prem üretimde kullanılıp kullanılmayacağına dair karar da yok.; Ayrı çalışan Suite servisleri (meet sfu/recorder, sheets collab-server) ve ffmpeg/Chromium gibi işletim sistemi bağımlılıkları on-prem paket kapsamına alınmamış.; DB türü kararı yok: postgres/sqlite kaynakta deneysel olarak işaretli.; Kabulde geçen 'sağlık kontrolü' tanımsız; doctor yalnız worker teşhisi yapar. Keycloak giriş bağlantısının hangi Frappe mekanizmasıyla kurulacağı da belirtilmemiş.; Backup şifreleme anahtarının ve encryption_key'in müşteri ortamında nasıl taşınıp korunacağı belirtilmemiş.

Sonraki adım önerisi: Mevcut on-premise-package--implementation görevine şunları ekleyin: sürüm/bağımlılık matrisi (Frappe commit, doğrulanmış Suite revizyonu, gözlenen Python ve DB motoru/sürümü), ayrı servislerin listesi ve ölçülebilir sağlık kontrol tanımı. Keycloak bağlantı mekanizmasını ilgili kimlik görevine bağlayın. Yeni görev açmayın; kabul not_run olarak kalır.

Mevcut birincil görev: `on-premise-package--implementation`. Kaynak: `frappe/pyproject.toml:7`; `suite/pyproject.toml:45`; `suite/pyproject.toml:88`; `frappe/frappe/commands/site.py:105`; `frappe/frappe/commands/site.py:899`; `frappe/frappe/commands/scheduler.py:134`.

#### deployment-2 — Cluster (sunucu kümesi) yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam 'advanced' ve dışa dönük olarak doğru konumlanmış. Ancak orkestrasyon seçilmemiş ve Press kurulu değil. Frappe kaynağı düğüm yönetimi sağlamıyor; yalnız DB/Redis adreslerini dışarıdan verme, scheduler duraklatma ve bakım modu gibi temel parçalar var. Kabul metni ölçülebilir değil.

Eksik: Orkestrasyon kararı yok: Press, Compose/Swarm veya k8s seçilmemiş; Press kurulu uygulama envanterinde de yok.; Düğüm boşaltma/ekleme prosedürü ile pause_scheduler ve maintenance_mode kullanım sırası tanımsız.; Realtime yapılandırması env değişkeni okumuyor, yalnız config dosyalarından geliyor. Çok düğümde paylaşılan common_site_config dağıtım sözleşmesi yok.; Chromium'un harici çalıştırılması kaynakta 'not implemented/tested yet' olarak işaretli; PDF iş yükü kümeye taşınamaz varsayılmalı.; deployment-4 ile aynı görev ID'sini paylaşıyor; hangi kabulün hangi dilime ait olduğu ayrılmamış.

Sonraki adım önerisi: cluster-capacity--implementation görevinde önce orkestrasyon kararını ve hizmet hedefini kayda geçirin. Ardından düğüm boşaltma runbook'unu yazın (pause_scheduler → maintenance_mode → yeniden yerleştirme) ve 'izlenebilir yerleşim' için tek bir ölçülebilir kayıt tanımlayın.

Mevcut birincil görev: `cluster-capacity--implementation`. Kaynak: `frappe/frappe/config.py:80`; `frappe/frappe/config.py:125`; `frappe/frappe/realtime/config.py:7`; `frappe/frappe/utils/chromium/process.py:81`; `frappe/frappe/commands/scheduler.py:102`.

#### deployment-3 — Subdomain (alt alan adı) ve multi-domain (çoklu alan adı).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: yanlış host başka tenant verisi açmamalı. Kaynakta host tabanlı site çözümleme ve proxy temel parçaları var. Ancak headless frontend domaini → API sitesi eşlemesi, site ile iş tenantı arasındaki ilişki ve Keycloak/OAuth yönlendirmelerinin birden çok domainle çalışması tanımsız.

Eksik: Site çözümleme gövdesi (Host veya başlık tabanlı seçim) excerpt'te görünmüyor; yanlış host davranışı doğrulanmadı.; developer_mode açıkken bilinmeyen host hatası bench üzerindeki tüm site adlarını listeliyor. Üretimde developer_mode kapalı olmalı ama bu kabul şartında yok.; Connected App redirect_uri tek bir get_url() değerinden türetiliyor. Çoklu domain için Keycloak redirect izin listesi sözleşmesi yok.; default_site'ın bilinmeyen hostlarda kullanılmamasına dair bir kural yok.; CORS ve çerez domain kapsamı (Vite/PWA, Tauri, WXT istemcileri) tanımsız.

Sonraki adım önerisi: domain-lifecycle--implementation görevine host→site→tenant eşleme tablosunu ekleyin. Kurallar: üretimde developer_mode kapalı, default_site kullanılmıyor, yanlış host 404 dönüyor. Domain başına Keycloak redirect listesi ve CORS izinleri yazılsın. Teknik DNS değerlerini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın.

Mevcut birincil görev: `domain-lifecycle--implementation`. Kaynak: `frappe/frappe/app.py:28`; `frappe/frappe/config.py:52`; `frappe/frappe/config.py:57`; `frappe/frappe/integrations/doctype/connected_app/connected_app.py:63`; `frappe/frappe/commands/site.py:893`.

#### deployment-4 — Paylaşımlı/ayrılmış uygulama ve veri tabanı kaynak tahsisi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

'Site ≠ iş tenantı' ayrımı doğru yapılmış. Kaynakta site başına DB host/adı, backup/restore ve site_config kopyalama gibi taşıma temel parçaları var. Ancak kota/ölçüm modeli, paylaşımlıdan ayrılmışa taşıma runbook'u ve şifreleme anahtarı sürekliliği tanımsız.

Eksik: Kaynak tahsisinin 'kayıtlı ve ölçülebilir' olması için metrik ve kayıt yeri tanımsız; excerpt'lerde kota mekanizması yok.; Taşımada encryption_key korunmazsa şifreli alanlar çözülemez; bu risk kabul şartında yok.; Şifreli backup kullanılıyorsa anahtar yönetimi tanımsız.; Suite'in ayrı servislerinin paylaşımlı/ayrılmış yerleşimi belirtilmemiş.; deployment-2 ile aynı görev ID'sini paylaşıyor; kabul dilimleri ayrılmamış.

Sonraki adım önerisi: cluster-capacity--implementation altında tek bir taşıma runbook'u yazın: backup (site_config dahil) → yeni DB host ile site → restore → encryption_key doğrulaması → izin örneklemesi. Ayrıca tek bir kaynak ölçüm kaydı tanımlayın. Yeni registry açmayın.

Mevcut birincil görev: `cluster-capacity--implementation`. Kaynak: `frappe/frappe/commands/site.py:29`; `frappe/frappe/utils/backups.py:225`; `frappe/frappe/utils/password.py:241`; `frappe/frappe/utils/backups.py:231`.

#### deployment-5 — Alan adı sahipliği doğrulama; güvenlik sertifikası oluşturma ve yenileme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

İlgili ama dağınık primitifler var. (1) Suite Mail (upstream Suite, yerel pilot değil) domain sahipliği akışı: get_domain_ownership_record, add_domain ve verify_domain whitelisted API'leri, sahiplik kaydı ve DNS doğrulamasını uzaktaki Suite Cloud'a (get_client().call) devrediyor. Docstring'e göre sahiplik kaydı çözümlenmeden domain eklenmiyor ve kontrol saatlik yapılıyor; ancak bu zorlama yerel kodda değil, uzak serviste. Yerelde get_active_domain_names yalnız enabled ve is_verified domainleri hesap/grup/liste için sunuyor. Yani doğrulanmamış domain mail kullanımına kapalı, ama bu yalnız mail domaini için geçerli; site/tenant host bağlama değil. (2) Ayrı Meet SFU deploy paketi: certbot-init.sh Let's Encrypt HTTP-01 webroot ile ilk sertifikayı alıyor. docker-compose'daki certbot servisi 12 saatte bir 'certbot renew --quiet' çalıştırıyor, deploy.sh ssl-renew ile zorla yenileme yapılabiliyor. Bu yalnız SFU alt servisini kapsıyor. (3) Frappe çekirdeğinde get_url yalnız site config'teki ssl_certificate veya wildcard.ssl_certificate değerine bakarak https şemasını seçiyor; sertifika üretmiyor, domain doğrulamıyor. suite/headless_provider (yerel pilot; api.py, local_fixture.py) içinde domain/TLS ile ilgili hiçbir şey yok.

Eksik: Frappe sitesine/tenant'a özel domain (custom host) bağlamadan önce sahiplik doğrulaması (DNS TXT, HTTP-01 vb.) yok. Bu iş bench/nginx katmanında; o katman kaynakta yok.; Frappe siteleri için sertifika üretme ve yenileme otomasyonu yok; yalnız SFU alt servisinde certbot var.; Yenileme başarısızlığında alarm yok: SFU'daki 'renew --quiet' döngüsü bildirim üretmiyor; kaynakta sertifika bitiş tarihi izlemesi bulunamadı.; Doğrulanmamış domainin site routing'ine bağlanmasını engelleyen yerel kapı yok.; headless_provider'da domain yaşam döngüsü sözleşmesi (durum, doğrulama, sertifika durumu) yok.; Mail domain doğrulaması dış Suite Cloud'a bağımlı; yerel kodda bağımsız DNS çözümleme ve doğrulama yok.; developer_mode, allow_tests veya CI açıkken OAUTHLIB_INSECURE_TRANSPORT açılıyor (eski bulgu). Üretimde bu bayrakların kapalı olması şartı hâlâ tanımsız.

Sonraki somut adım: domain-lifecycle--contract kapsamında önce headless_provider için dar bir domain durum sözleşmesi tanımlayın: pending_verification → verified → bound → cert_active/cert_failed. Sıra şöyle olmalı: (1) Sahiplik doğrulama kapısı. Mail'deki 'ownership record + verify + yalnız verified domain aktif' desenini (suite/suite/mail/api/admin.py, suite/suite/mail/directory.py) örnek alın; doğrulanmamış domain için bağlamayı reddeden tek bir davranışı RED/GREEN testle kurun. (2) Bağlama (bench/nginx host ekleme). (3) Sertifika: SFU certbot HTTP-01 webroot desenini referans alın. (4) Yenileme başarısızlığı alarmı; 'renew --quiet' döngüsü bildirim üretmiyor, bu yüzden ayrıca eklenmeli. Üretim kabulünde developer_mode ve allow_tests kapalı olmalı. DNS kayıt değerlerini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın, sunucu tarafındaki sonucu Hüseyin Cengiz doğrulasın.

Önerilen bağımlılık/sıra: domain-lifecycle--contract; domain-lifecycle--implementation; deployment-3. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `domain-lifecycle--implementation`.

Kaynak kanıtı:

- `suite/suite/mail/api/admin.py:169` — `return get_client().call("mail.domains.check_domain", domain=name)`
- `suite/suite/mail/api/admin.py:214` — `result = get_client().call("mail.domains.verify_dns_records", domain=domain_id)`
- `suite/suite/mail/directory.py:31` — `return sorted(d["domain"] for d in get_domains() if d.get("enabled") and d.get("is_verified"))`
- `suite/suite/meet/sfu-server/deploy/nginx/certbot-init.sh:99` — `--webroot-path=/var/www/certbot`
- `suite/suite/meet/sfu-server/deploy/docker-compose.yml:117` — `# Renew certificates every 12 hours (certbot is idempotent)`
- `frappe/frappe/utils/data.py:1995` — `if frappe.local.conf.ssl_certificate:`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe ve suite (tüm sourceRoot; min.js/map/svg/po/pot/csv hariç); arama `(?i)(letsencrypt|certbot|acme|ssl_certificate|domain.?verif|verify.?domain|txt.?record|cert.?renew|certificate.?expir)`: 44 dosya. Frappe'de yalnız email ssl doğrulama bayrakları, utils/data.py get_url ve test/örnek 'Acme' metinleri çıktı. Suite'te mail domain API/UI ve meet/sfu-server/deploy altında certbot dosyaları bulundu.
- suite/suite (public hariç); arama `(?i)(def .*verif.*domain|def .*domain.*verif|verify_dns|dns_record|is_verified|domain_verified|custom_domain|add_domain)`: mail/api/admin.py içinde add_domain, verify_domain, get_domain_ownership_record bulundu ve Suite Cloud'a devrediyor. dns_record DocType yalnız main.pot'ta geçiyor; dns_record.py dosyası mevcut değil.
- suite/suite/meet/sfu-server/deploy; arama `(?i)(certbot|renew|ssl|cert)`: certbot servisi 12 saatlik renew döngüsü, ssl-init/ssl-renew komutları ve nginx Let's Encrypt yolları var; alarm yok.
- suite/suite; arama `def get_active_domain_names|def get_site_domains`: directory.py:31 yalnız enabled ve is_verified domainleri döndürüyor.
- suite/suite/headless_provider; arama `(?i)(domain|tls|certificate|https|ssl)`: Eşleşme yok.
- frappe/frappe; arama `(?i)(letsencrypt|certbot|acme|ssl_certificate|domain.?verif|verify.?domain|txt.?record|cert.?renew|certificate.?expir)`: Yalnız email validate_ssl_certificate alanları ve data.py:1995 get_url https seçimi var; ACME/doğrulama/yenileme yok.
- suite (public hariç); arama `(?i)(renew.*(fail|alert|notify)|cert.*(alert|monitor|expir)|ssl.*(alert|expir))`: Yalnız push subscription yenileme hatası ve mail TLS-RPT 'certificate-expired' rapor görünümü var (karşı sunucu raporu); kendi sertifika yenileme alarmı yok.

Sınır: Yalnız sourceRoot altındaki frappe ve suite app kaynakları incelendi. bench, nginx/supervisor config, site_config ve sunucu katmanı kaynakta yok.; Suite Cloud uzak servis kodu kaynakta yok; sahiplik zorlaması yalnız docstring ve istemci çağrısı düzeyinde görüldü, uzaktaki davranış doğrulanamaz.; Hiçbir komut, test veya deploy çalıştırılmadı; functionalAcceptance: not_run.; SFU deploy paketi yalnız Meet SFU alt servisini kapsıyor; Frappe site domainlerini kapsamıyor.; Kodun varlığı, üretimde sertifikanın gerçekten yenilendiğini veya alarm üretildiğini kanıtlamaz.

Temporal workflow: `saas-recheck-20261015t073528z-040`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### deployment-6 — Kurulum sihirbazı, ortam yapılandırması ve kurulum sağlık denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul anlamlı: eksik zorunlu ayar kurulumu durdurmalı, bileşen sağlığı görünmeli. Kaynakta new-site, make_site_config, env üzerinden config override ve yalnız worker'ları kapsayan 'doctor' var. Bunlar CLI temelli yapı taşları; headless sihirbaz ya da birleşik sağlık sözleşmesi değil. Keycloak bağlantı testinin Connected App'e mi yoksa ayrı bir OIDC katmanına mı bağlanacağı tanımlı değil.

Eksik: Zorunlu ayar listesi yok (db_*, redis_queue/redis_cache, encryption_key, Keycloak issuer/client) ve hangisinin kurulumu engelleyeceği belirsiz.; Sağlık sonucunun biçimi, yetkisi (System Manager'a özel mi), zaman aşımı ve yeniden deneme kuralı tanımsız. DB/Redis/realtime/Keycloak için tek tek ölçüt yok.; show-config tüm config'i döker. Sağlık çıktısında secret maskeleme kuralı yazılmamış.; v17.0.0-dev (sourceHead adf1fd0c) eşlemesi yok; kaynak olarak yalnız genel bench/site_config dokümanları gösterilmiş.; Bu snapshot'ta HTTP sağlık uç noktası görülmedi (unknown).

Sonraki adım önerisi: installation-health--implementation görevine şunları ekle: zorunlu ayar tablosu ve salt okunur, System Manager'a özel bir sağlık sözleşmesi (bileşen → ok/fail/not_run, secret içermez). get_site_config ve doctor yeniden kullanılsın. Keycloak kontrolü Connected App get_openid_configuration üzerinden discovery ile sınırlandırılsın.

Mevcut birincil görev: `installation-health--implementation`. Kaynak: `frappe/frappe/commands/site.py:19`; `frappe/frappe/installer.py:752`; `frappe/frappe/config.py:76`; `frappe/frappe/commands/scheduler.py:134`; `frappe/frappe/integrations/doctype/connected_app/connected_app.py:56`; `frappe/frappe/commands/utils.py:228`.

#### deployment-7 — Yatay ölçekleme, yük dağıtımı ve yüksek erişilebilirlik.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam doğru biçimde 'advanced' ve dış topolojiye bağlı. Kaynakta DB host'u ve Redis queue env/config ile dışarı alınabiliyor, ProxyFix de mevcut. Ancak HA davranışı kaynakta yok ve Chromium'un ayrı sunucuda çalışması kaynakta 'not implemented/tested' olarak işaretli. Kabul metnindeki 'tanımlı süre/hedef' sayısal değil.

Eksik: RTO/RPO ve SLO değerleri ile topoloji kararı (web/worker/DB/Redis/dosya/LB) yok.; Oturum ve cache için Redis, DB ve paylaşılan dosya deposunun tek hata noktası sınamasında yöntem ve başarı ölçütü yok.; Suite'in site dışındaki servisleri (sfu, recorder, collab) HA kapsamına alınmamış.; Chromium ve realtime için worker başına süreç sınırları hesaba katılmamış.; Teknik sahip tam adla belirtilmemiş. Kişisel politikaya göre kritik altyapı Hüseyin Cengiz'de.

Sonraki adım önerisi: cluster-capacity--implementation görevini sayısal SLO/RTO ve bileşen bazlı SPOF tablosunu içeren bir karar kaydına bağla; sahibi Hüseyin Cengiz olsun. Uygulama, hizmet hedefi onaylanana kadar ertelensin.

Mevcut birincil görev: `cluster-capacity--implementation`. Kaynak: `frappe/frappe/config.py:80`; `frappe/frappe/config.py:125`; `frappe/frappe/app.py:11`; `frappe/frappe/utils/chromium/process.py:81`; `suite/pyproject.toml:88`.

#### deployment-8 — Alan adı/kurulum kaldırma; artık kaynak ve erişim temizliği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul anlamlı: artık erişim kalmamalı, yedek ve denetim kanıtı korunmalı. Kaynakta uygulama kaldırma, onay isteyen yıkıcı reinstall ve şifreli yedek seçeneği var. Domain/DNS, sertifika ve Keycloak client temizliği için Frappe tarafında bir akış yok. drop-site bu excerpt'lerde görülmedi (unknown).

Eksik: Sıralı kaldırma sözleşmesi yok: yedek → bakım modu → site kaldırma → proxy/sertifika → DNS → Keycloak client/token iptali → denetim kaydı.; Yedekleri saklama süresi ve şifreleme zorunluluğu tanımsız. Yedeğe site_config da kopyalanıyor ve içinde secret'lar var.; DNS adımının sorumluları ayrılmamış: GoDaddy'de uygulamayı Asistan Hüseyin yapar, teknik gereksinim ve doğrulama Hüseyin Cengiz'dedir.; Kaldırma için kim yetkili ve geri alınamaz adımlarda hangi onay gerekiyor, belirtilmemiş.

Sonraki adım önerisi: domain-lifecycle--implementation görevine yukarıdaki sıralı runbook'u ve rol/onay matrisini ekle. Yedekte encrypt_backup zorunlu olsun. drop-site davranışı v17 kaynağında ayrıca okunup bağlansın.

Mevcut birincil görev: `domain-lifecycle--implementation`. Kaynak: `frappe/frappe/installer.py:413`; `frappe/frappe/commands/site.py:531`; `frappe/frappe/utils/backups.py:231`; `frappe/frappe/utils/backups.py:405`.

#### deployment-9 — İnternetten yalıtılmış ortamda kurulum, güncelleme ve bağımlılık teslimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Koşullu kapsam ve kabul uygun. Ancak kaynakta internete bağımlı noktalar var: git+https üzerinden çekilen PyPika, çalışma anında Chromium indirme, harici Claude API'sine bağlı Sheets AI Assist ve apt üzerinden ffmpeg. Talimat bu bağımlılıkların envanterini çıkarmıyor ve hangi özelliklerin çevrimdışı desteklenmeyeceğini söylemiyor.

Eksik: Dışa çıkış envanteri yok: pip/git, npm/asset build, apt, Chromium indirme, harici AI API'leri.; Artifact manifesti, özet veya imza doğrulama yöntemi ve iç mirror sözleşmesi tanımsız.; Python 3.14 ve Node v24 pinleri ile v17-dev sürüm eşlemesi yazılmamış.; Çevrimdışı ortamda devre dışı kalacak özellikler (ör. AI Assist) ve Keycloak/sertifika tedariki belirtilmemiş.

Sonraki adım önerisi: on-premise-package--implementation görevine bir dış bağımlılık envanteri ekle (aşağıdaki kanıt satırlarından başlanabilir) ve her biri için vendor/mirror/devre dışı kararı ver. Kabul, egress kapalı ortamda ayrıca not_run olarak takip edilsin.

Mevcut birincil görev: `on-premise-package--implementation`. Kaynak: `frappe/pyproject.toml:26`; `frappe/frappe/utils/chromium/process.py:13`; `suite/pyproject.toml:32`; `suite/pyproject.toml:37`; `frappe/pyproject.toml:7`.

#### deployment-10 — Infrastructure as Code (IaC — altyapının kodla tanımı), ortam farkı ve yapılandırma sapması takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçülebilir: yeniden üretim, plan farkı, sapma tespiti ve secret'ların koda yazılmaması. Kaynak, config'in env ve extra_config hook'u ile dışarıdan verilmesini ve set-config'i destekliyor. Ancak IaC aracı, state ve secret deposu seçilmemiş. encryption_key gibi çalışma anında üretilen secret'ların yönetimi de tanımsız.

Eksik: IaC aracı ve state backend kararı yok (Terraform yalnız örnek).; site_config ve common_site_config için istenen durumun nasıl tanımlanacağı ve sapma kontrolünde secret'ların nasıl maskeleneceği belirsiz.; Çalışma anında oluşan encryption_key'in kaynak dışı saklanması ve geri yükleme ilişkisi tanımsız.; Yerel Colima ile Hetzner'deki Docker Engine arasındaki ortam farkı kapsam dışında kalmış.

Sonraki adım önerisi: infrastructure-code--implementation görevine şu karar kaydını ekle: araç, state ve secret deposu. Ayrıca site config anahtarları için istenen durum listesini ve FRAPPE_* env ile extra_config yoluyla secret enjeksiyonunu tanımla. Sapma çıktısında değer gösterilmesin, yalnız anahtar ve fark bildirilsin.

Mevcut birincil görev: `infrastructure-code--implementation`. Kaynak: `frappe/frappe/config.py:89`; `frappe/frappe/config.py:95`; `frappe/frappe/commands/utils.py:922`; `frappe/frappe/utils/password.py:255`; `suite/pyproject.toml:35`.

#### observability-1 — Observability (gözlemlenebilirlik) ve kaynak takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü var, ancak hangi API/worker metriğinin hangi kaynağa bağlanacağı, metrik adı/etiket (site/tenant) sözleşmesi ve alarm yönlendirmesi tanımsız. Kaynakta Prometheus deseni yalnız Meet recorder servisinde görülüyor (prom-client Registry, recorder_* metrikleri, Grafana panosu). Frappe web/RQ worker için exporter bu alıntılarda görünmüyor. Talimat bu mevcut deseni yeniden kullanma sınırı olarak anmıyor.

Eksik: Frappe web ve RQ worker için metrik kaynağı (Monitor/Recorder mi, ayrı exporter mı) seçilmemiş; Frappe 17.0.0.dev0 için API eşlemesi yok; Kiracı/site etiketinin kardinalite ve kişisel veri sınırı tanımsız; 'Ölçüm kesintisi görünür olsun' için up/absent kuralı ve alarm sahibi (Hüseyin Cengiz) belirtilmemiş; Mevcut recorder /metrics + metricsToken deseninin yeniden kullanılacağı yazılmamış

Sonraki adım önerisi: metrics-export--implementation görevine şu eklensin: recorder-server app.ts'deki prom-client + ayrı metrics token deseni referans alınarak Frappe web/worker için tek bir exporter kararı verilsin; site etiketi ve up==0 alarmı kabul ölçütüne yazılsın. Sorumlu: Hüseyin Cengiz.

Mevcut birincil görev: `metrics-export--implementation`. Kaynak: `suite/suite/meet/recorder-server/src/app.ts:6`; `suite/suite/meet/recorder-server/src/app.ts:169`; `suite/suite/meet/recorder-server/src/config.ts:85`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:16`.

#### observability-2 — CPU (Central Processing Unit — merkezi işlem birimi), ağ ve SSD (Solid State Drive — katı hâl disk) ölçümleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü ölçülebilir (sunucu bazında CPU/ağ/disk serisi, kayıp hedef alarmı). Ancak exporter, saklama süresi, hedef envanteri ve eşikler 'seçilecek' olarak bırakılmış. Kaynakta yalnız uygulama düzeyinde yapı taşları var: recorder için boş disk koruması (DiskGuard) ve recorder hedefi için up paneli. Host CPU/ağ/SSD ölçümü Frappe/Suite kaynağının kapsamında değil.

Eksik: Host/container exporter ve saklama kararı yok; Hedef envanteri (Hetzner/Debian Docker Engine host'ları) ve etiket şeması yok; CPU/disk doluluk/IO eşikleri ve kayıp hedef alarmının süresi tanımsız; DiskGuard minimumFreeBytes eşiğinin host disk alarmıyla ilişkisi tanımlanmamış

Sonraki adım önerisi: Hüseyin Cengiz host exporter'ını ve saklama süresini seçsin. Hedef listesi ile CPU/ağ/disk eşikleri metrics-export--implementation kabulüne eklensin. Recorder DiskGuard eşiği, disk alarmının alt sınırı olarak belgelensin.

Mevcut birincil görev: `metrics-export--implementation`. Kaynak: `suite/suite/meet/recorder-server/src/server.ts:16`; `suite/suite/meet/recorder-server/src/config.ts:20`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:117`.

#### observability-3 — Logging (teknik kayıt üretimi), log manager (kayıt yönetimi) ve Sentry adaptörü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta yapılandırılmış log yapı taşları var: Mail EventLogger, frappe.logger ile site bazlı ve döndürmeli log üretiyor; admin logu payload yazmıyor; SFU ve recorder JSON event logu üretiyor. Ancak correlation-id taşıma sözleşmesi, merkezi log hedefi ve Sentry SDK entegrasyonu görünmüyor. Suite bağımlılık listesinde sentry yok; Frappe tarafının bağımlılık alıntısı kısmi. Talimatta 'secret alanlar çıkarılsın' ifadesi var ama hangi alanların çıkarılacağı tanımlanmamış.

Eksik: Frappe web, RQ worker ve Node servisleri (SFU/recorder) arasında request/correlation-id sözleşmesi yok; Merkezi log manager hedefi ve saklama/erişim yetkisi seçilmemiş; Sentry: self-host mu SaaS mı, DSN secret yönetimi ve veri yerleşimi kararı yok; Redaksiyon listesi (token, parola, mail içeriği) ve Frappe v17 logging API eşlemesi yok

Sonraki adım önerisi: trace-logging--implementation görevine şunlar eklensin: tek bir correlation-id alanı; mail logger.py'deki 'payload yazma' kuralını genelleyen bir redaksiyon listesi; Sentry barındırma kararı. DSN yalnız secret deposunda tutulsun.

Mevcut birincil görev: `trace-logging--implementation`. Kaynak: `suite/suite/mail/utils/logger.py:48`; `suite/suite/mail/utils/logger.py:161`; `suite/suite/meet/sfu-server/src/utils/logger.ts:71`; `suite/suite/meet/recorder-server/src/server.ts:142`; `suite/pyproject.toml:10`.

#### observability-4 — Bellek, veri tabanı, kuyruk, önbellek ve dış servis sağlık ölçümleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü bileşen bazında doğru alarm istiyor, fakat bileşen listesi ve probe sözleşmesi yok. Kaynakta recorder için /health ve /ready uçları, Python RecorderClient'ta sınırlı timeout ve 'indeterminate' sonucu var; bunlar dış servis sağlığı için örnek desen. MariaDB, Redis, RQ kuyruğu ve S3/JMAP sağlık ölçümü bu alıntılarda görünmüyor. Frappe Monitor kaynağı alıntılanmadığı için çekirdek tarafı bilinmiyor.

Eksik: Probe yapılacak bileşenlerin listesi (MariaDB, Redis cache/queue, RQ worker/scheduler, socketio, SFU, recorder, boto3/S3, mail) yok; Kuyruk derinliği/gecikmesi ve bellek eşikleri tanımsız; Liveness/readiness ayrımı yalnız recorder'da var; Frappe tarafı için sözleşme yok; Kesintinin hangi kiracıları etkilediğinin eşlemesi yok

Sonraki adım önerisi: metrics-export--implementation kabulüne bileşen bazlı bir probe tablosu eklensin: bileşen, metrik, eşik, sahip. Recorder'daki /health–/ready ayrımı ve 'indeterminate' sonucu Frappe ile dış servis probe'ları için referans desen olarak yazılsın.

Mevcut birincil görev: `metrics-export--implementation`. Kaynak: `suite/suite/meet/recorder-server/src/app.ts:196`; `suite/suite/meet/recorder-server/src/app.ts:197`; `suite/suite/meet/recording/recorder_client.py:22`; `suite/suite/meet/recording/recorder_client.py:210`.

#### observability-5 — Yanıt süresi, hata oranı, erişilebilirlik ve işlem izleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (headless→API→worker trace, bağımsız uptime probe) yeterince somut. Kaynakta yalnızca Meet recorder hizmetine ait prom-client sayaçları/göstergeleri, /health ve /ready uçları ve bir Grafana panosu görülüyor. Frappe istek gecikmesi, hata oranı ya da dağıtık trace enstrümantasyonu sağlanan alıntılarda görünmüyor. Recorder uçlarının varlığı da çalıştığının kanıtı sayılmaz.

Eksik: Trace yayılım sözleşmesi yok: hangi başlık kullanılacak (ör. W3C traceparent), headless istemciden Frappe /api ve RQ worker'a nasıl taşınacağı tanımsız.; Frappe v17-dev'de istek ve iş kuyruğu enstrümantasyonunun bağlanacağı nokta (hook/middleware) eşlenmemiş. v16 dokümanı (Profiling) bağlayıcı değil.; Recorder dışındaki servisler (Frappe web, worker, sfu-server, collab-server) için RED metrik envanteri ve ortak metrik adlandırması yok.; Bağımsız probe'un yeri, sıklığı ve sahibi tanımsız. Rol yalnızca 'DevOps ekibi' diye geçiyor, Hüseyin Cengiz adıyla atanmamış.

Sonraki adım önerisi: trace-logging--implementation altında tek sayfalık bir sinyal sözleşmesi yazılmalı: yayılım başlığı, zorunlu span'ler (API isteği, RQ işi) ve RED metrik adları. v17 kaynağında istek ve iş kuyruğu hook noktası doğrulanmalı. Recorder'daki prom-client ve /ready deseni referans alınmalı. Probe kurulumu ve kabulü Hüseyin Cengiz'e atanmalı.

Mevcut birincil görev: `trace-logging--implementation`. Kaynak: `suite/suite/meet/recorder-server/src/app.ts:6`; `suite/suite/meet/recorder-server/src/app.ts:196`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:117`; `frappe/frappe/api/v1.py:152`.

#### observability-6 — Kullanıcı/istek/kiracı ilişkilendirme ve hassas veriyi kayıttan çıkarma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Mail modülündeki EventLogger, frappe.logger üzerine bağlam sözlüğü taşıyan yapılandırılmış log üretiyor. Yönetim denetim kaydı da payload'u bilinçli olarak dışarıda bırakıyor. Ancak bu yalnızca mail modülüne özgü. sfu ve recorder logger'ları serbest alan ve hata mesajı yazıyor. Ortak bir request/tenant kimliği ya da redaksiyon filtresi alıntılarda görülmüyor.

Eksik: Yasak alan listesi tanımsız: token, parola, Authorization başlığı ve hangi PII alanları loglanmayacak, nasıl maskelenecek belirtilmemiş.; Keycloak 'sub' ile Frappe kullanıcısı arasındaki eşleme ve loglarda hangi kimliğin yazılacağı tanımsız.; Kiracı kimliği kararı yok: Frappe site adı mı, ayrı bir tenant id mi? Recorder tarafında yalnızca site yapılandırması var.; Bağlamın Python (mail EventLogger) ve TS (sfu/recorder logger) logger'ları arasında nasıl ortak tutulacağına dair sözleşme yok.; Ham error.message log alanlarının hassas veri sızdırmadığına dair kural yok.

Sonraki adım önerisi: trace-logging--implementation kapsamında tek bir log alan sözleşmesi çıkarılmalı: request_id, trace_id, user, tenant(site) alanları ve redaksiyon kara listesi. Mail EventLogger'ın ctx deseni ile log_admin_action'ın 'payload yazma' kuralı genişletilecek referans olarak kullanılmalı. Kabul, tek bir işlemin API ve worker loglarında aynı kimlikle eşleşmesi ve sızıntı taramasıyla yapılmalı (not_run).

Mevcut birincil görev: `trace-logging--implementation`. Kaynak: `suite/suite/mail/utils/logger.py:19`; `suite/suite/mail/utils/logger.py:160`; `suite/suite/mail/utils/logger.py:165`; `suite/suite/meet/sfu-server/src/utils/logger.ts:64`; `suite/suite/meet/recorder-server/src/server.ts:73`.

#### observability-7 — Alarm eşikleri, bildirim rotası ve olay inceleme ekranı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (tek alarm, doğru nöbet rotası, çözüm ve inceleme bağlantısının kaydı) anlamlı ve Frappe Notification'ın yetmediği doğru belirtilmiş. Kaynakta yalnızca recorder panosunda görsel renk eşikleri var. Alarm kuralı, yönlendirme ya da olay kaydı alıntılarda görülmüyor.

Eksik: Somut alarm kuralları ve eşik değerleri tanımsız. Pano eşikleri (70/90) alarm kuralı değildir.; Bildirim rotası, nöbet çizelgesi ve tekilleştirme/gruplama kuralı yok.; Olay inceleme kaydının nerede tutulacağı belirsiz: harici araçta mı, yoksa yetkili bir Frappe DocType'ında mı?; Rol sahipliği tam adlarla atanmamış. Teknik kurulum Hüseyin Cengiz'e ait olmalı.

Sonraki adım önerisi: alert-routing--implementation için ilk aşamada en fazla üç alarm seçilmeli (servis erişilemez, hata oranı eşiği, recorder kapasitesi). Her biri için eşik, rota ve tekilleştirme kuralı yazılmalı. İnceleme kaydının yeri tek kararla sabitlenmeli. Kurulum ve doğrulama Hüseyin Cengiz'e atanmalı.

Mevcut birincil görev: `alert-routing--implementation`. Kaynak: `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:41`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:46`; `suite/suite/meet/recorder-server/src/config.ts:85`.

#### observability-8 — Hizmet seviyesi göstergesi ve hedefi (SLI/SLO); hata bütçesi, tüketim alarmı ve yayın kararları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

SLI hammaddesi olabilecek somut ilkel bileşenler var, ancak SLO yönetimi yok. (1) Suite Meet SFU (prom-client) outcome etiketli sayaçlar ve histogramlar üretiyor: meet_sfu_room_joins_total{scope,rejoin,outcome} ve meet_sfu_room_join_duration_seconds. Bunlar "toplantıya katılma" yolculuğu için iyi olay/toplam olay oranını ve gecikme SLI'sını hesaplamaya elverişli. (2) Recorder sunucusunda recorder_starts_total{outcome,reason} sayacı var. (3) Merkezi bir Prometheus/Loki/Grafana yığını var: Prometheus SFU ve recorder hedeflerini 15 saniyede bir, Bearer token ile kazıyor. Grafana panoları hazır. (4) Frappe upstream'deki frappe/monitor.py, conf.monitor açıksa istek ve iş başına süre ile status_code değerini monitor.json.log dosyasına yazıyor. Bu, HTTP kullanılabilirlik SLI'sı için ham kayıttır, ama metrik ya da SLO değildir. (5) Observability README, SENTRY_RELEASE ile sürüm etiketlemeyi tarif ediyor. Bu yalnız regresyonu sürüme bağlar, yayın kararı vermez. headless_provider (yerel pilot) içinde metrik ya da SLO sözleşmesi yok.

Eksik: SLO tanımı yok: seçilmiş yolculuk, SLI formülü, hedef yüzdesi ve ölçüm penceresi kaynakta tanımlı değil. Tek SLO geçen yer stt-server/load/README.md'deki 'önce SLO üzerinde anlaşın' notu; bu bir uygulama değil.; prometheus.yml'de rule_files, recording rule ya da alerting/Alertmanager yapılandırması yok. Pencerenin yeniden hesaplanması, hızlı/yavaş burn-rate alarmı ve hata bütçesi hesabı yok.; Hata bütçesi politikası ve yayın kararı kaydı yok: bütçe ihlalinde yayını dondurma ya da iyileştirme kararı tutan bir DocType, API, CI geçidi veya kayıt bulunmuyor.; Sözleşmesel SLA'yı SLO'dan ayıran bir model ya da belge yok.; Frappe backend ve headless_provider için Prometheus metrik ihracı yok. frappe/monitor.py yalnız JSON log yazıyor ve conf.monitor ile kapalı başlıyor.; Runtime functionalAcceptance: not_run. Alarmların çalıştığı ya da panoların veri aldığı kaynaktan kanıtlanamaz.

Sonraki somut adım: Önerilen sıra: (1) slo-policy--contract kapsamında tek bir pilot yolculuk seçilir. Öneri: SFU oda katılımı. SLI = sum(rate(meet_sfu_room_joins_total{outcome="success"}[w])) / sum(rate(meet_sfu_room_joins_total[w])). Hedef, pencere (ör. 28 gün) ve iki burn-rate eşiği (hızlı: 1s/5dk, yavaş: 6s/30dk) tek sayfaya yazılır. SLA bu sayfadan ayrı tutulur. (2) slo-policy--implementation: suite/suite/meet/observability/prometheus altına bir recording-rules dosyası ve çok pencereli burn-rate alert kuralları eklenir, prometheus.yml'ye rule_files bağlanır. Mevcut validate-config.sh'ye promtool check rules ve sentetik seriyle promtool test rules (RED→GREEN) adımı eklenir. (3) Alarm teslimi (Alertmanager ya da Grafana alerting) devreye alınır. (4) Bütçe ihlalinde verilen yayın ve iyileştirme kararı için kayıt yeri belirlenir ve CI/CD geçidine bağlanır; teknik kurulum Hüseyin Cengiz'dedir. Frappe/headless_provider HTTP SLI'sı ancak bundan sonra, ayrı bir adım olarak monitor log → metrik dönüşümüyle ele alınır.

Önerilen bağımlılık/sıra: slo-policy--contract; slo-policy--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `slo-policy--implementation`.

Kaynak kanıtı:

- `suite/suite/meet/sfu-server/src/telemetry/Telemetry.ts:40` — `name: 'meet_sfu_room_joins_total',`
- `suite/suite/meet/sfu-server/src/telemetry/Telemetry.ts:42` — `labelNames: ['scope', 'rejoin', 'outcome'] as const,`
- `suite/suite/meet/recorder-server/src/app.ts:169` — `name: 'recorder_starts_total',`
- `suite/suite/meet/observability/prometheus/prometheus.yml:3` — `evaluation_interval: 15s`
- `frappe/frappe/monitor.py:23` — `if frappe.conf.monitor:`
- `frappe/frappe/monitor.py:109` — `self.data.request.status_code = response.status_code`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, tümü); arama `(?i)(\bSLO\b|\bSLI\b|error[_ ]budget|burn[_ -]?rate|service level (objective|indicator))`: Uygulama yok. Yalnızca suite/suite/meet/sfu-server/stt-server/load/README.md:53'te SLO üzerinde anlaşılması gerektiğini söyleyen bir doküman notu ve vendored bir JS dosyasında ilgisiz bir eşleşme var.
- source (frappe + suite, *.py/json/ts/js/yml/yaml/md/vue/alloy); arama `(?i)(error.?budget|burn.?rate|sli_|slo_|objective_target|service.?level)`: Eşleşme yok.
- source (frappe + suite, tümü); arama `(?i)(alertmanager|alerting_rules|PrometheusRule|alert:|for: \d+m|availability_target|uptime_target)`: Yalnız UI ve takvim alert'leri ile güvenlik e-postaları çıktı. Prometheus veya Alertmanager kuralı yok.
- source (frappe + suite, public hariç); arama `(?i)(prom-client|prometheus_client|Histogram\(|new client\.(Counter|Histogram)|_total['"])`: Metrikler yalnız suite/meet/sfu-server/src/telemetry/Telemetry.ts ve suite/meet/recorder-server/src/app.ts içinde (prom-client). Frappe Python tarafında Prometheus ihracı yok.
- suite/suite/meet/observability; arama `(?i)(rule_files|alerting|recording_rules|slo|budget|burn|release|deploy|freeze)`: rule_files, alerting veya budget yok. README'de yalnız Sentry release etiketleme ve deploy talimatları var.
- frappe/frappe/monitor.py; arama `(?i)(def (start|stop|log)\b|monitor_|MONITOR_REDIS_KEY|class Monitor)`: conf.monitor ile açılan istek/iş monitörü bulundu: süre ve status_code değerini Redis'e, oradan monitor.json.log dosyasına yazıyor. SLO veya alarm yok.
- suite/suite/headless_provider; arama `(?i)(metric|telemetry|sentry|slo|latency|availability|health)`: Yalnız api.py'de ilgisiz 'slots' eşleşmesi var. Yerel pilot sağlayıcıda gözlemlenebilirlik veya SLO sözleşmesi yok.

Sınır: Yalnız sourceRoot altındaki frappe ve suite uygulama kaynağı statik olarak okundu. Komut, test veya promtool çalıştırılmadı; functionalAcceptance not_run.; Grafana pano JSON içerikleri (recorder-overview, sfu-overview, stt-delivery) bu turda satır satır okunmadı. Panolar görselleştirmedir; alarm ya da SLO kanıtı sayılmadı.; Dağıtılmış Prometheus/Grafana/Sentry/Frappe Cloud ortamındaki alarm veya SLO ayarları kaynaktan görülemez.; suiteCommit bilinmiyor. ERPNext/HRMS kurulu değil ve değerlendirilmedi.; headless_provider yerel pilot ekleme koddur; upstream-native kaynaktan ayrı tutuldu. Suite'in Vue frontend'i SLO açısından ilgisiz bulundu.

Temporal workflow: `saas-recheck-20261015t073528z-057`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

### Müşteri, kimlik ve erişim

#### tenant-1 — Kiracılık modelleri: single-tenant (tek kiracılı), multi-tenant (çok kiracılı), hybrid (karma).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve sızıntı kabulü tanımlı. Kaynakta site bağlamı (frappe.local.site, site conf, site_cache) var. Bu, site başına kiracılık için bir yapı taşıdır. Tek veritabanında satır kiracılığına ait bir primitive alıntılarda görülmedi. Talimat hangi topolojinin varsayılan olduğunu ve karma modelin neyi neye eşlediğini seçmiyor.

Eksik: Varsayılan model kararı yok: site=kiracı mı, site içinde kurum satırı mı? tenant-2 ile sınır çizilmemiş.; Karma modelde host/site çözümleme ve Keycloak realm/organization eşlemesi tanımsız.; Frappe 17.0.0-dev sürüm eşlemesi yok. Kaynak dokümanlar sürümsüz Frappe URL'leri.; Suite'in site dışında çalışan servisleri (sfu/collab/recorder) kiracılık modeline dahil edilmemiş.

Sonraki adım önerisi: tenant-registry--implementation altında tek bir karar kaydı yaz: varsayılan site=kiracı, satır kiracılığı kapsam dışı ya da ayrı karar. Karma model için site↔Keycloak organization↔harici servis eşleme tablosunu kabul metnine ekle.

Mevcut birincil görev: `tenant-registry--implementation`. Kaynak: `frappe/frappe/website/utils.py:212`; `frappe/frappe/website/page_renderers/base_template_page.py:16`; `suite/pyproject.toml:88`.

#### tenant-2 — Kurum, şirket, şube, ekip ve çalışma alanı hiyerarşisi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı (şube taşıma, çoklu ekip, kurum sınırı). Native has_permission ve permission_query_conditions hook primitive'leri kaynakta var. Kurum–şube–ekip DocType'ları ve üyelik ürünü alıntılarda yok. Frappe'deki 'Workspace' Desk gezinme kavramıdır, SaaS çalışma alanı değildir.

Eksik: Hangi native mekanizmanın kullanılacağı belirtilmemiş: User Permission, has_permission hook ya da permission_query_conditions.; Site içi 'site' genel erişimi ve System Manager bypass'ı kurum sınırını aşabiliyor. Talimat bunu ele almıyor.; Desk Workspace ile ürün 'çalışma alanı' terim çakışması çözülmemiş.; Ağaç modeli kararı (nested set mi, link alanı mı) ve taşıma sırasında izin yeniden hesaplama sözleşmesi yok.

Sonraki adım önerisi: organization-unit--implementation için minimal DocType listesini ve izin stratejisini yaz: native DocPerm + permission_query_conditions; ignore_permissions yardımcısı yok. Suite Drive/Sheets 'site' erişim kapsamının kurum sınırıyla nasıl kısıtlanacağını açık gap olarak kaydet.

Mevcut birincil görev: `organization-unit--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `suite/suite/drive/api/permissions.py:85`; `suite/suite/sheets/permissions.py:22`; `frappe/frappe/website/utils.py:142`.

#### tenant-3 — Kiracı oluşturma, etkinleştirme, kapatma ve güvenli müşteri çıkışı.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe site düzeyinde yaşam döngüsü ilkellerini CLI olarak sağlıyor. (1) `new-site` (frappe/frappe/commands/site.py:74), installer._new_site'ı çağırıyor; site dizini varsa ve --force verilmemişse çıkıyor (installer.py:66-68). Bu, yalnız site adı/dizin varlığına dayalı bir tekrar koruması. Hata durumunda rollback yalnız TTY onayıyla çalışıyor. (2) Askıya alma/kapatma ilkeli: `bench set-maintenance-mode` (commands/scheduler.py:115) site_config'e maintenance_mode yazıyor. app.py:203-207 her istekte SessionStopped fırlatıyor; allow_reads_during_maintenance açıksa salt-okuma moduna geçiyor. Scheduler da maintenance_mode'da durduruluyor (utils/scheduler.py:181). (3) Veri teslimi/yedek: `bench backup`; --with-files, --compress ve yol seçenekleriyle DB, dosya ve config yedeği alıyor (commands/site.py:900-956, utils/backups.py:646). (4) Kalıcı kapatma: `drop-site` (site.py:1141) varsayılan olarak önce yedek alıyor ve yedek başarısızsa duruyor. Ardından DB'yi ve DB kullanıcısını siliyor, site dizinini archived/sites altına taşıyor (site.py:1168-1200). Personal Data Download/Deletion Request kullanıcı düzeyinde; kiracı çıkışı değil. Suite'te tenant/site yaşam döngüsü kodu yok. suite/headless_provider/local_fixture.py LOCAL PILOT ek kodu. Oradaki provision() yalnız suite.localhost'ta Administrator için DocType/rol/kullanıcı fikstürü kuruyor; kiracı oluşturmuyor.

Eksik: Kiracı kayıt DocType'ı/registry ve durum makinesi (provisioning/active/suspended/closing/closed) yok; durum geçişi API'si ve denetim kaydı da yok.; İstemci kaynaklı idempotency anahtarı ve tekrar deneme sözleşmesi yok. Mevcut koruma yalnız site dizini varlığına bakıyor; aynı istek farklı site adıyla tekrarlanırsa ikinci kiracı açılabilir.; Ayrı bir 'aktivasyon' adımı yok. new-site sonunda site doğrudan kullanılabilir oluyor.; maintenance_mode askıya alma amacıyla tasarlanmamış, bakım bayrağı. Tüm istekleri (Administrator dahil) durduruyor. Kiracıya özel askı mesajı, mevcut oturumların sonlandırılması ve API token iptali politikası yok.; Müşteri çıkış akışı yok: veri teslim formatı (yedek dışında taşınabilir export), teslim kabulü kaydı, saklama süresi kararı, saklama süresi dolunca arşivin silinmesi ve silme kanıtı yok. drop-site arşivi süresiz olarak archived/sites'ta bırakıyor.; Bu işlemlerin hepsi bench CLI. Headless provider veya Frappe HTTP API üzerinden kiracı yaşam döngüsü sözleşmesi yok; bench'in kendi kaynağı pakette değil.

Sonraki somut adım: tenant-registry--contract/schema bağımlılıkları sırasıyla: önce tek bir 'Tenant' kayıt şeması tanımla. İçeriği: idempotency_key unique, site_name, status enum ve geçiş tablosu. Ardından ilk dar davranışı uygula: aynı idempotency_key ile ikinci oluşturma isteği mevcut kaydı döndürsün ve yeni site açmasın; bu davranışın RED/GREEN testi yazılsın. Provisioning adımı installer._new_site'ı sarmalasın. Askıya alma ilk sürümde maintenance_mode yerine kiracıya özel bir before_request kontrolü olarak tasarlansın; maintenance_mode'un Administrator dahil tüm istekleri durdurduğu dikkate alınsın. Çıkış (closing→closed) adımı en son eklensin: scheduled_backup çıktısını teslim kaydına bağla, saklama kararını kaydet, sonra _drop_site çağır. Komut eşlemesi bu kaynak commit'inde (adf1fd0c) doğrulandı; bench sarmalayıcısı ayrıca doğrulanmalı.

Önerilen bağımlılık/sıra: tenant-registry--contract; tenant-registry--schema; tenant-registry--implementation; kernel-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tenant-registry--implementation-mvp`.

Kaynak kanıtı:

- `frappe/frappe/installer.py:66` — `if not force and os.path.exists(site):`
- `frappe/frappe/app.py:207` — `raise frappe.SessionStopped("Session Stopped")`
- `frappe/frappe/commands/scheduler.py:124` — `update_site_config("maintenance_mode", 1 if (state == "on") else 0)`
- `frappe/frappe/commands/site.py:1170` — `odb = scheduled_backup(ignore_files=False, ignore_conf=True, force=True, verbose=True)`
- `frappe/frappe/commands/site.py:1191` — `drop_user_and_database(frappe.conf.db_name, frappe.conf.db_user)`
- `suite/suite/headless_provider/local_fixture.py:12` — `if frappe.local.site != "suite.localhost" or doctype != DOCTYPE or frappe.session.user != "Administrator":`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe; arama `def (new_site|drop_site|_new_site|disable_scheduler|set_maintenance_mode|backup)\b`: commands/site.py new_site:74, backup:956, drop_site:1141; installer.py _new_site:42; commands/scheduler.py set_maintenance_mode:115; utils/backups.py backup:818
- suite; arama `(?i)(tenant|provision|suspend|offboard|data_export|retention|idempoten)`: 121 dosya; eşleşmeler Meet/Mail/Sheets alan terimleri (sheets versioning retention, meet SFU provisioning, mail suspend vb.) ve derlenmiş frontend varlıkları. Kiracı yaşam döngüsü yok.
- suite/suite/headless_provider; arama `(?i)(tenant|lifecycle|suspend|provision|offboard|idempot)`: Yalnız local_fixture.py:15 provision(): yerel fikstür, kiracı değil
- frappe/frappe (*.py); arama `(?i)(maintenance_mode|site_suspended|suspended|subscription_expir|expires_on|...)`: maintenance_mode: app.py:203, utils/scheduler.py:181/276, commands/scheduler.py:124. Site askı/abonelik bitişi kavramı yok; expires_on yalnız belge paylaşım anahtarı/web form içindir.
- suite/suite (*.py); arama `(new_site|drop_site|_drop_site|scheduled_backup|maintenance_mode|update_site_config|deactivate|offboard|tenant_id|tenant_status)`: Yalnız mail sieve_script 'deactivate' eşleşmeleri; site/kiracı yaşam döngüsü yok
- frappe/frappe (*.py); arama `(--with-files|--compress|...|def scheduled_backup|def new_backup|class PersonalData(Download|Deletion)Request)`: backup seçenekleri site.py:900/953; backups.py scheduled_backup:646, new_backup:685; kullanıcı düzeyi kişisel veri indirme/silme DocType'ları

Sınır: Yalnız statik kaynak okundu; komut çalıştırılmadı, test yazılmadı veya çalıştırılmadı. functionalAcceptance=not_run.; Bench CLI (frappe-bench paketi) ve Frappe Cloud/Press kaynağı pakette yok; sarmalayıcı davranışı değerlendirilmedi.; ERPNext/HRMS kurulu değil, değerlendirilmedi.; suiteCommit bilinmiyor; suite/headless_provider yerel pilot ek koddur, upstream değildir.; Derlenmiş frontend varlıklarındaki (public/frontend/assets) eşleşmeler ayrıntılı okunmadı; kaynak Vue/TS dosyalarında kiracı terimi bulunmadı.; Kaynak, kodun varlığını kanıtlar; dağıtılmış operasyonu, saklama uyumluluğunu veya silme kanıtının yeterliliğini kanıtlamaz.

Temporal workflow: `saas-recheck-20261015t073528z-004`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### tenant-4 — Kullanıcı daveti, kurum üyeliği, kurum değiştirme ve sahiplik devri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Tek kullanımlık davet ve sahiplik devri kabulü var. Keycloak kaynakta yok. Suite'teki davet yalnızca Drive'a özel (Drive User Invitation), kurum üyeliği değil. Drive'da sahip her deny'ı aşıyor, bu yüzden sahiplik devri dosya erişimini doğrudan etkiliyor ve talimatta yok.

Eksik: Keycloak kullanıcı/organization ↔ Frappe User eşlemesi ve provisioning yönü (JIT mi, SCIM benzeri mi) tanımsız.; Kurum değiştirmede aktif oturum ve cache bağlamının nasıl yenileneceği belirtilmemiş.; Sahiplik devrinin Drive File.owner ve DocShare kayıtlarına etkisi tanımsız.; Drive davetinin kurum davetiyle ilişkisi tanımsız (yeniden kullanım mı, ayrı akış mı).

Sonraki adım önerisi: membership--implementation için Keycloak↔Frappe User eşleme sözleşmesini ve sahiplik devri kapsamını yaz: hangi DocType'larda owner değişir, hangi paylaşımlar korunur. Drive davetini kurum üyeliği yerine geçirme.

Mevcut birincil görev: `membership--implementation`. Kaynak: `suite/suite/drive/api/permissions.py:53`; `suite/suite/hooks.py:127`; `frappe/frappe/permissions.py:7`.

#### tenant-5 — Veri, dosya, önbellek, arama ve görevlerde kiracı izolasyonu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul, kayıt/dosya/cache/arama/job eksenlerini doğru listeliyor. Kaynakta site_cache/redis_cache, has_permission ve enqueue primitive'leri var. Suite framework File iznini tamamen Drive'a devrediyor. Suite ayrıca yerel arama (tantivy), S3 (boto3) ve site dışı servisler kullanıyor. Bunların kiracı izolasyonu talimatta ele alınmamış.

Eksik: ignore_file_permissions=True nedeniyle dosya izolasyonunun Drive mantığına bağlı olduğu belirtilmemiş.; tantivy indeks yolu ve S3 bucket/prefix'in site başına ayrılıp ayrılmadığı tanımsız.; Site dışı collab/sfu servislerinin kiracı doğrulaması yok.; Global (site dışı) cache anahtarı ve job site bağlamı için kontrol listesi yok.; Paylaşılan 1 test dosyası / 3 senaryo bütçesinde hangi çapraz erişim senaryolarının seçileceği belirtilmemiş.

Sonraki adım önerisi: tenant-registry--implementation altında izolasyon envanteri çıkar: DB, Drive File, S3 prefix, tantivy indeks, Redis anahtarı, RQ job ve harici servis için kaynak noktası ve beklenen ret davranışı. Bütçe içindeki 3 senaryoyu bu envanterden seç, test yazma.

Mevcut birincil görev: `tenant-registry--implementation`. Kaynak: `suite/suite/hooks.py:117`; `suite/pyproject.toml:27`; `suite/pyproject.toml:15`; `frappe/frappe/website/website_components/metatags.py:73`; `frappe/frappe/website/website_generator.py:135`.

#### tenant-6 — Kiracı taşıma ve paylaşımlı / ayrılmış kurulum arasında geçiş.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de site düzeyinde taşıma araçları var. `bench backup` komutu (frappe/frappe/commands/site.py:956) scheduled_backup/BackupGenerator ile veritabanını, site_config.json dosyasını ve isteğe bağlı olarak public ve private files dizinlerinin tar arşivini alıyor. DocType için include/exclude, sıkıştırma, şifreleme ve hata durumunda rollback_callback destekleniyor. `restore` komutu (site.py:208) site_restore dosya kilidi altında çalışıyor; SQL'i ve isteğe bağlı public/private tar dosyalarını geri yüklüyor, gerekirse şifreyi çözüyor. `partial-restore` ve `migrate` (SiteMigration) da var. `migrate-to` komutu ise yalnızca Frappe Cloud'a özgü: frappecloud.com'dan uzak bir betik indirip execv ile çalıştırıyor; yerel ve sağlayıcıdan bağımsız bir taşıma değil. Suite tarafında veri siteye göre ayrılıyor. Tantivy arama indeksi sites/<site>/private/files/search-index, LMDB veri deposu private/files/data-store altında; ikisi de private tar'a girdiği için yedeğe dolaylı olarak dahil. Blob deposu bilerek sites/<site>/blob-store altında tutuluyor ve yedek dışında kalıyor; kaynaktaki açıklamaya göre bu bir önbellek ve gerektiğinde yeniden çekiliyor. Drive içerikleri isteğe bağlı olarak Drive Disk Settings'teki S3 bucket'ında tutulabiliyor. Suite'in after_migrate hook'ları mevcut. Yerel pilot headless_provider yalnızca frappe.local.site değerini döndürüyor; taşıma veya yedekleme sözleşmesi içermiyor.

Eksik: Kiracıyı paylaşımlı ve ayrılmış kurulum arasında taşıyan bir orkestrasyon kaynakta yok: kiracı kaydında topoloji alanı, taşıma durum makinesi ve deneme taşıması ile doğrulama adımı bulunmuyor.; Geri dönüş tetik ölçütü, RPO/RTO ve kesinti penceresi kodda tanımlı değil; restore yalnızca elle çalıştırılan bir CLI adımı.; Frappe yedeği S3 bucket nesnelerini ve blob-store'u kapsamıyor; S3 nesnelerini kopyalamak veya bucket'ı yeniden bağlamak için bir mekanizma yok.; Ayrı çalışan Suite servislerinin (sheets collab-server, meet sfu-server, mail) durumunu taşıma sırasına bağlayan bir kod yok.; Hedef ortamda Keycloak/OAuth kimlik eşlemesinin korunduğunu doğrulayan bir kural yok.; Hedefte Tantivy indeksinin tutarlılığını kontrol edecek ya da indeksi yeniden kuracak bir kanca yok (yalnızca şema sürümü değişince yeniden kurulum yapılıyor).; DNS ve host değişikliği ile rol ayrımı kaynakta yok; `bench add-to-hosts` yalnızca yerel /etc/hosts dosyasına yazıyor.; hooks.py'de izinli yollar listesinde `/api/method/create-site-migration` geçiyor ama kurulu kaynakta bu yolu karşılayan bir uygulama bulunamadı.; Headless provider'da taşıma veya topoloji durumunu sunan bir sözleşme yok.

Sonraki somut adım: Mevcut tenant-registry--implementation-scale görevi altında, tenant-registry--contract/schema/implementation ve kernel-envelope--contract bağımlılıkları sağlandıktan sonra şu sırayla ilerle: (1) Taşıma bileşen envanterini sözleşme olarak yaz: DB, site_config, public/private files (search-index ve data-store dahil), S3 bucket öneki, blob-store (yeniden çekilebilir önbellek), harici servisler ve Keycloak istemci/kimlik eşlemesi. (2) Mevcut `bench backup --with-files` ve `bench restore --with-public-files --with-private-files` komutlarını yeniden kullanan, salt okunur bir taşıma öncesi/sonrası doğrulama fonksiyonu yaz: kayıt sayıları, File kayıtlarına karşı S3 anahtar örneklemesi, Tantivy indeksindeki belge sayısı ve kullanıcı↔Keycloak eşlemesi karşılaştırılsın. Bunun için önce başarısız (RED), sonra geçen (GREEN) bir test yaz. (3) Geri dönüş ölçütünü ve RPO/RTO değerlerini bu doğrulamanın çıktısına bağla. DNS kayıt gereksinimini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın; bunu kod dışında bir devir notu olarak tut. `migrate-to` komutunu (Frappe Cloud uzak betiği) kullanma. Yeni altyapı önerilmiyor.

Önerilen bağımlılık/sıra: tenant-registry--contract; tenant-registry--schema; tenant-registry--implementation; kernel-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tenant-registry--implementation-scale`.

Kaynak kanıtı:

- `frappe/frappe/commands/site.py:223` — `"Restore site database from an sql file"`
- `frappe/frappe/utils/backups.py:380` — `for folder in ("public", "private"):`
- `frappe/frappe/integrations/frappe_providers/frappecloud.py:10` — `request_url = f"https://{remote_site}/api/method/press.api.script"`
- `suite/suite/store/__init__.py:29` — `return os.path.join(get_bench_path(), "sites", frappe.local.site, "blob-store")`
- `suite/suite/store/__init__.py:38` — `return os.path.join(get_bench_path(), "sites", frappe.local.site, "private", "files", "search-index")`
- `suite/suite/hooks.py:408` — `"/api/method/create-site-migration",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/commands; arama `def (backup|restore|partial_restore|migrate_to)\b|def _new_site|def migrate_to\(`: site.py içinde restore:208, partial_restore:433, migrate_to:808 ve backup:956 bulundu; implementasyonları okundu.
- suite; arama `(?i)(migrat\w*_tenant|tenant.*(migrat|move|transfer)|dedicated|shared.?(site|bench|tenant)|isolation|backup|restore|s3|tantivy)`: 79 dosya eşleşti: drive S3, store/search_store, mail izolasyonu ve sheets versiyonlama. Hiçbirinde kiracı taşıma orkestrasyonu yok.
- suite/suite/headless_provider; arama `(?i)(tenant|site_name|frappe\.local\.site|backup|restore|migrat)`: Yalnızca site/user/csrf dönen session yanıtı ve yerel fixture kontrolü var; taşıma sözleşmesi yok.
- frappe/frappe/utils/backups.py; arama `(?i)(def (scheduled_backup|new_backup|backup_files|take_dump)|class BackupGenerator|include_files|private_files|site_config_backup)`: BackupGenerator yalnızca public/private files, DB ve site_config yedekliyor.
- suite/suite (store, drive/api/s3.py, drive_disk_settings.json, hooks.py); arama `(?i)(tantivy|index_path|get_site_path|site_path|rebuild|bucket|endpoint_url|aws_key|s3_)`: Tantivy indeksi site bazında tutuluyor ve şema sürümü değişince yeniden kuruluyor; S3 bucket/endpoint ayarları Drive Disk Settings'te.
- .; arama `(?i)(before_backup|after_backup|before_restore|after_restore|before_migrate|after_migrate|on_backup|backup_hook)`: Yalnızca before/after_migrate hook'ları var; backup/restore hook'u iki uygulamada da yok.
- suite/suite/store; arama `(?i)(get_site_path|get_bench_path|def _namespace|path =|namespace_dir|SEARCH_ROOT|indexes)`: data-store ve search-index private/files altında, blob-store ise private dışında.
- suite/suite/hooks.py; arama `(?i)(tenant|migrat|dedicated|shared|keycloak|social_login|backup|restore|export_site|import_site|dns|host_name)`: Yalnızca after_migrate ve izinli yollar listesindeki create-site-migration girdisi bulundu.
- .; arama `(?i)(tenant.?(migrat|move|transfer|registry)|dedicated.?(site|bench|server)|switch.?topolog|move.?site|site.?migration)`: Yalnızca SiteMigration (şema migrate) ve hooks.py'deki allowlist girdisi bulundu; topoloji geçişi implementasyonu yok.

Sınır: Değerlendirme yalnızca kaynak koda dayanıyor; hiçbir komut veya test çalıştırılmadı. functionalAcceptance: not_run.; Bench CLI (bench uygulaması) sourceRoot içinde olmadığı için bench düzeyindeki new-site/setup multitenancy ve DNS davranışı değerlendirilmedi.; Keycloak sunucusu, S3 sağlayıcısı ve harici servislerin çalışma zamanı durumu kaynaktan doğrulanamaz.; suiteCommit bilinmiyor; headless_provider yerel pilot kodu, upstream değil.; Suite frontend ve realtime servislerinin node kaynakları (collab-server, sfu-server) taşıma açısından ayrıntılı okunmadı.; Ürün DONE veya yüzde iddiası yok.

Temporal workflow: `saas-recheck-20261015t073528z-005`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### tenant-7 — Kiracı klonlama; yapılandırma ve şablon verisini seçerek yeni kiracı oluşturma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Koşullu kapsam ve kabul iyi: kişisel veri, oturum, anahtar ve canlı entegrasyon aktarılmıyor, kaynak değişmiyor. Kaynakta yalnızca belge düzeyinde copy_doc var. no_copy ve özel alanları ayıklıyor ama site/kiracı klonlama değil. Restore kaynağı pakette yok.

Eksik: Klonlanacak yapılandırma/şablon DocType izin listesi (allowlist) tanımsız.; Gizli değer ve kişisel veri ayıklama listesi yok (site conf, OAuth/API kayıtları, User, DocShare).; tenant-3 oluşturma akışıyla ilişkisi tanımsız (klon = oluştur + seçmeli içe aktarma mı?).; Yetki modeli yok: kaynak kiracıda kim okuyabilir, hedefte kim oluşturabilir.

Sonraki adım önerisi: tenant-registry--implementation-post-mvp için klonu 'tenant-3 ile oluştur + allowlist'teki şablon DocType'larını native izinlerle kopyala' olarak tanımla. Varsayılan olarak reddedilen DocType/alan listesini kabul metnine ekle.

Mevcut birincil görev: `tenant-registry--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v2.py:218`; `frappe/frappe/api/v2.py:220`.

#### identity-1 — Authentication (kimlik doğrulama), üyelik ve e-posta doğrulama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütleri (issuer/audience/süre reddi, doğrulanmamış hesap politikası) belli. Ancak Keycloak subject'inin Frappe User'a hangi native mekanizmayla bağlanacağı tanımlanmamış. Yerel kaynakta Social Login Key (Custom sağlayıcı), OAuth state ve tek sağlayıcıya özgü JWT audience doğrulaması var. Genel bir Keycloak issuer/JWKS bearer doğrulaması excerpt'te görülmüyor. Doğrulanmamış e-posta için mevcut kayıtlarda güven bayrağı patch ile 1'e çekiliyor.

Eksik: Bağlama yolu seçilmemiş: Social Login Key Custom/redirect+sid mi, yoksa headless SPA/Tauri/WXT için PKCE + Frappe'de bearer doğrulaması mı?; trust_email_without_verified_claim varsayılanı (backfill ile 1) ile 'doğrulanmamış hesap reddi' kabulü çelişiyor; ayar kararı yazılmamış.; Frappe yerel kayıt/parola yolunun (disable_signup, disable_user_pass_login) Keycloak ile paralel kalıp kalmayacağı belirtilmemiş.; Suite on_login hook'unun Keycloak üzerinden açılan oturumda da tetiklenmesi gerektiği belirtilmemiş.; Keycloak hedef sürümü sabitlenmemiş (identity-5 ile ortak).

Sonraki adım önerisi: keycloak-login--implementation-mvp görevine kısa bir sözleşme ekle: tek bağlama yolu (Social Login Key Custom ya da bearer doğrulama), subject→User eşleme alanı, email_verified politikası (trust bayrağı 0), Frappe signup/parola kapatma kararı ve on_login uyumu. Kabul çalıştırılmadı (not_run).

Mevcut birincil görev: `keycloak-login--implementation-mvp`. Kaynak: `frappe/frappe/www/login.py:80`; `frappe/frappe/utils/oauth.py:48`; `frappe/frappe/patches/v16_0/backfill_social_login_key_trust_flags.py:10`; `frappe/frappe/www/login.py:45`; `suite/suite/hooks.py:284`.

#### identity-2 — Parolalı giriş, parola kurtarma ve magic link (tek kullanımlık giriş bağlantısı).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Sahiplik Keycloak'ta ve magic link 'verify' olarak işaretlenmiş. Ancak yerel Frappe'de bunlara paralel native yollar var: e-posta bağlantısıyla giriş, reset_password ve süre ayarı. Talimat bunların kapatılmasını ya da yeniden kullanılmasını belirtmiyor. Suite, update_password'u mail için override ediyor ve WebDAV parola yolu Frappe parolasına bağlı. Keycloak tarafında yapılan parola değişikliği bu bağımlılıkları kırar.

Eksik: Magic link sahibi belirsiz: Keycloak eklentisi mi, Frappe send_login_link mi? Frappe login_via_token'ın tek kullanımlık olduğu excerpt'ten doğrulanamıyor.; Keycloak parola değişince suite.mail.events.update_password tetiklenmez; mail tarafı senkronunun sözleşmesi yok.; disable_user_pass_login açılırsa WebDAV parola girişi devre dışı kalır; WebDAV için API key yolunun kalıp kalmayacağı kararı yok.; Parola sıfırlama sonrası Frappe sid ve bearer iptal süresi tanımlanmamış (identity-4'e bağlı).

Sonraki adım önerisi: keycloak-login--implementation-mvp içinde iki karar yaz: (1) Frappe parola, reset ve email-link akışları kapatılsın mı, (2) magic link Keycloak'ta mı yapılacak, yoksa kapsam dışı mı. Suite mail update_password ve WebDAV bağımlılığını açık bağımlılık olarak kaydet.

Mevcut birincil görev: `keycloak-login--implementation-mvp`. Kaynak: `frappe/frappe/www/login.py:137`; `frappe/frappe/www/login.py:118`; `frappe/frappe/templates/includes/login/login.js:62`; `suite/suite/hooks.py:203`; `suite/suite/drive/webdav/auth.py:67`.

#### identity-3 — OTP (One-Time Password — tek kullanımlık parola) ile doğrulama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam koşullu ve TOTP/HOTP Keycloak'a verilmiş; kabul ölçütleri anlamlı. Yerel Frappe'de pyotp tabanlı ayrı bir 2FA var (TOTP, HOTP, SMS, Email). Talimat bu 2FA'nın Keycloak OTP ile birlikte mi çalışacağını, kapatılacak mı olduğunu belirtmiyor. Bu belirsizlik çift istem ya da baypas riski taşıyor. Excerpt'te TOTP kodunun pencere içinde yeniden kullanımını engelleyen bir kayıt görülmüyor; yalnız HOTP token'ı siliniyor.

Eksik: Frappe enable_two_factor_auth ve rol bazlı 2FA'nın Keycloak OTP varken nasıl ayarlanacağı yazılmamış.; SMS/e-posta OTP gerekiyorsa sağlayıcı ve kanal kararı yok (Frappe'nin SMS/Email yöntemi bunun kanıtı sayılmaz).; WebDAV, 2FA'lı kullanıcıyı parola yolunda engelliyor; Keycloak OTP politikasının WebDAV ve API key yollarına etkisi tanımlanmamış.; Saat kayması toleransı ve kurtarma akışı için ölçülebilir değer yok.

Sonraki adım önerisi: keycloak-session--implementation-post-mvp (post-MVP) için ön koşul notu ekle: OTP yalnız Keycloak'ta olsun ve Frappe 2FA kapatılsın, ya da gerekçesiyle korunsun. Saat kayması penceresini ve kurtarma akışını sayısal olarak yaz.

Mevcut birincil görev: `keycloak-session--implementation-post-mvp`. Kaynak: `frappe/frappe/twofactor.py:176`; `frappe/frappe/twofactor.py:168`; `frappe/frappe/twofactor.py:192`; `suite/suite/drive/webdav/auth.py:137`.

#### identity-4 — Oturum ve cihaz listesi; süre aşımı ve tüm oturumları sonlandırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü 'belirlenen süre' diyor ama süre sayısal değil. Keycloak tüm oturumları kapattığında Frappe tarafındaki türev kimlikleri kimin iptal edeceği tanımlanmamış: sid oturumu, OAuth bearer, WebDAV kimlik önbelleği, Meet SFU JWT'si ve realtime soketleri. Yerel kaynakta logout, bağlantı anında web sürecine sorulan realtime auth, 600 sn'lik WebDAV önbelleği ve süre dolunca kesilen Meet JWT'si var. Ancak Keycloak back-channel logout'a bağlanan bir yol görülmüyor.

Eksik: Keycloak back-channel/front-channel logout'tan Frappe sid ve bearer iptaline giden sözleşme yok.; Kabul için azami gecikme yazılmamış; WebDAV CRED_CACHE_TTL=600 ve Meet token ömrü bu süreyi aşabilir.; Realtime auth bağlantı anında yapılıyor; açık soketlerin iptalden sonra kesilip kesilmediği excerpt'ten bilinmiyor.; Headless cihaz listesinin kaynağı (Keycloak Account API mı, backend proxy mi) ve yetki sınırı tanımsız.

Sonraki adım önerisi: keycloak-session--implementation görevine sayısal bir iptal SLA'sı ve envanter ekle: sid, OAuth bearer, API key ve WebDAV, Meet JWT, realtime soketi. Her biri için iptal yolunu ya da 'süre dolumuna kadar kabul' kararını yaz. Cihaz listesi sahibini seç.

Mevcut birincil görev: `keycloak-session--implementation`. Kaynak: `frappe/frappe/api/v2.py:80`; `frappe/frappe/realtime/auth.py:111`; `suite/suite/drive/webdav/auth.py:28`; `suite/suite/meet/sfu-server/src/server/AuthManager.ts:7`.

#### identity-5 — MFA (Multi-Factor Authentication — çok faktörlü kimlik doğrulama) ve kurtarma kodları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: ikinci faktör zorunlu, kurtarma kodu tek kullanımlık, yenilemede eskiler geçersiz. Ancak recovery codes için gereken 26.3.0+ sürümüne rağmen hedef Keycloak sürümü seçilmemiş. Daha önemlisi yerel kaynak, API key:secret kimlik bilgisini 'kendi başına faktör' sayıyor ve WebDAV'da 2FA'lı hesaplar için bile kabul ediyor. Bu durum 'MFA zorunlu' politikasını etkisiz bırakabilir; talimatta etkileşimsiz kimlik bilgisi politikası yok. Frappe 2FA ve rol bayrağı mevcut; recovery code kaynağı excerpt'te görülmüyor (unknown).

Eksik: Keycloak hedef sürümü (≥26.3.0) sabitlenmemiş.; API key/secret (WebDAV, REST token) için MFA istisnası kabul mü, yasak mı? Karar yok.; MFA zorunluluğunun Keycloak'ta mı yoksa Frappe rol 2FA'sında mı yürütüleceği belirsiz; çift uygulama riski var.; WebAuthn/passkey ve OTP arasındaki seçim identity-3'ün koşullu kapsamıyla eşlenmemiş.

Sonraki adım önerisi: keycloak-login--implementation-mvp için Keycloak sürümünü ≥26.3.0 olarak sabitle. API key ve WebDAV kimlik bilgilerinin MFA istisnası olup olmadığını açık bir karar olarak yaz. Frappe rol 2FA'sının kapatılacağını ya da korunacağını belirt.

Mevcut birincil görev: `keycloak-login--implementation-mvp`. Kaynak: `suite/suite/drive/webdav/auth.py:6`; `suite/suite/drive/webdav/auth.py:56`; `frappe/frappe/twofactor.py:40`.

#### identity-6 — Passkey (cihaza bağlı giriş anahtarı) ve sosyal hesapla giriş.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni (passkey kayıt/giriş, kontrolsüz hesap birleştirme yok) tanımlı; sahiplik Keycloak. Yerel Frappe'de yalnız Social Login Key tabanlı sosyal giriş ilkelleri görülüyor. Passkey/WebAuthn kaynağı excerpt'lerde yok. v16 backfill yaması mevcut anahtarlarda doğrulanmamış e-postaya güveni 1 yapıyor; bu, talimatın yasakladığı otomatik birleştirme riskini Frappe tarafında da açık bırakıyor.

Eksik: Keycloak 26.7'de passkey özelliğinin etkinlik durumu ve RP ID/origin değerleri sürümle eşlenmemiş; First-broker-login/hesap bağlama politikası (doğrulanmış e-posta şartı) yazılmamış; Frappe yerel Social Login Key yolunun Keycloak brokering ile paralel kalıp kalmayacağı tanımsız; Keycloak kimliğinin Frappe User / User Social Login eşleme sözleşmesi yok

Sonraki adım önerisi: keycloak-login--implementation-post-mvp kaydına şunları ekle: hedef Keycloak sürümü + passkey feature durumu, RP ID, first-broker-login kuralı (yalnız doğrulanmış e-postayla bağlama) ve 'Frappe Social Login Key devre dışı/Keycloak tek sağlayıcı' kararı. Kabul not_run kalır.

Mevcut birincil görev: `keycloak-login--implementation-post-mvp`. Kaynak: `frappe/frappe/www/login.py:66`; `frappe/frappe/patches/v16_0/backfill_social_login_key_trust_flags.py:10`; `frappe/frappe/patches/v10_0/refactor_social_login_keys.py:119`.

#### identity-7 — SSO (Single Sign-On — tek oturum açma) ve kurumsal kimlik sağlayıcısı bağlantıları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

OIDC/SAML brokering Keycloak'a verilmiş; kabul metni (uçtan uca SSO+logout, yabancı kurum claim'inin reddi) anlamlı. Yerel kaynakta kiracı claim'i reddetme deseni yalnız Office 365 için var (tid kontrolü). Frappe logout yalnız yerel oturumu kapatıyor; Keycloak back-channel logout bağlantısı görünmüyor. Claim → Frappe rol/üyelik eşleme kodu excerpt'lerde yok.

Eksik: Claim → Frappe User/Role/User Permission eşleme sözleşmesi (alan adları, kaynak claim, çakışma kuralı) yazılmamış; Frappe'nin Keycloak token/oturumunu nasıl doğrulayacağı (Social Login Key 'Custom' OIDC mi, API bearer doğrulama hook'u mu) seçilmemiş; Back-channel/front-channel logout'un Frappe sid ve realtime oturumlarına yayılması tanımsız; Kurum/tenant izolasyonu için Keycloak Organizations ↔ Frappe kapsam eşlemesi yok

Sonraki adım önerisi: keycloak-federation--implementation için tek sayfalık entegrasyon kararı yaz: doğrulama yolu, claim eşleme tablosu, logout yayılımı. Yeni kayıt açma; ui-family-03 desteği aynı kalsın.

Mevcut birincil görev: `keycloak-federation--implementation`. Kaynak: `frappe/frappe/utils/oauth.py:75`; `frappe/frappe/api/v2.py:80`; `frappe/frappe/utils/oauth.py:154`.

#### identity-8 — SCIM (System for Cross-domain Identity Management — sistemler arası kimlik yönetimi) ile kullanıcı eşitleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kalem doğru biçimde 'verify' durumunda; hedef sürüm ve PoC şartı belirtilmiş. Frappe'de User.enabled ve DocType izin ilkelleri mevcut; SCIM uç noktası veya eşitleme adaptörü excerpt'lerde görülmüyor (bu, global yokluk kanıtı değildir). Veri akış yönü ve eşleme sözleşmesi tanımlanmamış.

Eksik: Akış yönü belirsiz: Keycloak SCIM sunucusu mu, Frappe'ye push mu, Frappe pull mu; SCIM Users/Groups → Frappe User.enabled, Has Role, User Permission eşleme tablosu yok; Devre dışı bırakmada aktif Frappe oturum/API anahtarı iptali tanımlanmamış; Hedef Keycloak release'inde SCIM'in preview/supported durumu kaydedilmemiş

Sonraki adım önerisi: keycloak-scim--implementation'ı PoC kapısına bağla: önce sürüm/feature durumu ve akış yönü kararı, ardından devre dışı bırakma → Frappe enabled=0 + oturum iptali için tek eşleme sözleşmesi. Koşullu kapsam korunur.

Mevcut birincil görev: `keycloak-scim--implementation`. Kaynak: `suite/suite/drive/webdav/auth.py:90`; `frappe/frappe/permissions.py:82`.

#### identity-9 — Keycloak kimliğiyle süreli çevrimdışı yetkilendirme ve yerel kilit açma; public client/PKCE ve güvenli saklama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat ayrıntılı: public client + PKCE, client secret gömmeme, offline_access sınırı, saat geri alma, yeniden bağlanmada izin doğrulaması. Ancak not hâlâ Capacitor adapter'ından söz ederken scopeDecision Tauri 2 diyor; tutarsızlık var. Yerel Frappe'de sunucu tarafı yeniden doğrulama ilkelleri (check_permission, alan düzeyi okuma) var. Frappe'nin kendi OAuth sağlayıcısında PKCE desteği var, fakat seçilen IdP Keycloak olduğu için bu yol hedef değil; karıştırılmamalı.

Eksik: Azami çevrimdışı süre ve risk politikası için somut değer/sahip yok; Frappe'nin Keycloak access token'ını doğrulama yolu tanımsız; yerel Frappe yalnız kendi OAuth Bearer Token hash'lerini tanıyor; Kuyruk gönderiminde idempotency anahtarı ve çakışma/yeniden deneme sözleşmesi yok; Assessment notundaki Capacitor atfı Tauri 2 kararıyla güncellenmemiş; Tauri 2 güvenli depolama adaptörünün (Keychain/Keystore) seçimi belirtilmemiş

Sonraki adım önerisi: device-grant--implementation notunu Tauri 2'ye hizala; azami offline süre, Keycloak token doğrulama yolu ve kuyruk idempotency alanını tek karar kaydında tanımla. Frappe OAuth sağlayıcısını alternatif IdP olarak kullanma.

Mevcut birincil görev: `device-grant--implementation`. Kaynak: `frappe/frappe/api/v1.py:83`; `frappe/frappe/oauth.py:33`; `frappe/frappe/oauth.py:13`.

#### identity-10 — Keycloak giriş sunumu sözleşmesi: markalı tema ile tamamen bağımsız headless login ayrımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Sınırlar net: tema (Keycloakify) ile bağımsız kimlik UI ayrımı, ROPC yok, embedded WebView yok, client secret yok. Eksik olan, Frappe'nin kendi parola giriş yüzeyi. Bu yüzey /api/method/login'e parola gönderiyor ve suite izinli yollarında açık. Talimat bu yerel yolun kapatılmasını veya Keycloak'a yönlendirilmesini tanımlamıyor. disable_user_pass_login ayarı kaynakta mevcut.

Eksik: Frappe /login ve /api/method/login parola yolunun kapatılması/yönlendirilmesi kararı yok (paralel ikinci giriş riski); Tema mı bağımsız UI mı kararı henüz verilmemiş; karar kaydının sahibi ve konumu belirsiz; Keycloakify sürümü ile hedef Keycloak 26.x tema uyumluluğu eşlenmemiş; Frappe yerel 2FA/OTP akışının Keycloak MFA ile çakışma politikası yok

Sonraki adım önerisi: keycloak-login--implementation'a tek karar kaydı ekle: (1) tema ya da bağımsız UI seçimi, (2) Frappe disable_user_pass_login ve /login yönlendirme politikası, (3) Keycloakify↔Keycloak sürüm eşlemesi. identity-9 ile ortak PKCE testi not_run kalır.

Mevcut birincil görev: `keycloak-login--implementation`. Kaynak: `frappe/frappe/www/login.py:47`; `frappe/frappe/templates/includes/login/login.js:31`; `suite/suite/hooks.py:421`; `frappe/frappe/twofactor.py:194`.

#### access-1 — Authorization (yetkilendirme): kullanıcı, rol ve işlem yetkileri.

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Yerel Frappe 17.0.0.dev0 kaynağında rol tabanlı DocType hakları (std_rights) ve has_permission/get_role_permissions bulunuyor. Bu, kaynakta görülen bir yetenek; çalıştırılarak doğrulanmış bir davranış değil. v2 execute_doc_method HTTP metodunu bir izin türüne eşleyip kontrol ediyor. Talimatta hedef ve olumlu/olumsuz CRUD kabul ölçütü var. Ancak Keycloak→Frappe rol eşleme sözleşmesi, hangi API yüzeyinin (v1/v2/method) kabulün kapsamında olduğu ve Suite rollerinin (Suite User/Suite Admin) rol matrisindeki yeri tanımlanmamış. Desk dışı UI izin bileşeni kendisini 'display-only' olarak tanımlıyor; bu da React/AntD tarafının yetki kaynağı olamayacağını doğruluyor.

Eksik: Keycloak claim/grup → Frappe Role eşleme sözleşmesi ve senkron zamanı (girişte, provisioning'de) tanımsız; yerel kaynakta yalnızca genel Social Login Key OAuth akışı görülüyor.; Kabulün hangi uçlar için geçerli olduğu belirtilmemiş (/api/v1/resource, /api/v2/document, /api/method).; Administrator'ın her kontrolü atlaması ve System Manager ayrıcalığı rol matrisinde açıkça ele alınmamış.; Suite migration patch'leri rolleri doğrudan Has Role bulk insert ile atıyor; rol atama denetim izine ilişkin bir talimat yok.

Sonraki adım önerisi: native-user-policy--implementation altında tek bir rol matrisi tanımlanmalı (Keycloak grup/claim → Frappe Role, Suite User/Suite Admin dahil; DocType × read/write/create/delete). Kabul /api/v2/document uçlarına bağlanmalı. React tarafındaki izin verisi yalnızca sunum amaçlı kullanılmalı.

Mevcut birincil görev: `native-user-policy--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/permissions.py:168`; `frappe/frappe/permissions.py:109`; `frappe/frappe/api/v2.py:267`; `frappe/ui/src/composables/useDocPermissions.ts:23`; `frappe/frappe/utils/oauth.py:107`; `suite/suite/drive/patches/switch_drive_roles_to_suite_roles.py:8`.

#### access-2 — Kayıt, alan, sahiplik ve organizasyon kapsamına göre erişim.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta şu ilkel yapılar bulunuyor: alan düzeyi okuma filtresi (apply_fieldlevel_read_permissions), izinli liste sorgusu (ignore_permissions=False), controller get_list kancası, link genişletmede read kontrolü, if_owner ve permission_query_conditions/has_permission hook çifti. Suite, Sheets ve Drive için bu deseni uyguluyor. Ancak ürünün kurum/şube kapsamı için bir model yok; ERPNext kurulu olmadığından Company tabanlı kapsam kullanılamaz. Kabul ölçütü anlamlı (liste, tek kayıt ve ilişki seçeneği) fakat kapsam modeli ve tenant tanımı (site başına tenant mı, aynı site içinde kurum mu) eksik.

Eksik: Kurum/şube kapsamının nasıl modelleneceği (özel Organization DocType + User Permission ya da hook çifti) ve site/tenant ilişkisi tanımsız.; İlişki seçenekleri için link search (search_widget) yolunun izin davranışı incelenen kesitte görülmüyor; kabulde açıkça istenmiş ama doğrulama hedefi belirtilmemiş.; v1 document_list 'expand' ve attach_expanded_links yolunun alan ve kayıt filtresi kesitte doğrulanamadı.; UI izin bileşeni rol/meta yüklenene kadar 'write' döndürüyor (fail-open). Headless istemci için bunun sunum dışında kullanılmayacağı talimatta yazmıyor.

Sonraki adım önerisi: native-role-scope--implementation için önce tenant/kurum kararı yazılmalı: site-per-tenant mı, site içi kurum mu. Ardından Suite'teki permission_query_conditions + has_permission çift deseni kurum alanına uygulanmalı. Kabul /api/v2 liste, okuma ve link search yollarına bağlanmalı.

Mevcut birincil görev: `native-role-scope--implementation`. Kaynak: `frappe/frappe/api/v2.py:87`; `frappe/frappe/api/v2.py:164`; `frappe/frappe/api/v2.py:169`; `frappe/frappe/api/v1.py:104`; `suite/suite/hooks.py:122`; `suite/suite/sheets/permissions.py:49`; `suite/suite/mail/patches/create_suite_user_role.py:7`; `frappe/ui/src/composables/useDocPermissions.ts:51`.

#### access-3 — Her sunucu işleminde yetki denetimi ve varsayılan erişim reddi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Standart v2 uçları whitelist ve HTTP metodu→izin türü eşlemesiyle kontrol ediliyor. Realtime katmanı izin kontrolünü web sürecine devrediyor. Recorder callback'leri aud/iss/jti ve replay korumalı JWT kullanıyor. Buna karşılık Suite'te allow_guest whitelist uçları, frappe.get_all ile izinsiz okuma, ignore_permissions kullanan iç yazıcılar, ignore_file_permissions=True ve override_whitelisted_methods bulunuyor. Varsayılan red, her özel uçta ayrı ayrı doğrulanmadıkça kanıtlanamaz. Kabul ölçütü güçlü ('yan etkisiz red'), ancak özel RPC/job envanteri, ignore_permissions/get_all kullanım kuralı ve tenant kontrolünün nasıl yapılacağı talimatta yok.

Eksik: Özel @frappe.whitelist (özellikle allow_guest=True) uçlarının, override_whitelisted_methods girdilerinin, website_redirects'in ve arka plan işlerinin bir envanteri yok.; get_all/ignore_permissions yalnızca hangi koşulda (açık izin kontrolünden sonra) kullanılabilir; yazılı bir kural yok.; Document insert/save/delete'in iç izin kontrolü bu kesitte görünmüyor; v1 create/update/delete yolları için güvence 'unknown' kalmalı.; Job/enqueue yollarında hangi kullanıcı bağlamıyla çalışıldığı ve tenant/site bağlamı tanımsız.

Sonraki adım önerisi: native-user-policy--implementation altında, hooks.py override_whitelisted_methods ve allow_guest uçlarından başlayan salt-okunur bir uç envanteri çıkarılmalı. Her uç için kimlik/tenant/işlem kontrolü sınıflanmalı. Paylaşılan test bütçesinden en fazla bir senaryo, özel bir uçta yetkisiz isteğin yan etki üretmediğini kanıtlamaya ayrılmalı.

Mevcut birincil görev: `native-user-policy--implementation`. Kaynak: `frappe/frappe/api/v2.py:24`; `frappe/frappe/api/v2.py:259`; `suite/suite/drive/api/permissions.py:36`; `suite/suite/drive/api/permissions.py:116`; `suite/suite/sheets/permissions.py:74`; `suite/suite/hooks.py:117`; `suite/suite/hooks.py:202`; `suite/suite/meet/recording/callback_auth.py:399`; `frappe/frappe/realtime/auth.py:88`.

#### access-4 — Impersonation (destek amacıyla kullanıcı adına geçici erişim).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Yerel kaynakta upstream Frappe'nin kendi impersonation özelliği var; önceki 'unknown' değerlendirmesi bununla düzeltildi. Kodda bulunanlar: (1) frappe.core.doctype.user.user.impersonate(user, reason) adlı, yalnız POST kabul eden whitelisted metot. Çağıranın User üzerinde 'impersonate' izin türüne sahip olması gerekiyor; bu tür user_impersonate Permission Type JSON'unda tanımlı. (2) Metot bir Activity Log kaydı (operation=Impersonate, user=hedef, subject metninde impersonator) oluşturuyor, hedef kullanıcıya gerekçeyle birlikte Notification Log gönderiyor ve varsayılan giden e-posta hesabı varsa güvenlik uyarısı e-postası atıyor. (3) LoginManager.impersonate, login_as ile hedef kullanıcıya yeni bir oturum açıyor. Bu oturum önceki oturumun session_end ve audit_user değerlerini devralıyor; set_impersonated ile impersonated_by oturum verisine yazılıp kaydediliyor. (4) Version.set_impersonator, belge değişikliği diff/insert verisine impersonated_by ve audit_user ekliyor; form zaman çizelgesinde 'Impersonated by' gösteriliyor. (5) Boot bilgisi impersonated_by alanını taşıyor; Desk'te impersonation banner'ı ve toolbar/form kısıtlaması var. (6) User.js'teki Impersonate düğmesi gerekçeyi zorunlu tutuyor ve restrict_ip olan kullanıcıda işlemi engelliyor; ancak bu kontrol yalnız istemci tarafında. Suite'te (Drive/Mail/Meet/WebDAV) ve yerel pilot olan suite/headless_provider içinde impersonation'a özgü kod yok; headless_provider yalnız frappe.session.user kullanıyor.

Eksik: Hedef kullanıcı koruması sunucu tarafında yok: impersonate() yalnız genel User 'impersonate' izin türünü kontrol ediyor. Administrator/System Manager gibi korunan rolleri ve restrict_ip olan hedefleri sunucuda reddetmiyor; IP kontrolü yalnız user.js'te.; Ayrı süre sınırı, onaylayan kişi, bekleyen talep ve iptal (revocation) kaydı yok. Oturum süresi yalnız impersonator oturumunun session_end değerinden devralınıyor; gerekçe yalnız bildirim metninde duruyor, yapılandırılmış alan olarak saklanmıyor.; Asıl ve temsil edilen kimliğin ayrımı yalnız Version diff'lerinde ve Activity Log subject metninde var. Her işlem için yapılandırılmış actor/subject alanları yok: Access Log, Comment, Error Log, RPC/whitelist çağrıları, realtime olayları, Suite'in kendi aktivite kayıtları ve headless_provider yanıtları impersonated_by bilgisini taşımıyor.; Keycloak impersonation veya token-exchange claim'ini (ör. act/impersonator) Frappe oturumundaki impersonated_by alanına bağlayan kod yok; Frappe tarafındaki OAuth/Social Login akışı tek kimlik üretiyor.; Alternatif giriş yolları için politika yok: API key/token, WebDAV Basic Auth ve Meet SFU JWT yollarında impersonation oturumunu engelleyen ya da izleyen bir mekanizma yok; bu yollar tek bir kullanıcı kimliği döndürüyor.; Headless provider kontratında (React/AntDesign istemcisi için) impersonated_by ve actor/subject alanlarını dışa veren bir alan yok; impersonation banner'ı yalnız Frappe Desk'te var, Suite'in Vue frontend'inde yok.

Sonraki somut adım: Yeni bir mekanizma kurmadan Frappe-native impersonate akışı yeniden kullanılmalı (R-00). Önerilen sıra: 1) support-grant--contract: Destek İzni kaydının alanları tanımlanır (talep eden, hedef, gerekçe, başlangıç/bitiş, onaylayan, durum). Korunan roller (Administrator, System Manager) ve log biçimi (actor = impersonated_by, subject = session.user) yazılır. Keycloak claim'i ancak sonradan bu alana eşlenmelidir. 2) support-grant--schema: Bu alanlarla bir DocType eklenir. 3) support-grant--implementation: Tek ve dar bir davranışla başlanır. Sunucu tarafındaki bir before-guard ya da wrapper, geçerli ve onaylı bir grant yoksa veya hedef korunan role sahipse ya da restrict_ip içeriyorsa impersonate çağrısını reddeder. Önce başarısız (RED) test, sonra geçen (GREEN) test kanıtı üretilir. Ardından grant bitişi oturum session_end değerine bağlanır. Son olarak headless_provider yanıtına salt okunur actor/subject alanları eklenir.

Önerilen bağımlılık/sıra: support-grant--contract; support-grant--schema; kernel-envelope--contract; tenant-registry--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `support-grant--implementation`.

Kaynak kanıtı:

- `frappe/frappe/core/doctype/user/user.py:1581` — `frappe.has_permission("User", "impersonate", throw=True)`
- `frappe/frappe/core/doctype/user/user.py:1590` — `"operation": "Impersonate",`
- `frappe/frappe/auth.py:376` — `self.login_as(user, session_end=session_data.session_end, audit_user=session_data.audit_user)`
- `frappe/frappe/sessions.py:495` — `self.data.data.impersonated_by = original_user`
- `frappe/frappe/core/doctype/version/version.py:44` — `data["impersonated_by"] = impersonator`
- `frappe/frappe/core/doctype/user/user.js:401` — `if (frm.doc.restrict_ip) {`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, locale hariç); arama `(?i)impersonat`: Eşleşmelerin tamamı frappe içinde: user.py, auth.py, sessions.py, version.py, activity_log, permission_type/user_impersonate, user.js, site_banners.js, version_timeline, layout.js, toolbar.js ve testler. Suite içinde eşleşme yok.
- suite; arama `(?i)(login.?as|act.?on.?behalf|sudo|switch.?user|support.?grant|support.?session|run.?as)`: İlgili davranış yok. drive_user_invitation.py ve drive/api/product.py, login_as'ı kullanıcının kendi oturumu için çağırıyor; destek/impersonation amacı taşımıyor. Kalan eşleşmeler CI'daki sudo ve .run(as_dict) çağrıları.
- suite/suite; arama `(?i)(keycloak|token.?exchange|on_behalf|\bact\b.?claim|delegat|actor_user|real_user|original_user)`: Keycloak veya token-exchange entegrasyonu yok. Eşleşmeler izin devri (permission delegation) ve calendar invitations içindeki geçici set_user(original_user) çağrısıyla ilgili; impersonation değil.
- frappe/frappe (*.py); arama `impersonated_by|audit_user`: Bu alanlar yalnız auth.py, sessions.py ve version.py içinde kullanılıyor. Access Log, Activity Log alanları ve RPC/realtime yollarında yayılmıyor.
- suite/suite/headless_provider; arama `(?i)(session\.user|impersonat|actor|subject|audit|whitelist)`: Yerel pilot kodda yalnız whitelisted RPC'ler ve frappe.session.user var; impersonation veya actor/subject alanı yok.

Sınır: Yalnız kaynak kod okundu; test çalıştırılmadı. Runtime functionalAcceptance: not_run.; Kaynak, kodun var olduğunu kanıtlıyor; 'impersonate' izninin hangi rollere verildiği site veritabanına bağlı ve görülmedi.; Keycloak sunucusundaki impersonation yapılandırması bu kaynak kapsamının dışında.; suiteCommit bilinmiyor. headless_provider, upstream'e ait değil; yerel pilot olarak eklenmiş kod.; public/dist altındaki derlenmiş bundle'lar incelenmedi; kaynak JS dosyaları esas alındı.; ERPNext/HRMS kurulu değil, kapsam dışı.

Temporal workflow: `saas-recheck-20261015t073528z-058`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### access-5 — Destek erişiminde izin, gerekçe, süre, hassas işlem sınırı ve denetim izi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü somut: gerekçe, müşteri onayı ve süre zorunlu, süre bitince erişim kesilir. Kaynakta yalnız rol tabanlı izin ilkelleri ve uygulama düzeyinde has_permission/permission_query_conditions kancaları var. Süreli ve onaylı destek erişimi nesnesi görülmedi. Ayrıca Administrator ve System Manager her kontrolü atlıyor; destek erişimi bu rollerle verilirse süre ve hassas işlem sınırı uygulanamaz.

Eksik: Destek erişim modeli tanımsız: kullanıcı kimliğine bürünme (impersonation) mi, ayrı destek kullanıcısına süreli rol mü, Keycloak oturumu mu? Hangi kimliğin denetim izine yazılacağı belirtilmemiş.; Hassas işlem listesi ve bunun sunucuda nerede reddedileceği tanımsız (has_permission kancası, doküman metodu, API v1/v2 giriş noktası).; Destek rolünün Administrator/System Manager olamayacağı yazılmamış; Suite'teki ayrıcalıklı rol bypass'ı süre sınırını etkisiz bırakır.; Denetim izinin nereye yazılacağı (değişmez log DocType'ı ya da Version) ve süre bitince açık oturumların ve tokenların nasıl iptal edileceği tanımsız.; Kaynaklarda v15/v16 dokümanları var; yerel v17-dev'e eşleme yapılmamış.

Sonraki adım önerisi: support-grant--implementation görevine şu sözleşme notu eklensin: grant kaydı (kapsam, gerekçe, onaylayan, bitiş zamanı), ayrıcalıklı rol yasağı ve hassas işlemlerin sunucuda has_permission kancasıyla reddi. Bitişte rol veya oturum iptali yapılsın ve denetim izi kayıt altına alınsın. Uygulamadan önce Keycloak tarafında impersonation kullanılıp kullanılmayacağına karar verilsin.

Mevcut birincil görev: `support-grant--implementation`. Kaynak: `frappe/frappe/permissions.py:109`; `frappe/frappe/permissions.py:168`; `suite/suite/hooks.py:154`; `suite/suite/sheets/permissions.py:22`.

#### access-6 — Yetki devri, görev ayrılığı ve hassas işlemde yeniden doğrulama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: talep eden kendi işlemini onaylayamaz ve eski step-up kanıtı reddedilir. Sunucu tarafında ptype bazlı check_permission ve Frappe 2FA ilkeli mevcut. Ancak API girişinde kimlik doğrulama tazeliği veya acr kontrolü görülmedi. Allow Self Approval için version-15 kaynağı gösterilmiş; yerel kurulum v17-dev ve workflow_transition kaynağı bu pakette yok.

Eksik: Keycloak step-up kanıtının (acr/auth_time) Frappe isteğine nasıl taşınıp doğrulanacağı tanımsız. Görülen oauth.py yalnız Social Login Key giriş akışını gösteriyor.; 'Hassas işlem' listesi ve kabul edilecek en eski step-up yaşı belirtilmemiş.; Süreli yetki devrinin (başlangıç/bitiş, alt devir yasağı) hangi Frappe ilkeliyle uygulanacağı tanımsız: rol, User Permission veya DocShare.; Workflow self-approval referansı v15'te kalmış; v17-dev kaynağıyla doğrulanmadı.; UI'daki rol hesaplamasının yalnız gösterim amaçlı olduğu ve kararın sunucuda verildiği görev metninde açıkça yazmıyor.

Sonraki adım önerisi: delegation-policy--implementation görevine v17-dev workflow_transition kaynağının okunması eklensin. Hassas işlem listesi ve step-up yaşı sınırı tanımlansın. Keycloak acr/auth_time doğrulamasının hangi Frappe auth kancasında yapılacağı bir sözleşme notu olarak yazılsın.

Mevcut birincil görev: `delegation-policy--implementation`. Kaynak: `frappe/frappe/api/v2.py:267`; `frappe/frappe/utils/oauth.py:107`; `suite/suite/drive/webdav/auth.py:137`; `frappe/ui/src/composables/useDocPermissions.ts:22`; `suite/pyproject.toml:45`.

#### access-7 — Servis hesapları ve süreli, kapsamı sınırlandırılmış erişim anahtarları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net: token yalnız tanımlı tenant ve eylemlerde çalışmalı, süresi dolmuş veya iptal edilmiş token reddedilmeli. Yerel Frappe'de görülen genel servis kimlik bilgisi kullanıcıya bağlı api_key:api_secret çifti; bunun süresi ya da kapsamı yok ve 2FA'yı atlayan ayrı bir faktör sayılıyor. Suite Meet'te kısa ömürlü, kapsamlı ve jti replay korumalı JWT örneği var, ama bu yalnız uygulamaya özel ve genel bir servis hesabı mekanizması değil.

Eksik: Keycloak client-credentials tokenının Frappe'de hangi servis kullanıcısına ve rollere eşleneceği, bearer doğrulamasının (issuer, audience, JWKS) nerede yapılacağı tanımsız.; Statik api_key/api_secret'ın servis hesaplarında yasaklanıp yasaklanmayacağı veya nasıl sınırlanacağı yazılmamış.; Tenant ve eylem kapsamının Frappe rol izinleri ve User Permission ile nasıl kesişeceği tanımsız.; İptalin yayılım süresi ve önbellekteki kimlik bilgileri tanımsız; webdav kimlik bilgisi önbelleği buna örnek.; Servis hesabının Administrator olamayacağı ve ignore_permissions yolu kullanmayacağı belirtilmemiş.

Sonraki adım önerisi: service-credential--implementation görevine şunlar eklensin: Keycloak servis client'ının Frappe servis kullanıcısına eşlenmesi, audience ve kapsam doğrulama noktası, statik API anahtarı politikası ve iptal yayılım üst sınırı. Meet AuthManager'daki exp/jti deseni referans alınabilir ama kopyalanmamalı.

Mevcut birincil görev: `service-credential--implementation`. Kaynak: `suite/suite/drive/webdav/auth.py:151`; `suite/suite/drive/webdav/auth.py:6`; `suite/suite/meet/recorder-server/src/AuthManager.ts:200`; `suite/suite/meet/recording/callback_auth.py:399`.

#### access-8 — Periyodik erişim gözden geçirme; sahip onayı, süreli istisna ve gereksiz yetkinin kaldırılması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: sahip onayı, süreli istisna, iki tarafta iptal ve denetim izi. Yerelde yetkiler birden fazla depoda duruyor: Has Role, DocShare ve Suite'e özgü Drive Permission. Suite migration patch'leri Has Role kayıtlarını doğrudan bulk insert/delete ile değiştiriyor; bu da doküman geçmişi dışında rol değişikliği olabileceğini gösteriyor. Görev metni yalnız Keycloak rolleri ve Frappe izinlerinden söz ediyor.

Eksik: Gözden geçirilecek yetki envanteri eksik: Has Role, User Permission, DocShare, Drive Permission, API anahtarları ve Keycloak grupları/rolleri.; Uzlaştırmada hangi tarafın asıl kaynak sayılacağı (Keycloak→Frappe ya da tersi) ve çakışma kuralı tanımsız.; Doğrudan DB ile yapılan rol değişikliklerinin denetim izine nasıl yansıyacağı tanımsız.; Dönem, sahip kimliği ve istisna süre sınırı tanımsız. Destekleyici ui-family-34 görevinin kapsam sınırı belirtilmemiş.

Sonraki adım önerisi: access-review--implementation görevine yetki kaynağı envanteri ve uzlaştırma yönü eklensin. Reddedilen yetkinin her depoda native API üzerinden kaldırıldığı (doğrudan SQL ile değil) ve denetim kaydının oluştuğu kabul kanıtı olarak yazılsın.

Mevcut birincil görev: `access-review--implementation`. Kaynak: `suite/suite/drive/patches/switch_drive_roles_to_suite_roles.py:45`; `suite/suite/mail/patches/create_suite_user_role.py:95`; `suite/suite/sheets/permissions.py:53`; `suite/suite/drive/api/permissions.py:33`.

### Güvenlik, gizlilik ve veri yönetişimi

#### audit-1 — Audit (denetim izi) ve kullanıcı/işlem kayıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var, birincil görev audit-envelope--implementation'a bağlı. Kaynakta Version diff'i Document yaşam döngüsünde üretiliyor. REST v1 ve v2 yazma yolları doc.save() üzerinden geçiyor. Ancak Suite'te frappe.db.set_value ile yapılan doğrudan yazmalar bu yaşam döngüsünü atlıyor; bu yüzden 'UI, API ve arka plan işi' kapsamı kendiliğinden sağlanmıyor.

Eksik: Talimatta hangi yazma yollarının (Document.save, db.set_value, bulk delete enqueue, Suite op-log) zarfa gireceği listelenmemiş.; Kaynak listesi version-15 belgelerine atıf yapıyor; yerel ortam Frappe 17.0.0.dev0 (adf1fd0c) için sürüm eşlemesi yok.; Activity Log, Access Log ve Audit Trail kaynakları bu excerpt'te görülmedi; yerel davranışları bilinmiyor.; Track changes ayarının hangi DocType'larda açık olacağına dair bir karar yok.

Sonraki adım önerisi: audit-envelope--implementation görevine kritik yazma yollarının envanterini ekle (Document.save, db.set_value istisnaları, enqueue edilen işler). Version, Activity Log ve Access Log için yerel v17 kaynağına sürüm eşlemesi yaz. Yeni görev kaydı açma.

Mevcut birincil görev: `audit-envelope--implementation`. Kaynak: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v2.py:293`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `frappe/frappe/core/doctype/document_naming_rule/document_naming_rule.json:119`.

#### audit-2 — Eski/yeni değer, kullanıcı, kiracı, işlem kaynağı ve gerekçe.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Version kaydı alan bazında eski/yeni değeri, impersonated_by ve audit_user bilgisini, updater_reference ve via_data_import kaynağını kaydediyor. Kiracı (tenant) ve zorunlu gerekçe alanı kaynakta yok. Ignore Versioning ile işaretli alanlar diff'e girmiyor.

Eksik: Ortak zarfın şeması (tenant, kaynak, gerekçe, korelasyon kimliği) ve updater_reference ile ilişkisi tanımlı değil.; Tenant'ın site mi yoksa kayıt alanı mı olduğu tanımlanmamış.; Gerekçenin hangi işlemlerde zorunlu olacağı ve eksikse ne olacağı (red ya da uyarı) belirtilmemiş.; ignore_versioning_fields ve büyük metin alanları için eski/yeni değer politikası yok.

Sonraki adım önerisi: Zarf sözleşmesini audit-envelope--implementation içinde Version.data ile updater_reference üzerine eşle; tenant ve gerekçe alanlarını ve zorunluluk kuralını yaz. ORM'i veya Version'ı kopyalama.

Mevcut birincil görev: `audit-envelope--implementation`. Kaynak: `frappe/frappe/core/doctype/version/version.py:110`; `frappe/frappe/core/doctype/version/version.py:143`; `frappe/frappe/core/doctype/version/version.py:142`; `frappe/frappe/core/doctype/version/version.py:129`.

#### audit-3 — Destek erişimi, yönetici işlemi ve yetki değişikliği denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Version, oturumdaki impersonated_by ve audit_user değerlerini kaydederek gerçek ve etkin aktörü ayırmak için bir temel sunuyor. Yönetici sayaç değişikliği gibi bazı admin işlemleri elle Version yazıyor. Keycloak rol değişikliğini ilişkilendiren bir kaynak bu excerpt'te yok.

Eksik: Destek erişiminin impersonated_by ya da audit_user ile nasıl başlatılıp sonlandırılacağına dair talimat yok.; Keycloak admin event'lerinin Frappe kaydıyla hangi korelasyon anahtarıyla eşleşeceği tanımlı değil.; Frappe Role ve Has Role değişikliklerinin izlenme kapsamı belirtilmemiş.; Admin işlemlerindeki ignore_permissions ile Version yazımı yalnızca iç kullanım; dışa açılmaması gerektiği talimatta yazmıyor.

Sonraki adım önerisi: audit-envelope--implementation'a gerçek/etkin aktör alanlarını impersonated_by ve audit_user üzerine eşleyen bir madde ekle. Keycloak event korelasyonunu ayrı bir bağımlılık olarak yaz (ui-family-27 destekleyici kalır).

Mevcut birincil görev: `audit-envelope--implementation`. Kaynak: `frappe/frappe/core/doctype/version/version.py:43`; `frappe/frappe/core/doctype/version/version.py:46`; `frappe/frappe/core/doctype/document_naming_settings/document_naming_settings.py:222`; `frappe/frappe/core/doctype/document_naming_settings/document_naming_settings.py:236`.

#### audit-4 — Kayıt değişikliğine karşı koruma, saklama süresi ve erişim sınırı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Rol ve izin primitive'leri ile Suite log DocType'ları için has_permission ve permission_query hook'ları var. Ancak Administrator her izni koşulsuz geçiyor. Suite tarafı Writer Version kayıtlarını doküman silinince siliyor ve Sheet op log'u zamanlanmış görevle kırpıyor. Değişmez veya WORM saklama kaynakta yok.

Eksik: Saklama süresi değeri ve hangi log türlerine uygulanacağı belirtilmemiş.; truncate_op_log ve Writer Version silme davranışının audit saklamasıyla çakışması ele alınmamış.; Korumalı kopyanın hedefi (S3 Object Lock vb.), sahibi (Hüseyin Cengiz) ve kabul ölçütü yok.; Administrator bypass'ına karşı yönetici müdahalesinin nasıl iz bırakacağı tanımlı değil.

Sonraki adım önerisi: audit-envelope--implementation'a saklama matrisini (log türü, süre, korumalı kopya hedefi) ekle. Suite'teki truncate ve silme davranışlarını audit kapsamı dışı ya da korumalı kopyaya bağlı olarak işaretle. Altyapı adımını Hüseyin Cengiz'e devret.

Mevcut birincil görev: `audit-envelope--implementation`. Kaynak: `frappe/frappe/permissions.py:109`; `suite/suite/hooks.py:298`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`; `suite/suite/hooks.py:128`.

#### audit-5 — Denetim araması, dışa aktarım ve hassas veri maskeleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Arama ve dışa aktarım için zemin var: Version üzerinde ref_doctype+docname indeksi, export izin türü, izin kontrollü get_list ve alan bazlı okuma izni. Data Masking kaynağı bu excerpt'te görülmedi, bu yüzden yerel v17'deki durumu bilinmiyor. Talimat v16 nightly belgesine dayanıyor.

Eksik: Talimat v16 deneysel belgesine dayanıyor; yerel 17.0.0.dev0 için Data Masking kaynak doğrulaması yok.; Hassas alan listesi ve hangi çıktı yollarının (REST, CSV/JSON export, Query Report, raw SQL) kapsanacağı tanımlı değil.; Version.data içindeki eski/yeni değerlerde hassas alanların maskelenme kuralı yok.; Version'da tenant veya aktör bazlı arama için gerekli indeks ve filtre sözleşmesi tanımlanmamış.

Sonraki adım önerisi: Yerel v17 kaynağında Data Masking ve report/export yollarını salt okunur incele. Sonuçları audit-envelope--implementation kabulüne çıktı yolu × maskeleme tablosu olarak yaz. Raw SQL ile kısayol açma.

Mevcut birincil görev: `audit-envelope--implementation`. Kaynak: `frappe/frappe/core/doctype/version/version.py:256`; `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v1.py:84`; `suite/frontend/src/apps/sheets/services/versions.js:119`.

#### legal-1 — KVKK (Kişisel Verilerin Korunması Kanunu) ve GDPR (General Data Protection Regulation — Genel Veri Koruma Tüzüğü) kapsamı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: işleme amacı, dayanak, sorumlu ve tedbir bir kapsam kaydına bağlanacak. Ancak talimat yerel GDPR araçlarını eşlemiyor. Frappe v17 kaynağında Personal Data Deletion/Download Request ve `user_data_fields` hook'u var. Bunlar teknik yardımcıdır; KVKK/GDPR uyum kanıtı değildir.

Eksik: Kontrol matrisinin biçimi tanımlı değil; her satırın amaç, DocType, alan, dayanak ve saklama süresi içermesi gerekiyor.; Kurulu Suite modüllerinin (Mail, Drive, Calendar vb.) `user_data_fields` tanımı incelenen hooks parçasında görülmedi; silme ve indirme kapsamı bilinmiyor.; Anonimleştirmedeki varsayılan telefon değeri '+91 0000000000'; TR bağlamına uygun olup olmadığı kararı yok.; Silme formu `login_required: 0` ile açık. Doğrulama yalnızca e-posta imzasına dayanıyor; bunun kabul edilebilirliği değerlendirilmemiş.

Sonraki adım önerisi: Hukukun onaylayacağı tek bir işleme envanteri hazırlansın: her amaç için ilgili DocType'lar ve `user_data_fields` kapsamı. Suite hooks dosyasının tamamında `user_data_fields` tanımı aranarak eksik DocType'lar listelensin. Yeni görev açılmasın; mevcut `consent-evidence--implementation` görevine bağlansın.

Mevcut birincil görev: `consent-evidence--implementation`. Kaynak: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41`; `frappe/frappe/website/doctype/personal_data_download_request/personal_data_download_request.py:97`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:51`; `frappe/frappe/website/web_form/request_to_delete_data/request_to_delete_data.json:22`.

#### legal-2 — Gizlilik, çerez, üyelik, hizmet sözleşmesi ve anlaşma yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef belli ama genel; hangi belge türlerinin hangi akışta gösterileceği tanımlı değil. Kaynakta DocType izinleri ve Suite signup şablonu var, fakat politika/sözleşme belgesi yöneten bir model incelenen parçalarda yok. Kaynak olarak version-15 Web Page şeması verilmiş; yerel kurulum v17 dev olduğu için bu eşleme doğrulanmamış.

Eksik: Belge türü listesi ve akış eşlemesi eksik (signup → üyelik + aydınlatma, çerez banner → çerez politikası).; Web Page/CMS mi, ayrı bir DocType mı kararı yok. Headless React istemcisinin belgeyi hangi okuma API'siyle alacağı tanımlı değil.; Kaynak bağlantısı version-15; yerel v17 Web Page şemasıyla doğrulanmadı.; Suite signup şablonunda kabul adımının nereye bağlanacağı tanımlı değil.

Sonraki adım önerisi: `policy-document--implementation` görevine belge türü ve akış tablosu eklensin. Tablo, Suite'in `signup_form_template` ve User `before_insert` noktalarını bağlanma yeri olarak göstersin. Okuma yetkisi native DocType izinleriyle verilsin; `ignore_permissions` kullanan bir yardımcı açılmasın.

Mevcut birincil görev: `policy-document--implementation`. Kaynak: `suite/suite/hooks.py:370`; `suite/suite/hooks.py:245`; `frappe/frappe/permissions.py:82`.

#### legal-3 — Metin sürümü, dil, yürürlük tarihi, kabul kanıtı ve yeniden kabul.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni net: eski kanıt korunacak, yeni sürüm yürürlüğe girince yeniden kabul istenecek. Ancak değişmezlik ve saklama sözleşmesi yok. `track_changes` (Version) değişiklik geçmişi tutar ama hukuki kabul kanıtı değildir. Silinen kayıtlar Deleted Document'e gider ve varsayılan olarak 180 gün sonra temizlenir; kanıt kaybı riski var.

Eksik: Yayımlanmış sürümün değişmezlik kuralı tanımlı değil: düzenleme yerine yeni sürüm mü açılacak, submit/amend mi kullanılacak?; Dil ve yürürlük tarihi alanları, dil fallback kuralı ve sürümler arası 'yeniden kabul gerekir' bayrağı tanımlı değil.; Yeniden kabulün nerede zorlanacağı (giriş veya işlem kapısı) ve headless istemciye nasıl bildirileceği tanımlı değil.; Kabul kanıtının silinmeye karşı korunması ve Deleted Document'in 180 günlük temizliğinden ayrı tutulacak saklama süresi tanımlı değil.; Version kaynağı version-15 bağlantısı; v17 kaynağıyla eşlenmedi.

Sonraki adım önerisi: `policy-document--implementation` ve `consent-policy-reference--implementation` için bir veri sözleşmesi yazılsın. Sözleşme şunları içersin: belge, sürüm, dil, yürürlük tarihi, `requires_reacceptance`, değişmez yayın durumu ve kanıt kaydında silme yetkisinin kapalı olması. Kabul kriterine 'eski kabul kaydı sürüm linkiyle birlikte okunabilir kalır' eklensin.

Mevcut birincil görev: `policy-document--implementation`. Kaynak: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.json:71`; `frappe/frappe/core/doctype/deleted_document/deleted_document.py:34`.

#### legal-4 — Aydınlatma, açık rıza ve sözleşme kabulünün ayrı kayıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

KVKK ayrımı kabul metninde doğru kurulmuş: aydınlatma, açık rıza ve sözleşme kabulü ayrı olaylar; biri geri çekilince diğerinin kanıtı değişmiyor. Kaynakta if_owner okuma izni ve alan düzeyi okuma izni gibi yapı taşları var. Ancak olay modeli ve silme/anonimleştirme ile ilişkisi tanımlı değil.

Eksik: Olay türleri (sunum / rıza / geri çekme / sözleşme kabulü) ve zorunlu alanlar tanımlı değil: kullanıcı, sürüm, kanal, zaman, kaynak.; Geri çekmenin yeni bir olay olarak eklenip eklenmeyeceği (append-only) yazılmamış; mevcut kaydın güncellenmesi engellenmeli.; Kanıt kayıtları `user_data_fields` kapsamına girerse silme talebinde redakte edilir. Silme ile kanıt saklama arasındaki hukuki karar eksik.; Kullanıcının kendi kanıtını görme yetkisi (if_owner read) ve yöneticinin silme yetkisinin kapatılması tanımlı değil.

Sonraki adım önerisi: `consent-evidence--implementation` görevine iki şey eklensin: append-only olay şeması ve izin matrisi (sahibi okur, kimse silmez). Hukuktan bu kayıtların silme talebinde redakte mi edileceği yoksa saklanacak mı olduğu yazılı karar olarak alınsın.

Mevcut birincil görev: `consent-evidence--implementation`. Kaynak: `frappe/frappe/website/doctype/personal_data_download_request/personal_data_download_request.json:60`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41`.

#### legal-5 — Çerez tercihleri, ticari ileti izinleri ve geri çekme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de yalnız e-posta kanalı için geri çekme (opt-out) primitive'i var. Email Unsubscribe DocType iki tür kayıt tutuyor: belirli bir belgeye bağlı (reference_doctype/reference_name) kayıt ve global_unsubscribe kaydı. Controller tekrar eden kaydı ve global kaydın daraltılmasını engelliyor. frappe.email.queue.unsubscribe guest olarak çağrılabiliyor ve imzalı istek doğrulamasından (verify_request) sonra bu kaydı oluşturuyor. Bağlantı, Email Queue'daki imzalı parametrelerle (get_signed_params) e-postanın altına ekleniyor. frappe.sendmail → QueueBuilder kuyruğa alma sırasında get_unsubscribed_user_emails ile to/cc/bcc alıcılarını eliyor: global kaydı olanlar ve aynı referans için çıkanlar düşüyor. Bu, e-postada sonraki gönderimi durduran gönderim öncesi kontrol noktası. Email Group Member.unsubscribed alanı var. Suite yalnız hooks.py'de unsubscribe endpoint'ini izinli rotalar listesine almış. Suite Mail'deki is_newsletter / Mail Queue.newsletter bayrağı yalnız toplu teslim modunu ve önceliği belirliyor; izin denetimi yapmıyor.

Eksik: Çerez tercihleri için kaynakta hiçbir şey yok: zorunlu/isteğe bağlı kategori, banner, tercih saklama ve consent-mode kodu bulunmadı.; İzin (opt-in) kaydı ve kanıtı yok: zaman, kaynak, metin sürümü ve kanal tutulmuyor. Yalnız geri çekme (opt-out) kaydı var.; Kanal bazlı izin modeli yok: SMS, push ve telefon için tercih kaydı ve geri çekme yok; mevcut mekanizma yalnız e-posta için.; İşlemsel ile ticari ileti ayrımı için alan veya bayrak yok. Email Unsubscribe kapsamı referans belge ya da global; bir 'pazarlama' kategorisi yok.; Suite Mail outbound (suite/mail/api/outbound.py → Mail Queue) Email Unsubscribe filtresini uygulamıyor. Bu yoldan geri çekilmiş alıcıya pazarlama gönderimi engellenmeden geçebilir.; Bu Frappe kaynağında Newsletter DocType yok. Unsubscribe bağlantısı, açık unsubscribe_message verilmedikçe yalnız reference_doctype == 'Newsletter' olduğunda ekleniyor.; Filtre kuyruğa alma anında (QueueBuilder) çalışıyor; daha önce kuyruğa girmiş iletilerin flush sırasında yeniden kontrol edildiği doğrulanmadı.; headless_provider'da (yerel pilot) izin veya tercih okuma/yazma sözleşmesi yok. React/Vite istemcide çerez tercih sözleşmesi bu kaynakta yok.

Sonraki somut adım: Sıralama önerisi, yeni görev kaydı değil; mevcut bağımlılıklar korunur. (1) consent-evidence--contract: kanal (email/sms/push), amaç (transactional/marketing), durum, zaman, kaynak ve metin sürümünden oluşan izin kaydını ve çerez kategorisi sözleşmesini (necessary/optional) yaz. (2) consent-evidence--schema: Email Unsubscribe'ı değiştirmeden ek bir izin DocType'ı tanımla. (3) consent-evidence--implementation: tek gönderim öncesi kontrol noktası kur. En küçük adım: frappe.sendmail/QueueBuilder için marketing bayrağı taşıyan iletilerde izin kontrolü ekle; geri çekmede Email Unsubscribe global veya kanal kaydını da yaz. Ardından aynı kontrolü Suite Mail outbound newsletter yoluna bağla. Önce RED test: geri çekilmiş alıcıya marketing ileti kuyruğa alınmamalı. Çerez tercihini React istemcide bağımsız uygula; headless provider'a yalnız izin okuma/yazma uç noktası ekle.

Önerilen bağımlılık/sıra: consent-evidence--contract; consent-evidence--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `consent-evidence--implementation`.

Kaynak kanıtı:

- `frappe/frappe/email/queue.py:97` — `def unsubscribe(doctype: str, name: str, email: str):`
- `frappe/frappe/email/queue.py:105` — `"doctype": "Email Unsubscribe",`
- `frappe/frappe/email/doctype/email_queue/email_queue.py:792` — `| (EmailUnsubscribe.global_unsubscribe == 1)`
- `frappe/frappe/email/doctype/email_queue/email_queue.py:805` — `return [mail_id for mail_id in self.recipients if mail_id not in unsubscribed_emails]`
- `frappe/frappe/email/doctype/email_unsubscribe/email_unsubscribe.py:31` — `frappe.throw(_("Delete this record to allow sending to this email address"))`
- `suite/suite/mail/api/outbound.py:120` — `delivery_mode="Batch" if is_newsletter else "Enqueue",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite); arama `(?i)cookie_consent|cookie consent|Email Unsubscribe|unsubscribe`: Frappe email/* (queue, email_queue, email_unsubscribe, email_group_member) ve contact/user/communication eşleşti; çoğu locale dosyası.
- frappe/frappe/email/queue.py; arama `(?i)unsubscribe|send_unsubscribe|Email Unsubscribe|global_unsubscribe`: Guest unsubscribe endpoint'i, imzalı URL üretimi ve unsubscribe mesajı bulundu.
- frappe/frappe/email/doctype/email_queue/email_queue.py; arama `(?i)unsubscribe|Email Unsubscribe|global_unsubscribe|send_after`: QueueBuilder get_unsubscribed_user_emails ve final_recipients/cc/bcc ile filtreliyor; add_unsubscribe_link varsayılanı 1.
- frappe/frappe/email/doctype/email_queue/email_queue.py; arama `final_recipients\(\)|final_cc\(\)`: Filtrelenmiş alıcılar kuyruk belgesi oluşturulurken kullanılıyor (satır 834-972).
- suite; arama `(?i)cookie.?consent|consent|unsubscribe|marketing|opt.?out|opt.?in`: Yalnız ilgisiz eşleşmeler var: meet captions, realtime, derlenmiş asset'ler. İzin uygulaması yok.
- suite (_.py,_.json,_.vue,_.ts); arama `(?i)unsubscribe|newsletter|marketing|cookie.?consent|commercial`: Yalnız hooks.py:425'te unsubscribe rota izni ve Mail Queue.newsletter toplu teslim bayrağı var; izin filtresi yok.
- source (locale ve public/frontend hariç); arama `(?i)cookie_consent|cookie.?banner|accept.?cookies|cookie_policy|show_cookie|consent_mode|gtag\(.consent`: Eşleşme yok: çerez onay uygulaması yok.
- frappe/frappe/**/doctype/{newsletter*,email_group*,consent*,cookie*}; arama `glob *.json`: Yalnız email_group ve email_group_member var; Newsletter, Consent ve Cookie DocType'ı yok.
- suite/suite/headless_provider; arama `(?i)consent|unsubscribe|marketing|cookie|opt_out|preference`: Yalnız api.py'de 'cookie-session user' ifadesi geçiyor; izin sözleşmesi yok.
- frappe/frappe/email/doctype/email_group/email_group.py; arama `(?i)unsubscribe|def `: unsubscribed alanı yalnız üye içe aktarmada kopyalanıyor; gönderimde kullanıldığı burada görülmedi.

Sınır: Yalnız kaynak kodu salt okunur incelendi; çalışma zamanı kabulü (functionalAcceptance) not_run. Test yazılmadı ve çalıştırılmadı.; Hukuki uyum (KVKK/GDPR/İYS) kaynaktan kanıtlanamaz.; React/AntDesign istemci, Keycloak ve dış ESP kaynakları bu snapshot'ta yok; çerez tercihi orada değerlendirilemedi.; Suite commit bilinmiyor. headless_provider yerel pilot ek koddur, upstream değildir.; Email Queue flush aşamasında unsubscribe'ın yeniden kontrol edilip edilmediği tam okunmadı.; ERPNext/HRMS kurulu değil; onların Newsletter/Campaign yetenekleri değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-006`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### legal-6 — Müşteri özel sözleşmeleri, veri işleme şartları ve taahhüt kaydı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Koşullu kapsam ve yetkisiz erişim kabulü tanımlı. Ancak müşteri/tenant kaydına bağlantı yok. ERPNext kurulu olmadığı için Customer DocType'ına bağlanılamaz. Kaynakta yalnız genel izin ve User Permission yapı taşları görülüyor.

Eksik: Bağlanılacak müşteri kaydı tanımlı değil: ERPNext Customer yok; tenant veya hesap kaydının ne olacağı kararı eksik.; Kapsamı tetikleyen koşulun kim tarafından, nasıl kaydedileceği tanımlı değil.; DPA belgesinin dosyası (Suite Drive veya private File), sürümü, imza/kabul tarihi ve süre alanları tanımlı değil.; Müşteri bazında görünürlük için User Permission kullanım kuralı tanımlı değil.

Sonraki adım önerisi: `contract-commitment--implementation` görevinde müşteri kaydı kararı netleştirilsin (tenant DocType). Görünürlük native DocType ve User Permission ile sınırlansın. Belge sürüm sözleşmesi legal-3 modeliyle paylaşılsın; kopya bir model kurulmasın.

Mevcut birincil görev: `contract-commitment--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/core/doctype/data_export/exporter.py:47`.

#### legal-7 — Uygulanabilir Türkiye ticari ileti süreçleri için İYS izin eşitleme ve gönderim öncesi kontrolü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni ayrıntılı: eşitleme, gönderim öncesi kontrol, erişim hatasında güvenli politika ve işlemsel ayrım. Ancak entegrasyon sözleşmesi yok. Sahip 'Frontend ve hukuk' yazılmış; oysa eşitleme sunucu tarafında yapılmalı. Kaynakta kuyruk ve zamanlayıcı yapı taşları var; İYS istemcisi yok.

Eksik: Hizmet sağlayıcı/aracı rolü, marka ve kanal kararı yok; post-MVP koşulu belgelenmemiş.; Sahip yanlış: sunucu entegrasyonu ve secret yönetimi backend ve DevOps işidir.; Eşitleme yönü, kuyruk/yeniden deneme, idempotency ve İYS erişilemezken gönderimin bloklanması kuralı tanımlı değil.; legal-5'teki yerel tercih kaydıyla çakışmada hangi kaydın öncelikli olduğu tanımlı değil.

Sonraki adım önerisi: `consent-evidence--implementation-post-mvp` görevinde sahip backend olarak düzeltilsin. Bir arayüz notu eklensin: eşitleme kuyruk/zamanlayıcı ile yapılsın, gönderim legal-5'teki aynı kontrol noktasından geçsin, İYS hatasında gönderim yapılmasın. Credential'lar yalnız site config/secret deposunda tutulsun.

Mevcut birincil görev: `consent-evidence--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v2.py:293`; `suite/suite/hooks.py:307`.

#### governance-1 — Veri envanteri, hassasiyet sınıfı ve hangi modülün verinin sahibi olduğu kaydı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Amaç ve kabul ölçütü (sahip, amaç, kopya konumu, saklama kuralı) belli. Ancak envanterin nerede tutulacağı, hassasiyet sınıflarının listesi ve kopya konumlarının nasıl bulunacağı tanımlı değil. Kaynakta DocType meta ve yüksek hassasiyetli kopyalar var (Sheet Op Log/Snapshot, Writer arama dizini) ama envanter modeli yok.

Eksik: Hassasiyet taksonomisi ve modül sahipliği alanları tanımlı değil; native Custom Field mı, ayrı bir envanter DocType'ı mı kullanılacağı kararı yok; Kopya konumları (Writer sqlite_search, mail tantivy, Sheet Snapshot, S3, SFU servisleri) envantere bağlanmamış; DocType meta'dan otomatik türetme ile insan onaylı sınıflandırma arasındaki sınır belirsiz

Sonraki adım önerisi: data-classification--implementation görevine şunları ekle: (1) Frappe+Suite DocType'ları için hassasiyet sınıfı/sahip/amaç/saklama şeması, (2) bilinen kopya hedefleri listesi. Kabul örneği: Sheet Snapshot içindeki bir alanın sahibi ve kopya konumları envanterden bulunabilmeli.

Mevcut birincil görev: `data-classification--implementation`. Kaynak: `frappe/frappe/api/v2.py:247`; `suite/suite/sheets/permissions.py:3`; `suite/suite/hooks.py:38`; `suite/pyproject.toml:27`.

#### governance-2 — Arşivleme, saklama süresi, anonimleştirme ve kalıcı silme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı ama kaynak bağlantıları Frappe version-15 dosyalarını gösteriyor; yerel kurulum 17.0.0-dev ve bu sürüme eşleme yapılmamış. Kaynakta Drive soft-trash/kalıcı blob silme ve tek seferlik temizlik patch'i var; politikaya dayalı saklama, arşiv ya da anonimleştirme motoru yok.

Eksik: v17-dev için Log Settings/kişisel veri silme API eşlemesi doğrulanmamış (v15 URL); Arşiv, anonimleştirme ve kalıcı silme arasında hangi durumda hangisinin seçileceği kuralı yok; Drive soft-trash (STATUS_TRASHED) ile kalıcı silme arasındaki süre politikası tanımlanmamış; Saklama istisnası governance-5'e bağımlı ama sıralama yazılmamış

Sonraki adım önerisi: retention-rule--implementation görevine v17-dev kaynak eşlemesini ekle. Politikayı tek bir örnek DocType üzerinde tanımla (Drive File trash → kalıcı silme) ve silme engelini legal-hold görevine bağımlılık olarak yaz.

Mevcut birincil görev: `retention-rule--implementation`. Kaynak: `suite/suite/drive/overrides/file.py:132`; `suite/suite/drive/overrides/file.py:133`; `suite/suite/hooks.py:238`; `suite/suite/slides/doctype/presentation/patches/cleanup_unused_thumbnail_files.py:113`.

#### governance-3 — Silme işlemini dosya, arama, önbellek ve yapay zekâ bilgi tabanına yayma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Drive after_delete ilişkili satırları ve içerik dokümanını siliyor. Ancak arama dizinleri (Writer sqlite_search, mail tantivy), Redis ve AI kopyaları için yayılım görülmedi; hatalar yalnızca log'a yazılıyor, tekrar deneme yok. Görev, governance-2 ve 7 ile aynı primary task'a eşlenmiş; ayrı bir kabul alt bölümü yok.

Eksik: Silme hedefi kaydı (dosya/S3, arama, cache, AI) ve her hedef için silme sözleşmesi tanımlı değil; Tekrar deneme ve görünür başarısızlık durumu yok; mevcut örüntü sadece log_error; ignore_permissions ile yapılan zincirleme silme, saklama kilidi kontrolünü atlayabilir; 'Yapay zekâ bilgi tabanı' hedefi belirsiz: GenUI kullanıcının bağımsız projesi; yalnızca Suite içi AI kopyaları (Sheets AI Assist) kapsamda olmalı

Sonraki adım önerisi: retention-rule--implementation içinde 'yayılım' alt kabulü tanımla: silme sonrası hedef başına izlenebilir iş, tekrar deneme ve başarısızlık kaydı. İlk hedefleri Drive blob + Writer arama dizini olarak sınırla; GenUI registry ile birleştirme.

Mevcut birincil görev: `retention-rule--implementation`. Kaynak: `suite/suite/drive/overrides/file.py:152`; `suite/suite/drive/overrides/file.py:138`; `suite/suite/hooks.py:38`; `suite/suite/slides/doctype/presentation/patches/cleanup_unused_thumbnail_files.py:115`.

#### governance-4 — İlgili kişinin erişim, düzeltme, silme ve taşınabilirlik talepleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü belli. Kaynakta izin kontrollü okuma ve alan düzeyi izin filtreleri var; ancak v17-dev'deki Personal Data Download/Deletion Request kaynağı bu excerpt'te görünmüyor (yalnızca v15 URL var). Suite'te File izinleri Drive'a devredilmiş; dışa aktarma kapsamı buna göre tanımlanmamış.

Eksik: v17-dev çekirdek DSR DocType'ları kaynakta doğrulanmadı; Düzeltme (rectification) ve taşınabilirlik formatı tanımlı değil; Kimlik doğrulama adımı (Keycloak oturumu vs. e-posta doğrulaması) belirsiz; Drive'ın File izin modeli ve Sheet/Writer/Mail verilerinin dışa aktarma kapsamı listelenmemiş; ERPNext/HRMS kurulu değil; kapsam yalnızca frappe+suite olmalı

Sonraki adım önerisi: data-subject-request--implementation görevine v17-dev çekirdek DSR kaynak doğrulamasını ön koşul olarak ekle. Kapsam listesini governance-1 envanterinden türet; dışa aktarma Drive izin katmanı üzerinden yapılmalı ve ignore_permissions yardımcıları dışarıya açılmamalı.

Mevcut birincil görev: `data-subject-request--implementation`. Kaynak: `frappe/frappe/api/v2.py:86`; `frappe/frappe/api/v2.py:87`; `suite/suite/hooks.py:117`.

#### governance-5 — Hukuki saklama kilidi ve silme istisnaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı ve kapsam koşullu. Sunucu tarafında silmeyi engelleme örüntüsü (on_trash içinde throw) ve doc_events kancaları var; genel bir saklama kilidi modeli yok. Zincirleme silmeler ignore_permissions kullanıyor, bu yüzden kilit kontrolünün izin katmanında değil silme kancasında yapılması gerekiyor.

Eksik: Koşullu kapsamın tetikleyicisi (sözleşme ya da hukuki talep) ve karar sahibi tanımlı değil; Kilidin bağlanacağı silme noktaları listelenmemiş (v1/v2 delete, Drive after_delete zinciri, patch/scheduler); Kilit açma gerekçesi ve denetim izi için veri modeli yok

Sonraki adım önerisi: legal-hold--implementation görevinde kilidi on_trash/doc_events seviyesinde, sunucu tarafında zorunlu kılan sözleşmeyi yaz. Kabul: ignore_permissions ile yapılan Drive zincirleme silmesi de kilitli kayıtta reddedilmeli.

Mevcut birincil görev: `legal-hold--implementation`. Kaynak: `suite/suite/drive/overrides/file.py:128`; `suite/suite/drive/overrides/file.py:136`; `suite/suite/hooks.py:224`; `frappe/frappe/api/v2.py:240`.

#### governance-6 — Veri yerleşimi, ülke/bölge kısıtları ve alt işleyen envanteri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Yalnız ilgili altyapı taşları var; yerleşim politikası yok. (1) Suite Drive'daki FileManager (suite/suite/drive/utils/files.py), S3 bucket'ının gerçek bölgesini get_bucket_location ile bulup 24 saat cache'liyor. Bu bilgi yalnız presigned URL imzası için kullanılıyor; bölgeye izin verme veya engelleme yapılmıyor. Custom endpoint_url (MinIO vb.) tanımlıysa bölge hiç sorgulanmıyor. (2) Veriyi dışarı gönderen noktalar ayarlarla veya site config ile tanımlı: Drive Disk Settings endpoint_url/bucket ve Sheets AI Settings api_key/model. Anthropic istemcisi base_url veya bölge seçeneği olmadan varsayılan uç noktayla kuruluyor ve çalışma sayfası bağlamını gönderiyor. Bunlara ek olarak site config'te sfu_server_url, recorder_server_url, collab_ws_url ve push_relay_server_url; Suite Settings'te suite_cloud_url; Mail Settings'te server_url var. (3) frappe System Settings'teki country alanı yalnız yerel ayar varsayılanıdır, veri yerleşimini zorlamaz. Yerel pilot kodu suite/headless_provider (upstream değil) bölge, tenant veya alt işleyen sözleşmesi içermiyor.

Eksik: Onaylı bölge/ülke listesi modeli (DocType veya site config) yok; Alt işleyen envanteri kaydı yok: S3, Anthropic, Meet SFU/recorder/STT, Sheets collab, push relay, Suite Cloud ve Mail sunucusu bağlanmamış; Ayar kaydedilirken uç nokta veya bölge doğrulaması yok; S3 bölge tespiti engelleme amacıyla kullanılmıyor; Yasak bölgeye yeni aktarımı engelleyen bir uygulama noktası yok (validate hook ya da egress allowlist); Tenant başına yerleşim bağlamı ve yedek/analitik kopyalarının konum kaydı yok; Headless provider'da yerleşim ve alt işleyen bilgisini sunan sözleşme yok; Ağ egress politikası ve gerçek veri merkezi konumu kaynaktan kanıtlanamaz; bu, Hüseyin Cengiz'in altyapı doğrulaması ve Hukuk ekibinin sözleşme kontrolüdür

Sonraki somut adım: Mevcut residency-policy--contract → residency-policy--schema → residency-policy--implementation sırası izlenmeli. En küçük adım iki parçalı: önce onaylı bölge listesi için tek bir ayar tanımlanır. Ardından Drive Disk Settings validate() içinde, files.py'deki get_bucket_location mantığı yeniden kullanılarak S3 bucket bölgesi bu listeyle karşılaştırılır. Liste dışı bölgede ya da doğrulanamayan custom endpoint'te kayıt reddedilir; önce RED/GREEN testi yazılır. Sonra aynı allowlist kontrolü Sheets AI çağrısından önce ve site config URL'lerine (SFU, recorder, collab, push relay, suite_cloud) envanter kaydı olarak uygulanır. Headless provider'a, alt işleyen listesini salt okunur sunan bir uç nokta yerleşim sözleşmesinden sonra eklenir. Egress engeli ve fiziksel konum kanıtı Hüseyin Cengiz'in altyapı devrine bağlanır.

Önerilen bağımlılık/sıra: residency-policy--contract; residency-policy--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `residency-policy--implementation`.

Kaynak kanıtı:

- `suite/suite/drive/utils/files.py:246` — `region = self.conn.get_bucket_location(Bucket=bucket).get("LocationConstraint") or "us-east-1"`
- `suite/suite/drive/utils/files.py:42` — `endpoint_url=(settings.endpoint_url or None),`
- `suite/suite/sheets/ai/client.py:88` — `client = anthropic.Anthropic(api_key=api_key)`
- `suite/suite/meet/utils/sfu_config.py:12` — `"sfu_server_url": frappe.conf.get("sfu_server_url", "http://localhost"),`
- `suite/suite/meet/api/recording.py:272` — `base_url=frappe.conf.get("recorder_server_url"),`
- `suite/suite/suite_core/doctype/suite_settings/suite_settings.json:61` — `"fieldname": "suite_cloud_url",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/, suite/ (tüm kaynak; min.js/map/svg/po/pot/csv hariç); arama `(?i)(data[_ ]residency|residency|data_region|allowed_regions|sub[-_ ]?processor|subprocessor|data[_ ]location|cross[-_ ]border|region_name|AWS_REGION)`: Yalnız suite/suite/drive/utils/files.py:248,251,257 eşleşti; hepsi S3 imza bölgesi için. Residency veya alt işleyen modeli yok.
- frappe/, suite/ (*.py); arama `(?i)(anthropic\.|Anthropic\(|base_url|api\.anthropic|openai|egress|allowed_hosts|allowlist.*(host|domain|url)|blocked_countr|geo_?ip|data_?processing_?agreement|processor_inventory)`: Eşleşenler: Anthropic istemcisi (sheets/ai/client.py), recorder base_url, suite_cloud ve JMAP istemcileri. Egress allowlist, geo-IP veya DPA/envanter yok.
- frappe/, suite/ (system_settings, drive_disk_settings, s3_backup_settings, personal_data_deletion_request, headless_provider* JSON); arama `(?i)(country|region|residency|location)`: Yalnız System Settings country alanı (yerel ayar) eşleşti.
- frappe/, suite/ (*.py, *.json); arama `(?i)(s3_backup|dropbox|google_drive|backup_to_|offsite|recorder_server_url|sfu_server_url|stt_server|suite_cloud_url|collab_server)`: 22 dosya eşleşti: Meet, Sheets collab, Suite Settings ve Google Settings; ayrıca frappe'de dropbox ile ilgili eski bir patch var. Bölge kısıtı yok.
- suite/suite/headless_provider; arama `(?i)(region|residency|country|processor|tenant|egress)`: Eşleşme yok.
- suite/suite/**/doctype/_settings_/*.json; arama `(?i)"fieldname": "[a-z_]*(url|server|endpoint|cloud|region|ai_|api_key|model)[a-z_]*"`: Dış uç nokta alanları: endpoint_url, suite_cloud_url, server_url, Sheets AI model/api_key. Bölge alanı yok.
- suite/suite (*.py); arama `(?i)(frappe\.conf\.get\(|conf\.get\()"?[a-z_]*(url|server|host|region)`: push_relay_server_url, collab_ws_url, recorder_server_url ve sfu_server_url site config'ten okunuyor; doğrulama yok.

Sınır: Yalnız Read/Glob/Grep ile statik kaynak incelendi; kod veya test çalıştırılmadı. functionalAcceptance: not_run.; Site config, gerçek bucket bölgesi, sunucu konumu, ağ egress kuralları ve sözleşmeler kaynakta yok; bunlar kanıtlanamaz.; ERPNext/HRMS kurulu değil, değerlendirilmedi. suiteCommit bilinmiyor.; Standalone servislerin (SFU/STT/recorder/collab) dağıtım konumu kaynaktan belirlenemez.; suite/headless_provider yerel pilot ek koddur, upstream sayılmadı. Suite'in Vue frontend'i ile headless sözleşmesi ayrı tutuldu.

Temporal workflow: `saas-recheck-20261015t073528z-007`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### governance-7 — Yedekten dönüşte daha önce silinmiş verilerin yeniden silinmesi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe'de ilgili ilkel parçalar var: (1) `bench restore` (commands/site.py restore/_restore/restore_backup) SQL dökümünü `_new_site(source_sql=...)` ile içe alıyor ve isteğe bağlı olarak dosyaları açıyor; bu akışta restore sonrası kanca, silme yeniden oynatma veya bakım/karantina kapısı yok. (2) Personal Data Deletion Request DocType'ı `user_data_fields` kancasında tanımlı DocType'ları anonimleştiriyor (redact/rename, User yeniden adlandırma, rewrite_owner_fields); günlük zamanlanmış iş `process_data_deletion_request` da bunu çalıştırıyor. Ancak talep kaydı e-postayı açık metin olarak aynı veritabanında tutuyor; eski bir yedek geri yüklenince talebin kendisi de kayboluyor. (3) Deleted Document, silinen dokümanın tam JSON'unu (`doc.as_json()`) aynı veritabanında saklıyor. Bu bir tombstone değil, geri dönüşüm kutusu gibi çalışıyor ve kişisel veri taşıyor. (4) migrate.py'de kullanılabilir bir `after_migrate` kanca noktası var; Suite'in after_migrate'i yalnızca mail işini çalıştırıyor. Suite/headless_provider (yerel pilot, ek kod) içinde restore, tombstone veya silme yeniden oynatma bulunmadı; api.py:719'daki 'restored' ifadesi istek bağlamıyla ilgili ve bu konuyla ilgisiz.

Eksik: Veritabanı yedeğinden bağımsız saklanan ve kişisel veri taşımayan bir tombstone deposu yok (örneğin tenant başına tuzlanmış hash anahtarı, DocType, silme zamanı, karar kimliği).; Restore veya migrate sonrasında tombstone'ları yeniden uygulayan bir işleyici yok.; Kullanıcı trafiği, scheduler ve kuyruk açılmadan önce çalışan bir karantina/servis açılış kapısı yok; restore akışı hiçbir kanca çağırmıyor.; Hard delete (frappe.delete_doc / frappe.db.delete) ve Drive after_delete için tombstone yazımı yok.; Arama ve RAG/AI kopyalarının yeniden temizlenmesi governance-3 yayılımına bağlı; kaynakta indeks veya vektör temizleyen restore entegrasyonu bulunmadı.; Personal Data Deletion Request kaydının kendisi PII taşıyor ve yedekle birlikte geri dönüyor ya da kayboluyor; yeniden oynatmaya kaynak olamaz.

Sonraki somut adım: retention-rule--contract ve retention-rule--schema bağımlılıkları tamamlandıktan sonra retention-rule--implementation içinde şu sırayla dar bir RED/GREEN adımı uygulanmalı: (1) PII içermeyen tombstone şeması tanımlanmalı ve yedek dışı bir depoya yazılmalı. (2) Personal Data Deletion Request'in _anonymize_data akışı ile hard-delete yolu tamamlandığında tombstone yazılmalı. (3) Suite'in after_migrate kancasına ve ayrı bir bench komutuna, tombstone'ları mevcut anonimleştirme ve silme ilkelleriyle yeniden uygulayan, idempotent bir replay eklenmeli. (4) Replay başarıyla bitene kadar site maintenance/scheduler kapalı tutulmalı (karantina kapısı). (5) governance-3 hedeflerinin (arama ve RAG kopyaları) yeniden temizlenmesi bağımlılık olarak çağrılmalı. İlk test: silinmiş bir kişiyi içeren bir fixture restore edilir, ardından replay çalıştırılır ve kişinin anonimleşmiş olduğu doğrulanır.

Önerilen bağımlılık/sıra: retention-rule--contract; retention-rule--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `retention-rule--implementation`.

Kaynak kanıtı:

- `frappe/frappe/commands/site.py:404` — `source_sql=sql_file_path,`
- `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41` — `self.user_data_fields = frappe.get_hooks("user_data_fields")`
- `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:302` — `self.db_set("status", "Deleted")`
- `frappe/frappe/model/delete_doc.py:259` — `data=doc.as_json(),`
- `frappe/frappe/migrate.py:212` — `for fn in frappe.get_hooks("after_migrate", app_name=app):`
- `suite/suite/suite_core/boot.py:88` — `_run("mail.after_migrate", mail_after_migrate)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/, suite/ (_.py,_.json,_.ts,_.js); arama `(?i)tombstone|deleted_document|re-?delete|after_restore|before_restore|restore_hook|post_restore`: Tombstone veya restore sonrası kanca bulunmadı. Eşleşmeler Deleted Document DocType'ı, workspace restore ve Meet SFU snapshot kodu; konuyla ilgisiz.
- frappe/, suite/ (*.py); arama `(?i)def restore|restore_backup|after_migrate|before_migrate|_restore\(`: bench restore/_restore/restore_backup, installer.partial_restore, migrate.py after_migrate kanca döngüsü ve suite boot.after_migrate (yalnızca mail) bulundu. Sheets, Drive ve Deleted Document restore işlevleri tekil doküman geri yüklemesi yapıyor, yedek restore'u değil.
- frappe/frappe/installer.py; arama `get_hooks\(|source_sql|maintenance_mode|def _new_site`: _new_site source_sql ile çalışıyor. Restore'a özgü bir kanca veya bakım kapısı yok; yalnızca app install/enable kancaları var.
- frappe/, suite/ (_.py,_.json); arama `(?i)personal.data.deletion|anonymi[sz]e|erase|right.to.be.forgotten|data_deletion`: Personal Data Deletion Request/Step, Website Settings auto_account_deletion ve hooks user_data_fields bulundu; restore sonrası yeniden oynatma yok.
- **/hooks.py; arama `user_data_fields|scheduler_events|process_data_deletion_request`: frappe/hooks.py:301'de scheduler, :361'de user_data_fields var. suite/hooks.py user_data_fields tanımlamıyor.
- suite/suite/**/headless_provider/**; arama `(?i)restore|tombstone|purge|erasure|deletion|redact`: Yalnızca api.py:719'da istek bağlamının geri yüklenmesine dair bir yorum var; silme veya restore yönetişimi yok.
- frappe/, suite/ (*.py); arama `(?i)(reindex|rebuild_index|remove_from_index|delete_from_index|vector|embedding).*(delet|purge|restore)|on_restore|restored_from_backup|backup_restored`: Eşleşme yok; arama veya RAG kopyalarını restore sonrası temizleyen bir kod bulunmadı.

Sınır: Yalnızca dışa aktarılmış frappe ve suite kaynağı okundu (frappe commit adf1fd0c, suite commit bilinmiyor). Hiçbir komut veya test çalıştırılmadı; functionalAcceptance not_run.; Kaynak, kod varlığını kanıtlar; dağıtılmış operasyonları, yedek saklama politikasını veya GDPR uyumunu kanıtlamaz.; bench CLI (frappe dışı bench paketi) ve harici yedek/altyapı betikleri kapsam dışında kaldı.; ERPNext/HRMS kurulu değil, değerlendirilmedi.; Suite'in Vue frontend'i ve Meet SFU'nun kalıcı ID deposu Frappe tombstone'u olarak kullanılamaz; ayrıntılı incelenmedi.

Temporal workflow: `saas-recheck-20261015t073528z-008`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### security-1 — Security management (güvenlik yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var: varlık, tehdit, kontrol ve sorumlu listesi isteniyor. Ancak tehdit modeli, Keycloak→Frappe oturum/token sınırı ve v17-dev sürüm eşlemesi tanımlı değil. Kaynakta tekil kontroller görülüyor: DocType izinleri, server script'in yalnız common_site_config ile açılması, realtime origin kontrolü. Suite çekirdek şifre güncelleme metodunu override ediyor ve allowlist'te test_helpers önekini bulunduruyor. Bunlar kontrol envanterine girmeli.

Eksik: Varlık/tehdit/kontrol matrisi ve her kontrolün sahibi (Hüseyin Cengiz / backend) yazılmamış.; Keycloak OIDC ile Frappe session/API key/OAuth bearer arasındaki kimlik eşlemesi ve oturum iptali tanımsız.; Suite override_whitelisted_methods (update_password) ve ALLOWED_WILDCARD_PATHS içindeki test_helpers öneki güvenlik incelemesine bağlanmamış.; Kaynak dokümanlar genel; yerel v17.0.0.dev0 kaynak commit'iyle eşleme yok.

Sonraki adım önerisi: security-baseline--implementation altında tek bir kontrol matrisi oluşturulsun. Mevcut kaynak kontrolleri (has_permission, safe_exec kapısı, rate limit, realtime origin, __Auth şifreleme) tehditlere eşlensin. Suite override'ları ve test_helpers allowlist'i karar maddesi olarak eklensin. Bütçe içinde en fazla 1-2 kritik kontrol için doğrulama koşulu seçilsin.

Mevcut birincil görev: `security-baseline--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/utils/safe_exec.py:87`; `frappe/realtime/middlewares/authenticate.js:21`; `suite/suite/hooks.py:203`; `suite/suite/hooks.py:450`.

#### security-2 — WAF (Web Application Firewall — web uygulaması güvenlik duvarı).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

WAF motoru veya kural seti kaynakta yok; yalnızca uygulama katmanında kötüye kullanıma karşı bazı yapı taşları (primitive) var, bunların hepsi upstream/Suite'e ait. (1) Frappe global hız sınırlayıcı: hooks.py içinde before_request'e bağlanmış. site config'teki rate_limit ile süre tabanlı bütçe uyguluyor, aşımda 429 ve Retry-After/X-RateLimit-* başlıkları dönüyor. (2) Frappe @rate_limit dekoratörü: endpoint bazında IP'ye ya da kullanıcıya göre sayaç tutuyor. (3) Frappe User restrict_ip: validate_ip_address ile IP öneki allowlist'i uyguluyor, 2FA ile bypass seçeneği var. (4) Suite 'Rate Limit' DocType ve @dynamic_rate_limit dekoratörü: metot yolu bazında DB'den okunan limit, allowed_ips/blocked_ips önek listeleri ve enabled bayrağı var. Kayıt devre dışı bırakılarak kural geri alınabiliyor. Meet ve diğer API'ler kullanıyor. İstemci IP'si X-Forwarded-For başlığının ilk değerinden alınıyor, yani proxy/WAF topolojisine bağımlı. Yerel pilot suite/headless_provider'da WAF/rate-limit kodu bulunamadı. Repoda gelen deploy örnekleri (sheets nginx snippet, meet Caddyfile) yalnızca yönlendirme/proxy içeriyor, WAF kuralı yok. Runtime functionalAcceptance: not_run.

Eksik: HTTP istek gövdesi, başlık ve URL için imza/anomali tabanlı saldırı tespiti (SQLi/XSS/OWASP CRS benzeri) yok; mevcut primitive'ler sadece hız sınırı ve IP öneki filtresi.; Edge/CDN/ingress WAF ürünü ve topolojisi seçilmemiş (sahibi Hüseyin Cengiz); kaynak kapsamı dışında.; WAF'ın geçirmesi gereken route/fiil envanteri yok: /api/method, /api/v2, OAuth2 token uçları, Keycloak callback, /dav (PROPFIND vb.), socket.io, mail outbound/redirect.; Güvenilir proxy doğrulaması yok: request_ip, X-Forwarded-For'un ilk değerinden koşulsuz alınıyor. Edge bu başlığı ezmezse IP tabanlı limitler ve blocked_ips sahte başlıkla atlatılabilir (kaynak okumasına dayalı çıkarım).; Yanlış pozitif geri alma prosedürü, WAF log/izleme kanalı ve 'örnek saldırı bloklanır, meşru API ve Keycloak geçer' kabul testi tanımsız ve çalıştırılmadı.

Sonraki somut adım: Sıra önerisi: (1) edge-abuse--contract kapsamında, frappe/api/v1.py url_rules, api/v2 ve suite/hooks.py'deki allowlist/redirect girdilerinden route+HTTP fiili istisna listesi çıkarılır (OAuth2/Keycloak, /dav WebDAV fiilleri ve socket.io dahil). Ek olarak edge'in X-Forwarded-For başlığını ezme/güvenilir proxy sözleşmesi yazılır. (2) Hüseyin Cengiz, devir notunda WAF ürününü ve konumunu (CDN veya nginx/ingress), log kanalını ve kural geri alma yöntemini karara bağlar. (3) edge-abuse--implementation'da tek dar davranış ele alınır: staging'de bir örnek saldırı kuralının bloklandığı, /api/method ve Keycloak callback'in geçtiği RED/GREEN kabul senaryosu, production değişikliği yapılmadan. Uygulama katmanındaki Suite Rate Limit/blocked_ips ve Frappe rate_limit ikinci savunma hattı olarak korunur; WAF yerine sayılmaz.

Önerilen bağımlılık/sıra: edge-abuse--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `edge-abuse--implementation`.

Kaynak kanıtı:

- `frappe/frappe/hooks.py:500` — `"frappe.rate_limiter.apply",`
- `frappe/frappe/rate_limiter.py:101` — `return Response(_("Too Many Requests"), status=429)`
- `suite/suite/utils/rate_limiter.py:49` — `elif any(request_ip.startswith(prefix) for prefix in rl["blocked_ips"]):`
- `frappe/frappe/auth.py:66` — `frappe.local.request_ip = (frappe.get_request_header("X-Forwarded-For").split(",", 1)[0]).strip()`
- `frappe/frappe/auth.py:512` — `_("Access not allowed from this IP Address") + f": {frappe.local.request_ip}",`
- `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:126` — `.where((RATE_LIMIT.enabled == 1) & (RATE_LIMIT.method_path == method_path))`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, svg/min.js/map/po/pot/csv/lock hariç); arama `(?i)\b(waf|web application firewall|modsecurity|owasp crs|coraza|cloudflare)\b`: WAF uygulaması yok; eşleşmeler yalnızca build edilmiş frontend asset'leri ve .gitignore'daki 'node-waf' yorumları.
- source/ (*.py); arama `(?i)(rate_limit|ratelimit|ip_restrict|restrict_ip|allowed_ip|blocked_ip|ip_blacklist|ip_whitelist|deny_list|block_ip)`: 60+ dosya: frappe rate_limiter.py, auth.py, hooks.py, oauth2.py, www/login.py; suite rate_limit DocType, utils/rate_limiter.py, mail/meet/drive API'leri.
- frappe/frappe/{app.py,auth.py,rate_limiter.py,sessions.py}; arama `(?i)(def validate_ip_address|restrict_ip|def rate_limit|class RateLimiter|def apply\(|X-Forwarded-For|get_ip_address)`: RateLimiter sınıfı, rate_limit dekoratörü, validate_ip_address ve X-Forwarded-For'dan request_ip türetimi okundu.
- suite/suite/{headless_provider/**,hooks.py,suite_core/doctype/rate_limit/rate_limit.py}; arama `(?i)(waf|firewall|rate.?limit|ip.?(allow|block|deny)|abuse)`: Yalnızca Suite Rate Limit DocType eşleşti; yerel pilot headless_provider ve hooks.py'de eşleşme yok.
- suite/suite (tests hariç); arama `(?i)(dynamic_rate_limit|blocked_ips|allowed_ips)`: utils/rate_limiter.py dinamik limit ve IP blok/izin uyguluyor; meet API ve meet_room kullanıyor.
- source/; arama `glob **/{nginx*.conf,*nginx*,*ingress*,Caddyfile,traefik*}`: sheets/collab-server nginx snippet ile 2 meet Caddyfile bulundu; deny/limit_req/modsecurity/waf aramasında WAF kuralı yok.
- frappe/frappe; arama `rate_limiter\.apply\(\)|frappe\.rate_limiter\.apply`: hooks.py:500 before_request kaydı; app.py:270-271 başlık ekleme, app.py:413 429 yanıtı.

Sınır: Sadece salt okunur kaynak analizi; komut, test, ağ veya runtime doğrulaması yapılmadı. functionalAcceptance: not_run.; WAF bir edge/harici altyapı yeteneği; CDN, ingress ve production nginx yapılandırmaları kaynak kapsamında değil, dağıtılmış durum kanıtlanamaz.; Site config (rate_limit değerleri) ve DB'deki Rate Limit kayıtları yok; limitlerin etkin olup olmadığı bilinmiyor.; X-Forwarded-For atlatma riski kaynak okumasına dayalı bir çıkarım, çalıştırılarak doğrulanmadı.; Ürün DONE ya da yüzde iddiası yok; ERPNext/HRMS kapsam dışı.

Temporal workflow: `saas-recheck-20261015t073528z-037`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### security-3 — Bot ve scraping (otomatik veri toplama) engelleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Rate limit'in tek başına yetmediği doğru belirtilmiş. Ancak sinyal listesi, izinli bot/entegrasyon istisnaları ve proxy arkasında gerçek IP güveni tanımlı değil. Kaynakta IP/kullanıcı tabanlı uç sınırlama, Suite'in IP allow/block listesi ve WebDAV kilitleme mekanizması var. Suite IP eşleşmesi CIDR değil, string startswith ile yapılıyor. Liste uç noktası istemcinin belirlediği limit_page_length değerini kabul ediyor; bu, scraping hacmini etkiler.

Eksik: Bot sinyalleri (UA, davranış, challenge) ve izinli arama botu/entegrasyon politikası seçilmemiş.; request_ip'nin proxy arkasında hangi başlıktan güvenilir türetileceği tanımsız. IP tabanlı limitlerin tamamı buna bağlı.; Suite blocked/allowed_ips önek eşleşmesi CIDR değil; yanlış eşleşme riski belgelenmemiş.; /api/resource liste uçlarında sayfa boyutu üst sınırı ve scraping eşiği tanımsız.

Sonraki adım önerisi: edge-abuse--implementation altında edge bot politikası ile uygulama içi sınırlar ayrılsın. Uygulama tarafında mevcut rate_limit(user_based/ip_based) ve Suite Rate Limit DocType'ı kullanılsın. Güvenilir proxy/IP başlığı kararı ve liste sayfa boyutu üst sınırı açık kabul maddesi olarak eklensin.

Mevcut birincil görev: `edge-abuse--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:111`; `suite/suite/utils/rate_limiter.py:47`; `suite/suite/drive/webdav/auth.py:31`; `frappe/frappe/api/v1.py:22`.

#### security-4 — Rate limit (istek hızını sınırlandırma).

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Global limiter kaynakta native: conf.rate_limit {limit, window}, sabit pencere, süreye (mikrosaniye) dayalı sayaç, reddedildiğinde 429 ve Retry-After. Talimat ise üç ayrı mekanizmayı ayırmıyor: global limiter, uç dekoratörü (v17'de user_based var; 'kullanıcı başına değildir' notu yalnız global limiter için doğru) ve Suite Rate Limit DocType. Dekoratör RateLimitExceededError fırlatıyor; Retry-After eklediği görülmüyor. Suite limitleri developer_mode'da varsayılan olarak atlanıyor.

Eksik: Kabul metni yalnız global limiter'a uyuyor; dekoratör/Suite yolunda Retry-After beklentisi kaynakla doğrulanmamış.; Hangi uçların dekoratör veya Suite Rate Limit kaydı alacağı ve eşik değerleri tanımsız.; ignore_in_developer_mode varsayılanı nedeniyle yerel testte limitin atlanabileceği belirtilmemiş.; create_rate_limit ignore_permissions kullanıyor; yalnız iç kurulum yardımcısı olarak kalmalı, headless API'ye açılmamalı.

Sonraki adım önerisi: rate-limit--implementation kabul metni üç mekanizmaya bölünsün: global (429 + Retry-After), dekoratör (RateLimitExceededError; başlık beklentisi ayrı) ve Suite DocType. Eşikler site_config ve Rate Limit kayıtlarıyla yapılandırılsın. Ortak bütçedeki tek senaryo developer_mode kapalı bir ortamda planlansın.

Mevcut birincil görev: `rate-limit--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:16`; `frappe/frappe/rate_limiter.py:79`; `frappe/frappe/rate_limiter.py:89`; `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:186`; `suite/suite/utils/rate_limiter.py:37`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`.

#### security-5 — Gizli anahtar kasası, erişim kapsamı, yenileme ve iptal.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Vault ve rotasyonun harici sorumluluk olduğu doğru tespit edilmiş. Ancak kaynakta dağınık sır konumları var ve bunların envanteri yok: __Auth içinde Fernet ile şifrelenen alanlar, site_config'te <provider>_login ve recorder_secret, Redis'te socketio secret, SFU jwtSecret, hash'lenen OAuth bearer token'lar. WebDAV kimlik önbelleği 600 sn TTL'li. 'Eski kimlik bilgisi çalışmasın' kabulü için önbelleğin rotasyonda temizlenip temizlenmediği doğrulanmalı.

Eksik: Sır envanteri (konum, sahip, rotasyon yöntemi) yok: encryption_key, recorder_secret, socketio secret, Social Login Key/Keycloak client secret, User api_secret, SFU JWT secret.; encryption_key döndürüldüğünde __Auth değerlerinin yeniden şifrelenmesi prosedürü tanımsız.; WebDAV CRED_CACHE_TTL=600 ile şifre değişikliği sonrası eski şifrenin önbellekte geçerli kalıp kalmadığı doğrulanmamış.; Vault ile Frappe arasındaki enjeksiyon sınırı (site_config üretimi, servis kimliği) seçilmemiş.

Sonraki adım önerisi: secret-lifecycle--implementation için kaynaktan türetilen sır envanteri tablosu hazırlansın; değerler yazılmasın. Her sır için rotasyon ve iptal yolu ile servis erişim kapsamı belirlensin. Vault entegrasyonu Hüseyin Cengiz'e teknik devir olarak tanımlansın. WebDAV önbelleğinin iptal davranışı açık kabul maddesi olsun.

Mevcut birincil görev: `secret-lifecycle--implementation`. Kaynak: `frappe/frappe/utils/password.py:38`; `frappe/frappe/utils/oauth.py:142`; `suite/suite/meet/recording/callback_auth.py:359`; `frappe/frappe/realtime/auth.py:109`; `suite/suite/drive/webdav/auth.py:28`; `frappe/frappe/patches/v16_0/hash_oauth_bearer_tokens.py:13`.

#### security-6 — Aktarımda/depolamada şifreleme ve hassas alan koruması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam doğru ayrılmış: TLS harici, at-rest ayrı tasarım, deneysel masking hariç. Kaynakta şunlar var: tekil dokümanda alan düzeyi okuma izni (apply_fieldlevel_read_permissions), permlevel tabanlı izin, şifre hash'leme ve __Auth Fernet şifrelemesi. 'Hassas alan API/rapor yanıtında görünmesin' kabulü bu yolların hepsini kapsamıyor; liste, get_value, rapor ve expand_links yollarında permlevel uygulaması görülen kesitte doğrulanamıyor. Drive'ın S3 (boto3) dosya deposu at-rest şifrelemesi tanımsız.

Eksik: Hassas alan sınıflandırması ve permlevel ataması (Custom Field/Property Setter ile) tanımsız.; Kabul yalnız read_doc'u değil get_list, get_value, report ve expand_links yollarını da açıkça saymalı.; MariaDB at-rest, yedek ve S3/Drive dosya şifrelemesi için seçim ve sahip yok.; TLS sonlandırma noktası ve iç trafik (realtime→web loopback, recorder/SFU) şifreleme kararı yok.

Sonraki adım önerisi: encryption-profile--implementation altında hassas alanlar native permlevel ile korunsun; kopya ORM yazılmasın. Kabul metnine yanıt yolu listesi eklensin. TLS, DB ve S3 at-rest seçimleri Hüseyin Cengiz'e teknik devir olarak yazılsın.

Mevcut birincil görev: `encryption-profile--implementation`. Kaynak: `frappe/frappe/api/v1.py:84`; `frappe/frappe/permissions.py:322`; `frappe/frappe/client.py:134`; `frappe/frappe/utils/password.py:4`; `suite/pyproject.toml:15`.

#### security-7 — Girdi/çıktı güvenliği, güvenlik başlıkları ve oturum koruması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve sahip tanımlı. Kaynakta yerel güvenlik yapı taşları var: okuma yetkisi ve alan düzeyi okuma filtresi, update sırasında flags'in atılması, SSRF engeli, realtime origin kontrolü, nh3 bağımlılığı ve oturum kapatma parametresi. Kabul metni ise hangi zararlı girdi/çıktı örneklerinin, hangi başlıkların (CSP/HSTS/CORS/frame) ve hangi Keycloak iptal yolunun sınanacağını belirtmiyor.

Eksik: Başlık politikası tanımsız. Bu politikayı Frappe mi, edge mi, Vite/Tauri kabuğu mu uygulayacak, belli değil. Başlık üreten kaynak bu alıntıda görünmüyor.; Keycloak oturum/token iptalinin (backchannel logout, introspection, token ömrü) Frappe sid/OAuth Bearer Token iptaline nasıl yansıyacağı yazılmamış.; Özel /api/v2/method uç noktaları için girdi şeması ve çıktı alan filtresi sözleşmesi yok. Yerel apply_fieldlevel_read_permissions özel metotlara otomatik uygulanmıyor.; Frappe v17.0.0.dev0 ile kaynak commit adf1fd0c eşlemesi kabul metnine bağlanmamış.

Sonraki adım önerisi: security-baseline--implementation altında tek bir sözleşme sayfası yazılmalı: başlık listesi ve bu başlıkların hangi katmanda uygulanacağı, Keycloak logout → Frappe oturum/Bearer token iptali eşlemesi, ve özel metotlarda yerel check_permission/apply_fieldlevel_read_permissions kullanımı zorunluluğu. Ortak bütçeden en fazla bir senaryo seçilmeli: oturum iptalinden sonra API'nin 401/403 dönmesi.

Mevcut birincil görev: `security-baseline--implementation`. Kaynak: `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v1.py:57`; `frappe/frappe/utils/safe_exec.py:388`; `frappe/realtime/middlewares/authenticate.js:21`; `frappe/pyproject.toml:47`; `frappe/frappe/utils/password.py:143`.

#### security-8 — Kullanıcı/kiracı/istemci bazlı hız sınırı ve kötüye kullanım sinyalleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe'de iki mekanizma var: site düzeyinde sayaç ve endpoint başına key/IP/user_based decorator. Suite'te ayrıca Rate Limit DocType'ıyla dinamik sınırlama ve IP allow/block listesi bulunuyor. Kabul metnindeki 'tenant' ve 'istemci kimliği' ise kaynakta karşılığı olan bir anahtara bağlanmamış.

Eksik: İş tenantı ile Frappe sitesi arasındaki ayrım tanımsız. Site sayacı make_key ile site başına ayrılıyor, ama bir site içindeki iş tenantlarını ayırmıyor.; rate_limit key değeri istemcinin gönderdiği form_dict'ten okunuyor. Bu yüzden değiştirilmiş istemci kimliğiyle sınır aşılabilir. İstemci kimliği OAuth client_id veya Keycloak azp gibi doğrulanmış bir claim'den türetilmeli.; Suite dynamic_rate_limit user_based parametresini geçirmiyor. Allowed/blocked IP eşleşmesi startswith ile yapılıyor (CIDR değil). Bu, örneğin '10.1' öneki ile '10.10.x' adreslerinin de eşleşmesi riskini doğuruyor.; Kötüye kullanım sinyallerinin (429 sayısı, lockout, auth failure telemetrisi) nereye toplanacağı ve Cloudflare/edge ile iş bölümü yazılmamış.; request_ip'nin hangi proxy başlığına güvenerek belirlendiği bu alıntıda görünmüyor.

Sonraki adım önerisi: rate-limit--implementation için tek bir kimlik anahtarı kararı yazılmalı: sınır doğrulanmış kullanıcı + tenant + client claim'inden hesaplansın, form_dict key'i kimlik olarak kullanılmasın. Suite dynamic_rate_limit'e user_based geçişi ve IP önekinin CIDR olarak doğrulanması genişletme olarak tanımlanmalı. Edge'de ne yapılacağı ayrı bir maddeye yazılmalı.

Mevcut birincil görev: `rate-limit--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:55`; `frappe/frappe/rate_limiter.py:150`; `frappe/frappe/rate_limiter.py:111`; `suite/suite/utils/rate_limiter.py:47`; `suite/suite/utils/rate_limiter.py:62`; `suite/suite/drive/webdav/auth.py:31`.

#### security-9 — Güvenlik olayı kaydı, inceleme, müdahale ve kontrollü erişim engeli.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta sinyal ve engelleme yapı taşları var: Rate Limit blocked_ips (cache temizlendiği için hemen etkili), WebDAV lockout, SFU authEvents telemetrisi ve kullanıcı devre dışı bırakıldığında oturumların temizlenmesi. Vaka kaydı, onay, gerekçe ve geri alma modeli ise ne kaynakta ne talimatta tanımlı.

Eksik: Güvenlik olayı vakası için veri modeli tanımsız: önem, sorumlu, durum, kanıt bağlantısı. Activity/Access/Error Log kaynakları bu alıntıda görünmüyor.; Kontrollü erişim engellemenin hangi katmanda olacağı belirtilmemiş: Rate Limit blocked_ips mi, kullanıcı devre dışı bırakma mı, Keycloak oturum iptali mi, edge WAF mı. Onay ve geri alma kaydı da yok.; Rate Limit IP engeli method bazlı. Kabul metninde istenen gerekçe ve geri alma alanları görülen validate akışında yok.

Sonraki adım önerisi: security-incident--implementation için yerel kayıtları vaka girdisi olarak kullanan tek bir vaka sözleşmesi yazılmalı. Engelleme aksiyonları mevcut mekanizmalara eşlenmeli: User enabled=0 → clear_sessions_on_disable, Rate Limit blocked_ips, Keycloak session revoke. Her aksiyon için gerekçe, onaylayan ve geri alma adımı zorunlu alan olmalı.

Mevcut birincil görev: `security-incident--implementation`. Kaynak: `suite/suite/utils/rate_limiter.py:52`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:80`; `suite/suite/hooks.py:261`; `suite/suite/drive/webdav/auth.py:49`; `suite/suite/meet/sfu-server/src/server/handlers/AuthHandlers.ts:18`.

#### security-10 — Kiracıya özel şifreleme anahtarı ve anahtar sürümü; döndürme, iptal ve kurtarma yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe, __Auth tablosundaki şifreli alanlar için Fernet tabanlı genel şifreleme sağlıyor. Kaynakta kiracıya özel anahtar, anahtar sürümü, döndürme veya KMS entegrasyonu görünmüyor. Talimat koşullu kapsamı ve kabul metnini iyi tanımlıyor. Ancak KMS sağlayıcısı, şifrelenecek veri sınıfları ve 'tenant'ın site mi iş tenantı mı olduğu belirsiz.

Eksik: Kiracı tanımı (site mi, site içindeki iş tenantı mı) ve buna bağlı anahtar kapsamı belirsiz.; Hangi verilerin kiracı anahtarıyla şifreleneceği belirtilmemiş: yalnız Password alanları mı, dosya/Drive S3 nesneleri mi, DB yedekleri mi.; KMS/eşdeğer sağlayıcı seçimi, anahtar sürüm etiketinin şifreli veride nerede tutulacağı ve yedek çözme zinciri tanımsız.; Etkinleştirme koşulu (hangi müşteri sözleşmesi veya veri hassasiyeti eşiği) ölçülebilir değil.

Sonraki adım önerisi: tenant-key--implementation için önce bir karar notu yazılmalı: kiracı = ? ve kapsam = hangi veri sınıfları. DevOps (Hüseyin Cengiz) hedef ortamda KMS/eşdeğer sağlayıcıyı ve yedek çözme zincirini belirlemeli. Frappe'nin site encryption_key/Fernet mekanizması genel koruma olarak kalmalı, yerine kopya bir şifreleme katmanı yazılmamalı.

Mevcut birincil görev: `tenant-key--implementation`. Kaynak: `frappe/frappe/utils/password.py:4`; `frappe/frappe/utils/password.py:62`; `frappe/frappe/utils/password.py:38`.

#### security-11 — Kaynak kodu, bağımlılık ve dağıtım imajlarında güvenlik açığı taraması; bulgu önceliği ve düzeltme takibi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kaynakta upstream CI düzeyinde gerçek tarama adımları var. Frappe linters.yml, PR'larda Semgrep (frappe-semgrep-rules ve r/python.lang.correctness) çalıştırıyor. Aynı dosyada pip-audit adımı da var; üç zafiyet kimliği için satır içi yorumlu ama süresiz istisna tanımlı. Frappe dependabot.yml yalnızca github-actions ekosistemini haftalık izliyor. Suite suite-linter.yml, PR'larda ve gece cron'unda Semgrep ile pip-audit çalıştırıyor. Kök, sfu-server ve recorder-server için 'yarn audit --groups dependencies --level high' adımı da çalışıyor. Ancak bu adım continue-on-error olduğundan yalnızca kanıt üretiyor ve yayını durdurmuyor; çıktısı 30 günlük artifact olarak saklanıyor. Frappe boilerplate.py, yeni uygulamalar için aynı Semgrep/pip-audit linter şablonunu üretiyor. Bunların hepsi upstream-native CI yapılandırması. Yerel pilot suite/suite/headless_provider (api.py, local_fixture.py, **init**.py) içinde güvenlik veya taramayla ilgili kod yok.

Eksik: Dağıtım/konteyner imajı taraması yok. meet-sfu-build, meet-recorder-build, meet-stt-build ve arc-runner-image imajları docker/build-push-action ile taranmadan GHCR'ye push ediliyor. Trivy, Grype, SBOM, attestation veya cosign bulunmadı.; Secret taraması (gitleaks, trufflehog, detect-secrets) iki uygulamada da bulunmadı.; JS bağımlılık denetimi eksik. Suite'te sheets/collab-server (package-lock.json) ve stt-server audit kapsamı dışında. Frappe'nin kendi yarn.lock dosyaları için audit adımı yok. Suite'teki yarn audit continue-on-error olduğu için yayını bloklamıyor.; Önem eşiği politikası (blokla/uyar), istisnanın en uzun süresi ve onaylayan kişi tanımlı değil. pip-audit istisnaları yalnızca CLI bayrağı ve yorumdan ibaret.; Bulgu önceliklendirme ve düzeltme takibi için DocType, API veya kayıt mekanizması yok. Giderilen bulgunun yeniden kontrol kanıtı da yok.; Bilinen zafiyet örneğinin yakalandığına ve eşiğin yayını durdurduğuna dair kabul kanıtı yok. Upstream GitHub workflow'larının SaaS'ın kendi CI'ında çalıştığı kaynaktan kanıtlanamaz. functionalAcceptance: not_run.

Sonraki somut adım: Mevcut vulnerability-scan--contract bağımlılığı sırasıyla ilerlenmeli. 1) Sözleşmede tek bir politika tanımlanmalı: önem→blokla/uyar eşiği (ör. high/critical blokla), istisna için en uzun süre, sahibi ve yeniden kontrol kuralı. Kapsam satırları ayrı olmalı: Frappe app, Suite app, sfu-server, stt-server, recorder-server, collab-server ve dağıtım imajları. 2) vulnerability-scan--implementation'da en küçük adım: mevcut pip-audit/semgrep/yarn audit adımları SaaS CI'ında yeniden kullanılmalı. Suite'teki yarn audit için continue-on-error kaldırılarak eşik bloklayıcı yapılmalı. Ardından collab-server/stt-server audit'i, imaj build'lerinden sonra imaj taraması ve secret taraması eklenmeli. Bilinen zafiyetli bir fixture ile RED/GREEN kanıtı toplanmalı. 3) İstisnalar süreli bir kayıt dosyasına taşınmalı, bulgu takibi ise CI artifact'ı veya issue ile bağlanmalı. CI teknik kurulumu Hüseyin Cengiz'e devredilmeli.

Önerilen bağımlılık/sıra: vulnerability-scan--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `vulnerability-scan--implementation`.

Kaynak kanıtı:

- `frappe/.github/workflows/linters.yml:72` — `semgrep ci --config ./frappe-semgrep-rules/rules --config r/python.lang.correctness`
- `frappe/.github/workflows/linters.yml:99` — `pip-audit --desc on --ignore-vuln PYSEC-2023-312 --ignore-vuln CVE-2026-4539 --ignore-vuln CVE-2025-26240 .`
- `suite/.github/workflows/suite-linter.yml:87` — `pip-audit --desc on .`
- `suite/.github/workflows/suite-linter.yml:124` — `continue-on-error: true`
- `suite/.github/workflows/suite-linter.yml:128` — `yarn audit --groups dependencies --level high 2>&1 | tee test-results/yarn-audit.txt || status=1`
- `suite/.github/workflows/meet-sfu-build.yml:55` — `uses: docker/build-push-action@v6`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (tüm kaynak kökü); arama `(?i)(semgrep|bandit|codeql|pip-audit|safety check|trivy|grype|snyk|dependabot|osv-scanner|npm audit|yarn audit|gitleaks|trufflehog|vulnerabilit)`: Çoğu eşleşme nosemgrep yorumu veya locale dosyası. Davranışsal eşleşmeler yalnızca CI workflow'larında ve boilerplate şablonunda bulundu.
- frappe/.github; arama `(?i)(semgrep|bandit|codeql|pip-audit|trivy|grype|snyk|osv|audit|gitleaks|trufflehog|security|dependency-review)`: linters.yml içinde Semgrep (PR) ve pip-audit bulundu; pip-audit'te 3 ignore-vuln istisnası var. CodeQL, imaj ve secret taraması yok.
- suite/.github; arama `(?i)(semgrep|bandit|codeql|pip-audit|trivy|grype|snyk|osv|audit|gitleaks|trufflehog|security|dependency-review|dependabot)`: suite-linter.yml içinde Semgrep, pip-audit ve yarn audit (continue-on-error) bulundu. Dependabot, imaj ve secret taraması yok.
- suite/.github/workflows; arama `(?i)(scan|sbom|provenance|attest|cosign|docker/build-push|cve)`: Dört imaj workflow'u build-push-action kullanıyor; hiçbirinde tarama, SBOM veya imza adımı yok.
- suite (**/*.{py,json,ts,js,vue,toml,yaml,yml,md}); arama `(?i)(vulnerab|cve-|remediation|security_finding|security finding|pip-audit|semgrep)`: Eşleşmeler yalnızca suite-linter.yml, README güvenlik bildirim linki ve lock.py içindeki nosemgrep yorumu. Bulgu takip DocType'ı veya API'si yok.
- suite/suite/headless_provider; arama `(?i)(security|vulnerab|scan|audit)`: Eşleşme yok; yerel pilot kodda tarama ilgisi bulunmuyor.
- frappe/frappe/utils/boilerplate.py, frappe|suite .pre-commit-config.yaml, pyproject.toml; arama `(?i)(pip-audit|semgrep|gitleaks|detect-secrets|detect-private-key|bandit|ruleset|"S")`: Yalnızca boilerplate.py'deki linter şablonu (Semgrep ve pip-audit) eşleşti. Pre-commit yapılandırmalarında secret veya bandit kancası yok.

Sınır: Kaynak, CI yapılandırmasının varlığını kanıtlar; workflow'ların çalıştığını, sonuçlarını veya SaaS CI'ında kullanıldığını kanıtlamaz. functionalAcceptance: not_run.; Uzak frappe/semgrep-rules deposu ve GitHub tarafındaki secret scanning/Dependabot alerts gibi repo ayarları kaynak dışında; değerlendirilmedi.; Suite commit'i bilinmiyor. ERPNext/HRMS kurulu değil, değerlendirilmedi.; Test, komut veya ağ işlemi çalıştırılmadı; yalnızca Read, Glob ve Grep kullanıldı.

Temporal workflow: `saas-recheck-20261015t073528z-038`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### security-12 — Risk temelli penetrasyon testi; kapsam, bağımsız bulgu, düzeltme ve yeniden test kanıtı.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynağında penetrasyon testi kapsamı, bağımsız bulgu kaydı, önem/sorumlu ataması, düzeltme takibi ya da yeniden test kanıtı modeli bulunmuyor. Yakın ama bu maddeyi karşılamayan upstream-native kontroller şunlar: (1) CI'da Semgrep SAST ve pip-audit/yarn audit bağımlılık taraması var (frappe linters.yml, suite suite-linter.yml). Bunlar statik ve bağımlılık analizidir, pentest değildir; suite'teki yarn audit adımı continue-on-error olduğu için CI'ı durdurmaz. (2) Security Settings DocType'ı security.txt ile zafiyet bildirim kanalı sunuyor; bu bir bildirim girişi, bulgu ya da vaka yönetimi değil. (3) suite.meet.api.test_helpers uçları whitelist_for_tests ile korunuyor. Bu kapı frappe.in_test, dev server ile allow_tests birleşimi veya CI ortam değişkeni olduğunda açılıyor. Uç, hooks.py içindeki izinli wildcard listesinde de yer alıyor; bu yüzden pentest kapsamında ön koşul olarak doğrulanması gereken bir yüzey. Sheets'teki test_api_security.py yalnızca mock tabanlı yetki şekli testleri; bağımsız güvenlik testi kanıtı sayılmaz. suite/headless_provider LOCAL PILOT eki; whitelisted RPC uçları ekliyor (test edilecek yeni bir yüzey), pentest işlevi içermiyor.

Eksik: Onaylı pentest kapsam/kural belgesi: ortam, production hariç tutma, onaylayan kişi, tetikleme koşulu; Bağımsız bulgu kaydı: önem, sorumlu, durum, kanıt; security-9 vaka modeliyle ve security-11 takibiyle bağlantısı; Kritik bulgu için zorunlu bağımsız yeniden test ve kapanış kanıtı; Kaynaktan çıkan öncelikli hedeflerin kapsam satırlarına bağlanması: /api/method ve /api/v2 genel RPC, X-Frappe-Site-Name ile site seçimi, test_helpers wildcard izni ve CI ortam değişkeni kapısı, headless_provider whitelisted uçları, recorder callback'leri; Tenant aşımı, yetki yükseltme ve oturum akışları için yetkili test senaryoları; Keycloak kimlik geçişi dahil

Sonraki somut adım: Sıra şöyle olmalı. Önce mevcut bağımlılık olan independent-pentest--contract tamamlanmalı: tek sayfalık kapsam belgesi, production dışı izole bir hedef ortam, onaylayan sahip ve kritik bulgu için bağımsız yeniden test kabul ölçütü yazılmalı. Ardından independent-pentest--implementation adımında test öncesi ön koşul kontrolü yapılmalı: hedef sitede allow_tests kapalı olmalı, CI ortam değişkeni bulunmamalı ve /api/v2/method/suite.meet.api.test_helpers.* çağrısı reddedilmeli. Daha sonra headless_provider uçları, X-Frappe-Site-Name ile site seçimi ve genel RPC rotası öncelikli kapsam satırları olarak test edilmeli. Bulgular security-9 vaka kaydına önem ve sorumluyla bağlanmalı. Kapanış ancak bağımsız yeniden test kanıtıyla yapılmalı. Kod tarafında yeni görev açılmıyor; Semgrep/pip-audit CI kontrolleri pentestin yerine geçmez, yalnızca tamamlayıcıdır.

Önerilen bağımlılık/sıra: independent-pentest--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `independent-pentest--implementation`.

Kaynak kanıtı:

- `frappe/.github/workflows/linters.yml:72` — `semgrep ci --config ./frappe-semgrep-rules/rules --config r/python.lang.correctness`
- `frappe/.github/workflows/linters.yml:99` — `pip-audit --desc on --ignore-vuln PYSEC-2023-312 --ignore-vuln CVE-2026-4539 --ignore-vuln CVE-2025-26240 .`
- `frappe/frappe/core/doctype/security_settings/security_settings.json:27` — `"description": "Website, email or phone where vulnerabilities can be reported. Defaults to \`https://security.frappe.io\`",`
- `frappe/frappe/tests/utils/__init__.py:29` — `frappe.in_test or (frappe._dev_server and frappe.conf.allow_tests) or os.environ.get("CI")`
- `suite/suite/meet/api/test_helpers.py:11` — `@whitelist_for_tests(methods=["POST"])`
- `suite/suite/hooks.py:450` — `"/api/v2/method/suite.meet.api.test_helpers.",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, tüm kök); arama `(?i)(pentest|penetration|security[ _-]?(audit|scan|test)|vulnerability|bandit|semgrep|codeql|zap|owasp)`: 121 dosya eşleşti; çoğu gürültü (dist bundle, locale, nosemgrep yorumları). Pentest uygulaması yok; anlamlı eşleşmeler CI Semgrep/pip-audit, SECURITY.md ve security_settings.
- source/ (dist, public/frontend, node_modules hariç); arama `(?i)(pentest|penetration[ _-]?test|re-?test|security[ _-]?finding|bug[ _-]?bounty|semgrep|bandit|codeql|zaproxy|owasp|vulnerab)`: Pentest, bulgu ya da yeniden test modeli yok. Yalnızca linters.yml/suite-linter.yml Semgrep ve pip-audit, README güvenlik bildirim linki ve security.txt açıklamaları bulundu.
- source/**/{SECURITY.md,.github/workflows/*.yml}; arama `glob`: frappe/SECURITY.md yalnızca harici bildirim politikasına link veriyor. Pentest workflow'u yok; frappe ve suite'te 37 workflow listelendi.
- source/ (*.py,json,js,ts,vue,md,yml); arama `(?i)(security[ _-]?finding|finding[ _-]?(severity|status|owner)|remediation|retest|re_test|vulnerability[ _-]?(report|case))`: İlgisiz test/util dosyaları ve security_settings.json eşleşti. Bulgu, önem veya düzeltme DocType'ı yok.
- suite/suite (public hariç); arama `test_helpers|allow_guest_prefix|ALLOWED.*PREFIX|developer_mode|allow_tests`: hooks.py:450 test_helpers wildcard izni; test_helpers.py whitelist_for_tests kullanıyor.
- suite/suite/headless_provider; arama `(?i)(pentest|security|finding|severity|retest|tenant|whitelist)`: LOCAL PILOT api.py'de 5 adet frappe.whitelist RPC ucu var; pentest işlevi yok, yalnızca test edilecek yüzey.
- frappe/frappe/tests/utils/**init**.py; arama `def whitelist_for_tests|allow_tests|in_test`: Test uçlarının kapısı in_test, dev_server+allow_tests veya CI ortam değişkeni. CI değişkeni bir ön koşul riski olarak kontrol edilmeli.
- frappe/frappe/core/doctype/security_settings/security_settings.json; arama `"(fieldname|label|description)"`: Yalnızca security.txt alanları var (contact, policy, expires); bulgu yönetimi yok.

Sınır: Kapsam yalnızca sourceRoot altındaki frappe ve suite kaynağı; ERPNext/HRMS, Keycloak ve harici pentest raporları kapsam dışında.; Pentest kaynak dışında yapılan bir faaliyettir; kaynak yalnızca test yüzeyini ve CI statik kontrollerini gösterebilir.; CI workflow dosyaları okundu ancak çalıştırılmadı; gerçek CI sonuçları ve production config'inde allow_tests/CI değerleri doğrulanamaz.; Testler yalnızca okundu, çalıştırılmadı; functionalAcceptance not_run.; suiteCommit bilinmiyor; headless_provider LOCAL PILOT ek kodu, upstream değil.; Ürün tamamlanma ya da uyumluluk iddiası yok.

Temporal workflow: `saas-recheck-20261015t073528z-039`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integrity-1 — Eşzamanlı düzenleme çakışması ve optimistic locking (kayıt sürümünü karşılaştırarak yazma).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net, ancak kaynak gösterimi version-15'e dayanıyor; yerel kurulum v17-dev. Alıntıda check_if_latest yok. Görünen kısım: v1/v2 update_doc kaydı for_update ile alıp istemci verisini doc.update ile birleştiriyor ve save çağırıyor. İstemci modified alanını göndermezse son yazan kazanır. client.set_value modified alanını yasaklıyor. Suite Writer, db.set_value yolunu kullanıyor ve TimestampMismatchError hatasını sessizce yutuyor.

Eksik: Headless yazma sözleşmesinde modified zorunlu değil; eksikse ret davranışı tanımlı değil.; TimestampMismatchError için HTTP 409/UI çakışma eşlemesi ve taslağı koruma adımı tanımlı değil.; Korumayı atlayan yollar listelenmemiş: db.set_value, client.set_value, Suite save_doc.; v17 check_if_latest davranışı yerel kaynakta doğrulanmamış.

Sonraki adım önerisi: record-integrity--implementation kapsamında önce v17 frappe/model/document.py içindeki check_if_latest davranışını oku. Ardından v2 PUT için 'modified zorunlu, uyuşmazlıkta 409 ve taslak korunur' sözleşmesini yaz. Bypass yollarını ui-provider-query bağımlılığı olarak işaretle. Insan bütçesinden tek senaryo kullan: eski modified ile ikinci yazım reddedilmeli.

Mevcut birincil görev: `record-integrity--implementation`. Kaynak: `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:228`; `frappe/frappe/client.py:202`; `suite/suite/writer/doctype/writer_document/writer_document.py:15`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`.

#### integrity-2 — Kayıt sürüm geçmişi, önceki sürümü görüntüleme ve kontrollü geri alma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: geri alma yeni sürüm oluşturmalı ve doğrulamayı atlamamalı. Çekirdek Version kaynağı alıntıda yok; yalnız document_follow içinde get_version kullanımı görünüyor. Suite Writer ve Sheets yalnız kendi uygulamalarına özgü sürümleme sunuyor. Sheets hücre farkı boş bir stub; Writer silinirken sürümleri de siliyor. Bunlar genel DocType geri alma kanıtı değildir.

Eksik: Hangi DocType'larda track_changes açık olacağı tanımlı değil.; Çocuk tablo, link ve submit edilmiş kayıtlarda geri alma kuralları yok.; Geri alma izni ve Version okuma izni ayrımı yapılmamış.; Suite'e özgü sürümlemenin genel çözüm olarak yeniden kullanılmayacağı belirtilmemiş.; v17 Version/Audit Trail eşlemesi yok.

Sonraki adım önerisi: native-version--implementation için v17 frappe/core/doctype/version kaynağını oku. Görüntülemeyi yalnız okuma izniyle sınırla. Geri almayı normal doc.save yoluyla yeni Version üreten bir önizleme/diff akışı olarak tanımla. Submit edilmiş kayıtları kapsam dışı bırak ve bunları integrity-5'e bağla.

Mevcut birincil görev: `native-version--implementation`. Kaynak: `frappe/frappe/desk/form/document_follow.py:110`; `suite/frontend/src/apps/sheets/services/versions.js:132`; `suite/frontend/src/apps/sheets/components/SheetEditor/useVersionHistory.js:211`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`.

#### integrity-3 — Mükerrer kayıt tespiti, birleştirme ve ilişkileri koruma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerelde rename_doc whitelisted ve merge parametresi alıyor. Ancak rename_doc.py alıntıda yok; link güncellemesinin v17'deki davranışı doğrulanmadı. Mükerrer tespiti, korunacak alanların seçimi ve çakışma kararı için hiçbir kaynak veya talimat yok. Görev post-MVP olarak doğru konumlanmış.

Eksik: DocType bazında mükerrer tespit kuralları tanımlı değil.; Birleştirmenin geri alınamazlığı, önizleme ve onay sınırı tanımlı değil.; Alan çakışmasında kullanıcı kararı sözleşmesi yok.; merge için gereken izin (allow_rename/write) v17'de eşlenmemiş.

Sonraki adım önerisi: MVP dışında tut. Post-MVP'de önce v17 frappe/model/rename_doc.py içindeki merge ve link güncelleme davranışını oku. Ardından bir DocType için alan çakışmalarını kullanıcıya sunan salt-okunur önizleme sözleşmesi yaz. Asıl birleştirme işlemi yalnız native rename_doc(merge=True) üzerinden yapılsın.

Mevcut birincil görev: `record-integrity--implementation-post-mvp`. Kaynak: `frappe/frappe/client.py:265`.

#### integrity-4 — Toplu işlemde kısmi başarı, iptal ve telafi sonucu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

v2 bulk_delete, öğe bazında deleted/failed sonucu ve eşik üstünde kuyruğa alma (202) sağlıyor; bu kısmi başarı için yerel bir model. Buna karşılık insert_many 200 ile sınırlı ve tek hatada tümüyle geri dönüyor. Kaynakta iptal semantiği görünmüyor. Webhook gibi dış etkiler için telafi modeli yok.

Eksik: Toplu güncelleme ve submit için öğe bazlı sonuç sözleşmesi yok.; Kuyruğa alınmış işte iptal ve 'yeni öğe başlamasın' davranışı tanımlı değil.; Tekrarlanabilirlik (idempotency) ve dış etki telafisi kaydı tanımlı değil.; bulk_operation_async_threshold yapılandırması ürün kararına bağlanmamış.

Sonraki adım önerisi: record-integrity--implementation-mvp kapsamında v2 bulk_delete sonuç şeklini (deleted/failed/total) tüm toplu işler için ortak sonuç sözleşmesi olarak benimse. İptali v17 background_jobs ve RQ iş durumu üzerinden doğrula. Telafiyi ilk aşamada yalnız izlenebilir kayıt olarak tanımla.

Mevcut birincil görev: `record-integrity--implementation-mvp`. Kaynak: `frappe/frappe/api/v2.py:282`; `frappe/frappe/api/v2.py:292`; `frappe/frappe/client.py:245`; `frappe/frappe/model/document.py:25`.

#### integrity-5 — Finansal ve kritik iş kayıtlarında değişmezlik ve düzeltme hareketi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Değerlendirme ERPNext Immutable Ledger'a dayanıyor, fakat ERPNext yerelde kurulu değil; finans defteri yerel bir özellik sayılamaz. Framework tarafında submit/cancel/amend hakları, is_submittable kontrolü ve DocStatus mevcut. Bu nedenle değişmezlik ve düzeltme için yalnız temel yapı taşları var.

Eksik: ERPNext olmadan hangi DocType'ların kritik ve submittable olacağı tanımlı değil.; Ters hareket ve gerekçe bağlantısı için domain modeli yok.; Submit sonrası düzenlenebilir alanlar ile db.set_value bypass riski ele alınmamış.; ERPNext gerekiyorsa kurulumu ayrı bir karar olarak işaretlenmemiş.

Sonraki adım önerisi: Önce karar ver: finans ERPNext ile mi gelecek? Bu bir kurulum kararıdır; şimdi yapma. ERPNext yoksa kritik DocType'ları is_submittable yap. Düzeltmeyi native cancel ve amend ile, ya da gerekçe linki olan ayrı bir ters kayıt DocType'ı ile tanımla.

Mevcut birincil görev: `record-integrity--implementation-mvp`. Kaynak: `frappe/frappe/permissions.py:160`; `frappe/frappe/permissions.py:22`; `frappe/frappe/model/document.py:28`.

#### integrity-6 — Silinen kayıtları kontrollü kurtarma; yetkili önizleme, saklama süresi, ilişki ve iş kuralı doğrulaması.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream-native v17 (adf1fd0) temel mevcut: frappe.delete_doc, delete_permanently=False iken add_to_deleted_document ile tüm belge JSON'unu (doc.as_json) Deleted Document'a yazıyor (model/delete_doc.py:240-261). Whitelisted restore(): yalnız System Manager (only_for), restored=1 ise DocumentAlreadyRestored ile çift kurtarmayı engelliyor; hedef DocType için create ve belge bazlı read izni denetliyor; doc.insert() ile normal validate/iş kuralı ve isim çakışması (insert) yolundan geçiriyor; iptal edilmiş belgeyi Draft'a çevirip workflow state'i temizliyor; owner/creation/modified meta verisini koruyor; 'restored X as Y' yorumu ile iz bırakıyor; new_name/restored alanlarını güncelliyor. bulk_restore restored/invalid/failed ayrımı ve satır bazlı rollback yapıyor. DocType izinleri yalnız System Manager read/delete/export; Data alanı read-only Code olarak Desk'te ham JSON görüntüsü sağlıyor. Saklama: DeletedDocument.clear_old_logs(days=180) Log Settings arayüzüne uyuyor ancak frappe/hooks.py default_log_clearing_doctypes listesinde Deleted Document yok; yani otomatik temizlik ancak Log Settings'e elle kaydedilirse çalışır. Suite (upstream-native app kodu, Vue frontend): Sheets kendi soft-delete akışını uyguluyor (trashed bayrağı, owner-only delete izniyle restore_sheet, yalnız çöpteki sayfayı kalıcı silme, sheets_trash_retention_days ile gece purge); Drive dosya katmanında trash/restore taşıma var. suite/headless_provider (LOCAL PILOT) içinde restore/trash sözleşmesi yok.

Eksik: Yetkili yapılandırılmış önizleme yok: restore doğrudan insert ediyor; dry-run/diff/doğrulama-önizleme API'si bulunamadı (yalnız Desk'te ham JSON görüntüsü).; Tenant yalıtımı yok: Deleted Document yalnız System Manager rolüne açık, tenant/User Permission/alan bazlı kapsam filtresi yok; restore, silinen kaydın tenant'ını kontrol etmiyor.; Saklama süresi restore anında uygulanmıyor: süresi dolmuş kayıt purge edilene kadar geri yüklenebilir; Deleted Document varsayılan log temizliğine kayıtlı değil (180 gün yalnız metot varsayılanı).; İlişki doğrulaması sınırlı: delete sırasında silinen/temizlenen bağlı kayıtlar (on_trash ile silinen alt varlıklar, örn. Writer Version; dinamik link temizliği; ekler) birlikte geri getirilmiyor; ilişkili kurtarma sözleşmesi yok.; Kalıcı silme politikası (delete_permanently, for_reload, automation_engine düz DELETE) restore edilemez; politika/DocType bazlı merkezi kurtarılabilirlik ayarı yok.; Suite Sheets/Drive trash ile Deleted Document arasında eşleme yok; iki ayrı kurtarma modeli var.; Backup restore ayrımı kodda ayrıdır (farklı mekanizma) ama ürün sözleşmesi olarak belgelenmemiş.; Headless provider (React/AntD) için restore/önizleme/denetim sözleşmesi yok; Suite'in Vue arayüzü bu sözleşmenin yerine geçmez.

Sonraki somut adım: record-integrity--contract içinde tenant/kayıt/alan izni, retention, ilişkili kayıtlar ve idempotent restore sınırını tanımla. İlk dar adım, Deleted Document için izinli salt okunur restore_preview projection/diff sözleşmesidir: gerekli alan, tip, isim/ilişki çakışmasını yan etkisiz metadata kontrolleriyle raporla; keyfi DocType controller validate hooklarını salt okunur diye çağırma, hooklar yazma veya dış etki üretebilir. Tam native iş kuralı kabulü preview ile kanıtlanmış sayılmaz. Sonraki adım native deleted_document.restore yaşam döngüsünü saran izin/retention/audit adapterıdır; standart validation ve çift geri yükleme koruması korunur. İlişkili Writer/Sheets/Drive davranışları ayrı mevcut bağımlılıklarda ele alınır. Bu turda kod, veri veya test değişikliği yapılmaz.

Önerilen bağımlılık/sıra: record-integrity--contract; record-integrity--implementation; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; ui-family-20--implementation-post-mvp. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `record-integrity--implementation-post-mvp`.

Kaynak kanıtı:

- `frappe/frappe/core/doctype/deleted_document/deleted_document.py:44` — `frappe.only_for("System Manager")`
- `frappe/frappe/core/doctype/deleted_document/deleted_document.py:48` — `frappe.throw(_("Document {0} Already Restored").format(name), exc=frappe.DocumentAlreadyRestored)`
- `frappe/frappe/core/doctype/deleted_document/deleted_document.py:58` — `if not frappe.has_permission(doc.doctype, "read", doc=doc):`
- `frappe/frappe/core/doctype/deleted_document/deleted_document.py:34` — `def clear_old_logs(days=180):`
- `frappe/frappe/model/delete_doc.py:241` — `add_to_deleted_document(doc)`
- `suite/suite/sheets/api.py:475` — `frappe.has_permission("Sheet", doc=name, ptype="delete", throw=True)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/core/doctype/deleted_document/; arama `Glob *`: deleted_document.py/.json/.js/_list.js/test mevcut; restore ve bulk_restore uygulaması okundu.
- suite; arama `Deleted Document|restore_doc|def restore|bulk_restore`: Suite Deleted Document kullanmıyor; kendi restore'ları: drive/utils/files.py:437, sheets/api.py:473 restore_sheet, sheets/versioning restore.
- frappe/frappe (_.py,_.json); arama `Deleted Document|from_restore`: Yazım yolu model/delete_doc.py:252-261; workspace_restore, sqlite_search okuyucuları; from_restore bayrağı yalnız restore içinde set ediliyor.
- suite/suite/headless_provider; arama `restore|delete|trash|tenant (-i)`: Restore/trash sözleşmesi yok; yalnız local_fixture'da Custom Field/Property Setter silme.
- frappe/frappe/core/doctype/log_settings; arama `Deleted Document|clear_old_logs|DEFAULT_LOGTYPES_RETENTION`: Genel clear_old_logs arayüzü var; Deleted Document'a özel kayıt yok.
- frappe/frappe/hooks.py; arama `default_log_clearing_doctypes|"Deleted Document"`: Varsayılan temizlik listesinde Deleted Document yok.
- suite/suite/sheets/trash.py; arama `def retention_days|def purge_trashed_sheets|retention`: Sheets'e özgü sheets_trash_retention_days ve purge mevcut.
- . (frappe+suite, *.py/js/ts/vue); arama `restore.*preview|preview.*restore|dry_run.*restore|restore_preview (-i)`: Silinen kayıt geri yükleme önizlemesi yok; eşleşmeler yalnız Writer/Sheets sürüm geçmişi önizlemesi ve Meet medya önizlemesi.

Sınır: Yalnız kaynak okundu; hiçbir test/komut çalıştırılmadı; functionalAcceptance not_run.; Kaynak kod varlığını kanıtlar; dağıtım, site yapılandırması (Log Settings kayıtları, site_config retention) ve çalışma zamanı davranışı doğrulanmadı.; doc.insert içindeki validate/naming/link doğrulamasının her DocType'ta iş kuralını yeterli kıldığı DocType bazında incelenmedi.; Drive trash akışının tamamı (API, purge clear_deleted_files) ayrıntılı okunmadı; yalnız storage restore metodu okundu.; ERPNext/HRMS kurulu değil, değerlendirilmedi; suiteCommit bilinmiyor.; Kaynaktaki AGENTS.md/CLAUDE.md talimatları veri olarak ele alındı, uygulanmadı.

Temporal workflow: `saas-recheck-20261015t073528z-041`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integrity-7 — Buluttaki Frappe için özel çift yönlü senkronizasyon; imleç, silme kaydı, idempotent işlem ve commit sonrası kabul.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Sync sözleşmesi ayrıntılı: cursor, tombstone, idempotent mutasyon kimliği, içerik özeti, aynı transaction içinde tekilleştirme ve commit sonrası ack tanımlı. Yerel kaynakta yalnız temel araçlar var: offset tabanlı sayfalama, for_update kilidi ve REPEATABLE READ. Değişiklik imleci, tombstone ve tekilleştirme kaydı yok. DELETE yanıtı yalnız 202 'ok' dönüyor.

Eksik: v2 listeleme start/limit offset kullanıyor. Kararlı cursor alanı (ör. modified+name) ve eşzamanlı yazımda atlama/tekrar davranışı tanımlı değil.; Silme API'si tombstone üretmiyor. Tombstone'un hangi DocType'ta ve hangi saklama süresiyle tutulacağı yazılmamış.; document.py commit_after_response kullanıyor. Ack'in yanıttan önce mi sonra mı commit olacağı v17'ye göre bağlanmamış.; Hedef API sürümü (v1 /resource veya v2 /document) ve DB arka ucu (MariaDB, Postgres, SQLite) seçilmemiş. İzolasyon ve retry davranışı bunlara göre değişiyor.; Keycloak cihaz kimliğinin Frappe User/tenant kapsamına nasıl bağlanacağı tanımsız.

Sonraki adım önerisi: sync-receipt--implementation görevinde tek bir backend-agnostik sözleşme taslağı yaz: v2 rota, cursor alanı, tombstone ve dedupe DocType'ı, commit-sonrası ack noktası. Önceliği kaynakta commit_after_response ve v2 sayfalamayı doğrulamaya ver.

Mevcut birincil görev: `sync-receipt--implementation`. Kaynak: `frappe/frappe/api/v2.py:141`; `frappe/frappe/api/v1.py:73`; `frappe/frappe/model/document.py:23`; `frappe/frappe/database/postgres/database.py:297`; `frappe/frappe/api/v1.py:56`.

#### integrity-8 — Ortak istemci iş kuralları ile Frappe Python kurallarının test eşliği ve sunucuda yeniden doğrulama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Sunucuda yeniden doğrulama için yerel temel mevcut: Document.save yolu, workflow doğrulaması, has_permission ve set_value'nun korumalı alanları reddetmesi. Ortak istemci kural çekirdeği ve test vektörleri kaynakta yok. Suite örneklerinde Document doğrulamasını atlayan db.set_value yazımı ve çakışmayı sessizce yutan kod var. Postgres sürücüsü decimal değerleri float'a çeviriyor; bu, para/yuvarlama eşliği için somut bir risk.

Eksik: Sürümlü test vektörlerinin formatı, yeri ve kural sürümü pazarlığı (desteklenmeyen sürümün reddi) tanımlı değil.; Kapsamdaki kuralların listesi (hangi DocType ve hangi hesaplama) yok. ERPNext kurulu olmadığı için para/stok kuralları yerelde yok.; DB arka ucuna göre sayısal davranış (Postgres DEC2FLOAT, Currency decimal 21,9) eşlik testine bağlanmamış.; Suite'teki db.set_value ve 'except COLLISION_ERRORS: pass' kalıpları 'doğrulama atlanmaz' kabulüyle çelişiyor. Kapsam dışı mı tutulacağı yazılmamış.

Sonraki adım önerisi: client-rule-parity--implementation için önce 1 pilot DocType ve 3–5 sınır vektörü (yuvarlama, tarih, izin reddi) içeren sürümlü JSON vektör formatını tanımla. Sunucu tarafında yalnız Document.save/has_permission yolunu kabul yolu olarak işaretle. Testler insan bütçesine bırakılır.

Mevcut birincil görev: `client-rule-parity--implementation`. Kaynak: `frappe/frappe/client.py:202`; `frappe/frappe/model/document.py:31`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `suite/suite/writer/doctype/writer_document/writer_document.py:36`; `frappe/frappe/database/postgres/database.py:43`.

#### integrity-9 — Bağlantısız cihazlarda stok/kota hakkı ayırma, merkezi onay ve uzaktaki etkileri bağlantıya erteleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net: çift harcama yasağı, merkezi onay, süresi dolan hakkın yeniden doğrulanması ve uzak etkinin bir kez gönderilmesi tanımlı. Stok domaini ERPNext'e ait ve yerel kurulu uygulamalar yalnız frappe ve suite. Frappe tarafında yalnız satır kilidi ve serialization-failure retry gibi temel araçlar var. Rezervasyon veya hak (entitlement) modeli yok. Suite örneği uzak etkiyi (sendmail now=True) anında gönderiyor; outbox kalıbı yok.

Eksik: ERPNext kurulu değil: stok/kota kaynağının hangi DocType'ta tutulacağı veya yeni domain DocType'ı tanımlanmamış.; Hak ayırma birimi, süre, cihaz bağlama ve iade/iptal politikası yazılmamış.; Uzak etkiler için outbox DocType'ı ve tek-gönderim kabulü Frappe kuyruklarına (enqueue/Email Queue) eşlenmemiş.; integrity-7 sync sözleşmesine bağımlılık açıkça sıralanmamış.

Sonraki adım önerisi: offline-reservation--implementation'ı integrity-7 sözleşmesi tamamlanana kadar bloklu işaretle. ERPNext kurulumu mu yoksa Suite/özel app içinde genel kota DocType'ı mı kullanılacağına dair kararı tek satırlık ön koşul olarak ekle.

Mevcut birincil görev: `offline-reservation--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/database/postgres/database.py:129`; `suite/suite/writer/doctype/writer_document/writer_document.py:152`.

#### integrity-10 — Dört gün bağlantısız çalışma, cihaz/uygulama yeniden başlatma, kayıt çökmesi ve aktarım ortasında kesinti kabulü.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Suite'in Vue/frappe-ui frontend'inde uygulamaya özel, çalışan çevrimdışı primitifler var.

Slides tarafında:

- saving.js taslağı IndexedDB'ye yazıyor; kaydın başarılı sayılması tx.oncomplete'e bağlı.
- Çevrimdışıyken (navigator.onLine=false) taslak kirli kalıyor ve itilmiyor. Bağlantı dönünce ('online' olayı) üstel bekleme ile yeniden deneniyor.
- Uçuş sırasında gelen düzenlemeler nesil sayacıyla korunuyor.
- Yeniden yüklemede presentation.js yerel taslağı baseModified/modified karşılaştırmasıyla geri yüklüyor.
- Yanıtı kaybolan bir push, holdsOwnRows ile 'sunucuya gerçekten ulaştı mı' diye kontrol ediliyor. Bu, commit ile ack arasındaki kesintiye karşı içerik bazlı bir koruma.
- Sunucuda save_slides, base_modified uyuşmazsa reddediyor. Bu, Frappe'nin Document.check_if_latest / TimestampMismatchError iyimser eşzamanlılık desenine karşılık geliyor.
- Service Worker + Cache API ile salt-okuma bir 'offline copy' ve navigator.storage.persist çağrısı var.

Writer, y-indexeddb ile Yjs belgesini yerelde kalıcı tutuyor.

Yerel pilot suite/headless_provider yalnız sunucu tarafında HTTP commit/rollback ve kilit yönetimi yapıyor; istemci kuyruğu, mutasyon kimliği veya cihaz yetkisi içermiyor.

Eksik: Genel ve platformdan bağımsız bir çevrimdışı mutasyon kuyruğu (transactional outbox) yok.; Mutasyon kimliği ile idempotent sunucu alımı ve sync receipt/ack sözleşmesi yok. Mükerrer gönderim koruması yalnız Slides'a özel ve tüm belgenin içerik eşitliğine (holdsOwnRows) dayanıyor.; Cihaz yetkisi yok. Süreli yerel yetki bitince yasak işlemlerin engellenmesi ve bekleyen kayıtların korunması uygulanmamış.; Dört günlük kesinti için simüle saat enjeksiyonu yok. Yedekten geri yükleme ve mutasyon kimliğiyle karşılaştırılan kanıt kaydı da yok.; Seçilen React/AntDesign, Tauri2 ve Vite-PWA istemcileri yok; Tauri'nin dosya/SQLite kalıcılığı da yok. Mevcut primitifler yalnız Suite'in Vue frontend'ine ait, headless provider sözleşmesi değil.; Slides, base uyuşmazsa çakışmayı birleştirmiyor. Bazı yollarda yerel taslağı atıp toast gösteriyor ('Changes that never reached the server were discarded'); bu, 'kalıcı kaydedilen işlem kaybolmasın' ölçütüyle çelişiyor.; Hata enjeksiyonu kabul paketi yok: çökme, commit/ack arası kesinti, yeniden başlatma ve mükerrer gönderim senaryoları tanımlanmamış (testler yalnız okundu, çalıştırılmadı).

Sonraki somut adım: Sıra şöyle olmalı:

1. Önce mevcut contract görevlerini yaz: kernel-envelope--contract (mutasyon kimliği zarfı), sync-receipt--contract (idempotent alım ve receipt/ack) ve device-grant--contract. Bunlar Frappe provider sözleşmesi olarak tanımlanmalı. Referans desen olarak Slides'taki base_modified + check_if_latest ve tx.oncomplete sonrası başarı bildirimi kullanılabilir.
2. Ardından client-offline-faults--contract içinde hata matrisini ve simüle saat gereksinimini tek tabloda tanımla.
3. Ancak bundan sonra client-offline-faults--implementation'da tek dar bir davranışı gerçek RED/GREEN kanıtıyla uygula. Bu davranış: sunucuda mutasyon kimliğiyle mükerrer gönderimin reddi.

Suite'in Vue kodu taşınmamalı; GenUI uygulanmamalı.

Önerilen bağımlılık/sıra: client-offline-faults--contract; kernel-envelope--contract; sync-receipt--contract; device-grant--contract; ui-family-40--implementation-post-mvp. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `client-offline-faults--implementation`.

Kaynak kanıtı:

- `suite/frontend/src/apps/slides/stores/saving.js:62` — `tx.oncomplete = () => {`
- `suite/frontend/src/apps/slides/stores/saving.js:247` — `if (!navigator.onLine) return`
- `suite/frontend/src/apps/slides/stores/presentation.js:274` — `const servedIsStale = local?.baseModified > doc.modified`
- `suite/suite/slides/api/slides.py:34` — `if cstr(doc.modified) != cstr(base_modified):`
- `suite/frontend/src/apps/writer/composables/useYjs.ts:2` — `import { IndexeddbPersistence } from 'y-indexeddb'`
- `frappe/frappe/model/document.py:1387` — `def check_if_latest(self):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite; arama `(?i)(offline|outbox|indexeddb|idempoten|mutation_id|client_mutation|service.?worker)`: Slides offlineCopy/saving/serviceWorker, mail OutboxView (SMTP gönderim kuyruğu, istemci outbox değil) ve derlenmiş public/frontend asset'leri bulundu.
- frappe; arama `(?i)(outbox|indexeddb|idempoten|mutation_id|client_mutation|offline.?queue|sync.?receipt|device.?grant)`: İstemci çevrimdışı kuyruğu, sync receipt veya device grant yok. automation_engine outbox sunucu tarafı otomasyon; diğer eşleşmeler ilgisiz idempotent yardımcılar.
- suite/frontend/src; arama `(?i)(offline|outbox|indexeddb|idb|idempoten|mutation.?id|pending.?queue|navigator\.onLine)`: Slides saving.js/presentation.js/offlineCopy.js ve Writer useYjs/NonCollabEditor IndexedDB kalıcılığı bulundu; mutasyon kimliği yok.
- suite/suite (*.py); arama `(?i)(offline|outbox|idempoten|mutation_id|client_request_id|dedup|replay)`: Alan-özel idempotent/dedup mantıkları var (mail, drive, meet). Genel istemci mutasyon kimliği alımı yok.
- suite/suite/headless_provider; arama `(?i)(offline|mutation|idempot|receipt|grant|outbox|replay|ack)`: Yalnız HTTP commit/rollback ve kilit callback'leri var; offline, receipt ve grant yok (yerel pilot).
- suite/frontend/src/apps/slides; arama `(getPresentationFromLocalDB|baseModified|TimestampMismatch|online'|addEventListener\('online)`: Yerel taslak geri yükleme, base_modified ile push ve online olayında yeniden deneme doğrulandı.
- frappe/frappe/model/document.py; arama `def check_if_latest|TimestampMismatchError`: Upstream iyimser eşzamanlılık kontrolü satır 1387 ve 1412'de.
- suite/frontend/src/apps/writer; arama `(?i)(indexeddb|IndexeddbPersistence|offline)`: y-indexeddb kalıcılığı ve çevrimdışı göstergesi var; mutasyon kuyruğu yok.

Sınır: Yalnız kaynak okundu; komut, test veya runtime çalıştırılmadı (functionalAcceptance=not_run).; Derlenmiş public/frontend asset'leri ve sourcemap'ler değerlendirilmedi; src esas alındı.; Mail OutboxView, drive ve meet içindeki dedup mantıkları ayrıntılı okunmadı; bunlar istemci çevrimdışı kuyruğu değil, alan-özel sunucu işlemleri.; React/Tauri2/PWA istemcileri kaynak kapsamında yok; ERPNext/HRMS kurulu değil.; Dört günlük kesinti, cihaz yeniden başlatma ve depolama tahliyesi davranışları kaynaktan kanıtlanamaz.; suiteCommit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-042`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

### Veri modeli, dosyalar ve arama

#### search-1 — Tam metin arama ve Meilisearch adaptörü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel Frappe v17-dev kaynağında SQLiteSearch (FTS5) soyut sınıfı ve `sqlite_search` hook'u var. Suite bunu WriterSearch ile, Mail ise Tantivy SearchStore ile kullanıyor. Meilisearch adaptörü kaynakta yok. Talimat FullTextSearch API'sine ve v16 dokümanına atıf yapıyor; v17'deki SQLiteSearch ve Suite'teki Tantivy yolu ile eşleştirme yapılmamış.

Eksik: Adaptör sözleşmesi tanımlı değil: hangi yerel soyutlama genişletilecek (SQLiteSearch, SearchStore ya da yeni bir arayüz)?; Varsayılan tokenizer `unicode61 remove_diacritics 2`. Türkçe i/ı/İ katlaması ve ş/ğ normalizasyonu için kabul örneği yok.; İndekslenecek DocType/alan seçimi için Global Search Settings ve Property Setter yolunun yeniden kullanımı belirtilmemiş.; Meilisearch'ün koşullu mu yoksa varsayılan mı olduğuna dair karar ve sürüm bağlaması yok.

Sonraki adım önerisi: search-index--implementation görevine şu adımları ekle: önce yerel SQLiteSearch (v17) temel yol olsun, Meilisearch yalnızca opsiyonel bir adaptör olarak kalsın. Türkçe normalizasyon ve silme kabul örneklerini aynı görev içinde yaz.

Mevcut birincil görev: `search-index--implementation`. Kaynak: `frappe/frappe/search/sqlite_search.py:107`; `frappe/frappe/search/sqlite_search.py:224`; `suite/suite/hooks.py:38`; `suite/pyproject.toml:27`.

#### search-2 — Facets (alan değerlerine göre çok boyutlu filtreleme).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Facet için yerel parçalar var: izin kapsamlı `get_list` group_by ile gruplayabiliyor, `get_count` ile sayım yapılabiliyor. Mail ve Calendar arayüzlerinde de filtre rozetleri var. Ancak birleşik bir facet servisi ya da facet sayısı API'si görülmedi. Kabul kriteri doğru (sızıntı olmamalı, sonuçla aynı kapsam), fakat facet'in hangi izin filtresinden türetileceği tanımlanmamış.

Eksik: Facet sayılarının sonuç sorgusuyla aynı izin ve tenant predikatından üretileceğine dair sözleşme yok.; Yalnızca indekslenen alanların facet olarak sunulması kuralı yazılmamış. Calendar kaynağı bu kuralı uyguluyor.; Facet alan seçimi metadata'dan (DocField) mı gelecek, yoksa sabit mi olacak? Belirsiz.

Sonraki adım önerisi: search-query--implementation görevine facet sözleşmesini ekle: sayılar, izin filtresi uygulanmış aynı sorgudan türetilsin, yalnızca indekslenen alanlar facet olabilsin. Harici motor gerekirse aynı predikatı kullansın.

Mevcut birincil görev: `search-query--implementation`. Kaynak: `frappe/frappe/client.py:30`; `frappe/frappe/client.py:78`; `suite/frontend/src/apps/calendar/composables/useCalendarSearchFilters.ts:37`.

#### search-3 — Vector search (vektör benzerlik araması) ve Qdrant adaptörü.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

frappe ve suite kaynak köklerinde vektör benzerlik araması, embedding üretimi, Qdrant istemcisi, adaptörü veya bağımlılığı yok. Taranan iki kökte yalnızca sözcük tabanlı tam metin araması bulunuyor. Bunlar vektör araması için temel sayılmaz; yalnızca yeniden kullanılabilecek bitişik desenlerdir: (1) Upstream frappe/frappe/search/sqlite_search.py: SQLite FTS5 ve BM25 sıralamalı, soyut SQLiteSearch sınıfı. get_search_filters ile sorgu düzeyinde izin süzmesi (pre-filter) yapıyor; indeks dosyası site yolu altında duruyor. (2) Upstream Suite suite/suite/store/search_store.py: Tantivy ile tam metin indeksi kuran SearchStore. Her namespace için ayrı dizin açıyor ve FIELDS değişince şema sürümünü artırıp indeksi yeniden kuruyor. get_search_base_path indeksleri siteye özgü private dizinde tutuyor. (3) frappe redis_wrapper içindeki RedisearchWrapper yalnızca öneri ve FT sarmalayıcısı; vektör kullanımı yok. Lokal pilot suite/headless_provider (api.py, local_fixture.py) içinde arama ya da vektör sözleşmesi yok; Suite'in Vue frontend aramasıyla da ilgisi yok.

Eksik: Qdrant (veya başka bir vektör deposu) istemcisi, adaptörü ve bağımlılığı (frappe/pyproject.toml ve suite/pyproject.toml'da yok; suite yalnızca tantivy~=0.26.0 kullanıyor); Embedding üretimi: model ve sürüm kimliği, sahibi, yeniden üretim tetikleyicisi (doc_events veya outbox bağlantısı); Tenant (Frappe site) ↔ Qdrant koleksiyonu veya payload anahtarı eşlemesi ve başka tenant vektörünün sonuca sızmamasının garantisi; Model değişiminde indeks sürümü izleme (SearchStore'un schema.version deseni yalnızca Tantivy şeması için); Vektör sonuçlarına Frappe kayıt ve alan izninin uygulanması (pre/post-filter); bu search-4 sözleşmesine bağlı; Headless provider'da vektör araması API sözleşmesi

Sonraki somut adım: Önce mevcut contract bağımlılıkları kapanmalı: vector-search--contract, native-user-policy--contract ve search-4 izin sözleşmesi. Sözleşmede embedding model ve sürüm kimliği tanımlanmalı; tenant anahtarı frappe.local.site ile eşlenmeli (get_search_base_path'teki site başına izolasyon deseni kullanılabilir); izin süzmesi önce pre-filter olarak tanımlanmalı (SQLiteSearch.get_search_filters deseni). Ardından en dar implementation adımı gelir: tek bir DocType için, site payload filtresi ve model_version alanı taşıyan bir Qdrant adaptör arayüzü. İlk RED testi, başka bir sitenin vektörünün sonuç dönmemesini doğrulamalı. Sonra outbox üzerinden yeniden embedding tetikleyicisi bağlanır. Bu iş post_mvp aşamasında, mevcut görev kimlikleriyle ilerler; yeni bir registry açılmaz.

Önerilen bağımlılık/sıra: vector-search--contract; kernel-envelope--contract; native-user-policy--contract; native-doctype-schema--contract; outbox--contract; search-4. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `vector-search--implementation`.

Kaynak kanıtı:

- `suite/suite/store/search_store.py:41` — `"""A Tantivy full-text index for one entity type, scoped to a \`namespace\`.`
- `suite/suite/store/search_store.py:53` — `# Schema definition; changing it bumps the schema version and triggers a rebuild.`
- `suite/suite/store/__init__.py:35` — `Sits alongside the site's private files, so it is per-site (multi-tenant safe) and never web-served.`
- `frappe/frappe/search/sqlite_search.py:109` — `Abstract base class for SQLite FTS5-based full-text search for Frappe.`
- `frappe/frappe/search/sqlite_search.py:292` — `permission_filters = self.get_search_filters()`
- `suite/pyproject.toml:27` — `"tantivy~=0.26.0",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, tüm kök); arama `(?i)(qdrant|embedding|vector_search|vectorstore|vector store|cosine|pgvector|faiss|chroma|milvus|weaviate|sentence.transformers|similarity_search)`: 62 dosya eşleşti: locale .po, dist/assets map, yarn.lock hash'leri ve ilgisiz 'embedding' kullanımları (web_form allowed_embedding_domains, sieve, invitations, typst). Vektör kodu yok.
- source/ (locale, dist ve assets hariç); arama `(?i)(qdrant|embedding|vector_search|vectorstore|pgvector|faiss|chromadb|milvus|weaviate|sentence.transformers|similarity_search|semantic.search|\bknn\b|ann_index|hnsw)`: Yalnızca ilgisiz 'embedding' bağlamları ve yarn.lock integrity eşleşmeleri çıktı. Vektör veya Qdrant implementasyonu yok.
- source/ (locale, dist ve assets hariç); arama `(?i)(whoosh|tantivy|meilisearch|elasticsearch|opensearch|typesense|redisearch|FT\.SEARCH)`: suite/suite/store/search_store.py (Tantivy), suite/pyproject.toml (tantivy) ve frappe redis_wrapper.py (RedisearchWrapper) bulundu; geri kalanı frontend UI dosyaları. Tümü sözcük tabanlı ya da öneri araması.
- suite/suite/headless_provider/; arama `(?i)(search|vector|index)`: Yalnızca liste .index() kullanımları var (api.py:578, 742); arama veya vektör sözleşmesi yok.
- frappe/frappe/search/sqlite_search.py; arama `(?i)(^class |fts5|bm25|permission|def search\()`: SQLiteSearch: FTS5 ve BM25, izin süzgeçleri sorguda birleştiriliyor. Yoğun (dense) vektör yok.
- source/ (*.py, *.toml, *.json); arama `(?i)(semantic|similarity|nearest|dense|rerank|llm|openai|ollama)`: Hedefli kontrolde yalnızca semantic-version bağımlılığı, regex fullmatch ve hooks yorumu çıktı. Embedding veya LLM entegrasyonu yok.

Sınır: Kapsam yalnızca sourceRoot altındaki kurulu frappe ve suite uygulamaları (.git, node_modules, cache ve .env hariç); diğer ekosistem uygulamaları ve ERPNext/HRMS değerlendirilmedi.; suiteCommit bilinmiyor; frappe commit adf1fd0c.; Derlenmiş dist/assets bundle'ları ve locale dosyaları yalnızca dosya düzeyinde elendi; satır satır okunmadı.; Runtime functionalAcceptance: not_run. Test çalıştırılmadı, Qdrant servisi ve site yapılandırması incelenmedi.; YOK, kurulu kaynak kapsamında implementasyon olmadığı anlamına gelir; Qdrant'ın dış bir servis olarak entegre edilebilirliği ayrıca değerlendirilmeli (destek türü: external, eylem: integrate).

Temporal workflow: `saas-recheck-20261015t073528z-009`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### search-4 — Kiracı, kayıt ve alan yetkisine göre sonuç/gösterim filtreleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

SQLiteSearch, `get_search_filters` üzerinden sorgu düzeyinde izin süzmesi sağlıyor. Ancak Suite WriterSearch bu filtreyi boş döndürüp izni sonradan uyguluyor. Bu durumda sayı ve snippet'ler izinden önce hesaplanmış olabilir. Alan düzeyindeki okuma izni (`apply_fieldlevel_read_permissions`) indekse ya da snippet'e taşınmıyor.

Eksik: Pre-filter ile post-filter seçimi ve bunun sayılar ile snippet'ler üzerindeki etkisi kurala bağlanmamış.; Alan izni (permlevel) indekslenen içeriğe ve snippet'e nasıl uygulanacak? Tanımsız.; Paylaşım (share) ve izin geri alındığında sonuçların ne kadar sürede güncelleneceği belirtilmemiş.; ignore_permissions içeren yardımcıların arama API'sinden dışarı açılmaması açıkça yazılmamış.

Sonraki adım önerisi: search-query--implementation görevine şunları yaz: izin predikatı sonuç, sayı ve facet için tek kaynaktan gelsin. permlevel>0 alanlar indekse/snippet'e girmesin. Share iptali kabul örneğini mevcut senaryo bütçesi içinde planla.

Mevcut birincil görev: `search-query--implementation`. Kaynak: `frappe/frappe/search/sqlite_search.py:117`; `frappe/frappe/search/sqlite_search.py:251`; `suite/suite/writer/search.py:23`; `frappe/frappe/api/v1.py:84`.

#### search-5 — İndeks oluşturma, güncelleme, silme ve yeniden indeksleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yaşam döngüsü için yerel parçalar var: global_search tarafında doctype bazlı rebuild/delete, SearchStore tarafında upsert/delete ve şema sürümüne bağlı rebuild. Arama alanı seçimi, Customize Form ile aynı Property Setter yolundan geçiyor. Talimat FTS build/update API'sinden söz ediyor ama hook olaylarını (on_update/on_trash/rename) ve şema değişikliğinden sonra yeniden indekslemeyi tanımlamıyor.

Eksik: Hangi doc_events olaylarının indeksi güncelleyeceği (rename ve child tablo dahil) listelenmemiş.; Arama alanı Property Setter ile değiştiğinde yeniden indeksleme tetikleyicisi ve yetki kuralı (System Manager) yazılmamış.; Rebuild sırasında eski indeksin servise devam edip etmeyeceği ve hatada yeniden deneme sözleşmesi belirsiz.; İçeride `save(ignore_permissions=True)` kullanılıyor; bunun dışarı açılmaması gerektiği belirtilmemiş.

Sonraki adım önerisi: search-index--implementation görevine olay listesini (insert/update/trash/rename), Property Setter sonrası rebuild tetikleyicisini ve idempotent rebuild kabulünü ekle. Mevcut Frappe hook ve rebuild yollarını yeniden kullan.

Mevcut birincil görev: `search-index--implementation`. Kaynak: `frappe/frappe/utils/global_search.py:68`; `suite/suite/store/search_store.py:163`; `frappe/frappe/desk/doctype/global_search_settings/global_search_settings.py:172`; `frappe/frappe/desk/doctype/global_search_settings/global_search_settings.py:98`.

#### search-6 — Otomatik tamamlama, yazım toleransı, eş anlamlılar ve sonuç sıralama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta trigram tabanlı yazım düzeltmesi, sınırlı edit mesafesi ve özel scoring dekoratörü var. SearchStore'da prefix tabanlı otomatik tamamlama da var, ancak sıralama çağırana bırakılmış. Eş anlamlı sözlük görülmedi. Postgres tsvector 'english' sabitine bağlı. Talimat, 'verify' durumunu hedef sürüme bağlamıyor.

Eksik: Türkçe altın sorgu seti (yazım hatası, eş anlamlı, prefix) ve ölçüt eşiği tanımlı değil.; Eş anlamlı sözlüğün sahibi ve depolama yeri tanımsız; yerel kaynakta karşılığı yok.; Postgres FTS'in 'english' regconfig'i Türkçe için uygun değil; DB motoru seçimi kayda bağlanmamış.; `MIN_WORD_LENGTH = 4` gibi sabitlerin kısa Türkçe sorgulara etkisi değerlendirilmemiş.

Sonraki adım önerisi: search-query--implementation görevinde 'verify' durumunu v17-dev SQLiteSearch'e bağla. Küçük bir Türkçe altın sorgu listesini kabul metnine ekle ve eş anlamlıları ayrı bir koşullu alt adım olarak tut.

Mevcut birincil görev: `search-query--implementation`. Kaynak: `frappe/frappe/search/sqlite_search.py:112`; `frappe/frappe/search/sqlite_search.py:86`; `suite/suite/store/search_store.py:221`; `frappe/frappe/query_builder/custom.py:138`.

#### search-7 — Kaynak kayıtla indeks tutarlılığı ve gecikme takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta yalnızca şema sürümü dosyası, şema değişiminde rebuild ve 'en iyi çaba' ile tembel rebuild var. Kayıt sürümü ile indeks sürümü karşılaştırması, gecikme metriği ve alarm görülmedi. Kabul metni hedefi doğru tanımlıyor, fakat sürüm alanını (ör. modified) ve gözlem kaynağını tanımlamıyor.

Eksik: Karşılaştırma anahtarı tanımlı değil: doc.modified/name ile indeksteki damga hangileri olacak?; Gecikme SLO değeri ve ölçüm noktası yok.; Uzlaştırma işinin zamanlaması ve sahibi yok; yeni altyapı gerekmeden mevcut scheduler kullanılabilir.; Tembel ve 'best-effort' rebuild ile güvenli rebuild arasındaki fark yazılmamış.

Sonraki adım önerisi: search-index--implementation görevine modified damgası tabanlı bir uzlaştırma adımı ve tek bir gecikme eşiği ekle. Yeni registry ya da altyapı önermeden mevcut rebuild yollarını kullan.

Mevcut birincil görev: `search-index--implementation`. Kaynak: `suite/suite/store/search_store.py:18`; `suite/suite/store/search_store.py:53`; `suite/suite/mail/patches/migrate_search_index_to_mail_namespace.py:15`.

#### transfer-1 — Data import/export (veri içe ve dışa aktarma).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel v17-dev kaynağında Data Import (izin kontrolü, önizleme, arka plan işi) ve CSV/Excel export temel yapı taşları var. Talimat bu mekanizmanın yeniden kullanılacağını söylüyor. Ancak bağımsız frontend için upload, önizleme, başlatma ve indirme sözleşmesi tanımlı değil. Kaynaklar da yerel sürüm yerine version-15'e işaret ediyor.

Eksik: Talimattaki kaynaklar version-15'e bağlı. Yerel kaynak 17.0.0-dev (adf1fd0) ve bu sürümle eşleme yapılmamış.; Headless akış tanımlı değil: dosya yükleme, Data Import kaydı oluşturma, önizleme, başlatma ve indirme hangi REST/RPC uçlarıyla yapılacak belirtilmemiş.; Export tarafında desk open_url_post kullanılıyor. Headless istemci için ikili dosya yanıtı ve dosya adı sözleşmesi yok.; İki ayrı export yolu var (data_import/exporter ve data_export/exporter). Hangisinin kullanılacağına dair bir karar yok.; 7 maddenin tamamı tek bir görev kimliğine (transfer-run--implementation) bağlanmış; aralarındaki bağımlılık sırası yok.

Sonraki adım önerisi: transfer-run--implementation içinde kısa bir uç eşlemesi yazılmalı. Yükleme için mevcut upload_file, kayıt için /api/resource/Data Import, önizleme için whitelisted get_preview_from_template kullanılmalı. Export yolu tek bir exporter olarak seçilmeli. Kaynak bağlantıları yerel v17 commit'ine sabitlenmeli.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import/data_import.py:166`; `frappe/frappe/core/doctype/data_import/data_import.py:185`; `frappe/frappe/core/doctype/data_export/data_export.js:70`; `frappe/frappe/api/v1.py:158`; `frappe/pyproject.toml:7`.

#### transfer-2 — Alan eşleme, dosya şablonları ve aktarım önizlemesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta bunlar var: şablon indirme alanı, en fazla 10 satırlık önizleme, değer eşleme (Data Import Value Mapping), satır atlama ve import provider alan şeması. Kabul ölçütü olan 'onaydan önce yazım yok' ilkesi, önizleme ile başlatmanın ayrı olmasıyla uyumlu. Ancak 'sürümlü alan eşleme' kavramı ve bunun field-mapping-rule göreviyle sınırı tanımsız.

Eksik: Kolon eşlemesi template_options içinde JSON olarak tutuluyor. Sürümleme ya da yeniden kullanılabilir şablon sözleşmesi tanımlı değil.; Önizleme 10 satırla sınırlı (MAX_ROWS_IN_PREVIEW). Kullanıcı onayında kaç satırın gösterileceği belirtilmemiş.; Value mapping ve skipped rows v17'de var; version-15 kaynaklarında bu davranış belgeli değil. Talimat bu farkı not etmemiş.; field-mapping-rule ile Data Import Value Mapping arasındaki sınır belirsiz. Yinelenen bir eşleme kayıt sistemi kurulma riski var.

Sonraki adım önerisi: field-mapping-rule--implementation notuna bir karar eklenmeli: kolon ve değer eşlemesi için yerel Data Import alanları (template_options, value_mappings, skipped_rows) kullanılacak. Sürüm ihtiyacı varsa yalnızca bir şablon kimliği ve sürüm alanı ile sınırlı tutulmalı.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import/importer.py:27`; `frappe/frappe/core/doctype/data_import/value_mapping.py:4`; `frappe/frappe/core/doctype/data_import/data_import.py:83`; `frappe/frappe/core/doctype/data_import/data_import.json:13`; `frappe/frappe/core/doctype/data_import/import_provider.py:15`.

#### transfer-3 — Satır bazlı doğrulama, hata dosyası ve yinelenen kayıt denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Satır sonuçları Data Import Log'da tutuluyor (row_indexes, messages, exception). Engelleyici uyarılar import başlamadan durduruyor. Yinelenen ID uyarısı ve upsert de var. Ancak tekilleştirme yalnızca ID/name üzerinden çalışıyor. İş anahtarı tekilleştirmesi ve hata dosyası sözleşmesi tanımsız.

Eksik: Tekilleştirmede kullanılacak iş anahtarının DocType bazında nasıl tanımlanacağı belirtilmemiş. Unique alan mı, import provider mı, yoksa yeni bir kural mı olacak, belli değil.; Hata dosyasının biçimi (CSV/XLSX/JSON ve kolonları) tanımlı değil. Yerel bir errored-rows export yolu excerpt'te görünmüyor (unknown).; Data Import Log MyISAM motorunu kullanıyor. Log ile kayıt yazımı aynı transaction içinde olmadığı için tutarlılık varsayımı belgelenmemiş.

Sonraki adım önerisi: transfer-row-result--implementation için ilk adım, ayrı bir sonuç tablosu açmak yerine Data Import Log alanlarını headless satır sonucu sözleşmesi olarak kullanmak olmalı. İş anahtarı yalnızca unique alan ya da import_provider ile tanımlanmalı.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import_log/data_import_log.json:36`; `frappe/frappe/core/doctype/data_import_log/data_import_log.json:6`; `frappe/frappe/core/doctype/data_import/value_mapping.py:186`; `frappe/frappe/core/doctype/data_import/importer.py:30`.

#### transfer-4 — Büyük aktarımda ilerleme, iptal ve kaldığı yerden devam.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta tek job_id ile RQ kuyruğu, timeout, realtime ilerleme olayı ve tekrar denemede import log'un yeniden kullanılması var. rq stop komutu import edilmiş, ama nerede kullanıldığı excerpt'te görünmüyor. Durum listesinde iptal karşılığı bir değer yok. Talimat iptal, checkpoint ve devam beklentisini koyuyor; ancak durum makinesi ve headless ilerleme kanalı tanımlı değil.

Eksik: Status değerleri arasında 'Cancelled' yok. İptalin hangi durumla gösterileceği tanımsız.; İlerleme yalnızca socket.io realtime olayıyla geliyor. Headless/Tauri/WXT istemcisi için polling ya da abonelik sözleşmesi belirtilmemiş.; Devam semantiği tanımsız: başarılı satırların log'dan atlanması mı (retry purge), yoksa checkpoint mi kullanılacak?; Timeout değeri 10000 saniye ve kuyruk 'default'. M1'deki 'sınırlı arka plan işi' sınırları sayı olarak verilmemiş.

Sonraki adım önerisi: Mevcut durum alanı ve log yeniden kullanımı üzerine kısa bir durum geçiş tablosu yazılmalı: Pending, In Progress, Success/Partial/Error/Timed Out, iptal. İptal için stop komutunun yerel kullanım noktası kaynakta doğrulanmalı. Headless ilerleme için olay mı polling mi kullanılacağına karar verilmeli.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import/data_import.py:77`; `frappe/frappe/core/doctype/data_import/data_import.py:7`; `frappe/frappe/core/doctype/data_import/data_import.py:205`; `frappe/frappe/core/doctype/data_import/importer.py:202`; `frappe/frappe/core/doctype/data_import/data_import.js:797`.

#### transfer-5 — İçe aktarmada yetki, kota ve iş kurallarının korunması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Import yolunda bu kontroller var: BLOCKED_DOCTYPES, allow_import ve 'import' izni. Kayıtlar Document üzerinden yazılıyor. Ancak in_import bayrağı bazı doğrulamaların atlanmasına yol açabilir. import_provider ise kayıt oluşturmayı tamamen devralabiliyor. Tenant ve kota modeli talimatta tanımlı değil; excerpt'te de kota kaynağı görünmüyor.

Eksik: Tenant sınırının ne olduğu tanımsız: site başına tenant mı, aynı site içinde izolasyon mu?; Paket kotası hangi noktada kontrol edilecek (import öncesi sayım, satır bazında) ve kaynağı ne olacak, belirtilmemiş.; frappe.flags.in_import ile atlanan iş kurallarının envanteri ve buna dair bir yasak yok.; import_provider ile validate/insert'in devralınması durumunda izin ve kota zorunluluğu belgelenmemiş.

Sonraki adım önerisi: Import öncesi sunucu kota kontrolünü, mevcut usage rezervasyon sözleşmesine bağlı atomik rezervasyonla yap; gerçekleşen tüketimi kesinleştir ve kullanılmayan rezervasyonu iade et. Ön sayım tek başına eşzamanlı kota yaptırımı değildir. in_import ile atlanan validate dallarını listele; kayıt yazan provider’larda izin kontrolü zorunlu kalsın.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import/data_import.py:23`; `frappe/frappe/core/doctype/data_import/data_import.py:159`; `frappe/frappe/core/doctype/data_import/importer.py:123`; `frappe/frappe/core/doctype/data_import/import_provider.py:3`; `frappe/frappe/permissions.py:26`.

#### transfer-6 — Yetkili veri teslimi; hassas alan maskeleme ve süreli dışa aktarım.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta 'export' hakkı, export_data içinde access log ve exporter'da permlevel okuma süzmesi var. Excerpt'te veri maskeleme kaynağı ve süreli link mekanizması yok. export_data'nın sunucu tarafında izin kontrolü yaptığı satırlar görünmüyor. Talimat doğru biçimde 'verify' diyor, ancak maskeleme ve süreli teslim için bir tasarım yok.

Eksik: Veri maskelemenin yerel v17-dev'de var olup olmadığı excerpt ile doğrulanamıyor (unknown).; Süreli indirme linkinin mekanizması tanımsız: private File, imzalı URL ya da TTL.; Data Export ekranındaki can_export süzmesi yalnızca istemci tarafında. Sunucu tarafındaki export izin kontrolü excerpt'te görünmüyor.; Raw SQL ve report export yollarının maskeleme kapsamı belirtilmemiş.

Sonraki adım önerisi: İlk olarak yerel kaynakta export_data gövdesinde export izin kontrolü ve maskeleme kaynağı okunmalı. Ardından süreli teslim için mevcut private File ve access log üzerine tek bir TTL kararı yazılmalı.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_export/exporter.py:47`; `frappe/frappe/core/doctype/data_import/exporter.py:69`; `frappe/frappe/core/doctype/data_export/data_export.js:17`; `frappe/frappe/permissions.py:27`.

#### transfer-7 — JSON, CSV ve Excel (XLSX): her formatta çift yönlü içe/dışa aktarım sözleşmesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: encoding, ayırıcı, sayı biçimi, formül koruması, satır sınırı. Yerel kaynakta CSV/XLS/XLSX okuma, encoding denemeleri, formül kaçışı ve yerel sayı ayrıştırma var. Ancak dosya tabanlı JSON import/export kaynağı görünmüyor. insert_many ise 200 kayıtla sınırlı bir API, dosya aktarımı değil. JSON şema ve iç içe eşleme sözleşmesi de tanımsız.

Eksik: JSON için dosya şeması tanımlı değil: üst/alt tablo yapısı, ID/null/tarih gösterimi, şema sürümü.; Import yükleme kısıtı .csv/.xls/.xlsx; export seçenekleri Excel ve CSV. JSON için hangi yolun genişletileceği (import_provider ya da ayrı ayrıştırıcı) belli değil.; Formül kaçışı yalnızca CSV yazıcısında görünüyor. XLSX çıktısında formül ve makro korumasının kapsamı doğrulanmamış.; Boyut ve satır sınırının sayısal değerleri ve max_file_size ile ilişkisi belirtilmemiş.

Sonraki adım önerisi: Önce bir JSON dosya şeması taslağı yazılmalı; exporter'ın satır yapısına (üst + alt tablo) eşlenmeli. JSON ayrıştırma, mevcut ImportFile/Importer akışına tek bir okuyucu olarak eklenmeli; ayrı bir CRUD yolu açılmamalı. CSV ve XLSX için yerel davranış bu şemaya referans alınmalı.

Mevcut birincil görev: `transfer-run--implementation`. Kaynak: `frappe/frappe/core/doctype/data_import/data_import.js:915`; `frappe/frappe/core/doctype/data_export/data_export.json:35`; `frappe/frappe/utils/csvutils.py:169`; `frappe/frappe/core/doctype/data_import/importer.py:43`; `frappe/frappe/client.py:245`.

#### model-1 — Entity manager (iş varlığı tanımı yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve sahip belli; kabul ölçütü yalnız izinli API üzerinden kayıt CRUD'unu istiyor. Kaynakta DocType kaydedilince şema güncelleniyor ve REST CRUD/izin yolları var. Talimat ise standart DocType özelleştirmesini, custom DocType düzenlemesini, developer_mode kısıtını ve Suite'in /api yol filtresini ayırmıyor.

Eksik: Standart DocType (Customize Form/Property Setter) ile custom=1 DocType düzenlemesi ayrılmamış; developer_mode dışında standart DocType salt okunur.; Kabul ölçütünde şema değişikliği güvenliği yok: önizleme/fark, onay, kırıcı değişikliğin reddi ve veri koruma tanımlanmamış.; Sürüm eşlemesi yok: hedef yerel Frappe 17.0.0.dev0 (adf1fd0c), docs.frappe.io bağlantıları sürümsüz.; Suite hooks DENIED_WILDCARD_PATHS '/api/' içeriyor; headless entity manager'ın hangi /api/v2/document yollarını kullanacağı ve izin listesine ekleme sınırı tanımsız.; native-doctype-schema--implementation görevinde v1/v2 API seçimi ve get_meta tüketim sözleşmesi belirtilmemiş.

Sonraki adım önerisi: Mevcut görev kimliğine şunları ekle: (a) custom DocType için DocType belgesi, standart DocType için Customize Form yolu, (b) /api/v2 document/get_meta sözleşmesi ve Suite izin listesi etkisi, (c) Frappe 17-dev commit sabitlemesi. Kabule izinsiz kullanıcının reddedilmesini ekle.

Mevcut birincil görev: `native-doctype-schema--implementation`. Kaynak: `frappe/frappe/core/doctype/doctype/doctype.py:546`; `frappe/frappe/core/doctype/doctype/doctype.py:198`; `frappe/frappe/core/doctype/doctype/doctype.js:66`; `frappe/frappe/api/v1.py:154`; `frappe/frappe/api/v2.py:245`; `suite/suite/hooks.py:466`.

#### model-2 — Field manager (alan yönetimi) ve type engine (veri tipi motoru).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta yerleşik bir fieldtype motoru var: DocField/CustomizeFormField içinde reqd/unique ve tür listesi, Custom Field doğrulaması, updatedb ve Meta birleştirme. Kabul ölçütündeki 'saklama biçimi' belirsiz. Alan türü değişikliği, silme ve uzunluk küçültme gibi kırıcı değişikliklerin sınırı tanımlanmamış.

Eksik: Desteklenen fieldtype listesi ve her türün UI kontrolü/API değer eşlemesi tanımsız. UI sunum metaverisi ile sunucu doğrulaması ayrılmamış.; Property Setter ile fieldtype değişikliği yalnız naming_series için engelleniyor. Diğer tür değişikliklerinin veri kaybı/kırıcılık politikası talimatta yok.; make_property_setter izinleri yok sayıyor ve create_custom_field ignore_validate alıyor. Bunların headless yüzeye açılmayacağı yazılmamış.; Core DocType ve custom DocType'a Custom Field eklenemiyor. Talimat bu sınırı belirtmiyor.; Meta önbelleği (client_cache) temizlenince istemci tarafında sorgu geçersizleştirme sözleşmesi yok.

Sonraki adım önerisi: Görev kabulünü somutlaştır: alan ekleme Custom Field belgesiyle, özellik değişikliği Customize Form/Property Setter belgesiyle, kendi izinleriyle yapılmalı. Kırıcı değişiklik sınıfları (tür, silme, unique ekleme, uzunluk) açıkça reddedilmeli ya da onaya bağlanmalı. get_meta çıktısında reqd/unique/fieldtype değerleri API davranışıyla eşleşmeli.

Mevcut birincil görev: `native-doctype-schema--implementation-mvp`. Kaynak: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:33`; `frappe/frappe/custom/doctype/custom_field/custom_field.py:229`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:8`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:87`; `frappe/frappe/custom/doctype/custom_field/custom_field.py:291`; `frappe/frappe/model/meta.py:174`.

#### model-3 — Taxonomy management (kategori, etiket ve sınıflandırma yönetimi).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de yeniden kullanılabilir taxonomy parçaları var. (1) frappe/frappe/utils/nestedset.py: NestedSet Document temel sınıfı. on_update içinde update_nsm çalışır; parent değişince update_move_node düğümü taşır. update_add_node ve update_move_node, validate_loop ile bir düğümün kendi alt düğümüne taşınmasını NestedSetRecursionError ile reddeder. Çocuğu olan düğüm silinemez (NestedSetChildExistsError). İstemciden gelen lft/rgt değerleri restore_nsm_fields ile kayıtlı değerlere döndürülür. Ayrıca rebuild_tree ve remove_subtree var. (2) frappe/frappe/desk/treeview.py: whitelisted get_children, get_all_nodes ve add_node. _get_children frappe.qb.get_query kullandığı için standart izin kontrolünden geçer. (3) frappe/frappe/desk/doctype/tag/tag.py: Tag master, Tag Link ve whitelisted add_tag, add_tags (bulk_actions kontrolü), remove_tag, get_tagged_docs API'leri. Etiketler _user_tags kolonunda tutulur. update_tags write iznini kontrol eder ve Tag Link kayıtlarını eşitler. Desk liste görünümünde _user_tags için filtre ve istatistik var (base_list.js). suite kökünde ve yerel pilot olan, eklenti niteliğindeki suite/suite/headless_provider/api.py içinde is_tree, NestedSet, _user_tags, Tag Link ya da taxonomy kullanımı yok. Headless provider ağaç ve etiket sözleşmesi sunmuyor. Suite'in Vue frontend'i bu kalemle ilgili değil.

Eksik: Kurulu kaynakta somut bir kategori/taxonomy-term DocType'ı (is_tree=1, nsm_parent_field) yok; JSON taramasında is_tree:1 eşleşmesi çıkmadı.; Etiket ilişki modeli seçilip uygulanmamış: Table MultiSelect ile bağlantı DocType'ı mı, yerleşik Tag/_user_tags mı, karar yok.; Çoklu etiket araması (AND) için ayrılmış bir API yok. get_tagged_docs tek etiketle LIKE yapar; get_documents_for_tag tek etiket alır ve ilk karakteri koşulsuz siler. Virgülle ayrılmış _user_tags üzerinde LIKE aramasında kısmi eşleşme (örn. 'ab' ile 'abc') riski var; tag sınırına duyarlı eşleşme yok.; Kategori taşıma için kiracı ve izin politikası yok. NestedSet tek tabloda global lft/rgt tutar; kiracı başına ağaç ayrımı ya da taşıma sırasında kiracı sınırı kontrolü kaynakta görülmedi.; Tag master, add_tag içinde ignore_permissions ile global olarak oluşturuluyor; kiracıya özgü etiket sözlüğü yok.; Headless provider için ağaç ve etiket sözleşmesi yok (list/move/search endpoint'leri ve kiracı zarfı).; Döngü engeli, taşıma ve çoklu etiket kabulü için çalıştırılmış RED/GREEN kanıtı yok; functionalAcceptance=not_run.

Sonraki somut adım: Mevcut görev sırasına uyarak (taxonomy-term--contract → taxonomy-term--schema → taxonomy-term--implementation) en küçük adımlar: (1) Kontrat aşamasında modeli sabitle. Kategori, is_tree=1 olan özel bir DocType olsun; controller'ı frappe.utils.nestedset.NestedSet'ten türesin, döngü ve taşıma yerel validate_loop ile update_move_node'a bıraksın. Etiket için tek bir model seç; kiracı kapsamı gerekiyorsa kiracı alanlı Taxonomy Term ile Table MultiSelect bağlantı tablosu kullan. (2) Kiracı alanını ve taşıma sırasında aynı kiracı içinde kalma doğrulamasını tanımla (tenant-registry ve native-user-policy kontratlarına bağlı). (3) Native döngü reddini yeniden uygulama veya sırf TDD görünümü için zaten geçen native kontrolü tekrar yazma. İlk yeni davranışı tenant kapsamlı taxonomy adapter sınırına daralt; tam etiket eşleşmesi ve taşıma yetkisini sözleşmede tanımla. Uygulama aşamasında yalnız gerçekten eksik bu davranışın gerekli kontrolü seçilir; bu analizde test eklenmez. (4) Ancak bundan sonra headless provider için ince bir ağaç ve etiket arama sözleşmesi ekle. Yeni bir taxonomy motoru yazma.

Önerilen bağımlılık/sıra: taxonomy-term--contract; taxonomy-term--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; ui-view-tree--implementation-mvp (destekleyici). Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `taxonomy-term--implementation`.

Kaynak kanıtı:

- `frappe/frappe/utils/nestedset.py:129` — `validate_loop(doc.doctype, doc.name, new_parent.lft, new_parent.rgt)`
- `frappe/frappe/utils/nestedset.py:252` — `frappe.throw(_("Item cannot be added to its own descendants"), NestedSetRecursionError)`
- `frappe/frappe/utils/nestedset.py:57` — `elif old_parent != parent:`
- `frappe/frappe/desk/treeview.py:42` — `def get_children(doctype: str, parent: str = "", include_disabled: str | int | bool = False, **filters):`
- `frappe/frappe/desk/doctype/tag/tag.py:70` — `return (frappe.qb.from_(doctype).where(doctype._user_tags.like(tag)).select(doctype.name)).run()`
- `frappe/frappe/desk/doctype/tag/tag.py:101` — `frappe.get_doc({"doctype": "Tag", "name": tag}).insert(ignore_permissions=True)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/utils/nestedset.py; arama `class NestedSetRecursionError|def validate_loop|def update_move_node|def rebuild_tree|class NestedSet\b`: NestedSet, validate_loop, update_move_node ve rebuild_tree bulundu; implementasyon okundu.
- frappe/frappe; arama `def (add_tag|remove_tag|get_tagged_docs|get_tags|get_documents_for_tag|add_tags)\b|_user_tags.*like`: tag.py içinde whitelisted etiket API'leri ve document.py'de add_tag/remove_tag/get_tags bulundu; AND çoklu etiket API'si yok.
- suite; arama `(?i)is_tree|NestedSet|nestedset|_user_tags|Tag Link|taxonomy|categor(y|ies)`: Yalnız alakasız eşleşmeler var (mail, sheets, meet, build asset'leri). Taxonomy, ağaç ya da etiket modeli yok.
- suite/suite/headless_provider/api.py; arama `(?i)is_tree|NestedSet|nestedset|_user_tags|Tag Link|taxonom|categor`: Tek eşleşme unicodedata.category (karakter doğrulama); ağaç ya da etiket sözleşmesi yok.
- frappe/frappe/desk; arama `def (get_all_nodes|get_children|add_node|make_tree_args)\b|_user_tags`: treeview.py ağaç API'leri ile reportview'deki _user_tags istatistikleri bulundu.
- frappe/frappe/public/js; arama `_user_tags`: Desk liste/kanban etiket filtre ve istatistik kodu (base_list.js, tag_editor.js) bulundu.
- . (frappe+suite, *.json); arama `"is_tree":\s*1|"nsm_parent_field"`: Yalnız core doctype.json'daki nsm_parent_field alan tanımı var; is_tree=1 olan somut bir DocType yok.
- frappe/frappe; arama `_user_tags.*like|like.*_user_tags`: Yalnız get_tagged_docs'ta tek etiketli LIKE var; tam etiket eşleşmeli çoklu arama yok.

Sınır: Yalnız kurulu frappe (commit adf1fd0c) ve suite kaynak kökleri okundu; ERPNext/HRMS kurulu değil ve değerlendirilmedi.; Hiçbir test ya da komut çalıştırılmadı; functionalAcceptance=not_run. Kaynak yalnız kodun varlığını kanıtlar, runtime davranışını kanıtlamaz.; frappe.get_list/reportview'ün birden fazla _user_tags LIKE filtresini AND ile birleştirdiği genel filtre mekanizmasından çıkarıldı; database/query.py ayrıntılı okunmadı.; Derlenmiş public/dist bundle'ları ve source map'ler kanıt sayılmadı.; headless_provider yerel pilot ve eklenti niteliğinde koddur, upstream-native değildir; yalnız api.py'de hedefli grep yapıldı.; Suite commit'i bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-059`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### model-4 — İlişki tipleri, zorunlu alan, benzersizlik ve referans bütünlüğü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta Link/Dynamic Link/Table alan türleri, reqd/unique özellikleri ve link okumasında izin kontrolü var. Kabul ölçütü geçersiz Link, eksik zorunlu değer ve yinelenen benzersiz değerin reddini istiyor. 'Silme politikası' ise tanımsız: restrict mi, cascade mi, alt kayıtlar nasıl ele alınacak belli değil. Yerel delete yolunda da alt belge işleme TODO olarak duruyor.

Eksik: Silme politikası (bağlı kayıt varsa reddet, ya da yalnız child table cascade) seçilmemiş. Link kontrolü kaynağı alıntıda yok.; v1 delete_doc yolunda '# TODO: child doc handling' notu var. Hangi API sürümünün kullanılacağı belirsiz.; Mevcut verisinde yinelenen değer olan bir alana unique eklenince ne olacağı (migration/ret) tanımsız.; İlişki türleri (Link, Dynamic Link, Table, Table MultiSelect) ile N:M modeli arasında eşleme yok.; Bağlı kaydın okuma izni yokken expand_links davranışı kabul ölçütünde yer almıyor.

Sonraki adım önerisi: Kabule şunları ekle: yerel Frappe link kontrolüyle bağlı kayıt silmenin reddedilmesi; child table alt kayıtlarının üst belgeyle birlikte silinmesi; yinelenen veri varken unique eklemenin reddedilmesi; /api/v2 üzerinden reqd ve Link hatalarının doğrulanması. İlişki türü eşleme tablosunu mevcut göreve yaz.

Mevcut birincil görev: `native-doctype-schema--implementation`. Kaynak: `frappe/frappe/model/meta.py:186`; `frappe/frappe/api/v1.py:104`; `frappe/frappe/api/v1.py:71`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:123`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:49`.

#### model-5 — Kiracı özel alanları; şema sürümü ve veri tipi değişikliği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı. Custom Field/Property Setter kaynakta site DB'sinden DocType filtresiyle okunuyor. Kiracı izolasyonu ayrı bir tenant kolonuyla değil, site başına veritabanıyla sağlanıyor. Görülen kaynakta tip değişikliği yalnız naming_series için engelleniyor. Uyumsuz veriyi raporlayan bir yol yok; kaydetmede doğrudan updatedb çalışıyor. Trim Table ise kalıcı kolon silme uyarısı veriyor.

Eksik: Kiracı modeli (site başına mı, paylaşımlı mı) talimatta açıkça bağlanmamış; sızıntı kabulü bu karara bağlı.; Şema sürümü/revizyonu tanımlı değil; Frappe 17.0.0.dev0 (adf1fd0c) ile eşleme yok.; Tip değişiminde kuru çalıştırma (dry run) ve uyumsuz satır raporu sözleşmesi yok. Customize Form'daki izinli tip geçiş listesi bu alıntıda görülmedi, durumu unknown.; Trim Table/kolon silme gibi geri alınamaz adımların ürün tarafından yasaklanıp yasaklanmayacağı yazılmamış.

Sonraki adım önerisi: native-doctype-schema--implementation-post-mvp görevine şunları ekle: (1) site=tenant kararı, (2) tip değişiminden önce mevcut değerleri yeni tipe göre sayan, salt okunur bir uyumsuzluk raporu, (3) trim/kolon silmenin headless yüzeyde kapalı tutulması. Customize Form tip geçiş doğrulamasını v17 kaynağında okuyup eşle.

Mevcut birincil görev: `native-doctype-schema--implementation-post-mvp`. Kaynak: `frappe/frappe/model/meta.py:414`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:8`; `frappe/frappe/custom/doctype/customize_form/customize_form.py:247`; `frappe/frappe/custom/doctype/customize_form/customize_form.js:230`.

#### model-6 — Hesaplanan alanlar, varsayılan değerler ve doğrulama kuralları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta DocField default, fetch_from, mandatory_depends_on, is_virtual ve min/max/non_negative özellikleri var. REST v1 create/update yolları Document insert/save'den geçtiği için controller validate API yolunda da çalışıyor. Ancak read_only/fetch_from sunum ya da kopyalama davranışı. Türetilmiş değerin kullanıcı girdisiyle ezilmemesi, controller'da yeniden hesaplamaya bağlı ve böyle bir sözleşme yok.

Eksik: Hangi DocType'ta hangi formülün hesaplanacağı ve yeniden hesaplama politikası (kayıtta mı, job'da mı) tanımsız.; Import ve job yollarının aynı validate/before_save zincirinden geçtiği bu alıntıda doğrulanmadı (unknown).; UI'daki read_only/depends_on bilgisinin sunucu doğrulaması sayılmayacağı talimatta açık değil.; Suite'te ilgili controller veya doc_events örneği görülmedi.

Sonraki adım önerisi: MVP görevine her hesaplanan alan için 'sunucu controller'ında validate içinde yeniden hesapla, istemcideki değeri yok say' kuralını ekle. Kabulü tek bir DocType üzerinde API ve import yolunun aynı sonucu vermesiyle sınırla; test bütçesi paylaşımlı, bu denetimde test yazılmaz.

Mevcut birincil görev: `native-doctype-schema--implementation-mvp`. Kaynak: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:30`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:27`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:98`; `frappe/frappe/api/v1.py:50`.

#### model-7 — Modülün kayıt sahipliğini koruyan alan/varlık genişletmeleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: çakışmada kurulum durmalı. Kaynak ise bunun tersine davranıyor: create_custom_field aynı dt/fieldname varsa sessizce atlıyor. Yeni bir Property Setter da aynı özellikteki eskisini siliyor, yani son yazan kazanıyor. Property Setter'daki module alanı yalnız export içindir, sahiplik kaydı değildir. Uygulama/modül devre dışıyken gizleme mekanizması mevcut.

Eksik: Modül veya uygulama başına alan sahipliği kaydı ve çakışma politikası yok.; create_custom_fields varsayılan olarak update=True çalışıyor; başka bir modülün alanını güncelleyebileceği kontrol edilmeli (gövde alıntıda yok).; Yükseltmede is_system_generated alanların ezilebileceği kaynakta uyarılıyor; korunma kuralı tanımsız.; Suite'in hangi çekirdek DocType'ları genişlettiği (fixtures/custom_fields) alıntıda görülmedi.

Sonraki adım önerisi: Kurulum ve migration öncesi salt okunur çakışma kontrolünü açık uygulama sahipliği bildirimi üzerinden tanımla: (dt, fieldname) ve (dt, field, property) sahipleri tek kaynaktan gelsin. module/owner alanını tek başına uygulama sahipliği kanıtı sayma. Ön kontrol uygun native uygulama yaşam döngüsünün önünde çalışsın; onun yerine geçmesin ve izin atlayan helper’ları headless uç olarak açmasın.

Mevcut birincil görev: `native-doctype-schema--implementation`. Kaynak: `frappe/frappe/custom/doctype/custom_field/custom_field.py:314`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:46`; `frappe/frappe/custom/doctype/property_setter/property_setter.json:103`; `frappe/frappe/custom/doctype/custom_field/custom_field.js:33`; `frappe/frappe/model/meta.py:446`.

#### model-8 — Frappe şemasını bağımsız frontend’e taşıyan sürümlü ve izinli metadata adaptörü; semantik alan, Link/Dynamic Link, child table ve Desk davranış sınırları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat ayrıntılı: frm/script sınırı, sunucu doğrulaması ve önbellek bağlamı ele alınmış. Ancak 'hedef sürüm seçilmedi' diyor; gözlenen Frappe 17.0.0.dev0 ile eşleme yapılmamış. v2 get_meta, alan düzeyinde izin filtresi uygulamadan tam meta'yı 'All' rolüne döndürüyor. Meta önbelleği yalnız DocType adıyla anahtarlanıyor. Kayıt okumada apply_fieldlevel_read_permissions ve Link/Dynamic Link genişletmesi var, ama v1'de child silme hâlâ TODO. Suite'in /api/ yollarını engelleyen listesi adapter uç noktasını etkileyebilir.

Eksik: Ham get_meta yasak (permlevel) alanları gizlemiyor; meta için izin filtreli bir projeksiyon sözleşmesi yok.; v2 iç işleyişi 'breaking change' sayılmadan değişebilir; adapter'ın bağlanacağı rota ve sürüm sabitlemesi tanımsız (suite frappe >=16,<18 bildiriyor).; Revizyon/ETag ve kullanıcı/site/rol bağlamına göre önbellek anahtarı tanımsız.; get_meta rotasının bağlı olup olmadığı ve suite DENIED_WILDCARD_PATHS etkisi bu alıntıda görülmedi (unknown).; Child table'ı silme/ana kayıt ilişkisi davranışı v1'de eksik; v2 karşılığı görülmedi.

Sonraki adım önerisi: permissioned-metadata--implementation için v17 kaynağında kısa bir eşleme notu yaz: hangi rota kullanılacak, has_permission/permlevel ile meta alanlarının nasıl süzüleceği, revizyon alanı ve suite yol izin listesine etkisi. Bu not hazır olmadan renderer işine başlama.

Mevcut birincil görev: `permissioned-metadata--implementation`. Kaynak: `frappe/frappe/api/v2.py:246`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/model/meta.py:83`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v1.py:102`; `frappe/frappe/api/v1.py:71`; `suite/suite/hooks.py:466`; `suite/pyproject.toml:45`.

#### files-1 — DAM (Digital Asset Management — dijital varlık yönetimi), dosya ve medya kütüphanesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat Frappe Desk File Manager'ı temel alıyor. Oysa kurulu suite uygulaması File sınıfını override ediyor ve framework File izinlerini Drive izin modeliyle tamamen değiştiriyor. Drive kaynağında klasör/izin/dead-property primitifleri görülüyor; DAM metadata, haklar ve tenant sınırı ise tanımlı değil.

Eksik: Tenant sınırı tanımsız: Drive izinleri kullanıcı/grup/genel principal bazlı; filter_file is_private=0 olan dosyaları tüm kullanıcılara açık bırakıyor, 'başka tenant'a görünmemeli' kabulü bu modele eşlenmemiş.; Headless kütüphane yolu seçilmemiş: /api/v2 upload_file ile document/File mi, Drive API mi kullanılacak? Drive override'ı altında hangi yolun geçerli olduğu belirtilmemiş.; Varlık metadata/hakları için native Custom Field/Property Setter kullanılacağı ve Drive DAV Property ile ayrımı yazılmamış.; Kaynak doküman version/upstream Frappe; yerel v17-dev + suite Drive birleşimine sürüm eşlemesi yok.

Sonraki adım önerisi: native-file--implementation görevine şu notu ekleyin: kaynak sistem suite Drive'dır (File override + ignore_file_permissions). Tenant=site mi, Drive takımı mı olacağı kararını kaydedin. is_private=0 davranışına göre tenant-dışı görünürlük kabulünü yeniden yazın.

Mevcut birincil görev: `native-file--implementation`. Kaynak: `suite/suite/hooks.py:117`; `suite/suite/hooks.py:196`; `suite/suite/drive/utils/overrides.py:17`; `frappe/frappe/api/v2.py:624`.

#### files-2 — Dosya türü denetimi: MIME (Multipurpose Internet Mail Extensions — çok amaçlı internet posta uzantıları) türleri; mime_types.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: sunucu tarafı ve sahte MIME reddi. Ancak dayanak version-15 file.py; yerel kaynak v17-dev. WebDAV PUT yolunda MIME, uzantı üzerinden mimemapper ile tespit ediliyor. frappe 'filetype' bağımlılığı içerik tabanlı tespit için bir primitif sağlıyor, ama kullanımı görülmedi.

Eksik: Yerel v17 frappe/core/doctype/file/file.py ve suite Drive upload yolu incelenmemiş; version-15 notu yerel kaynağa eşlenmemiş.; _detect_mime ve _run_upload_validators gövdeleri görülmedi; içerik doğrulaması yapılıp yapılmadığı bilinmiyor.; Tek politikanın kapsayacağı tüm upload yolları listelenmemiş: v2 upload_file, Drive upload, WebDAV PUT/LOCK-create, mail upload_attachment.; Allowlist ve doctype/alan bazlı politika sahibi ile yapılandırma yeri tanımsız.

Sonraki adım önerisi: file-type-policy--implementation görevinde yerel file.py, put.py içindeki _detect_mime/_run_upload_validators ve Drive upload API'sini okuyun. Tüm upload yollarının geçtiği tek sunucu kancasını belirleyin, filetype ile içerik eşleşme kuralını o kancaya bağlayın.

Mevcut birincil görev: `file-type-policy--implementation`. Kaynak: `suite/suite/drive/webdav/put.py:109`; `suite/suite/drive/webdav/put.py:159`; `frappe/pyproject.toml:15`; `suite/pyproject.toml:13`.

#### files-3 — ClamAV ile zararlı dosya taraması.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Suite Drive'da senkron, kalıcılaştırma öncesi çalışan genişletilebilir bir upload doğrulama kancası var: validate_drive_upload. WebDAV PUT içinde _run_upload_validators tamamlanmış scratch dosyasını FileStorage olarak her hook'a veriyor. Hook True/None dışında bir değer döndürürse istek Forbidden ile reddediliyor (put.py:919-928). Bu çağrı create (put.py:153) ve overwrite (put.py:225) yollarında var. HTTP upload_file aynı hook'u çağırıp reddi frappe.throw ile uyguluyor (files.py:64-68). Frappe core File akışında before_write_file (yalnız file_size alır) ve depolamayı değiştiren write_file hook noktaları var (file.py:977-980). Bunlar tarama için kullanılabilecek ilkel araçlar, ama tarayıcı değil.

Eksik: İki app kökünde (frappe, suite) ClamAV/clamd istemcisi, INSTREAM çağrısı, tarayıcı ayarı veya bağımlılığı yok.; Ne suite ne frappe hooks.py dosyasında validate_drive_upload kaydı var. Hook listesi boş olduğundan hiçbir şey taranmıyor ve put.py:921 bu durumda sessizce geçiyor; bu fail-open demek.; Karantina veya tarama durum modeli yok. Drive yalnız Active/Trashed/Removed durumlarını tanıyor. Bu yüzden GET, PROPFIND, liste ve S3 presigned redirect (get.py:87-88) yollarında onaylanmamış dosyayı gizleme kuralı da yok.; HTTP chunked upload'da hook, birleştirilmiş dosya yerine her istekteki chunk ile çağrılıyor (files.py:64-66; birleştirme files.py:96-100). Bu yüzden tam dosya taranmaz.; Frappe core File/attachment akışında içerik tarama çağrısı yok. before_write_file kancası içerik değil yalnız file_size alıyor.; Tarayıcıya erişilemezken fail-closed davranışı ve EICAR reddi yok.; headless_provider (yerel pilot, upstream değil) içinde dosya veya tarama sözleşmesi yok.; ClamAV servis sahipliği ve imza güncelleme sözleşmesi kaynakta yok (operasyonel konu).

Sonraki somut adım: Sıra mevcut bağımlılıklara göre: (1) malware-scan--contract: Drive File için tarama durumu (Pending/Clean/Infected/ScanError) ile fail-closed okuma kuralı yazılır. Kural GET/PROPFIND/liste/presigned redirect yollarının tamamını kapsar. (2) malware-scan--implementation'ın ilk dar davranışı: suite hooks.py'ye bir validate_drive_upload uygulaması kaydedilir. Bu uygulama clamd INSTREAM ile senkron tarama yapar; infected sonuçta ya da tarayıcıya erişilemediğinde reddeder (fail-closed). Önce EICAR ve tarayıcıya-erişilemez durumları için RED test yazılır (mock clamd), sonra GREEN yapılır. (3) files.py chunked yolunda tarama, create_drive_file öncesinde birleştirilmiş temp_path üzerinde yapılacak şekilde taşınır. (4) Asenkron (RQ) tarama gerekirse karantina durumu ve okuma filtreleri eklenir. (5) Frappe core File ekleri için write_file veya File doc_events entegrasyonu ayrıca ele alınır. ClamAV servisi ve imza güncellemesi Hüseyin Cengiz'in platform devri olarak bağlanır.

Önerilen bağımlılık/sıra: malware-scan--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `malware-scan--implementation`.

Kaynak kanıtı:

- `suite/suite/drive/webdav/put.py:920` — `checks = frappe.get_hooks("validate_drive_upload")`
- `suite/suite/drive/webdav/put.py:928` — `raise Forbidden(str(result) or "This upload was cancelled by a validation check.")`
- `suite/suite/drive/api/files.py:66` — `res = frappe.call(check, file=frappe.request.files["file"], parent=parent, embed=embed)`
- `suite/suite/drive/utils/__init__.py:13` — `STATUS_TRASHED = "Trashed"`
- `suite/suite/drive/webdav/get.py:88` — `return redirect(manager.presigned_url(key, row.file_name, row.mime_type), code=302)`
- `frappe/frappe/core/doctype/file/file.py:977` — `call_hook_method("before_write_file", file_size=self.file_size)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, tüm kök; min.js/map/svg/po/pot/csv hariç); arama `(?i)clamav|clamd|pyclamd|malware|antivirus|virus|quarantin|eicar`: 6 dosya eşleşti; hiçbiri ClamAV değil. Eşleşmeler mail DMARC 'quarantine', meet recorder segment karantinası ve derlenmiş pdfWorker/noise-suppression asset'leri.
- source (_.py,_.ts,_.json,_.toml,*.txt); arama `(?i)clamav|clamd|malware|antivirus|virus|quarantin|eicar`: Yalnız dmarc.ts ve meet SegmentWatcher/CapturePipeline.test eşleşti; dosya zararlı yazılım taraması yok.
- source (_.py,_.json,_.toml,_.cfg,_.yml,_.yaml,*.txt); arama `(?i)clam|scan_status|scanned|virus_scan|is_scanned|infected`: Yalnız ilgisiz 'clamp' ve 'scanned' sayaçları bulundu; tarama durum alanı yok.
- source (tüm kök); arama `_run_upload_validators|upload_validator|before_upload|validate_upload|on_upload|file_upload_hook`: Drive WebDAV put.py:153/225/919 ve meet callback_auth sorgu doğrulaması bulundu; frappe tarafında yalnız JS on_upload_complete UI geri çağrısı var.
- source (*.py); arama `validate_drive_upload|before_write_file|"write_file"|write_file\s*=|get_hooks\("(write_file|delete_file_data_content)`: Hook tüketicileri put.py:920, files.py:64, file.py:977-978 ve file_manager.py:161-163'te; kayıtlı bir uygulama yok.
- source/**/hooks.py; arama `validate_drive_upload|before_write_file|write_file|doc_events`: suite/hooks.py ve frappe/hooks.py içinde validate_drive_upload veya tarama kaydı yok.
- suite/suite/drive; arama `^STATUS_|STATUS_\w+ *=`: Yalnız Active/Trashed/Removed var; karantina durumu yok.
- suite/suite/headless_provider; arama `(?i)scan|upload|validate_drive|File\b`: Eşleşme yok; yerel pilotta dosya tarama sözleşmesi yok.

Sınır: Yalnız statik kaynak okundu; kod, test, ClamAV servisi ve EICAR denemesi çalıştırılmadı. functionalAcceptance=not_run.; Site config, bench ortamı ve dağıtılmış servisler incelenmedi; dışarıdan kurulmuş bir ClamAV veya proxy taraması kaynakla ne kanıtlanabilir ne de dışlanabilir.; suiteCommit bilinmiyor; değerlendirme sabit yerel snapshot ile sınırlı.; Frappe core'un frappe.handler upload uç noktası ayrıntılı okunmadı; core'daki hook noktası File.save_file ve file_manager üzerinden doğrulandı.; ERPNext/HRMS kurulu değil, değerlendirilmedi.; Ürün tamamlanma iddiası veya yüzde verilmez.

Temporal workflow: `saas-recheck-20261015t073528z-060`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### files-4 — Depolama adaptörleri: MinIO ve Amazon S3 (Simple Storage Service — basit depolama hizmeti).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat S3'ü 'Frappe Drive ayrı uygulaması' olarak tanımlıyor. Yerelde ise Drive, kurulu suite uygulamasının içinde ve boto3 tabanlı S3 yolu kaynakta mevcut: generation key, proxy ve presigned GET, LOCK-create. Framework attachment'larının S3'e gidip gitmediği, MinIO endpoint uyumu ve backup/restore görülmedi.

Eksik: Ekosistem/ayrı uygulama varsayımı yanlış eşlenmiş; adaptör olarak suite Drive FileManager ve Drive Disk Settings kullanılmalı.; Drive dışı framework attachment'ları (attached_to_doctype) için depolama yolu belirsiz.; MinIO özel endpoint/path-style yapılandırması ve sürüm doğrulaması kaynakta görülmedi.; Özel ACL (presigned süre, CSP sandbox) ve S3 nesnelerinin bench backup/restore kapsamı tanımsız.

Sonraki adım önerisi: object-storage--implementation kaynağını suite Drive FileManager/Drive Disk Settings olarak güncelleyin. FileManager.s3 bağlantı kurulumunu okuyup MinIO endpoint desteğini belirleyin. Backup/restore'u ayrı bir kabul satırı olarak sabitleyin.

Mevcut birincil görev: `object-storage--implementation`. Kaynak: `suite/pyproject.toml:15`; `suite/suite/drive/webdav/get.py:41`; `suite/suite/drive/webdav/put.py:6`; `suite/suite/drive/workspace/drive/drive.json:41`.

#### files-5 — Dosya boyutu, uzantı ve gerçek içerik doğrulama; karantina.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul cümlesi anlamlı. Kaynakta boyut tavanı, upload validator çağrısı ve indirmede aktif içerik nötrleştirme var. Ancak MIME tespiti uzantıya dayanıyor. Byte/magic doğrulaması ve tarama karantinası kaynakta görünmüyor. Talimat v15 File controller'ını referans alıyor. Yerelde ise v17-dev çalışıyor ve File sınıfı Suite/Drive tarafından override ediliyor.

Eksik: Kaynak eşlemesi v15 file.py'yi gösteriyor; yerel Frappe 17.0.0-dev ve suite.drive.overrides.file.File override'ı talimatta yok; Tüm giriş yolları için tek doğrulama kapısı tanımlanmamış: Frappe upload_file, WebDAV PUT/LOCK-create ve mail upload_attachment; Karantina durum modeli eksik: bekliyor/temiz/zararlı, erişim kapalı varsayılanı, tarayıcı hatasında fail-closed davranışı; _run_upload_validators ve _detect_mime gövdeleri excerpt'te yok; içerik/uzantı uyuşmazlığı kontrolü doğrulanmadı; ClamAV yalnızca kaynak linki olarak geçiyor; tarayıcı, senkron/asenkron çalışma ve zaman aşımı sözleşmesi yok

Sonraki adım önerisi: native-file--implementation görevine önce kısa bir sözleşme eklenmeli: v17 + Drive override eşlemesi, giriş yolu envanteri ve karantina durumları. Ardından mevcut _run_upload_validators kancası okunmalı. Byte doğrulaması için kurulu filetype bağımlılığının yeniden kullanılıp kullanılamayacağı burada değerlendirilmeli. Kabul durumu not_run kalıyor.

Mevcut birincil görev: `native-file--implementation`. Kaynak: `suite/suite/drive/webdav/put.py:153`; `suite/suite/drive/webdav/put.py:109`; `suite/suite/drive/webdav/put.py:141`; `frappe/pyproject.toml:15`; `suite/suite/drive/webdav/get.py:60`; `suite/suite/hooks.py:196`; `frappe/frappe/api/v2.py:624`.

#### files-6 — Özel/genel erişim, süreli bağlantı ve güvenli indirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat özel/genel ayrımını native Frappe olarak tanımlıyor. Yerelde ise framework File izinleri tamamen devre dışı. Bunların yerini Drive has_permission ve query conditions alıyor. S3 presigned yönlendirmesi bir site bayrağına bağlı. Yerel disk için süreli bağlantı primitifi görülmüyor. Tenant tanımı da talimatta eşlenmemiş: site mi, Drive takımı mı?

Eksik: ignore_file_permissions=True nedeniyle yetki sınırının Drive permission modeli olduğu talimatta yazmıyor; Tenant tanımı eksik: site başına DB ile Drive team/principal ayrımı; 'başka tenant reddi' kabulü bu yüzden test edilemez; Presigned URL ömrü ve iptali excerpt'te görünmüyor; yerel disk için imzalı/süreli link sözleşmesi yok; Paylaşım linki, Guest erişimi ve Drive GENERAL_USER semantiği talimatta tanımlı değil

Sonraki adım önerisi: native-file--implementation görevinde yetki otoritesi user_has_permission ve filter_file olarak sabitlenmeli. Tenant'ın site sınırı olduğu yazılmalı. Süreli link için sözleşme belirlenmeli: mevcut presigned_url süresinin kaynağı ve yerel disk için eşdeğer çözüm. Bu sözleşme ui-view-gallery tüketicisine bildirilmeli.

Mevcut birincil görev: `native-file--implementation`. Kaynak: `suite/suite/hooks.py:117`; `suite/suite/hooks.py:156`; `suite/suite/drive/utils/overrides.py:17`; `suite/suite/drive/webdav/get.py:87`; `suite/suite/drive/webdav/get.py:88`; `suite/suite/drive/webdav/get.py:77`.

#### files-7 — Medya sürümleri, önizleme, küçük görsel ve biçim dönüştürme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta küçük görsel üretimi var: FileManager create_thumbnail ve thumbnail_prefix. ffmpeg ve av ile video thumbnail/transcode bağımlılığı bildirilmiş. Ancak WebDAV PUT aynı varlığın üzerine yazıyor. 'Orijinal korunmalı' kabulünü karşılayan dosya sürüm modeli kaynakta görünmüyor. Talimat yalnızca Frappe görsel kırpmasını referans alıyor, Drive'ın medya pipeline'ını hiç anmıyor.

Eksik: Talimat Suite/Drive thumbnail ve transcode primitiflerini anmıyor; yeniden kullanım sınırı belirsiz; Orijinal ile türev ilişkisinin veri modeli yok: türevin hangi File/entity'ye bağlanacağı tanımsız; Overwrite her seferinde yeni S3 generation key yazıyor; eski generation'ın saklanıp saklanmadığı ve sürüm geçmişi excerpt'te görünmüyor; Başarısız dönüşümün yayınlanmaması için durum alanı ve yeniden deneme sözleşmesi tanımlı değil

Sonraki adım önerisi: asset-rendition--implementation görevine önce bir envanter adımı eklenmeli. FileManager.upload_file(create_thumbnail) ve ffmpeg kullanımı okunup ne yeniden kullanılacağı yazılmalı. Ardından sürüm/türev bağı ve 'hazır değil' durumu tek sözleşmede tanımlanmalı. Yeni format pipeline'ı bu adımdan sonra kapsamlanmalı.

Mevcut birincil görev: `asset-rendition--implementation`. Kaynak: `suite/pyproject.toml:37`; `suite/suite/drive/webdav/lock.py:218`; `suite/suite/drive/webdav/pathmap.py:201`; `suite/suite/drive/webdav/put.py:4`; `suite/suite/drive/webdav/put.py:6`.

#### files-8 — Dosya-kayıt kullanım ilişkileri; sahipsiz dosya temizliği ve saklama süresi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Dosya-kayıt ilişkisi için iki alan çifti mevcut: attached_to_* ve content_doctype/content_docname. Silme işlemi geri alınabilir çöp kutusuna gidiyor. Saatlik zamanlayıcı yalnızca kilit temizliği için görülüyor. Sahipsiz dosya tespiti, saklama süresi ve çöpün kalıcı temizliği kaynakta görünmüyor; durumları unknown. Talimat iki ilişki modelini ve trash durumunu ayırt etmiyor.

Eksik: 'Kullanılıyor' tanımı eksik: attached_to_*, content_doctype/docname, Drive klasör üyeliği ve Writer/Sheet/Presentation yedeklemesi; Retention süresi, sahibi (tenant/site ayarı) ve trash'ten kalıcı silme kuralı tanımsız; Temizleme denetim kaydı ve geri dönüş penceresi sözleşmesi yok; İç kompanzasyon silmesi ignore_permissions kullanıyor; bu yol temizleme API'si olarak dışa açılmamalı, talimatta bu sınır yazmıyor

Sonraki adım önerisi: native-file--implementation görevinde önce kullanım ilişkileri ve STATUS_TRASHED yaşam döngüsü tek tabloda yazılmalı. Ardından mevcut trash akışının üstüne yalnızca kuru çalıştırma (dry-run) raporu tanımlanmalı. Kalıcı silme kuralı bu raporla onaylandıktan sonra eklenmeli.

Mevcut birincil görev: `native-file--implementation`. Kaynak: `suite/suite/drive/webdav/pathmap.py:30`; `suite/suite/drive/webdav/structure.py:87`; `suite/suite/sheets/patches/integrate_with_drive.py:39`; `suite/suite/drive/webdav/locks.py:288`; `suite/suite/drive/webdav/put.py:184`; `suite/suite/drive/webdav/perms.py:46`.

### Entegrasyonlar, olaylar ve yapay zekâ

#### events-1 — Event bus (modüller arası olay dağıtım altyapısı).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü somut: olay yeniden başlatmada kaybolmamalı, aboneler izole olmalı ve olay tekrar işlenebilmeli. Kaynakta yalnız temel araçlar görülüyor: doc_events hookları, Socket.IO realtime ve frappe.enqueue. Bunlar dayanıklı bir bus değil. Talimat, teslim yöntemini outbox (events-4), inbox (events-5) ve retry (events-6) görevlerine bağlamıyor.

Eksik: Bus'ın events-4/5/6 üzerine kurulan ince bir dağıtıcı mı, ayrı bir altyapı mı olacağı yazılmamış.; Event Streaming dışlaması dokümana dayanıyor; v17.0.0-dev kaynağında bu modülün durumu bu excerptlerde doğrulanmadı.; Abone kaydının nerede tutulacağı ve modül sahipliği tanımlı değil.; Hangi modüllerin senkron kalacağına dair pilot kapsam yok.

Sonraki adım önerisi: event-dispatch--implementation görevine şu kararı yazın: bus, outbox ve inbox üzerinde çalışan bir dağıtıcıdır ve yeni bir altyapı değildir. Bir pilot olay belirleyin (ör. Calendar Event invite) ve abone kaydının sahibini netleştirin.

Mevcut birincil görev: `event-dispatch--implementation`. Kaynak: `suite/suite/hooks.py:224`; `frappe/pyproject.toml:97`; `frappe/frappe/api/v2.py:293`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:6`.

#### events-2 — Modülün yayımlanmış işlevleri; komut, sorgu ve olay kayıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta yayımlama için gereken temel araçlar var: whitelist, /method RPC, is_whitelisted ve override_whitelisted_methods. Kabul ölçütü de anlamlı: yalnız kayıtlı ve izinli komut çalışmalı, sürüm uyumsuzsa çağrı reddedilmeli. Ancak katalog formatı, sürümleme kuralı ve modül izin modeli tanımlı değil. Ayrıca ui-provider-registry destek görevi, UI ve GenUI registry'leriyle karışma riski taşıyor.

Eksik: Command/query/event katalog şeması ve sürüm uyumluluk kuralı (semver/ret) tanımlı değil.; Kaynak v2.py iç uygulamayı kararlı sözleşme saymıyor. Hangi sınırın yayımlanmış API olduğu belirtilmemiş.; Katalogun GenUI ve UI provider registry'lerinden ayrı tutulacağı açıkça yazılmamış.; Tenant bağlamı ve modül izinlerinin native DocType izinleriyle nasıl eşleneceği belirtilmemiş.

Sonraki adım önerisi: Görev tanımına bir sınır cümlesi ekleyin: sunucu command/query/event katalogu backend modül sözleşmesidir ve UI/GenUI registry'leriyle birleştirilmez. Yetki için native whitelist ve has_permission kullanılır. Sürüm uyumsuzluğunda verilecek ret kodunu da tanımlayın.

Mevcut birincil görev: `event-dispatch--implementation`. Kaynak: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:259`; `frappe/frappe/api/v2.py:8`; `suite/suite/hooks.py:202`.

#### events-3 — Olay kimliği, kiracı bağlamı, ilişkilendirme kimliği ve şema sürümü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: tenant veya şema sürümü eksik olay reddedilmeli, correlation kimliği zincir boyunca korunmalı. Kaynakta yalnız dağınık parçalar var: site bazlı realtime namespace, ad-hoc job_id ve alan-özel payloadlar. Ortak bir zarf görülmüyor. Tenant'ın site mi, site içi organizasyon mu olduğu da belirtilmemiş.

Eksik: Tenant tanımı yok: site düzeyi mi, site içi kiracı mı?; Zarf alanları (event_id, tenant, correlation_id, causation_id, schema_version, occurred_at) ve şema kayıt yeri tanımlı değil.; ui-provider-realtime destek görevi, UI realtime taşımasını dayanıklı olay zarfıyla karıştırma riski taşıyor.; Correlation kimliğinin HTTP isteğinden enqueue edilen işe nasıl taşınacağı belirtilmemiş.

Sonraki adım önerisi: event-dispatch--implementation altında tek bir zarf şeması belirleyin; tenant kararı burada yazılmalı. Realtime yayınlarının bu zarfın bir projeksiyonu olduğunu da not edin. Yeni görev açmayın.

Mevcut birincil görev: `event-dispatch--implementation`. Kaynak: `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:17`; `suite/suite/writer/doctype/writer_document/writer_document.py:125`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:10`; `suite/suite/calendar/doctype/event_notification/event_notification.json:187`.

#### events-4 — Transactional outbox (veri değişikliğiyle aynı işlemde kaydedilen olay kutusu).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: kuyruk kapalıyken commit edilen olay outbox'ta kalmalı ve kuyruk açılınca tek iş etkisi oluşmalı. Kaynakta for_update kilidi ve enqueue var. Outbox tablosu veya dağıtıcı görülmüyor. Commit sonrası hookları bu excerptlerde yok. Talimat outbox'ın veri modelini ve dağıtıcı sahipliğini tanımlamıyor.

Eksik: Outbox'ın bir DocType mı yoksa doğrudan bir tablo mu olacağı, şeması ve native migrate ile yönetimi belirtilmemiş.; Dağıtıcının nasıl çalışacağı (scheduler mı, worker mı), kilitleme ve tekil seçim kuralı yok.; Frappe v17-dev transaction hook API'si bu kaynakta doğrulanmadı.; ui-provider-offline destek görevi, istemci offline kuyruğunu sunucu outbox'ıyla karıştırıyor.

Sonraki adım önerisi: outbox--implementation görevine şunları yazın: outbox satırı, iş verisiyle aynı DB transaction'ında native insert ile oluşur. Dağıtıcı enqueue'yu yalnız teslim aracı olarak kullanır. Tek pilot olay seçin ve ui-provider-offline bağını kaldırın.

Mevcut birincil görev: `outbox--implementation`. Kaynak: `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:293`; `suite/suite/calendar/doctype/calendar_event/invitations.py:10`.

#### events-5 — Idempotency (aynı işlemin tekrarında mükerrer etkiyi önleme) ve tüketici tekilleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü ölçülebilir: on eşzamanlı işlemde tek etki ve tutarlı yanıt. Kaynakta yalnız zayıf desenler var: job deduplicate, istemci tarafı tekrar sahiplenme ve check-then-insert. Bu desenler yarış durumuna karşı güvenli değil. Kalıcı bir tüketici dedup kaydı görülmüyor.

Eksik: İdempotency anahtarının nasıl türetileceği (event_id + consumer) ve DB unique kısıtı tanımlı değil.; Tekrarda önceki sonucun döndürülmesi ve kaydın saklama süresi belirtilmemiş.; Senkron komut idempotency'si (HTTP Idempotency-Key) ile tüketici dedup'ının ayrımı yok.; ui-provider-offline bağı sunucu inbox'ıyla karışıyor.

Sonraki adım önerisi: inbox--implementation görevine şunları yazın: (consumer, event_id) çifti için unique bir kayıt tutulur ve iş etkisiyle aynı transaction'da yazılır. frappe.db.exists ile ön kontrol yeterli sayılmaz. Senkron komut anahtarı ayrı bir maddeye ayrılmalı.

Mevcut birincil görev: `inbox--implementation`. Kaynak: `suite/suite/writer/doctype/writer_document/writer_document.py:127`; `suite/suite/mail/events.py:20`; `suite/frontend/src/apps/meet/utils/sfu/__tests__/ParticipantConnectionEvents.test.ts:428`.

#### events-6 — Kalıcı olayda yeniden deneme, sıralama kapsamı ve yeniden işleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü kontrollü retry, sıralı replay ve görünür bir inceleme kuyruğu istiyor. Kaynakta sunucu tarafında başarısız teslim yalnız loglanıyor. Sınırlı retry yalnız istemci realtime aboneliğinde var. Sıralama yalnız Calendar'a özgü SEQUENCE alanıyla sağlanıyor. outbox--implementation-mvp eşlemesi var ama politika parametreleri yok.

Eksik: Retry sınırı ve backoff tanımı yok, poison olaya geçiş eşiği yok.; Sıralama kapsamı (aggregate, tenant ya da global) tanımlı değil.; Replay yetkisi ve audit kaydı belirtilmemiş, replay'in idempotency'ye bağımlılığı yazılmamış.; İnceleme kuyruğunun bir DocType mı, Error Log mu olacağı ve izinleri belirsiz.

Sonraki adım önerisi: outbox--implementation-mvp görevine politika tablosu ekleyin: max deneme, backoff, aggregate bazlı sıra, poison durumu ve yetkili replay. Görevi açıkça events-5 inbox görevine bağımlı işaretleyin.

Mevcut birincil görev: `outbox--implementation-mvp`. Kaynak: `suite/suite/calendar/doctype/calendar_event/invitations.py:137`; `suite/frontend/src/apps/meet/composables/useGuestRealtime.ts:28`; `suite/suite/calendar/doctype/calendar_event/calendar_event.json:198`.

#### events-7 — Hata yayılımını sınırlama; eşzamanlı çağrı/arka plan olayı seçimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta hata izolasyonu desenleri görülüyor: execute_with_logging, "never worth failing" yaklaşımı, JMAP yazımından sonra enqueue ve eşiğe bağlı async bulk. Kabul ölçütü somut: yavaş bir dış servis diğer kuyrukları kilitlememeli. Ancak kuyruk atama ve tazmin kuralları talimatta yok. Kuyruk adları ve timeout değerleri bu excerptlerde doğrulanmadı.

Eksik: Senkron/asenkron seçim kriteri (kullanıcı beklentisi, tutarlılık, dış bağımlılık) yazılmamış.; Modül ya da dış servis başına kuyruk ve timeout ataması yok.; Senkron komut başarısız olduğunda tazmin veya geri alma sonucu tanımlı değil.; Hook içindeki dış çağrı hatalarının ana transaction'ı bozup bozmayacağı belirtilmemiş.

Sonraki adım önerisi: event-dispatch--implementation görevine kısa bir karar tablosu ekleyin: senkron, outbox/async veya dış servis için özel kuyruk. Doğrulamayı Calendar invite örneğiyle yapın: JMAP yazımı senkron, bildirim async.

Mevcut birincil görev: `event-dispatch--implementation`. Kaynak: `suite/suite/mail/events.py:191`; `suite/suite/calendar/doctype/calendar_event/mailing_lists.py:47`; `frappe/frappe/api/v2.py:32`; `suite/suite/calendar/doctype/calendar_event/invitations.py:11`.

#### ai-1 — AI providers (yapay zekâ sağlayıcıları) ve model bağlantıları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var. Ancak yönerge bu yeteneği 'external' sayıyor ve kurulu Suite içindeki mevcut Anthropic entegrasyonunu (Sheets AI Assist) hiç anmıyor. Kaynakta tek sağlayıcılı, kod içine sabitlenmiş bir model çağrısı var; tenant kapsamlı sağlayıcı/model kaydı yok.

Eksik: Mevcut suite/sheets/ai istemcisinin yeniden mi kullanılacağı, sarılacağı mı yoksa dokunulmadan mı bırakılacağı tanımlanmamış.; API anahtarının nerede saklandığı ve tenant/site kapsamı belirtilmemiş; anahtarın kaynağı olan api modülü pakette yok.; Model kimliği kodda sabit (DEFAULT_MODEL); izinli model listesi ve sürüm eşlemesi yok.; ai-1 ile ai-2 aynı primaryTaskId'yi paylaşıyor; kabul kapsamları ayrıştırılmamış.

Sonraki adım önerisi: ai-model-connection--implementation görevine şu sınır kararını yazın: Suite Sheets AI yalnızca tüketici olarak kalsın; sağlayıcı adaptörü ve anahtar saklama yeri (site/tenant kapsamı) ayrı bir sözleşmede tanımlansın. Yeni görev açmayın.

Mevcut birincil görev: `ai-model-connection--implementation`. Kaynak: `suite/pyproject.toml:32`; `suite/suite/sheets/ai/client.py:15`; `suite/suite/sheets/ai/client.py:88`.

#### ai-2 — Model yönlendirme, alternatif sağlayıcı ve zaman aşımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı (zaman aşımında izinli alternatife geçiş, süre/maliyet limiti) ama sayısal limit ve bütçe kaynağı yok. Kaynaktaki 'fallback', sağlayıcılar arası geçiş değil; deterministik sezgiselden modele geçen bir zincir. Model çağrısında açık bir timeout parametresi görülmüyor.

Eksik: Toplam süre, deneme sayısı ve maliyet tavanı için değer ya da yapılandırma kaynağı yok.; Alternatif sağlayıcıya geçerken veri politikasının (ai-5) yeniden uygulanması gerektiği yazılmamış.; Hata eşlemesi (RateLimit/Connection) var ama geçiş kuralı yok; heuristic-first deseninin router ile ilişkisi tanımsız.

Sonraki adım önerisi: Mevcut görevin kabul metnine somut sayılar ekleyin: zaman aşımı, deneme sayısı ve maliyet tavanı. Ayrıca alternatif sağlayıcının ai-5 izin listesinden geçmesi zorunluluğunu yazın. Giden HTTP için Frappe'nin timeout/SSRF ilkelerine atıf yapın.

Mevcut birincil görev: `ai-model-connection--implementation`. Kaynak: `suite/suite/sheets/ai/heuristics.py:9`; `suite/suite/sheets/ai/client.py:103`; `frappe/frappe/automation_engine/actions/core.py:23`.

#### ai-3 — Prompt (modele verilen talimat) şablonu, sürümü ve değişkenleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: eksik değişken reddedilsin ve her çalıştırma değişmez bir prompt sürümüne bağlansın. Fakat 'absent' değerlendirmesi, kaynaktaki Jinja sandbox ilkelini atlıyor. Frappe ortamı DebugUndefined kullandığı için eksik değişken varsayılan olarak reddedilmez. Suite'teki prompt kodda sabit ve sürümsüz.

Eksik: Prompt ve sürümün nerede saklanacağı (DocType/Version) ve değişmezlik kuralı tanımsız.; Değişken şeması doğrulamasının global jenv değiştirilmeden nasıl yapılacağı belirtilmemiş.; Mevcut _SYSTEM sabitinin göç ya da istisna durumu yazılmamış.

Sonraki adım önerisi: prompt-template--implementation görevine şunu ekleyin: değişkenler, şablon render edilmeden önce şablona özgü bildirilmiş bir şemayla kontrol edilecek; Frappe'nin global Jinja ayarları değiştirilmeyecek. Sözdizimi kontrolü için validate_template yeniden kullanılsın.

Mevcut birincil görev: `prompt-template--implementation`. Kaynak: `frappe/frappe/utils/jinja.py:66`; `frappe/frappe/utils/jinja.py:96`; `suite/suite/sheets/ai/client.py:18`.

#### ai-4 — Model girdisi/çıktısı, maliyet, kalite değerlendirmesi ve tekrar üretilebilir kayıt.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni izlenecek alanları sayıyor (model/prompt sürümü, token maliyeti, eval sonucu, maskeleme). Ancak kayıt şeması, saklama süresi ve eval yöntemi yok. Mevcut istemci yanıttaki kullanım/maliyet bilgisini atıyor, yalnızca eylem listesini döndürüyor. Frappe tarafında yalnızca genel log belgesi ilkelleri görülüyor.

Eksik: Çağrı kaydı alanları, saklama/silme süresi ve erişim yetkisi tanımsız.; Eval ölçütü ve tekrar inceleme için hangi girdinin maskelenmiş olarak saklanacağı yazılmamış.; Maliyet hesabı için fiyat tablosunun kaynağı yok.

Sonraki adım önerisi: ai-call-record--implementation görevi için asgari kayıt alanlarını belirleyin: model, prompt sürümü, token, maliyet, eval, maskelenmiş girdi özeti. Saklama için Frappe'nin log belgesi ve clear_old_logs desenini yeniden kullanın.

Mevcut birincil görev: `ai-call-record--implementation`. Kaynak: `suite/suite/sheets/ai/client.py:114`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:38`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:98`.

#### ai-5 — Hassas veri maskeleme ve sağlayıcıya gönderilebilecek veri sınırları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: yasak alan sağlayıcı isteğine hiç girmemeli. Ancak alan sınıflandırmasının kaynağı ve uygulama noktası yok. Suite bağlamı boyut olarak sınırlıyor ama örnek hücre değerlerini maskelemeden gönderiyor. Frappe'nin alan düzeyi okuma izni yalnızca asgari bir filtre.

Eksik: Hassas alan sınıflandırması (DocField düzeyi mi, politika belgesi mi) ve varsayılan-red kuralı tanımsız.; Maskeleme kararının denetim kaydının ai-4 ile nasıl bağlanacağı yazılmamış.; İzin filtresinin kullanıcının kendi oturum izniyle uygulanacağı ve ignore_permissions kullanılmayacağı açıkça yazılmamış.

Sonraki adım önerisi: ai-policy--implementation görevine şunları ekleyin: sağlayıcı adaptöründen önce tek bir zorunlu filtre olacak; önce apply_fieldlevel_read_permissions, ardından varsayılan-red alan sınıflandırması uygulanacak. Suite Sheets bağlamı da bu filtreden geçmeli.

Mevcut birincil görev: `ai-policy--implementation`. Kaynak: `suite/suite/sheets/ai/context.py:3`; `suite/suite/sheets/ai/context.py:122`; `frappe/frappe/api/v1.py:84`.

#### ai-6 — Prompt injection (içerikle modele yetkisiz talimat verme) koruması ve çıktı denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü doğru: yetkisiz araç çalışmamalı, şema dışı çıktı reddedilmeli. Suite'te zorunlu araç şeması ve sunucu tarafı eylem temizliği var. Ancak hücre içeriği kullanıcı isteğiyle aynı mesaja ekleniyor (dolaylı enjeksiyon riski). setCell formülü yalnızca uzunluk kontrolünden geçiyor. Araç izinlerinin Frappe izinlerine eşlenmesi yönergede yok.

Eksik: Her AI aracının hangi Frappe izin tipine (read/write/submit) eşleneceği tanımsız.; Güvenilmeyen içerik ile talimat ayrımı ve formül/metin çıktısının içerik denetimi tanımsız.; Server Script veya ignore_permissions kısayolunun yasak olduğu açıkça yazılmamış.

Sonraki adım önerisi: ai-policy--implementation görevine şunu ekleyin: her aracın çağrısı kullanıcının oturumuyla has_permission ve check_permission kontrolünden geçecek; şema doğrulaması yetkilendirmenin yerine geçmeyecek. Ayrıca kısa bir tehdit senaryosu listesi yazın (test yazmadan).

Mevcut birincil görev: `ai-policy--implementation`. Kaynak: `suite/suite/sheets/ai/validate.py:4`; `suite/suite/sheets/ai/validate.py:38`; `suite/suite/sheets/ai/client.py:89`; `frappe/frappe/api/v1.py:132`.

#### ai-7 — Ant Design X / X Cards ile izinli katalogdan şemalı GenUI ve AI kesintisinde normal iş ekranları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kurulu kaynakta Ant Design, Ant Design X, X Cards, A2UI veya GenUI bileşen kataloğu yok. Kodda bulunan en yakın yapılar şunlar: (1) Upstream Suite Sheets 'AI Assist' (Vue arayüzü). ai_assist uç noktası önce Sheet için write iznini doğruluyor. Model, zorunlu bir tool çağrısıyla yalnızca JSON şemalı eylemler üretebiliyor (enum: setCell ve answer; additionalProperties=false). Sunucudaki clean_actions bu şemaya uymayan eylemleri sessizce atıyor; ilk adım deterministik ve yerel bir sezgisel kural katmanı. Sunucu sayfayı kendisi değiştirmiyor; eylemler istemci motorunda undo/op-log hattına katılıyor. AI ayarı kapalıysa ya da anahtar yoksa yalnızca AI çağrısı hata veriyor; normal Sheets ekranı bundan ayrı çalışmaya devam ediyor. (2) suite/headless_provider, yerel pilot olarak sonradan eklenmiş kod; upstream'de yok. headless-metadata.v1 sözleşmesi kapsamında: oturum kullanıcısı ve yerel izin yeniden kontrolü, alan düzeyinde okuma izniyle filtrelenmiş metadata projeksiyonu, bilinmeyen anahtarların reddi, preview→digest→apply onay akışı ve revision çakışma kontrolü. (3) frappe/ui (Vue) içinde bir fieldtype→component kaydı var, ancak bilinmeyen tür reddedilmiyor; FALLBACK bileşenine düşüyor.

Eksik: Frappe kaynak/action registry kimlikleri ile kullanıcıya ait ayrı GenUI capability registry kimlikleri arasında sürümlü eşleme sözleşmesi eksik.; Kurulu Suite Vue/Sheets AI örneği, seçilmiş React/Ant/X Cards tüketicisinin entegrasyon kanıtı değildir; tüketici bu turda taranmadı.; İzinli server action şeması, açık red/hata, tenant kapsamı, onay ve AI kesintisinde normal ekran sözleşmesi eksik; yerel metadata pilotunun dar kanıtı ayrı tutulur.; Yerel callback/ReactNode ile serileştirilebilir model JSON sınırının kabul ölçütü mevcut göreve bağlanmalı.

Sonraki somut adım: Önce mevcut capability-definition--contract, native-user-policy--contract ve kernel-envelope--contract sınırlarını netleştir; ui-family-39--contract bunları tüketir. Frappe sağlayıcı yalnız izinli kaynak/projection metadata kimliklerini, sunucu eylem kimliklerini, JSON girdi/çıktı şemalarını, revizyonu ve kullanıcı/tenant yetki kapsamını mevcut kaynak/action registry üzerinden sunmalı. GenUI component/props capability kataloğu kullanıcıya ait backend bağımsız projede kalır; Frappe bileşen kataloğunun sahibi veya kopyası olmaz. Tüketici bu iki ayrı registry kimliğini açık bir eşleme ile bağlar; callback/ReactNode model JSON sınırından geçmez. En küçük sonraki davranış, mevcut metadata sözleşmesiyle tek izinli action kimliğinin sürüm/yetki reddini bağlamaktır. Yazma eylemlerinde preview/onay/apply ve native validation korunur. AI kesintisinde normal headless ekran ayrı çalışır; offline/outbox kapsamı kendi mevcut görevindedir. Bu denetimde test veya uygulama yapılmaz.

Önerilen bağımlılık/sıra: ui-family-39--contract; ui-family-39--implementation; kernel-envelope--contract; ui-family-01--contract; native-user-policy--contract; capability-definition--contract; ui-family-07--contract; ui-provider-registry--implementation-post-mvp. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-39--implementation-post-mvp`.

Kaynak kanıtı:

- `suite/suite/sheets/ai/client.py:51` — `"enum": ["setCell", "answer"],`
- `suite/suite/sheets/ai/client.py:97` — `tool_choice={"type": "tool", "name": "emit_actions"},`
- `suite/suite/sheets/api.py:620` — `frappe.has_permission("Sheet", doc=name, ptype="write", throw=True)`
- `suite/suite/sheets/api.py:665` — `return {"actions": ai_validate.clean_actions(raw), "model": model, "source": source}`
- `suite/suite/headless_provider/api.py:26` — `CONTRACT_VERSION = "headless-metadata.v1"`
- `frappe/ui/src/components/Fields/fieldTypes.ts:62` — `return registry.get(fieldtype) ?? registry.get(FALLBACK)!;`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe+suite, tümü); arama `(?i)(ant-design|antd|@ant-design/x|x-cards|a2ui|genui|generative.?ui|component.?catalog)`: 58 dosya eşleşti; hepsi alakasız alt dize eşleşmesi (participant vb.) veya derlenmiş map dosyası.
- source (frappe+suite, *.map hariç); arama `(@ant-design|\bantd\b|x-cards|XCards|\bA2UI\b|GenUI|generative[_ -]?ui)`: Eşleşme yok.
- suite/suite/sheets (*.py); arama `clean_actions|generate_actions|heuristic|ai_assist|has_permission`: ai_assist bulundu: write izni, sezgisel kural→model akışı ve clean_actions doğrulaması.
- source (dist/assets hariç); arama `(?i)(offline|navigator\.onLine|serviceWorker|IndexedDB|sync.?queue|outbox)`: Yalnız alakasız eşleşmeler: locale, email_queue, automation_engine outbox testi vb. İstemci tarafında offline kayıt/kuyruk yok.
- source (dist/assets/locale hariç); arama `(?i)(json.?render|render.?schema|component.?registry|allowed.?components|ui.?schema|catalog)`: frappe/ui fieldTypes.ts (Vue, fallback'li registry) ve Suite ayar katalogu bulundu; GenUI kataloğu yok.
- frappe/ui (package.json, fieldTypes.ts); arama `(?i)(catalog|registry|"react"|"vue"|unknown|unsupported)`: Vue >=3.3 bağımlılığı var; bilinmeyen fieldtype FALLBACK bileşenine düşüyor.
- suite/frontend/src; arama `(?i)(ai.?assist|aiAssist|actions\.forEach|setCell)`: Sheets Vue bileşenleri ve motoru bulundu (AISettingsDialog.vue, SheetEditor); React/Ant Design yok.

Sınır: Yalnızca statik kaynak okundu; komut veya test çalıştırılmadı. functionalAcceptance: not_run.; Sheets frontend'inin eylemleri nasıl uyguladığı ayrıntılı okunmadı; undo/op-log iddiası api.py docstring'ine ve sheet_op_log'daki 'ai_assist' kaynağına dayanıyor.; headless_provider yerel pilot koddur; upstream Suite veya Frappe davranışı sayılmamalı.; ERPNext/HRMS ve kullanıcının GenUI projesi bu kaynakta yok ve değerlendirilmedi.; Derlenmiş dist/assets/*.map dosyaları ayrıntılı incelenmedi; kaynak eşleşmesi olmadığı için yeterli kabul edildi.; 320px ve 14 CSS px tarayıcı doğrulaması yapılmadı.

Temporal workflow: `saas-recheck-20261015t073528z-010`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### rag-1 — RAG (Retrieval-Augmented Generation — bilgi getirmeyle desteklenen üretim) sunucusu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü var: yetkili kaynaktan yanıt, kaynak gösterimi ve kiracılar arası sızıntı olmaması. Ancak RAG servisinin Frappe ile sınırı tanımlanmamış. Kaynakta yalnız yapı taşları bulunuyor: Frappe'de izin kontrolü yapan REST okuma, SQLite FTS tabanlı sözcüksel arama ve Suite'te Sheets için Anthropic bağımlılığı. Embedding, vektör deposu, üretim ve atıf yapan bir RAG sunucusu kaynakta görülmedi.

Eksik: RAG servisinin Frappe'den hangi uç noktayla ve hangi kullanıcı kimliğiyle veri okuyacağı tanımlanmamış (Keycloak → Frappe kullanıcısı eşlemesi, servis hesabı yasağı).; Kiracı tanımı yok: site = kiracı mı, yoksa site içi ayrım mı?; Frappe 17.0.0.dev0 / v2 API'ye sürüm eşlemesi yok; kaynaklar sürüm belirtmeyen genel dokümanlar.; Suite'teki mevcut Anthropic kullanımıyla (Sheets AI Assist) RAG sunucusu arasındaki sınır belirsiz.

Sonraki adım önerisi: rag-source--implementation altında kısa bir entegrasyon sözleşmesi yazılmalı. Sözleşme şunları belirlemeli: retrieval çağrısı son kullanıcı kimliğiyle /api/v2 üzerinden mi yapılacak, yanıt atfı hangi DocType adını ve hangi modified değerini taşıyacak, kiracı = site mi. Yeni görev açılmamalı.

Mevcut birincil görev: `rag-source--implementation`. Kaynak: `frappe/frappe/search/sqlite_search.py:117`; `frappe/frappe/api/v1.py:83`; `suite/pyproject.toml:31`; `suite/suite/hooks.py:38`.

#### rag-2 — Kaynak bağlama, belge ayrıştırma, parçalara ayırma ve güncelleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: yalnız değişen parça güncellenmeli ve sessiz veri kaybı olmamalı. Kaynakta kimliğe göre sil-ekle upsert (SearchStore), indeksleme uyarı tipleri (IndexWarning) ve PDF ayrıştırıcı bağımlılığı var. Öte yandan Frappe global search DocType bazında tümden silip yeniden kuruyor. SearchStore arama hatasını yalnız logluyor, yukarı fırlatmıyor. Bu iki davranış 'sessiz kayıp yok' ölçütüyle doğrudan çelişebilir.

Eksik: Hangi kaynakların bağlanacağı listelenmemiş (DocType alanları, File/Drive, Writer, Mail) ve tetikleyici belirsiz: doc_events mi, background job mı?; Parça kimliği şeması tanımlanmamış (doctype+name+alan+offset+modified); bu olmadan 'yalnız ilgili parçalar güncellensin' doğrulanamaz.; Ayrıştırma hatasının nereye yazılacağı (hata kaydı veya kuyruk) ve nasıl yeniden deneneceği tanımlanmamış.; Tümden yeniden kurma deseninin bu bağlamda kabul edilmeyeceği yazılmamış.

Sonraki adım önerisi: rag-chunk-reference--implementation içinde parça kimliği ve hata sözleşmesi tanımlanmalı: deterministik parça ID'si, kimliğe göre upsert ve ayrıştırma hatasında eski parçanın korunması. Hata görünür bir kayda yazılmalı.

Mevcut birincil görev: `rag-source--implementation`. Kaynak: `suite/suite/store/search_store.py:82`; `suite/suite/store/search_store.py:198`; `frappe/frappe/search/sqlite_search.py:53`; `frappe/frappe/utils/global_search.py:103`; `suite/pyproject.toml:14`.

#### rag-3 — Embedding (içeriği sayısal benzerlik vektörüne dönüştürme) sürümü ve yeniden üretim.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net: eski ve yeni indeks karışmamalı, geçiş bitmeden aktif sürüm değişmemeli. Kaynakta yalnız sözcüksel indeks için şema sürümü dosyası var; şema değişince yeniden kurulumu bu dosya tetikliyor. Mail göçü ise 'best-effort, lazy rebuild' çalışıyor, yani yerinde yeniden kurma yapıyor. Bu desen kabul ölçütündeki paralel sürüm ve atomik geçişi sağlamıyor. İncelenen kesitlerde embedding veya vektör kodu görülmedi.

Eksik: Sürüm meta verisi tanımlanmamış: model kimliği, boyut, parçalayıcı sürümü, normalizasyon.; Paralel indeks + alias/atomik geçiş + geri dönüş sözleşmesi yok.; Vektör deposu seçimi ve konumu (Frappe DB mi, dış servis mi) belirsiz.; Mevcut schema.version deseninin yerinde yeniden kurduğu ve bu nedenle doğrudan yeniden kullanılamayacağı not edilmemiş.

Sonraki adım önerisi: rag-source--implementation altına küçük bir sürüm kaydı tanımı eklenmeli: model, boyut, parçalayıcı sürümü, durum (building/active/retired). 'active' durumunu yalnız tamamlanmış bir yeniden indeksleme değiştirebilmeli.

Mevcut birincil görev: `rag-source--implementation`. Kaynak: `suite/suite/store/search_store.py:18`; `suite/suite/store/search_store.py:53`; `suite/suite/mail/patches/migrate_search_index_to_mail_namespace.py:15`.

#### rag-4 — Kiracı/kullanıcı yetkisini kaynak parçası düzeyinde koruma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Not doğru tespit ediyor: kiracı etiketi kayıt erişim kontrolünün (ACL) yerine geçmez. Frappe'de doc düzeyinde has_permission (paylaşım ve sahip dahil) ve alan düzeyi okuma izni uygulaması var. Writer araması da indekste filtre uygulamadan sonuçları API katmanında izinle süzüyor. Fakat parça düzeyinde ön filtre mi, son filtre mi uygulanacağı tanımlanmamış. Son filtrede top-k kaybı yaşanabilir. İzin iptalinin anında uygulanması (önbelleğe alınmış ACL olmaması) ve alan düzeyi izinlerin parçaya taşınması da tanımsız.

Eksik: Ön filtre / son filtre kararı ve son filtrede top-k doldurma kuralı yok.; Permlevel alanlarından üretilen parçaların nasıl korunacağı belirsiz (apply_fieldlevel_read_permissions eşdeğeri).; 'İzin iptali hemen' için sorgu anında Frappe has_permission çağrısı zorunluluğu yazılmamış.; ignore_user_permissions gibi bayrakların RAG yolunda kullanılamayacağı açıkça yasaklanmamış.

Sonraki adım önerisi: rag-chunk-reference--implementation sözleşmesine şunlar eklenmeli: her parça kaynak doctype, name ve fieldname taşımalı. Yanıttan önce son kullanıcı adına has_permission ve alan izni yeniden kontrol edilmeli. Yetkisiz parça atfa da girmemeli.

Mevcut birincil görev: `rag-source--implementation`. Kaynak: `frappe/frappe/permissions.py:94`; `frappe/frappe/api/v1.py:84`; `suite/suite/writer/search.py:23`; `frappe/frappe/desk/search.py:115`.

#### rag-5 — Kaynak atfı, güncellik, silinen içeriği indeksten çıkarma ve kalite ölçümü.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü iki noktayı kapsıyor: doğrulanabilir kaynak sürümü ve silinen parçanın aramadan kalkması. Kaynakta kimliğe göre indeksten silme ve DocType bazında silme, ayrıca BM25 ile özel skor sıralama izleme var. Ancak 'kaynak sürümü'nün ne olduğu (modified mı, Version kaydı mı) tanımlanmamış. Silme yayılımının tetikleyicisi ve süresi de yok. Kalite ölçümü için veri seti, metrik ve eşik yok. GDPR kapsamındaki kopyalar (yedek, önbellek) sınırlandırılmamış.

Eksik: Atıf için kaynak sürüm alanı ve doğrulama yolu tanımlanmamış.; Silme ve iptal (trash/cancel) olayından indeks silmeye giden tetikleyici ve azami gecikme yok.; Kalite ölçümünün metriği, değerlendirme seti ve kabul eşiği yok.; Yedeklerde ve türev kopyalarda silme kapsamı belirtilmemiş.

Sonraki adım önerisi: rag-source--implementation kabul metnine üç şey eklenmeli: atıf = doctype + name + modified, silme = doc silme olayında parça ID'leriyle delete, kalite = küçük sabit bir soru seti ve bir eşik. Test bütçesi aşılmamalı.

Mevcut birincil görev: `rag-source--implementation`. Kaynak: `suite/suite/store/search_store.py:163`; `frappe/frappe/utils/global_search.py:158`; `frappe/frappe/search/sqlite_search.py:115`.

#### agents-1 — Agents (yapay zekâ çalışanları): idari işler, satın alma ve diğer görevler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var, ancak orkestratör seçilmemiş (LangGraph yalnız örnek). Ajan kimliğinin Frappe User/rol ya da Keycloak istemcisine nasıl bağlanacağı da tanımsız. Yerel kaynakta ajan platformu yok. Elimizde yalnız Frappe izin denetimi, API v1/v2 ve 'AI agents' için düşünülmüş discovery temeli var. Suite içinde Sheets'e özel bir Anthropic bağımlılığı bulunuyor; bu bir ajan yeteneği değil.

Eksik: Satın alma eylemi ERPNext Purchase DocType'larına bağlı, ancak ERPNext bu sitede kurulu değil; native olduğu iddia edilemez ve hedef DocType tanımlı değil.; Ajanın kimlik modeli tanımsız: ayrı servis kullanıcısı mı, rol seti ne, Keycloak token'ı Frappe oturumuna nasıl eşleniyor?; Kullanılacak API sürümü (v1 /api/resource mı, v2 mi) ve Frappe 17.0.0.dev0 için sürüm eşlemesi belirtilmemiş.; Sheets AI Assist ile ajan katmanının ayrımı ve GenUI ile kayıt defterlerini birleştirmeme sınırı yazılmamış.

Sonraki adım önerisi: agent-run--implementation görevine şu kısa sözleşmeyi ekleyin: ajan = rolü kısıtlı ayrı Frappe User; çağrı yolu = /api/v2; ERPNext kurulana kadar satın alma kapsam dışı ya da 'bağımlılık bekliyor' olarak işaretli. Yeni bir görev kaydı açmayın.

Mevcut birincil görev: `agent-run--implementation`. Kaynak: `frappe/frappe/api/discovery.py:320`; `suite/pyproject.toml:31`; `frappe/frappe/permissions.py:82`; `suite/pyproject.toml:45`.

#### agents-2 — Ajan rolü, araç kataloğu ve izin verilen işlem kapsamı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

'Her çağrıda sunucu izni yeniden uygulanır' ilkesi doğru ve kaynakla uyumlu: v1/v2'de check_permission ve is_whitelisted var. Ancak araç kataloğunun kaynağı belirsiz. Frappe discovery yalnız System Manager'a açık ve allow_guest bilgisini veriyor; ajana System Manager verilmemeli. Tenant parametresiyle kapsam genişletmeyi engelleyen bir sözleşme de yok.

Eksik: Araç kataloğunun Frappe discovery'den mi türetileceği, yoksa elle onaylı bir allowlist mi olacağı tanımsız. Discovery'nin System Manager şartı ajan rolüyle çelişiyor.; Tenant sınırı tanımsız: site mi, User Permission mı? Tenant parametresinin sunucu tarafında yok sayılma kuralı da yazılmamış.; allow_guest uçların (ör. writer docs) ve ignore_permissions kullanan yardımcıların katalogdan dışlanma kuralı yok.; Suite'in File iznini Drive iznine devrettiği (ignore_file_permissions) hesaba katılmamış.

Sonraki adım önerisi: agent-capability--implementation altında: discovery çıktısını yalnız admin tarafında, onaylı allowlist üretmek için kullanın. Her araç için doctype/ptype eşlemesini PERMISSION_MAP ile, File işlemleri için Drive iznini belgeleyin. ui-* kayıt defterleriyle birleştirmeyin.

Mevcut birincil görev: `agent-capability--implementation`. Kaynak: `frappe/frappe/api/discovery.py:29`; `frappe/frappe/api/discovery.py:264`; `frappe/frappe/api/v2.py:24`; `frappe/frappe/api/v1.py:121`; `suite/suite/hooks.py:117`.

#### agents-3 — Hassas eylemde insan onayı ve çalışmayı durdurma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: onaysız kritik eylem çalışmayacak, durdurmadan sonra yeni çağrı yapılmayacak. Frappe'de submit hakkı ve submit ucu, onay kapısı için bir temel olabilir. Ancak hangi eylemin 'kritik' sayılacağı, onay kaydının nerede tutulacağı ve iptal edilen dış etkilerin ne olacağı tanımsız.

Eksik: Kritik eylem sınıflandırması tanımsız (submit, delete, harici çağrı, ödeme vb.).; Onay kaydının sahibi belirsiz: native submit/docstatus mu, orkestratör interrupt'ı mı? Excerpt'te Workflow kaynağı görülmediği için bilinmiyor.; Durdurma sinyalinin sunucuda nasıl zorlanacağı (ajan kullanıcısını devre dışı bırakma ya da token iptali) yazılmamış.; Onay bekleyen kararın UI'da görünür olması ile sunucu yetkisinin ayrımı belirtilmemiş.

Sonraki adım önerisi: human-decision--implementation için: kritik eylem = submit/cancel/delete ve dış etki; onay = ajan dışındaki insan kullanıcının Frappe yetkisiyle yaptığı submit; durdurma = ajan User'ını kapatma. Bunu tek paragrafta sabitleyin.

Mevcut birincil görev: `human-decision--implementation`. Kaynak: `frappe/frappe/permissions.py:20`; `frappe/frappe/client.py:276`; `frappe/frappe/api/v1.py:132`.

#### agents-4 — Görev hafızası, yürütüm geçmişi, yeniden deneme ve devretme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kurulu frappe uygulamasındaki automation_engine, deterministik Automation Flow'lar için kalıcı yürütüm altyapısı sağlıyor. Bu bir AI ajanı değil. (1) Yürütüm geçmişi: Automation Run DocType'ı status, user (Run As), queue_row, started_at/ended_at, error_summary, steps (Automation Run Step), actions_snapshot ve run_state alanlarını tutuyor; run_steps adım kayıtlarını geri okuyor. (2) Checkpoint/devam: Wait/WaitForEvent adımı resume_run ve resume_from_idx alanlı bir kuyruk satırı yazıyor. Böylece aynı Run, ilk snapshot ve adımlarıyla kaldığı yerden sürüyor. (3) Yeniden deneme: drainer, satırları savepoint ve commit gruplarıyla çalıştırıyor. attempt sayacı max_attempts değerine (varsayılan 3) ulaşınca durum Failed oluyor; grup commit'i başarısız olursa satırlar tek tek yeniden çalıştırılıyor. Arka plan işleri de deadlock veya zaman aşımında en fazla 5 kez yeniden deneniyor ve job_id+deduplicate destekliyor. (4) Yan etki güvenliği: Automation Trigger Queue'daki unique dedup_key indeksi çift tetiklemeyi engelliyor. effects_delivered işareti, veritabanı dışına etki etmiş (webhook, mail) bir satırı yeniden denemek yerine Failed yapıyor. (5) Yetkili kimlik: _execution_identity ve _ensure_trigger_access her çalıştırmada kimliği ve erişimi yeniden kuruyor. suite/headless_provider YEREL PİLOT ek koddur ve upstream'de yoktur; yalnız şema düzenleme için base_revision ve proposal_digest tabanlı iyimser eşzamanlılık sunar. Ajan çalıştırma, hafıza veya devir içermez. Suite'in Vue frontend'i bu maddeyle ilgili değildir.

Eksik: AI ajanına özgü agent-run ve agent-step kaydı yok: model/araç çağrısı, araç girdi/çıktı özeti ve istem/bağlam sürümü tutulmuyor.; Ajan görev hafızası yok: hafıza DocType'ı, kapsamı/TTL'si ve tenant izolasyonu tanımlı değil.; Araç çağrısı başına istemcinin verdiği idempotency anahtarı ve bu anahtarla sonucun yeniden döndürülmesi yok. dedup_key yalnızca automation+belge bazında bekleyen tetiklemeyi tekilleştiriyor.; Ajanlar arası devretme yok: hedef ajan, devralınan geçmiş ve iznin hedef ajanın rolüyle yeniden kontrol edilmesi sözleşmesi bulunmuyor.; Headless provider'da ajan run/step okuma-yazma ucu yok; GenUI sağlayıcı sözleşmesi bu maddeyi kapsamıyor.

Sonraki somut adım: Sıra şöyle: agent-run--contract → agent-run--schema → agent-run--implementation → agent-step--implementation. İlk ve en küçük adım: Automation Run, Automation Run Step ve Trigger Queue'nun dedup/attempt/resume desenini yeniden kullanan dar bir Agent Run + Agent Step şeması. Agent Step alanları: run, idx, tool, status, idempotency_key (unique), result_digest, effects_delivered. Önce tek bir davranış için başarısız (RED) test yazılmalı: aynı idempotency_key ile tekrarlanan adım ikinci kez yan etki üretmemeli ve kayıtlı sonucu döndürmeli. Sonra bu testi geçirecek (GREEN) kod yazılmalı. Ardından devir kuralı eklenmeli: devirde izin taşınmaz, hedef ajanın kimliğiyle _execution_identity benzeri bir kontrol yeniden yapılır. Tenant izolasyonu R-01 eşlemesine bağlanmalı. Headless provider ucu en son eklenmeli.

Önerilen bağımlılık/sıra: agent-run--contract; agent-run--schema; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `agent-run--implementation`.

Kaynak kanıtı:

- `frappe/frappe/automation_engine/runner.py:25` — `RUN = "Automation Run"`
- `frappe/frappe/automation_engine/runner.py:92` — `"""Pick a waiting run back up: same Automation Run, its original snapshot and steps."""`
- `frappe/frappe/automation_engine/drainer.py:167` — `exhausted = attempt >= cint(settings.get("max_attempts"))`
- `frappe/frappe/automation_engine/drainer.py:136` — `if effects_delivered(name):`
- `frappe/frappe/automation_engine/dispatch.py:109` — `The \`dedup_key\` unique index is the real guard; the lookup below only avoids the failed insert.`
- `suite/suite/headless_provider/api.py:140` — `if not isinstance(proposal_digest, str) or not _DIGEST.fullmatch(proposal_digest):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite; arama `(?i)(agent_run|agent run|agent_step|checkpoint|idempoten|handoff|hand_off|retry|attempt)`: Sonuçlar ağırlıkla derlenmiş frontend asset'leri, mail/drive/meet modüllerindeki yeniden denemeler ve composeHandoff (e-posta taslağı devri). Ajan run/step veya ajan devri bulunmadı.
- suite/suite (_.py,_.json); arama `(?i)(agent|checkpoint|idempoten|handoff|retry|memory|run_id)`: Mail kuyruğu, WebDAV ve kayıt alma gibi alan-özel yeniden deneme ve idempotency kodları var; ajan hafızası veya yürütümü yok.
- suite/suite/headless_provider/api.py; arama `(?i)(agent|checkpoint|idempoten|handoff|retry|memory|run_id|def )`: Yalnız session, metadata, create_field, preview_edit ve apply_edit uçları var (revision/digest kontrolü). Ajan run, hafıza veya devir yok.
- frappe/frappe (_.py,_.json); arama `(?i)(idempoten|checkpoint|run_id|agent_run|handoff|tool_call|ai_agent|agent memory)`: automation_engine/api.py içinde manual_run_id, background_jobs.create_job_id idempotent yardımcısı ve ilgisiz sidebar/print eşleşmeleri bulundu. Ajan kavramı yok.
- frappe/frappe/automation_engine; arama `(?i)(idempoten|checkpoint|run_id|retry|attempt|agent|handoff)`: drainer.py içinde attempt/max_attempts ve effects_delivered, runner.py içinde Retry sonucu bulundu.
- frappe/frappe/automation_engine/runner.py; arama `(?i)(^RUN\s*=|resume_from|resume|dedup_key|run_steps|execute_automation|branches)`: Automation Run ile resume_run/resume_from_idx tabanlı devam etme ve adım kaydı doğrulandı.
- frappe/frappe; arama `dedup_key`: automation_trigger_queue.py dosyası unique_dedup_key indeksini ekliyor; dispatch.queue_trigger bu indekse dayanıyor.
- frappe/frappe ve suite/suite (_.py,_.json); arama `(?i)(llm|langgraph|agent_memory|ai agent|tool_call|agent_run|handoff)`: LLM/ajan orkestrasyonu yok. sheets/ai/heuristics.py kendini 'no LLM' olarak tanımlıyor; diğer eşleşmeler alt dize (fullmatch) eşleşmeleri.

Sınır: Yalnız kaynak kod okundu; test çalıştırılmadı, functionalAcceptance=not_run.; automation_engine ve automation DocType'ları kurulu frappe uygulamasında (commit adf1fd0) bulundu; upstream sürümle karşılaştırılmadı, bu yüzden yerel fork kökeni doğrulanmadı.; Testler yalnız arama sonucu olarak görüldü; davranış kanıtı olarak sayılmadı.; Tenant izolasyonu, çalışma zamanı kalıcılığı ve devreye alınmış operasyonlar kaynaktan kanıtlanamaz.; ERPNext/HRMS ve harici orkestratörler (LangGraph vb.) kurulu kaynakta yok; değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-011`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### agents-5 — Adım, süre, kaynak ve harcama üst sınırları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni net: limit dolunca yeni çağrı yapılmasın, kısmi sonuç ve sebep kaydedilsin. Ancak limit değerleri, sayaçların sahibi ve harcama birimi tanımsız. Yerelde yalnız uç başına rate_limit ve insert_many'deki 200 sınırı gibi temeller var; ajan bütçesi yok.

Eksik: Adım, süre, token ve para limitlerinin varsayılan değerleri ve kimin değiştirebileceği tanımsız.; Sayacın atomik olarak sunucuda tutulacağı yer belirsiz (orkestratör mü, Frappe mi).; Frappe rate_limit'in ajan kimliği başına kullanılıp kullanılmayacağı belirtilmemiş.

Sonraki adım önerisi: agent-step--implementation içinde: her araç/model çağrısından önce kontrol edilen sunucu tarafı sayaç ve limit aşımında 'stopped_reason' alanı. Frappe rate_limit'i ek bir savunma katmanı olarak not edin.

Mevcut birincil görev: `agent-run--implementation`. Kaynak: `suite/suite/drive/api/product.py:127`; `frappe/frappe/client.py:245`.

#### agents-6 — Talimat, veri ve araç çıktılarının güven sınırları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

'Prompt'a yetki verilmez, sunucu politikası üstündür' ilkesi doğru. Frappe'de alan düzeyi okuma izni, SSRF engeli ve sunucu betiklerinin varsayılan kapalı olması gibi temeller var. Ancak gizli veri sınıfları, araç çıktısının yapılandırılmış şemayla ayrılması ve ignore_permissions kullanan yardımcıların dışlanması yazılmamış.

Eksik: Ajanın göreceği alanların native permlevel ve apply_fieldlevel_read_permissions ile sınırlanacağı açıkça yazılmamış.; Suite içinde ignore_permissions ve allow_guest kullanan yardımcıların ajan aracı olarak sunulmasını yasaklayan bir kural yok.; Server Script/safe_exec ve keyfi SQL'in ajan kısayolu olarak kullanılamayacağı belirtilmemiş.; Discovery'nin kaynak kodu açma kancası (expose_discovery_source) ile veri sızıntısı ilişkisi değerlendirilmemiş.

Sonraki adım önerisi: agent-run--implementation güvenlik notuna kısa bir yasak listesi ekleyin: ignore_permissions yardımcıları, allow_guest uçları, safe_exec ve ham SQL. Ajan okumalarını yalnız apply_fieldlevel_read_permissions uygulanan uçlarla sınırlayın.

Mevcut birincil görev: `agent-run--implementation`. Kaynak: `frappe/frappe/api/v1.py:84`; `suite/suite/drive/api/product.py:138`; `frappe/frappe/utils/safe_exec.py:88`; `frappe/frappe/utils/safe_exec.py:388`; `frappe/frappe/api/discovery.py:326`.

#### integration-1 — API entegrasyon katmanı ve adaptör yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (aynı komut iki adaptörde, tenant sırları ayrık) somut. Kaynakta /api/method RPC, /resource CRUD, v2 REST ve Social Login Key üzerinden şifreli sağlayıcı anahtarı primitifleri var. Ortak adaptör sözleşmesi, kimlik bilgisi modeli ve sağlık modeli kaynakta yok. Talimat, v2 iç fonksiyonlarının Python'dan çağrılmaması kuralını ve v17-dev eşlemesini belirtmiyor.

Eksik: Adaptör arayüzü (komut, hata, yeniden deneme, idempotency) tanımsız; Tenant sırrının nerede tutulacağı belirsiz (site-başı tenant mı, satır-başı mı; Password alanı ve get_decrypted_password kullanımı); Keycloak servis hesabı eşlemesi yok; v2 modülü kararlı değil, kaynakta 'internal implementation can change' yazıyor; adaptörün yalnızca HTTP sözleşmesine bağlanacağı yazılmamış; Suite, Framework'ün File izin mantığını Drive'ınkiyle değiştiriyor; dosya taşıyan adaptörlerin bu izin sınırı belirtilmemiş

Sonraki adım önerisi: connection--implementation görevine şunları ekle: tek sayfalık adaptör sözleşmesi (girdi/çıktı/hata/idempotency anahtarı), tenant sırrı için Frappe Password alanı kararı ve v17-dev'de /api/v2 HTTP uçlarına bağlanma kuralı. Yeni görev kaydı açma.

Mevcut birincil görev: `connection--implementation`. Kaynak: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/utils/oauth.py:147`; `suite/suite/hooks.py:117`.

#### integration-2 — Activepieces ile entegrasyon otomasyonları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Activepieces harici ürün olarak doğru sınıflanmış. Kabul ölçütü (tenant kapsamı, çift işlem yok) anlamlı. Frappe tarafında REST create/update ve izin kontrolü primitifleri var. Ancak create_doc'ta idempotency anahtarı yok, yani tekrar tetikleme çift kayıt üretir. Activepieces kaynağı bu kurulumda yok; köprü uygulaması da yok.

Eksik: Kimlik doğrulama yolu seçilmemiş (API key/secret, OAuth istemcisi ya da Keycloak servis hesabı) ve en az yetkili rol tanımı yok; Tekrar tetiklemeye karşı idempotency anahtarı ve tekilleştirme deposu tanımsız; Activepieces sürümü/lisans türü (community/ee) ve barındırma sahibi belirtilmemiş; lisans kullanıcıyla netleştirilmeli; Webhook kaynağı bu pakette görülmedi; tetik yönü (Frappe→Activepieces) doğrulanamadı

Sonraki adım önerisi: activepieces-bridge--implementation görevine şunları ekle: yalnızca HTTP üzerinden erişim, kısıtlı rol, idempotency başlığı ve tekilleştirme kuralı. Lisans/sürüm kararını kullanıcıya sor; köprüyü integration-1 adaptör sözleşmesine bağımlı işaretle.

Mevcut birincil görev: `activepieces-bridge--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:154`.

#### integration-3 — Middleware (istek işleme ara katmanı) ve handler (istek/olay işleyicisi) kayıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta before_request/after_request hookları ve whitelist + HTTP metodu doğrulaması var; kayıtsız metot reddi bunlarla zaten sağlanıyor. Meet SFU'daki registerHandlers dizisi Meet'e özgü bir Socket.IO kaydı; ürün handler kaydı sayılmaz. Talimatta sürümlü kayıt, sıralama semantiği ve GenUI/sunucu kayıtlarıyla ayrım yok.

Eksik: Birden çok uygulamanın hookları birleştiğinde sıra ve hata davranışı tanımlanmamış; suite after_request tek tanımlayıcı; Sürümlü handler kaydının veri modeli ve whitelist ile ilişkisi belirsiz; Sunucu query-action kaydının GenUI kaydıyla birleştirilmeyeceği açıkça yazılmamış; Meet SFU handler deseninin genel middleware olarak yeniden kullanılmayacağı belirtilmemiş

Sonraki adım önerisi: api-middleware--implementation görevinde şunları yaz: native before/after_request ve frappe.whitelist zinciri esas alınacak, sıra kuralı tek bir before_request listesinde deterministik olacak, reddin kanıtı is_whitelisted olacak. Ayrı bir registry DocType'ı yalnızca sürüm ihtiyacı gerekçelendirilirse eklenmeli.

Mevcut birincil görev: `api-middleware--implementation`. Kaynak: `suite/suite/hooks.py:343`; `suite/suite/hooks.py:340`; `frappe/frappe/api/v1.py:121`; `suite/suite/meet/sfu-server/src/server/SocketHandlerManager.ts:115`.

#### integration-4 — HTTP (Hypertext Transfer Protocol — hiper metin aktarım protokolü) durum/yönlendirme yönetimi: 200, 301, 303, 404, 410, 503.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta http_status_code ataması ve website redirect kuralları (suite'te 307) var. 410 ve bakım 503 yolu bu excerpt'te görülmedi. Vite/PWA + TanStack Router SPA'da istemci rotası gerçek HTTP 404/410/301 üretemez. Kodu kimin üreteceği (Frappe route kuralı, edge/proxy, prerender) talimatta yok.

Eksik: SPA rotaları için durum kodunu üretecek katman seçilmemiş; API hatası (JSON gövde + kod) ile sayfa durumu (SEO) ayrımı tanımsız; 503 bakım modunun kaynağı ve Retry-After başlığı belirtilmemiş; 301/303 kullanım kuralı (POST sonrası 303) ile mevcut 307 yönlendirmelerin ilişkisi açık değil

Sonraki adım önerisi: api-response--implementation görevine katman kararını ekle (Frappe website_redirects/route rules mu, ters vekil mi). Durum kodu → rota örneği tablosu da eklenmeli. Bakım 503'ünün ve Retry-After'ın kaynağı Hüseyin Cengiz ile netleştirilmeli.

Mevcut birincil görev: `api-response--implementation`. Kaynak: `frappe/frappe/api/v1.py:73`; `suite/suite/hooks.py:72`.

#### integration-5 — Webhook (olay gerçekleşince dış sisteme bildirim) alma/gönderme; imza ve tekrar saldırısı denetimi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de giden webhook gönderimi var (frappe/frappe/integrations/doctype/webhook/webhook.py). DocType olayı tetiklenince istek kuyruğa alınır. enable_security açıksa gövde HMAC-SHA256 ile imzalanır ve base64 değer X-Frappe-Webhook-Signature başlığına yazılır. İmza, gönderilen frappe.as_json(data) gövdesinin aynısı üzerinden hesaplanır. Teslim denemeleri Webhook Request Log'a yazılır (Delivered/Failed/Exhausted, attempt, next_retry). Yeniden deneme RETRY_SCHEDULE ile zamanlanır ve job_id ile tekilleştirilir; logdaki başlık ve gövde aynen yeniden gönderilir. automation_engine CallWebhook eylemi de dışarıya HTTP çağrısı yapar ama imza üretmez. Suite'te gelen istek için yalnız alana özgü bir örnek var: Meet kayıt cihazı geri çağrısı (suite/suite/meet/recording/callback_auth.py). Bu akış body_sha256'yı compare_digest ile karşılaştırır ve iat/exp için yaklaşık 30 saniyelik pencere ile 5 saniyelik saat kayması toleransı uygular. Tekrar kullanılan jti'yi Redis'te SET NX ve 40 saniyelik TTL ile reddeder. suite/headless_provider yerel pilot kodunda webhook/imza/tekrar sözleşmesi yok; oradaki hmac yalnız öneri özetini karşılaştırır.

Eksik: Giden imza yalnız gövdeyi kapsıyor; zaman damgası, olay kimliği ve nonce imzaya ya da başlıklara girmiyor. Bu yüzden alıcı, yeniden gönderilen imzalı bir isteği tekrar olarak ayırt edemez.; Frappe'de gelen webhook'lar için genel bir doğrulama ucu yok: imza doğrulayan guest endpoint, zaman penceresi ve tekrar deposu bulunmuyor.; Suite'teki jti ve gövde özeti deseni Meet'e özgü ve Redis TTL'li; tahliyeye açık, kalıcı benzersiz anahtar değil, genel webhook alımında yeniden kullanılmıyor.; Tenant başına imza sırrı ve rotasyon/çift sır dönemi yok; webhook_secret, her Webhook kaydında tek bir Password alanı.; İmza algoritması veya sürüm başlığı yok.; headless_provider'da gelen ve giden webhook sağlayıcı sözleşmesi yok (GenUI/React tüketicisi için yönetim/teslim durumu yüzeyi yok).

Sonraki somut adım: Mevcut delivery-attempt--contract ve delivery-attempt--schema bağımlılıklarından sonra, delivery-attempt--implementation içinde en küçük adım şu sırayla yapılmalı: (1) Gelen istek doğrulayıcısı yazılsın. callback_auth.py'deki compare_digest, zaman penceresi ve jti desenini genelleştirsin; X-Frappe-Webhook-Signature ile uyumlu HMAC-SHA256 doğrulaması yapsın ve zaman damgası ile olay kimliği başlıklarını zorunlu tutsun. Tekrar kontrolü, Redis TTL yerine olay kimliğine benzersiz indeks veren kalıcı bir tabloyla yapılsın. (2) Bunun için önce RED testleri: geçerli imza kabul, değiştirilmiş gövde red, aynı olay kimliğinin tekrarı red, pencere dışı zaman damgası red. (3) Ardından giden tarafta upstream Webhook'u fork etmeden, ek bir başlık katmanıyla imzaya zaman damgası ve olay kimliği eklenebilir mi değerlendirilsin. Tenant başına sır ve rotasyon tenant-registry--contract'a bağlansın. headless_provider'a yalnız sözleşme/durum okuma ucu eklensin.

Önerilen bağımlılık/sıra: delivery-attempt--contract; delivery-attempt--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; api-middleware--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `delivery-attempt--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/doctype/webhook/webhook.py:20` — `WEBHOOK_SECRET_HEADER = "X-Frappe-Webhook-Signature"`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:348` — `frappe.as_json(data).encode("utf8"),`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:22` — `RETRY_SCHEDULE = [5 * 60, 30 * 60, 2 * 3600, 5 * 3600, 10 * 3600, 10 * 3600]`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:264` — `headers = json.loads(log.headers) if log.headers else {}`
- `suite/suite/meet/recording/callback_auth.py:383` — `if not hmac.compare_digest(claims["body_sha256"], body_sha256):`
- `suite/suite/meet/recording/callback_auth.py:399` — `if not frappe.cache.set(replay_key, "1", ex=40, nx=True):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe; arama `X-Frappe-Webhook-Signature|hmac\.new|webhook_secret`: webhook.py: imza başlığı, HMAC-SHA256 ve gizli alan doğrulaması bulundu; ek olarak verified_command.py'de URL imzası var (webhook değil).
- suite; arama `(?i)webhook|hmac|signature|replay|nonce|idempoten`: Çoğu sonuç derlenmiş frontend asset, mail imzası ve JMAP push. İlgili sonuçlar: meet/recording/callback_auth.py ve headless_provider/api.py.
- suite/suite/headless_provider; arama `(?i)webhook|hmac|signature|replay|nonce|timestamp`: Yalnız öneri özeti için compare_digest ve TimestampMismatchError var; webhook sözleşmesi yok.
- suite/suite (*.py); arama `(?i)(compare_digest|X-Hub-Signature|Stripe-Signature|verify_signature|validate_signature|webhook)`: Alana özgü doğrulamalar var (meet callback, calendar rsvp, webdav, sheets collab); genel gelen webhook alıcısı yok.
- suite/suite/meet/recording/callback_auth.py; arama `(?i)jti|replay|nonce|exp\b|iat|max_age|window|seen|cache\.|insert|unique`: iat/exp penceresi ve jti için Redis SET NX ex=40 tekrar reddi var; kalıcı tablo yok.
- frappe/frappe (*.py); arama `(?i)verify.*signature|signature.*verif|compare_digest|replay`: OAuth, API anahtarı ve realtime secret karşılaştırmaları bulundu; gelen webhook imza doğrulaması yok.
- frappe/frappe/{integrations,automation_engine}/**/*.py; arama `allow_guest=True|X-Frappe-Webhook|enable_security|get_webhook_headers`: Guest uçların hepsi OAuth/LDAP/connected_app; webhook alıcısı yok.
- frappe/frappe/automation_engine/actions; arama `(?i)webhook|signature|hmac`: CallWebhook eylemi var; imza veya HMAC yok.

Sınır: Yalnız sourceRoot altındaki frappe ve suite kaynakları Read/Grep/Glob ile okundu; hiçbir şey çalıştırılmadı, test çalıştırılmadı. functionalAcceptance: not_run.; suiteCommit bilinmiyor. headless_provider yerel pilot ek kod; upstream-native değil.; Kaynak, kodun var olduğunu kanıtlar; dağıtılmış davranışı, Redis kalıcılığını veya alıcı tarafın uyumluluğunu kanıtlamaz.; Derlenmiş public/frontend asset ve .map dosyaları ile locale .po dosyaları davranış kanıtı sayılmadı. Suite Vue frontend bu maddeyle ilgili değerlendirilmedi.; ERPNext/HRMS kurulu değil, değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-030`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integration-6 — API sürümü, standart hata yanıtı, sözleşme dokümanı ve kullanımdan kaldırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta /api/v1 ve /api/v2 yan yana duruyor, geriye uyumluluk dalları da var. Ancak v2 iç uygulamasının değişebileceği açıkça yazıyor. Suite, Frappe >=16,<18 aralığını beyan ediyor; yerelde 17.0.0.dev0 çalışıyor. Talimatta ürün API sürümü ile Frappe sürümünün eşlemesi, standart hata şeması ve kaldırma takvimi yok.

Eksik: Ürün API sürümü (ör. /api/v2 üstü ürün sözleşmesi) ile Frappe /api/v1-v2 eşlemesi tanımsız; Frappe hata yükünü ürün hata şemasına normalize etme kuralı yok; Kaldırma politikası (destek süresi, Deprecation/Sunset başlıkları) yok; v16 ile v17-dev arasındaki API farklarının doğrulanması planlanmamış

Sonraki adım önerisi: api-response--implementation görevine şunları ekle: v17-dev /api/v2'yi hedef sabitleyen sürüm tablosu, tek JSON hata şeması örneği ve Deprecation/Sunset kuralı. Bunu ui-family-36 MVP istemcisi tüketmeli.

Mevcut birincil görev: `api-response--implementation`. Kaynak: `frappe/frappe/api/v2.py:7`; `frappe/frappe/api/v1.py:41`; `suite/pyproject.toml:45`.

#### integration-7 — Veri eşleme, çift yönlü eşitleme, bağlantı sağlığı ve yeniden yetkilendirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Event Streaming'in çekirdek çözüm olmadığı doğru belirtilmiş. Kaynakta satır kilitli get_doc, şifreli sağlayıcı sırrı ve tenacity bağımlılığı var. Alan/kimlik eşleme, çakışma kuralı, bağlantı sağlığı durumları ve yeniden yetkilendirmede akışı durdurma kaynakta yok; talimatta da somut değil.

Eksik: Çakışma kuralı seçilmemiş (son yazan kazanır, alan bazlı ya da manuel inceleme) ve 'modified' tabanlı sürüm kontrolü belirtilmemiş; Sürümlü eşleme şeması ve dış kimlik ↔ Frappe name eşleme tablosu tanımsız; Sağlık durum makinesi (sağlıklı, bozulmuş, yetki süresi doldu, durduruldu) ve yeniden deneme/backoff sınırları yok; 'Sekiz modeli birleştirir' ifadesindeki modeller adlandırılmamış

Sonraki adım önerisi: connection--implementation-mvp görevine tek bir çakışma kuralı, eşleme kaydı alanları ve sağlık durum makinesi ekle. Token yenileme başarısızsa akış 'durduruldu' durumuna geçmeli. Önce integration-1 adaptör sözleşmesine bağla.

Mevcut birincil görev: `connection--implementation-mvp`. Kaynak: `frappe/frappe/api/v1.py:56`; `frappe/frappe/utils/oauth.py:139`; `frappe/pyproject.toml:79`.

#### integration-8 — 401/403 yetki, 409 çakışma, 422 doğrulama, 429 hız sınırı ve 500 hata yanıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni (altı kod, stack trace/secret sızmaması) açık. Kaynakta HTTP durum kodu atama ve izin hatası üretme primitifleri var. Ancak Frappe istisnalarını 401/403/409/422/429/500 kodlarına eşleyen ürün gövde şeması tanımlı değil. Frappe HTTP rate limiter ve app.py hata işleyicisi verilen kesitlerde görünmüyor.

Eksik: Ürün hata gövdesi şeması (code, message, field errors, correlation id) tanımlı değil.; Frappe istisna → HTTP eşlemesi yazılmamış: PermissionError, ValidationError, TimestampMismatch/Duplicate (409), RateLimitExceeded (429).; 401 (Keycloak token geçersiz) ile 403 (Frappe rol/kayıt izni yok) ayrımı belirtilmemiş.; Hata zarfının v1 mi v2 mi, yoksa ürün namespace'i üzerinde mi kurulacağı seçilmemiş.; Suite after_request hook'unun hata yanıtlarını etkileyip etkilemediği belirsiz.; SFU socket hata deseni ham error.message döndürüyor; HTTP sözleşmesine model alınmamalı.

Sonraki adım önerisi: api-response--implementation altına Frappe istisna sınıfı → HTTP kodu → güvenli gövde tablosunu yaz (Frappe 17.0.0.dev0 adlarıyla). Altı senaryoyu tek sözleşme testi taslağı olarak tanımla; çalıştırma not_run kalsın.

Mevcut birincil görev: `api-response--implementation`. Kaynak: `frappe/frappe/api/v1.py:73`; `frappe/frappe/client.py:177`; `suite/suite/hooks.py:340`; `suite/suite/meet/sfu-server/src/server/handlers/WebRtcTransportHandlers.ts:56`.

#### integration-9 — REST API sunma ve dış REST servislerini tüketme; sürümlü ürün sözleşmesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe v1 resource/method rotaları ve v2 REST katmanı izin kontrollü CRUD/RPC ve sayfalama sağlıyor. v2'nin iç implementasyonu breaking change sayılmadan değişebiliyor. Ürün sürüm sözleşmesi, OpenAPI üretimi, idempotency ve dış REST tüketim adaptörü talimatı eksik. Keycloak eşlemesi de yalnız niyet düzeyinde.

Eksik: Ürün API'sinin v1/v2 üzerine ince sarmalayıcı mı, ayrı /api/method namespace'i mi olacağı seçilmemiş. v2'nin Frappe 17 dev'de stabil sözleşme olmadığı not edilmemiş.; OpenAPI kaynağı belirsiz: frappe.api.discovery importu var ama içeriği görülmedi, kullanılabilirliği doğrulanmalı.; Idempotency-Key saklama ve tekrar yazım semantiği tanımsız.; Dış REST tüketimi için şu sözleşmeler yok: requests timeout/retry, secret saklama (Password alanı), egress/SSRF politikası.; Keycloak token → Frappe User/tenant eşlemesi tanımsız. Social Login Key login akışıdır, bearer doğrulaması değildir.

Sonraki adım önerisi: rest-api--implementation için kısa ADR yaz: taban (v1 veya v2), sürüm öneki, sayfalama alanları (limit_start/limit_page_length) ve idempotency kuralı. frappe.api.discovery çıktısını yalnız okuyarak OpenAPI temeli olup olmadığını doğrula.

Mevcut birincil görev: `rest-api--implementation`. Kaynak: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/api/v2.py:19`; `frappe/frappe/api/v1.py:83`; `frappe/pyproject.toml:68`; `frappe/frappe/utils/oauth.py:107`.

#### integration-10 — GraphQL entegrasyonu; şema, query/mutation ve yetkili resolver katmanı.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynağında GraphQL uygulaması bulunamadı: şema/tip üretimi, query/mutation ayrıştırıcı veya yürütücü, resolver katmanı, /graphql rotası ya da GraphQL bağımlılığı yok. GraphQL eşleşmeleri yalnız şu yerlerde: frappe/.github CI iş akışlarında GitHub API çağrısı ('gh api graphql'), suite ship-pr SKILL.md içinde GitHub PR GraphQL'i ve derlenmiş/vendored JS bundle'ları (desk.bundle, suite/public/frontend/assets). Bunların hiçbiri ürün davranışı sayılmaz. Gelecekteki resolver'ların yeniden kullanabileceği upstream-native REST primitifleri var: /api/v1 ve /api/v2 Werkzeug URL haritası, v2 document_list içinde ignore_permissions=False ile frappe.qb.get_query, read_doc/update_doc içinde check_permission ve apply_fieldlevel_read_permissions, has_next_page sayfalaması ve controller get_list kancası. Yerel pilot olarak eklenen suite/headless_provider/api.py (headless-metadata.v1) yalnız whitelisted RPC'dir. Bu dosya meta.get_permitted_fieldnames ile alan seviyesinde izinli şema projeksiyonu yapar ama GraphQL değildir. Suite'in Vue frontend'i bu sözleşmelerden ayrıdır.

Eksik: GraphQL kütüphanesi seçilmemiş, bağımlılık yok, Python sürüm uyumu da doğrulanmamış (pyproject/package.json içinde graphql/graphene/strawberry/ariadne eşleşmesi yok).; DocType meta'sından GraphQL şema/tip üretimi yok; permlevel'e göre kullanıcıya özel şema görünürlüğü de yok.; Query/mutation resolver katmanı yok. Resolver'ların yalnız izinli native yollara (get_query ignore_permissions=False, get_doc+check_permission, apply_fieldlevel_read_permissions, doc.insert/save) bağlanacağına dair kural da yok.; Derinlik/maliyet sınırı, karmaşıklık analizi ve N+1 bütçesi/dataloader yok. v2 document_list'teki limit istemciden alınıyor ve kodda üst sınır görülmedi.; Kiracı (site) izolasyonuna dair GraphQL testi/kanıtı, integration-8 hata zarfı ve integration-9 sürüm sözleşmesi eşlemesi yok.; Subscription taşıması tanımsız; kapsam dışı.

Sonraki somut adım: Mevcut graphql-api--contract bağımlılığı içinde ilerle. 1) Sözleşmede kütüphane seçimini ve Python/Frappe sürüm uyumunu, ayrıca 'resolver yalnız native izinli yollar' kuralını yaz; frappe.db.sql ve ignore_permissions yasaklansın. Hata zarfı kernel-envelope/api-middleware sözleşmelerine eşlensin. 2) graphql-api--implementation'ın ilk dar dilimi tek bir salt-okunur query olsun: bir DocType için liste ve tekil kayıt; v2 document_list/read_doc'taki get_query(ignore_permissions=False) + check_permission + apply_fieldlevel_read_permissions yolunu yeniden kullansın; şemaya get_permitted_fieldnames ile yalnız okunabilir alanları koysun; limit üst sınırı ile derinlik/maliyet sınırını içersin. Önce RED testler yazılsın: başka site/kiracıya erişim, yasak permlevel alanı, aşırı derinlik ve sorgu sayısı bütçesi; sonra GREEN. 3) Mutation'lar ancak bundan sonra eklenecek ve doc.insert/save üzerinden gidecek. Subscription bu dilimin dışında kalır. GenUI/React tüketicisi yalnız bu provider sözleşmesini kullanır.

Önerilen bağımlılık/sıra: graphql-api--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; api-middleware--contract; integration-8 (hata şeması); integration-9 (sürüm sözleşmesi); ui-family-36--implementation-post-mvp (destekleyici). Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `graphql-api--implementation`.

Kaynak kanıtı:

- `frappe/frappe/api/__init__.py:97` — `Submount(f"/api/{ApiVersion.V2.value}", v2_rules),`
- `frappe/frappe/api/v2.py:164` — `ignore_permissions=False,`
- `frappe/frappe/api/v2.py:87` — `doc.apply_fieldlevel_read_permissions()`
- `frappe/frappe/api/v2.py:142` — `limit: int = cint(args.get("limit", 20))`
- `suite/suite/headless_provider/api.py:274` — `allowed = set(meta.get_permitted_fieldnames(user=user, permission_type="read"))`
- `frappe/.github/workflows/post-review.yml:72` — `gh api graphql --paginate`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/; arama `(?i)graphql|graphene|strawberry|ariadne`: 8 dosya eşleşti: .github/helper/roulette.py, 5 CI iş akışı ve derlenmiş desk.bundle JS/map. post-review.yml'deki eşleşme GitHub API çağrısı. roulette.py içerik aramasında graphql eşleşmesi çıkmadı. Uygulama kodu yok.
- suite/; arama `(?i)graphql|graphene|strawberry|ariadne`: Yalnız suite/public/frontend/assets altındaki derlenmiş/vendored JS bundle'ları ve .agents/skills/ship-pr/SKILL.md (GitHub PR GraphQL). Python veya Vue kaynak kodunda uygulama yok.
- frappe/ ve suite/ (**/pyproject.toml, **/package.json, *_/requirements_.txt); arama `(?i)graphql|gql|schema introspection|query_depth|max_depth|dataloader`: Eşleşme yok; GraphQL bağımlılığı bildirilmemiş.
- frappe/frappe/{api/*.py,client.py,model/db_query.py,database/query.py,handler.py}; arama `(?i)query_cost|max_query_depth|complexity|n\+1|max_page_length|limit_page_length.*>|MAX_.*LIMIT`: Yalnız database/query.py MAX_LIMIT (2^64-1, sınırsız anlamında). Maliyet/derinlik sınırı yok.
- frappe/frappe/api/v2.py; arama `def (document_list|read_doc|...)|apply_fieldlevel_read_permissions|check_permission|Rule\(`: REST v2 rotaları ve izinli okuma/yazma primitifleri okundu. GraphQL rotası yok.
- frappe/frappe/api/discovery.py; arama `^def |openapi|schema`: Yalnız whitelisted metot/DocType metot keşfi ve arama. GraphQL/OpenAPI şeması üretilmiyor.
- suite/suite/hooks.py; arama `(?i)graphql|website_route_rules|api_route|override_whitelisted_methods`: website_route_rules ve override_whitelisted_methods var. GraphQL rotası/hook'u yok.
- suite/suite/headless_provider/; arama `glob **/*.py + api.py tamamı okundu`: Yerel pilot headless-metadata.v1 RPC'si (session/metadata/create_field/preview_edit/apply_edit). İzinli şema projeksiyonu yapıyor, GraphQL değil.

Sınır: Kapsam yalnız sourceRoot altındaki kurulu frappe ve suite uygulama kaynağıyla sınırlı. Bu bir ekosistem geneli yokluk iddiası değildir; ERPNext/HRMS kurulu değil ve değerlendirilmedi.; Derlenmiş/vendored JS bundle'larındaki eşleşmeler satır satır incelenmedi. Kaynak Vue/TS kodunda karşılık bulunmadığı için ürün davranışı sayılmadı.; Kod çalıştırılmadı, test yazılmadı veya çalıştırılmadı. functionalAcceptance: not_run. Kiracı izolasyonu ve N+1 davranışı runtime'da ölçülmedi.; suiteCommit bilinmiyor. headless_provider yerel pilot ek kod; upstream-native değil.; v2 document_list limitinin üst sınırsız olduğu yalnız bu dosyadaki kod yolundan çıkarıldı; frappe.qb.get_query içindeki olası kısıtlar ayrıntılı okunmadı.

Temporal workflow: `saas-recheck-20261015t073528z-031`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integration-11 — SOAP entegrasyonu; WSDL/XSD sözleşmeli servis sunma ve tüketme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynağında SOAP için hiçbir uygulama yok. SOAP zarfı (envelope), WSDL/XSD üretimi, tüketimi ya da doğrulaması, SOAP fault işleme, SOAPAction veya application/soap+xml yönlendirmesi ve zeep/spyne/xmlschema bağımlılığı bulunamadı. Bu maddeyle yalnız dolaylı ilişkisi olan, SOAP'a özgü olmayan yapı taşları şunlar:
(1) Upstream frappe: make_form_dict istek gövdesini yalnız JSON ya da form/query olarak ayrıştırıyor, XML gövde ayrıştırma yolu yok (frappe/frappe/app.py:341).
(2) Upstream frappe: Webhook DocType'ının request_structure alanı yalnız "Form URL-Encoded" ve "JSON" seçeneklerini sunuyor, XML/SOAP seçeneği yok (frappe/frappe/integrations/doctype/webhook/webhook.json:127).
(3) Suite: Drive/WebDAV modülü lxml ile sertleştirilmiş bir XML ayrıştırıcı içeriyor. Varlık çözümleme, ağ erişimi ve DTD kapalı; DOCTYPE reddediliyor; gövde 1 MB ile sınırlı. Ancak bu ayrıştırıcı DAV ad alanına ve WebDAV hata sınıflarına bağlı, SOAP sözleşmesi değil. Suite kendi pyproject'inde lxml'i Drive için açıkça bağımlılık olarak tanımlıyor.
(4) Yerel pilot suite/headless_provider (api.py, local_fixture.py) içinde XML veya SOAP ile ilgili hiçbir şey yok. Suite'in Vue arayüzündeki derlenmiş bundle'larda geçen eşleşmeler sözdizimi renklendirme ve kütüphane metinleri; davranış kanıtı değil.

Eksik: SOAP 1.1/1.2 sunucu uç noktası (zarf ayrıştırma, SOAPAction veya action parametresine göre yönlendirme, SOAP fault yanıtı); WSDL yayımlama ve WSDL/XSD sözleşmesine göre istek/yanıt doğrulaması; SOAP istemcisi (WSDL'den işlem çağırma, namespace/sürüm uyumsuzluğunu yakalama); Fault içinde gizli bilgi ve iç izleme (traceback) sızıntısını engelleyen hata eşlemesi; Sağlayıcı kimlik bilgisini Password alanında saklayan ve yalnız sunucuda çözen bir SOAP bağlantı DocType'ı; WS-Security/WS-Addressing desteği (gereksinim tanımlanmamış); headless_provider içinde SOAP için yetenek (capability) ve zarf (kernel-envelope) sözleşmesi; Sağlayıcı, SOAP sürümü ve örnek WSDL girdisi (kaynak dışı, hâlâ belirsiz)

Sonraki somut adım: Önce soap-api--contract için hedef sağlayıcıyı, SOAP sürümünü, WS-Security gereksinimini ve gerçek bir örnek WSDL/XSD'yi girdi olarak sabitle; bu girdi gelmeden build başlamasın. Sonra yeni bağımsız bir uygulama modülünde SOAP/XML bağımlılığını kendi pyproject'inde tanımla; suite'in lxml'ine dolaylı yoldan dayanma. Ardından en dar davranış için, örnek WSDL'deki tek bir işlemin istemci tarafı tüketimi için, gerçek RED/GREEN testi yaz: XSD'ye uymayan yanıt reddedilmeli, namespace/sürüm uyumsuzluğu tipli hata vermeli, fault gizli bilgi taşımamalı. XML ayrıştırıcıda suite/drive/webdav/xmlutil.py'deki sertleştirme ayarlarını örnek al (resolve_entities=False, no_network, load_dtd=False, DOCTYPE reddi, gövde sınırı), ama modülü doğrudan import etme. Sunucu tarafını en son ekle: global before_request yerine allow_guest=False ile tanımlı tek bir whitelisted method ya da ayrı ve kapsamı sınırlı bir rota kullan. Kimlik bilgisi Password alanında tutulsun, get_decrypted_password ile yalnız sunucuda okunsun. Mevcut bağımlılık sırası korunsun: kernel-envelope, tenant-registry, native-user-policy, capability-definition, outbox ve api-middleware sözleşmeleri.

Önerilen bağımlılık/sıra: soap-api--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; api-middleware--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `soap-api--implementation`.

Kaynak kanıtı:

- `frappe/frappe/app.py:341` — `if request_data and request.is_json:`
- `frappe/frappe/integrations/doctype/webhook/webhook.json:127` — `"options": "\nForm URL-Encoded\nJSON"`
- `suite/suite/drive/webdav/xmlutil.py:18` — `resolve_entities=False,`
- `suite/suite/drive/webdav/xmlutil.py:46` — `if b"<!DOCTYPE" in body or b"<!ENTITY" in body:`
- `suite/pyproject.toml:17` — `"lxml~=6.1",  # drive: WebDAV XML (previously only a transitive dep via frappe)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe (tüm uygulama kökü); arama `(?i)\b(soap|wsdl|xsd|zeep|suds|spyne|xmlschema)\b`: 6 dosya eşleşti, hiçbiri uygulama değil: lucide ikon SVG'si, derlenmiş syntax_highlighting/web bundle'ları ve frappe/ui/src/components/Fields/fieldtypeToLanguage.ts:50 içindeki 'xsd' dil eşlemesi.
- suite (tüm uygulama kökü); arama `(?i)\b(soap|wsdl|xsd|zeep|suds|spyne|xmlschema)\b`: Yalnız derlenmiş Vue arayüz bundle'ları eşleşti (suite/suite/public/frontend/assets/*.js ve map dosyaları: editor, gemoji, xlsx, lib); hiçbiri SOAP uygulaması değil.
- frappe (_.py,_.json,_.toml,_.ts,*.vue); arama `(?i)(soap|wsdl|xsd|zeep|xmlschema|text/xml|application/soap\+xml|SOAPAction)`: Tek eşleşme fieldtypeToLanguage.ts:50 (sözdizimi dili eşlemesi); SOAP ile ilgili kaynak yok.
- suite (_.py,_.json,_.toml,_.ts,*.vue); arama `(?i)(soap|wsdl|xsd|zeep|xmlschema|text/xml|application/soap\+xml|SOAPAction|resolve_entities|XMLParser)`: Yalnız suite/suite/drive/webdav/xmlutil.py:17-18 (WebDAV'a özgü, sertleştirilmiş lxml ayrıştırıcı) ve ilgisiz bir package-lock integrity eşleşmesi.
- frappe/frappe/{api/_.py,app.py,handler.py,integrations/\**/_.py,utils/response.py,utils/xlsxutils.py}; arama `(?i)(xml|lxml|ElementTree|defusedxml)`: XML istek ayrıştırma yok; yalnız XMLHttpRequest başlığı, openxmlformats MIME türleri ve response.py:322'deki '.xml' uzantısı geçiyor.
- frappe/frappe/{app.py,integrations/doctype/webhook/webhook.json,webhook.py}; arama `(?i)(request_structure|content_type|get_json|is_json)`: İstek gövdesi yalnız JSON ya da form olarak ayrıştırılıyor (app.py:341). Webhook yalnız Form URL-Encoded/JSON destekliyor (webhook.json:127, webhook.py:110-113).
- frappe/pyproject.toml, suite/pyproject.toml; arama `(?i)(lxml|xml)`: Suite'te Drive için lxml~=6.1 tanımlı; frappe'te yalnız test raporlama için unittest-xml-reporting/xmlrunner var. SOAP/WSDL kütüphanesi yok.
- suite/suite/headless_provider; arama `(?i)(xml|envelope|content_type|mimetype)`: Eşleşme yok; yerel pilot sağlayıcıda SOAP/XML sözleşmesi bulunmuyor.

Sınır: Kapsam yalnız sourceRoot altındaki frappe ve suite uygulama kökleri; ERPNext/HRMS ve harici ekosistem paketleri değerlendirilmedi.; Kaynağın varlığı çalışma zamanı davranışını kanıtlamaz; functionalAcceptance=not_run. Hiçbir test yazılmadı veya çalıştırılmadı.; Derlenmiş JS bundle'larındaki eşleşmeler kütüphane metni olarak sınıflandırıldı ve tek tek ayrıntılı okunmadı.; Python ortamında frappe'ye geçişli olarak gelen paketler (site-packages) kaynak kapsamında değil; zeep gibi bir kütüphanenin ortamda kurulu olup olmadığı bilinmiyor.; Sağlayıcı, SOAP sürümü ve WS-Security gereksinimi kaynakta yok; bunlar ürün girdisi olarak belirsiz kalıyor.; Plan modu etkin olsa da kullanıcı yalnız Read/Glob/Grep'e izin verdi; plan dosyası yazılmadı, yalnız istenen JSON çıktısı üretildi.

Temporal workflow: `saas-recheck-20261015t073528z-032`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integration-12 — XML canlı besleme; HTTP pull/push ile çift yönlü ve artımlı veri eşitleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

XML'in taşıma olmadığı ve cursor/silme/XXE/SSRF kabulü doğru tanımlı. Zamanlayıcı, HTTP istemcisi ve XML parser primitifleri kaynakta var. Besleme çekme/itme ve eşitleme mantığı yok. Çift yönlü çakışma kuralı ve checkpoint saklama sözleşmesi eksik.

Eksik: Cursor/checkpoint ve silme işareti için saklama DocType'ı tanımsız.; Çift yönlü eşitlemede çakışma çözümü ve yazma idempotency'si tanımsız.; Push alımı için kimlik doğrulama (imza/token) ve 429/boyut sınırı integration-8'e bağlanmamış.; Zamanlama kaynağı belirsiz: scheduler_events mi, Scheduled Job Type mı? Gecikme hedefinin sayısal değeri yok.; Egress allowlist ve parser yapılandırmasının sahibi atanmamış.

Sonraki adım önerisi: xml-feed--implementation için checkpoint DocType alanlarını, çakışma kuralını (kaynak öncelikli veya zaman damgası) ve sayısal gecikme hedefini ekle. Tek örnek XSD ile sözleşmeyi sabitle.

Mevcut birincil görev: `xml-feed--implementation`. Kaynak: `suite/suite/hooks.py:289`; `frappe/pyproject.toml:68`; `suite/pyproject.toml:17`.

#### integration-13 — MCP entegrasyonu; şemalı araç/kaynak kataloğu ve güvenli uzak erişim.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Frappe ve Suite'te MCP sunucusu yok: JSON-RPC MCP uç noktası, Streamable HTTP/stdio taşıması, initialize/protokol sürümü, tools/list, tools/call ya da resources/* bulunmuyor. Upstream Frappe'de MCP için kullanılabilecek, gerçekten çalışan şu temel parçalar var: (1) frappe/frappe/api/discovery.py ve v2 /api/v2/discovery* rotaları, whitelisted Python metotlarını ve DocType controller metotlarını AST ve inspect ile tarayarak makinece okunabilir bir katalog üretiyor. Katalogda parametre adı, zorunluluk, varsayılan değer ve tip; endpoint; HTTP metotları; allow_guest ve DocType metotları için GET=read/POST=write izin eşlemesi yer alıyor. Kaynak kodun gösterilmesi expose_discovery_source hook'una bağlı, katalog Redis'te önbellekleniyor ve erişim yalnız System Manager'a açık. (2) OAuth tarafında RFC 9728 /.well-known/oauth-protected-resource (OAuth Settings'e bağlı, Social Login Key'leri authorization_servers olarak ekleyebiliyor), RFC 8414 sunucu metadata'sı, RFC 7591 dinamik istemci kaydı, PKCE S256 ve 401 yanıtında WWW-Authenticate resource_metadata başlığı var. (3) Kimlik doğrulama: validate_oauth yalnız Frappe'nin kendi verdiği ve OAuth Bearer Token DocType'ında hash olarak saklanan tokenları kabul ediyor. auth_hooks bir genişletme noktası. Keycloak yalnız Social Login Key ile tarayıcı/cookie girişi olarak bağlı. (4) Suite'teki LOCAL PILOT headless_provider (headless-metadata.v1), yazma onayı için örnek bir desen sunuyor: preview_edit ile proposalDigest, apply_edit'te hmac ile digest eşleşmesi, revision kontrolü, native izin denetimi ve advisory lock. Ancak bu MCP değil, cookie oturumuyla çalışan bir RPC. Suite'in Sheets AI istemcisi Anthropic API'ye giden bir LLM çağrısı (emit_actions tool_use); MCP altyapısı sayılmaz.

Eksik: MCP JSON-RPC sunucusu yok: initialize ve protokol sürümü pazarlığı, tools/list, tools/call, resources/list ve resources/read uygulanmamış.; Streamable HTTP uç noktası (tek MCP yolu, Origin doğrulaması, oturum başlığı) ve yerel stdio taşıması yok.; Discovery çıktısı MCP inputSchema/outputSchema'ya (JSON Schema) çevrilmiyor. Yalnız System Manager görebildiği için kullanıcı kapsamlı, izne göre süzülmüş bir araç kataloğu yok. Tüm whitelisted metotlar listeleniyor; açıkça onaylanmış bir araç allowlist'i yok.; Keycloak'un verdiği access token'ı (JWT, JWKS, iss, aud/resource) doğrulayıp Frappe User'a eşleyen bir bearer doğrulaması yok. validate_oauth yalnız Frappe'nin kendi token'ını tanıyor ve audience kontrolü yapmıyor.; Okuma/yazma araç politikası, MCP yazma çağrıları için açık onay/ret akışı ve kalıcı onay/audit kaydı (kim, ne zaman, hangi argüman ve sonuç) yok.; MCP araç kataloğunun GenUI component registry'sinden ve query-action registry'sinden ayrı tutulduğunu gösteren bir sınır/sözleşme yok.

Sonraki somut adım: Sıra mevcut bağımlılıklara göre: önce mcp-api--contract ve native-user-policy--contract, sonra mcp-api--implementation. En küçük adım: Suite içinde, headless_provider'dan ayrı bir modülde, salt okunur ve sabit allowlist'li 3-5 araçla Streamable HTTP üzerinden çalışan bir MCP tools/list + tools/call ucu. Örnek araçlar: frappe.client.get_list/get, headless_provider.metadata. Araç şeması discovery.py'deki _method_params çıktısından JSON Schema'ya çevrilsin, her çağrı native has_permission ile kullanıcı bağlamında çalışsın. Ardından auth_hooks ile Keycloak JWT doğrulaması (iss, aud=MCP resource, JWKS) ve Frappe User eşlemesi eklensin; mevcut oauth-protected-resource metadata'sı bu resource ile hizalansın (integration-9 kimlik ADR'sine bağlı). Yazma araçları en son gelsin; headless_provider'daki preview→digest→apply desenini ve kalıcı onay/audit kaydını kullansın. Her davranış için önce RED, sonra GREEN test kanıtı üretilsin; testler bu incelemede yazılmadı ve çalıştırılmadı.

Önerilen bağımlılık/sıra: mcp-api--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; api-middleware--contract; ui-family-36--implementation-post-mvp. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `mcp-api--implementation`.

Kaynak kanıtı:

- `frappe/frappe/api/v2.py:606` — `Rule("/discovery", methods=["GET"], endpoint=discovery.root),`
- `frappe/frappe/api/discovery.py:29` — `frappe.only_for("System Manager")`
- `frappe/frappe/api/discovery.py:305` — `"permission": {"GET": "read", "POST": "write"},`
- `frappe/frappe/integrations/oauth2.py:307` — `if path.startswith("/.well-known/oauth-protected-resource") and is_oauth_metadata_enabled("resource"):`
- `frappe/frappe/auth.py:722` — `"OAuth Bearer Token", token_filters, ("scopes", "user"), as_dict=True`
- `suite/suite/headless_provider/api.py:149` — `if not hmac.compare_digest(_proposal_digest(snapshot, requested, diff), proposal_digest):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite tümü); arama `(?i)\bmcp\b|model.?context.?protocol|streamable.?http|json-?rpc`: Yalnız frappe/.gitignore'da '.playwright-mcp' satırı ve suite derlenmiş bir JS source map dosyası eşleşti; MCP sunucu kodu yok.
- source (*.py); arama `(?i)(tool_?(catalog|registry|schema|definition)|input_?schema|list_?tools|resources/list|tools/call|anthropic|openai|llm|agent)`: 49 dosya eşleşti, çoğu user-agent ya da ilgisiz kullanım. İlgili olanlar: frappe/frappe/api/discovery.py (katalog), suite/suite/headless_provider/api.py (pilot RPC), suite/suite/sheets/ai/client.py (Anthropic tool_use istemcisi, MCP değil).
- frappe/frappe/api; arama `discovery`: v2.py:606-618 satırlarında discovery rotaları kayıtlı; discovery.py tamamı okundu.
- source (*.py); arama `(?i)def validate_oauth|def validate_auth|audience|"aud"|protected.?resource|resource_indicator|well-known/oauth`: oauth2.py'de RFC 9728/8414 metadata uçları, app.py:334'te WWW-Authenticate resource_metadata, auth.py'de validate_oauth (yalnız Frappe token'ı) bulundu. Suite'teki aud kullanımları Meet recorder'a özel; MCP ile ilgisiz.
- suite/suite/hooks.py; arama `(?i)auth_hooks|expose_discovery_source|keycloak|oauth`: Yalnız Frappe oauth2 yolları için bir path listesi eşleşti (satır 415-440). auth_hooks ya da expose_discovery_source kullanılmıyor.
- source (*.{py,json,ts,js,vue}); arama `(?i)keycloak|auth_hooks\s*=|expose_discovery_source\s*=`: Keycloak yalnız Social Login Key sağlayıcısı ve login_via_keycloak (tarayıcı girişi) olarak geçiyor. frappe/hooks.py:603'te expose_discovery_source = True. Hiçbir uygulamada auth_hooks kaydı yok.
- suite/suite/sheets/ai/client.py; arama `(?i)tools|tool_use|anthropic\.|messages\.create|approval|confirm`: Anthropic messages.create çağrısı tek bir emit_actions aracıyla yapılıyor: dışarıya giden bir LLM istemcisi, MCP sunucusu değil.

Sınır: Yalnız yerel source snapshot'ı (frappe ve suite) Read/Grep/Glob ile okundu. Kod çalıştırılmadı, test yazılmadı ya da çalıştırılmadı; functionalAcceptance: not_run.; Kaynak yalnız kodun varlığını gösterir. OAuth Settings değerleri, Keycloak realm/audience yapılandırması ve deploy edilmiş davranış doğrulanamaz.; suite/headless_provider LOCAL PILOT ek koddur, upstream'e ait değildir. MCP değildir; yalnız yazma onayı deseni için örnek olarak değerlendirildi.; Suite'in Vue frontend'i ile headless provider sözleşmeleri ayrı tutuldu. GenUI kodu bu kaynakta yok ve değerlendirilmedi.; ERPNext/HRMS kurulu değil, değerlendirme kapsamı dışında. MCP 2026-07-28 spesifikasyonuna uyum harici belgelere göre iddia edilmedi.; suiteCommit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-033`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### integration-14 — AI Mapping; kaynak/hedef alan, tip, birim, kod ve ilişki eşlemesine denetlenebilir öneri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni manuel yol, önizleme, açık onay ve otomatik import yasağıyla güçlü. Kaynakta hedef şema içgözlemi (get_meta, link alanları) var. Eşleme önerisi, eşleme artefaktı ve sürümlü uygulama yok. Uygulamanın native Data Import yoluna bağlanıp bağlanmayacağı belirtilmemiş.

Eksik: Eşleme artefaktı şeması (kaynak alan, hedef alan, dönüşüm, güven, kanıt, sürüm) tanımsız. field-mapping-rule görevine bağlı ama alanları yok.; Uygulama yolu belirsiz: native Data Import/insert izin yolu mu, özel yazıcı mı?; Birim ve kod listelerinin kaynağı tanımsız.; Model sağlayıcı, zaman aşımı ve değerlendirme ölçütü (doğruluk eşiği) tanımsız.; v2 get_meta yalnız All rolü istiyor. Meta okuma yetkisi yazma yetkisi sayılmamalı.

Sonraki adım önerisi: field-mapping-rule--implementation-post-mvp'de artefakt alanlarını ve onay sonrası uygulamanın native izinli insert/Data Import üzerinden yapılacağını yaz. Model katmanını opsiyonel öneri kaynağı olarak sınırla.

Mevcut birincil görev: `field-mapping--implementation`. Kaynak: `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v2.py:246`; `frappe/frappe/api/v1.py:96`.

### Panel, ekranlar ve kişiselleştirme

#### forms-1 — Form manager (form oluşturma ve yönetim aracı).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul var. Kaynakta bunun temel parçaları da bulunuyor: v2 get_meta, Custom Field ve Property Setter birleştirmesi, alan düzeyinde okuma izni ve DocType Layout. Ancak talimat 'form manager' ile neyin kastedildiğini belirlemiyor: standart DocType özelleştirmesi mi, custom DocType düzenleme mi, yoksa yalnız sunum katmanı mı (Layout)? get_meta, giriş yapmış her kullanıcıya meta dönüyor. Bu yüzden render sırasında alanın meta'da görünmesi yazma yetkisi anlamına gelmiyor. Web Form kaynağı bu excerpt'te yok.

Eksik: Form manager'ın üç farklı yolu ayrılmamış: Customize Form/Custom Field (yalnız standart DocType), custom DocType düzenleme ve DocType Layout (yalnız sunum).; Renderer'ın desteklediği fieldtype/özellik alt kümesi ve bilinmeyen tiplerde güvenli varsayılan davranış tanımlı değil.; 'İzin dışı alan oluşturma' kuralının hangi role ve Custom Field/DocType izinlerine bağlanacağı belirtilmemiş. ignore_permissions kullanan make_property_setter'ın dışarı açılmaması gerektiği yazılmamış.; v17 dev'deki v2 /meta ile v1 resource uç noktaları arasında sürüm eşlemesi yok.

Sonraki adım önerisi: ui-provider-metadata--implementation-mvp görevine kısa bir sözleşme notu ekle: kaynak olarak v2 get_meta ve okumada apply_fieldlevel_read_permissions kullanılacak. Desteklenen fieldtype listesi yazılsın. Özelleştirme yalnız native Custom Field/Customize Form izinleriyle yapılsın. DocType Layout sunum katmanı olarak ayrı tutulsun.

Mevcut birincil görev: `ui-family-16--implementation`. Kaynak: `frappe/frappe/api/v2.py:246`; `frappe/frappe/model/meta.py:174`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/custom/doctype/customize_form/customize_form.py:135`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:87`.

#### forms-2 — Alan doğrulama, koşullu görünürlük ve alanlar arası bağımlılık.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

depends_on, mandatory_depends_on ve read_only_depends_on DocField özellikleri kaynakta mevcut. Bu koşullar 'eval:' biçiminde JavaScript ifadeleri; DocType Layout condition alanı da JavaScript. Headless React tarafında bunları güvenli biçimde değerlendirme sözleşmesi yok. Backend'de koşullu zorunluluğun reddedildiği (Document mandatory doğrulaması) kod bu excerpt'te görülmüyor, dolayısıyla kabul ölçütündeki backend reddi doğrulanamıyor.

Eksik: eval: ifadeleri için güvenli bir alt küme veya ayrıştırıcı kararı yok. Keyfi JS eval ve client script kısayolu açıkça yasaklanmamış.; mandatory_depends_on kuralının sunucuda uygulanıp uygulanmadığı v17 kaynağından doğrulanmamış. Çapraz alan kurallarının controller validate tarafında nerede yaşayacağı tanımlı değil.; Sunucu hata yanıtının (alan bazlı mesaj) renderer'da forma nasıl eşleneceğine dair sözleşme yok.

Sonraki adım önerisi: ui-family-17 görevinde şu sınır yazılsın: UI tarafı depends_on ifadelerini yalnız güvenli bir alt kümeyle sunum için değerlendirir, yetki ve zorunluluk sunucuda kalır. v17 Document._validate_mandatory kaynağı okunarak koşullu zorunluluğun sunucuda uygulandığı doğrulansın.

Mevcut birincil görev: `ui-family-16--implementation`. Kaynak: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:98`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:28`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.json:417`; `frappe/frappe/core/doctype/doctype_layout/doctype_layout.json:134`.

#### forms-3 — Çok adımlı form, taslak kaydı ve kaldığı yerden devam.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam koşullu ve kabul ölçütü anlamlı. Kaynakta Tab Break gibi adımlara bölmeye yarayacak düzen primitifleri var; v1 create_doc ise insert() ile doğrudan tam kayıt oluşturuyor. Eksik zorunlu alanları olan yarım bir adım hedef DocType'a kaydedilemeyebilir, bu yüzden taslağın nerede saklanacağı belirsiz. Görev yalnız post-mvp olarak eşlenmiş ve destekleyici görevi yok.

Eksik: Taslağın nerede tutulacağı belirsiz: hedef DocType'ta docstatus=0 mı, ayrı bir taslak deposu mu? Zorunlu alan doğrulamasıyla çatışma ele alınmamış.; Adım tanımının kaynağı (Tab/Section Break ya da ayrı bir adım metadata'sı) belirlenmemiş.; Taslağın kullanıcı ve tenant'a bağlanması, oturum yenilemede sahiplik kontrolü tanımlı değil.; Final submit sırasında eksik adımı yakalayan sunucu tarafı kural tanımlı değil.

Sonraki adım önerisi: ui-family-16--implementation-post-mvp altında depolama modeli kararı (hedef kayıt veya taslak deposu), sahiplik/tenant anahtarı ve final submit'te sunucu doğrulaması kısa bir sözleşme olarak yazılsın. Bu adım forms-6 ile ortak tutulsun.

Mevcut birincil görev: `ui-family-16--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:72`.

#### forms-4 — Form sürümü, yayınlama ve geriye uyumlu değişiklik.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Custom Field ve Customize Form kaydedildiği anda updatedb çalışıyor ve şema hemen uygulanıyor. Kaynakta staging veya yayınlama aşaması görülmüyor. Property Setter tarafında tip değişikliği koruması yalnız naming_series için var. Trim Table geri dönüşsüz veri kaybı uyarısı gösteriyor. Hem Property Setter hem DocType Layout track_changes ile denetim izi tutuyor, ancak yayınlanmış form sürümü kavramı yok.

Eksik: Form sürüm kimliği tanımlı değil; örneğin efektif meta ile layout'tan türetilen bir hash ve bunun taslağa nasıl damgalanacağı.; Kırıcı değişiklik sınıfları (fieldtype değişimi, alan silme, reqd ekleme) ve yayın öncesi engelleme kuralı belirtilmemiş.; Eski taslağı yeni sürüme taşıyacak deterministik dönüşüm (alan eşleme) sözleşmesi yok.; Native kaydın şemayı hemen uyguladığı göz önüne alınarak önizleme/onay sınırı tanımlanmamış.

Sonraki adım önerisi: Post-mvp görevinde form sürümü olarak efektif get_meta ile layout özetinin kullanılması sözleşmeye bağlansın. Kırıcı değişiklik listesi yazılsın, bu değişiklikler önizleme ve onay olmadan uygulanmasın. Eski taslaklar için dönüşüm/eşleme kuralı tanımlansın.

Mevcut birincil görev: `ui-family-16--implementation-post-mvp`. Kaynak: `frappe/frappe/custom/doctype/custom_field/custom_field.py:229`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:54`; `frappe/frappe/custom/doctype/customize_form/customize_form.js:230`; `frappe/frappe/custom/doctype/property_setter/property_setter.json:163`.

#### forms-5 — Dosya alanı, tekrarlanabilir alan grubu ve ilişkili kayıt seçimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Attach, Link, Table ve link_filters alan özellikleri çekirdekte mevcut. v1 tarafında link genişletmesi read izniyle yapılıyor, child satırı kaydedildiğinde parent da kaydediliyor ve upload_file import ediliyor. Ancak ilişki aramasının izin uygulaması (search_widget) bu excerpt'te görülmüyor. Talimatlar hangi arama ve yükleme API'sinin kullanılacağını belirtmiyor.

Eksik: Yetkili ilişki araması için v17 API'si (search_widget veya search_link) ve link_filters uygulaması belirtilmemiş.; Dosya gizliliği (private/public), boyut/tip sınırı ve yükleme sonrası alan bağlama sözleşmesi yok.; Tekrarlanan satırlarda sıra (idx), satır silme/ekleme ve Table MultiSelect davranışı tanımlı değil.

Sonraki adım önerisi: ui-family-19 görevinde v17 frappe.desk.search kaynağı okunsun, izinli arama uç noktası sabitlensin. Dosya için upload_file ve private varsayılanı, child satırlar için parent save akışı sözleşmeye yazılsın.

Mevcut birincil görev: `ui-family-19--implementation-mvp`. Kaynak: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:35`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:97`; `frappe/frappe/api/v1.py:104`; `frappe/frappe/client.py:11`; `frappe/frappe/api/v2.py:22`.

#### forms-6 — Otomatik taslak ve taslağı kurtarma; sekme kapanması, tarayıcı çökmesi ve bağlantı kesilmesinde emeği koruma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: tenant/hesap sızıntısı, logout, yerel taslak ile sunucu kaydı ayrımı ve şema çakışması ele alınmış. Ancak teknik karar eksik: yerel mi, sunucu mu, ikisi birden mi? Kaynakta otomatik taslak primitifi görülmüyor. Customize Form yalnız doctype adını localStorage'a yazıyor. Sunucuda for_update ile kalıcılık var, fakat eşzamanlılık (modified) kontrolü bu excerpt'te görülmüyor. Kapsam koşullu olduğu halde görev MVP görevine eşlenmiş.

Eksik: Saklama kararı (IndexedDB, sunucu taslağı ya da ikisi), saklama süresi ve hassas alanların hariç tutulması tanımlı değil.; Tauri2 ve WXT/MV3 depolama eşdeğerliği ile yerel taslağın şifrelenip şifrelenmeyeceği belirtilmemiş.; Eşzamanlı değişiklik çakışmasının modified/sürüm alanıyla nasıl tespit edileceği tanımlı değil.; Koşullu kapsam ile MVP görev eşlemesi arasındaki tutarsızlık giderilmemiş.

Sonraki adım önerisi: ui-family-16 görevinde tek bir karar notu yazılsın: taslak anahtarı tenant + kullanıcı + doctype + form sürümü olsun; logout'ta temizlensin; sunucu kaydı ile yerel taslak arayüzde ayrı gösterilsin; çakışma modified karşılaştırmasıyla yakalansın. Kapsam/MVP eşlemesi netleştirilsin.

Mevcut birincil görev: `ui-family-16--implementation`. Kaynak: `frappe/frappe/custom/doctype/customize_form/customize_form.js:11`; `frappe/frappe/api/v1.py:56`.

#### locale-1 — GILT (Globalization, Internationalization, Localization, Translation — küreselleştirme, uluslararasılaştırma, yerelleştirme, çeviri): g11n, i18n, l10n, t9n.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel Frappe v17-dev kaynağında dil seçimi, katalog birleştirme ve `_()` ile çevrilmiş API hata metni gibi temel parçalar var. Ancak talimat, headless React/Ant Design istemcisinin dili nasıl seçeceğini, kataloğu nasıl alacağını ve kapsamdaki dilleri belirtmiyor. Kabul ölçütü yalnızca 'Türkçe + ikinci dil' diyor. Oturum açmış kullanıcıda `get_language` frappe.local.lang döndürüyor; Accept-Language ve çerez yalnızca Guest için okunuyor.

Eksik: Desteklenen dil listesi ve ikinci dil seçilmemiş.; Headless istemcinin dili nasıl ileteceği tanımlı değil (`_lang`, User.language veya Keycloak claim). Keycloak/bearer oturumunda frappe.local.lang'in nasıl belirlendiği kaynakta görülmedi.; React tarafında katalog kaynağı belirtilmemiş: get_boot_translations mı, ayrı bir katalog mu? Ant Design ConfigProvider locale eşlemesi de tanımsız.; Kaynak doküman bağlantıları v16 sayfaları; yerel v17.0.0.dev0 ile eşlemesi yapılmamış.

Sonraki adım önerisi: ui-localization--implementation görevine kısa bir dil sözleşmesi eklenmeli. Sözleşmede dil listesi, dil önceliği (User.language → System Settings, `_lang` yalnız açık override olarak) ve katalog kaynağı (get_boot_translations) yazılmalı. Mevcut kabul ölçütü bu sözleşmeye bağlanmalı; yeni registry açılmamalı.

Mevcut birincil görev: `ui-localization--implementation`. Kaynak: `frappe/frappe/translate.py:49`; `frappe/frappe/translate.py:55`; `frappe/frappe/translate.py:140`; `frappe/frappe/api/v2.py:178`.

#### locale-2 — Transliteration / t13n (yazı sistemleri arasında harf dönüşümü).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynağında yazı sistemleri arasında dönüşüm yapan (ör. Kiril→Latin, Yunan→Latin, Kana/Pinyin) bir transliterasyon/t13n servisi, API'si, DocType'ı, hook'u ya da arama entegrasyonu bulunamadı. Bulunanlar yalnızca komşu, aynı alfabe içinde çalışan aksan/Unicode normalizasyon primitifleri; transliterasyonun yerine geçmezler: (1) Frappe Desk awesomebar fuzzy_match.js karakterleri NFD'ye çevirip birleşik aksan işaretlerini (U+0300–036F) atarak karşılaştırıyor; yalnız istemci tarafı Desk araç çubuğu eşleşmesi. (2) frappe/search/sqlite_search.py FTS5 varsayılan tokenizer'ı 'unicode61 remove_diacritics 2'; Suite writer/search.py aynı tokenizer'ı kullanıyor. Bu Latin aksanlarını katlar, alfabe dönüştürmez. (3) desk/search.py search_widget düz 'like %txt%' filtresiyle arıyor; normalizasyon ya da transliterasyon katmanı yok. (4) Suite drive content_disposition, ASCII olmayan dosya adları için NFKD + ascii 'ignore' kullanıyor. Bu, Kiril/CJK karakterlerini dönüştürmüyor, siliyor; özgün ad RFC 5987 filename* ile korunuyor. (5) Suite Vue frontend'inde slugify npm paketi yalnızca drive/writer URL slug'ı için kullanılıyor. Paket kodu node_modules'ta olduğundan dışarıda kaldı; karakter haritası doğrulanamadı ve bu kullanım arama veya veri girişi transliterasyonu değil. (6) Yerel pilot suite/headless_provider/api.py yalnız kontrol karakterlerini reddediyor; locale/transliterasyon sözleşmesi yok. clean_text NFKC + boşluk sadeleştirmesi yapıyor, alfabe dönüştürmüyor.

Eksik: Alfabe çiftleri için dönüşüm fonksiyonu/kütüphanesi (Python backend tarafında unidecode/anyascii/PyICU benzeri hiçbir bağımlılık veya kod yok); kütüphane ve lisans seçimi yapılmamış.; Özgün metni koruyup transliterasyonlu biçimi saklayan alan ya da indeks (Custom Field, ayrı arama sütunu veya FTS metin alanı) yok.; search_widget/link araması ve SQLiteSearch indeksleme hattında transliterasyonlu eşleme yok; mevcut tek yaklaşım Latin aksan katlama.; headless_provider için locale/transliterasyon provider sözleşmesi (girdi dili/alfabesi, çıktı, özgün metin referansı) yok; React/AntDesign istemcisinin tüketeceği bir uç nokta yok.; Kabul ölçütü olarak seçilmiş alfabe çiftleri ve 3–5 örneklik test veri seti yok.

Sonraki somut adım: Mevcut ui-localization--contract bağımlılığı içinde önce kapsamı daraltın: tek bir alfabe çifti (ör. Kiril→Latin) ve tek bir senaryo (link/global arama) seçin, 3–5 örneklik kabul tablosu yazın. Kütüphane ve lisans seçimini kullanıcıyla netleştirin. Ardından sırasıyla: (1) backend'de saf bir transliterate(text, source_script, target) yardımcı fonksiyonu yazın; önce bu fonksiyon için RED/GREEN birim testi kurun. (2) Bu fonksiyonu SQLiteSearch alt sınıfının indekslediği metne ek bir alan olarak bağlayın; özgün metin değişmeden kalsın. Alternatif olarak search_widget'a or_filters ile ikinci bir aday terim ekleyin. (3) Bunu headless_provider'da okunur bir sözleşme alanı olarak açın. Suite'in Vue frontend'ine ve GenUI'ye dokunmayın. Seçim yapılamıyorsa maddeyi post_mvp'de ertelenmiş olarak bırakın.

Önerilen bağımlılık/sıra: ui-localization--contract; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-localization--implementation`.

Kaynak kanıtı:

- `frappe/frappe/public/js/frappe/ui/toolbar/fuzzy_match.js:87` — `.replace(/[\u0300-\u036f]/g, "")`
- `frappe/frappe/search/sqlite_search.py:224` — `schema.setdefault("tokenizer", "unicode61 remove_diacritics 2")`
- `frappe/frappe/desk/search.py:251` — `or_filters.append([doctype, f.strip(), "like", f"%{txt}%"])`
- `suite/suite/drive/utils/files.py:582` — `simple = unicodedata.normalize("NFKD", download_name).encode("ascii", "ignore").decode("ascii")`
- `suite/suite/writer/search.py:12` — `"tokenizer": "unicode61 remove_diacritics 2 tokenchars '-_'",`
- `suite/suite/utils/__init__.py:148` — `text = unicodedata.normalize("NFKC", text)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite tamamı); arama `(?i)translitera|t13n|unidecode|anyascii|romaniz|unicodedata\.normalize|cyrillic|latinize|text-unidecode`: Transliterasyon kodu yok. Eşleşmeler: suite/utils clean_text NFKC, drive content_disposition NFKD, meet STT NFKC, frappe safe_exec NFKC; ayrıca sr.po içinde 'Serbian (Cyrillic)' çeviri ekibi başlığı ve derlenmiş/minify edilmiş üçüncü taraf JS dosyaları. Hiçbiri alfabe dönüşümü yapmıyor.
- source/ (frappe + suite; *.map, *.po, *.mo, *.csv hariç); arama `(?i)slugify|diacritic|unaccent|strip_accents|remove_accents|ascii.?fold|pinyin|hiragana|katakana|pyicu|\bicu\b|deburr|NFKD|NFD"`: Bulunanlar: fuzzy_match.js NFD aksan katlama, SQLiteSearch remove_diacritics tokenizer'ı (frappe ve suite writer), Suite Vue frontend'inde drive/writer URL slug'ı için slugify. ICU/pinyin/kana veya genel bir transliterasyon servisi yok.
- suite/suite/headless_provider/; arama `(?i)normaliz|translit|unicode|locale|search|lang`: Yalnız api.py:425'te kontrol karakteri reddi var; locale veya transliterasyon sözleşmesi yok.
- frappe/frappe/desk/search.py; arama `(?i)normaliz|unicode|translit|accent|_txt_|like`: search_widget düz LIKE %txt% kullanıyor. _normalize_awesomebar_result yalnız sonuç sözlüğünü biçimliyor; metin normalizasyonu ya da transliterasyon yapmıyor.

Sınır: Kapsam yalnızca sourceRoot altındaki kurulu frappe ve suite uygulamalarıdır. ERPNext/HRMS ve genel ekosistem değerlendirilmedi.; node_modules dışarıda kaldı: slugify paketinin karakter haritası ve tarayıcı içinde transliterasyon davranışı kaynaktan doğrulanamadı. Bu kullanım zaten yalnız URL slug'ı içindir.; Derlenmiş/minify edilmiş dist ve public/assets dosyalarındaki uzun satırlar incelenmedi; kaynak eşdeğerleri esas alındı.; Veritabanı collation'ı ve MariaDB/SQLite runtime eşleme davranışı kaynaktan kanıtlanamaz; functionalAcceptance=not_run.; suite/headless_provider yerel pilot ek koddur, upstream-native değildir. Suite'in Vue frontend'i headless React/AntDesign sözleşmesinden ayrıdır.; Hiçbir test çalıştırılmadı veya yazılmadı. Bu sonuç ürün DONE/yüzde bildirimi değildir.

Temporal workflow: `saas-recheck-20261015t073528z-012`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### locale-3 — Dil anahtarları, yedek dil, çoğul kuralları ve çeviri sürümleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta Babel tabanlı PO/MO hattı ve üst dile geri dönüş var: zh-TW → zh, ardından alt dilin çevirileri üstüne yazılıyor. Çeviri sürümü için bir önbellek anahtarı da var. Ancak frontend'e giden katalog düz bir dict[str,str]; çoğul biçimlerin istemciye nasıl taşınacağı bu alıntılarda görülmüyor. Kataloğun 1 yıllık http_cache ile sunulması, sürüme bağlı önbellek kırma sözleşmesini zorunlu kılıyor. Talimat v16 dokümanına dayanıyor; yerel v17-dev ile doğrulanmamış.

Eksik: Çoğul kuralı için sözleşme yok (ngettext/plural-forms istemciye nasıl iletilecek).; Eksik anahtarda kaynak metne dönüş davranışı ve Language.based_on alanının geri dönüşteki rolü doğrulanmamış (birleştirme dil kodunu bölerek yapıyor).; Headless istemcinin önbellekteki kataloğu translation_version üzerinden nasıl tazeleyeceği tanımlı değil.; CSV ve PO/MO birlikte mi kullanılacak, yoksa v17-dev'de tek yol mu var, seçilmemiş.

Sonraki adım önerisi: Mevcut kabul ölçütü yerel v17-dev'e bağlanmalı. Üç kontrol adı konmalı: eksik anahtar, üst dile geri dönüş ve sürüm değişince katalog yenileme. Çoğul ihtiyacı varsa bunun Frappe kataloğunda mı, istemci tarafındaki ICU'da mı çözüleceğine tek kararla karar verilmeli.

Mevcut birincil görev: `ui-localization--implementation`. Kaynak: `frappe/frappe/translate.py:33`; `frappe/frappe/translate.py:139`; `frappe/frappe/translate.py:165`; `frappe/frappe/gettext/translate.py:19`; `frappe/pyproject.toml:12`.

#### locale-4 — Saat dilimi, tarih, sayı, para, adres ve telefon biçimleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe'de dile bağlı tarih/saat/sayı biçimleri ve haftanın ilk günü var. Bunlar Language kaydından, yoksa sistem varsayılanından okunuyor ve Language değişince kullanıcı varsayılanlarına yayılıyor. Suite ise kendi frontend kodunda saat dilimini tarayıcı → User → sistem sırasıyla seçiyor ve UTC kablo biçimiyle naive sistem saati alanlarını ayırıyor. Talimat round-trip kabulünü istiyor ama hangi biçimin kabloda gideceğini ve saat dilimi önceliğini belirlemiyor. Adres ve telefon için alıntılarda kaynak yok.

Eksik: Kablo sözleşmesi yok. Frappe Datetime alanları naive sistem saat diliminde; UTC/ISO dönüşümü istemcide mi sunucuda mı yapılacak, belirsiz.; Saat dilimi önceliği seçilmemiş. Suite tarayıcıyı User.time_zone'un önüne koyuyor; ürün için bu bir karar gerektiriyor.; Frappe number_format/date_format değerlerinin Intl/dayjs ve Ant Design DatePicker biçimlerine eşlemesi yok.; Para birimi hassasiyeti, adres ve telefon şeması için kaynak alıntılanmamış. ERPNext kurulu olmadığından ülke adres şablonları yerel yetenek sayılamaz.

Sonraki adım önerisi: ui-family-17--implementation-mvp görevine tek sayfalık bir biçim sözleşmesi eklenmeli: kablo biçimi, saat dilimi önceliği ve locale.py değerlerinin Intl eşlemesi. Suite'teki datetime yardımcıları yeniden yazılmak yerine referans desen olarak gösterilmeli.

Mevcut birincil görev: `ui-family-17--implementation-mvp`. Kaynak: `frappe/frappe/locale.py:51`; `frappe/frappe/core/doctype/language/language.py:68`; `suite/frontend/src/apps/mail/utils/datetime.ts:21`; `suite/frontend/src/apps/mail/utils/datetime.ts:47`; `frappe/frappe/utils/dateutils.py:58`.

#### locale-5 — Sağdan sola yazım ve çok dilli içerik alanları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe'de dil kaydı ve kullanıcıya özel çeviriler var. Ancak kullanıcı çevirileri genel metin eşlemesi; kayda özel, çok dilli içerik alanı sağlamıyor. Language DocType alanlarında yazım yönü (RTL) alanı yok. RTL algılamanın başka bir yerde olup olmadığı alıntılarda görülmedi. Talimat RTL ve çok dilli içerik kabulünü yazıyor, ancak veri modelini ve renderer sınırını belirtmiyor.

Eksik: Kayda özel çok dilli içerik için model seçilmemiş: dil başına Custom Field, alt tablo ya da ayrı DocType. Native Custom Field ile yetki sınırı da tanımsız.; API'de içerik dili istenirse bulunmadığında hangi dile dönüleceği ve arama indeksinin nasıl davranacağı tanımlı değil.; Yön bilgisinin kaynağı (dil koduna göre RTL listesi) ve Ant Design ConfigProvider direction ile mantıksal CSS sözleşmesi yok.; RTL için klavye/odak kabulü, WCAG 2.2 AA ve tarayıcı matrisine bağlanmamış.

Sonraki adım önerisi: Önce yalnızca içerik modeli kararı verilmeli (Custom Field ya da alt tablo; ORM kopyalanmadan). RTL kısmı ui-localization görevinde, yönün dil kodundan türetildiği tek bir kural olarak tanımlanmalı. Arapça kabulü bu iki karardan sonra uygulanmalı.

Mevcut birincil görev: `ui-localization--implementation`. Kaynak: `frappe/frappe/translate.py:171`; `frappe/frappe/core/doctype/language/language.json:46`; `frappe/frappe/core/doctype/language/language.py:61`.

#### views-1 — Listing page (liste sayfası) ve single/detail page (tek kayıt/detay sayfası).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: doğrudan URL, listeden geçiş, 403 ile 404 ayrımı. Backend tarafında v1 liste ve tek kayıt route'ları, read izni ve alan düzeyi okuma filtresi kaynakta var. Liste/detay ekranları (React) kaynakta yok. Talimat v1/v2 seçimini ve v17-dev eşlemesini belirtmiyor.

Eksik: /api/resource (v1) mı /api/v2/document mı kullanılacak belirtilmemiş. v2 dosya başlığı iç uygulamanın kırıcı değişiklik sayılmadan değişebileceğini söylüyor; v17.0.0-dev için sürüm sabitleme yok.; Yetkisiz kayıtta kaydın varlığı açığa çıkmadan 403/404 nasıl ayrılacak? Bu politika tanımsız.; path:name içindeki '/' ve özel karakterler için URL kodlama sözleşmesi yok.; Detayda form düzeni için meta kaynağı belirsiz. v2 get_meta yalnız only_for("All") ile korunuyor, excerpt'te permlevel filtresi görünmüyor; meta sunumu yetki kaynağı sayılmamalı.; Görev eşlemesinde 'ui-family-15--implementation' (views-1) ile 'ui-family-15--implementation-post-mvp' (views-4) MVP/post-MVP ayrımı açıklanmamış.

Sonraki adım önerisi: page-record-list--implementation ve page-record-detail--implementation görevlerine şunlar eklenmeli: API sürümü (v1 veya v2) ve Frappe commit adf1fd0c'ye sabitleme, 403/404/varlık sızıntısı kararı, name kodlama kuralı. Detay alanları yalnız sunucunun döndürdüğü belgeden okunmalı.

Mevcut birincil görev: `page-record-list--implementation`. Kaynak: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v1.py:155`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/api/v2.py:246`.

#### views-2 — Tablo, liste, kart ve Kanban (durum sütunlarından oluşan pano) görünümleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü iki şart koyuyor: görünüm değişince veri korunmalı, sürükleme yetkisi backend'de doğrulanmalı. Backend'de grup sayımı (izinli sorgu) ve değer güncelleme ilkelleri var. Kanban pano DocType kaynağı bu excerpt'te görünmüyor. Desk görünümleri bağımsız frontend'e taşınamaz.

Eksik: Kanban sütununun hangi alana bağlanacağı tanımsız: Select alanı, workflow_state ya da Kanban Board. Workflow geçişi ile set_value arasındaki fark ele alınmamış.; Sürükle-bırak için mutasyon yolu ve eşzamanlılık kuralı (modified çakışması) yok.; Grid kütüphanesi kararı açık. Tablo görünümü bu karara bağlı, ama bağımlılık talimatta yazmıyor.; 10 görünüm görevi var ve çoğu post-MVP. Koşullu kapsam için MVP alt kümesi seçilmemiş.

Sonraki adım önerisi: ui-family-08 görevinde MVP için yalnız tablo, liste ve kart seçilmeli. Kanban için durum alanı ve geçiş sözleşmesi tanımlanmalı: native set_value veya workflow geçişi kullanılır, sunucu reddederse UI geri alınır. Grid kararı bağımlılık olarak işaretlenmeli.

Mevcut birincil görev: `ui-family-08--implementation-post-mvp`. Kaynak: `frappe/frappe/desk/listview.py:36`; `frappe/frappe/desk/listview.py:47`; `frappe/frappe/client.py:183`.

#### views-3 — Bulk operations (toplu işlemler) ve çoklu kayıt seçimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü iyi: her kayıt ayrı denetlenmeli, kısmi hatada işlenen kayıtlar raporlanmalı. Kaynakta v2'de toplu işlem için async eşiği, client'ta da 200 kayıtlık insert_many sınırı var. v2'deki bulk route'ları excerpt'te görünmüyor. Toplu işlem sonucunun ve ilerlemesinin headless sözleşmesi tanımlı değil.

Eksik: Hangi native toplu uç noktanın kullanılacağı ve v17-dev'deki imzası belirtilmemiş.; Eşik aşılınca iş async'e düşüyor. Bu durumda iş kimliği, ilerleme ve sonuç sorgulama sözleşmesi yok.; Kayıt başına başarı/hata yanıt şeması tanımsız.; Tekrar gönderimde idempotency ve submit/cancel/delete için yetki ayrımı yazılmamış. v1 delete içinde alt kayıtlar için TODO var.

Sonraki adım önerisi: ui-family-14 görevine şunlar eklenmeli: native v2 bulk uç noktasının kaynakta doğrulanması, senkron/async eşik davranışı ve kayıt başına sonuç şeması. Yeni toplu API yazılmamalı. ignore_permissions içeren yardımcılar açılmamalı.

Mevcut birincil görev: `ui-family-14--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v2.py:32`; `frappe/frappe/client.py:246`; `frappe/frappe/api/v1.py:71`.

#### views-4 — Kayıt karşılaştırma: çalışan, ürün ve diğer iş varlıkları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü doğru noktayı vurguluyor: yalnız ortak ve yetkili alanlar karşılaştırılmalı, gizli alan sızmamalı. Alan düzeyi okuma izni kaynakta var. Ancak HRMS ve ERPNext bu sitede kurulu değil; çalışan ve ürün karşılaştırması native kurulu yetenek sayılamaz. Talimat bu ayrımı yapmıyor.

Eksik: Örnek varlıklar (HRMS Employee, e-ticaret ürünü) kurulu uygulama envanterinde yok. Hedef DocType'lar ve ilk örnek belirtilmemiş.; Karşılaştırılacak kayıtların farklı permlevel erişimi varsa alan kesişiminin nasıl hesaplanacağı tanımsız.; Kayıt sayısı sınırı ve child table/link alanlarının nasıl karşılaştırılacağı yazılmamış.

Sonraki adım önerisi: ui-family-15 post-MVP görevinde ilk örnek, kurulu frappe veya suite içindeki bir DocType ile sınırlanmalı. HRMS ve ERPNext örnekleri 'kurulum gerekir' diye etiketlenmeli. Alan kümesi her kayıt için sunucunun döndürdüğü izinli alanların kesişimi olmalı.

Mevcut birincil görev: `ui-family-15--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v1.py:84`; `frappe/frappe/model/meta.py:746`.

#### views-5 — State management (arayüz durumu yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü riskleri doğru tanımlıyor: geri/ileri gezinme, tenant değişimi, eşzamanlı yanıt. URL, sunucu önbelleği ve form durumu ayrımı yazılı. Kaynaktaki referans desenler Vue tabanlı: frappe/ui snapshot/restore ve doctype başına meta önbelleği. Seçilen React/TanStack yığınına doğrudan aktarılamazlar.

Eksik: TanStack Query anahtar şeması tanımsız. Tenant, site, kullanıcı, doctype ve meta revizyonu anahtarda yer almalı. frappe/ui önbelleği yalnız doctype ile anahtarlanıyor ve oturum boyunca saklanıyor.; Tenant değişiminde önbellek temizleme ve devam eden isteği iptal etme kuralı yazılmamış.; Taslak form durumunun meta yenilenince korunacağına dair bir sözleşme yok.

Sonraki adım önerisi: ui-provider-query ve ui-view-state görevlerine sorgu anahtarı şeması ve tenant değişimi temizlik kuralı eklenmeli. Vue composable'ları yalnız referans alınmalı, kopyalanmamalı.

Mevcut birincil görev: `ui-view-state--implementation`. Kaynak: `frappe/ui/src/composables/useDoctypeMeta.ts:47`; `frappe/ui/src/composables/useDoctypeMeta.ts:85`; `frappe/ui/src/components/ListView/useListView.ts:1`.

#### views-6 — Toast / Snackbar (kısa süreli işlem sonucu mesajları).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de somut toast primitive'leri var. Sunucu tarafında frappe/utils/messages.py içindeki toast(), msgprint(alert=True) çağrısı yapıyor. Mesaj message_log'a alert, indicator, title ve raise_exception alanlarıyla ekleniyor; realtime seçeneği publish_realtime ile gönderiyor. utils/response.py v1'de _server_messages alanını iç içe JSON string olarak, v2'de messages alanını yapılandırılmış liste olarak üretiyor. Desk istemcisinde request.js, alert/toast bayraklı mesajları diyalog açmadan yönlendiriyor. messages.js'deki frappe.show_alert, indicator'ı success/error/warning/info türüne eşliyor. components/toast.js'deki frappe.ui.toast şunları sağlıyor: error için role=alert, diğer türler için role=status, kapatma düğmesi, duration=0 ile kalıcı toast, hover/focus sırasında duraklatma ve aynı id ile yerinde güncelleme. Suite'in Vue önyüzü frappe-ui/sonner toast'unu kullanıyor; bu, seçilen React/AntD yığını değil. suite/headless_provider (LOCAL PILOT) hatalarını yalnız frappe.throw ile ValidationError veya PermissionError olarak üretiyor; bunlar standart message_log/exc_type yolunu izliyor.

Eksik: React/Ant Design (message/notification) tabanlı bir headless toast/snackbar katmanı kurulu kaynakta yok.; v2 messages ve v1 _server_messages ile indicator/alert/raise_exception/exc_type alanlarını bildirim düzeyine eşleyen bir headless sözleşme yok. headless_provider bir mesaj/bildirim zarfı tanımlamıyor.; Toast kapandıktan sonra hata ayrıntısını tutan kalıcı bir hata paneli/geçmişi yok. Desk toast'u dismiss sonrası DOM'dan siliniyor.; Merkezi token, hareket sözleşmesi, 14 CSS px alt sınırı ve React tarafında aria-live/role bağlaması yok. Desk'teki role=alert/status yalnız Desk'e özgü.; Ekran okuyucu duyurusu gibi çalışma zamanı davranışı kaynakla kanıtlanamaz; functionalAcceptance=not_run.

Sonraki somut adım: Sıra şöyle olmalı: (1) ui-family-06--contract kapsamında, kernel-envelope ve api-middleware sözleşmeleriyle uyumlu küçük bir eşleme tablosu tanımlanır. Tablo Frappe v2 messages[] öğelerini (alert, indicator, title, raise_exception) ve HTTP status+exc_type değerini success/info/warning/error ile toast/kalıcı panel hedefine bağlar. (2) Bu eşleme, frappe/tests/test_api.py'deki mevcut yanıt şekillerine dayanan bir RED fixture ile doğrulanır. (3) ui-family-06--implementation'da tek bir dar davranış uygulanır: React/AntD message/notification sarmalayıcısı merkezi token ve hareket kurallarıyla kullanılır, error için role=alert, diğerleri için role=status verilir ve error ayrıntısı toast kapandıktan sonra da kalıcı bir hata panelinde tutulur. Tarayıcı/ekran okuyucu kabulü ayrıca koşulur.

Önerilen bağımlılık/sıra: ui-family-06--contract; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-06--implementation`.

Kaynak kanıtı:

- `frappe/frappe/utils/messages.py:121` — `def toast(message: str, indicator: Literal["blue", "green", "orange", "red", "yellow"] | None = None):`
- `frappe/frappe/utils/response.py:218` — `response["messages"] = frappe.local.message_log`
- `frappe/frappe/public/js/frappe/request.js:508` — `return !(message.alert || message.toast);`
- `frappe/frappe/public/js/frappe/ui/components/toast.js:45` — `$el.attr("role", type === "error" ? "alert" : "status");`
- `frappe/frappe/public/js/frappe/ui/messages.js:430` — `frappe.show_alert = frappe.toast = function (message, seconds = 7, actions = {}) {`
- `suite/suite/headless_provider/api.py:405` — `frappe.throw(message, frappe.ValidationError)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (*.py); arama `_server_messages|server_messages`: response.py v1 üretimi, frappeclient.py tüketimi, test_api.py yanıt şekilleri ve suite/mail/suite_cloud istemci ayrıştırması bulundu.
- suite/; arama `toast|snackbar|aria-live|show_alert|message_log|exc_type (-i)`: 1054 eşleşme bulundu. Çoğu Vue frontend'deki frappe-ui toast kullanımı ve derlenmiş public/frontend asset'leri; React/AntD yok.
- suite/suite/headless_provider; arama `message|toast|exc_type|_server_messages|error (-i)`: Yalnız _invalid/_forbidden frappe.throw yardımcıları var; bildirim zarfı yok.
- frappe/frappe/public/js; arama `show_alert = |aria-live|role="alert"|role="status"`: messages.js:430 show_alert ve ui/components/alert.js role=alert bulundu; toast role ataması toast.js'de ayrıca okundu.
- frappe/frappe/public/js/frappe/request.js; arama `_server_messages|\.alert\b|show_alert`: v1/v2 mesajları ayrıştırılıyor; alert/toast olanlar diyalog açmadan msgprint'e gidiyor.
- suite/frontend/package.json; arama `ant-design|antd|@tanstack|notification`: Yalnız @tanstack/vue-virtual var; antd/React bağımlılığı yok.

Sınır: Yalnız sourceRoot altındaki frappe ve suite uygulama kaynakları okundu; komut veya test çalıştırılmadı.; Ekran okuyucu duyurusu, toast süresi ve tarayıcı davranışı çalışma zamanında doğrulanmadı; functionalAcceptance=not_run.; suiteCommit bilinmiyor. headless_provider yerel pilot ek kodudur, upstream değildir.; Derlenmiş suite/public/frontend asset'leri ve frappe-ui node_modules içeriği değerlendirilmedi.; ERPNext/HRMS kurulu değil; değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-029`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### views-7 — Filtreleme, sıralama, sayfalama, sütun seçimi ve kayıtlı görünümler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Filtre, sıralama, sayfalama, sayım ve alan/filtre doğrulaması kaynakta native olarak var. Kayıtlı görünüm için iki aday var, ikisi de istenen işi tam karşılamıyor: List View Settings doctype düzeyinde tek kayıt tutuyor, kişisel veya adlandırılmış görünüm değil. frappe/ui snapshot ise kaydetmeyi host'a bırakıyor. Kalıcılık yeri seçilmemiş.

Eksik: Kayıtlı görünümün nerede saklanacağı seçilmemiş: List View Settings, Report Builder raporu ya da kullanıcı ayarı. Tenant kapsamı da tanımsız.; URL filtre serileştirme şeması ve izinli operatör listesi yok.; Kayıtlı sütunlar sunucuda yeniden doğrulanmalı (permlevel filtresi var). Bunun UI'daki karşılığı yazılmamış.; Büyük tablolarda sayım maliyeti ve sayfa boyutu üst sınırı tanımsız.

Sonraki adım önerisi: ui-family-12 görevinde saklama yeri olarak native bir mekanizma seçilmeli ve tenant ile kullanıcı kapsamı karara bağlanmalı. URL filtre şeması tanımlanmalı. Yeni ORM/CRUD yazılmamalı. Sunucu doğrulaması tek yetki kaynağı kalmalı.

Mevcut birincil görev: `ui-family-12--implementation`. Kaynak: `frappe/frappe/client.py:33`; `frappe/frappe/api/v2.py:650`; `frappe/frappe/desk/reportview.py:181`; `frappe/frappe/desk/listview.py:18`; `frappe/ui/src/components/ListView/useListView.ts:55`.

#### views-8 — Yükleniyor, boş, hatalı, yetkisiz ve çevrimdışı ekran durumları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü yavaş ağ, 0 kayıt, 403, 500 ve bağlantı kesintisini ayrı ayrı istiyor. Backend'de PermissionError ve DoesNotExistError ayrımı var. Offline için yalnız Meet tanılama kodunda navigator.onLine kullanımı görünüyor; genel bir offline durum altyapısı yok. Tauri, PWA ve WXT için offline davranışı tanımsız.

Eksik: HTTP durum kodu ve exc_type'tan ekran durumuna eşleme tablosu yok. Silmenin 202 dönmesi gibi istisnalar da buna dahil.; PWA, Tauri ve WXT'de offline önbellek politikası ve mutasyon kuyruğu yapılıp yapılmayacağı kararı yok.; Yeniden deneme yalnız idempotent okumalarla mı sınırlı? Tanımsız.

Sonraki adım önerisi: ui-family-05 ve ui-family-06 görevlerine durum eşleme tablosu eklenmeli. İlk sürümde offline yalnız salt okuma olarak sınırlanmalı ve bu açıkça yazılmalı. Mutasyonlar için otomatik yeniden deneme yapılmamalı.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/frappe/desk/query_report.py:78`; `frappe/frappe/permissions.py:153`; `frappe/frappe/api/v1.py:73`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:75`.

#### shell-1 — Süper admin paneli.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: tenant seçimi ve müşteri rolünün reddedilmesi. Kaynakta rol ve izin primitifleri var: std_rights, has_permission, only_for("System Manager"). Ancak tenant kavramı yerelde tek site (suite.localhost) olarak görülüyor. İncelenen alıntılarda toplu kiracı yönetimi API'si veya tenant modeli yok.

Eksik: Tenant sınırı tanımsız: site başına tenant mı, aynı site içinde organizasyon mu? Toplu kiracı API'si bu karara bağlı.; Süper admin rolünün Keycloak realm/organization rolüne ve Frappe Role/System Manager'a eşlemesi yazılmamış.; Çoklu site gerektiren işlemler (site oluşturma/askıya alma) için kimin, hangi yetkiyle (Hüseyin Cengiz/DevOps) işlem yapacağı ve audit sözleşmesi yok.; api/v1 ve api/v2 arasında hangi yüzeyin kullanılacağı v17-dev için sabitlenmemiş.

Sonraki adım önerisi: page-super-admin--implementation içine tek bir karar notu ekleyin: tenant=site mi yoksa org mu, süper admin rol eşlemesi ve reddedilmesi gereken müşteri rolü. Ardından kabulü 'müşteri rolüyle aynı endpoint 403' senaryosuna bağlayın. Yeni bir görev kaydı açmayın.

Mevcut birincil görev: `page-super-admin--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/desk/page/setup_wizard/setup_wizard.py:112`; `frappe/frappe/api/v1.py:83`.

#### shell-2 — Müşteri yöneticisi ve son kullanıcı için ayrı yönetim yüzeyleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Sunucu tarafında yetki zorlaması doğal olarak mevcut: has_permission hook zinciri ve check_permission. Kabul ölçütü de UI gizleme ile API reddini doğru biçimde ayırıyor. Ancak rol→yüzey matrisi ve UI'nin etkin yetkileri hangi uç noktadan alacağı tanımlı değil. Suite'in kendi SPA'sı Vue tabanlı, bu nedenle React kabuğu olarak yeniden kullanılamaz.

Eksik: Müşteri yöneticisi ile son kullanıcı için rol/DocType/ptype matrisi yok.; Rol değişiminde oturumun ve önbelleğin (TanStack Query) yenilenme kuralı tanımsız.; Etkin yetkiyi okuyan uç nokta belirtilmemiş; get_valid_perms veya izin kontrolü üzerinden whitelisted bir okuma tanımlanmalı. ignore_permissions içeren bir yardımcı açılmamalı.; Suite Vue/frappe-ui kabuğunun React kabuğuyla ilişkisi (ayrı/yan yana) karara bağlanmamış.

Sonraki adım önerisi: page-tenant-admin--implementation için 2 rol × ana DocType ptype matrisi yazın. Kabule 'gizli işlem API çağrısı PermissionError' kontrolünü ekleyin. Paylaşılan bütçedeki 3 senaryodan biri bu ret senaryosu olabilir.

Mevcut birincil görev: `page-tenant-admin--implementation`. Kaynak: `frappe/frappe/permissions.py:496`; `frappe/frappe/permissions.py:512`; `suite/suite/hooks.py:44`.

#### shell-3 — Dashboard (özet gösterge paneli).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

İzin denetimli sayım (get_count) ve Dashboard Chart has_permission hook'u kaynakta mevcut. Workspace chart ve number card yapıları da var. Ancak bunlar Desk'e bağlı. Metrik sözleşmesi, 'gecikmiş veri' tanımı ve tenant kapsamı talimatta somut değil. Kapsam conditional olarak işaretli, fakat açılma tetikleyicisi ölçülebilir değil.

Eksik: Hangi metriklerin gösterileceği ve kaynakları (Dashboard Chart/Number Card ile özel aggregate arasındaki seçim) belirtilmemiş.; Gecikmiş veri için tazelik eşiği ve zaman damgası alanı yok.; Conditional kapsamı hangi ürün kararının açacağı belirsiz.; Ant Design X/Pro grafik bileşeni ve ui-view-chart bağımlılık sırası yazılmamış.

Sonraki adım önerisi: ui-family-29--implementation'a 3–5 metriklik bir liste ekleyin. Her metrik için kaynak (Dashboard Chart veya get_count), izin yolu ve tazelik eşiği belirtin. Kapsam açılmadan uygulamaya başlamayın.

Mevcut birincil görev: `ui-family-29--implementation`. Kaynak: `frappe/frappe/client.py:78`; `frappe/frappe/hooks.py:168`; `frappe/frappe/gettext/extractors/workspace.py:28`.

#### shell-4 — Profil, hesap ve ayarlar.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kimlik profilinin Keycloak'ta, ürün tercihlerinin backend'de tutulması ayrımı doğru. Frappe User izin hook'u ve Suite'in hesap API'si (get_workspace) mevcut. Keycloak entegrasyonu ise incelenen kaynakta görünmüyor. Alan sahipliği ve senkron yönü yazılmamış.

Eksik: Alan bazında sahiplik tablosu yok: e-posta, ad, dil, saat dilimi, avatar.; Keycloak→Frappe User provizyon/senkron yönü ve OIDC giriş yolu yerel kaynağa eşlenmemiş.; Ürün tercihinin saklanacağı yer (User alanı, Custom Field veya ayrı DocType) ve tenant kapsamı tanımsız.; Keycloak tarafından yönetilen alanların Frappe'de salt okunur olacağı kuralı yok.

Sonraki adım önerisi: page-profile--implementation'a 'alan → sahip (Keycloak/Frappe) → yazma yolu' tablosu ekleyin. Tercihler için native Custom Field kullanın, ORM/CRUD kopyalamayın. Keycloak OIDC eşlemesini ayrı bağımlılık olarak işaretleyin.

Mevcut birincil görev: `page-profile--implementation`. Kaynak: `frappe/frappe/hooks.py:167`; `suite/frontend/src/shell/useWorkspace.ts:25`.

#### shell-5 — Theme engine (tema motoru): yönetim paneli ve herkese açık sayfa temaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe'de yalnız Desk'e ait bir tema değiştirici ve Suite'te workspace logo/adı var. Bunlar headless bir tema motoru değil. Kabul ölçütü kontrast ve odak üzerine kurulu, ancak token şeması, tenant markası depolama yeri ve frontpage kapsamı tanımsız.

Eksik: Semantik token şeması ve Ant Design ConfigProvider token eşlemesi yazılmamış.; Tenant marka ayarının nerede saklanacağı (Single/DocType) ve kimin değiştirebileceği tanımsız.; Kabule eklenmesi gereken kalıcı kurallar eksik: çevreleyen odak halkası yasağı, 14 CSS px minimum metin boyutu, Outfit fontu, easeInOut hareket tokenları.; Yönetim paneli ile frontpage arasında ortak ve ayrı token sınırı yok.

Sonraki adım önerisi: ui-theme--implementation'a token şeması ve tenant marka depolama kararını ekleyin. Kabulü tüm kontrol durumlarına (hover/focus-visible/disabled/invalid) ve odak/kontrast kontrolüne bağlayın. Kapsam conditional olduğundan ürün kararı gelmeden başlamayın.

Mevcut birincil görev: `ui-theme--implementation`. Kaynak: `frappe/frappe/patches/v13_0/add_switch_theme_to_navbar_settings.py:18`; `suite/frontend/src/shell/useWorkspace.ts:12`.

#### shell-6 — Panel kısayolları, favoriler ve kişiselleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (kullanıcıya özel favori, yetkisi kalkan kısayolda sızıntı olmaması) var. Ancak talimat 'tercih API'si hazırlanır' diyerek yeni yapı öneriyor. Yerel v17 kaynağında ise Workspace Shortcut, for_user ile özel workspace, Custom Workspace delta'sı ve Suite'e özgü Drive Favourite ilkelleri zaten bulunuyor. Bunların yeniden kullanılıp kullanılmayacağı belirtilmemiş. Kapsam koşullu.

Eksik: Yeniden kullanım sınırı yok: Workspace Shortcut, for_user Workspace ve Custom Workspace mi kullanılacak, yoksa yeni tercih DocType'ı mı açılacak?; Kısayol/favori okunurken has_permission ile yeniden kontrol edilmesi gerektiği (yalnızca sakla-göster değil) sözleşmede yok.; Silinmiş veya yetkisi kalkmış kayıt için davranış (gizle, etiket maskele) tanımlı değil. Kaynakta yalnızca silinmiş öğenin atlandığı görülüyor.; v16 dokümanı ile v17-dev Sidebar/Custom Workspace modeli arasındaki sürüm eşlemesi yok.; Drive Favourite gibi uygulamaya özel favorilerin genel favorilerle ilişkisi belirsiz.

Sonraki adım önerisi: ui-family-02--implementation-post-mvp kapsamında kısa bir karar notu yazılmalı: kullanıcı favorisi için mevcut Workspace(for_user) veya Workspace Shortcut ilkesini yeniden kullan, her listelemede sunucu tarafında has_permission ile filtrele ve etiket sızıntısını kabul senaryosuna ekle. Kapsam açılmadan uygulama yapılmamalı.

Mevcut birincil görev: `ui-family-02--implementation-post-mvp`. Kaynak: `frappe/frappe/patches/v13_0/rename_desk_page_to_workspace.py:16`; `frappe/frappe/patches/v16_0/backfill_workspace_module.py:29`; `frappe/frappe/desk/page/workspace_restore/workspace_restore.py:16`; `frappe/frappe/hooks.py:488`; `suite/suite/hooks.py:378`.

#### shell-7 — Platform, kiracı ve kullanıcı ayarlarının ayrı kapsamları ve önceliği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: override kaldırılınca miras zincirine dönülmeli ve başka tenant'ın ayarı değişmemeli. Kaynakta site_config (frappe.conf) ve System Settings ayar katmanları görülüyor. Ancak 'tenant'ın site mi yoksa site içindeki bir kayıt mı olduğu tanımlanmamış. Bu tanım olmadan öncelik zinciri ve izolasyon sözleşmesi kurulamaz.

Eksik: Tenant = Frappe site mi, yoksa site içi kapsam mı? Karar yok. Bu karar izolasyon sınırını belirler.; Ayar anahtarı kataloğu yok: hangi anahtarın hangi katmanda (platform/common_site_config, site_config, System Settings, kullanıcı varsayılanı) override edilebileceği belirsiz.; Gizli bilgi taşıyan site_config değerlerinin istemciye boot üzerinden sızmaması için açık bir allowlist sözleşmesi yok.; Kullanıcı varsayılanları (defaults) kaynağı bu kesitte görülmedi; bilinmiyor.; Ayar yazma yetkisi (kim hangi katmanı değiştirebilir) tanımlı değil.

Sonraki adım önerisi: ui-family-33--implementation için önce 'tenant = site' (veya alternatif) kararı yazılmalı. Ardından anahtar başına katman ve izin tablosu çıkarılmalı ve frappe.conf / System Settings / kullanıcı varsayılanı çözümleme sırası belgelenmeli. İstemciye yalnızca allowlist'teki anahtarlar boot ile aktarılmalı.

Mevcut birincil görev: `ui-family-33--implementation`. Kaynak: `suite/suite/sheets/boot.py:19`; `frappe/frappe/api/v2.py:32`; `frappe/frappe/desk/page/setup_wizard/setup_wizard.py:146`.

#### shell-8 — Kiracı markası, logo, renkler ve alan adına göre görünüm.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü güvenlik odaklı ve doğru: hatalı host başka tenant'ın logosunu göstermemeli. Suite'te çalışma alanı adı ve logosu boot global'inden veya get_workspace API'sinden geliyor. Ancak bu Vue/frappe-ui istemcisi; seçilen React/Ant Design istemcisine doğrudan taşınamaz. Host→site eşlemesinin Bench/proxy katmanında mı, uygulamada mı doğrulanacağı belirsiz.

Eksik: Host doğrulama sözleşmesi yok: Bench'in site çözümlemesine mi, Keycloak realm/issuer eşlemesine mi dayanılacak?; Marka token şeması (logo, renk, semantik token eşlemesi) ve kaynağı (site ayarı mı, ayrı DocType mı) tanımlı değil.; Kimlik doğrulama öncesi (login) ile sonrası marka verisinin ayrımı ve önbellek anahtarının host'a bağlanması belirsiz.; suite.api.account.get_workspace bu kesitte görülmedi; yetki davranışı bilinmiyor.; Tenant renklerinin kontrast ve minimum metin boyutu kurallarına uyduğunu doğrulayan kabul ölçütü yok.

Sonraki adım önerisi: ui-theme--implementation açılırsa: host→site eşlemesini sunucu tarafında doğrulayan tek bir genel marka okuma ucu tanımlanmalı ve yalnızca allowlist'teki alanlar döndürülmeli. Marka değerleri shell-10 semantik tokenlarına eşlenmeli. Hatalı host senaryosu kabul listesine yazılmalı.

Mevcut birincil görev: `ui-theme--implementation`. Kaynak: `suite/frontend/src/shell/useWorkspace.ts:12`; `suite/frontend/src/shell/useWorkspace.ts:25`; `frappe/frappe/hooks.py:10`.

#### shell-9 — Menü kaydı, gezinme geçmişi ve merkezi komut/işlem arama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (yetkisiz komut görünmemeli; odak ve geri dönüş konumu korunmalı) var. Kaynakta Route History, Workspace Sidebar izin sorgusu, kullanıcının okuyabildiği DocType'ların listesi (get_doctypes_with_read) ve search_widget ilkelleri mevcut. Ancak menü ve komut kataloğunun şeması, yetki filtresinin sunucuda mı uygulanacağı ve GenUI/sorgu-eylem kayıtlarıyla sınırı tanımlanmamış.

Eksik: Komut kataloğu şeması yok: gezinme girdisi ile yürütülebilir eylem ayrımı, kimlik ve sürüm bilgisi tanımlanmamış.; Yetki filtresinin sunucuda zorunlu olduğu açıkça yazılmamış. İstemcide gizlemek yeterli değildir; eylem çağrısında ayrıca check_permission gerekir.; Route History'nin headless istemciden yazılıp yazılmayacağı ve saklama/gizlilik süresi belirsiz.; Bu kataloğun GenUI ve sunucu sorgu-eylem kayıtlarıyla birleştirilmeyeceği yazılmamış.; v17-dev Workspace Sidebar/Desktop Icon modeline sürüm eşlemesi yok.

Sonraki adım önerisi: ui-family-02--implementation içinde menü ve komut girdisinin minimal şeması tanımlanmalı. Kaynak olarak Workspace Sidebar, get_doctypes_with_read ve search_widget yeniden kullanılmalı; sonuçlar sunucuda kullanıcı izniyle filtrelenmeli. Eylem yürütme mevcut whitelist ve check_permission yolundan geçmeli. GenUI kaydından ayrı tutulduğu not edilmeli.

Mevcut birincil görev: `ui-family-02--implementation`. Kaynak: `frappe/frappe/hooks.py:483`; `frappe/frappe/hooks.py:153`; `frappe/frappe/permissions.py:508`; `frappe/frappe/client.py:11`; `frappe/frappe/api/v1.py:132`.

#### shell-10 — Ortak tasarım sistemi; semantik tokenlar, onaylı bileşen kataloğu ve erişilebilir etkileşim sözleşmeleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream-native somut ilkel yapılar var. Frappe Desk tarafında framework'ten bağımsız, düz CSS ile yazılmış bir "Espresso" semantik token katmanı bulunuyor: colors, typography, spacing, radius ve effects (surface/ink/outline/focus). Bu katman veri-öznitelikli `.es-button` gibi bileşen stillerine bağlanıyor. Suite'in Vue frontend'i tek token kaynağı olarak frappe-ui Tailwind preset'ini kullanıyor ve uygulamaları FrappeUIProvider ile sarıyor. frappe/ui (@framework/ui) içinde fieldtype→bileşen kayıt defteri (registerFieldType) var. Bunlar Vue/frappe-ui/Desk tasarım sistemidir. Ant Design/Pro/X'e bağlı bir token, tema veya bileşen kaynağı bulunmuyor. Yerel pilot suite/suite/headless_provider (api.py, local_fixture.py) yalnız oturum/CSRF bağlamı sağlıyor. UI kataloğu, tema veya token sözleşmesi sunmuyor. Runtime functionalAcceptance: not_run.

Eksik: Ant Design ThemeConfig/ConfigProvider ile Espresso/frappe-ui semantik tokenları arasında eşleme sözleşmesi ve headless React tarafının tek token kaynağı (kaynakta @ant-design/antd referansı yok).; Sürümlü, onaylı bileşen kataloğu ve ui-provider-registry sözleşmesi yok. Mevcut registry yalnız Vue fieldtype eşlemesi; sürüm alanı ve provider API'si içermiyor.; Odak tokenları çevreleyen halka olarak tanımlı (box-shadow 0 0 0 2px / outline 2px solid). Çevrelemeyen odak sözleşmesi yok.; Tipografi tokenları 14 CSS px altında (11/12/13px). Minimum metin boyutu sözleşmesi yok.; Merkezi motion tokenı (easeInOut Cubic, iki yönlü süre, reduced-motion) yok. Geçişler bileşenlere dağılmış durumda.; Markalı Select/dropdown, 320 px, zoom ve hata durumu kabulleri ile görsel/DOM/ARIA/hesaplanmış font kanıt türleri kaynakta sözleşme olarak tanımlı değil.

Sonraki somut adım: Mevcut bağımlılıklar korunarak sıra şöyle olmalı. (1) ui-family-01--contract: Espresso semantik token adlarını (surface/ink/outline/text/radius/spacing/focus) kaynak alan tek bir token dosyası ve Ant Design ThemeConfig eşleme tablosu yazılmalı. Bu tabloda 14px minimum, çevrelemeyen odak ve motion tokenları kural olarak yer almalı. (2) ui-family-01--implementation: headless React kabuğunda tek ConfigProvider teması kurulmalı. İlk dar davranış olarak bir Button ve markalı Select için RED/GREEN regresyon testi yazılmalı; test hesaplanmış font ≥14px'i, çevre halkası yokluğunu ve 320px görünümü kapsamalı. (3) ui-provider-registry--implementation: sürüm alanlı onaylı bileşen kataloğu tanımlanmalı. Frappe tarafı yalnız provider sözleşmesi sağlamalı; Suite'in Vue frontend'i ve GenUI bu katalogla birleştirilmemeli. (4) Destekleyici ui-family-07 ve ui-family-39 bu katalog/token sözleşmesine bağlanmalı.

Önerilen bağımlılık/sıra: ui-family-01--contract; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract; ui-family-01--implementation; ui-family-07--implementation; ui-family-39--implementation; ui-provider-registry--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-01--implementation`.

Kaynak kanıtı:

- `frappe/frappe/public/css/espresso/components/button.css:4` — ` * \`.es-button\` class + data-attributes, binding only to the semantic token`
- `frappe/frappe/public/css/espresso/effects.css:27` — `  --focus-default: 0px 0px 0px 2px #c9c9c9e5;`
- `frappe/frappe/public/css/espresso/components/button.css:207` — `    outline: var(--bt-focus);`
- `frappe/frappe/public/css/espresso/typography.css:16` — `  --text-sm: 13px;`
- `suite/frontend/tailwind.config.js:5` — `  // Single design-token source for the whole suite: the frappe-ui preset`
- `frappe/ui/src/components/Fields/fieldTypes.ts:27` — `/** Process-global fieldtype → component registry. */`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/, suite/ (tüm sourceRoot); arama `(?i)(design[-_ ]?token|ThemeConfig|ConfigProvider|antd|@ant-design|semantic[-_ ]token)`: 46 dosya eşleşti. Çoğu dist/assets sourcemap ve 'participant' gibi yanlış pozitif. Gerçek eşleşmeler Espresso CSS, suite frontend tailwind/index.css ve AGENTS.md dosyalarında.
- frappe/, suite/ (dist/assets hariç); arama `(@ant-design|\bantd\b|ThemeConfig|design[-_ ]?tokens?\b)`: Ant Design/ThemeConfig eşleşmesi yok. Yalnız frappe-ui/Espresso token yorumları bulundu (tailwind.config.js:5, index.css:2, sheets constants.js).
- suite/suite/headless_provider; arama `(?i)(catalog|registry|component|theme|token|ui_)`: Yalnız CSRF token ve fixture parola üretimi eşleşti. UI katalog/tema sözleşmesi yok.
- frappe/, suite/ (dist/assets hariç); arama `(?i)(component[-_ ]?(catalog|registry)|ui[-_ ]?(catalog|registry|provider)|catalogVersion|catalog_version)`: FrappeUIProvider kullanımları (Suite Vue layout'ları) ve frappe/ui fieldTypes.ts registry bulundu. Sürümlü katalog yok.
- frappe/frappe/public (dist hariç); arama `(--[a-z-]*(surface|ink|outline)[a-z0-9-]*\s*:|focus-visible|box-shadow:\s*var\(--focus)`: 37 dosyada 922 eşleşme. Merkez colors.css (834) ve effects.css; bileşen CSS'leri tokenları kullanıyor.
- frappe/frappe/public/css/espresso/{effects,typography}.css; arama `(focus|--font-size|--text-(xs|sm|2xs)|ring)`: Focus tokenları çevreleyen box-shadow/outline halkası olarak tanımlı. Metin tokenları 11/12/13px.
- frappe/, suite/ (dist/assets/node_modules hariç); arama `(cubic-bezier|--(duration|ease|motion)[a-z0-9-]*\s*:|prefers-reduced-motion)`: 36 dosyada 93 eşleşme, bileşenlere dağılmış. Merkezi motion token sözleşmesi görülmedi.

Sınır: Salt okuma kaynak analizi yapıldı; komut, test veya build çalıştırılmadı. functionalAcceptance: not_run.; Headless React/Ant Design frontend kaynağı bu snapshot'ta yok. Ant Design yokluğu yalnız frappe ve suite kökleri için geçerli bir YOK bulgusudur.; node_modules hariç tutulduğu için frappe-ui paketinin kendi token/odak/motion kaynağı okunmadı.; colors.css'in 834 tanımının tamamı ve tüm motion eşleşmeleri tek tek okunmadı. Değerlendirme temsili dosyalara dayanıyor.; suiteCommit bilinmiyor. headless_provider yerel pilot ek koddur, upstream-native değildir.; Kaynaktaki AGENTS.md/CLAUDE.md talimatları veri olarak ele alındı, uygulanmadı.

Temporal workflow: `saas-recheck-20261015t073528z-043`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-10 — Buluttaki Frappe için ortak istemci çekirdeği, tasarım sistemi ve platform adaptörleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: ortak çekirdek sözleşmesi, ortak test vektörü, platform izinlerinin ayrı doğrulanması ve yerel backend olmaması tanımlı. Kaynakta yalnız sunucu tarafı yapı taşları var: v1 REST kaynak rotaları, v2 meta uç noktası ve has_permission. Suite frontend'i Frappe'nin sunduğu bir Vue/frappe-ui SPA'sı. Seçilen React/Ant Design/TanStack çekirdeği için yeniden kullanılabilir bir istemci kaynağı değil.

Eksik: Çekirdek sözleşmesinin içeriği tanımsız: modül sınırları, API sürümü (v1 mi v2 mi), hata ve yetki modeli. Test vektörünün biçimi ve konumu da yok.; Çevrimdışı doğrulama sunucu doğrulamasının yerine geçmemeli. Bu yalnız örtük olarak söyleniyor; get_meta ile alınan metadata'nın sunumda kullanılacağı, yetki ve doğrulamanın Frappe'de kalacağı açıkça yazılmamış.; Kaynak listesinde hâlâ Capacitor var; güncel mobil karar Tauri 2. React/AntD/TanStack seçimi ve hedef sürümler not içinde geçmiyor.; Yerel Frappe 17.0.0-dev ile v2 API eşlemesi yapılmamış. v2 modülü iç uygulamasının değişebileceğini açıkça belirtiyor.

Sonraki adım önerisi: client-rule-parity--implementation görevine kısa bir sözleşme eki yaz. İçinde şunlar olsun: API sürümü ve uç nokta listesi (v1 resource veya v2 get_meta), sunum ile yetki/doğrulama ayrımı, test vektörü biçimi ve bunu kullanacak hedefler. Capacitor kaynağını Tauri 2 ile değiştir. ui-provider-* görevlerini bağımlılık olarak bırak; yeni görev kaydı açma.

Mevcut birincil görev: `client-rule-parity--implementation`. Kaynak: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/permissions.py:82`; `suite/suite/hooks.py:44`.

#### channels-11 — Web/SaaS için Vite üretim çıktısı ve Service Worker ile hazırlanan PWA.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: ağ yokken açılış, görünür önbellek hatası, Service Worker güncellemesinde bekleyen işlemin korunması, tenant/kullanıcı değişiminde izolasyon ve sahibin Hüseyin Cengiz olması tanımlı. Suite Slides'taki offlineCopy bir desen sunuyor: kontrol edilmeyen sayfayı reddetme, kalıcı depolama isteği ve kota hatası işleme. Ancak bu Vue'ya ve Slides'a özgü; headless PWA'nın kendisi değil. Ayrıca test dosyasının varlığı davranışın çalıştığını kanıtlamaz.

Eksik: PWA/Workbox aracı ve Vite eklentisi seçilmemiş, sürümleri de belirsiz.; Kimlik doğrulamalı Frappe API yanıtlarının Cache Storage veya IndexedDB'de nasıl tutulacağı tanımsız. Çıkış ve tenant değişiminde temizleme sözleşmesi yok.; Ayrı origin'deki frontend için Frappe CORS ve oturum/token modeli (cookie mi Keycloak bearer mı) bağlanmamış.; Depolama kotası ve silinme durumunda kullanıcıya gösterilecek davranış yazılmamış.

Sonraki adım önerisi: pwa-service-worker--implementation görevine üç madde ekle: araç ve sürüm seçimi, önbellek kapsamı (uygulama kabuğu ile izinli veri ayrımı) ve çıkış/tenant değişiminde temizleme. Suite offlineCopy desenini yalnız referans olarak not et; kopyalama.

Mevcut birincil görev: `pwa-service-worker--implementation`. Kaynak: `suite/frontend/src/apps/slides/stores/offlineCopy.js:175`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`; `suite/frontend/src/apps/slides/stores/offlineCopy.test.ts:217`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:2`.

#### channels-12 — Android/iOS için Capacitor ile gömülü arayüz ve ayrı imzalı AAB/APK/IPA paketleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Taranan frappe ve suite kaynağında Capacitor ya da Tauri ile Android/iOS'a gömülü arayüz yok. Yerel proje dosyaları (capacitor.config, tauri.conf.json, AndroidManifest.xml, Info.plist, gradle, xcodeproj, Podfile) ve imzalı AAB/APK/IPA üretim hattı da yok. 'capacitor|tauri' aramasının sonuçları yanlış pozitif: 'dataURI' gibi kelimelerin parçası olarak eşleştiler (utils.js, derlenmiş bundle'lar). 'android' sonuçları yalnızca yarn.lock'taki derleme aracı binary'leri. Maddeye bitişik ama madde olmayan üç parça var. (1) Frappe'nin kendi OAuth sağlayıcısı: token_endpoint_auth_method='None' olan public client için PKCE zorunlu ve redirect_uri yalnızca birebir kayıtlı değerle eşleşirse kabul ediliyor. Ancak bu Keycloak değil; Keycloak'a özgü bir mobil callback akışı yok. (2) Suite'in Vue arayüzü vite-plugin-pwa ve paylaşılan webmanifest ile kurulabilir bir PWA ve duyarlı mobil web arayüzü sunuyor. Bu yerel uygulama paketi değil, React/AntDesign headless istemcisi de değil. (3) suite/suite/headless_provider yerel pilot olarak eklenmiş bir metadata API'si (headless-metadata.v1). Çerez oturumuyla çalışıyor ve içinde mobil, native ya da OAuth sözleşmesi yok.

Eksik: Capacitor (yerine geçen Tauri 2 mobil) projesi ve web arayüzünü uygulamaya gömme yapılandırması yok; Android AAB/APK ve iOS IPA derleme, imzalama, güncelleme ve mağaza dağıtım hattı yok; Kamera, bildirim, dosya, güvenli anahtar saklama ve SQLite için yerel adaptörler yok; Uçak modunda soğuk açılış ve kalıcı yerel işlem desteği yok; Keycloak callback için RFC 8252 yöntemi (özel URI şeması, claimed https ya da loopback) ve Frappe tarafında bearer token doğrulama sınırı tanımlı değil; Headless provider'da mobil istemci için kimlik doğrulama ve oturum sözleşmesi yok; channels-17 ile çift sayımı önleyecek bir kapsam kuralı kaynakta yok; bu bir planlama verisi

Sonraki somut adım: Madde kimliği ve bağımlılıklar korunsun. Madde 'tarihsel/superseded → channels-17' olarak işaretlensin ve tauri-mobile-package--implementation görevinin birincil sahibi channels-17 olarak yazılsın. Capacitor kabul ölçütü uygulama hedefi olarak kullanılmasın. Uygulama channels-17 altında şu sırayla ilerlesin: (1) keycloak-login--contract: Tauri mobil için RFC 8252 callback yöntemi seçilsin (claimed https/özel şema ya da loopback, PKCE S256). Frappe'nin Keycloak bearer token'ı nasıl doğrulayacağı (issuer/audience) dar bir provider sözleşmesi olarak belgelensin. (2) ui-family-01 ve client-rule-parity sözleşmeleri tamamlandıktan sonra, yalnız Android için tek bir Tauri 2 mobil iskeleti kurulsun. Bu iskelet derlenmiş React/AntDesign arayüzünü gömsün ve tek bir okuma akışını göstersin. Bu adım için gerçek RED/GREEN kanıtı üretilsin. (3) İmzalama ve mağaza dağıtımı Hüseyin Cengiz'e ayrı bir devir olarak verilsin. Suite'in Vue PWA'sı mobil paket kanıtı sayılmasın.

Önerilen bağımlılık/sıra: tauri-mobile-package--contract; ui-family-01--contract; client-rule-parity--contract; keycloak-login--contract; channels-17. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tauri-mobile-package--implementation`.

Kaynak kanıtı:

- `frappe/frappe/oauth.py:33` — `return frappe.db.get_value("OAuth Client", client_id, "token_endpoint_auth_method") == "None"`
- `frappe/frappe/oauth.py:45` — `if redirect_uri in redirect_uris:`
- `suite/frontend/vite.config.ts:7` — `import { VitePWA } from 'vite-plugin-pwa'`
- `suite/frontend/src/router/index.ts:333` — `appendPwaTag('link', { rel: 'manifest', href: \`${assets}manifest.webmanifest\` })`
- `suite/suite/hooks.py:440` — `"/api/method/frappe.integrations.oauth2_logins.",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe ve suite tamamı); arama `(?i)capacitor|@capacitor|tauri`: 10 dosyada eşleşme var, hepsi yanlış pozitif: 'dataURI' gibi kelimelerin parçası (frappe utils.js:1141, suite lib-*.js 'taUri'), ayrıca .po ve .map dosyaları. Gerçek bir Capacitor veya Tauri kullanımı yok.
- source/; arama `**/{capacitor.config.*,AndroidManifest.xml,Info.plist,*.gradle,tauri.conf.json,*.xcodeproj,Podfile}`: Hiç dosya bulunamadı
- source/ (map/po/csv hariç); arama `(?i)\b(aab|apk|ipa)\b|deep[_ -]?link|custom[_ -]?scheme|redirect_uri.*(://|loopback|127\.0\.0\.1)|code_challenge|pkce`: Yalnızca Frappe OAuth/PKCE dosyaları ve alakasız UI/e2e eşleşmeleri çıktı; mobil paket ya da deep link uygulaması yok
- frappe/frappe (*.py, *.json); arama `(?i)code_challenge|pkce|redirect_uris|public client|token_endpoint_auth_method|client_type`: oauth.py'de public client için PKCE ve birebir redirect_uri doğrulaması uygulanmış. Bu Frappe'nin kendi OAuth sağlayıcısı, Keycloak değil.
- suite (public/frontend, dist, lock, map, po hariç); arama `(?i)deep[_ -]?link|\b(apk|aab|ipa)\b|mobile|android|\bios\b|capacitor|tauri|oauth|keycloak`: Vue tarafında mobil web bileşenleri, PWA (InstallPrompt, generate-pwa-assets) ve iOS standalone meta'ları var. Native paket ya da Keycloak eşleşmesi yok.
- suite/frontend; arama `(?i)beforeinstallprompt|standalone|manifest|serviceWorker|registerSW|vite-plugin-pwa`: VitePWA (injectManifest) ve paylaşılan webmanifest var; bu yalnızca bir PWA
- suite/suite/headless_provider; arama `(?i)mobile|native|oauth|redirect|pkce|capacitor|tauri`: 'native' sözcüğü yalnızca 'Frappe native permission/schema' anlamında geçiyor; mobil veya OAuth sözleşmesi yok

Sınır: Kaynak yalnızca kodun var olup olmadığını kanıtlar; functionalAcceptance=not_run. Cihaz, imzalama, mağaza ve çevrimdışı davranışı doğrulanmadı.; Kapsam yalnızca kurulu frappe ve suite uygulamaları. ERPNext/HRMS, harici Tauri/Capacitor depoları ve React/AntDesign istemci deposu taranmadı.; Derlenmiş bundle/.map ve lock dosyalarındaki eşleşmeler davranış kanıtı sayılmadı.; headless_provider yerel pilot olarak eklenmiş kod, upstream'e ait değil. Suite'in Vue PWA'sı seçilen React headless istemciden ayrı bir şey.; Capacitor tarihsel bir seçenek ve yerini Tauri 2 (channels-17) aldı. Bu bir geçiş önerisi değil.; Testler yalnızca okundu, çalıştırılmadı. suiteCommit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-044`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-13 — Windows/macOS/Linux için Tauri 2 ile gömülü arayüz ve imzalı masaüstü dağıtımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: kurulum ve kaldırma, Keycloak yönlendirmesi, dosya/izin sınırı, çevrimdışı yeniden başlatma, hedefe göre imza/notarizasyon kaydı, kuyruğu koruyan migration ve sahibin Hüseyin Cengiz olması. Kaynakta yalnız sunucu yapı taşları var: REST, izin kontrolü ve oauth2_logins yolu. Tauri paketlemesi Frappe dışında kalıyor. Notta 'seçilen mobil yol Capacitor' ifadesi eskimiş durumda.

Eksik: Hedef işletim sistemi, paket formatı ve imza matrisi seçilmemiş. Tauri SQL/Stronghold eklentilerinin sürümleri de belirsiz.; Masaüstü Keycloak akışı (loopback veya deep link, PKCE) ile Frappe'nin Keycloak token'ını nasıl kabul edeceği tanımsız. oauth2_logins bir sosyal giriş yolu; bearer doğrulama sözleşmesi yerine geçmez.; Çevrimdışı kuyruğun senkron çakışma kuralı ve toplu gönderim sınırı yazılmamış.; Nottaki eski Capacitor ifadesi temizlenmemiş.

Sonraki adım önerisi: tauri-desktop-package--implementation görevine şunları ekle: ilk hedef olarak tek bir işletim sistemi ve format, Keycloak→Frappe token doğrulama sınırına bir referans ve kuyruk senkronunda çakışma ile insert_many 200 sınırına uyum notu. Eski Capacitor cümlesini düzelt.

Mevcut birincil görev: `tauri-desktop-package--implementation`. Kaynak: `suite/suite/hooks.py:440`; `frappe/frappe/client.py:245`; `frappe/frappe/api/v1.py:50`.

#### channels-14 — Chrome eklentisi için WXT, Manifest V3 ve paket içi kod içeren ZIP dağıtımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü MV3 risklerini doğru tanımlıyor: paket içi kod, uzaktan kod yasağı, Service Worker yeniden başlayınca kuyruğun korunması, izin reddi, CSP ve ayrı mağaza kaydı. Sunucu tarafında RPC/REST ve izin kontrolü kaynakta mevcut. Ancak eklentinin hangi kullanıcı işini yapacağı ve Frappe ile nasıl entegre olacağı tanımsız.

Eksik: Eklentinin kullanım senaryosu ve ortak çekirdekten hangi parçaları kullanacağı belirtilmemiş.; host_permissions için Frappe bulut origin'i, CORS ayarı ve kimlik doğrulama yöntemi (ör. launchWebAuthFlow ile Keycloak) tanımsız.; Kalıcı kuyruk deposu (chrome.storage mı IndexedDB mi) ile minimum Chrome ve WXT sürümleri seçilmemiş.

Sonraki adım önerisi: wxt-extension--implementation görevine üç satır ekle: tek bir kullanım senaryosu, en az yetkili host/izin listesi ve kimlik doğrulama yöntemi, kalıcı kuyruk deposu seçimi. Yetkinin her zaman sunucuda doğrulanacağını yaz.

Mevcut birincil görev: `wxt-extension--implementation`. Kaynak: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/permissions.py:82`.

#### channels-15 — SQLite/IndexedDB adaptörleri; kalıcı yerel iş kaydı ve Transactional Outbox, kota ve anahtar yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütleri net: atomik kayıt+outbox, kota/izin hatası, yerel/bekleyen/sunucu kabulü ayrımı. Frappe tarafında REST insert/save ve izin kontrolü var. Suite Slides yalnız Cache API + localStorage defteriyle çevrimdışı kopya, persist() ve kota hatası örneği sunuyor. Bu örnek Vue/frappe-ui tabanlı ve transactional değil. SQLite/IndexedDB outbox kaynakta yok.

Eksik: Outbox kaydının Frappe uç noktasına eşlemesi tanımlı değil: v1 /api/resource mı, v2 mi, yoksa whitelisted method mu?; Sunucuda idempotency anahtarı veya tekrar gönderimde çift kayıt önleme sözleşmesi yok. Excerptteki insert ve insert_many bunu göstermiyor.; Çakışma ve sürüm sözleşmesi (modified/for_update) ile toplu gönderimdeki 200 kayıt sınırı outbox talimatlarına işlenmemiş.; Şifreleme ve anahtar adaptörü seçilmemiş. Tauri SQL ve IndexedDB için ortak arayüz/şema sürümü ve göç kuralı yok.; Tenant/kullanıcı bölümlemesinin yerel şema anahtarı tanımlanmamış.

Sonraki adım önerisi: client-local-outbox--implementation altına kısa bir sözleşme notu eklenmeli: outbox kayıt şeması, idempotency anahtarı, hedef Frappe v17 uç noktası, çakışma davranışı ve tenant anahtarı. Sunucu tarafında idempotency için yeni ORM yazılmamalı; mevcut whitelisted method ve DocType izinleri üstünde ince bir kontrol kararı alınmalı.

Mevcut birincil görev: `client-local-outbox--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/client.py:246`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:26`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`; `suite/frontend/src/apps/slides/stores/offlineCopy.test.ts:217`.

#### channels-16 — İlk çevrimiçi hazırlıktan sonra gerçek çevrimdışı soğuk açılış; gerekli veri, dosya ve sınırlı yerel yetki.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Çevrimiçi hazırlık, ağsız yeniden açılış, süreli yerel yetki ve tenant izolasyonu kabulde tanımlı. Kaynakta Slides için shell/API ısıtma ve Service Worker kontrol kontrolü var. Ayrıca sunucu izin primitifleri (has_permission, get_meta, alan düzeyi okuma) mevcut. Ancak genel bir çalışma alanı hazırlığı ve yerel yetki anlık görüntüsü yok.

Eksik: Yerel yetki anlık görüntüsünün içeriği belirsiz: hangi Frappe izin/meta çıktısı, hangi alan düzeyi kısıt saklanacak? Süre ve iptal kuralı da yok.; Keycloak çevrimdışı token/oturum stratejisi ve Tauri tarafında güvenli saklama (keychain/Stronghold) kararı yok.; Yeniden bağlanınca yetkinin yeniden doğrulanma sırası tanımsız: önce yetki mi, sonra outbox gönderimi mi? Yetki kaybolursa bekleyen kayıtlar ne olacak?; Hazırlanacak veri ve dosya kapsamı ile boyut bütçesi belirlenmemiş.

Sonraki adım önerisi: client-offline-boot--implementation için hazırlık manifesti tanımla: seçili DocType listeleri/dosyalar, R-01 üzerinden üretilen kapsamı ve geçerlilik süresi belirlenmiş izinli metadata projection’ı, yerel süre sınırı, tenant anahtarı ve yeniden doğrulama sırası. Suite offlineCopy yalnız desen referansıdır; ham get_meta izin özeti değildir.

Mevcut birincil görev: `client-offline-boot--implementation`. Kaynak: `suite/frontend/src/apps/slides/stores/offlineCopy.js:180`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:177`; `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v1.py:84`; `suite/suite/hooks.py:417`.

#### channels-17 — Tauri 2 ile Android/iOS ve masaüstü için ortak React, Ant Design ve Ant Design X arayüzünü paketleme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

İki kurulu app kökünde (frappe, suite) Tauri 2 paketlemesi yok. src-tauri, tauri.conf.json, Cargo.toml, AndroidManifest.xml, Info.plist, xcodeproj ve capacitor.config bulunamadı. Hiçbir package.json'da @tauri-apps, react, antd veya @ant-design bağımlılığı yok. Paketlenecek ortak React/AntD/Ant Design X istemcisi de snapshot'ta yok. 'tauri/cordova/electron' eşleşmeleri yalnız minified vendor bundle'larda, sourcemap'lerde, lisans/CoC metinlerinde ve 'dataURI' alt dizgisinde çıktı; hiçbiri davranış kanıtı değil. Suite'in upstream kaynağı Vue 3 + frappe-ui SPA'sıdır. Production'da base '/assets/suite/frontend/' olur, Jinja suite.html Frappe tarafından servis edilir. vite-plugin-pwa yalnız FCM service worker'ı içindir ve precache kapalıdır. Bu, kabulde reddedilen uzak site modelidir; gömülü frontendDist ile offline açılış sağlamaz. Paketleme değil ama ileride entegrasyon noktası olabilecek Frappe primitifleri şunlar: site config ile verilen allow_cors origin allowlist'i (set_cors_headers), OAuth Client redirect_uris tam eşleşme kontrolü ve Social Login Key içindeki Keycloak sağlayıcısı. Keycloak akışı sunucu tarafında /api/method yönlendirmesidir; native/custom-scheme PKCE akışı değildir. suite/headless_provider/api.py (yerel pilot, upstream değil) yalnız cookie-session tabanlı headless-metadata.v1 şema RPC'sidir; paketleme, origin veya mobil kimlik doğrulama içermez.

Eksik: Tauri 2 projesi yok: src-tauri, tauri.conf.json, frontendDist ve build.devUrl ayarları ile Android/iOS/masaüstü hedefleri.; Paketlenecek ortak React + Ant Design/Pro/X + Vite istemci kaynağı ve build çıktısı snapshot'ta yok.; Gömülü origin'in (tauri://localhost, http://tauri.localhost) Frappe allow_cors listesindeki yeri ve cookie/CSRF ya da token sözleşmesi tanımlı değil.; Keycloak için native/custom-scheme ya da loopback PKCE redirect URI sözleşmesi yok. Mevcut Keycloak social login yalnız sunucu yönlendirmesidir.; Offline ilk açılış, imza ve mağaza paketleri ile WebView minimum sürüm sabitlemesi yok.; Tauri CLI, Android/iOS SDK ve WebView sürüm sabitlemesi yok.

Sonraki somut adım: Mevcut tauri-mobile-package--implementation görevi için sıra: (1) Bağımlı contract görevleri kapanmalı: tauri-mobile-package--contract (Tauri CLI, Android/iOS SDK, WebView minimum sürümleri, gömülü origin listesi), ui-family-01--contract (ortak React/AntD istemcisinin repo yolu ve Vite dist yolu), keycloak-login--contract (Tauri için PKCE redirect URI'leri). (2) Ortak React istemci reposunda en küçük adım: frontendDist'i Vite dist'e bağlayan bir src-tauri iskeleti kurulmalı. İlk kabul, tek masaüstü hedefinde gömülü varlıklarla ağsız açılış olmalı; RED/GREEN kanıtı istemci reposunda tutulmalı. (3) Frappe tarafında kod yazılmamalı. Hüseyin Cengiz'e teknik devir: site config allow_cors'a gömülü origin'in eklenmesi ve Keycloak client redirect URI'lerinin kaydı. Kabul ölçütü, gömülü origin'den gelen preflight'ın Access-Control-Allow-Origin ile dönmesidir. (4) Ardından Android ve iOS hedefleri. İmza ve mağaza hesaplarının sahibi tam adla yazılmalı. Suite Vue SPA'sı paketleme hedefi değildir, uzak site örneği olarak kalmalıdır.

Önerilen bağımlılık/sıra: tauri-mobile-package--contract; ui-family-01--contract; client-rule-parity--contract; keycloak-login--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tauri-mobile-package--implementation`.

Kaynak kanıtı:

- `suite/frontend/vite.config.ts:84` — `base: mode === 'production' ? '/assets/suite/frontend/' : '/',`
- `suite/frontend/vite.config.ts:100` — `indexHtmlPath: '../suite/www/suite.html',`
- `suite/frontend/package.json:88` — `"vue": "^3.5.38",`
- `frappe/frappe/app.py:296` — `allowed_origins = frappe.conf.allow_cors`
- `frappe/frappe/oauth.py:219` — `return redirect_uri in redirect_uris`
- `frappe/frappe/integrations/doctype/social_login_key/social_login_key.py:234` — `providers["Keycloak"] = {`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite tam kök); arama `(?i)tauri|capacitor|frontendDist|cordova|electron`: Kaynak/config dosyasında eşleşme yok. Eşleşmeler yalnız .map/.lock/.po dosyalarında, suite/suite/public/frontend/assets altındaki minified vendor bundle'larda, license.txt, CODE_OF_CONDUCT.md ve playwright yorumunda; utils.js'teki 'taURI' ise 'dataURI' alt dizgisi.
- source (frappe + suite); arama `glob **/{src-tauri,tauri.conf.json,Cargo.toml,capacitor.config.*,AndroidManifest.xml,Info.plist,*.xcodeproj}`: Hiç dosya bulunamadı.
- source/**/package.json; arama `"(react|antd|@ant-design/[a-z-]+|@tauri-apps/[a-z-]+|vite-plugin-pwa|vue)"\s*:`: Yalnız vue (frappe, frappe/ui, suite, suite/frontend) ve suite/frontend'de vite-plugin-pwa var. react, antd, @ant-design ve @tauri-apps yok.
- suite/frontend; arama `(?i)(android|ios|apk|aab|ipa|webview|deep.?link|custom.?scheme|app_bundle|native.?shell)`: 157 dosya eşleşti, ancak bunlar 'participants'/'iOS PWA splash' gibi alakasız alt dizgiler ya da PWA/klavye inset kodu. Native paketleme kodu yok.
- frappe/frappe (*.py); arama `allow_cors|Access-Control-Allow-Origin|redirect_uris`: app.py set_cors_headers'da site config ile origin allowlist'i, oauth.py'de OAuth Client redirect_uris tam eşleşme kontrolü var. Bunlar genel backend primitifleri, paketleme değil.
- source (frappe + suite); arama `(?i)keycloak`: Yalnız frappe social_login_key (json/py), oauth2_logins.py ve main.pot. Akış sunucu tarafında /api/method redirect'idir; native/custom-scheme PKCE yok. Suite'te eşleşme yok.
- suite (headless_provider); arama `(?i)headless_provider`: Yalnız suite/suite/headless_provider/api.py (yerel pilot). Okundu: cookie-session tabanlı şema metadata/düzenleme RPC'si; paketleme ve origin içermiyor.

Sınır: Kapsam yalnız sourceRoot altındaki kurulu frappe ve suite app kaynağıdır. Harici React istemci reposu, Tauri araç zinciri ve mağaza/imza hesapları bu snapshot'ta değil; bu YOK küresel ekosistem yokluğu anlamına gelmez.; Komut, build ve test çalıştırılmadı; functionalAcceptance: not_run. Cihaz/WebView davranışı ve offline açılış kaynaktan kanıtlanamaz.; Site config (allow_cors değeri) ve Keycloak/OAuth Client kayıtları snapshot'ta yok; yalnız kod yolu okundu, gerçek ayarlar bilinmiyor.; Minified bundle ve sourcemap eşleşmeleri yalnız vendor alt dizgisi olarak değerlendirildi, satır satır incelenmedi.; suite/headless_provider yerel pilot ek koddur, upstream-native değildir. Suite commit'i bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-045`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-18 — Tauri mobil cihaz iş akışları: belge fotoğrafı, barkod, güvenli dosya erişimi ve bildirimden yetkili kayda geçiş.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam koşullu. İzin kabul/red/iptal, tenant ve deep link reddi kabulde var. Sunucuda dosya yükleme uç noktası ve belge okuma izin kontrolü mevcut, ancak cihaz yakalama, barkod ve push bildirim kaynakta yok. MVP'de hangi yeteneğin açılacağı seçilmemiş.

Eksik: MVP'ye giren yetenek alt kümesi seçilmemiş: kamera, barkod, dosya, bildirim.; Çevrimdışı eklenen dosyanın outbox üzerinden Frappe File/upload_file ile hedef belgeye bağlanma sırası ve boyut/tip sınırı tanımsız.; Deep link yolu ile Frappe belge izin kontrolü (read_doc/check_permission) arasındaki eşleme ve tenant doğrulaması tanımsız.; Push sağlayıcı (FCM/APNs) ve Frappe tarafındaki tetikleme kaynağı seçilmemiş. Frappe bunu hazır sağlamıyor.

Sonraki adım önerisi: tauri-device-capability--implementation için MVP yetenek listesi ve Tauri capability izin dosyası kapsamı belirlenmeli. Ek dosya akışı channels-15 outbox sözleşmesine bağlanmalı. Deep link açılışı her zaman sunucu izin kontrolünden geçmeli.

Mevcut birincil görev: `tauri-device-capability--implementation`. Kaynak: `suite/suite/hooks.py:423`; `frappe/frappe/api/v2.py:22`; `frappe/frappe/api/v1.py:83`.

#### channels-19 — Mobil yaşam döngüsü: sistem geri hareketi, klavye, safe area, arka plan dönüşü ve işletim sistemi sonlandırması.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Bulunanlar yalnız web/PWA tarayıcı primitifleri. Bunlar upstream-native olup hedef React/Tauri istemcisinde değil; Suite'in Vue frontend'inde ve Frappe Desk JS'inde yer alıyor. (1) Sanal klavye: Suite'teki useKeyboardInsets, visualViewport resize/scroll olaylarıyla görünür yüksekliği ve offsetTop değerini izliyor. Frappe Desk bottom_sheet.js, klavyenin örttüğü yüksekliği --es-sheet-keyboard değişkenine yazıyor ve pinch-zoom durumunu ayırıyor. (2) Safe area: Suite'in mobil bileşenlerinde ve Frappe Desk SCSS/espresso CSS'inde env(safe-area-inset-*) paddingleri var; bunlar semantik token değil, bileşenlere gömülü. (3) Geri hareketi: Slides PresentationEditor popstate olayında açık dialogları kapatıyor, onBeforeRouteLeave ise kirli durumda onay istiyor. Calendar'da görünüm URL'de tutuluyor, böylece Back navigasyonu geri izliyor. (4) Arka plan ve kapanma: Slides, pagehide anında kirli değişikliği saveDraft ile en iyi çabayla IndexedDB'deki slides-db deposuna yazıyor ve beforeunload uyarısı veriyor. Writer IndexedDB/y-indexeddb kullanıyor; Meet/Slideshow visibilitychange dinliyor. Mail'deki Outbox sunucu taraflı bir JMAP EmailSubmission listesi, istemci offline outbox'ı değil. Yerel pilot suite/headless_provider (api.py, local_fixture.py) içinde ilgili sözleşme yok.

Eksik: Tauri 2 mobil entegrasyonu iki app kökünde de yok: Android sistem geri hareketi, uygulama pause/resume ve süreç sonlandırması sonrası geri yükleme.; React + TanStack Router için geri yığını sözleşmesi yok: Back'in önce açık panel/dialog/sheet katmanını, ardından taslak çıkışını ele alması tanımlı değil. Suite'teki desen Vue Router'a özgü ve doğrudan aktarılamaz.; Yerel taslak ile istemci outbox kaydı arasındaki sınır tanımlı değil; OS sonlandırması sonrasında outbox'ın korunup yeniden açılışta bulunması kodlanmamış. Slides pagehide kaydı uygulamaya özgü ve en iyi çaba düzeyinde; channels-15 ile bağı yok.; Safe area ve klavye inset değerleri merkezi semantik token değil; hedef OS/WebView sürümleri ve izin reddi ile çağrı kesintisi davranışları kaynakta yok.; Headless provider (suite/headless_provider) mobil yaşam döngüsü, taslak veya outbox kabul/idempotency sözleşmesi sunmuyor.; Gerçek cihaz ve 320–390 px kabulü çalıştırılmadı (functionalAcceptance=not_run).

Sonraki somut adım: tauri-mobile-lifecycle--contract kapsamında en küçük adım sırası: (1) Tek sayfalık bir yaşam döngüsü kuralı yaz: URL/TanStack Router durumu tek kaynak olsun; Back önce en üstteki açık katmanı kapatsın, sonra kirli taslakta onay istesin. Calendar'daki URL ve Slides'taki popstate→hideOpenDialogs desenlerini davranış referansı olarak kullan, kodu taşıma. (2) Taslağı her alan değişiminde ve pagehide/visibilitychange=hidden anında yerel depoya yazma kuralını, Slides saveDraft/IndexedDB desenine dayanarak tanımla; outbox kaydı yalnız açık 'kaydet' eylemiyle oluşsun ve channels-15'e bağlansın. (3) Klavye için visualViewport tabanlı tek bir inset hook'u ve safe-area semantik tokenları tanımla (useKeyboardInsets ve bottom_sheet referans). (4) Tauri 2 Android geri olayını router geri yığınına bağlayan tek dar davranış için RED/GREEN testi yaz. Gerçek cihaz kabulü sürüm öncesi kapsamda not_run olarak kalsın. Mevcut bağımlılıklar korunur.

Önerilen bağımlılık/sıra: tauri-mobile-lifecycle--contract; ui-family-01--contract; client-rule-parity--contract; keycloak-login--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `tauri-mobile-lifecycle--implementation`.

Kaynak kanıtı:

- `suite/frontend/src/composables/useKeyboardInsets.ts:34` — `window.visualViewport?.addEventListener('resize', update)`
- `frappe/frappe/public/js/frappe/ui/components/bottom_sheet.js:527` — `// an on-screen keyboard shrinks the visual viewport; the sheet sits above it`
- `suite/frontend/src/components/AdaptiveDropdown.vue:12` — `<div class="px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">`
- `suite/frontend/src/apps/slides/pages/PresentationEditor.vue:451` — `window.addEventListener('popstate', hideOpenDialogs)`
- `suite/frontend/src/apps/slides/pages/PresentationEditor.vue:267` — `if (dirty.value) saveDraft()`
- `suite/frontend/src/apps/calendar/utils/mobileView.ts:27` — `for which view is up — switching is a navigation, so Back retraces it — which`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite/; arama `popstate|safe-area-inset|visualViewport|visibilitychange|pagehide|beforeunload|backbutton|onBackPressed`: Vue frontend'de useKeyboardInsets, çok sayıda safe-area paddingi, Slides'ta pagehide/beforeunload/popstate, Meet/Slideshow'da visibilitychange bulundu. backbutton/onBackPressed yok.
- frappe/; arama `popstate|safe-area-inset|visualViewport|visibilitychange|pagehide|backbutton|onBackPressed (min.js hariç)`: router.js:18'de popstate, bottom_sheet.js'te visualViewport ile klavye hesabı, SCSS/espresso'da safe-area, setup_wizard'da pagehide bulundu. Native geri olayı yok.
- suite/ (public/frontend build hariç); arama `(?i)tauri|capacitor|@tauri-apps|outbox|draft.*(localStorage|indexedDB)|indexedDB`: Tauri/Capacitor yok. Writer ve Slides'ta IndexedDB taslak/yerel kayıt var. Outbox, Mail'deki sunucu taraflı JMAP EmailSubmission listesi.
- suite/frontend/src/apps/slides; arama `handlePageHide|const saveDraft|DRAFTS_DB_NAME =|handleBeforeUnload =`: pagehide→saveDraft→writeSnapshot zinciri ve slides-db IndexedDB adı doğrulandı.
- suite/suite/headless_provider; arama `(?i)popstate|history\.(back|pushState)|mobile|lifecycle|safe.?area|keyboard|tauri|offline|outbox|draft`: Eşleşme yok.
- frappe/frappe/public/js/frappe/ui/components/bottom_sheet.js; arama `history|popstate|hashchange`: Eşleşme yok: Desk bottom sheet'i tarayıcı/sistem geri hareketine bağlı değil; yalnız Escape, scrim ve sürükleme ile kapanıyor.

Sınır: Yalnız sourceRoot altındaki frappe ve suite kökleri okundu; ERPNext/HRMS kurulu değil ve değerlendirilmedi.; Bulunan primitifler Suite Vue/Frappe Desk tarayıcı kodu; hedef React/AntDesign/TanStack/Tauri istemcisinde karşılıkları yok ve doğrudan taşınamaz.; Kaynak yalnız kodun varlığını gösterir; gerçek cihaz, WebView sürümü, OS sonlandırması ve 320–390 px davranışı çalıştırılmadı (functionalAcceptance=not_run).; Testler okunmadı ve çalıştırılmadı; derlenmiş public/frontend ve dist bundle'ları kanıt sayılmadı.; suiteCommit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-046`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-1 — SaaS (Software as a Service — hizmet olarak yazılım) web uygulaması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (ilk ziyaret, giriş, tenant seçimi, yetkili kayıt) somut. Frappe v17-dev kaynağında /api/resource CRUD, doc.check_permission ve CSRF enjeksiyonu var. Ancak React/TanStack web kabuğu kaynakta yok; Suite SPA ise Vue tabanlı. Bu nedenle yalnız backend primitifleri mevcut.

Eksik: API sürüm eşlemesi yok: v1 url_rules görülüyor, v2 rotaları görülen kesitte yok ve v2 iç uygulamanın değişebileceğini belirtiyor.; Keycloak → Frappe oturum bağlama sözleşmesi tanımlı değil: OAuth2/OIDC token mı, sid çerezi mi, CSRF mi kullanılacağı belirsiz.; 'Tenant' kavramının Frappe karşılığı tanımlı değil: site mi, User Permission mı, organizasyon mu?; Headless SPA'nın Frappe'de nasıl servis edileceği belirsiz: Suite'teki website_route_rules deseni mi, ayrı origin/CORS mu?

Sonraki adım önerisi: web-build--implementation görevine şu kararları ekleyin: v1/v2 API sürümünü sabitleyin, Keycloak oturum taşıma ve CSRF yöntemini seçin, tenant'ın Frappe'deki karşılığını belirleyin. Kabul ölçütünü bu sözleşmeye bağlayın.

Mevcut birincil görev: `web-build--implementation`. Kaynak: `frappe/frappe/api/v1.py:154`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/website/page_renderers/base_template_page.py:22`; `suite/suite/hooks.py:44`.

#### channels-2 — Mobile app (mobil uygulama), browser extension (tarayıcı eklentisi) ve desktop app (masaüstü uygulaması).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam 2026-10-11 kararıyla zorunlu hale geldi ve kabul ölçütü kanal bazında kurulum/güncelleme, login callback ve izin modelini istiyor. Ancak atıf yapılan O0–O3 planı pakette yok. Kaynakta bulunanlar: OAuth2 token/openid uçları, token tabanlı soket bağlantısı ve Suite'in service worker ile çevrimdışı kopya deseni. Tauri2 ve WXT/MV3 paketleri kaynakta yok.

Eksik: O0–O3 kanal planının içeriği ve görev eşlemesi sağlanmamış.; Her kanal için redirect URI, PKCE ve deep-link callback sözleşmesi yok.; Çevrimdışı veri, çakışma ve senkronizasyon sözleşmesi yok; Suite offlineCopy Vue'ya özgü ve salt medya önbelleği.; MV3 service worker yaşam döngüsü ve eklenti izin (host_permissions) sınırları tanımlı değil.

Sonraki adım önerisi: client-channel-continuity--implementation görevine O0–O3 planını bağlayın. Kanal başına tek tablo hazırlayın: callback türü, token saklama yeri, güncelleme kanalı ve çevrimdışı kapsamı. İlk adımda yalnız web dışı login callback sözleşmesini yazın.

Mevcut birincil görev: `client-channel-continuity--implementation`. Kaynak: `suite/suite/hooks.py:417`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:68`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:175`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`.

#### channels-3 — Kanal bazlı oturum, cihaz izinleri ve istemci sürüm uyumluluğu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (destek dışı sürümün açıklanması, kanal bazlı token kapsamı ve logout) anlamlı. Ancak kapsam hâlâ 'conditional'; bu, channels-2'nin zorunlu kararıyla çelişiyor. Kaynakta logout uç noktası, token yenileme (updateAuth) ve Suite'in frappe >=16,<18 bağımlılık aralığı var. İstemci sürüm uyum mekanizması görülmedi.

Eksik: Kapsam kararı channels-2 ile tutarsız; web dışı kanallar artık seçili olduğundan 'required' olmalı.; Minimum istemci sürümü bildirimi (header/uç nokta) ve reddetme davranışı tanımlı değil.; Logout semantiği belirsiz: Frappe oturumu mu, Keycloak SSO oturumu mu, refresh token iptali mi?; Cihaz izinleri (kamera, bildirim, dosya) için kanal bazında izin envanteri yok.

Sonraki adım önerisi: Kapsamı 'required' olarak güncelleyin; tarihsel kararı koruyun. auth-channel-bridge--implementation görevine şu sözleşmeyi ekleyin: Keycloak client/scope eşlemesi, logout zinciri ve sürüm uyumsuzluğu yanıtı. Uyumu Frappe 17.0.0-dev ve v1/v2 API seçimine sabitleyin.

Mevcut birincil görev: `auth-channel-bridge--implementation`. Kaynak: `suite/suite/hooks.py:422`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:166`; `suite/pyproject.toml:45`; `frappe/frappe/api/v2.py:8`.

#### channels-4 — 320 pikselden başlayan uyarlanabilir ekranlar ve büyütmede yeniden akış.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kaynakta somut duyarlı yerleşim parçaları var, ancak hiçbiri seçilen React/Ant Design yüzeyine ait değil.
(1) Suite'in upstream Vue ön yüzü, sayfa yüklenirken 640px eşiğine göre ayrı mobil veya masaüstü bileşen ağacı seçiyor (useScreenSize.ts). Bu seçim bilerek pencere boyut değişimini izlemiyor. Boyutlandırmayı Tailwind max-sm: sınıfları canlı izliyor. isMobile/viewport/matchMedia kullanımı 127 dosyada bulundu (mail, takvim, drive, meet).
(2) Frappe Desk SCSS'inde 38 dosyada 176 @media kuralı var: mobile.scss'te max-width 991px kuralı, utils.js is_xs() içinde 768px eşiği ve liste görünümünde .result-container için kapsayıcı içi overflow-x: auto.
(3) Yerel pilot suite/headless_provider/api.py yalnızca metadata, alan ekleme, düzenleme önizlemesi ve uygulama sözleşmesi sağlıyor. Buradaki "layout" alan sırası parmak izinden ibaret; duyarlı yerleşim veya yeniden akış sözleşmesi değil.
Backend'in UI yeniden akışı sağlamadığı tespiti doğrulandı.

Eksik: Seçilen React + Ant Design/Pro + TanStack paneli kaynakta yok. suite/frontend/package.json yalnızca @tanstack/vue-virtual içeriyor; antd ve react yok.; Desk (frappe/www/desk.html) ve Suite (frontend/index.html, suite/www/suite.html) viewport tanımında user-scalable=no var; Desk'te ayrıca maximum-scale=1.0 var. Bu, kaynak düzeyinde zoom ve %400 yeniden akış kabulüne karşı bir sinyal.; 320/360/375/390 px ve yatay telefon için açık breakpoint veya kabul tanımı yok. Mevcut eşikler 640, 768 ve 991 px.; Suite'in mobil/masaüstü ağaç seçimi yeniden boyutlandırma ve yön değişiminde güncellenmiyor; yatay telefon ve bölünmüş ekran uyarlaması yok.; 14 CSS px minimum metin, tablo kapsayıcısı içinde kaydırma ve çevreleyen odak halkası yasağı için hedef panelde kaynak kapısı (gate) yok.; Headless provider sözleşmesinde istemciye yerleşim, yoğunluk veya ana yolculuk ipucu yok.; Runtime functionalAcceptance not_run; cihaz/tarayıcı doğrulaması kaynakla kanıtlanamaz.

Sonraki somut adım: Mevcut bağımlılıklar korunarak (ui-family-01--contract → ui-family-01--implementation → ui-family-01--implementation-mvp) ilerlenmeli:

1. React/Ant Design panelinde tek bir ana yolculuk tanımlanır: headless_provider.metadata ile liste → kayıt formu.
2. Önce bu yolculuk için 320 px ve %400 zoom'da başarısız (RED) bir Playwright testi yazılır. Test şunları kontrol eder: sayfa genelinde yatay taşma olmaması, tablonun kendi kapsayıcısında kaydırılması, hesaplanan metnin 14 px'ten küçük olmaması ve klavye odağının çevreleyen halka olmadan görünmesi.
3. Panelin index.html dosyasında user-scalable=no ve maximum-scale kullanılmadan, akışkan Ant Design token/Grid ile test GREEN yapılır.
4. 360/375/390, yatay telefon ve tablet N−1/N/N+1 olarak ui-family-09 ve ui-view-list görevlerine bırakılır.
   Suite Vue ve Desk viewport dosyalarına dokunulmaz.

Önerilen bağımlılık/sıra: ui-family-01--contract; ui-family-01--implementation; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract; page-super-admin--contract; page-tenant-admin--contract; ui-family-09--implementation; ui-view-list--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-01--implementation-mvp`.

Kaynak kanıtı:

- `suite/frontend/src/composables/useScreenSize.ts:16` — `const isMobile = ref(window.innerWidth < 640)`
- `suite/frontend/index.html:25` — `content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content"`
- `frappe/frappe/www/desk.html:15` — `maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover`
- `frappe/frappe/public/scss/desk/list.scss:765` — `overflow-x: auto;`
- `frappe/frappe/public/js/frappe/utils/utils.js:206` — `return $(document).width() < 768;`
- `suite/suite/headless_provider/api.py:243` — `"layout": [[df.fieldname, df.fieldtype, cint(df.permlevel)] for df in meta.fields],`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite/frontend/src; arama `@media|min-width:\s*320|max-width:\s*(320|360|375|390|576|640|767|768)px`: 19 dosyada 35 eşleşme. Bunlar bileşen düzeyinde; 320/360/375/390 için kabul tanımı yok.
- suite/frontend/src; arama `useBreakpoints|matchMedia|isMobile|sm:|md:hidden|viewport`: 127 dosyada 565 eşleşme. Merkez nokta useScreenSize.ts: 640px eşiği, yükleme anında bir kez belirleniyor.
- suite/frontend/src (*.css); arama `mobile|640|@media`: Yalnızca writer/styles/print.css içinde @media print var.
- suite (**/package.json); arama `antd|ant-design|@tanstack|react-dom`: Yalnızca @tanstack/vue-virtual var; React veya Ant Design yok.
- suite/suite/headless_provider/api.py; arama `def |layout|breakpoint|responsive|viewport|mobile`: Yalnızca metadata/şema düzenleme fonksiyonları var; layout = alan sırası parmak izi. Duyarlı yerleşim sözleşmesi yok.
- frappe/frappe; arama `name="viewport"|initial-scale|user-scalable|maximum-scale`: desk.html satır 14-15'te user-scalable=no ve maximum-scale=1.0 var.
- suite; arama `name="viewport"|initial-scale|user-scalable|maximum-scale`: frontend/index.html, suite/www/suite.html ve public/frontend/index.html dosyalarında user-scalable=no var.
- frappe/frappe/public/scss; arama `@media \(max-width|@include media-breakpoint|@media \(min-width`: 38 dosyada 176 eşleşme. Desk duyarlı CSS içeriyor; mobile.scss'te 991px.
- frappe/frappe/public/js/frappe/utils; arama `is_xs\(\)|is_mobile\(\)|function is_xs|is_mobile:|is_xs:`: is_xs: genişlik < 768.
- frappe/frappe/public/scss/desk/list.scss; arama `overflow-x:\s*auto|overflow-x:\s*scroll`: Liste görünümünde .result-container için overflow-x: auto (satır 765).

Sınır: Yalnızca Read/Glob/Grep ile statik kaynak incelemesi yapıldı. Hiçbir komut, test, tarayıcı veya zoom ölçümü çalıştırılmadı; functionalAcceptance not_run.; Kapsam yalnızca sourceRoot altındaki frappe ve suite uygulamalarıdır. React/Ant Design paneli bu kaynakta yok ve değerlendirilemedi.; Tarayıcıların user-scalable=no davranışı (ör. iOS Safari'nin bunu yok sayması) çalışma zamanı konusudur; kaynak yalnızca bildirimin varlığını kanıtlar.; Desk SCSS ve Suite bileşenleri tek tek 320 px'de doğrulanmadı; yalnızca eşik ve primitif varlığı tespit edildi.; Derlenmiş public/dist dosyaları kanıt olarak kullanılmadı.; suite/headless_provider yerel pilot ek koddur; upstream Frappe/Suite değildir.; Ürün DONE durumu veya yüzde raporlanmaz.

Temporal workflow: `saas-recheck-20261015t073528z-054`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-5 — Erişilebilirlik: klavye, odak sırası, ekran okuyucu ve renk dışı durum işaretleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Kaynakta erişilebilirlik ilkelleri var ama yalnız upstream Frappe Desk (jQuery/Espresso) ve Suite Vue/frappe-ui ön yüzlerinde. (1) Frappe Desk: Page sınıfında "ana içeriğe git" atlama bağlantısı var. Bu bağlantı ana bölgeye tabindex=-1 verip odağı oraya taşıyor (page.js:232-250). (2) frappe.ui.alert bileşeni role=alert kullanıyor. Her tema için ayrı Lucide ikonu ve metin başlığı veriyor, böylece durum yalnız renkle aktarılmıyor. Kapatma düğmesinde aria-label var (alert.js:23-67). (3) Toolbar ve arama düğmelerinde aria-label kullanılıyor, klavye ile odak taşınıyor (toolbar/search.js, about.js). (4) Suite Vue kabuğunda, örneğin SuiteCommandPalette.vue içinde, aria-label, aria-expanded, role=button+tabindex=0 ve Enter/Space ile klavye etkinleştirmesi var. (5) Frappe'de Playwright testleri var; Suite'te e2e/meet testleri getByRole/toHaveAccessibleName kullanıyor. Bu testler yalnız okundu, çalıştırılmadı; davranış kanıtı sayılmaz. Yerel pilot suite/headless_provider (api.py, local_fixture.py) içinde erişilebilirlikle ilgili hiçbir sözleşme yok. Bu beklenen bir durum, çünkü konu ön yüz katmanına ait. Runtime functionalAcceptance: not_run.

Eksik: Seçilen headless React/Ant Design/Pro/X + TanStack ön yüzünde hiçbir erişilebilirlik uygulaması yok. Desk ve Suite Vue kodu bu yığında yeniden kullanılamaz, yalnız örüntü olarak okunabilir.; Tab/Shift+Tab ve odak sırası sözleşmesi yok; TanStack route geçişinde odağın nereye taşınacağı ve sayfa başlığı/landmark kuralı tanımsız.; Asenkron durumlar (kaydedildi, hata, senkron) için aria-live/role=status sözleşmesi yok. Frappe alert yalnız Desk'te role=alert kullanıyor.; Renk dışı durum için ikon+metin semantik tokenları ve erişilebilir ad kuralları headless kabukta yok.; Frappe'nin odak tokenı (--focus-default: 0 0 0 2px box-shadow, buttons.scss :focus-visible) çevreleyen bir odak halkası çiziyor. Bu, kalıcı odak politikasıyla çelişiyor; örnek alınmamalı. Ant Design'ın varsayılan odak stilinin token kaynağında düzeltilmesi de tanımsız.; axe/Playwright ile Chromium/Firefox/WebKit klavye yolculuğu regresyon testi yok.; WCAG 2.2 AA hedefi ve ölçülebilir eşikler kabul metninde açık değil.

Sonraki somut adım: En küçük adım: ui-family-01--contract kabul metnine şunlar eklenir: WCAG 2.2 AA hedefi, çevrelemeyen tek odak göstergesi tokenı, route değişiminde odağın h1/main öğesine taşınması, renk dışı durum için ikon+metin kuralı ve role=status/alert canlı bölge sözleşmesi. Ardından ui-family-01--implementation-mvp içinde tek bir React/AntD kabuk dilimi yapılır: atlama bağlantısı, main landmark, TanStack route sonrası odak yönetimi ve tek durum bildirimi bileşeni. Önce bu dilim için klavye yolculuğu (Tab/Shift+Tab, Enter, Escape) ve axe kontrolü içeren tek bir Playwright senaryosu RED olarak yazılır, sonra uygulama GREEN yapılır. Sıra: contract → implementation-mvp → ui-family-09--implementation. Frappe Desk skip-link ve alert örüntüsü yalnız referans olarak kullanılır; kod kopyalanmaz.

Önerilen bağımlılık/sıra: ui-family-01--contract; ui-family-01--implementation; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract; page-super-admin--contract; page-tenant-admin--contract; ui-family-09--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-01--implementation-mvp`.

Kaynak kanıtı:

- `frappe/frappe/public/js/frappe/ui/page.js:235` — `.text(__("Navigate to main content"))`
- `frappe/frappe/public/js/frappe/ui/page.js:241` — `main.focus();`
- `frappe/frappe/public/js/frappe/ui/components/alert.js:43` — `const attrs = ['role="alert"'];`
- `frappe/frappe/public/js/frappe/ui/components/alert.js:26` — `red: "circle-x",`
- `frappe/frappe/public/css/espresso/effects.css:27` — `--focus-default: 0px 0px 0px 2px #c9c9c9e5;`
- `suite/frontend/src/shell/SuiteCommandPalette.vue:75` — `@keydown.enter.space.prevent="activateMailFilter(filter.key)"`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe; arama `aria-live|role="status"|role="alert"|skip-link|skip to (main )?content|focus-visible|prefers-reduced-motion`: 60+ dosya (limitte kesildi): Espresso CSS bileşenleri, scss focus-visible stilleri, page.js skip link, alert.js role=alert, router.js; dist paketleri de eşleşti.
- suite; arama `aria-live|role="status"|role="alert"|skip-link|focus-visible|prefers-reduced-motion|aria-label|focus-trap|useFocusTrap|tabindex`: 233 dosyada 353 eşleşme; kaynak Vue bileşenleri (shell, drive, meet, mail, slides, writer) ve derlenmiş assets.
- frappe/frappe/public/js/frappe (router.js, ui/page.js, ui/components/alert.js, ui/toolbar/*.js); arama `aria-live|role="status"|role="alert"|skip-link|focus\(\)|aria-label`: page.js:232-241 skip link ve main.focus; alert.js:43 role=alert; search.js/about.js aria-label; router.js'deki skip-link yalnız dış bağlantı uyarısı token'ı, a11y değil.
- suite/suite/headless_provider; arama `(?i)a11y|accessib|aria|wcag|focus|keyboard|screen.?reader`: Erişilebilirlikle ilgili sonuç yok; tek eşleşme api.py'de advisory lock bağlamında 'mariadb'.
- . (frappe+suite, dist/assets hariç); arama `axe-core|@axe-core|AxeBuilder|toHaveAccessibleName|getByRole`: axe kullanımı bulunamadı; getByRole/toHaveAccessibleName yalnız Frappe playwright ve Suite e2e testlerinde (yalnız okundu, çalıştırılmadı).
- frappe/frappe/public (dist hariç) ve scss/common/buttons.scss; arama `--focus-default\s*:|focus-visible`: effects.css:27/42 box-shadow spread halkası; buttons.scss:117-118 :focus-visible ile uygulanıyor; çevreleyen halka.
- suite/frontend/src/shell/SuiteCommandPalette.vue; arama `aria-|role=|@keydown|tabindex`: aria-label, aria-expanded, aria-hidden ikonlar, role=button+tabindex=0, Enter/Space klavye işleyicisi.

Sınır: Yalnız sourceRoot altındaki frappe ve suite uygulama kaynakları okundu; komut çalıştırılmadı, test koşturulmadı, tarayıcı/ekran okuyucu davranışı doğrulanmadı.; Kaynak yalnız kod varlığını kanıtlar; WCAG uyumu, gerçek odak sırası ve ekran okuyucu çıktısı runtime'da ölçülmedi (functionalAcceptance: not_run).; Desk ve Suite Vue ilkelleri seçilen React/AntD headless ön yüzüne ait değil; yeniden kullanılabilir kod değil, örüntü kanıtı.; Grep sonuçları head_limit nedeniyle kesildi; her Vue bileşeni tek tek okunmadı, örnek dosyalar okundu.; ERPNext/HRMS kurulu değil, değerlendirilmedi; suite commit bilinmiyor.; Plan modu dosya yazmayı öngörse de kullanıcı yalnız Read/Glob/Grep izni verdi; plan dosyası yazılmadı.

Temporal workflow: `saas-recheck-20261015t073528z-055`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### channels-6 — Hareket azaltma, kontrast, metin büyütme ve erişilebilir hata sunumu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam doğru biçimde UI sorumluluğu olarak tanımlanmış, ancak kabul metni ('gerçek etkileşimlerle kontrol edilmeli') eşik vermiyor. Frappe sunucu doğrulama hatalarını exception/mesaj olarak üretiyor. Bu mesajların alan düzeyinde erişilebilir hataya dönüştürülme sözleşmesi tanımlı değil. Bazı mesajlar HTML de içerebiliyor.

Eksik: Kontrast eşiği (4.5:1 / 3:1), 14 CSS px minimum, %200 zoom ve 320 px reflow ölçütleri kabulde yok.; Reduced motion için merkezi hareket tokenlarına (easeInOut Cubic) ve reduced-motion istisnasına referans yok.; Frappe hata yanıtının (exc_type, _server_messages, PermissionError) form alanına ve aria-describedby/odak hedefine eşlenme sözleşmesi tanımsız.; HTML içeren sunucu mesajlarının güvenli metne çevrilmesi veya sanitize kuralı yok.

Sonraki adım önerisi: Kabul metnine sayısal eşikleri ve hareket tokenı referansını ekleyin. Ardından Frappe hata yanıtını alan hatası ve özet hata odağına eşleyen tek bir istemci adaptör sözleşmesi tanımlayın: sunucu doğrulaması korunur, UI yalnızca sunar.

Mevcut birincil görev: `ui-family-01--implementation-mvp`. Kaynak: `frappe/frappe/client.py:177`; `frappe/frappe/website/doctype/website_theme/website_theme.py:137`.

#### channels-7 — Çevrimdışı çalışma, yerel işlem kuyruğu ve yeniden bağlanınca uzlaştırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (tek kez uygulama, iki cihaz çakışmasında çözüm sunma) anlamlı. Ancak yerel REST create/update yolları idempotency anahtarı veya sürüm koşulu almıyor. Suite Slides yalnız salt okunur bir çevrimdışı önbellek defteri sağlıyor. Meet'teki reconnect bir taşıma yeniden bağlanması; veri uzlaştırması değil. Referans verilen O0–O3 planı pakette yok.

Eksik: Operasyon kimliği/idempotency anahtarının sunucuda nerede saklanacağı ve tekrar gönderimde nasıl reddedileceği tanımsız; create_doc yeniden denendiğinde çift kayıt üretebilir.; Çakışma tespitinin dayanağı (modified zaman damgası veya sürüm alanı) ve yerel v17 Document.save davranışı doğrulanmamış; ilgili kaynak excerpt'te yok.; Çevrimdışıyken Keycloak token süresi dolması, izin iptali ve tenant değişimi sonrası kuyruk politikası yok.; docstatus geçişlerinin (submit/cancel) ve silmelerin çevrimdışı kuyruğa alınıp alınmayacağı kararı yok.; Tauri ile PWA yerel depolama ayrımı ve yerel verinin şifrelenmesi/silinmesi sözleşmesi yok.; Toplu ekleme sınırı (200) kuyruk boşaltma stratejisine yansıtılmamış.

Sonraki adım önerisi: client-local-outbox için önce O0–O3 planını kaynakla eşleyin. Ardından yerel v17 frappe/model/document.py içinde modified/check_if_latest davranışını okuyun. Son olarak tek bir whitelisted, izin kontrollü, idempotent senkron uç noktası sözleşmesi yazın (op id, beklenen modified, sonuç); ignore_permissions kullanılmamalı.

Mevcut birincil görev: `client-local-outbox--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:60`; `frappe/frappe/client.py:246`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:23`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:39`.

#### channels-8 — Deep link (uygulama içindeki belirli kayda doğrudan bağlantı) ve kanal devamlılığı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kayıt okumada sunucu tarafı izin kontrolü yerel kaynakta mevcut. Suite, SPA deep link rotalarını hook ile eşliyor; Frappe yönlendirmeleri sorgu parametresini taşıyabiliyor. Ancak oturum sonrası güvenli dönüş, tenant bağlama ve uygulama dışı kanal (Tauri/WXT) bağlantı şeması tanımlı değil. Kapsam koşullu; tetikleyici ürün kararı da belirtilmemiş.

Eksik: Dönüş hedefinin yalnız göreli veya izinli listedeki yollarla sınırlandırılması (open redirect koruması) ve OIDC state içinde taşınması tanımsız.; 'Başka tenant' kavramının Frappe site ve Keycloak organizasyonuyla eşlemesi belirsiz; yetkisiz kayıtta 403 mü 404 mü döneceği (varlık sızıntısı) belirtilmemiş.; TanStack Router URL şeması ile DocType/name kodlamasının (path:name, özel karakterler) eşleşmesi yok.; Tauri custom scheme/universal link ve WXT eklenti bağlantı davranışı ile koşullu kapsamın açılma ölçütü tanımsız.

Sonraki adım önerisi: Koşullu kapsamı açacak ürün kararını kaydedin. Web için tek bir sözleşme yazın: kanonik kayıt URL'si, OIDC state'te göreli returnTo, girişten sonra read_doc yetki kontrolü ve tenant uyuşmazlığında kayıt varlığını açığa çıkarmayan yanıt. Tauri/WXT'yi ayrı adım olarak bırakın.

Mevcut birincil görev: `client-channel-continuity--implementation`. Kaynak: `frappe/frappe/api/v1.py:83`; `suite/suite/hooks.py:45`; `frappe/frappe/website/path_resolver.py:133`; `suite/frontend/src/apps/calendar/utils/mobileView.ts:26`.

#### channels-9 — Düşük veri tüketimi modu; kullanıcı tercihiyle yenileme, medya ve ağır istekleri azaltma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: bayt ölçümü, tazelik açıklaması, elle yenileme ve Save-Data olmadan çalışma. Yerel REST katmanında alan seçimi, varsayılan 20 kayıtlık sayfalama ve sayım önbelleği parametresi var. Ancak bunlar bir veri bütçesi politikası değil. Kapsam koşullu ve tetikleyici yolculuk henüz belirlenmemiş.

Eksik: Ölçüm koşulları (ağ profili, yolculuk, bütçe değeri) ve tek bütçe seti tanımlı değil.; 'Ağır istek' sınıflandırması yok: realtime socket, polling, küçük resim/medya, expand_links.; TanStack Query yenileme davranışının (staleTime, refetchOnWindowFocus, refetchInterval) mod ile nasıl değişeceği tanımsız.; Tercihin nerede saklanacağı (cihaz yerel mi, kullanıcı ayarı mı) ve kanallar arası taşınıp taşınmayacağı belirsiz.

Sonraki adım önerisi: Bayt ölçümüyle doğrulanmış tek bir gerçek yolculuk seçip koşullu kapsamı netleştirin. Ardından fields/limit_page_length kullanımını ve Query yenileme politikasını mod bayrağına bağlayan kısa bir istemci politikası yazın; yeni sunucu uç noktası şart değildir.

Mevcut birincil görev: `client-data-budget--implementation`. Kaynak: `frappe/frappe/api/v1.py:13`; `frappe/frappe/api/v1.py:22`; `frappe/frappe/client.py:82`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:13`.

#### views-9 — Kaydedilmemiş değişiklik uyarısı, işlem onayı ve geri alınabilir işlemler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: taslak kaybı yok, iptal edilen onay yan etkisiz, undo yalnız desteklenen işlemde. Kaynakta yalnız kaydetme ve silme primitifleri var. update_doc doğrudan doc.save() çağırıyor, delete_doc ise kalıcı silme yapıp 202 dönüyor. Bu alıntılarda undo, değişmiş/kaydedilmemiş durum izleme veya iki aşamalı onay sözleşmesi yok.

Eksik: 'Desteklenen işlem' listesi tanımlı değil; hangi işlemin hangi native mekanizmayla geri alınacağı (ters update, Deleted Document restore, amend/cancel) yazılmamış. Restore kaynağı bu alıntılarda görünmüyor.; Gezinmede taslak korumanın depolama sözleşmesi views-12 ile paylaşılmamış (web/Tauri/WXT için ayrı saklama sınırları).; Onayın sunucu tarafı yok: onay yalnız istemcide; v1/v2 DELETE ve run_method idempotency veya ön-doğrulama sağlamıyor.; Frappe v17-dev sürüm eşlemesi ve v1/v2 hedef API seçimi yok.; ui-family-07/16/20 görevleri arasında hangi kısmın MVP'ye girdiği belirsiz.

Sonraki adım önerisi: ui-family-07--implementation-mvp tanımına üç kısa sözleşme ekle: (1) undo sunulacak işlem listesi ve her birinin native ters işlemi; desteklenmeyen işlemde yalnız onay gösterilecek. (2) Onay iptalinde hiçbir istek gönderilmeyecek kuralı. (3) Taslak koruması için views-12 durum modeline referans. Sürüm olarak v17-dev ve /api/v2 hedefini yaz.

Mevcut birincil görev: `ui-family-07--implementation-mvp`. Kaynak: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v1.py:72`; `frappe/frappe/api/v1.py:73`.

#### views-10 — Liste içinde satır/hücre düzenleme; alan doğrulama, kaydetme, iptal ve çakışma geri bildirimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: klavye, Enter/Escape, çakışma ve sunucu reddi tanımlı. Kaynakta alan bazlı yazma primitifleri var: set_value ve update_doc. update_doc kaydı for_update ile kilitleyerek alıyor. Meta tarafında permlevel erişimi ve frappe/ui içinde permDenied/readOnly bilgisi var. Ancak frappe/ui Vue tabanlı ve seçilen React/Ant Design yığınına doğrudan aktarılamaz. Grid kararı da hâlâ açık.

Eksik: Çakışma tokenı sözleşmesi yok: istemcinin modified/sürüm alanını yazma isteğiyle göndermesi ve sunucunun bunu nasıl reddedeceği. Document.save içindeki sürüm kontrolü bu alıntılarda görünmüyor.; Inline düzenlenebilir alan türleri tanımsız: Link, Table, child row, read_only_depends_on ve permlevel.; Child table satırı düzenlenince parent kaydının kaydedilme davranışı (update_doc satır 64-65) UX sözleşmesine bağlanmamış.; Grid bileşeni seçilmediği için klavye ve hücre odak sözleşmesinin sahibi belli değil.; Sunucu doğrulama hatasının hangi alana eşleneceğini belirleyen yanıt sözleşmesi yok.

Sonraki adım önerisi: ui-family-09--implementation-post-mvp tanımına şunları ekle: inline düzenlenebilir alan türü listesi; yazma için /api/v2 ve set_value seçimi; modified tabanlı çakışma reddi ve kullanıcının girdiği değeri koruyan yeniden deneme akışı. Grid seçimini ui-view-table--implementation bağımlılığı olarak işaretle.

Mevcut birincil görev: `ui-family-09--implementation-post-mvp`. Kaynak: `frappe/frappe/client.py:183`; `frappe/frappe/api/v1.py:56`; `frappe/frappe/model/meta.py:746`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:173`; `frappe/ui/src/components/ListView/useListView.ts:1`.

#### views-11 — Canlı bağlantı ve sunucu erişimi göstergesi; çevrimdışı, erişilemiyor ve yeniden bağlanıyor durumları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de (v17-dev, adf1fd0c) şu temel parçalar var: (1) Konuk erişimine açık, whitelist'li frappe.ping() 'pong' döndürüyor. v1'de /api/method/frappe.ping üzerinden, v2'de /method/ping kuralıyla erişiliyor; hafif bir sunucu erişim yoklaması olarak kullanılabilir. (2) Desk'te frappe.is_online() yalnız navigator.onLine'a bakıyor ve developer_mode'da her zaman true dönüyor. window online/offline olayları 'connection-status' kimlikli tek bir toast'ı güncelliyor; frappe.call çevrimdışıyken aynı toast'ı gösteriyor. (3) frappe.request.call içinde 401 ve 403 yanıtları önce handle_session_expiry'ye gidiyor; yani oturum süresinin dolması bağlantı arızasından ayrı ele alınıyor. 403 izin mesajı veriyor; 502, 504 ve 508 için ayrı kullanıcı mesajları var. (4) socket.io istemcisi reconnectionAttempts:3 ile kuruluyor; connect_error yalnız console.error'a yazılıyor. Sunucuda realtime 'ping' işleyicisi var. frappe/ui socket.ts yeniden bağlanınca doküman odalarına tekrar abone oluyor. Mutasyonları otomatik yeniden göndermeye dair bir kod görülmedi. Suite tarafında (Vue arayüzü, headless değil) şunlar var: Writer'da isOffline, Slides'ta online/offline işleyicileri ve navigator.onLine kontrolleri, Meet'te ParticipantConnection ve tanı raporu. Bunlar uygulamaya özgü ve dağınık. Yerel pilot suite/suite/headless_provider içinde bağlantı veya sağlık sözleşmesi yok.

Eksik: Çevrimdışı, sunucuya erişilemiyor ve yeniden bağlanıyor durumlarını ayıran tek bir durum modeli yok.; İnternet açıkken sunucuya erişilemiyor durumunu sınıflayan mantık yok: request.js .fail yolu yalnız statusCode tablosuna bakıyor; status 0, ağ hatası veya ping başarısızlığı için işleyici yok.; Son başarılı temas zaman damgası yok.; Yeniden bağlanma ve backoff durumu kullanıcıya gösterilmiyor: socket.io connect_error yalnız console'a yazılıyor ve ping yoklaması zamanlanmıyor.; frappe.is_online developer_mode'da her zaman true dönüyor; navigator.onLine sunucu erişimini kanıtlamıyor.; Ekran okuyucuya odağı çalmadan duyuru (aria-live/status) ve renk dışı gösterge, bu alanda okunan kodda doğrulanmadı.; Headless React/Ant Design için Frappe provider bağlantı durumu sözleşmesi yok (headless_provider'da da yok).; Keycloak token yenileme ile bağlantı hatasını ayıran kural yok; Tauri, PWA ve WXT MV3 farkları kaynakta ele alınmamış.

Sonraki somut adım: Sıra şöyle olmalı: (1) ui-family-06--contract içinde headless istemci için ConnectionState sözleşmesini tanımla. Durumlar: online, offline (navigator), unreachable (status 0, ağ veya zaman aşımı hatası ya da GET /api/v2/method/ping başarısızlığı), reconnecting (socket.io reconnect_attempt / ping backoff) ve lastSuccessAt. 401/403 auth/session durumuna gitsin, bağlantı durumuna değil. Upstream'deki frappe.ping ve handle_session_expiry ayrımı referans alınsın. (2) api-middleware--contract tarafında TanStack Query fetch katmanında yalnız gerçek istek sonuçlarından durum türeten saf bir sınıflandırıcı yaz. Önce birim testlerde RED, sonra GREEN kanıtı üret. Mutasyonların retry değeri 0 olsun ve otomatik yeniden gönderim olmasın. (3) Ardından ui-family-40--implementation-mvp içinde Ant Design göstergesini role=status/aria-live=polite, metin ve ikon ile bağla. Realtime soket sinyali ayrı bir karar olarak eklensin. Suite Vue koduna dokunulmasın; upstream Desk toast'ı değiştirilmesin.

Önerilen bağımlılık/sıra: ui-family-06--contract; kernel-envelope--contract; api-middleware--contract; client-rule-parity--contract; ui-family-06--implementation; ui-family-40--implementation-mvp. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `ui-family-06--implementation`.

Kaynak kanıtı:

- `frappe/frappe/__init__.py:1478` — `def ping():`
- `frappe/frappe/api/v2.py:623` — `Rule("/method/ping", endpoint=frappe.ping),`
- `frappe/frappe/public/js/frappe/dom.js:397` — `return navigator.onLine;`
- `frappe/frappe/public/js/frappe/request.js:152` — `if (frappe.request.handle_session_expiry(xhr.responseJSON)) return;`
- `frappe/frappe/public/js/frappe/socketio_client.js:73` — `console.error("Error connecting to socket.io:", err.message);`
- `frappe/frappe/public/js/frappe/request.js:56` — `description: __("You are not connected to Internet. Retry after sometime."),`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite tümü, *.min.js hariç); arama `navigator\.onLine|addEventListener\(["'](online|offline)["']|\$\(window\)\.on\(["']online|frappe\.realtime\.on\(["']connect|socket\.on\(["'](connect|disconnect|reconnect)`: Frappe tarafında dom.js'te is_online ve online/offline toast'ı, socketio_client.js'te connect_error, frappe/ui socket.ts'te connect sonrası yeniden abonelik bulundu. Suite tarafındakiler Writer, Slides ve Meet'e özgü Vue kodu; geri kalanlar e2e/test ve dist bundle'ları.
- source (frappe + suite tümü); arama `def ping\(|/api/method/ping|is_online|connection_lost|Connection lost|reconnect`: 139 dosya eşleşti. İlgili uygulama kodu: frappe/**init**.py ping, realtime/handlers.py ping, request.js, dom.js, socketio_client.js, suite/frontend/src/realtime.ts. Geri kalanı locale, test, dist ve Meet SFU.
- frappe/frappe (dist ve locale hariç); arama `def ping|status_code == 0|xhr\.status === 0|Server Unavailable|connection_lost|frappe\.ping|"ping"`: frappe.ping (allow_guest) bulundu; v2 /method/ping kuralı ve realtime ping var. Genel istek katmanında status 0 işleyicisi yok (yalnız FileUploader'da var).
- frappe/frappe/public/js/frappe/request.js; arama `\.fail\(|status === 0|status == 0|timeout|handle_session_expiry = `: .fail yalnız JSON exception ve statusCode tablosunu kullanıyor; status 0 ya da ağ hatası için ayrı bir durum yok. 401/403 handle_session_expiry'ye gidiyor.
- suite/suite/headless_provider; arama `connect|disconnect|reconnect|online|offline|health|ping (case-insensitive)`: Yalnız DB connection yorumları eşleşti; bağlantı durumu ya da sağlık sözleşmesi yok.
- suite/frontend/src/realtime.ts; arama `connect|disconnect|offline|online`: reconnectionAttempts: 5 ve sınırsız yeniden bağlanma yorumu var; UI'ya açılan bağlantı durumu bu grep'te görülmedi.

Sınır: Yalnız statik kaynak okundu; komut, test ya da tarayıcı çalıştırılmadı. functionalAcceptance: not_run.; frappe.ui.toast'ın aria-live/role davranışı okunmadı; erişilebilir duyuru doğrulanmadı.; Dist bundle'ları ve source map'ler içerik olarak incelenmedi; kaynak JS esas alındı.; Suite Vue uygulamalarındaki (Writer, Slides, Meet) bağlantı göstergeleri ayrıntılı okunmadı; bunlar headless React sözleşmesi değil.; Keycloak, Tauri, PWA ve WXT ortamları kurulu kaynakta yok; bu konular değerlendirilmedi.; suiteCommit bilinmiyor; ERPNext/HRMS kurulu değil.

Temporal workflow: `saas-recheck-20261015t073528z-056`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### views-12 — Kaydetme durumu; değiştirildi, kaydediliyor, bu cihazda taslak, sunucuya kaydedildi ve kaydetme hatası.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü çok net: commit doğrulanmadan 'kaydedildi' gösterilmiyor, eski yanıt yeni değişikliği ezmiyor, durum mesajı kayıt sürümüyle eşleşiyor. Kaynakta yalnız sunucu kaydetme primitifleri var; update_doc kaydettiği belgeyi geri dönüyor. Yanıttaki sürüm alanına dayanan bir eşleştirme sözleşmesi yazılmamış. Yerel taslak tamamen frontend'in işi.

Eksik: Commit sonucunun kanıtı tanımlı değil: başarılı HTTP yanıtı ile dönen modified değerinin istek sürümüyle eşleşmesi. Request sonundaki commit davranışı bu alıntılarda görünmüyor.; Yerel taslak deposu ve hata davranışı tanımsız: IndexedDB, Tauri store ve MV3 storage kotaları farklı.; Durum makinesinin (değiştirildi, kaydediliyor, cihazda taslak, sunucuya kaydedildi, hata) views-9 ve views-10 ile ortak tek model olduğu yazılmamış.; Yanıtları istek sürümüyle eşleyerek eski yanıtı atma kuralı TanStack Query mutasyon sözleşmesine bağlanmamış.

Sonraki adım önerisi: ui-family-06--implementation içinde yanıtı işlem kimliği ve yerel taslak nesliyle eşle; dönen modified değerini yeni sunucu sürümü olarak sakla. 'Kaydedildi' durumunu doğrulanacak commit/ack sözleşmesine bağla; istek temel sürümüyle yeni sürümü eşitleme. Eski yanıt yeni taslağı ezmesin. Yerel taslak deposu ui-family-40 içinde platforma göre seçilsin; views-9 ve views-10 bu modele bağlansın.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v1.py:67`; `frappe/frappe/api/v2.py:204`.

#### views-13 — Sonucu belirsiz işlemi kimliğiyle sorgulama; doğrulanmadan tekrar göndermeme ve mükerrer etkiyi önleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni anlamlı: tamamlandı/sürüyor/başarısız/bilinmiyor ayrımı, kör tekrar yasağı ve yetki koruması tanımlı. Kaynakta transaction ve satır kilidi (for_update) var. v2 create_doc istemcinin verdiği name değerini kabul ediyor; bu, insert için doğal bir idempotency anahtarı olabilir. Ancak v1/v2 insert ve insert_many istek kimliğini saklamıyor ve sonuç sorgulama ucu sağlamıyor.

Eksik: Kalıcı işlem kimliğinin nerede saklanacağı (yeni DocType mı, Frappe kaydı mı), saklama süresi ve tenant/kullanıcı kapsamı tanımlı değil.; İstemci tarafından name verme (name_set) yaklaşımının yalnız insert için mi kullanılacağı belirtilmemiş. update, submit, run_method ve dış etkiler için idempotency kararı da yok.; v1 /api/resource veya v17-dev /api/v2 hedefi seçilmemiş. Yanıt kaybında DuplicateEntry ve zaman aşımı sonuçlarının nasıl eşleneceği tanımlı değil.; ui-provider-query görevindeki mutation retry politikasının (TanStack Query) 'bilinmiyor' durumunda tekrar yapmaması sözleşmeye bağlanmamış.

Sonraki adım önerisi: ui-family-06 kapsamında tek sayfalık bir operation-id sözleşmesi yazılmalı: hedef API (v2), anahtar kapsamı (tenant+user+op), durum makinesi ve sorgu ucunun izin kontrolü. İlk adım yalnız insert için: name_set ile doğal anahtar ve DuplicateEntry durumunda okuyarak doğrulama. Diğer mutasyonlarda sonuç 'bilinmiyor' olarak gösterilmeli.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:206`; `frappe/frappe/api/v2.py:207`; `frappe/frappe/client.py:245`.

#### views-14 — Kayıt ve ekran verisinin tazeliği; son başarılı güncelleme, eski veri uyarısı ve güvenli yenileme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: başarısız yenileme tazelik zamanını ilerletmiyor, taslak korunuyor, kritik eylemde sunucuda doğrulama yapılıyor. Kaynakta yalnız önbellek primitifleri görülüyor: sunucuda meta client_cache, frappe/ui tarafında oturum başına memoize edilen meta ve cached_timestamp parametresi. Kayıt verisi için 'son başarılı alınma' veya bayatlık sunumu yok. frappe/ui Vue tabanlı; seçilen React/TanStack yığınına doğrudan yeniden kullanılamaz.

Eksik: Tazelik eşikleri ve hedef sürüm talimatta açıkça 'seçilecek' olarak bırakılmış.; Kritik eylemde sürüm doğrulaması için hangi alanın kullanılacağı (ör. modified) ve sunucunun çakışmayı hangi hatayla bildirdiği eşlenmemiş. Bu davranış excerpt'te görülmüyor.; Meta önbelleği (memoize, client_cache) ile kayıt verisi tazeliğinin ayrı olacağı kaynak düzeyinde belirtilmemiş. Realtime sağlayıcı görevine ait kaynak excerpt'te yok.; frappe/ui composable'ları referans olarak mı alınacak, yoksa React tarafında yeniden mi yazılacak, kararı yok.

Sonraki adım önerisi: ui-provider-query görevine üç alanlı bir tazelik modeli eklenmeli: kaynak güncellemesi (kayıt modified), son başarılı fetch zamanı (TanStack dataUpdatedAt) ve bağlantı durumu. Eşik değerleri ürün sahibiyle seçilmeli. Kritik eylem için sunucu çakışma hatası v17-dev kaynağında doğrulanmalı.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/ui/src/composables/useDoctypeMeta.ts:47`; `frappe/ui/src/composables/useDoctypeMeta.ts:84`; `frappe/ui/src/composables/useDoctypeMeta.ts:1`; `frappe/frappe/model/meta.py:83`.

#### views-15 — Genel işlem etki önizlemesi; etkilenecek kayıt ve alanlar, kapsam ve onaydan önce değişiklik özeti.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni (sayı, alan, önce/sonra, yeniden doğrulama, iptalde yan etkisizlik, alan sızıntısı yok) yeterli. Kaynakta yalnız yardımcı primitifler var: permlevel tabanlı alan eleme, alan düzeyinde okuma izni ve v2 toplu işlemlerde async eşiği. Dry-run veya önizleme motoru görülmüyor.

Eksik: Önizleme ile uygulama arasındaki bağın (önizleme tokenı, kayıt sürümleri, izin anlık görüntüsü) sözleşmesi yok.; v2 toplu işlem uçlarının ve async eşiğinin (varsayılan 20) önizleme sonrası uygulamada nasıl kullanılacağı eşlenmemiş.; Önizlemedeki alan filtresinin get_high_permlevel_fields ve apply_fieldlevel_read_permissions ile yapılacağı açıkça yazılmamış.; Dört post-MVP görev eşlenmiş, ancak sahip görev ile bağımlılık sırası belirtilmemiş.

Sonraki adım önerisi: ui-family-07 için minimal bir sunucu sözleşmesi yazılmalı: salt okunur önizleme ucu yalnız permlevel'e göre filtrelenmiş alanları dönsün; uygulama ucu kayıt sürümlerini yeniden doğrulasın ve uyuşmazlıkta reddetsin. Async eşiği ise mevcut v2 yapılandırmasından okunsun.

Mevcut birincil görev: `ui-family-07--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v2.py:31`; `frappe/frappe/api/v2.py:32`; `frappe/frappe/desk/reportview.py:180`; `frappe/frappe/api/v1.py:84`.

#### views-16 — Çözüm sunan hata mesajları; neden, ilgili alan, uygulanabilir sonraki adım ve güvenli hata kimliği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni hata sınıflarını, alan ilişkisini, girilen verinin korunmasını ve secret içermeyen hata kimliğini kapsıyor. Kaynakta hata sınıfı olarak exception türleri var (frappe.PermissionError), ancak mesajlar HTML biçimli ve kullanıcı adını içeriyor. Yapılandırılmış alan referansı ve hata kimliği excerpt'te görülmüyor. Suite Meet problem raporu URL ve konsol loglarını dış adrese mailto ile taşıyor; bu, güvenli hata kimliği hedefine ters bir örnek.

Eksik: v17-dev hata zarfının (exc_type, _server_messages, HTTP kodu) ürün hata sınıflarına eşlemesi tanımlı değil.; Alanla ilişkilendirme için sunucunun fieldname döndürüp döndürmediği doğrulanmamış. frappe.bold gibi HTML içeren mesajların sanitize edilmesi kuralı yok.; Kota hatasının kaynağı belirsiz.; Güvenli hata kimliğinin kaynağı (request id veya Error Log) belirsiz.; Suite'teki problemReport desenini (URL, konsol logu, dış mailto) tekrar etmeme kuralı yazılmamış.

Sonraki adım önerisi: ui-family-06 altında bir hata eşleme tablosu hazırlanmalı: exc_type'tan sınıfa, sonraki adıma ve retry güvenliğine. HTML mesajlar düz metne çevrilmeli. Hata kimliği için Frappe tarafındaki kaynak v17-dev'de doğrulanmalı. Destek raporlarının URL ve log içermemesi kuralı eklenmeli.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/frappe/permissions.py:153`; `frappe/frappe/desk/query_report.py:52`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:73`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:127`.

#### views-17 — Şablondan oluşturma ve kontrollü çoğaltma; kopyalanacak alanlar, ilişkiler ve yeni kayıt önizlemesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni yeni kimlik, durum/ödeme/secret taşınmaması, okunamayan alan sızıntısı ve sunucu doğrulaması gibi kritik noktaları kapsıyor. Kaynakta yalnız oluşturma primitifleri görülüyor: new_doc+insert, flags temizliği ve default/permlevel taşıyan meta eşlemesi. Talimat, Frappe'nin yerel kopyalama politikasını (no_copy alan özelliği, copy_doc) yeniden kullanmayı belirtmiyor. Bu primitifler excerpt'te yok; durumları bilinmiyor.

Eksik: Yerel no_copy/copy_doc davranışının v17-dev kaynağında doğrulanıp yeniden kullanılacağı yazılmamış. Kopyalama kuralının ayrı bir allowlist'te kopyalanma riski var.; Şablonun nerede saklanacağı tanımlı değil (ayrı DocType mı, mevcut kayıttan mı).; Child table ve Link ilişkilerinin kopyalanma kuralı eksik.; Destekleyici görev yok. ERPNext/HRMS kurulu olmadığından ödeme/onay örnekleri yalnız Frappe ve Suite DocType'larına göre eşlenmeli.

Sonraki adım önerisi: ui-family-20 için önce v17-dev'de no_copy ve copy_doc kaynağı doğrulanmalı. Sunucu tarafında kopya taslağını yerel kurallarla üreten ve okuma iznine göre filtreleyen bir önizleme ucu tasarlanmalı. Kaydetme, standart insert doğrulamasından geçmeli.

Mevcut birincil görev: `ui-family-20--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v1.py:49`; `frappe/frappe/api/v1.py:57`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:163`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:173`.

### İş süreçleri, kurallar ve zamanlama

#### workflow-1 — Workflow engine (iş akışı motoru).

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Yerel v17-dev kaynağında apply_workflow, geçiş listesini rol ve koşula göre süzüyor. Listede olmayan action WorkflowTransitionError ile reddediliyor. Talimatın hedefi ve kabul ölçütü yeterli. Ancak kaynak bağlantısı version-15'e gidiyor; headless API sözleşmesi de tanımlanmamış.

Eksik: Kaynak bağlantısı version-15'i gösteriyor; yerel 17.0.0.dev0 ile sürüm eşlemesi yok.; Headless çağrının hangi uç olacağı (/api/v2/method üzerinden apply_workflow/get_transitions) ve hata kodlarının nasıl eşleneceği yazılmamış.; Keycloak rollerinin Frappe Role'üne (transition.allowed) nasıl eşleneceği tanımlı değil.; Suite hooks.py '/api/' önekini DENIED_WILDCARD_PATHS listesine koyuyor. Workflow method yolunun izinli listede olup olmadığı bu kesitte görülmüyor.

Sonraki adım önerisi: native-workflow--implementation görevine v17 kaynak eşlemesini ve headless uç sözleşmesini ekle: get_transitions ile action listesi, apply_workflow ile uygulama, WorkflowTransitionError/PermissionError için hata eşlemesi. Suite yol allowlist'inin workflow method yolunu kapsayıp kapsamadığını kaynakta doğrula.

Mevcut birincil görev: `native-workflow--implementation`. Kaynak: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:134`; `frappe/frappe/model/workflow.py:136`; `suite/suite/hooks.py:466`.

#### workflow-2 — BPM (Business Process Management — iş süreci yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta belge başına workflow ve rol bazlı Workflow Action (Open/Completed) görev kaydı var. Birden çok belgeyi kapsayan süreç örneği, süreç sahipliği ve ölçüm modeli yok. Talimat da bu modeli tanımlamıyor.

Eksik: Birden çok belgeyi bağlayan süreç kimliği/örneği için veri modeli tanımlanmamış.; Görev sahipliğinin Workflow Action ile mi yoksa ayrı bir modelle mi tutulacağı kararı yok.; Ölçülecek süreç metrikleri (süre, darboğaz) ve kabul için örnek süreç belirtilmemiş.; Automation Flow yalnızca beta dokümana bağlı; yerel kaynakta görülmedi.

Sonraki adım önerisi: process-definition--implementation görevinde tek bir örnek süreç seç (ör. iki belge, üç adım). Görev kaydı için Workflow Action'ı yeniden kullan. Süreç örneği ve ölçüm alanlarının sözleşmesini yaz.

Mevcut birincil görev: `process-definition--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:46`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:115`; `frappe/frappe/model/workflow.py:37`.

#### workflow-3 — State machine (iş nesnesi durumlarını ve izinli geçişleri yöneten mekanizma).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Workflow tanımı kaydedilirken docstatus geçişleri doğrulanıyor; geçiş yalnızca mevcut durumdan yapılabiliyor. Ancak apply_workflow belgeyi DB'den yeniden yüklüyor ve istemcinin beklediği durumu almıyor. Bu yüzden eski durumla gelen eşzamanlı istek, action yeni durumda da geçerliyse reddedilmiyor. Beklenen durum/modified kontrolü yalnızca e-posta onay yolunda var.

Eksik: Eşzamanlı ve eski durumlu isteğin reddi için headless sarmalayıcıda expected_state/modified kontrolü tanımlanmamış.; Kaynak bağlantısı version-15; v17 eşlemesi yok.; Kanban ve UI görevleriyle durum tablosunun nasıl sunulacağı bağlanmamış.

Sonraki adım önerisi: Headless geçiş ucuna, workflow_action.apply_action örüntüsündeki gibi current_state ve last_modified karşılaştırmasını koşul olarak ekle. Bunu ORM'i kopyalamadan, apply_workflow öncesinde yap. Kabul senaryosuna eski durumla gelen isteği ekle.

Mevcut birincil görev: `native-workflow--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow/workflow.py:124`; `frappe/frappe/model/workflow.py:122`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:147`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:150`.

#### workflow-4 — Süreç tanımı, sürümleme, başlatma, durdurma ve yürütüm geçmişi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Her DocType için tek bir aktif Workflow var: yeni tanım aktifleşince diğerleri pasifleşiyor ve önbellek DocType'a göre tutuluyor. Belge yalnızca durum alanını saklıyor; çalışan örneği belirli bir tanım sürümüne bağlamıyor. track_changes yalnızca tanım belgesinin Version geçmişini veriyor. Durdurma veya yürütüm geçmişi için kaynakta karşılık görülmedi.

Eksik: Örneğin tanım sürümüne nasıl bağlanacağı (sürüm alanı, anlık görüntü) kararı yok.; Durdurma ve yeniden başlatma semantiği ile yetki modeli yazılmamış.; Yürütüm geçmişinin kaynağı (Version, Comment ya da yeni kayıt) belirlenmemiş.; Aktif tanım değişince mevcut belgelerin durum geçerliliği tanımsız; workflow.js'teki 'Save Anyway' uyarısı yalnızca Desk'te var.

Sonraki adım önerisi: process-definition--implementation görevinde örnek-sürüm bağlama kararını yaz. Sessiz değişimi önlemek için tanım değişince mevcut durumların diff'ini almayı ve kırıcı değişikliği engellemeyi kabul ölçütüne ekle.

Mevcut birincil görev: `process-definition--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow/workflow.py:139`; `frappe/frappe/model/workflow.py:38`; `frappe/frappe/workflow/doctype/workflow/workflow.json:140`; `frappe/frappe/model/workflow.py:140`.

#### workflow-5 — BPMN (Business Process Model and Notation — iş süreci modelleme ve gösterimi) desteği.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de BPMN olmayan, durum/geçiş tabanlı bir Workflow motoru var. model/workflow.py içindeki get_transitions okuma izni kontrol ediyor, ardından rol ve safe_eval koşuluyla filtreliyor. apply_workflow geçişi doğrulayıp workflow_state alanını güncelliyor. Workflow DocType'ı states/transitions tablolarını ve gizli workflow_data JSON alanını tutuyor. Desk/Vue Workflow Builder (@vue-flow/core) grafiği BPMN XML olarak değil, Vue Flow node/edge JSON'u olarak saklıyor. Beta Automation Flow tetikleyici/koşul/aksiyon modeli kullanıyor; süreç grafiği veya BPMN değil. Suite'te süreç motoru yok; buradaki 'workflow' eşleşmeleri yalnızca CI dosyaları. Yerel pilot suite/headless_provider'da (api.py, local_fixture.py) workflow/transition sözleşmesi yok.

Eksik: BPMN 2.0 XML import/export, ayrıştırıcı, şema doğrulama ve yürütme iki uygulama kökünde de yok.; Gateway, event, subprocess ve lane semantiği yok; Frappe Workflow yalnızca doğrusal durum/geçiş yapısını destekliyor.; Desteklenen BPMN alt kümesi listesi ve desteklenmeyen öğeyi açıkça reddetme davranışı yok.; BPMN ile Frappe Workflow states/transitions arasında eşleme yapan bir adaptör yok; yetkili kaynak kararı verilmemiş.; headless_provider'da süreç tanımı veya geçiş API sözleşmesi yok; Builder yalnızca Desk/Vue tarafında, React/AntDesign karşılığı yok.; Runtime functionalAcceptance: not_run.

Sonraki somut adım: Mevcut görev ID'leri ve bağımlılıklar korunur. (1) Önce kullanıcıyla BPMN gerektiren gerçek bir süreç olup olmadığı netleştirilir. (2) Gerekirse process-definition--contract içinde Frappe Workflow yetkili kaynak olarak belirlenir. Desteklenen en dar BPMN alt kümesi (startEvent, userTask→State, sequenceFlow→Transition, endEvent) ve diğer öğeleri reddetme sözleşmesi yazılır. (3) process-definition--schema/implementation aşamasında headless_provider'a salt okunur bir export eklenir: Workflow states/transitions → BPMN alt kümesi. Bunun için gerçek RED/GREEN testi yazılır. (4) Import en son eklenir; frappe.client.save ve Workflow validate yolu üzerinden yapılır ve desteklenmeyen öğeyi reddeder. Geçişler model/workflow.py apply_workflow ile yürütülmeye devam eder. (5) Görselleştirme ui-family-38--implementation-scale kapsamında React/AntDesign tarafında yapılır.

Önerilen bağımlılık/sıra: process-definition--contract; process-definition--schema; process-definition--implementation; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `process-definition--implementation-scale`.

Kaynak kanıtı:

- `frappe/frappe/model/workflow.py:72` — `if transition.state == current_state and transition.allowed in roles:`
- `frappe/frappe/model/workflow.py:119` — `def apply_workflow(doc: Document | str | dict, action: str):`
- `frappe/frappe/workflow/doctype/workflow/workflow.json:108` — `"fieldname": "workflow_data",`
- `frappe/frappe/public/js/workflow_builder/store.js:85` — `doc.workflow_data = JSON.stringify(workflow_data);`
- `frappe/frappe/public/js/workflow_builder/WorkflowBuilder.vue:2` — `import { VueFlow, useVueFlow, Panel, PanelPosition } from "@vue-flow/core";`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe+suite, tümü); arama `(?i)bpmn|bpmn-js|camunda|zeebe|flowable|SpiffWorkflow|xmlns:bpmn`: Yalnızca minify edilmiş .map dosyalarında ve suite noise-suppression worklet'inde alt dize eşleşmeleri çıktı; davranış yok.
- source (tümü); arama `(?i)\bbpmn`: 0 eşleşme.
- source (*.map hariç); arama `(?i)process[_ ]?definition|swimlane|boundary[_ ]?event|workflow.*(import|export).*xml`: Yalnızca kanban 'swimlane' eşleşmeleri çıktı; süreç/BPMN yok.
- suite (*.map hariç); arama `(?i)workflow`: Yalnızca .github/workflows, README/AGENTS ve build asset dosyalarında; süreç motoru yok.
- suite/suite/headless_provider; arama `(?i)workflow|transition|process`: 0 eşleşme.
- frappe (dist/locale hariç); arama `workflow_data|@vue-flow|vueflow`: Workflow Builder Vue Flow kullanıyor; workflow_data JSON string olarak kaydediliyor.
- source (dist/locale hariç); arama `(?i)automation[_ ]flow|flow_definition|state[_ ]machine`: frappe automation_flow DocType ve automation_engine bulundu; alanları trigger/filters/actions, BPMN değil.

Sınır: Yalnızca yerel snapshot kaynağı okundu: frappe@adf1fd0c, suite commit bilinmiyor. Komut veya test çalıştırılmadı; functionalAcceptance not_run.; BPMN yokluğu yalnızca bu kurulu iki uygulama için geçerli; global ekosistem yokluğu iddia edilmiyor. ERPNext/HRMS kurulu değil ve değerlendirilmedi.; Automation Flow ve automation_engine yalnızca alan düzeyinde incelendi; tam yürütme semantiği okunmadı.; headless_provider yerel pilot ek koddur, upstream değil. Suite Vue frontend'i, seçilen React/AntDesign istemcisinden ayrıdır.

Temporal workflow: `saas-recheck-20261015t073528z-013`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### workflow-6 — Bekleme, süre aşımı, yeniden başlatma ve telafi adımları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream-native Frappe kaynağında (frappe/frappe/automation_engine ve automation doctype'ları) Automation Flow motoru var; önceki 'unknown' değerlendirmesi geçersiz. Bulunanlar: (1) Bekleme: Wait adımı (runner.py _begin_wait/schedule_wait) resume_run ve resume_from_idx alanlı bir Automation Trigger Queue satırı açar. Devam ederken aynı Automation Run, actions_snapshot ve run_state (step_outputs/records/branches) geri yüklenir. (2) Süre aşımı: WaitForEvent adımı, Automation Event Subscription kaydı ve timeout_value/timeout_unit ile çalışır. Olay gelmezse get_wait_outcome aboneliği 'Timed Out' yapar ve sonucu event bağlamına koyar. Webhook eyleminde HTTP timeout var (en çok 120 sn). StopAutomation ile bir eylem akışı park edebilir. (3) Kesinti sonrası devam ve yeniden deneme: drainer satırları FOR UPDATE SKIP LOCKED ile alır. Takılı Running satırlarını requeue_stale_running Pending'e döndürür; bu, hooks.py'deki drain_due zamanlayıcısına bağlıdır. _settle_escaped_row hatalı satırı attempt/max_attempts sınırına kadar yeniden dener. TimestampMismatchError olursa adım bir kez daha denenir. Her adımın kendi savepoint ve geri alması var. Ardışık hatalarda devre kesici akışı devre dışı bırakır. (4) Çift yan etki koruması: işlemsel olmayan adım çalışmadan önce mark_effects_delivered Redis'e 24 saat TTL'li bir işaret yazar. İşaretli satır baştan tekrar oynatılmaz, Failed yapılır. Run ve adım durumları kalıcıdır. Suite'teki 'compensation' eşleşmeleri motordan ayrı ve alana özgüdür (suite/drive/webdav/put.py _Compensation yalnız dosya yükleme telafisidir). suite/headless_provider (yerel pilot) içinde workflow, wait veya timeout sözleşmesi yok.

Eksik: Telafi adımı yok: compensation/undo adım türü, hatada ters sırada geri alma ve telafi sonucu ile sahibinin kaydı motor kodunda bulunmadı (yalnız DB savepoint geri alması var; dış yan etki geri alınmıyor).; Dış yan etkiler için uçtan uca idempotency anahtarı yok: webhook isteğine idempotency anahtarı eklenmiyor. Çift çalışma koruması yalnızca 24 saat TTL'li Redis işaretine dayanıyor; TTL dolarsa veya Redis kaybolursa koruma ortadan kalkar.; Yan etkisi teslim edilmiş başarısız bir run'ı Failed adımdan güvenle sürdürecek bir yeniden başlatma API'si yok. api.py yalnız run_manually ve trial_run içeriyor; bunlar yeni run başlatır.; Wait adımının kendi için bir üst süre veya iptal politikası yok (WaitForEvent dışında). Bekleyen run'ı iptal edecek API de bulunmadı.; headless_provider ile Automation Run/Wait/timeout durumunu React/AntDesign istemcisine açan bir sözleşme yok.

Sonraki somut adım: Yeni motor yazmadan, mevcut automation_engine üzerinde şu sırayla ilerle: 1) process-step--implementation-scale kapsamında mevcut Wait/WaitForEvent/resume/effects-mark davranışını kanıtlayan dar bir RED/GREEN testi seç (mevcut test_runner/test_drainer testlerini oku, yeniden kullan). 2) Webhook eylemine run+step_key'den türetilen deterministik bir idempotency başlığı ekle; dayanıklılık için kalıcı effects kaydını Redis TTL yerine queue/run satırında tut. 3) Ancak bundan sonra telafi adımını tasarla: adım snapshot'ına compensation alanı ekle, hatada ters sırada çalıştır ve sonucu Automation Run Step'e Compensated/Failed olarak sahibiyle yaz. 4) En son headless_provider'a salt okunur bir run-durum sözleşmesi ekle. Mevcut bağımlılıklar (process-definition--contract, outbox--contract, audit-envelope--contract) korunur.

Önerilen bağımlılık/sıra: process-definition--contract; process-definition--schema; process-definition--implementation; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract; process-step--implementation-scale. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `process-definition--implementation-scale`.

Kaynak kanıtı:

- `frappe/frappe/automation_engine/runner.py:242` — `if step_type == "Wait":`
- `frappe/frappe/automation_engine/events.py:68` — `subscription.db_set("status", "Timed Out", update_modified=False)`
- `frappe/frappe/automation_engine/drainer.py:319` — `"""Flip Running rows stuck past the claim timeout back to Pending"""`
- `frappe/frappe/automation_engine/drainer.py:171` — `{"attempt": attempt, "status": "Failed" if exhausted else "Pending"},`
- `frappe/frappe/automation_engine/runner.py:388` — `mark_effects_delivered(context["queue_row"].name)`
- `frappe/frappe/hooks.py:262` — `"frappe.automation_engine.drainer.drain_due",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, tüm kök); arama `(?i)automation.?flow|class Automation|automation_step`: frappe/frappe/automation_engine/* ve automation doctype'ları (automation_flow, automation_run, automation_trigger_queue, automation_event_subscription) bulundu; suite'te motor yok.
- frappe/frappe/automation_engine (testler hariç); arama `(?i)wait|timeout|time_out|resume|retry|retries|idempot|compensat|rollback|delay`: Wait/WaitForEvent, timeout, resume, retry ve rollback var; idempot ve compensat için motor kodunda eşleşme yok.
- source (frappe + suite; py/js/ts/tsx/vue/json); arama `(?i)compensat|saga|undo_step|rollback_action|idempotency.?key|retry_run|rerun|re_run|restart_run|resume_run\(`: Workflow telafisi veya idempotency anahtarı yok. Yalnız suite/drive/webdav/put.py içinde alana özgü _Compensation ile patch testlerinde 'rerun' var.
- suite/**/headless_provider/**; arama `(?i)automation|wait|timeout|compensat|retry|idempot`: Yalnız şema advisory lock için LOCK_WAIT_SECONDS/QueryTimeoutError var; workflow sözleşmesi yok.
- frappe/frappe/automation_engine/api.py; arama `^def |@frappe.whitelist`: Whitelist edilmiş fonksiyonlar: get_automation_capabilities, validate_action_params, get_param_options, run_manually, get_runs, trial_run. Retry, resume veya cancel API'si yok.
- frappe/frappe/automation/doctype/*.json; arama `fieldname/options içinde status|resume|attempt|Waiting|Timed Out|Running`: Run: Running/Waiting/Success/Partially Failed/Failed/Skipped; Subscription: Waiting/Matched/Timed Out/Cancelled; Queue: attempt, resume_run, resume_from_idx; Settings: max_attempts. Compensated durumu yok.
- frappe/frappe/hooks.py; arama `automation_engine\.(drainer|scheduler)`: drain_due, process_cron, process_date_based ve purge_queue zamanlayıcıya bağlı.

Sınır: Yalnız kaynak okundu. Hiçbir test veya komut çalıştırılmadı; functionalAcceptance=not_run.; Kaynak Redis TTL, kilit ve zamanlayıcı davranışının deploy edilmiş runtime'da çalıştığını kanıtlamaz.; core.py webhook eyleminin ve test dosyalarının tamamı satır satır okunmadı; idempotency başlığının yokluğu grep ile sınırlı olarak doğrulandı.; suiteCommit bilinmiyor. headless_provider yerel pilot ek koddur, upstream-native değildir.; ERPNext/HRMS kurulu değil, değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-014`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### workflow-7 — Durum geçişinin ilgili iş modülünün kurallarıyla doğrulanması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

apply_workflow alanı Document üzerinden set ediyor. Save/submit çağrısı kesitin dışında kalıyor, bu yüzden controller doğrulamasına ulaştığı burada kanıtlanamıyor. Koşullar safe_eval ile değerlendiriliyor. Suite'te frappe.db.set_value kullanımı, controller'ı atlayan doğrudan yazım yolları olduğunu gösteriyor. Talimat, durum alanının bu yollarla değiştirilmesini yasaklamıyor.

Eksik: Durum alanının yalnızca apply_workflow ile değişeceği kuralı yok; db.set_value ve job yollarının yasaklanması yazılmamış.; Modüle özel geçiş kurallarının nereye yazılacağı (controller validate, transition condition ya da hook) belirlenmemiş.; apply_workflow'un save/submit kısmı v17 kaynağında doğrulanmamış (kesit kısmi).; ERPNext/HRMS kurulu değil; modül kuralları için yalnızca Frappe ve Suite controller'ları kapsamda.

Sonraki adım önerisi: native-workflow--implementation görevine şunları ekle: durum alanını değiştirmenin tek yolu apply_workflow'tur; doğrulamalar controller validate içinde yapılır; ignore_permissions ve db.set_value bu yolda yasaktır. apply_workflow'un 181. satırdan sonraki kısmını kaynakta oku.

Mevcut birincil görev: `native-workflow--implementation`. Kaynak: `frappe/frappe/model/workflow.py:100`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `frappe/frappe/api/v2.py:267`.

#### rules-1 — ECA (Event–Condition–Action — olay–koşul–eylem) kural motoru.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var, ancak 'seçilen release' v17.0.0-dev (adf1fd0c) ile eşlenmemiş. Yerel kaynakta Notification DocType olay+koşul+eylem üçlüsünü sunuyor; eylem tarafı yalnız bildirim kanallarıyla sınırlı. Server Script ise doc event bağlamında commit/rollback kısıtıyla çalışıyor. Beta Automation Flow bu alıntılarda görünmüyor; yerelde var olup olmadığı bilinmiyor.

Eksik: Automation Flow'un yerel v17 kaynakta bulunup bulunmadığı ve dosya yolu doğrulanmamış; belge URL'si release kanıtı sayılmaz; 'Commit sonrası çalışma' için mekanizma tanımlı değil (after-commit enqueue mi, scheduler mı?); Server Script'in varsayılan olarak kapalı olduğu (common_site_config ile açılıyor) ve bunun SaaS'ta açılıp açılmayacağı kararı yok; Notification + Server Script ile app tabanlı motor arasındaki seçim ölçütü ve GenUI kayıtlarından ayrım sınırı yazılmamış

Sonraki adım önerisi: automation-rule--implementation kaydına üç not eklenmeli: (1) adf1fd0c kaynağında Automation Flow DocType envanteri çıkarılsın, (2) yoksa ECA önce Notification event/condition modeli üzerine kurulsun, (3) eylemler commit sonrasında kuyruğa alınarak çalışsın. Server Script'i açma kararı ayrı bir güvenlik kararı olarak kaydedilmeli.

Mevcut birincil görev: `automation-rule--implementation`. Kaynak: `frappe/frappe/email/doctype/notification/notification.py:43`; `frappe/frappe/email/doctype/notification/notification.py:41`; `frappe/frappe/utils/safe_exec.py:88`; `frappe/frappe/utils/safe_exec.py:115`.

#### rules-2 — Koşul/eylem kataloğu; gruplama, öncelik ve kapsam.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (deterministik sıra, izin dışı eylemin kataloğa girmemesi) anlamlı. Ancak katalog sözleşmesi, öncelik alanı ve kapsam (tenant/DocType/rol) tanımlı değil. Yerelde koşul türleri (Python/Filters) ve sabit kanal listesi var; gruplama ve öncelik primitive'i bu alıntılarda görünmüyor.

Eksik: Eşit öncelikte bağı bozacak deterministik sıralama anahtarı tanımsız; Katalogdaki her eylemin hangi whitelisted metoda ve has_permission ptype'ına bağlanacağı belirtilmemiş; Kapsam boyutları (site, DocType, rol, kullanıcı) ve GenUI capability registry'den ayrım sınırı yazılmamış; Python koşul türünün (safe_eval) kullanıcıya açılıp açılmayacağı, yoksa yalnız Filters mı kullanılacağı belirsiz

Sonraki adım önerisi: Görev kaydına şu kararlar eklenmeli: eylem kataloğu yalnız whitelisted metotlardan oluşsun ve her eylem frappe.permissions.has_permission ile ptype'a bağlansın. Sıralama (priority, name) olsun. Kullanıcı tanımlı koşullar ilk aşamada yalnız Filters türüyle sınırlansın.

Mevcut birincil görev: `automation-rule--implementation`. Kaynak: `frappe/frappe/email/doctype/notification/notification.py:107`; `frappe/frappe/permissions.py:82`; `frappe/frappe/api/v2.py:68`.

#### rules-3 — Kural çakışması, döngü ve tekrar tetikleme koruması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni ölçülebilir bir hedef koyuyor (sınırlı zincir, yinelenen olayda ikinci dış etki yok). Fakat derinlik sınırı, idempotency anahtarı ve bunun sorumlusu tanımsız. Yerelde yalnız dağınık primitive'ler var: safe_exec iç içe sayaç bayrağı, doc event'te commit kısıtı ve Drive'a özel exists tabanlı tekilleştirme. Genel döngü veya çakışma koruması alıntılarda görünmüyor.

Eksik: Zincirleme tetiklemede derinlik limiti ve aşıldığında ne olacağı (hata mı, sessiz durma mı) tanımsız; Dış etkiler (webhook/e-posta) için idempotency anahtarının bileşimi belirtilmemiş; in_safe_exec bir yeniden giriş sayacı; döngü koruması sayılamaz. Bu ayrım talimatlarda yok; Drive tekilleştirmesi app'e özel; genel motor için yeniden kullanılabilirliği değerlendirilmemiş

Sonraki adım önerisi: Görev kaydına iki şey yazılmalı: request/job bazında bir derinlik sayacı (frappe.flags benzeri) ile (rule, doc, event, modified) idempotency anahtarı. 'Birbirini tetikleyen iki kural' ve 'aynı olay iki kez' kontrolleri ortak insan bütçesindeki 3 senaryodan birine aday olarak işaretlenmeli; şimdi yazılmamalı.

Mevcut birincil görev: `automation-rule--implementation`. Kaynak: `frappe/frappe/utils/safe_exec.py:168`; `frappe/frappe/utils/safe_exec.py:116`; `suite/suite/drive/api/notifications.py:124`.

#### rules-4 — Kuralları örnek veriyle deneme ve sonucu açıklama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni (kalıcı kayıt veya webhook etkisi bırakmama, adım bazında açıklama) net. Yerelde Notification için gönderim yapmayan önizleme metotları var: koşul sonucu, konu ve mesaj. Automation Flow'un rollback yapan Test Run özelliği alıntılarda görünmüyor. Headless deneme ekranı için API sözleşmesi tanımlı değil.

Eksik: preview_meets_condition yalnız Evet/Hayır veya hata metni döndürüyor; adım bazında yapılandırılmış açıklama şeması yok; Dış etkilerin (webhook, e-posta kuyruğu) deneme sırasında nasıl bastırılacağı ve rollback garantisi yazılmamış; Yerel v17'de Test Run'ın varlığı doğrulanmamış; React/Ant Design deneme ekranı için endpoint ve yanıt sözleşmesi ile ui-family-38 bağımlılığı tanımsız

Sonraki adım önerisi: Görev kaydına deneme sözleşmesi eklenmeli: istekte örnek kayıt adı; yanıtta her koşul için sonuç, her eylem için 'çalışacaktı' bilgisi ve sıfır yan etki. Mevcut preview_* metotları referans alınsın. Test Run'ın yerel kaynakta varlığı doğrulanmadan ona bağımlılık kurulmasın.

Mevcut birincil görev: `automation-rule--implementation`. Kaynak: `frappe/frappe/email/doctype/notification/notification.py:98`; `frappe/frappe/email/doctype/notification/notification.py:113`; `frappe/frappe/email/doctype/notification/notification.py:105`.

#### rules-5 — Kural sürümü, zaman aralığı, yetki sınırı ve çalışma kotası.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Değerlendirme absent/build ve kabul metni anlamlı. Ancak sürümün neyi kapsadığı, zaman aralığının saat dilimi semantiği ve kota birimi (çalışma/eylem/dış çağrı) tanımsız. Yerelde ilgili primitive'ler var ama bütüncül bir ürün yok: zamanlayıcı tabanlı olaylar ve son çalışma zamanı, en az 10 dakikalık scheduler aralığı, istek başına 200 kayıt sınırı ve rol tabanlı izin.

Eksik: Kural sürümünün izlenmesi için Frappe'nin yerleşik değişiklik takibinin (Version) kullanılıp kullanılmayacağı belirtilmemiş; Zaman aralığı alanları ve zaman dışı durumda davranış (atla mı, ertele mi) tanımsız; Kota birimi, süresi ve aşıldığında yan etkisiz durmanın nasıl kaydedileceği tanımsız; Yetki sınırı için kural sahibi mi, tetikleyen kullanıcı mı esas alınacak, kararı yok

Sonraki adım önerisi: Kapsam koşullu olduğundan önce MVP içi mi, dışı mı kararı verilmeli. Kapsama alınırsa görev kaydına şu tanımlar eklenmeli: yerleşik Version izleme, valid_from/valid_to, kural başına çalışma sayacı ve tetikleyen kullanıcının yetkisiyle çalışma. Yeni bir görev kaydı açılmamalı.

Mevcut birincil görev: `automation-rule--implementation`. Kaynak: `frappe/frappe/email/doctype/notification/notification.py:46`; `frappe/frappe/email/doctype/notification/notification.py:171`; `frappe/frappe/client.py:246`.

#### approvals-1 — Onay sistemi, işlemsel doğrulama ve approval chain (onay zinciri).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel v17-dev kaynakta durum makinesi var: geçiş yalnız mevcut durumdan ve izinli rolle yapılabiliyor. Bu yüzden iki seviyeli sıralı onay, yapılandırılmış bir Workflow ile kendiliğinden sağlanıyor. apply_workflow whitelist'te olduğu için headless çağrılabilir. Talimatlar ise yalnız version-15 kaynaklarına ve kurulu olmayan ERPNext belgesine dayanıyor. Hedef DocType, headless eylem sözleşmesi ve kimlik/rol eşlemesi tanımlı değil.

Eksik: Kaynaklar version-15 ve ERPNext docs'a bağlı; yerel Frappe 17.0.0-dev (adf1fd0c) eşlemesi yok.; Onay zincirinin hangi DocType'lara uygulanacağı (conditional scope) ve standart/custom DocType ayrımı belirtilmemiş.; Yazma yolları envanteri yok: apply_workflow, imzalı e-posta bağlantısı (apply_action/confirm_action), genel REST save ve v2 execute_doc_method. 'API geçişi aynı kurala uymalı' kabulü bunları kapsamıyor.; Keycloak kimliğinin Frappe Role/transition.allowed alanına nasıl eşleneceği tanımsız.; Document.save içindeki workflow doğrulaması bu excerpt'te yok; genel save yolunun aynı kuralı uygulayıp uygulamadığı bilinmiyor.

Sonraki adım önerisi: approval-chain--implementation altında yerel model/workflow.py ve Document.save'in workflow doğrulamasını v17 kaynağından okuyun. Her yazma yolunu tek tabloda 'aynı kural mı uygulanıyor' sorusuyla eşleyin. Headless yüzey için yalnız get_transitions/apply_workflow'u sarmalayan, ignore_permissions kullanmayan bir sözleşme yazın.

Mevcut birincil görev: `approval-chain--implementation`. Kaynak: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:118`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:132`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:165`; `frappe/frappe/api/v1.py:61`.

#### approvals-2 — Sıralı/paralel onay; kişi, rol, tutar ve koşul bazlı yönlendirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Tutar ve koşula göre yönlendirme yerel kaynakta mevcut: geçiş koşulu safe_eval ile değerlendiriliyor (doc.grand_total > 0 örneği). Rol bazlı sıralı yönlendirme de mevcut. Ancak geçişin izinli alanı yalnız Role'e bağlanıyor ve Workflow Action rol kümesi için oluşturuluyor. DocType başına tek aktif Workflow var. Bu yüzden kişi bazlı yönlendirme ve paralel onay sayısı (quorum) yerel kaynakta yok. Talimat paralel quorum için veri modeli ve karar kaydı tanımlamıyor.

Eksik: Paralel onay için karar sayacı, 'tümü/çoğunluk/N' kuralı ve bu kuralların saklanacağı yer tanımlı değil.; Kişi bazlı onaycı için rol dışı atama kaynağı tanımsız: Workflow Action.user alanı mı, yeni bir DocType mı? ERPNext/HRMS hiyerarşisi kurulu değil.; Koşul ifadelerinin kimin yazacağı ve hangi yetkiyle tanımlanacağı belirsiz. Yönetici dışında Python koşulu düzenlemeye izin verilmemesi gerektiği belirtilmemiş.; Sıralı/paralel durumların tek aktif Workflow ile nasıl birleşeceği belirtilmemiş.

Sonraki adım önerisi: approval-step--implementation için paralel adımı yerel Workflow'u kopyalamadan tasarlayın. Workflow tek durum alanını korusun; quorum'u yalnız sunucuda tutulan bir karar kaydı kontrol etsin. Bunu bir transition koşuluna bağlayan minimal bir model belirleyin ve tutar eşiğini yerel condition alanıyla belgelendirin.

Mevcut birincil görev: `approval-chain--implementation`. Kaynak: `frappe/frappe/model/workflow.py:100`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:57`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:114`; `frappe/frappe/model/workflow.py:37`.

#### approvals-3 — Vekil onaylayıcı, süre aşımı ve üst yetkiliye yönlendirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yapı taşları var: açık/tamamlanmış Workflow Action kaydı, gizli user alanı ve transition_tasks/workflow_methods kancaları. Vekalet, süre aşımı ve üst yetkiliye yükseltme zinciri ise incelenen excerpt'lerde yok. Zamanlayıcı (scheduler) bu excerpt'te görünmüyor; bu durum yalnız 'görülmedi' anlamına geliyor. Kabul ölçütü var, fakat veri modeli, SLA tanımı ve 'üst yetkili' kaynağı belirtilmemiş.

Eksik: Vekalet kaydı tanımsız: kim, kimin yerine, hangi DocType/rol için, hangi tarih aralığında. Vekilin öz-onay kuralına takılıp takılmayacağı da belirsiz.; Süre aşımının neye göre ölçüleceği tanımsız: Workflow Action oluşturma zamanı mı, durum giriş zamanı mı? İş günü/takvim kuralı yok.; 'Üst yetkili' hiyerarşisinin kaynağı yok. HRMS/ERPNext (ör. reports_to) kurulu olmadığı için kullanılamaz.; Yükseltmenin yetki kontrolü tanımsız: has_permission/rol üzerinden mi yapılacak? Yükseltmenin audit kaydı da belirtilmemiş.; Yerel v17 scheduler hook sözleşmesi doğrulanmamış.

Sonraki adım önerisi: approval-chain--implementation kapsamında önce kapsam dışı sınırı yazın: HRMS olmadan hiyerarşi kaynağını belirleyin. Ardından vekalet ve SLA için minimal bir veri sözleşmesi tanımlayın. Yükseltme, Workflow Action'ın permitted_roles mantığını genişletmeli, atlamamalı. Scheduler kancasını yerel hooks/scheduler kaynağından doğrulayın.

Mevcut birincil görev: `approval-chain--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:46`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:47`; `frappe/frappe/model/workflow.py:152`; `frappe/frappe/workflow/doctype/workflow/workflow.py:161`.

#### approvals-4 — Reddetme, geri gönderme, geri çekme ve gerekçe kaydı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Ret ve geri gönderme, ayrı Workflow Action Master eylemleri ve geçişleri olarak yerel kaynakta modellenebiliyor. Her eylemin yetkisi ayrı bir transition rolüne bağlanabiliyor. Workflow Action, işlemi tamamlayan kullanıcıyı ve rolü saklıyor. Ancak apply_workflow imzası yalnız doc ve action alıyor; gerekçe parametresi yok. Geri çekme rol bazlı geçişlerle sınırlı; sahip (owner) bazlı izin yok. Talimat gerekçenin nerede ve hangi alanda tutulacağını tanımlamıyor.

Eksik: Gerekçenin saklanacağı yer tanımsız: Comment, ek alan veya karar kaydı. Hangi eylemlerde zorunlu olduğu da belirtilmemiş.; Geri çekme yetkisi tanımsız: talep edene ait, ancak geçişler yalnız Role'e bağlanabiliyor.; 'Geçmiş korunmalı' için hedef DocType'ta track_changes/Version kullanımı belirtilmemiş. Excerpt'teki track_changes yalnız Workflow DocType'ının kendisine ait.; Gerekçe kontrolünün headless API'de sunucu tarafında yapılması gerektiği yazılmamış; şu haliyle yalnız UI'da zorunlu tutulabilir.

Sonraki adım önerisi: approval-decision--implementation için gerekçenin kalıcı alanını ve hangi eylemlerde zorunlu olduğunu belirleyin. Bu zorunluluğu apply_workflow'u çağıran sunucu tarafı sarmalayıcıda reddedilecek biçimde tanımlayın. Geri çekmeyi talep eden ile sahip (owner) ilişkisine bağlayan politikayı yazın.

Mevcut birincil görev: `approval-decision--implementation`. Kaynak: `frappe/frappe/model/workflow.py:119`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:38`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:41`; `frappe/frappe/workflow/doctype/workflow/workflow.json:140`.

#### approvals-5 — Onay beklerken kayıt değişikliği ve yeniden onay gereksinimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynak durum bazında düzenleme yetkisini 'Only Allow Edit For' rolüyle sınırlıyor. E-posta onay bağlantısı, belge değiştiyse yalnız uyarı gösteriyor (last_modified ile modified karşılaştırması). Kritik alan değiştiğinde eski kararı geçersiz kılan veya durumu geri alan bir mekanizma görülmedi. Talimat 'sürüme bağlanmalı' diyor, fakat kritik alan listesini, sürüm kaynağını ve geri dönülecek durumu tanımlamıyor.

Eksik: DocType başına kritik alan listesi ve bu listenin nerede tutulacağı tanımsız.; Kararın bağlanacağı sürüm tanımsız: modified, Version kaydı veya içerik hash'i olabilir.; Geçersiz kılmada hangi Workflow durumuna dönüleceği ve açık Workflow Action'ların ne olacağı belirtilmemiş.; apply_action yalnız uyarı veriyor; confirm_action yolu eski kararı reddetmiyor. Bu fark kabul ölçütünde yok.

Sonraki adım önerisi: approval-chain--implementation altında kararın bağlanacağı sürüm anahtarını ve kritik alan kümesini tanımlayın. Kayıt sırasında kritik alan değişirse onayın sıfırlanması kuralını yerel durum alanı ve allow_edit ile uyumlu biçimde belirleyin. Değişikliği sessizce uygulamak yerine yeniden onay durumuna açıkça geçin.

Mevcut birincil görev: `approval-chain--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow_document_state/workflow_document_state.json:64`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:150`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:153`.

#### approvals-6 — Talep edenin kendi işlemini onaylamasını sınırlama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta allow_self_approval alanı var. apply_workflow, has_approval_access başarısız olursa 'Self approval is not allowed' hatası veriyor. E-posta onay yolu da apply_workflow üzerinden geçiyor. Ancak alanın varsayılan değeri 1, yani öz-onay varsayılan olarak açık. has_approval_access'in yerel v17 gövdesi excerpt'te yok; owner karşılaştırması ve Administrator istisnası yalnız v15 notuna dayanıyor. has_permission Administrator'a her zaman izin veriyor. Kabul ölçütü güçlü; ancak 'talep eden' alanı tanımsız ve v17 eşlemesi eksik.

Eksik: has_approval_access yerel v17'de doğrulanmamış; v15 notu esas alınmış.; Varsayılan allow_self_approval=1; her geçişte 0 yapılması talimatta zorunlu tutulmamış.; 'Talep eden'i owner'dan ayıran alan veya kaynak tanımsız.; Genel REST/save (v1 update_doc, client.save) ve toplu geçiş yollarının öz-onay kontrolünü çağırıp çağırmadığı excerpt'te görünmüyor.; Administrator ve servis hesabı istisnaları için hangi audit kaydının tutulacağı belirtilmemiş.

Sonraki adım önerisi: approval-chain--implementation için yerel model/workflow.py içindeki has_approval_access ve toplu onay fonksiyonlarını okuyun. Öz-onay kontrolünü talep eden alanına genişletecek tek bir sunucu tarafı kontrol noktası belirleyin. Workflow tanımlarında allow_self_approval=0'ı politika olarak zorunlu kılın.

Mevcut birincil görev: `approval-chain--implementation`. Kaynak: `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:64`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:65`; `frappe/frappe/model/workflow.py:136`; `frappe/frappe/model/workflow.py:137`; `frappe/frappe/permissions.py:109`.

#### jobs-1 — Cron (periyodik görev tetikleme) ve schedule (zamanlama) yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta yerel cron/zamanlama altyapısı var: hook scheduler_events, Scheduled Job Type ile croniter doğrulaması, rq_job_id ile tekilleştirme, scheduler heartbeat ve pause durumu. Ancak cron_format/frequency salt okunur ve hook ile tanımlanıyor; yönetim yalnız System Manager rolüne açık. İzinli headless zamanlama yönetimi yerelde yok. Talimatın hedefi ve kabul ölçütü anlamlı, fakat hangi mekanizmanın kullanılacağı ve v17-dev eşlemesi belirtilmemiş.

Eksik: Kaynak seçimi tanımlı değil: hooks scheduler_events, Scheduled Job Type mı yoksa v17-dev automation_engine process_cron mu kullanılacak? İki ayrı cron yolu var.; cron_format ve frequency salt okunur. Headless akışta hangi alanların değişebileceği (stopped, queue) ve hangilerinin kod/hook sürümü gerektirdiği yazılmamış.; Kiracı tanımı (site mi, site içi tenant mı) eksik. Scheduler siteler üzerinde dönüyor, site içi tenant bağlamı yok.; Worker kapalı durumunun nasıl izleneceği tanımsız. Kaynakta görülen yalnız scheduler heartbeat; worker sağlık sözleşmesi yok.; get_next_execution içinde maintenance_offset hesaplanıyor ama dönüş değerine eklenmiyor. Bu yalnız kaynak gözlemi, çalıştırılarak doğrulanmadı.; Kaynak bağlantısı genel docs URL'i; v17.0.0-dev ve adf1fd0c kaynağına eşleme yok.

Sonraki adım önerisi: native-schedule--implementation görevine şu karar notu eklenmeli: tenant=site eşlemesi; Scheduled Job Type + scheduler_events yolu birincil, automation_engine kapsam dışı ya da ayrı. Headless yüzey yalnız mevcut whitelisted aksiyonları ve stopped/queue alanlarını DocType izniyle sunmalı. Kabul testi tek bir Cron job ile yapılmalı (rq_job_id tekilliği + Scheduled Job Log durumu + is_scheduler_process_running).

Mevcut birincil görev: `native-schedule--implementation`. Kaynak: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:67`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:114`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:71`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:145`; `frappe/frappe/utils/scheduler.py:93`; `frappe/frappe/utils/scheduler.py:186`; `frappe/frappe/automation_engine/scheduler.py:18`; `suite/suite/hooks.py:289`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:154`.

#### jobs-2 — İş kuyruğu, öncelik, zaman aşımı ve kiracı başına eşzamanlılık.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta default/short/long kuyruk doğrulaması, conf.workers ile özel kuyruklar, iş başına timeout, at_front önceliği, global MAX_QUEUED_JOBS ve starvation eşiği var. Kaynak parçalarında kiracı başına eşzamanlılık sınırı görülmedi. Kabul ölçütü ölçülebilir, fakat sınırın nerede uygulanacağı ve kiracı kimliği tanımsız.

Eksik: Kiracı kimliği ve sınır noktası (enqueue sarmalayıcısı mı, worker tarafı mı) belirtilmemiş. MAX_QUEUED_JOBS kiracı başına değil, kuyruk genelinde.; 'Uzun iş kısa kuyruğu bloke etmemeli' ölçütü worker topolojisine bağlı: short kuyruğa ayrılmış worker gerekiyor. Bu dağıtım şartı Hüseyin Cengiz'in devir notunda yer almıyor.; at_front ve timeout değerlerinin hangi iş sınıfına verileceğine dair politika tablosu yok.; Görev sahipliği belirsiz: jobs-2/3/4 aynı job-state--implementation görevine bağlı, ama kuyruk politikası ile iş durumu sözleşmesi ayrılmamış.

Sonraki adım önerisi: job-state--implementation altında, yeni görev açmadan, şu sözleşme yazılmalı: iş sınıfı→kuyruk/timeout tablosu, tenant=site anahtarı ve frappe.enqueue çevresinde mevcut Redis ile tenant sayacı. Her tenant için kuyruk açılmamalı. Short kuyruk için ayrılmış worker şartı da dağıtım notuna eklenmeli.

Mevcut birincil görev: `job-state--implementation`. Kaynak: `frappe/frappe/utils/background_jobs.py:44`; `frappe/frappe/utils/background_jobs.py:47`; `frappe/frappe/utils/background_jobs.py:252`; `frappe/frappe/utils/background_jobs.py:254`; `frappe/frappe/utils/background_jobs.py:653`; `frappe/frappe/core/doctype/rq_job/rq_job.py:310`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:75`.

#### jobs-3 — Yeniden deneme, artan bekleme ve başarısız işler kuyruğu.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

enqueue, RQ retry parametresini aktarıyor (rq==2.6.1 sabit). Başarısız işler RQ failed registry'de 7 gün ve en fazla 1000 kayıt tutuluyor; Scheduled Job Log Failed kayıtları 90 gün sonra temizleniyor. Bu yapı kalıcı bir dead-letter değil. Kritik risk: worker RQ scheduler'ı her zaman kapatıyor. Aralıklı (backoff) retry'ın scheduled registry'den yeniden kuyruğa alınması bu nedenle doğrulanmalı. Talimat bu bağımlılığı anmıyor.

Eksik: with_scheduler=False iken RQ Retry(interval=[...]) ile backoff'un çalışıp çalışmadığı belirsiz. Kaynak parçası yetersiz, çalıştırılarak da doğrulanmadı.; Geçici ve kalıcı hata sınıflandırması, deneme üst sınırı ve backoff dizisi tanımlı değil.; Dead-letter saklama süresi ve sahibi tanımsız. RQ failure TTL ve 1000 limiti, ayrıca remove_failed_jobs toplu silmesi incelenebilirlik ölçütüyle çelişebilir.; Kiracı bağlamının (site) retry sırasında korunması kabul ölçütünde yer almıyor.

Sonraki adım önerisi: Önce kaynakta frappe.enqueue retry yolu ile FrappeWorker scheduler ilişkisi okunmalı. Ardından job-state--implementation'a retry politikası tablosu eklenmeli: hata sınıfı, max deneme, aralıklar. Kalıcı hatalar mevcut Error Log'a ya da izinli bir Frappe DocType'a yazılmalı. Bunun için ayrı kuyruk altyapısı önerilmiyor.

Mevcut birincil görev: `job-state--implementation`. Kaynak: `frappe/frappe/utils/background_jobs.py:258`; `frappe/frappe/utils/background_jobs.py:456`; `frappe/frappe/utils/background_jobs.py:37`; `frappe/frappe/utils/background_jobs.py:38`; `frappe/frappe/core/doctype/rq_job/rq_job.py:281`; `frappe/frappe/core/doctype/scheduled_job_log/scheduled_job_log.py:30`; `frappe/pyproject.toml:72`.

#### jobs-4 — İş iptali, ilerleme, kaldığı yerden devam ve elle yeniden çalıştırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta yalnız System Manager'a açık zorla durdurma (send_stop_job_command) var; UI metni bu işlemi kendisi 'tehlikeli' olarak niteliyor. Scheduled Job Type için Execute ve Skip Next Execution aksiyonları da mevcut. Güvenli noktada iptal, checkpoint/devam ve ilerleme sözleşmesi görülmedi. RQ sonuçları 10 dakika saklanıyor, bu yüzden kalıcı iş durumu yok. Kabul ölçütü doğru, ama idempotency anahtarı ve durum modeli eksik.

Eksik: Kooperatif iptal (iptal bayrağının iş içinde kontrol edilmesi) ile zorla durdurma arasındaki ayrım tanımlanmamış.; Checkpoint/ilerleme kaydının nerede tutulacağı belirsiz. RQ_RESULTS_TTL 10 dakika; kalıcı durum için izinli bir Frappe DocType kararı gerekiyor.; Elle tekrar çalıştırmada başarılı adımların çoğalmasını önleyecek idempotency anahtarı ve job_id tekilleştirme kuralı yazılmamış.; İptal/yeniden çalıştırma yetkisi yalnız System Manager'da. Kiracı yöneticisi için izin modeli ve ui-family-32 ilerleme yüzeyinin API sözleşmesi tanımsız.; İlerleme yayını için kullanılacak realtime yardımcısı kaynak parçalarında görülmedi (unknown).

Sonraki adım önerisi: job-state--implementation için tek bir durum sözleşmesi yazılmalı: kalıcı iş kaydı (DocType izinleri), adım checkpoint'i, cancel_requested bayrağı ve idempotency anahtarı. Zorla durdurma (stop_job) yalnız son çare olarak bırakılmalı. ui-family-32 bu sözleşmeyi salt okuma/aksiyon olarak tüketmeli.

Mevcut birincil görev: `job-state--implementation`. Kaynak: `frappe/frappe/core/doctype/rq_job/rq_job.py:7`; `frappe/frappe/core/doctype/rq_job/rq_job.py:32`; `frappe/frappe/core/doctype/rq_job/rq_job.js:16`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:7`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:13`; `frappe/frappe/utils/background_jobs.py:39`; `frappe/frappe/core/doctype/rq_job/rq_job.py:25`.

#### jobs-5 — Tekrarlı çalıştırmada mükerrer etkiyi önleme ve görev kilidi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni doğru hedefi koyuyor: iki worker ya da tekrar çalıştırmada tek iş etkisi olmalı, kilit çökmeden sonra serbest kalmalı. Kaynakta yalnız kuyruk düzeyinde tekilleştirme var: Scheduled Job Type sabit bir rq_job_id kullanıyor ve önce kuyrukta var mı diye bakıp sonra ekliyor. Scheduler süreç kilidi ise bench düzeyinde bir FileLock. Bunlar iş etkisini tekilleştirmiyor. Talimatta idempotency anahtarı, etki kaydı ve kilit kapsamı/süresi sözleşmesi yok.

Eksik: İdempotency anahtarı ve etki defteri (effect ledger) sözleşmesi tanımlı değil: hangi job türleri, anahtar neyden türetilir, saklama süresi ne olacak.; Kilidin kapsamı (site/kiracı/kayıt), lease TTL değeri ve çökme sonrası serbest bırakma davranışı belirtilmemiş.; is_job_enqueued yalnız kuyruktaki varlığa bakıyor; 'kontrol et, sonra ekle' yarışı ve retry sonrası ikinci etki kapsanmıyor.; Ana görev job-state--implementation ile ui-family-32 arasındaki sorumluluk sınırı belirsiz.; v17 kaynağındaki uygulama düzeyi kilit yardımcıları bu excerpt'te görünmüyor; bu yüzden unknown.

Sonraki adım önerisi: job-state--implementation içinde site/tenant ve iş anahtarıyla idempotency kaydı tanımla. DB etkisi dedup kaydıyla aynı transaction içinde kesinleşsin; dış etkiler mevcut outbox/inbox sözleşmesine bağlansın. enqueue_after_commit yalnız zamanlama mekanizmasıdır; tek başına kalıcı teslim veya tek etki garantisi değildir. Yerel kilit yardımcısının kapsam/TTL davranışını doğrula ve mevcut job_id tekilleştirmesini koru.

Mevcut birincil görev: `job-state--implementation`. Kaynak: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:113`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:87`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:109`; `frappe/frappe/utils/background_jobs.py:257`; `frappe/frappe/utils/scheduler.py:52`; `frappe/frappe/utils/scheduler.py:64`.

#### jobs-6 — Saat dilimi, yaz saati değişikliği ve kaçırılan tetiklemeler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Cron ayrıştırma var ve sonraki çalışma last_execution'dan hesaplanıyor. Bu, kesintiden sonra kaçırılan tetiklemelerin tek bir çalışmada birleşmesi (coalesce) gibi görünüyor; ancak bu çalışma zamanında doğrulanmadı. Automation engine de yalnız en son tetiklemeyi kuyruğa alıyor. Saat hizası UTC'ye göre yapılıyor, vade karşılaştırması ise now_datetime() ile. Kabul metnindeki 'beklenen sayıda çalışma' tanımsız ve catch-up politikası verilmemiş.

Eksik: Catch-up politikası (coalesce/atla/tekrar oynat) ürün kararı olarak yazılmamış. Native davranış coalesce'e benziyor; bu davranışla eşleştirilmeli.; DST ileri/geri geçişinde duvar saati cron'unun kaç kez çalışacağı ve croniter'ın naive datetime davranışı hakkında talimat yok.; Saat dilimi kaynağı belirtilmemiş: sistem saat dilimi mi, kiracı saat dilimi mi? UTC tick ile sistem saat dilimine göre vade arasındaki fark ele alınmamış.; Kaynak gözlemi: maintenance_offset 153. satırda ekleniyor ama 154. satırda dönen değerde kullanılmıyor. Bunun etkisi doğrulanmadı.; Skip Next Execution eylemi var, ancak talimat bu eylemi politikaya bağlamıyor.

Sonraki adım önerisi: native-schedule--implementation görevine üç kararı ekleyin: catch-up = coalesce (native ile eşleşiyor), DST çift saatte tek çalışma, saat dilimi = sistem saat dilimi (kiracı TZ gerekiyorsa açıkça işaretlenmeli). Ardından bu üç senaryoyu ortak test bütçesindeki tek dosyada aday olarak not edin; şimdi test yazmayın.

Mevcut birincil görev: `native-schedule--implementation`. Kaynak: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:149`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:154`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:106`; `frappe/frappe/utils/scheduler.py:107`; `frappe/frappe/automation_engine/scheduler.py:19`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:13`.

#### jobs-7 — Kiracılar arasında adil kuyruk ve kaynak kullanımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta temel parçalar var: global kuyruk tavanı, starvation eşiği, dequeue stratejisi, özel kuyruklar, site sırasının karıştırılması ve site bazlı bakım ofseti. Ancak kiracı başına adil paylaşım garantisi yok. Talimat 'kiracı'nın Frappe site'ı mı yoksa site içi bir kayıt mı olduğunu tanımlamıyor. SLO değeri ve ölçüm yöntemi de verilmemiş.

Eksik: Kiracı modeli (site başına kiracı mı, site içi kiracı mı) bağlanmamış. Adil zamanlama tasarımı tamamen buna bağlı.; Küçük kiracı için bekleme SLO'sunun sayısal değeri, yük profili ve kiracı başına kota/eşzamanlılık sınırı tanımsız.; MAX_QUEUED_JOBS global bir sınır; yoğun kiracı diğerlerinin enqueue çağrılarını başarısız yapabilir. Talimat bunu ele almıyor.; Var olan custom queue/worker ve dequeue strategy seçeneklerinin hangisinin yeniden kullanılacağı belirtilmemiş.

Sonraki adım önerisi: Önce kiracı = site kararını açıkça yazın. Sonra job-state--implementation-scale görevine kiracı başına kuyruk/eşzamanlılık sınırı ve SLO sayısını ekleyin. Mevcut özel kuyruklar ve dequeue strategy yeniden kullanılmalı; yeni altyapı önerilmiyor.

Mevcut birincil görev: `job-state--implementation-scale`. Kaynak: `frappe/frappe/utils/background_jobs.py:44`; `frappe/frappe/utils/background_jobs.py:47`; `frappe/frappe/utils/background_jobs.py:438`; `frappe/frappe/utils/scheduler.py:167`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:124`; `frappe/frappe/core/doctype/rq_job/rq_job.py:310`.

#### jobs-8 — Kullanıcı arka plan işleri merkezi; sayfadan bağımsız ilerleme, sonuç, güvenli iptal ve devam.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: durumlar, sahte yüzde yasağı, iptal/devam, tenant ve indirme yetkisi tanımlı. Ancak native RQ Job yalnız System Manager'a açık, sanal ve periyodik temizlenen bir görünüm. Sonuç TTL'i 10 dakika ve durdurma işlemi 'tehlikeli zorla sonlandırma'. Kullanıcıya ait kalıcı iş kaydının, ilerleme olayının ve kooperatif iptalin sözleşmesi talimatta yok.

Eksik: Kalıcı iş kaydının modeli tanımsız: mevcut native kalıcı kayıtlar mı eşlenecek, yeni DocType mı gerekecek? Data Import, Prepared Report gibi doctypes bu excerpt'te görünmüyor; v17'de doğrulanmalı.; İlerleme olayının sözleşmesi tanımsız: realtime kanal mı polling mi, 'total bilinmiyor' durumu nasıl gösterilecek? Bu excerpt'te ilerleme API'si görünmüyor (unknown).; Güvenli iptal tanımlanmamış: native stop_job zorla sonlandırma yapıyor. Kooperatif iptal ve checkpoint'ten devam sözleşmesi yok.; Sonuç saklama süresi ile RQ_RESULTS_TTL (10 dk) arasındaki fark ve indirme yetkisinin DocType permission'a bağlanması belirtilmemiş.; Headless liste uç noktasının native permissions ile mi, kullanıcı sahipliği ile mi filtreleneceği yazılmamış. System Manager'a özel RQ Job API'si son kullanıcıya açılmamalı.

Sonraki adım önerisi: job-state--implementation-post-mvp kapsamında önce v17 kaynağındaki native kalıcı iş kayıtlarını ve ilerleme yayınlama API'sini envanterleyin. Ardından tek bir iş-kaydı sözleşmesi yazın (owner, tenant, durum, gerçek ilerleme, sonuç dosyası yetkisi, saklama süresi) ve native permissions'a bağlayın. İptal yalnız kooperatif olmalı; RQ Job'un zorla durdurma işlemi kullanıcıya sunulmamalı.

Mevcut birincil görev: `job-state--implementation-post-mvp`. Kaynak: `frappe/frappe/core/doctype/rq_job/rq_job.py:32`; `frappe/frappe/core/doctype/rq_job/rq_job.js:9`; `frappe/frappe/core/doctype/rq_job/rq_job.js:16`; `frappe/frappe/utils/background_jobs.py:39`; `frappe/frappe/core/doctype/rq_job/rq_job.py:25`; `frappe/frappe/core/doctype/rq_job/rq_job.py:304`.

### Bildirim, e-posta ve ortak çalışma

#### email-1 — Transactional email (işlemsel e-posta) ve sistem e-posta şablonları.

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Yerel v17-dev kaynağında Email Queue durum modeli, zamanlanmış flush, yeniden deneme ve Jinja doğrulamalı Email Template doğrudan mevcut. Talimatın hedefi ve kabul ölçütü (kuyruk, hata, yeniden deneme) anlamlı. Ancak kaynak bağlantıları version-15'i gösteriyor ve ürün şablon kataloğu tanımlı değil.

Eksik: Kaynak referansları version-15; yerel 17.0.0.dev0 yollarıyla eşleme yapılmamış; Ürüne ait sistem şablonlarının adı, sahibi ve hangi Email Account ile gönderileceği listelenmemiş; Headless istemcinin kuyruk durumunu ve hatayı hangi izinli uç ile okuyacağı tanımsız; Desk liste eylemi headless sözleşme değildir; Tenant başına gönderen hesabı eşlemesi yok

Sonraki adım önerisi: email-template--implementation kapsamında kaynak bağlantılarını yerel v17 dosyalarına çevirin. Şablon kataloğunu (ad, değişken, gönderen hesap) tek tabloda tanımlayın. Durum ve hata bilgisi için yalnız DocType izinleriyle okunan Email Queue erişimini sözleşme olarak yazın.

Mevcut birincil görev: `email-template--implementation`. Kaynak: `frappe/frappe/email/doctype/email_queue/email_queue.py:77`; `frappe/frappe/email/queue.py:185`; `frappe/frappe/email/queue.py:206`; `frappe/frappe/email/doctype/email_template/email_template.py:36`; `frappe/frappe/email/doctype/email_queue/email_queue_list.js:47`.

#### email-2 — Giriş, kayıt, magic link, doğrulama ve parola kurtarma e-posta senaryoları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe kendi kimlik e-postalarını uyguluyor. Magic link: frappe/frappe/www/login.py içindeki send_login_link süreli ve tek kullanımlık bir anahtar üretiyor (one_time_login_key, cache'te tutuluyor), login_with_email_link şablonuyla e-posta gönderiyor ve hız sınırı uyguluyor. login_via_key anahtarı kullanınca siliyor ve oturumu açıyor. Kayıt ve doğrulama: user.py içindeki sign_up bir Website User oluşturuyor. send_welcome_mail_to_user, new_user şablonuyla /update-password bağlantısını gönderiyor. Parola kurtarma: reset_password, kullanıcının var olup olmadığını sızdırmayan genel bir yanıt veriyor. _reset_password hash'lenmiş anahtarı ve password_reset e-postasını üretiyor. Keycloak: Social Login Key'de hazır bir OIDC sağlayıcı şablonu var (login_via_keycloak redirect). Bu yalnızca Frappe tarafında OIDC girişi sağlıyor; Keycloak tarafındaki e-postaları yönetmiyor. Suite (upstream app kodu, LOCAL PILOT değil) Mail için ikinci, bağımsız bir akış içeriyor: suite/mail/api/account.py içinde signup, OTP ile e-posta doğrulama (verify_otp, resend_otp), create_account ve send_reset_password_link var. Drive'da OTP ile signup/login (drive/api/product.py) ve davet e-postası var. suite/headless_provider (LOCAL PILOT ek kod) yalnızca local fixture kullanıcısı oluşturuyor (send_welcome_email=0). Auth e-postası veya Keycloak sözleşmesi içermiyor.

Eksik: Gereksinimin hedefi olan Keycloak tarafındaki e-postalar (realm, e-posta teması/dil/marka, SMTP, verify-email ve reset-credentials required action'ları) bu kaynakta yok; kaynak bunları kanıtlayamaz.; Keycloak magic link kararı ve sürümü (yerleşik özellik mi, eklenti mi) kaynakta veya talimatta karara bağlanmamış.; Frappe yerel akışlarını (send_login_link/login_via_key, sign_up, reset_password, /update-password) ürün yolunda kapatan veya Keycloak'a yönlendiren bir hook, website_redirects ya da ayar yok.; Suite Mail (signup/OTP/send_reset_password_link) ve Drive (OTP signup/login) yerel kimlik akışlarını Keycloak'a bağlayan veya devre dışı bırakan bir entegrasyon yok. Suite hooks ALLOWED_PATHS listesi /api/method/login ve frappe.core.doctype.user.user.update_password yollarını açık tutuyor.; Headless provider'da kimlik e-postası veya IdP sınırını tanımlayan bir sözleşme yok (örneğin yerel auth rotalarının devre dışı olduğunu bildiren bir capability).; Runtime functionalAcceptance: not_run.

Sonraki somut adım: keycloak-login--contract kapsamında önce şu karar yazılmalı: Keycloak sürümü ve magic link yöntemi; e-posta tema/SMTP sahibi (email-3 ile ilişkisi). Sonra keycloak-login--implementation-mvp içinde en küçük adım şu: Frappe'de Keycloak Social Login Key'i (mevcut provider şablonu) etkinleştiren ayarı tanımla. Ardından yerel auth yüzeyini daraltan tek bir davranışı RED/GREEN ile ekle: System Settings login_with_email_link=0 olsun, Website Settings disable_signup=1 olsun, Mail Settings allow_signup=0 olsun; /login, /signup ve /update-password ile Suite Mail signup/reset istekleri Keycloak'a yönlendirilsin ya da reddedilsin. Doğrulama ve kurtarma e-postaları Keycloak required action'larıyla sağlanmalı. React/AntD istemcisi Suite'in Vue rotalarını değil Keycloak OIDC akışını kullanmalı.

Önerilen bağımlılık/sıra: keycloak-login--contract; keycloak-login--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `keycloak-login--implementation-mvp`.

Kaynak kanıtı:

- `frappe/frappe/www/login.py:137` — `def send_login_link(email: str):`
- `frappe/frappe/core/doctype/user/user.py:1254` — `return 1, _("Please check your email for verification")`
- `frappe/frappe/core/doctype/user/user.py:518` — `self.password_reset_mail(link)`
- `frappe/frappe/integrations/doctype/social_login_key/social_login_key.py:238` — `"redirect_url": "/api/method/frappe.integrations.oauth2_logins.login_via_keycloak",`
- `suite/suite/mail/api/account.py:54` — `def signup(username: str, domain: str, email: str) -> str:`
- `suite/suite/mail/api/account.py:417` — `def send_reset_password_link(user: str) -> str:`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe; arama `def (sign_up|reset_password|send_login_link|login_via_key|update_password|verify_login)\b`: login.py:137 send_login_link, login.py:183 login_via_key, user.py:1205 sign_up, user.py:1261 reset_password, user.py:1003 update_password; ldap_settings reset_password
- suite; arama `(?i)(magic.?link|login_link|signup|sign_up|reset.?password|verify.?email|email.?verif|otp) (*.py)`: Mail account.py signup/resend_otp/verify_otp, mail/install.py rate limits, Drive product.py signup/send_otp/verify_otp, account_request OTP email, hooks signup_form_template
- frappe/frappe/core/doctype/user/user.py; arama `def (send_welcome_mail_to_user|send_login_mail|_reset_password|password_reset_mail)`: 504 _reset_password, 526 password_reset_mail, 541 send_welcome_mail_to_user, 571 send_login_mail
- frappe/frappe; arama `(?i)keycloak (*.py,*.json,*.js)`: Only the Social Login Key options/provider template and oauth2_logins.login_via_keycloak; no Keycloak email/realm/theme configuration
- suite (all), suite/suite (*.py); arama `(?i)keycloak|openid|oidc|social_login|provider_name`: Python: only drive/meet enable_social_login filters and hooks.py openid_profile allowed path; other hits are unrelated frontend bundle/test files; no Keycloak integration
- suite/suite/headless_provider; arama `(?i)(login|signup|reset|password|auth|keycloak|email)`: Only local_fixture user/password creation and api.py transaction comments; no auth-email/IdP contract
- suite/suite/hooks.py; arama `(?i)(website_redirects|login|signup|reset|update-password|auth_hooks|on_session_creation|openid)`: website_redirects only cover mail auth/outbound; on_login push; ALLOWED_PATHS keep /api/method/login and update_password; no redirect of local auth to Keycloak
- suite/suite/mail/api/account.py; arama `def (send_reset_password_link|get_user_for_reset_password_key|reset_password|create_account)`: 155 create_account, 417 send_reset_password_link, 444 get_user_for_reset_password_key

Sınır: Yalnızca sourceRoot altındaki frappe ve suite app kaynakları okundu. Keycloak sunucusu, realm export'u, site config ve veritabanı ayarları (login_with_email_link, disable_signup, allow_signup) kapsam dışında; çalışma zamanındaki değerleri bilinmiyor.; Suite commit'i bilinmiyor. Testler, komutlar ve ağ erişimi çalıştırılmadı; functionalAcceptance not_run.; Suite Vue frontend rotaları (mail routes.ts signup/reset-password) bu turda yeniden okunmadı; backend API'leri okundu.; Kaynak kodun var olduğunu kanıtlar; e-postanın teslim edildiğini, SMTP'nin çalıştığını veya uyumluluğu kanıtlamaz.

Temporal workflow: `saas-recheck-20261015t073528z-015`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### email-3 — Mailgun adaptörü ve Postfix sunucu bağlantısı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

SMTP/TLS/SSL bağlantısı ve servis ön ayarları yerelde var; Postfix ve Mailgun SMTP buna dayanabilir. HTTP adaptörü için override_email_send hook noktası mevcut. Talimat Mailgun'ın SMTP ile mi HTTP API ile mi bağlanacağını ve hangi uzantı noktasının kullanılacağını belirtmiyor.

Eksik: Mailgun SMTP ile HTTP API arasında seçim yapılmamış; HTTP yolu için override_email_send hook sözleşmesi ve v17 imzası doğrulanmamış; Sağlayıcı hatasının hangi kayda (Email Queue error / Error Log) işleneceği tanımsız; Suite Mail (JMAP posta kutusu ürünü) ile işlemsel gönderim hattının ayrımı yazılmamış; Sağlayıcı kimlik bilgilerinin nerede tutulacağı (kaynak dışı) belirtilmemiş

Sonraki adım önerisi: İlk adımda kod yazmadan Email Account SMTP ile Postfix/Mailgun bağlantısını seçin. HTTP adaptörü yalnız webhook veya özellik ihtiyacı kanıtlanırsa override_email_send hook'u üzerinden planlanmalı; öncesinde v17 kaynağında hook imzası doğrulanmalı.

Mevcut birincil görev: `email-provider--implementation`. Kaynak: `frappe/frappe/email/smtp.py:74`; `frappe/frappe/email/doctype/email_queue/email_queue.py:246`; `frappe/frappe/email/doctype/email_account/email_account.py:161`.

#### email-4 — Ödeme, fatura, onay, güvenlik ve destek e-posta senaryoları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Email Queue referans belge alanlarını, Email Template de DocType bazlı hesap eşlemesini destekliyor. Notification kaynağı bu excerpt'te yok. ERPNext kurulu olmadığı için ödeme/fatura DocType'ları yerelde yok. Tekrar olayda çift e-postayı önleyen bir mekanizma kaynakta görülmüyor.

Eksik: Her senaryo için olayı üreten ürün DocType'ı ve olay adı listelenmemiş (ERPNext yok, ödeme/fatura ürün modülünden gelmeli); Çift gönderimi önleyecek idempotency anahtarı (ör. referans belge + olay) tanımsız; Tenant ve alıcı yetkisinin nasıl belirleneceği yazılmamış; Notification DocType'ın v17 kaynağı incelenmemiş; Destekleyici ui-family-24 görevinin rolü açıklanmamış

Sonraki adım önerisi: email-template--implementation altında senaryo başına olay kaynağı, alıcı kuralı ve dedup anahtarı tablosunu yazın. Uygulamadan önce v17 Notification kaynağını okuyup yerel koşullu bildirimin yeterli olup olmadığını belirleyin.

Mevcut birincil görev: `email-template--implementation`. Kaynak: `frappe/frappe/email/doctype/email_queue/email_queue.py:71`; `frappe/frappe/email/doctype/email_template/email_template.py:63`.

#### email-5 — Şablon değişkeni denetimi, önizleme, dil ve marka sürümleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Email Template yalnız Jinja sözdizimini doğruluyor. İzin denetimli get_email_template, önizleme için yeniden kullanılabilir bir parça. Şemada dil, marka veya zorunlu değişken alanı yok.

Eksik: Zorunlu değişken şemasının nerede tanımlanacağı ve gönderim öncesi nasıl uygulanacağı belirtilmemiş; Dil/marka sürümünün Custom Field ile mi, şablon adlandırmasıyla mı modelleneceği kararı yok; Önizleme ile gönderimin aynı render yolunu kullanacağı garantisi tanımsız; Eksik değişkende Jinja davranışı (sessiz boş çıktı) doğrulanmamış

Sonraki adım önerisi: Dil ve marka için Email Template üzerinde yerel Custom Field kullanımına karar verin. Önizleme için get_email_template'i tek render yolu olarak sabitleyin. Zorunlu değişken kontrolünü gönderim sarmalayıcısında tanımlayın.

Mevcut birincil görev: `email-template--implementation`. Kaynak: `frappe/frappe/email/doctype/email_template/email_template.py:35`; `frappe/frappe/email/doctype/email_template/email_template.py:73`; `frappe/frappe/email/doctype/email_template/email_template.py:77`.

#### email-6 — Gönderen alan adı doğrulama; imza ve teslim edilebilirlik ayarları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Email Account gönderen, başlık ve DSN ayarlarını sağlıyor. SPF/DKIM/DMARC işi sağlayıcıya ve DNS'e ait. Suite Mail'in DMARC/TLS rapor sayfaları posta kutusu ürününe ait; işlemsel gönderen doğrulamasının kanıtı sayılmaz. Görev sahipleri genel ekip adlarıyla yazılmış.

Eksik: Kayıt hazırlama, DNS'te uygulama ve sonucu doğrulama adımları sahipleriyle ayrı ayrı yazılmamış; Test iletisinin SPF/DKIM/DMARC sonucunun nereye kaydedileceği tanımsız; Gönderen alan adı, alt alan ve DMARC politika kararı yok

Sonraki adım önerisi: email-domain--implementation görevine şunları yazın: sağlayıcının istediği DNS kayıt listesi, uygulayıcı, doğrulayıcı ve kabul kanıtı (test iletisinin başlık sonucu). Kod değişikliği gerekmez.

Mevcut birincil görev: `email-domain--implementation`. Kaynak: `frappe/frappe/email/email_body.py:291`; `frappe/frappe/email/doctype/email_account/email_account.py:307`; `suite/frontend/src/apps/mail/routes.test.ts:43`.

#### email-7 — Geri dönen ileti, spam şikâyeti ve gönderim engelleme listesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerelde DSN NOTIFY seçenekleri, referans belge bazlı Email Unsubscribe ve gelen kutusu Email Rule spam işareti var. Ancak yeniden deneme mantığı bir baskılama listesine bakmıyor. Hard bounce veya şikâyete dayalı global alıcı baskılama da kaynakta görülmüyor.

Eksik: Baskılama kaydının nerede tutulacağı tanımsız (Email Unsubscribe referans bazlı, global değil); Sağlayıcı webhook'unun imza doğrulaması ve alıcı eşlemesi tanımsız; retry_sending_emails ve gönderim öncesi baskılama kontrolünün nereye bağlanacağı yazılmamış; ignore_permissions kullanan inbox yardımcıları headless yüzeye açılmamalı; bu sınır belirtilmemiş

Sonraki adım önerisi: email-provider--implementation görevine baskılama deposu kararını, imzalı webhook girişini ve gönderim öncesi kontrol noktasını (override hook veya kuyruk oluşturma) tek sözleşme olarak yazın.

Mevcut birincil görev: `email-provider--implementation`. Kaynak: `frappe/frappe/email/queue.py:105`; `frappe/frappe/email/doctype/email_queue/email_queue.py:233`; `frappe/frappe/email/queue.py:198`; `frappe/frappe/email/inbox.py:123`.

#### realtime-1 — WebSocket (çift yönlü canlı bağlantı) ile güncellemeler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü belli; Socket.IO ile düz WebSocket'in uyumsuz olduğu da doğru not edilmiş. Yereldeki v17-dev realtime katmanı Python Socket.IO sunucusu ve httpx tabanlı connect/auth yolu kullanıyor. Suite de doctype/docname odaklı publish_realtime çağırıyor. Ancak talimat v15 dönemi belgelerine dayanıyor; v17 handshake/auth sözleşmesine eşlenmemiş. Keycloak kimliğinin socket bağlantısına nasıl taşınacağı da tanımlı değil.

Eksik: v17-dev realtime sunucusunun (python-socketio/uvicorn) auth yolu ile belgelerdeki sürüm arasında eşleme yok; Keycloak token → Frappe oturumu → socket handshake bağı tanımsız; mevcut istemci yolları cookie/sid kullanıyor (withCredentials, sid); Tauri2/WXT gibi cookie'siz kökenler için bağlantı kimliği tanımsız; Olay adı/oda (doc, doctype, user) sözleşmesi ve after_commit kuralı yazılmamış; frappe/realtime.py kaynağı bu pakette görülmedi; can_subscribe_doc yalnız hooks listesinde isim olarak geçiyor

Sonraki adım önerisi: websocket-api--implementation altında v17 frappe realtime modülünü (can_subscribe_doc/doctype, get_user_info) okuyup tek sayfalık bağlantı sözleşmesi yazın: auth taşıyıcısı, oda adları, izin kontrol noktası. Keycloak eşlemesini o sözleşmeye bağlayın, yeni protokol adaptörü açmayın.

Mevcut birincil görev: `websocket-api--implementation`. Kaynak: `frappe/pyproject.toml:94`; `frappe/pyproject.toml:102`; `suite/suite/hooks.py:411`; `suite/suite/meet/doctype/meet_room/meet_room.py:188`; `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:62`.

#### realtime-2 — SSE (Server-Sent Events — sunucudan gönderilen olaylar) ile canlı iletim.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de canlı iletim için somut bir temel parça var. frappe/frappe/realtime/**init**.py içindeki publish_realtime olayı user/doctype/doc/task/site odasına göre yönlendiriyor. after_commit seçeneğiyle olay, transaction commit edildikten sonra gönderilecek şekilde ertelenebiliyor; rollback olursa atılıyor. emit_via_redis olayları Redis 'events' kanalına site namespace'iyle yayımlıyor. frappe/realtime/index.js de bu kanala abone olan Node Socket.IO sunucusu ve olayları odalara emit ediyor. Ancak taşıma yalnız Socket.IO (WebSocket/long-poll). Suite'te 'eventSourceUrl' yalnız harici bir JMAP sunucusunun session URL'sinin Redis'te önbelleklenmesi; bu bir SSE sunucusu ya da tüketicisi değil. direct_passthrough kullanımları dosya/WebDAV akışı; SSE değil. LOCAL PILOT suite/headless_provider içinde (api.py, local_fixture.py, **init**.py) realtime/stream/event/cursor ile ilgili hiçbir kod yok.

Eksik: Her iki app kökünde de (derlenmiş dist/public/frontend bundle'ları hariç) 'text/event-stream' yanıtı veren bir SSE endpoint'i ve id/event/retry çerçevelemesi bulunamadı; Last-Event-ID ile kaldığı yerden devam ve kalıcı, sıra numaralı olay günlüğü yok; Redis pub/sub geçici, replay yok; SSE heartbeat/yorum satırı ile X-Accel-Buffering/proxy buffering ve timeout ayarı yok; EventSource başlık gönderemediği için gereken Keycloak cookie veya kısa ömürlü bilet ile kimlik doğrulama ve SSE için oda/izin denetimi yok; Headless provider'da SSE sözleşmesi yok; Suite Vue frontend'inde EventSource tüketicisi yok; SSE'nin hangi tüketici için gerektiğine dair karar (ör. WXT MV3) kaynakta yok

Sonraki somut adım: Sıra şöyle olmalı. 1) sse-api--contract: SSE'yi yalnız Socket.IO kullanamayan somut bir tüketici için açan bir karar kaydı yazılmalı. Bu kayıt kimliği (cookie ya da kısa ömürlü bilet), heartbeat aralığını, proxy buffering ayarını ve Last-Event-ID'nin realtime-3 cursor/outbox sıra numarasına bağlanmasını tanımlamalı. 2) Ayrı bir olay deposu kurulmamalı. Olaylar mevcut publish_realtime/emit_via_redis 'events' akışından ve outbox--contract sıra kaynağından okunmalı. 3) Sonra tek bir dar SSE endpoint'i yazılmalı: kimliği doğrulanmış tek kullanıcı odası, heartbeat ve Last-Event-ID ile replay. Bu adım RED/GREEN testle kanıtlanmalı.

Önerilen bağımlılık/sıra: sse-api--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; api-middleware--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `sse-api--implementation`.

Kaynak kanıtı:

- `frappe/frappe/realtime/__init__.py:30` — `def publish_realtime(`
- `frappe/frappe/realtime/__init__.py:83` — `frappe.db.after_commit.add(flush_realtime_log)`
- `frappe/frappe/realtime/__init__.py:118` — `"events",`
- `frappe/realtime/index.js:1` — `const { Server } = require("socket.io");`
- `frappe/realtime/index.js:81` — `io.of(namespace).to(message.room).emit(message.event, message.message);`
- `suite/suite/mail/jmap.py:689` — `"eventSourceUrl": session.event_source_url,`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe; arama `(?i)text/event-stream|EventSource|Last-Event-ID|server[-_ ]sent`: Eşleşmeler yalnız frappe/frappe/public/dist içindeki derlenmiş üçüncü taraf bundle ve map dosyalarında. Kaynakta SSE uygulaması yok.
- frappe/frappe (glob !**/dist/**); arama `(?i)text/event-stream|EventSource|Last-Event-ID|event_source|stream_with_context|StreamingResponse|mimetype=.text/event`: Eşleşme yok.
- suite; arama `(?i)text/event-stream|EventSource|Last-Event-ID|server[-_ ]sent`: Eşleşmeler: jmap.py içindeki eventSourceUrl önbelleği, bir test sabiti, alakasız yorumlar ve public/frontend içindeki derlenmiş asset'ler. SSE endpoint'i yok.
- suite (glob !**/public/frontend/**); arama `(?i)event_source_url|eventSourceUrl|EventSource|text/event-stream|stream_with_context|Last-Event-ID`: Yalnız suite/suite/mail/jmap.py:689 ve suite/suite/mail/tests/test_jmap_client.py:44 eşleşti. İkisi de harici JMAP session URL'sinin önbelleklenmesi.
- frappe (glob !**/dist/**); arama `def publish_realtime|redis_server\.publish|def emit_via_redis|new Server\(|require\("socket\.io"\)|from "socket.io"`: Realtime yolu frappe/frappe/realtime/**init**.py ve frappe/realtime/index.js dosyalarında; okundu. Taşıma Socket.IO ve Redis pub/sub.
- suite/suite/headless_provider; arama `(?i)realtime|stream|sse|event|socket|cursor`: Eşleşme yok. Pilot provider'da realtime sözleşmesi yok.
- . (frappe ve suite, glob !**/{dist,public/frontend}/**); arama `(?i)X-Accel-Buffering|direct_passthrough|heartbeat|keepalive|keep-alive`: Eşleşmeler yalnız drive dosya akışı (direct_passthrough), meet STT keepalive, RQ/scheduler heartbeat ve Vue keep-alive. SSE heartbeat'i veya proxy buffering ayarı yok.

Sınır: Yalnız kaynak kodu okundu; hiçbir şey çalıştırılmadı ve functionalAcceptance not_run. Deploy edilmiş proxy (nginx) ve Socket.IO çalışma davranışı doğrulanmadı.; Derlenmiş dist/public/frontend bundle'ları üçüncü taraf kod sayılarak SSE kanıtı olarak değerlendirilmedi.; suite/realtime handler'ları ve sfu-server ayrıntılı okunmadı. Bu dosyalarda SSE anahtar kelimesi eşleşmedi.; suiteCommit bilinmiyor. ERPNext/HRMS kurulu değil, değerlendirilmedi.; Plan modu etkin olduğu için plan dosyası yazılmadı. Kullanıcı yalnız Read/Glob/Grep ile salt okunur analiz istedi.

Temporal workflow: `saas-recheck-20261015t073528z-016`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### realtime-3 — Bağlantı yetkisi, yeniden bağlanma ve kaçırılan olayları tamamlama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta yeniden bağlanma denemesi ve sınırlı retry deseni var. Suite ise Frappe realtime relay'inde replay/resync olmadığını kendi kodunda açıkça belirtiyor. Bağlantı izni yalnız bağlantı anında kontrol ediliyor. Talimattaki 'deneysel handlerlar' ifadesi hiçbir sürüm/handler adına bağlanmamış.

Eksik: Sıra numarası/cursor'un kaynağı (kalıcı günlük mü, REST yeniden okuma mı) tanımsız; İzin iptalinde açık aboneliğin nasıl düşürüleceği tanımsız; mevcut desen yalnız connect anında has_permission kontrol ediyor; 'Deneysel handlerlar' için v17 adı/sürümü yok; Keycloak token yenilemesinin socket oturumuna yansıması tanımsız

Sonraki adım önerisi: En küçük adım: realtime'ı yalnız 'invalidation' sinyali saymak. Reconnect sonrası TanStack Query, /api/v2 kaynaklarını yeniden okusun (modified/cursor). İzin iptalini v17 can_subscribe_* yeniden kontrolüne bağlayan sözleşmeyi websocket-api--implementation'a ekleyin.

Mevcut birincil görev: `websocket-api--implementation`. Kaynak: `suite/frontend/src/apps/sheets/collab/hocuspocus-client.js:8`; `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:63`; `suite/frontend/src/apps/meet/composables/useGuestRealtime.ts:28`; `suite/suite/sheets/collab.py:54`.

#### realtime-4 — Kayıt üzerinde ekip yorumları, bahsetme ve takip etme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe çekirdeğinde şunlar var. (1) Whitelist'li add_comment ve update_comment uçları: add_comment, referans kayıtta check_permission=True ile okuma izni ister; update_comment yalnız yorum sahibine veya Administrator'a izin verir. (2) Comment controller'ı hooks.py içinde kayıtlıdır (138 ve 173. satırlar). has_permission, yorumun okunabilirliğini referans kaydın read iznine bağlar; Comment zincirini en fazla 10 adım izler. get_permission_query_conditions, okunamayan DocType'ların yorumlarını eler. get_document_comments, docinfo ve get_comments içinde izin kontrolü uygular. İçerik sanitize_html ile temizlenir. (3) Comment.after_insert, notify_mentions'ı çağırır. extract_mentions, .mention data-id değerlerini ve User Group üyelerini ayrıştırır. Alıcılar enabled, System User ve allowed_in_mentions filtrelerinden geçer, sonra type=Mention olan Notification Log kaydı oluşur. Notification Log, for_user'a realtime 'notification' olayı ve isteğe bağlı e-posta gönderir; kaydı yalnız for_user okuyabilir. (4) Document Follow için follow, unfollow ve update_follow uçları var. Takip için track_changes, read izni ve document_follow_notify gerekir. follow_commented_documents açıksa yorum yazan kullanıcı kaydı otomatik takip eder; takipçilere periyodik özet e-postası gider. (5) docinfo_update olayı kaydın realtime odasına yayınlanır; doc_subscribe odaya katılmadan önce has_permission kontrolü yapar. Suite'teki Vue Writer/Sheets yorumları ve drive notify_mentions ürüne özgüdür, genel kayıt yorumu sağlayıcısı değildir. Yerel pilot suite/headless_provider/api.py yalnız session, metadata, create_field, preview_edit ve apply_edit uçlarını sunar; yorum, mention veya takip sözleşmesi içermez.

Eksik: Kabul ölçütünü bozan açık: notify_mentions, bahsedilen kullanıcının referans kayıtta read izni olup olmadığını kontrol etmiyor. Yorum içeriği email_content alanıyla Notification Log'a ve bildirim e-postasına kopyalanıyor. Bu yüzden kayda izni olmayan biri mention yoluyla yorumu görebilir.; add_comment, comment_email ve comment_by değerlerini istemciden alıyor; validate yalnız boş comment_email'i dolduruyor. Yazar kimliği oturum kullanıcısına sabitlenmiyor.; suite/headless_provider içinde yorum listeleme/ekleme/düzenleme, mention bildirimi ve takip için tenant ve izin kapsamlı provider sözleşmesi yok.; React/Ant Design (Pro/X) tarafında yorum, mention ve takip yüzeyi kaynakta yok. Mevcut UI Desk JS ve Suite Vue tarafında.; Realtime docinfo_update ile Notification Log olaylarının headless istemciye (kernel envelope/outbox) eşlenmesi tanımlı değil.

Sonraki somut adım: native-comment--contract sırasına bağlı kalınarak şu sırayla ilerlenmeli: 1) Önce RED regresyon testi yazılmalı. Testte okuma izni olmayan kullanıcı mention edilmeli; ne Notification Log oluşmalı ne e-posta gitmeli. 2) Ardından notify_mentions'ta alıcılar frappe.has_permission(ref_doctype, 'read', doc=ref_name, user=...) ile süzülmeli ve test GREEN'e geçirilmeli. Bu düzeltme upstream'e veya yerel override'a küçük bir yama olarak yapılmalı. 3) add_comment'te yazar kimliği oturum kullanıcısına sabitlenmeli. 4) Sonra headless_provider'a ince sarmalayıcılar eklenmeli: comments.list (get_document_comments), comments.add/update (frappe.desk.form.utils), follow.toggle (update_follow) ve notifications.list (Notification Log). Comment ORM'i kopyalanmamalı. 5) Realtime docinfo_update ve notification olayları kernel envelope'a eşlenmeli.

Önerilen bağımlılık/sıra: native-comment--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `native-comment--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/form/utils.py:31` — `reference_doc = frappe.get_lazy_doc(reference_doctype, reference_name, check_permission=True)`
- `frappe/frappe/core/doctype/comment/comment.py:128` — `"""A comment is readable as far as the document it was written on is."""`
- `frappe/frappe/desk/notifications.py:465` — `{"enabled": 1, "name": name, "user_type": "System User", "allowed_in_mentions": 1},`
- `frappe/frappe/desk/notifications.py:483` — `"email_content": content,`
- `frappe/frappe/desk/form/document_follow.py:68` — `if not frappe.has_permission(doctype, "read", doc=doc_name, user=user):`
- `frappe/frappe/realtime/handlers.py:76` — `if await socket.has_permission(doctype, docname):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite tümü); arama `def (add_comment|notify_mentions|extract_mentions|get_mentioned_users|follow_document|unfollow_document|get_follow_users|send_document_follow_mails|update_comment)\b`: Çekirdek: frappe/desk/form/utils.py, desk/notifications.py, desk/form/document_follow.py, model/document.py, desk/like.py, templates comments.py. Suite tarafında yalnız suite/drive/api/notifications.py içinde Drive'a özgü notify_mentions var.
- suite; arama `(?i)(mention|comment|follow)`: Eşleşmeler Vue Writer/Sheets/Mail bileşenlerinde, Drive bildirimlerinde, calendar ve locale dosyalarında; genel kayıt yorumu sağlayıcısı yok.
- suite/suite/headless_provider; arama `(?i)(comment|mention|follow|notification_log|docinfo)`: 0 eşleşme. Pilot provider yorum, mention veya takip sözleşmesi içermiyor.
- frappe/frappe/hooks.py; arama `"Comment"|Comment"|comment\.comment`: Comment için permission_query_conditions (138) ve has_permission (173) hook kayıtları var.
- frappe/frappe/desk/doctype/notification_log/notification_log.py; arama `def (enqueue_create_notification|make_notification_logs|...)|has_permission\(|after_insert|publish_realtime`: Realtime 'notification' olayı, yalnız for_user'a okuma izni ve e-posta var. Alıcının referans kayıtta izni olup olmadığı kontrol edilmiyor.
- frappe/frappe/desk/form/load.py; arama `def (get_comments|get_docinfo|...)|get_document_comments|is_document_followed`: get_docinfo, check_permission=True ile çalışıyor; yorumlar get_document_comments ile izin süzgecinden geçiyor.
- frappe; arama `def can_subscribe_doc|doc_subscribe`: realtime/handlers.py:75-77 ve handlers.js:58-61 odaya katılmadan önce izin kontrolü yapıyor.

Sınır: Yalnız kaynak okundu; test, komut veya runtime çalıştırılmadı. functionalAcceptance=not_run.; Mention izin açığının sonucu kaynak okumasından çıkarıldı; runtime'da RED testiyle doğrulanmadı.; Desk JS mention autocomplete kullanıcı listesinin izin süzgeci incelenmedi.; suiteCommit bilinmiyor. headless_provider yerel pilot, upstream değil.; ERPNext/HRMS kurulu değil, değerlendirilmedi.; Derlenmiş public/dist bundle'ları davranış kanıtı sayılmadı.

Temporal workflow: `saas-recheck-20261015t073528z-017`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### realtime-5 — Kimin görüntülediği/düzenlediği bilgisi ve eşzamanlı düzenleme uyarısı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Suite Sheets'te TTL'li presence/awareness ve izin kontrollü relay var; bu, 'kopan kullanıcı süre sonunda kalksın' ölçütünün yalnız Sheet'e özel bir benzeri. Talimat eşzamanlı düzenleme uyarısını kabul ölçütüne koymamış. check_if_latest için de yerel v17 yerine version-15 kaynağına atıf yapıyor.

Eksik: Kabul ölçütünde eşzamanlı düzenleme/çakışma uyarısı yok, yalnız presence var; check_if_latest atfı version-15'e işaret ediyor; v17-dev davranışı eşlenmemiş; Genel kayıt presence'ı ile Sheet'e özel Yjs awareness arasındaki yeniden kullanım sınırı yazılmamış; Suite'teki secret + ignore_permissions persist deseninin kopyalanmaması gerektiği belirtilmemiş

Sonraki adım önerisi: ui-presence--implementation'a şunları ekleyin: v17 modified/check_if_latest çakışma kontrolü sunucuda kalsın; presence yalnız read izinli doc odasında TTL'li heartbeat olarak dursun. Kabul ölçütüne 'eski sürümle kaydetme reddi + uyarı' maddesini ekleyin.

Mevcut birincil görev: `ui-presence--implementation`. Kaynak: `suite/frontend/src/apps/sheets/collab/awareness.js:23`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:7`; `suite/frontend/src/apps/sheets/components/SheetEditor/useCollaboration.js:126`; `suite/suite/sheets/collab.py:147`.

#### realtime-6 — Paylaşımlı çalışma alanı etkinlik akışı ve kayıt abonelikleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kayıt düzeyinde after_commit yayınlar ve izin süzgeçli get_list mevcut. Ancak 'workspace' kavramı tenant/izin modeline bağlanmamış. Akışın veri kaynağı (Version, Comment, Activity Log) ve aboneliğin native Document Follow ile ilişkisi de tanımsız. Görev ID'si post-mvp, kapsam ise conditional; tetikleyici koşul belirsiz.

Eksik: Workspace'in tenant ve izin karşılığı tanımsız; Akış kaynağı native log DocType'larına eşlenmemiş; Abonelik iptalinin hangi native kayda yazılacağı tanımsız; Akışta görünürlük, okuma anında get_list izin süzgecine bağlanmamış

Sonraki adım önerisi: ui-family-24 altında akışı izin süzgeçli get_list ile okunan native log DocType'larına bağlayın. Realtime'ı yalnız yenileme sinyali olarak kullanın. Aboneliği v17 Document Follow kaynağı okunduktan sonra ona eşleyin.

Mevcut birincil görev: `ui-family-24--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v1.py:35`; `suite/suite/meet/doctype/meet_room/meet_room.py:191`.

#### realtime-7 — Modüller arası ortak atama ve Benim işlerim kuyruğu; sorumlu, takipçi, son tarih, hatırlatma ve yetkili kayıt eylemleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de çalışan atama yapı taşları var:

- frappe/frappe/desk/form/assign_to.py: whitelisted add, remove, close, add_multiple ve remove_multiple uçları. Atama yapılırken referans kayıt için check_permission çalışır. Aynı kişiye ikinci açık atama yapılmaz (açık ToDo varsa atlanır). Atanan kişinin yetkisi yoksa kayıt onunla paylaşılır; System Settings'te paylaşım kapalıysa işlem reddedilir. Kullanıcı ayarı açıksa atanan kişi kaydı otomatik takip eder. Atanan kişiye Notification Log ile bildirim gider. close yalnız atanan kişinin kendisine izinlidir.
- ToDo DocType şu alanları tutar: allocated_to (sorumlu), assigned_by, date (son tarih), priority, status (Open/Closed/Cancelled) ve reference_type/reference_name (modüller arası dinamik kayıt referansı). Atama ve kaldırma referans kayda Comment olarak yazılır (denetim izi). Açık atamalar referans kaydın _assign alanına senkronlanır.
- ToDo için permission_query_conditions ve has_permission hookları tanımlı. ToDo rolü olmayan kullanıcı yalnız allocated_to, assigned_by veya owner olduğu ToDo'ları görür. Bu, "Benim işlerim" listesinin temelidir.
- Takipçi tarafı: Document Follow ve periyodik özet e-postaları var. Özet gönderilirken referans kayıt için read izni yeniden kontrol edilir.
- Hatırlatma tarafı: Reminder DocType, create_new_reminder ve 15 dakikalık send_reminders işi var. notified bayrağı aynı hatırlatmanın iki kez gönderilmesini önler.

Suite tarafı:

- Suite'te atama, ToDo veya iş kuyruğu kodu yok. Calendar'daki hatırlatmalar yalnız takvim olayları için.
- suite/headless_provider yerel pilot ek kod. Yalnız session, metadata ve DocType alan düzenleme sözleşmesi sunuyor; atama veya kuyruk sözleşmesi içermiyor.

Eksik: Kuyruk görünürlüğü referans kaydın iznine bağlı değil. ToDo.has_permission ve query koşulu yalnız allocated_to/assigned_by/owner alanlarına bakıyor. Kayıt izni veya üyelik kaldırılsa da ToDo ve description görünmeye devam eder; kabul ölçütü karşılanmıyor.; Tenant izolasyonu yok. ToDo'da tenant alanı ve tenant süzgeci bulunmuyor.; Takipçi atamanın bir parçası değil. Document Follow ayrı bir mekanizma; ToDo üzerinde takipçi alanı yok.; Son tarihe bağlı otomatik hatırlatma yok. ToDo.date için zamanlanmış iş bulunmuyor. Reminder kullanıcıya özel ve elle oluşturuluyor; ToDo ile otomatik bağı ve atama başına tekilleştirmesi yok. Reminder, bağlı kayıt için izin kontrolü de yapmıyor.; Sahiplik devri tek atomik işlem değil. Yeniden atama için ayrı remove ve add çağrısı gerekiyor.; Tamamlanmış iş üzerindeki geçersiz eylem açıkça reddedilmiyor. set_status zaten aynı durumdaki iş için sessizce geçiyor; Closed bir işi Cancelled yapmayı engelleyen bir kural yok.; İç not koruması yok. description alanı serbest metin ve alan düzeyinde gizlenmiyor.; En az iki kurulu Suite modülünün atama akışına bağlandığı bir entegrasyon yok. Headless provider'da kuyruk sözleşmesi de yok.

Sonraki somut adım: Upstream ToDo ve assign_to korunacak; yeni katman yalnız suite/headless_provider'a ek olarak yazılacak. Sıra:

1. native-assignment--contract kapsamında şu sözleşmeyi tanımla: sorumlu = ToDo.allocated_to, son tarih = ToDo.date, takipçi = Document Follow, hatırlatma = Reminder (referans ToDo).
2. Provider'a tek bir salt okunur my_work uç noktası ekle. Uç, ToDo'yu frappe.get_list ile kullanıcı izniyle çeksin. Her satırda frappe.has_permission ile referans kaydı ayrıca kontrol etsin; okunamayan kaydı ve description alanını düşürsün. Tenant süzgeci tenant-registry--contract'a bağlansın.
3. Kayıt izni kaldırıldığında işin kuyruktan düşmesini önce başarısız (RED), sonra geçen (GREEN) testle kanıtla.
4. Ardından sunucuda yetkilendirilen reassign eylemini ekle; Closed veya Cancelled iş üzerindeki eylemi reddetsin.
5. Son tarihe göre tekilleştirilmiş hatırlatmayı (her ToDo ve tarih için tek Reminder) en son ekle.
6. Kabul için iki kurulu Suite modülünü açıkça seç (öneri: Drive ve Calendar). CRM/Helpdesk yalnız tasarım referansı olarak kalsın.

Önerilen bağımlılık/sıra: native-assignment--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `native-assignment--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/form/assign_to.py:72` — `frappe.get_doc(args["doctype"], args["name"]).check_permission()`
- `frappe/frappe/desk/form/assign_to.py:211` — `frappe.throw(_("Only the assignee can complete this to-do."))`
- `frappe/frappe/desk/doctype/todo/todo.py:174` — `return doc.allocated_to == user or doc.assigned_by == user or doc.owner == user`
- `frappe/frappe/desk/doctype/todo/todo.py:84` — `frappe.get_doc(self.reference_type, self.reference_name).add_comment(comment_type, text)`
- `frappe/frappe/automation/doctype/reminder/reminder.py:47` — `self.db_set("notified", 1, update_modified=False)`
- `frappe/frappe/hooks.py:165` — `"ToDo": "frappe.desk.doctype.todo.todo.has_permission",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/desk/form/assign_to.py; arama `def (add|remove|close|get|add_multiple|set_status|close_all_assignments|clear)\(`: add/remove/close/set_status/clear fonksiyonları bulundu ve tamamı okundu.
- suite; arama `assign_to|ToDo|allocated_to|_assign`: Eşleşmeler yalnız derlenmiş frontend bundle'ları, Mail signup/install/role yamaları ve writer docx yardımcılarında. Atama veya kuyruk davranışı yok.
- frappe/frappe/desk/doctype/todo/*; arama `glob`: todo.json, todo.py ve list/calendar js bulundu. todo.py okundu.
- suite/suite (*.py, *.json); arama `(?i)(assignee|my[_ ]tasks|my[_ ]work|due_date|remind|follower|work[_ ]queue)`: Yalnız calendar modülünde etkinlik hatırlatmaları var. İş kuyruğu yok.
- frappe/frappe/automation/doctype/{reminder,assignment_rule}; arama `glob *.py`: Reminder ve Assignment Rule bulundu. reminder.py okundu.
- suite/**/headless_provider/**; arama `(?i)(assign|todo|task|follow)`: Eşleşme yok. Provider'da atama sözleşmesi bulunmuyor.
- suite/suite/headless_provider/api.py; arama `(?i)def |whitelist|doctype`: Yalnız session, metadata, create_field, preview_edit ve apply_edit uçları var.
- frappe/frappe/{hooks.py,desk/form/document_follow.py}; arama `document_follow|"ToDo"|assign_to`: ToDo izin hookları ve document follow özet işleri bulundu. Özet gönderiminde read izni kontrolü var.

Sınır: Kanıt yalnız kaynak kodun varlığını gösterir. Hiçbir test veya komut çalıştırılmadı; functionalAcceptance: not_run.; Suite commit sürümü bilinmiyor. headless_provider, upstream'den ayrı yerel pilot kod olarak değerlendirildi.; Atama ToDo'yu ignore_permissions ile oluşturuyor. Atanan kişinin kayda erişimi, paylaşım açıksa share ile; kapalıysa ancak atamadan önce ayrıca verilen izinlerle sağlanıyor. Çalışma zamanı davranışı doğrulanmadı.; ToDo frontend'leri (todo_list.js, todo_calendar.js) ve Assignment Rule ayrıntıları okunmadı. Desk UI, headless sözleşmenin parçası olarak sayılmadı.; Bilgiyi başka yere sızdırabilecek diğer yollar (ör. ToDo üzerinden e-posta) incelenmedi.; CRM, Helpdesk, ERPNext ve HRMS kurulu değil; değerlendirme dışı.

Temporal workflow: `saas-recheck-20261015t073528z-018`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### notifications-1 — In-app notification (uygulama içi bildirim) merkezi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Amaç ve kabul ölçütü (iki kullanıcı ayrımı, okundu durumunun kalıcılığı) anlamlı. Yerelde yalnız Drive'a özgü bir bildirim akışı görülüyor: oturumdaki kullanıcıya göre filtrelenen liste, alıcıya bağlı okundu işareti ve izin sorgusu kancası var. Ancak talimat, Frappe çekirdeğindeki Notification Log'a dayanıyor ve kaynak olarak version-15 bağlantısı veriyor. Yerel kurulum 17.0.0.dev0; Notification Log kaynağı bu pakette görülmedi.

Eksik: Hangi kayıt deposunun kanonik olacağı belirtilmemiş: çekirdek Notification Log mu, Drive Notification mı, yoksa sanal Event Notification mı? Birleşik merkez için uyarlama sınırı tanımsız.; Kaynak version-15'e bağlanmış; v17 geliştirme sürümündeki API eşlemesi yok.; Headless API sözleşmesi tanımsız: liste, okunmamış sayısı, okundu işaretleme ve sayfalama. TanStack Query önbelleğinin geçersiz kılınması ve realtime olayı da tanımlanmamış.; Kiracı, kapsam ve rol bazlı görünürlük ile sunucu tarafı izin kontrolü kabul ölçütüne bağlanmamış.; E2E dosyasının varlığı işlevin kanıtı değil; kabul çalıştırılmadı (not_run).

Sonraki adım önerisi: Önce v17 kaynağında Notification Log'un alan ve izin modelini doğrula. Ardından tek kanonik depoyu ve Drive/Event bildirimlerinin ona nasıl eşleneceğini notification-message--implementation görevine yaz. Kabul, iki kullanıcı ve yenileme sonrası okundu durumu senaryosu olarak kalsın.

Mevcut birincil görev: `notification-message--implementation`. Kaynak: `suite/suite/drive/api/notifications.py:41`; `suite/suite/drive/api/notifications.py:63`; `suite/suite/hooks.py:131`; `suite/suite/calendar/doctype/event_notification/event_notification.json:187`; `suite/e2e/drive-backed-apps/specs/drive/notifications.spec.ts:12`.

#### notifications-2 — SMS (Short Message Service — kısa mesaj hizmeti) ve mobil push (anlık cihaz bildirimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (SMS ve push'un aynı olaydan üretilmesi, iptal edilen tokena gönderimin durması) ölçülebilir. Yerelde frappe.push_notification modülü kullanılıyor ve frontend'de FCM tokenı için abone olma/abonelikten çıkma akışı var. Ancak bu akış harici bir relay sunucusuna bağlı ve web odaklı. SMS kaynağı bu pakette görülmedi. Tauri 2 mobil uygulamada yerel push için talimat yok.

Eksik: SMS sağlayıcısı ve SMS Settings eşlemesi yok; Frappe Notification SMS kanalının v17'deki karşılığı doğrulanmamış.; Tauri 2 mobil için APNs/FCM cihaz kaydı, token yaşam döngüsü ve backend abonelik sözleşmesi tanımsız.; Relay sunucusu (push_relay_server_url) bir dış bağımlılık; kimin işleteceği, güven sınırı ve gizli anahtar yönetimi belirtilmemiş.; Abonelik endpoint'i tokenı GET sorgu dizesinde taşıyor. Durum değiştiren GET ve URL'nin loglara düşmesi için güvenlik kararı gerekiyor.; Gönderim hatasında token iptali ve tekrar deneme ile hata kaydı politikası tanımsız.

Sonraki adım önerisi: sms-push-delivery--implementation görevine şunları ekle: v17 push_notification ve SMS kaynak eşlemesi, relay sahipliği, Tauri mobil token kaydı ve iptal sözleşmesi. GET ile abonelik kullanımını POST'a çevirme kararını da açık bir gereksinim olarak yaz.

Mevcut birincil görev: `sms-push-delivery--implementation`. Kaynak: `suite/suite/mail/doctype/mail_message/mail_message.py:17`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:33`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:184`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:189`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:141`.

#### notifications-3 — Web push (tarayıcı bildirimi) ve desktop notification (masaüstü sistem bildirimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Assessment bu maddeyi 'external' olarak sınıflıyor; oysa Suite Mail frontend'inde izin isteme, izin reddinde dönüş ve service worker üzerinden showNotification ile FCM tabanlı bir web push istemcisi zaten var. Meet'teki bildirim bağlamı ise yalnız sekme içi ses için; sistem bildirimi üretmiyor. Kabul ölçütü (izin reddi, arka planda alım) anlamlı. Ancak Vite/PWA, Tauri 2 masaüstü ve WXT/MV3 için uyarlama sınırı yok.

Eksik: Standart VAPID Web Push mu, yoksa Frappe relay ve FCM mi kullanılacak, karar verilmemiş; Suite'teki mevcut istemcinin yeniden kullanımı belirtilmemiş.; Vite/PWA service worker'ının sahipliği ve push olay işleyicisi tanımsız.; Tauri 2 masaüstü bildirim eklentisi ve WXT/MV3 eklenti bildirimleri için kanal eşlemesi yok.; Bildirimin etkin olup olmadığı yalnız localStorage'daki tokena bakılarak belirleniyor; sunucu tarafındaki abonelik durumuyla eşitleme tanımsız.; Safari/iOS PWA kısıtları ile tarayıcı matrisi belirtilmemiş; kabul çalıştırılmadı (not_run).

Sonraki adım önerisi: Assessment'teki support değerini 'partial' olarak düzelt. web-desktop-push--implementation görevine şunları yaz: mevcut frappe-push-notification.ts istemcisinin yeniden kullanılıp kullanılmayacağı, PWA service worker sözleşmesi, Tauri ve WXT için kanal eşlemesi. Kabul olarak izin reddi ve arka planda alım senaryosu kalsın.

Mevcut birincil görev: `web-desktop-push--implementation`. Kaynak: `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:128`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:129`; `suite/frontend/src/apps/mail/utils/push-notifications.ts:24`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:116`; `suite/frontend/src/apps/meet/utils/notificationContext.ts:32`.

#### notifications-4 — WhatsApp Business API, Telegram Bot ve Discord kanalları.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe'de ilgili temel yapılar var, ancak bunlar bu üç kanalın adaptörü değil. (1) Notification DocType yalnız Email, Slack, System Notification ve SMS kanallarını dağıtıyor; gönderim hatasını log_error ile kaydediyor (notification.py:430-449). (2) Slack Webhook URL entegrasyonu requests.post ile gönderiyor ve başarısız yanıtı frappe.log_error ile kaydediyor. (3) Genel Webhook DocType giden HTTP isteği gönderiyor. İstekler Delivered/Failed/Exhausted durumlarıyla Webhook Request Log'a yazılıyor; RETRY_SCHEDULE ile yeniden deneniyor ve HMAC imzalı giden X-Frappe-Webhook-Signature başlığı ekleniyor. Yapılandırmayla bir Discord gelen webhook'una istek atabilir, ancak bu bir kanal adaptörü değildir. (4) SMS Settings genel bir HTTP gateway ve SMS Log sağlıyor. notification.js:96'daki 'WhatsApp' dalı yalnız alıcı alanı filtresi. Kanal seçeneklerinde WhatsApp olmadığı için bu dal ölü bir UI kalıntısı; gönderim kodu yok. Suite'te (Vue frontend, Mail push_subscription, Meet ChatPanel) ve yerel pilot suite/headless_provider'da bildirim kanalı ya da sosyal mesajlaşma kodu bulunamadı.

Eksik: WhatsApp Business (Cloud) API adaptörü yok: mesaj/şablon gönderimi ve wa_id eşlemesi bulunmuyor.; Telegram Bot adaptörü yok: sendMessage çağrısı ve chat_id eşlemesi bulunmuyor.; Discord bot/webhook adaptörü yok.; Bu üç kanal için sağlayıcı kimlik bilgisi DocType'ı veya Password alanı yok; secret'lar kaynak dışında tutulmalı.; Doğrulanmış alıcı eşlemesi ve opt-in sözleşmesi yok (telefon, chat_id, Discord kanalı).; Sağlayıcıdan gelen teslim/durum geri bildirimleri için gelen imza doğrulaması ve hız sınırı yok.; Kanal başına sağlayıcı hata kodunu saklayan bir teslim kaydı yok. Webhook Request Log genel HTTP kaydıdır, alıcı veya kanal semantiği taşımaz.; Notification.channel sabit bir Select/Literal alanı (Email/Slack/System Notification/SMS). Yeni kanal eklemek için uzantı noktası (hook/override) gerekiyor; mevcut değil.; Suite Drive bildiriminde e-posta hatasını sessizce yutan 'except Exception: pass' kalıbı önceki incelemede kaydedildi ve kabul ölçütüyle çelişiyor.

Sonraki somut adım: Önerilen sıra:

1. Mevcut social-message-delivery--contract görevinde tek bir kanal adaptörü arayüzünü yaz: send(recipient_ref, message) bir sonuç döndürsün (delivered/failed, provider_code, provider_error).
2. Aynı sözleşmeye şunları ekle:
   - doğrulanmış alıcı ve opt-in kaydı;
   - credential için yalnız Password alanı veya site config, kaynakta değer olmayacak;
   - Delivered/Failed/Exhausted ve next_retry alanlı teslim kaydı. Bu kayıt Webhook Request Log ile retry_failed_webhooks kalıbını yeniden kullansın; 'except: pass' yasak.
3. social-message-delivery--implementation görevinde ilk olarak tek kanalı ek (additive) uygulama kodu olarak yaz: Telegram Bot. Kurulu frappe'yi değiştirme; ayrı bir app'te veya pilot headless_provider sınırında yaz.
4. Bu kanal için iki RED/GREEN testi yaz: doğrulanmamış alıcı reddedilmeli; sağlayıcıdan gelen 4xx teslim kaydına Failed ve hata metniyle düşmeli.
5. Ardından aynı arayüzle Discord'u, sonra WhatsApp'ı (şablon/opt-in gerektirir) ekle.
6. En son Notification'a bağla: Property Setter ile kanal seçeneği ekle ve doc_events/override ile dağıt.

Headless provider bu kanalları kendi teslim kaydı ve sonuç sözleşmesiyle sunsun; Suite Vue frontend'ine bağımlı olmasın.

Önerilen bağımlılık/sıra: social-message-delivery--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; email-template--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `social-message-delivery--implementation`.

Kaynak kanıtı:

- `frappe/frappe/email/doctype/notification/notification.json:76` — `"options": "Email\nSlack\nSystem Notification\nSMS",`
- `frappe/frappe/email/doctype/notification/notification.js:96` — `} else if (["WhatsApp", "SMS"].includes(frm.doc.channel)) {`
- `frappe/frappe/email/doctype/notification/notification.py:449` — `self.log_error("Failed to send Notification")`
- `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:67` — `frappe.log_error(message, _("Slack Webhook Error"))`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:176` — `log_request(webhook.name, doc.doctype, doc.name, request_url, headers, data, res, status="Delivered")`
- `frappe/frappe/integrations/doctype/webhook/webhook.py:20` — `WEBHOOK_SECRET_HEADER = "X-Frappe-Webhook-Signature"`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ + suite/ (tüm sourceRoot; svg/po/pot/csv/mo/min.js hariç); arama `(?i)whatsapp|telegram|discord`: 3 dosya eşleşti. frappe/frappe/email/doctype/notification/notification.js:96 yalnız alıcı alanı filtresi; frappe/ui Phone story bir UI örneği; suite asset .map derlenmiş üçüncü taraf kodu. Hiçbirinde adaptör yok.
- frappe/ + suite/ (_.py,_.json,_.ts,_.tsx,_.vue,_.js); arama `(?i)chat_id|bot_token|wa_id|graph\.facebook|api\.telegram|discord(app)?\.com/api|sendMessage|messaging_product`: Eşleşenler: graph.facebook yalnız Facebook OAuth girişi (social_login_key.py, oauth.py); sendMessage yalnız Meet ChatPanel'in iç sohbeti; diğerleri suite derlenmiş asset'leri. Mesajlaşma sağlayıcısı entegrasyonu yok.
- frappe/frappe/email/doctype/notification/; arama `channel.*options|Slack|SMS|System Notification`: Kanal seçenekleri sabit: Email/Slack/System Notification/SMS. Dağıtım ve hata kaydı send_notification_by_channel içinde.
- frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py, frappe/frappe/integrations/doctype/webhook/webhook.py, frappe/frappe/core/doctype/sms_settings/sms_settings.py; arama `send_slack_message|requests\.(post|request)|log_error|log_request|webhook_secret|send_via_gateway|create_sms_log`: Slack hata kaydı, genel Webhook teslim günlüğü/yeniden deneme/HMAC imzası ve SMS gateway/log mevcut. Bunlar yeniden kullanılabilir temel yapılar; WhatsApp, Telegram ve Discord'a özel değiller.
- suite/suite (_.py,_.json), suite/suite/hooks.py; arama `(?i)notification_channel|messaging|sms_settings|send_sms|webhook`: Yalnız Mail push_subscription ve testleri ile hooks.py:283'teki realtime/webhook yorumu eşleşti. Sosyal kanal yok.
- suite/suite/headless_provider/; arama `(?i)notif|channel|whatsapp|telegram|discord|deliver`: Eşleşme yok. Yerel pilot sağlayıcıda bildirim kanalı sözleşmesi bulunmuyor.

Sınır: Yalnız sourceRoot altındaki frappe ve suite kaynağı salt okunur incelendi. ERPNext/HRMS ve ayrı bir WhatsApp/Telegram uygulaması kurulu değil; değerlendirilmedi.; Site config, veritabanı, Webhook veya Slack kayıtları ve credential değerleri incelenmedi. Kurulu bir sitede yapılandırma yoluyla Discord webhook'una istek atılıp atılmadığı kaynaktan bilinemez.; Test yazılmadı ve çalıştırılmadı; functionalAcceptance=not_run. Bu analiz yalnız kod varlığını gösterir, teslim/runtime davranışını kanıtlamaz.; Derlenmiş suite asset ve .map dosyalarındaki eşleşmeler satır satır okunmadı; üçüncü taraf kütüphane kodu kabul edildi.; suiteCommit bilinmiyor; frappe commit adf1fd0c2d6215ad4cac9976251198b2a35fbda6.

Temporal workflow: `saas-recheck-20261015t073528z-047`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### notifications-5 — Bildirim kanal yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (kapalı kanal çalışmasın, kiracılar arası erişim olmasın) somut. Kaynakta kanal parçaları dağınık duruyor: Suite Mail Frappe PushNotification'ı ve push_relay'i kullanıyor, Drive frappe.sendmail ile e-posta gönderiyor. Push Subscription için has_permission hook'u var. Kiracı düzeyinde kanal açma/kapama, kimlik bilgisi saklama ve yönlendirme için ortak bir model görülmedi.

Eksik: Kiracı tanımı belirsiz: site başına kiracı mı, tek sitede kiracı alanı mı? Yalıtım sınırı buna bağlı.; Frappe v17-dev Notification DocType'ındaki kanal alanının ve Push/Email/System Notification kanallarının yerel kaynakla eşlemesi yapılmamış; dayanak yalnız genel dokümanlar.; Kanal kimlik bilgilerinin nerede tutulacağı (Password alanı, site config) ve kimin yöneteceği (rol/DocPerm) tanımlı değil.; Push etkin durumu istemcide localStorage'a bağlı; sunucu tarafında 'kanal kapalı' kararının nerede uygulanacağı tanımlı değil.; Birincil görev olarak notification-preference eşlenmiş; kanal yönetimi ile kullanıcı tercihi ayrı sorumluluklar olarak ayrıştırılmamış.

Sonraki adım önerisi: Mevcut görev ID'si altında tek bir kanal-politikası sözleşmesi yazılmalı: kiracı sınırı, kanal etkinlik bayrağının sunucuda kontrol edildiği tek nokta (Notification gönderim yolu, sendmail, PushNotification) ve Custom DocPerm ile yetki. Önce v17 frappe/email/doctype/notification kaynağındaki kanal alanı doğrulanmalı.

Mevcut birincil görev: `notification-preference--implementation`. Kaynak: `suite/suite/mail/doctype/mail_message/mail_message.py:17`; `suite/suite/drive/api/notifications.py:148`; `suite/suite/hooks.py:185`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:116`.

#### notifications-6 — Konu/kanal tercihleri, izinler, sessiz saatler ve özet gönderim.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (saat dilimine göre sessiz aralıkta erteleme, tek özet) ölçülebilir. Kaynakta yalnız yapı taşları var: zamanlanmış görev hook'ları, frappe.enqueue ve Meet'te istemci tarafı zil tercihi. Konu/kanal tercihi, sessiz saat ve özet gönderimi için sunucu tarafı bir model görülmedi.

Eksik: Tercih veri modeli yok: kullanıcı, konu ve kanal ekseni ve varsayılanlar tanımlanmamış. Frappe'nin yerel Notification Settings'iyle ilişkisi (yeniden kullanım mı, genişletme mi) belirtilmemiş.; Saat dilimi kaynağı (User.time_zone ya da sistem varsayılanı) ve DST davranışı tanımsız.; Özet penceresi, gruplama anahtarı ve 'tek gönderim' için idempotency kuralı yok.; Meet zil tercihi yalnız istemcide çalışıyor; bunun sunucu tercihi gibi sayılmaması gerektiği yazılmamış.; scopeDecision gerekçesi kanal seçimi metninin kopyası; tercih kapsamına özgü değil.

Sonraki adım önerisi: Mevcut notification-preference görevine şunlar eklenmeli: önce v17 Notification Settings kaynağının hangi alanlarının yeniden kullanılacağı belirlenmeli; sessiz saat ve özet için tek bir scheduler_events girdisi ve erteleme kuyruğu sözleşmesi (saat dilimi kaynağı, idempotency anahtarı) yazılmalı.

Mevcut birincil görev: `notification-preference--implementation`. Kaynak: `suite/suite/hooks.py:289`; `frappe/frappe/api/v2.py:293`; `suite/frontend/src/apps/meet/utils/audioNotifications.ts:90`.

#### notifications-7 — Okundu bilgisi, teslimat geçmişi, yeniden deneme ve alternatif kanal.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Okundu ile teslim edildi ayrımı ve tek alternatif geçiş ölçütü anlamlı. Kaynakta kanala özgü durumlar var: Drive Notification'da alıcıyla sınırlanmış read bayrağı, Mail'de seen ve JMAP Event Notification'da draft/teslim açıklaması. Kanallar arası teslimat geçmişi ve alternatif rota yok. Drive paylaşım e-postasındaki hata ise sessizce yutuluyor.

Eksik: Dayanak olarak version-15 kaynak URL'leri gösterilmiş; yerel kurulum Frappe 17.0.0.dev0 (adf1fd0c). Notification Log ve Email Queue alanlarının v17'de eşlenmesi gerekiyor.; 'Teslim edildi' her kanal için (e-posta, push, sistem bildirimi) tanımlanmamış.; Alternatif kanala geçiş tetikleyicisi (hangi hata, ne zaman aşımı) ve tek geçişi garanti eden kayıt anahtarı yok.; send_share_email istisnayı yutuyor; bu yoldan teslimat geçmişi oluşmaz ve görevde belirtilmemiş.; Birleşik teslimat kaydının yeni bir DocType mı olacağı, yoksa Notification Log/Email Queue üzerinden bir görünüm mü olacağı kararlaştırılmamış.

Sonraki adım önerisi: notification-delivery görevinde v17 Notification Log ve Email Queue durum alanları kaynaktan çıkarılıp kanal başına okundu/teslim/başarısız eşleme tablosu yazılmalı. Ardından tek geçişli fallback için mesaj kimliği bazlı bir idempotency kuralı ve yutulan hataların kayda alınması tanımlanmalı.

Mevcut birincil görev: `notification-message--implementation`. Kaynak: `suite/suite/drive/api/notifications.py:63`; `suite/suite/drive/api/notifications.py:159`; `suite/suite/calendar/doctype/event_notification/event_notification.json:155`; `suite/pyproject.toml:45`.

#### notifications-8 — Bildirim tekilleştirme, sıklık sınırı ve pazarlama/işlemsel ayrımı.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (aynı olay iki kez tüketilince tek bildirim; pazarlama izni ayrı) test edilebilir. Kaynakta yalnız yerel parçalar var: Drive aynı içerikli kaydı exists ile atlıyor, ancak bu atomik değil ve olay anahtarına dayanmıyor. Meet'te türe göre 5 sn'lik istemci tarafı sınır var. E-posta unsubscribe uç noktası açık. Ortak tekilleştirme, sıklık sınırı ve izin sınıflandırması yok.

Eksik: Olay anahtarının tanımı (kaynak doküman, olay türü, sürüm) ve saklama süresi yok.; Drive'daki exists-sonra-insert yaklaşımı eşzamanlı tüketimde yarış koşuluna açık; görev benzersiz kısıt ya da kilit gerektirdiğini belirtmiyor.; Sıklık sınırının ekseni (kullanıcı, kanal, konu) ve aşımda ne olacağı (atla, özete ekle) tanımsız.; Pazarlama/işlemsel sınıfı hangi alanda tutulacak, belirtilmemiş. Unsubscribe'ın işlemsel e-postayı kesmemesi kuralı yok.; Google Consent Mode web etiket izni içindir; mesajlaşma izni için uygun bir kaynak değil.

Sonraki adım önerisi: notification-message görevine olay anahtarı ve benzersiz kısıt sözleşmesi ile mesaj sınıfı alanı (transactional/marketing) eklenmeli. İzin kaynağı Frappe'nin unsubscribe mekanizmasına bağlanmalı. Consent Mode kaynağı mesajlaşma izni kaynağıyla değiştirilmeli.

Mevcut birincil görev: `notification-message--implementation`. Kaynak: `suite/suite/drive/api/notifications.py:124`; `suite/frontend/src/apps/meet/utils/notificationContext.ts:25`; `suite/suite/hooks.py:425`.

#### notifications-9 — Slack ve Microsoft Teams bildirim bağlayıcıları; kanal eşleme ve bağlantı yaşam döngüsü.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de somut bir Slack primitive'i var. "Slack Webhook URL" DocType'ında webhook_name (unique, autoname), webhook_url ve show_document_link alanları bulunuyor. Yalnızca System Manager DocPerm'i tanımlı. Değişiklikler track_changes ile izleniyor. send_slack_message, requests.post ile tek seferlik bir JSON POST yapıyor. Hata olursa 400/403/404/410/500 için sabit mesajı frappe.log_error'a yazıp "error" döndürüyor. Notification DocType'ının channel seçenekleri Email/Slack/System Notification/SMS. Slack kanalında slack_webhook_url Link alanı zorunlu ve send_notification_by_channel → send_a_slack_msg ile gönderiliyor. İstisnalar log_error ile kaydediliyor. queue_send, evaluate_alert'i frappe enqueue (RQ) ile arka plana atabiliyor. Bu kısım "bildirimi Slack'te bir webhook kanalına eşleme" davranışını kısmen karşılıyor. Suite uygulamasında ve yerel pilot olan suite/headless_provider'da (api.py, local_fixture.py, **init**.py) Slack, Teams, webhook ya da kanal bağlayıcısı yok. Suite'teki "teams" eşleşmeleri Drive ekip kavramıyla ilgili kaldırma patch'leri; Retry-After eşleşmeleri ise mail/JMAP istemcisine ait. Microsoft Teams bağlayıcısı hiçbir kökte yok. Bu sonuç yalnızca kaynak koda dayanıyor, runtime kabulü yapılmadı (functionalAcceptance: not_run).

Eksik: Microsoft Teams bağlayıcısı (Workflows/Power Automate webhook veya bot/Graph yolu) iki app kökünde de yok.; Kiracıya ait bağlantı modeli yok. Slack Webhook URL kaydında tenant/sahip alanı yok ve DocPerm yalnız System Manager'a tanımlı. Kiracı veya sahip bazında izin ve user permission kapsamı yok.; webhook_url gizli değer olmasına rağmen Password değil Data alanı; secret olarak saklanmıyor, liste görünümünde de çıkıyor (in_list_view).; İzinli kanal politikası yok: hangi kiracının, hangi rolün hangi kanala gönderebileceğini sınırlayan bir allowlist veya capability kontrolü bulunmuyor.; Hız sınırı yok: 429 ve Retry-After işlenmiyor, geçici hatalarda tekrar deneme ya da backoff yok, gönderim denemesi ve sonucu için kalıcı bir teslim/outbox kaydı yok. Elde yalnız Error Log var.; Bağlantı yaşam döngüsü yok: active/revoked/needs_reauth durumu, sahip ayrılınca devir veya yeniden yetkilendirme görünürlüğü ve iptal edilen bağlantı için kuyruktaki işi kesen bir kontrol bulunmuyor. send_slack_message kayıt varsa koşulsuz gönderiyor.; requests.post timeout içermiyor; Slack OAuth/bot token yolu yok.; headless_provider'da bağlantı ya da teslim sözleşmesini dışa açan bir API yok.

Sonraki somut adım: Tek ve dar bir davranışla başlanmalı: iptal edilen bağlantı gönderimi kesmeli. Sıra şöyle önerilir: 1) team-message-delivery--contract içinde kiracıya ait bir bağlantı DocType sözleşmesi tanımlanır. Bu sözleşme tenant, sahip, provider (Slack/Teams), Password tipinde secret, status (active/revoked/needs_reauth) ve izinli kanal alanlarını içerir. Mevcut Slack Webhook URL değiştirilmez; additive olarak ondan yeniden kullanılır. 2) Gönderim, outbox--contract üzerinden enqueue edilen bir teslim kaydına bağlanır. Worker gönderimden hemen önce status ve izinli kanal kontrolünü yapar. İptal edilmiş bağlantı için RED testi yazılır, sonra GREEN yapılır. 3) Aynı worker'a timeout, 429/Retry-After ve sınırlı backoff ile denemeleri izlenebilir kılan teslim kaydı eklenir. 4) Sahip ayrılınca needs_reauth durumuna geçiş ve bunun görünürlüğü eklenir. 5) Ancak bundan sonra tek bir hedef Teams API'si (Workflows webhook) aynı sözleşmeye ikinci provider olarak bağlanır. Headless provider yalnız bu sözleşmeyi dışa açmalı; Suite Vue arayüzüne bağımlı olmamalı.

Önerilen bağımlılık/sıra: team-message-delivery--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; email-template--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `team-message-delivery--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:63` — `r = requests.post(slack_url, data=json.dumps(data))`
- `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:67` — `frappe.log_error(message, _("Slack Webhook Error"))`
- `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.json:27` — `"label": "Webhook URL",`
- `frappe/frappe/email/doctype/notification/notification.json:76` — `"options": "Email\nSlack\nSystem Notification\nSMS",`
- `frappe/frappe/email/doctype/notification/notification.py:438` — `self.send_a_slack_msg(doc, context)`
- `frappe/frappe/email/doctype/notification/notification.py:385` — `"frappe.email.doctype.notification.notification.evaluate_alert",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (sourceRoot tamamı; _.po/pot/csv/mo hariç); arama `(?i)slack|microsoft.?teams|incoming.?webhook`: 25 dosya bulundu. Gerçek uygulama yalnız frappe/frappe/integrations/doctype/slack_webhook_url/_ ve frappe/frappe/email/doctype/notification/* içinde. Diğerleri ikon, derlenmiş bundle/map dosyaları ve Suite takvim UI'ındaki ilgisiz eşleşmeler.
- frappe/frappe/email/doctype/notification; arama `(?i)slack`: Channel=Slack seçeneği, slack_webhook_url Link alanı ve send_a_slack_msg → send_slack_message çağrısı bulundu.
- sourceRoot tamamı (*.map/po/pot/csv/mo/svg hariç); arama `(?i)microsoft.?teams|ms.?teams|teams.?webhook|power.?automate|adaptive.?card|chat\.postMessage|slack_sdk|bot.?token`: Eşleşme yok. Teams bağlayıcısı ve Slack bot/OAuth yolu bulunmuyor.
- suite/; arama `(?i)teams|retry.?after|\b429\b|webhook_url|o365|msteams`: 34 dosya bulundu. Eşleşmeler Drive ekip kaldırma patch'leri, mail/JMAP Retry-After ve meet recorder ile ilgili. Bildirim kanalı bağlayıcısı yok.
- suite/suite/headless_provider; arama `(?i)slack|webhook|notification|channel`: Eşleşme yok. Yerel pilot provider'da kanal teslim sözleşmesi bulunmuyor.
- frappe/frappe/email/doctype/notification/notification.py; arama `def (evaluate_alert|trigger_notifications|run_notifications)|enqueue\(|send_notification_by_channel`: queue_send içindeki enqueue(evaluate_alert) bulundu. Slack gönderiminde retry, rate-limit veya iptal kontrolü yok.

Sınır: Kaynak analizi yalnızca kurulu frappe ve suite app kökleriyle sınırlı. ERPNext/HRMS ve harici ekosistem incelenmedi.; Hiçbir kod veya test çalıştırılmadı. functionalAcceptance: not_run. Slack/Teams uç noktalarının gerçek davranışı ve Teams API değişiklikleri doğrulanmadı.; suiteCommit bilinmiyor. headless_provider yerel pilot ek kod; upstream-native değil.; Notification tetikleme yolunun tamamı (trigger_notifications ile hooks arasındaki eşzamanlı ya da asenkron çağrı akışı) satır satır okunmadı. Değerlendirme Slack gönderim kodu ile queue_send/enqueue üzerine kuruldu.; Derlenmiş public/dist ve .map dosyaları davranış kanıtı sayılmadı.

Temporal workflow: `saas-recheck-20261015t073528z-048`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

### Modüller, paketler ve kullanım hakları

#### modules-1 — Modül açma ve kapatma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (API/job reddi, veri koruma) tanımlı. Yerel v17-dev kaynakta veriye dokunmadan uygulamayı devre dışı bırakan, yalnız System Manager'ın çağırabildiği set_app_state ve is_module_disabled bulunuyor. Ancak talimat genel dokümana dayanıyor ve bu yerel primitive'lere eşlenmemiş. Suite tek bir app olduğu için (Drive/Mail/Sheets…) app düzeyinde kapatma tüm ürünleri birlikte kapatır.

Eksik: Ürün modülünün karşılığı belirsiz: app mi, Suite içindeki Module Def mi?; Devre dışı app'in /api/method, /api/resource ve scheduler/RQ çağrılarını gerçekten reddettiğini gösteren kaynak bu excerpt'te yok (unknown).; Kiracının neye karşılık geldiği (site mi, site içi kayıt mı) tanımlanmamış.; Modül durumu ile ticari kullanım hakkı ve kullanıcı yetkisi arasındaki ayrım yazılmamış.; Talimatlarda Frappe v17-dev sürüm eşlemesi yok.

Sonraki adım önerisi: capability-activation--implementation görevinde frappe/app_state.py ile frappe/installer.py içindeki disable_app akışı salt okunur incelenip handler, scheduler ve before_job zorlaması doğrulanmalı. Yeni bir durum tablosu kurmak yerine set_app_state/is_module_disabled üzerine Suite alt modül eşlemesi yazılmalı. Kiracı=site kararı açıkça kaydedilmeli.

Mevcut birincil görev: `capability-activation--implementation`. Kaynak: `frappe/frappe/core/doctype/installed_applications/installed_applications.py:154`; `frappe/frappe/permissions.py:9`; `frappe/frappe/core/doctype/installed_applications/installed_applications.js:73`; `suite/pyproject.toml:6`.

#### modules-2 — Modül tanım dosyası: module.manifest.yml.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

module.manifest.yml'nin özel bir platform sözleşmesi olduğu ve deterministik çeviri gerektiği doğru tespit edilmiş. Yerelde bu bilginin karşılıkları dağınık hâlde zaten var: hooks.py içindeki app metadata, pyproject'teki frappe-dependencies aralığı ve required_apps hook'u. Talimatta şema, alan listesi ve gerçekten gerekli olup olmadığı kararı yok.

Eksik: YAML şeması, zorunlu alanlar ve kimlik/sürüm biçimi tanımlı değil.; Manifest ile hooks.py/modules.txt/pyproject arasında hangisinin tek doğruluk kaynağı olduğu belirlenmemiş; çift kaynak riski var.; Manifestin GenUI veya UI capability registry ile karışmaması gerektiği yazılmamış.

Sonraki adım önerisi: capability-definition--implementation görevinde önce manifestin gerçekten gerekip gerekmediğine karar verilmeli. Gerekiyorsa mevcut hooks.py, pyproject [tool.bench.frappe-dependencies] ve required_apps'ten türetilen, doğrulanmış salt okunur bir görünüm olarak tanımlanmalı; ayrı bir yazma kaynağı olmamalı.

Mevcut birincil görev: `capability-definition--implementation`. Kaynak: `suite/suite/hooks.py:6`; `suite/pyproject.toml:45`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:189`.

#### modules-3 — Modül kataloğu, kurulum, bağımlılık, sürüm uyumu ve güvenli kaldırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta bağımlılık (required_apps), sürüm aralığı (frappe-dependencies), kurulu app sürüm listesi ve uninstall hook'u var. Custom modüllerin app uninstall'da silinmesini önleyen sahiplik ayrımı da mevcut. SaaS kataloğu, sürüm uyum politikası ve geri dönüş sözleşmesi ise talimatta somut değil.

Eksik: Katalog verisinin kaynağı ve hangi kapsamda gösterileceği (site/kiracı) tanımlı değil.; Kaldırmadan önce yedek/geri yükleme sahibi ve adımları yok; 'geri dönüş denenmeli' ölçülebilir değil.; SaaS akışında uninstall yerine devre dışı bırakmanın varsayılan olacağı yazılmamış.; Suite monolitik olduğu için ürün bazında kurulum app kurulumuyla yapılamaz; bu kısıt not edilmemiş.

Sonraki adım önerisi: Kataloğu Installed Applications + required_apps + frappe-dependencies üzerinden salt okunur bir projeksiyon olarak tanımla. SaaS akışında uninstall'ı yalnız yedek şartlı operasyon adımı yap ve kullanıcı akışında set_app_state'i kullan. Yedek/geri dönüş sahipliği deploy/rollback sorumlusuna (Hüseyin Cengiz) bağlanmalı.

Mevcut birincil görev: `capability-definition--implementation`. Kaynak: `frappe/frappe/core/doctype/installed_applications/installed_applications.py:56`; `frappe/frappe/core/doctype/module_def/module_def.py:39`; `frappe/frappe/hooks.py:19`; `suite/pyproject.toml:44`.

#### modules-4 — Modül kapanırken kayıt koruma ve devam eden işlemleri durdurma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (yazma engeli, okumanın sürmesi, işin güvenli noktada bitmesi) anlamlı. Yerel primitive'ler: veriyi koruyarak devre dışı bırakma, before_job hook'u ve yalnız reddedebilen has_permission hook zinciri. 'Salt okunur askı' durumu ile job boşaltma sözleşmesi talimatta tanımlı değil; mevcut disable okumayı da kapatıyor olabilir.

Eksik: Devre dışı ile salt okunur askı arasındaki ayrım tanımsız.; Kuyruktaki ve çalışan RQ job'ları ile Suite scheduler_events için durdurma/boşaltma kuralı yok.; 'Güvenli nokta' her modül için tanımlanmamış (ör. Mail push, Sheets collab).

Sonraki adım önerisi: Önce disable_app'in scheduler ve enqueue filtrelemesi salt okunur incelenmeli. Ardından askı durumu, has_permission hook'u üzerinden write/create/submit reddi olarak tanımlanmalı. Job tarafında before_job içinde durum kontrolü yapılmalı; ignore_permissions kısayolu kullanılmamalı.

Mevcut birincil görev: `capability-activation--implementation`. Kaynak: `frappe/frappe/permissions.py:496`; `frappe/frappe/permissions.py:502`; `frappe/frappe/hooks.py:509`; `suite/suite/hooks.py:289`.

#### modules-5 — Feature flags (özellik açma-kapama anahtarları) ve kiracı bazlı kademeli açılış.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam koşullu ve kabul ölçütü (seçilen kiracı, backend ile frontend'in aynı kararı vermesi) net. Yerelde site bazlı frappe.conf okuma ve boot verisine ekleme hook'u var. Kiracı bazlı kademeli açılış servisi görünmüyor. Bayrağın nerede saklanacağı, nasıl değerlendirileceği ve kohort tanımı talimatta yok.

Eksik: Kiracı=site mi, yoksa site içi kohort mu, belli değil.; Bayrağın kaynağı (site_config mi, Single DocType mı), kimin değiştirebileceği ve audit kaydı tanımlı değil.; Feature flag'in kullanım hakkı ve yetki yerine geçmeyeceği belirtilmiş, ama sunucuda zorlanacağı nokta belirtilmemiş.

Sonraki adım önerisi: Koşullu görev açılmadan önce kiracı=site kararını kaydet. Tek bir sunucu fonksiyonu tanımla: kaynak site config veya System Manager yetkili Single, frontend'e extend_bootinfo ile aynı sonuç aktarılır. Yeni bir flag servisi altyapısı kurma.

Mevcut birincil görev: `feature-flag--implementation`. Kaynak: `frappe/frappe/api/v2.py:32`; `suite/suite/hooks.py:336`.

#### modules-6 — Modülün yayımladığı işlev, olay, yetki ve ekran kayıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerelde app başına hook çözümleyip raporlayan Audit System Hooks raporu, yalnız reddedebilen has_permission zinciri, whitelist kontrolü ve uygulama ekranı kaydı var. Ancak capability kimliği, benzersizlik kuralı ve headless ekran kaydı sözleşmesi tanımlanmamış. Kaynak/sunucu capability'leri ile GenUI registry'sinin ayrı tutulacağı da yazılmamış.

Eksik: Capability ID şeması ve çakışmada ne olacağı tanımlı değil.; Sunucu reddinin whitelist + DocType izni + has_permission ile sağlanacağı açıkça yazılmamış.; UI provider registry'nin yalnız sunum katmanı olduğu ve GenUI ile birleştirilmeyeceği belirtilmemiş.

Sonraki adım önerisi: capability-definition--implementation ile ui-provider-registry/permission görevlerinde şunu yaz: capability = whitelisted method veya DocType+ptype. Sunucu kararı mevcut izin zincirinden gelir. UI registry bunu yalnız gösterir. GenUI registry'si ayrı kalır.

Mevcut birincil görev: `capability-definition--implementation`. Kaynak: `frappe/frappe/custom/report/audit_system_hooks/audit_system_hooks.py:52`; `frappe/frappe/api/v1.py:121`; `suite/suite/hooks.py:16`.

#### modules-7 — Modüle ait kurulum, güncelleme ve veri geçişi bildirimleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerelde after_migrate yaşam döngüsü hook'u, kurulu app sürüm kaydı ve app sırası değişikliği için Version log var. 'Başarısız geçiş yeni sürümü etkinleştirmemeli' kuralı ise kod deploy ve rollback'e bağlı. Talimat bunu Frappe'nin site başına migrate modeline ve rollback sahibine eşlemiyor. Bildirimin kanalı ve kime gideceği de tanımsız.

Eksik: migrate başarısız olunca kod/sürüm geri alma sorumluluğu ve adımı tanımlı değil.; Bildirimin hangi kayıt veya kanaldan, hangi kiracıya gideceği belirtilmemiş.; Migration ilerlemesinin kaynağı (patch log mu, job mı) tanımlı değil.; Talimatta v17-dev patch/migrate davranışına sürüm eşlemesi yok.

Sonraki adım önerisi: Bildirim yalnız başarılı after_migrate sonrasında üretilmeli; sürüm Installed Applications'tan okunmalı. Başarısız migrate durumunda geri alma, deploy/rollback sahibinin (Hüseyin Cengiz) operasyon adımına bağlanmalı. Ürün tarafına yalnız durum gösterimi kalmalı.

Mevcut birincil görev: `capability-activation--implementation`. Kaynak: `suite/suite/hooks.py:334`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:139`; `frappe/frappe/hooks.py:11`.

#### catalog-1 — Paket, plan, fiyat ve pricing table (paket-fiyat karşılaştırma tablosu) yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (plan, para birimi, dönem fiyatı API, panel ve pricing table'da aynı sürüm) anlamlı. Ancak tüm entegrasyon ERPNext Subscription Plan'a dayanıyor ve ERPNext bu sitede kurulu değil. Kurulu suite uygulaması faturalama veya plan kataloğu sunmuyor. Frappe'nin yerel Package/Package Release DocType'ları modül dışa aktarma paketleridir, ticari paket değildir.

Eksik: ERPNext'i kurma ile kendi plan DocType'ını yazma arasındaki karar yazılmamış; ERPNext kurulacaksa sürüm eşlemesi Frappe 17.0.0-dev'e karşı tanımlanmamış.; Headless pricing table için okuma sözleşmesi (hangi alanlar, Guest erişimi, sürüm kimliği) tanımsız.; Frappe Package/Package Release'in SaaS paketi olarak kullanılmaması gerektiği açıkça yazılmamış.; plan-feature--implementation ile özellik matrisinin sahiplik sınırı belirsiz.

Sonraki adım önerisi: plan-definition--implementation görevine bir karar notu ekleyin: ERPNext kurulumu ya da özel uygulamada plan/fiyat-sürümü DocType'ı. Notta sürüm kimliği, para birimi ve dönem alanları ile native DocType izinleri yer alsın. Kurulum veya kod değişikliği yapılmasın.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:45`; `frappe/frappe/core/doctype/package/package.json:8`; `frappe/frappe/hooks.py:11`.

#### catalog-2 — Paneldeki paket içeriklerinin frontpages (herkese açık sayfalar) ile eşleşmesi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: taslak herkese açık olmamalı, yayınlanan sürüm iki yüzeyde birebir eşleşmeli. Kaynakta izin kontrollü REST kaynak rotaları ve okuma izni kontrolü var. Yayın durumu, herkese açık projeksiyon ve sürüm eşleşmesi sözleşmesi ise yok. Package Release'teki publish alanı yalnızca dosyaları dışa aktarır, web yayını değildir.

Eksik: Taslak ve yayınlanmış ayrımı için durum alanı ve yayınlama aksiyonunun sunucu doğrulaması tanımsız.; Frontpage'in (Vite/PWA) Guest olarak hangi uç noktadan, hangi salt-okunur projeksiyonla okuyacağı ve önbellek temizleme kuralı yazılmamış.; Genel /api/resource'u Guest'e açmak yerine yalnızca yayınlanmış sürümü döndüren dar bir uç nokta gerektiği belirtilmemiş.

Sonraki adım önerisi: plan-definition--implementation kapsamına küçük bir yayın sözleşmesi ekleyin: yalnızca yayınlanmış ve sürüm kimliği taşıyan kayıtları dönen tek bir whitelisted okuma metodu, rol izinleri ve frontpage'in bu sürüm kimliğini göstermesi. ignore_permissions kullanılmasın.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/core/doctype/package_release/package_release.py:76`.

#### catalog-3 — Paket ve fiyat sürümleri; mevcut müşterinin eski koşullarını koruma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Grandfathering kabul ölçütü anlamlı. Ancak abonelik ile fiyat sürümü arasındaki bağ, değiştirilemezlik ve faturalama motoru tanımsız; ERPNext kurulu değil. Frappe'de submit/cancel/amend hakları değiştirilemez sürüm kaydı için kullanılabilecek bir ilkel. Package Release'in major.minor.patch adlandırması ise modül paketine ait ve fiyat sürümü için uygun değil.

Eksik: Fiyat sürümünün submit sonrası değişmezliği ve yeni sürümün amend ya da ayrı kayıtla üretilmesi kararı yok.; Abonelik veya sözleşmenin hangi fiyat sürümüne bağlanacağı ve yenilemede hangi sürümün geçerli olacağı kuralı yazılmamış.; Faturayı hangi motorun (ERPNext ya da özel) hesaplayacağı belirsiz.

Sonraki adım önerisi: Plan karar notuna şunları ekleyin: submittable fiyat-sürümü kaydı, abonelikte sürüm Link'i ve 'yeni fiyat yalnızca yeni aboneliğe uygulanır' kuralı. Kabul testi, ortak insan bütçesi içinde tek senaryo olarak sonraya bırakılsın.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `frappe/frappe/permissions.py:22`; `frappe/frappe/core/doctype/package_release/package_release.py:66`.

#### catalog-4 — Aylık/yıllık, kullanıcı başına, kullanım bazlı ve karma fiyat modelleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Fiyat modelleri ve kabul örnekleri (aylık/yıllık, koltuk, tüketim) belirtilmiş. Dönem, fiyat ve miktar yapısı ERPNext'e dayanıyor ve ERPNext kurulu değil. Kurulu kaynakta ölçülen kullanım ya da karma fiyat hesaplayan bir yapı görülmedi.

Eksik: Kullanım ölçümünün kaynağı, toplama dönemi, yuvarlama, para birimi ve kıst hesap kuralları tanımsız.; Karma model için formül sözleşmesi ve kabul edilen fiyat sürümüne referansı yazılmamış.; ERPNext'in Frappe 17-dev ile uyumluluğu doğrulanmamış.

Sonraki adım önerisi: Önce catalog-1 kararı verilsin. Ardından plan-definition--implementation'a bir hesap kuralı tablosu eklensin: her model için girdi, formül, yuvarlama ve kullanılan fiyat sürümü. Ölçüm altyapısı kurulması önerilmez.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `suite/pyproject.toml:6`; `suite/pyproject.toml:45`.

#### catalog-5 — Ek modül, ek kullanıcı, ek kota ve müşteri özel fiyat teklifi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü (tek fatura, doğru hak artışı, teklife özel fiyatın başka müşteriye uygulanmaması) anlamlı. Aboneliğe birden çok plan ekleme özelliği ERPNext'e ait ve kurulu değil. Müşteriye özel kapsam için Frappe'nin kullanıcı/paylaşım/sahip izinleri kullanılabilir, ancak hak eşlemesi tanımsız.

Eksik: Ek modül, kullanıcı ve kotanın plan-feature hak kaydına nasıl yansıyacağı sözleşmesi yok.; Müşteriye özel teklifin kapsamının User Permission ya da paylaşım ile sunucu tarafında zorlanacağı yazılmamış.; Tek faturalama motoru belirsiz.

Sonraki adım önerisi: plan-feature--implementation'a ek kalem ile hak artışı eşleme tablosu, plan-definition--implementation'a ise müşteri kapsamlı teklif kaydı ve native izin kuralı eklensin. Kapsam sunucuda zorlanmalı; istemci filtresine güvenilmemeli.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `frappe/frappe/permissions.py:94`; `frappe/frappe/client.py:134`.

#### catalog-6 — Satışa açık, gizli, kullanımdan kaldırılmış ve sözleşmeye özel paketler.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Dört satış durumu ve emekli plan kabulü tanımlı. Ancak geçiş kuralları, yetkili roller ve yenileme etkisi yazılmamış. Kaynak, görünürlüğün güvenlik sınırı olmadığını açıkça ayırıyor. Gizli veya sözleşmeye özel plan yalnızca UI'da gizlenirse yeni satışta seçilebilir kalır.

Eksik: Durum geçişleri (satışta → gizli → emekli) ve bunları yapabilecek roller tanımsız.; Yeni satışta emekli plan seçimini engelleyen sunucu doğrulaması ile mevcut sözleşmenin korunması arasındaki ayrım yazılmamış.; Sözleşmeye özel planın müşteri kapsamı catalog-5 ile bağlanmamış.

Sonraki adım önerisi: Plan kaydına satış durumu alanı ve abonelik oluşturmada sunucu tarafı doğrulama kuralı eklensin. Mevcut abonelikler durumdan etkilenmemeli. Bu not plan-definition--implementation görevine yazılsın; yeni görev açılmasın.

Mevcut birincil görev: `plan-definition--implementation`. Kaynak: `frappe/frappe/utils/modules.py:50`; `frappe/frappe/permissions.py:82`.

#### subscriptions-1 — Abonelik başlatma, yenileme, iptal ve suspend (hizmeti askıya alma).

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (tekrarlanan başlatma/iptal isteğinde ikinci abonelik oluşmaması, askıya alma kararının API haklarına aynı anda yansıması) açık. Ancak dayanılan ERPNext Subscription bu sitede kurulu değil. Yerel kaynaktaki 'subscription' adlı DocType'lar (JMAP Push Subscription, Automation Event Subscription) faturalama aboneliği değil. Askıya almaya en yakın parça, kullanıcı devre dışı bırakılınca oturumları temizleyen kullanıcı düzeyindeki mekanizma; tenant/abonelik düzeyinde askıya alma yok.

Eksik: Faturalama motoru seçilmemiş: ERPNext kurulumu, Frappe Cloud/Central veya yeni bir suite DocType'ı. Talimat ERPNext'i kurulu sayıyor.; Askıya alma kararını Keycloak/Frappe rol ve API haklarına bağlayacak sözleşme ve bunun yayılma sırası tanımsız.; Tekrarlanan isteklere karşı idempotency anahtarı ve tekillik kısıtı tanımsız.; Frappe 17.0.0-dev ile ERPNext sürüm eşlemesi verilmemiş.

Sonraki adım önerisi: subscription--implementation görevine faturalama motoru kararını (ERPNext kurulumu ya da suite DocType'ı) ve abonelik durumu → hak eşleme tablosunu ekle. Askıya alma, yerel olarak has_permission ve rol atamasıyla bağlanmalı.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `suite/suite/mail/events.py:128`; `suite/suite/mail/doctype/push_subscription/push_subscription.json:91`; `frappe/frappe/permissions.py:82`.

#### subscriptions-2 — Ücretsiz plan, deneme süresi ve denemeden ücretli plana geçiş.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü (denemenin bittiği anda doğru hakların uygulanması, ücretli plana geçişte verinin ve üyeliğin korunması) anlamlı. Ancak Trialing akışı ERPNext'e ait ve ERPNext kurulu değil. Yerelde yalnız Frappe Cloud'un raporladığı deneme bilgisini gösteren bir mock bulunuyor; deneme durumunu yönetme mantığı yerel kaynakta yok.

Eksik: Ücretsiz plan ve deneme haklarının hangi kayıtta tutulacağı ve hangi sınır anında değerlendirileceği tanımsız.; Saat dilimi ve deneme bitiş sınırının semantiği belirtilmemiş.; Ücretli plana geçişte üyeliği koruyan ve yeniden üyelik oluşturmayan geçiş sözleşmesi yok.; Frappe Cloud'a bağlı trial verisinin kendi barındırdığımız (self-hosted) ürün için geçersiz olduğu belirtilmemiş.

Sonraki adım önerisi: Deneme ve ücretsiz plan haklarını subscription--implementation görevinin hak modeline bağla. Kabul ölçütüne deneme sınırının hangi saatte değerlendirileceğini (saat sınırı) ekle. frappecloud_billing mock verisini yalnız referans olarak not et.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:50`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:101`.

#### subscriptions-3 — Paket yükseltme/düşürme; hemen veya dönem sonunda değiştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü, hemen uygulanan ve dönem sonunda uygulanan değişikliği ayrı ayrı test etmeyi ve paket düşürmede verinin sessizce silinmemesini istiyor; bu yeterince açık. Yerelde change_plan ve get_plan_options var, ancak yalnız Frappe Cloud Central'a yönlendiriyorlar ve iş mantığı Central tarafında. Değişikliğin ne zaman yürürlüğe gireceği ve kotanın aşılması (paket düşürme sonrası fazla veri) durumu yerel kaynakta yok.

Eksik: Paket değişikliği kaydının (önceki/yeni plan, yürürlük tarihi) modeli tanımsız.; Paket düşürmede kotanın aşılması durumunda verinin salt okunur mu kalacağı yoksa engellenip engellenmeyeceği belirtilmemiş.; Central yönlendirmesinin kendi barındırdığımız SaaS için geçerli olmadığı belirtilmemiş.

Sonraki adım önerisi: subscription--implementation görevine paket değişikliğinin yürürlük politikasını ve kota aşımı davranışını ekle; değişiklik ekranı ui-family-35--implementation görevine bağlansın.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:22`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`.

#### subscriptions-4 — Dönem içi fiyat farkı, ödeme ek süresi ve yeniden etkinleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü dönem ortası fiyat farkı, ödeme ek süresi ve yeniden ödeme sonrası tutarla hakların uzlaşmasını istiyor. Ancak proration ve grace ayarları ERPNext Subscription Settings'e ait ve ERPNext kurulu değil. Ödeme ağ geçidi DocType'ları da payments uygulaması yoksa siliniyor.

Eksik: Ödeme sağlayıcısı ve payments uygulaması kararı yok.; Tahsilat webhook'u → yeniden etkinleştirme bağı ile bu bağın idempotency kuralı tanımsız.; Ek süre boyunca hangi hakların açık kalacağı belirtilmemiş.; Yuvarlama kuralı ve para birimi belirtilmemiş.

Sonraki adım önerisi: Önce faturalama motoru ve ödeme uygulaması kararını kaydet; ardından ek süre/hak tablosunu ve ödeme olayıyla yeniden etkinleştirme sözleşmesini subscription--implementation görevine ekle.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:14`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`.

#### subscriptions-5 — Müşterinin abonelik, fatura ve ödeme yöntemlerini yönetebildiği portal.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (müşteri yalnız kendi faturalarını görmeli, ödeme yöntemi sağlayıcı akışıyla değişmeli) açık. Yerelde ödeme yöntemi ekleme/kaldırma ve hosted checkout işlevleri var, ancak hepsi Frappe Cloud Central'a gidiyor ve System Manager rolüyle sınırlı. Bu nedenle son müşteriye yönelik headless bir portal sağlamıyor. ERPNext müşteri portalı da kurulu değil.

Eksik: Müşteri kapsamındaki okuma kuralı (yalnız kendi faturaları) için kullanılacak DocType izni, User Permission veya has_permission hook'u tanımsız.; Ödeme sağlayıcısı ve hosted checkout dönüş/uzlaşma akışı seçilmemiş.; Headless API yüzeyi (/api/v2 kaynak mı, whitelist metot mu) ve Keycloak oturum eşlemesi belirtilmemiş.

Sonraki adım önerisi: Portal API'sini yerel DocType izinleri ve has_permission üzerine tanımla; ödeme yöntemini yalnız sağlayıcının hosted akışına bırak. UI işi ui-family-35--implementation görevine bağlansın.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:56`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:88`; `frappe/frappe/client.py:176`.

#### subscriptions-6 — İptal nedeni, duraklatma, bitiş tarihi ve yeniden abonelik.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü dönem sonunda iptal ile hemen iptali ayırmayı ve yeniden abonelikte geçmişin korunmasını istiyor. Ancak iptal/bitiş durumları ERPNext'te ve ERPNext kurulu değil. Yerel kaynaktaki 'Cancelled' durumu Automation Event Subscription'a ait ve faturalama ile ilgisi yok. İptal nedeni ve duraklatma politikası tanımlanmamış.

Eksik: Duraklatma ile askıya alma (subscriptions-1) arasındaki fark ve her birinin haklara etkisi tanımsız.; İptal nedeni alanı için katalog/serbest metin seçimi ve bunun raporlanması belirtilmemiş.; Yeniden abonelik için yeni kayıt mı oluşturulacağı yoksa mevcut kayıt mı yeniden açılacağı tanımsız; geçmişin korunması için yeni kayıt öner.

Sonraki adım önerisi: Durum makinesini (aktif/duraklatılmış/askıda/dönem sonunda iptal/bitti) ve yeniden abonelik kuralını subscription--implementation görevine tek tabloda ekle. ERPNext kurulmazsa bunu suite DocType'ında yerel Frappe izinleriyle kur.

Mevcut birincil görev: `subscription--implementation`. Kaynak: `frappe/frappe/automation/doctype/automation_event_subscription/automation_event_subscription.py:29`; `suite/suite/mail/events.py:131`.

#### entitlements-1 — Entitlements (paket veya sözleşmeden doğan özellik kullanım hakları).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net: rol yetkisi olsa bile paket hakkı yoksa backend reddetmeli. Yerel kaynakta rol tabanlı karar ve per-DocType has_permission hook yapısı var, ancak paket ya da sözleşmeye bağlı hak kaydı yok. Talimat ERPNext Subscription Plan belgesine dayanıyor; ERPNext bu sitede kurulu değil.

Eksik: Kiracı modeli tanımsız: site başına kiracı mı, site içi kiracı mı belli değil. Bu yerel kurulumda tek site var.; Hak veri modeli ve kaynak sistem (faturalama/sözleşme) arasındaki sözleşme yok.; Administrator için kodda koşulsuz True dönüşü var. Bu atlatmanın hak denetiminde nasıl ele alınacağı belirtilmemiş.; ERPNext Subscription Plan yeniden kullanılamaz; yerine ne kullanılacağı tanımlı değil.; Altı maddenin tamamı tek bir göreve (entitlement-grant--implementation) bağlı; alt bağımlılık sırası belirtilmemiş.

Sonraki adım önerisi: entitlement-grant--implementation görevine şunları yazın: kiracı kimliği kararı, hak kaydı alanları (paket, özellik anahtarı, kaynak) ve tek bir backend karar noktası. Bu karar noktası has_permission hook'una mı yoksa servis katmanına mı bağlanacak, açıkça seçin.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `frappe/frappe/permissions.py:109`; `frappe/frappe/permissions.py:168`; `suite/suite/hooks.py:154`.

#### entitlements-2 — Paket hakları, teknik modül anahtarları ve kullanıcı yetkilerinin ayrı denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Üç ayrı denetim ve 'biri olumsuzsa red' kuralı açık yazılmış. Yerelde bunların üçü de ayrı ilkel olarak var: has_permission içinde app/modül devre dışı kontrolü, User Type üzerinden kullanıcı bazlı block_modules ve rol izinleri. Ancak ticari hak katmanı yok. Talimat bu mevcut ilkelleri ve v17-dev'e özgü is_module_disabled API'sini anmıyor.

Eksik: Teknik modül anahtarı olarak frappe.app_state.is_module_disabled mı, block_modules mı, yeni bir anahtar mı kullanılacak, eşlenmemiş.; is_module_disabled'ın v17-dev'deki davranışı kaynakta görülmedi. v16 belgelerine dayanmak yanıltıcı olabilir.; Frontend yalnızca bilgi amaçlı: useDocPermissions 'display-only' ve yüklenirken açık kalıyor (fail-open). Bu sınır talimatta açıkça yazılı değil.; Bir denetim reddettiğinde hangi denetimin reddettiğini gösteren hata/teşhis sözleşmesi yok.

Sonraki adım önerisi: Görev metnine bir eşleme tablosu ekleyin: ticari hak → yeni kayıt, teknik modül → is_module_disabled veya block_modules, kullanıcı → DocPerm. Hangi hook'ta AND ile birleştirileceğini yazın.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `frappe/frappe/permissions.py:135`; `frappe/frappe/core/doctype/user_type/user_type.py:97`; `frappe/ui/src/composables/useDocPermissions.ts:47`.

#### entitlements-3 — Kiracı özel hak tanımlama; başlangıç, bitiş ve geri alma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Başlangıç/bitiş sınırı ve geri almadan sonra önbelleğin tutarlı kalması kabul ölçütü olarak yazılmış. Hak kaydı DocType ile modellenebilir. User Permission ve Permission Manager'da hazır önbellek temizleme ve gerçek zamanlı bildirim kalıbı var. Süreli hak ve geri alma kaynakta yok.

Eksik: Saat dilimi ve sınır anlamı (dahil/hariç) tanımsız. Süre dolunca zamanlayıcı mı, istek anında değerlendirme mi kullanılacağı seçilmemiş.; Geri alma anında devam eden işlemler ve kuyruktaki işler için politika yok.; Önbellek geçersiz kılma için mevcut user_permissions hdel ve after_commit kalıbının yeniden kullanılacağı belirtilmemiş.; Hak değişikliklerinin denetim izi (track_changes veya log) gereksinimi yazılmamış.

Sonraki adım önerisi: Hak kaydına valid_from, valid_to ve revoked alanlarını ekleyin; değerlendirmeyi istek anında yapın. on_update/on_trash içinde önbellek temizliği ve after_commit yayını kullanın. Bu sözleşmeyi görev metnine yazın.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `frappe/frappe/core/doctype/user_permission/user_permission.py:41`; `frappe/frappe/core/doctype/user_permission/user_permission.py:42`; `frappe/frappe/core/page/permission_manager/permission_manager.py:157`.

#### entitlements-4 — Hak değişikliğinin panel, arka plan işi ve entegrasyonda uygulanması.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Panel, RPC, kuyruk ve entegrasyon için aynı sonuç isteniyor; ölçüt anlamlı. Kaynakta önemli kaçış yolları var: dahili yazımlar ignore_permissions=True kullanıyor; Drive, File iznini kendi modeliyle değiştiriyor (ignore_file_permissions); /method RPC yolu doküman iznine bağlı değil; toplu işlemler belirli bir eşikten sonra asenkron çalışıyor. Talimat bu yolları listelemiyor.

Eksik: Yürütme yollarının envanteri yok: whitelisted RPC, allow_guest uçları, scheduler_events, enqueue edilen işler, Drive'ın özel izin modeli.; ignore_permissions kullanılan dahili yazımlarda hak denetiminin nerede yapılacağı tanımsız.; Kuyruğa alınmış bir işin çalıştırılma anında hakkı yeniden kontrol edip etmeyeceği belirtilmemiş.; Entegrasyon (API anahtarı veya OAuth istemcisi) için hak bağlamının nasıl taşınacağı tanımsız.

Sonraki adım önerisi: Görev metnine yürütme yolu envanterini ve her yol için tek karar fonksiyonunun çağrılma noktasını ekleyin. Kuyruk işleri için çalıştırma anında yeniden denetim kuralı koyun.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `suite/suite/sheets/permissions.py:74`; `suite/suite/hooks.py:117`; `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:32`.

#### entitlements-5 — Askıdaki hesap için salt okunur erişim, veri dışa aktarma ve ödeme istisnaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Askıya alınmış hesapta yazmaların engellenmesi, export ve ödeme istisnası, kiracı sınırının korunması ölçüt olarak yazılmış. Kaynakta export iznini ayrı tutan std_rights ve HTTP metodunu okuma/yazma iznine eşleyen yapı var. Suite'te askı benzeri tek desen kullanıcı düzeyindeki disabled-account rolü; kiracı düzeyinde askı yok.

Eksik: Askı durumunun kaynağı ve hangi işlemlerin yazma sayılacağı tanımsız (POST ile çalıştırılan doküman metodları, set_value, rename gibi).; Ödeme akışının hangi DocType veya uçları kapsadığı belirsiz. ERPNext yok, ödeme sağlayıcısı seçilmemiş.; Export'un kişisel veri ve kiracı sınırı içinde nasıl teslim edileceği (dosya, süre, yetkili rol) tanımsız.; Kullanıcı düzeyindeki disabled rolü ile kiracı askısının farkı belirtilmemiş.

Sonraki adım önerisi: Askı politikasını yazma ptype'larının (write/create/delete/submit/cancel/import) reddi, export ve read'e izin, belirli ödeme uçlarına allowlist olarak tanımlayın ve görev metnine ekleyin.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v2.py:267`; `suite/suite/hooks.py:262`.

#### entitlements-6 — Müşteri ortamına kurulum için lisans doğrulama ve çevrimdışı tolerans.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

frappe ve suite kaynak köklerinde, müşteri ortamı kurulumu için imzalı lisans doğrulaması, lisans süresi kontrolü, çevrimdışı grace/tolerans veya lisans ile hak eşlemesi yapan bir kod bulunamadı. Bulunanlar yalnızca lisansla ilgisi olmayan genel ilkellerdir. (1) Upstream frappe'de PyJWT ile imza doğrulayan Entra/O365 token kontrolü vardır (frappe/frappe/utils/oauth.py:48). (2) Suite Meet kayıt callback'inde HS256 JWT doğrulaması vardır (aud/iss/require) (suite/suite/meet/recording/callback_auth.py:357). (3) Frappe Cloud faturalandırma istemcisi, barındırılan SaaS'ta site bilgisini ve trial_end_date'i uzaktan çeker. Ağ hatasında None döner; grace mantığı veya imzalı yerel lisans yoktur. (4) boot.py, frappe.conf.subscription değerini yalnızca bootinfo'ya taşır; uygulayıcı bir kontrol değildir. Lokal pilot suite/suite/headless_provider (api.py, local_fixture.py) lisans, abonelik, süre veya grace içermiyor. Suite'in Vue frontend'inde ve frappe/ui TrialBanner'da yalnızca FC deneme süresi gösterimi var; bu bir doğrulama değildir.

Eksik: İmzalı lisans artefaktının şeması (müşteri/tenant, hak listesi, iat/nbf/exp, kid) ve doğrulayıcısı (asimetrik imza, örn. EdDSA/RS256; yalnız public key sitede); Bozuk imza, yanlış kid veya süresi dolmuş lisansın deterministik reddi, saat kayması toleransı (leeway); Çevrimdışı tolerans: son başarılı doğrulama zamanının kalıcı kaydı ve enjekte edilebilir saatle deterministik grace hesabı (grace değeri kararlaştırılmamış); Süre dolunca uygulanacak kesme politikası (salt okunur / tam kesme) ve bunu uygulayan request/permission hook'u; Lisans haklarının entitlement-grant (entitlements-1) kaydına eşlenmesi ve audit/outbox olayları; İmza anahtarı yönetimi/rotasyonu ve iptal (revocation) mekanizması; Headless provider sözleşmesinde lisans/hak durumunun GenUI'ye sunulması (salt okunur durum uç noktası); AGPL-3.0 kapsamında müşteri kaynağı değiştirebildiği için teknik garantinin sınırı: hukuki/ürün kararı kullanıcıyla netleştirilmeli

Sonraki somut adım: Sıra korunmalı: önce entitlement-grant--contract/schema bağımlılıkları kapanmalı. Ardından kullanıcı şu üç kararı vermeli: müşteri ortamı kurulumu kapsamda mı, grace süresi kaç gün, süre dolunca salt okunur mu yoksa tam kesme mi. En küçük somut adım şudur: suite içinde, headless_provider pilotundan ayrı, saf ve yan etkisiz bir verify_license(token, public_keys_by_kid, now, last_verified_at, grace) fonksiyonu yazılmalı. Bu fonksiyon PyJWT ile algoritmayı sabitlemeli ve exp/iat/kid alanlarını zorunlu tutmalı (callback_auth.py:357 desenini izleyerek). Önce gerçek RED testleri yazılmalı: bozuk imza, süresi dolmuş, grace sınırının bir saniye öncesi/sonrası, saat kayması. Sonra GREEN yapılmalı. Sonraki adımlar sırasıyla: (2) son başarılı doğrulama zamanını kalıcılaştırmak; (3) claim'leri entitlement-grant kaydına eşlemek; (4) kesme politikasını tek bir hook ile uygulamak; (5) durumu headless provider'da salt okunur sözleşme olarak sunmak.

Önerilen bağımlılık/sıra: entitlement-grant--contract; entitlement-grant--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `entitlement-grant--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:101` — `request = post("press.saas.api.site.info")`
- `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:103` — `return None`
- `frappe/frappe/boot.py:633` — `return frappe.conf.subscription`
- `frappe/frappe/utils/oauth.py:48` — `return jwt.decode(token, signing_key.key, algorithms=["RS256"], audience=client_id)`
- `suite/suite/meet/recording/callback_auth.py:357` — `claims = jwt.decode(`
- `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:50` — `"trial_end_date": add_days(nowdate(), trial_days),`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, *.py/json/js/ts/vue); arama `(?i)(license_key|licen[cs]e.{0,20}(verif|valid|signature|expir)|grace.?period|offline.?(grace|toleran|mode)|verify_signature|public_key)`: Lisans doğrulaması yok. Grace eşleşmeleri ilgisiz: esbuild süreç sonlandırma, OAuth dinamik istemci temizliği, SFU token yenileme, takvim daveti. public_key eşleşmeleri Mail push ve Meet E2EE'ye ait.
- source (frappe + suite, *.py/json/ts/vue); arama `(?i)(entitlement|subscription_(plan|status|expir)|licen[cs]e_(token|file|status|expir)|activation_key|product_key|is_licensed|trial_end|expires_on)`: Entitlement veya lisans kodu yok. Yalnızca FC trial_end_date (frappecloud_billing.py, TrialBanner) ile document_share_key ve web_form_request expires_on alanları bulundu; bunlar lisansla ilgisiz.
- suite/suite/headless_provider; arama `(?i)(licen[cs]|subscription|expir|grace|offline|signature|entitle)`: Eşleşme yok. Lokal pilot provider lisans ya da hak durumu içermiyor.
- frappe/frappe (*.py); arama `(?i)(def\s+\w*(licen[cs]e|subscription|expir)\w*|"(subscription|license)[a-z_]*"\s*:|conf\.get\(\s*["'](subscription|license|expiry|limits))`: Yalnızca boot.add_subscription_conf bulundu (conf değerini bootinfo'ya taşıyor, uygulama yok). boilerplate/package get_license_text ise açık kaynak lisans metni içindir.
- frappe/frappe (*.py); arama `jwt\.decode|verify_jwt|ed25519.*verify|\.verify\(`: İmza doğrulama ilkelleri yalnızca OAuth/OIDC, 2FA ve parola bağlamında var. Lisans bağlamında kullanım yok.
- suite (*.py/json/ts/vue); arama `(?i)(licen[cs]e_[a-z]|subscription_[a-z]|plan_limit|max_users|user_limit|jwt\.decode|offline_grace)`: Eşleşmeler yalnızca Meet kayıt JWT'leri ve Mail push subscription ile ilgili. Lisans veya plan limiti yok.

Sınır: Kapsam yalnızca sourceRoot altındaki kurulu frappe ve suite app kaynaklarıdır. ERPNext/HRMS, Press/Frappe Cloud sunucu tarafı ve site_config değerleri incelenmedi; bunlar yok.; Bu değerlendirme yalnızca statik kaynak incelemesidir. Komut ve test çalıştırılmadı; functionalAcceptance: not_run.; Sonuç, kaynakta kodun var olup olmadığını gösterir. Dağıtım, hukuki uyum (AGPL-3.0) veya runtime davranışı kanıtlanmadı.; Derlenmiş public/frontend/assets bundle'larındaki uzun satırlar ayrıntılı incelenmedi. Kaynak frontend'de lisans mantığı bulunamadı.; Listelenen JWT/imza ilkelleri ancak gelecekte yeniden kullanılabilecek desenlerdir; lisans yeteneği sayılmaz.; suiteCommit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-019`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### campaigns-1 — Kupon, kampanya ve indirim yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü açık: geçerli kod yalnız uygun plan ve müşteri için indirime dönüşür, kodsuz fiyat korunur. Ancak dayanılan yetenekler ERPNext Coupon Code ve Pricing Rule; ERPNext bu sitede kurulu değil. Kurulu frappe içinde kupon/fiyat kuralı yok. 'UTM Campaign' yalnız pazarlama etiketidir, indirim değildir. Frappe Cloud faturalama mantığı yerelde değil, Central'dadır.

Eksik: ERPNext kurulacak mı, yoksa ayrı bir Frappe app'te yerel kupon modeli mi yazılacak? Bu karar yok.; Frappe 17.0.0-dev ile ERPNext sürüm uyumu eşlenmemiş.; SaaS plan/abonelik/checkout modelinin hangi DocType'ta durduğu tanımlı değil; Central billing ile sınır belirsiz.; İndirimi uygulayan sunucu tarafı yetki ve doğrulama noktası tanımlı değil (yalnız UI hesaplaması yetmez).; Tek primaryTaskId 'campaign--implementation' beş alt maddeyi kapsıyor; bağımlılık sırası yok.

Sonraki adım önerisi: campaign--implementation görevine şu karar kaydını ekleyin: ERPNext'i v17-dev ile kurmak mı, yerel bir kupon DocType'ı mı? Bunun yanında fiyat hesabının yeri (yerel mi, Central mı) ve plan/müşteri uygunluk kontrolünün sunucuda nerede yapılacağı yazılsın. Yeni görev kaydı açmayın.

Mevcut birincil görev: `campaign--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/website/doctype/utm_campaign/utm_campaign.json:20`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`.

#### campaigns-2 — BOGO (Buy One, Get One — bir alana ek ürün) kampanyaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Ödül ve iptal ilkesi ifade edilmiş. Ama ERPNext'in ücretsiz ürün kuralı kurulu değil. SaaS'ta ödülün karşılığı ek koltuk veya modül hakkıdır; bunun entitlement modeli bu pakette tanımlı ya da bağlı değil. Ödül türü ile iptal politikası somut değil.

Eksik: Ödül birimi tanımsız: koltuk, modül veya süre? Entitlement kaydına nasıl yazılacağı belirsiz.; 'İptalde hak politikası' içeriği yok: geri alma, oransal düşüm veya dondurma?; Abonelik dışı modellerde koşullu kapsam ölçütü belirsiz.; ERPNext kurulumu ve sürüm eşlemesi yok.

Sonraki adım önerisi: campaigns-1 kararından sonra BOGO ödülünün entitlement karşılığını ve iptaldeki geri alma kuralını campaign--implementation kabul metnine ekleyin. Entitlement sahibi görevle bağımlılık kurun.

Mevcut birincil görev: `campaign--implementation`. Kaynak: `suite/suite/hooks.py:7`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:22`.

#### campaigns-3 — Hedef kitle, geçerlilik süresi, bütçe ve kullanım sınırları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü yarış koşulunu doğru hedefliyor: son kupon ve bütçe sınırında eşzamanlı istekler. Hedef kitle, tarih ve kullanım sınırının dayandığı ERPNext araçları kurulu değil. Frappe'de satır kilidi (for_update) var, ama bütçe ve kullanım sayacı için atomik tüketim sözleşmesi yok.

Eksik: Kampanya para bütçesi ve kullanım sayacının veri modeli ile atomik azaltma yöntemi tanımlı değil (satır kilidi mi, koşullu UPDATE mi?).; Hedef kitle tanımı (müşteri grubu, tenant, plan) ve sunucu tarafında uygulanması belirsiz.; Saat dilimi ve geçerlilik sınırı (dahil/hariç) tanımsız.; Eşzamanlılık kabulünün nasıl kanıtlanacağı yazılmamış.

Sonraki adım önerisi: campaign--implementation görevine 'tüketim tek transaction içinde kilitli satırda yapılır' sözleşmesini ve bütçe/kullanım alanlarını ekleyin. Eşzamanlılık senaryosunu ortak insan test bütçesine aday olarak not edin.

Mevcut birincil görev: `campaign--implementation`. Kaynak: `frappe/frappe/api/v1.py:56`; `suite/pyproject.toml:6`.

#### campaigns-4 — İndirim birleştirme, öncelik ve kapsam dışı ürün kuralları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Action 'configure' olarak işaretli, ama yapılandırılacak ERPNext Pricing Rule kurulu değil. Kabul metnindeki 'kabul edilen birleşim' politikası tanımlı değil; bu yüzden test edilemez. Kapsam dışı plan listesinin kaynağı da yok.

Eksik: İndirim birleştirme politikası yazılı değil: en iyi tek indirim, sıralı uygulama veya üst sınır?; Öncelik çakışmasında eşitlik kuralı tanımsız.; Kapsam dışı plan/ürün listesinin nerede tutulduğu ve kimin değiştirebileceği belirsiz.; ERPNext yoksa 'configure' action'ı geçersiz; action yeniden sınıflanmalı.

Sonraki adım önerisi: Birleştirme ve öncelik politikasını tek paragraf karar olarak campaign--implementation kabul metnine yazın. ERPNext kurulmayacaksa action alanını 'extend/build' olarak düzeltin.

Mevcut birincil görev: `campaign--implementation`. Kaynak: `suite/suite/hooks.py:7`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:18`.

#### campaigns-5 — İade/iptalde kupon haklarının düzeltilmesi ve suistimal denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü kısmi/tam iade ve yeniden denemede hak çoğalmasını hedefliyor. Kupon sayacı ERPNext siparişine bağlı ve ERPNext kurulu değil. Payments app de kurulu değil: ödeme gateway DocType'ları payments yoksa silinir. Frappe'de on_cancel ve ödeme olay kancaları var, ama iade sözleşmesi ve idempotency anahtarı tanımlı değil.

Eksik: İade ve iptal kaynağı belirsiz: ERPNext belgesi, payments app veya Central billing?; Kısmi iadede kupon hakkının iade mi, oransal düzeltme mi olacağı tanımsız.; Yeniden denemelerde idempotency anahtarı ve suistimal sinyalleri (aynı müşteri, çoklu hesap) tanımsız.; Server Script ile kestirme çözüm yasaklanmamış; düzeltme mantığının sürümlü app kodunda olacağı yazılmalı.

Sonraki adım önerisi: Önce iade olayının kaynağını campaigns-1 kararıyla bağlayın. Sonra campaign--implementation görevine şunları ekleyin: idempotent 'kullanım geri al' kuralı ve iade olay kaynağına bağımlılık.

Mevcut birincil görev: `campaign--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:17`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:26`.

#### campaigns-6 — Referans ve iş ortağı programı; ilişkilendirme, hak ediş ve suistimal denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü kapsamlı (tek ödül, iade düzeltmesi, kendi kendine referans, denetim) ve campaigns-1'den ayrımı net; confidence 'design'. ERPNext Sales Partner kurulu değil. Frappe'de yalnız UTM/ziyaret izleme var. Bu kayıt misafire açık, fingerprint tabanlı, gecikmeli yazılıyor ve 180 günde temizleniyor. Hak ediş için güvenilir atıf kanıtı sayılamaz.

Eksik: Referans bağlantısı ile hesap veya tenant arasındaki imzalı, kalıcı atıf modeli yok.; Atıf süresi ve çakışmada kazanan kuralı (ilk/son dokunuş) tanımsız.; Ödülün tetiklendiği olay (ödeme veya etkinleşme) ve tek seferlik idempotency tanımsız.; Kendi kendine referans tespit ölçütleri (aynı kimlik, ödeme aracı, tenant) belirsiz.; Web Page View guest yazılabilir ve 180 günde silinir; denetim için kullanılamayacağı belirtilmemiş.

Sonraki adım önerisi: partner-referral--implementation görevine şu notları ekleyin: atıf UTM/Web Page View'dan değil, sunucu tarafında oluşturulan ayrı ve denetlenebilir kayıttan gelir; atıf penceresi; ödül tetikleyicisi. Ürün stratejisi kararı gelene kadar koşullu kalsın.

Mevcut birincil görev: `partner-referral--implementation`. Kaynak: `frappe/frappe/website/doctype/web_page_view/web_page_view.py:46`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:38`; `frappe/frappe/www/website_script.js:37`; `frappe/frappe/website/doctype/utm_campaign/utm_campaign.json:34`.

#### usage-1 — Dosya yükleme, AI (Artificial Intelligence — yapay zekâ) kredisi ve trafik limitleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve eşzamanlılık kabulü tanımlı. Kaynakta zaman pencereli sayaç primitifleri var. Çekirdek site limiti istek süresini (mikrosaniye) ölçüyor; ölçüm site genelinde tutuluyor, kiracı ya da plan bazında tutulmuyor. Suite içinde Anthropic bağımlılığı var. Ancak AI kredi defteri veya bayt bazlı trafik sayacı incelenen kaynakta görülmedi. Dosya boyutu sınırının kaynağı bu alıntılarda yok, bu yüzden bilinmiyor.

Eksik: AI kredi birimi (token/istek/model ağırlığı), rezervasyon, iade ve idempotency sözleşmesi yok.; Hosting trafiğinin nerede ölçüleceği (proxy/CDN ya da Frappe) ve faturalamadan ayrımı tanımsız.; Drive'ın File override'ı ile çekirdek max_file_size'tan hangisinin yaptırım noktası olacağı belirtilmemiş.; Site sayacı önce okuyup sonra karar veriyor (oku-karşılaştır). Eşzamanlı istekte aşım riski var ama kabul bunu adlandırmıyor.; Redis sayacı kalıcı değil. Kalıcı defter ile hız sınırı arasındaki ayrım yazılmamış.; Frappe 17.0.0-dev ve suite >=16 eşlemesi yapılmamış.

Sonraki adım önerisi: usage-ledger--implementation altında kiracı kimliği, birim, dönem ve rezervasyon/iade sözleşmesini tek sayfada tanımla. AI için atomik rezervasyonu kalıcı defter satırında kilitle. Trafik ölçüm noktasını Hüseyin Cengiz'e devredilecek altyapı gereksinimi olarak ayır. Dosya sınırını mevcut File override noktasında doğrula.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:55`; `frappe/frappe/rate_limiter.py:79`; `suite/pyproject.toml:32`; `suite/suite/hooks.py:196`; `suite/pyproject.toml:45`.

#### usage-2 — Kullanıcı, şirket, çalışma alanı, kayıt ve depolama kotaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

İki eşzamanlı istekte son koltuk kabulü anlamlı. Kaynakta yalnız şu primitifler var: site DB boyutu raporu (System Manager), Mail'in salt okunur JMAP sanal Quota'sı ve depolama göstergesi, satır kilitli get_doc. Koltuk, kayıt veya çalışma alanı kotası için yaptırım görülmedi. 'Şirket' kavramı ERPNext'e ait ve bu sitede kurulu değil.

Eksik: Kiracı modeli (site başına mı, site içi mi) ve 'çalışma alanı/şirket' varlığı tanımsız. ERPNext Company kullanılamaz.; Koltuk sayım kuralı (aktif System User, Website User, Guest) belirtilmemiş.; Yaptırım noktası (before_insert/doc_events) ve kilit stratejisi (kota satırında for_update) eksik.; Depolama kaynakları (File, Drive S3, Mail JMAP) için tek ölçüm sözleşmesi yok. Mail Quota'sı dış sunucudan salt okunur geliyor.; İzinler native DocType izinleriyle yönetilmeli. ignore_permissions yolu açılmamalı; bu not edilmemiş.

Sonraki adım önerisi: Kiracı ve sayılabilir varlık tanımını ve koltuk sayım kuralını karara bağla. Ardından tek kota satırını for_update ile kilitleyen before_insert yaptırımını usage-ledger görevi kapsamında tasarla. Depolama için File ve Drive boyut kaynağını seç.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/core/report/database_storage_usage_by_tables/database_storage_usage_by_tables.py:25`; `suite/suite/mail/doctype/quota/quota.json:142`; `suite/suite/mail/doctype/quota/quota.py:107`; `suite/frontend/src/apps/mail/composables/useQuota.ts:28`; `frappe/frappe/api/v1.py:56`.

#### usage-3 — API (Application Programming Interface — uygulama programlama arayüzü) çağrısı ve entegrasyon kotaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul, süre bütçesi ile çağrı adedini doğru biçimde ayırıyor. Kaynakta üç parça var. Çekirdekteki site süre bütçesi 429 döndürüyor. rate_limit dekoratörü atomik incrby ile adet sayıyor ve user_based seçeneği sunuyor. Suite'in Rate Limit DocType'ı metot bazlı dinamik limit sağlıyor. Ancak dinamik limit yalnız dekore edilmiş metotlara uygulanıyor. Genel /api/resource CRUD yolunda adet limiti görülmedi. Anahtar IP, kullanıcı veya alan değeri; kiracı ya da plan değil.

Eksik: Hangi uçların sayılacağı belirsiz: v1/v2 resource, method, webhook ve giden entegrasyonlar.; Kota kimliği (API key/kullanıcı/kiracı) ve plan eşlemesi tanımsız.; Suite Rate Limit DocType'ının yeniden kullanılıp kullanılmayacağı kararı yok. DocType yalnız System Manager'a açık; create_rate_limit ignore_permissions ile ekliyor ve dışa açılmamalı.; Dekoratör reddedilen çağrıyı da sayıyor. Dönem sıfırlama setex TTL'ine dayanıyor; takvim dönemi olarak tanımlanmamış.; RateLimitExceededError ile TooManyRequestsError arasındaki HTTP durum kodu ve başlık sözleşmesi belirtilmemiş.

Sonraki adım önerisi: Sayılacak uç listesini ve kota anahtarını (kiracı + API key) belirle. Mevcut rate_limit/dynamic_rate_limit desenini kiracı anahtarlı bir limit fonksiyonuyla genişletme kararını yaz. 429 ile Retry-After/Reset başlık sözleşmesini usage-ledger kabulüne ekle.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:182`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:126`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/api/v1.py:50`.

#### usage-4 — Otomasyon, eşzamanlı görev, işlem süresi ve bildirim gönderim kotaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

'Komşuyu aç bırakmama' kabulü anlamlı. Ancak kaynaktaki primitifler kiracı adil kuyruğu sağlamıyor. concurrent_limit fonksiyon başına Redis semaforu kullanıyor, arka plan işlerinde atlanıyor ve 503 döndürüyor. Kuyruk seçimi ile deduplicate enqueue'da mevcut. Suite Rate Limit değer bazlı (ör. e-posta önceliği) limit destekliyor. Worker/scheduler kaynağı bu alıntılarda yok, bu yüzden bilinmiyor.

Eksik: Kiracılar RQ worker'larını paylaşıyor mu, kuyruk izolasyonu nasıl olacak; tanımsız.; Eşzamanlılık anahtarı fonksiyon adı; kiracı değil. Arka plan işleri kapsam dışında kalıyor.; İşlem süresinin ölçüm noktası ve hata sözleşmesi (429/503/iş reddi) belirtilmemiş.; Bildirim kanalları (e-posta/push/SMS) ve dönem tanımı yok.; concurrent_limit yerel 17-dev kaynağında var. Suite >=16 beyan ediyor; v16 eşlemesi doğrulanmadı.

Sonraki adım önerisi: Kiracı başına enqueue kabul kontrolünü ve iş süresi muhasebesini usage-ledger altında tanımla. Bildirim gönderimi için mevcut değer bazlı Rate Limit desenini kiracı anahtarıyla kullanmayı değerlendir. Worker topolojisi kararını Hüseyin Cengiz'e teknik devir olarak ayır.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/concurrency_limiter.py:100`; `frappe/frappe/concurrency_limiter.py:107`; `frappe/frappe/concurrency_limiter.py:115`; `frappe/frappe/core/report/database_storage_usage_by_tables/database_storage_usage_by_tables.py:74`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.json:105`.

#### usage-5 — Kullanım ölçümü, dönemsel sıfırlama, eşik uyarıları ve aşım kuralları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütleri anlamlı: dönem sınırı, gecikmiş/tekrarlanan olay ve tek seferlik eşik uyarısı tanımlı. Kaynakta yalnız istek hızı sınırlayıcıları var: Frappe rate_limit ve Suite Rate Limit DocType. Bunlar Redis TTL sayaçlarıdır; kalıcı ve denetlenebilir bir tüketim defteri değildir. Mail Quota, harici JMAP verisini salt okunur sanal DocType olarak gösteriyor. Ön yüzdeki %80 eşiği yalnız görsel bir uyarı.

Eksik: Ölçüm olayı sözleşmesi yok: kiracı, özellik, miktar, idempotency anahtarı, olay zamanı ve dönem alanları tanımlı değil.; Dönem tanımı yok: takvim ayına mı yoksa abonelik başlangıcına mı dayandığı ve gecikmiş olayın hangi döneme yazılacağı belirsiz.; Aşım politikası seçilmemiş: engelleme, yumuşak limit ya da ücretlendirme seçeneklerinden hangisinin uygulanacağı belli değil. Eşik uyarısının tekilliğini sağlayacak mekanizma da belirtilmemiş.; Kaynak olarak ERPNext Subscription gösteriliyor, ancak ERPNext bu sitede kurulu değil; native destek varsayılamaz.; Redis rate_limit sayaçlarının fatura tüketimi için yeniden kullanılamayacağı talimatta açıkça yazmıyor.

Sonraki adım önerisi: Mevcut usage-ledger--implementation görevi içinde önce bir Usage Event DocType sözleşmesi yazılmalı. Bu sözleşmede (kiracı, özellik, idempotency_key) üzerinde benzersizlik kısıtı ve event_time/period alanları bulunmalı; kısıt, Rate Limit'teki add_unique örüntüsü izlenerek kurulabilir. Eşik uyarısı ve aşım politikası alanları ayrıca tanımlanmalı. Rate limiter yalnız trafik koruması olarak kalmalı.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:180`; `frappe/frappe/rate_limiter.py:182`; `suite/suite/mail/doctype/quota/quota.json:142`; `suite/suite/mail/doctype/quota/quota.py:35`; `suite/frontend/src/apps/mail/composables/useQuota.ts:48`.

#### usage-6 — Krediyi ayırma, tüketme ve başarısız işlemde iade etme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü idempotent tüketimi ve tek seferlik iadeyi doğru hedefliyor. Kaynakta yalnız yapı taşları var: satır kilidi (for_update), benzersiz kısıt (add_unique) ve Redis semaforu. Reserve, consume ve refund durumlarını yöneten bir kredi defteri kaynakta görülmedi.

Eksik: Durum makinesi tanımsız: reserved→consumed ya da reserved→released geçişleri ve geçersiz geçişlerin reddi belirtilmemiş.; Çöken iş veya zaman aşımı durumunda rezervasyonun nasıl serbest bırakılacağı tanımlı değil.; Defterin append-only mi olacağı, yoksa bakiye satırı mı tutulacağı kararlaştırılmamış. Kilitleme stratejisi de belirtilmemiş.; usage-reservation--implementation ile usage-ledger--implementation arasındaki sorumluluk sınırı belirsiz.; Kredi mutasyonunun genel REST create/update yolundan değil, yalnız sunucu tarafı servis yolundan yapılacağı belirtilmemiş. Kaynaktaki ignore_permissions=True kullanan yardımcı örüntüsü dışarı açılmamalı.

Sonraki adım önerisi: usage-reservation--implementation içinde append-only bir Credit Ledger Entry sözleşmesi tanımlanmalı. Benzersizlik (kiracı, operation_key, entry_type) üzerinde olmalı; bakiye for_update kilidi altında hesaplanmalı. Durum geçiş tablosu ve rezervasyon TTL'i yazılmalı. Doğrudan /api/resource yazımı DocType izinleriyle kapatılmalı.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/api/v1.py:56`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`; `frappe/frappe/concurrency_limiter.py:109`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/api/v1.py:50`.

#### usage-7 — Kiracı ve özellik bazlı maliyet; harcama üst sınırı ve anlık durdurma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (gecikmeli maliyet, eşzamanlılık, yeni ücretli işin durdurulması) tanımlı. Ancak kaynaktaki tüm limiter'lar HTTP isteği yoksa devre dışı kalıyor. Arka plan işleri ve iç çağrılar sınırlanmıyor, bu yüzden bu limiter'lar harcama durdurucu olarak kullanılamaz. Suite'te AI Assist için anthropic bağımlılığı var, yani gerçek bir ücretli maliyet kaynağı mevcut. Bunu tenant ve özellik bazında ölçen bir defter kaynakta görülmedi.

Eksik: Uygulama noktası tanımsız: tavan kontrolünün enqueue öncesinde mi, harici ücretli çağrı öncesinde mi yapılacağı belirtilmemiş; arka plan işlerinin de kapsanması gerekiyor.; Maliyet kaynağı ve birimi tanımlı değil: token, süre ya da depolama gibi birimlerin fiyat tablosuna nasıl bağlanacağı yazılmamış.; Kiracı kimliği modeli belirsiz: site başına kiracı mı, site içinde kiracı mı olacağı kararlaştırılmamış.; Durdurma bayrağının atomik okunması ve önbellek geçersizleştirmesi tanımlı değil; mevcut Rate Limit clear_cache örüntüsü bunun için yeterli değil.; Eşzamanlı çağrılarda tavan aşımının (overshoot) kabul edilen toleransı belirtilmemiş.

Sonraki adım önerisi: usage-ledger--implementation altında tek bir sunucu tarafı guard sözleşmesi tanımlanmalı. Bu guard enqueue'dan ve ücretli harici çağrıdan önce çalışmalı, istek bağlamından bağımsız olmalı ve usage-6'daki rezervasyonu kullanmalı. İlk kapsam somut maliyet kaynağı olan Sheets AI Assist ile sınırlandırılmalı.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `frappe/frappe/rate_limiter.py:142`; `suite/suite/utils/rate_limiter.py:25`; `frappe/frappe/concurrency_limiter.py:100`; `suite/pyproject.toml:32`.

#### usage-8 — Ön ödemeli kredi veya ek kota satın alma; bakiye yükleme, geçerlilik ve iade uzlaştırması.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe kaynağında frappe/frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py var. Bunlar, Frappe Cloud/Atlas'ta barındırılan sitenin cüzdan bakiyesi yükleme (create_topup_checkout), checkout durumu, plan, ödeme yöntemi ve özet çağrılarını Central billing API'ye ileten ince bir HTTP proxy'sidir. Uçlar whitelisted'dır. Erişim yalnız pilot_endpoint ve pilot_auth_token tanımlıysa ve kullanıcı System Manager ise açılır (_assert_access). Bakiye ve kredi mantığı yerelde değil, harici Central'dadır. Bu yetenek, hosting sağlayıcısının siteye kestiği faturadır; SaaS kiracılarına kredi satan bir defter değildir. Genel yapı taşları da var: Integration Request DocType ve create_request_log harici istek ve bildirim kaydını tutar. Bu kayıtta request_id ve status alanları var ama request_id benzersiz değil. frappe.db.add_unique ile kompozit benzersizlik kalıbı da kullanılabilir (örnek: suite Rate Limit). Suite Python kodunda kredi, cüzdan, ödeme veya iade uygulaması yok. Suite frontend'deki topUp eşleşmeleri mail sayfalamasına ait. Yerel pilot suite/headless_provider (api.py, local_fixture.py) kredi, defter veya kullanım sözleşmesi içermiyor.

Eksik: Kiracı başına yetkili kredi defteri yok: grant/consume/expire/clawback hareket türleri ve bakiye türetimi bulunmuyor.; Gelen ödeme sağlayıcısı webhook alıcısı yok; imza doğrulama ve replay koruması da yok.; provider_event_id benzersizliği yok, dolayısıyla 'aynı ödeme bildirimi = tek bakiye artışı' garantisi yok. Integration Request.request_id benzersiz değil.; Kredi kaynağı ve son kullanma tarihi takibi, düşüm sırası (FIFO veya son kullanma önceliği) ve süresi dolan kredinin kaydı yok.; Ödeme iadesi ile tüketilmiş kredi arasındaki uzlaştırma kuralı yok.; Para birimi, ondalık hassasiyet ve kredi birimi dönüşümü yok.; Kiracı izolasyonlu bakiye ve hareket okuma için headless provider sözleşmesi yok.; Cloud billing proxy Frappe Cloud'a bağlı, System Manager'a özel ve site düzeyinde. SaaS kiracı faturalaması için yeniden kullanılamaz.; Ödeme sağlayıcısı seçimi ve tüketilmiş kredi iade politikası henüz kullanıcı kararı olarak işaretlenmemiş.

Sonraki somut adım: Mevcut bağımlılık sırası korunmalı. İlk adım, usage-ledger--contract ve usage-ledger--schema kapsamında aynı defterde hareket türlerini (grant, consume, expire, clawback) tanımlamak. Her hareket şu alanları taşımalı: tenant, amount (Decimal), currency/unit, source_ref, expires_at. Ardından bu defterde (tenant, provider, provider_event_id) üzerine frappe.db.add_unique kısıtı konmalı. Tek ve dar ilk davranış şu olmalı: aynı provider_event_id ile gelen ikinci grant, ikinci bakiye artışı üretmesin. Bunun için gerçek RED/GREEN kanıtı gerekli. Sonra sırasıyla şunlar gelir: kiracı kapsamlı bakiye okuma ucu (headless provider sözleşmesi), expire işi, clawback ve iade kuralı. İade kuralı ve sağlayıcı webhook imza doğrulaması, kullanıcı sağlayıcıyı ve iade politikasını seçtikten sonra yapılmalı. Webhook ham kaydı için Integration Request yeniden kullanılabilir. cloud_billing proxy'si bu iş için kullanılmamalı.

Önerilen bağımlılık/sıra: usage-ledger--contract; usage-ledger--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; audit-envelope--contract; usage-reservation--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `usage-ledger--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3` — `Pilot forwards these calls to an allowlisted Central billing API using the bench's`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:73` — `def create_topup_checkout(client, amount, redirect_url: str) -> dict:`
- `frappe/frappe/integrations/frappe_providers/cloud_settings.py:12` — `CLOUD_SETTINGS_ROLE = "System Manager"`
- `frappe/frappe/integrations/frappe_providers/cloud_settings.py:129` — `if not (frappe.conf.get("pilot_endpoint") and frappe.conf.get("pilot_auth_token")):`
- `frappe/frappe/integrations/doctype/integration_request/integration_request.json:90` — `"fieldname": "request_id",`
- `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149` — `frappe.db.add_unique(`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite/suite (_.py,_.json); arama `(?i)(\bcredits?\b|top_?up|prepaid|wallet|refund|clawback|payment|billing|invoice|stripe|razorpay)`: Yalnız alakasız eşleşmeler çıktı: webdav yorumu, sieve test metinleri, STT bias listesinde 'Frappe Payments' dizgesi. Ödeme veya kredi uygulaması yok.
- suite/suite (_.py,_.json); arama `(?i)(credit|top_?up|prepaid|wallet|refund|clawback|grant|ledger|quota|expir)`: 80+ dosya eşleşti; çoğu calendar, drive, mail izin, kilit ve token süresi ile ilgili. Mail Quota ve drive storage rezervasyonu depolama kotası; kredi defteri değil.
- suite (tüm dosyalar); arama `(?i)(credit|top.?up|prepaid|wallet|balance|refund|clawback|webhook)`: Eşleşmeler derlenmiş frontend asset'leri, mail, drive ve push aboneliğinde; ödeme webhook'u veya kredi yok.
- suite/suite/headless_provider; arama `(?i)(ledger|usage|credit|quota|balance|idempot|provider_event)`: Eşleşme yok.
- suite/frontend/src; arama `(?i)(topup|top_up|prepaid|wallet|credit_balance|billing_credit)`: Yalnız mail usePaginatedThreads topUpIfShort (sayfalama); alakasız.
- frappe/frappe (_.py,_.json); arama `(?i)(prepaid|top_?up|wallet|clawback|credit_balance|billing_credit|stripe|razorpay|paypal|braintree)`: cloud_billing.py ve cloud_settings.py (Frappe Cloud proxy'si), delete_payment_gateways yaması (payments uygulaması yoksa gateway DocType'larını siler) ve testler bulundu. Yerel defter yok.
- frappe/frappe/integrations/frappe_providers; arama `(?i)(topup|checkout_status|def create_topup|def get_checkout)`: create_topup_checkout ve get_checkout_status, _assert_access ile korunan ve PilotClient'a ileten whitelisted uçlar.
- frappe/frappe/integrations; arama `(?i)(class IntegrationRequest|def create_request_log|fieldname request_id/status)`: Integration Request genel istek ve bildirim log'u; request_id için unique tanımı yok.

Sınır: Yalnız kurulu frappe ve suite kaynağı okundu; ERPNext, payments ve HRMS kurulu değil ve değerlendirilmedi.; Frappe Cloud Central billing API'si harici; davranışı bu kaynakla doğrulanamaz.; Kod çalıştırılmadı, test koşulmadı; functionalAcceptance: not_run.; Derlenmiş frontend asset'leri ve map dosyaları ayrıntılı incelenmedi; kaynak src araması temel alındı.; Suite commit bilinmiyor; headless_provider yerel pilot ek kodudur, upstream-native değildir.; Plan modu talimatına rağmen kullanıcı düzenlemeyi yasakladığı için plan dosyası yazılmadı; çıktı yalnız bu JSON.

Temporal workflow: `saas-recheck-20261015t073528z-061`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

### Tahsilat, faturalama ve finans

#### payments-1 — Ödeme sağlayıcısı, ödeme yöntemi ve tahsilat yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (tek ödeme kaydı) tanımlı. Ancak sağlayıcı seçilmemiş, kapsam koşullu ve 'Frappe Payments kurulacak mı, yoksa SaaS adaptörü mü yazılacak?' kararı verilmemiş. Yerel envanterde yalnız frappe ve suite kurulu. Core'daki patch, payments kurulu değilse gateway DocType'larını siliyor. cloud_billing.py ise sitenin kendi Frappe Cloud faturalamasına ait; tenant tahsilatı için yeniden kullanılamaz.

Eksik: Ürünün tahsilat yapıp yapmayacağı (conditional) kararı verilmemiş.; Sağlayıcı ve desteklenen yöntem listesi seçilmemiş.; Frappe Payments ile frappe 17.0.0-dev arasındaki sürüm uyumu ve kurulum kararı yok.; Ödeme kaydının sahibi olan DocType ve tenant/izin sınırı tanımlanmamış.; Frappe Cloud billing (Central/Pilot) ile ürün tahsilatının ayrımı talimatta yazılmamış.

Sonraki adım önerisi: payment-attempt--implementation görevine tek bir karar notu ekleyin: kapsam evet/hayır, sağlayıcı, Payments uygulaması mı özel adaptör mü, Payments'ın frappe 17-dev uyumunun nasıl doğrulanacağı. Bu karar alınmadan uygulamaya başlanmamalı.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:9`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`; `suite/pyproject.toml:45`.

#### payments-2 — Ödeme yetkilendirme, doğrulama, tekrar deneme ve başarısız tahsilat takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (yanlış Paid oluşmaması) anlamlı. Core'da yalnız ödeme olay adları (authorization/paid/failed) var. Bu olayları tetikleyen PaymentController ise kurulu olmayan Payments uygulamasında. Tekrar deneme ve başarısız tahsilat takibi kaynakta görülmedi.

Eksik: Ödeme durum makinesi (pending/authorized/requires_action/paid/failed/timeout) tanımlanmamış.; Tekrar deneme politikası (aralık, üst sınır, dunning) ve zaman aşımı sözleşmesi yok.; Olay kancalarının hangi uygulamadan tetikleneceği ve izin sınırı belirsiz.; Server Script ödeme olaylarının kısayol olarak kullanılmayacağı talimatta yazılmamış.

Sonraki adım önerisi: payments-1 kararından sonra, aynı görevde durum makinesi ile retry/timeout kurallarını tek tablo olarak yazın. İş mantığı Server Script'e değil, controller'a ve native DocType izinlerine bağlansın.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/core/doctype/server_script/server_script_utils.py:27`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:26`; `frappe/frappe/core/doctype/server_script/server_script.js:70`; `frappe/frappe/core/doctype/server_script/server_script.js:97`.

#### payments-3 — Tam/kısmi iade, ters ibraz ve ödeme itirazı yönetimi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Taranan kurulu kaynakta (frappe, suite, suite/headless_provider) tam/kısmi iade, ters ibraz (chargeback) ya da ödeme itirazı (dispute) için hiçbir uygulama yok: DocType, controller, whitelisted API, webhook işleyicisi veya bakiye/hak düzeltme mantığı bulunmuyor. Ödemeyle ilgili tek gerçek kod, Frappe upstream'indeki frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py'deki whitelisted proxy'ler. Bunlar sitenin kendi Frappe Cloud barındırma faturası için plan, profil, ödeme yöntemi, cüzdana bakiye yükleme (top-up) checkout'u ve checkout durumu çağrılarını Central'a iletiyor. İade, itiraz, ters ibraz veya alacak dekontu (credit note) uç noktası yok. Bu proxy, SaaS operatörünün kendi müşterilerinden aldığı ödemeleri yöneten bir primitif de değil. Asıl iş mantığı uzak Central servisinde ve yerel kaynakta yok. Patch delete_payment_gateways.py, 'payments' uygulaması kurulu değilse Stripe/Razorpay/PayPal gibi ödeme ağ geçidi DocType'larını siliyor; dolayısıyla Frappe'nin kendi ödeme ağ geçidi DocType'ları da kurulu değil. Suite'teki 'reversal' eşleşmeleri Drive WebDAV kota/rollup geri alma mantığı, 'subscription' eşleşmeleri ise Mail push aboneliği; ödemeyle ilgisi yok. LOCAL PILOT suite/headless_provider (api.py, local_fixture.py, **init**.py) içinde ödeme, iade, bakiye veya hak (entitlement) sözleşmesi yok. ERPNext kurulu değil, bu yüzden muhasebe defteri veya Credit Note primitifi de yok.

Eksik: Ödeme denemesine bağlı, tutarı, durumu ve sağlayıcı referansı olan bir iade kaydı (DocType/şema) ve iş kuralı: kısmi iadelerin toplamı yakalanan tutarı aşamaz, aynı iade iki kez işlenmez (idempotency).; Ters ibraz ve itiraz yaşam döngüsü (açıldı/kanıt gönderildi/kazanıldı/kaybedildi) ile bunun kaydı ve durum makinesi.; İmzası doğrulanan, idempotent işlenen ve outbox üzerinden yayınlanan sağlayıcı webhook alıcısı (refund._, charge.dispute._).; İade veya ters ibrazın bakiyeye, alacak dekontuna ve abonelik/hizmet hakkına etkisini belirleyen eşleme ve uygulayıcı; itiraz süresince hizmetin askıya alınıp alınmayacağı kuralı.; ERPNext olmadığından yerel finans defteri ya da düzeltme kaydı kararı ve bunun uygulaması.; Audit envelope ve tenant kapsamlı yetki kontrolüyle korunan headless provider API sözleşmesi (iade başlatma/sorgulama, itiraz durumu).

Sonraki somut adım: Mevcut bağımlılık sırası korunur: önce payment-attempt--contract ve payment-attempt--schema tamamlanır, kernel-envelope, tenant-registry, outbox ve audit-envelope sözleşmeleri hazır olur. Sonra payment-attempt--implementation kapsamında en küçük dikey dilim tek bir davranış olarak eklenir. Bu, yeni bir görev kaydı açmak anlamına gelmez. Dilim şunlardan oluşur: (1) Payment Attempt'e bağlı, tenant kapsamlı bir iade kaydı ve kısmi iadelerin toplamının yakalanan tutarı aşamayacağı kuralı; (2) önce bu kural için başarısız (RED) test, sonra uygulama (GREEN); (3) ardından sağlayıcı refund webhook'unu imza doğrulamasıyla ve idempotent işleyen alıcı, outbox ve audit kaydı; (4) itiraz/ters ibraz durum makinesi ve bakiye/hak etkisi eşlemesi ayrı bir sonraki dilim olarak gelir. Finans defteri kararı (ERPNext yok) 1. adımdan önce yazılı kayda alınır. Frappe Cloud billing proxy'si bu işe temel olarak kullanılmaz.

Önerilen bağımlılık/sıra: payment-attempt--contract; payment-attempt--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `payment-attempt--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3` — `Pilot forwards these calls to an allowlisted Central billing API using the bench's`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:73` — `def create_topup_checkout(client, amount, redirect_url: str) -> dict:`
- `frappe/frappe/integrations/frappe_providers/cloud_settings.py:324` — `@frappe.whitelist(methods=["GET"])`
- `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5` — `if "payments" in frappe.get_installed_apps():`
- `frappe/frappe/patches/v14_0/delete_payment_gateways.py:14` — `"Stripe Settings",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite; arama `(?i)(refund|chargeback|dispute|credit[_ ]note|reversal)`: Yalnızca suite/suite/drive/webdav/put.py ve onun testi eşleşti; buradaki 'reversal' Drive kota/rollup geri alması, ödemeyle ilgisiz.
- frappe; arama `(?i)(refund|chargeback|charge_back|dispute)`: Yalnızca UI ConditionBuilder örnekleri, component_explorer ve playwright spec'i eşleşti (demo/örnek veri); backend'de iade veya itiraz uygulaması yok.
- suite/suite (_.py,_.json); arama `(?i)(payment|billing|invoice|subscription|stripe|ledger)`: 31 dosya eşleşti; hepsi Mail push_subscription, Exchange/JMAP, Meet ve WebDAV bağlamında. Ödeme veya faturalama uygulaması yok.
- frappe/frappe (*.py); arama `(?i)(payment|stripe|razorpay|paypal|braintree|ledger|credit.note)`: İlgili olanlar yalnızca cloud_billing.py/cloud_settings.py (Frappe Cloud barındırma faturası proxy'si) ve delete_payment_gateways.py; diğerleri ilgisiz (nestedset, test, sidebar vb.).
- suite/suite/headless_provider; arama `(?i)(payment|refund|chargeback|dispute|billing|invoice|balance|entitlement)`: Eşleşme yok; LOCAL PILOT headless provider'da ödeme veya hak sözleşmesi bulunmuyor.
- frappe/frappe/integrations/frappe_providers; arama `(?i)(cloud_billing\.|refund|credit|invoice|webhook)`: Yalnızca plan, profil, ödeme yöntemi, top-up ve checkout proxy çağrıları var; refund, invoice veya webhook işleyicisi yok.
- frappe/frappe/integrations (*.json); arama `(?i)(refund|chargeback|dispute|payment|reversal)`: Eşleşen DocType JSON'u yok.
- suite/frontend/src; arama `(?i)(refund|chargeback|dispute|payment)`: Yalnızca sheets/engine/formula.js eşleşti (tablo formül fonksiyonu); ödeme arayüzü veya akışı yok.

Sınır: Değerlendirme yalnızca sourceRoot altındaki frappe ve suite (headless_provider dahil) kaynak okumasına dayanır. Komut, test veya runtime çalıştırılmadı; functionalAcceptance=not_run.; Frappe Cloud Central billing API'si uzak bir servis ve yerel kaynakta yok. Orada iade veya itiraz olup olmadığı değerlendirilemez; bu kalem için zaten site sahibinin barındırma faturasıdır.; ERPNext, HRMS ve frappe/payments uygulaması kurulu değil ve değerlendirilmedi. YOK, yalnızca taranan kurulu kaynak kapsamı için geçerlidir; ekosistemde var olup olmadığı hakkında hüküm değildir.; Tests ve frontend dosyaları yalnızca okunacak kaynak olarak arandı; ürünün tamamlandığı iddia edilmez ve yüzde verilmez.; suiteCommit bilinmiyor; frappe commit adf1fd0c2d6215ad4cac9976251198b2a35fbda6.

Temporal workflow: `saas-recheck-20261015t073528z-020`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### payments-4 — Tekrarlanan istekte ikinci tahsilatı önleme ve ödeme durumu uzlaştırma.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe'de ilgili üç temel yapı var. (1) Integration Request DocType: ödeme ve entegrasyon isteklerinin kaydı. request_id alanı ve "Queued/Authorized/Completed/Cancelled/Failed" durum alanı var. update_status, handle_success ve handle_failure metotları durumu geçiriyor. clear_old_logs eski kayıtları siliyor (varsayılan 30 gün). (2) background_jobs.enqueue: deduplicate=True verilirse aynı job_id ile ikinci bir iş kuyruğa alınmıyor. (3) frappe_providers/cloud_billing.py ve cloud_settings.py: whitelisted POST uçları var (create_topup_checkout, get_checkout_status, reconcile_payment_setup). Bunlar yalnızca Frappe Cloud Central billing API'sine istek iletiyor; iş mantığı Central'da duruyor. Yani bu, sitenin kendi Frappe Cloud faturası; tenant müşteri tahsilatı değil. Gerçek ödeme ağ geçidi DocType'ları (Payment Gateway, Stripe/Razorpay/PayPal/Braintree/Paytm Settings) "payments" uygulamasına taşınmış. Bu uygulama kurulu değilse bir patch bu DocType'ları siliyor. Suite'te (Vue frontend dahil) ve yerel pilot suite/headless_provider'da ödeme, idempotency veya uzlaştırma kodu bulunmadı.

Eksik: Tenant tahsilatı için ödeme denemesi (payment attempt) DocType'ı veya durum makinesi yok.; Kalıcı idempotency anahtarı yok: kaynağı, tenant kapsamı, saklama süresi ve benzersizlik kısıtı tanımsız. Integration Request.request_id alanında unique kısıt yok; ikinci tahsilatı engelleyen bir kontrol de yok.; Sağlayıcıdan gelen webhook'u alan bir uç yok; imza doğrulama ve event-id tekilleştirmesi (benzersiz kayıt) de yok.; Bağlantı koptuktan sonra sağlayıcı durumunu sorgulayan yerel bir uzlaştırma işi (scheduler veya isteğe bağlı) ve çatışma çözüm kuralı yok. Mevcut reconcile_payment_setup ve get_checkout_status yalnızca Central'a vekil çağrı; davranış sözleşmeleri bu kaynakta değil.; Headless provider'da ödeme sözleşmesi (attempt, durum, olay) yok.

Sonraki somut adım: Sıra mevcut bağımlılıklara göre. 1) payment-attempt--contract: tenant + idempotency_key birleşik benzersiz anahtarı, saklama süresi, durum geçişleri, provider_event_id tekilliği ve uzlaştırma çatışma kuralını yaz. 2) payment-attempt--schema: Payment Attempt DocType'ını oluştur. (tenant, idempotency_key) ve provider_event_id için unique index koy. Integration Request'i yalnızca ham istek/yanıt günlüğü olarak yeniden kullan. 3) payment-attempt--implementation içinde tek dar davranış: aynı anahtarla gelen ikinci istek mevcut attempt'i döndürsün ve ikinci kez tahsilat çağrısı yapılmasın. Önce RED testi, sonra GREEN. 4) Ardından yinelenen webhook event-id tekilleştirmesi. 5) En son, Queued/Authorized kayıtlar için sağlayıcıyı sorgulayan uzlaştırma işi (frappe enqueue + deduplicate/job_id). Bu iş outbox ve audit sözleşmelerine bağlanacak.

Önerilen bağımlılık/sıra: payment-attempt--contract; payment-attempt--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `payment-attempt--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/doctype/integration_request/integration_request.py:33` — `status: DF.Literal["", "Queued", "Authorized", "Completed", "Cancelled", "Failed"]`
- `frappe/frappe/integrations/doctype/integration_request/integration_request.json:90` — `"fieldname": "request_id",`
- `frappe/frappe/utils/background_jobs.py:165` — `:param deduplicate: do not re-queue job if it's already queued, requires job_id.`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4` — `credential. Formatting and business logic live in Central.`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:70` — `return client.post(_path(client, "reconcile_payment_setup"), {})`
- `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5` — `if "payments" in frappe.get_installed_apps():`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- sourceRoot (frappe/ + suite/), *.{py,json,js,ts,tsx,vue}; arama `(?i)idempoten|payment_request|payment_gateway|reconcil|webhook_event|event_id|charge_id|payment_intent`: 80+ dosya eşleşti. Ödeme dışı eşleşmeler: meet reconciler, takvim eventId, kanban. Ödemeyle ilgili olanlar yalnızca cloud_billing.py, cloud_settings.py ve server_script.js'teki yardım metni.
- sourceRoot (frappe/ + suite/), dist/assets/locale hariç; arama `(?i)(payment[_ ]?(request|gateway|intent|attempt|transaction|status)|stripe|razorpay|paypal|braintree|iyzico|paytr|checkout_status)`: 20 dosya. Uygulama kodu olarak yalnızca cloud_billing.py, cloud_settings.py, delete_payment_gateways.py ve update_integration_request.py var. Suite tarafında tek eşleşme sfu-server package-lock.json; davranış değil.
- suite/suite/headless_provider; arama `(?i)payment|idempot|reconcil|dedup`: Eşleşme yok.
- sourceRoot (frappe/ + suite/), dist/assets/locale hariç; arama `(?i)(idempotency[_-]?key|Idempotency-Key|webhook.*(signature|secret).*verify|stripe-signature|X-Razorpay|payment.*(webhook|callback))`: Eşleşme yok: idempotency anahtarı da, gelen ödeme webhook'u ve imza doğrulaması da yok.
- sourceRoot (frappe/ + suite/), dist/assets hariç; arama `(?i)reconcile_payment_setup|checkout_status|create_topup_checkout`: Yalnızca cloud_settings.py ve cloud_billing.py'deki Central'a vekil çağrılar ile test_cloud_settings.py.
- frappe/frappe/integrations/doctype/integration_request/integration_request.json; arama `"(fieldname|unique|options)": "?(request_id|status|1|Queued)`: request_id alanı Data ve read_only; unique kısıtı yok.
- frappe/frappe/utils/background_jobs.py; arama `deduplicate|def is_job_enqueued`: enqueue içinde job_id tabanlı deduplicate var; kuyruk düzeyinde tekilleştirme sağlıyor, tahsilat düzeyinde değil.

Sınır: Yalnızca yerel kaynak snapshot'ı okundu (frappe adf1fd0c, suite commit bilinmiyor). Hiçbir komut ya da test çalıştırılmadı; functionalAcceptance: not_run.; "payments" ve ERPNext uygulamaları kurulu değil; onların idempotency ve uzlaştırma kodu değerlendirilmedi.; Frappe Cloud Central billing API'sinin sunucu tarafı bu kaynakta değil; reconcile ve checkout davranışı doğrulanamaz.; Derlenmiş dist/assets ve locale dosyaları ödeme aramalarında hariç tutuldu.; Kaynak yalnızca kodun varlığını kanıtlar; çalışan ortamda tek tahsilat ya da uzlaştırma doğrulanmadı.

Temporal workflow: `saas-recheck-20261015t073528z-021`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### payments-5 — Kart verisi yerine sağlayıcı tokenı (güvenli ödeme referansı) saklama.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream frappe'de tek somut ilgili parça Frappe Cloud abonelik faturalaması proxy'si. frappe/frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py içindeki whitelisted API'ler (_assert_access ile korunuyor) kart eklemeyi hosted setup checkout'a yönlendiriyor (create_payment_method_checkout → checkout URL). Sonrasında yalnız 'reference' (confirm_payment_method_checkout) ya da gateway SDK'nın tokenize ettiği callback payload'ı (confirm_payment_method) Central'a iletiliyor. Ödeme yöntemi kaldırılırken de yalnız payment_method referansı kullanılıyor. Bu yolda PAN/CVV alanı yok ve yerel kayıt yapılmıyor; saklama Central'da (harici). Integration Request DocType'ı genel bir entegrasyon log'u: data, request_headers ve output alanları var, maskeleme yok. Suite'te ödeme yok; 'card' eşleşmeleri mail contact_card (vCard) ile ilgili. Yerel pilot suite/headless_provider'da da ödeme yok.

Eksik: Tenant (müşteri) ödemeleri için sağlayıcı referansını saklayan bir DocType ya da şema yok: provider, payment_method_ref ve izinli metadata (marka, son 4 hane, son kullanma ay/yıl) tanımlı değil.; Payment Gateway, Stripe, Razorpay, Braintree, PayPal ve Paytm Settings DocType'ları 'payments' app kurulu değilse patch ile siliniyor; o app kurulu değil, dolayısıyla tenant gateway entegrasyonu yok.; PAN/CVV benzeri girdiyi reddeden bir validate kuralı ya da guard yok.; Integration Request, Error Log ve Data Import/Export için kart verisi maskeleme ya da dışlama kuralı yok.; Vite/PWA, Tauri2 ve WXT/MV3 istemcileri için sağlayıcının güvenli toplama yüzeyi (hosted checkout, iframe ya da SDK) entegrasyonu ve headless provider sözleşmesi yok.; cloud_billing yalnız sitenin kendi Frappe Cloud aboneliği için çalışıyor ve Central'a bağlı; tenant ödemelerinde yeniden kullanılamaz, yalnız desen olarak örnek alınabilir.

Sonraki somut adım: Sıra mevcut bağımlılıkları izler. 1) payment-attempt--contract'a şu kuralları ekleyin: kart verisi backend'e hiç girmez; saklanabilecek alanlar yalnız provider, provider_payment_method_ref, brand, last4, exp_month ve exp_year; istemci toplama yüzeyi sağlayıcının hosted checkout ya da iframe/SDK'sıdır. 2) payment-attempt--schema'da bu alanlarla dar bir tenant DocType tanımlayın. Önce RED test yazın: controller validate, 13–19 haneli PAN benzeri değerleri ve cvv/cvc alanlarını reddetmeli. Sonra GREEN uygulamasını yapın. 3) Ardından payment-attempt--implementation'da sağlayıcı referansını yalnız webhook ya da confirm(reference) üzerinden kaydedin; cloud_billing'deki confirm_payment_method_checkout(reference) deseni örnek alınabilir. Aynı adımda Integration Request'e yazılan payload'lar maskelensin, bu DocType Data Export'ta referans ve izinli metadata ile sınırlansın. Bu adımları Vue Suite frontend'inden bağımsız headless provider sözleşmesi olarak tanımlayın.

Önerilen bağımlılık/sıra: payment-attempt--contract; payment-attempt--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `payment-attempt--implementation`.

Kaynak kanıtı:

- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:57` — `"""Start adding a card via hosted setup checkout; returns the checkout URL to open."""`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:65` — `return client.post(_path(client, "confirm_payment_method_checkout"), {"reference": reference})`
- `frappe/frappe/integrations/frappe_providers/cloud_settings.py:384` — `"""Finalize a payment method the gateway SDK tokenised (e.g. the Razorpay`
- `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3` — `Pilot forwards these calls to an allowlisted Central billing API using the bench's`
- `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5` — `if "payments" in frappe.get_installed_apps():`
- `frappe/frappe/integrations/doctype/integration_request/integration_request.json:47` — `"label": "Request Data",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite, tümü); arama `(?i)(payment_method|payment_token|card_token|setup_intent|SetupIntent|PaymentMethod|stripe_customer|tokeniz)`: 55 dosya. İlgili olanlar yalnız frappe/frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py. Diğer eşleşmeler ödeme dışı: arama/formül tokenizer'ları, mail, derlenmiş dist bundle'lar.
- source (frappe + suite) *.{py,json,ts,vue,md,html}; arama `(?i)(\bpan\b|cvv|cvc|card_number|credit.?card|cardholder|\bstripe\b|razorpay|braintree|paypal|payment.?gateway|iyzico|adyen)`: 18 dosya. İlgili olanlar cloud_billing/cloud_settings, delete_payment_gateways patch'i ve update_integration_request patch'i. UI (pan gesture), changelog ve test eşleşmeleri ödeme davranışı değil. PAN/CVV işleyen kod yok.
- **/headless_provider/**; arama `(?i)(payment|billing|checkout|card)`: Tek eşleşme suite/suite/headless_provider/api.py:353 ('discards', ilgisiz). Yerel pilotta ödeme sözleşmesi yok.
- **/doctype/_{payment,billing,card,gateway,integration_request}_/_.json; arama `glob`: Payment/billing/gateway DocType yok. Yalnız number_card, mail contact_card_ (ilgisiz) ve integration_request (genel log, maskeleme yok).
- frappe/frappe/integrations; arama `(?i)(mask|redact|sanitiz)\w*\s*\(`: Yalnız OAuth sanitize_redirect ve sanitize_kwargs. Ödeme ya da kart verisi maskeleme yok.
- suite/suite *.{py,json}; arama `(?i)(payment|billing|checkout|card)`: Eşleşmeler mail contact_card/vCard, calendar ve drive ile ilgili. Suite'te ödeme ya da token saklama implementasyonu yok.

Sınır: Yalnız statik kaynak okundu. Hiçbir komut ya da test çalıştırılmadı; functionalAcceptance: not_run.; cloud_billing'in hedefi olan Central billing API'si kaynakta yok. Token saklamanın Central'da nasıl yapıldığı doğrulanamaz.; 'payments' app, ERPNext ve HRMS kurulu değil ve değerlendirilmedi. Global ekosistemde ödeme yokluğu iddia edilmiyor.; Derlenmiş dist/*.js bundle eşleşmeleri davranış kanıtı sayılmadı.; Log ve export içinde PAN/CVV bulunmadığı runtime'da doğrulanmadı; kaynak yalnız kod varlığını ya da yokluğunu gösterir.; suiteCommit bilinmiyor; suite/headless_provider yerel pilot ek koddur ve upstream-native değildir.

Temporal workflow: `saas-recheck-20261015t073528z-022`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### payments-6 — Sağlayıcı bildirimini doğrulama; geciken veya sırasız sonuçları işleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (yanlış imzanın reddi, eski olayın Paid'i geri çevirmemesi) net. Core'da genel bir /api/method uç noktası primitifi var; ancak imza doğrulama, sıralama ve monotonik durum koruması görülmedi. Server Script API'sindeki allow_guest kısayolu güvenli bir webhook sözleşmesi değildir.

Eksik: Webhook uç noktasının sahibi (Payments uygulaması mı, özel whitelisted metot mu) ve guest erişim sınırı tanımsız.; İmza doğrulama, zaman damgası toleransı ve secret rotasyonu kuralı yok.; Sırasız olaylar için monotonik geçiş kuralı (Paid'den geri dönüş yasağı) yazılmamış.; Server Script API ile allow_guest kullanımının kısayol olarak yasaklandığı belirtilmemiş.

Sonraki adım önerisi: Durum makinesine izinli geçişleri ve imza doğrulama adımını ekleyin. Uç noktayı, Payments kurulumu ya da imza doğrulayan whitelisted bir metot kararına bağlayın.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/api/v1.py:152`; `frappe/frappe/core/doctype/server_script/server_script.json:73`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:25`.

#### finance-1 — Sipariş, fatura, muhasebeleştirme ve ön muhasebe.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul cümlesi (sipariş–fatura–tahsilat → doğru cari + dengeli defter) var, ancak kapsam 'conditional' ve ERPNext/dış muhasebe seçimi yapılmamış. Kurulu uygulamalar yalnız frappe ve suite; sipariş, fatura ve GL ERPNext yeteneği olduğundan yerelde kurulu değil. Frappe'de yalnız genel submit/izin/REST primitifleri var; cloud_billing ise sitenin kendi Frappe Cloud faturası ve SaaS müşteri muhasebesi değil.

Eksik: ERPNext ya da harici muhasebe kararı ve sahibi yok; scopeDecision açık kalmış; Frappe 17.0.0-dev ile uyumlu ERPNext sürüm/branch eşlemesi yok; Headless entegrasyon sınırı yok: hangi DocType'lar, submit/cancel akışı, idempotency ve tahsilat eşleme kontratı tanımsız; Kabulde örnek veri seti, beklenen GL satırları ve tenant sınırı yok; cloud_billing (site aboneliği) ile SaaS müşteri faturası ayrımı yazılı değil

Sonraki adım önerisi: billing-instruction--implementation altına tek karar notu ekle: ERPNext mi harici muhasebe mi, Frappe 17 dev uyumlu sürüm pini ve tek örnek zincir (1 sipariş → 1 fatura → 1 tahsilat → beklenen GL). Seçilen app kurulup doğrulanana kadar native diye işaretleme.

Mevcut birincil görev: `billing-instruction--implementation`. Kaynak: `suite/pyproject.toml:45`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:1`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/client.py:276`.

#### finance-2 — Para birimi, döviz kuru ve vergilendirme yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul cümlesi dövizli, vergi dahil ve yuvarlanmış işlem için tutar ve hesap eşleşmesini istiyor; ancak ülke, vergi politikası ve kur kaynağı seçilmemiş. Currency Exchange, vergi şablonları ve Accounts Settings ERPNext tarafında; ERPNext yerelde kurulu değil. Verilen Frappe kesitlerinde vergi veya kur motoru görülmedi.

Eksik: Ülke/vergi rejimi ve kur kaynağı (manuel mi, sağlayıcı mı) seçilmemiş; Beklenen tutar ve hesapları içeren somut örnek senaryo tablosu yok; Yuvarlama hassasiyetinin hangi ayarla ve hangi seviyede (satır mı belge mi) uygulanacağı yazılmamış; ERPNext sürüm eşlemesi ve headless salt-okunur hesaplama önizleme kontratı yok

Sonraki adım önerisi: currency-tax-policy--implementation için tek politika kaydı yaz: ülke, vergi oranları, kur kaynağı, yuvarlama kuralı ve 1 dövizli örnek ile beklenen sonuç. Uygulama, finance-1 kararı ve ERPNext kurulumu sonrasına bağımlı.

Mevcut birincil görev: `currency-tax-policy--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/pyproject.toml:6`.

#### finance-3 — Süper admin için SaaS müşterilerinin cari, finans ve mutabakat yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul cümlesi iki yönlü: süper admin mutabakat yapabilmeli, tenant kullanıcısı işletmeci carisini görmemeli. Frappe'de DocType izni, has_permission, alan seviyesinde okuma izni ve Permission Query primitifleri var. Cari ve Payment Reconciliation ise ERPNext'e ait ve kurulu değil. Ayrıca işletmeci defterinin tenant sitelerinden nasıl ayrılacağı (ayrı site mi, aynı site mi) tanımsız.

Eksik: İşletmeci defterinin konumu tanımsız: kontrol sitesi mi, tenant sitesi mi; site arası veri akışı yok; Süper admin rol/izin matrisi ve tenant reddi için negatif test senaryosu yazılmamış; Mutabakat çalıştırma kontratı (girdi, eşleme kuralı, geri alma, denetim izi) yok; Keycloak rolünden Frappe Role'e eşleme tanımsız; ignore_permissions/Permission Query string SQL kısayolunun yasak olduğu açıkça yazılmamış

Sonraki adım önerisi: reconciliation-run--implementation için önce yetki sınırı kararını yaz: işletmeci cari defteri ayrı kontrol sitesinde, native Role/DocPerm ile korunuyor; tenant için 1 negatif kabul senaryosu. Mutabakat motoru ERPNext kurulumu sonrasına bağımlı.

Mevcut birincil görev: `reconciliation-run--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/desk/reportview.py:25`; `frappe/frappe/core/doctype/server_script/server_script.js:125`.

#### finance-4 — Fatura bilgileri, numaralandırma, vergi profili ve yuvarlama kuralları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul cümlesi numara benzersizliği, vergi profili ve küsurat örneklerini istiyor, ancak 'seçilen ülke senaryosu' tanımlı değil ve yerel e-belge koşulu açık bırakılmış. Fatura alanları, vergi profili ve yuvarlama ERPNext'te; kurulu değil. Frappe'nin genel naming ve izin primitifleri tek başına mali numaralandırma ve vergi profili kuralı değil.

Eksik: Ülke ve e-belge (ör. yerel e-fatura) gereksinimi seçilmemiş; Numara serisi formatı, sıfırlanma dönemi ve iptal/boşluk politikası tanımsız; Vergi profili alan listesi ve hangi alanların Custom Field ile ekleneceği belirtilmemiş; finance-1 ile aynı primary task paylaşılıyor; bağımlılık sırası yazılmamış

Sonraki adım önerisi: billing-instruction--implementation içinde finance-4'ü finance-1 kararına bağla; ülke seçimi, numara serisi kuralı ve 3 küsurat örneği içeren tek tablo ekle. Ek alanlar native Custom Field/Property Setter ile planlansın.

Mevcut birincil görev: `billing-instruction--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/api/v1.py:132`.

#### finance-5 — Alacak/borç düzeltmeleri, ön ödeme, vade ve gecikme takibi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef (avans mahsubu, kısmi ödeme, düzeltme) ve kabul ölçütü (cari bakiye ile fatura kalanının eşleşmesi) anlamlı. Ancak tüm yetenek ERPNext'e dayanıyor ve ERPNext yerel sitede kurulu değil. Suite yalnız frappe bağımlılığı bildiriyor. Frappe çekirdeğinde yalnız submit/cancel/amend gibi belge yaşam döngüsü yapı taşları var; muhasebe defteri yok.

Eksik: ERPNext sürümünün yerel Frappe 17.0.0-dev ile eşlemesi tanımlı değil; dokümanlar sürümsüz.; 'SaaS erişim etkisi ayrıca bağlanır' notunun hangi göreve bağlanacağı yok: vade veya gecikmenin askıya alma/erişim kısıtına nasıl bağlanacağı belirsiz.; finance-5, 8 ve 9 aynı primaryTaskId'yi (billing-instruction--implementation) paylaşıyor; alt kabul sınırı ayrılmamış.; İşletmeci muhasebesinin ERPNext'te mi harici sistemde mi tutulacağı (scope: conditional) kararı verilmemiş.

Sonraki adım önerisi: billing-instruction--implementation altında tek bir karar kaydı açılmalı: muhasebe sistemi (ERPNext ayrı site mi, harici sistem mi), Frappe 17 dev ile uyumlu ERPNext dalı ve gecikmenin erişime etkisi kuralı yazılmalı. Bu karar verilmeden yerel yetenek iddia edilmemeli.

Mevcut birincil görev: `billing-instruction--implementation`. Kaynak: `suite/pyproject.toml:45`; `frappe/frappe/permissions.py:20`; `frappe/frappe/client.py:276`.

#### finance-6 — Banka, ödeme sağlayıcısı ve muhasebe kayıtlarını uzlaştırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: sağlayıcı ücretleri dahil settlement toplamı banka ve defterle uzlaşmalı, fark açıklanmalı. Ancak ödeme–fatura mutabakatı ERPNext'te, ödeme geçidi DocType'ları ise payments uygulamasında. İkisi de kurulu değil; patch, payments yoksa geçit DocType'larını siliyor. Çekirdekteki on_payment olayları payments controller'ına bağlı. cloud_billing'deki reconcile_payment_setup yalnız kart kurulumunu etkinleştiriyor; settlement uzlaştırması değil.

Eksik: Banka ekstresi kaynağı, ödeme sağlayıcısı ve settlement veri biçimi seçilmemiş.; payments uygulamasının kurulup kurulmayacağı ve sürümü belirtilmemiş.; Uzlaşmayan farkın sahibi, eşik ve onay akışı tanımlı değil.; Bu iş idempotent yeniden çalıştırma gerektiriyor; reconciliation-run görevinde bu sözleşme yok.

Sonraki adım önerisi: reconciliation-run--implementation için önce sağlayıcı ve banka veri kaynağı seçilmeli, ardından payments ve ERPNext sürüm eşlemesi yazılmalı. Fark kaydı alanları (tutar, ücret, açıklama, sahip) sözleşme olarak tanımlanmalı; ignore_permissions içeren yardımcılar veya ham SQL kestirme yol olarak kullanılmamalı.

Mevcut birincil görev: `reconciliation-run--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:25`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:69`.

#### finance-7 — Muhasebe sistemi ve uygulanabilir e-belge entegrasyonları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü (sağlayıcının test ortamında belge kabul/iptal ve finans eşlemesi) anlamlı. Ancak hedef ülke, e-belge sağlayıcısı ve muhasebe sistemi seçilmediği için kabul ölçütü koşullu kalıyor. ERPNext kurulu değil. Sunulan kaynak kesitlerinde e-belge kodu görülmedi; bu küresel yokluk kanıtı değil. Frappe REST/RPC ve izin denetimi entegrasyon için yalnız yapı taşı.

Eksik: Ülke, e-belge sağlayıcısı ve sağlayıcı API sürümü kararı yok.; Muhasebe köprüsünün yönü ve kaynak kayıt (source of truth) tanımlı değil; mükerrer gönderim ve iptal eşlemesi kuralı yok.; Sağlayıcı kimlik bilgilerinin nerede saklanacağına dair sınır tanımlı değil (secret değerleri kaynağa yazılmamalı).

Sonraki adım önerisi: accounting-bridge--implementation için ülke ve sağlayıcı seçimi tek bir karar olarak kaydedilmeli. Seçim yapılana kadar görev 'verify/blocked' olarak işaretlenmeli; köprü uç noktaları izin denetimli whitelisted yöntemlerle sınırlanmalı.

Mevcut birincil görev: `accounting-bridge--implementation`. Kaynak: `frappe/frappe/api/v1.py:132`; `suite/pyproject.toml:45`.

#### finance-8 — İşletmecinin finans kayıtları ile müşterinin ürün içi muhasebesini ayırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: işletmeci faturası tenant muhasebesine istemeden yazılmamalı ve çapraz rapor erişimi engellenmeli. Kaynakta ayrışmayı destekleyen yapı taşları var: Cloud Settings faturalaması iş mantığını Central'da tutuyor ve System Manager rolüyle erişim kontrol ediliyor; site başına izinler ve reportview'da ignore_permissions engeli de mevcut. Hazır bir ayrıştırma politikası ise yok. Server Script Permission Query örneği f-string ile SQL koşulu kuruyor; bu kestirme yol olarak kabul edilemez.

Eksik: İşletmeci defterinin yeri belirtilmemiş: Central, ayrı ERPNext sitesi veya harici sistem.; Tenant sitesinde ERPNext kurulursa company/site sınırı ve rapor izin matrisi tanımlı değil.; Cloud billing'in Frappe Cloud/Atlas'a özgü olduğu ve Keycloak kimliğiyle nasıl eşleneceği belirtilmemiş.; Paylaşılan billing-instruction görevi içinde bu maddenin kabulü ayrılmamış.

Sonraki adım önerisi: billing-instruction--implementation altında ayrışma kararı yazılmalı: işletmeci finansı tenant sitesinin dışında (Central veya ayrı muhasebe sitesi) tutulmalı. Çapraz erişim, yerel DocType izinleri ve User Permission ile engellenmeli; Permission Query script veya ham SQL kullanılmamalı.

Mevcut birincil görev: `billing-instruction--implementation`. Kaynak: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:12`; `frappe/frappe/desk/reportview.py:25`; `frappe/frappe/core/doctype/server_script/server_script.js:125`.

#### finance-9 — Ertelenmiş gelir; hizmet dönemine göre gelir tanıma planı ve dönemsel muhasebeleştirme.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü ayrıntılı: hizmet dönemine bölme, faturayla uzlaşma, iptal/iade ve kapalı dönem. Ancak dayanılan ERPNext Deferred Revenue kurulu değil. Frappe'nin zamanlayıcı ve Monthly gibi olay sıklıkları yalnız dönemsel çalıştırma yapı taşı; gelir tanıma mantığı içermiyor.

Eksik: Abonelik verisinin kaynağı ve hizmet dönemi alanlarının fatura satırına eşlenmesi tanımlı değil.; İşletmecinin hesap politikası (aylık/günlük oransal dağıtım, kapalı dönem düzeltmesi) yazılmamış.; ERPNext sürüm eşlemesi yok; finance-1 ile sınır yalnız scopeDecision'da belirtilmiş.

Sonraki adım önerisi: billing-instruction--implementation içinde ertelenmiş gelir alt kararı yazılmalı: dağıtım yöntemi, abonelik → fatura satırı eşlemesi ve kapalı dönem kuralı. Uygulama, ERPNext kurulumu ve sürüm kararına bağımlı tutulmalı; Server Script zamanlayıcısıyla özel muhasebe kodu yazılmamalı.

Mevcut birincil görev: `billing-instruction--implementation`. Kaynak: `frappe/frappe/core/doctype/server_script/server_script.json:102`; `suite/pyproject.toml:45`.

### Müşteri operasyonları ve içerik

#### crm-1 — CRM (Customer Relationship Management — müşteri ilişkileri yönetimi) ve satış.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Yerel sitede yalnız frappe ve suite kurulu; Frappe CRM uygulaması kurulu değil. Talimatta hedef (CRM'i entegre et) ve kabul ölçütü (leadden anlaşmaya izinli API) var. Ancak CRM sürümünün frappe 17.0.0-dev ve Python 3.14 ile uyumu, kurulum kararı ve Keycloak kullanıcı/rol eşlemesi tanımlı değil. Frappe REST v1 kaynak ilkelleri mevcut, ama bu CRM yolculuğu sayılmaz.

Eksik: Seçilen CRM sürümü ve yerel Frappe commit adf1fd0 ile uyum eşlemesi yok; Kurulumun koşullu kapsam kararına bağlanması ve hangi bench/sitede yapılacağı yazılmamış; Keycloak kimliği → Frappe User/Role eşleme sözleşmesi yok; Kabulde 'izinli API' için hangi uç noktaların (v1/v2 resource veya CRM metotları) kullanılacağı belirsiz

Sonraki adım önerisi: Önce koşullu kapsam kararını netleştir. Ardından crm-lead-bridge--implementation görevine şunları ekle: Frappe 17-dev/Py3.14 ile uyumlu CRM sürümü, kurulumun ayrı karar olduğu notu ve Keycloak rol eşleme tablosu. Kurulum ve fonksiyonel kabul not_run kalır.

Mevcut birincil görev: `crm-lead-bridge--implementation`. Kaynak: `suite/pyproject.toml:6`; `suite/pyproject.toml:45`; `frappe/pyproject.toml:7`; `frappe/frappe/api/v1.py:154`.

#### crm-2 — Müşteri adayı, kişi, firma, fırsat ve satış aşamaları.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Lead, Organization, Deal ve aşama modelleri CRM uygulamasına ait ve CRM kurulu değil. Frappe çekirdeğinde Contact/Address ve Dynamic Link var; Suite'te ise JMAP'e bağlı sanal Contact Card var. Talimat, kişi için hangi kaynağın asıl kayıt (system of record) olduğunu tanımlamıyor.

Eksik: Frappe Contact ile Suite sanal Contact Card (JMAP) arasındaki asıl kayıt ve senkron kararı yok; Aşama modeli (CRM durum listesi mi, Workflow mu) ve geçiş yetkileri tanımsız; 'İlişkiler korunur' kabulü için Link/Dynamic Link alanlarının listesi yok

Sonraki adım önerisi: crm-lead-bridge--implementation görevine üç karar ekle: kişi/firma için asıl kayıt (çekirdek Contact; Contact Card yalnız e-posta tarafı), aşama sahibi DocType ve aşama değişince doğrulanacak bağ alanları.

Mevcut birincil görev: `crm-lead-bridge--implementation`. Kaynak: `frappe/frappe/contacts/sidebar/contacts/contacts.json:35`; `frappe/frappe/patches/v11_0/create_contact_for_user.py:11`; `suite/suite/mail/doctype/contact_card/contact_card.json:178`; `suite/suite/mail/doctype/contact_card/contact_card.py:132`.

#### crm-3 — Görüşme/not, hatırlatma, sorumlu atama ve iletişim geçmişi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Çekirdekte iletişim geçmişi için Communication DocType ilkesi var. Ancak not, görev, atama ve hatırlatma için CRM uygulaması kurulu değil; ToDo/assign kaynağı bu alıntılarda görülmüyor. Ayrıca web iletişim formu kaydı ignore_permissions ile ekliyor; headless akışta kısayol olarak kullanılmamalı.

Eksik: Zaman çizelgesinin kaynağı belirsiz: Communication mı, Suite Mail/JMAP mı; Hatırlatma kanalı ve vadeyi kimin tetikleyeceği tanımsız; Keycloak kullanıcısı → atanan kişi (User) eşlemesi yok; ui-family-24/25 destek görevleriyle sunucu yetki sınırı ayrımı yazılmamış

Sonraki adım önerisi: crm-interaction--implementation görevine zaman çizelgesi kaynağını (Communication + atama) ve izinli API sınırını ekle. ignore_permissions içeren yolların kullanılmayacağını açıkça yaz.

Mevcut birincil görev: `crm-interaction--implementation`. Kaynak: `frappe/frappe/www/contact.py:61`; `frappe/frappe/www/contact.py:67`; `frappe/frappe/www/contact.py:59`.

#### crm-4 — Müşteri tekilleştirme, kayıt birleştirme ve sahiplik değişikliği.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta merge parametreli whitelisted rename_doc ve if_owner izin mantığı var. Suite'teki e-posta adresi tekilleştirmesi yalnız posta önerileri için; müşteri tekilleştirmesi değil. Talimat ise yerel v17-dev yerine version-15 kaynağına atıf yapıyor ve eşleşme kuralı, çakışma çözümü ve sahiplik denetim sözleşmesi içermiyor.

Eksik: Kaynak atıfı version-15; yerel commit adf1fd0 (17.0.0-dev) ile eşlenmemiş; Mükerrer eşleşme anahtarları ve birleştirme öncesi önizleme/onay yok; Merge'de alan değeri çakışmalarının çözümü ve geri alınamazlık uyarısı yok; Sahiplik değişikliğinin denetim izi (track_changes/Version) ve yetki rolü tanımsız

Sonraki adım önerisi: Kaynak atfını yerel frappe/client.py rename_doc'a güncelle. Görev kapsamını kısa tut: eşleşme anahtarları, merge önizlemesi ve yetkili rol. Sahiplik değişikliğini track_changes açık DocType üzerinden izinli save ile denetlenecek biçimde tanımla.

Mevcut birincil görev: `crm-lead-bridge--implementation`. Kaynak: `frappe/frappe/client.py:265`; `frappe/frappe/client.py:271`; `frappe/frappe/permissions.py:328`; `suite/suite/mail/store/indexes/email_address.py:97`.

#### crm-5 — Müşteri başarısı: hesap sağlığı, kullanım düşüşü ve yenileme riski.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de genel otomasyon primitive'leri var, hesap sağlığına özgü bir şey yok. (1) Automation Flow DocType'ında 'Date Based' tetikleyici bulunuyor: date_field, date_offset ve Before/After seçeneği. scheduler.process_date_based her saat çalışıyor ve hooks.py'de kayıtlı. Seçilen tarih alanı bugünkü ofsete denk gelen belgeleri kuyruğa alıyor ve her belge için günde bir kez tetikliyor; kodun kendi yorumu da '3 days Before renewal' örneğini veriyor. (2) Cron ile çalışan 'Scheduled' tetikleyici, filtre ve koşula göre belge seçebiliyor. (3) Eylem kayıt defterinde CreateDocument (ör. ToDo/görev üretimi), AssignToUser, SendNotification, SetFieldValue ve IncrementFieldValue var. Bunlar yaklaşan yenilemeye görev üretmek için yeniden kullanılabilir. Suite modülleri (Drive/Slides/Writer/Sheets/Meet/Mail/Calendar/Suite Core) içinde CRM, hesap veya abonelik modeli yok; 'renewal' eşleşmeleri yalnız Mail push-subscription yenilemesine ait. Yerel pilot suite/headless_provider yalnız headless-metadata.v1 şema sağlayıcısı (session/metadata/create_field/preview_edit/apply_edit); sağlık veya risk sözleşmesi içermiyor.

Eksik: Hesap/müşteri ve yenileme tarihini taşıyan bir DocType yok (ERPNext/CRM kurulu değil).; Kullanım olayı kaynağı, zaman penceresi ve kullanım düşüşü hesaplaması yok.; Sağlık/risk puanı motoru yok: formül, eşikler ve açıklanabilirlik çıktısı (hangi kuralın ne kadar puan kattığı) bulunmuyor. Puanı saklayan alan ya da puan geçmişi de yok.; Kullanım düşüşü ile yenileme yakınlığını tek bir puanda birleştiren mantık yok. Automation Flow koşulları yalnız belge alanlarını değerlendiriyor, zaman serisi kullanım verisini toplamıyor.; crm-6 görev üretimine bağlanan bir sözleşme yok.; Headless provider'da account-health uç noktası ya da GenUI'ye dönük sağlayıcı sözleşmesi yok.; system_health_report site işletim sağlığına ait, müşteri sağlığıyla ilgisi yok.

Sonraki somut adım: Mevcut bağımlılık sırası korunmalı. Önce account-health--contract yazılmalı: kullanım olayının kaynağı ve penceresi (ör. son 30 gün ile önceki 30 gün karşılaştırması), yenileme tarihi alanının sahibi ve iki kurallı açıklanabilir puan biçimi (kural, ağırlık, girdi değeri). Ardından account-health--schema: hesap kaydında renewal_date, usage_events ve health_score/health_reasons alanlarının yeri. Sonra en dar davranış: bir puan hesaplayıcısı ve yalnız bu davranış için RED/GREEN testi. Görev üretimi yeni kodla yazılmamalı. Yenileme tarihi için Automation Flow Date Based tetikleyicisi ile CreateDocument/AssignToUser eylemleri, puan eşiği için Scheduled tetikleyici ve koşul kullanılmalı. Headless provider'a salt okunur puan ve gerekçe projeksiyonu en son eklenmeli.

Önerilen bağımlılık/sıra: account-health--contract; account-health--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `account-health--implementation`.

Kaynak kanıtı:

- `frappe/frappe/automation_engine/scheduler.py:180` — `"""Queue Date Based automations for documents whose date field lands on today's offset.`
- `frappe/frappe/automation_engine/scheduler.py:222` — `""" "3 days Before renewal" is due today when renewal is 3 days out; After looks back."""`
- `frappe/frappe/hooks.py:292` — `"frappe.automation_engine.scheduler.process_date_based",`
- `frappe/frappe/automation_engine/actions/core.py:97` — `action_type = "CreateDocument"`
- `frappe/frappe/automation_engine/actions/core.py:299` — `action_type = "AssignToUser"`
- `suite/suite/headless_provider/api.py:26` — `CONTRACT_VERSION = "headless-metadata.v1"`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ + suite/ (tüm kaynak kökü); arama `(?i)(health.?score|account.?health|churn|renewal|customer.?success|usage.?drop|risk.?score)`: 30 dosya bulundu. Hiçbiri hesap sağlığı motoru değil: suite eşleşmeleri Mail push-subscription yenilemesine ve Drive webdav 'churn' terimine ait. Frappe tarafında yalnız automation_engine/scheduler.py'deki tarih ofseti yorumu ilgili.
- suite/suite (*.json); arama `(?i)(\bcrm\b|subscription_end|contract_end|end_date|renew)`: Yalnız mail/doctype/user_settings/user_settings.json eşleşti. CRM, hesap veya yenileme DocType'ı yok.
- suite/suite/modules.txt; arama `Read`: Modüller Drive, Slides, Writer, Sheets, Meet, Mail, Calendar ve Suite Core. CRM modülü yok.
- frappe/frappe/automation_engine; arama `(?i)(create_todo|"ToDo"|Create Document|assign_to|def _action_|ACTION_)`: Eylem kayıt defterinde CreateDocument, AssignToUser, SendNotification, SetFieldValue ve IncrementFieldValue var.
- frappe/frappe/**/automation_flow/*.json; arama `"(trigger_type|date_field|date_offset|date_direction)"`: Automation Flow DocType'ında date_field, date_offset (Int) ve date_direction (Before/After) alanları var.
- frappe/frappe/hooks.py; arama `process_date_based|process_cron`: process_cron 261. satırda, process_date_based 292. satırda hourly olarak kayıtlı.
- frappe/frappe (*.py); arama `(?i)(usage.?(event|log|metric|trend)|activity.?score|engagement|last_active|login.?count|decline)`: 11 dosya eşleşti (user.py, sessions.py, system_health_report.py, scheduler ve testler). Bunlar kullanıcı oturumu ve site işletim sağlığıyla ilgili; müşteri hesabı kullanım düşüşü analitiği yok.
- suite/suite/headless_provider/; arama `Glob **/*.py + Read api.py`: Yerel pilot kod; yalnız şema meta sağlayıcısı (headless-metadata.v1). Sağlık veya risk uç noktası yok.

Sınır: Yalnız yerel kaynak anlık görüntüsü incelendi (frappe adf1fd0c, suite commit bilinmiyor). Çalışma zamanı, zamanlayıcının gerçekten çalışması ve kabul testi doğrulanmadı; functionalAcceptance: not_run.; ERPNext, HRMS ve Frappe CRM uygulaması kurulu değil ve değerlendirilmedi. Global ekosistemde bu özelliğin olmadığı iddia edilmiyor.; Testler çalıştırılmadı. automation_engine'in koşul değerlendirici, dispatch ve runner dosyaları ayrıntılı okunmadı; görev üretimi yalnız eylem tanımı düzeyinde doğrulandı.; Suite'in Vue frontend'i ile headless sağlayıcı sözleşmesi birbirinden ayrı tutuldu. GenUI tarafı değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-023`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### crm-6 — Müşteri devreye alma kontrol listesi ve yenileme müdahale görevleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Frappe uygulama kaynağında genel amaçlı yapı taşları var. (1) Automation Flow'da 'Doc Created' ve 'Date Based' tetikleyicileri bulunuyor. Date Based zamanlayıcı, tarih alanı hedef güne eşit olan kayıtları kuyruğa alıyor. Aynı gün işlenmiş ya da kuyrukta bekleyen kayıtlar atlanıyor; böylece belge başına günde bir tetikleme sağlanıyor. (2) CreateDocument (new_doc + insert) ve AssignToUser (assign_to.add) aksiyonları var. assign_to._add, aynı referans ve aynı kullanıcı için açık bir ToDo varsa yenisini oluşturmuyor. (3) Assignment Rule, koşula göre ToDo ataması yapıyor. (4) Module Onboarding ve Onboarding Step bir kontrol listesi modeli sunuyor (adımlar, is_complete/is_skipped, rol izni). Ancak ilerleme müşteri başına değil, site/modül genelinde tutuluyor. Suite'teki onboarding (hooks.py:279), masaüstü kurulum sihirbazının yerine geçiyor; müşteri onboarding'i değil. Yerel pilot suite/headless_provider'da (api.py, local_fixture.py) ilgili kod yok.

Eksik: Kurulu kaynakta Customer/CRM DocType'ı ve 'yeni müşteri' olayı yok (ERPNext/CRM kurulu değil); Müşteri başına örneklenen bir kontrol listesi şablonu ve tamamlanma modeli yok; Module Onboarding site genelinde çalışıyor; Yenileme tarihi ya da risk alanı yok, crm-5 risk çıktısıyla entegrasyon da yok; Müşteri+dönem anahtarlı kalıcı tekil müdahale görevi yok. Mevcut tekrar-önleme yalnız gün bazlı ve açık durumdaki ToDo/kullanıcı kapsamında çalışıyor; görev kapanınca ya da sorumlu değişince yeni görev oluşabilir; Bu kurallar için Automation Flow fixture'ı, headless provider API sözleşmesi ve React/AntD UI yok; Runtime functionalAcceptance: not_run

Sonraki somut adım: Sıra şöyle olmalı. (1) onboarding-checklist--contract/--schema: müşteri kaynak DocType'ı belirlenmeli. Customer Onboarding Template/Item ve müşteri başına checklist örneği DocType'ları tanımlanmalı; örneğe (customer, template) tekil kısıtı, müdahale görevine ise (customer, renewal_period) tekil kısıtı konmalı. (2) --implementation: 'Doc Created' tetikleyicili Automation Flow, CreateDocument ile checklist örneğini oluşturmalı. crm-5 risk alanını kullanan 'Date Based'/'Field Value Changed' akışı ise müdahale kaydını tekil anahtarla oluşturmalı ve AssignToUser ile tek sorumluya atamalı. Önce bu tek dar davranış için RED/GREEN testi yazılmalı. (3) Ardından headless provider sözleşmesi ve ui-family-37 eklenmeli.

Önerilen bağımlılık/sıra: onboarding-checklist--contract; onboarding-checklist--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; crm-5; ui-family-37--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `onboarding-checklist--implementation`.

Kaynak kanıtı:

- `frappe/frappe/automation/doctype/automation_flow/automation_flow.json:89` — `"options": "Doc Created`
- `frappe/frappe/automation_engine/scheduler.py:214` — `if name in handled:`
- `frappe/frappe/automation_engine/actions/core.py:123` — `target = frappe.new_doc(params["doctype"])`
- `frappe/frappe/automation_engine/actions/core.py:319` — `from frappe.desk.form.assign_to import add`
- `frappe/frappe/desk/form/assign_to.py:74` — `if frappe.get_all("ToDo", filters=filters):`
- `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:43` — `def required_steps_done(self) -> bool:`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- suite; arama `(?i)onboarding|checklist|renewal|churn`: 36 dosya: mail/drive/meet/sheets ve derlenmiş frontend; müşteri onboarding'i ya da yenileme müdahalesi yok. hooks.py:279 yalnız kurulum sihirbazının yerine geçiyor
- suite/suite (*.json); arama `(?i)customer|crm|renewal|onboarding`: Yalnız meet/sfu-server/package-lock.json eşleşti; DocType yok
- suite/suite/headless_provider; arama `(?i)onboarding|checklist|renewal|customer|ToDo|assign|automation`: Eşleşme yok
- frappe/frappe (*.py,json,js,ts,vue); arama `(?i)renewal|churn|customer.?success|onboarding.?checklist|retention.?risk`: 5 dosya; ilgili olan yalnız automation_engine/scheduler.py (Date Based açıklaması). Yenileme/risk modeli yok
- frappe/frappe/**/doctype/{todo,assignment_rule,onboarding_step,module_onboarding,auto_repeat,...}; arama `glob`: ToDo, Assignment Rule, Module Onboarding, Onboarding Step, Auto Repeat mevcut; okundu
- frappe/frappe/automation_engine/actions/core.py, events.py, automation_flow.json; arama `class \w+|ToDo|assign_to|Create Document|trigger_type`: CreateDocument ve AssignToUser aksiyonları ile Doc Created/Date Based tetikleyicileri bulundu
- frappe/frappe/desk/form/assign_to.py; arama `DuplicateToDoError|def add\(`: Açık durumdaki aynı referans+kullanıcı ToDo tekrarı engelleniyor

Sınır: Yalnız kaynak kod okundu; hiçbir kod çalıştırılmadı, test yürütülmedi. functionalAcceptance: not_run; ERPNext/HRMS/Frappe CRM kurulu değil; onların Customer/CRM Task kodu değerlendirilmedi; automation_engine'in upstream kökeni frappe commit adf1fd0c ile sınırlı; site konfigürasyonu ve veritabanındaki Automation Flow kayıtları görülmedi; suiteCommit bilinmiyor; derlenmiş frontend map dosyaları ayrıntılı okunmadı; Test dosyaları (test_scheduler, test_actions) okunup çalıştırılmadı; davranış kanıtı implementasyon okumasına dayanıyor

Temporal workflow: `saas-recheck-20261015t073528z-024`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### calendar-1 — Calendar (takvim) ve appointment (randevu) yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Talimat Frappe v15 Event şemasına ve Google Calendar belgesine dayanıyor. Ancak kurulu yerel yapıda takvim, Suite uygulamasındaki JMAP tabanlı Calendar ve Calendar Event DocType'larıyla sağlanıyor. Kayıtlar db_insert/load_from_db üzerinden JMAP sunucusuna yazılıp okunuyor; izinler hooks.py üzerinden has_permission ile tanımlanmış. Takvim ve etkinlik için kaynak primitifleri var. Randevu/rezervasyon ürününe ait bir kaynak bu excerpt'te görülmüyor. Kabul ölçütü ('ayrı akışlarda çalışsın') ölçülebilir değil.

Eksik: Yeniden kullanım sınırı yok: Frappe core Event (v17 kaynağı excerpt'te görünmüyor) mı, yoksa Suite Calendar Event/JMAP mı kullanılacak, karar verilmemiş.; v15 kaynak referansları yerel Frappe 17.0.0-dev ve Suite 0.0.1 kaynağına eşlenmemiş.; Randevu kavramı (hizmet, süre, slot, rezervasyonu kimin yaptığı) ve misafir/harici kullanıcı erişim modeli tanımlı değil.; Headless istemcinin hangi whitelisted Suite metotlarını kullanacağı, rate limit etkisi ve JMAP/Stalwart bağımlılığı belirtilmemiş.; Kabul ölçütü somut değil: oluşturma, zaman gösterimi ve izin reddi senaryoları ayrı ayrı yazılmalı.

Sonraki adım önerisi: native-calendar-event--implementation görevine kısa bir karar notu eklenmeli: etkinlik için Suite Calendar Event/JMAP kullanılsın, randevu ise ayrı ve koşullu kapsam olarak tanımlansın. v15 Event referansları yerel Suite kaynak yollarıyla değiştirilmeli. Kabul ölçütü üç somut senaryoya bölünmeli: oluşturma, saat dilimiyle gösterim ve yetkisiz okumada PermissionError.

Mevcut birincil görev: `native-calendar-event--implementation`. Kaynak: `suite/pyproject.toml:6`; `suite/suite/calendar/doctype/calendar_event/calendar_event.py:175`; `suite/suite/calendar/doctype/calendar/calendar.py:75`; `suite/suite/hooks.py:177`; `suite/suite/hooks.py:61`.

#### calendar-2 — Uygunluk, katılımcılar, kaynak rezervasyonu ve çakışma denetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: eşzamanlı iki çakışmadan yalnız biri kabul edilmeli. Ancak talimat Frappe Database API'ye (satır kilidi) dayanıyor. Yerel etkinlikler ise JMAP sunucusunda tutuluyor, bu yüzden Frappe DB kilidi bu verilere uygulanamaz. Kaynakta free/busy alanı, availability'ye dahil etme ayarı, Principal/getAvailability hakkı, user/group/resource principal tanımı ve katılımcı genişletme var. Kaynak kapasitesi ve atomik çakışma engeli kaynakta görülmüyor.

Eksik: Çakışma kontrolünün nerede yapılacağı (Frappe tarafında kilit/kayıt mı, JMAP sunucu tarafında mı) ve atomiklik sözleşmesi tanımlı değil.; 'Kaynak' modeli (oda/ekipman principal mı, Frappe DocType mı) ve kapasite kuralı belirtilmemiş.; Availability sorgusu (Principal/getAvailability) için headless erişim yolu ve izin sınırı belirtilmemiş.; Uygunluk, kaynak ve çakışma için tekrarlayan etkinlik açılımının nasıl hesaba katılacağı tanımlı değil.

Sonraki adım önerisi: Görev notuna şu kararlar eklenmeli: (1) kaynak = JMAP resource principal mı yoksa Frappe DocType mı, (2) çakışma engelinin tek yazım noktası ve kullanılacak kilit mekanizması. Mevcut kabul ölçütü korunmalı; tekrarlayan örnekle çakışma senaryosu bütçe dahilinde eklenmeli.

Mevcut birincil görev: `native-calendar-event--implementation`. Kaynak: `suite/suite/calendar/doctype/calendar_event/calendar_event.json:190`; `suite/suite/calendar/doctype/calendar/calendar.json:122`; `suite/suite/calendar/doctype/calendar_rights/calendar_rights.json:89`; `suite/suite/calendar/doctype/calendar_rights/calendar_rights.json:26`; `suite/suite/calendar/doctype/calendar_event/mailing_lists.py:12`.

#### calendar-3 — Tekrarlayan etkinlik, saat dilimi ve davet yanıtları.

Yönerge: **Kısmi**. Kaynak temeli: **Doğrudan native temel**. İşlevsel kabul: `not_run`.

Yerel Suite kaynağında ilgili primitifler doğrudan var: JSCalendar recurrenceRule ve timeZone alanları JMAP'e yazılıyor, ICS çıktısına VTIMEZONE ekleniyor. RSVP hem giriş yapmış kullanıcı hem imzalı bağlantı için var ve occurrence (recurrence_id) bazında kaydediliyor. Talimattaki DST kabul ölçütü iyi. Ancak talimat v15 Event/Google'a dayanıyor ve bu yerel kaynağa eşlenmemiş. Fonksiyonel doğrulama yapılmadı (not_run).

Eksik: Talimat, Suite record_rsvp/resolve_rsvp ve JSCalendar alanlarına eşlenmemiş.; DST açılımını JMAP sunucusunun mu yoksa istemcinin mi hesapladığı ve doğruluğun kimde olduğu belirtilmemiş.; İmzalı RSVP bağlantısının giriş istemeyen yetki sınırı (süre, tekrar kullanım) headless istemci için sözleşme olarak yazılmamış.; Seri yanıtı ile occurrence yanıtı için ayrı kabul ölçütü yok.

Sonraki adım önerisi: Görev notunda kaynak eşlemesi v15 Event'ten Suite'e çevrilmeli (jmap_events, rsvp.record_rsvp, ics). DST kabul ölçütüne saat dilimi adı ve beklenen yerel saat eklenmeli. Occurrence RSVP kabulü ayrı senaryo olarak yazılmalı.

Mevcut birincil görev: `native-calendar-event--implementation`. Kaynak: `suite/suite/calendar/jmap_events.py:62`; `suite/suite/calendar/jmap_events.py:63`; `suite/suite/calendar/doctype/calendar_event/ics.py:66`; `suite/suite/calendar/api/rsvp.py:120`; `suite/suite/calendar/api/rsvp.py:9`.

#### calendar-4 — İptal/erteleme, hatırlatma ve dış takvim eşitleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta iptal (iTIP CANCEL, STATUS:CANCELLED), tek occurrence iptali/güncellemesi, sürükleyerek yeniden planlama, alert (display/email/audio) ve default alert var. Dış takvimle etkileşim iMIP/ICS e-postası ve Calendar Exchange içe/dışa aktarımıyla sağlanıyor. Talimat ise Google Calendar çift yönlü senkronuna ve Frappe Notification'a dayanıyor; bunların v17 kaynağı excerpt'te görünmüyor. Sürekli çift yönlü harici senkron kaynakta görülmüyor. 'Telafi davranışı' tanımsız.

Eksik: Harici senkron yöntemi seçilmemiş: Google Calendar entegrasyonu mu, iTIP/iMIP mi, ICS exchange mi.; Erteleme ve iptalde SEQUENCE/iTIP güncellemesinin karşı takvime ulaştığını gösteren kabul ölçütü yok.; Tekil tekrar iptali için 'seçilen telafi davranışı' tanımlanmamış.; Hatırlatmalar için JMAP alerts ile Frappe Notification arasındaki sorumluluk ayrımı yok.

Sonraki adım önerisi: Görev notuna harici senkron kararı eklenmeli (önerilen: mevcut iTIP/ICS yolu; Google entegrasyonu ayrı ve koşullu). Tekil occurrence iptali için beklenen sonuç somut yazılmalı. Hatırlatmalar için JMAP alerts tek kaynak olarak işaretlenmeli.

Mevcut birincil görev: `native-calendar-event--implementation`. Kaynak: `suite/suite/calendar/doctype/calendar_event/ics.py:154`; `suite/suite/calendar/install.py:41`; `suite/suite/calendar/install.py:53`; `suite/suite/calendar/doctype/calendar_event/fields.py:44`; `suite/suite/calendar/doctype/calendar_exchange/calendar_exchange.py:69`; `suite/suite/calendar/api/invites.py:143`.

#### support-1 — Helpdesk (destek merkezi), support (destek) ve ticket (destek talebi).

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü somut: müşteri ticket açar, yetkili ekip yanıtlar, tenant izolasyonu sağlanır. Görev eşlemesi de belli (helpdesk-ticket-bridge--implementation). Ancak Helpdesk uygulaması doğrulanmış kurulu uygulama listesinde yok; sitede yalnız frappe ve suite kurulu. Suite de destek ürünü içermiyor. Frappe çekirdeğinde Communication (Open/Replied/Closed durumları), genel REST rotaları ve has_permission gibi yapı taşları var; ama bunlar ticket ürünü değildir.

Eksik: Helpdesk sürümünün yerel Frappe 17.0.0-dev (adf1fd0c) ile uyumu ve kurulum kararı belirtilmemiş.; Tenant izolasyon modeli tanımsız: site başına tenant mı, User Permission/paylaşım kuralı mı?; Keycloak rolleri ile Helpdesk ajan/müşteri rolleri arasındaki eşleme ve headless API sınırı tanımsız.; Helpdesk kurulmazsa Communication'ı ticket gibi kullanmanın kabul edilip edilmediği belirsiz.

Sonraki adım önerisi: Önce kapsam kararı alınsın ve Helpdesk'in Frappe v17-dev uyumu kaynaktan teyit edilsin. Ardından tenant izolasyonu (User Permission veya site ayrımı) ve Keycloak rol eşlemesi, mevcut görev ID'si altında tek bir köprü sözleşmesi olarak yazılsın. Yeni CRUD veya izin katmanı kopyalanmasın.

Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/communication/communication.json:173`; `frappe/frappe/api/v1.py:154`; `frappe/frappe/core/doctype/communication/email.py:94`.

#### support-2 — Onboarding (ilk kullanım yönlendirmesi) ve uygulama içi yardım.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Onboarding ve yardım için çalışan yapı taşları upstream Frappe desk modülünde var. (1) Module Onboarding, Onboarding Step, Onboarding Step Map ve Onboarding Permission DocType'ları. Adım eylemleri: Create Entry, Update Settings, Show Form Tour, View Report, Go to Page, View Docs, Complete Onboarding. Her adımda Markdown açıklama, video, path ve route_options alanları bulunur. (2) Adım durumu veritabanında saklanır. Whitelisted update_onboarding_step yalnız is_complete ve is_skipped alanlarını yazar. Rol kapısı can_update_step, iş doğrulaması throw_if_unfinished/is_work_done, modül tamamlanması update_completion ile yapılır. Bu ilerleme site genelinde tutulur, kullanıcı başına değil. get_onboarding_steps adımları rol filtreli ve çevrilmiş metinle döner. (3) Form Tour ve Form Tour Step, page_route'a bağlı UI turları sunar. Turun tamamlanma durumu kullanıcı başına User.onboarding_status JSON alanında tutulur (update_user_status, reset_tour) ve özellik enable_onboarding ile açılıp kapanır. (4) frappe/onboarding.py, uygulama bazlı ve kullanıcı başına adım durumu API'si sağlar: get_onboarding_status ve update_user_onboarding_status. (5) Help Article ve Help Category, website bilgi tabanını /kb portal rotasıyla sunar. (6) Suite'in Vue frontend'inde yalnız ilk kurulum kapısı var: Suite Settings.is_onboarded alanı, get_onboarding_state ve mark_onboarded (System Manager) API'leri ile router'ın /suite/setup yönlendirmesi. Bağlamsal yardım ya da adım listesi yok. Yerel pilot suite/headless_provider'da onboarding, yardım veya tur sözleşmesi yok.

Eksik: Bağlam anahtarından (route/DocType/adım ID) yardım içeriğine çözümleme yapan API veya eşleme tablosu yok; Help Article yalnız portal KB'si, Onboarding Step/Form Tour ile bağı yok, View Docs yalnız path tutar.; Module Onboarding ilerlemesi site geneli; kullanıcı veya tenant başına adım ilerlemesi yalnız serbest JSON (User.onboarding_status) ile mümkün, şema/doğrulama yok.; Tenant kapsamı yok; Frappe site düzeyinde çalışır, tenant-registry ile bağ yok.; Headless provider sözleşmesi yok (adım listesi, durum yazma, bağlamsal yardım için kernel-envelope uyumlu uçlar).; Mevcut render katmanı Frappe Desk JS'dir; seçilen React/Ant Design frontendinde onboarding checklist veya bağlamsal yardım bileşeni yok (bu kaynakta yok, GenUI kapsamı dışı).; Helpdesk KB kurulu değil; içerik kaynağı kararı verilmemiş.

Sonraki somut adım: Sıra şöyle. (1) onboarding-checklist--contract: içerik kaynağı olarak upstream Help Article ve Onboarding Step seçilsin. Bağlam anahtarı tanımlansın: route, DocType ve stepId. İlerleme kapsamı belirlensin: kullanıcı mı tenant mı. Site geneli Module Onboarding, kullanıcı başına User.onboarding_status. (2) onboarding-checklist--schema: bağlam anahtarını yardım içeriğine eşleyen tek dar alan veya tablo eklensin. Upstream DocType'lar değiştirilmesin. (3) headless_provider'a iki salt sarmalayıcı uç eklensin: adımları ve bağlamsal yardımı okuyan uç get_onboarding_steps ve can_update_step'i yeniden kullansın; durumu yazan uç update_onboarding_step'i yeniden kullansın. Gerçek RED/GREEN kanıtıyla tek davranış uygulansın: tamamlanan adım saklanır ve tekrar okunur. (4) React UI bundan sonra ui-family-37 altında gelir.

Önerilen bağımlılık/sıra: onboarding-checklist--contract; onboarding-checklist--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; ui-family-37--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `onboarding-checklist--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/desktop.py:712` — `def update_onboarding_step(name: str | int, field: str, value: int | str):`
- `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:158` — `Progress is shared by the whole site, so the gate is the onboarding's own role list: anyone`
- `frappe/frappe/desk/doctype/onboarding_step/onboarding_step.py:159` — `def get_onboarding_steps(ob_steps: str | list):`
- `frappe/frappe/onboarding.py:13` — `def update_user_onboarding_status(steps: str | list | dict, appName: str):`
- `frappe/frappe/desk/doctype/form_tour/form_tour.py:114` — `ui_tours = frappe.get_all("Form Tour", filters={"ui_tour": 1}, fields=["page_route", "name"])`
- `suite/suite/api/account.py:16` — `"is_onboarded": bool(frappe.db.get_single_value("Suite Settings", "is_onboarded")),`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/desk/doctype (glob _/_/desk/doctype/_onboarding_/*); arama `*onboarding*`: module_onboarding, onboarding_step, onboarding_step_map, onboarding_permission DocType JSON/controller bulundu
- suite; arama `(?i)onboarding|walkthrough|product.?tour|help.?article|in.?app.?help|tooltip.?tour`: Yalnız suite/api/account.py, frontend/src/router/index.ts, hooks.py, setup.py, www/suite.py, patches.txt ve derlenmiş asset; ilk kurulum kapısı, bağlamsal yardım yok
- suite (public/frontend hariç); arama `(?i)onboarding|walkthrough|help`: Router onboarding gate (index.ts:162-200) ve patches.txt; help eşleşmeleri yalnız e2e helper/yarn.lock
- .; arama `def (get_onboarding_data|update_onboarding_step|get_onboarding_state|complete_onboarding)|can_update_step\(|update_completion\(`: frappe/desk/desktop.py:712 update_onboarding_step; suite/api/account.py:12 get_onboarding_state; module_onboarding.py yardımcıları
- frappe/frappe; arama `onboarding_status|Help Article|help_article|def get_onboarding_data|update_user_onboarding|"Form Tour"`: frappe/onboarding.py kullanıcı başına durum; form_tour.py kullanıcı tur durumu; website Help Article/Help Category ve hooks.py /kb rotası
- suite/suite/headless_provider; arama `(?i)onboard|help|tour|guide`: Eşleşme yok; yerel pilotta onboarding/yardım sözleşmesi yok

Sınır: Yalnız kaynak okuma; functionalAcceptance not_run, Desk JS widget render davranışı ve runtime doğrulanmadı.; Frappe desk frontend JS (onboarding widget, form tour JS) ayrıntılı okunmadı; değerlendirme backend DocType/API'lerine dayanır.; Help Article controller içeriği okunmadı; varlığı DocType JSON, hooks rotası ve help_category referansıyla sınırlı.; Helpdesk/ERPNext kurulu değil, değerlendirilmedi; suiteCommit bilinmiyor.; Tenant izolasyonu ve SaaS operasyonu kaynakla kanıtlanamaz.

Temporal workflow: `saas-recheck-20261015t073528z-049`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### support-3 — Survey (anket) ve NPS (Net Promoter Score — tavsiye skoru).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü ayrımı ve tekrar gösterim engelini istiyor: ticket memnuniyeti ile NPS ayrı kaydedilmeli, uygun olmayan kullanıcıya anket tekrar açılmamalı. Ticket geri bildirimi Helpdesk'e bağlı ve Helpdesk kurulu değil. Frappe'de kayıt ve izin yapı taşları var; Web Form yalnız test yardımcısında görünüyor, bu da uygulama kanıtı değil. Örnekleme, puanlama ve bekleme süresi mantığı kaynakta yok.

Eksik: NPS puanlama formülü (0–10, promoter/detractor eşikleri) ve raporlama tanımsız.; Uygunluk, örnekleme ve bekleme süresi kuralları ile bunların sunucuda mı uygulanacağı tanımsız.; Anket ve NPS yanıtlarının saklanacağı DocType ve tenant izolasyonu tanımsız.; Ticket memnuniyeti Helpdesk kurulumuna bağımlı; o olmadan nasıl karşılanacağı belirsiz.

Sonraki adım önerisi: support-feedback--implementation altında NPS veri modeli, uygunluk ve bekleme kuralı sözleşmesi yazılsın. Tekrar gösterim engeli sunucu tarafında, mevcut izin modeliyle uygulansın. Ticket memnuniyeti Helpdesk kararına bağımlı olarak işaretlensin.

Mevcut birincil görev: `support-feedback--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/permissions.py:82`.

#### support-4 — SLA (Service Level Agreement — hizmet seviyesi anlaşması), öncelik ve yanıt süresi.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut ve test edilebilir: mesai dışında açılan ticket için ilk yanıt ve çözüm sayacı seçilen SLA'ya göre hesaplanmalı. Ancak SLA, Helpdesk'in özelliği ve Helpdesk kurulu değil. ERPNext de kurulu olmadığı için ondaki SLA yeteneği yerel sayılamaz. İncelenen Frappe çekirdeği alıntılarında SLA veya iş saati hesabı yok.

Eksik: Sözleşme eşikleri (öncelik başına ilk yanıt ve çözüm süreleri) belirtilmemiş.; İş saatleri, tatil takvimi ve saat dilimi kaynağı ile tenant başına SLA ataması tanımsız.; support-1 ile aynı birincil görevde; 'configure' işi 'integrate' işinden ayrılmamış ve bağımlılık sırası yok.

Sonraki adım önerisi: Helpdesk kurulum kararından sonra uygulansın. Öncelik başına eşik tablosu, iş saati/tatil/saat dilimi kaynağı ve tenant ataması helpdesk-ticket-bridge--implementation altında yapılandırma alt adımı olarak tanımlansın. Yeni görev kaydı açılmasın.

Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/communication/communication.json:194`.

#### support-5 — Talep atama, kuyruk, durum, etiket, iç not ve üst yetkiliye aktarma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütleri anlamlı: doğru ekibe atama, özel notun müşteri API'sinde görünmemesi ve gecikme eskalasyonu. Ancak talimat, yerel kurulumda bulunmayan Helpdesk uygulamasına dayanıyor; site yalnız frappe ve suite içeriyor. Frappe çekirdeğinde bazı yapı taşları var: Assignment Rule, ToDo, _user_tags, Communication durumu ve permlevel alan izni. Kuyruk, SLA ve eskalasyon motoru ise kaynakta görülmedi.

Eksik: Helpdesk kurulu değil. Hangi sürümün Frappe 17.0.0-dev ile uyumlu olduğu ve kurulup kurulmayacağı kararı yok.; Özel not için hangi modelin kullanılacağı belirsiz: HD yorumu mu, Comment mi, yoksa permlevel>0 alan mı? Müşteri API'sinde filtreleme sözleşmesi tanımlı değil.; Kuyruk, etiket ve eskalasyon kuralları ile gecikme eşikleri tanımlanmamış.; helpdesk-ticket-bridge görevi support-8 ile paylaşılıyor. Köprünün sınırı (atama, durum, not) ayrılmamış.

Sonraki adım önerisi: Önce Helpdesk'i kurma veya çekirdek ToDo/Assignment Rule ile ilerleme kararını tek satırla kaydedin. Ardından helpdesk-ticket-bridge görevine şu sözleşmeyi ekleyin: özel not permlevel ile korunur ve müşteri yanıtı apply_fieldlevel_read_permissions üzerinden süzülür. Eskalasyonu SLA kaynağına bağlayın.

Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`. Kaynak: `frappe/frappe/core/doctype/communication/communication.py:12`; `frappe/frappe/core/doctype/communication/mixins.py:7`; `frappe/frappe/core/doctype/communication/communication.py:46`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/permissions.py:894`; `suite/pyproject.toml:6`.

#### support-6 — Bağlama duyarlı yardım, ilk kurulum adımları ve tamamlanma takibi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de çalışan onboarding ilkelleri var: Module Onboarding, Onboarding Step, Onboarding Step Map ve Onboarding Permission DocType'ları. Adım tamamlanması sunucuda doğrulanıyor. Whitelist'li desktop.update_onboarding_step yalnız is_complete/is_skipped alanlarını kabul ediyor; önce can_update_step ile rol kontrolü, sonra throw_if_unfinished yapıyor. is_work_done, Create Entry adımı için kaydın var olup olmadığına (submittable ise docstatus=1), Update Settings adımı için Single alan değerine bakıyor. Ardından update_completion onboarding'in is_complete değerini güncelliyor. İlerleme site genelinde paylaşılıyor ve adım bayraklarında kalıcı; bu yüzden yeniden girişte tamamlanmış adımlar korunuyor. Bağlama duyarlı yardım ilkelleri: Form Tour (ui_tour + page_route ile rota eşlemesi), kullanıcı başına User.onboarding_status JSON'u, DocType.documentation ve DocField/Report.documentation_url. Suite tarafındaki kurulu uygulama kodu: Suite Settings.is_onboarded tekil bayrağı, System Manager'a sınırlı mark_onboarded (complete_app_setup çağırıyor) ve Vue router'da /suite/setup ilk çalıştırma kapısı.

Eksik: Kullanıcı ve tenant kapsamlı devam imleci (current step) yok. Module Onboarding ilerlemesi site genelinde ve yalnız adım bayraklarında tutuluyor. Suite'te yalnız ikili is_onboarded bayrağı var ve sihirbazın ara adımı sunucuda saklanmıyor. 'Aynı adımdan devam' yalnız tamamlanmış bayraklardan dolaylı çıkarılabiliyor.; frappe.onboarding.update_user_onboarding_status, istemcinin gönderdiği adımları sunucu doğrulaması olmadan User.onboarding_status'a yazıyor. Bu nedenle tamamlanma kanıtı sayılamaz.; Yerel pilot suite/headless_provider (api.py, local_fixture.py) içinde onboarding, yardım veya tur sözleşmesi yok. React/AntD/X istemcisi için headless provider uç noktası ya da DTO bulunmuyor.; Bağlama duyarlı yardımın ekran/rota → içerik eşlemesi yalnız Desk'e bağlı Form Tour ve documentation URL alanlarıyla sınırlı. Headless rota kimliğiyle eşleşen bir yardım kaynağı modeli yok.; Tenant kapsamı yalnız site düzeyinde örtük. tenant-registry ve kernel-envelope sözleşmelerine bağlanmış bir onboarding durum modeli yok.; Module Onboarding kayıtları uygulama fixture'ı olarak tanımlanıyor (Suite'e özgü Module Onboarding kaydı bulunamadı). SaaS ürününe ait adım seti tanımlı değil.

Sonraki somut adım: onboarding-checklist--contract içinde Frappe Module Onboarding/Onboarding Step'i yeniden kullanma kararını kaydedin. Ardından onboarding-checklist--schema kapsamında yalnız eksik olan kullanıcı/tenant kapsamlı devam imleci için ek alanı veya küçük bir DocType'ı tanımlayın. Sonra headless provider'a iki dar whitelist'li yöntem ekleyin. Okuma yöntemi get_onboarding_steps ve get_step_details'i sarmalayarak adımları ve imleci döndürsün. Yazma yöntemi update_onboarding_step'i (can_update_step + throw_if_unfinished) yeniden kullansın. Gerçek bir RED/GREEN testiyle şunları kanıtlayın: bitmemiş Create Entry adımı reddedilmeli, imleç yeniden girişte korunmalı. Bağlama duyarlı yardım (route → documentation/Form Tour eşlemesi) ui-family-37 ile sonraki adımda ele alınsın.

Önerilen bağımlılık/sıra: onboarding-checklist--contract; onboarding-checklist--schema; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; ui-family-37--implementation. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `onboarding-checklist--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/desktop.py:735` — `frappe.get_doc("Onboarding Step", name).throw_if_unfinished()`
- `frappe/frappe/desk/desktop.py:731` — `if not can_update_step(name):`
- `frappe/frappe/desk/doctype/onboarding_step/onboarding_step.py:62` — `return bool(self.is_complete or self.is_skipped or self.is_work_done())`
- `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:158` — `Progress is shared by the whole site, so the gate is the onboarding's own role list: anyone`
- `frappe/frappe/onboarding.py:21` — `onboarding_status[appName + "_onboarding_status"] = steps`
- `suite/suite/api/account.py:30` — `frappe.db.set_single_value("Suite Settings", "is_onboarded", 1)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/, suite/ (*.py, *.json); arama `(?i)onboarding`: 47 dosya bulundu: frappe/desk/doctype/{module_onboarding,onboarding_step,onboarding_step_map,onboarding_permission}, frappe/onboarding.py, desk/desktop.py, form_tour, setup_wizard; suite/api/account.py, suite_core/setup.py, hooks.py, www/suite.py
- frappe/, suite/ (*.py); arama `can_update_step|throw_if_unfinished|def update_onboarding_step|update_completion\(`: Sunucu tarafı doğrulama zinciri desktop.py:712-739'da; module_onboarding.py ve onboarding_step.py'deki tanımlarla bağlı
- suite/ (*.py, *.ts, *.vue, *.json, *.js); arama `(?i)onboarding|form.?tour|walkthrough|getting.?started|setup.?wizard|help.?(article|link|text)|context(ual)?.?help`: 15 dosya bulundu. İlgili davranış yalnız account.py get_onboarding_state/mark_onboarded ve frontend/src/router/index.ts ilk çalıştırma kapısında. Bağlama duyarlı yardım uygulaması yok.
- suite/suite/headless_provider; arama `(?i)onboard|tour|help|setup|getting.?started|checklist`: Eşleşme yok (dizinde api.py, local_fixture.py, **init**.py var)
- frappe/frappe (*.py, *.json); arama `def get_onboarding_data|onboarding_status|enable_onboarding`: System Settings.enable_onboarding kapısı, User.onboarding_status alanı, form_tour.update_user_status / reset_tour
- frappe/, suite/ (*.py, *.json); arama `"fieldname": "(documentation|help_article|help|documentation_url)"|def get_help_messages|help_messages`: DocType.documentation, DocField.documentation_url, Report.documentation_url, Property Setter.help bulundu. Ayrı bir yardım içerik modeli yok.

Sınır: Yalnız statik kaynak okundu. Test, komut veya runtime çalıştırılmadı; functionalAcceptance=not_run.; Desk JS tarafındaki onboarding widget ve Form Tour istemci kodu ayrıntılı okunmadı; değerlendirme sunucu tarafı davranışına dayanıyor.; suiteCommit bilinmiyor. headless_provider yerel pilot ek koddur, upstream değildir.; ERPNext/HRMS kurulu değil; bu uygulamaların onboarding kayıtları değerlendirilmedi.; Kaynak, dağıtılmış ortamdaki davranışı veya tenant izolasyonunu kanıtlamaz.

Temporal workflow: `saas-recheck-20261015t073528z-050`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### support-7 — Özellik talepleri, geri bildirim toplama ve memnuniyet geçmişi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü, kiracılar arası okuma yasağını içerdiği için anlamlı. Ancak taban olarak gösterilen Helpdesk ticket geri bildirimi kurulu değil. Özellik talebi ve oylama modeli yok. 'Müşteri' kimliğinin hangi kayda bağlanacağı da tanımsız; ERPNext Customer kurulu değil. Frappe'de owner/if_owner ve belge düzeyi izin yapı taşları mevcut.

Eksik: Müşteri kimliğinin neye eşleneceği tanımsız: Keycloak kullanıcısı mı, Contact mı, tenant mı? ERPNext Customer kurulu değil.; Özellik talebi, oy ve memnuniyet kayıtları için DocType ile izin modeli (if_owner veya User Permission) seçilmemiş.; Helpdesk feedback modelinin kurulumu ve sürümü belirsiz.; Kiracılar arası izolasyon için negatif kabul senaryosu yok.

Sonraki adım önerisi: support-feedback görevine şunları ekleyin: müşteri kimlik anahtarını seçin; talep, oy ve memnuniyet için yerel DocType'ları User Permission veya if_owner ile tanımlayın. Kabul ölçütüne 'başka müşteri listeleyemez/okuyamaz' API kontrolünü ekleyin.

Mevcut birincil görev: `support-feedback--implementation`. Kaynak: `frappe/frappe/permissions.py:328`; `frappe/frappe/permissions.py:94`; `suite/pyproject.toml:6`.

#### support-8 — Canlı destek sohbeti; temsilciye aktarım, görüşme geçmişi ve destek talebine dönüşüm.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütleri güçlü: kiracı yetkisi, çevrimdışı talep alma, tek ticket'a bağlanma ve saklama/silme politikası. Ancak sohbet sağlayıcısı seçilmemiş. Görev, support-5 ile aynı köprü görevine eşlenmiş. Frappe Communication 'Chat' ortamını ve timeline bağlantılarını destekliyor; temsilciye aktarma ve canlı oturum ise kaynakta yok.

Eksik: Sohbet hizmeti ya da özel uygulama kararı yok. Dış veri akışı ve saklama sahipliği belirsiz.; Ayrı bir uygulama görevi yok; helpdesk-ticket-bridge görevine yüklenmiş.; Sohbetin ticket'a dönüşümünde izinli make yolunun kullanılacağı belirtilmemiş. _make izin denetimini atladığı için dışa açılmamalı.; Temsilciye aktarma, çevrimdışı durum ve saklama süresi parametreleri tanımsız.

Sonraki adım önerisi: Sağlayıcı kararını kaydedin. Ticket dönüşümünü izin denetimli make üzerinden kurun: communication_medium='Chat' olsun ve timeline_links ile tek ticket'a bağlansın. Bu kısmı support-5 köprüsünden ayrı bir alt sözleşme olarak tanımlayın.

Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`. Kaynak: `frappe/frappe/core/doctype/communication/communication.py:51`; `frappe/frappe/core/doctype/communication/communication.py:95`; `frappe/frappe/core/doctype/communication/email.py:94`; `frappe/frappe/core/doctype/communication/email.py:173`.

#### support-9 — Güvenli destek paketi; hata kimliği, zaman ve ilgili ekran bağlamını önizleyerek paylaşma.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de hata kimliğinin kaynağı somut olarak var. frappe/monitor.py her istek için uuid4 izleme kimliği (trace id) üretiyor; istemci geçerli bir X-Frappe-Request-Id gönderirse onu kullanıyor. app.py process_response bu kimliği X-Frappe-Request-Id yanıt başlığına yazıyor. utils/error.py log_error aynı trace_id değerini Error Log kaydına yazıyor; böylece sunucu logu ile istemci arasında korelasyon kuruluyor. Error Log DocType izni yalnız System Manager rolünde. ErrorLog.clear_old_logs(days=30) ile saklama ve silme ilkeli (primitive) mevcut. Desk tarafında (headless değil) frappe.request.report_error şunları yapıyor: sunucu hatasında 'Report' düğmesi error_report_email alıcısına bir CommunicationComposer açıyor; alıcı yoksa 'Copy error to clipboard' paketi panoya kopyalıyor. Paket uygulama sürümlerini, route bilgisini, traceback'i, istek/yanıt verisini ve (yalnız pano yolunda) request_id değerini içeriyor. cleanup_request_opts yalnız doc içindeki parolaları maskeliyor. Suite Meet'te (Vue) problemReport.ts zaman damgası, URL, user agent, transport/ağ verisi ve son konsol log satırlarıyla, sabit bir dış adrese giden mailto bağlantısı hazırlıyor. suite/headless_provider (yerel pilot ek kod) içinde destek paketi veya hata kimliği sözleşmesi yok.

Eksik: Sabit alan allowlist'i yok: desk paketi istek ve yanıt verisini, dolayısıyla form içeriğini de ekliyor. Yalnız parola maskeleniyor; token, cookie, kişisel veya tenant verisi varsayılan olarak hariç tutulmuyor.; Kullanıcının alanları tek tek görüp çıkarabildiği yapılandırılmış bir önizleme ve açık onay adımı yok. Composer yalnız serbest metin düzenlemeye izin veriyor.; Saat dilimi alanı yok. Desk 'Report' (e-posta) yolunda request_id yok; bu kimlik yalnız pano yolunda var.; Suite Meet raporu ham konsol satırlarını ve tam URL'yi pakete koyuyor, sabit bir dış alıcı kullanıyor. Bu, gereksinimle çelişiyor.; Headless (React/AntD) istemci için X-Frappe-Request-Id tüketimi, destek paketi DocType'ı veya whitelisted API sözleşmesi yok; headless_provider içinde de bulunmuyor.; Paylaşılan paket için yetkili alıcıyla sınırlı bir depolama/izin modeli ve pakete özel saklama/silme politikası yok. Error Log'un 30 günlük temizliği yalnız sunucu loglarını kapsıyor.; Destek alıcısı veya entegrasyonu seçilmemiş; Helpdesk kurulu değil.

Sonraki somut adım: Sıra şöyle: (1) support-package--contract kapsamında alan allowlist'ini sabitleyin: trace_id (X-Frappe-Request-Id), ISO zaman ve IANA saat dilimi, uygulama sürümü, route/ekran kimliği. Kullanıcı tarafından eklenen açıklama dışında form, request/response gövdesi, cookie, token ve ham konsol verisi olmasın. (2) Frappe tarafında tek bir whitelisted metot ve dar izinli bir Support Package DocType yazın. Bu metot yalnız allowlist alanlarını kabul etsin, trace_id ile Error Log'u yalnız yetkili rol için ilişkilendirsin ve clear_old_logs desenine benzer bir saklama işi içersin. Önce RED/GREEN testiyle başlayın. (3) Headless React istemcisi yanıt başlığından trace_id'yi okusun, alan bazlı önizleme ve çıkarma sunsun, gönderimi açık onaydan sonra yapsın. Otomatik dış mesaj gönderilmesin.

Önerilen bağımlılık/sıra: support-package--contract; kernel-envelope--contract; tenant-registry--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `support-package--implementation`.

Kaynak kanıtı:

- `frappe/frappe/app.py:274` — `response.headers.update({"X-Frappe-Request-Id": trace_id})`
- `frappe/frappe/utils/error.py:83` — `trace_id=trace_id,`
- `frappe/frappe/public/js/frappe/request.js:595` — `request_data.request_id = xhr.getResponseHeader("X-Frappe-Request-Id");`
- `frappe/frappe/public/js/frappe/request.js:634` — `recipients: error_report_email,`
- `frappe/frappe/core/doctype/error_log/error_log.py:46` — `def clear_old_logs(days=30):`
- `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:108` — `...consoleLogLines,`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/, suite/ (_.py,_.js,_.ts,_.vue,*.json); arama `request_id|X-Request-Id|error_log_id|trace_id|correlation`: 44 dosya. İlgili olanlar: monitor.py, app.py, utils/error.py, error_log DocType, public/js/frappe/request.js. Suite eşleşmeleri meet recording/sheets kimlikleri; destek paketiyle ilgisiz.
- frappe/, suite/ (_.py,_.js,_.ts,_.vue,*.json); arama `(?i)support.?(package|bundle)|diagnostic|send_error_report|report_error|error_report`: Destek paketi DocType'ı veya API'si yok. İlgili olanlar: frappe request.js report_error, boot.py error_report_email, suite meet diagnostics/problemReport.ts ve consoleBuffer.ts.
- frappe/frappe (public/dist hariç); arama `report_error|send_error_report|error_report|request_id|X-Frappe-Request`: monitor.py:79 gelen X-Frappe-Request-Id değerini kabul ediyor; app.py:274 bu başlığı yanıta yazıyor; boot.py:118 error_report_email; response.py:39 report_error.
- frappe/frappe/public/js/frappe/request.js; arama `error_report_email|request_id|Request-Id|report_error`: Rapor diyaloğu ve pano/e-posta paketi 577-684 satırlarında; request_id yalnız pano yolunda.
- suite/suite/headless_provider; arama `(?i)support|diagnos|trace_id|error_log|Error Log`: Yalnız ilgisiz '_order_supported' eşleşmeleri var; destek veya hata kimliği sözleşmesi yok.
- frappe/frappe (request.js, error_log.py/json); arama `cleanup_request_opts = |delete\(|clear_old_logs|"role":`: Error Log izni yalnız System Manager; clear_old_logs 30 gün; cleanup_request_opts yalnız mask_passwords uyguluyor.

Sınır: Yalnız kurulu frappe (commit adf1fd0c) ve suite (commit bilinmiyor) kaynağı statik olarak okundu. Kod çalıştırılmadı, test yürütülmedi; functionalAcceptance not_run.; public/dist derlenmiş bundle'ları kanıt olarak kullanılmadı; kaynak JS/TS okundu.; Error Log'a hangi hataların gerçekten yazıldığı ve izleme kimliğinin (trace_id) üretimde başlıkta görünmesi çalışma zamanına bağlı; doğrulanmadı.; Desk report_error ve Suite Meet Vue/jQuery arayüzüdür; headless React sağlayıcı sözleşmesi değildir.; ERPNext/Helpdesk kurulu değil ve değerlendirilmedi. Saklama, uyumluluk ve alıcı politikası kaynakla kanıtlanamaz.

Temporal workflow: `saas-recheck-20261015t073528z-051`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### content-1 — CMS (Content Management System — içerik yönetim sistemi) ve yardım bilgi bankası.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (taslak sızmasın, doğru dil/rota) anlamlı. Ancak talimat version-15 Web Page şemasına dayanıyor; yerel ortam 17.0.0-dev. Helpdesk bilgi bankası kurulu değil. Kaynakta okuma izni ve alan düzeyi okuma izni denetlenen REST okuma ilkelleri var. Web Page şeması ise bu kesitlerde görülmedi. Suite hooks dosyasında '/api/' joker reddi tanımlı; headless içerik API'sinin bu engel listesinden nasıl geçeceği talimatta yazmıyor.

Eksik: Web Page şemasındaki published/route/dil alanlarının v17-dev karşılığı doğrulanmamış; kaynak version-15.; Helpdesk kurulu değil. Yardım bilgi bankasının Web Page ile mi yoksa ayrı bir uygulamayla mı kurulacağına karar verilmemiş.; Guest/website kullanıcısının yalnız yayımlanmış kayda erişmesini sağlayacak izin veya sorgu koşulu sözleşmesi tanımlı değil.; Suite'teki '/api/' joker reddi ve izin listesi ile headless içerik uç noktası arasındaki ilişki belirsiz.; Blog Post'a bağlı Writer dışa aktarma, kurulu olmayan blog uygulamasına bağlı; CMS kaynağı olarak sayılamaz.

Sonraki adım önerisi: native-web-page--implementation görevine şunlar eklenmeli: v17-dev Web Page alan eşlemesi (published, route, dil), Guest için yalnız yayımlanmış kayıtları döndüren yerel izin veya permission_query_conditions kuralı ve '/api/' izin listesi kararı. Helpdesk 'kurulu değil' olarak işaretlenmeli; yardım içeriği ilk aşamada Web Page üzerinden ele alınmalı.

Mevcut birincil görev: `native-web-page--implementation`. Kaynak: `frappe/frappe/api/v1.py:83`; `frappe/frappe/api/v1.py:84`; `suite/suite/hooks.py:466`; `suite/suite/hooks.py:419`; `suite/suite/writer/api/docs.py:142`; `suite/pyproject.toml:45`.

#### content-2 — SEO (Search Engine Optimization — arama motoru optimizasyonu).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (title, canonical, indekslenebilir sunucu çıktısı) somut. Ancak seçilen web mimarisi Vite/PWA ve TanStack Router; sunucu tarafı render veya prerender stratejisi seçilmemiş. Kaynakta yalnız rota kuralları ve home_page ilkelleri görülüyor. Suite tüm önekleri, istemci tarafında yönlendirilen bir SPA'ya bağlıyor; ayrıca home_page='suite'. Bu yapı herkese açık site köküyle çakışabilir. Website Settings SEO alanları bu kesitlerde yok.

Eksik: Görev eşlemesi çelişkili: değerlendirme 'external/build' diyor, birincil görev ise native-web-page--implementation.; SSR, prerender veya edge render kararı ve sahibi tanımsız; PWA SPA çıktısı tek başına kabul ölçütünü karşılamaz.; sitemap, robots, hreflang ve noindex (taslak/özel sayfa) kuralları tanımlı değil.; Herkese açık kök rota ile suite home_page/SPA rotaları arasındaki sınır belirlenmemiş.; Website Settings için v17-dev alan eşlemesi yok; kaynak version-15.

Sonraki adım önerisi: content-2 için mevcut görev kimliği korunarak tek bir render kararı yazılmalı: herkese açık sayfalar için prerender veya SSR. Bunun yanında rota başına title/canonical veri sözleşmesi ve sitemap/robots/noindex kuralları eklenmeli; home_page çakışması da karara bağlanmalı. Birincil görev eşlemesindeki çelişki giderilmeli.

Mevcut birincil görev: `native-web-page--implementation`. Kaynak: `suite/suite/hooks.py:44`; `suite/suite/hooks.py:65`; `suite/suite/hooks.py:47`.

#### content-3 — Programmatic SEO (veri/şablonla ölçekli arama odaklı sayfa üretimi).

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de kayıt başına sayfa üretimi için temel parça var. WebsiteGenerator (frappe/frappe/website/website_generator.py), yayın koşulu sağlandığında başlık alanından slug üretip `route` alanına yazar (en fazla 139 karakter, meta.route öneki eklenir). Yayın durumunu is_published_field veya website.condition_field ile denetler; update/trash sırasında Google indexing isteğini kuyruğa alır. DocType.validate, has_web_view açık olan DocType'larda `route` alanını zorunlu tutar ve şablon boilerplate'i üretir. DocumentPage renderer, route ve yayın filtresiyle belgeyi bulur; yayınlanmamış kayıt bu yoldan render edilmez. sitemap.py yalnız guest erişimine açık, yayın koşulu tanımlı ve yayınlanmış kayıtları sitemap'e ekler; robots_txt'nin engellediği ve dinamik route'ları dışarıda bırakır. Website Route Meta ise route bazında meta etiketi tutar. Benzersizlik yalnız alan düzeyinde: örneğin Web Page `route` alanı `unique: 1`. Suite (Vue frontend + Python) içinde has_web_view veya WebsiteGenerator kullanan bir DocType bulunamadı; tek SEO izi statik `www/event_rsvp.html` sayfasındaki noindex meta etiketi. Yerel pilot olan suite/headless_provider içinde public/SEO route sözleşmesi yok; Guest kullanıcıyı reddeden bir yol var.

Eksik: Programmatic SEO için kaynak DocType ve şablon/veri kümesi yok; ne Suite'te ne headless_provider'da has_web_view DocType tanımlı.; Veri kalitesi eşiği yok: zorunlu alan/minimum içerik kontrolü olmadan yayın engeli tanımlı değil. Mevcut kapı yalnız tek bir boolean yayın alanı.; DocType'lar arası route çakışması kontrolü yok. _find_matching_document_webview ilk eşleşen DocType'ı döndürüyor; benzersizlik yalnız DocType bazında unique alan bayrağına bağlı. Slug değişiminde redirect üretimi de WebsiteGenerator içinde yok.; Frappe şablonlarında (py/html) rel=canonical üretimi bulunamadı; kayıt bazında canonical URL ve noindex politikası yok.; Headless React/AntDesign frontend için route→kayıt çözümleyen, yayın/kalite kapısı uygulayan ve canonical/sitemap verisi dönen provider API sözleşmesi yok.; content-2 render/sitemap kararına bağımlılık canonical görev bağımlılıklarında yazılı değil (talimat düzeyi boşluk).; functionalAcceptance not_run: örnek veri kümesiyle benzersiz canonical rota üretimi çalıştırılarak doğrulanmadı.

Sonraki somut adım: Mevcut programmatic-seo--contract görevinin içinde en küçük adım ve sıra şöyle: (1) Tek bir pilot kaynak DocType seçilir; has_web_view, is_published_field ve unique `route` alanı tanımlanır, WebsiteGenerator yeniden kullanılır. (2) Controller validate adımına zorunlu alan/minimum içerik kontrolü eklenir; eşik sağlanmazsa yayın bayrağı reddedilir. Önce bunun için RED testi yazılır. (3) Uygulama düzeyinde DocType'lar arası route çakışma kontrolü eklenir. (4) Headless tüketim için route→kayıt çözümleyen, yalnız yayınlanmış ve kaliteli kaydı canonical URL ile döndüren tek bir salt-okunur provider endpoint'i eklenir; sitemap.py çıktısı yeniden kullanılır. React tarafı content-2 render kararından sonra bağlanır. Bu iş content-2 bağımlılığı netleştikten sonra yapılır.

Önerilen bağımlılık/sıra: programmatic-seo--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract; content-2 (render/sitemap kararı; talimatta açık bağımlılık olarak eksik). Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `programmatic-seo--implementation`.

Kaynak kanıtı:

- `frappe/frappe/website/website_generator.py:10` — `class WebsiteGenerator(Document):`
- `frappe/frappe/website/website_generator.py:39` — `self.route = self.make_route()`
- `frappe/frappe/website/website_generator.py:92` — `return self.get(condition_field) or False`
- `frappe/frappe/core/doctype/doctype/doctype.py:423` — `frappe.throw(_('Field "route" is mandatory for Web Views'), title="Missing Field")`
- `frappe/frappe/website/page_renderers/document_page.py:102` — `docname = frappe.db.get_value(doctype, filters, "name")`
- `frappe/frappe/www/sitemap.py:55` — `condition_field = meta.is_published_field or controller.website.condition_field`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe + suite tamamı); arama `class WebsiteGenerator`: Yalnız frappe/frappe/website/website_generator.py:10; Suite'te alt sınıf yok.
- suite (tamamı); arama `(?i)programmatic.?seo|canonical|noindex|meta_robots|seo`: 147 dosya eşleşti; çoğu derlenmiş asset veya alakasız alt dizgi (canonicalMediaKey, recorder vb.). Programmatic SEO uygulaması yok.
- suite (public/frontend hariç); arama `"has_web_view": 1|WebsiteGenerator|website_generators|sitemap|get_sitemap|canonical_url|robots`: Yalnız suite/suite/www/event_rsvp.html:6 noindex meta; web view DocType yok.
- frappe/frappe (py, html); arama `canonical|def validate_route_conflict|route.*already exists|"unique": 1`: rel=canonical üretimi yok; validate_route_conflict DocType adı/desk rotası içindir, kayıt slug'ı için değil.
- frappe/frappe (dist hariç); arama `def make_website_route|"fieldname": "route"|meta_tags|rel="canonical"`: route alanları (Web Page unique, Help Article, Web Form vb.) ve Website Route Meta meta_tags bulundu.
- frappe/frappe/core/doctype/doctype/doctype.py; arama `has_web_view|is_published_field|route`: has_web_view için route zorunluluğu, şablon boilerplate ve is_published_field doğrulaması bulundu.
- frappe/frappe/website; arama `condition_field|_find_matching_document_webview|get_page_info_from_web_page_with_dynamic_routes`: DocumentPage route ve yayın filtresiyle ilk eşleşen DocType'ı döndürüyor; DocType'lar arası çakışma kontrolü yok.
- suite/suite/headless_provider; arama `(?i)route|slug|sitemap|seo|publish|web_view|guest`: Yalnız api.py: Guest reddi ve iç _route planlayıcı; SEO/public route sözleşmesi yok.

Sınır: Yalnız sourceRoot altındaki frappe ve suite uygulama kaynakları okundu; komut, test veya runtime çalıştırılmadı (functionalAcceptance not_run).; suiteCommit bilinmiyor; frappe commit adf1fd0c2d6215ad4cac9976251198b2a35fbda6.; Jinja şablonlarının tamamı (templates/*.html) tek tek okunmadı; canonical araması py ve html glob'u ile sınırlıydı.; Google indexing'in gerçek çalışması, deploy edilmiş site, sitemap çıktısı ve arama motoru davranışı kaynakla kanıtlanamaz.; ERPNext/HRMS kurulu değil, değerlendirilmedi; GenUI uygulanmadı.; suite/headless_provider yerel pilot ek koddur, upstream-native değildir.

Temporal workflow: `saas-recheck-20261015t073528z-062`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### content-4 — İçerik ve yorum moderation (yayına uygunluk denetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (bekleyen yorum yayınlanmasın, karar ve gerekçe denetlenebilir olsun) somut. Ancak hangi içerik ve yorum türlerinin kapsamda olduğu belirtilmemiş. Kaynakta izin kontrolü ve doc_events ilkelleri var. Writer yorumları ise moderasyon durumu olmayan bir Yjs blob'u olarak saklanıyor ve allow_guest uç noktasından yazılıyor; bu uç nokta yalnız 'comment' izniyle korunuyor. Frappe Comment, Workflow ve Version kaynakları bu kesitlerde görülmedi.

Eksik: Kapsamdaki nesneler belirsiz: Web Page, Frappe Comment, Writer ycomments. Blog kurulu değil.; Durum modeli (pending/approved/rejected) ve yerel Workflow ile track_changes/Version yeniden kullanımı karara bağlanmamış.; Moderatör rolü ve izin seviyesi tanımlı değil.; Writer Yjs yorumlarında sunucu tarafında yayın kapısı yok; ön moderasyon yapılıp yapılmayacağı belirsiz.; Gerekçe kaydının nerede tutulacağı (Version mı, ayrı DocType mı) belirtilmemiş.

Sonraki adım önerisi: moderation-case--implementation için kapsam önce Web Page ve Frappe Comment ile sınırlandırılmalı. Durum alanı, Moderator rolü ve karar gerekçesi için yerel Workflow ile track_changes yeniden kullanılmalı. Writer Yjs yorumları açıkça kapsam dışı ya da ayrı bir karar olarak işaretlenmeli.

Mevcut birincil görev: `moderation-case--implementation`. Kaynak: `suite/suite/writer/doctype/writer_document/writer_document.py:112`; `suite/suite/writer/api/docs.py:121`; `suite/suite/writer/api/docs.py:124`; `frappe/frappe/permissions.py:82`; `suite/suite/hooks.py:224`.

#### content-5 — Changelog (değişiklik günlüğü) ve müşteri panelinde “Neler yeni?”.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de (v17 dev, commit adf1fd0c) uygulama düzeyinde bir changelog mekanizması var. frappe/frappe/utils/change_log.py içindeki get_change_log, kurulu her uygulamanın <app>/change_log/vN/vX_Y_Z.md markdown dosyalarını okuyor. Bunları kullanıcının User.last_known_versions alanındaki sürümle (gizli, salt okunur Text alanı) karşılaştırıp aradaki sürümleri döndürüyor; böylece kullanıcı başına sürüme dayalı bir görüldü durumu da sağlıyor. sessions.py içindeki get bu sonucu bootinfo.change_log içine koyuyor. desk.js içindeki show_change_log içeriği Desk'te bir diyalogda gösteriyor; diyalog kapanınca whitelist'teki update_last_known_versions çağrılıyor. İlgili iki parça daha var: (1) check_for_update ve show_update_popup, GitHub sürüm bildirimini yalnız System Manager rolündekilere gösteriyor; (2) Navbar Settings'teki announcement_widget, tüm Desk kullanıcılarına tek bir global duyuru bandı gösteriyor ve kapatma durumunu yalnız tarayıcının localStorage'ında tutuyor. Genel okundu primitifi olarak Notification Log (read ve for_user alanları) var. Suite'in Vue frontend'inde ve backend'inde changelog, duyuru veya Neler yeni kodu bulunmadı. Yerel pilot suite/headless_provider/api.py yalnız session, metadata ve şema düzenleme uçlarını açıyor; changelog sözleşmesi içermiyor.

Eksik: Kayıt düzeyinde bir duyuru (Release Note) DocType'ı yok: taslak/yayınlandı durumu, yayın tarihi, hedef kitle (rol/tenant/plan) ve kayıt bazlı izinle kısıtlanan duyuru alanları bulunmuyor. Mevcut changelog, kod deposundaki statik markdown dosyalarından geliyor; yönetici içerik yazamıyor ve kitle hedefleyemiyor.; Kabul ölçütündeki 'taslak ve kısıtlı duyuru gizli kalsın' davranışı için sunucu tarafında bir filtre yok. announcement_widget tek ve global; hedefleme yapmıyor, kapatma durumunu da yalnız istemcide tutuyor.; Duyuru başına okundu kaydı yok. last_known_versions yalnız kullanıcı başına uygulama sürümlerini tutuyor.; Headless React/AntD müşteri paneli için Neler yeni okuma/okundu API sözleşmesi yok. Changelog yalnız Desk bootinfo'su ve jQuery diyaloğu üzerinden sunuluyor; headless_provider bunu açmıyor.; Suite hooks.py DENIED_WILDCARD_PATHS içinde /api/ yolunu engelliyor. Yeni bir okuma ucunun izinli yol (allowlist) listesine eklenmesi gerekiyor; bu kuralın nasıl uygulandığı ise bu incelemede okunmadı.; Tenant ve plan ile hedefleme, kernel/audit/outbox zarflarıyla entegrasyon kaynakta yok.

Sonraki somut adım: Sıra mevcut görevlerle aynı. (1) release-note--contract: Bir Release Note DocType sözleşmesi yazılır. Alanlar: title, body, status (Draft/Published), published_on, audience_roles (Table MultiSelect veya Has Role) ve isteğe bağlı tenant/plan. Okundu durumu için duyuru başına ayrı bir kayıt (Release Note Read) ya da Notification Log yeniden kullanılır. Upstream app changelog'u (change_log.py) yalnız geliştirici sürüm notu olarak kalır. (2) release-note--schema: DocType ve permission rules eklenir; get_list filtresi yalnız Published, yayın tarihi gelmiş ve rol kesişimi olan kayıtları döndürür. (3) release-note--implementation: Bir okuma ucu (liste ve mark_read) eklenir ve Suite hooks.py izinli yol listesine yazılır. Önce taslak ve kısıtlı duyurunun gizli kaldığını gösteren başarısız (RED) bir regresyon testi yazılır, sonra GREEN. React paneli bu provider sözleşmesini tüketir. functionalAcceptance: not_run.

Önerilen bağımlılık/sıra: release-note--contract; release-note--schema; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `release-note--implementation`.

Kaynak kanıtı:

- `frappe/frappe/utils/change_log.py:64` — `change_log_folder = os.path.join(frappe.get_app_path(app), "change_log")`
- `frappe/frappe/utils/change_log.py:26` — `json.loads(frappe.db.get_value("User", user, "last_known_versions") or "{}")`
- `frappe/frappe/sessions.py:190` — `bootinfo["change_log"] = get_change_log()`
- `frappe/frappe/public/js/frappe/desk.js:529` — `method: "frappe.utils.change_log.update_last_known_versions",`
- `frappe/frappe/utils/change_log.py:366` — `system_managers = [user for user in user_list if "System Manager" in frappe.get_roles(user)]`
- `suite/suite/hooks.py:466` — `"/api/",`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (tüm source root; *.po/pot/csv/mo/min.js/map hariç); arama `(?i)changelog|release[ _-]?note|what'?s[ _-]?new|announcement`: 39 dosya. Frappe'de change_log.py, change_log/v12-v13 markdown dosyaları, navbar_settings, desk.js ve toolbar eşleşti. Suite'te yalnız alakasız eşleşmeler çıktı (gemoji asset, exchange logger, meet CONTEXT.md).
- frappe/frappe (*.py, *.js, *.json, *.html); arama `(?i)change_log|changelog|show_whats_new|last_known_versions|announcement`: Akış izlendi: change_log.py, sessions.py bootinfo, hooks.py scheduler (check_for_update) ve cache, desk.bundle import.
- frappe/frappe/public/js/frappe; arama `(?i)change_log|announcement_widget|whats_new|update_last_known_versions`: desk.js show_change_log diyaloğu; toolbar.js ve navbar.html'de global announcement_widget, localStorage ile kapatma.
- frappe/frappe/core/doctype/navbar_settings; arama `(?i)announcement`: announcement_widget (TextEditor), color ve dismissible alanları; hedef kitle veya taslak alanı yok.
- suite (public/frontend hariç); arama `(?i)changelog|change_log|release[ _-]?note|what'?s[ _-]?new|announcement|last_known_versions|broadcast`: Duyuru veya changelog uygulaması yok; yalnız sheets collab broadcast ve exchange logger eşleşti.
- suite/suite/headless_provider/api.py; arama `(?i)whitelist|def |change_log|notification|release|announce`: Yalnız session, metadata, create_field, preview_edit ve apply_edit uçları var; changelog/duyuru ucu yok.
- suite/suite/hooks.py; arama `"/api/"|website_route_rules|block|deny|allow`: DENIED_WILDCARD_PATHS içinde /api/ var; allowlist yalnız writer, slides, sheets ve dav yollarını içeriyor.
- frappe/frappe/core/doctype/user/user.json; arama `last_known_versions`: Text, hidden ve read_only alan olarak tanımlı.

Sınır: Yalnız kaynak kod okundu; testler okunmadı veya çalıştırılmadı. Runtime functionalAcceptance: not_run.; DENIED_WILDCARD_PATHS kuralının nasıl uygulandığı (hangi middleware) okunmadı.; Derlenmiş public/dist bundle'ları ve suite/public/frontend asset'leri davranış kanıtı sayılmadı.; ERPNext/HRMS ve blog uygulaması kurulu değil; değerlendirilmedi.; Suite commit bilinmiyor; headless_provider yerel pilot koddur, upstream-native değildir.; Bu değerlendirme kod varlığını gösterir; Desk diyaloğunun gerçek kullanıcıda görünmesi veya SaaS dağıtımı doğrulanmadı.

Temporal workflow: `saas-recheck-20261015t073528z-063`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### content-6 — Taslak, önizleme, yayın zamanı, sürüm geçmişi ve geri alma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütleri net: zamanı gelmeyen içerik yayımlanmasın, geri alma yeni denetim kaydı oluştursun. Suite Writer'da yazma izniyle sürüm oluşturma ve sürüm listeleme var. Ancak geri yükleme uç noktası, yayın zamanlaması ve önizleme görünmüyor. Belge silinince sürümler de siliniyor. Writer (Drive tabanlı belge) ile CMS Web Page arasındaki yeniden kullanım sınırı talimatta ayrılmamış.

Eksik: Yeniden kullanım sınırı belirsiz: Web Page yayın alanları ve Frappe Version mı, yoksa Writer Version mı kullanılacak?; Geri yükleme eylemi kaynakta görünmüyor; acceptance'taki 'yeni denetim kaydı' sözleşmesi tanımsız.; Writer belgesi silinince sürüm geçmişi de siliniyor; bu, denetim beklentisiyle çelişebilir.; Headless önizleme için yetki ve token sınırı tanımlanmamış; Web Page alanları v17'de doğrulanmamış.

Sonraki adım önerisi: native-web-page--implementation altında v17 Web Page yayın alanlarını ve Version izini doğrulayın. Geri yüklemeyi seçilen sürümden yeni bir kayıt yaratan, write izni kontrollü tek bir whitelisted yöntem olarak tanımlayın. Writer Version'ın kapsam dışı mı olduğunu (ya da yalnız belge editörü için mi kullanılacağını) açıkça yazın.

Mevcut birincil görev: `native-web-page--implementation`. Kaynak: `suite/suite/writer/doctype/writer_document/writer_document.py:40`; `suite/suite/writer/api/general.py:124`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`; `suite/suite/hooks.py:419`.

#### content-7 — Sayfa adresi, yönlendirme, site haritası ve indeksleme kontrolleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Frappe hook düzeyinde yönlendirme (redirect) ve rota kuralı primitifleri kaynakta kullanılıyor. Ancak Suite örnekleri 307 kodu ve SPA'ya yönlendirilen rotalar; 301, kaldırılmış içerik yanıtı, sitemap ve robots kaynak parçasında yok. Talimat, rotaların bağımsız frontend'e ait olduğunu söylüyor ama Frappe portal rotalarıyla çakışma ve sahiplik sınırını tanımlamıyor.

Eksik: Rota sahipliği belirsiz: Vite/TanStack Router frontend mi, Frappe portal mı? Suite home_page ve /writer gibi önekler çakışabilir.; 301 yanıtı ve kaldırılmış içerik için 404/410 davranışı tanımsız; hook örneği 307.; Sitemap veri kaynağı tanımsız: yalnız yayımlanmış, Guest'in okuyabildiği ve canonical adresler; Guest erişimi /api/ wildcard reddine takılabilir.; Website Settings kaynağı v15; v17 alanları doğrulanmamış.

Sonraki adım önerisi: native-web-page--implementation notuna bir rota sahipliği tablosu ekleyin: hangi önek frontend'e, hangisi Frappe'ye ait. Kalıcı yönlendirmeler website_redirects ile 301 olarak ayrılsın. Sitemap için yayımlanmış ve canonical adresleri dönen tek bir okuma sözleşmesi ve Suite izinli yol etkisi yazılsın.

Mevcut birincil görev: `native-web-page--implementation`. Kaynak: `suite/suite/hooks.py:47`; `suite/suite/hooks.py:68`; `suite/suite/hooks.py:72`; `suite/suite/hooks.py:65`.

#### content-8 — Moderasyon kuyruğu, gerekçe, itiraz ve ihlal geçmişi.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Moderasyon alanına özgü bir uygulama yok. Ne frappe'de ne suite'te (yerel pilot suite/suite/headless_provider dahil) moderasyon kuyruğu, gerekçe, itiraz ya da ihlal geçmişi için DocType, controller, API veya hook bulundu. Yalnızca upstream Frappe'nin genel ve somut primitifleri var: (1) Workflow motoru, frappe/frappe/model/workflow.py içinde. get_transitions geçişleri mevcut duruma ve kullanıcı rolüne göre süzüyor. apply_workflow durum alanını güncelliyor ve has_approval_access ile kendi kendini onaylamayı engelliyor. (2) Submit sonrası değişmezlik: validate_update_after_submit ve _validate_update_after_submit, allow_on_submit olmayan alanların submit sonrası değişmesini engelliyor. (3) Document.save_version: track_changes açık DocType'larda değişiklik geçmişini Version kaydı olarak tutuyor. Suite'teki Screened Email Address (Spam/Reject/Accepted) ve Spam Check Log, posta göndericisi süzme ve spam işlevidir; içerik moderasyonu değildir. Gerekçe, itiraz ve ihlal geçmişi içermez.

Eksik: Moderasyon vakası DocType'ı yok. İçerik referansı için Dynamic Link, tenant/kapsam, durum ve zorunlu gerekçe alanı tanımlı değil.; Kuyrukta → reddedildi → itirazda → kesinleşti durum makinesi için bir Workflow tanımı ve geçiş rolleri yok.; Moderatör ile itiraz inceleyicisi rol ayrımı ve DocPerm eşlemesi yok.; Önceki karara bağlı itiraz kaydı yok.; Kullanıcı ya da içerik başına değişmez ihlal geçmişi ve bunu sorgulayan bir API yok.; Hangi içerik türlerinin kuyruğa girdiğini belirleyen hooks/doc_events entegrasyonu yok.; Headless provider tarafında moderasyon sözleşmesi ve API'si yok; outbox ve audit-envelope bağlantısı da yok.; Moderasyon arayüzü yok: ne Suite'in Vue frontend'inde ne de React/Ant Design hedef arayüzünde.

Sonraki somut adım: En küçük adım ve sıra şöyle: (1) moderation-case--contract: durumları, gerekçe zorunluluğunu, itiraz bağını ve tenant kapsamını içeren sözleşme notu. (2) moderation-case--schema: submittable bir Moderation Case DocType'ı. İçinde reference_doctype/reference_name (Dynamic Link), reason (zorunlu), decision, appeal_of (önceki vakaya Link) ve tenant alanı bulunsun; track_changes açık olsun. Karar submit edildiğinde validate_update_after_submit ile değişmez hale gelsin. İtiraz, kararı değiştirmesin; önceki vakaya bağlı yeni bir vaka olarak açılsın. (3) Native Workflow tanımı: moderatör ve itiraz inceleyicisi ayrı Role'ler olsun, geçişler bu rollere bağlansın. (4) Tek dar davranış için RED/GREEN testi: reddedilen içeriğe gerekçeli itiraz açılabilsin ve submit edilmiş önceki karar değiştirilemesin. Headless provider uç noktaları ve outbox/audit bağlantısı bu adımlardan sonra, ignore_permissions kullanmadan eklensin.

Önerilen bağımlılık/sıra: moderation-case--contract; moderation-case--schema; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `moderation-case--implementation`.

Kaynak kanıtı:

- `frappe/frappe/model/workflow.py:72` — `if transition.state == current_state and transition.allowed in roles:`
- `frappe/frappe/model/workflow.py:136` — `if not has_approval_access(user, doc, transition):`
- `frappe/frappe/model/document.py:1485` — `def validate_update_after_submit(self):`
- `frappe/frappe/model/base_document.py:1350` — `if df and not df.allow_on_submit and not df.is_virtual and (self.get(key) or db_value):`
- `frappe/frappe/model/document.py:2038` — `def save_version(self):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (tüm sourceRoot, *.{py,json,js,ts,vue,tsx}); arama `(?i)moderat|appeal|violation|takedown|flagged|report_abuse|content_review`: 59 dosya eşleşti. Eşleşmeler veritabanı constraint violation, mail flagged bayrakları ve sidebar ile ilgili. Moderasyon DocType'ı ya da API'si yok.
- frappe/ ve suite/ (*.{py,json,ts,vue}); arama `(?i)moderat|appeal|abuse_report|report_content|content_violation|strike|takedown`: Yalnızca alakasız eşleşmeler çıktı: strikethrough biçimlendirmesi, şifre açıklaması ve get_report_content. Moderasyon kodu yok.
- suite/suite (*.{py,json}); arama `(?i)\b(spam|junk|report_spam|mark_as_spam|block_sender|blocklist)\b`: Mail spam ve gönderici süzme işlevleri bulundu (Screened Email Address, Spam Check Log, spamd). İtiraz ve ihlal geçmişi içermiyor.
- frappe/frappe; arama `def (validate_update_after_submit|check_if_latest|_validate_update_after_submit)|class Workflow\(|def get_transitions|def apply_workflow`: Workflow motoru ve submit sonrası değişmezlik primitifleri bulundu ve okundu.
- frappe/frappe/model/document.py; arama `track_changes|def save_version|get_diff`: save_version, track_changes ile Version geçmişini tutuyor.
- suite/suite/headless_provider/**/*.py; arama `glob`: Yalnızca **init**.py, api.py ve local_fixture.py var. Moderasyon desenleri bu dizinde de eşleşmedi (yukarıdaki suite araması bu dizini kapsıyor).

Sınır: Kod hiç çalıştırılmadı; testler yalnızca okundu. functionalAcceptance: not_run.; Kapsam yalnızca sourceRoot altındaki frappe ve suite kaynaklarıdır. Site config ve veritabanındaki Workflow, Custom DocType ya da Server Script kayıtları görülmedi.; ERPNext/HRMS kurulu değil ve değerlendirilmedi.; Primitifler genel Frappe yetenekleridir; moderasyon gereksinimini karşıladıkları kanıtlanmamıştır.; suiteCommit bilinmiyor; headless_provider yerel pilot ve eklemeli bir koddur.

Temporal workflow: `saas-recheck-20261015t073528z-064`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

### Raporlama, ürün ve pazarlama ölçümü

#### analytics-1 — GTM (Google Tag Manager — Google etiket yöneticisi) bağlantısı.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Yerel v17-dev Frappe kaynağında GTM'ye özel alan, yükleyici veya API yok. İlgili, upstream'e ait (native) yapı taşları yalnız Frappe'nin sunucuda ürettiği sayfalarda çalışıyor. (1) Website Settings şemasında google_analytics_id, google_analytics_anonymize_ip ve serbest head_html alanları var. head_html, templates/base.html içinden includes/head.html aracılığıyla Frappe web sayfalarına kaçışsız basılıyor. Bir GTM snippet'i bu alana elle yapıştırılabilir, ama izin kontrolü yapılmıyor. (2) www/website_script.py ve website_script.js, GA kimliğini Website Settings'ten ya da site config'ten okuyor. Ardından eski Universal Analytics analytics.js dosyasını yükleyip ga('send','pageview') çağırıyor. Bu yalnız developer_mode kapalıyken oluyor ve izin kontrolü yok. www/desk.py ile desk.html, frappe.conf'taki GA kimliğiyle aynı eski GA snippet'ini Desk'e ekliyor. (3) Suite'in Vue/Vite SPA kabuğu (suite/suite/www/suite.html) bağımsız bir HTML. base.html'i genişletmiyor ve ne head_html ne de website_script içeriyor. Bu yüzden hosted GA/head_html ayarı Suite SPA'ya uygulanmıyor. Suite router'ındaki router.afterEach yalnız uygulama runtime'larına aktarım yapıyor, analitik üretmiyor. Yerel pilot ek kod olan suite/headless_provider (api.py, local_fixture.py) yalnız DocType alan etiketi, açıklama ve sıra sözleşmesini kapsıyor. Analitik, GTM veya izin sözleşmesi içermiyor.

Eksik: GTM konteyner kimliği için ayar ya da provider sözleşmesi yok. Her iki kökte googletagmanager, gtm, dataLayer ve gtag için yapılan aramada davranış eşleşmesi çıkmadı; yalnız yarn.lock hash'lerine ve derlenmiş/binary gürültüye rastlandı.; Consent Mode ve kategori bazlı izin sırası yok. analytics-6 izin kararına bağlanan bir yükleme kapısı da yok.; Headless React/TanStack Router kabuğunda GTM yükleyicisi yok. Rota geçişine bağlı, tek seferlik page_view sözleşmesi ve tekrarı önleyici yapı da yok.; GTM için CSP/nonce kuralı yok. Mevcut head_html ve GA enjeksiyonları ham inline script.; Tauri2 ve WXT/MV3 kabukları için GTM'yi dışarıda tutma ya da alternatif kararı kaynakta yok.; Native GA yolu kullanımdan kalkmış Universal Analytics analytics.js'e bağlı. Bu yol hosted Frappe sayfalarıyla sınırlı ve Suite SPA ile headless kabuğa otomatik uygulanmıyor.

Sonraki somut adım: Sıra: 1) analytics-consent--contract içinde provider tarafını tanımla. Frappe headless kabuğa yalnız tenant'a ait GTM container ID'sini ve izin politikası meta verisini salt okunur verir. Script veya head_html enjekte etmez. Hosted Website Settings içindeki google_analytics_id ve head_html alanları 'hosted-only, headless'a uygulanmaz' diye etiketlenir. 2) analytics-consent--implementation görevinde ilk dar davranış olarak yalnız web/PWA (Vite) kabuğunu hedefle. GTM, Consent Mode varsayılanı 'denied' iken ve yalnız analytics-6 izni verildikten sonra yüklenir. page_view, TanStack Router'ın tek geçiş olayından ve rota başına bir kez üretilir. Önce RED test yaz, sonra GREEN. 3) CSP/nonce kuralını aynı adımda ekle. 4) Tauri2 ve WXT/MV3 için GTM'yi dışarıda tut ya da ayrı karar notu yaz. Mevcut task ID'leri ve bağımlılıklar korunur; yeni görev kaydı açılmaz.

Önerilen bağımlılık/sıra: analytics-consent--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `analytics-consent--implementation`.

Kaynak kanıtı:

- `frappe/frappe/website/doctype/website_settings/website_settings.json:261` — `"fieldname": "head_html",`
- `frappe/frappe/templates/includes/head.html:2` — `{{ head_html or "" }}`
- `frappe/frappe/www/website_script.py:34` — `context["google_analytics_id"] = get_setting("google_analytics_id")`
- `frappe/frappe/www/website_script.js:15` — `ga('send', 'pageview');`
- `suite/suite/www/suite.html:37` — `<script type="module" crossorigin src="/assets/suite/frontend/assets/index-BmMNnzY_.js"></script>`
- `suite/frontend/src/router/index.ts:233` — `if (appId) loadedAppRuntimes.get(appId)?.afterEach?.(to)`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (sourceRoot tamamı); arama `(?i)google_tag_manager|gtm|googletagmanager|tag_manager`: Davranış eşleşmesi yok. Sonuçlar yalnız yarn.lock integrity hash'leri, base64 test verisi, svg ve derlenmiş/minified dosyalardaki rastlantısal 'gtm' dizgileri.
- frappe/ ve suite/ (map/lock hariç); arama `(?i)google_analytics|gtag|dataLayer|analytics_id|enable_google_indexing`: Website Settings google_analytics_id/anonymize_ip alanları; website_script.py/js'deki eski GA analytics.js; desk.py/desk.html ve app_analytics/google_analytics.html; heap_analytics.html bulundu. Suite kaynağında gtag ve dataLayer kullanımı yok.
- frappe/ ve suite/ (map/lock/po/csv/svg hariç); arama `(?i)posthog|telemetry|cookie_consent|consent|page_view|pageview`: Frappe ürün telemetrisi (utils/telemetry, frappe/ui/src/telemetry, public/js/telemetry), Web Page View DocType'ı, Desk pageview.js ve setup_wizard izinleri bulundu. Suite'te yalnız meet/e2e eşleşmeleri çıktı. GTM'ye bağlı bir consent yapısı yok.
- suite/ (public/frontend ve noise-suppression derlemeleri hariç); arama `(?i)website_script|head_html|analytics|tracking|tag_manager`: Suite kaynağında analitik veya GTM entegrasyonu yok. Yalnız yarn.lock'ta @firebase/analytics ve workbox-google-analytics geçişli bağımlılıkları var; bunlar davranış kanıtı değil.
- suite/suite/headless_provider; arama `(?i)analytic|gtm|tag|consent|script|csp`: Yalnız DocType alan açıklama/etiket düzenleme sözleşmesi bulundu; analitik veya GTM yok.
- frappe/frappe/templates; arama `head\.html|website_script\.js`: head.html yalnız templates/base.html:24'te dahil ediliyor. Suite SPA kabuğu suite.html base.html'i kullanmıyor.
- suite/frontend/src; arama `(?i)afterEach|gtag|dataLayer|analytics`: router/index.ts:223 router.afterEach yalnız app runtime afterEach'ine aktarıyor. Analitik veya gtag çağrısı yok.

Sınır: Yalnız kaynak koda statik bakıldı. functionalAcceptance=not_run; komut ya da test çalıştırılmadı, ağ kullanılmadı.; Site config'ler ve veritabanı yok; head_html'e bir tenant'ta GTM snippet'i konup konmadığı bilinemez.; Suite commit bilinmiyor. suite.html derlenmiş bir çıktı, bu yüzden kaynak index.html ayrıca incelenmedi.; frappe/ui/src/telemetry ve utils/telemetry Frappe ürün telemetrisi olarak grep ile görüldü, ayrıntılı okunmadı. GTM ile ilgisi olmadığı yalnız arama sonuçlarına dayanıyor.; Headless React/TanStack, Tauri2 ve WXT kabukları bu kaynakta yok. Onlar için sonuç yalnız Frappe provider sözleşmesinin yokluğunu gösteriyor.; ERPNext/HRMS kurulu değil ve değerlendirilmedi.

Temporal workflow: `saas-recheck-20261015t073528z-025`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### analytics-2 — Google Analytics ve Yandex Metrica adaptörleri.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de yalnız Google Analytics için eski, sunucuda şablonla üretilen bir ilkel var. Website Settings DocType'ında google_analytics_id ve google_analytics_anonymize_ip alanları bulunuyor. www/website_script.py bu değerleri Website Settings'ten veya site config'ten okuyor; developer_mode açıkken bunları bağlama eklemiyor. www/website_script.js, web sitesi sayfalarına legacy analytics.js (ga('create'), isteğe bağlı anonymizeIp, ga('send','pageview')) enjekte ediyor. Desk tarafında www/desk.py yalnız frappe.conf'tan okuyor; desk.html, templates/includes/app_analytics/google_analytics.html şablonunu ekliyor. Bu şablon her mousedown olayında data-doctype değerini, yoksa tıklanan öğenin innerText/textContent/title metnini ve route'u GA'ya olay olarak gönderiyor; bu tasarım PII/tenant verisi sızıntısı riski taşıyor. Ayrıca web_page_view'e fingerprint tabanlı sunucu içi görüntüleme kaydı var; bu dış sağlayıcı adaptörü değil. suite/headless_provider (yerel pilot, eklemeli kod) içinde analitik/telemetri/consent sözleşmesi yok. Suite'in Vue frontend'inde GA/Metrica/consent kodu yok. yarn.lock'taki workbox-google-analytics ve @firebase/analytics yalnız bağımlılık kayıtları; frontend kaynağında kullanılmıyor.

Eksik: Yandex Metrica adaptörü yok: 'yandex' eşleşmeleri yalnız Yandex.Mail e-posta ön ayarı; 'metrika|metrica' hiç eşleşmedi.; Sağlayıcıdan bağımsız adaptör arayüzü (track/identify/consent/page) yok; GA, sabit Jinja şablonu olarak gömülü.; Consent/onay kapısı yok: GA, ID tanımlıysa koşulsuz yükleniyor. Web tarafında yalnız view tracking için doNotTrack kontrolü var; GA için yok.; PII ve tenant verisi için yasak alan listesi, hash'leme ya da alan eşleme yok. Desk'teki GA şablonu innerText ve route'u filtrelemeden gönderiyor.; analytics-4 ortak olay şeması ile sağlayıcı alan eşlemesi yok.; React/AntDesign headless istemcisi için Frappe provider sözleşmesi yok: tenant bazlı sağlayıcı yapılandırması ve izin durumu sunan bir API yok.; Mevcut GA kodu legacy analytics.js/UA ga() API'sini kullanıyor; GA4 gtag ve Consent Mode yok (sağlayıcı tarafındaki geçerliliğine kaynak koddan bakılarak karar verilemez).; Webvisor ya da oturum kaydının varsayılan olarak kapalı olacağı kuralı yok.

Sonraki somut adım: Önerilen sıra: (1) analytics-consent--contract kapsamında sağlayıcıdan bağımsız adaptör sözleşmesi tanımlanmalı: track/page/consent, analytics-4 olay şeması, izinli alan listesi ve tenant_id/user_id hash kuralı. Webvisor/oturum kaydı varsayılan olarak kapalı olmalı. (2) Mevcut upstream GA şablonları headless/SaaS profilinde devre dışı tutulmalı; özellikle desk.html'deki mousedown innerText olayı. Bunun için upstream kodu değiştirmek yerine site config'te google_analytics_id tanımlanmamalı. (3) analytics-consent--implementation görevinde ilk dar davranış React tarafında yapılmalı: consent yokken hiçbir sağlayıcı script'inin yüklenmediğini ve ağ isteği gitmediğini gösteren, önce RED sonra GREEN kanıtlı bir test. (4) Ardından GA4 adaptörü, izinli tek örnek olay ve PII filtresiyle eklenmeli. (5) Yandex Metrica adaptörü, KVKK yurt dışı aktarım kararı ve karar sahibi netleşene kadar feature flag ile kapalı kalmalı. Frappe tarafında gerekirse yalnız tenant bazlı sağlayıcı ID'si ve izin durumunu döndüren dar bir provider endpoint'i eklenmeli; GenUI uygulanmamalı.

Önerilen bağımlılık/sıra: analytics-consent--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `analytics-consent--implementation`.

Kaynak kanıtı:

- `frappe/frappe/website/doctype/website_settings/website_settings.json:220` — `"fieldname": "google_analytics_id",`
- `frappe/frappe/www/website_script.py:34` — `context["google_analytics_id"] = get_setting("google_analytics_id")`
- `frappe/frappe/www/website_script.js:15` — `ga('send', 'pageview');`
- `frappe/frappe/www/desk.py:88` — `"google_analytics_id": frappe.conf.get("google_analytics_id"),`
- `frappe/frappe/www/desk.html:94` — `{% include "templates/includes/app_analytics/google_analytics.html" %}`
- `frappe/frappe/templates/includes/app_analytics/google_analytics.html:22` — `ga('send', 'event', category, label);`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/ ve suite/ (tüm sourceRoot); arama `(?i)google_analytics|gtag|googletagmanager|metrika|metrica|yandex|ym\(`: 128 dosya eşleşti. Gerçek GA uygulaması website_settings, www/website_script._, www/desk._ ve templates/includes/app_analytics içinde. 'yandex' yalnız email_account (Yandex.Mail) içinde. Diğer eşleşmeler locale, dist/assets bundle ve yarn.lock'tan geliyor.
- frappe/ ve suite/ (locale, dist, assets hariç); arama `(?i)google_analytics|gtag|metrika|yandex|anonymize_ip|analytics`: Yandex Metrica yok. GA alanları ve şablonları bulundu. Website Analytics raporu sunucu içi bir rapor. Suite'te yalnız yarn.lock bağımlılıkları (workbox-google-analytics, @firebase/analytics) çıktı.
- suite/ (public, locale, dist, assets hariç); arama `(?i)analytics|metrika|metrica|gtag|consent|track_event|trackEvent|posthog|plausible|matomo|umami`: Ürün analitiği adaptörü veya consent kapısı yok. 'consent' yalnız Meet caption e2e test korpusu manifestinde geçiyor.
- suite/suite/headless_provider; arama `(?i)analytic|telemetry|track|metric|consent`: Eşleşme yok. Yerel pilot headless provider'da analitik sözleşmesi yok.
- suite/frontend; arama `googleAnalytics|workbox-google-analytics|offlineGoogleAnalytics`: Eşleşme yok. Workbox GA modülü frontend kaynağında kullanılmıyor.
- frappe/frappe/www; arama `google_analytics|app_analytics|gtag`: Eşleşmeler website_script.py:34-35, website_script.js:4-12, desk.py:88-89 ve desk.html:94'te. gtag/GA4 yok.

Sınır: Yalnız yerel kaynak anlık görüntüsü incelendi. Site config ve veritabanı yok; GA ID'sinin gerçekte tanımlı olup olmadığı bilinmiyor.; functionalAcceptance: not_run. Hiçbir test veya komut çalıştırılmadı; tarayıcıda ağ davranışı doğrulanmadı.; dist/assets/locale altındaki derlenmiş bundle ve çeviri eşleşmeleri davranış kanıtı sayılmadı.; Legacy analytics.js'in Google tarafında hâlâ veri kabul edip etmediği bir dış servis durumu; kaynak koddan kanıtlanamaz.; KVKK uyumu, veri aktarım kararı ve production davranışı kaynak koddan kanıtlanamaz.; ERPNext/HRMS kurulu değil ve değerlendirilmedi. suite/headless_provider yerel pilot koddur; upstream'den ayrı tutuldu.

Temporal workflow: `saas-recheck-20261015t073528z-026`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### analytics-3 — UTM (Urchin Tracking Module — kampanya kaynağı etiketleme sistemi) kod yönetimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Notta 'ortak kampanya kod yönetimi saptanmadı' deniyor; URL üretici ve isimlendirme açısından doğru. Fakat yerel kaynakta UTM'e yakın ilkel parçalar var. Web Page View tabanlı Website Analytics raporu source/campaign/medium üzerinden gruplama yapabiliyor. Website Route Redirect sorgu parametrelerini hedef URL'ye taşıyabiliyor. Talimat bu ilkel parçaları anmıyor ve headless yakalama ile hosted kayıt arasındaki ayrımı yapmıyor.

Eksik: Web Page View'daki source/campaign/medium alanlarının yeniden kullanılıp kullanılmayacağına ya da yalnız hosted sayfalarla sınırlı kalacağına dair bir karar yok.; Headless SPA'da UTM'in yakalanma, saklanma ve atfedilme kuralı tanımsız (ilk dokunuş mu, son dokunuş mu; süre).; Zorunlu alanlar, izinli değer sözlüğü ve büyük/küçük harf normalizasyonu tanımsız.; Kampanya kaydının hangi DocType'ta tutulacağı ve izin rolleri belirsiz.

Sonraki adım önerisi: utm-definition--implementation görevine şunlar eklenmeli: Web Page View alanları ve forward_query_parameters'ın headless akıştaki rolü; asgari UTM sözlüğü; normalizasyon kuralı. Kampanya kaydı için yeni ORM yazılmamalı, standart DocType ve izinler kullanılmalı.

Mevcut birincil görev: `utm-definition--implementation`. Kaynak: `frappe/frappe/website/report/website_analytics/website_analytics.js:39`; `frappe/frappe/website/report/website_analytics/website_analytics.js:40`; `frappe/frappe/website/doctype/website_route_redirect/website_route_redirect.json:41`.

#### analytics-4 — Analitik olay kataloğu, dönüşüm hedefleri ve kampanya adlandırma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: şema dışı olay reddedilir, dönüşüm mükerrersiz işlenir. Kataloğun saklanması için Frappe'nin izinli DocType oluşturma ve izin kontrolü ilkel parçaları mevcut. Ancak olay şeması doğrulaması ve tekilleştirme kaynakta yok. Reddin nerede yapılacağı (istemci, sunucu ya da sağlayıcı) belirsiz.

Eksik: Şema doğrulamasının yeri ve otoritesi tanımsız; istemci tarafı kontrol güvenlik sınırı sayılmamalı.; Olay sürümleme ve geriye uyumluluk kuralı yok.; Dönüşüm için idempotency anahtarı tanımlanmamış.; Katalog GenUI ve query-action kayıtlarından ayrı tutulmalı; bu ayrım talimatta yazılı değil.

Sonraki adım önerisi: analytics-event-spec--implementation görevinde katalog sürümlü bir DocType olarak native izinlerle tanımlanmalı. Doğrulama ve idempotency sunucu tarafında, tek bir uç noktada yapılmalı. GenUI ve query-action kayıtlarıyla birleştirilmemesi açıkça yazılmalı.

Mevcut birincil görev: `analytics-event-spec--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/permissions.py:82`.

#### analytics-5 — Kullanıcı etkinleşmesi, özellik kullanımı, elde tutma ve dönüşüm akışları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü olay ile zaman penceresi eşleşmesine dayanıyor; anlamlı. Yerel Website Analytics raporu yalnız sayfa görüntüleme ve tekil ziyaretçi sayısı veriyor, en fazla 250 satır dönüyor ve System Manager ile Website Manager rollerine kapalı. Aktivasyon, kohort ve retention hesabı kaynakta yok.

Eksik: Aktivasyon olayı ve retention penceresi (D1/D7/D30) somut tanımlanmamış.; Hesaplamanın Frappe raporunda mı yoksa harici analitik araçta mı yapılacağına dair veri deposu kararı yok.; Tenant izolasyonu ve rapor rol eşlemesi yazılmamış; mevcut rapor tenant'a duyarlı değil.; Frappe Reports kaynağı sürümsüz dokümana bağlanmış; v17-dev ile eşleme yok.

Sonraki adım önerisi: analytics-event-spec--implementation altında bir aktivasyon ve bir retention tanımı (olay, pencere, kohort anahtarı) belgelenmeli; hesaplama yeri seçilmeli. Website Analytics yalnız hosted sayfa ölçümü olarak etiketlenmeli.

Mevcut birincil görev: `analytics-event-spec--implementation`. Kaynak: `frappe/frappe/website/report/website_analytics/website_analytics.py:53`; `frappe/frappe/website/report/website_analytics/website_analytics.py:39`; `frappe/frappe/website/report/website_analytics/website_analytics.json:24`.

#### analytics-6 — İzin durumuna göre etiket çalıştırma; hassas veriyi ölçümden çıkarma.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream-native Frappe kaynağında şu primitifler var. (1) Site düzeyindeki System Settings.enable_telemetry anahtarı Pulse capture'ı açıp kapatıyor (frappe/frappe/utils/telemetry/pulse/client.py is_enabled). Anahtar kurulum sihirbazında kapatılabiliyor. Sentry DSN de aynı ayara bağlı: frappe/frappe/www/desk.py ve suite/suite/www/suite.py:42. (2) Pulse kullanıcıyı anonimleştiriyor (anonymize_user). Guest için boot_config user=null dönüyor. (3) frappe/ui/src/telemetry/telemetry.ts içinde disable() var; isEnabled=false yapıp client.stop() çağırıyor. Rota varsayılan olarak PII-safe desen yoluna indiriliyor (scrubRoute). anonymousMode için cookieless/client seçenekleri var. (4) Desk tarafında TelemetryManager.disable() sağlayıcıları boşaltıyor (frappe/frappe/public/js/telemetry/index.js). (5) Website view tracking navigator.doNotTrack değerine uyuyor. Suite headless_provider (LOCAL PILOT; api.py, local_fixture.py) içinde consent, telemetri ya da analitik kodu yok. Suite'in Vue frontend'i yalnız Sentry DSN'ini site ayarına bağlıyor.

Eksik: Kullanıcı ya da ziyaretçi bazında consent kaydı yok: model, hukuki dayanak, sürüm ve kanıt alanları bulunmuyor. enable_telemetry yöneticinin site/tenant genelinde verdiği bir ayar; son kullanıcı rızası değil.; Google Analytics (www/website_script.js, templates/includes/app_analytics/google_analytics.html) google_analytics_id tanımlıysa rıza kontrolü olmadan yükleniyor ve pageview gönderiyor. Google Consent Mode basic/advanced desteği yok. İzin yokken sıfır istek kriteri karşılanmıyor.; Opt-out yeni capture'ı durduruyor ama kuyruktaki Pulse eventleri yine gönderiliyor (Consent gates capture, not delivery). Bu, geri çekmede durdurma kriteriyle çelişiyor.; Geri çekmenin Tauri, PWA ve WXT kabuklarına yayılması için kod yok. React/AntD headless frontend için consent sağlayıcı sözleşmesi de yok.; Hassas alan yasak listesi yok: payload'u Frappe alan izinleri, permlevel ya da tenant verisiyle süzen bir mekanizma bulunmuyor. Yalnız rota scrub ve user anonimleştirme var.; Sunucu monitor/request IP kaydı ön yüz rızasının kapsamı dışında. Ayrı bir saklama maddesi olarak kalıyor.

Sonraki somut adım: En küçük adım ve sırası: (1) analytics-consent--contract tamamlanmalı. Bunun için headless_provider'da salt-okuma bir consent durum sözleşmesi tanımlanmalı: kategori, sürüm, zaman damgası, kaynak. (2) Consent kaydı için tek bir DocType ve whitelisted get/set API'si eklenmeli. Önce RED testi yazılmalı: izin yokken etiket yapılandırması dönmemeli. (3) React frontend'de basic blocking uygulanmalı: GA/Pulse yükleyicisi consent=granted olmadan hiç çağrılmamalı. (4) Geri çekmede client.stop() çağrılmalı ve kullanıcının kuyruğu temizlenmeli. Bunun için send_queued_events davranışı ayrıca kararlaştırılmalı. (5) Hassas alan denylist'i Frappe meta/permlevel ile payload filtresine bağlanmalı. Tauri/PWA/WXT yayılımı bu adımlardan sonra gelir.

Önerilen bağımlılık/sıra: analytics-consent--contract; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `analytics-consent--implementation`.

Kaynak kanıtı:

- `frappe/frappe/utils/telemetry/pulse/client.py:20` — `return bool(not frappe.conf.get("developer_mode", 0) and frappe.get_system_settings("enable_telemetry"))`
- `frappe/frappe/utils/telemetry/pulse/client.py:144` — `# Consent gates capture, not delivery: events queued while telemetry was on`
- `frappe/ui/src/telemetry/telemetry.ts:24` — `client?.stop();`
- `frappe/ui/src/telemetry/telemetry.ts:46` — `// Route → PII-safe string. Defaults to the matched path pattern (e.g. "/orders/:id").`
- `frappe/frappe/www/website_script.js:4` — `{% if google_analytics_id -%}`
- `suite/suite/www/suite.py:42` — `if frappe.get_system_settings("enable_telemetry"):`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source (frappe+suite tümü); arama `(?i)(consent|gtag|google_analytics|posthog|telemetry|track_event|capture_event)`: Eşleşmeler frappe telemetry/pulse, website_script, system_settings, setup_wizard, sentry ve locale dosyalarında. Consent DocType yok.
- suite; arama `(?i)(consent|gtag|google_analytics|analytics|posthog|telemetry|cookie_consent|track) (locale hariç)`: Eşleşmelerin çoğu build edilmiş public/frontend asset'leri. Kaynakta analitik consent kodu yok.
- source (locale ve public/frontend hariç); arama `(?i)(cookie.?consent|consent|enable_telemetry|google_analytics|do.?not.?track|opt.?out)`: Gerçek kontrol yalnız site düzeyindeki enable_telemetry ve doNotTrack. Suite'teki consent eşleşmeleri meet caption/STT test korpusu rızasıyla ilgili, analitikle değil.
- suite/suite/headless_provider; arama `(?i)(consent|analytics|telemetry|tracking|pii|redact|sensitive)`: Eşleşme yok.
- frappe/ui/src/telemetry/pulse.ts; arama `(?i)(anonymousMode|stop\(|scrub|anon_|redact|sensitive|pii)`: anonymousMode cookieless/client ve stop() arayüzü var.

Sınır: Yalnız kaynak okundu. Hiçbir komut ya da test çalıştırılmadı; functionalAcceptance not_run.; Bu ölçüt dağıtılmış ağ davranışını, gerçek istek sayısını veya KVKK/GDPR uyumunu kanıtlayamaz.; Build edilmiş asset ve sourcemap içerikleri satır satır incelenmedi.; Pulse istemci JS'i harici host'tan yükleniyor (client_url); bu kod kapsam dışında.; ERPNext/HRMS kurulu değil, değerlendirilmedi. Suite commit bilinmiyor.

Temporal workflow: `saas-recheck-20261015t073528z-027`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### analytics-7 — Deney yönetimi: kullanıcı gruplarına ayırma, karşılaştırma ve sonuç izleme.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de yalnız pazarlama atfı düzeyinde bir varyant karşılaştırma ilkel parçası var. Desk'teki UTM izleme URL'si üreticisinin 'content' alanı, açıklamasında A/B testi için reklam varyantlarını ayırmak amacıyla tanımlanıyor (utils.js:2178). Guest erişimli make_view_log; source, campaign, medium, content ve istemcinin verdiği visitor_id değerlerini 'Web Page View' DocType'ına deferred_insert ile yazıyor. Bu yalnız site izleme ayarı açıkken yapılıyor (is_tracking_enabled). 'Website Analytics' raporu group_by=content seçeneğiyle her varyant için toplam ve tekil görüntülenme sayısını aynı from_date–to_date penceresinde hesaplıyor. Varyantlar dışarıdan, el ile URL etiketiyle belirleniyor. Sistem kullanıcıyı gruba atamıyor ve atamayı saklamıyor. Suite'te yalnız Sheets/collab için ön yüz özellik bayrakları bulundu; bunlar deney değil. Suite'in Vue ön yüzü bu maddeyle ilgisiz. Yerel pilot suite/headless_provider (session, metadata, create_field, preview_edit, apply_edit) yalnız şema düzenleme sözleşmesi sunuyor; deney ya da analitik sözleşmesi yok.

Eksik: Deney/Varyant DocType'ı ve yaşam döngüsü yok (taslak, çalışıyor, durdu); hedef kitle, trafik oranı ve başlangıç/bitiş alanları da yok.; Deterministik ve kalıcı grup ataması yok: atama anahtarı (kullanıcı/tenant/visitor), hash/seed ve atama kaydı tanımsız. Mevcut visitor_id istemciden geliyor ve doğrulanmıyor.; Sayfa görüntülenmesi dışındaki iş metrikleri ve dönüşüm olayları yok; guardrail metriği, istatistiksel karşılaştırma (anlamlılık/güven aralığı) ve örneklem kuralı yok.; İzin durumuna (analytics-6) ve olay kataloğuna (analytics-4) bağlantı yok. Mevcut tek kapı, site genelindeki izleme ayarı.; Deney ile özellik bayrağı ayrımı ve sunucu tarafında varyant yetkisi yok; atamanın tenant izolasyonu da yok.; Headless provider'da varyant çözümleme/atama ve sonuç sorgusu için bir API sözleşmesi yok (React/AntDesign ve GenUI tüketicileri için).

Sonraki somut adım: Mevcut experiment--contract → experiment--schema → experiment--implementation sırası ve bağımlılıkları korunsun. 1) experiment--contract tek bir sözleşme olarak yazılsın: atama anahtarı (oturumlu kullanıcı + tenant), deney anahtarı ve seed'i hash'leyen deterministik kova, tek birincil metrik ve tek zaman penceresi. Sözleşme analytics-4 olay kataloğuna ve analytics-6 izin durumuna bağımlı olarak işaretlensin. 2) experiment--schema: Experiment ve Experiment Assignment DocType'ları eklensin; (experiment, subject) benzersiz olsun. 3) experiment--implementation: tek bir sunucu tarafı whitelist get_or_assign_variant çağrısı yazılsın. Önce aynı kullanıcının tekrar çağrıda aynı grupta kaldığını gösteren gerçek bir RED/GREEN testi gelsin, ardından iki grubu aynı metrik ve pencereyle hesaplayan sonuç sorgusu eklensin. Sorgu Website Analytics'teki frappe.qb group-by/pencere kalıbını yeniden kullanabilir. UTM 'content' alanı yalnız pazarlama atfı için kalsın, atama kaynağı yapılmasın.

Önerilen bağımlılık/sıra: experiment--contract; experiment--schema; kernel-envelope--contract; native-user-policy--contract; capability-definition--contract; native-doctype-schema--contract; outbox--contract; audit-envelope--contract; analytics-4 (olay kataloğu, öneri); analytics-6 (izin durumu, öneri). Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `experiment--implementation`.

Kaynak kanıtı:

- `frappe/frappe/public/js/frappe/utils/utils.js:2178` — `description: "Use to differentiate ad variants (e.g. A/B testing)",`
- `frappe/frappe/website/doctype/web_page_view/web_page_view.py:46` — `@frappe.whitelist(allow_guest=True)`
- `frappe/frappe/website/doctype/web_page_view/web_page_view.py:94` — `view.content = content`
- `frappe/frappe/website/report/website_analytics/website_analytics.js:41` — `{ value: "content", label: __("Content") },`
- `frappe/frappe/website/report/website_analytics/website_analytics.py:68` — `.groupby(self.group_by)`
- `suite/suite/sheets/tests/test_boot.py:3` — `"""Boot info plumbing — the frontend feature flags ride on these keys."""`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, tümü); arama `(?i)(a/?b[ _-]?test|split[ _-]?test|experiment|variant[ _-]?assign|cohort|treatment[ _-]?group|control[ _-]?group|feature[ _-]?flag|bucketing)`: Eşleşmelerin çoğu locale, dist bundle'ları, testlerdeki 'tabTest' kalıntıları ve 'experimental' ifadeleri; deney ürünü değil.
- source/ (locale ve dist hariç); arama `(?i)(a/?b[ _-]?test|split[ _-]?test|experiment[^a]|experiments|variant[ _-]?assign|cohort|treatment[ _-]?group|control[ _-]?group|feature[ _-]?flag|bucketing|holdout)`: Tek ilgili sonuç utils.js:2178'deki UTM 'content' A/B açıklaması. Suite'te Sheets collab ve boot için özellik bayrakları, stt_accuracy deney etiketi CLI'ı ve tarih kovalama çıktı; bunlar deney ataması değil.
- suite/suite/headless_provider; arama `(?i)(experiment|variant|cohort|ab_test|assignment|bucket|metric|analytics)`: Eşleşme yok. API yalnız şema düzenleme uç noktaları sunuyor (session, metadata, create_field, preview_edit, apply_edit).
- frappe/frappe/website (*.py, *.json); arama `(?i)(utm_content|utm_campaign|campaign)`: Web Page View alanları ve make_view_log içindeki source/campaign/medium/content kaydı, UTM Campaign DocType'ı.
- frappe/frappe/website/report/website_analytics/; arama `(?i)(group_by|options|campaign|source|medium)`: Rapor content'e göre gruplayabiliyor; aynı tarih penceresinde toplam ve tekil sayım veriyor.

Sınır: Yalnız yerel kaynak anlık görüntüsü okundu (frappe adf1fd0c, suite commit bilinmiyor). Hiçbir komut ya da test çalıştırılmadı; functionalAcceptance=not_run.; ERPNext, HRMS ve harici deney platformları kurulu değil, değerlendirilmedi.; İzlemenin etkin olup olmadığı ve gerçek veri gibi çalışma zamanı site ayarları görülmedi; dağıtım ve uyum iddiası yok.; Derlenmiş dist/asset bundle'ları ve locale dosyaları davranış kanıtı sayılmadı.; headless_provider yerel pilot ek koddur, upstream'e ait değildir.

Temporal workflow: `saas-recheck-20261015t073528z-028`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### reports-1 — Her modül/özellik için raporlama; muhasebe, CRM ve diğer alan raporları.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve görev eşlemesi (native-report--implementation) tanımlı. Frappe v17-dev kaynağında rapor temelleri görülüyor: izinli liste/sayım, group_by, 'report' izin hakkı ve query_report modülüne import. Kabul ölçütü ise muhasebe ve CRM raporlarına dayanıyor. ERPNext, HRMS ve Frappe CRM bu sitede kurulu değil; kurulu uygulamalar yalnızca frappe ve suite. Bu yüzden kabul ölçütü yerelde uygulanamıyor. 'Her modülün raporu' için modül envanteri ve headless rapor sözleşmesi de tanımlı değil.

Eksik: Muhasebe/CRM domain raporları kurulu uygulama envanterinde yok (not_installed); kabul ölçütü yerel siteye eşlenmemiş.; Suite modülleri (Drive, Mail, Meet vb.) için hangi raporun gerektiğini gösteren envanter yok.; Headless rapor çağrı sözleşmesi tanımlı değil: query_report çalıştırma, kolon/filtre metadata'sı, sayfalama ve dışa aktarma izni. v17-dev API'sine karşı sürüm eşlemesi de yok.; Domain toplamlarıyla eşleşmeyi ölçecek referans veri kümesi tanımlı değil.

Sonraki adım önerisi: Önce kurulu kapsamı netleştirin: Suite modüllerinden bir pilot rapor seçin ve kabul ölçütünü frappe.desk.query_report ile get_list/get_count izin akışına bağlayın. Muhasebe/CRM maddelerini ERPNext/CRM kurulum kararına bağlı koşullu bağımlılık olarak işaretleyin.

Mevcut birincil görev: `native-report--implementation`. Kaynak: `frappe/frappe/client.py:30`; `frappe/frappe/permissions.py:25`; `frappe/frappe/utils/print_format.py:12`; `suite/pyproject.toml:6`.

#### reports-2 — BI (Business Intelligence — iş zekâsı) panoları; BI Board.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Talimat 'BI Board' ürününü seçmeyi açık bırakıyor. Frappe Insights kurulu uygulamalar arasında yok ve sürüm kaydı da yok. Kabul ölçütündeki 'tenant filtresini atlayamasın' şartı anlamlı. Ancak BI aracının veriye nasıl eriştiğine dair sınır tanımlı değil: doğrudan DB mi, Frappe izinli API mi? Bu sınır olmadan şart doğrulanamaz. reports-3 (Metabase) aynı birincil görevi (bi-embedding--implementation) paylaşıyor ama ikisi arasında seçim kuralı yok.

Eksik: BI ürünü seçilmemiş (Insights, Metabase veya özel pano); Insights'ın Frappe v17-dev (suite frappe>=16,<18) ile uyumu doğrulanmamış.; Veri erişim sınırı tanımsız: doğrudan veritabanı bağlantısı Frappe DocType/User Permission kontrollerini atlar.; Keycloak oturumunun BI aracına nasıl aktarılacağı ve tenant (site) eşlemesi tanımlı değil.; reports-2 ile reports-3 aynı görevi paylaşıyor; tekilleştirme veya seçim kararı yok.

Sonraki adım önerisi: bi-embedding--implementation altında tek bir karar kaydı açın: ürün ve sürüm, veri yolu (yalnızca Frappe izinli API veya salt-okur tenant'a özel kaynak) ve SSO eşlemesi. Bu kayıt olmadan pano geliştirmesine başlamayın.

Mevcut birincil görev: `bi-embedding--implementation`. Kaynak: `suite/pyproject.toml:45`; `frappe/frappe/permissions.py:82`; `frappe/pyproject.toml:20`.

#### reports-3 — Metabase adaptörü ve gömülü raporlar.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **YOK**. İşlevsel kabul: `not_run`.

Kurulu frappe ve suite kaynaklarında Metabase (veya Superset/Redash) adaptörü, gömme token'ı üreten bir uç ya da kilitli tenant parametresi yok. Minified bundle'lardaki 'superset' eşleşmeleri ilgisiz: isSupersetOf, HTML entity ve highlight.js supersetOf. Yerel pilot suite/headless_provider (api.py, local_fixture.py) içinde rapor, dashboard veya embed sözleşmesi bulunmuyor. Adaptör olmasa da yeniden kullanılabilecek upstream-native primitifler var:

- query_report.run/get_report_doc rapor bazında rol kontrolü (Report.is_permitted) ve ref_doctype için 'report' izni uyguluyor.
- validate_filters_permissions, Link filtre değerlerini kullanıcı izniyle doğruluyor.
- Query Report, salt-okur transaction içinde check_safe_sql_query ile çalışıyor.
- Suite Meet'te, site config secret'ıyla sunucu tarafında imzalanan kısa ömürlü HS256 JWT örneği var.
- Web Form/Drive'da frame-ancestors başlığı yönetiliyor.
  Bu primitifler Metabase entegrasyonunu kanıtlamaz. Tenant sınırı Frappe'de site/DB düzeyinde sağlanıyor; Metabase tarafında buna karşılık gelen bir yalıtım yok.

Eksik: Gömme türü (statik/imzalı, interactive, SDK) ve buna bağlı Metabase lisansı kararı; kullanıcıyla netleştirilmeli; Frappe tarafında izin kontrolünden sonra kısa ömürlü imzalı embed token'ı üreten whitelisted uç (headless provider sözleşmesi); Tenant/site kimliğini sunucuda kilitleyen parametreler (frappe.local.site); istemciden gelen tenant değerinin yok sayılması; Embedding secret'ının site config/secret store'da saklanması, rotasyonu ve süre sınırı; Metabase veri kaynağı yalıtımı: tenant başına salt-okur DB kullanıcısı veya görünüm; Rapor/dashboard ile Frappe rol/izin eşlemesi (hangi rol hangi Metabase kaynağını görür); React/AntDesign istemcisinde iframe/SDK tüketicisi ve frame-ancestors/CSP yapılandırması; Parametre kurcalamayla başka tenant'ı sorgulama senaryosu için regresyon testi

Sonraki somut adım: Sıra şöyle olmalı:

1. bi-embedding--contract içinde gömme türünü ve Metabase lisansını kullanıcıyla kesinleştirin; önerilen başlangıç statik/imzalı gömmedir.
2. suite/headless_provider/api.py'ye tek bir whitelisted metot ekleyin (yerel pilot, ek kod). Metot sırasıyla:
   - Frappe rol/izin kontrolü yapar; Report.is_permitted ve frappe.has_permission desenini yeniden kullanır.
   - Secret'ı yalnızca frappe.conf'tan okur.
   - Tenant parametresini sunucuda frappe.local.site değerine kilitler.
   - Kısa exp süreli HS256 JWT imzalar; suite/meet/api/meeting.py desenini izler.
3. Kodu yazmadan önce iki RED test yazın: istemciden gelen tenant/params değerinin yok sayıldığını ve yetkisiz kullanıcının PermissionError aldığını kanıtlasınlar. Sonra GREEN'e geçin.
4. Ardından React/AntD tüketicisini ve CSP frame-ancestors ayarını ekleyin.
5. Son olarak Metabase tarafında tenant başına salt-okur DB kullanıcısını tanımlayın. Bu altyapı işi Hüseyin Cengiz'indir.

Önerilen bağımlılık/sıra: bi-embedding--contract; kernel-envelope--contract; native-user-policy--contract; native-doctype-schema--contract; outbox--contract. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `bi-embedding--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/query_report.py:49` — `if not doc.is_permitted():`
- `frappe/frappe/desk/query_report.py:301` — `if not frappe.has_permission(report.ref_doctype, "report"):`
- `frappe/frappe/desk/query_report.py:1194` — `def validate_filters_permissions(report_name, filters=None, user=None, js_filters=None):`
- `frappe/frappe/core/doctype/report/report.py:190` — `frappe.db.begin(read_only=True)`
- `suite/suite/meet/api/meeting.py:84` — `return jwt.encode(payload, secret, algorithm="HS256")`
- `frappe/frappe/website/page_renderers/web_form.py:22` — `self.headers = {"Content-Security-Policy": f"frame-ancestors 'self' {allowed_embedding_domains}"}`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- source/ (frappe + suite, tüm dosyalar); arama `(?i)metabase|superset|redash|embed_token|signed.?embed|embedding_secret|METABASE_SECRET`: Kaynak kodda eşleşme yok. Eşleşmeler yalnız minified bundle/map dosyalarında ve frappe/model/**init**.py içindeki set.issuperset çağrısında; hepsi ilgisiz.
- source/ (_.py,_.ts,_.tsx,_.vue,_.json,_.toml,_.md,_.js); arama `(?i)metabase|\bsuperset\b|redash|signed.?embed|embed.?token|iframe.?token`: Yalnız 6 minified dist/asset JS dosyası eşleşti; -o kontrolüyle isSupersetOf, HTML entity ve highlight.js supersetOf olduğu doğrulandı. BI adaptörü yok.
- source/ (*.py); arama `(?i)jwt\.encode|import jwt|jwt\.decode`: JWT kullanımı yalnız frappe OAuth/OIDC ile suite Meet SFU/recorder grant ve callback akışlarında. BI embed token'ı yok.
- suite/suite/headless_provider/; arama `(?i)report|dashboard|chart|embed|iframe`: Tek eşleşme bir docstring ('reporting success'). Rapor veya embed sözleşmesi yok.
- frappe/frappe/desk/query_report.py; arama `^def (run|get_script|export_query|get_report_doc)|frappe.has_permission\(|check_permission|is_permitted|ignore_prepared_report`: Native rapor çalıştırma yolunda rol ve doctype 'report' izin kontrolleri ile filtre izin doğrulaması var (satır 29-59, 260-305, 1194+ okundu).
- frappe/frappe/core/doctype/report/report.py; arama `def is_permitted|def execute_query_report|def execute_script_report|safe_exec|frappe.db.sql\(`: Has Role tabanlı is_permitted ve salt-okur transaction içinde check_safe_sql_query ile Query Report çalıştırma (satır 149-193 okundu).
- source/ (*.py); arama `(?i)X-Frame-Options|frame-ancestors|allow_embed|embed_url`: Web Form ve suite Drive'da frame-ancestors yönetimi ile frappe cloud_settings embed URL'si var; Metabase iframe/CSP entegrasyonu yok.

Sınır: Kapsam: yalnız sourceRoot altındaki kurulu frappe ve suite app kaynakları. ERPNext/HRMS kurulu değil, değerlendirilmedi. Global ekosistemdeki Metabase eklentileri kapsam dışı.; suiteCommit bilinmiyor. headless_provider yerel pilot ek kodudur, upstream-native değildir.; Site config, secret değerleri, müşteri DB'si ve çalışan Metabase örneği incelenmedi. Tenant yalıtımı runtime'da doğrulanmadı.; Testler yalnız okunabilir kaynak olarak ele alındı; hiçbir test yazılmadı veya çalıştırılmadı. functionalAcceptance: not_run.; Minified bundle içerikleri yalnız eşleşme bağlamıyla kontrol edildi.; Lisans ve gömme türü kararı kaynak kodla belirlenemez; kullanıcı kararı gerekir.

Temporal workflow: `saas-recheck-20261015t073528z-052`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### reports-4 — Filtre, tarih aralığı, kaydedilmiş rapor ve zamanlanmış gönderim.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kaynakta filtreli/izinli liste ve sayım uçları var. Arka plan iş kuyruğu ve PDF üretim primitifleri de görülüyor. Ancak talimatın kaynağı version-15 Auto Email Report kodu, oysa yerel kurulum v17-dev; sürüm eşlemesi yok. Auto Email Report, Report DocType ve kaydedilmiş Report Builder ayarları excerpt içinde görülmedi. 'Aynı kapsamda gitsin' ifadesi belirsiz: rapor sahibinin izinleri mi, alıcının izinleri mi geçerli olacak?

Eksik: Auto Email Report kaynağı v17-dev yerel koduna eşlenmemiş (talimat version-15'i referans alıyor).; Kaydedilmiş raporun headless CRUD sözleşmesi yok: Report DocType, JSON filtre biçimi, göreli tarih (Timespan) saklama.; Zamanlanmış gönderimde izin bağlamı (sahip mi, alıcı mı) ve harici alıcı kısıtı tanımlı değil.; Teslim biçimi (PDF/CSV/XLSX), boyut ve hız sınırları tanımlı değil.

Sonraki adım önerisi: v17-dev yerel kaynağında Auto Email Report ve Report DocType kodunu okuyup eşleyin. 'Aynı kapsam' ifadesini sahip/alıcı izin kuralı olarak netleştirin. Ardından kaydedilmiş tarih filtresinin yeniden açılmasını tek kabul senaryosu olarak tanımlayın.

Mevcut birincil görev: `native-report--implementation`. Kaynak: `frappe/frappe/client.py:29`; `frappe/frappe/api/v2.py:193`; `frappe/frappe/utils/print_format.py:113`; `frappe/frappe/utils/print_utils.py:54`.

#### reports-5 — Kiracı/kayıt/alan yetkisiyle raporlama ve dışa aktarma.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü somut: aynı rapor/export yetkisiz satır ve alan göstermemeli, SQL ve API yolları ayrı doğrulanmalı. Kaynakta bunun yapı taşları var: rol hakları arasında report/export bulunuyor, doküman okumada alan seviyesinde izin uygulanıyor, client.get_value DocType iznini kontrol ediyor. Ancak Query/Script Report ve export kod yolları bu kesitte yer almıyor; ham SQL raporlarında kayıt/alan izninin uygulanıp uygulanmadığı kaynakla doğrulanmadı.

Eksik: Kiracı modeli tanımlı değil: site başına kiracı mı, alan/User Permission ile mi? 'Kiracı yetkisi' bu tanım olmadan test edilemez.; Rapor türü başına izin matrisi yok (Report Builder, Query Report, Script Report, REST get_list/get_count, export).; v17 dev sürümünde reportview export ve query_report yürütme yolları kaynakta eşlenmedi; dokümandaki v16 davranışı varsayılmış.; Data Masking deneysel olarak işaretli; v17'de kullanılıp kullanılmayacağına dair karar yok.; Headless (React/TanStack Query) istemcinin hangi uç noktaları kullanacağına ve ignore_permissions içeren yardımcıların dışarı açılmayacağına dair açık bir sınır yazılmamış.

Sonraki adım önerisi: Mevcut native-report--implementation görevine üç şey eklenmeli: (1) kiracı modeli kararı, (2) rapor türü × uç nokta izin matrisi, (3) frappe/desk/query_report.py ve reportview export yollarının v17 kaynağında satır bazında eşlenmesi. Ham SQL kullanan raporlar için sunucu tarafında zorunlu kapsam filtresi kuralı yazılmalı. Yeni görev açılmamalı.

Mevcut birincil görev: `native-report--implementation`. Kaynak: `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/client.py:134`; `frappe/frappe/api/v1.py:35`.

#### reports-6 — Kaynak modüllerden gelen olaylarla güncellenen ayrı okuma modelleri.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: replay sonrası okuma modeli kaynak toplamıyla eşleşmeli, aynı olayın iki kez gelmesi sonucu bozmamalı. Kaynakta yalnızca genel yapı taşları görülüyor: frappe.enqueue arka plan işleri ve duckdb bağımlılığı. İncelenen kesitlerde olay kaynağı, projeksiyon, replay veya tazelik takibi yok. Event Streaming'in v17'deki destek durumu kaynakla doğrulanmadı.

Eksik: Olay kaynağı sözleşmesi yok: doc_events hook'ları mı, transactional outbox mı? Commit sonrası yayın ve rollback durumu tanımlı değil.; Tekrarlanan olayları ayıklayacak kimlik/anahtar (dedup) ve olay sıralama kuralı yok.; Okuma modelinin nerede saklanacağı belirsiz (ayrı DocType, ayrı tablo veya duckdb); duckdb bağımlılığının ne için kullanıldığı doğrulanmadı.; Kiracı izolasyonu ve okuma modelinin izinleri (reports-5 ile bağlantısı) tanımlı değil.; Replay/yeniden kurma komutu, tazelik (lag) ölçümü ve şema değişikliğinde yeniden kurma politikası yok.

Sonraki adım önerisi: reporting-read-model--implementation görevine şunlar yazılmalı: olay kaynağı kararı (doc_events + outbox), tekrar ayıklama anahtarı, depolama hedefi, replay yöntemi ve okuma modeli izinlerinin reports-5 matrisine bağlanması. v17 kaynağında Event Streaming'in varlığı ve kapsamı ayrıca kontrol edilmeli. Kapsamı koşullu kalmalı; yalnız seçilen bir karar raporu için başlanmalı.

Mevcut birincil görev: `reporting-read-model--implementation`. Kaynak: `frappe/frappe/utils/print_format.py:113`; `frappe/pyproject.toml:20`.

#### reports-7 — Metrik tanımı, veri güncelliği ve hesaplama tutarlılığı.

Yönerge: **Kısmi**. İkinci tur kaynak sonucu: **KISMİ**. İşlevsel kabul: `not_run`.

Upstream Frappe'de somut yapı taşları var. (1) Number Card kayıtlı bir tanımdır (function, aggregate_function_based_on, document_type, filtreler, stats_time_interval). Değerini tek bir sunucu fonksiyonu hesaplar: number_card.get_result, frappe.get_list üzerinden yetkiye göre filtrelenmiş SQL aggregate çalıştırır. Önceki dönem karşılaştırması da aynı fonksiyonu to_date ile kullanır. (2) Dashboard Chart da kayıtlı bir tanımdır ve değerini dashboard_chart.get hesaplar. @cache_source sonucu Redis'te chart-data:{chart_name} anahtarıyla saklar; refresh=1 verilince yeniden hesaplar ve last_synced_on alanını günceller. Masaüstü chart_widget bunu 'Last synced {0}' alt başlığı olarak gösterir. (3) Dashboard, grafik ve kartları Dashboard Chart Link ve Number Card Link alt tablolarıyla referans olarak bağlar. Aynı kart veya grafik iki panoya eklenirse tanım ortak kalır ve hesaplamayı aynı sunucu fonksiyonu yapar. Suite'in Vue arayüzü ve yerel pilot suite/headless_provider bu yapı taşlarına bağlanmıyor; ikisinde de metrik veya tazelik sözleşmesi yok. headless_provider'daki 'stale' yalnız base_revision kilidiyle ilgili.

Eksik: Sürümlü ve sahibi belli ortak bir metrik sözleşmesi yok: metrik kimliği, formül sürümü, sahip, zaman dilimi, kaynak okuma modeli ve hesaplama sürümü tanımlı değil.; Number Card ile Dashboard Chart aynı kavram için iki ayrı ve birbirinden bağımsız tanım üretebiliyor. İki panoda aynı metriğin tanımının ve değerinin eşleştiğini garanti eden ya da doğrulayan bir mekanizma yok.; Tazelik eşiği ve geciken veri uyarısı yok: last_synced_on yalnız bilgi olarak gösteriliyor; eşik, uyarı durumu veya bildirim bulunmuyor.; Number Card'da tazelik alanı hiç yok; Redis önbelleği yalnız grafiklerde var.; Okuma modeli gecikmesi (reports-6) ile bir entegrasyon kurulmamış.; Headless/React (Ant Design) tüketicisi için metrik ve tazelik sağlayıcı sözleşmesi yok. Suite headless_provider'da bu kapsamda bir endpoint bulunmuyor.; Çalışma zamanı kabulü (functionalAcceptance) not_run durumunda.

Sonraki somut adım: Mevcut görev eşlemesi (native-report--implementation) ve bağımlılıklar korunur. Önerilen sıra: (1) native-report--contract içinde metrik sözleşmesini tanımla: metric_id, sürüm, sahip, kaynak DocType, filtre, zaman dilimi ve freshness_threshold. Bu sözleşmeyi Number Card ve Dashboard Chart kayıtlarına referansla eşle, yeni bir hesaplama motoru yazma. reports-6'yı tazelik kaynağı olarak açıkça bağımlılık listesine ekle. (2) Tek ve dar bir davranış uygula: bir metriğin değerini number_card.get_result veya dashboard_chart.get üzerinden tek noktadan dönen bir headless sağlayıcı okuma ucu yaz. Bu uç değeri, tanım sürümünü ve last_synced_on/computed_at alanlarını döndürsün ve eşik aşılınca stale=true işaretlesin. (3) RED/GREEN regresyon testi: aynı metric_id'yi kullanan iki pano tüketimi aynı tanımı ve değeri döndürmeli; eşiği aşan last_synced_on uyarı alanı üretmeli. (4) Bundan sonra React/AntD pano yüzeyinde uyarıyı göster. Suite'in Vue arayüzüne dokunma.

Önerilen bağımlılık/sıra: native-report--contract; kernel-envelope--contract; native-user-policy--contract; native-doctype-schema--contract; outbox--contract; reports-6. Kanonik bağımlılık kaydı JSON’daki `developmentSequence.existingDependencies` alanında korunur.

Mevcut birincil görev: `native-report--implementation`.

Kaynak kanıtı:

- `frappe/frappe/desk/doctype/number_card/number_card.py:127` — `def get_result(`
- `frappe/frappe/desk/doctype/number_card/number_card.py:159` — `res = frappe.get_list(`
- `frappe/frappe/utils/dashboard.py:25` — `cache_key = f"chart-data:{chart_name}"`
- `frappe/frappe/utils/dashboard.py:73` — `"last_synced_on",`
- `frappe/frappe/public/js/frappe/widgets/chart_widget.js:960` — `let last_synced_text = __("Last synced {0}", [`
- `frappe/frappe/desk/doctype/number_card_link/number_card_link.json:16` — `"options": "Number Card"`

Aranan yollar ve terimler (YOK yalnız bu kapsama aittir):

- frappe/frappe/desk/doctype/number_card/number_card.py; arama `def get_result|def calculate_cumulative|last_synced_on|time_interval|based_on`: get_result (satır 127) tek hesaplama noktası; stats_time_interval ile önceki dönem hesaplanıyor; last_synced_on alanı yok.
- suite; arama `(?i)(metric|freshness|stale|staleness|last_synced|last_updated|data_lag|refresh_interval|kpi) glob *.{py,json,ts,tsx,js,vue}`: Eşleşmeler yalnız derlenmiş frontend asset'leri, mail/calendar/drive Vue bileşenleri ve headless_provider/api.py'deki base_revision 'stale' notunda. Metrik veya tazelik sözleşmesi yok.
- suite/suite/headless_provider; arama `(?i)(metric|freshness|stale|last_synced|report|dashboard|number_card|chart)`: Yalnız api.py:349 (stale base_revision) ve api.py:784 eşleşti; rapor/metrik sağlayıcı ucu yok.
- frappe/frappe/desk/doctype/dashboard_chart, frappe/frappe/utils/dashboard.py; arama `last_synced_on|def get\(|@cache_source|def cache_source|refresh`: cache_source Redis önbelleği, refresh=1 ile yeniden hesaplama ve last_synced_on güncellemesi var; dashboard_chart.json'da last_synced_on alanı tanımlı.
- frappe/frappe/public/js/frappe/widgets; arama `last_synced_on|Last synced|stale|cache_source|refresh`: Yalnız chart_widget.js'de 'Last synced' bilgi metni var; number_card_widget'ta tazelik yok; eşik veya uyarı yok.
- frappe/frappe/desk/doctype/{dashboard,dashboard_chart_link,number_card_link}; arama `"(fieldname|options)": "(chart|card|charts|cards|Dashboard Chart|Number Card)"`: Dashboard, kart ve grafikleri Link ile referanslıyor; tanımlar panolar arasında paylaşılabiliyor.
- frappe/frappe; arama `(?i)(metric_definition|metric_version|calculation_version|freshness_threshold|staleness|data_lag|max_age|stale_after) glob *.{py,json,js}`: 14 dosya eşleşti (caching, auth, translate, search, event vb.); dosya bağlamlarına göre bunlar genel önbellek max_age türü eşleşmeler, metrik sözleşmesi veya tazelik eşiği değil.
- suite; arama `Number Card|Dashboard Chart|query_report|number_card|dashboard_chart glob *.{py,json,ts,vue}`: Yalnız drive workspace JSON'u ve bir drive testi eşleşti; Suite metrik/pano tüketimi kurmuyor.

Sınır: Yalnız sourceRoot altındaki frappe ve suite uygulama kaynakları okundu; hiçbir komut veya test çalıştırılmadı; functionalAcceptance not_run.; frappe/frappe genelindeki max_age/staleness eşleşmeleri tek tek açılmadı; ilgisiz oldukları dosya bağlamından çıkarıldı.; dashboard_chart.py'nin get gövdesi ve number_card_widget.js ayrıntıları tamamen okunmadı; tazelik yokluğu widget dizini grep'ine dayanıyor.; Frappe Insights, ERPNext ve HRMS kurulu değil; değerlendirilmedi.; Kaynak kodu bir davranışın varlığını gösterir; dağıtılmış ortamdaki önbellek/Redis davranışını veya iki panonun çalışma zamanında eşitliğini kanıtlamaz.; suiteCommit bilinmiyor; headless_provider yerel pilot (eklemeli) kod olarak ayrıca ele alındı.

Temporal workflow: `saas-recheck-20261015t073528z-053`. Gerçek Grep girdileri ve okunan dosyalar JSON ikinci tur kaydındadır.

#### reports-8 — SaaS iş metrikleri: MRR, ARR, müşteri/gelir kaybı ve LTV; tanım, dönem ve kaynak uzlaştırması.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: örnek abonelik kümesiyle eşleşme, LTV varsayımlarının görünür olması, iade/kur/gecikmiş olay uzlaştırması. Ancak bu metriklerin hesaplanacağı abonelik/fatura kaynağı yerelde yok. Kurulu uygulamalar yalnızca frappe ve suite; Suite açıklamasında faturalama/abonelik bulunmuyor, ERPNext kurulu değil. Frappe rapor altyapısı hesaplama yapabilir, fakat veri kaynağı tanımsız.

Eksik: Gerçek veri kaynağı kararı yok: Stripe/sağlayıcı analitiği mi, ürüne ait abonelik DocType'ı mı? ERPNext Subscription yerelde kullanılamaz.; MRR/ARR/churn/LTV formülleri; deneme, indirim, iade, kur dönüşüm anı ve dönem sınırı kuralları yazılmamış.; reports-7 metrik sözleşmesine ve reports-6 okuma modeline bağımlılık açıkça belirtilmemiş.; Sağlayıcı webhook'larının gecikmeli veya tekrar gelmesi durumunda uzlaştırma kuralı yok.

Sonraki adım önerisi: business-metric--implementation görevi önce bir kaynak kararı almalı (sağlayıcı veya ürüne ait abonelik modeli). Ardından reports-7 sözleşme biçiminde 4 metrik için formül tablosu ve küçük bir örnek abonelik veri seti tanımlanmalı. Bu adım yalnız tekrarlayan gelir modeli seçilirse yapılmalı.

Mevcut birincil görev: `business-metric--implementation`. Kaynak: `suite/pyproject.toml:6`; `suite/suite/hooks.py:6`.

#### reports-9 — Yazdırma ve belge çıktısı ailesi; sürümlü şablon, yetkili önizleme, PDF/indirme ve toplu belge üretimi.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü ayrıntılı. Kaynakta güçlü yapı taşları var: printview baskı izni kontrolü ve access log, beta/jinja renderer ayrımı, download_pdf, bulk_actions yetkisi, adet limiti, hız sınırı ve arka plan işiyle toplu PDF, chrome/wkhtmltopdf/Typst seçimi. Eksikler: şablon sürümünün sabitlenmesi, süreli ve kiracıya bağlı indirme ile headless önizleme sözleşmesi kaynakta görülmüyor. printpreview.get_context kesitinde açık bir izin kontrolü görünmüyor.

Eksik: Şablon sürümü: Print Format'ın hangi sürümüyle önizleme ve nihai PDF'in üretileceğini sabitleyen bir mekanizma kaynakta yok.; printpreview.py içinde get_doc sonrası validate_print çağrısı kesitte görünmüyor; headless önizleme bu yola bağlanmadan önce izin akışı v17 kaynağında doğrulanmalı.; Toplu PDF bağlantısı task_id ile yayımlanıyor; üretilen dosyanın özel/süreli saklama ve silme politikası ile kiracı bağlaması görülmedi.; Toplu üretimde her çağrı yeni uuid task_id üretiyor; aynı isteğin tekrarlanmasıyla çift üretimi önleyecek bir kural yok.; Renderer bağımlılıkları (Chromium/wkhtmltopdf/Typst) container'da doğrulanmadı; varsayılan wkhtmltopdf bakımsız olarak işaretli.; render_jinja_template yalnızca System Manager'a açık; headless şablon düzenleme bu sınırı korumalı, istemci script'leriyle aşılmamalı.

Sonraki adım önerisi: document-template--implementation görevine şunlar eklenmeli: printview/print_utils/print_format.py uç noktalarının headless eşlemesi, printpreview izin akışının v17'de doğrulanması, şablon sürümünü sabitleme kararı, toplu PDF dosyasının saklama süresi ve kiracı bağlaması, tekrarlanan isteğe karşı anahtar. Renderer seçimi (chrome önerisi) hedef ortamda bağımlılık kontrolüyle kesinleştirilmeli.

Mevcut birincil görev: `document-template--implementation`. Kaynak: `frappe/frappe/www/printview.py:92`; `frappe/frappe/www/printpreview.py:19`; `frappe/frappe/utils/print_format.py:99`; `frappe/frappe/utils/print_format.py:109`; `frappe/frappe/utils/print_format_generator.py:18`; `frappe/frappe/printing/doctype/print_settings/print_settings.py:31`.

## Kullanıcı kararı gerekenler — tek liste

1. **Kurulu olmayan app dayanağı olan 29 madde:** aşağıdaki mevcut karar tablosundaki app/harici hizmet/dar adapter seçimi ve sürüm/lisans uygunluğu. ERPNext/HRMS/CRM/Helpdesk/Payments otomatik kurulmaz. Kimlikler: `service-4`, `catalog-1`, `catalog-4`, `catalog-5`, `subscriptions-1`, `subscriptions-2`, `subscriptions-4`, `subscriptions-6`, `campaigns-1`, `campaigns-2`, `campaigns-3`, `campaigns-4`, `campaigns-5`, `payments-1`, `crm-1`, `crm-2`, `releases-5`, `integrity-9`, `finance-1`, `finance-2`, `finance-4`, `finance-5`, `finance-6`, `finance-7`, `finance-9`, `support-1`, `support-4`, `reports-2`, `reports-8`.
2. **Keycloak entegrasyonu:** teknoloji seçimi kesin; hedef kurulum/sürüm, realm/client, kullanıcı–rol eşlemesi ve erişim sınırı netleşmeli. Native yerel cookie/CSRF pilotu bu kararı beklemez.
3. **Grid:** mevcut açık grid kararı netleşmeli; kontrollü alan ve tek kayıt okuma/yazma için grid seçimi gerekmez.
4. **Suite/ürün baseline’ı:** kurulu Suite kaynak commit’i, gerçek ürün repo/commit/build ve `egitim.metaframer.net` deployment eşlemesi kanıtlanmalı. Deployment/build/çalışan sürüm kanıtının teknik sahibi **Hüseyin Cengiz**. Yerel inceleme commit’i veya `/saas` dokümantasyon commit’i ürün baseline’ı yerine yazılmaz.

Bu liste karar gerektirmeyen yerel R-02 iki config ve T-08 tek DocType/iki yetki kapsamı dilimini durdurmaz. Üçüncü görev registry’si açılmaz; kanonik kartların genel BLOCKED durumu dar yerel kanıtla sessizce kaldırılmaz.

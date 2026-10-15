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

## İnceleme yöntemi ve sayıların anlamı

Yerel uygulama kaynaklarından 4263 metin dosyalı, site ayarlarını, secretları ve müşteri verilerini içermeyen salt okunur bir snapshot alındı. 49 alt başlık, 387 gereksinim kimliği tam birer kez ele alınacak şekilde 72 bağımsız kaynak paketine ayrıldı. Claude CLI `claude-opus-5-5`, high ile 72 kaynak incelemesi; Codex CLI `gpt-6-astra`, high ile üç yeni metadata ihtiyacının bağımsız incelemesi yapıldı. Gerçek eşzamanlı CLI süreç zirvesi 73 olarak ölçüldü. Sonlu işler tamamlandığında sayıyı doldurmak için yeni iş üretilmedi.

İnceleyicilere ilgili kaynak kesitleri verildi; her dosyanın bütün yolları, tüm kurulu ayarlar ve müşteri verisi taranmış değildir. Görülmeyen yetenek `unknown` kalır. 387 maddenin kimlik kapsamı ve kaynak alıntılarının dosya/satır bağları kontrol edildi; yedi komşu satır işaretçisi düzeltildi. Alıntının bulunması, çıkarımın veya davranışın çalıştığını tek başına kanıtlamaz. Aşağıdaki sınıflar kaynak incelemesine dayalı gerekçeli **ön değerlendirmedir**; kanonik kabul durumlarını değiştirmez.

| Değerlendirme                      | Madde sayısı | Anlamı                                                                                                                      |
| ---------------------------------- | -----------: | --------------------------------------------------------------------------------------------------------------------------- |
| Yönerge kısmi                      |          386 | Amaç tanımlı; sürüm, yetki, sözleşme, bağımlılık veya uygulanabilir kabul ayrıntısı eksik.                                  |
| Yönerge yeterli                    |            1 | Bu incelemede `releases-12` yönergesinin sınırı yeterince açık bulundu. Tauri uygulaması veya mağaza teslimi doğrulanmadı.  |
| Yönerge tamamen yok                |            0 | İncelenen mevcut 387 kimlikte kapsam metni var. Bu, kullanıcı ihtiyacının evrensel olarak eksiksiz olduğu iddiası değildir. |
| Yerel kaynakta kısmi temel         |          287 | İlgili yapı taşları görülüyor; istenen uçtan uca davranış kanıtlanmış değil.                                                |
| Yerel kaynakta doğrudan temel      |            7 | İlgili native mekanizma doğrudan görülüyor; ürünün tamamlandığı anlamına gelmez.                                            |
| Yerel kurulu app kapsamı dışında   |           29 | Bu sitede kurulu olmayan uygulama yeteneğine dayanıyor; tüm Frappe ekosisteminde yok demek değildir.                        |
| Kaynak kesitleriyle belirlenemeyen |           64 | Daha dar, hedefli kaynak/ayar kanıtı gerekiyor; yok veya hazır diye işaretlenmez.                                           |

İlk üç satır yönergeyi, son dört satır yerel kaynak temelini değerlendirir; birbirine eklenmez ve tamamlanma yüzdesine çevrilmez. İşlevsel headless kabul: **not_run**. Yeni test dosyası/senaryosu: **0**. Belgeye yapay TDD başarısızlığı üretilmedi.

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

**Bitti:** gerçek yerel Frappe/Suite kurulumunun bulunması, sürüm ve kurulu app ayrımı, 12 başlığın 387 maddesine kaynak temelli ön değerlendirme, üç yeni ihtiyacın native mekanizmalarla eşlenmiş geliştirme sözleşmesi ve sıralaması.

**Kaldı:** hedef ürün baseline’ını kesinleştirmek, gerçek site metadata/izinlerini okumak, ortak sözleşmeleri mevcut kanonik kayıtlara inceleyerek işlemek ve ilk çalışan headless pilotu uygulamak. Üç istenen kullanıcı davranışı bu belgeyle uygulanmış değildir. GenUI, Keycloak entegrasyonu, finans/CRM modülleri, mobil/masaüstü paketler ve diğer SaaS davranışları hazır diye işaretlenmedi.

Bu rapor yerel hazırlık teslimidir. Statik build allowlist’i çalışma raporlarını yayımlamaz; raporun Git’te bulunması Pages arayüzüne işlendiği anlamına gelmez. Önceki kaynak keşfi yayınının 320 px link taşması nedeniyle başarısız CI’ı bu kaynak incelemesiyle çözülmüş sayılmaz. Güncel kullanıcı master talimatı önceki bütçe nedeniyle bekleme kaydını kaldırmıştır; başarısız yayın kapısı yine korunur. Canlı Pages’in güncellendiği iddia edilmez.

Makineyle okunabilir birleşik tablo: [frappe-roadmap-analysis.json](./frappe-roadmap-analysis.json). Bu JSON kaynak değerlendirmesidir; mevcut görev registry’sini çoğaltmaz.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Excerpt'te yalnız DB tarafı busy timeout/zaman aşımı tespiti ve reconnect yardımcısı görülüyor. Dış çağrı timeout'u veya circuit breaker kodu bu kaynakta yok; bu, global yokluk değil, bilinmiyor demektir. Suite'in gerçek dış bağımlılıkları (anthropic, JMAP, S3) var ama talimatta adlandırılmamış.

Eksik: Dış bağımlılık envanteri yok (Anthropic API, JMAP, boto3/S3, meet SFU, collab-server); Bağımlılık başına timeout bütçesi ve breaker eşikleri (hata oranı, açık kalma süresi) tanımsız; Breaker durumunun nerede tutulacağı (worker-yerel ya da Redis paylaşımlı) belirtilmemiş; Background job timeout'unun v17-dev kaynağında doğrulanması yapılmamış

Sonraki adım önerisi: Görevde ilk olarak tek bir dış bağımlılık (örn. Anthropic çağrısı) seçilsin. Timeout değeri ve breaker açık/yarı açık davranışı kabul ölçütüne yazılsın. Mevcut çağrı noktası kaynakta okunup sarmalama sınırı belirlensin.

Mevcut birincil görev: `dependency-resilience--implementation`. Kaynak: `frappe/frappe/database/sqlite/database.py:22`; `frappe/frappe/database/utils.py:202`; `suite/pyproject.toml:32`; `suite/pyproject.toml:30`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü ayrıntılı ve doğru sınırları çiziyor. Ancak bunu uygulanabilir kılacak sözleşmeler yok: yedek manifest şeması, anahtar kurtarma mekanizması ve sunucu tarafında tekilleştirme/sonuç sorgusu. İstemci kodu (Tauri, PWA, WXT) snapshot'ta yok. Suite'teki taslak geri yükleme yalnızca aynı cihazda çalışan bir Vue taslağıdır, bağımsız yedek değildir. Frappe create ucunda idempotency anahtarı görünmüyor.

Eksik: Outbox, mutasyon kimliği, şema sürümü ve sync imlecini kapsayan manifest formatı tanımsız.; Anahtar kurtarma yöntemi ve yedekten ayrı erişim politikası seçilmemiş. Tauri Stronghold, OS anahtar zinciri ve web/eklenti için ayrı yollar netleşmeli.; Frappe tarafında mutasyon tekilleştirme penceresi ve sonuç sorgusu sözleşmesi yok. v1 create_doc doğrudan insert yapıyor.

Sonraki adım önerisi: client-backup--implementation, offline/sync görevine bağımlı olarak işaretlenmeli. Önce iki sözleşme yazılmalı: manifest şeması ve sunucuda idempotent mutasyon/sonuç sorgusu. Bunlar ignore_permissions kullanmayan bir whitelisted uçla ve yerel Frappe izinleri yeniden kullanılarak tanımlanmalı.

Mevcut birincil görev: `client-backup--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `suite/frontend/src/apps/slides/stores/presentationRestore.test.ts:92`; `suite/frontend/src/apps/slides/stores/presentationRestore.test.ts:103`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni ilk bildirim, güncellemeler, çözüm zamanları, hedef kitle ve olay sonrası rapor bağlantısını kapsıyor. Görev kimliği service-2 ile ortak, bu doğru bir tekilleştirme. Pakette Notification, Version ve iletişim DocType kaynakları yok; yalnız genel DocType oluşturma ve izin primitifleri görülüyor. Bu yüzden yerel yetenek bilinmiyor.

Eksik: Güncelleme geçmişinin değişmezliği (yalnız ekleme mi, düzenleme mi) ve sürüm/denetim kaynağı belirtilmemiş.; Hedef kitle ve kanal sözleşmesi yok: iç kullanıcı, etkilenen tenant ya da kamu; e-posta ya da durum sayfası.; Kamuya yayın öncesi onay adımı ve yetkili rol tanımlı değil; native DocType izinlerine eşlenmemiş.; Olay sonrası raporun sahibi, şablonu ve bağlanma kuralı yok.; Frappe v17-dev'de Notification davranışı kaynakta doğrulanmamış; dokümandaki kaynak sürüm eşlemesi yok.

Sonraki adım önerisi: Notification ve Version kaynaklarını v17-dev ağacında salt okunur inceleyin. Ardından incident-comms--implementation'a dört öğe ekleyin: olay → güncelleme (yalnız ekleme) → çözüm → olay sonrası rapor yaşam döngüsü, hedef kitle/kanal tablosu ve native DocType izinleriyle yayın onayı rolü. ignore_permissions kısayoluna yer verilmesin.

Mevcut birincil görev: `incident-comms--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/api/v1.py:50`.

#### service-4 — Hizmet hedefi ihlali ve sözleşmeye bağlı hizmet kredisi kaydı.

Yönerge: **Kısmi**. Kaynak temeli: **Kurulu app kapsamı dışında**. İşlevsel kabul: `not_run`.

Görev, Helpdesk SLA ve ERPNext değişmez defteri üzerine kurulu; ikisi de bu sitede yüklü değil (yalnız frappe ve suite yüklü). Suite'in kapsamı da muhasebe ya da helpdesk değil. Ham erişilebilirlik verisi için yalnız monitor durum kodları var; bunlar da sınırlı bir Redis listesine ve bench log dosyasına yazılıyor, sözleşme kanıtı olarak saklanmıyor.

Eksik: SLO tanımı yok: ölçüm kaynağı, pencere, hariç tutulan planlı bakım ve hesap formülü belirsiz.; Kredi kademeleri ve sözleşme dönemi modeli ile verinin sahibi tanımlı değil.; Muhasebe bağlantısı ERPNext'e bağlı, ancak ERPNext yüklü değil; alternatif hedef ya da kurulum kararı yok.; Ölçüm verisinin saklanma ve bütünlüğü belirsiz; monitor logu kanıt deposu değil.; GDPR kaynağı bu kalemle ilişkisiz; asıl gereken sözleşme kaynağı eksik.

Sonraki adım önerisi: service-credit--implementation için önce koşullu kapsam kararını alın. Kapsam açılırsa SLO/ölçüm/kredi formülünü ve muhasebe hedefini (ERPNext kurulumu ya da dış sistem) karar olarak yazın. Helpdesk ve ERPNext özelliklerini native sayan cümleleri 'yüklü değil' olarak düzeltin.

Mevcut birincil görev: `service-credit--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/monitor.py:109`; `frappe/frappe/monitor.py:16`.

#### releases-1 — DevOps (Development and Operations — geliştirme ve işletim birlikteliği) araç bağlantıları.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kapsam ilkesi (servis hesabı yalnız gerekli repo/artifact) var. Ancak araç seçilmemiş: Press ile frappe_docker arasında karar yok. Kaynakta yalnız paketleme ipuçları görülüyor: apt bağımlılığı ve Frappe dışında konuşlanan bağımsız servisler. DevOps araç bağlantısına dair kaynak kanıtı yok.

Eksik: frappe_docker ile Press arasında karar ve sorumlu kişi (tam adla) belirtilmemiş; Suite sourceHead null; yerel build'in bildirdiği revizyon ile kaynak kimliğini eşleyen sözleşme yok; sfu-server, recorder-server ve collab-server gibi Frappe dışı servislerin artifact/registry yolu tanımlanmamış; [deploy.dependencies.apt] (ffmpeg) imaja nasıl taşınacak belirtilmemiş

Sonraki adım önerisi: ci-pipeline--implementation görevine şunları yazın: tek dağıtım aracı kararı, frappe adf1fd0 ve suite revizyon sabitlemesi, bağımsız servislerin ayrı artifact listesi, servis hesabı kapsamı. Yeni görev açmayın.

Mevcut birincil görev: `ci-pipeline--implementation`. Kaynak: `suite/pyproject.toml:35`; `suite/pyproject.toml:88`.

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

Yönerge: **Yeterli**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef, sınır ve kabul net: masaüstü updater ile mobil mağaza yolu ayrılmış, Frappe'nin bu sistemi sağlamadığı belirtilmiş, mobil OTA PoC'ye bağlanmış. İncelenen kaynakta Tauri istemcisi yok. Suite'in frontend'i bench asset'i olarak derleniyor. Bu yüzden kaynakla doğrulanamıyor.

Eksik: releases-11'deki client-migration görevine açık bağımlılık yazılmamış.; İmza anahtarı saklama sorumluluğu ve rotasyonu belirtilmemiş.

Sonraki adım önerisi: tauri-mobile-release--implementation'a client-migration--implementation bağımlılığını ve imza anahtarı sorumlusunu (Hüseyin Cengiz) ekle. Bunun dışında ek talimat gerekmiyor.

Mevcut birincil görev: `tauri-mobile-release--implementation`. Kaynak: `suite/pyproject.toml:95`; `suite/suite/hooks.py:21`.

#### releases-13 — Mobil mağaza kabulü ve yayın kapısı: gerçek uygulama faydası, izinler, indirilen kod ve login politikaları.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Mağaza politikası sınırları (Apple 4.2/2.5.2/4.8, Google Play) dikkatli işlenmiş ve kabul garantisi verilmiyor. Ancak yayın kapısının somut kaydı ve onaylayıcısı tanımsız. Login gerektiren uygulamalar için hesap silme yükümlülüğü değerlendirilmemiş. Mevcut Suite arayüzü bir web rotası; yeniden paketlenmiş web sitesi riski Frappe kaynağıyla çözülmez.

Eksik: Sürüm başına içerik sınıflandırması için kayıt yeri ve onaylayan rol (ürün ekibi / Hüseyin Cengiz) tanımsız.; Keycloak ile hesap oluşturan uygulamalarda uygulama içi hesap silme gerekliliği ele alınmamış.; İzin açıklamaları ile kullanılan native eklenti listesi arasında eşleme yok.

Sonraki adım önerisi: tauri-mobile-release--implementation'a tek bir yayın kapısı kontrol listesi ekle: değişiklik sınıfı, izin/eklenti farkı, hesap silme ve login akışı değerlendirmesi, inceleme kanıtı bağlantısı. Yeni bir görev açma.

Mevcut birincil görev: `tauri-mobile-release--implementation`. Kaynak: `suite/suite/hooks.py:21`; `suite/pyproject.toml:95`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni net: doğrulanmamış domain bağlanmasın, yenileme hatası alarm versin. Ancak sertifika ve domain doğrulama Frappe uygulama kaynağında değil, bench/nginx/proxy katmanında; o katman incelenen excerpt'lerde yok. Kaynakta yalnız proxy arkası çalışma ve geliştirme modunda TLS gevşetme izleri var.

Eksik: Sahiplik doğrulama yöntemi (DNS TXT, HTTP-01 vb.) ve domain bağlamadan önce yapılacak kontrol tanımsız.; Sertifika aracı/ACME istemcisi, yenileme takvimi ve alarm kanalı seçilmemiş.; developer_mode, allow_tests veya CI açıkken OAuth için zorunlu TLS kapanıyor. Üretim kabulünde bu bayrakların kapalı olması şart koşulmamış.; TLS'in proxy'de sonlandırılması ve ProxyFix/forwarded başlık güveni sözleşmesi yok.; deployment-3 ile sıralama bağımlılığı (önce doğrula, sonra bağla) açıkça yazılmamış.

Sonraki adım önerisi: domain-lifecycle--implementation görevine şu sırayı ekleyin: doğrulama yöntemi → bağlama → sertifika → yenileme alarmı. Üretimde developer_mode ve allow_tests kapalı olmalı. Teknik kayıt değerlerini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın, sonucu Hüseyin Cengiz doğrulasın.

Mevcut birincil görev: `domain-lifecycle--implementation`. Kaynak: `frappe/frappe/integrations/doctype/connected_app/connected_app.py:17`; `frappe/frappe/integrations/doctype/connected_app/connected_app.py:19`; `frappe/frappe/app.py:11`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: pencerenin yeniden hesaplanması, hızlı/yavaş bütçe tüketimi alarmı, yayın kararının kaydı ve SLA'nın ayrı tutulması tanımlı. Ancak seçilecek yolculuk ve sayısal hedefler eksik. SLO yönetimine dair kaynak görülmedi. Yalnızca recorder'daki outcome etiketli başlatma sayacı olası bir SLI hammaddesi olarak var.

Eksik: Pilot kullanıcı yolculuğu ve SLI formülü (iyi olay / toplam olay) seçilmemiş.; Hedef yüzdesi, ölçüm penceresi ve burn-rate eşikleri sayısal olarak tanımlı değil.; Yayın kararının nerede kayıt altına alınacağı ve hangi geçitle bağlanacağı (CI/CD) belirsiz.; Bağımlılık açıkça yazılmamış: observability-5 ve observability-7 tamamlanmadan bu madde başlayamaz.

Sonraki adım önerisi: slo-policy--implementation, observability-5 ve observability-7'ye bağımlı olarak işaretlenmeli. Tek bir pilot yolculuk seçilmeli; örnek aday, recorder_starts_total outcome oranı. SLI formülü, hedef, pencere ve iki burn-rate eşiği bir sayfada yazılmalı. Yayın kaydının yeri belirlenmeli.

Mevcut birincil görev: `slo-policy--implementation`. Kaynak: `suite/suite/meet/recorder-server/src/app.ts:169`; `suite/suite/meet/recorder-server/src/app.ts:171`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:85`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

İdempotent oluşturma ve çıkış öncesi teslim/saklama kabulü iyi tanımlı. Site oluşturma/silme/yedek komut kaynağı (frappe/commands, bench) pakette yok, bu yüzden yerel yetenek bilinmiyor. is_fc_site yalnızca bir Frappe Cloud işaretidir, yaşam döngüsü kanıtı değildir.

Eksik: Kiracı durum makinesi tanımsız (provisioning/active/suspended/closing/closed) ve askıya almanın oturum/API etkisi yok.; İdempotency anahtarı ve tekrar deneme sözleşmesi yok.; Saklama süresi, veri teslim formatı ve silme kanıtı tanımsız.; Bench/Frappe 17-dev CLI komut eşlemesi doğrulanmamış.

Sonraki adım önerisi: tenant-registry--implementation-mvp için durum makinesi ile idempotency anahtarını tek tabloda tanımla. Kullanılacak site komutlarını frappe/commands kaynağından Frappe 17-dev'e göre ayrıca doğrula.

Mevcut birincil görev: `tenant-registry--implementation-mvp`. Kaynak: `frappe/frappe/website/utils.py:213`; `suite/pyproject.toml:45`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Deneme taşıması ve geri dönüş kabulü var. Yedekleme/geri yükleme komut kaynağı pakette yok. Suite S3 dosyaları, yerel arama indeksi ve site dışı servisler taşımanın kapsamına girmesi gereken ama talimatta geçmeyen bileşenler.

Eksik: RPO/RTO, kesinti penceresi ve geri dönüş tetik ölçütü tanımsız.; S3 nesneleri, tantivy indeksi ve harici servis durumunun taşıma sırası belirtilmemiş.; Keycloak kimlik eşlemesinin hedef ortamda korunma kuralı yok.; Paylaşımlı↔ayrılmış geçişte DNS/host değişikliği sorumluluğu ayrılmamış (teknik gereksinim ile uygulayan rol).

Sonraki adım önerisi: tenant-registry--implementation-scale için taşıma bileşen listesini ve geri dönüş ölçütünü yaz. Backup/restore komutlarını Frappe 17-dev kaynağından doğrula. Yeni altyapı önerme.

Mevcut birincil görev: `tenant-registry--implementation-scale`. Kaynak: `suite/pyproject.toml:88`; `suite/pyproject.toml:15`; `frappe/frappe/website/doctype/website_theme/website_theme.py:99`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kapsam koşullu olarak doğru tanımlanmış ve kabulde 'asıl ve temsil edilen kimlik ayrımı' isteniyor. İncelenen kesitlerde Frappe'nin yerleşik bir impersonation mekanizması görülmedi; bu, kaynakta yok demek değil, 'unknown' olarak kalmalı. İzin değerlendirmesi tek bir session.user üzerinden yapılıyor. WebDAV Basic/API key gibi alternatif giriş yolları da tek kimlik döndürüyor. Keycloak impersonation oturumunun hangi claim ile Frappe'ye taşınacağı, süre ve onay kuralları, korunan roller ve alternatif giriş yollarının kapsamı tanımlanmamış.

Eksik: Keycloak impersonation çıktısının (impersonator kimliği) Frappe oturumuna ve audit kaydına nasıl taşınacağı tanımsız; yerel OAuth kodu yalnızca genel bir provider akışı gösteriyor.; Frappe'nin yerleşik impersonation özelliğinin yerel v17 dev kaynağında olup olmadığı doğrulanmadı; Keycloak ile Frappe-native arasında seçim yapılmamış.; Süre, gerekçe, onaylayan kişi ve impersonate edilemeyecek roller (Administrator/System Manager) belirtilmemiş.; WebDAV, API key ve realtime gibi alternatif giriş yollarında destek oturumunun nasıl engelleneceği ya da izleneceği belirtilmemiş.

Sonraki adım önerisi: support-grant--implementation öncesinde yerel frappe/core/doctype/user kaynağında yerleşik impersonation olup olmadığı salt-okunur olarak doğrulanmalı. Ardından tek bir yol seçilmeli: Keycloak ya da Frappe-native. Destek izni kaydının alanları (talep eden, hedef, gerekçe, bitiş, onaylayan) ve log biçimi (actor/subject) yazılmalı.

Mevcut birincil görev: `support-grant--implementation`. Kaynak: `frappe/frappe/permissions.py:107`; `frappe/frappe/utils/oauth.py:107`; `suite/suite/drive/webdav/auth.py:35`; `suite/suite/meet/sfu-server/src/server/AuthManager.ts:97`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni test edilebilir: kanal bazında geri çekme sonraki gönderimi durduracak; zorunlu ve isteğe bağlı çerez ayrışacak. Ancak gönderimden önce izni kontrol eden nokta tanımlı değil. Kurulu Suite Mail ve `frappe.sendmail` gönderim yolu var. Frappe'nin unsubscribe/Newsletter kaynakları bu pakette yok, bu yüzden yerel yetenek bilinmiyor.

Eksik: Çerez kategorileri listesi ve React/Vite istemcide tercih saklama/okuma sözleşmesi tanımlı değil.; Pazarlama gönderiminin geçeceği tek kontrol noktası tanımlı değil: Suite Mail mi, `frappe.sendmail` mi, dış ESP mi?; İşlemsel ileti ile ticari ileti ayrımının hangi alan veya bayrakla yapılacağı tanımlı değil.; Frappe'nin Email Unsubscribe/Newsletter yetenekleri v17 kaynağında incelenmedi.

Sonraki adım önerisi: Frappe v17 kaynağında Email Unsubscribe/Newsletter ve sendmail unsubscribe yolu salt okuma ile incelensin. Sonra `consent-evidence--implementation` görevine tek bir gönderim öncesi izin kontrolü kuralı ile işlemsel/ticari bayrağı yazılsın.

Mevcut birincil görev: `consent-evidence--implementation`. Kaynak: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:146`; `suite/pyproject.toml:6`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Bu madde dış/altyapı doğrulaması olarak doğru sınıflanmış. Kaynakta alt işleyen temas noktaları görünüyor (S3/boto3, Anthropic SDK, site dışında çalışan SFU/recorder/collab servisleri); bölge kısıtlayan bir mekanizma görülmedi. Onaylı bölge listesi ve engelleme noktası talimatlarda yok.

Eksik: Onaylı bölge listesi ve koşullu kapsamın tetikleyicisi yok; S3 bucket bölgesi, Sheets AI sağlayıcısı ve standalone servislerin konumu envantere bağlanmamış; 'Yasak bölgeye aktarımı engelle' için teknik uygulama noktası (yapılandırma doğrulaması mı, egress politikası mı) tanımsız; DevOps tarafının teknik devri (Hüseyin Cengiz) ve kabul kanıtı tanımlı değil

Sonraki adım önerisi: residency-policy--implementation görevine kaynakta görülen alt işleyen listesini (S3, Anthropic, Meet SFU/recorder, Sheets collab) ekle. Engelleme kontrolünü Hüseyin Cengiz'in altyapı devrine ve yapılandırma doğrulamasına bağla.

Mevcut birincil görev: `residency-policy--implementation`. Kaynak: `suite/pyproject.toml:32`; `suite/pyproject.toml:15`; `suite/suite/drive/utils/files.py:38`; `suite/pyproject.toml:88`.

#### governance-7 — Yedekten dönüşte daha önce silinmiş verilerin yeniden silinmesi.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü (servis açılmadan yeniden silme). Ancak restore ya da migrate kanca noktası bu excerpt'te görünmüyor. Drive after_delete satırları iz bırakmadan siliyor; kalıcı tüketilmiş-ID deposu yalnızca SFU tarafında ve Frappe için yeniden kullanılabilir değil.

Eksik: Tombstone veri modeli tanımlı değil; tombstone'un kendisinin kişisel veri taşımaması gerekir (örneğin özetlenmiş anahtar); Restore sonrası karantina ve servis açılış kapısı için bench/Frappe kanca noktası belirtilmemiş; Arama ve AI kopyalarının yeniden temizlenmesi governance-3 yayılımına bağımlı, ama bu bağımlılık yazılmamış; Ayrı bir görev yok; retention-rule--implementation içinde alt kabul olarak tanımlanmalı

Sonraki adım önerisi: retention-rule--implementation içine 'restore sonrası yeniden silme' alt kabulünü ekle: tombstone şeması, restore sonrası karantina adımı ve governance-3 hedeflerinin yeniden çalıştırılması. Önce v17-dev'deki restore/after_migrate kanca kaynağını doğrula.

Mevcut birincil görev: `retention-rule--implementation`. Kaynak: `suite/suite/drive/overrides/file.py:143`; `suite/suite/meet/sfu-server/src/server/__tests__/RecordingGrantPersistenceFile.test.ts:59`.

#### security-1 — Security management (güvenlik yönetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Hedef ve kabul metni var: varlık, tehdit, kontrol ve sorumlu listesi isteniyor. Ancak tehdit modeli, Keycloak→Frappe oturum/token sınırı ve v17-dev sürüm eşlemesi tanımlı değil. Kaynakta tekil kontroller görülüyor: DocType izinleri, server script'in yalnız common_site_config ile açılması, realtime origin kontrolü. Suite çekirdek şifre güncelleme metodunu override ediyor ve allowlist'te test_helpers önekini bulunduruyor. Bunlar kontrol envanterine girmeli.

Eksik: Varlık/tehdit/kontrol matrisi ve her kontrolün sahibi (Hüseyin Cengiz / backend) yazılmamış.; Keycloak OIDC ile Frappe session/API key/OAuth bearer arasındaki kimlik eşlemesi ve oturum iptali tanımsız.; Suite override_whitelisted_methods (update_password) ve ALLOWED_WILDCARD_PATHS içindeki test_helpers öneki güvenlik incelemesine bağlanmamış.; Kaynak dokümanlar genel; yerel v17.0.0.dev0 kaynak commit'iyle eşleme yok.

Sonraki adım önerisi: security-baseline--implementation altında tek bir kontrol matrisi oluşturulsun. Mevcut kaynak kontrolleri (has_permission, safe_exec kapısı, rate limit, realtime origin, __Auth şifreleme) tehditlere eşlensin. Suite override'ları ve test_helpers allowlist'i karar maddesi olarak eklensin. Bütçe içinde en fazla 1-2 kritik kontrol için doğrulama koşulu seçilsin.

Mevcut birincil görev: `security-baseline--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/utils/safe_exec.py:87`; `frappe/realtime/middlewares/authenticate.js:21`; `suite/suite/hooks.py:203`; `suite/suite/hooks.py:450`.

#### security-2 — WAF (Web Application Firewall — web uygulaması güvenlik duvarı).

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

WAF doğru biçimde edge/harici kapsamda tutulmuş; kabul metni anlamlı (bloklama, meşru geçiş, geri alma). Ürün seçimi, dağıtım topolojisi ve istisna listesi yok. Kaynakta WAF'ın geçirmesi gereken yüzeyler görünüyor: /api/method RPC, OAuth2 token uçları, WebDAV /dav (Basic auth, WebDAV fiilleri) ve mail redirect'leri. WAF ürünü kaynak kapsamında değil.

Eksik: WAF ürünü/konumu (CDN, nginx/ingress) ve sahibi (Hüseyin Cengiz) seçilmemiş.; Geçmesi gereken route envanteri yok: /api/method, /api/v2, OAuth2/Keycloak callback, /dav (PROPFIND vb.), /outbound/*, socket.io.; Yanlış pozitif geri alma prosedürü ve log/izleme kanalı tanımsız.

Sonraki adım önerisi: edge-abuse--implementation için kaynaktaki url_rules, suite website_redirects ve allowlist'ten türetilmiş bir route/fiil istisna listesi çıkarılsın. WAF seçimi ve topolojisi Hüseyin Cengiz'in devir notunda karara bağlansın. Kabul testi production değişikliği olmadan staging'de planlansın.

Mevcut birincil görev: `edge-abuse--implementation`. Kaynak: `frappe/frappe/api/v1.py:152`; `suite/suite/hooks.py:417`; `suite/suite/hooks.py:436`; `suite/suite/drive/webdav/auth.py:1`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Tarama süreci kaynak dışında yürüyen bir CI işi ve CI yapılandırması bu alıntıda yok. Kaynakta yalnızca tedarik zinciri girdileri görünüyor: Frappe'de uv 7 günlük bekleme süresi ve güvenlik kütüphaneleri için istisna, Suite'te alt sınırı açık bırakılmış bağımlılıklar ve bench doğrulamasının dışında tutulan Node servisleri. Kabul metni anlamlı, fakat araç türleri, risk eşiği ve istisna süresi tanımlı değil.

Eksik: Tarama türleri (SAST, SCA, container image, secret) ve her birinin hangi repo/servis için çalışacağı belirtilmemiş. sfu-server, recorder-server ve collab-server bench validation dışında, ayrı tarama kapsamı gerektiriyor.; Yayını durduracak önem eşiği, istisnanın en uzun süresi ve onaylayacak kişi tanımsız.; Suite'teki '>=' bağımlılık aralıkları kilit dosyası olmadan tekrarlanabilir taramayı zorlaştırıyor. Lockfile bu alıntıda görünmüyor.; Suite ruff seçiminde güvenlik kural seti yok. Bu bir SAST yerine geçmez, ama eksikliğin kaydedilmesi gerekiyor.

Sonraki adım önerisi: vulnerability-scan--implementation için tek bir eşik/istisna politikası yazılmalı: önem → blokla/uyar, istisna için en uzun süre ve sorumlu. Kapsam listesine Frappe app, Suite app, üç bağımsız Node servisi ve dağıtım imajı ayrı satırlar olarak eklenmeli. CI kurulumu Hüseyin Cengiz'e devredilmeli.

Mevcut birincil görev: `vulnerability-scan--implementation`. Kaynak: `frappe/pyproject.toml:228`; `frappe/pyproject.toml:229`; `suite/pyproject.toml:19`; `suite/pyproject.toml:89`.

#### security-12 — Risk temelli penetrasyon testi; kapsam, bağımsız bulgu, düzeltme ve yeniden test kanıtı.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Penetrasyon testi kaynak dışında yapılan bir doğrulama faaliyeti. Kaynak yalnızca test edilecek yüzeyi gösteriyor: genel RPC rotası, başlıktan okunan realtime site adı, izinli listede yer alan test_helpers ön eki ve replay korumalı recorder callback'leri. Talimat odak alanlarını (tenant aşımı, yetki yükseltme, oturum) belirtiyor. Yetki/kapsam belgesi, ortam, tetikleme koşulu ve yeniden test kabul ölçütü ise eksik.

Eksik: Yetkili test kapsamı ve kurallar (hangi ortamda yapılacağı, production hariç tutulup tutulmayacağı, kimin onaylayacağı) tanımsız.; Koşullu kapsamın tetikleyicisi (önemli değişiklik tanımı, müşteri yükümlülüğü) ölçülebilir değil.; Kaynaktan çıkan yüksek riskli hedefler kapsam listesine bağlanmamış: X-Frappe-Site-Name ile site seçimi, suite.meet.api.test_helpers ön ekinin izinli olması, /api/method genel RPC rotası.; Bulguların security-9 vaka modeliyle ve security-11 takibiyle nasıl ilişkilendirileceği yazılmamış.

Sonraki adım önerisi: independent-pentest--implementation için tek sayfalık bir kapsam belgesi hazırlanmalı. Yukarıdaki kaynak kaynaklı hedefler öncelikli kapsam satırları olmalı. test_helpers ön ekinin production'da kapalı olduğu, testten önce ayrıca doğrulanacak bir ön koşul olarak işaretlenmeli. Kritik bulgunun kapanması için bağımsız yeniden test zorunlu kabul kriteri olarak yazılmalı.

Mevcut birincil görev: `independent-pentest--implementation`. Kaynak: `suite/suite/hooks.py:450`; `frappe/realtime/middlewares/authenticate.js:94`; `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:246`; `suite/suite/meet/recording/callback_auth.py:399`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü net: yetkili önizleme, tenant yalıtımı, çift kurtarma engeli, saklama süresi ve backup restore ayrımı tanımlı. Ancak not version-15 Deleted Document.restore kaynağına dayanıyor. Yerel Frappe 17.0.0.dev0 (adf1fd0) ve bu restore kodu excerpt içinde yok. Excerpt'te yalnız silme yolları görünüyor; Suite uygulamaları da kendi çöp kutusu ve purge mekanizmalarını kullanıyor.

Eksik: Deleted Document restore davranışı ve izinleri v17 kaynağında doğrulanmadı; version-15 notu yerel sürüme bağlanmadı.; 'Tenant' kavramının Frappe site, User Permission veya alan bazlı ayrımdan hangisine karşılık geldiği tanımlı değil.; WriterDocument.on_trash bağlı Writer Version kayıtlarını doğrudan siliyor. Bu nedenle ilişkili kayıtların kurtarma sözleşmesi eksik.; Suite'in kendi trash/purge akışlarının (Drive, Sheets) Deleted Document ile ilişkisi ve hangisinin kaynak kabul edileceği belirsiz.; Saklama süresi ve kalıcı silme politikasının hangi DocType/ayar ile yönetileceği belirtilmemiş.

Sonraki adım önerisi: Önce v17 kaynağında deleted_document.py restore yolunu ve izin denetimlerini okuyup notu güncelle. Ardından record-integrity--implementation-post-mvp görevine 'ilişkili kayıt + Suite trash eşlemesi' ve tenant tanımını kabul ön koşulu olarak ekle.

Mevcut birincil görev: `record-integrity--implementation-post-mvp`. Kaynak: `frappe/frappe/api/v1.py:72`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`; `suite/suite/hooks.py:299`; `suite/suite/hooks.py:295`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hata enjeksiyon senaryoları ve kabul ölçütü güçlü: dört günlük kesinti, çökme, commit/ack arası kesinti, yedekten geri dönüş ve mutasyon kimliğiyle karşılaştırma tanımlı. Ancak sorumlu bileşen henüz kaynakta olmayan istemci uygulamaları: React, Tauri2 ve PWA. Mevcut Suite frontend'i Vue/frappe-ui kullanıyor ve çevrimdışı kuyruğu yok. Mevcut e2e testleri yalnız çevrimiçi kalıcılığı (reload) sınıyor.

Eksik: Dört günlük gerçek bekleme yerine simüle saat ve yetki süresi enjeksiyonu tanımlı değil. Mevcut insan test bütçesiyle (5 dk) gerçek süre uyumsuz.; Platform bazında kalıcı depolama (IndexedDB eviction, Tauri dosya/SQLite) ve 'commit tamamlandı' noktası eşlenmemiş.; integrity-7/8 sözleşmeleri olmadan kabul paketi uygulanamaz. Bağımlılık sırası açık değil.; Kanıt kaydı formatı (mutasyon kimliği karşılaştırma çıktısı) belirtilmemiş.

Sonraki adım önerisi: client-offline-faults--implementation'a ön koşul olarak integrity-7 sözleşmesini ve simüle-saat gereksinimini yaz. Fault matrisini tek tabloda tut; yeni altyapı veya test önerme.

Mevcut birincil görev: `client-offline-faults--implementation`. Kaynak: `suite/frontend/src/apps/writer/composables/useDocument.ts:2`; `suite/e2e/drive-backed-apps/specs/writer/documents.spec.ts:32`; `suite/frontend/src/router/documentTitle.test.ts:2`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

İncelenen kesitlerde vektör ya da embedding kodu yok; Qdrant da bağımlılıklarda yok. Bu, yalnızca görülen kesitler için geçerli bir tespit. Kabul kriteri anlamlı (tenant izolasyonu ve indeks sürümü), ancak embedding modeli, sahibi ve izin süzme sırası tanımsız. GenUI ve AI kayıtlarıyla arasındaki sınır da belirtilmemiş.

Eksik: Embedding üretim sahibi, model ve sürüm kimliği, yeniden üretim tetikleyicisi tanımlı değil.; Vektör sonuçlarına Frappe kayıt ve alan izninin ne zaman uygulanacağı (pre/post filter) yazılmamış.; Tenant anahtarı Frappe site ya da namespace ile eşleştirilmemiş. SearchStore'daki namespace deseni yeniden kullanılabilir.; Kapsam koşullu değil, 'implementation' olarak işaretlenmiş; bağımlılık search-4'e bağlanmamış.

Sonraki adım önerisi: vector-search--implementation görevini search-4 izin sözleşmesine bağımlı yap. Embedding sürümünü ve tenant anahtarını tanımla, yeni bir registry açmadan koşullu olarak sırala.

Mevcut birincil görev: `vector-search--implementation`. Kaynak: `suite/suite/store/search_store.py:46`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü anlamlı: döngü engeli, taşıma ve çoklu etiket araması isteniyor. Ancak veri modeli kararı yok. Ağaç DocType (is_tree), etiket ve Table MultiSelect seçenekleri arasında seçim yapılmamış. Kaynak alıntılarında yalnız is_tree bayrağı görülüyor. NestedSet ve Tag kaynağı alıntıda yok, bu nedenle yerel yetenek bilinmiyor.

Eksik: taxonomy-term görevinde Frappe ağaç DocType'ı (is_tree/NestedSet) mı, yerleşik etiketleme mi, özel bir Table MultiSelect bağlantı DocType'ı mı kullanılacağı belirsiz.; Kategori taşıma ve çoklu etiket araması için izin ve kiracı (tenant) kapsamı tanımsız.; Döngü engelinin yerel NestedSet doğrulamasına mı dayanacağı, ek doğrulama mı gerektireceği belirtilmemiş. İlgili kaynak alıntıda yok.; Sürümsüz doküman bağlantıları; Frappe 17-dev tree API eşlemesi yok.

Sonraki adım önerisi: Görevde modeli sabitle: kategori için is_tree=1 olan custom DocType, etiket için Table MultiSelect ile bağlantı DocType'ı (ya da yerleşik etiketleme). Sonra nestedset ve tag kaynağını okuyup döngü ve taşıma davranışını doğrula. Yeni bir taxonomy motoru yazılmamalı.

Mevcut birincil görev: `taxonomy-term--implementation`. Kaynak: `frappe/frappe/core/doctype/doctype/doctype.js:116`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:74`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: EICAR yayınlanmaz, scanner yokken fail-closed. Ancak karantina durum modeli ve entegrasyon noktası tanımlı değil. WebDAV PUT'ta bir upload validator çağrısı var, içeriği görülmedi. Bağımlılıklarda ClamAV istemcisi yok. Drive durum sabitlerinde de karantina durumu görülmedi.

Eksik: Karantina durumu tanımsız: yeni File status mu, yayın öncesi bekletme mi? GET/PROPFIND/Drive listesinde gizleme kuralı yok.; Tarama noktası (_run_upload_validators vb.) ve senkron/asenkron (RQ) kararı belirtilmemiş.; Scanner erişilemezken 'onaylı görünmeme' kuralının S3 presigned yönlendirmesi (drive_webdav_s3_redirect) dahil tüm indirme yollarına uygulanacağı yazılmamış.; ClamAV servisinin sahibi ve dağıtımı (Platform: Hüseyin Cengiz) ile sürüm/imza güncelleme sözleşmesi yok.

Sonraki adım önerisi: malware-scan--implementation için önce _run_upload_validators'ın tanımını ve Drive upload kancalarını okuyun. Karantina durumu ile fail-closed okuma kuralını tek sayfalık bir sözleşme olarak yazın. ClamAV servis devrini platform görevine bağlayın.

Mevcut birincil görev: `malware-scan--implementation`. Kaynak: `suite/suite/drive/webdav/put.py:153`; `suite/suite/drive/webdav/get.py:87`; `suite/suite/sheets/patches/integrate_with_drive.py:3`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni ayrıntılı (bilinmeyen bileşen ve yetkisiz eylem reddi, kesintide normal ekran, 320px). Ancak notta '1rem' yaklaşımı geçiyor; bu, 2026-10-14 tarihli 14 CSS px kararıyla çelişiyor. Kurulu Suite önyüzü Vue/frappe-ui; React/Ant Design X kaynağı bu snapshot'ta yok, bu yüzden durum bilinmiyor. Kullanıcının bağımsız GenUI projesiyle katalog sahipliği sınırı tanımlanmamış.

Eksik: Not ve kabul metnindeki '1rem' ifadesi güncel 14 CSS px minimumuna göre düzeltilmeli.; Katalog şemasının sürümü ve sahibi tanımsız; kullanıcının bağımsız GenUI projesindeki registry ile, Suite Sheets eylem sözleşmesiyle ve sunucu sorgu/eylem registry'si ile birleştirilmeyeceği yazılmamış.; Kesinti senaryosunda yerel kayıt ve senkronizasyon kuyruğunun hangi göreve bağlı olduğu belirtilmemiş.

Sonraki adım önerisi: ui-family-39 görevinin metnini düzeltin: 1rem yerine 14 CSS px yazılsın; katalog sözleşmesinin sahibi belirtilsin ve GenUI yalnızca dış tüketici olarak anılsın. ui-provider-registry ile kapsam ayrımını tek satırla kaydedin.

Mevcut birincil görev: `ui-family-39--implementation-post-mvp`. Kaynak: `suite/frontend/src/apps/sheets/engine/sheet.js:6`; `suite/frontend/src/apps/writer/utils/docximporter.test.js:12`; `suite/suite/sheets/ai/client.py:51`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kalıcı state ve devir hedefi tanımlı. Ancak idempotency, tekrar deneme etkisi ve tenant izolasyonu sözleşmesi yok. Yerel kaynakta ajan hafızası ya da checkpoint görülmedi. Görülen tek ilgili temel, kullanıcı/yol/metod kaydeden isteğe bağlı API Request Log; bu bir yürütüm geçmişi değil.

Eksik: Yeniden denemede çift yazmayı önleyecek idempotency anahtarı tanımsız.; Hafızanın nerede tutulacağı belirsiz (orkestratör mü, Frappe DocType mı) ve tenant izolasyonu tanımsız.; Devirde iznin aynen mi taşınacağı yoksa yeniden mi değerlendirileceği yazılmamış.; API Request Log ayarla açılıyor ve gövde/sonuç tutmuyor; denetim izi gereksinimi tanımsız.

Sonraki adım önerisi: agent-run--implementation ve agent-step--implementation içinde: adım kaydı (run_id, step, araç, sonuç durumu, idempotency anahtarı) ve devirde yetkinin hedef ajanın kendi rolüyle yeniden kontrol edilmesi kuralını yazın.

Mevcut birincil görev: `agent-run--implementation`. Kaynak: `frappe/frappe/api/__init__.py:47`; `frappe/frappe/api/__init__.py:50`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (geçerli imza, değiştirilmiş gövde, tekrar) iyi. Ancak Frappe Webhook/HMAC kaynağı bu pakette görülmedi; outbound imza desteği kaynaktan doğrulanamadı. Görülen tek ilgili primitif, OAuth state için TTL'li tek kullanımlık cache anahtarı. Bu desen bir yol gösterir ama Redis tahliyesine açık, kalıcı bir replay deposu değil.

Eksik: İmza başlığı, algoritma, zaman penceresi ve saat kayması toleransı tanımsız; Replay tekilleştirme deposu (kalıcı benzersiz anahtar mı, TTL'li cache mi) seçilmemiş; Tenant başına imza sırrı ve rotasyon kuralı yok; Inbound uç: guest whitelist + imza zorunluluğu ve teslim denemesi kaydı saklama süresi belirtilmemiş

Sonraki adım önerisi: Önce Frappe Webhook DocType kaynağını v17-dev commit'inde oku ve HMAC başlığını doğrula. Ardından delivery-attempt--implementation görevine imza/pencere/kalıcı tekilleştirme sözleşmesini ekle.

Mevcut birincil görev: `delivery-attempt--implementation`. Kaynak: `frappe/frappe/utils/oauth.py:160`; `frappe/frappe/utils/oauth.py:173`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul metni güçlü: kiracı/alan yasağı, derinlik/maliyet sınırı, N+1 bütçesi. Görülen kesitlerde GraphQL kütüphanesi veya uç noktası yok, ama pyproject kesiti kısmi. Resolver'ların yeniden kullanacağı izin ve liste primitifleri mevcut. Kütüphane seçimi ve REST/hata sözleşmesine bağımlılık yazılmamış.

Eksik: GraphQL kütüphanesi ve Python 3.14 uyumu seçilmemiş.; Resolver kuralı açık değil. frappe.client.get_list/get_doc ve has_permission üzerinden gitmeli. frappe.db.sql veya ignore_permissions yasak.; Alan seviyesi izin (permlevel) ile şema görünürlüğü ayrımı belirtilmemiş.; integration-8 hata şeması ve integration-9 sürüm sözleşmesine bağımlılık yazılmamış.; Subscription kapsam dışı notu var ama hangi taşıma kullanılacağı ertelenmiş.

Sonraki adım önerisi: graphql-api--implementation'ı integration-8/9 tamamlanmasına bağla. Resolver kuralını (yalnız native izinli okuma/yazma yolları) ve kütüphane seçimini tek paragraf olarak ekle.

Mevcut birincil görev: `graphql-api--implementation`. Kaynak: `frappe/frappe/permissions.py:82`; `frappe/frappe/client.py:26`; `frappe/frappe/api/v1.py:84`.

#### integration-11 — SOAP entegrasyonu; WSDL/XSD sözleşmeli servis sunma ve tüketme.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

WSDL/XSD doğrulama ve güvenli SOAP fault kabul ölçütü tanımlı. Görülen kaynakta SOAP/WSDL araç zinciri yok. lxml yalnız suite/drive bağımlılığı olarak görünüyor. Sağlayıcı, SOAP sürümü ve barındırma rotası belirsiz.

Eksik: Hedef sağlayıcı, SOAP 1.1/1.2 ve WS-Security ihtiyacı bilinmiyor.; İstemci/sunucu kütüphanesi seçilmemiş.; Sunucu tarafının nasıl bağlanacağı tanımsız: whitelisted method mı, before_request dispatcher mı? Suite WebDAV dispatcher'ı örnek alınırsa global hook riski var.; Kimlik bilgisi saklama deseni (Password alanı + get_decrypted_password) belirtilmemiş.; XML parser güvenliği (XXE kapalı) açıkça istenmemiş. lxml'i suite'ten dolaylı kullanmak bağımlılık sahipliği sorunu yaratır.

Sonraki adım önerisi: soap-api--implementation'a önce somut sağlayıcı ve WSDL örneği girdisi ekle. Bu gelmeden build başlamasın. Kütüphane ve parser güvenlik kuralını kendi uygulama bağımlılığı olarak tanımla.

Mevcut birincil görev: `soap-api--implementation`. Kaynak: `suite/pyproject.toml:17`; `suite/suite/hooks.py:343`; `frappe/frappe/utils/oauth.py:147`.

#### integration-12 — XML canlı besleme; HTTP pull/push ile çift yönlü ve artımlı veri eşitleme.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

XML'in taşıma olmadığı ve cursor/silme/XXE/SSRF kabulü doğru tanımlı. Zamanlayıcı, HTTP istemcisi ve XML parser primitifleri kaynakta var. Besleme çekme/itme ve eşitleme mantığı yok. Çift yönlü çakışma kuralı ve checkpoint saklama sözleşmesi eksik.

Eksik: Cursor/checkpoint ve silme işareti için saklama DocType'ı tanımsız.; Çift yönlü eşitlemede çakışma çözümü ve yazma idempotency'si tanımsız.; Push alımı için kimlik doğrulama (imza/token) ve 429/boyut sınırı integration-8'e bağlanmamış.; Zamanlama kaynağı belirsiz: scheduler_events mi, Scheduled Job Type mı? Gecikme hedefinin sayısal değeri yok.; Egress allowlist ve parser yapılandırmasının sahibi atanmamış.

Sonraki adım önerisi: xml-feed--implementation için checkpoint DocType alanlarını, çakışma kuralını (kaynak öncelikli veya zaman damgası) ve sayısal gecikme hedefini ekle. Tek örnek XSD ile sözleşmeyi sabitle.

Mevcut birincil görev: `xml-feed--implementation`. Kaynak: `suite/suite/hooks.py:289`; `frappe/pyproject.toml:68`; `suite/pyproject.toml:17`.

#### integration-13 — MCP entegrasyonu; şemalı araç/kaynak kataloğu ve güvenli uzak erişim.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

MCP sürümü, Streamable HTTP/stdio ayrımı, audience ve yazma onayı kabulü belirgin. Görülen kaynakta MCP sunucusu yok. Frappe'nin kendi OAuth2 sağlayıcı uçları ve PyJWT var, ama Keycloak seçili. Araç→whitelisted method eşlemesi ve GenUI registry ayrımı yazılmamış.

Eksik: MCP tool/resource tanımlarının hangi native Frappe whitelisted method ve DocType izinlerine eşleneceği tanımsız.; Keycloak access token audience doğrulamasının nerede yapılacağı ve Frappe User'a nasıl eşleneceği tanımsız. Frappe oauth2 uçları ayrı bir sağlayıcı.; Bu katalog GenUI ve sunucu query-action registry'lerinden ayrı tutulmalı. Birleştirme yasağı açık yazılmamış.; Yazma onayı kaydı (kim, ne zaman, hangi argüman) ve audit hedefi tanımsız.; Suite'teki anthropic bağımlılığı (sheets AI Assist) MCP altyapısı sayılmamalı.

Sonraki adım önerisi: mcp-api--implementation'a kısa eşleme tablosu ekle: okuma araçları için 3-5 native method, yazma araçları için onay akışı. Keycloak audience doğrulama noktasını integration-9 kimlik ADR'sine bağla.

Mevcut birincil görev: `mcp-api--implementation`. Kaynak: `suite/suite/hooks.py:415`; `frappe/pyproject.toml:19`; `frappe/frappe/api/v1.py:152`; `suite/pyproject.toml:32`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Talimat transliterasyonu çeviriden doğru biçimde ayırıyor. Ancak hangi alfabe çiftlerinin destekleneceği, eklemeyi hangi koşulun tetikleyeceği ve nereye bağlanacağı (arama/link araması ya da veri girişi) belirtilmemiş. Sağlanan alıntılarda transliterasyon kodu görülmedi. Bu, kaynakta hiç olmadığı anlamına gelmez; durum bilinmiyor. Arama tarafında bağlanabilecek nokta search_widget.

Eksik: Alfabe çiftleri ve örnek veri seti belirtilmemiş; bu haliyle kabul ölçütü ölçülemez.; Özgün metin nasıl saklanacak (ör. ayrı Custom Field) ve aramada nasıl eşlenecek (search_widget/arama indeksi), tanımlı değil.; Ana görev ui-localization; asıl iş arama/backend olduğu hâlde backend sahibi ve bağımlılık atanmamış.; Kullanılacak dönüşüm kütüphanesi ve lisansı seçilmemiş.

Sonraki adım önerisi: Koşullu kapsam kararına bir tetikleyici yazılmalı (hangi dil çifti, hangi arama senaryosu). Seçim yapılmışsa mevcut göreve bir backend destek eşlemesi ve 3–5 örneklik kabul tablosu eklenmeli. Seçim yoksa madde ertelenmiş olarak işaretlenmeli.

Mevcut birincil görev: `ui-localization--implementation`. Kaynak: `frappe/frappe/client.py:11`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü erişilebilirlik ve kalıcı hata ayrıntısını kapsıyor. Kaynaktaki mesaj mekanizması (msgprint) Desk istemcisine bağlı. Sunucu mesajlarının headless yanıttaki biçimi bu excerpt'te görünmüyor.

Eksik: Frappe sunucu mesajlarını ve exception türlerini toast ile kalıcı hata paneline eşleyen sözleşme yok.; Hareket sözleşmesi, en az 14 CSS px metin, Ant Design bildirim bileşeni seçimi ve aria-live seviyesi talimatta bağlanmamış.; Toast kapandıktan sonra hata ayrıntısının nerede kalacağı tanımsız.

Sonraki adım önerisi: ui-family-06 görevine sunucu mesajı ve exc_type'tan bildirim düzeyine eşleme tablosu eklenmeli. Bu eşleme v17-dev yanıt örneğiyle doğrulanmalı. Ant Design bildirimi merkezi tokenlar ve hareket kurallarıyla kullanılmalı.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `frappe/frappe/permissions.py:8`; `frappe/frappe/email/doctype/auto_email_report/auto_email_report.js:17`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: ortak semantik tokenlar, 320 px, klavye odağı, hata ve büyütme durumları, sürümlü katalog, minimum metin boyutu. Yerel Frappe/Suite kaynağı Vue/frappe-ui ve yardımcı CSS sınıfları kullanıyor; seçilen Ant Design tasarım sistemine kaynak sağlamıyor. Headless React frontend kaynağı bu pakette yok, bu yüzden yerel yetenek bilinmiyor.

Eksik: Token kaynağı (tek doğruluk kaynağı) ve Ant Design ThemeConfig/semantik token eşleme sözleşmesi yok.; Onaylı bileşen kataloğunun yeri, sürümleme kuralı ve ui-provider-registry ile ilişkisi belirsiz. GenUI kaydıyla birleştirilmeyeceği yazılmamış.; Çevreleyen odak halkası yasağı, hareket (motion) sözleşmesi ve markalı açılır menü (dropdown) kuralları kabul metnine bağlanmamış.; Ant Design, Pro ve X sürüm sabitlemesi ile tarayıcı/giriş test matrisi belirtilmemiş.; 'Hazır tema kabul kanıtı değildir' denmiş, ancak kanıt türü (görsel fark, DOM/ARIA, hesaplanmış yazı boyutu) tanımlanmamış.

Sonraki adım önerisi: ui-family-01--implementation için tek bir token kaynağı ve Ant Design token eşleme tablosu yazılmalı. Ortak kurallar (odak halkası yok, 14 px minimum, motion tokenları, markalı Select) kabul ölçütüne bağlanmalı. Katalog sürümleme kuralı ui-provider-registry görevinde tanımlanmalı. Frontend kaynağı denetlenmeden yerel yetenek iddia edilmemeli.

Mevcut birincil görev: `ui-family-01--implementation`. Kaynak: `suite/frontend/src/shell/useWorkspace.ts:2`; `suite/frontend/src/shell/useWorkspace.ts:1`; `frappe/frappe/desk/page/workspace_restore/workspace_restore.js:62`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

scopeDecision bu maddenin tarihsel bir Capacitor alternatifi olduğunu, güncel mobil yolun ise Tauri 2 (channels-17) olduğunu söylüyor. Buna rağmen madde metni ve kabul ölçütü hâlâ Capacitor'u anlatıyor; görev eşlemesi ise tauri-mobile-package--implementation. Bu çelişki aynı işin iki kez sayılmasına yol açabilir. Kaynakta Capacitor ya da Tauri mobil izi yok.

Eksik: Madde metni ile görev eşlemesi çelişiyor (Capacitor ↔ tauri-mobile-package).; channels-17 ile aynı görevin çift sayılmasını önleyecek bir kural yok.; Keycloak callback için RFC 8252 yöntemi (deep link veya loopback) ve Frappe tarafında token doğrulama sınırı Tauri mobil için tanımlı değil.

Sonraki adım önerisi: Madde kimliğini koru, durumunu 'tarihsel/superseded → channels-17' olarak işaretle. tauri-mobile-package--implementation görevinin birincil sahibinin channels-17 olduğunu yaz. Capacitor kabul ölçütünü uygulama hedefi olarak kullanma.

Mevcut birincil görev: `tauri-mobile-package--implementation`. Kaynak: `suite/suite/hooks.py:440`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef açık: Tauri 2 ile Android, iOS ve masaüstü paketi, frontendDist ile gömülü Vite çıktısı. Uzak siteyi açmanın offline kabulü sayılmayacağı da belirtilmiş. Frappe ve Suite paketleme sağlamıyor. Suite, bench üzerinden sunucudan servis edilen bir Vue SPA ve kabulde reddedilen uzak site modeline örnek. React/AntD istemci kaynağı snapshot'ta yok.

Eksik: Tauri CLI, Android/iOS SDK ve minimum WebView sürümleri sabitlenmemiş (notta da açıkça belirtilmiş).; Gömülü origin'den (tauri custom scheme) Frappe v17 API'ye CORS/origin ve Keycloak redirect URI sözleşmesi yok.; İmza ve mağaza hesaplarının sahipliği belirsiz: Hüseyin Cengiz ile istemci ekibi arasındaki ayrım ve kabul ölçütü yazılmamış.; Ortak React frontend reposunun yeri ve build çıktısı yolu tanımlanmamış.

Sonraki adım önerisi: tauri-mobile-package--implementation için şu bilgiler sabitlenmeli: Tauri, SDK ve WebView minimum sürümleri; gömülü origin listesi; Keycloak redirect URI'leri. Frappe tarafında yalnız allow_cors ve OAuth ayarı gereksinimi Hüseyin Cengiz'e teknik devir olarak yazılmalı.

Mevcut birincil görev: `tauri-mobile-package--implementation`. Kaynak: `suite/pyproject.toml:95`; `suite/pyproject.toml:97`; `suite/suite/hooks.py:48`.

#### channels-18 — Tauri mobil cihaz iş akışları: belge fotoğrafı, barkod, güvenli dosya erişimi ve bildirimden yetkili kayda geçiş.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kapsam koşullu. İzin kabul/red/iptal, tenant ve deep link reddi kabulde var. Sunucuda dosya yükleme uç noktası ve belge okuma izin kontrolü mevcut, ancak cihaz yakalama, barkod ve push bildirim kaynakta yok. MVP'de hangi yeteneğin açılacağı seçilmemiş.

Eksik: MVP'ye giren yetenek alt kümesi seçilmemiş: kamera, barkod, dosya, bildirim.; Çevrimdışı eklenen dosyanın outbox üzerinden Frappe File/upload_file ile hedef belgeye bağlanma sırası ve boyut/tip sınırı tanımsız.; Deep link yolu ile Frappe belge izin kontrolü (read_doc/check_permission) arasındaki eşleme ve tenant doğrulaması tanımsız.; Push sağlayıcı (FCM/APNs) ve Frappe tarafındaki tetikleme kaynağı seçilmemiş. Frappe bunu hazır sağlamıyor.

Sonraki adım önerisi: tauri-device-capability--implementation için MVP yetenek listesi ve Tauri capability izin dosyası kapsamı belirlenmeli. Ek dosya akışı channels-15 outbox sözleşmesine bağlanmalı. Deep link açılışı her zaman sunucu izin kontrolünden geçmeli.

Mevcut birincil görev: `tauri-device-capability--implementation`. Kaynak: `suite/suite/hooks.py:423`; `frappe/frappe/api/v2.py:22`; `frappe/frappe/api/v1.py:83`.

#### channels-19 — Mobil yaşam döngüsü: sistem geri hareketi, klavye, safe area, arka plan dönüşü ve işletim sistemi sonlandırması.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Yaşam döngüsü riskleri ve kabul matrisi (320–390 px, gerçek cihaz, OS sonlandırması, outbox korunumu) tanımlı. Bu tamamen istemci davranışı; Frappe kaynağında karşılığı yok. Suite Calendar'da URL'yi tek doğruluk kaynağı yapan ve Back hareketini navigasyonla eşleyen bir desen var. Ancak bu Vue tabanlı ve TanStack Router'a doğrudan aktarılamaz.

Eksik: Android sistem geri hareketinin Tauri üzerinden TanStack Router geçmişine bağlanma sözleşmesi tanımsız: açık panel, dialog, taslak çıkışı.; Taslak (draft) ile outbox kaydı arasındaki sınır ve taslak saklama katmanı belirsiz. channels-15 ile ilişkisi yazılmamış.; Safe area ve sanal klavye için semantik token/inset kuralı ile hedef OS/WebView sürümleri belirlenmemiş.; Gerçek cihaz testleri insan test bütçesini aşıyor; sürüm öncesi kapsam ayrımı belirtilmemiş.

Sonraki adım önerisi: tauri-mobile-lifecycle--implementation için kısa bir kural yazılmalı: URL ve router durumu tek kaynak, Back önce açık katmanı kapatır, taslak her alan değişiminde yerel depoya alınır, outbox yalnız açık kayıtla oluşur. Gerçek cihaz kabulü sürüm öncesi kapsamına not_run olarak işlenmeli.

Mevcut birincil görev: `tauri-mobile-lifecycle--implementation`. Kaynak: `suite/frontend/src/apps/calendar/utils/mobileView.ts:27`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü ölçülebilir: 320/360/375/390 px, yatay telefon ve %400 zoom. Backend'in yeniden akış sağlamadığı doğru tespit edilmiş. Kaynakta yalnız Suite'in Vue telefon görünümü eşlemesi var. Seçilen React/Ant Design paneli kaynakta görülmediği için yerel yetenek bilinmiyor; Frappe get_meta yalnız sunum metadatasını sağlıyor.

Eksik: 'Ana yolculuk'un hangi ekranları kapsadığı tanımlı değil; liste, form ve dashboard ayrımı yok.; 14 CSS px minimum metin, tabloda kapsayıcı içi yatay kaydırma ve çevreleyen odak halkası yasağı kabul ölçütüne bağlanmamış.; Ant Design token ve breakpoint kararları ile 1 test dosyası / 3 senaryo bütçesinin hangi genişliklere dağılacağı belirsiz.; ui-family-01 MVP ile ui-family-09 ve ui-view-list arasındaki sorumluluk sınırı yazılmamış.

Sonraki adım önerisi: ui-family-01--implementation-mvp görevine tek bir ana yolculuk tanımlayın (ör. liste → kayıt formu). Bu yolculuk için 320 px ve %400 zoom kabulünü, 14 px, odak ve tablo kaydırma kurallarıyla birlikte yazın. Diğer genişlikleri N−1/N/N+1 olarak işaretleyin.

Mevcut birincil görev: `ui-family-01--implementation-mvp`. Kaynak: `suite/frontend/src/apps/calendar/utils/mobileView.ts:26`; `suite/frontend/src/apps/calendar/utils/mobileView.ts:50`; `frappe/frappe/api/v2.py:247`.

#### channels-5 — Erişilebilirlik: klavye, odak sırası, ekran okuyucu ve renk dışı durum işaretleri.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü somut: Tab/Shift+Tab, odak sırası, ekran okuyucu adları ve renkten bağımsız durum. Frappe kaynağında headless React/Ant Design erişilebilirliğiyle ilgili kanıt yok. Suite ön yüzü Vue/frappe-ui ile yazılmış; yalnız örüntü olarak okunabilir, kodu yeniden kullanılamaz.

Eksik: Hedef seviye (WCAG 2.2 AA) ve ölçülebilir eşikler kabul metninde açık değil.; Kalıcı odak politikası (çevreleyen halka yasağı, çevrelemeyen tek gösterge) ve Ant Design varsayılan odak stilinin kaynağında nasıl düzeltileceği tanımsız.; TanStack Router sayfa geçişinde odağın nereye taşınacağı ve sayfa başlığı/landmark sözleşmesi yok.; Asenkron durumlar için live region/ARIA durum sözleşmesi (kaydedildi, hata, senkron) tanımsız.; Doğrulama araçları ve tarayıcı matrisi (axe/Playwright, Chromium/Firefox/WebKit) ile insan bütçesine eşleme yok.

Sonraki adım önerisi: ui-family-01 için kabul metnine WCAG 2.2 AA'yı, odak göstergesi tokenını, route değişiminde odak hedefini ve renk dışı durum ikonu/metin kuralını ekleyin. Doğrulamayı mevcut tek test dosyası bütçesi içinde, klavye yolculuğunu kapsayan tek senaryo olarak planlayın.

Mevcut birincil görev: `ui-family-01--implementation-mvp`. Kaynak: `suite/pyproject.toml:6`; `suite/frontend/src/apps/calendar/utils/mobileView.ts:35`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü iyi tanımlı: ağ kesintisi ile sunucuya erişilememe ayrılıyor, 401/403 bağlantı arızası sayılmıyor, otomatik yeniden gönderim yok ve erişilebilir duyuru isteniyor. Alıntılarda genel amaçlı bir sağlık veya ping uç noktası ya da realtime bağlantı durumu kaynağı görünmüyor. Tek ilgili kod Suite Meet'e özgü tanı raporu; o da navigator.onLine değerini yalnız raporluyor. Bu nedenle yerel yetenek kanıtlanamıyor.

Eksik: Erişilebilirliği ölçecek kaynak seçilmemiş: hafif bir yöntem çağrısı mı, son başarılı uygulama isteği mi, realtime soket mi? İlgili Frappe kaynağı bu alıntılarda yok.; Not 'Frappe/Keycloak sürümleri seçilmedi' diyor; oysa yerel kurulum v17-dev. Bu eşleme güncellenmemiş.; Keycloak token süresinin dolması/yenilenmesi ile bağlantı hatasını ayıracak kural yok.; Yeniden bağlanma zamanlaması ve backoff tanımsız; Tauri, PWA ve WXT MV3 ortamlarındaki farklar ele alınmamış.; ui-family-06 ile ui-family-40 arasında sorumluluk sınırı yazılmamış.

Sonraki adım önerisi: ui-family-06--implementation tanımında şunları belirt: v17-dev hedefi; erişim sinyali olarak gerçek uygulama isteği sonuçları ve son başarılı temas; 401/403 hatalarının oturum durumuna yönlendirilmesi; mutasyonların otomatik yeniden gönderilmemesi. Realtime soket kullanımını ayrı bir karar olarak işaretle.

Mevcut birincil görev: `ui-family-06--implementation`. Kaynak: `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:75`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:76`; `frappe/frappe/api/v1.py:152`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kesitte BPMN içe/dışa aktarma ya da yürütümü görülmedi. Workflow Builder Desk'e bağlı ve beta; workflow_data yalnızca gizli bir JSON alanı. Görmemek global yokluk kanıtı değil. Talimatta kabul ölçütü var ama motor seçimi, desteklenecek BPMN alt kümesi ve Frappe adaptörü sözleşmesi yok.

Eksik: Desteklenecek BPMN öğeleri listelenmemiş.; Motor adayı ve lisans değerlendirmesi yapılmamış.; Hangi tarafın yetkili kaynak olacağı (Frappe Workflow mu, BPMN mi) belirlenmemiş.; Adaptörün Frappe izin ve doğrulama yollarını nasıl çağıracağı tanımsız.

Sonraki adım önerisi: İlerlemeden önce BPMN gerektiren gerçek bir süreç olup olmadığını kullanıcıyla netleştir. Gerekiyorsa process-definition--implementation-scale görevine yalnızca alt küme listesi ve 'desteklenmeyen öğeyi reddet' sözleşmesini ekle.

Mevcut birincil görev: `process-definition--implementation-scale`. Kaynak: `frappe/frappe/workflow/doctype/workflow/workflow.json:108`; `frappe/frappe/workflow/doctype/workflow/workflow.js:20`; `frappe/frappe/workflow/page/workflow_builder/workflow_builder.js:25`.

#### workflow-6 — Bekleme, süre aşımı, yeniden başlatma ve telafi adımları.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Automation Flow'un bekleme ve süre aşımı kaynağı bu kesitte yok. Geçiş görevleri (Webhook/Server Script, asynchronous bayrağı) var. Ancak idempotency, yeniden deneme ve telafi kaydı görülmedi. Talimat bunu doğru biçimde 'verify' olarak işaretliyor ama hedef sürümü ve kalıcı yürütüm sözleşmesini tanımlamıyor.

Eksik: Automation Flow'un yerel v17-dev kaynağında bulunup bulunmadığı doğrulanmamış.; Dış yan etkiler için idempotency anahtarı ve çift çalışmayı önleme sözleşmesi yok.; Telafi adımının kaydı ve sahibi tanımlanmamış.; Asenkron geçiş görevi başarısız olursa durum geri alınıyor mu, belirsiz.

Sonraki adım önerisi: Yerel kaynakta Automation Flow modülünün varlığını ve sürümünü doğrula. Sonra process-step--implementation-scale görevine idempotency ve telafi kaydı sözleşmesini ekle; yeni bir motor önerme.

Mevcut birincil görev: `process-definition--implementation-scale`. Kaynak: `frappe/frappe/model/workflow.py:19`; `frappe/frappe/model/workflow.py:156`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kimlik e-postalarını Keycloak'a bırakan sınır doğru tanımlanmış. Ancak Keycloak yapılandırması bu kaynak anlık görüntüsünde yok. Kurulu Suite Mail'in kendi signup/login/reset-password guest rotaları var. Talimat bu ikinci kimlik akışının nasıl devre dışı bırakılacağını ya da Keycloak'a yönlendirileceğini söylemiyor.

Eksik: Keycloak sürümü ve magic link kararı açık; karar sahibi ve tarihi yok; Suite Mail ve Frappe yerel giriş/parola sıfırlama rotalarının ürün akışındaki durumu (kapatma/yönlendirme) tanımsız; Keycloak e-posta teması, dil/marka ve SMTP sağlayıcısının email-3 ile ilişkisi belirtilmemiş

Sonraki adım önerisi: keycloak-login--implementation-mvp görevine Keycloak sürümünü ve magic link kararını yazın. Ayrıca Suite/Frappe yerel login, signup ve reset rotalarının ürün yolunda kullanılmayacağını ve nasıl yönlendirileceğini açıkça yazın.

Mevcut birincil görev: `keycloak-login--implementation-mvp`. Kaynak: `suite/frontend/src/apps/mail/routes.ts:35`; `suite/frontend/src/apps/mail/routes.ts:54`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (EventSource reconnect, heartbeat, son olay) anlamlı. Ancak scope kararı 'WebSocket veya SSE' diyor ve SSE'nin hangi tüketici için gerektiği seçilmemiş. Görülen kaynakta taşıma Socket.IO; SSE izine rastlanmadı. Bu görülmeyen kaynakta da olmadığını kanıtlamaz.

Eksik: SSE'nin gerekip gerekmediğine dair karar kapısı ve tüketici (ör. WXT MV3) tanımı yok; Last-Event-ID kalıcı olay günlüğü gerektirir; realtime-3 cursor sözleşmesiyle bağı yazılmamış; EventSource başlık gönderemez; Keycloak kimliği için cookie/kısa ömürlü bilet kararı yok; Proxy buffering/timeout davranışı tanımsız

Sonraki adım önerisi: sse-api--implementation için önce kısa bir karar kaydı yazın: SSE ancak somut bir tüketici Socket.IO kullanamıyorsa açılsın. Açılırsa realtime-3'teki aynı sıra numarası/cursor kaynağını kullansın, ayrı olay deposu kurulmasın.

Mevcut birincil görev: `sse-api--implementation`. Kaynak: `frappe/pyproject.toml:97`; `suite/frontend/src/apps/sheets/collab/hocuspocus-client.js:8`.

#### realtime-3 — Bağlantı yetkisi, yeniden bağlanma ve kaçırılan olayları tamamlama.

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Yerel kaynakta yeniden bağlanma denemesi ve sınırlı retry deseni var. Suite ise Frappe realtime relay'inde replay/resync olmadığını kendi kodunda açıkça belirtiyor. Bağlantı izni yalnız bağlantı anında kontrol ediliyor. Talimattaki 'deneysel handlerlar' ifadesi hiçbir sürüm/handler adına bağlanmamış.

Eksik: Sıra numarası/cursor'un kaynağı (kalıcı günlük mü, REST yeniden okuma mı) tanımsız; İzin iptalinde açık aboneliğin nasıl düşürüleceği tanımsız; mevcut desen yalnız connect anında has_permission kontrol ediyor; 'Deneysel handlerlar' için v17 adı/sürümü yok; Keycloak token yenilemesinin socket oturumuna yansıması tanımsız

Sonraki adım önerisi: En küçük adım: realtime'ı yalnız 'invalidation' sinyali saymak. Reconnect sonrası TanStack Query, /api/v2 kaynaklarını yeniden okusun (modified/cursor). İzin iptalini v17 can_subscribe_* yeniden kontrolüne bağlayan sözleşmeyi websocket-api--implementation'a ekleyin.

Mevcut birincil görev: `websocket-api--implementation`. Kaynak: `suite/frontend/src/apps/sheets/collab/hocuspocus-client.js:8`; `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:63`; `suite/frontend/src/apps/meet/composables/useGuestRealtime.ts:28`; `suite/suite/sheets/collab.py:54`.

#### realtime-4 — Kayıt üzerinde ekip yorumları, bahsetme ve takip etme.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (mention doğru kişiye gitsin, izinsiz kullanıcı yorumu görmesin) anlamlı. Ancak hangi native varlıkların yeniden kullanılacağı yazılmamış (Comment, Notification Log, Document Follow). Bu varlıkların kaynağı pakette yok. Görülen tek dayanak doküman düzeyindeki izin kontrolü.

Eksik: Yeniden kullanılacak native DocType'lar ve v17 API eşlemesi adlandırılmamış; Yorum görünürlüğünün referans kaydın read/share iznini miras alma kuralı yazılmamış; Mention ayrıştırma ve bildirim kanalı (realtime + Notification Log) bağı tanımsız; Kaynak görülmediği için native yetenek doğrulanmadı

Sonraki adım önerisi: native-comment--implementation için v17'de Comment, mention bildirimi ve Document Follow kaynaklarını okuyun. Bunları kayıt read iznine bağlayan headless uç nokta listesini yazın; yorum ORM'i kopyalamayın.

Mevcut birincil görev: `native-comment--implementation`. Kaynak: `frappe/frappe/permissions.py:94`; `frappe/frappe/api/v1.py:83`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef, sınırlar (workflow ve background job'dan ayrım) ve kabul ölçütü ayrıntılı. Ancak referans verilen CRM ve Helpdesk yerelde kurulu değil; kurulu uygulamalar yalnız frappe ve suite. 'En az iki iş modülü' yerel Suite modüllerinden seçilmemiş. Native ToDo/assign_to v17 kaynağı da pakette görülmedi.

Eksik: CRM/Helpdesk kurulu değil; referans yerel kaynakla doğrulanamaz; Kabul için iki modül (ör. Suite içinden) adlandırılmamış; Native ToDo/assign_to v17 API eşlemesi ve tekilleştirilmiş hatırlatma kaynağı tanımsız; Tenant izolasyonunun hangi izin katmanıyla (User Permission/share) sağlanacağı yazılmamış

Sonraki adım önerisi: native-assignment--implementation için v17 assign_to/ToDo kaynağını okuyun ve kuyruğu ToDo üzerinde izin süzgeçli get_list olarak tanımlayın. Kabul için kurulu iki Suite modülünü adlandırın; CRM/Helpdesk'i yalnız tasarım referansı olarak işaretleyin.

Mevcut birincil görev: `native-assignment--implementation`. Kaynak: `suite/pyproject.toml:6`; `frappe/frappe/client.py:26`; `frappe/frappe/permissions.py:82`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Amaç ve kabul ölçütü (doğrulanmış alıcıya gönderim, sağlayıcı hatasının kaydı) tanımlı. Ancak bu pakette WhatsApp, Telegram veya Discord adaptörüne ait kaynak görülmedi; bu, kurulumun tamamında bulunmadığı anlamına gelmez. Yerel kalıplar karışık: Drive bildirim oluşturmada hatayı log_error ile kaydediyor, e-posta gönderiminde ise hatayı sessizce yutuyor. Bu ikinci davranış kabul ölçütüyle çelişen bir örnek.

Eksik: Sağlayıcı kimlik bilgilerinin nerede saklanacağı ve kimlerin erişeceği tanımsız; secret'lar kaynak dışında tutulmalı.; Alıcı eşlemesi ile doğrulama ve opt-in sözleşmesi yok (telefon, chat_id, Discord kanal/webhook).; Gelen webhook ve geri bildirimler için imza doğrulaması, tekrar deneme ve hız sınırı tanımsız.; Bu kanalları sağlayacak ayrı bir Frappe uygulaması kurulacaksa uygulama kimliği ve sürüm eşlemesi verilmemiş; kurulu uygulamalar yalnız frappe ve suite.; Ortak bir hata kaydı modeli yok; sessizce yutma kalıbının yeniden kullanımı yasaklanmamış.

Sonraki adım önerisi: social-message-delivery--implementation görevini kanal başına ayrı adaptör sınırı olarak yaz. Her kanal için kimlik bilgisi saklama, alıcı doğrulama ve imzalı webhook sözleşmesini belirt. Sağlayıcı hatası frappe.log_error veya bir teslim kaydıyla izlenebilir olsun; 'except: pass' kalıbı açıkça yasaklansın.

Mevcut birincil görev: `social-message-delivery--implementation`. Kaynak: `suite/suite/drive/api/notifications.py:131`; `suite/suite/drive/api/notifications.py:159`; `suite/suite/drive/api/notifications.py:160`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: izinli kanal, hız sınırı ve tekrar izlenebilirliği, sahip ayrılınca görünürlük, iptalin gönderimi kesmesi. Teams API değişikliği riski de not edilmiş. Verilen kaynak alıntılarında Slack/Teams bağlayıcı kodu yok. Frappe çekirdeğinde bir Slack webhook primitive'i olup olmadığı bu alıntılardan doğrulanamıyor. Görünen tek ilgili parça asenkron gönderim için kullanılabilecek frappe.enqueue.

Eksik: v17 Frappe kaynağında Slack Webhook URL benzeri bir DocType ya da Notification kanalı olup olmadığı doğrulanmamış.; Kiracıya ait bağlantı kaydının modeli (webhook URL'si Password alanında mı, OAuth bot token mı), sahiplik ve DocPerm tanımsız.; Teams için hedef yol (Workflows mı, bot mu) seçilmemiş; sürüm bazlı doğrulamanın sahibi yok.; Hız sınırı (429/Retry-After) ve geçici hata tekrarlarının hangi kuyrukta, kaç denemeyle izleneceği tanımsız.; Bağlantı iptal edildiğinde kuyruktaki bekleyen işlerin iptal davranışı belirtilmemiş.

Sonraki adım önerisi: team-message-delivery görevinde önce v17 frappe/integrations kaynağında Slack primitive'i aranmalı ve sonuç kaydedilmeli. Ardından tek bir bağlantı DocType sözleşmesi (secret Password alanında, kiracı ve sahip, iptal durumu) ile enqueue tabanlı gönderim ve Retry-After kuralı yazılmalı. Teams yolu tek bir hedef API ile sınırlandırılmalı.

Mevcut birincil görev: `team-message-delivery--implementation`. Kaynak: `frappe/frappe/api/v2.py:293`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

İmzası bozuk veya süresi dolmuş lisans, ağ kesintisi ve deterministik grace süresi ölçüt olarak yazılmış. Ancak grace süresi 'kararlaştırılmış' denip belirlenmemiş, kurulum modeli de koşullu bırakılmış. İncelenen alıntılarda lisans doğrulama kaynağı görülmedi. PyJWT bağımlılığı tek başına bir yetenek sayılmaz. Suite AGPL-3.0 lisanslı; müşteri ortamında kaynak değiştirilebileceği için lisans denetiminin hangi güvenlik garantisini verebileceği belirsiz.

Eksik: Grace süresi, saat kayması toleransı ve süre dolunca uygulanacak kesme politikası (salt okunur mu, tam kesme mi) belirlenmemiş.; İmza anahtarı yönetimi ve rotasyonu, lisans içeriğinin şeması ve hangi hakları taşıdığı tanımsız.; AGPL-3.0 kapsamında lisans denetiminin hukuki ve teknik sınırı ele alınmamış. Bu konu kullanıcıyla netleştirilmeli.; entitlements-1 ile aynı hak modeline bağlanıp bağlanmayacağı belirtilmemiş.

Sonraki adım önerisi: Önce müşteri ortamına kurulumun kapsamda olup olmadığına ve grace değerine karar verin. Ardından imzalı lisansın entitlements-1 hak kaydına nasıl eşleneceğini görev metnine yazın; o zamana kadar uygulamayı ertelemek doğru.

Mevcut birincil görev: `entitlement-grant--implementation`. Kaynak: `suite/suite/hooks.py:11`; `frappe/pyproject.toml:19`; `suite/pyproject.toml:45`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: tek ödeme bildiriminden tek artış, kaynak ve son kullanma takibi, kiracı izolasyonu. Ancak ödeme sağlayıcısı seçilmemiş. Ödeme veya webhook alım kaynağı bu excerpt'lerde yok; ERPNext ve ödeme uygulamaları da kurulu değil. Defter tarafında yalnız usage-6'daki yapı taşları kullanılabilir. Ödeme tarafının yerel kabiliyeti bilinmiyor.

Eksik: Ödeme sağlayıcısı seçimi ve webhook doğrulama sözleşmesi (imza, replay koruması) yok.; Tüketilmiş kredi için ödeme iadesi kuralı yazılmamış; 'tutarlı çalışsın' ifadesi bir politika değil.; Kredi düşümünün hangi sırayla yapılacağı (FIFO, son kullanma önceliği) ve süresi dolan kredinin nasıl kaydedileceği tanımsız.; Para birimi, ondalık hassasiyet ve kredi birimi dönüşümü belirtilmemiş.; usage-6 defterine olan bağımlılık sırası talimatta açık değil.

Sonraki adım önerisi: Önce usage-6 defter sözleşmesi tamamlanmalı. Ardından aynı defterde grant/expire/clawback giriş türleri ve provider_event_id benzersizliği tanımlanmalı. Sağlayıcı seçimi ve tüketilmiş kredinin iade politikası kullanıcı kararı olarak açıkça işaretlenmeli.

Mevcut birincil görev: `usage-ledger--implementation`. Kaynak: `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`; `frappe/frappe/api/v2.py:164`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (bakiye/hizmet kararının tutarlı güncellenmesi) var. Ancak finans kaydı ve hak etkisi tanımlanmamış. ERPNext kurulu olmadığı için muhasebe kaydı native değil. Sağlanan alıntılarda iade/itiraz primitifi görülmedi.

Eksik: İade ve ters ibrazın hangi yerel kayda (credit note, bakiye düzeltmesi) yansıyacağı tanımsız.; Dispute sırasında hizmetin askıya alınması veya korunması kuralı yok.; ERPNext olmadan finans defterinin nerede tutulacağı belirtilmemiş.; Kısmi iadenin toplam tutarı aşmaması gibi invariant'lar yazılmamış.

Sonraki adım önerisi: Kapsam onaylanırsa iade/dispute olaylarının bakiye ve abonelik hakkı etkisini aynı görevde tek bir eşleme tablosu olarak tanımlayın. Finans defteri kararını (ERPNext yok) açıkça kaydedin.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:14`.

#### payments-4 — Tekrarlanan istekte ikinci tahsilatı önleme ve ödeme durumu uzlaştırma.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: tek tahsilat ve kopma sonrası uzlaştırma. Kaynakta görülen idempotency yalnız Payments controller'ına atıf yapan yardım metni; kurulu kod değil. Cloud billing'deki reconcile/checkout_status ise Frappe Cloud'un kendi faturalaması, tenant tahsilatı değil.

Eksik: Kalıcı işlem anahtarının kaynağı, kapsamı ve saklama süresi tanımsız.; Webhook event-id tekilleştirmesi için benzersizlik kısıtı veya kaydı belirtilmemiş.; Uzlaştırma tetikleyicisi (zamanlanmış iş mi, istek üzerine mi) ve çatışma çözüm kuralı yok.

Sonraki adım önerisi: Durum makinesi sözleşmesine üç alan ekleyin: idempotency anahtarı, sağlayıcı event-id benzersizliği, uzlaştırma kuralı. Bunları kabul ölçütündeki iki senaryoya (yinelenen istek, yinelenen webhook) bağlayın.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/core/doctype/server_script/server_script.js:76`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:69`.

#### payments-5 — Kart verisi yerine sağlayıcı tokenı (güvenli ödeme referansı) saklama.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (backend/log/export içinde PAN/CVV olmaması) ölçülebilir. Ancak toplama yüzeyi her istemci için seçilmemiş: Vite/PWA, Tauri2, WXT/MV3. Hosted checkout deseni yalnız Frappe Cloud billing'de görülüyor ve tenant için kullanılamaz.

Eksik: Her istemci için sağlayıcının güvenli toplama yüzeyi (hosted checkout, iframe/SDK) seçilmemiş.; Saklanacak izinli metadata listesi (son 4 hane, marka, son kullanma tarihi) tanımlanmamış.; Log ve export maskeleme kuralı ile Data Import/Export dışlaması belirtilmemiş.

Sonraki adım önerisi: Sağlayıcı seçilince istemci başına toplama yüzeyini ve izinli alan listesini tek paragrafla göreve ekleyin. Kart verisini backend'e taşıyan her akış açıkça yasaklansın.

Mevcut birincil görev: `payment-attempt--implementation`. Kaynak: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:57`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve açıklanabilir risk puanı kabulü tanımlı. Ancak ölçütler, kullanım olayı girdileri ve yenileme tarihinin hangi modelden geleceği yazılmamış; ERPNext kurulu olmadığı için abonelik/sözleşme verisi yok. Alıntılarda sağlık motoru görülmüyor; get_count gibi genel sayım ilkeleri ise motor sayılmaz.

Eksik: Kullanım düşüşü olay kaynağı ve zaman penceresi tanımsız; Yenileme tarihini taşıyan DocType yok (ERPNext kurulu değil); Puan formülü, eşikler ve 'açıklanabilirlik' çıktı biçimi yok; crm-6 görev üretimiyle arayüz sözleşmesi yok

Sonraki adım önerisi: account-health--implementation için önce veri sözleşmesini yaz: olay kaynağı, yenileme alanının sahibi ve iki-üç kurallı açıklanabilir puan. Motor geliştirmesini bu karara bağla.

Mevcut birincil görev: `account-health--implementation`. Kaynak: `frappe/frappe/client.py:78`.

#### crm-6 — Müşteri devreye alma kontrol listesi ve yenileme müdahale görevleri.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut (doğru kontrol listesi, tek müdahale görevi). Ancak CRM Task kurulu değil; şablon modeli, 'yeni müşteri' tetikleyicisi ve tekil görev için tekrar-önleme anahtarı tanımsız. Alıntılarda çekirdek ToDo/atama kaynağı görülmediği için yerel yetenek bilinmiyor.

Eksik: 'Yeni müşteri' olayının hangi DocType'tan geleceği tanımsız (CRM/ERPNext yok); Kontrol listesi şablonu ve tamamlanma modeli yok; 'Tek müdahale görevi' için tekrar-önleme (idempotency) anahtarı yok; crm-5 risk çıktısına bağımlılık sırası yazılmamış

Sonraki adım önerisi: onboarding-checklist--implementation görevine şunları ekle: tetikleyici kaynağı, şablon alanları ve müşteri+dönem tabanlı tekil görev anahtarı. Görev oluşturmayı izinli create_doc/insert yoluyla sınırla ve crm-5'i bağımlılık olarak işaretle.

Mevcut birincil görev: `onboarding-checklist--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü iki davranışı tarif ediyor: doğru adımda doğru yardım içeriği gösterilmeli ve tamamlanan adımlar saklanmalı. Ancak içerik kaynağı Helpdesk bilgi tabanına bağlanmış; Helpdesk kurulu değil. Frappe'nin yerel onboarding veya yardım DocType'ları incelenen alıntılarda görünmüyor, bu yüzden yerel yetenek bilinmiyor. Görülebilen yapı taşları yalnız genel REST CRUD ve izin kontrolü.

Eksik: Yardım içeriğinin sahibi belli değil: Helpdesk KB mi, Frappe'nin yerel yapıları mı, ayrı CMS mi?; Adım tamamlama durumunun hangi DocType'ta, kullanıcı mı tenant mı bazında tutulacağı tanımsız.; 'Doğru yardım içeriği' için bağlam anahtarı (route/DocType/adım ID) sözleşmesi yok.; ui-family-37--implementation görevi ile sorumluluk sınırı belirsiz.

Sonraki adım önerisi: Frappe kaynağında Module Onboarding ve Onboarding Step yapılarının varlığı ve v17-dev API'si doğrulansın. İçerik kaynağı ile adım durumu deposu tek karar notunda seçilsin. Bağlam anahtarı sözleşmesi onboarding-checklist--implementation altında tanımlansın.

Mevcut birincil görev: `onboarding-checklist--implementation`. Kaynak: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v1.py:83`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütleri (aynı adımdan devam etme, sunucuda tamamlanma doğrulaması) net. Ancak sunucu tarafındaki durum modeli tanımsız. Frappe'nin kendi onboarding modelinin yeniden kullanılıp kullanılmayacağı da belirtilmemiş. İlgili Frappe kaynağı excerpt'te görünmediği için yerel yetenek bilinmiyor. Yalnız genel REST CRUD temeli görülüyor.

Eksik: Çekirdek Module Onboarding/Onboarding Step DocType'larının yeniden kullanımı ya da yeni DocType kararı yok (kaynak excerpt'te yok).; Adım durumunun kapsamı (kullanıcı, tenant, rol) ve tamamlanmayı hangi sunucu kuralının doğrulayacağı tanımsız.; Bağlama duyarlı yardım içeriğinin kaynağı ve ekran–rota eşlemesi belirtilmemiş.; Kapsam gerekçesi destek kanalına bağlanmış. Onboarding'in destek modelinden bağımsız olduğu ayrıştırılmamış.; Kaynak URL'leri sürüm belirtmiyor; v17-dev ile eşlemesi yok.

Sonraki adım önerisi: onboarding-checklist görevine şunu ekleyin: yerel v17-dev kaynağında onboarding DocType'larının varlığını doğrulayın. Varsa yeniden kullanın; yoksa kullanıcı ve tenant kapsamlı tek bir adım-durum DocType'ı tanımlayın. Tamamlanma bir izinli whitelist yöntemle doğrulansın.

Mevcut birincil görev: `onboarding-checklist--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:83`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Bu grubun en ayrıntılı kabul metni bu: allowlist alanlar, token/cookie/form verisinin hariç tutulması, kullanıcı önizlemesi ve ham konsol dökümünün gönderilmemesi. Ancak hata kimliğinin sunucuda hangi kaynaktan üretileceği belirsiz; Error Log veya request id excerpt'te görünmüyor. Alıcı ve destek entegrasyonu, saklama süresi ve depolama/izin modeli de seçilmemiş.

Eksik: Hata kimliğinin kaynağı ve korelasyon sözleşmesi (sunucu log kimliği ↔ istemci) tanımsız.; Paketin nerede saklanacağı (DocType mı, Communication mı) ve hangi izinle yalnız yetkili alıcıya açılacağı belirtilmemiş.; Saklama ve silme süresi sayısal olarak verilmemiş.; Hedef Frappe sürümüne (v17-dev) eşleme yapılmamış; destek alıcısı (kurulu olmayan Helpdesk) seçilmemiş.

Sonraki adım önerisi: support-package görevine şunları ekleyin: istemci tarafında sabit alan allowlist'i belirleyin. Sunucuda tek bir whitelist yöntem, permission-check ile kaydı yalnız açık kullanıcı onayından sonra oluştursun. Hata kimliği kaynağını yerel kaynakta doğrulayın.

Mevcut birincil görev: `support-package--implementation`. Kaynak: `frappe/frappe/api/v1.py:50`; `frappe/frappe/core/doctype/communication/email.py:94`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (benzersiz canonical, eksik veri yayımlanmasın) anlamlı ve kapsam 'advanced' olarak doğru ertelenmiş. Website Generator kaynağı bu kesitlerde görülmedi. Kaynakta yalnız sayfalı liste API'si (varsayılan 20 kayıt) var; bu da kayıt başına sayfa üretimini kanıtlamaz. Görev content-2'deki render kararına bağlı, ancak bu bağımlılık talimatta yazılmamış.

Eksik: Hangi DocType'ın veri kaynağı olacağı ve veri kalitesi eşiği (zorunlu alanlar, en az içerik) tanımlı değil.; Slug benzersizliği, çakışma ve yönlendirme kuralı yok.; content-2'deki render/sitemap kararına bağımlılık açıkça belirtilmemiş.; Website Generator için v17-dev doğrulaması yok; headless frontend'de nasıl kullanılacağı belirsiz.

Sonraki adım önerisi: programmatic-seo--implementation görevine content-2 bağımlılığı eklenmeli. Örnek veri kümesi için şu kurallar tanımlanmalı: kaynak DocType, zorunlu alan kontrol listesi, slug benzersizliği ve eksik veride noindex/yayımlamama. Website Generator v17 kaynağı ayrıca okunmalı.

Mevcut birincil görev: `programmatic-seo--implementation`. Kaynak: `frappe/frappe/client.py:26`; `frappe/frappe/api/v1.py:22`.

#### content-4 — İçerik ve yorum moderation (yayına uygunluk denetimi).

Yönerge: **Kısmi**. Kaynak temeli: **Kısmi kaynak temeli**. İşlevsel kabul: `not_run`.

Kabul ölçütü (bekleyen yorum yayınlanmasın, karar ve gerekçe denetlenebilir olsun) somut. Ancak hangi içerik ve yorum türlerinin kapsamda olduğu belirtilmemiş. Kaynakta izin kontrolü ve doc_events ilkelleri var. Writer yorumları ise moderasyon durumu olmayan bir Yjs blob'u olarak saklanıyor ve allow_guest uç noktasından yazılıyor; bu uç nokta yalnız 'comment' izniyle korunuyor. Frappe Comment, Workflow ve Version kaynakları bu kesitlerde görülmedi.

Eksik: Kapsamdaki nesneler belirsiz: Web Page, Frappe Comment, Writer ycomments. Blog kurulu değil.; Durum modeli (pending/approved/rejected) ve yerel Workflow ile track_changes/Version yeniden kullanımı karara bağlanmamış.; Moderatör rolü ve izin seviyesi tanımlı değil.; Writer Yjs yorumlarında sunucu tarafında yayın kapısı yok; ön moderasyon yapılıp yapılmayacağı belirsiz.; Gerekçe kaydının nerede tutulacağı (Version mı, ayrı DocType mı) belirtilmemiş.

Sonraki adım önerisi: moderation-case--implementation için kapsam önce Web Page ve Frappe Comment ile sınırlandırılmalı. Durum alanı, Moderator rolü ve karar gerekçesi için yerel Workflow ile track_changes yeniden kullanılmalı. Writer Yjs yorumları açıkça kapsam dışı ya da ayrı bir karar olarak işaretlenmeli.

Mevcut birincil görev: `moderation-case--implementation`. Kaynak: `suite/suite/writer/doctype/writer_document/writer_document.py:112`; `suite/suite/writer/api/docs.py:121`; `suite/suite/writer/api/docs.py:124`; `frappe/frappe/permissions.py:82`; `suite/suite/hooks.py:224`.

#### content-5 — Changelog (değişiklik günlüğü) ve müşteri panelinde “Neler yeni?”.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: hedef kitleye görünürlük, taslak ve kısıtlı duyurunun gizli kalması. Ancak içerik modeli belirsiz; Web Page, Notification Log ya da yeni bir Release Note DocType arasında seçim yapılmamış. Gönderilen kaynak parçalarında changelog veya duyuru DocType'ı yok. Yalnız genel izin primitifleri ve Suite Drive bildirim yardımcısı görülüyor. Kaynak bağlantıları version-15'i gösteriyor, yerel kurulum ise 17.0.0.dev0.

Eksik: Duyuru modeli ve sahibi seçilmemiş (Web Page, Notification Log ya da yeni DocType); Blog Post, blog uygulamasına bağlı.; Hedef kitle kuralı (rol/tenant/plan) ve okundu (read-state) modeli için sözleşme yok.; Headless React panelinin hangi API ile okuyacağı belirsiz. Suite hooks /api/ yollarını wildcard ile reddediyor; izinli yol (allowlist) etkisi tanımlanmamış.; Kaynaklar v15'e eşlenmiş; v17 dev şeması doğrulanmamış.

Sonraki adım önerisi: release-note--implementation görevine yeni bir ID açmadan kısa bir karar notu ekleyin: v17 kaynağında model seçimini (Web Page ya da özel DocType artı Frappe izinleri), hedef kitle ve okundu alanlarını ve /api/v2 okuma yolunun Suite izinli yol listesiyle ilişkisini yazın. Kabul ölçütü olduğu gibi kalsın; durumu not_run.

Mevcut birincil görev: `release-note--implementation`. Kaynak: `suite/suite/writer/doctype/writer_document/writer_document.py:11`; `suite/suite/writer/api/docs.py:142`; `suite/suite/hooks.py:466`; `frappe/frappe/api/v1.py:83`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü var: gerekçeli red, itiraz, değişmez karar ve ihlal geçmişi. Ancak karar yetkisi, durum makinesi ve tenant kapsamı tanımlanmamış. Kaynak parçasında moderasyon DocType'ı yok; yalnız submit/cancel/amend ve has_permission gibi genel primitifler görülüyor. Bu bir ERPNext/HRMS yeteneği olmadığı için not_installed değil, unknown.

Eksik: Durum yaşam döngüsü tanımsız (kuyrukta, reddedildi, itirazda, kesinleşti).; Moderatör ve itiraz inceleyicisi rol ayrımı ile DocPerm eşlemesi yok.; Kararın değiştirilemezliği için docstatus (submit/amend) kullanımı açıkça seçilmemiş.; Hangi içerik türlerinin moderasyona girdiği ve tenant sınırı belirsiz.

Sonraki adım önerisi: moderation-case--implementation için kısa bir tasarım notu yazın: submittable bir vaka modeli, gerekçe alanı, itirazın bağlı kayıt olarak tutulması ve kararların amend ile değişmeden izlenmesi. Roller native DocType izinleriyle verilsin; ignore_permissions içeren yardımcılar dışarı açılmasın.

Mevcut birincil görev: `moderation-case--implementation`. Kaynak: `frappe/frappe/permissions.py:20`; `frappe/frappe/permissions.py:82`.

### Raporlama, ürün ve pazarlama ölçümü

#### analytics-1 — GTM (Google Tag Manager — Google etiket yöneticisi) bağlantısı.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Hedef ve kabul ölçütü (izin uyumlu yükleme, rota değişiminde tekrar yok) somut. Frappe hosted ayarının headless sayfaya otomatik uygulanmadığı doğru tespit edilmiş. Ancak kaynak olarak version-15 Website Settings şeması verilmiş; yerel kurulum 17.0.0-dev. Website Settings kaynağı bu pakette yok, bu yüzden yerel GTM alanı doğrulanamadı. Suite tek SPA rotası olarak sunuluyor; ilk yükleme sunucu tarafında, sonraki rota geçişleri istemcide.

Eksik: Version-15 kaynağı yerel v17-dev ile eşlenmemiş; hosted GTM alanının headless kabukta kullanılmayacağı açıkça yazılmamış.; Hangi kabuklarda geçerli olduğu belirsiz: Vite/PWA, Tauri2 ya da WXT/MV3. MV3 uzaktan kod yüklemeyi yasaklıyor, Tauri'de CSP kısıtı var; ikisi için GTM'nin hariç tutulması ya da alternatifi tanımlı değil.; TanStack Router rota olayına bağlı tek page_view sözleşmesi ve CSP/nonce kuralı yok.; İzin sırası analytics-6'ya bağlı; ama bu bağımlılık task eşlemesinde ayrı bir ön koşul olarak yazılmamış.

Sonraki adım önerisi: analytics-consent--implementation görevine kısa bir not eklenmeli: GTM yalnız web/PWA kabuğunda ve yalnız izin verildikten sonra yüklensin. page_view TanStack Router'ın tek bir geçiş olayından üretilsin. Tauri ve MV3 için GTM kapsam dışı ya da ayrı karar olsun. Version-15 kaynağı v17-dev için 'hosted-only, headless'a uygulanmaz' diye etiketlensin.

Mevcut birincil görev: `analytics-consent--implementation`. Kaynak: `suite/suite/hooks.py:48`.

#### analytics-2 — Google Analytics ve Yandex Metrica adaptörleri.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

İki sağlayıcının ayrı adaptörler olduğu ve PII/tenant verisinin dışarı çıkmaması gerektiği belirtilmiş. Kabul ölçütü ölçülebilir. Ancak ortak olay şeması (analytics-4) ile sağlayıcı alan eşlemesi tanımsız. İncelenen kaynakta GA ya da Metrica adaptörü yok. Frappe monitor modülü sunucu tarafı istek telemetrisi tutuyor, ürün analitiği adaptörü değil; dolayısıyla buna dayanılamaz.

Eksik: Adaptör arayüzü (track/identify/consent) ve sağlayıcı alan eşlemesi tanımsız.; Yandex Metrica ve GA için yurt dışı veri aktarımı (KVKK) ve veri çıkış izni kararı ile karar sahibi yok.; PII için bir yasak alan listesi yok; tenant_id/user_id'nin hash'lenip hash'lenmeyeceği belirsiz.; Webvisor/oturum kaydı gibi sağlayıcıya özgü özelliklerin varsayılan olarak kapalı olacağı yazılmamış.

Sonraki adım önerisi: analytics-consent--implementation görevinde tek bir adaptör sözleşmesi ve sağlayıcı başına alan eşleme tablosu tanımlanmalı; analytics-4 şemasına referans verilmeli. Yandex için veri aktarım kararı çıkmadan bu adaptör devre dışı bırakılmalı.

Mevcut birincil görev: `analytics-consent--implementation`. Kaynak: `frappe/frappe/monitor.py:23`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü net: izin yokken sıfır istek, geri çekmede durdurma, hassas alanlar payload dışında. Basic ve advanced consent ayrımı da doğru konmuş. İncelenen kaynakta bir izin kaydı ya da consent modülü yok. Ayrıca sunucu tarafı monitor logları istemci IP'sini kaydediyor; ön yüzdeki izin kontrolü bu sunucu telemetrisini kapsamaz, ama talimatta bu ayrım yok.

Eksik: İzin kaydının nerede tutulacağı, hukuki dayanak ve sürüm/kanıt alanları tanımsız.; Basic consent mi advanced consent mi seçileceği karara bağlanmamış; yalnız koşullu anlatılmış.; İzin geri çekmenin Tauri, PWA ve eklenti kabuklarına nasıl yayılacağı yazılmamış.; Hassas alan listesinin Frappe alan düzeyi izinleri ve tenant verisiyle bağı kurulmamış.; Sunucu monitor/IP saklama politikası ön yüz izin kapsamından ayrılmamış.

Sonraki adım önerisi: analytics-consent--implementation görevinde şunlar netleştirilmeli: sıfır istek hedefi için basic consent; izin kaydı modeli; geri çekme yayılımı; hassas alan yasak listesi. Monitor IP logu ayrı bir veri saklama maddesi olarak not edilmeli, bu görevin kapsamına alınmamalı.

Mevcut birincil görev: `analytics-consent--implementation`. Kaynak: `frappe/frappe/monitor.py:73`.

#### analytics-7 — Deney yönetimi: kullanıcı gruplarına ayırma, karşılaştırma ve sonuç izleme.

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü (kalıcı grup ataması, iki grupta aynı metrik ve pencere) anlamlı, ama yalnız sonuç düzeyinde. İncelenen kaynakta deney ataması ya da sonuç ürünü yok. Rapor ve sorgu ilkel parçaları sadece sayım yapıyor.

Eksik: Atama anahtarı (kullanıcı mı tenant mı), hash/seed kuralı ve atamanın saklanacağı yer tanımsız.; İstatistik yöntemi, örneklem ve guardrail metrikleri yok.; Deneyin izin durumuna (analytics-6) ve olay kataloğuna (analytics-4) bağımlılığı yazılmamış.; Deney ve özellik bayrağı (feature flag) ayrımı ile sunucu tarafı yetki sınırı belirsiz.

Sonraki adım önerisi: experiment--implementation görevi analytics-4 ve analytics-6'ya bağımlı olarak işaretlenmeli. Deterministik atama anahtarı ve tek metrik/pencere sözleşmesi yazılmalı. Analiz yöntemi seçilene kadar görev koşullu kalmalı.

Mevcut birincil görev: `experiment--implementation`. Kaynak: `frappe/frappe/website/report/website_analytics/website_analytics.py:57`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü güçlü: URL veya parametre değiştirilerek başka tenant'ın verisi sorgulanamamalı. Ancak gömme türü (statik/imzalı, interactive, SDK) ve lisans koşulu seçilmemiş. Adaptörün token imzalama yeri ve secret saklama yöntemi de belirsiz. Görülen kaynakta Metabase adaptörü yok. Frappe'de PyJWT bağımlılığı ve has_permission gibi primitifler bulunuyor, ama bunlar adaptörün varlığını kanıtlamaz. Excerpt kapsamı dışı kaldığı için durum unknown.

Eksik: Gömme türü ve buna bağlı lisans (açık kaynak sürüm mü, ücretli sürüm mü) kararı yok; lisansın kullanıcıyla netleştirilmesi gerekiyor.; Kilitli parametreler tanımlı değil: tenant/site kimliği sunucu tarafında imzalanmalı, istemciden alınmamalı.; İmzalama secret'ının saklanması, rotasyonu ve süre sınırı tanımlı değil.; Metabase'in veri kaynağı yalıtımı (tenant başına salt-okur DB kullanıcısı veya görünüm) tanımlı değil.; Rapor erişiminin Frappe rol/izin kontrolüne bağlanacağı nokta belirtilmemiş.

Sonraki adım önerisi: reports-2 kararıyla birleştirin. Seçilirse yalnızca sunucuda imzalanan, tenant parametresi kilitli statik gömmeyi tanımlayın: Frappe tarafında izin kontrolünden sonra kısa ömürlü token üretilsin. Parametre kurcalama senaryosunu paylaşılan test bütçesinden aday olarak kaydedin.

Mevcut birincil görev: `bi-embedding--implementation`. Kaynak: `frappe/pyproject.toml:19`; `frappe/frappe/permissions.py:82`.

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

Yönerge: **Kısmi**. Kaynak temeli: **Belirlenemedi**. İşlevsel kabul: `not_run`.

Kabul ölçütü somut: iki panoda aynı metrik aynı tanım ve değeri vermeli, geciken veri görünür uyarı üretmeli. Ancak metrik sözleşmesinin içeriği tanımlı değil. Kesitte yalnızca sayım için get_count gibi yapı taşları görülüyor; Report, Number Card ve Dashboard Chart kaynakları sunulmadığı için yerel yetenek bilinmiyor.

Eksik: Metrik sözleşmesi tanımlı değil: kimlik, formül, kaynak DocType/okuma modeli, filtre, zaman dilimi, sürüm ve sahip alanları yok.; Tazelik eşiği ve uyarının hangi kaynaktan (okuma modeli lag'i veya son hesaplama zamanı) üretileceği belirtilmemiş; reports-6'ya bağımlılık yazılmamış.; Birincil görev native-report--implementation; ancak metrik tanım ve sürüm yönetimi bir rapor görüntüleme işi değil, bu eşleme belirsiz.; Panoların metriği yeniden hesaplamak yerine ortak tanımı nasıl tüketeceği (tek hesaplama noktası) yazılmamış.

Sonraki adım önerisi: Mevcut görev eşlemesi korunmalı. native-report--implementation görevine 'metrik sözleşmesi' alt başlığı eklenmeli: metrik kimliği, formül, kaynak, sürüm, tazelik eşiği. reports-6 açıkça bağımlılık olarak yazılmalı. Number Card/Dashboard Chart kaynakları v17'de okunup mevcut bileşenlerle eşlenmeli.

Mevcut birincil görev: `native-report--implementation`. Kaynak: `frappe/frappe/client.py:78`; `frappe/frappe/api/v2.py:193`.

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

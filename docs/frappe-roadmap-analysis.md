# Frappe kaynak değerlendirmesi ve SaaS geliştirme rehberleri

15 Ekim 2026. `/saas` yalnız yazılım geliştirme yönergesi ve yol haritasıdır. **Uygulama durumu: uygulanmadı.** Ürün kodu, test, fixture, yerel site veya servis işlemi bu çalışmanın kapsamı değildir. GenUI, kullanıcı tarafından geliştirilen bağımsız projedir.

## Ne var, ne eksik?

12 ana başlığın 387 mevcut maddesi kaynakla değerlendirildi. Güncel kaynak sonucu **340 KISMİ, 7 VAR, 11 YOK, 29 kurulu değil — karar gerekli**. VAR bir native dayanak bulunduğunu gösterir; bütün ürün davranışının uygulandığını göstermez. YOK yalnız kaydedilen arama kapsamı içindir.

İlk kaynak incelemesi 72 madde paketi, ikinci inceleme 64 belirsiz madde için yapıldı; ikinci tur sonucu 53 KISMİ ve 11 YOK. Mevcut kanonik 387 gereksinim ve 994 taslak görev değiştirilmedi. Yeni görev registry’si veya ürün baseline’ı oluşturulmadı.

## Kaynak ve kanıt sınırı

İnceleme daha önce alınmış Frappe/Suite kaynak snapshot’larına dayanır. Frappe kaynak bildirimi `17.0.0-dev`, revizyonu `adf1fd0c2d6215ad4cac9976251198b2a35fbda6`; Suite bildirimi `0.0.1`, doğrulanmış kaynak commit’i bilinmiyor. Bunlar ürün repo/commit/build veya deployment kabulü değildir. Bu tur yalnız kaynak kesitleri okundu; siteye bağlanılmadı ve servis değiştirilmedi.

Her sözleşmede doğrulanmış dosya:satır alıntısı veya YOK ve aranan yollar bulunur. Native Frappe/Suite/Vue kaynakları headless React/Ant arayüzünün veya GenUI entegrasyonunun uygulandığı anlamına gelmez. Kaynak registry ile GenUI capability registry, JSON sınırı ile yerel callback/ReactNode ayrı tutulur.

## On iki ana başlık: ne var, ne tamamlanacak?

Aşağıdaki sıra kanonik manifest sırasıdır. “Kısmi/yeterli” yönerge değerlendirmesidir; uygulama teslim sayısı değildir.

| Başlık                                 | Madde | Yönerge kısmi / yeterli | Yeniden kullanılacak temel ve tamamlanacak yönerge                                                                                                                                               |
| -------------------------------------- | ----: | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| İşletim, dağıtım ve süreklilik         |    49 | 48 / 1                  | İncelenen kaynaklarda cache/iş kuyruğu temelleri var. Gerçek kaynak–build–sürüm eşlemesi, kapasite hedefi, yedek/geri dönüş ve dağıtım kabulü somutlaştırılmalı. Teknik sahip Hüseyin Cengiz.    |
| Müşteri, kimlik ve erişim              |    25 | 25 / 0                  | User/Role/site temelleri var. Tenant/site modeli, Keycloak kimliği → Frappe kullanıcı/rol/izin eşlemesi, oturum ve negatif erişim senaryosu eksik.                                               |
| Güvenlik, gizlilik ve veri yönetişimi  |    41 | 41 / 0                  | İzin ve belge yaşam döngüsü yapı taşları var. Alan/kayıt izolasyonu, dış istemci audit’i, saklama/silme ve doğrulanmış güvence sınırları açıklanmalı.                                            |
| Veri modeli, dosyalar ve arama         |    30 | 30 / 0                  | DocType, Custom Field, Property Setter ve Suite dosya yolları var. Etkin izinli metadata, revizyon ve şema değişim reçetesi eksik. Suite File override’ları dikkate alınmalı.                    |
| Entegrasyonlar, olaylar ve yapay zekâ  |    39 | 39 / 0                  | API/olay/iş kuyruğu yapı taşları var. Sürümlü query/action, hata/idempotency, harici AI sınırı ve olay teslim sözleşmesi eksik. GenUI’ye motor yazılmaz.                                         |
| Panel, ekranlar ve kişiselleştirme     |    57 | 57 / 0                  | Suite’in kendi UI kaynakları headless React/Ant ürün teslimi sayılmaz. İzinli metadata → ortak form/liste/detay, taslak koruma ve platform adapter sözleşmeleri tamamlanmalı. Grid kararı açık.  |
| İş süreçleri, kurallar ve zamanlama    |    26 | 26 / 0                  | Native workflow, validation ve zamanlama temelleri var. Desk bağımsız izinli eylem, işlem sınırı, tekrar ve hata kabulü tanımlanmalı.                                                            |
| Bildirim, e-posta ve ortak çalışma     |    23 | 23 / 0                  | E-posta/realtime yapı taşları var. Headless kanal yetkisi, reconnect, teslim/okundu ve harici bildirim sınırları eksik. Kaynakta kanal bulunması canlı teslim sayılmaz.                          |
| Modüller, paketler ve kullanım hakları |    39 | 39 / 0                  | Rol ve app mekanizması abonelik hakkının tamamı değildir. Paket/hak/kota veri sahipliği, sunucuda enforcement ve kurulu olmayan domain app eşlemesi tamamlanmalı.                                |
| Tahsilat, faturalama ve finans         |    15 | 15 / 0                  | Çekirdek belge/API temeli finans ürünü değildir. İncelenen uygulama kümesinde ERPNext yok; seçilecek app/sağlayıcı, lisans/sürüm, ödeme ve mutabakat sınırı kanıtlanmalı. Otomatik app kurulmaz. |
| Müşteri operasyonları ve içerik        |    27 | 27 / 0                  | Suite içindeki iletişim/takvim/içerik parçaları incelendi. CRM/destek domain kapsamı ve kurulu app karşılığı, izinli kaynaklar ve ortak ekran tüketimi eksik.                                    |
| Raporlama, ürün ve pazarlama ölçümü    |    16 | 16 / 0                  | Rapor/sorgu yapı taşları var. İzinli rapor projection’ı, ölçüm sözlüğü, veri kaynağı/tazelik ve harici analitik sınırı tanımlanmalı.                                                             |

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

## Rehber kapsamı ve geliştirme sırası

**PoC 27 + MVP 127 = 154 madde:** 11 Keycloak/grid kararı dışarıda; 143 madde için mevcut 68 sözleşme korunup pilot teslim atıflarından arındırıldı.

**MVP sonrası 187 + ölçek 33 + kurumsal güvence 13 = 233 madde:** 29 kurulu olmayan uygulama dayanağı ve 4 Keycloak maddesi dışarıda; kalan 200 madde 115 mevcut ortak birimde gruplandı. Bunların 8’i önceki sözleşmeleri genişletir, 107’si yeni rehber dosyasıdır. **Toplam 343 madde / 175 sözleşme; karar listesinde 44 madde.**

Sıra rehberdir: T-00 gerçek ürün baseline’ı → R-00 native yetenek eşlemesi → R-01 izinli/sürümlü kaynak projection sözleşmesi → R-02 ortak alanın iki config ile tüketimi. T-01 kimlik ve T-02 bağlantı sözleşmeleri gerçek bağımlılıklarına göre paralel tanımlanır; T-08 page→Frappe→page kabulü gelecekteki uygulamada erken ele alınır. Bu depoda bu akış uygulanmaz.

Her sözleşme tek ortak davranışı, native yeniden kullanımı, açık eksiği, mevcut bağımlılıkları, gelecekteki kabulü ve madde bazında tamamlama adımlarını ayırır. Daha sonraki aşamadaki bir madde aynı birim rehberini paylaşsa da asıl aşaması değişmez. Rehberde gelecek TDD kabulünün yazılması test açma veya koşma yetkisi değildir. Native geçen davranış için yapay RED önerilmez.

Rol/izin üreten her gelecek uygulama, `executionBacklog.sharedExecutionPolicy.explicitPermissionFlags` kuralındaki 13 izin bayrağını açıkça belirler; yalnız UI gizleme yetki sayılmaz. Teknik CI/deploy/rollback sahibi Hüseyin Cengiz; GoDaddy uygulaması Asistan Hüseyin’dedir. Bu rehber otomatik işlem yetkisi vermez.

## Sözleşme dizini

| Mevcut birim                | İlk aşama  | Madde | Rehber                                                                                                                                                                                                                                                                                               |
| --------------------------- | ---------- | ----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api-middleware`            | poc        |     1 | [saas_platform ürün metot ad alanında sürümlü kayıtta olmayan handler çağrısının native before_request zincirinde reddi](./frappe-roadmap-contracts/api-middleware.json)                                                                                                                             |
| `capability-definition`     | poc        |     3 | [CapabilityDefinition kaydı, native hedefe çözümlenemeyen capability anahtarını reddeder](./frappe-roadmap-contracts/capability-definition.json)                                                                                                                                                     |
| `client-rule-parity`        | poc        |     2 | [İstemci kural çekirdeği desteklenmeyen kural sürümünü ağ çağrısı yapmadan reddeder; desteklenen sürümde sonuç geçicidir ve yalnız native Frappe yazım yanıtı kesinleştirir](./frappe-roadmap-contracts/client-rule-parity.json)                                                                     |
| `connection`                | poc        |     2 | [Connection.run_command('read_document'): sunucu izin listesindeki tek onaylı Frappe hedefine tek, salt okunur belge okuma](./frappe-roadmap-contracts/connection.json)                                                                                                                              |
| `event-dispatch`            | poc        |     4 | [Olay zarfı doğrulaması ve correlation_id korunarak native kuyruğa tek abone aktarımı](./frappe-roadmap-contracts/event-dispatch.json)                                                                                                                                                               |
| `inbox`                     | poc        |     1 | [Tüketici tekilleştirme: aynı (consumer, event_id) için tek Inbox kaydı, tek iş etkisi ve tekrarda saklanan yanıt. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/inbox.json)                                                                                                             |
| `native-doctype-schema`     | poc        |     6 | [Kurulum/migration öncesi salt okunur Custom Field sahiplik çakışma ön kontrolü (model-7). Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/native-doctype-schema.json)                                                                                                                     |
| `native-role-scope`         | poc        |     1 | [Kapsam dışı kayıt /api/v2 liste yanıtında görünmez](./frappe-roadmap-contracts/native-role-scope.json)                                                                                                                                                                                              |
| `native-user-policy`        | poc        |     2 | [App-owned sunucu operasyonunda varsayılan red: haritada olmayan operasyon kimliği yan etkiden önce reddedilir](./frappe-roadmap-contracts/native-user-policy.json)                                                                                                                                  |
| `outbox`                    | poc        |     2 | [Seçilen tek iş kaydının native save ile güncellenmesi Outbox satırını aynı DB transactionında yazar; kuyruk kapalıyken satır Pending kalır, kuyruk açılınca tek iş etkisi oluşur](./frappe-roadmap-contracts/outbox.json)                                                                           |
| `permissioned-metadata`     | poc        |     1 | [Okunamayan permlevel alanları çıkarılmış, sürümlü DocType metadata projeksiyonu](./frappe-roadmap-contracts/permissioned-metadata.json)                                                                                                                                                             |
| `record-integrity`          | poc        |     5 | [Eski modified ile gelen ikinci yazımın reddedilmesi ve ilk kaydın korunması](./frappe-roadmap-contracts/record-integrity.json)                                                                                                                                                                      |
| `tenant-registry`           | poc        |     5 | [Aynı idempotency_key ile tekrarlanan kiracı kaydı isteği ikinci Tenant Registry kaydı açmaz](./frappe-roadmap-contracts/tenant-registry.json)                                                                                                                                                       |
| `ui-family-01`              | poc        |     4 | [React/Ant Design panelinde tek semantik token kaynağı ve erişilebilir etkileşim sözleşmesi: tüm ui-family-01 tüketicileri aynı tema, odak, metin boyutu ve hareket kurallarını kullanır](./frappe-roadmap-contracts/ui-family-01.json)                                                              |
| `alert-routing`             | mvp        |     1 | [Recorder kapasite kullanımı eşik aşımında tek, tekilleştirilmiş alarm üretir](./frappe-roadmap-contracts/alert-routing.json)                                                                                                                                                                        |
| `api-response`              | mvp        |     3 | [Native frappe.PermissionError, iç bilgi sızdırmayan 403 ürün hata gövdesine eşlenir](./frappe-roadmap-contracts/api-response.json)                                                                                                                                                                  |
| `audit-envelope`            | mvp        |     5 | [AuditEnvelope kaydı eklendikten sonra Document.save ile güncellenemez (append-only)](./frappe-roadmap-contracts/audit-envelope.json)                                                                                                                                                                |
| `cache-policy`              | mvp        |     3 | [Rate Limit kaydı Document.save ile güncellenince rate_limits önbellek girdisi tazelenir](./frappe-roadmap-contracts/cache-policy.json)                                                                                                                                                              |
| `capability-activation`     | mvp        |     3 | [Askıdaki Suite alt modülünde yazma reddi, okumanın sürmesi](./frappe-roadmap-contracts/capability-activation.json)                                                                                                                                                                                  |
| `ci-pipeline`               | mvp        |     2 | [Başarısız kontrol, artifact işini engeller ve yalnız kabul edilen revizyon kaydedilir](./frappe-roadmap-contracts/ci-pipeline.json)                                                                                                                                                                 |
| `client-local-outbox`       | mvp        |     2 | [Mevcut bir kaydın yerel güncellemesi ve outbox girdisi tek IndexedDB transaction'ında atomik yazılır](./frappe-roadmap-contracts/client-local-outbox.json)                                                                                                                                          |
| `client-offline-boot`       | mvp        |     1 | [Ağ yokken soğuk açılışta yerel hazırlık manifestine göre açılış kararı ve kararın gösterimi](./frappe-roadmap-contracts/client-offline-boot.json)                                                                                                                                                   |
| `consent-evidence`          | mvp        |     4 | [Append-only rıza olayı: geri çekme yeni olay olarak eklenir, mevcut olay güncellenemez veya silinemez](./frappe-roadmap-contracts/consent-evidence.json)                                                                                                                                            |
| `data-classification`       | mvp        |     1 | [Data Classification kaydı kaydedilirken hedef DocType alanı native meta ile doğrulanır](./frappe-roadmap-contracts/data-classification.json)                                                                                                                                                        |
| `data-subject-request`      | mvp        |     1 | [Erişim talebi için izin filtreli JSON dışa aktarım (yalnız frappe+suite, File hariç). Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/data-subject-request.json)                                                                                                                          |
| `database-capacity`         | mvp        |     1 | [Seçilen tek kritik liste sorgusunun filtre alanı native indeksle desteklenir ve sorgu planı bu indeksi kullanır](./frappe-roadmap-contracts/database-capacity.json)                                                                                                                                 |
| `delivery-attempt`          | mvp        |     1 | [İmzalı gelen webhook bir kez kabul edilir; aynı (tenant, olay kimliği) ile tekrarı kalıcı benzersiz anahtarla reddedilir](./frappe-roadmap-contracts/delivery-attempt.json)                                                                                                                         |
| `dependency-resilience`     | mvp        |     1 | [Sheets AI Anthropic çağrısı için açık timeout ve site anahtarlı devre kesici. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/dependency-resilience.json)                                                                                                                                 |
| `domain-lifecycle`          | mvp        |     3 | [Domain bağlama öncesi üretim ön kontrolü: gevşek bench/site bayrakları varken bağlama reddedilir](./frappe-roadmap-contracts/domain-lifecycle.json)                                                                                                                                                 |
| `email-domain`              | mvp        |     1 | [Test iletisinin Authentication-Results başlığını Email Account gönderen alan adına göre salt okunur değerlendirme](./frappe-roadmap-contracts/email-domain.json)                                                                                                                                    |
| `email-provider`            | mvp        |     2 | [İmzalı sağlayıcı olayının doğrulanıp hard bounce/şikâyetin baskılama kararına çevrilmesi](./frappe-roadmap-contracts/email-provider.json)                                                                                                                                                           |
| `email-template`            | mvp        |     3 | [Eksik zorunlu şablon değişkeni varsa önizleme reddedilir; tam bağlamda önizleme native get_email_template ile salt okunur render döner](./frappe-roadmap-contracts/email-template.json)                                                                                                             |
| `encryption-profile`        | mvp        |     1 | [Password tipli alan değeri native Fernet ile __Auth tablosunda şifreli saklanır ve yalnız sunucu tarafında çözülür](./frappe-roadmap-contracts/encryption-profile.json)                                                                                                                             |
| `incident-comms`            | mvp        |     2 | [Service Incident Resolved durumuna geçince resolved_at sunucuda damgalanır; çözülmüş kaydın durum ve zaman alanları sonra değiştirilemez. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/incident-comms.json)                                                                            |
| `installation-health`       | mvp        |     1 | [Zorunlu site ayarlarının salt okunur ve secret içermeyen varlık denetimi](./frappe-roadmap-contracts/installation-health.json)                                                                                                                                                                      |
| `job-state`                 | mvp        |     6 | [Aynı site içinde aynı job_type+idempotency_key ile ikinci yürütme iş etkisini tekrar uygulamaz](./frappe-roadmap-contracts/job-state.json)                                                                                                                                                          |
| `membership`                | mvp        |     1 | [Tek kullanımlık davet kabulü: Membership Invited->Active geçişi yalnız davet edilen kullanıcı tarafından ve yalnız bir kez yapılır](./frappe-roadmap-contracts/membership.json)                                                                                                                     |
| `metrics-export`            | mvp        |     3 | [Recorder metrik hedefinin ölçüm kesintisi alarm olarak görünür (Uygulama durumu: uygulanmadı)](./frappe-roadmap-contracts/metrics-export.json)                                                                                                                                                      |
| `native-schedule`           | mvp        |     2 | [Tek bir Cron Scheduled Job Type için izinli, salt okunur headless zamanlama durumu](./frappe-roadmap-contracts/native-schedule.json)                                                                                                                                                                |
| `organization-unit`         | mvp        |     1 | [Şube taşıma kurum sınırını aşamaz](./frappe-roadmap-contracts/organization-unit.json)                                                                                                                                                                                                               |
| `page-profile`              | mvp        |     1 | [Oturumdaki kullanıcı kendi User kaydındaki tek bir ürün tercihini okur ve kaydeder](./frappe-roadmap-contracts/page-profile.json)                                                                                                                                                                   |
| `page-super-admin`          | mvp        |     1 | [Süper admin sayfası mevcut site bağlamını yalnız System Manager için salt okunur gösterir; müşteri rolü aynı okumada 403 ile reddedilir. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/page-super-admin.json)                                                                           |
| `page-tenant-admin`         | mvp        |     1 | [Etkin write iznine göre müşteri yöneticisi güncelleme eylemini gösterme veya gizleme ve gizlenen eylemin native API tarafından reddi](./frappe-roadmap-contracts/page-tenant-admin.json)                                                                                                            |
| `policy-document`           | mvp        |     2 | [Yayımlanmış PolicyDocument sürümü değiştirilemez; metin değişikliği yeni sürüm kaydı ister](./frappe-roadmap-contracts/policy-document.json)                                                                                                                                                        |
| `pwa-service-worker`        | mvp        |     1 | [Oturum kapsamı (site+kullanıcı) değişince önceki kapsamın izinli veri önbelleğini temizleme](./frappe-roadmap-contracts/pwa-service-worker.json)                                                                                                                                                    |
| `rate-limit`                | mvp        |     2 | [Uygulama durumu: uygulanmadı. Suite Rate Limit kaydında user_based=1 iken sayaç oturum kullanıcısına göre ayrılır](./frappe-roadmap-contracts/rate-limit.json)                                                                                                                                      |
| `release-rollback`          | mvp        |     4 | [Geri alınamaz patch kaydı varsa yalnız-kod rollback'ini reddeden preflight kapısı (releases-3)](./frappe-roadmap-contracts/release-rollback.json)                                                                                                                                                   |
| `rest-api`                  | mvp        |     1 | [Sürümlü ve izinli sayfalı liste okuma (v1 tabanlı ürün zarfı)](./frappe-roadmap-contracts/rest-api.json)                                                                                                                                                                                            |
| `retention-rule`            | mvp        |     3 | [Tek RetentionRule kaydı ile süresi dolmuş, Drive'da kaldırılmış durumdaki File kayıtlarının native silme ile kalıcı silinmesi](./frappe-roadmap-contracts/retention-rule.json)                                                                                                                      |
| `schema-migration`          | mvp        |     2 | [Sheets migrate_blob_to_cells patch'i boş olmayan blob'u Sheet Cell satırlarına dönüştürür; dönüştüremezse hatayı yutmaz, migrate'i durdurur. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/schema-migration.json)                                                                       |
| `secret-lifecycle`          | mvp        |     1 | [Parola değişikliğinden sonra WebDAV Basic auth eski parolayı hemen reddeder](./frappe-roadmap-contracts/secret-lifecycle.json)                                                                                                                                                                      |
| `security-baseline`         | mvp        |     2 | [Suite update_password override yoluyla tüm oturumlar kapatılınca eski sid ile API okuması reddedilir](./frappe-roadmap-contracts/security-baseline.json)                                                                                                                                            |
| `security-incident`         | mvp        |     1 | [Rate Limit blocked_ips girişi gerekçe ve geri alma adımı olmadan kaydedilemez](./frappe-roadmap-contracts/security-incident.json)                                                                                                                                                                   |
| `server-backup`             | mvp        |     5 | [Native yedek setinden secret içermeyen restore manifesti üretimi](./frappe-roadmap-contracts/server-backup.json)                                                                                                                                                                                    |
| `sync-receipt`              | mvp        |     1 | [Idempotent update push: aynı kullanıcı+cihaz+mutation_id ve aynı içerik özeti ikinci kez gelirse hedef belge yeniden kaydedilmez, kayıtlı SyncReceipt sonucu döner](./frappe-roadmap-contracts/sync-receipt.json)                                                                                   |
| `taxonomy-term`             | mvp        |     1 | [Taxonomy Term düğümü farklı kiracıya ait bir üst düğüme taşınamaz](./frappe-roadmap-contracts/taxonomy-term.json)                                                                                                                                                                                   |
| `trace-logging`             | mvp        |     3 | [API isteğinin request_id değeri, o istekten kuyruğa atılan RQ işinin yapılandırılmış log satırına aynen taşınır; satırda yalnız izinli alanlar bulunur. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/trace-logging.json)                                                               |
| `transfer-run`              | mvp        |     7 | [Transfer Run kaydından native Data Import önizlemesi; kullanıcı onayından önce yazım yok](./frappe-roadmap-contracts/transfer-run.json)                                                                                                                                                             |
| `ui-family-02`              | mvp        |     2 | [Komut paleti yalnız sunucunun izinle döndürdüğü Workspace Sidebar gezinme girdilerini gösterir ve kapanınca odağı tetikleyiciye geri verir](./frappe-roadmap-contracts/ui-family-02.json)                                                                                                           |
| `ui-family-06`              | mvp        |     7 | [Frappe sonuç ve hata mesajları erişilebilir Ant Design bildirimiyle duyurulur; hata ayrıntısı bildirim kapandıktan sonra kalıcı hata panelinde kalır](./frappe-roadmap-contracts/ui-family-06.json)                                                                                                 |
| `ui-family-07`              | mvp        |     2 | [Kirli kayıttan ayrılırken uyarı; iptalde taslak korunur ve sunucuya yazılmaz](./frappe-roadmap-contracts/ui-family-07.json)                                                                                                                                                                         |
| `ui-family-16`              | mvp        |     5 | [Uygulama durumu: uygulanmadı. Mevcut kayıt formunda, izinli metadata projeksiyonundaki Data alanları için depends_on ve mandatory_depends_on yalnız görünürlük ve tavsiye niteliğinde zorunlu işareti olarak gösterilir](./frappe-roadmap-contracts/ui-family-16.json)                              |
| `ui-family-17`              | mvp        |     1 | [SemanticField Date: kullanıcı date_format ile gösterim, kabloda yalnız ISO YYYY-MM-DD. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ui-family-17.json)                                                                                                                                 |
| `ui-family-19`              | mvp        |     1 | [Tek Table alanının satır projeksiyonu ve native parent Document.save ile toplu kaydı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ui-family-19.json)                                                                                                                                  |
| `ui-family-33`              | mvp        |     1 | [Uygulama durumu: uygulanmadı. time_zone için kullanıcı override'ı kaldırılınca site katmanı (System Settings) değerine geri dönüş](./frappe-roadmap-contracts/ui-family-33.json)                                                                                                                    |
| `ui-view-state`             | mvp        |     1 | [Site/kullanıcı bağlamı değişince veya kimlik kaybında önceki bağlama ait sunucu önbelleği tüm tüketicilerden düşer ve geç gelen yanıt yeni bağlama yazılmaz](./frappe-roadmap-contracts/ui-view-state.json)                                                                                         |
| `vulnerability-scan`        | mvp        |     1 | [SaaS CI'da JS üretim bağımlılığı high önem bulgusu yayını durdurur](./frappe-roadmap-contracts/vulnerability-scan.json)                                                                                                                                                                             |
| `web-build`                 | mvp        |     1 | [SaaS web kabuğunda oturumlu kullanıcının yetkili bir kaydı native Frappe REST üzerinden okuması](./frappe-roadmap-contracts/web-build.json)                                                                                                                                                         |
| `account-health`            | post_mvp   |     1 | [Düşen kullanım ve yaklaşan yenilemeden açıklanabilir hesap sağlığı risk puanı](./frappe-roadmap-contracts/account-health.json)                                                                                                                                                                      |
| `activepieces-bridge`       | post_mvp   |     1 | [Activepieces otomasyonunun Frappe'ye tenant kapsamlı ve tekrar tetiklemeye dayanıklı HTTP yazımı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/activepieces-bridge.json)                                                                                                               |
| `analytics-consent`         | post_mvp   |     3 | [İzne bağlı ölçüm etiketi yükleme ve hassas veriyi ölçümden çıkarma. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/analytics-consent.json)                                                                                                                                               |
| `analytics-event-spec`      | post_mvp   |     2 | [Sürümlü analitik olay kataloğuna karşı sunucu tarafında tek uç noktada olay doğrulaması ve mükerrersiz dönüşüm işleme](./frappe-roadmap-contracts/analytics-event-spec.json)                                                                                                                        |
| `approval-chain`            | post_mvp   |     5 | [Onay zinciri geçişinin tek sunucu tarafı kabul noktasında doğrulanması](./frappe-roadmap-contracts/approval-chain.json)                                                                                                                                                                             |
| `approval-decision`         | post_mvp   |     1 | [Onay kararı: reddetme, geri gönderme ve geri çekmenin gerekçe kaydıyla sunucu tarafında uygulanması](./frappe-roadmap-contracts/approval-decision.json)                                                                                                                                             |
| `asset-rendition`           | post_mvp   |     1 | [Orijinali koruyarak kaynak sürüme bağlı medya türevi (küçük görsel, önizleme, biçim dönüşümü) üretme ve yalnız başarılı türevi yayınlama](./frappe-roadmap-contracts/asset-rendition.json)                                                                                                          |
| `automation-rule`           | post_mvp   |     5 | [AutomationRule: olay-koşul-eylem kuralı ve yan etkisiz deneme. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/automation-rule.json)                                                                                                                                                      |
| `billing-instruction`       | post_mvp   |     1 | [İşletmeci finans kayıtlarını müşterinin ürün içi muhasebesinden ayırma](./frappe-roadmap-contracts/billing-instruction.json)                                                                                                                                                                        |
| `client-backup`             | post_mvp   |     1 | [İstemci cihazındaki eşitlenmemiş çalışma verisinin şifreli bağımsız yedeği, anahtar kurtarma ve başka cihazda yetkili geri yükleme](./frappe-roadmap-contracts/client-backup.json)                                                                                                                  |
| `client-channel-continuity` | post_mvp   |     2 | [Kanal login callback'i sonrası state'e bağlı göreli returnTo ile aynı yetkili kayda devam. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/client-channel-continuity.json)                                                                                                                |
| `client-data-budget`        | post_mvp   |     1 | [Düşük veri tüketimi modu: kullanıcı tercihiyle otomatik yenileme, medya ve ağır istekleri azaltma. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/client-data-budget.json)                                                                                                               |
| `client-migration`          | post_mvp   |     1 | [İmzalı istemci güncellemesi ve bekleyen outbox'ı koruyan yerel veritabanı migrationı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/client-migration.json)                                                                                                                              |
| `client-offline-faults`     | post_mvp   |     1 | [Mutasyon kimliğiyle mükerrer gönderimin sunucuda ikinci kez uygulanmaması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/client-offline-faults.json)                                                                                                                                    |
| `crm-interaction`           | post_mvp   |     1 | [CRM etkileşimi: görüşme/not, sorumlu atama, hatırlatma ve izinli iletişim geçmişi](./frappe-roadmap-contracts/crm-interaction.json)                                                                                                                                                                 |
| `crm-lead-bridge`           | post_mvp   |     1 | [Mükerrer müşteri kaydının önizlemeli ve yetkili birleştirilmesi ile denetlenen sahiplik değişikliği. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/crm-lead-bridge.json)                                                                                                                |
| `demo-seed`                 | post_mvp   |     1 | [Demo verisini oluşturma ve sıfırlama; gerçek veriden ayırma](./frappe-roadmap-contracts/demo-seed.json)                                                                                                                                                                                             |
| `document-template`         | post_mvp   |     1 | [Sürümlü belge şablonuyla yetkili önizleme, aynı sürümden PDF/indirme ve toplu belge üretimi](./frappe-roadmap-contracts/document-template.json)                                                                                                                                                     |
| `edge-abuse`                | post_mvp   |     2 | [Edge katmanında örnek saldırı isteğinin bloklanması; meşru API ve Keycloak callback akışının geçmesi; uygulama içi hız sınırının ikinci savunma hattı olarak korunması](./frappe-roadmap-contracts/edge-abuse.json)                                                                                 |
| `edge-delivery`             | post_mvp   |     1 | [Uç teslimde public asset ile kimlikli yanıtın önbellek ayrımı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/edge-delivery.json)                                                                                                                                                        |
| `entitlement-grant`         | post_mvp   |     6 | [Paket hakkı yoksa rol yetkisinden bağımsız backend reddi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/entitlement-grant.json)                                                                                                                                                         |
| `feature-flag`              | post_mvp   |     1 | [Kiracı bazlı özellik bayrağı: tek sunucu kararı, aynı kararın istemcilere aktarımı ve yalnız yetkili değişiklik. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/feature-flag.json)                                                                                                       |
| `field-mapping`             | post_mvp   |     1 | [Denetlenebilir alan eşleme önerisi, manuel inceleme ve açık onayla native yoldan uygulama. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/field-mapping.json)                                                                                                                            |
| `file-type-policy`          | post_mvp   |     1 | [Sunucu tarafı dosya türü politikası: içerik tabanlı MIME doğrulaması ve sahte uzantı/MIME reddi](./frappe-roadmap-contracts/file-type-policy.json)                                                                                                                                                  |
| `graphql-api`               | post_mvp   |     1 | [Yetkili, salt-okunur GraphQL query dilimi: tek DocType için liste ve tekil kayıt](./frappe-roadmap-contracts/graphql-api.json)                                                                                                                                                                      |
| `helpdesk-ticket-bridge`    | post_mvp   |     2 | [Destek talebi köprüsü: Kiracı kapsamındaki destek talebi (doğrudan açılmış ya da tek bir sohbetten dönüşmüş) native izinlerle atanır; durumu ve etiketi güncellenir; müşteri API yanıtında iç not yer almaz. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/helpdesk-ticket-bridge.json) |
| `infrastructure-code`       | post_mvp   |     1 | [Altyapı tanımından tekrar üretim, plan farkı ve değer göstermeyen yapılandırma sapması raporu](./frappe-roadmap-contracts/infrastructure-code.json)                                                                                                                                                 |
| `malware-scan`              | post_mvp   |     1 | [Yüklenen dosyanın kalıcılaştırmadan önce ClamAV ile taranması ve fail-closed reddi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/malware-scan.json)                                                                                                                                    |
| `mcp-api`                   | post_mvp   |     1 | [Şemalı ve izne göre süzülmüş MCP araç/kaynak kataloğu ile güvenli uzak erişim](./frappe-roadmap-contracts/mcp-api.json)                                                                                                                                                                             |
| `moderation-case`           | post_mvp   |     2 | [Moderasyon vakası: bekleyen içerik yayına kapalı kalır, karar gerekçeyle kaydedilir, itiraz önceki kararı değiştirmeden bağlı yeni vaka olarak açılır](./frappe-roadmap-contracts/moderation-case.json)                                                                                             |
| `native-assignment`         | post_mvp   |     1 | [Modüller arası yetkili atama ve Benim işlerim kuyruğu](./frappe-roadmap-contracts/native-assignment.json)                                                                                                                                                                                           |
| `native-calendar-event`     | post_mvp   |     4 | [Native Suite takvim etkinliginin platform istemcisine izinli ve tenant kapsamli acilmasi](./frappe-roadmap-contracts/native-calendar-event.json)                                                                                                                                                    |
| `native-comment`            | post_mvp   |     1 | [Kayıt üzerinde izin kapsamlı ekip yorumu, bahsetme ve takip](./frappe-roadmap-contracts/native-comment.json)                                                                                                                                                                                        |
| `native-file`               | post_mvp   |     4 | [Yetki ve tenant sınırlı dosya/medya kütüphanesi: doğrulanmış yükleme, güvenli indirme, denetlenebilir temizlik](./frappe-roadmap-contracts/native-file.json)                                                                                                                                        |
| `native-report`             | post_mvp   |     4 | [Native Frappe rapor ve metrik sonuçlarının izin kapsamında headless okunması](./frappe-roadmap-contracts/native-report.json)                                                                                                                                                                        |
| `native-version`            | post_mvp   |     1 | [Kayıt sürüm geçmişini görüntüleme ve kontrollü geri alma. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/native-version.json)                                                                                                                                                            |
| `native-web-page`           | post_mvp   |     4 | [Yayımlanmış Web Page içeriği için Guest okuma sözleşmesi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/native-web-page.json)                                                                                                                                                           |
| `native-workflow`           | post_mvp   |     3 | [Native Frappe Workflow geçişinin, istemcinin beklediği durum denetimiyle headless olarak uygulanması](./frappe-roadmap-contracts/native-workflow.json)                                                                                                                                              |
| `notification-message`      | post_mvp   |     3 | [Alıcıya bağlı uygulama içi bildirim mesajı: tekil oluşturma, okundu ve teslim edildi ayrımı, tek alternatif kanal geçişi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/notification-message.json)                                                                                      |
| `notification-preference`   | post_mvp   |     2 | [Kiracı kanal politikası ve kullanıcı tercihine göre sunucu tarafı tek bildirim gönderim kararı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/notification-preference.json)                                                                                                             |
| `object-storage`            | post_mvp   |     1 | [Drive dosyalarının S3 uyumlu nesne depolamada (MinIO veya Amazon S3) native Drive yoluyla yazılması, okunması ve silinmesi](./frappe-roadmap-contracts/object-storage.json)                                                                                                                         |
| `onboarding-checklist`      | post_mvp   |     3 | [Sunucuda doğrulanan onboarding kontrol listesi, devam imleci ve bağlamsal yardım](./frappe-roadmap-contracts/onboarding-checklist.json)                                                                                                                                                             |
| `partner-referral`          | post_mvp   |     1 | [Referans ve iş ortağı programı: sunucu tarafı atıf, tek seferlik hak ediş ve suistimal denetimi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/partner-referral.json)                                                                                                                   |
| `payment-attempt`           | post_mvp   |     5 | [Odeme denemesi (Payment Attempt) durumunun yalniz dogrulanmis, idempotent ve monotonik gecislerle ilerlemesi; yanlis Paid olusmamasi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/payment-attempt.json)                                                                               |
| `plan-definition`           | post_mvp   |     3 | [Plan sürümünün yaşam döngüsü geçişi (yayın, satış durumu, fiyat sürümü) sunucuda doğrulanır; dış yüzeyler yalnız yayınlanmış sürümü görür](./frappe-roadmap-contracts/plan-definition.json)                                                                                                         |
| `process-definition`        | post_mvp   |     4 | [Tanım sürümüne bağlı çok belgeli süreç örneği başlatma ve native Workflow geçişiyle ilerletme](./frappe-roadmap-contracts/process-definition.json)                                                                                                                                                  |
| `reconciliation-run`        | post_mvp   |     1 | [Süper admin için işletmeci cari mutabakat çalıştırması (ReconciliationRun) ve tenant kullanıcısının işletmeci carisine erişiminin reddi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/reconciliation-run.json)                                                                         |
| `release-note`              | post_mvp   |     1 | [Neler yeni: hedef kullanıcıya yayınlanmış sürüm duyurusunu gösterme ve okundu işaretleme](./frappe-roadmap-contracts/release-note.json)                                                                                                                                                             |
| `search-index`              | post_mvp   |     3 | [Seçili DocType alanlarının yerel tam metin indeksinde kaynak kayıtla tutarlı tutulması](./frappe-roadmap-contracts/search-index.json)                                                                                                                                                               |
| `search-query`              | post_mvp   |     3 | [İzin kapsamlı arama sorgusu: sonuç, toplam sayı, facet sayısı, snippet ve öneriler tek izin/tenant predikatından türetilir. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/search-query.json)                                                                                            |
| `sms-push-delivery`         | post_mvp   |     1 | [Aynı olaydan SMS ve mobil push üretimi, iptal edilen cihaz tokenına gönderimin durdurulması](./frappe-roadmap-contracts/sms-push-delivery.json)                                                                                                                                                     |
| `soap-api`                  | post_mvp   |     1 | [WSDL/XSD sözleşmesine bağlı tek bir SOAP işleminin sunucu tarafında güvenli tüketimi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/soap-api.json)                                                                                                                                      |
| `social-message-delivery`   | post_mvp   |     1 | [Sosyal kanal mesaj teslimi: Telegram Bot, Discord ve WhatsApp Business için tek kanal adaptörü sözleşmesi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/social-message-delivery.json)                                                                                                  |
| `sse-api`                   | post_mvp   |     1 | [SSE ile kimliği doğrulanmış tek kullanıcı odasına canlı olay iletimi ve Last-Event-ID ile kaldığı yerden devam](./frappe-roadmap-contracts/sse-api.json)                                                                                                                                            |
| `status-page`               | post_mvp   |     1 | [İç/dış hizmet durumu sayfası (status page). Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/status-page.json)                                                                                                                                                                             |
| `subscription`              | post_mvp   |     2 | [Abonelik paket değişikliği (hemen veya dönem sonu) ve müşteri self-servis abonelik/fatura/ödeme yöntemi portalı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/subscription.json)                                                                                                       |
| `support-feedback`          | post_mvp   |     2 | [Müşteri ve tenant kapsamına bağlı geri bildirim kaydı: ticket memnuniyeti ile NPS ayrı tür, sunucu tarafı tekrar gösterim engeli ve müşteriler arası okuma/yazma yasağı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/support-feedback.json)                                           |
| `support-package`           | post_mvp   |     1 | [Güvenli destek paketi: kullanıcı hata kimliğini, zamanı ve ilgili ekran bağlamını alan alan önizler ve açık onay verdikten sonra paylaşır. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/support-package.json)                                                                          |
| `tauri-desktop-package`     | post_mvp   |     1 | [Tauri 2 masaüstü kabuğunda ortak React/Ant Design web çıktısının gömülü paketlenmesi, Keycloak yönlendirmesi ve çevrimdışı kuyruğun yeniden başlatmada korunması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/tauri-desktop-package.json)                                             |
| `tauri-device-capability`   | post_mvp   |     1 | [Tauri 2 mobil cihaz yeteneginden yetkili Frappe kaydina gecis. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/tauri-device-capability.json)                                                                                                                                              |
| `tauri-mobile-lifecycle`    | post_mvp   |     1 | [Tauri 2 mobil istemcide yaşam döngüsü: sistem geri hareketi, sanal klavye, safe area, arka plan dönüşü ve işletim sistemi sonlandırması sonrası iş bağlamının korunması](./frappe-roadmap-contracts/tauri-mobile-lifecycle.json)                                                                    |
| `tauri-mobile-package`      | post_mvp   |     2 | [Ortak React/Ant Design ön yüz çıktısının Tauri 2 paketine gömülmesi ve ağsız soğuk açılışta tek okuma akışı kabuğunun gösterilmesi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/tauri-mobile-package.json)                                                                            |
| `tauri-mobile-release`      | post_mvp   |     2 | [Tauri 2 istemci yayın sınırı ve mağaza yayın kapısı: masaüstünde imzalı updater, mobilde yalnız imzalı mağaza paketi; her sürüm adayı içerik sınıfına göre kapıdan geçer. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/tauri-mobile-release.json)                                      |
| `team-message-delivery`     | post_mvp   |     1 | [İptal edilmiş, yeniden yetki bekleyen veya izinsiz kanala bağlı ekip mesajı teslimi dış gönderimden önce kesilir](./frappe-roadmap-contracts/team-message-delivery.json)                                                                                                                            |
| `ui-family-08`              | post_mvp   |     1 | [Gorunum gecisinde veri korunur; Kanban durum tasimasi backend yetkisiyle dogrulanir ve reddedilirse geri alinir](./frappe-roadmap-contracts/ui-family-08.json)                                                                                                                                      |
| `ui-family-09`              | post_mvp   |     1 | [Liste içinde satır/hücre düzenleme: alan doğrulama, kaydetme, iptal ve çakışma geri bildirimi](./frappe-roadmap-contracts/ui-family-09.json)                                                                                                                                                        |
| `ui-family-12`              | post_mvp   |     1 | [Liste görünümünde filtre, sıralama, sayfalama ve sütun seçiminin URL'den geri yüklenmesi ve kayıtlı görünüm (SavedView, önerilen bileşen) olarak saklanması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ui-family-12.json)                                                           |
| `ui-family-14`              | post_mvp   |     1 | [Çoklu kayıt seçimi ve kayıt başına denetlenen toplu işlem (BulkAction)](./frappe-roadmap-contracts/ui-family-14.json)                                                                                                                                                                               |
| `ui-family-15`              | post_mvp   |     1 | [Yalnız yetkili ortak alanlarla salt okunur kayıt karşılaştırma (önerilen RecordPreview bileşeni)](./frappe-roadmap-contracts/ui-family-15.json)                                                                                                                                                     |
| `ui-family-20`              | post_mvp   |     1 | [Şablondan oluşturma ve kontrollü çoğaltma önizlemesi (views-17)](./frappe-roadmap-contracts/ui-family-20.json)                                                                                                                                                                                      |
| `ui-family-24`              | post_mvp   |     1 | [Paylaşımlı çalışma alanı için izin süzgeçli etkinlik akışı ve kayıt aboneliği](./frappe-roadmap-contracts/ui-family-24.json)                                                                                                                                                                        |
| `ui-family-29`              | post_mvp   |     1 | [Dashboard: tenant kapsamli, izin denetimli ozet metrik paneli. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ui-family-29.json)                                                                                                                                                         |
| `ui-family-39`              | post_mvp   |     1 | [İzinli Frappe action kimliğini kullanıcıya ait GenUI capability kimliğine sürümlü eşleme ile bağlama; açık ret ve AI kesintisinde normal iş ekranı (Uygulama durumu: uygulanmadı)](./frappe-roadmap-contracts/ui-family-39.json)                                                                    |
| `ui-localization`           | post_mvp   |     4 | [React/Ant Design istemcisinde etkin dilin Frappe'den çözülmesi ve çeviri kataloğunun bu dile göre yüklenmesi](./frappe-roadmap-contracts/ui-localization.json)                                                                                                                                      |
| `ui-presence`               | post_mvp   |     1 | [Kayıt presence'ı ve eski sürümle kaydetme uyarısı (RecordPresence)](./frappe-roadmap-contracts/ui-presence.json)                                                                                                                                                                                    |
| `ui-theme`                  | post_mvp   |     2 | [Sunucu tarafında doğrulanmış host'a göre tenant markasının semantik tema tokenlarına eşlenip yönetim paneli ve frontpage'e uygulanması](./frappe-roadmap-contracts/ui-theme.json)                                                                                                                   |
| `usage-ledger`              | post_mvp   |     8 | [Kiracı kapsamlı kullanım ve kredi defteri: idempotent rezervasyon, tüketim ve iade. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/usage-ledger.json)                                                                                                                                    |
| `utm-definition`            | post_mvp   |     1 | [UTM tanımı: zorunlu alanları doğrulanmış kampanya URL'si üretimi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/utm-definition.json)                                                                                                                                                    |
| `vector-search`             | post_mvp   |     1 | [Site kapsamlı vektör benzerlik araması ve Qdrant adaptörü (search-3). Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/vector-search.json)                                                                                                                                                 |
| `web-desktop-push`          | post_mvp   |     1 | [İzinli kullanıcıya web push ve masaüstü sistem bildirimi teslimi; izin reddinin yan etkisiz işlenmesi](./frappe-roadmap-contracts/web-desktop-push.json)                                                                                                                                            |
| `websocket-api`             | post_mvp   |     2 | [Yetkili istemciye commit sonrası kayıt geçersizleştirme sinyali; yetkisiz oda aboneliği reddi ve yeniden bağlanmada REST ile tamamlama](./frappe-roadmap-contracts/websocket-api.json)                                                                                                              |
| `wxt-extension`             | post_mvp   |     1 | [WXT/MV3 Chrome eklentisinden Frappe'ye paket içi kodla, kalıcı kuyruklu ve sunucuda yetkilendirilen tek iş isteği](./frappe-roadmap-contracts/wxt-extension.json)                                                                                                                                   |
| `xml-feed`                  | post_mvp   |     1 | [XML besleme ile tenant kapsamlı, checkpoint tabanlı artımlı ve çift yönlü HTTP eşitleme. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/xml-feed.json)                                                                                                                                   |
| `agent-capability`          | scale      |     1 | [Ajan rolü, insan onaylı araç kataloğu ve izin verilen işlem kapsamı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/agent-capability.json)                                                                                                                                               |
| `agent-run`                 | scale      |     4 | [Kayıtlı ajanın tek araç adımını kendi kısıtlı kimliğiyle, idempotent, limitli ve güven sınırı içinde yürütmesi](./frappe-roadmap-contracts/agent-run.json)                                                                                                                                          |
| `ai-call-record`            | scale      |     1 | [AI çağrı kaydı: model ve prompt sürümü, token kullanımı, maliyet, eval sonucu ve maskelenmiş girdi özetiyle yeniden incelenebilir kayıt. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ai-call-record.json)                                                                             |
| `ai-model-connection`       | scale      |     2 | [Tenant kapsamında izinli AI sağlayıcı/model bağlantısının çözülmesi ve süre sınırlı çağrı](./frappe-roadmap-contracts/ai-model-connection.json)                                                                                                                                                     |
| `ai-policy`                 | scale      |     2 | [AI sağlayıcı sınırında zorunlu politika kapısı: giden veri filtresi (ai-5) ile araç çağrısı ve çıktı yetki denetimi (ai-6). Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/ai-policy.json)                                                                                               |
| `bi-embedding`              | scale      |     1 | [Yetkili kullanıcıya tenant sınırı sunucuda kilitli, kısa ömürlü imzalı Metabase gömülü rapor erişimi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/bi-embedding.json)                                                                                                                  |
| `cluster-capacity`          | scale      |     3 | [Kayıtlı ve sıralı kapasite yerleşim değişikliği (düğüm ekleme/boşaltma, paylaşımlıdan ayrılmış yerleşime taşıma, düğüm kaybı sınaması)](./frappe-roadmap-contracts/cluster-capacity.json)                                                                                                           |
| `experiment`                | scale      |     1 | [Oturumlu kullanıcıyı çalışan bir deneyde deterministik ve kalıcı biçimde tek bir varyanta atama](./frappe-roadmap-contracts/experiment.json)                                                                                                                                                        |
| `human-decision`            | scale      |     1 | [Kritik ajan eyleminde insan onayı ve ajanın durdurulması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/human-decision.json)                                                                                                                                                            |
| `programmatic-seo`          | scale      |     1 | [Veri kalitesi kapısından geçen yayınlanmış kayıt için benzersiz canonical rota üretimi ve salt okunur çözümleme](./frappe-roadmap-contracts/programmatic-seo.json)                                                                                                                                  |
| `prompt-template`           | scale      |     1 | [Sürümlü prompt şablonunun bildirilmiş değişken şemasıyla doğrulanıp değişmez sürüme bağlı render edilmesi](./frappe-roadmap-contracts/prompt-template.json)                                                                                                                                         |
| `rag-source`                | scale      |     5 | [Son kullanıcı adına izin denetimli RAG parça getirme ve doğrulanabilir kaynak atfı](./frappe-roadmap-contracts/rag-source.json)                                                                                                                                                                     |
| `reporting-read-model`      | scale      |     1 | [Kaynak modüllerden gelen olaylarla güncellenen ayrı okuma modeli; kapsam koşullu ve yalnız seçilen tek bir karar raporu için. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/reporting-read-model.json)                                                                                  |
| `slo-policy`                | scale      |     1 | [Seçilmiş kullanıcı yolculuğu için SLI kaydı, hata bütçesi tüketim alarmı ve bütçe ihlalinde yayın kararı kaydı. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/slo-policy.json)                                                                                                          |
| `tenant-fairness`           | scale      |     1 | [Aşırı yükte tenant kaynak adaleti, tanımlı sınır aşım yanıtı ve kontrollü hizmet azaltma (Uygulama durumu: uygulanmadı)](./frappe-roadmap-contracts/tenant-fairness.json)                                                                                                                           |
| `tenant-restore`            | scale      |     1 | [Kiracı bazlı ve belirli zamana geri yükleme. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/tenant-restore.json)                                                                                                                                                                         |
| `access-review`             | enterprise |     1 | [Periyodik erişim gözden geçirme: sahip onayı, süreli istisna ve reddedilen yetkinin native yolla kaldırılması](./frappe-roadmap-contracts/access-review.json)                                                                                                                                       |
| `contract-commitment`       | enterprise |     1 | [Müşteri özel sözleşme, veri işleme şartı (DPA) ve taahhüt kaydı; müşteri/tenant bazında sürümlü bulunabilirlik ve yetkisiz erişim reddi. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/contract-commitment.json)                                                                        |
| `independent-pentest`       | enterprise |     1 | [Onaylı kapsamda bağımsız, risk temelli penetrasyon testi; kritik bulgunun yalnız bağımsız yeniden test kanıtıyla kapanması](./frappe-roadmap-contracts/independent-pentest.json)                                                                                                                    |
| `legal-hold`                | enterprise |     1 | [Aktif hukuki saklama kilidindeki kaydın silinmesini sunucu tarafında, silme kancasında reddetme. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/legal-hold.json)                                                                                                                         |
| `on-premise-package`        | enterprise |     2 | [On-prem ve internetten yalıtılmış kurulum paketi manifestinin doğrulanması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/on-premise-package.json)                                                                                                                                      |
| `residency-policy`          | enterprise |     1 | [Onaylı bölge listesi dışındaki depolama bölgesine yeni aktarım yapılandırmasının kayıt anında reddedilmesi ve alt işleyen envanterinin tutulması. Uygulama durumu: uygulanmadı.](./frappe-roadmap-contracts/residency-policy.json)                                                                  |
| `support-grant`             | enterprise |     2 | [Onaylı ve süresi geçerli Destek İzni (Support Grant) olmadan Frappe-native impersonate çağrısının sunucuda reddedilmesi](./frappe-roadmap-contracts/support-grant.json)                                                                                                                             |
| `tenant-key`                | enterprise |     1 | [Kiracıya özel veri anahtarı ve anahtar sürümü yaşam döngüsü: döndürme, iptal ve kurtarma](./frappe-roadmap-contracts/tenant-key.json)                                                                                                                                                               |

## Kullanıcı kararı gerekenler — tek liste

1. **Kurulu olmayan app dayanağı: 29 madde.** ERPNext/HRMS/CRM/Helpdesk/Payments ve ilgili uygulamaların kapsamı, sürüm/lisans ve veri sahipliği seçilmeden kurulum yapılmaz. Kimlikler: `service-4`, `catalog-1`, `catalog-4`, `catalog-5`, `subscriptions-1`, `subscriptions-2`, `subscriptions-4`, `subscriptions-6`, `campaigns-1`, `campaigns-2`, `campaigns-3`, `campaigns-4`, `campaigns-5`, `payments-1`, `crm-1`, `crm-2`, `releases-5`, `integrity-9`, `finance-1`, `finance-2`, `finance-4`, `finance-5`, `finance-6`, `finance-7`, `finance-9`, `support-1`, `support-4`, `reports-2`, `reports-8`.
2. **Keycloak entegrasyonu ve grid: 15 madde.** Keycloak kurulum/sürüm, realm/client, kullanıcı–rol/site eşlemesi ve liste/grid kararı açık kalır. Kimlikler: `email-2`, `views-1`, `identity-1`, `identity-2`, `identity-3`, `identity-4`, `identity-5`, `identity-6`, `identity-7`, `identity-8`, `identity-9`, `identity-10`, `channels-3`, `access-6`, `access-7`.
3. **Hedef ürün baseline’ı.** Gerçek repo/commit/build, Suite kaynak revizyonu ve uzak deployment eşlemesi belirlenecek. Deployment/build kanıtının teknik sahibi Hüseyin Cengiz; dokümantasyon veya kaynak snapshot commit’i ürün baseline’ı değildir.
4. **Sözleşmeye özgü seçimler.** Satıcı, lisans, fiyat/tarife, faturalama/vergi ve ödeme politikası; saklama süresi/hukuki hold; veri yerleşimi/tenant topolojisi; kapasite/SLO hedefleri ve model/AI sağlayıcı seçenekleri. Her rehberin `decisionsPending` alanı ilgili kimlikleri, engellenen gelecek adımı ve karar gelmeden hazırlanabilir belgeyi gösterir. Bu kararlar verilmiş sayılmaz.

## Ne bitti, ne kaldı?

**Bitti:** kaynak değerlendirmesi ve 343 madde için ortak eksiklere göre gruplanmış 175 yönerge; pilot ürün/commit/site teslim atıflarının kaldırılması. **Kaldı:** 44 maddenin app/Keycloak/grid kararları, rehber içindeki işletme seçimleri, gerçek ürün baseline’ı ve bütün ürün uygulaması. GenUI geliştirmesi kullanıcıya aittir. Belge lint/CI/yayın sonucu ürünün GREEN olduğu anlamına gelmez.

## Madde bazında kaynak değerlendirmesi

### performance-1 — Performance management (performans yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni p95/hata/kaynak hedefi istiyor ama hedef değer, kritik yol listesi ve ölçüm aracı tanımlı değil. Kaynakta monitor ve rapor çalışma süresi önbelleği var. Ancak bu, ürün performans programı değildir. Birincil görev cache-policy--implementation olarak eşlenmiş; bu eşleme performans yönetimiyle uyuşmuyor.

Eksik:

- Kritik yolculuk listesi (örn. list/get_list, rapor, Drive/Sheets autosave) ve sayısal p95/hata bütçesi yok
- Ölçüm kaynağı belirsiz: Frappe monitor/recorder (v17-dev) mi, dış APM mi, karar yok
- Görev eşlemesi cache-policy ile karışık; ayrı performans/ölçüm görev kimliği referansı yok
- Temsilî yük profili (tenant sayısı, veri hacmi) tanımsız

Nasıl tamamlanır: Mevcut görev kaydında yalnız performance-1 için 2–3 kritik yol ve sayısal p95 hedefi yazılsın. Ölçüm kaynağı olarak v17-dev frappe.monitor seçimi kaynaktan doğrulansın. Görev eşlemesi, yeni registry açılmadan düzeltilsin.

Kaynak dayanakları: `frappe/frappe/desk/query_report.py:20`; `frappe/frappe/desk/query_report.py:175`.

Rehber: [cache-policy](./frappe-roadmap-contracts/cache-policy.json). Mevcut birincil görev: `cache-policy--implementation`.

### performance-2 — Sunucu tarafı Redis önbellekleme.

Kaynak durumu: **VAR**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Çekirdekte Redis destekli cache kullanımı doğrudan görülüyor: hget generator, setex TTL ve hdel temizleme. Talimat yalnız 'yapılandır' diyor. Hangi veri cache'lenecek, tazelik kuralı ve hit/miss ölçüm yöntemi belirtilmemiş.

Eksik:

- Cache'lenecek veri sınıfları ve her biri için TTL/tazelik kuralı yok
- Hit/miss metriğinin nereden okunacağı (Redis INFO, uygulama sayacı) tanımsız
- Redis topolojisi (cache/queue ayrımı, HA) ve sahibi (Hüseyin Cengiz) belirtilmemiş
- SQLite yolunda frappe.client_cache kullanımı ile Redis cache ayrımı not edilmemiş

Nasıl tamamlanır: Mevcut frappe.cache hget/setex/hdel desenleri referans gösterilsin. Görevde 1 veri sınıfı için TTL ve on_update invalidation kuralı yazılsın. Redis topoloji kararı DevOps devrine bağlansın.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:116`; `frappe/frappe/rate_limiter.py:180`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:145`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:80`.

Rehber: [cache-policy](./frappe-roadmap-contracts/cache-policy.json). Mevcut birincil görev: `cache-policy--implementation`.

### performance-3 — Kiracı bazlı önbellek anahtarı, süre, temizleme ve geçersizleştirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

make_key ve doc_events tabanlı temizleme primitifleri var. Ancak mevcut anahtarlar user/doctype bazlı ve site içi iş tenant boyutu içermiyor. Tenant modeli (site-per-tenant mi, site içi tenant mı) talimatta kararlaştırılmamış. Bu yüzden anahtar kapsamı tanımlanamıyor.

Eksik:

- Tenant modeli kararı yok; site başına tenant ise make_key yeterli olabilir, site içi tenant ise anahtar öneki sözleşmesi gerekir
- Tenant kimliğinin kaynağı (Keycloak claim, User Permission, site) belirtilmemiş
- Domain invalidation için hangi doc_events/on_update kancalarının kullanılacağı listelenmemiş
- make_key'in site önekini nasıl uyguladığı bu excerpt'te görülmüyor (doğrulanmadı)

Nasıl tamamlanır: Önce tenant modeli kararı mevcut mimari kaydına yazılsın. Ardından anahtar şablonu 'tenant:domain:id' biçiminde ve invalidation kancası suite hooks doc_events deseniyle tek bir domain için tanımlansın.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:173`; `frappe/frappe/permissions.py:309`; `suite/suite/hooks.py:229`.

Rehber: [cache-policy](./frappe-roadmap-contracts/cache-policy.json). Mevcut birincil görev: `cache-policy--implementation`.

### performance-4 — Veri tabanı sorgu, indeks ve bağlantı havuzu yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta indeks/unique ekleme, has_index, sayfalama sınırı ve toplu ekleme tavanı var. v17-dev MariaDB, Postgres ve SQLite destekliyor. Talimat hangi DB motorunun hedeflendiğini ve bağlantı havuzu sahibini söylemiyor. Bağlantı havuzu kodu excerpt'te görülmüyor.

Eksik:

- Hedef DB motoru (MariaDB/Postgres/SQLite) ve yerel sitenin gerçek db_type'ı belirtilmemiş
- Kritik sorgu listesi ve EXPLAIN/plan doğrulama yöntemi yok
- Bağlantı havuzu (DB tarafı ya da proxy) ve gunicorn/worker sayısı ile ilişki tanımsız
- Bağlantı baskısında beklenen davranış (timeout, 503, kuyruk) sayısal değil

Nasıl tamamlanır: Mevcut görevde DB motoru ve sitenin db_type değeri kaydedilsin. 1 kritik sorgu için on_doctype_update/add_index deseni ve plan kontrolü kabul ölçütü olarak yazılsın. Havuz kararı Hüseyin Cengiz'e devredilsin.

Kaynak dayanakları: `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`; `frappe/frappe/api/v2.py:162`; `frappe/frappe/client.py:246`; `frappe/frappe/query_builder/utils.py:41`.

Rehber: [database-capacity](./frappe-roadmap-contracts/database-capacity.json). Mevcut birincil görev: `database-capacity--implementation`.

### performance-5 — Zaman aşımı, bağlantı sınırı ve arızalı bağımlılığa çağrıyı geçici kesme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Somut temel parçalar var. Frappe RQ kuyruk/iş timeout'ları mevcut: long kuyruğu 1500 sn; özel worker timeout'u ve enqueue(timeout=...) desteği var. DB statement timeout, enable_db_statement_timeout açıksa HTTP isteğinde http_timeout veya 300 sn, job'da job.timeout değerinin 1.5 katı olarak uygulanıyor. Suite JMAP istemcisinde httpx connect/read/write/pool timeout'ları ve sınırlı RetryPolicy (max_attempts=2) var. recorder_client'ta TIMEOUT=(2,5) kullanılıyor. link_preview'da connect 3 sn, read 4 sn, maxsize=1 bağlantı havuzu ve retries=False var. frappe/automation_engine içinde Redis'te tutulan, kural bazlı ardışık hata sayacı var: eşik aşılınca Automation Flow kalıcı olarak devre dışı kalıyor, bekleyen kuyruk Skipped yapılıyor ve sahibine bildirim gidiyor. Bu bir bağımlılık breaker'ı değil, iş akışı kuralı breaker'ıdır. Suite Vue frontend'inde yalnız istemci tarafı retry/backoff var. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Dış bağımlılık başına genel bir circuit breaker yok: kapalı/açık/yarı açık durumları, açık kalma süresi ve devre açıkken yeni çağrıların kontrollü reddi bulunmuyor.
- Anthropic çağrısında (suite/suite/sheets/ai/client.py:88-100) açık timeout veya breaker yok; davranış SDK varsayılanına bırakılmış.
- frappe.integrations.utils.make_request'in varsayılanı timeout=None; dış çağrılar için merkezi timeout bütçesi ve bağımlılık envanteri yok.
- Bağımlılık başına paylaşımlı bir eşzamanlı bağlantı sınırı politikası yok; link_preview'daki maxsize=1 yalnız o modülde geçerli.
- Headless provider kontratında dış bağımlılık dayanıklılığı için bir yüzey yok.
- Runtime functionalAcceptance: not_run.

Nasıl tamamlanır: Mevcut sırayı koruyun. 1) dependency-resilience--contract: yalnız Anthropic çağrısını kapsayın. Timeout (connect/read), hata eşiği, açık kalma süresi, yarı açık deneme sayısı ve açık devrede dönecek hata kontratını yazın. Breaker durumu, automation_engine'deki site anahtarlı Redis sayaç desenine benzer şekilde frappe.cache'te tutulsun. 2) dependency-resilience--implementation: anthropic.Anthropic(...) çağrısına açık timeout verin ve messages.create'i küçük bir breaker sarmalayıcısıyla sarın. Önce başarısız (RED) testi yazın: arızalı bağımlılık süre içinde kesilsin, eşikten sonra çağrı yapılmadan reddedilsin. Ardından GREEN'e getirin. 3) Aynı sarmalayıcıyı JMAP ve make_request çağrı noktalarına sonradan genişletin.

Kaynak dayanakları: `frappe/frappe/utils/background_jobs.py:117`; `frappe/frappe/database/database.py:1692`; `suite/suite/mail/jmap.py:308`; `suite/suite/sheets/link_preview.py:134`; `frappe/frappe/automation_engine/runner.py:602`; `suite/suite/sheets/ai/client.py:88`.

Rehber: [dependency-resilience](./frappe-roadmap-contracts/dependency-resilience.json). Mevcut birincil görev: `dependency-resilience--implementation`.

### performance-6 — Aşırı yükte bekletme, kontrollü kapasite azaltma ve kiracı kaynak adaleti.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe'de site geneli CPU süresi tabanlı RateLimiter (429), user_based endpoint limiti ve Suite'te DocType ile yönetilen dinamik limit var. Uzun işler 'long' kuyruğuna gidiyor. Ancak tenant boyutlu sayaç, tenant başına kuyruk kotası ve backpressure yok. Talimat tenant kimliğini ve sınır aşım yanıtını tanımlamıyor.

Eksik:

- Tenant kimliğinin rate-limit anahtarına nasıl gireceği tanımsız (user_based kullanıcı bazlı, tenant bazlı değil)
- Kuyruk başına tenant kotası ve sınır aşımında kullanıcıya dönecek yanıt sözleşmesi yok
- Kontrollü hizmet azaltma için hangi özelliklerin kapatılacağı listelenmemiş
- create_rate_limit ignore_permissions=True ile ekliyor; bu yardımcı headless olarak dışa açılmamalı

Nasıl tamamlanır: Mevcut rate_limit(user_based/key) ve Suite Rate Limit DocType'ı yeniden kullanılsın. Görevde tenant anahtarı kaynağı ve 429/kuyruk-dolu yanıtı tanımlansın. create_rate_limit yalnız sunucu içi kalmalı.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:79`; `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:111`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/desk/query_report.py:460`.

Rehber: [tenant-fairness](./frappe-roadmap-contracts/tenant-fairness.json). Mevcut birincil görev: `tenant-fairness--implementation`.

### performance-7 — Uç içerik önbelleği, sıkıştırma ve medya dağıtımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Edge/CDN ve sıkıştırma reverse proxy sorumluluğu; nginx/CDN yapılandırması excerpt'te yok. Uygulama tarafında http_cache yardımcısı ve Slides service worker'da public bundle ile kullanıcıya özel cache ayrımı var. Talimat kimlikli API yanıtları için Cache-Control/Vary kuralını ve CDN'in hangi koşulda devreye gireceğini tanımlamıyor.

Eksik:

- CDN koşulu (medya hacmi eşiği) sayısal değil
- Kimlikli yanıtlar için Cache-Control: private/no-store ve Vary kuralı yazılmamış
- PWA/Tauri/SW kullanıcı cache'lerinin oturum kapanışında temizlenme kuralı yok
- Drive medya dağıtımı (S3/boto3) ile uç cache sınırı tanımsız

Nasıl tamamlanır: Görevde public asset (suite/public/frontend) ve kimlikli API ayrımı Cache-Control kuralıyla yazılsın. Slides USER_CACHE_NAMES deseni diğer PWA yüzeyleri için logout temizleme ölçütü olarak referans alınsın. CDN kararı Hüseyin Cengiz'e devredilsin.

Kaynak dayanakları: `suite/frontend/src/apps/slides/utils/slidesCaches.js:16`; `suite/frontend/src/apps/slides/utils/slidesCaches.js:17`; `frappe/frappe/client.py:13`; `suite/pyproject.toml:95`.

Rehber: [edge-delivery](./frappe-roadmap-contracts/edge-delivery.json). Mevcut birincil görev: `edge-delivery--implementation`.

### backup-1 — Veri tabanı, dosya, yapılandırma ve anahtar referanslarının yedeklenmesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü açık. Frappe kaynağında DB, public/private dosya ve site config yedeği için ayrı yollar var. Ancak restore manifestinin içeriği, anahtarın config yedeğinden ayrılması ve Suite'in site dışında çalışan servisleri talimatta tanımlı değil.

Eksik:

- Şifreleme anahtarı site_config içinde tutuluyor. Config yedeğinin anahtarı da taşıyıp taşımadığı ve public artifact'e sızmaması için redaksiyon kuralı yazılmamış.
- Suite'in site dışındaki servisleri (sfu/stt/recorder/collab sunucuları, Stalwart mail) ve Keycloak realm'i bench yedeğinin kapsamında değil. Bunların yedek sahibi belirlenmemiş.
- Kaynak dokümanlar sürüm belirtmeyen genel Frappe URL'leri. Yerel v17.0.0.dev0 (adf1fd0) komut ve bayraklarıyla eşlemesi yapılmamış.

Nasıl tamamlanır: server-backup--implementation içinde tek bir restore manifesti tanımlanmalı: DB dump, public ve private tar, secretlardan arındırılmış config ve yalnızca anahtar referans kimliği. Site dışı Suite servisleri ile Keycloak realm export'u, sahibi Hüseyin Cengiz olarak ayrı satırlarda listelenmeli.

Kaynak dayanakları: `frappe/frappe/utils/backups.py:34`; `frappe/frappe/utils/backups.py:77`; `frappe/frappe/utils/backups.py:72`; `suite/pyproject.toml:88`; `suite/suite/mail/api/account.py:286`.

Rehber: [server-backup](./frappe-roadmap-contracts/server-backup.json). Mevcut birincil görev: `server-backup--implementation`.

### backup-2 — Şifreli, ayrı ortamda ve değiştirilmeye karşı korumalı yedek saklama.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe kaynağında Fernet tabanlı yedek şifreleme ve restore sırasında env üzerinden anahtar verme var. Offsite için yalnızca Dropbox entegrasyonuna ait bir patch görünüyor. Değiştirilemez saklama, ayrı hesap ve retention için kaynakta da talimatta da somut bir sözleşme yok.

Eksik:

- Anahtarın yedekle aynı yerde (site_config) bulunmaması için saklama ve erişim ayrımı tanımsız.
- Offsite hedef (S3 Object Lock ya da başka bir seçenek), saklama süresi ve üretim hesabından ayrı silme yetkisi kararlaştırılmamış.
- Sahip 'DevOps ekibi' olarak genel yazılmış. Altyapı/güvenlik işi olduğu için Hüseyin Cengiz adıyla atanmalı.

Nasıl tamamlanır: Aynı görevde offsite hedef, retention süresi ve anahtarın yedekten ayrı tutulacağı yer kararı yazılmalı. Kabul provası: anahtarsız restore'un reddedilmesi ve üretim kimliğiyle offsite silmenin başarısız olması.

Kaynak dayanakları: `frappe/frappe/utils/backups.py:20`; `frappe/frappe/commands/site.py:197`; `frappe/frappe/commands/site.py:265`; `frappe/frappe/patches/v11_0/set_dropbox_file_backup.py:9`.

Rehber: [server-backup](./frappe-roadmap-contracts/server-backup.json). Mevcut birincil görev: `server-backup--implementation`.

### backup-3 — Kiracı bazlı ve belirli zamana geri yükleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta site bütünüyle restore ve doctype/tablo düzeyinde kısmi yedek var. Bu kısmi yedek kiracıya ait satırları ayırmaz. PITR veritabanı motoruna bağlı, motor ise mariadb, postgres ve sqlite seçenekleri arasında henüz belirlenmemiş. Sheets snapshot restore'u yalnızca tek belge düzeyinde çalışır, felaket kurtarma değildir.

Eksik:

- Kiracı modeli (her kiracıya ayrı site mi, site içinde iş kiracısı mı) bağlanmadıkça seçici restore tanımlanamaz.
- PITR için binlog/WAL arşivi gerekir. Bu Frappe dışında kalır ve motor seçimine bağlı bir bağımlılık olarak yazılmamış.
- include/exclude_doctypes kısmi yedeğinin kiracı restore'u sayılmaması gerektiği belirtilmemiş.

Nasıl tamamlanır: tenant-restore--implementation önce kiracı=site eşlemesine ve DB motoru kararına bağlanmalı. Ardından izole bir sitede bench restore ile motor düzeyinde PITR provası tanımlanmalı ve diğer kiracıların etkilenmediği kontrol edilmeli.

Kaynak dayanakları: `frappe/frappe/commands/site.py:26`; `frappe/frappe/utils/backups.py:154`; `frappe/frappe/commands/site.py:230`; `suite/suite/sheets/versioning/state.py:3`.

Rehber: [tenant-restore](./frappe-roadmap-contracts/tenant-restore.json). Mevcut birincil görev: `tenant-restore--implementation`.

### backup-4 — Otomatik geri yükleme doğrulaması ve veri bütünlüğü denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: zamanlanmış prova, ilişki/toplam/dosya kontrolü ve alarm. Kaynakta etkileşimsiz restore ve dosya türü tespiti gibi yapı taşları var. Otomatik doğrulama ve bütünlük denetimi kaynakta görülmedi. Prova ortamı, kontrol listesi ve alarm kanalı talimatta tanımsız.

Eksik:

- İzole prova sitesinin nerede ve kimin yetkisiyle açılacağı yazılmamış.
- Hangi doctype sayımlarının ve File kayıtları ile dosya varlığı/hash eşleşmesinin kontrol edileceği tanımsız.
- Bozuk yedek alarmının hedefi ve sahibi yok.

Nasıl tamamlanır: Mevcut CI ya da sunucu zamanlayıcısında (sahip Hüseyin Cengiz) tek bir prova işi tanımlanmalı: geçici sitede `restore --non-interactive`, ardından küçük ve sabit bir sayım/dosya kontrol listesi. Sonuç ve süre kaydedilmeli.

Kaynak dayanakları: `frappe/frappe/commands/site.py:202`; `frappe/frappe/commands/site.py:281`; `frappe/frappe/commands/site.py:180`.

Rehber: [server-backup](./frappe-roadmap-contracts/server-backup.json). Mevcut birincil görev: `server-backup--implementation`.

### backup-5 — RPO (Recovery Point Objective — kabul edilebilir veri kaybı hedefi) takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

RPO'nun ne anlama geldiği açık. Ancak sayısal hedef, ölçüm kaynağı (son başarılı offsite yedeğin zamanı mı, PITR arşivi mi) ve alarm eşiği yok. Kaynakta yalnızca yedek üretimi var, RPO takibi yok.

Eksik:

- Kararlaştırılmış bir RPO değeri ve onu onaylayan kişi yok.
- PITR olmadığında RPO'nun yedek aralığı ile offsite kopyalama gecikmesinin toplamı olduğu belirtilmemiş.
- Site dışı Suite servisleri ve Keycloak için ayrı RPO tanımı yok.

Nasıl tamamlanır: İş tarafından bir RPO değeri onaylatılmalı. backup-4 provasında son kurtarılabilir zaman damgası ile kesinti anı arasındaki farkı hesaplayıp eşiğe göre alarm üreten tek bir ölçüm eklenmeli.

Kaynak dayanakları: `frappe/frappe/utils/backups.py:56`; `frappe/frappe/utils/backups.py:168`.

Rehber: [server-backup](./frappe-roadmap-contracts/server-backup.json). Mevcut birincil görev: `server-backup--implementation`.

### backup-6 — RTO (Recovery Time Objective — hizmeti geri getirme süresi hedefi) takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü uçtan uca. Ancak RTO hedefi ve 'kritik kullanıcı akışı'nın somut tanımı (Keycloak girişi, headless React ve yetkili Frappe API okuması) eksik. Kaynakta yalnızca restore CLI'ı ve yetkili okuma uçları var. Keycloak ile istemciler snapshot'ta yok.

Eksik:

- Sayısal bir RTO hedefi yok.
- Hazır olma probu tanımsız. Örneğin Keycloak token alındıktan sonra /api/resource üzerinden yetkili bir okuma.
- Bağımlılıkların ayağa kalkma sırası yazılmamış: site dışı Suite servisleri, Keycloak, DNS. DNS tarafı Asistan Hüseyin'e, server tarafı Hüseyin Cengiz'e ait.

Nasıl tamamlanır: RTO değeri ve tek bir kritik akış probu tanımlanmalı. Aynı backup-4 provasında kesinti başlangıcından probun başarılı olmasına kadar geçen süre ölçülmeli.

Kaynak dayanakları: `frappe/frappe/commands/site.py:165`; `frappe/frappe/api/v1.py:153`; `suite/pyproject.toml:89`.

Rehber: [server-backup](./frappe-roadmap-contracts/server-backup.json). Mevcut birincil görev: `server-backup--implementation`.

### backup-7 — Cihazdaki çalışma verisi ve eşitlenmemiş kayıtlar için şifreli bağımsız yedek, anahtar kurtarma ve geri yükleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta ilgili iki parça var, ancak ikisi de bu maddenin gereğini karşılamıyor. (1) Suite'in Vue Slides istemcisi (upstream-native Suite kodu; planlanan Frappe adaptörü değil) eşitlenmemiş sunum düzenlemelerini aynı cihazda IndexedDB'de (DRAFTS_DB_NAME/'presentations') düz kayıt olarak tutuyor. Kayıtta dirty ve baseModified alanları bulunuyor; yükleme sırasında sunucu kopyasıyla karşılaştırılıp yerel taslak geri yükleniyor. Kalıcılık için navigator.storage.persist isteniyor. Bu taslak şifresiz, cihazdan bağımsız değil ve dışa aktarılamıyor; uygun olmayan durumda da sessizce atılıyor. (2) Frappe'nin sunucu tarafı site yedeği, isteğe bağlı olarak gpg ile şifreleniyor (encrypt_backup ayarı). Anahtar site config'deki backup_encryption_key'den alınıyor, yoksa üretiliyor. Bu yalnızca bulut DB/dosya yedeğidir; cihazdaki gönderilmemiş kayıtları içermez. Frappe v1 create_doc, idempotency anahtarı olmadan doğrudan insert() yapıyor. automation_engine outbox'ı sunucu içi otomasyon kuyruğudur, istemci mutasyon outbox'ı değildir. Meet E2EE/crypto.subtle kodu medya şifrelemesidir, yedekle ilgisi yoktur. Tauri, PWA ve WXT istemci kodu snapshot'ta yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Cihaz verisi, outbox, mutasyon kimlikleri, şema/kural sürümü ve sync imlecini kapsayan şifreli yedek manifest şeması ve bunu üreten veya doğrulayan kod yok
- Ayrı fiziksel ortama bağımsız yedekleme ve başka cihazda yetkili geri yükleme yok; Slides taslağı yalnızca aynı tarayıcı profilindeki IndexedDB'de duruyor
- Anahtar kurtarma ve yedekten ayrı erişim politikası yok (Stronghold, OS keychain veya web için anahtar türetme bulunamadı)
- Bozuk veya yanlış anahtarlı yedeğin reddi, tenant kapsamı, saklama süresi ve kurtarma noktasının gösterimi yok
- Sunucu tarafında idempotent mutasyon (mutasyon kimliği, tekilleştirme penceresi) ve sonuç sorgusu ucu yok; v1 create_doc doğrudan insert yapıyor
- Geri yüklemede özgün cihaz kapsamı, işlem zarfı ve kimliğinin korunması ile yeni cihazın güncel yetkiyle doğrulanması (device-grant) yok
- planlanan Frappe adaptörü'da istemci yedeği veya sync sözleşmesi yok

Nasıl tamamlanır: Mevcut bağımlılık sırası korunmalı. İlk adım sync-receipt--contract ve kernel-envelope--contract kapsamında planlanan Frappe adaptörü'a tek bir dar whitelisted uç eklemek olmalı. Bu uç ignore_permissions kullanmamalı ve yerel Frappe izinlerini yeniden kullanmalı. İstemci mutation_id'sini tenant ve cihaz kapsamında tekil bir makbuz DocType'ına yazıp insert'ü aynı işlemde yapmalı; tekrar gelen kimlik için kayıtlı sonucu dönmeli. Yanına bir sonuç sorgusu ucu eklenmeli ve önce RED/GREEN testi yazılmalı. Ardından client-backup--contract ile manifest JSON şeması yazılmalı: sürüm, tenant, cihaz kimliği, outbox, mutasyon kimlikleri, şema/kural sürümü, sync imleci, oluşturulma zamanı ve AEAD şifreleme ile anahtar kimliği. device-grant--contract ile yeni cihaz yetkilendirmesi tanımlanmalı. En son client-backup--implementation yapılmalı: önce tek bir istemcide (Tauri Stronghold veya web) şifreli dışa ve içe aktarma ile yanlış anahtar reddi eklenmeli. Suite Vue Slides taslağı referans alınabilir, ancak yeniden kullanılacak bir yedek mekanizması sayılmamalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `suite/frontend/src/apps/slides/stores/saving.js:24`; `suite/frontend/src/apps/slides/stores/saving.js:80`; `suite/frontend/src/apps/slides/stores/presentation.js:274`; `suite/frontend/src/apps/slides/stores/presentation.js:291`; `frappe/frappe/utils/backups.py:778`.

Rehber: [client-backup](./frappe-roadmap-contracts/client-backup.json). Mevcut birincil görev: `client-backup--implementation`.

### service-1 — İç/dış status page (hizmet durumu sayfası).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: dışarıda yalnız kamuya açık bileşenler, içeride yetkili ayrıntı ve ana uygulama arızasında erişilebilirlik isteniyor. Kaynakta site içi sağlık primitifleri var: System Health Report, scheduler heartbeat ve monitor logu. Ancak System Health Report yalnız System Manager'a açık, site içinde anlık hesaplanan, kalıcı olmayan ve beta durumunda bir rapor. Kamuya açık ya da Frappe çökünce ayakta kalan bir durum yüzeyi yok.

Eksik:

- Bileşen kataloğu tanımlı değil; hangi bileşenin kamuya, hangisinin yalnız içeriye açık olduğu belirtilmemiş.
- Sağlık sinyali sözleşmesi yok: hangi kaynağın (heartbeat, health report alanları, harici probe) hangi duruma eşleneceği belirsiz.
- 'Ana uygulama arızasında erişilebilir' kabulü Frappe dışında barındırmayı gerektiriyor; barındırma ve bağımlılık sınırı ile altyapı sorumlusu tanımlı değil.
- System Health Report'un v17-dev beta durumu ve yalnız System Manager'a açık olması için sürüm eşlemesi ve kararlılık notu yok.
- Koşullu kapsam için seçimin kim tarafından ve hangi ölçütle yapılacağı yazılmamış.

Nasıl tamamlanır: status-page--implementation altında önce kapsam kararını yazın. Ardından iki tablo ekleyin: kamu/iç bileşen kataloğu ve sinyal→durum eşlemesi. Sinyal olarak is_scheduler_process_running, System Health Report alanları (salt okuma) ve harici probe kullanılabilir. Barındırma sınırını Frappe sitesi dışında tanımlayın; altyapı devrinin teknik sahibi olarak Hüseyin Cengiz adıyla belirtilsin.

Kaynak dayanakları: `frappe/frappe/desk/doctype/system_health_report/system_health_report.py:158`; `frappe/frappe/desk/doctype/system_health_report/system_health_report.py:4`; `frappe/frappe/desk/doctype/system_health_report/system_health_report.json:3`; `frappe/frappe/utils/scheduler.py:95`; `frappe/frappe/monitor.py:23`.

Rehber: [status-page](./frappe-roadmap-contracts/status-page.json). Mevcut birincil görev: `status-page--implementation`.

### service-2 — Planlı bakım, bileşen arızası ve etkilenen kiracı görünümü.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta site başına ikili bir maintenance_mode bayrağı ve scheduler duraklatma var; monitor kayıtları site adını taşıyor. Ancak zaman pencereli planlı bakım, bileşen→tenant bağımlılık modeli ve etkilenen tenant görünümü yok. Kabul metni ölçülebilir, fakat tenant'ın Frappe sitesine mi yoksa site içindeki bir kayda mı karşılık geldiği yazılmamış.

Eksik:

- Tenant tanımı eşlenmemiş: site başına tenant mı, aynı site içinde çok tenant mı? 'Etkilenen tenant' hesabı buna bağlı.
- Bileşen→tenant bağımlılık modeli ve veri sahibi tanımlı değil.
- Bakım penceresi sözleşmesi yok: zaman dilimi, başlangıç/bitiş, duyuru öncesi süre. Mevcut maintenance_mode yalnız açık/kapalı bir bayrak.
- Planlı bakım yayını ile gerçek maintenance_mode/pause_scheduler geçişinin ilişkisi belirsiz: aynı mı, otomatik mi, onaylı mı?
- service-1 ve service-3 ile ortak olay/bileşen kimliği tanımlanmamış.

Nasıl tamamlanır: incident-comms--implementation görevine üç karar ekleyin: tenant↔site eşlemesi, bileşen→tenant bağımlılık tablosu ve bakım penceresi alanları. maintenance_mode'un yayınla ilişkisini 'yalnız gözlenen durum, otomatik tetikleme yok' olarak sabitleyin. Yeni görev kaydı açmayın.

Kaynak dayanakları: `frappe/frappe/utils/scheduler.py:181`; `frappe/frappe/commands/scheduler.py:116`; `frappe/frappe/commands/scheduler.py:102`; `frappe/frappe/monitor.py:56`.

Rehber: [incident-comms](./frappe-roadmap-contracts/incident-comms.json). Mevcut birincil görev: `incident-comms--implementation`.

### service-3 — Kesinti iletişimi, güncelleme geçmişi ve olay sonrası açıklama.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de kullanılabilecek genel primitifler var. (1) Notification DocType'ı Email, Slack, System Notification ve SMS kanallarıyla belge olaylarına bağlanabiliyor. send(), send_notification_by_channel'ı çağırıyor; evaluate_alert Python/Filters koşuluyla ve Value Change olayıyla tetikleniyor. (2) track_changes açık DocType'larda Document.save_version, Version kaydını ignore_permissions ile ekliyor. Version DocType'ında in_create=1 var; System Manager yalnız okuyup dışa aktarabiliyor, delete yalnız Administrator'da. (3) Navbar Settings'teki announcement_widget, Desk navbar'ının altında kapatılabilen, global ve tek metinli bir banner; toolbar.js ve navbar.html bunu boot üzerinden gösteriyor. Suite'te kesinti iletişimine en yakın şey, Suite Settings'teki contact_email alanının açıklaması ('planned downtime' bildirimlerinin adresi). Bu yalnız bir alan tanımı, iş akışı yok. Suite'in Vue arayüzündeki boot/config.ts yalnız 'mail server unavailable' ekranını ele alıyor. incident sözleşmesi yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kurulu iki app'te de Incident/Outage/Status Page/Postmortem DocType'ı, controller'ı, API'si veya UI'ı yok.
- Olay yaşam döngüsü (ilk bildirim → güncellemeler → çözüm) ve bu adımların zaman damgalarını koruyan model yok.
- Yalnız ekleme yapılan güncelleme geçmişi yok. Version alan farkı tutuyor ama olay güncellemesi semantiği taşımıyor ve Administrator Version kaydını silebiliyor.
- Hedef kitle/kanal sözleşmesi yok (iç kullanıcı, etkilenen tenant, kamu). Notification alıcıları belge bağlamından türetiliyor; tenant hedeflemesi yok. announcement_widget tek, global ve geçmişsiz bir metin.
- Kamuya yayın öncesi onay adımı ve yetkili rolün native DocType izinlerine eşlenmesi yok.
- Olay sonrası rapor bağlantısı, raporun sahibi ve şablonu yok.
- Headless provider'da incident okuma/yazma sözleşmesi yok (React/AntD/GenUI tüketicileri için).

Nasıl tamamlanır: incident-comms--contract bağımlılığı tamamlandıktan sonra incident-comms--implementation altında en küçük adım: Suite'te custom bir 'Service Incident' DocType'ı. Alanlar: durum (Investigating/Identified/Monitoring/Resolved), started_at, resolved_at, hedef kitle (Internal/Affected Tenants/Public), postmortem Link alanı ve track_changes=1. Native izinler: yazan rol ve ayrı bir yayın onay rolü; ignore_permissions kullanılmayacak. Sıra: (1) başlık DocType'ı ve izinleri; ilk RED/GREEN testi yalnız 'çözümde resolved_at korunur ve sonra değiştirilemez' davranışı. (2) Yalnız ekleme yapılan 'Incident Update' child veya ayrı DocType'ı; controller'da güncelleme ve silme reddedilir. (3) Yayınlanan güncellemede mevcut Notification primitifinin Email/System Notification kanallarının kitleye göre bağlanması. (4) Postmortem bağlantısı. (5) Headless provider'a salt okunur incident uç noktası. Status page, Suite'in Vue arayüzünden ayrı bir tüketici olarak sonraya kalır.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.json:76`; `frappe/frappe/email/doctype/notification/notification.py:401`; `frappe/frappe/model/document.py:2043`; `frappe/frappe/core/doctype/version/version.json:71`; `frappe/frappe/public/js/frappe/ui/toolbar/toolbar.js:159`; `suite/suite/suite_core/doctype/suite_settings/suite_settings.json:53`.

Rehber: [incident-comms](./frappe-roadmap-contracts/incident-comms.json). Mevcut birincil görev: `incident-comms--implementation`.

### service-4 — Hizmet hedefi ihlali ve sözleşmeye bağlı hizmet kredisi kaydı.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Görev, Helpdesk SLA ve ERPNext değişmez defteri üzerine kurulu; ikisi de bu sitede yüklü değil (yalnız frappe ve suite yüklü). Suite'in kapsamı da muhasebe ya da helpdesk değil. Ham erişilebilirlik verisi için yalnız monitor durum kodları var; bunlar da sınırlı bir Redis listesine ve bench log dosyasına yazılıyor, sözleşme kanıtı olarak saklanmıyor.

Eksik:

- SLO tanımı yok: ölçüm kaynağı, pencere, hariç tutulan planlı bakım ve hesap formülü belirsiz.
- Kredi kademeleri ve sözleşme dönemi modeli ile verinin sahibi tanımlı değil.
- Muhasebe bağlantısı ERPNext'e bağlı, ancak ERPNext yüklü değil; alternatif hedef ya da kurulum kararı yok.
- Ölçüm verisinin saklanma ve bütünlüğü belirsiz; monitor logu kanıt deposu değil.
- GDPR kaynağı bu kalemle ilişkisiz; asıl gereken sözleşme kaynağı eksik.

Nasıl tamamlanır: service-credit--implementation için önce koşullu kapsam kararını alın. Kapsam açılırsa SLO/ölçüm/kredi formülünü ve muhasebe hedefini (ERPNext kurulumu ya da dış sistem) karar olarak yazın. Helpdesk ve ERPNext özelliklerini native sayan cümleleri 'yüklü değil' olarak düzeltin.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/monitor.py:109`; `frappe/frappe/monitor.py:16`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `service-credit--implementation`.

### tenant-1 — Kiracılık modelleri: single-tenant (tek kiracılı), multi-tenant (çok kiracılı), hybrid (karma).

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve sızıntı kabulü tanımlı. Kaynakta site bağlamı (frappe.local.site, site conf, site_cache) var. Bu, site başına kiracılık için bir yapı taşıdır. Tek veritabanında satır kiracılığına ait bir primitive alıntılarda görülmedi. Talimat hangi topolojinin varsayılan olduğunu ve karma modelin neyi neye eşlediğini seçmiyor.

Eksik:

- Varsayılan model kararı yok: site=kiracı mı, site içinde kurum satırı mı? tenant-2 ile sınır çizilmemiş.
- Karma modelde host/site çözümleme ve Keycloak realm/organization eşlemesi tanımsız.
- Frappe 17.0.0-dev sürüm eşlemesi yok. Kaynak dokümanlar sürümsüz Frappe URL'leri.
- Suite'in site dışında çalışan servisleri (sfu/collab/recorder) kiracılık modeline dahil edilmemiş.

Nasıl tamamlanır: tenant-registry--implementation altında tek bir karar kaydı yaz: varsayılan site=kiracı, satır kiracılığı kapsam dışı ya da ayrı karar. Karma model için site↔Keycloak organization↔harici servis eşleme tablosunu kabul metnine ekle.

Kaynak dayanakları: `frappe/frappe/website/utils.py:212`; `frappe/frappe/website/page_renderers/base_template_page.py:16`; `suite/pyproject.toml:88`.

Rehber: [tenant-registry](./frappe-roadmap-contracts/tenant-registry.json). Mevcut birincil görev: `tenant-registry--implementation`.

### tenant-2 — Kurum, şirket, şube, ekip ve çalışma alanı hiyerarşisi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı (şube taşıma, çoklu ekip, kurum sınırı). Native has_permission ve permission_query_conditions hook primitive'leri kaynakta var. Kurum–şube–ekip DocType'ları ve üyelik ürünü alıntılarda yok. Frappe'deki 'Workspace' Desk gezinme kavramıdır, SaaS çalışma alanı değildir.

Eksik:

- Hangi native mekanizmanın kullanılacağı belirtilmemiş: User Permission, has_permission hook ya da permission_query_conditions.
- Site içi 'site' genel erişimi ve System Manager bypass'ı kurum sınırını aşabiliyor. Talimat bunu ele almıyor.
- Desk Workspace ile ürün 'çalışma alanı' terim çakışması çözülmemiş.
- Ağaç modeli kararı (nested set mi, link alanı mı) ve taşıma sırasında izin yeniden hesaplama sözleşmesi yok.

Nasıl tamamlanır: organization-unit--implementation için minimal DocType listesini ve izin stratejisini yaz: native DocPerm + permission_query_conditions; ignore_permissions yardımcısı yok. Suite Drive/Sheets 'site' erişim kapsamının kurum sınırıyla nasıl kısıtlanacağını açık gap olarak kaydet.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `suite/suite/drive/api/permissions.py:85`; `suite/suite/sheets/permissions.py:22`; `frappe/frappe/website/utils.py:142`.

Rehber: [organization-unit](./frappe-roadmap-contracts/organization-unit.json). Mevcut birincil görev: `organization-unit--implementation`.

### tenant-3 — Kiracı oluşturma, etkinleştirme, kapatma ve güvenli müşteri çıkışı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe site düzeyinde yaşam döngüsü ilkellerini CLI olarak sağlıyor. (1) `new-site` (frappe/frappe/commands/site.py:74), installer._new_site'ı çağırıyor; site dizini varsa ve --force verilmemişse çıkıyor (installer.py:66-68). Bu, yalnız site adı/dizin varlığına dayalı bir tekrar koruması. Hata durumunda rollback yalnız TTY onayıyla çalışıyor. (2) Askıya alma/kapatma ilkeli: `bench set-maintenance-mode` (commands/scheduler.py:115) site_config'e maintenance_mode yazıyor. app.py:203-207 her istekte SessionStopped fırlatıyor; allow_reads_during_maintenance açıksa salt-okuma moduna geçiyor. Scheduler da maintenance_mode'da durduruluyor (utils/scheduler.py:181). (3) Veri teslimi/yedek: `bench backup`; --with-files, --compress ve yol seçenekleriyle DB, dosya ve config yedeği alıyor (commands/site.py:900-956, utils/backups.py:646). (4) Kalıcı kapatma: `drop-site` (site.py:1141) varsayılan olarak önce yedek alıyor ve yedek başarısızsa duruyor. Ardından DB'yi ve DB kullanıcısını siliyor, site dizinini archived/sites altına taşıyor (site.py:1168-1200). Personal Data Download/Deletion Request kullanıcı düzeyinde; kiracı çıkışı değil. Suite'te tenant/site yaşam döngüsü kodu yok. Oradaki provision() yalnız belirlenecek geliştirme sitesi'ta Administrator için DocType/rol/kullanıcı fikstürü kuruyor; kiracı oluşturmuyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kiracı kayıt DocType'ı/registry ve durum makinesi (provisioning/active/suspended/closing/closed) yok; durum geçişi API'si ve denetim kaydı da yok.
- İstemci kaynaklı idempotency anahtarı ve tekrar deneme sözleşmesi yok. Mevcut koruma yalnız site dizini varlığına bakıyor; aynı istek farklı site adıyla tekrarlanırsa ikinci kiracı açılabilir.
- Ayrı bir 'aktivasyon' adımı yok. new-site sonunda site doğrudan kullanılabilir oluyor.
- maintenance_mode askıya alma amacıyla tasarlanmamış, bakım bayrağı. Tüm istekleri (Administrator dahil) durduruyor. Kiracıya özel askı mesajı, mevcut oturumların sonlandırılması ve API token iptali politikası yok.
- Müşteri çıkış akışı yok: veri teslim formatı (yedek dışında taşınabilir export), teslim kabulü kaydı, saklama süresi kararı, saklama süresi dolunca arşivin silinmesi ve silme kanıtı yok. drop-site arşivi süresiz olarak archived/sites'ta bırakıyor.
- Bu işlemlerin hepsi bench CLI. Headless provider veya Frappe HTTP API üzerinden kiracı yaşam döngüsü sözleşmesi yok; bench'in kendi kaynağı pakette değil.

Nasıl tamamlanır: tenant-registry--contract/schema bağımlılıkları sırasıyla: önce tek bir 'Tenant' kayıt şeması tanımla. İçeriği: idempotency_key unique, site_name, status enum ve geçiş tablosu. Ardından ilk dar davranışı uygula: aynı idempotency_key ile ikinci oluşturma isteği mevcut kaydı döndürsün ve yeni site açmasın; bu davranışın RED/GREEN testi yazılsın. Provisioning adımı installer._new_site'ı sarmalasın. Askıya alma ilk sürümde maintenance_mode yerine kiracıya özel bir before_request kontrolü olarak tasarlansın; maintenance_mode'un Administrator dahil tüm istekleri durdurduğu dikkate alınsın. Çıkış (closing→closed) adımı en son eklensin: scheduled_backup çıktısını teslim kaydına bağla, saklama kararını kaydet, sonra _drop_site çağır. Komut eşlemesi bu kaynak commit'inde (adf1fd0c) doğrulandı; bench sarmalayıcısı ayrıca doğrulanmalı.

Kaynak dayanakları: `frappe/frappe/installer.py:66`; `frappe/frappe/app.py:207`; `frappe/frappe/commands/scheduler.py:124`; `frappe/frappe/commands/site.py:1170`; `frappe/frappe/commands/site.py:1191`.

Rehber: [tenant-registry](./frappe-roadmap-contracts/tenant-registry.json). Mevcut birincil görev: `tenant-registry--implementation-mvp`.

### tenant-4 — Kullanıcı daveti, kurum üyeliği, kurum değiştirme ve sahiplik devri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Tek kullanımlık davet ve sahiplik devri kabulü var. Keycloak kaynakta yok. Suite'teki davet yalnızca Drive'a özel (Drive User Invitation), kurum üyeliği değil. Drive'da sahip her deny'ı aşıyor, bu yüzden sahiplik devri dosya erişimini doğrudan etkiliyor ve talimatta yok.

Eksik:

- Keycloak kullanıcı/organization ↔ Frappe User eşlemesi ve provisioning yönü (JIT mi, SCIM benzeri mi) tanımsız.
- Kurum değiştirmede aktif oturum ve cache bağlamının nasıl yenileneceği belirtilmemiş.
- Sahiplik devrinin Drive File.owner ve DocShare kayıtlarına etkisi tanımsız.
- Drive davetinin kurum davetiyle ilişkisi tanımsız (yeniden kullanım mı, ayrı akış mı).

Nasıl tamamlanır: membership--implementation için Keycloak↔Frappe User eşleme sözleşmesini ve sahiplik devri kapsamını yaz: hangi DocType'larda owner değişir, hangi paylaşımlar korunur. Drive davetini kurum üyeliği yerine geçirme.

Kaynak dayanakları: `suite/suite/drive/api/permissions.py:53`; `suite/suite/hooks.py:127`; `frappe/frappe/permissions.py:7`.

Rehber: [membership](./frappe-roadmap-contracts/membership.json). Mevcut birincil görev: `membership--implementation`.

### tenant-5 — Veri, dosya, önbellek, arama ve görevlerde kiracı izolasyonu.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul, kayıt/dosya/cache/arama/job eksenlerini doğru listeliyor. Kaynakta site_cache/redis_cache, has_permission ve enqueue primitive'leri var. Suite framework File iznini tamamen Drive'a devrediyor. Suite ayrıca yerel arama (tantivy), S3 (boto3) ve site dışı servisler kullanıyor. Bunların kiracı izolasyonu talimatta ele alınmamış.

Eksik:

- ignore_file_permissions=True nedeniyle dosya izolasyonunun Drive mantığına bağlı olduğu belirtilmemiş.
- tantivy indeks yolu ve S3 bucket/prefix'in site başına ayrılıp ayrılmadığı tanımsız.
- Site dışı collab/sfu servislerinin kiracı doğrulaması yok.
- Global (site dışı) cache anahtarı ve job site bağlamı için kontrol listesi yok.
- Paylaşılan 1 test dosyası / 3 senaryo bütçesinde hangi çapraz erişim senaryolarının seçileceği belirtilmemiş.

Nasıl tamamlanır: tenant-registry--implementation altında izolasyon envanteri çıkar: DB, Drive File, S3 prefix, tantivy indeks, Redis anahtarı, RQ job ve harici servis için kaynak noktası ve beklenen ret davranışı. Bütçe içindeki 3 senaryoyu bu envanterden seç, test yazma.

Kaynak dayanakları: `suite/suite/hooks.py:117`; `suite/pyproject.toml:27`; `suite/pyproject.toml:15`; `frappe/frappe/website/website_components/metatags.py:73`; `frappe/frappe/website/website_generator.py:135`.

Rehber: [tenant-registry](./frappe-roadmap-contracts/tenant-registry.json). Mevcut birincil görev: `tenant-registry--implementation`.

### tenant-6 — Kiracı taşıma ve paylaşımlı / ayrılmış kurulum arasında geçiş.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de site düzeyinde taşıma araçları var. `bench backup` komutu (frappe/frappe/commands/site.py:956) scheduled_backup/BackupGenerator ile veritabanını, site_config.json dosyasını ve isteğe bağlı olarak public ve private files dizinlerinin tar arşivini alıyor. DocType için include/exclude, sıkıştırma, şifreleme ve hata durumunda rollback_callback destekleniyor. `restore` komutu (site.py:208) site_restore dosya kilidi altında çalışıyor; SQL'i ve isteğe bağlı public/private tar dosyalarını geri yüklüyor, gerekirse şifreyi çözüyor. `partial-restore` ve `migrate` (SiteMigration) da var. `migrate-to` komutu ise yalnızca Frappe Cloud'a özgü: frappecloud.com'dan uzak bir betik indirip execv ile çalıştırıyor; yerel ve sağlayıcıdan bağımsız bir taşıma değil. Suite tarafında veri siteye göre ayrılıyor. Tantivy arama indeksi sites/<site>/private/files/search-index, LMDB veri deposu private/files/data-store altında; ikisi de private tar'a girdiği için yedeğe dolaylı olarak dahil. Blob deposu bilerek sites/<site>/blob-store altında tutuluyor ve yedek dışında kalıyor; kaynaktaki açıklamaya göre bu bir önbellek ve gerektiğinde yeniden çekiliyor. Drive içerikleri isteğe bağlı olarak Drive Disk Settings'teki S3 bucket'ında tutulabiliyor. Suite'in after_migrate hook'ları mevcut. taşıma veya yedekleme sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kiracıyı paylaşımlı ve ayrılmış kurulum arasında taşıyan bir orkestrasyon kaynakta yok: kiracı kaydında topoloji alanı, taşıma durum makinesi ve deneme taşıması ile doğrulama adımı bulunmuyor.
- Geri dönüş tetik ölçütü, RPO/RTO ve kesinti penceresi kodda tanımlı değil; restore yalnızca elle çalıştırılan bir CLI adımı.
- Frappe yedeği S3 bucket nesnelerini ve blob-store'u kapsamıyor; S3 nesnelerini kopyalamak veya bucket'ı yeniden bağlamak için bir mekanizma yok.
- Ayrı çalışan Suite servislerinin (sheets collab-server, meet sfu-server, mail) durumunu taşıma sırasına bağlayan bir kod yok.
- Hedef ortamda Keycloak/OAuth kimlik eşlemesinin korunduğunu doğrulayan bir kural yok.
- Hedefte Tantivy indeksinin tutarlılığını kontrol edecek ya da indeksi yeniden kuracak bir kanca yok (yalnızca şema sürümü değişince yeniden kurulum yapılıyor).
- DNS ve host değişikliği ile rol ayrımı kaynakta yok; `bench add-to-hosts` yalnızca yerel /etc/hosts dosyasına yazıyor.
- hooks.py'de izinli yollar listesinde `/api/method/create-site-migration` geçiyor ama kurulu kaynakta bu yolu karşılayan bir uygulama bulunamadı.
- Headless provider'da taşıma veya topoloji durumunu sunan bir sözleşme yok.

Nasıl tamamlanır: Mevcut tenant-registry--implementation-scale görevi altında, tenant-registry--contract/schema/implementation ve kernel-envelope--contract bağımlılıkları sağlandıktan sonra şu sırayla ilerle: (1) Taşıma bileşen envanterini sözleşme olarak yaz: DB, site_config, public/private files (search-index ve data-store dahil), S3 bucket öneki, blob-store (yeniden çekilebilir önbellek), harici servisler ve Keycloak istemci/kimlik eşlemesi. (2) Mevcut `bench backup --with-files` ve `bench restore --with-public-files --with-private-files` komutlarını yeniden kullanan, salt okunur bir taşıma öncesi/sonrası doğrulama fonksiyonu yaz: kayıt sayıları, File kayıtlarına karşı S3 anahtar örneklemesi, Tantivy indeksindeki belge sayısı ve kullanıcı↔Keycloak eşlemesi karşılaştırılsın. Bunun için önce başarısız (RED), sonra geçen (GREEN) bir test yaz. (3) Geri dönüş ölçütünü ve RPO/RTO değerlerini bu doğrulamanın çıktısına bağla. DNS kayıt gereksinimini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın; bunu kod dışında bir devir notu olarak tut. `migrate-to` komutunu (Frappe Cloud uzak betiği) kullanma. Yeni altyapı önerilmiyor.

Kaynak dayanakları: `frappe/frappe/commands/site.py:223`; `frappe/frappe/utils/backups.py:380`; `frappe/frappe/integrations/frappe_providers/frappecloud.py:10`; `suite/suite/store/__init__.py:29`; `suite/suite/store/__init__.py:38`; `suite/suite/hooks.py:408`.

Rehber: [tenant-registry](./frappe-roadmap-contracts/tenant-registry.json). Mevcut birincil görev: `tenant-registry--implementation-scale`.

### tenant-7 — Kiracı klonlama; yapılandırma ve şablon verisini seçerek yeni kiracı oluşturma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Koşullu kapsam ve kabul iyi: kişisel veri, oturum, anahtar ve canlı entegrasyon aktarılmıyor, kaynak değişmiyor. Kaynakta yalnızca belge düzeyinde copy_doc var. no_copy ve özel alanları ayıklıyor ama site/kiracı klonlama değil. Restore kaynağı pakette yok.

Eksik:

- Klonlanacak yapılandırma/şablon DocType izin listesi (allowlist) tanımsız.
- Gizli değer ve kişisel veri ayıklama listesi yok (site conf, OAuth/API kayıtları, User, DocShare).
- tenant-3 oluşturma akışıyla ilişkisi tanımsız (klon = oluştur + seçmeli içe aktarma mı?).
- Yetki modeli yok: kaynak kiracıda kim okuyabilir, hedefte kim oluşturabilir.

Nasıl tamamlanır: tenant-registry--implementation-post-mvp için klonu 'tenant-3 ile oluştur + allowlist'teki şablon DocType'larını native izinlerle kopyala' olarak tanımla. Varsayılan olarak reddedilen DocType/alan listesini kabul metnine ekle.

Kaynak dayanakları: `frappe/frappe/api/v2.py:218`; `frappe/frappe/api/v2.py:220`.

Rehber: [tenant-registry](./frappe-roadmap-contracts/tenant-registry.json). Mevcut birincil görev: `tenant-registry--implementation-post-mvp`.

### audit-1 — Audit (denetim izi) ve kullanıcı/işlem kayıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var, birincil görev audit-envelope--implementation'a bağlı. Kaynakta Version diff'i Document yaşam döngüsünde üretiliyor. REST v1 ve v2 yazma yolları doc.save() üzerinden geçiyor. Ancak Suite'te frappe.db.set_value ile yapılan doğrudan yazmalar bu yaşam döngüsünü atlıyor; bu yüzden 'UI, API ve arka plan işi' kapsamı kendiliğinden sağlanmıyor.

Eksik:

- Talimatta hangi yazma yollarının (Document.save, db.set_value, bulk delete enqueue, Suite op-log) zarfa gireceği listelenmemiş.
- Kaynak listesi version-15 belgelerine atıf yapıyor; yerel ortam Frappe 17.0.0.dev0 (adf1fd0c) için sürüm eşlemesi yok.
- Activity Log, Access Log ve Audit Trail kaynakları bu excerpt'te görülmedi; yerel davranışları bilinmiyor.
- Track changes ayarının hangi DocType'larda açık olacağına dair bir karar yok.

Nasıl tamamlanır: audit-envelope--implementation görevine kritik yazma yollarının envanterini ekle (Document.save, db.set_value istisnaları, enqueue edilen işler). Version, Activity Log ve Access Log için yerel v17 kaynağına sürüm eşlemesi yaz. Yeni görev kaydı açma.

Kaynak dayanakları: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v2.py:293`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `frappe/frappe/core/doctype/document_naming_rule/document_naming_rule.json:119`.

Rehber: [audit-envelope](./frappe-roadmap-contracts/audit-envelope.json). Mevcut birincil görev: `audit-envelope--implementation`.

### audit-2 — Eski/yeni değer, kullanıcı, kiracı, işlem kaynağı ve gerekçe.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Version kaydı alan bazında eski/yeni değeri, impersonated_by ve audit_user bilgisini, updater_reference ve via_data_import kaynağını kaydediyor. Kiracı (tenant) ve zorunlu gerekçe alanı kaynakta yok. Ignore Versioning ile işaretli alanlar diff'e girmiyor.

Eksik:

- Ortak zarfın şeması (tenant, kaynak, gerekçe, korelasyon kimliği) ve updater_reference ile ilişkisi tanımlı değil.
- Tenant'ın site mi yoksa kayıt alanı mı olduğu tanımlanmamış.
- Gerekçenin hangi işlemlerde zorunlu olacağı ve eksikse ne olacağı (red ya da uyarı) belirtilmemiş.
- ignore_versioning_fields ve büyük metin alanları için eski/yeni değer politikası yok.

Nasıl tamamlanır: Zarf sözleşmesini audit-envelope--implementation içinde Version.data ile updater_reference üzerine eşle; tenant ve gerekçe alanlarını ve zorunluluk kuralını yaz. ORM'i veya Version'ı kopyalama.

Kaynak dayanakları: `frappe/frappe/core/doctype/version/version.py:110`; `frappe/frappe/core/doctype/version/version.py:143`; `frappe/frappe/core/doctype/version/version.py:142`; `frappe/frappe/core/doctype/version/version.py:129`.

Rehber: [audit-envelope](./frappe-roadmap-contracts/audit-envelope.json). Mevcut birincil görev: `audit-envelope--implementation`.

### audit-3 — Destek erişimi, yönetici işlemi ve yetki değişikliği denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Version, oturumdaki impersonated_by ve audit_user değerlerini kaydederek gerçek ve etkin aktörü ayırmak için bir temel sunuyor. Yönetici sayaç değişikliği gibi bazı admin işlemleri elle Version yazıyor. Keycloak rol değişikliğini ilişkilendiren bir kaynak bu excerpt'te yok.

Eksik:

- Destek erişiminin impersonated_by ya da audit_user ile nasıl başlatılıp sonlandırılacağına dair talimat yok.
- Keycloak admin event'lerinin Frappe kaydıyla hangi korelasyon anahtarıyla eşleşeceği tanımlı değil.
- Frappe Role ve Has Role değişikliklerinin izlenme kapsamı belirtilmemiş.
- Admin işlemlerindeki ignore_permissions ile Version yazımı yalnızca iç kullanım; dışa açılmaması gerektiği talimatta yazmıyor.

Nasıl tamamlanır: audit-envelope--implementation'a gerçek/etkin aktör alanlarını impersonated_by ve audit_user üzerine eşleyen bir madde ekle. Keycloak event korelasyonunu ayrı bir bağımlılık olarak yaz (ui-family-27 destekleyici kalır).

Kaynak dayanakları: `frappe/frappe/core/doctype/version/version.py:43`; `frappe/frappe/core/doctype/version/version.py:46`; `frappe/frappe/core/doctype/document_naming_settings/document_naming_settings.py:222`; `frappe/frappe/core/doctype/document_naming_settings/document_naming_settings.py:236`.

Rehber: [audit-envelope](./frappe-roadmap-contracts/audit-envelope.json). Mevcut birincil görev: `audit-envelope--implementation`.

### audit-4 — Kayıt değişikliğine karşı koruma, saklama süresi ve erişim sınırı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Rol ve izin primitive'leri ile Suite log DocType'ları için has_permission ve permission_query hook'ları var. Ancak Administrator her izni koşulsuz geçiyor. Suite tarafı Writer Version kayıtlarını doküman silinince siliyor ve Sheet op log'u zamanlanmış görevle kırpıyor. Değişmez veya WORM saklama kaynakta yok.

Eksik:

- Saklama süresi değeri ve hangi log türlerine uygulanacağı belirtilmemiş.
- truncate_op_log ve Writer Version silme davranışının audit saklamasıyla çakışması ele alınmamış.
- Korumalı kopyanın hedefi (S3 Object Lock vb.), sahibi (Hüseyin Cengiz) ve kabul ölçütü yok.
- Administrator bypass'ına karşı yönetici müdahalesinin nasıl iz bırakacağı tanımlı değil.

Nasıl tamamlanır: audit-envelope--implementation'a saklama matrisini (log türü, süre, korumalı kopya hedefi) ekle. Suite'teki truncate ve silme davranışlarını audit kapsamı dışı ya da korumalı kopyaya bağlı olarak işaretle. Altyapı adımını Hüseyin Cengiz'e devret.

Kaynak dayanakları: `frappe/frappe/permissions.py:109`; `suite/suite/hooks.py:298`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`; `suite/suite/hooks.py:128`.

Rehber: [audit-envelope](./frappe-roadmap-contracts/audit-envelope.json). Mevcut birincil görev: `audit-envelope--implementation`.

### audit-5 — Denetim araması, dışa aktarım ve hassas veri maskeleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Arama ve dışa aktarım için zemin var: Version üzerinde ref_doctype+docname indeksi, export izin türü, izin kontrollü get_list ve alan bazlı okuma izni. Data Masking kaynağı bu excerpt'te görülmedi, bu yüzden yerel v17'deki durumu bilinmiyor. Talimat v16 nightly belgesine dayanıyor.

Eksik:

- Talimat v16 deneysel belgesine dayanıyor; yerel 17.0.0.dev0 için Data Masking kaynak doğrulaması yok.
- Hassas alan listesi ve hangi çıktı yollarının (REST, CSV/JSON export, Query Report, raw SQL) kapsanacağı tanımlı değil.
- Version.data içindeki eski/yeni değerlerde hassas alanların maskelenme kuralı yok.
- Version'da tenant veya aktör bazlı arama için gerekli indeks ve filtre sözleşmesi tanımlanmamış.

Nasıl tamamlanır: Yerel v17 kaynağında Data Masking ve report/export yollarını salt okunur incele. Sonuçları audit-envelope--implementation kabulüne çıktı yolu × maskeleme tablosu olarak yaz. Raw SQL ile kısayol açma.

Kaynak dayanakları: `frappe/frappe/core/doctype/version/version.py:256`; `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v1.py:84`; `suite/frontend/src/apps/sheets/services/versions.js:119`.

Rehber: [audit-envelope](./frappe-roadmap-contracts/audit-envelope.json). Mevcut birincil görev: `audit-envelope--implementation`.

### legal-1 — KVKK (Kişisel Verilerin Korunması Kanunu) ve GDPR (General Data Protection Regulation — Genel Veri Koruma Tüzüğü) kapsamı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: işleme amacı, dayanak, sorumlu ve tedbir bir kapsam kaydına bağlanacak. Ancak talimat yerel GDPR araçlarını eşlemiyor. Frappe v17 kaynağında Personal Data Deletion/Download Request ve `user_data_fields` hook'u var. Bunlar teknik yardımcıdır; KVKK/GDPR uyum kanıtı değildir.

Eksik:

- Kontrol matrisinin biçimi tanımlı değil; her satırın amaç, DocType, alan, dayanak ve saklama süresi içermesi gerekiyor.
- Kurulu Suite modüllerinin (Mail, Drive, Calendar vb.) `user_data_fields` tanımı incelenen hooks parçasında görülmedi; silme ve indirme kapsamı bilinmiyor.
- Anonimleştirmedeki varsayılan telefon değeri '+91 0000000000'; TR bağlamına uygun olup olmadığı kararı yok.
- Silme formu `login_required: 0` ile açık. Doğrulama yalnızca e-posta imzasına dayanıyor; bunun kabul edilebilirliği değerlendirilmemiş.

Nasıl tamamlanır: Hukukun onaylayacağı tek bir işleme envanteri hazırlansın: her amaç için ilgili DocType'lar ve `user_data_fields` kapsamı. Suite hooks dosyasının tamamında `user_data_fields` tanımı aranarak eksik DocType'lar listelensin. Yeni görev açılmasın; mevcut `consent-evidence--implementation` görevine bağlansın.

Kaynak dayanakları: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41`; `frappe/frappe/website/doctype/personal_data_download_request/personal_data_download_request.py:97`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:51`; `frappe/frappe/website/web_form/request_to_delete_data/request_to_delete_data.json:22`.

Rehber: [consent-evidence](./frappe-roadmap-contracts/consent-evidence.json). Mevcut birincil görev: `consent-evidence--implementation`.

### legal-2 — Gizlilik, çerez, üyelik, hizmet sözleşmesi ve anlaşma yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef belli ama genel; hangi belge türlerinin hangi akışta gösterileceği tanımlı değil. Kaynakta DocType izinleri ve Suite signup şablonu var, fakat politika/sözleşme belgesi yöneten bir model incelenen parçalarda yok. Kaynak olarak version-15 Web Page şeması verilmiş; yerel kurulum v17 dev olduğu için bu eşleme doğrulanmamış.

Eksik:

- Belge türü listesi ve akış eşlemesi eksik (signup → üyelik + aydınlatma, çerez banner → çerez politikası).
- Web Page/CMS mi, ayrı bir DocType mı kararı yok. Headless React istemcisinin belgeyi hangi okuma API'siyle alacağı tanımlı değil.
- Kaynak bağlantısı version-15; yerel v17 Web Page şemasıyla doğrulanmadı.
- Suite signup şablonunda kabul adımının nereye bağlanacağı tanımlı değil.

Nasıl tamamlanır: `policy-document--implementation` görevine belge türü ve akış tablosu eklensin. Tablo, Suite'in `signup_form_template` ve User `before_insert` noktalarını bağlanma yeri olarak göstersin. Okuma yetkisi native DocType izinleriyle verilsin; `ignore_permissions` kullanan bir yardımcı açılmasın.

Kaynak dayanakları: `suite/suite/hooks.py:370`; `suite/suite/hooks.py:245`; `frappe/frappe/permissions.py:82`.

Rehber: [policy-document](./frappe-roadmap-contracts/policy-document.json). Mevcut birincil görev: `policy-document--implementation`.

### legal-3 — Metin sürümü, dil, yürürlük tarihi, kabul kanıtı ve yeniden kabul.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni net: eski kanıt korunacak, yeni sürüm yürürlüğe girince yeniden kabul istenecek. Ancak değişmezlik ve saklama sözleşmesi yok. `track_changes` (Version) değişiklik geçmişi tutar ama hukuki kabul kanıtı değildir. Silinen kayıtlar Deleted Document'e gider ve varsayılan olarak 180 gün sonra temizlenir; kanıt kaybı riski var.

Eksik:

- Yayımlanmış sürümün değişmezlik kuralı tanımlı değil: düzenleme yerine yeni sürüm mü açılacak, submit/amend mi kullanılacak?
- Dil ve yürürlük tarihi alanları, dil fallback kuralı ve sürümler arası 'yeniden kabul gerekir' bayrağı tanımlı değil.
- Yeniden kabulün nerede zorlanacağı (giriş veya işlem kapısı) ve headless istemciye nasıl bildirileceği tanımlı değil.
- Kabul kanıtının silinmeye karşı korunması ve Deleted Document'in 180 günlük temizliğinden ayrı tutulacak saklama süresi tanımlı değil.
- Version kaynağı version-15 bağlantısı; v17 kaynağıyla eşlenmedi.

Nasıl tamamlanır: `policy-document--implementation` ve `consent-policy-reference--implementation` için bir veri sözleşmesi yazılsın. Sözleşme şunları içersin: belge, sürüm, dil, yürürlük tarihi, `requires_reacceptance`, değişmez yayın durumu ve kanıt kaydında silme yetkisinin kapalı olması. Kabul kriterine 'eski kabul kaydı sürüm linkiyle birlikte okunabilir kalır' eklensin.

Kaynak dayanakları: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.json:71`; `frappe/frappe/core/doctype/deleted_document/deleted_document.py:34`.

Rehber: [policy-document](./frappe-roadmap-contracts/policy-document.json). Mevcut birincil görev: `policy-document--implementation`.

### legal-4 — Aydınlatma, açık rıza ve sözleşme kabulünün ayrı kayıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

KVKK ayrımı kabul metninde doğru kurulmuş: aydınlatma, açık rıza ve sözleşme kabulü ayrı olaylar; biri geri çekilince diğerinin kanıtı değişmiyor. Kaynakta if_owner okuma izni ve alan düzeyi okuma izni gibi yapı taşları var. Ancak olay modeli ve silme/anonimleştirme ile ilişkisi tanımlı değil.

Eksik:

- Olay türleri (sunum / rıza / geri çekme / sözleşme kabulü) ve zorunlu alanlar tanımlı değil: kullanıcı, sürüm, kanal, zaman, kaynak.
- Geri çekmenin yeni bir olay olarak eklenip eklenmeyeceği (append-only) yazılmamış; mevcut kaydın güncellenmesi engellenmeli.
- Kanıt kayıtları `user_data_fields` kapsamına girerse silme talebinde redakte edilir. Silme ile kanıt saklama arasındaki hukuki karar eksik.
- Kullanıcının kendi kanıtını görme yetkisi (if_owner read) ve yöneticinin silme yetkisinin kapatılması tanımlı değil.

Nasıl tamamlanır: `consent-evidence--implementation` görevine iki şey eklensin: append-only olay şeması ve izin matrisi (sahibi okur, kimse silmez). Hukuktan bu kayıtların silme talebinde redakte mi edileceği yoksa saklanacak mı olduğu yazılı karar olarak alınsın.

Kaynak dayanakları: `frappe/frappe/website/doctype/personal_data_download_request/personal_data_download_request.json:60`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41`.

Rehber: [consent-evidence](./frappe-roadmap-contracts/consent-evidence.json). Mevcut birincil görev: `consent-evidence--implementation`.

### legal-5 — Çerez tercihleri, ticari ileti izinleri ve geri çekme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de yalnız e-posta kanalı için geri çekme (opt-out) primitive'i var. Email Unsubscribe DocType iki tür kayıt tutuyor: belirli bir belgeye bağlı (reference_doctype/reference_name) kayıt ve global_unsubscribe kaydı. Controller tekrar eden kaydı ve global kaydın daraltılmasını engelliyor. frappe.email.queue.unsubscribe guest olarak çağrılabiliyor ve imzalı istek doğrulamasından (verify_request) sonra bu kaydı oluşturuyor. Bağlantı, Email Queue'daki imzalı parametrelerle (get_signed_params) e-postanın altına ekleniyor. frappe.sendmail → QueueBuilder kuyruğa alma sırasında get_unsubscribed_user_emails ile to/cc/bcc alıcılarını eliyor: global kaydı olanlar ve aynı referans için çıkanlar düşüyor. Bu, e-postada sonraki gönderimi durduran gönderim öncesi kontrol noktası. Email Group Member.unsubscribed alanı var. Suite yalnız hooks.py'de unsubscribe endpoint'ini izinli rotalar listesine almış. Suite Mail'deki is_newsletter / Mail Queue.newsletter bayrağı yalnız toplu teslim modunu ve önceliği belirliyor; izin denetimi yapmıyor.

Eksik:

- Çerez tercihleri için kaynakta hiçbir şey yok: zorunlu/isteğe bağlı kategori, banner, tercih saklama ve consent-mode kodu bulunmadı.
- İzin (opt-in) kaydı ve kanıtı yok: zaman, kaynak, metin sürümü ve kanal tutulmuyor. Yalnız geri çekme (opt-out) kaydı var.
- Kanal bazlı izin modeli yok: SMS, push ve telefon için tercih kaydı ve geri çekme yok; mevcut mekanizma yalnız e-posta için.
- İşlemsel ile ticari ileti ayrımı için alan veya bayrak yok. Email Unsubscribe kapsamı referans belge ya da global; bir 'pazarlama' kategorisi yok.
- Suite Mail outbound (suite/mail/api/outbound.py → Mail Queue) Email Unsubscribe filtresini uygulamıyor. Bu yoldan geri çekilmiş alıcıya pazarlama gönderimi engellenmeden geçebilir.
- Bu Frappe kaynağında Newsletter DocType yok. Unsubscribe bağlantısı, açık unsubscribe_message verilmedikçe yalnız reference_doctype == 'Newsletter' olduğunda ekleniyor.
- Filtre kuyruğa alma anında (QueueBuilder) çalışıyor; daha önce kuyruğa girmiş iletilerin flush sırasında yeniden kontrol edildiği doğrulanmadı.
- React/Vite istemcide çerez tercih sözleşmesi bu kaynakta yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Nasıl tamamlanır: Sıralama önerisi, yeni görev kaydı değil; mevcut bağımlılıklar korunur. (1) consent-evidence--contract: kanal (email/sms/push), amaç (transactional/marketing), durum, zaman, kaynak ve metin sürümünden oluşan izin kaydını ve çerez kategorisi sözleşmesini (necessary/optional) yaz. (2) consent-evidence--schema: Email Unsubscribe'ı değiştirmeden ek bir izin DocType'ı tanımla. (3) consent-evidence--implementation: tek gönderim öncesi kontrol noktası kur. En küçük adım: frappe.sendmail/QueueBuilder için marketing bayrağı taşıyan iletilerde izin kontrolü ekle; geri çekmede Email Unsubscribe global veya kanal kaydını da yaz. Ardından aynı kontrolü Suite Mail outbound newsletter yoluna bağla. Önce RED test: geri çekilmiş alıcıya marketing ileti kuyruğa alınmamalı. Çerez tercihini React istemcide bağımsız uygula; headless provider'a yalnız izin okuma/yazma uç noktası ekle.

Kaynak dayanakları: `frappe/frappe/email/queue.py:97`; `frappe/frappe/email/queue.py:105`; `frappe/frappe/email/doctype/email_queue/email_queue.py:792`; `frappe/frappe/email/doctype/email_queue/email_queue.py:805`; `frappe/frappe/email/doctype/email_unsubscribe/email_unsubscribe.py:31`; `suite/suite/mail/api/outbound.py:120`.

Rehber: [consent-evidence](./frappe-roadmap-contracts/consent-evidence.json). Mevcut birincil görev: `consent-evidence--implementation`.

### legal-6 — Müşteri özel sözleşmeleri, veri işleme şartları ve taahhüt kaydı.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Koşullu kapsam ve yetkisiz erişim kabulü tanımlı. Ancak müşteri/tenant kaydına bağlantı yok. ERPNext kurulu olmadığı için Customer DocType'ına bağlanılamaz. Kaynakta yalnız genel izin ve User Permission yapı taşları görülüyor.

Eksik:

- Bağlanılacak müşteri kaydı tanımlı değil: ERPNext Customer yok; tenant veya hesap kaydının ne olacağı kararı eksik.
- Kapsamı tetikleyen koşulun kim tarafından, nasıl kaydedileceği tanımlı değil.
- DPA belgesinin dosyası (Suite Drive veya private File), sürümü, imza/kabul tarihi ve süre alanları tanımlı değil.
- Müşteri bazında görünürlük için User Permission kullanım kuralı tanımlı değil.

Nasıl tamamlanır: `contract-commitment--implementation` görevinde müşteri kaydı kararı netleştirilsin (tenant DocType). Görünürlük native DocType ve User Permission ile sınırlansın. Belge sürüm sözleşmesi legal-3 modeliyle paylaşılsın; kopya bir model kurulmasın.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `frappe/frappe/core/doctype/data_export/exporter.py:47`.

Rehber: [contract-commitment](./frappe-roadmap-contracts/contract-commitment.json). Mevcut birincil görev: `contract-commitment--implementation`.

### legal-7 — Uygulanabilir Türkiye ticari ileti süreçleri için İYS izin eşitleme ve gönderim öncesi kontrolü.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni ayrıntılı: eşitleme, gönderim öncesi kontrol, erişim hatasında güvenli politika ve işlemsel ayrım. Ancak entegrasyon sözleşmesi yok. Sahip 'Frontend ve hukuk' yazılmış; oysa eşitleme sunucu tarafında yapılmalı. Kaynakta kuyruk ve zamanlayıcı yapı taşları var; İYS istemcisi yok.

Eksik:

- Hizmet sağlayıcı/aracı rolü, marka ve kanal kararı yok; post-MVP koşulu belgelenmemiş.
- Sahip yanlış: sunucu entegrasyonu ve secret yönetimi backend ve DevOps işidir.
- Eşitleme yönü, kuyruk/yeniden deneme, idempotency ve İYS erişilemezken gönderimin bloklanması kuralı tanımlı değil.
- legal-5'teki yerel tercih kaydıyla çakışmada hangi kaydın öncelikli olduğu tanımlı değil.

Nasıl tamamlanır: `consent-evidence--implementation-post-mvp` görevinde sahip backend olarak düzeltilsin. Bir arayüz notu eklensin: eşitleme kuyruk/zamanlayıcı ile yapılsın, gönderim legal-5'teki aynı kontrol noktasından geçsin, İYS hatasında gönderim yapılmasın. Credential'lar yalnız site config/secret deposunda tutulsun.

Kaynak dayanakları: `frappe/frappe/api/v2.py:293`; `suite/suite/hooks.py:307`.

Rehber: [consent-evidence](./frappe-roadmap-contracts/consent-evidence.json). Mevcut birincil görev: `consent-evidence--implementation-post-mvp`.

### governance-1 — Veri envanteri, hassasiyet sınıfı ve hangi modülün verinin sahibi olduğu kaydı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Amaç ve kabul ölçütü (sahip, amaç, kopya konumu, saklama kuralı) belli. Ancak envanterin nerede tutulacağı, hassasiyet sınıflarının listesi ve kopya konumlarının nasıl bulunacağı tanımlı değil. Kaynakta DocType meta ve yüksek hassasiyetli kopyalar var (Sheet Op Log/Snapshot, Writer arama dizini) ama envanter modeli yok.

Eksik:

- Hassasiyet taksonomisi ve modül sahipliği alanları tanımlı değil; native Custom Field mı, ayrı bir envanter DocType'ı mı kullanılacağı kararı yok
- Kopya konumları (Writer sqlite_search, mail tantivy, Sheet Snapshot, S3, SFU servisleri) envantere bağlanmamış
- DocType meta'dan otomatik türetme ile insan onaylı sınıflandırma arasındaki sınır belirsiz

Nasıl tamamlanır: data-classification--implementation görevine şunları ekle: (1) Frappe+Suite DocType'ları için hassasiyet sınıfı/sahip/amaç/saklama şeması, (2) bilinen kopya hedefleri listesi. Kabul örneği: Sheet Snapshot içindeki bir alanın sahibi ve kopya konumları envanterden bulunabilmeli.

Kaynak dayanakları: `frappe/frappe/api/v2.py:247`; `suite/suite/sheets/permissions.py:3`; `suite/suite/hooks.py:38`; `suite/pyproject.toml:27`.

Rehber: [data-classification](./frappe-roadmap-contracts/data-classification.json). Mevcut birincil görev: `data-classification--implementation`.

### governance-2 — Arşivleme, saklama süresi, anonimleştirme ve kalıcı silme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı ama kaynak bağlantıları Frappe version-15 dosyalarını gösteriyor; yerel kurulum 17.0.0-dev ve bu sürüme eşleme yapılmamış. Kaynakta Drive soft-trash/kalıcı blob silme ve tek seferlik temizlik patch'i var; politikaya dayalı saklama, arşiv ya da anonimleştirme motoru yok.

Eksik:

- v17-dev için Log Settings/kişisel veri silme API eşlemesi doğrulanmamış (v15 URL)
- Arşiv, anonimleştirme ve kalıcı silme arasında hangi durumda hangisinin seçileceği kuralı yok
- Drive soft-trash (STATUS_TRASHED) ile kalıcı silme arasındaki süre politikası tanımlanmamış
- Saklama istisnası governance-5'e bağımlı ama sıralama yazılmamış

Nasıl tamamlanır: retention-rule--implementation görevine v17-dev kaynak eşlemesini ekle. Politikayı tek bir örnek DocType üzerinde tanımla (Drive File trash → kalıcı silme) ve silme engelini legal-hold görevine bağımlılık olarak yaz.

Kaynak dayanakları: `suite/suite/drive/overrides/file.py:132`; `suite/suite/drive/overrides/file.py:133`; `suite/suite/hooks.py:238`; `suite/suite/slides/doctype/presentation/patches/cleanup_unused_thumbnail_files.py:113`.

Rehber: [retention-rule](./frappe-roadmap-contracts/retention-rule.json). Mevcut birincil görev: `retention-rule--implementation`.

### governance-3 — Silme işlemini dosya, arama, önbellek ve yapay zekâ bilgi tabanına yayma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Drive after_delete ilişkili satırları ve içerik dokümanını siliyor. Ancak arama dizinleri (Writer sqlite_search, mail tantivy), Redis ve AI kopyaları için yayılım görülmedi; hatalar yalnızca log'a yazılıyor, tekrar deneme yok. Görev, governance-2 ve 7 ile aynı primary task'a eşlenmiş; ayrı bir kabul alt bölümü yok.

Eksik:

- Silme hedefi kaydı (dosya/S3, arama, cache, AI) ve her hedef için silme sözleşmesi tanımlı değil
- Tekrar deneme ve görünür başarısızlık durumu yok; mevcut örüntü sadece log_error
- ignore_permissions ile yapılan zincirleme silme, saklama kilidi kontrolünü atlayabilir
- 'Yapay zekâ bilgi tabanı' hedefi belirsiz: GenUI kullanıcının bağımsız projesi; yalnızca Suite içi AI kopyaları (Sheets AI Assist) kapsamda olmalı

Nasıl tamamlanır: retention-rule--implementation içinde 'yayılım' alt kabulü tanımla: silme sonrası hedef başına izlenebilir iş, tekrar deneme ve başarısızlık kaydı. İlk hedefleri Drive blob + Writer arama dizini olarak sınırla; GenUI registry ile birleştirme.

Kaynak dayanakları: `suite/suite/drive/overrides/file.py:152`; `suite/suite/drive/overrides/file.py:138`; `suite/suite/hooks.py:38`; `suite/suite/slides/doctype/presentation/patches/cleanup_unused_thumbnail_files.py:115`.

Rehber: [retention-rule](./frappe-roadmap-contracts/retention-rule.json). Mevcut birincil görev: `retention-rule--implementation`.

### governance-4 — İlgili kişinin erişim, düzeltme, silme ve taşınabilirlik talepleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü belli. Kaynakta izin kontrollü okuma ve alan düzeyi izin filtreleri var; ancak v17-dev'deki Personal Data Download/Deletion Request kaynağı bu excerpt'te görünmüyor (yalnızca v15 URL var). Suite'te File izinleri Drive'a devredilmiş; dışa aktarma kapsamı buna göre tanımlanmamış.

Eksik:

- v17-dev çekirdek DSR DocType'ları kaynakta doğrulanmadı
- Düzeltme (rectification) ve taşınabilirlik formatı tanımlı değil
- Kimlik doğrulama adımı (Keycloak oturumu vs. e-posta doğrulaması) belirsiz
- Drive'ın File izin modeli ve Sheet/Writer/Mail verilerinin dışa aktarma kapsamı listelenmemiş
- ERPNext/HRMS kurulu değil; kapsam yalnızca frappe+suite olmalı

Nasıl tamamlanır: data-subject-request--implementation görevine v17-dev çekirdek DSR kaynak doğrulamasını ön koşul olarak ekle. Kapsam listesini governance-1 envanterinden türet; dışa aktarma Drive izin katmanı üzerinden yapılmalı ve ignore_permissions yardımcıları dışarıya açılmamalı.

Kaynak dayanakları: `frappe/frappe/api/v2.py:86`; `frappe/frappe/api/v2.py:87`; `suite/suite/hooks.py:117`.

Rehber: [data-subject-request](./frappe-roadmap-contracts/data-subject-request.json). Mevcut birincil görev: `data-subject-request--implementation`.

### governance-5 — Hukuki saklama kilidi ve silme istisnaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı ve kapsam koşullu. Sunucu tarafında silmeyi engelleme örüntüsü (on_trash içinde throw) ve doc_events kancaları var; genel bir saklama kilidi modeli yok. Zincirleme silmeler ignore_permissions kullanıyor, bu yüzden kilit kontrolünün izin katmanında değil silme kancasında yapılması gerekiyor.

Eksik:

- Koşullu kapsamın tetikleyicisi (sözleşme ya da hukuki talep) ve karar sahibi tanımlı değil
- Kilidin bağlanacağı silme noktaları listelenmemiş (v1/v2 delete, Drive after_delete zinciri, patch/scheduler)
- Kilit açma gerekçesi ve denetim izi için veri modeli yok

Nasıl tamamlanır: legal-hold--implementation görevinde kilidi on_trash/doc_events seviyesinde, sunucu tarafında zorunlu kılan sözleşmeyi yaz. Kabul: ignore_permissions ile yapılan Drive zincirleme silmesi de kilitli kayıtta reddedilmeli.

Kaynak dayanakları: `suite/suite/drive/overrides/file.py:128`; `suite/suite/drive/overrides/file.py:136`; `suite/suite/hooks.py:224`; `frappe/frappe/api/v2.py:240`.

Rehber: [legal-hold](./frappe-roadmap-contracts/legal-hold.json). Mevcut birincil görev: `legal-hold--implementation`.

### governance-6 — Veri yerleşimi, ülke/bölge kısıtları ve alt işleyen envanteri.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yalnız ilgili altyapı taşları var; yerleşim politikası yok. (1) Suite Drive'daki FileManager (suite/suite/drive/utils/files.py), S3 bucket'ının gerçek bölgesini get_bucket_location ile bulup 24 saat cache'liyor. Bu bilgi yalnız presigned URL imzası için kullanılıyor; bölgeye izin verme veya engelleme yapılmıyor. Custom endpoint_url (MinIO vb.) tanımlıysa bölge hiç sorgulanmıyor. (2) Veriyi dışarı gönderen noktalar ayarlarla veya site config ile tanımlı: Drive Disk Settings endpoint_url/bucket ve Sheets AI Settings api_key/model. Anthropic istemcisi base_url veya bölge seçeneği olmadan varsayılan uç noktayla kuruluyor ve çalışma sayfası bağlamını gönderiyor. Bunlara ek olarak site config'te sfu_server_url, recorder_server_url, collab_ws_url ve push_relay_server_url; Suite Settings'te suite_cloud_url; Mail Settings'te server_url var. (3) frappe System Settings'teki country alanı yalnız yerel ayar varsayılanıdır, veri yerleşimini zorlamaz. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Onaylı bölge/ülke listesi modeli (DocType veya site config) yok
- Alt işleyen envanteri kaydı yok: S3, Anthropic, Meet SFU/recorder/STT, Sheets collab, push relay, Suite Cloud ve Mail sunucusu bağlanmamış
- Ayar kaydedilirken uç nokta veya bölge doğrulaması yok; S3 bölge tespiti engelleme amacıyla kullanılmıyor
- Yasak bölgeye yeni aktarımı engelleyen bir uygulama noktası yok (validate hook ya da egress allowlist)
- Tenant başına yerleşim bağlamı ve yedek/analitik kopyalarının konum kaydı yok
- Headless provider'da yerleşim ve alt işleyen bilgisini sunan sözleşme yok
- Ağ egress politikası ve gerçek veri merkezi konumu kaynaktan kanıtlanamaz; bu, Hüseyin Cengiz'in altyapı doğrulaması ve Hukuk ekibinin sözleşme kontrolüdür

Nasıl tamamlanır: Mevcut residency-policy--contract → residency-policy--schema → residency-policy--implementation sırası izlenmeli. En küçük adım iki parçalı: önce onaylı bölge listesi için tek bir ayar tanımlanır. Ardından Drive Disk Settings validate() içinde, files.py'deki get_bucket_location mantığı yeniden kullanılarak S3 bucket bölgesi bu listeyle karşılaştırılır. Liste dışı bölgede ya da doğrulanamayan custom endpoint'te kayıt reddedilir; önce RED/GREEN testi yazılır. Sonra aynı allowlist kontrolü Sheets AI çağrısından önce ve site config URL'lerine (SFU, recorder, collab, push relay, suite_cloud) envanter kaydı olarak uygulanır. Headless provider'a, alt işleyen listesini salt okunur sunan bir uç nokta yerleşim sözleşmesinden sonra eklenir. Egress engeli ve fiziksel konum kanıtı Hüseyin Cengiz'in altyapı devrine bağlanır.

Kaynak dayanakları: `suite/suite/drive/utils/files.py:246`; `suite/suite/drive/utils/files.py:42`; `suite/suite/sheets/ai/client.py:88`; `suite/suite/meet/utils/sfu_config.py:12`; `suite/suite/meet/api/recording.py:272`; `suite/suite/suite_core/doctype/suite_settings/suite_settings.json:61`.

Rehber: [residency-policy](./frappe-roadmap-contracts/residency-policy.json). Mevcut birincil görev: `residency-policy--implementation`.

### governance-7 — Yedekten dönüşte daha önce silinmiş verilerin yeniden silinmesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe'de ilgili ilkel parçalar var: (1) `bench restore` (commands/site.py restore/_restore/restore_backup) SQL dökümünü `_new_site(source_sql=...)` ile içe alıyor ve isteğe bağlı olarak dosyaları açıyor; bu akışta restore sonrası kanca, silme yeniden oynatma veya bakım/karantina kapısı yok. (2) Personal Data Deletion Request DocType'ı `user_data_fields` kancasında tanımlı DocType'ları anonimleştiriyor (redact/rename, User yeniden adlandırma, rewrite_owner_fields); günlük zamanlanmış iş `process_data_deletion_request` da bunu çalıştırıyor. Ancak talep kaydı e-postayı açık metin olarak aynı veritabanında tutuyor; eski bir yedek geri yüklenince talebin kendisi de kayboluyor. (3) Deleted Document, silinen dokümanın tam JSON'unu (`doc.as_json()`) aynı veritabanında saklıyor. Bu bir tombstone değil, geri dönüşüm kutusu gibi çalışıyor ve kişisel veri taşıyor. (4) migrate.py'de kullanılabilir bir `after_migrate` kanca noktası var; Suite'in after_migrate'i yalnızca mail işini çalıştırıyor. api.py:719'daki 'restored' ifadesi istek bağlamıyla ilgili ve bu konuyla ilgisiz. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Veritabanı yedeğinden bağımsız saklanan ve kişisel veri taşımayan bir tombstone deposu yok (örneğin tenant başına tuzlanmış hash anahtarı, DocType, silme zamanı, karar kimliği).
- Restore veya migrate sonrasında tombstone'ları yeniden uygulayan bir işleyici yok.
- Kullanıcı trafiği, scheduler ve kuyruk açılmadan önce çalışan bir karantina/servis açılış kapısı yok; restore akışı hiçbir kanca çağırmıyor.
- Hard delete (frappe.delete_doc / frappe.db.delete) ve Drive after_delete için tombstone yazımı yok.
- Arama ve RAG/AI kopyalarının yeniden temizlenmesi governance-3 yayılımına bağlı; kaynakta indeks veya vektör temizleyen restore entegrasyonu bulunmadı.
- Personal Data Deletion Request kaydının kendisi PII taşıyor ve yedekle birlikte geri dönüyor ya da kayboluyor; yeniden oynatmaya kaynak olamaz.

Nasıl tamamlanır: retention-rule--contract ve retention-rule--schema bağımlılıkları tamamlandıktan sonra retention-rule--implementation içinde şu sırayla dar bir RED/GREEN adımı uygulanmalı: (1) PII içermeyen tombstone şeması tanımlanmalı ve yedek dışı bir depoya yazılmalı. (2) Personal Data Deletion Request'in _anonymize_data akışı ile hard-delete yolu tamamlandığında tombstone yazılmalı. (3) Suite'in after_migrate kancasına ve ayrı bir bench komutuna, tombstone'ları mevcut anonimleştirme ve silme ilkelleriyle yeniden uygulayan, idempotent bir replay eklenmeli. (4) Replay başarıyla bitene kadar site maintenance/scheduler kapalı tutulmalı (karantina kapısı). (5) governance-3 hedeflerinin (arama ve RAG kopyaları) yeniden temizlenmesi bağımlılık olarak çağrılmalı. İlk test: silinmiş bir kişiyi içeren bir fixture restore edilir, ardından replay çalıştırılır ve kişinin anonimleşmiş olduğu doğrulanır.

Kaynak dayanakları: `frappe/frappe/commands/site.py:404`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:41`; `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:302`; `frappe/frappe/model/delete_doc.py:259`; `frappe/frappe/migrate.py:212`; `suite/suite/suite_core/boot.py:88`.

Rehber: [retention-rule](./frappe-roadmap-contracts/retention-rule.json). Mevcut birincil görev: `retention-rule--implementation`.

### search-1 — Tam metin arama ve Meilisearch adaptörü.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel Frappe v17-dev kaynağında SQLiteSearch (FTS5) soyut sınıfı ve `sqlite_search` hook'u var. Suite bunu WriterSearch ile, Mail ise Tantivy SearchStore ile kullanıyor. Meilisearch adaptörü kaynakta yok. Talimat FullTextSearch API'sine ve v16 dokümanına atıf yapıyor; v17'deki SQLiteSearch ve Suite'teki Tantivy yolu ile eşleştirme yapılmamış.

Eksik:

- Adaptör sözleşmesi tanımlı değil: hangi yerel soyutlama genişletilecek (SQLiteSearch, SearchStore ya da yeni bir arayüz)?
- Varsayılan tokenizer `unicode61 remove_diacritics 2`. Türkçe i/ı/İ katlaması ve ş/ğ normalizasyonu için kabul örneği yok.
- İndekslenecek DocType/alan seçimi için Global Search Settings ve Property Setter yolunun yeniden kullanımı belirtilmemiş.
- Meilisearch'ün koşullu mu yoksa varsayılan mı olduğuna dair karar ve sürüm bağlaması yok.

Nasıl tamamlanır: search-index--implementation görevine şu adımları ekle: önce yerel SQLiteSearch (v17) temel yol olsun, Meilisearch yalnızca opsiyonel bir adaptör olarak kalsın. Türkçe normalizasyon ve silme kabul örneklerini aynı görev içinde yaz.

Kaynak dayanakları: `frappe/frappe/search/sqlite_search.py:107`; `frappe/frappe/search/sqlite_search.py:224`; `suite/suite/hooks.py:38`; `suite/pyproject.toml:27`.

Rehber: [search-index](./frappe-roadmap-contracts/search-index.json). Mevcut birincil görev: `search-index--implementation`.

### search-2 — Facets (alan değerlerine göre çok boyutlu filtreleme).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Facet için yerel parçalar var: izin kapsamlı `get_list` group_by ile gruplayabiliyor, `get_count` ile sayım yapılabiliyor. Mail ve Calendar arayüzlerinde de filtre rozetleri var. Ancak birleşik bir facet servisi ya da facet sayısı API'si görülmedi. Kabul kriteri doğru (sızıntı olmamalı, sonuçla aynı kapsam), fakat facet'in hangi izin filtresinden türetileceği tanımlanmamış.

Eksik:

- Facet sayılarının sonuç sorgusuyla aynı izin ve tenant predikatından üretileceğine dair sözleşme yok.
- Yalnızca indekslenen alanların facet olarak sunulması kuralı yazılmamış. Calendar kaynağı bu kuralı uyguluyor.
- Facet alan seçimi metadata'dan (DocField) mı gelecek, yoksa sabit mi olacak? Belirsiz.

Nasıl tamamlanır: search-query--implementation görevine facet sözleşmesini ekle: sayılar, izin filtresi uygulanmış aynı sorgudan türetilsin, yalnızca indekslenen alanlar facet olabilsin. Harici motor gerekirse aynı predikatı kullansın.

Kaynak dayanakları: `frappe/frappe/client.py:30`; `frappe/frappe/client.py:78`; `suite/frontend/src/apps/calendar/composables/useCalendarSearchFilters.ts:37`.

Rehber: [search-query](./frappe-roadmap-contracts/search-query.json). Mevcut birincil görev: `search-query--implementation`.

### search-3 — Vector search (vektör benzerlik araması) ve Qdrant adaptörü.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

frappe ve suite kaynak köklerinde vektör benzerlik araması, embedding üretimi, Qdrant istemcisi, adaptörü veya bağımlılığı yok. Taranan iki kökte yalnızca sözcük tabanlı tam metin araması bulunuyor. Bunlar vektör araması için temel sayılmaz; yalnızca yeniden kullanılabilecek bitişik desenlerdir: (1) Upstream frappe/frappe/search/sqlite_search.py: SQLite FTS5 ve BM25 sıralamalı, soyut SQLiteSearch sınıfı. get_search_filters ile sorgu düzeyinde izin süzmesi (pre-filter) yapıyor; indeks dosyası site yolu altında duruyor. (2) Upstream Suite suite/suite/store/search_store.py: Tantivy ile tam metin indeksi kuran SearchStore. Her namespace için ayrı dizin açıyor ve FIELDS değişince şema sürümünü artırıp indeksi yeniden kuruyor. get_search_base_path indeksleri siteye özgü private dizinde tutuyor. (3) frappe redis_wrapper içindeki RedisearchWrapper yalnızca öneri ve FT sarmalayıcısı; vektör kullanımı yok. Lokal pilot suite/planlanan Frappe adaptörü (api.py, local_fixture.py) içinde arama ya da vektör sözleşmesi yok; Suite'in Vue frontend aramasıyla da ilgisi yok.

Eksik:

- Qdrant (veya başka bir vektör deposu) istemcisi, adaptörü ve bağımlılığı (frappe/pyproject.toml ve suite/pyproject.toml'da yok; suite yalnızca tantivy~=0.26.0 kullanıyor)
- Embedding üretimi: model ve sürüm kimliği, sahibi, yeniden üretim tetikleyicisi (doc_events veya outbox bağlantısı)
- Tenant (Frappe site) ↔ Qdrant koleksiyonu veya payload anahtarı eşlemesi ve başka tenant vektörünün sonuca sızmamasının garantisi
- Model değişiminde indeks sürümü izleme (SearchStore'un schema.version deseni yalnızca Tantivy şeması için)
- Vektör sonuçlarına Frappe kayıt ve alan izninin uygulanması (pre/post-filter); bu search-4 sözleşmesine bağlı
- Headless provider'da vektör araması API sözleşmesi

Nasıl tamamlanır: Önce mevcut contract bağımlılıkları kapanmalı: vector-search--contract, native-user-policy--contract ve search-4 izin sözleşmesi. Sözleşmede embedding model ve sürüm kimliği tanımlanmalı; tenant anahtarı frappe.local.site ile eşlenmeli (get_search_base_path'teki site başına izolasyon deseni kullanılabilir); izin süzmesi önce pre-filter olarak tanımlanmalı (SQLiteSearch.get_search_filters deseni). Ardından en dar implementation adımı gelir: tek bir DocType için, site payload filtresi ve model_version alanı taşıyan bir Qdrant adaptör arayüzü. İlk RED testi, başka bir sitenin vektörünün sonuç dönmemesini doğrulamalı. Sonra outbox üzerinden yeniden embedding tetikleyicisi bağlanır. Bu iş post_mvp aşamasında, mevcut görev kimlikleriyle ilerler; yeni bir registry açılmaz.

Kaynak dayanakları: `suite/suite/store/search_store.py:41`; `suite/suite/store/search_store.py:53`; `suite/suite/store/__init__.py:35`; `frappe/frappe/search/sqlite_search.py:109`; `frappe/frappe/search/sqlite_search.py:292`; `suite/pyproject.toml:27`.

Rehber: [vector-search](./frappe-roadmap-contracts/vector-search.json). Mevcut birincil görev: `vector-search--implementation`.

### search-4 — Kiracı, kayıt ve alan yetkisine göre sonuç/gösterim filtreleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

SQLiteSearch, `get_search_filters` üzerinden sorgu düzeyinde izin süzmesi sağlıyor. Ancak Suite WriterSearch bu filtreyi boş döndürüp izni sonradan uyguluyor. Bu durumda sayı ve snippet'ler izinden önce hesaplanmış olabilir. Alan düzeyindeki okuma izni (`apply_fieldlevel_read_permissions`) indekse ya da snippet'e taşınmıyor.

Eksik:

- Pre-filter ile post-filter seçimi ve bunun sayılar ile snippet'ler üzerindeki etkisi kurala bağlanmamış.
- Alan izni (permlevel) indekslenen içeriğe ve snippet'e nasıl uygulanacak? Tanımsız.
- Paylaşım (share) ve izin geri alındığında sonuçların ne kadar sürede güncelleneceği belirtilmemiş.
- ignore_permissions içeren yardımcıların arama API'sinden dışarı açılmaması açıkça yazılmamış.

Nasıl tamamlanır: search-query--implementation görevine şunları yaz: izin predikatı sonuç, sayı ve facet için tek kaynaktan gelsin. permlevel>0 alanlar indekse/snippet'e girmesin. Share iptali kabul örneğini mevcut senaryo bütçesi içinde planla.

Kaynak dayanakları: `frappe/frappe/search/sqlite_search.py:117`; `frappe/frappe/search/sqlite_search.py:251`; `suite/suite/writer/search.py:23`; `frappe/frappe/api/v1.py:84`.

Rehber: [search-query](./frappe-roadmap-contracts/search-query.json). Mevcut birincil görev: `search-query--implementation`.

### search-5 — İndeks oluşturma, güncelleme, silme ve yeniden indeksleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yaşam döngüsü için yerel parçalar var: global_search tarafında doctype bazlı rebuild/delete, SearchStore tarafında upsert/delete ve şema sürümüne bağlı rebuild. Arama alanı seçimi, Customize Form ile aynı Property Setter yolundan geçiyor. Talimat FTS build/update API'sinden söz ediyor ama hook olaylarını (on_update/on_trash/rename) ve şema değişikliğinden sonra yeniden indekslemeyi tanımlamıyor.

Eksik:

- Hangi doc_events olaylarının indeksi güncelleyeceği (rename ve child tablo dahil) listelenmemiş.
- Arama alanı Property Setter ile değiştiğinde yeniden indeksleme tetikleyicisi ve yetki kuralı (System Manager) yazılmamış.
- Rebuild sırasında eski indeksin servise devam edip etmeyeceği ve hatada yeniden deneme sözleşmesi belirsiz.
- İçeride `save(ignore_permissions=True)` kullanılıyor; bunun dışarı açılmaması gerektiği belirtilmemiş.

Nasıl tamamlanır: search-index--implementation görevine olay listesini (insert/update/trash/rename), Property Setter sonrası rebuild tetikleyicisini ve idempotent rebuild kabulünü ekle. Mevcut Frappe hook ve rebuild yollarını yeniden kullan.

Kaynak dayanakları: `frappe/frappe/utils/global_search.py:68`; `suite/suite/store/search_store.py:163`; `frappe/frappe/desk/doctype/global_search_settings/global_search_settings.py:172`; `frappe/frappe/desk/doctype/global_search_settings/global_search_settings.py:98`.

Rehber: [search-index](./frappe-roadmap-contracts/search-index.json). Mevcut birincil görev: `search-index--implementation`.

### search-6 — Otomatik tamamlama, yazım toleransı, eş anlamlılar ve sonuç sıralama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta trigram tabanlı yazım düzeltmesi, sınırlı edit mesafesi ve özel scoring dekoratörü var. SearchStore'da prefix tabanlı otomatik tamamlama da var, ancak sıralama çağırana bırakılmış. Eş anlamlı sözlük görülmedi. Postgres tsvector 'english' sabitine bağlı. Talimat, 'verify' durumunu hedef sürüme bağlamıyor.

Eksik:

- Türkçe altın sorgu seti (yazım hatası, eş anlamlı, prefix) ve ölçüt eşiği tanımlı değil.
- Eş anlamlı sözlüğün sahibi ve depolama yeri tanımsız; yerel kaynakta karşılığı yok.
- Postgres FTS'in 'english' regconfig'i Türkçe için uygun değil; DB motoru seçimi kayda bağlanmamış.
- `MIN_WORD_LENGTH = 4` gibi sabitlerin kısa Türkçe sorgulara etkisi değerlendirilmemiş.

Nasıl tamamlanır: search-query--implementation görevinde 'verify' durumunu v17-dev SQLiteSearch'e bağla. Küçük bir Türkçe altın sorgu listesini kabul metnine ekle ve eş anlamlıları ayrı bir koşullu alt adım olarak tut.

Kaynak dayanakları: `frappe/frappe/search/sqlite_search.py:112`; `frappe/frappe/search/sqlite_search.py:86`; `suite/suite/store/search_store.py:221`; `frappe/frappe/query_builder/custom.py:138`.

Rehber: [search-query](./frappe-roadmap-contracts/search-query.json). Mevcut birincil görev: `search-query--implementation`.

### search-7 — Kaynak kayıtla indeks tutarlılığı ve gecikme takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta yalnızca şema sürümü dosyası, şema değişiminde rebuild ve 'en iyi çaba' ile tembel rebuild var. Kayıt sürümü ile indeks sürümü karşılaştırması, gecikme metriği ve alarm görülmedi. Kabul metni hedefi doğru tanımlıyor, fakat sürüm alanını (ör. modified) ve gözlem kaynağını tanımlamıyor.

Eksik:

- Karşılaştırma anahtarı tanımlı değil: doc.modified/name ile indeksteki damga hangileri olacak?
- Gecikme SLO değeri ve ölçüm noktası yok.
- Uzlaştırma işinin zamanlaması ve sahibi yok; yeni altyapı gerekmeden mevcut scheduler kullanılabilir.
- Tembel ve 'best-effort' rebuild ile güvenli rebuild arasındaki fark yazılmamış.

Nasıl tamamlanır: search-index--implementation görevine modified damgası tabanlı bir uzlaştırma adımı ve tek bir gecikme eşiği ekle. Yeni registry ya da altyapı önermeden mevcut rebuild yollarını kullan.

Kaynak dayanakları: `suite/suite/store/search_store.py:18`; `suite/suite/store/search_store.py:53`; `suite/suite/mail/patches/migrate_search_index_to_mail_namespace.py:15`.

Rehber: [search-index](./frappe-roadmap-contracts/search-index.json). Mevcut birincil görev: `search-index--implementation`.

### transfer-1 — Data import/export (veri içe ve dışa aktarma).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel v17-dev kaynağında Data Import (izin kontrolü, önizleme, arka plan işi) ve CSV/Excel export temel yapı taşları var. Talimat bu mekanizmanın yeniden kullanılacağını söylüyor. Ancak bağımsız frontend için upload, önizleme, başlatma ve indirme sözleşmesi tanımlı değil. Kaynaklar da yerel sürüm yerine version-15'e işaret ediyor.

Eksik:

- Talimattaki kaynaklar version-15'e bağlı. Yerel kaynak 17.0.0-dev (adf1fd0) ve bu sürümle eşleme yapılmamış.
- Headless akış tanımlı değil: dosya yükleme, Data Import kaydı oluşturma, önizleme, başlatma ve indirme hangi REST/RPC uçlarıyla yapılacak belirtilmemiş.
- Export tarafında desk open_url_post kullanılıyor. Headless istemci için ikili dosya yanıtı ve dosya adı sözleşmesi yok.
- İki ayrı export yolu var (data_import/exporter ve data_export/exporter). Hangisinin kullanılacağına dair bir karar yok.
- 7 maddenin tamamı tek bir görev kimliğine (transfer-run--implementation) bağlanmış; aralarındaki bağımlılık sırası yok.

Nasıl tamamlanır: transfer-run--implementation içinde kısa bir uç eşlemesi yazılmalı. Yükleme için mevcut upload_file, kayıt için /api/resource/Data Import, önizleme için whitelisted get_preview_from_template kullanılmalı. Export yolu tek bir exporter olarak seçilmeli. Kaynak bağlantıları yerel v17 commit'ine sabitlenmeli.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import/data_import.py:166`; `frappe/frappe/core/doctype/data_import/data_import.py:185`; `frappe/frappe/core/doctype/data_export/data_export.js:70`; `frappe/frappe/api/v1.py:158`; `frappe/pyproject.toml:7`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-2 — Alan eşleme, dosya şablonları ve aktarım önizlemesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta bunlar var: şablon indirme alanı, en fazla 10 satırlık önizleme, değer eşleme (Data Import Value Mapping), satır atlama ve import provider alan şeması. Kabul ölçütü olan 'onaydan önce yazım yok' ilkesi, önizleme ile başlatmanın ayrı olmasıyla uyumlu. Ancak 'sürümlü alan eşleme' kavramı ve bunun field-mapping-rule göreviyle sınırı tanımsız.

Eksik:

- Kolon eşlemesi template_options içinde JSON olarak tutuluyor. Sürümleme ya da yeniden kullanılabilir şablon sözleşmesi tanımlı değil.
- Önizleme 10 satırla sınırlı (MAX_ROWS_IN_PREVIEW). Kullanıcı onayında kaç satırın gösterileceği belirtilmemiş.
- Value mapping ve skipped rows v17'de var; version-15 kaynaklarında bu davranış belgeli değil. Talimat bu farkı not etmemiş.
- field-mapping-rule ile Data Import Value Mapping arasındaki sınır belirsiz. Yinelenen bir eşleme kayıt sistemi kurulma riski var.

Nasıl tamamlanır: field-mapping-rule--implementation notuna bir karar eklenmeli: kolon ve değer eşlemesi için yerel Data Import alanları (template_options, value_mappings, skipped_rows) kullanılacak. Sürüm ihtiyacı varsa yalnızca bir şablon kimliği ve sürüm alanı ile sınırlı tutulmalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import/importer.py:27`; `frappe/frappe/core/doctype/data_import/value_mapping.py:4`; `frappe/frappe/core/doctype/data_import/data_import.py:83`; `frappe/frappe/core/doctype/data_import/data_import.json:13`; `frappe/frappe/core/doctype/data_import/import_provider.py:15`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-3 — Satır bazlı doğrulama, hata dosyası ve yinelenen kayıt denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Satır sonuçları Data Import Log'da tutuluyor (row_indexes, messages, exception). Engelleyici uyarılar import başlamadan durduruyor. Yinelenen ID uyarısı ve upsert de var. Ancak tekilleştirme yalnızca ID/name üzerinden çalışıyor. İş anahtarı tekilleştirmesi ve hata dosyası sözleşmesi tanımsız.

Eksik:

- Tekilleştirmede kullanılacak iş anahtarının DocType bazında nasıl tanımlanacağı belirtilmemiş. Unique alan mı, import provider mı, yoksa yeni bir kural mı olacak, belli değil.
- Hata dosyasının biçimi (CSV/XLSX/JSON ve kolonları) tanımlı değil. Yerel bir errored-rows export yolu excerpt'te görünmüyor (unknown).
- Data Import Log MyISAM motorunu kullanıyor. Log ile kayıt yazımı aynı transaction içinde olmadığı için tutarlılık varsayımı belgelenmemiş.

Nasıl tamamlanır: transfer-row-result--implementation için ilk adım, ayrı bir sonuç tablosu açmak yerine Data Import Log alanlarını headless satır sonucu sözleşmesi olarak kullanmak olmalı. İş anahtarı yalnızca unique alan ya da import_provider ile tanımlanmalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import_log/data_import_log.json:36`; `frappe/frappe/core/doctype/data_import_log/data_import_log.json:6`; `frappe/frappe/core/doctype/data_import/value_mapping.py:186`; `frappe/frappe/core/doctype/data_import/importer.py:30`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-4 — Büyük aktarımda ilerleme, iptal ve kaldığı yerden devam.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta tek job_id ile RQ kuyruğu, timeout, realtime ilerleme olayı ve tekrar denemede import log'un yeniden kullanılması var. rq stop komutu import edilmiş, ama nerede kullanıldığı excerpt'te görünmüyor. Durum listesinde iptal karşılığı bir değer yok. Talimat iptal, checkpoint ve devam beklentisini koyuyor; ancak durum makinesi ve headless ilerleme kanalı tanımlı değil.

Eksik:

- Status değerleri arasında 'Cancelled' yok. İptalin hangi durumla gösterileceği tanımsız.
- İlerleme yalnızca socket.io realtime olayıyla geliyor. Headless/Tauri/WXT istemcisi için polling ya da abonelik sözleşmesi belirtilmemiş.
- Devam semantiği tanımsız: başarılı satırların log'dan atlanması mı (retry purge), yoksa checkpoint mi kullanılacak?
- Timeout değeri 10000 saniye ve kuyruk 'default'. M1'deki 'sınırlı arka plan işi' sınırları sayı olarak verilmemiş.

Nasıl tamamlanır: Mevcut durum alanı ve log yeniden kullanımı üzerine kısa bir durum geçiş tablosu yazılmalı: Pending, In Progress, Success/Partial/Error/Timed Out, iptal. İptal için stop komutunun yerel kullanım noktası kaynakta doğrulanmalı. Headless ilerleme için olay mı polling mi kullanılacağına karar verilmeli.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import/data_import.py:77`; `frappe/frappe/core/doctype/data_import/data_import.py:7`; `frappe/frappe/core/doctype/data_import/data_import.py:205`; `frappe/frappe/core/doctype/data_import/importer.py:202`; `frappe/frappe/core/doctype/data_import/data_import.js:797`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-5 — İçe aktarmada yetki, kota ve iş kurallarının korunması.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Import yolunda bu kontroller var: BLOCKED_DOCTYPES, allow_import ve 'import' izni. Kayıtlar Document üzerinden yazılıyor. Ancak in_import bayrağı bazı doğrulamaların atlanmasına yol açabilir. import_provider ise kayıt oluşturmayı tamamen devralabiliyor. Tenant ve kota modeli talimatta tanımlı değil; excerpt'te de kota kaynağı görünmüyor.

Eksik:

- Tenant sınırının ne olduğu tanımsız: site başına tenant mı, aynı site içinde izolasyon mu?
- Paket kotası hangi noktada kontrol edilecek (import öncesi sayım, satır bazında) ve kaynağı ne olacak, belirtilmemiş.
- frappe.flags.in_import ile atlanan iş kurallarının envanteri ve buna dair bir yasak yok.
- import_provider ile validate/insert'in devralınması durumunda izin ve kota zorunluluğu belgelenmemiş.

Nasıl tamamlanır: Import öncesi sunucu kota kontrolünü, mevcut usage rezervasyon sözleşmesine bağlı atomik rezervasyonla yap; gerçekleşen tüketimi kesinleştir ve kullanılmayan rezervasyonu iade et. Ön sayım tek başına eşzamanlı kota yaptırımı değildir. in_import ile atlanan validate dallarını listele; kayıt yazan provider’larda izin kontrolü zorunlu kalsın.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import/data_import.py:23`; `frappe/frappe/core/doctype/data_import/data_import.py:159`; `frappe/frappe/core/doctype/data_import/importer.py:123`; `frappe/frappe/core/doctype/data_import/import_provider.py:3`; `frappe/frappe/permissions.py:26`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-6 — Yetkili veri teslimi; hassas alan maskeleme ve süreli dışa aktarım.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta 'export' hakkı, export_data içinde access log ve exporter'da permlevel okuma süzmesi var. Excerpt'te veri maskeleme kaynağı ve süreli link mekanizması yok. export_data'nın sunucu tarafında izin kontrolü yaptığı satırlar görünmüyor. Talimat doğru biçimde 'verify' diyor, ancak maskeleme ve süreli teslim için bir tasarım yok.

Eksik:

- Veri maskelemenin yerel v17-dev'de var olup olmadığı excerpt ile doğrulanamıyor (unknown).
- Süreli indirme linkinin mekanizması tanımsız: private File, imzalı URL ya da TTL.
- Data Export ekranındaki can_export süzmesi yalnızca istemci tarafında. Sunucu tarafındaki export izin kontrolü excerpt'te görünmüyor.
- Raw SQL ve report export yollarının maskeleme kapsamı belirtilmemiş.

Nasıl tamamlanır: İlk olarak yerel kaynakta export_data gövdesinde export izin kontrolü ve maskeleme kaynağı okunmalı. Ardından süreli teslim için mevcut private File ve access log üzerine tek bir TTL kararı yazılmalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_export/exporter.py:47`; `frappe/frappe/core/doctype/data_import/exporter.py:69`; `frappe/frappe/core/doctype/data_export/data_export.js:17`; `frappe/frappe/permissions.py:27`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### transfer-7 — JSON, CSV ve Excel (XLSX): her formatta çift yönlü içe/dışa aktarım sözleşmesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: encoding, ayırıcı, sayı biçimi, formül koruması, satır sınırı. Yerel kaynakta CSV/XLS/XLSX okuma, encoding denemeleri, formül kaçışı ve yerel sayı ayrıştırma var. Ancak dosya tabanlı JSON import/export kaynağı görünmüyor. insert_many ise 200 kayıtla sınırlı bir API, dosya aktarımı değil. JSON şema ve iç içe eşleme sözleşmesi de tanımsız.

Eksik:

- JSON için dosya şeması tanımlı değil: üst/alt tablo yapısı, ID/null/tarih gösterimi, şema sürümü.
- Import yükleme kısıtı .csv/.xls/.xlsx; export seçenekleri Excel ve CSV. JSON için hangi yolun genişletileceği (import_provider ya da ayrı ayrıştırıcı) belli değil.
- Formül kaçışı yalnızca CSV yazıcısında görünüyor. XLSX çıktısında formül ve makro korumasının kapsamı doğrulanmamış.
- Boyut ve satır sınırının sayısal değerleri ve max_file_size ile ilişkisi belirtilmemiş.

Nasıl tamamlanır: Önce bir JSON dosya şeması taslağı yazılmalı; exporter'ın satır yapısına (üst + alt tablo) eşlenmeli. JSON ayrıştırma, mevcut ImportFile/Importer akışına tek bir okuyucu olarak eklenmeli; ayrı bir CRUD yolu açılmamalı. CSV ve XLSX için yerel davranış bu şemaya referans alınmalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/data_import/data_import.js:915`; `frappe/frappe/core/doctype/data_export/data_export.json:35`; `frappe/frappe/utils/csvutils.py:169`; `frappe/frappe/core/doctype/data_import/importer.py:43`; `frappe/frappe/client.py:245`.

Rehber: [transfer-run](./frappe-roadmap-contracts/transfer-run.json). Mevcut birincil görev: `transfer-run--implementation`.

### events-1 — Event bus (modüller arası olay dağıtım altyapısı).

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü somut: olay yeniden başlatmada kaybolmamalı, aboneler izole olmalı ve olay tekrar işlenebilmeli. Kaynakta yalnız temel araçlar görülüyor: doc_events hookları, Socket.IO realtime ve frappe.enqueue. Bunlar dayanıklı bir bus değil. Talimat, teslim yöntemini outbox (events-4), inbox (events-5) ve retry (events-6) görevlerine bağlamıyor.

Eksik:

- Bus'ın events-4/5/6 üzerine kurulan ince bir dağıtıcı mı, ayrı bir altyapı mı olacağı yazılmamış.
- Event Streaming dışlaması dokümana dayanıyor; v17.0.0-dev kaynağında bu modülün durumu bu excerptlerde doğrulanmadı.
- Abone kaydının nerede tutulacağı ve modül sahipliği tanımlı değil.
- Hangi modüllerin senkron kalacağına dair pilot kapsam yok.

Nasıl tamamlanır: event-dispatch--implementation görevine şu kararı yazın: bus, outbox ve inbox üzerinde çalışan bir dağıtıcıdır ve yeni bir altyapı değildir. Bir pilot olay belirleyin (ör. Calendar Event invite) ve abone kaydının sahibini netleştirin.

Kaynak dayanakları: `suite/suite/hooks.py:224`; `frappe/pyproject.toml:97`; `frappe/frappe/api/v2.py:293`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:6`.

Rehber: [event-dispatch](./frappe-roadmap-contracts/event-dispatch.json). Mevcut birincil görev: `event-dispatch--implementation`.

### events-2 — Modülün yayımlanmış işlevleri; komut, sorgu ve olay kayıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta yayımlama için gereken temel araçlar var: whitelist, /method RPC, is_whitelisted ve override_whitelisted_methods. Kabul ölçütü de anlamlı: yalnız kayıtlı ve izinli komut çalışmalı, sürüm uyumsuzsa çağrı reddedilmeli. Ancak katalog formatı, sürümleme kuralı ve modül izin modeli tanımlı değil. Ayrıca ui-provider-registry destek görevi, UI ve GenUI registry'leriyle karışma riski taşıyor.

Eksik:

- Command/query/event katalog şeması ve sürüm uyumluluk kuralı (semver/ret) tanımlı değil.
- Kaynak v2.py iç uygulamayı kararlı sözleşme saymıyor. Hangi sınırın yayımlanmış API olduğu belirtilmemiş.
- Katalogun GenUI ve UI provider registry'lerinden ayrı tutulacağı açıkça yazılmamış.
- Tenant bağlamı ve modül izinlerinin native DocType izinleriyle nasıl eşleneceği belirtilmemiş.

Nasıl tamamlanır: Görev tanımına bir sınır cümlesi ekleyin: sunucu command/query/event katalogu backend modül sözleşmesidir ve UI/GenUI registry'leriyle birleştirilmez. Yetki için native whitelist ve has_permission kullanılır. Sürüm uyumsuzluğunda verilecek ret kodunu da tanımlayın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:259`; `frappe/frappe/api/v2.py:8`; `suite/suite/hooks.py:202`.

Rehber: [event-dispatch](./frappe-roadmap-contracts/event-dispatch.json). Mevcut birincil görev: `event-dispatch--implementation`.

### events-3 — Olay kimliği, kiracı bağlamı, ilişkilendirme kimliği ve şema sürümü.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: tenant veya şema sürümü eksik olay reddedilmeli, correlation kimliği zincir boyunca korunmalı. Kaynakta yalnız dağınık parçalar var: site bazlı realtime namespace, ad-hoc job_id ve alan-özel payloadlar. Ortak bir zarf görülmüyor. Tenant'ın site mi, site içi organizasyon mu olduğu da belirtilmemiş.

Eksik:

- Tenant tanımı yok: site düzeyi mi, site içi kiracı mı?
- Zarf alanları (event_id, tenant, correlation_id, causation_id, schema_version, occurred_at) ve şema kayıt yeri tanımlı değil.
- ui-provider-realtime destek görevi, UI realtime taşımasını dayanıklı olay zarfıyla karıştırma riski taşıyor.
- Correlation kimliğinin HTTP isteğinden enqueue edilen işe nasıl taşınacağı belirtilmemiş.

Nasıl tamamlanır: event-dispatch--implementation altında tek bir zarf şeması belirleyin; tenant kararı burada yazılmalı. Realtime yayınlarının bu zarfın bir projeksiyonu olduğunu da not edin. Yeni görev açmayın.

Kaynak dayanakları: `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:17`; `suite/suite/writer/doctype/writer_document/writer_document.py:125`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:10`; `suite/suite/calendar/doctype/event_notification/event_notification.json:187`.

Rehber: [event-dispatch](./frappe-roadmap-contracts/event-dispatch.json). Mevcut birincil görev: `event-dispatch--implementation`.

### events-4 — Transactional outbox (veri değişikliğiyle aynı işlemde kaydedilen olay kutusu).

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: kuyruk kapalıyken commit edilen olay outbox'ta kalmalı ve kuyruk açılınca tek iş etkisi oluşmalı. Kaynakta for_update kilidi ve enqueue var. Outbox tablosu veya dağıtıcı görülmüyor. Commit sonrası hookları bu excerptlerde yok. Talimat outbox'ın veri modelini ve dağıtıcı sahipliğini tanımlamıyor.

Eksik:

- Outbox'ın bir DocType mı yoksa doğrudan bir tablo mu olacağı, şeması ve native migrate ile yönetimi belirtilmemiş.
- Dağıtıcının nasıl çalışacağı (scheduler mı, worker mı), kilitleme ve tekil seçim kuralı yok.
- Frappe v17-dev transaction hook API'si bu kaynakta doğrulanmadı.
- ui-provider-offline destek görevi, istemci offline kuyruğunu sunucu outbox'ıyla karıştırıyor.

Nasıl tamamlanır: outbox--implementation görevine şunları yazın: outbox satırı, iş verisiyle aynı DB transaction'ında native insert ile oluşur. Dağıtıcı enqueue'yu yalnız teslim aracı olarak kullanır. Tek pilot olay seçin ve ui-provider-offline bağını kaldırın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:293`; `suite/suite/calendar/doctype/calendar_event/invitations.py:10`.

Rehber: [outbox](./frappe-roadmap-contracts/outbox.json). Mevcut birincil görev: `outbox--implementation`.

### events-5 — Idempotency (aynı işlemin tekrarında mükerrer etkiyi önleme) ve tüketici tekilleştirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü ölçülebilir: on eşzamanlı işlemde tek etki ve tutarlı yanıt. Kaynakta yalnız zayıf desenler var: job deduplicate, istemci tarafı tekrar sahiplenme ve check-then-insert. Bu desenler yarış durumuna karşı güvenli değil. Kalıcı bir tüketici dedup kaydı görülmüyor.

Eksik:

- İdempotency anahtarının nasıl türetileceği (event_id + consumer) ve DB unique kısıtı tanımlı değil.
- Tekrarda önceki sonucun döndürülmesi ve kaydın saklama süresi belirtilmemiş.
- Senkron komut idempotency'si (HTTP Idempotency-Key) ile tüketici dedup'ının ayrımı yok.
- ui-provider-offline bağı sunucu inbox'ıyla karışıyor.

Nasıl tamamlanır: inbox--implementation görevine şunları yazın: (consumer, event_id) çifti için unique bir kayıt tutulur ve iş etkisiyle aynı transaction'da yazılır. frappe.db.exists ile ön kontrol yeterli sayılmaz. Senkron komut anahtarı ayrı bir maddeye ayrılmalı.

Kaynak dayanakları: `suite/suite/writer/doctype/writer_document/writer_document.py:127`; `suite/suite/mail/events.py:20`; `suite/frontend/src/apps/meet/utils/sfu/__tests__/ParticipantConnectionEvents.test.ts:428`.

Rehber: [inbox](./frappe-roadmap-contracts/inbox.json). Mevcut birincil görev: `inbox--implementation`.

### events-6 — Kalıcı olayda yeniden deneme, sıralama kapsamı ve yeniden işleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü kontrollü retry, sıralı replay ve görünür bir inceleme kuyruğu istiyor. Kaynakta sunucu tarafında başarısız teslim yalnız loglanıyor. Sınırlı retry yalnız istemci realtime aboneliğinde var. Sıralama yalnız Calendar'a özgü SEQUENCE alanıyla sağlanıyor. outbox--implementation-mvp eşlemesi var ama politika parametreleri yok.

Eksik:

- Retry sınırı ve backoff tanımı yok, poison olaya geçiş eşiği yok.
- Sıralama kapsamı (aggregate, tenant ya da global) tanımlı değil.
- Replay yetkisi ve audit kaydı belirtilmemiş, replay'in idempotency'ye bağımlılığı yazılmamış.
- İnceleme kuyruğunun bir DocType mı, Error Log mu olacağı ve izinleri belirsiz.

Nasıl tamamlanır: outbox--implementation-mvp görevine politika tablosu ekleyin: max deneme, backoff, aggregate bazlı sıra, poison durumu ve yetkili replay. Görevi açıkça events-5 inbox görevine bağımlı işaretleyin.

Kaynak dayanakları: `suite/suite/calendar/doctype/calendar_event/invitations.py:137`; `suite/frontend/src/apps/meet/composables/useGuestRealtime.ts:28`; `suite/suite/calendar/doctype/calendar_event/calendar_event.json:198`.

Rehber: [outbox](./frappe-roadmap-contracts/outbox.json). Mevcut birincil görev: `outbox--implementation-mvp`.

### events-7 — Hata yayılımını sınırlama; eşzamanlı çağrı/arka plan olayı seçimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta hata izolasyonu desenleri görülüyor: execute_with_logging, "never worth failing" yaklaşımı, JMAP yazımından sonra enqueue ve eşiğe bağlı async bulk. Kabul ölçütü somut: yavaş bir dış servis diğer kuyrukları kilitlememeli. Ancak kuyruk atama ve tazmin kuralları talimatta yok. Kuyruk adları ve timeout değerleri bu excerptlerde doğrulanmadı.

Eksik:

- Senkron/asenkron seçim kriteri (kullanıcı beklentisi, tutarlılık, dış bağımlılık) yazılmamış.
- Modül ya da dış servis başına kuyruk ve timeout ataması yok.
- Senkron komut başarısız olduğunda tazmin veya geri alma sonucu tanımlı değil.
- Hook içindeki dış çağrı hatalarının ana transaction'ı bozup bozmayacağı belirtilmemiş.

Nasıl tamamlanır: event-dispatch--implementation görevine kısa bir karar tablosu ekleyin: senkron, outbox/async veya dış servis için özel kuyruk. Doğrulamayı Calendar invite örneğiyle yapın: JMAP yazımı senkron, bildirim async.

Kaynak dayanakları: `suite/suite/mail/events.py:191`; `suite/suite/calendar/doctype/calendar_event/mailing_lists.py:47`; `frappe/frappe/api/v2.py:32`; `suite/suite/calendar/doctype/calendar_event/invitations.py:11`.

Rehber: [event-dispatch](./frappe-roadmap-contracts/event-dispatch.json). Mevcut birincil görev: `event-dispatch--implementation`.

### ai-1 — AI providers (yapay zekâ sağlayıcıları) ve model bağlantıları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var. Ancak yönerge bu yeteneği 'external' sayıyor ve kurulu Suite içindeki mevcut Anthropic entegrasyonunu (Sheets AI Assist) hiç anmıyor. Kaynakta tek sağlayıcılı, kod içine sabitlenmiş bir model çağrısı var; tenant kapsamlı sağlayıcı/model kaydı yok.

Eksik:

- Mevcut suite/sheets/ai istemcisinin yeniden mi kullanılacağı, sarılacağı mı yoksa dokunulmadan mı bırakılacağı tanımlanmamış.
- API anahtarının nerede saklandığı ve tenant/site kapsamı belirtilmemiş; anahtarın kaynağı olan api modülü pakette yok.
- Model kimliği kodda sabit (DEFAULT_MODEL); izinli model listesi ve sürüm eşlemesi yok.
- ai-1 ile ai-2 aynı primaryTaskId'yi paylaşıyor; kabul kapsamları ayrıştırılmamış.

Nasıl tamamlanır: ai-model-connection--implementation görevine şu sınır kararını yazın: Suite Sheets AI yalnızca tüketici olarak kalsın; sağlayıcı adaptörü ve anahtar saklama yeri (site/tenant kapsamı) ayrı bir sözleşmede tanımlansın. Yeni görev açmayın.

Kaynak dayanakları: `suite/pyproject.toml:32`; `suite/suite/sheets/ai/client.py:15`; `suite/suite/sheets/ai/client.py:88`.

Rehber: [ai-model-connection](./frappe-roadmap-contracts/ai-model-connection.json). Mevcut birincil görev: `ai-model-connection--implementation`.

### ai-2 — Model yönlendirme, alternatif sağlayıcı ve zaman aşımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı (zaman aşımında izinli alternatife geçiş, süre/maliyet limiti) ama sayısal limit ve bütçe kaynağı yok. Kaynaktaki 'fallback', sağlayıcılar arası geçiş değil; deterministik sezgiselden modele geçen bir zincir. Model çağrısında açık bir timeout parametresi görülmüyor.

Eksik:

- Toplam süre, deneme sayısı ve maliyet tavanı için değer ya da yapılandırma kaynağı yok.
- Alternatif sağlayıcıya geçerken veri politikasının (ai-5) yeniden uygulanması gerektiği yazılmamış.
- Hata eşlemesi (RateLimit/Connection) var ama geçiş kuralı yok; heuristic-first deseninin router ile ilişkisi tanımsız.

Nasıl tamamlanır: Mevcut görevin kabul metnine somut sayılar ekleyin: zaman aşımı, deneme sayısı ve maliyet tavanı. Ayrıca alternatif sağlayıcının ai-5 izin listesinden geçmesi zorunluluğunu yazın. Giden HTTP için Frappe'nin timeout/SSRF ilkelerine atıf yapın.

Kaynak dayanakları: `suite/suite/sheets/ai/heuristics.py:9`; `suite/suite/sheets/ai/client.py:103`; `frappe/frappe/automation_engine/actions/core.py:23`.

Rehber: [ai-model-connection](./frappe-roadmap-contracts/ai-model-connection.json). Mevcut birincil görev: `ai-model-connection--implementation`.

### ai-3 — Prompt (modele verilen talimat) şablonu, sürümü ve değişkenleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: eksik değişken reddedilsin ve her çalıştırma değişmez bir prompt sürümüne bağlansın. Fakat 'absent' değerlendirmesi, kaynaktaki Jinja sandbox ilkelini atlıyor. Frappe ortamı DebugUndefined kullandığı için eksik değişken varsayılan olarak reddedilmez. Suite'teki prompt kodda sabit ve sürümsüz.

Eksik:

- Prompt ve sürümün nerede saklanacağı (DocType/Version) ve değişmezlik kuralı tanımsız.
- Değişken şeması doğrulamasının global jenv değiştirilmeden nasıl yapılacağı belirtilmemiş.
- Mevcut _SYSTEM sabitinin göç ya da istisna durumu yazılmamış.

Nasıl tamamlanır: prompt-template--implementation görevine şunu ekleyin: değişkenler, şablon render edilmeden önce şablona özgü bildirilmiş bir şemayla kontrol edilecek; Frappe'nin global Jinja ayarları değiştirilmeyecek. Sözdizimi kontrolü için validate_template yeniden kullanılsın.

Kaynak dayanakları: `frappe/frappe/utils/jinja.py:66`; `frappe/frappe/utils/jinja.py:96`; `suite/suite/sheets/ai/client.py:18`.

Rehber: [prompt-template](./frappe-roadmap-contracts/prompt-template.json). Mevcut birincil görev: `prompt-template--implementation`.

### ai-4 — Model girdisi/çıktısı, maliyet, kalite değerlendirmesi ve tekrar üretilebilir kayıt.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni izlenecek alanları sayıyor (model/prompt sürümü, token maliyeti, eval sonucu, maskeleme). Ancak kayıt şeması, saklama süresi ve eval yöntemi yok. Mevcut istemci yanıttaki kullanım/maliyet bilgisini atıyor, yalnızca eylem listesini döndürüyor. Frappe tarafında yalnızca genel log belgesi ilkelleri görülüyor.

Eksik:

- Çağrı kaydı alanları, saklama/silme süresi ve erişim yetkisi tanımsız.
- Eval ölçütü ve tekrar inceleme için hangi girdinin maskelenmiş olarak saklanacağı yazılmamış.
- Maliyet hesabı için fiyat tablosunun kaynağı yok.

Nasıl tamamlanır: ai-call-record--implementation görevi için asgari kayıt alanlarını belirleyin: model, prompt sürümü, token, maliyet, eval, maskelenmiş girdi özeti. Saklama için Frappe'nin log belgesi ve clear_old_logs desenini yeniden kullanın.

Kaynak dayanakları: `suite/suite/sheets/ai/client.py:114`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:38`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:98`.

Rehber: [ai-call-record](./frappe-roadmap-contracts/ai-call-record.json). Mevcut birincil görev: `ai-call-record--implementation`.

### ai-5 — Hassas veri maskeleme ve sağlayıcıya gönderilebilecek veri sınırları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni güçlü: yasak alan sağlayıcı isteğine hiç girmemeli. Ancak alan sınıflandırmasının kaynağı ve uygulama noktası yok. Suite bağlamı boyut olarak sınırlıyor ama örnek hücre değerlerini maskelemeden gönderiyor. Frappe'nin alan düzeyi okuma izni yalnızca asgari bir filtre.

Eksik:

- Hassas alan sınıflandırması (DocField düzeyi mi, politika belgesi mi) ve varsayılan-red kuralı tanımsız.
- Maskeleme kararının denetim kaydının ai-4 ile nasıl bağlanacağı yazılmamış.
- İzin filtresinin kullanıcının kendi oturum izniyle uygulanacağı ve ignore_permissions kullanılmayacağı açıkça yazılmamış.

Nasıl tamamlanır: ai-policy--implementation görevine şunları ekleyin: sağlayıcı adaptöründen önce tek bir zorunlu filtre olacak; önce apply_fieldlevel_read_permissions, ardından varsayılan-red alan sınıflandırması uygulanacak. Suite Sheets bağlamı da bu filtreden geçmeli.

Kaynak dayanakları: `suite/suite/sheets/ai/context.py:3`; `suite/suite/sheets/ai/context.py:122`; `frappe/frappe/api/v1.py:84`.

Rehber: [ai-policy](./frappe-roadmap-contracts/ai-policy.json). Mevcut birincil görev: `ai-policy--implementation`.

### ai-6 — Prompt injection (içerikle modele yetkisiz talimat verme) koruması ve çıktı denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü doğru: yetkisiz araç çalışmamalı, şema dışı çıktı reddedilmeli. Suite'te zorunlu araç şeması ve sunucu tarafı eylem temizliği var. Ancak hücre içeriği kullanıcı isteğiyle aynı mesaja ekleniyor (dolaylı enjeksiyon riski). setCell formülü yalnızca uzunluk kontrolünden geçiyor. Araç izinlerinin Frappe izinlerine eşlenmesi yönergede yok.

Eksik:

- Her AI aracının hangi Frappe izin tipine (read/write/submit) eşleneceği tanımsız.
- Güvenilmeyen içerik ile talimat ayrımı ve formül/metin çıktısının içerik denetimi tanımsız.
- Server Script veya ignore_permissions kısayolunun yasak olduğu açıkça yazılmamış.

Nasıl tamamlanır: ai-policy--implementation görevine şunu ekleyin: her aracın çağrısı kullanıcının oturumuyla has_permission ve check_permission kontrolünden geçecek; şema doğrulaması yetkilendirmenin yerine geçmeyecek. Ayrıca kısa bir tehdit senaryosu listesi yazın (test yazmadan).

Kaynak dayanakları: `suite/suite/sheets/ai/validate.py:4`; `suite/suite/sheets/ai/validate.py:38`; `suite/suite/sheets/ai/client.py:89`; `frappe/frappe/api/v1.py:132`.

Rehber: [ai-policy](./frappe-roadmap-contracts/ai-policy.json). Mevcut birincil görev: `ai-policy--implementation`.

### ai-7 — Ant Design X / X Cards ile izinli katalogdan şemalı GenUI ve AI kesintisinde normal iş ekranları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu kaynakta Ant Design, Ant Design X, X Cards, A2UI veya GenUI bileşen kataloğu yok. Kodda bulunan en yakın yapılar şunlar: (1) Upstream Suite Sheets 'AI Assist' (Vue arayüzü). ai_assist uç noktası önce Sheet için write iznini doğruluyor. Model, zorunlu bir tool çağrısıyla yalnızca JSON şemalı eylemler üretebiliyor (enum: setCell ve answer; additionalProperties=false). Sunucudaki clean_actions bu şemaya uymayan eylemleri sessizce atıyor; ilk adım deterministik ve yerel bir sezgisel kural katmanı. Sunucu sayfayı kendisi değiştirmiyor; eylemler istemci motorunda undo/op-log hattına katılıyor. AI ayarı kapalıysa ya da anahtar yoksa yalnızca AI çağrısı hata veriyor; upstream'de yok. headless-metadata.v1 sözleşmesi kapsamında: oturum kullanıcısı ve yerel izin yeniden kontrolü, alan düzeyinde okuma izniyle filtrelenmiş metadata projeksiyonu, bilinmeyen anahtarların reddi, preview→digest→apply onay akışı ve revision çakışma kontrolü. (3) frappe/ui (Vue) içinde bir fieldtype→component kaydı var, ancak bilinmeyen tür reddedilmiyor; FALLBACK bileşenine düşüyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Frappe kaynak/action registry kimlikleri ile kullanıcıya ait ayrı GenUI capability registry kimlikleri arasında sürümlü eşleme sözleşmesi eksik.
- Kurulu Suite Vue/Sheets AI örneği, seçilmiş React/Ant/X Cards tüketicisinin entegrasyon kanıtı değildir; tüketici bu turda taranmadı.
- İzinli server action şeması, açık red/hata, tenant kapsamı, onay ve AI kesintisinde normal ekran sözleşmesi eksik; yerel metadata pilotunun dar kanıtı ayrı tutulur.
- Yerel callback/ReactNode ile serileştirilebilir model JSON sınırının kabul ölçütü mevcut göreve bağlanmalı.

Nasıl tamamlanır: Önce mevcut capability-definition--contract, native-user-policy--contract ve kernel-envelope--contract sınırlarını netleştir; ui-family-39--contract bunları tüketir. Frappe sağlayıcı yalnız izinli kaynak/projection metadata kimliklerini, sunucu eylem kimliklerini, JSON girdi/çıktı şemalarını, revizyonu ve kullanıcı/tenant yetki kapsamını mevcut kaynak/action registry üzerinden sunmalı. GenUI component/props capability kataloğu kullanıcıya ait backend bağımsız projede kalır; Frappe bileşen kataloğunun sahibi veya kopyası olmaz. Tüketici bu iki ayrı registry kimliğini açık bir eşleme ile bağlar; callback/ReactNode model JSON sınırından geçmez. En küçük sonraki davranış, mevcut metadata sözleşmesiyle tek izinli action kimliğinin sürüm/yetki reddini bağlamaktır. Yazma eylemlerinde preview/onay/apply ve native validation korunur. AI kesintisinde normal headless ekran ayrı çalışır; offline/outbox kapsamı kendi mevcut görevindedir. Bu denetimde test veya uygulama yapılmaz.

Kaynak dayanakları: `suite/suite/sheets/ai/client.py:51`; `suite/suite/sheets/ai/client.py:97`; `suite/suite/sheets/api.py:620`; `suite/suite/sheets/api.py:665`; `frappe/ui/src/components/Fields/fieldTypes.ts:62`.

Rehber: [ui-family-39](./frappe-roadmap-contracts/ui-family-39.json). Mevcut birincil görev: `ui-family-39--implementation-post-mvp`.

### rag-1 — RAG (Retrieval-Augmented Generation — bilgi getirmeyle desteklenen üretim) sunucusu.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü var: yetkili kaynaktan yanıt, kaynak gösterimi ve kiracılar arası sızıntı olmaması. Ancak RAG servisinin Frappe ile sınırı tanımlanmamış. Kaynakta yalnız yapı taşları bulunuyor: Frappe'de izin kontrolü yapan REST okuma, SQLite FTS tabanlı sözcüksel arama ve Suite'te Sheets için Anthropic bağımlılığı. Embedding, vektör deposu, üretim ve atıf yapan bir RAG sunucusu kaynakta görülmedi.

Eksik:

- RAG servisinin Frappe'den hangi uç noktayla ve hangi kullanıcı kimliğiyle veri okuyacağı tanımlanmamış (Keycloak → Frappe kullanıcısı eşlemesi, servis hesabı yasağı).
- Kiracı tanımı yok: site = kiracı mı, yoksa site içi ayrım mı?
- Frappe 17.0.0.dev0 / v2 API'ye sürüm eşlemesi yok; kaynaklar sürüm belirtmeyen genel dokümanlar.
- Suite'teki mevcut Anthropic kullanımıyla (Sheets AI Assist) RAG sunucusu arasındaki sınır belirsiz.

Nasıl tamamlanır: rag-source--implementation altında kısa bir entegrasyon sözleşmesi yazılmalı. Sözleşme şunları belirlemeli: retrieval çağrısı son kullanıcı kimliğiyle /api/v2 üzerinden mi yapılacak, yanıt atfı hangi DocType adını ve hangi modified değerini taşıyacak, kiracı = site mi. Yeni görev açılmamalı.

Kaynak dayanakları: `frappe/frappe/search/sqlite_search.py:117`; `frappe/frappe/api/v1.py:83`; `suite/pyproject.toml:31`; `suite/suite/hooks.py:38`.

Rehber: [rag-source](./frappe-roadmap-contracts/rag-source.json). Mevcut birincil görev: `rag-source--implementation`.

### rag-2 — Kaynak bağlama, belge ayrıştırma, parçalara ayırma ve güncelleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: yalnız değişen parça güncellenmeli ve sessiz veri kaybı olmamalı. Kaynakta kimliğe göre sil-ekle upsert (SearchStore), indeksleme uyarı tipleri (IndexWarning) ve PDF ayrıştırıcı bağımlılığı var. Öte yandan Frappe global search DocType bazında tümden silip yeniden kuruyor. SearchStore arama hatasını yalnız logluyor, yukarı fırlatmıyor. Bu iki davranış 'sessiz kayıp yok' ölçütüyle doğrudan çelişebilir.

Eksik:

- Hangi kaynakların bağlanacağı listelenmemiş (DocType alanları, File/Drive, Writer, Mail) ve tetikleyici belirsiz: doc_events mi, background job mı?
- Parça kimliği şeması tanımlanmamış (doctype+name+alan+offset+modified); bu olmadan 'yalnız ilgili parçalar güncellensin' doğrulanamaz.
- Ayrıştırma hatasının nereye yazılacağı (hata kaydı veya kuyruk) ve nasıl yeniden deneneceği tanımlanmamış.
- Tümden yeniden kurma deseninin bu bağlamda kabul edilmeyeceği yazılmamış.

Nasıl tamamlanır: rag-chunk-reference--implementation içinde parça kimliği ve hata sözleşmesi tanımlanmalı: deterministik parça ID'si, kimliğe göre upsert ve ayrıştırma hatasında eski parçanın korunması. Hata görünür bir kayda yazılmalı.

Kaynak dayanakları: `suite/suite/store/search_store.py:82`; `suite/suite/store/search_store.py:198`; `frappe/frappe/search/sqlite_search.py:53`; `frappe/frappe/utils/global_search.py:103`; `suite/pyproject.toml:14`.

Rehber: [rag-source](./frappe-roadmap-contracts/rag-source.json). Mevcut birincil görev: `rag-source--implementation`.

### rag-3 — Embedding (içeriği sayısal benzerlik vektörüne dönüştürme) sürümü ve yeniden üretim.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü net: eski ve yeni indeks karışmamalı, geçiş bitmeden aktif sürüm değişmemeli. Kaynakta yalnız sözcüksel indeks için şema sürümü dosyası var; şema değişince yeniden kurulumu bu dosya tetikliyor. Mail göçü ise 'best-effort, lazy rebuild' çalışıyor, yani yerinde yeniden kurma yapıyor. Bu desen kabul ölçütündeki paralel sürüm ve atomik geçişi sağlamıyor. İncelenen kesitlerde embedding veya vektör kodu görülmedi.

Eksik:

- Sürüm meta verisi tanımlanmamış: model kimliği, boyut, parçalayıcı sürümü, normalizasyon.
- Paralel indeks + alias/atomik geçiş + geri dönüş sözleşmesi yok.
- Vektör deposu seçimi ve konumu (Frappe DB mi, dış servis mi) belirsiz.
- Mevcut schema.version deseninin yerinde yeniden kurduğu ve bu nedenle doğrudan yeniden kullanılamayacağı not edilmemiş.

Nasıl tamamlanır: rag-source--implementation altına küçük bir sürüm kaydı tanımı eklenmeli: model, boyut, parçalayıcı sürümü, durum (building/active/retired). 'active' durumunu yalnız tamamlanmış bir yeniden indeksleme değiştirebilmeli.

Kaynak dayanakları: `suite/suite/store/search_store.py:18`; `suite/suite/store/search_store.py:53`; `suite/suite/mail/patches/migrate_search_index_to_mail_namespace.py:15`.

Rehber: [rag-source](./frappe-roadmap-contracts/rag-source.json). Mevcut birincil görev: `rag-source--implementation`.

### rag-4 — Kiracı/kullanıcı yetkisini kaynak parçası düzeyinde koruma.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Not doğru tespit ediyor: kiracı etiketi kayıt erişim kontrolünün (ACL) yerine geçmez. Frappe'de doc düzeyinde has_permission (paylaşım ve sahip dahil) ve alan düzeyi okuma izni uygulaması var. Writer araması da indekste filtre uygulamadan sonuçları API katmanında izinle süzüyor. Fakat parça düzeyinde ön filtre mi, son filtre mi uygulanacağı tanımlanmamış. Son filtrede top-k kaybı yaşanabilir. İzin iptalinin anında uygulanması (önbelleğe alınmış ACL olmaması) ve alan düzeyi izinlerin parçaya taşınması da tanımsız.

Eksik:

- Ön filtre / son filtre kararı ve son filtrede top-k doldurma kuralı yok.
- Permlevel alanlarından üretilen parçaların nasıl korunacağı belirsiz (apply_fieldlevel_read_permissions eşdeğeri).
- 'İzin iptali hemen' için sorgu anında Frappe has_permission çağrısı zorunluluğu yazılmamış.
- ignore_user_permissions gibi bayrakların RAG yolunda kullanılamayacağı açıkça yasaklanmamış.

Nasıl tamamlanır: rag-chunk-reference--implementation sözleşmesine şunlar eklenmeli: her parça kaynak doctype, name ve fieldname taşımalı. Yanıttan önce son kullanıcı adına has_permission ve alan izni yeniden kontrol edilmeli. Yetkisiz parça atfa da girmemeli.

Kaynak dayanakları: `frappe/frappe/permissions.py:94`; `frappe/frappe/api/v1.py:84`; `suite/suite/writer/search.py:23`; `frappe/frappe/desk/search.py:115`.

Rehber: [rag-source](./frappe-roadmap-contracts/rag-source.json). Mevcut birincil görev: `rag-source--implementation`.

### rag-5 — Kaynak atfı, güncellik, silinen içeriği indeksten çıkarma ve kalite ölçümü.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü iki noktayı kapsıyor: doğrulanabilir kaynak sürümü ve silinen parçanın aramadan kalkması. Kaynakta kimliğe göre indeksten silme ve DocType bazında silme, ayrıca BM25 ile özel skor sıralama izleme var. Ancak 'kaynak sürümü'nün ne olduğu (modified mı, Version kaydı mı) tanımlanmamış. Silme yayılımının tetikleyicisi ve süresi de yok. Kalite ölçümü için veri seti, metrik ve eşik yok. GDPR kapsamındaki kopyalar (yedek, önbellek) sınırlandırılmamış.

Eksik:

- Atıf için kaynak sürüm alanı ve doğrulama yolu tanımlanmamış.
- Silme ve iptal (trash/cancel) olayından indeks silmeye giden tetikleyici ve azami gecikme yok.
- Kalite ölçümünün metriği, değerlendirme seti ve kabul eşiği yok.
- Yedeklerde ve türev kopyalarda silme kapsamı belirtilmemiş.

Nasıl tamamlanır: rag-source--implementation kabul metnine üç şey eklenmeli: atıf = doctype + name + modified, silme = doc silme olayında parça ID'leriyle delete, kalite = küçük sabit bir soru seti ve bir eşik. Test bütçesi aşılmamalı.

Kaynak dayanakları: `suite/suite/store/search_store.py:163`; `frappe/frappe/utils/global_search.py:158`; `frappe/frappe/search/sqlite_search.py:115`.

Rehber: [rag-source](./frappe-roadmap-contracts/rag-source.json). Mevcut birincil görev: `rag-source--implementation`.

### agents-1 — Agents (yapay zekâ çalışanları): idari işler, satın alma ve diğer görevler.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var, ancak orkestratör seçilmemiş (LangGraph yalnız örnek). Ajan kimliğinin Frappe User/rol ya da Keycloak istemcisine nasıl bağlanacağı da tanımsız. Yerel kaynakta ajan platformu yok. Elimizde yalnız Frappe izin denetimi, API v1/v2 ve 'AI agents' için düşünülmüş discovery temeli var. Suite içinde Sheets'e özel bir Anthropic bağımlılığı bulunuyor; bu bir ajan yeteneği değil.

Eksik:

- Satın alma eylemi ERPNext Purchase DocType'larına bağlı, ancak ERPNext bu sitede kurulu değil; native olduğu iddia edilemez ve hedef DocType tanımlı değil.
- Ajanın kimlik modeli tanımsız: ayrı servis kullanıcısı mı, rol seti ne, Keycloak token'ı Frappe oturumuna nasıl eşleniyor?
- Kullanılacak API sürümü (v1 /api/resource mı, v2 mi) ve Frappe 17.0.0.dev0 için sürüm eşlemesi belirtilmemiş.
- Sheets AI Assist ile ajan katmanının ayrımı ve GenUI ile kayıt defterlerini birleştirmeme sınırı yazılmamış.

Nasıl tamamlanır: agent-run--implementation görevine şu kısa sözleşmeyi ekleyin: ajan = rolü kısıtlı ayrı Frappe User; çağrı yolu = /api/v2; ERPNext kurulana kadar satın alma kapsam dışı ya da 'bağımlılık bekliyor' olarak işaretli. Yeni bir görev kaydı açmayın.

Kaynak dayanakları: `frappe/frappe/api/discovery.py:320`; `suite/pyproject.toml:31`; `frappe/frappe/permissions.py:82`; `suite/pyproject.toml:45`.

Rehber: [agent-run](./frappe-roadmap-contracts/agent-run.json). Mevcut birincil görev: `agent-run--implementation`.

### agents-2 — Ajan rolü, araç kataloğu ve izin verilen işlem kapsamı.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

'Her çağrıda sunucu izni yeniden uygulanır' ilkesi doğru ve kaynakla uyumlu: v1/v2'de check_permission ve is_whitelisted var. Ancak araç kataloğunun kaynağı belirsiz. Frappe discovery yalnız System Manager'a açık ve allow_guest bilgisini veriyor; ajana System Manager verilmemeli. Tenant parametresiyle kapsam genişletmeyi engelleyen bir sözleşme de yok.

Eksik:

- Araç kataloğunun Frappe discovery'den mi türetileceği, yoksa elle onaylı bir allowlist mi olacağı tanımsız. Discovery'nin System Manager şartı ajan rolüyle çelişiyor.
- Tenant sınırı tanımsız: site mi, User Permission mı? Tenant parametresinin sunucu tarafında yok sayılma kuralı da yazılmamış.
- allow_guest uçların (ör. writer docs) ve ignore_permissions kullanan yardımcıların katalogdan dışlanma kuralı yok.
- Suite'in File iznini Drive iznine devrettiği (ignore_file_permissions) hesaba katılmamış.

Nasıl tamamlanır: agent-capability--implementation altında: discovery çıktısını yalnız admin tarafında, onaylı allowlist üretmek için kullanın. Her araç için doctype/ptype eşlemesini PERMISSION_MAP ile, File işlemleri için Drive iznini belgeleyin. ui-* kayıt defterleriyle birleştirmeyin.

Kaynak dayanakları: `frappe/frappe/api/discovery.py:29`; `frappe/frappe/api/discovery.py:264`; `frappe/frappe/api/v2.py:24`; `frappe/frappe/api/v1.py:121`; `suite/suite/hooks.py:117`.

Rehber: [agent-capability](./frappe-roadmap-contracts/agent-capability.json). Mevcut birincil görev: `agent-capability--implementation`.

### agents-3 — Hassas eylemde insan onayı ve çalışmayı durdurma.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: onaysız kritik eylem çalışmayacak, durdurmadan sonra yeni çağrı yapılmayacak. Frappe'de submit hakkı ve submit ucu, onay kapısı için bir temel olabilir. Ancak hangi eylemin 'kritik' sayılacağı, onay kaydının nerede tutulacağı ve iptal edilen dış etkilerin ne olacağı tanımsız.

Eksik:

- Kritik eylem sınıflandırması tanımsız (submit, delete, harici çağrı, ödeme vb.).
- Onay kaydının sahibi belirsiz: native submit/docstatus mu, orkestratör interrupt'ı mı? Excerpt'te Workflow kaynağı görülmediği için bilinmiyor.
- Durdurma sinyalinin sunucuda nasıl zorlanacağı (ajan kullanıcısını devre dışı bırakma ya da token iptali) yazılmamış.
- Onay bekleyen kararın UI'da görünür olması ile sunucu yetkisinin ayrımı belirtilmemiş.

Nasıl tamamlanır: human-decision--implementation için: kritik eylem = submit/cancel/delete ve dış etki; onay = ajan dışındaki insan kullanıcının Frappe yetkisiyle yaptığı submit; durdurma = ajan User'ını kapatma. Bunu tek paragrafta sabitleyin.

Kaynak dayanakları: `frappe/frappe/permissions.py:20`; `frappe/frappe/client.py:276`; `frappe/frappe/api/v1.py:132`.

Rehber: [human-decision](./frappe-roadmap-contracts/human-decision.json). Mevcut birincil görev: `human-decision--implementation`.

### agents-4 — Görev hafızası, yürütüm geçmişi, yeniden deneme ve devretme.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe uygulamasındaki automation_engine, deterministik Automation Flow'lar için kalıcı yürütüm altyapısı sağlıyor. Bu bir AI ajanı değil. (1) Yürütüm geçmişi: Automation Run DocType'ı status, user (Run As), queue_row, started_at/ended_at, error_summary, steps (Automation Run Step), actions_snapshot ve run_state alanlarını tutuyor; run_steps adım kayıtlarını geri okuyor. (2) Checkpoint/devam: Wait/WaitForEvent adımı resume_run ve resume_from_idx alanlı bir kuyruk satırı yazıyor. Böylece aynı Run, ilk snapshot ve adımlarıyla kaldığı yerden sürüyor. (3) Yeniden deneme: drainer, satırları savepoint ve commit gruplarıyla çalıştırıyor. attempt sayacı max_attempts değerine (varsayılan 3) ulaşınca durum Failed oluyor; grup commit'i başarısız olursa satırlar tek tek yeniden çalıştırılıyor. Arka plan işleri de deadlock veya zaman aşımında en fazla 5 kez yeniden deneniyor ve job_id+deduplicate destekliyor. (4) Yan etki güvenliği: Automation Trigger Queue'daki unique dedup_key indeksi çift tetiklemeyi engelliyor. effects_delivered işareti, veritabanı dışına etki etmiş (webhook, mail) bir satırı yeniden denemek yerine Failed yapıyor. (5) Yetkili kimlik: _execution_identity ve _ensure_trigger_access her çalıştırmada kimliği ve erişimi yeniden kuruyor. yalnız şema düzenleme için base_revision ve proposal_digest tabanlı iyimser eşzamanlılık sunar. Ajan çalıştırma, hafıza veya devir içermez. Suite'in Vue frontend'i bu maddeyle ilgili değildir. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- AI ajanına özgü agent-run ve agent-step kaydı yok: model/araç çağrısı, araç girdi/çıktı özeti ve istem/bağlam sürümü tutulmuyor.
- Ajan görev hafızası yok: hafıza DocType'ı, kapsamı/TTL'si ve tenant izolasyonu tanımlı değil.
- Araç çağrısı başına istemcinin verdiği idempotency anahtarı ve bu anahtarla sonucun yeniden döndürülmesi yok. dedup_key yalnızca automation+belge bazında bekleyen tetiklemeyi tekilleştiriyor.
- Ajanlar arası devretme yok: hedef ajan, devralınan geçmiş ve iznin hedef ajanın rolüyle yeniden kontrol edilmesi sözleşmesi bulunmuyor.
- Headless provider'da ajan run/step okuma-yazma ucu yok; GenUI sağlayıcı sözleşmesi bu maddeyi kapsamıyor.

Nasıl tamamlanır: Sıra şöyle: agent-run--contract → agent-run--schema → agent-run--implementation → agent-step--implementation. İlk ve en küçük adım: Automation Run, Automation Run Step ve Trigger Queue'nun dedup/attempt/resume desenini yeniden kullanan dar bir Agent Run + Agent Step şeması. Agent Step alanları: run, idx, tool, status, idempotency_key (unique), result_digest, effects_delivered. Önce tek bir davranış için başarısız (RED) test yazılmalı: aynı idempotency_key ile tekrarlanan adım ikinci kez yan etki üretmemeli ve kayıtlı sonucu döndürmeli. Sonra bu testi geçirecek (GREEN) kod yazılmalı. Ardından devir kuralı eklenmeli: devirde izin taşınmaz, hedef ajanın kimliğiyle _execution_identity benzeri bir kontrol yeniden yapılır. Tenant izolasyonu R-01 eşlemesine bağlanmalı. Headless provider ucu en son eklenmeli.

Kaynak dayanakları: `frappe/frappe/automation_engine/runner.py:25`; `frappe/frappe/automation_engine/runner.py:92`; `frappe/frappe/automation_engine/drainer.py:167`; `frappe/frappe/automation_engine/drainer.py:136`; `frappe/frappe/automation_engine/dispatch.py:109`.

Rehber: [agent-run](./frappe-roadmap-contracts/agent-run.json). Mevcut birincil görev: `agent-run--implementation`.

### agents-5 — Adım, süre, kaynak ve harcama üst sınırları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni net: limit dolunca yeni çağrı yapılmasın, kısmi sonuç ve sebep kaydedilsin. Ancak limit değerleri, sayaçların sahibi ve harcama birimi tanımsız. Yerelde yalnız uç başına rate_limit ve insert_many'deki 200 sınırı gibi temeller var; ajan bütçesi yok.

Eksik:

- Adım, süre, token ve para limitlerinin varsayılan değerleri ve kimin değiştirebileceği tanımsız.
- Sayacın atomik olarak sunucuda tutulacağı yer belirsiz (orkestratör mü, Frappe mi).
- Frappe rate_limit'in ajan kimliği başına kullanılıp kullanılmayacağı belirtilmemiş.

Nasıl tamamlanır: agent-step--implementation içinde: her araç/model çağrısından önce kontrol edilen sunucu tarafı sayaç ve limit aşımında 'stopped_reason' alanı. Frappe rate_limit'i ek bir savunma katmanı olarak not edin.

Kaynak dayanakları: `suite/suite/drive/api/product.py:127`; `frappe/frappe/client.py:245`.

Rehber: [agent-run](./frappe-roadmap-contracts/agent-run.json). Mevcut birincil görev: `agent-run--implementation`.

### agents-6 — Talimat, veri ve araç çıktılarının güven sınırları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

'Prompt'a yetki verilmez, sunucu politikası üstündür' ilkesi doğru. Frappe'de alan düzeyi okuma izni, SSRF engeli ve sunucu betiklerinin varsayılan kapalı olması gibi temeller var. Ancak gizli veri sınıfları, araç çıktısının yapılandırılmış şemayla ayrılması ve ignore_permissions kullanan yardımcıların dışlanması yazılmamış.

Eksik:

- Ajanın göreceği alanların native permlevel ve apply_fieldlevel_read_permissions ile sınırlanacağı açıkça yazılmamış.
- Suite içinde ignore_permissions ve allow_guest kullanan yardımcıların ajan aracı olarak sunulmasını yasaklayan bir kural yok.
- Server Script/safe_exec ve keyfi SQL'in ajan kısayolu olarak kullanılamayacağı belirtilmemiş.
- Discovery'nin kaynak kodu açma kancası (expose_discovery_source) ile veri sızıntısı ilişkisi değerlendirilmemiş.

Nasıl tamamlanır: agent-run--implementation güvenlik notuna kısa bir yasak listesi ekleyin: ignore_permissions yardımcıları, allow_guest uçları, safe_exec ve ham SQL. Ajan okumalarını yalnız apply_fieldlevel_read_permissions uygulanan uçlarla sınırlayın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:84`; `suite/suite/drive/api/product.py:138`; `frappe/frappe/utils/safe_exec.py:88`; `frappe/frappe/utils/safe_exec.py:388`; `frappe/frappe/api/discovery.py:326`.

Rehber: [agent-run](./frappe-roadmap-contracts/agent-run.json). Mevcut birincil görev: `agent-run--implementation`.

### forms-1 — Form manager (form oluşturma ve yönetim aracı).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul var. Kaynakta bunun temel parçaları da bulunuyor: v2 get_meta, Custom Field ve Property Setter birleştirmesi, alan düzeyinde okuma izni ve DocType Layout. Ancak talimat 'form manager' ile neyin kastedildiğini belirlemiyor: standart DocType özelleştirmesi mi, custom DocType düzenleme mi, yoksa yalnız sunum katmanı mı (Layout)? get_meta, giriş yapmış her kullanıcıya meta dönüyor. Bu yüzden render sırasında alanın meta'da görünmesi yazma yetkisi anlamına gelmiyor. Web Form kaynağı bu excerpt'te yok.

Eksik:

- Form manager'ın üç farklı yolu ayrılmamış: Customize Form/Custom Field (yalnız standart DocType), custom DocType düzenleme ve DocType Layout (yalnız sunum).
- Renderer'ın desteklediği fieldtype/özellik alt kümesi ve bilinmeyen tiplerde güvenli varsayılan davranış tanımlı değil.
- 'İzin dışı alan oluşturma' kuralının hangi role ve Custom Field/DocType izinlerine bağlanacağı belirtilmemiş. ignore_permissions kullanan make_property_setter'ın dışarı açılmaması gerektiği yazılmamış.
- v17 dev'deki v2 /meta ile v1 resource uç noktaları arasında sürüm eşlemesi yok.

Nasıl tamamlanır: ui-provider-metadata--implementation-mvp görevine kısa bir sözleşme notu ekle: kaynak olarak v2 get_meta ve okumada apply_fieldlevel_read_permissions kullanılacak. Desteklenen fieldtype listesi yazılsın. Özelleştirme yalnız native Custom Field/Customize Form izinleriyle yapılsın. DocType Layout sunum katmanı olarak ayrı tutulsun.

Kaynak dayanakları: `frappe/frappe/api/v2.py:246`; `frappe/frappe/model/meta.py:174`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/custom/doctype/customize_form/customize_form.py:135`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:87`.

Rehber: [ui-family-16](./frappe-roadmap-contracts/ui-family-16.json). Mevcut birincil görev: `ui-family-16--implementation`.

### forms-2 — Alan doğrulama, koşullu görünürlük ve alanlar arası bağımlılık.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

depends_on, mandatory_depends_on ve read_only_depends_on DocField özellikleri kaynakta mevcut. Bu koşullar 'eval:' biçiminde JavaScript ifadeleri; DocType Layout condition alanı da JavaScript. Headless React tarafında bunları güvenli biçimde değerlendirme sözleşmesi yok. Backend'de koşullu zorunluluğun reddedildiği (Document mandatory doğrulaması) kod bu excerpt'te görülmüyor, dolayısıyla kabul ölçütündeki backend reddi doğrulanamıyor.

Eksik:

- eval: ifadeleri için güvenli bir alt küme veya ayrıştırıcı kararı yok. Keyfi JS eval ve client script kısayolu açıkça yasaklanmamış.
- mandatory_depends_on kuralının sunucuda uygulanıp uygulanmadığı v17 kaynağından doğrulanmamış. Çapraz alan kurallarının controller validate tarafında nerede yaşayacağı tanımlı değil.
- Sunucu hata yanıtının (alan bazlı mesaj) renderer'da forma nasıl eşleneceğine dair sözleşme yok.

Nasıl tamamlanır: ui-family-17 görevinde şu sınır yazılsın: UI tarafı depends_on ifadelerini yalnız güvenli bir alt kümeyle sunum için değerlendirir, yetki ve zorunluluk sunucuda kalır. v17 Document._validate_mandatory kaynağı okunarak koşullu zorunluluğun sunucuda uygulandığı doğrulansın.

Kaynak dayanakları: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:98`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:28`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.json:417`; `frappe/frappe/core/doctype/doctype_layout/doctype_layout.json:134`.

Rehber: [ui-family-16](./frappe-roadmap-contracts/ui-family-16.json). Mevcut birincil görev: `ui-family-16--implementation`.

### forms-3 — Çok adımlı form, taslak kaydı ve kaldığı yerden devam.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam koşullu ve kabul ölçütü anlamlı. Kaynakta Tab Break gibi adımlara bölmeye yarayacak düzen primitifleri var; v1 create_doc ise insert() ile doğrudan tam kayıt oluşturuyor. Eksik zorunlu alanları olan yarım bir adım hedef DocType'a kaydedilemeyebilir, bu yüzden taslağın nerede saklanacağı belirsiz. Görev yalnız post-mvp olarak eşlenmiş ve destekleyici görevi yok.

Eksik:

- Taslağın nerede tutulacağı belirsiz: hedef DocType'ta docstatus=0 mı, ayrı bir taslak deposu mu? Zorunlu alan doğrulamasıyla çatışma ele alınmamış.
- Adım tanımının kaynağı (Tab/Section Break ya da ayrı bir adım metadata'sı) belirlenmemiş.
- Taslağın kullanıcı ve tenant'a bağlanması, oturum yenilemede sahiplik kontrolü tanımlı değil.
- Final submit sırasında eksik adımı yakalayan sunucu tarafı kural tanımlı değil.

Nasıl tamamlanır: ui-family-16--implementation-post-mvp altında depolama modeli kararı (hedef kayıt veya taslak deposu), sahiplik/tenant anahtarı ve final submit'te sunucu doğrulaması kısa bir sözleşme olarak yazılsın. Bu adım forms-6 ile ortak tutulsun.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:72`.

Rehber: [ui-family-16](./frappe-roadmap-contracts/ui-family-16.json). Mevcut birincil görev: `ui-family-16--implementation-post-mvp`.

### forms-4 — Form sürümü, yayınlama ve geriye uyumlu değişiklik.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Custom Field ve Customize Form kaydedildiği anda updatedb çalışıyor ve şema hemen uygulanıyor. Kaynakta staging veya yayınlama aşaması görülmüyor. Property Setter tarafında tip değişikliği koruması yalnız naming_series için var. Trim Table geri dönüşsüz veri kaybı uyarısı gösteriyor. Hem Property Setter hem DocType Layout track_changes ile denetim izi tutuyor, ancak yayınlanmış form sürümü kavramı yok.

Eksik:

- Form sürüm kimliği tanımlı değil; örneğin efektif meta ile layout'tan türetilen bir hash ve bunun taslağa nasıl damgalanacağı.
- Kırıcı değişiklik sınıfları (fieldtype değişimi, alan silme, reqd ekleme) ve yayın öncesi engelleme kuralı belirtilmemiş.
- Eski taslağı yeni sürüme taşıyacak deterministik dönüşüm (alan eşleme) sözleşmesi yok.
- Native kaydın şemayı hemen uyguladığı göz önüne alınarak önizleme/onay sınırı tanımlanmamış.

Nasıl tamamlanır: Post-mvp görevinde form sürümü olarak efektif get_meta ile layout özetinin kullanılması sözleşmeye bağlansın. Kırıcı değişiklik listesi yazılsın, bu değişiklikler önizleme ve onay olmadan uygulanmasın. Eski taslaklar için dönüşüm/eşleme kuralı tanımlansın.

Kaynak dayanakları: `frappe/frappe/custom/doctype/custom_field/custom_field.py:229`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:54`; `frappe/frappe/custom/doctype/customize_form/customize_form.js:230`; `frappe/frappe/custom/doctype/property_setter/property_setter.json:163`.

Rehber: [ui-family-16](./frappe-roadmap-contracts/ui-family-16.json). Mevcut birincil görev: `ui-family-16--implementation-post-mvp`.

### forms-5 — Dosya alanı, tekrarlanabilir alan grubu ve ilişkili kayıt seçimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Attach, Link, Table ve link_filters alan özellikleri çekirdekte mevcut. v1 tarafında link genişletmesi read izniyle yapılıyor, child satırı kaydedildiğinde parent da kaydediliyor ve upload_file import ediliyor. Ancak ilişki aramasının izin uygulaması (search_widget) bu excerpt'te görülmüyor. Talimatlar hangi arama ve yükleme API'sinin kullanılacağını belirtmiyor.

Eksik:

- Yetkili ilişki araması için v17 API'si (search_widget veya search_link) ve link_filters uygulaması belirtilmemiş.
- Dosya gizliliği (private/public), boyut/tip sınırı ve yükleme sonrası alan bağlama sözleşmesi yok.
- Tekrarlanan satırlarda sıra (idx), satır silme/ekleme ve Table MultiSelect davranışı tanımlı değil.

Nasıl tamamlanır: ui-family-19 görevinde v17 frappe.desk.search kaynağı okunsun, izinli arama uç noktası sabitlensin. Dosya için upload_file ve private varsayılanı, child satırlar için parent save akışı sözleşmeye yazılsın.

Kaynak dayanakları: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:35`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:97`; `frappe/frappe/api/v1.py:104`; `frappe/frappe/client.py:11`; `frappe/frappe/api/v2.py:22`.

Rehber: [ui-family-19](./frappe-roadmap-contracts/ui-family-19.json). Mevcut birincil görev: `ui-family-19--implementation-mvp`.

### forms-6 — Otomatik taslak ve taslağı kurtarma; sekme kapanması, tarayıcı çökmesi ve bağlantı kesilmesinde emeği koruma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güçlü: tenant/hesap sızıntısı, logout, yerel taslak ile sunucu kaydı ayrımı ve şema çakışması ele alınmış. Ancak teknik karar eksik: yerel mi, sunucu mu, ikisi birden mi? Kaynakta otomatik taslak primitifi görülmüyor. Customize Form yalnız doctype adını localStorage'a yazıyor. Sunucuda for_update ile kalıcılık var, fakat eşzamanlılık (modified) kontrolü bu excerpt'te görülmüyor. Kapsam koşullu olduğu halde görev MVP görevine eşlenmiş.

Eksik:

- Saklama kararı (IndexedDB, sunucu taslağı ya da ikisi), saklama süresi ve hassas alanların hariç tutulması tanımlı değil.
- Tauri2 ve WXT/MV3 depolama eşdeğerliği ile yerel taslağın şifrelenip şifrelenmeyeceği belirtilmemiş.
- Eşzamanlı değişiklik çakışmasının modified/sürüm alanıyla nasıl tespit edileceği tanımlı değil.
- Koşullu kapsam ile MVP görev eşlemesi arasındaki tutarsızlık giderilmemiş.

Nasıl tamamlanır: ui-family-16 görevinde tek bir karar notu yazılsın: taslak anahtarı tenant + kullanıcı + doctype + form sürümü olsun; logout'ta temizlensin; sunucu kaydı ile yerel taslak arayüzde ayrı gösterilsin; çakışma modified karşılaştırmasıyla yakalansın. Kapsam/MVP eşlemesi netleştirilsin.

Kaynak dayanakları: `frappe/frappe/custom/doctype/customize_form/customize_form.js:11`; `frappe/frappe/api/v1.py:56`.

Rehber: [ui-family-16](./frappe-roadmap-contracts/ui-family-16.json). Mevcut birincil görev: `ui-family-16--implementation`.

### locale-1 — GILT (Globalization, Internationalization, Localization, Translation — küreselleştirme, uluslararasılaştırma, yerelleştirme, çeviri): g11n, i18n, l10n, t9n.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel Frappe v17-dev kaynağında dil seçimi, katalog birleştirme ve `_()` ile çevrilmiş API hata metni gibi temel parçalar var. Ancak talimat, headless React/Ant Design istemcisinin dili nasıl seçeceğini, kataloğu nasıl alacağını ve kapsamdaki dilleri belirtmiyor. Kabul ölçütü yalnızca 'Türkçe + ikinci dil' diyor. Oturum açmış kullanıcıda `get_language` frappe.local.lang döndürüyor; Accept-Language ve çerez yalnızca Guest için okunuyor.

Eksik:

- Desteklenen dil listesi ve ikinci dil seçilmemiş.
- Headless istemcinin dili nasıl ileteceği tanımlı değil (`_lang`, User.language veya Keycloak claim). Keycloak/bearer oturumunda frappe.local.lang'in nasıl belirlendiği kaynakta görülmedi.
- React tarafında katalog kaynağı belirtilmemiş: get_boot_translations mı, ayrı bir katalog mu? Ant Design ConfigProvider locale eşlemesi de tanımsız.
- Kaynak doküman bağlantıları v16 sayfaları; yerel v17.0.0.dev0 ile eşlemesi yapılmamış.

Nasıl tamamlanır: ui-localization--implementation görevine kısa bir dil sözleşmesi eklenmeli. Sözleşmede dil listesi, dil önceliği (User.language → System Settings, `_lang` yalnız açık override olarak) ve katalog kaynağı (get_boot_translations) yazılmalı. Mevcut kabul ölçütü bu sözleşmeye bağlanmalı; yeni registry açılmamalı.

Kaynak dayanakları: `frappe/frappe/translate.py:49`; `frappe/frappe/translate.py:55`; `frappe/frappe/translate.py:140`; `frappe/frappe/api/v2.py:178`.

Rehber: [ui-localization](./frappe-roadmap-contracts/ui-localization.json). Mevcut birincil görev: `ui-localization--implementation`.

### locale-2 — Transliteration / t13n (yazı sistemleri arasında harf dönüşümü).

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynağında yazı sistemleri arasında dönüşüm yapan (ör. Kiril→Latin, Yunan→Latin, Kana/Pinyin) bir transliterasyon/t13n servisi, API'si, DocType'ı, hook'u ya da arama entegrasyonu bulunamadı. Bulunanlar yalnızca komşu, aynı alfabe içinde çalışan aksan/Unicode normalizasyon primitifleri; transliterasyonun yerine geçmezler: (1) Frappe Desk awesomebar fuzzy_match.js karakterleri NFD'ye çevirip birleşik aksan işaretlerini (U+0300–036F) atarak karşılaştırıyor; yalnız istemci tarafı Desk araç çubuğu eşleşmesi. (2) frappe/search/sqlite_search.py FTS5 varsayılan tokenizer'ı 'unicode61 remove_diacritics 2'; Suite writer/search.py aynı tokenizer'ı kullanıyor. Bu Latin aksanlarını katlar, alfabe dönüştürmez. (3) desk/search.py search_widget düz 'like %txt%' filtresiyle arıyor; normalizasyon ya da transliterasyon katmanı yok. (4) Suite drive content_disposition, ASCII olmayan dosya adları için NFKD + ascii 'ignore' kullanıyor. Bu, Kiril/CJK karakterlerini dönüştürmüyor, siliyor; özgün ad RFC 5987 filename* ile korunuyor. (5) Suite Vue frontend'inde slugify npm paketi yalnızca drive/writer URL slug'ı için kullanılıyor. Paket kodu node_modules'ta olduğundan dışarıda kaldı; locale/transliterasyon sözleşmesi yok. clean_text NFKC + boşluk sadeleştirmesi yapıyor, alfabe dönüştürmüyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Alfabe çiftleri için dönüşüm fonksiyonu/kütüphanesi (Python backend tarafında unidecode/anyascii/PyICU benzeri hiçbir bağımlılık veya kod yok); kütüphane ve lisans seçimi yapılmamış.
- Özgün metni koruyup transliterasyonlu biçimi saklayan alan ya da indeks (Custom Field, ayrı arama sütunu veya FTS metin alanı) yok.
- search_widget/link araması ve SQLiteSearch indeksleme hattında transliterasyonlu eşleme yok; mevcut tek yaklaşım Latin aksan katlama.
- planlanan Frappe adaptörü için locale/transliterasyon provider sözleşmesi (girdi dili/alfabesi, çıktı, özgün metin referansı) yok; React/AntDesign istemcisinin tüketeceği bir uç nokta yok.
- Kabul ölçütü olarak seçilmiş alfabe çiftleri ve 3–5 örneklik test veri seti yok.

Nasıl tamamlanır: Mevcut ui-localization--contract bağımlılığı içinde önce kapsamı daraltın: tek bir alfabe çifti (ör. Kiril→Latin) ve tek bir senaryo (link/global arama) seçin, 3–5 örneklik kabul tablosu yazın. Kütüphane ve lisans seçimini kullanıcıyla netleştirin. Ardından sırasıyla: (1) backend'de saf bir transliterate(text, source_script, target) yardımcı fonksiyonu yazın; önce bu fonksiyon için RED/GREEN birim testi kurun. (2) Bu fonksiyonu SQLiteSearch alt sınıfının indekslediği metne ek bir alan olarak bağlayın; özgün metin değişmeden kalsın. Alternatif olarak search_widget'a or_filters ile ikinci bir aday terim ekleyin. (3) Bunu planlanan Frappe adaptörü'da okunur bir sözleşme alanı olarak açın. Suite'in Vue frontend'ine ve GenUI'ye dokunmayın. Seçim yapılamıyorsa maddeyi post_mvp'de ertelenmiş olarak bırakın.

Kaynak dayanakları: `frappe/frappe/public/js/frappe/ui/toolbar/fuzzy_match.js:87`; `frappe/frappe/search/sqlite_search.py:224`; `frappe/frappe/desk/search.py:251`; `suite/suite/drive/utils/files.py:582`; `suite/suite/writer/search.py:12`; `suite/suite/utils/__init__.py:148`.

Rehber: [ui-localization](./frappe-roadmap-contracts/ui-localization.json). Mevcut birincil görev: `ui-localization--implementation`.

### locale-3 — Dil anahtarları, yedek dil, çoğul kuralları ve çeviri sürümleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta Babel tabanlı PO/MO hattı ve üst dile geri dönüş var: zh-TW → zh, ardından alt dilin çevirileri üstüne yazılıyor. Çeviri sürümü için bir önbellek anahtarı da var. Ancak frontend'e giden katalog düz bir dict[str,str]; çoğul biçimlerin istemciye nasıl taşınacağı bu alıntılarda görülmüyor. Kataloğun 1 yıllık http_cache ile sunulması, sürüme bağlı önbellek kırma sözleşmesini zorunlu kılıyor. Talimat v16 dokümanına dayanıyor; yerel v17-dev ile doğrulanmamış.

Eksik:

- Çoğul kuralı için sözleşme yok (ngettext/plural-forms istemciye nasıl iletilecek).
- Eksik anahtarda kaynak metne dönüş davranışı ve Language.based_on alanının geri dönüşteki rolü doğrulanmamış (birleştirme dil kodunu bölerek yapıyor).
- Headless istemcinin önbellekteki kataloğu translation_version üzerinden nasıl tazeleyeceği tanımlı değil.
- CSV ve PO/MO birlikte mi kullanılacak, yoksa v17-dev'de tek yol mu var, seçilmemiş.

Nasıl tamamlanır: Mevcut kabul ölçütü yerel v17-dev'e bağlanmalı. Üç kontrol adı konmalı: eksik anahtar, üst dile geri dönüş ve sürüm değişince katalog yenileme. Çoğul ihtiyacı varsa bunun Frappe kataloğunda mı, istemci tarafındaki ICU'da mı çözüleceğine tek kararla karar verilmeli.

Kaynak dayanakları: `frappe/frappe/translate.py:33`; `frappe/frappe/translate.py:139`; `frappe/frappe/translate.py:165`; `frappe/frappe/gettext/translate.py:19`; `frappe/pyproject.toml:12`.

Rehber: [ui-localization](./frappe-roadmap-contracts/ui-localization.json). Mevcut birincil görev: `ui-localization--implementation`.

### locale-4 — Saat dilimi, tarih, sayı, para, adres ve telefon biçimleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe'de dile bağlı tarih/saat/sayı biçimleri ve haftanın ilk günü var. Bunlar Language kaydından, yoksa sistem varsayılanından okunuyor ve Language değişince kullanıcı varsayılanlarına yayılıyor. Suite ise kendi frontend kodunda saat dilimini tarayıcı → User → sistem sırasıyla seçiyor ve UTC kablo biçimiyle naive sistem saati alanlarını ayırıyor. Talimat round-trip kabulünü istiyor ama hangi biçimin kabloda gideceğini ve saat dilimi önceliğini belirlemiyor. Adres ve telefon için alıntılarda kaynak yok.

Eksik:

- Kablo sözleşmesi yok. Frappe Datetime alanları naive sistem saat diliminde; UTC/ISO dönüşümü istemcide mi sunucuda mı yapılacak, belirsiz.
- Saat dilimi önceliği seçilmemiş. Suite tarayıcıyı User.time_zone'un önüne koyuyor; ürün için bu bir karar gerektiriyor.
- Frappe number_format/date_format değerlerinin Intl/dayjs ve Ant Design DatePicker biçimlerine eşlemesi yok.
- Para birimi hassasiyeti, adres ve telefon şeması için kaynak alıntılanmamış. ERPNext kurulu olmadığından ülke adres şablonları yerel yetenek sayılamaz.

Nasıl tamamlanır: ui-family-17--implementation-mvp görevine tek sayfalık bir biçim sözleşmesi eklenmeli: kablo biçimi, saat dilimi önceliği ve locale.py değerlerinin Intl eşlemesi. Suite'teki datetime yardımcıları yeniden yazılmak yerine referans desen olarak gösterilmeli.

Kaynak dayanakları: `frappe/frappe/locale.py:51`; `frappe/frappe/core/doctype/language/language.py:68`; `suite/frontend/src/apps/mail/utils/datetime.ts:21`; `suite/frontend/src/apps/mail/utils/datetime.ts:47`; `frappe/frappe/utils/dateutils.py:58`.

Rehber: [ui-family-17](./frappe-roadmap-contracts/ui-family-17.json). Mevcut birincil görev: `ui-family-17--implementation-mvp`.

### locale-5 — Sağdan sola yazım ve çok dilli içerik alanları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe'de dil kaydı ve kullanıcıya özel çeviriler var. Ancak kullanıcı çevirileri genel metin eşlemesi; kayda özel, çok dilli içerik alanı sağlamıyor. Language DocType alanlarında yazım yönü (RTL) alanı yok. RTL algılamanın başka bir yerde olup olmadığı alıntılarda görülmedi. Talimat RTL ve çok dilli içerik kabulünü yazıyor, ancak veri modelini ve renderer sınırını belirtmiyor.

Eksik:

- Kayda özel çok dilli içerik için model seçilmemiş: dil başına Custom Field, alt tablo ya da ayrı DocType. Native Custom Field ile yetki sınırı da tanımsız.
- API'de içerik dili istenirse bulunmadığında hangi dile dönüleceği ve arama indeksinin nasıl davranacağı tanımlı değil.
- Yön bilgisinin kaynağı (dil koduna göre RTL listesi) ve Ant Design ConfigProvider direction ile mantıksal CSS sözleşmesi yok.
- RTL için klavye/odak kabulü, WCAG 2.2 AA ve tarayıcı matrisine bağlanmamış.

Nasıl tamamlanır: Önce yalnızca içerik modeli kararı verilmeli (Custom Field ya da alt tablo; ORM kopyalanmadan). RTL kısmı ui-localization görevinde, yönün dil kodundan türetildiği tek bir kural olarak tanımlanmalı. Arapça kabulü bu iki karardan sonra uygulanmalı.

Kaynak dayanakları: `frappe/frappe/translate.py:171`; `frappe/frappe/core/doctype/language/language.json:46`; `frappe/frappe/core/doctype/language/language.py:61`.

Rehber: [ui-localization](./frappe-roadmap-contracts/ui-localization.json). Mevcut birincil görev: `ui-localization--implementation`.

### workflow-1 — Workflow engine (iş akışı motoru).

Kaynak durumu: **VAR**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel v17-dev kaynağında apply_workflow, geçiş listesini rol ve koşula göre süzüyor. Listede olmayan action WorkflowTransitionError ile reddediliyor. Talimatın hedefi ve kabul ölçütü yeterli. Ancak kaynak bağlantısı version-15'e gidiyor; headless API sözleşmesi de tanımlanmamış.

Eksik:

- Kaynak bağlantısı version-15'i gösteriyor; yerel 17.0.0.dev0 ile sürüm eşlemesi yok.
- Headless çağrının hangi uç olacağı (/api/v2/method üzerinden apply_workflow/get_transitions) ve hata kodlarının nasıl eşleneceği yazılmamış.
- Keycloak rollerinin Frappe Role'üne (transition.allowed) nasıl eşleneceği tanımlı değil.
- Suite hooks.py '/api/' önekini DENIED_WILDCARD_PATHS listesine koyuyor. Workflow method yolunun izinli listede olup olmadığı bu kesitte görülmüyor.

Nasıl tamamlanır: native-workflow--implementation görevine v17 kaynak eşlemesini ve headless uç sözleşmesini ekle: get_transitions ile action listesi, apply_workflow ile uygulama, WorkflowTransitionError/PermissionError için hata eşlemesi. Suite yol allowlist'inin workflow method yolunu kapsayıp kapsamadığını kaynakta doğrula.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:134`; `frappe/frappe/model/workflow.py:136`; `suite/suite/hooks.py:466`.

Rehber: [native-workflow](./frappe-roadmap-contracts/native-workflow.json). Mevcut birincil görev: `native-workflow--implementation`.

### workflow-2 — BPM (Business Process Management — iş süreci yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta belge başına workflow ve rol bazlı Workflow Action (Open/Completed) görev kaydı var. Birden çok belgeyi kapsayan süreç örneği, süreç sahipliği ve ölçüm modeli yok. Talimat da bu modeli tanımlamıyor.

Eksik:

- Birden çok belgeyi bağlayan süreç kimliği/örneği için veri modeli tanımlanmamış.
- Görev sahipliğinin Workflow Action ile mi yoksa ayrı bir modelle mi tutulacağı kararı yok.
- Ölçülecek süreç metrikleri (süre, darboğaz) ve kabul için örnek süreç belirtilmemiş.
- Automation Flow yalnızca beta dokümana bağlı; yerel kaynakta görülmedi.

Nasıl tamamlanır: process-definition--implementation görevinde tek bir örnek süreç seç (ör. iki belge, üç adım). Görev kaydı için Workflow Action'ı yeniden kullan. Süreç örneği ve ölçüm alanlarının sözleşmesini yaz.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:46`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:115`; `frappe/frappe/model/workflow.py:37`.

Rehber: [process-definition](./frappe-roadmap-contracts/process-definition.json). Mevcut birincil görev: `process-definition--implementation`.

### workflow-3 — State machine (iş nesnesi durumlarını ve izinli geçişleri yöneten mekanizma).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Workflow tanımı kaydedilirken docstatus geçişleri doğrulanıyor; geçiş yalnızca mevcut durumdan yapılabiliyor. Ancak apply_workflow belgeyi DB'den yeniden yüklüyor ve istemcinin beklediği durumu almıyor. Bu yüzden eski durumla gelen eşzamanlı istek, action yeni durumda da geçerliyse reddedilmiyor. Beklenen durum/modified kontrolü yalnızca e-posta onay yolunda var.

Eksik:

- Eşzamanlı ve eski durumlu isteğin reddi için headless sarmalayıcıda expected_state/modified kontrolü tanımlanmamış.
- Kaynak bağlantısı version-15; v17 eşlemesi yok.
- Kanban ve UI görevleriyle durum tablosunun nasıl sunulacağı bağlanmamış.

Nasıl tamamlanır: Headless geçiş ucuna, workflow_action.apply_action örüntüsündeki gibi current_state ve last_modified karşılaştırmasını koşul olarak ekle. Bunu ORM'i kopyalamadan, apply_workflow öncesinde yap. Kabul senaryosuna eski durumla gelen isteği ekle.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow/workflow.py:124`; `frappe/frappe/model/workflow.py:122`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:147`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:150`.

Rehber: [native-workflow](./frappe-roadmap-contracts/native-workflow.json). Mevcut birincil görev: `native-workflow--implementation`.

### workflow-4 — Süreç tanımı, sürümleme, başlatma, durdurma ve yürütüm geçmişi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Her DocType için tek bir aktif Workflow var: yeni tanım aktifleşince diğerleri pasifleşiyor ve önbellek DocType'a göre tutuluyor. Belge yalnızca durum alanını saklıyor; çalışan örneği belirli bir tanım sürümüne bağlamıyor. track_changes yalnızca tanım belgesinin Version geçmişini veriyor. Durdurma veya yürütüm geçmişi için kaynakta karşılık görülmedi.

Eksik:

- Örneğin tanım sürümüne nasıl bağlanacağı (sürüm alanı, anlık görüntü) kararı yok.
- Durdurma ve yeniden başlatma semantiği ile yetki modeli yazılmamış.
- Yürütüm geçmişinin kaynağı (Version, Comment ya da yeni kayıt) belirlenmemiş.
- Aktif tanım değişince mevcut belgelerin durum geçerliliği tanımsız; workflow.js'teki 'Save Anyway' uyarısı yalnızca Desk'te var.

Nasıl tamamlanır: process-definition--implementation görevinde örnek-sürüm bağlama kararını yaz. Sessiz değişimi önlemek için tanım değişince mevcut durumların diff'ini almayı ve kırıcı değişikliği engellemeyi kabul ölçütüne ekle.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow/workflow.py:139`; `frappe/frappe/model/workflow.py:38`; `frappe/frappe/workflow/doctype/workflow/workflow.json:140`; `frappe/frappe/model/workflow.py:140`.

Rehber: [process-definition](./frappe-roadmap-contracts/process-definition.json). Mevcut birincil görev: `process-definition--implementation`.

### workflow-5 — BPMN (Business Process Model and Notation — iş süreci modelleme ve gösterimi) desteği.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de BPMN olmayan, durum/geçiş tabanlı bir Workflow motoru var. model/workflow.py içindeki get_transitions okuma izni kontrol ediyor, ardından rol ve safe_eval koşuluyla filtreliyor. apply_workflow geçişi doğrulayıp workflow_state alanını güncelliyor. Workflow DocType'ı states/transitions tablolarını ve gizli workflow_data JSON alanını tutuyor. Desk/Vue Workflow Builder (@vue-flow/core) grafiği BPMN XML olarak değil, Vue Flow node/edge JSON'u olarak saklıyor. Beta Automation Flow tetikleyici/koşul/aksiyon modeli kullanıyor; süreç grafiği veya BPMN değil. Suite'te süreç motoru yok; buradaki 'workflow' eşleşmeleri yalnızca CI dosyaları. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- BPMN 2.0 XML import/export, ayrıştırıcı, şema doğrulama ve yürütme iki uygulama kökünde de yok.
- Gateway, event, subprocess ve lane semantiği yok; Frappe Workflow yalnızca doğrusal durum/geçiş yapısını destekliyor.
- Desteklenen BPMN alt kümesi listesi ve desteklenmeyen öğeyi açıkça reddetme davranışı yok.
- BPMN ile Frappe Workflow states/transitions arasında eşleme yapan bir adaptör yok; yetkili kaynak kararı verilmemiş.
- planlanan Frappe adaptörü'da süreç tanımı veya geçiş API sözleşmesi yok; Builder yalnızca Desk/Vue tarafında, React/AntDesign karşılığı yok.
- Runtime functionalAcceptance: not_run.

Nasıl tamamlanır: Mevcut görev ID'leri ve bağımlılıklar korunur. (1) Önce kullanıcıyla BPMN gerektiren gerçek bir süreç olup olmadığı netleştirilir. (2) Gerekirse process-definition--contract içinde Frappe Workflow yetkili kaynak olarak belirlenir. Desteklenen en dar BPMN alt kümesi (startEvent, userTask→State, sequenceFlow→Transition, endEvent) ve diğer öğeleri reddetme sözleşmesi yazılır. (3) process-definition--schema/implementation aşamasında planlanan Frappe adaptörü'a salt okunur bir export eklenir: Workflow states/transitions → BPMN alt kümesi. Bunun için gerçek RED/GREEN testi yazılır. (4) Import en son eklenir; frappe.client.save ve Workflow validate yolu üzerinden yapılır ve desteklenmeyen öğeyi reddeder. Geçişler model/workflow.py apply_workflow ile yürütülmeye devam eder. (5) Görselleştirme ui-family-38--implementation-scale kapsamında React/AntDesign tarafında yapılır.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:119`; `frappe/frappe/workflow/doctype/workflow/workflow.json:108`; `frappe/frappe/public/js/workflow_builder/store.js:85`; `frappe/frappe/public/js/workflow_builder/WorkflowBuilder.vue:2`.

Rehber: [process-definition](./frappe-roadmap-contracts/process-definition.json). Mevcut birincil görev: `process-definition--implementation-scale`.

### workflow-6 — Bekleme, süre aşımı, yeniden başlatma ve telafi adımları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream-native Frappe kaynağında (frappe/frappe/automation_engine ve automation doctype'ları) Automation Flow motoru var; önceki 'unknown' değerlendirmesi geçersiz. Bulunanlar: (1) Bekleme: Wait adımı (runner.py _begin_wait/schedule_wait) resume_run ve resume_from_idx alanlı bir Automation Trigger Queue satırı açar. Devam ederken aynı Automation Run, actions_snapshot ve run_state (step_outputs/records/branches) geri yüklenir. (2) Süre aşımı: WaitForEvent adımı, Automation Event Subscription kaydı ve timeout_value/timeout_unit ile çalışır. Olay gelmezse get_wait_outcome aboneliği 'Timed Out' yapar ve sonucu event bağlamına koyar. Webhook eyleminde HTTP timeout var (en çok 120 sn). StopAutomation ile bir eylem akışı park edebilir. (3) Kesinti sonrası devam ve yeniden deneme: drainer satırları FOR UPDATE SKIP LOCKED ile alır. Takılı Running satırlarını requeue_stale_running Pending'e döndürür; bu, hooks.py'deki drain_due zamanlayıcısına bağlıdır. _settle_escaped_row hatalı satırı attempt/max_attempts sınırına kadar yeniden dener. TimestampMismatchError olursa adım bir kez daha denenir. Her adımın kendi savepoint ve geri alması var. Ardışık hatalarda devre kesici akışı devre dışı bırakır. (4) Çift yan etki koruması: işlemsel olmayan adım çalışmadan önce mark_effects_delivered Redis'e 24 saat TTL'li bir işaret yazar. İşaretli satır baştan tekrar oynatılmaz, Failed yapılır. Run ve adım durumları kalıcıdır. Suite'teki 'compensation' eşleşmeleri motordan ayrı ve alana özgüdür (suite/drive/webdav/put.py _Compensation yalnız dosya yükleme telafisidir). Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Telafi adımı yok: compensation/undo adım türü, hatada ters sırada geri alma ve telafi sonucu ile sahibinin kaydı motor kodunda bulunmadı (yalnız DB savepoint geri alması var; dış yan etki geri alınmıyor).
- Dış yan etkiler için uçtan uca idempotency anahtarı yok: webhook isteğine idempotency anahtarı eklenmiyor. Çift çalışma koruması yalnızca 24 saat TTL'li Redis işaretine dayanıyor; TTL dolarsa veya Redis kaybolursa koruma ortadan kalkar.
- Yan etkisi teslim edilmiş başarısız bir run'ı Failed adımdan güvenle sürdürecek bir yeniden başlatma API'si yok. api.py yalnız run_manually ve trial_run içeriyor; bunlar yeni run başlatır.
- Wait adımının kendi için bir üst süre veya iptal politikası yok (WaitForEvent dışında). Bekleyen run'ı iptal edecek API de bulunmadı.
- planlanan Frappe adaptörü ile Automation Run/Wait/timeout durumunu React/AntDesign istemcisine açan bir sözleşme yok.

Nasıl tamamlanır: Yeni motor yazmadan, mevcut automation_engine üzerinde şu sırayla ilerle: 1) process-step--implementation-scale kapsamında mevcut Wait/WaitForEvent/resume/effects-mark davranışını kanıtlayan dar bir RED/GREEN testi seç (mevcut test_runner/test_drainer testlerini oku, yeniden kullan). 2) Webhook eylemine run+step_key'den türetilen deterministik bir idempotency başlığı ekle; dayanıklılık için kalıcı effects kaydını Redis TTL yerine queue/run satırında tut. 3) Ancak bundan sonra telafi adımını tasarla: adım snapshot'ına compensation alanı ekle, hatada ters sırada çalıştır ve sonucu Automation Run Step'e Compensated/Failed olarak sahibiyle yaz. 4) En son planlanan Frappe adaptörü'a salt okunur bir run-durum sözleşmesi ekle. Mevcut bağımlılıklar (process-definition--contract, outbox--contract, audit-envelope--contract) korunur.

Kaynak dayanakları: `frappe/frappe/automation_engine/runner.py:242`; `frappe/frappe/automation_engine/events.py:68`; `frappe/frappe/automation_engine/drainer.py:319`; `frappe/frappe/automation_engine/drainer.py:171`; `frappe/frappe/automation_engine/runner.py:388`; `frappe/frappe/hooks.py:262`.

Rehber: [process-definition](./frappe-roadmap-contracts/process-definition.json). Mevcut birincil görev: `process-definition--implementation-scale`.

### workflow-7 — Durum geçişinin ilgili iş modülünün kurallarıyla doğrulanması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

apply_workflow alanı Document üzerinden set ediyor. Save/submit çağrısı kesitin dışında kalıyor, bu yüzden controller doğrulamasına ulaştığı burada kanıtlanamıyor. Koşullar safe_eval ile değerlendiriliyor. Suite'te frappe.db.set_value kullanımı, controller'ı atlayan doğrudan yazım yolları olduğunu gösteriyor. Talimat, durum alanının bu yollarla değiştirilmesini yasaklamıyor.

Eksik:

- Durum alanının yalnızca apply_workflow ile değişeceği kuralı yok; db.set_value ve job yollarının yasaklanması yazılmamış.
- Modüle özel geçiş kurallarının nereye yazılacağı (controller validate, transition condition ya da hook) belirlenmemiş.
- apply_workflow'un save/submit kısmı v17 kaynağında doğrulanmamış (kesit kısmi).
- ERPNext/HRMS kurulu değil; modül kuralları için yalnızca Frappe ve Suite controller'ları kapsamda.

Nasıl tamamlanır: native-workflow--implementation görevine şunları ekle: durum alanını değiştirmenin tek yolu apply_workflow'tur; doğrulamalar controller validate içinde yapılır; ignore_permissions ve db.set_value bu yolda yasaktır. apply_workflow'un 181. satırdan sonraki kısmını kaynakta oku.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:100`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `frappe/frappe/api/v2.py:267`.

Rehber: [native-workflow](./frappe-roadmap-contracts/native-workflow.json). Mevcut birincil görev: `native-workflow--implementation`.

### rules-1 — ECA (Event–Condition–Action — olay–koşul–eylem) kural motoru.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var, ancak 'seçilen release' v17.0.0-dev (adf1fd0c) ile eşlenmemiş. Yerel kaynakta Notification DocType olay+koşul+eylem üçlüsünü sunuyor; eylem tarafı yalnız bildirim kanallarıyla sınırlı. Server Script ise doc event bağlamında commit/rollback kısıtıyla çalışıyor. Beta Automation Flow bu alıntılarda görünmüyor; yerelde var olup olmadığı bilinmiyor. Aynı kaynak snapshot’ındaki çapraz sözleşme uzlaştırması: Automation Flow/automation_engine trigger, action, execution identity, permission ve depth/queue parçaları mevcut; Notification tek dayanak değildir. Ürün projection/policy/UX kabulü uygulanmadı.

Eksik:

- Automation Flow'un yerel v17 kaynakta bulunup bulunmadığı ve dosya yolu doğrulanmamış; belge URL'si release kanıtı sayılmaz
- 'Commit sonrası çalışma' için mekanizma tanımlı değil (after-commit enqueue mi, scheduler mı?)
- Server Script'in varsayılan olarak kapalı olduğu (common_site_config ile açılıyor) ve bunun SaaS'ta açılıp açılmayacağı kararı yok
- Notification + Server Script ile app tabanlı motor arasındaki seçim ölçütü ve GenUI kayıtlarından ayrım sınırı yazılmamış

Nasıl tamamlanır: automation-rule--contract içinde kanonik AutomationRule birimini mevcut Automation Flow/automation_engine alan ve akışlarına eşle. Yeni motor, kuyruk veya aynı amaçlı DocType kopyalama; yalnız kanıtlanan ürün projection/policy eksiğini dar gelecek adımlarla tanımla. Öncelik, kota ve trial yan etkisizlik sınırı kullanıcı kararı/hedef sürüm kanıtı gerektirir.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.py:43`; `frappe/frappe/email/doctype/notification/notification.py:41`; `frappe/frappe/utils/safe_exec.py:88`; `frappe/frappe/utils/safe_exec.py:115`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:128`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:14`; `frappe/frappe/automation_engine/dispatch.py:49`; `frappe/frappe/automation_engine/dispatch.py:50`; `frappe/frappe/automation_engine/runner.py:63`; `frappe/frappe/automation_engine/runner.py:380`; `frappe/frappe/automation_engine/api.py:267`; `frappe/frappe/automation_engine/queue.py:35`.

Rehber: [automation-rule](./frappe-roadmap-contracts/automation-rule.json). Mevcut birincil görev: `automation-rule--implementation`.

### rules-2 — Koşul/eylem kataloğu; gruplama, öncelik ve kapsam.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (deterministik sıra, izin dışı eylemin kataloğa girmemesi) anlamlı. Ancak katalog sözleşmesi, öncelik alanı ve kapsam (tenant/DocType/rol) tanımlı değil. Yerelde koşul türleri (Python/Filters) ve sabit kanal listesi var; gruplama ve öncelik primitive'i bu alıntılarda görünmüyor. Aynı kaynak snapshot’ındaki çapraz sözleşme uzlaştırması: Automation Flow/automation_engine trigger, action, execution identity, permission ve depth/queue parçaları mevcut; Notification tek dayanak değildir. Ürün projection/policy/UX kabulü uygulanmadı.

Eksik:

- Eşit öncelikte bağı bozacak deterministik sıralama anahtarı tanımsız
- Katalogdaki her eylemin hangi whitelisted metoda ve has_permission ptype'ına bağlanacağı belirtilmemiş
- Kapsam boyutları (site, DocType, rol, kullanıcı) ve GenUI capability registry'den ayrım sınırı yazılmamış
- Python koşul türünün (safe_eval) kullanıcıya açılıp açılmayacağı, yoksa yalnız Filters mı kullanılacağı belirsiz

Nasıl tamamlanır: automation-rule--contract içinde kanonik AutomationRule birimini mevcut Automation Flow/automation_engine alan ve akışlarına eşle. Yeni motor, kuyruk veya aynı amaçlı DocType kopyalama; yalnız kanıtlanan ürün projection/policy eksiğini dar gelecek adımlarla tanımla. Öncelik, kota ve trial yan etkisizlik sınırı kullanıcı kararı/hedef sürüm kanıtı gerektirir.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.py:107`; `frappe/frappe/permissions.py:82`; `frappe/frappe/api/v2.py:68`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:128`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:14`; `frappe/frappe/automation_engine/dispatch.py:49`; `frappe/frappe/automation_engine/dispatch.py:50`; `frappe/frappe/automation_engine/runner.py:63`; `frappe/frappe/automation_engine/runner.py:380`; `frappe/frappe/automation_engine/api.py:267`; `frappe/frappe/automation_engine/queue.py:35`.

Rehber: [automation-rule](./frappe-roadmap-contracts/automation-rule.json). Mevcut birincil görev: `automation-rule--implementation`.

### rules-3 — Kural çakışması, döngü ve tekrar tetikleme koruması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni ölçülebilir bir hedef koyuyor (sınırlı zincir, yinelenen olayda ikinci dış etki yok). Fakat derinlik sınırı, idempotency anahtarı ve bunun sorumlusu tanımsız. Yerelde yalnız dağınık primitive'ler var: safe_exec iç içe sayaç bayrağı, doc event'te commit kısıtı ve Drive'a özel exists tabanlı tekilleştirme. Genel döngü veya çakışma koruması alıntılarda görünmüyor. Aynı kaynak snapshot’ındaki çapraz sözleşme uzlaştırması: Automation Flow/automation_engine trigger, action, execution identity, permission ve depth/queue parçaları mevcut; Notification tek dayanak değildir. Ürün projection/policy/UX kabulü uygulanmadı.

Eksik:

- Zincirleme tetiklemede derinlik limiti ve aşıldığında ne olacağı (hata mı, sessiz durma mı) tanımsız
- Dış etkiler (webhook/e-posta) için idempotency anahtarının bileşimi belirtilmemiş
- in_safe_exec bir yeniden giriş sayacı; döngü koruması sayılamaz. Bu ayrım talimatlarda yok
- Drive tekilleştirmesi app'e özel; genel motor için yeniden kullanılabilirliği değerlendirilmemiş

Nasıl tamamlanır: automation-rule--contract içinde kanonik AutomationRule birimini mevcut Automation Flow/automation_engine alan ve akışlarına eşle. Yeni motor, kuyruk veya aynı amaçlı DocType kopyalama; yalnız kanıtlanan ürün projection/policy eksiğini dar gelecek adımlarla tanımla. Öncelik, kota ve trial yan etkisizlik sınırı kullanıcı kararı/hedef sürüm kanıtı gerektirir.

Kaynak dayanakları: `frappe/frappe/utils/safe_exec.py:168`; `frappe/frappe/utils/safe_exec.py:116`; `suite/suite/drive/api/notifications.py:124`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:128`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:14`; `frappe/frappe/automation_engine/dispatch.py:49`; `frappe/frappe/automation_engine/dispatch.py:50`; `frappe/frappe/automation_engine/runner.py:63`; `frappe/frappe/automation_engine/runner.py:380`; `frappe/frappe/automation_engine/api.py:267`; `frappe/frappe/automation_engine/queue.py:35`.

Rehber: [automation-rule](./frappe-roadmap-contracts/automation-rule.json). Mevcut birincil görev: `automation-rule--implementation`.

### rules-4 — Kuralları örnek veriyle deneme ve sonucu açıklama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni (kalıcı kayıt veya webhook etkisi bırakmama, adım bazında açıklama) net. Yerelde Notification için gönderim yapmayan önizleme metotları var: koşul sonucu, konu ve mesaj. Automation Flow'un rollback yapan Test Run özelliği alıntılarda görünmüyor. Headless deneme ekranı için API sözleşmesi tanımlı değil. Aynı kaynak snapshot’ındaki çapraz sözleşme uzlaştırması: Automation Flow/automation_engine trigger, action, execution identity, permission ve depth/queue parçaları mevcut; Notification tek dayanak değildir. Ürün projection/policy/UX kabulü uygulanmadı.

Eksik:

- preview_meets_condition yalnız Evet/Hayır veya hata metni döndürüyor; adım bazında yapılandırılmış açıklama şeması yok
- Dış etkilerin (webhook, e-posta kuyruğu) deneme sırasında nasıl bastırılacağı ve rollback garantisi yazılmamış
- Yerel v17'de Test Run'ın varlığı doğrulanmamış
- React/Ant Design deneme ekranı için endpoint ve yanıt sözleşmesi ile ui-family-38 bağımlılığı tanımsız

Nasıl tamamlanır: automation-rule--contract içinde kanonik AutomationRule birimini mevcut Automation Flow/automation_engine alan ve akışlarına eşle. Yeni motor, kuyruk veya aynı amaçlı DocType kopyalama; yalnız kanıtlanan ürün projection/policy eksiğini dar gelecek adımlarla tanımla. Öncelik, kota ve trial yan etkisizlik sınırı kullanıcı kararı/hedef sürüm kanıtı gerektirir.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.py:98`; `frappe/frappe/email/doctype/notification/notification.py:113`; `frappe/frappe/email/doctype/notification/notification.py:105`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:128`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:14`; `frappe/frappe/automation_engine/dispatch.py:49`; `frappe/frappe/automation_engine/dispatch.py:50`; `frappe/frappe/automation_engine/runner.py:63`; `frappe/frappe/automation_engine/runner.py:380`; `frappe/frappe/automation_engine/api.py:267`; `frappe/frappe/automation_engine/queue.py:35`.

Rehber: [automation-rule](./frappe-roadmap-contracts/automation-rule.json). Mevcut birincil görev: `automation-rule--implementation`.

### rules-5 — Kural sürümü, zaman aralığı, yetki sınırı ve çalışma kotası.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Değerlendirme absent/build ve kabul metni anlamlı. Ancak sürümün neyi kapsadığı, zaman aralığının saat dilimi semantiği ve kota birimi (çalışma/eylem/dış çağrı) tanımsız. Yerelde ilgili primitive'ler var ama bütüncül bir ürün yok: zamanlayıcı tabanlı olaylar ve son çalışma zamanı, en az 10 dakikalık scheduler aralığı, istek başına 200 kayıt sınırı ve rol tabanlı izin. Aynı kaynak snapshot’ındaki çapraz sözleşme uzlaştırması: Automation Flow/automation_engine trigger, action, execution identity, permission ve depth/queue parçaları mevcut; Notification tek dayanak değildir. Ürün projection/policy/UX kabulü uygulanmadı.

Eksik:

- Kural sürümünün izlenmesi için Frappe'nin yerleşik değişiklik takibinin (Version) kullanılıp kullanılmayacağı belirtilmemiş
- Zaman aralığı alanları ve zaman dışı durumda davranış (atla mı, ertele mi) tanımsız
- Kota birimi, süresi ve aşıldığında yan etkisiz durmanın nasıl kaydedileceği tanımsız
- Yetki sınırı için kural sahibi mi, tetikleyen kullanıcı mı esas alınacak, kararı yok

Nasıl tamamlanır: automation-rule--contract içinde kanonik AutomationRule birimini mevcut Automation Flow/automation_engine alan ve akışlarına eşle. Yeni motor, kuyruk veya aynı amaçlı DocType kopyalama; yalnız kanıtlanan ürün projection/policy eksiğini dar gelecek adımlarla tanımla. Öncelik, kota ve trial yan etkisizlik sınırı kullanıcı kararı/hedef sürüm kanıtı gerektirir.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.py:46`; `frappe/frappe/email/doctype/notification/notification.py:171`; `frappe/frappe/client.py:246`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:128`; `frappe/frappe/automation/doctype/automation_flow/automation_flow.py:14`; `frappe/frappe/automation_engine/dispatch.py:49`; `frappe/frappe/automation_engine/dispatch.py:50`; `frappe/frappe/automation_engine/runner.py:63`; `frappe/frappe/automation_engine/runner.py:380`; `frappe/frappe/automation_engine/api.py:267`; `frappe/frappe/automation_engine/queue.py:35`.

Rehber: [automation-rule](./frappe-roadmap-contracts/automation-rule.json). Mevcut birincil görev: `automation-rule--implementation`.

### approvals-1 — Onay sistemi, işlemsel doğrulama ve approval chain (onay zinciri).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel v17-dev kaynakta durum makinesi var: geçiş yalnız mevcut durumdan ve izinli rolle yapılabiliyor. Bu yüzden iki seviyeli sıralı onay, yapılandırılmış bir Workflow ile kendiliğinden sağlanıyor. apply_workflow whitelist'te olduğu için headless çağrılabilir. Talimatlar ise yalnız version-15 kaynaklarına ve kurulu olmayan ERPNext belgesine dayanıyor. Hedef DocType, headless eylem sözleşmesi ve kimlik/rol eşlemesi tanımlı değil.

Eksik:

- Kaynaklar version-15 ve ERPNext docs'a bağlı; yerel Frappe 17.0.0-dev (adf1fd0c) eşlemesi yok.
- Onay zincirinin hangi DocType'lara uygulanacağı (conditional scope) ve standart/custom DocType ayrımı belirtilmemiş.
- Yazma yolları envanteri yok: apply_workflow, imzalı e-posta bağlantısı (apply_action/confirm_action), genel REST save ve v2 execute_doc_method. 'API geçişi aynı kurala uymalı' kabulü bunları kapsamıyor.
- Keycloak kimliğinin Frappe Role/transition.allowed alanına nasıl eşleneceği tanımsız.
- Document.save içindeki workflow doğrulaması bu excerpt'te yok; genel save yolunun aynı kuralı uygulayıp uygulamadığı bilinmiyor.

Nasıl tamamlanır: approval-chain--implementation altında yerel model/workflow.py ve Document.save'in workflow doğrulamasını v17 kaynağından okuyun. Her yazma yolunu tek tabloda 'aynı kural mı uygulanıyor' sorusuyla eşleyin. Headless yüzey için yalnız get_transitions/apply_workflow'u sarmalayan, ignore_permissions kullanmayan bir sözleşme yazın.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:118`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:132`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:165`; `frappe/frappe/api/v1.py:61`.

Rehber: [approval-chain](./frappe-roadmap-contracts/approval-chain.json). Mevcut birincil görev: `approval-chain--implementation`.

### approvals-2 — Sıralı/paralel onay; kişi, rol, tutar ve koşul bazlı yönlendirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Tutar ve koşula göre yönlendirme yerel kaynakta mevcut: geçiş koşulu safe_eval ile değerlendiriliyor (doc.grand_total > 0 örneği). Rol bazlı sıralı yönlendirme de mevcut. Ancak geçişin izinli alanı yalnız Role'e bağlanıyor ve Workflow Action rol kümesi için oluşturuluyor. DocType başına tek aktif Workflow var. Bu yüzden kişi bazlı yönlendirme ve paralel onay sayısı (quorum) yerel kaynakta yok. Talimat paralel quorum için veri modeli ve karar kaydı tanımlamıyor.

Eksik:

- Paralel onay için karar sayacı, 'tümü/çoğunluk/N' kuralı ve bu kuralların saklanacağı yer tanımlı değil.
- Kişi bazlı onaycı için rol dışı atama kaynağı tanımsız: Workflow Action.user alanı mı, yeni bir DocType mı? ERPNext/HRMS hiyerarşisi kurulu değil.
- Koşul ifadelerinin kimin yazacağı ve hangi yetkiyle tanımlanacağı belirsiz. Yönetici dışında Python koşulu düzenlemeye izin verilmemesi gerektiği belirtilmemiş.
- Sıralı/paralel durumların tek aktif Workflow ile nasıl birleşeceği belirtilmemiş.

Nasıl tamamlanır: approval-step--implementation için paralel adımı yerel Workflow'u kopyalamadan tasarlayın. Workflow tek durum alanını korusun; quorum'u yalnız sunucuda tutulan bir karar kaydı kontrol etsin. Bunu bir transition koşuluna bağlayan minimal bir model belirleyin ve tutar eşiğini yerel condition alanıyla belgelendirin.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:100`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:57`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:114`; `frappe/frappe/model/workflow.py:37`.

Rehber: [approval-chain](./frappe-roadmap-contracts/approval-chain.json). Mevcut birincil görev: `approval-chain--implementation`.

### approvals-3 — Vekil onaylayıcı, süre aşımı ve üst yetkiliye yönlendirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yapı taşları var: açık/tamamlanmış Workflow Action kaydı, gizli user alanı ve transition_tasks/workflow_methods kancaları. Vekalet, süre aşımı ve üst yetkiliye yükseltme zinciri ise incelenen excerpt'lerde yok. Zamanlayıcı (scheduler) bu excerpt'te görünmüyor; bu durum yalnız 'görülmedi' anlamına geliyor. Kabul ölçütü var, fakat veri modeli, SLA tanımı ve 'üst yetkili' kaynağı belirtilmemiş.

Eksik:

- Vekalet kaydı tanımsız: kim, kimin yerine, hangi DocType/rol için, hangi tarih aralığında. Vekilin öz-onay kuralına takılıp takılmayacağı da belirsiz.
- Süre aşımının neye göre ölçüleceği tanımsız: Workflow Action oluşturma zamanı mı, durum giriş zamanı mı? İş günü/takvim kuralı yok.
- 'Üst yetkili' hiyerarşisinin kaynağı yok. HRMS/ERPNext (ör. reports_to) kurulu olmadığı için kullanılamaz.
- Yükseltmenin yetki kontrolü tanımsız: has_permission/rol üzerinden mi yapılacak? Yükseltmenin audit kaydı da belirtilmemiş.
- Yerel v17 scheduler hook sözleşmesi doğrulanmamış.

Nasıl tamamlanır: approval-chain--implementation kapsamında önce kapsam dışı sınırı yazın: HRMS olmadan hiyerarşi kaynağını belirleyin. Ardından vekalet ve SLA için minimal bir veri sözleşmesi tanımlayın. Yükseltme, Workflow Action'ın permitted_roles mantığını genişletmeli, atlamamalı. Scheduler kancasını yerel hooks/scheduler kaynağından doğrulayın.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:46`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:47`; `frappe/frappe/model/workflow.py:152`; `frappe/frappe/workflow/doctype/workflow/workflow.py:161`.

Rehber: [approval-chain](./frappe-roadmap-contracts/approval-chain.json). Mevcut birincil görev: `approval-chain--implementation`.

### approvals-4 — Reddetme, geri gönderme, geri çekme ve gerekçe kaydı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Ret ve geri gönderme, ayrı Workflow Action Master eylemleri ve geçişleri olarak yerel kaynakta modellenebiliyor. Her eylemin yetkisi ayrı bir transition rolüne bağlanabiliyor. Workflow Action, işlemi tamamlayan kullanıcıyı ve rolü saklıyor. Ancak apply_workflow imzası yalnız doc ve action alıyor; gerekçe parametresi yok. Geri çekme rol bazlı geçişlerle sınırlı; sahip (owner) bazlı izin yok. Talimat gerekçenin nerede ve hangi alanda tutulacağını tanımlamıyor.

Eksik:

- Gerekçenin saklanacağı yer tanımsız: Comment, ek alan veya karar kaydı. Hangi eylemlerde zorunlu olduğu da belirtilmemiş.
- Geri çekme yetkisi tanımsız: talep edene ait, ancak geçişler yalnız Role'e bağlanabiliyor.
- 'Geçmiş korunmalı' için hedef DocType'ta track_changes/Version kullanımı belirtilmemiş. Excerpt'teki track_changes yalnız Workflow DocType'ının kendisine ait.
- Gerekçe kontrolünün headless API'de sunucu tarafında yapılması gerektiği yazılmamış; şu haliyle yalnız UI'da zorunlu tutulabilir.

Nasıl tamamlanır: approval-decision--implementation için gerekçenin kalıcı alanını ve hangi eylemlerde zorunlu olduğunu belirleyin. Bu zorunluluğu apply_workflow'u çağıran sunucu tarafı sarmalayıcıda reddedilecek biçimde tanımlayın. Geri çekmeyi talep eden ile sahip (owner) ilişkisine bağlayan politikayı yazın.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:119`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:38`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:41`; `frappe/frappe/workflow/doctype/workflow/workflow.json:140`.

Rehber: [approval-decision](./frappe-roadmap-contracts/approval-decision.json). Mevcut birincil görev: `approval-decision--implementation`.

### approvals-5 — Onay beklerken kayıt değişikliği ve yeniden onay gereksinimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynak durum bazında düzenleme yetkisini 'Only Allow Edit For' rolüyle sınırlıyor. E-posta onay bağlantısı, belge değiştiyse yalnız uyarı gösteriyor (last_modified ile modified karşılaştırması). Kritik alan değiştiğinde eski kararı geçersiz kılan veya durumu geri alan bir mekanizma görülmedi. Talimat 'sürüme bağlanmalı' diyor, fakat kritik alan listesini, sürüm kaynağını ve geri dönülecek durumu tanımlamıyor.

Eksik:

- DocType başına kritik alan listesi ve bu listenin nerede tutulacağı tanımsız.
- Kararın bağlanacağı sürüm tanımsız: modified, Version kaydı veya içerik hash'i olabilir.
- Geçersiz kılmada hangi Workflow durumuna dönüleceği ve açık Workflow Action'ların ne olacağı belirtilmemiş.
- apply_action yalnız uyarı veriyor; confirm_action yolu eski kararı reddetmiyor. Bu fark kabul ölçütünde yok.

Nasıl tamamlanır: approval-chain--implementation altında kararın bağlanacağı sürüm anahtarını ve kritik alan kümesini tanımlayın. Kayıt sırasında kritik alan değişirse onayın sıfırlanması kuralını yerel durum alanı ve allow_edit ile uyumlu biçimde belirleyin. Değişikliği sessizce uygulamak yerine yeniden onay durumuna açıkça geçin.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow_document_state/workflow_document_state.json:64`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:150`; `frappe/frappe/workflow/doctype/workflow_action/workflow_action.py:153`.

Rehber: [approval-chain](./frappe-roadmap-contracts/approval-chain.json). Mevcut birincil görev: `approval-chain--implementation`.

### approvals-6 — Talep edenin kendi işlemini onaylamasını sınırlama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta allow_self_approval alanı var. apply_workflow, has_approval_access başarısız olursa 'Self approval is not allowed' hatası veriyor. E-posta onay yolu da apply_workflow üzerinden geçiyor. Ancak alanın varsayılan değeri 1, yani öz-onay varsayılan olarak açık. has_approval_access'in yerel v17 gövdesi excerpt'te yok; owner karşılaştırması ve Administrator istisnası yalnız v15 notuna dayanıyor. has_permission Administrator'a her zaman izin veriyor. Kabul ölçütü güçlü; ancak 'talep eden' alanı tanımsız ve v17 eşlemesi eksik.

Eksik:

- has_approval_access yerel v17'de doğrulanmamış; v15 notu esas alınmış.
- Varsayılan allow_self_approval=1; her geçişte 0 yapılması talimatta zorunlu tutulmamış.
- 'Talep eden'i owner'dan ayıran alan veya kaynak tanımsız.
- Genel REST/save (v1 update_doc, client.save) ve toplu geçiş yollarının öz-onay kontrolünü çağırıp çağırmadığı excerpt'te görünmüyor.
- Administrator ve servis hesabı istisnaları için hangi audit kaydının tutulacağı belirtilmemiş.

Nasıl tamamlanır: approval-chain--implementation için yerel model/workflow.py içindeki has_approval_access ve toplu onay fonksiyonlarını okuyun. Öz-onay kontrolünü talep eden alanına genişletecek tek bir sunucu tarafı kontrol noktası belirleyin. Workflow tanımlarında allow_self_approval=0'ı politika olarak zorunlu kılın.

Kaynak dayanakları: `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:64`; `frappe/frappe/workflow/doctype/workflow_transition/workflow_transition.json:65`; `frappe/frappe/model/workflow.py:136`; `frappe/frappe/model/workflow.py:137`; `frappe/frappe/permissions.py:109`.

Rehber: [approval-chain](./frappe-roadmap-contracts/approval-chain.json). Mevcut birincil görev: `approval-chain--implementation`.

### email-1 — Transactional email (işlemsel e-posta) ve sistem e-posta şablonları.

Kaynak durumu: **VAR**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel v17-dev kaynağında Email Queue durum modeli, zamanlanmış flush, yeniden deneme ve Jinja doğrulamalı Email Template doğrudan mevcut. Talimatın hedefi ve kabul ölçütü (kuyruk, hata, yeniden deneme) anlamlı. Ancak kaynak bağlantıları version-15'i gösteriyor ve ürün şablon kataloğu tanımlı değil.

Eksik:

- Kaynak referansları version-15; yerel 17.0.0.dev0 yollarıyla eşleme yapılmamış
- Ürüne ait sistem şablonlarının adı, sahibi ve hangi Email Account ile gönderileceği listelenmemiş
- Headless istemcinin kuyruk durumunu ve hatayı hangi izinli uç ile okuyacağı tanımsız; Desk liste eylemi headless sözleşme değildir
- Tenant başına gönderen hesabı eşlemesi yok

Nasıl tamamlanır: email-template--implementation kapsamında kaynak bağlantılarını yerel v17 dosyalarına çevirin. Şablon kataloğunu (ad, değişken, gönderen hesap) tek tabloda tanımlayın. Durum ve hata bilgisi için yalnız DocType izinleriyle okunan Email Queue erişimini sözleşme olarak yazın.

Kaynak dayanakları: `frappe/frappe/email/doctype/email_queue/email_queue.py:77`; `frappe/frappe/email/queue.py:185`; `frappe/frappe/email/queue.py:206`; `frappe/frappe/email/doctype/email_template/email_template.py:36`; `frappe/frappe/email/doctype/email_queue/email_queue_list.js:47`.

Rehber: [email-template](./frappe-roadmap-contracts/email-template.json). Mevcut birincil görev: `email-template--implementation`.

### email-2 — Giriş, kayıt, magic link, doğrulama ve parola kurtarma e-posta senaryoları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe kendi kimlik e-postalarını uyguluyor. Magic link: frappe/frappe/www/login.py içindeki send_login_link süreli ve tek kullanımlık bir anahtar üretiyor (one_time_login_key, cache'te tutuluyor), login_with_email_link şablonuyla e-posta gönderiyor ve hız sınırı uyguluyor. login_via_key anahtarı kullanınca siliyor ve oturumu açıyor. Kayıt ve doğrulama: user.py içindeki sign_up bir Website User oluşturuyor. send_welcome_mail_to_user, new_user şablonuyla /update-password bağlantısını gönderiyor. Parola kurtarma: reset_password, kullanıcının var olup olmadığını sızdırmayan genel bir yanıt veriyor. _reset_password hash'lenmiş anahtarı ve password_reset e-postasını üretiyor. Keycloak: Social Login Key'de hazır bir OIDC sağlayıcı şablonu var (login_via_keycloak redirect). Bu yalnızca Frappe tarafında OIDC girişi sağlıyor; Keycloak tarafındaki e-postaları yönetmiyor. Drive'da OTP ile signup/login (drive/api/product.py) ve davet e-postası var. Auth e-postası veya Keycloak sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Gereksinimin hedefi olan Keycloak tarafındaki e-postalar (realm, e-posta teması/dil/marka, SMTP, verify-email ve reset-credentials required action'ları) bu kaynakta yok; kaynak bunları kanıtlayamaz.
- Keycloak magic link kararı ve sürümü (yerleşik özellik mi, eklenti mi) kaynakta veya talimatta karara bağlanmamış.
- Frappe yerel akışlarını (send_login_link/login_via_key, sign_up, reset_password, /update-password) ürün yolunda kapatan veya Keycloak'a yönlendiren bir hook, website_redirects ya da ayar yok.
- Suite Mail (signup/OTP/send_reset_password_link) ve Drive (OTP signup/login) yerel kimlik akışlarını Keycloak'a bağlayan veya devre dışı bırakan bir entegrasyon yok. Suite hooks ALLOWED_PATHS listesi /api/method/login ve frappe.core.doctype.user.user.update_password yollarını açık tutuyor.
- Headless provider'da kimlik e-postası veya IdP sınırını tanımlayan bir sözleşme yok (örneğin yerel auth rotalarının devre dışı olduğunu bildiren bir capability).
- Runtime functionalAcceptance: not_run.

Nasıl tamamlanır: keycloak-login--contract kapsamında önce şu karar yazılmalı: Keycloak sürümü ve magic link yöntemi; e-posta tema/SMTP sahibi (email-3 ile ilişkisi). Sonra keycloak-login--implementation-mvp içinde en küçük adım şu: Frappe'de Keycloak Social Login Key'i (mevcut provider şablonu) etkinleştiren ayarı tanımla. Ardından yerel auth yüzeyini daraltan tek bir davranışı RED/GREEN ile ekle: System Settings login_with_email_link=0 olsun, Website Settings disable_signup=1 olsun, Mail Settings allow_signup=0 olsun; /login, /signup ve /update-password ile Suite Mail signup/reset istekleri Keycloak'a yönlendirilsin ya da reddedilsin. Doğrulama ve kurtarma e-postaları Keycloak required action'larıyla sağlanmalı. React/AntD istemcisi Suite'in Vue rotalarını değil Keycloak OIDC akışını kullanmalı.

Kaynak dayanakları: `frappe/frappe/www/login.py:137`; `frappe/frappe/core/doctype/user/user.py:1254`; `frappe/frappe/core/doctype/user/user.py:518`; `frappe/frappe/integrations/doctype/social_login_key/social_login_key.py:238`; `suite/suite/mail/api/account.py:54`; `suite/suite/mail/api/account.py:417`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation-mvp`.

### email-3 — Mailgun adaptörü ve Postfix sunucu bağlantısı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

SMTP/TLS/SSL bağlantısı ve servis ön ayarları yerelde var; Postfix ve Mailgun SMTP buna dayanabilir. HTTP adaptörü için override_email_send hook noktası mevcut. Talimat Mailgun'ın SMTP ile mi HTTP API ile mi bağlanacağını ve hangi uzantı noktasının kullanılacağını belirtmiyor.

Eksik:

- Mailgun SMTP ile HTTP API arasında seçim yapılmamış
- HTTP yolu için override_email_send hook sözleşmesi ve v17 imzası doğrulanmamış
- Sağlayıcı hatasının hangi kayda (Email Queue error / Error Log) işleneceği tanımsız
- Suite Mail (JMAP posta kutusu ürünü) ile işlemsel gönderim hattının ayrımı yazılmamış
- Sağlayıcı kimlik bilgilerinin nerede tutulacağı (kaynak dışı) belirtilmemiş

Nasıl tamamlanır: İlk adımda kod yazmadan Email Account SMTP ile Postfix/Mailgun bağlantısını seçin. HTTP adaptörü yalnız webhook veya özellik ihtiyacı kanıtlanırsa override_email_send hook'u üzerinden planlanmalı; öncesinde v17 kaynağında hook imzası doğrulanmalı.

Kaynak dayanakları: `frappe/frappe/email/smtp.py:74`; `frappe/frappe/email/doctype/email_queue/email_queue.py:246`; `frappe/frappe/email/doctype/email_account/email_account.py:161`.

Rehber: [email-provider](./frappe-roadmap-contracts/email-provider.json). Mevcut birincil görev: `email-provider--implementation`.

### email-4 — Ödeme, fatura, onay, güvenlik ve destek e-posta senaryoları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Email Queue referans belge alanlarını, Email Template de DocType bazlı hesap eşlemesini destekliyor. Notification kaynağı bu excerpt'te yok. ERPNext kurulu olmadığı için ödeme/fatura DocType'ları yerelde yok. Tekrar olayda çift e-postayı önleyen bir mekanizma kaynakta görülmüyor.

Eksik:

- Her senaryo için olayı üreten ürün DocType'ı ve olay adı listelenmemiş (ERPNext yok, ödeme/fatura ürün modülünden gelmeli)
- Çift gönderimi önleyecek idempotency anahtarı (ör. referans belge + olay) tanımsız
- Tenant ve alıcı yetkisinin nasıl belirleneceği yazılmamış
- Notification DocType'ın v17 kaynağı incelenmemiş
- Destekleyici ui-family-24 görevinin rolü açıklanmamış

Nasıl tamamlanır: email-template--implementation altında senaryo başına olay kaynağı, alıcı kuralı ve dedup anahtarı tablosunu yazın. Uygulamadan önce v17 Notification kaynağını okuyup yerel koşullu bildirimin yeterli olup olmadığını belirleyin.

Kaynak dayanakları: `frappe/frappe/email/doctype/email_queue/email_queue.py:71`; `frappe/frappe/email/doctype/email_template/email_template.py:63`.

Rehber: [email-template](./frappe-roadmap-contracts/email-template.json). Mevcut birincil görev: `email-template--implementation`.

### email-5 — Şablon değişkeni denetimi, önizleme, dil ve marka sürümleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Email Template yalnız Jinja sözdizimini doğruluyor. İzin denetimli get_email_template, önizleme için yeniden kullanılabilir bir parça. Şemada dil, marka veya zorunlu değişken alanı yok.

Eksik:

- Zorunlu değişken şemasının nerede tanımlanacağı ve gönderim öncesi nasıl uygulanacağı belirtilmemiş
- Dil/marka sürümünün Custom Field ile mi, şablon adlandırmasıyla mı modelleneceği kararı yok
- Önizleme ile gönderimin aynı render yolunu kullanacağı garantisi tanımsız
- Eksik değişkende Jinja davranışı (sessiz boş çıktı) doğrulanmamış

Nasıl tamamlanır: Dil ve marka için Email Template üzerinde yerel Custom Field kullanımına karar verin. Önizleme için get_email_template'i tek render yolu olarak sabitleyin. Zorunlu değişken kontrolünü gönderim sarmalayıcısında tanımlayın.

Kaynak dayanakları: `frappe/frappe/email/doctype/email_template/email_template.py:35`; `frappe/frappe/email/doctype/email_template/email_template.py:73`; `frappe/frappe/email/doctype/email_template/email_template.py:77`.

Rehber: [email-template](./frappe-roadmap-contracts/email-template.json). Mevcut birincil görev: `email-template--implementation`.

### email-6 — Gönderen alan adı doğrulama; imza ve teslim edilebilirlik ayarları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Email Account gönderen, başlık ve DSN ayarlarını sağlıyor. SPF/DKIM/DMARC işi sağlayıcıya ve DNS'e ait. Suite Mail'in DMARC/TLS rapor sayfaları posta kutusu ürününe ait; işlemsel gönderen doğrulamasının kanıtı sayılmaz. Görev sahipleri genel ekip adlarıyla yazılmış.

Eksik:

- Kayıt hazırlama, DNS'te uygulama ve sonucu doğrulama adımları sahipleriyle ayrı ayrı yazılmamış
- Test iletisinin SPF/DKIM/DMARC sonucunun nereye kaydedileceği tanımsız
- Gönderen alan adı, alt alan ve DMARC politika kararı yok

Nasıl tamamlanır: email-domain--implementation görevine şunları yazın: sağlayıcının istediği DNS kayıt listesi, uygulayıcı, doğrulayıcı ve kabul kanıtı (test iletisinin başlık sonucu). Kod değişikliği gerekmez.

Kaynak dayanakları: `frappe/frappe/email/email_body.py:291`; `frappe/frappe/email/doctype/email_account/email_account.py:307`; `suite/frontend/src/apps/mail/routes.test.ts:43`.

Rehber: [email-domain](./frappe-roadmap-contracts/email-domain.json). Mevcut birincil görev: `email-domain--implementation`.

### email-7 — Geri dönen ileti, spam şikâyeti ve gönderim engelleme listesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerelde DSN NOTIFY seçenekleri, referans belge bazlı Email Unsubscribe ve gelen kutusu Email Rule spam işareti var. Ancak yeniden deneme mantığı bir baskılama listesine bakmıyor. Hard bounce veya şikâyete dayalı global alıcı baskılama da kaynakta görülmüyor.

Eksik:

- Baskılama kaydının nerede tutulacağı tanımsız (Email Unsubscribe referans bazlı, global değil)
- Sağlayıcı webhook'unun imza doğrulaması ve alıcı eşlemesi tanımsız
- retry_sending_emails ve gönderim öncesi baskılama kontrolünün nereye bağlanacağı yazılmamış
- ignore_permissions kullanan inbox yardımcıları headless yüzeye açılmamalı; bu sınır belirtilmemiş

Nasıl tamamlanır: email-provider--implementation görevine baskılama deposu kararını, imzalı webhook girişini ve gönderim öncesi kontrol noktasını (override hook veya kuyruk oluşturma) tek sözleşme olarak yazın.

Kaynak dayanakları: `frappe/frappe/email/queue.py:105`; `frappe/frappe/email/doctype/email_queue/email_queue.py:233`; `frappe/frappe/email/queue.py:198`; `frappe/frappe/email/inbox.py:123`.

Rehber: [email-provider](./frappe-roadmap-contracts/email-provider.json). Mevcut birincil görev: `email-provider--implementation`.

### realtime-1 — WebSocket (çift yönlü canlı bağlantı) ile güncellemeler.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü belli; Socket.IO ile düz WebSocket'in uyumsuz olduğu da doğru not edilmiş. Yereldeki v17-dev realtime katmanı Python Socket.IO sunucusu ve httpx tabanlı connect/auth yolu kullanıyor. Suite de doctype/docname odaklı publish_realtime çağırıyor. Ancak talimat v15 dönemi belgelerine dayanıyor; v17 handshake/auth sözleşmesine eşlenmemiş. Keycloak kimliğinin socket bağlantısına nasıl taşınacağı da tanımlı değil.

Eksik:

- v17-dev realtime sunucusunun (python-socketio/uvicorn) auth yolu ile belgelerdeki sürüm arasında eşleme yok
- Keycloak token → Frappe oturumu → socket handshake bağı tanımsız; mevcut istemci yolları cookie/sid kullanıyor (withCredentials, sid)
- Tauri2/WXT gibi cookie'siz kökenler için bağlantı kimliği tanımsız
- Olay adı/oda (doc, doctype, user) sözleşmesi ve after_commit kuralı yazılmamış
- frappe/realtime.py kaynağı bu pakette görülmedi; can_subscribe_doc yalnız hooks listesinde isim olarak geçiyor

Nasıl tamamlanır: websocket-api--implementation altında v17 frappe realtime modülünü (can_subscribe_doc/doctype, get_user_info) okuyup tek sayfalık bağlantı sözleşmesi yazın: auth taşıyıcısı, oda adları, izin kontrol noktası. Keycloak eşlemesini o sözleşmeye bağlayın, yeni protokol adaptörü açmayın.

Kaynak dayanakları: `frappe/pyproject.toml:94`; `frappe/pyproject.toml:102`; `suite/suite/hooks.py:411`; `suite/suite/meet/doctype/meet_room/meet_room.py:188`; `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:62`.

Rehber: [websocket-api](./frappe-roadmap-contracts/websocket-api.json). Mevcut birincil görev: `websocket-api--implementation`.

### realtime-2 — SSE (Server-Sent Events — sunucudan gönderilen olaylar) ile canlı iletim.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de canlı iletim için somut bir temel parça var. frappe/frappe/realtime/**init**.py içindeki publish_realtime olayı user/doctype/doc/task/site odasına göre yönlendiriyor. after_commit seçeneğiyle olay, transaction commit edildikten sonra gönderilecek şekilde ertelenebiliyor; rollback olursa atılıyor. emit_via_redis olayları Redis 'events' kanalına site namespace'iyle yayımlıyor. frappe/realtime/index.js de bu kanala abone olan Node Socket.IO sunucusu ve olayları odalara emit ediyor. Ancak taşıma yalnız Socket.IO (WebSocket/long-poll). Suite'te 'eventSourceUrl' yalnız harici bir JMAP sunucusunun session URL'sinin Redis'te önbelleklenmesi; bu bir SSE sunucusu ya da tüketicisi değil. direct_passthrough kullanımları dosya/WebDAV akışı; SSE değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Her iki app kökünde de (derlenmiş dist/public/frontend bundle'ları hariç) 'text/event-stream' yanıtı veren bir SSE endpoint'i ve id/event/retry çerçevelemesi bulunamadı
- Last-Event-ID ile kaldığı yerden devam ve kalıcı, sıra numaralı olay günlüğü yok; Redis pub/sub geçici, replay yok
- SSE heartbeat/yorum satırı ile X-Accel-Buffering/proxy buffering ve timeout ayarı yok
- EventSource başlık gönderemediği için gereken Keycloak cookie veya kısa ömürlü bilet ile kimlik doğrulama ve SSE için oda/izin denetimi yok
- Headless provider'da SSE sözleşmesi yok; Suite Vue frontend'inde EventSource tüketicisi yok
- SSE'nin hangi tüketici için gerektiğine dair karar (ör. WXT MV3) kaynakta yok

Nasıl tamamlanır: Sıra şöyle olmalı. 1) sse-api--contract: SSE'yi yalnız Socket.IO kullanamayan somut bir tüketici için açan bir karar kaydı yazılmalı. Bu kayıt kimliği (cookie ya da kısa ömürlü bilet), heartbeat aralığını, proxy buffering ayarını ve Last-Event-ID'nin realtime-3 cursor/outbox sıra numarasına bağlanmasını tanımlamalı. 2) Ayrı bir olay deposu kurulmamalı. Olaylar mevcut publish_realtime/emit_via_redis 'events' akışından ve outbox--contract sıra kaynağından okunmalı. 3) Sonra tek bir dar SSE endpoint'i yazılmalı: kimliği doğrulanmış tek kullanıcı odası, heartbeat ve Last-Event-ID ile replay. Bu adım RED/GREEN testle kanıtlanmalı.

Kaynak dayanakları: `frappe/frappe/realtime/__init__.py:30`; `frappe/frappe/realtime/__init__.py:83`; `frappe/frappe/realtime/__init__.py:118`; `frappe/realtime/index.js:1`; `frappe/realtime/index.js:81`; `suite/suite/mail/jmap.py:689`.

Rehber: [sse-api](./frappe-roadmap-contracts/sse-api.json). Mevcut birincil görev: `sse-api--implementation`.

### realtime-3 — Bağlantı yetkisi, yeniden bağlanma ve kaçırılan olayları tamamlama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta yeniden bağlanma denemesi ve sınırlı retry deseni var. Suite ise Frappe realtime relay'inde replay/resync olmadığını kendi kodunda açıkça belirtiyor. Bağlantı izni yalnız bağlantı anında kontrol ediliyor. Talimattaki 'deneysel handlerlar' ifadesi hiçbir sürüm/handler adına bağlanmamış.

Eksik:

- Sıra numarası/cursor'un kaynağı (kalıcı günlük mü, REST yeniden okuma mı) tanımsız
- İzin iptalinde açık aboneliğin nasıl düşürüleceği tanımsız; mevcut desen yalnız connect anında has_permission kontrol ediyor
- 'Deneysel handlerlar' için v17 adı/sürümü yok
- Keycloak token yenilemesinin socket oturumuna yansıması tanımsız

Nasıl tamamlanır: En küçük adım: realtime'ı yalnız 'invalidation' sinyali saymak. Reconnect sonrası TanStack Query, /api/v2 kaynaklarını yeniden okusun (modified/cursor). İzin iptalini v17 can_subscribe_* yeniden kontrolüne bağlayan sözleşmeyi websocket-api--implementation'a ekleyin.

Kaynak dayanakları: `suite/frontend/src/apps/sheets/collab/hocuspocus-client.js:8`; `suite/frontend/src/apps/sheets/collab/frappe-realtime-init.js:63`; `suite/frontend/src/apps/meet/composables/useGuestRealtime.ts:28`; `suite/suite/sheets/collab.py:54`.

Rehber: [websocket-api](./frappe-roadmap-contracts/websocket-api.json). Mevcut birincil görev: `websocket-api--implementation`.

### realtime-4 — Kayıt üzerinde ekip yorumları, bahsetme ve takip etme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe çekirdeğinde şunlar var. (1) Whitelist'li add_comment ve update_comment uçları: add_comment, referans kayıtta check_permission=True ile okuma izni ister; update_comment yalnız yorum sahibine veya Administrator'a izin verir. (2) Comment controller'ı hooks.py içinde kayıtlıdır (138 ve 173. satırlar). has_permission, yorumun okunabilirliğini referans kaydın read iznine bağlar; Comment zincirini en fazla 10 adım izler. get_permission_query_conditions, okunamayan DocType'ların yorumlarını eler. get_document_comments, docinfo ve get_comments içinde izin kontrolü uygular. İçerik sanitize_html ile temizlenir. (3) Comment.after_insert, notify_mentions'ı çağırır. extract_mentions, .mention data-id değerlerini ve User Group üyelerini ayrıştırır. Alıcılar enabled, System User ve allowed_in_mentions filtrelerinden geçer, sonra type=Mention olan Notification Log kaydı oluşur. Notification Log, for_user'a realtime 'notification' olayı ve isteğe bağlı e-posta gönderir; kaydı yalnız for_user okuyabilir. (4) Document Follow için follow, unfollow ve update_follow uçları var. Takip için track_changes, read izni ve document_follow_notify gerekir. follow_commented_documents açıksa yorum yazan kullanıcı kaydı otomatik takip eder; takipçilere periyodik özet e-postası gider. (5) docinfo_update olayı kaydın realtime odasına yayınlanır; doc_subscribe odaya katılmadan önce has_permission kontrolü yapar. Suite'teki Vue Writer/Sheets yorumları ve drive notify_mentions ürüne özgüdür, genel kayıt yorumu sağlayıcısı değildir. yorum, mention veya takip sözleşmesi içermez. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kabul ölçütünü bozan açık: notify_mentions, bahsedilen kullanıcının referans kayıtta read izni olup olmadığını kontrol etmiyor. Yorum içeriği email_content alanıyla Notification Log'a ve bildirim e-postasına kopyalanıyor. Bu yüzden kayda izni olmayan biri mention yoluyla yorumu görebilir.
- add_comment, comment_email ve comment_by değerlerini istemciden alıyor; validate yalnız boş comment_email'i dolduruyor. Yazar kimliği oturum kullanıcısına sabitlenmiyor.
- suite/planlanan Frappe adaptörü içinde yorum listeleme/ekleme/düzenleme, mention bildirimi ve takip için tenant ve izin kapsamlı provider sözleşmesi yok.
- React/Ant Design (Pro/X) tarafında yorum, mention ve takip yüzeyi kaynakta yok. Mevcut UI Desk JS ve Suite Vue tarafında.
- Realtime docinfo_update ile Notification Log olaylarının headless istemciye (kernel envelope/outbox) eşlenmesi tanımlı değil.

Nasıl tamamlanır: native-comment--contract sırasına bağlı kalınarak şu sırayla ilerlenmeli: 1) Önce RED regresyon testi yazılmalı. Testte okuma izni olmayan kullanıcı mention edilmeli; ne Notification Log oluşmalı ne e-posta gitmeli. 2) Ardından notify_mentions'ta alıcılar frappe.has_permission(ref_doctype, 'read', doc=ref_name, user=...) ile süzülmeli ve test GREEN'e geçirilmeli. Bu düzeltme upstream'e veya yerel override'a küçük bir yama olarak yapılmalı. 3) add_comment'te yazar kimliği oturum kullanıcısına sabitlenmeli. 4) Sonra planlanan Frappe adaptörü'a ince sarmalayıcılar eklenmeli: comments.list (get_document_comments), comments.add/update (frappe.desk.form.utils), follow.toggle (update_follow) ve notifications.list (Notification Log). Comment ORM'i kopyalanmamalı. 5) Realtime docinfo_update ve notification olayları kernel envelope'a eşlenmeli.

Kaynak dayanakları: `frappe/frappe/desk/form/utils.py:31`; `frappe/frappe/core/doctype/comment/comment.py:128`; `frappe/frappe/desk/notifications.py:465`; `frappe/frappe/desk/notifications.py:483`; `frappe/frappe/desk/form/document_follow.py:68`; `frappe/frappe/realtime/handlers.py:76`.

Rehber: [native-comment](./frappe-roadmap-contracts/native-comment.json). Mevcut birincil görev: `native-comment--implementation`.

### realtime-5 — Kimin görüntülediği/düzenlediği bilgisi ve eşzamanlı düzenleme uyarısı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Suite Sheets'te TTL'li presence/awareness ve izin kontrollü relay var; bu, 'kopan kullanıcı süre sonunda kalksın' ölçütünün yalnız Sheet'e özel bir benzeri. Talimat eşzamanlı düzenleme uyarısını kabul ölçütüne koymamış. check_if_latest için de yerel v17 yerine version-15 kaynağına atıf yapıyor.

Eksik:

- Kabul ölçütünde eşzamanlı düzenleme/çakışma uyarısı yok, yalnız presence var
- check_if_latest atfı version-15'e işaret ediyor; v17-dev davranışı eşlenmemiş
- Genel kayıt presence'ı ile Sheet'e özel Yjs awareness arasındaki yeniden kullanım sınırı yazılmamış
- Suite'teki secret + ignore_permissions persist deseninin kopyalanmaması gerektiği belirtilmemiş

Nasıl tamamlanır: ui-presence--implementation'a şunları ekleyin: v17 modified/check_if_latest çakışma kontrolü sunucuda kalsın; presence yalnız read izinli doc odasında TTL'li heartbeat olarak dursun. Kabul ölçütüne 'eski sürümle kaydetme reddi + uyarı' maddesini ekleyin.

Kaynak dayanakları: `suite/frontend/src/apps/sheets/collab/awareness.js:23`; `suite/frontend/src/apps/sheets/collab/realtime-adapter.js:7`; `suite/frontend/src/apps/sheets/components/SheetEditor/useCollaboration.js:126`; `suite/suite/sheets/collab.py:147`.

Rehber: [ui-presence](./frappe-roadmap-contracts/ui-presence.json). Mevcut birincil görev: `ui-presence--implementation`.

### realtime-6 — Paylaşımlı çalışma alanı etkinlik akışı ve kayıt abonelikleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kayıt düzeyinde after_commit yayınlar ve izin süzgeçli get_list mevcut. Ancak 'workspace' kavramı tenant/izin modeline bağlanmamış. Akışın veri kaynağı (Version, Comment, Activity Log) ve aboneliğin native Document Follow ile ilişkisi de tanımsız. Görev ID'si post-mvp, kapsam ise conditional; tetikleyici koşul belirsiz.

Eksik:

- Workspace'in tenant ve izin karşılığı tanımsız
- Akış kaynağı native log DocType'larına eşlenmemiş
- Abonelik iptalinin hangi native kayda yazılacağı tanımsız
- Akışta görünürlük, okuma anında get_list izin süzgecine bağlanmamış

Nasıl tamamlanır: ui-family-24 altında akışı izin süzgeçli get_list ile okunan native log DocType'larına bağlayın. Realtime'ı yalnız yenileme sinyali olarak kullanın. Aboneliği v17 Document Follow kaynağı okunduktan sonra ona eşleyin.

Kaynak dayanakları: `frappe/frappe/api/v1.py:35`; `suite/suite/meet/doctype/meet_room/meet_room.py:191`.

Rehber: [ui-family-24](./frappe-roadmap-contracts/ui-family-24.json). Mevcut birincil görev: `ui-family-24--implementation-post-mvp`.

### realtime-7 — Modüller arası ortak atama ve Benim işlerim kuyruğu; sorumlu, takipçi, son tarih, hatırlatma ve yetkili kayıt eylemleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de çalışan atama yapı taşları var:

- frappe/frappe/desk/form/assign_to.py: whitelisted add, remove, close, add_multiple ve remove_multiple uçları. Atama yapılırken referans kayıt için check_permission çalışır. Aynı kişiye ikinci açık atama yapılmaz (açık ToDo varsa atlanır). Atanan kişinin yetkisi yoksa kayıt onunla paylaşılır; System Settings'te paylaşım kapalıysa işlem reddedilir. Kullanıcı ayarı açıksa atanan kişi kaydı otomatik takip eder. Atanan kişiye Notification Log ile bildirim gider. close yalnız atanan kişinin kendisine izinlidir.
- ToDo DocType şu alanları tutar: allocated_to (sorumlu), assigned_by, date (son tarih), priority, status (Open/Closed/Cancelled) ve reference_type/reference_name (modüller arası dinamik kayıt referansı). Atama ve kaldırma referans kayda Comment olarak yazılır (denetim izi). Açık atamalar referans kaydın _assign alanına senkronlanır.
- ToDo için permission_query_conditions ve has_permission hookları tanımlı. ToDo rolü olmayan kullanıcı yalnız allocated_to, assigned_by veya owner olduğu ToDo'ları görür. Bu, "Benim işlerim" listesinin temelidir.
- Takipçi tarafı: Document Follow ve periyodik özet e-postaları var. Özet gönderilirken referans kayıt için read izni yeniden kontrol edilir.
- Hatırlatma tarafı: Reminder DocType, create_new_reminder ve 15 dakikalık send_reminders işi var. notified bayrağı aynı hatırlatmanın iki kez gönderilmesini önler. Suite tarafı:
- Suite'te atama, ToDo veya iş kuyruğu kodu yok. Yalnız session, metadata ve DocType alan düzenleme sözleşmesi sunuyor; atama veya kuyruk sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kuyruk görünürlüğü referans kaydın iznine bağlı değil. ToDo.has_permission ve query koşulu yalnız allocated_to/assigned_by/owner alanlarına bakıyor. Kayıt izni veya üyelik kaldırılsa da ToDo ve description görünmeye devam eder; kabul ölçütü karşılanmıyor.
- Tenant izolasyonu yok. ToDo'da tenant alanı ve tenant süzgeci bulunmuyor.
- Takipçi atamanın bir parçası değil. Document Follow ayrı bir mekanizma; ToDo üzerinde takipçi alanı yok.
- Son tarihe bağlı otomatik hatırlatma yok. ToDo.date için zamanlanmış iş bulunmuyor. Reminder kullanıcıya özel ve elle oluşturuluyor; ToDo ile otomatik bağı ve atama başına tekilleştirmesi yok. Reminder, bağlı kayıt için izin kontrolü de yapmıyor.
- Sahiplik devri tek atomik işlem değil. Yeniden atama için ayrı remove ve add çağrısı gerekiyor.
- Tamamlanmış iş üzerindeki geçersiz eylem açıkça reddedilmiyor. set_status zaten aynı durumdaki iş için sessizce geçiyor; Closed bir işi Cancelled yapmayı engelleyen bir kural yok.
- İç not koruması yok. description alanı serbest metin ve alan düzeyinde gizlenmiyor.
- En az iki kurulu Suite modülünün atama akışına bağlandığı bir entegrasyon yok. Headless provider'da kuyruk sözleşmesi de yok.

Nasıl tamamlanır: Upstream ToDo ve assign_to korunacak; yeni katman yalnız suite/planlanan Frappe adaptörü'a ek olarak yazılacak. Sıra:

1. native-assignment--contract kapsamında şu sözleşmeyi tanımla: sorumlu = ToDo.allocated_to, son tarih = ToDo.date, takipçi = Document Follow, hatırlatma = Reminder (referans ToDo).
2. Provider'a tek bir salt okunur my_work uç noktası ekle. Uç, ToDo'yu frappe.get_list ile kullanıcı izniyle çeksin. Her satırda frappe.has_permission ile referans kaydı ayrıca kontrol etsin; okunamayan kaydı ve description alanını düşürsün. Tenant süzgeci tenant-registry--contract'a bağlansın.
3. Kayıt izni kaldırıldığında işin kuyruktan düşmesini önce başarısız (RED), sonra geçen (GREEN) testle kanıtla.
4. Ardından sunucuda yetkilendirilen reassign eylemini ekle; Closed veya Cancelled iş üzerindeki eylemi reddetsin.
5. Son tarihe göre tekilleştirilmiş hatırlatmayı (her ToDo ve tarih için tek Reminder) en son ekle.
6. Kabul için iki kurulu Suite modülünü açıkça seç (öneri: Drive ve Calendar). CRM/Helpdesk yalnız tasarım referansı olarak kalsın.

Kaynak dayanakları: `frappe/frappe/desk/form/assign_to.py:72`; `frappe/frappe/desk/form/assign_to.py:211`; `frappe/frappe/desk/doctype/todo/todo.py:174`; `frappe/frappe/desk/doctype/todo/todo.py:84`; `frappe/frappe/automation/doctype/reminder/reminder.py:47`; `frappe/frappe/hooks.py:165`.

Rehber: [native-assignment](./frappe-roadmap-contracts/native-assignment.json). Mevcut birincil görev: `native-assignment--implementation`.

### modules-1 — Modül açma ve kapatma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (API/job reddi, veri koruma) tanımlı. Yerel v17-dev kaynakta veriye dokunmadan uygulamayı devre dışı bırakan, yalnız System Manager'ın çağırabildiği set_app_state ve is_module_disabled bulunuyor. Ancak talimat genel dokümana dayanıyor ve bu yerel primitive'lere eşlenmemiş. Suite tek bir app olduğu için (Drive/Mail/Sheets…) app düzeyinde kapatma tüm ürünleri birlikte kapatır.

Eksik:

- Ürün modülünün karşılığı belirsiz: app mi, Suite içindeki Module Def mi?
- Devre dışı app'in /api/method, /api/resource ve scheduler/RQ çağrılarını gerçekten reddettiğini gösteren kaynak bu excerpt'te yok (unknown).
- Kiracının neye karşılık geldiği (site mi, site içi kayıt mı) tanımlanmamış.
- Modül durumu ile ticari kullanım hakkı ve kullanıcı yetkisi arasındaki ayrım yazılmamış.
- Talimatlarda Frappe v17-dev sürüm eşlemesi yok.

Nasıl tamamlanır: capability-activation--implementation görevinde frappe/app_state.py ile frappe/installer.py içindeki disable_app akışı salt okunur incelenip handler, scheduler ve before_job zorlaması doğrulanmalı. Yeni bir durum tablosu kurmak yerine set_app_state/is_module_disabled üzerine Suite alt modül eşlemesi yazılmalı. Kiracı=site kararı açıkça kaydedilmeli.

Kaynak dayanakları: `frappe/frappe/core/doctype/installed_applications/installed_applications.py:154`; `frappe/frappe/permissions.py:9`; `frappe/frappe/core/doctype/installed_applications/installed_applications.js:73`; `suite/pyproject.toml:6`.

Rehber: [capability-activation](./frappe-roadmap-contracts/capability-activation.json). Mevcut birincil görev: `capability-activation--implementation`.

### modules-2 — Modül tanım dosyası: module.manifest.yml.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

module.manifest.yml'nin özel bir platform sözleşmesi olduğu ve deterministik çeviri gerektiği doğru tespit edilmiş. Yerelde bu bilginin karşılıkları dağınık hâlde zaten var: hooks.py içindeki app metadata, pyproject'teki frappe-dependencies aralığı ve required_apps hook'u. Talimatta şema, alan listesi ve gerçekten gerekli olup olmadığı kararı yok.

Eksik:

- YAML şeması, zorunlu alanlar ve kimlik/sürüm biçimi tanımlı değil.
- Manifest ile hooks.py/modules.txt/pyproject arasında hangisinin tek doğruluk kaynağı olduğu belirlenmemiş; çift kaynak riski var.
- Manifestin GenUI veya UI capability registry ile karışmaması gerektiği yazılmamış.

Nasıl tamamlanır: capability-definition--implementation görevinde önce manifestin gerçekten gerekip gerekmediğine karar verilmeli. Gerekiyorsa mevcut hooks.py, pyproject [tool.bench.frappe-dependencies] ve required_apps'ten türetilen, doğrulanmış salt okunur bir görünüm olarak tanımlanmalı; ayrı bir yazma kaynağı olmamalı.

Kaynak dayanakları: `suite/suite/hooks.py:6`; `suite/pyproject.toml:45`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:189`.

Rehber: [capability-definition](./frappe-roadmap-contracts/capability-definition.json). Mevcut birincil görev: `capability-definition--implementation`.

### modules-3 — Modül kataloğu, kurulum, bağımlılık, sürüm uyumu ve güvenli kaldırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta bağımlılık (required_apps), sürüm aralığı (frappe-dependencies), kurulu app sürüm listesi ve uninstall hook'u var. Custom modüllerin app uninstall'da silinmesini önleyen sahiplik ayrımı da mevcut. SaaS kataloğu, sürüm uyum politikası ve geri dönüş sözleşmesi ise talimatta somut değil.

Eksik:

- Katalog verisinin kaynağı ve hangi kapsamda gösterileceği (site/kiracı) tanımlı değil.
- Kaldırmadan önce yedek/geri yükleme sahibi ve adımları yok; 'geri dönüş denenmeli' ölçülebilir değil.
- SaaS akışında uninstall yerine devre dışı bırakmanın varsayılan olacağı yazılmamış.
- Suite monolitik olduğu için ürün bazında kurulum app kurulumuyla yapılamaz; bu kısıt not edilmemiş.

Nasıl tamamlanır: Kataloğu Installed Applications + required_apps + frappe-dependencies üzerinden salt okunur bir projeksiyon olarak tanımla. SaaS akışında uninstall'ı yalnız yedek şartlı operasyon adımı yap ve kullanıcı akışında set_app_state'i kullan. Yedek/geri dönüş sahipliği deploy/rollback sorumlusuna (Hüseyin Cengiz) bağlanmalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/installed_applications/installed_applications.py:56`; `frappe/frappe/core/doctype/module_def/module_def.py:39`; `frappe/frappe/hooks.py:19`; `suite/pyproject.toml:44`.

Rehber: [capability-definition](./frappe-roadmap-contracts/capability-definition.json). Mevcut birincil görev: `capability-definition--implementation`.

### modules-4 — Modül kapanırken kayıt koruma ve devam eden işlemleri durdurma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (yazma engeli, okumanın sürmesi, işin güvenli noktada bitmesi) anlamlı. Yerel primitive'ler: veriyi koruyarak devre dışı bırakma, before_job hook'u ve yalnız reddedebilen has_permission hook zinciri. 'Salt okunur askı' durumu ile job boşaltma sözleşmesi talimatta tanımlı değil; mevcut disable okumayı da kapatıyor olabilir.

Eksik:

- Devre dışı ile salt okunur askı arasındaki ayrım tanımsız.
- Kuyruktaki ve çalışan RQ job'ları ile Suite scheduler_events için durdurma/boşaltma kuralı yok.
- 'Güvenli nokta' her modül için tanımlanmamış (ör. Mail push, Sheets collab).

Nasıl tamamlanır: Önce disable_app'in scheduler ve enqueue filtrelemesi salt okunur incelenmeli. Ardından askı durumu, has_permission hook'u üzerinden write/create/submit reddi olarak tanımlanmalı. Job tarafında before_job içinde durum kontrolü yapılmalı; ignore_permissions kısayolu kullanılmamalı.

Kaynak dayanakları: `frappe/frappe/permissions.py:496`; `frappe/frappe/permissions.py:502`; `frappe/frappe/hooks.py:509`; `suite/suite/hooks.py:289`.

Rehber: [capability-activation](./frappe-roadmap-contracts/capability-activation.json). Mevcut birincil görev: `capability-activation--implementation`.

### modules-5 — Feature flags (özellik açma-kapama anahtarları) ve kiracı bazlı kademeli açılış.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam koşullu ve kabul ölçütü (seçilen kiracı, backend ile frontend'in aynı kararı vermesi) net. Yerelde site bazlı frappe.conf okuma ve boot verisine ekleme hook'u var. Kiracı bazlı kademeli açılış servisi görünmüyor. Bayrağın nerede saklanacağı, nasıl değerlendirileceği ve kohort tanımı talimatta yok.

Eksik:

- Kiracı=site mi, yoksa site içi kohort mu, belli değil.
- Bayrağın kaynağı (site_config mi, Single DocType mı), kimin değiştirebileceği ve audit kaydı tanımlı değil.
- Feature flag'in kullanım hakkı ve yetki yerine geçmeyeceği belirtilmiş, ama sunucuda zorlanacağı nokta belirtilmemiş.

Nasıl tamamlanır: Koşullu görev açılmadan önce kiracı=site kararını kaydet. Tek bir sunucu fonksiyonu tanımla: kaynak site config veya System Manager yetkili Single, frontend'e extend_bootinfo ile aynı sonuç aktarılır. Yeni bir flag servisi altyapısı kurma.

Kaynak dayanakları: `frappe/frappe/api/v2.py:32`; `suite/suite/hooks.py:336`.

Rehber: [feature-flag](./frappe-roadmap-contracts/feature-flag.json). Mevcut birincil görev: `feature-flag--implementation`.

### modules-6 — Modülün yayımladığı işlev, olay, yetki ve ekran kayıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerelde app başına hook çözümleyip raporlayan Audit System Hooks raporu, yalnız reddedebilen has_permission zinciri, whitelist kontrolü ve uygulama ekranı kaydı var. Ancak capability kimliği, benzersizlik kuralı ve headless ekran kaydı sözleşmesi tanımlanmamış. Kaynak/sunucu capability'leri ile GenUI registry'sinin ayrı tutulacağı da yazılmamış.

Eksik:

- Capability ID şeması ve çakışmada ne olacağı tanımlı değil.
- Sunucu reddinin whitelist + DocType izni + has_permission ile sağlanacağı açıkça yazılmamış.
- UI provider registry'nin yalnız sunum katmanı olduğu ve GenUI ile birleştirilmeyeceği belirtilmemiş.

Nasıl tamamlanır: capability-definition--implementation ile ui-provider-registry/permission görevlerinde şunu yaz: capability = whitelisted method veya DocType+ptype. Sunucu kararı mevcut izin zincirinden gelir. UI registry bunu yalnız gösterir. GenUI registry'si ayrı kalır.

Kaynak dayanakları: `frappe/frappe/custom/report/audit_system_hooks/audit_system_hooks.py:52`; `frappe/frappe/api/v1.py:121`; `suite/suite/hooks.py:16`.

Rehber: [capability-definition](./frappe-roadmap-contracts/capability-definition.json). Mevcut birincil görev: `capability-definition--implementation`.

### modules-7 — Modüle ait kurulum, güncelleme ve veri geçişi bildirimleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerelde after_migrate yaşam döngüsü hook'u, kurulu app sürüm kaydı ve app sırası değişikliği için Version log var. 'Başarısız geçiş yeni sürümü etkinleştirmemeli' kuralı ise kod deploy ve rollback'e bağlı. Talimat bunu Frappe'nin site başına migrate modeline ve rollback sahibine eşlemiyor. Bildirimin kanalı ve kime gideceği de tanımsız.

Eksik:

- migrate başarısız olunca kod/sürüm geri alma sorumluluğu ve adımı tanımlı değil.
- Bildirimin hangi kayıt veya kanaldan, hangi kiracıya gideceği belirtilmemiş.
- Migration ilerlemesinin kaynağı (patch log mu, job mı) tanımlı değil.
- Talimatta v17-dev patch/migrate davranışına sürüm eşlemesi yok.

Nasıl tamamlanır: Bildirim yalnız başarılı after_migrate sonrasında üretilmeli; sürüm Installed Applications'tan okunmalı. Başarısız migrate durumunda geri alma, deploy/rollback sahibinin (Hüseyin Cengiz) operasyon adımına bağlanmalı. Ürün tarafına yalnız durum gösterimi kalmalı.

Kaynak dayanakları: `suite/suite/hooks.py:334`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:139`; `frappe/frappe/hooks.py:11`.

Rehber: [capability-activation](./frappe-roadmap-contracts/capability-activation.json). Mevcut birincil görev: `capability-activation--implementation`.

### catalog-1 — Paket, plan, fiyat ve pricing table (paket-fiyat karşılaştırma tablosu) yönetimi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (plan, para birimi, dönem fiyatı API, panel ve pricing table'da aynı sürüm) anlamlı. Ancak tüm entegrasyon ERPNext Subscription Plan'a dayanıyor ve ERPNext bu sitede kurulu değil. Kurulu suite uygulaması faturalama veya plan kataloğu sunmuyor. Frappe'nin yerel Package/Package Release DocType'ları modül dışa aktarma paketleridir, ticari paket değildir.

Eksik:

- ERPNext'i kurma ile kendi plan DocType'ını yazma arasındaki karar yazılmamış; ERPNext kurulacaksa sürüm eşlemesi Frappe 17.0.0-dev'e karşı tanımlanmamış.
- Headless pricing table için okuma sözleşmesi (hangi alanlar, Guest erişimi, sürüm kimliği) tanımsız.
- Frappe Package/Package Release'in SaaS paketi olarak kullanılmaması gerektiği açıkça yazılmamış.
- plan-feature--implementation ile özellik matrisinin sahiplik sınırı belirsiz.

Nasıl tamamlanır: plan-definition--implementation görevine bir karar notu ekleyin: ERPNext kurulumu ya da özel uygulamada plan/fiyat-sürümü DocType'ı. Notta sürüm kimliği, para birimi ve dönem alanları ile native DocType izinleri yer alsın. Kurulum veya kod değişikliği yapılmasın.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/installed_applications/installed_applications.py:45`; `frappe/frappe/core/doctype/package/package.json:8`; `frappe/frappe/hooks.py:11`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `plan-definition--implementation`.

### catalog-2 — Paneldeki paket içeriklerinin frontpages (herkese açık sayfalar) ile eşleşmesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: taslak herkese açık olmamalı, yayınlanan sürüm iki yüzeyde birebir eşleşmeli. Kaynakta izin kontrollü REST kaynak rotaları ve okuma izni kontrolü var. Yayın durumu, herkese açık projeksiyon ve sürüm eşleşmesi sözleşmesi ise yok. Package Release'teki publish alanı yalnızca dosyaları dışa aktarır, web yayını değildir.

Eksik:

- Taslak ve yayınlanmış ayrımı için durum alanı ve yayınlama aksiyonunun sunucu doğrulaması tanımsız.
- Frontpage'in (Vite/PWA) Guest olarak hangi uç noktadan, hangi salt-okunur projeksiyonla okuyacağı ve önbellek temizleme kuralı yazılmamış.
- Genel /api/resource'u Guest'e açmak yerine yalnızca yayınlanmış sürümü döndüren dar bir uç nokta gerektiği belirtilmemiş.

Nasıl tamamlanır: plan-definition--implementation kapsamına küçük bir yayın sözleşmesi ekleyin: yalnızca yayınlanmış ve sürüm kimliği taşıyan kayıtları dönen tek bir whitelisted okuma metodu, rol izinleri ve frontpage'in bu sürüm kimliğini göstermesi. ignore_permissions kullanılmasın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/core/doctype/package_release/package_release.py:76`.

Rehber: [plan-definition](./frappe-roadmap-contracts/plan-definition.json). Mevcut birincil görev: `plan-definition--implementation`.

### catalog-3 — Paket ve fiyat sürümleri; mevcut müşterinin eski koşullarını koruma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Grandfathering kabul ölçütü anlamlı. Ancak abonelik ile fiyat sürümü arasındaki bağ, değiştirilemezlik ve faturalama motoru tanımsız; ERPNext kurulu değil. Frappe'de submit/cancel/amend hakları değiştirilemez sürüm kaydı için kullanılabilecek bir ilkel. Package Release'in major.minor.patch adlandırması ise modül paketine ait ve fiyat sürümü için uygun değil.

Eksik:

- Fiyat sürümünün submit sonrası değişmezliği ve yeni sürümün amend ya da ayrı kayıtla üretilmesi kararı yok.
- Abonelik veya sözleşmenin hangi fiyat sürümüne bağlanacağı ve yenilemede hangi sürümün geçerli olacağı kuralı yazılmamış.
- Faturayı hangi motorun (ERPNext ya da özel) hesaplayacağı belirsiz.

Nasıl tamamlanır: Plan karar notuna şunları ekleyin: submittable fiyat-sürümü kaydı, abonelikte sürüm Link'i ve 'yeni fiyat yalnızca yeni aboneliğe uygulanır' kuralı. Kabul testi, ortak insan bütçesi içinde tek senaryo olarak sonraya bırakılsın.

Kaynak dayanakları: `frappe/frappe/permissions.py:22`; `frappe/frappe/core/doctype/package_release/package_release.py:66`.

Rehber: [plan-definition](./frappe-roadmap-contracts/plan-definition.json). Mevcut birincil görev: `plan-definition--implementation`.

### catalog-4 — Aylık/yıllık, kullanıcı başına, kullanım bazlı ve karma fiyat modelleri.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Fiyat modelleri ve kabul örnekleri (aylık/yıllık, koltuk, tüketim) belirtilmiş. Dönem, fiyat ve miktar yapısı ERPNext'e dayanıyor ve ERPNext kurulu değil. Kurulu kaynakta ölçülen kullanım ya da karma fiyat hesaplayan bir yapı görülmedi.

Eksik:

- Kullanım ölçümünün kaynağı, toplama dönemi, yuvarlama, para birimi ve kıst hesap kuralları tanımsız.
- Karma model için formül sözleşmesi ve kabul edilen fiyat sürümüne referansı yazılmamış.
- ERPNext'in Frappe 17-dev ile uyumluluğu doğrulanmamış.

Nasıl tamamlanır: Önce catalog-1 kararı verilsin. Ardından plan-definition--implementation'a bir hesap kuralı tablosu eklensin: her model için girdi, formül, yuvarlama ve kullanılan fiyat sürümü. Ölçüm altyapısı kurulması önerilmez.

Kaynak dayanakları: `suite/pyproject.toml:6`; `suite/pyproject.toml:45`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `plan-definition--implementation`.

### catalog-5 — Ek modül, ek kullanıcı, ek kota ve müşteri özel fiyat teklifi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (tek fatura, doğru hak artışı, teklife özel fiyatın başka müşteriye uygulanmaması) anlamlı. Aboneliğe birden çok plan ekleme özelliği ERPNext'e ait ve kurulu değil. Müşteriye özel kapsam için Frappe'nin kullanıcı/paylaşım/sahip izinleri kullanılabilir, ancak hak eşlemesi tanımsız.

Eksik:

- Ek modül, kullanıcı ve kotanın plan-feature hak kaydına nasıl yansıyacağı sözleşmesi yok.
- Müşteriye özel teklifin kapsamının User Permission ya da paylaşım ile sunucu tarafında zorlanacağı yazılmamış.
- Tek faturalama motoru belirsiz.

Nasıl tamamlanır: plan-feature--implementation'a ek kalem ile hak artışı eşleme tablosu, plan-definition--implementation'a ise müşteri kapsamlı teklif kaydı ve native izin kuralı eklensin. Kapsam sunucuda zorlanmalı; istemci filtresine güvenilmemeli.

Kaynak dayanakları: `frappe/frappe/permissions.py:94`; `frappe/frappe/client.py:134`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `plan-definition--implementation`.

### catalog-6 — Satışa açık, gizli, kullanımdan kaldırılmış ve sözleşmeye özel paketler.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Dört satış durumu ve emekli plan kabulü tanımlı. Ancak geçiş kuralları, yetkili roller ve yenileme etkisi yazılmamış. Kaynak, görünürlüğün güvenlik sınırı olmadığını açıkça ayırıyor. Gizli veya sözleşmeye özel plan yalnızca UI'da gizlenirse yeni satışta seçilebilir kalır.

Eksik:

- Durum geçişleri (satışta → gizli → emekli) ve bunları yapabilecek roller tanımsız.
- Yeni satışta emekli plan seçimini engelleyen sunucu doğrulaması ile mevcut sözleşmenin korunması arasındaki ayrım yazılmamış.
- Sözleşmeye özel planın müşteri kapsamı catalog-5 ile bağlanmamış.

Nasıl tamamlanır: Plan kaydına satış durumu alanı ve abonelik oluşturmada sunucu tarafı doğrulama kuralı eklensin. Mevcut abonelikler durumdan etkilenmemeli. Bu not plan-definition--implementation görevine yazılsın; yeni görev açılmasın.

Kaynak dayanakları: `frappe/frappe/utils/modules.py:50`; `frappe/frappe/permissions.py:82`.

Rehber: [plan-definition](./frappe-roadmap-contracts/plan-definition.json). Mevcut birincil görev: `plan-definition--implementation`.

### subscriptions-1 — Abonelik başlatma, yenileme, iptal ve suspend (hizmeti askıya alma).

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (tekrarlanan başlatma/iptal isteğinde ikinci abonelik oluşmaması, askıya alma kararının API haklarına aynı anda yansıması) açık. Ancak dayanılan ERPNext Subscription bu sitede kurulu değil. Yerel kaynaktaki 'subscription' adlı DocType'lar (JMAP Push Subscription, Automation Event Subscription) faturalama aboneliği değil. Askıya almaya en yakın parça, kullanıcı devre dışı bırakılınca oturumları temizleyen kullanıcı düzeyindeki mekanizma; tenant/abonelik düzeyinde askıya alma yok.

Eksik:

- Faturalama motoru seçilmemiş: ERPNext kurulumu, Frappe Cloud/Central veya yeni bir suite DocType'ı. Talimat ERPNext'i kurulu sayıyor.
- Askıya alma kararını Keycloak/Frappe rol ve API haklarına bağlayacak sözleşme ve bunun yayılma sırası tanımsız.
- Tekrarlanan isteklere karşı idempotency anahtarı ve tekillik kısıtı tanımsız.
- Frappe 17.0.0-dev ile ERPNext sürüm eşlemesi verilmemiş.

Nasıl tamamlanır: subscription--implementation görevine faturalama motoru kararını (ERPNext kurulumu ya da suite DocType'ı) ve abonelik durumu → hak eşleme tablosunu ekle. Askıya alma, yerel olarak has_permission ve rol atamasıyla bağlanmalı.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `suite/suite/mail/events.py:128`; `suite/suite/mail/doctype/push_subscription/push_subscription.json:91`; `frappe/frappe/permissions.py:82`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `subscription--implementation`.

### subscriptions-2 — Ücretsiz plan, deneme süresi ve denemeden ücretli plana geçiş.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (denemenin bittiği anda doğru hakların uygulanması, ücretli plana geçişte verinin ve üyeliğin korunması) anlamlı. Ancak Trialing akışı ERPNext'e ait ve ERPNext kurulu değil. Yerelde yalnız Frappe Cloud'un raporladığı deneme bilgisini gösteren bir mock bulunuyor; deneme durumunu yönetme mantığı yerel kaynakta yok.

Eksik:

- Ücretsiz plan ve deneme haklarının hangi kayıtta tutulacağı ve hangi sınır anında değerlendirileceği tanımsız.
- Saat dilimi ve deneme bitiş sınırının semantiği belirtilmemiş.
- Ücretli plana geçişte üyeliği koruyan ve yeniden üyelik oluşturmayan geçiş sözleşmesi yok.
- Frappe Cloud'a bağlı trial verisinin kendi barındırdığımız (self-hosted) ürün için geçersiz olduğu belirtilmemiş.

Nasıl tamamlanır: Deneme ve ücretsiz plan haklarını subscription--implementation görevinin hak modeline bağla. Kabul ölçütüne deneme sınırının hangi saatte değerlendirileceğini (saat sınırı) ekle. frappecloud_billing mock verisini yalnız referans olarak not et.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:50`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:101`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `subscription--implementation`.

### subscriptions-3 — Paket yükseltme/düşürme; hemen veya dönem sonunda değiştirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü, hemen uygulanan ve dönem sonunda uygulanan değişikliği ayrı ayrı test etmeyi ve paket düşürmede verinin sessizce silinmemesini istiyor; bu yeterince açık. Yerelde change_plan ve get_plan_options var, ancak yalnız Frappe Cloud Central'a yönlendiriyorlar ve iş mantığı Central tarafında. Değişikliğin ne zaman yürürlüğe gireceği ve kotanın aşılması (paket düşürme sonrası fazla veri) durumu yerel kaynakta yok.

Eksik:

- Paket değişikliği kaydının (önceki/yeni plan, yürürlük tarihi) modeli tanımsız.
- Paket düşürmede kotanın aşılması durumunda verinin salt okunur mu kalacağı yoksa engellenip engellenmeyeceği belirtilmemiş.
- Central yönlendirmesinin kendi barındırdığımız SaaS için geçerli olmadığı belirtilmemiş.

Nasıl tamamlanır: subscription--implementation görevine paket değişikliğinin yürürlük politikasını ve kota aşımı davranışını ekle; değişiklik ekranı ui-family-35--implementation görevine bağlansın.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:22`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`.

Rehber: [subscription](./frappe-roadmap-contracts/subscription.json). Mevcut birincil görev: `subscription--implementation`.

### subscriptions-4 — Dönem içi fiyat farkı, ödeme ek süresi ve yeniden etkinleştirme.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü dönem ortası fiyat farkı, ödeme ek süresi ve yeniden ödeme sonrası tutarla hakların uzlaşmasını istiyor. Ancak proration ve grace ayarları ERPNext Subscription Settings'e ait ve ERPNext kurulu değil. Ödeme ağ geçidi DocType'ları da payments uygulaması yoksa siliniyor.

Eksik:

- Ödeme sağlayıcısı ve payments uygulaması kararı yok.
- Tahsilat webhook'u → yeniden etkinleştirme bağı ile bu bağın idempotency kuralı tanımsız.
- Ek süre boyunca hangi hakların açık kalacağı belirtilmemiş.
- Yuvarlama kuralı ve para birimi belirtilmemiş.

Nasıl tamamlanır: Önce faturalama motoru ve ödeme uygulaması kararını kaydet; ardından ek süre/hak tablosunu ve ödeme olayıyla yeniden etkinleştirme sözleşmesini subscription--implementation görevine ekle.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:14`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `subscription--implementation`.

### subscriptions-5 — Müşterinin abonelik, fatura ve ödeme yöntemlerini yönetebildiği portal.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (müşteri yalnız kendi faturalarını görmeli, ödeme yöntemi sağlayıcı akışıyla değişmeli) açık. Yerelde ödeme yöntemi ekleme/kaldırma ve hosted checkout işlevleri var, ancak hepsi Frappe Cloud Central'a gidiyor ve System Manager rolüyle sınırlı. Bu nedenle son müşteriye yönelik headless bir portal sağlamıyor. ERPNext müşteri portalı da kurulu değil.

Eksik:

- Müşteri kapsamındaki okuma kuralı (yalnız kendi faturaları) için kullanılacak DocType izni, User Permission veya has_permission hook'u tanımsız.
- Ödeme sağlayıcısı ve hosted checkout dönüş/uzlaşma akışı seçilmemiş.
- Headless API yüzeyi (/api/v2 kaynak mı, whitelist metot mu) ve Keycloak oturum eşlemesi belirtilmemiş.

Nasıl tamamlanır: Portal API'sini yerel DocType izinleri ve has_permission üzerine tanımla; ödeme yöntemini yalnız sağlayıcının hosted akışına bırak. UI işi ui-family-35--implementation görevine bağlansın.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:56`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:88`; `frappe/frappe/client.py:176`.

Rehber: [subscription](./frappe-roadmap-contracts/subscription.json). Mevcut birincil görev: `subscription--implementation`.

### subscriptions-6 — İptal nedeni, duraklatma, bitiş tarihi ve yeniden abonelik.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü dönem sonunda iptal ile hemen iptali ayırmayı ve yeniden abonelikte geçmişin korunmasını istiyor. Ancak iptal/bitiş durumları ERPNext'te ve ERPNext kurulu değil. Yerel kaynaktaki 'Cancelled' durumu Automation Event Subscription'a ait ve faturalama ile ilgisi yok. İptal nedeni ve duraklatma politikası tanımlanmamış.

Eksik:

- Duraklatma ile askıya alma (subscriptions-1) arasındaki fark ve her birinin haklara etkisi tanımsız.
- İptal nedeni alanı için katalog/serbest metin seçimi ve bunun raporlanması belirtilmemiş.
- Yeniden abonelik için yeni kayıt mı oluşturulacağı yoksa mevcut kayıt mı yeniden açılacağı tanımsız; geçmişin korunması için yeni kayıt öner.

Nasıl tamamlanır: Durum makinesini (aktif/duraklatılmış/askıda/dönem sonunda iptal/bitti) ve yeniden abonelik kuralını subscription--implementation görevine tek tabloda ekle. ERPNext kurulmazsa bunu suite DocType'ında yerel Frappe izinleriyle kur.

Kaynak dayanakları: `frappe/frappe/automation/doctype/automation_event_subscription/automation_event_subscription.py:29`; `suite/suite/mail/events.py:131`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `subscription--implementation`.

### entitlements-1 — Entitlements (paket veya sözleşmeden doğan özellik kullanım hakları).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü net: rol yetkisi olsa bile paket hakkı yoksa backend reddetmeli. Yerel kaynakta rol tabanlı karar ve per-DocType has_permission hook yapısı var, ancak paket ya da sözleşmeye bağlı hak kaydı yok. Talimat ERPNext Subscription Plan belgesine dayanıyor; ERPNext bu sitede kurulu değil.

Eksik:

- Kiracı modeli tanımsız: site başına kiracı mı, site içi kiracı mı belli değil. Bu yerel kurulumda tek site var.
- Hak veri modeli ve kaynak sistem (faturalama/sözleşme) arasındaki sözleşme yok.
- Administrator için kodda koşulsuz True dönüşü var. Bu atlatmanın hak denetiminde nasıl ele alınacağı belirtilmemiş.
- ERPNext Subscription Plan yeniden kullanılamaz; yerine ne kullanılacağı tanımlı değil.
- Altı maddenin tamamı tek bir göreve (entitlement-grant--implementation) bağlı; alt bağımlılık sırası belirtilmemiş.

Nasıl tamamlanır: entitlement-grant--implementation görevine şunları yazın: kiracı kimliği kararı, hak kaydı alanları (paket, özellik anahtarı, kaynak) ve tek bir backend karar noktası. Bu karar noktası has_permission hook'una mı yoksa servis katmanına mı bağlanacak, açıkça seçin.

Kaynak dayanakları: `frappe/frappe/permissions.py:109`; `frappe/frappe/permissions.py:168`; `suite/suite/hooks.py:154`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### entitlements-2 — Paket hakları, teknik modül anahtarları ve kullanıcı yetkilerinin ayrı denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Üç ayrı denetim ve 'biri olumsuzsa red' kuralı açık yazılmış. Yerelde bunların üçü de ayrı ilkel olarak var: has_permission içinde app/modül devre dışı kontrolü, User Type üzerinden kullanıcı bazlı block_modules ve rol izinleri. Ancak ticari hak katmanı yok. Talimat bu mevcut ilkelleri ve v17-dev'e özgü is_module_disabled API'sini anmıyor.

Eksik:

- Teknik modül anahtarı olarak frappe.app_state.is_module_disabled mı, block_modules mı, yeni bir anahtar mı kullanılacak, eşlenmemiş.
- is_module_disabled'ın v17-dev'deki davranışı kaynakta görülmedi. v16 belgelerine dayanmak yanıltıcı olabilir.
- Frontend yalnızca bilgi amaçlı: useDocPermissions 'display-only' ve yüklenirken açık kalıyor (fail-open). Bu sınır talimatta açıkça yazılı değil.
- Bir denetim reddettiğinde hangi denetimin reddettiğini gösteren hata/teşhis sözleşmesi yok.

Nasıl tamamlanır: Görev metnine bir eşleme tablosu ekleyin: ticari hak → yeni kayıt, teknik modül → is_module_disabled veya block_modules, kullanıcı → DocPerm. Hangi hook'ta AND ile birleştirileceğini yazın.

Kaynak dayanakları: `frappe/frappe/permissions.py:135`; `frappe/frappe/core/doctype/user_type/user_type.py:97`; `frappe/ui/src/composables/useDocPermissions.ts:47`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### entitlements-3 — Kiracı özel hak tanımlama; başlangıç, bitiş ve geri alma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Başlangıç/bitiş sınırı ve geri almadan sonra önbelleğin tutarlı kalması kabul ölçütü olarak yazılmış. Hak kaydı DocType ile modellenebilir. User Permission ve Permission Manager'da hazır önbellek temizleme ve gerçek zamanlı bildirim kalıbı var. Süreli hak ve geri alma kaynakta yok.

Eksik:

- Saat dilimi ve sınır anlamı (dahil/hariç) tanımsız. Süre dolunca zamanlayıcı mı, istek anında değerlendirme mi kullanılacağı seçilmemiş.
- Geri alma anında devam eden işlemler ve kuyruktaki işler için politika yok.
- Önbellek geçersiz kılma için mevcut user_permissions hdel ve after_commit kalıbının yeniden kullanılacağı belirtilmemiş.
- Hak değişikliklerinin denetim izi (track_changes veya log) gereksinimi yazılmamış.

Nasıl tamamlanır: Hak kaydına valid_from, valid_to ve revoked alanlarını ekleyin; değerlendirmeyi istek anında yapın. on_update/on_trash içinde önbellek temizliği ve after_commit yayını kullanın. Bu sözleşmeyi görev metnine yazın.

Kaynak dayanakları: `frappe/frappe/core/doctype/user_permission/user_permission.py:41`; `frappe/frappe/core/doctype/user_permission/user_permission.py:42`; `frappe/frappe/core/page/permission_manager/permission_manager.py:157`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### entitlements-4 — Hak değişikliğinin panel, arka plan işi ve entegrasyonda uygulanması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Panel, RPC, kuyruk ve entegrasyon için aynı sonuç isteniyor; ölçüt anlamlı. Kaynakta önemli kaçış yolları var: dahili yazımlar ignore_permissions=True kullanıyor; Drive, File iznini kendi modeliyle değiştiriyor (ignore_file_permissions); /method RPC yolu doküman iznine bağlı değil; toplu işlemler belirli bir eşikten sonra asenkron çalışıyor. Talimat bu yolları listelemiyor.

Eksik:

- Yürütme yollarının envanteri yok: whitelisted RPC, allow_guest uçları, scheduler_events, enqueue edilen işler, Drive'ın özel izin modeli.
- ignore_permissions kullanılan dahili yazımlarda hak denetiminin nerede yapılacağı tanımsız.
- Kuyruğa alınmış bir işin çalıştırılma anında hakkı yeniden kontrol edip etmeyeceği belirtilmemiş.
- Entegrasyon (API anahtarı veya OAuth istemcisi) için hak bağlamının nasıl taşınacağı tanımsız.

Nasıl tamamlanır: Görev metnine yürütme yolu envanterini ve her yol için tek karar fonksiyonunun çağrılma noktasını ekleyin. Kuyruk işleri için çalıştırma anında yeniden denetim kuralı koyun.

Kaynak dayanakları: `suite/suite/sheets/permissions.py:74`; `suite/suite/hooks.py:117`; `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:32`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### entitlements-5 — Askıdaki hesap için salt okunur erişim, veri dışa aktarma ve ödeme istisnaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Askıya alınmış hesapta yazmaların engellenmesi, export ve ödeme istisnası, kiracı sınırının korunması ölçüt olarak yazılmış. Kaynakta export iznini ayrı tutan std_rights ve HTTP metodunu okuma/yazma iznine eşleyen yapı var. Suite'te askı benzeri tek desen kullanıcı düzeyindeki disabled-account rolü; kiracı düzeyinde askı yok.

Eksik:

- Askı durumunun kaynağı ve hangi işlemlerin yazma sayılacağı tanımsız (POST ile çalıştırılan doküman metodları, set_value, rename gibi).
- Ödeme akışının hangi DocType veya uçları kapsadığı belirsiz. ERPNext yok, ödeme sağlayıcısı seçilmemiş.
- Export'un kişisel veri ve kiracı sınırı içinde nasıl teslim edileceği (dosya, süre, yetkili rol) tanımsız.
- Kullanıcı düzeyindeki disabled rolü ile kiracı askısının farkı belirtilmemiş.

Nasıl tamamlanır: Askı politikasını yazma ptype'larının (write/create/delete/submit/cancel/import) reddi, export ve read'e izin, belirli ödeme uçlarına allowlist olarak tanımlayın ve görev metnine ekleyin.

Kaynak dayanakları: `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v2.py:267`; `suite/suite/hooks.py:262`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### entitlements-6 — Müşteri ortamına kurulum için lisans doğrulama ve çevrimdışı tolerans.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

frappe ve suite kaynak köklerinde, müşteri ortamı kurulumu için imzalı lisans doğrulaması, lisans süresi kontrolü, çevrimdışı grace/tolerans veya lisans ile hak eşlemesi yapan bir kod bulunamadı. Bulunanlar yalnızca lisansla ilgisi olmayan genel ilkellerdir. (1) Upstream frappe'de PyJWT ile imza doğrulayan Entra/O365 token kontrolü vardır (frappe/frappe/utils/oauth.py:48). (2) Suite Meet kayıt callback'inde HS256 JWT doğrulaması vardır (aud/iss/require) (suite/suite/meet/recording/callback_auth.py:357). (3) Frappe Cloud faturalandırma istemcisi, barındırılan SaaS'ta site bilgisini ve trial_end_date'i uzaktan çeker. Ağ hatasında None döner; grace mantığı veya imzalı yerel lisans yoktur. (4) boot.py, frappe.conf.subscription değerini yalnızca bootinfo'ya taşır; uygulayıcı bir kontrol değildir. Lokal pilot suite/suite/planlanan Frappe adaptörü (api.py, local_fixture.py) lisans, abonelik, süre veya grace içermiyor. Suite'in Vue frontend'inde ve frappe/ui TrialBanner'da yalnızca FC deneme süresi gösterimi var; bu bir doğrulama değildir.

Eksik:

- İmzalı lisans artefaktının şeması (müşteri/tenant, hak listesi, iat/nbf/exp, kid) ve doğrulayıcısı (asimetrik imza, örn. EdDSA/RS256; yalnız public key sitede)
- Bozuk imza, yanlış kid veya süresi dolmuş lisansın deterministik reddi, saat kayması toleransı (leeway)
- Çevrimdışı tolerans: son başarılı doğrulama zamanının kalıcı kaydı ve enjekte edilebilir saatle deterministik grace hesabı (grace değeri kararlaştırılmamış)
- Süre dolunca uygulanacak kesme politikası (salt okunur / tam kesme) ve bunu uygulayan request/permission hook'u
- Lisans haklarının entitlement-grant (entitlements-1) kaydına eşlenmesi ve audit/outbox olayları
- İmza anahtarı yönetimi/rotasyonu ve iptal (revocation) mekanizması
- Headless provider sözleşmesinde lisans/hak durumunun GenUI'ye sunulması (salt okunur durum uç noktası)
- AGPL-3.0 kapsamında müşteri kaynağı değiştirebildiği için teknik garantinin sınırı: hukuki/ürün kararı kullanıcıyla netleştirilmeli

Nasıl tamamlanır: Sıra korunmalı: önce entitlement-grant--contract/schema bağımlılıkları kapanmalı. Ardından kullanıcı şu üç kararı vermeli: müşteri ortamı kurulumu kapsamda mı, grace süresi kaç gün, süre dolunca salt okunur mu yoksa tam kesme mi. En küçük somut adım şudur: suite içinde, planlanan Frappe adaptörü pilotundan ayrı, saf ve yan etkisiz bir verify_license(token, public_keys_by_kid, now, last_verified_at, grace) fonksiyonu yazılmalı. Bu fonksiyon PyJWT ile algoritmayı sabitlemeli ve exp/iat/kid alanlarını zorunlu tutmalı (callback_auth.py:357 desenini izleyerek). Önce gerçek RED testleri yazılmalı: bozuk imza, süresi dolmuş, grace sınırının bir saniye öncesi/sonrası, saat kayması. Sonra GREEN yapılmalı. Sonraki adımlar sırasıyla: (2) son başarılı doğrulama zamanını kalıcılaştırmak; (3) claim'leri entitlement-grant kaydına eşlemek; (4) kesme politikasını tek bir hook ile uygulamak; (5) durumu headless provider'da salt okunur sözleşme olarak sunmak.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:101`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:103`; `frappe/frappe/boot.py:633`; `frappe/frappe/utils/oauth.py:48`; `suite/suite/meet/recording/callback_auth.py:357`; `frappe/frappe/integrations/frappe_providers/frappecloud_billing.py:50`.

Rehber: [entitlement-grant](./frappe-roadmap-contracts/entitlement-grant.json). Mevcut birincil görev: `entitlement-grant--implementation`.

### campaigns-1 — Kupon, kampanya ve indirim yönetimi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü açık: geçerli kod yalnız uygun plan ve müşteri için indirime dönüşür, kodsuz fiyat korunur. Ancak dayanılan yetenekler ERPNext Coupon Code ve Pricing Rule; ERPNext bu sitede kurulu değil. Kurulu frappe içinde kupon/fiyat kuralı yok. 'UTM Campaign' yalnız pazarlama etiketidir, indirim değildir. Frappe Cloud faturalama mantığı yerelde değil, Central'dadır.

Eksik:

- ERPNext kurulacak mı, yoksa ayrı bir Frappe app'te yerel kupon modeli mi yazılacak? Bu karar yok.
- Frappe 17.0.0-dev ile ERPNext sürüm uyumu eşlenmemiş.
- SaaS plan/abonelik/checkout modelinin hangi DocType'ta durduğu tanımlı değil; Central billing ile sınır belirsiz.
- İndirimi uygulayan sunucu tarafı yetki ve doğrulama noktası tanımlı değil (yalnız UI hesaplaması yetmez).
- Tek primaryTaskId 'campaign--implementation' beş alt maddeyi kapsıyor; bağımlılık sırası yok.

Nasıl tamamlanır: campaign--implementation görevine şu karar kaydını ekleyin: ERPNext'i v17-dev ile kurmak mı, yerel bir kupon DocType'ı mı? Bunun yanında fiyat hesabının yeri (yerel mi, Central mı) ve plan/müşteri uygunluk kontrolünün sunucuda nerede yapılacağı yazılsın. Yeni görev kaydı açmayın.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/website/doctype/utm_campaign/utm_campaign.json:20`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `campaign--implementation`.

### campaigns-2 — BOGO (Buy One, Get One — bir alana ek ürün) kampanyaları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Ödül ve iptal ilkesi ifade edilmiş. Ama ERPNext'in ücretsiz ürün kuralı kurulu değil. SaaS'ta ödülün karşılığı ek koltuk veya modül hakkıdır; bunun entitlement modeli bu pakette tanımlı ya da bağlı değil. Ödül türü ile iptal politikası somut değil.

Eksik:

- Ödül birimi tanımsız: koltuk, modül veya süre? Entitlement kaydına nasıl yazılacağı belirsiz.
- 'İptalde hak politikası' içeriği yok: geri alma, oransal düşüm veya dondurma?
- Abonelik dışı modellerde koşullu kapsam ölçütü belirsiz.
- ERPNext kurulumu ve sürüm eşlemesi yok.

Nasıl tamamlanır: campaigns-1 kararından sonra BOGO ödülünün entitlement karşılığını ve iptaldeki geri alma kuralını campaign--implementation kabul metnine ekleyin. Entitlement sahibi görevle bağımlılık kurun.

Kaynak dayanakları: `suite/suite/hooks.py:7`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:22`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `campaign--implementation`.

### campaigns-3 — Hedef kitle, geçerlilik süresi, bütçe ve kullanım sınırları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü yarış koşulunu doğru hedefliyor: son kupon ve bütçe sınırında eşzamanlı istekler. Hedef kitle, tarih ve kullanım sınırının dayandığı ERPNext araçları kurulu değil. Frappe'de satır kilidi (for_update) var, ama bütçe ve kullanım sayacı için atomik tüketim sözleşmesi yok.

Eksik:

- Kampanya para bütçesi ve kullanım sayacının veri modeli ile atomik azaltma yöntemi tanımlı değil (satır kilidi mi, koşullu UPDATE mi?).
- Hedef kitle tanımı (müşteri grubu, tenant, plan) ve sunucu tarafında uygulanması belirsiz.
- Saat dilimi ve geçerlilik sınırı (dahil/hariç) tanımsız.
- Eşzamanlılık kabulünün nasıl kanıtlanacağı yazılmamış.

Nasıl tamamlanır: campaign--implementation görevine 'tüketim tek transaction içinde kilitli satırda yapılır' sözleşmesini ve bütçe/kullanım alanlarını ekleyin. Eşzamanlılık senaryosunu ortak insan test bütçesine aday olarak not edin.

Kaynak dayanakları: `frappe/frappe/api/v1.py:56`; `suite/pyproject.toml:6`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `campaign--implementation`.

### campaigns-4 — İndirim birleştirme, öncelik ve kapsam dışı ürün kuralları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Action 'configure' olarak işaretli, ama yapılandırılacak ERPNext Pricing Rule kurulu değil. Kabul metnindeki 'kabul edilen birleşim' politikası tanımlı değil; bu yüzden test edilemez. Kapsam dışı plan listesinin kaynağı da yok.

Eksik:

- İndirim birleştirme politikası yazılı değil: en iyi tek indirim, sıralı uygulama veya üst sınır?
- Öncelik çakışmasında eşitlik kuralı tanımsız.
- Kapsam dışı plan/ürün listesinin nerede tutulduğu ve kimin değiştirebileceği belirsiz.
- ERPNext yoksa 'configure' action'ı geçersiz; action yeniden sınıflanmalı.

Nasıl tamamlanır: Birleştirme ve öncelik politikasını tek paragraf karar olarak campaign--implementation kabul metnine yazın. ERPNext kurulmayacaksa action alanını 'extend/build' olarak düzeltin.

Kaynak dayanakları: `suite/suite/hooks.py:7`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:18`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `campaign--implementation`.

### campaigns-5 — İade/iptalde kupon haklarının düzeltilmesi ve suistimal denetimi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü kısmi/tam iade ve yeniden denemede hak çoğalmasını hedefliyor. Kupon sayacı ERPNext siparişine bağlı ve ERPNext kurulu değil. Payments app de kurulu değil: ödeme gateway DocType'ları payments yoksa silinir. Frappe'de on_cancel ve ödeme olay kancaları var, ama iade sözleşmesi ve idempotency anahtarı tanımlı değil.

Eksik:

- İade ve iptal kaynağı belirsiz: ERPNext belgesi, payments app veya Central billing?
- Kısmi iadede kupon hakkının iade mi, oransal düzeltme mi olacağı tanımsız.
- Yeniden denemelerde idempotency anahtarı ve suistimal sinyalleri (aynı müşteri, çoklu hesap) tanımsız.
- Server Script ile kestirme çözüm yasaklanmamış; düzeltme mantığının sürümlü app kodunda olacağı yazılmalı.

Nasıl tamamlanır: Önce iade olayının kaynağını campaigns-1 kararıyla bağlayın. Sonra campaign--implementation görevine şunları ekleyin: idempotent 'kullanım geri al' kuralı ve iade olay kaynağına bağımlılık.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:17`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:26`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `campaign--implementation`.

### campaigns-6 — Referans ve iş ortağı programı; ilişkilendirme, hak ediş ve suistimal denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü kapsamlı (tek ödül, iade düzeltmesi, kendi kendine referans, denetim) ve campaigns-1'den ayrımı net; confidence 'design'. ERPNext Sales Partner kurulu değil. Frappe'de yalnız UTM/ziyaret izleme var. Bu kayıt misafire açık, fingerprint tabanlı, gecikmeli yazılıyor ve 180 günde temizleniyor. Hak ediş için güvenilir atıf kanıtı sayılamaz.

Eksik:

- Referans bağlantısı ile hesap veya tenant arasındaki imzalı, kalıcı atıf modeli yok.
- Atıf süresi ve çakışmada kazanan kuralı (ilk/son dokunuş) tanımsız.
- Ödülün tetiklendiği olay (ödeme veya etkinleşme) ve tek seferlik idempotency tanımsız.
- Kendi kendine referans tespit ölçütleri (aynı kimlik, ödeme aracı, tenant) belirsiz.
- Web Page View guest yazılabilir ve 180 günde silinir; denetim için kullanılamayacağı belirtilmemiş.

Nasıl tamamlanır: partner-referral--implementation görevine şu notları ekleyin: atıf UTM/Web Page View'dan değil, sunucu tarafında oluşturulan ayrı ve denetlenebilir kayıttan gelir; atıf penceresi; ödül tetikleyicisi. Ürün stratejisi kararı gelene kadar koşullu kalsın.

Kaynak dayanakları: `frappe/frappe/website/doctype/web_page_view/web_page_view.py:46`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:38`; `frappe/frappe/www/website_script.js:37`; `frappe/frappe/website/doctype/utm_campaign/utm_campaign.json:34`.

Rehber: [partner-referral](./frappe-roadmap-contracts/partner-referral.json). Mevcut birincil görev: `partner-referral--implementation`.

### payments-1 — Ödeme sağlayıcısı, ödeme yöntemi ve tahsilat yönetimi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (tek ödeme kaydı) tanımlı. Ancak sağlayıcı seçilmemiş, kapsam koşullu ve 'Frappe Payments kurulacak mı, yoksa SaaS adaptörü mü yazılacak?' kararı verilmemiş. Yerel envanterde yalnız frappe ve suite kurulu. Core'daki patch, payments kurulu değilse gateway DocType'larını siliyor. cloud_billing.py ise sitenin kendi Frappe Cloud faturalamasına ait; tenant tahsilatı için yeniden kullanılamaz.

Eksik:

- Ürünün tahsilat yapıp yapmayacağı (conditional) kararı verilmemiş.
- Sağlayıcı ve desteklenen yöntem listesi seçilmemiş.
- Frappe Payments ile frappe 17.0.0-dev arasındaki sürüm uyumu ve kurulum kararı yok.
- Ödeme kaydının sahibi olan DocType ve tenant/izin sınırı tanımlanmamış.
- Frappe Cloud billing (Central/Pilot) ile ürün tahsilatının ayrımı talimatta yazılmamış.

Nasıl tamamlanır: payment-attempt--implementation görevine tek bir karar notu ekleyin: kapsam evet/hayır, sağlayıcı, Payments uygulaması mı özel adaptör mü, Payments'ın frappe 17-dev uyumunun nasıl doğrulanacağı. Bu karar alınmadan uygulamaya başlanmamalı.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:9`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`; `suite/pyproject.toml:45`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `payment-attempt--implementation`.

### payments-2 — Ödeme yetkilendirme, doğrulama, tekrar deneme ve başarısız tahsilat takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (yanlış Paid oluşmaması) anlamlı. Core'da yalnız ödeme olay adları (authorization/paid/failed) var. Bu olayları tetikleyen PaymentController ise kurulu olmayan Payments uygulamasında. Tekrar deneme ve başarısız tahsilat takibi kaynakta görülmedi.

Eksik:

- Ödeme durum makinesi (pending/authorized/requires_action/paid/failed/timeout) tanımlanmamış.
- Tekrar deneme politikası (aralık, üst sınır, dunning) ve zaman aşımı sözleşmesi yok.
- Olay kancalarının hangi uygulamadan tetikleneceği ve izin sınırı belirsiz.
- Server Script ödeme olaylarının kısayol olarak kullanılmayacağı talimatta yazılmamış.

Nasıl tamamlanır: payments-1 kararından sonra, aynı görevde durum makinesi ile retry/timeout kurallarını tek tablo olarak yazın. İş mantığı Server Script'e değil, controller'a ve native DocType izinlerine bağlansın.

Kaynak dayanakları: `frappe/frappe/core/doctype/server_script/server_script_utils.py:27`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:26`; `frappe/frappe/core/doctype/server_script/server_script.js:70`; `frappe/frappe/core/doctype/server_script/server_script.js:97`.

Rehber: [payment-attempt](./frappe-roadmap-contracts/payment-attempt.json). Mevcut birincil görev: `payment-attempt--implementation`.

### payments-3 — Tam/kısmi iade, ters ibraz ve ödeme itirazı yönetimi.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Taranan kurulu kaynakta (frappe, suite, suite/planlanan Frappe adaptörü) tam/kısmi iade, ters ibraz (chargeback) ya da ödeme itirazı (dispute) için hiçbir uygulama yok: DocType, controller, whitelisted API, webhook işleyicisi veya bakiye/hak düzeltme mantığı bulunmuyor. Ödemeyle ilgili tek gerçek kod, Frappe upstream'indeki frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py'deki whitelisted proxy'ler. Bunlar sitenin kendi Frappe Cloud barındırma faturası için plan, profil, ödeme yöntemi, cüzdana bakiye yükleme (top-up) checkout'u ve checkout durumu çağrılarını Central'a iletiyor. İade, itiraz, ters ibraz veya alacak dekontu (credit note) uç noktası yok. Bu proxy, SaaS operatörünün kendi müşterilerinden aldığı ödemeleri yöneten bir primitif de değil. Asıl iş mantığı uzak Central servisinde ve yerel kaynakta yok. Patch delete_payment_gateways.py, 'payments' uygulaması kurulu değilse Stripe/Razorpay/PayPal gibi ödeme ağ geçidi DocType'larını siliyor; dolayısıyla Frappe'nin kendi ödeme ağ geçidi DocType'ları da kurulu değil. Suite'teki 'reversal' eşleşmeleri Drive WebDAV kota/rollup geri alma mantığı, 'subscription' eşleşmeleri ise Mail push aboneliği; ödemeyle ilgisi yok. ERPNext kurulu değil, bu yüzden muhasebe defteri veya Credit Note primitifi de yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Ödeme denemesine bağlı, tutarı, durumu ve sağlayıcı referansı olan bir iade kaydı (DocType/şema) ve iş kuralı: kısmi iadelerin toplamı yakalanan tutarı aşamaz, aynı iade iki kez işlenmez (idempotency).
- Ters ibraz ve itiraz yaşam döngüsü (açıldı/kanıt gönderildi/kazanıldı/kaybedildi) ile bunun kaydı ve durum makinesi.
- İmzası doğrulanan, idempotent işlenen ve outbox üzerinden yayınlanan sağlayıcı webhook alıcısı (refund._, charge.dispute._).
- İade veya ters ibrazın bakiyeye, alacak dekontuna ve abonelik/hizmet hakkına etkisini belirleyen eşleme ve uygulayıcı; itiraz süresince hizmetin askıya alınıp alınmayacağı kuralı.
- ERPNext olmadığından yerel finans defteri ya da düzeltme kaydı kararı ve bunun uygulaması.
- Audit envelope ve tenant kapsamlı yetki kontrolüyle korunan headless provider API sözleşmesi (iade başlatma/sorgulama, itiraz durumu).

Nasıl tamamlanır: Mevcut bağımlılık sırası korunur: önce payment-attempt--contract ve payment-attempt--schema tamamlanır, kernel-envelope, tenant-registry, outbox ve audit-envelope sözleşmeleri hazır olur. Sonra payment-attempt--implementation kapsamında en küçük dikey dilim tek bir davranış olarak eklenir. Bu, yeni bir görev kaydı açmak anlamına gelmez. Dilim şunlardan oluşur: (1) Payment Attempt'e bağlı, tenant kapsamlı bir iade kaydı ve kısmi iadelerin toplamının yakalanan tutarı aşamayacağı kuralı; (2) önce bu kural için başarısız (RED) test, sonra uygulama (GREEN); (3) ardından sağlayıcı refund webhook'unu imza doğrulamasıyla ve idempotent işleyen alıcı, outbox ve audit kaydı; (4) itiraz/ters ibraz durum makinesi ve bakiye/hak etkisi eşlemesi ayrı bir sonraki dilim olarak gelir. Finans defteri kararı (ERPNext yok) 1. adımdan önce yazılı kayda alınır. Frappe Cloud billing proxy'si bu işe temel olarak kullanılmaz.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:73`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:324`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:14`.

Rehber: [payment-attempt](./frappe-roadmap-contracts/payment-attempt.json). Mevcut birincil görev: `payment-attempt--implementation`.

### payments-4 — Tekrarlanan istekte ikinci tahsilatı önleme ve ödeme durumu uzlaştırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe'de ilgili üç temel yapı var. (1) Integration Request DocType: ödeme ve entegrasyon isteklerinin kaydı. request_id alanı ve "Queued/Authorized/Completed/Cancelled/Failed" durum alanı var. update_status, handle_success ve handle_failure metotları durumu geçiriyor. clear_old_logs eski kayıtları siliyor (varsayılan 30 gün). (2) background_jobs.enqueue: deduplicate=True verilirse aynı job_id ile ikinci bir iş kuyruğa alınmıyor. (3) frappe_providers/cloud_billing.py ve cloud_settings.py: whitelisted POST uçları var (create_topup_checkout, get_checkout_status, reconcile_payment_setup). Bunlar yalnızca Frappe Cloud Central billing API'sine istek iletiyor; iş mantığı Central'da duruyor. Yani bu, sitenin kendi Frappe Cloud faturası; tenant müşteri tahsilatı değil. Gerçek ödeme ağ geçidi DocType'ları (Payment Gateway, Stripe/Razorpay/PayPal/Braintree/Paytm Settings) "payments" uygulamasına taşınmış. Bu uygulama kurulu değilse bir patch bu DocType'ları siliyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tenant tahsilatı için ödeme denemesi (payment attempt) DocType'ı veya durum makinesi yok.
- Kalıcı idempotency anahtarı yok: kaynağı, tenant kapsamı, saklama süresi ve benzersizlik kısıtı tanımsız. Integration Request.request_id alanında unique kısıt yok; ikinci tahsilatı engelleyen bir kontrol de yok.
- Sağlayıcıdan gelen webhook'u alan bir uç yok; imza doğrulama ve event-id tekilleştirmesi (benzersiz kayıt) de yok.
- Bağlantı koptuktan sonra sağlayıcı durumunu sorgulayan yerel bir uzlaştırma işi (scheduler veya isteğe bağlı) ve çatışma çözüm kuralı yok. Mevcut reconcile_payment_setup ve get_checkout_status yalnızca Central'a vekil çağrı; davranış sözleşmeleri bu kaynakta değil.
- Headless provider'da ödeme sözleşmesi (attempt, durum, olay) yok.

Nasıl tamamlanır: Sıra mevcut bağımlılıklara göre. 1) payment-attempt--contract: tenant + idempotency_key birleşik benzersiz anahtarı, saklama süresi, durum geçişleri, provider_event_id tekilliği ve uzlaştırma çatışma kuralını yaz. 2) payment-attempt--schema: Payment Attempt DocType'ını oluştur. (tenant, idempotency_key) ve provider_event_id için unique index koy. Integration Request'i yalnızca ham istek/yanıt günlüğü olarak yeniden kullan. 3) payment-attempt--implementation içinde tek dar davranış: aynı anahtarla gelen ikinci istek mevcut attempt'i döndürsün ve ikinci kez tahsilat çağrısı yapılmasın. Önce RED testi, sonra GREEN. 4) Ardından yinelenen webhook event-id tekilleştirmesi. 5) En son, Queued/Authorized kayıtlar için sağlayıcıyı sorgulayan uzlaştırma işi (frappe enqueue + deduplicate/job_id). Bu iş outbox ve audit sözleşmelerine bağlanacak.

Kaynak dayanakları: `frappe/frappe/integrations/doctype/integration_request/integration_request.py:33`; `frappe/frappe/integrations/doctype/integration_request/integration_request.json:90`; `frappe/frappe/utils/background_jobs.py:165`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:70`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`.

Rehber: [payment-attempt](./frappe-roadmap-contracts/payment-attempt.json). Mevcut birincil görev: `payment-attempt--implementation`.

### payments-5 — Kart verisi yerine sağlayıcı tokenı (güvenli ödeme referansı) saklama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe'de tek somut ilgili parça Frappe Cloud abonelik faturalaması proxy'si. frappe/frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py içindeki whitelisted API'ler (_assert_access ile korunuyor) kart eklemeyi hosted setup checkout'a yönlendiriyor (create_payment_method_checkout → checkout URL). Sonrasında yalnız 'reference' (confirm_payment_method_checkout) ya da gateway SDK'nın tokenize ettiği callback payload'ı (confirm_payment_method) Central'a iletiliyor. Ödeme yöntemi kaldırılırken de yalnız payment_method referansı kullanılıyor. Bu yolda PAN/CVV alanı yok ve yerel kayıt yapılmıyor; saklama Central'da (harici). Integration Request DocType'ı genel bir entegrasyon log'u: data, request_headers ve output alanları var, maskeleme yok. Suite'te ödeme yok; 'card' eşleşmeleri mail contact_card (vCard) ile ilgili. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tenant (müşteri) ödemeleri için sağlayıcı referansını saklayan bir DocType ya da şema yok: provider, payment_method_ref ve izinli metadata (marka, son 4 hane, son kullanma ay/yıl) tanımlı değil.
- Payment Gateway, Stripe, Razorpay, Braintree, PayPal ve Paytm Settings DocType'ları 'payments' app kurulu değilse patch ile siliniyor; o app kurulu değil, dolayısıyla tenant gateway entegrasyonu yok.
- PAN/CVV benzeri girdiyi reddeden bir validate kuralı ya da guard yok.
- Integration Request, Error Log ve Data Import/Export için kart verisi maskeleme ya da dışlama kuralı yok.
- Vite/PWA, Tauri2 ve WXT/MV3 istemcileri için sağlayıcının güvenli toplama yüzeyi (hosted checkout, iframe ya da SDK) entegrasyonu ve headless provider sözleşmesi yok.
- cloud_billing yalnız sitenin kendi Frappe Cloud aboneliği için çalışıyor ve Central'a bağlı; tenant ödemelerinde yeniden kullanılamaz, yalnız desen olarak örnek alınabilir.

Nasıl tamamlanır: Sıra mevcut bağımlılıkları izler. 1) payment-attempt--contract'a şu kuralları ekleyin: kart verisi backend'e hiç girmez; saklanabilecek alanlar yalnız provider, provider_payment_method_ref, brand, last4, exp_month ve exp_year; istemci toplama yüzeyi sağlayıcının hosted checkout ya da iframe/SDK'sıdır. 2) payment-attempt--schema'da bu alanlarla dar bir tenant DocType tanımlayın. Önce RED test yazın: controller validate, 13–19 haneli PAN benzeri değerleri ve cvv/cvc alanlarını reddetmeli. Sonra GREEN uygulamasını yapın. 3) Ardından payment-attempt--implementation'da sağlayıcı referansını yalnız webhook ya da confirm(reference) üzerinden kaydedin; cloud_billing'deki confirm_payment_method_checkout(reference) deseni örnek alınabilir. Aynı adımda Integration Request'e yazılan payload'lar maskelensin, bu DocType Data Export'ta referans ve izinli metadata ile sınırlansın. Bu adımları Vue Suite frontend'inden bağımsız headless provider sözleşmesi olarak tanımlayın.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:57`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:65`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:384`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`; `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/integrations/doctype/integration_request/integration_request.json:47`.

Rehber: [payment-attempt](./frappe-roadmap-contracts/payment-attempt.json). Mevcut birincil görev: `payment-attempt--implementation`.

### payments-6 — Sağlayıcı bildirimini doğrulama; geciken veya sırasız sonuçları işleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (yanlış imzanın reddi, eski olayın Paid'i geri çevirmemesi) net. Core'da genel bir /api/method uç noktası primitifi var; ancak imza doğrulama, sıralama ve monotonik durum koruması görülmedi. Server Script API'sindeki allow_guest kısayolu güvenli bir webhook sözleşmesi değildir.

Eksik:

- Webhook uç noktasının sahibi (Payments uygulaması mı, özel whitelisted metot mu) ve guest erişim sınırı tanımsız.
- İmza doğrulama, zaman damgası toleransı ve secret rotasyonu kuralı yok.
- Sırasız olaylar için monotonik geçiş kuralı (Paid'den geri dönüş yasağı) yazılmamış.
- Server Script API ile allow_guest kullanımının kısayol olarak yasaklandığı belirtilmemiş.

Nasıl tamamlanır: Durum makinesine izinli geçişleri ve imza doğrulama adımını ekleyin. Uç noktayı, Payments kurulumu ya da imza doğrulayan whitelisted bir metot kararına bağlayın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:152`; `frappe/frappe/core/doctype/server_script/server_script.json:73`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:25`.

Rehber: [payment-attempt](./frappe-roadmap-contracts/payment-attempt.json). Mevcut birincil görev: `payment-attempt--implementation`.

### crm-1 — CRM (Customer Relationship Management — müşteri ilişkileri yönetimi) ve satış.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel sitede yalnız frappe ve suite kurulu; Frappe CRM uygulaması kurulu değil. Talimatta hedef (CRM'i entegre et) ve kabul ölçütü (leadden anlaşmaya izinli API) var. Ancak CRM sürümünün frappe 17.0.0-dev ve Python 3.14 ile uyumu, kurulum kararı ve Keycloak kullanıcı/rol eşlemesi tanımlı değil. Frappe REST v1 kaynak ilkelleri mevcut, ama bu CRM yolculuğu sayılmaz.

Eksik:

- Seçilen CRM sürümü ve yerel Frappe commit adf1fd0 ile uyum eşlemesi yok
- Kurulumun koşullu kapsam kararına bağlanması ve hangi bench/sitede yapılacağı yazılmamış
- Keycloak kimliği → Frappe User/Role eşleme sözleşmesi yok
- Kabulde 'izinli API' için hangi uç noktaların (v1/v2 resource veya CRM metotları) kullanılacağı belirsiz

Nasıl tamamlanır: Önce koşullu kapsam kararını netleştir. Ardından crm-lead-bridge--implementation görevine şunları ekle: Frappe 17-dev/Py3.14 ile uyumlu CRM sürümü, kurulumun ayrı karar olduğu notu ve Keycloak rol eşleme tablosu. Kurulum ve fonksiyonel kabul not_run kalır.

Kaynak dayanakları: `suite/pyproject.toml:6`; `suite/pyproject.toml:45`; `frappe/pyproject.toml:7`; `frappe/frappe/api/v1.py:154`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `crm-lead-bridge--implementation`.

### crm-2 — Müşteri adayı, kişi, firma, fırsat ve satış aşamaları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Lead, Organization, Deal ve aşama modelleri CRM uygulamasına ait ve CRM kurulu değil. Frappe çekirdeğinde Contact/Address ve Dynamic Link var; Suite'te ise JMAP'e bağlı sanal Contact Card var. Talimat, kişi için hangi kaynağın asıl kayıt (system of record) olduğunu tanımlamıyor.

Eksik:

- Frappe Contact ile Suite sanal Contact Card (JMAP) arasındaki asıl kayıt ve senkron kararı yok
- Aşama modeli (CRM durum listesi mi, Workflow mu) ve geçiş yetkileri tanımsız
- 'İlişkiler korunur' kabulü için Link/Dynamic Link alanlarının listesi yok

Nasıl tamamlanır: crm-lead-bridge--implementation görevine üç karar ekle: kişi/firma için asıl kayıt (çekirdek Contact; Contact Card yalnız e-posta tarafı), aşama sahibi DocType ve aşama değişince doğrulanacak bağ alanları.

Kaynak dayanakları: `frappe/frappe/contacts/sidebar/contacts/contacts.json:35`; `frappe/frappe/patches/v11_0/create_contact_for_user.py:11`; `suite/suite/mail/doctype/contact_card/contact_card.json:178`; `suite/suite/mail/doctype/contact_card/contact_card.py:132`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `crm-lead-bridge--implementation`.

### crm-3 — Görüşme/not, hatırlatma, sorumlu atama ve iletişim geçmişi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Çekirdekte iletişim geçmişi için Communication DocType ilkesi var. Ancak not, görev, atama ve hatırlatma için CRM uygulaması kurulu değil; ToDo/assign kaynağı bu alıntılarda görülmüyor. Ayrıca web iletişim formu kaydı ignore_permissions ile ekliyor; headless akışta kısayol olarak kullanılmamalı.

Eksik:

- Zaman çizelgesinin kaynağı belirsiz: Communication mı, Suite Mail/JMAP mı
- Hatırlatma kanalı ve vadeyi kimin tetikleyeceği tanımsız
- Keycloak kullanıcısı → atanan kişi (User) eşlemesi yok
- ui-family-24/25 destek görevleriyle sunucu yetki sınırı ayrımı yazılmamış

Nasıl tamamlanır: crm-interaction--implementation görevine zaman çizelgesi kaynağını (Communication + atama) ve izinli API sınırını ekle. ignore_permissions içeren yolların kullanılmayacağını açıkça yaz.

Kaynak dayanakları: `frappe/frappe/www/contact.py:61`; `frappe/frappe/www/contact.py:67`; `frappe/frappe/www/contact.py:59`.

Rehber: [crm-interaction](./frappe-roadmap-contracts/crm-interaction.json). Mevcut birincil görev: `crm-interaction--implementation`.

### crm-4 — Müşteri tekilleştirme, kayıt birleştirme ve sahiplik değişikliği.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta merge parametreli whitelisted rename_doc ve if_owner izin mantığı var. Suite'teki e-posta adresi tekilleştirmesi yalnız posta önerileri için; müşteri tekilleştirmesi değil. Talimat ise yerel v17-dev yerine version-15 kaynağına atıf yapıyor ve eşleşme kuralı, çakışma çözümü ve sahiplik denetim sözleşmesi içermiyor.

Eksik:

- Kaynak atıfı version-15; yerel commit adf1fd0 (17.0.0-dev) ile eşlenmemiş
- Mükerrer eşleşme anahtarları ve birleştirme öncesi önizleme/onay yok
- Merge'de alan değeri çakışmalarının çözümü ve geri alınamazlık uyarısı yok
- Sahiplik değişikliğinin denetim izi (track_changes/Version) ve yetki rolü tanımsız

Nasıl tamamlanır: Kaynak atfını yerel frappe/client.py rename_doc'a güncelle. Görev kapsamını kısa tut: eşleşme anahtarları, merge önizlemesi ve yetkili rol. Sahiplik değişikliğini track_changes açık DocType üzerinden izinli save ile denetlenecek biçimde tanımla.

Kaynak dayanakları: `frappe/frappe/client.py:265`; `frappe/frappe/client.py:271`; `frappe/frappe/permissions.py:328`; `suite/suite/mail/store/indexes/email_address.py:97`.

Rehber: [crm-lead-bridge](./frappe-roadmap-contracts/crm-lead-bridge.json). Mevcut birincil görev: `crm-lead-bridge--implementation`.

### crm-5 — Müşteri başarısı: hesap sağlığı, kullanım düşüşü ve yenileme riski.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de genel otomasyon primitive'leri var, hesap sağlığına özgü bir şey yok. (1) Automation Flow DocType'ında 'Date Based' tetikleyici bulunuyor: date_field, date_offset ve Before/After seçeneği. scheduler.process_date_based her saat çalışıyor ve hooks.py'de kayıtlı. Seçilen tarih alanı bugünkü ofsete denk gelen belgeleri kuyruğa alıyor ve her belge için günde bir kez tetikliyor; kodun kendi yorumu da '3 days Before renewal' örneğini veriyor. (2) Cron ile çalışan 'Scheduled' tetikleyici, filtre ve koşula göre belge seçebiliyor. (3) Eylem kayıt defterinde CreateDocument (ör. ToDo/görev üretimi), AssignToUser, SendNotification, SetFieldValue ve IncrementFieldValue var. Bunlar yaklaşan yenilemeye görev üretmek için yeniden kullanılabilir. Suite modülleri (Drive/Slides/Writer/Sheets/Meet/Mail/Calendar/Suite Core) içinde CRM, hesap veya abonelik modeli yok; 'renewal' eşleşmeleri yalnız Mail push-subscription yenilemesine ait. sağlık veya risk sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Hesap/müşteri ve yenileme tarihini taşıyan bir DocType yok (ERPNext/CRM kurulu değil).
- Kullanım olayı kaynağı, zaman penceresi ve kullanım düşüşü hesaplaması yok.
- Sağlık/risk puanı motoru yok: formül, eşikler ve açıklanabilirlik çıktısı (hangi kuralın ne kadar puan kattığı) bulunmuyor. Puanı saklayan alan ya da puan geçmişi de yok.
- Kullanım düşüşü ile yenileme yakınlığını tek bir puanda birleştiren mantık yok. Automation Flow koşulları yalnız belge alanlarını değerlendiriyor, zaman serisi kullanım verisini toplamıyor.
- crm-6 görev üretimine bağlanan bir sözleşme yok.
- Headless provider'da account-health uç noktası ya da GenUI'ye dönük sağlayıcı sözleşmesi yok.
- system_health_report site işletim sağlığına ait, müşteri sağlığıyla ilgisi yok.

Nasıl tamamlanır: Mevcut bağımlılık sırası korunmalı. Önce account-health--contract yazılmalı: kullanım olayının kaynağı ve penceresi (ör. son 30 gün ile önceki 30 gün karşılaştırması), yenileme tarihi alanının sahibi ve iki kurallı açıklanabilir puan biçimi (kural, ağırlık, girdi değeri). Ardından account-health--schema: hesap kaydında renewal_date, usage_events ve health_score/health_reasons alanlarının yeri. Sonra en dar davranış: bir puan hesaplayıcısı ve yalnız bu davranış için RED/GREEN testi. Görev üretimi yeni kodla yazılmamalı. Yenileme tarihi için Automation Flow Date Based tetikleyicisi ile CreateDocument/AssignToUser eylemleri, puan eşiği için Scheduled tetikleyici ve koşul kullanılmalı. Headless provider'a salt okunur puan ve gerekçe projeksiyonu en son eklenmeli.

Kaynak dayanakları: `frappe/frappe/automation_engine/scheduler.py:180`; `frappe/frappe/automation_engine/scheduler.py:222`; `frappe/frappe/hooks.py:292`; `frappe/frappe/automation_engine/actions/core.py:97`; `frappe/frappe/automation_engine/actions/core.py:299`.

Rehber: [account-health](./frappe-roadmap-contracts/account-health.json). Mevcut birincil görev: `account-health--implementation`.

### crm-6 — Müşteri devreye alma kontrol listesi ve yenileme müdahale görevleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe uygulama kaynağında genel amaçlı yapı taşları var. (1) Automation Flow'da 'Doc Created' ve 'Date Based' tetikleyicileri bulunuyor. Date Based zamanlayıcı, tarih alanı hedef güne eşit olan kayıtları kuyruğa alıyor. Aynı gün işlenmiş ya da kuyrukta bekleyen kayıtlar atlanıyor; böylece belge başına günde bir tetikleme sağlanıyor. (2) CreateDocument (new_doc + insert) ve AssignToUser (assign_to.add) aksiyonları var. assign_to._add, aynı referans ve aynı kullanıcı için açık bir ToDo varsa yenisini oluşturmuyor. (3) Assignment Rule, koşula göre ToDo ataması yapıyor. (4) Module Onboarding ve Onboarding Step bir kontrol listesi modeli sunuyor (adımlar, is_complete/is_skipped, rol izni). Ancak ilerleme müşteri başına değil, site/modül genelinde tutuluyor. Suite'teki onboarding (hooks.py:279), masaüstü kurulum sihirbazının yerine geçiyor; müşteri onboarding'i değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kurulu kaynakta Customer/CRM DocType'ı ve 'yeni müşteri' olayı yok (ERPNext/CRM kurulu değil)
- Müşteri başına örneklenen bir kontrol listesi şablonu ve tamamlanma modeli yok; Module Onboarding site genelinde çalışıyor
- Yenileme tarihi ya da risk alanı yok, crm-5 risk çıktısıyla entegrasyon da yok
- Müşteri+dönem anahtarlı kalıcı tekil müdahale görevi yok. Mevcut tekrar-önleme yalnız gün bazlı ve açık durumdaki ToDo/kullanıcı kapsamında çalışıyor; görev kapanınca ya da sorumlu değişince yeni görev oluşabilir
- Bu kurallar için Automation Flow fixture'ı, headless provider API sözleşmesi ve React/AntD UI yok
- Runtime functionalAcceptance: not_run

Nasıl tamamlanır: Sıra şöyle olmalı. (1) onboarding-checklist--contract/--schema: müşteri kaynak DocType'ı belirlenmeli. Customer Onboarding Template/Item ve müşteri başına checklist örneği DocType'ları tanımlanmalı; örneğe (customer, template) tekil kısıtı, müdahale görevine ise (customer, renewal_period) tekil kısıtı konmalı. (2) --implementation: 'Doc Created' tetikleyicili Automation Flow, CreateDocument ile checklist örneğini oluşturmalı. crm-5 risk alanını kullanan 'Date Based'/'Field Value Changed' akışı ise müdahale kaydını tekil anahtarla oluşturmalı ve AssignToUser ile tek sorumluya atamalı. Önce bu tek dar davranış için RED/GREEN testi yazılmalı. (3) Ardından headless provider sözleşmesi ve ui-family-37 eklenmeli.

Kaynak dayanakları: `frappe/frappe/automation/doctype/automation_flow/automation_flow.json:89`; `frappe/frappe/automation_engine/scheduler.py:214`; `frappe/frappe/automation_engine/actions/core.py:123`; `frappe/frappe/automation_engine/actions/core.py:319`; `frappe/frappe/desk/form/assign_to.py:74`; `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:43`.

Rehber: [onboarding-checklist](./frappe-roadmap-contracts/onboarding-checklist.json). Mevcut birincil görev: `onboarding-checklist--implementation`.

### calendar-1 — Calendar (takvim) ve appointment (randevu) yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat Frappe v15 Event şemasına ve Google Calendar belgesine dayanıyor. Ancak kurulu yerel yapıda takvim, Suite uygulamasındaki JMAP tabanlı Calendar ve Calendar Event DocType'larıyla sağlanıyor. Kayıtlar db_insert/load_from_db üzerinden JMAP sunucusuna yazılıp okunuyor; izinler hooks.py üzerinden has_permission ile tanımlanmış. Takvim ve etkinlik için kaynak primitifleri var. Randevu/rezervasyon ürününe ait bir kaynak bu excerpt'te görülmüyor. Kabul ölçütü ('ayrı akışlarda çalışsın') ölçülebilir değil.

Eksik:

- Yeniden kullanım sınırı yok: Frappe core Event (v17 kaynağı excerpt'te görünmüyor) mı, yoksa Suite Calendar Event/JMAP mı kullanılacak, karar verilmemiş.
- v15 kaynak referansları yerel Frappe 17.0.0-dev ve Suite 0.0.1 kaynağına eşlenmemiş.
- Randevu kavramı (hizmet, süre, slot, rezervasyonu kimin yaptığı) ve misafir/harici kullanıcı erişim modeli tanımlı değil.
- Headless istemcinin hangi whitelisted Suite metotlarını kullanacağı, rate limit etkisi ve JMAP/Stalwart bağımlılığı belirtilmemiş.
- Kabul ölçütü somut değil: oluşturma, zaman gösterimi ve izin reddi senaryoları ayrı ayrı yazılmalı.

Nasıl tamamlanır: native-calendar-event--implementation görevine kısa bir karar notu eklenmeli: etkinlik için Suite Calendar Event/JMAP kullanılsın, randevu ise ayrı ve koşullu kapsam olarak tanımlansın. v15 Event referansları yerel Suite kaynak yollarıyla değiştirilmeli. Kabul ölçütü üç somut senaryoya bölünmeli: oluşturma, saat dilimiyle gösterim ve yetkisiz okumada PermissionError.

Kaynak dayanakları: `suite/pyproject.toml:6`; `suite/suite/calendar/doctype/calendar_event/calendar_event.py:175`; `suite/suite/calendar/doctype/calendar/calendar.py:75`; `suite/suite/hooks.py:177`; `suite/suite/hooks.py:61`.

Rehber: [native-calendar-event](./frappe-roadmap-contracts/native-calendar-event.json). Mevcut birincil görev: `native-calendar-event--implementation`.

### calendar-2 — Uygunluk, katılımcılar, kaynak rezervasyonu ve çakışma denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: eşzamanlı iki çakışmadan yalnız biri kabul edilmeli. Ancak talimat Frappe Database API'ye (satır kilidi) dayanıyor. Yerel etkinlikler ise JMAP sunucusunda tutuluyor, bu yüzden Frappe DB kilidi bu verilere uygulanamaz. Kaynakta free/busy alanı, availability'ye dahil etme ayarı, Principal/getAvailability hakkı, user/group/resource principal tanımı ve katılımcı genişletme var. Kaynak kapasitesi ve atomik çakışma engeli kaynakta görülmüyor.

Eksik:

- Çakışma kontrolünün nerede yapılacağı (Frappe tarafında kilit/kayıt mı, JMAP sunucu tarafında mı) ve atomiklik sözleşmesi tanımlı değil.
- 'Kaynak' modeli (oda/ekipman principal mı, Frappe DocType mı) ve kapasite kuralı belirtilmemiş.
- Availability sorgusu (Principal/getAvailability) için headless erişim yolu ve izin sınırı belirtilmemiş.
- Uygunluk, kaynak ve çakışma için tekrarlayan etkinlik açılımının nasıl hesaba katılacağı tanımlı değil.

Nasıl tamamlanır: Görev notuna şu kararlar eklenmeli: (1) kaynak = JMAP resource principal mı yoksa Frappe DocType mı, (2) çakışma engelinin tek yazım noktası ve kullanılacak kilit mekanizması. Mevcut kabul ölçütü korunmalı; tekrarlayan örnekle çakışma senaryosu bütçe dahilinde eklenmeli.

Kaynak dayanakları: `suite/suite/calendar/doctype/calendar_event/calendar_event.json:190`; `suite/suite/calendar/doctype/calendar/calendar.json:122`; `suite/suite/calendar/doctype/calendar_rights/calendar_rights.json:89`; `suite/suite/calendar/doctype/calendar_rights/calendar_rights.json:26`; `suite/suite/calendar/doctype/calendar_event/mailing_lists.py:12`.

Rehber: [native-calendar-event](./frappe-roadmap-contracts/native-calendar-event.json). Mevcut birincil görev: `native-calendar-event--implementation`.

### calendar-3 — Tekrarlayan etkinlik, saat dilimi ve davet yanıtları.

Kaynak durumu: **VAR**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel Suite kaynağında ilgili primitifler doğrudan var: JSCalendar recurrenceRule ve timeZone alanları JMAP'e yazılıyor, ICS çıktısına VTIMEZONE ekleniyor. RSVP hem giriş yapmış kullanıcı hem imzalı bağlantı için var ve occurrence (recurrence_id) bazında kaydediliyor. Talimattaki DST kabul ölçütü iyi. Ancak talimat v15 Event/Google'a dayanıyor ve bu yerel kaynağa eşlenmemiş. Fonksiyonel doğrulama yapılmadı (not_run).

Eksik:

- Talimat, Suite record_rsvp/resolve_rsvp ve JSCalendar alanlarına eşlenmemiş.
- DST açılımını JMAP sunucusunun mu yoksa istemcinin mi hesapladığı ve doğruluğun kimde olduğu belirtilmemiş.
- İmzalı RSVP bağlantısının giriş istemeyen yetki sınırı (süre, tekrar kullanım) headless istemci için sözleşme olarak yazılmamış.
- Seri yanıtı ile occurrence yanıtı için ayrı kabul ölçütü yok.

Nasıl tamamlanır: Görev notunda kaynak eşlemesi v15 Event'ten Suite'e çevrilmeli (jmap_events, rsvp.record_rsvp, ics). DST kabul ölçütüne saat dilimi adı ve beklenen yerel saat eklenmeli. Occurrence RSVP kabulü ayrı senaryo olarak yazılmalı.

Kaynak dayanakları: `suite/suite/calendar/jmap_events.py:62`; `suite/suite/calendar/jmap_events.py:63`; `suite/suite/calendar/doctype/calendar_event/ics.py:66`; `suite/suite/calendar/api/rsvp.py:120`; `suite/suite/calendar/api/rsvp.py:9`.

Rehber: [native-calendar-event](./frappe-roadmap-contracts/native-calendar-event.json). Mevcut birincil görev: `native-calendar-event--implementation`.

### calendar-4 — İptal/erteleme, hatırlatma ve dış takvim eşitleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta iptal (iTIP CANCEL, STATUS:CANCELLED), tek occurrence iptali/güncellemesi, sürükleyerek yeniden planlama, alert (display/email/audio) ve default alert var. Dış takvimle etkileşim iMIP/ICS e-postası ve Calendar Exchange içe/dışa aktarımıyla sağlanıyor. Talimat ise Google Calendar çift yönlü senkronuna ve Frappe Notification'a dayanıyor; bunların v17 kaynağı excerpt'te görünmüyor. Sürekli çift yönlü harici senkron kaynakta görülmüyor. 'Telafi davranışı' tanımsız.

Eksik:

- Harici senkron yöntemi seçilmemiş: Google Calendar entegrasyonu mu, iTIP/iMIP mi, ICS exchange mi.
- Erteleme ve iptalde SEQUENCE/iTIP güncellemesinin karşı takvime ulaştığını gösteren kabul ölçütü yok.
- Tekil tekrar iptali için 'seçilen telafi davranışı' tanımlanmamış.
- Hatırlatmalar için JMAP alerts ile Frappe Notification arasındaki sorumluluk ayrımı yok.

Nasıl tamamlanır: Görev notuna harici senkron kararı eklenmeli (önerilen: mevcut iTIP/ICS yolu; Google entegrasyonu ayrı ve koşullu). Tekil occurrence iptali için beklenen sonuç somut yazılmalı. Hatırlatmalar için JMAP alerts tek kaynak olarak işaretlenmeli.

Kaynak dayanakları: `suite/suite/calendar/doctype/calendar_event/ics.py:154`; `suite/suite/calendar/install.py:41`; `suite/suite/calendar/install.py:53`; `suite/suite/calendar/doctype/calendar_event/fields.py:44`; `suite/suite/calendar/doctype/calendar_exchange/calendar_exchange.py:69`; `suite/suite/calendar/api/invites.py:143`.

Rehber: [native-calendar-event](./frappe-roadmap-contracts/native-calendar-event.json). Mevcut birincil görev: `native-calendar-event--implementation`.

### analytics-1 — GTM (Google Tag Manager — Google etiket yöneticisi) bağlantısı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel v17-dev Frappe kaynağında GTM'ye özel alan, yükleyici veya API yok. İlgili, upstream'e ait (native) yapı taşları yalnız Frappe'nin sunucuda ürettiği sayfalarda çalışıyor. (1) Website Settings şemasında google_analytics_id, google_analytics_anonymize_ip ve serbest head_html alanları var. head_html, templates/base.html içinden includes/head.html aracılığıyla Frappe web sayfalarına kaçışsız basılıyor. Bir GTM snippet'i bu alana elle yapıştırılabilir, ama izin kontrolü yapılmıyor. (2) www/website_script.py ve website_script.js, GA kimliğini Website Settings'ten ya da site config'ten okuyor. Ardından eski Universal Analytics analytics.js dosyasını yükleyip ga('send','pageview') çağırıyor. Bu yalnız developer_mode kapalıyken oluyor ve izin kontrolü yok. www/desk.py ile desk.html, frappe.conf'taki GA kimliğiyle aynı eski GA snippet'ini Desk'e ekliyor. (3) Suite'in Vue/Vite SPA kabuğu (suite/suite/www/suite.html) bağımsız bir HTML. base.html'i genişletmiyor ve ne head_html ne de website_script içeriyor. Bu yüzden hosted GA/head_html ayarı Suite SPA'ya uygulanmıyor. Suite router'ındaki router.afterEach yalnız uygulama runtime'larına aktarım yapıyor, analitik üretmiyor. Analitik, GTM veya izin sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- GTM konteyner kimliği için ayar ya da provider sözleşmesi yok. Her iki kökte googletagmanager, gtm, dataLayer ve gtag için yapılan aramada davranış eşleşmesi çıkmadı; yalnız yarn.lock hash'lerine ve derlenmiş/binary gürültüye rastlandı.
- Consent Mode ve kategori bazlı izin sırası yok. analytics-6 izin kararına bağlanan bir yükleme kapısı da yok.
- Headless React/TanStack Router kabuğunda GTM yükleyicisi yok. Rota geçişine bağlı, tek seferlik page_view sözleşmesi ve tekrarı önleyici yapı da yok.
- GTM için CSP/nonce kuralı yok. Mevcut head_html ve GA enjeksiyonları ham inline script.
- Tauri2 ve WXT/MV3 kabukları için GTM'yi dışarıda tutma ya da alternatif kararı kaynakta yok.
- Native GA yolu kullanımdan kalkmış Universal Analytics analytics.js'e bağlı. Bu yol hosted Frappe sayfalarıyla sınırlı ve Suite SPA ile headless kabuğa otomatik uygulanmıyor.

Nasıl tamamlanır: Sıra: 1) analytics-consent--contract içinde provider tarafını tanımla. Frappe headless kabuğa yalnız tenant'a ait GTM container ID'sini ve izin politikası meta verisini salt okunur verir. Script veya head_html enjekte etmez. Hosted Website Settings içindeki google_analytics_id ve head_html alanları 'hosted-only, headless'a uygulanmaz' diye etiketlenir. 2) analytics-consent--implementation görevinde ilk dar davranış olarak yalnız web/PWA (Vite) kabuğunu hedefle. GTM, Consent Mode varsayılanı 'denied' iken ve yalnız analytics-6 izni verildikten sonra yüklenir. page_view, TanStack Router'ın tek geçiş olayından ve rota başına bir kez üretilir. Önce RED test yaz, sonra GREEN. 3) CSP/nonce kuralını aynı adımda ekle. 4) Tauri2 ve WXT/MV3 için GTM'yi dışarıda tut ya da ayrı karar notu yaz. Mevcut task ID'leri ve bağımlılıklar korunur; yeni görev kaydı açılmaz.

Kaynak dayanakları: `frappe/frappe/website/doctype/website_settings/website_settings.json:261`; `frappe/frappe/templates/includes/head.html:2`; `frappe/frappe/www/website_script.py:34`; `frappe/frappe/www/website_script.js:15`; `suite/suite/www/suite.html:37`; `suite/frontend/src/router/index.ts:233`.

Rehber: [analytics-consent](./frappe-roadmap-contracts/analytics-consent.json). Mevcut birincil görev: `analytics-consent--implementation`.

### analytics-2 — Google Analytics ve Yandex Metrica adaptörleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de yalnız Google Analytics için eski, sunucuda şablonla üretilen bir ilkel var. Website Settings DocType'ında google_analytics_id ve google_analytics_anonymize_ip alanları bulunuyor. www/website_script.py bu değerleri Website Settings'ten veya site config'ten okuyor; developer_mode açıkken bunları bağlama eklemiyor. www/website_script.js, web sitesi sayfalarına legacy analytics.js (ga('create'), isteğe bağlı anonymizeIp, ga('send','pageview')) enjekte ediyor. Desk tarafında www/desk.py yalnız frappe.conf'tan okuyor; desk.html, templates/includes/app_analytics/google_analytics.html şablonunu ekliyor. Bu şablon her mousedown olayında data-doctype değerini, yoksa tıklanan öğenin innerText/textContent/title metnini ve route'u GA'ya olay olarak gönderiyor; bu tasarım PII/tenant verisi sızıntısı riski taşıyor. Ayrıca web_page_view'e fingerprint tabanlı sunucu içi görüntüleme kaydı var; bu dış sağlayıcı adaptörü değil. Suite'in Vue frontend'inde GA/Metrica/consent kodu yok. yarn.lock'taki workbox-google-analytics ve @firebase/analytics yalnız bağımlılık kayıtları; frontend kaynağında kullanılmıyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Yandex Metrica adaptörü yok: 'yandex' eşleşmeleri yalnız Yandex.Mail e-posta ön ayarı; 'metrika|metrica' hiç eşleşmedi.
- Sağlayıcıdan bağımsız adaptör arayüzü (track/identify/consent/page) yok; GA, sabit Jinja şablonu olarak gömülü.
- Consent/onay kapısı yok: GA, ID tanımlıysa koşulsuz yükleniyor. Web tarafında yalnız view tracking için doNotTrack kontrolü var; GA için yok.
- PII ve tenant verisi için yasak alan listesi, hash'leme ya da alan eşleme yok. Desk'teki GA şablonu innerText ve route'u filtrelemeden gönderiyor.
- analytics-4 ortak olay şeması ile sağlayıcı alan eşlemesi yok.
- React/AntDesign headless istemcisi için Frappe provider sözleşmesi yok: tenant bazlı sağlayıcı yapılandırması ve izin durumu sunan bir API yok.
- Mevcut GA kodu legacy analytics.js/UA ga() API'sini kullanıyor; GA4 gtag ve Consent Mode yok (sağlayıcı tarafındaki geçerliliğine kaynak koddan bakılarak karar verilemez).
- Webvisor ya da oturum kaydının varsayılan olarak kapalı olacağı kuralı yok.

Nasıl tamamlanır: Önerilen sıra: (1) analytics-consent--contract kapsamında sağlayıcıdan bağımsız adaptör sözleşmesi tanımlanmalı: track/page/consent, analytics-4 olay şeması, izinli alan listesi ve tenant_id/user_id hash kuralı. Webvisor/oturum kaydı varsayılan olarak kapalı olmalı. (2) Mevcut upstream GA şablonları headless/SaaS profilinde devre dışı tutulmalı; özellikle desk.html'deki mousedown innerText olayı. Bunun için upstream kodu değiştirmek yerine site config'te google_analytics_id tanımlanmamalı. (3) analytics-consent--implementation görevinde ilk dar davranış React tarafında yapılmalı: consent yokken hiçbir sağlayıcı script'inin yüklenmediğini ve ağ isteği gitmediğini gösteren, önce RED sonra GREEN kanıtlı bir test. (4) Ardından GA4 adaptörü, izinli tek örnek olay ve PII filtresiyle eklenmeli. (5) Yandex Metrica adaptörü, KVKK yurt dışı aktarım kararı ve karar sahibi netleşene kadar feature flag ile kapalı kalmalı. Frappe tarafında gerekirse yalnız tenant bazlı sağlayıcı ID'si ve izin durumunu döndüren dar bir provider endpoint'i eklenmeli; GenUI uygulanmamalı.

Kaynak dayanakları: `frappe/frappe/website/doctype/website_settings/website_settings.json:220`; `frappe/frappe/www/website_script.py:34`; `frappe/frappe/www/website_script.js:15`; `frappe/frappe/www/desk.py:88`; `frappe/frappe/www/desk.html:94`; `frappe/frappe/templates/includes/app_analytics/google_analytics.html:22`.

Rehber: [analytics-consent](./frappe-roadmap-contracts/analytics-consent.json). Mevcut birincil görev: `analytics-consent--implementation`.

### analytics-3 — UTM (Urchin Tracking Module — kampanya kaynağı etiketleme sistemi) kod yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Notta 'ortak kampanya kod yönetimi saptanmadı' deniyor; URL üretici ve isimlendirme açısından doğru. Fakat yerel kaynakta UTM'e yakın ilkel parçalar var. Web Page View tabanlı Website Analytics raporu source/campaign/medium üzerinden gruplama yapabiliyor. Website Route Redirect sorgu parametrelerini hedef URL'ye taşıyabiliyor. Talimat bu ilkel parçaları anmıyor ve headless yakalama ile hosted kayıt arasındaki ayrımı yapmıyor.

Eksik:

- Web Page View'daki source/campaign/medium alanlarının yeniden kullanılıp kullanılmayacağına ya da yalnız hosted sayfalarla sınırlı kalacağına dair bir karar yok.
- Headless SPA'da UTM'in yakalanma, saklanma ve atfedilme kuralı tanımsız (ilk dokunuş mu, son dokunuş mu; süre).
- Zorunlu alanlar, izinli değer sözlüğü ve büyük/küçük harf normalizasyonu tanımsız.
- Kampanya kaydının hangi DocType'ta tutulacağı ve izin rolleri belirsiz.

Nasıl tamamlanır: utm-definition--implementation görevine şunlar eklenmeli: Web Page View alanları ve forward_query_parameters'ın headless akıştaki rolü; asgari UTM sözlüğü; normalizasyon kuralı. Kampanya kaydı için yeni ORM yazılmamalı, standart DocType ve izinler kullanılmalı.

Kaynak dayanakları: `frappe/frappe/website/report/website_analytics/website_analytics.js:39`; `frappe/frappe/website/report/website_analytics/website_analytics.js:40`; `frappe/frappe/website/doctype/website_route_redirect/website_route_redirect.json:41`.

Rehber: [utm-definition](./frappe-roadmap-contracts/utm-definition.json). Mevcut birincil görev: `utm-definition--implementation`.

### analytics-4 — Analitik olay kataloğu, dönüşüm hedefleri ve kampanya adlandırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güçlü: şema dışı olay reddedilir, dönüşüm mükerrersiz işlenir. Kataloğun saklanması için Frappe'nin izinli DocType oluşturma ve izin kontrolü ilkel parçaları mevcut. Ancak olay şeması doğrulaması ve tekilleştirme kaynakta yok. Reddin nerede yapılacağı (istemci, sunucu ya da sağlayıcı) belirsiz.

Eksik:

- Şema doğrulamasının yeri ve otoritesi tanımsız; istemci tarafı kontrol güvenlik sınırı sayılmamalı.
- Olay sürümleme ve geriye uyumluluk kuralı yok.
- Dönüşüm için idempotency anahtarı tanımlanmamış.
- Katalog GenUI ve query-action kayıtlarından ayrı tutulmalı; bu ayrım talimatta yazılı değil.

Nasıl tamamlanır: analytics-event-spec--implementation görevinde katalog sürümlü bir DocType olarak native izinlerle tanımlanmalı. Doğrulama ve idempotency sunucu tarafında, tek bir uç noktada yapılmalı. GenUI ve query-action kayıtlarıyla birleştirilmemesi açıkça yazılmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/permissions.py:82`.

Rehber: [analytics-event-spec](./frappe-roadmap-contracts/analytics-event-spec.json). Mevcut birincil görev: `analytics-event-spec--implementation`.

### analytics-5 — Kullanıcı etkinleşmesi, özellik kullanımı, elde tutma ve dönüşüm akışları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü olay ile zaman penceresi eşleşmesine dayanıyor; anlamlı. Yerel Website Analytics raporu yalnız sayfa görüntüleme ve tekil ziyaretçi sayısı veriyor, en fazla 250 satır dönüyor ve System Manager ile Website Manager rollerine kapalı. Aktivasyon, kohort ve retention hesabı kaynakta yok.

Eksik:

- Aktivasyon olayı ve retention penceresi (D1/D7/D30) somut tanımlanmamış.
- Hesaplamanın Frappe raporunda mı yoksa harici analitik araçta mı yapılacağına dair veri deposu kararı yok.
- Tenant izolasyonu ve rapor rol eşlemesi yazılmamış; mevcut rapor tenant'a duyarlı değil.
- Frappe Reports kaynağı sürümsüz dokümana bağlanmış; v17-dev ile eşleme yok.

Nasıl tamamlanır: analytics-event-spec--implementation altında bir aktivasyon ve bir retention tanımı (olay, pencere, kohort anahtarı) belgelenmeli; hesaplama yeri seçilmeli. Website Analytics yalnız hosted sayfa ölçümü olarak etiketlenmeli.

Kaynak dayanakları: `frappe/frappe/website/report/website_analytics/website_analytics.py:53`; `frappe/frappe/website/report/website_analytics/website_analytics.py:39`; `frappe/frappe/website/report/website_analytics/website_analytics.json:24`.

Rehber: [analytics-event-spec](./frappe-roadmap-contracts/analytics-event-spec.json). Mevcut birincil görev: `analytics-event-spec--implementation`.

### analytics-6 — İzin durumuna göre etiket çalıştırma; hassas veriyi ölçümden çıkarma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream-native Frappe kaynağında şu primitifler var. (1) Site düzeyindeki System Settings.enable_telemetry anahtarı Pulse capture'ı açıp kapatıyor (frappe/frappe/utils/telemetry/pulse/client.py is_enabled). Anahtar kurulum sihirbazında kapatılabiliyor. Sentry DSN de aynı ayara bağlı: frappe/frappe/www/desk.py ve suite/suite/www/suite.py:42. (2) Pulse kullanıcıyı anonimleştiriyor (anonymize_user). Guest için boot_config user=null dönüyor. (3) frappe/ui/src/telemetry/telemetry.ts içinde disable() var; isEnabled=false yapıp client.stop() çağırıyor. Rota varsayılan olarak PII-safe desen yoluna indiriliyor (scrubRoute). anonymousMode için cookieless/client seçenekleri var. (4) Desk tarafında TelemetryManager.disable() sağlayıcıları boşaltıyor (frappe/frappe/public/js/telemetry/index.js). (5) Website view tracking navigator.doNotTrack değerine uyuyor. api.py, local_fixture.py) içinde consent, telemetri ya da analitik kodu yok. Suite'in Vue frontend'i yalnız Sentry DSN'ini site ayarına bağlıyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kullanıcı ya da ziyaretçi bazında consent kaydı yok: model, hukuki dayanak, sürüm ve kanıt alanları bulunmuyor. enable_telemetry yöneticinin site/tenant genelinde verdiği bir ayar; son kullanıcı rızası değil.
- Google Analytics (www/website_script.js, templates/includes/app_analytics/google_analytics.html) google_analytics_id tanımlıysa rıza kontrolü olmadan yükleniyor ve pageview gönderiyor. Google Consent Mode basic/advanced desteği yok. İzin yokken sıfır istek kriteri karşılanmıyor.
- Opt-out yeni capture'ı durduruyor ama kuyruktaki Pulse eventleri yine gönderiliyor (Consent gates capture, not delivery). Bu, geri çekmede durdurma kriteriyle çelişiyor.
- Geri çekmenin Tauri, PWA ve WXT kabuklarına yayılması için kod yok. React/AntD headless frontend için consent sağlayıcı sözleşmesi de yok.
- Hassas alan yasak listesi yok: payload'u Frappe alan izinleri, permlevel ya da tenant verisiyle süzen bir mekanizma bulunmuyor. Yalnız rota scrub ve user anonimleştirme var.
- Sunucu monitor/request IP kaydı ön yüz rızasının kapsamı dışında. Ayrı bir saklama maddesi olarak kalıyor.

Nasıl tamamlanır: En küçük adım ve sırası: (1) analytics-consent--contract tamamlanmalı. Bunun için planlanan Frappe adaptörü'da salt-okuma bir consent durum sözleşmesi tanımlanmalı: kategori, sürüm, zaman damgası, kaynak. (2) Consent kaydı için tek bir DocType ve whitelisted get/set API'si eklenmeli. Önce RED testi yazılmalı: izin yokken etiket yapılandırması dönmemeli. (3) React frontend'de basic blocking uygulanmalı: GA/Pulse yükleyicisi consent=granted olmadan hiç çağrılmamalı. (4) Geri çekmede client.stop() çağrılmalı ve kullanıcının kuyruğu temizlenmeli. Bunun için send_queued_events davranışı ayrıca kararlaştırılmalı. (5) Hassas alan denylist'i Frappe meta/permlevel ile payload filtresine bağlanmalı. Tauri/PWA/WXT yayılımı bu adımlardan sonra gelir.

Kaynak dayanakları: `frappe/frappe/utils/telemetry/pulse/client.py:20`; `frappe/frappe/utils/telemetry/pulse/client.py:144`; `frappe/ui/src/telemetry/telemetry.ts:24`; `frappe/ui/src/telemetry/telemetry.ts:46`; `frappe/frappe/www/website_script.js:4`; `suite/suite/www/suite.py:42`.

Rehber: [analytics-consent](./frappe-roadmap-contracts/analytics-consent.json). Mevcut birincil görev: `analytics-consent--implementation`.

### analytics-7 — Deney yönetimi: kullanıcı gruplarına ayırma, karşılaştırma ve sonuç izleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de yalnız pazarlama atfı düzeyinde bir varyant karşılaştırma ilkel parçası var. Desk'teki UTM izleme URL'si üreticisinin 'content' alanı, açıklamasında A/B testi için reklam varyantlarını ayırmak amacıyla tanımlanıyor (utils.js:2178). Guest erişimli make_view_log; source, campaign, medium, content ve istemcinin verdiği visitor_id değerlerini 'Web Page View' DocType'ına deferred_insert ile yazıyor. Bu yalnız site izleme ayarı açıkken yapılıyor (is_tracking_enabled). 'Website Analytics' raporu group_by=content seçeneğiyle her varyant için toplam ve tekil görüntülenme sayısını aynı from_date–to_date penceresinde hesaplıyor. Varyantlar dışarıdan, el ile URL etiketiyle belirleniyor. Sistem kullanıcıyı gruba atamıyor ve atamayı saklamıyor. Suite'te yalnız Sheets/collab için ön yüz özellik bayrakları bulundu; bunlar deney değil. Suite'in Vue ön yüzü bu maddeyle ilgisiz. deney ya da analitik sözleşmesi yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Deney/Varyant DocType'ı ve yaşam döngüsü yok (taslak, çalışıyor, durdu); hedef kitle, trafik oranı ve başlangıç/bitiş alanları da yok.
- Deterministik ve kalıcı grup ataması yok: atama anahtarı (kullanıcı/tenant/visitor), hash/seed ve atama kaydı tanımsız. Mevcut visitor_id istemciden geliyor ve doğrulanmıyor.
- Sayfa görüntülenmesi dışındaki iş metrikleri ve dönüşüm olayları yok; guardrail metriği, istatistiksel karşılaştırma (anlamlılık/güven aralığı) ve örneklem kuralı yok.
- İzin durumuna (analytics-6) ve olay kataloğuna (analytics-4) bağlantı yok. Mevcut tek kapı, site genelindeki izleme ayarı.
- Deney ile özellik bayrağı ayrımı ve sunucu tarafında varyant yetkisi yok; atamanın tenant izolasyonu da yok.
- Headless provider'da varyant çözümleme/atama ve sonuç sorgusu için bir API sözleşmesi yok (React/AntDesign ve GenUI tüketicileri için).

Nasıl tamamlanır: Mevcut experiment--contract → experiment--schema → experiment--implementation sırası ve bağımlılıkları korunsun. 1) experiment--contract tek bir sözleşme olarak yazılsın: atama anahtarı (oturumlu kullanıcı + tenant), deney anahtarı ve seed'i hash'leyen deterministik kova, tek birincil metrik ve tek zaman penceresi. Sözleşme analytics-4 olay kataloğuna ve analytics-6 izin durumuna bağımlı olarak işaretlensin. 2) experiment--schema: Experiment ve Experiment Assignment DocType'ları eklensin; (experiment, subject) benzersiz olsun. 3) experiment--implementation: tek bir sunucu tarafı whitelist get_or_assign_variant çağrısı yazılsın. Önce aynı kullanıcının tekrar çağrıda aynı grupta kaldığını gösteren gerçek bir RED/GREEN testi gelsin, ardından iki grubu aynı metrik ve pencereyle hesaplayan sonuç sorgusu eklensin. Sorgu Website Analytics'teki frappe.qb group-by/pencere kalıbını yeniden kullanabilir. UTM 'content' alanı yalnız pazarlama atfı için kalsın, atama kaynağı yapılmasın.

Kaynak dayanakları: `frappe/frappe/public/js/frappe/utils/utils.js:2178`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:46`; `frappe/frappe/website/doctype/web_page_view/web_page_view.py:94`; `frappe/frappe/website/report/website_analytics/website_analytics.js:41`; `frappe/frappe/website/report/website_analytics/website_analytics.py:68`; `suite/suite/sheets/tests/test_boot.py:3`.

Rehber: [experiment](./frappe-roadmap-contracts/experiment.json). Mevcut birincil görev: `experiment--implementation`.

### views-1 — Listing page (liste sayfası) ve single/detail page (tek kayıt/detay sayfası).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: doğrudan URL, listeden geçiş, 403 ile 404 ayrımı. Backend tarafında v1 liste ve tek kayıt route'ları, read izni ve alan düzeyi okuma filtresi kaynakta var. Liste/detay ekranları (React) kaynakta yok. Talimat v1/v2 seçimini ve v17-dev eşlemesini belirtmiyor.

Eksik:

- /api/resource (v1) mı /api/v2/document mı kullanılacak belirtilmemiş. v2 dosya başlığı iç uygulamanın kırıcı değişiklik sayılmadan değişebileceğini söylüyor; v17.0.0-dev için sürüm sabitleme yok.
- Yetkisiz kayıtta kaydın varlığı açığa çıkmadan 403/404 nasıl ayrılacak? Bu politika tanımsız.
- path:name içindeki '/' ve özel karakterler için URL kodlama sözleşmesi yok.
- Detayda form düzeni için meta kaynağı belirsiz. v2 get_meta yalnız only_for("All") ile korunuyor, excerpt'te permlevel filtresi görünmüyor; meta sunumu yetki kaynağı sayılmamalı.
- Görev eşlemesinde 'ui-family-15--implementation' (views-1) ile 'ui-family-15--implementation-post-mvp' (views-4) MVP/post-MVP ayrımı açıklanmamış.

Nasıl tamamlanır: page-record-list--implementation ve page-record-detail--implementation görevlerine şunlar eklenmeli: API sürümü (v1 veya v2) ve Frappe commit adf1fd0c'ye sabitleme, 403/404/varlık sızıntısı kararı, name kodlama kuralı. Detay alanları yalnız sunucunun döndürdüğü belgeden okunmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v1.py:155`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/api/v2.py:246`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `page-record-list--implementation`.

### views-2 — Tablo, liste, kart ve Kanban (durum sütunlarından oluşan pano) görünümleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü iki şart koyuyor: görünüm değişince veri korunmalı, sürükleme yetkisi backend'de doğrulanmalı. Backend'de grup sayımı (izinli sorgu) ve değer güncelleme ilkelleri var. Kanban pano DocType kaynağı bu excerpt'te görünmüyor. Desk görünümleri bağımsız frontend'e taşınamaz.

Eksik:

- Kanban sütununun hangi alana bağlanacağı tanımsız: Select alanı, workflow_state ya da Kanban Board. Workflow geçişi ile set_value arasındaki fark ele alınmamış.
- Sürükle-bırak için mutasyon yolu ve eşzamanlılık kuralı (modified çakışması) yok.
- Grid kütüphanesi kararı açık. Tablo görünümü bu karara bağlı, ama bağımlılık talimatta yazmıyor.
- 10 görünüm görevi var ve çoğu post-MVP. Koşullu kapsam için MVP alt kümesi seçilmemiş.

Nasıl tamamlanır: ui-family-08 görevinde MVP için yalnız tablo, liste ve kart seçilmeli. Kanban için durum alanı ve geçiş sözleşmesi tanımlanmalı: native set_value veya workflow geçişi kullanılır, sunucu reddederse UI geri alınır. Grid kararı bağımlılık olarak işaretlenmeli.

Kaynak dayanakları: `frappe/frappe/desk/listview.py:36`; `frappe/frappe/desk/listview.py:47`; `frappe/frappe/client.py:183`.

Rehber: [ui-family-08](./frappe-roadmap-contracts/ui-family-08.json). Mevcut birincil görev: `ui-family-08--implementation-post-mvp`.

### views-3 — Bulk operations (toplu işlemler) ve çoklu kayıt seçimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü iyi: her kayıt ayrı denetlenmeli, kısmi hatada işlenen kayıtlar raporlanmalı. Kaynakta v2'de toplu işlem için async eşiği, client'ta da 200 kayıtlık insert_many sınırı var. v2'deki bulk route'ları excerpt'te görünmüyor. Toplu işlem sonucunun ve ilerlemesinin headless sözleşmesi tanımlı değil.

Eksik:

- Hangi native toplu uç noktanın kullanılacağı ve v17-dev'deki imzası belirtilmemiş.
- Eşik aşılınca iş async'e düşüyor. Bu durumda iş kimliği, ilerleme ve sonuç sorgulama sözleşmesi yok.
- Kayıt başına başarı/hata yanıt şeması tanımsız.
- Tekrar gönderimde idempotency ve submit/cancel/delete için yetki ayrımı yazılmamış. v1 delete içinde alt kayıtlar için TODO var.

Nasıl tamamlanır: ui-family-14 görevine şunlar eklenmeli: native v2 bulk uç noktasının kaynakta doğrulanması, senkron/async eşik davranışı ve kayıt başına sonuç şeması. Yeni toplu API yazılmamalı. ignore_permissions içeren yardımcılar açılmamalı.

Kaynak dayanakları: `frappe/frappe/api/v2.py:32`; `frappe/frappe/client.py:246`; `frappe/frappe/api/v1.py:71`.

Rehber: [ui-family-14](./frappe-roadmap-contracts/ui-family-14.json). Mevcut birincil görev: `ui-family-14--implementation-post-mvp`.

### views-4 — Kayıt karşılaştırma: çalışan, ürün ve diğer iş varlıkları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü doğru noktayı vurguluyor: yalnız ortak ve yetkili alanlar karşılaştırılmalı, gizli alan sızmamalı. Alan düzeyi okuma izni kaynakta var. Ancak HRMS ve ERPNext bu sitede kurulu değil; çalışan ve ürün karşılaştırması native kurulu yetenek sayılamaz. Talimat bu ayrımı yapmıyor.

Eksik:

- Örnek varlıklar (HRMS Employee, e-ticaret ürünü) kurulu uygulama envanterinde yok. Hedef DocType'lar ve ilk örnek belirtilmemiş.
- Karşılaştırılacak kayıtların farklı permlevel erişimi varsa alan kesişiminin nasıl hesaplanacağı tanımsız.
- Kayıt sayısı sınırı ve child table/link alanlarının nasıl karşılaştırılacağı yazılmamış.

Nasıl tamamlanır: ui-family-15 post-MVP görevinde ilk örnek, kurulu frappe veya suite içindeki bir DocType ile sınırlanmalı. HRMS ve ERPNext örnekleri 'kurulum gerekir' diye etiketlenmeli. Alan kümesi her kayıt için sunucunun döndürdüğü izinli alanların kesişimi olmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:84`; `frappe/frappe/model/meta.py:746`.

Rehber: [ui-family-15](./frappe-roadmap-contracts/ui-family-15.json). Mevcut birincil görev: `ui-family-15--implementation-post-mvp`.

### views-5 — State management (arayüz durumu yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü riskleri doğru tanımlıyor: geri/ileri gezinme, tenant değişimi, eşzamanlı yanıt. URL, sunucu önbelleği ve form durumu ayrımı yazılı. Kaynaktaki referans desenler Vue tabanlı: frappe/ui snapshot/restore ve doctype başına meta önbelleği. Seçilen React/TanStack yığınına doğrudan aktarılamazlar.

Eksik:

- TanStack Query anahtar şeması tanımsız. Tenant, site, kullanıcı, doctype ve meta revizyonu anahtarda yer almalı. frappe/ui önbelleği yalnız doctype ile anahtarlanıyor ve oturum boyunca saklanıyor.
- Tenant değişiminde önbellek temizleme ve devam eden isteği iptal etme kuralı yazılmamış.
- Taslak form durumunun meta yenilenince korunacağına dair bir sözleşme yok.

Nasıl tamamlanır: ui-provider-query ve ui-view-state görevlerine sorgu anahtarı şeması ve tenant değişimi temizlik kuralı eklenmeli. Vue composable'ları yalnız referans alınmalı, kopyalanmamalı.

Kaynak dayanakları: `frappe/ui/src/composables/useDoctypeMeta.ts:47`; `frappe/ui/src/composables/useDoctypeMeta.ts:85`; `frappe/ui/src/components/ListView/useListView.ts:1`.

Rehber: [ui-view-state](./frappe-roadmap-contracts/ui-view-state.json). Mevcut birincil görev: `ui-view-state--implementation`.

### views-6 — Toast / Snackbar (kısa süreli işlem sonucu mesajları).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de somut toast primitive'leri var. Sunucu tarafında frappe/utils/messages.py içindeki toast(), msgprint(alert=True) çağrısı yapıyor. Mesaj message_log'a alert, indicator, title ve raise_exception alanlarıyla ekleniyor; realtime seçeneği publish_realtime ile gönderiyor. utils/response.py v1'de _server_messages alanını iç içe JSON string olarak, v2'de messages alanını yapılandırılmış liste olarak üretiyor. Desk istemcisinde request.js, alert/toast bayraklı mesajları diyalog açmadan yönlendiriyor. messages.js'deki frappe.show_alert, indicator'ı success/error/warning/info türüne eşliyor. components/toast.js'deki frappe.ui.toast şunları sağlıyor: error için role=alert, diğer türler için role=status, kapatma düğmesi, duration=0 ile kalıcı toast, hover/focus sırasında duraklatma ve aynı id ile yerinde güncelleme. Suite'in Vue önyüzü frappe-ui/sonner toast'unu kullanıyor; bu, seçilen React/AntD yığını değil. bunlar standart message_log/exc_type yolunu izliyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- React/Ant Design (message/notification) tabanlı bir headless toast/snackbar katmanı kurulu kaynakta yok.
- v2 messages ve v1 _server_messages ile indicator/alert/raise_exception/exc_type alanlarını bildirim düzeyine eşleyen bir headless sözleşme yok. planlanan Frappe adaptörü bir mesaj/bildirim zarfı tanımlamıyor.
- Toast kapandıktan sonra hata ayrıntısını tutan kalıcı bir hata paneli/geçmişi yok. Desk toast'u dismiss sonrası DOM'dan siliniyor.
- Merkezi token, hareket sözleşmesi, 14 CSS px alt sınırı ve React tarafında aria-live/role bağlaması yok. Desk'teki role=alert/status yalnız Desk'e özgü.
- Ekran okuyucu duyurusu gibi çalışma zamanı davranışı kaynakla kanıtlanamaz; functionalAcceptance=not_run.

Nasıl tamamlanır: Sıra şöyle olmalı: (1) ui-family-06--contract kapsamında, kernel-envelope ve api-middleware sözleşmeleriyle uyumlu küçük bir eşleme tablosu tanımlanır. Tablo Frappe v2 messages[] öğelerini (alert, indicator, title, raise_exception) ve HTTP status+exc_type değerini success/info/warning/error ile toast/kalıcı panel hedefine bağlar. (2) Bu eşleme, frappe/tests/test_api.py'deki mevcut yanıt şekillerine dayanan bir RED fixture ile doğrulanır. (3) ui-family-06--implementation'da tek bir dar davranış uygulanır: React/AntD message/notification sarmalayıcısı merkezi token ve hareket kurallarıyla kullanılır, error için role=alert, diğerleri için role=status verilir ve error ayrıntısı toast kapandıktan sonra da kalıcı bir hata panelinde tutulur. Tarayıcı/ekran okuyucu kabulü ayrıca koşulur.

Kaynak dayanakları: `frappe/frappe/utils/messages.py:121`; `frappe/frappe/utils/response.py:218`; `frappe/frappe/public/js/frappe/request.js:508`; `frappe/frappe/public/js/frappe/ui/components/toast.js:45`; `frappe/frappe/public/js/frappe/ui/messages.js:430`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-7 — Filtreleme, sıralama, sayfalama, sütun seçimi ve kayıtlı görünümler.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Filtre, sıralama, sayfalama, sayım ve alan/filtre doğrulaması kaynakta native olarak var. Kayıtlı görünüm için iki aday var, ikisi de istenen işi tam karşılamıyor: List View Settings doctype düzeyinde tek kayıt tutuyor, kişisel veya adlandırılmış görünüm değil. frappe/ui snapshot ise kaydetmeyi host'a bırakıyor. Kalıcılık yeri seçilmemiş.

Eksik:

- Kayıtlı görünümün nerede saklanacağı seçilmemiş: List View Settings, Report Builder raporu ya da kullanıcı ayarı. Tenant kapsamı da tanımsız.
- URL filtre serileştirme şeması ve izinli operatör listesi yok.
- Kayıtlı sütunlar sunucuda yeniden doğrulanmalı (permlevel filtresi var). Bunun UI'daki karşılığı yazılmamış.
- Büyük tablolarda sayım maliyeti ve sayfa boyutu üst sınırı tanımsız.

Nasıl tamamlanır: ui-family-12 görevinde saklama yeri olarak native bir mekanizma seçilmeli ve tenant ile kullanıcı kapsamı karara bağlanmalı. URL filtre şeması tanımlanmalı. Yeni ORM/CRUD yazılmamalı. Sunucu doğrulaması tek yetki kaynağı kalmalı.

Kaynak dayanakları: `frappe/frappe/client.py:33`; `frappe/frappe/api/v2.py:650`; `frappe/frappe/desk/reportview.py:181`; `frappe/frappe/desk/listview.py:18`; `frappe/ui/src/components/ListView/useListView.ts:55`.

Rehber: [ui-family-12](./frappe-roadmap-contracts/ui-family-12.json). Mevcut birincil görev: `ui-family-12--implementation`.

### views-8 — Yükleniyor, boş, hatalı, yetkisiz ve çevrimdışı ekran durumları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü yavaş ağ, 0 kayıt, 403, 500 ve bağlantı kesintisini ayrı ayrı istiyor. Backend'de PermissionError ve DoesNotExistError ayrımı var. Offline için yalnız Meet tanılama kodunda navigator.onLine kullanımı görünüyor; genel bir offline durum altyapısı yok. Tauri, PWA ve WXT için offline davranışı tanımsız.

Eksik:

- HTTP durum kodu ve exc_type'tan ekran durumuna eşleme tablosu yok. Silmenin 202 dönmesi gibi istisnalar da buna dahil.
- PWA, Tauri ve WXT'de offline önbellek politikası ve mutasyon kuyruğu yapılıp yapılmayacağı kararı yok.
- Yeniden deneme yalnız idempotent okumalarla mı sınırlı? Tanımsız.

Nasıl tamamlanır: ui-family-05 ve ui-family-06 görevlerine durum eşleme tablosu eklenmeli. İlk sürümde offline yalnız salt okuma olarak sınırlanmalı ve bu açıkça yazılmalı. Mutasyonlar için otomatik yeniden deneme yapılmamalı.

Kaynak dayanakları: `frappe/frappe/desk/query_report.py:78`; `frappe/frappe/permissions.py:153`; `frappe/frappe/api/v1.py:73`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:75`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### integration-1 — API entegrasyon katmanı ve adaptör yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (aynı komut iki adaptörde, tenant sırları ayrık) somut. Kaynakta /api/method RPC, /resource CRUD, v2 REST ve Social Login Key üzerinden şifreli sağlayıcı anahtarı primitifleri var. Ortak adaptör sözleşmesi, kimlik bilgisi modeli ve sağlık modeli kaynakta yok. Talimat, v2 iç fonksiyonlarının Python'dan çağrılmaması kuralını ve v17-dev eşlemesini belirtmiyor.

Eksik:

- Adaptör arayüzü (komut, hata, yeniden deneme, idempotency) tanımsız
- Tenant sırrının nerede tutulacağı belirsiz (site-başı tenant mı, satır-başı mı; Password alanı ve get_decrypted_password kullanımı); Keycloak servis hesabı eşlemesi yok
- v2 modülü kararlı değil, kaynakta 'internal implementation can change' yazıyor; adaptörün yalnızca HTTP sözleşmesine bağlanacağı yazılmamış
- Suite, Framework'ün File izin mantığını Drive'ınkiyle değiştiriyor; dosya taşıyan adaptörlerin bu izin sınırı belirtilmemiş

Nasıl tamamlanır: connection--implementation görevine şunları ekle: tek sayfalık adaptör sözleşmesi (girdi/çıktı/hata/idempotency anahtarı), tenant sırrı için Frappe Password alanı kararı ve v17-dev'de /api/v2 HTTP uçlarına bağlanma kuralı. Yeni görev kaydı açma.

Kaynak dayanakları: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/utils/oauth.py:147`; `suite/suite/hooks.py:117`.

Rehber: [connection](./frappe-roadmap-contracts/connection.json). Mevcut birincil görev: `connection--implementation`.

### integration-2 — Activepieces ile entegrasyon otomasyonları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Activepieces harici ürün olarak doğru sınıflanmış. Kabul ölçütü (tenant kapsamı, çift işlem yok) anlamlı. Frappe tarafında REST create/update ve izin kontrolü primitifleri var. Ancak create_doc'ta idempotency anahtarı yok, yani tekrar tetikleme çift kayıt üretir. Activepieces kaynağı bu kurulumda yok; köprü uygulaması da yok.

Eksik:

- Kimlik doğrulama yolu seçilmemiş (API key/secret, OAuth istemcisi ya da Keycloak servis hesabı) ve en az yetkili rol tanımı yok
- Tekrar tetiklemeye karşı idempotency anahtarı ve tekilleştirme deposu tanımsız
- Activepieces sürümü/lisans türü (community/ee) ve barındırma sahibi belirtilmemiş; lisans kullanıcıyla netleştirilmeli
- Webhook kaynağı bu pakette görülmedi; tetik yönü (Frappe→Activepieces) doğrulanamadı

Nasıl tamamlanır: activepieces-bridge--implementation görevine şunları ekle: yalnızca HTTP üzerinden erişim, kısıtlı rol, idempotency başlığı ve tekilleştirme kuralı. Lisans/sürüm kararını kullanıcıya sor; köprüyü integration-1 adaptör sözleşmesine bağımlı işaretle.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:154`.

Rehber: [activepieces-bridge](./frappe-roadmap-contracts/activepieces-bridge.json). Mevcut birincil görev: `activepieces-bridge--implementation`.

### integration-3 — Middleware (istek işleme ara katmanı) ve handler (istek/olay işleyicisi) kayıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta before_request/after_request hookları ve whitelist + HTTP metodu doğrulaması var; kayıtsız metot reddi bunlarla zaten sağlanıyor. Meet SFU'daki registerHandlers dizisi Meet'e özgü bir Socket.IO kaydı; ürün handler kaydı sayılmaz. Talimatta sürümlü kayıt, sıralama semantiği ve GenUI/sunucu kayıtlarıyla ayrım yok.

Eksik:

- Birden çok uygulamanın hookları birleştiğinde sıra ve hata davranışı tanımlanmamış; suite after_request tek tanımlayıcı
- Sürümlü handler kaydının veri modeli ve whitelist ile ilişkisi belirsiz
- Sunucu query-action kaydının GenUI kaydıyla birleştirilmeyeceği açıkça yazılmamış
- Meet SFU handler deseninin genel middleware olarak yeniden kullanılmayacağı belirtilmemiş

Nasıl tamamlanır: api-middleware--implementation görevinde şunları yaz: native before/after_request ve frappe.whitelist zinciri esas alınacak, sıra kuralı tek bir before_request listesinde deterministik olacak, reddin kanıtı is_whitelisted olacak. Ayrı bir registry DocType'ı yalnızca sürüm ihtiyacı gerekçelendirilirse eklenmeli.

Kaynak dayanakları: `suite/suite/hooks.py:343`; `suite/suite/hooks.py:340`; `frappe/frappe/api/v1.py:121`; `suite/suite/meet/sfu-server/src/server/SocketHandlerManager.ts:115`.

Rehber: [api-middleware](./frappe-roadmap-contracts/api-middleware.json). Mevcut birincil görev: `api-middleware--implementation`.

### integration-4 — HTTP (Hypertext Transfer Protocol — hiper metin aktarım protokolü) durum/yönlendirme yönetimi: 200, 301, 303, 404, 410, 503.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta http_status_code ataması ve website redirect kuralları (suite'te 307) var. 410 ve bakım 503 yolu bu excerpt'te görülmedi. Vite/PWA + TanStack Router SPA'da istemci rotası gerçek HTTP 404/410/301 üretemez. Kodu kimin üreteceği (Frappe route kuralı, edge/proxy, prerender) talimatta yok.

Eksik:

- SPA rotaları için durum kodunu üretecek katman seçilmemiş
- API hatası (JSON gövde + kod) ile sayfa durumu (SEO) ayrımı tanımsız
- 503 bakım modunun kaynağı ve Retry-After başlığı belirtilmemiş
- 301/303 kullanım kuralı (POST sonrası 303) ile mevcut 307 yönlendirmelerin ilişkisi açık değil

Nasıl tamamlanır: api-response--implementation görevine katman kararını ekle (Frappe website_redirects/route rules mu, ters vekil mi). Durum kodu → rota örneği tablosu da eklenmeli. Bakım 503'ünün ve Retry-After'ın kaynağı Hüseyin Cengiz ile netleştirilmeli.

Kaynak dayanakları: `frappe/frappe/api/v1.py:73`; `suite/suite/hooks.py:72`.

Rehber: [api-response](./frappe-roadmap-contracts/api-response.json). Mevcut birincil görev: `api-response--implementation`.

### integration-5 — Webhook (olay gerçekleşince dış sisteme bildirim) alma/gönderme; imza ve tekrar saldırısı denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de giden webhook gönderimi var (frappe/frappe/integrations/doctype/webhook/webhook.py). DocType olayı tetiklenince istek kuyruğa alınır. enable_security açıksa gövde HMAC-SHA256 ile imzalanır ve base64 değer X-Frappe-Webhook-Signature başlığına yazılır. İmza, gönderilen frappe.as_json(data) gövdesinin aynısı üzerinden hesaplanır. Teslim denemeleri Webhook Request Log'a yazılır (Delivered/Failed/Exhausted, attempt, next_retry). Yeniden deneme RETRY_SCHEDULE ile zamanlanır ve job_id ile tekilleştirilir; logdaki başlık ve gövde aynen yeniden gönderilir. automation_engine CallWebhook eylemi de dışarıya HTTP çağrısı yapar ama imza üretmez. Suite'te gelen istek için yalnız alana özgü bir örnek var: Meet kayıt cihazı geri çağrısı (suite/suite/meet/recording/callback_auth.py). Bu akış body_sha256'yı compare_digest ile karşılaştırır ve iat/exp için yaklaşık 30 saniyelik pencere ile 5 saniyelik saat kayması toleransı uygular. Tekrar kullanılan jti'yi Redis'te SET NX ve 40 saniyelik TTL ile reddeder. oradaki hmac yalnız öneri özetini karşılaştırır. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Giden imza yalnız gövdeyi kapsıyor; zaman damgası, olay kimliği ve nonce imzaya ya da başlıklara girmiyor. Bu yüzden alıcı, yeniden gönderilen imzalı bir isteği tekrar olarak ayırt edemez.
- Frappe'de gelen webhook'lar için genel bir doğrulama ucu yok: imza doğrulayan guest endpoint, zaman penceresi ve tekrar deposu bulunmuyor.
- Suite'teki jti ve gövde özeti deseni Meet'e özgü ve Redis TTL'li; tahliyeye açık, kalıcı benzersiz anahtar değil, genel webhook alımında yeniden kullanılmıyor.
- Tenant başına imza sırrı ve rotasyon/çift sır dönemi yok; webhook_secret, her Webhook kaydında tek bir Password alanı.
- İmza algoritması veya sürüm başlığı yok.
- planlanan Frappe adaptörü'da gelen ve giden webhook sağlayıcı sözleşmesi yok (GenUI/React tüketicisi için yönetim/teslim durumu yüzeyi yok).

Nasıl tamamlanır: Mevcut delivery-attempt--contract ve delivery-attempt--schema bağımlılıklarından sonra, delivery-attempt--implementation içinde en küçük adım şu sırayla yapılmalı: (1) Gelen istek doğrulayıcısı yazılsın. callback_auth.py'deki compare_digest, zaman penceresi ve jti desenini genelleştirsin; X-Frappe-Webhook-Signature ile uyumlu HMAC-SHA256 doğrulaması yapsın ve zaman damgası ile olay kimliği başlıklarını zorunlu tutsun. Tekrar kontrolü, Redis TTL yerine olay kimliğine benzersiz indeks veren kalıcı bir tabloyla yapılsın. (2) Bunun için önce RED testleri: geçerli imza kabul, değiştirilmiş gövde red, aynı olay kimliğinin tekrarı red, pencere dışı zaman damgası red. (3) Ardından giden tarafta upstream Webhook'u fork etmeden, ek bir başlık katmanıyla imzaya zaman damgası ve olay kimliği eklenebilir mi değerlendirilsin. Tenant başına sır ve rotasyon tenant-registry--contract'a bağlansın. planlanan Frappe adaptörü'a yalnız sözleşme/durum okuma ucu eklensin.

Kaynak dayanakları: `frappe/frappe/integrations/doctype/webhook/webhook.py:20`; `frappe/frappe/integrations/doctype/webhook/webhook.py:348`; `frappe/frappe/integrations/doctype/webhook/webhook.py:22`; `frappe/frappe/integrations/doctype/webhook/webhook.py:264`; `suite/suite/meet/recording/callback_auth.py:383`; `suite/suite/meet/recording/callback_auth.py:399`.

Rehber: [delivery-attempt](./frappe-roadmap-contracts/delivery-attempt.json). Mevcut birincil görev: `delivery-attempt--implementation`.

### integration-6 — API sürümü, standart hata yanıtı, sözleşme dokümanı ve kullanımdan kaldırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta /api/v1 ve /api/v2 yan yana duruyor, geriye uyumluluk dalları da var. Ancak v2 iç uygulamasının değişebileceği açıkça yazıyor. Suite, Frappe >=16,<18 aralığını beyan ediyor; yerelde 17.0.0.dev0 çalışıyor. Talimatta ürün API sürümü ile Frappe sürümünün eşlemesi, standart hata şeması ve kaldırma takvimi yok.

Eksik:

- Ürün API sürümü (ör. /api/v2 üstü ürün sözleşmesi) ile Frappe /api/v1-v2 eşlemesi tanımsız
- Frappe hata yükünü ürün hata şemasına normalize etme kuralı yok
- Kaldırma politikası (destek süresi, Deprecation/Sunset başlıkları) yok
- v16 ile v17-dev arasındaki API farklarının doğrulanması planlanmamış

Nasıl tamamlanır: api-response--implementation görevine şunları ekle: v17-dev /api/v2'yi hedef sabitleyen sürüm tablosu, tek JSON hata şeması örneği ve Deprecation/Sunset kuralı. Bunu ui-family-36 MVP istemcisi tüketmeli.

Kaynak dayanakları: `frappe/frappe/api/v2.py:7`; `frappe/frappe/api/v1.py:41`; `suite/pyproject.toml:45`.

Rehber: [api-response](./frappe-roadmap-contracts/api-response.json). Mevcut birincil görev: `api-response--implementation`.

### integration-7 — Veri eşleme, çift yönlü eşitleme, bağlantı sağlığı ve yeniden yetkilendirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Event Streaming'in çekirdek çözüm olmadığı doğru belirtilmiş. Kaynakta satır kilitli get_doc, şifreli sağlayıcı sırrı ve tenacity bağımlılığı var. Alan/kimlik eşleme, çakışma kuralı, bağlantı sağlığı durumları ve yeniden yetkilendirmede akışı durdurma kaynakta yok; talimatta da somut değil.

Eksik:

- Çakışma kuralı seçilmemiş (son yazan kazanır, alan bazlı ya da manuel inceleme) ve 'modified' tabanlı sürüm kontrolü belirtilmemiş
- Sürümlü eşleme şeması ve dış kimlik ↔ Frappe name eşleme tablosu tanımsız
- Sağlık durum makinesi (sağlıklı, bozulmuş, yetki süresi doldu, durduruldu) ve yeniden deneme/backoff sınırları yok
- 'Sekiz modeli birleştirir' ifadesindeki modeller adlandırılmamış

Nasıl tamamlanır: connection--implementation-mvp görevine tek bir çakışma kuralı, eşleme kaydı alanları ve sağlık durum makinesi ekle. Token yenileme başarısızsa akış 'durduruldu' durumuna geçmeli. Önce integration-1 adaptör sözleşmesine bağla.

Kaynak dayanakları: `frappe/frappe/api/v1.py:56`; `frappe/frappe/utils/oauth.py:139`; `frappe/pyproject.toml:79`.

Rehber: [connection](./frappe-roadmap-contracts/connection.json). Mevcut birincil görev: `connection--implementation-mvp`.

### integration-8 — 401/403 yetki, 409 çakışma, 422 doğrulama, 429 hız sınırı ve 500 hata yanıtları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni (altı kod, stack trace/secret sızmaması) açık. Kaynakta HTTP durum kodu atama ve izin hatası üretme primitifleri var. Ancak Frappe istisnalarını 401/403/409/422/429/500 kodlarına eşleyen ürün gövde şeması tanımlı değil. Frappe HTTP rate limiter ve app.py hata işleyicisi verilen kesitlerde görünmüyor.

Eksik:

- Ürün hata gövdesi şeması (code, message, field errors, correlation id) tanımlı değil.
- Frappe istisna → HTTP eşlemesi yazılmamış: PermissionError, ValidationError, TimestampMismatch/Duplicate (409), RateLimitExceeded (429).
- 401 (Keycloak token geçersiz) ile 403 (Frappe rol/kayıt izni yok) ayrımı belirtilmemiş.
- Hata zarfının v1 mi v2 mi, yoksa ürün namespace'i üzerinde mi kurulacağı seçilmemiş.
- Suite after_request hook'unun hata yanıtlarını etkileyip etkilemediği belirsiz.
- SFU socket hata deseni ham error.message döndürüyor; HTTP sözleşmesine model alınmamalı.

Nasıl tamamlanır: api-response--implementation altına Frappe istisna sınıfı → HTTP kodu → güvenli gövde tablosunu yaz (Frappe 17.0.0.dev0 adlarıyla). Altı senaryoyu tek sözleşme testi taslağı olarak tanımla; çalıştırma not_run kalsın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:73`; `frappe/frappe/client.py:177`; `suite/suite/hooks.py:340`; `suite/suite/meet/sfu-server/src/server/handlers/WebRtcTransportHandlers.ts:56`.

Rehber: [api-response](./frappe-roadmap-contracts/api-response.json). Mevcut birincil görev: `api-response--implementation`.

### integration-9 — REST API sunma ve dış REST servislerini tüketme; sürümlü ürün sözleşmesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe v1 resource/method rotaları ve v2 REST katmanı izin kontrollü CRUD/RPC ve sayfalama sağlıyor. v2'nin iç implementasyonu breaking change sayılmadan değişebiliyor. Ürün sürüm sözleşmesi, OpenAPI üretimi, idempotency ve dış REST tüketim adaptörü talimatı eksik. Keycloak eşlemesi de yalnız niyet düzeyinde.

Eksik:

- Ürün API'sinin v1/v2 üzerine ince sarmalayıcı mı, ayrı /api/method namespace'i mi olacağı seçilmemiş. v2'nin Frappe 17 dev'de stabil sözleşme olmadığı not edilmemiş.
- OpenAPI kaynağı belirsiz: frappe.api.discovery importu var ama içeriği görülmedi, kullanılabilirliği doğrulanmalı.
- Idempotency-Key saklama ve tekrar yazım semantiği tanımsız.
- Dış REST tüketimi için şu sözleşmeler yok: requests timeout/retry, secret saklama (Password alanı), egress/SSRF politikası.
- Keycloak token → Frappe User/tenant eşlemesi tanımsız. Social Login Key login akışıdır, bearer doğrulaması değildir.

Nasıl tamamlanır: rest-api--implementation için kısa ADR yaz: taban (v1 veya v2), sürüm öneki, sayfalama alanları (limit_start/limit_page_length) ve idempotency kuralı. frappe.api.discovery çıktısını yalnız okuyarak OpenAPI temeli olup olmadığını doğrula.

Kaynak dayanakları: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/api/v2.py:19`; `frappe/frappe/api/v1.py:83`; `frappe/pyproject.toml:68`; `frappe/frappe/utils/oauth.py:107`.

Rehber: [rest-api](./frappe-roadmap-contracts/rest-api.json). Mevcut birincil görev: `rest-api--implementation`.

### integration-10 — GraphQL entegrasyonu; şema, query/mutation ve yetkili resolver katmanı.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynağında GraphQL uygulaması bulunamadı: şema/tip üretimi, query/mutation ayrıştırıcı veya yürütücü, resolver katmanı, /graphql rotası ya da GraphQL bağımlılığı yok. GraphQL eşleşmeleri yalnız şu yerlerde: frappe/.github CI iş akışlarında GitHub API çağrısı ('gh api graphql'), suite ship-pr SKILL.md içinde GitHub PR GraphQL'i ve derlenmiş/vendored JS bundle'ları (desk.bundle, suite/public/frontend/assets). Bunların hiçbiri ürün davranışı sayılmaz. Gelecekteki resolver'ların yeniden kullanabileceği upstream-native REST primitifleri var: /api/v1 ve /api/v2 Werkzeug URL haritası, v2 document_list içinde ignore_permissions=False ile frappe.qb.get_query, read_doc/update_doc içinde check_permission ve apply_fieldlevel_read_permissions, has_next_page sayfalaması ve controller get_list kancası. Bu dosya meta.get_permitted_fieldnames ile alan seviyesinde izinli şema projeksiyonu yapar ama GraphQL değildir. Suite'in Vue frontend'i bu sözleşmelerden ayrıdır. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- GraphQL kütüphanesi seçilmemiş, bağımlılık yok, Python sürüm uyumu da doğrulanmamış (pyproject/package.json içinde graphql/graphene/strawberry/ariadne eşleşmesi yok).
- DocType meta'sından GraphQL şema/tip üretimi yok; permlevel'e göre kullanıcıya özel şema görünürlüğü de yok.
- Query/mutation resolver katmanı yok. Resolver'ların yalnız izinli native yollara (get_query ignore_permissions=False, get_doc+check_permission, apply_fieldlevel_read_permissions, doc.insert/save) bağlanacağına dair kural da yok.
- Derinlik/maliyet sınırı, karmaşıklık analizi ve N+1 bütçesi/dataloader yok. v2 document_list'teki limit istemciden alınıyor ve kodda üst sınır görülmedi.
- Kiracı (site) izolasyonuna dair GraphQL testi/kanıtı, integration-8 hata zarfı ve integration-9 sürüm sözleşmesi eşlemesi yok.
- Subscription taşıması tanımsız; kapsam dışı.

Nasıl tamamlanır: Mevcut graphql-api--contract bağımlılığı içinde ilerle. 1) Sözleşmede kütüphane seçimini ve Python/Frappe sürüm uyumunu, ayrıca 'resolver yalnız native izinli yollar' kuralını yaz; frappe.db.sql ve ignore_permissions yasaklansın. Hata zarfı kernel-envelope/api-middleware sözleşmelerine eşlensin. 2) graphql-api--implementation'ın ilk dar dilimi tek bir salt-okunur query olsun: bir DocType için liste ve tekil kayıt; v2 document_list/read_doc'taki get_query(ignore_permissions=False) + check_permission + apply_fieldlevel_read_permissions yolunu yeniden kullansın; şemaya get_permitted_fieldnames ile yalnız okunabilir alanları koysun; limit üst sınırı ile derinlik/maliyet sınırını içersin. Önce RED testler yazılsın: başka site/kiracıya erişim, yasak permlevel alanı, aşırı derinlik ve sorgu sayısı bütçesi; sonra GREEN. 3) Mutation'lar ancak bundan sonra eklenecek ve doc.insert/save üzerinden gidecek. Subscription bu dilimin dışında kalır. GenUI/React tüketicisi yalnız bu provider sözleşmesini kullanır.

Kaynak dayanakları: `frappe/frappe/api/__init__.py:97`; `frappe/frappe/api/v2.py:164`; `frappe/frappe/api/v2.py:87`; `frappe/frappe/api/v2.py:142`; `frappe/.github/workflows/post-review.yml:72`.

Rehber: [graphql-api](./frappe-roadmap-contracts/graphql-api.json). Mevcut birincil görev: `graphql-api--implementation`.

### integration-11 — SOAP entegrasyonu; WSDL/XSD sözleşmeli servis sunma ve tüketme.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynağında SOAP için hiçbir uygulama yok. SOAP zarfı (envelope), WSDL/XSD üretimi, tüketimi ya da doğrulaması, SOAP fault işleme, SOAPAction veya application/soap+xml yönlendirmesi ve zeep/spyne/xmlschema bağımlılığı bulunamadı. Bu maddeyle yalnız dolaylı ilişkisi olan, SOAP'a özgü olmayan yapı taşları şunlar:
(1) Upstream frappe: make_form_dict istek gövdesini yalnız JSON ya da form/query olarak ayrıştırıyor, XML gövde ayrıştırma yolu yok (frappe/frappe/app.py:341).
(2) Upstream frappe: Webhook DocType'ının request_structure alanı yalnız "Form URL-Encoded" ve "JSON" seçeneklerini sunuyor, XML/SOAP seçeneği yok (frappe/frappe/integrations/doctype/webhook/webhook.json:127).
(3) Suite: Drive/WebDAV modülü lxml ile sertleştirilmiş bir XML ayrıştırıcı içeriyor. Varlık çözümleme, ağ erişimi ve DTD kapalı; DOCTYPE reddediliyor; gövde 1 MB ile sınırlı. Ancak bu ayrıştırıcı DAV ad alanına ve WebDAV hata sınıflarına bağlı, SOAP sözleşmesi değil. Suite'in Vue arayüzündeki derlenmiş bundle'larda geçen eşleşmeler sözdizimi renklendirme ve kütüphane metinleri; davranış kanıtı değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- SOAP 1.1/1.2 sunucu uç noktası (zarf ayrıştırma, SOAPAction veya action parametresine göre yönlendirme, SOAP fault yanıtı)
- WSDL yayımlama ve WSDL/XSD sözleşmesine göre istek/yanıt doğrulaması
- SOAP istemcisi (WSDL'den işlem çağırma, namespace/sürüm uyumsuzluğunu yakalama)
- Fault içinde gizli bilgi ve iç izleme (traceback) sızıntısını engelleyen hata eşlemesi
- Sağlayıcı kimlik bilgisini Password alanında saklayan ve yalnız sunucuda çözen bir SOAP bağlantı DocType'ı
- WS-Security/WS-Addressing desteği (gereksinim tanımlanmamış)
- planlanan Frappe adaptörü içinde SOAP için yetenek (capability) ve zarf (kernel-envelope) sözleşmesi
- Sağlayıcı, SOAP sürümü ve örnek WSDL girdisi (kaynak dışı, hâlâ belirsiz)

Nasıl tamamlanır: Önce soap-api--contract için hedef sağlayıcıyı, SOAP sürümünü, WS-Security gereksinimini ve gerçek bir örnek WSDL/XSD'yi girdi olarak sabitle; bu girdi gelmeden build başlamasın. Sonra yeni bağımsız bir uygulama modülünde SOAP/XML bağımlılığını kendi pyproject'inde tanımla; suite'in lxml'ine dolaylı yoldan dayanma. Ardından en dar davranış için, örnek WSDL'deki tek bir işlemin istemci tarafı tüketimi için, gerçek RED/GREEN testi yaz: XSD'ye uymayan yanıt reddedilmeli, namespace/sürüm uyumsuzluğu tipli hata vermeli, fault gizli bilgi taşımamalı. XML ayrıştırıcıda suite/drive/webdav/xmlutil.py'deki sertleştirme ayarlarını örnek al (resolve_entities=False, no_network, load_dtd=False, DOCTYPE reddi, gövde sınırı), ama modülü doğrudan import etme. Sunucu tarafını en son ekle: global before_request yerine allow_guest=False ile tanımlı tek bir whitelisted method ya da ayrı ve kapsamı sınırlı bir rota kullan. Kimlik bilgisi Password alanında tutulsun, get_decrypted_password ile yalnız sunucuda okunsun. Mevcut bağımlılık sırası korunsun: kernel-envelope, tenant-registry, native-user-policy, capability-definition, outbox ve api-middleware sözleşmeleri.

Kaynak dayanakları: `frappe/frappe/app.py:341`; `frappe/frappe/integrations/doctype/webhook/webhook.json:127`; `suite/suite/drive/webdav/xmlutil.py:18`; `suite/suite/drive/webdav/xmlutil.py:46`; `suite/pyproject.toml:17`.

Rehber: [soap-api](./frappe-roadmap-contracts/soap-api.json). Mevcut birincil görev: `soap-api--implementation`.

### integration-12 — XML canlı besleme; HTTP pull/push ile çift yönlü ve artımlı veri eşitleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

XML'in taşıma olmadığı ve cursor/silme/XXE/SSRF kabulü doğru tanımlı. Zamanlayıcı, HTTP istemcisi ve XML parser primitifleri kaynakta var. Besleme çekme/itme ve eşitleme mantığı yok. Çift yönlü çakışma kuralı ve checkpoint saklama sözleşmesi eksik.

Eksik:

- Cursor/checkpoint ve silme işareti için saklama DocType'ı tanımsız.
- Çift yönlü eşitlemede çakışma çözümü ve yazma idempotency'si tanımsız.
- Push alımı için kimlik doğrulama (imza/token) ve 429/boyut sınırı integration-8'e bağlanmamış.
- Zamanlama kaynağı belirsiz: scheduler_events mi, Scheduled Job Type mı? Gecikme hedefinin sayısal değeri yok.
- Egress allowlist ve parser yapılandırmasının sahibi atanmamış.

Nasıl tamamlanır: xml-feed--implementation için checkpoint DocType alanlarını, çakışma kuralını (kaynak öncelikli veya zaman damgası) ve sayısal gecikme hedefini ekle. Tek örnek XSD ile sözleşmeyi sabitle.

Kaynak dayanakları: `suite/suite/hooks.py:289`; `frappe/pyproject.toml:68`; `suite/pyproject.toml:17`.

Rehber: [xml-feed](./frappe-roadmap-contracts/xml-feed.json). Mevcut birincil görev: `xml-feed--implementation`.

### integration-13 — MCP entegrasyonu; şemalı araç/kaynak kataloğu ve güvenli uzak erişim.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe ve Suite'te MCP sunucusu yok: JSON-RPC MCP uç noktası, Streamable HTTP/stdio taşıması, initialize/protokol sürümü, tools/list, tools/call ya da resources/* bulunmuyor. Upstream Frappe'de MCP için kullanılabilecek, gerçekten çalışan şu temel parçalar var: (1) frappe/frappe/api/discovery.py ve v2 /api/v2/discovery* rotaları, whitelisted Python metotlarını ve DocType controller metotlarını AST ve inspect ile tarayarak makinece okunabilir bir katalog üretiyor. Katalogda parametre adı, zorunluluk, varsayılan değer ve tip; endpoint; HTTP metotları; allow_guest ve DocType metotları için GET=read/POST=write izin eşlemesi yer alıyor. Kaynak kodun gösterilmesi expose_discovery_source hook'una bağlı, katalog Redis'te önbellekleniyor ve erişim yalnız System Manager'a açık. (2) OAuth tarafında RFC 9728 /.well-known/oauth-protected-resource (OAuth Settings'e bağlı, Social Login Key'leri authorization_servers olarak ekleyebiliyor), RFC 8414 sunucu metadata'sı, RFC 7591 dinamik istemci kaydı, PKCE S256 ve 401 yanıtında WWW-Authenticate resource_metadata başlığı var. (3) Kimlik doğrulama: validate_oauth yalnız Frappe'nin kendi verdiği ve OAuth Bearer Token DocType'ında hash olarak saklanan tokenları kabul ediyor. auth_hooks bir genişletme noktası. Ancak bu MCP değil, cookie oturumuyla çalışan bir RPC. Suite'in Sheets AI istemcisi Anthropic API'ye giden bir LLM çağrısı (emit_actions tool_use); MCP altyapısı sayılmaz. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- MCP JSON-RPC sunucusu yok: initialize ve protokol sürümü pazarlığı, tools/list, tools/call, resources/list ve resources/read uygulanmamış.
- Streamable HTTP uç noktası (tek MCP yolu, Origin doğrulaması, oturum başlığı) ve yerel stdio taşıması yok.
- Discovery çıktısı MCP inputSchema/outputSchema'ya (JSON Schema) çevrilmiyor. Yalnız System Manager görebildiği için kullanıcı kapsamlı, izne göre süzülmüş bir araç kataloğu yok. Tüm whitelisted metotlar listeleniyor; açıkça onaylanmış bir araç allowlist'i yok.
- Keycloak'un verdiği access token'ı (JWT, JWKS, iss, aud/resource) doğrulayıp Frappe User'a eşleyen bir bearer doğrulaması yok. validate_oauth yalnız Frappe'nin kendi token'ını tanıyor ve audience kontrolü yapmıyor.
- Okuma/yazma araç politikası, MCP yazma çağrıları için açık onay/ret akışı ve kalıcı onay/audit kaydı (kim, ne zaman, hangi argüman ve sonuç) yok.
- MCP araç kataloğunun GenUI component registry'sinden ve query-action registry'sinden ayrı tutulduğunu gösteren bir sınır/sözleşme yok.

Nasıl tamamlanır: Sıra mevcut bağımlılıklara göre: önce mcp-api--contract ve native-user-policy--contract, sonra mcp-api--implementation. En küçük adım: Suite içinde, planlanan Frappe adaptörü'dan ayrı bir modülde, salt okunur ve sabit allowlist'li 3-5 araçla Streamable HTTP üzerinden çalışan bir MCP tools/list + tools/call ucu. Örnek araçlar: frappe.client.get_list/get, planlanan Frappe adaptörü.metadata. Araç şeması discovery.py'deki _method_params çıktısından JSON Schema'ya çevrilsin, her çağrı native has_permission ile kullanıcı bağlamında çalışsın. Ardından auth_hooks ile Keycloak JWT doğrulaması (iss, aud=MCP resource, JWKS) ve Frappe User eşlemesi eklensin; mevcut oauth-protected-resource metadata'sı bu resource ile hizalansın (integration-9 kimlik ADR'sine bağlı). Yazma araçları en son gelsin; planlanan Frappe adaptörü'daki preview→digest→apply desenini ve kalıcı onay/audit kaydını kullansın. Her davranış için önce RED, sonra GREEN test kanıtı üretilsin; testler bu incelemede yazılmadı ve çalıştırılmadı.

Kaynak dayanakları: `frappe/frappe/api/v2.py:606`; `frappe/frappe/api/discovery.py:29`; `frappe/frappe/api/discovery.py:305`; `frappe/frappe/integrations/oauth2.py:307`; `frappe/frappe/auth.py:722`.

Rehber: [mcp-api](./frappe-roadmap-contracts/mcp-api.json). Mevcut birincil görev: `mcp-api--implementation`.

### integration-14 — AI Mapping; kaynak/hedef alan, tip, birim, kod ve ilişki eşlemesine denetlenebilir öneri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni manuel yol, önizleme, açık onay ve otomatik import yasağıyla güçlü. Kaynakta hedef şema içgözlemi (get_meta, link alanları) var. Eşleme önerisi, eşleme artefaktı ve sürümlü uygulama yok. Uygulamanın native Data Import yoluna bağlanıp bağlanmayacağı belirtilmemiş.

Eksik:

- Eşleme artefaktı şeması (kaynak alan, hedef alan, dönüşüm, güven, kanıt, sürüm) tanımsız. field-mapping-rule görevine bağlı ama alanları yok.
- Uygulama yolu belirsiz: native Data Import/insert izin yolu mu, özel yazıcı mı?
- Birim ve kod listelerinin kaynağı tanımsız.
- Model sağlayıcı, zaman aşımı ve değerlendirme ölçütü (doğruluk eşiği) tanımsız.
- v2 get_meta yalnız All rolü istiyor. Meta okuma yetkisi yazma yetkisi sayılmamalı.

Nasıl tamamlanır: field-mapping-rule--implementation-post-mvp'de artefakt alanlarını ve onay sonrası uygulamanın native izinli insert/Data Import üzerinden yapılacağını yaz. Model katmanını opsiyonel öneri kaynağı olarak sınırla.

Kaynak dayanakları: `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v2.py:246`; `frappe/frappe/api/v1.py:96`.

Rehber: [field-mapping](./frappe-roadmap-contracts/field-mapping.json). Mevcut birincil görev: `field-mapping--implementation`.

### releases-1 — DevOps (Development and Operations — geliştirme ve işletim birlikteliği) araç bağlantıları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream kaynakta iki somut primitive var. (1) Suite reposunda GitHub Actions tabanlı CI ve artifact hattı bulunuyor. suite-ci.yml dosyası bench get-app ve bench build adımlarını çalıştırıyor. meet-sfu-build.yml, meet-recorder-build.yml ve meet-stt-build.yml Docker Buildx ile ghcr.io'ya imaj itiyor. Bu iş akışlarında permissions bölümü contents:read ve packages:write ile sınırlı; GITHUB_TOKEN kullanılıyor ve sha etiketi üretiliyor. (2) Frappe çekirdeğindeki Webhook DocType, belge olaylarında dış HTTP uç noktasına istek gönderiyor (enqueue_webhook → send_webhook_request). İmza başlığı, yeniden deneme ve Webhook Request Log destekleniyor. Connected App ve OAuth Client genel dış araç bağlantısı sağlıyor. Pakette ayrıca [deploy.dependencies.apt] ffmpeg tanımı ve bench dışında konuşlanan bağımsız servis listesi var. buradaki 'release' eşleşmeleri yalnız DB kilit bırakma kodu. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Bu iş akışları upstream frappe/suite reposuna ait. Hedef SaaS için seçilmiş bir DevOps aracı yok: frappe_docker veya Press kararı kaynakta bulunmuyor; sorumlu da tam adla belirtilmemiş.
- Frappe ve Suite uygulamasının birlikte paketlendiği site/bench imajı ve registry yolu tanımlı değil.
- sheets/collab-server için Dockerfile ve imaj build iş akışı yok; CI'da yalnız test ediliyor.
- Suite commit'i bilinmiyor; build çıktısını kaynak revizyonuna (frappe adf1fd0 + suite) bağlayan sözleşme yok.
- Hedef org'a özel servis hesabı ve repo/artifact kapsamı tanımlı değil; mevcut izinler upstream GITHUB_TOKEN için.
- Frappe içinde GitHub/GitLab/Jenkins/ArgoCD gibi DevOps araçlarına özel bağlayıcı DocType yok; mevcut olan genel Webhook ve OAuth/Connected App.
- ffmpeg apt bağımlılığının imaja nasıl aktarılacağı tanımlı değil.
- Headless provider tarafında deploy veya sürüm kimliği uç noktası yok.

Nasıl tamamlanır: Mevcut ci-pipeline--contract tamamlandıktan sonra ci-pipeline--implementation görevinde şu sırayla ilerleyin: 1) Tek dağıtım aracı kararını sorumlusunun tam adıyla yazın (frappe_docker veya Press). 2) frappe adf1fd0 ve suite commit'ini sabitleyen bir apps listesiyle site imajı build adımını tanımlayın; ffmpeg'i bu imaja ekleyin. 3) Mevcut meet-*-build.yml desenini (sha etiketi, en az yetki) hedef org registry'sine uyarlayın ve collab-server için eksik Dockerfile ile build adımını ekleyin. 4) Servis hesabını yalnız ilgili repo okuma ve paket yazma yetkisiyle sınırlayın. Yeni görev açmayın; testler yazılmadı ve çalıştırılmadı.

Kaynak dayanakları: `suite/.github/workflows/meet-sfu-build.yml:19`; `suite/.github/workflows/meet-sfu-build.yml:27`; `suite/.github/workflows/suite-ci.yml:128`; `frappe/frappe/integrations/doctype/webhook/webhook.py:173`; `suite/pyproject.toml:35`; `suite/pyproject.toml:88`.

Rehber: [ci-pipeline](./frappe-roadmap-contracts/ci-pipeline.json). Mevcut birincil görev: `ci-pipeline--implementation`.

### releases-2 — CI/CD (Continuous Integration / Continuous Delivery — sürekli entegrasyon / sürekli teslimat) güncelleme bağlantısı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni doğru: başarısız kontrol dağıtımı engellemeli. Kaynakta engelleme primitifleri var: migrate varsayılan olarak durur, --skip-failing yalnız bayrakla açılır, never_skip_patches hook'u mevcut, ruff yapılandırması var. Ancak pipeline aşamaları ve kapıları tanımlanmamış.

Eksik:

- Hangi kapıların çalışacağı listelenmemiş (ruff, frontend vitest, Frappe testleri, staging migrate)
- Üretimde --skip-failing yasağı ve kritik Suite patch'lerinin never_skip_patches'e eklenmesi yazılmamış; Suite hooks alıntısında görülmedi
- Kabul edilen artifact sürümünün kaydı belirsiz: suite version 0.0.1 sabit, sourceHead null

Nasıl tamamlanır: Mevcut göreve kısa bir kapı listesi ekleyin: lint, birim testi, staging kopyasında --skip-failing olmadan migrate, ardından frappe ve suite revizyonunun kaydı. Altyapı adımlarını Hüseyin Cengiz'e devredin.

Kaynak dayanakları: `frappe/frappe/modules/patch_handler.py:48`; `frappe/frappe/modules/patch_handler.py:80`; `suite/pyproject.toml:47`.

Rehber: [ci-pipeline](./frappe-roadmap-contracts/ci-pipeline.json). Mevcut birincil görev: `ci-pipeline--implementation`.

### releases-3 — Rollback (önceki sürüme dönüş) yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat, kod sürümünü düşürmenin şemayı ve veriyi geri döndürmediğini doğru söylüyor. Kaynakta tek bir rollback artifact'ı var (Sheets blob). Buna karşılık geri dönüşsüz adımlar da var: Drive File doctype'ı siliniyor, mail önbelleğinde rmtree çalışıyor. Ayrıca disk üzerindeki mail LMDB/blob ve arama indeksleri DB snapshot'ının dışında kalıyor.

Eksik:

- İleri yönlü (geri alınamaz) patch'lerin listesi ve bunlar için yalnız restore politikası yok
- Snapshot kapsamı yalnız DB ve anahtarlar; mail data/blob/search dizinleri, Drive dosyaları ve S3 belirtilmemiş
- RPO/RTO ve prova sıklığı yok; restore sırasında installer'ın set_as_patched davranışı açıklanmamış

Nasıl tamamlanır: release-rollback--implementation görevine şunları ekleyin: geri alınamaz patch envanteri (Drive entegrasyonu, mail namespace) ve DB, dosya ve önbellek dizinlerini birlikte kapsayan snapshot kapsamı. Prova kabulünü bu kapsamla eşleyin.

Kaynak dayanakları: `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:6`; `suite/suite/drive/patches/integrate_with_framework.py:60`; `suite/suite/mail/patches/migrate_cache_to_mail_namespace.py:51`; `frappe/frappe/installer.py:115`.

Rehber: [release-rollback](./frappe-roadmap-contracts/release-rollback.json). Mevcut birincil görev: `release-rollback--implementation`.

### releases-4 — Migration engine (veri ve şema geçiş motoru).

Kaynak durumu: **VAR**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe v17-dev'de patch motoru doğrudan kaynakta var: pre_model_sync, post_model_sync ve post_fixture_sync aşamaları, Patch Log ve SiteMigration. Ancak Suite patch'leri satır bazındaki hataları loglayıp patch'i başarılı sayıyor; bu, 'hata üretimde atlanmasın' kabulüyle çelişiyor. Sadece kaynak okumasına göre Sheets patch'inde tanımsız 'suite' adı kullanılıyor gibi görünüyor; bu durumda boş olmayan her belgede hata sessizce loglanır. Çalıştırılmadı, doğrulanmadı.

Eksik:

- Patch'lerin hangi bölüme (pre/post_model_sync, post_fixture_sync) yerleşeceğine dair kural yazılmamış
- Satır bazında yutulan hatalar için politika yok: başarısız patch mi sayılacak, hata eşiği ne olacak
- Arka plana ertelenen patch'lerin (Sieve enqueue) tamamlanma takibi yok
- v16→v17 yükseltme yolu ve suite frappe>=16,<18 aralığının hangi sürümde test edileceği eşlenmemiş

Nasıl tamamlanır: schema-migration--implementation görevine bölüm kuralını, kritik patch'ler için never_skip_patches'i ve satır hatası politikasını ekleyin. Sheets patch'indeki şüpheli adı mevcut insan bütçesi içinde tek senaryoyla doğrulayın.

Kaynak dayanakları: `frappe/frappe/modules/patch_handler.py:79`; `frappe/frappe/migrate.py:142`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:66`; `suite/suite/drive/patches/integrate_with_framework.py:54`; `suite/suite/mail/patches/rebuild_automation_sieve_scripts.py:32`.

Rehber: [schema-migration](./frappe-roadmap-contracts/schema-migration.json). Mevcut birincil görev: `schema-migration--implementation`.

### releases-5 — Demo verisi etkinleştirme.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynak gösterilen demo adımı Frappe CRM'e ait; CRM bu sitede kurulu değil (yalnız frappe ve suite kurulu). Suite'e ait bir demo mekanizması alıntıda görülmedi. Fixture'lar her migrate'te tüm sitelere senkronize edildiği için demo verisi için uygun değil.

Eksik:

- 'Demo tenant' kavramının Frappe sitesine nasıl eşlendiği tanımsız
- Demo verisinin sıfırlanması ve kaldırılması, ayrıca demo verisinin gerçek siteye karışmasını engelleyen sınır yok
- Fixture veya patch kullanımının yasak olduğu yazılmamış
- Hangi Suite modülleri için demo verisi gerektiği belirtilmemiş

Nasıl tamamlanır: Önce koşullu kapsamı netleştirin. Gerekiyorsa demo-seed--implementation görevine şunu yazın: yalnız demo sitesinde, rol kontrolüyle çalışan, fixture dışı bir seed komutu ve geri alma adımı.

Kaynak dayanakları: `frappe/frappe/migrate.py:175`; `suite/suite/hooks.py:359`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `demo-seed--implementation`.

### releases-6 — Sürüm paketi doğrulama, modül uyumu ve geçiş ilerlemesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Temel primitifler var: sürüm aralığı bildirimi, Installed Applications sürüm geçmişi, migrate sonunda version-update yayını ve Patch Log'daki skipped/traceback alanları. Ancak paket imzası, modül uyum matrisi ve aşama bazında ilerleme kaynakta yok. Patch Log yalnız System Manager ve Administrator rolleri tarafından okunabiliyor.

Eksik:

- İmza/doğrulama yöntemi ve doğrulanmamış paketi reddeden kapı tanımlanmamış
- Uyum matrisi required_apps ve frappe-dependencies aralığına bağlanmamış; frappe dağıtım sürümü 'unknown'
- Headless ilerleme için aşama olayı yok (yalnız bitişte version-update var); Patch Log'un headless sunumu için izin sınırı yazılmamış
- releases-3 ile aynı ana görevi paylaşıyor ama doğrulama ve ilerleme kısmı ayrıştırılmamış

Nasıl tamamlanır: release-rollback--implementation altında, schema-migration--implementation'ı destekleyici görev olarak bağlayın; yeni görev açmayın. Uyum kuralını frappe-dependencies aralığı ve kurulu sürümlerden türetin. İlerleme görünümü Patch Log izinlerini korusun.

Kaynak dayanakları: `suite/pyproject.toml:45`; `frappe/frappe/migrate.py:162`; `frappe/frappe/migrate.py:108`; `frappe/frappe/core/doctype/patch_log/patch_log.json:60`.

Rehber: [release-rollback](./frappe-roadmap-contracts/release-rollback.json). Mevcut birincil görev: `release-rollback--implementation`.

### releases-7 — Geçiş önkontrolü; uygulama geri dönüşü ile veri geri dönüşünü ayırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul anlamlı. Ancak talimat, v17-dev kaynağındaki gerçek migrate sırasına bağlanmamış. Bu sıra: faz bazlı transaction/commit sınırları (DDL ve dosya etkilerinin atomik geri alınması kanıtlanmadı), pre/post_model_sync ve post_fixture_sync patch'leri, Patch Log ile --skip-failing/never_skip_patches. Suite patch'lerinin bir kısmı geri alınamayan veri/dosya değişikliği yapıyor: owner için ham UPDATE, rmtree. Uygulama rollback'i bu değişiklikleri geri almaz.

Eksik:

- Önkontrol listesi yok: bekleyen patch'ler, skip-failing yasağı, migrate sonrası Error Log taraması.
- Geri alınamayan patch sınıflandırması (veri/dosya mutasyonu) ve sürüm başına 'yalnız restore ile geri dönülebilir' işareti yok.
- Restore uyumluluğu (eski sürüm yedeğinin yeni kodla yüklenmesi) ve RPO/RTO değerleri tanımsız.
- Sheets patch'inde 'suite' adı içe aktarılmamış görünüyor. Hata yakalanıp loglandığı için patch tamamlanmış görünebilir; bu durum çalıştırılarak doğrulanmadı.

Nasıl tamamlanır: schema-migration--implementation altında tek sayfalık bir migrate runbook'u yaz. İçeriği: önkontrol, --skip-failing yasağı, migrate sonrası Patch Log ve Error Log kontrolü, patch başına 'uygulama rollback'i yeterli / restore şart' etiketi. Sheets patch'indeki ad hatasını ayrı bir kusur olarak doğrula.

Kaynak dayanakları: `frappe/frappe/migrate.py:47`; `frappe/frappe/modules/patch_handler.py:48`; `suite/suite/mail/patches/create_suite_user_role.py:47`; `suite/suite/mail/patches/migrate_cache_to_mail_namespace.py:51`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:6`; `suite/suite/sheets/patches/v0_1/migrate_blob_to_cells.py:66`; `frappe/frappe/installer.py:114`.

Rehber: [schema-migration](./frappe-roadmap-contracts/schema-migration.json). Mevcut birincil görev: `schema-migration--implementation`.

### releases-8 — Demo verisini oluşturma/sıfırlama; gerçek veriden ayırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (yalnız etiketli demo tenant, dış servislere dokunmama) doğru. Ancak 'demo etiketi'nin nerede tutulacağı ve izolasyon birimi (ayrı site mi, aynı site mi) tanımsız. Fixtures her migrate'te yeniden senkronlandığı için demo verisinin taşıyıcısı olamaz. Suite'te Mail/JMAP gibi dış servis yan etkileri de var.

Eksik:

- Demo işaretinin yeri (site_config anahtarı vb.) ve reset'in hangi koşulda reddedileceği tanımlı değil.
- Fixture ile demo seed ayrımı yok. Hooks'taki fixtures her migrate'te uygulanır.
- Mail/JMAP, scheduler ve e-posta çıkışını kapatma mekanizması belirtilmemiş.
- Seed'in izinli API'ler üzerinden mi yükleneceği belirtilmemiş. ignore_permissions yolu yasaklanmamış.

Nasıl tamamlanır: demo-seed--implementation için iki karar yaz: (1) demo ayrı bir site olsun ve site_config'te bir demo bayrağı taşısın; (2) reset bu bayrak yoksa çalışmasın, scheduler ve outbound mail kapalı olsun. Seed, fixtures dışında ve izin kontrollü insert ile yüklensin.

Kaynak dayanakları: `suite/suite/hooks.py:353`; `suite/suite/hooks.py:359`; `frappe/frappe/migrate.py:175`; `frappe/frappe/client.py:245`; `suite/suite/mail/patches/rebuild_automation_sieve_scripts.py:28`.

Rehber: [demo-seed](./frappe-roadmap-contracts/demo-seed.json). Mevcut birincil görev: `demo-seed--implementation`.

### releases-9 — Bakım modu, kademeli güncelleme ve yayın sonrası sağlık kontrolü.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta bakım ve migrate primitifleri var: in_migrate bayrağı, bakım modunda deferred insert flush, migrate sonunda 'version-update' realtime olayı. Ancak tek paylaşılan veritabanı üzerinde canary yapılırsa eski ve yeni kod aynı şemayı görür. Talimat bunu ve 'otomatik rollback'in şemayı geri almadığını ele almıyor. Bu, releases-7 ile çelişki riski taşıyor.

Eksik:

- Headless/API istemcileri için bakım yanıtı sözleşmesi tanımsız (HTTP durum kodu, Retry-After, istemci davranışı).
- Sağlık kontrolünün kapsamı tanımsız: worker'lar, scheduler, realtime, Error Log artışı.
- Canary için expand/contract şema uyumluluk kuralı yok. 'Hata rollback'i tetiklesin' ifadesi veri rollback'inden ayrılmamış.
- Görev sahibi kişi olarak belirtilmemiş. Teknik kurulumun sahibi Hüseyin Cengiz olmalı.

Nasıl tamamlanır: release-rollback--implementation'a tek bir kural ekle: şema değiştiren sürümde canary yalnız geriye uyumlu (expand) fazda yapılsın. Sağlık eşiği ve bakım yanıtı sözleşmesi Hüseyin Cengiz tarafından yazılsın.

Kaynak dayanakları: `frappe/frappe/migrate.py:108`; `frappe/frappe/migrate.py:160`; `frappe/frappe/automation_engine/dispatch.py:59`; `frappe/frappe/migrate.py:37`.

Rehber: [release-rollback](./frappe-roadmap-contracts/release-rollback.json). Mevcut birincil görev: `release-rollback--implementation`.

### releases-10 — Desteklenen sürümler, güvenlik güncelleme dönemi ve yaşam sonu (EOL) geçiş politikası.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Politika ihtiyacı doğru tanımlanmış. Ancak yerel taban bir sürüm değil: commit'e sabitlenmiş bir geliştirme dalı (17.0.0.dev0). Suite ise Frappe >=16,<18 aralığını kabul ediyor. Destek matrisi bu farkı ve Python 3.14 kısıtını ele almıyor. v16→v17 geçiş patch'leri kaynakta mevcut.

Eksik:

- Dev commit'in (adf1fd0) destekli sürüm sayılıp sayılmayacağı kararı yok.
- Suite'in v16–v17 aralık beyanı ile gerçekte test edilen bileşim arasındaki ayrım yok.
- Keycloak, frontend ve Tauri sürümleri için matris şablonu ve EOL bildirim kanalı tanımsız.

Nasıl tamamlanır: Tek bir destek matrisi tablosu tanımla: Frappe commit/sürümü, Suite, Python, Keycloak, istemci. Her satırda 'beyan edilen' ve 'denenmiş' ayrı sütunlarda olsun. Yeni bir görev açma; releases-6 uyum kontrolünü bu tabloya bağla.

Kaynak dayanakları: `frappe/pyproject.toml:7`; `suite/pyproject.toml:45`; `frappe/frappe/patches/v16_0/sidebar_archive.py:1`.

Rehber: [release-rollback](./frappe-roadmap-contracts/release-rollback.json). Mevcut birincil görev: `release-rollback--implementation`.

### releases-11 — İmzalı istemci güncellemeleri ve yerel veritabanı migrationı; bekleyen outbox korunması ve doğrulanmış geri dönüş.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

İstemci tarafı kabul ölçütleri ayrıntılı. Ancak 'çoğalmadan eşitlensin' için sunucu tarafında idempotency sözleşmesi yok. v1 create_doc, istemci mutasyon kimliği olmadan doğrudan insert ediyor. Kaynakta sunucu tarafı dedup için örnek desen (automation queue dedup_key) ve meta/version-update primitifleri mevcut. Kaynaklarda Capacitor geçiyor, oysa Tauri seçili; bu bir tutarsızlık.

Eksik:

- Outbox tekrar oynatımı için sunucu tarafı dedup alanı/kuralı tanımsız (ör. Custom Field + unique). Bu kural izin kontrollü insert yolu üzerinden işlemeli.
- Minimum istemci sürümü ve API uyum kapısı (eski istemcinin reddi) tanımsız.
- Kaynak listesindeki Capacitor referansı, Tauri 2 kararıyla çelişiyor.

Nasıl tamamlanır: client-migration--implementation idempotency için mevcut integrity-7 sözleşmesine bağlansın: anahtar site/aktör/işlem kapsamında, istek içerik özetiyle eşleşsin; aynı anahtar farklı içerikle gelirse reddedilsin. Önceki sonuç yalnız güncel okuma yetkisiyle dönsün. Unique kısıt tek başına bu sözleşmenin tamamı değildir. Capacitor kaynağı tarihsel olarak etiketlensin; seçili Tauri kararı korunsun.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/automation_engine/dispatch.py:109`; `frappe/frappe/api/v2.py:649`; `frappe/frappe/migrate.py:108`.

Rehber: [client-migration](./frappe-roadmap-contracts/client-migration.json). Mevcut birincil görev: `client-migration--implementation`.

### releases-12 — Tauri 2 mobilde imzalı mağaza güncellemesi; masaüstü updater ile mobil OTA sınırını ayırma.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynağında Tauri 2 istemcisi yok: src-tauri, tauri.conf veya updater eklentisi bulunmuyor. Mağaza paketleme ve imza yapılandırması (keystore, signingConfig, fastlane/TestFlight, .apk/.aab/.ipa) da yok. Mobil OTA mekanizması ve masaüstü updater/mobil OTA sınırını tanımlayan kod da bulunmuyor. Bulunanlar bu maddeyle ilgisizdir. Suite'in Vue frontend'i bench asset'i olarak derleniyor. Web PWA tarafında iki service worker var: Slides için önbellek SW'si ve Mail için yalnız FCM bildirim SW'si (vite-plugin-pwa injectManifest, manifest:false). Her ikisi de skipWaiting/clients.claim ile yeni sürümü hemen etkinleştiriyor. Bu davranış, kullanıcı form doldururken zorla yenilememe veya outbox'ı koruyarak güncelleme kabulüne aykırı. Üstelik yalnız tarayıcı PWA kapsamında; Tauri mağaza veya OTA primitifi değil. istemci sürümü, minimum sürüm veya güncelleme sözleşmesi yok. frappe/ui içindeki 'liveUpdates' eşleşmesi ActivityTimeline'ın gerçek zamanlı güncellemesi; OTA değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tauri 2 istemci projesi (src-tauri, tauri.conf, capabilities) ve React/AntDesign istemcisinin Tauri kabuğu
- Masaüstü için Tauri updater eklentisi, imzalı güncelleme manifesti ve imza anahtarı yönetimi
- Mobil için imzalı App Store/Google Play paketleme hattı (Android keystore/AAB, iOS provisioning/IPA)
- Masaüstü updater ile mobil mağaza/OTA yolunu ayıran açık yapılandırma veya sözleşme
- İstemci native/şema sürümü ve minimum desteklenen sürüm sözleşmesi (Frappe provider tarafında da yok)
- Güncelleme ve migration sırasında form/outbox/dosya koruması, soğuk açılış sağlık kontrolü, veri kaybettirmeyen geri dönüş engeli
- Mobil OTA PoC (yapılmadıkça desteklenmiyor sayılır)
- İmza anahtarının saklanma sorumluluğu ve rotasyonu (kaynakta yok, talimatta da tanımlı değil)

Nasıl tamamlanır: Mevcut bağımlılık sırası korunarak önce tauri-mobile-release--contract tamamlanmalı. Bu sözleşme şunları tanımlamalı: masaüstü yolu Tauri updater ile imzalı manifest, mobil yolu ise yalnız imzalı mağaza paketi; OTA, PoC doğrulanana kadar kapalı. Sözleşme istemcinin native/şema sürümünü ve minimum desteklenen sürümü de içermeli. İmza anahtarlarının sahibi ve rotasyon sorumlusu olarak Hüseyin Cengiz yazılmalı. Önerilen bağımlılık, client-migration--implementation, açık bağımlılık olarak eklenmeli. Ardından ayrı istemci reposunda (Frappe app'i değil) en küçük uygulama adımı atılmalı: React/Vite istemcisine minimal Tauri 2 kabuğu eklenmeli. Önce yalnız Android için imzalı debug olmayan bir AAB üretim hattı ve soğuk açılış sağlık kontrolü kurulmalı; bunun için RED/GREEN kanıtı gerekir. Masaüstü updater bundan sonra gelir. İstemci sürümünü dönen salt okunur provider ucu, gerekiyorsa en son eklenmeli. Suite'in Vue frontend'i ve SW'leri bu işin tabanı olarak kullanılmamalı.

Kaynak dayanakları: `suite/frontend/src/apps/mail/sw.ts:49`; `suite/suite/www/service-worker.js:219`; `suite/frontend/vite.config.ts:126`.

Rehber: [tauri-mobile-release](./frappe-roadmap-contracts/tauri-mobile-release.json). Mevcut birincil görev: `tauri-mobile-release--implementation`.

### releases-13 — Mobil mağaza kabulü ve yayın kapısı: gerçek uygulama faydası, izinler, indirilen kod ve login politikaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de mağaza politikalarıyla ilişkili somut bir yapı taşı var: 'Personal Data Deletion Request' DocType'ı. Bu DocType e-posta doğrulaması, System Manager onayı, user_data_fields kapsamında alan anonimleştirme ve silme adımlarını yürütüyor. www/me.html'deki 'Delete Account' bağlantısı Website Settings'teki show_account_deletion_link bayrağıyla açılıyor. Onay bekleyen talepleri auto_account_deletion süresine göre otomatik işleyen zamanlanmış bir hook da tanımlı. Suite tarafında upstream Vue frontend'in bir PWA katmanı var: rota bazlı manifest enjeksiyonu (setPwaTags), display:standalone manifesti, Apple splash/ikon varlıkları ve VitePWA injectManifest ile service worker. Bu bir web kurulum yüzeyi; imzalı native mağaza paketi değil. yalnız şema metadata/düzenleme RPC'si sunuyor, yayın/izin/mağaza sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tauri/Capacitor/Cordova veya başka bir native mobil kabuk ve imzalı paket yapılandırması yok.
- Native izin bildirimleri ve açıklamaları (NS*UsageDescription, uses-permission) ile bunların kullanılan eklentilerle eşlemesi yok.
- Sürüm başına içerik sınıflandırması için kayıt yok (metin/görünüm, yeni işlev/veri/ödeme, native/izin değişikliği).
- Yayın kapısı DocType'ı/API'si, onaylayıcı rolü ve inceleme kanıtı bağlantısı yok.
- OTA/indirilen kod dağıtımını sınırlayan bir kapı yok; service worker'larda skipWaiting var ama içerik sınıfına bağlı onay kapısı yok.
- Sign in with Apple ve Apple 4.8 değerlendirmesi yok.
- Frappe'nin hesap silme akışı yalnız Frappe User kaydını anonimleştiriyor; Keycloak kimliğinin silinmesiyle entegrasyon yok.
- Hesap silme bağlantısı bir site ayarına bağlı ve web sayfası (/me) olarak sunuluyor; Suite Vue arayüzünde veya headless provider sözleşmesinde uygulama içi hesap silme girişi yok.
- Suite hooks.py'de suite verileri için user_data_fields bildirimi yok; mail tarafında kullanıcı devre dışı bırakılınca/silinince çalışan ayrı temizlik event'leri var.

Nasıl tamamlanır: tauri-mobile-release--implementation içinde, mevcut sözleşme bağımlılıkları (tauri-mobile-release--contract, keycloak-login--contract) tamamlandıktan sonra en küçük adım: 1) Yayın kapısı kontrol listesini sürümle birlikte versiyonlanan tek bir artefakt olarak tanımla. Alanlar: değişiklik sınıfı, native eklenti/izin farkı, izin açıklaması eşlemesi, login/4.8 değerlendirmesi, hesap silme yolu, inceleme kanıtı bağlantısı, onaylayıcı (ürün ekibi + Hüseyin Cengiz). 2) Hesap silme için Frappe'nin Personal Data Deletion Request akışını Keycloak kullanıcı silme/devre dışı bırakma ile eşleyen dar bir provider sözleşmesi yaz ve uygulama içinden erişilebilir bir giriş noktası tanımla. 3) Native/izin değişikliğinde OTA'yı reddeden tek bir kuralı gerçek RED/GREEN kanıtıyla ekle. Yeni görev açma.

Kaynak dayanakları: `frappe/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py:128`; `frappe/frappe/www/me.html:60`; `frappe/frappe/hooks.py:301`; `suite/frontend/public/pwa/suite/manifest.webmanifest:6`; `suite/frontend/src/router/index.ts:319`; `suite/frontend/vite.config.ts:119`.

Rehber: [tauri-mobile-release](./frappe-roadmap-contracts/tauri-mobile-release.json). Mevcut birincil görev: `tauri-mobile-release--implementation`.

### security-1 — Security management (güvenlik yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var: varlık, tehdit, kontrol ve sorumlu listesi isteniyor. Ancak tehdit modeli, Keycloak→Frappe oturum/token sınırı ve v17-dev sürüm eşlemesi tanımlı değil. Kaynakta tekil kontroller görülüyor: DocType izinleri, server script'in yalnız common_site_config ile açılması, realtime origin kontrolü. Suite çekirdek şifre güncelleme metodunu override ediyor ve allowlist'te test_helpers önekini bulunduruyor. Bunlar kontrol envanterine girmeli.

Eksik:

- Varlık/tehdit/kontrol matrisi ve her kontrolün sahibi (Hüseyin Cengiz / backend) yazılmamış.
- Keycloak OIDC ile Frappe session/API key/OAuth bearer arasındaki kimlik eşlemesi ve oturum iptali tanımsız.
- Suite override_whitelisted_methods (update_password) ve ALLOWED_WILDCARD_PATHS içindeki test_helpers öneki güvenlik incelemesine bağlanmamış.
- Kaynak dokümanlar genel; yerel v17.0.0.dev0 kaynak commit'iyle eşleme yok.

Nasıl tamamlanır: security-baseline--implementation altında tek bir kontrol matrisi oluşturulsun. Mevcut kaynak kontrolleri (has_permission, safe_exec kapısı, rate limit, realtime origin, __Auth şifreleme) tehditlere eşlensin. Suite override'ları ve test_helpers allowlist'i karar maddesi olarak eklensin. Bütçe içinde en fazla 1-2 kritik kontrol için doğrulama koşulu seçilsin.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `frappe/frappe/utils/safe_exec.py:87`; `frappe/realtime/middlewares/authenticate.js:21`; `suite/suite/hooks.py:203`; `suite/suite/hooks.py:450`.

Rehber: [security-baseline](./frappe-roadmap-contracts/security-baseline.json). Mevcut birincil görev: `security-baseline--implementation`.

### security-2 — WAF (Web Application Firewall — web uygulaması güvenlik duvarı).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

WAF motoru veya kural seti kaynakta yok; yalnızca uygulama katmanında kötüye kullanıma karşı bazı yapı taşları (primitive) var, bunların hepsi upstream/Suite'e ait. (1) Frappe global hız sınırlayıcı: hooks.py içinde before_request'e bağlanmış. site config'teki rate_limit ile süre tabanlı bütçe uyguluyor, aşımda 429 ve Retry-After/X-RateLimit-* başlıkları dönüyor. (2) Frappe @rate_limit dekoratörü: endpoint bazında IP'ye ya da kullanıcıya göre sayaç tutuyor. (3) Frappe User restrict_ip: validate_ip_address ile IP öneki allowlist'i uyguluyor, 2FA ile bypass seçeneği var. (4) Suite 'Rate Limit' DocType ve @dynamic_rate_limit dekoratörü: metot yolu bazında DB'den okunan limit, allowed_ips/blocked_ips önek listeleri ve enabled bayrağı var. Kayıt devre dışı bırakılarak kural geri alınabiliyor. Meet ve diğer API'ler kullanıyor. İstemci IP'si X-Forwarded-For başlığının ilk değerinden alınıyor, yani proxy/WAF topolojisine bağımlı. Repoda gelen deploy örnekleri (sheets nginx snippet, meet Caddyfile) yalnızca yönlendirme/proxy içeriyor, WAF kuralı yok. Runtime functionalAcceptance: not_run. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- HTTP istek gövdesi, başlık ve URL için imza/anomali tabanlı saldırı tespiti (SQLi/XSS/OWASP CRS benzeri) yok; mevcut primitive'ler sadece hız sınırı ve IP öneki filtresi.
- Edge/CDN/ingress WAF ürünü ve topolojisi seçilmemiş (sahibi Hüseyin Cengiz); kaynak kapsamı dışında.
- WAF'ın geçirmesi gereken route/fiil envanteri yok: /api/method, /api/v2, OAuth2 token uçları, Keycloak callback, /dav (PROPFIND vb.), socket.io, mail outbound/redirect.
- Güvenilir proxy doğrulaması yok: request_ip, X-Forwarded-For'un ilk değerinden koşulsuz alınıyor. Edge bu başlığı ezmezse IP tabanlı limitler ve blocked_ips sahte başlıkla atlatılabilir (kaynak okumasına dayalı çıkarım).
- Yanlış pozitif geri alma prosedürü, WAF log/izleme kanalı ve 'örnek saldırı bloklanır, meşru API ve Keycloak geçer' kabul testi tanımsız ve çalıştırılmadı.

Nasıl tamamlanır: Sıra önerisi: (1) edge-abuse--contract kapsamında, frappe/api/v1.py url_rules, api/v2 ve suite/hooks.py'deki allowlist/redirect girdilerinden route+HTTP fiili istisna listesi çıkarılır (OAuth2/Keycloak, /dav WebDAV fiilleri ve socket.io dahil). Ek olarak edge'in X-Forwarded-For başlığını ezme/güvenilir proxy sözleşmesi yazılır. (2) Hüseyin Cengiz, devir notunda WAF ürününü ve konumunu (CDN veya nginx/ingress), log kanalını ve kural geri alma yöntemini karara bağlar. (3) edge-abuse--implementation'da tek dar davranış ele alınır: staging'de bir örnek saldırı kuralının bloklandığı, /api/method ve Keycloak callback'in geçtiği RED/GREEN kabul senaryosu, production değişikliği yapılmadan. Uygulama katmanındaki Suite Rate Limit/blocked_ips ve Frappe rate_limit ikinci savunma hattı olarak korunur; WAF yerine sayılmaz.

Kaynak dayanakları: `frappe/frappe/hooks.py:500`; `frappe/frappe/rate_limiter.py:101`; `suite/suite/utils/rate_limiter.py:49`; `frappe/frappe/auth.py:66`; `frappe/frappe/auth.py:512`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:126`.

Rehber: [edge-abuse](./frappe-roadmap-contracts/edge-abuse.json). Mevcut birincil görev: `edge-abuse--implementation`.

### security-3 — Bot ve scraping (otomatik veri toplama) engelleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Rate limit'in tek başına yetmediği doğru belirtilmiş. Ancak sinyal listesi, izinli bot/entegrasyon istisnaları ve proxy arkasında gerçek IP güveni tanımlı değil. Kaynakta IP/kullanıcı tabanlı uç sınırlama, Suite'in IP allow/block listesi ve WebDAV kilitleme mekanizması var. Suite IP eşleşmesi CIDR değil, string startswith ile yapılıyor. Liste uç noktası istemcinin belirlediği limit_page_length değerini kabul ediyor; bu, scraping hacmini etkiler.

Eksik:

- Bot sinyalleri (UA, davranış, challenge) ve izinli arama botu/entegrasyon politikası seçilmemiş.
- request_ip'nin proxy arkasında hangi başlıktan güvenilir türetileceği tanımsız. IP tabanlı limitlerin tamamı buna bağlı.
- Suite blocked/allowed_ips önek eşleşmesi CIDR değil; yanlış eşleşme riski belgelenmemiş.
- /api/resource liste uçlarında sayfa boyutu üst sınırı ve scraping eşiği tanımsız.

Nasıl tamamlanır: edge-abuse--implementation altında edge bot politikası ile uygulama içi sınırlar ayrılsın. Uygulama tarafında mevcut rate_limit(user_based/ip_based) ve Suite Rate Limit DocType'ı kullanılsın. Güvenilir proxy/IP başlığı kararı ve liste sayfa boyutu üst sınırı açık kabul maddesi olarak eklensin.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:111`; `suite/suite/utils/rate_limiter.py:47`; `suite/suite/drive/webdav/auth.py:31`; `frappe/frappe/api/v1.py:22`.

Rehber: [edge-abuse](./frappe-roadmap-contracts/edge-abuse.json). Mevcut birincil görev: `edge-abuse--implementation`.

### security-4 — Rate limit (istek hızını sınırlandırma).

Kaynak durumu: **VAR**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Global limiter kaynakta native: conf.rate_limit {limit, window}, sabit pencere, süreye (mikrosaniye) dayalı sayaç, reddedildiğinde 429 ve Retry-After. Talimat ise üç ayrı mekanizmayı ayırmıyor: global limiter, uç dekoratörü (v17'de user_based var; 'kullanıcı başına değildir' notu yalnız global limiter için doğru) ve Suite Rate Limit DocType. Dekoratör RateLimitExceededError fırlatıyor; Retry-After eklediği görülmüyor. Suite limitleri developer_mode'da varsayılan olarak atlanıyor.

Eksik:

- Kabul metni yalnız global limiter'a uyuyor; dekoratör/Suite yolunda Retry-After beklentisi kaynakla doğrulanmamış.
- Hangi uçların dekoratör veya Suite Rate Limit kaydı alacağı ve eşik değerleri tanımsız.
- ignore_in_developer_mode varsayılanı nedeniyle yerel testte limitin atlanabileceği belirtilmemiş.
- create_rate_limit ignore_permissions kullanıyor; yalnız iç kurulum yardımcısı olarak kalmalı, headless API'ye açılmamalı.

Nasıl tamamlanır: rate-limit--implementation kabul metni üç mekanizmaya bölünsün: global (429 + Retry-After), dekoratör (RateLimitExceededError; başlık beklentisi ayrı) ve Suite DocType. Eşikler site_config ve Rate Limit kayıtlarıyla yapılandırılsın. Ortak bütçedeki tek senaryo developer_mode kapalı bir ortamda planlansın.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:16`; `frappe/frappe/rate_limiter.py:79`; `frappe/frappe/rate_limiter.py:89`; `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:186`; `suite/suite/utils/rate_limiter.py:37`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`.

Rehber: [rate-limit](./frappe-roadmap-contracts/rate-limit.json). Mevcut birincil görev: `rate-limit--implementation`.

### security-5 — Gizli anahtar kasası, erişim kapsamı, yenileme ve iptal.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Vault ve rotasyonun harici sorumluluk olduğu doğru tespit edilmiş. Ancak kaynakta dağınık sır konumları var ve bunların envanteri yok: __Auth içinde Fernet ile şifrelenen alanlar, site_config'te <provider>_login ve recorder_secret, Redis'te socketio secret, SFU jwtSecret, hash'lenen OAuth bearer token'lar. WebDAV kimlik önbelleği 600 sn TTL'li. 'Eski kimlik bilgisi çalışmasın' kabulü için önbelleğin rotasyonda temizlenip temizlenmediği doğrulanmalı.

Eksik:

- Sır envanteri (konum, sahip, rotasyon yöntemi) yok: encryption_key, recorder_secret, socketio secret, Social Login Key/Keycloak client secret, User api_secret, SFU JWT secret.
- encryption_key döndürüldüğünde __Auth değerlerinin yeniden şifrelenmesi prosedürü tanımsız.
- WebDAV CRED_CACHE_TTL=600 ile şifre değişikliği sonrası eski şifrenin önbellekte geçerli kalıp kalmadığı doğrulanmamış.
- Vault ile Frappe arasındaki enjeksiyon sınırı (site_config üretimi, servis kimliği) seçilmemiş.

Nasıl tamamlanır: secret-lifecycle--implementation için kaynaktan türetilen sır envanteri tablosu hazırlansın; değerler yazılmasın. Her sır için rotasyon ve iptal yolu ile servis erişim kapsamı belirlensin. Vault entegrasyonu Hüseyin Cengiz'e teknik devir olarak tanımlansın. WebDAV önbelleğinin iptal davranışı açık kabul maddesi olsun.

Kaynak dayanakları: `frappe/frappe/utils/password.py:38`; `frappe/frappe/utils/oauth.py:142`; `suite/suite/meet/recording/callback_auth.py:359`; `frappe/frappe/realtime/auth.py:109`; `suite/suite/drive/webdav/auth.py:28`; `frappe/frappe/patches/v16_0/hash_oauth_bearer_tokens.py:13`.

Rehber: [secret-lifecycle](./frappe-roadmap-contracts/secret-lifecycle.json). Mevcut birincil görev: `secret-lifecycle--implementation`.

### security-6 — Aktarımda/depolamada şifreleme ve hassas alan koruması.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam doğru ayrılmış: TLS harici, at-rest ayrı tasarım, deneysel masking hariç. Kaynakta şunlar var: tekil dokümanda alan düzeyi okuma izni (apply_fieldlevel_read_permissions), permlevel tabanlı izin, şifre hash'leme ve __Auth Fernet şifrelemesi. 'Hassas alan API/rapor yanıtında görünmesin' kabulü bu yolların hepsini kapsamıyor; liste, get_value, rapor ve expand_links yollarında permlevel uygulaması görülen kesitte doğrulanamıyor. Drive'ın S3 (boto3) dosya deposu at-rest şifrelemesi tanımsız.

Eksik:

- Hassas alan sınıflandırması ve permlevel ataması (Custom Field/Property Setter ile) tanımsız.
- Kabul yalnız read_doc'u değil get_list, get_value, report ve expand_links yollarını da açıkça saymalı.
- MariaDB at-rest, yedek ve S3/Drive dosya şifrelemesi için seçim ve sahip yok.
- TLS sonlandırma noktası ve iç trafik (realtime→web loopback, recorder/SFU) şifreleme kararı yok.

Nasıl tamamlanır: encryption-profile--implementation altında hassas alanlar native permlevel ile korunsun; kopya ORM yazılmasın. Kabul metnine yanıt yolu listesi eklensin. TLS, DB ve S3 at-rest seçimleri Hüseyin Cengiz'e teknik devir olarak yazılsın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:84`; `frappe/frappe/permissions.py:322`; `frappe/frappe/client.py:134`; `frappe/frappe/utils/password.py:4`; `suite/pyproject.toml:15`.

Rehber: [encryption-profile](./frappe-roadmap-contracts/encryption-profile.json). Mevcut birincil görev: `encryption-profile--implementation`.

### security-7 — Girdi/çıktı güvenliği, güvenlik başlıkları ve oturum koruması.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve sahip tanımlı. Kaynakta yerel güvenlik yapı taşları var: okuma yetkisi ve alan düzeyi okuma filtresi, update sırasında flags'in atılması, SSRF engeli, realtime origin kontrolü, nh3 bağımlılığı ve oturum kapatma parametresi. Kabul metni ise hangi zararlı girdi/çıktı örneklerinin, hangi başlıkların (CSP/HSTS/CORS/frame) ve hangi Keycloak iptal yolunun sınanacağını belirtmiyor.

Eksik:

- Başlık politikası tanımsız. Bu politikayı Frappe mi, edge mi, Vite/Tauri kabuğu mu uygulayacak, belli değil. Başlık üreten kaynak bu alıntıda görünmüyor.
- Keycloak oturum/token iptalinin (backchannel logout, introspection, token ömrü) Frappe sid/OAuth Bearer Token iptaline nasıl yansıyacağı yazılmamış.
- Özel /api/v2/method uç noktaları için girdi şeması ve çıktı alan filtresi sözleşmesi yok. Yerel apply_fieldlevel_read_permissions özel metotlara otomatik uygulanmıyor.
- Frappe v17.0.0.dev0 ile kaynak commit adf1fd0c eşlemesi kabul metnine bağlanmamış.

Nasıl tamamlanır: security-baseline--implementation altında tek bir sözleşme sayfası yazılmalı: başlık listesi ve bu başlıkların hangi katmanda uygulanacağı, Keycloak logout → Frappe oturum/Bearer token iptali eşlemesi, ve özel metotlarda yerel check_permission/apply_fieldlevel_read_permissions kullanımı zorunluluğu. Ortak bütçeden en fazla bir senaryo seçilmeli: oturum iptalinden sonra API'nin 401/403 dönmesi.

Kaynak dayanakları: `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v1.py:57`; `frappe/frappe/utils/safe_exec.py:388`; `frappe/realtime/middlewares/authenticate.js:21`; `frappe/pyproject.toml:47`; `frappe/frappe/utils/password.py:143`.

Rehber: [security-baseline](./frappe-roadmap-contracts/security-baseline.json). Mevcut birincil görev: `security-baseline--implementation`.

### security-8 — Kullanıcı/kiracı/istemci bazlı hız sınırı ve kötüye kullanım sinyalleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe'de iki mekanizma var: site düzeyinde sayaç ve endpoint başına key/IP/user_based decorator. Suite'te ayrıca Rate Limit DocType'ıyla dinamik sınırlama ve IP allow/block listesi bulunuyor. Kabul metnindeki 'tenant' ve 'istemci kimliği' ise kaynakta karşılığı olan bir anahtara bağlanmamış.

Eksik:

- İş tenantı ile Frappe sitesi arasındaki ayrım tanımsız. Site sayacı make_key ile site başına ayrılıyor, ama bir site içindeki iş tenantlarını ayırmıyor.
- rate_limit key değeri istemcinin gönderdiği form_dict'ten okunuyor. Bu yüzden değiştirilmiş istemci kimliğiyle sınır aşılabilir. İstemci kimliği OAuth client_id veya Keycloak azp gibi doğrulanmış bir claim'den türetilmeli.
- Suite dynamic_rate_limit user_based parametresini geçirmiyor. Allowed/blocked IP eşleşmesi startswith ile yapılıyor (CIDR değil). Bu, örneğin '10.1' öneki ile '10.10.x' adreslerinin de eşleşmesi riskini doğuruyor.
- Kötüye kullanım sinyallerinin (429 sayısı, lockout, auth failure telemetrisi) nereye toplanacağı ve Cloudflare/edge ile iş bölümü yazılmamış.
- request_ip'nin hangi proxy başlığına güvenerek belirlendiği bu alıntıda görünmüyor.

Nasıl tamamlanır: rate-limit--implementation için tek bir kimlik anahtarı kararı yazılmalı: sınır doğrulanmış kullanıcı + tenant + client claim'inden hesaplansın, form_dict key'i kimlik olarak kullanılmasın. Suite dynamic_rate_limit'e user_based geçişi ve IP önekinin CIDR olarak doğrulanması genişletme olarak tanımlanmalı. Edge'de ne yapılacağı ayrı bir maddeye yazılmalı.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:55`; `frappe/frappe/rate_limiter.py:150`; `frappe/frappe/rate_limiter.py:111`; `suite/suite/utils/rate_limiter.py:47`; `suite/suite/utils/rate_limiter.py:62`; `suite/suite/drive/webdav/auth.py:31`.

Rehber: [rate-limit](./frappe-roadmap-contracts/rate-limit.json). Mevcut birincil görev: `rate-limit--implementation`.

### security-9 — Güvenlik olayı kaydı, inceleme, müdahale ve kontrollü erişim engeli.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta sinyal ve engelleme yapı taşları var: Rate Limit blocked_ips (cache temizlendiği için hemen etkili), WebDAV lockout, SFU authEvents telemetrisi ve kullanıcı devre dışı bırakıldığında oturumların temizlenmesi. Vaka kaydı, onay, gerekçe ve geri alma modeli ise ne kaynakta ne talimatta tanımlı.

Eksik:

- Güvenlik olayı vakası için veri modeli tanımsız: önem, sorumlu, durum, kanıt bağlantısı. Activity/Access/Error Log kaynakları bu alıntıda görünmüyor.
- Kontrollü erişim engellemenin hangi katmanda olacağı belirtilmemiş: Rate Limit blocked_ips mi, kullanıcı devre dışı bırakma mı, Keycloak oturum iptali mi, edge WAF mı. Onay ve geri alma kaydı da yok.
- Rate Limit IP engeli method bazlı. Kabul metninde istenen gerekçe ve geri alma alanları görülen validate akışında yok.

Nasıl tamamlanır: security-incident--implementation için yerel kayıtları vaka girdisi olarak kullanan tek bir vaka sözleşmesi yazılmalı. Engelleme aksiyonları mevcut mekanizmalara eşlenmeli: User enabled=0 → clear_sessions_on_disable, Rate Limit blocked_ips, Keycloak session revoke. Her aksiyon için gerekçe, onaylayan ve geri alma adımı zorunlu alan olmalı.

Kaynak dayanakları: `suite/suite/utils/rate_limiter.py:52`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:80`; `suite/suite/hooks.py:261`; `suite/suite/drive/webdav/auth.py:49`; `suite/suite/meet/sfu-server/src/server/handlers/AuthHandlers.ts:18`.

Rehber: [security-incident](./frappe-roadmap-contracts/security-incident.json). Mevcut birincil görev: `security-incident--implementation`.

### security-10 — Kiracıya özel şifreleme anahtarı ve anahtar sürümü; döndürme, iptal ve kurtarma yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe, __Auth tablosundaki şifreli alanlar için Fernet tabanlı genel şifreleme sağlıyor. Kaynakta kiracıya özel anahtar, anahtar sürümü, döndürme veya KMS entegrasyonu görünmüyor. Talimat koşullu kapsamı ve kabul metnini iyi tanımlıyor. Ancak KMS sağlayıcısı, şifrelenecek veri sınıfları ve 'tenant'ın site mi iş tenantı mı olduğu belirsiz.

Eksik:

- Kiracı tanımı (site mi, site içindeki iş tenantı mı) ve buna bağlı anahtar kapsamı belirsiz.
- Hangi verilerin kiracı anahtarıyla şifreleneceği belirtilmemiş: yalnız Password alanları mı, dosya/Drive S3 nesneleri mi, DB yedekleri mi.
- KMS/eşdeğer sağlayıcı seçimi, anahtar sürüm etiketinin şifreli veride nerede tutulacağı ve yedek çözme zinciri tanımsız.
- Etkinleştirme koşulu (hangi müşteri sözleşmesi veya veri hassasiyeti eşiği) ölçülebilir değil.

Nasıl tamamlanır: tenant-key--implementation için önce bir karar notu yazılmalı: kiracı = ? ve kapsam = hangi veri sınıfları. DevOps (Hüseyin Cengiz) hedef ortamda KMS/eşdeğer sağlayıcıyı ve yedek çözme zincirini belirlemeli. Frappe'nin site encryption_key/Fernet mekanizması genel koruma olarak kalmalı, yerine kopya bir şifreleme katmanı yazılmamalı.

Kaynak dayanakları: `frappe/frappe/utils/password.py:4`; `frappe/frappe/utils/password.py:62`; `frappe/frappe/utils/password.py:38`.

Rehber: [tenant-key](./frappe-roadmap-contracts/tenant-key.json). Mevcut birincil görev: `tenant-key--implementation`.

### security-11 — Kaynak kodu, bağımlılık ve dağıtım imajlarında güvenlik açığı taraması; bulgu önceliği ve düzeltme takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta upstream CI düzeyinde gerçek tarama adımları var. Frappe linters.yml, PR'larda Semgrep (frappe-semgrep-rules ve r/python.lang.correctness) çalıştırıyor. Aynı dosyada pip-audit adımı da var; üç zafiyet kimliği için satır içi yorumlu ama süresiz istisna tanımlı. Frappe dependabot.yml yalnızca github-actions ekosistemini haftalık izliyor. Suite suite-linter.yml, PR'larda ve gece cron'unda Semgrep ile pip-audit çalıştırıyor. Kök, sfu-server ve recorder-server için 'yarn audit --groups dependencies --level high' adımı da çalışıyor. Ancak bu adım continue-on-error olduğundan yalnızca kanıt üretiyor ve yayını durdurmuyor; çıktısı 30 günlük artifact olarak saklanıyor. Frappe boilerplate.py, yeni uygulamalar için aynı Semgrep/pip-audit linter şablonunu üretiyor. Bunların hepsi upstream-native CI yapılandırması. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Dağıtım/konteyner imajı taraması yok. meet-sfu-build, meet-recorder-build, meet-stt-build ve arc-runner-image imajları docker/build-push-action ile taranmadan GHCR'ye push ediliyor. Trivy, Grype, SBOM, attestation veya cosign bulunmadı.
- Secret taraması (gitleaks, trufflehog, detect-secrets) iki uygulamada da bulunmadı.
- JS bağımlılık denetimi eksik. Suite'te sheets/collab-server (package-lock.json) ve stt-server audit kapsamı dışında. Frappe'nin kendi yarn.lock dosyaları için audit adımı yok. Suite'teki yarn audit continue-on-error olduğu için yayını bloklamıyor.
- Önem eşiği politikası (blokla/uyar), istisnanın en uzun süresi ve onaylayan kişi tanımlı değil. pip-audit istisnaları yalnızca CLI bayrağı ve yorumdan ibaret.
- Bulgu önceliklendirme ve düzeltme takibi için DocType, API veya kayıt mekanizması yok. Giderilen bulgunun yeniden kontrol kanıtı da yok.
- Bilinen zafiyet örneğinin yakalandığına ve eşiğin yayını durdurduğuna dair kabul kanıtı yok. Upstream GitHub workflow'larının SaaS'ın kendi CI'ında çalıştığı kaynaktan kanıtlanamaz. functionalAcceptance: not_run.

Nasıl tamamlanır: Mevcut vulnerability-scan--contract bağımlılığı sırasıyla ilerlenmeli. 1) Sözleşmede tek bir politika tanımlanmalı: önem→blokla/uyar eşiği (ör. high/critical blokla), istisna için en uzun süre, sahibi ve yeniden kontrol kuralı. Kapsam satırları ayrı olmalı: Frappe app, Suite app, sfu-server, stt-server, recorder-server, collab-server ve dağıtım imajları. 2) vulnerability-scan--implementation'da en küçük adım: mevcut pip-audit/semgrep/yarn audit adımları SaaS CI'ında yeniden kullanılmalı. Suite'teki yarn audit için continue-on-error kaldırılarak eşik bloklayıcı yapılmalı. Ardından collab-server/stt-server audit'i, imaj build'lerinden sonra imaj taraması ve secret taraması eklenmeli. Bilinen zafiyetli bir fixture ile RED/GREEN kanıtı toplanmalı. 3) İstisnalar süreli bir kayıt dosyasına taşınmalı, bulgu takibi ise CI artifact'ı veya issue ile bağlanmalı. CI teknik kurulumu Hüseyin Cengiz'e devredilmeli.

Kaynak dayanakları: `frappe/.github/workflows/linters.yml:72`; `frappe/.github/workflows/linters.yml:99`; `suite/.github/workflows/suite-linter.yml:87`; `suite/.github/workflows/suite-linter.yml:124`; `suite/.github/workflows/suite-linter.yml:128`; `suite/.github/workflows/meet-sfu-build.yml:55`.

Rehber: [vulnerability-scan](./frappe-roadmap-contracts/vulnerability-scan.json). Mevcut birincil görev: `vulnerability-scan--implementation`.

### security-12 — Risk temelli penetrasyon testi; kapsam, bağımsız bulgu, düzeltme ve yeniden test kanıtı.

Kaynak durumu: **YOK**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynağında penetrasyon testi kapsamı, bağımsız bulgu kaydı, önem/sorumlu ataması, düzeltme takibi ya da yeniden test kanıtı modeli bulunmuyor. Yakın ama bu maddeyi karşılamayan upstream-native kontroller şunlar: (1) CI'da Semgrep SAST ve pip-audit/yarn audit bağımlılık taraması var (frappe linters.yml, suite suite-linter.yml). Bunlar statik ve bağımlılık analizidir, pentest değildir; suite'teki yarn audit adımı continue-on-error olduğu için CI'ı durdurmaz. (2) Security Settings DocType'ı security.txt ile zafiyet bildirim kanalı sunuyor; bu bir bildirim girişi, bulgu ya da vaka yönetimi değil. (3) suite.meet.api.test_helpers uçları whitelist_for_tests ile korunuyor. Bu kapı frappe.in_test, dev server ile allow_tests birleşimi veya CI ortam değişkeni olduğunda açılıyor. Uç, hooks.py içindeki izinli wildcard listesinde de yer alıyor; bu yüzden pentest kapsamında ön koşul olarak doğrulanması gereken bir yüzey. Sheets'teki test_api_security.py yalnızca mock tabanlı yetki şekli testleri; bağımsız güvenlik testi kanıtı sayılmaz. whitelisted RPC uçları ekliyor (test edilecek yeni bir yüzey), pentest işlevi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Onaylı pentest kapsam/kural belgesi: ortam, production hariç tutma, onaylayan kişi, tetikleme koşulu
- Bağımsız bulgu kaydı: önem, sorumlu, durum, kanıt; security-9 vaka modeliyle ve security-11 takibiyle bağlantısı
- Kritik bulgu için zorunlu bağımsız yeniden test ve kapanış kanıtı
- Kaynaktan çıkan öncelikli hedeflerin kapsam satırlarına bağlanması: /api/method ve /api/v2 genel RPC, X-Frappe-Site-Name ile site seçimi, test_helpers wildcard izni ve CI ortam değişkeni kapısı, planlanan Frappe adaptörü whitelisted uçları, recorder callback'leri
- Tenant aşımı, yetki yükseltme ve oturum akışları için yetkili test senaryoları; Keycloak kimlik geçişi dahil

Nasıl tamamlanır: Sıra şöyle olmalı. Önce mevcut bağımlılık olan independent-pentest--contract tamamlanmalı: tek sayfalık kapsam belgesi, production dışı izole bir hedef ortam, onaylayan sahip ve kritik bulgu için bağımsız yeniden test kabul ölçütü yazılmalı. Ardından independent-pentest--implementation adımında test öncesi ön koşul kontrolü yapılmalı: hedef sitede allow_tests kapalı olmalı, CI ortam değişkeni bulunmamalı ve /api/v2/method/suite.meet.api.test_helpers.* çağrısı reddedilmeli. Daha sonra planlanan Frappe adaptörü uçları, X-Frappe-Site-Name ile site seçimi ve genel RPC rotası öncelikli kapsam satırları olarak test edilmeli. Bulgular security-9 vaka kaydına önem ve sorumluyla bağlanmalı. Kapanış ancak bağımsız yeniden test kanıtıyla yapılmalı. Kod tarafında yeni görev açılmıyor; Semgrep/pip-audit CI kontrolleri pentestin yerine geçmez, yalnızca tamamlayıcıdır.

Kaynak dayanakları: `frappe/.github/workflows/linters.yml:72`; `frappe/.github/workflows/linters.yml:99`; `frappe/frappe/core/doctype/security_settings/security_settings.json:27`; `frappe/frappe/tests/utils/__init__.py:29`; `suite/suite/meet/api/test_helpers.py:11`; `suite/suite/hooks.py:450`.

Rehber: [independent-pentest](./frappe-roadmap-contracts/independent-pentest.json). Mevcut birincil görev: `independent-pentest--implementation`.

### deployment-1 — On-premises (müşterinin kendi ortamında kurulum) desteği.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni var: kurulum, Keycloak, backup ve sağlık kontrolü. Ancak talimat yalnız harici frappe_docker/bench kaynaklarına dayanıyor. Bağlayıcı yerel sürüm eşlemesi yok: Frappe 17.0.0-dev (adf1fd0c), Python 3.14 ve Suite 0.0.1; kurulu kaynak revizyonu unknown, yerel build bildirimi 2798633 doğrulanmadı. Kaynakta site kurulumu, backup ve worker teşhisi gibi CLI temel parçaları bulunuyor. Paketleme ve on-prem destek sözleşmesi ise kaynakta yok.

Eksik:

- Destek matrisi yok: Python >=3.14,<3.15, Frappe v17 geliştirme sürümü, Suite'in frappe >=16,<18 aralığı; geliştirme dalının on-prem üretimde kullanılıp kullanılmayacağına dair karar da yok.
- Ayrı çalışan Suite servisleri (meet sfu/recorder, sheets collab-server) ve ffmpeg/Chromium gibi işletim sistemi bağımlılıkları on-prem paket kapsamına alınmamış.
- DB türü kararı yok: postgres/sqlite kaynakta deneysel olarak işaretli.
- Kabulde geçen 'sağlık kontrolü' tanımsız; doctor yalnız worker teşhisi yapar. Keycloak giriş bağlantısının hangi Frappe mekanizmasıyla kurulacağı da belirtilmemiş.
- Backup şifreleme anahtarının ve encryption_key'in müşteri ortamında nasıl taşınıp korunacağı belirtilmemiş.

Nasıl tamamlanır: Mevcut on-premise-package--implementation görevine şunları ekleyin: sürüm/bağımlılık matrisi (Frappe commit, doğrulanmış Suite revizyonu, gözlenen Python ve DB motoru/sürümü), ayrı servislerin listesi ve ölçülebilir sağlık kontrol tanımı. Keycloak bağlantı mekanizmasını ilgili kimlik görevine bağlayın. Yeni görev açmayın; kabul not_run olarak kalır.

Kaynak dayanakları: `frappe/pyproject.toml:7`; `suite/pyproject.toml:45`; `suite/pyproject.toml:88`; `frappe/frappe/commands/site.py:105`; `frappe/frappe/commands/site.py:899`; `frappe/frappe/commands/scheduler.py:134`.

Rehber: [on-premise-package](./frappe-roadmap-contracts/on-premise-package.json). Mevcut birincil görev: `on-premise-package--implementation`.

### deployment-2 — Cluster (sunucu kümesi) yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam 'advanced' ve dışa dönük olarak doğru konumlanmış. Ancak orkestrasyon seçilmemiş ve Press kurulu değil. Frappe kaynağı düğüm yönetimi sağlamıyor; yalnız DB/Redis adreslerini dışarıdan verme, scheduler duraklatma ve bakım modu gibi temel parçalar var. Kabul metni ölçülebilir değil.

Eksik:

- Orkestrasyon kararı yok: Press, Compose/Swarm veya k8s seçilmemiş; Press kurulu uygulama envanterinde de yok.
- Düğüm boşaltma/ekleme prosedürü ile pause_scheduler ve maintenance_mode kullanım sırası tanımsız.
- Realtime yapılandırması env değişkeni okumuyor, yalnız config dosyalarından geliyor. Çok düğümde paylaşılan common_site_config dağıtım sözleşmesi yok.
- Chromium'un harici çalıştırılması kaynakta 'not implemented/tested yet' olarak işaretli; PDF iş yükü kümeye taşınamaz varsayılmalı.
- deployment-4 ile aynı görev ID'sini paylaşıyor; hangi kabulün hangi dilime ait olduğu ayrılmamış.

Nasıl tamamlanır: cluster-capacity--implementation görevinde önce orkestrasyon kararını ve hizmet hedefini kayda geçirin. Ardından düğüm boşaltma runbook'unu yazın (pause_scheduler → maintenance_mode → yeniden yerleştirme) ve 'izlenebilir yerleşim' için tek bir ölçülebilir kayıt tanımlayın.

Kaynak dayanakları: `frappe/frappe/config.py:80`; `frappe/frappe/config.py:125`; `frappe/frappe/realtime/config.py:7`; `frappe/frappe/utils/chromium/process.py:81`; `frappe/frappe/commands/scheduler.py:102`.

Rehber: [cluster-capacity](./frappe-roadmap-contracts/cluster-capacity.json). Mevcut birincil görev: `cluster-capacity--implementation`.

### deployment-3 — Subdomain (alt alan adı) ve multi-domain (çoklu alan adı).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: yanlış host başka tenant verisi açmamalı. Kaynakta host tabanlı site çözümleme ve proxy temel parçaları var. Ancak headless frontend domaini → API sitesi eşlemesi, site ile iş tenantı arasındaki ilişki ve Keycloak/OAuth yönlendirmelerinin birden çok domainle çalışması tanımsız.

Eksik:

- Site çözümleme gövdesi (Host veya başlık tabanlı seçim) excerpt'te görünmüyor; yanlış host davranışı doğrulanmadı.
- developer_mode açıkken bilinmeyen host hatası bench üzerindeki tüm site adlarını listeliyor. Üretimde developer_mode kapalı olmalı ama bu kabul şartında yok.
- Connected App redirect_uri tek bir get_url() değerinden türetiliyor. Çoklu domain için Keycloak redirect izin listesi sözleşmesi yok.
- default_site'ın bilinmeyen hostlarda kullanılmamasına dair bir kural yok.
- CORS ve çerez domain kapsamı (Vite/PWA, Tauri, WXT istemcileri) tanımsız.

Nasıl tamamlanır: domain-lifecycle--implementation görevine host→site→tenant eşleme tablosunu ekleyin. Kurallar: üretimde developer_mode kapalı, default_site kullanılmıyor, yanlış host 404 dönüyor. Domain başına Keycloak redirect listesi ve CORS izinleri yazılsın. Teknik DNS değerlerini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın.

Kaynak dayanakları: `frappe/frappe/app.py:28`; `frappe/frappe/config.py:52`; `frappe/frappe/config.py:57`; `frappe/frappe/integrations/doctype/connected_app/connected_app.py:63`; `frappe/frappe/commands/site.py:893`.

Rehber: [domain-lifecycle](./frappe-roadmap-contracts/domain-lifecycle.json). Mevcut birincil görev: `domain-lifecycle--implementation`.

### deployment-4 — Paylaşımlı/ayrılmış uygulama ve veri tabanı kaynak tahsisi.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

'Site ≠ iş tenantı' ayrımı doğru yapılmış. Kaynakta site başına DB host/adı, backup/restore ve site_config kopyalama gibi taşıma temel parçaları var. Ancak kota/ölçüm modeli, paylaşımlıdan ayrılmışa taşıma runbook'u ve şifreleme anahtarı sürekliliği tanımsız.

Eksik:

- Kaynak tahsisinin 'kayıtlı ve ölçülebilir' olması için metrik ve kayıt yeri tanımsız; excerpt'lerde kota mekanizması yok.
- Taşımada encryption_key korunmazsa şifreli alanlar çözülemez; bu risk kabul şartında yok.
- Şifreli backup kullanılıyorsa anahtar yönetimi tanımsız.
- Suite'in ayrı servislerinin paylaşımlı/ayrılmış yerleşimi belirtilmemiş.
- deployment-2 ile aynı görev ID'sini paylaşıyor; kabul dilimleri ayrılmamış.

Nasıl tamamlanır: cluster-capacity--implementation altında tek bir taşıma runbook'u yazın: backup (site_config dahil) → yeni DB host ile site → restore → encryption_key doğrulaması → izin örneklemesi. Ayrıca tek bir kaynak ölçüm kaydı tanımlayın. Yeni registry açmayın.

Kaynak dayanakları: `frappe/frappe/commands/site.py:29`; `frappe/frappe/utils/backups.py:225`; `frappe/frappe/utils/password.py:241`; `frappe/frappe/utils/backups.py:231`.

Rehber: [cluster-capacity](./frappe-roadmap-contracts/cluster-capacity.json). Mevcut birincil görev: `cluster-capacity--implementation`.

### deployment-5 — Alan adı sahipliği doğrulama; güvenlik sertifikası oluşturma ve yenileme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Docstring'e göre sahiplik kaydı çözümlenmeden domain eklenmiyor ve kontrol saatlik yapılıyor; ancak bu zorlama yerel kodda değil, uzak serviste. Yerelde get_active_domain_names yalnız enabled ve is_verified domainleri hesap/grup/liste için sunuyor. Yani doğrulanmamış domain mail kullanımına kapalı, ama bu yalnız mail domaini için geçerli; site/tenant host bağlama değil. (2) Ayrı Meet SFU deploy paketi: certbot-init.sh Let's Encrypt HTTP-01 webroot ile ilk sertifikayı alıyor. docker-compose'daki certbot servisi 12 saatte bir 'certbot renew --quiet' çalıştırıyor, deploy.sh ssl-renew ile zorla yenileme yapılabiliyor. Bu yalnız SFU alt servisini kapsıyor. (3) Frappe çekirdeğinde get_url yalnız site config'teki ssl_certificate veya wildcard.ssl_certificate değerine bakarak https şemasını seçiyor; sertifika üretmiyor, domain doğrulamıyor. api.py, local_fixture.py) içinde domain/TLS ile ilgili hiçbir şey yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Frappe sitesine/tenant'a özel domain (custom host) bağlamadan önce sahiplik doğrulaması (DNS TXT, HTTP-01 vb.) yok. Bu iş bench/nginx katmanında; o katman kaynakta yok.
- Frappe siteleri için sertifika üretme ve yenileme otomasyonu yok; yalnız SFU alt servisinde certbot var.
- Yenileme başarısızlığında alarm yok: SFU'daki 'renew --quiet' döngüsü bildirim üretmiyor; kaynakta sertifika bitiş tarihi izlemesi bulunamadı.
- Doğrulanmamış domainin site routing'ine bağlanmasını engelleyen yerel kapı yok.
- planlanan Frappe adaptörü'da domain yaşam döngüsü sözleşmesi (durum, doğrulama, sertifika durumu) yok.
- Mail domain doğrulaması dış Suite Cloud'a bağımlı; yerel kodda bağımsız DNS çözümleme ve doğrulama yok.
- developer_mode, allow_tests veya CI açıkken OAUTHLIB_INSECURE_TRANSPORT açılıyor (eski bulgu). Üretimde bu bayrakların kapalı olması şartı hâlâ tanımsız.

Nasıl tamamlanır: domain-lifecycle--contract kapsamında önce planlanan Frappe adaptörü için dar bir domain durum sözleşmesi tanımlayın: pending_verification → verified → bound → cert_active/cert_failed. Sıra şöyle olmalı: (1) Sahiplik doğrulama kapısı. Mail'deki 'ownership record + verify + yalnız verified domain aktif' desenini (suite/suite/mail/api/admin.py, suite/suite/mail/directory.py) örnek alın; doğrulanmamış domain için bağlamayı reddeden tek bir davranışı RED/GREEN testle kurun. (2) Bağlama (bench/nginx host ekleme). (3) Sertifika: SFU certbot HTTP-01 webroot desenini referans alın. (4) Yenileme başarısızlığı alarmı; 'renew --quiet' döngüsü bildirim üretmiyor, bu yüzden ayrıca eklenmeli. Üretim kabulünde developer_mode ve allow_tests kapalı olmalı. DNS kayıt değerlerini Hüseyin Cengiz hazırlasın, GoDaddy'de Asistan Hüseyin uygulasın, sunucu tarafındaki sonucu Hüseyin Cengiz doğrulasın.

Kaynak dayanakları: `suite/suite/mail/api/admin.py:169`; `suite/suite/mail/api/admin.py:214`; `suite/suite/mail/directory.py:31`; `suite/suite/meet/sfu-server/deploy/nginx/certbot-init.sh:99`; `suite/suite/meet/sfu-server/deploy/docker-compose.yml:117`; `frappe/frappe/utils/data.py:1995`.

Rehber: [domain-lifecycle](./frappe-roadmap-contracts/domain-lifecycle.json). Mevcut birincil görev: `domain-lifecycle--implementation`.

### deployment-6 — Kurulum sihirbazı, ortam yapılandırması ve kurulum sağlık denetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul anlamlı: eksik zorunlu ayar kurulumu durdurmalı, bileşen sağlığı görünmeli. Kaynakta new-site, make_site_config, env üzerinden config override ve yalnız worker'ları kapsayan 'doctor' var. Bunlar CLI temelli yapı taşları; headless sihirbaz ya da birleşik sağlık sözleşmesi değil. Keycloak bağlantı testinin Connected App'e mi yoksa ayrı bir OIDC katmanına mı bağlanacağı tanımlı değil.

Eksik:

- Zorunlu ayar listesi yok (db_*, redis_queue/redis_cache, encryption_key, Keycloak issuer/client) ve hangisinin kurulumu engelleyeceği belirsiz.
- Sağlık sonucunun biçimi, yetkisi (System Manager'a özel mi), zaman aşımı ve yeniden deneme kuralı tanımsız. DB/Redis/realtime/Keycloak için tek tek ölçüt yok.
- show-config tüm config'i döker. Sağlık çıktısında secret maskeleme kuralı yazılmamış.
- v17.0.0-dev (sourceHead adf1fd0c) eşlemesi yok; kaynak olarak yalnız genel bench/site_config dokümanları gösterilmiş.
- Bu snapshot'ta HTTP sağlık uç noktası görülmedi (unknown).

Nasıl tamamlanır: installation-health--implementation görevine şunları ekle: zorunlu ayar tablosu ve salt okunur, System Manager'a özel bir sağlık sözleşmesi (bileşen → ok/fail/not_run, secret içermez). get_site_config ve doctor yeniden kullanılsın. Keycloak kontrolü Connected App get_openid_configuration üzerinden discovery ile sınırlandırılsın.

Kaynak dayanakları: `frappe/frappe/commands/site.py:19`; `frappe/frappe/installer.py:752`; `frappe/frappe/config.py:76`; `frappe/frappe/commands/scheduler.py:134`; `frappe/frappe/integrations/doctype/connected_app/connected_app.py:56`; `frappe/frappe/commands/utils.py:228`.

Rehber: [installation-health](./frappe-roadmap-contracts/installation-health.json). Mevcut birincil görev: `installation-health--implementation`.

### deployment-7 — Yatay ölçekleme, yük dağıtımı ve yüksek erişilebilirlik.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam doğru biçimde 'advanced' ve dış topolojiye bağlı. Kaynakta DB host'u ve Redis queue env/config ile dışarı alınabiliyor, ProxyFix de mevcut. Ancak HA davranışı kaynakta yok ve Chromium'un ayrı sunucuda çalışması kaynakta 'not implemented/tested' olarak işaretli. Kabul metnindeki 'tanımlı süre/hedef' sayısal değil.

Eksik:

- RTO/RPO ve SLO değerleri ile topoloji kararı (web/worker/DB/Redis/dosya/LB) yok.
- Oturum ve cache için Redis, DB ve paylaşılan dosya deposunun tek hata noktası sınamasında yöntem ve başarı ölçütü yok.
- Suite'in site dışındaki servisleri (sfu, recorder, collab) HA kapsamına alınmamış.
- Chromium ve realtime için worker başına süreç sınırları hesaba katılmamış.
- Teknik sahip tam adla belirtilmemiş. Kişisel politikaya göre kritik altyapı Hüseyin Cengiz'de.

Nasıl tamamlanır: cluster-capacity--implementation görevini sayısal SLO/RTO ve bileşen bazlı SPOF tablosunu içeren bir karar kaydına bağla; sahibi Hüseyin Cengiz olsun. Uygulama, hizmet hedefi onaylanana kadar ertelensin.

Kaynak dayanakları: `frappe/frappe/config.py:80`; `frappe/frappe/config.py:125`; `frappe/frappe/app.py:11`; `frappe/frappe/utils/chromium/process.py:81`; `suite/pyproject.toml:88`.

Rehber: [cluster-capacity](./frappe-roadmap-contracts/cluster-capacity.json). Mevcut birincil görev: `cluster-capacity--implementation`.

### deployment-8 — Alan adı/kurulum kaldırma; artık kaynak ve erişim temizliği.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul anlamlı: artık erişim kalmamalı, yedek ve denetim kanıtı korunmalı. Kaynakta uygulama kaldırma, onay isteyen yıkıcı reinstall ve şifreli yedek seçeneği var. Domain/DNS, sertifika ve Keycloak client temizliği için Frappe tarafında bir akış yok. drop-site bu excerpt'lerde görülmedi (unknown).

Eksik:

- Sıralı kaldırma sözleşmesi yok: yedek → bakım modu → site kaldırma → proxy/sertifika → DNS → Keycloak client/token iptali → denetim kaydı.
- Yedekleri saklama süresi ve şifreleme zorunluluğu tanımsız. Yedeğe site_config da kopyalanıyor ve içinde secret'lar var.
- DNS adımının sorumluları ayrılmamış: GoDaddy'de uygulamayı Asistan Hüseyin yapar, teknik gereksinim ve doğrulama Hüseyin Cengiz'dedir.
- Kaldırma için kim yetkili ve geri alınamaz adımlarda hangi onay gerekiyor, belirtilmemiş.

Nasıl tamamlanır: domain-lifecycle--implementation görevine yukarıdaki sıralı runbook'u ve rol/onay matrisini ekle. Yedekte encrypt_backup zorunlu olsun. drop-site davranışı v17 kaynağında ayrıca okunup bağlansın.

Kaynak dayanakları: `frappe/frappe/installer.py:413`; `frappe/frappe/commands/site.py:531`; `frappe/frappe/utils/backups.py:231`; `frappe/frappe/utils/backups.py:405`.

Rehber: [domain-lifecycle](./frappe-roadmap-contracts/domain-lifecycle.json). Mevcut birincil görev: `domain-lifecycle--implementation`.

### deployment-9 — İnternetten yalıtılmış ortamda kurulum, güncelleme ve bağımlılık teslimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Koşullu kapsam ve kabul uygun. Ancak kaynakta internete bağımlı noktalar var: git+https üzerinden çekilen PyPika, çalışma anında Chromium indirme, harici Claude API'sine bağlı Sheets AI Assist ve apt üzerinden ffmpeg. Talimat bu bağımlılıkların envanterini çıkarmıyor ve hangi özelliklerin çevrimdışı desteklenmeyeceğini söylemiyor.

Eksik:

- Dışa çıkış envanteri yok: pip/git, npm/asset build, apt, Chromium indirme, harici AI API'leri.
- Artifact manifesti, özet veya imza doğrulama yöntemi ve iç mirror sözleşmesi tanımsız.
- Python 3.14 ve Node v24 pinleri ile v17-dev sürüm eşlemesi yazılmamış.
- Çevrimdışı ortamda devre dışı kalacak özellikler (ör. AI Assist) ve Keycloak/sertifika tedariki belirtilmemiş.

Nasıl tamamlanır: on-premise-package--implementation görevine bir dış bağımlılık envanteri ekle (aşağıdaki kanıt satırlarından başlanabilir) ve her biri için vendor/mirror/devre dışı kararı ver. Kabul, egress kapalı ortamda ayrıca not_run olarak takip edilsin.

Kaynak dayanakları: `frappe/pyproject.toml:26`; `frappe/frappe/utils/chromium/process.py:13`; `suite/pyproject.toml:32`; `suite/pyproject.toml:37`; `frappe/pyproject.toml:7`.

Rehber: [on-premise-package](./frappe-roadmap-contracts/on-premise-package.json). Mevcut birincil görev: `on-premise-package--implementation`.

### deployment-10 — Infrastructure as Code (IaC — altyapının kodla tanımı), ortam farkı ve yapılandırma sapması takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçülebilir: yeniden üretim, plan farkı, sapma tespiti ve secret'ların koda yazılmaması. Kaynak, config'in env ve extra_config hook'u ile dışarıdan verilmesini ve set-config'i destekliyor. Ancak IaC aracı, state ve secret deposu seçilmemiş. encryption_key gibi çalışma anında üretilen secret'ların yönetimi de tanımsız.

Eksik:

- IaC aracı ve state backend kararı yok (Terraform yalnız örnek).
- site_config ve common_site_config için istenen durumun nasıl tanımlanacağı ve sapma kontrolünde secret'ların nasıl maskeleneceği belirsiz.
- Çalışma anında oluşan encryption_key'in kaynak dışı saklanması ve geri yükleme ilişkisi tanımsız.
- Yerel Colima ile Hetzner'deki Docker Engine arasındaki ortam farkı kapsam dışında kalmış.

Nasıl tamamlanır: infrastructure-code--implementation görevine şu karar kaydını ekle: araç, state ve secret deposu. Ayrıca site config anahtarları için istenen durum listesini ve FRAPPE_* env ile extra_config yoluyla secret enjeksiyonunu tanımla. Sapma çıktısında değer gösterilmesin, yalnız anahtar ve fark bildirilsin.

Kaynak dayanakları: `frappe/frappe/config.py:89`; `frappe/frappe/config.py:95`; `frappe/frappe/commands/utils.py:922`; `frappe/frappe/utils/password.py:255`; `suite/pyproject.toml:35`.

Rehber: [infrastructure-code](./frappe-roadmap-contracts/infrastructure-code.json). Mevcut birincil görev: `infrastructure-code--implementation`.

### identity-1 — Authentication (kimlik doğrulama), üyelik ve e-posta doğrulama.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütleri (issuer/audience/süre reddi, doğrulanmamış hesap politikası) belli. Ancak Keycloak subject'inin Frappe User'a hangi native mekanizmayla bağlanacağı tanımlanmamış. Yerel kaynakta Social Login Key (Custom sağlayıcı), OAuth state ve tek sağlayıcıya özgü JWT audience doğrulaması var. Genel bir Keycloak issuer/JWKS bearer doğrulaması excerpt'te görülmüyor. Doğrulanmamış e-posta için mevcut kayıtlarda güven bayrağı patch ile 1'e çekiliyor.

Eksik:

- Bağlama yolu seçilmemiş: Social Login Key Custom/redirect+sid mi, yoksa headless SPA/Tauri/WXT için PKCE + Frappe'de bearer doğrulaması mı?
- trust_email_without_verified_claim varsayılanı (backfill ile 1) ile 'doğrulanmamış hesap reddi' kabulü çelişiyor; ayar kararı yazılmamış.
- Frappe yerel kayıt/parola yolunun (disable_signup, disable_user_pass_login) Keycloak ile paralel kalıp kalmayacağı belirtilmemiş.
- Suite on_login hook'unun Keycloak üzerinden açılan oturumda da tetiklenmesi gerektiği belirtilmemiş.
- Keycloak hedef sürümü sabitlenmemiş (identity-5 ile ortak).

Nasıl tamamlanır: keycloak-login--implementation-mvp görevine kısa bir sözleşme ekle: tek bağlama yolu (Social Login Key Custom ya da bearer doğrulama), subject→User eşleme alanı, email_verified politikası (trust bayrağı 0), Frappe signup/parola kapatma kararı ve on_login uyumu. Kabul çalıştırılmadı (not_run).

Kaynak dayanakları: `frappe/frappe/www/login.py:80`; `frappe/frappe/utils/oauth.py:48`; `frappe/frappe/patches/v16_0/backfill_social_login_key_trust_flags.py:10`; `frappe/frappe/www/login.py:45`; `suite/suite/hooks.py:284`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation-mvp`.

### identity-2 — Parolalı giriş, parola kurtarma ve magic link (tek kullanımlık giriş bağlantısı).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Sahiplik Keycloak'ta ve magic link 'verify' olarak işaretlenmiş. Ancak yerel Frappe'de bunlara paralel native yollar var: e-posta bağlantısıyla giriş, reset_password ve süre ayarı. Talimat bunların kapatılmasını ya da yeniden kullanılmasını belirtmiyor. Suite, update_password'u mail için override ediyor ve WebDAV parola yolu Frappe parolasına bağlı. Keycloak tarafında yapılan parola değişikliği bu bağımlılıkları kırar.

Eksik:

- Magic link sahibi belirsiz: Keycloak eklentisi mi, Frappe send_login_link mi? Frappe login_via_token'ın tek kullanımlık olduğu excerpt'ten doğrulanamıyor.
- Keycloak parola değişince suite.mail.events.update_password tetiklenmez; mail tarafı senkronunun sözleşmesi yok.
- disable_user_pass_login açılırsa WebDAV parola girişi devre dışı kalır; WebDAV için API key yolunun kalıp kalmayacağı kararı yok.
- Parola sıfırlama sonrası Frappe sid ve bearer iptal süresi tanımlanmamış (identity-4'e bağlı).

Nasıl tamamlanır: keycloak-login--implementation-mvp içinde iki karar yaz: (1) Frappe parola, reset ve email-link akışları kapatılsın mı, (2) magic link Keycloak'ta mı yapılacak, yoksa kapsam dışı mı. Suite mail update_password ve WebDAV bağımlılığını açık bağımlılık olarak kaydet.

Kaynak dayanakları: `frappe/frappe/www/login.py:137`; `frappe/frappe/www/login.py:118`; `frappe/frappe/templates/includes/login/login.js:62`; `suite/suite/hooks.py:203`; `suite/suite/drive/webdav/auth.py:67`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation-mvp`.

### identity-3 — OTP (One-Time Password — tek kullanımlık parola) ile doğrulama.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam koşullu ve TOTP/HOTP Keycloak'a verilmiş; kabul ölçütleri anlamlı. Yerel Frappe'de pyotp tabanlı ayrı bir 2FA var (TOTP, HOTP, SMS, Email). Talimat bu 2FA'nın Keycloak OTP ile birlikte mi çalışacağını, kapatılacak mı olduğunu belirtmiyor. Bu belirsizlik çift istem ya da baypas riski taşıyor. Excerpt'te TOTP kodunun pencere içinde yeniden kullanımını engelleyen bir kayıt görülmüyor; yalnız HOTP token'ı siliniyor.

Eksik:

- Frappe enable_two_factor_auth ve rol bazlı 2FA'nın Keycloak OTP varken nasıl ayarlanacağı yazılmamış.
- SMS/e-posta OTP gerekiyorsa sağlayıcı ve kanal kararı yok (Frappe'nin SMS/Email yöntemi bunun kanıtı sayılmaz).
- WebDAV, 2FA'lı kullanıcıyı parola yolunda engelliyor; Keycloak OTP politikasının WebDAV ve API key yollarına etkisi tanımlanmamış.
- Saat kayması toleransı ve kurtarma akışı için ölçülebilir değer yok.

Nasıl tamamlanır: keycloak-session--implementation-post-mvp (post-MVP) için ön koşul notu ekle: OTP yalnız Keycloak'ta olsun ve Frappe 2FA kapatılsın, ya da gerekçesiyle korunsun. Saat kayması penceresini ve kurtarma akışını sayısal olarak yaz.

Kaynak dayanakları: `frappe/frappe/twofactor.py:176`; `frappe/frappe/twofactor.py:168`; `frappe/frappe/twofactor.py:192`; `suite/suite/drive/webdav/auth.py:137`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-session--implementation-post-mvp`.

### identity-4 — Oturum ve cihaz listesi; süre aşımı ve tüm oturumları sonlandırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü 'belirlenen süre' diyor ama süre sayısal değil. Keycloak tüm oturumları kapattığında Frappe tarafındaki türev kimlikleri kimin iptal edeceği tanımlanmamış: sid oturumu, OAuth bearer, WebDAV kimlik önbelleği, Meet SFU JWT'si ve realtime soketleri. Yerel kaynakta logout, bağlantı anında web sürecine sorulan realtime auth, 600 sn'lik WebDAV önbelleği ve süre dolunca kesilen Meet JWT'si var. Ancak Keycloak back-channel logout'a bağlanan bir yol görülmüyor.

Eksik:

- Keycloak back-channel/front-channel logout'tan Frappe sid ve bearer iptaline giden sözleşme yok.
- Kabul için azami gecikme yazılmamış; WebDAV CRED_CACHE_TTL=600 ve Meet token ömrü bu süreyi aşabilir.
- Realtime auth bağlantı anında yapılıyor; açık soketlerin iptalden sonra kesilip kesilmediği excerpt'ten bilinmiyor.
- Headless cihaz listesinin kaynağı (Keycloak Account API mı, backend proxy mi) ve yetki sınırı tanımsız.

Nasıl tamamlanır: keycloak-session--implementation görevine sayısal bir iptal SLA'sı ve envanter ekle: sid, OAuth bearer, API key ve WebDAV, Meet JWT, realtime soketi. Her biri için iptal yolunu ya da 'süre dolumuna kadar kabul' kararını yaz. Cihaz listesi sahibini seç.

Kaynak dayanakları: `frappe/frappe/api/v2.py:80`; `frappe/frappe/realtime/auth.py:111`; `suite/suite/drive/webdav/auth.py:28`; `suite/suite/meet/sfu-server/src/server/AuthManager.ts:7`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-session--implementation`.

### identity-5 — MFA (Multi-Factor Authentication — çok faktörlü kimlik doğrulama) ve kurtarma kodları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: ikinci faktör zorunlu, kurtarma kodu tek kullanımlık, yenilemede eskiler geçersiz. Ancak recovery codes için gereken 26.3.0+ sürümüne rağmen hedef Keycloak sürümü seçilmemiş. Daha önemlisi yerel kaynak, API key:secret kimlik bilgisini 'kendi başına faktör' sayıyor ve WebDAV'da 2FA'lı hesaplar için bile kabul ediyor. Bu durum 'MFA zorunlu' politikasını etkisiz bırakabilir; talimatta etkileşimsiz kimlik bilgisi politikası yok. Frappe 2FA ve rol bayrağı mevcut; recovery code kaynağı excerpt'te görülmüyor (unknown).

Eksik:

- Keycloak hedef sürümü (≥26.3.0) sabitlenmemiş.
- API key/secret (WebDAV, REST token) için MFA istisnası kabul mü, yasak mı? Karar yok.
- MFA zorunluluğunun Keycloak'ta mı yoksa Frappe rol 2FA'sında mı yürütüleceği belirsiz; çift uygulama riski var.
- WebAuthn/passkey ve OTP arasındaki seçim identity-3'ün koşullu kapsamıyla eşlenmemiş.

Nasıl tamamlanır: keycloak-login--implementation-mvp için Keycloak sürümünü ≥26.3.0 olarak sabitle. API key ve WebDAV kimlik bilgilerinin MFA istisnası olup olmadığını açık bir karar olarak yaz. Frappe rol 2FA'sının kapatılacağını ya da korunacağını belirt.

Kaynak dayanakları: `suite/suite/drive/webdav/auth.py:6`; `suite/suite/drive/webdav/auth.py:56`; `frappe/frappe/twofactor.py:40`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation-mvp`.

### identity-6 — Passkey (cihaza bağlı giriş anahtarı) ve sosyal hesapla giriş.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni (passkey kayıt/giriş, kontrolsüz hesap birleştirme yok) tanımlı; sahiplik Keycloak. Yerel Frappe'de yalnız Social Login Key tabanlı sosyal giriş ilkelleri görülüyor. Passkey/WebAuthn kaynağı excerpt'lerde yok. v16 backfill yaması mevcut anahtarlarda doğrulanmamış e-postaya güveni 1 yapıyor; bu, talimatın yasakladığı otomatik birleştirme riskini Frappe tarafında da açık bırakıyor.

Eksik:

- Keycloak 26.7'de passkey özelliğinin etkinlik durumu ve RP ID/origin değerleri sürümle eşlenmemiş
- First-broker-login/hesap bağlama politikası (doğrulanmış e-posta şartı) yazılmamış
- Frappe yerel Social Login Key yolunun Keycloak brokering ile paralel kalıp kalmayacağı tanımsız
- Keycloak kimliğinin Frappe User / User Social Login eşleme sözleşmesi yok

Nasıl tamamlanır: keycloak-login--implementation-post-mvp kaydına şunları ekle: hedef Keycloak sürümü + passkey feature durumu, RP ID, first-broker-login kuralı (yalnız doğrulanmış e-postayla bağlama) ve 'Frappe Social Login Key devre dışı/Keycloak tek sağlayıcı' kararı. Kabul not_run kalır.

Kaynak dayanakları: `frappe/frappe/www/login.py:66`; `frappe/frappe/patches/v16_0/backfill_social_login_key_trust_flags.py:10`; `frappe/frappe/patches/v10_0/refactor_social_login_keys.py:119`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation-post-mvp`.

### identity-7 — SSO (Single Sign-On — tek oturum açma) ve kurumsal kimlik sağlayıcısı bağlantıları.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

OIDC/SAML brokering Keycloak'a verilmiş; kabul metni (uçtan uca SSO+logout, yabancı kurum claim'inin reddi) anlamlı. Yerel kaynakta kiracı claim'i reddetme deseni yalnız Office 365 için var (tid kontrolü). Frappe logout yalnız yerel oturumu kapatıyor; Keycloak back-channel logout bağlantısı görünmüyor. Claim → Frappe rol/üyelik eşleme kodu excerpt'lerde yok.

Eksik:

- Claim → Frappe User/Role/User Permission eşleme sözleşmesi (alan adları, kaynak claim, çakışma kuralı) yazılmamış
- Frappe'nin Keycloak token/oturumunu nasıl doğrulayacağı (Social Login Key 'Custom' OIDC mi, API bearer doğrulama hook'u mu) seçilmemiş
- Back-channel/front-channel logout'un Frappe sid ve realtime oturumlarına yayılması tanımsız
- Kurum/tenant izolasyonu için Keycloak Organizations ↔ Frappe kapsam eşlemesi yok

Nasıl tamamlanır: keycloak-federation--implementation için tek sayfalık entegrasyon kararı yaz: doğrulama yolu, claim eşleme tablosu, logout yayılımı. Yeni kayıt açma; ui-family-03 desteği aynı kalsın.

Kaynak dayanakları: `frappe/frappe/utils/oauth.py:75`; `frappe/frappe/api/v2.py:80`; `frappe/frappe/utils/oauth.py:154`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-federation--implementation`.

### identity-8 — SCIM (System for Cross-domain Identity Management — sistemler arası kimlik yönetimi) ile kullanıcı eşitleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kalem doğru biçimde 'verify' durumunda; hedef sürüm ve PoC şartı belirtilmiş. Frappe'de User.enabled ve DocType izin ilkelleri mevcut; SCIM uç noktası veya eşitleme adaptörü excerpt'lerde görülmüyor (bu, global yokluk kanıtı değildir). Veri akış yönü ve eşleme sözleşmesi tanımlanmamış.

Eksik:

- Akış yönü belirsiz: Keycloak SCIM sunucusu mu, Frappe'ye push mu, Frappe pull mu
- SCIM Users/Groups → Frappe User.enabled, Has Role, User Permission eşleme tablosu yok
- Devre dışı bırakmada aktif Frappe oturum/API anahtarı iptali tanımlanmamış
- Hedef Keycloak release'inde SCIM'in preview/supported durumu kaydedilmemiş

Nasıl tamamlanır: keycloak-scim--implementation'ı PoC kapısına bağla: önce sürüm/feature durumu ve akış yönü kararı, ardından devre dışı bırakma → Frappe enabled=0 + oturum iptali için tek eşleme sözleşmesi. Koşullu kapsam korunur.

Kaynak dayanakları: `suite/suite/drive/webdav/auth.py:90`; `frappe/frappe/permissions.py:82`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-scim--implementation`.

### identity-9 — Keycloak kimliğiyle süreli çevrimdışı yetkilendirme ve yerel kilit açma; public client/PKCE ve güvenli saklama.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat ayrıntılı: public client + PKCE, client secret gömmeme, offline_access sınırı, saat geri alma, yeniden bağlanmada izin doğrulaması. Ancak not hâlâ Capacitor adapter'ından söz ederken scopeDecision Tauri 2 diyor; tutarsızlık var. Yerel Frappe'de sunucu tarafı yeniden doğrulama ilkelleri (check_permission, alan düzeyi okuma) var. Frappe'nin kendi OAuth sağlayıcısında PKCE desteği var, fakat seçilen IdP Keycloak olduğu için bu yol hedef değil; karıştırılmamalı.

Eksik:

- Azami çevrimdışı süre ve risk politikası için somut değer/sahip yok
- Frappe'nin Keycloak access token'ını doğrulama yolu tanımsız; yerel Frappe yalnız kendi OAuth Bearer Token hash'lerini tanıyor
- Kuyruk gönderiminde idempotency anahtarı ve çakışma/yeniden deneme sözleşmesi yok
- Assessment notundaki Capacitor atfı Tauri 2 kararıyla güncellenmemiş
- Tauri 2 güvenli depolama adaptörünün (Keychain/Keystore) seçimi belirtilmemiş

Nasıl tamamlanır: device-grant--implementation notunu Tauri 2'ye hizala; azami offline süre, Keycloak token doğrulama yolu ve kuyruk idempotency alanını tek karar kaydında tanımla. Frappe OAuth sağlayıcısını alternatif IdP olarak kullanma.

Kaynak dayanakları: `frappe/frappe/api/v1.py:83`; `frappe/frappe/oauth.py:33`; `frappe/frappe/oauth.py:13`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `device-grant--implementation`.

### identity-10 — Keycloak giriş sunumu sözleşmesi: markalı tema ile tamamen bağımsız headless login ayrımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Sınırlar net: tema (Keycloakify) ile bağımsız kimlik UI ayrımı, ROPC yok, embedded WebView yok, client secret yok. Eksik olan, Frappe'nin kendi parola giriş yüzeyi. Bu yüzey /api/method/login'e parola gönderiyor ve suite izinli yollarında açık. Talimat bu yerel yolun kapatılmasını veya Keycloak'a yönlendirilmesini tanımlamıyor. disable_user_pass_login ayarı kaynakta mevcut.

Eksik:

- Frappe /login ve /api/method/login parola yolunun kapatılması/yönlendirilmesi kararı yok (paralel ikinci giriş riski)
- Tema mı bağımsız UI mı kararı henüz verilmemiş; karar kaydının sahibi ve konumu belirsiz
- Keycloakify sürümü ile hedef Keycloak 26.x tema uyumluluğu eşlenmemiş
- Frappe yerel 2FA/OTP akışının Keycloak MFA ile çakışma politikası yok

Nasıl tamamlanır: keycloak-login--implementation'a tek karar kaydı ekle: (1) tema ya da bağımsız UI seçimi, (2) Frappe disable_user_pass_login ve /login yönlendirme politikası, (3) Keycloakify↔Keycloak sürüm eşlemesi. identity-9 ile ortak PKCE testi not_run kalır.

Kaynak dayanakları: `frappe/frappe/www/login.py:47`; `frappe/frappe/templates/includes/login/login.js:31`; `suite/suite/hooks.py:421`; `frappe/frappe/twofactor.py:194`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `keycloak-login--implementation`.

### integrity-1 — Eşzamanlı düzenleme çakışması ve optimistic locking (kayıt sürümünü karşılaştırarak yazma).

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü net, ancak kaynak gösterimi version-15'e dayanıyor; yerel kurulum v17-dev. Alıntıda check_if_latest yok. Görünen kısım: v1/v2 update_doc kaydı for_update ile alıp istemci verisini doc.update ile birleştiriyor ve save çağırıyor. İstemci modified alanını göndermezse son yazan kazanır. client.set_value modified alanını yasaklıyor. Suite Writer, db.set_value yolunu kullanıyor ve TimestampMismatchError hatasını sessizce yutuyor.

Eksik:

- Headless yazma sözleşmesinde modified zorunlu değil; eksikse ret davranışı tanımlı değil.
- TimestampMismatchError için HTTP 409/UI çakışma eşlemesi ve taslağı koruma adımı tanımlı değil.
- Korumayı atlayan yollar listelenmemiş: db.set_value, client.set_value, Suite save_doc.
- v17 check_if_latest davranışı yerel kaynakta doğrulanmamış.

Nasıl tamamlanır: record-integrity--implementation kapsamında önce v17 frappe/model/document.py içindeki check_if_latest davranışını oku. Ardından v2 PUT için 'modified zorunlu, uyuşmazlıkta 409 ve taslak korunur' sözleşmesini yaz. Bypass yollarını ui-provider-query bağımlılığı olarak işaretle. Insan bütçesinden tek senaryo kullan: eski modified ile ikinci yazım reddedilmeli.

Kaynak dayanakları: `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:228`; `frappe/frappe/client.py:202`; `suite/suite/writer/doctype/writer_document/writer_document.py:15`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`.

Rehber: [record-integrity](./frappe-roadmap-contracts/record-integrity.json). Mevcut birincil görev: `record-integrity--implementation`.

### integrity-2 — Kayıt sürüm geçmişi, önceki sürümü görüntüleme ve kontrollü geri alma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: geri alma yeni sürüm oluşturmalı ve doğrulamayı atlamamalı. Çekirdek Version kaynağı alıntıda yok; yalnız document_follow içinde get_version kullanımı görünüyor. Suite Writer ve Sheets yalnız kendi uygulamalarına özgü sürümleme sunuyor. Sheets hücre farkı boş bir stub; Writer silinirken sürümleri de siliyor. Bunlar genel DocType geri alma kanıtı değildir.

Eksik:

- Hangi DocType'larda track_changes açık olacağı tanımlı değil.
- Çocuk tablo, link ve submit edilmiş kayıtlarda geri alma kuralları yok.
- Geri alma izni ve Version okuma izni ayrımı yapılmamış.
- Suite'e özgü sürümlemenin genel çözüm olarak yeniden kullanılmayacağı belirtilmemiş.
- v17 Version/Audit Trail eşlemesi yok.

Nasıl tamamlanır: native-version--implementation için v17 frappe/core/doctype/version kaynağını oku. Görüntülemeyi yalnız okuma izniyle sınırla. Geri almayı normal doc.save yoluyla yeni Version üreten bir önizleme/diff akışı olarak tanımla. Submit edilmiş kayıtları kapsam dışı bırak ve bunları integrity-5'e bağla.

Kaynak dayanakları: `frappe/frappe/desk/form/document_follow.py:110`; `suite/frontend/src/apps/sheets/services/versions.js:132`; `suite/frontend/src/apps/sheets/components/SheetEditor/useVersionHistory.js:211`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`.

Rehber: [native-version](./frappe-roadmap-contracts/native-version.json). Mevcut birincil görev: `native-version--implementation`.

### integrity-3 — Mükerrer kayıt tespiti, birleştirme ve ilişkileri koruma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerelde rename_doc whitelisted ve merge parametresi alıyor. Ancak rename_doc.py alıntıda yok; link güncellemesinin v17'deki davranışı doğrulanmadı. Mükerrer tespiti, korunacak alanların seçimi ve çakışma kararı için hiçbir kaynak veya talimat yok. Görev post-MVP olarak doğru konumlanmış.

Eksik:

- DocType bazında mükerrer tespit kuralları tanımlı değil.
- Birleştirmenin geri alınamazlığı, önizleme ve onay sınırı tanımlı değil.
- Alan çakışmasında kullanıcı kararı sözleşmesi yok.
- merge için gereken izin (allow_rename/write) v17'de eşlenmemiş.

Nasıl tamamlanır: MVP dışında tut. Post-MVP'de önce v17 frappe/model/rename_doc.py içindeki merge ve link güncelleme davranışını oku. Ardından bir DocType için alan çakışmalarını kullanıcıya sunan salt-okunur önizleme sözleşmesi yaz. Asıl birleştirme işlemi yalnız native rename_doc(merge=True) üzerinden yapılsın.

Kaynak dayanakları: `frappe/frappe/client.py:265`.

Rehber: [record-integrity](./frappe-roadmap-contracts/record-integrity.json). Mevcut birincil görev: `record-integrity--implementation-post-mvp`.

### integrity-4 — Toplu işlemde kısmi başarı, iptal ve telafi sonucu.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

v2 bulk_delete, öğe bazında deleted/failed sonucu ve eşik üstünde kuyruğa alma (202) sağlıyor; bu kısmi başarı için yerel bir model. Buna karşılık insert_many 200 ile sınırlı ve tek hatada tümüyle geri dönüyor. Kaynakta iptal semantiği görünmüyor. Webhook gibi dış etkiler için telafi modeli yok.

Eksik:

- Toplu güncelleme ve submit için öğe bazlı sonuç sözleşmesi yok.
- Kuyruğa alınmış işte iptal ve 'yeni öğe başlamasın' davranışı tanımlı değil.
- Tekrarlanabilirlik (idempotency) ve dış etki telafisi kaydı tanımlı değil.
- bulk_operation_async_threshold yapılandırması ürün kararına bağlanmamış.

Nasıl tamamlanır: record-integrity--implementation-mvp kapsamında v2 bulk_delete sonuç şeklini (deleted/failed/total) tüm toplu işler için ortak sonuç sözleşmesi olarak benimse. İptali v17 background_jobs ve RQ iş durumu üzerinden doğrula. Telafiyi ilk aşamada yalnız izlenebilir kayıt olarak tanımla.

Kaynak dayanakları: `frappe/frappe/api/v2.py:282`; `frappe/frappe/api/v2.py:292`; `frappe/frappe/client.py:245`; `frappe/frappe/model/document.py:25`.

Rehber: [record-integrity](./frappe-roadmap-contracts/record-integrity.json). Mevcut birincil görev: `record-integrity--implementation-mvp`.

### integrity-5 — Finansal ve kritik iş kayıtlarında değişmezlik ve düzeltme hareketi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Değerlendirme ERPNext Immutable Ledger'a dayanıyor, fakat ERPNext yerelde kurulu değil; finans defteri yerel bir özellik sayılamaz. Framework tarafında submit/cancel/amend hakları, is_submittable kontrolü ve DocStatus mevcut. Bu nedenle değişmezlik ve düzeltme için yalnız temel yapı taşları var.

Eksik:

- ERPNext olmadan hangi DocType'ların kritik ve submittable olacağı tanımlı değil.
- Ters hareket ve gerekçe bağlantısı için domain modeli yok.
- Submit sonrası düzenlenebilir alanlar ile db.set_value bypass riski ele alınmamış.
- ERPNext gerekiyorsa kurulumu ayrı bir karar olarak işaretlenmemiş.

Nasıl tamamlanır: Önce karar ver: finans ERPNext ile mi gelecek? Bu bir kurulum kararıdır; şimdi yapma. ERPNext yoksa kritik DocType'ları is_submittable yap. Düzeltmeyi native cancel ve amend ile, ya da gerekçe linki olan ayrı bir ters kayıt DocType'ı ile tanımla.

Kaynak dayanakları: `frappe/frappe/permissions.py:160`; `frappe/frappe/permissions.py:22`; `frappe/frappe/model/document.py:28`.

Rehber: [record-integrity](./frappe-roadmap-contracts/record-integrity.json). Mevcut birincil görev: `record-integrity--implementation-mvp`.

### integrity-6 — Silinen kayıtları kontrollü kurtarma; yetkili önizleme, saklama süresi, ilişki ve iş kuralı doğrulaması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream-native v17 (adf1fd0) temel mevcut: frappe.delete_doc, delete_permanently=False iken add_to_deleted_document ile tüm belge JSON'unu (doc.as_json) Deleted Document'a yazıyor (model/delete_doc.py:240-261). Whitelisted restore(): yalnız System Manager (only_for), restored=1 ise DocumentAlreadyRestored ile çift kurtarmayı engelliyor; hedef DocType için create ve belge bazlı read izni denetliyor; doc.insert() ile normal validate/iş kuralı ve isim çakışması (insert) yolundan geçiriyor; iptal edilmiş belgeyi Draft'a çevirip workflow state'i temizliyor; owner/creation/modified meta verisini koruyor; 'restored X as Y' yorumu ile iz bırakıyor; new_name/restored alanlarını güncelliyor. bulk_restore restored/invalid/failed ayrımı ve satır bazlı rollback yapıyor. DocType izinleri yalnız System Manager read/delete/export; Data alanı read-only Code olarak Desk'te ham JSON görüntüsü sağlıyor. Saklama: DeletedDocument.clear_old_logs(days=180) Log Settings arayüzüne uyuyor ancak frappe/hooks.py default_log_clearing_doctypes listesinde Deleted Document yok; yani otomatik temizlik ancak Log Settings'e elle kaydedilirse çalışır. Suite (upstream-native app kodu, Vue frontend): Sheets kendi soft-delete akışını uyguluyor (trashed bayrağı, owner-only delete izniyle restore_sheet, yalnız çöpteki sayfayı kalıcı silme, sheets_trash_retention_days ile gece purge); Drive dosya katmanında trash/restore taşıma var. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Yetkili yapılandırılmış önizleme yok: restore doğrudan insert ediyor; dry-run/diff/doğrulama-önizleme API'si bulunamadı (yalnız Desk'te ham JSON görüntüsü).
- Tenant yalıtımı yok: Deleted Document yalnız System Manager rolüne açık, tenant/User Permission/alan bazlı kapsam filtresi yok; restore, silinen kaydın tenant'ını kontrol etmiyor.
- Saklama süresi restore anında uygulanmıyor: süresi dolmuş kayıt purge edilene kadar geri yüklenebilir; Deleted Document varsayılan log temizliğine kayıtlı değil (180 gün yalnız metot varsayılanı).
- İlişki doğrulaması sınırlı: delete sırasında silinen/temizlenen bağlı kayıtlar (on_trash ile silinen alt varlıklar, örn. Writer Version; dinamik link temizliği; ekler) birlikte geri getirilmiyor; ilişkili kurtarma sözleşmesi yok.
- Kalıcı silme politikası (delete_permanently, for_reload, automation_engine düz DELETE) restore edilemez; politika/DocType bazlı merkezi kurtarılabilirlik ayarı yok.
- Suite Sheets/Drive trash ile Deleted Document arasında eşleme yok; iki ayrı kurtarma modeli var.
- Backup restore ayrımı kodda ayrıdır (farklı mekanizma) ama ürün sözleşmesi olarak belgelenmemiş.
- Headless provider (React/AntD) için restore/önizleme/denetim sözleşmesi yok; Suite'in Vue arayüzü bu sözleşmenin yerine geçmez.

Nasıl tamamlanır: record-integrity--contract içinde tenant/kayıt/alan izni, retention, ilişkili kayıtlar ve idempotent restore sınırını tanımla. İlk dar adım, Deleted Document için izinli salt okunur restore_preview projection/diff sözleşmesidir: gerekli alan, tip, isim/ilişki çakışmasını yan etkisiz metadata kontrolleriyle raporla; keyfi DocType controller validate hooklarını salt okunur diye çağırma, hooklar yazma veya dış etki üretebilir. Tam native iş kuralı kabulü preview ile kanıtlanmış sayılmaz. Sonraki adım native deleted_document.restore yaşam döngüsünü saran izin/retention/audit adapterıdır; standart validation ve çift geri yükleme koruması korunur. İlişkili Writer/Sheets/Drive davranışları ayrı mevcut bağımlılıklarda ele alınır. Bu turda kod, veri veya test değişikliği yapılmaz.

Kaynak dayanakları: `frappe/frappe/core/doctype/deleted_document/deleted_document.py:44`; `frappe/frappe/core/doctype/deleted_document/deleted_document.py:48`; `frappe/frappe/core/doctype/deleted_document/deleted_document.py:58`; `frappe/frappe/core/doctype/deleted_document/deleted_document.py:34`; `frappe/frappe/model/delete_doc.py:241`; `suite/suite/sheets/api.py:475`.

Rehber: [record-integrity](./frappe-roadmap-contracts/record-integrity.json). Mevcut birincil görev: `record-integrity--implementation-post-mvp`.

### integrity-7 — Buluttaki Frappe için özel çift yönlü senkronizasyon; imleç, silme kaydı, idempotent işlem ve commit sonrası kabul.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Sync sözleşmesi ayrıntılı: cursor, tombstone, idempotent mutasyon kimliği, içerik özeti, aynı transaction içinde tekilleştirme ve commit sonrası ack tanımlı. Yerel kaynakta yalnız temel araçlar var: offset tabanlı sayfalama, for_update kilidi ve REPEATABLE READ. Değişiklik imleci, tombstone ve tekilleştirme kaydı yok. DELETE yanıtı yalnız 202 'ok' dönüyor.

Eksik:

- v2 listeleme start/limit offset kullanıyor. Kararlı cursor alanı (ör. modified+name) ve eşzamanlı yazımda atlama/tekrar davranışı tanımlı değil.
- Silme API'si tombstone üretmiyor. Tombstone'un hangi DocType'ta ve hangi saklama süresiyle tutulacağı yazılmamış.
- document.py commit_after_response kullanıyor. Ack'in yanıttan önce mi sonra mı commit olacağı v17'ye göre bağlanmamış.
- Hedef API sürümü (v1 /resource veya v2 /document) ve DB arka ucu (MariaDB, Postgres, SQLite) seçilmemiş. İzolasyon ve retry davranışı bunlara göre değişiyor.
- Keycloak cihaz kimliğinin Frappe User/tenant kapsamına nasıl bağlanacağı tanımsız.

Nasıl tamamlanır: sync-receipt--implementation görevinde tek bir backend-agnostik sözleşme taslağı yaz: v2 rota, cursor alanı, tombstone ve dedupe DocType'ı, commit-sonrası ack noktası. Önceliği kaynakta commit_after_response ve v2 sayfalamayı doğrulamaya ver.

Kaynak dayanakları: `frappe/frappe/api/v2.py:141`; `frappe/frappe/api/v1.py:73`; `frappe/frappe/model/document.py:23`; `frappe/frappe/database/postgres/database.py:297`; `frappe/frappe/api/v1.py:56`.

Rehber: [sync-receipt](./frappe-roadmap-contracts/sync-receipt.json). Mevcut birincil görev: `sync-receipt--implementation`.

### integrity-8 — Ortak istemci iş kuralları ile Frappe Python kurallarının test eşliği ve sunucuda yeniden doğrulama.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Sunucuda yeniden doğrulama için yerel temel mevcut: Document.save yolu, workflow doğrulaması, has_permission ve set_value'nun korumalı alanları reddetmesi. Ortak istemci kural çekirdeği ve test vektörleri kaynakta yok. Suite örneklerinde Document doğrulamasını atlayan db.set_value yazımı ve çakışmayı sessizce yutan kod var. Postgres sürücüsü decimal değerleri float'a çeviriyor; bu, para/yuvarlama eşliği için somut bir risk.

Eksik:

- Sürümlü test vektörlerinin formatı, yeri ve kural sürümü pazarlığı (desteklenmeyen sürümün reddi) tanımlı değil.
- Kapsamdaki kuralların listesi (hangi DocType ve hangi hesaplama) yok. ERPNext kurulu olmadığı için para/stok kuralları yerelde yok.
- DB arka ucuna göre sayısal davranış (Postgres DEC2FLOAT, Currency decimal 21,9) eşlik testine bağlanmamış.
- Suite'teki db.set_value ve 'except COLLISION_ERRORS: pass' kalıpları 'doğrulama atlanmaz' kabulüyle çelişiyor. Kapsam dışı mı tutulacağı yazılmamış.

Nasıl tamamlanır: client-rule-parity--implementation için önce 1 pilot DocType ve 3–5 sınır vektörü (yuvarlama, tarih, izin reddi) içeren sürümlü JSON vektör formatını tanımla. Sunucu tarafında yalnız Document.save/has_permission yolunu kabul yolu olarak işaretle. Testler insan bütçesine bırakılır.

Kaynak dayanakları: `frappe/frappe/client.py:202`; `frappe/frappe/model/document.py:31`; `suite/suite/writer/doctype/writer_document/writer_document.py:32`; `suite/suite/writer/doctype/writer_document/writer_document.py:36`; `frappe/frappe/database/postgres/database.py:43`.

Rehber: [client-rule-parity](./frappe-roadmap-contracts/client-rule-parity.json). Mevcut birincil görev: `client-rule-parity--implementation`.

### integrity-9 — Bağlantısız cihazlarda stok/kota hakkı ayırma, merkezi onay ve uzaktaki etkileri bağlantıya erteleme.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü net: çift harcama yasağı, merkezi onay, süresi dolan hakkın yeniden doğrulanması ve uzak etkinin bir kez gönderilmesi tanımlı. Stok domaini ERPNext'e ait ve yerel kurulu uygulamalar yalnız frappe ve suite. Frappe tarafında yalnız satır kilidi ve serialization-failure retry gibi temel araçlar var. Rezervasyon veya hak (entitlement) modeli yok. Suite örneği uzak etkiyi (sendmail now=True) anında gönderiyor; outbox kalıbı yok.

Eksik:

- ERPNext kurulu değil: stok/kota kaynağının hangi DocType'ta tutulacağı veya yeni domain DocType'ı tanımlanmamış.
- Hak ayırma birimi, süre, cihaz bağlama ve iade/iptal politikası yazılmamış.
- Uzak etkiler için outbox DocType'ı ve tek-gönderim kabulü Frappe kuyruklarına (enqueue/Email Queue) eşlenmemiş.
- integrity-7 sync sözleşmesine bağımlılık açıkça sıralanmamış.

Nasıl tamamlanır: offline-reservation--implementation'ı integrity-7 sözleşmesi tamamlanana kadar bloklu işaretle. ERPNext kurulumu mu yoksa Suite/özel app içinde genel kota DocType'ı mı kullanılacağına dair kararı tek satırlık ön koşul olarak ekle.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/database/postgres/database.py:129`; `suite/suite/writer/doctype/writer_document/writer_document.py:152`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `offline-reservation--implementation`.

### integrity-10 — Dört gün bağlantısız çalışma, cihaz/uygulama yeniden başlatma, kayıt çökmesi ve aktarım ortasında kesinti kabulü.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Suite'in Vue/frappe-ui frontend'inde uygulamaya özel, çalışan çevrimdışı primitifler var. Slides tarafında:

- saving.js taslağı IndexedDB'ye yazıyor; kaydın başarılı sayılması tx.oncomplete'e bağlı.
- Çevrimdışıyken (navigator.onLine=false) taslak kirli kalıyor ve itilmiyor. Bağlantı dönünce ('online' olayı) üstel bekleme ile yeniden deneniyor.
- Uçuş sırasında gelen düzenlemeler nesil sayacıyla korunuyor.
- Yeniden yüklemede presentation.js yerel taslağı baseModified/modified karşılaştırmasıyla geri yüklüyor.
- Yanıtı kaybolan bir push, holdsOwnRows ile 'sunucuya gerçekten ulaştı mı' diye kontrol ediliyor. Bu, commit ile ack arasındaki kesintiye karşı içerik bazlı bir koruma.
- Sunucuda save_slides, base_modified uyuşmazsa reddediyor. Bu, Frappe'nin Document.check_if_latest / TimestampMismatchError iyimser eşzamanlılık desenine karşılık geliyor.
- Service Worker + Cache API ile salt-okuma bir 'offline copy' ve navigator.storage.persist çağrısı var. Writer, y-indexeddb ile Yjs belgesini yerelde kalıcı tutuyor. istemci kuyruğu, mutasyon kimliği veya cihaz yetkisi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Genel ve platformdan bağımsız bir çevrimdışı mutasyon kuyruğu (transactional outbox) yok.
- Mutasyon kimliği ile idempotent sunucu alımı ve sync receipt/ack sözleşmesi yok. Mükerrer gönderim koruması yalnız Slides'a özel ve tüm belgenin içerik eşitliğine (holdsOwnRows) dayanıyor.
- Cihaz yetkisi yok. Süreli yerel yetki bitince yasak işlemlerin engellenmesi ve bekleyen kayıtların korunması uygulanmamış.
- Dört günlük kesinti için simüle saat enjeksiyonu yok. Yedekten geri yükleme ve mutasyon kimliğiyle karşılaştırılan kanıt kaydı da yok.
- Seçilen React/AntDesign, Tauri2 ve Vite-PWA istemcileri yok; Tauri'nin dosya/SQLite kalıcılığı da yok. Mevcut primitifler yalnız Suite'in Vue frontend'ine ait, headless provider sözleşmesi değil.
- Slides, base uyuşmazsa çakışmayı birleştirmiyor. Bazı yollarda yerel taslağı atıp toast gösteriyor ('Changes that never reached the server were discarded'); bu, 'kalıcı kaydedilen işlem kaybolmasın' ölçütüyle çelişiyor.
- Hata enjeksiyonu kabul paketi yok: çökme, commit/ack arası kesinti, yeniden başlatma ve mükerrer gönderim senaryoları tanımlanmamış (testler yalnız okundu, çalıştırılmadı).

Nasıl tamamlanır: Sıra şöyle olmalı:

1. Önce mevcut contract görevlerini yaz: kernel-envelope--contract (mutasyon kimliği zarfı), sync-receipt--contract (idempotent alım ve receipt/ack) ve device-grant--contract. Bunlar Frappe provider sözleşmesi olarak tanımlanmalı. Referans desen olarak Slides'taki base_modified + check_if_latest ve tx.oncomplete sonrası başarı bildirimi kullanılabilir.
2. Ardından client-offline-faults--contract içinde hata matrisini ve simüle saat gereksinimini tek tabloda tanımla.
3. Ancak bundan sonra client-offline-faults--implementation'da tek dar bir davranışı gerçek RED/GREEN kanıtıyla uygula. Bu davranış: sunucuda mutasyon kimliğiyle mükerrer gönderimin reddi.

Suite'in Vue kodu taşınmamalı; GenUI uygulanmamalı.

Kaynak dayanakları: `suite/frontend/src/apps/slides/stores/saving.js:62`; `suite/frontend/src/apps/slides/stores/saving.js:247`; `suite/frontend/src/apps/slides/stores/presentation.js:274`; `suite/suite/slides/api/slides.py:34`; `suite/frontend/src/apps/writer/composables/useYjs.ts:2`; `frappe/frappe/model/document.py:1387`.

Rehber: [client-offline-faults](./frappe-roadmap-contracts/client-offline-faults.json). Mevcut birincil görev: `client-offline-faults--implementation`.

### shell-1 — Süper admin paneli.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: tenant seçimi ve müşteri rolünün reddedilmesi. Kaynakta rol ve izin primitifleri var: std_rights, has_permission, only_for("System Manager"). Ancak tenant kavramı yerelde tek site (belirlenecek geliştirme sitesi) olarak görülüyor. İncelenen alıntılarda toplu kiracı yönetimi API'si veya tenant modeli yok.

Eksik:

- Tenant sınırı tanımsız: site başına tenant mı, aynı site içinde organizasyon mu? Toplu kiracı API'si bu karara bağlı.
- Süper admin rolünün Keycloak realm/organization rolüne ve Frappe Role/System Manager'a eşlemesi yazılmamış.
- Çoklu site gerektiren işlemler (site oluşturma/askıya alma) için kimin, hangi yetkiyle (Hüseyin Cengiz/DevOps) işlem yapacağı ve audit sözleşmesi yok.
- api/v1 ve api/v2 arasında hangi yüzeyin kullanılacağı v17-dev için sabitlenmemiş.

Nasıl tamamlanır: page-super-admin--implementation içine tek bir karar notu ekleyin: tenant=site mi yoksa org mu, süper admin rol eşlemesi ve reddedilmesi gereken müşteri rolü. Ardından kabulü 'müşteri rolüyle aynı endpoint 403' senaryosuna bağlayın. Yeni bir görev kaydı açmayın.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `frappe/frappe/desk/page/setup_wizard/setup_wizard.py:112`; `frappe/frappe/api/v1.py:83`.

Rehber: [page-super-admin](./frappe-roadmap-contracts/page-super-admin.json). Mevcut birincil görev: `page-super-admin--implementation`.

### shell-2 — Müşteri yöneticisi ve son kullanıcı için ayrı yönetim yüzeyleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Sunucu tarafında yetki zorlaması doğal olarak mevcut: has_permission hook zinciri ve check_permission. Kabul ölçütü de UI gizleme ile API reddini doğru biçimde ayırıyor. Ancak rol→yüzey matrisi ve UI'nin etkin yetkileri hangi uç noktadan alacağı tanımlı değil. Suite'in kendi SPA'sı Vue tabanlı, bu nedenle React kabuğu olarak yeniden kullanılamaz.

Eksik:

- Müşteri yöneticisi ile son kullanıcı için rol/DocType/ptype matrisi yok.
- Rol değişiminde oturumun ve önbelleğin (TanStack Query) yenilenme kuralı tanımsız.
- Etkin yetkiyi okuyan uç nokta belirtilmemiş; get_valid_perms veya izin kontrolü üzerinden whitelisted bir okuma tanımlanmalı. ignore_permissions içeren bir yardımcı açılmamalı.
- Suite Vue/frappe-ui kabuğunun React kabuğuyla ilişkisi (ayrı/yan yana) karara bağlanmamış.

Nasıl tamamlanır: page-tenant-admin--implementation için 2 rol × ana DocType ptype matrisi yazın. Kabule 'gizli işlem API çağrısı PermissionError' kontrolünü ekleyin. Paylaşılan bütçedeki 3 senaryodan biri bu ret senaryosu olabilir.

Kaynak dayanakları: `frappe/frappe/permissions.py:496`; `frappe/frappe/permissions.py:512`; `suite/suite/hooks.py:44`.

Rehber: [page-tenant-admin](./frappe-roadmap-contracts/page-tenant-admin.json). Mevcut birincil görev: `page-tenant-admin--implementation`.

### shell-3 — Dashboard (özet gösterge paneli).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

İzin denetimli sayım (get_count) ve Dashboard Chart has_permission hook'u kaynakta mevcut. Workspace chart ve number card yapıları da var. Ancak bunlar Desk'e bağlı. Metrik sözleşmesi, 'gecikmiş veri' tanımı ve tenant kapsamı talimatta somut değil. Kapsam conditional olarak işaretli, fakat açılma tetikleyicisi ölçülebilir değil.

Eksik:

- Hangi metriklerin gösterileceği ve kaynakları (Dashboard Chart/Number Card ile özel aggregate arasındaki seçim) belirtilmemiş.
- Gecikmiş veri için tazelik eşiği ve zaman damgası alanı yok.
- Conditional kapsamı hangi ürün kararının açacağı belirsiz.
- Ant Design X/Pro grafik bileşeni ve ui-view-chart bağımlılık sırası yazılmamış.

Nasıl tamamlanır: ui-family-29--implementation'a 3–5 metriklik bir liste ekleyin. Her metrik için kaynak (Dashboard Chart veya get_count), izin yolu ve tazelik eşiği belirtin. Kapsam açılmadan uygulamaya başlamayın.

Kaynak dayanakları: `frappe/frappe/client.py:78`; `frappe/frappe/hooks.py:168`; `frappe/frappe/gettext/extractors/workspace.py:28`.

Rehber: [ui-family-29](./frappe-roadmap-contracts/ui-family-29.json). Mevcut birincil görev: `ui-family-29--implementation`.

### shell-4 — Profil, hesap ve ayarlar.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kimlik profilinin Keycloak'ta, ürün tercihlerinin backend'de tutulması ayrımı doğru. Frappe User izin hook'u ve Suite'in hesap API'si (get_workspace) mevcut. Keycloak entegrasyonu ise incelenen kaynakta görünmüyor. Alan sahipliği ve senkron yönü yazılmamış.

Eksik:

- Alan bazında sahiplik tablosu yok: e-posta, ad, dil, saat dilimi, avatar.
- Keycloak→Frappe User provizyon/senkron yönü ve OIDC giriş yolu yerel kaynağa eşlenmemiş.
- Ürün tercihinin saklanacağı yer (User alanı, Custom Field veya ayrı DocType) ve tenant kapsamı tanımsız.
- Keycloak tarafından yönetilen alanların Frappe'de salt okunur olacağı kuralı yok.

Nasıl tamamlanır: page-profile--implementation'a 'alan → sahip (Keycloak/Frappe) → yazma yolu' tablosu ekleyin. Tercihler için native Custom Field kullanın, ORM/CRUD kopyalamayın. Keycloak OIDC eşlemesini ayrı bağımlılık olarak işaretleyin.

Kaynak dayanakları: `frappe/frappe/hooks.py:167`; `suite/frontend/src/shell/useWorkspace.ts:25`.

Rehber: [page-profile](./frappe-roadmap-contracts/page-profile.json). Mevcut birincil görev: `page-profile--implementation`.

### shell-5 — Theme engine (tema motoru): yönetim paneli ve herkese açık sayfa temaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe'de yalnız Desk'e ait bir tema değiştirici ve Suite'te workspace logo/adı var. Bunlar headless bir tema motoru değil. Kabul ölçütü kontrast ve odak üzerine kurulu, ancak token şeması, tenant markası depolama yeri ve frontpage kapsamı tanımsız.

Eksik:

- Semantik token şeması ve Ant Design ConfigProvider token eşlemesi yazılmamış.
- Tenant marka ayarının nerede saklanacağı (Single/DocType) ve kimin değiştirebileceği tanımsız.
- Kabule eklenmesi gereken kalıcı kurallar eksik: çevreleyen odak halkası yasağı, 14 CSS px minimum metin boyutu, Outfit fontu, easeInOut hareket tokenları.
- Yönetim paneli ile frontpage arasında ortak ve ayrı token sınırı yok.

Nasıl tamamlanır: ui-theme--implementation'a token şeması ve tenant marka depolama kararını ekleyin. Kabulü tüm kontrol durumlarına (hover/focus-visible/disabled/invalid) ve odak/kontrast kontrolüne bağlayın. Kapsam conditional olduğundan ürün kararı gelmeden başlamayın.

Kaynak dayanakları: `frappe/frappe/patches/v13_0/add_switch_theme_to_navbar_settings.py:18`; `suite/frontend/src/shell/useWorkspace.ts:12`.

Rehber: [ui-theme](./frappe-roadmap-contracts/ui-theme.json). Mevcut birincil görev: `ui-theme--implementation`.

### shell-6 — Panel kısayolları, favoriler ve kişiselleştirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (kullanıcıya özel favori, yetkisi kalkan kısayolda sızıntı olmaması) var. Ancak talimat 'tercih API'si hazırlanır' diyerek yeni yapı öneriyor. Yerel v17 kaynağında ise Workspace Shortcut, for_user ile özel workspace, Custom Workspace delta'sı ve Suite'e özgü Drive Favourite ilkelleri zaten bulunuyor. Bunların yeniden kullanılıp kullanılmayacağı belirtilmemiş. Kapsam koşullu.

Eksik:

- Yeniden kullanım sınırı yok: Workspace Shortcut, for_user Workspace ve Custom Workspace mi kullanılacak, yoksa yeni tercih DocType'ı mı açılacak?
- Kısayol/favori okunurken has_permission ile yeniden kontrol edilmesi gerektiği (yalnızca sakla-göster değil) sözleşmede yok.
- Silinmiş veya yetkisi kalkmış kayıt için davranış (gizle, etiket maskele) tanımlı değil. Kaynakta yalnızca silinmiş öğenin atlandığı görülüyor.
- v16 dokümanı ile v17-dev Sidebar/Custom Workspace modeli arasındaki sürüm eşlemesi yok.
- Drive Favourite gibi uygulamaya özel favorilerin genel favorilerle ilişkisi belirsiz.

Nasıl tamamlanır: ui-family-02--implementation-post-mvp kapsamında kısa bir karar notu yazılmalı: kullanıcı favorisi için mevcut Workspace(for_user) veya Workspace Shortcut ilkesini yeniden kullan, her listelemede sunucu tarafında has_permission ile filtrele ve etiket sızıntısını kabul senaryosuna ekle. Kapsam açılmadan uygulama yapılmamalı.

Kaynak dayanakları: `frappe/frappe/patches/v13_0/rename_desk_page_to_workspace.py:16`; `frappe/frappe/patches/v16_0/backfill_workspace_module.py:29`; `frappe/frappe/desk/page/workspace_restore/workspace_restore.py:16`; `frappe/frappe/hooks.py:488`; `suite/suite/hooks.py:378`.

Rehber: [ui-family-02](./frappe-roadmap-contracts/ui-family-02.json). Mevcut birincil görev: `ui-family-02--implementation-post-mvp`.

### shell-7 — Platform, kiracı ve kullanıcı ayarlarının ayrı kapsamları ve önceliği.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: override kaldırılınca miras zincirine dönülmeli ve başka tenant'ın ayarı değişmemeli. Kaynakta site_config (frappe.conf) ve System Settings ayar katmanları görülüyor. Ancak 'tenant'ın site mi yoksa site içindeki bir kayıt mı olduğu tanımlanmamış. Bu tanım olmadan öncelik zinciri ve izolasyon sözleşmesi kurulamaz.

Eksik:

- Tenant = Frappe site mi, yoksa site içi kapsam mı? Karar yok. Bu karar izolasyon sınırını belirler.
- Ayar anahtarı kataloğu yok: hangi anahtarın hangi katmanda (platform/common_site_config, site_config, System Settings, kullanıcı varsayılanı) override edilebileceği belirsiz.
- Gizli bilgi taşıyan site_config değerlerinin istemciye boot üzerinden sızmaması için açık bir allowlist sözleşmesi yok.
- Kullanıcı varsayılanları (defaults) kaynağı bu kesitte görülmedi; bilinmiyor.
- Ayar yazma yetkisi (kim hangi katmanı değiştirebilir) tanımlı değil.

Nasıl tamamlanır: ui-family-33--implementation için önce 'tenant = site' (veya alternatif) kararı yazılmalı. Ardından anahtar başına katman ve izin tablosu çıkarılmalı ve frappe.conf / System Settings / kullanıcı varsayılanı çözümleme sırası belgelenmeli. İstemciye yalnızca allowlist'teki anahtarlar boot ile aktarılmalı.

Kaynak dayanakları: `suite/suite/sheets/boot.py:19`; `frappe/frappe/api/v2.py:32`; `frappe/frappe/desk/page/setup_wizard/setup_wizard.py:146`.

Rehber: [ui-family-33](./frappe-roadmap-contracts/ui-family-33.json). Mevcut birincil görev: `ui-family-33--implementation`.

### shell-8 — Kiracı markası, logo, renkler ve alan adına göre görünüm.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güvenlik odaklı ve doğru: hatalı host başka tenant'ın logosunu göstermemeli. Suite'te çalışma alanı adı ve logosu boot global'inden veya get_workspace API'sinden geliyor. Ancak bu Vue/frappe-ui istemcisi; seçilen React/Ant Design istemcisine doğrudan taşınamaz. Host→site eşlemesinin Bench/proxy katmanında mı, uygulamada mı doğrulanacağı belirsiz.

Eksik:

- Host doğrulama sözleşmesi yok: Bench'in site çözümlemesine mi, Keycloak realm/issuer eşlemesine mi dayanılacak?
- Marka token şeması (logo, renk, semantik token eşlemesi) ve kaynağı (site ayarı mı, ayrı DocType mı) tanımlı değil.
- Kimlik doğrulama öncesi (login) ile sonrası marka verisinin ayrımı ve önbellek anahtarının host'a bağlanması belirsiz.
- suite.api.account.get_workspace bu kesitte görülmedi; yetki davranışı bilinmiyor.
- Tenant renklerinin kontrast ve minimum metin boyutu kurallarına uyduğunu doğrulayan kabul ölçütü yok.

Nasıl tamamlanır: ui-theme--implementation açılırsa: host→site eşlemesini sunucu tarafında doğrulayan tek bir genel marka okuma ucu tanımlanmalı ve yalnızca allowlist'teki alanlar döndürülmeli. Marka değerleri shell-10 semantik tokenlarına eşlenmeli. Hatalı host senaryosu kabul listesine yazılmalı.

Kaynak dayanakları: `suite/frontend/src/shell/useWorkspace.ts:12`; `suite/frontend/src/shell/useWorkspace.ts:25`; `frappe/frappe/hooks.py:10`.

Rehber: [ui-theme](./frappe-roadmap-contracts/ui-theme.json). Mevcut birincil görev: `ui-theme--implementation`.

### shell-9 — Menü kaydı, gezinme geçmişi ve merkezi komut/işlem arama.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (yetkisiz komut görünmemeli; odak ve geri dönüş konumu korunmalı) var. Kaynakta Route History, Workspace Sidebar izin sorgusu, kullanıcının okuyabildiği DocType'ların listesi (get_doctypes_with_read) ve search_widget ilkelleri mevcut. Ancak menü ve komut kataloğunun şeması, yetki filtresinin sunucuda mı uygulanacağı ve GenUI/sorgu-eylem kayıtlarıyla sınırı tanımlanmamış.

Eksik:

- Komut kataloğu şeması yok: gezinme girdisi ile yürütülebilir eylem ayrımı, kimlik ve sürüm bilgisi tanımlanmamış.
- Yetki filtresinin sunucuda zorunlu olduğu açıkça yazılmamış. İstemcide gizlemek yeterli değildir; eylem çağrısında ayrıca check_permission gerekir.
- Route History'nin headless istemciden yazılıp yazılmayacağı ve saklama/gizlilik süresi belirsiz.
- Bu kataloğun GenUI ve sunucu sorgu-eylem kayıtlarıyla birleştirilmeyeceği yazılmamış.
- v17-dev Workspace Sidebar/Desktop Icon modeline sürüm eşlemesi yok.

Nasıl tamamlanır: ui-family-02--implementation içinde menü ve komut girdisinin minimal şeması tanımlanmalı. Kaynak olarak Workspace Sidebar, get_doctypes_with_read ve search_widget yeniden kullanılmalı; sonuçlar sunucuda kullanıcı izniyle filtrelenmeli. Eylem yürütme mevcut whitelist ve check_permission yolundan geçmeli. GenUI kaydından ayrı tutulduğu not edilmeli.

Kaynak dayanakları: `frappe/frappe/hooks.py:483`; `frappe/frappe/hooks.py:153`; `frappe/frappe/permissions.py:508`; `frappe/frappe/client.py:11`; `frappe/frappe/api/v1.py:132`.

Rehber: [ui-family-02](./frappe-roadmap-contracts/ui-family-02.json). Mevcut birincil görev: `ui-family-02--implementation`.

### shell-10 — Ortak tasarım sistemi; semantik tokenlar, onaylı bileşen kataloğu ve erişilebilir etkileşim sözleşmeleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream-native somut ilkel yapılar var. Frappe Desk tarafında framework'ten bağımsız, düz CSS ile yazılmış bir "Espresso" semantik token katmanı bulunuyor: colors, typography, spacing, radius ve effects (surface/ink/outline/focus). Bu katman veri-öznitelikli `.es-button` gibi bileşen stillerine bağlanıyor. Suite'in Vue frontend'i tek token kaynağı olarak frappe-ui Tailwind preset'ini kullanıyor ve uygulamaları FrappeUIProvider ile sarıyor. frappe/ui (@framework/ui) içinde fieldtype→bileşen kayıt defteri (registerFieldType) var. Bunlar Vue/frappe-ui/Desk tasarım sistemidir. Ant Design/Pro/X'e bağlı bir token, tema veya bileşen kaynağı bulunmuyor. UI kataloğu, tema veya token sözleşmesi sunmuyor. Runtime functionalAcceptance: not_run. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Ant Design ThemeConfig/ConfigProvider ile Espresso/frappe-ui semantik tokenları arasında eşleme sözleşmesi ve headless React tarafının tek token kaynağı (kaynakta @ant-design/antd referansı yok).
- Sürümlü, onaylı bileşen kataloğu ve ui-provider-registry sözleşmesi yok. Mevcut registry yalnız Vue fieldtype eşlemesi; sürüm alanı ve provider API'si içermiyor.
- Odak tokenları çevreleyen halka olarak tanımlı (box-shadow 0 0 0 2px / outline 2px solid). Çevrelemeyen odak sözleşmesi yok.
- Tipografi tokenları 14 CSS px altında (11/12/13px). Minimum metin boyutu sözleşmesi yok.
- Merkezi motion tokenı (easeInOut Cubic, iki yönlü süre, reduced-motion) yok. Geçişler bileşenlere dağılmış durumda.
- Markalı Select/dropdown, 320 px, zoom ve hata durumu kabulleri ile görsel/DOM/ARIA/hesaplanmış font kanıt türleri kaynakta sözleşme olarak tanımlı değil.

Nasıl tamamlanır: Mevcut bağımlılıklar korunarak sıra şöyle olmalı. (1) ui-family-01--contract: Espresso semantik token adlarını (surface/ink/outline/text/radius/spacing/focus) kaynak alan tek bir token dosyası ve Ant Design ThemeConfig eşleme tablosu yazılmalı. Bu tabloda 14px minimum, çevrelemeyen odak ve motion tokenları kural olarak yer almalı. (2) ui-family-01--implementation: headless React kabuğunda tek ConfigProvider teması kurulmalı. İlk dar davranış olarak bir Button ve markalı Select için RED/GREEN regresyon testi yazılmalı; test hesaplanmış font ≥14px'i, çevre halkası yokluğunu ve 320px görünümü kapsamalı. (3) ui-provider-registry--implementation: sürüm alanlı onaylı bileşen kataloğu tanımlanmalı. Frappe tarafı yalnız provider sözleşmesi sağlamalı; Suite'in Vue frontend'i ve GenUI bu katalogla birleştirilmemeli. (4) Destekleyici ui-family-07 ve ui-family-39 bu katalog/token sözleşmesine bağlanmalı.

Kaynak dayanakları: `frappe/frappe/public/css/espresso/components/button.css:4`; `frappe/frappe/public/css/espresso/effects.css:27`; `frappe/frappe/public/css/espresso/components/button.css:207`; `frappe/frappe/public/css/espresso/typography.css:16`; `suite/frontend/tailwind.config.js:5`; `frappe/ui/src/components/Fields/fieldTypes.ts:27`.

Rehber: [ui-family-01](./frappe-roadmap-contracts/ui-family-01.json). Mevcut birincil görev: `ui-family-01--implementation`.

### channels-10 — Buluttaki Frappe için ortak istemci çekirdeği, tasarım sistemi ve platform adaptörleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: ortak çekirdek sözleşmesi, ortak test vektörü, platform izinlerinin ayrı doğrulanması ve yerel backend olmaması tanımlı. Kaynakta yalnız sunucu tarafı yapı taşları var: v1 REST kaynak rotaları, v2 meta uç noktası ve has_permission. Suite frontend'i Frappe'nin sunduğu bir Vue/frappe-ui SPA'sı. Seçilen React/Ant Design/TanStack çekirdeği için yeniden kullanılabilir bir istemci kaynağı değil.

Eksik:

- Çekirdek sözleşmesinin içeriği tanımsız: modül sınırları, API sürümü (v1 mi v2 mi), hata ve yetki modeli. Test vektörünün biçimi ve konumu da yok.
- Çevrimdışı doğrulama sunucu doğrulamasının yerine geçmemeli. Bu yalnız örtük olarak söyleniyor; get_meta ile alınan metadata'nın sunumda kullanılacağı, yetki ve doğrulamanın Frappe'de kalacağı açıkça yazılmamış.
- Kaynak listesinde hâlâ Capacitor var; güncel mobil karar Tauri 2. React/AntD/TanStack seçimi ve hedef sürümler not içinde geçmiyor.
- Yerel Frappe 17.0.0-dev ile v2 API eşlemesi yapılmamış. v2 modülü iç uygulamasının değişebileceğini açıkça belirtiyor.

Nasıl tamamlanır: client-rule-parity--implementation görevine kısa bir sözleşme eki yaz. İçinde şunlar olsun: API sürümü ve uç nokta listesi (v1 resource veya v2 get_meta), sunum ile yetki/doğrulama ayrımı, test vektörü biçimi ve bunu kullanacak hedefler. Capacitor kaynağını Tauri 2 ile değiştir. ui-provider-* görevlerini bağımlılık olarak bırak; yeni görev kaydı açma.

Kaynak dayanakları: `frappe/frappe/api/v1.py:153`; `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/permissions.py:82`; `suite/suite/hooks.py:44`.

Rehber: [client-rule-parity](./frappe-roadmap-contracts/client-rule-parity.json). Mevcut birincil görev: `client-rule-parity--implementation`.

### channels-11 — Web/SaaS için Vite üretim çıktısı ve Service Worker ile hazırlanan PWA.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni güçlü: ağ yokken açılış, görünür önbellek hatası, Service Worker güncellemesinde bekleyen işlemin korunması, tenant/kullanıcı değişiminde izolasyon ve sahibin Hüseyin Cengiz olması tanımlı. Suite Slides'taki offlineCopy bir desen sunuyor: kontrol edilmeyen sayfayı reddetme, kalıcı depolama isteği ve kota hatası işleme. Ancak bu Vue'ya ve Slides'a özgü; headless PWA'nın kendisi değil. Ayrıca test dosyasının varlığı davranışın çalıştığını kanıtlamaz.

Eksik:

- PWA/Workbox aracı ve Vite eklentisi seçilmemiş, sürümleri de belirsiz.
- Kimlik doğrulamalı Frappe API yanıtlarının Cache Storage veya IndexedDB'de nasıl tutulacağı tanımsız. Çıkış ve tenant değişiminde temizleme sözleşmesi yok.
- Ayrı origin'deki frontend için Frappe CORS ve oturum/token modeli (cookie mi Keycloak bearer mı) bağlanmamış.
- Depolama kotası ve silinme durumunda kullanıcıya gösterilecek davranış yazılmamış.

Nasıl tamamlanır: pwa-service-worker--implementation görevine üç madde ekle: araç ve sürüm seçimi, önbellek kapsamı (uygulama kabuğu ile izinli veri ayrımı) ve çıkış/tenant değişiminde temizleme. Suite offlineCopy desenini yalnız referans olarak not et; kopyalama.

Kaynak dayanakları: `suite/frontend/src/apps/slides/stores/offlineCopy.js:175`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`; `suite/frontend/src/apps/slides/stores/offlineCopy.test.ts:217`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:2`.

Rehber: [pwa-service-worker](./frappe-roadmap-contracts/pwa-service-worker.json). Mevcut birincil görev: `pwa-service-worker--implementation`.

### channels-12 — Android/iOS için Capacitor ile gömülü arayüz ve ayrı imzalı AAB/APK/IPA paketleri.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Taranan frappe ve suite kaynağında Capacitor ya da Tauri ile Android/iOS'a gömülü arayüz yok. Yerel proje dosyaları (capacitor.config, tauri.conf.json, AndroidManifest.xml, Info.plist, gradle, xcodeproj, Podfile) ve imzalı AAB/APK/IPA üretim hattı da yok. 'capacitor|tauri' aramasının sonuçları yanlış pozitif: 'dataURI' gibi kelimelerin parçası olarak eşleştiler (utils.js, derlenmiş bundle'lar). 'android' sonuçları yalnızca yarn.lock'taki derleme aracı binary'leri. Maddeye bitişik ama madde olmayan üç parça var. (1) Frappe'nin kendi OAuth sağlayıcısı: token_endpoint_auth_method='None' olan public client için PKCE zorunlu ve redirect_uri yalnızca birebir kayıtlı değerle eşleşirse kabul ediliyor. Ancak bu Keycloak değil; Keycloak'a özgü bir mobil callback akışı yok. (2) Suite'in Vue arayüzü vite-plugin-pwa ve paylaşılan webmanifest ile kurulabilir bir PWA ve duyarlı mobil web arayüzü sunuyor. Çerez oturumuyla çalışıyor ve içinde mobil, native ya da OAuth sözleşmesi yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Capacitor (yerine geçen Tauri 2 mobil) projesi ve web arayüzünü uygulamaya gömme yapılandırması yok
- Android AAB/APK ve iOS IPA derleme, imzalama, güncelleme ve mağaza dağıtım hattı yok
- Kamera, bildirim, dosya, güvenli anahtar saklama ve SQLite için yerel adaptörler yok
- Uçak modunda soğuk açılış ve kalıcı yerel işlem desteği yok
- Keycloak callback için RFC 8252 yöntemi (özel URI şeması, claimed https ya da loopback) ve Frappe tarafında bearer token doğrulama sınırı tanımlı değil
- Headless provider'da mobil istemci için kimlik doğrulama ve oturum sözleşmesi yok
- channels-17 ile çift sayımı önleyecek bir kapsam kuralı kaynakta yok; bu bir planlama verisi

Nasıl tamamlanır: Madde kimliği ve bağımlılıklar korunsun. Madde 'tarihsel/superseded → channels-17' olarak işaretlensin ve tauri-mobile-package--implementation görevinin birincil sahibi channels-17 olarak yazılsın. Capacitor kabul ölçütü uygulama hedefi olarak kullanılmasın. Uygulama channels-17 altında şu sırayla ilerlesin: (1) keycloak-login--contract: Tauri mobil için RFC 8252 callback yöntemi seçilsin (claimed https/özel şema ya da loopback, PKCE S256). Frappe'nin Keycloak bearer token'ı nasıl doğrulayacağı (issuer/audience) dar bir provider sözleşmesi olarak belgelensin. (2) ui-family-01 ve client-rule-parity sözleşmeleri tamamlandıktan sonra, yalnız Android için tek bir Tauri 2 mobil iskeleti kurulsun. Bu iskelet derlenmiş React/AntDesign arayüzünü gömsün ve tek bir okuma akışını göstersin. Bu adım için gerçek RED/GREEN kanıtı üretilsin. (3) İmzalama ve mağaza dağıtımı Hüseyin Cengiz'e ayrı bir devir olarak verilsin. Suite'in Vue PWA'sı mobil paket kanıtı sayılmasın.

Kaynak dayanakları: `frappe/frappe/oauth.py:33`; `frappe/frappe/oauth.py:45`; `suite/frontend/vite.config.ts:7`; `suite/frontend/src/router/index.ts:333`; `suite/suite/hooks.py:440`.

Rehber: [tauri-mobile-package](./frappe-roadmap-contracts/tauri-mobile-package.json). Mevcut birincil görev: `tauri-mobile-package--implementation`.

### channels-13 — Windows/macOS/Linux için Tauri 2 ile gömülü arayüz ve imzalı masaüstü dağıtımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: kurulum ve kaldırma, Keycloak yönlendirmesi, dosya/izin sınırı, çevrimdışı yeniden başlatma, hedefe göre imza/notarizasyon kaydı, kuyruğu koruyan migration ve sahibin Hüseyin Cengiz olması. Kaynakta yalnız sunucu yapı taşları var: REST, izin kontrolü ve oauth2_logins yolu. Tauri paketlemesi Frappe dışında kalıyor. Notta 'seçilen mobil yol Capacitor' ifadesi eskimiş durumda.

Eksik:

- Hedef işletim sistemi, paket formatı ve imza matrisi seçilmemiş. Tauri SQL/Stronghold eklentilerinin sürümleri de belirsiz.
- Masaüstü Keycloak akışı (loopback veya deep link, PKCE) ile Frappe'nin Keycloak token'ını nasıl kabul edeceği tanımsız. oauth2_logins bir sosyal giriş yolu; bearer doğrulama sözleşmesi yerine geçmez.
- Çevrimdışı kuyruğun senkron çakışma kuralı ve toplu gönderim sınırı yazılmamış.
- Nottaki eski Capacitor ifadesi temizlenmemiş.

Nasıl tamamlanır: tauri-desktop-package--implementation görevine şunları ekle: ilk hedef olarak tek bir işletim sistemi ve format, Keycloak→Frappe token doğrulama sınırına bir referans ve kuyruk senkronunda çakışma ile insert_many 200 sınırına uyum notu. Eski Capacitor cümlesini düzelt.

Kaynak dayanakları: `suite/suite/hooks.py:440`; `frappe/frappe/client.py:245`; `frappe/frappe/api/v1.py:50`.

Rehber: [tauri-desktop-package](./frappe-roadmap-contracts/tauri-desktop-package.json). Mevcut birincil görev: `tauri-desktop-package--implementation`.

### channels-14 — Chrome eklentisi için WXT, Manifest V3 ve paket içi kod içeren ZIP dağıtımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü MV3 risklerini doğru tanımlıyor: paket içi kod, uzaktan kod yasağı, Service Worker yeniden başlayınca kuyruğun korunması, izin reddi, CSP ve ayrı mağaza kaydı. Sunucu tarafında RPC/REST ve izin kontrolü kaynakta mevcut. Ancak eklentinin hangi kullanıcı işini yapacağı ve Frappe ile nasıl entegre olacağı tanımsız.

Eksik:

- Eklentinin kullanım senaryosu ve ortak çekirdekten hangi parçaları kullanacağı belirtilmemiş.
- host_permissions için Frappe bulut origin'i, CORS ayarı ve kimlik doğrulama yöntemi (ör. launchWebAuthFlow ile Keycloak) tanımsız.
- Kalıcı kuyruk deposu (chrome.storage mı IndexedDB mi) ile minimum Chrome ve WXT sürümleri seçilmemiş.

Nasıl tamamlanır: wxt-extension--implementation görevine üç satır ekle: tek bir kullanım senaryosu, en az yetkili host/izin listesi ve kimlik doğrulama yöntemi, kalıcı kuyruk deposu seçimi. Yetkinin her zaman sunucuda doğrulanacağını yaz.

Kaynak dayanakları: `frappe/frappe/api/v1.py:152`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/permissions.py:82`.

Rehber: [wxt-extension](./frappe-roadmap-contracts/wxt-extension.json). Mevcut birincil görev: `wxt-extension--implementation`.

### channels-15 — SQLite/IndexedDB adaptörleri; kalıcı yerel iş kaydı ve Transactional Outbox, kota ve anahtar yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütleri net: atomik kayıt+outbox, kota/izin hatası, yerel/bekleyen/sunucu kabulü ayrımı. Frappe tarafında REST insert/save ve izin kontrolü var. Suite Slides yalnız Cache API + localStorage defteriyle çevrimdışı kopya, persist() ve kota hatası örneği sunuyor. Bu örnek Vue/frappe-ui tabanlı ve transactional değil. SQLite/IndexedDB outbox kaynakta yok.

Eksik:

- Outbox kaydının Frappe uç noktasına eşlemesi tanımlı değil: v1 /api/resource mı, v2 mi, yoksa whitelisted method mu?
- Sunucuda idempotency anahtarı veya tekrar gönderimde çift kayıt önleme sözleşmesi yok. Excerptteki insert ve insert_many bunu göstermiyor.
- Çakışma ve sürüm sözleşmesi (modified/for_update) ile toplu gönderimdeki 200 kayıt sınırı outbox talimatlarına işlenmemiş.
- Şifreleme ve anahtar adaptörü seçilmemiş. Tauri SQL ve IndexedDB için ortak arayüz/şema sürümü ve göç kuralı yok.
- Tenant/kullanıcı bölümlemesinin yerel şema anahtarı tanımlanmamış.

Nasıl tamamlanır: client-local-outbox--implementation altına kısa bir sözleşme notu eklenmeli: outbox kayıt şeması, idempotency anahtarı, hedef Frappe v17 uç noktası, çakışma davranışı ve tenant anahtarı. Sunucu tarafında idempotency için yeni ORM yazılmamalı; mevcut whitelisted method ve DocType izinleri üstünde ince bir kontrol kararı alınmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/client.py:246`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:26`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`; `suite/frontend/src/apps/slides/stores/offlineCopy.test.ts:217`.

Rehber: [client-local-outbox](./frappe-roadmap-contracts/client-local-outbox.json). Mevcut birincil görev: `client-local-outbox--implementation`.

### channels-16 — İlk çevrimiçi hazırlıktan sonra gerçek çevrimdışı soğuk açılış; gerekli veri, dosya ve sınırlı yerel yetki.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Çevrimiçi hazırlık, ağsız yeniden açılış, süreli yerel yetki ve tenant izolasyonu kabulde tanımlı. Kaynakta Slides için shell/API ısıtma ve Service Worker kontrol kontrolü var. Ayrıca sunucu izin primitifleri (has_permission, get_meta, alan düzeyi okuma) mevcut. Ancak genel bir çalışma alanı hazırlığı ve yerel yetki anlık görüntüsü yok.

Eksik:

- Yerel yetki anlık görüntüsünün içeriği belirsiz: hangi Frappe izin/meta çıktısı, hangi alan düzeyi kısıt saklanacak? Süre ve iptal kuralı da yok.
- Keycloak çevrimdışı token/oturum stratejisi ve Tauri tarafında güvenli saklama (keychain/Stronghold) kararı yok.
- Yeniden bağlanınca yetkinin yeniden doğrulanma sırası tanımsız: önce yetki mi, sonra outbox gönderimi mi? Yetki kaybolursa bekleyen kayıtlar ne olacak?
- Hazırlanacak veri ve dosya kapsamı ile boyut bütçesi belirlenmemiş.

Nasıl tamamlanır: client-offline-boot--implementation için hazırlık manifesti tanımla: seçili DocType listeleri/dosyalar, R-01 üzerinden üretilen kapsamı ve geçerlilik süresi belirlenmiş izinli metadata projection’ı, yerel süre sınırı, tenant anahtarı ve yeniden doğrulama sırası. Suite offlineCopy yalnız desen referansıdır; ham get_meta izin özeti değildir.

Kaynak dayanakları: `suite/frontend/src/apps/slides/stores/offlineCopy.js:180`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:177`; `frappe/frappe/api/v2.py:245`; `frappe/frappe/api/v1.py:84`; `suite/suite/hooks.py:417`.

Rehber: [client-offline-boot](./frappe-roadmap-contracts/client-offline-boot.json). Mevcut birincil görev: `client-offline-boot--implementation`.

### channels-17 — Tauri 2 ile Android/iOS ve masaüstü için ortak React, Ant Design ve Ant Design X arayüzünü paketleme.

Kaynak durumu: **YOK**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

İki kurulu app kökünde (frappe, suite) Tauri 2 paketlemesi yok. src-tauri, tauri.conf.json, Cargo.toml, AndroidManifest.xml, Info.plist, xcodeproj ve capacitor.config bulunamadı. Hiçbir package.json'da @tauri-apps, react, antd veya @ant-design bağımlılığı yok. Paketlenecek ortak React/AntD/Ant Design X istemcisi de snapshot'ta yok. 'tauri/cordova/electron' eşleşmeleri yalnız minified vendor bundle'larda, sourcemap'lerde, lisans/CoC metinlerinde ve 'dataURI' alt dizgisinde çıktı; hiçbiri davranış kanıtı değil. Suite'in upstream kaynağı Vue 3 + frappe-ui SPA'sıdır. Production'da base '/assets/suite/frontend/' olur, Jinja suite.html Frappe tarafından servis edilir. vite-plugin-pwa yalnız FCM service worker'ı içindir ve precache kapalıdır. Bu, kabulde reddedilen uzak site modelidir; gömülü frontendDist ile offline açılış sağlamaz. Paketleme değil ama ileride entegrasyon noktası olabilecek Frappe primitifleri şunlar: site config ile verilen allow_cors origin allowlist'i (set_cors_headers), OAuth Client redirect_uris tam eşleşme kontrolü ve Social Login Key içindeki Keycloak sağlayıcısı. Keycloak akışı sunucu tarafında /api/method yönlendirmesidir; native/custom-scheme PKCE akışı değildir. paketleme, origin veya mobil kimlik doğrulama içermez. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tauri 2 projesi yok: src-tauri, tauri.conf.json, frontendDist ve build.devUrl ayarları ile Android/iOS/masaüstü hedefleri.
- Paketlenecek ortak React + Ant Design/Pro/X + Vite istemci kaynağı ve build çıktısı snapshot'ta yok.
- Gömülü origin'in (tauri://localhost, http://tauri.localhost) Frappe allow_cors listesindeki yeri ve cookie/CSRF ya da token sözleşmesi tanımlı değil.
- Keycloak için native/custom-scheme ya da loopback PKCE redirect URI sözleşmesi yok. Mevcut Keycloak social login yalnız sunucu yönlendirmesidir.
- Offline ilk açılış, imza ve mağaza paketleri ile WebView minimum sürüm sabitlemesi yok.
- Tauri CLI, Android/iOS SDK ve WebView sürüm sabitlemesi yok.

Nasıl tamamlanır: Mevcut tauri-mobile-package--implementation görevi için sıra: (1) Bağımlı contract görevleri kapanmalı: tauri-mobile-package--contract (Tauri CLI, Android/iOS SDK, WebView minimum sürümleri, gömülü origin listesi), ui-family-01--contract (ortak React/AntD istemcisinin repo yolu ve Vite dist yolu), keycloak-login--contract (Tauri için PKCE redirect URI'leri). (2) Ortak React istemci reposunda en küçük adım: frontendDist'i Vite dist'e bağlayan bir src-tauri iskeleti kurulmalı. İlk kabul, tek masaüstü hedefinde gömülü varlıklarla ağsız açılış olmalı; RED/GREEN kanıtı istemci reposunda tutulmalı. (3) Frappe tarafında kod yazılmamalı. Hüseyin Cengiz'e teknik devir: site config allow_cors'a gömülü origin'in eklenmesi ve Keycloak client redirect URI'lerinin kaydı. Kabul ölçütü, gömülü origin'den gelen preflight'ın Access-Control-Allow-Origin ile dönmesidir. (4) Ardından Android ve iOS hedefleri. İmza ve mağaza hesaplarının sahibi tam adla yazılmalı. Suite Vue SPA'sı paketleme hedefi değildir, uzak site örneği olarak kalmalıdır.

Kaynak dayanakları: `suite/frontend/vite.config.ts:84`; `suite/frontend/vite.config.ts:100`; `suite/frontend/package.json:88`; `frappe/frappe/app.py:296`; `frappe/frappe/oauth.py:219`; `frappe/frappe/integrations/doctype/social_login_key/social_login_key.py:234`.

Rehber: [tauri-mobile-package](./frappe-roadmap-contracts/tauri-mobile-package.json). Mevcut birincil görev: `tauri-mobile-package--implementation`.

### channels-18 — Tauri mobil cihaz iş akışları: belge fotoğrafı, barkod, güvenli dosya erişimi ve bildirimden yetkili kayda geçiş.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam koşullu. İzin kabul/red/iptal, tenant ve deep link reddi kabulde var. Sunucuda dosya yükleme uç noktası ve belge okuma izin kontrolü mevcut, ancak cihaz yakalama, barkod ve push bildirim kaynakta yok. MVP'de hangi yeteneğin açılacağı seçilmemiş.

Eksik:

- MVP'ye giren yetenek alt kümesi seçilmemiş: kamera, barkod, dosya, bildirim.
- Çevrimdışı eklenen dosyanın outbox üzerinden Frappe File/upload_file ile hedef belgeye bağlanma sırası ve boyut/tip sınırı tanımsız.
- Deep link yolu ile Frappe belge izin kontrolü (read_doc/check_permission) arasındaki eşleme ve tenant doğrulaması tanımsız.
- Push sağlayıcı (FCM/APNs) ve Frappe tarafındaki tetikleme kaynağı seçilmemiş. Frappe bunu hazır sağlamıyor.

Nasıl tamamlanır: tauri-device-capability--implementation için MVP yetenek listesi ve Tauri capability izin dosyası kapsamı belirlenmeli. Ek dosya akışı channels-15 outbox sözleşmesine bağlanmalı. Deep link açılışı her zaman sunucu izin kontrolünden geçmeli.

Kaynak dayanakları: `suite/suite/hooks.py:423`; `frappe/frappe/api/v2.py:22`; `frappe/frappe/api/v1.py:83`.

Rehber: [tauri-device-capability](./frappe-roadmap-contracts/tauri-device-capability.json). Mevcut birincil görev: `tauri-device-capability--implementation`.

### channels-19 — Mobil yaşam döngüsü: sistem geri hareketi, klavye, safe area, arka plan dönüşü ve işletim sistemi sonlandırması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Bulunanlar yalnız web/PWA tarayıcı primitifleri. Bunlar upstream-native olup hedef React/Tauri istemcisinde değil; Suite'in Vue frontend'inde ve Frappe Desk JS'inde yer alıyor. (1) Sanal klavye: Suite'teki useKeyboardInsets, visualViewport resize/scroll olaylarıyla görünür yüksekliği ve offsetTop değerini izliyor. Frappe Desk bottom_sheet.js, klavyenin örttüğü yüksekliği --es-sheet-keyboard değişkenine yazıyor ve pinch-zoom durumunu ayırıyor. (2) Safe area: Suite'in mobil bileşenlerinde ve Frappe Desk SCSS/espresso CSS'inde env(safe-area-inset-*) paddingleri var; bunlar semantik token değil, bileşenlere gömülü. (3) Geri hareketi: Slides PresentationEditor popstate olayında açık dialogları kapatıyor, onBeforeRouteLeave ise kirli durumda onay istiyor. Calendar'da görünüm URL'de tutuluyor, böylece Back navigasyonu geri izliyor. (4) Arka plan ve kapanma: Slides, pagehide anında kirli değişikliği saveDraft ile en iyi çabayla IndexedDB'deki slides-db deposuna yazıyor ve beforeunload uyarısı veriyor. Writer IndexedDB/y-indexeddb kullanıyor; Meet/Slideshow visibilitychange dinliyor. Mail'deki Outbox sunucu taraflı bir JMAP EmailSubmission listesi, istemci offline outbox'ı değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Tauri 2 mobil entegrasyonu iki app kökünde de yok: Android sistem geri hareketi, uygulama pause/resume ve süreç sonlandırması sonrası geri yükleme.
- React + TanStack Router için geri yığını sözleşmesi yok: Back'in önce açık panel/dialog/sheet katmanını, ardından taslak çıkışını ele alması tanımlı değil. Suite'teki desen Vue Router'a özgü ve doğrudan aktarılamaz.
- Yerel taslak ile istemci outbox kaydı arasındaki sınır tanımlı değil; OS sonlandırması sonrasında outbox'ın korunup yeniden açılışta bulunması kodlanmamış. Slides pagehide kaydı uygulamaya özgü ve en iyi çaba düzeyinde; channels-15 ile bağı yok.
- Safe area ve klavye inset değerleri merkezi semantik token değil; hedef OS/WebView sürümleri ve izin reddi ile çağrı kesintisi davranışları kaynakta yok.
- Headless provider (suite/planlanan Frappe adaptörü) mobil yaşam döngüsü, taslak veya outbox kabul/idempotency sözleşmesi sunmuyor.
- Gerçek cihaz ve 320–390 px kabulü çalıştırılmadı (functionalAcceptance=not_run).

Nasıl tamamlanır: tauri-mobile-lifecycle--contract kapsamında en küçük adım sırası: (1) Tek sayfalık bir yaşam döngüsü kuralı yaz: URL/TanStack Router durumu tek kaynak olsun; Back önce en üstteki açık katmanı kapatsın, sonra kirli taslakta onay istesin. Calendar'daki URL ve Slides'taki popstate→hideOpenDialogs desenlerini davranış referansı olarak kullan, kodu taşıma. (2) Taslağı her alan değişiminde ve pagehide/visibilitychange=hidden anında yerel depoya yazma kuralını, Slides saveDraft/IndexedDB desenine dayanarak tanımla; outbox kaydı yalnız açık 'kaydet' eylemiyle oluşsun ve channels-15'e bağlansın. (3) Klavye için visualViewport tabanlı tek bir inset hook'u ve safe-area semantik tokenları tanımla (useKeyboardInsets ve bottom_sheet referans). (4) Tauri 2 Android geri olayını router geri yığınına bağlayan tek dar davranış için RED/GREEN testi yaz. Gerçek cihaz kabulü sürüm öncesi kapsamda not_run olarak kalsın. Mevcut bağımlılıklar korunur.

Kaynak dayanakları: `suite/frontend/src/composables/useKeyboardInsets.ts:34`; `frappe/frappe/public/js/frappe/ui/components/bottom_sheet.js:527`; `suite/frontend/src/components/AdaptiveDropdown.vue:12`; `suite/frontend/src/apps/slides/pages/PresentationEditor.vue:451`; `suite/frontend/src/apps/slides/pages/PresentationEditor.vue:267`; `suite/frontend/src/apps/calendar/utils/mobileView.ts:27`.

Rehber: [tauri-mobile-lifecycle](./frappe-roadmap-contracts/tauri-mobile-lifecycle.json). Mevcut birincil görev: `tauri-mobile-lifecycle--implementation`.

### notifications-1 — In-app notification (uygulama içi bildirim) merkezi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Amaç ve kabul ölçütü (iki kullanıcı ayrımı, okundu durumunun kalıcılığı) anlamlı. Yerelde yalnız Drive'a özgü bir bildirim akışı görülüyor: oturumdaki kullanıcıya göre filtrelenen liste, alıcıya bağlı okundu işareti ve izin sorgusu kancası var. Ancak talimat, Frappe çekirdeğindeki Notification Log'a dayanıyor ve kaynak olarak version-15 bağlantısı veriyor. Yerel kurulum 17.0.0.dev0; Notification Log kaynağı bu pakette görülmedi.

Eksik:

- Hangi kayıt deposunun kanonik olacağı belirtilmemiş: çekirdek Notification Log mu, Drive Notification mı, yoksa sanal Event Notification mı? Birleşik merkez için uyarlama sınırı tanımsız.
- Kaynak version-15'e bağlanmış; v17 geliştirme sürümündeki API eşlemesi yok.
- Headless API sözleşmesi tanımsız: liste, okunmamış sayısı, okundu işaretleme ve sayfalama. TanStack Query önbelleğinin geçersiz kılınması ve realtime olayı da tanımlanmamış.
- Kiracı, kapsam ve rol bazlı görünürlük ile sunucu tarafı izin kontrolü kabul ölçütüne bağlanmamış.
- E2E dosyasının varlığı işlevin kanıtı değil; kabul çalıştırılmadı (not_run).

Nasıl tamamlanır: Önce v17 kaynağında Notification Log'un alan ve izin modelini doğrula. Ardından tek kanonik depoyu ve Drive/Event bildirimlerinin ona nasıl eşleneceğini notification-message--implementation görevine yaz. Kabul, iki kullanıcı ve yenileme sonrası okundu durumu senaryosu olarak kalsın.

Kaynak dayanakları: `suite/suite/drive/api/notifications.py:41`; `suite/suite/drive/api/notifications.py:63`; `suite/suite/hooks.py:131`; `suite/suite/calendar/doctype/event_notification/event_notification.json:187`; `suite/e2e/drive-backed-apps/specs/drive/notifications.spec.ts:12`.

Rehber: [notification-message](./frappe-roadmap-contracts/notification-message.json). Mevcut birincil görev: `notification-message--implementation`.

### notifications-2 — SMS (Short Message Service — kısa mesaj hizmeti) ve mobil push (anlık cihaz bildirimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (SMS ve push'un aynı olaydan üretilmesi, iptal edilen tokena gönderimin durması) ölçülebilir. Yerelde frappe.push_notification modülü kullanılıyor ve frontend'de FCM tokenı için abone olma/abonelikten çıkma akışı var. Ancak bu akış harici bir relay sunucusuna bağlı ve web odaklı. SMS kaynağı bu pakette görülmedi. Tauri 2 mobil uygulamada yerel push için talimat yok.

Eksik:

- SMS sağlayıcısı ve SMS Settings eşlemesi yok; Frappe Notification SMS kanalının v17'deki karşılığı doğrulanmamış.
- Tauri 2 mobil için APNs/FCM cihaz kaydı, token yaşam döngüsü ve backend abonelik sözleşmesi tanımsız.
- Relay sunucusu (push_relay_server_url) bir dış bağımlılık; kimin işleteceği, güven sınırı ve gizli anahtar yönetimi belirtilmemiş.
- Abonelik endpoint'i tokenı GET sorgu dizesinde taşıyor. Durum değiştiren GET ve URL'nin loglara düşmesi için güvenlik kararı gerekiyor.
- Gönderim hatasında token iptali ve tekrar deneme ile hata kaydı politikası tanımsız.

Nasıl tamamlanır: sms-push-delivery--implementation görevine şunları ekle: v17 push_notification ve SMS kaynak eşlemesi, relay sahipliği, Tauri mobil token kaydı ve iptal sözleşmesi. GET ile abonelik kullanımını POST'a çevirme kararını da açık bir gereksinim olarak yaz.

Kaynak dayanakları: `suite/suite/mail/doctype/mail_message/mail_message.py:17`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:33`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:184`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:189`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:141`.

Rehber: [sms-push-delivery](./frappe-roadmap-contracts/sms-push-delivery.json). Mevcut birincil görev: `sms-push-delivery--implementation`.

### notifications-3 — Web push (tarayıcı bildirimi) ve desktop notification (masaüstü sistem bildirimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Assessment bu maddeyi 'external' olarak sınıflıyor; oysa Suite Mail frontend'inde izin isteme, izin reddinde dönüş ve service worker üzerinden showNotification ile FCM tabanlı bir web push istemcisi zaten var. Meet'teki bildirim bağlamı ise yalnız sekme içi ses için; sistem bildirimi üretmiyor. Kabul ölçütü (izin reddi, arka planda alım) anlamlı. Ancak Vite/PWA, Tauri 2 masaüstü ve WXT/MV3 için uyarlama sınırı yok.

Eksik:

- Standart VAPID Web Push mu, yoksa Frappe relay ve FCM mi kullanılacak, karar verilmemiş; Suite'teki mevcut istemcinin yeniden kullanımı belirtilmemiş.
- Vite/PWA service worker'ının sahipliği ve push olay işleyicisi tanımsız.
- Tauri 2 masaüstü bildirim eklentisi ve WXT/MV3 eklenti bildirimleri için kanal eşlemesi yok.
- Bildirimin etkin olup olmadığı yalnız localStorage'daki tokena bakılarak belirleniyor; sunucu tarafındaki abonelik durumuyla eşitleme tanımsız.
- Safari/iOS PWA kısıtları ile tarayıcı matrisi belirtilmemiş; kabul çalıştırılmadı (not_run).

Nasıl tamamlanır: Assessment'teki support değerini 'partial' olarak düzelt. web-desktop-push--implementation görevine şunları yaz: mevcut frappe-push-notification.ts istemcisinin yeniden kullanılıp kullanılmayacağı, PWA service worker sözleşmesi, Tauri ve WXT için kanal eşlemesi. Kabul olarak izin reddi ve arka planda alım senaryosu kalsın.

Kaynak dayanakları: `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:128`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:129`; `suite/frontend/src/apps/mail/utils/push-notifications.ts:24`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:116`; `suite/frontend/src/apps/meet/utils/notificationContext.ts:32`.

Rehber: [web-desktop-push](./frappe-roadmap-contracts/web-desktop-push.json). Mevcut birincil görev: `web-desktop-push--implementation`.

### notifications-4 — WhatsApp Business API, Telegram Bot ve Discord kanalları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe'de ilgili temel yapılar var, ancak bunlar bu üç kanalın adaptörü değil. (1) Notification DocType yalnız Email, Slack, System Notification ve SMS kanallarını dağıtıyor; gönderim hatasını log_error ile kaydediyor (notification.py:430-449). (2) Slack Webhook URL entegrasyonu requests.post ile gönderiyor ve başarısız yanıtı frappe.log_error ile kaydediyor. (3) Genel Webhook DocType giden HTTP isteği gönderiyor. İstekler Delivered/Failed/Exhausted durumlarıyla Webhook Request Log'a yazılıyor; RETRY_SCHEDULE ile yeniden deneniyor ve HMAC imzalı giden X-Frappe-Webhook-Signature başlığı ekleniyor. Yapılandırmayla bir Discord gelen webhook'una istek atabilir, ancak bu bir kanal adaptörü değildir. (4) SMS Settings genel bir HTTP gateway ve SMS Log sağlıyor. notification.js:96'daki 'WhatsApp' dalı yalnız alıcı alanı filtresi. Kanal seçeneklerinde WhatsApp olmadığı için bu dal ölü bir UI kalıntısı; gönderim kodu yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- WhatsApp Business (Cloud) API adaptörü yok: mesaj/şablon gönderimi ve wa_id eşlemesi bulunmuyor.
- Telegram Bot adaptörü yok: sendMessage çağrısı ve chat_id eşlemesi bulunmuyor.
- Discord bot/webhook adaptörü yok.
- Bu üç kanal için sağlayıcı kimlik bilgisi DocType'ı veya Password alanı yok; secret'lar kaynak dışında tutulmalı.
- Doğrulanmış alıcı eşlemesi ve opt-in sözleşmesi yok (telefon, chat_id, Discord kanalı).
- Sağlayıcıdan gelen teslim/durum geri bildirimleri için gelen imza doğrulaması ve hız sınırı yok.
- Kanal başına sağlayıcı hata kodunu saklayan bir teslim kaydı yok. Webhook Request Log genel HTTP kaydıdır, alıcı veya kanal semantiği taşımaz.
- Notification.channel sabit bir Select/Literal alanı (Email/Slack/System Notification/SMS). Yeni kanal eklemek için uzantı noktası (hook/override) gerekiyor; mevcut değil.
- Suite Drive bildiriminde e-posta hatasını sessizce yutan 'except Exception: pass' kalıbı önceki incelemede kaydedildi ve kabul ölçütüyle çelişiyor.

Nasıl tamamlanır: Önerilen sıra:

1. Mevcut social-message-delivery--contract görevinde tek bir kanal adaptörü arayüzünü yaz: send(recipient_ref, message) bir sonuç döndürsün (delivered/failed, provider_code, provider_error).
2. Aynı sözleşmeye şunları ekle:
   - doğrulanmış alıcı ve opt-in kaydı;
   - credential için yalnız Password alanı veya site config, kaynakta değer olmayacak;
   - Delivered/Failed/Exhausted ve next_retry alanlı teslim kaydı. Bu kayıt Webhook Request Log ile retry_failed_webhooks kalıbını yeniden kullansın; 'except: pass' yasak.
3. social-message-delivery--implementation görevinde ilk olarak tek kanalı ek (additive) uygulama kodu olarak yaz: Telegram Bot. Kurulu frappe'yi değiştirme; ayrı bir app'te veya pilot planlanan Frappe adaptörü sınırında yaz.
4. Bu kanal için iki RED/GREEN testi yaz: doğrulanmamış alıcı reddedilmeli; sağlayıcıdan gelen 4xx teslim kaydına Failed ve hata metniyle düşmeli.
5. Ardından aynı arayüzle Discord'u, sonra WhatsApp'ı (şablon/opt-in gerektirir) ekle.
6. En son Notification'a bağla: Property Setter ile kanal seçeneği ekle ve doc_events/override ile dağıt.

Headless provider bu kanalları kendi teslim kaydı ve sonuç sözleşmesiyle sunsun; Suite Vue frontend'ine bağımlı olmasın.

Kaynak dayanakları: `frappe/frappe/email/doctype/notification/notification.json:76`; `frappe/frappe/email/doctype/notification/notification.js:96`; `frappe/frappe/email/doctype/notification/notification.py:449`; `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:67`; `frappe/frappe/integrations/doctype/webhook/webhook.py:176`; `frappe/frappe/integrations/doctype/webhook/webhook.py:20`.

Rehber: [social-message-delivery](./frappe-roadmap-contracts/social-message-delivery.json). Mevcut birincil görev: `social-message-delivery--implementation`.

### notifications-5 — Bildirim kanal yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (kapalı kanal çalışmasın, kiracılar arası erişim olmasın) somut. Kaynakta kanal parçaları dağınık duruyor: Suite Mail Frappe PushNotification'ı ve push_relay'i kullanıyor, Drive frappe.sendmail ile e-posta gönderiyor. Push Subscription için has_permission hook'u var. Kiracı düzeyinde kanal açma/kapama, kimlik bilgisi saklama ve yönlendirme için ortak bir model görülmedi.

Eksik:

- Kiracı tanımı belirsiz: site başına kiracı mı, tek sitede kiracı alanı mı? Yalıtım sınırı buna bağlı.
- Frappe v17-dev Notification DocType'ındaki kanal alanının ve Push/Email/System Notification kanallarının yerel kaynakla eşlemesi yapılmamış; dayanak yalnız genel dokümanlar.
- Kanal kimlik bilgilerinin nerede tutulacağı (Password alanı, site config) ve kimin yöneteceği (rol/DocPerm) tanımlı değil.
- Push etkin durumu istemcide localStorage'a bağlı; sunucu tarafında 'kanal kapalı' kararının nerede uygulanacağı tanımlı değil.
- Birincil görev olarak notification-preference eşlenmiş; kanal yönetimi ile kullanıcı tercihi ayrı sorumluluklar olarak ayrıştırılmamış.

Nasıl tamamlanır: Mevcut görev ID'si altında tek bir kanal-politikası sözleşmesi yazılmalı: kiracı sınırı, kanal etkinlik bayrağının sunucuda kontrol edildiği tek nokta (Notification gönderim yolu, sendmail, PushNotification) ve Custom DocPerm ile yetki. Önce v17 frappe/email/doctype/notification kaynağındaki kanal alanı doğrulanmalı.

Kaynak dayanakları: `suite/suite/mail/doctype/mail_message/mail_message.py:17`; `suite/suite/drive/api/notifications.py:148`; `suite/suite/hooks.py:185`; `suite/frontend/src/apps/mail/utils/frappe-push-notification.ts:116`.

Rehber: [notification-preference](./frappe-roadmap-contracts/notification-preference.json). Mevcut birincil görev: `notification-preference--implementation`.

### notifications-6 — Konu/kanal tercihleri, izinler, sessiz saatler ve özet gönderim.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (saat dilimine göre sessiz aralıkta erteleme, tek özet) ölçülebilir. Kaynakta yalnız yapı taşları var: zamanlanmış görev hook'ları, frappe.enqueue ve Meet'te istemci tarafı zil tercihi. Konu/kanal tercihi, sessiz saat ve özet gönderimi için sunucu tarafı bir model görülmedi.

Eksik:

- Tercih veri modeli yok: kullanıcı, konu ve kanal ekseni ve varsayılanlar tanımlanmamış. Frappe'nin yerel Notification Settings'iyle ilişkisi (yeniden kullanım mı, genişletme mi) belirtilmemiş.
- Saat dilimi kaynağı (User.time_zone ya da sistem varsayılanı) ve DST davranışı tanımsız.
- Özet penceresi, gruplama anahtarı ve 'tek gönderim' için idempotency kuralı yok.
- Meet zil tercihi yalnız istemcide çalışıyor; bunun sunucu tercihi gibi sayılmaması gerektiği yazılmamış.
- scopeDecision gerekçesi kanal seçimi metninin kopyası; tercih kapsamına özgü değil.

Nasıl tamamlanır: Mevcut notification-preference görevine şunlar eklenmeli: önce v17 Notification Settings kaynağının hangi alanlarının yeniden kullanılacağı belirlenmeli; sessiz saat ve özet için tek bir scheduler_events girdisi ve erteleme kuyruğu sözleşmesi (saat dilimi kaynağı, idempotency anahtarı) yazılmalı.

Kaynak dayanakları: `suite/suite/hooks.py:289`; `frappe/frappe/api/v2.py:293`; `suite/frontend/src/apps/meet/utils/audioNotifications.ts:90`.

Rehber: [notification-preference](./frappe-roadmap-contracts/notification-preference.json). Mevcut birincil görev: `notification-preference--implementation`.

### notifications-7 — Okundu bilgisi, teslimat geçmişi, yeniden deneme ve alternatif kanal.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Okundu ile teslim edildi ayrımı ve tek alternatif geçiş ölçütü anlamlı. Kaynakta kanala özgü durumlar var: Drive Notification'da alıcıyla sınırlanmış read bayrağı, Mail'de seen ve JMAP Event Notification'da draft/teslim açıklaması. Kanallar arası teslimat geçmişi ve alternatif rota yok. Drive paylaşım e-postasındaki hata ise sessizce yutuluyor.

Eksik:

- Dayanak olarak version-15 kaynak URL'leri gösterilmiş; yerel kurulum Frappe 17.0.0.dev0 (adf1fd0c). Notification Log ve Email Queue alanlarının v17'de eşlenmesi gerekiyor.
- 'Teslim edildi' her kanal için (e-posta, push, sistem bildirimi) tanımlanmamış.
- Alternatif kanala geçiş tetikleyicisi (hangi hata, ne zaman aşımı) ve tek geçişi garanti eden kayıt anahtarı yok.
- send_share_email istisnayı yutuyor; bu yoldan teslimat geçmişi oluşmaz ve görevde belirtilmemiş.
- Birleşik teslimat kaydının yeni bir DocType mı olacağı, yoksa Notification Log/Email Queue üzerinden bir görünüm mü olacağı kararlaştırılmamış.

Nasıl tamamlanır: notification-delivery görevinde v17 Notification Log ve Email Queue durum alanları kaynaktan çıkarılıp kanal başına okundu/teslim/başarısız eşleme tablosu yazılmalı. Ardından tek geçişli fallback için mesaj kimliği bazlı bir idempotency kuralı ve yutulan hataların kayda alınması tanımlanmalı.

Kaynak dayanakları: `suite/suite/drive/api/notifications.py:63`; `suite/suite/drive/api/notifications.py:159`; `suite/suite/calendar/doctype/event_notification/event_notification.json:155`; `suite/pyproject.toml:45`.

Rehber: [notification-message](./frappe-roadmap-contracts/notification-message.json). Mevcut birincil görev: `notification-message--implementation`.

### notifications-8 — Bildirim tekilleştirme, sıklık sınırı ve pazarlama/işlemsel ayrımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (aynı olay iki kez tüketilince tek bildirim; pazarlama izni ayrı) test edilebilir. Kaynakta yalnız yerel parçalar var: Drive aynı içerikli kaydı exists ile atlıyor, ancak bu atomik değil ve olay anahtarına dayanmıyor. Meet'te türe göre 5 sn'lik istemci tarafı sınır var. E-posta unsubscribe uç noktası açık. Ortak tekilleştirme, sıklık sınırı ve izin sınıflandırması yok.

Eksik:

- Olay anahtarının tanımı (kaynak doküman, olay türü, sürüm) ve saklama süresi yok.
- Drive'daki exists-sonra-insert yaklaşımı eşzamanlı tüketimde yarış koşuluna açık; görev benzersiz kısıt ya da kilit gerektirdiğini belirtmiyor.
- Sıklık sınırının ekseni (kullanıcı, kanal, konu) ve aşımda ne olacağı (atla, özete ekle) tanımsız.
- Pazarlama/işlemsel sınıfı hangi alanda tutulacak, belirtilmemiş. Unsubscribe'ın işlemsel e-postayı kesmemesi kuralı yok.
- Google Consent Mode web etiket izni içindir; mesajlaşma izni için uygun bir kaynak değil.

Nasıl tamamlanır: notification-message görevine olay anahtarı ve benzersiz kısıt sözleşmesi ile mesaj sınıfı alanı (transactional/marketing) eklenmeli. İzin kaynağı Frappe'nin unsubscribe mekanizmasına bağlanmalı. Consent Mode kaynağı mesajlaşma izni kaynağıyla değiştirilmeli.

Kaynak dayanakları: `suite/suite/drive/api/notifications.py:124`; `suite/frontend/src/apps/meet/utils/notificationContext.ts:25`; `suite/suite/hooks.py:425`.

Rehber: [notification-message](./frappe-roadmap-contracts/notification-message.json). Mevcut birincil görev: `notification-message--implementation`.

### notifications-9 — Slack ve Microsoft Teams bildirim bağlayıcıları; kanal eşleme ve bağlantı yaşam döngüsü.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de somut bir Slack primitive'i var. "Slack Webhook URL" DocType'ında webhook_name (unique, autoname), webhook_url ve show_document_link alanları bulunuyor. Yalnızca System Manager DocPerm'i tanımlı. Değişiklikler track_changes ile izleniyor. send_slack_message, requests.post ile tek seferlik bir JSON POST yapıyor. Hata olursa 400/403/404/410/500 için sabit mesajı frappe.log_error'a yazıp "error" döndürüyor. Notification DocType'ının channel seçenekleri Email/Slack/System Notification/SMS. Slack kanalında slack_webhook_url Link alanı zorunlu ve send_notification_by_channel → send_a_slack_msg ile gönderiliyor. İstisnalar log_error ile kaydediliyor. queue_send, evaluate_alert'i frappe enqueue (RQ) ile arka plana atabiliyor. Bu kısım "bildirimi Slack'te bir webhook kanalına eşleme" davranışını kısmen karşılıyor. Suite'teki "teams" eşleşmeleri Drive ekip kavramıyla ilgili kaldırma patch'leri; Retry-After eşleşmeleri ise mail/JMAP istemcisine ait. Microsoft Teams bağlayıcısı hiçbir kökte yok. Bu sonuç yalnızca kaynak koda dayanıyor, runtime kabulü yapılmadı (functionalAcceptance: not_run). Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Microsoft Teams bağlayıcısı (Workflows/Power Automate webhook veya bot/Graph yolu) iki app kökünde de yok.
- Kiracıya ait bağlantı modeli yok. Slack Webhook URL kaydında tenant/sahip alanı yok ve DocPerm yalnız System Manager'a tanımlı. Kiracı veya sahip bazında izin ve user permission kapsamı yok.
- webhook_url gizli değer olmasına rağmen Password değil Data alanı; secret olarak saklanmıyor, liste görünümünde de çıkıyor (in_list_view).
- İzinli kanal politikası yok: hangi kiracının, hangi rolün hangi kanala gönderebileceğini sınırlayan bir allowlist veya capability kontrolü bulunmuyor.
- Hız sınırı yok: 429 ve Retry-After işlenmiyor, geçici hatalarda tekrar deneme ya da backoff yok, gönderim denemesi ve sonucu için kalıcı bir teslim/outbox kaydı yok. Elde yalnız Error Log var.
- Bağlantı yaşam döngüsü yok: active/revoked/needs_reauth durumu, sahip ayrılınca devir veya yeniden yetkilendirme görünürlüğü ve iptal edilen bağlantı için kuyruktaki işi kesen bir kontrol bulunmuyor. send_slack_message kayıt varsa koşulsuz gönderiyor.
- requests.post timeout içermiyor; Slack OAuth/bot token yolu yok.
- planlanan Frappe adaptörü'da bağlantı ya da teslim sözleşmesini dışa açan bir API yok.

Nasıl tamamlanır: Tek ve dar bir davranışla başlanmalı: iptal edilen bağlantı gönderimi kesmeli. Sıra şöyle önerilir: 1) team-message-delivery--contract içinde kiracıya ait bir bağlantı DocType sözleşmesi tanımlanır. Bu sözleşme tenant, sahip, provider (Slack/Teams), Password tipinde secret, status (active/revoked/needs_reauth) ve izinli kanal alanlarını içerir. Mevcut Slack Webhook URL değiştirilmez; additive olarak ondan yeniden kullanılır. 2) Gönderim, outbox--contract üzerinden enqueue edilen bir teslim kaydına bağlanır. Worker gönderimden hemen önce status ve izinli kanal kontrolünü yapar. İptal edilmiş bağlantı için RED testi yazılır, sonra GREEN yapılır. 3) Aynı worker'a timeout, 429/Retry-After ve sınırlı backoff ile denemeleri izlenebilir kılan teslim kaydı eklenir. 4) Sahip ayrılınca needs_reauth durumuna geçiş ve bunun görünürlüğü eklenir. 5) Ancak bundan sonra tek bir hedef Teams API'si (Workflows webhook) aynı sözleşmeye ikinci provider olarak bağlanır. Headless provider yalnız bu sözleşmeyi dışa açmalı; Suite Vue arayüzüne bağımlı olmamalı.

Kaynak dayanakları: `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:63`; `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.py:67`; `frappe/frappe/integrations/doctype/slack_webhook_url/slack_webhook_url.json:27`; `frappe/frappe/email/doctype/notification/notification.json:76`; `frappe/frappe/email/doctype/notification/notification.py:438`; `frappe/frappe/email/doctype/notification/notification.py:385`.

Rehber: [team-message-delivery](./frappe-roadmap-contracts/team-message-delivery.json). Mevcut birincil görev: `team-message-delivery--implementation`.

### finance-1 — Sipariş, fatura, muhasebeleştirme ve ön muhasebe.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul cümlesi (sipariş–fatura–tahsilat → doğru cari + dengeli defter) var, ancak kapsam 'conditional' ve ERPNext/dış muhasebe seçimi yapılmamış. Kurulu uygulamalar yalnız frappe ve suite; sipariş, fatura ve GL ERPNext yeteneği olduğundan yerelde kurulu değil. Frappe'de yalnız genel submit/izin/REST primitifleri var; cloud_billing ise sitenin kendi Frappe Cloud faturası ve SaaS müşteri muhasebesi değil.

Eksik:

- ERPNext ya da harici muhasebe kararı ve sahibi yok; scopeDecision açık kalmış
- Frappe 17.0.0-dev ile uyumlu ERPNext sürüm/branch eşlemesi yok
- Headless entegrasyon sınırı yok: hangi DocType'lar, submit/cancel akışı, idempotency ve tahsilat eşleme kontratı tanımsız
- Kabulde örnek veri seti, beklenen GL satırları ve tenant sınırı yok
- cloud_billing (site aboneliği) ile SaaS müşteri faturası ayrımı yazılı değil

Nasıl tamamlanır: billing-instruction--implementation altına tek karar notu ekle: ERPNext mi harici muhasebe mi, Frappe 17 dev uyumlu sürüm pini ve tek örnek zincir (1 sipariş → 1 fatura → 1 tahsilat → beklenen GL). Seçilen app kurulup doğrulanana kadar native diye işaretleme.

Kaynak dayanakları: `suite/pyproject.toml:45`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:1`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/client.py:276`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `billing-instruction--implementation`.

### finance-2 — Para birimi, döviz kuru ve vergilendirme yönetimi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul cümlesi dövizli, vergi dahil ve yuvarlanmış işlem için tutar ve hesap eşleşmesini istiyor; ancak ülke, vergi politikası ve kur kaynağı seçilmemiş. Currency Exchange, vergi şablonları ve Accounts Settings ERPNext tarafında; ERPNext yerelde kurulu değil. Verilen Frappe kesitlerinde vergi veya kur motoru görülmedi.

Eksik:

- Ülke/vergi rejimi ve kur kaynağı (manuel mi, sağlayıcı mı) seçilmemiş
- Beklenen tutar ve hesapları içeren somut örnek senaryo tablosu yok
- Yuvarlama hassasiyetinin hangi ayarla ve hangi seviyede (satır mı belge mi) uygulanacağı yazılmamış
- ERPNext sürüm eşlemesi ve headless salt-okunur hesaplama önizleme kontratı yok

Nasıl tamamlanır: currency-tax-policy--implementation için tek politika kaydı yaz: ülke, vergi oranları, kur kaynağı, yuvarlama kuralı ve 1 dövizli örnek ile beklenen sonuç. Uygulama, finance-1 kararı ve ERPNext kurulumu sonrasına bağımlı.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/pyproject.toml:6`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `currency-tax-policy--implementation`.

### finance-3 — Süper admin için SaaS müşterilerinin cari, finans ve mutabakat yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul cümlesi iki yönlü: süper admin mutabakat yapabilmeli, tenant kullanıcısı işletmeci carisini görmemeli. Frappe'de DocType izni, has_permission, alan seviyesinde okuma izni ve Permission Query primitifleri var. Cari ve Payment Reconciliation ise ERPNext'e ait ve kurulu değil. Ayrıca işletmeci defterinin tenant sitelerinden nasıl ayrılacağı (ayrı site mi, aynı site mi) tanımsız.

Eksik:

- İşletmeci defterinin konumu tanımsız: kontrol sitesi mi, tenant sitesi mi; site arası veri akışı yok
- Süper admin rol/izin matrisi ve tenant reddi için negatif test senaryosu yazılmamış
- Mutabakat çalıştırma kontratı (girdi, eşleme kuralı, geri alma, denetim izi) yok
- Keycloak rolünden Frappe Role'e eşleme tanımsız
- ignore_permissions/Permission Query string SQL kısayolunun yasak olduğu açıkça yazılmamış

Nasıl tamamlanır: reconciliation-run--implementation için önce yetki sınırı kararını yaz: işletmeci cari defteri ayrı kontrol sitesinde, native Role/DocPerm ile korunuyor; tenant için 1 negatif kabul senaryosu. Mutabakat motoru ERPNext kurulumu sonrasına bağımlı.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/desk/reportview.py:25`; `frappe/frappe/core/doctype/server_script/server_script.js:125`.

Rehber: [reconciliation-run](./frappe-roadmap-contracts/reconciliation-run.json). Mevcut birincil görev: `reconciliation-run--implementation`.

### finance-4 — Fatura bilgileri, numaralandırma, vergi profili ve yuvarlama kuralları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul cümlesi numara benzersizliği, vergi profili ve küsurat örneklerini istiyor, ancak 'seçilen ülke senaryosu' tanımlı değil ve yerel e-belge koşulu açık bırakılmış. Fatura alanları, vergi profili ve yuvarlama ERPNext'te; kurulu değil. Frappe'nin genel naming ve izin primitifleri tek başına mali numaralandırma ve vergi profili kuralı değil.

Eksik:

- Ülke ve e-belge (ör. yerel e-fatura) gereksinimi seçilmemiş
- Numara serisi formatı, sıfırlanma dönemi ve iptal/boşluk politikası tanımsız
- Vergi profili alan listesi ve hangi alanların Custom Field ile ekleneceği belirtilmemiş
- finance-1 ile aynı primary task paylaşılıyor; bağımlılık sırası yazılmamış

Nasıl tamamlanır: billing-instruction--implementation içinde finance-4'ü finance-1 kararına bağla; ülke seçimi, numara serisi kuralı ve 3 küsurat örneği içeren tek tablo ekle. Ek alanlar native Custom Field/Property Setter ile planlansın.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/api/v1.py:132`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `billing-instruction--implementation`.

### finance-5 — Alacak/borç düzeltmeleri, ön ödeme, vade ve gecikme takibi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef (avans mahsubu, kısmi ödeme, düzeltme) ve kabul ölçütü (cari bakiye ile fatura kalanının eşleşmesi) anlamlı. Ancak tüm yetenek ERPNext'e dayanıyor ve ERPNext yerel sitede kurulu değil. Suite yalnız frappe bağımlılığı bildiriyor. Frappe çekirdeğinde yalnız submit/cancel/amend gibi belge yaşam döngüsü yapı taşları var; muhasebe defteri yok.

Eksik:

- ERPNext sürümünün yerel Frappe 17.0.0-dev ile eşlemesi tanımlı değil; dokümanlar sürümsüz.
- 'SaaS erişim etkisi ayrıca bağlanır' notunun hangi göreve bağlanacağı yok: vade veya gecikmenin askıya alma/erişim kısıtına nasıl bağlanacağı belirsiz.
- finance-5, 8 ve 9 aynı primaryTaskId'yi (billing-instruction--implementation) paylaşıyor; alt kabul sınırı ayrılmamış.
- İşletmeci muhasebesinin ERPNext'te mi harici sistemde mi tutulacağı (scope: conditional) kararı verilmemiş.

Nasıl tamamlanır: billing-instruction--implementation altında tek bir karar kaydı açılmalı: muhasebe sistemi (ERPNext ayrı site mi, harici sistem mi), Frappe 17 dev ile uyumlu ERPNext dalı ve gecikmenin erişime etkisi kuralı yazılmalı. Bu karar verilmeden yerel yetenek iddia edilmemeli.

Kaynak dayanakları: `suite/pyproject.toml:45`; `frappe/frappe/permissions.py:20`; `frappe/frappe/client.py:276`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `billing-instruction--implementation`.

### finance-6 — Banka, ödeme sağlayıcısı ve muhasebe kayıtlarını uzlaştırma.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güçlü: sağlayıcı ücretleri dahil settlement toplamı banka ve defterle uzlaşmalı, fark açıklanmalı. Ancak ödeme–fatura mutabakatı ERPNext'te, ödeme geçidi DocType'ları ise payments uygulamasında. İkisi de kurulu değil; patch, payments yoksa geçit DocType'larını siliyor. Çekirdekteki on_payment olayları payments controller'ına bağlı. cloud_billing'deki reconcile_payment_setup yalnız kart kurulumunu etkinleştiriyor; settlement uzlaştırması değil.

Eksik:

- Banka ekstresi kaynağı, ödeme sağlayıcısı ve settlement veri biçimi seçilmemiş.
- payments uygulamasının kurulup kurulmayacağı ve sürümü belirtilmemiş.
- Uzlaşmayan farkın sahibi, eşik ve onay akışı tanımlı değil.
- Bu iş idempotent yeniden çalıştırma gerektiriyor; reconciliation-run görevinde bu sözleşme yok.

Nasıl tamamlanır: reconciliation-run--implementation için önce sağlayıcı ve banka veri kaynağı seçilmeli, ardından payments ve ERPNext sürüm eşlemesi yazılmalı. Fark kaydı alanları (tutar, ücret, açıklama, sahip) sözleşme olarak tanımlanmalı; ignore_permissions içeren yardımcılar veya ham SQL kestirme yol olarak kullanılmamalı.

Kaynak dayanakları: `frappe/frappe/patches/v14_0/delete_payment_gateways.py:5`; `frappe/frappe/core/doctype/server_script/server_script_utils.py:25`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:69`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `reconciliation-run--implementation`.

### finance-7 — Muhasebe sistemi ve uygulanabilir e-belge entegrasyonları.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (sağlayıcının test ortamında belge kabul/iptal ve finans eşlemesi) anlamlı. Ancak hedef ülke, e-belge sağlayıcısı ve muhasebe sistemi seçilmediği için kabul ölçütü koşullu kalıyor. ERPNext kurulu değil. Sunulan kaynak kesitlerinde e-belge kodu görülmedi; bu küresel yokluk kanıtı değil. Frappe REST/RPC ve izin denetimi entegrasyon için yalnız yapı taşı.

Eksik:

- Ülke, e-belge sağlayıcısı ve sağlayıcı API sürümü kararı yok.
- Muhasebe köprüsünün yönü ve kaynak kayıt (source of truth) tanımlı değil; mükerrer gönderim ve iptal eşlemesi kuralı yok.
- Sağlayıcı kimlik bilgilerinin nerede saklanacağına dair sınır tanımlı değil (secret değerleri kaynağa yazılmamalı).

Nasıl tamamlanır: accounting-bridge--implementation için ülke ve sağlayıcı seçimi tek bir karar olarak kaydedilmeli. Seçim yapılana kadar görev 'verify/blocked' olarak işaretlenmeli; köprü uç noktaları izin denetimli whitelisted yöntemlerle sınırlanmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:132`; `suite/pyproject.toml:45`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `accounting-bridge--implementation`.

### finance-8 — İşletmecinin finans kayıtları ile müşterinin ürün içi muhasebesini ayırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: işletmeci faturası tenant muhasebesine istemeden yazılmamalı ve çapraz rapor erişimi engellenmeli. Kaynakta ayrışmayı destekleyen yapı taşları var: Cloud Settings faturalaması iş mantığını Central'da tutuyor ve System Manager rolüyle erişim kontrol ediliyor; site başına izinler ve reportview'da ignore_permissions engeli de mevcut. Hazır bir ayrıştırma politikası ise yok. Server Script Permission Query örneği f-string ile SQL koşulu kuruyor; bu kestirme yol olarak kabul edilemez.

Eksik:

- İşletmeci defterinin yeri belirtilmemiş: Central, ayrı ERPNext sitesi veya harici sistem.
- Tenant sitesinde ERPNext kurulursa company/site sınırı ve rapor izin matrisi tanımlı değil.
- Cloud billing'in Frappe Cloud/Atlas'a özgü olduğu ve Keycloak kimliğiyle nasıl eşleneceği belirtilmemiş.
- Paylaşılan billing-instruction görevi içinde bu maddenin kabulü ayrılmamış.

Nasıl tamamlanır: billing-instruction--implementation altında ayrışma kararı yazılmalı: işletmeci finansı tenant sitesinin dışında (Central veya ayrı muhasebe sitesi) tutulmalı. Çapraz erişim, yerel DocType izinleri ve User Permission ile engellenmeli; Permission Query script veya ham SQL kullanılmamalı.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:4`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:12`; `frappe/frappe/desk/reportview.py:25`; `frappe/frappe/core/doctype/server_script/server_script.js:125`.

Rehber: [billing-instruction](./frappe-roadmap-contracts/billing-instruction.json). Mevcut birincil görev: `billing-instruction--implementation`.

### finance-9 — Ertelenmiş gelir; hizmet dönemine göre gelir tanıma planı ve dönemsel muhasebeleştirme.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü ayrıntılı: hizmet dönemine bölme, faturayla uzlaşma, iptal/iade ve kapalı dönem. Ancak dayanılan ERPNext Deferred Revenue kurulu değil. Frappe'nin zamanlayıcı ve Monthly gibi olay sıklıkları yalnız dönemsel çalıştırma yapı taşı; gelir tanıma mantığı içermiyor.

Eksik:

- Abonelik verisinin kaynağı ve hizmet dönemi alanlarının fatura satırına eşlenmesi tanımlı değil.
- İşletmecinin hesap politikası (aylık/günlük oransal dağıtım, kapalı dönem düzeltmesi) yazılmamış.
- ERPNext sürüm eşlemesi yok; finance-1 ile sınır yalnız scopeDecision'da belirtilmiş.

Nasıl tamamlanır: billing-instruction--implementation içinde ertelenmiş gelir alt kararı yazılmalı: dağıtım yöntemi, abonelik → fatura satırı eşlemesi ve kapalı dönem kuralı. Uygulama, ERPNext kurulumu ve sürüm kararına bağımlı tutulmalı; Server Script zamanlayıcısıyla özel muhasebe kodu yazılmamalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/server_script/server_script.json:102`; `suite/pyproject.toml:45`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `billing-instruction--implementation`.

### support-1 — Helpdesk (destek merkezi), support (destek) ve ticket (destek talebi).

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü somut: müşteri ticket açar, yetkili ekip yanıtlar, tenant izolasyonu sağlanır. Görev eşlemesi de belli (helpdesk-ticket-bridge--implementation). Ancak Helpdesk uygulaması doğrulanmış kurulu uygulama listesinde yok; sitede yalnız frappe ve suite kurulu. Suite de destek ürünü içermiyor. Frappe çekirdeğinde Communication (Open/Replied/Closed durumları), genel REST rotaları ve has_permission gibi yapı taşları var; ama bunlar ticket ürünü değildir.

Eksik:

- Helpdesk sürümünün yerel Frappe 17.0.0-dev (adf1fd0c) ile uyumu ve kurulum kararı belirtilmemiş.
- Tenant izolasyon modeli tanımsız: site başına tenant mı, User Permission/paylaşım kuralı mı?
- Keycloak rolleri ile Helpdesk ajan/müşteri rolleri arasındaki eşleme ve headless API sınırı tanımsız.
- Helpdesk kurulmazsa Communication'ı ticket gibi kullanmanın kabul edilip edilmediği belirsiz.

Nasıl tamamlanır: Önce kapsam kararı alınsın ve Helpdesk'in Frappe v17-dev uyumu kaynaktan teyit edilsin. Ardından tenant izolasyonu (User Permission veya site ayrımı) ve Keycloak rol eşlemesi, mevcut görev ID'si altında tek bir köprü sözleşmesi olarak yazılsın. Yeni CRUD veya izin katmanı kopyalanmasın.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/communication/communication.json:173`; `frappe/frappe/api/v1.py:154`; `frappe/frappe/core/doctype/communication/email.py:94`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`.

### support-2 — Onboarding (ilk kullanım yönlendirmesi) ve uygulama içi yardım.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Onboarding ve yardım için çalışan yapı taşları upstream Frappe desk modülünde var. (1) Module Onboarding, Onboarding Step, Onboarding Step Map ve Onboarding Permission DocType'ları. Adım eylemleri: Create Entry, Update Settings, Show Form Tour, View Report, Go to Page, View Docs, Complete Onboarding. Her adımda Markdown açıklama, video, path ve route_options alanları bulunur. (2) Adım durumu veritabanında saklanır. Whitelisted update_onboarding_step yalnız is_complete ve is_skipped alanlarını yazar. Rol kapısı can_update_step, iş doğrulaması throw_if_unfinished/is_work_done, modül tamamlanması update_completion ile yapılır. Bu ilerleme site genelinde tutulur, kullanıcı başına değil. get_onboarding_steps adımları rol filtreli ve çevrilmiş metinle döner. (3) Form Tour ve Form Tour Step, page_route'a bağlı UI turları sunar. Turun tamamlanma durumu kullanıcı başına User.onboarding_status JSON alanında tutulur (update_user_status, reset_tour) ve özellik enable_onboarding ile açılıp kapanır. (4) frappe/onboarding.py, uygulama bazlı ve kullanıcı başına adım durumu API'si sağlar: get_onboarding_status ve update_user_onboarding_status. (5) Help Article ve Help Category, website bilgi tabanını /kb portal rotasıyla sunar. (6) Suite'in Vue frontend'inde yalnız ilk kurulum kapısı var: Suite Settings.is_onboarded alanı, get_onboarding_state ve mark_onboarded (System Manager) API'leri ile router'ın /suite/setup yönlendirmesi. Bağlamsal yardım ya da adım listesi yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Bağlam anahtarından (route/DocType/adım ID) yardım içeriğine çözümleme yapan API veya eşleme tablosu yok; Help Article yalnız portal KB'si, Onboarding Step/Form Tour ile bağı yok, View Docs yalnız path tutar.
- Module Onboarding ilerlemesi site geneli; kullanıcı veya tenant başına adım ilerlemesi yalnız serbest JSON (User.onboarding_status) ile mümkün, şema/doğrulama yok.
- Tenant kapsamı yok; Frappe site düzeyinde çalışır, tenant-registry ile bağ yok.
- Headless provider sözleşmesi yok (adım listesi, durum yazma, bağlamsal yardım için kernel-envelope uyumlu uçlar).
- Mevcut render katmanı Frappe Desk JS'dir; seçilen React/Ant Design frontendinde onboarding checklist veya bağlamsal yardım bileşeni yok (bu kaynakta yok, GenUI kapsamı dışı).
- Helpdesk KB kurulu değil; içerik kaynağı kararı verilmemiş.

Nasıl tamamlanır: Sıra şöyle. (1) onboarding-checklist--contract: içerik kaynağı olarak upstream Help Article ve Onboarding Step seçilsin. Bağlam anahtarı tanımlansın: route, DocType ve stepId. İlerleme kapsamı belirlensin: kullanıcı mı tenant mı. Site geneli Module Onboarding, kullanıcı başına User.onboarding_status. (2) onboarding-checklist--schema: bağlam anahtarını yardım içeriğine eşleyen tek dar alan veya tablo eklensin. Upstream DocType'lar değiştirilmesin. (3) planlanan Frappe adaptörü'a iki salt sarmalayıcı uç eklensin: adımları ve bağlamsal yardımı okuyan uç get_onboarding_steps ve can_update_step'i yeniden kullansın; durumu yazan uç update_onboarding_step'i yeniden kullansın. Gerçek RED/GREEN kanıtıyla tek davranış uygulansın: tamamlanan adım saklanır ve tekrar okunur. (4) React UI bundan sonra ui-family-37 altında gelir.

Kaynak dayanakları: `frappe/frappe/desk/desktop.py:712`; `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:158`; `frappe/frappe/desk/doctype/onboarding_step/onboarding_step.py:159`; `frappe/frappe/onboarding.py:13`; `frappe/frappe/desk/doctype/form_tour/form_tour.py:114`; `suite/suite/api/account.py:16`.

Rehber: [onboarding-checklist](./frappe-roadmap-contracts/onboarding-checklist.json). Mevcut birincil görev: `onboarding-checklist--implementation`.

### support-3 — Survey (anket) ve NPS (Net Promoter Score — tavsiye skoru).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü ayrımı ve tekrar gösterim engelini istiyor: ticket memnuniyeti ile NPS ayrı kaydedilmeli, uygun olmayan kullanıcıya anket tekrar açılmamalı. Ticket geri bildirimi Helpdesk'e bağlı ve Helpdesk kurulu değil. Frappe'de kayıt ve izin yapı taşları var; Web Form yalnız test yardımcısında görünüyor, bu da uygulama kanıtı değil. Örnekleme, puanlama ve bekleme süresi mantığı kaynakta yok.

Eksik:

- NPS puanlama formülü (0–10, promoter/detractor eşikleri) ve raporlama tanımsız.
- Uygunluk, örnekleme ve bekleme süresi kuralları ile bunların sunucuda mı uygulanacağı tanımsız.
- Anket ve NPS yanıtlarının saklanacağı DocType ve tenant izolasyonu tanımsız.
- Ticket memnuniyeti Helpdesk kurulumuna bağımlı; o olmadan nasıl karşılanacağı belirsiz.

Nasıl tamamlanır: support-feedback--implementation altında NPS veri modeli, uygunluk ve bekleme kuralı sözleşmesi yazılsın. Tekrar gösterim engeli sunucu tarafında, mevcut izin modeliyle uygulansın. Ticket memnuniyeti Helpdesk kararına bağımlı olarak işaretlensin.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/permissions.py:82`.

Rehber: [support-feedback](./frappe-roadmap-contracts/support-feedback.json). Mevcut birincil görev: `support-feedback--implementation`.

### support-4 — SLA (Service Level Agreement — hizmet seviyesi anlaşması), öncelik ve yanıt süresi.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut ve test edilebilir: mesai dışında açılan ticket için ilk yanıt ve çözüm sayacı seçilen SLA'ya göre hesaplanmalı. Ancak SLA, Helpdesk'in özelliği ve Helpdesk kurulu değil. ERPNext de kurulu olmadığı için ondaki SLA yeteneği yerel sayılamaz. İncelenen Frappe çekirdeği alıntılarında SLA veya iş saati hesabı yok.

Eksik:

- Sözleşme eşikleri (öncelik başına ilk yanıt ve çözüm süreleri) belirtilmemiş.
- İş saatleri, tatil takvimi ve saat dilimi kaynağı ile tenant başına SLA ataması tanımsız.
- support-1 ile aynı birincil görevde; 'configure' işi 'integrate' işinden ayrılmamış ve bağımlılık sırası yok.

Nasıl tamamlanır: Helpdesk kurulum kararından sonra uygulansın. Öncelik başına eşik tablosu, iş saati/tatil/saat dilimi kaynağı ve tenant ataması helpdesk-ticket-bridge--implementation altında yapılandırma alt adımı olarak tanımlansın. Yeni görev kaydı açılmasın.

Kaynak dayanakları: `suite/pyproject.toml:6`; `frappe/frappe/core/doctype/communication/communication.json:194`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`.

### support-5 — Talep atama, kuyruk, durum, etiket, iç not ve üst yetkiliye aktarma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütleri anlamlı: doğru ekibe atama, özel notun müşteri API'sinde görünmemesi ve gecikme eskalasyonu. Ancak talimat, yerel kurulumda bulunmayan Helpdesk uygulamasına dayanıyor; site yalnız frappe ve suite içeriyor. Frappe çekirdeğinde bazı yapı taşları var: Assignment Rule, ToDo, _user_tags, Communication durumu ve permlevel alan izni. Kuyruk, SLA ve eskalasyon motoru ise kaynakta görülmedi.

Eksik:

- Helpdesk kurulu değil. Hangi sürümün Frappe 17.0.0-dev ile uyumlu olduğu ve kurulup kurulmayacağı kararı yok.
- Özel not için hangi modelin kullanılacağı belirsiz: HD yorumu mu, Comment mi, yoksa permlevel>0 alan mı? Müşteri API'sinde filtreleme sözleşmesi tanımlı değil.
- Kuyruk, etiket ve eskalasyon kuralları ile gecikme eşikleri tanımlanmamış.
- helpdesk-ticket-bridge görevi support-8 ile paylaşılıyor. Köprünün sınırı (atama, durum, not) ayrılmamış.

Nasıl tamamlanır: Önce Helpdesk'i kurma veya çekirdek ToDo/Assignment Rule ile ilerleme kararını tek satırla kaydedin. Ardından helpdesk-ticket-bridge görevine şu sözleşmeyi ekleyin: özel not permlevel ile korunur ve müşteri yanıtı apply_fieldlevel_read_permissions üzerinden süzülür. Eskalasyonu SLA kaynağına bağlayın.

Kaynak dayanakları: `frappe/frappe/core/doctype/communication/communication.py:12`; `frappe/frappe/core/doctype/communication/mixins.py:7`; `frappe/frappe/core/doctype/communication/communication.py:46`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/permissions.py:894`; `suite/pyproject.toml:6`.

Rehber: [helpdesk-ticket-bridge](./frappe-roadmap-contracts/helpdesk-ticket-bridge.json). Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`.

### support-6 — Bağlama duyarlı yardım, ilk kurulum adımları ve tamamlanma takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de çalışan onboarding ilkelleri var: Module Onboarding, Onboarding Step, Onboarding Step Map ve Onboarding Permission DocType'ları. Adım tamamlanması sunucuda doğrulanıyor. Whitelist'li desktop.update_onboarding_step yalnız is_complete/is_skipped alanlarını kabul ediyor; önce can_update_step ile rol kontrolü, sonra throw_if_unfinished yapıyor. is_work_done, Create Entry adımı için kaydın var olup olmadığına (submittable ise docstatus=1), Update Settings adımı için Single alan değerine bakıyor. Ardından update_completion onboarding'in is_complete değerini güncelliyor. İlerleme site genelinde paylaşılıyor ve adım bayraklarında kalıcı; bu yüzden yeniden girişte tamamlanmış adımlar korunuyor. Bağlama duyarlı yardım ilkelleri: Form Tour (ui_tour + page_route ile rota eşlemesi), kullanıcı başına User.onboarding_status JSON'u, DocType.documentation ve DocField/Report.documentation_url. Suite tarafındaki kurulu uygulama kodu: Suite Settings.is_onboarded tekil bayrağı, System Manager'a sınırlı mark_onboarded (complete_app_setup çağırıyor) ve Vue router'da /suite/setup ilk çalıştırma kapısı.

Eksik:

- Kullanıcı ve tenant kapsamlı devam imleci (current step) yok. Module Onboarding ilerlemesi site genelinde ve yalnız adım bayraklarında tutuluyor. Suite'te yalnız ikili is_onboarded bayrağı var ve sihirbazın ara adımı sunucuda saklanmıyor. 'Aynı adımdan devam' yalnız tamamlanmış bayraklardan dolaylı çıkarılabiliyor.
- frappe.onboarding.update_user_onboarding_status, istemcinin gönderdiği adımları sunucu doğrulaması olmadan User.onboarding_status'a yazıyor. Bu nedenle tamamlanma kanıtı sayılamaz.
- React/AntD/X istemcisi için headless provider uç noktası ya da DTO bulunmuyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.
- Bağlama duyarlı yardımın ekran/rota → içerik eşlemesi yalnız Desk'e bağlı Form Tour ve documentation URL alanlarıyla sınırlı. Headless rota kimliğiyle eşleşen bir yardım kaynağı modeli yok.
- Tenant kapsamı yalnız site düzeyinde örtük. tenant-registry ve kernel-envelope sözleşmelerine bağlanmış bir onboarding durum modeli yok.
- Module Onboarding kayıtları uygulama fixture'ı olarak tanımlanıyor (Suite'e özgü Module Onboarding kaydı bulunamadı). SaaS ürününe ait adım seti tanımlı değil.

Nasıl tamamlanır: onboarding-checklist--contract içinde Frappe Module Onboarding/Onboarding Step'i yeniden kullanma kararını kaydedin. Ardından onboarding-checklist--schema kapsamında yalnız eksik olan kullanıcı/tenant kapsamlı devam imleci için ek alanı veya küçük bir DocType'ı tanımlayın. Sonra headless provider'a iki dar whitelist'li yöntem ekleyin. Okuma yöntemi get_onboarding_steps ve get_step_details'i sarmalayarak adımları ve imleci döndürsün. Yazma yöntemi update_onboarding_step'i (can_update_step + throw_if_unfinished) yeniden kullansın. Gerçek bir RED/GREEN testiyle şunları kanıtlayın: bitmemiş Create Entry adımı reddedilmeli, imleç yeniden girişte korunmalı. Bağlama duyarlı yardım (route → documentation/Form Tour eşlemesi) ui-family-37 ile sonraki adımda ele alınsın.

Kaynak dayanakları: `frappe/frappe/desk/desktop.py:735`; `frappe/frappe/desk/desktop.py:731`; `frappe/frappe/desk/doctype/onboarding_step/onboarding_step.py:62`; `frappe/frappe/desk/doctype/module_onboarding/module_onboarding.py:158`; `frappe/frappe/onboarding.py:21`; `suite/suite/api/account.py:30`.

Rehber: [onboarding-checklist](./frappe-roadmap-contracts/onboarding-checklist.json). Mevcut birincil görev: `onboarding-checklist--implementation`.

### support-7 — Özellik talepleri, geri bildirim toplama ve memnuniyet geçmişi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü, kiracılar arası okuma yasağını içerdiği için anlamlı. Ancak taban olarak gösterilen Helpdesk ticket geri bildirimi kurulu değil. Özellik talebi ve oylama modeli yok. 'Müşteri' kimliğinin hangi kayda bağlanacağı da tanımsız; ERPNext Customer kurulu değil. Frappe'de owner/if_owner ve belge düzeyi izin yapı taşları mevcut.

Eksik:

- Müşteri kimliğinin neye eşleneceği tanımsız: Keycloak kullanıcısı mı, Contact mı, tenant mı? ERPNext Customer kurulu değil.
- Özellik talebi, oy ve memnuniyet kayıtları için DocType ile izin modeli (if_owner veya User Permission) seçilmemiş.
- Helpdesk feedback modelinin kurulumu ve sürümü belirsiz.
- Kiracılar arası izolasyon için negatif kabul senaryosu yok.

Nasıl tamamlanır: support-feedback görevine şunları ekleyin: müşteri kimlik anahtarını seçin; talep, oy ve memnuniyet için yerel DocType'ları User Permission veya if_owner ile tanımlayın. Kabul ölçütüne 'başka müşteri listeleyemez/okuyamaz' API kontrolünü ekleyin.

Kaynak dayanakları: `frappe/frappe/permissions.py:328`; `frappe/frappe/permissions.py:94`; `suite/pyproject.toml:6`.

Rehber: [support-feedback](./frappe-roadmap-contracts/support-feedback.json). Mevcut birincil görev: `support-feedback--implementation`.

### support-8 — Canlı destek sohbeti; temsilciye aktarım, görüşme geçmişi ve destek talebine dönüşüm.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütleri güçlü: kiracı yetkisi, çevrimdışı talep alma, tek ticket'a bağlanma ve saklama/silme politikası. Ancak sohbet sağlayıcısı seçilmemiş. Görev, support-5 ile aynı köprü görevine eşlenmiş. Frappe Communication 'Chat' ortamını ve timeline bağlantılarını destekliyor; temsilciye aktarma ve canlı oturum ise kaynakta yok.

Eksik:

- Sohbet hizmeti ya da özel uygulama kararı yok. Dış veri akışı ve saklama sahipliği belirsiz.
- Ayrı bir uygulama görevi yok; helpdesk-ticket-bridge görevine yüklenmiş.
- Sohbetin ticket'a dönüşümünde izinli make yolunun kullanılacağı belirtilmemiş. _make izin denetimini atladığı için dışa açılmamalı.
- Temsilciye aktarma, çevrimdışı durum ve saklama süresi parametreleri tanımsız.

Nasıl tamamlanır: Sağlayıcı kararını kaydedin. Ticket dönüşümünü izin denetimli make üzerinden kurun: communication_medium='Chat' olsun ve timeline_links ile tek ticket'a bağlansın. Bu kısmı support-5 köprüsünden ayrı bir alt sözleşme olarak tanımlayın.

Kaynak dayanakları: `frappe/frappe/core/doctype/communication/communication.py:51`; `frappe/frappe/core/doctype/communication/communication.py:95`; `frappe/frappe/core/doctype/communication/email.py:94`; `frappe/frappe/core/doctype/communication/email.py:173`.

Rehber: [helpdesk-ticket-bridge](./frappe-roadmap-contracts/helpdesk-ticket-bridge.json). Mevcut birincil görev: `helpdesk-ticket-bridge--implementation`.

### support-9 — Güvenli destek paketi; hata kimliği, zaman ve ilgili ekran bağlamını önizleyerek paylaşma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de hata kimliğinin kaynağı somut olarak var. frappe/monitor.py her istek için uuid4 izleme kimliği (trace id) üretiyor; istemci geçerli bir X-Frappe-Request-Id gönderirse onu kullanıyor. app.py process_response bu kimliği X-Frappe-Request-Id yanıt başlığına yazıyor. utils/error.py log_error aynı trace_id değerini Error Log kaydına yazıyor; böylece sunucu logu ile istemci arasında korelasyon kuruluyor. Error Log DocType izni yalnız System Manager rolünde. ErrorLog.clear_old_logs(days=30) ile saklama ve silme ilkeli (primitive) mevcut. Desk tarafında (headless değil) frappe.request.report_error şunları yapıyor: sunucu hatasında 'Report' düğmesi error_report_email alıcısına bir CommunicationComposer açıyor; alıcı yoksa 'Copy error to clipboard' paketi panoya kopyalıyor. Paket uygulama sürümlerini, route bilgisini, traceback'i, istek/yanıt verisini ve (yalnız pano yolunda) request_id değerini içeriyor. cleanup_request_opts yalnız doc içindeki parolaları maskeliyor. Suite Meet'te (Vue) problemReport.ts zaman damgası, URL, user agent, transport/ağ verisi ve son konsol log satırlarıyla, sabit bir dış adrese giden mailto bağlantısı hazırlıyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Sabit alan allowlist'i yok: desk paketi istek ve yanıt verisini, dolayısıyla form içeriğini de ekliyor. Yalnız parola maskeleniyor; token, cookie, kişisel veya tenant verisi varsayılan olarak hariç tutulmuyor.
- Kullanıcının alanları tek tek görüp çıkarabildiği yapılandırılmış bir önizleme ve açık onay adımı yok. Composer yalnız serbest metin düzenlemeye izin veriyor.
- Saat dilimi alanı yok. Desk 'Report' (e-posta) yolunda request_id yok; bu kimlik yalnız pano yolunda var.
- Suite Meet raporu ham konsol satırlarını ve tam URL'yi pakete koyuyor, sabit bir dış alıcı kullanıyor. Bu, gereksinimle çelişiyor.
- Headless (React/AntD) istemci için X-Frappe-Request-Id tüketimi, destek paketi DocType'ı veya whitelisted API sözleşmesi yok; planlanan Frappe adaptörü içinde de bulunmuyor.
- Paylaşılan paket için yetkili alıcıyla sınırlı bir depolama/izin modeli ve pakete özel saklama/silme politikası yok. Error Log'un 30 günlük temizliği yalnız sunucu loglarını kapsıyor.
- Destek alıcısı veya entegrasyonu seçilmemiş; Helpdesk kurulu değil.

Nasıl tamamlanır: Sıra şöyle: (1) support-package--contract kapsamında alan allowlist'ini sabitleyin: trace_id (X-Frappe-Request-Id), ISO zaman ve IANA saat dilimi, uygulama sürümü, route/ekran kimliği. Kullanıcı tarafından eklenen açıklama dışında form, request/response gövdesi, cookie, token ve ham konsol verisi olmasın. (2) Frappe tarafında tek bir whitelisted metot ve dar izinli bir Support Package DocType yazın. Bu metot yalnız allowlist alanlarını kabul etsin, trace_id ile Error Log'u yalnız yetkili rol için ilişkilendirsin ve clear_old_logs desenine benzer bir saklama işi içersin. Önce RED/GREEN testiyle başlayın. (3) Headless React istemcisi yanıt başlığından trace_id'yi okusun, alan bazlı önizleme ve çıkarma sunsun, gönderimi açık onaydan sonra yapsın. Otomatik dış mesaj gönderilmesin.

Kaynak dayanakları: `frappe/frappe/app.py:274`; `frappe/frappe/utils/error.py:83`; `frappe/frappe/public/js/frappe/request.js:595`; `frappe/frappe/public/js/frappe/request.js:634`; `frappe/frappe/core/doctype/error_log/error_log.py:46`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:108`.

Rehber: [support-package](./frappe-roadmap-contracts/support-package.json). Mevcut birincil görev: `support-package--implementation`.

### reports-1 — Her modül/özellik için raporlama; muhasebe, CRM ve diğer alan raporları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve görev eşlemesi (native-report--implementation) tanımlı. Frappe v17-dev kaynağında rapor temelleri görülüyor: izinli liste/sayım, group_by, 'report' izin hakkı ve query_report modülüne import. Kabul ölçütü ise muhasebe ve CRM raporlarına dayanıyor. ERPNext, HRMS ve Frappe CRM bu sitede kurulu değil; kurulu uygulamalar yalnızca frappe ve suite. Bu yüzden kabul ölçütü yerelde uygulanamıyor. 'Her modülün raporu' için modül envanteri ve headless rapor sözleşmesi de tanımlı değil.

Eksik:

- Muhasebe/CRM domain raporları kurulu uygulama envanterinde yok (not_installed); kabul ölçütü yerel siteye eşlenmemiş.
- Suite modülleri (Drive, Mail, Meet vb.) için hangi raporun gerektiğini gösteren envanter yok.
- Headless rapor çağrı sözleşmesi tanımlı değil: query_report çalıştırma, kolon/filtre metadata'sı, sayfalama ve dışa aktarma izni. v17-dev API'sine karşı sürüm eşlemesi de yok.
- Domain toplamlarıyla eşleşmeyi ölçecek referans veri kümesi tanımlı değil.

Nasıl tamamlanır: Önce kurulu kapsamı netleştirin: Suite modüllerinden bir pilot rapor seçin ve kabul ölçütünü frappe.desk.query_report ile get_list/get_count izin akışına bağlayın. Muhasebe/CRM maddelerini ERPNext/CRM kurulum kararına bağlı koşullu bağımlılık olarak işaretleyin.

Kaynak dayanakları: `frappe/frappe/client.py:30`; `frappe/frappe/permissions.py:25`; `frappe/frappe/utils/print_format.py:12`; `suite/pyproject.toml:6`.

Rehber: [native-report](./frappe-roadmap-contracts/native-report.json). Mevcut birincil görev: `native-report--implementation`.

### reports-2 — BI (Business Intelligence — iş zekâsı) panoları; BI Board.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat 'BI Board' ürününü seçmeyi açık bırakıyor. Frappe Insights kurulu uygulamalar arasında yok ve sürüm kaydı da yok. Kabul ölçütündeki 'tenant filtresini atlayamasın' şartı anlamlı. Ancak BI aracının veriye nasıl eriştiğine dair sınır tanımlı değil: doğrudan DB mi, Frappe izinli API mi? Bu sınır olmadan şart doğrulanamaz. reports-3 (Metabase) aynı birincil görevi (bi-embedding--implementation) paylaşıyor ama ikisi arasında seçim kuralı yok.

Eksik:

- BI ürünü seçilmemiş (Insights, Metabase veya özel pano); Insights'ın Frappe v17-dev (suite frappe>=16,<18) ile uyumu doğrulanmamış.
- Veri erişim sınırı tanımsız: doğrudan veritabanı bağlantısı Frappe DocType/User Permission kontrollerini atlar.
- Keycloak oturumunun BI aracına nasıl aktarılacağı ve tenant (site) eşlemesi tanımlı değil.
- reports-2 ile reports-3 aynı görevi paylaşıyor; tekilleştirme veya seçim kararı yok.

Nasıl tamamlanır: bi-embedding--implementation altında tek bir karar kaydı açın: ürün ve sürüm, veri yolu (yalnızca Frappe izinli API veya salt-okur tenant'a özel kaynak) ve SSO eşlemesi. Bu kayıt olmadan pano geliştirmesine başlamayın.

Kaynak dayanakları: `suite/pyproject.toml:45`; `frappe/frappe/permissions.py:82`; `frappe/pyproject.toml:20`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `bi-embedding--implementation`.

### reports-3 — Metabase adaptörü ve gömülü raporlar.

Kaynak durumu: **YOK**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kurulu frappe ve suite kaynaklarında Metabase (veya Superset/Redash) adaptörü, gömme token'ı üreten bir uç ya da kilitli tenant parametresi yok. Minified bundle'lardaki 'superset' eşleşmeleri ilgisiz: isSupersetOf, HTML entity ve highlight.js supersetOf. Adaptör olmasa da yeniden kullanılabilecek upstream-native primitifler var:

- query_report.run/get_report_doc rapor bazında rol kontrolü (Report.is_permitted) ve ref_doctype için 'report' izni uyguluyor.
- validate_filters_permissions, Link filtre değerlerini kullanıcı izniyle doğruluyor.
- Query Report, salt-okur transaction içinde check_safe_sql_query ile çalışıyor.
- Suite Meet'te, site config secret'ıyla sunucu tarafında imzalanan kısa ömürlü HS256 JWT örneği var.
- Web Form/Drive'da frame-ancestors başlığı yönetiliyor. Bu primitifler Metabase entegrasyonunu kanıtlamaz. Tenant sınırı Frappe'de site/DB düzeyinde sağlanıyor; Metabase tarafında buna karşılık gelen bir yalıtım yok. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Gömme türü (statik/imzalı, interactive, SDK) ve buna bağlı Metabase lisansı kararı; kullanıcıyla netleştirilmeli
- Frappe tarafında izin kontrolünden sonra kısa ömürlü imzalı embed token'ı üreten whitelisted uç (headless provider sözleşmesi)
- Tenant/site kimliğini sunucuda kilitleyen parametreler (frappe.local.site); istemciden gelen tenant değerinin yok sayılması
- Embedding secret'ının site config/secret store'da saklanması, rotasyonu ve süre sınırı
- Metabase veri kaynağı yalıtımı: tenant başına salt-okur DB kullanıcısı veya görünüm
- Rapor/dashboard ile Frappe rol/izin eşlemesi (hangi rol hangi Metabase kaynağını görür)
- React/AntDesign istemcisinde iframe/SDK tüketicisi ve frame-ancestors/CSP yapılandırması
- Parametre kurcalamayla başka tenant'ı sorgulama senaryosu için regresyon testi

Nasıl tamamlanır: Sıra şöyle olmalı:

1. bi-embedding--contract içinde gömme türünü ve Metabase lisansını kullanıcıyla kesinleştirin; önerilen başlangıç statik/imzalı gömmedir.
2. Metot sırasıyla:
   - Frappe rol/izin kontrolü yapar; Report.is_permitted ve frappe.has_permission desenini yeniden kullanır.
   - Secret'ı yalnızca frappe.conf'tan okur.
   - Tenant parametresini sunucuda frappe.local.site değerine kilitler.
   - Kısa exp süreli HS256 JWT imzalar; suite/meet/api/meeting.py desenini izler.
3. Kodu yazmadan önce iki RED test yazın: istemciden gelen tenant/params değerinin yok sayıldığını ve yetkisiz kullanıcının PermissionError aldığını kanıtlasınlar. Sonra GREEN'e geçin.
4. Ardından React/AntD tüketicisini ve CSP frame-ancestors ayarını ekleyin.
5. Son olarak Metabase tarafında tenant başına salt-okur DB kullanıcısını tanımlayın. Bu altyapı işi Hüseyin Cengiz'indir. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Kaynak dayanakları: `frappe/frappe/desk/query_report.py:49`; `frappe/frappe/desk/query_report.py:301`; `frappe/frappe/desk/query_report.py:1194`; `frappe/frappe/core/doctype/report/report.py:190`; `suite/suite/meet/api/meeting.py:84`; `frappe/frappe/website/page_renderers/web_form.py:22`.

Rehber: [bi-embedding](./frappe-roadmap-contracts/bi-embedding.json). Mevcut birincil görev: `bi-embedding--implementation`.

### reports-4 — Filtre, tarih aralığı, kaydedilmiş rapor ve zamanlanmış gönderim.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta filtreli/izinli liste ve sayım uçları var. Arka plan iş kuyruğu ve PDF üretim primitifleri de görülüyor. Ancak talimatın kaynağı version-15 Auto Email Report kodu, oysa yerel kurulum v17-dev; sürüm eşlemesi yok. Auto Email Report, Report DocType ve kaydedilmiş Report Builder ayarları excerpt içinde görülmedi. 'Aynı kapsamda gitsin' ifadesi belirsiz: rapor sahibinin izinleri mi, alıcının izinleri mi geçerli olacak?

Eksik:

- Auto Email Report kaynağı v17-dev yerel koduna eşlenmemiş (talimat version-15'i referans alıyor).
- Kaydedilmiş raporun headless CRUD sözleşmesi yok: Report DocType, JSON filtre biçimi, göreli tarih (Timespan) saklama.
- Zamanlanmış gönderimde izin bağlamı (sahip mi, alıcı mı) ve harici alıcı kısıtı tanımlı değil.
- Teslim biçimi (PDF/CSV/XLSX), boyut ve hız sınırları tanımlı değil.

Nasıl tamamlanır: v17-dev yerel kaynağında Auto Email Report ve Report DocType kodunu okuyup eşleyin. 'Aynı kapsam' ifadesini sahip/alıcı izin kuralı olarak netleştirin. Ardından kaydedilmiş tarih filtresinin yeniden açılmasını tek kabul senaryosu olarak tanımlayın.

Kaynak dayanakları: `frappe/frappe/client.py:29`; `frappe/frappe/api/v2.py:193`; `frappe/frappe/utils/print_format.py:113`; `frappe/frappe/utils/print_utils.py:54`.

Rehber: [native-report](./frappe-roadmap-contracts/native-report.json). Mevcut birincil görev: `native-report--implementation`.

### reports-5 — Kiracı/kayıt/alan yetkisiyle raporlama ve dışa aktarma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü somut: aynı rapor/export yetkisiz satır ve alan göstermemeli, SQL ve API yolları ayrı doğrulanmalı. Kaynakta bunun yapı taşları var: rol hakları arasında report/export bulunuyor, doküman okumada alan seviyesinde izin uygulanıyor, client.get_value DocType iznini kontrol ediyor. Ancak Query/Script Report ve export kod yolları bu kesitte yer almıyor; ham SQL raporlarında kayıt/alan izninin uygulanıp uygulanmadığı kaynakla doğrulanmadı.

Eksik:

- Kiracı modeli tanımlı değil: site başına kiracı mı, alan/User Permission ile mi? 'Kiracı yetkisi' bu tanım olmadan test edilemez.
- Rapor türü başına izin matrisi yok (Report Builder, Query Report, Script Report, REST get_list/get_count, export).
- v17 dev sürümünde reportview export ve query_report yürütme yolları kaynakta eşlenmedi; dokümandaki v16 davranışı varsayılmış.
- Data Masking deneysel olarak işaretli; v17'de kullanılıp kullanılmayacağına dair karar yok.
- Headless (React/TanStack Query) istemcinin hangi uç noktaları kullanacağına ve ignore_permissions içeren yardımcıların dışarı açılmayacağına dair açık bir sınır yazılmamış.

Nasıl tamamlanır: Mevcut native-report--implementation görevine üç şey eklenmeli: (1) kiracı modeli kararı, (2) rapor türü × uç nokta izin matrisi, (3) frappe/desk/query_report.py ve reportview export yollarının v17 kaynağında satır bazında eşlenmesi. Ham SQL kullanan raporlar için sunucu tarafında zorunlu kapsam filtresi kuralı yazılmalı. Yeni görev açılmamalı.

Kaynak dayanakları: `frappe/frappe/permissions.py:27`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/client.py:134`; `frappe/frappe/api/v1.py:35`.

Rehber: [native-report](./frappe-roadmap-contracts/native-report.json). Mevcut birincil görev: `native-report--implementation`.

### reports-6 — Kaynak modüllerden gelen olaylarla güncellenen ayrı okuma modelleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: replay sonrası okuma modeli kaynak toplamıyla eşleşmeli, aynı olayın iki kez gelmesi sonucu bozmamalı. Kaynakta yalnızca genel yapı taşları görülüyor: frappe.enqueue arka plan işleri ve duckdb bağımlılığı. İncelenen kesitlerde olay kaynağı, projeksiyon, replay veya tazelik takibi yok. Event Streaming'in v17'deki destek durumu kaynakla doğrulanmadı.

Eksik:

- Olay kaynağı sözleşmesi yok: doc_events hook'ları mı, transactional outbox mı? Commit sonrası yayın ve rollback durumu tanımlı değil.
- Tekrarlanan olayları ayıklayacak kimlik/anahtar (dedup) ve olay sıralama kuralı yok.
- Okuma modelinin nerede saklanacağı belirsiz (ayrı DocType, ayrı tablo veya duckdb); duckdb bağımlılığının ne için kullanıldığı doğrulanmadı.
- Kiracı izolasyonu ve okuma modelinin izinleri (reports-5 ile bağlantısı) tanımlı değil.
- Replay/yeniden kurma komutu, tazelik (lag) ölçümü ve şema değişikliğinde yeniden kurma politikası yok.

Nasıl tamamlanır: reporting-read-model--implementation görevine şunlar yazılmalı: olay kaynağı kararı (doc_events + outbox), tekrar ayıklama anahtarı, depolama hedefi, replay yöntemi ve okuma modeli izinlerinin reports-5 matrisine bağlanması. v17 kaynağında Event Streaming'in varlığı ve kapsamı ayrıca kontrol edilmeli. Kapsamı koşullu kalmalı; yalnız seçilen bir karar raporu için başlanmalı.

Kaynak dayanakları: `frappe/frappe/utils/print_format.py:113`; `frappe/pyproject.toml:20`.

Rehber: [reporting-read-model](./frappe-roadmap-contracts/reporting-read-model.json). Mevcut birincil görev: `reporting-read-model--implementation`.

### reports-7 — Metrik tanımı, veri güncelliği ve hesaplama tutarlılığı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de somut yapı taşları var. (1) Number Card kayıtlı bir tanımdır (function, aggregate_function_based_on, document_type, filtreler, stats_time_interval). Değerini tek bir sunucu fonksiyonu hesaplar: number_card.get_result, frappe.get_list üzerinden yetkiye göre filtrelenmiş SQL aggregate çalıştırır. Önceki dönem karşılaştırması da aynı fonksiyonu to_date ile kullanır. (2) Dashboard Chart da kayıtlı bir tanımdır ve değerini dashboard_chart.get hesaplar. @cache_source sonucu Redis'te chart-data:{chart_name} anahtarıyla saklar; refresh=1 verilince yeniden hesaplar ve last_synced_on alanını günceller. Masaüstü chart_widget bunu 'Last synced {0}' alt başlığı olarak gösterir. (3) Dashboard, grafik ve kartları Dashboard Chart Link ve Number Card Link alt tablolarıyla referans olarak bağlar. Aynı kart veya grafik iki panoya eklenirse tanım ortak kalır ve hesaplamayı aynı sunucu fonksiyonu yapar. ikisinde de metrik veya tazelik sözleşmesi yok. planlanan Frappe adaptörü'daki 'stale' yalnız base_revision kilidiyle ilgili. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Sürümlü ve sahibi belli ortak bir metrik sözleşmesi yok: metrik kimliği, formül sürümü, sahip, zaman dilimi, kaynak okuma modeli ve hesaplama sürümü tanımlı değil.
- Number Card ile Dashboard Chart aynı kavram için iki ayrı ve birbirinden bağımsız tanım üretebiliyor. İki panoda aynı metriğin tanımının ve değerinin eşleştiğini garanti eden ya da doğrulayan bir mekanizma yok.
- Tazelik eşiği ve geciken veri uyarısı yok: last_synced_on yalnız bilgi olarak gösteriliyor; eşik, uyarı durumu veya bildirim bulunmuyor.
- Number Card'da tazelik alanı hiç yok; Redis önbelleği yalnız grafiklerde var.
- Okuma modeli gecikmesi (reports-6) ile bir entegrasyon kurulmamış.
- Headless/React (Ant Design) tüketicisi için metrik ve tazelik sağlayıcı sözleşmesi yok. Suite planlanan Frappe adaptörü'da bu kapsamda bir endpoint bulunmuyor.
- Çalışma zamanı kabulü (functionalAcceptance) not_run durumunda.

Nasıl tamamlanır: Mevcut görev eşlemesi (native-report--implementation) ve bağımlılıklar korunur. Önerilen sıra: (1) native-report--contract içinde metrik sözleşmesini tanımla: metric_id, sürüm, sahip, kaynak DocType, filtre, zaman dilimi ve freshness_threshold. Bu sözleşmeyi Number Card ve Dashboard Chart kayıtlarına referansla eşle, yeni bir hesaplama motoru yazma. reports-6'yı tazelik kaynağı olarak açıkça bağımlılık listesine ekle. (2) Tek ve dar bir davranış uygula: bir metriğin değerini number_card.get_result veya dashboard_chart.get üzerinden tek noktadan dönen bir headless sağlayıcı okuma ucu yaz. Bu uç değeri, tanım sürümünü ve last_synced_on/computed_at alanlarını döndürsün ve eşik aşılınca stale=true işaretlesin. (3) RED/GREEN regresyon testi: aynı metric_id'yi kullanan iki pano tüketimi aynı tanımı ve değeri döndürmeli; eşiği aşan last_synced_on uyarı alanı üretmeli. (4) Bundan sonra React/AntD pano yüzeyinde uyarıyı göster. Suite'in Vue arayüzüne dokunma.

Kaynak dayanakları: `frappe/frappe/desk/doctype/number_card/number_card.py:127`; `frappe/frappe/desk/doctype/number_card/number_card.py:159`; `frappe/frappe/utils/dashboard.py:25`; `frappe/frappe/utils/dashboard.py:73`; `frappe/frappe/public/js/frappe/widgets/chart_widget.js:960`; `frappe/frappe/desk/doctype/number_card_link/number_card_link.json:16`.

Rehber: [native-report](./frappe-roadmap-contracts/native-report.json). Mevcut birincil görev: `native-report--implementation`.

### reports-8 — SaaS iş metrikleri: MRR, ARR, müşteri/gelir kaybı ve LTV; tanım, dönem ve kaynak uzlaştırması.

Kaynak durumu: **KURULU DEĞİL — KARAR GEREKLİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güçlü: örnek abonelik kümesiyle eşleşme, LTV varsayımlarının görünür olması, iade/kur/gecikmiş olay uzlaştırması. Ancak bu metriklerin hesaplanacağı abonelik/fatura kaynağı yerelde yok. Kurulu uygulamalar yalnızca frappe ve suite; Suite açıklamasında faturalama/abonelik bulunmuyor, ERPNext kurulu değil. Frappe rapor altyapısı hesaplama yapabilir, fakat veri kaynağı tanımsız.

Eksik:

- Gerçek veri kaynağı kararı yok: Stripe/sağlayıcı analitiği mi, ürüne ait abonelik DocType'ı mı? ERPNext Subscription yerelde kullanılamaz.
- MRR/ARR/churn/LTV formülleri; deneme, indirim, iade, kur dönüşüm anı ve dönem sınırı kuralları yazılmamış.
- reports-7 metrik sözleşmesine ve reports-6 okuma modeline bağımlılık açıkça belirtilmemiş.
- Sağlayıcı webhook'larının gecikmeli veya tekrar gelmesi durumunda uzlaştırma kuralı yok.

Nasıl tamamlanır: business-metric--implementation görevi önce bir kaynak kararı almalı (sağlayıcı veya ürüne ait abonelik modeli). Ardından reports-7 sözleşme biçiminde 4 metrik için formül tablosu ve küçük bir örnek abonelik veri seti tanımlanmalı. Bu adım yalnız tekrarlayan gelir modeli seçilirse yapılmalı.

Kaynak dayanakları: `suite/pyproject.toml:6`; `suite/suite/hooks.py:6`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `business-metric--implementation`.

### reports-9 — Yazdırma ve belge çıktısı ailesi; sürümlü şablon, yetkili önizleme, PDF/indirme ve toplu belge üretimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü ayrıntılı. Kaynakta güçlü yapı taşları var: printview baskı izni kontrolü ve access log, beta/jinja renderer ayrımı, download_pdf, bulk_actions yetkisi, adet limiti, hız sınırı ve arka plan işiyle toplu PDF, chrome/wkhtmltopdf/Typst seçimi. Eksikler: şablon sürümünün sabitlenmesi, süreli ve kiracıya bağlı indirme ile headless önizleme sözleşmesi kaynakta görülmüyor. printpreview.get_context kesitinde açık bir izin kontrolü görünmüyor.

Eksik:

- Şablon sürümü: Print Format'ın hangi sürümüyle önizleme ve nihai PDF'in üretileceğini sabitleyen bir mekanizma kaynakta yok.
- printpreview.py içinde get_doc sonrası validate_print çağrısı kesitte görünmüyor; headless önizleme bu yola bağlanmadan önce izin akışı v17 kaynağında doğrulanmalı.
- Toplu PDF bağlantısı task_id ile yayımlanıyor; üretilen dosyanın özel/süreli saklama ve silme politikası ile kiracı bağlaması görülmedi.
- Toplu üretimde her çağrı yeni uuid task_id üretiyor; aynı isteğin tekrarlanmasıyla çift üretimi önleyecek bir kural yok.
- Renderer bağımlılıkları (Chromium/wkhtmltopdf/Typst) container'da doğrulanmadı; varsayılan wkhtmltopdf bakımsız olarak işaretli.
- render_jinja_template yalnızca System Manager'a açık; headless şablon düzenleme bu sınırı korumalı, istemci script'leriyle aşılmamalı.

Nasıl tamamlanır: document-template--implementation görevine şunlar eklenmeli: printview/print_utils/print_format.py uç noktalarının headless eşlemesi, printpreview izin akışının v17'de doğrulanması, şablon sürümünü sabitleme kararı, toplu PDF dosyasının saklama süresi ve kiracı bağlaması, tekrarlanan isteğe karşı anahtar. Renderer seçimi (chrome önerisi) hedef ortamda bağımlılık kontrolüyle kesinleştirilmeli.

Kaynak dayanakları: `frappe/frappe/www/printview.py:92`; `frappe/frappe/www/printpreview.py:19`; `frappe/frappe/utils/print_format.py:99`; `frappe/frappe/utils/print_format.py:109`; `frappe/frappe/utils/print_format_generator.py:18`; `frappe/frappe/printing/doctype/print_settings/print_settings.py:31`.

Rehber: [document-template](./frappe-roadmap-contracts/document-template.json). Mevcut birincil görev: `document-template--implementation`.

### channels-1 — SaaS (Software as a Service — hizmet olarak yazılım) web uygulaması.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (ilk ziyaret, giriş, tenant seçimi, yetkili kayıt) somut. Frappe v17-dev kaynağında /api/resource CRUD, doc.check_permission ve CSRF enjeksiyonu var. Ancak React/TanStack web kabuğu kaynakta yok; Suite SPA ise Vue tabanlı. Bu nedenle yalnız backend primitifleri mevcut.

Eksik:

- API sürüm eşlemesi yok: v1 url_rules görülüyor, v2 rotaları görülen kesitte yok ve v2 iç uygulamanın değişebileceğini belirtiyor.
- Keycloak → Frappe oturum bağlama sözleşmesi tanımlı değil: OAuth2/OIDC token mı, sid çerezi mi, CSRF mi kullanılacağı belirsiz.
- 'Tenant' kavramının Frappe karşılığı tanımlı değil: site mi, User Permission mı, organizasyon mu?
- Headless SPA'nın Frappe'de nasıl servis edileceği belirsiz: Suite'teki website_route_rules deseni mi, ayrı origin/CORS mu?

Nasıl tamamlanır: web-build--implementation görevine şu kararları ekleyin: v1/v2 API sürümünü sabitleyin, Keycloak oturum taşıma ve CSRF yöntemini seçin, tenant'ın Frappe'deki karşılığını belirleyin. Kabul ölçütünü bu sözleşmeye bağlayın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:154`; `frappe/frappe/api/v1.py:83`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/website/page_renderers/base_template_page.py:22`; `suite/suite/hooks.py:44`.

Rehber: [web-build](./frappe-roadmap-contracts/web-build.json). Mevcut birincil görev: `web-build--implementation`.

### channels-2 — Mobile app (mobil uygulama), browser extension (tarayıcı eklentisi) ve desktop app (masaüstü uygulaması).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam 2026-10-11 kararıyla zorunlu hale geldi ve kabul ölçütü kanal bazında kurulum/güncelleme, login callback ve izin modelini istiyor. Ancak atıf yapılan O0–O3 planı pakette yok. Kaynakta bulunanlar: OAuth2 token/openid uçları, token tabanlı soket bağlantısı ve Suite'in service worker ile çevrimdışı kopya deseni. Tauri2 ve WXT/MV3 paketleri kaynakta yok.

Eksik:

- O0–O3 kanal planının içeriği ve görev eşlemesi sağlanmamış.
- Her kanal için redirect URI, PKCE ve deep-link callback sözleşmesi yok.
- Çevrimdışı veri, çakışma ve senkronizasyon sözleşmesi yok; Suite offlineCopy Vue'ya özgü ve salt medya önbelleği.
- MV3 service worker yaşam döngüsü ve eklenti izin (host_permissions) sınırları tanımlı değil.

Nasıl tamamlanır: client-channel-continuity--implementation görevine O0–O3 planını bağlayın. Kanal başına tek tablo hazırlayın: callback türü, token saklama yeri, güncelleme kanalı ve çevrimdışı kapsamı. İlk adımda yalnız web dışı login callback sözleşmesini yazın.

Kaynak dayanakları: `suite/suite/hooks.py:417`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:68`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:175`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:189`.

Rehber: [client-channel-continuity](./frappe-roadmap-contracts/client-channel-continuity.json). Mevcut birincil görev: `client-channel-continuity--implementation`.

### channels-3 — Kanal bazlı oturum, cihaz izinleri ve istemci sürüm uyumluluğu.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (destek dışı sürümün açıklanması, kanal bazlı token kapsamı ve logout) anlamlı. Ancak kapsam hâlâ 'conditional'; bu, channels-2'nin zorunlu kararıyla çelişiyor. Kaynakta logout uç noktası, token yenileme (updateAuth) ve Suite'in frappe >=16,<18 bağımlılık aralığı var. İstemci sürüm uyum mekanizması görülmedi.

Eksik:

- Kapsam kararı channels-2 ile tutarsız; web dışı kanallar artık seçili olduğundan 'required' olmalı.
- Minimum istemci sürümü bildirimi (header/uç nokta) ve reddetme davranışı tanımlı değil.
- Logout semantiği belirsiz: Frappe oturumu mu, Keycloak SSO oturumu mu, refresh token iptali mi?
- Cihaz izinleri (kamera, bildirim, dosya) için kanal bazında izin envanteri yok.

Nasıl tamamlanır: Kapsamı 'required' olarak güncelleyin; tarihsel kararı koruyun. auth-channel-bridge--implementation görevine şu sözleşmeyi ekleyin: Keycloak client/scope eşlemesi, logout zinciri ve sürüm uyumsuzluğu yanıtı. Uyumu Frappe 17.0.0-dev ve v1/v2 API seçimine sabitleyin.

Kaynak dayanakları: `suite/suite/hooks.py:422`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:166`; `suite/pyproject.toml:45`; `frappe/frappe/api/v2.py:8`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `auth-channel-bridge--implementation`.

### channels-4 — 320 pikselden başlayan uyarlanabilir ekranlar ve büyütmede yeniden akış.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta somut duyarlı yerleşim parçaları var, ancak hiçbiri seçilen React/Ant Design yüzeyine ait değil.
(1) Suite'in upstream Vue ön yüzü, sayfa yüklenirken 640px eşiğine göre ayrı mobil veya masaüstü bileşen ağacı seçiyor (useScreenSize.ts). Bu seçim bilerek pencere boyut değişimini izlemiyor. Boyutlandırmayı Tailwind max-sm: sınıfları canlı izliyor. Buradaki "layout" alan sırası parmak izinden ibaret; duyarlı yerleşim veya yeniden akış sözleşmesi değil. Backend'in UI yeniden akışı sağlamadığı tespiti doğrulandı. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Seçilen React + Ant Design/Pro + TanStack paneli kaynakta yok. suite/frontend/package.json yalnızca @tanstack/vue-virtual içeriyor; antd ve react yok.
- Desk (frappe/www/desk.html) ve Suite (frontend/index.html, suite/www/suite.html) viewport tanımında user-scalable=no var; Desk'te ayrıca maximum-scale=1.0 var. Bu, kaynak düzeyinde zoom ve %400 yeniden akış kabulüne karşı bir sinyal.
- 320/360/375/390 px ve yatay telefon için açık breakpoint veya kabul tanımı yok. Mevcut eşikler 640, 768 ve 991 px.
- Suite'in mobil/masaüstü ağaç seçimi yeniden boyutlandırma ve yön değişiminde güncellenmiyor; yatay telefon ve bölünmüş ekran uyarlaması yok.
- 14 CSS px minimum metin, tablo kapsayıcısı içinde kaydırma ve çevreleyen odak halkası yasağı için hedef panelde kaynak kapısı (gate) yok.
- Headless provider sözleşmesinde istemciye yerleşim, yoğunluk veya ana yolculuk ipucu yok.
- Runtime functionalAcceptance not_run; cihaz/tarayıcı doğrulaması kaynakla kanıtlanamaz.

Nasıl tamamlanır: Mevcut bağımlılıklar korunarak (ui-family-01--contract → ui-family-01--implementation → ui-family-01--implementation-mvp) ilerlenmeli:

1. React/Ant Design panelinde tek bir ana yolculuk tanımlanır: planlanan Frappe adaptörü.metadata ile liste → kayıt formu.
2. Önce bu yolculuk için 320 px ve %400 zoom'da başarısız (RED) bir Playwright testi yazılır. Test şunları kontrol eder: sayfa genelinde yatay taşma olmaması, tablonun kendi kapsayıcısında kaydırılması, hesaplanan metnin 14 px'ten küçük olmaması ve klavye odağının çevreleyen halka olmadan görünmesi.
3. Panelin index.html dosyasında user-scalable=no ve maximum-scale kullanılmadan, akışkan Ant Design token/Grid ile test GREEN yapılır.
4. 360/375/390, yatay telefon ve tablet N−1/N/N+1 olarak ui-family-09 ve ui-view-list görevlerine bırakılır.
   Suite Vue ve Desk viewport dosyalarına dokunulmaz.

Kaynak dayanakları: `suite/frontend/src/composables/useScreenSize.ts:16`; `suite/frontend/index.html:25`; `frappe/frappe/www/desk.html:15`; `frappe/frappe/public/scss/desk/list.scss:765`; `frappe/frappe/public/js/frappe/utils/utils.js:206`.

Rehber: [ui-family-01](./frappe-roadmap-contracts/ui-family-01.json). Mevcut birincil görev: `ui-family-01--implementation-mvp`.

### channels-5 — Erişilebilirlik: klavye, odak sırası, ekran okuyucu ve renk dışı durum işaretleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta erişilebilirlik ilkelleri var ama yalnız upstream Frappe Desk (jQuery/Espresso) ve Suite Vue/frappe-ui ön yüzlerinde. (1) Frappe Desk: Page sınıfında "ana içeriğe git" atlama bağlantısı var. Bu bağlantı ana bölgeye tabindex=-1 verip odağı oraya taşıyor (page.js:232-250). (2) frappe.ui.alert bileşeni role=alert kullanıyor. Her tema için ayrı Lucide ikonu ve metin başlığı veriyor, böylece durum yalnız renkle aktarılmıyor. Kapatma düğmesinde aria-label var (alert.js:23-67). (3) Toolbar ve arama düğmelerinde aria-label kullanılıyor, klavye ile odak taşınıyor (toolbar/search.js, about.js). (4) Suite Vue kabuğunda, örneğin SuiteCommandPalette.vue içinde, aria-label, aria-expanded, role=button+tabindex=0 ve Enter/Space ile klavye etkinleştirmesi var. (5) Frappe'de Playwright testleri var; Suite'te e2e/meet testleri getByRole/toHaveAccessibleName kullanıyor. Bu testler yalnız okundu, çalıştırılmadı; davranış kanıtı sayılmaz. Bu beklenen bir durum, çünkü konu ön yüz katmanına ait. Runtime functionalAcceptance: not_run. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Seçilen headless React/Ant Design/Pro/X + TanStack ön yüzünde hiçbir erişilebilirlik uygulaması yok. Desk ve Suite Vue kodu bu yığında yeniden kullanılamaz, yalnız örüntü olarak okunabilir.
- Tab/Shift+Tab ve odak sırası sözleşmesi yok; TanStack route geçişinde odağın nereye taşınacağı ve sayfa başlığı/landmark kuralı tanımsız.
- Asenkron durumlar (kaydedildi, hata, senkron) için aria-live/role=status sözleşmesi yok. Frappe alert yalnız Desk'te role=alert kullanıyor.
- Renk dışı durum için ikon+metin semantik tokenları ve erişilebilir ad kuralları headless kabukta yok.
- Frappe'nin odak tokenı (--focus-default: 0 0 0 2px box-shadow, buttons.scss :focus-visible) çevreleyen bir odak halkası çiziyor. Bu, kalıcı odak politikasıyla çelişiyor; örnek alınmamalı. Ant Design'ın varsayılan odak stilinin token kaynağında düzeltilmesi de tanımsız.
- axe/Playwright ile Chromium/Firefox/WebKit klavye yolculuğu regresyon testi yok.
- WCAG 2.2 AA hedefi ve ölçülebilir eşikler kabul metninde açık değil.

Nasıl tamamlanır: En küçük adım: ui-family-01--contract kabul metnine şunlar eklenir: WCAG 2.2 AA hedefi, çevrelemeyen tek odak göstergesi tokenı, route değişiminde odağın h1/main öğesine taşınması, renk dışı durum için ikon+metin kuralı ve role=status/alert canlı bölge sözleşmesi. Ardından ui-family-01--implementation-mvp içinde tek bir React/AntD kabuk dilimi yapılır: atlama bağlantısı, main landmark, TanStack route sonrası odak yönetimi ve tek durum bildirimi bileşeni. Önce bu dilim için klavye yolculuğu (Tab/Shift+Tab, Enter, Escape) ve axe kontrolü içeren tek bir Playwright senaryosu RED olarak yazılır, sonra uygulama GREEN yapılır. Sıra: contract → implementation-mvp → ui-family-09--implementation. Frappe Desk skip-link ve alert örüntüsü yalnız referans olarak kullanılır; kod kopyalanmaz.

Kaynak dayanakları: `frappe/frappe/public/js/frappe/ui/page.js:235`; `frappe/frappe/public/js/frappe/ui/page.js:241`; `frappe/frappe/public/js/frappe/ui/components/alert.js:43`; `frappe/frappe/public/js/frappe/ui/components/alert.js:26`; `frappe/frappe/public/css/espresso/effects.css:27`; `suite/frontend/src/shell/SuiteCommandPalette.vue:75`.

Rehber: [ui-family-01](./frappe-roadmap-contracts/ui-family-01.json). Mevcut birincil görev: `ui-family-01--implementation-mvp`.

### channels-6 — Hareket azaltma, kontrast, metin büyütme ve erişilebilir hata sunumu.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kapsam doğru biçimde UI sorumluluğu olarak tanımlanmış, ancak kabul metni ('gerçek etkileşimlerle kontrol edilmeli') eşik vermiyor. Frappe sunucu doğrulama hatalarını exception/mesaj olarak üretiyor. Bu mesajların alan düzeyinde erişilebilir hataya dönüştürülme sözleşmesi tanımlı değil. Bazı mesajlar HTML de içerebiliyor.

Eksik:

- Kontrast eşiği (4.5:1 / 3:1), 14 CSS px minimum, %200 zoom ve 320 px reflow ölçütleri kabulde yok.
- Reduced motion için merkezi hareket tokenlarına (easeInOut Cubic) ve reduced-motion istisnasına referans yok.
- Frappe hata yanıtının (exc_type, _server_messages, PermissionError) form alanına ve aria-describedby/odak hedefine eşlenme sözleşmesi tanımsız.
- HTML içeren sunucu mesajlarının güvenli metne çevrilmesi veya sanitize kuralı yok.

Nasıl tamamlanır: Kabul metnine sayısal eşikleri ve hareket tokenı referansını ekleyin. Ardından Frappe hata yanıtını alan hatası ve özet hata odağına eşleyen tek bir istemci adaptör sözleşmesi tanımlayın: sunucu doğrulaması korunur, UI yalnızca sunar.

Kaynak dayanakları: `frappe/frappe/client.py:177`; `frappe/frappe/website/doctype/website_theme/website_theme.py:137`.

Rehber: [ui-family-01](./frappe-roadmap-contracts/ui-family-01.json). Mevcut birincil görev: `ui-family-01--implementation-mvp`.

### channels-7 — Çevrimdışı çalışma, yerel işlem kuyruğu ve yeniden bağlanınca uzlaştırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (tek kez uygulama, iki cihaz çakışmasında çözüm sunma) anlamlı. Ancak yerel REST create/update yolları idempotency anahtarı veya sürüm koşulu almıyor. Suite Slides yalnız salt okunur bir çevrimdışı önbellek defteri sağlıyor. Meet'teki reconnect bir taşıma yeniden bağlanması; veri uzlaştırması değil. Referans verilen O0–O3 planı pakette yok.

Eksik:

- Operasyon kimliği/idempotency anahtarının sunucuda nerede saklanacağı ve tekrar gönderimde nasıl reddedileceği tanımsız; create_doc yeniden denendiğinde çift kayıt üretebilir.
- Çakışma tespitinin dayanağı (modified zaman damgası veya sürüm alanı) ve yerel v17 Document.save davranışı doğrulanmamış; ilgili kaynak excerpt'te yok.
- Çevrimdışıyken Keycloak token süresi dolması, izin iptali ve tenant değişimi sonrası kuyruk politikası yok.
- docstatus geçişlerinin (submit/cancel) ve silmelerin çevrimdışı kuyruğa alınıp alınmayacağı kararı yok.
- Tauri ile PWA yerel depolama ayrımı ve yerel verinin şifrelenmesi/silinmesi sözleşmesi yok.
- Toplu ekleme sınırı (200) kuyruk boşaltma stratejisine yansıtılmamış.

Nasıl tamamlanır: client-local-outbox için önce O0–O3 planını kaynakla eşleyin. Ardından yerel v17 frappe/model/document.py içinde modified/check_if_latest davranışını okuyun. Son olarak tek bir whitelisted, izin kontrollü, idempotent senkron uç noktası sözleşmesi yazın (op id, beklenen modified, sonuç); ignore_permissions kullanılmamalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:60`; `frappe/frappe/client.py:246`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:23`; `suite/frontend/src/apps/meet/utils/media/SignalChannel.ts:39`.

Rehber: [client-local-outbox](./frappe-roadmap-contracts/client-local-outbox.json). Mevcut birincil görev: `client-local-outbox--implementation`.

### channels-8 — Deep link (uygulama içindeki belirli kayda doğrudan bağlantı) ve kanal devamlılığı.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kayıt okumada sunucu tarafı izin kontrolü yerel kaynakta mevcut. Suite, SPA deep link rotalarını hook ile eşliyor; Frappe yönlendirmeleri sorgu parametresini taşıyabiliyor. Ancak oturum sonrası güvenli dönüş, tenant bağlama ve uygulama dışı kanal (Tauri/WXT) bağlantı şeması tanımlı değil. Kapsam koşullu; tetikleyici ürün kararı da belirtilmemiş.

Eksik:

- Dönüş hedefinin yalnız göreli veya izinli listedeki yollarla sınırlandırılması (open redirect koruması) ve OIDC state içinde taşınması tanımsız.
- 'Başka tenant' kavramının Frappe site ve Keycloak organizasyonuyla eşlemesi belirsiz; yetkisiz kayıtta 403 mü 404 mü döneceği (varlık sızıntısı) belirtilmemiş.
- TanStack Router URL şeması ile DocType/name kodlamasının (path:name, özel karakterler) eşleşmesi yok.
- Tauri custom scheme/universal link ve WXT eklenti bağlantı davranışı ile koşullu kapsamın açılma ölçütü tanımsız.

Nasıl tamamlanır: Koşullu kapsamı açacak ürün kararını kaydedin. Web için tek bir sözleşme yazın: kanonik kayıt URL'si, OIDC state'te göreli returnTo, girişten sonra read_doc yetki kontrolü ve tenant uyuşmazlığında kayıt varlığını açığa çıkarmayan yanıt. Tauri/WXT'yi ayrı adım olarak bırakın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:83`; `suite/suite/hooks.py:45`; `frappe/frappe/website/path_resolver.py:133`; `suite/frontend/src/apps/calendar/utils/mobileView.ts:26`.

Rehber: [client-channel-continuity](./frappe-roadmap-contracts/client-channel-continuity.json). Mevcut birincil görev: `client-channel-continuity--implementation`.

### channels-9 — Düşük veri tüketimi modu; kullanıcı tercihiyle yenileme, medya ve ağır istekleri azaltma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni güçlü: bayt ölçümü, tazelik açıklaması, elle yenileme ve Save-Data olmadan çalışma. Yerel REST katmanında alan seçimi, varsayılan 20 kayıtlık sayfalama ve sayım önbelleği parametresi var. Ancak bunlar bir veri bütçesi politikası değil. Kapsam koşullu ve tetikleyici yolculuk henüz belirlenmemiş.

Eksik:

- Ölçüm koşulları (ağ profili, yolculuk, bütçe değeri) ve tek bütçe seti tanımlı değil.
- 'Ağır istek' sınıflandırması yok: realtime socket, polling, küçük resim/medya, expand_links.
- TanStack Query yenileme davranışının (staleTime, refetchOnWindowFocus, refetchInterval) mod ile nasıl değişeceği tanımsız.
- Tercihin nerede saklanacağı (cihaz yerel mi, kullanıcı ayarı mı) ve kanallar arası taşınıp taşınmayacağı belirsiz.

Nasıl tamamlanır: Bayt ölçümüyle doğrulanmış tek bir gerçek yolculuk seçip koşullu kapsamı netleştirin. Ardından fields/limit_page_length kullanımını ve Query yenileme politikasını mod bayrağına bağlayan kısa bir istemci politikası yazın; yeni sunucu uç noktası şart değildir.

Kaynak dayanakları: `frappe/frappe/api/v1.py:13`; `frappe/frappe/api/v1.py:22`; `frappe/frappe/client.py:82`; `suite/frontend/src/apps/slides/stores/offlineCopy.js:13`.

Rehber: [client-data-budget](./frappe-roadmap-contracts/client-data-budget.json). Mevcut birincil görev: `client-data-budget--implementation`.

### views-9 — Kaydedilmemiş değişiklik uyarısı, işlem onayı ve geri alınabilir işlemler.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı: taslak kaybı yok, iptal edilen onay yan etkisiz, undo yalnız desteklenen işlemde. Kaynakta yalnız kaydetme ve silme primitifleri var. update_doc doğrudan doc.save() çağırıyor, delete_doc ise kalıcı silme yapıp 202 dönüyor. Bu alıntılarda undo, değişmiş/kaydedilmemiş durum izleme veya iki aşamalı onay sözleşmesi yok.

Eksik:

- 'Desteklenen işlem' listesi tanımlı değil; hangi işlemin hangi native mekanizmayla geri alınacağı (ters update, Deleted Document restore, amend/cancel) yazılmamış. Restore kaynağı bu alıntılarda görünmüyor.
- Gezinmede taslak korumanın depolama sözleşmesi views-12 ile paylaşılmamış (web/Tauri/WXT için ayrı saklama sınırları).
- Onayın sunucu tarafı yok: onay yalnız istemcide; v1/v2 DELETE ve run_method idempotency veya ön-doğrulama sağlamıyor.
- Frappe v17-dev sürüm eşlemesi ve v1/v2 hedef API seçimi yok.
- ui-family-07/16/20 görevleri arasında hangi kısmın MVP'ye girdiği belirsiz.

Nasıl tamamlanır: ui-family-07--implementation-mvp tanımına üç kısa sözleşme ekle: (1) undo sunulacak işlem listesi ve her birinin native ters işlemi; desteklenmeyen işlemde yalnız onay gösterilecek. (2) Onay iptalinde hiçbir istek gönderilmeyecek kuralı. (3) Taslak koruması için views-12 durum modeline referans. Sürüm olarak v17-dev ve /api/v2 hedefini yaz.

Kaynak dayanakları: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v1.py:72`; `frappe/frappe/api/v1.py:73`.

Rehber: [ui-family-07](./frappe-roadmap-contracts/ui-family-07.json). Mevcut birincil görev: `ui-family-07--implementation-mvp`.

### views-10 — Liste içinde satır/hücre düzenleme; alan doğrulama, kaydetme, iptal ve çakışma geri bildirimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü güçlü: klavye, Enter/Escape, çakışma ve sunucu reddi tanımlı. Kaynakta alan bazlı yazma primitifleri var: set_value ve update_doc. update_doc kaydı for_update ile kilitleyerek alıyor. Meta tarafında permlevel erişimi ve frappe/ui içinde permDenied/readOnly bilgisi var. Ancak frappe/ui Vue tabanlı ve seçilen React/Ant Design yığınına doğrudan aktarılamaz. Grid kararı da hâlâ açık.

Eksik:

- Çakışma tokenı sözleşmesi yok: istemcinin modified/sürüm alanını yazma isteğiyle göndermesi ve sunucunun bunu nasıl reddedeceği. Document.save içindeki sürüm kontrolü bu alıntılarda görünmüyor.
- Inline düzenlenebilir alan türleri tanımsız: Link, Table, child row, read_only_depends_on ve permlevel.
- Child table satırı düzenlenince parent kaydının kaydedilme davranışı (update_doc satır 64-65) UX sözleşmesine bağlanmamış.
- Grid bileşeni seçilmediği için klavye ve hücre odak sözleşmesinin sahibi belli değil.
- Sunucu doğrulama hatasının hangi alana eşleneceğini belirleyen yanıt sözleşmesi yok.

Nasıl tamamlanır: ui-family-09--implementation-post-mvp tanımına şunları ekle: inline düzenlenebilir alan türü listesi; yazma için /api/v2 ve set_value seçimi; modified tabanlı çakışma reddi ve kullanıcının girdiği değeri koruyan yeniden deneme akışı. Grid seçimini ui-view-table--implementation bağımlılığı olarak işaretle.

Kaynak dayanakları: `frappe/frappe/client.py:183`; `frappe/frappe/api/v1.py:56`; `frappe/frappe/model/meta.py:746`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:173`; `frappe/ui/src/components/ListView/useListView.ts:1`.

Rehber: [ui-family-09](./frappe-roadmap-contracts/ui-family-09.json). Mevcut birincil görev: `ui-family-09--implementation-post-mvp`.

### views-11 — Canlı bağlantı ve sunucu erişimi göstergesi; çevrimdışı, erişilemiyor ve yeniden bağlanıyor durumları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de (v17-dev, adf1fd0c) şu temel parçalar var: (1) Konuk erişimine açık, whitelist'li frappe.ping() 'pong' döndürüyor. v1'de /api/method/frappe.ping üzerinden, v2'de /method/ping kuralıyla erişiliyor; hafif bir sunucu erişim yoklaması olarak kullanılabilir. (2) Desk'te frappe.is_online() yalnız navigator.onLine'a bakıyor ve developer_mode'da her zaman true dönüyor. window online/offline olayları 'connection-status' kimlikli tek bir toast'ı güncelliyor; frappe.call çevrimdışıyken aynı toast'ı gösteriyor. (3) frappe.request.call içinde 401 ve 403 yanıtları önce handle_session_expiry'ye gidiyor; yani oturum süresinin dolması bağlantı arızasından ayrı ele alınıyor. 403 izin mesajı veriyor; 502, 504 ve 508 için ayrı kullanıcı mesajları var. (4) socket.io istemcisi reconnectionAttempts:3 ile kuruluyor; connect_error yalnız console.error'a yazılıyor. Sunucuda realtime 'ping' işleyicisi var. frappe/ui socket.ts yeniden bağlanınca doküman odalarına tekrar abone oluyor. Mutasyonları otomatik yeniden göndermeye dair bir kod görülmedi. Suite tarafında (Vue arayüzü, headless değil) şunlar var: Writer'da isOffline, Slides'ta online/offline işleyicileri ve navigator.onLine kontrolleri, Meet'te ParticipantConnection ve tanı raporu. Bunlar uygulamaya özgü ve dağınık. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Çevrimdışı, sunucuya erişilemiyor ve yeniden bağlanıyor durumlarını ayıran tek bir durum modeli yok.
- İnternet açıkken sunucuya erişilemiyor durumunu sınıflayan mantık yok: request.js .fail yolu yalnız statusCode tablosuna bakıyor; status 0, ağ hatası veya ping başarısızlığı için işleyici yok.
- Son başarılı temas zaman damgası yok.
- Yeniden bağlanma ve backoff durumu kullanıcıya gösterilmiyor: socket.io connect_error yalnız console'a yazılıyor ve ping yoklaması zamanlanmıyor.
- frappe.is_online developer_mode'da her zaman true dönüyor; navigator.onLine sunucu erişimini kanıtlamıyor.
- Ekran okuyucuya odağı çalmadan duyuru (aria-live/status) ve renk dışı gösterge, bu alanda okunan kodda doğrulanmadı.
- Headless React/Ant Design için Frappe provider bağlantı durumu sözleşmesi yok (planlanan Frappe adaptörü'da da yok).
- Keycloak token yenileme ile bağlantı hatasını ayıran kural yok; Tauri, PWA ve WXT MV3 farkları kaynakta ele alınmamış.

Nasıl tamamlanır: Sıra şöyle olmalı: (1) ui-family-06--contract içinde headless istemci için ConnectionState sözleşmesini tanımla. Durumlar: online, offline (navigator), unreachable (status 0, ağ veya zaman aşımı hatası ya da GET /api/v2/method/ping başarısızlığı), reconnecting (socket.io reconnect_attempt / ping backoff) ve lastSuccessAt. 401/403 auth/session durumuna gitsin, bağlantı durumuna değil. Upstream'deki frappe.ping ve handle_session_expiry ayrımı referans alınsın. (2) api-middleware--contract tarafında TanStack Query fetch katmanında yalnız gerçek istek sonuçlarından durum türeten saf bir sınıflandırıcı yaz. Önce birim testlerde RED, sonra GREEN kanıtı üret. Mutasyonların retry değeri 0 olsun ve otomatik yeniden gönderim olmasın. (3) Ardından ui-family-40--implementation-mvp içinde Ant Design göstergesini role=status/aria-live=polite, metin ve ikon ile bağla. Realtime soket sinyali ayrı bir karar olarak eklensin. Suite Vue koduna dokunulmasın; upstream Desk toast'ı değiştirilmesin.

Kaynak dayanakları: `frappe/frappe/__init__.py:1478`; `frappe/frappe/api/v2.py:623`; `frappe/frappe/public/js/frappe/dom.js:397`; `frappe/frappe/public/js/frappe/request.js:152`; `frappe/frappe/public/js/frappe/socketio_client.js:73`; `frappe/frappe/public/js/frappe/request.js:56`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-12 — Kaydetme durumu; değiştirildi, kaydediliyor, bu cihazda taslak, sunucuya kaydedildi ve kaydetme hatası.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü çok net: commit doğrulanmadan 'kaydedildi' gösterilmiyor, eski yanıt yeni değişikliği ezmiyor, durum mesajı kayıt sürümüyle eşleşiyor. Kaynakta yalnız sunucu kaydetme primitifleri var; update_doc kaydettiği belgeyi geri dönüyor. Yanıttaki sürüm alanına dayanan bir eşleştirme sözleşmesi yazılmamış. Yerel taslak tamamen frontend'in işi.

Eksik:

- Commit sonucunun kanıtı tanımlı değil: başarılı HTTP yanıtı ile dönen modified değerinin istek sürümüyle eşleşmesi. Request sonundaki commit davranışı bu alıntılarda görünmüyor.
- Yerel taslak deposu ve hata davranışı tanımsız: IndexedDB, Tauri store ve MV3 storage kotaları farklı.
- Durum makinesinin (değiştirildi, kaydediliyor, cihazda taslak, sunucuya kaydedildi, hata) views-9 ve views-10 ile ortak tek model olduğu yazılmamış.
- Yanıtları istek sürümüyle eşleyerek eski yanıtı atma kuralı TanStack Query mutasyon sözleşmesine bağlanmamış.

Nasıl tamamlanır: ui-family-06--implementation içinde yanıtı işlem kimliği ve yerel taslak nesliyle eşle; dönen modified değerini yeni sunucu sürümü olarak sakla. 'Kaydedildi' durumunu doğrulanacak commit/ack sözleşmesine bağla; istek temel sürümüyle yeni sürümü eşitleme. Eski yanıt yeni taslağı ezmesin. Yerel taslak deposu ui-family-40 içinde platforma göre seçilsin; views-9 ve views-10 bu modele bağlansın.

Kaynak dayanakları: `frappe/frappe/api/v1.py:61`; `frappe/frappe/api/v1.py:67`; `frappe/frappe/api/v2.py:204`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-13 — Sonucu belirsiz işlemi kimliğiyle sorgulama; doğrulanmadan tekrar göndermeme ve mükerrer etkiyi önleme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: tamamlandı/sürüyor/başarısız/bilinmiyor ayrımı, kör tekrar yasağı ve yetki koruması tanımlı. Kaynakta transaction ve satır kilidi (for_update) var. v2 create_doc istemcinin verdiği name değerini kabul ediyor; bu, insert için doğal bir idempotency anahtarı olabilir. Ancak v1/v2 insert ve insert_many istek kimliğini saklamıyor ve sonuç sorgulama ucu sağlamıyor.

Eksik:

- Kalıcı işlem kimliğinin nerede saklanacağı (yeni DocType mı, Frappe kaydı mı), saklama süresi ve tenant/kullanıcı kapsamı tanımlı değil.
- İstemci tarafından name verme (name_set) yaklaşımının yalnız insert için mi kullanılacağı belirtilmemiş. update, submit, run_method ve dış etkiler için idempotency kararı da yok.
- v1 /api/resource veya v17-dev /api/v2 hedefi seçilmemiş. Yanıt kaybında DuplicateEntry ve zaman aşımı sonuçlarının nasıl eşleneceği tanımlı değil.
- ui-provider-query görevindeki mutation retry politikasının (TanStack Query) 'bilinmiyor' durumunda tekrar yapmaması sözleşmeye bağlanmamış.

Nasıl tamamlanır: ui-family-06 kapsamında tek sayfalık bir operation-id sözleşmesi yazılmalı: hedef API (v2), anahtar kapsamı (tenant+user+op), durum makinesi ve sorgu ucunun izin kontrolü. İlk adım yalnız insert için: name_set ile doğal anahtar ve DuplicateEntry durumunda okuyarak doğrulama. Diğer mutasyonlarda sonuç 'bilinmiyor' olarak gösterilmeli.

Kaynak dayanakları: `frappe/frappe/api/v1.py:50`; `frappe/frappe/api/v1.py:56`; `frappe/frappe/api/v2.py:206`; `frappe/frappe/api/v2.py:207`; `frappe/frappe/client.py:245`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-14 — Kayıt ve ekran verisinin tazeliği; son başarılı güncelleme, eski veri uyarısı ve güvenli yenileme.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni güçlü: başarısız yenileme tazelik zamanını ilerletmiyor, taslak korunuyor, kritik eylemde sunucuda doğrulama yapılıyor. Kaynakta yalnız önbellek primitifleri görülüyor: sunucuda meta client_cache, frappe/ui tarafında oturum başına memoize edilen meta ve cached_timestamp parametresi. Kayıt verisi için 'son başarılı alınma' veya bayatlık sunumu yok. frappe/ui Vue tabanlı; seçilen React/TanStack yığınına doğrudan yeniden kullanılamaz.

Eksik:

- Tazelik eşikleri ve hedef sürüm talimatta açıkça 'seçilecek' olarak bırakılmış.
- Kritik eylemde sürüm doğrulaması için hangi alanın kullanılacağı (ör. modified) ve sunucunun çakışmayı hangi hatayla bildirdiği eşlenmemiş. Bu davranış excerpt'te görülmüyor.
- Meta önbelleği (memoize, client_cache) ile kayıt verisi tazeliğinin ayrı olacağı kaynak düzeyinde belirtilmemiş. Realtime sağlayıcı görevine ait kaynak excerpt'te yok.
- frappe/ui composable'ları referans olarak mı alınacak, yoksa React tarafında yeniden mi yazılacak, kararı yok.

Nasıl tamamlanır: ui-provider-query görevine üç alanlı bir tazelik modeli eklenmeli: kaynak güncellemesi (kayıt modified), son başarılı fetch zamanı (TanStack dataUpdatedAt) ve bağlantı durumu. Eşik değerleri ürün sahibiyle seçilmeli. Kritik eylem için sunucu çakışma hatası v17-dev kaynağında doğrulanmalı.

Kaynak dayanakları: `frappe/ui/src/composables/useDoctypeMeta.ts:47`; `frappe/ui/src/composables/useDoctypeMeta.ts:84`; `frappe/ui/src/composables/useDoctypeMeta.ts:1`; `frappe/frappe/model/meta.py:83`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-15 — Genel işlem etki önizlemesi; etkilenecek kayıt ve alanlar, kapsam ve onaydan önce değişiklik özeti.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul metni (sayı, alan, önce/sonra, yeniden doğrulama, iptalde yan etkisizlik, alan sızıntısı yok) yeterli. Kaynakta yalnız yardımcı primitifler var: permlevel tabanlı alan eleme, alan düzeyinde okuma izni ve v2 toplu işlemlerde async eşiği. Dry-run veya önizleme motoru görülmüyor.

Eksik:

- Önizleme ile uygulama arasındaki bağın (önizleme tokenı, kayıt sürümleri, izin anlık görüntüsü) sözleşmesi yok.
- v2 toplu işlem uçlarının ve async eşiğinin (varsayılan 20) önizleme sonrası uygulamada nasıl kullanılacağı eşlenmemiş.
- Önizlemedeki alan filtresinin get_high_permlevel_fields ve apply_fieldlevel_read_permissions ile yapılacağı açıkça yazılmamış.
- Dört post-MVP görev eşlenmiş, ancak sahip görev ile bağımlılık sırası belirtilmemiş.

Nasıl tamamlanır: ui-family-07 için minimal bir sunucu sözleşmesi yazılmalı: salt okunur önizleme ucu yalnız permlevel'e göre filtrelenmiş alanları dönsün; uygulama ucu kayıt sürümlerini yeniden doğrulasın ve uyuşmazlıkta reddetsin. Async eşiği ise mevcut v2 yapılandırmasından okunsun.

Kaynak dayanakları: `frappe/frappe/api/v2.py:31`; `frappe/frappe/api/v2.py:32`; `frappe/frappe/desk/reportview.py:180`; `frappe/frappe/api/v1.py:84`.

Rehber: [ui-family-07](./frappe-roadmap-contracts/ui-family-07.json). Mevcut birincil görev: `ui-family-07--implementation-post-mvp`.

### views-16 — Çözüm sunan hata mesajları; neden, ilgili alan, uygulanabilir sonraki adım ve güvenli hata kimliği.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni hata sınıflarını, alan ilişkisini, girilen verinin korunmasını ve secret içermeyen hata kimliğini kapsıyor. Kaynakta hata sınıfı olarak exception türleri var (frappe.PermissionError), ancak mesajlar HTML biçimli ve kullanıcı adını içeriyor. Yapılandırılmış alan referansı ve hata kimliği excerpt'te görülmüyor. Suite Meet problem raporu URL ve konsol loglarını dış adrese mailto ile taşıyor; bu, güvenli hata kimliği hedefine ters bir örnek.

Eksik:

- v17-dev hata zarfının (exc_type, _server_messages, HTTP kodu) ürün hata sınıflarına eşlemesi tanımlı değil.
- Alanla ilişkilendirme için sunucunun fieldname döndürüp döndürmediği doğrulanmamış. frappe.bold gibi HTML içeren mesajların sanitize edilmesi kuralı yok.
- Kota hatasının kaynağı belirsiz.
- Güvenli hata kimliğinin kaynağı (request id veya Error Log) belirsiz.
- Suite'teki problemReport desenini (URL, konsol logu, dış mailto) tekrar etmeme kuralı yazılmamış.

Nasıl tamamlanır: ui-family-06 altında bir hata eşleme tablosu hazırlanmalı: exc_type'tan sınıfa, sonraki adıma ve retry güvenliğine. HTML mesajlar düz metne çevrilmeli. Hata kimliği için Frappe tarafındaki kaynak v17-dev'de doğrulanmalı. Destek raporlarının URL ve log içermemesi kuralı eklenmeli.

Kaynak dayanakları: `frappe/frappe/permissions.py:153`; `frappe/frappe/desk/query_report.py:52`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:73`; `suite/frontend/src/apps/meet/utils/diagnostics/problemReport.ts:127`.

Rehber: [ui-family-06](./frappe-roadmap-contracts/ui-family-06.json). Mevcut birincil görev: `ui-family-06--implementation`.

### views-17 — Şablondan oluşturma ve kontrollü çoğaltma; kopyalanacak alanlar, ilişkiler ve yeni kayıt önizlemesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni yeni kimlik, durum/ödeme/secret taşınmaması, okunamayan alan sızıntısı ve sunucu doğrulaması gibi kritik noktaları kapsıyor. Kaynakta yalnız oluşturma primitifleri görülüyor: new_doc+insert, flags temizliği ve default/permlevel taşıyan meta eşlemesi. Talimat, Frappe'nin yerel kopyalama politikasını (no_copy alan özelliği, copy_doc) yeniden kullanmayı belirtmiyor. Bu primitifler excerpt'te yok; durumları bilinmiyor.

Eksik:

- Yerel no_copy/copy_doc davranışının v17-dev kaynağında doğrulanıp yeniden kullanılacağı yazılmamış. Kopyalama kuralının ayrı bir allowlist'te kopyalanma riski var.
- Şablonun nerede saklanacağı tanımlı değil (ayrı DocType mı, mevcut kayıttan mı).
- Child table ve Link ilişkilerinin kopyalanma kuralı eksik.
- Destekleyici görev yok. ERPNext/HRMS kurulu olmadığından ödeme/onay örnekleri yalnız Frappe ve Suite DocType'larına göre eşlenmeli.

Nasıl tamamlanır: ui-family-20 için önce v17-dev'de no_copy ve copy_doc kaynağı doğrulanmalı. Sunucu tarafında kopya taslağını yerel kurallarla üreten ve okuma iznine göre filtreleyen bir önizleme ucu tasarlanmalı. Kaydetme, standart insert doğrulamasından geçmeli.

Kaynak dayanakları: `frappe/frappe/api/v1.py:49`; `frappe/frappe/api/v1.py:57`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:163`; `frappe/ui/src/components/FormLayout/buildLayoutFromMeta.ts:173`.

Rehber: [ui-family-20](./frappe-roadmap-contracts/ui-family-20.json). Mevcut birincil görev: `ui-family-20--implementation-post-mvp`.

### observability-1 — Observability (gözlemlenebilirlik) ve kaynak takibi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü var, ancak hangi API/worker metriğinin hangi kaynağa bağlanacağı, metrik adı/etiket (site/tenant) sözleşmesi ve alarm yönlendirmesi tanımsız. Kaynakta Prometheus deseni yalnız Meet recorder servisinde görülüyor (prom-client Registry, recorder_* metrikleri, Grafana panosu). Frappe web/RQ worker için exporter bu alıntılarda görünmüyor. Talimat bu mevcut deseni yeniden kullanma sınırı olarak anmıyor.

Eksik:

- Frappe web ve RQ worker için metrik kaynağı (Monitor/Recorder mi, ayrı exporter mı) seçilmemiş; Frappe 17.0.0.dev0 için API eşlemesi yok
- Kiracı/site etiketinin kardinalite ve kişisel veri sınırı tanımsız
- 'Ölçüm kesintisi görünür olsun' için up/absent kuralı ve alarm sahibi (Hüseyin Cengiz) belirtilmemiş
- Mevcut recorder /metrics + metricsToken deseninin yeniden kullanılacağı yazılmamış

Nasıl tamamlanır: metrics-export--implementation görevine şu eklensin: recorder-server app.ts'deki prom-client + ayrı metrics token deseni referans alınarak Frappe web/worker için tek bir exporter kararı verilsin; site etiketi ve up==0 alarmı kabul ölçütüne yazılsın. Sorumlu: Hüseyin Cengiz.

Kaynak dayanakları: `suite/suite/meet/recorder-server/src/app.ts:6`; `suite/suite/meet/recorder-server/src/app.ts:169`; `suite/suite/meet/recorder-server/src/config.ts:85`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:16`.

Rehber: [metrics-export](./frappe-roadmap-contracts/metrics-export.json). Mevcut birincil görev: `metrics-export--implementation`.

### observability-2 — CPU (Central Processing Unit — merkezi işlem birimi), ağ ve SSD (Solid State Drive — katı hâl disk) ölçümleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü ölçülebilir (sunucu bazında CPU/ağ/disk serisi, kayıp hedef alarmı). Ancak exporter, saklama süresi, hedef envanteri ve eşikler 'seçilecek' olarak bırakılmış. Kaynakta yalnız uygulama düzeyinde yapı taşları var: recorder için boş disk koruması (DiskGuard) ve recorder hedefi için up paneli. Host CPU/ağ/SSD ölçümü Frappe/Suite kaynağının kapsamında değil.

Eksik:

- Host/container exporter ve saklama kararı yok
- Hedef envanteri (Hetzner/Debian Docker Engine host'ları) ve etiket şeması yok
- CPU/disk doluluk/IO eşikleri ve kayıp hedef alarmının süresi tanımsız
- DiskGuard minimumFreeBytes eşiğinin host disk alarmıyla ilişkisi tanımlanmamış

Nasıl tamamlanır: Hüseyin Cengiz host exporter'ını ve saklama süresini seçsin. Hedef listesi ile CPU/ağ/disk eşikleri metrics-export--implementation kabulüne eklensin. Recorder DiskGuard eşiği, disk alarmının alt sınırı olarak belgelensin.

Kaynak dayanakları: `suite/suite/meet/recorder-server/src/server.ts:16`; `suite/suite/meet/recorder-server/src/config.ts:20`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:117`.

Rehber: [metrics-export](./frappe-roadmap-contracts/metrics-export.json). Mevcut birincil görev: `metrics-export--implementation`.

### observability-3 — Logging (teknik kayıt üretimi), log manager (kayıt yönetimi) ve Sentry adaptörü.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta yapılandırılmış log yapı taşları var: Mail EventLogger, frappe.logger ile site bazlı ve döndürmeli log üretiyor; admin logu payload yazmıyor; SFU ve recorder JSON event logu üretiyor. Ancak correlation-id taşıma sözleşmesi, merkezi log hedefi ve Sentry SDK entegrasyonu görünmüyor. Suite bağımlılık listesinde sentry yok; Frappe tarafının bağımlılık alıntısı kısmi. Talimatta 'secret alanlar çıkarılsın' ifadesi var ama hangi alanların çıkarılacağı tanımlanmamış.

Eksik:

- Frappe web, RQ worker ve Node servisleri (SFU/recorder) arasında request/correlation-id sözleşmesi yok
- Merkezi log manager hedefi ve saklama/erişim yetkisi seçilmemiş
- Sentry: self-host mu SaaS mı, DSN secret yönetimi ve veri yerleşimi kararı yok
- Redaksiyon listesi (token, parola, mail içeriği) ve Frappe v17 logging API eşlemesi yok

Nasıl tamamlanır: trace-logging--implementation görevine şunlar eklensin: tek bir correlation-id alanı; mail logger.py'deki 'payload yazma' kuralını genelleyen bir redaksiyon listesi; Sentry barındırma kararı. DSN yalnız secret deposunda tutulsun.

Kaynak dayanakları: `suite/suite/mail/utils/logger.py:48`; `suite/suite/mail/utils/logger.py:161`; `suite/suite/meet/sfu-server/src/utils/logger.ts:71`; `suite/suite/meet/recorder-server/src/server.ts:142`; `suite/pyproject.toml:10`.

Rehber: [trace-logging](./frappe-roadmap-contracts/trace-logging.json). Mevcut birincil görev: `trace-logging--implementation`.

### observability-4 — Bellek, veri tabanı, kuyruk, önbellek ve dış servis sağlık ölçümleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü bileşen bazında doğru alarm istiyor, fakat bileşen listesi ve probe sözleşmesi yok. Kaynakta recorder için /health ve /ready uçları, Python RecorderClient'ta sınırlı timeout ve 'indeterminate' sonucu var; bunlar dış servis sağlığı için örnek desen. MariaDB, Redis, RQ kuyruğu ve S3/JMAP sağlık ölçümü bu alıntılarda görünmüyor. Frappe Monitor kaynağı alıntılanmadığı için çekirdek tarafı bilinmiyor.

Eksik:

- Probe yapılacak bileşenlerin listesi (MariaDB, Redis cache/queue, RQ worker/scheduler, socketio, SFU, recorder, boto3/S3, mail) yok
- Kuyruk derinliği/gecikmesi ve bellek eşikleri tanımsız
- Liveness/readiness ayrımı yalnız recorder'da var; Frappe tarafı için sözleşme yok
- Kesintinin hangi kiracıları etkilediğinin eşlemesi yok

Nasıl tamamlanır: metrics-export--implementation kabulüne bileşen bazlı bir probe tablosu eklensin: bileşen, metrik, eşik, sahip. Recorder'daki /health–/ready ayrımı ve 'indeterminate' sonucu Frappe ile dış servis probe'ları için referans desen olarak yazılsın.

Kaynak dayanakları: `suite/suite/meet/recorder-server/src/app.ts:196`; `suite/suite/meet/recorder-server/src/app.ts:197`; `suite/suite/meet/recording/recorder_client.py:22`; `suite/suite/meet/recording/recorder_client.py:210`.

Rehber: [metrics-export](./frappe-roadmap-contracts/metrics-export.json). Mevcut birincil görev: `metrics-export--implementation`.

### observability-5 — Yanıt süresi, hata oranı, erişilebilirlik ve işlem izleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (headless→API→worker trace, bağımsız uptime probe) yeterince somut. Kaynakta yalnızca Meet recorder hizmetine ait prom-client sayaçları/göstergeleri, /health ve /ready uçları ve bir Grafana panosu görülüyor. Frappe istek gecikmesi, hata oranı ya da dağıtık trace enstrümantasyonu sağlanan alıntılarda görünmüyor. Recorder uçlarının varlığı da çalıştığının kanıtı sayılmaz.

Eksik:

- Trace yayılım sözleşmesi yok: hangi başlık kullanılacak (ör. W3C traceparent), headless istemciden Frappe /api ve RQ worker'a nasıl taşınacağı tanımsız.
- Frappe v17-dev'de istek ve iş kuyruğu enstrümantasyonunun bağlanacağı nokta (hook/middleware) eşlenmemiş. v16 dokümanı (Profiling) bağlayıcı değil.
- Recorder dışındaki servisler (Frappe web, worker, sfu-server, collab-server) için RED metrik envanteri ve ortak metrik adlandırması yok.
- Bağımsız probe'un yeri, sıklığı ve sahibi tanımsız. Rol yalnızca 'DevOps ekibi' diye geçiyor, Hüseyin Cengiz adıyla atanmamış.

Nasıl tamamlanır: trace-logging--implementation altında tek sayfalık bir sinyal sözleşmesi yazılmalı: yayılım başlığı, zorunlu span'ler (API isteği, RQ işi) ve RED metrik adları. v17 kaynağında istek ve iş kuyruğu hook noktası doğrulanmalı. Recorder'daki prom-client ve /ready deseni referans alınmalı. Probe kurulumu ve kabulü Hüseyin Cengiz'e atanmalı.

Kaynak dayanakları: `suite/suite/meet/recorder-server/src/app.ts:6`; `suite/suite/meet/recorder-server/src/app.ts:196`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:117`; `frappe/frappe/api/v1.py:152`.

Rehber: [trace-logging](./frappe-roadmap-contracts/trace-logging.json). Mevcut birincil görev: `trace-logging--implementation`.

### observability-6 — Kullanıcı/istek/kiracı ilişkilendirme ve hassas veriyi kayıttan çıkarma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Mail modülündeki EventLogger, frappe.logger üzerine bağlam sözlüğü taşıyan yapılandırılmış log üretiyor. Yönetim denetim kaydı da payload'u bilinçli olarak dışarıda bırakıyor. Ancak bu yalnızca mail modülüne özgü. sfu ve recorder logger'ları serbest alan ve hata mesajı yazıyor. Ortak bir request/tenant kimliği ya da redaksiyon filtresi alıntılarda görülmüyor.

Eksik:

- Yasak alan listesi tanımsız: token, parola, Authorization başlığı ve hangi PII alanları loglanmayacak, nasıl maskelenecek belirtilmemiş.
- Keycloak 'sub' ile Frappe kullanıcısı arasındaki eşleme ve loglarda hangi kimliğin yazılacağı tanımsız.
- Kiracı kimliği kararı yok: Frappe site adı mı, ayrı bir tenant id mi? Recorder tarafında yalnızca site yapılandırması var.
- Bağlamın Python (mail EventLogger) ve TS (sfu/recorder logger) logger'ları arasında nasıl ortak tutulacağına dair sözleşme yok.
- Ham error.message log alanlarının hassas veri sızdırmadığına dair kural yok.

Nasıl tamamlanır: trace-logging--implementation kapsamında tek bir log alan sözleşmesi çıkarılmalı: request_id, trace_id, user, tenant(site) alanları ve redaksiyon kara listesi. Mail EventLogger'ın ctx deseni ile log_admin_action'ın 'payload yazma' kuralı genişletilecek referans olarak kullanılmalı. Kabul, tek bir işlemin API ve worker loglarında aynı kimlikle eşleşmesi ve sızıntı taramasıyla yapılmalı (not_run).

Kaynak dayanakları: `suite/suite/mail/utils/logger.py:19`; `suite/suite/mail/utils/logger.py:160`; `suite/suite/mail/utils/logger.py:165`; `suite/suite/meet/sfu-server/src/utils/logger.ts:64`; `suite/suite/meet/recorder-server/src/server.ts:73`.

Rehber: [trace-logging](./frappe-roadmap-contracts/trace-logging.json). Mevcut birincil görev: `trace-logging--implementation`.

### observability-7 — Alarm eşikleri, bildirim rotası ve olay inceleme ekranı.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (tek alarm, doğru nöbet rotası, çözüm ve inceleme bağlantısının kaydı) anlamlı ve Frappe Notification'ın yetmediği doğru belirtilmiş. Kaynakta yalnızca recorder panosunda görsel renk eşikleri var. Alarm kuralı, yönlendirme ya da olay kaydı alıntılarda görülmüyor.

Eksik:

- Somut alarm kuralları ve eşik değerleri tanımsız. Pano eşikleri (70/90) alarm kuralı değildir.
- Bildirim rotası, nöbet çizelgesi ve tekilleştirme/gruplama kuralı yok.
- Olay inceleme kaydının nerede tutulacağı belirsiz: harici araçta mı, yoksa yetkili bir Frappe DocType'ında mı?
- Rol sahipliği tam adlarla atanmamış. Teknik kurulum Hüseyin Cengiz'e ait olmalı.

Nasıl tamamlanır: alert-routing--implementation için ilk aşamada en fazla üç alarm seçilmeli (servis erişilemez, hata oranı eşiği, recorder kapasitesi). Her biri için eşik, rota ve tekilleştirme kuralı yazılmalı. İnceleme kaydının yeri tek kararla sabitlenmeli. Kurulum ve doğrulama Hüseyin Cengiz'e atanmalı.

Kaynak dayanakları: `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:41`; `suite/suite/meet/observability/grafana/provisioning/dashboards/json/recorder-overview.json:46`; `suite/suite/meet/recorder-server/src/config.ts:85`.

Rehber: [alert-routing](./frappe-roadmap-contracts/alert-routing.json). Mevcut birincil görev: `alert-routing--implementation`.

### observability-8 — Hizmet seviyesi göstergesi ve hedefi (SLI/SLO); hata bütçesi, tüketim alarmı ve yayın kararları.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

SLI hammaddesi olabilecek somut ilkel bileşenler var, ancak SLO yönetimi yok. (1) Suite Meet SFU (prom-client) outcome etiketli sayaçlar ve histogramlar üretiyor: meet_sfu_room_joins_total{scope,rejoin,outcome} ve meet_sfu_room_join_duration_seconds. Bunlar "toplantıya katılma" yolculuğu için iyi olay/toplam olay oranını ve gecikme SLI'sını hesaplamaya elverişli. (2) Recorder sunucusunda recorder_starts_total{outcome,reason} sayacı var. (3) Merkezi bir Prometheus/Loki/Grafana yığını var: Prometheus SFU ve recorder hedeflerini 15 saniyede bir, Bearer token ile kazıyor. Grafana panoları hazır. (4) Frappe upstream'deki frappe/monitor.py, conf.monitor açıksa istek ve iş başına süre ile status_code değerini monitor.json.log dosyasına yazıyor. Bu, HTTP kullanılabilirlik SLI'sı için ham kayıttır, ama metrik ya da SLO değildir. (5) Observability README, SENTRY_RELEASE ile sürüm etiketlemeyi tarif ediyor. Bu yalnız regresyonu sürüme bağlar, yayın kararı vermez. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- SLO tanımı yok: seçilmiş yolculuk, SLI formülü, hedef yüzdesi ve ölçüm penceresi kaynakta tanımlı değil. Tek SLO geçen yer stt-server/load/README.md'deki 'önce SLO üzerinde anlaşın' notu; bu bir uygulama değil.
- prometheus.yml'de rule_files, recording rule ya da alerting/Alertmanager yapılandırması yok. Pencerenin yeniden hesaplanması, hızlı/yavaş burn-rate alarmı ve hata bütçesi hesabı yok.
- Hata bütçesi politikası ve yayın kararı kaydı yok: bütçe ihlalinde yayını dondurma ya da iyileştirme kararı tutan bir DocType, API, CI geçidi veya kayıt bulunmuyor.
- Sözleşmesel SLA'yı SLO'dan ayıran bir model ya da belge yok.
- Frappe backend ve planlanan Frappe adaptörü için Prometheus metrik ihracı yok. frappe/monitor.py yalnız JSON log yazıyor ve conf.monitor ile kapalı başlıyor.
- Runtime functionalAcceptance: not_run. Alarmların çalıştığı ya da panoların veri aldığı kaynaktan kanıtlanamaz.

Nasıl tamamlanır: Önerilen sıra: (1) slo-policy--contract kapsamında tek bir pilot yolculuk seçilir. Öneri: SFU oda katılımı. SLI = sum(rate(meet_sfu_room_joins_total{outcome="success"}[w])) / sum(rate(meet_sfu_room_joins_total[w])). Hedef, pencere (ör. 28 gün) ve iki burn-rate eşiği (hızlı: 1s/5dk, yavaş: 6s/30dk) tek sayfaya yazılır. SLA bu sayfadan ayrı tutulur. (2) slo-policy--implementation: suite/suite/meet/observability/prometheus altına bir recording-rules dosyası ve çok pencereli burn-rate alert kuralları eklenir, prometheus.yml'ye rule_files bağlanır. Mevcut validate-config.sh'ye promtool check rules ve sentetik seriyle promtool test rules (RED→GREEN) adımı eklenir. (3) Alarm teslimi (Alertmanager ya da Grafana alerting) devreye alınır. (4) Bütçe ihlalinde verilen yayın ve iyileştirme kararı için kayıt yeri belirlenir ve CI/CD geçidine bağlanır; teknik kurulum Hüseyin Cengiz'dedir. Frappe/planlanan Frappe adaptörü HTTP SLI'sı ancak bundan sonra, ayrı bir adım olarak monitor log → metrik dönüşümüyle ele alınır.

Kaynak dayanakları: `suite/suite/meet/sfu-server/src/telemetry/Telemetry.ts:40`; `suite/suite/meet/sfu-server/src/telemetry/Telemetry.ts:42`; `suite/suite/meet/recorder-server/src/app.ts:169`; `suite/suite/meet/observability/prometheus/prometheus.yml:3`; `frappe/frappe/monitor.py:23`; `frappe/frappe/monitor.py:109`.

Rehber: [slo-policy](./frappe-roadmap-contracts/slo-policy.json). Mevcut birincil görev: `slo-policy--implementation`.

### access-1 — Authorization (yetkilendirme): kullanıcı, rol ve işlem yetkileri.

Kaynak durumu: **VAR**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel Frappe 17.0.0.dev0 kaynağında rol tabanlı DocType hakları (std_rights) ve has_permission/get_role_permissions bulunuyor. Bu, kaynakta görülen bir yetenek; çalıştırılarak doğrulanmış bir davranış değil. v2 execute_doc_method HTTP metodunu bir izin türüne eşleyip kontrol ediyor. Talimatta hedef ve olumlu/olumsuz CRUD kabul ölçütü var. Ancak Keycloak→Frappe rol eşleme sözleşmesi, hangi API yüzeyinin (v1/v2/method) kabulün kapsamında olduğu ve Suite rollerinin (Suite User/Suite Admin) rol matrisindeki yeri tanımlanmamış. Desk dışı UI izin bileşeni kendisini 'display-only' olarak tanımlıyor; bu da React/AntD tarafının yetki kaynağı olamayacağını doğruluyor.

Eksik:

- Keycloak claim/grup → Frappe Role eşleme sözleşmesi ve senkron zamanı (girişte, provisioning'de) tanımsız; yerel kaynakta yalnızca genel Social Login Key OAuth akışı görülüyor.
- Kabulün hangi uçlar için geçerli olduğu belirtilmemiş (/api/v1/resource, /api/v2/document, /api/method).
- Administrator'ın her kontrolü atlaması ve System Manager ayrıcalığı rol matrisinde açıkça ele alınmamış.
- Suite migration patch'leri rolleri doğrudan Has Role bulk insert ile atıyor; rol atama denetim izine ilişkin bir talimat yok.

Nasıl tamamlanır: native-user-policy--implementation altında tek bir rol matrisi tanımlanmalı (Keycloak grup/claim → Frappe Role, Suite User/Suite Admin dahil; DocType × read/write/create/delete). Kabul /api/v2/document uçlarına bağlanmalı. React tarafındaki izin verisi yalnızca sunum amaçlı kullanılmalı.

Kaynak dayanakları: `frappe/frappe/permissions.py:82`; `frappe/frappe/permissions.py:168`; `frappe/frappe/permissions.py:109`; `frappe/frappe/api/v2.py:267`; `frappe/ui/src/composables/useDocPermissions.ts:23`; `frappe/frappe/utils/oauth.py:107`; `suite/suite/drive/patches/switch_drive_roles_to_suite_roles.py:8`.

Rehber: [native-user-policy](./frappe-roadmap-contracts/native-user-policy.json). Mevcut birincil görev: `native-user-policy--implementation`.

### access-2 — Kayıt, alan, sahiplik ve organizasyon kapsamına göre erişim.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta şu ilkel yapılar bulunuyor: alan düzeyi okuma filtresi (apply_fieldlevel_read_permissions), izinli liste sorgusu (ignore_permissions=False), controller get_list kancası, link genişletmede read kontrolü, if_owner ve permission_query_conditions/has_permission hook çifti. Suite, Sheets ve Drive için bu deseni uyguluyor. Ancak ürünün kurum/şube kapsamı için bir model yok; ERPNext kurulu olmadığından Company tabanlı kapsam kullanılamaz. Kabul ölçütü anlamlı (liste, tek kayıt ve ilişki seçeneği) fakat kapsam modeli ve tenant tanımı (site başına tenant mı, aynı site içinde kurum mu) eksik.

Eksik:

- Kurum/şube kapsamının nasıl modelleneceği (özel Organization DocType + User Permission ya da hook çifti) ve site/tenant ilişkisi tanımsız.
- İlişki seçenekleri için link search (search_widget) yolunun izin davranışı incelenen kesitte görülmüyor; kabulde açıkça istenmiş ama doğrulama hedefi belirtilmemiş.
- v1 document_list 'expand' ve attach_expanded_links yolunun alan ve kayıt filtresi kesitte doğrulanamadı.
- UI izin bileşeni rol/meta yüklenene kadar 'write' döndürüyor (fail-open). Headless istemci için bunun sunum dışında kullanılmayacağı talimatta yazmıyor.

Nasıl tamamlanır: native-role-scope--implementation için önce tenant/kurum kararı yazılmalı: site-per-tenant mı, site içi kurum mu. Ardından Suite'teki permission_query_conditions + has_permission çift deseni kurum alanına uygulanmalı. Kabul /api/v2 liste, okuma ve link search yollarına bağlanmalı.

Kaynak dayanakları: `frappe/frappe/api/v2.py:87`; `frappe/frappe/api/v2.py:164`; `frappe/frappe/api/v2.py:169`; `frappe/frappe/api/v1.py:104`; `suite/suite/hooks.py:122`; `suite/suite/sheets/permissions.py:49`; `suite/suite/mail/patches/create_suite_user_role.py:7`; `frappe/ui/src/composables/useDocPermissions.ts:51`.

Rehber: [native-role-scope](./frappe-roadmap-contracts/native-role-scope.json). Mevcut birincil görev: `native-role-scope--implementation`.

### access-3 — Her sunucu işleminde yetki denetimi ve varsayılan erişim reddi.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Standart v2 uçları whitelist ve HTTP metodu→izin türü eşlemesiyle kontrol ediliyor. Realtime katmanı izin kontrolünü web sürecine devrediyor. Recorder callback'leri aud/iss/jti ve replay korumalı JWT kullanıyor. Buna karşılık Suite'te allow_guest whitelist uçları, frappe.get_all ile izinsiz okuma, ignore_permissions kullanan iç yazıcılar, ignore_file_permissions=True ve override_whitelisted_methods bulunuyor. Varsayılan red, her özel uçta ayrı ayrı doğrulanmadıkça kanıtlanamaz. Kabul ölçütü güçlü ('yan etkisiz red'), ancak özel RPC/job envanteri, ignore_permissions/get_all kullanım kuralı ve tenant kontrolünün nasıl yapılacağı talimatta yok.

Eksik:

- Özel @frappe.whitelist (özellikle allow_guest=True) uçlarının, override_whitelisted_methods girdilerinin, website_redirects'in ve arka plan işlerinin bir envanteri yok.
- get_all/ignore_permissions yalnızca hangi koşulda (açık izin kontrolünden sonra) kullanılabilir; yazılı bir kural yok.
- Document insert/save/delete'in iç izin kontrolü bu kesitte görünmüyor; v1 create/update/delete yolları için güvence 'unknown' kalmalı.
- Job/enqueue yollarında hangi kullanıcı bağlamıyla çalışıldığı ve tenant/site bağlamı tanımsız.

Nasıl tamamlanır: native-user-policy--implementation altında, hooks.py override_whitelisted_methods ve allow_guest uçlarından başlayan salt-okunur bir uç envanteri çıkarılmalı. Her uç için kimlik/tenant/işlem kontrolü sınıflanmalı. Paylaşılan test bütçesinden en fazla bir senaryo, özel bir uçta yetkisiz isteğin yan etki üretmediğini kanıtlamaya ayrılmalı.

Kaynak dayanakları: `frappe/frappe/api/v2.py:24`; `frappe/frappe/api/v2.py:259`; `suite/suite/drive/api/permissions.py:36`; `suite/suite/drive/api/permissions.py:116`; `suite/suite/sheets/permissions.py:74`; `suite/suite/hooks.py:117`; `suite/suite/hooks.py:202`; `suite/suite/meet/recording/callback_auth.py:399`; `frappe/frappe/realtime/auth.py:88`.

Rehber: [native-user-policy](./frappe-roadmap-contracts/native-user-policy.json). Mevcut birincil görev: `native-user-policy--implementation`.

### access-4 — Impersonation (destek amacıyla kullanıcı adına geçici erişim).

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta upstream Frappe'nin kendi impersonation özelliği var; önceki 'unknown' değerlendirmesi bununla düzeltildi. Kodda bulunanlar: (1) frappe.core.doctype.user.user.impersonate(user, reason) adlı, yalnız POST kabul eden whitelisted metot. Çağıranın User üzerinde 'impersonate' izin türüne sahip olması gerekiyor; bu tür user_impersonate Permission Type JSON'unda tanımlı. (2) Metot bir Activity Log kaydı (operation=Impersonate, user=hedef, subject metninde impersonator) oluşturuyor, hedef kullanıcıya gerekçeyle birlikte Notification Log gönderiyor ve varsayılan giden e-posta hesabı varsa güvenlik uyarısı e-postası atıyor. (3) LoginManager.impersonate, login_as ile hedef kullanıcıya yeni bir oturum açıyor. Bu oturum önceki oturumun session_end ve audit_user değerlerini devralıyor; set_impersonated ile impersonated_by oturum verisine yazılıp kaydediliyor. (4) Version.set_impersonator, belge değişikliği diff/insert verisine impersonated_by ve audit_user ekliyor; form zaman çizelgesinde 'Impersonated by' gösteriliyor. (5) Boot bilgisi impersonated_by alanını taşıyor; Desk'te impersonation banner'ı ve toolbar/form kısıtlaması var. (6) User.js'teki Impersonate düğmesi gerekçeyi zorunlu tutuyor ve restrict_ip olan kullanıcıda işlemi engelliyor; ancak bu kontrol yalnız istemci tarafında. planlanan Frappe adaptörü yalnız frappe.session.user kullanıyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Hedef kullanıcı koruması sunucu tarafında yok: impersonate() yalnız genel User 'impersonate' izin türünü kontrol ediyor. Administrator/System Manager gibi korunan rolleri ve restrict_ip olan hedefleri sunucuda reddetmiyor; IP kontrolü yalnız user.js'te.
- Ayrı süre sınırı, onaylayan kişi, bekleyen talep ve iptal (revocation) kaydı yok. Oturum süresi yalnız impersonator oturumunun session_end değerinden devralınıyor; gerekçe yalnız bildirim metninde duruyor, yapılandırılmış alan olarak saklanmıyor.
- Asıl ve temsil edilen kimliğin ayrımı yalnız Version diff'lerinde ve Activity Log subject metninde var. Her işlem için yapılandırılmış actor/subject alanları yok: Access Log, Comment, Error Log, RPC/whitelist çağrıları, realtime olayları, Suite'in kendi aktivite kayıtları ve planlanan Frappe adaptörü yanıtları impersonated_by bilgisini taşımıyor.
- Keycloak impersonation veya token-exchange claim'ini (ör. act/impersonator) Frappe oturumundaki impersonated_by alanına bağlayan kod yok; Frappe tarafındaki OAuth/Social Login akışı tek kimlik üretiyor.
- Alternatif giriş yolları için politika yok: API key/token, WebDAV Basic Auth ve Meet SFU JWT yollarında impersonation oturumunu engelleyen ya da izleyen bir mekanizma yok; bu yollar tek bir kullanıcı kimliği döndürüyor.
- Headless provider kontratında (React/AntDesign istemcisi için) impersonated_by ve actor/subject alanlarını dışa veren bir alan yok; impersonation banner'ı yalnız Frappe Desk'te var, Suite'in Vue frontend'inde yok.

Nasıl tamamlanır: Yeni bir mekanizma kurmadan Frappe-native impersonate akışı yeniden kullanılmalı (R-00). Önerilen sıra: 1) support-grant--contract: Destek İzni kaydının alanları tanımlanır (talep eden, hedef, gerekçe, başlangıç/bitiş, onaylayan, durum). Korunan roller (Administrator, System Manager) ve log biçimi (actor = impersonated_by, subject = session.user) yazılır. Keycloak claim'i ancak sonradan bu alana eşlenmelidir. 2) support-grant--schema: Bu alanlarla bir DocType eklenir. 3) support-grant--implementation: Tek ve dar bir davranışla başlanır. Sunucu tarafındaki bir before-guard ya da wrapper, geçerli ve onaylı bir grant yoksa veya hedef korunan role sahipse ya da restrict_ip içeriyorsa impersonate çağrısını reddeder. Önce başarısız (RED) test, sonra geçen (GREEN) test kanıtı üretilir. Ardından grant bitişi oturum session_end değerine bağlanır. Son olarak planlanan Frappe adaptörü yanıtına salt okunur actor/subject alanları eklenir.

Kaynak dayanakları: `frappe/frappe/core/doctype/user/user.py:1581`; `frappe/frappe/core/doctype/user/user.py:1590`; `frappe/frappe/auth.py:376`; `frappe/frappe/sessions.py:495`; `frappe/frappe/core/doctype/version/version.py:44`; `frappe/frappe/core/doctype/user/user.js:401`.

Rehber: [support-grant](./frappe-roadmap-contracts/support-grant.json). Mevcut birincil görev: `support-grant--implementation`.

### access-5 — Destek erişiminde izin, gerekçe, süre, hassas işlem sınırı ve denetim izi.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü somut: gerekçe, müşteri onayı ve süre zorunlu, süre bitince erişim kesilir. Kaynakta yalnız rol tabanlı izin ilkelleri ve uygulama düzeyinde has_permission/permission_query_conditions kancaları var. Süreli ve onaylı destek erişimi nesnesi görülmedi. Ayrıca Administrator ve System Manager her kontrolü atlıyor; destek erişimi bu rollerle verilirse süre ve hassas işlem sınırı uygulanamaz.

Eksik:

- Destek erişim modeli tanımsız: kullanıcı kimliğine bürünme (impersonation) mi, ayrı destek kullanıcısına süreli rol mü, Keycloak oturumu mu? Hangi kimliğin denetim izine yazılacağı belirtilmemiş.
- Hassas işlem listesi ve bunun sunucuda nerede reddedileceği tanımsız (has_permission kancası, doküman metodu, API v1/v2 giriş noktası).
- Destek rolünün Administrator/System Manager olamayacağı yazılmamış; Suite'teki ayrıcalıklı rol bypass'ı süre sınırını etkisiz bırakır.
- Denetim izinin nereye yazılacağı (değişmez log DocType'ı ya da Version) ve süre bitince açık oturumların ve tokenların nasıl iptal edileceği tanımsız.
- Kaynaklarda v15/v16 dokümanları var; yerel v17-dev'e eşleme yapılmamış.

Nasıl tamamlanır: support-grant--implementation görevine şu sözleşme notu eklensin: grant kaydı (kapsam, gerekçe, onaylayan, bitiş zamanı), ayrıcalıklı rol yasağı ve hassas işlemlerin sunucuda has_permission kancasıyla reddi. Bitişte rol veya oturum iptali yapılsın ve denetim izi kayıt altına alınsın. Uygulamadan önce Keycloak tarafında impersonation kullanılıp kullanılmayacağına karar verilsin.

Kaynak dayanakları: `frappe/frappe/permissions.py:109`; `frappe/frappe/permissions.py:168`; `suite/suite/hooks.py:154`; `suite/suite/sheets/permissions.py:22`.

Rehber: [support-grant](./frappe-roadmap-contracts/support-grant.json). Mevcut birincil görev: `support-grant--implementation`.

### access-6 — Yetki devri, görev ayrılığı ve hassas işlemde yeniden doğrulama.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü anlamlı: talep eden kendi işlemini onaylayamaz ve eski step-up kanıtı reddedilir. Sunucu tarafında ptype bazlı check_permission ve Frappe 2FA ilkeli mevcut. Ancak API girişinde kimlik doğrulama tazeliği veya acr kontrolü görülmedi. Allow Self Approval için version-15 kaynağı gösterilmiş; yerel kurulum v17-dev ve workflow_transition kaynağı bu pakette yok.

Eksik:

- Keycloak step-up kanıtının (acr/auth_time) Frappe isteğine nasıl taşınıp doğrulanacağı tanımsız. Görülen oauth.py yalnız Social Login Key giriş akışını gösteriyor.
- 'Hassas işlem' listesi ve kabul edilecek en eski step-up yaşı belirtilmemiş.
- Süreli yetki devrinin (başlangıç/bitiş, alt devir yasağı) hangi Frappe ilkeliyle uygulanacağı tanımsız: rol, User Permission veya DocShare.
- Workflow self-approval referansı v15'te kalmış; v17-dev kaynağıyla doğrulanmadı.
- UI'daki rol hesaplamasının yalnız gösterim amaçlı olduğu ve kararın sunucuda verildiği görev metninde açıkça yazmıyor.

Nasıl tamamlanır: delegation-policy--implementation görevine v17-dev workflow_transition kaynağının okunması eklensin. Hassas işlem listesi ve step-up yaşı sınırı tanımlansın. Keycloak acr/auth_time doğrulamasının hangi Frappe auth kancasında yapılacağı bir sözleşme notu olarak yazılsın.

Kaynak dayanakları: `frappe/frappe/api/v2.py:267`; `frappe/frappe/utils/oauth.py:107`; `suite/suite/drive/webdav/auth.py:137`; `frappe/ui/src/composables/useDocPermissions.ts:22`; `suite/pyproject.toml:45`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `delegation-policy--implementation`.

### access-7 — Servis hesapları ve süreli, kapsamı sınırlandırılmış erişim anahtarları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü net: token yalnız tanımlı tenant ve eylemlerde çalışmalı, süresi dolmuş veya iptal edilmiş token reddedilmeli. Yerel Frappe'de görülen genel servis kimlik bilgisi kullanıcıya bağlı api_key:api_secret çifti; bunun süresi ya da kapsamı yok ve 2FA'yı atlayan ayrı bir faktör sayılıyor. Suite Meet'te kısa ömürlü, kapsamlı ve jti replay korumalı JWT örneği var, ama bu yalnız uygulamaya özel ve genel bir servis hesabı mekanizması değil.

Eksik:

- Keycloak client-credentials tokenının Frappe'de hangi servis kullanıcısına ve rollere eşleneceği, bearer doğrulamasının (issuer, audience, JWKS) nerede yapılacağı tanımsız.
- Statik api_key/api_secret'ın servis hesaplarında yasaklanıp yasaklanmayacağı veya nasıl sınırlanacağı yazılmamış.
- Tenant ve eylem kapsamının Frappe rol izinleri ve User Permission ile nasıl kesişeceği tanımsız.
- İptalin yayılım süresi ve önbellekteki kimlik bilgileri tanımsız; webdav kimlik bilgisi önbelleği buna örnek.
- Servis hesabının Administrator olamayacağı ve ignore_permissions yolu kullanmayacağı belirtilmemiş.

Nasıl tamamlanır: service-credential--implementation görevine şunlar eklensin: Keycloak servis client'ının Frappe servis kullanıcısına eşlenmesi, audience ve kapsam doğrulama noktası, statik API anahtarı politikası ve iptal yayılım üst sınırı. Meet AuthManager'daki exp/jti deseni referans alınabilir ama kopyalanmamalı.

Kaynak dayanakları: `suite/suite/drive/webdav/auth.py:151`; `suite/suite/drive/webdav/auth.py:6`; `suite/suite/meet/recorder-server/src/AuthManager.ts:200`; `suite/suite/meet/recording/callback_auth.py:399`.

Karar listesinde; yeni uygulama veya rehber sözleşmesi açılmadı. Mevcut birincil görev: `service-credential--implementation`.

### access-8 — Periyodik erişim gözden geçirme; sahip onayı, süreli istisna ve gereksiz yetkinin kaldırılması.

Kaynak durumu: **KISMİ**. Asıl aşama: `enterprise`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü somut: sahip onayı, süreli istisna, iki tarafta iptal ve denetim izi. Yerelde yetkiler birden fazla depoda duruyor: Has Role, DocShare ve Suite'e özgü Drive Permission. Suite migration patch'leri Has Role kayıtlarını doğrudan bulk insert/delete ile değiştiriyor; bu da doküman geçmişi dışında rol değişikliği olabileceğini gösteriyor. Görev metni yalnız Keycloak rolleri ve Frappe izinlerinden söz ediyor.

Eksik:

- Gözden geçirilecek yetki envanteri eksik: Has Role, User Permission, DocShare, Drive Permission, API anahtarları ve Keycloak grupları/rolleri.
- Uzlaştırmada hangi tarafın asıl kaynak sayılacağı (Keycloak→Frappe ya da tersi) ve çakışma kuralı tanımsız.
- Doğrudan DB ile yapılan rol değişikliklerinin denetim izine nasıl yansıyacağı tanımsız.
- Dönem, sahip kimliği ve istisna süre sınırı tanımsız. Destekleyici ui-family-34 görevinin kapsam sınırı belirtilmemiş.

Nasıl tamamlanır: access-review--implementation görevine yetki kaynağı envanteri ve uzlaştırma yönü eklensin. Reddedilen yetkinin her depoda native API üzerinden kaldırıldığı (doğrudan SQL ile değil) ve denetim kaydının oluştuğu kabul kanıtı olarak yazılsın.

Kaynak dayanakları: `suite/suite/drive/patches/switch_drive_roles_to_suite_roles.py:45`; `suite/suite/mail/patches/create_suite_user_role.py:95`; `suite/suite/sheets/permissions.py:53`; `suite/suite/drive/api/permissions.py:33`.

Rehber: [access-review](./frappe-roadmap-contracts/access-review.json). Mevcut birincil görev: `access-review--implementation`.

### model-1 — Entity manager (iş varlığı tanımı yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve sahip belli; kabul ölçütü yalnız izinli API üzerinden kayıt CRUD'unu istiyor. Kaynakta DocType kaydedilince şema güncelleniyor ve REST CRUD/izin yolları var. Talimat ise standart DocType özelleştirmesini, custom DocType düzenlemesini, developer_mode kısıtını ve Suite'in /api yol filtresini ayırmıyor.

Eksik:

- Standart DocType (Customize Form/Property Setter) ile custom=1 DocType düzenlemesi ayrılmamış; developer_mode dışında standart DocType salt okunur.
- Kabul ölçütünde şema değişikliği güvenliği yok: önizleme/fark, onay, kırıcı değişikliğin reddi ve veri koruma tanımlanmamış.
- Sürüm eşlemesi yok: hedef yerel Frappe 17.0.0.dev0 (adf1fd0c), docs.frappe.io bağlantıları sürümsüz.
- Suite hooks DENIED_WILDCARD_PATHS '/api/' içeriyor; headless entity manager'ın hangi /api/v2/document yollarını kullanacağı ve izin listesine ekleme sınırı tanımsız.
- native-doctype-schema--implementation görevinde v1/v2 API seçimi ve get_meta tüketim sözleşmesi belirtilmemiş.

Nasıl tamamlanır: Mevcut görev kimliğine şunları ekle: (a) custom DocType için DocType belgesi, standart DocType için Customize Form yolu, (b) /api/v2 document/get_meta sözleşmesi ve Suite izin listesi etkisi, (c) Frappe 17-dev commit sabitlemesi. Kabule izinsiz kullanıcının reddedilmesini ekle.

Kaynak dayanakları: `frappe/frappe/core/doctype/doctype/doctype.py:546`; `frappe/frappe/core/doctype/doctype/doctype.py:198`; `frappe/frappe/core/doctype/doctype/doctype.js:66`; `frappe/frappe/api/v1.py:154`; `frappe/frappe/api/v2.py:245`; `suite/suite/hooks.py:466`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation`.

### model-2 — Field manager (alan yönetimi) ve type engine (veri tipi motoru).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta yerleşik bir fieldtype motoru var: DocField/CustomizeFormField içinde reqd/unique ve tür listesi, Custom Field doğrulaması, updatedb ve Meta birleştirme. Kabul ölçütündeki 'saklama biçimi' belirsiz. Alan türü değişikliği, silme ve uzunluk küçültme gibi kırıcı değişikliklerin sınırı tanımlanmamış.

Eksik:

- Desteklenen fieldtype listesi ve her türün UI kontrolü/API değer eşlemesi tanımsız. UI sunum metaverisi ile sunucu doğrulaması ayrılmamış.
- Property Setter ile fieldtype değişikliği yalnız naming_series için engelleniyor. Diğer tür değişikliklerinin veri kaybı/kırıcılık politikası talimatta yok.
- make_property_setter izinleri yok sayıyor ve create_custom_field ignore_validate alıyor. Bunların headless yüzeye açılmayacağı yazılmamış.
- Core DocType ve custom DocType'a Custom Field eklenemiyor. Talimat bu sınırı belirtmiyor.
- Meta önbelleği (client_cache) temizlenince istemci tarafında sorgu geçersizleştirme sözleşmesi yok.

Nasıl tamamlanır: Görev kabulünü somutlaştır: alan ekleme Custom Field belgesiyle, özellik değişikliği Customize Form/Property Setter belgesiyle, kendi izinleriyle yapılmalı. Kırıcı değişiklik sınıfları (tür, silme, unique ekleme, uzunluk) açıkça reddedilmeli ya da onaya bağlanmalı. get_meta çıktısında reqd/unique/fieldtype değerleri API davranışıyla eşleşmeli.

Kaynak dayanakları: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:33`; `frappe/frappe/custom/doctype/custom_field/custom_field.py:229`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:8`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:87`; `frappe/frappe/custom/doctype/custom_field/custom_field.py:291`; `frappe/frappe/model/meta.py:174`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation-mvp`.

### model-3 — Taxonomy management (kategori, etiket ve sınıflandırma yönetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de yeniden kullanılabilir taxonomy parçaları var. (1) frappe/frappe/utils/nestedset.py: NestedSet Document temel sınıfı. on_update içinde update_nsm çalışır; parent değişince update_move_node düğümü taşır. update_add_node ve update_move_node, validate_loop ile bir düğümün kendi alt düğümüne taşınmasını NestedSetRecursionError ile reddeder. Çocuğu olan düğüm silinemez (NestedSetChildExistsError). İstemciden gelen lft/rgt değerleri restore_nsm_fields ile kayıtlı değerlere döndürülür. Ayrıca rebuild_tree ve remove_subtree var. (2) frappe/frappe/desk/treeview.py: whitelisted get_children, get_all_nodes ve add_node. _get_children frappe.qb.get_query kullandığı için standart izin kontrolünden geçer. (3) frappe/frappe/desk/doctype/tag/tag.py: Tag master, Tag Link ve whitelisted add_tag, add_tags (bulk_actions kontrolü), remove_tag, get_tagged_docs API'leri. Etiketler _user_tags kolonunda tutulur. update_tags write iznini kontrol eder ve Tag Link kayıtlarını eşitler. Desk liste görünümünde _user_tags için filtre ve istatistik var (base_list.js). Headless provider ağaç ve etiket sözleşmesi sunmuyor. Suite'in Vue frontend'i bu kalemle ilgili değil. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kurulu kaynakta somut bir kategori/taxonomy-term DocType'ı (is_tree=1, nsm_parent_field) yok; JSON taramasında is_tree:1 eşleşmesi çıkmadı.
- Etiket ilişki modeli seçilip uygulanmamış: Table MultiSelect ile bağlantı DocType'ı mı, yerleşik Tag/_user_tags mı, karar yok.
- Çoklu etiket araması (AND) için ayrılmış bir API yok. get_tagged_docs tek etiketle LIKE yapar; get_documents_for_tag tek etiket alır ve ilk karakteri koşulsuz siler. Virgülle ayrılmış _user_tags üzerinde LIKE aramasında kısmi eşleşme (örn. 'ab' ile 'abc') riski var; tag sınırına duyarlı eşleşme yok.
- Kategori taşıma için kiracı ve izin politikası yok. NestedSet tek tabloda global lft/rgt tutar; kiracı başına ağaç ayrımı ya da taşıma sırasında kiracı sınırı kontrolü kaynakta görülmedi.
- Tag master, add_tag içinde ignore_permissions ile global olarak oluşturuluyor; kiracıya özgü etiket sözlüğü yok.
- Headless provider için ağaç ve etiket sözleşmesi yok (list/move/search endpoint'leri ve kiracı zarfı).
- Döngü engeli, taşıma ve çoklu etiket kabulü için çalıştırılmış RED/GREEN kanıtı yok; functionalAcceptance=not_run.

Nasıl tamamlanır: Mevcut görev sırasına uyarak (taxonomy-term--contract → taxonomy-term--schema → taxonomy-term--implementation) en küçük adımlar: (1) Kontrat aşamasında modeli sabitle. Kategori, is_tree=1 olan özel bir DocType olsun; controller'ı frappe.utils.nestedset.NestedSet'ten türesin, döngü ve taşıma yerel validate_loop ile update_move_node'a bıraksın. Etiket için tek bir model seç; kiracı kapsamı gerekiyorsa kiracı alanlı Taxonomy Term ile Table MultiSelect bağlantı tablosu kullan. (2) Kiracı alanını ve taşıma sırasında aynı kiracı içinde kalma doğrulamasını tanımla (tenant-registry ve native-user-policy kontratlarına bağlı). (3) Native döngü reddini yeniden uygulama veya sırf TDD görünümü için zaten geçen native kontrolü tekrar yazma. İlk yeni davranışı tenant kapsamlı taxonomy adapter sınırına daralt; tam etiket eşleşmesi ve taşıma yetkisini sözleşmede tanımla. Uygulama aşamasında yalnız gerçekten eksik bu davranışın gerekli kontrolü seçilir; bu analizde test eklenmez. (4) Ancak bundan sonra headless provider için ince bir ağaç ve etiket arama sözleşmesi ekle. Yeni bir taxonomy motoru yazma.

Kaynak dayanakları: `frappe/frappe/utils/nestedset.py:129`; `frappe/frappe/utils/nestedset.py:252`; `frappe/frappe/utils/nestedset.py:57`; `frappe/frappe/desk/treeview.py:42`; `frappe/frappe/desk/doctype/tag/tag.py:70`; `frappe/frappe/desk/doctype/tag/tag.py:101`.

Rehber: [taxonomy-term](./frappe-roadmap-contracts/taxonomy-term.json). Mevcut birincil görev: `taxonomy-term--implementation`.

### model-4 — İlişki tipleri, zorunlu alan, benzersizlik ve referans bütünlüğü.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta Link/Dynamic Link/Table alan türleri, reqd/unique özellikleri ve link okumasında izin kontrolü var. Kabul ölçütü geçersiz Link, eksik zorunlu değer ve yinelenen benzersiz değerin reddini istiyor. 'Silme politikası' ise tanımsız: restrict mi, cascade mi, alt kayıtlar nasıl ele alınacak belli değil. Yerel delete yolunda da alt belge işleme TODO olarak duruyor.

Eksik:

- Silme politikası (bağlı kayıt varsa reddet, ya da yalnız child table cascade) seçilmemiş. Link kontrolü kaynağı alıntıda yok.
- v1 delete_doc yolunda '# TODO: child doc handling' notu var. Hangi API sürümünün kullanılacağı belirsiz.
- Mevcut verisinde yinelenen değer olan bir alana unique eklenince ne olacağı (migration/ret) tanımsız.
- İlişki türleri (Link, Dynamic Link, Table, Table MultiSelect) ile N:M modeli arasında eşleme yok.
- Bağlı kaydın okuma izni yokken expand_links davranışı kabul ölçütünde yer almıyor.

Nasıl tamamlanır: Kabule şunları ekle: yerel Frappe link kontrolüyle bağlı kayıt silmenin reddedilmesi; child table alt kayıtlarının üst belgeyle birlikte silinmesi; yinelenen veri varken unique eklemenin reddedilmesi; /api/v2 üzerinden reqd ve Link hatalarının doğrulanması. İlişki türü eşleme tablosunu mevcut göreve yaz.

Kaynak dayanakları: `frappe/frappe/model/meta.py:186`; `frappe/frappe/api/v1.py:104`; `frappe/frappe/api/v1.py:71`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:123`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:49`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation`.

### model-5 — Kiracı özel alanları; şema sürümü ve veri tipi değişikliği.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü anlamlı. Custom Field/Property Setter kaynakta site DB'sinden DocType filtresiyle okunuyor. Kiracı izolasyonu ayrı bir tenant kolonuyla değil, site başına veritabanıyla sağlanıyor. Görülen kaynakta tip değişikliği yalnız naming_series için engelleniyor. Uyumsuz veriyi raporlayan bir yol yok; kaydetmede doğrudan updatedb çalışıyor. Trim Table ise kalıcı kolon silme uyarısı veriyor.

Eksik:

- Kiracı modeli (site başına mı, paylaşımlı mı) talimatta açıkça bağlanmamış; sızıntı kabulü bu karara bağlı.
- Şema sürümü/revizyonu tanımlı değil; Frappe 17.0.0.dev0 (adf1fd0c) ile eşleme yok.
- Tip değişiminde kuru çalıştırma (dry run) ve uyumsuz satır raporu sözleşmesi yok. Customize Form'daki izinli tip geçiş listesi bu alıntıda görülmedi, durumu unknown.
- Trim Table/kolon silme gibi geri alınamaz adımların ürün tarafından yasaklanıp yasaklanmayacağı yazılmamış.

Nasıl tamamlanır: native-doctype-schema--implementation-post-mvp görevine şunları ekle: (1) site=tenant kararı, (2) tip değişiminden önce mevcut değerleri yeni tipe göre sayan, salt okunur bir uyumsuzluk raporu, (3) trim/kolon silmenin headless yüzeyde kapalı tutulması. Customize Form tip geçiş doğrulamasını v17 kaynağında okuyup eşle.

Kaynak dayanakları: `frappe/frappe/model/meta.py:414`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:8`; `frappe/frappe/custom/doctype/customize_form/customize_form.py:247`; `frappe/frappe/custom/doctype/customize_form/customize_form.js:230`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation-post-mvp`.

### model-6 — Hesaplanan alanlar, varsayılan değerler ve doğrulama kuralları.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta DocField default, fetch_from, mandatory_depends_on, is_virtual ve min/max/non_negative özellikleri var. REST v1 create/update yolları Document insert/save'den geçtiği için controller validate API yolunda da çalışıyor. Ancak read_only/fetch_from sunum ya da kopyalama davranışı. Türetilmiş değerin kullanıcı girdisiyle ezilmemesi, controller'da yeniden hesaplamaya bağlı ve böyle bir sözleşme yok.

Eksik:

- Hangi DocType'ta hangi formülün hesaplanacağı ve yeniden hesaplama politikası (kayıtta mı, job'da mı) tanımsız.
- Import ve job yollarının aynı validate/before_save zincirinden geçtiği bu alıntıda doğrulanmadı (unknown).
- UI'daki read_only/depends_on bilgisinin sunucu doğrulaması sayılmayacağı talimatta açık değil.
- Suite'te ilgili controller veya doc_events örneği görülmedi.

Nasıl tamamlanır: MVP görevine her hesaplanan alan için 'sunucu controller'ında validate içinde yeniden hesapla, istemcideki değeri yok say' kuralını ekle. Kabulü tek bir DocType üzerinde API ve import yolunun aynı sonucu vermesiyle sınırla; test bütçesi paylaşımlı, bu denetimde test yazılmaz.

Kaynak dayanakları: `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:30`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:27`; `frappe/frappe/custom/doctype/customize_form_field/customize_form_field.py:98`; `frappe/frappe/api/v1.py:50`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation-mvp`.

### model-7 — Modülün kayıt sahipliğini koruyan alan/varlık genişletmeleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü net: çakışmada kurulum durmalı. Kaynak ise bunun tersine davranıyor: create_custom_field aynı dt/fieldname varsa sessizce atlıyor. Yeni bir Property Setter da aynı özellikteki eskisini siliyor, yani son yazan kazanıyor. Property Setter'daki module alanı yalnız export içindir, sahiplik kaydı değildir. Uygulama/modül devre dışıyken gizleme mekanizması mevcut.

Eksik:

- Modül veya uygulama başına alan sahipliği kaydı ve çakışma politikası yok.
- create_custom_fields varsayılan olarak update=True çalışıyor; başka bir modülün alanını güncelleyebileceği kontrol edilmeli (gövde alıntıda yok).
- Yükseltmede is_system_generated alanların ezilebileceği kaynakta uyarılıyor; korunma kuralı tanımsız.
- Suite'in hangi çekirdek DocType'ları genişlettiği (fixtures/custom_fields) alıntıda görülmedi.

Nasıl tamamlanır: Kurulum ve migration öncesi salt okunur çakışma kontrolünü açık uygulama sahipliği bildirimi üzerinden tanımla: (dt, fieldname) ve (dt, field, property) sahipleri tek kaynaktan gelsin. module/owner alanını tek başına uygulama sahipliği kanıtı sayma. Ön kontrol uygun native uygulama yaşam döngüsünün önünde çalışsın; onun yerine geçmesin ve izin atlayan helper’ları headless uç olarak açmasın.

Kaynak dayanakları: `frappe/frappe/custom/doctype/custom_field/custom_field.py:314`; `frappe/frappe/custom/doctype/property_setter/property_setter.py:46`; `frappe/frappe/custom/doctype/property_setter/property_setter.json:103`; `frappe/frappe/custom/doctype/custom_field/custom_field.js:33`; `frappe/frappe/model/meta.py:446`.

Rehber: [native-doctype-schema](./frappe-roadmap-contracts/native-doctype-schema.json). Mevcut birincil görev: `native-doctype-schema--implementation`.

### model-8 — Frappe şemasını bağımsız frontend’e taşıyan sürümlü ve izinli metadata adaptörü; semantik alan, Link/Dynamic Link, child table ve Desk davranış sınırları.

Kaynak durumu: **KISMİ**. Asıl aşama: `poc`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat ayrıntılı: frm/script sınırı, sunucu doğrulaması ve önbellek bağlamı ele alınmış. Ancak 'hedef sürüm seçilmedi' diyor; gözlenen Frappe 17.0.0.dev0 ile eşleme yapılmamış. v2 get_meta, alan düzeyinde izin filtresi uygulamadan tam meta'yı 'All' rolüne döndürüyor. Meta önbelleği yalnız DocType adıyla anahtarlanıyor. Kayıt okumada apply_fieldlevel_read_permissions ve Link/Dynamic Link genişletmesi var, ama v1'de child silme hâlâ TODO. Suite'in /api/ yollarını engelleyen listesi adapter uç noktasını etkileyebilir.

Eksik:

- Ham get_meta yasak (permlevel) alanları gizlemiyor; meta için izin filtreli bir projeksiyon sözleşmesi yok.
- v2 iç işleyişi 'breaking change' sayılmadan değişebilir; adapter'ın bağlanacağı rota ve sürüm sabitlemesi tanımsız (suite frappe >=16,<18 bildiriyor).
- Revizyon/ETag ve kullanıcı/site/rol bağlamına göre önbellek anahtarı tanımsız.
- get_meta rotasının bağlı olup olmadığı ve suite DENIED_WILDCARD_PATHS etkisi bu alıntıda görülmedi (unknown).
- Child table'ı silme/ana kayıt ilişkisi davranışı v1'de eksik; v2 karşılığı görülmedi.

Nasıl tamamlanır: permissioned-metadata--implementation için v17 kaynağında kısa bir eşleme notu yaz: hangi rota kullanılacak, has_permission/permlevel ile meta alanlarının nasıl süzüleceği, revizyon alanı ve suite yol izin listesine etkisi. Bu not hazır olmadan renderer işine başlama.

Kaynak dayanakları: `frappe/frappe/api/v2.py:246`; `frappe/frappe/api/v2.py:8`; `frappe/frappe/model/meta.py:83`; `frappe/frappe/api/v1.py:84`; `frappe/frappe/api/v1.py:102`; `frappe/frappe/api/v1.py:71`; `suite/suite/hooks.py:466`; `suite/pyproject.toml:45`.

Rehber: [permissioned-metadata](./frappe-roadmap-contracts/permissioned-metadata.json). Mevcut birincil görev: `permissioned-metadata--implementation`.

### files-1 — DAM (Digital Asset Management — dijital varlık yönetimi), dosya ve medya kütüphanesi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat Frappe Desk File Manager'ı temel alıyor. Oysa kurulu suite uygulaması File sınıfını override ediyor ve framework File izinlerini Drive izin modeliyle tamamen değiştiriyor. Drive kaynağında klasör/izin/dead-property primitifleri görülüyor; DAM metadata, haklar ve tenant sınırı ise tanımlı değil.

Eksik:

- Tenant sınırı tanımsız: Drive izinleri kullanıcı/grup/genel principal bazlı; filter_file is_private=0 olan dosyaları tüm kullanıcılara açık bırakıyor, 'başka tenant'a görünmemeli' kabulü bu modele eşlenmemiş.
- Headless kütüphane yolu seçilmemiş: /api/v2 upload_file ile document/File mi, Drive API mi kullanılacak? Drive override'ı altında hangi yolun geçerli olduğu belirtilmemiş.
- Varlık metadata/hakları için native Custom Field/Property Setter kullanılacağı ve Drive DAV Property ile ayrımı yazılmamış.
- Kaynak doküman version/upstream Frappe; yerel v17-dev + suite Drive birleşimine sürüm eşlemesi yok.

Nasıl tamamlanır: native-file--implementation görevine şu notu ekleyin: kaynak sistem suite Drive'dır (File override + ignore_file_permissions). Tenant=site mi, Drive takımı mı olacağı kararını kaydedin. is_private=0 davranışına göre tenant-dışı görünürlük kabulünü yeniden yazın.

Kaynak dayanakları: `suite/suite/hooks.py:117`; `suite/suite/hooks.py:196`; `suite/suite/drive/utils/overrides.py:17`; `frappe/frappe/api/v2.py:624`.

Rehber: [native-file](./frappe-roadmap-contracts/native-file.json). Mevcut birincil görev: `native-file--implementation`.

### files-2 — Dosya türü denetimi: MIME (Multipurpose Internet Mail Extensions — çok amaçlı internet posta uzantıları) türleri; mime_types.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni anlamlı: sunucu tarafı ve sahte MIME reddi. Ancak dayanak version-15 file.py; yerel kaynak v17-dev. WebDAV PUT yolunda MIME, uzantı üzerinden mimemapper ile tespit ediliyor. frappe 'filetype' bağımlılığı içerik tabanlı tespit için bir primitif sağlıyor, ama kullanımı görülmedi.

Eksik:

- Yerel v17 frappe/core/doctype/file/file.py ve suite Drive upload yolu incelenmemiş; version-15 notu yerel kaynağa eşlenmemiş.
- _detect_mime ve _run_upload_validators gövdeleri görülmedi; içerik doğrulaması yapılıp yapılmadığı bilinmiyor.
- Tek politikanın kapsayacağı tüm upload yolları listelenmemiş: v2 upload_file, Drive upload, WebDAV PUT/LOCK-create, mail upload_attachment.
- Allowlist ve doctype/alan bazlı politika sahibi ile yapılandırma yeri tanımsız.

Nasıl tamamlanır: file-type-policy--implementation görevinde yerel file.py, put.py içindeki _detect_mime/_run_upload_validators ve Drive upload API'sini okuyun. Tüm upload yollarının geçtiği tek sunucu kancasını belirleyin, filetype ile içerik eşleşme kuralını o kancaya bağlayın.

Kaynak dayanakları: `suite/suite/drive/webdav/put.py:109`; `suite/suite/drive/webdav/put.py:159`; `frappe/pyproject.toml:15`; `suite/pyproject.toml:13`.

Rehber: [file-type-policy](./frappe-roadmap-contracts/file-type-policy.json). Mevcut birincil görev: `file-type-policy--implementation`.

### files-3 — ClamAV ile zararlı dosya taraması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Suite Drive'da senkron, kalıcılaştırma öncesi çalışan genişletilebilir bir upload doğrulama kancası var: validate_drive_upload. WebDAV PUT içinde _run_upload_validators tamamlanmış scratch dosyasını FileStorage olarak her hook'a veriyor. Hook True/None dışında bir değer döndürürse istek Forbidden ile reddediliyor (put.py:919-928). Bu çağrı create (put.py:153) ve overwrite (put.py:225) yollarında var. HTTP upload_file aynı hook'u çağırıp reddi frappe.throw ile uyguluyor (files.py:64-68). Frappe core File akışında before_write_file (yalnız file_size alır) ve depolamayı değiştiren write_file hook noktaları var (file.py:977-980). Bunlar tarama için kullanılabilecek ilkel araçlar, ama tarayıcı değil.

Eksik:

- İki app kökünde (frappe, suite) ClamAV/clamd istemcisi, INSTREAM çağrısı, tarayıcı ayarı veya bağımlılığı yok.
- Ne suite ne frappe hooks.py dosyasında validate_drive_upload kaydı var. Hook listesi boş olduğundan hiçbir şey taranmıyor ve put.py:921 bu durumda sessizce geçiyor; bu fail-open demek.
- Karantina veya tarama durum modeli yok. Drive yalnız Active/Trashed/Removed durumlarını tanıyor. Bu yüzden GET, PROPFIND, liste ve S3 presigned redirect (get.py:87-88) yollarında onaylanmamış dosyayı gizleme kuralı da yok.
- HTTP chunked upload'da hook, birleştirilmiş dosya yerine her istekteki chunk ile çağrılıyor (files.py:64-66; birleştirme files.py:96-100). Bu yüzden tam dosya taranmaz.
- Frappe core File/attachment akışında içerik tarama çağrısı yok. before_write_file kancası içerik değil yalnız file_size alıyor.
- Tarayıcıya erişilemezken fail-closed davranışı ve EICAR reddi yok.
- Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.
- ClamAV servis sahipliği ve imza güncelleme sözleşmesi kaynakta yok (operasyonel konu).

Nasıl tamamlanır: Sıra mevcut bağımlılıklara göre: (1) malware-scan--contract: Drive File için tarama durumu (Pending/Clean/Infected/ScanError) ile fail-closed okuma kuralı yazılır. Kural GET/PROPFIND/liste/presigned redirect yollarının tamamını kapsar. (2) malware-scan--implementation'ın ilk dar davranışı: suite hooks.py'ye bir validate_drive_upload uygulaması kaydedilir. Bu uygulama clamd INSTREAM ile senkron tarama yapar; infected sonuçta ya da tarayıcıya erişilemediğinde reddeder (fail-closed). Önce EICAR ve tarayıcıya-erişilemez durumları için RED test yazılır (mock clamd), sonra GREEN yapılır. (3) files.py chunked yolunda tarama, create_drive_file öncesinde birleştirilmiş temp_path üzerinde yapılacak şekilde taşınır. (4) Asenkron (RQ) tarama gerekirse karantina durumu ve okuma filtreleri eklenir. (5) Frappe core File ekleri için write_file veya File doc_events entegrasyonu ayrıca ele alınır. ClamAV servisi ve imza güncellemesi Hüseyin Cengiz'in platform devri olarak bağlanır.

Kaynak dayanakları: `suite/suite/drive/webdav/put.py:920`; `suite/suite/drive/webdav/put.py:928`; `suite/suite/drive/api/files.py:66`; `suite/suite/drive/utils/__init__.py:13`; `suite/suite/drive/webdav/get.py:88`; `frappe/frappe/core/doctype/file/file.py:977`.

Rehber: [malware-scan](./frappe-roadmap-contracts/malware-scan.json). Mevcut birincil görev: `malware-scan--implementation`.

### files-4 — Depolama adaptörleri: MinIO ve Amazon S3 (Simple Storage Service — basit depolama hizmeti).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat S3'ü 'Frappe Drive ayrı uygulaması' olarak tanımlıyor. Yerelde ise Drive, kurulu suite uygulamasının içinde ve boto3 tabanlı S3 yolu kaynakta mevcut: generation key, proxy ve presigned GET, LOCK-create. Framework attachment'larının S3'e gidip gitmediği, MinIO endpoint uyumu ve backup/restore görülmedi.

Eksik:

- Ekosistem/ayrı uygulama varsayımı yanlış eşlenmiş; adaptör olarak suite Drive FileManager ve Drive Disk Settings kullanılmalı.
- Drive dışı framework attachment'ları (attached_to_doctype) için depolama yolu belirsiz.
- MinIO özel endpoint/path-style yapılandırması ve sürüm doğrulaması kaynakta görülmedi.
- Özel ACL (presigned süre, CSP sandbox) ve S3 nesnelerinin bench backup/restore kapsamı tanımsız.

Nasıl tamamlanır: object-storage--implementation kaynağını suite Drive FileManager/Drive Disk Settings olarak güncelleyin. FileManager.s3 bağlantı kurulumunu okuyup MinIO endpoint desteğini belirleyin. Backup/restore'u ayrı bir kabul satırı olarak sabitleyin.

Kaynak dayanakları: `suite/pyproject.toml:15`; `suite/suite/drive/webdav/get.py:41`; `suite/suite/drive/webdav/put.py:6`; `suite/suite/drive/workspace/drive/drive.json:41`.

Rehber: [object-storage](./frappe-roadmap-contracts/object-storage.json). Mevcut birincil görev: `object-storage--implementation`.

### files-5 — Dosya boyutu, uzantı ve gerçek içerik doğrulama; karantina.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul cümlesi anlamlı. Kaynakta boyut tavanı, upload validator çağrısı ve indirmede aktif içerik nötrleştirme var. Ancak MIME tespiti uzantıya dayanıyor. Byte/magic doğrulaması ve tarama karantinası kaynakta görünmüyor. Talimat v15 File controller'ını referans alıyor. Yerelde ise v17-dev çalışıyor ve File sınıfı Suite/Drive tarafından override ediliyor.

Eksik:

- Kaynak eşlemesi v15 file.py'yi gösteriyor; yerel Frappe 17.0.0-dev ve suite.drive.overrides.file.File override'ı talimatta yok
- Tüm giriş yolları için tek doğrulama kapısı tanımlanmamış: Frappe upload_file, WebDAV PUT/LOCK-create ve mail upload_attachment
- Karantina durum modeli eksik: bekliyor/temiz/zararlı, erişim kapalı varsayılanı, tarayıcı hatasında fail-closed davranışı
- _run_upload_validators ve _detect_mime gövdeleri excerpt'te yok; içerik/uzantı uyuşmazlığı kontrolü doğrulanmadı
- ClamAV yalnızca kaynak linki olarak geçiyor; tarayıcı, senkron/asenkron çalışma ve zaman aşımı sözleşmesi yok

Nasıl tamamlanır: native-file--implementation görevine önce kısa bir sözleşme eklenmeli: v17 + Drive override eşlemesi, giriş yolu envanteri ve karantina durumları. Ardından mevcut _run_upload_validators kancası okunmalı. Byte doğrulaması için kurulu filetype bağımlılığının yeniden kullanılıp kullanılamayacağı burada değerlendirilmeli. Kabul durumu not_run kalıyor.

Kaynak dayanakları: `suite/suite/drive/webdav/put.py:153`; `suite/suite/drive/webdav/put.py:109`; `suite/suite/drive/webdav/put.py:141`; `frappe/pyproject.toml:15`; `suite/suite/drive/webdav/get.py:60`; `suite/suite/hooks.py:196`; `frappe/frappe/api/v2.py:624`.

Rehber: [native-file](./frappe-roadmap-contracts/native-file.json). Mevcut birincil görev: `native-file--implementation`.

### files-6 — Özel/genel erişim, süreli bağlantı ve güvenli indirme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Talimat özel/genel ayrımını native Frappe olarak tanımlıyor. Yerelde ise framework File izinleri tamamen devre dışı. Bunların yerini Drive has_permission ve query conditions alıyor. S3 presigned yönlendirmesi bir site bayrağına bağlı. Yerel disk için süreli bağlantı primitifi görülmüyor. Tenant tanımı da talimatta eşlenmemiş: site mi, Drive takımı mı?

Eksik:

- ignore_file_permissions=True nedeniyle yetki sınırının Drive permission modeli olduğu talimatta yazmıyor
- Tenant tanımı eksik: site başına DB ile Drive team/principal ayrımı; 'başka tenant reddi' kabulü bu yüzden test edilemez
- Presigned URL ömrü ve iptali excerpt'te görünmüyor; yerel disk için imzalı/süreli link sözleşmesi yok
- Paylaşım linki, Guest erişimi ve Drive GENERAL_USER semantiği talimatta tanımlı değil

Nasıl tamamlanır: native-file--implementation görevinde yetki otoritesi user_has_permission ve filter_file olarak sabitlenmeli. Tenant'ın site sınırı olduğu yazılmalı. Süreli link için sözleşme belirlenmeli: mevcut presigned_url süresinin kaynağı ve yerel disk için eşdeğer çözüm. Bu sözleşme ui-view-gallery tüketicisine bildirilmeli.

Kaynak dayanakları: `suite/suite/hooks.py:117`; `suite/suite/hooks.py:156`; `suite/suite/drive/utils/overrides.py:17`; `suite/suite/drive/webdav/get.py:87`; `suite/suite/drive/webdav/get.py:88`; `suite/suite/drive/webdav/get.py:77`.

Rehber: [native-file](./frappe-roadmap-contracts/native-file.json). Mevcut birincil görev: `native-file--implementation`.

### files-7 — Medya sürümleri, önizleme, küçük görsel ve biçim dönüştürme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta küçük görsel üretimi var: FileManager create_thumbnail ve thumbnail_prefix. ffmpeg ve av ile video thumbnail/transcode bağımlılığı bildirilmiş. Ancak WebDAV PUT aynı varlığın üzerine yazıyor. 'Orijinal korunmalı' kabulünü karşılayan dosya sürüm modeli kaynakta görünmüyor. Talimat yalnızca Frappe görsel kırpmasını referans alıyor, Drive'ın medya pipeline'ını hiç anmıyor.

Eksik:

- Talimat Suite/Drive thumbnail ve transcode primitiflerini anmıyor; yeniden kullanım sınırı belirsiz
- Orijinal ile türev ilişkisinin veri modeli yok: türevin hangi File/entity'ye bağlanacağı tanımsız
- Overwrite her seferinde yeni S3 generation key yazıyor; eski generation'ın saklanıp saklanmadığı ve sürüm geçmişi excerpt'te görünmüyor
- Başarısız dönüşümün yayınlanmaması için durum alanı ve yeniden deneme sözleşmesi tanımlı değil

Nasıl tamamlanır: asset-rendition--implementation görevine önce bir envanter adımı eklenmeli. FileManager.upload_file(create_thumbnail) ve ffmpeg kullanımı okunup ne yeniden kullanılacağı yazılmalı. Ardından sürüm/türev bağı ve 'hazır değil' durumu tek sözleşmede tanımlanmalı. Yeni format pipeline'ı bu adımdan sonra kapsamlanmalı.

Kaynak dayanakları: `suite/pyproject.toml:37`; `suite/suite/drive/webdav/lock.py:218`; `suite/suite/drive/webdav/pathmap.py:201`; `suite/suite/drive/webdav/put.py:4`; `suite/suite/drive/webdav/put.py:6`.

Rehber: [asset-rendition](./frappe-roadmap-contracts/asset-rendition.json). Mevcut birincil görev: `asset-rendition--implementation`.

### files-8 — Dosya-kayıt kullanım ilişkileri; sahipsiz dosya temizliği ve saklama süresi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Dosya-kayıt ilişkisi için iki alan çifti mevcut: attached_to_* ve content_doctype/content_docname. Silme işlemi geri alınabilir çöp kutusuna gidiyor. Saatlik zamanlayıcı yalnızca kilit temizliği için görülüyor. Sahipsiz dosya tespiti, saklama süresi ve çöpün kalıcı temizliği kaynakta görünmüyor; durumları unknown. Talimat iki ilişki modelini ve trash durumunu ayırt etmiyor.

Eksik:

- 'Kullanılıyor' tanımı eksik: attached_to_*, content_doctype/docname, Drive klasör üyeliği ve Writer/Sheet/Presentation yedeklemesi
- Retention süresi, sahibi (tenant/site ayarı) ve trash'ten kalıcı silme kuralı tanımsız
- Temizleme denetim kaydı ve geri dönüş penceresi sözleşmesi yok
- İç kompanzasyon silmesi ignore_permissions kullanıyor; bu yol temizleme API'si olarak dışa açılmamalı, talimatta bu sınır yazmıyor

Nasıl tamamlanır: native-file--implementation görevinde önce kullanım ilişkileri ve STATUS_TRASHED yaşam döngüsü tek tabloda yazılmalı. Ardından mevcut trash akışının üstüne yalnızca kuru çalıştırma (dry-run) raporu tanımlanmalı. Kalıcı silme kuralı bu raporla onaylandıktan sonra eklenmeli.

Kaynak dayanakları: `suite/suite/drive/webdav/pathmap.py:30`; `suite/suite/drive/webdav/structure.py:87`; `suite/suite/sheets/patches/integrate_with_drive.py:39`; `suite/suite/drive/webdav/locks.py:288`; `suite/suite/drive/webdav/put.py:184`; `suite/suite/drive/webdav/perms.py:46`.

Rehber: [native-file](./frappe-roadmap-contracts/native-file.json). Mevcut birincil görev: `native-file--implementation`.

### jobs-1 — Cron (periyodik görev tetikleme) ve schedule (zamanlama) yönetimi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta yerel cron/zamanlama altyapısı var: hook scheduler_events, Scheduled Job Type ile croniter doğrulaması, rq_job_id ile tekilleştirme, scheduler heartbeat ve pause durumu. Ancak cron_format/frequency salt okunur ve hook ile tanımlanıyor; yönetim yalnız System Manager rolüne açık. İzinli headless zamanlama yönetimi yerelde yok. Talimatın hedefi ve kabul ölçütü anlamlı, fakat hangi mekanizmanın kullanılacağı ve v17-dev eşlemesi belirtilmemiş.

Eksik:

- Kaynak seçimi tanımlı değil: hooks scheduler_events, Scheduled Job Type mı yoksa v17-dev automation_engine process_cron mu kullanılacak? İki ayrı cron yolu var.
- cron_format ve frequency salt okunur. Headless akışta hangi alanların değişebileceği (stopped, queue) ve hangilerinin kod/hook sürümü gerektirdiği yazılmamış.
- Kiracı tanımı (site mi, site içi tenant mı) eksik. Scheduler siteler üzerinde dönüyor, site içi tenant bağlamı yok.
- Worker kapalı durumunun nasıl izleneceği tanımsız. Kaynakta görülen yalnız scheduler heartbeat; worker sağlık sözleşmesi yok.
- get_next_execution içinde maintenance_offset hesaplanıyor ama dönüş değerine eklenmiyor. Bu yalnız kaynak gözlemi, çalıştırılarak doğrulanmadı.
- Kaynak bağlantısı genel docs URL'i; v17.0.0-dev ve adf1fd0c kaynağına eşleme yok.

Nasıl tamamlanır: native-schedule--implementation görevine şu karar notu eklenmeli: tenant=site eşlemesi; Scheduled Job Type + scheduler_events yolu birincil, automation_engine kapsam dışı ya da ayrı. Headless yüzey yalnız mevcut whitelisted aksiyonları ve stopped/queue alanlarını DocType izniyle sunmalı. Kabul testi tek bir Cron job ile yapılmalı (rq_job_id tekilliği + Scheduled Job Log durumu + is_scheduler_process_running).

Kaynak dayanakları: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:67`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:114`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:71`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:145`; `frappe/frappe/utils/scheduler.py:93`; `frappe/frappe/utils/scheduler.py:186`; `frappe/frappe/automation_engine/scheduler.py:18`; `suite/suite/hooks.py:289`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:154`.

Rehber: [native-schedule](./frappe-roadmap-contracts/native-schedule.json). Mevcut birincil görev: `native-schedule--implementation`.

### jobs-2 — İş kuyruğu, öncelik, zaman aşımı ve kiracı başına eşzamanlılık.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Yerel kaynakta default/short/long kuyruk doğrulaması, conf.workers ile özel kuyruklar, iş başına timeout, at_front önceliği, global MAX_QUEUED_JOBS ve starvation eşiği var. Kaynak parçalarında kiracı başına eşzamanlılık sınırı görülmedi. Kabul ölçütü ölçülebilir, fakat sınırın nerede uygulanacağı ve kiracı kimliği tanımsız.

Eksik:

- Kiracı kimliği ve sınır noktası (enqueue sarmalayıcısı mı, worker tarafı mı) belirtilmemiş. MAX_QUEUED_JOBS kiracı başına değil, kuyruk genelinde.
- 'Uzun iş kısa kuyruğu bloke etmemeli' ölçütü worker topolojisine bağlı: short kuyruğa ayrılmış worker gerekiyor. Bu dağıtım şartı Hüseyin Cengiz'in devir notunda yer almıyor.
- at_front ve timeout değerlerinin hangi iş sınıfına verileceğine dair politika tablosu yok.
- Görev sahipliği belirsiz: jobs-2/3/4 aynı job-state--implementation görevine bağlı, ama kuyruk politikası ile iş durumu sözleşmesi ayrılmamış.

Nasıl tamamlanır: job-state--implementation altında, yeni görev açmadan, şu sözleşme yazılmalı: iş sınıfı→kuyruk/timeout tablosu, tenant=site anahtarı ve frappe.enqueue çevresinde mevcut Redis ile tenant sayacı. Her tenant için kuyruk açılmamalı. Short kuyruk için ayrılmış worker şartı da dağıtım notuna eklenmeli.

Kaynak dayanakları: `frappe/frappe/utils/background_jobs.py:44`; `frappe/frappe/utils/background_jobs.py:47`; `frappe/frappe/utils/background_jobs.py:252`; `frappe/frappe/utils/background_jobs.py:254`; `frappe/frappe/utils/background_jobs.py:653`; `frappe/frappe/core/doctype/rq_job/rq_job.py:310`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:75`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation`.

### jobs-3 — Yeniden deneme, artan bekleme ve başarısız işler kuyruğu.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

enqueue, RQ retry parametresini aktarıyor (rq==2.6.1 sabit). Başarısız işler RQ failed registry'de 7 gün ve en fazla 1000 kayıt tutuluyor; Scheduled Job Log Failed kayıtları 90 gün sonra temizleniyor. Bu yapı kalıcı bir dead-letter değil. Kritik risk: worker RQ scheduler'ı her zaman kapatıyor. Aralıklı (backoff) retry'ın scheduled registry'den yeniden kuyruğa alınması bu nedenle doğrulanmalı. Talimat bu bağımlılığı anmıyor.

Eksik:

- with_scheduler=False iken RQ Retry(interval=[...]) ile backoff'un çalışıp çalışmadığı belirsiz. Kaynak parçası yetersiz, çalıştırılarak da doğrulanmadı.
- Geçici ve kalıcı hata sınıflandırması, deneme üst sınırı ve backoff dizisi tanımlı değil.
- Dead-letter saklama süresi ve sahibi tanımsız. RQ failure TTL ve 1000 limiti, ayrıca remove_failed_jobs toplu silmesi incelenebilirlik ölçütüyle çelişebilir.
- Kiracı bağlamının (site) retry sırasında korunması kabul ölçütünde yer almıyor.

Nasıl tamamlanır: Önce kaynakta frappe.enqueue retry yolu ile FrappeWorker scheduler ilişkisi okunmalı. Ardından job-state--implementation'a retry politikası tablosu eklenmeli: hata sınıfı, max deneme, aralıklar. Kalıcı hatalar mevcut Error Log'a ya da izinli bir Frappe DocType'a yazılmalı. Bunun için ayrı kuyruk altyapısı önerilmiyor.

Kaynak dayanakları: `frappe/frappe/utils/background_jobs.py:258`; `frappe/frappe/utils/background_jobs.py:456`; `frappe/frappe/utils/background_jobs.py:37`; `frappe/frappe/utils/background_jobs.py:38`; `frappe/frappe/core/doctype/rq_job/rq_job.py:281`; `frappe/frappe/core/doctype/scheduled_job_log/scheduled_job_log.py:30`; `frappe/pyproject.toml:72`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation`.

### jobs-4 — İş iptali, ilerleme, kaldığı yerden devam ve elle yeniden çalıştırma.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta yalnız System Manager'a açık zorla durdurma (send_stop_job_command) var; UI metni bu işlemi kendisi 'tehlikeli' olarak niteliyor. Scheduled Job Type için Execute ve Skip Next Execution aksiyonları da mevcut. Güvenli noktada iptal, checkpoint/devam ve ilerleme sözleşmesi görülmedi. RQ sonuçları 10 dakika saklanıyor, bu yüzden kalıcı iş durumu yok. Kabul ölçütü doğru, ama idempotency anahtarı ve durum modeli eksik.

Eksik:

- Kooperatif iptal (iptal bayrağının iş içinde kontrol edilmesi) ile zorla durdurma arasındaki ayrım tanımlanmamış.
- Checkpoint/ilerleme kaydının nerede tutulacağı belirsiz. RQ_RESULTS_TTL 10 dakika; kalıcı durum için izinli bir Frappe DocType kararı gerekiyor.
- Elle tekrar çalıştırmada başarılı adımların çoğalmasını önleyecek idempotency anahtarı ve job_id tekilleştirme kuralı yazılmamış.
- İptal/yeniden çalıştırma yetkisi yalnız System Manager'da. Kiracı yöneticisi için izin modeli ve ui-family-32 ilerleme yüzeyinin API sözleşmesi tanımsız.
- İlerleme yayını için kullanılacak realtime yardımcısı kaynak parçalarında görülmedi (unknown).

Nasıl tamamlanır: job-state--implementation için tek bir durum sözleşmesi yazılmalı: kalıcı iş kaydı (DocType izinleri), adım checkpoint'i, cancel_requested bayrağı ve idempotency anahtarı. Zorla durdurma (stop_job) yalnız son çare olarak bırakılmalı. ui-family-32 bu sözleşmeyi salt okuma/aksiyon olarak tüketmeli.

Kaynak dayanakları: `frappe/frappe/core/doctype/rq_job/rq_job.py:7`; `frappe/frappe/core/doctype/rq_job/rq_job.py:32`; `frappe/frappe/core/doctype/rq_job/rq_job.js:16`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:7`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:13`; `frappe/frappe/utils/background_jobs.py:39`; `frappe/frappe/core/doctype/rq_job/rq_job.py:25`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation`.

### jobs-5 — Tekrarlı çalıştırmada mükerrer etkiyi önleme ve görev kilidi.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni doğru hedefi koyuyor: iki worker ya da tekrar çalıştırmada tek iş etkisi olmalı, kilit çökmeden sonra serbest kalmalı. Kaynakta yalnız kuyruk düzeyinde tekilleştirme var: Scheduled Job Type sabit bir rq_job_id kullanıyor ve önce kuyrukta var mı diye bakıp sonra ekliyor. Scheduler süreç kilidi ise bench düzeyinde bir FileLock. Bunlar iş etkisini tekilleştirmiyor. Talimatta idempotency anahtarı, etki kaydı ve kilit kapsamı/süresi sözleşmesi yok.

Eksik:

- İdempotency anahtarı ve etki defteri (effect ledger) sözleşmesi tanımlı değil: hangi job türleri, anahtar neyden türetilir, saklama süresi ne olacak.
- Kilidin kapsamı (site/kiracı/kayıt), lease TTL değeri ve çökme sonrası serbest bırakma davranışı belirtilmemiş.
- is_job_enqueued yalnız kuyruktaki varlığa bakıyor; 'kontrol et, sonra ekle' yarışı ve retry sonrası ikinci etki kapsanmıyor.
- Ana görev job-state--implementation ile ui-family-32 arasındaki sorumluluk sınırı belirsiz.
- v17 kaynağındaki uygulama düzeyi kilit yardımcıları bu excerpt'te görünmüyor; bu yüzden unknown.

Nasıl tamamlanır: job-state--implementation içinde site/tenant ve iş anahtarıyla idempotency kaydı tanımla. DB etkisi dedup kaydıyla aynı transaction içinde kesinleşsin; dış etkiler mevcut outbox/inbox sözleşmesine bağlansın. enqueue_after_commit yalnız zamanlama mekanizmasıdır; tek başına kalıcı teslim veya tek etki garantisi değildir. Yerel kilit yardımcısının kapsam/TTL davranışını doğrula ve mevcut job_id tekilleştirmesini koru.

Kaynak dayanakları: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:113`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:87`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:109`; `frappe/frappe/utils/background_jobs.py:257`; `frappe/frappe/utils/scheduler.py:52`; `frappe/frappe/utils/scheduler.py:64`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation`.

### jobs-6 — Saat dilimi, yaz saati değişikliği ve kaçırılan tetiklemeler.

Kaynak durumu: **KISMİ**. Asıl aşama: `mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Cron ayrıştırma var ve sonraki çalışma last_execution'dan hesaplanıyor. Bu, kesintiden sonra kaçırılan tetiklemelerin tek bir çalışmada birleşmesi (coalesce) gibi görünüyor; ancak bu çalışma zamanında doğrulanmadı. Automation engine de yalnız en son tetiklemeyi kuyruğa alıyor. Saat hizası UTC'ye göre yapılıyor, vade karşılaştırması ise now_datetime() ile. Kabul metnindeki 'beklenen sayıda çalışma' tanımsız ve catch-up politikası verilmemiş.

Eksik:

- Catch-up politikası (coalesce/atla/tekrar oynat) ürün kararı olarak yazılmamış. Native davranış coalesce'e benziyor; bu davranışla eşleştirilmeli.
- DST ileri/geri geçişinde duvar saati cron'unun kaç kez çalışacağı ve croniter'ın naive datetime davranışı hakkında talimat yok.
- Saat dilimi kaynağı belirtilmemiş: sistem saat dilimi mi, kiracı saat dilimi mi? UTC tick ile sistem saat dilimine göre vade arasındaki fark ele alınmamış.
- Kaynak gözlemi: maintenance_offset 153. satırda ekleniyor ama 154. satırda dönen değerde kullanılmıyor. Bunun etkisi doğrulanmadı.
- Skip Next Execution eylemi var, ancak talimat bu eylemi politikaya bağlamıyor.

Nasıl tamamlanır: native-schedule--implementation görevine üç kararı ekleyin: catch-up = coalesce (native ile eşleşiyor), DST çift saatte tek çalışma, saat dilimi = sistem saat dilimi (kiracı TZ gerekiyorsa açıkça işaretlenmeli). Ardından bu üç senaryoyu ortak test bütçesindeki tek dosyada aday olarak not edin; şimdi test yazmayın.

Kaynak dayanakları: `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:149`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:154`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:106`; `frappe/frappe/utils/scheduler.py:107`; `frappe/frappe/automation_engine/scheduler.py:19`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.json:13`.

Rehber: [native-schedule](./frappe-roadmap-contracts/native-schedule.json). Mevcut birincil görev: `native-schedule--implementation`.

### jobs-7 — Kiracılar arasında adil kuyruk ve kaynak kullanımı.

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kaynakta temel parçalar var: global kuyruk tavanı, starvation eşiği, dequeue stratejisi, özel kuyruklar, site sırasının karıştırılması ve site bazlı bakım ofseti. Ancak kiracı başına adil paylaşım garantisi yok. Talimat 'kiracı'nın Frappe site'ı mı yoksa site içi bir kayıt mı olduğunu tanımlamıyor. SLO değeri ve ölçüm yöntemi de verilmemiş.

Eksik:

- Kiracı modeli (site başına kiracı mı, site içi kiracı mı) bağlanmamış. Adil zamanlama tasarımı tamamen buna bağlı.
- Küçük kiracı için bekleme SLO'sunun sayısal değeri, yük profili ve kiracı başına kota/eşzamanlılık sınırı tanımsız.
- MAX_QUEUED_JOBS global bir sınır; yoğun kiracı diğerlerinin enqueue çağrılarını başarısız yapabilir. Talimat bunu ele almıyor.
- Var olan custom queue/worker ve dequeue strategy seçeneklerinin hangisinin yeniden kullanılacağı belirtilmemiş.

Nasıl tamamlanır: Önce kiracı = site kararını açıkça yazın. Sonra job-state--implementation-scale görevine kiracı başına kuyruk/eşzamanlılık sınırı ve SLO sayısını ekleyin. Mevcut özel kuyruklar ve dequeue strategy yeniden kullanılmalı; yeni altyapı önerilmiyor.

Kaynak dayanakları: `frappe/frappe/utils/background_jobs.py:44`; `frappe/frappe/utils/background_jobs.py:47`; `frappe/frappe/utils/background_jobs.py:438`; `frappe/frappe/utils/scheduler.py:167`; `frappe/frappe/core/doctype/scheduled_job_type/scheduled_job_type.py:124`; `frappe/frappe/core/doctype/rq_job/rq_job.py:310`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation-scale`.

### jobs-8 — Kullanıcı arka plan işleri merkezi; sayfadan bağımsız ilerleme, sonuç, güvenli iptal ve devam.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul metni güçlü: durumlar, sahte yüzde yasağı, iptal/devam, tenant ve indirme yetkisi tanımlı. Ancak native RQ Job yalnız System Manager'a açık, sanal ve periyodik temizlenen bir görünüm. Sonuç TTL'i 10 dakika ve durdurma işlemi 'tehlikeli zorla sonlandırma'. Kullanıcıya ait kalıcı iş kaydının, ilerleme olayının ve kooperatif iptalin sözleşmesi talimatta yok.

Eksik:

- Kalıcı iş kaydının modeli tanımsız: mevcut native kalıcı kayıtlar mı eşlenecek, yeni DocType mı gerekecek? Data Import, Prepared Report gibi doctypes bu excerpt'te görünmüyor; v17'de doğrulanmalı.
- İlerleme olayının sözleşmesi tanımsız: realtime kanal mı polling mi, 'total bilinmiyor' durumu nasıl gösterilecek? Bu excerpt'te ilerleme API'si görünmüyor (unknown).
- Güvenli iptal tanımlanmamış: native stop_job zorla sonlandırma yapıyor. Kooperatif iptal ve checkpoint'ten devam sözleşmesi yok.
- Sonuç saklama süresi ile RQ_RESULTS_TTL (10 dk) arasındaki fark ve indirme yetkisinin DocType permission'a bağlanması belirtilmemiş.
- Headless liste uç noktasının native permissions ile mi, kullanıcı sahipliği ile mi filtreleneceği yazılmamış. System Manager'a özel RQ Job API'si son kullanıcıya açılmamalı.

Nasıl tamamlanır: job-state--implementation-post-mvp kapsamında önce v17 kaynağındaki native kalıcı iş kayıtlarını ve ilerleme yayınlama API'sini envanterleyin. Ardından tek bir iş-kaydı sözleşmesi yazın (owner, tenant, durum, gerçek ilerleme, sonuç dosyası yetkisi, saklama süresi) ve native permissions'a bağlayın. İptal yalnız kooperatif olmalı; RQ Job'un zorla durdurma işlemi kullanıcıya sunulmamalı.

Kaynak dayanakları: `frappe/frappe/core/doctype/rq_job/rq_job.py:32`; `frappe/frappe/core/doctype/rq_job/rq_job.js:9`; `frappe/frappe/core/doctype/rq_job/rq_job.js:16`; `frappe/frappe/utils/background_jobs.py:39`; `frappe/frappe/core/doctype/rq_job/rq_job.py:25`; `frappe/frappe/core/doctype/rq_job/rq_job.py:304`.

Rehber: [job-state](./frappe-roadmap-contracts/job-state.json). Mevcut birincil görev: `job-state--implementation-post-mvp`.

### usage-1 — Dosya yükleme, AI (Artificial Intelligence — yapay zekâ) kredisi ve trafik limitleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve eşzamanlılık kabulü tanımlı. Kaynakta zaman pencereli sayaç primitifleri var. Çekirdek site limiti istek süresini (mikrosaniye) ölçüyor; ölçüm site genelinde tutuluyor, kiracı ya da plan bazında tutulmuyor. Suite içinde Anthropic bağımlılığı var. Ancak AI kredi defteri veya bayt bazlı trafik sayacı incelenen kaynakta görülmedi. Dosya boyutu sınırının kaynağı bu alıntılarda yok, bu yüzden bilinmiyor.

Eksik:

- AI kredi birimi (token/istek/model ağırlığı), rezervasyon, iade ve idempotency sözleşmesi yok.
- Hosting trafiğinin nerede ölçüleceği (proxy/CDN ya da Frappe) ve faturalamadan ayrımı tanımsız.
- Drive'ın File override'ı ile çekirdek max_file_size'tan hangisinin yaptırım noktası olacağı belirtilmemiş.
- Site sayacı önce okuyup sonra karar veriyor (oku-karşılaştır). Eşzamanlı istekte aşım riski var ama kabul bunu adlandırmıyor.
- Redis sayacı kalıcı değil. Kalıcı defter ile hız sınırı arasındaki ayrım yazılmamış.
- Frappe 17.0.0-dev ve suite >=16 eşlemesi yapılmamış.

Nasıl tamamlanır: usage-ledger--implementation altında kiracı kimliği, birim, dönem ve rezervasyon/iade sözleşmesini tek sayfada tanımla. AI için atomik rezervasyonu kalıcı defter satırında kilitle. Trafik ölçüm noktasını Hüseyin Cengiz'e devredilecek altyapı gereksinimi olarak ayır. Dosya sınırını mevcut File override noktasında doğrula.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:55`; `frappe/frappe/rate_limiter.py:79`; `suite/pyproject.toml:32`; `suite/suite/hooks.py:196`; `suite/pyproject.toml:45`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-2 — Kullanıcı, şirket, çalışma alanı, kayıt ve depolama kotaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

İki eşzamanlı istekte son koltuk kabulü anlamlı. Kaynakta yalnız şu primitifler var: site DB boyutu raporu (System Manager), Mail'in salt okunur JMAP sanal Quota'sı ve depolama göstergesi, satır kilitli get_doc. Koltuk, kayıt veya çalışma alanı kotası için yaptırım görülmedi. 'Şirket' kavramı ERPNext'e ait ve bu sitede kurulu değil.

Eksik:

- Kiracı modeli (site başına mı, site içi mi) ve 'çalışma alanı/şirket' varlığı tanımsız. ERPNext Company kullanılamaz.
- Koltuk sayım kuralı (aktif System User, Website User, Guest) belirtilmemiş.
- Yaptırım noktası (before_insert/doc_events) ve kilit stratejisi (kota satırında for_update) eksik.
- Depolama kaynakları (File, Drive S3, Mail JMAP) için tek ölçüm sözleşmesi yok. Mail Quota'sı dış sunucudan salt okunur geliyor.
- İzinler native DocType izinleriyle yönetilmeli. ignore_permissions yolu açılmamalı; bu not edilmemiş.

Nasıl tamamlanır: Kiracı ve sayılabilir varlık tanımını ve koltuk sayım kuralını karara bağla. Ardından tek kota satırını for_update ile kilitleyen before_insert yaptırımını usage-ledger görevi kapsamında tasarla. Depolama için File ve Drive boyut kaynağını seç.

Kaynak dayanakları: `frappe/frappe/core/report/database_storage_usage_by_tables/database_storage_usage_by_tables.py:25`; `suite/suite/mail/doctype/quota/quota.json:142`; `suite/suite/mail/doctype/quota/quota.py:107`; `suite/frontend/src/apps/mail/composables/useQuota.ts:28`; `frappe/frappe/api/v1.py:56`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-3 — API (Application Programming Interface — uygulama programlama arayüzü) çağrısı ve entegrasyon kotaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul, süre bütçesi ile çağrı adedini doğru biçimde ayırıyor. Kaynakta üç parça var. Çekirdekteki site süre bütçesi 429 döndürüyor. rate_limit dekoratörü atomik incrby ile adet sayıyor ve user_based seçeneği sunuyor. Suite'in Rate Limit DocType'ı metot bazlı dinamik limit sağlıyor. Ancak dinamik limit yalnız dekore edilmiş metotlara uygulanıyor. Genel /api/resource CRUD yolunda adet limiti görülmedi. Anahtar IP, kullanıcı veya alan değeri; kiracı ya da plan değil.

Eksik:

- Hangi uçların sayılacağı belirsiz: v1/v2 resource, method, webhook ve giden entegrasyonlar.
- Kota kimliği (API key/kullanıcı/kiracı) ve plan eşlemesi tanımsız.
- Suite Rate Limit DocType'ının yeniden kullanılıp kullanılmayacağı kararı yok. DocType yalnız System Manager'a açık; create_rate_limit ignore_permissions ile ekliyor ve dışa açılmamalı.
- Dekoratör reddedilen çağrıyı da sayıyor. Dönem sıfırlama setex TTL'ine dayanıyor; takvim dönemi olarak tanımlanmamış.
- RateLimitExceededError ile TooManyRequestsError arasındaki HTTP durum kodu ve başlık sözleşmesi belirtilmemiş.

Nasıl tamamlanır: Sayılacak uç listesini ve kota anahtarını (kiracı + API key) belirle. Mevcut rate_limit/dynamic_rate_limit desenini kiracı anahtarlı bir limit fonksiyonuyla genişletme kararını yaz. 429 ile Retry-After/Reset başlık sözleşmesini usage-ledger kabulüne ekle.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:101`; `frappe/frappe/rate_limiter.py:182`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:126`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/api/v1.py:50`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-4 — Otomasyon, eşzamanlı görev, işlem süresi ve bildirim gönderim kotaları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

'Komşuyu aç bırakmama' kabulü anlamlı. Ancak kaynaktaki primitifler kiracı adil kuyruğu sağlamıyor. concurrent_limit fonksiyon başına Redis semaforu kullanıyor, arka plan işlerinde atlanıyor ve 503 döndürüyor. Kuyruk seçimi ile deduplicate enqueue'da mevcut. Suite Rate Limit değer bazlı (ör. e-posta önceliği) limit destekliyor. Worker/scheduler kaynağı bu alıntılarda yok, bu yüzden bilinmiyor.

Eksik:

- Kiracılar RQ worker'larını paylaşıyor mu, kuyruk izolasyonu nasıl olacak; tanımsız.
- Eşzamanlılık anahtarı fonksiyon adı; kiracı değil. Arka plan işleri kapsam dışında kalıyor.
- İşlem süresinin ölçüm noktası ve hata sözleşmesi (429/503/iş reddi) belirtilmemiş.
- Bildirim kanalları (e-posta/push/SMS) ve dönem tanımı yok.
- concurrent_limit yerel 17-dev kaynağında var. Suite >=16 beyan ediyor; v16 eşlemesi doğrulanmadı.

Nasıl tamamlanır: Kiracı başına enqueue kabul kontrolünü ve iş süresi muhasebesini usage-ledger altında tanımla. Bildirim gönderimi için mevcut değer bazlı Rate Limit desenini kiracı anahtarıyla kullanmayı değerlendir. Worker topolojisi kararını Hüseyin Cengiz'e teknik devir olarak ayır.

Kaynak dayanakları: `frappe/frappe/concurrency_limiter.py:100`; `frappe/frappe/concurrency_limiter.py:107`; `frappe/frappe/concurrency_limiter.py:115`; `frappe/frappe/core/report/database_storage_usage_by_tables/database_storage_usage_by_tables.py:74`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.json:105`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-5 — Kullanım ölçümü, dönemsel sıfırlama, eşik uyarıları ve aşım kuralları.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütleri anlamlı: dönem sınırı, gecikmiş/tekrarlanan olay ve tek seferlik eşik uyarısı tanımlı. Kaynakta yalnız istek hızı sınırlayıcıları var: Frappe rate_limit ve Suite Rate Limit DocType. Bunlar Redis TTL sayaçlarıdır; kalıcı ve denetlenebilir bir tüketim defteri değildir. Mail Quota, harici JMAP verisini salt okunur sanal DocType olarak gösteriyor. Ön yüzdeki %80 eşiği yalnız görsel bir uyarı.

Eksik:

- Ölçüm olayı sözleşmesi yok: kiracı, özellik, miktar, idempotency anahtarı, olay zamanı ve dönem alanları tanımlı değil.
- Dönem tanımı yok: takvim ayına mı yoksa abonelik başlangıcına mı dayandığı ve gecikmiş olayın hangi döneme yazılacağı belirsiz.
- Aşım politikası seçilmemiş: engelleme, yumuşak limit ya da ücretlendirme seçeneklerinden hangisinin uygulanacağı belli değil. Eşik uyarısının tekilliğini sağlayacak mekanizma da belirtilmemiş.
- Kaynak olarak ERPNext Subscription gösteriliyor, ancak ERPNext bu sitede kurulu değil; native destek varsayılamaz.
- Redis rate_limit sayaçlarının fatura tüketimi için yeniden kullanılamayacağı talimatta açıkça yazmıyor.

Nasıl tamamlanır: Mevcut usage-ledger--implementation görevi içinde önce bir Usage Event DocType sözleşmesi yazılmalı. Bu sözleşmede (kiracı, özellik, idempotency_key) üzerinde benzersizlik kısıtı ve event_time/period alanları bulunmalı; kısıt, Rate Limit'teki add_unique örüntüsü izlenerek kurulabilir. Eşik uyarısı ve aşım politikası alanları ayrıca tanımlanmalı. Rate limiter yalnız trafik koruması olarak kalmalı.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:180`; `frappe/frappe/rate_limiter.py:182`; `suite/suite/mail/doctype/quota/quota.json:142`; `suite/suite/mail/doctype/quota/quota.py:35`; `suite/frontend/src/apps/mail/composables/useQuota.ts:48`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-6 — Krediyi ayırma, tüketme ve başarısız işlemde iade etme.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü idempotent tüketimi ve tek seferlik iadeyi doğru hedefliyor. Kaynakta yalnız yapı taşları var: satır kilidi (for_update), benzersiz kısıt (add_unique) ve Redis semaforu. Reserve, consume ve refund durumlarını yöneten bir kredi defteri kaynakta görülmedi.

Eksik:

- Durum makinesi tanımsız: reserved→consumed ya da reserved→released geçişleri ve geçersiz geçişlerin reddi belirtilmemiş.
- Çöken iş veya zaman aşımı durumunda rezervasyonun nasıl serbest bırakılacağı tanımlı değil.
- Defterin append-only mi olacağı, yoksa bakiye satırı mı tutulacağı kararlaştırılmamış. Kilitleme stratejisi de belirtilmemiş.
- usage-reservation--implementation ile usage-ledger--implementation arasındaki sorumluluk sınırı belirsiz.
- Kredi mutasyonunun genel REST create/update yolundan değil, yalnız sunucu tarafı servis yolundan yapılacağı belirtilmemiş. Kaynaktaki ignore_permissions=True kullanan yardımcı örüntüsü dışarı açılmamalı.

Nasıl tamamlanır: usage-reservation--implementation içinde append-only bir Credit Ledger Entry sözleşmesi tanımlanmalı. Benzersizlik (kiracı, operation_key, entry_type) üzerinde olmalı; bakiye for_update kilidi altında hesaplanmalı. Durum geçiş tablosu ve rezervasyon TTL'i yazılmalı. Doğrudan /api/resource yazımı DocType izinleriyle kapatılmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:56`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`; `frappe/frappe/concurrency_limiter.py:109`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:105`; `frappe/frappe/api/v1.py:50`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-7 — Kiracı ve özellik bazlı maliyet; harcama üst sınırı ve anlık durdurma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (gecikmeli maliyet, eşzamanlılık, yeni ücretli işin durdurulması) tanımlı. Ancak kaynaktaki tüm limiter'lar HTTP isteği yoksa devre dışı kalıyor. Arka plan işleri ve iç çağrılar sınırlanmıyor, bu yüzden bu limiter'lar harcama durdurucu olarak kullanılamaz. Suite'te AI Assist için anthropic bağımlılığı var, yani gerçek bir ücretli maliyet kaynağı mevcut. Bunu tenant ve özellik bazında ölçen bir defter kaynakta görülmedi.

Eksik:

- Uygulama noktası tanımsız: tavan kontrolünün enqueue öncesinde mi, harici ücretli çağrı öncesinde mi yapılacağı belirtilmemiş; arka plan işlerinin de kapsanması gerekiyor.
- Maliyet kaynağı ve birimi tanımlı değil: token, süre ya da depolama gibi birimlerin fiyat tablosuna nasıl bağlanacağı yazılmamış.
- Kiracı kimliği modeli belirsiz: site başına kiracı mı, site içinde kiracı mı olacağı kararlaştırılmamış.
- Durdurma bayrağının atomik okunması ve önbellek geçersizleştirmesi tanımlı değil; mevcut Rate Limit clear_cache örüntüsü bunun için yeterli değil.
- Eşzamanlı çağrılarda tavan aşımının (overshoot) kabul edilen toleransı belirtilmemiş.

Nasıl tamamlanır: usage-ledger--implementation altında tek bir sunucu tarafı guard sözleşmesi tanımlanmalı. Bu guard enqueue'dan ve ücretli harici çağrıdan önce çalışmalı, istek bağlamından bağımsız olmalı ve usage-6'daki rezervasyonu kullanmalı. İlk kapsam somut maliyet kaynağı olan Sheets AI Assist ile sınırlandırılmalı.

Kaynak dayanakları: `frappe/frappe/rate_limiter.py:142`; `suite/suite/utils/rate_limiter.py:25`; `frappe/frappe/concurrency_limiter.py:100`; `suite/pyproject.toml:32`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### usage-8 — Ön ödemeli kredi veya ek kota satın alma; bakiye yükleme, geçerlilik ve iade uzlaştırması.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream frappe kaynağında frappe/frappe/integrations/frappe_providers/cloud_billing.py ve cloud_settings.py var. Bunlar, Frappe Cloud/Atlas'ta barındırılan sitenin cüzdan bakiyesi yükleme (create_topup_checkout), checkout durumu, plan, ödeme yöntemi ve özet çağrılarını Central billing API'ye ileten ince bir HTTP proxy'sidir. Uçlar whitelisted'dır. Erişim yalnız pilot_endpoint ve pilot_auth_token tanımlıysa ve kullanıcı System Manager ise açılır (_assert_access). Bakiye ve kredi mantığı yerelde değil, harici Central'dadır. Bu yetenek, hosting sağlayıcısının siteye kestiği faturadır; SaaS kiracılarına kredi satan bir defter değildir. Genel yapı taşları da var: Integration Request DocType ve create_request_log harici istek ve bildirim kaydını tutar. Bu kayıtta request_id ve status alanları var ama request_id benzersiz değil. frappe.db.add_unique ile kompozit benzersizlik kalıbı da kullanılabilir (örnek: suite Rate Limit). Suite Python kodunda kredi, cüzdan, ödeme veya iade uygulaması yok. Suite frontend'deki topUp eşleşmeleri mail sayfalamasına ait. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kiracı başına yetkili kredi defteri yok: grant/consume/expire/clawback hareket türleri ve bakiye türetimi bulunmuyor.
- Gelen ödeme sağlayıcısı webhook alıcısı yok; imza doğrulama ve replay koruması da yok.
- provider_event_id benzersizliği yok, dolayısıyla 'aynı ödeme bildirimi = tek bakiye artışı' garantisi yok. Integration Request.request_id benzersiz değil.
- Kredi kaynağı ve son kullanma tarihi takibi, düşüm sırası (FIFO veya son kullanma önceliği) ve süresi dolan kredinin kaydı yok.
- Ödeme iadesi ile tüketilmiş kredi arasındaki uzlaştırma kuralı yok.
- Para birimi, ondalık hassasiyet ve kredi birimi dönüşümü yok.
- Kiracı izolasyonlu bakiye ve hareket okuma için headless provider sözleşmesi yok.
- Cloud billing proxy Frappe Cloud'a bağlı, System Manager'a özel ve site düzeyinde. SaaS kiracı faturalaması için yeniden kullanılamaz.
- Ödeme sağlayıcısı seçimi ve tüketilmiş kredi iade politikası henüz kullanıcı kararı olarak işaretlenmemiş.

Nasıl tamamlanır: Mevcut bağımlılık sırası korunmalı. İlk adım, usage-ledger--contract ve usage-ledger--schema kapsamında aynı defterde hareket türlerini (grant, consume, expire, clawback) tanımlamak. Her hareket şu alanları taşımalı: tenant, amount (Decimal), currency/unit, source_ref, expires_at. Ardından bu defterde (tenant, provider, provider_event_id) üzerine frappe.db.add_unique kısıtı konmalı. Tek ve dar ilk davranış şu olmalı: aynı provider_event_id ile gelen ikinci grant, ikinci bakiye artışı üretmesin. Bunun için gerçek RED/GREEN kanıtı gerekli. Sonra sırasıyla şunlar gelir: kiracı kapsamlı bakiye okuma ucu (headless provider sözleşmesi), expire işi, clawback ve iade kuralı. İade kuralı ve sağlayıcı webhook imza doğrulaması, kullanıcı sağlayıcıyı ve iade politikasını seçtikten sonra yapılmalı. Webhook ham kaydı için Integration Request yeniden kullanılabilir. cloud_billing proxy'si bu iş için kullanılmamalı.

Kaynak dayanakları: `frappe/frappe/integrations/frappe_providers/cloud_billing.py:3`; `frappe/frappe/integrations/frappe_providers/cloud_billing.py:73`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:12`; `frappe/frappe/integrations/frappe_providers/cloud_settings.py:129`; `frappe/frappe/integrations/doctype/integration_request/integration_request.json:90`; `suite/suite/suite_core/doctype/rate_limit/rate_limit.py:149`.

Rehber: [usage-ledger](./frappe-roadmap-contracts/usage-ledger.json). Mevcut birincil görev: `usage-ledger--implementation`.

### content-1 — CMS (Content Management System — içerik yönetim sistemi) ve yardım bilgi bankası.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Hedef ve kabul ölçütü (taslak sızmasın, doğru dil/rota) anlamlı. Ancak talimat version-15 Web Page şemasına dayanıyor; yerel ortam 17.0.0-dev. Helpdesk bilgi bankası kurulu değil. Kaynakta okuma izni ve alan düzeyi okuma izni denetlenen REST okuma ilkelleri var. Web Page şeması ise bu kesitlerde görülmedi. Suite hooks dosyasında '/api/' joker reddi tanımlı; headless içerik API'sinin bu engel listesinden nasıl geçeceği talimatta yazmıyor.

Eksik:

- Web Page şemasındaki published/route/dil alanlarının v17-dev karşılığı doğrulanmamış; kaynak version-15.
- Helpdesk kurulu değil. Yardım bilgi bankasının Web Page ile mi yoksa ayrı bir uygulamayla mı kurulacağına karar verilmemiş.
- Guest/website kullanıcısının yalnız yayımlanmış kayda erişmesini sağlayacak izin veya sorgu koşulu sözleşmesi tanımlı değil.
- Suite'teki '/api/' joker reddi ve izin listesi ile headless içerik uç noktası arasındaki ilişki belirsiz.
- Blog Post'a bağlı Writer dışa aktarma, kurulu olmayan blog uygulamasına bağlı; CMS kaynağı olarak sayılamaz.

Nasıl tamamlanır: native-web-page--implementation görevine şunlar eklenmeli: v17-dev Web Page alan eşlemesi (published, route, dil), Guest için yalnız yayımlanmış kayıtları döndüren yerel izin veya permission_query_conditions kuralı ve '/api/' izin listesi kararı. Helpdesk 'kurulu değil' olarak işaretlenmeli; yardım içeriği ilk aşamada Web Page üzerinden ele alınmalı.

Kaynak dayanakları: `frappe/frappe/api/v1.py:83`; `frappe/frappe/api/v1.py:84`; `suite/suite/hooks.py:466`; `suite/suite/hooks.py:419`; `suite/suite/writer/api/docs.py:142`; `suite/pyproject.toml:45`.

Rehber: [native-web-page](./frappe-roadmap-contracts/native-web-page.json). Mevcut birincil görev: `native-web-page--implementation`.

### content-2 — SEO (Search Engine Optimization — arama motoru optimizasyonu).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (title, canonical, indekslenebilir sunucu çıktısı) somut. Ancak seçilen web mimarisi Vite/PWA ve TanStack Router; sunucu tarafı render veya prerender stratejisi seçilmemiş. Kaynakta yalnız rota kuralları ve home_page ilkelleri görülüyor. Suite tüm önekleri, istemci tarafında yönlendirilen bir SPA'ya bağlıyor; ayrıca home_page='suite'. Bu yapı herkese açık site köküyle çakışabilir. Website Settings SEO alanları bu kesitlerde yok.

Eksik:

- Görev eşlemesi çelişkili: değerlendirme 'external/build' diyor, birincil görev ise native-web-page--implementation.
- SSR, prerender veya edge render kararı ve sahibi tanımsız; PWA SPA çıktısı tek başına kabul ölçütünü karşılamaz.
- sitemap, robots, hreflang ve noindex (taslak/özel sayfa) kuralları tanımlı değil.
- Herkese açık kök rota ile suite home_page/SPA rotaları arasındaki sınır belirlenmemiş.
- Website Settings için v17-dev alan eşlemesi yok; kaynak version-15.

Nasıl tamamlanır: content-2 için mevcut görev kimliği korunarak tek bir render kararı yazılmalı: herkese açık sayfalar için prerender veya SSR. Bunun yanında rota başına title/canonical veri sözleşmesi ve sitemap/robots/noindex kuralları eklenmeli; home_page çakışması da karara bağlanmalı. Birincil görev eşlemesindeki çelişki giderilmeli.

Kaynak dayanakları: `suite/suite/hooks.py:44`; `suite/suite/hooks.py:65`; `suite/suite/hooks.py:47`.

Rehber: [native-web-page](./frappe-roadmap-contracts/native-web-page.json). Mevcut birincil görev: `native-web-page--implementation`.

### content-3 — Programmatic SEO (veri/şablonla ölçekli arama odaklı sayfa üretimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `scale`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de kayıt başına sayfa üretimi için temel parça var. WebsiteGenerator (frappe/frappe/website/website_generator.py), yayın koşulu sağlandığında başlık alanından slug üretip `route` alanına yazar (en fazla 139 karakter, meta.route öneki eklenir). Yayın durumunu is_published_field veya website.condition_field ile denetler; update/trash sırasında Google indexing isteğini kuyruğa alır. DocType.validate, has_web_view açık olan DocType'larda `route` alanını zorunlu tutar ve şablon boilerplate'i üretir. DocumentPage renderer, route ve yayın filtresiyle belgeyi bulur; yayınlanmamış kayıt bu yoldan render edilmez. sitemap.py yalnız guest erişimine açık, yayın koşulu tanımlı ve yayınlanmış kayıtları sitemap'e ekler; robots_txt'nin engellediği ve dinamik route'ları dışarıda bırakır. Website Route Meta ise route bazında meta etiketi tutar. Benzersizlik yalnız alan düzeyinde: örneğin Web Page `route` alanı `unique: 1`. Suite (Vue frontend + Python) içinde has_web_view veya WebsiteGenerator kullanan bir DocType bulunamadı; tek SEO izi statik `www/event_rsvp.html` sayfasındaki noindex meta etiketi. Guest kullanıcıyı reddeden bir yol var. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Programmatic SEO için kaynak DocType ve şablon/veri kümesi yok; ne Suite'te ne planlanan Frappe adaptörü'da has_web_view DocType tanımlı.
- Veri kalitesi eşiği yok: zorunlu alan/minimum içerik kontrolü olmadan yayın engeli tanımlı değil. Mevcut kapı yalnız tek bir boolean yayın alanı.
- DocType'lar arası route çakışması kontrolü yok. _find_matching_document_webview ilk eşleşen DocType'ı döndürüyor; benzersizlik yalnız DocType bazında unique alan bayrağına bağlı. Slug değişiminde redirect üretimi de WebsiteGenerator içinde yok.
- Frappe şablonlarında (py/html) rel=canonical üretimi bulunamadı; kayıt bazında canonical URL ve noindex politikası yok.
- Headless React/AntDesign frontend için route→kayıt çözümleyen, yayın/kalite kapısı uygulayan ve canonical/sitemap verisi dönen provider API sözleşmesi yok.
- content-2 render/sitemap kararına bağımlılık canonical görev bağımlılıklarında yazılı değil (talimat düzeyi boşluk).
- functionalAcceptance not_run: örnek veri kümesiyle benzersiz canonical rota üretimi çalıştırılarak doğrulanmadı.

Nasıl tamamlanır: Mevcut programmatic-seo--contract görevinin içinde en küçük adım ve sıra şöyle: (1) Tek bir pilot kaynak DocType seçilir; has_web_view, is_published_field ve unique `route` alanı tanımlanır, WebsiteGenerator yeniden kullanılır. (2) Controller validate adımına zorunlu alan/minimum içerik kontrolü eklenir; eşik sağlanmazsa yayın bayrağı reddedilir. Önce bunun için RED testi yazılır. (3) Uygulama düzeyinde DocType'lar arası route çakışma kontrolü eklenir. (4) Headless tüketim için route→kayıt çözümleyen, yalnız yayınlanmış ve kaliteli kaydı canonical URL ile döndüren tek bir salt-okunur provider endpoint'i eklenir; sitemap.py çıktısı yeniden kullanılır. React tarafı content-2 render kararından sonra bağlanır. Bu iş content-2 bağımlılığı netleştikten sonra yapılır.

Kaynak dayanakları: `frappe/frappe/website/website_generator.py:10`; `frappe/frappe/website/website_generator.py:39`; `frappe/frappe/website/website_generator.py:92`; `frappe/frappe/core/doctype/doctype/doctype.py:423`; `frappe/frappe/website/page_renderers/document_page.py:102`; `frappe/frappe/www/sitemap.py:55`.

Rehber: [programmatic-seo](./frappe-roadmap-contracts/programmatic-seo.json). Mevcut birincil görev: `programmatic-seo--implementation`.

### content-4 — İçerik ve yorum moderation (yayına uygunluk denetimi).

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütü (bekleyen yorum yayınlanmasın, karar ve gerekçe denetlenebilir olsun) somut. Ancak hangi içerik ve yorum türlerinin kapsamda olduğu belirtilmemiş. Kaynakta izin kontrolü ve doc_events ilkelleri var. Writer yorumları ise moderasyon durumu olmayan bir Yjs blob'u olarak saklanıyor ve allow_guest uç noktasından yazılıyor; bu uç nokta yalnız 'comment' izniyle korunuyor. Frappe Comment, Workflow ve Version kaynakları bu kesitlerde görülmedi.

Eksik:

- Kapsamdaki nesneler belirsiz: Web Page, Frappe Comment, Writer ycomments. Blog kurulu değil.
- Durum modeli (pending/approved/rejected) ve yerel Workflow ile track_changes/Version yeniden kullanımı karara bağlanmamış.
- Moderatör rolü ve izin seviyesi tanımlı değil.
- Writer Yjs yorumlarında sunucu tarafında yayın kapısı yok; ön moderasyon yapılıp yapılmayacağı belirsiz.
- Gerekçe kaydının nerede tutulacağı (Version mı, ayrı DocType mı) belirtilmemiş.

Nasıl tamamlanır: moderation-case--implementation için kapsam önce Web Page ve Frappe Comment ile sınırlandırılmalı. Durum alanı, Moderator rolü ve karar gerekçesi için yerel Workflow ile track_changes yeniden kullanılmalı. Writer Yjs yorumları açıkça kapsam dışı ya da ayrı bir karar olarak işaretlenmeli.

Kaynak dayanakları: `suite/suite/writer/doctype/writer_document/writer_document.py:112`; `suite/suite/writer/api/docs.py:121`; `suite/suite/writer/api/docs.py:124`; `frappe/frappe/permissions.py:82`; `suite/suite/hooks.py:224`.

Rehber: [moderation-case](./frappe-roadmap-contracts/moderation-case.json). Mevcut birincil görev: `moderation-case--implementation`.

### content-5 — Changelog (değişiklik günlüğü) ve müşteri panelinde “Neler yeni?”.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Upstream Frappe'de (v17 dev, commit adf1fd0c) uygulama düzeyinde bir changelog mekanizması var. frappe/frappe/utils/change_log.py içindeki get_change_log, kurulu her uygulamanın <app>/change_log/vN/vX_Y_Z.md markdown dosyalarını okuyor. Bunları kullanıcının User.last_known_versions alanındaki sürümle (gizli, salt okunur Text alanı) karşılaştırıp aradaki sürümleri döndürüyor; böylece kullanıcı başına sürüme dayalı bir görüldü durumu da sağlıyor. sessions.py içindeki get bu sonucu bootinfo.change_log içine koyuyor. desk.js içindeki show_change_log içeriği Desk'te bir diyalogda gösteriyor; diyalog kapanınca whitelist'teki update_last_known_versions çağrılıyor. İlgili iki parça daha var: (1) check_for_update ve show_update_popup, GitHub sürüm bildirimini yalnız System Manager rolündekilere gösteriyor; (2) Navbar Settings'teki announcement_widget, tüm Desk kullanıcılarına tek bir global duyuru bandı gösteriyor ve kapatma durumunu yalnız tarayıcının localStorage'ında tutuyor. Genel okundu primitifi olarak Notification Log (read ve for_user alanları) var. Suite'in Vue frontend'inde ve backend'inde changelog, duyuru veya Neler yeni kodu bulunmadı. changelog sözleşmesi içermiyor. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Kayıt düzeyinde bir duyuru (Release Note) DocType'ı yok: taslak/yayınlandı durumu, yayın tarihi, hedef kitle (rol/tenant/plan) ve kayıt bazlı izinle kısıtlanan duyuru alanları bulunmuyor. Mevcut changelog, kod deposundaki statik markdown dosyalarından geliyor; yönetici içerik yazamıyor ve kitle hedefleyemiyor.
- Kabul ölçütündeki 'taslak ve kısıtlı duyuru gizli kalsın' davranışı için sunucu tarafında bir filtre yok. announcement_widget tek ve global; hedefleme yapmıyor, kapatma durumunu da yalnız istemcide tutuyor.
- Duyuru başına okundu kaydı yok. last_known_versions yalnız kullanıcı başına uygulama sürümlerini tutuyor.
- Headless React/AntD müşteri paneli için Neler yeni okuma/okundu API sözleşmesi yok. Changelog yalnız Desk bootinfo'su ve jQuery diyaloğu üzerinden sunuluyor; planlanan Frappe adaptörü bunu açmıyor.
- Suite hooks.py DENIED_WILDCARD_PATHS içinde /api/ yolunu engelliyor. Yeni bir okuma ucunun izinli yol (allowlist) listesine eklenmesi gerekiyor; bu kuralın nasıl uygulandığı ise bu incelemede okunmadı.
- Tenant ve plan ile hedefleme, kernel/audit/outbox zarflarıyla entegrasyon kaynakta yok.

Nasıl tamamlanır: Sıra mevcut görevlerle aynı. (1) release-note--contract: Bir Release Note DocType sözleşmesi yazılır. Alanlar: title, body, status (Draft/Published), published_on, audience_roles (Table MultiSelect veya Has Role) ve isteğe bağlı tenant/plan. Okundu durumu için duyuru başına ayrı bir kayıt (Release Note Read) ya da Notification Log yeniden kullanılır. Upstream app changelog'u (change_log.py) yalnız geliştirici sürüm notu olarak kalır. (2) release-note--schema: DocType ve permission rules eklenir; get_list filtresi yalnız Published, yayın tarihi gelmiş ve rol kesişimi olan kayıtları döndürür. (3) release-note--implementation: Bir okuma ucu (liste ve mark_read) eklenir ve Suite hooks.py izinli yol listesine yazılır. Önce taslak ve kısıtlı duyurunun gizli kaldığını gösteren başarısız (RED) bir regresyon testi yazılır, sonra GREEN. React paneli bu provider sözleşmesini tüketir. functionalAcceptance: not_run.

Kaynak dayanakları: `frappe/frappe/utils/change_log.py:64`; `frappe/frappe/utils/change_log.py:26`; `frappe/frappe/sessions.py:190`; `frappe/frappe/public/js/frappe/desk.js:529`; `frappe/frappe/utils/change_log.py:366`; `suite/suite/hooks.py:466`.

Rehber: [release-note](./frappe-roadmap-contracts/release-note.json). Mevcut birincil görev: `release-note--implementation`.

### content-6 — Taslak, önizleme, yayın zamanı, sürüm geçmişi ve geri alma.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Kabul ölçütleri net: zamanı gelmeyen içerik yayımlanmasın, geri alma yeni denetim kaydı oluştursun. Suite Writer'da yazma izniyle sürüm oluşturma ve sürüm listeleme var. Ancak geri yükleme uç noktası, yayın zamanlaması ve önizleme görünmüyor. Belge silinince sürümler de siliniyor. Writer (Drive tabanlı belge) ile CMS Web Page arasındaki yeniden kullanım sınırı talimatta ayrılmamış.

Eksik:

- Yeniden kullanım sınırı belirsiz: Web Page yayın alanları ve Frappe Version mı, yoksa Writer Version mı kullanılacak?
- Geri yükleme eylemi kaynakta görünmüyor; acceptance'taki 'yeni denetim kaydı' sözleşmesi tanımsız.
- Writer belgesi silinince sürüm geçmişi de siliniyor; bu, denetim beklentisiyle çelişebilir.
- Headless önizleme için yetki ve token sınırı tanımlanmamış; Web Page alanları v17'de doğrulanmamış.

Nasıl tamamlanır: native-web-page--implementation altında v17 Web Page yayın alanlarını ve Version izini doğrulayın. Geri yüklemeyi seçilen sürümden yeni bir kayıt yaratan, write izni kontrollü tek bir whitelisted yöntem olarak tanımlayın. Writer Version'ın kapsam dışı mı olduğunu (ya da yalnız belge editörü için mi kullanılacağını) açıkça yazın.

Kaynak dayanakları: `suite/suite/writer/doctype/writer_document/writer_document.py:40`; `suite/suite/writer/api/general.py:124`; `suite/suite/writer/doctype/writer_document/writer_document.py:26`; `suite/suite/hooks.py:419`.

Rehber: [native-web-page](./frappe-roadmap-contracts/native-web-page.json). Mevcut birincil görev: `native-web-page--implementation`.

### content-7 — Sayfa adresi, yönlendirme, site haritası ve indeksleme kontrolleri.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Frappe hook düzeyinde yönlendirme (redirect) ve rota kuralı primitifleri kaynakta kullanılıyor. Ancak Suite örnekleri 307 kodu ve SPA'ya yönlendirilen rotalar; 301, kaldırılmış içerik yanıtı, sitemap ve robots kaynak parçasında yok. Talimat, rotaların bağımsız frontend'e ait olduğunu söylüyor ama Frappe portal rotalarıyla çakışma ve sahiplik sınırını tanımlamıyor.

Eksik:

- Rota sahipliği belirsiz: Vite/TanStack Router frontend mi, Frappe portal mı? Suite home_page ve /writer gibi önekler çakışabilir.
- 301 yanıtı ve kaldırılmış içerik için 404/410 davranışı tanımsız; hook örneği 307.
- Sitemap veri kaynağı tanımsız: yalnız yayımlanmış, Guest'in okuyabildiği ve canonical adresler; Guest erişimi /api/ wildcard reddine takılabilir.
- Website Settings kaynağı v15; v17 alanları doğrulanmamış.

Nasıl tamamlanır: native-web-page--implementation notuna bir rota sahipliği tablosu ekleyin: hangi önek frontend'e, hangisi Frappe'ye ait. Kalıcı yönlendirmeler website_redirects ile 301 olarak ayrılsın. Sitemap için yayımlanmış ve canonical adresleri dönen tek bir okuma sözleşmesi ve Suite izinli yol etkisi yazılsın.

Kaynak dayanakları: `suite/suite/hooks.py:47`; `suite/suite/hooks.py:68`; `suite/suite/hooks.py:72`; `suite/suite/hooks.py:65`.

Rehber: [native-web-page](./frappe-roadmap-contracts/native-web-page.json). Mevcut birincil görev: `native-web-page--implementation`.

### content-8 — Moderasyon kuyruğu, gerekçe, itiraz ve ihlal geçmişi.

Kaynak durumu: **KISMİ**. Asıl aşama: `post_mvp`. Ürün uygulaması: **uygulanmadı**, kabul: `not_run`.

Moderasyon alanına özgü bir uygulama yok. Yalnızca upstream Frappe'nin genel ve somut primitifleri var: (1) Workflow motoru, frappe/frappe/model/workflow.py içinde. get_transitions geçişleri mevcut duruma ve kullanıcı rolüne göre süzüyor. apply_workflow durum alanını güncelliyor ve has_approval_access ile kendi kendini onaylamayı engelliyor. (2) Submit sonrası değişmezlik: validate_update_after_submit ve _validate_update_after_submit, allow_on_submit olmayan alanların submit sonrası değişmesini engelliyor. (3) Document.save_version: track_changes açık DocType'larda değişiklik geçmişini Version kaydı olarak tutuyor. Suite'teki Screened Email Address (Spam/Reject/Accepted) ve Spam Check Log, posta göndericisi süzme ve spam işlevidir; içerik moderasyonu değildir. Gerekçe, itiraz ve ihlal geçmişi içermez. Uygulama durumu: uygulanmadı; bu kayıt yalnız kaynak incelemesi ve gelecek geliştirme yönergesidir.

Eksik:

- Moderasyon vakası DocType'ı yok. İçerik referansı için Dynamic Link, tenant/kapsam, durum ve zorunlu gerekçe alanı tanımlı değil.
- Kuyrukta → reddedildi → itirazda → kesinleşti durum makinesi için bir Workflow tanımı ve geçiş rolleri yok.
- Moderatör ile itiraz inceleyicisi rol ayrımı ve DocPerm eşlemesi yok.
- Önceki karara bağlı itiraz kaydı yok.
- Kullanıcı ya da içerik başına değişmez ihlal geçmişi ve bunu sorgulayan bir API yok.
- Hangi içerik türlerinin kuyruğa girdiğini belirleyen hooks/doc_events entegrasyonu yok.
- Headless provider tarafında moderasyon sözleşmesi ve API'si yok; outbox ve audit-envelope bağlantısı da yok.
- Moderasyon arayüzü yok: ne Suite'in Vue frontend'inde ne de React/Ant Design hedef arayüzünde.

Nasıl tamamlanır: En küçük adım ve sıra şöyle: (1) moderation-case--contract: durumları, gerekçe zorunluluğunu, itiraz bağını ve tenant kapsamını içeren sözleşme notu. (2) moderation-case--schema: submittable bir Moderation Case DocType'ı. İçinde reference_doctype/reference_name (Dynamic Link), reason (zorunlu), decision, appeal_of (önceki vakaya Link) ve tenant alanı bulunsun; track_changes açık olsun. Karar submit edildiğinde validate_update_after_submit ile değişmez hale gelsin. İtiraz, kararı değiştirmesin; önceki vakaya bağlı yeni bir vaka olarak açılsın. (3) Native Workflow tanımı: moderatör ve itiraz inceleyicisi ayrı Role'ler olsun, geçişler bu rollere bağlansın. (4) Tek dar davranış için RED/GREEN testi: reddedilen içeriğe gerekçeli itiraz açılabilsin ve submit edilmiş önceki karar değiştirilemesin. Headless provider uç noktaları ve outbox/audit bağlantısı bu adımlardan sonra, ignore_permissions kullanmadan eklensin.

Kaynak dayanakları: `frappe/frappe/model/workflow.py:72`; `frappe/frappe/model/workflow.py:136`; `frappe/frappe/model/document.py:1485`; `frappe/frappe/model/base_document.py:1350`; `frappe/frappe/model/document.py:2038`.

Rehber: [moderation-case](./frappe-roadmap-contracts/moderation-case.json). Mevcut birincil görev: `moderation-case--implementation`.

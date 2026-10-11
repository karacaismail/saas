# Modüler monolit geliştirme planı

Kanonik plan ve görünen bütün yeni metinler [data/development-plan.json](../data/development-plan.json) içindedir. Eski 387 madde, 49 başlık, 12 küme, scope/assessment, ilişkiler, sıralar ve 109 karar değişmez. Yeni ek katman her mevcut itemId için tek unitId, stageId, delivery ve somut gerekçe içerir. Aşama veya atama tamamlanma kanıtı değildir; çalışan SaaS uygulaması geliştirildiği iddia edilmez.

## App, Module ve paket modeli

Bulutta tek özel `saas_platform` Frappe App; aynı kod control-plane ve tenant site’larında kullanılır. Hizmete özgü domain gerçekten seçildiğinde `saas_product` ayrı extension App olarak platformun yayımlanmış API’sine bağlanabilir. PoC örnek DocType’ı geçici test dilimidir; evrensel ürün özelliği olmaz.

JSON 33 mantıksal birim içerir: 15 domain Frappe Module, 1 shared kernel, 6 backend adapter, 3 frontend package, 4 platform adapter, 2 external service ve 2 operations birimi. Bunlar 33 App veya 33 servis değildir. Teknik DocType’lar için ayrıca fiziksel Platform System Frappe Module’ü kullanılır; mantıksal birim ve ModuleDef sayısı aynı değildir.

| Tür                  | Sınır                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Domain Frappe Module | Kendi iş kayıtları, invariantı, permission/validation, yayımlanmış komut/sorgu ve olay şeması.                   |
| Shared kernel        | Ortak kimlik/tenant/işlem/hata/şema tipleri; iş kaydı veya bütün domain kurallarının deposu değil.               |
| Backend adapter      | App içi Python paketi: kimlik köprüsü, API/metadata, outbox/jobs, offline sync, mapping ve ekosistem bağlantısı. |
| Frontend package     | Ortak TypeScript iş/veri çekirdeği, React/Ant panel, koşullu Ant X/X Cards runtime.                              |
| Platform adapter     | Vite/PWA, Tauri 2 mobil, Tauri 2 masaüstü, WXT/MV3; giriş/depo/izin/lifecycle/paket farkları.                    |
| External service     | Keycloak ve temel işlemsel e-posta; Frappe Module değildir.                                                      |
| Operations           | Dağıtım/gözlem/yedek/süreklilik ve güvenlik/kabul mühendisliği.                                                  |

Native App yerleşimi korunur:

- App kökünde `modules.txt`, `hooks.py` ve `patches.txt`.
- Her domain veya Platform System Module’ünde ilgili `doctype` dizini.
- `api` ve `adapters` gibi teknik Python paketleri App içinde domain Module klasörlerinden ayrı bulunabilir.
- Outbox/Inbox/JobState, SyncReceipt ve DeviceGrant gibi teknik DocType’ların native Module sahibi Platform System’dir; Module dışında sahipsiz DocType bulunmaz.
- Ortak client-core/ui ve web/Tauri/WXT kabukları frontend çalışma alanındadır.
- `module.manifest.yml` seçilirse özel ürün capability sözleşmesidir; Frappe’nin hazır native dosyası olarak sunulmaz.

Frappe ModuleDef kaydı düşük bağımlılığı otomatik sağlamaz. Yabancı controller import ederek veya doğrudan DB yazarak kayıt sahibi atlanmaz; yayımlanmış yerel komut/sorgu servisi çağrılır. Sahip modül native ORM/Document/permission/validation kullanır. Native CRUD/RPC de aynı invariantı korumalıdır. Her kayıt için ikinci ORM/Repository sınıfı zorunlu değildir; core fork edilmez.

Aynı site’de anlık sonuç/atomiklik gereken komut senkron servis çağrısıdır. Dış/asenkron etki iş kaydıyla aynı DB transaction’ında Outbox’a yazılır. Commit sonrası wake-up ve periyodik scanner kullanılır; `after_commit`, `enqueue` veya `doc_events` tek başına durable outbox garantisi değildir. Retry/tekilleştirme/sıralama kapsamı ve teslim durumu açık sözleşmedir. Sürüm duyarlı transaction API’sinin hedef Frappe release desteği ayrıca doğrulanır.

## Yerleşim ve veri otoritesi

Önerilen varsayılan müşteri başına site/DB, ayrı control-plane site ve aynı App kodudur. Paylaşılan process/worker/host nedeniyle site/DB ayrımı tam altyapı güvenlik sınırı değildir; gerekirse ayrı kaynak tahsis edilir. Single-tenant/hybrid aynı ürün sözleşmesini korur. Paylaşımlı tablo modeli ayrı izolasyon PoC’si olmadan varsayılan olmaz.

Site’lar arası tek transaction veya doğrudan DB yazımı yoktur. API, işlem kimliği, kalıcı outbox, durum, retry ve uzlaştırma kullanılır; yarım provisioning/askıya alma/taşıma için devam veya telafi tanımlanır.

ERPNext, CRM, Helpdesk, Insights, Payments, Drive ve Press ayrı isteğe bağlı App/ürünlerdir. Seçilirse sürüm/lisans/headless/kimlik kabulü yapılır. Muhasebe, ticket veya CRM otoritesi seçilen App’teyse adapter ikinci bağımsız doğru kaynak oluşturmaz. İşletmeci finansı ve müşterinin ürün içi muhasebesi ayrıdır.

## Zorunlu ve koşullu birimler

Zorunlu domain çekirdeği: Tenant Control, Authorization, Capability Catalog, Records & Taxonomy, Audit & Governance, Integration Hub. Zorunlu teknik parçalar: küçük shared kernel, kimlik/API/outbox/sync/mapping adapterları, ortak panel/istemci, dört seçilmiş platform adapterı, Keycloak, temel işlemsel e-posta ve işletim/güvenlik.

Bu proje sekiz entegrasyon modelini, dar AI Mapping’i, offline ve mobil/masaüstü/eklenti hedeflerini açıkça seçmiştir. Bunlar bütün SaaS’ların evrensel MVP’si olduğu için değil bu projenin kararı nedeniyle required’dır. Required unit tüm yol haritasında gerekir; bütün yetenekleri MVP’de bitmiş anlamına gelmez.

Commercial; Assets; Search; Workflow/ECA/Approval; çoklu ürün Notifications; Reporting/BI; CRM/Support/Calendar; Content/Growth; genel AI/RAG/Agents ve GenUI runtime koşulludur. Ant Design X/X Cards ailesi kesin olsa da bütün AI ürünleri MVP zorunlusu değildir. Ekosistem App adapterı isteğe bağlıdır.

Ücretsiz core commercial Module olmadan açılır. Paid plan/abonelik/kredi seçilirse ilk ücretli işlemden önce hak/ödeme/idempotency/uzlaştırma dilimi zorunludur. Dosya veya workflow seçilirse o yeteneğin minimum güvenlik/bütünlük koşulları ilk kullanımda zorunlu hale gelir.

App kurulumu, teknik etkinlik, ticari entitlement, kullanıcı/kayıt izni ve dependency sağlığı ayrı eksenlerdir. Özellik kapatma App kaldırma, tablo düşürme veya veri silme değildir. Devam eden iş, yeni iş, offline replay ve geçmişe erişim politikası belirlenir.

## Teslim aşamaları ve eski paketlerle eşleme

| Aşama      | İlk odak                                                                               | Eski plan ilişkisi                                                |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| PoC        | Kimlik/headless login, site izolasyonu, tablo motoru, atomic local/outbox ve ack riski | M0/O0 ve O1 risk denemesi                                         |
| MVP        | İlk gerçek ürün; güvenlik/audit/backup/restore/a11y; REST/webhook/JSON-CSV-XLSX        | M1; O1+ilk O2, hazırlanmış web cihazında local-first/restart/sync |
| post_mvp   | Diğer zorunlu protokoller; Tauri mobile/desktop, WXT; tam offline fault kabulü         | M2+M3; tam O2+O3                                                  |
| scale      | Ölçülen kapasite, tenant adaleti/SLO, taşıma/restore                                   | Otomatik mikroservis emri değildir                                |
| enterprise | Somut sözleşmeye bağlı SSO/SCIM/anahtar/bölge/legal hold/on-prem/air-gap               | Temel güvenlik bu aşamayı beklemez                                |
| maturity   | Sürekli ölçüm, kanıt, tatbikat ve sürdürülebilir devir                                 | Her aşamada kullanılan olgunluk ölçeğinin işletim döngüsü         |

Atama dağılımı: 27 PoC, 127 MVP, 187 post_mvp, 33 scale, 13 enterprise. Maturity yeni bir özellik kovası değildir; bu nedenle 387 özellikten ayrıca maturity’ye ertelenen madde yoktur. Son aşama bütün seçilmiş yeteneklerin işletim kanıtını değerlendirir.

`assignment.stageId` ilk hedef pakettir. PoC ataması risk denemesidir; tam teslim ilgili unit targetStage ve devam eden aşama kabulüyle tamamlanır. `unit.need`, `item.scope`, aşama ve tamamlanma farklı eksenlerdir. Required birimdeki conditional item koşullu kalır; eski required item sessizce optional yapılmaz. Koşullu modül ürün kararı olmadan geliştirme taahhüdü olmaz.

M1 MVP: REST sunma+tüketme, webhook alma+gönderme, JSON/CSV/XLSX’in her birinde import+export. M2 post_mvp: raw WebSocket ve XML HTTP pull/push/checkpoint. M3 post_mvp: GraphQL/SOAP/MCP ve ayrı AI Mapping. Enterprise müşterisi beklenerek bu modeller opsiyonelleştirilmez. XML transport değildir; Socket.IO raw WebSocket değildir; MCP mapping motoru değildir.

Dar zorunlu AI Mapping kendi sınırlı provider adapterı, veri/izin/maliyet sınırı, öneri/kanıt/önizleme/insan onayı ve deterministik mapping sürümü içerir. Genel AI/RAG/agent Module’ü şart koşmaz. AI kesintisinde manuel mapping çalışır.

O1 ve ilk O2 MVP: hazırlanmış web cihazında atomic local iş+outbox, restart, süreli local yetki, push/pull, server revalidation/commit-ack/idempotency. Tam O2/O3 post_mvp: bütün platformlar, iki cihaz çatışması, stok/kota tahsisi, dört gün fault, pending migration ve bağımsız backup/restore. İlk Keycloak login/veri/anahtar hazırlığı çevrimiçi; local kilit açma yeni kimlik sağlayıcısı değildir.

Tauri 2 mobil ve masaüstü kesindir. Capacitor/Capawesome tarihsel seçilmemiş alternatif olarak korunur. Mobil store güncellemesi desktop updater veya doğrulanmamış OTA ile eşit değildir. Mobil klavye/safe area/geri hareketi/OS kill, callback ve izinler gerçek cihazda ayrı kabul edilir.

## Olgunluk ve kanıt

L0 Tanımlı → L1 Gösterilmiş → L2 İşletilebilir → L3 Ölçülen → L4 Sürdürülebilir bu projenin ölçüm ölçeğidir; resmî sertifika değildir. Ürün, mimari, veri/offline, güvenlik, yayın, işletim/kurtarma, kapasite/maliyet ve yönetişim ayrı değerlendirilir. Kanıt yoksa seviye yükselmez; kritik açıklar ortalama puanla gizlenmez. Enterprise otomatik maturity veya mevzuat uyumu değildir.

Sayısal SLO/RPO/RTO, tarih veya efor hedefi ölçüm ve işletmeci kararı olmadan vaat edilmez. Gerçek SaaS/native/Frappe/Keycloak/dört gün testleri yapılmadıysa not_run kalır. Atlas içerik/render/export/CI/Pages doğrulaması gelecekteki ürün güvenliği veya offline kapasitesinin yerine geçmez.

CI/CD, imzalama, deploy, rollback ve teknik işletim sahibi Hüseyin Cengiz’dir. DNS gerektiğinde teknik gereksinimi Hüseyin Cengiz hazırlar, GoDaddy’de Asistan Hüseyin uygular, Hüseyin Cengiz servis sonucunu doğrular. Plan otomatik mesaj veya hesap/server değişikliği yetkisi üretmez.

## JSON sözleşmesi ve doğrulama sınırı

`architecture`, `stack`, `stages`, `units`, `assignments`, `maturity`, `decisions`, `sources` içerik taşır; HTML/CSS/JS kodu içermez. Kind/need enum’ları Türkçe label map ile gösterilir. Stage kimlikleri sabittir: poc, mvp, post_mvp, scale, enterprise, maturity. Assignments manifest/küme/başlık/madde sırasını izler; eski dosyalar değiştirilmez.

Bağımlılık grafiği döngüsüzdür; required birim conditional/optional kurulumuna bağımlı değildir. Seçili export ilgili atamaları ve gerekli birim/aşama/karar bağlamını taşır; dependency-only birim ayrıca etiketlenir. Eski JSON/Markdown/CSV sözleşmeleri bu ek içerik yokken değişmez.

Root doğrulamaları JSON şeması,387 tekil/sıralı atama, DAG/need/stage tutarlılığı, immutable eski içerik, render ve seçili JSON/Markdown plan export’udur. Bu belgenin yazımı test çalıştığı iddiası değildir. Birincil kaynaklar JSON’dadır; tasarım kararları resmî kaynakların kendiliğinden sunduğu özellik diye sunulmaz.

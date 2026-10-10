# Küme 01–06: Frappe yeterlilik araştırması

Araştırma tarihi: 10 Ekim 2026. Kapsam: `index.html` içindeki `atlas-data`, küme 01–06, 161 madde. Kararlı kimlik: `group.id` + özgün sıra numarası. Kararlar `data/assessments-01-06.json` dosyasındadır.

## Mimari ve kanıt sınırı

Backend Frappe Framework; frontend bağımsız headless; tüm login/kimlik doğrulama Keycloak üzerinden yürütülecek. Frappe sunucu yetkilendirmesi, kayıt/alan izinleri ve tenant denetimi devam eder. Desk/Web Form/ERPNext portalı bulunması bağımsız frontend ekranının hazır olduğu anlamına gelmez.

Hedef Frappe, ERPNext, Keycloak ve eklenti sürümleri seçilmedi. Bu çalışma resmî belge ve bazı resmî kaynak dosyalarının incelemesidir; canlı kurulum, entegrasyon, güvenlik, yük veya kabul testi yapılmadı. `documented` bir kabiliyetin kaynakta bulunduğunu ifade eder; kurulu veya çalışır olduğunu ifade etmez. `acceptance` alanları gelecekte çalıştırılacak maddeye özgü kabul koşullarıdır.

`native`: maddede tanımlanan çekirdek kabiliyet belgeli. `partial`: yalnız alt işlevler mevcut, kalanlar açıkça yazılı. `ecosystem`: ERPNext/Frappe Payments/Frappe Drive gibi ayrı uygulama; Framework çekirdeği sayılmaz. `external`: mimari kararla Keycloak, frontend veya harici hizmet sorumluluğu. `verify`: hedef sürüm/kapsam doğrulanmadan karar kesinleşmez. `absent`: incelenen referanslarda hazır ürün kabiliyeti saptanmadı; evrensel yokluk iddiası değildir. `design`: kaynak sınırı üzerinde mimari değerlendirmedir.

## Sürüme duyarlı bulgular

- Frappe site başına veritabanı ayrımı sağlar. Tek veritabanında satır bazlı tenant modeli, karma dağıtım ve harici cache/search/job izolasyonu bu kanıtın ötesindedir. [Site oluşturma](https://docs.frappe.io/framework/user/en/tutorial/create-a-site), [çok kiracılık](https://docs.frappe.io/framework/user/en/bench/guides/setup-multitenancy).
- Okunan Keycloak 26.7.0 kılavuzu SCIM API içeriyor; features listesinde `scim-api:v1` var. Bu yüzden SCIM'e evrensel “yok” denmedi; hedef sürüm ve Frappe eşitlemesi doğrulanana kadar `verify` kaldı. Magic link hazır akışı için incelenen kılavuzda yeterli kanıt bulunmadı. [Keycloak kılavuzu](https://www.keycloak.org/docs/26.7.0/server_admin/index.html), [features](https://www.keycloak.org/server/features).
- Recovery codes resmî duyuruda 26.3.0'dan itibaren destekli olarak belirtiliyor; passkey/MFA uygulaması hedef sürüm ve realm akışıyla doğrulanmalı. [Recovery codes](https://www.keycloak.org/2025/10/recovery-codes).
- Güncel Frappe belgelerinde Automation Flow beta, koşul/eylem genişletmeleri ve Test Run var. Hedef release'in bunları içerdiği kanıtlanmadı; ECA, test-run, bekleme ve replay değerlendirmeleri bu nedenle `verify` içerir. Bunlar BPMN uyumluluğunu kanıtlamaz. [Automations](https://docs.frappe.io/framework/automations), [adımlar](https://docs.frappe.io/framework/automations/steps-and-actions).
- Server Scripts v15'ten itibaren varsayılan kapalıdır; genişletme önerisi bunları açma yetkisi veya mecburiyeti değildir. Sürüm kontrollü app/controller yolu da değerlendirilebilir. [Server Script](https://docs.frappe.io/framework/user/en/desk/scripting/server-script).
- Çeviri belgeleri v15 CSV ve v16+ Gettext/PO yollarını ayırır. Maskeleme belgesi sürüm/deneysel sınırı taşır ve raw SQL/Query Report için otomatik güvence vermez. [Frappe komutları](https://docs.frappe.io/framework/user/en/bench/frappe-commands), [Data Masking](https://docs.frappe.io/framework/data-masking).
- Kaynakta `get_all` izinleri uygulamaz; `ignore_permissions`, raw SQL ve bazı yönetici/job yolları özel inceleme ister. Başarılı Keycloak login'i veri yetkisi değildir. [Database API](https://docs.frappe.io/framework/user/en/api/database), [Document API](https://docs.frappe.io/framework/user/en/api/document).
- Faturalama/kampanya kayıtları ERPNext, sağlayıcı bağlantıları Frappe Payments, S3 belgesi Frappe Drive kapsamındadır. Bunların kurulumu ve lisans/uyumluluk değerlendirmesi yapılmadı. Stripe bağlantıları yalnız sağlayıcı sözleşmesi örneğidir; sağlayıcı seçimi veya entegrasyon yapılmış değildir. [Subscription](https://docs.frappe.io/erpnext/subscription), [Payments](https://github.com/frappe/payments), [Drive S3](https://docs.frappe.io/drive/s3-integration).
- `version-15` GitHub yolları hareketli dal kaynaklarıdır; immutable release/commit veya kullanıcı kurulumuyla eşleşme kanıtı değildir. Workflow ve Data Import'un Framework'e aitliğini ayırmak için kullanıldı. File controller'da dosya adından MIME tahmini ve uzantı denetimi gerçek byte içeriği/zararlı taraması garantisine eşit sayılmadı. [File kaynağı](https://github.com/frappe/frappe/blob/version-15/frappe/core/doctype/file/file.py).

## Resmî kaynak dizini

Aşağıdaki bağlantılar araştırma sırasında web üzerinden okundu. Kaynağın bir yeteneği anlatması, hedef sisteme kurulduğu veya bütün maddenin karşılandığı anlamına gelmez.

- [Frappe: site oluşturma ve site başına veritabanı](https://docs.frappe.io/framework/user/en/tutorial/create-a-site)
- [Frappe: çok kiracılı Bench kurulumu](https://docs.frappe.io/framework/user/en/bench/guides/setup-multitenancy)
- [Frappe: site ve ortak yapılandırma](https://docs.frappe.io/framework/user/en/basics/site_config)
- [Frappe: kullanıcılar ve izinler](https://docs.frappe.io/framework/user/en/basics/users-and-permissions)
- [Frappe: genişletme ve izin hookları](https://docs.frappe.io/framework/user/en/python-api/hooks)
- [Frappe: Document API](https://docs.frappe.io/framework/user/en/api/document)
- [Frappe: Database API ve izin sınırları](https://docs.frappe.io/framework/user/en/api/database)
- [Frappe: REST API](https://docs.frappe.io/framework/user/en/api/rest)
- [Keycloak 26.7.0: kimlik, oturum ve organizasyon yönetimi](https://www.keycloak.org/docs/26.7.0/server_admin/index.html)
- [Keycloak: sürümlü özelliklerin etkinlik durumu](https://www.keycloak.org/server/features)
- [Keycloak: recovery codes sürüm sınırı](https://www.keycloak.org/2025/10/recovery-codes)
- [Frappe: uygulama yapısı ve kurulum](https://docs.frappe.io/framework/user/en/basics/apps)
- [Frappe: uninstall-app](https://docs.frappe.io/framework/user/en/bench/reference/uninstall-app)
- [Frappe: veritabanı geçişleri](https://docs.frappe.io/framework/user/en/database-migrations)
- [ERPNext: Subscription Plan](https://docs.frappe.io/erpnext/subscription-plan)
- [ERPNext: Subscription](https://docs.frappe.io/erpnext/subscription)
- [ERPNext: Subscription Settings](https://docs.frappe.io/erpnext/subscription-settings)
- [ERPNext: Customer Portal](https://docs.frappe.io/erpnext/customer-portal)
- [Frappe: site HTTP zaman bütçesi](https://docs.frappe.io/framework/deployment/rate-limiting)
- [Frappe: arka plan işleri ve zamanlayıcı](https://docs.frappe.io/framework/user/en/api/background_jobs)
- [ERPNext: Coupon Code](https://docs.frappe.io/erpnext/coupon-code)
- [ERPNext: Pricing Rule](https://docs.frappe.io/erpnext/pricing-rule)
- [Frappe Payments: ayrı ödeme uygulaması](https://github.com/frappe/payments)
- [Stripe: idempotent istek sözleşmesi örneği](https://docs.stripe.com/api/idempotent_requests)
- [Stripe: webhook doğrulama ve teslim sözleşmesi örneği](https://docs.stripe.com/webhooks)
- [Stripe: iade sözleşmesi örneği](https://docs.stripe.com/refunds)
- [Stripe: sağlayıcı ödeme yöntemleri örneği](https://docs.stripe.com/payments/payment-methods)
- [ERPNext: Sales Invoice](https://docs.frappe.io/erpnext/sales-invoice)
- [ERPNext: Payment Reconciliation](https://docs.frappe.io/erpnext/payment-reconciliation)
- [ERPNext: Accounts Settings](https://docs.frappe.io/erpnext/accounts-settings)
- [ERPNext: Accounting Entries](https://docs.frappe.io/erpnext/accounting-entries)
- [Frappe: Desk kapsamı](https://docs.frappe.io/framework/user/en/desk)
- [Frappe: Desk List API](https://docs.frappe.io/framework/user/en/api/list)
- [Frappe: Form Scripts](https://docs.frappe.io/framework/user/en/api/form)
- [Frappe: Web Form](https://docs.frappe.io/framework/user/en/web-form)
- [Frappe: DocType veri modeli](https://docs.frappe.io/framework/user/en/basics/doctypes)
- [Frappe: DocField metaverisi](https://docs.frappe.io/framework/user/en/basics/doctypes/docfield)
- [Frappe: alan türleri](https://docs.frappe.io/framework/user/en/basics/doctypes/fieldtypes)
- [Frappe: site özel DocType genişletmeleri](https://docs.frappe.io/framework/user/en/basics/doctypes/customize)
- [Frappe: sunucu controller doğrulamaları](https://docs.frappe.io/framework/user/en/basics/doctypes/controllers)
- [Frappe: child/table DocType](https://docs.frappe.io/framework/user/en/basics/doctypes/child-doctype)
- [Frappe: ağaç görünümü API](https://docs.frappe.io/framework/user/en/api/tree)
- [Frappe: çeviri sistemi](https://docs.frappe.io/framework/user/en/translations)
- [Frappe: CLI ve sürüme bağlı Gettext araçları](https://docs.frappe.io/framework/user/en/bench/frappe-commands)
- [Frappe: tarih ve biçimlendirme yardımcıları](https://docs.frappe.io/framework/user/en/api/utils)
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Frappe: dosya ekleri ve görsel iyileştirme](https://docs.frappe.io/framework/user/en/desk/attachments)
- [Frappe version-15: File controller kaynak sınırı](https://github.com/frappe/frappe/blob/version-15/frappe/core/doctype/file/file.py)
- [ClamAV: tarama hizmeti](https://docs.clamav.net/manual/Usage/Scanning.html)
- [Frappe Drive: S3 ayrı uygulama entegrasyonu](https://docs.frappe.io/drive/s3-integration)
- [Frappe: FullTextSearch genişletme API](https://docs.frappe.io/framework/user/en/python-api/search)
- [Frappe: SQLite Search](https://docs.frappe.io/framework/sqlite-search)
- [Meilisearch: facet filtreleme](https://www.meilisearch.com/docs/capabilities/filtering_sorting_faceting/how_to/filter_with_facets)
- [Qdrant: çok kiracılı vektör indeksleme](https://qdrant.tech/documentation/manage-data/multitenancy/)
- [ERPNext belgesi: çekirdek Data Import akışı](https://docs.frappe.io/erpnext/data-import)
- [Frappe version-15: çekirdek Data Import kaynağı](https://github.com/frappe/frappe/blob/version-15/frappe/core/doctype/data_import/data_import.py)
- [Frappe: büyük veri aktarımı](https://docs.frappe.io/framework/user/en/guides/data/import-large-csv-file)
- [Frappe: sürüm ve raw SQL sınırı olan veri maskeleme](https://docs.frappe.io/framework/data-masking)
- [Frappe version-15: çekirdek workflow ve geçiş denetimi](https://github.com/frappe/frappe/blob/version-15/frappe/model/workflow.py)
- [Frappe version-15: Allow Self Approval alanı](https://github.com/frappe/frappe/blob/version-15/frappe/workflow/doctype/workflow_transition/workflow_transition.json)
- [ERPNext belgesi: çekirdek Workflow yapılandırması](https://docs.frappe.io/erpnext/workflows)
- [Frappe: beta Automation Flow kapsamı](https://docs.frappe.io/framework/automations)
- [Frappe: otomasyon tetikleyici ve koşulları](https://docs.frappe.io/framework/automations/triggers-and-conditions)
- [Frappe: otomasyon adımları ve Test Run](https://docs.frappe.io/framework/automations/steps-and-actions)
- [Frappe: otomasyon genişletme sözleşmesi](https://docs.frappe.io/framework/automations/extending-automations)
- [Frappe: Server Script ve v15 varsayılan kısıtı](https://docs.frappe.io/framework/user/en/desk/scripting/server-script)

Öz-onay maddesi approvals-6 kısmi destek olarak değerlendirildi. İncelenen version-15 workflow.py içinde apply_workflow, owner tabanlı has_approval_access denetimini çağırır; Administrator istisnası vardır. validate_workflow aynı kontrolü çağırmaz. Talep eden/owner ayrımı ve genel REST/save yolları özel sunucu politikasıyla kabul edilmelidir. Bu kaynak sınırıdır; kurulu üründe güvenlik açığı veya çalıştırılmış saldırı testi iddiası değildir.

# Frappe değerlendirmeleri: 07–12 kaynak ve kapsam kaydı

Değerlendirme tarihi: 2026-10-10. Mimari: Frappe Framework backend, bağımsız headless frontend, Keycloak kimlik doğrulama. Hedef Frappe, Keycloak, ERPNext veya ayrı uygulama sürümü seçilmedi. Bu kayıt resmî doküman ve kaynak koduna dayalı tasarım değerlendirmesidir; çalışan kurulum, sürüm uyumluluğu, güvenilirlik, güvenlik veya mevzuat kabul testi değildir.

Kapsam: index.html içindeki atlas-data kümeleri 07–12. JSON anahtarları groupid-ordinal biçimindedir; feature- DOM öneki içermez. Her madde mevcut kabiliyeti, kalan işi, sorumluyu, somut kabul koşulunu ve doğrudan kaynağını içerir. Kabul koşulları yapılacak doğrulamadır; gerçekleşmiş sonuç olarak okunmamalıdır.

## Sınıflandırma sınırı

- native: incelenen kaynakta madde kapsamını karşılayan Framework çekirdek kabiliyeti mevcut; kurulu sürümde test edildiği anlamına gelmez.
- partial: birleşik maddenin yalnız bir bölümü çekirdekte mevcut; kalan parçalar notta belirtilir.
- ecosystem: ayrı Frappe uygulaması veya ERPNext domain ürünü; yalnız Framework kurmakla gelmez.
- absent: incelenen kaynak kümesinde hazır çekirdek ürün kabiliyeti saptanmadı; evrensel yokluk veya geliştirilemezlik iddiası değildir.
- external: seçilen mimaride Keycloak, bağımsız frontend, AI/BI servisi veya işletim altyapısının sorumluluğu.
- verify: hedef sürüm veya kapsam kanıtı karar için yetersiz; sürüm seçimi ve doğrulama gerekir.

configure yapılandırmayı, extend mevcut temeli genişletmeyi, integrate ayrı bileşeni bağlamayı, build ürün geliştirmeyi, validate karar için doğrulamayı ifade eder. documented kaynakta mevcut alt kabiliyetin belgelendiğini; design mimari/ürün kararı olduğunu; verify sürüm/kapsam belirsizliğini gösterir. confidence bir çalışma zamanı başarı puanı değildir.

## Önemli kaynak nüansları

[Frappe Realtime](https://docs.frappe.io/framework/user/en/api/realtime) Socket.IO zemini sağlar. Belgede bazı yeni handler APIleri nightly/deneysel olarak işaretlidir; hedef sürüm olmadan bunlara dayanılmadı. Socket.IO, SSE veya kalıcı olay replay sözleşmesiyle eşdeğer sayılmadı.

[Güncel Event Streaming belgesi](https://docs.frappe.io/framework/help/event-streaming) v15 ve sonrasında çekirdek desteğin bulunmadığını, ayrılan uygulamanın da arşivlendiğini açıklar. Event bus, transactional outbox veya iki yönlü iş verisi eşlemesi hazır kabul edilmedi. Database transaction hooku veya commit sonrası enqueue tek başına dayanıklı outbox değildir.

[Data Masking](https://docs.frappe.io/framework/data-masking) belgede nightly/v16 deneysel niteliğindedir. Raw SQL ve Query Report için otomatik maskeleme varsayılmadı. [Frappe yetkilendirmesi](https://docs.frappe.io/framework/user/en/basics/users-and-permissions) Keycloak kimlik doğrulamasından ayrı uygulanır; UI gizleme sunucu yetkisi değildir.

Frappe CRM, Helpdesk, Insights ve Press ayrı uygulamalardır. ERPNext finans/CRM kabiliyeti Framework çekirdeğine yazılmadı. [ERPNext CRM](https://docs.frappe.io/erpnext/CRM) belgesindeki v17/develop kaldırma yönü tüm sürümlerin kaldırıldığı şeklinde genellenmedi. Headless ekranlar Desk veya Frappe hosted website ekranı bulunduğu için hazır sayılmadı.

Kaynak kodu doğrulamalarında version-15 dalı kullanıldı: Email Account, Email Queue, Auto Email Report, Event, Document.check_if_latest, Version, rename_doc ve kişisel veri istekleri. Bunlar çekirdek kökeni kanıtlar; hedef sürümü seçmez. Dal URLleri hareketlidir; üretim uygulamasında seçilen commit/sürüm ayrıca sabitlenmelidir.

[Google Calendar entegrasyonu](https://docs.frappe.io/framework/user/en/guides/integration/google_calendar) belgesindeki tekrarlı olayın tekil iptal sınırı kabul koşulunda korundu. [Rate limit](https://docs.frappe.io/framework/deployment/rate-limiting) site düzeyinde sabit pencere içinde işlem süresi toplamına dayanır; kullanıcı/tenant başına istek sayacı olarak sunulmadı.

Çekirdek kişisel veri indirme/silme istekleri kullanıcı verisi hooklarına bağlıdır; tüm özel DocTypelar, Keycloak, dosya/search/RAG kopyaları ve yedekler için otomatik eksiksiz silme veya KVKK/GDPR uyumu iddia edilmedi. Mevzuat kaynakları teknik tasarım sınırını gösterir; hukuki onay değildir.

LangChain/LangGraph, Metabase, Activepieces ve Mailgun resmî kaynakları ayrı bileşen örneği ve entegrasyon sınırıdır; ürün veya lisans seçimi, kurulum ya da kullanım yetkisi değildir. AI kayıtları yeniden inceleme sağlar; aynı model çıktısının kesin tekrarını veya prompt injectionın tümüyle çözüldüğünü iddia etmez.

Operasyon araçları Framework uygulama çekirdeğinden ayrıldı. DevOps ekibi teknik dağıtım/CI/CD/güvenlik/rollback sorumlusu; DNS operasyon ekibi GoDaddy DNS uygulama muhatabıdır. Bu dosya kimseye mesaj göndermez veya çalışan servisi değiştirmez. Mac container çalışmalarında mevcut Colima tercihi korunur.

Harici işletim kaynakları (WAF/bot, Vault, Prometheus, OpenTelemetry, NGINX, Sentry, object lock ve PostgreSQL PITR) kabiliyet sınırını somutlaştıran resmî örneklerdir; seçilmiş sağlayıcı/DB veya kurulum taahhüdü değildir. Özellikle PostgreSQL PITR kaynağı mevcut Frappe DB motorunun PostgreSQL olduğu iddiası oluşturmaz. Hedef DB/uygulama uyumluluğu sürüm seçiminde doğrulanmalıdır.

## Kapsam ve sayı

Toplam **165 madde** değerlendirildi: 07: 21, 08: 25, 09: 32, 10: 14, 11: 32, 12: 41. Atlas stable ID kümesiyle tam eşleşir.

| Destek    | Madde |
| --------- | ----: |
| native    |     6 |
| partial   |    73 |
| ecosystem |     9 |
| absent    |    33 |
| external  |    42 |
| verify    |     2 |

Her maddede yedi alan ve en az bir doğrudan kaynak bulunur. Kapsam/enum/kaynak yapısı dosya yazımında kontrol edildi; test/build/kurulum/commit/push çalıştırılmadı.

## Kaynak dizini

Kaynaklar bu çalışma sırasında resmî web dokümanı veya resmî GitHub kaynak kodu olarak okundu. JSON her maddede ilgili doğrudan linkleri içerir. Tasarım çıkarımları hazır ürün kanıtı sayılmaz.

- `notify`: [Frappe Notifications](https://docs.frappe.io/framework/notifications)
- `notiflog`: [Frappe Notification Log kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/desk/doctype/notification_log/notification_log.py)
- `realtime`: [Frappe Realtime API](https://docs.frappe.io/framework/user/en/api/realtime)
- `utils`: [Frappe Utility Functions: sendmail](https://docs.frappe.io/framework/user/en/api/utils)
- `mailaccount`: [Frappe Email Account şeması, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/email/doctype/email_account/email_account.json)
- `mailqueue`: [Frappe Email Queue kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/email/doctype/email_queue/email_queue.py)
- `autoreport`: [Frappe Auto Email Report kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/email/doctype/auto_email_report/auto_email_report.py)
- `document`: [Frappe Document API](https://docs.frappe.io/framework/user/en/api/document)
- `database`: [Frappe Database API](https://docs.frappe.io/framework/user/en/api/database)
- `jobs`: [Frappe Background Jobs](https://docs.frappe.io/framework/user/en/api/background_jobs)
- `hooks`: [Frappe Hooks](https://docs.frappe.io/framework/user/en/python-api/hooks)
- `controllers`: [Frappe Controllers](https://docs.frappe.io/framework/user/en/basics/doctypes/controllers)
- `architecture`: [Frappe Architecture](https://docs.frappe.io/framework/user/en/basics/architecture)
- `permissions`: [Frappe Users and Permissions](https://docs.frappe.io/framework/user/en/basics/users-and-permissions)
- `rest`: [Frappe REST API](https://docs.frappe.io/framework/user/en/guides/integration/rest_api)
- `webhook`: [Frappe Webhooks](https://docs.frappe.io/framework/user/en/guides/integration/webhooks)
- `stream`: [Frappe Event Streaming: güncel destek sınırı](https://docs.frappe.io/framework/help/event-streaming)
- `calendar`: [Frappe Event şeması, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/desk/doctype/event/event.json)
- `gcalendar`: [Frappe Google Calendar Integration](https://docs.frappe.io/framework/user/en/guides/integration/google_calendar)
- `audittrail`: [Frappe Audit Trail](https://docs.frappe.io/framework/user/en/audit-trail)
- `mask`: [Frappe Data Masking: deneysel sürüm sınırı](https://docs.frappe.io/framework/data-masking)
- `security`: [Frappe Security FAQs](https://docs.frappe.io/framework/user/en/security-faqs)
- `ratelimit`: [Frappe Rate Limiting](https://docs.frappe.io/framework/deployment/rate-limiting)
- `logging`: [Frappe Logging API](https://docs.frappe.io/framework/user/en/api/logging)
- `logs`: [Frappe Logging](https://docs.frappe.io/framework/user/en/logging)
- `profile`: [Frappe Profiling](https://docs.frappe.io/framework/user/en/profiling)
- `cache`: [Frappe Caching](https://docs.frappe.io/framework/user/en/guides/caching)
- `reports`: [Frappe Reports](https://docs.frappe.io/framework/user/en/desk/reports)
- `reportbuilder`: [Frappe Report Builder](https://docs.frappe.io/framework/user/en/desk/reports/report-builder)
- `queryreport`: [Frappe Query Report](https://docs.frappe.io/framework/user/en/desk/reports/query-report)
- `routing`: [Frappe Routing and Rendering](https://docs.frappe.io/framework/user/en/python-api/routing-and-rendering)
- `response`: [Frappe Response](https://docs.frappe.io/framework/user/en/python-api/response)
- `generators`: [Frappe Website Generators](https://docs.frappe.io/framework/user/en/guides/portal-development/generators)
- `redirects`: [Frappe Portal Redirects](https://docs.frappe.io/framework/user/en/guides/portal-development/redirects)
- `migration`: [Frappe Database Migrations](https://docs.frappe.io/framework/user/en/database-migrations)
- `config`: [Frappe site_config](https://docs.frappe.io/framework/user/en/basics/site_config)
- `backup`: [Bench backup](https://docs.frappe.io/framework/user/en/bench/reference/backup)
- `restore`: [Bench restore](https://docs.frappe.io/framework/user/en/bench/reference/restore)
- `backupencrypt`: [Frappe Backup Encryption](https://docs.frappe.io/framework/user/en/guides/basics/how-to-enable-backup-encryption)
- `multisite`: [Bench Multitenancy](https://docs.frappe.io/framework/user/en/bench/guides/setup-multitenancy)
- `domains`: [Bench Custom Domains](https://docs.frappe.io/framework/user/en/bench/guides/adding-custom-domains)
- `https`: [Bench HTTPS](https://docs.frappe.io/framework/user/en/bench/guides/configuring-https)
- `lock`: [Frappe Document kaynak kodu: check_if_latest, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/model/document.py)
- `version`: [Frappe Version kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/core/doctype/version/version.py)
- `rename`: [Frappe rename_doc kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/model/rename_doc.py)
- `website`: [Frappe Website Settings şeması, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/website/doctype/website_settings/website_settings.json)
- `webpage`: [Frappe Web Page şeması, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/website/doctype/web_page/web_page.json)
- `privacydelete`: [Frappe Personal Data Deletion Request kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/website/doctype/personal_data_deletion_request/personal_data_deletion_request.py)
- `privacydownload`: [Frappe Personal Data Download Request kaynak kodu, version-15](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/website/doctype/personal_data_download_request/personal_data_download_request.py)
- `crm`: [Frappe CRM: Your First Steps](https://docs.frappe.io/crm/setup-guide/your-first-steps-with-frappe-crm)
- `lead`: [Frappe CRM Lead](https://docs.frappe.io/crm/lead)
- `crmtask`: [Frappe CRM Task](https://docs.frappe.io/crm/task)
- `organization`: [Frappe CRM Organization](https://docs.frappe.io/crm/organization)
- `erpcrm`: [ERPNext CRM: sürüm ve kaldırma notu](https://docs.frappe.io/erpnext/CRM)
- `helpdesk`: [Frappe Helpdesk Settings](https://docs.frappe.io/helpdesk/settings)
- `sla`: [Frappe Helpdesk Service Level Agreement](https://docs.frappe.io/helpdesk/service-level-agreement)
- `ticket`: [Frappe Helpdesk Ticket View](https://docs.frappe.io/helpdesk/lesson-2understanding-ticket-view)
- `helpfields`: [Frappe Helpdesk Permission Levels](https://docs.frappe.io/helpdesk/customization/perm-levels-in-helpdesk)
- `insights`: [Frappe Insights Introduction](https://docs.frappe.io/insights/introduction)
- `ledger`: [ERPNext Immutable Ledger](https://docs.frappe.io/erpnext/immutable-ledger-in-erpnext)
- `press`: [Frappe Press resmî deposu](https://github.com/frappe/press)
- `deploy`: [Frappe Docker resmî dağıtım deposu](https://github.com/frappe/frappe_docker)
- `cloudbackup`: [Frappe Cloud Backups](https://docs.frappe.io/cloud/sites/backups)
- `keymail`: [Keycloak Server Administration: Email](https://www.keycloak.org/docs/latest/server_admin/index.html#_email)
- `keyoidc`: [Keycloak OIDC Layers](https://www.keycloak.org/securing-apps/oidc-layers)
- `activepieces`: [Activepieces resmî deposu](https://github.com/activepieces/activepieces)
- `metabase`: [Metabase Embedding Introduction](https://www.metabase.com/docs/latest/embedding/introduction)
- `langgraph`: [LangGraph Overview](https://docs.langchain.com/oss/python/langgraph/overview)
- `models`: [LangChain Models](https://docs.langchain.com/oss/python/langchain/models)
- `retrieval`: [LangChain Retrieval](https://docs.langchain.com/oss/python/deepagents/retrieval)
- `middleware`: [LangChain Prebuilt Middleware](https://docs.langchain.com/oss/python/langchain/middleware/built-in)
- `structured`: [LangChain Structured Output](https://docs.langchain.com/oss/python/langchain/structured-output)
- `interrupts`: [LangGraph Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- `persistence`: [LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- `owaspai`: [OWASP Top 10 for LLM Applications](https://owasp.org/projects/top-10-for-large-language-model-applications)
- `consent`: [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- `gtm`: [Google Tag Manager Setup](https://support.google.com/tagmanager/answer/14842164)
- `metrica`: [Yandex Metrica resmî yardım](https://yandex.com/support/metrica/en/)
- `gdpr`: [GDPR resmî AB metni](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- `kvkk`: [KVKK Uyum Süreci Duyurusu](https://www.kvkk.gov.tr/Icerik/6554/Kisisel-Verilerin-Korunmasi-Kanunu-Uyum-Surecine-Iliskin-Duyuru)
- `notice`: [KVKK Aydınlatma Yükümlülüğü Duyurusu](https://www.kvkk.gov.tr/Icerik/6765/AYDINLATMA-YUKUMLULUGUNUN-YERINE-GETIRILMESI-HAKKINDA-KAMUOYU-DUYURUSU)
- `transfer`: [KVKK Kanun Değişiklikleri Duyurusu](https://www.kvkk.gov.tr/Icerik/7834/6698-Sayili-Kisisel-Verilerin-Korunmasi-Kanununda-Yapilan-Degisiklikler-Hakkinda-Kamuoyu-Duyurusu)
- `push`: [MDN Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- `notificationsapi`: [MDN Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- `sse`: [MDN Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- `mailgunverify`: [Mailgun Domain Verification](https://documentation.mailgun.com/docs/mailgun/user-manual/domains/domains-verify)
- `mailgunsuppress`: [Mailgun Tracking Messages](https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages/tracking-messages)
- `waf`: [Cloudflare WAF resmî dokümanı](https://developers.cloudflare.com/waf/)
- `bots`: [Cloudflare Bot Solutions resmî dokümanı](https://developers.cloudflare.com/bots/)
- `vault`: [HashiCorp Vault Secrets Engines](https://developer.hashicorp.com/vault/docs/secrets)
- `prometheus`: [Prometheus Overview](https://prometheus.io/docs/introduction/overview/)
- `traces`: [OpenTelemetry Traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- `pitr`: [PostgreSQL Continuous Archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)
- `objectlock`: [Amazon S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
- `upstream`: [NGINX HTTP Upstream Module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)
- `sentry`: [Sentry resmî Python SDK deposu](https://github.com/getsentry/sentry-python)
- `utm`: [Google Analytics Campaign URL Builders](https://support.google.com/analytics/answer/10917952?hl=en)
- `migrate`: [Bench migrate](https://docs.frappe.io/framework/user/en/bench/reference/migrate)
- `bench`: [Bench resmî CLI tanıtımı](https://frappe.io/bench)

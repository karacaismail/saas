# Yeniden kullanım mimarisi

Kanonik içerik `data/project/project.json` içindeki `reusePlan` nesnesidir. A–H kararları, kavramsal tanımlar ve üç görev kartı oradan yayımlanır; bu belge onları kopyalamaz. Kaynak, kullanıcının 2026-10-12 tarihli yeniden kullanılabilir uygulama mimarisi ek metni ve mevcut kapsamla uyum talebidir. Ekteki önceki “bu tur dosya değiştirme” çıktı koşulu, güncel uygulama/yayın talebinin yerine geçmez.

`reusePlan`, önceki `currentPlan`, 994 görev ve 20 kanonik kaynağa eklenmiştir. Ürün reposu, kurulu apps/sürümler ve gerçek DocType eşlemeleri bilinmiyor. R-00 mevcut T-00 baseline’ını kullanarak sonlu envanter çıkarır; R-01 tek izinli ResourceDefinition v1 projection sözleşmesini; R-02 iki config ile tek controlled TextField davranışını sınırlar. Üçü BLOCKED ve değişen DocType sayıları sıfırdır. Tam form/liste/detay ve üçüncü tüketici kabulü sonraki kapıdır.

Ortak mekanizma gerçek ortak paket olarak tüketilir. A–F envanter kararı kod yerini belirler; aynı ürün reposunda ortak frontend paketleri ve uygun ortak Frappe app modülleri hedeflenir. Her DocType için app, ikinci ORM veya kopya CRUD motoru kurulmaz. ERPNext/Frappe CRM/HRMS, Frappe çekirdeğiyle eşitlenmez. Ant Design/X, TanStack Router/Query, Keycloak, Tauri 2 ve WXT kararları korunur; grid seçimi ve HarmonyOS kanıtı açık kalır.

Resmî referanslar 2026-10-12 tarihinde incelendi; genel belgeler hedef kurulum kanıtı değildir:

- [Document API](https://docs.frappe.io/framework/user/en/api/document): etkin metadata Custom Field/Property Setter etkilerini içerir; kayıt yaşam döngüsü ve sunucu izinleri korunur.
- [REST API](https://docs.frappe.io/framework/user/en/api/rest): mevcut kayıt ve izinli yöntemler değerlendirilir; Python fonksiyonu kendiliğinden uzaktan API sayılmaz.
- [Hooks](https://docs.frappe.io/framework/user/en/python-api/hooks): genişletme hedef sürüme göre seçilir; v16+ desteği bilinmeyen/eski sürüme dayatılmaz.

Güvenli projection, tenant/kullanıcı/yetki cache ayrımı, kısmi güncellemede gönderilmeyen alanı koruma, parent-child invariantı ve kaynak bazlı offline politikası kabul kapılarıdır. UI’da gizlemek sunucu yetkisi değildir. Gerçek ürün komutları henüz bilinmiyor; dokümantasyon kontrolleri ürün entegrasyonu veya üç tüketici kanıtı yerine geçmez. Firefox kapsamı daralması yalnız bu Pages reposuna aittir.

## Geliştirme verimliliği ve güncel sıra

Kullanıcının sonraki verimlilik eki, mevcut `reusePlan` bölümlerine işlenir; üçüncü bir plan veya paralel görev listesi oluşturulmaz. A–N adaylarının değerlendirmesi, kanıtlar, çelişki kayıtları ve sıralama gerekçeleri aynı kanonik JSON’da tutulur. Önceki `currentPlan` ve 994 tarihsel kayıt korunur. Yaklaşık on kısa sıralama referansı mevcut görev kimliklerine bağlanır; yeni görev kopyaları değildir. Etkin ayrıntılı sıra yalnız R-00, R-01 ve R-02 kartlarıdır; eski kartlar geçmiş bağlam olarak kalır.

R-00, T-00 baseline’ını yeniden kullanır. Salt okunur kaynak envanteri T-01’i beklemez; bu ayrım eksik ürün kaynağı ve sürüm giriş koşullarını kaldırmaz. T-01 kimlik doğrulamalı çalışma zamanı akışlarını, T-09 yalnız ilgili platform işlerini engeller. Sözleşme, gerekli backend davranışı ve ortak arayüz bağlantısından oluşan küçük referans akışın T-08 gerçek entegrasyon kanıtı, bütün ortak altyapının tamamlanmasına bağlanmaz. Her uygulama mikro görevi kendi TDD döngüsünü, dar sahiplik sınırını ve birleşme kanıtını korur.

Bu teslim planlama belgelerini günceller; ürün uygulaması, yeni Skill, ortam kurulumu veya test matrisi büyümesi içermez. Ortaklaştırma yalnız somut tekrar, yakın tüketici ve en küçük uyumlu geçiş kanıtıyla önerilir; ölçülmemiş zaman veya verim kazancı ileri sürülmez.

## GenUI sahipliği ve Frappe headless sağlayıcı hazırlığı — 2026-10-14

Kullanıcının 2026-10-14 kararı bağlayıcıdır: GenUI Frappe, FastAPI, PHP veya başka bir backend'den bağımsızdır ve kullanıcı tarafından geliştirilir. Bu SaaS deposu GenUI geliştirmez; rolü, seçili tek sağlayıcı olan Frappe için sağlayıcı/host sözleşmesinin kabulünü planlamaktır. Kanonik içerik `reusePlan.headlessReadiness` içindedir; bu belge onun özetidir, kontrol listesini kopyalamaz. Üçüncü görev registry'si yoktur.

**Tarihsel kapsamın okunuşu.** Geliştirme planındaki `genui-runtime` biriminin post_mvp/conditional ataması ve `ui-family-39` ile `ui-provider-registry` kümelerinin `frontend/packages/genui` sahipliği tarihsel kayıt olarak korunur. Bu iki kümenin görevlerinde güncel kapsam `overrides` kaydıdır: sahibi harici kullanıcı GenUI'sidir; SaaS tarafında yalnız Frappe sağlayıcı ve host sözleşmesinin kabulü kalır. Bu bir GenUI uygulama izni değildir. Tarihsel kaynak plan ve atlas metni ile kayıtları korunur, yeniden yazılmaz. Buna karşılık derlenen `/atlas/` teknik açıklama yüzeyi güncel kanonik master notunu ve bağlantısını gösterir; etkilenen görev paketleri `executionScope` override'ını görüntüler. Bu görüntülenen not korunan kaynağı değiştirmez; çelişkide güncel master notu geçerlidir.

**Erken PoC ile sonraki GenUI özellikleri.** Erken sağlayıcı PoC'si gerçek Frappe oturumu, izinli metadata/sorgu ve sözleşme kanıtını hedefler. Model gateway, katalog genişlemesi ve gelişmiş GenUI yüzeyleri kullanıcının GenUI yol haritasıdır ve bu PoC'nin ön koşulu değildir.

**Ayrımlar.**

- Plan tamamlanması runtime kanıtı değildir. Kanonik kontrollerin varsayılan durumu `not_run`, evidence'ı boştur. Ürün baseline'ı dondurulana kadar validator yalnız `unknown` veya `not_run` durumunu boş evidence ile kabul eder; başka durum veya dolu evidence geçersizdir.
- Seçili %100 headless hazırlık yalnız seçili, sürümlü sözleşme ve akışların Desk, `frappe.call`/`frm` veya Desk client asset'i olmadan, gerçek izin/sözleşme kanıtıyla geçmesidir. Evrensel Frappe uyumluluğu, kurulu hazırlık veya yüzdelik ilerleme anlamına gelmez.
- Kaynak registry'si veri/projection sahibidir; sunucu query/action kataloğu kayıtlı kimlik ve parametre şemasını sahiplenir; GenUI component kataloğu harici tüketicidedir. Biri diğerinin yerine geçmez.
- Metadata projection, sunucu doğrulaması, CSRF/auth, tanımlar, persistence, eylem receipt'i, idempotency, audit, sürüm, tipli hata ve Desk bağımsızlığı ayrı kabul alanlarıdır.

**52 kontrol.** 13 alan × 4 dar kontrol, G0–G6 kapılarına ve mevcut görev kimliklerine `direct`, `partial` veya `gap` eşlemesiyle bağlanır. Bunlar kabul yükümlülüğüdür; 52 yeni test, 52 yeni görev veya uygulamaya hazır iş değildir. Taslaklar bağımsız üretilmiş öneri olarak incelenmiştir, kaynak bulgusu sayılmaz.

**T-00 ve pilot.** Hedef ürün baseline'ının bilinmemesi runtime kabulünü engeller, bu planın yayımlanmasını engellemez. İlk pilot: tek yetkili Frappe kaynağından kart tanımını kaydetmek, model çağırmadan yeniden açmak ve güncel izinli veriyi getirmek; iki yetki kapsamıyla negatif sorgu ve tanım izni ayrıca sınanır. Frappe'de tanım persistence'ı gerçek eşleme boşluğudur: saved view CardDefinition sayılmaz ve yeni app reçete edilmez. Eksik sınırlı persistence sözleşmesi, ilk tüketici kanıtıyla belirlenecek tek dar görevdir.

**İstisnalar taşınmaz.** Bu Pages reposunun Firefox kapsamı, test sayı sınırları ve pasif pill boyutu ile Atlas'ın UI istisnaları ürüne veya GenUI'ye yayılmaz. Komutlar, zorunlu CI sınırları, lisans, Git guard ve runtime değişmez.

Genel resmî referanslar 2026-10-14 tarihinde incelendi; hedef kurulum kanıtı değildir. Whitelisting tek başına belge izni uygulamaz; `get_all` izin filtrelemesini atlar, `get_list` uygular; izinli yazma yollarında native controller ve iş kuralları korunur. Kullanılabilir REST sürümü T-00'da doğrulanır, v2 garanti değildir. Harici istemci HTTP kullanır; Desk `frappe.call`/`frm` sağlayıcı ön koşulu değildir. Cookie/CSRF ile bearer/origin/audience seçimi hedefe özgü sözleşmedir; OIDC/PKCE tamamen özel giriş UI'sinin uygulanabilirlik kanıtı değildir. Gelecek Frappe/Keycloak sürümleri bilinmiyor.

- Frappe: [REST API](https://docs.frappe.io/framework/user/en/api/rest), [Document API](https://docs.frappe.io/framework/user/en/api/document), [Database API](https://docs.frappe.io/framework/user/en/api/database), [Hooks](https://docs.frappe.io/framework/user/en/python-api/hooks), [Whitelisted methods](https://docs.frappe.io/framework-git/server-side/whitelisted-methods)
- Kimlik ve veri akışı: [Keycloak OIDC katmanları](https://www.keycloak.org/securing-apps/oidc-layers), [A2UI veri akışı](https://a2ui.org/concepts/data-flow/)

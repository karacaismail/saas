# Uygulama bileşen aileleri kataloğu

2026-10-11 kullanıcı talebi, Tauri 2 ve Ant Design / Ant Design X kararlarının ardından uygulanır. Kanonik kaynak `data/component-catalog.json`; kaynak ekin adı, SHA-256 değeri ve inceleme tarihi bu dosyada bulunur. Bu belge gelecekteki SaaS ürünlerinin kapsamıdır; statik Atlas'a React, Frappe, Keycloak, Tauri veya TanStack kurulumu değildir.

Katalog 40 uygulama ailesi, 15 koleksiyon görünümü ve 8 görünmeyen destek katmanından oluşur. Her kaydın açıklaması, gereklilik koşulu, Frappe sınırı, kalan geliştirme işi, kabul koşulu ve envanter bağlantıları vardır. Çoğu aile mevcut maddelerle eşleştirilir; yeniden aynı özelliği eklemek yerine ayrıntılı bileşen sözleşmesi sağlanır. Yeni üç boşluk mevcut grupların sonuna eklenir: `model-8` kontrollü/sürümlü metadata adaptörü, `realtime-7` modüller arası atama ve kişisel iş kuyruğu, `reports-9` şablonlu belge/PDF ve toplu çıktı.

Önceki aşamanın 384 tam maddesi ve 106 kararı `tests/fixtures/catalog-baseline.json` içinde korunur. İlk hazırlıkta yeni, henüz yayımlanmamış `identity-10` metnindeki `identity-9/mob` yazım hatası bağımsız inceleme sonucunda `identity-9 ve mobile-oidc` olarak dar biçimde düzeltildi; bundan sonra katalog öncesi modelin semantik SHA-256 değeri `eb1bf8ad29544dbbf6ea3191bdeba92bdf0dff4d17164121d5d4a1b6d7b631e7` ile sabitlendi. Önceki yayımlanmış 377 madde/94 karar fixture'ı ve eski bütün hashler değişmedi. Katalog aşamasında bu 384 kayıt yeniden yazılmaz; eski sıra, kimlik, seçim anahtarı, kaynak, assessment ve kararlar korunur. Değişen arayüz sayımları `interface.retiredCopy.catalog` içinde arşivlenir.

## Kesin teknoloji sözleşmesi

- Backend buluttaki Frappe; sunucu kayıt/alan yetkilendirmesi Frappe'tedir. Bütün login/auth Keycloak'tadır; subject, tenant ve Frappe User eşlemesi ayrıca doğrulanır.
- Ortak React frontend Ant Design / Ant Design Pro ailesini, GenUI Ant Design X / X Cards kataloğunu kullanır. “Headless frontend”, Frappe Desk'ten bağımsız uygulama demektir; Ant Design'ın stilsiz bir kütüphane olduğu anlamına gelmez.
- Keycloak giriş arayüzünün de tamamen bağımsız/headless olması kullanıcı hedefidir. Tema/Keycloakify bu hedefin gerçekleştiğinin kanıtı değildir. Desteklenen kimlik protokolü, MFA/sosyal giriş ve native callback güvenliğiyle uyumlu çözüm, hedef release ve PoC ile doğrulanacak açık geliştirme boşluğudur. Standart OIDC yönlendirmesi hedefi otomatik karşılamaz; parola toplayıp ROPC/Direct Grant çağırma kestirmesi önerilmez.
- TanStack Router gezinme ve doğrulanmış URL durumunu; TanStack Query sunucu önbelleği, istek, mutation ve invalidation koordinasyonunu üstlenir. Query tek başına kalıcı local-first veri, transactional outbox veya çift yönlü sync motoru değildir.
- AG Grid ile TanStack Table arasında tablo motoru kararı açık kalır. Ürün gereksinimi ve Community/Enterprise özellik-lisans farkı değerlendirilmeden seçim yapılmış gibi gösterilmez. Pivot gibi katalog görünümleri bir paketin ücretsiz sürümünde hazır varsayılmaz.
- Native Android/iOS ve Windows/macOS/Linux Tauri 2; web Vite/PWA; eklenti WXT/Manifest V3. Mobil imzalı mağaza yayını, masaüstü updater ve doğrulanmamış mobil OTA ayrımı [mobil planda](mobile-plan.md) korunur.

Kesin ürün dependency release'leri henüz sabit değildir. Resmî güncel doküman taraması, hedef kurulumun sürüm ve çalışma kanıtı sayılmaz.

## Bileşenlerin birlikte çalışma sınırları

View Switcher yalnız sunumu seçtirir. Filtre, sorgu, sıralama, sayfalama, seçim ve görünüm ayarları ortak sözleşmeyle koordine edilir; tablo sütun genişliği Kanban'a taşınmak zorunda değildir. Geçişte ortak filtre/seçim korunur, veri modeline anlamsız görünümler açılmaz. Form ve Detail tekil kayıt yüzeyleri; Split/Master–Detail yerleşim; Dashboard birleşik yüzeydir. Bunlar koleksiyon görünüm kataloğuna aynı düzeyde doldurulmaz.

Frappe DocType/DocField/Document, Link/Dynamic Link ve child table veri temellerini sağlar. Desk `frm` veya Form Script bağımsız Ant formunda kendiliğinden çalışmaz. Metadata adaptörü izinli alanları sürümlü sözleşmeye çevirir; bilinmeyen alan davranışını sessizce atlamaz. İlişkili kayıt seçimi arama, tenant/yetki filtresi, seçim, önizleme ve geçerliliği yeniden kontrol etme sorumluluklarını birlikte taşır.

Frappe `docstatus` taslak/kesinleşmiş/iptal yaşam döngüsüdür; iş akışı/onay durumuyla aynı kavram değildir. UI işlem kullanılabilirliğini gösterir; sunucu yetki ve belge durumunu tekrar denetler. Frontend'de düğme gizlemek sunucu güvenliği değildir. Tenant değişiminde sorgu anahtarı, önbellek, seçili kayıt, realtime aboneliği ve eski istek sonuçları doğru kapsamda temizlenir veya ayrıştırılır.

Toast ile saklanan bildirim merkezi; kullanıcı faaliyet akışı ile denetim izi; iş atama kuyruğu ile backend job kuyruğu ayrı amaçlardır. “Asistan önerdi”, “kullanıcı onayladı”, “yerelde kaydedildi”, “merkez kabul etti” ayrı durumlar olarak sunulur. AI/ağ kesintisinde normal yerel iş ekranı çalışmaya devam eder; yapılmamış işlem için başarı veya sahte ilerleme gösterilmez.

## Sunum ve dışa aktarma

Katalog varsayılan kapalı native disclosure'dır. 63 kayıt ayrıca kapalı gelir; aynı anda yalnız bir katalog kaydı açılır. Envanterdeki tek-açık başlık davranışı ayrı korunur. Katalogdaki bağlantı mevcut özelliğe götürür; checkbox hâlâ envanter maddesini seçer, tamamlanma bildirmez. Yazdırma bütün katalog açıklamalarını geçici açar ve önceki durumları geri yükler.

JSON v3 ve Markdown seçili maddelerle ilişkili katalog kayıtlarının bütün alanlarını içerir. İlgisiz aile kayıtları çıkarılır; bir katalog kaydının `itemIds` alanı yalnız seçili referanslara daraltılır. Ortak kaynak/teknoloji/açıklama bağlamı korunur. Boş seçimde katalog eklenmez. Katalog içermeyen legacy model ve çıktı hashleri korunur. CSV mevcut 18 sütunlu özellik/değerlendirme/kapsam sözleşmesinde kalır; iç içe katalog verisi JSON/Markdown'a aittir.

Manifestteki opsiyonel `componentCatalog` yolu aynı güvenli JSON yükleme, doğrulama, atomik mount ve statik fallback yoluna katılır. Hatalı referans, yinelenen kimlik, yanlış veri türü veya güvensiz kaynak URL'si mount öncesinde reddedilir. Metinler HTML/Markdown için kaçırılır; JSON hiçbir HTML/CSS/JS programı içermez. Ek JSON dosyası production allowlist ve ağ testlerinde açıkça sayılır.

## Doğrulama sınırı

`node --test tests/catalog.test.js`, tüm eski kayıtların derin eşitliğini, 40/15/8 kapsamını, doğru referansları, hatalı veri reddini, kaçışları, seçime göre kayıpsız JSON/Markdown ve no-JS yapısını doğrular. `playwright test tests/catalog.spec.js`, 320px klavye/odak/tek-açık katalog, gerçek indirmeler, no-JS erişim ve JSON ağ hatası fallback'ını kapsar. Yeni üç özelliğin gerçek checkbox ve değerlendirmeleri ayrıca test edilir.

Bu kontroller dokümantasyon uygulamasına aittir. Gerçek Frappe metadata/atama/çıktı servisi, Keycloak headless giriş, native Tauri, mobil OTA, fiziksel cihaz ve dört günlük offline fault kabulü `not_run` durumundadır. Çalıştırılan sonuçlar ve yayın kanıtı [doğrulama kaydına](verification.md) yazılır.

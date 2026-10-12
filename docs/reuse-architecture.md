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

# SaaS Atlas UX kararları

10 Ekim 2026. Başlangıç: b97eeff12b0f490ccf79335034ff87bc9365f9a8.

## Gözlenen sorun

320×900 Chromium/macOS başlangıcında hero671px, araçlar796px, teknik giriş795px, seçim alanı384px; ilk özellik yaklaşık3291px aşağıdaydı. İlk görünümde envantere doğrudan giden eylem yoktu. Masaüstünde araç alanı334pxyükseklikteydi; ağır kutular ve tekrar eden alt çizgiler aynı görsel önemi taşıyordu. Özellik açıklaması, kaynak sınıfı ve yeterlilik metadatasının hizası birbirinden kopuyordu. `artifacts/ux-before/` görselleri ve computedJSON başlangıç kanıtıdır.

## Tasarım

Amaç bir SaaS geliştirme envanterini taramak, Frappe'te kalan işi ayırmak ve seçilenleri dışa aktarmaktır. Kimlik sıcak beyaz zemin, genel arayüzde koyu mürekkep, kaynak sınıflarında tam doygun mavi/yeşil/kırmızı ve Outfit üzerine kurulur. Kullanıcının10Ekim2026 renk düzeltmesiyle özgün kapsam mavidir; kapsam içi eksik yeşil, yeni alan kırmızıdır. Madde metni, kaynak etiketi ve checkbox kendi sınıf rengini paylaşır; legend, filtre ve yazdırma açıklamaları aynı eşlemeyi kullanır. Frappe yeterlilik etiketleri ayrı eksendir. Yeni framework, grafik, dış kaynak veya cihaz kabuğu eklenmez.

- İlk görünümde “Özellikleri incele” doğrudan envantere gider. Sayaçlar eşit sütunlarda okunur; başlık, açıklama ve ikincil rehber farklı hiyerarşide sunulur.
- Teknik yaklaşım ve etiket rehberi native details içinde başlangıçta kapalıdır. Frappe/Keycloak/headless kapsamı summary'de görünür; tam açıklamalar, sürüm sınırları, dağılım ve kaynaklar açıldığında korunur. JavaScript olmadan da çalışır.
- Arama, küme ve filtreler görünür kalır. İkincil kontroller daha hafif yüzeyler kullanır; seçili durum ve tek klavye odağı belirgindir.
- Özellik listesi belge düzenini korur; dekoratif kart/gölge eklenmez. Metin ağırlığı, satır aralığı ve geniş ekran metadata hizası taramayı kolaylaştırır. Pasif0.8rem kapsül etiketler kullanıcı istisnasıyla korunur; diğer okunabilir metin en az1rem.
- Seçim/dışa aktarma ayrı bir iş bölgesi olarak belirginleşir. JSON/CSV/MD, kararlı kimlikler, filtrelerin kesişimi ve saklama sözleşmesi aynıdır.

## Kabul

320px varsayılan yazıda ilk viewport'taki bağlantı gerçek tıklamayla görünür envanter başlığına götürür. Teknik rehber click/Enter ile açılıp kapanır; arama/seçim kaybolmaz. JavaScript kapalı ve%200root durumlarında içerik erişilebilir kalır.320/360/375/390, yatay telefon, tablet, masaüstü ve değişen sınırlar üçmotorda kontrol edilir. Gerçek Safari/cihaz/ekran okuyucu kontrolleri otomasyonla eş tutulmaz. Görsel referanslar önce/sonra/fark ve bağımsız incelemeden sonra güncellenir.

Metadata için viewport/cihaz adı yerine inventory'nin inline-size alanı kullanılır.36rem eşiğinin varsayılan fontta ilk geçişi607/608/609px viewport örnekleriyle mevcut durum-koruma matrisine eklendi;640ve1024 sınırları da korunur. Kapsayıcı sorgusu kullanılmayan tarayıcıda tam genişlik metadata temel deneyimi kalır. [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) sözleşmesi esas alınır; destek/çalışma kabulü gerçek üçmotor koşularıyla ayrılır.

## Saydam kaynak yüzeyleri ve pastel kategoriler — 10 Ekim 2026

Başlangıç commit'i `c4a4bb61cb9ac52ff4d73adb0a036d8eae41dcba`. Kullanıcı kaynak renklerini%5 opaklıkla arka planda da istedi. Her madde, legend ve kaynak filtresi aynı merkezi HSL kanalından alpha0.05 yüzey alır; metin/checkbox tam opaktır. Önceki yeşil lightness26%, yeni birleşik zeminde yaklaşık4.40:1 verdiğinden25% seçildi; doygunluk100% ve yeşil renk ailesi korunur. Yeni en düşük kaynak metin kontrastı üçmotorda >=4.5:1 ölçülür. Genel süt beyazı zemin korunur.

Yeterlilik: çekirdekte var→mint, kısmen var→amber, ek Frappe uygulaması→lavanta, çekirdekte hazır değil→gül, harici sorumluluk→cyan, doğrulanmalı→slate. Yapılandır→mint, genişlet→amber, entegre et→cyan, geliştir→gül, PoC ile doğrula→lavanta. Sorumlu etiketleri ayrı, sakin zeytin pasteli kullanır.136 sorumlu metninden yapay rol sınıflaması üretilmez. Metin etiketleri anlamı açıkça taşır; renk tek başına bilgi vermez. Generator support/action/owner eksenlerini data-tag, yeterlilik/iş değerlerini data-value ile yayınlar. Sınıflandırma ve export verisi aynıdır.

Satırlar hafif kaynak yüzeyi ve aralarındaki boşlukla ayrılır; tekrar eden alt kenarlık kaldırılır. Dar alanda küçük iç boşluk, geniş inventory container'ında daha rahat boşluk ve mevcut metadata hizası korunur. İkincil araçlar alan yettiğinde iki sütuna, büyütülmüş metinde tek sütuna akar. Dışa aktarma biçimleri ve eylemi ortak sakin yüzeyde toplanır; seçili biçim belirgin, kontrol hedefleri44/48px kalır. Legend, filtreler, hover ve seçim durumları aynı kimliği izler. Yeni kaynak veya runtime paketi yoktur.

Bağımsız incelemede320px/%200root durumunda `Subdomain` ve `Değerlendirme` kelimelerinin dar title/summary kolonunda ortadan bölündüğü görüldü.16rem ve altındaki inventory alanında checkbox/kaynak etiketi ilk satırda, özellik metni tam genişlikte akar; summary metni de dekoratif okla aynı dar kolona zorlanmaz. Büyük metinde grup summary eylemi ayrı satır alır. Regresyon gerçek kelimelerin Range rectlerini tek satırda doğrular; normal320px ve geniş metadata akışı korunur.

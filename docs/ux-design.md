# SaaS Atlas UX kararları

10 Ekim 2026. Başlangıç: b97eeff12b0f490ccf79335034ff87bc9365f9a8.

## Gözlenen sorun

320×900 Chromium/macOS başlangıcında hero671px, araçlar796px, teknik giriş795px, seçim alanı384px; ilk özellik yaklaşık3291px aşağıdaydı. İlk görünümde envantere doğrudan giden eylem yoktu. Masaüstünde araç alanı334pxyükseklikteydi; ağır kutular ve tekrar eden alt çizgiler aynı görsel önemi taşıyordu. Özellik açıklaması, kaynak sınıfı ve yeterlilik metadatasının hizası birbirinden kopuyordu. `artifacts/ux-before/` görselleri ve computedJSON başlangıç kanıtıdır.

## Tasarım

Amaç bir SaaS geliştirme envanterini taramak, Frappe'te kalan işi ayırmak ve seçilenleri dışa aktarmaktır. Kimlik sıcak beyaz zemin, koyu mürekkep, kaynak sınıfını gösteren tam doygun yeşil/kırmızı ve Outfit üzerine kurulur. Yeni framework, grafik, dış kaynak veya cihaz kabuğu eklenmez.

- İlk görünümde “Özellikleri incele” doğrudan envantere gider. Sayaçlar eşit sütunlarda okunur; başlık, açıklama ve ikincil rehber farklı hiyerarşide sunulur.
- Teknik yaklaşım ve etiket rehberi native details içinde başlangıçta kapalıdır. Frappe/Keycloak/headless kapsamı summary'de görünür; tam açıklamalar, sürüm sınırları, dağılım ve kaynaklar açıldığında korunur. JavaScript olmadan da çalışır.
- Arama, küme ve filtreler görünür kalır. İkincil kontroller daha hafif yüzeyler kullanır; seçili durum ve tek klavye odağı belirgindir.
- Özellik listesi belge düzenini korur; dekoratif kart/gölge eklenmez. Metin ağırlığı, satır aralığı ve geniş ekran metadata hizası taramayı kolaylaştırır. Pasif0.8rem kapsül etiketler kullanıcı istisnasıyla korunur; diğer okunabilir metin en az1rem.
- Seçim/dışa aktarma ayrı bir iş bölgesi olarak belirginleşir. JSON/CSV/MD, kararlı kimlikler, filtrelerin kesişimi ve saklama sözleşmesi aynıdır.

## Kabul

320px varsayılan yazıda ilk viewport'taki bağlantı gerçek tıklamayla görünür envanter başlığına götürür. Teknik rehber click/Enter ile açılıp kapanır; arama/seçim kaybolmaz. JavaScript kapalı ve%200root durumlarında içerik erişilebilir kalır.320/360/375/390, yatay telefon, tablet, masaüstü ve değişen sınırlar üçmotorda kontrol edilir. Gerçek Safari/cihaz/ekran okuyucu kontrolleri otomasyonla eş tutulmaz. Görsel referanslar önce/sonra/fark ve bağımsız incelemeden sonra güncellenir.

Metadata için viewport/cihaz adı yerine inventory'nin inline-size alanı kullanılır.36rem eşiğinin varsayılan fontta ilk geçişi607/608/609px viewport örnekleriyle mevcut durum-koruma matrisine eklendi;640ve1024 sınırları da korunur. Kapsayıcı sorgusu kullanılmayan tarayıcıda tam genişlik metadata temel deneyimi kalır. [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) sözleşmesi esas alınır; destek/çalışma kabulü gerçek üçmotor koşularıyla ayrılır.

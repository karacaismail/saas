# Temporal Öneri Ajanları Yönergesi

Bu belge Temporal altında belge önerisi üretme ve seri entegrasyon kurallarını tanımlar. Ürün uygulaması veya Frappe runtime kabulü değildir.

## 1. Kapsam

- Öneri ajanları yalnız belge önerisi (JSON) üretir.
- SaaS ürün kodu, fixture, test veya servis işi bu kapsamın dışındadır.
- Kaynak dosyalarına yazılmaz. Ajan dosya yazma, komut çalıştırma veya ağ aracı kullanmaz.
- Belge entegrasyonu ajan tarafından yapılmaz (bkz. Bölüm 7).

## 2. Hermes Havuzu ve Fallback Zinciri

- Kurulu Hermes havuzu ve fallback zinciri bu süreç kapsamında değiştirilmez.
- Ajan çağrıları mevcut yapılandırmayı olduğu gibi kullanır.

## 3. Araç Seçimi: `-t bot_room`

- `-t bot_room` açık ve araçsız bir toolset seçimidir. Toolset tanımı için kaynak: `toolsets.py:134` (`bot_room`).
- Boş `-t` değeri veya `-t none` bu seçimle aynı anlama gelmez. Bunlar `bot_room` yerine kullanılmamalıdır.
- Hedef: model tarafında sıfır araç.

## 4. Onay Geçişi: `-z`

- `-z`, native onay geçişini otomatik yapabilir.
- Bu kolaylık koruma ilkelerini gevşetmez. Sıfır model aracı ve kaynak yazma koruması esastır.
- Otomatik onay, araçsız seçimle (`bot_room`) birlikte değerlendirilir. Yazma veya yürütme yetkisi doğurmamalıdır.

## 5. Kullanım Kaydı (usage-file)

- Her iş kendine özel bir usage-file üretir. İşler arasında usage-file paylaşılmaz.
- Usage dosyasının yazımı için kaynak: `hermes_cli/oneshot.py:215` (`def _write_usage_file`).
- Provider ve model bilgisi, tamamlanmış usage kaydından alınır. Komut satırı varsayımından veya beklenen yapılandırmadan çıkarılmaz.
- Usage kaydı tamamlanmamışsa provider/model bilinmiyor olarak işaretlenir.

## 6. Hız ve Kota Sınırları (429 / usage_limit)

- Bir CLI 429 veya `usage_limit` döndürürse tekrar döngüsü kurulmaz.
- Yanıttaki `Retry-After` değeri olduğu gibi korunur ve kayda geçirilir.
- `Retry-After` yoksa değer tahmin edilmez. Eksik olduğu açıkça belirtilir.
- Claude tarafından tamamlanamayan paket Hermes üzerinden bir kez yeniden gönderilir; Claude taşıyıcısına kör tekrar yapılmaz. Sonraki hazır belge işleri de Claude sınırı kalkana kadar Hermes hattına yönlendirilir.

### Fallback Görünürlüğü

- Hermes native iç fallback denemeleri usage-file içinde ayrıntılı olarak yer almıyorsa, raporda görünürlüğün sınırlı olduğu açıkça yazılır.
- Görünmeyen denemeler hakkında sağlayıcı, model veya deneme sayısı varsayımı yapılmaz.

## 7. Birleştirme (Ana Entegratör)

Öneriler kaynak dosyalarına doğrudan girmez. Ana entegratör önerileri seri olarak birleştirir ve şu koşulları uygular:

1. Immutable digest: Girdi ve öneri içeriği değişmez özetlerle sabitlenir.
2. Şema doğrulaması: Öneri, tanımlı JSON şemasına uymalıdır. Uymayan çıktı reddedilir, onarılmaz.
3. Sahiplik ve CAS: Hedef dosyanın sahipliği doğrulanır. Yazım compare-and-swap ile, beklenen `before` durumuna (ve hash değerine) karşı yapılır.
4. Kaynak alıntısı: Öneri, doğrulanmış kanıtlara en az bir `path:line` atfıyla bağlanır.
5. Bağımsız inceleme: Birleştirme öncesinde öneriyi üreten ajandan bağımsız bir inceleme yapılır.

## 8. Kanıt Atıfları

- `hermes_cli/oneshot.py:215`: `def _write_usage_file`
- `toolsets.py:134`: `bot_room`

Not: Bu atıflar yalnız ilgili tanımların konumunu gösterir. Davranışın doğrulandığı anlamına gelmez.

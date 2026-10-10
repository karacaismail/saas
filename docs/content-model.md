# Kayıpsız JSON içerik modeli

Bu geçişin başlangıcı `08a29ad7d3efe048db3ae54e56aae74fef315a28` sürümüdür. Kullanıcı içerik değişikliği istemedi: 12 küme, 49 başlık, 326 madde; metin, raw alanının varlığı, sınıf, değerlendirme, kaynak, ilişki ve yol haritası sırası birebir korunur. Aynı anda tek başlığın açılması davranış değişikliğidir; metin düğmesindeki toplu genişletme işlevi bu nedenle kaldırılmıştır. Önceki düğme metni bile JSON metin arşivinde korunur.

## Dosyaların sorumluluğu

| Dosya                             | İçerik                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `data/manifest.json`              | İçerik dosyaları ve değişmeyen küme sırası                                        |
| `data/clusters/<kararlı id>.json` | Bir tam küme; başlıklar, ilişkiler, maddeler, raw ve tüm Frappe değerlendirmeleri |
| `data/atlas.json`                 | Kaynak dizini, içerik tarihi, kapsam sınıflarının açıklamaları                    |
| `data/roadmap.json`               | Hedef, kanıt sınırı, etiketler ve yol haritası bağımlılıkları                     |
| `data/interface.json`             | Sayfa, rehber, erişilebilir ad, kontrol, açıklama ve bağlantı metinleri           |
| `data/messages.json`              | Dinamik durum, toast ve JSON/CSV/Markdown belge metinleri                         |

JSON dosyaları yalnız veri ve düz metin içerir. HTML, CSS, JS, olay işleyici veya çalıştırılan ifade saklanmaz. Kimlikler, URL'ler, sıralar ve yapılandırılmış içerik alanları veri olarak kalır. Eski iki assessments dosyasının tüm kayıtları kendi küme dosyasına taşınmıştır; ikinci düzenlenebilir veri kopyası bırakılmamıştır.

`assets/content-templates.js` yalnız yapısal markup ve veri bağlama anahtarlarını tutar. `assets/content-engine.js` bu yapıyı metin kaçışıyla üretir; kaynak URL'leri HTTPS olarak doğrular. JSON bir script veya markup olarak çalıştırılmaz. Tarayıcı manifest ve 16 içerik belgesini yükler, tam modeli doğrular ve ancak tamamı geçerliyse görünümü tek adımda kurar. Eksik/ağ hatalı/bozuk JSON son üretilmiş snapshot'a döner; içerik ve seçim/çıktı akışı korunur. Bekleme en fazla5s sürer. Aynı JSON geldiğinde mevcut DOM korunur; farklı geçerli JSON geldiğinde native disclosure açıklığı, klavye odağı ve kaydırma konumu geri yüklenir. JS kontrolleri handler kurulana kadar disabled kalır; hazır olduğunda seçim/filtre/çıktı kontrolleri birlikte etkinleşir. Gerekli dinamik metin alanları mount öncesi doğrulanır. JavaScript kapalıyken aynı önceden üretilmiş içerik ve native accordion okunabilir.

`index.html` kanonik veri kaynağı değildir. Aynı JS renderer'ın `npm run roadmap` çıktısıdır; elle içerik düzenlenmez. Build `--check` ile eski üretilmiş görünümü reddeder. `dist/data/` JSON dosyalarında yalnız biçimlendirme boşlukları azaltılır; build kaynakla bütün belgeyi derin eşitlik üzerinden karşılaştırır.

## TDD ve veri kaybı önlemleri

Geçişten önce tam model `tests/fixtures/content-baseline.json`, bütün eski görünen/erişilebilir metinler `content-strings.json` içinde sabitlendi. Mevcut `original-inventory.json` da korunur. Fixture semantik SHA-256 değerleri test koduna sabittir; formatter boşluğu içerik değişikliği sayılmaz. Hiçbir üretim veya snapshot komutu bu içerik fixture'larını yeniden yazmaz. İçerik/test/hash güncellemeleri mevcut bir başarısızlığı gizlemek için kullanılamaz; gelecekte gerçek içerik değişikliği açık kullanıcı talimatı ve ayrı veri migration incelemesi ister.

Koruma `tests/content.test.js` ile tüm atlası derin eşitlikte karşılaştırır; yalnız madde başlıklarını veya kayıt sayısını karşılaştırmakla yetinmez. Renderer eski bütün metin/erişilebilir adları korumalıdır. JSON dosyalarında markup/program alanları reddedilir. Üretici testleri geçici kopyalarda metadata değişimi, eksik/çift hedef, güncellik ve idempotence sınırlarını doğrular; asıl kaynakları değiştirmediğini denetler.

`tests/content-engine.spec.js` gerçek ağ yanıtındaki küme, rehber ve başlık değişiminin görünüm/arama/çıktıya ulaştığını; HTML biçimli bir metnin çalışmadan düz metin kaldığını; ağ, JSON parse ve schema hatasının içeriği bozmadığını doğrular. Geciken aynı/farklı JSON altında native açıklık ve odak; eksik/hatalı dinamik mesajlarda sağlam fallback; hazırlık sırasında disabled kontroller ve sonrasında çalışan filtre/küme/CSV akışı da regresyon kapsamındadır. Gecikmeli etkileşim testleri tarayıcı saati durdurularak yürütülür; ayrı test saati 5001ms ilerletip gerçek 5s iptal/fallback yolunu denetler. Üretim veya test süreleri artırılmaz. Bu değişimler yalnız test route yanıtında yapılır; kanonik içerik veya fixture değiştirilmez. `tests/exports.test.js` eksiksiz seçili JSON/Markdown içeriğini, kaynak nesnesinin değişmemesini, kaçışı ve legacy v1 girdisini korur. CI bütün kontroller geçmeden deploy başlatmaz.

## Seçim ve accordion

Seçim anahtarı `saas-atlas-selection-v1` ve kararlı madde kimlikleri aynıdır. JSON v2 seçili küme/başlık/madde alanları, değerlendirmeler, raw, ilişkiler ve kaynak dizinini içerir. Markdown aynı anlamlı içeriği etiketli biçimde içerir; URL/metin kaçışı korunur. CSV'nin mevcut16sütun sözleşmesi devam eder. Filtreler dışa aktarılan seçimleri daraltmaz; kapalı gruplardaki seçili maddeler de alınır.

49 envanter başlığı aynı native details name grubundadır; başlık açılırken önceki kapanır. İç değerlendirme/rehber/picker ayrı kontrollerdir. Arama ve filtre ilk eşleşen başlığı açar, diğer sonuç başlıkları görünür kalır. Toplu başlık kontrolü yalnız kapatır. Feature hash ve seçili-only odak kurtarma aynı openGroup yolunu kullanır. Yazdırma, içerik kaybetmemek için geçici olarak bütün başlıkları açar; name grubu ve JS tek-açık kontrolü bu sürede askıya alınır, sonra önceki durum geri yüklenir.

## Teslim boyutu ve kapsam değişimi

Bu kullanıcı talebi kanonik JSON belgelerinin tarayıcıya ayrıca teslimini getirir. Tam statik/no-JS ve JSON ağ hatası snapshot'ı da korunduğu için önceki200KiB başlangıç toplamı artık aynı teslim kapsamını ölçmez. Ölçülen HTML146382B, JS15915B, JSON74684B, CSS6373B, font46879B gzip; toplam290233B. Bunlar Nodezlib build ölçümleridir; CDN aktarımı veya saha Web Vitals sonucu değildir.

Yeni tek bütçe seti: toplam300KiB, HTML144KiB, JS16KiB, JSON80KiB, CSS12KiB. 17 JSON + 4 JS ortak kaynaklardır; profile özel paket, yeni runtime bağımlılığı, uzaktan font veya gizlenmiş alternatif kabuk eklenmedi.28dosyalık allowlist test/fixture/rapor/çalışma belgelerinin yayına sızmasını engeller. Ağ testi bütün zorunlu kaynakları, MIME türünü ve JSON parse edilebilirliğini gözler. Bütçe bir başarısız browser testini geçirmek için timeout/tolerans değişikliği değildir; yeni teslim sözleşmesinin açık ölçümüdür.

## Kullanıcı tarafından istenen kaynak incelemesi ve eklemeli migration

2026-10-10 tarihli sonraki istek, yeni HTML/Markdown haritasının değerlendirilip projenin güncellenmesini açıkça istedi. Önceki bölümler kayıpsız taşımanın tarihsel sözleşmesidir. Bu değişiklik12küme/49başlık/326 özgün kaydı yeniden yazmaz.18 yeni kayıt mevcut başlıkların sonuna eklenir; güncel toplam344'tür. Tam eski model, her küme ve grubu orijinal madde uzunluğuna projekte ederek derin eşitlikte korunur. Metadata, yol haritası, bütün özgün alanlar, değerlendirmeler, kaynaklar ve ilişkiler aynıdır. Üç fixture ve sabit semantik hashler değiştirilmez. Eklenen kimlikler ayrıca `review.addedItemIds` ile birebir karşılaştırılır.

`data/review.json`18'inci kanonik JSON belgesidir.49 grup varsayılanı ve madde istisnaları bağımsız `required/conditional/advanced/implementation` plan kapsamı üretir. Gerekçe her maddeye uygulanır. Bu etiket teknik yeterlilik veya teslim durumu değildir. Ekleme, birleştirme, başlangıçtan erteleme ve düzeltme kararları somut kararlı kimliklere bağlıdır.17 kaynak kümesinin mevcut gruplarla karşılığı ve iki kaynak dosyanın adı/hashleri bulunur;402 ayrı satırın tek tek birebir eşlenmiş olduğu iddia edilmez. Ham ek dosyalar kaynak kod veya çalıştırılabilir içerik olarak kopyalanmaz.

Eski sayım ve açıklama kopyası `interface.retiredCopy` içinde arşivlenir; görünen güncel sayımlar344/205/34 olarak değişir. Diğer özgün görünen ve erişilebilir metinler koruma testinde kalır. JSON yükleyici ve build yeni inceleme dosyasını aynı doğrulama/atomik mount/fallback yoluna alır. Eksik kapsam, yanlış sayım, bilinmeyen madde/grup referansı ve eksik UI mesajı mount öncesinde reddedilir. Tek açık envanter accordion davranışı korunur; inceleme ayrı native disclosure'dır. Yazdırmada inceleme de açılır ve eski durum geri yüklenir.

Exportv3, seçili her maddeye çözülmüş kapsam/etiket/gerekçe ekler. Ortak inceleme kaynağı ve yalnız gerçekten dışa aktarılan kimliklere değen kararlar taşınır; diğer maddelerin planlama sözlüğü veya iç UI kopyası aktarılmaz. Markdown yeni alanları kaçış kurallarını uygulayarak korur; CSVv3 kapsam ve gerekçe ile18sütuna çıkar. İnceleme içermeyen legacyv2 16sütun ve v1 desteği devam eder.

Yeni teslim kapsamı18madde, inceleme belgesi, kapsam filtresi ve statik/no-JS görünümü içerir. Tek bütçe seti toplam360KiB/HTML184KiB/JS24KiB/JSON104KiB/CSS12KiB'dir.29dosya allowlist'i dışındaki içerik, test, fixture, kanıt veya kaynak ek yayınlanmaz. Sabit Nodezlib ölçümleri son doğrulama kaydında yer alır; yeni bağımlılık, ayrı cihaz paketi, uzaktan font veya saha performansı iddiası yoktur. Bütçe değişikliği yeni inceleme/veri kapsamına aittir; timeout/retry/kontrast/görsel tolerans değiştirilmez.

Ek inceleme tamamlandığında ilk ölçüm HTML183223B, JSON91102B, JS18188B, CSS6655B, font46879B gzip; toplam346047B oldu. İlk geçici HTML176KiB sınırı2999B aşıldı; 18 yeni değerlendirme, her madde için bağımsız kapsam gerekçesi ve statik inceleme/karar görünümünün veriyle birlikte teslimi için HTML184KiB olarak kaydedildi. Toplam360KiB sınırı korunur. Eski dinamik Frappe durum sayıları da `retiredCopy.supportCount.*` içinde arşivlenir; yeni toplamları göstermek özgün madde içeriğini değiştirmez.

# Frappe ile geliştirme yol haritası

Bu atlasın hedefi Frappe Framework backend, bağımsız headless SaaS admin frontend ve Keycloak kimlik doğrulamasıdır. Atlasın kendisi statik bir planlama belgesidir; Frappe/Keycloak kurulumu veya çalışan ürün değildir. İnceleme tarihi 2026-10-10. Hedef release'ler henüz seçilmedi; güncel dokümanlar hedef sürüm garantisi sayılmaz.

## Etiket sözleşmesi

Özgün / iç eksik / yeni alan renkleri envanterin kökenini korur. Frappe yeterliliği, yapılacak iş ve sorumlu katman ayrı eksenlerdir. Checkbox yalnız seçili maddelerin dışa aktarımı içindir; planlandı veya tamamlandı anlamına gelmez.

| Yeterlilik             | Karar                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Çekirdekte var         | Belgelenen backend mekanizmasını yeniden yazma; yapılandır, headless bağlantısını ve kabulünü doğrula.                                                |
| Kısmen var             | Madde birden fazla alt yetenek içeriyorsa yalnız mevcut mekanizmayı hazır kabul et; eksik kısmı genişlet.                                             |
| Ek Frappe uygulaması   | ERPNext/CRM/Helpdesk/Insights/Press ayrı bağımlılık ve uygulama kararıdır; Framework ile aynı ürün değildir.                                          |
| Çekirdekte hazır değil | İncelenen kaynaklarda hazır uçtan uca kabiliyet saptanmadı; özel geliştirme veya ayrı hizmet seç. Bu etiket her eklenti için yokluk iddiası değildir. |
| Harici sorumluluk      | Mimari kararla Keycloak, headless frontend veya altyapı hizmeti üstlenir; entegrasyon ve backend kontrolleri yine gerekir.                            |
| Doğrulanmalı           | Hedef sürüm, deneysel destek, kapsam veya uyum PoC bekler.                                                                                            |

Yapılacak iş: Yapılandır / Genişlet / Entegre et / Geliştir / PoC ile doğrula. Dayanak: Belge dayanağı / Mimari karar / Doğrulama bekliyor. Bunlar uygulanan işin durumu değildir. Kanıtsız “güvenilmez” sınıfı kullanılmaz; her maddede somut kabul ölçütü bulunur. Bir kaynakta alt mekanizmanın varlığı, maddedeki bütün gereksinimlerin mevcut olduğunu kanıtlamaz.

## Bağımlılık sırası

1. İşletim, dağıtım, sürüm sabitleme, yedekten dönüş ve temel gözlem.
2. Kiracı/site kararı, Keycloak kimliği ve Frappe yetki bağlama.
3. Güvenlik, audit ve veri yönetişiminin ilk dikey dilimi.
4. DocType, alanlar, dosya sahipliği ve veri sözleşmeleri.
5. Headless API, entegrasyon ve olay sözleşmeleri. AI/RAG/ajan grupları çekirdek API tamamlandıktan sonra ayrı dilimlerdir.
6. Headless panel ve erişilebilir uçtan uca kullanıcı yolculuğu.
7. İş geçişleri, onaylar ve arka plan işleri.
8. Kimlik e-postalarından ayrı ürün bildirimleri ve canlı iletim.
9. Paket, entitlement, kota ve kullanım politikaları.
10. Ödeme, fatura ve mutabakat.
11. CRM, destek, takvim ve içerik alanları.
12. İş raporları ve ürün analitiği.

Bu sıra takvim veya efor tahmini değildir. Güvenlik/işletim her etapta devam eder; tam bir kümedeki bütün maddelerin bitmesi sonraki kümenin her maddesi için zorunlu değildir. Küme gerekçeleri ve ön koşullar ilgili bölümde gösterilir. İlk geliştirme diliminde kimlik → yetki → kiracıya ait kayıt → headless ekran → audit → yedekten dönüş birlikte kabul edilmelidir.

## Mimari karar kapıları

- [Frappe Sites](https://docs.frappe.io/framework/user/en/basics/sites) modeli site başına veritabanını belgeler. Aynı site içinde satır bazlı tenant izolasyonu bununla eşdeğer değildir. Site/realm/kurum ilişkisi, dosya, arama ve kuyruk sınırları PoC ile doğrulanır.
- Keycloak kimlik doğrular; [Frappe kullanıcı/rol/alan izinleri](https://docs.frappe.io/framework/user/en/basics/users-and-permissions) backend'de uygulanır. Frappe User kaydı yetki eşlemesidir; ikinci bir parola/giriş sistemi kurulması gerekmez.
- [Frappe Auth Hooks](https://docs.frappe.io/framework/user/en/python-api/hooks#auth-hooks) özel token doğrulama ve kullanıcı eşleme noktasıdır. [Frappe REST OAuth desteği](https://docs.frappe.io/framework/user/en/api/rest) Keycloak JWT'lerinin doğrudan kabul edildiğini kanıtlamaz. Entegrasyon yöntemi seçilip issuer, audience, imza/JWKS yenileme, süre, devre dışı kullanıcı, logout/revocation ve tenant üyeliği denetlenir. Normal kullanıcıların alternatif Frappe parola girişini kullanarak Keycloak politikasını aşamaması kabul kapsamındadır.
- [Keycloak tarayıcı istemcisi](https://www.keycloak.org/securing-apps/javascript-adapter) public client ve PKCE yaklaşımını açıklar. Headless istemciye admin/service API secret koyulmaz; son kullanıcı kimliği sunucuda korunur. BFF veya doğrudan resource-server yaklaşımı hedef release ile doğrulanır.
- Frappe Desk ekranları, Client Script, workspace ve form deneyimleri bağımsız frontend'de otomatik hazır sayılmaz. DocType, REST/RPC ve server validation yeniden kullanılabilir; frontend sunum/etkileşim katmanı ayrı iş olarak kalır.
- Ek uygulamalar için lisans, headless API kapsamı, release uyumu, veri sahipliği ve geçiş maliyeti ayrı karar kapısıdır. Bu dokümantasyon hiçbir ek uygulamanın kurulumunu onaylamaz veya uygulamaz.

## Bakım ve veri sözleşmesi

`data/clusters/<id>.json` kümeyi, başlıkları, maddeleri, ilişkileri ve kararlı madde kimliğiyle değerlendirmeleri tutar. Önceki assessments dosyalarının bütün verisi bu dosyalara kayıpsız taşınmıştır. Her maddede yeterlilik, iş, sorumlu, dayanak, açıklama, kabul ölçütü ve doğrudan kaynak bağlantıları zorunludur. Araştırma sınırları `docs/sources-*.md` içindedir. `data/roadmap.json` etiketleri, inceleme tarihini, sürüm sınırını ve sıralamayı belirler.

`data/manifest.json` bütün kaynak dosyalarını tanımlar; arayüz/rehber/çıktı metinleri `interface.json` ve `messages.json` içindedir. Ortak JS engine tarayıcıda JSON'u yükler. `npm run roadmap` aynı engine ile bu verileri `index.html` içindeki veri adasına ve semantik statik görünüme işler. `npm run build` üretimden önce bu görünümün güncel olduğunu doğrular. 326 özgün maddenin kimliği, metni, raw ifadesi ve kaynak sınıfı fixture ile birebir korunur. Küme ve görünen başlık numaraları yeni sıraya göre değişir; localStorage seçimleri kararlı madde kimliği üzerinden korunur.

JSON çıktısı `schemaVersion: 2` ile bağlam ve değerlendirmeleri içerir; eski v1 girdi sözleşmesi export modülünde korunur. CSV 16 sütunda hiyerarşi ve karar dayanağını taşır; Markdown madde altında açıklama, kabul ve kaynakları korur. Aktif filtre görünmeyen seçili maddeleri dışa aktarımdan çıkarmaz.

CSV v2'de “Küme kimliği” kararlı eski kimliktir; “Küme sırası” güncel görünüm sırasıdır. Başlık ve madde numaraları bu görünüm sırasına göre okunur. Eski v1 girdisinde “Küme no” başlığı korunur.

## İçerik ve aktarım bütçesi

326 kaynaklı açıklama, kabul ölçütü ve bağlantı hem JavaScript kapalıyken okunabilen semantik belgeye hem kayıpsız export veri adasına eklendi. İlk ölçüm HTML 937374 B ham / 140945 B gzip, bütün ortak kaynaklar 199858 B gzip (yaklaşık 195.2 KiB) oldu; eski HTML 48 KiB / toplam 150 KiB sınırı beklenen şekilde başarısız oldu. Bu RED kaydı korundu.

Metni yalnız tıklamada JavaScript ile üretmek tekrar miktarını azaltır ancak belgenin JavaScript'siz okunmasını kaybettirir. Veri adasında DOM referansları tutmak taşınabilir veri/export sözleşmesini karmaşıklaştırır. İstenen kapsam için statik belge ve kayıpsız veri korunarak repo bütçesi açıkça HTML 144 KiB / toplam 200 KiB olarak güncellendi. CSS 12 KiB, JS 12 KiB, self-hosted fontlar ve 9 dosyalık yayın allowlist'i korundu; yeni runtime paketi veya üçüncü taraf isteği eklenmedi. Kesin son ölçüm doğrulama kaydındadır; zlib gzip bütçesi CDN veya gerçek cihaz performans iddiası değildir.

2026-10-10 sınıflandırılmış JSON engine geçişiyle ayrıca17JSON ve2engine modülü teslim edilir; tam statik/ağ-hatası snapshot'ı korunur. Önceki paragraf ilk yol haritası tesliminin ölçümüdür. Güncel tek bütçe toplam300KiB/HTML144/JS16/JSON80/CSS12KiB ve28dosya allowlist'idir; kapsam ve ölçüm [content-model.md](content-model.md) içinde açıklanır.

## 402 maddelik kaynak haritasıyla karşılaştırma

Kullanıcının yeni içerik güncellemesi kapsamında326 özgün madde korunarak18 madde eklendi: güncel12küme/49başlık/344madde. Kaynaktaki17küme mevcut sorumluluk gruplarına bağlanır; tekrarlar ikinci modül veya geliştirme işi oluşturmaz. `data/review.json` plan kapsamını Frappe yeterliliğinden ayrı tutar. JSONv3 veMarkdown seçimin gerekçelerini ve ilgili inceleme kararlarını taşır; CSVv3 18sütun, legacyv2 16sütundur. [İnceleme kararları](source-review.md) ve [veri koruma sözleşmesi](content-model.md) günceldir.

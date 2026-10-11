# Faydalı SaaS panel deneyimleri

2026-10-11. Kullanıcı sohbet içinde önerilen 25 özelliğin canlı dokümantasyona eklenmesini onayladı. Önceki 351 tam kayıt ve 53 inceleme kararı korunur; 13 öneri mevcut maddelere bağlanır, 12 ayrı GAP eklenir. Toplam 363 madde, 49 başlık, 12 küme. Bütün 25 önerinin fayda, öncelik, kabul ve sorumluluk açıklaması kanonik `data/review.json` içindedir; yeni 12 değerlendirme mevcut küme JSONlarında bulunur.

Fayda ve teslim önceliği zorunlu kapsam değildir. Yeni 12 madde ürüne bağlıdır; mevcut kapsam atamaları ve sekiz zorunlu entegrasyon modeli değişmez. Frappe backend, bağımsız headless frontend ve tamamen Keycloak login/auth kararı korunur. Hedef sürümler seçilmedi; bu belge çalışan özellik veya üretim güvenilirliği kanıtı değildir.

## Emeği ve veriyi koruyanlar — çok yüksek fayda, ilk paket

| Öneri                                               | Karar                     | Envanter karşılığı                               |
| --------------------------------------------------- | ------------------------- | ------------------------------------------------ |
| Canlı bağlantı ve sunucu erişimi göstergesi         | Ayrı boşluk               | `views-11`, `views-8`, `service-1`, `service-2`  |
| Kaydetme durumu ve yerel taslak–sunucu kaydı ayrımı | Ayrı boşluk               | `views-12`, `forms-6`, `views-9`                 |
| Otomatik taslak ve taslağı kurtarma                 | Ayrı boşluk               | `forms-6`, `forms-3`, `forms-4`                  |
| Oturum sonrasında kaldığı yerden devam              | Mevcut kapsamla birleştir | `forms-3`, `channels-8`                          |
| Geri al, sürüm geçmişi ve silinenleri kurtarma      | Ayrı boşluk               | `views-9`, `integrity-2`, `integrity-6`          |
| Sonucu belirsiz işlemi doğrulama                    | Ayrı boşluk               | `views-13`, `jobs-5`, `events-4`, `events-5`     |
| Verinin güncelliği ve son başarılı güncelleme       | Ayrı boşluk               | `views-14`, `shell-3`, `reports-7`, `realtime-3` |

## İşi tamamlamayı kolaylaştıranlar — yüksek fayda, ikinci paket

| Öneri                                            | Karar                     | Envanter karşılığı                                            |
| ------------------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| Kullanıcı arka plan işleri merkezi               | Ayrı boşluk               | `jobs-8`, `jobs-4`, `transfer-4`                              |
| Kısmi başarı ve yalnız hatalıları yeniden deneme | Mevcut kapsamla birleştir | `integrity-4`, `jobs-3`, `jobs-4`, `transfer-3`, `transfer-4` |
| İşlem öncesi etki önizlemesi                     | Ayrı boşluk               | `views-15`, `views-3`, `transfer-2`                           |
| Çözüm sunan hata mesajları                       | Ayrı boşluk               | `views-16`, `channels-6`, `forms-2`                           |
| İşlev bazında hizmet durumu                      | Mevcut kapsamla birleştir | `service-1`, `service-2`                                      |
| Anlamlı boş durumlar                             | Mevcut kapsamla birleştir | `views-8`                                                     |
| Güvenli destek paketi                            | Ayrı boşluk               | `support-9`, `support-1`, `views-16`                          |

## Günlük kullanımı hızlandıranlar — orta/yüksek fayda, kullanım sıklığına göre

| Öneri                                     | Karar                     | Envanter karşılığı      |
| ----------------------------------------- | ------------------------- | ----------------------- |
| Kaydedilmiş görünümler                    | Mevcut kapsamla birleştir | `views-7`               |
| Bağlamı koruyan paylaşım bağlantıları     | Mevcut kapsamla birleştir | `channels-8`, `views-7` |
| Son kullanılanlar ve sabitlenenler        | Mevcut kapsamla birleştir | `shell-6`, `shell-9`    |
| Şablondan oluşturma ve kontrollü çoğaltma | Ayrı boşluk               | `views-17`, `forms-1`   |
| Sayıların hesaplama açıklaması            | Mevcut kapsamla birleştir | `reports-7`             |
| Saat dilimi ve tarih açıklığı             | Mevcut kapsamla birleştir | `locale-4`, `jobs-6`    |
| Klavye kısayolları ve komut araması       | Mevcut kapsamla birleştir | `shell-9`, `channels-5` |

## Kullanıma bağlı değer sağlayanlar — ihtiyaç doğrulandıktan sonra

| Öneri                                          | Karar                     | Envanter karşılığı                                 |
| ---------------------------------------------- | ------------------------- | -------------------------------------------------- |
| Gerçek çevrimdışı çalışma ve sonradan eşitleme | Mevcut kapsamla birleştir | `channels-7`, `forms-6`, `views-11`, `integrity-1` |
| Eşzamanlı düzenleme ve çakışma yönetimi        | Mevcut kapsamla birleştir | `integrity-1`, `realtime-5`                        |
| Düşük veri tüketimi modu                       | Ayrı boşluk               | `channels-9`, `views-14`                           |
| Bildirim özeti ve sessiz saatler               | Mevcut kapsamla birleştir | `notifications-6`                                  |

## Teknik sınırlar ve kabul

Bağlantı göstergesi; ağ ipucu, uygulama sunucusuna gerçek erişim ve kimlik/yetki hatasını ayırır. Yerel taslak saklama başarısı sunucu commit başarısı değildir. Sonucu belirsiz yazma işlemi kimliğiyle doğrulanmadan başarısız sayılmaz veya kör tekrar edilmez. Durum duyuruları odağı çalmaz; yalnız renge dayanmaz. Taslak/kurtarma ve paylaşım tenant/kullanıcı/kayıt/alan sınırlarını korur.

Frappe REST/Document/transaction ve queue temelleri, headless kaydetme durumu, otomatik taslak kurtarma, kullanıcı işleri merkezi veya genel etki önizlemesini hazır ürün yapmaz. Version-15 Deleted Document.restore kaynak kodu geri yükleme temeli sunar; hedef sürümde tenant self-service kurtarma, ilişkiler ve saklama/silme politikası ayrıca doğrulanır. Genel çevrimdışı çalışma `channels-7` ileri aşama olarak kalır; gösterge bu özelliği gerektirmez. Düşük veri modu açık kullanıcı tercihiyle çalışır, ağ ipucu desteğine bağımlı değildir.

Her yeni maddede sorumlu, tasarım kanıtı, 2026-10-11 inceleme tarihi, kalan iş, kabul ve resmî kaynak vardır. Önceden var olan 13 yeteneğin özgün değerlendirmesi değiştirilmez; güncel fayda/kabul açıklaması ilgili review kararında görünür. Dört fayda grubu mevcut 49 başlığı yeniden sıralamaz.

## Veri modeli ve export

Yeni kimlikler: `views-11..17`, `forms-6`, `integrity-6`, `jobs-8`, `support-9`, `channels-9`. Özgün 326 madde sonrası 37 ekleme vardır. Tüm 25 `useful-*` kararı statik/no-JS görünümde de okunur ve gerçek envanter bağlantılarına gider. Seçilen maddelerin JSON v3 ve Markdown çıktıları yalnız ilgili kararları kapsar. CSV, mevcut 18 sütunuyla yeni kayıtların tam değerlendirme ve kapsam gerekçesini taşır; review kararlarının ayrı sütunu yoktur. Legacy v1/v2 ve tarihsiz export sözleşmeleri korunur.

`tests/fixtures/usefulness-baseline.json` semantik SHA-256: `8fc2e4168d66fd552a1c75be515c1541ca56c4a8232feffe0c443aaf54296d1d`. Regresyon, bütün 351 kaydın alan/sıra/ilişkisini ve 53 kararı derin eşitlikte korur; yalnız 12 grup sonu eklemeye izin verir. 25 önerinin kritik kimlik bağlantıları, kategorileri ve fayda seviyeleri ayrıca sabittir.

## Birincil dayanaklar

- [MDN: Navigator.onLine sınırları](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)
- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) ve [saklama kotası/tahliye](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [MDN: Save-Data desteği](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)
- [W3C: durum mesajları](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) ve [hata önerileri](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)
- [Frappe: REST](https://docs.frappe.io/framework/user/en/api/rest), [Document](https://docs.frappe.io/framework/user/en/api/document), [transaction](https://docs.frappe.io/framework/user/en/api/database) ve [background jobs](https://docs.frappe.io/framework/user/en/api/background_jobs)
- [Frappe version-15: Deleted Document.restore](https://raw.githubusercontent.com/frappe/frappe/version-15/frappe/core/doctype/deleted_document/deleted_document.py)

Doğrulama ve kapsam sınırları: [usefulness-verification.md](usefulness-verification.md).

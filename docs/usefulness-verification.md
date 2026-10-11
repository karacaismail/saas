# Faydalı panel deneyimleri doğrulaması

2026-10-11. Bu kayıt, dokümantasyon ve export doğrulamasıdır; gelecekteki SaaS işlevlerinin çalıştığını kanıtlamaz.

## Veri koruma ve TDD

Başlangıç: 351 kayıt, 53 inceleme kararı, 49 başlık ve 12 küme. Değişiklik öncesi tam kayıtları koruyan `tests/fixtures/usefulness-baseline.json` dosyasının semantik SHA-256 değeri `8fc2e4168d66fd552a1c75be515c1541ca56c4a8232feffe0c443aaf54296d1d` olarak sabitlendi. Eski fixture ve hashler yeniden üretilmedi.

- Node RED: 2 pass / 4 beklenen fail; yeni 12 kayıt ve 25 karar henüz yoktu. İlk test taslağında ilişkili entegrasyon altyapısının tamamı yanlışlıkla zorunlu sayılmıştı; baseline karşılaştırması ve ayrı canonical model denetimiyle düzeltildi.
- Browser RED: 320 px Chromium, önceki 351 sayımı yeni 363 beklentisini karşılamadı. Screenshot ve trace korundu.
- GREEN: 6/6 özel Node testi. Bütün 351 eski kayıt ve 53 karar, alanları, sıraları, kaynakları ve kapsamlarıyla derin eşitlikte korunur. Yalnız 12 grup sonu eklemeye izin verilir; 25 önerinin kategori, fayda, öncelik, kabul ve madde bağlantıları ayrıca denetlenir.
- Validation, geçersiz `outbox-1` bağlantısını yakaladı; gerçek `events-4` / `events-5` hedefleri kullanıldı. Yeni mobil test taslağında DOM çevre boşluğu ve Firefox'un 0.8rem için 12.7969px serileştirmesi doğru ölçümle ele alındı. Üretim stilleri ve test toleransları değiştirilmedi.

İlk tam paket denemesi yarıda durduruldu: 211 pass / 3 fail / 3 interrupted / 2 skip / 123 not_run. İki test varsayımı yakalandı: yeni en uzun owner etiketi farklı bir kayda geçtiği halde kelime testi Subdomain bekliyordu; inceleme bölümü de Firefox'un 32767px tek PNG sınırını aştı. En uzun etiket denetimi ve sabit `deployment-3` kelime regresyonu ayrı korunur. Tüm inceleme görüntüsü belge koordinatlarıyla bitişik ≤8000px dilimlere ayrılır; toplam yükseklik eşitliği denetlenir. Son hedefli koşu 6/6 pass; timeout, retry, axe/klavye/renk/kelime assertionları değişmedi.

## Yerel kontroller

Ortam: macOS, Node 24.21.0, npm 11.19.0; manifest Node >=22; Playwright 1.64.0, axe 4.13.0, Prettier 3.9.10. Hedef Frappe/Keycloak sürümü bilinmiyor.

| Kontrol                                       | Sonuç                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run check`                               | 55/55 Node testi, formatter ve syntax pass                                     |
| `npm run build`                               | Pass; 29 dosyalık yayın allowlist'i korunuyor                                  |
| İlk hedefli `tests/usefulness.spec.js` koşusu | 24/24 pass; 3 engine, seçim, 25 karar, gerçek JSON/MD/CSV indirmeleri ve no-JS |
| Ek bounded assessment koşusu                  | 18/18 pass; 12 yeni maddenin tamamında 320 → 390 → 320 px / %125 kök metin     |
| İlk tam tarayıcı paketi                       | 339 pass / 3 skip / 0 fail; 342 vaka, değişmeyen timeout/retry/worker ayarları |

CI düzeltmesinin son tam koşusu: 402 vaka, 399 pass / 3 skip / 0 fail, 6.0 dakika. Son beş test dosyasını kapsar; timeout45s, retry0, workers3 ve trace/screenshot ayarları aynıdır. Önceki 81/81 hedefli koşu son atlas/UX ayrımı ve pastel batching değişikliğinden önceydi; son kaynakların kanıtı 402 vakalık tam koşudur. Üç skip, `hasTouch` olmayan temel motor projelerindedir; aynı senaryo ayrı touch/hybrid emülasyon projelerinde geçti.

Ek assessment koşusunda 108 PNG ve 18 hesaplanmış stil JSON'u kaydedildi. Gerçek madde başlıkları, bütün değerlendirme metni, kaynaklar, sorumlu, kapsam, checkbox seçimi ve tek açık grup durumu denetlendi. Normal metinler en az 1rem/400; mevcut pasif pill istisnası 0.8rem ölçülür. Kök boyutu, taşma ve durum korunumu üç motorda doğrulanır.

## Bağımsız inceleme ve görsel farklar

`integration_review` inceleyicisi salt okunur çalışır; dosya değiştirmez ve test çalıştırmaz. Özgün 25 öneriyi yeni kararlarla bağımsız karşılaştırdı. 13 mevcut kapsam birleştirmesi ve 12 yeni GAP uygun bulundu. MDN online/Save-Data ve Frappe version-15 Deleted Document kaynaklarının yerel snapshotları ve hashleri incelendi; sürüm ve yeterlilik nitelemeleri kaynaklarla uyumlu bulundu.

11 görsel adayın 33 önce/sonra/fark görüntüsü bağımsız incelenerek yalnız bu referanslar onaylandı: 320/1280 araç çubuğu × üç motor; 320 export × Chromium/Firefox; 320 seçim × üç motor. Altı araç çubuğu farkı yalnız 351→363 ve 212→224 sayaçlarıdır. Diğer beş mobil fark, yeni inceleme özetinin akışından doğan kesirli clip/raster kaymasıdır. Eski HEAD ve yeni build'de aynı kutu genişliği/yüksekliği ve stiller ölçüldü. Diğer yedi görsel referans byte olarak değişmedi. Toplu referans güncellemesi veya tolerans gevşetmesi yapılmadı.

Yeni 12 maddenin 320 Chromium, 390 WebKit ve %125 kök metin Firefox görselleri bağımsız incelendi; 108 durumun hesaplanmış stil denetimleriyle uyumlu bulundu. İlk başarılı tam koşunun 342 vakası, 288 kanıt dosyası, 15 sıfır ihlalli axe taraması ve frozen üretim hashleri bağımsız incelendi; açık actionable bulgu kalmadı.

## Yayın paketi ve bütçe

Ölçüm, yerel Node zlib gzip çıktısıdır: HTML 213369 B, JSON 105353 B, JS 18379 B, CSS 6655 B, font 46879 B; toplam 390635 B. Yetkilendirilmiş 25 karar ve 12 tam değerlendirme hem no-JS snapshot hem JSON olarak teslim edilir. Önceki HTML 192 KiB bütçesi 16761 B, toplam 360 KiB bütçesi 21995 B aşıldı. İçerik kapsamı büyüdüğü için tek güncel bütçe HTML 216 KiB / JSON 104 KiB / JS 24 KiB / CSS 12 KiB / toplam 384 KiB olarak açıklamalı kaydedildi. JSON/JS/CSS sınırları ve 29 dosyalık allowlist korunur.

Önceki frozen build ile yalnız yedi üretim içerik dosyası farklıdır: index, dört küme JSON'u, interface ve review. Diğer 22 dosya, bütün JS/CSS/fontlar dahil, byte olarak aynıdır. Yeni bağımlılık, runtime modülü veya servis kurulmadı. Gzip ölçümü saha/CDN performans iddiası değildir.

## CI, canlı yayın ve sınırlar

İlk exact-head CI (`81056fe`, [38141198214](https://github.com/karacaismail/saas/actions/runs/38141198214)) 325 pass / 9 skip / 8 fail verdi; Pages deploy atlandı. Sekiz Firefox vakası 45 saniyelik toplam test sınırına takıldı. Trace'lerde önceki assertion'lar başarılıydı; uzun inceleme testinin ilk dört PNG'si tamamlanırken beşinci çekim yaklaşık 44.9. saniyede başlamıştı. Yerel başarı CI başarısı sayılmadı.

Bu vakalar aynı kapsam korunarak bölündü: 12 ayrı tam assessment yolculuğu ve altı gerçek çift seçim/root-reset geçişi; owner geometri, gerçek kelime/grup geçişi ve Space renk kontrolü; ayrı klavye, tüm bölüme axe ve orijinal beş PNG diliminin üç batch'i. Assessment'ların 108 durum görüntüsü, bütün metin/stil/kaynak kontrolleri ve beş bitişik inceleme diliminin tam yükseklik/union denetimi korunur. Kapalı native details içindeki görünürlük için yalnız `getClientRects()` yeterli olmadığından ek geçiş testi `checkVisibility()` kullanır. Timeout45s, retry0, workers3, trace/screenshot, görsel referanslar ve toleranslar değişmez. Üretimin 29 dosyası bu düzeltmede byte olarak aynıdır. Aynı CI raporunda başarılı olsa da 43.831 saniye ve 42.936 saniye süren seçim kalıcılığı ve %200 teknik bağlam vakaları da önlem olarak bölündü; gerçek fare/Space/reload/temizleme zincirleri, tüm sayfaya axe, klavye odağı ve görüntü kanıtı korunur.

Exact-head CI, deploy ve canlı hash/smoke doğrulaması yerel başarıdan ayrı yürütülür. Bu belgedeki pass sonuçları yereldir; yayımlanan commit için gerçek CI/deploy sonucu [GitHub Actions](https://github.com/karacaismail/saas/actions/workflows/pages.yml) üzerinde, canlı hash/smoke sonucu sohbet tesliminde ve yerel release kanıtında bildirilir. CI yalnız başarılı doğrulama işinden sonra Pages deploy yapar.

Gerçek macOS/iOS Safari, Android/fiziksel cihaz, ekran okuyucu, sanal klavye, gerçek zoom ve fiziksel print: not_run. WebKit emülasyonu gerçek Safari değildir. Yeni backend, kimlik altyapısı veya canlı offline senkronizasyon kurulmadı.

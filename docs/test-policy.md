# Ölçülü test politikası

Amaç hata ve veri kaybını önlemek; test sayısını büyütmek bir başarı ölçütü değildir. Mevcut korumalar korunur, yeni kapsam değişen davranış ve somut riskle sınırlanır.

## Göreve başlamadan

Uygulayıcı değişen dosyaları, korunacak sözleşmeyi, olası hatayı ve onu yakalayacak en küçük kontrolü belirler. İçerik değişikliği için tarayıcıda her maddeye ayrı senaryo eklenmez; tüm kayıtlar tek veri bütünlüğü kontrolünde dolaşılır. Aynı davranış farklı motorda çalıştırıldığında yeni ürün senaryosu sayılmaz. Assertion, veri satırı, senaryo ve tarayıcı koşusu ayrı sayılardır.

| Değişiklik                                | Yerel kontrol                                                              | Genişletme nedeni                             |
| ----------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------- |
| Düz metin veya doküman                    | Formatter; veri ise ilgili şema/kayıpsızlık kontrolü                       | Görünen davranışın değişmesi                  |
| JSON veri ve export                       | İlgili Node dosyaları; gerçek seçim/export yolculuğu                       | Ortak loader/export sözleşmesinin etkilenmesi |
| UI davranışı                              | Önce ilgili başarısız regresyon, sonra320px kritik yol; etkilenen motorlar | Gerçek yerleşim, odak veya motor farkı        |
| Auth, veri kaybı, migration, ortak mimari | Riskin sözleşme ve hata yolu; bağımsız inceleme                            | Açık kalan somut risk                         |

## Koşu sınırları

- Yerelde hedefli kontroller çalışır. Kaynak son halini aldıktan sonra `npm run check` ve `npm run build` bir kez çalışır. Yerelde tam tarayıcı paketi varsayılan değildir.
- CI formatter/syntax/policy/Node paketini tek `source` işinde çalıştırır; dokuz browser shard aynı75 Node kontrolünü tekrar çalıştırmaz. Browser işleri source kapısından sonra kendi hermetik dist build’ini yapar; deploy source ve bütün browser işlerine bağlıdır.
- Mevcut CI matrisi tam tarayıcı regresyonunu bir kez çalıştırır. Yayında yalnız değişen kritik yol ve canlı sürüm doğrulanır. Zaten kanıtlanan eski yayını tekrar audit etme.
- Aynı kaynakta aynı başarılı kontrol tekrarlanmaz. Tekrarın nedeni yeni değişiklik, başarısızlığın düzeltilmesi veya açık kalan belirli bir kanıt olmalıdır. Değişmeyen testleri sırf güven hissi için tekrar çalıştırma.
- Yeni senaryo, motor, viewport projesi, shard veya benzer kombinasyon eklemeden önce hangi yakalanmamış hatayı yakalayacağı ve neden mevcut yolculuğa eklenemediği yazılır. Rutin içerik eklemesi yeni matris ekseni açmaz.
- Parametreleri aynı davranış etrafında bir senaryoda dolaş; bağımsız hata/saklama/etkileşim yolları veya gerçek trace maliyeti gerektiğinde ayır. Daha düşük sayı uğruna assertion silme, testleri yapay biçimde birleştirme veya çalışmayan testi geçer sayma.

## Bu teslimin sınırı

Geliştirme planı için beş Node kontrolü ve üç yeni tarayıcı yolculuğu ayrılmıştır: veri/şema koruması;320px accordion ve klavye; gerçek JSON/Markdown export; JSON-hatası fallback ve print durumunun geri yüklenmesi. Üç motor bu üç yolculuğu tekrar kullanır; dokuz çalıştırma, dokuz ayrı özellik değildir. Önceki234 temel tarayıcı senaryosu237 olur; altı mevcut proje toplam714 toplama kaydı üretir. Mevcut Node toplamı için üst sınır75'tir. Bu sayılar hedef değil üst sınırlardır.

Yedi genişlik ve200% yazı kontrolü ilk yolculukta; aynı320px plan DOM'unun axe taraması, PNG kanıtı ve madde bağlantısı daha kısa olan mevcut fallback/print yolculuğundadır. Aynı kabul koşullarını süre sınırı içinde dağıtmak yeni senaryo veya gevşetilmiş assertion gerektirmez.

## Kilitler ve değişiklik usulü

`npm run test:policy`, `test-policy.json` sınırlarını gerçek Playwright toplama çıktısına uygular; tarayıcı açmaz ve test gövdesi çalıştırmaz. Proje matrisi, genişletilmiş vaka sayısı, timeout45s, expect6s, retry0, repeatEach1, varsayılan worker3 ve trace retain-on-failure korunur. CI Firefox ve üç dokunma/hibrit projesinin ortak input adımı worker1 kullanır; kaynak paylaşımı sınırlanır, vaka sayısı değişmez. `npm run check` bu kilidi çalıştırır; guard ayrıca workflow içinde tek ortak check, source→verify→deploy kapılarını ve input adımının tek worker sınırını denetler. Node75 sınırı gerçek Node sonuç özetiyle incelemede kontrol edilir; bu script Node senaryolarını statik tahmin etmez.

AGENTS.md kuralları koşu seçimini ve tekrarı sınırlar. Script yalnız repodaki normal kontrol akışını denetler; yönerge veya script değiştirilemez bir güvenlik sınırı değildir. Başka komutla başlatılan tüm süreçleri veya gerçek cihazları denetlediği iddia edilmez.

Sınır değişecekse gerekçe, eski/yeni senaryo sayısı, çalışma maliyeti ve etkilenen risk bu belgede ayrı incelenebilir değişiklik olarak kaydedilir; kullanıcının bu sınırlama talebini aşan genişleme açık kullanıcı talimatı gerektirir. Kilidi başarısızlığı geçirmek için yükseltme. Timeout, retry, skip, görsel tolerans, fixture/hash veya test assertionlarını başarısızlığı gizlemek için değiştirme. Yeni test aracı, ücretli servis, global hook veya zamanlanmış koşu ekleme.

## Bitiş koşulu

Hedefli kontroller, zorunlu check/build, ilgili bağımsız inceleme, CI ve canlı kritik yol tamamlanınca görev biter. Yeni somut bulgu yoksa daha geniş test arama. Sonuçta yalnız gerçekten çalıştırılan kontroller ve eksik kalan fiziksel cihaz/runtime doğrulamaları bildirilir.

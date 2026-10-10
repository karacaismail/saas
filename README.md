# SaaS Atlas

[Canlı site](https://karacaismail.github.io/saas/) · [MIT lisansı](LICENSE)

Frappe Framework backend, bağımsız headless frontend ve Keycloak için 12 küme, 49 başlık ve 326 maddelik geliştirme yol haritası. Her maddede Frappe yeterliliği, yapılacak iş, sorumlu katman, dayanak, kabul ölçütü ve kaynak bulunur. Özellikleri yeterlilik/iş/kaynak/küme ile süzün ve seçilenleri JSON, CSV veya Markdown olarak indirin.

Mavi **özgün kapsamı**, yeşil **kapsam içi eksikleri**, kırmızı **yeni alanları** gösterir. Üç sınıfta madde metni, kaynak etiketi ve checkbox aynı rengi taşır; renkler %100 doygundur ve normal metin kontrastı en az4.5:1'dir. Renkler Frappe yeterliliği değildir. Yeterlilik etiketleri: **Çekirdekte var / Kısmen var / Ek Frappe uygulaması / Çekirdekte hazır değil / Harici sorumluluk / Doğrulanmalı**. Küme sırası altyapı ve güven sınırlarından ürün ve gelir modeline ilerler. ERPNext ve diğer ek uygulamalar Framework çekirdeği sayılmaz; Desk ekranları headless frontend'de otomatik hazır değildir.

Hedef Frappe/Keycloak release'leri seçilmedi. 2026-10-10 tarihli değerlendirme resmî dokümanlara dayanır; kurulu özellik, üretim güvenilirliği veya tamamlanmış iş kanıtı değildir. Etiketlerin anlamı ve mimari karar kapıları [yol haritası rehberinde](docs/roadmap.md) bulunur.

Seçimler tarayıcıda saklanır; sunucuya gönderilmez ve tamamlanma durumu değildir. Eski madde kimlikleri korunduğu için önceki seçimler devam eder. Filtreleri değiştirmek seçimi temizlemez. Dışa aktarma, aktif filtrede görünmese de işaretlenmiş tüm maddeleri içerir. JSON v2/Markdown küme → başlık → madde hiyerarşisini ve değerlendirme bağlamını, 16 sütunlu CSV bu yapıyı ve karar dayanağını korur. CSV Türkçe karakterler için UTF-8 BOM kullanır ve formül hücrelerini nötrler.

## Yerel geliştirme

Node >=22, npm; yerelde doğrulanan Node24.21.0. Üretimde sunucu veya runtime bağımlılığı yoktur.

```sh
npm ci
npm run roadmap
npm run check
npm run build
npm run dev
```

Tarayıcıda `http://127.0.0.1:4173` adresini açın. `dist/` yalnız yayın dosyalarını içerir.

Değerlendirmeler `data/assessments-*.json`, etiketler ve sıra `data/roadmap.json` içindedir. `npm run roadmap` statik HTML ve veri adasını üretir; build eski veri/görünüm eşleşmesini reddeder. 326 özgün madde fixture ile korunur.

```sh
npx playwright install chromium firefox webkit
npm run test:browser
```

Playwright testleri gerçek Safari/iOS/Android sertifikasyonu değildir. Çalıştırılan kontroller ve sınırlar [doğrulama kaydında](docs/verification.md) bulunur.

## Yayın

`main` dalına push, `.github/workflows/pages.yml` aracılığıyla kontrolleri çalıştırır, statik siteyi paketler ve GitHub Pages'e dağıtır. Workflow Git commit üretmez. Public kaynak kodu servis veya kullanıcı verilerine erişim sağlamaz.

Outfit dosyaları Google Fonts'tan alınmıştır ve [SIL Open Font License](assets/fonts/OFL.txt) kapsamında dağıtılır. Proje kodunun lisansı MIT'dir. Font kaynağı: [Google Fonts Outfit](https://github.com/google/fonts/tree/main/ofl/outfit).

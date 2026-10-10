# SaaS Atlas

[Canlı site](https://karacaismail.github.io/saas/) · [MIT lisansı](LICENSE)

12 küme, 49 başlık ve 326 maddeden oluşan Türkçe SaaS özellik envanteri. Özellikleri arayın, sınıfına veya kümesine göre süzün, ihtiyacınız olanları işaretleyin ve seçili listeyi JSON, CSV veya Markdown olarak indirin.

Siyah **özgün kapsamı**, yeşil **kapsam içi eksikleri**, kırmızı **yeni alanları** gösterir. Renkler öncelik belirtmez. Sınıf etiketleri rengin yanında metinle bulunur. Envanter başlıkları ürün kapsamı önerileridir; kurulu veya çalışan yetenekleri göstermez.

Seçimler tarayıcıda saklanır; sunucuya gönderilmez. Filtreleri değiştirmek seçimi temizlemez. Dışa aktarma, aktif filtrede görünmese de işaretlenmiş tüm maddeleri içerir. JSON/Markdown küme → başlık → madde hiyerarşisini, CSV bu yapının sütunlarını korur. CSV Türkçe karakterler için UTF-8 BOM kullanır ve formül hücrelerini nötrler.

## Yerel geliştirme

Node >=22, npm; yerelde doğrulanan Node24.21.0. Üretimde sunucu veya runtime bağımlılığı yoktur.

```sh
npm ci
npm run check
npm run build
npm run dev
```

Tarayıcıda `http://127.0.0.1:4173` adresini açın. `dist/` yalnız yayın dosyalarını içerir.

```sh
npx playwright install chromium firefox webkit
npm run test:browser
```

Playwright testleri gerçek Safari/iOS/Android sertifikasyonu değildir. Çalıştırılan kontroller ve sınırlar [doğrulama kaydında](docs/verification.md) bulunur.

## Yayın

`main` dalına push, `.github/workflows/pages.yml` aracılığıyla kontrolleri çalıştırır, statik siteyi paketler ve GitHub Pages'e dağıtır. Workflow Git commit üretmez. Public kaynak kodu servis veya kullanıcı verilerine erişim sağlamaz.

Outfit dosyaları Google Fonts'tan alınmıştır ve [SIL Open Font License](assets/fonts/OFL.txt) kapsamında dağıtılır. Proje kodunun lisansı MIT'dir. Font kaynağı: [Google Fonts Outfit](https://github.com/google/fonts/tree/main/ofl/outfit).

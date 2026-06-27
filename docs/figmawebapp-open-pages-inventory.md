# حصر الصفحات المفتوحة من مستودع Figmawebapp

هذا الملف مرجع تنفيذي لموقع بيت الريف التعريفي `bietalreef.ae`.

الهدف: نقل/مطابقة الصفحات العامة المفتوحة الموجودة في مستودع `bietalreef/Figmawebapp` إلى الموقع التعريفي بشكل HTML قابل للزحف والفهرسة، مع الحفاظ على الروابط الحالية وعدم كسر الأرشفة.

---

## 1) القاعدة العامة

داخل `Figmawebapp` يوجد فصل واضح بين:

- Public SEO Pages: صفحات عامة مفتوحة لمحركات البحث، بدون تسجيل دخول.
- Private App Pages: صفحات التطبيق الداخلي، لا يتم فهرستها ولا تُنقل للموقع التعريفي كصفحات عامة.

لذلك هذا الملف يركز أولاً على الصفحات العامة المفتوحة فقط.

---

## 2) الصفحات العامة المفتوحة في Figmawebapp

### صفحات أساسية

| المسار في Figmawebapp | نوع الصفحة | المقابل المقترح في bietalreef.ae | الحالة في الموقع التعريفي |
|---|---|---|---|
| `/` | الصفحة الرئيسية العامة | `/` | موجود |
| `/privacy` | سياسة الخصوصية | `/legal#privacy` أو `/privacy` | يحتاج مطابقة/تحويل |
| `/terms` | الشروط والأحكام | `/legal#terms` أو `/terms` | يحتاج مطابقة/تحويل |
| `/about` | عن المنصة | `/about` | موجود |
| `/sitemap` | صفحة خريطة HTML | `/sitemap` | مطلوب إنشاء صفحة HTML |
| `/press` | صفحة الصحافة/Press Kit | `/press` | مطلوب إنشاء |
| `/gsc-guide` | دليل Google Search Console | `/gsc-guide` | اختياري/داخلي |
| `/webp` | أداة WebP عامة | `/tools` أو `/webp` | مطلوب قرار |

---

## 3) صفحات الخدمات العامة SEO Slugs

هذه صفحات مفتوحة في `Figmawebapp` ويجب توفير مقابل لها في الموقع التعريفي، إما بنفس الرابط أو بتحويل 301 إلى بنية `/categories` أو `/services`.

| المسار في Figmawebapp | الاسم العربي | المقابل المقترح في الموقع التعريفي | الحالة |
|---|---|---|---|
| `/contractors-in-uae` | شركات المقاولات | `/categories/general-contracting` + redirect | مطلوب |
| `/interior-design-uae` | التصميم الداخلي | `/categories/interior-design` + redirect | مطلوب |
| `/marble-suppliers-uae` | رخام وجرانيت | `/categories/marble-ceramic` + redirect | مطلوب |
| `/electrical-contractors-uae` | مقاولو الكهرباء | `/categories/electrical` + redirect | مطلوب |
| `/villa-renovation-uae` | ترميم الفلل | `/categories/finishing-works` + redirect | مطلوب |
| `/building-materials-uae` | مواد البناء | `/categories/building-materials` + redirect | مطلوب |
| `/maintenance-services-uae` | خدمات الصيانة | `/services/maintenance` أو `/categories/finishing-works` | مطلوب |
| `/craftsmen-uae` | حرفيون ومهنيون | `/categories/carpentry` أو صفحة عامة للحرفيين | مطلوب |
| `/cleaning-services-uae` | خدمات التنظيف | `/categories/cleaning-services` | مطلوب |
| `/equipment-rental-uae` | تأجير المعدات | `/categories/equipment-rental` | مطلوب |
| `/furniture-decor-uae` | أثاث وديكور | `/categories/furniture-decor` | مطلوب |

---

## 4) صفحات الخرائط العامة SEO

| المسار في Figmawebapp | نوع الصفحة | المقابل المقترح في الموقع التعريفي | الحالة |
|---|---|---|---|
| `/map/:city` | صفحة مدينة على الخريطة | `/uae/[emirate]/[area]` أو `/map/[city]` | مطلوب قرار |
| `/map/:city/:service` | مدينة + خدمة على الخريطة | `/uae/[emirate]/[area]/[service]` | موجود جزئياً في البنية الجديدة |

ملاحظة: الأفضل SEOياً أن تكون الصفحات الأساسية في الموقع التعريفي:

```text
/uae/[emirate]/[area]
/uae/[emirate]/[area]/[service]
```

ثم يمكن عمل redirects من `/map/...` لاحقاً إذا كانت مفهرسة أو مستخدمة.

---

## 5) صفحات المزودين والمنتجات العامة

| المسار في Figmawebapp | نوع الصفحة | المقابل المقترح في الموقع التعريفي | الحالة |
|---|---|---|---|
| `/provider/:slug` | صفحة مزود خدمة عامة | `/provider/[slug]` | مطلوب إنشاء قالب |
| `/product/:slug` | صفحة منتج عامة | `/product/[slug]` | مطلوب لاحقاً |

هذه الصفحات يجب أن تكون HTML قابلة للفهرسة، ولكن محتواها يعتمد لاحقاً على قاعدة بيانات مزودي الخدمات والمنتجات.

---

## 6) صفحات ميزات المنصة SEO

| المسار في Figmawebapp | المعنى | المقابل في bietalreef.ae | الحالة |
|---|---|---|---|
| `/seo/marketplace` | سوق المقاولات | `/marketplace` أو `/seo/marketplace` | `/marketplace` موجود |
| `/seo/store` | متجر بيت الريف | `/marketplace` أو `/store` | مطلوب قرار |
| `/seo/dashboards` | لوحات التحكم | `/platform` أو `/dashboards` | مطلوب قرار |
| `/seo/platform` | نظرة عامة على المنصة | `/platform` | موجود |
| `/seo/tools` | الأدوات الذكية | `/tools` | موجود |

---

## 7) صفحات التطبيق الداخلي في Figmawebapp — لا تُفهرس

هذه الصفحات موجودة في فرع التطبيق الداخلي ولا يجب نقلها كصفحات SEO عامة الآن:

```text
/home
/services
/services/:id
/services/:id/:city
/shop
/shop/:slug
/store/*
/maps
/marketplace
/recommendations
/offers
/tools
/dashboard
/platform
/profile
/profile/:id
/app-profile/:id
/wallet
/notifications
/subscriptions
/messages
/install-pwa
/projects
/projects/:id
/rfq
/connectors
/tools/webp-converter
/wayak
/onboarding
/oauth/callback
/auth/callback
/design
/ats
/admin
/workspace
/wayak-computer
```

القاعدة: هذه الصفحات تشغيلية داخل التطبيق، وليست هدفاً للأرشفة العامة حالياً.

---

## 8) المطلوب تنفيذه في الموقع التعريفي

### المرحلة الأولى — منع Error وتحسين الزحف

- [x] إنشاء `/uae`.
- [x] إنشاء `/uae/[emirate]`.
- [x] إنشاء `/uae/[emirate]/[area]`.
- [x] إنشاء `/uae/[emirate]/[area]/[service]`.
- [x] إنشاء `/categories/[slug]`.
- [x] إنشاء `/providers`.
- [x] إنشاء `/marketplace`.
- [x] إنشاء `/tools`.
- [x] إنشاء `/weyaak`.
- [x] إنشاء `sitemap.xml` ديناميكي.
- [x] تحديث `robots.txt`.

### المرحلة الثانية — مطابقة صفحات Figmawebapp المفتوحة

- [ ] إنشاء redirects أو صفحات مباشرة لمسارات الخدمات القديمة:
  - `/contractors-in-uae`
  - `/interior-design-uae`
  - `/marble-suppliers-uae`
  - `/electrical-contractors-uae`
  - `/villa-renovation-uae`
  - `/building-materials-uae`
  - `/maintenance-services-uae`
  - `/craftsmen-uae`
  - `/cleaning-services-uae`
  - `/equipment-rental-uae`
  - `/furniture-decor-uae`
- [ ] إنشاء `/sitemap` كصفحة HTML للزوار والعناكب.
- [ ] إنشاء `/press`.
- [ ] إنشاء `/provider/[slug]` كقالب صفحات مزودين عام.
- [ ] إنشاء `/product/[slug]` لاحقاً.
- [ ] مراجعة `/seo/*` وتحديد هل تبقى أو تتحول إلى صفحات نظيفة.

---

## 9) ملاحظات تنفيذية مهمة

1. لا يتم حذف أي رابط حالي.
2. أي رابط موجود في Figmawebapp ونريد نقله يجب أن يكون إما صفحة فعلية أو redirect واضح.
3. صفحات المدن والمناطق والتخصصات يجب أن تكون HTML جاهزة في السيرفر، لا مجرد روابط client-side.
4. كل صفحة جديدة يجب أن تحتوي على:
   - title
   - meta description
   - canonical
   - روابط داخلية للمدن/التخصصات
   - نص واضح لا يقل عن فقرة مفيدة
5. أي صفحة تخص التطبيق الداخلي يجب أن تبقى noindex أو خارج الموقع التعريفي.

---

## 10) مرجع سريع للصفحات الأهم التي يجب عدم فقدها

```text
/
/uae
/uae/[emirate]
/uae/[emirate]/[area]
/uae/[emirate]/[area]/[service]
/categories/[slug]
/providers
/provider/[slug]
/marketplace
/tools
/weyaak
/platform
/about
/blog
/legal
/sitemap.xml
/sitemap
/robots.txt
```

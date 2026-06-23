# نظام الكروت والداتا — بيت الريف V1

> هذا الملف هو مواصفات تنفيذية موحدة لنظام الداتا والكروت داخل منصة بيت الريف V1.
> الهدف: بناء نظام ديناميكي لا يعتمد على وضع الكروت يدوياً داخل الشاشات، بل يعتمد على Entities موحدة، تصنيف تلقائي، Card Views متعددة، Routing ذكي، وصلاحيات واضحة.

---

## 1. الرؤية العامة

كل كيان داخل بيت الريف يجب أن يمر بنفس الدورة:

1. يتم إنشاؤه كـ Entity في قاعدة البيانات.
2. يتم تصنيفه تلقائياً حسب النوع والتخصص والمدينة والفئة.
3. يتم إنشاء Card View مناسبة له.
4. يتم توجيهه تلقائياً للمكان الصحيح.
5. يتم إظهاره أو إخفاؤه حسب:
   - الصلاحيات.
   - الباقة.
   - حالة الاعتماد.
   - الموقع الجغرافي.
   - اهتمامات المستخدم.
   - نوع الحساب.

القاعدة الأساسية:

```txt
Data is created once.
Cards are views of the same data.
Do not duplicate data between Home, Maps, Marketplace, Profile, Search, or Weyaak.
```

---

## 2. الأماكن الأساسية التي تعتمد على نفس الداتا

لدينا 3 أماكن رئيسية في V1 تعتمد على نفس مصدر البيانات:

1. الصفحة الرئيسية Home.
2. الخرائط Maps.
3. Marketplace / السوق.

بالإضافة إلى أماكن ثانوية:

- Provider Profile.
- Search.
- Community.
- Weyaak UI.
- Dashboard.
- Notifications.

---

## 3. الصفحة الرئيسية Home

### 3.1 الفلاتر أسفل الهيدر

أسفل الهيدر العلوي تظهر فلاتر ثابتة:

```txt
[القريب مني ▼] [موصى به ▼] [الأقسام ▼] [العين ▼]
```

وظيفة هذه الفلاتر:

- التحكم في الكروت الظاهرة في الصفحة الرئيسية.
- تصفية النتائج حسب القرب، التوصية، القسم، والمدينة.
- استخدام نفس نظام الداتا وليس بيانات مستقلة.

### 3.2 أنواع الكروت في Home

الصفحة الرئيسية تعرض Compact Cards فقط:

- Provider Compact Card.
- Product Compact Card.
- Offer Compact Card.
- Community Post Card.
- Service Card.

### 3.3 منطق العرض في Home

عند دخول المستخدم:

1. يتم قراءة نوع الحساب.
2. يتم قراءة المدينة ومناطق الخدمة أو الاهتمامات.
3. يتم قراءة سجل الإعجابات والتفاعل.
4. يتم جلب الكروت المناسبة فقط.
5. يتم ترتيب الكروت حسب:
   - القرب الجغرافي.
   - الاهتمامات.
   - التوصيات.
   - الباقة.
   - حالة الاعتماد.
   - النشاط الأخير.

---

## 4. الخرائط Maps

### 4.1 قاعدة الظهور على الخريطة

الخرائط تعرض مزودي الخدمة فقط عندما يكون المزود:

- مكتمل الهوية.
- معتمد من إدارة المنصة.
- مفعّل الظهور.
- لديه موقع فعلي أو مناطق خدمة محددة.
- باقته تسمح بالظهور على الخرائط.
- غير محظور أو موقوف.

### 4.2 نوع الكارت في الخرائط

كل Marker يفتح بطاقة مختصرة:

- Map Provider Card.

### 4.3 Map Provider Card يجب أن يحتوي على:

- صورة مصغرة أو شعار.
- اسم المزود.
- التخصص.
- المدينة.
- المسافة.
- التقييم أو مستوى الثقة.
- زر عرض الملف.
- زر طلب عرض سعر / تواصل حسب الصلاحيات.

---

## 5. السوق Marketplace

### 5.1 قاعدة مهمة

السوق لا يستخدم Provider Categories.
السوق يستخدم Product Categories فقط.

أمثلة Product Categories:

- مواد بناء.
- إنارة.
- أثاث.
- رخام.
- أبواب.
- مطابخ.
- دهانات.
- أدوات صحية.
- أنظمة ذكية.
- ألمنيوم.
- زجاج.
- أخشاب.

### 5.2 عند رفع منتج

كل منتج يتم رفعه من مزود الخدمة ينشأ له:

- Product Entity.
- Product Card.
- Product Category.
- Product Images.
- Search Index.
- AI Data Entry.

### 5.3 بيانات المنتج

المنتج يدخل حسب:

- نوع المنتج.
- تصنيف المنتج.
- المورد.
- الصور.
- السعر.
- المواصفات.
- حالة التوفر.
- مناطق التوصيل.
- نوع البيع: جملة / تجزئة.

---

## 6. الفصل بين Provider Categories و Product Categories

### 6.1 Provider Categories

مزود الخدمة يدخل حسب:

- نوع الحساب.
- التخصص الرئيسي.
- الخدمات الفرعية.
- المدينة.
- مناطق الخدمة.
- حالة الاعتماد.
- الباقة.

أمثلة:

- فرد.
- شركة / مؤسسة.
- مكتب هندسي واستشاري.
- مورد / متجر.
- مصنع / ورشة.
- أثاث وفرش وديكور.
- خدمات تشغيلية.

### 6.2 Product Categories

المنتج يدخل حسب:

- نوع المنتج.
- تصنيف المنتج.
- المورد أو المتجر.
- الصور.
- السعر.
- المواصفات.
- المخزون.
- التوصيل.

### 6.3 ممنوع الخلط

لا يتم استخدام تصنيف المزود كتصنيف للسوق.
مثال:

- المزود: مورد / متجر.
- المنتج: إنارة أو مواد بناء أو أثاث.

---

## 7. نظام الصور Images System

أي صورة مرفوعة داخل النظام يجب أن تكون Entity مستقلة.

### 7.1 Collections المطلوبة

```txt
images
imageTags
imageRelations
```

### 7.2 Image Entity Fields

كل صورة لها:

```ts
ImageEntity {
  id: string;
  ownerId: string;
  providerId?: string;
  entityType: 'provider' | 'product' | 'project' | 'offer' | 'document' | 'communityPost' | 'service' | 'quotation' | 'contract' | 'invoice';
  entityId: string;
  category: string;
  tags: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  visibility: 'public' | 'private' | 'weyaakOnly' | 'providerOnly';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

### 7.3 أنواع الصور

الصور تشمل:

- صور أعمال.
- صور منتجات.
- صور ديكور.
- صور أثاث.
- صور مشاريع.
- صور مستندات.
- صور عروض أسعار.
- صور قبل وبعد.

### 7.4 الهدف من نظام الصور

تمكين وياك لاحقاً من:

- البحث داخل صور المنتجات والأعمال.
- اقتراح منتجات أو تصاميم مشابهة.
- استخدام الصور في توصيات التصميم الداخلي.
- ربط الصور بالمزود والمنتج والمشروع.
- إنشاء نتائج ذكية داخل Weyaak UI.

---

## 8. نظام الكروت Cards System

يجب إنشاء Widgets قابلة لإعادة الاستخدام:

- ProviderCard.
- ProductCard.
- OfferCard.
- ServiceCard.
- ImageCard.
- DocumentCard.
- RequestCard.
- QuotationCard.
- ContractCard.
- ProjectCard.
- InvoiceCard.
- CommunityPostCard.
- MapProviderCard.

### 8.1 كل Card يجب أن تدعم

- ID.
- صورة.
- عنوان.
- وصف مختصر.
- Status.
- Category.
- Owner / Provider.
- Actions.
- Visibility Rules.
- Tracking / Analytics.

### 8.2 Card Contexts

نفس الداتا تظهر بأشكال مختلفة حسب المكان:

| المكان | شكل الكارت |
|---|---|
| Home | Compact Card |
| Maps | Map Card |
| Marketplace | Product Card |
| Profile | Full Card |
| Weyaak | Smart Result Card |
| Dashboard | Management Card |
| Search | Search Result Card |

---

## 9. Auto Card Routing

لا يتم وضع الكروت يدوياً داخل الشاشات.

المنطق المطلوب:

```txt
Entity Created / Activated
↓
Classify Entity
↓
Generate Card View
↓
Apply Visibility Rules
↓
Route Card To:
- Home
- Maps
- Marketplace
- Provider Profile
- Search
- Community
- Weyaak UI
- Dashboard
```

### 9.1 Entity Routing Matrix

| Entity | Home | Maps | Marketplace | Profile | Search | Community | Weyaak |
|---|---|---|---|---|---|---|---|
| Provider | yes | yes if eligible | no | yes | yes | optional | yes |
| Product | yes | optional | yes | yes | yes | optional | yes |
| Offer | yes | no | optional | yes | yes | no | yes |
| Service | yes | optional | optional | yes | yes | no | yes |
| Image | optional | no | optional | yes | yes | optional | yes |
| Request | no | no | no | dashboard | no | no | yes |
| Quotation | no | no | no | dashboard | no | no | yes |
| Contract | no | no | no | dashboard | no | no | yes |
| Invoice | no | no | no | dashboard | no | no | yes |
| Community Post | yes | no | no | profile | yes | yes | yes |

---

## 10. علاقة وياك بالكروت

وياك لا يرد بنص فقط.
وياك يجب أن يستطيع عرض كروت داخل شاشته حسب طلب المستخدم.

### أمثلة

- العميل يطلب مقاول قريب:
  - يعرض Provider Cards.

- العميل يطلب فرش غرفة:
  - يعرض Product Cards + Image Cards.

- العميل يريد تصميم غرفة:
  - يبحث في Product Images + Decor Images + Furniture Images.

- المزود يسأل عن الطلبات:
  - يعرض Request Cards.

- العميل يسأل عن عروضه:
  - يعرض Quotation Cards.

- المزود يسأل عن فواتيره:
  - يعرض Invoice Cards.

### 10.1 Weyaak Smart Result Card

يجب أن يدعم:

- entityType.
- entityId.
- title.
- image.
- summary.
- confidenceScore.
- recommendedAction.
- deepLink.
- actions.

---

## 11. الصلاحيات والباقات Visibility Rules

كل ظهور للكارت يجب أن يمر على Rules Engine.

### 11.1 قواعد عامة

الكارت لا يظهر إلا إذا:

- الكيان active أو approved.
- المستخدم لديه صلاحية مشاهدة.
- الباقة تسمح بالظهور.
- المدينة أو المنطقة مناسبة.
- الكيان غير محظور.
- المحتوى غير مرفوض.

### 11.2 قواعد مزود الخدمة

مزود الخدمة لا يظهر في Home/Maps/Search إلا إذا:

- التسجيل مكتمل.
- الهوية أو الرخصة مرفوعة.
- الحساب قيد المراجعة أو معتمد حسب نوع الظهور.
- الظهور مفعل من لوحة المزود.
- الإدارة لم توقف الحساب.

### 11.3 قواعد المنتجات

المنتج لا يظهر في Marketplace إلا إذا:

- المنتج مكتمل البيانات.
- الصور مرفوعة.
- التصنيف محدد.
- المنتج approved أو active.
- المتجر أو المورد مفعل.
- الباقة تسمح بنشر المنتجات.

---

## 12. الاهتمامات والتوصيات

عند تسجيل العميل يجب تخزين الاهتمامات:

- مهتم بالمقاولات.
- مهتم بالديكور.
- مهتم بالأثاث.
- مهتم بمواد البناء.
- مهتم بالصيانة.
- مهتم بالتصميم.

لاحقاً يتم استخدام:

- الاهتمامات.
- الإعجابات.
- المشاهدات.
- الطلبات السابقة.
- الموقع.

لترتيب الكروت في Home وWeyaak.

---

## 13. إشعارات ورسائل مرتبطة بالكروت

كل Card مهمة يجب أن تدعم notifications عند حدوث أحداث مهمة.

أمثلة:

- عرض سعر جديد.
- قبول عرض.
- تحديث منتج.
- اعتماد مزود خدمة.
- رسالة جديدة.
- مستند جديد.
- فاتورة جديدة.
- طلب جديد.

الإشعارات تظهر داخل التطبيق، ويمكن لاحقاً إرسالها عبر واتساب أو البريد حسب التفعيل.

---

## 14. حساب الأدمن Admin Control

يجب إنشاء Admin Control يدير:

- تفعيل وإيقاف الأقسام.
- اعتماد مزودي الخدمة.
- اعتماد المنتجات.
- مراجعة الصور والمستندات.
- إدارة الباقات.
- إدارة ظهور الكروت.
- إدارة التصنيفات.
- إدارة التنبيهات.
- مراقبة الاستهلاك.
- مراقبة استخدام وياك.

لا يجب أن يحتاج النظام لتعديل الكود عند إضافة تصنيف أو تفعيل قسم جديد.

---

## 15. Collections مقترحة في Firebase / Firestore

```txt
users
providers
providerProfiles
providerServices
providerStores
products
productCategories
providerCategories
images
imageTags
imageRelations
offers
requests
quotations
contracts
invoices
projects
communityPosts
cards
cardRoutes
visibilityRules
plans
subscriptions
usageLogs
notifications
weyaakResults
searchIndex
adminSettings
```

---

## 16. أهم قاعدة تنفيذية

الداتا واحدة.

أما شكل الكارت فيختلف حسب مكان الظهور:

- Home = Compact Card.
- Maps = Map Card.
- Marketplace = Product Card.
- Profile = Full Card.
- Weyaak = Smart Result Card.

لا تكرر الداتا.
استخدم نفس Entity واعرضها بأكثر من Card View.

---

## 17. المطلوب تنفيذه في V1

### Phase 1 — Data Models

- Provider Entity.
- Product Entity.
- Image Entity.
- Card View Model.
- Visibility Rules Model.
- Category Models.

### Phase 2 — Reusable Cards

- ProviderCard.
- ProductCard.
- ServiceCard.
- ImageCard.
- MapProviderCard.
- CommunityPostCard.

### Phase 3 — Routing Engine

- classifyEntity().
- generateCardView().
- applyVisibilityRules().
- routeCardToDestinations().

### Phase 4 — Screens Integration

- Home filters.
- Maps markers.
- Marketplace product categories.
- Provider profile cards.
- Weyaak smart results.

### Phase 5 — Admin

- مراجعة واعتماد الكيانات.
- تفعيل وإيقاف الظهور.
- إدارة التصنيفات.
- إدارة الباقات.

---

## 18. ممنوعات أثناء التنفيذ

- ممنوع وضع كروت يدوياً داخل الصفحة الرئيسية.
- ممنوع خلط تصنيفات المزود مع تصنيفات المنتجات.
- ممنوع تكرار بيانات المنتج داخل أكثر من collection بدون سبب.
- ممنوع إظهار مزود غير معتمد على الخريطة.
- ممنوع جعل وياك يرد نصياً فقط بدون دعم كروت.
- ممنوع بناء واجهة لا تعتمد على Rules.
- ممنوع تعديل الكود مستقبلاً لمجرد إضافة تصنيف جديد.

---

## 19. تعريف النجاح

يعتبر النظام ناجحاً إذا:

1. أي مزود خدمة يكمل تسجيله، يتم إنشاء بطاقته تلقائياً.
2. أي منتج يتم رفعه، يظهر في السوق تحت تصنيفه الصحيح.
3. أي صورة ترفع، يتم ربطها بالكيان الصحيح وتصبح قابلة للبحث من وياك.
4. الصفحة الرئيسية تعرض ما يناسب المستخدم فقط.
5. الخرائط لا تعرض إلا المزودين المؤهلين.
6. وياك يستطيع عرض نتائج على شكل كروت، وليس نصوص فقط.
7. الأدمن يستطيع التحكم في الظهور والتفعيل بدون تعديل كود.

---

## 20. ملاحظة استراتيجية

هذا النظام هو قلب بيت الريف.

الهدف ليس فقط عرض بيانات، بل إنشاء بنية تجعل:

- الموقع التعريفي يخدم SEO وصفحات الهبوط.
- التطبيق يخدم التشغيل والطلبات.
- وياك يستخدم نفس الداتا في النتائج والتوصيات.
- مزود الخدمة يستفيد من الكروت في الصفحة الرئيسية، السوق، الخرائط، الملف الشخصي، والبحث.


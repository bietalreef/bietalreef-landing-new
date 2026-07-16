export const alrehabTemplate = {
  schemaVersion: 1,
  id: 'BR-PROV-ALR-001',
  slug: 'alrehab-cleaning-sanitizing',
  identity: {
    name: { ar: 'الرحاب للتنظيف والتعقيم', en: 'Al Rehab Cleaning & Sanitizing' },
    shortName: { ar: 'الرحاب', en: 'Al Rehab' },
    providerType: { ar: 'خدمات تنظيف وتعقيم احترافية', en: 'Professional Cleaning & Sanitizing Services' },
    tagline: { ar: 'نظافة احترافية… بيئة صحية وآمنة', en: 'Professional cleaning for a healthy, safe environment' },
    verified: true,
  },
  contact: { phone: '+971547761290', whatsapp: '+971547761290' },
  media: {
    logo: '/images/providers/alrehab/logo.webp',
    cover: '/images/providers/alrehab/profile-cover.webp',
  },
  coverage: [
    { slug: 'al-ain', ar: 'جميع مناطق العين', en: 'All Al Ain areas' },
    { slug: 'abu-dhabi', ar: 'جميع مناطق أبوظبي', en: 'All Abu Dhabi areas' },
    { slug: 'dubai', ar: 'جميع مناطق دبي', en: 'All Dubai areas' },
  ],
  description: {
    ar: 'الرحاب للتنظيف والتعقيم مزود خدمة متخصص في التنظيف العميق للكنب والسجاد والمجالس والمراتب للمنازل والمكاتب في العين وأبوظبي ودبي. يعتمد الفريق على معدات الاستخلاص بالبخار ومواد تنظيف وتعقيم آمنة لإزالة الأوساخ والبقع والروائح وتحسين نظافة الأقمشة، مع معاينة حالة القطعة وتحديد الطريقة المناسبة قبل التنفيذ.',
    en: 'Al Rehab Cleaning & Sanitizing provides deep cleaning for sofas, carpets, majlis seating and mattresses across Al Ain, Abu Dhabi and Dubai. The team uses professional steam-extraction equipment and safe cleaning products to remove dirt, stains and odours after assessing the fabric and selecting the appropriate treatment.',
  },
  services: [
    { id: 'BR-SRV-ALR-001', slug: 'sofa-cleaning', title: { ar: 'تنظيف الكنب بالبخار', en: 'Steam Sofa Cleaning' }, summary: { ar: 'تنظيف عميق للكنب والأقمشة لإزالة الأوساخ والبقع والروائح حسب نوع النسيج.', en: 'Deep fabric cleaning to remove dirt, stains and odours based on material type.' }, image: '/images/providers/alrehab/service-sofa.webp' },
    { id: 'BR-SRV-ALR-002', slug: 'carpet-cleaning', title: { ar: 'تنظيف السجاد والموكيت', en: 'Carpet & Rug Cleaning' }, summary: { ar: 'استخلاص عميق للأتربة والبقع مع تجفيف منظم يناسب السجاد والموكيت.', en: 'Deep extraction for dust and stains with controlled drying.' }, image: '/images/providers/alrehab/service-carpet.webp' },
    { id: 'BR-SRV-ALR-003', slug: 'majlis-cleaning', title: { ar: 'تنظيف المجالس العربية', en: 'Arabic Majlis Cleaning' }, summary: { ar: 'تنظيف وتعقيم فرش المجالس والمساند والوسائد مع معالجة الروائح.', en: 'Cleaning and sanitizing majlis seating, cushions and odours.' }, image: '/images/providers/alrehab/service-majlis.webp' },
    { id: 'BR-SRV-ALR-004', slug: 'mattress-sanitizing', title: { ar: 'تنظيف وتعقيم المراتب', en: 'Mattress Cleaning & Sanitizing' }, summary: { ar: 'تنظيف المراتب وإزالة الأتربة والروائح باستخدام معدات ومواد مناسبة.', en: 'Mattress cleaning for dust and odours using suitable equipment and products.' }, image: '/images/providers/alrehab/service-mattress.webp' },
  ],
  offers: [
    { id: 'BR-OFR-ALR-001', title: { ar: 'باقة كنب الصالة', en: 'Living Room Sofa Package' }, summary: { ar: 'تنظيف كنب الصالة مع معالجة أولية للبقع الظاهرة.', en: 'Living room sofa cleaning with initial visible-stain treatment.' }, badge: { ar: 'عرض منزلي', en: 'Home offer' }, image: '/images/providers/alrehab/service-sofa.webp' },
    { id: 'BR-OFR-ALR-002', title: { ar: 'باقة السجاد والموكيت', en: 'Carpet & Rug Package' }, summary: { ar: 'تنظيف سجاد أو موكيت المساحة بعد تحديد المقاس وحالة البقع.', en: 'Carpet or rug cleaning after confirming size and stain condition.' }, badge: { ar: 'الأكثر طلباً', en: 'Most requested' }, image: '/images/providers/alrehab/service-carpet.webp' },
    { id: 'BR-OFR-ALR-003', title: { ar: 'باقة المجلس المتكاملة', en: 'Complete Majlis Package' }, summary: { ar: 'تنظيف فرش المجلس والمساند والوسائد ضمن زيارة واحدة.', en: 'Majlis seating, backrests and cushions cleaned in one visit.' }, badge: { ar: 'زيارة واحدة', en: 'One visit' }, image: '/images/providers/alrehab/service-majlis.webp' },
    { id: 'BR-OFR-ALR-004', title: { ar: 'باقة المراتب العائلية', en: 'Family Mattress Package' }, summary: { ar: 'تنظيف مجموعة مراتب منزلية حسب العدد والمقاس والحالة.', en: 'Multiple household mattresses based on quantity, size and condition.' }, badge: { ar: 'للعائلات', en: 'For families' }, image: '/images/providers/alrehab/service-mattress.webp' },
  ],
  faq: [
    { questionAr: 'ما مناطق خدمة الرحاب للتنظيف والتعقيم؟', answerAr: 'تغطي الخدمة جميع مناطق العين وأبوظبي ودبي، ويحدد الموعد حسب المنطقة ونوع العمل.' },
    { questionAr: 'هل تستخدمون مواد تنظيف وتعقيم آمنة؟', answerAr: 'يتم اختيار المواد بحسب نوع القماش وحالته، مع مراعاة تعليمات الاستخدام والسلامة قبل بدء التنظيف.' },
    { questionAr: 'كيف أحصل على سعر دقيق؟', answerAr: 'أرسل صور القطع وعددها ومقاساتها وموقع الخدمة عبر واتساب، ثم تتم مراجعة الحالة وتأكيد السعر والموعد.' },
    { questionAr: 'هل يمكن إزالة جميع البقع؟', answerAr: 'تختلف النتيجة حسب نوع البقعة وعمرها ونوع النسيج؛ تتم المعاينة أولاً وتوضيح النتيجة المتوقعة دون وعود غير واقعية.' },
  ],
};

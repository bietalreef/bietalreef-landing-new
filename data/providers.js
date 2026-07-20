import { arkleenTemplate } from './providerTemplates/arkleen';

export const arklineProvider = {
  slug: 'arkleen',
  planCode: 'digital-presence',
  planMonthlyPrice: 300,
  providerId: arkleenTemplate.id,
  nameAr: 'أركلين لأعمال النجارة والتصميم الداخلي',
  nameEn: 'ARKLEEN Carpentry & Interior Design',
  phone: '056 779 7828',
  whatsapp: '+971567797828',
  website: 'https://www.arkleen.ae',
  city: 'al-ain',
  area: 'mazid-company-camp',
  emirate: 'abu-dhabi',
  accountType: 'workshop',
  mainSpecialty: 'carpentry-interior-design',
  categorySlugs: ['carpentry-woodwork', 'interior-design', 'finishing-works'],
  providerTypeAr: 'ورشة نجارة وتصميم داخلي',
  providerTypeEn: 'Carpentry & Interior Design Workshop',
  verified: true,
  acceptsQuotes: true,
  establishedAt: '2015',
  logo: arkleenTemplate.media.logo,
  cover: arkleenTemplate.media.cover,
  locations: [
    { emirate: 'abu-dhabi', city: 'al-ain', area: 'mazid-company-camp', coverageType: 'area', isPrimary: true, cityAr: 'العين', cityEn: 'Al Ain', areaAr: 'مزيد - معسكر الشركات', areaEn: 'Mazyad Company Camp' },
  ],
  directoryServices: [
    { cardId: 'BR-SRV-ARK-001', slug: 'custom-wooden-kitchens', categorySlug: 'carpentry', titleAr: 'مطابخ خشبية حسب الطلب', titleEn: 'Custom Wooden Kitchens', image: '/images/providers/arkleen-premium/service-custom-kitchens.webp' },
    { cardId: 'BR-SRV-ARK-002', slug: 'custom-wardrobes', categorySlug: 'carpentry', titleAr: 'خزائن ودواليب حسب المقاس', titleEn: 'Made-to-measure Wardrobes', image: '/images/providers/arkleen-premium/service-custom-wardrobes.webp' },
    { cardId: 'BR-SRV-ARK-003', slug: 'wooden-doors-and-decor', categorySlug: 'carpentry', titleAr: 'أبواب وديكورات خشبية', titleEn: 'Wooden Doors & Decorative Woodwork', image: '/images/providers/arkleen-premium/service-wooden-doors-decor.webp' },
    { cardId: 'BR-SRV-ARK-004', slug: 'interior-design-fitout', categorySlug: 'interior-design', titleAr: 'تصميم داخلي وتشطيبات', titleEn: 'Interior Design & Fit-out', image: '/images/providers/arkleen-premium/service-interior-fitout.webp' },
  ],
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=%D8%A3%D8%B1%D9%83%D9%84%D9%8A%D9%86+%D8%A3%D8%B9%D9%85%D8%A7%D9%84+%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%B1%D8%A9+%D9%85%D8%B2%D9%8A%D8%AF+%D9%85%D8%B9%D8%B3%D9%83%D8%B1+%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA+%D8%A7%D9%84%D8%B9%D9%8A%D9%86',
  workingHours: 'السبت - الخميس: بتنسيق مسبق، الجمعة حسب الموعد',
  workingHoursEn: 'Saturday - Thursday: By appointment, Friday: By arrangement',
  descriptionAr: 'أركلين ورشة نجارة وتصميم داخلي في مدينة العين، متخصصة في تصميم وتصنيع وتركيب المطابخ والخزائن والأبواب والكسوات والديكورات الخشبية والأثاث حسب المقاسات واحتياج المشروع. تستقبل طلبات الأسعار بعد مراجعة الصور والمقاسات والخامة والتشطيب المطلوب.',
  descriptionEn: 'ARKLEEN is a carpentry and interior design workshop in Al Ain specializing in custom kitchens, wardrobes, doors, wood cladding, decorative woodwork and made-to-measure furniture. Quotation requests are reviewed based on photos, measurements, materials and required finishes.',
  aboutAr: 'يعرض هذا الملف الرقمي خدمات أركلين ومشاريعها ومنتجاتها وطرق التواصل المباشر داخل منصة بيت الريف، مع بطاقات مستقلة لكل خدمة ومنتج ومشروع ومعرفات جاهزة للربط مع وياك وSupabase.',
  aboutEn: 'This digital profile presents ARKLEEN services, projects, products and direct contact channels inside Biet Al Reef, with independent identifiers ready for Wayaak and Supabase integration.',
  services: ['مطابخ حسب المقاس', 'خزائن ودواليب', 'أبواب خشبية', 'ديكورات وكسوات', 'تصميم داخلي', 'تصنيع حسب الطلب', 'توريد وتركيب'],
  serviceAreas: ['al-ain', 'abu-dhabi'],
  gallery: [
    { src: '/images/providers/arkleen-premium/profile-cover.webp', altAr: 'أعمال أركلين للنجارة والتصميم الداخلي في العين', altEn: 'ARKLEEN carpentry and interior design in Al Ain', category: 'profile' },
    { src: '/images/providers/arkleen-premium/service-custom-kitchens.webp', altAr: 'مطابخ خشبية حسب الطلب من أركلين', altEn: 'Custom wooden kitchens by ARKLEEN', category: 'kitchens' },
    { src: '/images/providers/arkleen-premium/service-custom-wardrobes.webp', altAr: 'خزائن ودواليب حسب المقاس من أركلين', altEn: 'Made-to-measure wardrobes by ARKLEEN', category: 'wardrobes' },
    { src: '/images/providers/arkleen-premium/service-wooden-doors-decor.webp', altAr: 'أبواب وكسوات خشبية مخصصة من أركلين', altEn: 'Custom wooden doors and cladding by ARKLEEN', category: 'doors' },
    { src: '/images/providers/arkleen-premium/service-interior-fitout.webp', altAr: 'تصميم داخلي وتجهيز مساحات من أركلين', altEn: 'Interior design and fit-out by ARKLEEN', category: 'interior' }
  ],
  materials: [
    { nameAr: 'خشب المرنتي', nameEn: 'Meranti Wood', descAr: 'للأبواب والفريمات والأعمال الخشبية حسب متطلبات المشروع', descEn: 'For doors, frames and custom woodwork' },
    { nameAr: 'خشب الزان', nameEn: 'Beech Wood', descAr: 'للأثاث والأعمال التي تحتاج صلابة وتشطيباً مميزاً', descEn: 'For furniture and durable premium finishes' },
    { nameAr: 'ألواح MDF وبدائل الخشب', nameEn: 'MDF & Wood Alternatives', descAr: 'للمطابخ والخزائن والكسوات والتشطيبات الداخلية', descEn: 'For kitchens, wardrobes, cladding and interiors' }
  ],
  faq: [
    { questionAr: 'هل تنفذ أركلين الأعمال حسب المقاس؟', questionEn: 'Does ARKLEEN provide made-to-measure work?', answerAr: 'نعم، تتم مراجعة المقاسات والصور والخامة والتشطيب قبل إعداد عرض السعر وبدء التصنيع.', answerEn: 'Yes. Measurements, photos, materials and finishes are reviewed before quotation and fabrication.' },
    { questionAr: 'ما الخدمات الرئيسية؟', questionEn: 'What are the main services?', answerAr: 'المطابخ والخزائن والأبواب والديكورات الخشبية والكسوات والتصميم الداخلي والأثاث حسب الطلب.', answerEn: 'Kitchens, wardrobes, doors, decorative woodwork, cladding, interior design and custom furniture.' },
    { questionAr: 'كيف أطلب عرض سعر؟', questionEn: 'How can I request a quotation?', answerAr: 'يمكن فتح ملف أركلين وإرسال تفاصيل الخدمة أو المنتج مع الصور والمقاسات عبر واتساب أو وياك.', answerEn: 'Open the ARKLEEN profile and send the service or product details, photos and measurements through WhatsApp or Wayaak.' }
  ]
};

export const providers = [
  {
    slug: 'al-hoot-marble-granite-factory',
    providerId: 'BR-PROV-HOT-001',
    planCode: 'professional-presence',
    planMonthlyPrice: 500,
    nameAr: 'مصنع الحوت الأبيض للرخام والجرانيت',
    nameEn: 'White Whale Marble & Granite Factory',
    phone: '050 662 3518',
    whatsapp: '+971506623518',
    city: 'al-ain',
    area: 'mazid-company-camp',
    emirate: 'abu-dhabi',
    accountType: 'factory-workshop',
    mainSpecialty: 'marble-workshop',
    categorySlugs: ['marble-ceramic', 'building-materials', 'finishing-works'],
    providerTypeAr: 'مصنع رخام وجرانيت',
    providerTypeEn: 'Marble & Granite Factory',
    verified: true,
    acceptsQuotes: true,
    yearsExperience: 10,
    logo: '/images/providers/al-hoot-logo.png',
    cover: '/images/providers/al-hoot/cover.jpg',
    locations: [
      { emirate: 'abu-dhabi', city: 'al-ain', coverageType: 'city', isPrimary: true, cityAr: 'العين', cityEn: 'Al Ain' },
      { emirate: 'abu-dhabi', city: 'abu-dhabi-city', coverageType: 'city', cityAr: 'مدينة أبوظبي', cityEn: 'Abu Dhabi City' },
    ],
    directoryServices: [
      { cardId: 'BR-SRV-HOT-001', slug: 'marble-granite-supply', categorySlug: 'marble-ceramic', titleAr: 'توريد الرخام والجرانيت', titleEn: 'Marble & Granite Supply', image: '/images/providers/al-hoot/gallery-1.jpg' },
      { cardId: 'BR-SRV-HOT-002', slug: 'stone-cutting-fabrication', categorySlug: 'marble-ceramic', titleAr: 'قص وتصنيع الحجر حسب المقاس', titleEn: 'Custom Stone Cutting & Fabrication', image: '/images/providers/al-hoot/gallery-2.jpg' },
      { cardId: 'BR-SRV-HOT-003', slug: 'kitchen-countertop-installation', categorySlug: 'marble-ceramic', titleAr: 'تصنيع وتركيب أسطح المطابخ', titleEn: 'Kitchen Countertop Installation', image: '/images/providers/al-hoot/gallery-3.jpg' },
      { cardId: 'BR-SRV-HOT-004', slug: 'marble-cladding-flooring', categorySlug: 'marble-ceramic', titleAr: 'تركيب الرخام للواجهات والأرضيات', titleEn: 'Marble Cladding & Flooring', image: '/images/providers/al-hoot/gallery-4.jpg' },
    ],
    googleMapsUrl: 'https://maps.app.goo.gl/tZ4vRF5Fty2EU3WR7',
    workingHours: 'السبت - الخميس: 8:00 صباحاً - 6:00 مساءً',
    workingHoursEn: 'Saturday - Thursday: 8:00 AM - 6:00 PM',
    descriptionAr: 'مصنع الحوت الأبيض للرخام والجرانيت مزود خدمة متخصص في توريد وتصنيع وتركيب الرخام الطبيعي والجرانيت والكوارتز والحجر الصناعي للمطابخ والواجهات والأرضيات والسلالم والمغاسل. يخدم المصنع مدينة العين وأبوظبي، ويمكن دراسة الطلبات في باقي إمارات الدولة حسب تفاصيل المشروع.',
    descriptionEn: 'White Whale Marble & Granite Factory is a specialized service provider for supplying, fabricating and installing natural marble, granite, quartz and engineered stone for kitchens, façades, floors, stairs and washbasins. The factory serves Al Ain and Abu Dhabi, and can review project requests across the UAE depending on project details.',
    aboutAr: 'يعرض هذا الملف التعريفي بيانات مصنع الحوت الأبيض للرخام والجرانيت داخل منصة بيت الريف لمساعدة العملاء على فهم نطاق الخدمة وطرق التواصل وطلب عروض الأسعار. يتم تحديد الأسعار بعد مراجعة نوع الخامة والمقاسات وموقع المشروع وطريقة التصنيع والتركيب المطلوبة.',
    aboutEn: 'This profile presents White Whale Marble & Granite Factory inside Biet Al Reef to help customers understand the service scope, contact channels and quotation path. Pricing is determined after reviewing material type, measurements, project location and required fabrication or installation method.',
    services: ['رخام طبيعي', 'جرانيت', 'كوارتز', 'حجر صناعي', 'تصنيع حسب الطلب', 'توريد', 'تركيب', 'مطابخ', 'مغاسل', 'واجهات', 'أرضيات', 'سلالم'],
    serviceAreas: ['al-ain', 'abu-dhabi'],
    gallery: [
      { src: '/images/providers/al-hoot/gallery-1.jpg', altAr: 'نماذج خامات رخام وجرانيت', altEn: 'Marble and granite material samples', category: 'materials' },
      { src: '/images/providers/al-hoot/gallery-2.jpg', altAr: 'أسطح مطابخ وكونترات', altEn: 'Kitchen tops and countertops', category: 'kitchens' },
      { src: '/images/providers/al-hoot/gallery-3.jpg', altAr: 'أعمال واجهات وأرضيات', altEn: 'Facade and flooring works', category: 'facades' },
      { src: '/images/providers/al-hoot/gallery-4.jpg', altAr: 'درج وأعمال داخلية', altEn: 'Stairs and interior works', category: 'stairs' },
      { src: '/images/providers/al-hoot/gallery-5.jpg', altAr: 'مغاسل وأسطح كوارتز', altEn: 'Washbasins and quartz tops', category: 'washbasins' },
      { src: '/images/providers/al-hoot/gallery-6.jpg', altAr: 'تجهيزات ورشة التصنيع', altEn: 'Fabrication workshop setup', category: 'factory' }
    ],
    materials: [
      { nameAr: 'رخام طبيعي', nameEn: 'Natural Marble', descAr: 'خيارات متعددة للأرضيات والواجهات والدرج والمغاسل', descEn: 'Options for floors, façades, stairs and washbasins' },
      { nameAr: 'جرانيت', nameEn: 'Granite', descAr: 'حلول مناسبة للأعمال التي تحتاج صلابة ومتانة', descEn: 'Suitable for applications requiring strength and durability' },
      { nameAr: 'كوارتز', nameEn: 'Quartz', descAr: 'أسطح مطابخ وكونترات حسب المقاس والتشطيب', descEn: 'Kitchen tops and countertops based on measurements and finish' },
      { nameAr: 'حجر صناعي', nameEn: 'Engineered Stone', descAr: 'بدائل صناعية وتشطيبات حديثة حسب متطلبات المشروع', descEn: 'Engineered alternatives and modern finishes based on project requirements' }
    ],
    faq: [
      { questionAr: 'هل يوفر المصنع رخاماً وجرانيتاً وكوارتز؟', questionEn: 'Does the factory provide marble, granite and quartz?', answerAr: 'نعم، يوفر المصنع خدمات التوريد والتصنيع والتركيب للرخام الطبيعي والجرانيت والكوارتز والحجر الصناعي حسب متطلبات المشروع.', answerEn: 'Yes. The factory provides supply, fabrication and installation for natural marble, granite, quartz and engineered stone based on project requirements.' },
      { questionAr: 'هل يمكن طلب عرض سعر من خلال بيت الريف؟', questionEn: 'Can I request a quotation through Biet Al Reef?', answerAr: 'نعم، يمكن إرسال تفاصيل المشروع والصور والمقاسات وموقع العمل ليتم توجيه الطلب لمسار عرض السعر المناسب.', answerEn: 'Yes. You can send project details, photos, measurements and location so the request can be directed to the suitable quotation path.' },
      { questionAr: 'ما هي مناطق الخدمة؟', questionEn: 'What areas are served?', answerAr: 'الخدمة الأساسية في العين وأبوظبي، ويمكن دراسة الطلبات في باقي إمارات الدولة حسب تفاصيل وحجم المشروع.', answerEn: 'The main service coverage is Al Ain and Abu Dhabi. Requests in other UAE emirates can be reviewed depending on project details and size.' },
      { questionAr: 'كيف يتم تحديد السعر؟', questionEn: 'How is pricing determined?', answerAr: 'يعتمد السعر على نوع الخامة، المقاسات، تفاصيل التصنيع، موقع المشروع، وطريقة التركيب المطلوبة.', answerEn: 'Pricing depends on material type, measurements, fabrication details, project location and required installation method.' }
    ]
  },
  {
    slug: 'alrehab-cleaning-sanitizing',
    providerId: 'BR-PROV-ALR-001',
    nameAr: 'الرحاب للتنظيف والتعقيم',
    nameEn: 'Al Rehab Cleaning & Sanitizing',
    descriptionAr: 'مزود متخصص في تنظيف وتعقيم الكنب والسجاد والمجالس والمراتب بالبخار، ويخدم مدينة أبوظبي والعين ودبي وفق نطاق التغطية المعتمد.',
    descriptionEn: 'A specialist provider for steam cleaning and sanitizing sofas, carpets, majlis seating and mattresses, serving Abu Dhabi City, Al Ain and Dubai within its approved coverage.',
    whatsapp: '+971547761290',
    emirate: 'abu-dhabi',
    city: 'abu-dhabi-city',
    categorySlugs: ['cleaning-services'],
    verified: true,
    logo: '/images/providers/alrehab/logo.webp',
    cover: '/images/providers/alrehab/profile-cover.webp',
    locations: [
      { emirate: 'abu-dhabi', city: 'al-ain', coverageType: 'city', isPrimary: true, cityAr: 'العين', cityEn: 'Al Ain' },
      { emirate: 'abu-dhabi', city: 'abu-dhabi-city', coverageType: 'city', cityAr: 'مدينة أبوظبي', cityEn: 'Abu Dhabi City' },
      { emirate: 'dubai', city: 'dubai-city', coverageType: 'city', cityAr: 'دبي', cityEn: 'Dubai' },
    ],
    directoryServices: [
      { cardId: 'BR-SRV-ALR-001', slug: 'steam-sofa-cleaning', categorySlug: 'cleaning-services', titleAr: 'تنظيف الكنب بالبخار', titleEn: 'Steam Sofa Cleaning', image: '/images/providers/alrehab/service-sofa.webp' },
      { cardId: 'BR-SRV-ALR-002', slug: 'carpet-rug-cleaning', categorySlug: 'cleaning-services', titleAr: 'تنظيف السجاد والموكيت', titleEn: 'Carpet & Rug Cleaning', image: '/images/providers/alrehab/service-carpet.webp' },
      { cardId: 'BR-SRV-ALR-003', slug: 'arabic-majlis-cleaning', categorySlug: 'cleaning-services', titleAr: 'تنظيف المجالس العربية', titleEn: 'Arabic Majlis Cleaning', image: '/images/providers/alrehab/service-majlis.webp' },
      { cardId: 'BR-SRV-ALR-004', slug: 'mattress-cleaning-sanitizing', categorySlug: 'cleaning-services', titleAr: 'تنظيف وتعقيم المراتب', titleEn: 'Mattress Cleaning & Sanitizing', image: '/images/providers/alrehab/service-mattress.webp' },
    ],
  }
];

// Publishing is controlled by the provider record; keep the discovery list aligned
// with the providers activated in Supabase.
const hiddenFromDiscovery = new Set([]);
export const directoryProviders = [arklineProvider, ...providers].filter((provider) => !hiddenFromDiscovery.has(provider.slug));

export function getProvidersByCategory(categorySlug) {
  return directoryProviders.filter((provider) => provider.categorySlugs?.includes(categorySlug));
}

export function getProvidersByAreaAndCategory(emirateSlug, areaSlug, categorySlug) {
  return directoryProviders.filter((provider) => {
    const matchesEmirate = provider.emirate === emirateSlug;
    const matchesArea = provider.city === areaSlug || provider.area === areaSlug || provider.serviceAreas?.includes(areaSlug);
    const matchesCategory = provider.categorySlugs?.includes(categorySlug);
    return matchesEmirate && matchesArea && matchesCategory;
  });
}

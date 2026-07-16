// Reference provider template. Add editable bilingual entities here and reuse their stable IDs.
export const arkleenTemplate = {
  schemaVersion: 1,
  id: 'BR-PROV-ARK-001',
  slug: 'arkleen',
  legacySlugs: ['arkline'],
  profileId: '779148a4-865e-4d1b-bbde-43c67ea98a62',
  identity: {
    name: { ar: 'أركلين لأعمال النجارة والتصميم الداخلي', en: 'ARKLEEN Carpentry & Interior Design' },
    shortName: { ar: 'أركلين', en: 'ARKLEEN' },
    providerType: { ar: 'ورشة نجارة وتصميم داخلي', en: 'Carpentry & Interior Design Workshop' },
    description: { ar: 'ورشة نجارة وتصميم داخلي في العين متخصصة في المطابخ والخزائن والأبواب والكسوات والأثاث المصنّع حسب المقاس.', en: 'A carpentry and interior design workshop in Al Ain specialising in made-to-measure kitchens, wardrobes, doors, cladding and furniture.' },
    foundedYear: 2015,
    verified: true,
  },
  location: {
    emirate: { slug: 'abu-dhabi', ar: 'أبوظبي', en: 'Abu Dhabi' },
    city: { slug: 'al-ain', ar: 'العين', en: 'Al Ain' },
    area: { slug: 'mazid-company-camp', ar: 'مزيد - معسكر الشركات', en: 'Mazid Company Camp' },
    coverage: ['al-ain', 'abu-dhabi'],
  },
  contact: {
    phone: '+971567797828', whatsapp: '+971567797828', website: 'https://www.arkleen.ae',
    map: 'https://www.google.com/maps/search/?api=1&query=ARKLEEN+Mazid+Company+Camp+Al+Ain',
    social: { instagram: null, facebook: null, tiktok: null, linkedin: null, youtube: null },
  },
  media: {
    logo: '/images/providers/arkleen-logo.png',
    cover: '/images/providers/arkleen-premium/profile-cover.webp',
    gallery: ['/images/providers/arkleen-premium/profile-cover.webp', '/images/providers/arkleen-premium/service-custom-kitchens.webp', '/images/providers/arkleen-premium/service-custom-wardrobes.webp', '/images/providers/arkleen-premium/service-wooden-doors-decor.webp', '/images/providers/arkleen-premium/service-interior-fitout.webp'],
  },
  services: [
    { id: 'BR-SRV-ARK-001', slug: 'custom-wooden-kitchens', title: { ar: 'مطابخ خشبية حسب الطلب', en: 'Custom Wooden Kitchens' }, summary: { ar: 'تصميم وتصنيع وتركيب حسب مساحة الموقع والخامة والتشطيب المطلوب.', en: 'Design, fabrication and installation tailored to the site, material and finish.' }, image: '/images/providers/arkleen-premium/service-custom-kitchens.webp' },
    { id: 'BR-SRV-ARK-002', slug: 'custom-wardrobes', title: { ar: 'خزائن ودواليب حسب المقاس', en: 'Made-to-measure Wardrobes' }, summary: { ar: 'حلول تخزين بأبواب وتقسيمات وتشطيبات قابلة للتخصيص.', en: 'Custom storage, doors, layouts and finishes.' }, image: '/images/providers/arkleen-premium/service-custom-wardrobes.webp' },
    { id: 'BR-SRV-ARK-003', slug: 'wooden-doors-and-decor', title: { ar: 'أبواب وديكورات خشبية', en: 'Wooden Doors & Decorative Woodwork' }, summary: { ar: 'أبواب وكسوات وديكورات مصنّعة وفق المقاسات والتصميم.', en: 'Doors, cladding and decorative woodwork made to specification.' }, image: '/images/providers/arkleen-premium/service-wooden-doors-decor.webp' },
    { id: 'BR-SRV-ARK-004', slug: 'interior-design-fitout', title: { ar: 'تصميم داخلي وتشطيبات', en: 'Interior Design & Fit-out' }, summary: { ar: 'تنسيق التصميم والأعمال الخشبية والتشطيبات الداخلية.', en: 'Coordinated interior design, joinery and fit-out.' }, image: '/images/providers/arkleen-premium/service-interior-fitout.webp' },
  ],
  products: [
    { id: 'BR-PRD-ARK-001', slug: 'custom-wooden-kitchen', title: { ar: 'مطبخ خشبي حسب الطلب', en: 'Custom Wooden Kitchen' }, summary: { ar: 'مطبخ قابل لتخصيص المقاسات والخامة واللون والتقسيمات.', en: 'A kitchen configurable by dimensions, material, colour and layout.' }, image: '/images/providers/arkleen-premium/product-custom-kitchen.webp', gallery: ['/images/providers/arkleen-premium/product-custom-kitchen.webp', '/images/providers/arkleen-premium/product-custom-kitchen-detail.webp', '/images/providers/arkleen-premium/product-custom-kitchen-storage.webp'] },
    { id: 'BR-PRD-ARK-002', slug: 'custom-wooden-wardrobe', title: { ar: 'خزانة خشبية حسب المقاس', en: 'Custom Wooden Wardrobe' }, summary: { ar: 'خزانة مصنّعة حسب المساحة وخيارات الأبواب والتقسيم.', en: 'Made-to-measure wardrobe with configurable doors and layout.' }, image: '/images/providers/arkleen-premium/product-custom-wardrobe.webp', gallery: ['/images/providers/arkleen-premium/product-custom-wardrobe.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp'] },
    { id: 'BR-PRD-ARK-003', slug: 'custom-wooden-door', title: { ar: 'باب خشبي حسب الطلب', en: 'Custom Wooden Door' }, summary: { ar: 'باب وفق المقاس والتصميم ونوع الخشب والتشطيب.', en: 'A wooden door tailored by size, design, timber and finish.' }, image: '/images/providers/arkleen-premium/product-custom-door.webp', gallery: ['/images/providers/arkleen-premium/product-custom-door.webp', '/images/providers/arkleen-premium/product-custom-door-detail.webp', '/images/providers/arkleen-premium/product-custom-door-opposite.webp'] },
  ],
};

export function localizeArkleen(locale = 'ar') {
  const language = locale === 'en' ? 'en' : 'ar';
  const pick = (value) => value?.[language] || value?.ar || '';
  return { ...arkleenTemplate, locale: language, name: pick(arkleenTemplate.identity.name), shortName: pick(arkleenTemplate.identity.shortName), providerType: pick(arkleenTemplate.identity.providerType), description: pick(arkleenTemplate.identity.description), services: arkleenTemplate.services.map((item) => ({ ...item, titleText: pick(item.title), summaryText: pick(item.summary) })), products: arkleenTemplate.products.map((item) => ({ ...item, titleText: pick(item.title), summaryText: pick(item.summary) })) };
}

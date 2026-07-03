export const providers = [
  {
    slug: 'arkleen-carpentry-interior-design',
    nameAr: 'أركلين لأعمال النجارة والتصميم الداخلي',
    nameEn: 'Arkleen Carpentry & Interior Design',
    phone: '+971 56 779 7828',
    whatsapp: '+971567797828',
    city: 'al-ain',
    area: 'mazid-company-camp',
    emirate: 'abu-dhabi',
    accountType: 'factory-workshop',
    mainSpecialty: 'carpentry-workshop',
    categorySlugs: ['carpentry', 'interior-design', 'furniture-decor', 'finishing-works'],
    providerTypeAr: 'ورشة نجارة وتصميم داخلي',
    verified: true,
    logo: '/images/providers/arkleen-logo.png',
    cover: '/images/providers/arkleen-cover.jpg',
    descriptionAr: 'أركلين هي ورشة متخصصة في أعمال النجارة والتصميم الداخلي في مدينة العين، نقدم حلولاً متكاملة لتفصيل الأثاث والمطابخ والديكورات الخشبية بأعلى معايير الجودة.',
    services: [
      'تفصيل مطابخ',
      'خزائن',
      'أبواب',
      'أثاث حسب الطلب',
      'تصميم داخلي',
      'ديكورات خشبية',
      'بديل خشب',
      'تصنيع وتركيب',
      'صيانة أثاث'
    ],
    serviceAreas: ['al-ain', 'abu-dhabi'],
    gallery: [],
    projects: [],
    faq: [
      {
        question: 'ما هي مدة تنفيذ تفصيل المطبخ؟',
        answer: 'تتراوح مدة التنفيذ عادة بين 3 إلى 6 أسابيع حسب التصميم والمواد المختارة.'
      },
      {
        question: 'هل توفرون ضماناً على الأعمال الخشبية؟',
        answer: 'نعم، نوفر ضماناً يصل إلى 5 سنوات على جودة التصنيع والتركيب.'
      }
    ]
  },
  {
    slug: 'al-hoot-marble-granite-factory',
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
    verified: true,
    logo: '/images/providers/al-hoot-logo.png',
    cover: '/images/providers/al-hoot-cover.jpg',
    descriptionAr: 'مصنع الحوت للرخام والجرانيت متخصص في توريد وتركيب وتصنيع كافة أنواع الرخام الطبيعي والجرانيت والكوارتز للمطابخ والواجهات والأرضيات في مدينة العين وجميع أنحاء الإمارات.',
    services: [
      'رخام طبيعي',
      'جرانيت',
      'كوارتز',
      'حجر صناعي',
      'تصنيع حسب الطلب',
      'توريد',
      'تركيب',
      'مطابخ',
      'مغاسل',
      'واجهات',
      'أرضيات',
      'سلالم'
    ],
    serviceAreas: ['al-ain', 'abu-dhabi'],
    gallery: [],
    projects: [],
    faq: [
      {
        question: 'هل يتوفر لديكم رخام طبيعي إيطالي؟',
        answer: 'نعم، نوفر تشكيلة واسعة من الرخام الطبيعي الإيطالي واليوناني والتركي بأفضل الأسعار.'
      },
      {
        question: 'هل تقومون بتركيب واجهات المباني؟',
        answer: 'نعم، لدينا فريق متخصص في تركيب واجهات الرخام والجرانيت الميكانيكي والعادي.'
      }
    ]
  }
];

export function getProvidersByCategory(categorySlug) {
  return providers.filter((provider) => provider.categorySlugs?.includes(categorySlug));
}

export function getProvidersByAreaAndCategory(emirateSlug, areaSlug, categorySlug) {
  return providers.filter((provider) => {
    const matchesEmirate = provider.emirate === emirateSlug;
    const matchesArea = provider.city === areaSlug || provider.area === areaSlug || provider.serviceAreas?.includes(areaSlug);
    const matchesCategory = provider.categorySlugs?.includes(categorySlug);
    return matchesEmirate && matchesArea && matchesCategory;
  });
}

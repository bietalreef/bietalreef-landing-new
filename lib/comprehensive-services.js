/**
 * Comprehensive Services Database for Biet Alreef Platform
 * 9 Main Service Categories with 100+ Sub-Services
 */

export const comprehensiveServices = [
  {
    id: 'construction',
    name: 'مقاولات البناء',
    nameEn: 'Construction Services',
    description: 'خدمات بناء متكاملة من الأساس إلى التشطيب',
    descriptionEn: 'Complete construction services from foundation to finishing',
    icon: '🏗️',
    color: 'bg-blue-500',
    rating: 4.9,
    reviews: 256,
    basePrice: 0,
    subServices: [
      {
        id: 'construction-1',
        name: 'أعمال إنشائية',
        description: 'دراسة وتخطيط وتنفيذ أعمال البناء الأساسية',
        icon: '🏢'
      },
      {
        id: 'construction-2',
        name: 'العزل',
        description: 'عزل حراري وصوتي وعزل رطوبة',
        icon: '🛡️'
      },
      {
        id: 'construction-3',
        name: 'الأعمال الكهرومكانيكية',
        description: 'تمديدات كهربائية وصحية',
        icon: '⚡'
      },
      {
        id: 'construction-4',
        name: 'التشطيبات',
        description: 'تشطيبات داخلية وخارجية فاخرة',
        icon: '✨'
      },
      {
        id: 'construction-5',
        name: 'الإشراف الهندسي',
        description: 'متابعة ومراقبة الجودة والالتزام بالمواعيد',
        icon: '👷'
      }
    ]
  },

  {
    id: 'interior-design',
    name: 'التصميم الداخلي',
    nameEn: 'Interior Design',
    description: 'تصاميم داخلية احترافية وحديثة',
    descriptionEn: 'Professional and modern interior designs',
    icon: '🛋️',
    color: 'bg-purple-500',
    rating: 4.8,
    reviews: 189,
    basePrice: 500,
    subServices: [
      {
        id: 'design-1',
        name: 'تصميم معماري',
        description: 'تصاميم معمارية واستشارات هندسية',
        icon: '🏛️'
      },
      {
        id: 'design-2',
        name: 'تصميم إنشائي',
        description: 'تصاميم إنشائية وحسابات هندسية',
        icon: '📐'
      },
      {
        id: 'design-3',
        name: 'دراسات جدوى',
        description: 'دراسات جدوى اقتصادية وتقنية',
        icon: '📊'
      },
      {
        id: 'design-4',
        name: 'مخططات تنفيذية',
        description: 'رسومات معمارية وإنشائية تفصيلية',
        icon: '📋'
      },
      {
        id: 'design-5',
        name: 'اعتماد المخططات',
        description: 'إيداع المخططات البنائية',
        icon: '✅'
      },
      {
        id: 'design-6',
        name: 'تقارير فنية',
        description: 'تقارير معمارية وهندسية متخصصة',
        icon: '📄'
      }
    ]
  },

  {
    id: 'project-management',
    name: 'إدارة المشاريع',
    nameEn: 'Project Management',
    description: 'إدارة متكاملة لمشاريعك من البداية للنهاية',
    descriptionEn: 'Comprehensive project management from start to finish',
    icon: '📊',
    color: 'bg-green-500',
    rating: 4.7,
    reviews: 142,
    basePrice: 1000,
    subServices: [
      {
        id: 'pm-1',
        name: 'إدارة المشاريع',
        description: 'تخطيط وإدارة شاملة للمشاريع',
        icon: '📅'
      },
      {
        id: 'pm-2',
        name: 'متابعة دورية',
        description: 'زيارات دورية ومتابعة منتظمة',
        icon: '👁️'
      },
      {
        id: 'pm-3',
        name: 'تقارير دورية',
        description: 'زيارات دورية وتقارير شاملة',
        icon: '📈'
      },
      {
        id: 'pm-4',
        name: 'إدارة الميزانية',
        description: 'تحديد وإدارة ميزانية المشروع',
        icon: '💰'
      },
      {
        id: 'pm-5',
        name: 'جدولة المشروع',
        description: 'تخطيط زمني دقيق للمشروع',
        icon: '⏰'
      }
    ]
  },

  {
    id: 'engineering-consultation',
    name: 'الاستشارات الهندسية',
    nameEn: 'Engineering Consultation',
    description: 'استشارات هندسية متخصصة من مهندسين معتمدين',
    descriptionEn: 'Specialized engineering consultations from certified engineers',
    icon: '📐',
    color: 'bg-orange-500',
    rating: 4.9,
    reviews: 203,
    basePrice: 2000,
    subServices: [
      {
        id: 'eng-1',
        name: 'استشارات فنية',
        description: 'حلول هندسية متخصصة',
        icon: '🔧'
      },
      {
        id: 'eng-2',
        name: 'فحص المباني',
        description: 'فحص وتقييم حالة المباني',
        icon: '🔍'
      },
      {
        id: 'eng-3',
        name: 'استشارات بيئية',
        description: 'استشارات بيئية واستدامة',
        icon: '🌱'
      },
      {
        id: 'eng-4',
        name: 'تقييم الأضرار',
        description: 'تقييم وتقدير الأضرار الهندسية',
        icon: '⚠️'
      },
      {
        id: 'eng-5',
        name: 'الخبرة الفنية',
        description: 'خبرات فنية متخصصة',
        icon: '👨‍🔬'
      }
    ]
  },

  {
    id: 'maintenance',
    name: 'شركات الصيانة',
    nameEn: 'Maintenance Services',
    description: 'خدمات صيانة شاملة لجميع أنواع المباني',
    descriptionEn: 'Comprehensive maintenance services for all building types',
    icon: '🔧',
    color: 'bg-red-500',
    rating: 4.6,
    reviews: 178,
    basePrice: 300,
    subServices: [
      {
        id: 'maint-1',
        name: 'صيانة السباكة',
        description: 'إصلاح تمديدات المياه والصرف',
        icon: '🚰'
      },
      {
        id: 'maint-2',
        name: 'صيانة المكيفات',
        description: 'صيانة وتنظيف أنظمة التكييف',
        icon: '❄️'
      },
      {
        id: 'maint-3',
        name: 'صيانة الكهرباء',
        description: 'إصلاح وصيانة التمديدات الكهربائية',
        icon: '⚡'
      },
      {
        id: 'maint-4',
        name: 'صيانة عامة',
        description: 'صيانة شاملة لجميع أعمال المنزل',
        icon: '🛠️'
      },
      {
        id: 'maint-5',
        name: 'خدمة 24/7',
        description: 'خدمة طوارئ على مدار الساعة',
        icon: '📞'
      },
      {
        id: 'maint-6',
        name: 'فحص شامل',
        description: 'فحص شامل وتشخيص المشاكل',
        icon: '🔎'
      }
    ]
  },

  {
    id: 'equipment-rental',
    name: 'تأجير المعدات',
    nameEn: 'Equipment Rental',
    description: 'تأجير معدات ثقيلة وأدوات بناء',
    descriptionEn: 'Heavy equipment and construction tools rental',
    icon: '🏗️',
    color: 'bg-yellow-500',
    rating: 4.7,
    reviews: 165,
    basePrice: 500,
    subServices: [
      {
        id: 'rent-1',
        name: 'معدات ثقيلة',
        description: 'تأجير جرافات وحفارات وخلاطات',
        icon: '🚜'
      },
      {
        id: 'rent-2',
        name: 'معدات لحام',
        description: 'أجهزة لحام واللحام الكهربائي',
        icon: '⚙️'
      },
      {
        id: 'rent-3',
        name: 'أدوات كهربائية',
        description: 'أدوات كهربائية متنوعة',
        icon: '🔌'
      },
      {
        id: 'rent-4',
        name: 'معدات إضاءة',
        description: 'أضاءة مواقع وأجهزة إضاءة',
        icon: '💡'
      },
      {
        id: 'rent-5',
        name: 'توصيل مجاني',
        description: 'خدمة توصيل وتركيب مجانية',
        icon: '🚚'
      },
      {
        id: 'rent-6',
        name: 'إيجار يومي/أسبوعي',
        description: 'أسعار مرنة يومية وأسبوعية',
        icon: '📅'
      }
    ]
  },

  {
    id: 'cleaning-services',
    name: 'خدمات التنظيف',
    nameEn: 'Cleaning Services',
    description: 'خدمات تنظيف احترافية للمنازل والمكاتب',
    descriptionEn: 'Professional cleaning services for homes and offices',
    icon: '🧹',
    color: 'bg-cyan-500',
    rating: 4.8,
    reviews: 142,
    basePrice: 1000,
    subServices: [
      {
        id: 'clean-1',
        name: 'تنظيف المنازل',
        description: 'تنظيف شامل لجميع الغرف',
        icon: '🏠'
      },
      {
        id: 'clean-2',
        name: 'تنظيف الفلل',
        description: 'تنظيف داخلي وخارجي للفلل',
        icon: '🏡'
      },
      {
        id: 'clean-3',
        name: 'تنظيف المكاتب',
        description: 'تنظيف يومي للمكاتب والشركات',
        icon: '🏢'
      },
      {
        id: 'clean-4',
        name: 'تنظيف المطاعم',
        description: 'تنظيف متخصص للمطاعم والمقاهي',
        icon: '🍽️'
      },
      {
        id: 'clean-5',
        name: 'تنظيف الحمامات',
        description: 'تنظيف متخصص للحمامات والمراحيض',
        icon: '🚿'
      },
      {
        id: 'clean-6',
        name: 'خدمة دورية',
        description: 'عقود صيانة دورية شاملة',
        icon: '📅'
      },
      {
        id: 'clean-7',
        name: 'ضمان النظافة',
        description: 'ضمان على جودة النظافة',
        icon: '✅'
      },
      {
        id: 'clean-8',
        name: 'خدمة 24/7',
        description: 'خدمة متاحة على مدار الساعة',
        icon: '⏰'
      }
    ]
  },

  {
    id: 'furniture-decor',
    name: 'الأثاث والديكور',
    nameEn: 'Furniture & Decor',
    description: 'أثاث وديكور عصري وفاخر',
    descriptionEn: 'Modern and luxury furniture and decor',
    icon: '🛋️',
    color: 'bg-pink-500',
    rating: 4.7,
    reviews: 156,
    basePrice: 500,
    subServices: [
      {
        id: 'furn-1',
        name: 'صالونات',
        description: 'صالونات حديثة وكلاسيكية',
        icon: '🛋️'
      },
      {
        id: 'furn-2',
        name: 'أثاث مكتبي',
        description: 'أثاث مكتبي ووسائل عمل',
        icon: '🪑'
      },
      {
        id: 'furn-3',
        name: 'لوحات فنية',
        description: 'لوحات فنية وديكورات جدارية',
        icon: '🖼️'
      },
      {
        id: 'furn-4',
        name: 'تحف وتنتيكات',
        description: 'تحف نادرة وتنتيكات قديمة',
        icon: '🏺'
      },
      {
        id: 'furn-5',
        name: 'ستائر',
        description: 'ستائر وأقمشة فاخرة',
        icon: '🪟'
      },
      {
        id: 'furn-6',
        name: 'سجاد',
        description: 'سجاد وموكيت متنوع',
        icon: '🧵'
      },
      {
        id: 'furn-7',
        name: 'تصميم داخلي',
        description: 'استشارات وتصميم داخلي',
        icon: '✨'
      }
    ]
  },

  {
    id: 'materials-supplies',
    name: 'مواد البناء والتشطيب',
    nameEn: 'Building Materials & Supplies',
    description: 'مواد بناء وتشطيب عالية الجودة',
    descriptionEn: 'High-quality building and finishing materials',
    icon: '🏗️',
    color: 'bg-amber-600',
    rating: 4.8,
    reviews: 198,
    basePrice: 0,
    subServices: [
      {
        id: 'mat-1',
        name: 'أسمنت',
        description: 'أسمنت برتلندي بجودة عالية',
        icon: '🪨'
      },
      {
        id: 'mat-2',
        name: 'بلوك',
        description: 'بلوك بناء وطوب',
        icon: '🧱'
      },
      {
        id: 'mat-3',
        name: 'لاط وسيراميك',
        description: 'لاط وسيراميك وبلاط',
        icon: '🪟'
      },
      {
        id: 'mat-4',
        name: 'دهانات',
        description: 'دهانات وورنيش عالية الجودة',
        icon: '🎨'
      },
      {
        id: 'mat-5',
        name: 'مواد صحية',
        description: 'مواد صحية وتمديدات',
        icon: '🚰'
      },
      {
        id: 'mat-6',
        name: 'مواد كهربائية',
        description: 'أسلاك وقواطع وأجهزة كهربائية',
        icon: '⚡'
      },
      {
        id: 'mat-7',
        name: 'مواد غرب',
        description: 'مواد غرب وحديد وفولاذ',
        icon: '🔩'
      },
      {
        id: 'mat-8',
        name: 'توصيل مجاني',
        description: 'خدمة توصيل مجانية',
        icon: '🚚'
      }
    ]
  },

  {
    id: 'specialized-services',
    name: 'الخدمات المتخصصة',
    nameEn: 'Specialized Services',
    description: 'خدمات متخصصة وفنية متقدمة',
    descriptionEn: 'Specialized and advanced technical services',
    icon: '⚙️',
    color: 'bg-indigo-500',
    rating: 4.8,
    reviews: 167,
    basePrice: 500,
    subServices: [
      {
        id: 'spec-1',
        name: 'أعمال حدادة',
        description: 'أعمال حدادة وتصنيع معادن',
        icon: '🔨'
      },
      {
        id: 'spec-2',
        name: 'أعمال نجارة',
        description: 'أعمال نجارة وتصنيع أثاث',
        icon: '🪵'
      },
      {
        id: 'spec-3',
        name: 'أعمال كهربائية',
        description: 'تمديدات كهربائية وتركيبات',
        icon: '⚡'
      },
      {
        id: 'spec-4',
        name: 'أعمال سباكة',
        description: 'تمديدات مياه وصرف صحي',
        icon: '🚰'
      },
      {
        id: 'spec-5',
        name: 'أعمال تكييف',
        description: 'تركيب وصيانة أنظمة التكييف',
        icon: '❄️'
      },
      {
        id: 'spec-6',
        name: 'أعمال زجاج',
        description: 'أعمال زجاج وألومنيوم',
        icon: '🪟'
      },
      {
        id: 'spec-7',
        name: 'أعمال دهان',
        description: 'دهان وتشطيبات احترافية',
        icon: '🎨'
      },
      {
        id: 'spec-8',
        name: 'أعمال رخام',
        description: 'قطع وتركيب رخام وجرانيت',
        icon: '🪨'
      }
    ]
  }
];

/**
 * Helper function to get service by ID
 */
export const getServiceById = (serviceId) => {
  return comprehensiveServices.find(service => service.id === serviceId);
};

/**
 * Helper function to get all sub-services for a main service
 */
export const getSubServices = (serviceId) => {
  const service = getServiceById(serviceId);
  return service ? service.subServices : [];
};

/**
 * Helper function to search services
 */
export const searchServices = (query) => {
  const lowerQuery = query.toLowerCase();
  return comprehensiveServices.filter(service => 
    service.name.includes(query) || 
    service.nameEn.toLowerCase().includes(lowerQuery) ||
    service.description.includes(query) ||
    service.subServices.some(sub => 
      sub.name.includes(query) || 
      sub.description.includes(query)
    )
  );
};

export default comprehensiveServices;

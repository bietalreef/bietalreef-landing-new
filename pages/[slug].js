import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const RESERVED_ARABIC_ROUTES = new Set(['cookies']);

const PAGES = {
  'why-biet-alreef': {
    badge: 'لماذا بدأنا؟',
    title: 'لماذا بيت الريف',
    desc: 'لأن الوصول إلى مزود الخدمة أو المنتج المناسب في قطاع البناء لا يجب أن يعتمد على بحث عشوائي أو معلومة ناقصة أو سعر واحد بلا مقارنة.',
    intent: 'وُلدت بيت الريف من خبرة عملية داخل سوق المقاولات، حيث يواجه العميل صعوبة في تحديد الجهة المناسبة، بينما يمتلك كثير من الشركات والموردين والورش خبرة حقيقية لا تظهر بصورة واضحة. لذلك نبني مسارًا يجمع المكان والتخصص والخدمة والمنتج والطلب في منظومة واحدة.',
    points: [
      'ننظم السوق حسب الإمارة والمنطقة والنشاط والتخصص والخدمة بدل الاعتماد على قوائم عامة غير دقيقة.',
      'نمنح العميل أكثر من طريق: البحث المباشر، التواصل مع المزود، طلب عرض سعر، أو الاستعانة بوياك لتوضيح الاحتياج.',
      'عندما لا يصل العميل إلى عرض مناسب، يستطيع طلب مناقصة داخلية تديرها بيت الريف للبحث عن خيارات أفضل.'
    ],
    steps: ['مشكلة حقيقية في السوق', 'بيانات وخدمات منظمة', 'خيارات أوسع للعميل'],
    cta: 'اكتشف طريقة العمل',
    ctaHref: '/how-it-works',
    related: [
      { href: '/about', label: 'عن بيت الريف' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/platform', label: 'تعرف على المنصة' }
    ],
    faqs: [
      ['ما الذي يميز بيت الريف عن دليل الشركات العادي؟', 'بيت الريف لا يكتفي بعرض أسماء وأرقام؛ بل ينظم المزودين حسب النشاط والتخصص والخدمات والمنتجات ومناطق العمل، ويربط ذلك بطلب العميل ومسارات عرض السعر.'],
      ['لماذا توجد خدمة مناقصة داخلية؟', 'لمنح العميل مسارًا إضافيًا عندما لا يحصل على سعر أو حل مناسب من الخيارات المتاحة، فتراجع بيت الريف الطلب وتبحث عن عروض من جهات مناسبة.'],
      ['هل تضمن بيت الريف أقل سعر؟', 'لا نَعِد بأقل سعر مطلق، بل نبحث عن أفضل توافق بين السعر والمواصفات والجودة والموقع والقدرة على التنفيذ.']
    ]
  },
  'how-it-works': {
    badge: 'رحلة واضحة من الاحتياج إلى العرض',
    title: 'كيف تعمل منصة بيت الريف',
    desc: 'ابدأ بتحديد احتياجك وموقعك، ثم ابحث أو تواصل أو اطلب عرض سعر. وإذا لم تجد عرضًا مناسبًا، تستطيع رفع الطلب إلى بيت الريف لإنشاء مناقصة داخلية مُدارة.',
    intent: 'تقدم بيت الريف مسارين مترابطين: مسار مباشر للوصول إلى مزود أو منتج مناسب، ومسار مناقصة داخلية عند الحاجة إلى توسيع البحث وجمع عروض إضافية. وياك يساعد في تنظيم وصف الطلب وتحديد النشاط والخدمة والموقع والمعلومات المطلوبة.',
    points: [
      'يمكنك البحث حسب الإمارة والمنطقة والخدمة، ثم التواصل مباشرة مع مزود الخدمة أو إرسال طلب عرض سعر.',
      'يساعد وياك على فهم الطلب وتحويله إلى وصف منظم يسهل توجيهه إلى المسار الصحيح.',
      'إذا لم يكن السعر أو الحل مناسبًا، تراجع بيت الريف الطلب وتنشئ مناقصة داخلية لخدمة أو منتج أو مادة مطلوبة.'
    ],
    steps: ['حدد الاحتياج والموقع', 'ابحث أو اطلب عرض سعر', 'راجع الخيارات المستلمة', 'اطلب مناقصة داخلية عند الحاجة'],
    cta: 'ابدأ طلبك مع وياك',
    ctaHref: '/weyaak',
    related: [
      { href: '/uae', label: 'دليل الإمارات' },
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/platform', label: 'المنصة' }
    ],
    faqs: [
      ['متى أطلب عرض سعر ومتى أطلب مناقصة؟', 'ابدأ بطلب عرض سعر عندما تكون الخدمة واضحة ويمكن توجيهها إلى مزود مناسب. تُطلب المناقصة الداخلية عندما لا تحصل على سعر أو خيار مناسب، أو عندما يحتاج الطلب إلى مقارنة أوسع.'],
      ['من ينشئ المناقصة الداخلية؟', 'يتقدم العميل بالطلب إلى منصة بيت الريف، ثم تراجع بيت الريف التفاصيل وتحدد النطاق وتُنشئ المناقصة وتدعو الجهات المناسبة لتقديم عروضها.'],
      ['هل المناقصة عامة ومفتوحة للجميع؟', 'لا. هي مناقصة داخلية مُدارة، وتُرسل إلى مزودين أو موردين أو مصانع يتوافق نشاطهم وموقعهم وقدرتهم مع الطلب.'],
      ['كيف يتم اختيار أفضل عرض؟', 'تُقارن العروض وفق السعر والمواصفات وجودة المواد أو الخدمة وموقع التنفيذ والمدة والقدرة على الالتزام، ثم تُعرض الخيارات المناسبة على العميل لاتخاذ القرار.']
    ]
  },
  pricing: {
    badge: 'سياسة التسعير',
    title: 'الأسعار',
    desc: 'لا يعرض بيت الريف أسعارًا عشوائية أو غير معتمدة. السعر الصحيح يعتمد على المكان، المقاسات، المواد، نطاق العمل، وتفاصيل التنفيذ.',
    intent: 'توضح هذه الصفحة لماذا يختلف سعر أعمال البناء والصيانة والمنتجات من طلب إلى آخر، ولماذا يكون عرض السعر المبني على التفاصيل أكثر دقة من رقم عام.',
    points: [
      'السعر يختلف حسب المدينة ونوع الخدمة وتفاصيل المشروع.',
      'لا ننشر أسعارًا غير مؤكدة حتى لا نضلل العميل أو المزود.',
      'أفضل طريقة للحصول على رقم واقعي هي إرسال تفاصيل المشروع وطلب عرض سعر.'
    ],
    steps: ['أرسل وصف المشروع', 'حدد الموقع والمقاسات', 'استلم التوجيه أو العروض المناسبة'],
    cta: 'اطلب عرض سعر',
    ctaHref: '/contact',
    related: [
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/how-it-works', label: 'كيف يعمل' }
    ],
    faqs: [
      ['لماذا لا توجد أسعار ثابتة؟', 'لأن أعمال البناء والصيانة تتغير حسب الموقع، الكمية، جودة المواد، صعوبة التنفيذ، ووقت العمل.'],
      ['كيف أحصل على تقدير سعر؟', 'أرسل تفاصيل المشروع والصور أو المقاسات المتاحة وموقع التنفيذ ليتم توجيه الطلب إلى المسار الأنسب.'],
      ['ماذا أفعل إذا لم يناسبني العرض؟', 'يمكنك طلب مراجعة مسار الطلب والتقدم إلى بيت الريف لإنشاء مناقصة داخلية والبحث عن عروض إضافية مناسبة.']
    ]
  },
  partners: {
    badge: 'منظومة الشركاء',
    title: 'كن شريكًا في بيت الريف',
    desc: 'تنضم الشركات والموردون والمصانع والورش والحرفيون إلى منظومة رقمية تعرض خبراتهم وتربطهم بالعملاء والطلبات المتوافقة مع نشاطهم.',
    intent: 'الشراكة في بيت الريف تبدأ ببيانات نشاط واضحة ومراجعة قبل النشر. وبعد اعتماد الملف، يظهر النشاط في المسارات المناسبة حسب التخصص والخدمة والمنتج ومناطق العمل، ويمكن دعوته إلى طلبات أو مناقصات داخلية تتوافق مع قدرته.',
    points: [
      'ملف رقمي منظم يعرض النشاط والخدمات والمنتجات والمشاريع ومناطق التغطية.',
      'ظهور داخل دليل الإمارات وصفحات الخدمات والمنتجات وفق البيانات المعتمدة.',
      'فرصة لتلقي طلبات عروض أو دعوات لمناقصات داخلية متوافقة مع التخصص والموقع.'
    ],
    steps: ['سجل بيانات النشاط', 'تتم المراجعة والاعتماد', 'ابدأ الظهور واستقبال الفرص المناسبة'],
    cta: 'انضم كمزود خدمة',
    ctaHref: '/providers/register',
    related: [
      { href: '/providers/register', label: 'تسجيل مزود خدمة' },
      { href: '/suppliers', label: 'الموردون' },
      { href: '/factories', label: 'المصانع والورش' },
      { href: '/platform', label: 'تعرف على المنصة' }
    ],
    faqs: [
      ['من يمكنه الانضمام كشريك؟', 'الشركات والمقاولون والموردون والمصانع والورش والحرفيون ومزودو الخدمات المرتبطون بالبناء والصيانة والتشطيبات والمواد والمنتجات.'],
      ['هل يظهر النشاط مباشرة بعد التسجيل؟', 'لا. تتم مراجعة البيانات والهوية والنشاط قبل النشر للحفاظ على جودة المنصة وثقة العملاء.'],
      ['كيف تصل المناقصات إلى الشركاء؟', 'تختار بيت الريف الجهات المناسبة وفق نوع الطلب والتخصص وموقع الخدمة أو التوريد، ثم ترسل الدعوة إلى المزودين المؤهلين لتقديم عروضهم.'],
      ['هل الدعوة إلى المناقصة مضمونة لكل مزود؟', 'لا. تعتمد الدعوة على تطابق نشاط المزود وخدماته وموقعه وبياناته المعتمدة مع متطلبات المناقصة.']
    ]
  },
  suppliers: {
    badge: 'سلاسل التوريد',
    title: 'الموردون',
    desc: 'صفحة الموردين مخصصة لتنظيم حضور موردي مواد البناء والتشطيب والمنتجات المرتبطة بالمشاريع داخل بيت الريف.',
    intent: 'يستطيع المورد تقديم بياناته وفئات منتجاته ومناطق التوريد، ليظهر ضمن مسارات المنتجات والخدمات، وليكون مؤهلًا للطلبات أو المناقصات الداخلية التي تحتاج إلى مواد أو منتجات مناسبة.',
    points: [
      'عرض المواد والمنتجات بطريقة قابلة للتصنيف والبحث.',
      'ربط المنتجات بالخدمات والمناطق ومشروعات العملاء.',
      'إتاحة المورد للطلبات والمناقصات الداخلية المتوافقة مع نطاق التوريد.'
    ],
    steps: ['أضف بيانات المورد', 'حدد فئات المنتجات', 'اربط مناطق التوريد'],
    cta: 'تواصل كمورد',
    ctaHref: '/contact',
    related: [
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/partners', label: 'كن شريكًا' },
      { href: '/factories', label: 'المصانع والورش' }
    ],
    faqs: [
      ['ما نوع الموردين المناسبين؟', 'موردو مواد البناء والتشطيب والرخام والسيراميك والإنارة والنجارة والمنتجات المرتبطة بالمشاريع.'],
      ['هل يمكن عرض المنتجات؟', 'نعم، يمكن تنظيم المنتجات وربطها بالفئات والخدمات ومناطق التوريد عند اكتمال واعتماد البيانات.'],
      ['هل يمكن للمورد المشاركة في مناقصة؟', 'نعم، عندما تكون المناقصة مرتبطة بمنتج أو مادة ويكون نطاق المورد وبياناته متوافقًا مع الطلب.']
    ]
  },
  factories: {
    badge: 'المصانع والورش',
    title: 'المصانع والورش',
    desc: 'تساعد بيت الريف المصانع والورش على تقديم إنتاجها وخدماتها ومشاريعها ضمن سياق واضح يخدم العملاء والمقاولين.',
    intent: 'هذه الصفحة للمصانع والورش التي تنتج أو تنفذ أعمالًا مرتبطة بالبناء والتشطيب والتصميم والأثاث والمواد، وتريد بناء حضور رقمي والوصول إلى طلبات متوافقة مع قدراتها.',
    points: [
      'إظهار نوع الإنتاج أو الخدمة والطاقة المتاحة بوضوح.',
      'ربط المصنع أو الورشة بمناطق الخدمة والتوريد.',
      'التأهل لطلبات المنتجات والخدمات والمناقصات الداخلية المناسبة.'
    ],
    steps: ['حدد النشاط', 'أضف المنتجات أو الأعمال', 'جهز صفحة المصنع أو الورشة'],
    cta: 'ابدأ كمصنع أو ورشة',
    ctaHref: '/providers/register',
    related: [
      { href: '/suppliers', label: 'الموردون' },
      { href: '/marketplace', label: 'المنتجات' },
      { href: '/partners', label: 'الشركاء' }
    ],
    faqs: [
      ['هل الورش الصغيرة مناسبة؟', 'نعم، إذا كان لديها نشاط واضح وأعمال قابلة للعرض ومناطق خدمة محددة.'],
      ['ما البيانات المطلوبة؟', 'اسم النشاط والتخصصات والصور والمناطق ووسائل التواصل وأي مستندات تثبت النشاط عند الحاجة.'],
      ['هل يمكن للورشة استقبال طلبات مناقصات؟', 'نعم، عندما تتوافق قدراتها وتخصصها وموقعها مع متطلبات المناقصة الداخلية.']
    ]
  },
  contact: {
    badge: 'تواصل منظم',
    title: 'تواصل معنا',
    desc: 'تواصل مع بيت الريف لطلب خدمة أو منتج، أو لطلب مناقصة داخلية، أو للانضمام كمزود، أو لمناقشة شراكة.',
    intent: 'اختر سبب التواصل وأرسل تفاصيل واضحة حتى يتم توجيه طلبك إلى المسار المناسب: استفسار، عرض سعر، مناقصة داخلية، تسجيل مزود أو شراكة.',
    points: ['حدد نوع الطلب', 'أرسل البيانات والصور المتاحة', 'تابع التوجيه المناسب'],
    steps: ['اختر سبب التواصل', 'اكتب التفاصيل', 'تابع الرد'],
    cta: 'راسلنا على واتساب',
    ctaHref: 'https://wa.me/971567856001',
    related: [
      { href: '/providers/register', label: 'انضم كمزود' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/weyaak', label: 'وياك' }
    ],
    faqs: [
      ['متى أتواصل؟', 'عند وجود طلب خدمة أو منتج أو استفسار أو رغبة في الانضمام أو شراكة محتملة أو طلب مناقصة داخلية.'],
      ['هل يجب إرسال صور؟', 'إذا كان الطلب متعلقًا بمشروع أو صيانة أو منتج مخصص، فالصور والمقاسات والمواصفات تساعد في فهم الطلب بصورة أسرع.'],
      ['كيف أطلب مناقصة داخلية؟', 'أرسل تفاصيل الطلب ووضح أنك لم تصل إلى عرض مناسب، ثم تراجع بيت الريف البيانات وتتواصل معك لاستكمال نطاق المناقصة.']
    ]
  },
  faq: {
    badge: 'الأسئلة الشائعة',
    title: 'الأسئلة الشائعة',
    desc: 'إجابات واضحة على أهم الأسئلة حول بيت الريف ودليل الإمارات ومزودي الخدمات وطلبات عروض الأسعار والمناقصات الداخلية.',
    intent: 'تساعد هذه الصفحة الزائر على فهم طرق البحث والتواصل والتسجيل، والفرق بين طلب عرض السعر والمناقصة الداخلية قبل اتخاذ الخطوة التالية.',
    points: ['فهم طريقة العمل', 'معرفة المسارات المتاحة', 'اختيار الخطوة المناسبة'],
    steps: ['اقرأ السؤال', 'راجع الإجابة', 'انتقل إلى المسار المناسب'],
    cta: 'ابدأ من الدليل',
    ctaHref: '/uae',
    related: [
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/contact', label: 'تواصل معنا' },
      { href: '/providers/register', label: 'مزود خدمة' }
    ],
    faqs: [
      ['هل بيت الريف يعمل كوسيط؟', 'تنظم بيت الريف رحلة البحث والتواصل وطلبات العروض، وتدير المناقصة الداخلية عند طلب العميل، بينما يظل اختيار العرض والتعاقد وفق الشروط المعتمدة بين الأطراف.'],
      ['هل يمكن لمزود خدمة التسجيل؟', 'نعم، يبدأ من صفحة التسجيل ويقدم بيانات النشاط والتخصصات والخدمات ومناطق العمل للمراجعة.'],
      ['ما الفرق بين عرض السعر والمناقصة؟', 'عرض السعر يُطلب من مزود أو عدد محدود من المزودين لخدمة واضحة، أما المناقصة الداخلية فتُنشئها وتديرها بيت الريف عند الحاجة إلى توسيع البحث وجمع عروض متنافسة.']
    ]
  },
  'support-policy': {
    badge: 'سياسة الدعم',
    title: 'سياسة الدعم',
    desc: 'نوضح هنا طريقة الدعم والتواصل والمتابعة داخل بيت الريف حسب نوع الطلب والمرحلة.',
    intent: 'تحدد هذه الصفحة توقعات الدعم للعميل ومزود الخدمة، وتوضح أن سرعة المتابعة تعتمد على اكتمال المعلومات وطبيعة الطلب والمسار المستخدم.',
    points: ['دعم حسب نوع الطلب', 'تواصل واضح', 'متابعة حسب الأولوية'],
    steps: ['أرسل الطلب', 'حدد التفاصيل', 'تابع القناة المناسبة'],
    cta: 'تواصل معنا',
    ctaHref: '/contact',
    related: [
      { href: '/faq', label: 'الأسئلة الشائعة' },
      { href: '/privacy', label: 'الخصوصية' },
      { href: '/providers/register', label: 'مزود خدمة' }
    ],
    faqs: [
      ['هل الدعم فوري؟', 'يعتمد على نوع الطلب والقناة المستخدمة واكتمال التفاصيل، والهدف هو تقديم متابعة منظمة ودقيقة.'],
      ['هل يتم دعم مزودي الخدمة؟', 'نعم، يتم توجيه مزود الخدمة لمسار التسجيل واستكمال البيانات المطلوبة ومراجعة حالته.'],
      ['هل تشمل المتابعة المناقصات الداخلية؟', 'نعم، تُتابع بيت الريف استكمال نطاق المناقصة ودعوة الجهات المناسبة واستلام العروض وتنظيمها للعميل.']
    ]
  },
  privacy: {
    badge: 'الخصوصية',
    title: 'سياسة الخصوصية',
    desc: 'نحترم خصوصية المستخدمين ونعمل على توضيح طريقة التعامل مع بيانات التواصل وطلبات الخدمة وعروض الأسعار.',
    intent: 'تقدم هذه الصفحة إطارًا عامًا للتعامل مع البيانات التي يرسلها العميل أو مزود الخدمة عبر الموقع وقنوات التواصل، بما في ذلك المعلومات اللازمة لتوجيه الطلب أو إدارة المناقصة الداخلية.',
    points: ['استخدام البيانات لغرض التواصل والخدمة', 'عدم نشر بيانات خاصة دون أساس مناسب', 'تطوير السياسات مع تطور المنصة'],
    steps: ['اقرأ السياسة', 'استخدم الموقع بوعي', 'تواصل عند وجود استفسار'],
    cta: 'تواصل معنا',
    ctaHref: '/contact',
    related: [
      { href: '/legal', label: 'الشروط والأحكام' },
      { href: '/cookies', label: 'ملفات الارتباط' },
      { href: '/support-policy', label: 'سياسة الدعم' }
    ],
    faqs: [
      ['ما البيانات التي قد يتم جمعها؟', 'بيانات التواصل أو تفاصيل الطلب والموقع والمقاسات والصور والمواصفات التي يرسلها المستخدم طوعًا عبر الموقع أو قنوات التواصل.'],
      ['هل تُنشر تفاصيل المناقصة للعامة؟', 'المناقصة الداخلية ليست إعلانًا عامًا؛ تُشارك المعلومات الضرورية فقط مع الجهات المدعوة وبالقدر اللازم لتقديم العرض.'],
      ['هل السياسة نهائية؟', 'قد يتم تحديثها مع تطور المنصة وقنوات التشغيل والخدمات.']
    ]
  },
  cookies: {
    badge: 'ملفات الارتباط',
    title: 'سياسة ملفات الارتباط',
    desc: 'توضح هذه الصفحة استخدام ملفات الارتباط أو أدوات القياس لتحسين تجربة المستخدم وفهم أداء الموقع.',
    intent: 'تساعد هذه الصفحة المستخدم على فهم دور ملفات الارتباط في تشغيل الموقع وتذكر بعض الإعدادات وقياس الاستخدام.',
    points: ['تحسين تجربة الاستخدام', 'قياس الأداء', 'تطوير المحتوى'],
    steps: ['تحليل الاستخدام', 'تحسين المحتوى', 'تطوير التجربة'],
    cta: 'راجع الخصوصية',
    ctaHref: '/privacy',
    related: [
      { href: '/privacy', label: 'الخصوصية' },
      { href: '/legal', label: 'الشروط والأحكام' },
      { href: '/support-policy', label: 'سياسة الدعم' }
    ],
    faqs: [
      ['ما هي ملفات الارتباط؟', 'هي ملفات أو مؤشرات صغيرة تساعد الموقع على تذكر بعض الإعدادات أو قياس الاستخدام لتحسين الأداء.'],
      ['هل يمكن تحديث هذه السياسة؟', 'نعم، يمكن تحديث سياسة ملفات الارتباط عند إضافة أدوات أو خصائص جديدة للموقع.']
    ]
  }
};

function isExternalHref(href) {
  return href?.startsWith('http') || href?.startsWith('tel:') || href?.startsWith('mailto:');
}

function SmartLink({ href, children, className }) {
  if (isExternalHref(href)) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export default function FooterLandingPage({ page, slug }) {
  const faqItems = page.faqs || [
    [`ما هي صفحة ${page.title}؟`, page.desc],
    ['كيف أستفيد من هذه الصفحة؟', 'اقرأ التعريف والنقاط الأساسية ثم استخدم الروابط للوصول إلى الخطوة المناسبة.'],
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${page.title} | بيت الريف`,
    description: page.desc,
    url: `https://bietalreef.ae/${slug}`,
    inLanguage: 'ar-AE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: 'https://bietalreef.ae'
    },
    mainEntity: faqItems.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };

  const journeyGridClass = page.steps.length > 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <>
      <Head>
        <title>{page.title} | بيت الريف</title>
        <meta name="description" content={page.desc} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`https://bietalreef.ae/${slug}`} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/${slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={`https://bietalreef.ae/en/${slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://bietalreef.ae/${slug}`} />
        <meta property="og:title" content={`${page.title} | بيت الريف`} />
        <meta property="og:description" content={page.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bietalreef.ae/${slug}`} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={page.title} />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{page.title}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90 md:text-xl">{page.desc}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                <SmartLink href={page.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:scale-[1.02]">
                  {page.cta}
                  <ArrowLeft className="h-5 w-5" />
                </SmartLink>
                <Link href="/uae" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                  دليل الإمارات
                  <Compass className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">ما الذي تحتاج إلى معرفته؟</h2>
                <p className="mt-5 text-base leading-9 text-gray-600">{page.intent}</p>
              </article>

              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black text-gray-900">التزام بيت الريف</h2>
                <p className="mt-4 leading-8 text-gray-700">نعرض المعلومات بوضوح، ونراجع بيانات الأنشطة قبل النشر، ولا نقدم وعودًا غير مؤكدة بشأن الأسعار أو الجودة أو نتائج التعاقد.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-right">
              <h2 className="text-2xl font-black md:text-3xl">أهم ما تحتاج إلى معرفته</h2>
              <p className="mt-3 leading-8 text-gray-600">نقاط واضحة تساعدك على اختيار الخطوة المناسبة.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {page.points.map((point) => (
                <div key={point} className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
                  <p className="text-sm font-semibold leading-8 text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-[2rem] bg-[#0F3F1A] p-7 text-white md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">الخطوات</h2>
              <div className={`mt-8 grid gap-4 ${journeyGridClass}`}>
                {page.steps.map((step, index) => (
                  <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <span className="text-sm font-black text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-lg font-black">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-gray-900">تابع إلى القسم المناسب</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {page.related.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 transition hover:border-primary hover:text-primary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${page.title}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const page = PAGES[slug];
  if (!page) return { notFound: true };
  return { props: { page, slug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(PAGES)
      .filter((slug) => !RESERVED_ARABIC_ROUTES.has(slug))
      .map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

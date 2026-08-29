import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const RESERVED_ARABIC_ROUTES = new Set([
  'cookies',
  'privacy',
  'legal',
  'why-biet-alreef',
  'how-it-works',
  'pricing',
]);

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
      { href: '/how-it-works', label: 'تعرف على المنصة' }
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
      { href: '/how-it-works', label: 'المنصة' }
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
      ['هل السعر المنشور نهائي؟', 'أي سعر استرشادي يحتاج إلى تأكيد من مزود الخدمة بعد مراجعة التفاصيل.'],
      ['كيف أحصل على عرض أدق؟', 'أرسل موقع المشروع والمقاسات والصور ونوع المواد المطلوبة ونطاق التنفيذ.']
    ]
  },
  'platform-for-business': {
    badge: 'منصة بيت الريف للأعمال',
    title: 'كيف تعمل منصة بيت الريف للأعمال',
    desc: 'مسار عملي للشركات ومزودي الخدمات لتنظيم ملف النشاط، إدارة ما ينشرونه، واستخدام أدوات بيت الريف من المكتب أو موقع العمل.',
    intent: 'هذه الصفحة مخصصة لشرح رحلة الشركة داخل بيت الريف: إنشاء الحساب، استكمال بيانات النشاط والتحقق، تفعيل الخطة المناسبة، ثم إدارة المتجر والعناصر والخدمات والأعمال من نفس المنظومة.',
    points: ['ملف أعمال منظم وواضح داخل المنصة.', 'إدارة المنتجات والخدمات والعروض وفق الخطة والصلاحيات.', 'استخدام بيت الريف من المتصفح ومن تطبيق Android.'],
    steps: ['أنشئ حساب شركتك', 'استكمل بيانات النشاط والتحقق', 'اختر الخطة المناسبة', 'ابدأ إدارة أعمالك'],
    cta: 'ضم شركتك إلى بيت الريف',
    ctaHref: '/join-biet-alreef',
    related: [{ href: '/join-provider', label: 'الانضمام كمزود خدمة' }, { href: '/start-your-store', label: 'أنشئ متجرك' }, { href: '/business-plans', label: 'خطط الأعمال' }],
    faqs: [['هل هذه الصفحة هي دليل مزودي الخدمات؟', 'لا. دليل المزودين مخصص للاكتشاف والتصفح، أما هذه الصفحة فتشرح رحلة الشركة واستخدام المنصة للأعمال.'], ['هل تعمل المنصة على الكمبيوتر والهاتف؟', 'يمكن استخدام بيت الريف من متصفح الكمبيوتر، كما يتوفر تطبيق بيت الريف على Android.']]
  },
  'join-provider': {
    badge: 'الانضمام كمزود خدمة',
    title: 'انضم كمزود خدمة إلى بيت الريف',
    desc: 'أنشئ حضورًا مهنيًا لنشاطك داخل بيت الريف، واستكمل بيانات شركتك وتخصصاتك ومناطق خدمتك قبل النشر.',
    intent: 'مسار الانضمام يختلف عن دليل المزودين العام. هنا تبدأ رحلة تسجيل النشاط، التحقق من البيانات، استكمال الملف، ثم تفعيل ما تسمح به الخطة من أدوات ونشر.',
    points: ['تسجيل بيانات الشركة والنشاط بصورة منظمة.', 'إضافة التخصصات والخدمات ومناطق العمل.', 'تفعيل الصلاحيات والنشر وفق حالة الحساب والخطة.'],
    steps: ['سجل النشاط', 'استكمل الملف', 'أرسل للمراجعة', 'ابدأ استخدام المنصة'],
    cta: 'ابدأ الانضمام',
    ctaHref: '/providers/register',
    related: [{ href: '/providers', label: 'دليل مزودي الخدمات' }, { href: '/business-plans', label: 'خطط الأعمال' }, { href: '/weyaak-ai', label: 'وياك للذكاء الاصطناعي' }],
    faqs: [['هل التسجيل يعني النشر مباشرة؟', 'لا. النشر والصلاحيات يرتبطان باكتمال البيانات وحالة الحساب والخطة المفعلة.'], ['هل هذه الصفحة بديل عن صفحة المزود العامة؟', 'لا. هذه صفحة انضمام للأعمال، بينما صفحة المزود العامة مخصصة لعرض النشاط بعد اعتماده.']]
  },
  'business-solutions': {
    badge: 'حلول بيت الريف',
    title: 'حلول وخدمات بيت الريف للأعمال',
    desc: 'حلول رقمية تجمع حضور الشركة، المتجر، النشر، أدوات Google، والذكاء الاصطناعي وياك ضمن مسارات واضحة للأعمال.',
    intent: 'بدل أن تكون صفحة الخدمات العامة هي نفسها صفحة حلول الشركات، يقدم هذا المسار صورة واضحة لما تستطيع الشركة استخدامه داخل منظومة بيت الريف لتطوير حضورها وتشغيلها الرقمي.',
    points: ['حضور رقمي وملف أعمال منظم.', 'متجر وعناصر وخدمات وعروض وفق الخطة.', 'Google Cloud وGoogle Workspace ووياك ضمن خدمات منفصلة وواضحة.'],
    steps: ['حدد احتياج شركتك', 'اختر الحل المناسب', 'تواصل مع فريق بيت الريف'],
    cta: 'تواصل مع خدمة العملاء',
    ctaHref: '/contact',
    related: [{ href: '/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/weyaak-ai', label: 'وياك' }],
    faqs: [['هل هذه الصفحة تعرض خدمات السوق؟', 'لا. خدمات السوق مخصصة للاكتشاف، أما هذه الصفحة فتشرح حلول بيت الريف التي تستفيد منها الشركات.'], ['هل يمكن اختيار خدمة واحدة فقط؟', 'يعتمد التنفيذ على احتياج الشركة والخطة والخدمة المطلوبة.']]
  },
  'start-your-store': {
    badge: 'متجرك على بيت الريف',
    title: 'أنشئ متجرك على بيت الريف',
    desc: 'فعّل حساب شركتك ونظّم منتجاتك وخدماتك وعروضك ومعلومات متجرك داخل منظومة بيت الريف.',
    intent: 'هذه الصفحة تشرح تجربة المتجر لصاحب النشاط، وليست صفحة تصفح السوق العامة. المتجر يجمع هوية النشاط والعناصر المنشورة وسياسات المتجر ومعلومات التواصل ضمن ملف واضح.',
    points: ['منتجات وخدمات وعروض مرتبطة بحساب الشركة.', 'سياسات المتجر مثل الشحن والتوصيل والاسترجاع والضمان عند انطباقها.', 'إدارة الاستخدام والنشر بحسب الخطة والصلاحيات.'],
    steps: ['فعّل حسابك', 'استكمل بيانات المتجر', 'أضف العناصر المسموحة', 'ابدأ إدارة متجرك'],
    cta: 'ضم شركتك الآن',
    ctaHref: '/join-biet-alreef',
    related: [{ href: '/marketplace', label: 'سوق بيت الريف' }, { href: '/business-plans', label: 'الخطط' }, { href: '/platform-for-business', label: 'كيف تعمل المنصة للأعمال' }],
    faqs: [['هل هذه الصفحة هي سوق بيت الريف؟', 'لا. سوق بيت الريف مخصص للتصفح والاكتشاف، بينما هذه الصفحة تشرح كيف تنشئ الشركة متجرها وتديره.'], ['هل عدد العناصر مفتوح؟', 'عدد العناصر والنشر يرتبطان بالخطة والصلاحيات المفعلة على الحساب.']]
  },
  'business-plans': {
    badge: 'خطط الأعمال',
    title: 'خطط الأعمال والاشتراكات',
    desc: 'اختر الخطة التي تناسب مرحلة شركتك واستخدامها لمنصة بيت الريف، مع توضيح الصلاحيات والمزايا قبل الاشتراك.',
    intent: 'الخطة الشهرية الحالية بقيمة 500 درهم، بينما مزايا الاشتراك السنوي المؤهل قد تشمل Google للأعمال ودومين الشركة وفق شروط الباقة المنشورة. كما تطبق سياسة الاسترداد المعلنة خلال 30 يومًا وفق شروطها.',
    points: ['خطة شهرية بقيمة 500 درهم وفق العرض الحالي.', 'مزايا سنوية مؤهلة تشمل Google للأعمال ودومين الشركة وفق الشروط.', 'سياسة استرداد خلال 30 يومًا وفق الشروط المنشورة.'],
    steps: ['راجع المزايا', 'اختر مدة الاشتراك', 'فعّل حساب شركتك'],
    cta: 'تواصل مع خدمة العملاء',
    ctaHref: '/contact',
    related: [{ href: '/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/refund-policy', label: 'سياسة الاسترداد' }, { href: '/join-biet-alreef', label: 'ضم شركتك' }],
    faqs: [['هل الاشتراك السنوي يتضمن Google للأعمال؟', 'تتضمن الباقات السنوية المؤهلة مزايا Google للأعمال ودومين الشركة وفق الشروط المحددة للباقة.'], ['هل يمكن طلب استرداد؟', 'تطبق سياسة الاسترداد خلال 30 يومًا وفق الشروط والاستثناءات المنشورة.']]
  },
  'partner-with-biet-alreef': {
    badge: 'الشراكات',
    title: 'الشراكة مع بيت الريف',
    desc: 'مسار للشراكات التجارية والتقنية التي تضيف قيمة فعلية لمنظومة بيت الريف وللشركات ومزودي الخدمات والعملاء.',
    intent: 'نستقبل فرص الشراكة التي ترتبط بالتقنية، الخدمات، التوريد، التسويق، التحول الرقمي أو التوسع التشغيلي داخل دولة الإمارات.',
    points: ['شراكات تقنية ورقمية.', 'شراكات موردين وخدمات وأعمال.', 'تعاون واضح النطاق والأهداف والمسؤوليات.'],
    steps: ['عرّف شركتك', 'حدد نوع الشراكة', 'راجع نطاق التعاون'],
    cta: 'تواصل بشأن الشراكة',
    ctaHref: '/contact',
    related: [{ href: '/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/join-biet-alreef', label: 'ضم شركتك' }, { href: '/suppliers-biet-alreef', label: 'الموردون' }],
    faqs: [['من يمكنه التقدم للشراكة؟', 'يمكن للشركات والجهات التي لديها خدمة أو تقنية أو مورد أو فرصة تعاون واضحة التواصل مع بيت الريف.'], ['هل الشراكة تعني اعتمادًا تلقائيًا؟', 'لا. كل شراكة تخضع للمراجعة والاتفاق على نطاقها وشروطها.']]
  },
  'join-biet-alreef': {
    badge: 'ضم شركتك',
    title: 'ضم شركتك إلى بيت الريف',
    desc: 'ابدأ من حساب شركتك، استكمل الهوية والنشاط والتخصصات ومناطق الخدمة، ثم استخدم أدوات بيت الريف وفق حالتك وخطتك.',
    intent: 'هذه الصفحة هي نقطة الدخول التجارية للشركات التي تريد الانضمام إلى منظومة بيت الريف، سواء كانت مزود خدمة أو موردًا أو مصنعًا أو ورشة أو نشاطًا محليًا.',
    points: ['حساب أعمال مرتبط ببيانات الشركة.', 'رحلة تحقق واعتماد قبل النشر العام.', 'الوصول إلى المتجر والأدوات بحسب الخطة والصلاحيات.'],
    steps: ['أنشئ الحساب', 'استكمل بيانات الشركة', 'تحقق من النشاط', 'ابدأ استخدام بيت الريف'],
    cta: 'ابدأ تسجيل شركتك',
    ctaHref: '/providers/register',
    related: [{ href: '/join-provider', label: 'مزودو الخدمات' }, { href: '/start-your-store', label: 'متجرك' }, { href: '/business-plans', label: 'خطط الأعمال' }],
    faqs: [['هل تقبل بيت الريف الشركات فقط؟', 'تخدم المنصة الشركات ومزودي الخدمات والموردين والمصانع والورش والمهنيين وفق نوع النشاط ومتطلبات التحقق.'], ['هل يمكن التصفح قبل التسجيل؟', 'نعم، أجزاء الاكتشاف العامة متاحة للتصفح، بينما أدوات الأعمال تحتاج إلى حساب وصلاحيات مناسبة.']]
  },
  'google-cloud-biet-alreef': {
    badge: 'Google Cloud | بيت الريف',
    title: 'Google Cloud مع بيت الريف',
    desc: 'حلول سحابية للأعمال تشمل التطبيقات والبيانات والذكاء الاصطناعي والخرائط والأتمتة وفق احتياج كل شركة.',
    intent: 'تقدم بيت الريف خدمات مرتبطة بـ Google Cloud ضمن حلول التحول الرقمي للشركات، مع التركيز على التطبيقات والبيانات وMaps والذكاء الاصطناعي والأتمتة والتكاملات. بيت الريف مدرج بملف عام على Google Cloud Partner Finder.',
    points: ['تطبيقات وبنية سحابية وفق الاحتياج.', 'بيانات وذكاء اصطناعي وخرائط وتكاملات.', 'ملف عام لبيت الريف على Google Cloud Partner Finder.'],
    steps: ['حدد الاحتياج التقني', 'راجع البنية الحالية', 'صمم نطاق الحل', 'ابدأ التنفيذ المتفق عليه'],
    cta: 'تحدث مع فريق بيت الريف',
    ctaHref: '/contact',
    related: [{ href: '/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/weyaak-ai', label: 'وياك للذكاء الاصطناعي' }, { href: '/business-solutions', label: 'حلول الأعمال' }],
    faqs: [['هل Google Cloud هو نفسه Google Workspace؟', 'لا. Google Cloud يركز على البنية السحابية والتطبيقات والبيانات والذكاء الاصطناعي، بينما Google Workspace يركز على أدوات العمل والتعاون والبريد للأعمال.'], ['هل بيت الريف مدرج على Google Cloud Partner Finder؟', 'نعم، يوجد ملف عام لبيت الريف على Google Cloud Partner Finder.']]
  },
  'google-workspace-biet-alreef': {
    badge: 'Google Workspace | بيت الريف',
    title: 'Google Workspace مع بيت الريف',
    desc: 'نظّم بريد شركتك وملفاتك واجتماعاتك وتقويمك وإدارة المستخدمين ضمن بيئة أعمال أكثر احترافية من الاعتماد على الحسابات الشخصية المتفرقة.',
    intent: 'تساعد بيت الريف الشركات على تقييم إعدادها الحالي، ربط الدومين، إنشاء بريد احترافي باسم الشركة، إعداد المستخدمين والأدوات الأساسية في Google Workspace، ودعم الانتقال وفق النطاق المتفق عليه.',
    points: ['بريد أعمال باسم نطاق شركتك.', 'Gmail وDrive وMeet وCalendar وأدوات التعاون.', 'إدارة مركزية للمستخدمين والملفات بحسب الخطة المختارة.'],
    steps: ['راجع الدومين والحسابات الحالية', 'حدد احتياج المستخدمين', 'جهز Workspace والبريد', 'ابدأ العمل وإدارة الفريق'],
    cta: 'احصل على بريد أعمالك',
    ctaHref: '/contact',
    related: [{ href: '/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/business-plans', label: 'الخطط السنوية' }, { href: '/business-solutions', label: 'حلول الأعمال' }],
    faqs: [['هل يجب أن أتوقف عن استخدام Gmail الشخصي؟', 'يمكن للحساب الشخصي أن يخدم الاستخدام الفردي، لكن Google Workspace يوفر إدارة مؤسسية وبريدًا باسم الشركة وأدوات تحكم للأعمال بحسب الخطة.'], ['هل البريد المجاني من Google مباشرة؟', 'العروض المجانية أو المزايا المضمنة تكون ضمن باقات بيت الريف المؤهلة وشروطها، وليست وعدًا عامًا من Google.']]
  },
  'weyaak-ai': {
    badge: 'وياك | الذكاء الاصطناعي من بيت الريف',
    title: 'وياك – الذكاء الاصطناعي من بيت الريف',
    desc: 'مساعد أعمال ذكي داخل منظومة بيت الريف يساعد الشركة على فهم معلوماتها وتنظيم العمل والمحتوى والمسارات المتاحة داخل حسابها.',
    intent: 'وياك ليس دردشة عامة منفصلة عن المنصة. دوره أن يعمل داخل سياق حساب الشركة وبياناتها ونشاطها وخطتها وصلاحياتها، ويساعد في المحتوى والعناصر والمستندات والإرشاد داخل رحلة العمل.',
    points: ['يفهم سياق الشركة والنشاط والبيانات المتاحة له.', 'يساعد في المحتوى والمنتجات والخدمات والمستندات والإرشاد.', 'إمكاناته ترتبط بحالة الحساب والخطة والصلاحيات.'],
    steps: ['يفهم سياق حسابك', 'يحدد المهمة المطلوبة', 'يساعدك داخل مسار العمل'],
    cta: 'تعرف على وياك داخل بيت الريف',
    ctaHref: '/contact',
    related: [{ href: '/platform-for-business', label: 'منصة بيت الريف للأعمال' }, { href: '/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/business-plans', label: 'خطط الأعمال' }],
    faqs: [['ما هو وياك؟', 'وياك هو مساعد أعمال ذكي داخل منظومة بيت الريف، مصمم للمساعدة في مهام مرتبطة بحساب الشركة ومسارات المنصة.'], ['هل وياك شات بوت عام؟', 'لا. الهدف منه العمل داخل سياق بيت الريف وبيانات وصلاحيات الحساب، وليس أن يكون دردشة عامة مستقلة.']]
  },
  'suppliers-biet-alreef': {
    badge: 'الموردون مع بيت الريف',
    title: 'الموردون مع بيت الريف',
    desc: 'مسار أعمال للموردين الراغبين في عرض منتجاتهم وخدماتهم وربط نشاطهم بالسوق والمشاريع والعملاء داخل الإمارات.',
    intent: 'هذه صفحة انضمام وقيمة للمورد، وليست دليل الموردين العام. توضح كيف ينظم المورد بياناته وعناصره ومناطق خدمته داخل بيت الريف.',
    points: ['ملف مورد منظم.', 'منتجات وعروض مرتبطة بالخطة.', 'وصول أوضح إلى مسارات السوق والمشاريع.'],
    steps: ['سجل نشاط المورد', 'استكمل البيانات', 'فعّل الخطة', 'أدر العناصر المنشورة'],
    cta: 'ضم نشاطك كمورد',
    ctaHref: '/providers/register',
    related: [{ href: '/suppliers', label: 'دليل الموردين' }, { href: '/start-your-store', label: 'أنشئ متجرك' }, { href: '/business-plans', label: 'الخطط' }],
    faqs: [['هل هذه الصفحة هي دليل الموردين؟', 'لا. الدليل مخصص للاكتشاف، وهذه الصفحة تشرح انضمام المورد واستخدامه لبيت الريف.'], ['هل يستطيع المورد إضافة منتجات؟', 'يعتمد ذلك على الخطة والصلاحيات والحصة المفعلة على الحساب.']]
  },
  'factories-workshops-biet-alreef': {
    badge: 'المصانع والورش مع بيت الريف',
    title: 'المصانع والورش مع بيت الريف',
    desc: 'صفحة أعمال للمصانع والورش التي تريد عرض قدراتها ومنتجاتها وخدماتها وربطها باحتياجات المشاريع والسوق داخل الإمارات.',
    intent: 'يوضح هذا المسار كيف تنضم المصانع والورش إلى بيت الريف، وما البيانات المطلوبة لعرض النشاط بصورة مهنية، وكيف يرتبط المتجر والعناصر والخدمات بالخطة.',
    points: ['تعريف واضح بقدرات المصنع أو الورشة.', 'منتجات وخدمات وعروض منظمة.', 'ربط النشاط بمناطق الخدمة واحتياجات السوق.'],
    steps: ['سجل النشاط', 'حدد التخصص والقدرات', 'استكمل التحقق', 'ابدأ إدارة الملف والعناصر'],
    cta: 'ضم المصنع أو الورشة',
    ctaHref: '/providers/register',
    related: [{ href: '/factories', label: 'دليل المصانع والورش' }, { href: '/start-your-store', label: 'المتجر' }, { href: '/business-solutions', label: 'حلول الأعمال' }],
    faqs: [['هل تقبل الورش الصغيرة؟', 'يعتمد القبول والنشر على نوع النشاط واكتمال متطلبات التحقق المطبقة على الحساب.'], ['ما الفرق عن دليل المصانع؟', 'الدليل للاكتشاف العام، أما هذه الصفحة فمخصصة لقيمة الانضمام واستخدام أدوات بيت الريف.']]
  },
  'refund-policy': {
    badge: 'السياسات',
    title: 'سياسة الاسترداد',
    desc: 'توضح هذه الصفحة إطار طلب استرداد رسوم الاشتراك خلال المدة المعلنة والشروط والاستثناءات التي تنطبق على كل باقة.',
    intent: 'تطبق فترة الاسترداد المعلنة لمدة 30 يومًا وفق شروط الباقة والخدمات التي تم تفعيلها أو استهلاكها. يجب الرجوع إلى الشروط النهائية المنشورة عند الاشتراك لتحديد الأهلية والمبلغ القابل للاسترداد.',
    points: ['مدة طلب الاسترداد المعلنة: 30 يومًا وفق الشروط.', 'الأهلية قد تتأثر بالخدمات أو التكاليف التي تم تنفيذها فعليًا.', 'تتم معالجة الطلب عبر خدمة العملاء بعد مراجعة حالة الحساب.'],
    steps: ['تواصل مع الدعم', 'قدم بيانات الاشتراك', 'تتم مراجعة الأهلية والرسوم'],
    cta: 'تواصل مع الدعم',
    ctaHref: '/contact',
    related: [{ href: '/business-plans', label: 'خطط الأعمال' }, { href: '/legal', label: 'الشروط والأحكام' }, { href: '/contact', label: 'خدمة العملاء' }],
    faqs: [['هل الاسترداد مضمون في كل حالة؟', 'الاسترداد يخضع لشروط الباقة وحالة الخدمات التي تم تنفيذها أو تفعيلها خلال الفترة.'], ['كيف أطلب الاسترداد؟', 'ابدأ بطلب عبر خدمة العملاء مع بيانات الحساب والاشتراك ليتم تقييم الأهلية وفق الشروط.']]
  }
};

export default function GenericArabicPage({ page }) {
  if (!page) return null;
  const canonical = `https://bietalreef.ae/${page.slug}`;
  const englishCanonical = `https://bietalreef.ae/en/${page.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${page.title} | بيت الريف`,
    description: page.desc,
    url: canonical,
    inLanguage: 'ar-AE',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://bietalreef.ae/#website',
      name: 'بيت الريف',
      url: 'https://bietalreef.ae',
    },
    mainEntity: page.faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <Head>
        <title>{page.title} | بيت الريف</title>
        <meta name="description" content={page.desc} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={canonical} />
        <link rel="alternate" hrefLang="en-AE" href={englishCanonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />
        <meta property="og:title" content={`${page.title} | بيت الريف`} />
        <meta property="og:description" content={page.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-right text-gray-900 font-sans">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{page.title}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90 md:text-xl">{page.desc}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                <Link href={page.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:scale-[1.02]">
                  {page.cta}
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                  العودة إلى الرئيسية
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
                <h2 className="text-xl font-black text-gray-900">التزامنا</h2>
                <p className="mt-4 leading-8 text-gray-700">نقدم المعلومات بوضوح، ونراجع بيانات النشاط قبل النشر، ونتجنب الوعود غير المؤكدة بالأسعار أو الجودة أو نتائج التعاقد.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-right">
              <h2 className="text-2xl font-black md:text-3xl">النقاط الأساسية</h2>
              <p className="mt-3 leading-8 text-gray-600">معلومات واضحة تساعدك على اختيار الخطوة التالية المناسبة.</p>
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
              <div className={`mt-8 grid gap-4 ${page.steps.length > 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
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
              <h2 className="text-2xl font-black text-gray-900">انتقل إلى القسم المناسب</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {page.related.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 transition hover:border-primary hover:text-primary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={page.faqs} title={`أسئلة شائعة حول ${page.title}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(PAGES)
      .filter((slug) => !RESERVED_ARABIC_ROUTES.has(slug))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = PAGES[params.slug];
  if (!page || RESERVED_ARABIC_ROUTES.has(params.slug)) return { notFound: true };
  return { props: { page: { ...page, slug: params.slug } } };
}

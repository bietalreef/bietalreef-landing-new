import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const RESERVED_ARABIC_ROUTES = new Set(['cookies']);

const PAGES = {
  'why-biet-alreef': {
    badge: 'هوية المنصة',
    title: 'لماذا بيت الريف',
    desc: 'بيت الريف يبني تجربة منظمة لأصحاب المشاريع في الإمارات، تبدأ من فهم الاحتياج ثم اختيار المكان والخدمة قبل الوصول إلى مزود الخدمة المناسب.',
    intent: 'هذه الصفحة تشرح سبب وجود بيت الريف كمنصة متخصصة في البناء والصيانة والتشطيب، ولماذا نعتمد على الوضوح والربط المنظم بدل البحث العشوائي.',
    points: [
      'نرتب رحلة العميل من السؤال الأول حتى طلب عرض السعر بطريقة واضحة.',
      'نربط خدمات البناء والصيانة بالمكان والتخصص لتسهيل الوصول للمعلومة.',
      'نبني قاعدة محتوى وبيانات قابلة للمراجعة حتى لا تظهر معلومات غير موثوقة.'
    ],
    steps: ['افهم احتياجك', 'اختر الإمارة أو الخدمة', 'اسأل وياك أو أرسل طلبك'],
    cta: 'ابدأ من دليل الإمارات',
    ctaHref: '/uae',
    related: [
      { href: '/about', label: 'عن بيت الريف' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/uae', label: 'دليل الإمارات' }
    ],
    faqs: [
      ['ما الذي يميز بيت الريف؟', 'بيت الريف يربط بين المكان، نوع الخدمة، واحتياج العميل بطريقة منظمة بدل الاعتماد على البحث العشوائي أو أرقام غير موثقة.'],
      ['هل بيت الريف منصة بيع مباشرة؟', 'بيت الريف في هذه المرحلة منصة تعريفية وتنظيمية تساعد العميل على الوصول للمسار المناسب وطلب عرض سعر حسب تفاصيل المشروع.']
    ]
  },
  'how-it-works': {
    badge: 'رحلة الاستخدام',
    title: 'كيف يعمل بيت الريف',
    desc: 'تعمل منصة بيت الريف كمسار واضح: اختر المكان، حدد الخدمة، ثم أرسل طلبك أو اسأل وياك ليتم توجيهك للخطوة المناسبة.',
    intent: 'هذه الصفحة تجيب مباشرة على سؤال المستخدم: كيف أبدأ مشروعي أو أبحث عن خدمة بناء أو صيانة داخل بيت الريف؟',
    points: [
      'ابدأ من دليل الإمارات عند البحث حسب الموقع.',
      'ابدأ من الخدمات والعروض عند معرفة نوع الخدمة المطلوبة.',
      'استخدم وياك لتوضيح احتياجك وتحويله إلى طلب منظم.'
    ],
    steps: ['اختيار الإمارة', 'اختيار المدينة أو الخدمة', 'إرسال تفاصيل الطلب'],
    cta: 'اسأل وياك الآن',
    ctaHref: '/weyaak',
    related: [
      { href: '/uae', label: 'دليل الإمارات' },
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/contact', label: 'تواصل معنا' }
    ],
    faqs: [
      ['هل أبدأ من المكان أم الخدمة؟', 'إذا كنت تبحث داخل مدينة أو إمارة معينة فابدأ من دليل الإمارات. إذا كنت تعرف الخدمة المطلوبة فابدأ من الخدمات والعروض.'],
      ['هل يمكنني استخدام وياك بدل التصفح؟', 'نعم، وياك يساعدك على وصف احتياجك وتحويله إلى مسار واضح داخل بيت الريف.']
    ]
  },
  pricing: {
    badge: 'سياسة التسعير',
    title: 'الأسعار',
    desc: 'لا يعرض بيت الريف أسعارًا عشوائية أو غير معتمدة. السعر الصحيح يعتمد على المكان، المقاسات، المواد، نطاق العمل، وتفاصيل التنفيذ.',
    intent: 'هذه الصفحة تشرح لماذا الأفضل طلب عرض سعر بدل الاعتماد على رقم عام لا يناسب كل المشاريع.',
    points: [
      'السعر يختلف حسب المدينة ونوع الخدمة وتفاصيل المشروع.',
      'لا ننشر أسعارًا غير مؤكدة حتى لا نضلل العميل أو المزود.',
      'أفضل طريقة للحصول على رقم واقعي هي إرسال تفاصيل المشروع وطلب عرض سعر.'
    ],
    steps: ['أرسل وصف المشروع', 'حدد الموقع والمقاسات', 'استلم توجيهًا مناسبًا'],
    cta: 'اطلب عرض سعر',
    ctaHref: '/contact',
    related: [
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/faq', label: 'الأسئلة الشائعة' }
    ],
    faqs: [
      ['لماذا لا توجد أسعار ثابتة؟', 'لأن أعمال البناء والصيانة تتغير حسب الموقع، الكمية، جودة المواد، صعوبة التنفيذ، ووقت العمل.'],
      ['كيف أحصل على تقدير سعر؟', 'أرسل تفاصيل المشروع، الصور أو المقاسات المتاحة، وموقع التنفيذ ليتم توجيهك إلى المسار الأنسب.']
    ]
  },
  partners: {
    badge: 'نمو الشركاء',
    title: 'كن شريكًا',
    desc: 'بيت الريف يفتح الباب للشركات، الورش، المصانع، والموردين لبناء تواجد رقمي منظم داخل قطاع البناء والصيانة في الإمارات.',
    intent: 'هذه الصفحة مخصصة لكل نشاط يريد أن يصبح جزءًا من منظومة بيت الريف ويظهر بطريقة مهنية قابلة للبحث والفهم.',
    points: [
      'ملف تعريفي واضح لنشاطك وخدماتك ومناطق عملك.',
      'ربط النشاط بمسارات الدليل والخدمات والمنتجات.',
      'تجهيز بيانات قابلة للمراجعة قبل النشر لضمان جودة المنصة.'
    ],
    steps: ['عرّف نشاطك', 'حدد الخدمات والمناطق', 'ابدأ التواجد الرقمي'],
    cta: 'سجل كمزود خدمة',
    ctaHref: '/providers/register',
    related: [
      { href: '/providers/register', label: 'سجل كمزود خدمة' },
      { href: '/suppliers', label: 'الموردون' },
      { href: '/factories', label: 'المصانع' }
    ],
    faqs: [
      ['من يمكنه الانضمام كشريك؟', 'الشركات، الورش، المصانع، الموردون، ومزودو الخدمات المرتبطون بالبناء والصيانة والتشطيب.'],
      ['هل النشر مباشر؟', 'لا. يتم تجهيز ومراجعة البيانات قبل الظهور العام للحفاظ على الثقة وجودة المحتوى.']
    ]
  },
  suppliers: {
    badge: 'سلاسل التوريد',
    title: 'الموردون',
    desc: 'صفحة الموردين مخصصة لتنظيم حضور موردي مواد البناء والتشطيب والمنتجات المرتبطة بالمشاريع داخل بيت الريف.',
    intent: 'هذه الصفحة توضح كيف يمكن للمورد أن يظهر ضمن منظومة المنتجات والمتاجر والخدمات المرتبطة بالمكان ونوع المشروع.',
    points: [
      'عرض المواد والمنتجات بطريقة قابلة للتصنيف والبحث.',
      'ربط المنتجات بالخدمات والمناطق عند اكتمال البيانات.',
      'تحسين تواجد المورد رقميًا عبر صفحات واضحة ومهيأة للفهرسة.'
    ],
    steps: ['أضف بيانات المورد', 'حدد فئات المنتجات', 'اربط مناطق التوريد'],
    cta: 'تواصل كمورد',
    ctaHref: '/contact',
    related: [
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/partners', label: 'كن شريكًا' },
      { href: '/factories', label: 'المصانع' }
    ],
    faqs: [
      ['ما نوع الموردين المناسبين؟', 'موردو مواد البناء، التشطيب، الرخام، السيراميك، الإنارة، النجارة، والمنتجات المرتبطة بالمشاريع.'],
      ['هل يمكن عرض المنتجات؟', 'نعم، الهدف هو تجهيز منتجات ومتاجر قابلة للعرض والربط مع الخدمات عند اكتمال النظام.']
    ]
  },
  factories: {
    badge: 'المصانع والورش',
    title: 'المصانع',
    desc: 'صفحة المصانع تساعد الورش والمصانع على تقديم أعمالها ومنتجاتها ضمن سياق واضح يخدم العملاء والمشاريع.',
    intent: 'هذه الصفحة مخصصة للمصانع والورش التي تنتج أو تنفذ أعمالًا مرتبطة بالبناء، التشطيب، التصميم، أو المنتجات.',
    points: [
      'إظهار نوع الإنتاج أو الخدمة بوضوح.',
      'ربط المصنع أو الورشة بمناطق الخدمة والتوريد.',
      'تحويل الأعمال إلى محتوى منظم قابل للثقة.'
    ],
    steps: ['حدد النشاط', 'أضف المنتجات أو الأعمال', 'جهز صفحة المصنع'],
    cta: 'ابدأ كمصنع أو ورشة',
    ctaHref: '/providers/register',
    related: [
      { href: '/suppliers', label: 'الموردون' },
      { href: '/marketplace', label: 'المنتجات' },
      { href: '/partners', label: 'الشركاء' }
    ],
    faqs: [
      ['هل الورش الصغيرة مناسبة؟', 'نعم، إذا كان لديها نشاط واضح وأعمال قابلة للعرض ومناطق خدمة محددة.'],
      ['ما البيانات المطلوبة؟', 'اسم النشاط، التخصصات، الصور، المناطق، وسائل التواصل، وأي مستندات تثبت النشاط عند الحاجة.']
    ]
  },
  contact: {
    badge: 'تواصل منظم',
    title: 'تواصل معنا',
    desc: 'تواصل مع بيت الريف لطلب خدمة، انضمام مزود، شراكة، أو استفسار حول المنصة.',
    intent: 'هذه الصفحة توجه المستخدم إلى التواصل الصحيح حسب احتياجه بدل إرسال رسالة عامة غير واضحة.',
    points: ['حدد نوع الطلب', 'أرسل بيانات واضحة', 'انتظر التوجيه المناسب'],
    steps: ['اختر سبب التواصل', 'اكتب التفاصيل', 'تابع الرد'],
    cta: 'راسلنا على واتساب',
    ctaHref: 'https://wa.me/971567856001',
    related: [
      { href: '/providers/register', label: 'انضم كمزود' },
      { href: '/services', label: 'الخدمات' },
      { href: '/weyaak', label: 'وياك' }
    ],
    faqs: [
      ['متى أتواصل؟', 'عند وجود طلب خدمة، استفسار، رغبة في الانضمام، أو شراكة محتملة.'],
      ['هل يجب إرسال صور؟', 'إذا كان الطلب متعلقًا بمشروع أو صيانة، فالصور والمقاسات تساعد في فهم الطلب بشكل أسرع.']
    ]
  },
  faq: {
    badge: 'أسئلة وأجوبة',
    title: 'الأسئلة الشائعة',
    desc: 'إجابات مباشرة على أهم الأسئلة حول بيت الريف، الدليل، مزودي الخدمات، والتطبيق.',
    intent: 'هذه الصفحة تساعد الزائر على فهم المنصة بسرعة قبل اتخاذ قرار التواصل أو التسجيل.',
    points: ['فهم طريقة العمل', 'معرفة المسارات المتاحة', 'تقليل الأسئلة المتكررة'],
    steps: ['اقرأ السؤال', 'افهم الإجابة', 'انتقل للرابط المناسب'],
    cta: 'ابدأ من الدليل',
    ctaHref: '/uae',
    related: [
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/contact', label: 'تواصل معنا' },
      { href: '/providers/register', label: 'مزود خدمة' }
    ],
    faqs: [
      ['هل بيت الريف يعمل كوسيط؟', 'بيت الريف ينظم رحلة البحث والتواصل ويساعد في توجيه الطلب حسب المرحلة الحالية.'],
      ['هل يمكن لمزود خدمة التسجيل؟', 'نعم، يبدأ من صفحة مزود الخدمة لفهم المزايا ثم ينتقل للتطبيق عند الحاجة.']
    ]
  },
  'support-policy': {
    badge: 'سياسة الدعم',
    title: 'سياسة الدعم',
    desc: 'نوضح هنا طريقة الدعم والتواصل والمتابعة داخل بيت الريف حسب نوع الطلب والمرحلة.',
    intent: 'هذه الصفحة تحدد توقعات الدعم حتى تكون تجربة المستخدم واضحة ومنظمة.',
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
      ['هل الدعم فوري؟', 'يعتمد على نوع الطلب والقناة المستخدمة، والهدف هو الرد المنظم وليس الرد العشوائي.'],
      ['هل يتم دعم مزودي الخدمة؟', 'نعم، يتم توجيه مزود الخدمة لمسار التسجيل والبيانات المطلوبة.']
    ]
  },
  privacy: {
    badge: 'الخصوصية',
    title: 'سياسة الخصوصية',
    desc: 'نحترم خصوصية المستخدمين ونعمل على توضيح طريقة التعامل مع بيانات التواصل وطلبات الخدمة.',
    intent: 'هذه الصفحة تقدم إطارًا عامًا للخصوصية في الموقع التعريفي والمرحلة الحالية من المنصة.',
    points: ['استخدام البيانات لغرض التواصل', 'عدم نشر بيانات خاصة دون موافقة', 'تطوير السياسات مع تطور المنصة'],
    steps: ['اقرأ السياسة', 'استخدم الموقع بوعي', 'تواصل عند وجود استفسار'],
    cta: 'تواصل معنا',
    ctaHref: '/contact',
    related: [
      { href: '/legal', label: 'الشروط والأحكام' },
      { href: '/cookies', label: 'ملفات الارتباط' },
      { href: '/support-policy', label: 'سياسة الدعم' }
    ],
    faqs: [
      ['ما البيانات التي قد يتم جمعها؟', 'بيانات التواصل أو تفاصيل الطلب التي يرسلها المستخدم طوعًا عبر الموقع أو قنوات التواصل.'],
      ['هل السياسة نهائية؟', 'قد يتم تحديثها مع تطور التطبيق والمنصة وقنوات التشغيل.']
    ]
  },
  cookies: {
    badge: 'ملفات الارتباط',
    title: 'سياسة ملفات الارتباط',
    desc: 'توضح هذه الصفحة استخدام ملفات الارتباط أو أدوات القياس لتحسين تجربة المستخدم وفهم أداء الموقع.',
    intent: 'هذه الصفحة تساعد المستخدم على فهم دور ملفات الارتباط في تحسين تجربة التصفح والتحليل.',
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
    ['كيف أستفيد من هذه الصفحة؟', 'اقرأ التعريف والنقاط الأساسية ثم استخدم روابط الموقع أو وياك للوصول إلى الخطوة المناسبة.'],
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${page.title} | بيت الريف`,
    description: page.desc,
    url: `https://bietalreef.ae/${slug}`,
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

  return (
    <>
      <Head>
        <title>{page.title} | بيت الريف</title>
        <meta name="description" content={page.desc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://bietalreef.ae/${slug}`} />
        <meta property="og:title" content={`${page.title} | بيت الريف`} />
        <meta property="og:description" content={page.desc} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={page.title} />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 md:text-xl">{page.desc}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:justify-start justify-center">
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
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">ماذا تعني هذه الصفحة؟</h2>
                <p className="mt-5 text-base leading-9 text-gray-600">{page.intent}</p>
              </article>

              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black text-gray-900">قاعدة بيت الريف</h2>
                <p className="mt-4 leading-8 text-gray-700">نكتب المحتوى ليكون واضحًا للعميل، قابلًا للفهرسة، ومفهومًا لنماذج الذكاء الاصطناعي بدون مبالغة أو وعود غير مؤكدة.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-right">
              <h2 className="text-2xl font-black md:text-3xl">نقاط أساسية</h2>
              <p className="mt-3 leading-8 text-gray-600">ملخص مباشر يخدم المستخدم ومحركات البحث وأنظمة الإجابة.</p>
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
              <h2 className="text-2xl font-black md:text-3xl">الرحلة المقترحة</h2>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {page.steps.map((step, index) => (
                  <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <span className="text-sm font-black text-[#D4AF37]">0{index + 1}</span>
                    <h3 className="mt-3 text-lg font-black">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-gray-900">روابط مرتبطة</h2>
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
  return { paths: Object.keys(PAGES).filter((slug) => !RESERVED_ARABIC_ROUTES.has(slug)).map((slug) => ({ params: { slug } })), fallback: 'blocking' };
}

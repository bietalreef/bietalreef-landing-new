import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import FAQ from './FAQ';
import { ArrowLeft, CheckCircle2, Building2, BriefcaseBusiness, Store, Sparkles, ShieldCheck, BadgeCheck, LayoutDashboard, Globe2, FileText, Bot, Smartphone, Monitor, PackageCheck } from 'lucide-react';

const CONFIG = {
  'platform-for-business': {
    badge: 'دليلك الشامل',
    title: 'كيف تعمل منصة بيت الريف للأعمال؟',
    description: 'منصة أعمال رقمية إماراتية تساعد الشركات ومزودي الخدمات على تنظيم حضورهم، إدارة المتجر والعناصر، واستخدام أدوات بيت الريف من المكتب أو موقع العمل.',
    cta: 'ضم شركتك إلى بيت الريف',
    ctaHref: '/join-biet-alreef',
    secondary: 'تعرف على الخطوات',
    icon: Building2,
    accent: 'emerald',
    sectionTitle: 'رحلة شركتك في 4 خطوات واضحة',
    steps: [
      ['01', 'أنشئ حساب شركتك', 'ابدأ بحساب أعمال مخصص للنشاط بدل الاعتماد على حضور مبعثر أو غير منظم.'],
      ['02', 'استكمل بيانات النشاط', 'أضف الهوية، النشاط، التخصصات، الخدمات ومناطق العمل المطلوبة للتحقق.'],
      ['03', 'فعّل الخطة والصلاحيات', 'تحدد الخطة ما هو متاح من متجر وعناصر وأدوات وحصص نشر داخل النظام.'],
      ['04', 'أدر أعمالك', 'استخدم المنصة من الكمبيوتر أو Android لإدارة العناصر والمعلومات ومسارات العمل.'],
    ],
    features: [
      ['ملف أعمال منظم', 'هوية واضحة للشركة مرتبطة بالنشاط والتخصصات ومناطق الخدمة.', BadgeCheck],
      ['متجر وعناصر', 'إدارة المنتجات والخدمات والعروض والمشاريع وفق الحصة والصلاحيات.', Store],
      ['وياك داخل الحساب', 'مساعد أعمال يعمل مع سياق حساب الشركة والبيانات المتاحة له.', Bot],
      ['من المكتب والموقع', 'استخدم متصفح الكمبيوتر في المكتب وتطبيق Android أثناء التنقل والعمل.', Smartphone],
      ['تحكم حسب الخطة', 'الصلاحيات والحصص تأتي من النظام والخطة المفعلة وليست من الواجهة فقط.', ShieldCheck],
      ['مسارات أعمال مترابطة', 'الحضور الرقمي والمتجر والأدوات والمستندات ضمن منظومة واحدة.', LayoutDashboard],
    ],
    faqs: [
      ['هل هذه الصفحة هي دليل مزودي الخدمات؟', 'لا. دليل المزودين للاكتشاف العام، بينما هذه الصفحة تشرح استخدام الشركات لمنصة بيت الريف للأعمال.'],
      ['هل التسجيل يعني النشر مباشرة؟', 'لا. النشر يرتبط باكتمال البيانات والتحقق وحالة الحساب والخطة والصلاحيات.'],
      ['هل تعمل بيت الريف على الكمبيوتر والهاتف؟', 'يمكن استخدام المنصة من متصفح الكمبيوتر، كما يتوفر تطبيق بيت الريف على Android.'],
      ['ما دور وياك داخل المنصة؟', 'وياك مساعد أعمال داخل منظومة بيت الريف يساعد في تنظيم المعلومات والمحتوى والعناصر والمستندات وفق سياق الحساب وصلاحياته.'],
    ],
  },
  'join-provider': {
    badge: 'فرصة نمو لأعمالك',
    title: 'انضم كمزود خدمة إلى بيت الريف',
    description: 'حوّل نشاطك إلى حضور مهني منظم داخل بيت الريف، واستكمل بيانات شركتك وتخصصاتك ومناطق خدمتك قبل النشر العام.',
    cta: 'ابدأ تسجيل شركتك',
    ctaHref: '/providers/register',
    secondary: 'تعرف على المزايا',
    icon: BriefcaseBusiness,
    accent: 'emerald',
    sectionTitle: 'ماذا تحصل عليه عند الانضمام؟',
    steps: [
      ['01', 'سجّل النشاط', 'أنشئ حساب الشركة وأدخل بيانات النشاط الأساسية.'],
      ['02', 'استكمل الملف', 'أضف التخصصات والخدمات ومناطق العمل والهوية المهنية.'],
      ['03', 'أرسل للمراجعة', 'تمر البيانات بمرحلة تحقق ومراجعة قبل النشر العام.'],
      ['04', 'فعّل أدواتك', 'ابدأ استخدام الأدوات المتاحة بحسب حالة الحساب والخطة.'],
    ],
    features: [
      ['حضور مهني واضح', 'ملف أعمال منظم يسهل فهم نشاطك وتخصصاتك ومناطق خدمتك.', Building2],
      ['توثيق ومراجعة', 'النشر العام مرتبط بالتحقق واكتمال البيانات للحفاظ على جودة المنصة.', ShieldCheck],
      ['متجر وفق الخطة', 'إدارة العناصر المسموحة وحصص النشر وفق الخطة المفعلة.', Store],
      ['إدارة مركزية', 'تابع معلومات نشاطك والعناصر والأدوات من حساب واحد.', LayoutDashboard],
      ['وياك للأعمال', 'مساعدة ذكية مرتبطة بسياق النشاط والحساب والصلاحيات.', Bot],
      ['حضور متعدد القنوات', 'الاستفادة من الموقع العام والسوق والتطبيق ضمن المسارات المتاحة.', Globe2],
    ],
    faqs: [
      ['هل التسجيل يعني الظهور العام مباشرة؟', 'لا. الظهور والنشر يعتمدان على اكتمال البيانات والتحقق وحالة الحساب والصلاحيات.'],
      ['من يمكنه الانضمام؟', 'تخدم المنصة الشركات ومزودي الخدمات والموردين والمصانع والورش والمهنيين وفق نوع النشاط ومتطلبات التحقق.'],
      ['هل يمكنني إضافة خدمات ومنتجات؟', 'نعم عندما تسمح الخطة والصلاحيات بذلك، وبحسب الحصة المفعلة على الحساب.'],
      ['هل تضمن بيت الريف عددًا محددًا من العملاء؟', 'لا. بيت الريف يوفر حضورًا رقميًا وأدوات اكتشاف وإدارة، ولا يضمن نتائج تجارية أو عدد عملاء محددًا.'],
    ],
  },
  'business-solutions': {
    badge: 'حلول متكاملة',
    title: 'حلول وخدمات بيت الريف للأعمال',
    description: 'حلول رقمية للشركات تجمع الحضور المهني والمتجر وأدوات الإدارة وخدمات Google والذكاء الاصطناعي وياك ضمن مسارات واضحة.',
    cta: 'تحدث مع فريق بيت الريف',
    ctaHref: '/contact',
    secondary: 'استكشف الحلول',
    icon: LayoutDashboard,
    accent: 'blue',
    sectionTitle: 'حلولنا للأعمال',
    steps: [
      ['01', 'حدد احتياج شركتك', 'ابدأ بالمشكلة أو الهدف الفعلي الذي تريد حله.'],
      ['02', 'اختر المسار المناسب', 'منصة بيت الريف أو المتجر أو Google Cloud أو Workspace أو وياك.'],
      ['03', 'راجع النطاق والخطة', 'يتم تحديد الصلاحيات والخدمات بحسب الاحتياج والخطة.'],
      ['04', 'ابدأ التنفيذ', 'فعّل الحل أو الخدمة المتفق عليها دون بناء غير ضروري.'],
    ],
    features: [
      ['الحضور الرقمي', 'ملف أعمال ومتجر ومسارات نشر واكتشاف منظمة للشركة.', Globe2],
      ['Google Cloud', 'تطبيقات وبيانات وذكاء اصطناعي وMaps وأتمتة وتكاملات بحسب النطاق.', Monitor],
      ['Google Workspace', 'بريد باسم الشركة وDrive وMeet وCalendar وإدارة المستخدمين وفق الخطة.', BriefcaseBusiness],
      ['وياك', 'مساعد أعمال ذكي داخل منظومة بيت الريف وسياق الحساب.', Bot],
      ['إدارة العناصر', 'منتجات وخدمات وعروض ومشاريع ومستندات وفق الخطة والصلاحيات.', PackageCheck],
      ['مسارات تشغيل واضحة', 'كل خدمة لها نطاق مستقل دون خلطها مع دليل السوق العام.', FileText],
    ],
    faqs: [
      ['ما حلول الأعمال التي تقدمها بيت الريف؟', 'تشمل الحضور الرقمي والمتجر وأدوات النشر وإدارة النشاط، إضافة إلى Google Cloud وGoogle Workspace ووياك وفق احتياج الشركة.'],
      ['هل يجب الاشتراك في جميع الحلول؟', 'لا. يتم اختيار الخدمة أو النطاق المناسب بحسب احتياج الشركة والخطة.'],
      ['هل خدمات Google هي نفسها أدوات منصة بيت الريف؟', 'لا. أدوات المنصة تخص حساب بيت الريف، بينما Google Cloud وGoogle Workspace خدمات رقمية مستقلة في نطاقها.'],
      ['هل تضمن الحلول نتائج مبيعات أو ترتيبًا محددًا؟', 'لا. يتم تقديم الأدوات والخدمات دون ضمان أرقام مبيعات أو ترتيب بحث محدد.'],
    ],
  },
  'start-your-store': {
    badge: 'متجرك الإلكتروني',
    title: 'أنشئ متجرك على بيت الريف',
    description: 'فعّل حساب شركتك ونظّم منتجاتك وخدماتك وعروضك وسياسات متجرك داخل سوق بيت الريف في واجهة تجارية واضحة.',
    cta: 'فعّل حساب شركتك',
    ctaHref: '/join-biet-alreef',
    secondary: 'تعرف على مميزات المتجر',
    icon: Store,
    accent: 'purple',
    sectionTitle: 'ما الذي يتضمنه متجرك؟',
    steps: [
      ['01', 'فعّل حسابك', 'ابدأ من حساب شركة مكتمل البيانات وحالة حساب مناسبة.'],
      ['02', 'استكمل بيانات المتجر', 'أضف معلومات النشاط والتواصل وسياسات التعامل المناسبة.'],
      ['03', 'أضف العناصر المسموحة', 'انشر المنتجات والخدمات والعروض بحسب الحصة والصلاحيات.'],
      ['04', 'أدر متجرك', 'حدّث العناصر والسياسات والمعلومات من حساب النشاط.'],
    ],
    features: [
      ['منتجات وخدمات وعروض', 'تجميع العناصر المنشورة في واجهة تجارية مرتبطة بالشركة.', PackageCheck],
      ['سياسة الشحن والتوصيل', 'إظهار سياسة الشحن أو التوصيل عندما تنطبق على نوع النشاط.', FileText],
      ['الاسترجاع والضمان', 'إظهار شروط الاسترجاع والضمان وسياسات المتجر ذات الصلة.', ShieldCheck],
      ['إدارة من الحساب', 'المتجر مرتبط بحساب النشاط والخطة والصلاحيات.', LayoutDashboard],
      ['حصة نشر واضحة', 'عدد العناصر ليس مفتوحًا بلا حدود؛ تحدده الخطة والحصة المفعلة.', BadgeCheck],
      ['واجهة سوق مستقلة', 'المتجر هو واجهة تجارية داخل السوق وليس بديلًا عن صفحة الهبوط العامة للمزود.', Store],
    ],
    faqs: [
      ['هل متجر بيت الريف هو صفحة مزود الخدمة العامة؟', 'لا. صفحة المزود العامة للاكتشاف والمعلومات، بينما المتجر واجهة تجارية للعناصر المنشورة وسياسات التعامل.'],
      ['هل يمكن إضافة منتجات وخدمات وعروض؟', 'نعم عندما تسمح الخطة والصلاحيات بذلك وبحسب الحصة المفعلة.'],
      ['هل عدد العناصر غير محدود؟', 'لا. الحصة والخطة والصلاحيات تحدد عدد العناصر المتاحة للنشر.'],
      ['ما السياسات التي يجب أن تظهر؟', 'السياسات المناسبة لطبيعة النشاط مثل الشحن والتوصيل والاسترجاع والضمان عند انطباقها.'],
    ],
  },
  'business-plans': {
    badge: 'أسعار واضحة',
    title: 'خطط الأعمال والاشتراكات',
    description: 'اختر الخطة التي تناسب طريقة استخدام شركتك لبيت الريف، مع توضيح المزايا والصلاحيات والحصص قبل التفعيل.',
    cta: 'تواصل مع خدمة العملاء',
    ctaHref: '/contact',
    secondary: 'راجع المزايا',
    icon: BriefcaseBusiness,
    accent: 'orange',
    sectionTitle: 'ماذا تحدد الخطة؟',
    steps: [
      ['01', 'راجع احتياجك', 'حدد ما تحتاجه شركتك من أدوات ونشر وحضور رقمي.'],
      ['02', 'قارن المزايا', 'راجع الحصص والصلاحيات والخدمات المشمولة.'],
      ['03', 'اختر مدة الاشتراك', 'شهري أو سنوي وفق العرض والشروط المعلنة.'],
      ['04', 'فعّل الحساب', 'تتم عملية التفعيل وفق الخطة المختارة وحالة الحساب.'],
    ],
    features: [
      ['الخطة الشهرية الحالية', '500 درهم وفق العرض الحالي المعتمد وشروطه.', BriefcaseBusiness],
      ['حصص وصلاحيات', 'الخطة تتحكم في الأدوات والعناصر والحصص المتاحة للحساب.', ShieldCheck],
      ['مزايا سنوية مؤهلة', 'قد تشمل Google للأعمال ودومين الشركة وفق شروط الباقة المحددة.', Globe2],
      ['سياسة استرداد', 'فترة الاسترداد المعلنة 30 يومًا وفق الشروط والاستثناءات المنشورة.', FileText],
      ['تفعيل حسب الحساب', 'تختلف الأدوات المتاحة بحسب حالة الحساب والخطة والصلاحيات.', LayoutDashboard],
      ['خدمة عملاء', 'يمكن مراجعة الخطة والمزايا قبل التفعيل لتجنب أي التباس.', BadgeCheck],
    ],
    faqs: [
      ['ما قيمة الخطة الشهرية الحالية؟', 'العرض الحالي المعلن للخطة الشهرية هو 500 درهم وفق شروط ومزايا الخطة المعتمدة.'],
      ['هل توجد مزايا للاشتراك السنوي؟', 'قد تتضمن الاشتراكات السنوية المؤهلة مزايا Google للأعمال ودومين الشركة وفق شروط الباقة المحددة عند الاشتراك.'],
      ['هل يمكن طلب استرداد؟', 'تطبق سياسة الاسترداد المعلنة خلال 30 يومًا وفق الشروط والاستثناءات والخدمات التي تم تفعيلها.'],
      ['هل توجد أسعار 299 أو 799 درهم؟', 'لا تعتمد هذه الصفحة أي أسعار غير معتمدة ضمن خطط بيت الريف الحالية.'],
    ],
  },
};

const accentClasses = {
  emerald: 'from-emerald-50 to-white text-emerald-800 bg-emerald-700 border-emerald-200',
  blue: 'from-blue-50 to-white text-blue-800 bg-blue-700 border-blue-200',
  purple: 'from-purple-50 to-white text-purple-800 bg-purple-700 border-purple-200',
  orange: 'from-orange-50 to-white text-orange-800 bg-orange-700 border-orange-200',
};

export default function PlatformBusinessPage({ slug }) {
  const page = CONFIG[slug];
  if (!page) return null;
  const Icon = page.icon;
  const accent = accentClasses[page.accent];
  const canonical = `https://bietalreef.ae/${slug}`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-right text-gray-900">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-[#123F1D] to-[#062D17] text-white">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.35),transparent_30%)]" />
            <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
              <div className="max-w-4xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]">
                  <Sparkles className="h-4 w-4" /> {page.badge}
                </span>
                <div className="mt-7 flex items-start gap-4">
                  <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10"><Icon className="h-8 w-8 text-[#F3D46B]" /></div>
                  <div>
                    <h1 className="text-4xl font-black leading-tight md:text-6xl">{page.title}</h1>
                    <p className="mt-6 max-w-3xl text-lg leading-9 text-white/85 md:text-xl">{page.description}</p>
                  </div>
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href={page.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:-translate-y-0.5">
                    {page.cta}<ArrowLeft className="h-5 w-5" />
                  </Link>
                  <a href="#details" className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-black text-white hover:bg-white/15">{page.secondary}</a>
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="mb-10 max-w-3xl">
              <span className="text-sm font-black text-[#B8922B]">بيت الريف للأعمال</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">{page.sectionTitle}</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {page.steps.map(([number, title, text]) => (
                <article key={number} className="relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                  <span className="absolute -left-1 top-0 text-7xl font-black text-[#F3EAD6]">{number}</span>
                  <div className="relative pt-10">
                    <h3 className="text-xl font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-10 max-w-3xl">
                <span className="text-sm font-black text-[#B8922B]">المزايا والتفاصيل</span>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">كل ما تحتاجه في مسار واضح</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {page.features.map(([title, text, FeatureIcon]) => (
                  <article key={title} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.split(' ').slice(-1)[0]} bg-white`}><FeatureIcon className="h-6 w-6 text-[#0F3F1A]" /></div>
                    <h3 className="mt-5 text-xl font-black">{title}</h3>
                    <p className="mt-3 leading-8 text-gray-600">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-[2rem] bg-[#0F3F1A] p-8 text-white md:p-10">
                <h2 className="text-3xl font-black">بيت الريف معك في المكتب، في الموقع، وفي كل مكان</h2>
                <p className="mt-5 leading-9 text-white/80">استخدم منصة بيت الريف من متصفح الكمبيوتر لإدارة أعمال شركتك، واستمر من تطبيق Android أثناء وجودك في موقع العمل أو أثناء التنقل.</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-5"><Monitor className="h-7 w-7 text-[#F3D46B]"/><h3 className="mt-3 font-black">من الكمبيوتر</h3><p className="mt-2 text-sm text-white/70">إدارة أكثر راحة في المكتب.</p></div>
                  <div className="rounded-2xl bg-white/10 p-5"><Smartphone className="h-7 w-7 text-[#F3D46B]"/><h3 className="mt-3 font-black">من Android</h3><p className="mt-2 text-sm text-white/70">استمر في العمل أثناء التنقل.</p></div>
                </div>
              </div>
              <div className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8 md:p-10">
                <ShieldCheck className="h-9 w-9 text-[#0F3F1A]" />
                <h2 className="mt-5 text-2xl font-black">معلومات واضحة بلا وعود غير موثقة</h2>
                <p className="mt-4 leading-8 text-gray-700">تعتمد المزايا والنشر والحصص والخدمات على حالة الحساب والخطة والصلاحيات الفعلية. لا نعرض أرقام عملاء أو نتائج مبيعات أو ترتيب بحث كضمان.</p>
              </div>
            </div>
          </section>

          <FAQ items={page.faqs} title={`الأسئلة الشائعة حول ${page.title}`} />

          <section className="bg-[#0F3F1A] py-16 text-white">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-3xl font-black md:text-4xl">ابدأ الخطوة المناسبة لشركتك</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">اختر المسار الذي يناسب نشاطك وحالة حسابك، ثم فعّل الأدوات والخدمات التي تحتاجها فقط.</p>
              <Link href={page.ctaHref} className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">{page.cta}<ArrowLeft className="h-5 w-5" /></Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

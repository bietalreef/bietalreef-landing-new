import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WeyaakHeroCard from '../components/WeyaakHeroCard';
import { ArrowLeft, Bot, Building2, MapPinned, Search, ShoppingBag, Sparkles, UsersRound, Wrench, Globe, Zap, MessageSquare, CheckCircle } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroSlides = [
  { src: '/bait-alreef-hero-18.webp', alt: 'منصة بيت الريف لتنظيم رحلة البناء والمقاولات في الإمارات', title: 'رحلة بناء منظمة من أول سؤال' },
  { src: '/bait-alreef-construction-catalog.webp', alt: 'دليل بيت الريف لخدمات البناء والصيانة والتصميم في الإمارات', title: 'كل الأقسام في مسار واحد واضح' },
  { src: '/bait-alreef-hero-2.webp', alt: 'تصميم وتنفيذ مشاريع البناء الحديثة في الإمارات عبر بيت الريف', title: 'من الفكرة إلى اختيار المزود المناسب' },
  { src: '/images/seo/categories/interior-design.webp', alt: 'خدمات التصميم الداخلي والديكور في الإمارات عبر بيت الريف', title: 'تصميم وتشطيب ومواد ومزودون' },
];

// مسارات العميل الثلاثة - محسّنة للـ SEO و AEO
const clientPathCards = [
  { 
    title: 'بحث وتواصل مباشر مع مزودي الخدمات', 
    icon: Search,
    desc: 'تصفّح دليل شامل لمزودي الخدمات في الإمارات حسب الإمارة والمنطقة والخدمة. تواصل مباشرة عبر الهاتف أو الواتساب مع المقاولين والمتخصصين. بدون وسطاء. بدون عمولات إضافية. القرار يبقى لك دائماً.',
    cta: 'تصفّح المزودين',
    href: '/uae',
    benefits: ['تواصل مباشر بدون وسيط', 'لا توجد عمولات إضافية', 'اختيار حر من بين خيارات متعددة']
  },
  { 
    title: 'مساعدة وياك الذكية - مستشارك الرقمي', 
    icon: Bot,
    desc: 'احكِ لوياك ما تحتاجه باللغة التي تريدها وبطريقتك الخاصة. وياك يحلل طلبك بذكاء، يفهم التخصص المطلوب والمنطقة الجغرافية والميزانية، ويقترح عليك أفضل المزودين المؤهلين. كأنك تستشير خبيراً يعرف السوق الإماراتي بعمق.',
    cta: 'جرّب وياك الآن',
    href: '/weyaak',
    benefits: ['فهم ذكي لاحتياجاتك', 'توصيات مخصصة لمشروعك', 'توفير الوقت والجهد']
  },
  { 
    title: 'مناقصة داخلية مؤهلة - عروض من متخصصين', 
    icon: UsersRound,
    desc: 'حوّل طلبك إلى مناقصة داخلية تصل تلقائياً إلى مزودي الخدمة المؤهلين حسب التخصص والمنطقة الجغرافية. استقبل عروض أسعار متعددة من شركات موثوقة، قارن بينها بسهولة، واختر الأنسب لمشروعك وميزانيتك.',
    cta: 'أنشئ طلبك الآن',
    href: '/services',
    benefits: ['عروض من متخصصين معتمدين', 'مقارنة سهلة للأسعار', 'ضمان جودة الخدمة']
  },
];

// كروت مزود الخدمة - محسّنة للـ SEO و AEO
const providerFeatureCards = [
  { 
    title: 'الهوية الرقمية الاحترافية', 
    icon: Globe,
    desc: 'بناء صفحة احترافية تعكس نشاطك التجاري بشكل صحيح. ملف أعمال متكامل يشمل تخصصاتك وخدماتك ومشاريعك السابقة ومناطق تغطيتك الجغرافية. كل ما يحتاجه العميل المحتمل ليتعرف عليك ويتخذ قرار التعاون معك.',
    keywords: ['صفحة احترافية', 'ملف أعمال', 'تخصصات خدمات']
  },
  { 
    title: 'الظهور الرقمي حيث يبحث عملاؤك', 
    icon: MapPinned,
    desc: 'ظهور مستمر في المكان الذي يبحث فيه عميلك الحقيقي. سواء كان يبحث في Google عن "مقاول في دبي" أو يسأل ChatGPT عن "أفضل شركة صيانة في أبوظبي" أو Gemini أو يبحث داخل بيت الريف حسب المدينة أو الخدمة — هدفنا أن تكون أنت ضمن النتائج الأولى المناسبة.',
    keywords: ['ظهور في جوجل', 'محركات البحث', 'الذكاء الاصطناعي']
  },
  { 
    title: 'مستندات احترافية وسريعة', 
    icon: Wrench,
    desc: 'أنشئ عروض أسعار احترافية وعقود قانونية وفواتير منظمة وسندات استلام بشكل احترافي خلال دقائق معدودة. وياك يساعدك في صياغة المحتوى الصحيح وتنسيق الأرقام والبيانات. من أول عرض سعر يرسله العميل... إلى آخر فاتورة تستحقها.',
    keywords: ['عروض أسعار', 'عقود', 'فواتير']
  },
  { 
    title: 'مناقصات مطابقة لتخصصك ومنطقتك', 
    icon: ShoppingBag,
    desc: 'استقبل مناقصات وطلبات تتطابق تماماً مع تخصصاتك ومناطق تغطيتك الجغرافية تلقائياً. لا تضيع وقتك في المنافسة خارج مجالك أو في مناطق بعيدة. بيت الريف يوصلك فقط بالطلبات التي تناسب نشاطك وإمكانياتك.',
    keywords: ['مناقصات', 'طلبات عملاء', 'تخصصات']
  },
  { 
    title: 'وياك - مدير أعمالك الرقمي 24/7', 
    icon: Zap,
    desc: 'وياك ليس مجرد روبوت محادثة عادي. هو مساعد أعمالك الذكي الذي يعمل 24 ساعة يومياً: يساعدك في كتابة عروض الأسعار الاحترافية، إنشاء العقود والمستندات، الرد على استفسارات العملاء، وتنظيم عملك اليومي. كل ذلك من هاتفك الذكي أينما كنت.',
    keywords: ['مساعد ذكي', 'إدارة أعمال', 'تطبيق موبايل']
  },
];

// كروت وياك - محسّنة للـ AEO
const weyaakCards = [
  {
    title: 'وياك للعميل - فهم احتياجاتك بذكاء',
    desc: 'أخبر وياك ما تحتاجه بكلماتك أنت وبطريقتك الخاصة. هو يفهم ويحلل احتياجك بعمق، ويسألك عن التفاصيل المهمة، ويقترح عليك الحل الأنسب. لا تحتاج لتعرف الأسماء التقنية للتخصصات أو أسماء المناطق الجغرافية. فقط صف مشكلتك أو احتياجك ووياك يتولى الباقي.',
    examples: [
      'أريد تجديد الفيلا بالكامل في دبي',
      'عندي تسريب في خزان الماء - ما الحل؟',
      'أريد تصميم مجلس عربي فاخر في أبوظبي'
    ]
  },
  {
    title: 'وياك لمزود الخدمة - شريكك في النجاح',
    desc: 'وياك يساعدك في كل خطوة من خطوات عملك: يكتب عرض السعر بصيغة احترافية، يجهّز العقود والمستندات، يتابع المشاريع والمواعيد، وينظّم عملك اليومي بكفاءة. كأنك وظّفت مدير مشاريع متخصص يعمل 24 ساعة بدون تعب ولا أخطاء.',
    examples: [
      'وياك أنشأ عرض السعر بصيغة احترافية خلال دقيقة واحدة',
      'وياك كتب لي عقد صيانة دورية متكامل',
      'وياك رشح لي مناقصات تناسب تخصصي وموقعي الجغرافي'
    ]
  }
];

// قيم أساسية - محسّنة للـ SEO و AEO
const coreValues = [
  {
    title: 'نحن لا نبحث لك عن عميل',
    subtitle: 'نحن نجعل عميلك يجدك أينما بحث',
    desc: 'الفرق أساسي: بدلاً من البحث عن عملاء محتملين، نبني لك حضوراً رقمياً قوياً يجعل عميلك يجدك بسهولة عندما يبحث عن الخدمة التي تقدمها في المنطقة التي تعمل فيها.'
  },
  {
    title: 'ابنِ حضورك الرقمي حيث يبحث عملاؤك',
    subtitle: 'في Google وفي محركات الذكاء الاصطناعي',
    desc: 'حضور رقمي حقيقي ومستدام: ظهور في نتائج البحث الأولى، محتوى موثوق يستشهد به الذكاء الاصطناعي، وتقييمات حقيقية من عملاء راضين.'
  },
  {
    title: 'لسنا منصة تربطك بعميل فقط',
    subtitle: 'نحن نبني لك حضوراً رقمياً احترافياً مستداماً',
    desc: 'الفرق في النموذج: لا نبيع لك إعلاناً مؤقتاً ينتهي بانتهاء الميزانية. بل نبني لك نظاماً متكاملاً: صفحة احترافية، محتوى موجه، مستندات رقمية، مناقصات مؤهلة، وحضور دائم في محركات البحث.'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6200);
    return () => clearInterval(timer);
  }, []);

  const description = 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. من أول استفسار إلى آخر فاتورة. يساعد العملاء على الوصول للحل المناسب من خلال البحث المباشر أو وياك الذكي أو المناقصات. ويساعد مزودي الخدمة على إدارة أعمالهم وبناء حضورهم الرقمي من هاتفهم.';
  
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'بيت الريف',
      alternateName: 'Biet Alreef',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description,
      areaServed: [
        { '@type': 'City', name: 'دبي' },
        { '@type': 'City', name: 'أبوظبي' },
        { '@type': 'City', name: 'الشارقة' },
        { '@type': 'City', name: 'عجمان' },
        { '@type': 'City', name: 'أم القيوين' },
        { '@type': 'City', name: 'رأس الخيمة' },
        { '@type': 'City', name: 'الفجيرة' }
      ],
      contactPoint: { '@type': 'ContactPoint', telephone: '+971567856001', contactType: 'customer support', areaServed: 'AE', availableLanguage: ['Arabic', 'English'] },
      sameAs: ['https://www.instagram.com/bietalreef', 'https://www.facebook.com/share/14fy6hGM7SJ/', 'https://youtube.com/@bietalreef', 'https://www.tiktok.com/@bietalreef0', 'https://www.linkedin.com/in/bietalreef'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: SITE_URL,
      inLanguage: 'ar-AE',
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات',
      url: SITE_URL,
      description,
      inLanguage: 'ar-AE',
      isPartOf: { '@id': SITE_URL },
      about: ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'مزودو الخدمات في الإمارات', 'محرك أعمال رقمي'],
    },
  ];

  return (
    <>
      <SEOHead
        title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات"
        description={description}
        keywords="بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI, دبي, أبوظبي, الشارقة"
        canonicalPath="/"
        structuredData={structuredData}
      />

      <div dir="rtl" className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main>
          {/* ═══ HERO SECTION ═══ */}
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="pointer-events-none absolute -top-20 right-8 h-64 w-64 rounded-full bg-[#D4AF37]/16 blur-3xl biet-glow-orb" />
            <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-[#0F3F1A]/8 blur-3xl biet-glow-orb" />

            <div className="relative mx-auto max-w-7xl px-4 pt-1 pb-4 md:pt-6 md:pb-8 lg:py-10">
              <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
                <div className="order-2 text-center lg:order-1 lg:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/85 px-5 py-2.5 text-sm font-black tracking-wide text-[#6F5400] shadow-sm backdrop-blur">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span className="font-black uppercase tracking-[0.22em] text-[#0F3F1A]">Hi</span>
                    <span className="text-[#6F5400]">— مرحباً بك في الدار</span>
                  </div>

                  <h1 className="mt-3 text-4xl font-black leading-[1.18] tracking-[-0.035em] text-[#0F3F1A] md:text-5xl lg:text-6xl">
                    محرك الأعمال الرقمي
                    <span className="block bg-gradient-to-l from-[#0F3F1A] via-[#1B7A3A] to-[#B89200] bg-clip-text text-transparent">
                      للمقاولات والبناء
                    </span>
                  </h1>

                  <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base font-bold leading-8 text-gray-700 lg:mx-0">
                    بيت الريف ليس دليلاً عادياً فقط. هو منظومة تشغيل رقمية متكاملة تساعدك على الوصول للحل المناسب، وتساعد مزود الخدمة على إدارة نشاطه التجاري بكفاءة من هاتفه.
                  </p>

                  <WeyaakHeroCard />

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
                    <Link href="/weyaak" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm md:text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">
                      ابدأ كعميل
                      <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                    </Link>
                    <Link href="/providers" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-6 py-3 text-sm md:text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">
                      ابدأ كمزود خدمة
                      <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative mx-auto max-w-3xl">
                    <div className="absolute -inset-3 rounded-[2.6rem] bg-gradient-to-br from-[#D4AF37]/18 via-transparent to-[#0F3F1A]/12 blur-2xl" />
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-[#F7F1E8] shadow-2xl md:rounded-[2.5rem]">
                      {heroSlides.map((slide, index) => (
                        <div key={slide.src} className={`absolute inset-0 transition-opacity duration-[1800ms] ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                          <Image src={slide.src} alt={slide.alt} title={slide.title} fill className="scale-105 object-cover transition-transform duration-[6200ms] ease-linear" priority={index === 0} sizes="(max-width: 1024px) 100vw, 52vw" />
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/62 via-transparent to-white/10" />
                      <div className="absolute bottom-4 right-4 left-4 text-white md:bottom-5 md:right-5 md:left-5">
                        <p className="text-xs md:text-sm font-black text-[#F4D35E]">منصة البناء الذكية</p>
                        <h2 className="mt-1 md:mt-2 max-w-xl text-lg md:text-3xl font-black leading-tight">كل طريق يبدأ من اختيار القسم الصحيح</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ CLIENT PATHS SECTION ═══ */}
          <section className="mx-auto max-w-7xl px-4 py-4 md:py-6">
            <div className="mb-4 md:mb-6 text-center md:text-right">
              <span className="text-xs md:text-sm font-black text-[#6F5400]">للعميل</span>
              <h2 className="mt-1 md:mt-2 text-2xl md:text-4xl font-black leading-tight text-[#0F3F1A]">لكل عميل طريقه الخاص</h2>
              <p className="mt-2 md:mt-3 max-w-3xl text-xs md:text-base font-semibold leading-7 text-gray-600">
                لا تبحث في عشرات المواقع ولا تتصل بعشرات الشركات. أخبرنا باحتياجك وبيت الريف يتولى الباقي. اختر الطريقة التي تناسبك: بحث مباشر، مساعدة وياك الذكية، أو مناقصة داخلية.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-3">
              {clientPathCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} href={item.href} className="group rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                    <p className="mt-2 md:mt-3 text-xs md:text-sm font-semibold leading-6 text-gray-600">{item.desc}</p>
                    {item.benefits && (
                      <ul className="mt-3 md:mt-4 space-y-1">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#0F3F1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs md:text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">
                      {item.cta}
                      <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 md:mt-6 text-center text-xs md:text-base font-semibold text-gray-700">
              <strong className="text-[#0F3F1A]">في بيت الريف... القرار يبقى لك دائماً.</strong> أنت تختار الطريقة التي تناسبك والمزود الذي تثق به.
            </div>
          </section>

          {/* ═══ CORE VALUES SECTION ═══ */}
          <section className="bg-[#F7F2E8] py-4 md:py-6">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-4 md:mb-6 text-center md:text-right">
                <h2 className="text-2xl md:text-4xl font-black leading-tight text-[#0F3F1A]">الفرق الحقيقي بين بيت الريف والمنصات الأخرى</h2>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-3">
                {coreValues.map((value, idx) => (
                  <div key={idx} className="rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] bg-white p-4 md:p-6 shadow-sm">
                    <h3 className="text-base md:text-lg font-black text-[#0F3F1A] mb-1 md:mb-2">{value.title}</h3>
                    <p className="text-xs md:text-sm font-black text-[#6F5400] mb-2 md:mb-3">{value.subtitle}</p>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-gray-600">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ PROVIDER SECTION ═══ */}
          <section className="bg-[#0F3F1A] py-4 text-white md:py-6">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-4 md:mb-6 text-center md:text-right">
                <span className="text-xs md:text-sm font-black text-[#F4D35E]">لمزود الخدمة</span>
                <h2 className="mt-1 md:mt-2 text-2xl md:text-4xl font-black leading-tight text-white">أدر نشاطك التجاري بالكامل من هاتفك</h2>
                <p className="mt-2 md:mt-3 max-w-3xl text-xs md:text-base font-semibold leading-7 text-white/78">
                  هل ما زلت تدير أعمالك بالواتساب والورق والمذكرات؟ بيت الريف يمنحك منظومة عمل متكاملة: صفحة احترافية، محتوى موجه لمحركات البحث والذكاء الاصطناعي، مستندات رقمية احترافية، مناقصات مؤهلة، ومساعد أعمال ذكي يساعدك على تنظيم عملك وتنميته.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {providerFeatureCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-white/8 p-4 md:p-6 backdrop-blur transition hover:bg-white/12">
                      <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-[#F4D35E]/15 text-[#F4D35E]">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-base md:text-lg font-black">{item.title}</h3>
                      <p className="mt-2 md:mt-3 text-xs md:text-sm font-semibold leading-6 text-white/70">{item.desc}</p>
                      {item.keywords && (
                        <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
                          {item.keywords.map((keyword, idx) => (
                            <span key={idx} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ PERMANENT PRESENCE SECTION ═══ */}
          <section className="mx-auto max-w-7xl px-4 py-4 md:py-6">
            <div className="mb-4 md:mb-6 text-center md:text-right">
              <h2 className="text-2xl md:text-4xl font-black text-[#0F3F1A]">لا نبيع لك إعلاناً مؤقتاً</h2>
              <p className="mt-2 md:mt-3 max-w-3xl mx-auto font-semibold leading-7 text-gray-600 text-xs md:text-base">
                نبني لك حضوراً رقمياً دائماً ومستداماً
              </p>
            </div>

            <div className="rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] bg-white p-4 md:p-8 shadow-sm">
              <p className="text-xs md:text-base font-semibold leading-7 text-gray-700 mb-4 md:mb-6">
                الحملات الإعلانية التقليدية تنتهي بانتهاء الميزانية وتختفي معها. أما بيت الريف فيبني لك حضوراً رقمياً يستمر ويتنمى: تخصصات واضحة، صفحة احترافية، محتوى يخدم نشاطك، ظهور داخل Google ومحركات الذكاء الاصطناعي، وأدوات تشغيل تساعدك على إدارة عملك بكفاءة.
              </p>

              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                <div className="p-3 md:p-4 rounded-xl bg-red-50 border border-red-200">
                  <h3 className="text-sm md:text-lg font-black text-red-900 mb-2">النموذج القديم (الإعلانات)</h3>
                  <p className="text-xs md:text-sm font-semibold text-red-800 leading-6">
                    ادفع إعلاناً → يزورك بعض العملاء → تنتهي الحملة → ينتهي الظهور ← تضيع أموالك
                  </p>
                </div>
                <div className="p-3 md:p-4 rounded-xl bg-green-50 border border-green-200">
                  <h3 className="text-sm md:text-lg font-black text-green-900 mb-2">نموذج بيت الريف (الحضور الدائم)</h3>
                  <p className="text-xs md:text-sm font-semibold text-green-800 leading-6">
                    ابنِ ملفك → ثبّت تخصصاتك → انشر أعمالك → أنشئ محتوى → أنشئ مستندات → احصل على حضور دائم → تظهر حيث يبحث العملاء
                  </p>
                </div>
              </div>

              <p className="mt-4 md:mt-6 text-center text-sm md:text-base font-black text-[#0F3F1A]">
                غيّر طريقة إدارة أعمالك... وليس فقط طريقة الإعلان عنها.
              </p>
            </div>
          </section>

          {/* ═══ WEYAAK SECTION ═══ */}
          <section className="bg-[#F7F2E8] py-4 md:py-6">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-4 md:mb-6 text-center md:text-right">
                <h2 className="text-2xl md:text-4xl font-black leading-tight text-[#0F3F1A]">وياك... بطل مختلف عن أي مساعد</h2>
                <p className="mt-2 md:mt-3 max-w-3xl mx-auto text-xs md:text-base font-semibold leading-7 text-gray-600">
                  وياك ليس Chatbot عادي. وياك هو مدير أعمالك الرقمي الذكي. للعميل: يحلل احتياجك، يفهم التخصص والمكان والميزانية، ويقترح الأنسب. لمزود الخدمة: يساعدك في كتابة عروض الأسعار، إنشاء المستندات، الرد على العملاء، وتنظيم عملك.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                {weyaakCards.map((card) => (
                  <div key={card.title} className="rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] bg-white p-4 md:p-6 shadow-sm">
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2 md:mb-3">{card.title}</h3>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-gray-600 mb-3 md:mb-4">{card.desc}</p>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs font-black text-[#6F5400] mb-2">أمثلة واقعية:</p>
                      {card.examples.map((example, idx) => (
                        <div key={idx} className="flex gap-2 text-xs md:text-sm text-gray-600">
                          <span className="text-[#0F3F1A] font-black flex-shrink-0">✓</span>
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA SECTION ═══ */}
          <section className="mx-auto max-w-7xl px-4 py-4 md:py-6">
            <div className="rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] bg-white p-4 md:p-10 shadow-sm text-center">
              <h2 className="text-2xl md:text-4xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                كل أعمال البناء والمقاولات في منصة واحدة
              </h2>
              <p className="text-xs md:text-base font-semibold text-gray-600 mb-6 md:mb-8">
                من أول استفسار... إلى آخر فاتورة. بيت الريف هو نظام التشغيل الرقمي لقطاع المقاولات والبناء في الإمارات العربية المتحدة.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Link href="/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm md:text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">
                  ابدأ كعميل
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </Link>
                <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-6 py-3 text-sm md:text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F3F1A]">
                  ابدأ كمزود خدمة
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

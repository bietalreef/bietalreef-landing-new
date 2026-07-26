import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import WeyaakHeroCard from '../WeyaakHeroCard';
import PlatformStoryVideo from '../PlatformStoryVideo';
import { ArrowLeft, ArrowRight, Bot, Building2, Compass, Languages, MapPinned, Search, ShoppingBag, Sparkles, UsersRound, Wrench, CheckCircle, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const premiumHeroSlides = [
  { src: '/images/bietalreef-option-one-villa.webp', alt: 'فيلا إماراتية فاخرة بهوية معمارية معاصرة' },
  { src: '/hero-villa-1.webp', alt: 'فيلا حديثة ضمن تجربة منصة بيت الريف الذكية' },
];

const gatewayCards = [
  { title: 'دليل الإمارات', desc: 'ابدأ من المكان: الإمارة، المدينة، المنطقة، ثم الخدمة المناسبة لمشروعك.', href: '/uae', icon: MapPinned, label: 'بحث حسب المكان', image: '/images/gateway/uae-directory-gateway.webp', imageAlt: 'خريطة الإمارات ثلاثية الأبعاد لدليل الإمارات داخل بيت الريف' },
  { title: 'مزودو الخدمات', desc: 'أدر نشاطك التجاري من هاتفك، وابنِ حضورك الرقمي، واستقبل الطلبات والمناقصات من العملاء الذين يبحثون عن خدماتك.', href: '/providers', icon: UsersRound, label: 'حضور رقمي', image: '/images/gateway/providers-gateway.webp', imageAlt: 'مزودو خدمات البناء والمقاولات داخل بيت الريف' },
  { title: 'الخدمات والعروض', desc: 'اختر الخدمة المطلوبة، ثم تواصل مباشرة أو اطلب من وياك تحويل احتياجك إلى مسار واضح.', href: '/services', icon: Wrench, label: 'طلب خدمة', image: '/images/gateway/services-offers-gateway.webp', imageAlt: 'خدمات وعروض البناء والصيانة والتشطيبات في بيت الريف' },
  { title: 'المنتجات والمتاجر', desc: 'تصفح مواد البناء والتشطيب والمنتجات حسب الفئة والاحتياج، وابدأ طلب عرض السعر بسهولة.', href: '/marketplace', icon: ShoppingBag, label: 'مواد ومنتجات', image: '/images/gateway/materials-products-gateway.webp', imageAlt: 'مواد البناء والمنتجات والمتاجر داخل بيت الريف' },
];

const introModels = [
  { title: 'دليل الإمارات', desc: 'ابدأ من المكان', image: '/images/gateway/uae-directory-gateway.webp', href: '/uae', icon: MapPinned },
  { title: 'مزودون موثوقون', desc: 'شركات وورش', image: '/images/gateway/providers-gateway.webp', href: '/providers', icon: UsersRound },
  { title: 'خدمات وعروض', desc: 'طلب أو مقارنة', image: '/images/gateway/services-offers-gateway.webp', href: '/services', icon: Wrench },
  { title: 'منتجات ومتاجر', desc: 'مواد وموردون', image: '/images/gateway/materials-products-gateway.webp', href: '/marketplace', icon: ShoppingBag },
];

const clientJourneyCards = [
  { title: 'بحث وتواصل مباشر', desc: 'ابحث كما تريد... واتخذ القرار بنفسك. تواصل بحرية مع مزودي الخدمة المناسبين.', icon: Search },
  { title: 'مساعدة وياك الذكية', desc: 'دع وياك يتولى المهمة. يفهم احتياجك، يسألك عن التفاصيل، ويرشدك إلى المسار الأنسب.', icon: Bot },
  { title: 'مناقصة داخلية مؤهلة', desc: 'حوّل طلبك إلى مناقصة تصل لمن يخص خدمتك حسب النشاط والمنطقة والتخصص.', icon: UsersRound },
];

const providerPresenceCards = [
  { title: 'حضورك حيث يبحث عميلك', desc: 'لا نبيع لك إعلاناً... نبني لك حضوراً رقمياً دائماً في Google، والذكاء الاصطناعي، وبيت الريف.', icon: MapPinned },
  { title: 'أدوات تشغيل من هاتفك', desc: 'أدر نشاطك التجاري بالكامل من هاتفك. ملف مهني، طلبات، عروض أسعار، ومتابعة أعمالك.', icon: Building2 },
  { title: 'محتوى موجه للبحث والذكاء الاصطناعي', desc: 'نساعد تخصصك على الظهور عبر محتوى منظم يخدم Google ومحركات الذكاء الاصطناعي.', icon: Sparkles },
];

const experienceCards = [
  { title: 'مسار واضح', desc: 'كل زائر يبدأ من بوابة مفهومة بدل التشتت بين الصفحات.', icon: Search },
  { title: 'وياك حاضر', desc: 'المساعد الذكي يربط السؤال بالقسم المناسب داخل المنصة.', icon: Compass },
  { title: 'هوية عربية', desc: 'تصميم يحافظ على اتجاه وتجربة بيت الريف حتى مع تعدد اللغات.', icon: Languages },
  { title: 'قابل للنمو', desc: 'كل قسم مرتبط بمحتوى وبيانات منظمة قابلة للتوسع والتحديث.', icon: Building2 },
];

const trustBadges = [
  { title: 'ثقة', desc: 'مزودون أوضح', icon: ShieldCheck },
  { title: 'أمان', desc: 'تواصل منظم', icon: CheckCircle },
  { title: 'بدون عمولة', desc: 'شفافية في التواصل', icon: Sparkles },
];

const englishCopy = {
  heroSlides: [
    { src: '/images/bietalreef-option-one-villa.webp', alt: 'Contemporary luxury villa in the UAE' },
    { src: '/hero-villa-1.webp', alt: 'Modern villa representing the Biet Al Reef smart platform' },
  ],
  gatewayCards: [
    { title: 'UAE Directory', desc: 'Start with the place: emirate, city and area, then choose the right service for your project.', href: '/en/uae', icon: MapPinned, label: 'Search by place', image: '/images/gateway/uae-directory-gateway.webp', imageAlt: '3D UAE map for the Biet Al Reef directory' },
    { title: 'Service Providers', desc: 'Manage your business from your phone, build a digital presence and receive relevant customer requests.', href: '/en/providers', icon: UsersRound, label: 'Digital presence', image: '/images/gateway/providers-gateway.webp', imageAlt: 'Construction service providers on Biet Al Reef' },
    { title: 'Services & Offers', desc: 'Choose a service, contact a provider directly or let Weyaak turn your need into a clear path.', href: '/en/services', icon: Wrench, label: 'Request a service', image: '/images/gateway/services-offers-gateway.webp', imageAlt: 'Construction, maintenance and finishing services on Biet Al Reef' },
    { title: 'Products & Stores', desc: 'Browse building and finishing materials by category and request a quotation with ease.', href: '/en/marketplace', icon: ShoppingBag, label: 'Materials & products', image: '/images/gateway/materials-products-gateway.webp', imageAlt: 'Building materials, products and stores on Biet Al Reef' },
  ],
  introModels: [
    { title: 'UAE Directory', desc: 'Start by place', image: '/images/gateway/uae-directory-gateway.webp', href: '/en/uae', icon: MapPinned },
    { title: 'Trusted Providers', desc: 'Companies & workshops', image: '/images/gateway/providers-gateway.webp', href: '/en/providers', icon: UsersRound },
    { title: 'Services & Offers', desc: 'Request or compare', image: '/images/gateway/services-offers-gateway.webp', href: '/en/services', icon: Wrench },
    { title: 'Products & Stores', desc: 'Materials & suppliers', image: '/images/gateway/materials-products-gateway.webp', href: '/en/marketplace', icon: ShoppingBag },
  ],
  clientJourneyCards: [
    { title: 'Search and contact directly', desc: 'Browse freely, choose the suitable provider and contact them directly.', icon: Search },
    { title: 'Smart help from Weyaak', desc: 'Weyaak understands your need, asks for the details and guides you to the right path.', icon: Bot },
    { title: 'Qualified internal request', desc: 'Turn your need into a structured request matched by activity, area and specialty.', icon: UsersRound },
  ],
  providerPresenceCards: [
    { title: 'Be present where clients search', desc: 'We build a lasting presence across Google, AI engines and Biet Al Reef—not a temporary ad.', icon: MapPinned },
    { title: 'Operate from your phone', desc: 'Manage a professional profile, requests, quotations and business follow-up from your phone.', icon: Building2 },
    { title: 'Content structured for search and AI', desc: 'We help search engines and AI systems understand and discover your specialty.', icon: Sparkles },
  ],
  experienceCards: [
    { title: 'A clear path', desc: 'Every visitor starts from an understandable gateway instead of scattered pages.', icon: Search },
    { title: 'Weyaak is available', desc: 'The smart assistant connects each question to the right section of the platform.', icon: Compass },
    { title: 'One visual identity', desc: 'The English experience preserves the same trusted Biet Al Reef interface.', icon: Languages },
    { title: 'Built to grow', desc: 'Every section is connected to structured content that can expand and stay current.', icon: Building2 },
  ],
  trustBadges: [
    { title: 'Trust', desc: 'Clearer providers', icon: ShieldCheck },
    { title: 'Safe', desc: 'Organised contact', icon: CheckCircle },
    { title: 'No commission', desc: 'Transparent contact', icon: Sparkles },
  ],
  seo: {
    title: 'Biet Al Reef | UAE digital business engine for construction',
    description: 'Biet Al Reef helps customers discover and contact UAE construction providers and helps providers build a structured, lasting digital presence.',
    keywords: 'Biet Al Reef, UAE construction, service providers, UAE directory, building materials, interior design, maintenance, Weyaak AI',
    ogImage: `${SITE_URL}/hero-villa-1.webp`,
  },
};

const arabicCopy = {
  heroSlides: premiumHeroSlides,
  gatewayCards,
  introModels,
  clientJourneyCards,
  providerPresenceCards,
  experienceCards,
  trustBadges,
  seo: {
    title: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات',
    description: 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. يساعد العميل على البحث والتواصل أو تحويل احتياجه إلى مناقصة داخلية، ويساعد مزود الخدمة على بناء حضور رقمي منظم ومستدام.',
    keywords: 'بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI',
    ogImage: `${SITE_URL}/hero-villa-1.webp`,
  },
};

const pageText = {
  ar: {
    eyebrow: 'ابدأ من هنا', gatewayTitle: 'اختر بوابة بيت الريف المناسبة', gatewayText: 'كل طريق يبدأ من اختيار القسم الصحيح: مكان، مزود، خدمة، أو منتج.', explore: 'استكشف الآن',
    providerEyebrow: 'لصاحب النشاط التجاري', providerTitle: 'هل تعمل في مجال المقاولات أو البناء؟', providerText: 'تغيّرت قواعد الظهور في السوق. لم يعد نشاطك بحاجة إلى إعلان مؤقت فقط، بل إلى حضور رقمي منظم يستطيع العملاء ومحركات البحث وأنظمة الذكاء الاصطناعي فهمه والوصول إليه في أي وقت. انضم إلى بيت الريف، وسنساعدك في تقديم خدماتك ومشاريعك ومناطق عملك داخل ملف مهني واضح، وبناء محتوى قابل للاكتشاف على المنصة وGoogle ومحركات الذكاء الاصطناعي. حضور رقمي مستدام لا يتوقف بانتهاء حملة إعلانية، وتتحسن فعاليته مع اكتمال بيانات نشاطك وجودة محتواه.',
    providerPrimaryAction: 'ابدأ تجهيز ملف نشاطك', providerSecondaryAction: 'تعرّف على خطط الانضمام',
    experienceTitle: 'لا نبيع لك إعلاناً مؤقتاً', experienceText: 'الحملات الإعلانية تنتهي بانتهاء الميزانية. أما بيت الريف فيبني لك حضوراً رقمياً مستداماً يعتمد على تخصصك، خدماتك، محتواك، مستنداتك، وسمعتك المهنية.',
    h1: 'منصة بيت الريف الذكية', heroText: <>كل ما يحتاجه مشروعك في مكان واحد:<br />مزود، خدمة، منتج، أو مسار واضح مع وياك.</>, heroTitle: <>ابحث... تواصل مباشر<br />أو دع وياك يتولى المهمة</>,
    weyaakAction: 'تحدث مع وياك الآن', providerAction: 'ابدأ كمزود خدمة',
  },
  en: {
    eyebrow: 'Start here', gatewayTitle: 'Choose the right Biet Al Reef gateway', gatewayText: 'Every journey starts from the right section: place, provider, service or product.', explore: 'Explore now',
    providerEyebrow: 'For business owners', providerTitle: 'Do you work in construction or contracting?', providerText: 'The rules of market visibility have changed. Your business needs more than a temporary advertisement; it needs a structured digital presence that customers, search engines and AI systems can understand and discover at any time. Join Biet Al Reef and we will help present your services, projects and coverage areas in a clear professional profile, with discoverable content across the platform, Google and AI search engines. It is a lasting presence that does not end with an advertising campaign and becomes more effective as your business information and content improve.',
    providerPrimaryAction: 'Start building your business profile', providerSecondaryAction: 'Explore membership plans',
    experienceTitle: 'We do not sell temporary advertising', experienceText: 'Advertising stops when its budget ends. Biet Al Reef builds a lasting digital presence around your specialty, services, content, documents and professional reputation.',
    h1: 'Biet Al Reef Smart Platform', heroText: <>Everything your project needs in one place:<br />a provider, service, product or a clear path with Weyaak.</>, heroTitle: <>Search and contact directly...<br />or let Weyaak handle the journey</>,
    weyaakAction: 'Talk to Weyaak now', providerAction: 'Start as a service provider',
  },
};

function GatewayCard({ card, explore, isEnglish = false }) {
  const Icon = card.icon;

  return (
    <Link key={card.href} href={card.href} dir={isEnglish ? 'ltr' : 'rtl'} className={`group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${isEnglish ? 'text-left' : 'text-right'}`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F2E8]">
        <Image src={card.image} alt={card.imageAlt || card.title} fill className="object-cover object-center transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/25 via-transparent to-white/5" />
        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/55 bg-[#0F3F1A]/95 text-[#F7E7A0] shadow-[0_18px_34px_rgba(15,63,26,0.32)] backdrop-blur-xl transition group-hover:scale-105 md:h-16 md:w-16">
          <Icon className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 mx-4 -mt-7 rounded-[1.65rem] border border-[#D4AF37]/50 bg-[#0F3F1A]/95 p-2.5 shadow-[0_18px_40px_rgba(15,63,26,0.28)] backdrop-blur-xl md:mx-5 md:-mt-8">
        <div className="grid grid-cols-2 items-center gap-2 md:gap-3">
          <span className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black text-white shadow-inner backdrop-blur-xl md:text-base">
            <Icon className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
            {card.title}
          </span>
          <span className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-[#143D1F]/90 px-3 py-2 text-sm font-black text-white shadow-[0_0_24px_rgba(212,175,55,0.22)] backdrop-blur-xl md:text-base">
            {explore}
            <Search className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className={`px-6 pb-6 pt-4 ${isEnglish ? 'text-left' : 'text-right'}`}>
        <p className="text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
      </div>
    </Link>
  );
}

export default function HomePage({ locale = 'ar' }) {
  const language = locale === 'en' ? 'en' : 'ar';
  const isEnglish = language === 'en';
  const content = isEnglish ? englishCopy : arabicCopy;
  const t = pageText[language];
  const Arrow = isEnglish ? ArrowRight : ArrowLeft;
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % content.heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [content.heroSlides.length]);

  const description = content.seo.description;
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', alternateName: isEnglish ? 'بيت الريف' : 'Biet Al Reef', url: SITE_URL, logo: `${SITE_URL}/logo.png`, description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', url: isEnglish ? `${SITE_URL}/en` : SITE_URL, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}${isEnglish ? '/en' : ''}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', name: content.seo.title, url: isEnglish ? `${SITE_URL}/en` : SITE_URL, description, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', about: isEnglish ? ['construction', 'contracting', 'maintenance', 'interior design', 'building materials', 'UAE service providers'] : ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'مزودو الخدمات في الإمارات'] },
  ];

  return (
    <>
      <SEOHead title={content.seo.title} description={description} keywords={content.seo.keywords} ogImage={content.seo.ogImage} canonicalPath={isEnglish ? '/en' : '/'} structuredData={structuredData} />
      <div dir={isEnglish ? 'ltr' : 'rtl'} lang={isEnglish ? 'en' : 'ar'} className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar locale={language} />
        <main className="-mt-[1px]">
          <section className="relative isolate overflow-hidden border-b border-[#E6DCC8] bg-[#FAF7F0]">
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_78%_20%,rgba(212,175,55,.14),transparent_34%)]" />
            <div className="relative mx-auto grid max-w-[1440px] md:min-h-[650px] md:grid-cols-[1fr_1fr] md:items-stretch" dir="rtl">
              <div className="relative order-1 min-h-[300px] overflow-hidden rounded-b-[2.2rem] border-b border-[#D4AF37]/45 sm:min-h-[330px] md:order-2 md:min-h-0 md:rounded-bl-[45%] md:rounded-br-none md:border-b-0 md:border-l">
                {content.heroSlides.map((slide, index) => (
                  <div key={slide.src} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out motion-reduce:transition-none ${index === heroSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      quality={65}
                      className={`object-cover object-center transition-transform duration-[6500ms] ease-linear motion-reduce:transition-none ${index === heroSlide ? 'scale-[1.045]' : 'scale-100'}`}
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#073F3E]/24 via-transparent to-white/5" />
              </div>

              <div dir={isEnglish ? 'ltr' : 'rtl'} className={`order-2 flex items-center px-4 pb-9 pt-7 text-center md:order-1 md:px-12 md:py-16 lg:px-20 ${isEnglish ? 'md:text-left' : 'md:text-right'}`}>
                <div className={`mx-auto w-full max-w-xl ${isEnglish ? 'md:ml-0' : 'md:mr-0'}`}>
                  <div className="mb-5 hidden items-center gap-4 text-[#C79A45] md:flex"><span className="h-px flex-1 bg-[#C79A45]/55" /><span className="text-xl">✦</span><span className="h-px flex-1 bg-[#C79A45]/55" /></div>
                  <h1 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.h1}</h1>
                  <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-gray-700 md:mx-0 md:text-xl">{t.heroText}</p>
                  <h2 className="mt-5 text-2xl font-black leading-tight text-[#0F3F1A] md:mt-8 md:text-4xl">{t.heroTitle}</h2>
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-auto -mt-1 max-w-[1440px] px-3 pb-5 md:-mt-28 md:px-8 md:pb-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2 md:gap-4" dir={isEnglish ? 'ltr' : 'rtl'}>
                {content.introModels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      aria-label={`${item.title}: ${item.desc}`}
                      className={`grid min-h-[136px] min-w-0 grid-rows-[76px_1fr] overflow-hidden rounded-2xl border border-[#DED4C2] bg-white/95 shadow-[0_12px_30px_rgba(32,42,39,.08)] backdrop-blur transition active:scale-[.99] sm:min-h-[116px] sm:grid-rows-[64px_1fr] md:min-h-0 md:grid-cols-[42%_58%] md:grid-rows-1 md:rounded-[1.4rem] md:hover:-translate-y-0.5 md:hover:shadow-lg ${isEnglish ? 'text-left' : 'text-right'}`}
                    >
                      <div className="relative h-[76px] overflow-hidden bg-[#F3EBDD] sm:h-16 md:h-36">
                        <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width: 639px) 50vw, (max-width: 768px) 25vw, 150px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/20 to-transparent" />
                      </div>
                      <div className={`flex min-w-0 flex-col items-center justify-center px-2 py-2 text-center md:items-start md:px-4 ${isEnglish ? 'md:text-left' : 'md:text-right'}`}>
                        <Icon className="mb-1 hidden h-6 w-6 text-[#0F3F1A] md:block" aria-hidden="true" />
                        <p className="text-xs font-black leading-5 text-[#0F3F1A] min-[390px]:text-sm sm:text-xs md:text-base md:leading-5">{item.title}</p>
                        <p className="hidden text-xs font-semibold leading-5 text-gray-500 md:block">{item.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto mt-4 max-w-5xl px-4 md:mt-5">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white/96 px-5 py-6 text-center shadow-xl shadow-[#0F3F1A]/7 backdrop-blur md:px-10 md:py-10">
              <WeyaakHeroCard locale={language} />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={`${isEnglish ? '/en' : ''}/weyaak`} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">{t.weyaakAction}<Arrow className="h-5 w-5" aria-hidden="true" /></Link>
                <Link href={`${isEnglish ? '/en' : ''}/providers`} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">{t.providerAction}<Arrow className="h-5 w-5" aria-hidden="true" /></Link>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-[#E6DCC8] bg-[#FDFBF7] p-2 md:gap-3 md:p-3">
                {content.trustBadges.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm"><Icon className="mx-auto mb-2 h-5 w-5 text-[#0F3F1A]" aria-hidden="true" /><p className="text-sm font-black text-[#0F3F1A]">{item.title}</p><p className="mt-1 hidden text-xs font-semibold text-gray-500 sm:block">{item.desc}</p></div>; })}
              </div>
            </div>
          </section>

          <section className="deferred-section mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className={`mb-6 text-center ${isEnglish ? 'md:text-left' : 'md:text-right'}`}><span className="text-sm font-black text-[#6F5400]">{t.eyebrow}</span><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">{t.gatewayTitle}</h2><p className="mt-4 max-w-4xl text-base leading-8 text-gray-600 md:text-lg">{t.gatewayText}</p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {content.gatewayCards.map((card) => <GatewayCard key={card.href} card={card} explore={t.explore} isEnglish={isEnglish} />)}
            </div>
          </section>

          <section className="deferred-section mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{content.clientJourneyCards.map((item) => { const Icon = item.icon; return <div key={item.title} dir={isEnglish ? 'ltr' : 'rtl'} className={`rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition-shadow hover:shadow-md ${isEnglish ? 'text-left' : 'text-right'}`}><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
          </section>

          <PlatformStoryVideo locale={language} />

          <section className="deferred-section bg-[#FDFBF7] py-12 text-gray-900 md:py-18">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-7 text-center md:mb-10"><span className="text-sm font-black text-[#6F5400]">{t.providerEyebrow}</span><h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.providerTitle}</h2><p className="mx-auto mt-5 max-w-5xl text-base font-semibold leading-9 text-gray-600 md:text-lg">{t.providerText}</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><Link href={`${isEnglish ? '/en' : ''}/providers/register`} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0F4C4A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#17615E]">{t.providerPrimaryAction}</Link><Link href={`${isEnglish ? '/en' : ''}/pricing`} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#D8C59F] bg-white px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#FFF9E8]">{t.providerSecondaryAction}</Link></div></div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {content.providerPresenceCards.map((item) => { const Icon = item.icon; return <div key={item.title} dir={isEnglish ? 'ltr' : 'rtl'} className={`relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${isEnglish ? 'text-left' : 'text-right'}`}><div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-[#D4AF37]/10" /><div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2E8] text-[#B0912F] shadow-sm ${isEnglish ? 'mr-auto' : 'ml-auto'}`}><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="relative text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="relative mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}
              </div>
            </div>
          </section>

          <section className="deferred-section bg-white py-12 md:py-18"><div className="mx-auto max-w-7xl px-4"><div className="mb-8 text-center"><h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">{t.experienceTitle}</h2><p className="mx-auto mt-4 max-w-3xl font-semibold leading-8 text-gray-600">{t.experienceText}</p></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">{content.experienceCards.map((item) => { const Icon = item.icon; return <div key={item.title} dir={isEnglish ? 'ltr' : 'rtl'} className={`rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 shadow-sm ${isEnglish ? 'text-left' : 'text-right'}`}><div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EEDC] text-[#0F4C4A] ${isEnglish ? 'mr-auto' : 'ml-auto'}`}><Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" /></div><h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm leading-8 text-gray-600">{item.desc}</p></div>; })}</div></div></section>
        </main>
        <Footer locale={language} showRequestCTA={false} />
      </div>
    </>
  );
}

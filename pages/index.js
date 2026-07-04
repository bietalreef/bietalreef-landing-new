import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WeyaakHeroCard from '../components/WeyaakHeroCard';
import { ArrowLeft, Bot, Building2, MapPinned, Search, ShoppingBag, Sparkles, UsersRound, Wrench, CheckCircle, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroSlides = [
  { src: '/bait-alreef-hero-18.webp', alt: 'منصة بيت الريف لتنظيم رحلة البناء والمقاولات في الإمارات', title: 'كل طريق يبدأ من اختيار القسم الصحيح' },
  { src: '/bait-alreef-construction-catalog.webp', alt: 'دليل بيت الريف لخدمات البناء والصيانة والتصميم في الإمارات', title: 'كل الأقسام في مسار واحد واضح' },
  { src: '/bait-alreef-hero-2.webp', alt: 'تصميم وتنفيذ مشاريع البناء الحديثة في الإمارات عبر بيت الريف', title: 'من الفكرة إلى اختيار المزود المناسب' },
  { src: '/images/seo/categories/interior-design.webp', alt: 'خدمات التصميم الداخلي والديكور في الإمارات عبر بيت الريف', title: 'تصميم وتشطيب ومواد ومزودون' },
];

const gatewayCards = [
  { title: 'دليل الإمارات', desc: 'ابدأ من المكان: الإمارة، المدينة، المنطقة، ثم الخدمة المناسبة لمشروعك.', href: '/uae', icon: MapPinned, label: 'بحث حسب المكان' },
  { title: 'مزودو الخدمات', desc: 'أدر نشاطك التجاري من هاتفك، وابنِ حضورك الرقمي، واستقبل الطلبات والمناقصات من العملاء الذين يبحثون عن خدماتك.', href: '/providers', icon: UsersRound, label: 'حضور رقمي' },
  { title: 'الخدمات والعروض', desc: 'اختر الخدمة المطلوبة، ثم تواصل مباشرة أو اطلب من وياك تحويل احتياجك إلى مسار واضح.', href: '/services', icon: Wrench, label: 'طلب خدمة' },
  { title: 'المنتجات والمتاجر', desc: 'تصفح مواد البناء والتشطيب والمنتجات حسب الفئة والاحتياج، وابدأ طلب عرض السعر بسهولة.', href: '/marketplace', icon: ShoppingBag, label: 'مواد ومنتجات' },
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
  { title: 'وياك حاضر', desc: 'المساعد الذكي يربط السؤال بالقسم المناسب داخل المنصة.', icon: Bot },
  { title: 'هوية عربية', desc: 'تصميم يحافظ على اتجاه وتجربة بيت الريف حتى مع تعدد اللغات.', icon: Sparkles },
  { title: 'قابل للنمو', desc: 'كل قسم جاهز لاحقًا للربط مع التطبيق وقاعدة البيانات.', icon: Building2 },
];

const trustBadges = [
  { title: 'ثقة', desc: 'مزودون أوضح', icon: ShieldCheck },
  { title: 'أمان', desc: 'تواصل منظم', icon: CheckCircle },
  { title: 'بدون عمولة', desc: 'شفافية في التواصل', icon: Sparkles },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6200);
    return () => clearInterval(timer);
  }, []);

  const description = 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. يساعد العميل على البحث والتواصل أو تحويل احتياجه إلى مناقصة داخلية، ويساعد مزود الخدمة على إدارة نشاطه من هاتفه وبناء حضور رقمي مستدام.';
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'بيت الريف', alternateName: 'Biet Alreef', url: SITE_URL, logo: `${SITE_URL}/logo.png`, description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, contactPoint: { '@type': 'ContactPoint', telephone: '+971567856001', contactType: 'customer support', areaServed: 'AE', availableLanguage: ['Arabic', 'English'] }, sameAs: ['https://www.instagram.com/bietalreef', 'https://www.facebook.com/share/14fy6hGM7SJ/', 'https://youtube.com/@bietalreef', 'https://www.tiktok.com/@bietalreef0', 'https://www.linkedin.com/in/bietalreef'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL, inLanguage: 'ar-AE', potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', name: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات', url: SITE_URL, description, inLanguage: 'ar-AE', isPartOf: { '@id': SITE_URL }, about: ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'مزودو الخدمات في الإمارات', 'محرك أعمال رقمي'] },
  ];

  return (
    <>
      <SEOHead title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات" description={description} keywords="بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI" canonicalPath="/" structuredData={structuredData} />
      <div dir="rtl" className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main className="-mt-[1px]">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] pt-0">
            <div className="relative mx-auto max-w-7xl px-0 md:px-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-b-[2rem] border-b border-[#E6DCC8] bg-[#F7F1E8] shadow-xl shadow-[#0F3F1A]/8 md:aspect-[16/7] md:rounded-[2.75rem] md:border">
                {heroSlides.map((slide, index) => (
                  <div key={slide.src} className={`absolute inset-0 transition-opacity duration-[1600ms] ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <Image src={slide.src} alt={slide.alt} title={slide.title} fill priority={index === 0} className="scale-105 object-cover object-center transition-transform duration-[6200ms] ease-linear" sizes="100vw" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F3F1A]/10 via-[#0F3F1A]/18 to-[#0F3F1A]/62" />
                <div className="absolute inset-x-0 top-3 z-10 flex justify-center px-4 md:top-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/88 px-4 py-2 text-xs font-black tracking-wide text-[#6F5400] shadow-sm backdrop-blur md:px-5 md:py-2.5 md:text-sm"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>مرحباً بك في الدار</span></div>
                </div>
                <div className="absolute inset-x-0 bottom-5 z-10 px-5 text-center text-white md:bottom-9">
                  <p className="text-sm font-black text-[#F4D35E] drop-shadow md:text-base">منصة البناء الذكية</p>
                  <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-black leading-tight drop-shadow-lg md:text-6xl">منصة بيت الريف الذكية</h1>
                  <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-7 text-white/92 md:text-lg">كل ما يحتاجه مشروعك في مكان واحد: مزود، خدمة، منتج، أو مسار واضح مع وياك.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative z-10 mx-auto -mt-4 max-w-5xl px-4 md:-mt-8">
            <div className="rounded-t-[2rem] border border-[#E6DCC8] bg-white/96 px-5 py-6 text-center shadow-xl shadow-[#0F3F1A]/7 backdrop-blur md:px-10 md:py-10">
              <p className="mx-auto max-w-3xl text-base font-bold leading-8 text-gray-700 md:text-lg">نحن لا نربطك بعميل فقط... <span className="text-[#0F3F1A] font-black">نبني لك حضوراً رقمياً دائماً</span> حيث يبحث عنك عملاؤك.</p>
              <WeyaakHeroCard />
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/weyaak" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">تحدث مع وياك الآن<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                <Link href="/providers" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">ابدأ كمزود خدمة<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-[#E6DCC8] bg-[#FDFBF7] p-2 md:gap-3 md:p-3">
                {trustBadges.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm"><Icon className="mx-auto mb-2 h-5 w-5 text-[#0F3F1A]" aria-hidden="true" /><p className="text-sm font-black text-[#0F3F1A]">{item.title}</p><p className="mt-1 hidden text-xs font-semibold text-gray-500 sm:block">{item.desc}</p></div>; })}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-6 text-center md:text-right"><span className="text-sm font-black text-[#6F5400]">ابدأ من هنا</span><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">اختر بوابة بيت الريف المناسبة</h2><p className="mt-4 max-w-4xl text-base leading-8 text-gray-600 md:text-lg">كل طريق يبدأ من اختيار القسم الصحيح: مكان، مزود، خدمة، أو منتج.</p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {gatewayCards.map((card) => { const Icon = card.icon; return <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" /><div className="relative"><div className="mb-6 flex items-center justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{card.label}</span></div><h3 className="text-2xl font-black text-[#0F3F1A]">{card.title}</h3><p className="mt-3 min-h-[88px] text-sm leading-8 text-gray-600">{card.desc}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">افتح القسم<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span></div></Link>; })}
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-8 text-center md:text-right"><h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">ابحث... تواصل... أو دع وياك يتولى المهمة</h2><p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">تواصل مباشرة مع مزودي الخدمة، أو اترك وياك يفهم طلبك ويرشح لك الأنسب، أو حوّل احتياجك إلى مناقصة داخلية تصل إلى مزودين مؤهلين حسب الخدمة والمنطقة.</p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{clientJourneyCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm hover:shadow-md transition-shadow"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
          </section>
          <section className="bg-[#0F3F1A] py-12 text-white md:py-18"><div className="mx-auto max-w-7xl px-4"><div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><span className="text-sm font-black text-[#F4D35E]">لمزود الخدمة</span><h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">أدر نشاطك التجاري من هاتفك</h2><p className="mt-5 text-base font-semibold leading-9 text-white/78 md:text-lg">هدفنا ليس ربطك مع عميل فقط؛ هدفنا أن نبني لك حضوراً رقمياً يجعل عميلك يجدك في المكان الذي يبحث فيه، داخل بيت الريف، وفي Google، وفي محركات الذكاء الاصطناعي.</p></div><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{providerPresenceCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4D35E]/15 text-[#F4D35E]"><Icon className="h-6 w-6" aria-hidden="true" /></div><h3 className="text-xl font-black">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-white/70">{item.desc}</p></div>; })}</div></div></div></section>
          <section className="bg-white py-12 md:py-18"><div className="mx-auto max-w-7xl px-4"><div className="mb-8 text-center"><h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">لا نبيع لك إعلاناً مؤقتاً</h2><p className="mx-auto mt-4 max-w-3xl font-semibold leading-8 text-gray-600">الحملات الإعلانية تنتهي بانتهاء الميزانية. أما بيت الريف فيبني لك حضوراً رقمياً مستداماً يعتمد على تخصصك، خدماتك، محتواك، مستنداتك، وسمعتك المهنية.</p></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">{experienceCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 text-center shadow-sm"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm leading-8 text-gray-600">{item.desc}</p></div>; })}</div></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

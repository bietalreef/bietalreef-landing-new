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
  { src: '/images/webp/bait-alreef-premiere-cover-smart-construction-platform.webp', alt: 'منصة بيت الريف الذكية لإدارة مشاريع البناء والصيانة في الإمارات', title: 'منصة بيت الريف الذكية' },
  { src: '/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp', alt: 'منظومة بيت الريف للبناء والمقاولات ومزودي الخدمات في الإمارات', title: 'منظومة البناء الذكية' },
  { src: '/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp', alt: 'منصة موحدة للتصميم والبناء وإدارة المشروع والمنتجات في الإمارات', title: 'منصة موحدة لمشروعك' },
  { src: '/images/webp/bait-alreef-why-biet-alreef-premium-comparison.webp', alt: 'لماذا يختار العملاء منصة بيت الريف للمقاولات والبناء في الإمارات', title: 'لماذا بيت الريف' },
];

const gatewayCards = [
  { title: 'دليل الإمارات', desc: 'ابدأ من المكان: الإمارة، المدينة، المنطقة، ثم الخدمة المناسبة لمشروعك.', href: '/uae', icon: MapPinned, label: 'بحث حسب المكان', image: '/images/uae-atlas/uae-directory-card-cover-thumb.webp', imageAlt: 'أبراج الإمارات الرقمية - دليل الإمارات داخل بيت الريف', featured: true },
  { title: 'مزودو الخدمات', desc: 'أدر نشاطك التجاري من هاتفك، وابنِ حضورك الرقمي، واستقبل الطلبات والمناقصات من العملاء الذين يبحثون عن خدماتك.', href: '/providers', icon: UsersRound, label: 'حضور رقمي' },
  { title: 'الخدمات والعروض', desc: 'اختر الخدمة المطلوبة، ثم تواصل مباشرة أو اطلب من وياك تحويل احتياجك إلى مسار واضح.', href: '/services', icon: Wrench, label: 'طلب خدمة' },
  { title: 'المنتجات والمتاجر', desc: 'تصفح مواد البناء والتشطيب والمنتجات حسب الفئة والاحتياج، وابدأ طلب عرض السعر بسهولة.', href: '/marketplace', icon: ShoppingBag, label: 'مواد ومنتجات' },
];

const introModels = [
  { title: 'دليل الإمارات', desc: 'ابدأ من المكان', image: '/images/webp/bait-alreef-uae-smart-network-coverage.webp' },
  { title: 'مزودون موثوقون', desc: 'شركات وورش', image: '/images/webp/bait-alreef-engineering-excellence-four-pillars.webp' },
  { title: 'خدمات وعروض', desc: 'طلب أو مقارنة', image: '/images/webp/bait-alreef-next-step-contractor-future.webp' },
  { title: 'منتجات ومتاجر', desc: 'مواد وموردون', image: '/images/webp/bait-alreef-smart-materials-calculator-investment-protection.webp' },
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
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'بيت الريف', alternateName: 'Biet Alreef', url: SITE_URL, logo: `${SITE_URL}/logo.png`, description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL, inLanguage: 'ar-AE', potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', name: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات', url: SITE_URL, description, inLanguage: 'ar-AE', about: ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'مزودو الخدمات في الإمارات', 'محرك أعمال رقمي'] },
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
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-[#FDFBF7]/10" />
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto -mt-7 max-w-5xl px-4 md:-mt-9">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E6DCC8] bg-white/96 px-5 pb-5 pt-6 text-center shadow-2xl shadow-[#8A6A00]/8 backdrop-blur md:px-10 md:pb-8 md:pt-9">
              <div className="pointer-events-none absolute inset-x-4 bottom-0 h-40 overflow-hidden rounded-b-[2rem] md:inset-x-8 md:h-52">
                <Image src="/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp" alt="خلفية بصرية خفيفة لمنظومة بيت الريف الذكية" fill className="translate-y-1/3 scale-110 object-cover object-center opacity-[0.18] blur-[0.2px]" sizes="(max-width: 768px) 92vw, 900px" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/20" />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">منصة بيت الريف الذكية</h1>
                <p className="mx-auto mt-3 max-w-2xl text-base font-bold leading-8 text-gray-700 md:text-xl">كل ما يحتاجه مشروعك في مكان واحد:<br />مزود، خدمة، منتج، أو مسار واضح مع وياك.</p>
                <h2 className="mt-5 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">ابحث... تواصل مباشر<br />أو دع وياك يتولى المهمة</h2>
                <div className="mt-6 grid grid-cols-4 gap-2 md:gap-4">
                  {introModels.map((item) => (
                    <div key={item.title} className="overflow-hidden rounded-2xl border border-[#EEE4D1] bg-white/86 px-2 py-3 shadow-sm backdrop-blur md:px-3 md:py-4">
                      <div className="relative mx-auto h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-inner ring-1 ring-[#E6DCC8] md:h-16 md:w-16"><Image src={item.image} alt={item.title} fill className="scale-125 object-cover object-center" sizes="64px" /><div className="absolute inset-0 bg-white/25" /></div>
                      <p className="mt-2 text-[0.7rem] font-black leading-5 text-[#0F3F1A] md:text-sm">{item.title}</p>
                      <p className="hidden text-xs font-semibold text-gray-500 md:block">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto mt-4 max-w-5xl px-4 md:mt-5">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white/96 px-5 py-6 text-center shadow-xl shadow-[#0F3F1A]/7 backdrop-blur md:px-10 md:py-10">
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
              {gatewayCards.map((card) => {
                const Icon = card.icon;

                if (card.featured) {
                  return (
                    <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:col-span-2 xl:col-span-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="order-2 flex min-h-[250px] flex-1 flex-col justify-center p-7 text-right md:order-1 md:min-h-[260px] md:p-10">
                          <div className="mb-6 flex items-center justify-between gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15">
                              <Icon className="h-7 w-7" aria-hidden="true" />
                            </div>
                            <span className="rounded-full bg-[#F7F2E8] px-4 py-2 text-xs font-black text-[#6F5400]">{card.label}</span>
                          </div>
                          <h3 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{card.title}</h3>
                          <p className="mt-4 max-w-xl text-sm font-semibold leading-8 text-gray-600 md:text-base">{card.desc}</p>
                          <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">افتح القسم<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>
                        </div>
                        <div className="order-1 relative min-h-[190px] flex-1 overflow-hidden bg-white md:order-2 md:min-h-[260px]">
                          <Image src={card.image} alt={card.imageAlt || card.title} fill className="object-contain object-center p-4 md:p-6" sizes="(max-width: 768px) 92vw, 50vw" />
                        </div>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" />
                    <div className="relative p-7">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                        <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{card.label}</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0F3F1A]">{card.title}</h3>
                      <p className="mt-3 min-h-[88px] text-sm leading-8 text-gray-600">{card.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">افتح القسم<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{clientJourneyCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm hover:shadow-md transition-shadow"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
          </section>

          <section className="bg-[#FDFBF7] py-12 text-gray-900 md:py-18">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-7 text-center md:mb-10"><span className="text-sm font-black text-[#6F5400]">لمزود الخدمة</span><h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">أدر نشاطك التجاري من هاتفك</h2><p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-600 md:text-lg">هدفنا ليس ربطك مع عميل فقط؛ هدفنا أن نبني لك حضوراً رقمياً يجعل عميلك يجدك في المكان الذي يبحث فيه، داخل بيت الريف، وفي Google، وفي محركات الذكاء الاصطناعي.</p></div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {providerPresenceCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-[#D4AF37]/10" /><div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2E8] text-[#B0912F] shadow-sm"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="relative text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="relative mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}
              </div>
            </div>
          </section>

          <section className="bg-white py-12 md:py-18"><div className="mx-auto max-w-7xl px-4"><div className="mb-8 text-center"><h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">لا نبيع لك إعلاناً مؤقتاً</h2><p className="mx-auto mt-4 max-w-3xl font-semibold leading-8 text-gray-600">الحملات الإعلانية تنتهي بانتهاء الميزانية. أما بيت الريف فيبني لك حضوراً رقمياً مستداماً يعتمد على تخصصك، خدماتك، محتواك، مستنداتك، وسمعتك المهنية.</p></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">{experienceCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 text-center shadow-sm"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm leading-8 text-gray-600">{item.desc}</p></div>; })}</div></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

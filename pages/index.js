import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WeyaakHeroCard from '../components/WeyaakHeroCard';
import { ArrowLeft, Bot, Building2, MapPinned, Search, ShoppingBag, Sparkles, UsersRound, Wrench } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroSlides = [
  { src: '/bait-alreef-hero-18.webp', alt: 'منصة بيت الريف لتنظيم رحلة البناء والمقاولات في الإمارات', title: 'رحلة بناء منظمة من أول سؤال' },
  { src: '/bait-alreef-construction-catalog.webp', alt: 'دليل بيت الريف لخدمات البناء والصيانة والتصميم في الإمارات', title: 'كل الأقسام في مسار واحد واضح' },
  { src: '/bait-alreef-hero-2.webp', alt: 'تصميم وتنفيذ مشاريع البناء الحديثة في الإمارات عبر بيت الريف', title: 'من الفكرة إلى اختيار المزود المناسب' },
  { src: '/images/seo/categories/interior-design.webp', alt: 'خدمات التصميم الداخلي والديكور في الإمارات عبر بيت الريف', title: 'تصميم وتشطيب ومواد ومزودون' },
];

const gatewayCards = [
  {
    title: 'دليل الإمارات',
    desc: 'ابدأ من المكان: الإمارة، المدينة، المنطقة، ثم الخدمة المناسبة لمشروعك.',
    href: '/uae',
    icon: MapPinned,
    label: 'بحث حسب المكان',
  },
  {
    title: 'مزودو الخدمات',
    desc: 'استعرض الشركات والورش والموردين حسب نوع المزود والنشاط والتخصص.',
    href: '/providers',
    icon: UsersRound,
    label: 'شركات وموردون',
  },
  {
    title: 'الخدمات والعروض',
    desc: 'اختر الخدمة المطلوبة، ثم أرسل تفاصيل مشروعك لطلب عرض أو توجيه مناسب.',
    href: '/services',
    icon: Wrench,
    label: 'طلب خدمة',
  },
  {
    title: 'المنتجات والمتاجر',
    desc: 'تصفح مواد البناء والتشطيب والمنتجات حسب الفئة والاحتياج.',
    href: '/marketplace',
    icon: ShoppingBag,
    label: 'مواد ومنتجات',
  },
];

const experienceCards = [
  { title: 'مسار واضح', desc: 'كل زائر يبدأ من بوابة مفهومة بدل التشتت بين الصفحات.', icon: Search },
  { title: 'وياك حاضر', desc: 'المساعد الذكي يربط السؤال بالقسم المناسب داخل المنصة.', icon: Bot },
  { title: 'هوية عربية', desc: 'تصميم يحافظ على اتجاه وتجربة بيت الريف حتى مع تعدد اللغات.', icon: Sparkles },
  { title: 'قابل للنمو', desc: 'كل قسم جاهز لاحقًا للربط مع التطبيق وقاعدة البيانات.', icon: Building2 },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6500);
    return () => clearInterval(timer);
  }, []);

  const description = 'بيت الريف منصة ذكية لخدمات البناء والصيانة والتصميم في الإمارات. ابدأ من دليل الإمارات أو مزودي الخدمات أو الخدمات والعروض أو المنتجات والمتاجر، واسأل وياك ليساعدك خطوة بخطوة.';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'بيت الريف',
      alternateName: 'Biet Alreef',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description,
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+971567856001',
        contactType: 'customer support',
        areaServed: 'AE',
        availableLanguage: ['Arabic', 'English'],
      },
      sameAs: [
        'https://www.instagram.com/bietalreef',
        'https://www.facebook.com/share/14fy6hGM7SJ/',
        'https://youtube.com/@bietalreef',
        'https://www.tiktok.com/@bietalreef0',
        'https://www.linkedin.com/in/bietalreef',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: SITE_URL,
      inLanguage: 'ar-AE',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/providers?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'بيت الريف | منصة البناء والمقاولات والصيانة الذكية في الإمارات',
      url: SITE_URL,
      description,
      inLanguage: 'ar-AE',
      isPartOf: { '@id': SITE_URL },
      about: ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'مزودو الخدمات في الإمارات'],
    },
  ];

  return (
    <>
      <SEOHead
        title="بيت الريف | منصة البناء والمقاولات والصيانة الذكية في الإمارات"
        description={description}
        keywords="بيت الريف, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI"
        canonicalPath="/"
        structuredData={structuredData}
      />

      <div dir="rtl" className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main>
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl biet-glow-orb" />
            <div className="pointer-events-none absolute left-0 top-24 h-80 w-80 rounded-full bg-[#0F3F1A]/10 blur-3xl biet-glow-orb" />

            <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-14 lg:py-18">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
                <div className="order-2 text-center lg:order-1 lg:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/80 px-4 py-2 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    بيت الريف Ecosystem
                  </div>

                  <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#0F3F1A] md:text-6xl lg:text-7xl">
                    مستقبل البناء يبدأ
                    <span className="block bg-gradient-to-l from-[#0F3F1A] via-[#1B7A3A] to-[#B89200] bg-clip-text text-transparent">
                      مع بيت الريف ووياك
                    </span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-9 text-gray-700 md:text-lg lg:mx-0">
                    منصة ذكية تجعل رحلة البناء أو الصيانة أو التشطيب أكثر وضوحًا: اختر المكان، أو المزود، أو الخدمة، أو المنتج، ودع وياك يرشدك للخطوة التالية.
                  </p>

                  <WeyaakHeroCard />

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                    <Link href="/weyaak" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">
                      ابدأ مع وياك
                      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link href="/uae" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">
                      استكشف دليل الإمارات
                      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative mx-auto max-w-3xl biet-float">
                    <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-[#D4AF37]/25 via-transparent to-[#0F3F1A]/20 blur-2xl" />
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-[#0F3F1A] shadow-2xl">
                      {heroSlides.map((slide, index) => (
                        <div key={slide.src} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                          <Image src={slide.src} alt={slide.alt} title={slide.title} fill className="object-cover" priority={index === 0} sizes="(max-width: 1024px) 100vw, 52vw" />
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/85 via-[#0F3F1A]/15 to-transparent" />
                      <div className="absolute bottom-6 right-6 left-6 text-white">
                        <p className="text-sm font-black text-[#F4D35E]">منصة البناء الذكية</p>
                        <h2 className="mt-2 max-w-xl text-2xl font-black leading-tight md:text-4xl">كل طريق يبدأ من اختيار القسم الصحيح</h2>
                      </div>
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 p-1 backdrop-blur">
                        {heroSlides.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentSlide(i)}
                            aria-label={`الشريحة ${i + 1}`}
                            className={`min-h-[24px] min-w-[24px] rounded-full border border-white/70 transition-all ${i === currentSlide ? 'bg-white' : 'bg-white/60 hover:bg-white/90'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 md:py-18">
            <div className="mb-10 text-center md:text-right">
              <span className="text-sm font-black text-[#6F5400]">ابدأ من هنا</span>
              <h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">اختر بوابة بيت الريف المناسبة</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
                أربع بوابات فقط حتى تكون التجربة واضحة من أول زيارة: مكان، مزود، خدمة، أو منتج.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {gatewayCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" />
                    <div className="relative">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{card.label}</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0F3F1A]">{card.title}</h3>
                      <p className="mt-3 min-h-[88px] text-sm leading-8 text-gray-600">{card.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">
                        افتح القسم
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="bg-white py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">تجربة قصيرة، واضحة، وقابلة للفهم</h2>
                <p className="mx-auto mt-4 max-w-3xl text-gray-600 leading-8">
                  الصفحة الرئيسية ليست زينة فقط؛ هي بوابة تشغيل ذكية توجه المستخدم والذكاء الاصطناعي إلى هيكل بيت الريف الصحيح.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {experienceCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 text-center shadow-sm">
                      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-8 text-gray-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

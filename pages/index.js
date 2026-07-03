import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Bot, Building2, MapPinned, ShoppingBag, Sparkles, UsersRound, Wrench } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroSlides = [
  { src: '/bait-alreef-construction-catalog.webp', alt: 'منصة بيت الريف للبناء والمقاولات والصيانة في الإمارات', title: 'منصة بيت الريف الذكية' },
  { src: '/bait-alreef-hero-18.webp', alt: 'خدمات بناء الفلل والمقاولات في الإمارات عبر بيت الريف', title: 'مقاولات وبناء فلل في الإمارات' },
  { src: '/bait-alreef-hero-2.webp', alt: 'تصميم وتنفيذ مشاريع البناء الحديثة في الإمارات', title: 'مشاريع البناء والتصميم في الإمارات' },
  { src: '/images/seo/categories/interior-design.webp', alt: 'خدمات التصميم الداخلي والديكور في الإمارات عبر منصة بيت الريف', title: 'التصميم الداخلي والديكور في الإمارات' },
];

const mainCards = [
  { title: 'دليل الإمارات', desc: 'ابدأ من الإمارة ثم المدينة ثم الخدمة المناسبة لمشروعك.', href: '/uae', icon: MapPinned, emoji: '🇦🇪', tag: 'بحث حسب المكان' },
  { title: 'مزودو الخدمات', desc: 'استعرض الشركات والورش والموردين حسب التخصص ونوع النشاط.', href: '/providers', icon: UsersRound, emoji: '👷', tag: 'مزودون حقيقيون' },
  { title: 'الخدمات والعروض', desc: 'اختر الخدمة المطلوبة ثم أرسل تفاصيل مشروعك للحصول على توجيه مناسب.', href: '/services', icon: Wrench, emoji: '🛠️', tag: 'طلب خدمة' },
  { title: 'المنتجات والمتاجر', desc: 'تصفح مواد البناء والتشطيب والمنتجات حسب الفئة والاحتياج.', href: '/marketplace', icon: ShoppingBag, emoji: '🛍️', tag: 'مواد ومنتجات' },
];

const trustCards = [
  { title: 'منصة موثوقة', desc: 'نربط كل خدمة بمسار واضح ومزود قابل للمراجعة.', icon: Building2 },
  { title: 'وياك يساعدك', desc: 'اكتب احتياجك وسيقترح عليك الطريق الأنسب.', icon: Bot },
  { title: 'محتوى قصير وواضح', desc: 'كل قسم يشرح وظيفته بسرعة ثم يفتح التفاصيل.', icon: Sparkles },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6000);
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
      areaServed: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
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

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-white">
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#F7F2E8] to-white" />
            <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-16">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
                <div className="text-center lg:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black text-[#6F5400]"><Sparkles className="h-4 w-4" aria-hidden="true" />بيت الريف Ecosystem</div>
                  <h1 className="mt-6 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl lg:text-6xl">مستقبل البناء يبدأ مع<span className="block text-[#8A6A00]">بيت الريف ووياك</span></h1>
                  <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-9 text-gray-700 lg:mx-0">منصة ذكية تجمع دليل الإمارات، مزودي الخدمات، الخدمات والعروض، والمنتجات والمتاجر في تجربة واحدة واضحة لأصحاب المشاريع ومزودي الخدمات.</p>

                  <div id="weyaak-assistant" className="mt-7 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 text-right shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Bot className="h-6 w-6" aria-hidden="true" /></div>
                      <div><h2 className="text-xl font-black text-[#0F3F1A]">وياك، مساعدك الذكي</h2><p className="mt-2 text-sm leading-7 text-gray-600">قل له ما الذي تريد تنفيذه، وسيقترح عليك القسم المناسب: دليل الإمارات، مزود خدمة، خدمة، أو منتج.</p></div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">{['أحتاج نجار في العين', 'أريد رخام لمجلس', 'أبحث عن مقاول'].map((item) => <div key={item} className="rounded-2xl bg-[#F7F2E8] px-4 py-3 text-sm font-bold text-gray-800">{item}</div>)}</div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                    <Link href="/weyaak" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#B89200] px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#8A6A00]">ابدأ مع وياك<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                    <Link href="/uae" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] transition hover:border-primary">استكشف دليل الإمارات<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-[#0F3F1A] shadow-2xl">
                    {heroSlides.map((slide, index) => <div key={slide.src} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}><Image src={slide.src} alt={slide.alt} title={slide.title} fill className="object-cover" priority={index === 0} sizes="(max-width: 1024px) 100vw, 50vw" /></div>)}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 right-6 left-6 text-white"><p className="text-sm font-black text-[#F4D35E]">منصة البناء الذكية</p><h2 className="mt-2 text-2xl font-black md:text-3xl">كل طريق يبدأ من اختيار القسم الصحيح</h2></div>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 p-1">{heroSlides.map((_, i) => <button key={i} type="button" onClick={() => setCurrentSlide(i)} aria-label={`الشريحة ${i + 1}`} className={`min-h-[24px] min-w-[24px] rounded-full border border-white/70 transition-all ${i === currentSlide ? 'bg-white' : 'bg-white/60 hover:bg-white/90'}`} />)}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="mb-10 text-center md:text-right"><span className="text-sm font-black text-[#6F5400]">ابدأ من هنا</span><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">اختر بوابة بيت الريف المناسبة</h2><p className="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">أربع بوابات واضحة بدل التشتت: مكان، مزود، خدمة، أو منتج. اختر ما يناسب احتياجك وسنأخذك للمسار الصحيح.</p></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {mainCards.map((card) => { const Icon = card.icon; return <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" /><div className="relative"><div className="mb-6 flex items-center justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div><span className="text-3xl" aria-hidden="true">{card.emoji}</span></div><span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{card.tag}</span><h3 className="mt-4 text-2xl font-black text-[#0F3F1A]">{card.title}</h3><p className="mt-3 min-h-[72px] text-sm leading-8 text-gray-600">{card.desc}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">افتح القسم<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span></div></Link>; })}
            </div>
            <div className="mt-8 text-center"><Link href="/community" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#E6DCC8] bg-white px-5 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-primary hover:text-primary">المجتمع<UsersRound className="h-4 w-4" aria-hidden="true" /></Link></div>
          </section>

          <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4"><div className="mb-10 text-center"><h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">لماذا تجربة بيت الريف مختلفة؟</h2><p className="mt-4 text-gray-600">محتوى مختصر، مسارات واضحة، وروابط داخلية تساعد المستخدم والذكاء الاصطناعي على فهم المنصة.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{trustCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-7 text-center shadow-sm"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm leading-8 text-gray-600">{item.desc}</p></div>; })}</div></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WeyaakHeroCard from '../components/WeyaakHeroCard';
import PlatformStoryVideo from '../components/PlatformStoryVideo';
import { ArrowLeft, Bot, Building2, MapPinned, Search, ShoppingBag, Sparkles, UsersRound, Wrench, CheckCircle, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

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
  { title: 'وياك حاضر', desc: 'المساعد الذكي يربط السؤال بالقسم المناسب داخل المنصة.', icon: Bot },
  { title: 'هوية عربية', desc: 'تصميم يحافظ على اتجاه وتجربة بيت الريف حتى مع تعدد اللغات.', icon: Sparkles },
  { title: 'قابل للنمو', desc: 'كل قسم مرتبط بمحتوى وبيانات منظمة قابلة للتوسع والتحديث.', icon: Building2 },
];

const trustBadges = [
  { title: 'ثقة', desc: 'مزودون أوضح', icon: ShieldCheck },
  { title: 'أمان', desc: 'تواصل منظم', icon: CheckCircle },
  { title: 'بدون عمولة', desc: 'شفافية في التواصل', icon: Sparkles },
];

function GatewayCard({ card }) {
  const Icon = card.icon;

  return (
    <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
            استكشف الآن
            <Search className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <p className="text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const description = 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. يساعد العميل على البحث والتواصل أو تحويل احتياجه إلى مناقصة داخلية، ويساعد مزود الخدمة على بناء حضور رقمي منظم ومستدام.';
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
          <section className="relative isolate overflow-hidden border-b border-[#E6DCC8] bg-[#FAF7F0]">
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_78%_20%,rgba(212,175,55,.14),transparent_34%)]" />
            <div className="relative mx-auto grid max-w-[1440px] md:min-h-[650px] md:grid-cols-[1fr_1fr] md:items-stretch">
              <div className="relative order-1 min-h-[330px] overflow-hidden rounded-b-[2.2rem] border-b border-[#D4AF37]/45 md:order-2 md:min-h-0 md:rounded-bl-[45%] md:rounded-br-none md:border-b-0 md:border-l">
                <Image src="/hero-villa-1.webp" alt="فيلا إماراتية معاصرة تعبّر عن هوية منصة بيت الريف الذكية" fill priority className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#073F3E]/24 via-transparent to-white/5" />
              </div>

              <div className="order-2 flex items-center px-4 pb-9 pt-7 text-center md:order-1 md:px-12 md:py-16 md:text-right lg:px-20">
                <div className="mx-auto w-full max-w-xl md:mr-0">
                  <div className="mb-5 hidden items-center gap-4 text-[#C79A45] md:flex"><span className="h-px flex-1 bg-[#C79A45]/55" /><span className="text-xl">✦</span><span className="h-px flex-1 bg-[#C79A45]/55" /></div>
                  <h1 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">منصة بيت الريف الذكية</h1>
                  <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-gray-700 md:mx-0 md:text-xl">كل ما يحتاجه مشروعك في مكان واحد:<br />مزود، خدمة، منتج، أو مسار واضح مع وياك.</p>
                  <h2 className="mt-5 text-2xl font-black leading-tight text-[#0F3F1A] md:mt-8 md:text-4xl">ابحث... تواصل مباشر<br />أو دع وياك يتولى المهمة</h2>
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-auto -mt-1 max-w-[1440px] px-3 pb-5 md:-mt-28 md:px-8 md:pb-8">
              <div className="grid grid-cols-4 gap-2 md:gap-4" dir="rtl">
                {introModels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.title} href={item.href} className="group grid min-w-0 overflow-hidden rounded-2xl border border-[#DED4C2] bg-white/95 text-right shadow-[0_12px_30px_rgba(32,42,39,.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[42%_58%] md:rounded-[1.4rem]">
                      <div className="relative h-16 overflow-hidden bg-[#F3EBDD] md:h-36">
                        <Image src={item.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 25vw, 150px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/20 to-transparent" />
                      </div>
                      <div className="flex min-w-0 flex-col items-center justify-center px-1.5 py-2 text-center md:items-start md:px-4 md:text-right">
                        <Icon className="mb-1 hidden h-6 w-6 text-[#0F3F1A] md:block" aria-hidden="true" />
                        <p className="text-[0.68rem] font-black leading-5 text-[#0F3F1A] sm:text-xs md:text-base">{item.title}</p>
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
              {gatewayCards.map((card) => <GatewayCard key={card.href} card={card} />)}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{clientJourneyCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm hover:shadow-md transition-shadow"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
          </section>

          <PlatformStoryVideo locale="ar" />

          <section className="bg-[#FDFBF7] py-12 text-gray-900 md:py-18">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-7 text-center md:mb-10"><span className="text-sm font-black text-[#6F5400]">لمزود الخدمة</span><h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">ابنِ حضورًا رقميًا منظمًا لنشاطك</h2><p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-600 md:text-lg">هدفنا ليس ربطك مع عميل فقط؛ هدفنا أن نبني لك حضوراً رقمياً يجعل عميلك يجدك في المكان الذي يبحث فيه، داخل بيت الريف، وفي Google، وفي محركات الذكاء الاصطناعي.</p></div>
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

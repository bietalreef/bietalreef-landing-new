import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Globe,
  Home,
  MapPinned,
  MessageSquare,
  Scale,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  UsersRound,
  Wrench,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const platformGateways = [
  {
    title: 'دليل الإمارات',
    description: 'ابدأ من الإمارة والمدينة والمنطقة للوصول إلى الأنشطة والخدمات والمزودين المرتبطين بالموقع.',
    href: '/uae',
    icon: MapPinned,
    image: '/images/gateway/uae-directory-gateway.webp',
    imageAlt: 'دليل الإمارات لخدمات البناء والمقاولات عبر منصة بيت الريف',
  },
  {
    title: 'مزودو الخدمات',
    description: 'استعرض ملفات الشركات والمقاولين والمصانع والموردين والورش والحرفيين بعد اعتماد بياناتهم.',
    href: '/providers',
    icon: UsersRound,
    image: '/images/gateway/providers-gateway.webp',
    imageAlt: 'مزودو خدمات البناء والمقاولات في الإمارات',
  },
  {
    title: 'الخدمات والعروض',
    description: 'اكتشف خدمات البناء والمقاولات والتشطيبات والصيانة والتصميم بحسب التخصص والمكان.',
    href: '/services',
    icon: Wrench,
    image: '/images/gateway/services-offers-gateway.webp',
    imageAlt: 'خدمات وعروض البناء والتشطيبات والصيانة',
  },
  {
    title: 'المنتجات والمتاجر',
    description: 'ابحث عن مواد البناء والمنتجات والمتاجر والموردين المرتبطين باحتياج المشروع.',
    href: 'https://app.bietalreef.ae/',
    icon: ShoppingBag,
    image: '/images/gateway/materials-products-gateway.webp',
    imageAlt: 'مواد البناء والمنتجات والمتاجر في منصة بيت الريف',
  },
];

const customerJourney = [
  {
    number: '01',
    title: 'البحث والتواصل المباشر',
    description: 'اختر الموقع أو الخدمة، راجع الملفات المنشورة، ثم تواصل مع المزود أو اطلب منه عرض سعر.',
    icon: Search,
  },
  {
    number: '02',
    title: 'تنظيم الطلب مع وياك',
    description: 'صف احتياجك بلغتك، ويساعد وياك على تحديد النشاط والخدمة والموقع والمقاسات والمعلومات الناقصة.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'مراجعة العرض والخيارات',
    description: 'قارن نطاق العمل والمواصفات والخامات والمدة والسعر، وليس الرقم النهائي وحده.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'طلب مناقصة داخلية عند الحاجة',
    description: 'إذا لم تجد سعرًا أو حلًا مناسبًا، ارفع الطلب إلى بيت الريف لتوسيع البحث وجمع عروض إضافية.',
    icon: Target,
  },
];

const tenderSteps = [
  {
    number: '01',
    title: 'تقديم طلب المناقصة',
    description: 'يرسل العميل تفاصيل المشروع أو الخدمة أو المنتج، ويوضح سبب عدم مناسبة العروض أو الخيارات الحالية.',
    icon: FileSearch,
  },
  {
    number: '02',
    title: 'مراجعة نطاق الطلب',
    description: 'تراجع بيت الريف المواصفات والموقع والكميات والصور والمدة والميزانية الاسترشادية وتطلب أي معلومات ناقصة.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'اختيار الجهات المناسبة',
    description: 'تُحدد الشركات أو الموردون أو المصانع أو الورش المتوافقة مع التخصص وموقع التنفيذ أو التوريد.',
    icon: UsersRound,
  },
  {
    number: '04',
    title: 'استقبال العروض',
    description: 'تُرسل الدعوات داخليًا، وتستلم بيت الريف عروض الجهات المدعوة وفق نطاق واضح ومعلومات معتمدة.',
    icon: Send,
  },
  {
    number: '05',
    title: 'مقارنة منظمة',
    description: 'تُراجع العروض وفق السعر والمواصفات والجودة والمدة والموقع والقدرة على التنفيذ أو التوريد.',
    icon: Scale,
  },
  {
    number: '06',
    title: 'عرض الخيارات على العميل',
    description: 'تُنظم الخيارات الأكثر توافقًا وتُعرض على العميل، ويبقى القرار النهائي له قبل التعاقد.',
    icon: BadgeCheck,
  },
];

const providerBenefits = [
  'ملف رقمي منظم يعرض النشاط والخدمات والمنتجات والمشاريع ومناطق العمل.',
  'ظهور في المسارات المناسبة داخل دليل الإمارات وصفحات الخدمات والمنتجات.',
  'استقبال طلبات عروض مرتبطة بالتخصص والموقع عند تطابق البيانات.',
  'إمكانية الدعوة إلى مناقصات داخلية عندما يتوافق النشاط والقدرة مع الطلب.',
];

const principles = [
  {
    title: 'المناقصة ليست إعلانًا عامًا',
    description: 'هي مسار داخلي تديره بيت الريف وتُرسل إلى جهات محددة بعد مراجعة توافقها مع الطلب.',
    icon: ShieldCheck,
  },
  {
    title: 'الأفضل لا يعني الأرخص فقط',
    description: 'المقارنة تشمل السعر والمواصفات وجودة المواد أو الخدمة والمدة والقدرة على الالتزام.',
    icon: Scale,
  },
  {
    title: 'العميل صاحب القرار',
    description: 'تنظم بيت الريف البحث والمقارنة، بينما يظل اختيار العرض والتعاقد النهائي بقرار العميل.',
    icon: CheckCircle2,
  },
];

const faqItems = [
  {
    question: 'متى أطلب عرض سعر؟',
    answer: 'اطلب عرض سعر عندما تكون الخدمة أو المنتج المطلوب واضحًا، ويمكن توجيه الطلب إلى مزود خدمة أو مورد مناسب بناءً على الموقع والمواصفات المتاحة.',
  },
  {
    question: 'متى أطلب مناقصة داخلية؟',
    answer: 'اطلب مناقصة داخلية عندما لا تحصل على سعر أو حل مناسب من الخيارات المتاحة، أو عندما يحتاج المشروع إلى مقارنة أوسع بين عدة مزودين أو موردين أو مصانع.',
  },
  {
    question: 'من ينشئ المناقصة الداخلية؟',
    answer: 'يتقدم العميل بالطلب إلى منصة بيت الريف، ثم تراجع بيت الريف التفاصيل وتحدد النطاق وتُنشئ المناقصة وتدعو الجهات المناسبة لتقديم عروضها.',
  },
  {
    question: 'هل المناقصة عامة ومفتوحة للجميع؟',
    answer: 'لا. هي مناقصة داخلية مُدارة، وتُرسل إلى مزودين أو موردين أو مصانع أو ورش يتوافق نشاطهم وموقعهم وقدرتهم مع الطلب.',
  },
  {
    question: 'هل يمكن أن تكون المناقصة لخدمة أو منتج؟',
    answer: 'نعم. يمكن أن تكون لمشروع أو خدمة تنفيذ أو صيانة أو مادة بناء أو منتج أو توريد، وفق احتياج العميل ونطاق الطلب.',
  },
  {
    question: 'كيف تتم مقارنة العروض؟',
    answer: 'تُقارن العروض وفق السعر والمواصفات وجودة المواد أو الخدمة وموقع التنفيذ والمدة والقدرة على الالتزام، ثم تُعرض الخيارات المناسبة على العميل.',
  },
  {
    question: 'هل تضمن بيت الريف أقل سعر؟',
    answer: 'لا. الهدف هو الوصول إلى أفضل توافق ممكن بين السعر والمواصفات والجودة والمدة والموقع والقدرة على التنفيذ أو التوريد، دون تقديم وعود غير مؤكدة.',
  },
  {
    question: 'ما دور وياك داخل المنصة؟',
    answer: 'يساعد وياك على فهم وصف الطلب وتحديد النشاط والخدمة والموقع والمقاسات والمعلومات الناقصة، ثم يوجه العميل إلى البحث أو عرض السعر أو المناقصة الداخلية وفق الحاجة.',
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-sm font-black text-[#A27E18]">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{title}</h2>
      {description ? <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">{description}</p> : null}
    </div>
  );
}

export default function HowItWorksPage() {
  const description = 'تعرّف على طريقة عمل منصة بيت الريف: البحث حسب الموقع والخدمة، التواصل مع مزودي الخدمات، طلب عروض الأسعار، ودور وياك والمناقصات الداخلية المُدارة.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/how-it-works#webpage`,
        url: `${SITE_URL}/how-it-works`,
        name: 'كيف تعمل منصة بيت الريف؟',
        description,
        inLanguage: 'ar-AE',
        isPartOf: { '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL },
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/how-it-works#howto`,
        name: 'كيف تبدأ طلبك في منصة بيت الريف؟',
        description: 'خطوات البحث والتواصل وطلب عرض السعر والانتقال إلى المناقصة الداخلية عند الحاجة.',
        step: customerJourney.map((item, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: item.title,
          text: item.description,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/how-it-works#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-gray-900">
      <Head>
        <title>كيف تعمل منصة بيت الريف؟ | من البحث إلى عرض السعر والمناقصة</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/how-it-works`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/how-it-works`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/how-it-works`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/how-it-works`} />
        <meta property="og:title" content="كيف تعمل منصة بيت الريف؟" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/how-it-works`} />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:image" content={`${SITE_URL}/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Navbar pageTitle="كيف تعمل المنصة" />

      <main>
        <section className="relative overflow-hidden border-b border-[#E7DCC7] bg-[#F8F4EC] px-4 py-8 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,63,26,0.08),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-7 flex justify-start md:mb-9">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-[1.35rem] border border-white/80 bg-white/55 px-5 py-3.5 font-black text-[#0F3F1A] shadow-[0_18px_40px_rgba(15,63,26,0.15),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(212,175,55,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_24px_50px_rgba(15,63,26,0.2),0_0_28px_rgba(212,175,55,0.22),inset_0_1px_0_rgba(255,255,255,1)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E7] text-[#A27E18] shadow-inner transition group-hover:scale-105">
                  <Home className="h-4.5 w-4.5" />
                </span>
                العودة إلى الرئيسية
              </Link>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/65 px-4 py-2 text-sm font-black text-[#8B6A10] shadow-sm backdrop-blur">
                  <Globe className="h-4 w-4" />
                  منظومة رقمية متخصصة بقطاع البناء
                </span>
                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] text-[#0F3F1A] md:text-6xl">
                  قوة متكاملة في مكان واحد
                  <span className="mt-2 block text-[#A27E18]">ووداعًا للتعقيد</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-700">
                  منصة رقمية متخصصة تجمع دليل الإمارات، مزودي الخدمات، المنتجات، طلبات عروض الأسعار، المناقصات الداخلية، ومساعد وياك الذكي في رحلة واحدة متكاملة.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/uae" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#164E25]">
                    ابدأ من دليل الإمارات <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <a href="#journey" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#CBAF5A] bg-white/70 px-7 py-4 font-black text-[#0F3F1A] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                    شاهد كيف تعمل المنصة <Sparkles className="h-5 w-5 text-[#A27E18]" />
                  </a>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-[2.4rem] border border-[#D7C8A7] bg-white shadow-[0_28px_70px_rgba(15,63,26,0.17)]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                    <Image
                      src="/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp"
                      alt="منظومة بيت الريف المتكاملة للتصميم والبناء والإدارة والمالية والتسويق"
                      fill
                      priority
                      className="scale-[1.08] object-cover object-[center_68%]"
                      sizes="(max-width: 1024px) 100vw, 48vw"
                    />
                    <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#F8F4EC] via-[#F8F4EC]/96 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#FCFAF6] px-4 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_32%)]" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="بوابات المنصة"
              title="ابدأ من المسار الأقرب إلى احتياجك"
              description="أربع بوابات رئيسية بصور واضحة وحجم أصغر من بطاقات الصفحة الرئيسية، ترتبط جميعها بنفس بيانات النشاط والخدمة والمنتج والموقع."
            />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {platformGateways.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group overflow-hidden rounded-[1.75rem] border border-[#E5D9C1] bg-white p-2 shadow-[0_16px_34px_rgba(15,63,26,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_24px_45px_rgba(15,63,26,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-[#F0E7D6]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071E11]/32 via-transparent to-transparent" />
                      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/65 bg-white/82 text-[#A27E18] shadow-lg backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex min-h-[185px] flex-col px-4 pb-4 pt-5">
                      <h3 className="text-lg font-black text-[#0F3F1A]">{item.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">{item.description}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#A27E18]">انتقل إلى القسم <ArrowLeft className="h-4 w-4" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] border border-[#D9CBAF] bg-[#0F3F1A] shadow-[0_32px_80px_rgba(15,63,26,0.2)]">
            <div className="relative min-h-[520px] md:min-h-[620px]">
              <Image
                src="/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp"
                alt="منصة بيت الريف الرقمية لقطاع البناء والمقاولات في الإمارات"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#071E11]/96 via-[#0F3F1A]/80 to-[#0F3F1A]/28" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.2),transparent_36%)]" />
              <div className="relative z-10 flex min-h-[520px] items-center p-7 md:min-h-[620px] md:p-12 lg:p-16">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#071E11]/55 px-4 py-2 text-sm font-black text-[#F3D46B] backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                    البنية الرقمية المتكاملة لقطاع البناء
                  </span>
                  <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">منصة تربط المشروع بالخبرة المناسبة في الوقت والمكان المناسبين</h2>
                  <p className="mt-5 text-base leading-9 text-white/88 md:text-lg">
                    تجمع بيت الريف البحث الجغرافي، ملفات مزودي الخدمات، المنتجات، طلبات عروض الأسعار، والمناقصة الداخلية في مسار واحد يساعد العميل على اتخاذ قرار أوضح ويمنح مزود الخدمة حضورًا رقميًا منظمًا.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {['بحث حسب الإمارة والمنطقة', 'مزودون وبيانات منظمة', 'طلبات وعروض أكثر وضوحًا', 'وياك لتبسيط القرار'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4 font-bold backdrop-blur-sm">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F3D46B]" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="https://play.google.com/store/apps/details?id=ae.bietalreef.app" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#0F3F1A] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#E4C65F]">
                    ابدأ رحلتك مع وياك <ArrowLeft className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="bg-[#FCFAF6] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="رحلة العميل"
              title="أكثر من طريق للوصول إلى الحل"
              description="لا نفرض على العميل مناقصة من البداية؛ يبدأ بالبحث أو التواصل أو عرض السعر، ثم ينتقل إلى المناقصة الداخلية فقط عندما يحتاج إلى خيارات أوسع."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {customerJourney.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.number} className="rounded-[2rem] border border-[#E5D9C1] bg-white p-6 shadow-[0_16px_34px_rgba(15,63,26,0.08)]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#A27E18]">المرحلة {item.number}</span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-5 w-5" /></div>
                    </div>
                    <h3 className="mt-5 text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-gray-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="المناقصة الداخلية في بيت الريف"
              title="خدمة مُدارة للبحث عن أفضل توافق"
              description="عندما لا يحصل العميل على عرض مناسب، تراجع بيت الريف الطلب وتدعو الجهات المتوافقة بدل فتحه للعامة."
            />
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tenderSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="group relative overflow-hidden rounded-[2.25rem] border border-white/75 bg-gradient-to-b from-white to-[#F6F2EA] p-6 shadow-[0_24px_55px_rgba(15,63,26,0.12),inset_0_1px_0_rgba(255,255,255,1)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(15,63,26,0.17),0_0_24px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(255,255,255,1)]">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#A27E18]">{step.number}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] border border-[#E8D8A4] bg-[#FFF9E8] text-[#A27E18] shadow-[0_10px_24px_rgba(162,126,24,0.14),inset_0_1px_0_rgba(255,255,255,1)]">
                        <Icon className="h-5.5 w-5.5" />
                      </div>
                    </div>
                    <h3 className="mt-6 text-xl font-black text-[#0F3F1A]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-gray-600">{step.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-9 text-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5">
                قدّم طلبك إلى بيت الريف <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <span className="text-sm font-black text-[#A27E18]">لمزود الخدمة والشريك</span>
            <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">حضور رقمي وفرص مرتبطة بتخصصك</h2>
            <p className="mt-5 max-w-4xl text-lg leading-9 text-gray-600">يعتمد الوصول إلى الطلبات والمناقصات على اكتمال الملف واعتماد البيانات وتوافق النشاط والخدمات والمنتجات ومناطق العمل مع احتياج العميل.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {providerBenefits.map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-[1.6rem] border border-[#E5D9C1] bg-[#FCFAF6] p-5 shadow-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                  <p className="font-semibold leading-8 text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="https://play.google.com/store/apps/details?id=ae.bietalreef.app" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5">
                انضم كمزود خدمة <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link href="/partners" className="inline-flex items-center justify-center rounded-2xl border border-[#CBAF5A] bg-[#FFF9E8] px-7 py-4 font-black text-[#0F3F1A] transition hover:-translate-y-0.5">تعرّف على الشراكة</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="قواعد واضحة" title="كيف نحافظ على وضوح العملية؟" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[2rem] border border-[#E5D9C1] bg-white p-7 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4D4] text-[#A27E18]"><Icon className="h-6 w-6" /></div>
                    <h3 className="mt-5 text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                    <p className="mt-3 leading-8 text-gray-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-[#E5D9C1] bg-[#FCFAF6] p-7 shadow-xl md:p-11">
            <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-[#D4AF37]/35 shadow-2xl md:h-60 md:w-60">
                <Image src="/images/weyaak-new-logo.jpg" alt="وياك مساعد بيت الريف الذكي" fill className="object-cover" sizes="240px" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#A27E18]"><Bot className="h-5 w-5" /> وياك</span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">يساعدك على توضيح الطلب، ولا يتخذ القرار بدلًا عنك</h2>
                <p className="mt-5 leading-8 text-gray-600">يفهم وياك وصف العميل، ويستخرج الخدمة والموقع والمقاسات والمواصفات، ثم يوجهه إلى الدليل أو عرض السعر أو طلب المناقصة. وتعتمد التوصيات على البيانات المنشورة والمعتمدة داخل المنصة.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="https://play.google.com/store/apps/details?id=ae.bietalreef.app" className="inline-flex items-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3.5 font-black text-white"><Bot className="h-5 w-5" /> تحدّث مع وياك</Link>
                  <Link href="/tools" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9E8] px-6 py-3.5 font-black text-[#0F3F1A]"><BriefcaseBusiness className="h-5 w-5" /> استكشف الأدوات</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="الأسئلة الشائعة"
              title="أسئلة شائعة حول كيف تعمل منصة بيت الريف"
              description="إجابات واضحة على أهم الأسئلة المتعلقة بعروض الأسعار والمناقصة الداخلية ودور وياك داخل المنصة."
            />
            <div className="mt-10 space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="group rounded-[1.75rem] border border-[#E5D9C1] bg-white p-6 shadow-sm transition open:border-[#D4AF37] open:shadow-md">
                  <summary className="cursor-pointer list-none text-lg font-black text-[#0F3F1A]">{item.question}</summary>
                  <p className="mt-4 leading-8 text-gray-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-gradient-to-l from-[#0F3F1A] to-[#194F27] p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-3xl font-black md:text-5xl">ابدأ بالطريق الأبسط، وانتقل للمناقصة عند الحاجة</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/85">ابحث وتواصل واطلب عرض سعر أولًا. وعندما لا تجد الخيار المناسب، ارفع الطلب إلى بيت الريف ليتم مراجعته وبناء مناقصة داخلية واضحة.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/uae" className="rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#0F3F1A]">استكشف الدليل</Link>
              <Link href="/contact" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-black text-white">قدّم طلبًا إلى المنصة</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

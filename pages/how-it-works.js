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
  MapPinned,
  MessageSquare,
  Scale,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
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
  },
  {
    title: 'مزودو الخدمات',
    description: 'استعرض ملفات الشركات والمقاولين والمصانع والموردين والورش والحرفيين بعد اعتماد بياناتهم.',
    href: '/providers',
    icon: UsersRound,
  },
  {
    title: 'الخدمات والعروض',
    description: 'اكتشف خدمات البناء والمقاولات والتشطيبات والصيانة والتصميم بحسب التخصص والمكان.',
    href: '/services',
    icon: Wrench,
  },
  {
    title: 'المنتجات والمتاجر',
    description: 'ابحث عن مواد البناء والمنتجات والمتاجر والموردين المرتبطين باحتياج المشروع.',
    href: '/marketplace',
    icon: ShoppingBag,
  },
];

const customerJourney = [
  {
    number: '01',
    title: 'حدّد احتياجك وموقعك',
    description: 'ابدأ بنوع المشروع أو الخدمة أو المنتج، وحدد الإمارة والمدينة والمنطقة والمعلومات المتوفرة.',
    icon: Search,
  },
  {
    number: '02',
    title: 'ابحث أو تواصل مباشرة',
    description: 'استخدم دليل الإمارات أو صفحات الخدمات والمنتجات، ثم تواصل مع مزود مناسب أو اطلب عرض سعر.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'راجع العرض والخيارات',
    description: 'قارن نطاق العمل والمواصفات والخامات والمدة والسعر، وليس الرقم النهائي وحده.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'اطلب مناقصة داخلية عند الحاجة',
    description: 'إذا لم تجد سعرًا أو حلًا مناسبًا، ارفع الطلب إلى بيت الريف لتوسيـع البحث وجمع عروض إضافية.',
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

function BackgroundImage({ src, alt, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="100vw" />
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
        about: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL },
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/how-it-works#howto`,
        name: 'كيف تبدأ طلبك في منصة بيت الريف؟',
        description: 'خطوات البحث والتواصل وطلب عرض السعر والانتقال إلى المناقصة الداخلية عند الحاجة.',
        step: customerJourney.map((item) => ({
          '@type': 'HowToStep',
          position: Number(item.number),
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
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
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
        <meta property="og:image" content={`${SITE_URL}/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Navbar pageTitle="كيف تعمل المنصة" />

      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#071E11] text-white md:min-h-[680px]">
          <BackgroundImage
            src="/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp"
            alt=""
            className="opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071E11]/45 via-[#0F3F1A]/82 to-[#071E11]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.28),transparent_34%)]" />
          <div className="relative mx-auto flex min-h-[620px] max-w-6xl items-center px-4 py-16 text-center md:min-h-[680px] md:py-24">
            <div className="mx-auto max-w-5xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#071E11]/55 px-4 py-2 text-sm font-black text-[#F3D46B] backdrop-blur">
                <Globe className="h-4 w-4" />
                تعرّف على منصة بيت الريف
              </span>
              <h1 className="mt-6 text-4xl font-black leading-[1.25] md:text-7xl">
                كيف تعمل منصة بيت الريف؟
                <span className="mt-3 block text-[#F3D46B]">من فهم الاحتياج إلى الوصول للخيار المناسب</span>
              </h1>
              <p className="mx-auto mt-7 max-w-4xl text-lg font-semibold leading-9 text-white/90 md:text-xl md:leading-10">
                تجمع بيت الريف دليل الإمارات ومزودي الخدمات والخدمات والمنتجات ووياك وطلبات عروض الأسعار في رحلة واحدة. وعندما لا يجد العميل سعرًا أو حلًا مناسبًا، يمكنه رفع الطلب إلى المنصة لتدير بيت الريف مناقصة داخلية منظمة.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/uae" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A] shadow-xl transition hover:-translate-y-0.5">
                  ابدأ من دليل الإمارات <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/weyaak" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-black text-white backdrop-blur transition hover:bg-white/15">
                  ابدأ طلبك مع وياك <Bot className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_34%),linear-gradient(to_bottom,#FDFBF7,#FFFFFF)]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-sm font-black text-[#9B7A18]">بوابات المنصة</span>
              <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">ابدأ من المسار الأقرب إلى احتياجك</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">لكل بوابة وظيفة واضحة، وجميعها ترتبط بنفس بيانات النشاط والخدمة والمنتج والموقع.</p>
            </div>
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {platformGateways.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} href={item.href} className="group rounded-[2rem] border border-[#E6DCC8] bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F3F1A]/8 text-[#0F3F1A] transition group-hover:bg-[#D4AF37]/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-black text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#9B7A18]">انتقل إلى القسم <ArrowLeft className="h-4 w-4" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-white px-4 py-16 md:py-24">
          <BackgroundImage
            src="/images/webp/bait-alreef-uae-smart-network-coverage.webp"
            alt=""
            className="opacity-[0.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-[#FDFBF7]/90" />
          <div className="relative mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-sm font-black text-[#9B7A18]">رحلة العميل</span>
              <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black text-[#0F3F1A] md:text-5xl">ابدأ بالطريق الأبسط، وانتقل إلى المناقصة عند الحاجة</h2>
              <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-600">لا نفرض على العميل مناقصة من البداية؛ يبدأ بالبحث أو التواصل أو عرض السعر، ثم ينتقل إلى المسار الداخلي فقط عندما يحتاج إلى خيارات أوسع.</p>
            </div>
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {customerJourney.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.number} className="relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white/95 p-6 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#9B7A18]">{item.number}</span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-5 w-5" /></div>
                    </div>
                    <h3 className="mt-5 text-lg font-black text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#0F3F1A] px-4 py-16 text-white md:py-24">
          <BackgroundImage
            src="/images/webp/bait-alreef-next-step-contractor-future.webp"
            alt=""
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F3F1A]/88 via-[#071E11]/94 to-[#071E11]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Target className="h-4 w-4" />
                المناقصة الداخلية في بيت الريف
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">خدمة مُدارة للبحث عن أفضل توافق</h2>
              <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/82">تُستخدم عندما لا يحصل العميل على عرض مناسب، ويمكن أن تغطي مشروعًا أو خدمة أو منتجًا أو مادة بناء أو توريدًا. وهي ليست إعلانًا عامًا، بل مسار داخلي تديره بيت الريف.</p>
            </div>
            <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tenderSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#D4AF37]">{step.number}</span>
                      <Icon className="h-6 w-6 text-[#F3D46B]" />
                    </div>
                    <h3 className="mt-4 text-lg font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/75">{step.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-9 text-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A] transition hover:bg-[#E7C45A]">
                قدّم طلبك إلى بيت الريف <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-white px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,63,26,0.09),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="text-sm font-black text-[#9B7A18]">لمزود الخدمة والشريك</span>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">حضور رقمي وفرص مرتبطة بتخصصك</h2>
              <p className="mt-5 leading-8 text-gray-600">يعتمد الوصول إلى الطلبات والمناقصات على اكتمال الملف واعتماد البيانات وتوافق النشاط والخدمات والمنتجات ومناطق العمل مع احتياج العميل.</p>
              <div className="mt-7 space-y-3">
                {providerBenefits.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                    <p className="text-sm font-semibold leading-7 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/providers/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3F1A] px-7 py-3.5 font-black text-white">
                  انضم كمزود خدمة <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/partners" className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">تعرّف على الشراكة</Link>
              </div>
            </div>
            <div className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-[#071E11] shadow-2xl">
              <Image
                src="/images/webp/bait-alreef-next-step-contractor-future.webp"
                alt="مزود الخدمة وفرص الأعمال في منصة بيت الريف"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E11]/75 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] to-[#F6F0E5]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-sm font-black text-[#9B7A18]">قواعد واضحة</span>
              <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">كيف نحافظ على وضوح العملية؟</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#0F3F1A]"><Icon className="h-6 w-6" /></div>
                    <h3 className="mt-5 text-xl font-black text-gray-900">{item.title}</h3>
                    <p className="mt-3 leading-8 text-gray-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-white px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_35%)]" />
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-[#E6DCC8] bg-[#FDFBF7] p-7 shadow-xl md:p-11">
            <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-[#D4AF37]/35 shadow-2xl md:h-64 md:w-64">
                <Image src="/images/weyaak-new-logo.jpg" alt="وياك مساعد بيت الريف الذكي" fill className="object-cover" sizes="256px" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#9B7A18]"><Bot className="h-5 w-5" /> وياك</span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">يساعدك على توضيح الطلب، ولا يتخذ القرار بدلًا عنك</h2>
                <p className="mt-5 leading-8 text-gray-600">يفهم وياك وصف العميل، ويستخرج الخدمة والموقع والمقاسات والمواصفات، ثم يوجهه إلى الدليل أو عرض السعر أو طلب المناقصة. وتعتمد التوصيات على البيانات المنشورة والمعتمدة داخل المنصة.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/weyaak" className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A] px-6 py-3 font-black text-white"><Bot className="h-5 w-5" /> تحدّث مع وياك</Link>
                  <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] px-6 py-3 font-black text-[#0F3F1A]"><BriefcaseBusiness className="h-5 w-5" /> استكشف الأدوات</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="relative isolate overflow-hidden px-4 py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] to-white" />
          <div className="relative mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-sm font-black text-[#9B7A18]">الأسئلة الشائعة</span>
              <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">أسئلة شائعة حول كيف تعمل منصة بيت الريف</h2>
              <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-600">إجابات واضحة على أهم الأسئلة المتعلقة بعروض الأسعار والمناقصة الداخلية ودور وياك داخل المنصة.</p>
            </div>
            <div className="mt-10 space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="group rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm transition open:border-[#D4AF37] open:shadow-md">
                  <summary className="cursor-pointer list-none text-lg font-black text-[#0F3F1A]">{item.question}</summary>
                  <p className="mt-4 leading-8 text-gray-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] bg-[#0F3F1A] p-8 text-center text-white shadow-2xl md:p-12">
            <BackgroundImage
              src="/images/webp/bait-alreef-premier-integrated-business-system.webp"
              alt=""
              className="opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0F3F1A]/95 to-[#194F27]/90" />
            <div className="relative">
              <h2 className="text-3xl font-black md:text-5xl">ابدأ بالطريق الأبسط، وانتقل للمناقصة عند الحاجة</h2>
              <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/85">ابحث وتواصل واطلب عرض سعر أولًا. وعندما لا تجد الخيار المناسب، ارفع الطلب إلى بيت الريف ليتم مراجعته وبناء مناقصة داخلية واضحة.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/uae" className="rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">استكشف الدليل</Link>
                <Link href="/contact" className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-black text-white">قدّم طلبًا إلى المنصة</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

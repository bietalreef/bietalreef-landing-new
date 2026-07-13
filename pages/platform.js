import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import {
  Search,
  UsersRound,
  Wrench,
  ShoppingBag,
  Bot,
  BriefcaseBusiness,
  ShieldCheck,
  Globe,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Target,
  FileSearch,
  ClipboardCheck,
  Send,
  Scale,
  BadgeCheck,
  MapPinned,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const platformGateways = [
  {
    title: 'دليل الإمارات',
    desc: 'ابدأ من الإمارة والمنطقة للوصول إلى الخدمات والأنشطة والمزودين المرتبطين بالموقع.',
    href: '/uae',
    icon: MapPinned,
  },
  {
    title: 'مزودو الخدمات',
    desc: 'استعرض ملفات الشركات والمقاولين والمصانع والموردين والورش والحرفيين بعد اعتماد بياناتهم.',
    href: '/providers',
    icon: UsersRound,
  },
  {
    title: 'الخدمات والعروض',
    desc: 'اكتشف خدمات البناء والمقاولات والتشطيبات والصيانة والتصميم بحسب التخصص والمكان.',
    href: '/services',
    icon: Wrench,
  },
  {
    title: 'المنتجات والمتاجر',
    desc: 'ابحث عن مواد البناء والمنتجات والمتاجر والموردين المرتبطين باحتياج المشروع.',
    href: '/marketplace',
    icon: ShoppingBag,
  },
];

const clientPaths = [
  {
    title: 'البحث والتواصل المباشر',
    desc: 'اختر الموقع أو الخدمة، راجع الملفات المنشورة، ثم تواصل مع المزود أو اطلب منه عرض سعر.',
    icon: Search,
  },
  {
    title: 'تنظيم الطلب مع وياك',
    desc: 'صف احتياجك بلغتك، ويساعد وياك على تحديد النشاط والخدمة والموقع والمقاسات والمعلومات الناقصة.',
    icon: MessageSquare,
  },
  {
    title: 'رفع الطلب إلى بيت الريف',
    desc: 'عندما لا تجد سعرًا أو حلًا مناسبًا، تستطيع إرسال الطلب إلى المنصة لمراجعته وتحديد المسار التالي.',
    icon: Send,
  },
  {
    title: 'مناقصة داخلية مُدارة',
    desc: 'تنشئ بيت الريف مناقصة داخلية وتبحث عن مزود أو خدمة أو منتج متوافق مع النطاق والموقع.',
    icon: Target,
  },
];

const tenderSteps = [
  {
    number: '01',
    title: 'تقديم طلب المناقصة',
    desc: 'يرسل العميل تفاصيل المشروع أو الخدمة أو المنتج، ويوضح أن العروض الحالية لم تحقق السعر أو الحل المناسب.',
    icon: FileSearch,
  },
  {
    number: '02',
    title: 'مراجعة النطاق',
    desc: 'تراجع بيت الريف المواصفات والموقع والكميات والصور والمدة والميزانية الاسترشادية، وتطلب أي معلومات ناقصة.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'اختيار الجهات المناسبة',
    desc: 'تُحدد الشركات أو الموردون أو المصانع أو الورش المتوافقة مع التخصص وموقع التنفيذ أو التوريد.',
    icon: UsersRound,
  },
  {
    number: '04',
    title: 'استقبال العروض',
    desc: 'تُرسل الدعوات داخليًا، وتستلم بيت الريف عروض الجهات المدعوة وفق النطاق والمعلومات المعتمدة.',
    icon: Send,
  },
  {
    number: '05',
    title: 'مقارنة منظمة',
    desc: 'تُراجع العروض وفق السعر والمواصفات والجودة والمدة والموقع والقدرة على التنفيذ أو التوريد.',
    icon: Scale,
  },
  {
    number: '06',
    title: 'عرض الخيارات على العميل',
    desc: 'تُنظم أفضل الخيارات المتوافقة وتُعرض على العميل، ويبقى القرار النهائي له قبل التعاقد.',
    icon: BadgeCheck,
  },
];

const providerBenefits = [
  'ملف رقمي منظم يعرض النشاط والخدمات والمنتجات والمشاريع ومناطق العمل.',
  'ظهور في المسارات المناسبة داخل دليل الإمارات وصفحات الخدمات والمنتجات.',
  'استقبال طلبات عروض مرتبطة بالتخصص والموقع عند تطابق البيانات.',
  'إمكانية الدعوة إلى مناقصات داخلية عندما يتوافق النشاط والقدرة مع الطلب.',
];

const platformPrinciples = [
  {
    title: 'المناقصة ليست إعلانًا عامًا',
    desc: 'هي مسار داخلي تديره بيت الريف، وتُرسل إلى جهات محددة بعد مراجعة توافقها مع الطلب.',
    icon: ShieldCheck,
  },
  {
    title: 'الأفضل لا يعني الأرخص فقط',
    desc: 'المقارنة تشمل السعر والمواصفات وجودة المواد أو الخدمة والمدة والقدرة على الالتزام.',
    icon: Scale,
  },
  {
    title: 'العميل صاحب القرار',
    desc: 'بيت الريف تنظم البحث والمقارنة، لكن اختيار العرض والتعاقد النهائي يظل بقرار العميل ووفق الشروط المتفق عليها.',
    icon: CheckCircle2,
  },
];

const faq = [
  {
    q: 'ما هي منصة بيت الريف؟',
    a: 'بيت الريف منصة رقمية إماراتية متخصصة في قطاع البناء والمقاولات والتشطيبات والصيانة ومواد البناء. تنظم اكتشاف المزودين والخدمات والمنتجات وطلبات عروض الأسعار والمناقصات الداخلية.',
  },
  {
    q: 'هل يجب أن أبدأ بمناقصة؟',
    a: 'لا. يبدأ العميل عادة بالبحث والتواصل أو طلب عرض سعر من مزود مناسب. تُستخدم المناقصة الداخلية عندما لا يحصل على سعر أو حل مناسب، أو عندما يحتاج الطلب إلى مقارنة أوسع.',
  },
  {
    q: 'من ينشئ المناقصة الداخلية؟',
    a: 'يقدم العميل الطلب إلى بيت الريف، ثم تراجع المنصة النطاق والمعلومات وتُنشئ المناقصة وتدعو الجهات المناسبة لتقديم عروضها.',
  },
  {
    q: 'هل يمكن أن تكون المناقصة لخدمة أو منتج؟',
    a: 'نعم. يمكن أن تتعلق بمشروع أو خدمة تنفيذية أو صيانة أو مادة بناء أو منتج أو توريد، وفق طبيعة احتياج العميل.',
  },
  {
    q: 'هل تضمن بيت الريف أقل سعر؟',
    a: 'لا. الهدف هو الوصول إلى أفضل توافق ممكن بين السعر والمواصفات والجودة والمدة والموقع والقدرة على التنفيذ أو التوريد، دون وعد بنتيجة غير مؤكدة.',
  },
];

export default function PlatformPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/platform#webpage`,
        name: 'منصة بيت الريف للبناء والمقاولات في الإمارات',
        description: 'تعرف على منظومة بيت الريف لاكتشاف مزودي الخدمات والمنتجات وطلبات عروض الأسعار والمناقصات الداخلية المُدارة في الإمارات.',
        url: `${SITE_URL}/platform`,
        inLanguage: 'ar-AE',
        isPartOf: {
          '@type': 'WebSite',
          name: 'بيت الريف',
          url: SITE_URL,
        },
        about: {
          '@type': 'Organization',
          name: 'بيت الريف',
          url: SITE_URL,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/platform#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <SEOHead
        title="منصة بيت الريف | الخدمات والمنتجات والمناقصات الداخلية"
        description="تعرف على منصة بيت الريف: دليل الإمارات، مزودو الخدمات، الخدمات والمنتجات، وياك، وطلبات عروض الأسعار والمناقصات الداخلية المُدارة في قطاع البناء."
        keywords="منصة بيت الريف, مناقصات داخلية, طلب عرض سعر, مزودو خدمات البناء, موردو مواد البناء, مقاولات الإمارات, وياك"
        canonicalPath="/platform"
        structuredData={structuredData}
      />
      <Navbar pageTitle="المنصة" />

      <main>
        <section className="relative isolate overflow-hidden bg-[#FDFBF7] pt-0">
          <div className="relative mx-auto max-w-7xl px-0 md:px-4">
            <div className="relative aspect-[16/11] overflow-hidden rounded-b-[2rem] border-b border-[#E6DCC8] bg-[#F7F1E8] shadow-xl shadow-[#0F3F1A]/8 md:aspect-[16/7] md:rounded-[2.75rem] md:border">
              <Image
                src="/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp"
                alt="منصة بيت الريف لخدمات البناء والمقاولات والمنتجات في الإمارات"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-[#0F3F1A]/35" />
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 md:-mt-12">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E6DCC8] bg-white/95 px-5 py-8 text-center shadow-2xl shadow-[#8A6A00]/8 backdrop-blur md:px-12 md:py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black text-[#6F5400]">
              <Globe className="h-4 w-4" />
              منظومة رقمية متخصصة بقطاع البناء
            </span>
            <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-6xl">
              منصة بيت الريف
              <span className="block text-[#9B7A18]">من البحث المباشر إلى المناقصة الداخلية</span>
            </h1>
            <p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-700 md:text-xl md:leading-10">
              تجمع بيت الريف دليل الإمارات ومزودي الخدمات والخدمات والمنتجات ووياك وطلبات عروض الأسعار في رحلة واحدة. وعندما لا يصل العميل إلى سعر أو حل مناسب، يمكنه رفع الطلب إلى المنصة لتدير بيت الريف مناقصة داخلية وتبحث عن خيارات أكثر توافقًا.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/uae" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3F1A] px-7 py-3.5 font-black text-white shadow-lg transition hover:-translate-y-0.5">
                ابدأ من دليل الإمارات
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-[#FFF8E5] px-7 py-3.5 font-black text-[#0F3F1A] transition hover:bg-[#F7E8B5]">
                شاهد طريقة العمل
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <span className="text-sm font-black text-[#9B7A18]">بوابات المنصة</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">ابدأ من المسار الأقرب لاحتياجك</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-600">كل بوابة لها وظيفة واضحة، لكنها ترتبط بنفس بيانات النشاط والخدمة والمنتج والموقع.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {platformGateways.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F3F1A]/8 text-[#0F3F1A] transition group-hover:bg-[#D4AF37]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#9B7A18]">انتقل إلى القسم <ArrowLeft className="h-4 w-4" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-[#071A2F] shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/webp/bait-alreef-uae-smart-network-coverage.webp"
                    alt="رحلة العميل داخل منصة بيت الريف"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
              <div>
                <span className="text-sm font-black text-[#9B7A18]">رحلة العميل</span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">أكثر من طريق للوصول إلى الحل</h2>
                <p className="mt-5 leading-8 text-gray-600">لا نفرض على العميل مناقصة من البداية. يبدأ بالبحث أو عرض السعر، ثم ينتقل إلى المناقصة الداخلية فقط عندما يحتاج إلى توسيع الخيارات.</p>
                <div className="mt-7 space-y-4">
                  {clientPaths.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 rounded-3xl border border-[#E6DCC8] bg-[#FDFBF7] p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-[#9B7A18]">المرحلة {index + 1}</span>
                          <h3 className="mt-1 font-black text-gray-900">{item.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="overflow-hidden rounded-[2.75rem] bg-[#0F3F1A] p-6 text-white shadow-2xl md:p-11">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Target className="h-4 w-4" />
                المناقصة الداخلية في بيت الريف
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">خدمة مُدارة للبحث عن أفضل توافق</h2>
              <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/85">تُستخدم عندما لم يحصل العميل على عرض مناسب، وتغطي المشروعات والخدمات والمنتجات ومواد البناء والتوريد. لا تُفتح للعامة، بل تُدار وتُرسل إلى جهات مناسبة بعد مراجعة الطلب.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tenderSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="rounded-3xl border border-white/10 bg-white/8 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#D4AF37]">{step.number}</span>
                      <Icon className="h-6 w-6 text-[#F3D46B]" />
                    </div>
                    <h3 className="mt-4 text-lg font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/75">{step.desc}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A] transition hover:bg-[#E7C45A]">
                قدم طلبك إلى بيت الريف
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="text-sm font-black text-[#9B7A18]">لمزود الخدمة والشريك</span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">حضور رقمي وفرص مرتبطة بتخصصك</h2>
                <p className="mt-5 leading-8 text-gray-600">يعتمد الوصول إلى الطلبات والمناقصات على اكتمال الملف واعتماد البيانات وتوافق النشاط والخدمات والمنتجات ومناطق العمل مع احتياج العميل.</p>
                <div className="mt-7 space-y-3">
                  {providerBenefits.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#FDFBF7] p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                      <p className="text-sm font-semibold leading-7 text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/providers/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3F1A] px-7 py-3.5 font-black text-white">
                    انضم كمزود خدمة
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <Link href="/partners" className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">تعرف على الشراكة</Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-[#071A2F] shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/webp/bait-alreef-next-step-contractor-future.webp"
                    alt="مزود الخدمة وفرص الأعمال في منصة بيت الريف"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <span className="text-sm font-black text-[#9B7A18]">قواعد واضحة</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">كيف نحافظ على وضوح العملية؟</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {platformPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#0F3F1A]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-gray-900">{item.title}</h3>
                  <p className="mt-3 leading-8 text-gray-600">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 shadow-xl md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-[#D4AF37]/35 shadow-2xl md:h-64 md:w-64">
                <Image src="/images/weyaak-new-logo.jpg" alt="وياك مساعد بيت الريف" fill className="object-cover" sizes="256px" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#9B7A18]"><Bot className="h-5 w-5" /> وياك</span>
                <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">يساعدك على توضيح الطلب، لا يتخذ القرار بدلًا عنك</h2>
                <p className="mt-5 leading-8 text-gray-600">يعمل وياك على فهم وصف العميل، واستخراج الخدمة والموقع والمقاسات والمواصفات، وتوجيهه إلى الدليل أو عرض السعر أو طلب المناقصة. وتعتمد التوصيات على البيانات المنشورة والمعتمدة داخل المنصة.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/weyaak" className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A] px-6 py-3 font-black text-white"><Bot className="h-5 w-5" /> تحدث مع وياك</Link>
                  <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] px-6 py-3 font-black text-[#0F3F1A]"><BriefcaseBusiness className="h-5 w-5" /> استكشف الأدوات</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-5xl">أسئلة شائعة عن المنصة والمناقصة الداخلية</h2>
          </div>
          <div className="mt-9 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm">
                <summary className="cursor-pointer list-none font-black text-gray-900">{item.q}</summary>
                <p className="mt-4 leading-8 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-gradient-to-l from-[#0F3F1A] to-[#194F27] p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-3xl font-black md:text-5xl">ابدأ بالطريق الأبسط، وانتقل للمناقصة عند الحاجة</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/85">ابحث وتواصل واطلب عرض سعر أولًا. وعندما لا تجد الخيار المناسب، ارفع الطلب إلى بيت الريف ليتم مراجعته وبناء مناقصة داخلية واضحة.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/uae" className="rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">استكشف الدليل</Link>
              <Link href="/contact" className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-black text-white">قدم طلبًا إلى المنصة</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import {
  LayoutDashboard,
  ShoppingBag,
  Wrench,
  ShieldCheck,
  Zap,
  Globe,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  FileText,
  Target,
  Search,
  UsersRound,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroCards = [
  { title: 'للعميل', desc: 'ابحث، تواصل مباشرة، أو دع وياك يحول احتياجك إلى مسار واضح.', icon: Search },
  { title: 'لمزود الخدمة', desc: 'أدر نشاطك من هاتفك وابنِ حضورك حيث يبحث عنك عملاؤك.', icon: UsersRound },
];

const sections = [
  {
    title: 'الهوية الرقمية الاحترافية',
    desc: 'صفحة احترافية تعكس نشاطك التجاري بشكل صحيح. ملف أعمال متكامل يشمل تخصصاتك وخدماتك ومشاريعك السابقة ومناطق تغطيتك الجغرافية في الإمارات.',
    icon: Globe,
    image: '/images/webp/bait-alreef-engineering-excellence-four-pillars.webp',
    keywords: ['صفحة احترافية', 'ملف أعمال', 'تخصصات'],
  },
  {
    title: 'الظهور حيث يبحث عملاؤك',
    desc: 'سواء كان عميلك يبحث في Google، أو يسأل أنظمة الذكاء الاصطناعي، أو يبحث داخل بيت الريف حسب المدينة أو الخدمة — هدفنا أن تكون ضمن النتائج المناسبة.',
    icon: ShoppingBag,
    image: '/images/webp/bait-alreef-uae-smart-network-coverage.webp',
    keywords: ['Google', 'ذكاء اصطناعي', 'ظهور رقمي'],
  },
  {
    title: 'مستندات احترافية وسريعة',
    desc: 'أنشئ عروض أسعار وعقود وفواتير بشكل احترافي خلال دقائق. وياك يساعدك في الصياغة والتنسيق. من أول عرض سعر... إلى آخر فاتورة.',
    icon: FileText,
    image: '/images/webp/bait-alreef-premier-integrated-business-system.webp',
    keywords: ['عروض أسعار', 'عقود', 'فواتير'],
  },
  {
    title: 'مناقصات مطابقة لتخصصك',
    desc: 'استقبل مناقصات تتطابق مع تخصصاتك ومناطق تغطيتك. لا تنافس خارج مجالك. بيت الريف يوصلك بالطلبات التي تناسب نشاطك.',
    icon: Target,
    image: '/images/webp/bait-alreef-next-step-contractor-future.webp',
    keywords: ['مناقصات', 'طلبات عملاء', 'تخصصات'],
  },
  {
    title: 'وياك مدير أعمالك الذكي',
    desc: 'وياك ليس مجرد روبوت محادثة. هو مساعد أعمالك الذكي: يساعدك في كتابة العروض، إنشاء المستندات، الرد على العملاء، وتنظيم عملك من هاتفك.',
    icon: Zap,
    image: '/images/weyaak-new-logo.jpg',
    isWeyaak: true,
    keywords: ['مساعد ذكي', 'إدارة أعمال', 'موبايل'],
  },
];

const clientPaths = [
  { title: 'بحث وتواصل مباشر', desc: 'تصفّح حسب الإمارة والمنطقة والخدمة، ثم تواصل مباشرة مع المزود المناسب.', icon: Search },
  { title: 'مساعدة وياك الذكية', desc: 'صف احتياجك بلغتك، ووياك يفهم التخصص والمكان ويقترح المسار الأنسب.', icon: MessageSquare },
  { title: 'مناقصة داخلية مؤهلة', desc: 'حوّل طلبك إلى مناقصة تصل لمزودين مؤهلين حسب التخصص والمنطقة.', icon: Target },
];

const coreValues = [
  {
    title: 'لا نبيع إعلاناً مؤقتاً',
    desc: 'الحملة تنتهي بانتهاء الميزانية، أما بيت الريف فيبني لك حضوراً رقمياً مستداماً يخدم نشاطك.',
    icon: ShieldCheck,
  },
  {
    title: 'لا نشتري لك الظهور',
    desc: 'نبنيه لك عبر ملف مهني واضح، محتوى منظم، تخصصات دقيقة، وربط صحيح برحلة العميل.',
    icon: Globe,
  },
  {
    title: 'من أول استفسار إلى آخر فاتورة',
    desc: 'المنصة ليست واجهة فقط؛ هي منظومة تشغيل تساعد العميل والمزود على إدارة الرحلة كاملة.',
    icon: LayoutDashboard,
  },
];

const faq = [
  {
    q: 'ما هي منصة بيت الريف بالضبط؟',
    a: 'بيت الريف هي محرك أعمال رقمي لقطاع المقاولات والبناء في الإمارات. تساعد العملاء على الوصول للمزود المناسب، وتساعد مزودي الخدمة على إدارة أعمالهم وبناء حضورهم الرقمي.',
  },
  {
    q: 'هل بيت الريف دليل شركات فقط؟',
    a: 'لا. الدليل جزء من المنظومة، لكن بيت الريف يجمع الدليل، مزودي الخدمات، الخدمات والعروض، المنتجات، وياك، وأدوات التشغيل في رحلة واحدة.',
  },
  {
    q: 'كيف يساعدني وياك؟',
    a: 'للعميل: يفهم احتياجه ويقترح المسار الأنسب. لمزود الخدمة: يساعده في المستندات والعروض والردود وتنظيم العمل.',
  },
  {
    q: 'ما الفرق بين بيت الريف والإعلان التقليدي؟',
    a: 'الإعلان يجلب زيارات مؤقتة، أما بيت الريف يبني حضوراً رقمياً دائماً يعتمد على ملفك، تخصصاتك، محتواك، وأعمالك.',
  },
];

export default function PlatformPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات',
    description: 'منظومة بيت الريف الرقمية الشاملة لإدارة مشاريع البناء والتشطيب والصيانة في الإمارات العربية المتحدة.',
    url: `${SITE_URL}/platform`,
    inLanguage: 'ar-AE',
    publisher: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'City', name: 'دبي' },
      { '@type': 'City', name: 'أبوظبي' },
      { '@type': 'City', name: 'الشارقة' },
      { '@type': 'City', name: 'عجمان' },
    ],
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <SEOHead
        title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات"
        description="بيت الريف ليس دليلاً فقط، بل منظومة تشغيل رقمية تساعد العميل على الوصول للحل المناسب، وتساعد مزود الخدمة على إدارة نشاطه التجاري وبناء حضوره الرقمي من هاتفه."
        keywords="محرك الأعمال الرقمي, مقاولات الإمارات, إدارة مشاريع بناء, مزودو خدمات, تكنولوجيا البناء, بيت الريف, وياك"
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
                alt="محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-[#0F3F1A]/30" />
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 md:-mt-12">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E6DCC8] bg-white/95 px-5 py-7 text-center shadow-2xl shadow-[#8A6A00]/8 backdrop-blur md:px-12 md:py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-2 text-xs font-black text-[#6F5400]">
              <Globe className="h-4 w-4" />
              المنظومة الشاملة
            </span>
            <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-6xl">
              محرك الأعمال الرقمي
              <span className="block text-[#9B7A18]">لقطاع المقاولات والبناء</span>
            </h1>
            <p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-650 md:text-xl md:leading-10">
              بيت الريف ليس دليلاً فقط. هو منظومة تشغيل رقمية تساعد العميل على الوصول للحل المناسب، وتساعد مزود الخدمة على إدارة نشاطه التجاري من هاتفه.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {heroCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-[1.75rem] border border-[#E6DCC8] bg-[#FDFBF7] p-5 text-right">
                    <Icon className="mb-3 h-7 w-7 text-[#0F3F1A]" />
                    <h2 className="text-xl font-black text-[#0F3F1A]">{card.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:bg-[#143D1F]">
                ابدأ كعميل
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <a href="https://app.bietalreef.ae/onboarding" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-7 py-4 text-base font-black text-[#0F3F1A] transition hover:border-[#0F3F1A]">
                ابدأ كمزود خدمة
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
          <div className="mb-8 text-center">
            <span className="text-sm font-black text-[#6F5400]">للعميل</span>
            <h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">لكل عميل طريقه الخاص</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-600">لا تبحث في عشرات المواقع ولا تتصل بعشرات الشركات. أخبرنا باحتياجك وبيت الريف يتولى تنظيم المسار.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {clientPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div key={path.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2E8] text-[#B0912F]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0F3F1A]">{path.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{path.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:py-14">
          <div className="mb-8 text-center">
            <span className="text-sm font-black text-[#6F5400]">لمزود الخدمة</span>
            <h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">أدر نشاطك التجاري بالكامل من هاتفك</h2>
            <p className="mx-auto mt-4 max-w-4xl text-base font-semibold leading-9 text-gray-600">من صفحة احترافية إلى مستندات ومناقصات وظهور رقمي. بيت الريف يساعدك على تنظيم نشاطك وبناء حضورك حيث يبحث عنك عملاؤك.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden opacity-20">
                    <Image src={section.image} alt="" fill className="translate-y-1/4 scale-110 object-cover object-center" sizes="(max-width: 768px) 90vw, 420px" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/20" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F2E8] text-[#B0912F] shadow-sm">
                      {section.isWeyaak ? (
                        <Image src="/images/weyaak-new-logo.jpg" alt="وياك" width={56} height={56} className="h-full w-full object-cover" />
                      ) : (
                        <Icon className="h-7 w-7" />
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-[#0F3F1A]">{section.title}</h3>
                    <p className="mt-3 min-h-[120px] text-sm font-semibold leading-8 text-gray-600">{section.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {section.keywords.map((keyword) => (
                        <span key={keyword} className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{keyword}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:py-14">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#E6DCC8] bg-white p-7 shadow-xl shadow-[#0F3F1A]/7 md:p-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 opacity-10 md:block">
              <Image src="/images/webp/bait-alreef-marketing-automation-client-reactivation.webp" alt="" fill className="object-cover object-center" sizes="50vw" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <span className="text-sm font-black text-[#6F5400]">الرسالة الاستراتيجية</span>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">لا نبيع لك إعلاناً مؤقتاً<br />نبني لك حضوراً رقمياً دائماً</h2>
              <p className="mt-5 text-base font-semibold leading-9 text-gray-600 md:text-lg">الحملات الإعلانية تنتهي بانتهاء الميزانية. أما بيت الريف فيبني لك حضوراً رقمياً يستمر: تخصصات واضحة، صفحة احترافية، محتوى يخدم نشاطك، ظهور داخل Google ومحركات الذكاء الاصطناعي، وأدوات تشغيل تساعدك على إدارة عملك.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {coreValues.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] p-4">
                      <Icon className="mb-3 h-6 w-6 text-[#B0912F]" />
                      <h3 className="font-black text-[#0F3F1A]">{value.title}</h3>
                      <p className="mt-2 text-xs font-semibold leading-6 text-gray-600">{value.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8 md:py-14">
          <h2 className="mb-6 text-center text-3xl font-black text-[#0F3F1A] md:text-4xl">أسئلة شائعة حول المنصة</h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-[1.5rem] border border-[#E6DCC8] bg-white p-5 shadow-sm transition hover:shadow-md">
                <h3 className="font-black text-[#0F3F1A]">{item.q}</h3>
                <p className="mt-2 text-sm font-semibold leading-8 text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 pt-4 md:pb-20">
          <div className="rounded-[2.5rem] border border-[#E6DCC8] bg-[#0F3F1A] p-7 text-center text-white shadow-2xl shadow-[#0F3F1A]/15 md:p-12">
            <h2 className="text-3xl font-black md:text-5xl">كل أعمال البناء والمقاولات في منصة واحدة</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-9 text-white/75 md:text-lg">من أول استفسار... إلى آخر فاتورة. بيت الريف هو نظام التشغيل الرقمي لقطاع المقاولات والبناء في الإمارات.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-black text-[#0F3F1A] transition hover:bg-[#F7F2E8]">
                ابدأ كعميل
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <a href="https://app.bietalreef.ae/onboarding" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                ابدأ كمزود خدمة
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

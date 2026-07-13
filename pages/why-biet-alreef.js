import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Compass,
  Factory,
  Search,
  Store,
  Target,
  UsersRound,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const challenges = [
  {
    title: 'صاحب المشروع والعميل',
    subtitle: 'يبحث عن جهة مناسبة وقرار أوضح',
    icon: UsersRound,
    accent: 'border-blue-200 bg-gradient-to-br from-blue-50 to-white',
    iconClass: 'bg-blue-100 text-blue-700',
    items: [
      'صعوبة تحديد الجهة الأنسب لتنفيذ العمل.',
      'تفاوت الأسعار ونطاقات العمل والخامات.',
      'ضياع الوقت في التواصل مع جهات غير مناسبة.',
      'عدم الوصول إلى عرض يلائم احتياج المشروع.',
    ],
  },
  {
    title: 'المقاول وصاحب النشاط',
    subtitle: 'يمتلك الخبرة لكنه يحتاج إلى الوصول الصحيح',
    icon: Building2,
    accent: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white',
    iconClass: 'bg-emerald-100 text-emerald-700',
    items: [
      'البحث المتكرر عن مقاول باطن أو مورد موثوق.',
      'الاعتماد على العلاقات الشخصية والإعلانات المؤقتة.',
      'غياب ملف رقمي يوضح الخدمات والقدرات الفعلية.',
      'صعوبة الوصول إلى العميل الذي يحتاج إلى تخصصه.',
    ],
  },
  {
    title: 'المورد والمصنع والورشة',
    subtitle: 'منتجات وقدرات تحتاج إلى عرض منظم',
    icon: Factory,
    accent: 'border-amber-200 bg-gradient-to-br from-amber-50 to-white',
    iconClass: 'bg-amber-100 text-amber-800',
    items: [
      'تشتت بيانات المنتجات والخدمات ومناطق التوريد.',
      'صعوبة ربط المنتج بالمشروع أو الخدمة المناسبة.',
      'عدم وصول فرص التوريد إلى الجهات المتوافقة.',
      'ضعف الظهور أمام العملاء ومحركات البحث.',
    ],
  },
];

const solutions = [
  {
    title: 'تنظيم السوق بحسب الاحتياج',
    text: 'نربط النشاط بالتخصص والخدمة والمنتج والمشروع والإمارة والمدينة والمنطقة، بدل القوائم العامة غير الدقيقة.',
    icon: Compass,
  },
  {
    title: 'بناء حضور رقمي مستدام',
    text: 'نساعد مزود الخدمة على تقديم خبرته وأعماله ومناطق عمله داخل ملف واضح قابل للتحديث والاكتشاف.',
    icon: Store,
  },
  {
    title: 'بحث ومقارنة أكثر وضوحًا',
    text: 'نمنح العميل طريقًا للبحث والتواصل وطلب السعر وفهم الخيارات قبل اتخاذ الخطوة التالية.',
    icon: Search,
  },
  {
    title: 'مناقصة داخلية عند الحاجة',
    text: 'إذا لم يجد العميل عرضًا مناسبًا، تراجع بيت الريف طلبه وتبحث عن عروض من جهات أكثر توافقًا.',
    icon: Target,
  },
];

const faqItems = [
  ['لماذا أُنشئت بيت الريف؟', 'أُنشئت بيت الريف نتيجة خبرة عملية تجاوزت عشر سنوات في قطاع المقاولات داخل الإمارات، كشفت صعوبة الوصول إلى مقاولي الباطن والموردين والمواد المناسبة ومقارنة العروض بصورة منظمة.'],
  ['ما الذي يميز بيت الريف عن دليل الشركات العادي؟', 'لا تكتفي بيت الريف بعرض الأسماء والأرقام، بل تربط مزود الخدمة بنشاطه وتخصصاته وخدماته ومنتجاته ومشاريعه ومناطق عمله، ثم تربط هذه البيانات باحتياج العميل.'],
  ['كيف تخدم بيت الريف العميل؟', 'تساعده على توضيح احتياجه والبحث بحسب الخدمة والموقع، ومراجعة الخيارات، والتواصل أو طلب عرض سعر، ثم طلب مناقصة داخلية عندما لا يجد حلًا مناسبًا.'],
  ['كيف تخدم الشركات والحرفيين؟', 'تساعدهم على بناء حضور رقمي واضح يعرض خبراتهم وخدماتهم ومنتجاتهم ومناطق عملهم أمام العملاء ومحركات البحث ونماذج الذكاء الاصطناعي.'],
  ['هل تضمن بيت الريف أقل سعر؟', 'لا. هدف المنصة هو تحسين الوصول والمقارنة والبحث عن أفضل توافق ممكن بين السعر والمواصفات والجودة والمدة والقدرة على التنفيذ أو التوريد.'],
];

export default function WhyBietAlReefPage() {
  const description = 'تعرف على سبب إنشاء بيت الريف من خبرة عملية في سوق المقاولات بالإمارات، وكيف تنظم المنصة الوصول بين أصحاب المشاريع ومزودي الخدمات والموردين.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/why-biet-alreef#webpage`,
        url: `${SITE_URL}/why-biet-alreef`,
        name: 'لماذا بيت الريف؟',
        description,
        inLanguage: 'ar-AE',
        isPartOf: { '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL },
        about: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/why-biet-alreef#faq`,
        mainEntity: faqItems.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
      <Head>
        <title>لماذا بيت الريف؟ | حل وُلد من واقع سوق المقاولات</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/why-biet-alreef`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/why-biet-alreef`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/why-biet-alreef`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/why-biet-alreef`} />
        <meta property="og:title" content="لماذا بيت الريف؟ | من مشكلة السوق إلى حل رقمي" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/why-biet-alreef`} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Navbar pageTitle="لماذا بيت الريف" />

      <main>
        <section className="relative overflow-hidden bg-[#0F3F1A] px-4 py-16 text-white md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_34%),linear-gradient(135deg,#0F3F1A,#071E11)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <span className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]">حل وُلد من واقع السوق</span>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black leading-[1.3] md:text-6xl">
              لماذا بيت الريف؟
              <span className="mt-2 block text-[#F3D46B]">لأن الوصول إلى الخبرة المناسبة يجب أن يكون أوضح</span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-lg font-semibold leading-9 text-white/88 md:text-xl">
              وُلدت بيت الريف من تجربة عملية امتدت لأكثر من عشر سنوات في المقاولات داخل دولة الإمارات، بعد معاناة حقيقية في الوصول إلى مقاولي الباطن والموردين والمواد والأسعار المناسبة للمشاريع.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A] shadow-lg">
                تعرّف على المنصة <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-black text-white">اقرأ قصتنا</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <span className="text-sm font-black text-[#9B7A18]">المشكلة التي عشناها</span>
            <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">السوق كبير ومليء بالخبرات، لكن معلوماته متفرقة</h2>
            <p className="mx-auto mt-5 max-w-4xl text-base leading-9 text-gray-700 md:text-lg">لم تكن المشكلة في غياب الشركات أو الحرفيين أو المنتجات، بل في صعوبة اكتشاف الجهة المناسبة في الوقت المناسب، وفهم الفروق بين الأسعار والخامات ونطاقات العمل.</p>
          </div>

          <div className="mt-11 grid gap-6 lg:grid-cols-3">
            {challenges.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className={`rounded-[2.25rem] border p-7 shadow-lg ${card.accent}`}>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconClass}`}><Icon className="h-7 w-7" /></div>
                  <h3 className="mt-5 text-2xl font-black text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm font-bold text-gray-600">{card.subtitle}</p>
                  <ul className="mt-6 space-y-4">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-7 text-gray-700">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0F3F1A] to-[#194F27] p-8 text-white shadow-2xl md:p-10">
                <span className="text-sm font-black text-[#F3D46B]">من الخبرة إلى الحل</span>
                <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">بيت الريف لا تنظر إلى السوق من الخارج</h2>
                <p className="mt-6 leading-9 text-white/85">نعرف تحديات المقاول الذي يبحث عن مقاول باطن، وصاحب المشروع الذي يريد سعرًا واضحًا، والمورد الذي يريد الوصول إلى فرصة حقيقية، والحرفي الذي يمتلك الخبرة لكنه لا يظهر أمام من يحتاجها.</p>
                <blockquote className="mt-7 rounded-2xl border-r-4 border-[#D4AF37] bg-white/10 p-5 text-lg font-black leading-8">بيت الريف لم تُبنَ بعيدًا عن مشكلات السوق؛ بل وُلدت من داخلها لتقدم حلًا عمليًا لها.</blockquote>
              </div>

              <div>
                <span className="text-sm font-black text-[#9B7A18]">كيف نحول المشكلة إلى قيمة؟</span>
                <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">منظومة تجمع الاحتياج بالخبرة</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="rounded-3xl border border-[#E6DCC8] bg-[#FDFBF7] p-6 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37]/18 text-[#0F3F1A]"><Icon className="h-5 w-5" /></div>
                        <h3 className="mt-4 text-lg font-black text-gray-900">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <span className="text-sm font-black text-[#9B7A18]">قيمة للطرفين</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">دار رقمية لصاحب المشروع وصاحب النشاط</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-[2.25rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg">
              <h3 className="text-2xl font-black text-gray-900">للعميل وصاحب المشروع</h3>
              <p className="mt-5 leading-9 text-gray-700">نساعده على فهم احتياجه، واكتشاف الجهات المناسبة، ومراجعة الخدمات والمنتجات، وطلب عروض الأسعار، والانتقال إلى مناقصة داخلية عندما يحتاج إلى خيارات أوسع.</p>
            </article>
            <article className="rounded-[2.25rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-lg">
              <h3 className="text-2xl font-black text-gray-900">للشركة والمورد والحرفي</h3>
              <p className="mt-5 leading-9 text-gray-700">نساعدهم على عرض خبراتهم وخدماتهم ومنتجاتهم ومشاريعهم ومناطق عملهم بصورة منظمة، والوصول إلى العملاء والطلبات المتوافقة مع تخصصاتهم.</p>
            </article>
          </div>
          <p className="mt-8 text-center text-xl font-black text-[#0F3F1A]">نبني الثقة بين من يبحث عن الخدمة، ومن يمتلك الخبرة لتقديمها.</p>
        </section>

        <FAQ items={faqItems} title="أسئلة شائعة حول لماذا بيت الريف" />

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-gradient-to-l from-[#0F3F1A] to-[#194F27] p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-3xl font-black md:text-5xl">اكتشف كيف تتحول هذه الرؤية إلى رحلة عملية</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/85">تعرّف على مسارات المنصة من البحث المباشر وطلب السعر إلى المناقصة الداخلية المدارة بواسطة بيت الريف.</p>
            <Link href="/how-it-works" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">كيف تعمل المنصة؟ <ArrowLeft className="h-5 w-5" /></Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

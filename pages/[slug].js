import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const RESERVED_ARABIC_ROUTES = new Set([
  'cookies',
  'privacy',
  'legal',
  'why-biet-alreef',
  'how-it-works',
  'pricing',
]);

const PAGES = {
  'why-biet-alreef': {
    badge: 'لماذا بدأنا؟',
    title: 'لماذا بيت الريف',
    desc: 'لأن الوصول إلى مزود الخدمة أو المنتج المناسب في قطاع البناء لا يجب أن يعتمد على بحث عشوائي أو معلومة ناقصة أو سعر واحد بلا مقارنة.',
    intent: 'وُلدت بيت الريف من خبرة عملية داخل سوق المقاولات، حيث يواجه العميل صعوبة في تحديد الجهة المناسبة، بينما يمتلك كثير من الشركات والموردين والورش خبرة حقيقية لا تظهر بصورة واضحة. لذلك نبني مسارًا يجمع المكان والتخصص والخدمة والمنتج والطلب في منظومة واحدة.',
    points: [
      'ننظم السوق حسب الإمارة والمنطقة والنشاط والتخصص والخدمة بدل الاعتماد على قوائم عامة غير دقيقة.',
      'نمنح العميل أكثر من طريق: البحث المباشر، التواصل مع المزود، طلب عرض سعر، أو الاستعانة بوياك لتوضيح الاحتياج.',
      'عندما لا يصل العميل إلى عرض مناسب، يستطيع طلب مناقصة داخلية تديرها بيت الريف للبحث عن خيارات أفضل.'
    ],
    steps: ['مشكلة حقيقية في السوق', 'بيانات وخدمات منظمة', 'خيارات أوسع للعميل'],
    cta: 'اكتشف طريقة العمل',
    ctaHref: '/how-it-works',
    related: [
      { href: '/about', label: 'عن بيت الريف' },
      { href: '/how-it-works', label: 'كيف يعمل' },
      { href: '/platform', label: 'تعرف على المنصة' }
    ],
    faqs: [
      ['ما الذي يميز بيت الريف عن دليل الشركات العادي؟', 'بيت الريف لا يكتفي بعرض أسماء وأرقام؛ بل ينظم المزودين حسب النشاط والتخصص والخدمات والمنتجات ومناطق العمل، ويربط ذلك بطلب العميل ومسارات عرض السعر.'],
      ['لماذا توجد خدمة مناقصة داخلية؟', 'لمنح العميل مسارًا إضافيًا عندما لا يحصل على سعر أو حل مناسب من الخيارات المتاحة، فتراجع بيت الريف الطلب وتبحث عن عروض من جهات مناسبة.'],
      ['هل تضمن بيت الريف أقل سعر؟', 'لا نَعِد بأقل سعر مطلق، بل نبحث عن أفضل توافق بين السعر والمواصفات والجودة والموقع والقدرة على التنفيذ.']
    ]
  },
  'how-it-works': {
    badge: 'رحلة واضحة من الاحتياج إلى العرض',
    title: 'كيف تعمل منصة بيت الريف',
    desc: 'ابدأ بتحديد احتياجك وموقعك، ثم ابحث أو تواصل أو اطلب عرض سعر. وإذا لم تجد عرضًا مناسبًا، تستطيع رفع الطلب إلى بيت الريف لإنشاء مناقصة داخلية مُدارة.',
    intent: 'تقدم بيت الريف مسارين مترابطين: مسار مباشر للوصول إلى مزود أو منتج مناسب، ومسار مناقصة داخلية عند الحاجة إلى توسيع البحث وجمع عروض إضافية. وياك يساعد في تنظيم وصف الطلب وتحديد النشاط والخدمة والموقع والمعلومات المطلوبة.',
    points: [
      'يمكنك البحث حسب الإمارة والمنطقة والخدمة، ثم التواصل مباشرة مع مزود الخدمة أو إرسال طلب عرض سعر.',
      'يساعد وياك على فهم الطلب وتحويله إلى وصف منظم يسهل توجيهه إلى المسار الصحيح.',
      'إذا لم يكن السعر أو الحل مناسبًا، تراجع بيت الريف الطلب وتنشئ مناقصة داخلية لخدمة أو منتج أو مادة مطلوبة.'
    ],
    steps: ['حدد الاحتياج والموقع', 'ابحث أو اطلب عرض سعر', 'راجع الخيارات المستلمة', 'اطلب مناقصة داخلية عند الحاجة'],
    cta: 'ابدأ طلبك مع وياك',
    ctaHref: '/weyaak',
    related: [
      { href: '/uae', label: 'دليل الإمارات' },
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/platform', label: 'المنصة' }
    ],
    faqs: [
      ['متى أطلب عرض سعر ومتى أطلب مناقصة؟', 'ابدأ بطلب عرض سعر عندما تكون الخدمة واضحة ويمكن توجيهها إلى مزود مناسب. تُطلب المناقصة الداخلية عندما لا تحصل على سعر أو خيار مناسب، أو عندما يحتاج الطلب إلى مقارنة أوسع.'],
      ['من ينشئ المناقصة الداخلية؟', 'يتقدم العميل بالطلب إلى منصة بيت الريف، ثم تراجع بيت الريف التفاصيل وتحدد النطاق وتُنشئ المناقصة وتدعو الجهات المناسبة لتقديم عروضها.'],
      ['هل المناقصة عامة ومفتوحة للجميع؟', 'لا. هي مناقصة داخلية مُدارة، وتُرسل إلى مزودين أو موردين أو مصانع يتوافق نشاطهم وموقعهم وقدرتهم مع الطلب.'],
      ['كيف يتم اختيار أفضل عرض؟', 'تُقارن العروض وفق السعر والمواصفات وجودة المواد أو الخدمة وموقع التنفيذ والمدة والقدرة على الالتزام، ثم تُعرض الخيارات المناسبة على العميل لاتخاذ القرار.']
    ]
  },
  pricing: {
    badge: 'سياسة التسعير',
    title: 'الأسعار',
    desc: 'لا يعرض بيت الريف أسعارًا عشوائية أو غير معتمدة. السعر الصحيح يعتمد على المكان، المقاسات، المواد، نطاق العمل، وتفاصيل التنفيذ.',
    intent: 'توضح هذه الصفحة لماذا يختلف سعر أعمال البناء والصيانة والمنتجات من طلب إلى آخر، ولماذا يكون عرض السعر المبني على التفاصيل أكثر دقة من رقم عام.',
    points: [
      'السعر يختلف حسب المدينة ونوع الخدمة وتفاصيل المشروع.',
      'لا ننشر أسعارًا غير مؤكدة حتى لا نضلل العميل أو المزود.',
      'أفضل طريقة للحصول على رقم واقعي هي إرسال تفاصيل المشروع وطلب عرض سعر.'
    ],
    steps: ['أرسل وصف المشروع', 'حدد الموقع والمقاسات', 'استلم التوجيه أو العروض المناسبة'],
    cta: 'اطلب عرض سعر',
    ctaHref: '/contact',
    related: [
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/how-it-works', label: 'كيف يعمل' }
    ],
    faqs: [
      ['لماذا لا توجد أسعار ثابتة؟', 'لأن أعمال البناء والصيانة تتغير حسب الموقع، الكمية، جودة المواد، صعوبة التنفيذ، ووقت العمل.'],
      ['هل السعر المنشور نهائي؟', 'أي سعر استرشادي يحتاج إلى تأكيد من مزود الخدمة بعد مراجعة التفاصيل.'],
      ['كيف أحصل على عرض أدق؟', 'أرسل موقع المشروع والمقاسات والصور ونوع المواد المطلوبة ونطاق التنفيذ.']
    ]
  }
};

export default function GenericArabicPage({ page }) {
  if (!page) return null;
  const canonical = `https://bietalreef.ae/${page.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${page.title} | بيت الريف`,
    description: page.desc,
    url: canonical,
    inLanguage: 'ar-AE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: 'https://bietalreef.ae',
    },
  };

  return (
    <>
      <Head>
        <title>{page.title} | بيت الريف</title>
        <meta name="description" content={page.desc} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${page.title} | بيت الريف`} />
        <meta property="og:description" content={page.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-right text-gray-900 font-sans">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{page.title}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90 md:text-xl">{page.desc}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                <Link href={page.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:scale-[1.02]">
                  {page.cta}
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                  العودة إلى الرئيسية
                  <Compass className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">ما الذي تحتاج إلى معرفته؟</h2>
                <p className="mt-5 text-base leading-9 text-gray-600">{page.intent}</p>
              </article>

              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black text-gray-900">التزامنا</h2>
                <p className="mt-4 leading-8 text-gray-700">نقدم المعلومات بوضوح، ونراجع بيانات النشاط قبل النشر، ونتجنب الوعود غير المؤكدة بالأسعار أو الجودة أو نتائج التعاقد.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-right">
              <h2 className="text-2xl font-black md:text-3xl">النقاط الأساسية</h2>
              <p className="mt-3 leading-8 text-gray-600">معلومات واضحة تساعدك على اختيار الخطوة التالية المناسبة.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {page.points.map((point) => (
                <div key={point} className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
                  <p className="text-sm font-semibold leading-8 text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-[2rem] bg-[#0F3F1A] p-7 text-white md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">الخطوات</h2>
              <div className={`mt-8 grid gap-4 ${page.steps.length > 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                {page.steps.map((step, index) => (
                  <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <span className="text-sm font-black text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-lg font-black">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-gray-900">انتقل إلى القسم المناسب</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {page.related.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 transition hover:border-primary hover:text-primary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={page.faqs} title={`أسئلة شائعة حول ${page.title}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(PAGES)
      .filter((slug) => !RESERVED_ARABIC_ROUTES.has(slug))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = PAGES[params.slug];
  if (!page || RESERVED_ARABIC_ROUTES.has(params.slug)) return { notFound: true };
  return { props: { page: { ...page, slug: params.slug } } };
}

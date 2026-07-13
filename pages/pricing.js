import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  Globe2,
  Home,
  ImageIcon,
  LayoutTemplate,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  UsersRound,
  Wrench,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const customerBenefits = [
  'البحث في دليل الإمارات حسب الإمارة والمدينة والمنطقة.',
  'استعراض مزودي الخدمات والمنتجات والمشاريع المنشورة.',
  'إرسال طلب عرض سعر أو طلب مساعدة إلى منصة بيت الريف.',
  'استخدام وياك لتنظيم الاحتياج وتحديد المسار الأنسب.',
  'طلب مناقصة داخلية عند عدم الوصول إلى حل مناسب.',
];

const plans = [
  {
    id: 'internal',
    name: 'قائمة الموردين الداخلية',
    audience: 'للحرفيين والورش والموردين الراغبين في الانضمام إلى قاعدة بيت الريف الداخلية.',
    monthly: 'مجاني',
    annual: 'مجاني',
    badge: 'نقطة البداية',
    icon: UsersRound,
    features: [
      'إدراج بيانات النشاط الأساسية في القائمة الداخلية.',
      'إمكانية المطابقة مع طلبات أو مناقصات مناسبة.',
      'لا تتضمن صفحة عامة منشورة أو ظهورًا عامًا في الدليل.',
      'الدعوات تعتمد على توافق النشاط والموقع والقدرة مع الطلب.',
    ],
    cta: 'انضم إلى القائمة',
    href: '/providers/register',
  },
  {
    id: 'digital',
    name: 'الحضور الرقمي',
    audience: 'للورش والحرفيين والشركات الصغيرة التي تريد صفحة عامة منظمة وظهورًا واضحًا داخل المنصة.',
    monthly: '300 درهم',
    annual: '2,700 درهم',
    saving: 'وفر 900 درهم سنويًا',
    badge: 'مناسب للبداية',
    icon: Store,
    features: [
      'صفحة عامة احترافية بالعربية والإنجليزية.',
      'إضافة الخدمات والمنتجات والمشاريع وفق حدود الباقة.',
      'ظهور داخل دليل الإمارات وصفحات التخصص والموقع.',
      'SEO منظم وجاهزية أساسية للبحث بالذكاء الاصطناعي.',
      'استقبال طلبات العملاء عند توافق البيانات.',
    ],
    cta: 'اختر الحضور الرقمي',
    href: '/providers/register',
  },
  {
    id: 'professional',
    name: 'الحضور الاحترافي',
    audience: 'للشركات والمصانع ومزودي الخدمات الذين يريدون محتوى أوسع وتقارير أفضل وحضورًا أقوى.',
    monthly: '500 درهم',
    annual: '4,500 درهم',
    saving: 'وفر 1,500 درهم سنويًا',
    badge: 'الأكثر تكاملًا',
    featured: true,
    icon: BadgeCheck,
    features: [
      'حدود أعلى للخدمات والمنتجات والمشاريع والمحتوى.',
      'SEO متقدم وتهيئة أقوى لـ AEO وGEO وAI Search.',
      'تقارير وتحليلات أوسع عن الزيارات والتفاعل والطلبات.',
      'إبراز أعلى داخل المسارات المناسبة وفق جودة البيانات.',
      'تحديثات سنوية أكثر ودعم أفضل لتطوير الملف.',
    ],
    cta: 'اختر الحضور الاحترافي',
    href: '/providers/register',
  },
  {
    id: 'enterprise',
    name: 'المؤسسات والشركات',
    audience: 'للمجموعات والمصانع الكبرى والشركات متعددة الفروع التي تحتاج نطاقًا مخصصًا.',
    monthly: 'حسب الطلب',
    annual: 'حسب الطلب',
    badge: 'حلول مخصصة',
    icon: Building2,
    features: [
      'فروع وملفات متعددة ضمن هيكل واحد.',
      'حدود ومحتوى وصلاحيات وفق احتياج المؤسسة.',
      'تكاملات وتقارير مخصصة حسب نطاق العمل.',
      'دعم خاص ومراجعة دورية للبيانات والحضور.',
      'خطة تنفيذ وتسعير حسب المشروع والاحتياج.',
    ],
    cta: 'تواصل لعرض مخصص',
    href: '/contact',
  },
];

const optionalServices = [
  { title: 'تصميم الهوية والشعار', desc: 'تصميم شعار جديد أو تطوير الشعار الحالي بما يناسب طبيعة النشاط.', icon: Palette },
  { title: 'عرض السعر والفاتورة', desc: 'تصميم نماذج احترافية قابلة للاستخدام في التواصل مع العملاء.', icon: FileText },
  { title: 'صور احترافية للنشاط', desc: 'تحسين الصور الحالية أو تصميم صور عرض للخدمات والمنتجات والمشاريع.', icon: ImageIcon },
  { title: 'الملف التعريفي والمحتوى', desc: 'كتابة وتنظيم محتوى النشاط بالعربية والإنجليزية بصورة واضحة ومقنعة.', icon: LayoutTemplate },
  { title: 'تهيئة SEO وAEO وGEO', desc: 'تنظيم المحتوى والكلمات والأسئلة والبيانات لرفع قابلية الاكتشاف والفهم.', icon: Search },
  { title: 'تجهيز الملف بالكامل', desc: 'خدمة متكاملة للحرفيين والورش والشركات التي لا تمتلك بيانات رقمية جاهزة.', icon: Wrench },
];

const comparisonRows = [
  ['صفحة عامة منشورة', '—', 'متاحة', 'متاحة', 'مخصصة'],
  ['الخدمات والمنتجات والمشاريع', '—', 'وفق حدود الباقة', 'حدود أعلى', 'حسب الاتفاق'],
  ['SEO', '—', 'منظم', 'متقدم', 'مخصص'],
  ['جاهزية AEO وGEO وAI Search', '—', 'أساسية', 'متقدمة', 'مخصصة'],
  ['التقارير', '—', 'أساسية', 'متقدمة', 'مخصصة'],
  ['الإبراز داخل المنصة', 'مطابقة داخلية', 'قياسي', 'أعلى حسب الجودة', 'حسب الخطة'],
  ['طلبات الأسعار والمناقصة', 'عند المطابقة', 'عند المطابقة', 'عند المطابقة', 'حسب النطاق'],
];

const faqItems = [
  ['هل استخدام العميل لمنصة بيت الريف مجاني؟', 'نعم. لا تفرض بيت الريف رسومًا على العميل مقابل البحث أو إرسال طلب عرض سعر أو طلب مساعدة. أسعار التنفيذ أو التوريد يحددها مزود الخدمة أو المورد بحسب نطاق العمل.'],
  ['هل خدمات تجهيز الهوية والمحتوى إلزامية؟', 'لا. هي خدمات اختيارية بالكامل. يستطيع مزود الخدمة الاشتراك باستخدام بياناته وشعاره وصوره الحالية، أو طلب مساعدة بيت الريف عند الحاجة.'],
  ['هل تضمن الباقة ظهورًا أولًا أو عددًا محددًا من الطلبات؟', 'لا. الظهور والمطابقة يعتمدان على اكتمال البيانات وجودتها وتوافق النشاط والخدمة والموقع مع بحث العميل، ولا تبيع بيت الريف توصيات مضللة أو ضمانات غير واقعية.'],
  ['ما الفرق بين القائمة الداخلية والحضور الرقمي؟', 'القائمة الداخلية مجانية ولا تتضمن صفحة عامة منشورة. أما الحضور الرقمي فيتضمن ملفًا عامًا منظمًا وظهورًا داخل الدليل وصفحات التخصص والموقع وفق حدود الباقة.'],
  ['هل يمكن التحويل من الشهري إلى السنوي؟', 'نعم، ويمكن اختيار الدورة الأنسب عند التفعيل أو التجديد وفق سياسة الاشتراك المتاحة وقتها.'],
  ['هل الأسعار تشمل ضريبة القيمة المضافة؟', 'يتم توضيح الضريبة وأي تفاصيل مالية نهائية في الفاتورة أو عرض الاشتراك قبل الدفع وفق المتطلبات المعمول بها.'],
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-sm font-black text-[#A27E18]">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#102F18] md:text-5xl">{title}</h2>
      {description ? <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">{description}</p> : null}
    </div>
  );
}

export default function PricingPage() {
  const description = 'تعرّف على خطط وأسعار بيت الريف للعملاء ومزودي خدمات البناء والمقاولات في الإمارات، مع حضور رقمي منظم وخدمات تجهيز اختيارية للهوية والمحتوى.';
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-gray-900">
      <Head>
        <title>الخطط والأسعار | بيت الريف لمزودي خدمات البناء في الإمارات</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/pricing`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/pricing`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/pricing`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/pricing`} />
        <meta property="og:title" content="الخطط والأسعار | بيت الريف" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/pricing`} />
        <meta property="og:image" content={`${SITE_URL}/images/pricing/biet-alreef-pricing-hero-4k.webp`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Navbar pageTitle="الخطط والأسعار" />

      <main>
        <section className="relative isolate min-h-[720px] overflow-hidden px-4 py-8 text-white md:min-h-[780px] md:py-12">
          <Image
            src="/images/pricing/biet-alreef-pricing-hero-4k.webp"
            alt="العميل ومزود الخدمة متصلان عبر منصة بيت الريف الرقمية في الإمارات"
            fill
            priority
            className="-z-30 object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-l from-[#071E11]/94 via-[#102F18]/68 to-[#071E11]/35" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,rgba(7,30,17,0.08),rgba(7,30,17,0.65))]" />

          <div className="mx-auto max-w-7xl">
            <Link href="/" className="inline-flex items-center gap-3 rounded-[1.35rem] border border-white/30 bg-white/12 px-5 py-3.5 font-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:bg-white/18">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/14 text-[#F6D96F] shadow-inner"><Home className="h-4.5 w-4.5" /></span>
              العودة إلى الرئيسية
            </Link>

            <div className="mx-auto flex min-h-[610px] max-w-5xl flex-col items-center justify-center text-center md:min-h-[650px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#071E11]/50 px-4 py-2 text-sm font-black text-[#F6D96F] backdrop-blur-xl"><Sparkles className="h-4 w-4" /> خطط واضحة للطرفين</span>
              <h1 className="mt-6 text-4xl font-black leading-tight md:text-7xl">ابدأ مجانًا كعميل، وابنِ حضورك الرقمي كمزود خدمة</h1>
              <p className="mt-6 max-w-4xl text-base font-semibold leading-9 text-white/90 md:text-xl">بيت الريف يساعد العميل على البحث وطلب العروض والوصول إلى المسار المناسب دون رسوم من المنصة، ويوفر لمزودي الخدمات خططًا لبناء ملف رقمي منظم وجاهز للاكتشاف داخل الإمارات.</p>
              <div className="mt-9 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
                <a href="#customer" className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#102F18] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#E6C95C]">أنا عميل <ArrowLeft className="h-5 w-5" /></a>
                <a href="#provider-plans" className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/12 px-7 py-4 font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/18">أنا مزود خدمة <Building2 className="h-5 w-5 text-[#F6D96F]" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="customer" className="bg-[#FCFAF6] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] border border-[#E1D4B8] bg-white p-7 shadow-[0_28px_80px_rgba(15,63,26,0.13)] md:p-11">
            <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4D2] px-4 py-2 text-sm font-black text-[#8B6A10]"><UsersRound className="h-4 w-4" /> للعميل</span>
                <h2 className="mt-5 text-3xl font-black leading-tight text-[#102F18] md:text-5xl">استخدم المنصة وابدأ طلبك مجانًا</h2>
                <p className="mt-5 max-w-3xl text-lg leading-9 text-gray-600">لا تفرض بيت الريف رسومًا على العميل مقابل البحث أو إرسال طلب عرض سعر أو طلب مساعدة. أسعار التنفيذ أو التوريد تُحدد من مزودي الخدمات والموردين بحسب نطاق العمل والمواصفات.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {customerBenefits.map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#E8DFC9] bg-[#FDFBF7] p-4"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#102F18]" /><span className="font-semibold leading-7 text-gray-700">{item}</span></div>)}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#102F18] px-7 py-4 font-black text-white shadow-lg">ابدأ طلبك مجانًا <ArrowLeft className="h-5 w-5" /></Link>
                  <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9E8] px-7 py-4 font-black text-[#102F18]">كيف تعمل المنصة؟</Link>
                </div>
              </div>
              <div className="relative rounded-[2.35rem] border border-white/80 bg-gradient-to-b from-[#123B20] to-[#0B2815] p-7 text-white shadow-[0_28px_65px_rgba(15,63,26,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] md:p-9">
                <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-[#D4AF37]/20 blur-2xl" />
                <ShieldCheck className="relative h-12 w-12 text-[#F6D96F]" />
                <h3 className="relative mt-5 text-2xl font-black">ما الذي يبقى مدفوعًا؟</h3>
                <p className="relative mt-4 leading-8 text-white/82">قيمة تنفيذ المشروع أو شراء المنتج أو التوريد أو أي خدمة احترافية يحددها مزود الخدمة أو المورد في عرضه، وليست رسوم استخدام للمنصة.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="provider-plans" className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="لمزودي الخدمات" title="اختر مستوى الحضور المناسب لنشاطك" description="خطط مرنة للحرفيين والورش والشركات والموردين والمصانع، مع اختلاف واضح في المحتوى والتقارير ومستوى الجاهزية للبحث." />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <article key={plan.id} className={`group relative flex min-h-[650px] flex-col overflow-hidden rounded-[2.4rem] border p-6 transition duration-300 hover:-translate-y-2 ${plan.featured ? 'border-[#D4AF37] bg-gradient-to-b from-[#173F24] to-[#0B2815] text-white shadow-[0_34px_85px_rgba(15,63,26,0.28),0_0_35px_rgba(212,175,55,0.16),inset_0_1px_0_rgba(255,255,255,0.15)]' : 'border-white/90 bg-gradient-to-b from-white to-[#F5F0E7] text-gray-900 shadow-[0_24px_60px_rgba(15,63,26,0.13),inset_0_1px_0_rgba(255,255,255,1)]'}`}>
                    <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/85 to-transparent" />
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-black ${plan.featured ? 'bg-[#D4AF37] text-[#102F18]' : 'bg-[#FFF1C8] text-[#8B6A10]'}`}>{plan.badge}</span>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-[1.15rem] border shadow-lg ${plan.featured ? 'border-white/15 bg-white/10 text-[#F6D96F]' : 'border-[#E7D8AA] bg-[#FFF9E8] text-[#A27E18]'}`}><Icon className="h-6 w-6" /></div>
                    </div>
                    <h3 className={`mt-6 text-2xl font-black ${plan.featured ? 'text-white' : 'text-[#102F18]'}`}>{plan.name}</h3>
                    <p className={`mt-3 min-h-[88px] text-sm leading-7 ${plan.featured ? 'text-white/76' : 'text-gray-600'}`}>{plan.audience}</p>
                    <div className={`mt-6 rounded-[1.6rem] border p-5 ${plan.featured ? 'border-white/12 bg-white/8' : 'border-[#E8DFC9] bg-white/75'}`}>
                      <p className={`text-xs font-bold ${plan.featured ? 'text-white/65' : 'text-gray-500'}`}>شهريًا</p>
                      <p className={`mt-1 text-3xl font-black ${plan.featured ? 'text-[#F6D96F]' : 'text-[#102F18]'}`}>{plan.monthly}</p>
                      <div className={`my-4 h-px ${plan.featured ? 'bg-white/12' : 'bg-[#E8DFC9]'}`} />
                      <p className={`text-xs font-bold ${plan.featured ? 'text-white/65' : 'text-gray-500'}`}>سنويًا</p>
                      <p className={`mt-1 text-2xl font-black ${plan.featured ? 'text-white' : 'text-[#102F18]'}`}>{plan.annual}</p>
                      {plan.saving ? <p className={`mt-2 text-xs font-black ${plan.featured ? 'text-[#F6D96F]' : 'text-[#A27E18]'}`}>{plan.saving}</p> : null}
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className={`mt-1 h-4 w-4 shrink-0 ${plan.featured ? 'text-[#F6D96F]' : 'text-[#102F18]'}`} /><span className={`text-sm leading-7 ${plan.featured ? 'text-white/82' : 'text-gray-700'}`}>{feature}</span></li>)}
                    </ul>
                    <Link href={plan.href} className={`mt-auto inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-black transition ${plan.featured ? 'bg-[#D4AF37] text-[#102F18] hover:bg-[#E7CB62]' : 'bg-[#102F18] text-white hover:bg-[#174A27]'}`}>{plan.cta} <ArrowLeft className="h-4 w-4" /></Link>
                  </article>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-4xl text-center text-sm font-semibold leading-7 text-gray-600">حدود الخدمات والمنتجات والمشاريع والمحتوى والتحديثات ومستوى التقارير وSEO والجاهزية للبحث بالذكاء الاصطناعي تُعرض بالتفصيل عند التفعيل، وتُدار من بيانات الباقة المعتمدة في المنصة.</p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="اختيارية بالكامل" title="خدمات تجهيز الهوية والمحتوى" description="يمكنك الاشتراك باستخدام بياناتك الحالية، أو طلب مساعدة بيت الريف في تجهيز نشاطك رقميًا دون أن تكون هذه الخدمات شرطًا للاشتراك." />
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {optionalServices.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-[2rem] border border-[#E8DFC9] bg-[#FDFBF7] p-6 shadow-[0_16px_38px_rgba(15,63,26,0.08)] transition hover:-translate-y-1"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF2CB] text-[#A27E18]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-black text-[#102F18]">{item.title}</h3><p className="mt-3 leading-8 text-gray-600">{item.desc}</p></article>; })}
            </div>
            <div className="mt-9 rounded-[2rem] border border-[#D4AF37]/45 bg-[#FFF9E8] p-6 text-center shadow-sm"><p className="font-black text-[#102F18]">هذه الخدمات اختيارية ولا تؤثر على إمكانية الاشتراك في أي باقة.</p></div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="مقارنة سريعة" title="ما الفرق بين الخطط؟" description="مقارنة مختصرة تساعد مزود الخدمة على اختيار مستوى الحضور الأقرب لاحتياجه الحالي." />
            <div className="mt-10 overflow-x-auto rounded-[2rem] border border-[#E1D4B8] bg-white shadow-xl">
              <table className="w-full min-w-[900px] text-right">
                <thead className="bg-[#102F18] text-white"><tr><th className="p-5 font-black">الميزة</th><th className="p-5 font-black">القائمة الداخلية</th><th className="p-5 font-black">الحضور الرقمي</th><th className="p-5 font-black">الحضور الاحترافي</th><th className="p-5 font-black">المؤسسات</th></tr></thead>
                <tbody>{comparisonRows.map((row, index) => <tr key={row[0]} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FCFAF6]'}>{row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className={`border-t border-[#EEE6D8] p-5 text-sm leading-7 ${cellIndex === 0 ? 'font-black text-[#102F18]' : 'font-semibold text-gray-600'}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="الأسئلة الشائعة" title="أسئلة حول الخطط والأسعار" description="إجابات مباشرة توضح المجاني، والاشتراكات، وخدمات التجهيز الاختيارية، وآلية الظهور داخل المنصة." />
            <div className="mt-10 space-y-4">{faqItems.map(([question, answer]) => <details key={question} className="group rounded-[1.75rem] border border-[#E8DFC9] bg-[#FCFAF6] p-6 shadow-sm open:border-[#D4AF37] open:bg-white"><summary className="cursor-pointer list-none text-lg font-black text-[#102F18]">{question}</summary><p className="mt-4 leading-8 text-gray-600">{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-gradient-to-l from-[#102F18] to-[#1A4E29] p-8 text-center text-white shadow-2xl md:p-12">
            <Globe2 className="mx-auto h-11 w-11 text-[#F6D96F]" />
            <h2 className="mt-5 text-3xl font-black md:text-5xl">ابدأ من المسار المناسب لك</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/84">العميل يبدأ مجانًا. ومزود الخدمة يختار مستوى الحضور المناسب، مع إمكانية طلب خدمات تجهيز الهوية والمحتوى فقط عندما يحتاج إليها.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/request-quote" className="rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#102F18]">ابدأ كعميل</Link>
              <Link href="/providers/register" className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-black text-white">انضم كمزود خدمة</Link>
              <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-black text-white"><MessageCircle className="h-5 w-5 text-[#F6D96F]" />تحدث مع الفريق</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

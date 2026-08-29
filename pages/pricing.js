import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, BadgeCheck, Gift, Globe2, ShieldCheck, Sparkles, Store, WalletCards } from 'lucide-react';

const plans = [
  {
    name: 'الخطة المجانية',
    badge: 'مجانية',
    monthly: '0 AED',
    annual: 'بدون تاريخ تجديد',
    features: [
      'حساب شخصي داخل تطبيق بيت الريف',
      'فتح قسم الملف الشخصي والخطة المجانية',
      'التصفح واستخدام الأدوات المتاحة وفق النظام',
      'لا تشمل حصة نشر ضمن الخطة',
    ],
  },
  {
    name: 'الحضور الرقمي',
    badge: '4 بطاقات',
    monthly: '300 AED',
    annual: '2,700 AED',
    saving: 'خصم سنوي 25% — وفر 900 درهم سنويًا',
    features: [
      '4 منتجات + 4 خدمات + 4 عروض + 4 مستندات',
      'ربط Google Drive وGoogle Sheets',
      'مساعد أعمال وياك',
      'النشر داخل تطبيق بيت الريف وفق صلاحيات الخطة',
    ],
  },
  {
    name: 'الحضور الاحترافي',
    badge: '10 بطاقات',
    monthly: '500 AED',
    annual: '4,500 AED',
    saving: 'خصم سنوي 25% — وفر 1,500 درهم سنويًا',
    featured: true,
    features: [
      '10 منتجات + 10 خدمات + 10 عروض + 10 مستندات',
      'مساحة Google Cloud منفصلة وفق الخطة',
      'Google Workspace ودومين ضمن مزايا الاشتراك السنوي المؤهل',
      'مساعد أعمال وياك بصلاحيات الخطة',
    ],
  },
];

const publishingPackages = [
  {
    name: 'باقة النشر العام – 4 بطاقات',
    icon: Globe2,
    features: [
      'نشر 4 بطاقات مؤهلة في سوق بيت الريف',
      'نشر 4 منتجات شهريًا في Google Shopping',
      'ملف شخصي مختصر في السوق',
      'صفحة هبوط كاملة في منصة بيت الريف',
    ],
    note: 'السنة الأولى: خصم 50%',
    annualBenefit: 'تُفتح مجانًا مع الاشتراك السنوي المناسب',
  },
  {
    name: 'باقة النشر العام للأعمال – 10 بطاقات',
    icon: Store,
    features: [
      'نشر 10 بطاقات مؤهلة في سوق بيت الريف',
      'نشر حتى 10 منتجات شهريًا في Google Shopping',
      'ملف شخصي مختصر في السوق',
      'صفحة هبوط كاملة في منصة بيت الريف',
    ],
    note: 'السنة الأولى: خصم 50%',
    annualBenefit: 'تُفتح مجانًا مع الاشتراك السنوي المناسب',
  },
];

export default function PricingPage() {
  return <>
    <Head>
      <title>الأسعار والخطط | بيت الريف</title>
      <meta name="description" content="أسعار وخطط بيت الريف: خطة مجانية، الحضور الرقمي 300 درهم شهريًا أو 2,700 سنويًا، والحضور الاحترافي 500 درهم شهريًا أو 4,500 سنويًا، مع باقات النشر العام." />
      <link rel="canonical" href="https://bietalreef.ae/pricing" />
    </Head>

    <div dir="rtl" className="min-h-screen bg-[#FFFCF7] text-gray-900">
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-[#123F1D] to-[#062D17] py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]"><Sparkles className="h-4 w-4" /> الأسعار والخطط</span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">خطط واضحة حسب حجم استخدام شركتك</h1>
            <p className="mx-auto mt-6 max-w-4xl text-lg leading-9 text-white/85">ابدأ بالخطة المجانية، أو اختر الحضور الرقمي بـ 300 درهم شهريًا، أو الحضور الاحترافي بـ 500 درهم شهريًا. الدفع السنوي يمنح خصم 25% ومزايا إضافية حسب الخطة.</p>
            <a href="#plans" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">استعرض الخطط <ArrowLeft className="h-5 w-5" /></a>
          </div>
        </section>

        <section id="plans" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="mb-10">
            <p className="font-black text-[#B8922B]">الاشتراك داخل تطبيق بيت الريف</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">اختر الخطة المناسبة</h2>
            <p className="mt-3 max-w-4xl leading-8 text-gray-600">الاشتراك داخل التطبيق مستقل عن باقات النشر العام. الخطة هي التي تحدد الحصص والصلاحيات والأدوات المتاحة للحساب.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`relative rounded-[2rem] border bg-white p-7 shadow-sm ${plan.featured ? 'border-2 border-[#D4AF37] shadow-lg' : 'border-[#E6DCC8]'}`}>
                {plan.featured && <span className="absolute -top-3 left-6 rounded-full bg-[#D4AF37] px-4 py-1 text-sm font-black text-[#0F3F1A]">الأكثر شمولًا</span>}
                <div className="flex items-center justify-between gap-3"><WalletCards className="h-9 w-9 text-[#0F3F1A]" /><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">{plan.badge}</span></div>
                <h3 className="mt-6 text-2xl font-black">{plan.name}</h3>
                <div className="mt-5 text-4xl font-black text-[#0F3F1A]">{plan.monthly}</div>
                <p className="mt-1 text-sm font-bold text-gray-500">{plan.monthly !== '0 AED' ? 'شهريًا' : ''}</p>
                <div className="mt-4 rounded-2xl bg-[#FFF8E5] p-4"><strong className="text-lg text-[#0F3F1A]">{plan.annual}</strong>{plan.saving && <p className="mt-1 text-sm font-bold text-[#A95B19]">{plan.saving}</p>}</div>
                <div className="mt-6 space-y-3">{plan.features.map((feature) => <div key={feature} className="flex items-start gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600" /><span className="leading-7 text-gray-700">{feature}</span></div>)}</div>
                <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-4 font-black text-white">اختيار الخطة <ArrowLeft className="h-5 w-5" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10">
              <p className="font-black text-[#B8922B]">باقات النشر العام</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">انشر خارج التطبيق</h2>
              <p className="mt-3 max-w-4xl leading-8 text-gray-600">باقات النشر العام منفصلة عن اشتراك التطبيق، ويمكن أن تُفتح مجانًا مع الاشتراك السنوي المناسب وفق الخطة.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {publishingPackages.map((pkg) => {
                const Icon = pkg.icon;
                return <article key={pkg.name} className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-8">
                  <Icon className="h-9 w-9 text-[#0F3F1A]" />
                  <h3 className="mt-5 text-2xl font-black">{pkg.name}</h3>
                  <div className="mt-5 space-y-3">{pkg.features.map((feature) => <p key={feature} className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />{feature}</p>)}</div>
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-4 font-black text-emerald-700">{pkg.note}</div>
                  <div className="mt-3 rounded-2xl bg-[#FFF1C2] p-4 font-bold text-[#7B5A00]">{pkg.annualBenefit}</div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] bg-[#0F3F1A] p-8 text-white"><ShieldCheck className="h-9 w-9 text-[#F3D46B]" /><h2 className="mt-5 text-2xl font-black">الحصص والصلاحيات حسب الخطة</h2><p className="mt-4 leading-8 text-white/80">عدد المنتجات والخدمات والعروض والمستندات والأدوات المتاحة للحساب تحدده الخطة المفعلة وحالة الحساب.</p></article>
            <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8"><Gift className="h-9 w-9 text-[#0F3F1A]" /><h2 className="mt-5 text-2xl font-black">ميزة الاشتراك السنوي</h2><p className="mt-4 leading-8 text-gray-700">إضافة إلى خصم 25%، قد تشمل الخطة السنوية المؤهلة مزايا Google للأعمال والدومين وباقة النشر العام المناسبة وفق شروط الاشتراك.</p></article>
          </div>
        </section>

        <section className="bg-[#0F3F1A] py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black md:text-4xl">اختر خطتك وفعّل حساب شركتك</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">راجع الحصة والمزايا والدفع الشهري أو السنوي، ثم اختر ما يناسب استخدامك الفعلي.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">تواصل مع خدمة العملاء <ArrowLeft className="h-5 w-5" /></Link></div>
        </section>
      </main>
      <Footer />
    </div>
  </>;
}

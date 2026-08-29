import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, Gift, Globe2, ShieldCheck, Sparkles, WalletCards } from 'lucide-react';

const plans = [
  { name:'الخطة المجانية', badge:'مجانية', monthly:'0', annual:null, note:'بدون تاريخ تجديد', features:['حساب شخصي موثق داخل تطبيق بيت الريف','فتح قسم الملف الشخصي والخطة المجانية','التصفح واستخدام الأدوات المتاحة وفق النظام','لا تشمل حصة نشر ضمن الخطة'] },
  { name:'الحضور الرقمي', badge:'4 بطاقات', monthly:'300', annual:'2,700', save:'وفر 25% سنويًا', features:['4 منتجات + 4 خدمات + 4 عروض + 4 مستندات','ربط Google Drive وGoogle Sheets','مساعد أعمال وياك','النشر داخل تطبيق بيت الريف وفق صلاحيات الخطة'] },
  { name:'الحضور الاحترافي', badge:'10 بطاقات', monthly:'500', annual:'4,500', save:'وفر 25% سنويًا', featured:true, features:['10 منتجات + 10 خدمات + 10 عروض + 10 مستندات','مساحة Google Cloud معزولة وفق الخطة','Google Workspace ضمن مزايا الاشتراك السنوي','مساعد أعمال وياك بصلاحيات الخطة'] },
];

const faqs = [
  ['هل توجد خطة مجانية؟','نعم. الخطة المجانية قيمتها 0 درهم، وتخضع المزايا المتاحة فيها لحالة الحساب وصلاحيات النظام.'],
  ['ما سعر خطة الحضور الرقمي؟','300 درهم شهريًا أو 2,700 درهم سنويًا.'],
  ['ما سعر خطة الحضور الاحترافي؟','500 درهم شهريًا أو 4,500 درهم سنويًا.'],
  ['هل باقات النشر العام منفصلة عن اشتراك التطبيق؟','نعم. باقات النشر العام منفصلة عن اشتراك التطبيق، ويمكن أن تُمنح الباقة المناسبة مجانًا مع الاشتراك السنوي بحسب الخطة.'],
];

export default function BusinessPlans(){
  return <>
    <Head>
      <title>خطط الأعمال والاشتراكات | بيت الريف</title>
      <meta name="description" content="خطط بيت الريف للأعمال: مجانية، الحضور الرقمي 300 درهم شهريًا، والحضور الاحترافي 500 درهم شهريًا، مع خيارات ومزايا الاشتراك السنوي."/>
      <link rel="canonical" href="https://bietalreef.ae/business-plans"/>
    </Head>
    <div dir="rtl" className="min-h-screen bg-[#FFFCF7] text-gray-900"><Navbar/><main>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#123F1D] to-[#062D17] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]"><Sparkles className="h-4 w-4"/> الخطط والاشتراكات</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">خطط الأعمال والاشتراكات</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-white/85">اختر الخطة بحسب طريقة استخدام شركتك لبيت الريف، وعدد الأدوات والعناصر والحصص والصلاحيات التي تحتاجها، مع توضيح المزايا قبل التفعيل.</p>
          <a href="#plans" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">قارن الخطط <ArrowLeft className="h-5 w-5"/></a>
        </div>
      </section>

      <section id="plans" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-10"><p className="font-black text-[#B8922B]">الاشتراك داخل تطبيق بيت الريف</p><h2 className="mt-2 text-3xl font-black md:text-4xl">اختر مستوى حضور شركتك</h2><p className="mt-3 text-gray-600">الاشتراك داخل التطبيق مستقل عن باقات النشر العام، والأسعار أدناه هي أسعار الخطط المعتمدة.</p></div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map(plan => <article key={plan.name} className={`relative rounded-[2rem] border bg-white p-7 shadow-sm ${plan.featured?'border-2 border-[#D4AF37] shadow-lg':'border-[#E6DCC8]'}`}>
            {plan.featured && <span className="absolute -top-3 left-6 rounded-full bg-[#D4AF37] px-4 py-1 text-sm font-black text-[#0F3F1A]">الأكثر مرونة</span>}
            <div className="flex items-center justify-between gap-3"><WalletCards className="h-9 w-9 text-[#0F3F1A]"/><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">{plan.badge}</span></div>
            <h3 className="mt-6 text-2xl font-black">{plan.name}</h3>
            <div className="mt-5"><span className="text-5xl font-black text-[#0F3F1A]">{plan.monthly}</span><span className="mr-2 font-bold text-gray-500">AED {plan.monthly!=='0'?'شهريًا':''}</span></div>
            {plan.annual && <div className="mt-3 rounded-2xl bg-[#FFF8E5] p-4"><strong className="text-xl text-[#0F3F1A]">{plan.annual} AED سنويًا</strong><p className="mt-1 text-sm font-bold text-[#A95B19]">{plan.save}</p></div>}
            {plan.note && <p className="mt-3 text-sm font-bold text-blue-700">{plan.note}</p>}
            <div className="mt-6 space-y-3">{plan.features.map(x=><div key={x} className="flex items-start gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/><span className="leading-7 text-gray-700">{x}</span></div>)}</div>
            <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-4 font-black text-white">اختر الخطة <ArrowLeft className="h-5 w-5"/></Link>
          </article>)}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4">
        <div className="mb-10"><p className="font-black text-[#B8922B]">باقات النشر العام</p><h2 className="mt-2 text-3xl font-black md:text-4xl">انشر خارج التطبيق ووصل إلى جمهور أوسع</h2><p className="mt-3 max-w-3xl leading-8 text-gray-600">باقات النشر العام منفصلة عن اشتراك التطبيق، ويمنح الاشتراك السنوي الباقة المناسبة مجانًا بحسب الخطة.</p></div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-8"><Globe2 className="h-9 w-9 text-[#0F3F1A]"/><h3 className="mt-5 text-2xl font-black">باقة النشر العام – 4 بطاقات</h3><div className="mt-5 space-y-3">{['نشر 4 بطاقات مؤهلة في سوق بيت الريف','نشر 4 منتجات شهريًا في Google Shopping','ملف شخصي مختصر في السوق','صفحة هبوط كاملة في منصة بيت الريف'].map(x=><p key={x} className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/>{x}</p>)}</div><div className="mt-6 rounded-2xl bg-emerald-50 p-4 font-black text-emerald-700">السنة الأولى: خصم 50%</div></article>
          <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-8"><Gift className="h-9 w-9 text-[#0F3F1A]"/><h3 className="mt-5 text-2xl font-black">باقة النشر العام للأعمال – 10 بطاقات</h3><div className="mt-5 space-y-3">{['نشر 10 بطاقات مؤهلة في سوق بيت الريف','نشر حتى 10 منتجات شهريًا في Google Shopping','ملف شخصي مختصر في السوق','صفحة هبوط كاملة في منصة بيت الريف'].map(x=><p key={x} className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/>{x}</p>)}</div><div className="mt-6 rounded-2xl bg-emerald-50 p-4 font-black text-emerald-700">السنة الأولى: خصم 50%</div></article>
        </div>
      </div></section>

      <section className="mx-auto max-w-6xl px-4 py-16"><div className="rounded-[2rem] bg-[#0F3F1A] p-8 text-white md:p-10"><ShieldCheck className="h-9 w-9 text-[#F3D46B]"/><h2 className="mt-5 text-3xl font-black">الخطة هي التي تحدد الحصص والصلاحيات</h2><p className="mt-4 max-w-4xl leading-9 text-white/80">عدد العناصر والأدوات ومسارات النشر المتاحة للحساب تُحدد بحسب الخطة المفعلة وحالة الحساب. راجع تفاصيل خطتك قبل التفعيل أو التجديد.</p></div></section>

      <FAQ items={faqs} title="الأسئلة الشائعة حول خطط الأعمال والاشتراكات"/>
      <section className="bg-[#0F3F1A] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><BriefcaseBusiness className="mx-auto h-10 w-10 text-[#F3D46B]"/><h2 className="mt-5 text-3xl font-black md:text-4xl">اختر الخطة المناسبة لشركتك</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">قارن الحصص والمزايا والاشتراك الشهري أو السنوي، ثم فعّل ما يناسب استخدامك الفعلي.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">تواصل مع خدمة العملاء <ArrowLeft className="h-5 w-5"/></Link></div></section>
    </main><Footer/></div>
  </>;
}

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, Mail, FolderKanban, Video, CalendarDays, Users, ShieldCheck, CheckCircle2, Database, Settings2, Building2 } from 'lucide-react';

const faqs=[
  ['لماذا أحتاج Google Workspace بدلاً من حساب Gmail المجاني؟','الحساب الشخصي مخصص للاستخدام الفردي، بينما يوفر Google Workspace بريدًا مهنيًا باسم شركتك، وملكية مؤسسية للبيانات، وتحكمًا مركزيًا بحسابات الموظفين وأدوات إدارة وأمان موجهة للأعمال.'],
  ['هل تتكفل بيت الريف بربط الدومين وإنشاء البريد؟','يمكن أن يتضمن نطاق خدمتنا الإعداد الفني الكامل من ربط سجلات الدومين وإنشاء حسابات البريد الإلكتروني إلى ضبط الأدوات الأساسية وفق الاتفاق.'],
  ['هل يمكن نقل البريد الإلكتروني والملفات القديمة؟','نعم، يمكن تقييم بيئة العمل الحالية ودعم نقل الرسائل والملفات القديمة إلى Google Workspace ضمن خطة انتقال منظمة تهدف إلى تقليل توقف العمل والمخاطر.'],
  ['هل المزايا والباقات السنوية مقدمة من Google مباشرة؟','أي مزايا إضافية أو عروض مضمنة تكون ضمن باقات بيت الريف التجارية المؤهلة وشروطها الخاصة، وليست عرضًا مجانيًا عامًا من Google.']
];

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:faqs.map(([q,a])=>({
    '@type':'Question',
    name:q,
    acceptedAnswer:{'@type':'Answer',text:a}
  }))
};

const comparison=[
  ['ربط النطاق (Domain DNS)','ضبط MX وSPF وDKIM يدويًا وقد يسبب أخطاء في التسليم عند الإعداد غير الصحيح','ربط فني شامل لسجلات البريد والأمان بحسب نطاق الخدمة لتقليل أخطاء التسليم وتحسين موثوقية البريد'],
  ['هيكلة الحسابات','إنشاء فردي للحسابات بدون تنظيم واضح','تصميم هيكل مستخدمين وصلاحيات بحسب الأقسام والمسميات الوظيفية واحتياج الشركة'],
  ['نقل البيانات (Migration)','تنفيذ يدوي قد يعرض الرسائل أو الملفات لمخاطر أثناء الانتقال','تقييم بيئة العمل ودعم نقل البريد والملفات وفق خطة انتقال متفق عليها'],
  ['القيمة المضافة في الإمارات','اشتراك تقني معزول عن حضور الشركة الرقمي','إمكانية ربط خدمة Workspace بمسار أعمال بيت الريف والانضمام إلى دليل مزودي بيت الريف عند استيفاء متطلبات الحساب والنشر']
];

const tools=[
  [Mail,'Gmail للأعمال (Professional Email)','بريد رسمي مرتبط بدومين الشركة مثل info@yourcompany.ae لتعزيز الهوية المؤسسية وتنظيم التواصل مع العملاء.'],
  [FolderKanban,'Google Drive','تنظيم ومشاركة ملفات الشركة في بيئة سحابية مع التحكم في صلاحيات العرض والتعديل بحسب المستخدمين.'],
  [Video,'Google Meet','اجتماعات فيديو وتعاون مباشر بين فرق العمل والعملاء ضمن بيئة Google Workspace.'],
  [CalendarDays,'Google Calendar','تقويم مشترك لتنظيم المواعيد والاجتماعات والمهام وتقليل تعارض جداول فرق العمل.'],
  [Users,'لوحة التحكم والإدارة المركزية','إضافة المستخدمين وتعديل الحسابات والصلاحيات وإدارة إعدادات المؤسسة من لوحة مركزية.'],
  [ShieldCheck,'إعداد وأمان منظم','تهيئة الحسابات وسجلات النطاق والأدوات الأساسية بما يتوافق مع نطاق العمل المتفق عليه.']
];

export default function Workspace(){return <>
  <Head>
    <title>Google Workspace الإمارات | بريد إلكتروني رسمي وبنية عمل سحابية | بيت الريف</title>
    <meta name="description" content="انقل أعمالك إلى بيئة احترافية مع Google Workspace في الإمارات عبر بيت الريف. احصل على بريد رسمي برابط دومين شركتك، ربط فني كامل للدومين، وإدارة مستخدمين منظمة."/>
    <meta name="keywords" content="Google Workspace الإمارات، بريد إلكتروني برابط دومين الشركة، Gmail للأعمال، ربط الدومين بالبريد، بيت الريف Google Workspace، بيئة عمل سحابية للشركات"/>
    <meta name="robots" content="index, follow, max-image-preview:large"/>
    <link rel="canonical" href="https://bietalreef.ae/google-workspace-biet-alreef"/>
    <meta property="og:title" content="Google Workspace الإمارات | بيت الريف"/>
    <meta property="og:description" content="بريد رسمي باسم دومين شركتك وإعداد فني منظم لـ Google Workspace في الإمارات عبر بيت الريف."/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://bietalreef.ae/google-workspace-biet-alreef"/>
    <meta property="og:image" content="https://bietalreef.ae/images/google-workspace-business-tools.svg"/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  </Head>
  <div dir="rtl" className="min-h-screen bg-[#FBFAFF]"><Navbar/><main>

    <section className="bg-gradient-to-b from-violet-50 to-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">Google Workspace | بيت الريف</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-[#34245E] md:text-6xl">انقل شركتك إلى بيئة أعمال احترافية مع Google Workspace من بيت الريف</h1>
          <p className="mt-6 text-lg leading-9 text-gray-600">تخلَّ عن إدارة عملك عبر الحسابات الشخصية المتفرقة. نُمكّن شركتك في دولة الإمارات من الحصول على بريد إلكتروني رسمي مرتبط بنطاقك مثل <span dir="ltr" className="font-bold text-[#34245E]">info@yourcompany.ae</span>، مع إعداد فني متكامل يربط أدوات التواصل والتخزين وإدارة الصلاحيات في منصة واحدة منظمة.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B3E96] px-8 py-4 font-black text-white">احصل على بريد أعمالك الآن <ArrowLeft className="h-5 w-5"/></Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-violet-300 bg-white px-8 py-4 font-black text-[#5B3E96]">تحدث مع مستشار التأسيس</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white p-4 shadow-xl">
          <img src="/images/google-workspace-business-tools.svg" alt="Google Workspace مع بيت الريف في الإمارات" className="h-auto w-full rounded-[1.5rem]"/>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-10 max-w-4xl">
        <p className="font-black text-[#6D4BAA]">إعداد مؤسسي وليس مجرد شراء تراخيص</p>
        <h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">لماذا تختار بيت الريف لإعداد Google Workspace لشركتك؟</h2>
        <p className="mt-4 leading-8 text-gray-600">إعداد بيئة العمل السحابية لا يقتصر على إنشاء البريد؛ بل يشمل ربط النطاق، تنظيم المستخدمين، إدارة الصلاحيات وخطة الانتقال عندما تكون هناك حسابات أو ملفات قائمة.</p>
      </div>
      <div className="overflow-x-auto rounded-[2rem] border border-violet-100 bg-white shadow-sm">
        <table className="min-w-[880px] w-full text-right">
          <thead className="bg-[#34245E] text-white"><tr><th className="p-5 text-lg">وجه المقارنة</th><th className="p-5 text-lg">الإعداد الذاتي / المزودون التقليديون</th><th className="p-5 text-lg">خدمة Google Workspace من بيت الريف</th></tr></thead>
          <tbody>{comparison.map(([a,b,c],i)=><tr key={a} className={i%2?'bg-violet-50/50':'bg-white'}><td className="p-5 align-top font-black text-[#34245E]">{a}</td><td className="p-5 align-top leading-8 text-gray-600">{b}</td><td className="p-5 align-top leading-8 text-gray-700">{c}{a==='القيمة المضافة في الإمارات'?<><br/><Link href="/join-provider" className="mt-2 inline-flex font-black text-[#5B3E96] underline">دليل مزودي بيت الريف</Link></>:null}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10"><p className="font-black text-[#6D4BAA]">حزمة أدوات Google للأعمال</p><h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">أدوات متكاملة للتواصل والملفات والاجتماعات والإدارة</h2></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tools.map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-violet-100 bg-[#FCFAFF] p-7 shadow-sm"><I className="h-9 w-9 text-[#5B3E96]"/><h3 className="mt-4 text-xl font-black text-[#34245E]">{t}</h3><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
        <div>
          <p className="font-black text-[#6D4BAA]">منهجية التنفيذ</p>
          <h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">خطوات تجهيز بيئة Workspace لشركتك</h2>
          <div className="mt-8 space-y-4">{[
            ['01','فحص ومراجعة الدومين','مراجعة ملكية النطاق الحالي أو المساعدة في تجهيز دومين جديد ضمن نطاق الخدمة المتفق عليه.'],
            ['02','تحديد المستخدمين والاحتياج','دراسة عدد الحسابات والأقسام ومستويات الصلاحيات المناسبة لهيكل الشركة.'],
            ['03','التجهيز والربط الفني','ضبط سجلات البريد والأمان وتفعيل أدوات Google Workspace ودعم نقل البيانات القديمة عند الحاجة.'],
            ['04','تسليم النظام والانطلاق','تسليم بيئة العمل ولوحة الإدارة وتوجيه الفريق للبدء في استخدام الحسابات والأدوات بشكل منظم.']
          ].map(([n,t,d])=><article key={n} className="flex gap-4 rounded-3xl border border-violet-100 bg-white p-6"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 font-black text-violet-800">{n}</div><div><h3 className="text-xl font-black text-[#34245E]">{t}</h3><p className="mt-2 leading-8 text-gray-600">{d}</p></div></article>)}</div>
        </div>
        <aside className="rounded-[2rem] bg-[#34245E] p-8 text-white shadow-xl md:p-10">
          <Building2 className="h-10 w-10 text-[#F3D46B]"/>
          <h2 className="mt-5 text-3xl font-black">بريد باسم نطاق شركتك</h2>
          <p className="mt-4 leading-8 text-white/80">مثل <span dir="ltr" className="font-bold text-white">info@company.ae</span> بدل إدارة العمل من حسابات شخصية متفرقة، مع إدارة مركزية للمستخدمين بحسب الخطة.</p>
          <div className="mt-7 space-y-3">{['هوية بريد احترافية باسم الشركة','إدارة مستخدمين مركزية','ملفات واجتماعات وتقويم في بيئة واحدة','إعداد فني منظم للدومين والحسابات'].map(x=><div key={x} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="h-5 w-5 text-[#F3D46B]"/><span className="font-bold">{x}</span></div>)}</div>
        </aside>
      </div>
    </section>

    <section className="bg-[#F7F4FC] py-16"><div className="mx-auto max-w-6xl px-4"><div className="grid gap-6 md:grid-cols-3">{[[Database,'نقل منظم للبيانات','تقييم البريد والملفات الحالية قبل الانتقال ووضع مسار مناسب للتنفيذ.'],[Settings2,'إدارة وصلاحيات','تنظيم الحسابات والمستخدمين والصلاحيات بحسب هيكل الشركة.'],[ShieldCheck,'جاهزية للأعمال','ربط الدومين والأدوات الأساسية في بيئة واحدة تخدم التشغيل اليومي.']].map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-violet-100 bg-white p-7"><I className="h-8 w-8 text-[#5B3E96]"/><h3 className="mt-4 text-xl font-black text-[#34245E]">{t}</h3><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-6xl px-4 py-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8"><h2 className="text-2xl font-black">مزايا الاشتراك السنوي المؤهل</h2><p className="mt-4 leading-8 text-gray-700">قد تتضمن بعض الباقات السنوية المؤهلة مزايا Google للأعمال ودومين الشركة وفق شروط الباقة. هذه مزايا تقدمها بيت الريف ضمن عرضها التجاري وليست عرضًا مجانيًا عامًا من Google.</p></div></section>

    <FAQ items={faqs} title="الأسئلة الشائعة حول Google Workspace"/>

    <section className="bg-[#34245E] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><Mail className="mx-auto h-10 w-10 text-[#F3D46B]"/><h2 className="mt-5 text-3xl font-black md:text-4xl">ابدأ ببريد أعمالك وإدارة شركتك بشكل منظم</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">جهّز نطاق شركتك، حسابات المستخدمين وأدوات Google Workspace ضمن مسار تأسيس واضح يناسب احتياج نشاطك.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#34245E]">احصل على بريد أعمالك الآن <ArrowLeft className="h-5 w-5"/></Link></div></section>
  </main><Footer/></div>
</>}

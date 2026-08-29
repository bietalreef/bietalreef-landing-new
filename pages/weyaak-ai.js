import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, Bot, FileText, PackageSearch, BriefcaseBusiness, ShieldCheck, Sparkles, Megaphone, ShoppingBag, MapPinned, Mail, Cloud, CheckCircle2 } from 'lucide-react';

const faqs=[
  ['ما هو وياك؟','وياك مساعد أعمال تشغيلي ذكي من بيت الريف يعمل داخل سياق حساب الشركة وبياناتها ومساراتها وصلاحياتها المتاحة.'],
  ['هل وياك شات بوت عام؟','لا. دوره الأساسي ليس تقديم إجابات عامة منفصلة، بل مساعدة الشركة داخل سياق العمل الفعلي وتجهيز المحتوى والبيانات والخطوات المرتبطة بالمسارات المفعلة.'],
  ['هل أحتاج معرفة تقنية لربط منتجاتي مع Google Shopping عبر وياك؟','لا يلزم أن تكون خبيرًا تقنيًا. يستطيع وياك المساعدة في تنظيم وصياغة بيانات المنتجات المسجلة في حسابك وتجهيزها وفق متطلبات النشر والربط المتاحة قبل المراجعة والمزامنة.'],
  ['كيف يتعامل وياك مع بيانات شركتي عند استخدام خدمات Google؟','يعمل وياك وفق سياق الحساب والصلاحيات ونطاقات الربط المفعلة داخل بيت الريف. ولا تُنفذ الإجراءات الحساسة أو النهائية إلا ضمن الصلاحيات والمسارات المعتمدة للحساب.'],
  ['هل بيت الريف مدرج في Google Cloud Partner Finder؟','نعم. لبيت الريف ملف عام ورسمي في Google Cloud Partner Finder يعرض الشركة ومجالات التركيز التقنية في دولة الإمارات، دون ادعاء Tier غير ظاهر في الملف الرسمي.'],
  ['هل يتخذ وياك القرار بدل صاحب الشركة؟','لا. يساعد في الفهم والتنظيم والتجهيز والأتمتة ضمن الصلاحيات، بينما تبقى القرارات النهائية والإجراءات الحساسة بيد المستخدم أو الجهة المخولة.']
];

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))
};

const googleServices=[
  {icon:Megaphone,title:'وياك + Google Ads',subtitle:'من سياق النشاط إلى فكرة حملة أوضح',items:['تحليل معلومات نشاطك وخدماتك لصياغة نصوص إعلانية أولية أكثر ارتباطًا بالسوق المستهدف.','استخراج المزايا التنافسية من المنتجات والخدمات وتحويلها إلى أفكار حملات قابلة للمراجعة قبل النشر.']},
  {icon:ShoppingBag,title:'وياك + Google Shopping',subtitle:'تجهيز بيانات المنتج للنشر التجاري',items:['تنظيم بيانات المنتجات والمواصفات والأسعار لتسهيل تجهيز الـFeed المتوافق مع مسار Google Merchant Center.','تحسين عناوين وأوصاف المنتجات لتكون أوضح لمحركات البحث والتسوق مع بقاء المراجعة قبل المزامنة.']},
  {icon:MapPinned,title:'وياك + Google Maps APIs',subtitle:'الموقع والتغطية والمسارات ضمن سياق العمل',items:['تنظيم بيانات المواقع ونطاقات الخدمة والتوصيل لتسهيل عرضها وربطها بالخرائط عند توفر المسار المناسب.','مساعدة فرق العمل في تجهيز بيانات الفروع والمسارات الميدانية والاحتياجات اللوجستية المرتبطة بالموقع.']},
  {icon:Mail,title:'وياك + Google Workspace',subtitle:'المراسلات والملفات والمواعيد في بيئة واحدة',items:['صياغة رسائل المتابعة والعروض والمراسلات المهنية باستخدام سياق الحساب والبريد الرسمي للشركة.','المساعدة في تنظيم وتلخيص الملفات المتاحة وجدولة المهام والمواعيد عبر مسارات Drive وCalendar عند تفعيل الربط.']},
  {icon:Cloud,title:'وياك + Google Cloud',subtitle:'ذكاء تشغيلي فوق بنية سحابية قابلة للتوسع',items:['الاستفادة من خدمات Google Cloud في المسارات التقنية التي يتم تفعيلها للحساب مثل التطبيقات والبيانات والذكاء الاصطناعي والتكاملات.','فصل التنفيذ حسب الصلاحيات ونطاق الخدمة مع إبقاء التحكم النهائي للحساب والجهة المخولة.']}
];

const comparison=[
  ['سياق البيانات','إجابات عامة بدون معرفة فعلية بمنتجاتك أو مناطق عملك','يعمل مع هوية الحساب والعناصر والمناطق والبيانات المتاحة بحسب الصلاحيات'],
  ['ربط الخدمات','كل منصة تحتاج إعدادًا منفصلًا ومسارًا يدويًا','يوحد العمل داخل سياق بيت الريف ويجهز البيانات للمسارات المفعلة مع Google'],
  ['التحكم والتنفيذ','قد تنفصل الأداة عن صلاحيات المؤسسة ومساراتها','التنفيذ مرتبط بحالة الحساب والخطة والصلاحيات والمراجعة قبل الإجراءات الحساسة'],
  ['الشفافية التقنية','ادعاءات عامة عن الشراكات أو الأمان','بيت الريف مدرج رسميًا في Google Cloud Partner Finder دون ادعاء Tier غير معلن']
];

export default function WeyaakAI(){return <><Head>
<title>وياك | الذكاء الاصطناعي المدمج للأعمال وخدمات Google | بيت الريف</title>
<meta name="description" content="محرك الذكاء الاصطناعي المدمج في بيئة عملك. وياك يربط نشاطك التجاري بأدوات Google Ads وGoogle Shopping والخرائط وWorkspace بأسلوب آمن ومباشر."/>
<meta name="keywords" content="وياك بيت الريف، الذكاء الاصطناعي للأعمال، Google Workspace الإمارات، Google Ads، Google Shopping، Google Cloud Partner Finder"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<link rel="canonical" href="https://bietalreef.ae/weyaak-ai"/>
<meta property="og:title" content="وياك | الذكاء الاصطناعي المدمج للأعمال وخدمات Google | بيت الريف"/>
<meta property="og:description" content="وياك يعمل داخل سياق شركتك ويربط تجهيز المحتوى والبيانات بمسارات Google للأعمال وفق الصلاحيات المتاحة."/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://bietalreef.ae/weyaak-ai"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
</Head><div dir="rtl" className="min-h-screen bg-[#F7FBF8]"><Navbar/><main>

<section className="relative overflow-hidden bg-[#062F22] py-20 text-white md:py-28"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,.2),transparent_32%)]"/><div className="relative mx-auto max-w-7xl px-4"><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-black text-emerald-200"><Sparkles className="h-5 w-5"/>وياك | الذكاء الاصطناعي التشغيلي من بيت الريف</span><h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">وياك: الذكاء الاصطناعي المدمج في سياق عملك ومع منظومة Google</h1><p className="mt-6 max-w-3xl text-lg leading-9 text-white/80">ليس مجرد شات بوت للردود العامة؛ وياك هو المساعد التشغيلي الذكي الذي يعمل داخل حساب شركتك في بيت الريف، ليربط تجهيز مستنداتك ورسائلك ومحفظة منتجاتك ومسارات عملك مع خدمات Google مثل التسوق والإعلانات والخرائط وWorkspace وGoogle Cloud وفق الصلاحيات والربط المتاح.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-8 py-4 font-black text-[#062F22]">جرب وياك داخل حسابك <ArrowLeft className="h-5 w-5"/></Link><a href="#google-services" className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-8 py-4 font-black">استكشف الربط مع Google</a></div></div><div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur"><Bot className="h-12 w-12 text-emerald-200"/><h2 className="mt-5 text-3xl font-black">من المعلومة إلى الإجراء داخل نفس بيئة العمل</h2><p className="mt-4 leading-8 text-white/75">يعتمد وياك على سياق الحساب والخطة والصلاحيات والعناصر المتاحة ليختصر الانتقال بين المحتوى والمتجر والمستندات ومسارات Google بدل العمل كأداة منفصلة عن شركتك.</p></div></div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{[[BriefcaseBusiness,'يفهم سياق النشاط','هوية الشركة والتخصصات والمناطق والبيانات المتاحة للحساب.'],[PackageSearch,'العناصر والمتجر','يساعد في تجهيز معلومات المنتجات والخدمات والعروض وفق المسار المتاح.'],[FileText,'المستندات والمحتوى','تنظيم وصياغة المعلومات والمحتوى والمستندات المرتبطة بالعمل.'],[ShieldCheck,'ضمن الصلاحيات','قدراته ترتبط بحالة الحساب والخطة والصلاحيات والبيانات والربط المتاح.']].map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm"><I className="h-8 w-8 text-[#087A57]"/><h2 className="mt-4 text-xl font-black">{t}</h2><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div></section>

<section id="google-services" className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4"><div className="mb-10 max-w-4xl"><p className="font-black text-emerald-700">منظومة Google داخل رحلة العمل</p><h2 className="mt-2 text-3xl font-black md:text-4xl">كيف يعمل وياك مع خدمات Google المختلفة؟</h2><p className="mt-4 leading-8 text-gray-600">اضغط على كل خدمة لعرض الطريقة العملية التي يمكن أن يساعد بها وياك داخل سياق حسابك، مع بقاء التنفيذ مرتبطًا بالربط والصلاحيات المفعلة.</p></div><div className="grid gap-5 lg:grid-cols-2">{googleServices.map(({icon:Icon,title,subtitle,items})=><details key={title} className="group rounded-[2rem] border border-emerald-100 bg-[#F8FCFA] p-0 shadow-sm open:bg-white"><summary className="flex cursor-pointer list-none items-center gap-4 p-6"><div className="rounded-2xl bg-emerald-100 p-3 text-emerald-800"><Icon className="h-7 w-7"/></div><div className="flex-1"><h3 className="text-xl font-black">{title}</h3><p className="mt-1 text-sm font-bold text-gray-500">{subtitle}</p></div><span className="text-2xl font-black text-emerald-700 group-open:rotate-45">+</span></summary><div className="space-y-3 border-t border-emerald-100 px-6 pb-6 pt-5">{items.map(x=><p key={x} className="flex items-start gap-3 leading-8 text-gray-700"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/>{x}</p>)}</div></details>)}</div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16 md:py-20"><div className="mb-10 max-w-4xl"><p className="font-black text-emerald-700">الفرق الحقيقي</p><h2 className="mt-2 text-3xl font-black md:text-4xl">وياك داخل بيئة أعمال حقيقية، وليس أداة AI منفصلة</h2></div><div className="overflow-x-auto rounded-[2rem] border border-emerald-100 bg-white shadow-sm"><table className="min-w-[880px] w-full text-right"><thead className="bg-[#062F22] text-white"><tr><th className="p-5 text-lg">وجه المقارنة</th><th className="p-5 text-lg">أدوات الذكاء الاصطناعي العامة</th><th className="p-5 text-lg">منظومة وياك عبر بيت الريف</th></tr></thead><tbody>{comparison.map(([a,b,c],i)=><tr key={a} className={i%2?'bg-emerald-50/40':'bg-white'}><td className="p-5 align-top font-black text-[#062F22]">{a}</td><td className="p-5 align-top leading-8 text-gray-600">{b}</td><td className="p-5 align-top leading-8 text-gray-700">{c}</td></tr>)}</tbody></table></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/google-cloud-biet-alreef" className="inline-flex items-center gap-2 rounded-2xl bg-[#062F22] px-6 py-3 font-black text-white">Google Cloud مع بيت الريف <ArrowLeft className="h-4 w-4"/></Link><Link href="/google-workspace-biet-alreef" className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-6 py-3 font-black text-[#062F22]">Google Workspace مع بيت الريف <ArrowLeft className="h-4 w-4"/></Link></div></section>

<section className="bg-[#062F22] py-16 text-white"><div className="mx-auto max-w-6xl px-4"><h2 className="text-3xl font-black">كيف يعمل وياك داخل الحساب؟</h2><div className="mt-8 grid gap-5 md:grid-cols-4">{[['01','يفهم سياق حسابك'],['02','تحدد المهمة المطلوبة'],['03','يجهز البيانات داخل المسار المناسب'],['04','تراجع النتيجة وتكمل الإجراء']].map(([n,t])=><div key={n} className="rounded-3xl bg-white/10 p-6"><span className="text-3xl font-black text-emerald-200">{n}</span><h3 className="mt-4 font-black">{t}</h3></div>)}</div></div></section>

<section className="mx-auto max-w-6xl px-4 py-16"><div className="grid gap-6 lg:grid-cols-2"><article className="rounded-[2rem] bg-white p-8 shadow-sm"><Bot className="h-9 w-9 text-emerald-700"/><h2 className="mt-5 text-2xl font-black">محرك أتمتة ومساعدة داخل سياق الشركة</h2><p className="mt-4 leading-8 text-gray-600">القيمة الأساسية لوياك تأتي من ارتباطه بسياق الشركة ومسارات العمل والعناصر والبيانات والربط المتاح، وليس من تقديم دردشة عامة بلا سياق.</p></article><article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8"><h2 className="text-2xl font-black">القرار النهائي للمستخدم</h2><p className="mt-4 leading-8 text-gray-700">يساعد وياك في الفهم والتنظيم والتجهيز والأتمتة ضمن الصلاحيات، لكنه لا يحل محل صاحب الحساب أو الجهة المخولة في القرارات الحساسة أو النهائية.</p></article></div></section>

<FAQ items={faqs} title="الأسئلة الشائعة حول وياك وخدمات Google"/>
<section className="bg-[#062F22] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black">وياك داخل منظومة أعمالك، لا بجانبها</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/75">ابدأ من حسابك وبياناتك ومساراتك، ثم فعّل الربط والخدمات التي تناسب احتياج شركتك.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-300 px-8 py-4 font-black text-[#062F22]">تحدث مع فريق بيت الريف <ArrowLeft className="h-5 w-5"/></Link></div></section>
</main><Footer/></div></>}

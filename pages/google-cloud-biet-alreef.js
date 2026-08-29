import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { ArrowLeft, Cloud, Database, BrainCircuit, Map, Workflow, AppWindow, BadgeCheck, CheckCircle2, BarChart3, Network, ShieldCheck } from 'lucide-react';

const faqs=[
  ['هل بيت الريف مدرج في Google Cloud Partner Finder؟','نعم. لبيت الريف ملف عام وموثق في Google Cloud Partner Finder يعرض الشركة ومنصتها ومجالات التركيز التقنية والخدمات المقدمة في دولة الإمارات.'],
  ['ما الفرق بين Google Cloud وGoogle Workspace؟','Google Cloud يركز على البنية التحتية والتطبيقات وقواعد البيانات والذكاء الاصطناعي والخرائط والتكاملات، بينما Google Workspace يركز على البريد المؤسسي والملفات والاجتماعات والتعاون وإدارة المستخدمين.'],
  ['هل لدى بيت الريف Partner Tier معلن؟','الملف الرسمي الحالي لا يعرض Partner Tier معلنًا، لذلك لا ننسب أي رتبة أو مستوى شراكة غير ظاهر رسميًا.'],
  ['ما نوع المشاريع التي يمكن تنفيذها؟','يعتمد ذلك على الاحتياج، ويمكن أن يشمل تحديث التطبيقات والبيانات والتحليلات وقواعد البيانات والخرائط والذكاء الاصطناعي والأتمتة والتكاملات ضمن نطاق العمل المتفق عليه.']
];

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))
};

const comparison=[
  ['الموثوقية والشفافية','ادعاءات تقنية أو شراكات غير واضحة','إدراج عام موثق في Google Cloud Partner Finder مع عدم ادعاء Tier غير معلن'],
  ['نطاق الحلول','خدمات عامة أو باقات ثابتة لا تراعي حجم الاستخدام','اختيار الخدمات وفق الاحتياج الفعلي للشركة ونطاق المشروع لتقليل التعقيد والهدر'],
  ['الذكاء الاصطناعي والخرائط','حلول جاهزة غير مرتبطة بسياق النشاط','دمج قدرات الذكاء الاصطناعي وGoogle Maps APIs ضمن سيناريوهات تشغيلية وتجارية واضحة'],
  ['دعم القيمة المضافة','استشارة تقنية منفصلة عن حضور الشركة الرقمي','إمكانية ربط البنية التقنية بمسارات بيت الريف والأعمال والدليل وفق متطلبات الحساب والنشر']
];

const capabilities=[
  [AppWindow,'تحديث وتطوير التطبيقات (App Modernization)','إعادة هيكلة التطبيقات وربطها ببنية سحابية مرنة وقابلة للتوسع وفق احتياج الشركة الفعلي.'],
  [Database,'إدارة البيانات والتحليلات (Data & Databases)','تصميم تدفقات البيانات وقواعد البيانات والتحليلات لدعم قرارات الأعمال اعتمادًا على معلومات منظمة.'],
  [BrainCircuit,'حلول الذكاء الاصطناعي للأعمال','دمج قدرات الذكاء الاصطناعي ضمن نطاق عملي واضح يخدم العمليات أو العملاء أو المحتوى أو التحليل.'],
  [Map,'حلول الموقع والخرائط (Google Maps APIs)','تضمين الخرائط والمواقع والمسارات وتتبع المواقع الجغرافية لدعم التطبيقات والعمليات الميدانية واللوجستية.'],
  [Workflow,'الأتمتة والتكامل السلس','ربط الأنظمة وتقليل الإجراءات اليدوية المتكررة وتنسيق تدفقات العمل بين التطبيقات والبيانات.'],
  [Cloud,'استشارات وتخطيط البنية السحابية','تحديد الخدمات والبنية المناسبة لحجم العمل والاستخدام المتوقع مع مراعاة الأداء والتكلفة وقابلية التوسع.']
];

export default function GoogleCloudPage(){return <><Head>
<title>Google Cloud الإمارات | حلول سحابية وذكاء اصطناعي للشركات | بيت الريف</title>
<meta name="description" content="طور بنيتك التحتية مع خدمات Google Cloud من بيت الريف في الإمارات. حلول متكاملة تشمل الذكاء الاصطناعي، الخرائط، إدارة البيانات، وأتمتة العمليات بشفافية كاملة."/>
<meta name="keywords" content="Google Cloud الإمارات، خدمات جوجل السحابية، Google Maps API الإمارات، أتمتة الأعمال، الذكاء الاصطناعي للشركات، بيت الريف Google Cloud"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<link rel="canonical" href="https://bietalreef.ae/google-cloud-biet-alreef"/>
<meta property="og:title" content="Google Cloud الإمارات | حلول سحابية وذكاء اصطناعي للشركات | بيت الريف"/>
<meta property="og:description" content="حلول Google Cloud للشركات في الإمارات تشمل التطبيقات والبيانات والذكاء الاصطناعي والخرائط والأتمتة والتكاملات."/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://bietalreef.ae/google-cloud-biet-alreef"/>
<meta property="og:image" content="https://bietalreef.ae/images/google-cloud-business-solutions.svg"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
</Head><div dir="rtl" className="min-h-screen bg-[#F7FAFF]"><Navbar/><main>

<section className="relative overflow-hidden bg-gradient-to-l from-[#102A43] to-[#0E4B6F] py-16 text-white md:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_28%)]"/><div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-black"><Cloud className="h-5 w-5"/>Google Cloud | بيت الريف</span><h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">بنية سحابية ذكية تُحرك نمو أعمالك مع Google Cloud من بيت الريف</h1><p className="mt-6 text-lg leading-9 text-white/80">نُصمم وننفذ حلولاً سحابية تناسب تطلعات وحجم الشركات في دولة الإمارات، مع الاستفادة من بنية Google Cloud لتطوير التطبيقات، إدارة البيانات، ودمج الذكاء الاصطناعي لرفع الكفاءة التشغيلية.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-black text-[#102A43]">ناقش احتياجك التقني <ArrowLeft className="h-5 w-5"/></Link><a href="#capabilities" className="rounded-2xl border border-white/25 px-8 py-4 text-center font-black">استكشف مجالاتنا</a></div></div><div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-4 shadow-2xl"><img src="/images/google-cloud-business-solutions.svg" alt="Google Cloud مع بيت الريف في الإمارات" className="h-auto w-full rounded-[1.5rem]"/></div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16 md:py-20"><div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm md:p-10"><div className="flex items-start gap-4"><BadgeCheck className="mt-1 h-9 w-9 shrink-0 text-[#0E4B6F]"/><div><h2 className="text-2xl font-black">مدرج رسميًا في Google Cloud Partner Finder</h2><p className="mt-4 leading-8 text-gray-600">يعرض ملف بيت الريف العام في Google مجالات تركيز تشمل Google Cloud وGoogle Workspace والذكاء الاصطناعي والبيانات والتحليلات وقواعد البيانات والخرائط وتحديث التطبيقات والتجارة الإلكترونية وأتمتة العمليات، بدون ادعاء Tier غير ظاهر في الملف الرسمي.</p></div></div></div></section>

<section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20"><p className="font-black text-[#0E4B6F]">شفافية وكفاءة قبل أي تنفيذ</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">لماذا بيت الريف لخدمات Google Cloud؟</h2><p className="mt-4 max-w-4xl leading-8 text-gray-600">لا نكتفي بعرض خدمة سحابية؛ نحدد المشكلة أولاً ثم نختار البنية والخدمات المناسبة للنشاط ونربطها بمسارات العمل الحالية.</p><div className="mt-8 overflow-x-auto rounded-[2rem] border border-blue-100 bg-white shadow-sm"><table className="min-w-[880px] w-full text-right"><thead className="bg-[#102A43] text-white"><tr><th className="p-5 text-lg">وجه المقارنة</th><th className="p-5 text-lg">الشركات التقليدية (IT Vendors)</th><th className="p-5 text-lg">منظومة Google Cloud من بيت الريف</th></tr></thead><tbody>{comparison.map(([a,b,c],i)=><tr key={a} className={i%2?'bg-blue-50/50':'bg-white'}><td className="p-5 align-top font-black text-[#102A43]">{a}</td><td className="p-5 align-top leading-8 text-gray-600">{b}</td><td className="p-5 align-top leading-8 text-gray-700">{c}{a==='دعم القيمة المضافة'?<><br/><Link href="/join-provider" className="mt-2 inline-flex font-black text-[#0E4B6F] underline">دليل مزودي بيت الريف</Link></>:null}</td></tr>)}</tbody></table></div></section>

<section id="capabilities" className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4"><p className="font-black text-[#0E4B6F]">مجالات الاختصاص والحلول السحابية</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">حلول مترابطة للتطبيقات والبيانات والذكاء الاصطناعي والعمليات</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-blue-100 bg-[#F8FBFF] p-7 shadow-sm"><I className="h-9 w-9 text-[#0E4B6F]"/><h3 className="mt-4 text-xl font-black text-[#102A43]">{t}</h3><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16 md:py-20"><div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]"><div><p className="font-black text-[#0E4B6F]">مسار التنفيذ</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">4 خطوات نحو التحول الرقمي</h2><div className="mt-8 space-y-4">{[['01','تحديد الهدف والمشكلة','دراسة التحديات التقنية والغايات الاستراتيجية لنشاطك.'],['02','مراجعة البيئة والبيانات الحالية','تقييم الأنظمة والبيانات والتكاملات الحالية قبل اختيار مسار التنفيذ.'],['03','تحديد نطاق Google Cloud','تصميم البنية والخدمات المناسبة لحجم أعمالك ومتطلبات الأداء والتوسع.'],['04','التنفيذ والربط الآمن','تشغيل الحلول وربط البيانات والأنظمة ومراجعة الاستقرار والأمان ضمن نطاق المشروع.']].map(([n,t,d])=><div key={n} className="flex gap-4 rounded-3xl border border-blue-100 bg-white p-5"><span className="text-2xl font-black text-[#0E4B6F]">{n}</span><div><h3 className="font-black text-[#102A43]">{t}</h3><p className="mt-2 leading-7 text-gray-600">{d}</p></div></div>)}</div></div><div className="rounded-[2rem] bg-[#102A43] p-8 text-white"><Network className="h-10 w-10 text-blue-200"/><h2 className="mt-5 text-2xl font-black">بنية واحدة تربط تطبيقاتك وبياناتك وعملياتك</h2><div className="mt-6 space-y-4">{[['البيانات والتحليلات',BarChart3],['الذكاء الاصطناعي',BrainCircuit],['الخرائط والمواقع',Map],['التكامل والأتمتة',Workflow],['الأمان والاستقرار',ShieldCheck]].map(([t,I])=><div key={t} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"><I className="h-5 w-5 text-blue-200"/><span className="font-bold">{t}</span></div>)}</div></div></div></section>

<section className="bg-[#EAF4FB] py-14"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-right"><div><h2 className="text-3xl font-black text-[#102A43]">اطلب تقييم بنية سحابية مبدئي مجاني</h2><p className="mt-3 leading-8 text-gray-600">ابدأ بمراجعة الاحتياج الحالي قبل تحديد نطاق التنفيذ والخدمات المناسبة.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#0E4B6F] px-8 py-4 font-black text-white">اطلب التقييم <ArrowLeft className="h-5 w-5"/></Link></div></section>

<FAQ items={faqs} title="الأسئلة الشائعة حول Google Cloud مع بيت الريف"/>
<section className="py-16"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black">ابدأ من احتياج شركتك التقني</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">حدد الهدف والمشكلة الحالية، ثم نراجع معك نطاق الحل السحابي المناسب.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#0E4B6F] px-8 py-4 font-black text-white">تحدث مع فريق بيت الريف <ArrowLeft className="h-5 w-5"/></Link></div></section>
</main><Footer/></div></>}

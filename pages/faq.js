import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle, Search, Building2, Store, Bot, CreditCard, ShieldCheck } from 'lucide-react';

const groups=[
  ['عن بيت الريف',Building2,[['ما هي بيت الريف؟','منصة رقمية إماراتية تنظّم الوصول إلى الشركات ومزودي الخدمات والمنتجات والأعمال في قطاع البناء والخدمات، وتوفر مسارات رقمية للأعمال والعملاء.'],['هل بيت الريف مجرد دليل شركات؟','لا. الدليل جزء من المنظومة، بينما تشمل بيت الريف أيضًا السوق والمتاجر وأدوات الأعمال والخطط ووياك ومسارات الخدمات الرقمية.']]],
  ['الحساب والمتجر',Store,[['هل التسجيل يعني النشر مباشرة؟','لا. النشر يرتبط باكتمال البيانات والتحقق وحالة الحساب والخطة والصلاحيات.'],['هل عدد المنتجات والخدمات مفتوح؟','لا. الحصة والخطة والصلاحيات تحدد ما يمكن حفظه ونشره وإدارته.']]],
  ['وياك والذكاء الاصطناعي',Bot,[['ما هو وياك؟','مساعد أعمال ذكي داخل منظومة بيت الريف يعمل مع سياق الحساب والبيانات والصلاحيات المتاحة.'],['هل يتخذ وياك القرارات النهائية؟','لا. يساعد في الفهم والتنظيم والتجهيز بينما تبقى القرارات النهائية للمستخدم والجهات المخولة.']]],
  ['الاشتراكات والسياسات',CreditCard,[['أين أراجع الخطة الحالية؟','من صفحة خطط الأعمال والاشتراكات أو عبر خدمة العملاء قبل التفعيل.'],['كيف أعرف شروط الاسترداد؟','راجع صفحة سياسة الاسترداد والشروط المنشورة عند الاشتراك لأن الأهلية تتأثر بالخدمات والتكاليف التي تم تفعيلها.']]],
];

export default function FAQPage(){return <><Head><title>الأسئلة الشائعة | بيت الريف</title><meta name="description" content="إجابات واضحة عن منصة بيت الريف والحسابات والمتاجر والخطط ووياك وسياسات الاستخدام والدعم."/><link rel="canonical" href="https://bietalreef.ae/faq"/></Head><div dir="rtl" className="min-h-screen bg-[#F8FBF9]"><Navbar/><main>
<section className="bg-[#0F3F1A] px-4 py-20 text-center text-white"><div className="mx-auto max-w-5xl"><HelpCircle className="mx-auto h-12 w-12 text-[#F3D46B]"/><h1 className="mt-5 text-4xl font-black md:text-6xl">الأسئلة الشائعة</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-white/80">إجابات مباشرة عن استخدام بيت الريف، حسابات الأعمال، المتجر، وياك، الخطط والسياسات.</p></div></section>
<section className="mx-auto max-w-6xl px-4 py-16"><div className="grid gap-7 lg:grid-cols-2">{groups.map(([title,Icon,items])=><article key={title} className="rounded-[2rem] border border-[#DCE8DF] bg-white p-7 shadow-sm"><div className="flex items-center gap-3"><Icon className="h-7 w-7 text-[#0F3F1A]"/><h2 className="text-2xl font-black">{title}</h2></div><div className="mt-6 space-y-5">{items.map(([q,a])=><div key={q} className="rounded-2xl bg-[#F7FAF7] p-5"><h3 className="font-black">{q}</h3><p className="mt-2 leading-7 text-gray-600">{a}</p></div>)}</div></article>)}</div></section>
<section className="bg-white px-4 py-16"><div className="mx-auto max-w-5xl rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8 text-center"><Search className="mx-auto h-9 w-9 text-[#0F3F1A]"/><h2 className="mt-4 text-3xl font-black">لم تجد إجابتك؟</h2><p className="mt-4 leading-8 text-gray-700">تواصل مع فريق الدعم وسنوجهك إلى المسار أو الخدمة أو السياسة المناسبة.</p><Link href="/contact" className="mt-7 inline-flex rounded-2xl bg-[#0F3F1A] px-8 py-4 font-black text-white">أرسل سؤالك</Link></div></section>
</main><Footer/></div></>}

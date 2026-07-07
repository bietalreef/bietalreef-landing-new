import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  ['ما هو بيت الريف؟', 'بيت الريف منصة رقمية لتنظيم رحلة البحث عن خدمات البناء والصيانة ومزودي الخدمات في الإمارات.'],
  ['هل يوجد تسجيل مزود خدمة؟', 'نعم، يبدأ مزود الخدمة من صفحة الشرح ثم ينتقل إلى التطبيق من آخر الصفحة فقط.'],
  ['هل الأسعار ثابتة؟', 'لا يتم عرض أسعار غير معتمدة؛ يتم تنظيم الطلب ثم التواصل أو طلب عرض سعر حسب التفاصيل.'],
];

export default function FAQPage() {
  return (
    <><Head><title>الأسئلة الشائعة | بيت الريف</title><meta name="description" content="إجابات على الأسئلة الشائعة حول بيت الريف، مزودي الخدمات، دليل الإمارات، والتطبيق." /><link rel="canonical" href="https://bietalreef.ae/faq" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">الدعم</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">الأسئلة الشائعة</h1><div className="mt-10 space-y-4">{faqs.map(([q,a]) => <article key={q} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-[#0F3F1A]">{q}</h2><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{a}</p></article>)}</div></main><Footer /></div></>
  );
}

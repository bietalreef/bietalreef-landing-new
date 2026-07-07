import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PricingPage() {
  return (
    <><Head><title>الأسعار | بيت الريف</title><meta name="description" content="خيارات الأسعار والاشتراك في بيت الريف لمزودي الخدمات والشركاء سيتم تحديثها تدريجيًا." /><link rel="canonical" href="https://bietalreef.ae/pricing" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">الأسعار</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">خيارات الأسعار والاشتراك</h1><p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600">يتم تجهيز باقات بيت الريف لمزودي الخدمات والشركاء حسب نوع النشاط، التخصص، ومناطق الخدمة. للحصول على التفاصيل الحالية تواصل مع الفريق.</p><Link href="/providers/register" className="mt-8 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white">ابدأ من صفحة مزود الخدمة</Link></main><Footer /></div></>
  );
}

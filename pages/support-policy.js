import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SupportPolicyPage() {
  return (
    <><Head><title>سياسة الدعم | بيت الريف</title><meta name="description" content="سياسة الدعم في بيت الريف لتنظيم التواصل والاستفسارات وطلبات مزودي الخدمات." /><link rel="canonical" href="https://bietalreef.ae/support-policy" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">الدعم</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">سياسة الدعم</h1><p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600">يدعم بيت الريف المستخدمين عبر مسارات واضحة: استفسار عام، طلب خدمة، انضمام مزود خدمة، أو تواصل مباشر مع الفريق عند الحاجة.</p></main><Footer /></div></>
  );
}

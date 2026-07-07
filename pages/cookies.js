import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CookiesPage() {
  return (
    <><Head><title>سياسة ملفات الارتباط | بيت الريف</title><meta name="description" content="سياسة ملفات الارتباط في موقع بيت الريف وتجربة الاستخدام والتحسينات المستقبلية." /><link rel="canonical" href="https://bietalreef.ae/cookies" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">القانونية</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">سياسة ملفات الارتباط</h1><p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600">قد يستخدم الموقع ملفات ارتباط لتحسين تجربة الاستخدام وقياس الأداء، وسيتم توضيح خيارات التحكم بها مع تطور المنصة.</p></main><Footer /></div></>
  );
}

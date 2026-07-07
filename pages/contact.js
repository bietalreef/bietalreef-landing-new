import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <><Head><title>تواصل معنا | بيت الريف</title><meta name="description" content="تواصل مع فريق بيت الريف للاستفسارات، مزودي الخدمات، الشراكات، وطلبات الدعم." /><link rel="canonical" href="https://bietalreef.ae/contact" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">تواصل معنا</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">كيف يمكننا مساعدتك؟</h1><p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600">للاستفسارات العامة، انضمام مزودي الخدمات، الشراكات، أو الدعم، يمكنك التواصل مع فريق بيت الريف.</p><a href="https://wa.me/971567856001" className="mt-8 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white">تواصل عبر واتساب</a></main><Footer /></div></>
  );
}

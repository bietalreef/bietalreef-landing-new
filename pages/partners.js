import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PartnersPage() {
  return (
    <><Head><title>الشركاء | بيت الريف</title><meta name="description" content="انضم إلى منظومة بيت الريف كشريك في خدمات البناء والصيانة والمواد والموردين داخل الإمارات." /><link rel="canonical" href="https://bietalreef.ae/partners" /></Head><div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans"><Navbar /><main className="mx-auto max-w-5xl px-4 py-16 md:py-24"><span className="text-sm font-black text-[#6F5400]">الشركاء</span><h1 className="mt-3 text-4xl font-black text-[#0F3F1A] md:text-6xl">كن شريكًا في بيت الريف</h1><p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600">نفتح الباب أمام مزودي الخدمات، الموردين، المصانع، والجهات التي ترغب في بناء حضور رقمي منظم داخل قطاع البناء والصيانة في الإمارات.</p><Link href="/providers/register" className="mt-8 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white">ابدأ كشريك أو مزود خدمة</Link></main><Footer /></div></>
  );
}

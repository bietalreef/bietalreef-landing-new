import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContractorsInUAEPage() {
  return (
    <>
      <Head>
        <title>شركات المقاولات في الإمارات | بيت الريف</title>
        <meta name="description" content="صفحة عامة مفتوحة لخدمات شركات المقاولات في الإمارات ضمن موقع بيت الريف التعريفي، مستوحاة من صفحات Figmawebapp العامة ومهيأة للزحف والفهرسة." />
        <link rel="canonical" href="https://bietalreef.ae/contractors-in-uae" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">خدمات عامة من Figmawebapp</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">شركات المقاولات في الإمارات</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-8">هذه صفحة عامة قابلة للفهرسة لخدمات المقاولات في الإمارات، تم توفيرها داخل الموقع التعريفي لمنع فقدان روابط الصفحات العامة القادمة من مستودع Figmawebapp.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/general-contracting" className="rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">استعرض مقاولات عامة</Link>
            <Link href="/uae" className="rounded-full border border-[#0F3F1A] text-[#0F3F1A] px-6 py-3 font-black">اختر الإمارة</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

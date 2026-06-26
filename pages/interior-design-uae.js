import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function InteriorDesignUAEPage() {
  return (
    <>
      <Head>
        <title>التصميم الداخلي في الإمارات | بيت الريف</title>
        <meta name="description" content="صفحة عامة مفتوحة لخدمات التصميم الداخلي والديكور في الإمارات ضمن موقع بيت الريف التعريفي ومطابقة لحصر الصفحات العامة في Figmawebapp." />
        <link rel="canonical" href="https://bietalreef.ae/interior-design-uae" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">صفحة عامة من Figmawebapp</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">التصميم الداخلي في الإمارات</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-8">صفحة مفتوحة للتصميم الداخلي والديكور، تم توفيرها في الموقع التعريفي حتى لا تظهر كرابط غير متاح.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/interior-design" className="rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">استعرض التصميم الداخلي</Link>
            <Link href="/uae" className="rounded-full border border-[#0F3F1A] text-[#0F3F1A] px-6 py-3 font-black">اختر الإمارة</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

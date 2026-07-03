import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GeneralContractingServicePage() {
  return (
    <>
      <Head>
        <title>مقاولات عامة | الخدمات والعروض | بيت الريف</title>
        <meta name="description" content="صفحة مقاولات عامة داخل قسم الخدمات والعروض في بيت الريف مع حالة واضحة عند عدم توفر عروض حاليًا." />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="الخدمات والعروض" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">الخدمات والعروض</span>
              <div className="mt-6 text-5xl">🏗️</div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight">مقاولات عامة</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 mx-auto md:mx-0">بناء فلل وملاحق ومجالس ومشاريع سكنية وتجارية حسب تفاصيل المشروع.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/contact" className="rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">اطلب عرض سعر</Link>
                <Link href="/services" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">كل الخدمات والعروض</Link>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12" aria-label="العروض المتاحة">
            <div className="rounded-3xl border border-[#E6DCC8] bg-white p-10 text-center shadow-sm" role="status">
              <h2 className="text-2xl font-black text-[#0F3F1A]">لا توجد عروض متاحة حاليًا</h2>
              <p className="mt-3 text-gray-600 leading-8">لا توجد عروض جاهزة لخدمة مقاولات عامة الآن. يمكنك طلب عرض سعر مخصص حسب تفاصيل مشروعك.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-2xl bg-primary px-7 py-3 text-sm font-black text-white">اطلب عرض سعر مخصص</Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

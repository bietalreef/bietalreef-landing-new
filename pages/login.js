import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RetiredLoginPage() {
  return (
    <>
      <Head>
        <title>صفحة تسجيل الدخول غير متاحة | بيت الريف</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="mx-auto flex min-h-[55vh] max-w-3xl items-center px-4 py-16">
          <section className="w-full rounded-[2rem] border border-[#E6DCC8] bg-white p-8 text-center shadow-sm md:p-12">
            <p className="text-sm font-black text-[#8A611B]">410 — صفحة متوقفة</p>
            <h1 className="mt-3 text-3xl font-black text-[#0F3F1A]">لا توجد صفحة تسجيل دخول للعملاء على هذا الموقع</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-8 text-gray-600">
              بيت الريف موقع معلومات ودليل خدمات عام. أُوقفت واجهة تسجيل الدخول التجريبية، ولا يطلب هذا المسار بريدًا إلكترونيًا أو كلمة مرور أو أي بيانات حساب.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="rounded-xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white">العودة للرئيسية</Link>
              <Link href="/contact" className="rounded-xl border border-[#D7C7A7] px-6 py-3 text-sm font-black text-[#0F3F1A]">تواصل معنا</Link>
            </div>
          </section>
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export function getServerSideProps({ res }) {
  res.statusCode = 410;
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return { props: {} };
}

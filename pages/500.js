import Head from 'next/head';
import Link from 'next/link';

export default function ServerErrorPage() {
  return (
    <>
      <Head>
        <title>تعذر إكمال الطلب | بيت الريف</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#F8F4EC] px-5 py-10 text-[#102F18]">
        <section className="w-full max-w-xl rounded-[2rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-2xl md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3CC] text-3xl">🛠️</div>
          <h1 className="mt-5 text-2xl font-black md:text-3xl">تعذر إكمال الطلب مؤقتًا</h1>
          <p className="mt-4 leading-8 text-gray-600">تم احتواء المشكلة. حاول تحديث الصفحة، أو ارجع إلى الرئيسية لمتابعة استخدام بيت الريف.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-7 min-h-[52px] w-full rounded-2xl bg-[#102F18] px-6 py-3 font-black text-white shadow-lg">إعادة المحاولة</button>
          <Link href="/" className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-[#D9C99D] bg-[#FFF9E8] px-6 py-3 font-black text-[#102F18]">العودة إلى الرئيسية</Link>
        </section>
      </main>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WhyBietAlReefPage() {
  return (
    <>
      <Head>
        <title>لماذا بيت الريف | منصة البناء الذكية</title>
        <meta name="description" content="تعرف على سبب اختيار بيت الريف كمنصة رقمية لتنظيم خدمات البناء والصيانة ومزودي الخدمات في الإمارات." />
        <link rel="canonical" href="https://bietalreef.ae/why-biet-alreef" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <span className="text-sm font-black text-[#6F5400]">بيت الريف</span>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">لماذا بيت الريف؟</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600 md:text-xl">لأن قطاع البناء والصيانة يحتاج إلى مسار واضح: عميل يعرف من أين يبدأ، ومزود خدمة يظهر في المكان الصحيح، وطلبات منظمة بدل الرسائل العشوائية.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['مسار واضح', 'ابدأ من الإمارة أو الخدمة أو مزود الخدمة بدون تشتت.'],
              ['حضور رقمي مستدام', 'لا نبيع إعلانًا مؤقتًا؛ نساعد النشاط على بناء وجود رقمي طويل المدى.'],
              ['ربط العميل بالمزود', 'تنظيم الطلب قبل التواصل يساعد الطرفين على فهم الاحتياج بسرعة.'],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-black text-[#0F3F1A]">{title}</h2>
                <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{desc}</p>
              </article>
            ))}
          </div>
          <Link href="/providers/register" className="mt-10 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white">ابدأ كمزود خدمة</Link>
        </main>
        <Footer />
      </div>
    </>
  );
}

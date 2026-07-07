import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
  ['اختر المسار', 'ابدأ من دليل الإمارات، مزود الخدمة، الخدمات والعروض، أو المنتجات والمتاجر.'],
  ['صف احتياجك', 'حدد المكان، نوع الخدمة، الصور أو التفاصيل الأساسية حتى يصبح الطلب واضحًا.'],
  ['انتقل للخطوة المناسبة', 'إما تواصل مباشر، طلب عرض سعر، أو الانضمام كمزود خدمة من صفحة الشرح.'],
];

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>كيف يعمل بيت الريف | مسار واضح لكل مشروع</title>
        <meta name="description" content="شرح طريقة عمل بيت الريف: اختيار المسار، تنظيم الطلب، ثم الانتقال إلى الخدمة أو مزود الخدمة أو التطبيق من الصفحة المناسبة." />
        <link rel="canonical" href="https://bietalreef.ae/how-it-works" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <span className="text-sm font-black text-[#6F5400]">طريقة العمل</span>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">كيف يعمل بيت الريف؟</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-gray-600 md:text-xl">بيت الريف ينظم رحلة البحث والتواصل في قطاع البناء والصيانة، حتى يبدأ العميل أو مزود الخدمة من المكان الصحيح.</p>
          <div className="mt-10 space-y-4">
            {steps.map(([title, desc], index) => (
              <article key={title} className="flex gap-4 rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-black text-[#1F170D]">{index + 1}</span>
                <div>
                  <h2 className="text-2xl font-black text-[#0F3F1A]">{title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-8 text-gray-600">{desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/uae" className="rounded-2xl bg-[#0F3F1A] px-7 py-4 text-center font-black text-white">ابدأ من دليل الإمارات</Link>
            <Link href="/providers/register" className="rounded-2xl border border-[#E6DCC8] bg-white px-7 py-4 text-center font-black text-[#0F3F1A]">انضم كمزود خدمة</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WeyaakPage() {
  return (
    <>
      <Head>
        <title>وياك | بيت الريف</title>
        <meta name="description" content="وياك هو المساعد الذكي المرتبط بمنظومة بيت الريف لمساعدة المستخدم في فهم الخدمات والوصول للتخصص المناسب." />
        <link rel="canonical" href="https://bietalreef.ae/weyaak" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">وياك</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">وياك — مساعدك الذكي داخل بيت الريف</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">صفحة تعريفية لدور وياك في مساعدة العملاء ومزودي الخدمات على تنظيم الطلبات وفهم الخيارات داخل منظومة بيت الريف.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              ['فهم الطلب', 'يساعد المستخدم على ترتيب احتياجه قبل إرسال الطلب.'],
              ['اقتراح التخصص', 'يوجه المستخدم إلى الخدمة أو القسم الأقرب لطلبه.'],
              ['ربط بالتطبيق', 'ينقل الخطوات التشغيلية إلى تطبيق بيت الريف.']
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                <h2 className="font-black text-[#0F3F1A] mb-2">{title}</h2>
                <p className="text-sm text-gray-600 leading-7">{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">استعرض الخدمات</Link>
        </main>
        <Footer />
      </div>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tools = [
  ['حاسبة المواد', 'تقدير مبدئي للكميات والمواد حسب نوع المشروع.'],
  ['تقدير التكلفة', 'مساعدة في فهم عناصر التكلفة قبل طلب عرض سعر.'],
  ['تحليل عروض الأسعار', 'تنظيم بنود العروض لمقارنتها بشكل أوضح.'],
  ['مساعد التصميم', 'تنظيم أفكار التصميم وربطها بالصور والخدمات.']
];

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>الأدوات الذكية | بيت الريف</title>
        <meta name="description" content="تعرف على الأدوات الذكية في بيت الريف لمساعدة العملاء ومزودي الخدمات في تقدير المواد والتكلفة وتنظيم القرار." />
        <link rel="canonical" href="https://bietalreef.ae/tools" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">الأدوات الذكية</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">أدوات بيت الريف الذكية</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">صفحة تعريفية للأدوات التي تساعد المستخدم في فهم احتياجه قبل الانتقال للتطبيق لإدارة الطلبات والتفاصيل.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {tools.map(([title, desc]) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                <h2 className="font-black text-[#0F3F1A] mb-2">{title}</h2>
                <p className="text-sm text-gray-600 leading-7">{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/uae" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">اختر المدينة والتخصص</Link>
        </main>
        <Footer />
      </div>
    </>
  );
}

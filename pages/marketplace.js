import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const items = [
  ['مواد بناء', 'أسمنت وحديد وبلوك ومواد تشطيب'],
  ['إنارة وأنظمة ذكية', 'إنارة وتحكم وكاميرات وأنظمة منزل ذكي'],
  ['أثاث وديكور', 'أثاث ومجالس وستائر وديكور داخلي'],
  ['رخام وسيراميك', 'رخام وسيراميك وبورسلان وأرضيات']
];

export default function MarketplacePage() {
  return (
    <>
      <Head>
        <title>السوق | بيت الريف</title>
        <meta name="description" content="صفحة تعريفية لسوق بيت الريف للمواد والمنتجات المرتبطة بالبناء والصيانة والديكور في الإمارات." />
        <link rel="canonical" href="https://bietalreef.ae/marketplace" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">السوق</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">سوق بيت الريف للمواد والمنتجات</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">هذه صفحة تعريفية تربط الزائر بأقسام السوق داخل منظومة بيت الريف، مع الحفاظ على الموقع التعريفي للأرشفة والتطبيق للتشغيل.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {items.map(([title, desc]) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                <h2 className="font-black text-[#0F3F1A] mb-2">{title}</h2>
                <p className="text-sm text-gray-600 leading-7">{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/uae" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">استعرض المدن والخدمات</Link>
        </main>
        <Footer />
      </div>
    </>
  );
}

import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { UAE_EMIRATES } from '../../data/siteTaxonomy';

export default function BuildingMaterialsPage() {
  return (
    <>
      <Head>
        <title>مواد بناء في الإمارات | بيت الريف</title>
        <meta name="description" content="دليل مواد البناء في الإمارات عبر بيت الريف. اكتشف أفضل الموردين والمحلات لمواد البناء والتشطيب في جميع إمارات الدولة." />
        <link rel="canonical" href="https://bietalreef.ae/building-materials-uae" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">التخصصات</p>
          <div className="flex items-center gap-4 mb-5">
            <div className="text-4xl">🧱</div>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A]">مواد بناء في الإمارات</h1>
          </div>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">
            اكتشف أفضل موردي مواد البناء، الأسمنت، الحديد، الطابوق، ومواد التشطيب في جميع أنحاء الإمارات العربية المتحدة. اختر الإمارة أو المنطقة المناسبة للوصول إلى الموردين المحليين.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UAE_EMIRATES.map((emirate) => (
              <div key={emirate.slug} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm">
                <Link href={`/uae/${emirate.slug}`} className="font-black text-[#0F3F1A] hover:text-[#B8922B] block mb-3">{emirate.nameAr}</Link>
                <div className="flex flex-wrap gap-2">
                  {emirate.areas.slice(0, 8).map((area) => (
                    <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}/building-materials`} className="text-xs border border-[#E6DCC8] rounded-full px-3 py-1 text-gray-600 hover:text-[#0F3F1A] hover:border-[#D4AF37]">
                      {area.nameAr}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

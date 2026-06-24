import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';

export default function UAEDirectory() {
  return (
    <>
      <Head>
        <title>خدمات بيت الريف في جميع إمارات الدولة | مقاولات وصيانة وتصميم ومواد بناء</title>
        <meta name="description" content="دليل بيت الريف لخدمات المقاولات والصيانة والتصميم ومواد البناء في أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، وأم القيوين." />
        <link rel="canonical" href="https://bietalreef.ae/uae" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-[#D4AF37] font-bold mb-3">دليل الإمارات</p>
              <h1 className="text-3xl md:text-5xl font-black mb-5">خدمات بيت الريف في جميع إمارات الدولة</h1>
              <p className="text-white/80 max-w-3xl leading-8">ابدأ من الإمارة أو المنطقة المناسبة، ثم اختر التخصص المطلوب مثل المقاولات، التصميم الداخلي، مواد البناء، النجارة، الكهرباء، السباكة، التكييف، والأثاث والديكور.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-black mb-8">اختر الإمارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="group bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#D4AF37] transition">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-black text-[#0F3F1A] group-hover:text-[#B8922B] transition">{emirate.nameAr}</h3>
                    <span className="text-xs text-gray-400" dir="ltr">{emirate.nameEn}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-7 mb-4">{emirate.description}</p>
                  <div className="text-xs text-gray-500">{emirate.areas.length} منطقة داخل الإمارة</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-5">أهم التخصصات المتاحة</h2>
              <div className="flex flex-wrap gap-2">
                {SERVICE_CATEGORIES.map((service) => (
                  <Link key={service.slug} href={`/categories/${service.slug}`} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-2 text-sm font-bold text-gray-700 hover:text-[#0F3F1A] hover:border-[#D4AF37] transition">
                    {service.icon} {service.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

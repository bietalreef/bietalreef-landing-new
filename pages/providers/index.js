import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../data/siteTaxonomy';

export default function ProvidersPage() {
  return (
    <>
      <Head>
        <title>مزودو الخدمات في بيت الريف | مقاولون وموردون وحرفيون في الإمارات</title>
        <meta name="description" content="سجل كمزود خدمة في بيت الريف واحصل على صفحة هبوط، ظهور في المدن والتخصصات، وربط مع العملاء داخل منصة البناء والصيانة الذكية في الإمارات." />
        <link rel="canonical" href="https://bietalreef.ae/providers" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-[#D4AF37] font-black mb-3">مزودو الخدمات</p>
              <h1 className="text-3xl md:text-5xl font-black mb-5">صفحات هبوط وتسويق لمزودي خدمات البناء والتصميم</h1>
              <p className="text-white/80 max-w-3xl leading-8">بيت الريف يجهز بنية ظهور لمزودي الخدمة حسب الإمارة، المنطقة، والتخصص، مع رابط مباشر لاحقاً إلى حساب المزود داخل التطبيق.</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="https://wa.me/971567856001" className="px-7 py-3 rounded-full bg-[#D4AF37] text-[#0F3F1A] font-black text-center hover:bg-[#c49b2e] transition">سجل كمزود خدمة</a>
                <Link href="/uae" className="px-7 py-3 rounded-full border-2 border-white text-white font-bold text-center hover:bg-white hover:text-[#0F3F1A] transition">استعرض المدن</Link>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-black mb-8">التخصصات التي يدعمها بيت الريف</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-black text-[#0F3F1A] mb-2">{service.nameAr}</h3>
                  <p className="text-sm text-gray-600 leading-7">{service.descAr}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-5">الظهور حسب الإمارات</h2>
              <div className="flex flex-wrap gap-2">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-2 text-sm font-bold text-gray-700 hover:text-[#0F3F1A] hover:border-[#D4AF37] transition">📍 {emirate.nameAr}</Link>
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

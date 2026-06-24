import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getAllAreaPaths } from '../../../data/siteTaxonomy';

export default function AreaPage({ emirate, area }) {
  return (
    <>
      <Head>
        <title>{`خدمات المقاولات والصيانة في ${area.nameAr} - ${emirate.nameAr} | بيت الريف`}</title>
        <meta name="description" content={`استعرض خدمات بيت الريف في ${area.nameAr}، ${emirate.nameAr}: مقاولات عامة، تصميم داخلي، مواد بناء، نجارة، كهرباء، سباكة، تكييف، وأثاث وديكور.`} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirate.slug}/${area.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-4 text-sm text-white/70">
                <Link href="/uae" className="hover:text-[#D4AF37]">الإمارات</Link> / <Link href={`/uae/${emirate.slug}`} className="hover:text-[#D4AF37]">{emirate.nameAr}</Link> / {area.nameAr}
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-5">خدمات بيت الريف في {area.nameAr}</h1>
              <p className="text-white/80 max-w-3xl leading-8">صفحة مخصصة لخدمات المقاولات والبناء والصيانة والتصميم ومواد البناء في {area.nameAr} داخل {emirate.nameAr}. اختر التخصص المطلوب للوصول إلى صفحة أكثر دقة.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-black mb-8">اختر الخدمة في {area.nameAr}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="group bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#D4AF37] transition">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-black text-[#0F3F1A] group-hover:text-[#B8922B] mb-2 transition">{service.nameAr} في {area.nameAr}</h3>
                  <p className="text-sm text-gray-600 leading-7">{service.descAr}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  if (!emirate || !area) return { notFound: true };
  return { props: { emirate, area }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: getAllAreaPaths().map((item) => ({ params: item })),
    fallback: 'blocking'
  };
}

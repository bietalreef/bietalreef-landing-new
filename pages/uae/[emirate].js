import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../data/siteTaxonomy';

export default function EmiratePage({ emirate }) {
  return (
    <>
      <Head>
        <title>{`خدمات المقاولات والصيانة في ${emirate.nameAr} | بيت الريف`}</title>
        <meta name="description" content={`دليل خدمات بيت الريف في ${emirate.nameAr}: مقاولات، صيانة، تصميم داخلي، مواد بناء، أثاث، كهرباء، سباكة، تكييف والمزيد.`} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-4 text-sm text-white/70"><Link href="/uae" className="hover:text-[#D4AF37]">الإمارات</Link> / {emirate.nameAr}</div>
              <h1 className="text-3xl md:text-5xl font-black mb-5">خدمات بيت الريف في {emirate.nameAr}</h1>
              <p className="text-white/80 max-w-3xl leading-8">{emirate.description} اختر المنطقة أولاً ثم انتقل إلى التخصص المناسب للحصول على صفحة هبوط مخصصة للأرشفة والبحث المحلي.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-black mb-8">المناطق داخل {emirate.nameAr}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emirate.areas.map((area) => (
                <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}`} className="bg-white border border-[#E6DCC8] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition">
                  <h3 className="text-lg font-black text-[#0F3F1A] mb-1">{area.nameAr}</h3>
                  <p className="text-xs text-gray-400 mb-4" dir="ltr">{area.nameEn}</p>
                  <p className="text-sm text-gray-600">استعرض خدمات المقاولات والصيانة والتصميم والمواد في {area.nameAr}.</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-5">التخصصات في {emirate.nameAr}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-[#E6DCC8] p-4 hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition">
                    <h3 className="font-black text-[#0F3F1A] mb-1">{service.icon} {service.nameAr}</h3>
                    <p className="text-xs text-gray-500 leading-6">{service.descAr}</p>
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

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };
  return { props: { emirate }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: UAE_EMIRATES.map((emirate) => ({ params: { emirate: emirate.slug } })),
    fallback: 'blocking'
  };
}

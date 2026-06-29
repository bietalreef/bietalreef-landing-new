import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://bietalreef.ae/" },
              { "@type": "ListItem", "position": 2, "name": "دليل الإمارات", "item": "https://bietalreef.ae/uae" },
              { "@type": "ListItem", "position": 3, "name": emirate.nameAr, "item": `https://bietalreef.ae/uae/${emirate.slug}` },
              { "@type": "ListItem", "position": 4, "name": area.nameAr, "item": `https://bietalreef.ae/uae/${emirate.slug}/${area.slug}` }
            ]
          })}
        </script>
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <Image 
                src={`/images/seo/emirates/${emirate.slug}.webp`}
                alt={`خدمات بيت الريف في ${area.nameAr}`}
                fill 
                className="object-cover grayscale"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4">
              <nav className="flex mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <Link href="/uae" className="hover:underline">دليل الإمارات</Link>
                <span className="mx-2">/</span>
                <Link href={`/uae/${emirate.slug}`} className="hover:underline">{emirate.nameAr}</Link>
                <span className="mx-2">/</span>
                <span>{area.nameAr}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">خدمات بيت الريف في {area.nameAr}</h1>
              <p className="text-lg text-white/90 max-w-3xl leading-relaxed font-medium">
                دليلكم الموثوق لكافة خدمات البناء والصيانة والديكور في منطقة {area.nameAr}. نحن نجمع لكم الخبرة والاحترافية لضمان نجاح مشاريعكم المحلية.
              </p>
            </div>
          </section>

          {/* Services Cards Grid */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-3">التخصصات المتاحة في {area.nameAr}</h2>
              <p className="text-gray-600 font-medium">اختر التخصص المطلوب للحصول على أفضل العروض والخدمات المحلية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden bg-[#F0F7F2]">
                    <div className="absolute inset-0 flex items-center justify-center text-7xl transform group-hover:scale-125 transition-transform duration-500 opacity-80">
                      {service.icon}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-[#0F3F1A] uppercase tracking-widest border border-[#E6DCC8]">
                      {service.slug.replace('-', ' ')}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-[#0F3F1A] mb-3 group-hover:text-[#B8922B] transition-colors">
                      {service.nameAr} في {area.nameAr}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                      {service.descAr}
                    </p>
                    <div className="flex items-center justify-between text-sm font-bold border-t border-gray-50 pt-5">
                      <span className="text-[#0F3F1A]">خدمة معتمدة</span>
                      <span className="text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform">تصفح الخدمة ←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Localized SEO Footer */}
          <section className="bg-[#0F3F1A] text-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-black mb-6">هل تبحث عن خدمات في مناطق أخرى في {emirate.nameAr}؟</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {emirate.areas.slice(0, 10).map((otherArea) => (
                  <Link key={otherArea.slug} href={`/uae/${emirate.slug}/${otherArea.slug}`} className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                    {otherArea.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .group {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
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

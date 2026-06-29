import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://bietalreef.ae/" },
              { "@type": "ListItem", "position": 2, "name": "دليل الإمارات", "item": "https://bietalreef.ae/uae" },
              { "@type": "ListItem", "position": 3, "name": emirate.nameAr, "item": `https://bietalreef.ae/uae/${emirate.slug}` }
            ]
          })}
        </script>
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image 
                src={`/images/seo/emirates/${emirate.slug}.webp`}
                alt={`خدمات بيت الريف في ${emirate.nameAr}`}
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4">
              <nav className="flex mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <Link href="/uae" className="hover:underline">دليل الإمارات</Link>
                <span className="mx-2">/</span>
                <span>{emirate.nameAr}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">خدمات بيت الريف في {emirate.nameAr}</h1>
              <p className="text-lg text-white/90 max-w-3xl leading-relaxed font-medium">
                {emirate.description} اكتشف الحلول المتكاملة التي نقدمها في مختلف مناطق {emirate.nameAr}، من المقاولات العامة إلى التصميم الداخلي والصيانة.
              </p>
            </div>
          </section>

          {/* Areas Cards Grid */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-2">المناطق والمدن</h2>
                <p className="text-gray-600 font-medium">اختر منطقتك للحصول على خدمات مخصصة وقريبة منك</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {emirate.areas.map((area) => (
                <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}`} className="group bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#F0F7F2] p-3 rounded-xl group-hover:bg-[#0F3F1A] transition-colors">
                      <svg className="w-6 h-6 text-[#0F3F1A] group-hover:text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter" dir="ltr">{area.nameEn}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#0F3F1A] mb-2 group-hover:text-[#B8922B] transition-colors">{area.nameAr}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">تصفح كافة خدماتنا في منطقة {area.nameAr} وما حولها.</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Specialized Services Section */}
          <section className="bg-white border-y border-[#E6DCC8] py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-10 text-center">التخصصات المتاحة في {emirate.nameAr}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICE_CATEGORIES.map((service) => (
                  <Link key={service.slug} href={`/categories/${service.slug}`} className="flex items-start gap-5 p-6 rounded-2xl border border-transparent hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all duration-300 group">
                    <div className="text-4xl bg-[#FDFBF7] p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">{service.icon}</div>
                    <div>
                      <h3 className="font-black text-lg text-[#0F3F1A] mb-1 group-hover:text-[#B8922B] transition-colors">{service.nameAr}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{service.descAr}</p>
                    </div>
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
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .group {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
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

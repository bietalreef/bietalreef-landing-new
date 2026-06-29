import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';

export default function UAEDirectory() {
  return (
    <>
      <Head>
        <title>خدمات بيت الريف في جميع إمارات الدولة | دليل المقاولات والصيانة</title>
        <meta name="description" content="تصفح خدمات بيت الريف في أبوظبي، دبي، الشارقة وكافة إمارات الدولة. دليل بصري شامل للمقاولات، التصميم الداخلي، ومواد البناء بنظام البطاقات الذكية." />
        <link rel="canonical" href="https://bietalreef.ae/uae" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": UAE_EMIRATES.map((emirate, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://bietalreef.ae/uae/${emirate.slug}`,
              "name": emirate.nameAr
            }))
          })}
        </script>
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image 
                src="/images/seo/home/hero-luxury.webp" 
                alt="بيت الريف - دليل الإمارات" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4 text-center">
              <nav className="flex justify-center mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <span>دليل الإمارات</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">دليل خدمات بيت الريف الشامل</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
                استكشف خدماتنا الاحترافية في جميع إمارات الدولة. حلول متكاملة للمقاولات، الصيانة، والتصميم الداخلي بين يديك.
              </p>
            </div>
          </section>

          {/* Emirates Cards Grid */}
          <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-3">اختر الإمارة</h2>
                <p className="text-gray-600 font-medium">تغطية شاملة لجميع مناطق ومدن دولة الإمارات العربية المتحدة</p>
              </div>
              <div className="hidden md:block h-1 w-24 bg-[#D4AF37] rounded-full mb-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={`/images/seo/emirates/${emirate.slug}.webp`}
                      alt={`خدمات بيت الريف في ${emirate.nameAr}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-6 right-6 text-white">
                      <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1" dir="ltr">{emirate.nameEn}</p>
                      <h3 className="text-2xl font-black">{emirate.nameAr}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium line-clamp-3">
                      {emirate.description || `استكشف أفضل خدمات المقاولات والصيانة والديكور في ${emirate.nameAr} مع ضمان الجودة والاحترافية من بيت الريف.`}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                      <span className="text-sm font-bold text-[#0F3F1A] bg-[#F0F7F2] px-4 py-2 rounded-full">
                        {emirate.areas.length} منطقة نشطة
                      </span>
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">
                        استكشف الآن ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Specialized Sectors Section */}
          <section className="bg-[#F0F7F2] py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-4">التخصصات الرئيسية</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">نقدم حلولاً متخصصة تلبي كافة احتياجات مشاريعكم من التأسيس حتى التأثيث</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
                  <Link key={service.slug} href={`/categories/${service.slug}`} className="group bg-white rounded-2xl p-6 text-center border border-[#E6DCC8] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{service.icon}</div>
                    <h4 className="font-black text-[#0F3F1A] group-hover:text-[#B8922B] transition-colors">{service.nameAr}</h4>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .group {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

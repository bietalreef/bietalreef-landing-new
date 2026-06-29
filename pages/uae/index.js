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
      </Head>

      <div dir="rtl" className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative h-[50vh] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src="/bait-alreef-uae-smart-network-coverage.webp" alt="دليل الإمارات" fill className="object-cover opacity-30" priority />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
              <nav className="flex mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <span>دليل الإمارات</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">دليل خدمات بيت الريف الشامل</h1>
              <p className="text-xl text-white/90 max-w-3xl leading-relaxed font-medium">
                استكشف خدماتنا الاحترافية في جميع إمارات الدولة. حلول متكاملة للمقاولات، الصيانة، والتصميم الداخلي بين يديك.
              </p>
            </div>
          </section>

          {/* Emirates Grid */}
          <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="group bg-white rounded-[2rem] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={`/images/seo/emirates/${emirate.slug}.webp`} alt={emirate.nameAr} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 right-8 text-white">
                      <h3 className="text-2xl font-black">{emirate.nameAr}</h3>
                      <p className="text-[#D4AF37] text-xs font-bold uppercase mt-1" dir="ltr">{emirate.nameEn}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium line-clamp-3">
                      {emirate.description || `استكشف أفضل خدمات المقاولات والصيانة والديكور في ${emirate.nameAr} مع ضمان الجودة والاحترافية من بيت الريف.`}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <span className="text-sm font-bold text-[#0F3F1A] bg-[#F0F7F2] px-4 py-2 rounded-full">
                        {emirate.areas.length} منطقة نشطة
                      </span>
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">استكشف الآن ←</span>
                    </div>
                  </div>
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

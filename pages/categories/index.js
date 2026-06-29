import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SERVICE_CATEGORIES } from "../../data/siteTaxonomy";

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>تخصصات خدمات بيت الريف | دليل المقاولات والصيانة الشامل</title>
        <meta name="description" content="استكشف التخصصات والخدمات التي يقدمها بيت الريف: مقاولات عامة، تصميم داخلي، مواد بناء، صيانة، وأكثر بنظام عرض بصري متطور." />
        <link rel="canonical" href="https://bietalreef.ae/categories" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image 
                src="/images/seo/categories/main-sectors.webp" 
                alt="تخصصات بيت الريف" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4 text-center">
              <nav className="flex justify-center mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <span>تخصصات الخدمات</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">تخصصاتنا وخبراتنا</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
                نقدم مجموعة واسعة من الخدمات المتخصصة التي تغطي كافة مراحل البناء والتطوير والصيانة بأعلى معايير الجودة.
              </p>
            </div>
          </section>

          {/* Categories Cards Grid */}
          <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICE_CATEGORIES.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden bg-[#F0F7F2]">
                    <div className="absolute inset-0 flex items-center justify-center text-8xl transform group-hover:scale-125 transition-transform duration-700 opacity-20 grayscale">
                      {category.icon}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl transform group-hover:rotate-12 transition-transform duration-500">
                        {category.icon}
                      </div>
                    </div>
                    <div className="absolute top-6 right-6">
                      <span className="bg-[#0F3F1A] text-[#D4AF37] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {category.slug.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-[#0F3F1A] mb-4 group-hover:text-[#B8922B] transition-colors">
                      {category.nameAr}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8 font-medium h-20 overflow-hidden">
                      {category.descAr}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden">
                            <Image src={`/images/seo/home/hero-main.webp`} alt="User" width={32} height={32} className="object-cover" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#D4AF37] flex items-center justify-center text-[10px] font-bold text-white">
                          +1k
                        </div>
                      </div>
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">
                        استكشف التخصص ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="max-w-5xl mx-auto px-4 pb-24">
            <div className="relative rounded-3xl overflow-hidden bg-[#0F3F1A] p-8 md:p-16 text-center text-white">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image src="/images/seo/home/platform-features.webp" alt="Background" fill className="object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-6">هل أنت مزود خدمة محترف؟</h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto font-medium">
                  انضم إلى شبكة بيت الريف المعتمدة وابدأ في تنمية أعمالك والوصول إلى آلاف العملاء في جميع أنحاء الإمارات.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/providers" className="bg-[#D4AF37] text-[#0F3F1A] px-10 py-4 rounded-2xl font-black hover:bg-[#B8922B] transition-colors">
                    سجل كمزود خدمة
                  </Link>
                  <Link href="/about" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-colors">
                    تعرف علينا أكثر
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .group {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

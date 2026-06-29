import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../data/siteTaxonomy';

export default function Home() {
  return (
    <>
      <Head>
        <title>بيت الريف | المنصة الذكية لخدمات المقاولات والصيانة والتصميم في الإمارات</title>
        <meta name="description" content="بيت الريف هي وجهتك الأولى لخدمات البناء والصيانة والديكور في الإمارات. نجمع بين التكنولوجيا والاحترافية لتقديم تجربة فريدة لملاك العقارات ومزودي الخدمات." />
        <link rel="canonical" href="https://bietalreef.ae" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section - Pure Visual Branding */}
          <section className="relative min-h-[90vh] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/seo/home/hero-main.webp" 
                alt="بيت الريف - مستقبل البناء" 
                fill 
                className="object-cover opacity-40 scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0F3F1A] via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-3xl">
                <span className="inline-block bg-[#D4AF37] text-[#0F3F1A] px-4 py-1 rounded-full text-sm font-black mb-6 animate-fade-in">
                  المنصة الذكية الأولى في الإمارات
                </span>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  بناء، صيانة، وتصميم <br />
                  <span className="text-[#D4AF37]">بذكاء واحترافية</span>
                </h1>
                <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                  نحن نعيد تعريف تجربة خدمات العقارات من خلال حلول تقنية متكاملة تربطك بأفضل المتخصصين المعتمدين لضمان نجاح مشروعك.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/uae" className="bg-[#D4AF37] text-[#0F3F1A] px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#B8922B] transition-all transform hover:scale-105">
                    استكشف الخدمات
                  </Link>
                  <Link href="/about" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                    تعرف علينا
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Core Portals - Visual Cards */}
          <section className="py-24 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-4">بوابات بيت الريف المتخصصة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">حلول مصممة خصيصاً لتلبية احتياجات كافة أطراف قطاع البناء</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "بوابة الملاك",
                  desc: "أدوات ذكية لإدارة مشاريعك، تتبع الصيانة، والحصول على عروض أسعار دقيقة من مقاولين معتمدين.",
                  img: "/images/seo/home/platform-features.webp",
                  link: "/uae",
                  label: "ابدأ مشروعك"
                },
                {
                  title: "بوابة مزودي الخدمة",
                  desc: "نمِّ أعمالك من خلال منصة احترافية تمنحك وصولاً مباشراً لطلبات المشاريع وأدوات إدارة العملاء.",
                  img: "/images/seo/home/providers-portal.webp",
                  link: "/providers",
                  label: "انضم كشريك"
                },
                {
                  title: "سوق مواد البناء",
                  desc: "اكتشف مجموعة واسعة من مواد البناء والديكور من أفضل الموردين بأسعار تنافسية وجودة مضمونة.",
                  img: "/images/seo/home/marketplace-portal.webp",
                  link: "/categories/building-materials",
                  label: "تصفح المتجر"
                }
              ].map((portal, i) => (
                <Link key={i} href={portal.link} className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={portal.img} alt={portal.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/80 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 right-8 text-white">
                      <h3 className="text-2xl font-black">{portal.title}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-8 font-medium">{portal.desc}</p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">
                        {portal.label} ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Smart Tools Section - Professional Icons & Visuals */}
          <section className="bg-[#0F3F1A] py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <Image src="/images/seo/tools/smart-tools-grid.webp" alt="Background" fill className="object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                    أدوات ذكية <br />
                    <span className="text-[#D4AF37]">لإدارة مشاريعك باحترافية</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      { title: "المساعد الذكي 'وياك'", desc: "استشارات فورية مدعومة بالذكاء الاصطناعي لمساعدتك في اتخاذ قراراتك." },
                      { title: "نظام تحليل العروض", desc: "قارن بين عروض الأسعار والمواصفات الفنية بضغطة زر واحدة." },
                      { title: "إدارة العقود والمدفوعات", desc: "بيئة آمنة وموثقة تضمن حقوق كافة الأطراف في كل مرحلة." }
                    ].map((tool, i) => (
                      <div key={i} className="flex gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0F3F1A] font-black shrink-0 group-hover:rotate-12 transition-transform">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-white font-black text-lg mb-1">{tool.title}</h4>
                          <p className="text-white/60 text-sm font-medium">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                    <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                      <Image src="/images/seo/tools/weyaak-ai.webp" alt="Smart Tools" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Emirates Quick Navigation */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-3">خدماتنا عبر الإمارات</h2>
                  <p className="text-gray-600 font-medium">نغطي كافة أرجاء الدولة لضمان وصول الخدمة إليك أينما كنت</p>
                </div>
                <Link href="/uae" className="hidden md:block text-[#D4AF37] font-black hover:underline">مشاهدة كافة الإمارات ←</Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="group relative aspect-square rounded-2xl overflow-hidden border border-[#E6DCC8] hover:border-[#D4AF37] transition-all">
                    <Image src={`/images/seo/emirates/${emirate.slug}.webp`} alt={emirate.nameAr} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 inset-x-4 text-center">
                      <h4 className="text-white font-black text-sm">{emirate.nameAr}</h4>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}

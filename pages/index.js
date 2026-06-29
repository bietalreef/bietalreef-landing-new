import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { getAllServices } from "../lib/services-detailed";
import SEOHead from "../components/SEOHead";
import { 
  Users, 
  ShoppingBag, 
  Wrench, 
  ChevronLeft, 
  ShieldCheck,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function HomePage({ allServices }) {
  const portalSections = [
    {
      id: "providers",
      title: "دليل مزودي الخدمات",
      desc: "اعثر على أفضل المقاولين، المصممين، والحرفيين المعتمدين في جميع إمارات الدولة.",
      image: "/images/seo/home/providers-portal.webp",
      icon: <Users className="w-5 h-5" />,
      color: "bg-emerald-600",
      link: "/providers",
      features: ["مقارنة التقييمات", "عروض أسعار فورية", "تغطية شاملة"],
      keywords: "مقاولين، مصممين، حرفيين، الإمارات"
    },
    {
      id: "marketplace",
      title: "سوق مواد البناء",
      desc: "تسوق مواد البناء، التشطيب، الأثاث والديكور من أفضل الموردين بأسعار تنافسية.",
      image: "/images/seo/home/marketplace-portal.webp",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "bg-blue-600",
      link: "/marketplace",
      features: ["أثاث وديكور", "مواد تشطيب", "إضاءة ذكية"],
      keywords: "مواد بناء، تشطيب، أثاث، ديكور"
    },
    {
      id: "tools",
      title: "الأدوات الذكية",
      desc: "مجموعة من الأدوات المتقدمة لحساب التكاليف، إدارة العقود، والتصميم ثلاثي الأبعاد.",
      image: "/images/seo/home/tools-portal.webp",
      icon: <Wrench className="w-5 h-5" />,
      color: "bg-amber-500",
      link: "/tools",
      features: ["حاسبة مواد", "مقارن الأسعار", "إدارة العقود"],
      keywords: "حاسبة تكاليف، إدارة مشاريع، أدوات ذكية"
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="بيت الريف | منصة البناء والصيانة الذكية في الإمارات"
        description="بيت الريف هي المنصة الشاملة لقطاع البناء والتشطيب في الإمارات. اكتشف أفضل المقاولين، تسوق مواد البناء، واستخدم أدوات الذكاء الاصطناعي لإدارة مشروعك."
        keywords="مقاولين الإمارات، بناء فلل، تشطيبات، مواد بناء، دبي، أبوظبي، وياك AI، أدوات بناء"
      />
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* ══ بوابة المحركات الرئيسية (Visual Cards) ══ */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-6">بوابتك الرقمية لعالم البناء</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">اختر المحرك المناسب لاحتياجك وابدأ رحلتك مع بيت الريف من خلال تجربة بصرية متكاملة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portalSections.map((section) => (
              <div 
                key={section.id}
                className="group bg-white rounded-[32px] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={section.image}
                    alt={`${section.title} - بيت الريف`}
                    title={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-xs font-bold">{section.keywords}</p>
                  </div>
                  <div className={`absolute top-4 right-4 ${section.color} text-white p-3 rounded-2xl shadow-lg`}>
                    {section.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#0F3F1A] mb-4">{section.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 h-12 overflow-hidden">{section.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {section.features.map((f, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-500">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={section.link}
                    className="flex items-center justify-between w-full px-6 py-4 bg-[#FDFBF7] border border-[#E6DCC8] rounded-2xl text-[#0F3F1A] font-black text-sm group-hover:bg-[#0F3F1A] group-hover:text-white group-hover:border-[#0F3F1A] transition-all duration-300"
                  >
                    استكشف الآن
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ قسم وياك AI (Visual Refactor) ══ */}
        <section className="bg-[#0F3F1A] rounded-[48px] p-8 md:p-20 text-white mb-24 overflow-hidden relative shadow-2xl">
          {/* Decorative Background Image */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image 
              src="/images/seo/home/ai-tools.webp" 
              alt="AI Background" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold">وياك AI — وكيلك الشخصي في الإمارات</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                وكيلك الذكي <br />
                <span className="text-[#D4AF37]">في كل خطوة بناء</span>
              </h2>
              <p className="text-emerald-50/70 text-xl mb-10 leading-relaxed max-w-xl">
                لا تشغل بالك بالتفاصيل التقنية، وياك يفهم احتياجاتك، يقارن بين الموردين، ويقترح عليك الحلول الأمثل لميزانيتك وجدولك الزمني في دبي وأبوظبي وكافة الإمارات.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/weyaak" className="px-10 py-5 bg-[#D4AF37] text-white rounded-2xl font-black shadow-xl hover:bg-[#b8922b] transition-all transform hover:scale-105">
                  تحدث مع وياك الآن
                </Link>
                <Link href="/platform" className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all">
                  اكتشف المنظومة
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[32px] p-10 border border-white/10 backdrop-blur-md shadow-3xl">
                <div className="space-y-6">
                  {[
                    { q: "احسب لي كمية الرخام المطلوبة لفيلا 400 متر", type: "user" },
                    { q: "من هم أفضل مقاولي التكييف المعتمدين في أبوظبي؟", type: "ai" },
                    { q: "قارن لي بين أسعار حديد الإمارات والحديد العماني اليوم", type: "user" }
                  ].map((msg, i) => (
                    <div key={i} className={`p-5 rounded-2xl text-sm font-bold shadow-sm transition-all hover:scale-102 ${msg.type === 'ai' ? 'bg-[#D4AF37] text-white mr-12' : 'bg-white/10 text-emerald-50 ml-12'}`}>
                      {msg.q}
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* ══ الخدمات الشائعة (Visual Cards Refactor) ══ */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-2">الخدمات الأكثر طلباً</h2>
              <p className="text-gray-500 text-sm">تصفح التخصصات الرائدة التي يفضلها عملاؤنا في الإمارات</p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E6DCC8] rounded-xl text-sm font-black text-[#0F3F1A] hover:bg-[#0F3F1A] hover:text-white transition-all">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'general-contracting', title: 'المقاولات العامة', image: '/images/seo/categories/general-contracting.jpg', desc: 'بناء وتشييد الفلل والمباني' },
              { id: 'interior-design', title: 'التصميم الداخلي', image: '/images/seo/categories/interior-design.webp', desc: 'ديكورات وتصاميم عصرية' },
              { id: 'building-materials', title: 'مواد البناء', image: '/images/seo/categories/building-materials.webp', desc: 'توريد أجود الخامات والتشطيبات' },
              { id: 'general-maintenance', title: 'الصيانة العامة', image: '/images/seo/home/benefits.webp', desc: 'حلول صيانة متكاملة للمباني' }
            ].map((service) => (
              <Link 
                key={service.id} 
                href={`/categories/${service.id}`} 
                className="group bg-white rounded-3xl overflow-hidden border border-[#E6DCC8] hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-48">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-[#0F3F1A] text-lg mb-1">{service.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{service.desc}</p>
                  <div className="text-[#D4AF37] font-bold text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    عرض التفاصيل <ChevronLeft className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ أرقام وحقائق (Visual Refactor) ══ */}
        <section className="bg-white rounded-[40px] border border-[#E6DCC8] p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "أداة ذكاء اصطناعي", value: "47", color: "text-emerald-600" },
              { label: "مزود خدمة معتمد", value: "1,200+", color: "text-blue-600" },
              { label: "مشروع مكتمل", value: "5,000+", color: "text-[#D4AF37]" },
              { label: "إمارات الدولة", value: "7", color: "text-red-600" }
            ].map((stat, i) => (
              <div key={i} className="text-center relative">
                {i < 3 && <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gray-100"></div>}
                <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-3 tracking-tight`}>{stat.value}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allServices = getAllServices();
  return {
    props: {
      allServices,
    },
    revalidate: 3600,
  };
}

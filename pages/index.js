import Head from "next/head";
import Link from "next/link";
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
  MapPin, 
  Search, 
  ArrowLeft,
  Star,
  Zap,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";

export default function HomePage({ allServices }) {
  const [activeTab, setActiveTab] = useState('providers');

  const portalSections = {
    providers: {
      title: "دليل مزودي الخدمات",
      desc: "اعثر على أفضل المقاولين، المصممين، والحرفيين المعتمدين في جميع إمارات الدولة.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-emerald-600",
      link: "/providers",
      features: ["مقارنة التقييمات", "عروض أسعار فورية", "تغطية شاملة للإمارات"]
    },
    marketplace: {
      title: "سوق مواد البناء",
      desc: "تسوق مواد البناء، التشطيب، الأثاث والديكور من أفضل الموردين بأسعار تنافسية.",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-blue-600",
      link: "/marketplace",
      features: ["أثاث وديكور", "مواد تشطيب", "إضاءة وأنظمة ذكية"]
    },
    tools: {
      title: "الأدوات الذكية",
      desc: "مجموعة من الأدوات المتقدمة لحساب التكاليف، إدارة العقود، والتصميم ثلاثي الأبعاد.",
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-amber-500",
      link: "/tools",
      features: ["حاسبة مواد البناء", "مقارن الأسعار", "إدارة العقود"]
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="بيت الريف | منصة البناء والصيانة الذكية في الإمارات"
        description="بيت الريف هي المنصة الشاملة لقطاع البناء والتشطيب في الإمارات. اكتشف أفضل المقاولين، تسوق مواد البناء، واستخدم أدوات الذكاء الاصطناعي لإدارة مشروعك."
        keywords="مقاولين الإمارات، بناء فلل، تشطيبات، مواد بناء، دبي، أبوظبي، وياك AI، أدوات بناء"
      />
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* ══ بوابة المحركات الرئيسية ══ */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-4">بوابتك الرقمية لعالم البناء</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">اختر المحرك المناسب لاحتياجك وابدأ رحلتك مع بيت الريف</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(portalSections).map(([key, section]) => (
              <div 
                key={key}
                className="group bg-white rounded-3xl border border-[#E6DCC8] p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`${section.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {section.icon}
                </div>
                <h3 className="text-xl font-black text-[#0F3F1A] mb-3">{section.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{section.desc}</p>
                <ul className="space-y-2 mb-8">
                  {section.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={section.link}
                  className="inline-flex items-center gap-2 text-[#0F3F1A] font-black text-sm group-hover:gap-4 transition-all"
                >
                  استكشف الآن <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ══ قسم وياك AI ══ */}
        <section className="bg-[#0F3F1A] rounded-[40px] p-8 md:p-16 text-white mb-20 overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold">وياك AI متوفر الآن</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                وكيلك الذكي <br />
                <span className="text-emerald-400">في كل خطوة بناء</span>
              </h2>
              <p className="text-emerald-50/70 text-lg mb-8 leading-relaxed">
                لا تشغل بالك بالتفاصيل التقنية، وياك يفهم احتياجاتك، يقارن بين الموردين، ويقترح عليك الحلول الأمثل لميزانيتك وجدولك الزمني.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/weyaak" className="px-8 py-4 bg-white text-[#0F3F1A] rounded-2xl font-black shadow-lg hover:bg-emerald-50 transition-colors">
                  تحدث مع وياك
                </Link>
                <Link href="/platform" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-colors">
                  اكتشف المنظومة
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  {[
                    "احسب لي كمية الرخام المطلوبة لفيلا 400 متر",
                    "من هم أفضل مقاولي التكييف في أبوظبي؟",
                    "قارن لي بين أسعار حديد الإمارات والحديد العماني"
                  ].map((msg, i) => (
                    <div key={i} className={`p-4 rounded-2xl text-sm font-bold ${i === 1 ? 'bg-emerald-500 text-white mr-8' : 'bg-white/10 text-emerald-50 ml-8'}`}>
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ الخدمات الشائعة ══ */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A]">الخدمات الأكثر طلباً</h2>
            <Link href="/services" className="text-sm font-bold text-emerald-600 hover:underline">عرض الكل</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allServices.slice(0, 4).map((service) => (
              <Link key={service.id} href={service.id === 'building-materials' ? '/building-materials-uae' : service.id === 'construction' ? '/categories/general-contracting' : service.id === 'maintenance' ? '/categories/general-maintenance' : service.id === 'craftsmen' ? '/categories/carpentry' : `/categories/${service.id}`} className="group bg-white p-6 rounded-3xl border border-[#E6DCC8] hover:border-emerald-500 transition-all text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.id === 'contractors' ? '🏗️' : service.id === 'interior-design' ? '🎨' : service.id === 'building-materials' ? '🧱' : '🛠️'}
                </div>
                <h3 className="font-black text-[#0F3F1A] text-sm mb-1">{service.title}</h3>
                <p className="text-[10px] text-gray-500">{service.shortDesc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ أرقام وحقائق ══ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-[#E6DCC8]">
          {[
            { label: "أداة ذكاء اصطناعي", value: "47" },
            { label: "مزود خدمة معتمد", value: "1,200+" },
            { label: "مشروع مكتمل", value: "5,000+" },
            { label: "إمارات الدولة", value: "7" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-2">{stat.value}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
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

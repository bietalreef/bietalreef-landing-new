import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ShoppingBag, Search, Star, Zap, ArrowLeft, ChevronLeft } from 'lucide-react';

const categories = [
  { id: 'building-materials', title: 'مواد البناء الأساسية', desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.', icon: '🏗️' },
  { id: 'finishing-works', title: 'مواد التشطيب والديكور', desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.', icon: '✨' },
  { id: 'smart-systems', title: 'الإنارة والأنظمة الذكية', desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.', icon: '💡' },
  { id: 'furniture-decor', title: 'الأثاث والمفروشات', desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.', icon: '🛋️' }
];

const faq = [
  { q: "كيف يمكنني الشراء من سوق بيت الريف؟", a: "يمكنك تصفح المنتجات عبر المنصة، اختيار المورد المناسب، وطلب عرض سعر مباشر أو الشراء الفوري للمنتجات المتاحة." },
  { q: "هل يتوفر توصيل لجميع إمارات الدولة؟", a: "نعم، شبكة موردينا تغطي جميع الإمارات (دبي، أبوظبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، أم القيوين)." },
  { q: "هل المنتجات مضمونة؟", a: "جميع الموردين في بيت الريف معتمدون ويخضعون لنظام تقييم صارم لضمان جودة المنتجات والخدمات المقدمة." }
];

export default function MarketplacePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    "name": "سوق بيت الريف للمواد والمنتجات",
    "description": "أكبر سوق رقمي لمواد البناء والتشطيب والأثاث في الإمارات.",
    "url": "https://bietalreef.ae/marketplace",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE"
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="سوق بيت الريف | مواد البناء والتشطيب والأثاث في الإمارات"
        description="تسوق أفضل مواد البناء، الرخام، السيراميك، والأثاث من موردين معتمدين. سوق بيت الريف يوفر لك الجودة والأسعار التنافسية في مكان واحد."
        keywords="سوق مواد البناء، رخام دبي، سيراميك أبوظبي، أثاث الإمارات، تشطيبات فلل"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 text-[#D4AF37] font-bold text-sm">
            <ShoppingBag className="w-4 h-4" />
            سوق المقاولات والمنتجات
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
            تجربة تسوق <span className="text-[#D4AF37]">ذكية ومتكاملة</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            من الأساسات وحتى اللمسات الأخيرة، نجمع لك أفضل الموردين في الإمارات لتوفير كل ما يحتاجه مشروعك من مواد ومنتجات بجودة عالية.
          </p>
        </header>

        {/* Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-lg font-black text-[#0F3F1A] mb-3">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.desc}</p>
              <Link href={`/categories/${cat.id}`} className="text-[#D4AF37] font-bold text-sm flex items-center gap-2">
                تصفح المنتجات <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="bg-white rounded-[40px] border border-[#E6DCC8] p-8 md:p-16 mb-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[#0F3F1A] mb-3">بحث ومقارنة</h3>
              <p className="text-gray-500 text-sm">قارن بين مئات المنتجات والموردين بضغطة زر واحدة.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[#0F3F1A] mb-3">تقييمات حقيقية</h3>
              <p className="text-gray-500 text-sm">اطلع على تجارب العملاء السابقين قبل اتخاذ قرار الشراء.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-black text-[#0F3F1A] mb-3">عروض فورية</h3>
              <p className="text-gray-500 text-sm">احصل على عروض أسعار مخصصة لمشاريع الجملة والكميات الكبيرة.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section (AEO) */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">الأسئلة الشائعة حول السوق</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-6">
                <h3 className="font-black text-[#0F3F1A] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-[#0F3F1A] to-[#1a5c28] rounded-[40px] p-12 text-white">
          <h2 className="text-3xl font-black mb-6">جاهز لبدء التسوق؟</h2>
          <p className="text-emerald-50/70 mb-10 max-w-xl mx-auto">انضم إلى آلاف العملاء الذين وثقوا ببيت الريف لتوفير مواد مشاريعهم بأفضل جودة وسعر.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/uae" className="px-10 py-4 bg-[#D4AF37] text-white rounded-2xl font-black shadow-lg hover:bg-[#b8922b] transition-all">
              استعرض الموردين في مدينتك
            </Link>
            <a href="https://wa.me/971567856001" className="px-10 py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all">
              تواصل مع المبيعات
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

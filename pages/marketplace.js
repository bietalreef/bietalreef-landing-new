import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ShoppingBag, Search, Star, Zap, ChevronLeft } from 'lucide-react';

const categories = [
  { id: 'building-materials', title: 'مواد البناء الأساسية', desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.', icon: '🏗️' },
  { id: 'finishing-works', title: 'مواد التشطيب والديكور', desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.', icon: '✨' },
  { id: 'smart-systems', title: 'الإنارة والأنظمة الذكية', desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.', icon: '💡' },
  { id: 'furniture-decor', title: 'الأثاث والمفروشات', desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.', icon: '🛋️' }
];

const faq = [
  { q: 'هل قسم المنتجات والمتاجر هو نفسه الخدمات؟', a: 'لا. المنتجات والمتاجر مخصص للمواد والمنتجات والموردين، أما الخدمات والعروض فهي للأعمال والخدمات التنفيذية.' },
  { q: 'هل المنتجات لها أسعار ثابتة؟', a: 'لا يتم عرض أسعار غير معتمدة. يمكن طلب عرض سعر حسب الكمية، النوع، وموقع التوريد.' },
  { q: 'هل يمكن التوريد لجميع الإمارات؟', a: 'يعتمد ذلك على المورد، وسيتم توضيح مناطق التوريد عند اعتماد بيانات المنتجات والمتاجر.' }
];

export { categories as marketplaceCategories };

export default function MarketplacePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'المنتجات والمتاجر في بيت الريف',
    description: 'قسم مستقل للمنتجات والمتاجر ومواد البناء والتشطيب داخل بيت الريف.',
    url: 'https://bietalreef.ae/marketplace'
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="المنتجات والمتاجر | مواد البناء والتشطيب والأثاث في الإمارات"
        description="قسم المنتجات والمتاجر في بيت الريف: مواد بناء، تشطيبات، أنظمة ذكية، وأثاث. مسار مستقل عن الخدمات ودليل الإمارات."
        keywords="منتجات بناء, مواد بناء, متاجر تشطيب, موردين, رخام, سيراميك, أثاث"
        structuredData={structuredData}
      />
      <Navbar pageTitle="المنتجات والمتاجر" />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 text-[#D4AF37] font-bold text-sm">
            <ShoppingBag className="w-4 h-4" />
            قسم المنتجات والمتاجر
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
            منتجات ومتاجر <span className="text-[#D4AF37]">بيت الريف</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            هذا القسم مخصص للمواد والمنتجات والمتاجر والموردين. إذا كنت تبحث عن خدمة تنفيذية فاذهب إلى الخدمات والعروض، وإذا كنت تبحث حسب المدينة فابدأ من دليل الإمارات.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-lg font-black text-[#0F3F1A] mb-3">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.desc}</p>
              <Link href={`/marketplace/${cat.id}`} className="text-[#D4AF37] font-bold text-sm flex items-center gap-2">
                تصفح المنتجات <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[40px] border border-[#E6DCC8] p-8 md:p-16 mb-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center"><div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6"><Search className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">بحث ومقارنة</h3><p className="text-gray-500 text-sm">تصفح فئات المنتجات بشكل مستقل ومنظم.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6"><Star className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">موردون ومتاجر</h3><p className="text-gray-500 text-sm">ربط المنتجات بالموردين والمتاجر عند اعتماد البيانات.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6"><Zap className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">طلب عرض سعر</h3><p className="text-gray-500 text-sm">اطلب سعرًا حسب الكمية والنوع وموقع المشروع.</p></div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">الأسئلة الشائعة حول المنتجات والمتاجر</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-6">
                <h3 className="font-black text-[#0F3F1A] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-br from-[#0F3F1A] to-[#1a5c28] rounded-[40px] p-12 text-white">
          <h2 className="text-3xl font-black mb-6">تحتاج منتجًا أو مادة لمشروعك؟</h2>
          <p className="text-emerald-50/70 mb-10 max-w-xl mx-auto">أرسل نوع المنتج والكمية والموقع للحصول على توجيه مناسب.</p>
          <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-[#D4AF37] text-[#0F3F1A] rounded-2xl font-black shadow-lg hover:bg-[#b8922b] transition-all">
            تواصل مع بيت الريف
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

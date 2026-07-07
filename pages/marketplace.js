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

        <section className="mb-20" aria-label="منتج مميز من مصنع الحوت">
          <div className="mb-6 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]">منتج مميز</span>
            <h2 className="mt-4 text-2xl md:text-3xl font-black text-[#0F3F1A]">كارت منتج من مصنع الحوت</h2>
            <p className="mt-3 text-gray-600 leading-8">عرض منتج قابل للتوريد والتصنيع حسب المقاس من مصنع الحوت الأبيض للرخام والجرانيت.</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-2xl shadow-[#8A6A00]/10">
            <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
              <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#F7F1E8_0%,#E9DDC7_42%,#B8922B_100%)] p-8 md:p-10">
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_0%,#ffffff_35%,transparent_72%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-[#0F3F1A] px-4 py-1.5 text-xs font-black text-white">متوفر حسب الطلب</span>
                    <h3 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-[#0F3F1A]">كوارتز مطابخ فاخر</h3>
                    <p className="mt-4 text-sm font-bold text-[#6F5400]">أسطح مطابخ · كونترات · جزر مطابخ</p>
                  </div>
                  <div className="mt-8 rounded-3xl border border-white/60 bg-white/45 p-5 shadow-inner">
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-white via-[#EFE7D8] to-[#CDBB98] border border-white/70" />
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">كوارتز</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">تشطيب فاخر</span>
                  <span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">مصنع الحوت</span>
                </div>
                <h3 className="mt-5 text-2xl font-black text-[#0F3F1A]">كوارتز مطابخ فاخر حسب المقاس</h3>
                <p className="mt-4 text-base font-semibold leading-8 text-gray-700">منتج مناسب لأسطح المطابخ والكونترات وجزر المطابخ، يتم توريده وتصنيعه وتركيبه حسب مقاسات المشروع واختيار اللون والتشطيب.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {['مقاوم وسهل التنظيف', 'تصنيع حسب الطلب', 'توريد وتركيب'].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">عرض المنتج</Link>
                  <a href="https://wa.me/971506623518" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">طلب سعر واتساب</a>
                </div>
              </div>
            </div>
          </div>
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

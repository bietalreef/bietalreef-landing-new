import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ArrowRight, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronLeft } from 'lucide-react';

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
      
      <main className="-mt-[1px]">
        <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
          <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
            <Image
              src="/images/materials-products-hero.webp"
              alt="مواد البناء والمنتجات والمتاجر داخل بيت الريف"
              fill
              priority
              className="scale-[1.08] object-cover object-[70%_42%] -translate-y-[3%] md:scale-105 md:object-[70%_45%] md:-translate-y-[2%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/16 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/82 via-[#FDFBF7]/38 to-transparent md:from-[#FDFBF7]/78 md:via-[#FDFBF7]/26" />

            <Link href="/" className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              العودة إلى الرئيسية
            </Link>

            <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
              <div className="w-full max-w-[600px] md:ml-0 md:mr-auto">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                  <ShoppingBag className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                  بوابة المنتجات والمتاجر
                </div>

                <h1 className="max-w-[560px] text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] md:text-6xl">
                  مواد ومنتجات لمشروعك<br />من موردين ومتاجر أوضح
                </h1>

                <div className="mt-5 rounded-[2.1rem] border border-white/70 bg-white/66 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                  <p className="text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                    هذا القسم مخصص للمواد والمنتجات والمتاجر والموردين. ابدأ من نوع المنتج أو المادة، ثم اطلب سعرًا حسب الكمية، المواصفات، وموقع المشروع.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="#marketplace-categories" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <Search className="h-5 w-5" aria-hidden="true" />
                      </span>
                      تصفح المنتجات الآن
                    </Link>
                    <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      </span>
                      اطلب مساعدة في التوريد
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
          </div>

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
        </section>
      </main>
      <Footer />
    </div>
  );
}
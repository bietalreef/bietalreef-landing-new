import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ProductsSmartFooter from '../components/ProductsSmartFooter';
import DiscoveryDirectoryHero from '../components/DiscoveryDirectoryHero';
import SectionBackBar from '../components/SectionBackBar';
import ConstitutionalSectionCards from '../components/ConstitutionalSectionCards';
import { getUaeSectionCards } from '../lib/platformDirectoryCards';
import { buildCardWhatsappUrl } from '../lib/providerWhatsapp';
import { ArrowRight, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronLeft, Sparkles } from 'lucide-react';

const WHITE_WHALE_QUARTZ_WHATSAPP = buildCardWhatsappUrl({
  phone: '971506623518',
  locale: 'ar',
  cardType: 'product',
  providerName: 'مصنع الحوت الأبيض للرخام والجرانيت',
  providerCode: 'BR-PROV-HOT-001',
  title: 'كوارتز مطابخ فاخر حسب الطلب',
  description: 'توريد وتصنيع وتركيب أسطح المطابخ والكونترات والجزر حسب المقاسات واللون والتشطيب.',
  category: 'كوارتز · أسطح مطابخ · كونترات',
  price: 'السعر حسب المقاسات والمواصفات',
  pricingModel: 'متوفر حسب الطلب',
  location: 'العين · أبوظبي',
  pagePath: '/marketplace',
});

const categories = [
  {
    id: 'building-materials',
    title: 'مواد البناء الأساسية',
    desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.',
    icon: '🏗️',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    badge: 'مواد أساسية',
  },
  {
    id: 'finishing-works',
    title: 'مواد التشطيب والديكور',
    desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.',
    icon: '✨',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    badge: 'تشطيبات',
  },
  {
    id: 'smart-systems',
    title: 'الإنارة والأنظمة الذكية',
    desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.',
    icon: '💡',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    badge: 'أنظمة ذكية',
  },
  {
    id: 'furniture-decor',
    title: 'الأثاث والمفروشات',
    desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.',
    icon: '🛋️',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    badge: 'أثاث وديكور',
  },
];

const faq = [
  { q: 'هل قسم المنتجات والمتاجر هو نفسه الخدمات؟', a: 'لا. المنتجات والمتاجر مخصص للمواد والمنتجات والموردين، أما الخدمات والعروض فهي للأعمال والخدمات التنفيذية.' },
  { q: 'هل المنتجات لها أسعار ثابتة؟', a: 'لا يتم عرض أسعار غير معتمدة. يمكن طلب عرض سعر حسب الكمية، النوع، وموقع التوريد.' },
  { q: 'هل يمكن التوريد لجميع الإمارات؟', a: 'يعتمد ذلك على المورد، وسيتم توضيح مناطق التوريد عند اعتماد بيانات المنتجات والمتاجر.' },
];

export { categories as marketplaceCategories };

export default function MarketplacePage({ directoryCards }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'المنتجات والمتاجر في بيت الريف',
    description: 'قسم مستقل للمنتجات والمتاجر ومواد البناء والتشطيب داخل بيت الريف.',
    url: 'https://bietalreef.ae/marketplace',
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead
        title="المنتجات والمتاجر | مواد البناء والتشطيب والأثاث في الإمارات"
        description="قسم المنتجات والمتاجر في بيت الريف: مواد بناء، تشطيبات، أنظمة ذكية، وأثاث. مسار مستقل عن الخدمات ودليل الإمارات."
        keywords="منتجات بناء, مواد بناء, متاجر تشطيب, موردين, رخام, سيراميك, أثاث"
        canonicalPath="/marketplace"
        ogImage="https://bietalreef.ae/images/materials-products-hero.webp"
        structuredData={structuredData}
      />
      <Navbar pageTitle="المنتجات والمتاجر" />
      <SectionBackBar />

      <main className="-mt-[1px] [&>section:nth-of-type(2)]:hidden">
        <DiscoveryDirectoryHero type="products" locale="ar" />
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

        <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-8 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">فئات المنتجات</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">اختر نوع المادة أو المنتج</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">كروت المنتجات أصبحت بنفس أسلوب باقي الأقسام: صورة واضحة، محتوى مختصر، ومسار مباشر للطلب أو التصفح.</p>
          </div>

          <div className="mb-20">
            <ConstitutionalSectionCards cards={directoryCards} sectionKey="products_stores" locale="ar" />
          </div>

          {false && <section className="mb-20" aria-label="منتج مميز من مصنع الحوت">
            <div className="mb-6 text-center md:text-right">
              <span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]">منتج مميز</span>
              <h2 className="mt-4 text-2xl font-black text-[#0F3F1A] md:text-3xl">كارت منتج من مصنع الحوت</h2>
              <p className="mt-3 leading-8 text-gray-600">عرض منتج قابل للتوريد والتصنيع حسب المقاس من مصنع الحوت الأبيض للرخام والجرانيت.</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-2xl shadow-[#8A6A00]/10">
              <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
                <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#F7F1E8_0%,#E9DDC7_42%,#B8922B_100%)] p-8 md:p-10">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#ffffff_35%,transparent_72%)] opacity-30" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div><span className="inline-flex rounded-full bg-[#0F3F1A] px-4 py-1.5 text-xs font-black text-white">متوفر حسب الطلب</span><h3 className="mt-5 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">كوارتز مطابخ فاخر</h3><p className="mt-4 text-sm font-bold text-[#6F5400]">أسطح مطابخ · كونترات · جزر مطابخ</p></div>
                    <div className="mt-8 rounded-3xl border border-white/60 bg-white/45 p-5 shadow-inner"><div className="h-24 rounded-2xl border border-white/70 bg-gradient-to-br from-white via-[#EFE7D8] to-[#CDBB98]" /></div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">كوارتز</span><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">تشطيب فاخر</span><span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">مصنع الحوت</span></div>
                  <h3 className="mt-5 text-2xl font-black text-[#0F3F1A]">كوارتز مطابخ فاخر حسب المقاس</h3>
                  <p className="mt-4 text-base font-semibold leading-8 text-gray-700">منتج مناسب لأسطح المطابخ والكونترات وجزر المطابخ، قابل للتوريد والتصنيع والتركيب حسب المقاسات ومتطلبات المشروع.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">{['سهل التنظيف', 'تصنيع حسب المقاس', 'توريد وتركيب'].map((item) => <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>)}</div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">عرض المنتج</Link><a href={WHITE_WHALE_QUARTZ_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">طلب سعر واتساب</a></div>
                </div>
              </div>
            </div>
          </section>}

          <section className="mb-20 rounded-[40px] border border-[#E6DCC8] bg-white p-8 md:p-16"><div className="grid gap-12 md:grid-cols-3"><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Search className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">بحث ومقارنة</h3><p className="text-sm text-gray-500">تصفح فئات المنتجات بشكل مستقل ومنظم.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Star className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">موردون ومتاجر</h3><p className="text-sm text-gray-500">ربط المنتجات بالموردين والمتاجر عند اعتماد البيانات.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Zap className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">طلب عرض سعر</h3><p className="text-sm text-gray-500">اطلب سعرًا حسب الكمية والنوع وموقع المشروع.</p></div></div></section>

          <section className="mx-auto mb-20 max-w-3xl"><h2 className="mb-10 text-center text-2xl font-black text-[#0F3F1A]">الأسئلة الشائعة حول المنتجات والمتاجر</h2><div className="space-y-4">{faq.map((item, i) => <div key={i} className="rounded-2xl border border-[#E6DCC8] bg-white p-6"><h3 className="mb-2 font-black text-[#0F3F1A]">{item.q}</h3><p className="text-sm leading-relaxed text-gray-600">{item.a}</p></div>)}</div></section>

          <section className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 text-center shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:p-12"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">تحتاج منتجًا أو مادة لمشروعك؟</h2><p className="mx-auto mb-8 max-w-xl font-semibold leading-8 text-gray-600">أرسل نوع المنتج والكمية والمواصفات وموقع التوريد للحصول على توجيه مناسب.</p><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0F3F1A] px-8 py-3 font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">تواصل مع بيت الريف</a></section>
        </section>
        <ProductsSmartFooter locale="ar" directoryCards={directoryCards} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const directoryCards = await getUaeSectionCards('ar', 'products_stores');
  return { props: { directoryCards }, revalidate: 300 };
}

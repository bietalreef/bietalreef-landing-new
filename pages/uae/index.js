import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../data/uaeAtlasImages';
import { ArrowLeft, ChevronDown, ChevronUp, MapPinned, Search } from 'lucide-react';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item]));

const experienceBySlug = {
  'abu-dhabi': 'مسار منظم للمشاريع السكنية والتجارية في العاصمة، من الطلب الأول حتى اختيار الخدمة المناسبة.',
  dubai: 'واجهة سريعة للبحث عن خدمات البناء والتشطيب في بيئة عمرانية نشطة ومتنوعة.',
  sharjah: 'اختيار عملي للمشاريع التي تجمع بين البناء، الحرف، التشطيب والديكور بأسلوب واضح.',
  ajman: 'مدخل واضح للخدمات السكنية والتجارية من الصيانة السريعة إلى أعمال الديكور والتجهيز.',
  'ras-al-khaimah': 'رحلة بحث مناسبة للمشاريع المرتبطة بالمواد، المقاولات، الصيانة والديكور.',
  fujairah: 'اكتشاف خدمات البناء والتصميم والصيانة في الساحل الشرقي بأسلوب مختصر ومباشر.',
  'umm-al-quwain': 'تجربة بسيطة للمشاريع الصغيرة والمتوسطة التي تحتاج مقاولًا أو صيانة أو مواد أو أثاث.',
};

export default function UAEDirectoryHome() {
  const [openSlug, setOpenSlug] = useState(null);

  const pageData = {
    h1: 'دليل الإمارات',
    desc: 'ابدأ رحلتك لاكتشاف الخدمات والفرص في مختلف إمارات الدولة.',
    seoTitle: 'دليل الإمارات لخدمات البناء والتصميم والصيانة | بيت الريف',
    seoDesc: 'دليل الإمارات من بيت الريف يساعدك على بدء طلبك حسب الإمارة والخدمة في المقاولات، الصيانة، التصميم الداخلي، الديكور ومواد البناء داخل الإمارات.',
  };

  const faqItems = [
    ['كيف أستخدم دليل الإمارات؟', 'ابدأ باختيار الإمارة، ثم المدينة أو المنطقة، وبعدها اختر نوع الخدمة مثل المقاولات أو النجارة أو الرخام أو الصيانة.'],
    ['هل يبدأ الدليل بالمكان أم بالخدمة؟', 'دليل الإمارات في بيت الريف يبدأ بالمكان أولًا حتى تكون رحلة البحث أوضح: الإمارة ثم المدينة ثم الخدمة.'],
    ['هل يمكنني طلب عرض سعر من الدليل؟', 'نعم، يمكنك استخدام زر طلب عرض سعر أو سؤال المساعد الذكي وياك لتوجيه طلبك للمسار المناسب.'],
  ];

  const emirateCards = UAE_EMIRATES.map((emirate) => ({
    ...emirate,
    atlasImage: atlasImageBySlug[emirate.slug]?.image,
    atlasThumb: atlasImageBySlug[emirate.slug]?.thumb,
    experience: experienceBySlug[emirate.slug] || emirate.description,
  }));

  return (
    <>
      <Head>
        <title>{pageData.seoTitle}</title>
        <meta name="description" content={pageData.seoDesc} />
        <link rel="canonical" href="https://bietalreef.ae/uae" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle="دليل الإمارات" />
        <main>
          <section className="relative isolate overflow-hidden bg-[#21170F] px-4 pb-10 pt-4 text-white md:pb-16 md:pt-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#715436_0%,#21170F_45%,#070503_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/75 to-transparent" />

            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mx-auto overflow-hidden rounded-[2.25rem] border border-[#D4AF37]/25 bg-black/20 p-2 shadow-2xl shadow-black/30 backdrop-blur md:rounded-[3rem] md:p-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem] bg-[#071A2F] md:aspect-[16/7] md:rounded-[2.35rem]">
                  <Image src={UAE_ATLAS_IMAGES.heroMobile} alt="دليل الإمارات من بيت الريف" fill priority className="object-cover object-center md:hidden" sizes="100vw" />
                  <Image src={UAE_ATLAS_IMAGES.heroDesktop} alt="خريطة رقمية لدليل الإمارات وخدمات بيت الريف" fill priority className="hidden object-cover object-center md:block" sizes="(max-width: 1200px) 100vw, 1120px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/70 via-transparent to-transparent" />
                </div>
              </div>

              <div className="relative mx-auto -mt-6 max-w-4xl rounded-[2rem] border border-[#D4AF37]/25 bg-[#090806]/82 px-5 py-7 text-center shadow-2xl shadow-black/25 backdrop-blur-xl md:-mt-10 md:rounded-[2.5rem] md:px-12 md:py-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold text-[#D4AF37]"><MapPinned size={15} /> ابدأ من المكان</span>
                <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{pageData.h1}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-white/86 md:text-xl">{pageData.desc}</p>
                <a href="#uae-emirates" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-black text-[#21170F] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E7C45A]">
                  استكشف الآن <ChevronDown size={18} className="animate-bounce" />
                </a>
              </div>
            </div>
          </section>

          <section id="uae-emirates" className="scroll-mt-24 bg-[#FDFBF7] px-4 py-14 md:py-18">
            <div className="mx-auto max-w-6xl">
              <div className="mb-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A]/8 px-4 py-1 text-xs font-black text-[#0F3F1A]"><Search size={14} /> اختر الإمارة</span>
                <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">استكشف خدمات بيت الريف حسب الإمارة</h2>
                <p className="mx-auto mt-3 max-w-3xl text-gray-600 leading-8">واجهة مصممة لتبدأ من المكان، ثم تحدد الخدمة، ثم تنتقل إلى طلب واضح يساعدك على الوصول للحل المناسب بدون تشتت.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {emirateCards.map((emirate, index) => {
                  const isOpen = openSlug === emirate.slug;
                  return (
                    <article key={emirate.slug} className="group overflow-hidden rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-2 shadow-xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:shadow-2xl">
                      <div className="relative overflow-hidden rounded-[1.65rem] border border-[#D4AF37]/30 bg-[#071A2F] p-1 shadow-inner">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem]">
                          <Image src={emirate.atlasImage || emirate.atlasThumb} alt={`صورة دليل خدمات ${emirate.nameAr} في بيت الريف`} fill priority={index < 3} className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" />
                        </div>
                      </div>

                      <div className="px-3 pb-4 pt-5 md:px-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black text-[#D4AF37]">إمارة</p>
                            <h3 className="mt-1 text-3xl font-black text-[#0F3F1A]">{emirate.nameAr}</h3>
                          </div>
                          <button type="button" onClick={() => setOpenSlug(isOpen ? null : emirate.slug)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4D6BA] bg-[#FDFBF7] text-[#0F3F1A] shadow-sm transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#21170F]" aria-expanded={isOpen} aria-label={isOpen ? `إغلاق تفاصيل ${emirate.nameAr}` : `فتح تفاصيل ${emirate.nameAr}`}>
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>

                        <p className={`mt-3 text-sm font-semibold leading-7 text-gray-600 transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-7 overflow-hidden'}`}>{isOpen ? `${emirate.experience} ${emirate.description}` : emirate.experience}</p>

                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F0E7D6] pt-4">
                          <button type="button" onClick={() => setOpenSlug(isOpen ? null : emirate.slug)} className="inline-flex items-center gap-2 text-xs font-black text-gray-500 transition hover:text-[#0F3F1A]">
                            {isOpen ? 'إخفاء التفاصيل' : 'عرض التفاصيل'} {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <Link href={`/uae/${emirate.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A] px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#21170F]" aria-label={`اكتشف خدمات ${emirate.nameAr}`}>
                            <Search size={15} /> اكتشف الآن <ArrowLeft size={15} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-[#FDFBF7] px-4 pb-12">
            <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white/88 p-5 shadow-sm md:p-7">
              <h2 className="text-2xl font-black text-[#0F3F1A]">خدمات شائعة داخل الدليل</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {SERVICE_CATEGORIES.slice(0, 10).map((service) => (
                  <Link key={service.slug} href="/uae" className="rounded-full bg-[#FDFBF7] border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">{service.icon} {service.nameAr}</Link>
                ))}
              </div>
            </div>
          </section>

          <ClientRequestCard title="تبحث عن مزود خدمة في الإمارات؟" desc="اسأل وياك أو أرسل طلبك وسنرشدك إلى المسار الصحيح حسب الإمارة والمدينة ونوع الخدمة." buttonText="ابدأ طلبك الآن" />

          <SeoContent title="كيف يخدم دليل الإمارات أصحاب المشاريع؟">
            <p>يعتمد دليل الإمارات في بيت الريف على ترتيب جغرافي واضح يبدأ من الإمارة ثم المدينة أو المنطقة ثم نوع الخدمة. هذا يساعد صاحب المشروع على الوصول إلى مزودي الخدمات الأقرب والأكثر صلة دون تشتيت.</p>
            <p className="mt-4">بعد اختيار الإمارة يمكنك تصفح المناطق المتاحة، ثم اختيار تخصص مثل المقاولات العامة، النجارة، الرخام والسيراميك، التصميم الداخلي أو الصيانة العامة.</p>
          </SeoContent>

          <FAQ items={faqItems} title="أسئلة شائعة حول دليل الإمارات" />
        </main>
        <Footer />
      </div>
    </>
  );
}

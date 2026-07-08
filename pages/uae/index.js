import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import UaeSmartFooter from '../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../data/uaeAtlasImages';
import { ArrowLeft, ArrowRight, Building2, ChevronDown, ChevronUp, Home, MapPinned, Search } from 'lucide-react';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item]));

const experienceBySlug = {
  'abu-dhabi': 'خدمات البناء والصيانة والتصميم ومواد البناء في أبوظبي والعين ومناطق الإمارة.',
  dubai: 'خدمات المقاولات والتشطيب والصيانة والتصميم في دبي ومناطقها السكنية والتجارية.',
  sharjah: 'خدمات المقاولين والحرفيين ومواد البناء والتصميم في الشارقة ومدنها ومناطقها.',
  ajman: 'خدمات البناء والصيانة والديكور ومواد البناء في عجمان ومناطقها.',
  'ras-al-khaimah': 'خدمات المقاولات والصيانة والمواد والديكور في رأس الخيمة ومناطقها.',
  fujairah: 'خدمات البناء والصيانة والتصميم ومواد البناء في الفجيرة ومناطق الساحل الشرقي.',
  'umm-al-quwain': 'خدمات المقاولين والصيانة والمواد والأثاث في أم القيوين ومناطقها.',
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
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] px-4 pb-12 pt-5 text-gray-900 md:pb-16 md:pt-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#F3E6CD_0%,#FDFBF7_48%,#F7F1E8_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/78 px-4 py-3 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0]"><Home size={16} /></span>
                  العودة إلى الرئيسية
                </Link>
                <Link href="/providers/register" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-[#0F3F1A] px-4 py-3 text-xs font-black text-white shadow-xl shadow-[#123A46]/16 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#0F3F1A]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/14 text-[#F7E7A0]"><Building2 size={16} /></span>
                  سجل كمزود خدمة
                </Link>
              </div>
              <div className="mx-auto overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white/80 p-2 shadow-2xl shadow-[#8A6A00]/10 backdrop-blur md:rounded-[3rem] md:p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.55rem] bg-[#071A2F] md:rounded-[2.35rem]">
                  <Image src={UAE_ATLAS_IMAGES.heroDesktop} alt="خريطة رقمية لدليل الإمارات وخدمات بيت الريف" fill priority className="object-contain object-center" sizes="(max-width: 1200px) 100vw, 1120px" />
                </div>
              </div>
              <div className="relative mx-auto -mt-5 max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white/92 px-5 py-7 text-center shadow-2xl shadow-[#8A6A00]/10 backdrop-blur-xl md:-mt-8 md:rounded-[2.5rem] md:px-12 md:py-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]"><MapPinned size={15} /> ابدأ من المكان</span>
                <h1 className="mt-4 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">{pageData.h1}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-gray-700 md:text-xl">{pageData.desc}</p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href="#uae-emirates" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-black text-[#1F170D] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E7C45A]">استكشف الآن <ChevronDown size={18} className="animate-bounce" /></a>
                  <Link href="/providers/register" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3F1A]/20 bg-white px-7 py-3 text-sm font-black text-[#0F3F1A] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0F3F1A] hover:text-white"><Building2 size={18} /> سجل كمزود خدمة</Link>
                </div>
              </div>
            </div>
          </section>

          <section id="uae-emirates" className="scroll-mt-24 bg-[#FDFBF7] px-4 py-14 md:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A]/8 px-4 py-1 text-xs font-black text-[#0F3F1A]"><Search size={14} /> اختر الإمارة</span>
                <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">استكشف خدمات بيت الريف حسب الإمارة</h2>
                <p className="mx-auto mt-3 max-w-3xl text-gray-600 leading-8">واجهة مصممة لتبدأ من المكان، ثم تحدد القطاع من سبعة أقسام رئيسية، بينما تبقى التخصصات الإضافية داخل الفوتر الذكي.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {emirateCards.map((emirate, index) => {
                  const isOpen = openSlug === emirate.slug;
                  return (
                    <article key={emirate.slug} className="group overflow-hidden rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-2 shadow-xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:shadow-2xl">
                      <div className="relative overflow-hidden rounded-[1.65rem] border border-[#D4AF37]/30 bg-[#071A2F] p-1 shadow-inner"><div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]"><Image src={emirate.atlasImage || emirate.atlasThumb} alt={`صورة دليل خدمات ${emirate.nameAr} في بيت الريف`} fill priority={index < 3} className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" /></div></div>
                      <div className="px-3 pb-4 pt-4 md:px-4"><div className="flex items-center justify-between gap-4"><div className="flex items-baseline gap-2"><span className="text-xs font-black text-[#B8922B]">إمارة</span><h3 className="text-3xl font-black leading-none text-[#0F3F1A]">{emirate.nameAr}</h3></div><Link href={`/uae/${emirate.slug}`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0F3F1A] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1F170D]" aria-label={`اكتشف خدمات ${emirate.nameAr}`}><Search size={15} /> اكتشف الآن <ArrowLeft size={15} /></Link></div><div className="mt-4 flex items-start gap-3 border-t border-[#F0E7D6] pt-3"><p className={`flex-1 text-sm font-semibold leading-7 text-gray-600 transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-7 overflow-hidden'}`}>{isOpen ? `${emirate.experience} ${emirate.description}` : emirate.experience}</p><button type="button" onClick={() => setOpenSlug(isOpen ? null : emirate.slug)} className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E4D6BA] bg-[#FDFBF7] text-[#0F3F1A] shadow-sm transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1F170D]" aria-expanded={isOpen} aria-label={isOpen ? `إغلاق تفاصيل ${emirate.nameAr}` : `فتح تفاصيل ${emirate.nameAr}`}>{isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button></div></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-[#FDFBF7] px-4 pb-12"><div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white/88 p-5 shadow-sm md:p-7"><h2 className="text-2xl font-black text-[#0F3F1A]">خدمات شائعة داخل الدليل</h2><div className="mt-5 flex flex-wrap gap-3">{SERVICE_CATEGORIES.map((service) => <Link key={service.slug} href="/uae" className="rounded-full bg-[#FDFBF7] border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">{service.icon} {service.nameAr}</Link>)}</div></div></section>
          <ClientRequestCard title="تبحث عن مزود خدمة في الإمارات؟" desc="اسأل وياك أو أرسل طلبك وسنرشدك إلى المسار الصحيح حسب الإمارة والمدينة ونوع الخدمة." buttonText="ابدأ طلبك الآن" />
          <SeoContent title="كيف يخدم دليل الإمارات أصحاب المشاريع؟"><p>يعتمد دليل الإمارات في بيت الريف على ترتيب جغرافي واضح يبدأ من الإمارة ثم المدينة أو المنطقة ثم نوع الخدمة. هذا يساعد أصحاب المشاريع على الوصول إلى مزود الخدمة أو المنتج المناسب بدون تشتت.</p></SeoContent>
          <FAQ items={faqItems} title="أسئلة شائعة حول دليل الإمارات" />
          <UaeSmartFooter locale="ar" pageType="index" />
        </main>
        <Footer />
      </div>
    </>
  );
}

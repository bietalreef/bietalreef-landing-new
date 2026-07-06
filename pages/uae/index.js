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
import { ArrowLeft, ChevronDown, MapPinned, Search } from 'lucide-react';

const atlasImageBySlug = Object.fromEntries(
  UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item])
);

export default function UAEDirectoryHome() {
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
          <section className="relative isolate overflow-hidden bg-[#071A2F] px-4 py-10 text-white md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22476D_0%,#071A2F_45%,#04111F_100%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-transparent" />

            <div className="relative z-10 mx-auto max-w-6xl text-center">
              <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/30 backdrop-blur md:rounded-[2.75rem] md:p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-[#071A2F] md:aspect-[16/9] md:rounded-[2.15rem]">
                  <Image
                    src={UAE_ATLAS_IMAGES.heroMobile}
                    alt="دليل الإمارات من بيت الريف"
                    fill
                    priority
                    className="object-cover object-center md:hidden"
                    sizes="100vw"
                  />
                  <Image
                    src={UAE_ATLAS_IMAGES.heroDesktop}
                    alt="خريطة رقمية لدليل الإمارات وخدمات بيت الريف"
                    fill
                    priority
                    className="hidden object-cover object-center md:block"
                    sizes="(max-width: 1200px) 100vw, 1120px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F]/80 via-transparent to-transparent" />
                </div>
              </div>

              <div className="mx-auto -mt-8 max-w-3xl rounded-[2rem] border border-white/12 bg-[#071A2F]/88 px-5 py-7 shadow-2xl shadow-black/25 backdrop-blur md:-mt-12 md:px-10 md:py-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1 text-xs font-bold text-[#D4AF37]">
                  <MapPinned size={15} />
                  ابدأ من المكان
                </span>
                <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{pageData.h1}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-white/86 md:text-xl">{pageData.desc}</p>
                <a
                  href="#uae-emirates"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-black text-[#071A2F] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E7C45A]"
                >
                  استكشف الآن
                  <ChevronDown size={18} className="animate-bounce" />
                </a>
              </div>
            </div>
          </section>

          <section id="uae-emirates" className="scroll-mt-24 px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-right">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A]/8 px-4 py-1 text-xs font-black text-[#0F3F1A]">
                    <Search size={14} />
                    اختر الإمارة
                  </span>
                  <h2 className="mt-4 text-2xl font-black text-gray-900 md:text-4xl">استكشف خدمات بيت الريف حسب الإمارة</h2>
                  <p className="mt-3 max-w-2xl text-gray-600 leading-8">اختر الإمارة المناسبة، وبعدها ابدأ الوصول إلى المدن والمناطق والخدمات المرتبطة بالبناء، الصيانة، التصميم، الديكور ومواد البناء.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {emirateCards.map((emirate, index) => (
                  <Link
                    key={emirate.slug}
                    href={`/uae/${emirate.slug}`}
                    className="group relative block overflow-hidden rounded-[2rem] border border-[#D8C58E]/55 bg-[#071A2F] shadow-xl shadow-[#071A2F]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#071A2F]/20"
                    aria-label={`استكشف خدمات ${emirate.nameAr} في دليل بيت الريف`}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={emirate.atlasImage || emirate.atlasThumb}
                        alt={`دليل خدمات ${emirate.nameAr} في بيت الريف`}
                        fill
                        priority={index < 3}
                        className="object-cover object-center transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04111F]/85 via-[#04111F]/20 to-transparent opacity-70 transition group-hover:opacity-55" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-[#D4AF37]">إمارة</p>
                          <h3 className="mt-1 text-3xl font-black text-white transition group-hover:text-[#D4AF37]">{emirate.nameAr}</h3>
                        </div>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37] group-hover:text-[#071A2F]">
                          <ArrowLeft size={20} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <ClientRequestCard title="تبحث عن مزود خدمة في الإمارات؟" desc="اسأل وياك أو أرسل طلبك وسنرشدك إلى المسار الصحيح حسب الإمارة والمدينة ونوع الخدمة." buttonText="ابدأ طلبك الآن" />

          <SeoContent title="كيف يخدم دليل الإمارات أصحاب المشاريع؟">
            <p>يعتمد دليل الإمارات في بيت الريف على ترتيب جغرافي واضح يبدأ من الإمارة ثم المدينة أو المنطقة ثم نوع الخدمة. هذا يساعد صاحب المشروع على الوصول إلى مزودي الخدمات الأقرب والأكثر صلة دون تشتيت.</p>
            <p className="mt-4">بعد اختيار الإمارة يمكنك تصفح المناطق المتاحة، ثم اختيار تخصص مثل المقاولات العامة، النجارة، الرخام والسيراميك، التصميم الداخلي أو الصيانة العامة.</p>
          </SeoContent>

          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-black mb-6">خدمات شائعة داخل الدليل</h2>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.slice(0, 10).map((service) => (
                <Link key={service.slug} href="/uae" className="rounded-full bg-white border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">
                  {service.icon} {service.nameAr}
                </Link>
              ))}
            </div>
          </section>

          <FAQ items={faqItems} title="أسئلة شائعة حول دليل الإمارات" />
        </main>
        <Footer />
      </div>
    </>
  );
}

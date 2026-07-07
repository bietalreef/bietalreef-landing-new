import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import UaeSmartFooter from '../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';

export default function EmiratePage({ emirate, emirateSlug }) {
  if (!emirate) return null;

  const featuredProvider = emirateSlug === 'abu-dhabi'
    ? providers.find((provider) => provider.slug === 'al-hoot-marble-granite-factory')
    : null;

  const pageData = {
    h1: `خدمات بيت الريف في ${emirate.nameAr}`,
    desc: `اختر النشاط أو التخصص المطلوب داخل ${emirate.nameAr}. المناطق والمدن ستبقى متاحة داخل الفوتر الذكي بدون تضخيم رحلة المستخدم.`,
  };

  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, `ابدأ باختيار النشاط المطلوب مثل المقاولات أو التصميم الداخلي أو النجارة، ثم استخدم الفوتر الذكي لتحديد المنطقة داخل ${emirate.nameAr}.`],
    ['هل تم حذف صفحات المناطق؟', 'لا، صفحات المناطق ما زالت موجودة وتعمل، لكنها لم تعد تظهر كخطوة رئيسية بعد اختيار الإمارة.'],
    ['هل أستطيع طلب عرض سعر؟', 'نعم، يمكنك طلب عرض سعر من صفحة الإمارة أو صفحة النشاط، وسيتم توجيه الطلب حسب المكان والخدمة.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirateSlug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={emirate.nameAr} />
        <SecondaryHeader backUrl="/uae" backLabel="العودة إلى دليل الإمارات" />

        <main>
          <section className="relative min-h-[360px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src={`/images/seo/emirates/${emirateSlug}.webp`} alt={pageData.h1} fill className="object-cover opacity-30" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-[#0F3F1A]/70 to-transparent" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">إمارة {emirate.nameAr}</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{pageData.h1}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{pageData.desc}</p>
            </div>
          </section>

          <ClientRequestCard title={`تبحث عن مزود خدمة في ${emirate.nameAr}؟`} desc={`اختر النشاط المطلوب أولاً، ثم حدد المنطقة من الفوتر الذكي أو أرسل طلبك مباشرة عبر وياك.`} buttonText={`اطلب عرض سعر في ${emirate.nameAr}`} />

          {featuredProvider && (
            <section className="max-w-6xl mx-auto px-4 pt-14">
              <div className="mb-6 text-center md:text-right">
                <span className="inline-flex rounded-full bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00] border border-[#D4AF37]/30">مزود خدمة مميز في أبوظبي</span>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-[#0F3F1A]">بطاقة خدمة موثوقة داخل دليل أبوظبي</h2>
                <p className="mt-3 text-gray-600 leading-8">تم إبراز مصنع الحوت ضمن مسار أبوظبي لأنه يقدم خدمات الرخام والجرانيت والكوارتز للعين وأبوظبي والإمارات.</p>
              </div>
              <Link href={`/providers/${featuredProvider.slug}`} className="group block overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-xl shadow-[#8A6A00]/10 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="h-1.5 bg-gradient-to-l from-[#0F3F1A] via-[#D4AF37] to-[#0F3F1A]" />
                <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
                  <div className="bg-gradient-to-br from-[#071A12] via-[#0F3F1A] to-[#1A5C28] p-7 text-white md:p-9">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-black text-[#F3D46B]">تخصص فاخر</span>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-100">موثق</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{featuredProvider.nameAr}</h3>
                    <p className="mt-3 text-sm font-bold text-[#F3D46B]">{featuredProvider.providerTypeAr} · العين · أبوظبي</p>
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="text-base font-semibold leading-8 text-gray-700">{featuredProvider.descriptionAr}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {['رخام طبيعي وجرانيت', 'كوارتز ومطابخ', 'واجهات وأرضيات'].map((item) => (
                        <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FFF8E5] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>
                      ))}
                    </div>
                    <div className="mt-7 border-t border-[#EFE5D2] pt-5">
                      <span className="inline-flex rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">افتح ملف المصنع</span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10 text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">اختر النشاط في {emirate.nameAr}</h2>
              <p className="mt-3 text-gray-600 leading-8">هذه هي الخطوة الأساسية بعد اختيار الإمارة. المدن والمناطق محفوظة داخل الفوتر الذكي وروابطها القديمة ما زالت تعمل.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/uae/${emirate.slug}/${service.slug}`} className="group bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition">{service.nameAr} في {emirate.nameAr}</h3>
                  <p className="mt-3 text-sm text-gray-500 leading-7">{service.descAr}</p>
                </Link>
              ))}
            </div>
          </section>

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">يعرض هذا القسم الأنشطة الرئيسية داخل {emirate.nameAr}. أما المدن والمناطق فتظهر داخل الفوتر الذكي كروابط داخلية منظمة للحفاظ على الامتدادات القديمة وقوة البحث الجغرافي.</p>
          </SeoContent>

          <FAQ items={faqItems} title={`أسئلة شائعة حول خدمات ${emirate.nameAr}`} />
          <UaeSmartFooter locale="ar" pageType="emirate" emirate={emirate} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirateSlug = params.activity;
  const emirate = getEmirate(emirateSlug);
  if (!emirate) return { notFound: true };
  return { props: { emirate, emirateSlug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: UAE_EMIRATES.map((emirate) => ({ params: { activity: emirate.slug } })),
    fallback: 'blocking',
  };
}

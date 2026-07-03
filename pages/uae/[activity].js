import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../data/siteTaxonomy';

export default function EmiratePage({ emirate, emirateSlug }) {
  if (!emirate) return null;

  const pageData = {
    h1: `خدمات المقاولات والبناء في ${emirate.nameAr}`,
    desc: `استكشف المدن والمناطق داخل ${emirate.nameAr} ثم اختر الخدمة المناسبة لمشروعك من المقاولات والصيانة والتصميم ومواد البناء.`,
  };

  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, `ابدأ باختيار المدينة أو المنطقة داخل ${emirate.nameAr}، ثم اختر الخدمة التي تحتاجها مثل المقاولات أو النجارة أو الرخام.`],
    ['هل أستطيع طلب عرض سعر؟', 'نعم، يمكنك طلب عرض سعر بعد تحديد المكان والخدمة، أو سؤال وياك لتوجيه الطلب.'],
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

          <ClientRequestCard title={`تبحث عن مزود خدمة في ${emirate.nameAr}؟`} desc={`حدد المدينة والخدمة المطلوبة داخل ${emirate.nameAr} وسنساعدك في توجيه طلبك عبر وياك.`} buttonText={`اطلب عرض سعر في ${emirate.nameAr}`} />

          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">اختر المدينة أو المنطقة في {emirate.nameAr}</h2>
              <p className="mt-3 text-gray-600 leading-8">بعد اختيار المنطقة ستظهر الخدمات المتاحة مثل المقاولات، الصيانة، النجارة، الرخام، التصميم الداخلي وغيرها.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {emirate.areas.map((area) => (
                <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}`} className="group bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4"><span className="text-primary text-xl">📍</span></div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-primary transition">{area.nameAr}</h3>
                  <p className="text-sm text-gray-500 leading-7">استكشف خدمات البناء والصيانة في {area.nameAr}.</p>
                </Link>
              ))}
            </div>
          </section>

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">يعرض هذا القسم المناطق والمدن داخل {emirate.nameAr} حتى تكون رحلة البحث مبنية على الموقع أولًا، ثم الخدمة ثانيًا.</p>
          </SeoContent>

          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-black mb-6">خدمات شائعة في {emirate.nameAr}</h2>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.slice(0, 12).map((service) => (
                <span key={service.slug} className="rounded-full bg-white border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700">{service.icon} {service.nameAr}</span>
              ))}
            </div>
          </section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${emirate.nameAr}`} />
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

import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import ClientRequestCard from '../../../components/ClientRequestCard';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea } from '../../../data/siteTaxonomy';

export default function AreaPage({ emirate, area, emirateSlug, areaSlug }) {
  if (!emirate || !area) return null;

  const pageData = {
    h1: `خدمات البناء والمقاولات في ${area.nameAr}`,
    desc: `اختر الخدمة المناسبة في ${area.nameAr} داخل ${emirate.nameAr}: مقاولات، نجارة، رخام، صيانة، تصميم داخلي ومواد بناء.`,
  };

  const faqItems = [
    [`ما الخدمات المتاحة في ${area.nameAr}؟`, `تستطيع تصفح خدمات المقاولات والصيانة والتشطيبات والنجارة والرخام والتصميم الداخلي وغيرها داخل ${area.nameAr}.`],
    ['كيف أطلب عرض سعر؟', 'اختر الخدمة المطلوبة ثم استخدم زر طلب العرض أو اسأل وياك لتوجيه طلبك.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirateSlug}/${areaSlug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={area.nameAr} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}`} backLabel={`العودة إلى ${emirate.nameAr}`} />

        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">{emirate.nameAr}</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{pageData.h1}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{pageData.desc}</p>
            </div>
          </section>

          <ClientRequestCard title={`تبحث عن خدمة في ${area.nameAr}؟`} desc="حدد نوع الخدمة المطلوبة وسيتم توجيه طلبك حسب المنطقة والتخصص المناسب." buttonText={`اطلب عرض سعر في ${area.nameAr}`} />

          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">اختر الخدمة في {area.nameAr}</h2>
              <p className="mt-3 text-gray-600 leading-8">هذه هي المرحلة الثالثة في دليل الإمارات: المكان ثم الخدمة.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/uae/${emirateSlug}/${areaSlug}/${service.slug}`} className="group bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition">{service.nameAr} في {area.nameAr}</h3>
                  <p className="mt-3 text-sm text-gray-500 leading-7">{service.descAr}</p>
                </Link>
              ))}
            </div>
          </section>

          <SeoContent title={`${area.nameAr} في دليل بيت الريف`}>
            <p>صفحة {area.nameAr} داخل {emirate.nameAr} تساعد المستخدم على اختيار الخدمة بعد تحديد المكان، وهذا يجعل البحث أوضح وأكثر دقة لأصحاب المشاريع.</p>
          </SeoContent>

          <FAQ items={faqItems} title={`أسئلة شائعة حول الخدمات في ${area.nameAr}`} />
          <UaeSmartFooter locale="ar" pageType="area" emirate={emirate} area={area} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirateSlug = params.activity;
  const areaSlug = params.emirate;
  const emirate = getEmirate(emirateSlug);
  const area = getArea(emirateSlug, areaSlug);
  if (!emirate || !area) return { notFound: true };
  return { props: { emirate, area, emirateSlug, areaSlug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = UAE_EMIRATES.flatMap((emirate) => emirate.areas.map((area) => ({ params: { activity: emirate.slug, emirate: area.slug } })));
  return { paths, fallback: 'blocking' };
}

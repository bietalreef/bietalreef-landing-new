import Head from 'next/head';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import ClientRequestCard from '../../../../components/ClientRequestCard';
import FAQ from '../../../../components/FAQ';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

export default function AreaServicePage({ emirate, area, service, emirateSlug, areaSlug }) {
  const title = `${service.nameAr} في ${area.nameAr}`;
  const faqItems = [
    [`كيف أجد ${service.nameAr} في ${area.nameAr}؟`, 'حدد المكان والخدمة ثم أرسل طلبك ليتم توجيهه حسب تفاصيل المشروع.'],
    ['هل الأسعار ثابتة؟', 'لا نعرض أسعارًا غير معتمدة. السعر يعتمد على تفاصيل المشروع ونطاق العمل.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={`دليل ${title} داخل ${emirate.nameAr} مع توجيه لطلب عرض سعر مناسب.`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}/${areaSlug}`} backLabel={`العودة إلى ${area.nameAr}`} />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">{emirate.nameAr} / {area.nameAr}</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{title}</h1>
              <p className="text-lg text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{service.descAr}</p>
            </div>
          </section>
          <ClientRequestCard title={`تحتاج ${service.nameAr} في ${area.nameAr}؟`} desc="أرسل تفاصيل مشروعك وسيتم تجهيز الطلب حسب المكان والخدمة المطلوبة." buttonText="اطلب عرض سعر الآن" />
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="rounded-3xl bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-4">ماذا تجد هنا؟</h2>
              <p className="text-gray-600 leading-8">صفحة مخصصة لخدمة {service.nameAr} في {area.nameAr}، مبنية على ترتيب: الإمارة ثم المنطقة ثم الخدمة.</p>
            </div>
          </section>
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
          <UaeSmartFooter locale="ar" pageType="service" emirate={emirate} area={area} service={service} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirateSlug = params.activity;
  const areaSlug = params.emirate;
  const serviceSlug = params.service;
  const emirate = getEmirate(emirateSlug);
  const area = getArea(emirateSlug, areaSlug);
  const service = getServiceCategory(serviceSlug);
  if (!emirate || !area || !service) return { notFound: true };
  return { props: { emirate, area, service, emirateSlug, areaSlug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = UAE_EMIRATES.flatMap((emirate) => emirate.areas.flatMap((area) => SERVICE_CATEGORIES.map((service) => ({ params: { activity: emirate.slug, emirate: area.slug, service: service.slug } }))));
  return { paths, fallback: 'blocking' };
}

import Head from 'next/head';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import ClientRequestCard from '../../../../components/ClientRequestCard';
import FAQ from '../../../../components/FAQ';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCards from '../../../../components/SeoProofCards';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

export default function AreaServicePage({ emirate, area, service, emirateSlug, areaSlug }) {
  const title = `${service.nameAr} في ${area.nameAr}`;
  const showAlHootPath = emirateSlug === 'abu-dhabi' && AL_HOOT_SERVICE_SLUGS.includes(service.slug);
  const faqItems = [
    [`كيف أجد ${service.nameAr} في ${area.nameAr}؟`, 'حدد المكان والخدمة ثم أرسل طلبك ليتم توجيهه حسب تفاصيل المشروع.'],
    ['هل الأسعار ثابتة؟', 'لا نعرض أسعارًا غير معتمدة. السعر يعتمد على تفاصيل المشروع ونطاق العمل.'],
    ['هل توجد بطاقة مزود أو منتج داخل الصفحة؟', showAlHootPath ? 'نعم، في هذه الصفحة يظهر مسار مرتبط بمزود خدمة فعلي وخدمة ومنتج وطلب معاينة.' : 'تتم إضافة البطاقات تدريجياً بعد مراجعة المزودين والمنتجات.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={`دليل ${title} داخل ${emirate.nameAr} مع توجيه لطلب عرض سعر مناسب ومسارات مزودين موثقين عند توفرهم.`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}/${areaSlug}`} backLabel={`العودة إلى ${area.nameAr}`} />
        <main>
          <UaeDirectoryHero locale="ar" title={title} description={service.descAr} emirate={emirate} area={area} service={service} />
          <ClientRequestCard title={`تحتاج ${service.nameAr} في ${area.nameAr}؟`} desc="أرسل تفاصيل مشروعك وسيتم تجهيز الطلب حسب المكان والخدمة المطلوبة." buttonText="اطلب عرض سعر الآن" />
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="rounded-3xl bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-4">ماذا تجد هنا؟</h2>
              <p className="text-gray-600 leading-8">صفحة مخصصة لخدمة {service.nameAr} في {area.nameAr}، مبنية على ترتيب: الإمارة ثم المنطقة ثم الخدمة.</p>
              {showAlHootPath && <p className="mt-4 text-gray-600 leading-8">ولأن هذه الخدمة مرتبطة بالرخام أو مواد البناء أو التشطيبات، تم إضافة مربع عملي يثبت وجود مسار مزود/خدمة/منتج داخل نفس الصفحة.</p>}
            </div>
          </section>
          {showAlHootPath && (
            <SeoProofCards
              title={`مزود وخدمة ومنتج داخل صفحة ${title}`}
              desc="هذا المربع يربط صفحة SEO الجغرافية بمسار حقيقي: مصنع الحوت كمزود خدمة، خدمة توريد وتركيب، منتج رخام/جرانيت حسب الطلب، وخطوة معاينة أو عرض سعر واضحة."
            />
          )}
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

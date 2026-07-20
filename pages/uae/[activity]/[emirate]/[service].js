import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import FAQ from '../../../../components/FAQ';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCards from '../../../../components/SeoProofCards';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import UaeDirectoryWeyaakCard from '../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../components/UaeContextInfoCard';
import UaeActivityProviders from '../../../../components/UaeActivityProviders';
import UaeDirectorySeo from '../../../../components/UaeDirectorySeo';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

export default function AreaServicePage({ emirate, area, service, emirateSlug, areaSlug }) {
  const title = `${service.nameAr} في ${area.nameAr}`;
  const showAlHootPath = false;
  const faqItems = [
    [`كيف أجد ${service.nameAr} في ${area.nameAr}؟`, 'حدد المكان والخدمة ثم أرسل طلبك ليتم توجيهه حسب تفاصيل المشروع.'],
    ['هل الأسعار ثابتة؟', 'لا نعرض أسعارًا غير معتمدة. السعر يعتمد على تفاصيل المشروع ونطاق العمل.'],
    ['هل توجد بطاقة مزود أو منتج داخل الصفحة؟', showAlHootPath ? 'نعم، في هذه الصفحة يظهر مسار مرتبط بمزود خدمة فعلي وخدمة ومنتج وطلب معاينة.' : 'تتم إضافة البطاقات تدريجياً بعد مراجعة المزودين والمنتجات.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="ar" title={title} description={`دليل ${title} داخل ${emirate.nameAr} مع بروفايلات مزودي الخدمة ومسارات المنطقة المرتبطة.`} path={`/uae/${emirateSlug}/${areaSlug}/${service.slug}`} alternatePath={`/en/uae/${emirateSlug}/${areaSlug}/${service.slug}`} emirate={emirate} service={service} />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}/${areaSlug}`} backLabel={`العودة إلى ${area.nameAr}`} />
        <main>
          <UaeDirectoryHero locale="ar" title={title} description={service.descAr} emirate={emirate} area={area} service={service} cleanNavigation />
          <UaeContextInfoCard locale="ar" locationLabel={`${area.nameAr}، ${emirate.nameAr}`} title={`عن خدمة ${service.nameAr} في ${area.nameAr}`} description={`${service.descAr} تعرض الصفحة هذا التخصص ضمن موقعه الصحيح، مع مسار واضح للعودة إلى المنطقة والإمارة أو الانتقال إلى الطلب.`} />
          <UaeDirectoryWeyaakCard locale="ar" title={`اسأل وياك عن ${service.nameAr} في ${area.nameAr}`} description="أرسل تفاصيل الخدمة والمقاسات أو الصور المتاحة، وسيساعدك وياك في ترتيب الطلب وتوجيهه حسب المكان والتخصص." />
          <UaeActivityProviders locale="ar" emirate={emirate} area={area} service={service} />
          {showAlHootPath && (
            <SeoProofCards
              title={`مزود وخدمة ومنتج داخل صفحة ${title}`}
              desc="هذا المربع يربط صفحة SEO الجغرافية بمسار حقيقي: مصنع الحوت كمزود خدمة، خدمة توريد وتركيب، منتج رخام/جرانيت حسب الطلب، وخطوة معاينة أو عرض سعر واضحة."
            />
          )}
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
          <UaeSmartFooter locale="ar" pageType="service" emirate={emirate} area={area} service={service} />
        </main>
        <Footer showRequestCTA={false} />
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

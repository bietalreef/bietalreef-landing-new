import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import SeoProofCards from '../../../components/SeoProofCards';
import UaeDirectoryHero from '../../../components/UaeDirectoryHero';
import UaeActivityProviders from '../../../components/UaeActivityProviders';
import UaeDirectorySectorCards from '../../../components/UaeDirectorySectorCards';
import UaeDirectoryWeyaakCard from '../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../components/UaeContextInfoCard';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

function shouldShowAlHootPath(emirateSlug, serviceSlug) {
  return false;
}

function EmirateServiceHub({ emirate, service, emirateSlug }) {
  const title = `${service.nameAr} في ${emirate.nameAr}`;
  const showAlHootPath = shouldShowAlHootPath(emirateSlug, service.slug);
  const faqItems = [
    [`هل توجد ${service.nameAr} في مناطق ${emirate.nameAr}؟`, `نعم، روابط المناطق متاحة أسفل الصفحة، ويمكنك الانتقال إلى ${service.nameAr} حسب كل منطقة داخل ${emirate.nameAr}.`],
    ['هل تم حذف صفحات المناطق القديمة؟', 'لا، صفحات المناطق القديمة ما زالت تعمل، لكنها أصبحت روابط داخلية مساندة وليست خطوة رئيسية في الصفحة.'],
    ['هل توجد أمثلة حقيقية داخل الصفحة؟', showAlHootPath ? 'نعم، تم إضافة مسار واضح يربط صفحة النشاط بمزود خدمة فعلي ومنتج وخدمة وطلب معاينة.' : 'يتم إضافة المزودين والمنتجات تدريجياً بعد مراجعة البيانات.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={`صفحة ${title} داخل دليل الإمارات مع روابط المناطق والخدمات المرتبطة ومسارات طلب حقيقية عند توفر مزودين موثقين.`} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirateSlug}/${service.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}`} backLabel={`العودة إلى ${emirate.nameAr}`} />
        <main>
          <UaeDirectoryHero locale="ar" title={title} description={service.descAr} emirate={emirate} service={service} cleanNavigation />
          <UaeActivityProviders locale="ar" emirate={emirate} service={service} />
          {showAlHootPath && (
            <SeoProofCards
              title={`مسار حقيقي لخدمة ${service.nameAr} في ${emirate.nameAr}`}
              desc="تم تثبيت مربع عملي داخل صفحة النشاط يوضح أن الصفحة مرتبطة بمزود خدمة حقيقي، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة/عرض سعر عبر ملف مصنع الحوت الأبيض للرخام والجرانيت."
            />
          )}
          <SeoContent title={`${title} داخل بيت الريف`}>
            <p>هذه صفحة نشاط على مستوى الإمارة. تظهر روابط المدن والمناطق في قسم منظم أسفل الصفحة حتى تبقى الرحلة واضحة وسهلة.</p>
            {showAlHootPath && <p className="mt-4">ولأن هذه الصفحة مرتبطة بمجال الرخام أو مواد البناء أو التشطيبات، تم دعمها بمسار فعلي يفتح ملف مزود خدمة داخل المنصة بدلاً من الاكتفاء بنص عام.</p>}
          </SeoContent>
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
          <UaeSmartFooter locale="ar" pageType="emirateService" emirate={emirate} service={service} />
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export default function AreaOrServicePage({ mode, emirate, area, service, emirateSlug, areaSlug }) {
  if (!emirate) return null;

  if (mode === 'emirateService') {
    return <EmirateServiceHub emirate={emirate} service={service} emirateSlug={emirateSlug} />;
  }

  if (!area) return null;

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
          <UaeDirectoryHero locale="ar" title={pageData.h1} description={pageData.desc} emirate={emirate} area={area} cleanNavigation />

          <UaeContextInfoCard locale="ar" locationLabel={`${area.nameAr}، ${emirate.nameAr}`} title={`الخدمات والتخصصات المتاحة في ${area.nameAr}`} description={`تعرض هذه الصفحة جميع تخصصات المنصة داخل ${area.nameAr}. اختر التخصص المطلوب للانتقال إلى صفحته واستعراض مزودي الخدمة المرتبطين بالمكان والتخصص.`} />

          <UaeDirectoryWeyaakCard locale="ar" title={`وياك في ${area.nameAr}`} description={`أخبر وياك بما يحتاجه مشروعك في ${area.nameAr}، وسيساعدك في تحديد التخصص والوصول إلى مزود الخدمة أو مسار الطلب المناسب.`} />

          <UaeDirectorySectorCards emirate={emirate} area={area} locale="ar" />

          <SeoContent title={`${area.nameAr} في دليل بيت الريف`}>
            <p>صفحة {area.nameAr} داخل {emirate.nameAr} تربط الموقع بالخدمات المتاحة، مع الحفاظ على الروابط الجغرافية ومسار تصفح واضح.</p>
          </SeoContent>

          <FAQ items={faqItems} title={`أسئلة شائعة حول الخدمات في ${area.nameAr}`} />
          <UaeSmartFooter locale="ar" pageType="area" emirate={emirate} area={area} />
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirateSlug = params.activity;
  const secondSlug = params.emirate;
  const emirate = getEmirate(emirateSlug);
  if (!emirate) return { notFound: true };

  const area = getArea(emirateSlug, secondSlug);
  const service = getServiceCategory(secondSlug);

  if (!area && !service) return { notFound: true };

  return {
    props: {
      mode: service && !area ? 'emirateService' : 'area',
      emirate,
      area: area || null,
      service: service || null,
      emirateSlug,
      areaSlug: secondSlug,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const areaPaths = UAE_EMIRATES.flatMap((emirate) => emirate.areas.map((area) => ({ params: { activity: emirate.slug, emirate: area.slug } })));
  const servicePaths = UAE_EMIRATES.flatMap((emirate) => SERVICE_CATEGORIES.map((service) => ({ params: { activity: emirate.slug, emirate: service.slug } })));
  return { paths: [...areaPaths, ...servicePaths], fallback: 'blocking' };
}

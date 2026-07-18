import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import UaeSmartFooter from '../../components/UaeSmartFooter';
import SeoProofCards from '../../components/SeoProofCards';
import UaeDirectorySectorCards from '../../components/UaeDirectorySectorCards';
import UaeDirectoryHero from '../../components/UaeDirectoryHero';
import AbuDhabiDirectoryIntro from '../../components/AbuDhabiDirectoryIntro';
import { UAE_EMIRATES, getEmirate } from '../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../data/uaeAtlasImages';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item.image]));

export default function EmiratePage({ emirate, emirateSlug }) {
  if (!emirate) return null;
  const isAbuDhabi = emirate.slug === 'abu-dhabi';
  const showAlHootSeoPath = false;
  const canonical = `https://bietalreef.ae/uae/${emirateSlug}`;
  const shareImage = `https://bietalreef.ae${atlasImageBySlug[emirate.slug]}`;
  const pageData = {
    h1: `خدمات بيت الريف في ${emirate.nameAr}`,
    desc: isAbuDhabi
      ? 'استكشف المقاولين ومزودي الخدمات والموردين والمتاجر والمنتجات في أبوظبي والعين ومناطق الإمارة عبر دليل بيت الريف.'
      : `استكشف قطاعات البناء والمقاولات والصيانة والتصميم ومواد البناء والموردين ومزودي الخدمات في ${emirate.nameAr} عبر دليل بيت الريف.`,
  };
  const pageTitle = isAbuDhabi
    ? 'دليل أبوظبي للخدمات والمنتجات والموردين | بيت الريف'
    : `${emirate.nameAr}: دليل البناء والمقاولات والخدمات | بيت الريف`;
  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, isAbuDhabi ? 'ابدأ باختيار أحد مسارات الخدمات أو المنتجات الأحد عشر، ثم انتقل إلى المدينة أو المنطقة والتخصص المناسب.' : 'ابدأ باختيار أحد القطاعات السبعة الرئيسية مثل المقاولات أو المواد أو الصيانة، وستجد المناطق والخدمات ذات الصلة في الصفحة.'],
    ['هل يمكنني التصفح حسب المنطقة؟', 'نعم، روابط المدن والمناطق متاحة ضمن قسم المسارات الإضافية أسفل الصفحة.'],
    ['هل أستطيع طلب عرض سعر؟', 'نعم، يمكنك طلب عرض سعر من صفحة الإمارة أو صفحة النشاط، وسيتم توجيه الطلب حسب المكان والخدمة.'],
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageData.desc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={canonical} />
        <link rel="alternate" hrefLang="en-AE" href={`https://bietalreef.ae/en/uae/${emirateSlug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageData.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="بيت الريف" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content={isAbuDhabi ? 'دليل أبوظبي للخدمات والمنتجات والموردين في بيت الريف' : `دليل خدمات البناء والمقاولات في ${emirate.nameAr}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageData.desc} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <SecondaryHeader backUrl="/uae" backLabel="العودة إلى دليل الإمارات" />
        <main>
          <UaeDirectoryHero locale="ar" emirate={emirate} image={atlasImageBySlug[emirate.slug]} imageOnly />

          {isAbuDhabi ? <AbuDhabiDirectoryIntro locale="ar" /> : <ClientRequestCard title={`تبحث عن مزود خدمة في ${emirate.nameAr}؟`} desc="اختر النشاط المطلوب أولاً، أو أرسل تفاصيل مشروعك مباشرة عبر وياك." buttonText={`اطلب عرض سعر في ${emirate.nameAr}`} />}

          {showAlHootSeoPath && <SeoProofCards title="مسار حقيقي داخل صفحة أبوظبي" desc="هذه الصفحة لا تكتفي بنص SEO عام. يوجد داخلها مثال واضح لمسار العميل: مزود موثق للرخام والجرانيت، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة أو عرض سعر مرتبطة بملف مصنع الحوت." />}

          <UaeDirectorySectorCards emirate={emirate} locale="ar" />

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">{isAbuDhabi ? 'يعرض هذا القسم أحد عشر مسارًا رئيسيًا تجمع قطاعات الخدمات والمنتجات والمتاجر داخل أبوظبي، مع روابط منظمة للمدن والمناطق والتخصصات لتسهيل الوصول والمحافظة على قوة البحث الجغرافي.' : `يعرض هذا القسم القطاعات السبعة الرئيسية داخل ${emirate.nameAr}، مع روابط منظمة للمدن والمناطق والتخصصات الأخرى لتسهيل الوصول والمحافظة على قوة البحث الجغرافي.`}</p>
            {showAlHootSeoPath && <p className="mt-4">تم دعم صفحة أبوظبي بمسار داخلي واضح يربط بين محتوى البحث الجغرافي ومزود خدمة فعلي داخل المنصة، مثل مصنع الحوت الأبيض للرخام والجرانيت.</p>}
          </SeoContent>

          <UaeSmartFooter locale="ar" pageType="emirate" emirate={emirate} />
          <FAQ items={faqItems} title={`أسئلة شائعة حول خدمات ${emirate.nameAr}`} />
        </main>
        <Footer showRequestCTA={false} />
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
  return { paths: UAE_EMIRATES.map((emirate) => ({ params: { activity: emirate.slug } })), fallback: 'blocking' };
}

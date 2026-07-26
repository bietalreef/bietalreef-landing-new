import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import UaeSmartFooter from '../../components/UaeSmartFooter';
import SeoProofCards from '../../components/SeoProofCards';
import UaeDirectorySectorCards from '../../components/UaeDirectorySectorCards';
import UaeDirectoryHero from '../../components/UaeDirectoryHero';
import AbuDhabiDirectoryIntro from '../../components/AbuDhabiDirectoryIntro';
import { UAE_EMIRATES, getEmirate } from '../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../data/uaeAtlasImages';
import { UAE_DIRECTORY_SECTION_SLUGS, getArabicUaeDirectoryCards } from '../../lib/platformDirectoryCards';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item.image]));

function providerSchemaTitle(activityName, emirateName) {
  return activityName === 'المقاولات والبناء'
    ? `أفضل المقاولين الموثقين في المقاولات والإنشاءات العامة في ${emirateName}`
    : `شركات ومؤسسات ${activityName} في ${emirateName}`;
}

export default function EmiratePage({ emirate, emirateSlug, directoryCards = [] }) {
  if (!emirate) return null;
  const isAbuDhabi = emirate.slug === 'abu-dhabi';
  const showAlHootSeoPath = false;
  const canonical = `https://bietalreef.ae/uae/${emirateSlug}`;
  const shareImage = `https://bietalreef.ae${atlasImageBySlug[emirate.slug]}`;
  const pageData = {
    h1: `خدمات بيت الريف في ${emirate.nameAr}`,
    desc: isAbuDhabi
      ? 'اكتشف شركات المقاولات والمؤسسات والورش والحرفيين والموردين والمتاجر والخدمات والمنتجات في أبوظبي والعين ومناطق الإمارة عبر دليل بيت الريف.'
      : `استكشف قطاعات البناء والمقاولات والصيانة والتصميم ومواد البناء والموردين ومزودي الخدمات في ${emirate.nameAr} عبر دليل بيت الريف.`,
  };
  const pageTitle = isAbuDhabi
    ? 'دليل أبوظبي للخدمات والمنتجات والموردين | بيت الريف'
    : `${emirate.nameAr}: دليل البناء والمقاولات والخدمات | بيت الريف`;
  const directorySchema = directoryCards.length === 18
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `دليل أنشطة وخدمات ومنتجات ${emirate.nameAr}`,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: directoryCards.length,
        itemListElement: directoryCards.map((card, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: card.sectionKey === 'providers'
              ? providerSchemaTitle(card.activity.name, emirate.nameAr)
              : card.title,
            description: card.description,
            image: card.image.startsWith('http')
              ? card.image
              : `https://bietalreef.ae${card.image}`,
            url: `${canonical}/directory/${UAE_DIRECTORY_SECTION_SLUGS[card.sectionKey]}/${card.activity.slug}`,
          },
        })),
      }
    : null;
  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, 'ابدأ من إحدى مجموعات الدليل الثلاث، ثم اختر النشاط الرئيسي من البطاقات المعتمدة للوصول إلى المسار المناسب.'],
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
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="1000" />
        <meta property="og:image:alt" content={isAbuDhabi ? 'دليل أبوظبي للخدمات والمنتجات والموردين في بيت الريف' : `دليل خدمات البناء والمقاولات في ${emirate.nameAr}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageData.desc} />
        <meta name="twitter:image" content={shareImage} />
        {directorySchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
          />
        )}
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <SecondaryHeader backUrl="/uae" backLabel="العودة إلى دليل الإمارات" />
        <main>
          <UaeDirectoryHero locale="ar" title={pageData.h1} description={pageData.desc} emirate={emirate} image={atlasImageBySlug[emirate.slug]} cleanNavigation />

          <AbuDhabiDirectoryIntro locale="ar" emirate={emirate} />

          {showAlHootSeoPath && <SeoProofCards title="مسار حقيقي داخل صفحة أبوظبي" desc="هذه الصفحة لا تكتفي بنص SEO عام. يوجد داخلها مثال واضح لمسار العميل: مزود موثق للرخام والجرانيت، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة أو عرض سعر مرتبطة بملف مصنع الحوت." />}

          <UaeDirectorySectorCards emirate={emirate} locale="ar" directoryCards={directoryCards} />

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">تعرض الصفحة سبع بطاقات للوصول إلى الشركات والمؤسسات والورش والحرفيين، وسبع بطاقات للخدمات والعروض، وأربع بطاقات للمنتجات والمتاجر. تأتي أسماء البطاقات وترتيبها مباشرة من القاموس المركزي للمنصة.</p>
            {showAlHootSeoPath && <p className="mt-4">تم دعم صفحة أبوظبي بمسار داخلي واضح يربط بين محتوى البحث الجغرافي ومزود خدمة فعلي داخل المنصة، مثل مصنع الحوت الأبيض للرخام والجرانيت.</p>}
          </SeoContent>

          <UaeSmartFooter locale="ar" pageType="emirate" emirate={emirate} directoryCards={directoryCards} />
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
  const directoryCards = await getArabicUaeDirectoryCards();
  return { props: { emirate, emirateSlug, directoryCards }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: UAE_EMIRATES.map((emirate) => ({ params: { activity: emirate.slug } })),
    fallback: 'blocking',
  };
}

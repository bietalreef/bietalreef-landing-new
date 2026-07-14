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
import { UAE_EMIRATES, getEmirate } from '../../data/siteTaxonomy';

export default function EmiratePage({ emirate, emirateSlug }) {
  if (!emirate) return null;
  const showAlHootSeoPath = false;
  const pageData = {
    h1: `خدمات بيت الريف في ${emirate.nameAr}`,
    desc: `اختر واحداً من القطاعات السبعة الرئيسية داخل ${emirate.nameAr}، ثم انتقل إلى مزودي الخدمة والخيارات المرتبطة بالموقع والنشاط.`,
  };
  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, `ابدأ باختيار أحد القطاعات السبعة الرئيسية مثل المقاولات أو المواد أو الصيانة، وستجد المناطق والخدمات ذات الصلة في الصفحة.`],
    ['هل يمكنني التصفح حسب المنطقة؟', 'نعم، روابط المدن والمناطق متاحة ضمن قسم المسارات الإضافية أسفل الصفحة.'],
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
          <UaeDirectoryHero locale="ar" title={pageData.h1} description={pageData.desc} emirate={emirate} />

          <ClientRequestCard title={`تبحث عن مزود خدمة في ${emirate.nameAr}؟`} desc="اختر النشاط المطلوب أولاً، أو أرسل تفاصيل مشروعك مباشرة عبر وياك." buttonText={`اطلب عرض سعر في ${emirate.nameAr}`} />

          {showAlHootSeoPath && <SeoProofCards title="مسار حقيقي داخل صفحة أبوظبي" desc="هذه الصفحة لا تكتفي بنص SEO عام. يوجد داخلها مثال واضح لمسار العميل: مزود موثق للرخام والجرانيت، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة أو عرض سعر مرتبطة بملف مصنع الحوت." />}

          <UaeDirectorySectorCards emirate={emirate} locale="ar" />

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">يعرض هذا القسم القطاعات السبعة الرئيسية داخل {emirate.nameAr}، مع روابط منظمة للمدن والمناطق والتخصصات الأخرى لتسهيل الوصول والمحافظة على قوة البحث الجغرافي.</p>
            {showAlHootSeoPath && <p className="mt-4">تم دعم صفحة أبوظبي بمسار داخلي واضح يربط بين محتوى البحث الجغرافي ومزود خدمة فعلي داخل المنصة، مثل مصنع الحوت الأبيض للرخام والجرانيت.</p>}
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
  return { paths: UAE_EMIRATES.map((emirate) => ({ params: { activity: emirate.slug } })), fallback: 'blocking' };
}

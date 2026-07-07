import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import ClientRequestCard from '../../../components/ClientRequestCard';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import SeoProofCards from '../../../components/SeoProofCards';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

function shouldShowAlHootPath(emirateSlug, serviceSlug) {
  return emirateSlug === 'abu-dhabi' && AL_HOOT_SERVICE_SLUGS.includes(serviceSlug);
}

function EmirateServiceHub({ emirate, service, emirateSlug }) {
  const title = `${service.nameAr} في ${emirate.nameAr}`;
  const showAlHootPath = shouldShowAlHootPath(emirateSlug, service.slug);
  const faqItems = [
    [`هل توجد ${service.nameAr} في مناطق ${emirate.nameAr}؟`, `نعم، روابط المناطق موجودة في الفوتر الذكي، ويمكنك الانتقال إلى ${service.nameAr} حسب كل منطقة داخل ${emirate.nameAr}.`],
    ['هل تم حذف صفحات المناطق القديمة؟', 'لا، صفحات المناطق القديمة ما زالت تعمل، لكنها أصبحت روابط داخلية مساندة وليست خطوة رئيسية في الصفحة.'],
    ['هل توجد أمثلة حقيقية داخل الصفحة؟', showAlHootPath ? 'نعم، تم إضافة مسار واضح يربط صفحة النشاط بمزود خدمة فعلي ومنتج وخدمة وطلب معاينة.' : 'يتم إضافة المزودين والمنتجات تدريجياً بعد مراجعة البيانات.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={`صفحة ${title} داخل دليل الإمارات مع روابط المناطق والخدمات المرتبطة في الفوتر الذكي ومسارات طلب حقيقية عند توفر مزودين موثقين.`} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirateSlug}/${service.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <SecondaryHeader backUrl={`/uae/${emirateSlug}`} backLabel={`العودة إلى ${emirate.nameAr}`} />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">إمارة {emirate.nameAr}</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{title}</h1>
              <p className="text-lg text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{service.descAr}</p>
            </div>
          </section>
          <ClientRequestCard title={`تحتاج ${service.nameAr} في ${emirate.nameAr}؟`} desc="أرسل تفاصيل مشروعك وسيتم توجيه الطلب حسب النشاط والمنطقة المناسبة." buttonText="اطلب عرض سعر الآن" />
          {showAlHootPath && (
            <SeoProofCards
              title={`مسار حقيقي لخدمة ${service.nameAr} في ${emirate.nameAr}`}
              desc="تم تثبيت مربع عملي داخل صفحة النشاط يوضح أن الصفحة مرتبطة بمزود خدمة حقيقي، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة/عرض سعر عبر ملف مصنع الحوت الأبيض للرخام والجرانيت."
            />
          )}
          <SeoContent title={`${title} داخل بيت الريف`}>
            <p>هذه صفحة نشاط على مستوى الإمارة. تم نقل المدن والمناطق إلى الفوتر الذكي حتى تبقى الروابط الجغرافية موجودة بدون تعقيد رحلة المستخدم.</p>
            {showAlHootPath && <p className="mt-4">ولأن هذه الصفحة مرتبطة بمجال الرخام أو مواد البناء أو التشطيبات، تم دعمها بمسار فعلي يفتح ملف مزود خدمة داخل المنصة بدلاً من الاكتفاء بنص عام.</p>}
          </SeoContent>
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
          <UaeSmartFooter locale="ar" pageType="emirateService" emirate={emirate} service={service} />
        </main>
        <Footer />
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
              <p className="mt-3 text-gray-600 leading-8">هذه الصفحة باقية كامتداد جغرافي قديم، بينما صفحة الإمارة الرئيسية أصبحت تعرض الأنشطة مباشرة.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((item) => (
                <Link key={item.slug} href={`/uae/${emirateSlug}/${areaSlug}/${item.slug}`} className="group bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition">{item.nameAr} في {area.nameAr}</h3>
                  <p className="mt-3 text-sm text-gray-500 leading-7">{item.descAr}</p>
                </Link>
              ))}
            </div>
          </section>

          <SeoContent title={`${area.nameAr} في دليل بيت الريف`}>
            <p>صفحة {area.nameAr} داخل {emirate.nameAr} ما زالت موجودة للحفاظ على الروابط القديمة والبحث الجغرافي، بينما يتم عرض المناطق داخل الفوتر الذكي في صفحات الإمارة والنشاط.</p>
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

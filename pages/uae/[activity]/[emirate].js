import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import ClientRequestCard from '../../../components/ClientRequestCard';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../../data/siteTaxonomy';

export default function ActivityEmiratePage({ activity, emirate, activitySlug, emirateSlug }) {
  if (!activity || !emirate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">الصفحة غير موجودة</p>
      </div>
    );
  }

  const pageData = {
    title: `أفضل ${activity.nameAr} في ${emirate.nameAr}`,
    desc: `استعرض ${activity.nameAr} في ${emirate.nameAr} ومناطقها حسب التخصص ونوع المشروع.`,
    clientTitle: `تبحث عن ${activity.nameAr} في ${emirate.nameAr}؟`,
    clientDesc: `أرسل طلبك وسنساعدك في توجيهه إلى الشركات المناسبة في ${emirate.nameAr} حسب التخصص والخدمة المطلوبة.`,
  };

  const faqItems = [
    [`كيف أختار أفضل ${activity.nameAr} في ${emirate.nameAr}؟`, `ابدأ بتحديد المنطقة والتخصص، ثم راجع الترخيص والخبرة ونطاق الخدمة قبل طلب عرض السعر من ${emirate.nameAr}.`],
    ['هل يمكن طلب أكثر من عرض سعر؟', 'نعم، يمكن إرسال الطلب ليتم توجيهه إلى أكثر من مزود مناسب في نفس الإمارة.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.title} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${activitySlug}/${emirateSlug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <SecondaryHeader 
          title={pageData.title}
          breadcrumbs={[
            { label: 'دليل الإمارات', href: '/uae' },
            { label: activity.nameAr, href: `/uae/${activitySlug}` },
            { label: emirate.nameAr }
          ]}
        />

        <main>
          {/* Hero Section */}
          <section className="relative h-[40vh] md:h-[50vh] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src={`/images/seo/emirates/${emirateSlug}.webp`}
                alt={emirate.nameAr}
                fill 
                className="object-cover opacity-30" 
                priority 
              />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center md:text-right">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-4xl">
                {pageData.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-medium">
                {pageData.desc}
              </p>
            </div>
          </section>

          {/* Client Request CTA */}
          <ClientRequestCard 
            title={pageData.clientTitle}
            desc={pageData.clientDesc}
            buttonText={`اطلب ${activity.nameAr} في ${emirate.nameAr}`}
          />

          {/* Areas / Specialties Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-10 border-b border-[#E6DCC8] pb-4">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                مناطق {emirate.nameAr}
              </h2>
              <span className="text-sm font-bold text-primary bg-primary/5 px-4 py-1 rounded-full">
                {emirate.areas.length} منطقة
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {emirate.areas.map((area) => (
                <div
                  key={`${emirateSlug}-${area.slug}`}
                  className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <h3 className="font-black text-gray-900 mb-2">
                    {area.nameAr}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {activity.nameAr} في {area.nameAr}
                  </p>
                  <Link 
                    href={`#request`}
                    className="inline-block text-sm font-bold text-primary hover:text-primary-dark transition"
                  >
                    اطلب عرض سعر ←
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <SeoContent title={`${activity.nameAr} في ${emirate.nameAr}`}>
            <p>
              تتوفر خدمات {activity.nameAr} في {emirate.nameAr} ومناطقها مثل {emirate.areas.slice(0, 6).map(a => a.nameAr).join('، ')}، 
              ويهدف دليل بيت الريف إلى تنظيم الوصول إلى المزود المناسب حسب نوع المشروع والتخصص.
            </p>
            <p className="mt-4">
              يمكنك البحث عن أفضل الشركات والموردين والمصانع المتخصصة في {activity.nameAr} بسهولة عبر منصة بيت الريف، 
              مع ضمان الجودة والاحترافية من جميع مزودي الخدمات المسجلين لدينا.
            </p>
          </SeoContent>

          {/* FAQ Section */}
          <FAQ items={faqItems} />

        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { activity: activitySlug, emirate: emirateSlug } = params;
  const activity = SERVICE_CATEGORIES.find(s => s.slug === activitySlug);
  const emirate = getEmirate(emirateSlug);

  if (!activity || !emirate) {
    return { notFound: true };
  }

  return {
    props: {
      activity,
      emirate,
      activitySlug,
      emirateSlug,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const paths = [];
  
  SERVICE_CATEGORIES.forEach(service => {
    UAE_EMIRATES.forEach(emirate => {
      paths.push({
        params: {
          activity: service.slug,
          emirate: emirate.slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

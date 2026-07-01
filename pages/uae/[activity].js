import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';

export default function ActivityPage({ activity, activitySlug }) {
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">النشاط غير موجود</p>
      </div>
    );
  }

  const pageData = {
    title: `أفضل ${activity.nameAr} في الإمارات`,
    desc: `استكشف ${activity.nameAr} في جميع إمارات الدولة حسب المدينة والتخصص.`,
    clientTitle: `تحتاج ${activity.nameAr}؟`,
    clientDesc: 'أرسل طلبك وسيتم توجيهه حسب الإمارة والتخصص المناسب عبر وياك.',
  };

  const faqItems = [
    [`كيف أختار أفضل ${activity.nameAr}؟`, 'ابدأ بتحديد الإمارة والمنطقة، ثم راجع الترخيص والخبرة ونطاق الخدمة قبل طلب عرض السعر.'],
    ['هل يمكن طلب أكثر من عرض سعر؟', 'نعم، يمكن إرسال الطلب ليتم توجيهه إلى أكثر من مزود مناسب.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.title} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${activitySlug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <SecondaryHeader 
          title={activity.nameAr}
          breadcrumbs={[
            { label: 'دليل الإمارات', href: '/uae' },
            { label: activity.nameAr }
          ]}
        />

        <main>
          {/* Hero Section */}
          <section className="relative h-[40vh] md:h-[50vh] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src={`/images/seo/categories/${activitySlug}.webp`}
                alt={activity.nameAr}
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
            buttonText="ابدأ طلبك الآن"
          />

          {/* Emirates Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-10 border-b border-[#E6DCC8] pb-4">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                {activity.nameAr} في الإمارات
              </h2>
              <span className="text-sm font-bold text-primary bg-primary/5 px-4 py-1 rounded-full">
                7 إمارات
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UAE_EMIRATES.map((emirate) => (
                <Link
                  key={emirate.slug}
                  href={`/uae/${activitySlug}/${emirate.slug}`}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={`/images/seo/emirates/${emirate.slug}.webp`}
                      alt={emirate.nameAr}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 right-8 text-white">
                      <h3 className="text-2xl font-black">{emirate.nameAr}</h3>
                      <p className="text-[#D4AF37] text-xs font-bold uppercase mt-1" dir="ltr">{emirate.nameEn}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium line-clamp-2">
                      {activity.nameAr} في {emirate.nameAr}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <span className="text-sm font-bold text-[#0F3F1A] bg-[#F0F7F2] px-4 py-2 rounded-full">
                        {emirate.areas.length} منطقة
                      </span>
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">استكشف الآن ←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <SeoContent title={`${activity.nameAr} في الإمارات`}>
            <p>
              يوفر دليل بيت الريف قائمة شاملة بمزودي خدمات {activity.nameAr} في جميع إمارات الدولة. 
              ابحث عن أفضل الشركات والموردين والمصانع المتخصصة في {activity.nameAr} حسب الإمارة والمنطقة والتخصص.
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
  const { activity: activitySlug } = params;
  const activity = SERVICE_CATEGORIES.find(s => s.slug === activitySlug);

  if (!activity) {
    return { notFound: true };
  }

  return {
    props: {
      activity,
      activitySlug,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const paths = SERVICE_CATEGORIES.map(service => ({
    params: { activity: service.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import UnifiedCard from '../../components/UnifiedCard';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES, ENTITY_TYPES } from '../../data/siteTaxonomy';

export default function ActivityPage({ activity, activitySlug }) {
  if (!activity) return null;

  const pageData = {
    badge: 'نشاط رئيسي',
    h1: `أفضل ${activity.nameAr} في الإمارات`,
    desc: `استكشف ${activity.nameAr} في جميع إمارات الدولة حسب المدينة والتخصص ونوع المشروع.`,
    sectionTitle: `${activity.nameAr} حسب الإمارة`,
    clientTitle: `تحتاج ${activity.nameAr}؟`,
    clientDesc: `أرسل طلبك وسيتم توجيهه حسب الإمارة والتخصص المناسب لمشروعك عبر المساعد الذكي وياك.`,
  };

  const faqItems = [
    [`كيف أختار أفضل ${activity.nameAr} في الإمارات؟`, `نوصي بالبدء باختيار الإمارة الأقرب لمشروعك، ثم تصفح التخصصات المتاحة وطلب عروض أسعار للمقارنة بين المزودين.`],
    ['هل يغطي الدليل جميع إمارات الدولة؟', 'نعم، نغطي أبوظبي، دبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة بشكل كامل.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
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
          <section className="relative h-[400px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src={`/images/seo/categories/${activitySlug}.webp`}
                alt={activity.nameAr}
                fill 
                className="object-cover opacity-30" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-sm">
                {pageData.badge}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-4xl">
                {pageData.h1}
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
            <div className="flex items-center justify-between mb-12 border-b border-[#E6DCC8] pb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                {pageData.sectionTitle}
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UAE_EMIRATES.map((emirate) => (
                <UnifiedCard 
                  key={emirate.slug}
                  type={ENTITY_TYPES.EMIRATE}
                  entity={{
                    slug: `uae/${activitySlug}/${emirate.slug}`,
                    title: `${activity.nameAr} في ${emirate.nameAr}`,
                    image: `/images/seo/emirates/${emirate.slug}.webp`,
                    emirate: emirate.nameAr,
                    city: `${emirate.areas.length} منطقة نشطة`,
                    description: `استكشف أفضل شركات ${activity.nameAr} في إمارة ${emirate.nameAr} ومناطقها.`,
                    isFeatured: true,
                    services: activity.subCategories?.slice(0, 6).map(s => s.nameAr) || []
                  }}
                />
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <SeoContent title={`${activity.nameAr} في دولة الإمارات`}>
            <div className="space-y-6">
              <p>
                نحن نوفر لك وصولاً مباشراً إلى نخبة مزودي خدمات {activity.nameAr} في الإمارات. سواء كنت تبحث عن شركات كبرى أو ورش متخصصة، فإن دليلنا يغطي كافة الاحتياجات لضمان نجاح مشروعك.
              </p>
              <p>
                يتم تحديث قائمة المزودين باستمرار للتأكد من دقة البيانات وتوفر الخدمات في جميع الإمارات السبع، مع التركيز على الجودة والاحترافية في التنفيذ.
              </p>
            </div>
          </SeoContent>

          {/* FAQ Section */}
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${activity.nameAr}`} />

        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { activity: activitySlug } = params;
  const activity = SERVICE_CATEGORIES.find(s => s.slug === activitySlug);

  if (!activity) return { notFound: true };

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

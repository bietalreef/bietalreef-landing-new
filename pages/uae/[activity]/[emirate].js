import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import ClientRequestCard from '../../../components/ClientRequestCard';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../../data/siteTaxonomy';

export default function ActivityEmirateLanding({ activity, emirate, activitySlug, emirateSlug }) {
  if (!activity || !emirate) return null;

  const pageData = {
    badge: `إمارة ${emirate.nameAr}`,
    h1: `أفضل ${activity.nameAr} في ${emirate.nameAr}`,
    desc: `استعرض ${activity.nameAr} في ${emirate.nameAr} ومناطقها مثل ${emirate.areas.slice(0, 5).map(a => a.nameAr).join('، ')} حسب التخصص ونوع المشروع.`,
    sectionTitle: `التخصصات المتاحة في ${emirate.nameAr}`,
    clientTitle: `تبحث عن ${activity.nameAr} في ${emirate.nameAr}؟`,
    clientDesc: `أرسل طلبك وسنساعدك في توجيهه إلى الشركات المناسبة في ${emirate.nameAr} حسب التخصص والخدمة المطلوبة عبر وياك.`,
  };

  const faqItems = [
    [`كيف أختار أفضل ${activity.nameAr} في ${emirate.nameAr}؟`, `ابدأ بتحديد التخصص والمنطقة، ثم راجع الترخيص والخبرة ونطاق الخدمة قبل طلب عرض السعر من مزودي الخدمات في ${emirate.nameAr}.`],
    ['هل يمكن طلب أكثر من عرض سعر؟', 'نعم، يمكنك إرسال طلبك عبر المساعد الذكي "وياك" ليتم توجيهه إلى أكثر من مزود خدمة مناسب في نفس الإمارة.'],
    [`ما هي المناطق التي يغطيها الدليل في ${emirate.nameAr}؟`, `نغطي جميع مناطق ${emirate.nameAr} بما في ذلك ${emirate.areas.slice(0, 8).map(a => a.nameAr).join('، ')} وغيرها من الأحياء الحيوية.`],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${activitySlug}/${emirateSlug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <SecondaryHeader 
          title={pageData.h1}
          breadcrumbs={[
            { label: 'دليل الإمارات', href: '/uae' },
            { label: activity.nameAr, href: `/uae/${activitySlug}` },
            { label: emirate.nameAr }
          ]}
        />

        <main>
          {/* Hero Section */}
          <section className="relative h-[450px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src={`/images/seo/emirates/${emirateSlug}.webp`}
                alt={pageData.h1}
                fill 
                className="object-cover opacity-30" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0F3F1A] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                {pageData.badge}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-4xl">
                {pageData.h1}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-medium mb-10">
                {pageData.desc}
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#B8962E] text-white font-black px-10 py-4 rounded-xl transition-all shadow-xl hover:scale-105">
                إضافة شركتي في {emirate.nameAr}
              </button>
            </div>
          </section>

          {/* Client Request Card */}
          <ClientRequestCard 
            title={pageData.clientTitle}
            desc={pageData.clientDesc}
            buttonText={`اطلب عرض سعر في ${emirate.nameAr}`}
          />

          {/* Specialties / Areas Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-12 border-b border-[#E6DCC8] pb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                {pageData.sectionTitle}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {emirate.areas.map((area) => (
                <div
                  key={area.slug}
                  className="group bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition">
                    <span className="text-primary text-xl">📍</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {activity.nameAr} في {area.nameAr}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    استكشف أفضل مزودي خدمات {activity.nameAr} المتواجدين في منطقة {area.nameAr} بـ {emirate.nameAr}.
                  </p>
                  <button className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                    اطلب الآن <span dir="ltr">←</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <SeoContent title={`${activity.nameAr} في ${emirate.nameAr} - دليل بيت الريف`}>
            <p>
              تعتبر خدمات {activity.nameAr} من الركائز الأساسية في قطاع البناء والتشييد في {emirate.nameAr}. 
              نحن في بيت الريف نهدف إلى تسهيل عملية البحث والوصول إلى أفضل الشركات المتخصصة والموثوقة.
            </p>
            <p className="mt-4">
              يغطي دليلنا كافة مناطق {emirate.nameAr} الحيوية، مما يضمن لك العثور على مزود الخدمة الأقرب لمشروعك، 
              سواء كان مشروعاً سكنياً أو تجارياً أو صناعياً.
            </p>
          </SeoContent>

          {/* FAQ */}
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${activity.nameAr} في ${emirate.nameAr}`} />

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

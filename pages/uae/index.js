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

export default function UAEDirectoryHome() {
  const pageData = {
    badge: 'دليل الإمارات',
    h1: 'دليل الإمارات لمزودي خدمات المقاولات والبناء',
    desc: 'اكتشف الشركات والموردين والمصانع ومزودي الخدمات في الإمارات حسب النشاط والإمارة والتخصص.',
    sectionTitle: 'تصفح إمارات الدولة',
    clientTitle: 'تبحث عن شركة أو مزود خدمة؟',
    clientDesc: 'أرسل طلبك وسنساعدك في توجيهه حسب الإمارة والتخصص ونوع المشروع عبر وكيلنا الذكي وياك.',
    buttonText: 'ابدأ طلبك الآن'
  };

  const faqItems = [
    ['ما هو دليل الإمارات في بيت الريف؟', 'هو محرك بحث وتنظيم جغرافي يربط أصحاب المشاريع بمزودي الخدمات في كل إمارة ومنطقة في الدولة.'],
    ['هل تصفح الدليل وإرسال الطلبات مجاني؟', 'نعم، تصفح الدليل واستخدام وكيلنا الذكي وياك لإرسال الطلبات مجاني تماماً للعملاء.'],
    ['كيف أضيف شركتي إلى الدليل؟', 'يمكنك الضغط على زر "إضافة شركتي" أو التواصل معنا لتوثيق ملفك التجاري وظهوره في نتائج البحث.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href="https://bietalreef.ae/uae" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        {/* Unified Secondary Header with Breadcrumb */}
        <SecondaryHeader 
          title={pageData.badge}
          breadcrumbs={[]}
        />

        <main>
          {/* Hero Section */}
          <section className="relative h-[40vh] md:h-[50vh] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bait-alreef-uae-smart-network-coverage.webp" 
                alt={pageData.h1} 
                fill 
                className="object-cover opacity-30" 
                priority 
              />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center md:text-right">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-4xl">
                {pageData.h1}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-medium mb-8">
                {pageData.desc}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="#directory" className="bg-[#D4AF37] text-white font-black px-8 py-3 rounded-full hover:bg-[#B8962E] transition shadow-lg">
                  تصفح الدليل
                </Link>
                <Link href="/providers" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-black px-8 py-3 rounded-full hover:bg-white/20 transition">
                  إضافة شركتي
                </Link>
              </div>
            </div>
          </section>

          {/* Client Request CTA */}
          <ClientRequestCard 
            title={pageData.clientTitle}
            desc={pageData.clientDesc}
            buttonText={pageData.buttonText}
          />

          {/* Activities Grid */}
          <section id="directory" className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-10 border-b border-[#E6DCC8] pb-4">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                تصفح حسب نوع النشاط
              </h2>
              <span className="text-sm font-bold text-primary bg-primary/5 px-4 py-1 rounded-full">
                {SERVICE_CATEGORIES.length} نشاط
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICE_CATEGORIES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/uae/${service.slug}`}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl" aria-hidden="true">{service.icon}</span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-primary transition">
                      {service.nameAr}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium line-clamp-2">
                      {service.descAr}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <span className="text-sm font-bold text-[#0F3F1A] bg-[#F0F7F2] px-4 py-2 rounded-full">
                        {UAE_EMIRATES.length} إمارات
                      </span>
                      <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform">استكشف الآن ←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>



          {/* SEO Content Section */}
          <SeoContent title="دليل الإمارات للمقاولات والبناء">
            <p>
              يساعد دليل بيت الريف العملاء على الوصول إلى مزودي خدمات المقاولات والبناء في الإمارات حسب النشاط والإمارة والتخصص، مع تنظيم واضح يخدم البحث في Google ومحركات الذكاء الاصطناعي.
            </p>
            <p className="mt-4">
              نغطي في هذا الدليل جميع إمارات الدولة السبع (أبوظبي، دبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة)، مع تفاصيل دقيقة للمناطق والأحياء لضمان وصولك لأقرب مزود خدمة لموقع مشروعك.
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

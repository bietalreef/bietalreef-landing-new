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
    sectionTitle: 'تصفح الأنشطة الرئيسية',
    clientTitle: 'تبحث عن شركة أو مزود خدمة؟',
    clientDesc: 'أرسل طلبك وسنساعدك في توجيهه حسب الإمارة والتخصص ونوع المشروع عبر وكيلنا الذكي وياك.',
    buttonText: 'ابدأ طلبك الآن'
  };

  const faqItems = [
    ['ما هو دليل الإمارات في بيت الريف؟', 'هو محرك بحث وتنظيم جغرافي يربط أصحاب المشاريع بمزودي الخدمات في كل إمارة ومنطقة في الدولة، مع توفير بيانات دقيقة لكل تخصص.'],
    ['هل تصفح الدليل وإرسال الطلبات مجاني؟', 'نعم، تصفح الدليل واستخدام وكيلنا الذكي وياك لإرسال الطلبات مجاني تماماً للعملاء، وهدفنا هو تسهيل الوصول للمزود المناسب.'],
    ['كيف أختار المزود المناسب من الدليل؟', 'نوصي بمراجعة ملف المزود، والاطلاع على المشاريع السابقة، والتأكد من نطاق التغطية الجغرافية قبل طلب عرض السعر.'],
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
        
        <SecondaryHeader 
          title={pageData.badge}
          breadcrumbs={[]}
        />

        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bait-alreef-uae-smart-network-coverage.webp" 
                alt={pageData.h1} 
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
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-medium mb-8">
                {pageData.desc}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="#directory" className="bg-[#D4AF37] text-white font-black px-8 py-3 rounded-xl hover:bg-[#B8962E] transition shadow-lg hover:scale-105">
                  تصفح الأنشطة
                </Link>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-black px-8 py-3 rounded-xl hover:bg-white/20 transition">
                  إضافة شركتي
                </button>
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
            <div className="flex items-center justify-between mb-12 border-b border-[#E6DCC8] pb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                {pageData.sectionTitle}
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICE_CATEGORIES.map((service) => (
                <UnifiedCard 
                  key={service.slug}
                  type={ENTITY_TYPES.EMIRATE} // نستخدمه كقالب للنشاط في هذه الصفحة
                  entity={{
                    slug: `uae/${service.slug}`,
                    title: service.nameAr,
                    image: `/images/seo/categories/${service.slug}.webp`,
                    emirate: 'نشاط رئيسي',
                    city: '7 إمارات',
                    description: service.descAr,
                    isFeatured: true,
                    services: service.subCategories?.map(s => s.nameAr) || []
                  }}
                />
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <SeoContent title="دليل الإمارات للمقاولات والبناء - بيت الريف">
            <div className="space-y-6">
              <p>
                يعد دليل بيت الريف المرجع الأول في دولة الإمارات العربية المتحدة للوصول إلى مزودي خدمات المقاولات والبناء. نحن نهدف إلى تنظيم السوق وربط أصحاب المشاريع بالشركات الموثوقة والموردين والمصانع في جميع أنحاء الدولة.
              </p>
              <p>
                من خلال هذا الدليل، يمكنك البحث حسب النشاط (مثل المقاولات العامة، التصميم الداخلي، أو الصيانة) ثم اختيار الإمارة المطلوبة للوصول إلى أدق التفاصيل الجغرافية والتخصصات المتاحة.
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl border-r-4 border-primary">
                <h3 className="font-black text-primary mb-2">لماذا تستخدم دليل بيت الريف؟</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>تنظيم جغرافي دقيق يغطي كافة مناطق الدولة.</li>
                  <li>تخصصات متنوعة تشمل كافة مراحل البناء والتشييد.</li>
                  <li>سهولة الوصول إلى مزودي الخدمات عبر المساعد الذكي وياك.</li>
                  <li>بيانات محدثة وموثقة لضمان أفضل تجربة للمستخدم.</li>
                </ul>
              </div>
            </div>
          </SeoContent>

          {/* FAQ Section */}
          <FAQ items={faqItems} title="أسئلة شائعة حول دليل الإمارات" />

        </main>
        <Footer />
      </div>
    </>
  );
}

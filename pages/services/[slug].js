import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import SEOHead from '../../components/SEOHead';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';
import { getSectorCardImage } from '../../lib/sectorCards';
import SectionBackBar from '../../components/SectionBackBar';

const SITE_URL = 'https://bietalreef.ae';

const customServices = {
  workshops: {
    slug: 'workshops',
    nameAr: 'الورش الصناعية',
    nameEn: 'Industrial Workshops',
    icon: '🏭',
    descAr: 'ورش حدادة، نجارة، ألمنيوم، رخام وزجاج بأعلى معايير الجودة.'
  }
};

const aliases = {
  construction: 'general-contracting',
  maintenance: 'general-maintenance',
  cleaning: 'cleaning-services',
  welding: 'aluminium-glass',
  'project-management': 'general-contracting',
  'interior-design': 'interior-design',
  'equipment-rental': 'equipment-rental',
  'building-materials': 'building-materials',
  'furniture-decoration': 'furniture-decor',
  'furniture-decor': 'furniture-decor',
  'engineering-consultation': 'engineering-consultants',
};

export default function ServiceLandingPage({ service }) {
  const title = `${service.nameAr} | الخدمات والعروض`;
  const desc = `صفحة مخصصة لخدمة ${service.nameAr} داخل قسم الخدمات والعروض في بيت الريف، بعيدًا عن مسارات دليل الإمارات أو المنتجات.`;
  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const isWorkshopsPage = service.slug === 'workshops';
  const faqItems = [
    [`ما هي خدمة ${service.nameAr}؟`, service.descAr],
    ['هل هذه الصفحة من دليل الإمارات؟', 'لا. هذه الصفحة تابعة لقسم الخدمات والعروض. البحث حسب المكان يتم من دليل الإمارات، أما هذه الصفحة فهي للخدمة نفسها.'],
    ['كيف أطلب عرض سعر؟', 'أرسل تفاصيل المشروع، الموقع، الصور أو المقاسات المتاحة حتى يتم توجيه الطلب بطريقة صحيحة.'],
  ];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.nameAr,
      description: service.descAr,
      url: serviceUrl,
      serviceType: service.nameAr,
      areaServed: UAE_EMIRATES.map((emirate) => ({ '@type': 'AdministrativeArea', name: emirate.nameAr })),
      provider: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL, logo: `${SITE_URL}/logo.png` },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl, servicePhone: '+971567856001' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    },
  ];

  return (
    <>
      <SEOHead title={`${title} | بيت الريف`} description={desc} keywords={`${service.nameAr}, خدمات ${service.nameAr}, عروض ${service.nameAr}, مقاولات الإمارات, بيت الريف`} canonicalPath={`/services/${service.slug}`} ogImage={`${SITE_URL}${getSectorCardImage(service.slug)}`} structuredData={structuredData} breadcrumbs={[{ name: 'الخدمات والعروض', href: '/services' }, { name: service.nameAr, href: `/services/${service.slug}` }]} />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="الخدمات والعروض" />
        <SectionBackBar href="/services" label="العودة إلى الخدمات والعروض" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F4D35E]">الخدمات والعروض</span>
              <div className="mt-6 text-5xl">{service.icon}</div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight">{service.nameAr}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 mx-auto md:mx-0">{service.descAr}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">اطلب عرض سعر</a><Link href="/services" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">كل الخدمات والعروض</Link></div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['وصف الخدمة', 'طلب عرض سعر', 'اختيار المكان'].map((item, index) => (
                <div key={item} className="rounded-3xl bg-white border border-[#E6DCC8] p-7 shadow-sm"><span className="text-sm font-black text-[#6F5400]">0{index + 1}</span><h2 className="mt-3 text-xl font-black text-[#0F3F1A]">{item}</h2><p className="mt-3 text-sm leading-8 text-gray-600">{index === 0 && `تعرف على نطاق ${service.nameAr} وما يناسب مشروعك.`}{index === 1 && 'أرسل تفاصيل المشروع لتحصل على توجيه مناسب بدل الأسعار العشوائية.'}{index === 2 && 'إذا كنت تبحث حسب المدينة، انتقل إلى دليل الإمارات لاختيار الإمارة والمنطقة.'}</p></div>
              ))}
            </div>
          </section>

          {false && isWorkshopsPage && (
            <section className="max-w-6xl mx-auto px-4 py-10" aria-label="إعلان مصنع الحوت">
              <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-[#071A12] shadow-2xl shadow-[#8A6A00]/15">
                <div className="grid lg:grid-cols-[1.05fr_1.35fr]">
                  <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#1A5C28_0%,#071A12_58%,#020B06_100%)] p-8 text-white md:p-10">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent_0%,#D4AF37_45%,transparent_70%)]" />
                    <div className="relative z-10">
                      <span className="inline-flex rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-black text-[#F3D46B]">بطاقة إعلان مميزة</span>
                      <h2 className="mt-5 text-3xl md:text-5xl font-black leading-tight">مصنع الحوت الأبيض<br />للرخام والجرانيت</h2>
                      <p className="mt-5 text-base leading-8 text-white/85">توريد وتصنيع وتركيب الرخام والجرانيت والكوارتز للمطابخ والواجهات والأرضيات في العين وأبوظبي وجميع أنحاء الإمارات.</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 md:p-10">
                    <div className="flex flex-wrap gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">موثق</span><span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">مزود خدمة</span><span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">الورش الصناعية</span></div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-4">{['رخام طبيعي', 'جرانيت', 'كوارتز', 'تركيب احترافي'].map((item) => <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>)}</div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white hover:bg-[#D4AF37] hover:text-[#0F3F1A] transition">افتح ملف المصنع</Link><a href="https://wa.me/971506623518" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] hover:bg-[#FFF8E5] transition">تواصل واتساب</a></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="max-w-6xl mx-auto px-4 py-10" aria-label="العروض المتاحة"><div className="rounded-3xl border border-[#E6DCC8] bg-white p-10 text-center shadow-sm" role="status"><h2 className="text-2xl font-black text-[#0F3F1A]">لا توجد عروض متاحة حاليًا</h2><p className="mt-3 text-gray-600 leading-8">لا يوجد عرض جاهز مرتبط بخدمة {service.nameAr} الآن. يمكنك طلب عرض سعر مخصص حسب تفاصيل مشروعك.</p><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-2xl bg-primary px-7 py-3 text-sm font-black text-white">اطلب عرض سعر مخصص</a></div></section>

          <section className="max-w-6xl mx-auto px-4 py-10"><div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm"><h2 className="text-2xl font-black text-[#0F3F1A] mb-5">اختر الإمارة عند الحاجة للبحث المحلي</h2><div className="flex flex-wrap gap-3">{UAE_EMIRATES.map((emirate) => (<Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:text-primary hover:border-primary">{emirate.nameAr}</Link>))}</div></div></section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${service.nameAr}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const rawSlug = params?.slug;
  const serviceSlug = aliases[rawSlug] || rawSlug;
  const service = customServices[serviceSlug] || getServiceCategory(serviceSlug);
  if (!service) return { notFound: true };
  return { props: { service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: [...SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })), { params: { slug: 'workshops' } }],
    fallback: 'blocking',
  };
}

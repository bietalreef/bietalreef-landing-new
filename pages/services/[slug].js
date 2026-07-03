import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';

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
  const faqItems = [
    [`ما هي خدمة ${service.nameAr}؟`, service.descAr],
    ['هل هذه الصفحة من دليل الإمارات؟', 'لا. هذه الصفحة تابعة لقسم الخدمات والعروض. البحث حسب المكان يتم من دليل الإمارات، أما هذه الصفحة فهي للخدمة نفسها.'],
    ['كيف أطلب عرض سعر؟', 'أرسل تفاصيل المشروع، الموقع، الصور أو المقاسات المتاحة حتى يتم توجيه الطلب بطريقة صحيحة.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`https://bietalreef.ae/services/${service.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="الخدمات والعروض" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">
                الخدمات والعروض
              </span>
              <div className="mt-6 text-5xl">{service.icon}</div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight">{service.nameAr}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 mx-auto md:mx-0">{service.descAr}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">
                  اطلب عرض سعر
                </a>
                <Link href="/services" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">
                  كل الخدمات والعروض
                </Link>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['وصف الخدمة', 'طلب عرض سعر', 'اختيار المكان'].map((item, index) => (
                <div key={item} className="rounded-3xl bg-white border border-[#E6DCC8] p-7 shadow-sm">
                  <span className="text-sm font-black text-[#D4AF37]">0{index + 1}</span>
                  <h2 className="mt-3 text-xl font-black text-[#0F3F1A]">{item}</h2>
                  <p className="mt-3 text-sm leading-8 text-gray-600">
                    {index === 0 && `تعرف على نطاق ${service.nameAr} وما يناسب مشروعك.`}
                    {index === 1 && 'أرسل تفاصيل المشروع لتحصل على توجيه مناسب بدل الأسعار العشوائية.'}
                    {index === 2 && 'إذا كنت تبحث حسب المدينة، انتقل إلى دليل الإمارات لاختيار الإمارة والمنطقة.'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">اختر الإمارة عند الحاجة للبحث المحلي</h2>
              <div className="flex flex-wrap gap-3">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:text-primary hover:border-primary">
                    {emirate.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>

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
  const service = getServiceCategory(serviceSlug);
  if (!service) return { notFound: true };
  return { props: { service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })),
    fallback: 'blocking',
  };
}

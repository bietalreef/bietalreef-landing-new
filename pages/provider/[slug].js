import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';

function titleFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function pickService(slug) {
  const matched = SERVICE_CATEGORIES.find((service) => slug.includes(service.slug));
  return matched || SERVICE_CATEGORIES.find((service) => service.slug === 'interior-design') || SERVICE_CATEGORIES[0];
}

function buildProvider(slug) {
  const service = pickService(slug);
  const emirate = UAE_EMIRATES.find((item) => item.slug === 'abu-dhabi') || UAE_EMIRATES[0];
  const area = emirate?.areas?.find((item) => item.slug === 'al-ain') || emirate?.areas?.[0];
  return {
    slug,
    name: titleFromSlug(slug),
    service,
    emirate,
    area,
    description: `صفحة هبوط عامة لمزود خدمة ${service.nameAr} داخل بيت الريف. هذه الصفحة مخصصة للأرشفة والتعريف العام وربط العميل بمنصة بيت الريف دون عرض بيانات تشغيلية خاصة.`,
    services: [service.nameAr, 'طلب عرض سعر', 'زيارة ومعاينة', 'تنسيق تنفيذ المشروع'],
  };
}

export default function ProviderLandingPage({ provider }) {
  const canonicalPath = `/provider/${provider.slug}`;
  const providerSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `https://bietalreef.ae${canonicalPath}#provider`,
    name: provider.name,
    description: provider.description,
    url: `https://bietalreef.ae${canonicalPath}`,
    areaServed: [provider.emirate?.nameAr, provider.area?.nameAr].filter(Boolean).join(' - '),
    serviceType: provider.service.nameAr,
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.area?.nameAr || 'الإمارات',
      addressRegion: provider.emirate?.nameAr || 'الإمارات',
      addressCountry: 'AE',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `كيف أطلب خدمة من ${provider.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكنك طلب الخدمة من خلال منصة بيت الريف أو التواصل عبر زر طلب عرض السعر الموجود في الصفحة.',
        },
      },
      {
        '@type': 'Question',
        name: 'هل صفحة مزود الخدمة عامة أم تشغيلية؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'هذه صفحة هبوط عامة للأرشفة والتعريف فقط، أما إدارة الطلبات والبيانات التشغيلية فتتم داخل تطبيق بيت الريف.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${provider.name} | ${provider.service.nameAr} في ${provider.area?.nameAr || 'الإمارات'} | بيت الريف`}
        description={provider.description}
        keywords={`${provider.name}, ${provider.service.nameAr}, ${provider.area?.nameAr || ''}, ${provider.emirate?.nameAr || ''}, بيت الريف, مزود خدمة`}
        canonicalPath={canonicalPath}
        alternatePath={`/en/provider/${provider.slug}`}
        structuredData={[providerSchema, faqSchema]}
        breadcrumbs={[
          { name: 'مزودو الخدمات', item: 'https://bietalreef.ae/providers' },
          { name: provider.name, item: `https://bietalreef.ae${canonicalPath}` },
        ]}
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-[#D4AF37] font-black mb-3">ملف مزود خدمة عام</p>
              <h1 className="text-3xl md:text-5xl font-black mb-5">{provider.name}</h1>
              <p className="text-white/80 max-w-3xl leading-8">{provider.description}</p>
              <div className="flex flex-wrap gap-2 mt-6 text-sm">
                <Link href={`/categories/${provider.service.slug}`} className="rounded-full bg-white/10 border border-white/20 px-4 py-2 hover:bg-white hover:text-[#0F3F1A] transition">{provider.service.nameAr}</Link>
                {provider.emirate && <Link href={`/uae/${provider.emirate.slug}`} className="rounded-full bg-white/10 border border-white/20 px-4 py-2 hover:bg-white hover:text-[#0F3F1A] transition">{provider.emirate.nameAr}</Link>}
                {provider.emirate && provider.area && <Link href={`/uae/${provider.emirate.slug}/${provider.area.slug}`} className="rounded-full bg-white/10 border border-white/20 px-4 py-2 hover:bg-white hover:text-[#0F3F1A] transition">{provider.area.nameAr}</Link>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="https://app.bietalreef.ae" className="px-7 py-3 rounded-full bg-[#D4AF37] text-[#0F3F1A] font-black text-center hover:bg-[#c49b2e] transition">اطلب الخدمة من التطبيق</a>
                <a href="https://wa.me/971567856001" className="px-7 py-3 rounded-full border-2 border-white text-white font-bold text-center hover:bg-white hover:text-[#0F3F1A] transition">تواصل مع بيت الريف</a>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">نبذة عامة</h2>
              <p className="text-gray-600 leading-8 mb-6">هذه الصفحة مأخوذة كقالب عام من منطق صفحة مزود الخدمة في Figmawebapp، وتم تبسيطها داخل الموقع التعريفي لتكون مناسبة للأرشفة فقط دون تحويل الموقع إلى تطبيق.</p>
              <h3 className="font-black text-lg mb-3">الخدمات العامة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {provider.services.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#FDFBF7] border border-[#E6DCC8] p-4 font-bold text-gray-700">✓ {item}</div>
                ))}
              </div>
            </div>
            <aside className="bg-white rounded-3xl border border-[#E6DCC8] p-6 shadow-sm h-fit">
              <h2 className="text-xl font-black text-[#0F3F1A] mb-4">معلومات الصفحة</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li><strong>التخصص:</strong> {provider.service.nameAr}</li>
                <li><strong>الإمارة:</strong> {provider.emirate?.nameAr || 'الإمارات'}</li>
                <li><strong>المدينة/المنطقة:</strong> {provider.area?.nameAr || 'حسب مناطق الخدمة'}</li>
                <li><strong>نوع الصفحة:</strong> صفحة هبوط عامة للأرشفة</li>
              </ul>
            </aside>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  return { props: { provider: buildProvider(params.slug) }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

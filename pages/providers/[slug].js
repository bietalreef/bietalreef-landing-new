import Head from 'next/head';
import Link from 'next/link';
import { providers } from '../../data/providers';
import { SERVICE_CATEGORIES, getEmirate, getArea } from '../../data/siteTaxonomy';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProviderPage({ provider, emirate, area }) {
  if (!provider) {
    return (
      <>
        <Head>
          <title>مزود الخدمة غير موجود | بيت الريف</title>
        </Head>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">مزود الخدمة غير موجود</h1>
            <Link href="/providers" className="text-[#B8922B] hover:underline">
              العودة إلى قائمة المزودين
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const mainCategory = SERVICE_CATEGORIES.find(cat => provider.services?.some(s => s.toLowerCase().includes(cat.slug.split('-')[0])));
  const breadcrumbs = [
    { label: 'الرئيسية', url: '/' },
    { label: 'مزودو الخدمات', url: '/providers' },
    { label: emirate?.nameAr, url: `/uae/${emirate?.slug}` },
    { label: area?.nameAr, url: `/uae/${emirate?.slug}/${area?.slug}` },
    { label: provider.nameAr }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: provider.nameAr,
    alternateName: provider.nameEn,
    description: provider.descriptionAr,
    url: `https://bietalreef.ae/providers/${provider.slug}`,
    telephone: provider.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: area?.nameAr,
      addressLocality: emirate?.nameAr,
      addressCountry: 'AE'
    },
    areaServed: provider.serviceAreas?.map(areaSlug => {
      const areaObj = emirate?.areas?.find(a => a.slug === areaSlug);
      return areaObj?.nameAr || areaSlug;
    }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: provider.phone,
      availableLanguage: ['ar', 'en']
    },
    sameAs: provider.whatsapp ? [`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`] : []
  };

  return (
    <>
      <Head>
        <title>{provider.nameAr} | بيت الريف</title>
        <meta name="description" content={provider.descriptionAr} />
        <meta name="keywords" content={`${provider.nameAr}, ${provider.services?.join(', ')}, ${emirate?.nameAr}`} />
        <link rel="canonical" href={`https://bietalreef.ae/providers/${provider.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={provider.nameAr} />
        <meta property="og:description" content={provider.descriptionAr} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={`https://bietalreef.ae/providers/${provider.slug}`} />
        <meta property="og:image" content={`https://bietalreef.ae${provider.cover}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={provider.nameAr} />
        <meta name="twitter:description" content={provider.descriptionAr} />
        <meta name="twitter:image" content={`https://bietalreef.ae${provider.cover}`} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Breadcrumb */}
        <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx}>
              {crumb.url ? (
                <Link href={crumb.url} className="text-[#B8922B] hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-10">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-10 h-64 bg-gray-200">
            {provider.cover && (
              <img src={provider.cover} alt={provider.nameAr} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <div className="flex items-center gap-4">
                {provider.logo && (
                  <img src={provider.logo} alt={provider.nameAr} className="w-20 h-20 rounded-lg bg-white p-2" />
                )}
                <div>
                  <h1 className="text-3xl font-black text-white">{provider.nameAr}</h1>
                  {provider.verified && (
                    <p className="text-green-300 text-sm">✔ مزود خدمة معتمد داخل بيت الريف</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <a href={`tel:${provider.phone}`} className="bg-white p-4 rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition">
              <p className="text-gray-600 text-sm">رقم الهاتف</p>
              <p className="text-xl font-bold text-[#0F3F1A]">{provider.phone}</p>
            </a>
            <a href={`https://wa.me/${provider.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition">
              <p className="text-gray-600 text-sm">واتساب</p>
              <p className="text-xl font-bold text-[#0F3F1A]">تواصل مباشرة</p>
            </a>
            <button className="bg-[#B8922B] text-white p-4 rounded-lg hover:bg-[#9a7a23] transition">
              <p className="text-sm">طلب عرض سعر</p>
              <p className="font-bold">اطلب الآن</p>
            </button>
          </div>

          {/* About Section */}
          <section className="bg-white rounded-lg p-6 mb-10 border border-[#E6DCC8]">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">عن النشاط</h2>
            <p className="text-gray-700 leading-8 mb-4">{provider.descriptionAr}</p>
          </section>

          {/* Services Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">الخدمات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {provider.services?.map((service, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition">
                  <p className="font-bold text-[#0F3F1A]">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Service Areas Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">مناطق الخدمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.serviceAreas?.map((areaSlug) => {
                const areaObj = emirate?.areas?.find(a => a.slug === areaSlug);
                return (
                  <Link key={areaSlug} href={`/uae/${emirate?.slug}/${areaSlug}`} className="bg-white p-4 rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition">
                    <p className="font-bold text-[#0F3F1A]">{areaObj?.nameAr}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* FAQ Section */}
          {provider.faq?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                {provider.faq.map((item, idx) => (
                  <details key={idx} className="bg-white p-4 rounded-lg border border-[#E6DCC8] cursor-pointer">
                    <summary className="font-bold text-[#0F3F1A]">{item.question}</summary>
                    <p className="text-gray-700 mt-3 leading-7">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Services Section */}
          {mainCategory && (
            <section className="mb-10">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">خدمات مرتبطة</h2>
              <Link href={`/categories/${mainCategory.slug}`} className="bg-white p-6 rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition block">
                <p className="text-[#B8922B] font-bold mb-2">{mainCategory.nameAr}</p>
                <p className="text-gray-700">{mainCategory.descAr}</p>
              </Link>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-[#0F3F1A] text-white rounded-lg p-8 text-center mb-10">
            <h2 className="text-2xl font-black mb-4">هل تقدم خدمات مشابهة؟</h2>
            <p className="mb-6">انضم إلى شبكة مزودي الخدمات في بيت الريف وزد من ظهورك في محركات البحث</p>
            <Link href="/join-provider" className="bg-[#B8922B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#9a7a23] transition inline-block">
              سجل مزود خدمة
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const provider = providers.find(p => p.slug === params.slug);
  
  if (!provider) {
    return { notFound: true };
  }

  const emirate = getEmirate(provider.emirate);
  const area = emirate?.areas?.find(a => a.slug === provider.area);

  return {
    props: {
      provider: provider || null,
      emirate: emirate || null,
      area: area || null
    },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  return {
    paths: providers.map(provider => ({
      params: { slug: provider.slug }
    })),
    fallback: 'blocking'
  };
}

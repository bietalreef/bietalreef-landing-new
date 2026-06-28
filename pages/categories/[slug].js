import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';

export default function CategoryPage({ service, relatedProviders }) {
  return (
    <>
      <Head>
        <title>{`${service.nameAr} في الإمارات | بيت الريف`}</title>
        <meta name="description" content={`دليل ${service.nameAr} في الإمارات عبر بيت الريف. اختر الإمارة أو المنطقة للوصول إلى صفحة خدمة محلية مخصصة.`} />
        <link rel="canonical" href={`https://bietalreef.ae/categories/${service.slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">التخصصات</p>
          <div className="flex items-center gap-4 mb-5">
            <div className="text-4xl">{service.icon}</div>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A]">{service.nameAr} في الإمارات</h1>
          </div>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">{service.descAr} اختر الإمارة أو المنطقة المناسبة للوصول إلى صفحة محلية أدق ضمن موقع بيت الريف.</p>

          {/* Providers Section */}
          {relatedProviders.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">مزودو الخدمات المتخصصون</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProviders.map((provider) => (
                  <Link key={provider.slug} href={`/providers/${provider.slug}`} className="bg-white rounded-lg border border-[#E6DCC8] hover:border-[#B8922B] transition overflow-hidden group">
                    <div className="relative h-32 bg-gray-200 overflow-hidden">
                      {provider.cover && (
                        <img src={provider.cover} alt={provider.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {provider.logo && (
                          <img src={provider.logo} alt={provider.nameAr} className="w-12 h-12 rounded bg-gray-100 p-1 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#0F3F1A] truncate">{provider.nameAr}</h3>
                          {provider.verified && (
                            <p className="text-xs text-green-600">✔ معتمد</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{provider.descriptionAr}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#B8922B] font-bold">عرض الصفحة →</span>
                        <a href={`tel:${provider.phone}`} onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#0F3F1A]">
                          {provider.phone}
                        </a>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-[#0F3F1A] text-white rounded-lg p-8 mb-14 text-center">
            <h2 className="text-2xl font-black mb-3">هل تقدم هذه الخدمة؟</h2>
            <p className="mb-6">انضم الآن إلى شبكة مزودي الخدمات في بيت الريف</p>
            <Link href="/join-provider" className="bg-[#B8922B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#9a7a23] transition inline-block">
              سجل مزود خدمة
            </Link>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UAE_EMIRATES.map((emirate) => (
              <div key={emirate.slug} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm">
                <Link href={`/uae/${emirate.slug}`} className="font-black text-[#0F3F1A] hover:text-[#B8922B] block mb-3">{emirate.nameAr}</Link>
                <div className="flex flex-wrap gap-2">
                  {emirate.areas.slice(0, 8).map((area) => (
                    <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="text-xs border border-[#E6DCC8] rounded-full px-3 py-1 text-gray-600 hover:text-[#0F3F1A] hover:border-[#D4AF37]">
                      {area.nameAr}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const service = getServiceCategory(params.slug);
  if (!service) return { notFound: true };
  
  // Filter providers that match this service category
  const relatedProviders = providers.filter(provider => {
    // Check if provider's services include keywords from this category
    const categoryKeywords = params.slug.split('-');
    return provider.services?.some(service => 
      categoryKeywords.some(keyword => service.toLowerCase().includes(keyword))
    );
  });
  
  return { props: { service, relatedProviders }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })),
    fallback: 'blocking'
  };
}

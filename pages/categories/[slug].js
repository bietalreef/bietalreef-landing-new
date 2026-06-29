import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';

export default function CategoryPage({ service, relatedProviders }) {
  return (
    <>
      <Head>
        <title>{`${service.nameAr} في الإمارات | دليل بيت الريف للمقاولات`}</title>
        <meta name="description" content={`دليل ${service.nameAr} الشامل في الإمارات. ابحث عن أفضل مزودي الخدمات، الشركات، والمقاولين المعتمدين في أبوظبي، دبي، والشارقة.`} />
        <link rel="canonical" href={`https://bietalreef.ae/categories/${service.slug}`} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <Image 
                src="/images/seo/home/platform-features.webp" 
                alt={service.nameAr} 
                fill 
                className="object-cover grayscale"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4">
              <nav className="flex mb-6 text-sm font-medium text-[#D4AF37]">
                <Link href="/" className="hover:underline">الرئيسية</Link>
                <span className="mx-2">/</span>
                <Link href="/categories" className="hover:underline">التخصصات</Link>
                <span className="mx-2">/</span>
                <span>{service.nameAr}</span>
              </nav>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="text-6xl bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 w-fit">
                  {service.icon}
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{service.nameAr} في الإمارات</h1>
                  <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
                    {service.descAr} تصفح الدليل المحلي حسب الإمارة والمنطقة للوصول إلى أفضل المتخصصين.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Providers Grid (Visual Cards) */}
          {relatedProviders.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-[#0F3F1A] mb-3">مزودو خدمات معتمدون</h2>
                  <p className="text-gray-600 font-medium">نخبة من الشركات والمحترفين في مجال {service.nameAr}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProviders.map((provider) => (
                  <Link key={provider.slug} href={`/providers/${provider.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      {provider.cover ? (
                        <Image src={provider.cover} alt={provider.nameAr} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3F1A] to-[#1F6B3A] opacity-80"></div>
                      )}
                      <div className="absolute top-4 left-4">
                        {provider.verified && (
                          <span className="bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            معتمد
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-8 relative">
                      <div className="absolute -top-10 right-8">
                        <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-xl border border-gray-50 overflow-hidden">
                          {provider.logo ? (
                            <Image src={provider.logo} alt={provider.nameAr} width={80} height={80} className="object-contain" />
                          ) : (
                            <div className="w-full h-full bg-[#FDFBF7] flex items-center justify-center text-2xl">{service.icon}</div>
                          )}
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-black text-[#0F3F1A] mb-3 group-hover:text-[#B8922B] transition-colors truncate">{provider.nameAr}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-2">{provider.descriptionAr}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-[#D4AF37] font-black text-sm group-hover:translate-x-[-4px] transition-transform">عرض الملف ←</span>
                          <span className="text-gray-400 text-xs font-medium">{provider.phone}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Emirates & Areas Navigation */}
          <section className="bg-[#F0F7F2] py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-[#0F3F1A] mb-4">الدليل الجغرافي لـ {service.nameAr}</h2>
                <p className="text-gray-600 font-medium">اختر الإمارة والمنطقة للوصول إلى المتخصصين الأقرب إليك</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {UAE_EMIRATES.map((emirate) => (
                  <div key={emirate.slug} className="bg-white rounded-3xl p-8 border border-[#E6DCC8] shadow-sm hover:shadow-lg transition-shadow">
                    <Link href={`/uae/${emirate.slug}`} className="flex items-center justify-between mb-6 group">
                      <h3 className="text-2xl font-black text-[#0F3F1A] group-hover:text-[#B8922B] transition-colors">{emirate.nameAr}</h3>
                      <span className="w-10 h-10 rounded-full bg-[#F0F7F2] flex items-center justify-center text-[#0F3F1A] font-black group-hover:bg-[#0F3F1A] group-hover:text-white transition-all">←</span>
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {emirate.areas.slice(0, 12).map((area) => (
                        <Link key={area.slug} href={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="text-xs font-bold bg-[#FDFBF7] border border-[#E6DCC8] rounded-full px-4 py-2 text-gray-600 hover:border-[#D4AF37] hover:text-[#0F3F1A] transition-all">
                          {area.nameAr}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .group {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params }) {
  const service = getServiceCategory(params.slug);
  if (!service) return { notFound: true };
  
  const relatedProviders = providers.filter(provider => {
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

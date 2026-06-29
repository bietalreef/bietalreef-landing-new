import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { getEmirate, getArea, getServiceCategory, getAllAreaServicePaths } from '../../../../data/siteTaxonomy';
import { providers } from '../../../../data/providers';

export default function AreaServicePage({ emirate, area, service, relatedProviders }) {
  const pageUrl = `https://bietalreef.ae/uae/${emirate.slug}/${area.slug}/${service.slug}`;
  
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `كيف أجد ${service.nameAr} في ${area.nameAr}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `من خلال بيت الريف يمكنك استعراض صفحة ${service.nameAr} في ${area.nameAr} والانتقال إلى مزودي الخدمة المعتمدين أو التواصل معنا لترتيب طلبك.`
        }
      },
      {
        '@type': 'Question',
        name: `هل تغطي بيت الريف خدمات ${service.nameAr} في ${emirate.nameAr}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `نعم، بيت الريف يوفر تغطية شاملة لخدمات ${service.nameAr} في كافة مناطق ${emirate.nameAr} بما فيها ${area.nameAr}.`
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://bietalreef.ae/' },
      { '@type': 'ListItem', position: 2, name: 'الإمارات', item: 'https://bietalreef.ae/uae' },
      { '@type': 'ListItem', position: 3, name: emirate.nameAr, item: `https://bietalreef.ae/uae/${emirate.slug}` },
      { '@type': 'ListItem', position: 4, name: area.nameAr, item: `https://bietalreef.ae/uae/${emirate.slug}/${area.slug}` },
      { '@type': 'ListItem', position: 5, name: service.nameAr, item: pageUrl }
    ]
  };

  return (
    <>
      <Head>
        <title>{`${service.nameAr} في ${area.nameAr} - ${emirate.nameAr} | بيت الريف`}</title>
        <meta name="description" content={`أفضل خدمات ${service.nameAr} في ${area.nameAr}، ${emirate.nameAr}. ابحث عن الشركات المعتمدة، قارن العروض، واطلب خدمتك الآن عبر منصة بيت الريف الذكية.`} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-[#0F3F1A] text-white py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <Image 
                src={`/images/seo/emirates/${emirate.slug}.webp`}
                alt={`${service.nameAr} في ${area.nameAr}`}
                fill 
                className="object-cover grayscale"
                priority
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-4">
              <nav className="flex mb-8 text-sm font-medium text-[#D4AF37]">
                <Link href="/uae" className="hover:underline">الإمارات</Link>
                <span className="mx-2">/</span>
                <Link href={`/uae/${emirate.slug}`} className="hover:underline">{emirate.nameAr}</Link>
                <span className="mx-2">/</span>
                <Link href={`/uae/${emirate.slug}/${area.slug}`} className="hover:underline">{area.nameAr}</Link>
                <span className="mx-2">/</span>
                <span>{service.nameAr}</span>
              </nav>
              
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="text-7xl bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 w-fit transform hover:rotate-6 transition-transform">
                  {service.icon}
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    {service.nameAr} في <span className="text-[#D4AF37]">{area.nameAr}</span>
                  </h1>
                  <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
                    {service.descAr} نحن نصلك بأفضل الكفاءات المحلية في {area.nameAr} لضمان تنفيذ مشروعك بدقة واحترافية.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-10">
                    <a href="https://wa.me/971567856001" className="bg-[#D4AF37] text-[#0F3F1A] px-8 py-4 rounded-2xl font-black hover:bg-[#B8922B] transition-all flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.807 1.594 5.397l-.982 3.589 3.687-.966zm11.491-7.008c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775 1.079-.95 1.279-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.491-.892-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.462.13-.611.134-.133.301-.351.451-.526.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.491-.508-.675-.518-.174-.009-.374-.011-.574-.011-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.501 0 1.475 1.075 2.899 1.225 3.1.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.635.718.227 1.369.195 1.886.118.574-.085 1.781-.728 2.031-1.428.25-.7.25-1.3.175-1.428-.075-.125-.275-.2-.575-.35z"/></svg>
                      اطلب الخدمة الآن
                    </a>
                    <Link href="/providers" className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
                      استعرض الشركات المعتمدة
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Value Grid */}
          <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'كفاءة محلية معتمدة', desc: `نضمن لك الوصول إلى مزودي ${service.nameAr} في ${area.nameAr} ممن خضعوا لتدقيق الجودة.`, icon: '🏆' },
                { title: 'تسعير عادل وشفاف', desc: 'احصل على عروض أسعار تنافسية من عدة شركات مع إمكانية المقارنة والتحليل الذكي.', icon: '💰' },
                { title: 'إدارة مشاريع متكاملة', desc: 'تتبع سير العمل في مشروعك بـنظام بيت الريف الذي يضمن حقوقك في كل خطوة.', icon: '🏗️' },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-3xl border border-[#E6DCC8] p-10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h2 className="text-2xl font-black text-[#0F3F1A] mb-4 group-hover:text-[#B8922B] transition-colors">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Providers List Section */}
          {relatedProviders.length > 0 && (
            <section className="bg-[#F0F7F2] py-20 border-y border-[#E6DCC8]">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-[#0F3F1A] mb-3">مزودو الخدمة في {area.nameAr}</h2>
                    <p className="text-gray-600 font-medium">الشركات المتوفرة حالياً لخدمة {service.nameAr}</p>
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
                            <span className="bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                              معتمد
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] p-2 border border-gray-100 flex-shrink-0">
                            {provider.logo ? (
                              <Image src={provider.logo} alt={provider.nameAr} width={64} height={64} className="object-contain" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">{service.icon}</div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-black text-lg text-[#0F3F1A] group-hover:text-[#B8922B] transition-colors">{provider.nameAr}</h3>
                            <p className="text-xs text-gray-400 font-bold">{provider.phone}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium line-clamp-2">{provider.descriptionAr}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-[#D4AF37] font-black text-sm group-hover:translate-x-[-4px] transition-transform">عرض الملف ←</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 py-24">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-12 text-center">الأسئلة الشائعة حول {service.nameAr}</h2>
            <div className="space-y-6">
              {faqJsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-8 hover:border-[#D4AF37] transition-colors">
                  <h3 className="text-xl font-black text-[#0F3F1A] mb-4">{faq.name}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Localized Footer Navigation */}
          <section className="bg-[#0F3F1A] text-white py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-black mb-8">استكشف {service.nameAr} في مناطق أخرى</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {emirate.areas.slice(0, 15).map((otherArea) => (
                  <Link key={otherArea.slug} href={`/uae/${emirate.slug}/${otherArea.slug}/${service.slug}`} className="bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F3F1A] border border-white/10 px-5 py-2 rounded-full text-sm font-bold transition-all">
                    {otherArea.nameAr}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .group {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  
  const relatedProviders = providers.filter(provider => {
    const isInArea = provider.serviceAreas?.includes(params.area);
    const categoryKeywords = params.service.split('-');
    const hasService = provider.services?.some(svc => 
      categoryKeywords.some(keyword => svc.toLowerCase().includes(keyword))
    );
    return isInArea && hasService;
  });
  
  return { props: { emirate, area, service, relatedProviders }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: getAllAreaServicePaths().map((item) => ({ params: item })),
    fallback: 'blocking'
  };
}

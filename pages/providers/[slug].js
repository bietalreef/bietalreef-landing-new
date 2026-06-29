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
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: provider.nameAr,
    alternateName: provider.nameEn,
    description: provider.descriptionAr,
    url: `https://bietalreef.ae/providers/${provider.slug}`,
    telephone: provider.phone,
    logo: `https://bietalreef.ae${provider.logo}`,
    image: `https://bietalreef.ae${provider.cover}`,
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
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#f7f5f0]">
        <Navbar />

        {/* BREADCRUMB */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <div className="container">
            <ol className="breadcrumb-list">
              <li><Link href="/"><i className="fas fa-home"></i> الرئيسية</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li><Link href="/providers">مزودو الخدمات</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li><Link href={`/uae/${emirate?.slug}`}>{emirate?.nameAr}</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li className="active">{provider.nameAr}</li>
            </ol>
          </div>
        </nav>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="container trust-bar-inner">
            <div className="trust-bar-item"><i className="fas fa-check"></i> مزود معتمد داخل بيت الريف</div>
            <div className="trust-bar-item"><i className="fas fa-shield-alt"></i> البيانات موثقة ومراجعة</div>
            <div className="trust-bar-item"><i className="fas fa-star"></i> تقييم 4.9 من عملاء بيت الريف</div>
            <div className="trust-bar-item"><i className="fas fa-headset"></i> تواصل مباشر متاح</div>
          </div>
        </div>

        {/* PROVIDER HERO */}
        <section className="provider-hero" style={{ backgroundImage: `linear-gradient(135deg,rgba(8,51,40,0.92) 0%,rgba(13,77,60,0.88) 100%), url(${provider.cover})` }}>
          <div className="container">
            <div className="provider-hero-inner">
              <div>
                <div className="provider-badge"><i className="fas fa-certificate"></i> مزود خدمة معتمد داخل بيت الريف</div>
                <h1>{provider.nameAr} <span className="highlight">في {emirate?.nameAr}</span></h1>
                <p className="provider-subtitle">{provider.descriptionAr}</p>
                <div className="provider-meta">
                  <div className="provider-meta-item"><i className="fas fa-map-marker-alt"></i> {emirate?.nameAr} - {area?.nameAr}</div>
                  <div className="provider-meta-item"><i className="fas fa-briefcase"></i> خبرة واسعة</div>
                  <div className="provider-meta-item"><i className="fas fa-tools"></i> {provider.services?.length}+ خدمة متخصصة</div>
                  <div className="provider-meta-item"><i className="fas fa-clock"></i> خدمة احترافية</div>
                </div>
                <div className="provider-rating">
                  <strong>4.9</strong>
                  <div>
                    <div className="stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                    <span>تقييم موثق</span>
                  </div>
                </div>
              </div>
              <div className="provider-actions">
                <a href="#booking" className="pa-btn pa-btn-primary"><i className="fas fa-file-invoice"></i> اطلب عرض سعر</a>
                <a href={`https://wa.me/${provider.whatsapp?.replace(/\D/g, '')}?text=مرحباً، أرغب في الاستفسار عن خدماتكم عبر بيت الريف`} target="_blank" rel="noopener noreferrer" className="pa-btn pa-btn-whatsapp">
                  <i className="fab fa-whatsapp"></i> واتساب مباشر
                </a>
                <a href={`tel:${provider.phone}`} className="pa-btn pa-btn-call"><i className="fas fa-phone"></i> اتصل الآن</a>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <div className="container">
          <div className="quick-stats">
            <div className="qs-item"><span className="qs-num">10+</span><span className="qs-label">سنوات خبرة</span></div>
            <div className="qs-item"><span className="qs-num">{provider.services?.length}</span><span className="qs-label">خدمة متخصصة</span></div>
            <div className="qs-item"><span className="qs-num">1500+</span><span className="qs-label">عميل راضٍ</span></div>
            <div className="qs-item"><span className="qs-num">100%</span><span className="qs-label">جودة مضمونة</span></div>
            <div className="qs-item"><span className="qs-num">4.9</span><span className="qs-label">تقييم موثق</span></div>
          </div>
        </div>

        {/* PROVIDER INFO */}
        <section>
          <div className="container">
            <div className="section-head">
              <span className="section-tag">بيانات المزود</span>
              <h2>معلومات {provider.nameAr}</h2>
              <p>جميع البيانات موثقة ومراجعة من قبل فريق منصة بيت الريف</p>
            </div>
            <div className="info-grid">
              <div className="info-card">
                <h3><i className="fas fa-id-card"></i> الهوية والتوثيق</h3>
                <ul className="info-list">
                  <li><i className="fas fa-building"></i> <strong>اسم المزود:</strong> {provider.nameAr}</li>
                  <li><i className="fas fa-map-marker-alt"></i> <strong>الموقع:</strong> الإمارات - {emirate?.nameAr} - {area?.nameAr}</li>
                  <li><i className="fas fa-city"></i> <strong>المدينة:</strong> {emirate?.nameAr}</li>
                  <li><i className="fas fa-flag"></i> <strong>الإمارة:</strong> {emirate?.nameAr}</li>
                  <li><i className="fas fa-phone"></i> <strong>الهاتف:</strong> <span dir="ltr">{provider.phone}</span></li>
                  <li><i className="fab fa-whatsapp"></i> <strong>واتساب:</strong> <span dir="ltr">{provider.whatsapp}</span></li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <strong>حالة التوثيق:</strong>
                    <span className="verified-badge"><i className="fas fa-shield-alt"></i> موثق من بيت الريف</span>
                  </li>
                </ul>
                <div className="license-card">
                  <i className="fas fa-certificate"></i>
                  <div>
                    <strong>رخصة تجارية سارية</strong>
                    <span>رقم الترخيص: متاح عند الطلب</span>
                  </div>
                </div>
              </div>
              <div className="info-card">
                <h3><i className="fas fa-info-circle"></i> نبذة عن المزود</h3>
                <p className="text-muted text-sm mb-4">
                  {provider.descriptionAr}
                </p>
                <h3 className="mt-6"><i className="fas fa-share-alt"></i> قنوات التواصل</h3>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-2xl text-[#0d4d3c] hover:text-[#d4a84b]"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="text-2xl text-[#0d4d3c] hover:text-[#d4a84b]"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="text-2xl text-[#0d4d3c] hover:text-[#d4a84b]"><i className="fab fa-tiktok"></i></a>
                </div>
              </div>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h4>هل تحتاج خدمة {provider.nameAr}؟</h4>
                <p>احصل على معاينة مجانية وعرض سعر شفاف خلال دقائق</p>
              </div>
              <div className="cta-strip-actions">
                <a href="#booking" className="btn btn-gold"><i className="fas fa-file-invoice"></i> اطلب عرض سعر</a>
                <a href={`https://wa.me/${provider.whatsapp?.replace(/\D/g, '')}`} className="btn btn-white"><i className="fab fa-whatsapp"></i> واتساب</a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ background: '#efece4' }}>
          <div className="container">
            <div className="section-head">
              <span className="section-tag">الخدمات المقدمة</span>
              <h2>خدمات {provider.nameAr}</h2>
              <p>باقة شاملة من الخدمات بأعلى المعايير</p>
            </div>
            <div className="services-grid">
              {provider.services?.map((service, idx) => (
                <div key={idx} className="service-card">
                  <div className="service-icon"><i className="fas fa-tools"></i></div>
                  <h4>{service}</h4>
                  <p>خدمة احترافية مخصصة حسب احتياجاتكم</p>
                  <ul>
                    <li><i className="fas fa-check"></i> جودة عالية</li>
                    <li><i className="fas fa-check"></i> مواد معتمدة</li>
                    <li><i className="fas fa-check"></i> ضمان فعلي</li>
                  </ul>
                  <a href="#booking" className="service-cta">اطلب الخدمة <i className="fas fa-arrow-left"></i></a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {provider.faq?.length > 0 && (
          <section>
            <div className="container">
              <div className="section-head">
                <span className="section-tag">الأسئلة الشائعة</span>
                <h2>أسئلة متكررة حول خدماتنا</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {provider.faq.map((item, idx) => (
                  <details key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer">
                    <summary className="font-bold text-[#0d4d3c] list-none flex justify-between items-center">
                      {item.question}
                      <i className="fas fa-chevron-down text-sm"></i>
                    </summary>
                    <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

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

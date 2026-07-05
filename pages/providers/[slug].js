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

  const mainCategory = SERVICE_CATEGORIES.find(cat => provider.categorySlugs?.includes(cat.slug)) || null;
  const providerUrl = `https://bietalreef.ae/providers/${provider.slug}`;
  const providerLogo = provider.logo ? `https://bietalreef.ae${provider.logo}` : 'https://bietalreef.ae/logo.png';
  const providerCover = provider.cover ? `https://bietalreef.ae${provider.cover}` : providerLogo;
  const whatsappDigits = provider.whatsapp?.replace(/\D/g, '') || '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: provider.nameAr,
    alternateName: provider.nameEn,
    description: provider.descriptionAr,
    url: providerUrl,
    telephone: provider.phone,
    logo: providerLogo,
    image: providerCover,
    address: {
      '@type': 'PostalAddress',
      streetAddress: area?.nameAr || provider.area || '',
      addressLocality: emirate?.nameAr || 'الإمارات',
      addressCountry: 'AE'
    },
    areaServed: provider.serviceAreas?.map(areaSlug => {
      const areaObj = emirate?.areas?.find(a => a.slug === areaSlug);
      return areaObj?.nameAr || areaSlug;
    }) || [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: provider.phone,
      availableLanguage: ['ar', 'en']
    },
    sameAs: whatsappDigits ? [`https://wa.me/${whatsappDigits}`] : []
  };

  return (
    <>
      <Head>
        <title>{provider.nameAr} | بيت الريف</title>
        <meta name="description" content={provider.descriptionAr} />
        <meta name="keywords" content={`${provider.nameAr}, ${provider.services?.join(', ') || ''}, ${emirate?.nameAr || 'الإمارات'}`} />
        <link rel="canonical" href={providerUrl} />

        <meta property="og:title" content={provider.nameAr} />
        <meta property="og:description" content={provider.descriptionAr} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={providerUrl} />
        <meta property="og:image" content={providerCover} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={provider.nameAr} />
        <meta name="twitter:description" content={provider.descriptionAr} />
        <meta name="twitter:image" content={providerCover} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#f7f5f0]">
        <Navbar />

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <div className="container">
            <ol className="breadcrumb-list">
              <li><Link href="/"><i className="fas fa-home"></i> الرئيسية</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li><Link href="/providers">مزودو الخدمات</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li><Link href={`/uae/${emirate?.slug || 'abu-dhabi'}`}>{emirate?.nameAr || 'الإمارات'}</Link></li>
              <li><i className="fas fa-chevron-left"></i></li>
              <li className="active">{provider.nameAr}</li>
            </ol>
          </div>
        </nav>

        <div className="trust-bar">
          <div className="container trust-bar-inner">
            <div className="trust-bar-item"><i className="fas fa-check"></i> مزود معتمد داخل بيت الريف</div>
            <div className="trust-bar-item"><i className="fas fa-shield-alt"></i> البيانات موثقة ومراجعة</div>
            <div className="trust-bar-item"><i className="fas fa-star"></i> تقييم 4.9 من عملاء بيت الريف</div>
            <div className="trust-bar-item"><i className="fas fa-headset"></i> تواصل مباشر متاح</div>
          </div>
        </div>

        <section className="provider-hero" style={{ backgroundImage: `linear-gradient(135deg,rgba(8,51,40,0.92) 0%,rgba(13,77,60,0.88) 100%), url(${provider.cover || '/logo.png'})` }}>
          <div className="container">
            <div className="provider-hero-inner">
              <div>
                <div className="provider-badge"><i className="fas fa-certificate"></i> مزود خدمة معتمد داخل بيت الريف</div>
                <h1>{provider.nameAr} <span className="highlight">في {emirate?.nameAr || 'الإمارات'}</span></h1>
                <p className="provider-subtitle">{provider.descriptionAr}</p>
                <div className="provider-meta">
                  <div className="provider-meta-item"><i className="fas fa-map-marker-alt"></i> {emirate?.nameAr || 'الإمارات'} - {area?.nameAr || provider.city || ''}</div>
                  <div className="provider-meta-item"><i className="fas fa-briefcase"></i> خبرة واسعة</div>
                  <div className="provider-meta-item"><i className="fas fa-tools"></i> {provider.services?.length || 0}+ خدمة متخصصة</div>
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
                <a href="/request-quote" className="pa-btn pa-btn-primary"><i className="fas fa-file-invoice"></i> اطلب عرض سعر</a>
                {whatsappDigits ? (
                  <a href={`https://wa.me/${whatsappDigits}?text=مرحباً، أرغب في الاستفسار عن خدماتكم عبر بيت الريف`} target="_blank" rel="noopener noreferrer" className="pa-btn pa-btn-whatsapp">
                    <i className="fab fa-whatsapp"></i> واتساب مباشر
                  </a>
                ) : null}
                <a href={`tel:${provider.phone}`} className="pa-btn pa-btn-call"><i className="fas fa-phone"></i> اتصل الآن</a>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="quick-stats">
            <div className="qs-item"><span className="qs-num">10+</span><span className="qs-label">سنوات خبرة</span></div>
            <div className="qs-item"><span className="qs-num">{provider.services?.length || 0}</span><span className="qs-label">خدمة متخصصة</span></div>
            <div className="qs-item"><span className="qs-num">1500+</span><span className="qs-label">عميل راضٍ</span></div>
            <div className="qs-item"><span className="qs-num">100%</span><span className="qs-label">جودة مضمونة</span></div>
            <div className="qs-item"><span className="qs-num">4.9</span><span className="qs-label">تقييم موثق</span></div>
          </div>
        </div>

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
                  <li><i className="fas fa-map-marker-alt"></i> <strong>الموقع:</strong> الإمارات - {emirate?.nameAr || 'الإمارات'} - {area?.nameAr || provider.city || ''}</li>
                  <li><i className="fas fa-flag"></i> <strong>الإمارة:</strong> {emirate?.nameAr || 'الإمارات'}</li>
                  <li><i className="fas fa-phone"></i> <strong>الهاتف:</strong> <span dir="ltr">{provider.phone}</span></li>
                  <li><i className="fab fa-whatsapp"></i> <strong>واتساب:</strong> <span dir="ltr">{provider.whatsapp}</span></li>
                  <li><i className="fas fa-check-circle"></i> <strong>حالة التوثيق:</strong> <span className="verified-badge"><i className="fas fa-shield-alt"></i> موثق من بيت الريف</span></li>
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
                <p className="text-muted text-sm mb-4">{provider.descriptionAr}</p>
                {mainCategory ? <p className="text-muted text-sm">التصنيف الرئيسي: {mainCategory.nameAr}</p> : null}
              </div>
            </div>
          </div>
        </section>

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
                  <h3>{service}</h3>
                  <p>تنفيذ احترافي مع متابعة واضحة من خلال بيت الريف.</p>
                  <ul>
                    <li><i className="fas fa-check"></i> جودة عالية</li>
                    <li><i className="fas fa-check"></i> مواد معتمدة</li>
                    <li><i className="fas fa-check"></i> ضمان فعلي</li>
                  </ul>
                  <a href="/request-quote" className="service-cta">اطلب الخدمة <i className="fas fa-arrow-left"></i></a>
                </div>
              ))}
            </div>
          </div>
        </section>

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
  const area = getArea(provider.emirate, provider.area) || getArea(provider.emirate, provider.city);

  return {
    props: {
      provider,
      emirate: emirate || null,
      area: area || null
    },
    revalidate: false
  };
}

export async function getStaticPaths() {
  return {
    paths: providers.map(provider => ({ params: { slug: provider.slug } })),
    fallback: false
  };
}

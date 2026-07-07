import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

function EnglishEmirateServiceHub({ emirate, service }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${service.slug}`;
  const showSeoProof = emirate.slug === 'abu-dhabi' && AL_HOOT_SERVICE_SLUGS.includes(service.slug);

  return (
    <>
      <Head>
        <title>{`${service.nameEn} in ${emirate.nameEn} | Biet Al Reef`}</title>
        <meta name="description" content={`Service hub for ${service.nameEn.toLowerCase()} in ${emirate.nameEn}. Area links remain available through the smart footer.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}/${service.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="bg-[#FDFBF7] text-left">
          <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
            <p className="text-[#B8922B] font-black mb-3">Service hub</p>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{service.nameEn} in {emirate.nameEn}</h1>
            <p className="text-gray-600 leading-8 max-w-3xl mb-10">This page keeps the clean route after choosing the emirate and service. Existing area pages remain linked in the smart footer.</p>
            <section className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">What this page covers</h2>
              <p className="text-gray-600 leading-8">Use this page as the main service hub for {service.nameEn.toLowerCase()} across {emirate.nameEn}, then move by area using the smart footer.</p>
            </section>
          </section>

          {showSeoProof && (
            <SeoProofCardsEn
              title={`Real provider, service and product path for ${service.nameEn} in ${emirate.nameEn}`}
              desc="This service hub is connected to a verified marble and granite provider profile, a requestable service path, material/product intent and a quotation step through White Whale Marble & Granite Factory."
            />
          )}
        </main>
        <UaeSmartFooter locale="en" pageType="emirateService" emirate={emirate} service={service} />
      </EnglishLayout>
    </>
  );
}

export default function EnglishAreaOrServicePage({ mode, emirate, area, service }) {
  if (mode === 'emirateService') {
    return <EnglishEmirateServiceHub emirate={emirate} service={service} />;
  }

  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${area.slug}`;
  return (
    <>
      <Head>
        <title>{`${area.nameEn} Service Categories | Biet Al Reef`}</title>
        <meta name="description" content={`Browse construction, maintenance, design and building service categories in ${area.nameEn}, ${emirate.nameEn}.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}/${area.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Local service area</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Services in {area.nameEn}, {emirate.nameEn}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">This area page remains available for old links. The main emirate page now starts from service categories.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SERVICE_CATEGORIES.map((item) => (
              <Link key={item.slug} href={`/en/uae/${emirate.slug}/${area.slug}/${item.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h2 className="font-black text-[#0F3F1A] mb-2">{item.nameEn}</h2>
                <p className="text-sm text-gray-600 leading-6">{item.nameEn} information in {area.nameEn}.</p>
              </Link>
            ))}
          </div>
        </main>
        <UaeSmartFooter locale="en" pageType="area" emirate={emirate} area={area} />
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };

  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.area);

  if (!area && !service) return { notFound: true };

  return {
    props: {
      mode: service && !area ? 'emirateService' : 'area',
      emirate,
      area: area || null,
      service: service || null,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const areaPaths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => areaPaths.push({ params: { emirate: emirate.slug, area: area.slug } }));
  });
  const servicePaths = [];
  UAE_EMIRATES.forEach((emirate) => {
    SERVICE_CATEGORIES.forEach((service) => servicePaths.push({ params: { emirate: emirate.slug, area: service.slug } }));
  });
  return { paths: [...areaPaths, ...servicePaths], fallback: 'blocking' };
}

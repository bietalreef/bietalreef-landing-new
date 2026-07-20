import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import UaeActivityProviders from '../../../../components/UaeActivityProviders';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../components/UaeContextInfoCard';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

function EnglishEmirateServiceHub({ emirate, service }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${service.slug}`;
  const showSeoProof = false;

  return (
    <>
      <Head>
        <title>{`${service.nameEn} in ${emirate.nameEn} | Biet Al Reef`}</title>
        <meta name="description" content={`Service hub for ${service.nameEn.toLowerCase()} in ${emirate.nameEn}, with related areas and provider paths.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}/${service.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />
        <main className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={`${service.nameEn} in ${emirate.nameEn}`} description={`Explore ${service.nameEn.toLowerCase()} providers and related locations across ${emirate.nameEn}.`} emirate={emirate} service={service} cleanNavigation />
          <UaeActivityProviders locale="en" emirate={emirate} service={service} />
          <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <section className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">What this page covers</h2>
              <p className="text-gray-600 leading-8">Use this page as the main service hub for {service.nameEn.toLowerCase()} across {emirate.nameEn}, then continue through the related area links below.</p>
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
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />
        <main className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={`Services in ${area.nameEn}, ${emirate.nameEn}`} description={`Choose the service category that best matches your request in ${area.nameEn}.`} emirate={emirate} area={area} cleanNavigation />
          <UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`Services and specialties available in ${area.nameEn}`} description={`This page shows every Biet Al Reef specialty in ${area.nameEn}. Choose a specialty to open its page and browse provider profiles connected to the location and specialty.`} />
          <UaeDirectoryWeyaakCard locale="en" title={`Weyaak in ${area.nameEn}`} description={`Tell Weyaak what your project needs in ${area.nameEn}, and it will help you choose the specialty and reach the right provider or request path.`} />
          <UaeDirectorySectorCards emirate={emirate} area={area} locale="en" />
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

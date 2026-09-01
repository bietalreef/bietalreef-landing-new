import EnglishLayout from '../../../../components/EnglishLayout';
import FAQ from '../../../../components/FAQ';
import SeoContent from '../../../../components/SeoContent';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import UaeActivityProviders from '../../../../components/UaeActivityProviders';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../components/UaeContextInfoCard';
import UaeDirectorySeo from '../../../../components/UaeDirectorySeo';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';
import { getEnglishUaeDirectoryCards } from '../../../../lib/platformDirectoryCards';

function EnglishEmirateServiceHub({ emirate, service }) {
  const title = `${service.nameEn} in ${emirate.nameEn}`;
  const showSeoProof = false;
  const faqItems = [
    [`Is ${service.nameEn} available across ${emirate.nameEn}?`, `Yes. Related area links are available below so you can continue to ${service.nameEn.toLowerCase()} by area within ${emirate.nameEn}.`],
    ['Were the existing area pages removed?', 'No. Existing area pages remain active and are used as supporting internal navigation without changing their routes.'],
    ['Are real provider examples shown on this page?', showSeoProof ? 'Yes. This page includes a real path that connects the activity to a provider, service, product and quotation step.' : 'Approved providers and products are added progressively after their data is reviewed.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={title} description={`Service hub for ${service.nameEn.toLowerCase()} in ${emirate.nameEn}, with subscribed providers and related areas.`} path={`/en/uae/${emirate.slug}/${service.slug}`} alternatePath={`/uae/${emirate.slug}/${service.slug}`} emirate={emirate} service={service} />
      <EnglishLayout>
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={title} description={`Explore ${service.nameEn.toLowerCase()} providers and related locations across ${emirate.nameEn}.`} emirate={emirate} service={service} cleanNavigation />
          <UaeActivityProviders locale="en" emirate={emirate} service={service} />
          {showSeoProof && (
            <SeoProofCardsEn
              title={`Real provider, service and product path for ${service.nameEn} in ${emirate.nameEn}`}
              desc="This service hub is connected to a verified provider profile, a requestable service path, product intent and a quotation step."
            />
          )}
          <SeoContent title={`${title} inside Biet Al Reef`}>
            <p>This is an emirate-level activity page. City and area links remain organized below so the browsing journey stays clear and consistent.</p>
          </SeoContent>
          <FAQ items={faqItems} title={`Frequently asked questions about ${title}`} />
          <UaeSmartFooter locale="en" pageType="emirateService" emirate={emirate} service={service} />
        </main>
      </EnglishLayout>
    </>
  );
}

export default function EnglishAreaOrServicePage({ mode, emirate, area, service, directoryCards = [] }) {
  if (mode === 'emirateService') {
    return <EnglishEmirateServiceHub emirate={emirate} service={service} />;
  }

  const pageData = {
    h1: `Construction and contracting services in ${area.nameEn}`,
    desc: `Choose the right service in ${area.nameEn}, ${emirate.nameEn}: contracting, carpentry, marble, maintenance, interior design and building materials.`,
  };
  const faqItems = [
    [`What services are available in ${area.nameEn}?`, `Browse contracting, maintenance, finishing, carpentry, marble, interior design and other services available in ${area.nameEn}.`],
    ['How do I request a quotation?', 'Choose the required service, then use the quotation path or ask Weyaak to help route your request.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={pageData.h1} description={pageData.desc} path={`/en/uae/${emirate.slug}/${area.slug}`} alternatePath={`/uae/${emirate.slug}/${area.slug}`} emirate={emirate} />
      <EnglishLayout>
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={pageData.h1} description={pageData.desc} emirate={emirate} area={area} cleanNavigation />

          <UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`Services and specialties available in ${area.nameEn}`} description={`This page shows every Biet Al Reef specialty in ${area.nameEn}. Choose a specialty to open its page and browse provider profiles connected to the location and specialty.`} />

          <UaeDirectoryWeyaakCard locale="en" title={`Weyaak in ${area.nameEn}`} description={`Tell Weyaak what your project needs in ${area.nameEn}, and it will help you choose the specialty and reach the right provider or request path.`} />

          <UaeDirectorySectorCards emirate={emirate} area={area} locale="en" directoryCards={directoryCards} />

          <SeoContent title={`${area.nameEn} inside Biet Al Reef UAE Directory`}>
            <p>The {area.nameEn} page in {emirate.nameEn} connects the location with available services while preserving the geographic links and a clear browsing path.</p>
          </SeoContent>

          <FAQ items={faqItems} title={`Frequently asked questions about services in ${area.nameEn}`} />
          <UaeSmartFooter locale="en" pageType="area" emirate={emirate} area={area} directoryCards={directoryCards} />
        </main>
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
  const directoryCards = area ? await getEnglishUaeDirectoryCards() : [];

  return {
    props: {
      mode: service && !area ? 'emirateService' : 'area',
      emirate,
      area: area || null,
      service: service || null,
      directoryCards,
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

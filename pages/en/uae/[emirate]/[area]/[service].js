import EnglishLayout from '../../../../../components/EnglishLayout';
import FAQ from '../../../../../components/FAQ';
import UaeSmartFooter from '../../../../../components/UaeSmartFooter';
import UaeDirectoryHero from '../../../../../components/UaeDirectoryHero';
import SecondaryHeader from '../../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../../components/UaeContextInfoCard';
import UaeActivityProviders from '../../../../../components/UaeActivityProviders';
import UaeDirectorySeo from '../../../../../components/UaeDirectorySeo';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../../data/siteTaxonomy';

export default function EnglishLocalServicePage({ emirate, area, service }) {
  const title = `${service.nameEn} in ${area.nameEn}`;
  const faqItems = [
    [`How do I find ${service.nameEn} in ${area.nameEn}?`, 'Choose the location and service, then send the project details so the request can be routed correctly.'],
    ['Are prices fixed?', 'No unapproved prices are shown. Pricing depends on project details and the scope of work.'],
    ['Will provider or product cards appear on this page?', 'Approved provider and product cards are added progressively after review.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={title} description={`Directory for ${title} in ${emirate.nameEn}, with provider profiles and related area paths.`} path={`/en/uae/${emirate.slug}/${area.slug}/${service.slug}`} alternatePath={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} emirate={emirate} service={service} />
      <EnglishLayout>
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}/${area.slug}`} backLabel={`Back to ${area.nameEn}`} />
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={title} description={`Explore ${service.nameEn.toLowerCase()} information and provider paths for ${area.nameEn}, ${emirate.nameEn}.`} emirate={emirate} area={area} service={service} cleanNavigation />
          <UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`About ${service.nameEn} in ${area.nameEn}`} description={`This page places ${service.nameEn.toLowerCase()} in its correct location context and provides a clear path back to the area and emirate or forward to a project request.`} />
          <UaeDirectoryWeyaakCard locale="en" title={`Ask Weyaak about ${service.nameEn} in ${area.nameEn}`} description="Share the service details, measurements or available photos, and Weyaak will help structure and route the request by location and specialty." />
          <UaeActivityProviders locale="en" emirate={emirate} area={area} service={service} />
          <FAQ items={faqItems} title={`Frequently asked questions about ${title}`} />
          <UaeSmartFooter locale="en" pageType="service" emirate={emirate} area={area} service={service} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  return { props: { emirate, area, service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => {
      SERVICE_CATEGORIES.forEach((service) => {
        paths.push({ params: { emirate: emirate.slug, area: area.slug, service: service.slug } });
      });
    });
  });
  return { paths, fallback: 'blocking' };
}

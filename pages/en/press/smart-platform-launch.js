import SEOHead from '../../../components/SEOHead';
import PressSmartPlatformLaunch from '../../../components/PressSmartPlatformLaunch';

const SITE_URL = 'https://bietalreef.ae';
const PAGE_PATH = '/en/press/smart-platform-launch';
const AR_PATH = '/press/smart-platform-launch';
const OG_IMAGE = `${SITE_URL}/api/press/smart-platform-launch-og`;

export default function SmartPlatformLaunchPressPageEnglish() {
  const title = 'Biet Al Reef launches a smart construction operating ecosystem in the UAE';
  const description = 'Biet Al Reef launches a digital operating ecosystem for UAE construction and contracting, connecting customers, service providers, the marketplace, workspaces, documents and Weyaak AI in one journey.';
  const article = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Biet Al Reef launches a smart construction operating ecosystem in the UAE',
    description,
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    url: `${SITE_URL}${PAGE_PATH}`,
    image: [OG_IMAGE],
    datePublished: '2026-09-01T00:00:00+04:00',
    dateModified: '2026-09-01T00:00:00+04:00',
    inLanguage: 'en-AE',
    author: {
      '@type': 'Organization',
      name: 'Biet Al Reef',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Biet Al Reef',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    about: [
      'UAE construction and contracting',
      'Biet Al Reef Platform',
      'Weyaak AI',
      'Google Cloud',
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="Biet Al Reef, UAE construction platform, UAE contracting, service providers, Biet Al Reef Market, Weyaak AI, Google Cloud"
        ogImage={OG_IMAGE}
        ogType="article"
        canonicalPath={PAGE_PATH}
        structuredData={article}
        breadcrumbs={[{ name: 'Press', item: `${SITE_URL}/en/press` }, { name: 'Smart platform launch', item: `${SITE_URL}${PAGE_PATH}` }]}
      />
      <PressSmartPlatformLaunch locale="en" />
    </>
  );
}

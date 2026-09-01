import SEOHead from '../../../components/SEOHead';
import PressSmartPlatformLaunch from '../../../components/PressSmartPlatformLaunch';
import PressVisualUpgrade from '../../../components/PressVisualUpgrade';

const SITE_URL = 'https://bietalreef.ae';
const PAGE_PATH = '/en/press/smart-platform-launch';
const OG_IMAGE = `${SITE_URL}/api/press/smart-platform-launch-og`;
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const HERO_IMAGE = `${SITE_URL}/images/press-image-01.webp`;
const SQUARE_IMAGE = `${SITE_URL}/images/press-image-04.webp`;
const GOOGLE_PARTNER_URL = 'https://cloud.google.com/find-a-partner/partner/biet-alreef-gen-contracting-est-sole-proprietorship-llc';
const PUBLISHED_AT = '2026-09-01T00:00:00+04:00';
const MODIFIED_AT = '2026-09-01T20:00:00+04:00';

export default function SmartPlatformLaunchPressPageEnglish() {
  const title = 'Biet Al Reef launches a smart construction operating ecosystem in the UAE';
  const description = 'Biet Al Reef launches a digital operating ecosystem for UAE construction and contracting, connecting customers, service providers, the marketplace, workspaces, documents and Weyaak AI in one journey.';
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Biet Al Reef',
    alternateName: 'بيت الريف',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    sameAs: [GOOGLE_PARTNER_URL],
  };
  const article = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${PAGE_URL}#newsarticle`,
    headline: 'Biet Al Reef launches a smart construction operating ecosystem in the UAE',
    description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    url: PAGE_URL,
    image: [
      { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 627 },
      { '@type': 'ImageObject', url: HERO_IMAGE, width: 1400, height: 788 },
      { '@type': 'ImageObject', url: SQUARE_IMAGE, width: 1200, height: 1200 },
    ],
    datePublished: PUBLISHED_AT,
    dateModified: MODIFIED_AT,
    inLanguage: 'en-AE',
    isAccessibleForFree: true,
    articleSection: 'UAE construction technology',
    keywords: ['Biet Al Reef', 'smart construction platform', 'UAE contracting', 'Weyaak AI', 'Google Cloud'],
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: ['UAE construction and contracting', 'Biet Al Reef Platform', 'Weyaak AI', 'Google Cloud'],
    mentions: [{ '@type': 'Organization', name: 'Google Cloud', sameAs: GOOGLE_PARTNER_URL }],
  };
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: title,
    description,
    inLanguage: 'en-AE',
    datePublished: PUBLISHED_AT,
    dateModified: MODIFIED_AT,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Biet Al Reef' },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 627 },
    mainEntity: { '@id': `${PAGE_URL}#newsarticle` },
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="Biet Al Reef, UAE construction platform, UAE contracting, service providers, Biet Al Reef Market, Weyaak AI, Google Cloud"
        ogImage={OG_IMAGE}
        ogImageWidth={1200}
        ogImageHeight={627}
        ogType="article"
        canonicalPath={PAGE_PATH}
        structuredData={[organization, webPage, article]}
        breadcrumbs={[{ name: 'Press', item: `${SITE_URL}/en/press` }, { name: 'Smart platform launch', item: `${SITE_URL}${PAGE_PATH}` }]}
      />
      <PressVisualUpgrade>
        <PressSmartPlatformLaunch locale="en" />
      </PressVisualUpgrade>
    </>
  );
}

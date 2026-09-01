import SEOHead from '../../components/SEOHead';
import PressSmartPlatformLaunch from '../../components/PressSmartPlatformLaunch';
import PressVisualUpgrade from '../../components/PressVisualUpgrade';

const SITE_URL = 'https://bietalreef.ae';
const PAGE_PATH = '/press/smart-platform-launch';
const EN_PATH = '/en/press/smart-platform-launch';
const OG_IMAGE = `${SITE_URL}/api/press/smart-platform-launch-og`;
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const HERO_IMAGE = `${SITE_URL}/images/press-image-01.webp`;
const SQUARE_IMAGE = `${SITE_URL}/images/press-image-04.webp`;
const GOOGLE_PARTNER_URL = 'https://cloud.google.com/find-a-partner/partner/biet-alreef-gen-contracting-est-sole-proprietorship-llc';
const PUBLISHED_AT = '2026-09-01T00:00:00+04:00';
const MODIFIED_AT = '2026-09-01T20:00:00+04:00';

export default function SmartPlatformLaunchPressPage() {
  const title = 'إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات | بيت الريف';
  const description = 'بيت الريف تطلق منظومة تشغيل رقمية لقطاع البناء والمقاولات في الإمارات تربط العميل ومزود الخدمة والسوق ومساحات العمل والمستندات والذكاء الاصطناعي «وياك» داخل رحلة واحدة.';
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'بيت الريف',
    alternateName: 'Biet Al Reef',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    sameAs: [GOOGLE_PARTNER_URL],
  };
  const article = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${PAGE_URL}#newsarticle`,
    headline: 'إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات',
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
    inLanguage: 'ar-AE',
    isAccessibleForFree: true,
    articleSection: 'التقنية والبناء في الإمارات',
    keywords: ['بيت الريف', 'منصة البناء الذكية', 'المقاولات في الإمارات', 'وياك AI', 'Google Cloud'],
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: ['البناء والمقاولات في الإمارات', 'منصة بيت الريف', 'وياك AI', 'Google Cloud'],
    mentions: [{ '@type': 'Organization', name: 'Google Cloud', sameAs: GOOGLE_PARTNER_URL }],
  };
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: title,
    description,
    inLanguage: 'ar-AE',
    datePublished: PUBLISHED_AT,
    dateModified: MODIFIED_AT,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'بيت الريف' },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 627 },
    mainEntity: { '@id': `${PAGE_URL}#newsarticle` },
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="بيت الريف, منصة بيت الريف, البناء في الإمارات, المقاولات, مزودو الخدمات, سوق بيت الريف, وياك, الذكاء الاصطناعي, Google Cloud"
        ogImage={OG_IMAGE}
        ogImageWidth={1200}
        ogImageHeight={627}
        ogType="article"
        canonicalPath={PAGE_PATH}
        alternatePath={EN_PATH}
        structuredData={[organization, webPage, article]}
        breadcrumbs={[{ name: 'البيانات الصحفية', item: `${SITE_URL}/press` }, { name: 'إطلاق المنظومة الذكية', item: `${SITE_URL}${PAGE_PATH}` }]}
      />
      <PressVisualUpgrade>
        <PressSmartPlatformLaunch locale="ar" />
      </PressVisualUpgrade>
    </>
  );
}

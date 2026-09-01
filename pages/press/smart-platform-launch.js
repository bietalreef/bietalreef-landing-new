import SEOHead from '../../components/SEOHead';
import PressSmartPlatformLaunch from '../../components/PressSmartPlatformLaunch';

const SITE_URL = 'https://bietalreef.ae';
const PAGE_PATH = '/press/smart-platform-launch';
const EN_PATH = '/en/press/smart-platform-launch';
const OG_IMAGE = `${SITE_URL}/api/press/smart-platform-launch-og`;

export default function SmartPlatformLaunchPressPage() {
  const title = 'إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات | بيت الريف';
  const description = 'بيت الريف تطلق منظومة تشغيل رقمية لقطاع البناء والمقاولات في الإمارات تربط العميل ومزود الخدمة والسوق ومساحات العمل والمستندات والذكاء الاصطناعي «وياك» داخل رحلة واحدة.';
  const article = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات',
    description,
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    url: `${SITE_URL}${PAGE_PATH}`,
    image: [OG_IMAGE],
    datePublished: '2026-09-01T00:00:00+04:00',
    dateModified: '2026-09-01T00:00:00+04:00',
    inLanguage: 'ar-AE',
    author: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'بيت الريف',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    about: ['البناء والمقاولات في الإمارات', 'منصة بيت الريف', 'وياك AI', 'Google Cloud'],
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
        structuredData={article}
        breadcrumbs={[{ name: 'البيانات الصحفية', item: `${SITE_URL}/press` }, { name: 'إطلاق المنظومة الذكية', item: `${SITE_URL}${PAGE_PATH}` }]}
      />
      <PressSmartPlatformLaunch locale="ar" />
    </>
  );
}

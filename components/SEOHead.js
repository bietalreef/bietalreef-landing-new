import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_DOMAIN = 'https://bietalreef.ae';
const SITE_NAME = 'بيت الريف';
const DEFAULT_OG_IMAGE = 'https://bietalreef.ae/og-weyaak.jpg';
const MIRRORED_ENGLISH_ROUTES = new Set([
  '/', '/about', '/why-biet-alreef', '/how-it-works', '/pricing',
  '/contact', '/services', '/marketplace', '/tools', '/weyaak', '/providers',
  '/categories', '/customer-service', '/privacy', '/legal', '/cookies',
  '/partners', '/suppliers', '/factories', '/faq', '/support-policy', '/providers/register',
]);

function englishAlternateFor(path) {
  if (path === '/') return '/en';
  if (MIRRORED_ENGLISH_ROUTES.has(path) || path.startsWith('/providers/') || path.startsWith('/categories/')) {
    return `/en${path}`;
  }
  return null;
}

function localePaths(path) {
  const isEnglish = path === '/en' || path.startsWith('/en/');
  if (isEnglish) {
    const arabicPath = path === '/en' ? '/' : path.slice(3) || '/';
    return { isEnglish, arabicPath, englishPath: path };
  }
  return { isEnglish, arabicPath: path, englishPath: englishAlternateFor(path) };
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  noIndex = false,
  structuredData = null,
  breadcrumbs = null,
  canonicalPath,
  alternatePath,
}) {
  const router = useRouter();
  const cleanPath = canonicalPath || router.asPath.split('?')[0];
  const canonicalUrl = cleanPath === '/' || cleanPath === '' ? SITE_DOMAIN : `${SITE_DOMAIN}${cleanPath}`;
  const paths = localePaths(cleanPath);
  const enPath = alternatePath || paths.englishPath;
  const arabicUrl = paths.arabicPath === '/' ? SITE_DOMAIN : `${SITE_DOMAIN}${paths.arabicPath}`;
  const englishUrl = enPath ? `${SITE_DOMAIN}${enPath}` : null;
  const pageLanguage = paths.isEnglish ? 'en-AE' : 'ar-AE';

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: paths.isEnglish ? 'Home' : 'الرئيسية', item: SITE_DOMAIN },
          ...breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: crumb.item || `${SITE_DOMAIN}${crumb.href || ''}`,
          })),
        ],
      }
    : null;

  const schemas = [];
  if (structuredData) {
    if (Array.isArray(structuredData)) schemas.push(...structuredData);
    else schemas.push(structuredData);
  }
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content={paths.isEnglish ? 'United Arab Emirates' : 'الإمارات العربية المتحدة'} />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      <meta httpEquiv="content-language" content={pageLanguage} />
      {/* React hrefLang renders the standard HTML hreflang attribute. */}
      <link rel="alternate" hrefLang="ar-AE" href={arabicUrl} />
      {englishUrl ? <link rel="alternate" hrefLang="en-AE" href={englishUrl} /> : null}
      <link rel="alternate" hrefLang="x-default" href={arabicUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={paths.isEnglish ? 'en_AE' : 'ar_AE'} />
      <meta property="og:locale:alternate" content={paths.isEnglish ? 'ar_AE' : 'en_AE'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bietalreef" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="theme-color" content="#0F3F1A" />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      ))}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}

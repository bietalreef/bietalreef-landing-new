import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_DOMAIN = 'https://bietalreef.ae';
const SITE_NAME = 'بيت الريف';
const DEFAULT_OG_IMAGE = 'https://bietalreef.ae/og-weyaak.jpg';

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData = null,
  breadcrumbs = null,
  includePWA = false,
  canonicalPath,
  alternatePath,
}) {
  const router = useRouter();
  const cleanPath = canonicalPath || router.asPath.split('?')[0] || '/';
  const canonicalUrl = cleanPath === '/' ? SITE_DOMAIN : `${SITE_DOMAIN}${cleanPath}`;
  const enPath = alternatePath || (cleanPath === '/' ? '/en' : `/en${cleanPath}`);

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_DOMAIN },
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
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar-AE" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-AE" href={`${SITE_DOMAIN}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="الإمارات العربية المتحدة" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="ar_AE" />
      <meta property="og:locale:alternate" content="en_AE" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {includePWA && (
        <>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0F3F1A" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </>
      )}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </Head>
  );
}

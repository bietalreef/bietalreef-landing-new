import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_DOMAIN = 'https://bietalreef.ae';
const SITE_NAME = 'بيت الريف';
const DEFAULT_OG_IMAGE = 'https://bietalreef.ae/og-weyaak.jpg';
const GOOGLE_VERIFICATION = 'HIY1XgYFRFCLwaTob54Dtx0InJae_SFmyX1bNslZDRg';

/**
 * SEOHead — مكوّن SEO موحّد لجميع صفحات bietalreef.ae (Next.js)
 * محسّن للـ SEO و AEO و GEO
 * 
 * @param {string} title — عنوان الصفحة
 * @param {string} description — وصف الصفحة (Meta Description)
 * @param {string} [keywords] — كلمات مفتاحية (اختياري)
 * @param {string} [ogImage] — رابط الصورة للمشاركة
 * @param {string} [ogType] — نوع المحتوى (website, article, etc.)
 * @param {boolean} [noIndex] — منع المحركات من الفهرسة
 * @param {object|array} [structuredData] — بيانات JSON-LD المهيكلة
 * @param {Array<{name,item}>} [breadcrumbs] — مسار التنقل (بعد الرئيسية)
 * @param {boolean} [includePWA] — إدراج tags الـ PWA (افتراضي: true)
 * @param {string} [canonicalPath] — المسار اليدوي لـ canonical (اختياري)
 * @param {string} [alternatePath] — المسار اليدوي للنسخة الإنجليزية (اختياري)
 */
export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData = null,
  breadcrumbs = null,
  includePWA = true,
  canonicalPath,
  alternatePath,
}) {
  const router = useRouter();
  
  // إزالة query string من canonical
  const cleanPath = canonicalPath || router.asPath.split('?')[0];
  const canonicalUrl = cleanPath === '/' || cleanPath === ''
    ? SITE_DOMAIN
    : `${SITE_DOMAIN}${cleanPath}`;

  const enPath = alternatePath || (cleanPath === '/' ? '/en' : `/en${cleanPath}`);

  // بناء BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
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

  // تجميع schemas في مصفوفة واحدة
  const schemas = [];
  if (structuredData) {
    if (Array.isArray(structuredData)) schemas.push(...structuredData);
    else schemas.push(structuredData);
  }
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Head>
      {/* ═══ Primary Meta Tags ═══ */}
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />

      {/* ═══ Geo Tags (UAE) — مهم للـ Local SEO و GEO ═══ */}
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="الإمارات العربية المتحدة" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* ═══ Content Language ═══ */}
      <meta name="content-language" content="ar, en" />

      {/* ═══ hreflang — ثنائي اللغة ═══ */}
      <link rel="alternate" hrefLang="ar-AE" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-AE" href={`${SITE_DOMAIN}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* ═══ Open Graph / Facebook — مهم للـ Social Sharing و AEO ═══ */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="ar_AE" />
      <meta property="og:locale:alternate" content="en_AE" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* ═══ Twitter Card ═══ */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bietalreef" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ═══ Google Search Console ═══ */}
      <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />

      {/* ═══ Additional SEO Meta Tags ═══ */}
      <meta name="format-detection" content="telephone=+971567856001" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* ═══ PWA Meta Tags ═══ */}
      {includePWA && (
        <>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0F3F1A" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
          <link rel="apple-touch-icon" href="/logo.png" />
        </>
      )}

      {/* ═══ JSON-LD Structured Data — مهم للـ AEO ═══ */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ═══ Preconnect to external domains ═══ */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}

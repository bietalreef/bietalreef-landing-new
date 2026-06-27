import { UAE_EMIRATES, SERVICE_CATEGORIES, getAllAreaPaths, getAllAreaServicePaths } from '../data/siteTaxonomy';

const SITE_URL = 'https://bietalreef.ae';

function buildUrl(path, priority = '0.7', changefreq = 'weekly') {
  return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function generateSitemap() {
  const staticPages = [
    ['/', '1.0', 'daily'],
    ['/services', '0.9', 'weekly'],
    ['/uae', '0.9', 'weekly'],
    ['/providers', '0.8', 'weekly'],
    ['/marketplace', '0.8', 'weekly'],
    ['/tools', '0.8', 'weekly'],
    ['/weyaak', '0.8', 'weekly'],
    ['/platform', '0.8', 'monthly'],
    ['/about', '0.6', 'monthly'],
    ['/blog', '0.6', 'weekly'],
    ['/legal', '0.4', 'monthly']
  ];

  const englishPages = [
    ['/en', '0.9', 'weekly'],
    ['/en/services', '0.8', 'weekly'],
    ['/en/categories', '0.8', 'weekly'],
    ['/en/providers', '0.8', 'weekly'],
    ['/en/marketplace', '0.8', 'weekly'],
    ['/en/tools', '0.8', 'weekly'],
    ['/en/weyaak', '0.8', 'weekly'],
    ['/en/platform', '0.8', 'monthly'],
    ['/en/about', '0.6', 'monthly'],
    ['/en/blog', '0.6', 'weekly'],
    ['/en/legal', '0.4', 'monthly']
  ];

  const urls = [
    ...staticPages.map(([path, priority, changefreq]) => buildUrl(path, priority, changefreq)),
    ...englishPages.map(([path, priority, changefreq]) => buildUrl(path, priority, changefreq)),
    ...SERVICE_CATEGORIES.map((service) => buildUrl(`/categories/${service.slug}`, '0.8', 'weekly')),
    ...UAE_EMIRATES.map((emirate) => buildUrl(`/uae/${emirate.slug}`, '0.85', 'weekly')),
    ...getAllAreaPaths().map((item) => buildUrl(`/uae/${item.emirate}/${item.area}`, '0.75', 'weekly')),
    ...getAllAreaServicePaths().map((item) => buildUrl(`/uae/${item.emirate}/${item.area}/${item.service}`, '0.72', 'weekly'))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(generateSitemap());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const errors = [];

const mirroredPages = [
  'index.js',
  'about.js',
  'why-biet-alreef.js',
  'how-it-works.js',
  'pricing.js',
  'contact.js',
  'services.js',
  'marketplace.js',
  'tools.js',
  'weyaak.js',
  'providers/index.js',
  'providers/register.js',
  'partners.js',
  'suppliers.js',
  'factories.js',
  'faq.js',
  'support-policy.js',
  'privacy.js',
  'legal.js',
  'cookies.js',
  'request-quote.js',
  'customer-service.js',
];

for (const relativePage of mirroredPages) {
  const arabicPage = path.join(root, 'pages', relativePage);
  const englishPage = path.join(root, 'pages', 'en', relativePage);
  if (!fs.existsSync(arabicPage)) errors.push(`Missing Arabic source page: pages/${relativePage}`);
  if (!fs.existsSync(englishPage)) errors.push(`Missing English mirror page: pages/en/${relativePage}`);
}

const forbiddenRoutes = [
  'pages/cards-preview.js',
  'pages/test-small-page.js',
  'pages/provider/[slug].js',
  'pages/en/provider/[slug].js',
  'pages/en-sitemap.js',
  'pages/en/platform.js',
];
for (const route of forbiddenRoutes) {
  if (fs.existsSync(path.join(root, route))) errors.push(`Duplicate or retired route still exists: ${route}`);
}

const sourceRoots = ['components', 'pages', 'lib', 'data', 'public', 'styles'];
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.xml', '.txt', '.html', '.css', '.webmanifest']);

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

const platformUrlsPath = path.join(root, 'lib', 'platformUrls.js');
if (!fs.existsSync(platformUrlsPath)) {
  errors.push('Missing central platform URL configuration: lib/platformUrls.js');
} else {
  const platformUrlsSource = fs.readFileSync(platformUrlsPath, 'utf8');
  for (const requiredUrl of [
    'https://play.google.com/store/apps/details?id=ae.bietalreef.app',
    'https://app.bietalreef.ae/',
    'https://providers.bietalreef.ae/',
  ]) {
    if (!platformUrlsSource.includes(requiredUrl)) errors.push(`Missing official platform destination: ${requiredUrl}`);
  }
}

const loginSource = fs.readFileSync(path.join(root, 'pages', 'login.js'), 'utf8');
if (loginSource.includes('statusCode = 410')) errors.push('Login route must redirect to the providers web app, not return 410.');
if (!loginSource.includes('PROVIDERS_APP_URL')) errors.push('Login route is not connected to the providers web app.');

const nextConfigSource = fs.readFileSync(path.join(root, 'next.config.js'), 'utf8');
for (const registrationRoute of ['/providers/register', '/en/providers/register']) {
  if (!nextConfigSource.includes(`source: '${registrationRoute}'`)) errors.push(`Missing operational redirect for ${registrationRoute}.`);
}

const manifestPath = path.join(root, 'public', 'manifest.webmanifest');
const workerPath = path.join(root, 'public', 'sw.js');
const offlinePath = path.join(root, 'public', 'offline.html');
for (const file of [manifestPath, workerPath, offlinePath]) {
  if (!fs.existsSync(file)) errors.push(`Missing PWA file: ${path.relative(root, file)}`);
}
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.scope !== '/' || !String(manifest.start_url || '').startsWith('/')) errors.push('PWA manifest must stay scoped to bietalreef.ae root.');
  if (!manifest.icons?.length) errors.push('PWA manifest must contain an install icon.');
}

const staticSitemapPath = path.join(root, 'public', 'sitemap.xml');
const dynamicSitemapPath = path.join(root, 'pages', 'sitemap.xml.js');
const searchIndexPath = path.join(root, 'lib', 'searchIndexRoutes.js');
if (fs.existsSync(staticSitemapPath)) errors.push('Static public/sitemap.xml must not coexist with the dynamic sitemap route.');
if (!fs.existsSync(dynamicSitemapPath)) errors.push('Missing pages/sitemap.xml.js.');
if (!fs.existsSync(searchIndexPath)) {
  errors.push('Missing lib/searchIndexRoutes.js.');
} else {
  const { buildSearchIndexEntries } = require(searchIndexPath);
  const entries = buildSearchIndexEntries();
  const urls = entries.map((entry) => entry.loc);
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (entries.length < 100) errors.push(`Search sitemap contains too few curated URLs: ${entries.length}.`);
  if (duplicates.length) errors.push(`Duplicate sitemap URLs: ${[...new Set(duplicates)].join(', ')}`);
  if (urls.some((url) => !url.startsWith('https://bietalreef.ae/'))) errors.push('Sitemap contains a URL outside bietalreef.ae.');
  if (entries.some((entry) => !entry.lastmod || !entry.changefreq || !entry.priority)) errors.push('Sitemap entry is missing lastmod, changefreq or priority.');
  if (entries.some((entry) => !entry.alternates?.ar || !entry.alternates?.en || !entry.alternates?.default)) errors.push('Bilingual sitemap entry is missing an alternate language URL.');
  for (const entry of entries) {
    for (const imageUrl of entry.images || []) {
      const imagePath = new URL(imageUrl).pathname.replace(/^\//, '');
      if (!fs.existsSync(path.join(root, 'public', imagePath))) errors.push(`Sitemap image does not exist: ${imageUrl}`);
    }
  }
}

const seoHead = fs.readFileSync(path.join(root, 'components', 'SEOHead.js'), 'utf8');
for (const marker of ['canonical', 'hreflang', 'application/ld+json', 'geo.region']) {
  if (!seoHead.includes(marker)) errors.push(`SEOHead is missing required SEO/AEO/GEO marker: ${marker}`);
}

const documentSource = fs.readFileSync(path.join(root, 'pages', '_document.js'), 'utf8');
for (const marker of ['google-site-verification', 'Organization', 'documentLanguage', 'en-AE', 'ar-AE']) {
  if (!documentSource.includes(marker)) errors.push(`_document.js is missing global search marker: ${marker}`);
}

const allSource = sourceRoots.flatMap((directory) => walk(path.join(root, directory))).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
if (allSource.includes('+971-XXXXXXXXX')) errors.push('Public source still contains a placeholder telephone number.');

if (errors.length) {
  console.error(`Site structure audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site structure audit passed: ${mirroredPages.length} bilingual pairs, PWA scope, SEO/AEO/GEO markers and dynamic sitemap integrity.`);

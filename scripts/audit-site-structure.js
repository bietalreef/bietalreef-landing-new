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
  'pages/join-provider.js',
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

const excludedApplicationDomain = ['app', 'bietalreef', 'ae'].join('.');
for (const file of sourceRoots.flatMap((directory) => walk(path.join(root, directory)))) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes(excludedApplicationDomain)) {
    errors.push(`Public source contains excluded application domain: ${path.relative(root, file)}`);
  }
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

const sitemapPath = path.join(root, 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicates.length) errors.push(`Duplicate sitemap URLs: ${[...new Set(duplicates)].join(', ')}`);
  if (urls.some((url) => !url.startsWith('https://bietalreef.ae'))) errors.push('Sitemap contains a URL outside bietalreef.ae.');
} else {
  errors.push('Missing public/sitemap.xml.');
}

const seoHead = fs.readFileSync(path.join(root, 'components', 'SEOHead.js'), 'utf8');
for (const marker of ['canonical', 'hreflang', 'application/ld+json', 'geo.region']) {
  if (!seoHead.includes(marker)) errors.push(`SEOHead is missing required SEO/AEO/GEO marker: ${marker}`);
}

if (errors.length) {
  console.error(`Site structure audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site structure audit passed: ${mirroredPages.length} bilingual pairs, PWA scope, SEO/AEO/GEO markers and sitemap integrity.`);

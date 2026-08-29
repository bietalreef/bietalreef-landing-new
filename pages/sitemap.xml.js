const { buildSearchIndexEntries } = require('../lib/searchIndexRoutes');
import { UAE_EMIRATES } from '../data/siteTaxonomy';
import {
  UAE_DIRECTORY_SECTION_SLUGS,
  getArabicUaeDirectoryCards,
  getPublishedProductsForSitemap,
  getPublishedProviderCards,
} from '../lib/platformDirectoryCards';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderAlternates(alternates) {
  if (!alternates) return '';
  return [
    ['ar-AE', alternates.ar],
    ['en-AE', alternates.en],
    ['x-default', alternates.default],
  ].map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(href)}" />`).join('\n');
}

function renderImages(images = []) {
  return images.map((image) => [
    '    <image:image>',
    `      <image:loc>${escapeXml(image)}</image:loc>`,
    '    </image:image>',
  ].join('\n')).join('\n');
}

function buildSitemapXml(entries) {
  const uniqueEntries = Array.from(
    entries.reduce((map, entry) => {
      if (!map.has(entry.loc)) map.set(entry.loc, entry);
      return map;
    }, new Map()).values(),
  ).sort((left, right) => left.loc.localeCompare(right.loc));

  const urls = uniqueEntries.map((entry) => {
    const optionalLines = [renderAlternates(entry.alternates), renderImages(entry.images)].filter(Boolean);
    return [
      '  <url>',
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      ...optionalLines,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority.toFixed(2)}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    '</urlset>',
  ].join('\n');
}

export async function getServerSideProps({ res }) {
  const entries = buildSearchIndexEntries();
  const [cards, providerCards, products] = await Promise.all([
    getArabicUaeDirectoryCards(),
    getPublishedProviderCards('ar'),
    getPublishedProductsForSitemap('ar'),
  ]);
  const lastmod = new Date().toISOString().slice(0, 10);
  const addPair = (arPath, enPath, image) => {
    const alternates = {
      ar: `https://bietalreef.ae${arPath}`,
      en: `https://bietalreef.ae${enPath}`,
      default: `https://bietalreef.ae${arPath}`,
    };
    const shared = {
      lastmod,
      changefreq: 'weekly',
      priority: 0.72,
      alternates,
      images: image ? [image.startsWith('http') ? image : `https://bietalreef.ae${image}`] : [],
    };
    entries.push(
      { ...shared, loc: alternates.ar },
      { ...shared, loc: alternates.en }
    );
  };

  providerCards.forEach((provider) => {
    const slug = String(provider.href || '').split('/').filter(Boolean).pop();
    if (!slug) return;
    addPair(
      `/providers/${slug}`,
      `/en/providers/${slug}`,
      provider.coverImage || provider.logoImage
    );
  });

  products
    .filter((product) => product.providerSlug !== 'arkleen')
    .forEach((product) => {
      addPair(
        `/products/${product.providerSlug}/${product.slug}`,
        `/en/products/${product.providerSlug}/${product.slug}`,
        product.image
      );
    });

  UAE_EMIRATES.forEach((emirate) => {
    cards.forEach((card) => {
      const section = UAE_DIRECTORY_SECTION_SLUGS[card.sectionKey];
      const suffix = `/directory/${section}/${card.activity.slug}`;
      addPair(`/uae/${emirate.slug}${suffix}`, `/en/uae/${emirate.slug}${suffix}`, card.image);
      emirate.areas.forEach((area) => {
        const areaSuffix = `/${area.slug}${suffix}`;
        addPair(`/uae/${emirate.slug}${areaSuffix}`, `/en/uae/${emirate.slug}${areaSuffix}`, card.image);
      });
    });
  });

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildSitemapXml(entries));
  res.end();
  return { props: {} };
}

export default function SitemapXml() {
  return null;
}

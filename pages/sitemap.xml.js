const { buildSearchIndexEntries } = require('../lib/searchIndexRoutes');
import { UAE_EMIRATES } from '../data/siteTaxonomy';
import {
  ABU_DHABI_DIRECTORY_SECTION_SLUGS,
  getArabicAbuDhabiDirectoryCards,
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
  const urls = entries.map((entry) => {
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
  const cards = await getArabicAbuDhabiDirectoryCards();
  const abuDhabi = UAE_EMIRATES.find((item) => item.slug === 'abu-dhabi');
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

  cards.forEach((card) => {
    const section = ABU_DHABI_DIRECTORY_SECTION_SLUGS[card.sectionKey];
    const suffix = `/directory/${section}/${card.activity.slug}`;
    addPair(`/uae/abu-dhabi${suffix}`, `/en/uae/abu-dhabi${suffix}`, card.image);
    abuDhabi.areas.forEach((area) => {
      const areaSuffix = `/${area.slug}${suffix}`;
      addPair(`/uae/abu-dhabi${areaSuffix}`, `/en/uae/abu-dhabi${areaSuffix}`, card.image);
    });
  });

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildSitemapXml(entries.sort((left, right) => left.loc.localeCompare(right.loc))));
  res.end();
  return { props: {} };
}

export default function SitemapXml() {
  return null;
}

import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getAllAreaPaths, getAllAreaServicePaths } from '../data/siteTaxonomy';

export default function EnglishRouteIndex() {
  const links = [
    '/en',
    '/en/services',
    '/en/uae',
    '/en/providers',
    '/en/marketplace',
    '/en/tools',
    '/en/weyaak',
    '/en/platform',
    '/en/about',
    '/en/blog',
    '/en/legal',
    ...SERVICE_CATEGORIES.map((s) => `/en/categories/${s.slug}`),
    ...UAE_EMIRATES.map((e) => `/en/uae/${e.slug}`),
    ...getAllAreaPaths().map((i) => `/en/uae/${i.emirate}/${i.area}`),
    ...getAllAreaServicePaths().slice(0, 400).map((i) => `/en/uae/${i.emirate}/${i.area}/${i.service}`)
  ];

  return (
    <>
      <Head>
        <title>English Route Index | Biet Al Reef</title>
        <meta name="description" content="English route index for Biet Al Reef public pages." />
        <link rel="canonical" href="https://bietalreef.ae/en-sitemap" />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">English route index</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">A working HTML index for English public website pages.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {links.map((href) => (
              <Link key={href} href={href} className="text-sm bg-white border border-[#E6DCC8] rounded-xl px-3 py-2 text-gray-600 hover:text-[#B8922B]">{href}</Link>
            ))}
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getAllAreaPaths, getAllAreaServicePaths } from '../../data/siteTaxonomy';

export default function EnglishHtmlSitemap() {
  const mainPages = ['/en', '/en/services', '/en/uae', '/en/providers', '/en/marketplace', '/en/tools', '/en/weyaak', '/en/platform', '/en/about', '/en/blog', '/en/legal'];
  const categoryPages = SERVICE_CATEGORIES.map((s) => `/en/categories/${s.slug}`);
  const emiratePages = UAE_EMIRATES.map((e) => `/en/uae/${e.slug}`);
  const areaPages = getAllAreaPaths().map((i) => `/en/uae/${i.emirate}/${i.area}`);
  const localServicePages = getAllAreaServicePaths().slice(0, 250).map((i) => `/en/uae/${i.emirate}/${i.area}/${i.service}`);

  const groups = [
    ['Main pages', mainPages],
    ['Categories', categoryPages],
    ['Emirates', emiratePages],
    ['Areas', areaPages],
    ['Local service pages sample', localServicePages]
  ];

  return (
    <>
      <Head>
        <title>English Sitemap | Biet Al Reef</title>
        <meta name="description" content="HTML sitemap for the English version of Biet Al Reef." />
        <link rel="canonical" href="https://bietalreef.ae/en/sitemap" />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Sitemap</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">English website sitemap</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">A crawlable HTML directory for the English pages, categories, UAE areas and local service pages.</p>
          <div className="space-y-8">
            {groups.map(([title, links]) => (
              <section key={title} className="bg-white border border-[#E6DCC8] rounded-3xl p-6 shadow-sm">
                <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {links.map((href) => (
                    <Link key={href} href={href} className="text-sm text-gray-600 hover:text-[#B8922B] border-b border-[#F0E6D6] py-1">{href}</Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

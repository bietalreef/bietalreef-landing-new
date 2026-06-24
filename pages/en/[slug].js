import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ENGLISH_STATIC_PAGES } from '../../data/englishPages';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../data/siteTaxonomy';

export default function EnglishStaticPage({ page, slug }) {
  const canonical = `https://bietalreef.ae/en/${slug}`;
  const arPath = slug === 'legal' ? '/legal' : `/${slug}`;
  return (
    <>
      <Head>
        <title>{`${page.title} | Biet Al Reef`}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae${arPath}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">{page.title}</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{page.heading}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">{page.description}</p>

          {slug === 'services' || slug === 'marketplace' || slug === 'tools' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/en/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">{service.nameEn}</h2>
                  <p className="text-sm text-gray-600 leading-6">Available across UAE cities and local areas.</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {UAE_EMIRATES.slice(0, 6).map((emirate) => (
                <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <h2 className="font-black text-[#0F3F1A] mb-2">{emirate.nameEn}</h2>
                  <p className="text-sm text-gray-600 leading-6">Explore service pages and areas in {emirate.nameEn}.</p>
                </Link>
              ))}
            </div>
          )}

          <Link href={slug === 'platform' ? 'https://app.bietalreef.ae' : '/en/uae'} className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">{page.cta}</Link>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const page = ENGLISH_STATIC_PAGES[params.slug];
  if (!page) return { notFound: true };
  return { props: { page, slug: params.slug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(ENGLISH_STATIC_PAGES).map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

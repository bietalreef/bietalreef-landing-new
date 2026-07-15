import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';

const SEO_FEATURES = {
  marketplace: {
    title: 'Marketplace SEO Page',
    heading: 'Marketplace discovery for Biet Al Reef',
    description: 'A focused English SEO page for the future marketplace layer covering materials, products and service discovery.'
  },
  store: {
    title: 'Store SEO Page',
    heading: 'Store and product discovery',
    description: 'A focused English SEO page for future product and supplier discovery inside the Biet Al Reef ecosystem.'
  },
  dashboards: {
    title: 'Dashboards SEO Page',
    heading: 'Dashboards and project visibility',
    description: 'An English page explaining future dashboard concepts for users, providers and project visibility.'
  },
  platform: {
    title: 'Platform SEO Page',
    heading: 'Biet Al Reef platform structure',
    description: 'An English page explaining the separation between the public website, the operational app and Weyaak.'
  },
  tools: {
    title: 'Tools SEO Page',
    heading: 'Smart tools for construction planning',
    description: 'An English page for smart planning tools, calculators, quotation support and service organization.'
  }
};

export default function EnglishSeoFeaturePage({ page, slug }) {
  const canonical = `https://bietalreef.ae/en/seo/${slug}`;
  return (
    <>
      <Head>
        <title>{`${page.title} | Biet Al Reef`}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/seo/${slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">SEO feature page</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{page.heading}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">{page.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <Link href="/en/how-it-works" className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">How it works</Link>
            <Link href="/en/marketplace" className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">Marketplace</Link>
            <Link href="/en/tools" className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">Tools</Link>
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const page = SEO_FEATURES[params.slug];
  if (!page) return { notFound: true };
  return { props: { page, slug: params.slug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(SEO_FEATURES).map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

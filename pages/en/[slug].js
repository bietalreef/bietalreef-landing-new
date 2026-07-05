import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ENGLISH_STATIC_PAGES, ENGLISH_SEO_SERVICE_PAGES } from '../../data/englishPages';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';

const RESERVED_ENGLISH_ROUTES = new Set(['weyaak']);

export default function EnglishStaticPage({ page, slug, service, isSeoService }) {
  const canonical = `https://bietalreef.ae/en/${slug}`;
  const arPath = isSeoService ? `/${slug}` : slug === 'legal' ? '/legal' : `/${slug}`;

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
          <p className="text-[#B8922B] font-black mb-3">{isSeoService ? 'Service SEO page' : page.title}</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{page.heading}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">{page.description}</p>

          {isSeoService && service ? (
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">Main category</h2>
                  <Link href={`/en/categories/${service.slug}`} className="text-[#B8922B] font-black">{service.nameEn}</Link>
                </div>
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-[#0F3F1A] mb-2">UAE coverage</h2>
                  <p className="text-sm text-gray-600 leading-7">This service page connects to UAE emirates, cities and local areas.</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-[#0F3F1A] mb-2">Public website role</h2>
                  <p className="text-sm text-gray-600 leading-7">Built for discovery, internal linking and search indexing.</p>
                </div>
              </section>
              <section className="mb-10">
                <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">Browse this service by emirate</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {UAE_EMIRATES.map((emirate) => (
                    <Link key={emirate.slug} href={`/en/uae/${emirate.slug}/${emirate.areas[0].slug}/${service.slug}`} className="bg-white border border-[#E6DCC8] rounded-2xl p-4 shadow-sm hover:border-[#D4AF37] font-bold text-gray-700">
                      {service.nameEn} in {emirate.nameEn}
                    </Link>
                  ))}
                </div>
              </section>
            </>
          ) : slug === 'services' || slug === 'marketplace' || slug === 'tools' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
              {SERVICE_CATEGORIES.map((item) => (
                <Link key={item.slug} href={`/en/categories/${item.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">{item.nameEn}</h2>
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

          <Link href={slug === 'platform' ? '/en/platform' : '/en/uae'} className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">{page.cta}</Link>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const staticPage = ENGLISH_STATIC_PAGES[params.slug];
  if (staticPage) {
    return { props: { page: staticPage, slug: params.slug, isSeoService: false }, revalidate: 3600 };
  }

  const seoPage = ENGLISH_SEO_SERVICE_PAGES[params.slug];
  if (seoPage) {
    const service = getServiceCategory(seoPage.categorySlug);
    return {
      props: {
        page: { ...seoPage, cta: 'Browse UAE areas' },
        slug: params.slug,
        service,
        isSeoService: true
      },
      revalidate: 3600
    };
  }

  return { notFound: true };
}

export async function getStaticPaths() {
  return {
    paths: [
      ...Object.keys(ENGLISH_STATIC_PAGES)
        .filter((slug) => !RESERVED_ENGLISH_ROUTES.has(slug))
        .map((slug) => ({ params: { slug } })),
      ...Object.keys(ENGLISH_SEO_SERVICE_PAGES).map((slug) => ({ params: { slug } }))
    ],
    fallback: 'blocking'
  };
}

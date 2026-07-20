import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../../data/siteTaxonomy';
import { getSectorCardImage } from '../../../lib/sectorCards';
import ServicesSmartFooter from '../../../components/ServicesSmartFooter';
import SectionBackBar from '../../../components/SectionBackBar';
import SectionCategoryHero from '../../../components/SectionCategoryHero';

export default function EnglishCategoryPage({ service }) {
  const canonical = `https://bietalreef.ae/en/categories/${service.slug}`;
  return (
    <>
      <Head>
        <title>{`${service.nameEn} in the UAE | Biet Al Reef`}</title>
        <meta name="description" content={`Find ${service.nameEn.toLowerCase()} pages across UAE emirates, cities and service areas through Biet Al Reef.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/categories/${service.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
        <meta property="og:title" content={`${service.nameEn} in the UAE | Biet Al Reef`} />
        <meta property="og:description" content={`Find ${service.nameEn.toLowerCase()} pages across UAE emirates, cities and service areas through Biet Al Reef.`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`https://bietalreef.ae${getSectorCardImage(service.slug)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://bietalreef.ae${getSectorCardImage(service.slug)}`} />
      </Head>
      <EnglishLayout>
        <SectionBackBar locale="en" href="/en/services" label="Back to Services & Offers" />
        <main className="bg-[#FDFBF7]">
          <SectionCategoryHero locale="en" type="services" title={service.nameEn} description={service.descEn || `Browse ${service.nameEn.toLowerCase()} services, offers and request paths across the UAE.`} image={getSectorCardImage(service.slug)} />
          <section className="mx-auto max-w-7xl px-4 pb-16">
            <div className="mb-8"><p className="font-black text-[#B8922B]">Browse by location</p><h2 className="mt-3 text-3xl font-black text-[#0F3F1A]">Choose an emirate and service area</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UAE_EMIRATES.map((emirate) => (
              <div key={emirate.slug} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm">
                <Link href={`/en/uae/${emirate.slug}`} className="font-black text-[#0F3F1A] hover:text-[#B8922B] block mb-3">{emirate.nameEn}</Link>
                <div className="flex flex-wrap gap-2">
                  {emirate.areas.slice(0, 8).map((area) => (
                    <Link key={area.slug} href={`/en/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="text-xs border border-[#E6DCC8] rounded-full px-3 py-1 text-gray-600 hover:text-[#0F3F1A] hover:border-[#D4AF37]">
                      {area.nameEn}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </section>
          <ServicesSmartFooter locale="en" />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const service = getServiceCategory(params.slug);
  if (!service) return { notFound: true };
  return { props: { service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })),
    fallback: 'blocking'
  };
}

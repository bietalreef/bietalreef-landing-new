import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../../../data/siteTaxonomy';

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  return (
    <>
      <Head>
        <title>{`${emirate.nameEn} Construction and Maintenance Services | Biet Al Reef`}</title>
        <meta name="description" content={`Browse service categories and local areas for construction, maintenance, materials and design in ${emirate.nameEn}.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">UAE emirate</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Construction and maintenance services in {emirate.nameEn}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Explore local service areas in {emirate.nameEn} and connect each area with relevant building, maintenance and design categories.</p>
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">Areas in {emirate.nameEn}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {emirate.areas.map((area) => (
                <Link key={area.slug} href={`/en/uae/${emirate.slug}/${area.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 shadow-sm hover:border-[#D4AF37] font-bold text-gray-700">{area.nameEn}</Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">Service categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SERVICE_CATEGORIES.slice(0, 12).map((service) => (
                <Link key={service.slug} href={`/en/uae/${emirate.slug}/${emirate.areas[0].slug}/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <div className="font-black text-[#0F3F1A]">{service.nameEn}</div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };
  return { props: { emirate }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: UAE_EMIRATES.map((emirate) => ({ params: { emirate: emirate.slug } })),
    fallback: 'blocking'
  };
}

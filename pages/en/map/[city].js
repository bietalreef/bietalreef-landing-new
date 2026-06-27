import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../../data/siteTaxonomy';

function titleFromSlug(slug) {
  return slug.split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

export default function EnglishMapCityPage({ city, cityName }) {
  const canonical = `https://bietalreef.ae/en/map/${city}`;
  return (
    <>
      <Head>
        <title>{`${cityName} Service Map | Biet Al Reef`}</title>
        <meta name="description" content={`Browse service categories connected to ${cityName} through the Biet Al Reef English map page.`} />
        <link rel="canonical" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Map page</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Service map for {cityName}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">This English map-style page links {cityName} to service categories and nearby UAE area pages.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
            {SERVICE_CATEGORIES.map((service) => (
              <Link key={service.slug} href={`/en/map/${city}/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h2 className="font-black text-[#0F3F1A]">{service.nameEn}</h2>
              </Link>
            ))}
          </section>
          <section className="bg-white rounded-3xl border border-[#E6DCC8] p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">UAE area directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="text-gray-600 hover:text-[#B8922B] font-bold">{emirate.nameEn}</Link>
              ))}
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { city: params.city, cityName: titleFromSlug(params.city) } };
}

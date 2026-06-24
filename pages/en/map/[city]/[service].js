import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import { SERVICE_CATEGORIES, getServiceCategory } from '../../../../data/siteTaxonomy';

function titleFromSlug(slug) {
  return slug.split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

export default function EnglishMapServicePage({ city, cityName, service }) {
  const canonical = `https://bietalreef.ae/en/map/${city}/${service.slug}`;
  return (
    <>
      <Head>
        <title>{`${service.nameEn} in ${cityName} | Biet Al Reef`}</title>
        <meta name="description" content={`Information page for ${service.nameEn.toLowerCase()} in ${cityName}.`} />
        <link rel="canonical" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Map service page</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{service.nameEn} in {cityName}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">This page connects {cityName} with the {service.nameEn.toLowerCase()} category and related service pages.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <Link href={`/en/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">{service.nameEn}</Link>
            <Link href={`/en/map/${city}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">{cityName}</Link>
            <Link href="/en/uae" className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm hover:border-[#D4AF37]">UAE areas</Link>
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const service = getServiceCategory(params.service);
  if (!service) return { notFound: true };
  return { props: { city: params.city, cityName: titleFromSlug(params.city), service } };
}

import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea } from '../../../../data/siteTaxonomy';

export default function EnglishAreaPage({ emirate, area }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${area.slug}`;
  return (
    <>
      <Head>
        <title>{`${area.nameEn} Service Categories | Biet Al Reef`}</title>
        <meta name="description" content={`Browse construction, maintenance, design and building service categories in ${area.nameEn}, ${emirate.nameEn}.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}/${area.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Local service area</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Services in {area.nameEn}, {emirate.nameEn}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Choose a category to view a focused local page for {area.nameEn}. These pages are structured for internal linking and search indexing.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SERVICE_CATEGORIES.map((service) => (
              <Link key={service.slug} href={`/en/uae/${emirate.slug}/${area.slug}/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h2 className="font-black text-[#0F3F1A] mb-2">{service.nameEn}</h2>
                <p className="text-sm text-gray-600 leading-6">{service.nameEn} information in {area.nameEn}.</p>
              </Link>
            ))}
          </div>
        </main>
        <UaeSmartFooter locale="en" pageType="area" emirate={emirate} area={area} />
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  if (!emirate || !area) return { notFound: true };
  return { props: { emirate, area }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => paths.push({ params: { emirate: emirate.slug, area: area.slug } }));
  });
  return { paths, fallback: 'blocking' };
}

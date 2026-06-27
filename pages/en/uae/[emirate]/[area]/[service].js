import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../../data/siteTaxonomy';

export default function EnglishLocalServicePage({ emirate, area, service }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${area.slug}/${service.slug}`;
  return (
    <>
      <Head>
        <title>{`${service.nameEn} in ${area.nameEn}, ${emirate.nameEn} | Biet Al Reef`}</title>
        <meta name="description" content={`Find information about ${service.nameEn.toLowerCase()} in ${area.nameEn}, ${emirate.nameEn}. Biet Al Reef organizes UAE local service pages for clear search indexing.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}/${area.slug}/${service.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Local service page</p>
          <div className="flex items-center gap-4 mb-5">
            <div className="text-4xl">{service.icon}</div>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A]">{service.nameEn} in {area.nameEn}</h1>
          </div>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">This page organizes {service.nameEn.toLowerCase()} information for {area.nameEn}, {emirate.nameEn}. It supports local discovery, internal linking and future provider matching inside Biet Al Reef.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Area</h2>
              <Link href={`/en/uae/${emirate.slug}/${area.slug}`} className="text-[#B8922B] font-bold">{area.nameEn}</Link>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Emirate</h2>
              <Link href={`/en/uae/${emirate.slug}`} className="text-[#B8922B] font-bold">{emirate.nameEn}</Link>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Category</h2>
              <Link href={`/en/categories/${service.slug}`} className="text-[#B8922B] font-bold">{service.nameEn}</Link>
            </div>
          </section>
          <section className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">What this page covers</h2>
            <p className="text-gray-600 leading-8 mb-5">Users looking for {service.nameEn.toLowerCase()} in {area.nameEn} can use this page to understand the category, move to the broader emirate page, or continue to related local service pages.</p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.filter((item) => item.slug !== service.slug).slice(0, 8).map((item) => (
                <Link key={item.slug} href={`/en/uae/${emirate.slug}/${area.slug}/${item.slug}`} className="text-xs border border-[#E6DCC8] rounded-full px-3 py-1 text-gray-600 hover:text-[#0F3F1A] hover:border-[#D4AF37]">
                  {item.nameEn}
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
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  return { props: { emirate, area, service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => {
      SERVICE_CATEGORIES.forEach((service) => {
        paths.push({ params: { emirate: emirate.slug, area: area.slug, service: service.slug } });
      });
    });
  });
  return { paths, fallback: 'blocking' };
}

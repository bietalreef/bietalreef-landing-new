import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../../../data/siteTaxonomy';

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  return (
    <>
      <Head>
        <title>{`${emirate.nameEn} Services | Biet Al Reef`}</title>
        <meta name="description" content={`Choose a service category in ${emirate.nameEn}. Areas remain available through smart footer links without removing existing routes.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">UAE emirate</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Services in {emirate.nameEn}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Choose the service category first. City and area pages still exist, but they are now organized inside the smart footer links.</p>
          <section>
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">Service categories in {emirate.nameEn}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SERVICE_CATEGORIES.map((service) => (
                <Link key={service.slug} href={`/en/uae/${emirate.slug}/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37] hover:shadow-lg transition">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <div className="font-black text-[#0F3F1A]">{service.nameEn} in {emirate.nameEn}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-6">Open the service hub, then use smart footer links to move by area.</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <UaeSmartFooter locale="en" pageType="emirate" emirate={emirate} />
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

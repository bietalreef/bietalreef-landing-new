import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import { SERVICE_CATEGORIES } from '../../../../data/siteTaxonomy';
import { providers } from '../../../../data/providers';

function providerTypeLabel(provider) {
  if (provider.slug === 'al-hoot-marble-granite-factory') return 'Marble & Granite Factory';
  return provider.nameEn || 'Service provider';
}

function providerDescription(provider) {
  if (provider.slug === 'al-hoot-marble-granite-factory') {
    return 'White Whale Marble & Granite Factory specializes in supplying, fabricating and installing natural marble, granite and quartz for kitchens, façades, floors, washbasins and stairs across Al Ain, Abu Dhabi and the UAE.';
  }
  return provider.nameEn || provider.nameAr;
}

export default function EnglishProviderSpecialtyPage({ specialty, matchingProviders }) {
  const canonical = `https://bietalreef.ae/en/providers/specialty/${specialty.slug}`;

  return (
    <>
      <Head>
        <title>{specialty.nameEn || specialty.nameAr} Providers | Biet Al Reef</title>
        <meta name="description" content={`Browse ${specialty.nameEn || specialty.nameAr} providers inside Biet Al Reef. Provider listings are separated from UAE location search and service offers.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/providers/specialty/${specialty.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <Link href="/en/providers" className="inline-flex rounded-full border border-[#E6DCC8] bg-white px-4 py-2 text-sm font-black text-[#0F3F1A] hover:border-[#D4AF37]">
              ← Back to service providers
            </Link>
            <header className="mt-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E6DCC8] bg-white text-5xl shadow-sm">{specialty.icon}</div>
              <p className="mb-3 font-black text-[#B8922B]">Provider specialty</p>
              <h1 className="text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">{specialty.nameEn || specialty.nameAr} Providers</h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">Each specialty opens inside the providers path, while city and emirate discovery remains inside the UAE Directory.</p>
            </header>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16">
            {matchingProviders.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {matchingProviders.map((provider) => (
                  <Link key={provider.slug} href={`/en/providers/${provider.slug}`} className="group block rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{providerTypeLabel(provider)}</span>{provider.verified && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Verified</span>}</div>
                    <h2 className="text-xl font-black text-[#0F3F1A] group-hover:text-[#D4AF37]">{provider.nameEn || provider.nameAr}</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{providerDescription(provider)}</p>
                    <div className="mt-5 border-t border-gray-100 pt-4 text-sm font-black text-primary">Open provider profile</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-black text-[#0F3F1A]">No approved providers yet</h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600 leading-8">This specialty is available as a provider category, but no approved provider profile is published inside it yet.</p>
                <Link href="/en/providers" className="mt-6 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white">Back to providers</Link>
              </div>
            )}
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const specialty = SERVICE_CATEGORIES.find((item) => item.slug === params.slug);
  if (!specialty) return { notFound: true };
  const matchingProviders = providers.filter((provider) => provider.categorySlugs?.includes(params.slug));
  return { props: { specialty, matchingProviders }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: SERVICE_CATEGORIES.map((specialty) => ({ params: { slug: specialty.slug } })),
    fallback: 'blocking',
  };
}

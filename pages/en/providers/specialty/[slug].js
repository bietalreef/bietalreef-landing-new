import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import { SERVICE_CATEGORIES } from '../../../../data/siteTaxonomy';
import { providers } from '../../../../data/providers';
import SectionBackBar from '../../../../components/SectionBackBar';
import ProvidersSmartFooter from '../../../../components/ProvidersSmartFooter';

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
        <meta property="og:title" content={`${specialty.nameEn || specialty.nameAr} Providers | Biet Al Reef`} />
        <meta property="og:description" content={`Browse ${specialty.nameEn || specialty.nameAr} provider profiles inside Biet Al Reef.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://bietalreef.ae/images/providers-hero.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${specialty.nameEn || specialty.nameAr} Providers | Biet Al Reef`} />
        <meta name="twitter:image" content="https://bietalreef.ae/images/providers-hero.webp" />
      </Head>

      <EnglishLayout>
        <SectionBackBar locale="en" href="/en/providers" label="Back to service providers" />
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
              <div className="grid grid-cols-1 gap-7">
                {matchingProviders.map((provider) => (
                  <Link key={provider.slug} href={`/en/providers/${provider.slug}`} className="group block overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-white shadow-xl shadow-[#8A6A00]/10 transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
                      <div className="bg-[radial-gradient(circle_at_top,#3B2A10_0%,#101010_52%,#050505_100%)] p-7 text-white md:p-9">
                        <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-black text-[#F3D46B]">Premium specialty</span>{provider.verified && <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-100">Verified</span>}</div>
                        <h2 className="text-3xl font-black leading-tight">{provider.nameEn || provider.nameAr}</h2>
                        <p className="mt-3 text-sm font-bold text-[#F3D46B]">{providerTypeLabel(provider)} · Al Ain · Abu Dhabi</p>
                      </div>
                      <div className="p-7 md:p-9">
                        <p className="text-base font-semibold leading-8 text-gray-700">{providerDescription(provider)}</p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {['Natural marble', 'Granite & quartz', 'Supply & installation'].map((item) => <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>)}
                        </div>
                        <div className="mt-7 border-t border-[#EFE5D2] pt-5 text-sm font-black text-primary">Open provider profile</div>
                      </div>
                    </div>
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
          <ProvidersSmartFooter locale="en" />
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
  return { paths: SERVICE_CATEGORIES.map((specialty) => ({ params: { slug: specialty.slug } })), fallback: 'blocking' };
}

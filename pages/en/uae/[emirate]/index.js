import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate } from '../../../../data/siteTaxonomy';
import { providers } from '../../../../data/providers';

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  const featuredProvider = emirate.slug === 'abu-dhabi'
    ? providers.find((provider) => provider.slug === 'al-hoot-marble-granite-factory')
    : null;

  return (
    <>
      <Head>
        <title>{`${emirate.nameEn} Services | Biet Al Reef`}</title>
        <meta name="description" content={`Choose a service category in ${emirate.nameEn}. Areas remain available through smart footer links without removing existing routes.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="max-w-7xl mx-auto px-4 py-14 md:py-20 text-left">
          <p className="text-[#B8922B] font-black mb-3">UAE emirate</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Services in {emirate.nameEn}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Choose the service category first. City and area pages still exist, but they are now organized inside the smart footer links.</p>

          {featuredProvider && (
            <section className="mb-14">
              <div className="mb-6 text-left">
                <span className="inline-flex rounded-full bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00] border border-[#D4AF37]/30">Featured service provider in Abu Dhabi</span>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-[#0F3F1A]">Trusted service card inside Abu Dhabi Directory</h2>
                <p className="mt-3 text-gray-600 leading-8">White Whale Marble & Granite Factory is highlighted in Abu Dhabi because it provides marble, granite and quartz services for Al Ain, Abu Dhabi and the UAE.</p>
              </div>
              <Link href={`/en/providers/${featuredProvider.slug}`} className="group block overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-xl shadow-[#8A6A00]/10 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="h-1.5 bg-gradient-to-r from-[#0F3F1A] via-[#D4AF37] to-[#0F3F1A]" />
                <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
                  <div className="bg-gradient-to-br from-[#071A12] via-[#0F3F1A] to-[#1A5C28] p-7 text-white md:p-9">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-black text-[#F3D46B]">Premium specialty</span>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-100">Verified</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{featuredProvider.nameEn || featuredProvider.nameAr}</h3>
                    <p className="mt-3 text-sm font-bold text-[#F3D46B]">Marble & Granite Factory · Al Ain · Abu Dhabi</p>
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="text-base font-semibold leading-8 text-gray-700">Specialized in supplying, fabricating and installing natural marble, granite and quartz for kitchens, façades, floors and stairs across Al Ain, Abu Dhabi and the UAE.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {['Natural marble & granite', 'Quartz and kitchens', 'Façades and floors'].map((item) => (
                        <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FFF8E5] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>
                      ))}
                    </div>
                    <div className="mt-7 border-t border-[#EFE5D2] pt-5">
                      <span className="inline-flex rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">Open factory profile</span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

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

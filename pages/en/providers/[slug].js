import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { providers } from '../../../data/providers';

const serviceLabels = {
  'رخام طبيعي': 'Natural marble',
  'جرانيت': 'Granite',
  'كوارتز': 'Quartz',
  'حجر صناعي': 'Engineered stone',
  'تصنيع حسب الطلب': 'Custom fabrication',
  'توريد': 'Supply',
  'تركيب': 'Installation',
  'مطابخ': 'Kitchens',
  'مغاسل': 'Washbasins',
  'واجهات': 'Façades',
  'أرضيات': 'Floors',
  'سلالم': 'Stairs',
};

function providerDescription(provider) {
  if (provider.slug === 'al-hoot-marble-granite-factory') {
    return 'White Whale Marble & Granite Factory specializes in supplying, fabricating and installing natural marble, granite and quartz for kitchens, façades, floors, washbasins and stairs across Al Ain, Abu Dhabi and the UAE.';
  }
  return provider.descriptionAr;
}

export default function EnglishProviderProfilePage({ provider }) {
  const description = providerDescription(provider);
  const canonical = `https://bietalreef.ae/en/providers/${provider.slug}`;

  return (
    <>
      <Head>
        <title>{provider.nameEn || provider.nameAr} | Service Provider | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/providers/${provider.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="relative overflow-hidden bg-gradient-to-br from-[#071A12] via-[#0F3F1A] to-[#1A5C28] px-4 py-16 text-white md:py-24">
            <div className="mx-auto max-w-6xl">
              <Link href="/en/providers" className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 transition hover:bg-white/20">
                ← Back to service providers
              </Link>
              <div className="mt-8 max-w-4xl">
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-black text-[#F3D46B]">Premium specialty</span>
                  {provider.verified && <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 text-xs font-black text-emerald-100">Verified provider</span>}
                </div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl">{provider.nameEn || provider.nameAr}</h1>
                <p className="mt-4 text-base font-bold text-[#F3D46B] md:text-lg">Marble & Granite Factory · Al Ain · Abu Dhabi</p>
                <p className="mt-6 max-w-3xl text-lg leading-9 text-white/85">{description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={`https://wa.me/${String(provider.whatsapp || '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A] transition hover:bg-[#b8922b]">
                    Contact on WhatsApp
                  </a>
                  <a href={`tel:${provider.phone}`} className="inline-flex justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white/20">
                    Call factory
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm">
                <span className="text-sm font-black text-[#8A6A00]">01</span>
                <h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Factory specialty</h2>
                <p className="mt-3 text-sm leading-8 text-gray-600">Marble, granite, quartz and custom stone fabrication for residential and commercial projects.</p>
              </div>
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm">
                <span className="text-sm font-black text-[#8A6A00]">02</span>
                <h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Coverage</h2>
                <p className="mt-3 text-sm leading-8 text-gray-600">Al Ain, Abu Dhabi and project requests across the UAE depending on project details.</p>
              </div>
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm">
                <span className="text-sm font-black text-[#8A6A00]">03</span>
                <h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Quotation method</h2>
                <p className="mt-3 text-sm leading-8 text-gray-600">Send measurements, location, photos and material preference to request a suitable quotation.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-[#0F3F1A]">Services and product paths</h2>
              <p className="mt-3 max-w-3xl text-gray-600 leading-8">The factory can support requests for supply, fabrication and installation according to project requirements.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {provider.services.map((service) => (
                  <div key={service} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-sm font-black text-[#0F3F1A]">
                    {serviceLabels[service] || service}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0F3F1A] to-[#1a5c28] p-8 text-white md:p-12">
              <h2 className="text-3xl font-black">Need marble, granite or quartz for your project?</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-8">Send your project details and get directed to the right quotation path.</p>
              <a href={`https://wa.me/${String(provider.whatsapp || '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A] transition hover:bg-[#b8922b]">
                Request quotation
              </a>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const provider = providers.find((item) => item.slug === params.slug);
  if (!provider) return { notFound: true };
  return { props: { provider }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: providers.map((provider) => ({ params: { slug: provider.slug } })),
    fallback: 'blocking',
  };
}

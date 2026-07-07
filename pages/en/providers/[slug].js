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
  return provider.nameEn || provider.nameAr;
}

export default function EnglishProviderProfilePage({ provider }) {
  const description = providerDescription(provider);
  const canonical = `https://bietalreef.ae/en/providers/${provider.slug}`;
  const whatsappDigits = String(provider.whatsapp || '').replace(/\D/g, '');

  return (
    <>
      <Head>
        <title>{provider.nameEn || provider.nameAr} | Premium Service Provider | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/providers/${provider.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#3B2A10_0%,#101010_42%,#050505_100%)] px-4 py-16 text-white md:py-24">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent_0%,#D4AF37_48%,transparent_72%)]" />
            <div className="relative mx-auto max-w-6xl">
              <Link href="/en/providers" className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/20">
                ← Back to service providers
              </Link>
              <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-center">
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-black text-[#F3D46B]">Premium design profile</span>
                    {provider.verified && <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 text-xs font-black text-emerald-100">Verified provider</span>}
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black text-white/80">Marble & Granite Factory</span>
                  </div>
                  <h1 className="text-4xl font-black leading-tight md:text-6xl">{provider.nameEn || provider.nameAr}</h1>
                  <p className="mt-4 text-base font-bold text-[#F3D46B] md:text-lg">Marble · Granite · Quartz · Al Ain · Abu Dhabi</p>
                  <p className="mt-6 max-w-3xl text-lg leading-9 text-white/82">{description}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {whatsappDigits ? <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]">Contact on WhatsApp</a> : null}
                    <a href={`tel:${provider.phone}`} className="inline-flex justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white/20">Call factory</a>
                    <Link href="/en/contact" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/40 px-8 py-4 font-black text-[#F3D46B] transition hover:bg-[#D4AF37] hover:text-[#12110B]">Request quotation</Link>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/8 p-6 shadow-2xl backdrop-blur">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-white/15 via-[#D4AF37]/10 to-black/20 p-6">
                    <p className="text-sm font-black text-[#F3D46B]">Trust card</p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-black/25 p-4"><div className="text-3xl font-black text-[#F3D46B]">4.9</div><div className="mt-1 text-xs text-white/70">Verified rating</div></div>
                      <div className="rounded-2xl bg-black/25 p-4"><div className="text-3xl font-black text-[#F3D46B]">12+</div><div className="mt-1 text-xs text-white/70">Service paths</div></div>
                      <div className="rounded-2xl bg-black/25 p-4"><div className="text-3xl font-black text-[#F3D46B]">UAE</div><div className="mt-1 text-xs text-white/70">Project coverage</div></div>
                      <div className="rounded-2xl bg-black/25 p-4"><div className="text-3xl font-black text-[#F3D46B]">✓</div><div className="mt-1 text-xs text-white/70">Reviewed profile</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm"><span className="text-sm font-black text-[#8A6A00]">01</span><h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Factory specialty</h2><p className="mt-3 text-sm leading-8 text-gray-600">Marble, granite, quartz and custom stone fabrication for residential and commercial projects.</p></div>
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm"><span className="text-sm font-black text-[#8A6A00]">02</span><h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Coverage</h2><p className="mt-3 text-sm leading-8 text-gray-600">Al Ain, Abu Dhabi and project requests across the UAE depending on project details.</p></div>
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm"><span className="text-sm font-black text-[#8A6A00]">03</span><h2 className="mt-3 text-xl font-black text-[#0F3F1A]">Quotation method</h2><p className="mt-3 text-sm leading-8 text-gray-600">Send measurements, location, photos and material preference to request a suitable quotation.</p></div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-[#0F3F1A]">Services and product paths</h2>
              <p className="mt-3 max-w-3xl text-gray-600 leading-8">The factory can support requests for supply, fabrication and installation according to project requirements.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {provider.services.map((service) => <div key={service} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-sm font-black text-[#0F3F1A]">{serviceLabels[service] || service}</div>)}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#101010] via-[#1b160c] to-[#0F3F1A] p-8 text-white md:p-12">
              <h2 className="text-3xl font-black">Need marble, granite or quartz for your project?</h2>
              <p className="mt-4 max-w-2xl text-white/75 leading-8">Send your project details and get directed to the right quotation path.</p>
              {whatsappDigits ? <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]">Request quotation</a> : null}
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
  return { paths: providers.map((provider) => ({ params: { slug: provider.slug } })), fallback: 'blocking' };
}

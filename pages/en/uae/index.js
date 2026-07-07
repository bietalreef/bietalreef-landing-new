import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../../data/siteTaxonomy';
import { MapPinned, Search } from 'lucide-react';

const experienceBySlug = {
  'abu-dhabi': 'Construction, maintenance, design and building material services in Abu Dhabi, Al Ain and the emirate areas.',
  dubai: 'Contracting, finishing, maintenance and design services in Dubai and its residential and commercial districts.',
  sharjah: 'Contractor, craftsman, building material and design services in Sharjah, its cities and areas.',
  ajman: 'Construction, maintenance, décor and building material services in Ajman and its areas.',
  'ras-al-khaimah': 'Contracting, maintenance, material and décor services in Ras Al Khaimah and its areas.',
  fujairah: 'Construction, maintenance, design and building material services in Fujairah and east coast areas.',
  'umm-al-quwain': 'Contractor, maintenance, material and furniture services in Umm Al Quwain and its areas.',
};

export default function EnglishUaeIndex() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'UAE Directory',
    description: 'Biet Al Reef UAE Directory helps customers start requests by emirate, then city, then service type.',
    url: 'https://bietalreef.ae/en/uae',
    inLanguage: 'en-AE'
  };

  return (
    <>
      <Head>
        <title>UAE Directory for Construction, Design and Maintenance | Biet Al Reef</title>
        <meta name="description" content="Biet Al Reef UAE Directory helps you start your request by emirate and service type for contracting, maintenance, interior design, décor and building materials across the UAE." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/uae" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/uae" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/uae" />
        <meta property="og:title" content="UAE Directory | Biet Al Reef" />
        <meta property="og:description" content="Start by emirate, then city, then service type across the UAE." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/uae" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left text-gray-900">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] px-4 pb-12 pt-7 md:pb-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#F3E6CD_0%,#FDFBF7_48%,#F7F1E8_100%)]" />
            <div className="relative z-10 mx-auto max-w-6xl text-center">
              <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white/92 px-5 py-9 shadow-2xl shadow-[#8A6A00]/10 backdrop-blur-xl md:rounded-[2.5rem] md:px-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]"><MapPinned size={15} /> Start by location</span>
                <h1 className="mt-4 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">UAE Directory</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-gray-700 md:text-xl">Start your journey to discover services and opportunities across the Emirates.</p>
                <a href="#uae-emirates" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-black text-[#1F170D] shadow-lg transition hover:-translate-y-0.5">Explore now</a>
              </div>
            </div>
          </section>

          <section id="uae-emirates" className="scroll-mt-24 px-4 py-14 md:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A]/8 px-4 py-1 text-xs font-black text-[#0F3F1A]"><Search size={14} /> Choose an emirate</span>
                <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">Explore Biet Al Reef services by emirate</h2>
                <p className="mx-auto mt-3 max-w-3xl text-gray-600 leading-8">An interface designed to start from location, then define the service, then move to a clear request without confusion.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {UAE_EMIRATES.map((emirate) => (
                  <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="group block rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-6 shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:border-[#D4AF37]/70">
                    <span className="text-xs font-black text-[#B8922B]">Emirate</span>
                    <h3 className="mt-2 text-3xl font-black text-[#0F3F1A]">{emirate.nameEn}</h3>
                    <p className="mt-4 text-sm font-semibold leading-7 text-gray-600">{experienceBySlug[emirate.slug] || emirate.description}</p>
                    <span className="mt-5 inline-flex rounded-full bg-[#0F3F1A] px-4 py-2.5 text-xs font-black text-white">Explore now</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 pb-12">
            <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white/88 p-5 shadow-sm md:p-7">
              <h2 className="text-2xl font-black text-[#0F3F1A]">Popular services inside the directory</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {SERVICE_CATEGORIES.slice(0, 10).map((service) => (
                  <Link key={service.slug} href="/en/uae" className="rounded-full bg-[#FDFBF7] border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">{service.icon} {service.nameEn}</Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 pb-12">
            <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">How does the UAE Directory serve project owners?</h2>
              <p className="mt-4 leading-8 text-gray-600">The directory uses a clear geographic order that starts from the emirate, then the city or area, then the service type. This makes access to services clearer and gives every page local context for search and answer engines.</p>
            </div>
          </section>

          <UaeSmartFooter locale="en" pageType="index" />
        </main>
      </EnglishLayout>
    </>
  );
}

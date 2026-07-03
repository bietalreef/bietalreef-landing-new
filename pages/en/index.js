import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';
import { ArrowLeft, Bot, MapPinned, ShoppingBag, UsersRound, Wrench } from 'lucide-react';

const mainPortals = [
  { href: '/en/uae', title: 'UAE Directory', desc: 'Start from the emirate, city, area, then the service you need.', icon: MapPinned, emoji: '🇦🇪' },
  { href: '/en/providers', title: 'Service Providers', desc: 'Browse companies, workshops, suppliers and specialists by category.', icon: UsersRound, emoji: '👷' },
  { href: '/en/services', title: 'Services & Offers', desc: 'Choose the required service and send your project details clearly.', icon: Wrench, emoji: '🛠️' },
  { href: '/en/marketplace', title: 'Products & Stores', desc: 'Explore building materials, finishing items and supplier categories.', icon: ShoppingBag, emoji: '🛍️' },
];

export default function EnglishHome() {
  const featuredServices = SERVICE_CATEGORIES.slice(0, 8);
  const description = 'Biet Al Reef is a UAE-focused guide for construction, maintenance, interior design, building materials, service providers, cities and local areas. The English version keeps the same Arabic-first visual identity and RTL layout.';

  return (
    <>
      <Head>
        <title>Biet Al Reef | UAE Construction, Maintenance and Building Services Guide</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://bietalreef.ae/en" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Biet Al Reef English',
          url: 'https://bietalreef.ae/en',
          inLanguage: 'en-AE',
          description,
          isPartOf: { '@type': 'WebSite', name: 'Biet Al Reef', url: 'https://bietalreef.ae' },
        }) }} />
      </Head>
      <EnglishLayout>
        <main>
          <section className="relative overflow-hidden bg-white">
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#F7F2E8] to-white" />
            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:py-24 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="text-center lg:text-right">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black text-[#6F5400]">
                  🇺🇸 English version — Arabic-first identity
                </p>
                <h1 className="mt-6 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">
                  The future of building starts with
                  <span className="block text-[#8A6A00]">Biet Al Reef & Weyaak</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-9 text-gray-700 lg:mx-0">
                  A UAE-focused information platform that connects directory pages, service providers, services, offers, products and stores in one clear journey.
                </p>
                <div className="mt-7 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 text-right shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Bot className="h-6 w-6" aria-hidden="true" /></div>
                    <div>
                      <h2 className="text-xl font-black text-[#0F3F1A]">Weyaak, your smart assistant</h2>
                      <p className="mt-2 text-sm leading-7 text-gray-600">Tell Weyaak what you need and it will guide you to the right section: UAE directory, provider, service or product.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {['I need a carpenter in Al Ain', 'I need marble for a majlis', 'I am looking for a contractor'].map((item) => (
                      <div key={item} className="rounded-2xl bg-[#F7F2E8] px-4 py-3 text-sm font-bold text-gray-800">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/en/weyaak" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#B89200] px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#8A6A00]">Start with Weyaak<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                  <Link href="/en/uae" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] transition hover:border-primary">Browse UAE Directory<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-[#E6DCC8] bg-[#0F3F1A] p-8 text-white shadow-2xl">
                <div className="text-5xl">🏡</div>
                <h2 className="mt-6 text-3xl font-black">Biet Al Reef Ecosystem</h2>
                <p className="mt-4 leading-8 text-white/80">Public website for discovery and indexing, provider app for operations, and Weyaak as the smart assistant layer.</p>
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {['Arabic-first identity', 'UAE-focused content', 'SEO / AEO / GEO', 'Provider app separation'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-bold">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="mb-10 text-center md:text-right">
              <span className="text-sm font-black text-[#6F5400]">Start here</span>
              <h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">Choose the right Biet Al Reef gateway</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">The English text changes, but the interface direction and icon placement remain aligned with the Arabic brand identity.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {mainPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link key={portal.href} href={portal.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" />
                    <div className="relative">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                        <span className="text-3xl" aria-hidden="true">{portal.emoji}</span>
                      </div>
                      <h3 className="mt-4 text-2xl font-black text-[#0F3F1A]">{portal.title}</h3>
                      <p className="mt-3 min-h-[72px] text-sm leading-8 text-gray-600">{portal.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">Open section<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">Service categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {featuredServices.map((service) => (
                <Link key={service.slug} href={`/en/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-black text-[#0F3F1A] mb-2">{service.nameEn}</h3>
                  <p className="text-sm text-gray-600 leading-6">Explore this category across UAE cities and service areas.</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">UAE coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 text-center font-black text-[#0F3F1A] hover:border-[#D4AF37]">
                  {emirate.nameEn}
                </Link>
              ))}
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

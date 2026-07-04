import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, BadgeCheck, Bot, MapPinned, ShieldCheck, ShoppingBag, Sparkles, UsersRound, Wrench } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const gateways = [
  { href: '/en/uae', title: 'UAE Directory', desc: 'Start from the place: emirate, city, area, then the right service for your project.', icon: MapPinned, label: 'Search by place' },
  { href: '/en/providers', title: 'Service Providers', desc: 'Browse companies, workshops, suppliers and specialists by provider type and activity.', icon: UsersRound, label: 'Companies & suppliers' },
  { href: '/en/services', title: 'Services & Offers', desc: 'Choose the required service and send your project details clearly.', icon: Wrench, label: 'Request service' },
  { href: '/en/marketplace', title: 'Products & Stores', desc: 'Explore building materials, finishing products and supplier categories.', icon: ShoppingBag, label: 'Materials & products' },
];

const trustSignals = [
  { title: 'Trusted companies', icon: BadgeCheck },
  { title: 'Integrated services', icon: Sparkles },
  { title: 'Quality assured', icon: ShieldCheck },
];

export default function EnglishHome() {
  const description = 'Biet Al Reef is a UAE-focused smart construction, maintenance and building services platform. The English version keeps the Arabic-first interface direction while translating the content.';

  return (
    <>
      <Head>
        <title>Biet Al Reef | UAE Construction, Maintenance and Building Services Guide</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ar-AE" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Biet Al Reef English',
          url: `${SITE_URL}/en`,
          inLanguage: 'en-AE',
          description,
          isPartOf: { '@type': 'WebSite', name: 'Biet Al Reef', url: SITE_URL },
        }) }} />
      </Head>

      <EnglishLayout>
        <main>
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative mx-auto max-w-7xl px-0 md:px-4">
              <div className="relative min-h-[560px] overflow-hidden rounded-b-[2.5rem] border-b border-[#E6DCC8] bg-[#F7F1E8] shadow-xl shadow-[#0F3F1A]/8 md:min-h-[680px] md:rounded-[2.75rem] md:border">
                <Image src="/images/home-premium-hero.svg" alt="Premium Biet Al Reef construction scene in the UAE" fill priority className="object-cover object-center" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/58 via-white/16 to-[#FDFBF7]/82" />
                <div className="absolute inset-x-0 top-9 mx-auto max-w-4xl px-5 text-center md:top-14 en-center">
                  <p className="text-xs font-black tracking-[0.22em] text-[#6F5400] md:text-sm">Smart building platform</p>
                  <h1 className="mt-4 text-4xl font-black leading-[1.2] text-[#0F3F1A] drop-shadow-sm md:text-7xl">
                    The future of building
                    <span className="block bg-gradient-to-l from-[#0F3F1A] via-[#245D2C] to-[#B89200] bg-clip-text text-transparent">is in your hands</span>
                  </h1>
                  <p className="mx-auto mt-4 max-w-2xl text-base font-black leading-8 text-[#223025] md:text-2xl">Everything your project needs in one place</p>
                  <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 md:gap-3">
                    {trustSignals.map((item) => {
                      const Icon = item.icon;
                      return (
                        <span key={item.title} className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-black text-[#0F3F1A] shadow-sm backdrop-blur md:text-sm">
                          <Icon className="h-4 w-4 text-[#8A6A00]" aria-hidden="true" />
                          {item.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[#0F3F1A]">
                  <span className="h-6 w-px bg-[#0F3F1A]/35" />
                  <span className="text-2xl leading-none">⌄</span>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 md:-mt-12">
            <div className="rounded-t-[2.5rem] border border-[#E6DCC8] bg-white/96 px-5 py-8 shadow-xl shadow-[#0F3F1A]/7 backdrop-blur md:px-10 md:py-12 en-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#FDFBF7] px-4 py-2 text-xs font-black text-[#6F5400] shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Hi — Welcome to the house
              </div>
              <h2 className="mx-auto mt-5 max-w-full text-[2rem] font-black leading-tight text-[#0F3F1A] sm:text-4xl md:text-6xl en-no-break">Biet Al Reef Platform</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-700 md:text-lg">
                A smart platform that brings together the UAE Directory, service providers, services and offers, products and stores in one clear, fast and trusted experience.
              </p>

              <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-[#E6DCC8] bg-[#FDFBF7] p-6 shadow-sm en-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-[1.7rem] border border-[#E6DCC8] bg-white shadow-inner">
                  <Image src="/images/weyaak-new-logo.jpg" alt="Weyaak AI" width={82} height={82} className="h-20 w-20 object-contain rounded-xl" />
                </div>
                <h3 className="text-3xl font-black text-[#0F3F1A]">Weyaak</h3>
                <p className="mx-auto mt-2 max-w-2xl text-base font-black text-[#0F3F1A] sm:text-lg md:text-xl en-no-break">Your smart agent in every building step</p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 md:text-base">Weyaak organizes the way inside Biet Al Reef, compares options, saves time and helps you choose the right section.</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/en/weyaak" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">
                  Start with Weyaak
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link href="/en/uae" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">
                  Browse UAE Directory
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:py-14">
            <div className="mb-8 text-center md:text-right">
              <span className="text-sm font-black text-[#6F5400]">Start here</span>
              <h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl">Choose the right Biet Al Reef gateway</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">Four gateways only, so the journey is clear from the first visit: place, provider, service or product.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {gateways.map((card) => {
                const Icon = card.icon;
                return (
                  <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 transition group-hover:scale-125" />
                    <div className="relative">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                        <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{card.label}</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0F3F1A]">{card.title}</h3>
                      <p className="mt-3 min-h-[88px] text-sm leading-8 text-gray-600">{card.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6F5400] transition group-hover:-translate-x-1">Open section<ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

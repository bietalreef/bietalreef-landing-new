import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, Bot, Building2, CheckCircle, MapPinned, Search, ShieldCheck, ShoppingBag, Sparkles, UsersRound, Wrench } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const heroSlides = [
  { src: '/images/webp/bait-alreef-premiere-cover-smart-construction-platform.webp', alt: 'Biet Al Reef smart construction platform in the UAE', title: 'Biet Al Reef Smart Platform' },
  { src: '/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp', alt: 'Biet Al Reef construction and service provider ecosystem in the UAE', title: 'Smart construction ecosystem' },
  { src: '/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp', alt: 'A unified platform for design, build, project management and products in the UAE', title: 'Unified project platform' },
  { src: '/images/webp/bait-alreef-why-biet-alreef-premium-comparison.webp', alt: 'Why customers choose Biet Al Reef for contracting and building services in the UAE', title: 'Why Biet Al Reef' },
];

const introModels = [
  { title: 'UAE Directory', desc: 'Start by place', image: '/images/webp/bait-alreef-uae-smart-network-coverage.webp' },
  { title: 'Trusted Providers', desc: 'Companies & workshops', image: '/images/webp/bait-alreef-engineering-excellence-four-pillars.webp' },
  { title: 'Services & Offers', desc: 'Request or compare', image: '/images/webp/bait-alreef-next-step-contractor-future.webp' },
  { title: 'Products & Stores', desc: 'Materials & suppliers', image: '/images/webp/bait-alreef-smart-materials-calculator-investment-protection.webp' },
];

const gatewayCards = [
  { href: '/en/uae', title: 'UAE Directory', line: 'Start by place', desc: 'Choose the emirate, then the city or area, then the right service path for your project.', icon: MapPinned, label: 'Search by place', image: '/images/gateway/uae-directory-gateway.webp', imageAlt: '3D UAE map for Biet Al Reef UAE directory' },
  { href: '/en/providers', title: 'Service Providers', line: 'Build your presence', desc: 'For companies, workshops, factories and suppliers that need a clear professional profile.', icon: UsersRound, label: 'Digital presence', image: '/images/gateway/providers-gateway.webp', imageAlt: 'Building and contracting service providers inside Biet Al Reef' },
  { href: '/en/services', title: 'Services & Offers', line: 'Request the work', desc: 'Choose the service type, describe your project and move through a clear request journey.', icon: Wrench, label: 'Service request', image: '/images/gateway/services-offers-gateway.webp', imageAlt: 'Construction, maintenance and finishing services and offers in Biet Al Reef' },
  { href: '/en/marketplace', title: 'Products & Stores', line: 'Materials and products', desc: 'Explore building materials, finishing products, smart systems and supplier categories.', icon: ShoppingBag, label: 'Products', image: '/images/gateway/materials-products-gateway.webp', imageAlt: 'Building materials, products and stores in Biet Al Reef' },
];

const clientJourneyCards = [
  { title: 'Search directly', desc: 'Browse the right path yourself and move from category to page without confusion.', icon: Search },
  { title: 'Ask Weyaak', desc: 'Let the assistant understand the need, ask for details and guide you to the right section.', icon: Bot },
  { title: 'Structured request', desc: 'Turn the project need into a clear internal request path by service, area and specialty.', icon: UsersRound },
];

const providerPresenceCards = [
  { title: 'Be found where clients search', desc: 'Not a temporary ad. A structured digital presence for Google, AI engines and Biet Al Reef.', icon: MapPinned },
  { title: 'Operate from your phone', desc: 'A future-ready profile for requests, quotation flow, services and business follow-up.', icon: Building2 },
  { title: 'Content built for discovery', desc: 'Your specialty becomes easier to understand, search, classify and recommend.', icon: Sparkles },
];

const trustBadges = [
  { title: 'Trust', desc: 'Clearer providers', icon: ShieldCheck },
  { title: 'Safe path', desc: 'Organized contact', icon: CheckCircle },
  { title: 'Transparent', desc: 'No confusion', icon: Sparkles },
];

function VisualLine({ children, className = '' }) {
  return <span className={`block ${className}`}>{children}</span>;
}

function GatewayCard({ card }) {
  const Icon = card.icon;

  return (
    <Link key={card.href} href={card.href} className="group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F2E8]">
        <Image src={card.image} alt={card.imageAlt || card.title} fill className="object-cover object-center transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/25 via-transparent to-white/5" />
        <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/55 bg-[#0F3F1A]/95 text-[#F7E7A0] shadow-[0_18px_34px_rgba(15,63,26,0.32)] backdrop-blur-xl transition group-hover:scale-105 md:h-16 md:w-16">
          <Icon className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 mx-4 -mt-7 rounded-[1.65rem] border border-[#D4AF37]/50 bg-[#0F3F1A]/95 p-2.5 shadow-[0_18px_40px_rgba(15,63,26,0.28)] backdrop-blur-xl md:mx-5 md:-mt-8">
        <div className="grid grid-cols-2 items-center gap-2 md:gap-3">
          <span className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black text-white shadow-inner backdrop-blur-xl md:text-base">
            <Icon className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
            {card.title}
          </span>
          <span className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-[#143D1F]/90 px-3 py-2 text-sm font-black text-white shadow-[0_0_24px_rgba(212,175,55,0.22)] backdrop-blur-xl md:text-base">
            Explore now
            <Search className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <h3 className="sr-only">{card.title} - {card.line}</h3>
        <p className="text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
      </div>
    </Link>
  );
}

export default function EnglishHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const description = 'Biet Al Reef is a UAE-focused smart construction and service discovery platform. The English content keeps the same Arabic-first interface, card structure and visual identity while presenting English as designed copy.';

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 6200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Biet Al Reef | Smart construction platform in the UAE</title>
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
        <main className="-mt-[1px]">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] pt-0">
            <div className="relative mx-auto max-w-7xl px-0 md:px-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-b-[2rem] border-b border-[#E6DCC8] bg-[#F7F1E8] shadow-xl shadow-[#0F3F1A]/8 md:aspect-[16/7] md:rounded-[2.75rem] md:border">
                {heroSlides.map((slide, index) => (
                  <div key={slide.src} className={`absolute inset-0 transition-opacity duration-[1600ms] ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <Image src={slide.src} alt={slide.alt} title={slide.title} fill priority={index === 0} className="scale-105 object-cover object-center transition-transform duration-[6200ms] ease-linear" sizes="100vw" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-[#FDFBF7]/10" />
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto -mt-7 max-w-5xl px-4 md:-mt-9">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E6DCC8] bg-white/96 px-5 pb-5 pt-6 text-center shadow-2xl shadow-[#8A6A00]/8 backdrop-blur md:px-10 md:pb-8 md:pt-9">
              <div className="pointer-events-none absolute inset-x-4 bottom-0 h-40 overflow-hidden rounded-b-[2rem] md:inset-x-8 md:h-52">
                <Image src="/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp" alt="Soft visual background for the Biet Al Reef smart ecosystem" fill className="translate-y-1/3 scale-110 object-cover object-center opacity-[0.18] blur-[0.2px]" sizes="(max-width: 768px) 92vw, 900px" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/20" />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl"><VisualLine>Biet Al Reef</VisualLine><VisualLine>Smart Platform</VisualLine></h1>
                <p className="mx-auto mt-3 max-w-2xl text-base font-bold leading-8 text-gray-700 md:text-xl"><VisualLine>Everything your project needs</VisualLine><VisualLine>in one clear place.</VisualLine></p>
                <h2 className="mt-5 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl"><VisualLine>Search directly...</VisualLine><VisualLine>or let Weyaak guide the way.</VisualLine></h2>
                <div className="mt-6 grid grid-cols-4 gap-2 md:gap-4">
                  {introModels.map((item) => (
                    <div key={item.title} className="overflow-hidden rounded-2xl border border-[#EEE4D1] bg-white/86 px-2 py-3 shadow-sm backdrop-blur md:px-3 md:py-4">
                      <div className="relative mx-auto h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-inner ring-1 ring-[#E6DCC8] md:h-16 md:w-16"><Image src={item.image} alt={item.title} fill className="scale-125 object-cover object-center" sizes="64px" /><div className="absolute inset-0 bg-white/25" /></div>
                      <p className="mt-2 text-[0.7rem] font-black leading-5 text-[#0F3F1A] md:text-sm">{item.title}</p>
                      <p className="hidden text-xs font-semibold text-gray-500 md:block">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 mx-auto mt-4 max-w-5xl px-4 md:mt-5">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white/96 px-5 py-6 text-center shadow-xl shadow-[#0F3F1A]/7 backdrop-blur md:px-10 md:py-10">
              <div className="mx-auto max-w-3xl">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[1.7rem] border border-[#E6DCC8] bg-white shadow-inner"><Image src="/images/weyaak-new-logo.jpg" alt="Weyaak AI" width={82} height={82} className="h-20 w-20 rounded-xl object-contain" /></div>
                <p className="text-xs font-black tracking-[0.24em] text-[#6F5400]">WEYAAK AI</p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl"><VisualLine>Your smart agent</VisualLine><VisualLine>inside Biet Al Reef.</VisualLine></h2>
                <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-gray-600 md:text-lg"><VisualLine>It understands the need.</VisualLine><VisualLine>It organizes the path.</VisualLine><VisualLine>It helps you choose the right section.</VisualLine></p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/en/weyaak" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#143D1F]">Start with Weyaak<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
                <Link href="/en/providers" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-white px-8 py-4 text-base font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-primary">Start as a provider<ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-[#E6DCC8] bg-[#FDFBF7] p-2 md:gap-3 md:p-3">
                {trustBadges.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-2xl bg-white px-2 py-3 text-center shadow-sm"><Icon className="mx-auto mb-2 h-5 w-5 text-[#0F3F1A]" aria-hidden="true" /><p className="text-sm font-black text-[#0F3F1A]">{item.title}</p><p className="mt-1 hidden text-xs font-semibold text-gray-500 sm:block">{item.desc}</p></div>; })}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-6 text-center md:text-right"><span className="text-sm font-black text-[#6F5400]">Start here</span><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-5xl"><VisualLine>Choose the right</VisualLine><VisualLine>Biet Al Reef gateway</VisualLine></h2><p className="mt-4 max-w-4xl text-base leading-8 text-gray-600 md:text-lg"><VisualLine>Every journey starts from the correct door:</VisualLine><VisualLine>place, provider, service or product.</VisualLine></p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {gatewayCards.map((card) => <GatewayCard key={card.href} card={card} />)}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{clientJourneyCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm hover:shadow-md transition-shadow"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/15"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
          </section>

          <section className="bg-[#FDFBF7] py-12 text-gray-900 md:py-18">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-7 text-center md:mb-10"><span className="text-sm font-black text-[#6F5400]">For providers</span><h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl"><VisualLine>Operate your business</VisualLine><VisualLine>from your phone.</VisualLine></h2><p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-600 md:text-lg"><VisualLine>We are not selling a temporary ad.</VisualLine><VisualLine>We are building a discoverable digital presence.</VisualLine></p></div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{providerPresenceCards.map((item) => { const Icon = item.icon; return <div key={item.title} className="relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-[#D4AF37]/10" /><div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F2E8] text-[#B0912F] shadow-sm"><Icon className="h-7 w-7" aria-hidden="true" /></div><h3 className="relative text-2xl font-black text-[#0F3F1A]">{item.title}</h3><p className="relative mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p></div>; })}</div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

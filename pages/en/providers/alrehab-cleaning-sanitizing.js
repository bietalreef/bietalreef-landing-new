import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import {
  buildCardWhatsappUrl,
  buildProviderWhatsappUrl,
} from '../../../lib/providerWhatsapp';
import { alrehabTemplate } from '../../../data/providerTemplates/alrehab';
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  History,
  Home,
  Images,
  Layers3,
  ListChecks,
  MapPin,
  Maximize2,
  MessageCircle,
  Package,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const provider = {
  id: alrehabTemplate.id,
  name: alrehabTemplate.identity.name.en,
  shortName: alrehabTemplate.identity.shortName.en,
  type: alrehabTemplate.identity.providerType.en,
  location: 'Al Ain — serving Abu Dhabi and Dubai by appointment',
  joinedAt: 'July 2026',
  establishedAt: '2021',
  phone: '+971 54 776 1290',
  whatsapp: '971547761290',
  base: '/images/providers/alrehab/',
  hero: alrehabTemplate.media.cover,
  logo: alrehabTemplate.media.logo,
};

const resolveProviderMedia = (src) => (src?.startsWith('/') ? src : `${provider.base}${src}`);

const serviceDetails = [
  {
    icon: Sparkles,
    tags: ['Steam cleaning', 'Stain treatment', 'Fabric-aware process'],
    requiredDetails: ['City and area', 'Number and approximate size of sofa pieces', 'Clear photos of stains and fabric condition', 'Preferred service appointment'],
    wayaakPrompt: 'Help me prepare a steam sofa cleaning request for Al Rehab. Ask about the pieces, fabric, stains, location and required photos before contact.',
  },
  {
    icon: Layers3,
    tags: ['Carpets and rugs', 'Deep extraction', 'Controlled drying'],
    requiredDetails: ['City and area', 'Number of rugs or carpeted area', 'Approximate dimensions', 'Photos of stains and overall condition'],
    wayaakPrompt: 'Help me prepare a carpet or rug cleaning request for Al Rehab. Ask about quantity, area, dimensions, stains and location.',
  },
  {
    icon: Home,
    tags: ['Arabic majlis', 'Cushion cleaning', 'Odour treatment'],
    requiredDetails: ['City and area', 'Majlis length or number of pieces', 'Number of backrests and cushions', 'Clear photos of the majlis and stains'],
    wayaakPrompt: 'Help me prepare an Arabic majlis cleaning request for Al Rehab. Ask about length, backrests, cushions, stains and location.',
  },
  {
    icon: ShieldCheck,
    tags: ['Mattress cleaning', 'Suitable sanitizing', 'Dust and odour removal'],
    requiredDetails: ['City and area', 'Number and size of mattresses', 'Photos of condition and stains', 'Any odours or specific sanitizing need'],
    wayaakPrompt: 'Help me prepare a mattress cleaning and sanitizing request for Al Rehab. Ask about quantity, sizes, stains, odours and location.',
  },
];

const services = alrehabTemplate.services.map((service, index) => ({
  id: service.id,
  slug: service.slug,
  title: service.title.en,
  description: service.summary.en,
  image: service.image,
  ...serviceDetails[index],
}));

const offers = alrehabTemplate.offers.map((offer, index) => ({
  id: offer.id,
  slug: `cleaning-package-${index + 1}`,
  title: offer.title.en,
  category: offer.badge.en,
  description: offer.summary.en,
  image: offer.image,
  price: null,
  currency: 'AED',
  priceUnit: 'After assessment',
  priceUnitCode: 'C62',
  priceNote: 'The price is confirmed after reviewing photos, quantity, dimensions, stain condition and the service location.',
}));

const gallery = [
  [alrehabTemplate.media.cover, 'Al Rehab Cleaning & Sanitizing'],
  ...alrehabTemplate.gallery.map((item) => [item.image, item.title.en]),
];

const faqs = [
  ['Which areas does Al Rehab serve?', 'Services cover Al Ain, Abu Dhabi and Dubai. Appointment availability depends on the area and requested work.'],
  ['Do you use safe cleaning and sanitizing products?', 'Products are selected according to the fabric and its condition, with use and safety instructions considered before cleaning starts.'],
  ['How do I get an accurate price?', 'Send photos, quantity, dimensions and the service location through WhatsApp. The condition is reviewed before the price and appointment are confirmed.'],
  ['Can every stain be removed?', 'Results depend on the stain type, age and fabric. The condition is assessed first and the expected result is explained without unrealistic promises.'],
];

function buildServiceWhatsappMessage(service) {
  return buildCardWhatsappUrl({
    phone: provider.whatsapp,
    locale: 'en',
    cardType: 'service',
    providerName: provider.name,
    providerCode: provider.id,
    cardCode: service.id,
    cardId: service.id,
    title: service.title,
    description: service.description,
    category: service.tags,
    pricingModel: 'Price based on specifications after request review',
    specifications: service.requiredDetails,
    location: provider.location,
    pagePath: `/en/providers/alrehab-cleaning-sanitizing#${service.id}`,
  });
}

function buildWeyaakHref(service) {
  const query = new URLSearchParams({
    providerId: provider.id,
    provider: 'alrehab-cleaning-sanitizing',
    serviceId: service.id,
    service: service.title,
    prompt: service.wayaakPrompt,
    lang: 'en',
  });

  return `/en/weyaak?${query.toString()}`;
}

export default function AlRehabEnglishProviderPage() {
  const [selectedService, setSelectedService] = useState(null);
  const canonical = 'https://bietalreef.ae/en/providers/alrehab-cleaning-sanitizing';
  const description = alrehabTemplate.description.en;
  const message = buildProviderWhatsappUrl({
    phone: provider.whatsapp,
    locale: 'en',
    providerName: provider.name,
    providerCode: provider.id,
    location: provider.location,
    summary: description,
    profilePath: '/en/providers/alrehab-cleaning-sanitizing',
  });
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Al Rehab Cleaning Sanitizing Al Ain Abu Dhabi Dubai')}`;

  useEffect(() => {
    if (!selectedService) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedService(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedService]);

  const serviceSchemas = services.map((service) => ({
    '@type': 'Service',
    '@id': `${canonical}#${service.id}`,
    identifier: service.id,
    name: service.title,
    description: service.description,
    url: `${canonical}#${service.id}`,
    image: { '@type': 'ImageObject', contentUrl: `https://bietalreef.ae${resolveProviderMedia(service.image)}`, caption: `${service.title} by Al Rehab in Al Ain, Abu Dhabi and Dubai`, inLanguage: 'en-AE' },
    areaServed: [{ '@type': 'City', name: 'Al Ain' }, { '@type': 'AdministrativeArea', name: 'Abu Dhabi' }],
    provider: { '@id': `${canonical}#provider` },
    additionalProperty: { '@type': 'PropertyValue', name: 'Pricing model', value: 'Quotation after reviewing dimensions, materials and project location' },
  }));

  const offerListItems = offers.map((offer, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: offer.title,
    url: `${canonical}#${offer.id}`,
    image: `https://bietalreef.ae${offer.image}`,
  }));

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CleaningService',
      '@id': `${canonical}#provider`,
      identifier: provider.id,
      name: provider.name,
      url: canonical,
      telephone: provider.phone,
      foundingDate: provider.establishedAt,
      image: gallery.map(([src]) => `https://bietalreef.ae${resolveProviderMedia(src)}`),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Al Ain',
        addressRegion: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      areaServed: [
        { '@type': 'City', name: 'Al Ain' },
        { '@type': 'AdministrativeArea', name: 'Abu Dhabi' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Al Rehab Services',
        itemListElement: serviceSchemas.map((service) => ({
          '@type': 'Offer',
          identifier: service.identifier,
          itemOffered: service,
        })),
      },
    },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#services`, name: 'Al Rehab cleaning and sanitizing services', itemListElement: serviceSchemas.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#offers`, name: 'Al Rehab cleaning offers and packages', itemListElement: offerListItems },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];

  return (
    <>
      <Head>
        <title>Al Rehab Cleaning & Sanitizing in Al Ain, Abu Dhabi and Dubai</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers/alrehab-cleaning-sanitizing" />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/providers/alrehab-cleaning-sanitizing" />
        <meta property="og:title" content="Al Rehab Cleaning & Sanitizing in Al Ain, Abu Dhabi and Dubai" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://bietalreef.ae${resolveProviderMedia(provider.hero)}`} />
        <meta property="og:locale" content="en_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" lang="en" className="bg-[#F8F4EC] text-left text-[#1D2E22]">
          <section className="mx-auto max-w-6xl px-3 pb-8 pt-3 md:px-4 md:pt-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Link
                href="/en/providers"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A] shadow-[0_8px_20px_rgba(77,53,20,.08)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to service providers
              </Link>
              <Link href="/providers/alrehab-cleaning-sanitizing" className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#D8C8AA] bg-white px-4 py-2 text-xs font-black text-[#0F3F1A] shadow-sm">
                AR
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E6DCC8] shadow-[0_24px_70px_rgba(66,45,17,.14)]">
              <div className="relative aspect-[16/10] min-h-[310px] sm:aspect-[16/8] md:min-h-[520px]">
                <Image
                  src={resolveProviderMedia(provider.hero)}
                  alt="Al Rehab cleaning and sanitizing services in Al Ain, Abu Dhabi and Dubai"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,1152px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/5" />
              </div>
            </div>

            <div className="relative z-20 mx-auto -mt-14 flex h-28 w-28 items-center justify-center rounded-full border-[4px] border-[#C9952A] bg-white shadow-[0_14px_0_rgba(82,49,6,.12),0_24px_45px_rgba(82,49,6,.20)] md:hidden">
              <ProviderLogo />
              <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4C95D] shadow-lg">
                <BadgeCheck className="h-5 w-5" />
              </span>
            </div>

            <div className="relative z-10 mx-2 -mt-7 overflow-hidden rounded-[2.2rem] border border-white bg-white/96 p-5 pt-12 shadow-[0_26px_70px_rgba(77,53,20,.18)] backdrop-blur-xl md:mx-6 md:-mt-10 md:p-7 lg:-mt-12 lg:p-8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0F3F1A] via-[#C9952A] to-[#0F3F1A]" />

              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left md:gap-6">
                <div className="relative hidden h-28 w-28 shrink-0 items-center justify-center rounded-full border-[4px] border-[#C9952A] bg-white shadow-[0_14px_0_rgba(82,49,6,.12),0_24px_45px_rgba(82,49,6,.20)] md:flex lg:h-32 lg:w-32">
                  <ProviderLogo />
                  <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4C95D] shadow-lg">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Tag>Professional Cleaning & Sanitizing Services</Tag>
                    <Tag green>Accepts quotation requests</Tag>
                  </div>
                  <h1 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl lg:text-5xl">{provider.name}</h1>
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#6D5A41] sm:justify-start">
                    <MapPin className="h-4 w-4 text-[#A66B19]" />
                    {provider.location}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/request-quote?provider=alrehab-cleaning-sanitizing&lang=en"
                  className="inline-flex min-h-[62px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0F3F1A] to-[#082D13] px-5 py-4 text-base font-black text-white shadow-[0_9px_0_rgba(5,37,13,.20),0_18px_35px_rgba(15,63,26,.22)] transition hover:-translate-y-0.5"
                >
                  <BriefcaseBusiness className="h-6 w-6 text-[#F4CA61]" />
                  Request a quotation from Al Rehab
                </Link>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <ContactButton href={message} external icon={MessageCircle} label="WhatsApp" />
                  <ContactButton href="tel:+971547761290" icon={Phone} label="Call" />
                  <ContactButton href="/en/weyaak" icon={Bot} label="Weyaak" />
                </div>
              </div>
            </div>
          </section>

          <nav className="sticky top-[66px] z-30 border-y border-[#E6DCC8] bg-[#F8F4EC]/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                ['Business Information', '#overview'],
                ['Services & Offers', '#services'],
                ['Products', '#products'],
                ['Projects', '#projects'],
                ['Reviews & Complaints', '#reviews'],
              ].map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-black ${
                    index === 0
                      ? 'bg-[#0F3F1A] text-white shadow-[0_7px_0_rgba(6,38,14,.16)]'
                      : 'border border-[#E1D4BE] bg-white text-[#0F3F1A] shadow-sm'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <section id="overview" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-12 md:py-14">
            <SectionHeading eyebrow="Business Information" title="About Al Rehab" />
            <p className="mt-4 max-w-4xl text-base leading-9 text-[#625A50] md:text-lg">
              {description}
            </p>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <TrustBadge icon={BadgeCheck} title="Registered with Biet Al Reef" />
              <TrustBadge icon={ShieldCheck} title="Contact details verified" />
              <TrustBadge icon={History} title="5 years of practical experience" />
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              <ActivityDetail icon={Building2} title="Main activity" value="Service Providers — Cleaning & Sanitizing Services" source="provider_categories.is_primary" />
              <ActivityDetail icon={Layers3} title="Specialisation" value="Deep cleaning for sofas, carpets, rugs, Arabic majlis seating and mattresses" source="provider_specialties" />
              <ActivityDetail icon={ListChecks} title="Services" value="Sofa cleaning, carpet and rug cleaning, majlis cleaning, mattress cleaning and sanitizing" source="provider_services.service_id" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <CompactInfo icon={CalendarDays} title="Joined" value={provider.joinedAt} />
              <CompactInfo icon={Clock3} title="Service appointment" value="By prior booking and coordination" />
              <CompactInfo icon={MapPin} title="Service coverage" value="Al Ain, Abu Dhabi and Dubai by appointment" source="provider_service_locations" />
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-6 block min-h-[300px] overflow-hidden rounded-[2rem] border border-[#D9C8A9] bg-[#EEE7D8] shadow-[0_20px_55px_rgba(77,53,20,.13)]"
            >
              <div className="absolute inset-0 opacity-95">
                <div className="absolute -left-10 top-10 h-16 w-[72%] rotate-[13deg] rounded-full border-[12px] border-white/90 shadow-sm" />
                <div className="absolute -right-16 top-32 h-14 w-[76%] -rotate-[18deg] rounded-full border-[10px] border-[#FFFDF8] shadow-sm" />
                <div className="absolute left-[32%] top-0 h-[125%] w-14 rotate-[27deg] rounded-full border-[8px] border-white/85" />
                <div className="absolute right-[12%] top-[18%] h-20 w-28 rounded-xl border border-[#CFC4AE] bg-[#DED4C1]/80" />
                <div className="absolute left-[8%] top-[58%] h-16 w-24 rounded-xl border border-[#CFC4AE] bg-[#D8CEBB]/80" />
                <div className="absolute right-[40%] top-[67%] h-14 w-20 rounded-xl border border-[#CFC4AE] bg-[#E4DAC8]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.22),transparent_60%)]" />
              </div>

              <div className="relative z-10 flex min-h-[300px] flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#A66B19]">Business location</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">Al Ain — serving Abu Dhabi and Dubai by appointment</h3>
                    <p className="mt-3 max-w-xl leading-8 text-[#5F584F]">Select the card to open the location directly in Google Maps.</p>
                  </div>
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/80 bg-white/88 text-[#A66B19] shadow-[0_8px_0_rgba(128,89,23,.10),0_18px_30px_rgba(77,53,20,.14)] backdrop-blur-xl">
                    <MapPin className="h-8 w-8" />
                  </span>
                </div>

                <span className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-white/92 px-5 py-3 font-black text-[#0F3F1A] shadow-[0_8px_0_rgba(91,62,18,.10),0_18px_32px_rgba(77,53,20,.13)] backdrop-blur-xl transition group-hover:-translate-y-0.5 md:w-auto md:min-w-[230px]">
                  Open Google Maps
                  <ExternalLink className="h-4 w-4 text-[#A66B19]" />
                </span>
              </div>
            </a>
          </section>

          <section id="services" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-12 md:py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="Services & Offers" title="Al Rehab services available for quotation requests" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                Each service card presents the cleaning type, public ID and dedicated image. Read the summary, then select “Details” to see the photos, quantity, dimensions and information required to assess the condition and prepare a quotation.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    whatsapp={provider.whatsapp}
                    onDetails={setSelectedService}
                  />
                ))}
              </div>

              <div className="mt-12 border-t border-[#E6DCC8] pt-10">
                <SectionHeading eyebrow="Al Rehab offers" title="Flexible cleaning packages based on the customer need" />
                <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                  Each package starts with a review of photos, quantity, dimensions, stain condition and service location before the price and appointment are confirmed.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} product={offer} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="products" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14">
            <SectionHeading eyebrow="Products" title="Al Rehab products" />
            <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
              This section is reserved for products and materials published by the provider through the admin dashboard, with a clear image, public ID, description and price or pricing method.
            </p>

            <div className="mt-8 rounded-[2rem] border border-dashed border-[#D9C8A9] bg-white/75 p-8 text-center shadow-sm">
              <Package className="mx-auto h-10 w-10 text-[#A66B19]" />
              <h3 className="mt-4 text-xl font-black text-[#0F3F1A]">No products are published yet</h3>
              <p className="mx-auto mt-3 max-w-2xl leading-8 text-[#625A50]">
                Al Rehab products will appear here automatically after they are added and published from the admin dashboard, without changing the page template or inventing data.
              </p>
            </div>
          </section>

          <section id="gallery" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="Projects & Work" title="Al Rehab work examples" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                These are the current approved service and work images in the Al Rehab profile. New projects can be added later without changing the page template.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {gallery.map(([src, title], index) => (
                  <figure
                    key={src}
                    className={`overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] ${index === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                      <Image
                        src={resolveProviderMedia(src)}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes={index === 0 ? '100vw' : '(max-width:768px)100vw,50vw'}
                      />
                    </div>
                    <figcaption className="flex items-center gap-3 p-5 font-black text-[#0F3F1A]">
                      <Images className="h-5 w-5 text-[#A66B19]" />
                      {title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-28 mx-auto max-w-4xl px-4 py-14">
            <SectionHeading eyebrow="Frequently Asked Questions" title="Common questions about Al Rehab services" center />
            <div className="mt-8 space-y-4">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0} className="group rounded-[1.7rem] border border-[#E6DCC8] bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#0F3F1A]">
                    {question}
                    <ChevronDown className="h-5 w-5 text-[#A66B19] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 border-t border-[#EFE6D6] pt-4 leading-8 text-[#625A50]">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          {selectedService && (
            <ServiceDetailsModal
              service={selectedService}
              whatsapp={provider.whatsapp}
              onClose={() => setSelectedService(null)}
            />
          )}
        </main>
      </EnglishLayout>
    </>
  );
}

function ProviderLogo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
      <img
        src={resolveProviderMedia(provider.logo)}
        alt="Al Rehab Cleaning & Sanitizing logo"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, title }) {
  return (
    <span className="flex min-h-[76px] w-full items-center gap-3 rounded-[1.45rem] border border-[#DDCBAA] bg-gradient-to-b from-white to-[#F8F1E5] px-4 py-3 text-sm font-black text-[#0F3F1A] shadow-[0_7px_0_rgba(85,58,16,.08),0_14px_26px_rgba(85,58,16,.10)]">
      <ThreeDIcon icon={Icon} />
      {title}
    </span>
  );
}

function ThreeDIcon({ icon: Icon }) {
  return (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F6D979] bg-gradient-to-br from-[#FFECA8] via-[#E1B33B] to-[#A86F14] text-[#17351E] shadow-[inset_0_2px_2px_rgba(255,255,255,.75),0_6px_0_rgba(123,78,10,.18),0_12px_20px_rgba(123,78,10,.18)]">
      <span className="absolute inset-1 rounded-full border border-white/35" />
      <Icon className="relative h-5 w-5" />
    </span>
  );
}

function ActivityDetail({ icon: Icon, title, value, source }) {
  return (
    <article data-source-field={source} className="flex min-h-[96px] items-center gap-4 rounded-[1.6rem] border border-[#E2D4BB] bg-white px-4 py-4 shadow-[0_8px_0_rgba(85,58,16,.07),0_15px_28px_rgba(85,58,16,.09)]">
      <ThreeDIcon icon={Icon} />
      <div className="min-w-0">
        <p className="text-xs font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A] md:text-base">{value}</p>
      </div>
    </article>
  );
}

function CompactInfo({ icon: Icon, title, value, source }) {
  return (
    <article data-source-field={source} className="flex min-h-[78px] items-center gap-3 rounded-[1.35rem] border border-[#E6DCC8] bg-white/90 px-4 py-3 shadow-[0_10px_24px_rgba(67,45,17,.07)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
      </div>
    </article>
  );
}

function Tag({ children, green }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-black ${green ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FFF4D6] text-[#8A5C0B]'}`}>
      {children}
    </span>
  );
}

function ContactButton({ href, icon: Icon, label, external }) {
  const className = 'inline-flex min-h-[58px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#D9C8A9] bg-white px-3 py-3 text-xs font-black text-[#0F3F1A] shadow-[0_7px_0_rgba(85,58,16,.08),0_13px_24px_rgba(85,58,16,.10)] transition hover:-translate-y-0.5';
  const content = <><Icon className="h-5 w-5 text-[#A66B19]" /><span>{label}</span></>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link href={href} className={className}>{content}</Link>;
}

function SectionHeading({ eyebrow, title, center }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <span className="text-sm font-black text-[#A66B19]">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{title}</h2>
    </div>
  );
}

function ServiceCard({ service, whatsapp, onDetails }) {
  const Icon = service.icon;
  const whatsappText = buildServiceWhatsappMessage(service);

  return (
    <article
      id={service.id}
      itemScope
      itemType="https://schema.org/Service"
      data-provider-id={provider.id}
      data-service-id={service.id}
      className="group overflow-hidden rounded-[1.55rem] border border-[#E6DCC8] bg-white shadow-[0_12px_32px_rgba(67,45,17,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(67,45,17,.14)] md:rounded-[2rem]"
    >
      <div className="relative h-36 overflow-hidden sm:h-40 md:h-56">
        <Image
          src={resolveProviderMedia(service.image)}
          alt={`${service.title} by Al Rehab in Al Ain, Abu Dhabi and Dubai`}
          fill
          itemProp="image"
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:767px) 100vw,50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 md:inset-x-4 md:top-4 md:gap-3">
          <span className="rounded-full border border-white/50 bg-white/88 px-2.5 py-1.5 text-[9px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl md:px-3 md:py-2 md:text-[11px]">Al Rehab service</span>
          <span className="rounded-full border border-white/30 bg-[#0F3F1A]/88 px-2.5 py-1.5 text-[9px] font-black text-white shadow-lg backdrop-blur-xl md:px-3 md:py-2 md:text-[11px]">Available on request</span>
        </div>
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/55 bg-white/90 text-[#0F3F1A] shadow-xl backdrop-blur-xl md:bottom-4 md:left-4 md:h-12 md:w-12 md:rounded-2xl">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 itemProp="name" className="text-lg font-black leading-tight text-[#0F3F1A] md:text-xl">{service.title}</h3>
          <span dir="ltr" className="rounded-full bg-[#F6F0E5] px-2.5 py-1 text-[9px] font-black tracking-wide text-[#8A6A35] md:text-[10px]">{service.id}</span>
        </div>
        <p itemProp="description" className="mt-2 line-clamp-2 text-sm leading-6 text-[#625A50] md:mt-3 md:min-h-[64px] md:text-base md:leading-8">{service.description}</p>

        <div className="mt-4 hidden flex-wrap gap-2 md:flex">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-1.5 text-[11px] font-bold text-[#66583F]">{tag}</span>
          ))}
        </div>

        <div className="mt-5 hidden items-center justify-between rounded-2xl border border-[#E8DDC9] bg-[#FCFAF6] px-4 py-3 text-sm md:flex">
          <span className="flex items-center gap-2 font-bold text-[#625A50]"><MapPin className="h-4 w-4 text-[#A66B19]" />Al Ain, Abu Dhabi and Dubai</span>
          <span className="font-black text-[#0F3F1A]">Price after review</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-5 md:gap-3">
          <button
            type="button"
            onClick={() => onDetails(service)}
            aria-haspopup="dialog"
            aria-label={`View details for ${service.title}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-3 py-2.5 text-xs font-black text-white shadow-[0_6px_0_rgba(5,37,13,.16)] md:min-h-[50px] md:rounded-2xl md:px-4 md:py-3 md:text-sm"
          >
            Details
            <Maximize2 className="h-4 w-4" />
          </button>
          <a
            href={whatsappText}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contact Al Rehab on WhatsApp about ${service.title}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D8C8AA] bg-white px-3 py-2.5 text-xs font-black text-[#0F3F1A] md:min-h-[50px] md:rounded-2xl md:px-4 md:py-3 md:text-sm"
          >
            <MessageCircle className="h-4 w-4 text-[#159447]" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function ServiceDetailsModal({ service, whatsapp, onClose }) {
  const Icon = service.icon;
  const whatsappText = buildServiceWhatsappMessage(service);
  const wayaakHref = buildWeyaakHref(service);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="alrehab-service-dialog-title-en">
      <button type="button" aria-label="Close service details" className="absolute inset-0 bg-[#07150C]/70 backdrop-blur-sm" onClick={onClose} />

      <article
        data-provider-id={provider.id}
        data-service-id={service.id}
        className="relative z-10 max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,.32)] md:max-h-[90dvh] md:rounded-[2rem]"
      >
        <div className="relative h-56 overflow-hidden md:h-80">
          <Image src={resolveProviderMedia(service.image)} alt={service.title} fill className="object-cover" sizes="(max-width:768px) 100vw,896px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/92 text-[#0F3F1A] shadow-xl backdrop-blur-xl"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-white/45 bg-white/88 px-3 py-2 text-[11px] font-black text-[#0F3F1A] backdrop-blur-xl">Al Rehab service details</span>
                <span dir="ltr" className="inline-flex rounded-full border border-white/35 bg-black/35 px-3 py-2 text-[10px] font-black tracking-wide text-white backdrop-blur-xl">{service.id}</span>
              </div>
              <h3 id="alrehab-service-dialog-title-en" className="mt-3 text-2xl font-black text-white md:text-4xl">{service.title}</h3>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/90 text-[#0F3F1A] shadow-2xl backdrop-blur-xl">
              <Icon className="h-7 w-7" />
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <p className="text-base leading-8 text-[#625A50] md:text-lg">{service.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-2 text-xs font-bold text-[#66583F]">{tag}</span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ModalInfo icon={MapPin} title="Service area" value="Al Ain, Abu Dhabi and Dubai" />
            <ModalInfo icon={Ruler} title="Quantity & dimensions" value="Based on the items and service location" />
            <ModalInfo icon={BriefcaseBusiness} title="Pricing" value="After review and project details" />
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-[#E6DCC8] bg-[#FBF7EF] p-5">
            <h4 className="text-lg font-black text-[#0F3F1A]">Information required for this service</h4>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {service.requiredDetails.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl bg-white p-3 text-sm font-bold leading-6 text-[#4F4A42] shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href={wayaakHref}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white shadow-[0_7px_0_rgba(5,37,13,.16)]"
            >
              <Bot className="h-5 w-5 text-[#F4CA61]" />
              Ask Weyaak
            </Link>
            <a
              href={whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contact Al Rehab directly on WhatsApp about ${service.title}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A]"
            >
              <MessageCircle className="h-5 w-5 text-[#159447]" />
              Direct contact
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

function ModalInfo({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.4rem] border border-[#E6DCC8] bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
      </div>
    </div>
  );
}

function OfferCard({ product }) {
  const whatsapp = buildCardWhatsappUrl({
    phone: provider.whatsapp,
    locale: 'en',
    cardType: 'offer',
    providerName: provider.name,
    providerCode: provider.id,
    cardCode: product.id,
    cardId: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: 'After assessment',
    pricingModel: 'Quotation after reviewing photos, quantity, dimensions and location',
    location: provider.location,
    pagePath: `/en/providers/alrehab-cleaning-sanitizing#${product.id}`,
  });

  return (
    <article id={product.id} data-provider-id={provider.id} data-offer-id={product.id} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(67,45,17,.15)]">
      <div className="relative h-56 overflow-hidden bg-[#E8D5B4]">
        <Image src={product.image} alt={`${product.title} by Al Rehab Cleaning & Sanitizing`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:767px) 100vw,33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg">{product.category}</span>
        <span className="absolute bottom-4 left-4 rounded-2xl border border-white/30 bg-[#0F3F1A]/95 px-4 py-2 text-sm font-black text-white shadow-xl backdrop-blur">Price after assessment</span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-black text-[#0F3F1A]">{product.title}</h3>
          <span dir="ltr" className="rounded-full bg-[#F6F0E5] px-2.5 py-1 text-[9px] font-black tracking-wide text-[#8A6A35]">{product.id}</span>
        </div>
        <p className="mt-3 min-h-[64px] leading-8 text-[#625A50]">{product.description}</p>
        <div className="mt-4 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#FFF9EA] to-[#FBF7EF] px-4 py-4">
          <p className="text-sm font-black text-[#0F3F1A]">Clear quotation after condition review</p>
          <p className="mt-2 text-xs font-bold leading-6 text-[#6A5B43]">{product.priceNote}</p>
        </div>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white">
          <MessageCircle className="h-4 w-4" />
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

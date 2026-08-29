import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import {
  buildCardWhatsappUrl,
  buildProviderWhatsappUrl,
} from '../../../lib/providerWhatsapp';
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
  Hammer,
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
  Store,
  X,
} from 'lucide-react';

const provider = {
  id: 'BR-PROV-ARK-001',
  name: 'ARKLEEN Carpentry & Interior Design',
  shortName: 'ARKLEEN',
  type: 'Carpentry & Interior Design Workshop',
  location: 'Al Ain – Mazid – Company Camp',
  joinedAt: 'July 2026',
  establishedAt: '2015',
  phone: '+971 56 779 7828',
  whatsapp: '971567797828',
  website: 'https://www.arkleen.ae',
  base: '/images/providers/arkline/',
  hero: '/images/providers/arkleen-premium/profile-cover.webp',
  logo: '/images/providers/arkleen-logo.png',
};

const resolveProviderMedia = (src) => (src?.startsWith('/') ? src : `${provider.base}${src}`);

const services = [
  {
    id: 'BR-SRV-ARK-001',
    slug: 'custom-wooden-kitchens',
    title: 'Custom Wooden Kitchens',
    description: 'ARKLEEN designs, manufactures and installs custom wooden kitchens for homes, villas, extensions and offices in Al Ain and Abu Dhabi. The service covers practical space planning, appliance positions, storage requirements, material selection, colours, finishes and accessories. Measurements, drawings and site photographs are reviewed before fabrication so the quotation and scope reflect the actual project. Each kitchen is made to order and coordinated for delivery and installation according to the approved design and site conditions.',
    image: '/images/providers/arkleen-premium/service-custom-kitchens.webp',
    icon: Ruler,
    tags: ['Made to measure', 'Fabrication & installation', 'Material options'],
    requiredDetails: [
      'City, area and project location',
      'Approximate dimensions or kitchen plan',
      'Preferred material, colour and finish',
      'Current site photos, when available',
    ],
    wayaakPrompt: 'Help me prepare a request for a custom wooden kitchen and organise the information, measurements and photos I should send to ARKLEEN before direct contact.',
  },
  {
    id: 'BR-SRV-ARK-002',
    slug: 'custom-wardrobes',
    title: 'Custom Wardrobes & Storage',
    description: 'ARKLEEN produces made-to-measure wardrobes and storage units for bedrooms, dressing rooms, entrances and residential or commercial interiors in Al Ain and Abu Dhabi. Width, height and depth are reviewed before planning shelves, drawers, hanging areas and internal accessories. Clients can select hinged or sliding doors, materials, colours and finishes. Site photographs and approximate measurements support the initial proposal and quotation, while final dimensions and specifications are confirmed before manufacturing, delivery and installation.',
    image: '/images/providers/arkleen-premium/service-custom-wardrobes.webp',
    icon: Home,
    tags: ['Custom-built', 'Storage solutions', 'Multiple finishes'],
    requiredDetails: [
      'Wardrobe location and city',
      'Approximate width, height and depth',
      'Preferred door style and internal layout',
      'Photo of the wall or space, when available',
    ],
    wayaakPrompt: 'Help me prepare a made-to-measure wardrobe request and organise the required dimensions, door style and internal layout before contacting ARKLEEN.',
  },
  {
    id: 'BR-SRV-ARK-003',
    slug: 'wooden-doors-and-decor',
    title: 'Wooden Doors & Decorative Works',
    description: 'ARKLEEN manufactures, supplies and installs made-to-measure interior doors, wall cladding, dividers and decorative woodwork in Al Ain and Abu Dhabi. The service begins by confirming quantities, opening dimensions, the required design, timber or veneer, colour, hardware and finish. Doors and decorative elements can be coordinated with the wider interior identity of the space. Site photographs or reference designs are reviewed before the execution scope, expected timeframe and quotation are confirmed for fabrication and installation.',
    image: '/images/providers/arkleen-premium/service-wooden-doors-decor.webp',
    icon: Hammer,
    tags: ['Interior doors', 'Wood cladding', 'Supply & installation'],
    requiredDetails: [
      'Required work type: doors, cladding or dividers',
      'Number of units and approximate dimensions',
      'Preferred design, colour or wood type',
      'Site photos or reference design, when available',
    ],
    wayaakPrompt: 'Help me prepare a request for wooden doors or decorative woodwork and identify the dimensions, materials and reference photos required before contacting ARKLEEN.',
  },
  {
    id: 'BR-SRV-ARK-004',
    slug: 'interior-design-and-fitout',
    title: 'Interior Design & Space Fit-Out',
    description: 'ARKLEEN provides interior design and space fit-out services in Al Ain and Abu Dhabi with specialist attention to joinery, furniture, cladding and custom wooden details. The process starts by understanding the space, its use, preferred style, colours, budget, photographs and available drawings. Kitchens, wardrobes, doors, furniture and decorative elements can be coordinated within one design direction. The proposal defines which elements will be designed, manufactured, supplied or installed before the project scope and quotation are approved.',
    image: '/images/providers/arkleen-premium/service-interior-fitout.webp',
    icon: Sparkles,
    tags: ['Interior design', 'Material coordination', 'Project-based execution'],
    requiredDetails: [
      'Project type, size and location',
      'Required scope of work',
      'Preferred style and colours',
      'Photos, drawings and approximate budget, when available',
    ],
    wayaakPrompt: 'Help me prepare an interior design and fit-out request and organise the scope, photos, drawings and estimated budget before contacting ARKLEEN.',
  },
];

const products = [
  {
    id: 'BR-PRD-ARK-001',
    slug: 'custom-wooden-kitchen',
    title: 'Custom Wooden Kitchen',
    category: 'Kitchens',
    description: 'A custom wooden kitchen by ARKLEEN in Al Ain and Abu Dhabi, with a starting price of AED 980 per linear metre. The design is tailored to the site dimensions and required use, including cabinet distribution, drawers, appliance positions, material, colour, finish, hinges and internal accessories. The displayed amount is an indicative starting price for comparison. Final pricing is confirmed after reviewing measurements, drawings, site photographs, specifications and the required manufacturing, delivery and installation scope.',
    image: '/images/providers/arkleen-premium/product-custom-kitchen.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-kitchen.webp', '/images/providers/arkleen-premium/product-custom-kitchen-detail.webp', '/images/providers/arkleen-premium/product-custom-kitchen-storage.webp'],
    icon: Home,
    price: 980,
    currency: 'AED',
    priceUnit: 'per linear metre',
    priceUnitCode: 'MTR',
    priceNote: 'Starting price. The final price is confirmed after dimensions, material, finish and accessories are reviewed.',
  },
  {
    id: 'BR-PRD-ARK-002',
    slug: 'custom-wooden-wardrobe',
    title: 'Made-to-Measure Wardrobe',
    category: 'Wardrobes',
    description: 'A made-to-measure wardrobe by ARKLEEN for bedrooms, dressing rooms and storage spaces in Al Ain and Abu Dhabi, starting from AED 2,500 per unit. The wardrobe is manufactured to the available width, height and depth, with configurable shelves, drawers, hanging space, lighting, hinged or sliding doors, materials and colours. The displayed price is indicative. Final pricing is confirmed after approving dimensions, internal organisation, finish, accessories and the delivery and installation location.',
    image: '/images/providers/arkleen-premium/product-custom-wardrobe.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-wardrobe.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp'],
    icon: Package,
    price: 2500,
    currency: 'AED',
    priceUnit: 'per unit',
    priceUnitCode: 'C62',
    priceNote: 'Starting price. The final price is confirmed after dimensions, internal layout and material are reviewed.',
  },
  {
    id: 'BR-PRD-ARK-003',
    slug: 'custom-wooden-door',
    title: 'Wooden Interior Door',
    category: 'Doors',
    description: 'A wooden interior door by ARKLEEN, manufactured to the opening size and required design for homes, villas and offices in Al Ain and Abu Dhabi, starting from AED 800 per piece. Timber or veneer, colour, finish, frame and hardware can be selected to suit the interior. The displayed amount is an indicative starting price. Final pricing depends on quantity, dimensions, door construction, material, delivery, installation and a review of opening photographs or reference designs.',
    image: '/images/providers/arkleen-premium/product-custom-door.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-door.webp', '/images/providers/arkleen-premium/product-custom-door-detail.webp'],
    icon: Store,
    price: 800,
    currency: 'AED',
    priceUnit: 'per piece',
    priceUnitCode: 'C62',
    priceNote: 'Starting price. The final price is confirmed after dimensions, wood or veneer type and finish are reviewed.',
  },
];

const gallery = [
  ['/images/providers/arkleen-premium/profile-cover.webp', 'ARKLEEN carpentry and interior design craftsmanship'],
  ['/images/providers/arkleen-premium/service-custom-kitchens.webp', 'Custom wooden kitchens by ARKLEEN'],
  ['/images/providers/arkleen-premium/service-custom-wardrobes.webp', 'Made-to-measure wardrobes by ARKLEEN'],
  ['/images/providers/arkleen-premium/service-wooden-doors-decor.webp', 'Custom wooden doors and cladding by ARKLEEN'],
  ['/images/providers/arkleen-premium/service-interior-fitout.webp', 'Interior design and space fit-out by ARKLEEN'],
];

const faqs = [
  ['What services does ARKLEEN provide?', 'ARKLEEN provides carpentry and interior design services, including kitchens, wardrobes, doors, decorative woodwork, cladding and made-to-measure furniture.'],
  ['Does ARKLEEN manufacture to custom dimensions?', 'Yes. Dimensions, photos, materials, finishes and the project location are reviewed before the quotation and fabrication stage.'],
  ['How can I request a quotation?', 'Send the project photos, measurements, required work and location through WhatsApp or the Biet Al Reef quotation request form.'],
  ['Where is ARKLEEN located?', 'ARKLEEN is located in Al Ain, Mazid, Company Camp. Contact the workshop before visiting to confirm the appointment.'],
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
    pagePath: `/en/providers/arkleen#${service.id}`,
  });
}

function buildWeyaakHref(service) {
  return 'https://play.google.com/store/apps/details?id=ae.bietalreef.app';
}

export default function ArklineEnglishPage() {
  const [selectedService, setSelectedService] = useState(null);
  const canonical = 'https://bietalreef.ae/en/providers/arkleen';
  const description = 'ARKLEEN is a carpentry and interior design workshop in Al Ain, Abu Dhabi, for custom kitchens, wardrobes, doors, furniture, fit-out and decorative woodwork.';
  const message = buildProviderWhatsappUrl({
    phone: provider.whatsapp,
    locale: 'en',
    providerName: provider.name,
    providerCode: provider.id,
    location: provider.location,
    summary: description,
    profilePath: '/en/providers/arkleen',
  });
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('ARKLEEN Carpentry Interior Design Mazid Company Camp Al Ain')}`;

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
    image: { '@type': 'ImageObject', contentUrl: `https://bietalreef.ae${resolveProviderMedia(service.image)}`, caption: `${service.title} by ARKLEEN in Al Ain and Abu Dhabi`, inLanguage: 'en-AE' },
    areaServed: [{ '@type': 'City', name: 'Al Ain' }, { '@type': 'AdministrativeArea', name: 'Abu Dhabi' }],
    provider: { '@id': `${canonical}#provider` },
    additionalProperty: { '@type': 'PropertyValue', name: 'Pricing model', value: 'Quotation after reviewing dimensions, materials and project location' },
  }));

  const productListItems = products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: product.title,
    url: `https://bietalreef.ae/en/products/arkleen/${product.slug}`,
    image: `https://bietalreef.ae${product.image}`,
  }));

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${canonical}#provider`,
      identifier: provider.id,
      name: provider.name,
      url: canonical,
      sameAs: [provider.website],
      telephone: provider.phone,
      foundingDate: provider.establishedAt,
      image: gallery.map(([src]) => `https://bietalreef.ae${resolveProviderMedia(src)}`),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mazid – Company Camp',
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
        name: 'ARKLEEN Services',
        itemListElement: serviceSchemas.map((service) => ({
          '@type': 'Offer',
          identifier: service.identifier,
          itemOffered: service,
        })),
      },
    },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#services`, name: 'ARKLEEN carpentry and interior design services', itemListElement: serviceSchemas.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#products`, name: 'ARKLEEN made-to-order products', itemListElement: productListItems },
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
        <title>ARKLEEN Carpentry & Interior Design Workshop in Al Ain, Abu Dhabi</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers/arkleen" />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/providers/arkleen" />
        <meta property="og:title" content="ARKLEEN Carpentry & Interior Design Workshop in Al Ain, Abu Dhabi" />
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
              <Link href="/providers/arkleen" className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#D8C8AA] bg-white px-4 py-2 text-xs font-black text-[#0F3F1A] shadow-sm">
                AR
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E6DCC8] shadow-[0_24px_70px_rgba(66,45,17,.14)]">
              <div className="relative aspect-[16/10] min-h-[310px] sm:aspect-[16/8] md:min-h-[520px]">
                <Image
                  src={resolveProviderMedia(provider.hero)}
                  alt="ARKLEEN carpentry and interior design workshop exterior in Al Ain"
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
                    <Tag>Carpentry & Interior Design Workshop</Tag>
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
                  href="/request-quote?provider=arkleen&lang=en"
                  className="inline-flex min-h-[62px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0F3F1A] to-[#082D13] px-5 py-4 text-base font-black text-white shadow-[0_9px_0_rgba(5,37,13,.20),0_18px_35px_rgba(15,63,26,.22)] transition hover:-translate-y-0.5"
                >
                  <BriefcaseBusiness className="h-6 w-6 text-[#F4CA61]" />
                  Request a quotation from ARKLEEN
                </Link>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <ContactButton href={message} external icon={MessageCircle} label="WhatsApp" />
                  <ContactButton href="tel:+971567797828" icon={Phone} label="Call" />
                  <ContactButton href="https://play.google.com/store/apps/details?id=ae.bietalreef.app" icon={Bot} label="Weyaak" />
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
                ['Photo Gallery', '#gallery'],
                ['FAQ', '#faq'],
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
            <SectionHeading eyebrow="Business Information" title="About ARKLEEN" />
            <p className="mt-4 max-w-4xl text-base leading-9 text-[#625A50] md:text-lg">
              ARKLEEN is a carpentry and interior design workshop based in Al Ain, Abu Dhabi, serving projects across Al Ain and Abu Dhabi according to scope. The workshop designs, manufactures, supplies and installs custom wooden kitchens, wardrobes, interior doors, wall cladding, furniture and decorative woodwork. Every request starts with a review of site photographs, drawings, measurements, materials, colours, finishes and accessories, followed by a clear scope, estimated programme and quotation before execution. The ARKLEEN profile on Biet Al Reef connects the business activity, specialisations, services, products and coverage areas to verified database records.
            </p>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <TrustBadge icon={BadgeCheck} title="Registered with Biet Al Reef" />
              <TrustBadge icon={ShieldCheck} title="Contact details verified" />
              <TrustBadge icon={History} title="Established in 2015" />
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              <ActivityDetail icon={Building2} title="Main activity" value="Factories, Workshops & Stores — Carpentry & Interior Design Workshop" source="provider_categories.is_primary" />
              <ActivityDetail icon={Layers3} title="Specialisation" value="Integrated carpentry and interior design, custom kitchens and wardrobes, wooden doors, furniture and wood décor" source="provider_specialties" />
              <ActivityDetail icon={ListChecks} title="Services" value="Wooden kitchen design, wardrobe manufacturing, wooden door manufacturing and interior fit-out handover" source="provider_services.service_id" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <CompactInfo icon={CalendarDays} title="Joined" value={provider.joinedAt} />
              <CompactInfo icon={Clock3} title="Workshop visit" value="By prior appointment" />
              <CompactInfo icon={MapPin} title="Service coverage" value="Al Ain and Abu Dhabi areas, subject to project scope" source="provider_service_locations" />
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
                    <h3 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">Al Ain – Mazid – Company Camp</h3>
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
              <SectionHeading eyebrow="Services & Offers" title="ARKLEEN services available for quotation requests" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                Each service card represents a real database record with its service name, specialisation, public ID and dedicated image. Read the summary, then select “Details” to view the complete search-focused content and the information required to prepare a quotation request.
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
            </div>
          </section>

          <section id="products" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14">
            <SectionHeading eyebrow="Products & pricing" title="Made-to-order products with clear starting prices" />
            <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
              ARKLEEN made-to-order products are presented with matching images, database IDs, detailed searchable descriptions and clear starting prices. Final pricing is confirmed after dimensions, materials, finishes, accessories and the delivery or installation location are reviewed.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section id="gallery" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="Photo Gallery" title="ARKLEEN photo gallery" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                These are the current approved images in the provider file. New project and workshop images can be added later without changing the gallery structure.
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
            <SectionHeading eyebrow="Frequently Asked Questions" title="Common questions about ARKLEEN services" center />
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
        alt="ARKLEEN Carpentry & Interior Design logo"
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
          alt={`${service.title} by ARKLEEN in Al Ain and Abu Dhabi`}
          fill
          itemProp="image"
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:767px) 100vw,50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 md:inset-x-4 md:top-4 md:gap-3">
          <span className="rounded-full border border-white/50 bg-white/88 px-2.5 py-1.5 text-[9px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl md:px-3 md:py-2 md:text-[11px]">ARKLEEN service</span>
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
          <span className="flex items-center gap-2 font-bold text-[#625A50]"><MapPin className="h-4 w-4 text-[#A66B19]" />Al Ain and Abu Dhabi</span>
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
            aria-label={`Contact ARKLEEN on WhatsApp about ${service.title}`}
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="arkline-service-dialog-title-en">
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
                <span className="inline-flex rounded-full border border-white/45 bg-white/88 px-3 py-2 text-[11px] font-black text-[#0F3F1A] backdrop-blur-xl">ARKLEEN service details</span>
                <span dir="ltr" className="inline-flex rounded-full border border-white/35 bg-black/35 px-3 py-2 text-[10px] font-black tracking-wide text-white backdrop-blur-xl">{service.id}</span>
              </div>
              <h3 id="arkline-service-dialog-title-en" className="mt-3 text-2xl font-black text-white md:text-4xl">{service.title}</h3>
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
            <ModalInfo icon={MapPin} title="Execution area" value="Al Ain and Abu Dhabi" />
            <ModalInfo icon={Ruler} title="Measurements" value="Based on the site and project" />
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
              aria-label={`Contact ARKLEEN directly on WhatsApp about ${service.title}`}
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

function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-AE').format(product.price);
  const priceText = `Starting from AED ${formattedPrice} ${product.priceUnit}`;
  const productPath = `/en/products/arkleen/${product.slug}`;
  const whatsapp = buildCardWhatsappUrl({
    phone: provider.whatsapp,
    locale: 'en',
    cardType: 'product',
    providerName: provider.name,
    providerCode: provider.id,
    cardCode: product.id,
    cardId: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: priceText,
    pricingModel: 'Starting price · Made to order',
    location: provider.location,
    pagePath: productPath,
  });
  return (
    <article id={product.id} data-provider-id={provider.id} data-product-id={product.id} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(67,45,17,.15)]">
      <div className="relative h-56 overflow-hidden bg-[#E8D5B4]">
        <Image src={product.image} alt={`${product.title} by ARKLEEN Carpentry & Interior Design in Al Ain`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:767px) 100vw,33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span data-product-category className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg">{product.category}</span>
        <span data-product-price-badge className="absolute bottom-4 left-4 rounded-2xl border border-white/30 bg-[#0F3F1A]/95 px-4 py-2 text-sm font-black text-white shadow-xl backdrop-blur">
          From AED {formattedPrice}
        </span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-black text-[#0F3F1A]">{product.title}</h3>
          <span dir="ltr" className="rounded-full bg-[#F6F0E5] px-2.5 py-1 text-[9px] font-black tracking-wide text-[#8A6A35]">{product.id}</span>
        </div>
        <p className="mt-3 min-h-[64px] leading-8 text-[#625A50]">{product.description}</p>
        <div className="mt-4 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#FFF9EA] to-[#FBF7EF] px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-black text-[#8A6A35]">Starting price</p>
              <p className="mt-1 text-2xl font-black text-[#0F3F1A]"><span className="text-sm">AED</span> {formattedPrice}</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#6A5B43] shadow-sm">{product.priceUnit}</span>
          </div>
          <p className="mt-3 border-t border-[#D4AF37]/20 pt-3 text-xs font-bold leading-6 text-[#6A5B43]">{product.priceNote}</p>
        </div>
        <Link href={productPath} className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9EA] px-4 py-3 text-sm font-black text-[#0F3F1A]">
          Open product page
          <ArrowLeft className="h-4 w-4 rotate-180" />
        </Link>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white">
          <MessageCircle className="h-4 w-4" />
          WhatsApp with product details
        </a>
      </div>
    </article>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Globe,
  Home,
  MapPinned,
  MessageSquare,
  Scale,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  UsersRound,
  Wrench,
} from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

const platformGateways = [
  {
    title: 'UAE Directory',
    description: 'Start with the emirate, city and area to reach activities, services and providers connected to that location.',
    href: '/en/uae',
    icon: MapPinned,
    image: '/images/gateway/uae-directory-gateway.webp',
    imageAlt: 'UAE directory for construction and contracting services on Biet Al Reef',
  },
  {
    title: 'Service Providers',
    description: 'Browse verified profiles for companies, contractors, factories, suppliers, workshops and skilled professionals.',
    href: '/en/providers',
    icon: UsersRound,
    image: '/images/gateway/providers-gateway.webp',
    imageAlt: 'Construction and contracting service providers in the UAE',
  },
  {
    title: 'Services & Offers',
    description: 'Discover construction, contracting, finishing, maintenance and design services by speciality and location.',
    href: '/en/services',
    icon: Wrench,
    image: '/images/gateway/services-offers-gateway.webp',
    imageAlt: 'Construction, finishing and maintenance services and offers',
  },
  {
    title: 'Products & Stores',
    description: 'Find building materials, products, stores and suppliers connected to the requirements of your project.',
    href: '/en/marketplace',
    icon: ShoppingBag,
    image: '/images/gateway/materials-products-gateway.webp',
    imageAlt: 'Building materials, products and stores on Biet Al Reef',
  },
];

const customerJourney = [
  {
    number: '01',
    title: 'Search and contact directly',
    description: 'Choose a location or service, review published profiles, then contact a provider or request a quotation.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Organise the request with Weyaak',
    description: 'Describe your need naturally. Weyaak helps identify the activity, service, location, dimensions and missing information.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Review the quotation and options',
    description: 'Compare the scope, specifications, materials, duration and price—not only the final number.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Request an internal tender when needed',
    description: 'If no price or solution is suitable, send the request to Biet Al Reef to widen the search and collect more offers.',
    icon: Target,
  },
];

const tenderSteps = [
  {
    number: '01',
    title: 'Submit a tender request',
    description: 'The customer sends the project, service or product details and explains why the current offers or options are unsuitable.',
    icon: FileSearch,
  },
  {
    number: '02',
    title: 'Review the request scope',
    description: 'Biet Al Reef reviews specifications, location, quantities, images, timing and indicative budget, then requests anything missing.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Select suitable parties',
    description: 'Companies, suppliers, factories or workshops are selected according to speciality and the delivery or execution location.',
    icon: UsersRound,
  },
  {
    number: '04',
    title: 'Receive offers',
    description: 'Invitations are sent privately, and Biet Al Reef receives offers from invited parties against a clear, verified scope.',
    icon: Send,
  },
  {
    number: '05',
    title: 'Compare clearly',
    description: 'Offers are reviewed across price, specifications, quality, timing, location and the ability to execute or supply.',
    icon: Scale,
  },
  {
    number: '06',
    title: 'Present options to the customer',
    description: 'The strongest matching options are organised and presented to the customer, who keeps the final decision before contracting.',
    icon: BadgeCheck,
  },
];

const providerBenefits = [
  'A structured digital profile for the activity, services, products, projects and working areas.',
  'Visibility in relevant UAE Directory, service and product paths.',
  'Quotation requests connected to the speciality and location when the data matches.',
  'Eligibility for internal tender invitations when the activity and capabilities match the request.',
];

const principles = [
  {
    title: 'The tender is not a public advertisement',
    description: 'It is a private path managed by Biet Al Reef and sent to selected parties after their fit with the request is reviewed.',
    icon: ShieldCheck,
  },
  {
    title: 'Best does not mean cheapest only',
    description: 'The comparison covers price, specifications, service or material quality, timing and the ability to commit.',
    icon: Scale,
  },
  {
    title: 'The customer makes the decision',
    description: 'Biet Al Reef organises the search and comparison, while the customer chooses the offer and makes the final agreement.',
    icon: CheckCircle2,
  },
];

const faqItems = [
  {
    question: 'When should I request a quotation?',
    answer: 'Request a quotation when the required service or product is clear and can be directed to a suitable provider or supplier using the available location and specification details.',
  },
  {
    question: 'When should I request an internal tender?',
    answer: 'Request an internal tender when the available options do not provide a suitable price or solution, or when the project needs a wider comparison between several providers, suppliers or factories.',
  },
  {
    question: 'Who creates the internal tender?',
    answer: 'The customer submits the request to Biet Al Reef. The team reviews the details, defines the scope, creates the tender and invites suitable parties to provide offers.',
  },
  {
    question: 'Is the tender public and open to everyone?',
    answer: 'No. It is a managed internal tender sent to providers, suppliers, factories or workshops whose activity, location and capabilities match the request.',
  },
  {
    question: 'Can a tender cover a service or a product?',
    answer: 'Yes. It may cover a project, execution or maintenance service, building material, product or supply requirement according to the customer need and request scope.',
  },
  {
    question: 'How are offers compared?',
    answer: 'Offers are compared across price, specifications, service or material quality, execution location, timing and ability to commit. Suitable options are then presented to the customer.',
  },
  {
    question: 'Does Biet Al Reef guarantee the lowest price?',
    answer: 'No. The goal is the strongest possible match across price, specifications, quality, timing, location and ability to execute or supply, without uncertain promises.',
  },
  {
    question: 'What is Weyaak’s role on the platform?',
    answer: 'Weyaak helps understand the request, identify the activity, service, location, dimensions and missing information, then guides the customer to search, request a quotation or use the internal tender path.',
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-sm font-black text-[#A27E18]">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{title}</h2>
      {description ? <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">{description}</p> : null}
    </div>
  );
}

export default function HowItWorksEnglishPage() {
  const description = 'Learn how Biet Al Reef works: search by location and service, contact providers, request quotations, and use Weyaak or a managed internal tender when needed.';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/en/how-it-works#webpage`,
        url: `${SITE_URL}/en/how-it-works`,
        name: 'How Biet Al Reef Works',
        description,
        inLanguage: 'en-AE',
        isPartOf: { '@type': 'WebSite', name: 'Biet Al Reef', url: SITE_URL },
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/en/how-it-works#howto`,
        name: 'How to start a request on Biet Al Reef',
        description: 'The journey from search and contact to a quotation and a managed internal tender when required.',
        step: customerJourney.map((item, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: item.title,
          text: item.description,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/en/how-it-works#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <EnglishLayout>
      <Head>
        <title>How Biet Al Reef Works | Search, Quotations and Tenders</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/en/how-it-works`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/how-it-works`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/how-it-works`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/how-it-works`} />
        <meta property="og:title" content="How Biet Al Reef Works" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/en/how-it-works`} />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:image" content={`${SITE_URL}/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <main dir="ltr" className="text-left">
        <section className="relative overflow-hidden border-b border-[#E7DCC7] bg-[#F8F4EC] px-4 py-8 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,63,26,0.08),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-7 flex justify-start md:mb-9">
              <Link href="/en" className="group inline-flex items-center gap-3 rounded-[1.35rem] border border-white/80 bg-white/55 px-5 py-3.5 font-black text-[#0F3F1A] shadow-[0_18px_40px_rgba(15,63,26,0.15),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(212,175,55,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E7] text-[#A27E18] shadow-inner transition group-hover:scale-105"><Home className="h-4.5 w-4.5" /></span>
                Back to home
              </Link>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/65 px-4 py-2 text-sm font-black text-[#8B6A10] shadow-sm backdrop-blur"><Globe className="h-4 w-4" />A digital ecosystem for the construction sector</span>
                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.16] text-[#0F3F1A] md:text-6xl">
                  Integrated strength in one place
                  <span className="mt-2 block text-[#A27E18]">without the complexity</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700 md:leading-9">A specialised platform that brings together the UAE Directory, service providers, products, quotation requests, internal tenders and Weyaak in one connected journey.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/en/uae" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#164E25]">Start with the UAE Directory <ArrowRight className="h-5 w-5" /></Link>
                  <a href="#journey" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#CBAF5A] bg-white/70 px-7 py-4 font-black text-[#0F3F1A] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">See how the platform works <Sparkles className="h-5 w-5 text-[#A27E18]" /></a>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-[2.4rem] border border-[#D7C8A7] bg-white shadow-[0_28px_70px_rgba(15,63,26,0.17)]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                    <Image src="/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp" alt="Biet Al Reef integrated platform for design, construction, management, finance and marketing" fill priority className="scale-[1.08] object-cover object-[center_68%]" sizes="(max-width: 1024px) 100vw, 48vw" />
                    <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#F8F4EC] via-[#F8F4EC]/96 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#FCFAF6] px-4 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_32%)]" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow="Platform gateways" title="Start with the path closest to your need" description="Four visual gateways connect to the same activity, service, product and location data across Biet Al Reef." />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {platformGateways.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} href={item.href} className="group overflow-hidden rounded-[1.75rem] border border-[#E5D9C1] bg-white p-2 shadow-[0_16px_34px_rgba(15,63,26,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_24px_45px_rgba(15,63,26,0.14)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-[#F0E7D6]">
                      <Image src={item.image} alt={item.imageAlt} fill className="object-cover object-center transition duration-500 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071E11]/32 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/65 bg-white/82 text-[#A27E18] shadow-lg backdrop-blur"><Icon className="h-5 w-5" /></div>
                    </div>
                    <div className="flex min-h-[185px] flex-col px-4 pb-4 pt-5">
                      <h3 className="text-lg font-black leading-7 text-[#0F3F1A]">{item.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">{item.description}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#A27E18]">Open section <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-12 md:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] border border-[#D9CBAF] bg-[#0F3F1A] shadow-[0_32px_80px_rgba(15,63,26,0.2)]">
            <div className="relative min-h-[520px] md:min-h-[620px]">
              <Image src="/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp" alt="Biet Al Reef digital platform for the UAE construction and contracting sector" fill className="object-cover object-center" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071E11]/96 via-[#0F3F1A]/80 to-[#0F3F1A]/28" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.2),transparent_36%)]" />
              <div className="relative z-10 flex min-h-[520px] items-center p-7 md:min-h-[620px] md:p-12 lg:p-16">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#071E11]/55 px-4 py-2 text-sm font-black text-[#F3D46B] backdrop-blur"><Sparkles className="h-4 w-4" />An integrated digital structure for construction</span>
                  <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">Connecting each project with suitable expertise at the right time and place</h2>
                  <p className="mt-5 text-base leading-8 text-white/90 md:text-lg md:leading-9">Biet Al Reef combines location-based discovery, provider profiles, products, quotation requests and managed internal tenders in one path that supports clearer customer decisions and an organised digital presence for providers.</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {['Search by emirate and area', 'Structured provider data', 'Clearer requests and offers', 'Weyaak to simplify decisions'].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4 font-bold backdrop-blur-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#F3D46B]" />{item}</div>
                    ))}
                  </div>
                  <Link href="/en/weyaak" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#0F3F1A] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#E4C65F]">Start your journey with Weyaak <ArrowRight className="h-5 w-5" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 bg-[#FCFAF6] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Customer journey" title="More than one path to the solution" description="A customer does not begin with a tender by default. Search, direct contact or a quotation comes first; the managed tender path is available when broader options are needed." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {customerJourney.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.number} className="rounded-[2rem] border border-[#E5D9C1] bg-white p-6 shadow-[0_16px_34px_rgba(15,63,26,0.08)]">
                    <div className="flex items-center justify-between"><span className="text-sm font-black text-[#A27E18]">Stage {item.number}</span><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-5 w-5" /></div></div>
                    <h3 className="mt-5 text-xl font-black leading-8 text-[#0F3F1A]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600 md:leading-8">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Biet Al Reef internal tender" title="A managed service for finding the strongest match" description="When the customer does not receive a suitable offer, Biet Al Reef reviews the request and invites matching parties instead of opening it publicly." />
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tenderSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="group relative overflow-hidden rounded-[2.25rem] border border-white/75 bg-gradient-to-b from-white to-[#F6F2EA] p-6 shadow-[0_24px_55px_rgba(15,63,26,0.12),inset_0_1px_0_rgba(255,255,255,1)] transition duration-300 hover:-translate-y-1.5">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
                    <div className="flex items-center justify-between"><span className="text-sm font-black text-[#A27E18]">{step.number}</span><div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] border border-[#E8D8A4] bg-[#FFF9E8] text-[#A27E18] shadow-[0_10px_24px_rgba(162,126,24,0.14)]"><Icon className="h-5.5 w-5.5" /></div></div>
                    <h3 className="mt-6 text-xl font-black leading-8 text-[#0F3F1A]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600 md:leading-8">{step.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-9 text-center"><Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5">Send your request to Biet Al Reef <ArrowRight className="h-5 w-5" /></Link></div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <span className="text-sm font-black text-[#A27E18]">For providers and partners</span>
            <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">A digital presence and opportunities connected to your speciality</h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-600 md:leading-9">Access to requests and tenders depends on profile completeness, verified data, and the match between the activity, services, products, working areas and customer need.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {providerBenefits.map((item) => <div key={item} className="flex items-start gap-4 rounded-[1.6rem] border border-[#E5D9C1] bg-[#FCFAF6] p-5 shadow-sm"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" /><p className="font-semibold leading-7 text-gray-700 md:leading-8">{item}</p></div>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/en/providers/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5">Request a provider profile <ArrowRight className="h-5 w-5" /></Link>
              <Link href="/en/partners" className="inline-flex items-center justify-center rounded-2xl border border-[#CBAF5A] bg-[#FFF9E8] px-7 py-4 font-black text-[#0F3F1A] transition hover:-translate-y-0.5">Explore partnerships</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Clear principles" title="How do we keep the process clear?" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {principles.map((item) => {
                const Icon = item.icon;
                return <article key={item.title} className="rounded-[2rem] border border-[#E5D9C1] bg-white p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4D4] text-[#A27E18]"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-black leading-8 text-[#0F3F1A]">{item.title}</h3><p className="mt-3 leading-7 text-gray-600 md:leading-8">{item.description}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-[#E5D9C1] bg-[#FCFAF6] p-7 shadow-xl md:p-11">
            <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-[#D4AF37]/35 shadow-2xl md:h-60 md:w-60"><Image src="/images/weyaak-new-logo.jpg" alt="Weyaak, the Biet Al Reef intelligent assistant" fill className="object-cover" sizes="240px" /></div>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#A27E18]"><Bot className="h-5 w-5" />Weyaak</span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">It clarifies your request without making the decision for you</h2>
                <p className="mt-5 leading-7 text-gray-600 md:leading-8">Weyaak understands the customer’s description, extracts the service, location, dimensions and specifications, then guides the customer to the directory, quotation or tender path. Recommendations rely on published and verified platform data.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/en/weyaak" className="inline-flex items-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3.5 font-black text-white"><Bot className="h-5 w-5" />Talk to Weyaak</Link>
                  <Link href="/en/tools" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9E8] px-6 py-3.5 font-black text-[#0F3F1A]"><BriefcaseBusiness className="h-5 w-5" />Explore tools</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 bg-[#F8F4EC] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Frequently asked questions" title="Questions about how Biet Al Reef works" description="Clear answers about quotations, managed internal tenders and Weyaak’s role on the platform." />
            <div className="mt-10 space-y-4">
              {faqItems.map((item) => <details key={item.question} className="group rounded-[1.75rem] border border-[#E5D9C1] bg-white p-6 shadow-sm transition open:border-[#D4AF37] open:shadow-md"><summary className="cursor-pointer list-none text-lg font-black leading-8 text-[#0F3F1A]">{item.question}</summary><p className="mt-4 leading-7 text-gray-600 md:leading-8">{item.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-gradient-to-r from-[#0F3F1A] to-[#194F27] p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">Start with the simplest path and move to a tender when needed</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-white/85 md:leading-8">Search, contact a provider and request a quotation first. If no option is suitable, send the request to Biet Al Reef for review and a clearly managed internal tender.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/en/uae" className="rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#0F3F1A]">Explore the directory</Link>
              <Link href="/en/contact" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-black text-white">Send a platform request</Link>
            </div>
          </div>
        </section>
      </main>
    </EnglishLayout>
  );
}

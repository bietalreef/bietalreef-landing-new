import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';

const values = [
  {
    icon: '🧭',
    title: 'Practical Experience',
    text: 'We build solutions from the realities of the contracting market and the needs of the people working in it, not from assumptions made outside the field.',
  },
  {
    icon: '🔎',
    title: 'Clarity and Transparency',
    text: 'We organise information and services in a clear way and avoid promises that cannot be guaranteed.',
  },
  {
    icon: '⚖️',
    title: 'Fair Access',
    text: 'We prioritise the match between activity, service, location and data quality rather than payment alone.',
  },
  {
    icon: '🤖',
    title: 'Responsible Innovation',
    text: 'We use artificial intelligence to simplify search and support decisions while preserving the role of human expertise.',
  },
];

const faqItems = [
  {
    question: 'What is Biet Al Reef?',
    answer: 'Biet Al Reef is a UAE digital platform that organises access to construction, contracting, finishing, maintenance and building-material service providers across the United Arab Emirates.',
  },
  {
    question: 'Where did the Biet Al Reef idea begin?',
    answer: 'The idea began in Al Ain from more than ten years of practical contracting experience that revealed how difficult it can be to find suitable subcontractors and suppliers and compare services, prices and materials.',
  },
  {
    question: 'How does Biet Al Reef help customers?',
    answer: 'It helps customers clarify their needs, search by service and location, review providers, contact them directly, request a quotation and ask for a managed internal tender when no suitable offer is found.',
  },
  {
    question: 'How does Biet Al Reef help service providers?',
    answer: 'It gives companies, factories, suppliers, workshops and skilled professionals an organised digital presence that presents their services, products, projects and service areas.',
  },
  {
    question: "What is Weyaak's role on the platform?",
    answer: 'Weyaak helps understand the request, identify the required service, location and missing information, and then searches published provider data to find options aligned with the customer need.',
  },
];

export default function AboutEnglishPage() {
  const description = 'Discover the story of Biet Al Reef, a UAE digital platform born from over 10 years of contracting experience to connect project owners with construction service providers.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://bietalreef.ae/#website',
        url: 'https://bietalreef.ae',
        name: 'Biet Al Reef',
        inLanguage: ['ar-AE', 'en-AE'],
        publisher: { '@id': 'https://bietalreef.ae/#organization' },
      },
      {
        '@type': 'Organization',
        '@id': 'https://bietalreef.ae/#organization',
        name: 'Biet Al Reef',
        alternateName: 'بيت الريف',
        url: 'https://bietalreef.ae',
        logo: 'https://bietalreef.ae/logo.png',
        description,
        foundingLocation: {
          '@type': 'Place',
          name: 'Al Ain, Abu Dhabi, United Arab Emirates',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United Arab Emirates',
        },
        knowsAbout: [
          'Contracting and construction',
          'Finishing and maintenance',
          'Building materials',
          'Service providers',
          'Artificial intelligence in construction',
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://bietalreef.ae/en/about#webpage',
        url: 'https://bietalreef.ae/en/about',
        name: 'About Biet Al Reef',
        description,
        inLanguage: 'en-AE',
        isPartOf: { '@id': 'https://bietalreef.ae/#website' },
        about: { '@id': 'https://bietalreef.ae/#organization' },
        breadcrumb: { '@id': 'https://bietalreef.ae/en/about#breadcrumb' },
        dateModified: '2026-07-13',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://bietalreef.ae/en/about#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://bietalreef.ae/en',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Biet Al Reef',
            item: 'https://bietalreef.ae/en/about',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://bietalreef.ae/en/about#faq',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>About Biet Al Reef | Our Story and Vision for Construction in the UAE</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Biet Al Reef, UAE contracting platform, construction service providers, UAE contractors, building materials, Weyaak, construction artificial intelligence" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/about" />
        <meta property="og:title" content="Biet Al Reef | A Story Born from the Contracting Market" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/about" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:image" content="https://bietalreef.ae/logo.png" />
        <meta property="og:image:alt" content="Biet Al Reef logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Biet Al Reef | Our Story and Vision" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://bietalreef.ae/logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="flex-1 max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14 bg-gradient-to-b from-blue-50 via-white to-blue-50">
          <section className="text-center space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">From Al Ain to every Emirate</span>
            <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-gray-900 md:text-5xl">About Biet Al Reef: Field Experience Transformed into a Digital Platform</h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-gray-700 md:text-xl">
              <strong>Biet Al Reef</strong> is a UAE digital platform specialising in construction, contracting, finishing, maintenance and building materials. It helps project owners reach suitable providers and enables businesses to present their expertise clearly and professionally.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/en/why-biet-alreef" className="rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:opacity-90">Why did we create Biet Al Reef?</Link>
              <Link href="/en/how-it-works" className="rounded-2xl border-2 border-primary bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5">How does the platform work?</Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-primary/20 bg-white p-6 shadow-xl md:p-10">
            <h2 className="text-center text-2xl font-black text-gray-900 md:text-3xl">What is Biet Al Reef?</h2>
            <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-8 text-gray-800 md:text-lg">
              Biet Al Reef is a specialist digital home that organises access to companies, contractors, factories, suppliers, workshops and skilled professionals. It connects their services, products, projects and service areas across the UAE so customers can reach more suitable options with greater clarity.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">Sector</p>
                <p className="mt-2 font-semibold text-gray-900">Construction, contracting, finishing, maintenance and building materials</p>
              </div>
              <div className="rounded-2xl bg-green-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">Who We Serve</p>
                <p className="mt-2 font-semibold text-gray-900">Project owners, customers and service providers</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">Coverage</p>
                <p className="mt-2 font-semibold text-gray-900">From Al Ain to all seven Emirates</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏗️</span>
              <div>
                <p className="text-sm font-bold text-primary">Our Story</p>
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Practical Experience Revealed the Need for a Clearer Market Route</h2>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-9">
              <p className="text-base leading-8 text-gray-800 md:text-lg">
                The idea for Biet Al Reef began with its founder's experience managing contracting work in the UAE for more than ten years. During that time, we repeatedly faced challenges in finding suitable subcontractors, reaching companies and suppliers, selecting building materials and comparing quotations while protecting execution quality.
              </p>
              <p className="mt-5 text-base leading-8 text-gray-800 md:text-lg">
                Through direct work with project owners, it became clear that customers faced the same problem. At the same time, many capable companies, factories, workshops and professionals had real expertise but lacked a digital presence that reflected their capabilities. Biet Al Reef was created to organise that information and bring demand and expertise closer together.
              </p>
              <blockquote className="mt-7 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 text-lg font-bold leading-8 text-gray-900">Biet Al Reef was not built away from the market's problems; it was born from within them to offer a practical solution.</blockquote>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border-l-4 border-primary bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">Our Vision</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">The Trusted Digital Home for the Construction Sector</h2>
              <p className="mt-5 leading-8 text-gray-800">Our vision is for Biet Al Reef to become the trusted digital home for every project owner and every business in construction and contracting, and a specialist digital reference for construction, finishing, maintenance and building materials in the UAE.</p>
            </article>
            <article className="rounded-3xl border-l-4 border-secondary bg-white p-6 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">Our Mission</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">Organising Information and Simplifying Access</h2>
              <p className="mt-5 leading-8 text-gray-800">We transform fragmented market information into a clear system that connects activity, service, product, project and location. This helps customers take a better-informed next step and enables providers to build a lasting digital presence.</p>
            </article>
          </section>

          <section className="overflow-hidden rounded-3xl bg-[#0F3F1A] p-7 text-white shadow-2xl md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold text-[#F3D46B]">Weyaak and Artificial Intelligence</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">Technology in Support of Human Expertise</h2>
                <p className="mt-5 leading-8 text-white/90">Biet Al Reef uses artificial intelligence to simplify search, comparison and request organisation. <strong>Weyaak</strong> helps customers clarify the requirement, identify the service and location, and find published provider data aligned with the request.</p>
                <p className="mt-4 leading-8 text-white/90">Our goal is not to replace engineers, contractors or skilled professionals, but to make access to the right expertise faster and clearer.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {['Understand the customer need', 'Reduce search time', 'Organise provider data', 'Support decisions with information'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-bold">{item}</div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">Our Message</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">A Platform Serving Both Sides of the Project</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">For Project Owners and Customers</h3>
                <p className="mt-4 leading-8 text-gray-700">We provide a clearer path to understand the need, discover suitable options, reach providers by specialty and location, request a quotation and, when no suitable offer is found, ask Biet Al Reef to create a managed internal tender.</p>
              </article>
              <article className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">For Companies and Service Providers</h3>
                <p className="mt-4 leading-8 text-gray-700">We help businesses present their expertise, services, products and projects clearly and build a structured digital presence that customers can understand and discover.</p>
              </article>
            </div>
            <p className="text-center text-lg font-black text-primary">Building trust between those seeking a service and those who hold the expertise.</p>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">Our Values</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">The Principles Behind Biet Al Reef</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <article key={value.title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="mt-4 text-lg font-black text-gray-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{value.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-lg md:p-9">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Explore the Complete Platform Story</h2>
              <p className="mx-auto mt-3 max-w-3xl leading-8 text-gray-600">The details are distributed across dedicated pages so every visitor can reach the information they need without repetition.</p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ['/en/why-biet-alreef', 'Why Biet Al Reef?', 'The market problem we experienced and what makes the solution different.'],
                ['/en/how-it-works', 'How it works', 'The customer and provider journeys and the role of Weyaak.'],
                ['/en/platform', 'The Platform', 'The ecosystem, discovery paths, requests and managed internal tenders.'],
                ['/en/partners', 'Partners', 'How providers, suppliers, factories and workshops can join.'],
              ].map(([href, title, text]) => (
                <Link key={href} href={href} className="rounded-2xl border border-[#E6DCC8] p-5 transition hover:border-primary hover:shadow-md">
                  <h3 className="font-black text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4" id="faq">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Frequently Asked Questions About Biet Al Reef</h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-black text-gray-900">{item.question}</summary>
                  <p className="mt-4 leading-8 text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-2xl font-black md:text-3xl">Biet Al Reef Brings Projects and Expertise Together</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/90">Whether you are a project owner searching for the right party or a business seeking a clearer digital presence, your journey begins here.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/en/uae" className="rounded-2xl bg-white px-6 py-3 font-bold text-primary">Explore the UAE Directory</Link>
              <Link href="/en/providers/register" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">Join as a Service Provider</Link>
              <Link href="/en/weyaak" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">Talk to Weyaak</Link>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

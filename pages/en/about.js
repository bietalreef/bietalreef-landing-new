import Head from "next/head";
import Link from "next/link";
import EnglishLayout from "../../components/EnglishLayout";

const values = [
  {
    icon: "🧭",
    title: "Practical Experience",
    text: "We build solutions from the realities of the contracting market and the needs of the people working in it, not from assumptions made outside the field."
  },
  {
    icon: "🔎",
    title: "Clarity and Transparency",
    text: "We organise information, services and scopes of work clearly, while avoiding promises that cannot be guaranteed."
  },
  {
    icon: "⚖️",
    title: "Fair Access",
    text: "We prioritise the match between activity, service, location and data quality, rather than payment alone."
  },
  {
    icon: "🤖",
    title: "Responsible Innovation",
    text: "We use artificial intelligence to simplify search and support decisions while preserving the role of human expertise."
  }
];

const faqItems = [
  {
    question: "What is Biet Al Reef?",
    answer:
      "Biet Al Reef is a UAE digital platform that organises access to construction, contracting, finishing, maintenance and building-material service providers across the United Arab Emirates."
  },
  {
    question: "Why was Biet Al Reef created?",
    answer:
      "Biet Al Reef was created from more than ten years of practical contracting experience that revealed how difficult it can be to find suitable subcontractors and suppliers and to compare services, prices and materials."
  },
  {
    question: "How does Biet Al Reef help customers?",
    answer:
      "It helps customers clarify their needs, search by service and location, review service providers, contact them directly or submit a quotation request."
  },
  {
    question: "How does Biet Al Reef help service providers?",
    answer:
      "It gives companies, factories, suppliers, workshops and skilled professionals an organised digital presence that presents their services, products, projects and service areas to customers and search engines."
  },
  {
    question: "Is Biet Al Reef free for customers?",
    answer:
      "Yes. Customers can search and submit an enquiry or quotation request free of charge, while digital-presence plans are designed for service providers."
  },
  {
    question: "What is Weyaak's role on the platform?",
    answer:
      "Weyaak helps understand the request, identify the required service, location and missing information, and then searches published provider data to find options aligned with the customer's needs."
  }
];

export default function AboutEnglishPage() {
  const description =
    "Discover the story of Biet Al Reef, a UAE digital platform born from over 10 years of contracting experience to connect project owners with construction service providers.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bietalreef.ae/#website",
        url: "https://bietalreef.ae",
        name: "Biet Al Reef",
        inLanguage: ["ar-AE", "en-AE"],
        publisher: { "@id": "https://bietalreef.ae/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://bietalreef.ae/#organization",
        name: "Biet Al Reef",
        alternateName: "بيت الريف",
        url: "https://bietalreef.ae",
        logo: "https://bietalreef.ae/logo.png",
        description,
        foundingLocation: {
          "@type": "Place",
          name: "Al Ain, Abu Dhabi, United Arab Emirates"
        },
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates"
        },
        knowsAbout: [
          "Contracting",
          "Construction",
          "Finishing",
          "Maintenance",
          "Building materials",
          "Service providers",
          "Artificial intelligence in construction"
        ]
      },
      {
        "@type": "AboutPage",
        "@id": "https://bietalreef.ae/en/about#aboutpage",
        url: "https://bietalreef.ae/en/about",
        name: "About Biet Al Reef",
        description,
        inLanguage: "en-AE",
        dateModified: "2026-07-13",
        isPartOf: { "@id": "https://bietalreef.ae/#website" },
        about: { "@id": "https://bietalreef.ae/#organization" },
        breadcrumb: { "@id": "https://bietalreef.ae/en/about#breadcrumb" },
        mainEntity: { "@id": "https://bietalreef.ae/#organization" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bietalreef.ae/en/about#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bietalreef.ae/en"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://bietalreef.ae/en/about"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://bietalreef.ae/en/about#faq",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <Head>
        <title>About Us | Biet Al Reef Construction Platform in the UAE</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Biet Al Reef, UAE contracting platform, construction service providers, UAE contractors, building materials, Weyaak, construction artificial intelligence"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/about" />

        <meta property="og:title" content="Biet Al Reef | From Contracting Challenges to a Specialist Digital Platform" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/about" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:image" content="https://bietalreef.ae/logo.png" />
        <meta property="og:image:alt" content="Biet Al Reef logo" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Biet Al Reef" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://bietalreef.ae/logo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="flex-1 max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14 bg-gradient-to-b from-blue-50 via-white to-blue-50">
          <section className="text-center space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              From Al Ain to every Emirate
            </span>
            <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              From Contracting-Market Challenges to a Digital Home That Connects Projects with Expertise
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-gray-700 md:text-xl">
              <strong>Biet Al Reef</strong> is a UAE digital platform specialising in construction, contracting, finishing, maintenance and building materials. It was born from more than ten years of practical experience to help project owners reach suitable service providers and enable businesses to present their expertise clearly and professionally.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/en/platform"
                className="rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:opacity-90"
              >
                Explore the Platform
              </Link>
              <Link
                href="/en/providers/register"
                className="rounded-2xl border-2 border-primary bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5"
              >
                Join as a Service Provider
              </Link>
              <Link
                href="/en/weyaak"
                className="rounded-2xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-800 transition hover:border-primary hover:text-primary"
              >
                Discover Weyaak
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-primary/20 bg-white p-6 shadow-xl md:p-10">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm font-bold text-primary">Direct answer</p>
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">What is Biet Al Reef?</h2>
            </div>
            <p className="mx-auto max-w-4xl text-center text-base leading-8 text-gray-800 md:text-lg">
              Biet Al Reef is a specialist digital platform that organises access to companies, contractors, factories, suppliers, workshops and skilled professionals, connecting their services, products and projects with the locations they serve across the UAE so customers can find providers aligned with their needs.
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
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Practical Experience Transformed into a Digital Solution</h2>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-9">
              <p className="text-base leading-8 text-gray-800 md:text-lg">
                The idea for Biet Al Reef began with its founder's experience managing contracting work in the UAE for more than ten years. During that time, we repeatedly faced the challenge of finding suitable subcontractors, reaching reliable companies and suppliers, selecting appropriate building materials, and comparing quotations to achieve strong value without compromising execution quality.
              </p>
              <p className="mt-5 text-base leading-8 text-gray-800 md:text-lg">
                The problem was not a lack of expertise. It was fragmented information and the difficulty of reaching the right party at the right time. Through direct work with project owners, we saw that customers faced the same challenge, while many capable companies, workshops and professionals lacked a digital presence that reflected their true capabilities.
              </p>
              <blockquote className="mt-7 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 text-lg font-bold leading-8 text-gray-900">
                Biet Al Reef was not built away from the market's problems; it was born from within them to offer a practical solution.
              </blockquote>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">The Problem We Are Solving</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">A Large Market with Fragmented Information</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">Challenges for Customers and Project Owners</h3>
                <ul className="mt-5 space-y-3 text-gray-700">
                  <li>• Identifying the most suitable party for the required work.</li>
                  <li>• Comparing quotations, prices and scopes of execution.</li>
                  <li>• Understanding differences between materials, products and solutions.</li>
                  <li>• Losing time contacting providers who are not suited to the project.</li>
                </ul>
              </article>
              <article className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">Challenges for Companies and Service Providers</h3>
                <ul className="mt-5 space-y-3 text-gray-700">
                  <li>• Having real expertise without a clear digital presence.</li>
                  <li>• Fragmented information about services and service areas.</li>
                  <li>• Dependence on personal networks and temporary advertising.</li>
                  <li>• Difficulty reaching customers who genuinely need their specialisation.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">How We Turn the Problem into a Solution</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">A System That Organises Information and Brings People Closer</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["🏢", "Clear Digital Profiles", "Presenting each business, its services, products, projects and contact channels on an organised page."],
                ["📍", "Location-Based Discovery", "Connecting providers with the Emirate, city, area and services they cover."],
                ["🤝", "Direct Communication", "Allowing customers to call, use WhatsApp, submit an enquiry or request a quotation."],
                ["🤖", "Intelligent Assistance", "Using Weyaak to understand the request, reduce search time and surface better-matched options."]
              ].map(([icon, title, text]) => (
                <article key={title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-4 text-lg font-black text-gray-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-gradient-to-br from-blue-50 to-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">For Customers and Project Owners</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">A Clearer Route to a Suitable Service Provider</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Biet Al Reef helps you clarify your needs, search by activity, service and location, review services, products and previous projects, and then communicate directly or submit a quotation request. Customer search and enquiry submission are free of charge through Biet Al Reef.
              </p>
            </article>
            <article className="rounded-3xl bg-gradient-to-br from-green-50 to-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">For Companies and Service Providers</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">A Digital Presence That Reflects Real Expertise</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Biet Al Reef helps you present your business, services, products, service areas and projects clearly, building a lasting digital presence that customers, search engines and AI systems can understand and discover.
              </p>
            </article>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-7 text-white shadow-2xl md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-sm font-bold text-white/80">Artificial Intelligence for the Construction Sector</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">Weyaak Simplifies Complex Processes and Saves Time and Effort</h2>
                <p className="mt-5 leading-8 text-white/90">
                  The intelligent assistant <strong>Weyaak</strong> helps customers clarify project requirements, identify the service, location and missing information, and then search published provider data for options aligned with the request. It also helps service providers organise and present their information more clearly.
                </p>
                <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-7 text-white/90">
                  Our goal is not to replace engineers, contractors or skilled professionals, but to make access to the right human expertise faster and clearer.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="font-black">How Can Weyaak Help?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/90">
                  <li>✓ Understand the request and identify the required service.</li>
                  <li>✓ Reduce time spent searching and comparing.</li>
                  <li>✓ Connect the request with location and service areas.</li>
                  <li>✓ Prepare an organised enquiry or quotation request.</li>
                </ul>
                <Link href="/en/weyaak" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-primary">
                  Discover Weyaak
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border-t-4 border-primary bg-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">Our Vision</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">The Trusted Digital Home for the Construction Sector</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Our vision is for Biet Al Reef to become the trusted digital home for every project owner and every company, factory, supplier, workshop and professional working in construction and contracting, and the specialist digital reference for construction, finishing, maintenance and building materials in the UAE.
              </p>
              <p className="mt-4 font-bold leading-8 text-primary">
                Biet Al Reef is the discovery engine, while the service provider is the result we help the customer reach.
              </p>
            </article>
            <article className="rounded-3xl border-t-4 border-secondary bg-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">Our Mission</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">Organising the Market and Simplifying Access</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Our mission is to transform fragmented information into a clear digital system, make it easier for customers to reach suitable providers, build a digital presence for businesses, and use AI to reduce time and effort and support better-informed decisions.
              </p>
            </article>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">Our Values</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">Principles That Guide How We Build the Platform</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {values.map((value) => (
                <article key={value.title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <h3 className="flex items-center gap-3 text-xl font-black text-gray-900">
                    <span className="text-3xl">{value.icon}</span>
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-700">{value.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-7 text-center shadow-xl md:p-10">
            <p className="text-sm font-bold text-primary">Our Message to Partners and Customers</p>
            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">Building Trust Between Those Seeking a Service and Those Who Hold the Expertise</h2>
            <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-700">
              To project owners and customers, we work to provide a clearer way to understand the available options and reach suitable service providers. To companies, factories, suppliers, workshops and skilled professionals, we want Biet Al Reef to be the place where you present your expertise and work clearly. Our purpose is not to block communication between both sides, but to organise information and bring need and expertise closer together.
            </p>
          </section>

          <section className="space-y-6" id="faq">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">Clear Answers</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">Frequently Asked Questions About Biet Al Reef</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-gray-900">{item.question}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white shadow-2xl md:p-12">
            <p className="text-sm font-bold text-white/80">Start Here</p>
            <h2 className="mt-2 text-2xl font-black md:text-4xl">Your Project Deserves a Clearer Start, and Your Expertise Deserves to Reach the People Looking for It</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/90">
              From Al Ain to every Emirate, we are building a digital home that connects projects with expertise, customers with suitable service providers, and the market with clearer information.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/en/platform" className="rounded-2xl bg-white px-6 py-3 font-bold text-primary">
                Explore the Platform
              </Link>
              <Link href="/en/providers/register" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">
                Join Biet Al Reef
              </Link>
              <Link href="/en/weyaak" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">
                Talk to Weyaak
              </Link>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

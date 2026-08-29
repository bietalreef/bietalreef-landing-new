import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import EnglishGenericPage from '../../components/EnglishGenericPage';
import { ENGLISH_STATIC_PAGES, ENGLISH_SEO_SERVICE_PAGES } from '../../data/englishPages';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';

const RESERVED_ENGLISH_ROUTES = new Set([
  'weyaak',
  'uae',
  'services',
  'providers',
  'marketplace',
  'tools',
  'platform',
  'about',
  'why-biet-alreef',
  'how-it-works',
  'pricing',
  'partners',
  'suppliers',
  'factories',
  'contact',
  'faq',
  'support-policy',
  'blog',
  'legal',
  'privacy',
  'cookies',
]);

const BUSINESS_LANDING_PAGES = {
  'platform-for-business': {
    title: 'How Biet Al Reef Works for Business',
    description: 'A practical path for companies and service providers to organise their business profile, manage what they publish and use Biet Al Reef from the office or on site.',
    badge: 'Biet Al Reef for Business',
    intent: 'This page explains the company journey inside Biet Al Reef: create the account, complete business information and verification, activate the suitable plan, then manage the store, listings, services and business tools within one ecosystem.',
    points: ['A clear and organised business profile.', 'Products, services and offers managed according to plan permissions.', 'Access from a desktop browser and the Android app.'],
    steps: ['Create your company account', 'Complete business verification', 'Choose the suitable plan', 'Start managing your business'],
    ctaHref: '/en/join-biet-alreef',
    ctaLabel: 'Bring your company to Biet Al Reef',
    related: [{ href: '/en/join-provider', label: 'Join as a service provider' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['Is this the service provider directory?', 'No. The provider directory is for public discovery, while this page explains the company journey and business use of the platform.'], ['Can I use Biet Al Reef on desktop and mobile?', 'Biet Al Reef can be used from a desktop browser and the Android app is also available.']]
  },
  'join-provider': {
    title: 'Join Biet Al Reef as a Service Provider',
    description: 'Build a professional presence for your business, complete your company details, specialties and service areas, and move through verification before public publishing.',
    badge: 'Join as a Service Provider',
    intent: 'The joining path is different from the public provider directory. This route is for registration, verification, profile completion and activation of the tools and publishing permissions available under the account plan.',
    points: ['Structured company and activity information.', 'Specialties, services and service areas.', 'Publishing and permissions controlled by account status and plan.'],
    steps: ['Register the business', 'Complete the profile', 'Submit for review', 'Start using the platform'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Start joining',
    related: [{ href: '/en/providers', label: 'Service provider directory' }, { href: '/en/business-plans', label: 'Business plans' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }],
    faqs: [['Does registration mean immediate publishing?', 'No. Publishing and permissions depend on completed information, account status and the activated plan.'], ['Does this replace the public provider profile?', 'No. This is a business joining page, while the public provider profile presents the approved business to visitors.']]
  },
  'business-solutions': {
    title: 'Biet Al Reef Business Solutions',
    description: 'Digital business solutions covering company presence, stores, publishing, Google services and Weyaak AI through clear Biet Al Reef business paths.',
    badge: 'Business Solutions',
    intent: 'This route is separate from the public services directory. It explains the business capabilities companies can use within the Biet Al Reef ecosystem to improve their digital presence and operations.',
    points: ['An organised digital business presence.', 'Stores, products, services and offers according to the plan.', 'Separate Google Cloud, Google Workspace and Weyaak AI solutions.'],
    steps: ['Define your business need', 'Choose the relevant solution', 'Contact Biet Al Reef'],
    ctaHref: '/en/contact',
    ctaLabel: 'Contact customer service',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/en/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }],
    faqs: [['Does this page list marketplace services?', 'No. Marketplace services are for discovery. This page explains the business solutions offered through Biet Al Reef.'], ['Can a company use only one solution?', 'The scope depends on the company need, plan and requested service.']]
  },
  'start-your-store': {
    title: 'Start Your Store on Biet Al Reef',
    description: 'Activate your company account and organise your products, services, offers and store information within the Biet Al Reef ecosystem.',
    badge: 'Your Store on Biet Al Reef',
    intent: 'This page explains the store experience for business owners rather than the public marketplace itself. A store brings together the business identity, published items, contact information and applicable store policies.',
    points: ['Products, services and offers connected to the company account.', 'Store policies such as delivery, shipping, returns and warranty where applicable.', 'Publishing and usage governed by plan permissions.'],
    steps: ['Activate your account', 'Complete store details', 'Add permitted items', 'Manage your store'],
    ctaHref: '/en/join-biet-alreef',
    ctaLabel: 'Bring your company to Biet Al Reef',
    related: [{ href: '/en/marketplace', label: 'Biet Al Reef Marketplace' }, { href: '/en/business-plans', label: 'Business plans' }, { href: '/en/platform-for-business', label: 'How the platform works for business' }],
    faqs: [['Is this the Biet Al Reef marketplace?', 'No. The marketplace is for browsing and discovery, while this page explains how a company creates and manages its store.'], ['Is the number of items unlimited?', 'Item limits and publishing depend on the plan and permissions activated on the account.']]
  },
  'business-plans': {
    title: 'Business Plans & Subscriptions',
    description: 'Choose the plan that matches your company stage and how you use Biet Al Reef, with clear permissions and benefits before subscribing.',
    badge: 'Business Plans',
    intent: 'The current monthly plan is AED 500. Qualified annual subscriptions may include Google for Business benefits and a company domain under the published plan terms. The announced 30-day refund policy also applies according to its stated conditions.',
    points: ['Current monthly plan: AED 500.', 'Qualified annual benefits may include Google for Business and a company domain under plan terms.', 'A 30-day refund policy applies according to published conditions.'],
    steps: ['Review the benefits', 'Choose the subscription term', 'Activate your company account'],
    ctaHref: '/en/contact',
    ctaLabel: 'Contact customer service',
    related: [{ href: '/en/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/en/refund-policy', label: 'Refund policy' }, { href: '/en/join-biet-alreef', label: 'Join Biet Al Reef' }],
    faqs: [['Does the annual plan include Google for Business?', 'Qualified annual plans include Google for Business benefits and a company domain according to the specific plan terms.'], ['Can I request a refund?', 'A refund policy applies during the announced 30-day period according to the published terms and exclusions.']]
  },
  'partner-with-biet-alreef': {
    title: 'Partner with Biet Al Reef',
    description: 'Build a commercial or technology partnership with a UAE digital ecosystem connecting companies, service providers, suppliers, factories and workshops across construction, services and business solutions.',
    badge: 'Partnerships',
    intent: 'Biet Al Reef welcomes partnerships that create practical value for businesses and customers in the UAE. Opportunities may include technology, digital transformation, supply, business services, integrations, marketing and operational collaboration. Every partnership is reviewed around a clear scope, objectives and responsibilities rather than unsupported marketing promises.',
    points: ['Technology and digital partnerships linked to solutions, integrations and transformation.', 'Commercial partnerships with companies, suppliers, factories, workshops and service providers.', 'A clear collaboration path from opportunity definition to an agreed scope of work.'],
    steps: ['Introduce your company and opportunity', 'Define the value of the partnership', 'Review scope and objectives together', 'Start after agreement'],
    ctaHref: '/en/contact',
    ctaLabel: 'Discuss a partnership',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud | Biet Al Reef' }, { href: '/en/join-biet-alreef', label: 'Bring your company to Biet Al Reef' }, { href: '/en/suppliers-biet-alreef', label: 'Suppliers with Biet Al Reef' }],
    faqs: [['Who can propose a partnership?', 'Companies, technology providers, suppliers, factories, workshops and business-service organisations can contact Biet Al Reef when they have a clear opportunity that adds value to the ecosystem or its users.'], ['Does submitting a partnership request mean approval?', 'No. A request starts the review process only. Any collaboration depends on agreed scope, terms and responsibilities.'], ['Are partnerships limited to contracting?', 'Biet Al Reef focuses on construction, contracting, services, products and digital business solutions, and can review opportunities that directly support this ecosystem.']]
  },
  'join-biet-alreef': {
    title: 'Bring Your Company to Biet Al Reef',
    description: 'Turn your business information into an organised digital presence with a company profile, specialties, service areas, store and business tools according to account status and plan permissions.',
    badge: 'Join Biet Al Reef',
    intent: 'This is the commercial entry point for companies, service providers, suppliers, factories, workshops and professionals joining Biet Al Reef. The journey starts with account creation, business information and verification, followed by the permissions available to that account and plan. Public publishing is not automatic just because a company registers; it depends on completed information, verification status and permissions.',
    points: ['An organised business account connected to company identity, specialties and service areas.', 'Verification and review before public publishing to protect data quality.', 'Access to store, publishing and business tools according to the activated plan and permissions.'],
    steps: ['Create the company account', 'Complete identity, activity and specialties', 'Complete verification and review', 'Activate the tools available to your account'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Start company registration',
    related: [{ href: '/en/join-provider', label: 'Join as a service provider' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-plans', label: 'Business plans & subscriptions' }],
    faqs: [['Does registration mean immediate public visibility?', 'No. Visibility and publishing depend on completed business information, verification, account status and active permissions.'], ['Who can join?', 'The platform serves companies, service providers, suppliers, factories, workshops and professionals according to activity type and verification requirements.'], ['Can I use the platform before public publishing is complete?', 'Available tools vary by account status and plan, while public discovery areas remain available for browsing.']]
  },
  'google-cloud-biet-alreef': {
    title: 'Google Cloud with Biet Al Reef',
    description: 'Google Cloud solutions for UAE businesses covering applications, data, AI, Maps, automation, integrations and application modernisation according to each company’s needs.',
    badge: 'Google Cloud | Biet Al Reef',
    intent: 'Biet Al Reef is officially listed in Google Cloud Partner Finder. Its public Google profile identifies focus areas including Google Cloud, Google Workspace, Artificial Intelligence, Data & Analytics, Databases, Maps, application modernisation, e-commerce integrations and business process automation. Biet Al Reef delivers these capabilities through a defined technical scope after reviewing the customer’s current environment and goals, without claiming a tier or specialisation that is not shown on the official profile.',
    points: ['Cloud solutions, application modernisation and integrations aligned to real business needs.', 'Data, analytics, databases, AI and Google Maps among the digital solution areas.', 'Biet Al Reef is officially listed in Google Cloud Partner Finder with a UAE-focused public profile supporting Arabic and English.'],
    steps: ['Define the technical problem or goal', 'Review the current environment and data', 'Select the appropriate Google Cloud scope', 'Implement and connect the agreed solution'],
    ctaHref: '/en/contact',
    ctaLabel: 'Talk to Biet Al Reef',
    related: [{ href: '/en/google-workspace-biet-alreef', label: 'Google Workspace | Biet Al Reef' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }, { href: '/en/business-solutions', label: 'Biet Al Reef business solutions' }],
    faqs: [['Is Biet Al Reef listed in Google Cloud Partner Finder?', 'Yes. Biet Al Reef has a public Google Cloud Partner Finder profile describing the company, its platform and technical focus areas in the UAE.'], ['What is the difference between Google Cloud and Google Workspace?', 'Google Cloud focuses on cloud infrastructure, applications, data, AI and integrations, while Google Workspace focuses on company email, collaboration, files, meetings and user administration.'], ['Does Biet Al Reef currently show a Partner tier?', 'The current public Google Cloud Partner Finder profile does not show a tier, so Biet Al Reef does not claim a tier that is not publicly displayed.'], ['What kinds of Google Cloud projects can Biet Al Reef support?', 'Depending on the agreed scope, work may include applications, databases, analytics, Maps, AI, automation, integrations and application modernisation.']]
  },
  'google-workspace-biet-alreef': {
    title: 'Google Workspace with Biet Al Reef',
    description: 'Move from scattered personal accounts to company-domain email, files, meetings, calendars and centralised user administration through a professional Google Workspace setup.',
    badge: 'Google Workspace | Biet Al Reef',
    intent: 'Biet Al Reef helps companies assess their current setup and configure Google Workspace around actual business needs: connect the company domain, create professional email accounts, configure users and organise Gmail, Drive, Meet, Calendar and collaboration tools. Migration from existing accounts or files can be assessed and supported within the agreed scope. Any included or free benefit in a qualifying annual Biet Al Reef subscription is a Biet Al Reef commercial offer subject to plan terms, not a general free offer from Google.',
    points: ['Business email using your company domain instead of scattered personal accounts.', 'Gmail, Drive, Meet, Calendar and collaboration tools with centralised user administration according to plan.', 'Domain setup, account configuration and migration support within the agreed service scope.'],
    steps: ['Review the current domain and accounts', 'Define user and workflow needs', 'Set up Workspace, email and permissions', 'Migrate and begin centralised administration'],
    ctaHref: '/en/contact',
    ctaLabel: 'Get your business email',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud | Biet Al Reef' }, { href: '/en/business-plans', label: 'Annual plans' }, { href: '/en/business-solutions', label: 'Business solutions' }],
    faqs: [['Why use Google Workspace instead of a personal Gmail account for a company?', 'A personal account can suit individual use, while Google Workspace adds company-domain email, organisational administration and business controls depending on the selected plan.'], ['Can Biet Al Reef connect the domain and create business email accounts?', 'The service scope can include domain connection, email account creation, user setup and configuration of core tools according to the agreement.'], ['Can existing mail and files be migrated?', 'Migration or transition support can be assessed after reviewing the current accounts and data, and delivered within the agreed scope.'], ['Is free Google for Business or business email offered directly by Google?', 'Any included or free benefit is part of qualifying Biet Al Reef offers and their terms, not a general or direct free offer from Google.']]
  },
  'weyaak-ai': {
    title: 'Weyaak – AI from Biet Al Reef',
    description: 'An intelligent business assistant inside the Biet Al Reef ecosystem that works with account context to help organise content, listings, documents, information and business workflows.',
    badge: 'Weyaak | AI from Biet Al Reef',
    intent: 'Weyaak is not a standalone general chatbot. It is designed to work inside the company context: business identity, specialties, service areas, listings, documents, plan and available permissions. It can help organise information, prepare content and structure data related to products, services, offers and documents, while guiding the user through business workflows without exceeding account permissions or replacing human decision-making.',
    points: ['Understands the business and account context available inside Biet Al Reef.', 'Helps organise content, products, services, offers, documents and workflow guidance.', 'Capabilities depend on account status, plan, permissions and available data rather than unlimited generic promises.'],
    steps: ['Understand your account and business context', 'Identify the task or information needed', 'Assist within the relevant workflow', 'Review the result and continue the action'],
    ctaHref: '/en/contact',
    ctaLabel: 'Learn about Weyaak',
    related: [{ href: '/en/platform-for-business', label: 'Biet Al Reef for business' }, { href: '/en/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['What is Weyaak?', 'Weyaak is an intelligent business assistant from Biet Al Reef designed to help with tasks connected to company accounts, business data and platform workflows.'], ['Is Weyaak a general chatbot?', 'No. Its primary role is to operate within Biet Al Reef and the account context and permissions rather than as a separate general chat service.'], ['How can Weyaak help companies?', 'It can help organise information, prepare content and structure product, service, offer and document data, and guide users through available workflows according to permissions.'], ['Does Weyaak make final business decisions for the user?', 'No. It supports understanding, organisation and preparation, while final decisions and sensitive actions remain with the user and authorised account roles.']]
  },
  'suppliers-biet-alreef': {
    title: 'Suppliers with Biet Al Reef',
    description: 'Turn your supply business into an organised digital presence with a supplier profile, store, products, offers and service areas connected to your account and plan.',
    badge: 'Suppliers with Biet Al Reef',
    intent: 'This is a supplier business page, not the public supplier directory. After registration, business data completion and verification, suppliers can manage their information and the items allowed under their account, and present products, services and offers through marketplace and discovery paths according to plan permissions. The goal is organised digital presence and market connection without inventing unsupported sales or customer numbers.',
    points: ['An organised supplier profile showing activity, specialties and service areas.', 'Store, products, services and offers according to active quota and permissions.', 'Clearer connection between the supplier business, Biet Al Reef marketplace and project discovery paths.'],
    steps: ['Register the supplier business', 'Complete business identity and verification', 'Prepare the store and permitted items', 'Manage publishing and updates from the account'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Join as a supplier',
    related: [{ href: '/en/suppliers', label: 'Supplier directory' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['Is this the supplier directory?', 'No. The directory is for public discovery, while this page explains joining and business use of Biet Al Reef.'], ['Can suppliers create a store and add products?', 'That depends on account status, plan, permissions and active item quota, with items managed from the business account.'], ['Does Biet Al Reef guarantee a specific number of leads or sales?', 'No. Biet Al Reef organises digital presence, discovery and business tools, but does not guarantee unsupported commercial outcomes.']]
  },
  'factories-workshops-biet-alreef': {
    title: 'Factories & Workshops with Biet Al Reef',
    description: 'Present your factory or workshop capabilities professionally and organise services, products, offers and service areas inside the Biet Al Reef ecosystem.',
    badge: 'Factories & Workshops',
    intent: 'This page serves factories and workshops that want a professional digital presence connected to marketplace and project demand. The journey starts with registration, business information and verification, followed by specialties, services, products and offers allowed under the account plan and permissions. Capabilities, equipment, previous projects and professional information can be highlighted when they are documented and suitable for public publishing.',
    points: ['A clear profile presenting the factory or workshop, specialties, capabilities and service areas.', 'Products, services, offers and projects connected to the account according to plan and quota.', 'An organised presence that improves discovery across Biet Al Reef marketplace and project paths.'],
    steps: ['Register the factory or workshop', 'Define specialties, capabilities and service areas', 'Complete verification and supporting information', 'Manage the profile and permitted items'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Join as a factory or workshop',
    related: [{ href: '/en/factories', label: 'Factories directory' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-solutions', label: 'Business solutions' }],
    faqs: [['Can small workshops join Biet Al Reef?', 'Eligibility and publishing depend on activity type, completed business information, verification requirements and account permissions rather than business size alone.'], ['What information can a factory or workshop present?', 'Specialties, services, products, offers, service areas, capabilities, previous projects and professional information can be presented when available, documented and suitable for publishing.'], ['How is this different from the factories directory?', 'The directory is for discovering published businesses, while this page explains joining and using Biet Al Reef business tools.']]
  },
  'refund-policy': {
    title: 'Refund Policy',
    description: 'This page explains the framework for requesting a subscription refund during the announced period and the conditions and exclusions that apply to each plan.',
    badge: 'Policies',
    intent: 'The announced refund period is 30 days subject to plan terms and any services or external costs already activated or consumed. The final terms shown at subscription determine eligibility and the refundable amount.',
    points: ['Announced refund request period: 30 days, subject to terms.', 'Eligibility may be affected by services or costs already delivered.', 'Requests are reviewed by customer service against account status.'],
    steps: ['Contact support', 'Provide subscription details', 'Eligibility and charges are reviewed'],
    ctaHref: '/en/contact',
    ctaLabel: 'Contact support',
    related: [{ href: '/en/business-plans', label: 'Business plans' }, { href: '/en/legal', label: 'Terms & Conditions' }, { href: '/en/contact', label: 'Customer service' }],
    faqs: [['Is a refund guaranteed in every case?', 'Refund eligibility depends on the plan terms and the services or external costs already activated or delivered.'], ['How do I request a refund?', 'Submit a request to customer service with your account and subscription details so eligibility can be reviewed under the applicable terms.']]
  }
};

export default function EnglishStaticPage({ page, slug, service, isSeoService, isBusinessLanding }) {
  if (isBusinessLanding) {
    return (
      <EnglishGenericPage
        title={page.title}
        description={page.description}
        path={`/en/${slug}`}
        arabicPath={`/${slug}`}
        badge={page.badge}
        intent={page.intent}
        points={page.points}
        steps={page.steps}
        related={page.related}
        faqs={page.faqs}
        ctaHref={page.ctaHref}
        ctaLabel={page.ctaLabel}
      />
    );
  }

  const canonical = `https://bietalreef.ae/en/${slug}`;
  const arPath = isSeoService ? `/${slug}` : slug === 'legal' ? '/legal' : `/${slug}`;

  return (
    <>
      <Head>
        <title>{`${page.title} | Biet Al Reef`}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={`https://bietalreef.ae${arPath}`} />
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">{isSeoService ? 'Service SEO page' : page.title}</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{page.heading}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">{page.description}</p>

          {isSeoService && service ? (
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">Main category</h2>
                  <Link href={`/en/categories/${service.slug}`} className="text-[#B8922B] font-black">{service.nameEn}</Link>
                </div>
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-[#0F3F1A] mb-2">UAE coverage</h2>
                  <p className="text-sm text-gray-600 leading-7">This service page connects to UAE emirates, cities and local areas.</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-[#0F3F1A] mb-2">Public website role</h2>
                  <p className="text-sm text-gray-600 leading-7">Built for discovery, internal linking and search indexing.</p>
                </div>
              </section>
              <section className="mb-10">
                <h2 className="text-2xl font-black text-[#0F3F1A] mb-5">Browse this service by emirate</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {UAE_EMIRATES.map((emirate) => (
                    <Link key={emirate.slug} href={`/en/uae/${emirate.slug}/${emirate.areas[0].slug}/${service.slug}`} className="bg-white border border-[#E6DCC8] rounded-2xl p-4 shadow-sm hover:border-[#D4AF37] font-bold text-gray-700">
                      {service.nameEn} in {emirate.nameEn}
                    </Link>
                  ))}
                </div>
              </section>
            </>
          ) : slug === 'services' || slug === 'marketplace' || slug === 'tools' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
              {SERVICE_CATEGORIES.map((item) => (
                <Link key={item.slug} href={`/en/categories/${item.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h2 className="font-black text-[#0F3F1A] mb-2">{item.nameEn}</h2>
                  <p className="text-sm text-gray-600 leading-6">Available across UAE cities and local areas.</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {UAE_EMIRATES.slice(0, 6).map((emirate) => (
                <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <h2 className="font-black text-[#0F3F1A] mb-2">{emirate.nameEn}</h2>
                  <p className="text-sm text-gray-600 leading-6">Explore service pages and areas in {emirate.nameEn}.</p>
                </Link>
              ))}
            </div>
          )}

          <Link href="/en/uae" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">{page.cta}</Link>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const businessLanding = BUSINESS_LANDING_PAGES[params.slug];
  if (businessLanding) {
    return { props: { page: businessLanding, slug: params.slug, isBusinessLanding: true, isSeoService: false } };
  }

  const staticPage = ENGLISH_STATIC_PAGES[params.slug];
  if (staticPage) {
    return { props: { page: staticPage, slug: params.slug, isBusinessLanding: false, isSeoService: false }, revalidate: 3600 };
  }

  const seoPage = ENGLISH_SEO_SERVICE_PAGES[params.slug];
  if (seoPage) {
    const service = getServiceCategory(seoPage.categorySlug);
    return {
      props: {
        page: { ...seoPage, cta: 'Browse UAE areas' },
        slug: params.slug,
        service,
        isBusinessLanding: false,
        isSeoService: true
      },
      revalidate: 3600
    };
  }

  return { notFound: true };
}

export async function getStaticPaths() {
  return {
    paths: [
      ...Object.keys(BUSINESS_LANDING_PAGES).map((slug) => ({ params: { slug } })),
      ...Object.keys(ENGLISH_STATIC_PAGES)
        .filter((slug) => !RESERVED_ENGLISH_ROUTES.has(slug))
        .map((slug) => ({ params: { slug } })),
      ...Object.keys(ENGLISH_SEO_SERVICE_PAGES).map((slug) => ({ params: { slug } }))
    ],
    fallback: 'blocking'
  };
}

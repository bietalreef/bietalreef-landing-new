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
    description: 'From company account to digital presence, store, publishing and business tools: a clear operating path for UAE companies and service providers.',
    badge: 'Biet Al Reef for Business',
    intent: 'Biet Al Reef for Business is more than a company directory. The journey starts with account creation, company identity, activity, specialties and service areas, followed by verification and review before public publishing. Account status, plan and permissions then control access to the professional profile, store, products, services, offers, projects, documents and Weyaak. Businesses can work from a desktop browser and continue from the Android app while on site or on the move.',
    points: ['An organised business profile connecting company identity, activity, specialties, service areas and professional information.', 'Store, products, services, offers, projects and documents managed according to plan quotas and permissions.', 'Connected use across desktop browser and Android app, with Weyaak operating as a business assistant inside the account context.'],
    steps: ['Create your company account', 'Complete information and verification', 'Activate the appropriate plan and permissions', 'Manage your presence, store and business tools'],
    ctaHref: '/en/join-biet-alreef',
    ctaLabel: 'Bring your company to Biet Al Reef',
    related: [{ href: '/en/join-provider', label: 'Join as a service provider' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-plans', label: 'Business plans & subscriptions' }],
    faqs: [['What is Biet Al Reef for Business?', 'It is a digital business environment for organising a company profile, store, listings, documents and business tools under one account controlled by status, plan and permissions.'], ['Does registration mean immediate public publishing?', 'No. Public publishing depends on completed business information, verification, review and active permissions.'], ['Can I use Biet Al Reef on desktop and mobile?', 'Yes. The platform can be used from a desktop browser and the Android app can be used while travelling or working on site.'], ['What is Weyaak’s role inside the platform?', 'Weyaak is a business assistant that works with the account context and available permissions to help with content, listings, documents and workflow guidance.']]
  },
  'join-provider': {
    title: 'Join Biet Al Reef as a Service Provider',
    description: 'Turn your expertise and services into an organised business presence with a professional profile, store, listings and digital tools linked to account status and plan.',
    badge: 'Join as a Service Provider',
    intent: 'Joining as a service provider starts with registering the business and completing company information, primary activity, specialties, services, service areas, logo and the information required for verification. Public publishing is not automatic after registration; information is reviewed first, then tools, quotas and permissions are activated according to account status and plan. Once approved, the provider manages its presence and permitted items from the business account.',
    points: ['A professional business profile presenting company information, specialties, services and service areas in a structured way.', 'Verification and review before public publishing instead of publishing incomplete or unverified information.', 'Publishing quotas and access to store and listing tools are controlled by the active plan and account permissions.'],
    steps: ['Register your business', 'Complete the profile and required information', 'Submit for review and verification', 'Use the tools and permissions available to your account'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Start joining',
    related: [{ href: '/en/providers', label: 'Service provider directory' }, { href: '/en/business-plans', label: 'Business plans' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }],
    faqs: [['Does provider registration mean immediate visibility in the directory?', 'No. Public visibility depends on completed information, verification, review, account status and active permissions.'], ['What information is normally required?', 'Business and professional identity, specialties, services, service areas and verification information are required, with details varying by activity type.'], ['Can I manage products, services and offers?', 'That depends on the active plan, permissions and item quotas on the account.'], ['Does Biet Al Reef guarantee a specific number of customers or projects?', 'No. Biet Al Reef organises digital presence, discovery and business tools, but does not guarantee a fixed number of customers or deals.']]
  },
  'business-solutions': {
    title: 'Biet Al Reef Business Solutions',
    description: 'From digital presence and stores to Google Cloud, Google Workspace and Weyaak, Biet Al Reef provides practical business solutions for UAE companies.',
    badge: 'Biet Al Reef Business Solutions',
    intent: 'Biet Al Reef business solutions combine the company’s professional presence, store and published items, activity-management tools and separate digital service paths based on business need. These include Google Cloud for applications, data, AI, Maps and integrations, Google Workspace for company email, collaboration and user administration, and Weyaak as a business assistant inside the Biet Al Reef ecosystem. Each service is defined according to the company’s need, plan and agreed scope without unsupported commercial or technical promises.',
    points: ['An organised company presence with store, products, services, offers and projects according to plan and permissions.', 'Google Cloud and Google Workspace delivered as separate business solution scopes based on need and agreement.', 'Weyaak helps organise content, information, listings and documents within the company account context.'],
    steps: ['Define the company need', 'Choose the relevant solution path', 'Review scope, plan and permissions', 'Start the agreed implementation or activation'],
    ctaHref: '/en/contact',
    ctaLabel: 'Talk to Biet Al Reef',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud | Biet Al Reef' }, { href: '/en/google-workspace-biet-alreef', label: 'Google Workspace | Biet Al Reef' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }],
    faqs: [['What business solutions does Biet Al Reef provide?', 'They include digital business presence, store and publishing tools, plus Google Cloud, Google Workspace and Weyaak paths according to company needs and plan.'], ['Does a company have to use every solution together?', 'No. The relevant service or scope can be selected according to company need, plan and required permissions.'], ['Are Google solutions the same as Biet Al Reef platform tools?', 'No. Biet Al Reef platform tools operate inside the company account, while Google Cloud and Google Workspace are separate service scopes.'], ['Do these solutions guarantee sales or a specific search ranking?', 'No. Tools, services and digital presence are delivered according to scope without guaranteeing sales numbers or a specific search position.']]
  },
  'start-your-store': {
    title: 'Start Your Store on Biet Al Reef',
    description: 'Activate your company account and organise products, services, offers and store policies in a clear commercial profile inside Biet Al Reef Marketplace.',
    badge: 'Your Store on Biet Al Reef',
    intent: 'The Biet Al Reef store is the business-facing commercial profile inside the marketplace and is separate from the provider’s public landing page. After account activation and completion of business information, the merchant can manage products, services, offers and permitted items according to the plan and item quota. The store can also present contact information and relevant policies such as shipping, delivery, returns and warranty when they apply to the business.',
    points: ['A store connected to company identity and the products, services, offers and other items published from the business account.', 'Clear policies for shipping, delivery, returns, warranty and other relevant commercial terms where applicable.', 'Item counts, publishing and management are controlled by plan, quota and permissions rather than being unlimited.'],
    steps: ['Activate the company account', 'Complete store information and policies', 'Add items within the available quota', 'Manage store and publishing from the account'],
    ctaHref: '/en/join-biet-alreef',
    ctaLabel: 'Activate your company account',
    related: [{ href: '/en/marketplace', label: 'Biet Al Reef Marketplace' }, { href: '/en/business-plans', label: 'Business plans' }, { href: '/en/platform-for-business', label: 'How the platform works for business' }],
    faqs: [['Is the Biet Al Reef store the same as the public provider landing page?', 'No. The provider landing page presents the business for discovery, while the store is a commercial interface for published items and store policies.'], ['Can I add products, services and offers?', 'Yes when the account plan and permissions allow it, and subject to the active item quota.'], ['Are item counts unlimited?', 'No. The active quota and permissions determine how many items can be managed and published.'], ['Which policies should appear in the store?', 'Policies relevant to the business may include shipping, delivery, returns and warranty when applicable.']]
  },
  'business-plans': {
    title: 'Business Plans & Subscriptions',
    description: 'Choose a Biet Al Reef plan based on how your company uses the platform, with clear permissions, quotas and benefits before subscribing.',
    badge: 'Business Plans & Subscriptions',
    intent: 'Biet Al Reef plans are based on usage level, permissions, item quotas and services activated for the account. The currently approved commercial offer includes a monthly plan at AED 500. Qualifying annual subscriptions may include Google for Business benefits and a company domain subject to the plan terms. The announced 30-day refund policy applies according to its published conditions and exclusions. This page does not adopt unapproved AED 299 or AED 799 plan prices.',
    points: ['Current announced monthly plan: AED 500 under the approved offer.', 'Qualifying annual subscriptions may include Google for Business benefits and a company domain subject to plan terms.', 'The announced 30-day refund policy applies according to conditions and any services or external costs already activated.'],
    steps: ['Review your company needs', 'Compare benefits and permissions', 'Choose the appropriate subscription term', 'Activate the account with customer service'],
    ctaHref: '/en/contact',
    ctaLabel: 'Talk to customer service',
    related: [{ href: '/en/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/en/refund-policy', label: 'Refund policy' }, { href: '/en/join-biet-alreef', label: 'Join Biet Al Reef' }],
    faqs: [['What is the current monthly plan price?', 'The currently announced monthly offer is AED 500 under the approved plan terms and benefits.'], ['Are there benefits for annual subscriptions?', 'Qualifying annual subscriptions may include Google for Business benefits and a company domain subject to the plan terms presented at subscription.'], ['Can I request a refund?', 'The announced 30-day refund policy applies according to published conditions, exclusions and services already activated.'], ['Are AED 299 or AED 799 plans approved?', 'This page does not publish or adopt prices that have not been approved under the current Biet Al Reef plans.']]
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

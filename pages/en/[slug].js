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
    description: 'A route for commercial and technology partnerships that add practical value to Biet Al Reef, its companies, service providers and customers.',
    badge: 'Partnerships',
    intent: 'Biet Al Reef welcomes partnership opportunities connected to technology, services, supply, marketing, digital transformation and operational expansion in the UAE.',
    points: ['Technology and digital partnerships.', 'Supplier, service and commercial partnerships.', 'Clear scope, objectives and responsibilities.'],
    steps: ['Introduce your company', 'Define the partnership type', 'Review the scope together'],
    ctaHref: '/en/contact',
    ctaLabel: 'Discuss a partnership',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/en/join-biet-alreef', label: 'Join Biet Al Reef' }, { href: '/en/suppliers-biet-alreef', label: 'Suppliers' }],
    faqs: [['Who can propose a partnership?', 'Companies and organisations with a clear service, technology, supply or collaboration opportunity can contact Biet Al Reef.'], ['Does a partnership request mean automatic approval?', 'No. Each partnership is reviewed and its scope and terms must be agreed.']]
  },
  'join-biet-alreef': {
    title: 'Bring Your Company to Biet Al Reef',
    description: 'Start with your company account, complete business identity, activity, specialties and service areas, then use Biet Al Reef tools according to your status and plan.',
    badge: 'Join Biet Al Reef',
    intent: 'This is the commercial entry point for companies joining the Biet Al Reef ecosystem, including service providers, suppliers, factories, workshops and local businesses.',
    points: ['A business account connected to company information.', 'Verification and approval before public publishing.', 'Access to store and business tools according to plan permissions.'],
    steps: ['Create the account', 'Complete company information', 'Verify the business', 'Start using Biet Al Reef'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Start company registration',
    related: [{ href: '/en/join-provider', label: 'Service providers' }, { href: '/en/start-your-store', label: 'Your store' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['Is Biet Al Reef only for incorporated companies?', 'The platform serves companies, service providers, suppliers, factories, workshops and professionals according to activity type and verification requirements.'], ['Can visitors browse before registering?', 'Yes. Public discovery areas can be browsed, while business tools require an account with suitable permissions.']]
  },
  'google-cloud-biet-alreef': {
    title: 'Google Cloud with Biet Al Reef',
    description: 'Cloud solutions for business covering applications, data, AI, Maps and automation according to each company’s needs.',
    badge: 'Google Cloud | Biet Al Reef',
    intent: 'Biet Al Reef provides Google Cloud-related digital transformation services focused on applications, data, Maps, AI, automation and integrations. Biet Al Reef also has a public profile on Google Cloud Partner Finder.',
    points: ['Cloud applications and infrastructure based on business needs.', 'Data, AI, Maps and integrations.', 'A public Biet Al Reef profile on Google Cloud Partner Finder.'],
    steps: ['Define the technical need', 'Review the current environment', 'Design the agreed solution scope', 'Start implementation'],
    ctaHref: '/en/contact',
    ctaLabel: 'Talk to Biet Al Reef',
    related: [{ href: '/en/google-workspace-biet-alreef', label: 'Google Workspace' }, { href: '/en/weyaak-ai', label: 'Weyaak AI' }, { href: '/en/business-solutions', label: 'Business solutions' }],
    faqs: [['Is Google Cloud the same as Google Workspace?', 'No. Google Cloud focuses on cloud infrastructure, applications, data and AI, while Google Workspace focuses on work, collaboration and business email tools.'], ['Is Biet Al Reef listed on Google Cloud Partner Finder?', 'Yes. Biet Al Reef has a public profile on Google Cloud Partner Finder.']]
  },
  'google-workspace-biet-alreef': {
    title: 'Google Workspace with Biet Al Reef',
    description: 'Organise company email, files, meetings, calendars and user administration in a professional business environment rather than relying on scattered personal accounts.',
    badge: 'Google Workspace | Biet Al Reef',
    intent: 'Biet Al Reef helps companies assess their current setup, connect the domain, create professional company email, configure users and core Google Workspace tools, and support migration within the agreed scope.',
    points: ['Business email using your company domain.', 'Gmail, Drive, Meet, Calendar and collaboration tools.', 'Centralised user administration according to the selected plan.'],
    steps: ['Review domain and current accounts', 'Define user needs', 'Set up Workspace and email', 'Start managing the team'],
    ctaHref: '/en/contact',
    ctaLabel: 'Get your business email',
    related: [{ href: '/en/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/en/business-plans', label: 'Annual plans' }, { href: '/en/business-solutions', label: 'Business solutions' }],
    faqs: [['Do I have to stop using a personal Gmail account?', 'A personal account can serve individual use, while Google Workspace adds company-domain email, organisational administration and business controls depending on the selected plan.'], ['Is the free email offered directly by Google?', 'Any included or free benefit is part of qualifying Biet Al Reef offers and their terms, not a general promise from Google.']]
  },
  'weyaak-ai': {
    title: 'Weyaak – AI from Biet Al Reef',
    description: 'An intelligent business assistant inside the Biet Al Reef ecosystem that helps companies understand their information and organise work, content and account-related paths.',
    badge: 'Weyaak | AI from Biet Al Reef',
    intent: 'Weyaak is not a standalone general chatbot. Its role is to operate within the context of the company account, available business data, plan and permissions, helping with content, listings, documents and guidance across the work journey.',
    points: ['Understands the available company and activity context.', 'Helps with content, products, services, documents and guidance.', 'Capabilities depend on account status, plan and permissions.'],
    steps: ['Understand your account context', 'Identify the task', 'Assist within the business workflow'],
    ctaHref: '/en/contact',
    ctaLabel: 'Learn about Weyaak',
    related: [{ href: '/en/platform-for-business', label: 'Biet Al Reef for business' }, { href: '/en/google-cloud-biet-alreef', label: 'Google Cloud' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['What is Weyaak?', 'Weyaak is an intelligent business assistant within Biet Al Reef, designed to help with tasks connected to the company account and platform workflows.'], ['Is Weyaak a general chatbot?', 'No. Its intended role is to work within Biet Al Reef and the account context and permissions rather than as a separate general chat service.']]
  },
  'suppliers-biet-alreef': {
    title: 'Suppliers with Biet Al Reef',
    description: 'A business route for suppliers that want to present products and services and connect their activity with the marketplace, projects and customers in the UAE.',
    badge: 'Suppliers with Biet Al Reef',
    intent: 'This is a supplier business and joining page, not the public supplier directory. It explains how suppliers organise business information, items and service areas inside Biet Al Reef.',
    points: ['An organised supplier profile.', 'Products and offers according to the plan.', 'Clearer links to marketplace and project paths.'],
    steps: ['Register the supplier business', 'Complete the data', 'Activate the plan', 'Manage published items'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Join as a supplier',
    related: [{ href: '/en/suppliers', label: 'Supplier directory' }, { href: '/en/start-your-store', label: 'Start your store' }, { href: '/en/business-plans', label: 'Business plans' }],
    faqs: [['Is this the supplier directory?', 'No. The directory is for discovery, while this page explains supplier joining and business use of Biet Al Reef.'], ['Can suppliers add products?', 'This depends on the account plan, permissions and active item quota.']]
  },
  'factories-workshops-biet-alreef': {
    title: 'Factories & Workshops with Biet Al Reef',
    description: 'A business page for factories and workshops that want to present capabilities, products and services and connect them with project and marketplace demand in the UAE.',
    badge: 'Factories & Workshops',
    intent: 'This route explains how factories and workshops join Biet Al Reef, which business details are needed for a professional profile and how store items and services connect to the account plan.',
    points: ['A clear presentation of factory or workshop capabilities.', 'Organised products, services and offers.', 'Business activity connected to service areas and market demand.'],
    steps: ['Register the business', 'Define specialties and capabilities', 'Complete verification', 'Manage the profile and items'],
    ctaHref: '/en/providers/register',
    ctaLabel: 'Join as a factory or workshop',
    related: [{ href: '/en/factories', label: 'Factories directory' }, { href: '/en/start-your-store', label: 'Your store' }, { href: '/en/business-solutions', label: 'Business solutions' }],
    faqs: [['Can small workshops join?', 'Eligibility and publishing depend on the activity type and the verification requirements applied to the account.'], ['How is this different from the factories directory?', 'The directory is for public discovery, while this page focuses on joining and using Biet Al Reef business tools.']]
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

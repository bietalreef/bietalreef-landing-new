import Link from 'next/link';
import EnglishGenericPage from '../../components/EnglishGenericPage';

const tenderSteps = [
  ['01', 'Submit the request', 'The customer shares the project, service, product or material details and explains why the available quotation or option is not suitable.'],
  ['02', 'Review the scope', 'Biet Al Reef reviews specifications, location, quantities, images, timing and any missing information.'],
  ['03', 'Invite relevant parties', 'Suitable providers, suppliers, factories or workshops are selected according to specialty, service area and capability.'],
  ['04', 'Receive offers', 'Invited parties submit their quotations against the reviewed request scope.'],
  ['05', 'Compare the options', 'Offers are reviewed across price, specifications, quality, timing, location and ability to deliver.'],
  ['06', 'Present options to the customer', 'The suitable offers are organised and presented to the customer, who keeps the final decision before contracting.'],
];

export default function PlatformEnglishPage() {
  return (
    <EnglishGenericPage
      badge="A specialist digital construction platform"
      title="Biet Al Reef Platform"
      description="Biet Al Reef connects the UAE Directory, service providers, services, products, Weyaak, quotation requests and managed internal tenders within one organised journey."
      intent="Customers can begin by searching by location or service, contacting a provider or requesting a quotation. When no suitable price or solution is found, the customer may submit the request directly to Biet Al Reef. The platform reviews the scope, creates a managed internal tender and searches for a better-matched provider, service, product or material."
      path="/en/platform"
      arabicPath="/platform"
      ctaHref="/en/uae"
      ctaLabel="Start from the UAE Directory"
      secondaryHref="/en/how-it-works"
      secondaryLabel="See how it works"
      points={[
        'The direct path helps customers discover providers, services and products and request a quotation.',
        'Weyaak helps clarify the request, location, specifications and missing information before routing it.',
        'The managed internal tender path is used when the available quotation or solution is not suitable and a wider comparison is needed.',
      ]}
      steps={[
        'Search or request a quotation',
        'Review the available options',
        'Submit the request to Biet Al Reef',
        'Launch a managed internal tender when needed',
      ]}
      related={[
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/providers', label: 'Service Providers' },
        { href: '/en/services', label: 'Services & Offers' },
        { href: '/en/marketplace', label: 'Products & Stores' },
        { href: '/en/partners', label: 'Partners' },
      ]}
      faqs={[
        ['Does every customer request become a tender?', 'No. Customers normally begin by searching, contacting a provider or requesting a quotation. The internal tender is used only when the available price or solution is not suitable or the request requires a wider comparison.'],
        ['Is the tender public?', 'No. It is a managed internal tender sent to selected parties whose activity, location and capabilities match the request.'],
        ['Can a tender be for a service or product?', 'Yes. It may cover a project, construction or maintenance service, building material, product or supply requirement.'],
        ['Does Biet Al Reef guarantee the lowest price?', 'No. The platform looks for the best overall match across price, specifications, quality, timing, location and ability to deliver.'],
      ]}
    >
      <div className="rounded-[2.25rem] bg-[#0F3F1A] p-6 text-white shadow-2xl md:p-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black text-[#F3D46B]">Managed internal tender</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">How the tender journey works</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-8 text-white/80">The tender is not a public auction. Biet Al Reef reviews the request, invites relevant parties and organises the offers for the customer.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tenderSteps.map(([number, title, text]) => (
            <article key={number} className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <span className="text-sm font-black text-[#D4AF37]">{number}</span>
              <h3 className="mt-3 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/en/contact" className="inline-flex rounded-full bg-[#D4AF37] px-7 py-3.5 font-black text-[#0F3F1A]">Submit a request to Biet Al Reef</Link>
        </div>
      </div>
    </EnglishGenericPage>
  );
}

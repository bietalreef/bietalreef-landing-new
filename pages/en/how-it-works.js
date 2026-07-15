import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function HowItWorksEnglishPage() {
  return (
    <EnglishGenericPage
      badge="A clear path from need to offer"
      title="How Biet Al Reef Works"
      description="Define your need and location, then search, contact a provider or request a quotation. When no suitable offer is found, you may ask Biet Al Reef to create and manage an internal tender."
      intent="Biet Al Reef provides two connected paths. The direct path helps customers find a suitable provider, service or product and request a quotation. The managed internal tender path is used when the available price or solution is not suitable and a wider comparison is required. Weyaak helps organise the request, identify the service and location, and collect the information needed for the next step."
      path="/en/how-it-works"
      arabicPath="/how-it-works"
      ctaHref="/en/weyaak"
      ctaLabel="Start with Weyaak"
      points={[
        'Search by emirate, area or service, then contact a provider directly or submit a quotation request.',
        'Use Weyaak to clarify the requirement and organise the service, location, dimensions and missing information.',
        'When the quotation or solution is not suitable, Biet Al Reef can review the request and create a managed internal tender for a service, product or material.',
      ]}
      steps={[
        'Define the need and location',
        'Search or request a quotation',
        'Review the available options',
        'Request an internal tender when needed',
      ]}
      related={[
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/services', label: 'Services & Offers' },
        { href: '/en/marketplace', label: 'Products & Stores' },
        { href: '/en/how-it-works', label: 'How it works' },
      ]}
      faqs={[
        ['When should I request a quotation and when should I request a tender?', 'Start with a quotation when the service is clear and can be directed to a suitable provider. Request an internal tender when the price or solution is not suitable, or when the request needs a wider comparison.'],
        ['Who creates the internal tender?', 'The customer submits the request to Biet Al Reef. The platform reviews the details, defines the scope and invites suitable providers, suppliers, factories or workshops to submit offers.'],
        ['Is the tender public and open to everyone?', 'No. It is a managed internal tender sent to selected parties whose activity, location and capabilities match the request.'],
        ['How are the offers compared?', 'Offers are reviewed across price, specifications, service or material quality, location, timing and ability to deliver. The suitable options are then presented to the customer for the final decision.'],
      ]}
    />
  );
}

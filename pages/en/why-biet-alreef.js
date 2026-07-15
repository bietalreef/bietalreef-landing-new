import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function WhyBietAlReefEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Why we started"
      title="Why Biet Al Reef"
      description="Finding the right construction provider or product should not depend on random searches, incomplete information or one quotation without a proper comparison."
      intent="Biet Al Reef was created from practical contracting experience. Customers often struggle to identify the right provider, while many capable companies, suppliers, factories and workshops do not present their expertise clearly online. The platform organises location, activity, specialty, service, product and customer demand within one connected structure."
      path="/en/why-biet-alreef"
      arabicPath="/why-biet-alreef"
      ctaHref="/en/how-it-works"
      ctaLabel="See how it works"
      points={[
        'We organise the market by emirate, area, activity, specialty and service instead of relying on general or inaccurate lists.',
        'Customers can search directly, contact providers, request a quotation or use Weyaak to clarify the requirement.',
        'When no suitable price or solution is found, the customer may request a managed internal tender through Biet Al Reef.',
      ]}
      steps={[
        'A real market problem',
        'Structured data and services',
        'Wider and better-matched options',
      ]}
      related={[
        { href: '/en/about', label: 'About Biet Al Reef' },
        { href: '/en/how-it-works', label: 'How it works' },
        { href: '/en/how-it-works', label: 'See how it works' },
      ]}
      faqs={[
        ['What makes Biet Al Reef different from a normal business directory?', 'Biet Al Reef does more than list names and phone numbers. It organises providers by activity, specialty, service, product and service area, then connects that structure to customer requests and quotation paths.'],
        ['Why does Biet Al Reef offer an internal tender service?', 'It gives the customer an additional path when the available quotations or options are not suitable. Biet Al Reef reviews the request and searches for offers from relevant providers, suppliers, factories or workshops.'],
        ['Does Biet Al Reef guarantee the lowest price?', 'No. The goal is to find the best overall match across price, specifications, quality, location, timing and ability to deliver.'],
      ]}
    />
  );
}

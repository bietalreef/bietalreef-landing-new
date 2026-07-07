import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function PricingEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Pricing policy"
      title="Pricing"
      description="Biet Al Reef does not publish random or unapproved prices. The correct price depends on location, measurements, materials, scope of work and execution details."
      intent="This page explains why requesting a quotation is better than relying on a general number that does not fit every project."
      path="/en/pricing"
      arabicPath="/pricing"
      ctaHref="/en/contact"
      ctaLabel="Request a quotation"
      points={[
        'The price changes according to the city, service type and project details.',
        'We do not publish unconfirmed prices that could mislead the customer or provider.',
        'The best way to get a realistic number is to send the project details and request a quotation.',
      ]}
      steps={[
        'Send the project description',
        'Define the location and measurements',
        'Receive suitable guidance',
      ]}
      related={[
        { href: '/en/services', label: 'Services & Offers' },
        { href: '/en/marketplace', label: 'Products & Stores' },
        { href: '/en/faq', label: 'FAQ' },
      ]}
      faqs={[
        ['Why are there no fixed prices?', 'Because construction and maintenance work changes according to location, quantity, material quality, execution difficulty and working time.'],
        ['How can I get a price estimate?', 'Send the project details, available photos or measurements and the execution location so you can be guided to the most suitable path.'],
      ]}
    />
  );
}

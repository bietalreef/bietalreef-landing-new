import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function PricingEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Provider plans"
      title="Plans & Pricing"
      description="Choose a structured digital presence plan for your business, with clear monthly, annual and one-time setup terms."
      intent="Digital Presence is AED 300 monthly plus a one-time AED 750 setup fee, or AED 2,700 annually with setup included. Professional Presence is AED 500 monthly plus a one-time AED 1,500 setup fee, or AED 4,500 annually with setup included."
      path="/en/pricing"
      arabicPath="/pricing"
      ctaHref="/en/contact"
      ctaLabel="Request a quotation"
      points={[
        'Digital Presence: AED 300 monthly + AED 750 one-time setup, or AED 2,700 annually with setup included.',
        'Professional Presence: AED 500 monthly + AED 1,500 one-time setup, or AED 4,500 annually with setup included.',
        'Visibility depends on the selected plan, complete data, service relevance and location; no ranking or lead volume is guaranteed.',
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
        ['Is setup charged on annual plans?', 'No. Setup is included in the annual Digital Presence and Professional Presence plans.'],
        ['Does a paid plan guarantee first ranking or a fixed number of leads?', 'No. Discovery depends on plan level, data quality, relevance, location and platform matching.'],
      ]}
    />
  );
}

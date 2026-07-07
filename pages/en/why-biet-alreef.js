import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function WhyBietAlReefEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Platform identity"
      title="Why Biet Al Reef"
      description="Biet Al Reef builds an organized journey for project owners in the UAE, starting with the need, then the location and service, before reaching the right provider path."
      intent="This page explains why Biet Al Reef exists as a specialized platform for construction, maintenance and finishing, and why we rely on clarity and structured connection instead of random search."
      path="/en/why-biet-alreef"
      arabicPath="/why-biet-alreef"
      ctaHref="/en/uae"
      ctaLabel="Start from UAE Directory"
      points={[
        'We organize the customer journey from the first question to the quotation request in a clear flow.',
        'We connect construction and maintenance services with location and specialization to make information easier to reach.',
        'We build reviewable content and data so weak information does not appear as trusted guidance.',
      ]}
      steps={[
        'Understand your need',
        'Choose the emirate or service',
        'Ask Weyaak or send your request',
      ]}
      related={[
        { href: '/en/about', label: 'About Biet Al Reef' },
        { href: '/en/how-it-works', label: 'How it works' },
        { href: '/en/uae', label: 'UAE Directory' },
      ]}
      faqs={[
        ['What makes Biet Al Reef different?', 'Biet Al Reef connects location, service type and customer need in an organized way instead of relying on random search.'],
        ['Is Biet Al Reef a direct selling platform?', 'At this stage, Biet Al Reef is an informational and organizational platform that helps customers reach the right path and request a quotation based on project details.'],
      ]}
    />
  );
}

import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function AboutEnglishPage() {
  return (
    <EnglishGenericPage
      badge="About Biet Al Reef"
      title="About Biet Al Reef"
      description="Biet Al Reef is a UAE platform from Al Ain that organizes construction, maintenance, design, suppliers and service-provider paths across the Emirates."
      intent="This page presents the story of Biet Al Reef, its mission to simplify project requests, and its commitment to trust, clarity and organized digital service."
      path="/en/about"
      arabicPath="/about"
      ctaHref="/en/uae"
      ctaLabel="Start from UAE Directory"
      points={[
        'A clear digital path for construction and maintenance needs across the UAE.',
        'A simple way to organize requests before reaching the right provider path.',
        'A platform built around trust, clarity and useful service information.',
      ]}
      steps={[
        'Understand the platform',
        'Choose the service path',
        'Send a clear request',
      ]}
      related={[
        { href: '/en/why-biet-alreef', label: 'Why Biet Al Reef' },
        { href: '/en/how-it-works', label: 'How it works' },
        { href: '/en/contact', label: 'Contact us' },
      ]}
      faqs={[
        ['What is Biet Al Reef?', 'Biet Al Reef organizes construction, maintenance, design, supply and provider paths for customers and businesses in the UAE.'],
        ['Where did Biet Al Reef start?', 'Biet Al Reef started from Al Ain and is being built to serve customers and providers across all Emirates.'],
      ]}
    />
  );
}

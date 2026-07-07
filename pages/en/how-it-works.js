import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function HowItWorksEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Usage journey"
      title="How Biet Al Reef Works"
      description="Biet Al Reef works as a clear path: choose the location, define the service, then send your request or ask Weyaak to guide you to the right next step."
      intent="This page answers the user’s direct question: how do I start my project or search for a construction or maintenance service inside Biet Al Reef?"
      path="/en/how-it-works"
      arabicPath="/how-it-works"
      ctaHref="/en/weyaak"
      ctaLabel="Ask Weyaak now"
      points={[
        'Start from the UAE Directory when you want to search by location.',
        'Start from Services & Offers when you already know the service you need.',
        'Use Weyaak to clarify your need and turn it into an organized request.',
      ]}
      steps={[
        'Choose the emirate',
        'Choose the city or service',
        'Send the request details',
      ]}
      related={[
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/services', label: 'Services & Offers' },
        { href: '/en/contact', label: 'Contact us' },
      ]}
      faqs={[
        ['Should I start from the location or the service?', 'If you are searching in a specific city or emirate, start from the UAE Directory. If you already know the required service, start from Services & Offers.'],
        ['Can I use Weyaak instead of browsing?', 'Yes. Weyaak helps you describe your need and turn it into a clear path inside Biet Al Reef.'],
      ]}
    />
  );
}

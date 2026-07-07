import EnglishGenericPage from '../../../components/EnglishGenericPage';

export default function ProvidersEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Service providers section"
      title="Service Providers inside Biet Al Reef"
      description="This section is dedicated to contractors, companies, workshops, factories, suppliers and specialized offices. Search by emirate and city starts from the UAE Directory."
      intent="This page explains the independent provider path inside Biet Al Reef. The customer can browse providers by type and specialty, while geographic discovery remains separate inside the UAE Directory."
      path="/en/providers"
      arabicPath="/providers"
      ctaHref="/en/providers/register"
      ctaLabel="Register your company now"
      secondaryHref="https://wa.me/971567856001"
      secondaryLabel="Talk to onboarding"
      points={[
        'Available providers are presented as reviewed profiles inside Biet Al Reef.',
        'Specialties are browsed inside the providers path, not inside the UAE Directory or Services & Offers.',
        'Geographic coverage is separate: use the UAE Directory when the search starts from a city or emirate.',
      ]}
      steps={[
        'Create your profile',
        'Document your work',
        'Receive client requests',
      ]}
      related={[
        { href: '/en/providers/register', label: 'Register provider interest' },
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/services', label: 'Services & Offers' },
      ]}
      faqs={[
        ['Who is this section for?', 'It is for contractors, companies, workshops, factories, suppliers, craftsmen and specialized service offices.'],
        ['Is location search part of this page?', 'No. If the customer wants a provider by city or emirate, the correct path is the UAE Directory.'],
      ]}
    />
  );
}

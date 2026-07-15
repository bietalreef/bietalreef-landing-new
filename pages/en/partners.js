import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function PartnersEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Partner ecosystem"
      title="Become a Biet Al Reef Partner"
      description="Companies, suppliers, factories, workshops and skilled professionals can join an organised digital ecosystem that presents their expertise and connects them with relevant customers and opportunities."
      intent="Partnership begins with clear business information and a review before publication. Once the profile is approved, the business can appear in the relevant directory, service and product paths according to its specialty, offerings and service areas. It may also be invited to quotation requests or managed internal tenders that match its capabilities."
      path="/en/partners"
      arabicPath="/partners"
      ctaHref="/en/providers/register"
      ctaLabel="Join as a service provider"
      points={[
        'An organised digital profile for the business, services, products, projects and service areas.',
        'Relevant visibility across the UAE Directory, service pages and product paths after data approval.',
        'Opportunities to receive quotation requests or invitations to managed internal tenders that match the specialty and location.',
      ]}
      steps={[
        'Submit the business information',
        'Complete review and approval',
        'Begin appearing and receiving relevant opportunities',
      ]}
      related={[
        { href: '/en/providers/register', label: 'Provider registration' },
        { href: '/en/suppliers', label: 'Suppliers' },
        { href: '/en/factories', label: 'Factories & Workshops' },
        { href: '/en/how-it-works', label: 'See how it works' },
      ]}
      faqs={[
        ['Who can join as a partner?', 'Companies, contractors, suppliers, factories, workshops, skilled professionals and service providers connected to construction, maintenance, finishing, materials and products may apply.'],
        ['Does the business appear immediately after registration?', 'No. The information, identity and activity are reviewed before publication to protect platform quality and customer trust.'],
        ['How are tender invitations sent to partners?', 'Biet Al Reef selects relevant parties based on the request type, specialty, service area and delivery capability, then invites the qualified providers to submit their offers.'],
        ['Is every provider guaranteed a tender invitation?', 'No. Invitations depend on the match between the provider profile and the requirements of the specific internal tender.'],
      ]}
    />
  );
}

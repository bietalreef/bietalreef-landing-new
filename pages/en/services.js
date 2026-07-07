import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function ServicesEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Independent services and offers section"
      title="Services & Offers"
      description="Choose the service type first, then send your project details to receive suitable guidance or a quotation. This section is separate from the UAE Directory."
      intent="This page starts from the type of service, not the location. If the customer wants to search by city or emirate, the journey starts from the UAE Directory. If the customer already knows the required work, this section organizes the request by service type."
      path="/en/services"
      arabicPath="/services"
      ctaHref="/en/contact"
      ctaLabel="Request a quotation"
      points={[
        'Choose the type of work required: contracting, maintenance, carpentry, marble or another service.',
        'Add the location, measurements, photos and required materials to guide the request properly.',
        'Request a quotation based on project details instead of relying on a general price.',
      ]}
      steps={[
        'Define the service',
        'Add the details',
        'Request a quotation',
      ]}
      related={[
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/marketplace', label: 'Products & Stores' },
        { href: '/en/contact', label: 'Contact us' },
      ]}
      faqs={[
        ['Is this section different from the UAE Directory?', 'Yes. The UAE Directory starts from location. Services & Offers starts from the type of service required.'],
        ['Why is there no fixed service price?', 'Because the correct price depends on location, measurements, materials, photos and the actual scope of work.'],
      ]}
    />
  );
}

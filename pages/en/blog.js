import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function BlogEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Biet Al Reef Blog"
      title="Biet Al Reef Blog"
      description="Practical articles and guides about construction, contracting, design, maintenance, building materials and digital business solutions in the UAE."
      intent="The Biet Al Reef Blog is a practical knowledge path for project owners, companies and service providers in the UAE. It brings together guidance on construction, contracting, interior design, maintenance, materials and smart business decisions, while also explaining how digital presence, marketplaces, Google services and Weyaak fit into modern business operations. The purpose is to help readers understand the subject before they move to discovery, quotation, marketplace or business-solution paths."
      path="/en/blog"
      arabicPath="/blog"
      ctaHref="/en/uae"
      ctaLabel="Explore UAE Directory"
      points={[
        'Construction, contracting, maintenance, design and building-material guidance written for practical use in the UAE.',
        'Business and technology topics that help companies understand digital presence, marketplace operations and modern tools.',
        'A structured content path that helps readers move from learning to the relevant service, marketplace or business solution.',
      ]}
      steps={[
        'Choose the topic you need',
        'Read the relevant practical guide',
        'Move to the related service or business path',
      ]}
      related={[
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/marketplace', label: 'Biet Al Reef Marketplace' },
        { href: '/en/business-solutions', label: 'Business Solutions' },
      ]}
      faqs={[
        ['What does the Biet Al Reef Blog cover?', 'It covers construction, contracting, maintenance, interior design, building materials, platform guidance and digital business topics relevant to companies and project owners in the UAE.'],
        ['Who is the blog for?', 'It is intended for project owners, companies, service providers, suppliers, workshops and readers who want practical information before making a business or project decision.'],
        ['How should I use the blog?', 'Start with the topic you need, read the relevant guide, then continue to the UAE directory, marketplace, service or business-solution path when you are ready to act.'],
      ]}
    />
  );
}

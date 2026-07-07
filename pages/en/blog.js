import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function BlogEnglishPage() {
  return (
    <EnglishGenericPage
      badge="Biet Al Reef Blog"
      title="Biet Al Reef Blog"
      description="Articles, success cases and ideas about construction, design and smart contracting in the UAE. Browse guidance and platform insights in one organized content path."
      intent="This page presents the blog path for Biet Al Reef: articles, tips and practical guides about construction, contracting, interior design, maintenance and smart building decisions in the UAE."
      path="/en/blog"
      arabicPath="/blog"
      ctaHref="/en/uae"
      ctaLabel="Explore UAE Directory"
      points={[
        'Search and filter articles by topic to reach the right content faster.',
        'Read construction, maintenance and interior design guidance in a structured blog format.',
        'Use articles to understand the right path before requesting a service or quotation.',
      ]}
      steps={[
        'Search for articles',
        'Choose a category',
        'Open the right guide',
      ]}
      related={[
        { href: '/en/services', label: 'Services & Offers' },
        { href: '/en/uae', label: 'UAE Directory' },
        { href: '/en/contact', label: 'Contact us' },
      ]}
      faqs={[
        ['What does the blog cover?', 'It covers construction, maintenance, interior design, contracting tips, smart building ideas and platform updates.'],
        ['How do I use the blog?', 'Use the search and category path to find the right article, then move to the related service or contact path when needed.'],
      ]}
    />
  );
}

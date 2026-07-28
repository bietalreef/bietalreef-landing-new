import EnglishGenericPage from '../../../../components/EnglishGenericPage';

const description = 'Shipping and returns policy for Arkleen Carpentry and Interior Design products in the United Arab Emirates, covering delivery timing, ready-made products and custom-made products.';

export default function ArkleenShippingReturnsEnglishPage() {
  return (
    <EnglishGenericPage
      title="Arkleen product shipping and returns policy"
      description={description}
      path="/en/providers/arkleen/shipping-returns"
      arabicPath="/providers/arkleen/shipping-returns"
      badge="Arkleen Carpentry and Interior Design"
      intent="Arkleen delivers confirmed orders within 3 business days after the product is ready, with free delivery across all emirates of the UAE. A ready-made product may be returned within 10 days of receipt if it is unused, in its original condition and accompanied by proof of purchase. Products manufactured or modified to a customer’s specifications cannot be returned once production has started, except when there is a manufacturing defect or the product does not match the agreed specifications."
      points={[
        'Delivery takes 3 business days after product readiness is confirmed, and delivery is free across all emirates of the UAE.',
        'A ready-made product may be returned within 10 days of receipt if unused, in its original condition and accompanied by proof of purchase.',
        'A custom-made or modified product cannot be returned after production begins, except for a manufacturing defect or a failure to meet the agreed specifications.',
      ]}
      steps={[
        'Contact Arkleen within the return window',
        'Provide the order number, return reason and product-condition photos',
        'Wait for eligibility review and return instructions',
      ]}
      faqs={[
        ['How long does Arkleen delivery take?', 'The stated delivery time is 3 business days after the product is confirmed ready. Delivery across all emirates of the UAE is free.'],
        ['Can I return a ready-made product?', 'Yes. You may request a return within 10 days of receipt if the product is unused, in its original condition and accompanied by proof of purchase.'],
        ['Can I return a custom-made product?', 'A product manufactured or modified to your specifications cannot be returned after production starts, except for a manufacturing defect or a failure to meet the agreed specifications.'],
        ['How do I request a return?', 'Contact Arkleen and provide the order number, return reason and photos showing the product condition. Eligibility is reviewed before collection or return is confirmed.'],
      ]}
      related={[
        { href: '/en/providers/arkleen', label: 'Arkleen profile' },
        { href: '/en/products', label: 'Products' },
        { href: '/en/contact', label: 'Contact Biet Al Reef' },
      ]}
      ctaHref="/en/providers/arkleen"
      ctaLabel="Back to Arkleen"
    />
  );
}

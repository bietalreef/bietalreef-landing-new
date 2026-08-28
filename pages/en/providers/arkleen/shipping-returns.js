import EnglishGenericPage from '../../../../components/EnglishGenericPage';

const description = 'Shipping, returns and refunds policy for Arkleen Carpentry and Interior Design products in the United Arab Emirates, including a 14-day return window, ready-made products, custom-made products, return costs and refund processing.';

export default function ArkleenShippingReturnsEnglishPage() {
  return (
    <EnglishGenericPage
      title="Arkleen shipping, returns and refunds policy"
      description={description}
      path="/en/providers/arkleen/shipping-returns"
      arabicPath="/providers/arkleen/shipping-returns"
      badge="Arkleen Carpentry and Interior Design"
      intent="Arkleen delivers confirmed orders within 3 business days after the product is ready, with free delivery across all emirates of the UAE. An eligible ready-made product may be returned within 14 days of delivery if it is unused, in its original condition and original packaging, and accompanied by proof of purchase. Products manufactured or modified to a customer’s specifications cannot be returned once production has started for change of mind, except when there is a manufacturing defect or the product does not match the agreed specifications. Restocking fee is 0%. Arkleen covers return shipping for defects, errors or non-conformity, while the customer covers return shipping for an eligible non-defective ready-made product returned for change of mind. Approved refunds are issued to the original payment method within 5–10 business days."
      points={[
        'Delivery takes 3 business days after product readiness is confirmed, and delivery is free across all emirates of the UAE.',
        'An eligible ready-made product may be returned within 14 days of delivery if unused, in its original condition and original packaging, with proof of purchase.',
        'A custom-made or modified product cannot be returned after production begins for change of mind, except for a manufacturing defect or a failure to meet the agreed specifications.',
        'Restocking fee is 0%. Arkleen pays return shipping for defects, errors or non-conformity; the customer pays return shipping for an eligible change-of-mind return.',
        'Approved refunds are issued to the original payment method within 5–10 business days after final return approval.',
      ]}
      steps={[
        'Contact Arkleen within the 14-day return window',
        'Provide the order number, return reason and product-condition photos',
        'Wait for eligibility review and confirmation of the return or collection method',
        'After inspection and approval, the refund is processed to the original payment method',
      ]}
      faqs={[
        ['How long does Arkleen delivery take?', 'The stated delivery time is 3 business days after the product is confirmed ready. Delivery across all emirates of the UAE is free.'],
        ['Can I return a ready-made product?', 'Yes. You may request a return within 14 days of delivery if the product is unused, in its original condition and original packaging, and accompanied by proof of purchase.'],
        ['Can I return a custom-made product?', 'A product manufactured or modified to your specifications cannot be returned after production starts for change of mind, except for a manufacturing defect or failure to meet the agreed specifications.'],
        ['Who pays return shipping?', 'Arkleen covers return shipping for a manufacturing defect, store error or non-conformity. The customer covers return shipping for an eligible non-defective ready-made product returned due to change of mind.'],
        ['Is there a restocking fee?', 'No. The restocking fee is 0%.'],
        ['How is the refund issued?', 'After the product is received, inspected and approved, the eligible refund is issued to the original payment method within 5–10 business days.'],
        ['How do I request a return?', 'Contact Arkleen and provide the order number, return reason and photos showing the product condition. Eligibility is reviewed before the return or collection method is confirmed.'],
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

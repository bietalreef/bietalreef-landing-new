export async function getServerSideProps({ params }) {
  const slug = params?.slug;
  const aliases = {
    construction: 'general-contracting',
    maintenance: 'general-maintenance',
    cleaning: 'cleaning-services',
    'interior-design': 'interior-design',
    'equipment-rental': 'equipment-rental',
    'building-materials': 'building-materials',
    'furniture-decoration': 'furniture-decor',
    'engineering-consultation': 'engineering-consultants',
  };

  const destinationSlug = aliases[slug] || slug;

  return {
    redirect: {
      destination: `/categories/${destinationSlug}`,
      permanent: true,
    },
  };
}

export default function LegacyServiceRedirect() {
  return null;
}

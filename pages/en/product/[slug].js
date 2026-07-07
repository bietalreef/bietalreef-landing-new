export default function EnglishProductRedirect() {
  return null;
}

export async function getServerSideProps({ params }) {
  const slug = params?.slug || '';

  const knownProviderProductSlugs = new Set([
    'travertine-marble-al-hoot',
    'al-hoot-marble-granite-factory',
  ]);

  return {
    redirect: {
      destination: knownProviderProductSlugs.has(slug) ? '/en/providers/al-hoot-marble-granite-factory' : '/en/marketplace',
      permanent: true,
    },
  };
}

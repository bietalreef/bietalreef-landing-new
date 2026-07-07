export default function EnglishProviderRedirect() {
  return null;
}

export async function getServerSideProps({ params }) {
  const slug = params?.slug || '';

  return {
    redirect: {
      destination: `/en/providers/${slug}`,
      permanent: true,
    },
  };
}

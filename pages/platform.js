export default function LegacyPlatformRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/how-it-works',
      permanent: true,
    },
  };
}

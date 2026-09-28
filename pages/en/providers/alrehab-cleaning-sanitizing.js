export async function getServerSideProps() {
  return { redirect: { destination: '/en/providers/alrehab-home-clean', permanent: true } };
}

export default function LegacyAlRehabEnglishRoute() { return null; }

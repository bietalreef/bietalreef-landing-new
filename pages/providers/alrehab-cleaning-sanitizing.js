export async function getServerSideProps() {
  return { redirect: { destination: '/providers/alrehab-home-clean', permanent: true } };
}

export default function LegacyAlRehabRoute() { return null; }

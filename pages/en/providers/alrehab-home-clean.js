import GenericProviderProfile from '../../../components/GenericProviderProfile';
import { getPublicProviderProfile } from '../../../lib/publicProviderProfiles';

export default function AlRehabProviderPage({ provider }) {
  return <GenericProviderProfile provider={provider} locale="en" />;
}

export async function getServerSideProps({ res }) {
  const provider = await getPublicProviderProfile('alrehab-home-clean');
  if (!provider) return { notFound: true };
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');
  return { props: { provider } };
}

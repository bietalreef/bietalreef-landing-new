import { PROVIDERS_APP_URL } from '../lib/platformUrls';

export default function RetiredLoginPage() {
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, max-age=300');
  return { redirect: { destination: PROVIDERS_APP_URL, permanent: true } };
}

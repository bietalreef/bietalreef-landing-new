export default function TermsRedirect() {
  return null;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/en/legal',
      permanent: true,
    },
  };
}

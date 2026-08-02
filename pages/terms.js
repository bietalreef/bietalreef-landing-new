export default function TermsRedirect() {
  return null;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/legal',
      permanent: true,
    },
  };
}

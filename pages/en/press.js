export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/en/media',
      permanent: false
    }
  };
}

export default function EnglishPressRedirect() {
  return null;
}

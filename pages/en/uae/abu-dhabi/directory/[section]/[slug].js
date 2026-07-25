import AbuDhabiDirectoryLanding from '../../../../../../components/AbuDhabiDirectoryLanding';
import { getEmirate } from '../../../../../../data/siteTaxonomy';
import {
  findAbuDhabiDirectoryCard,
  getEnglishAbuDhabiDirectoryCards,
} from '../../../../../../lib/platformDirectoryCards';

export default AbuDhabiDirectoryLanding;

export async function getStaticProps({ params }) {
  const cards = await getEnglishAbuDhabiDirectoryCards();
  const card = findAbuDhabiDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };
  return {
    props: {
      card,
      locale: 'en',
      area: null,
      emirate: getEmirate('abu-dhabi'),
      path: `/en/uae/abu-dhabi/directory/${params.section}/${params.slug}`,
      alternatePath: `/uae/abu-dhabi/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

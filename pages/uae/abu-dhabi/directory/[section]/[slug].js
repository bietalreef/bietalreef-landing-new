import AbuDhabiDirectoryLanding from '../../../../../components/AbuDhabiDirectoryLanding';
import { getEmirate } from '../../../../../data/siteTaxonomy';
import {
  findAbuDhabiDirectoryCard,
  getAbuDhabiDirectoryEntities,
  getArabicAbuDhabiDirectoryCards,
} from '../../../../../lib/platformDirectoryCards';

export default AbuDhabiDirectoryLanding;

export async function getStaticProps({ params }) {
  const cards = await getArabicAbuDhabiDirectoryCards();
  const card = findAbuDhabiDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };
  const entities = await getAbuDhabiDirectoryEntities(card, 'ar');
  return {
    props: {
      card,
      entities,
      directoryCards: cards,
      locale: 'ar',
      area: null,
      emirate: getEmirate('abu-dhabi'),
      path: `/uae/abu-dhabi/directory/${params.section}/${params.slug}`,
      alternatePath: `/en/uae/abu-dhabi/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

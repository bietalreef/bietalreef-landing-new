import AbuDhabiDirectoryLanding from '../../../../../../../components/AbuDhabiDirectoryLanding';
import { getArea, getEmirate } from '../../../../../../../data/siteTaxonomy';
import {
  findAbuDhabiDirectoryCard,
  getAbuDhabiDirectoryEntities,
  getEnglishAbuDhabiDirectoryCards,
} from '../../../../../../../lib/platformDirectoryCards';

export default AbuDhabiDirectoryLanding;

export async function getStaticProps({ params }) {
  const area = getArea('abu-dhabi', params.area);
  if (!area) return { notFound: true };
  const cards = await getEnglishAbuDhabiDirectoryCards();
  const card = findAbuDhabiDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };
  const entities = await getAbuDhabiDirectoryEntities(card, 'en', params.area);
  return {
    props: {
      card,
      entities,
      locale: 'en',
      area,
      emirate: getEmirate('abu-dhabi'),
      path: `/en/uae/abu-dhabi/${params.area}/directory/${params.section}/${params.slug}`,
      alternatePath: `/uae/abu-dhabi/${params.area}/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

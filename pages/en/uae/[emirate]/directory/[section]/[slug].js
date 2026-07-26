import EmirateDirectoryLanding from '../../../../../../components/AbuDhabiDirectoryLanding';
import { getEmirate } from '../../../../../../data/siteTaxonomy';
import {
  findUaeDirectoryCard,
  getEnglishUaeDirectoryCards,
  getUaeDirectoryEntities,
} from '../../../../../../lib/platformDirectoryCards';

export default EmirateDirectoryLanding;

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };

  const cards = await getEnglishUaeDirectoryCards();
  const card = findUaeDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };

  const entities = await getUaeDirectoryEntities(card, 'en', emirate.slug);
  return {
    props: {
      card,
      entities,
      directoryCards: cards,
      locale: 'en',
      area: null,
      emirate,
      path: `/en/uae/${emirate.slug}/directory/${params.section}/${params.slug}`,
      alternatePath: `/uae/${emirate.slug}/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

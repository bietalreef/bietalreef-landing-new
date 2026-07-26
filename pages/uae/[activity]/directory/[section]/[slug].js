import EmirateDirectoryLanding from '../../../../../components/AbuDhabiDirectoryLanding';
import { getEmirate } from '../../../../../data/siteTaxonomy';
import {
  findUaeDirectoryCard,
  getArabicUaeDirectoryCards,
  getUaeDirectoryEntities,
} from '../../../../../lib/platformDirectoryCards';

export default EmirateDirectoryLanding;

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.activity);
  if (!emirate) return { notFound: true };

  const cards = await getArabicUaeDirectoryCards();
  const card = findUaeDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };

  const entities = await getUaeDirectoryEntities(card, 'ar', emirate.slug);
  return {
    props: {
      card,
      entities,
      directoryCards: cards,
      locale: 'ar',
      area: null,
      emirate,
      path: `/uae/${emirate.slug}/directory/${params.section}/${params.slug}`,
      alternatePath: `/en/uae/${emirate.slug}/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

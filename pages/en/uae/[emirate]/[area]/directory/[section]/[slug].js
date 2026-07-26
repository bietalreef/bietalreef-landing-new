import EmirateDirectoryLanding from '../../../../../../../components/AbuDhabiDirectoryLanding';
import { getArea, getEmirate } from '../../../../../../../data/siteTaxonomy';
import {
  findUaeDirectoryCard,
  getEnglishUaeDirectoryCards,
  getUaeDirectoryEntities,
} from '../../../../../../../lib/platformDirectoryCards';

export default EmirateDirectoryLanding;

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  if (!emirate || !area) return { notFound: true };

  const cards = await getEnglishUaeDirectoryCards();
  const card = findUaeDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };

  const entities = await getUaeDirectoryEntities(
    card,
    'en',
    emirate.slug,
    area.slug
  );
  return {
    props: {
      card,
      entities,
      directoryCards: cards,
      locale: 'en',
      area,
      emirate,
      path: `/en/uae/${emirate.slug}/${area.slug}/directory/${params.section}/${params.slug}`,
      alternatePath: `/uae/${emirate.slug}/${area.slug}/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

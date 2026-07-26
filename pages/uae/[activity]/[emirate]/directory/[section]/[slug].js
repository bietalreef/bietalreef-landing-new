import EmirateDirectoryLanding from '../../../../../../components/AbuDhabiDirectoryLanding';
import { getArea, getEmirate } from '../../../../../../data/siteTaxonomy';
import {
  findUaeDirectoryCard,
  getArabicUaeDirectoryCards,
  getUaeDirectoryEntities,
} from '../../../../../../lib/platformDirectoryCards';

export default EmirateDirectoryLanding;

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.activity);
  const area = getArea(params.activity, params.emirate);
  if (!emirate || !area) return { notFound: true };

  const cards = await getArabicUaeDirectoryCards();
  const card = findUaeDirectoryCard(cards, params.section, params.slug);
  if (!card) return { notFound: true };

  const entities = await getUaeDirectoryEntities(
    card,
    'ar',
    emirate.slug,
    area.slug
  );
  return {
    props: {
      card,
      entities,
      directoryCards: cards,
      locale: 'ar',
      area,
      emirate,
      path: `/uae/${emirate.slug}/${area.slug}/directory/${params.section}/${params.slug}`,
      alternatePath: `/en/uae/${emirate.slug}/${area.slug}/directory/${params.section}/${params.slug}`,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

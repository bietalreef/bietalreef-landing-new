import { CATEGORY } from '../data/localServices';
import { pageModel, getLocalArea } from './localServices';
import { getLocalProviders } from './localProviderData';
export async function localProps(locale, segments = []) {
  if (!Array.isArray(segments) || segments.length > 3) return { notFound: true };
  let area, category, service;
  if (segments[0] === CATEGORY.slug && segments.length === 1) category = segments[0];
  else if (segments.length) {
    if (!getLocalArea(segments[0]) || segments[1] && segments[1] !== CATEGORY.slug) return { notFound: true };
    [area, category, service] = segments;
  }
  const model = pageModel({ locale, area, category, service, providers: await getLocalProviders() });
  return model ? { props: { model }, revalidate: 3600 } : { notFound: true };
}

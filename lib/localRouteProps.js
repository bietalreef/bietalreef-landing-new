import { CATEGORY, SERVICE_INTENTS } from '../data/localServices';
import { pageModel, getLocalArea } from './localServices';
import { getLocalProviders } from './localProviderData';
export async function localProps(locale, segments = []) {
  if (!Array.isArray(segments) || segments.length > 3) return { notFound: true };
  let area, category, service;
  if (segments[0] === CATEGORY.slug && segments.length <= 2) { [category, service] = segments; }
  else if (segments.length) {
    if (!getLocalArea(segments[0]) || segments[1] && segments[1] !== CATEGORY.slug) return { notFound: true };
    [area, category, service] = segments;
  }
  const alias = SERVICE_INTENTS.find(item => item.sourceSlugs.includes(service));
  if (alias && !area) {
    const model = pageModel({ locale, category, service: alias.slug, providers: await getLocalProviders() });
    return model ? { redirect: { destination: model.canonical.replace('https://bietalreef.ae', ''), permanent: true } } : { notFound: true };
  }
  const model = pageModel({ locale, area, category, service, providers: await getLocalProviders() });
  return model ? { props: { model }, revalidate: 3600 } : { notFound: true };
}

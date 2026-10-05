export { default } from '../../../../../../components/LocalServicesPage';
import { localProps } from '../../../../../../lib/localRouteProps';
export function getStaticProps({ params }) { return localProps('en', [params.district, params.category, ...(params.service ? [params.service] : [])]); }
export function getStaticPaths() { return { paths: [], fallback: 'blocking' }; }

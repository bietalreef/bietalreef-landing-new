import SEOHead from '../../../components/SEOHead';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import ProviderSpecialtyView from '../../../components/ProviderSpecialtyView';
import SectionBackBar from '../../../components/SectionBackBar';
import { SERVICE_CATEGORIES, getServiceCategory } from '../../../data/siteTaxonomy';
import { getProvidersByCategory } from '../../../data/providers';

export default function ProviderSpecialtyPage({ service, matchedProviders }) {
  const title = `مزودو ${service.nameAr}`;
  const description = `تصفح مزودي ${service.nameAr} المعتمدين، ومواقعهم وخدماتهم ووسائل التواصل المباشر داخل بيت الريف.`;
  return <>
    <SEOHead title={`${title} | بيت الريف`} description={description} canonicalPath={`/providers/specialty/${service.slug}`} alternatePath={`/en/providers/specialty/${service.slug}`} ogImage={`https://bietalreef.ae${service.image || '/images/providers-hero.webp'}`} breadcrumbs={[{ name: 'مزودو الخدمات', href: '/providers' }, { name: service.nameAr, href: `/providers/specialty/${service.slug}` }]} />
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]"><Navbar pageTitle="مزودو الخدمات" /><SectionBackBar href="/providers" label="العودة إلى مزودي الخدمات" /><ProviderSpecialtyView service={service} providers={matchedProviders} locale="ar" /><ProvidersSmartFooter locale="ar" /><Footer showRequestCTA={false} /></div>
  </>;
}
export async function getStaticProps({ params }) { const service = getServiceCategory(params.slug); if (!service) return { notFound: true }; return { props: { service, matchedProviders: getProvidersByCategory(params.slug) }, revalidate: 3600 }; }
export async function getStaticPaths() { return { paths: SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })), fallback: 'blocking' }; }

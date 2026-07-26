import SEOHead from '../../../components/SEOHead';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import ProviderSpecialtyView from '../../../components/ProviderSpecialtyView';
import SectionBackBar from '../../../components/SectionBackBar';
import { SERVICE_CATEGORIES, getServiceCategory } from '../../../data/siteTaxonomy';
import { getProvidersByCategory } from '../../../data/providers';
import { getUaeFooterCards } from '../../../lib/platformDirectoryCards';

const providerSpecialties = [
  ...SERVICE_CATEGORIES,
  {
    slug: 'workshops',
    nameAr: 'المصانع والورش والمتاجر',
    nameEn: 'Factories, Workshops & Stores',
    descAr: 'مصانع وورش ومتاجر وشركات توريد تخدم مشاريع البناء والتشطيب والتصنيع حسب الطلب.',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
  },
];

export default function ProviderSpecialtyPage({ service, matchedProviders, directoryCards = [] }) {
  const title = `مزودو ${service.nameAr}`;
  const description = `تصفح مزودي ${service.nameAr} المعتمدين، ومواقعهم وخدماتهم ووسائل التواصل المباشر داخل بيت الريف.`;
  return <>
    <SEOHead title={`${title} | بيت الريف`} description={description} canonicalPath={`/providers/specialty/${service.slug}`} alternatePath={`/en/providers/specialty/${service.slug}`} ogImage={`https://bietalreef.ae${service.image || '/images/providers-hero.webp'}`} breadcrumbs={[{ name: 'مزودو الخدمات', href: '/providers' }, { name: service.nameAr, href: `/providers/specialty/${service.slug}` }]} />
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]"><Navbar pageTitle="مزودو الخدمات" /><SectionBackBar href="/providers" label="العودة إلى مزودي الخدمات" /><ProviderSpecialtyView service={service} providers={matchedProviders} locale="ar" /><ProvidersSmartFooter locale="ar" directoryCards={directoryCards} /><Footer showRequestCTA={false} /></div>
  </>;
}
export async function getStaticProps({ params }) { const service = providerSpecialties.find((item) => item.slug === params.slug) || getServiceCategory(params.slug); if (!service) return { notFound: true }; const directoryCards = await getUaeFooterCards('ar'); return { props: { service, matchedProviders: getProvidersByCategory(params.slug), directoryCards }, revalidate: 3600 }; }
export async function getStaticPaths() { return { paths: providerSpecialties.map((service) => ({ params: { slug: service.slug } })), fallback: 'blocking' }; }

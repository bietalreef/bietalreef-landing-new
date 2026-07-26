import Head from 'next/head';
import EnglishLayout from '../../../../components/EnglishLayout';
import ProvidersSmartFooter from '../../../../components/ProvidersSmartFooter';
import ProviderSpecialtyView from '../../../../components/ProviderSpecialtyView';
import SectionBackBar from '../../../../components/SectionBackBar';
import { SERVICE_CATEGORIES, getServiceCategory } from '../../../../data/siteTaxonomy';
import { getProvidersByCategory } from '../../../../data/providers';
import { getUaeFooterCards } from '../../../../lib/platformDirectoryCards';

const providerSpecialties = [
  ...SERVICE_CATEGORIES,
  {
    slug: 'workshops',
    nameAr: 'المصانع والورش والمتاجر',
    nameEn: 'Factories, Workshops & Stores',
    descAr: 'مصانع وورش ومتاجر وشركات توريد تخدم مشاريع البناء والتشطيب والتصنيع حسب الطلب.',
    descEn: 'Factories, workshops, stores and supply companies serving construction, finishing and custom fabrication projects.',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
  },
];

export default function EnglishProviderSpecialtyPage({ specialty, matchingProviders, directoryCards = [] }) {
  const name = specialty.nameEn || specialty.nameAr;
  const title = `${name} Providers | Biet Al Reef`;
  const description = `Browse approved ${name} providers, locations, services and direct contact paths inside Biet Al Reef.`;
  const canonical = `https://bietalreef.ae/en/providers/specialty/${specialty.slug}`;
  const image = `https://bietalreef.ae${specialty.image || '/images/providers-hero.webp'}`;
  return <><Head><title>{title}</title><meta name="description" content={description} /><meta name="robots" content="index, follow" /><link rel="canonical" href={canonical} /><link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/providers/specialty/${specialty.slug}`} /><link rel="alternate" hrefLang="en-AE" href={canonical} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:url" content={canonical} /><meta property="og:image" content={image} /><meta property="og:image:alt" content={title} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={image} /></Head><EnglishLayout><SectionBackBar locale="en" href="/en/providers" label="Back to service providers" /><ProviderSpecialtyView service={specialty} providers={matchingProviders} locale="en" /><ProvidersSmartFooter locale="en" directoryCards={directoryCards} /></EnglishLayout></>;
}
export async function getStaticProps({ params }) { const specialty = providerSpecialties.find((item) => item.slug === params.slug) || getServiceCategory(params.slug); if (!specialty) return { notFound: true }; const directoryCards = await getUaeFooterCards('en'); return { props: { specialty, matchingProviders: getProvidersByCategory(params.slug), directoryCards }, revalidate: 3600 }; }
export async function getStaticPaths() { return { paths: providerSpecialties.map((specialty) => ({ params: { slug: specialty.slug } })), fallback: 'blocking' }; }

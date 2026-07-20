import Link from 'next/link';
import EnglishLayout from '../../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../../components/UaeSmartFooter';
import UaeDirectoryHero from '../../../../../components/UaeDirectoryHero';
import SecondaryHeader from '../../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../../components/UaeContextInfoCard';
import UaeActivityProviders from '../../../../../components/UaeActivityProviders';
import UaeDirectorySeo from '../../../../../components/UaeDirectorySeo';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../../data/siteTaxonomy';

export default function EnglishLocalServicePage({ emirate, area, service }) {
  return (
    <>
      <UaeDirectorySeo locale="en" title={`${service.nameEn} in ${area.nameEn}, ${emirate.nameEn}`} description={`Browse ${service.nameEn.toLowerCase()} provider profiles and related paths in ${area.nameEn}, ${emirate.nameEn}.`} path={`/en/uae/${emirate.slug}/${area.slug}/${service.slug}`} alternatePath={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} emirate={emirate} service={service} />
      <EnglishLayout>
        <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}/${area.slug}`} backLabel={`Back to ${area.nameEn}`} />
        <main className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={`${service.nameEn} in ${area.nameEn}`} description={`Explore ${service.nameEn.toLowerCase()} information and provider paths for ${area.nameEn}, ${emirate.nameEn}.`} emirate={emirate} area={area} service={service} cleanNavigation />
          <UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`About ${service.nameEn} in ${area.nameEn}`} description={`This page places ${service.nameEn.toLowerCase()} in its correct location context and provides a clear path back to the area and emirate or forward to a project request.`} />
          <UaeDirectoryWeyaakCard locale="en" title={`Ask Weyaak about ${service.nameEn} in ${area.nameEn}`} description="Share the service details, measurements or available photos, and Weyaak will help structure and route the request by location and specialty." />
          <UaeActivityProviders locale="en" emirate={emirate} area={area} service={service} />
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Area</h2>
              <Link href={`/en/uae/${emirate.slug}/${area.slug}`} className="text-[#B8922B] font-bold">{area.nameEn}</Link>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Emirate</h2>
              <Link href={`/en/uae/${emirate.slug}`} className="text-[#B8922B] font-bold">{emirate.nameEn}</Link>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="font-black text-[#0F3F1A] mb-2">Category</h2>
              <Link href={`/en/categories/${service.slug}`} className="text-[#B8922B] font-bold">{service.nameEn}</Link>
            </div>
          </section></div>
          <section className="bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">Related specialties in {area.nameEn}</h2>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.filter((item) => item.slug !== service.slug).slice(0, 8).map((item) => (
                <Link key={item.slug} href={`/en/uae/${emirate.slug}/${area.slug}/${item.slug}`} className="text-xs border border-[#E6DCC8] rounded-full px-3 py-1 text-gray-600 hover:text-[#0F3F1A] hover:border-[#D4AF37]">
                  {item.nameEn}
                </Link>
              ))}
            </div>
          </section>
        </main>
        <UaeSmartFooter locale="en" pageType="service" emirate={emirate} area={area} service={service} />
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  return { props: { emirate, area, service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => {
      SERVICE_CATEGORIES.forEach((service) => {
        paths.push({ params: { emirate: emirate.slug, area: area.slug, service: service.slug } });
      });
    });
  });
  return { paths, fallback: 'blocking' };
}

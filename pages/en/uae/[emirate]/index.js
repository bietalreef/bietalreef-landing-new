import Head from 'next/head';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import { UAE_EMIRATES, getEmirate } from '../../../../data/siteTaxonomy';

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  const showSeoProof = emirate.slug === 'abu-dhabi';

  return (
    <>
      <Head>
        <title>{`${emirate.nameEn} Services | Biet Al Reef`}</title>
        <meta name="description" content={`Choose one of the seven main sectors in ${emirate.nameEn}, then continue to relevant providers, services and locations.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={`Services in ${emirate.nameEn}`} description={`Choose one of the seven main sectors, then continue to providers, services and locations relevant to ${emirate.nameEn}.`} emirate={emirate} />

          {showSeoProof && <SeoProofCardsEn title="Real service path inside Abu Dhabi Directory" desc="The Abu Dhabi page now connects SEO traffic to a verified marble and granite provider, a service path, a product intent and a quotation step instead of staying as generic directory content." />}

          <UaeDirectorySectorCards emirate={emirate} locale="en" />

          <section className="mx-auto max-w-6xl px-4 pb-14">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">{emirate.nameEn} inside Biet Al Reef UAE Directory</h2>
              <p className="mt-4 leading-8 text-gray-600">This page presents the seven main sectors first, followed by clearly organized links to areas and related services for a simpler journey and consistent geographic discovery.</p>
            </div>
          </section>
        </main>
        <UaeSmartFooter locale="en" pageType="emirate" emirate={emirate} />
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };
  return { props: { emirate }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: UAE_EMIRATES.map((emirate) => ({ params: { emirate: emirate.slug } })), fallback: 'blocking' };
}

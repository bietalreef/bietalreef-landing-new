import Head from 'next/head';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import { UAE_EMIRATES, getEmirate } from '../../../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../../../data/uaeAtlasImages';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item.image]));

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  const shareImage = `https://bietalreef.ae${atlasImageBySlug[emirate.slug]}`;
  const title = `${emirate.nameEn} Construction, Services and Suppliers Directory | Biet Al Reef`;
  const description = `Explore construction, contracting, maintenance, design, building materials, suppliers and service providers across ${emirate.nameEn} through Biet Al Reef.`;
  const showSeoProof = false;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Biet Al Reef" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content={`${emirate.nameEn} construction and services directory`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <div dir="ltr" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
        <Navbar locale="en" />
        <div dir="rtl">
          <SecondaryHeader backUrl="/en/uae" backLabel="Back to UAE Directory" />
        </div>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero
            locale="en"
            emirate={emirate}
            image={atlasImageBySlug[emirate.slug]}
            imageOnly
          />

          {showSeoProof && <SeoProofCardsEn title="Real service path inside Abu Dhabi Directory" desc="The Abu Dhabi page now connects SEO traffic to a verified marble and granite provider, a service path, a product intent and a quotation step instead of staying as generic directory content." />}

          <UaeDirectorySectorCards emirate={emirate} locale="en" />

          <section className="mx-auto max-w-6xl px-4 pb-14">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">{emirate.nameEn} inside Biet Al Reef UAE Directory</h2>
              <p className="mt-4 leading-8 text-gray-600">This page presents the seven main sectors first, followed by clearly organized links to areas and related services for a simpler journey and consistent geographic discovery.</p>
            </div>
          </section>
          <UaeSmartFooter locale="en" pageType="emirate" emirate={emirate} />
        </main>
        <Footer locale="en" />
      </div>
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
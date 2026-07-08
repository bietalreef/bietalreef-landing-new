import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import { UAE_EMIRATES, getEmirate } from '../../../../data/siteTaxonomy';
import { ArrowLeft, Home } from 'lucide-react';

export default function EnglishEmiratePage({ emirate }) {
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}`;
  const showSeoProof = emirate.slug === 'abu-dhabi';

  return (
    <>
      <Head>
        <title>{`${emirate.nameEn} Services | Biet Al Reef`}</title>
        <meta name="description" content={`Choose one of the seven main sectors in ${emirate.nameEn}. Extra specialties and area links remain organized inside the smart footer.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/uae/${emirate.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="relative min-h-[420px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src={`/images/seo/emirates/${emirate.slug}.webp`} alt={`${emirate.nameEn} UAE Directory`} fill className="object-cover opacity-35" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-[#0F3F1A]/72 to-[#0F3F1A]/20" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full text-center md:text-left">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-between">
                <Link href="/en/uae" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/12 px-4 py-3 text-xs font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F3F1A]"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0F3F1A]"><ArrowLeft size={16} /></span>Back to UAE Directory</Link>
                <Link href="/en" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F3F1A]"><Home size={16} /> Home</Link>
              </div>
              <p className="text-[#D4AF37] font-black mb-3">UAE emirate</p>
              <h1 className="text-3xl md:text-5xl font-black mb-5">Services in {emirate.nameEn}</h1>
              <p className="text-white/90 leading-8 max-w-3xl mx-auto md:mx-0">Choose one of the seven approved sectors first. City, area and extra specialty pages still exist and are organized inside the smart footer links.</p>
            </div>
          </section>

          {showSeoProof && <SeoProofCardsEn title="Real service path inside Abu Dhabi Directory" desc="The Abu Dhabi page now connects SEO traffic to a verified marble and granite provider, a service path, a product intent and a quotation step instead of staying as generic directory content." />}

          <UaeDirectorySectorCards emirate={emirate} locale="en" />

          <section className="mx-auto max-w-6xl px-4 pb-14">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">{emirate.nameEn} inside Biet Al Reef UAE Directory</h2>
              <p className="mt-4 leading-8 text-gray-600">This emirate page now displays only the seven main sectors to keep the journey clean. Extra services and area links remain inside the UAE smart footer to preserve older routes and GEO strength.</p>
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

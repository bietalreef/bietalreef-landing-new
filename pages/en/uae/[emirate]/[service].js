import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../../components/EnglishLayout';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getServiceCategory } from '../../../../data/siteTaxonomy';
import { ArrowLeft } from 'lucide-react';

export default function EnglishEmirateServicePage({ emirate, service }) {
  const title = `${service.nameEn} in ${emirate.nameEn}`;
  const canonical = `https://bietalreef.ae/en/uae/${emirate.slug}/${service.slug}`;

  return (
    <>
      <Head>
        <title>{title} | Biet Al Reef</title>
        <meta name="description" content={`${title} inside Biet Al Reef UAE Directory. Area links, related services, products and provider paths stay organized in the smart footer.`} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/uae/${emirate.slug}/${service.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="bg-[#0F3F1A] text-white">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <Link href={`/en/uae/${emirate.slug}`} className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/12 px-4 py-3 text-xs font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F3F1A]"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0F3F1A]"><ArrowLeft size={16} /></span>Back to {emirate.nameEn}</Link>
              <p className="mb-3 text-sm font-black text-[#D4AF37]">{emirate.nameEn} service hub</p>
              <h1 className="text-3xl font-black leading-tight md:text-5xl">{title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/88">Open this service path, then use the UAE smart footer to move by area, request a quotation, browse providers or continue to related products.</p>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">A clean service path for {emirate.nameEn}</h2>
              <p className="mt-4 leading-8 text-gray-600">This page keeps the service route active while the smart footer organizes areas, related services, marketplace links and useful content without crowding the page.</p>
              <Link href="/request-quote" className="mt-6 inline-flex rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">Request a quotation</Link>
            </div>
          </section>
        </main>
        <UaeSmartFooter locale="en" pageType="emirateService" emirate={emirate} service={service} />
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirate = getEmirate(params.emirate);
  const service = getServiceCategory(params.service);
  if (!emirate || !service) return { notFound: true };
  return { props: { emirate, service }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = UAE_EMIRATES.flatMap((emirate) => SERVICE_CATEGORIES.map((service) => ({ params: { emirate: emirate.slug, service: service.slug } })));
  return { paths, fallback: 'blocking' };
}

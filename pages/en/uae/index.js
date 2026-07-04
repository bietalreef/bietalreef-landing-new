import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { UAE_EMIRATES } from '../../../data/siteTaxonomy';

export default function EnglishUaeIndex() {
  return (
    <>
      <Head>
        <title>UAE Service Areas | Biet Al Reef</title>
        <meta name="description" content="Browse Biet Al Reef service pages by UAE emirate, city and local area." />
        <link rel="canonical" href="https://bietalreef.ae/en/uae" />
        <link rel="alternate" hrefLang="ar" href="https://bietalreef.ae/uae" />
        <link rel="alternate" hrefLang="en" href="https://bietalreef.ae/en/uae" />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="max-w-7xl mx-auto px-4 py-14 md:py-20 text-left">
          <p className="text-[#B8922B] font-black mb-3">UAE coverage</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Construction and maintenance service areas across the UAE</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Choose an emirate to explore local city and area pages for construction, maintenance, design and building service categories.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UAE_EMIRATES.map((emirate) => (
              <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} dir="ltr" className="bg-white rounded-2xl border border-[#E6DCC8] p-6 text-left shadow-sm hover:border-[#D4AF37]">
                <h2 className="text-2xl font-black text-[#0F3F1A] mb-2">{emirate.nameEn}</h2>
                <p className="text-sm text-gray-600 leading-6 mb-4">Explore {emirate.areas.length} local areas and linked service categories.</p>
                <span className="text-[#B8922B] font-black text-sm">Open {emirate.nameEn} →</span>
              </Link>
            ))}
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

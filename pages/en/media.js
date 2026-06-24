import Head from 'next/head';
import EnglishLayout from '../../components/EnglishLayout';

export default function EnglishMediaPage() {
  return (
    <>
      <Head>
        <title>Media Information | Biet Al Reef</title>
        <meta name="description" content="Media information for the English version of Biet Al Reef." />
        <link rel="canonical" href="https://bietalreef.ae/en/media" />
      </Head>
      <EnglishLayout>
        <main className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Media</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Biet Al Reef media information</h1>
          <p className="text-gray-600 leading-8 mb-8">Biet Al Reef is a UAE-focused public website for construction, maintenance, design, materials and provider discovery pages.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm"><h2 className="font-black text-[#0F3F1A] mb-2">Public website</h2><p className="text-sm text-gray-600 leading-7">Built for discovery, indexing and service navigation.</p></div>
            <div className="bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm"><h2 className="font-black text-[#0F3F1A] mb-2">UAE coverage</h2><p className="text-sm text-gray-600 leading-7">Covers UAE emirates, cities, local areas and service categories.</p></div>
            <div className="bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm"><h2 className="font-black text-[#0F3F1A] mb-2">Ecosystem</h2><p className="text-sm text-gray-600 leading-7">Website for information, app for operations, and Weyaak for assistance.</p></div>
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

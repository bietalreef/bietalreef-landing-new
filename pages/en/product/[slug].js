import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';

function titleFromSlug(slug) {
  return slug.split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

export default function EnglishProductPage({ slug, name }) {
  const canonical = `https://bietalreef.ae/en/product/${slug}`;
  return (
    <>
      <Head>
        <title>{`${name} | Biet Al Reef`}</title>
        <meta name="description" content={`English public product information page for ${name} inside Biet Al Reef.`} />
        <link rel="canonical" href={canonical} />
      </Head>
      <EnglishLayout>
        <main className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Product information</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">{name}</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-8">This page is a public English product template prepared for future marketplace content. It can later connect to categories, suppliers, specifications and service areas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {['Product category', 'Supplier information', 'Future marketplace link'].map((item) => (
              <div key={item} className="bg-white border border-[#E6DCC8] rounded-2xl p-6 shadow-sm">
                <h2 className="font-black text-[#0F3F1A]">{item}</h2>
              </div>
            ))}
          </div>
          <Link href="/en/marketplace" className="text-[#B8922B] font-black">Back to marketplace</Link>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  return { props: { slug, name: titleFromSlug(slug) } };
}

import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { Search, Star, Zap } from 'lucide-react';
import SectionBackBar from '../../../components/SectionBackBar';
import ProductsSmartFooter from '../../../components/ProductsSmartFooter';
import SectionCategoryHero from '../../../components/SectionCategoryHero';

const categories = {
  'building-materials': {
    title: 'Basic Building Materials',
    desc: 'Cement, reinforcement steel, blocks and essential insulation materials for construction projects.',
    icon: '🏗️',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    items: ['Cement and concrete materials', 'Reinforcement steel', 'Blocks and masonry', 'Insulation materials'],
  },
  'finishing-works': {
    title: 'Finishing and Décor Materials',
    desc: 'Marble, ceramic, porcelain, quartz and premium finishing materials for villas, homes and commercial spaces.',
    icon: '✨',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    items: ['Marble and granite', 'Quartz surfaces', 'Ceramic and porcelain', 'Premium finishing materials'],
  },
  'smart-systems': {
    title: 'Lighting and Smart Systems',
    desc: 'Indoor and outdoor lighting solutions, smart home systems, control devices and related installation products.',
    icon: '💡',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    items: ['Indoor lighting', 'Outdoor lighting', 'Smart control systems', 'CCTV and network support'],
  },
  'furniture-decor': {
    title: 'Furniture and Furnishings',
    desc: 'Furniture, décor, kitchens, curtains, carpets and furnishing paths for residential and commercial projects.',
    icon: '🛋️',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    items: ['Living room furniture', 'Bedroom furniture', 'Kitchens and cabinets', 'Decor and accessories'],
  },
};

export default function MarketplaceCategoryEnglishPage({ category, slug }) {
  const canonical = `https://bietalreef.ae/en/marketplace/${slug}`;

  return (
    <>
      <Head>
        <title>{category.title} | Products & Stores | Biet Al Reef</title>
        <meta name="description" content={`${category.title} inside Biet Al Reef Products & Stores. Browse product paths and request guidance based on quantity, type and supply location.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/marketplace/${slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <meta property="og:title" content={`${category.title} | Products & Stores | Biet Al Reef`} />
        <meta property="og:description" content={`${category.title} inside Biet Al Reef Products & Stores.`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`https://bietalreef.ae${category.image}`} />
        <meta property="og:image:alt" content={`${category.title} | Products & Stores | Biet Al Reef`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.title} | Products & Stores | Biet Al Reef`} />
        <meta name="twitter:image" content={`https://bietalreef.ae${category.image}`} />
      </Head>

      <EnglishLayout>
        <SectionBackBar locale="en" href="/en/marketplace" label="Back to Products & Stores" />
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <SectionCategoryHero locale="en" type="products" title={category.title} description={category.desc} image={category.image} />

          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {category.items.map((item) => (
                <div key={item} className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <h2 className="text-lg font-black text-[#0F3F1A]">{item}</h2>
                  <p className="mt-3 text-sm leading-7 text-gray-600">Available through quotation requests based on project details, quantity and supply location.</p>
                </div>
              ))}
            </div>
          </section>

          {false && slug === 'finishing-works' && (
            <section className="mx-auto max-w-6xl px-4 pb-16" aria-label="Featured product from White Whale Marble and Granite Factory">
              <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-2xl shadow-[#8A6A00]/10">
                <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
                  <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#F7F1E8_0%,#E9DDC7_42%,#B8922B_100%)] p-8 md:p-10">
                    <span className="inline-flex rounded-full bg-[#0F3F1A] px-4 py-1.5 text-xs font-black text-white">Featured product</span>
                    <h2 className="mt-5 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">Premium Kitchen Quartz</h2>
                    <p className="mt-4 text-sm font-bold text-[#6F5400]">Kitchen tops · Countertops · Kitchen islands</p>
                    <div className="mt-8 rounded-3xl border border-white/60 bg-white/45 p-5 shadow-inner"><div className="h-24 rounded-2xl border border-white/70 bg-gradient-to-br from-white via-[#EFE7D8] to-[#CDBB98]" /></div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">Quartz</span><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">Premium finish</span><span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">White Whale Factory</span></div>
                    <h3 className="mt-5 text-2xl font-black text-[#0F3F1A]">Custom premium kitchen quartz</h3>
                    <p className="mt-4 text-base font-semibold leading-8 text-gray-700">A product suitable for kitchen tops, countertops and kitchen islands. It can be supplied, fabricated and installed according to project measurements and finishing requirements.</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/en/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">View product</Link><a href="https://wa.me/971506623518" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">Request price on WhatsApp</a></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="rounded-[40px] border border-[#E6DCC8] bg-white p-8 md:p-14">
              <div className="grid gap-10 md:grid-cols-3">
                <div className="text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Search className="h-8 w-8" /></div><h3 className="font-black text-[#0F3F1A]">Search and compare</h3><p className="mt-2 text-sm text-gray-500">Browse products by category and need.</p></div>
                <div className="text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Star className="h-8 w-8" /></div><h3 className="font-black text-[#0F3F1A]">Suppliers and stores</h3><p className="mt-2 text-sm text-gray-500">Connect the request with supplier paths after approval.</p></div>
                <div className="text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Zap className="h-8 w-8" /></div><h3 className="font-black text-[#0F3F1A]">Request a quotation</h3><p className="mt-2 text-sm text-gray-500">Ask for price based on quantity, type and project location.</p></div>
              </div>
            </div>
          </section>
          <ProductsSmartFooter locale="en" />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const category = categories[params.category];
  if (!category) return { notFound: true };
  return { props: { category, slug: params.category }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(categories).map((category) => ({ params: { category } })),
    fallback: 'blocking',
  };
}

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import ProductsSmartFooter from '../../components/ProductsSmartFooter';
import DiscoveryDirectoryHero from '../../components/DiscoveryDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';
import { ArrowLeft, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronRight, Sparkles } from 'lucide-react';

const categories = [
  { id: 'building-materials', title: 'Basic Building Materials', desc: 'Cement, reinforcement steel, blocks and essential insulation materials.', icon: '🏗️', image: '/images/sector-cards/building-materials-stores-card.webp', badge: 'Core materials' },
  { id: 'finishing-works', title: 'Finishing and Décor Materials', desc: 'Marble, ceramic, porcelain and premium wooden flooring.', icon: '✨', image: '/images/sector-cards/factories-suppliers-workshops-card.webp', badge: 'Finishing' },
  { id: 'smart-systems', title: 'Lighting and Smart Systems', desc: 'Indoor and outdoor lighting solutions and home control systems.', icon: '💡', image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp', badge: 'Smart systems' },
  { id: 'furniture-decor', title: 'Furniture and Furnishings', desc: 'Bedroom, living room and kitchen furniture with modern designs.', icon: '🛋️', image: '/images/sector-cards/aluminium-glass-wood-card.webp', badge: 'Furniture & décor' }
];

const faq = [
  { q: 'Is Products & Stores the same as Services?', a: 'No. Products & Stores is for materials, products and suppliers, while Services & Offers is for execution work and service requests.' },
  { q: 'Do products have fixed prices?', a: 'Unapproved prices are not shown. You can request a quotation based on quantity, type and supply location.' },
  { q: 'Can supply cover all Emirates?', a: 'This depends on the supplier. Supply areas will be clarified when product and store data is approved.' }
];

export default function MarketplaceEnglishPage() {
  const structuredData = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Products and Stores in Biet Al Reef', description: 'An independent section for products, stores, building materials and finishing products inside Biet Al Reef.', url: 'https://bietalreef.ae/en/marketplace', inLanguage: 'en-AE' };

  return (
    <>
      <Head><title>Products & Stores | Building Materials, Finishing and Furniture in the UAE</title><meta name="description" content="Products & Stores in Biet Al Reef: building materials, finishing products, smart systems and furniture. A separate path from services and the UAE Directory." /><meta name="keywords" content="building products, building materials, finishing stores, suppliers, marble, ceramic, furniture" /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://bietalreef.ae/en/marketplace" /><link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/marketplace" /><link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/marketplace" /><meta property="og:title" content="Products & Stores | Biet Al Reef" /><meta property="og:description" content="Building materials, finishing products, smart systems and furniture in a dedicated marketplace path." /><meta property="og:type" content="website" /><meta property="og:url" content="https://bietalreef.ae/en/marketplace" /><meta property="og:image" content="https://bietalreef.ae/images/materials-products-hero.webp" /><meta property="og:image:alt" content="Products & Stores | Biet Al Reef" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="Products & Stores | Biet Al Reef" /><meta name="twitter:image" content="https://bietalreef.ae/images/materials-products-hero.webp" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left [&>section:nth-of-type(2)]:hidden [&>section:nth-of-type(3)>section:first-of-type]:hidden">
          <DiscoveryDirectoryHero type="products" locale="en" />
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
              <Image src="/images/materials-products-hero.webp" alt="Building materials, products and stores inside Biet Al Reef" fill priority className="scale-[1.08] object-cover object-[70%_42%] -translate-y-[3%] md:scale-105 md:object-[70%_45%] md:-translate-y-[2%]" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/16 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/82 via-[#FDFBF7]/38 to-transparent md:from-[#FDFBF7]/78 md:via-[#FDFBF7]/26" />
              <Link href="/en" className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:left-8 md:top-8 md:px-4 md:py-3 md:text-sm"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>Back to home</Link>
              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
                <div className="w-full max-w-[620px] md:ml-0 md:mr-auto">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm"><ShoppingBag className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />Products & Stores gateway</div>
                  <h1 className="max-w-[600px] text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] md:text-6xl">Materials and products for your project<br />from clearer suppliers and stores</h1>
                  <div className="mt-5 rounded-[2.1rem] border border-white/70 bg-white/66 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                    <p className="text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">This section is dedicated to materials, products, stores and suppliers. Start from the product or material type, then request pricing based on quantity, specifications and project location.</p>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"><Link href="#marketplace-categories" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><Search className="h-5 w-5" aria-hidden="true" /></span>Browse products now</Link><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>Ask for sourcing help</a></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="mb-8 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">Product categories</span>
              <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the material or product type</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">Product cards now follow the same premium style as the other sections: strong image, focused content and a direct browsing path.</p>
            </div>

            <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/en/marketplace/${cat.id}`} className="group block h-full">
                  <article className="h-full overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
                    <div className="relative h-52 overflow-hidden bg-[#F5EFE4] sm:h-56 xl:h-48">
                      <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/78 via-[#0F3F1A]/16 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                        <span className="rounded-2xl bg-white/92 px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{cat.badge}</span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#123A46] text-xl text-[#F7E7A0] shadow-lg ring-1 ring-[#D4AF37]/40">{cat.icon}</span>
                      </div>
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="mb-3 flex items-center gap-2 text-[#B8922B]"><Sparkles className="h-4 w-4" /><span className="text-xs font-black">Product section</span></div>
                      <h3 className="text-xl font-black leading-8 text-[#0F3F1A] group-hover:text-[#B8922B]">{cat.title}</h3>
                      <p className="mt-3 min-h-[64px] text-sm font-semibold leading-7 text-gray-600">{cat.desc}</p>
                      <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 py-3 text-sm font-black text-white shadow-[0_10px_0_rgba(18,58,70,0.12)] transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">Browse products <ChevronRight className="h-4 w-4" /></span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <section className="mb-20" aria-label="Featured product from White Whale Marble and Granite Factory"><div className="mb-6 text-left"><span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]">Featured product</span><h2 className="mt-4 text-2xl font-black text-[#0F3F1A] md:text-3xl">Product card from White Whale Factory</h2><p className="mt-3 leading-8 text-gray-600">A product available for supply, fabrication and installation based on the project measurements.</p></div><div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-2xl shadow-[#8A6A00]/10"><div className="grid lg:grid-cols-[0.9fr_1.35fr]"><div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#F7F1E8_0%,#E9DDC7_42%,#B8922B_100%)] p-8 md:p-10"><div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#ffffff_35%,transparent_72%)] opacity-30" /><div className="relative z-10 flex h-full flex-col justify-between"><div><span className="inline-flex rounded-full bg-[#0F3F1A] px-4 py-1.5 text-xs font-black text-white">Available on request</span><h3 className="mt-5 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">Premium Kitchen Quartz</h3><p className="mt-4 text-sm font-bold text-[#6F5400]">Kitchen tops · Countertops · Kitchen islands</p></div><div className="mt-8 rounded-3xl border border-white/60 bg-white/45 p-5 shadow-inner"><div className="h-24 rounded-2xl border border-white/70 bg-gradient-to-br from-white via-[#EFE7D8] to-[#CDBB98]" /></div></div></div><div className="p-8 md:p-10"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">Quartz</span><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">Premium finish</span><span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">White Whale Factory</span></div><h3 className="mt-5 text-2xl font-black text-[#0F3F1A]">Custom premium kitchen quartz</h3><p className="mt-4 text-base font-semibold leading-8 text-gray-700">A product suitable for kitchen tops, countertops and kitchen islands. It can be supplied, fabricated and installed according to project measurements, selected color and finishing requirements.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{['Easy to clean', 'Custom fabrication', 'Supply and installation'].map((item) => <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>)}</div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/en/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">View product</Link><a href="https://wa.me/971506623518" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">Request price on WhatsApp</a></div></div></div></div></section>

            <section className="mb-20 rounded-[40px] border border-[#E6DCC8] bg-white p-8 md:p-16"><div className="grid gap-12 md:grid-cols-3"><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Search className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Search and compare</h3><p className="text-sm text-gray-500">Browse product categories independently and clearly.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Star className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Suppliers and stores</h3><p className="text-sm text-gray-500">Connect products with suppliers and stores once data is approved.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Zap className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Request a quotation</h3><p className="text-sm text-gray-500">Ask for a price based on quantity, type and project location.</p></div></div></section>

            <section className="mx-auto mb-20 max-w-3xl"><h2 className="mb-10 text-center text-2xl font-black text-[#0F3F1A]">FAQ about Products & Stores</h2><div className="space-y-4">{faq.map((item, i) => <div key={i} className="rounded-2xl border border-[#E6DCC8] bg-white p-6"><h3 className="mb-2 font-black text-[#0F3F1A]">{item.q}</h3><p className="text-sm leading-relaxed text-gray-600">{item.a}</p></div>)}</div></section>

            <section className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 text-center shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:p-12"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">Need a product or material for your project?</h2><p className="mx-auto mb-8 max-w-xl font-semibold leading-8 text-gray-600">Send the product type, quantity, specifications and supply location to receive suitable guidance.</p><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0F3F1A] px-8 py-3 font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">Contact Biet Al Reef</a></section>
          </section>
          <ProductsSmartFooter locale="en" />
        </main>
      </EnglishLayout>
    </>
  );
}

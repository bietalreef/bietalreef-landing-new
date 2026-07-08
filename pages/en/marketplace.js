import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'building-materials', title: 'Basic Building Materials', desc: 'Cement, reinforcement steel, blocks and essential insulation materials.', icon: '🏗️' },
  { id: 'finishing-works', title: 'Finishing and Décor Materials', desc: 'Marble, ceramic, porcelain and premium wooden flooring.', icon: '✨' },
  { id: 'smart-systems', title: 'Lighting and Smart Systems', desc: 'Indoor and outdoor lighting solutions and home control systems.', icon: '💡' },
  { id: 'furniture-decor', title: 'Furniture and Furnishings', desc: 'Bedroom, living room and kitchen furniture with modern designs.', icon: '🛋️' }
];

const faq = [
  { q: 'Is Products & Stores the same as Services?', a: 'No. Products & Stores is for materials, products and suppliers, while Services & Offers is for execution work and service requests.' },
  { q: 'Do products have fixed prices?', a: 'Unapproved prices are not shown. You can request a quotation based on quantity, type and supply location.' },
  { q: 'Can supply cover all Emirates?', a: 'This depends on the supplier. Supply areas will be clarified when product and store data is approved.' }
];

export default function MarketplaceEnglishPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Products and Stores in Biet Al Reef',
    description: 'An independent section for products, stores, building materials and finishing products inside Biet Al Reef.',
    url: 'https://bietalreef.ae/en/marketplace',
    inLanguage: 'en-AE'
  };

  return (
    <>
      <Head>
        <title>Products & Stores | Building Materials, Finishing and Furniture in the UAE</title>
        <meta name="description" content="Products & Stores in Biet Al Reef: building materials, finishing products, smart systems and furniture. A separate path from services and the UAE Directory." />
        <meta name="keywords" content="building products, building materials, finishing stores, suppliers, marble, ceramic, furniture" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/marketplace" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/marketplace" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/marketplace" />
        <meta property="og:title" content="Products & Stores | Biet Al Reef" />
        <meta property="og:description" content="Building materials, finishing products, smart systems and furniture in a dedicated marketplace path." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/marketplace" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
              <Image
                src="/images/materials-products-hero.webp"
                alt="Building materials, products and stores inside Biet Al Reef"
                fill
                priority
                className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/50 via-[#FDFBF7]/8 to-transparent" />

              <Link href="/en" className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:left-8 md:top-8 md:px-4 md:py-3 md:text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </span>
                Back to home
              </Link>

              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                  <ShoppingBag className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                  Products & Stores gateway
                </div>

                <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">
                  Materials and products for your project<br />from clearer suppliers and stores
                </h1>

                <div className="mt-5 max-w-4xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                  <p className="max-w-3xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                    This section is dedicated to materials, products, stores and suppliers. Start from the product or material type, then request pricing based on quantity, specifications and project location.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="#marketplace-categories" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <Search className="h-5 w-5" aria-hidden="true" />
                      </span>
                      Browse products now
                    </Link>
                    <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      </span>
                      Ask for sourcing help
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-16">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="text-lg font-black text-[#0F3F1A] mb-3">{cat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.desc}</p>
                  <Link href={`/en/marketplace/${cat.id}`} className="text-[#D4AF37] font-bold text-sm flex items-center gap-2">
                    Browse products <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </section>

            <section className="mb-20" aria-label="Featured product from White Whale Marble and Granite Factory">
              <div className="mb-6 text-left">
                <span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]">Featured product</span>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-[#0F3F1A]">Product card from White Whale Factory</h2>
                <p className="mt-3 text-gray-600 leading-8">A product available for supply, fabrication and installation based on the project measurements.</p>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-2xl shadow-[#8A6A00]/10">
                <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
                  <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_top,#F7F1E8_0%,#E9DDC7_42%,#B8922B_100%)] p-8 md:p-10">
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_0%,#ffffff_35%,transparent_72%)]" />
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <span className="inline-flex rounded-full bg-[#0F3F1A] px-4 py-1.5 text-xs font-black text-white">Available on request</span>
                        <h3 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-[#0F3F1A]">Premium Kitchen Quartz</h3>
                        <p className="mt-4 text-sm font-bold text-[#6F5400]">Kitchen tops · Countertops · Kitchen islands</p>
                      </div>
                      <div className="mt-8 rounded-3xl border border-white/60 bg-white/45 p-5 shadow-inner">
                        <div className="h-24 rounded-2xl bg-gradient-to-br from-white via-[#EFE7D8] to-[#CDBB98] border border-white/70" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#FFF8E5] px-3 py-1.5 text-xs font-black text-[#8A6A00]">Quartz</span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">Premium finish</span>
                      <span className="rounded-full bg-[#FDFBF7] px-3 py-1.5 text-xs font-black text-[#0F3F1A]">White Whale Factory</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-[#0F3F1A]">Custom premium kitchen quartz</h3>
                    <p className="mt-4 text-base font-semibold leading-8 text-gray-700">A product suitable for kitchen tops, countertops and kitchen islands. It can be supplied, fabricated and installed according to project measurements, selected color and finishing requirements.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {['Easy to clean', 'Custom fabrication', 'Supply and installation'].map((item) => (
                        <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link href="/en/providers/al-hoot-marble-granite-factory" className="inline-flex justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">View product</Link>
                      <a href="https://wa.me/971506623518" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-2xl border border-[#D4AF37]/50 px-7 py-3 text-sm font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">Request price on WhatsApp</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[40px] border border-[#E6DCC8] p-8 md:p-16 mb-20">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center"><div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6"><Search className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">Search and compare</h3><p className="text-gray-500 text-sm">Browse product categories independently and clearly.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6"><Star className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">Suppliers and stores</h3><p className="text-gray-500 text-sm">Connect products with suppliers and stores once data is approved.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6"><Zap className="w-8 h-8" /></div><h3 className="font-black text-[#0F3F1A] mb-3">Request a quotation</h3><p className="text-gray-500 text-sm">Ask for a price based on quantity, type and project location.</p></div>
              </div>
            </section>

            <section className="max-w-3xl mx-auto mb-20">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">FAQ about Products & Stores</h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-6">
                    <h3 className="font-black text-[#0F3F1A] mb-2">{item.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center bg-gradient-to-br from-[#0F3F1A] to-[#1a5c28] rounded-[40px] p-12 text-white">
              <h2 className="text-3xl font-black mb-6">Need a product or material for your project?</h2>
              <p className="text-emerald-50/70 mb-10 max-w-xl mx-auto">Send the product type, quantity and location to receive suitable guidance.</p>
              <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-[#D4AF37] text-[#0F3F1A] rounded-2xl font-black shadow-lg hover:bg-[#b8922b] transition-all">
                Contact Biet Al Reef
              </a>
            </section>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
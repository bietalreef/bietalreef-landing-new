import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ShoppingBag, Search, Star, Zap, ChevronRight } from 'lucide-react';

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
        <main dir="ltr" className="max-w-6xl mx-auto px-4 py-16 bg-[#FDFBF7] text-left">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 text-[#D4AF37] font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
              Products and stores section
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
              Biet Al Reef <span className="text-[#D4AF37]">Products & Stores</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              This section is dedicated to materials, products, stores and suppliers. If you are looking for execution services, go to Services & Offers. If you are searching by city, start from the UAE Directory.
            </p>
          </header>

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
        </main>
      </EnglishLayout>
    </>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { blogPosts } from "../../lib/blog-data";

const englishCopy = {
  "smart-construction-2024": { title: "Smart Construction in 2024: How Technology Is Transforming the Industry", excerpt: "Discover how modern contractors use AI and automation to accelerate projects and reduce costs.", category: "Construction & Contracting", author: "Ahmed Al Hammadi", readTime: "5 min" },
  "interior-design-trends": { title: "Latest Interior Design Trends in the UAE 2024", excerpt: "Explore the latest styles, colours and materials shaping interior design this year.", category: "Interior Design", author: "Fatima Al Kaabi", readTime: "6 min" },
  "case-study-villa-renovation": { title: "Case Study: Luxury Villa Renovation in Abu Dhabi", excerpt: "A practical look at organising a large villa renovation project in Abu Dhabi.", category: "Case Studies", author: "Mohammed Al Dhaheri", readTime: "8 min" },
  "maintenance-tips": { title: "Routine Maintenance Tips: Keep Your Home in Excellent Condition", excerpt: "A practical guide to routine maintenance that helps protect your home and extend the life of its components.", category: "Maintenance & Repairs", author: "Ali Al Mansoori", readTime: "7 min" },
  "electrical-safety": { title: "Electrical Wiring Safety: Standards and Recommendations", excerpt: "A practical guide to electrical safety standards and key recommendations for a safer property.", category: "Electrical Works", author: "Mahmoud Al Shamsi", readTime: "6 min" },
};

const localizedPosts = blogPosts.map((post) => ({ ...post, ...(englishCopy[post.slug] || {}) }));
const categories = [...new Set(localizedPosts.map((post) => post.category))];

export default function BlogEnglish() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = localizedPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://bietalreef.ae/en/blog#blog",
    name: "Biet Al Reef Blog",
    description: "Practical articles and guides about construction, contracting, design, maintenance, building materials and digital business solutions in the UAE.",
    url: "https://bietalreef.ae/en/blog",
    inLanguage: "en-AE",
    publisher: { "@id": "https://bietalreef.ae/#organization" },
    isPartOf: { "@id": "https://bietalreef.ae/#website" },
    blogPost: localizedPosts.slice(0, 12).map(post => ({ "@type": "BlogPosting", headline: post.title, description: post.excerpt, url: `https://bietalreef.ae/blog/${post.slug}`, datePublished: post.date, author: { "@type": "Organization", name: post.author || "Biet Al Reef" } }))
  };

  return <>
    <Head>
      <title>Biet Al Reef Blog | Construction, Design & Business Solutions in the UAE</title>
      <meta name="description" content="Biet Al Reef Blog brings together practical articles and guides about construction, contracting, design, maintenance, building materials and digital business solutions in the UAE." />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href="https://bietalreef.ae/en/blog" />
      <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/blog" />
      <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/blog" />
      <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
    </Head>
    <div className="min-h-screen flex flex-col bg-beige" dir="ltr">
      <Navbar locale="en" />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 text-left">
            <p className="text-emerald-100 font-bold mb-3">Practical knowledge from Biet Al Reef</p>
            <h1 className="text-3xl md:text-5xl font-black mb-4">Biet Al Reef Blog</h1>
            <p className="text-lg md:text-xl text-emerald-100 max-w-4xl leading-9">Practical articles and guides about construction, contracting, design, maintenance and building materials, with content helping companies and service providers understand digital presence and modern business tools in the UAE.</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8"><input type="text" placeholder="Search Biet Al Reef articles and guides..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div className="mb-8"><h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by topic</h2><div className="flex flex-wrap gap-2"><button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full font-medium transition-colors ${!selectedCategory ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>All articles</button>{categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full font-medium transition-colors ${selectedCategory === category ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>{category}</button>)}</div></div>
          <div className="mb-6"><p className="text-gray-600">Available articles: <span className="font-semibold">{filteredPosts.length}</span></p></div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          {filteredPosts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredPosts.map(post => <Link key={post.id} href={`/blog/${post.slug}`}><a className="group"><article className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-shadow h-full"><div className="relative overflow-hidden h-48 bg-gray-200"><img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div><div className="p-4"><div className="mb-3"><span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span></div><h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">{post.title}</h2><p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p><div className="flex items-center justify-between text-xs text-gray-500"><span>{post.author}</span><span>{post.readTime}</span></div><div className="mt-3 pt-3 border-t border-gray-200"><span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</span></div></div></article></a></Link>)}</div> : <div className="text-center py-12"><p className="text-lg text-gray-600 mb-4">No articles match your search</p><button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Reset search</button></div>}
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16"><div className="rounded-2xl bg-white border border-emerald-100 p-7 md:p-9 shadow-soft"><h2 className="text-2xl font-black text-gray-900 mb-3">From knowledge to the practical next step</h2><p className="text-gray-600 leading-8 mb-6">Use the articles to understand your options, materials and services, then continue to the UAE Directory, Biet Al Reef Market or Business Solutions when you are ready to search, contact or develop your business.</p><div className="flex flex-wrap gap-3"><Link href="/en/uae"><a className="px-5 py-3 rounded-full bg-emerald-700 text-white font-bold">UAE Directory</a></Link><Link href="/en/marketplace"><a className="px-5 py-3 rounded-full border border-emerald-700 text-emerald-700 font-bold">Biet Al Reef Market</a></Link><Link href="/en/business-solutions"><a className="px-5 py-3 rounded-full border border-emerald-700 text-emerald-700 font-bold">Business Solutions</a></Link></div></div></section>
      </main>
      <Footer locale="en" />
    </div>
  </>;
}

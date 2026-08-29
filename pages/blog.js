import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { blogPosts, categories } from "../lib/blog-data";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://bietalreef.ae/blog#blog",
    name: "مدونة بيت الريف",
    description: "مقالات وأدلة عملية حول البناء والمقاولات والتصميم والصيانة والمواد وحلول الأعمال الرقمية في دولة الإمارات.",
    url: "https://bietalreef.ae/blog",
    inLanguage: "ar-AE",
    publisher: { "@id": "https://bietalreef.ae/#organization" },
    isPartOf: { "@id": "https://bietalreef.ae/#website" },
    blogPost: blogPosts.slice(0, 12).map(post => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://bietalreef.ae/blog/${post.slug}`,
      datePublished: post.date,
      author: { "@type": "Organization", name: post.author || "بيت الريف" }
    }))
  };

  return (
    <>
      <Head>
        <title>مدونة بيت الريف | البناء والمقاولات والتصميم وحلول الأعمال في الإمارات</title>
        <meta
          name="description"
          content="مدونة بيت الريف تجمع مقالات وأدلة عملية حول البناء والمقاولات والتصميم والصيانة ومواد البناء، إضافة إلى التقنية وحلول الأعمال الرقمية للشركات في الإمارات."
        />
        <meta
          name="keywords"
          content="مدونة بيت الريف, البناء في الإمارات, مقاولات الإمارات, مواد البناء, تصميم داخلي, صيانة, مزودي الخدمات, حلول الأعمال الرقمية"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://bietalreef.ae/blog" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/blog" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/blog" />
        <meta property="og:title" content="مدونة بيت الريف | أدلة ومقالات للأعمال والبناء في الإمارات" />
        <meta property="og:description" content="محتوى عملي يساعد أصحاب المشاريع والشركات ومزودي الخدمات على فهم البناء والمواد والتصميم والصيانة وحلول الأعمال الرقمية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/blog" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:site_name" content="بيت الريف" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige" dir="rtl">
        <Navbar />
        <main className="flex-1">
          <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 text-right">
              <p className="text-emerald-100 font-bold mb-3">معرفة عملية من بيت الريف</p>
              <h1 className="text-3xl md:text-5xl font-black mb-4">مدونة بيت الريف</h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-4xl leading-9">
                مقالات وأدلة عملية حول البناء والمقاولات والتصميم والصيانة ومواد البناء، مع محتوى يساعد الشركات ومزودي الخدمات على فهم الحضور الرقمي وأدوات الأعمال الحديثة داخل الإمارات.
              </p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
              <input
                type="text"
                placeholder="ابحث في مقالات وأدلة بيت الريف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">تصفح حسب الموضوع</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  جميع المقالات
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                المقالات المتاحة: <span className="font-semibold">{filteredPosts.length}</span>
              </p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <a className="group">
                      <article className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-shadow h-full">
                        <div className="relative overflow-hidden h-48 bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="p-4">
                          <div className="mb-3">
                            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>

                          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {post.title}
                          </h2>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{post.author}</span>
                            <span>{post.readTime}</span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <span className="text-xs text-gray-500">
                              {new Date(post.date).toLocaleDateString("ar-AE", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })}
                            </span>
                          </div>
                        </div>
                      </article>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">لم نجد مقالات تطابق بحثك</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  إعادة تعيين البحث
                </button>
              </div>
            )}
          </section>

          <section className="max-w-6xl mx-auto px-4 pb-16">
            <div className="rounded-2xl bg-white border border-emerald-100 p-7 md:p-9 shadow-soft">
              <h2 className="text-2xl font-black text-gray-900 mb-3">من المعرفة إلى الخطوة العملية</h2>
              <p className="text-gray-600 leading-8 mb-6">
                استخدم المقالات لفهم الخيارات والمواد والخدمات، ثم انتقل إلى دليل الإمارات أو سوق بيت الريف أو حلول الأعمال عندما تكون جاهزًا للبحث أو التواصل أو تطوير نشاطك.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/uae"><a className="px-5 py-3 rounded-full bg-emerald-700 text-white font-bold">دليل الإمارات</a></Link>
                <Link href="/marketplace"><a className="px-5 py-3 rounded-full border border-emerald-700 text-emerald-700 font-bold">سوق بيت الريف</a></Link>
                <Link href="/business-solutions"><a className="px-5 py-3 rounded-full border border-emerald-700 text-emerald-700 font-bold">حلول الأعمال</a></Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

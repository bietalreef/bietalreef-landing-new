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

  return (
    <>
      <Head>
        <title>المدونة - بيت الريف: مقالات وحالات نجاح</title>
        <meta
          name="description"
          content="اقرأ أحدث المقالات والحالات الناجحة حول البناء والتصميم الداخلي والصيانة والمقاولات في الإمارات"
        />
        <meta
          name="keywords"
          content="مدونة البناء, مقالات التصميم, حالات النجاح, نصائح المقاولات, الصيانة الدورية"
        />
        <meta property="og:title" content="المدونة - بيت الريف: مقالات وحالات نجاح" />
        <meta
          property="og:description"
          content="اقرأ أحدث المقالات والحالات الناجحة حول البناء والتصميم الداخلي والصيانة"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/blog" />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">مدونة بيت الريف</h1>
              <p className="text-lg md:text-xl text-emerald-100">
                مقالات وحالات نجاح وأفكار حول البناء والتصميم والمقاولات الذكية
              </p>
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="max-w-6xl mx-auto px-4 py-8">
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="ابحث عن مقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">التصنيفات</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  الكل
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

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                عدد المقالات: <span className="font-semibold">{filteredPosts.length}</span>
              </p>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="max-w-6xl mx-auto px-4 pb-16">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <a className="group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
                        {/* Image */}
                        <div className="relative overflow-hidden h-48 bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Category Badge */}
                          <div className="mb-3">
                            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{post.author}</span>
                            <span>{post.readTime}</span>
                          </div>

                          {/* Date */}
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
                      </div>
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
        </main>
        <Footer />
      </div>
    </>
  );
}

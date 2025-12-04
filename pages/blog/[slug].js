import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { blogPosts, getBlogPostBySlug } from "../../lib/blog-data";

export default function BlogPost({ post, relatedPosts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>جاري التحميل...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">المقالة غير موجودة</h1>
            <Link href="/blog">
              <a className="text-emerald-600 hover:text-emerald-700">العودة إلى المدونة</a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - بيت الريف</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, ${post.title}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://bietalreef.ae/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        
        {/* Schema Markup for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: post.image,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: post.author
              },
              publisher: {
                "@type": "Organization",
                name: "بيت الريف",
                logo: {
                  "@type": "ImageObject",
                  url: "https://bietalreef.ae/logo.png"
                }
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          {/* Hero Image */}
          <div className="w-full h-64 md:h-96 bg-gray-200 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-600 border-t border-b border-gray-200 py-4">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <span>كتبه: <strong>{post.author}</strong></span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString("ar-AE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12 text-gray-700">
              {post.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)[0].length;
                  const text = paragraph.replace(/^#+\s/, "");
                  const className = {
                    1: "text-3xl font-bold mt-8 mb-4 text-gray-900",
                    2: "text-2xl font-bold mt-6 mb-3 text-gray-900",
                    3: "text-xl font-bold mt-4 mb-2 text-gray-900"
                  }[level] || "text-lg font-semibold mt-3 mb-2 text-gray-900";
                  return <h2 key={index} className={className}>{text}</h2>;
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="ml-6 mb-2">
                      {paragraph.replace(/^- /, "")}
                    </li>
                  );
                }
                if (paragraph.trim() === "") {
                  return <div key={index} className="h-4" />;
                }
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="bg-emerald-50 rounded-lg p-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">شارك هذا المقال</h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://bietalreef.ae/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://bietalreef.ae/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://bietalreef.ae/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">مقالات ذات صلة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <a className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
                          <div className="relative overflow-hidden h-40 bg-gray-200">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 mt-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                هل تريد تحويل مشروعك إلى واقع؟
              </h2>
              <p className="text-lg text-emerald-100 mb-6">
                انضم إلى آلاف المستخدمين الذين يستخدمون بيت الريف لإدارة مشاريعهم بكفاءة
              </p>
              <a
                href="https://app.bietalreef.ae"
                className="inline-block px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                ابدأ الآن
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return {
    props: {
      post,
      relatedPosts
    },
    revalidate: 3600 // Revalidate every hour
  };
}

export async function getStaticPaths() {
  const paths = blogPosts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: true
  };
}

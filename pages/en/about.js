import Head from "next/head";
import EnglishLayout from "../../components/EnglishLayout";

export default function AboutEnglishPage() {
  const description = "Biet Al Reef is an authentic UAE platform that reflects the UAE digital transformation and artificial intelligence vision for construction and contracting, from Al Ain to all Emirates.";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Biet Al Reef',
    description,
    url: 'https://bietalreef.ae/en/about',
    inLanguage: 'en-AE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Biet Al Reef',
      url: 'https://bietalreef.ae'
    }
  };

  return (
    <>
      <Head>
        <title>About Us | Biet Al Reef - Smart Construction and Maintenance Platform in the UAE</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Biet Al Reef, about us, UAE contracting platform, UAE digital transformation, construction AI, Weyaak" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/about" />
        <meta property="og:title" content="About Us | Biet Al Reef - Smart Construction Platform" />
        <meta property="og:description" content="An authentic UAE platform that reflects digital transformation for construction and contracting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/about" />
        <meta property="og:locale" content="en_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="flex-1 max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12 bg-gradient-to-b from-blue-50 via-white to-blue-50">
          <section className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Us: A Story from Zayed’s Home and a Vision for the Future
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </section>

          <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-2 border-primary border-opacity-20">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              <strong>Biet Al Reef</strong> was born in the heart of the UAE, carrying the <strong>spirit of the Union</strong> planted by the founding father. We are not just a platform; we are an authentic Emirati home that combines the experience of the past with the ambition of the future, building a bridge of trust between everyone who builds and develops on this blessed land.
            </p>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mt-4">
              We started from <strong>Al Ain, Dar Al Zain</strong>, to become part of the development journey our country is witnessing, contributing to the vision of wise leadership in building one of the world’s most prosperous digital economies.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇦🇪</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Vision: Following the Path of Leadership
              </h2>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-6 md:p-8 border-l-4 border-primary">
              <p className="text-base text-gray-800 leading-relaxed mb-4">
                We draw our vision from the UAE’s direction to accelerate <strong>digital transformation</strong> and adopt <strong>artificial intelligence</strong> as a key pillar for the future of the Emirates.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 text-sm md:text-base my-6">
                Digital transformation must move faster because the world does not wait.
                <br />
                <span className="text-xs text-gray-600 not-italic">— UAE leadership vision</span>
              </blockquote>
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>Biet Al Reef</strong> is a practical expression of this vision. We seek to become a leading platform that places future tools in the hands of every citizen and resident. We are committed to being at the forefront of this transformation by providing smart and secure technical infrastructure that supports contracting and construction, one of the most important pillars of our national economy.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏛️</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Mission: Building Trust and Simplifying Life
              </h2>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
              <p className="text-base text-gray-800 leading-relaxed mb-6">
                In line with the direction of municipal and city service entities, our mission is to simplify procedures and make people’s lives easier. We believe technology should serve people, not the other way around. That is why we built a <strong>safe and trusted platform</strong> that supports transparency, protects rights, and makes construction and development work an easy and pleasant experience.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">How do we achieve this?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><span className="text-2xl">🔒</span> Security</h4>
                  <p className="text-sm text-gray-700">A verified platform that protects user data and contracts.</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><span className="text-2xl">✨</span> Transparency</h4>
                  <p className="text-sm text-gray-700">Clear pricing, real reviews, and accurate follow-up for every project stage.</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><span className="text-2xl">⚡</span> Simplicity</h4>
                  <p className="text-sm text-gray-700">Easy interfaces, fast procedures, and artificial intelligence that handles complex tasks for you.</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><span className="text-2xl">💪</span> Empowerment</h4>
                  <p className="text-sm text-gray-700">We empower craftsmen, contractors and citizens to manage their work and projects from anywhere, at any time.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">💎</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Values: Emirati Authenticity and Global Technology
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-3xl">🤝</span> Spirit of the Union</h3>
                <p className="text-sm text-gray-800 leading-relaxed">We work as one team, citizens and residents, to build a better future for our country.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-3xl">🛡️</span> Trust and Integrity</h3>
                <p className="text-sm text-gray-800 leading-relaxed">They are the foundation of our dealings. Every contract, every dirham and every piece of information is a trust we carry.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-3xl">🚀</span> Innovation and Leadership</h3>
                <p className="text-sm text-gray-800 leading-relaxed">We use the latest artificial intelligence capabilities to provide advanced practical solutions.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-3xl">❤️</span> Community Service</h3>
                <p className="text-sm text-gray-800 leading-relaxed">Our highest goal is to serve the people of this land, make their lives easier and contribute to their wellbeing.</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
            <p className="text-lg md:text-xl font-semibold leading-relaxed">
              <strong>Biet Al Reef</strong> is not just a company; it is a promise we made to be <strong>builders of trust</strong>, <strong>pioneers of the future</strong>, and <strong>loyal sons of Zayed’s home</strong>.
            </p>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

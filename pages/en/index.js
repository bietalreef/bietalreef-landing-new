import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, Search, MessageSquare, Zap, CheckCircle, Globe, TrendingUp, Shield, Smartphone } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function EnglishHome() {
  const [activeTab, setActiveTab] = useState('customer');

  const description = 'Biet Al Reef is the digital business engine for the construction and building sector in the UAE. From the first inquiry to the final invoice.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Biet Al Reef',
    alternateName: 'Biet Alreef',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description,
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Ajman' },
      { '@type': 'City', name: 'Umm Al Quwain' },
      { '@type': 'City', name: 'Ras Al Khaimah' },
      { '@type': 'City', name: 'Fujairah' }
    ],
    contactPoint: { '@type': 'ContactPoint', telephone: '+971567856001', contactType: 'customer support', areaServed: 'AE', availableLanguage: ['Arabic', 'English'] },
  };

  return (
    <>
      <Head>
        <title>Biet Al Reef | Digital Business Engine for Construction & Building in UAE</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ar-AE" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <EnglishLayout>
        <main>
          {/* ═══ HERO SECTION - Strategic Messaging ═══ */}
          <section className="relative bg-white py-12 md:py-20 lg:py-24 border-b-2 border-[#E6DCC8]">
            <div className="mx-auto max-w-7xl px-4">
              {/* Main Headline */}
              <div className="text-center mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F3F1A] mb-4 md:mb-6 leading-tight">
                  Biet Al Reef
                </h1>
                <p className="text-lg md:text-2xl font-black text-[#B8922B] mb-6 md:mb-8">
                  Digital Business Engine for Construction & Building
                </p>
                <p className="text-base md:text-lg font-semibold text-gray-700 max-w-3xl mx-auto leading-8 mb-8 md:mb-10">
                  We don't just connect you with a client... <span className="text-[#0F3F1A] font-black">we build you a permanent digital presence</span> where your customers search.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-3 md:gap-4 justify-center mb-10 md:mb-14">
                <button
                  onClick={() => setActiveTab('customer')}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm md:text-base transition-all ${
                    activeTab === 'customer'
                      ? 'bg-[#0F3F1A] text-white shadow-lg'
                      : 'bg-white border-2 border-[#E6DCC8] text-[#0F3F1A] hover:border-[#0F3F1A]'
                  }`}
                >
                  I'm a Client
                </button>
                <button
                  onClick={() => setActiveTab('provider')}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm md:text-base transition-all ${
                    activeTab === 'provider'
                      ? 'bg-[#0F3F1A] text-white shadow-lg'
                      : 'bg-white border-2 border-[#E6DCC8] text-[#0F3F1A] hover:border-[#0F3F1A]'
                  }`}
                >
                  I'm a Service Provider
                </button>
              </div>

              {/* Customer Section */}
              {activeTab === 'customer' && (
                <div className="bg-gradient-to-b from-[#F7F2E8] to-white rounded-3xl border-2 border-[#E6DCC8] p-8 md:p-12 lg:p-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-4 md:mb-6">
                    Search... Connect... or Let Weyaak Handle It
                  </h2>
                  <p className="text-base md:text-lg font-semibold text-gray-700 mb-8 md:mb-10 leading-8 max-w-2xl">
                    Your problem: How do you find the best trusted service provider? Biet Al Reef solves this with three different ways.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
                    {[
                      {
                        icon: Search,
                        title: 'Search Yourself',
                        desc: 'Browse a comprehensive directory of service providers and contractors. Choose what suits you.'
                      },
                      {
                        icon: MessageSquare,
                        title: 'Direct Connection',
                        desc: 'Contact providers directly. Compare quotes. Choose the best.'
                      },
                      {
                        icon: null,
                        isWeyaak: true,
                        title: 'Let Weyaak Help',
                        desc: 'Smart assistant that understands your needs and suggests the best solution.'
                      }
                    ].map((method, idx) => {
                      const Icon = method.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border-2 border-white p-6 md:p-8 hover:shadow-lg transition-all">
                          <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#0F3F1A]/10 flex items-center justify-center mb-4 md:mb-6">
                            {method.isWeyaak ? (
                              <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={56} height={56} className="object-cover rounded-lg" />
                            ) : (
                              <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#0F3F1A]" aria-hidden="true" />
                            )}
                          </div>
                          <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{method.title}</h3>
                          <p className="text-sm md:text-base font-semibold text-gray-600">{method.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-[#E6DCC8] p-6 md:p-8 mb-8 md:mb-10">
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-4 md:mb-6">What Will You Benefit?</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {[
                        'Direct connection with certified service providers',
                        'Request internal quotes and get multiple offers',
                        'Compare prices, services and ratings',
                        'Choose the best based on your needs and budget'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#0F3F1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-base md:text-lg font-semibold text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/en/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    Start Searching Now
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </Link>
                </div>
              )}

              {/* Provider Section */}
              {activeTab === 'provider' && (
                <div className="bg-gradient-to-b from-[#F7F2E8] to-white rounded-3xl border-2 border-[#E6DCC8] p-8 md:p-12 lg:p-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-4 md:mb-6">
                    Manage Your Business Entirely from Your Phone
                  </h2>
                  <p className="text-base md:text-lg font-semibold text-gray-700 mb-8 md:mb-10 leading-8 max-w-2xl">
                    Your problem: How do you reach customers and manage your business easily? Biet Al Reef solves this with integrated tools.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
                    {[
                      {
                        icon: Globe,
                        title: 'Build Your Digital Presence',
                        desc: 'Professional page that reflects your business. Appear in Google and AI search engines.'
                      },
                      {
                        icon: Zap,
                        title: 'Create Professional Quotes',
                        desc: 'Price quotes, contracts and invoices in minutes instead of hours.'
                      },
                      {
                        icon: MessageSquare,
                        title: 'Receive Client Requests',
                        desc: 'Tenders matched to your specialty and geographic area.'
                      },
                      {
                        icon: null,
                        isWeyaak: true,
                        title: 'Weyaak Helps You 24/7',
                        desc: 'Smart assistant that manages your business and helps at every step.'
                      }
                    ].map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border-2 border-white p-6 md:p-8 hover:shadow-lg transition-all">
                          <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#0F3F1A]/10 flex items-center justify-center mb-4 md:mb-6">
                            {feature.isWeyaak ? (
                              <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={56} height={56} className="object-cover rounded-lg" />
                            ) : (
                              <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#0F3F1A]" aria-hidden="true" />
                            )}
                          </div>
                          <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{feature.title}</h3>
                          <p className="text-sm md:text-base font-semibold text-gray-600">{feature.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-[#E6DCC8] p-6 md:p-8 mb-8 md:mb-10">
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-4 md:mb-6">What Will You Get?</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {[
                        'Professional page that properly reflects your business',
                        'Appear in search engines and AI assistants',
                        'Requests from real customers searching for your services',
                        'Tools to manage your business and organize projects',
                        'Continuous support from a specialized team and Weyaak AI'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#0F3F1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-base md:text-lg font-semibold text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    Start Your Business Now
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* ═══ CORE VALUES SECTION ═══ */}
          <section className="bg-[#0F3F1A] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
                  Biet Al Reef Identity
                </h2>
                <p className="text-base md:text-lg font-semibold text-white/80 max-w-2xl mx-auto">
                  Three core values that drive all our decisions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: '🎯',
                    title: 'For the Client',
                    desc: 'Search as you wish... and make your own decision. We make your options easier.'
                  },
                  {
                    icon: '🚀',
                    title: 'For Service Providers',
                    desc: 'Manage your entire business from your phone. We help you grow.'
                  },
                  {
                    icon: '🌍',
                    title: 'Biet Al Reef Identity',
                    desc: 'We build your digital presence permanently. Not temporary ads, but real presence.'
                  }
                ].map((value, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{value.icon}</div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3">{value.title}</h3>
                    <p className="text-sm md:text-base font-semibold text-white/80">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ UAE DIRECTORY SECTION ═══ */}
          <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                  UAE Comprehensive Directory
                </h2>
                <p className="text-base md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
                  Search for construction, contracting and maintenance services across all emirates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { name: 'Dubai', emoji: '🏙️' },
                  { name: 'Abu Dhabi', emoji: '🏛️' },
                  { name: 'Sharjah', emoji: '🏢' },
                  { name: 'Ajman', emoji: '🏗️' },
                  { name: 'Umm Al Quwain', emoji: '🔨' },
                  { name: 'Ras Al Khaimah', emoji: '🛠️' },
                  { name: 'Fujairah', emoji: '⚙️' }
                ].map((emirate, idx) => (
                  <Link key={idx} href={`/en/uae/${emirate.name.toLowerCase()}`} className="group rounded-2xl border-2 border-[#E6DCC8] bg-white p-6 hover:border-[#0F3F1A] hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl mb-3">{emirate.emoji}</div>
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{emirate.name}</h3>
                    <div className="flex items-center gap-2 text-[#0F3F1A] font-black group-hover:translate-x-2 transition-transform">
                      <span className="text-sm">Explore</span>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA ═══ */}
          <section className="bg-[#0F3F1A] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                From First Inquiry... to Final Invoice
              </h2>
              <p className="text-base md:text-lg font-semibold mb-8 md:mb-10 text-white/90">
                Biet Al Reef is the digital operating system for the construction and building sector in the UAE
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/en/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white text-[#0F3F1A] px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Start as a Client
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </Link>
                <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-white text-white px-6 md:px-8 py-3 text-sm md:text-base font-black hover:bg-white/10 transition-all hover:-translate-y-1">
                  Start as a Service Provider
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

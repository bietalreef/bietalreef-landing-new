import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';

export default function EnglishHome() {
  const featuredServices = SERVICE_CATEGORIES.slice(0, 8);
  return (
    <>
      <Head>
        <title>Biet Al Reef | UAE Construction, Maintenance and Building Services Guide</title>
        <meta name="description" content="Biet Al Reef is a UAE-focused guide for construction, maintenance, interior design, building materials, providers, cities and service areas." />
        <link rel="canonical" href="https://bietalreef.ae/en" />
        <link rel="alternate" hrefLang="ar" href="https://bietalreef.ae/" />
        <link rel="alternate" hrefLang="en" href="https://bietalreef.ae/en" />
      </Head>
      <EnglishLayout>
        <main>
          <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#B8922B] font-black mb-3">UAE building services guide</p>
              <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] leading-tight mb-6">Find construction, maintenance and design services across the UAE</h1>
              <p className="text-gray-600 text-lg leading-8 mb-8">Biet Al Reef organizes service categories, providers, UAE cities and local areas into searchable SEO-ready pages for customers and future marketplace operations.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/en/uae" className="rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">Browse UAE areas</Link>
                <Link href="/en/services" className="rounded-full bg-white border border-[#E6DCC8] px-6 py-3 font-black text-[#0F3F1A]">Explore services</Link>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-[#E6DCC8] p-6 shadow-sm">
              <div className="aspect-[4/3] rounded-[1.5rem] bg-[#F5EEE1] flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-5xl mb-4">🏡</div>
                  <h2 className="text-2xl font-black text-[#0F3F1A] mb-3">Biet Al Reef Ecosystem</h2>
                  <p className="text-gray-600 leading-7">Website for SEO, app for operations, and Weyaak as the smart assistant layer.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">Service categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {featuredServices.map((service) => (
                <Link key={service.slug} href={`/en/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-black text-[#0F3F1A] mb-2">{service.nameEn}</h3>
                  <p className="text-sm text-gray-600 leading-6">Explore this category across UAE cities and service areas.</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">UAE coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 text-center font-black text-[#0F3F1A] hover:border-[#D4AF37]">
                  {emirate.nameEn}
                </Link>
              ))}
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

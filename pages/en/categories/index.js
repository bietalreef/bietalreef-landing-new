import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { SERVICE_CATEGORIES } from '../../../data/siteTaxonomy';

export default function EnglishCategoriesIndex() {
  return (
    <>
      <Head>
        <title>Service Categories in the UAE | Biet Al Reef</title>
        <meta name="description" content="Browse English service category pages for construction, maintenance, materials, design and related services in the UAE." />
        <link rel="canonical" href="https://bietalreef.ae/en/categories" />
        <link rel="alternate" hrefLang="ar" href="https://bietalreef.ae/services" />
        <link rel="alternate" hrefLang="en" href="https://bietalreef.ae/en/categories" />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <p className="text-[#B8922B] font-black mb-3">Categories</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Service categories in the UAE</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">Browse structured English category pages for construction, maintenance, materials, design and service provider discovery across UAE cities and local areas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SERVICE_CATEGORIES.map((service) => (
              <Link key={service.slug} href={`/en/categories/${service.slug}`} className="bg-white rounded-2xl border border-[#E6DCC8] p-5 shadow-sm hover:border-[#D4AF37]">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h2 className="font-black text-[#0F3F1A] mb-2">{service.nameEn}</h2>
                <p className="text-sm text-gray-600 leading-6">Explore this category by emirate, area and local service page.</p>
              </Link>
            ))}
          </div>
        </main>
      </EnglishLayout>
    </>
  );
}

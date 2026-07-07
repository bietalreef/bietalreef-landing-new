import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { getAllServices } from '../../lib/services-detailed';

const serviceCopy = {
  'general-contracting': ['Construction Contracting', 'Certified contracting companies for villas, buildings and residential or commercial projects.'],
  'engineering-consultants': ['Engineering Consultation', 'Certified engineering offices and professional architectural and technical supervision.'],
  'general-maintenance': ['Maintenance Companies', 'Comprehensive maintenance for buildings and villas: plumbing, electrical, AC, painting and repair.'],
  carpentry: ['Craftsmen & Workers', 'Skilled workers for construction, finishing, carpentry, marble, gypsum, paint and more.'],
  workshops: ['Industrial Workshops', 'Metal, carpentry, aluminium, marble and glass workshops with high quality standards.'],
  'equipment-rental': ['Equipment Rental', 'Cranes, excavators, mixers and construction equipment for rental.'],
  'building-materials': ['Building Material Stores', 'Cement, steel, blocks, sand, gravel and finishing materials.'],
  'furniture-decor': ['Furniture & Décor', 'Furniture, custom majlis, curtains, carpets, accessories and décor.'],
  'cleaning-services': ['Cleaning Services', 'Home, building, post-construction and maintenance cleaning services.'],
};

const benefitCopy = {
  'general-contracting': ['Trusted contractors with documented project records', 'Compare quotation options clearly'],
  'engineering-consultants': ['Experienced engineering specialists', 'Design, approval and supervision support'],
  'general-maintenance': ['Fast response for maintenance requests', 'Specialized technicians across key trades'],
  carpentry: ['Skilled craftsmen across multiple trades', 'Direct service request based on the required work'],
  workshops: ['Specialized workshops by field', 'Custom fabrication and professional installation'],
  'equipment-rental': ['Reliable site equipment', 'Flexible daily, weekly and monthly options'],
  'building-materials': ['Material supply for projects', 'Construction and finishing material options'],
  'furniture-decor': ['Furniture and décor paths', 'Custom furnishing and interior support'],
  'cleaning-services': ['Cleaning for homes and buildings', 'Post-construction cleaning support'],
};

function getCategorySlug(serviceId) {
  const categoryMap = {
    construction: 'general-contracting',
    'interior-design': 'interior-design',
    'project-management': 'general-contracting',
    'engineering-consultants': 'engineering-consultants',
    maintenance: 'general-maintenance',
    'equipment-rental': 'equipment-rental',
    'cleaning-services': 'cleaning-services',
    'furniture-decoration': 'furniture-decor',
    'building-materials': 'building-materials',
    'specialized-services': 'general-maintenance',
    craftsmen: 'carpentry',
    workshops: 'workshops',
    cleaning: 'cleaning-services',
    'furniture-decor': 'furniture-decor',
  };
  return categoryMap[serviceId] || serviceId;
}

export default function ServicesEnglishPage({ services }) {
  return (
    <>
      <Head>
        <title>Services & Offers | Contracting, Maintenance, Interior Design and Building Materials in the UAE</title>
        <meta name="description" content="Biet Al Reef Services & Offers: choose the service type first, then send your project details to receive suitable guidance or a quotation." />
        <meta name="keywords" content="UAE construction services, contracting offers, maintenance, interior design, plumbing, electrical, AC, painting, carpentry, building materials" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/services" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/services" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/services" />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="flex-1 bg-white text-left">
          <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-xs mb-6"><span>⚒️</span><span>Independent services and offers section</span></div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Services & Offers</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-2">Choose the service type first, then send your project details to receive suitable guidance or a quotation.</p>
              <p className="text-base md:text-lg max-w-3xl mx-auto opacity-90">This section is separate from the UAE Directory. Search by location starts from the UAE Directory, while this path starts from the service type.</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const categorySlug = getCategorySlug(service.id);
                const copy = serviceCopy[categorySlug] || [service.titleEn || service.title, service.shortDesc];
                const benefits = benefitCopy[categorySlug] || ['Service path based on project details', 'Clear request before quotation'];
                return (
                  <Link key={service.id} href={categorySlug === 'workshops' ? '/services/workshops' : `/en/categories/${categorySlug}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full border border-gray-100 hover:border-primary">
                      <div className="h-40 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center overflow-hidden relative border-b-2 border-gray-100">
                        <div className="relative w-32 h-32"><Image src={service.icon} alt={copy[0]} fill className="object-contain p-2 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg" /></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{copy[0]}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{copy[1]}</p>
                        <div className="flex items-center gap-2 mb-4"><span className="text-yellow-400 text-lg">⭐</span><span className="font-bold text-gray-900">Available</span><span className="text-gray-500 text-xs">on request</span></div>
                        <div className="mb-4 pb-4 border-b border-gray-200"><p className="text-xs text-gray-600 mb-1">Pricing method:</p><p className="text-base font-bold text-primary bg-primary bg-opacity-10 px-3 py-2 rounded-lg inline-block">Based on project details</p></div>
                        <div className="mb-4"><ul className="space-y-1.5">{benefits.map((benefit) => (<li key={benefit} className="text-xs text-gray-700 flex items-start gap-2"><span className="text-primary font-bold flex-shrink-0 mt-0.5">✓</span><span>{benefit}</span></li>))}</ul></div>
                        <button className="w-full py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 text-sm group-hover:shadow-lg">Service details →</button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How do you choose the right service?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">1️⃣</div><h3 className="font-bold text-lg mb-3">Define the service</h3><p className="text-gray-600 text-sm">Start from the type of work required: contracting, maintenance, carpentry, marble or another service.</p></div>
                <div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">2️⃣</div><h3 className="font-bold text-lg mb-3">Add the details</h3><p className="text-gray-600 text-sm">Location, measurements, photos and required materials help guide the request.</p></div>
                <div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">3️⃣</div><h3 className="font-bold text-lg mb-3">Request a quotation</h3><p className="text-gray-600 text-sm">We do not rely on a general price. The correct price needs project details.</p></div>
              </div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps() {
  const services = getAllServices();
  return { props: { services } };
}

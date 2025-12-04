import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
// CSS styles are inline in this component

const cities = {
  'al-ain': {
    name: 'العين',
    arabicName: 'خدمات البناء والتصميم في العين',
    description: 'منصة بيت الريف توفر أفضل خدمات البناء والتصميم والمقاولات في العين. اختر من أفضل المقاولين والمصممين المعتمدين في العين.',
    keywords: 'خدمات البناء العين, مقاولات العين, تصميم داخلي العين, استشارات هندسية العين',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  },
  'abu-dhabi': {
    name: 'أبوظبي',
    arabicName: 'خدمات البناء والتصميم في أبوظبي',
    description: 'منصة بيت الريف توفر أفضل خدمات البناء والتصميم والمقاولات في أبوظبي. اختر من أفضل المقاولين والمصممين المعتمدين في أبوظبي.',
    keywords: 'خدمات البناء أبوظبي, مقاولات أبوظبي, تصميم داخلي أبوظبي, استشارات هندسية أبوظبي',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  },
  'dubai': {
    name: 'دبي',
    arabicName: 'خدمات البناء والتصميم في دبي',
    description: 'منصة بيت الريف توفر أفضل خدمات البناء والتصميم والمقاولات في دبي. اختر من أفضل المقاولين والمصممين المعتمدين في دبي.',
    keywords: 'خدمات البناء دبي, مقاولات دبي, تصميم داخلي دبي, استشارات هندسية دبي',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  },
  'sharjah': {
    name: 'الشارقة',
    arabicName: 'خدمات البناء والتصميم في الشارقة',
    description: 'منصة بيت الريف توفر أفضل خدمات البناء والتصميم والمقاولات في الشارقة. اختر من أفضل المقاولين والمصممين المعتمدين في الشارقة.',
    keywords: 'خدمات البناء الشارقة, مقاولات الشارقة, تصميم داخلي الشارقة, استشارات هندسية الشارقة',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  },
  'ajman': {
    name: 'عجمان',
    arabicName: 'خدمات البناء والتصميم في عجمان',
    description: 'منصة بيت الريف توفر أفضل خدمات البناء والتصميم والمقاولات في عجمان. اختر من أفضل المقاولين والمصممين المعتمدين في عجمان.',
    keywords: 'خدمات البناء عجمان, مقاولات عجمان, تصميم داخلي عجمان, استشارات هندسية عجمان',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  },
};

export default function CityServices({ city, cityData }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 'construction', name: 'مقاولات البناء', icon: '🏗️' },
    { id: 'interior-design', name: 'التصميم الداخلي', icon: '🛋️' },
    { id: 'project-management', name: 'إدارة المشاريع', icon: '📊' },
    { id: 'engineering-consultation', name: 'الاستشارات الهندسية', icon: '📐' },
  ];

  return (
    <>
      <Head>
        <title>{cityData.arabicName} | بيت الريف</title>
        <meta name="description" content={cityData.description} />
        <meta name="keywords" content={cityData.keywords} />
        <meta property="og:title" content={cityData.arabicName} />
        <meta property="og:description" content={cityData.description} />
        <meta property="og:image" content={cityData.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cityData.arabicName} />
        <meta name="twitter:description" content={cityData.description} />
        <meta name="twitter:image" content={cityData.image} />
        
        {/* Schema Markup for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': `بيت الريف - ${cityData.name}`,
            'description': cityData.description,
            'areaServed': cityData.name,
            'url': `https://bietalreef.ae/services/location/${city}`,
            'image': cityData.image,
            'telephone': '+971-XXXXXXXXX',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': cityData.name,
              'addressCountry': 'AE',
            },
          })}
        </script>
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5f3f 0%, #2d8659 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'right',
          direction: 'rtl',
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            {cityData.arabicName}
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', maxWidth: '800px', margin: '0 auto' }}>
            {cityData.description}
          </p>
          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
            🤖 وياك يساعدك في اختيار أفضل مزود خدمة في {cityData.name}
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
          <h2 style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '40px',
            fontWeight: 'bold',
            color: '#1a5f3f',
          }}>
            الخدمات المتاحة في {cityData.name}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
          }}>
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#1a5f3f' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '15px' }}>
                    اكتشف أفضل متخصصي {service.name} في {cityData.name}
                  </p>
                  <button style={{
                    backgroundColor: '#1a5f3f',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                  }}>
                    اعرف المزيد
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5f3f 0%, #2d8659 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          marginTop: '60px',
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 'bold' }}>
            جاهز لبدء مشروعك في {cityData.name}؟
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
            انضم إلى آلاف العملاء الراضين الذين استخدموا منصة بيت الريف وحققوا أحلامهم
          </p>
          <Link href="https://app.bietalreef.ae">
            <button style={{
              backgroundColor: 'white',
              color: '#1a5f3f',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}>
              ابدأ الآن مع وياك
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { city } = params;
  const cityData = cities[city];

  if (!cityData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
      cityData,
    },
    revalidate: 3600, // ISR: revalidate every hour
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(cities).map((city) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

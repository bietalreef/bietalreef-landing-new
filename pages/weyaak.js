import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';

const SITE_URL = 'https://bietalreef.ae';

export default function WeyaakPage() {
  const title = 'وياك | مساعد بيت الريف الذكي';
  const description = 'تحدث مباشرة مع وياك للبحث في خدمات ومزودي بيت الريف وتنظيم طلبك داخل دولة الإمارات.';

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="وياك, Weyaak, مساعد بيت الريف, مزودو الخدمات, خدمات الإمارات"
        canonicalPath="/weyaak"
        ogImage={`${SITE_URL}/og-weyaak.jpg`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${SITE_URL}/weyaak`,
          isPartOf: { '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL },
        }}
        breadcrumbs={[{ name: 'وياك', href: '/weyaak' }]}
      />
      <div dir="rtl" className="min-h-[100dvh] bg-[#F8F3E7] text-[#1F3D2B]">
        <Navbar />
        <main className="min-h-[calc(100dvh-70px)]" aria-label="واجهة محادثة وياك">
          <h1 className="sr-only">تحدث مع وياك، مساعد بيت الريف الذكي</h1>
        </main>
      </div>
    </>
  );
}

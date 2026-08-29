import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import SEOHead from '../../components/SEOHead';
import SectionBackBar from '../../components/SectionBackBar';
import ProductsSmartFooter from '../../components/ProductsSmartFooter';
import SectionCategoryHero from '../../components/SectionCategoryHero';
import PublishedEntityGrid from '../../components/PublishedEntityGrid';
import {
  getPublishedSectionEntities,
  getUaeFooterCards,
} from '../../lib/platformDirectoryCards';
import { getSectionActivitySlug } from '../../lib/sectionCardRoutes';

const categories = [
  { id: 'building-materials', title: 'مواد البناء الأساسية', desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.', icon: '🏗️', image: '/images/sector-cards/building-materials-stores-card.webp' },
  { id: 'finishing-works', title: 'مواد التشطيب والديكور', desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.', icon: '✨', image: '/images/sector-cards/factories-suppliers-workshops-card.webp' },
  { id: 'smart-systems', title: 'الإنارة والأنظمة الذكية', desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.', icon: '💡', image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp' },
  { id: 'furniture-decor', title: 'الأثاث والمفروشات', desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.', icon: '🛋️', image: '/images/sector-cards/aluminium-glass-wood-card.webp' }
];

export default function MarketplaceCategoryPage({
  category,
  directoryCards = [],
  publishedProducts = [],
}) {
  const title = `${category.title} | المنتجات والمتاجر`;
  const description = `تصفح ${category.title} داخل قسم المنتجات والمتاجر في بيت الريف.`;
  const faqItems = [
    [`ما هي ${category.title}؟`, category.desc],
    ['هل هذه صفحة خدمة؟', 'لا. هذه الصفحة تتبع قسم المنتجات والمتاجر، وليست قسم الخدمات والعروض أو دليل الإمارات.'],
    ['كيف أطلب عرض سعر؟', 'أرسل نوع المنتج والكمية والموقع ليتم توجيه الطلب بطريقة مناسبة.'],
  ];
  const pricedProducts = publishedProducts.filter((item) => Number(item.priceValue) > 0);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: `https://bietalreef.ae/marketplace/${category.id}`,
      inLanguage: 'ar-AE',
      isPartOf: {
        '@type': 'WebSite',
        name: 'بيت الريف',
        url: 'https://bietalreef.ae',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `المنتجات المنشورة داخل ${category.title}`,
      numberOfItems: pricedProducts.length,
      itemListElement: pricedProducts.map((item, index) => {
        const productUrl = `https://bietalreef.ae${item.href || item.providerHref}`;
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: productUrl,
          image: item.image
            ? (item.image.startsWith('http') ? item.image : `https://bietalreef.ae${item.image}`)
            : undefined,
        };
      }),
    },
  ];

  return (
    <>
      <SEOHead
        title={`${title} | بيت الريف`}
        description={description}
        keywords={`${category.title}, منتجات البناء, مواد التشطيب, المنتجات والمتاجر, بيت الريف`}
        canonicalPath={`/marketplace/${category.id}`}
        ogImage={`https://bietalreef.ae${category.image}`}
        structuredData={structuredData}
        breadcrumbs={[{ name: 'المنتجات والمتاجر', href: '/marketplace' }, { name: category.title, href: `/marketplace/${category.id}` }]}
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="المنتجات والمتاجر" />
        <SectionBackBar href="/marketplace" label="العودة إلى المنتجات والمتاجر" />
        <main>
          <SectionCategoryHero locale="ar" type="products" title={category.title} description={category.desc} image={category.image} />

          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">مسار المنتجات والمتاجر</h2>
              <p className="text-gray-600 leading-8">هذه الصفحة مخصصة للمنتجات والمواد. إذا كنت تبحث عن خدمة تنفيذية فانتقل إلى الخدمات والعروض، وإذا كنت تبحث حسب الإمارة فابدأ من دليل الإمارات.</p>
            </div>
          </section>

          <PublishedEntityGrid items={publishedProducts} locale="ar" type="product" />

          {publishedProducts.length === 0 && (
            <section className="max-w-6xl mx-auto px-4 py-10" aria-label="قائمة المنتجات">
              <div className="rounded-3xl border border-[#E6DCC8] bg-white p-10 text-center shadow-sm" role="status">
                <h2 className="text-2xl font-black text-[#0F3F1A]">لا توجد منتجات منشورة حاليًا</h2>
                <p className="mt-3 text-gray-600 leading-8">لا توجد بطاقة منتج منشورة من قاعدة البيانات داخل تصنيف {category.title}. يمكنك إرسال طلبك وسنساعدك في الوصول إلى المورد أو المتجر المناسب.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-primary px-7 py-3 text-sm font-black text-white">اطلب المنتج عبر واتساب</a>
                  <Link href="/marketplace" className="rounded-2xl border border-[#E6DCC8] px-7 py-3 text-sm font-black text-primary">العودة إلى المنتجات والمتاجر</Link>
                </div>
              </div>
            </section>
          )}

          <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['نوع المنتج', 'الكمية المطلوبة', 'موقع التوريد'].map((item) => (
                <div key={item} className="rounded-3xl bg-white border border-[#E6DCC8] p-7 shadow-sm">
                  <h3 className="font-black text-[#0F3F1A] mb-3">{item}</h3>
                  <p className="text-sm leading-8 text-gray-600">هذه المعلومة تساعد على تجهيز طلب المنتج أو المادة بطريقة أدق.</p>
                </div>
              ))}
            </div>
          </section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${category.title}`} />
        </main>
        <ProductsSmartFooter locale="ar" directoryCards={directoryCards} />
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  if (params.slug === '[slug]') {
    return {
      redirect: {
        destination: '/marketplace',
        permanent: true,
      },
    };
  }
  const category = categories.find((item) => item.id === params.slug);
  if (!category) return { notFound: true };
  const activitySlug = getSectionActivitySlug('products_stores', category.id);
  const [directoryCards, publishedProducts] = await Promise.all([
    getUaeFooterCards('ar'),
    getPublishedSectionEntities('ar', 'products_stores', activitySlug),
  ]);
  return { props: { category, directoryCards, publishedProducts }, revalidate: 300 };
}

export async function getStaticPaths() {
  return { paths: categories.map((category) => ({ params: { slug: category.id } })), fallback: 'blocking' };
}

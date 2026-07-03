import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';

const categories = [
  { id: 'building-materials', title: 'مواد البناء الأساسية', desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.', icon: '🏗️' },
  { id: 'finishing-works', title: 'مواد التشطيب والديكور', desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.', icon: '✨' },
  { id: 'smart-systems', title: 'الإنارة والأنظمة الذكية', desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.', icon: '💡' },
  { id: 'furniture-decor', title: 'الأثاث والمفروشات', desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.', icon: '🛋️' }
];

export default function MarketplaceCategoryPage({ category }) {
  const title = `${category.title} | المنتجات والمتاجر`;
  const faqItems = [
    [`ما هي ${category.title}؟`, category.desc],
    ['هل هذه صفحة خدمة؟', 'لا. هذه الصفحة تتبع قسم المنتجات والمتاجر، وليست قسم الخدمات والعروض أو دليل الإمارات.'],
    ['كيف أطلب عرض سعر؟', 'أرسل نوع المنتج والكمية والموقع ليتم توجيه الطلب بطريقة مناسبة.'],
  ];

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={`تصفح ${category.title} داخل قسم المنتجات والمتاجر في بيت الريف.`} />
        <link rel="canonical" href={`https://bietalreef.ae/marketplace/${category.id}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="المنتجات والمتاجر" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">المنتجات والمتاجر</span>
              <div className="mt-6 text-5xl">{category.icon}</div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight">{category.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/90 mx-auto md:mx-0">{category.desc}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">اطلب عرض سعر</a>
                <Link href="/marketplace" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">كل المنتجات والمتاجر</Link>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-[#0F3F1A] mb-4">مسار المنتجات والمتاجر</h2>
              <p className="text-gray-600 leading-8">هذه الصفحة مخصصة للمنتجات والمواد. إذا كنت تبحث عن خدمة تنفيذية فانتقل إلى الخدمات والعروض، وإذا كنت تبحث حسب الإمارة فابدأ من دليل الإمارات.</p>
            </div>
          </section>

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
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const category = categories.find((item) => item.id === params.slug);
  if (!category) return { notFound: true };
  return { props: { category }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: categories.map((category) => ({ params: { slug: category.id } })), fallback: 'blocking' };
}

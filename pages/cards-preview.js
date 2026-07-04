import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmartEntityCard from '../components/cards/SmartEntityCard';
import { sampleProviders, sampleServices, sampleProducts, sampleOffers, allSampleCards } from '../data/sampleCards';

const sections = [
  { title: 'كروت مزودي الخدمات', items: sampleProviders },
  { title: 'كروت الخدمات', items: sampleServices },
  { title: 'كروت المنتجات', items: sampleProducts },
  { title: 'كروت العروض', items: sampleOffers },
];

export default function CardsPreviewPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <Navbar pageTitle="نماذج الكروت" />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
          <div className="rounded-[2.5rem] border border-[#E6DCC8] bg-white p-6 text-center shadow-xl shadow-[#0F3F1A]/7 md:p-10">
            <span className="inline-flex rounded-full bg-[#F7F2E8] px-4 py-2 text-xs font-black text-[#6F5400]">Biet Al Reef Card Engine</span>
            <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-6xl">تصميم الكروت الديناميكية</h1>
            <p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-9 text-gray-600 md:text-lg">
              كروت React حقيقية مبنية على داتا تجريبية لأركلين ومصنع الحوت، تمهيداً لربطها مباشرة مع Supabase.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8">
          <div className="mb-6 rounded-[2rem] border border-[#E6DCC8] bg-white/80 p-5 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] md:text-4xl">Universal Entity Cards</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-gray-600">كل كارت يقرأ entityType ويعرض التصميم المناسب تلقائياً.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {allSampleCards.slice(0, 4).map((item) => <SmartEntityCard key={item.id} item={item} />)}
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="mx-auto max-w-7xl px-4 py-8 md:py-10">
            <h2 className="mb-5 text-2xl font-black text-[#0F3F1A] md:text-3xl">{section.title}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item) => <SmartEntityCard key={item.id} item={item} />)}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}

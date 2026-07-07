import SmartEntityCard from './cards/SmartEntityCard';
import { sampleProviders, sampleServices, sampleProducts, sampleOffers } from '../data/sampleCards';

const premiumSeoCards = [
  sampleProviders.find((item) => item.id === 'al-hoot-marble-granite-factory'),
  sampleServices.find((item) => item.id === 'al-hoot-marble-installation'),
  sampleProducts.find((item) => item.id === 'travertine-marble-al-hoot'),
  sampleOffers.find((item) => item.id === 'al-hoot-majlis-marble-package'),
].filter(Boolean);

export default function SeoProofCards({
  title = 'مسار حقيقي داخل الصفحة',
  desc = 'هذه ليست صفحة SEO نصية فقط؛ يوجد مسار واضح يربط العميل بمزود خدمة وخدمة ومنتج أو طلب معاينة داخل نفس الرحلة.',
  eyebrow = 'SEO / AEO / GEO Proof',
}) {
  if (!premiumSeoCards.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-7 rounded-[2rem] border border-[#E6DCC8] bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] p-6 shadow-sm md:p-8">
        <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white/70 px-4 py-1.5 text-xs font-black text-[#8A6A00]">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-4xl text-sm font-semibold leading-8 text-[#304333] md:text-base">{desc}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['صفحة SEO', 'مزود موثق', 'خدمة قابلة للطلب', 'منتج/معاينة واضحة'].map((item) => (
            <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-white/70 px-4 py-3 text-center text-xs font-black text-[#0F3F1A] shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {premiumSeoCards.map((item) => <SmartEntityCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}

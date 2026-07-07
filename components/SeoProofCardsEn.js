import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, Box, Building2, ClipboardCheck, Gem, MapPin } from 'lucide-react';

const cards = [
  {
    type: 'Verified provider',
    icon: Building2,
    title: 'White Whale Marble & Granite Factory',
    desc: 'A real provider profile for marble, granite and quartz services in Al Ain and Abu Dhabi.',
    image: '/images/providers/al-hoot/cover.jpg',
    href: '/en/providers/al-hoot-marble-granite-factory',
    cta: 'Open provider profile',
  },
  {
    type: 'Service path',
    icon: ClipboardCheck,
    title: 'Supply, fabrication and installation',
    desc: 'A clear service path for kitchens, façades, floors, stairs and washbasins based on project details.',
    image: '/images/providers/al-hoot/gallery-2.jpg',
    href: '/en/providers/al-hoot-marble-granite-factory',
    cta: 'Request service details',
  },
  {
    type: 'Product intent',
    icon: Box,
    title: 'Marble, granite and quartz by request',
    desc: 'A product-oriented path for materials, measurements, finishes and project-based quotation requests.',
    image: '/images/providers/al-hoot/gallery-1.jpg',
    href: '/en/providers/al-hoot-marble-granite-factory',
    cta: 'View material path',
  },
  {
    type: 'Quotation step',
    icon: Gem,
    title: 'Site review or quotation preparation',
    desc: 'A practical next step that turns SEO traffic into an inquiry or quotation journey.',
    image: '/images/providers/al-hoot/gallery-5.jpg',
    href: '/en/providers/al-hoot-marble-granite-factory',
    cta: 'Start quotation path',
  },
];

export default function SeoProofCardsEn({
  title = 'Real SEO path inside this page',
  desc = 'This is not only a generic SEO page. It connects the visitor to a verified provider, a service path, a product intent and a quotation step.',
  eyebrow = 'SEO / AEO / GEO Proof',
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 text-left">
      <div className="mb-7 rounded-[2rem] border border-[#E6DCC8] bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] p-6 shadow-sm md:p-8">
        <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white/70 px-4 py-1.5 text-xs font-black text-[#8A6A00]">{eyebrow}</span>
        <h2 className="mt-4 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-4xl text-sm font-semibold leading-8 text-[#304333] md:text-base">{desc}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['SEO page', 'Verified provider', 'Requestable service', 'Product/quotation path'].map((item) => (
            <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-white/70 px-4 py-3 text-center text-xs font-black text-[#0F3F1A] shadow-sm">{item}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="group overflow-hidden rounded-[2rem] border border-[#B8922B]/25 bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] shadow-xl shadow-[#8A6A00]/10 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-44 bg-[#EFE3CC]">
                <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 360px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/45 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-xs font-black text-[#8A6A00] shadow-sm">
                  <Icon className="h-3.5 w-3.5" />
                  {card.type}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700"><BadgeCheck className="h-3.5 w-3.5" /> Real path</div>
                <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{card.title}</h3>
                <p className="mt-2 min-h-[78px] text-sm font-semibold leading-7 text-[#304333]">{card.desc}</p>
                <div className="mt-4 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#304333]"><MapPin className="h-3.5 w-3.5 text-[#8A6A00]" /> Al Ain · Abu Dhabi</div>
                <div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#12110B] transition group-hover:bg-[#b8922b]">
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

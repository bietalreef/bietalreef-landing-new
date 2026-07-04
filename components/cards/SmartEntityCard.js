import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Clock3,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Tag,
  Wrench,
} from 'lucide-react';

const cardTypeConfig = {
  provider: {
    label: 'مزود خدمة',
    Icon: Building2,
    accent: 'text-[#0F3F1A]',
  },
  service: {
    label: 'خدمة',
    Icon: Wrench,
    accent: 'text-[#0F3F1A]',
  },
  product: {
    label: 'منتج',
    Icon: Package,
    accent: 'text-[#6F5400]',
  },
  offer: {
    label: 'عرض',
    Icon: Tag,
    accent: 'text-[#6F5400]',
  },
};

function CardShell({ children, image, href = '#', className = '' }) {
  return (
    <article className={`group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F3F1A]/10 ${className}`}>
      {image ? (
        <div className="relative h-40 overflow-hidden bg-[#F7F2E8]">
          <Image src={image} alt="" fill className="object-cover object-center transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 420px" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/55" />
        </div>
      ) : null}
      <Link href={href} className="absolute inset-0 z-10" aria-label="فتح التفاصيل" />
      <div className="relative z-20 pointer-events-none">{children}</div>
    </article>
  );
}

function TypePill({ type }) {
  const config = cardTypeConfig[type] || cardTypeConfig.provider;
  const Icon = config.Icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/88 px-3 py-1 text-xs font-black text-[#0F3F1A] shadow-sm backdrop-blur">
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

function ActionRow({ href, whatsapp, primary = 'عرض التفاصيل', secondary = 'واتساب' }) {
  return (
    <div className="pointer-events-auto mt-5 grid grid-cols-2 gap-2">
      <Link href={href || '#'} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white transition hover:bg-[#143D1F]">
        {primary}
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <a href={whatsapp || '#'} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#0F3F1A]">
        <MessageCircle className="h-4 w-4" />
        {secondary}
      </a>
    </div>
  );
}

export function ProviderCard({ item }) {
  return (
    <CardShell image={item.coverImage} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <TypePill type="provider" />
        {item.verified ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700"><BadgeCheck className="h-3.5 w-3.5" /> موثق</span> : null}
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="-mt-12 mb-4 flex items-end gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-[#F7F2E8] text-2xl font-black text-[#6F5400] shadow-lg">
            {item.logoText || item.name?.slice(0, 1)}
          </div>
          <div className="mb-1 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">{item.providerType}</div>
        </div>
        <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-[52px] text-sm font-semibold leading-7 text-gray-600">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-bold text-gray-700"><MapPin className="h-3.5 w-3.5 text-[#6F5400]" /> {item.city} - {item.area}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-bold text-gray-700"><Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {item.rating} ({item.reviewsCount})</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.specialties?.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}
        </div>
        <ActionRow href={item.href} whatsapp={item.whatsapp} primary="عرض الملف" />
      </div>
    </CardShell>
  );
}

export function ServiceOfferCard({ item }) {
  const isOffer = item.entityType === 'offer';
  return (
    <CardShell image={item.image} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <TypePill type={isOffer ? 'offer' : 'service'} />
        <span className="inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">
          {isOffer ? <Sparkles className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
          {isOffer ? item.badge : item.priceType}
        </span>
      </div>
      <div className="px-5 pb-5 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{item.category || item.providerName}</span>
          {isOffer ? <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500"><Clock3 className="h-3.5 w-3.5" /> {item.validUntil}</span> : null}
        </div>
        <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{item.title}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-gray-600">{item.shortDescription || item.summary}</p>
        <div className="mt-4 rounded-2xl bg-[#FDFBF7] p-3 text-sm font-bold text-gray-700">
          <Store className="ml-2 inline h-4 w-4 text-[#6F5400]" />
          {item.providerName}
        </div>
        {!isOffer && item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}</div>
        ) : null}
        <ActionRow href={item.href} primary={isOffer ? 'استفد من العرض' : 'اطلب عرض'} secondary="اسأل وياك" />
      </div>
    </CardShell>
  );
}

export function ProductCard({ item }) {
  return (
    <CardShell image={item.image} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <TypePill type="product" />
        <span className="rounded-full bg-white/88 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">{item.priceType}</span>
      </div>
      <div className="px-5 pb-5 pt-5">
        <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{item.category}</span>
        <h3 className="mt-3 text-xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <div className="mt-4 space-y-2 rounded-2xl bg-[#FDFBF7] p-4 text-sm font-semibold text-gray-700">
          <p><span className="font-black text-[#0F3F1A]">المورد:</span> {item.supplierName}</p>
          <p><span className="font-black text-[#0F3F1A]">الخامة:</span> {item.material}</p>
          <p><span className="font-black text-[#0F3F1A]">متوفر في:</span> {item.availableArea}</p>
        </div>
        <ActionRow href={item.href} primary="طلب سعر" secondary="تواصل" />
      </div>
    </CardShell>
  );
}

export default function SmartEntityCard({ item }) {
  if (!item) return null;
  if (item.entityType === 'provider') return <ProviderCard item={item} />;
  if (item.entityType === 'product') return <ProductCard item={item} />;
  return <ServiceOfferCard item={item} />;
}

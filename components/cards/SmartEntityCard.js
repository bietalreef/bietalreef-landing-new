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
  Store,
  Tag,
  Wrench,
} from 'lucide-react';

const cardTypeConfig = {
  provider: { label: 'مزود خدمة', Icon: Building2 },
  service: { label: 'خدمة', Icon: Wrench },
  product: { label: 'منتج', Icon: Package },
  offer: { label: 'عرض', Icon: Tag },
};

const isPremium = (item) => item?.premium || item?.id?.includes('al-hoot') || item?.providerName?.includes('الحوت') || item?.supplierName?.includes('الحوت');

function CardShell({ children, image, href = '#', className = '', imageClassName = 'h-40' }) {
  return (
    <article className={`group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F3F1A]/10 ${className}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-[#F7F2E8] ${imageClassName}`}>
          <Image src={image} alt="" fill className="object-cover object-center transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 420px" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/45" />
        </div>
      ) : null}
      <Link href={href} className="absolute inset-0 z-10" aria-label="فتح التفاصيل" />
      <div className="relative z-20 pointer-events-none">{children}</div>
    </article>
  );
}

function TypePill({ type, premium = false }) {
  const config = cardTypeConfig[type] || cardTypeConfig.provider;
  const Icon = config.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black shadow-sm backdrop-blur ${premium ? 'border-[#B8922B]/35 bg-[#FFF8E5]/90 text-[#8A6A00]' : 'border-white/50 bg-white/88 text-[#0F3F1A]'}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

function ActionRow({ href, whatsapp, primary = 'عرض التفاصيل', secondary = 'واتساب', premium = false }) {
  return (
    <div className="pointer-events-auto mt-5 grid grid-cols-2 gap-2">
      <Link href={href || '#'} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${premium ? 'bg-[#D4AF37] text-[#12110B] hover:bg-[#b8922b]' : 'bg-[#0F3F1A] text-white hover:bg-[#143D1F]'}`}>
        {primary}
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <a href={whatsapp || '#'} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${premium ? 'border-[#B8922B]/35 bg-white/70 text-[#0F3F1A] hover:bg-white' : 'border-[#E6DCC8] bg-[#FDFBF7] text-[#0F3F1A] hover:border-[#0F3F1A]'}`}>
        <MessageCircle className="h-4 w-4" />
        {secondary}
      </a>
    </div>
  );
}

function PremiumAlHootProviderCard({ item }) {
  return (
    <CardShell image={item.coverImage} href={item.href} imageClassName="h-48" className="border-[#B8922B]/25 bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] shadow-xl shadow-[#8A6A00]/8">
      <div className="absolute right-4 top-4 flex flex-wrap items-center gap-2">
        <TypePill type="provider" premium />
        {item.verified ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/95 px-3 py-1 text-xs font-black text-emerald-700"><BadgeCheck className="h-3.5 w-3.5" /> موثق</span> : null}
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="-mt-14 mb-4 flex items-end justify-between gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] border-4 border-white bg-gradient-to-br from-[#FFF8EA] to-[#D4AF37] text-3xl font-black text-[#0F3F1A] shadow-xl">
            {item.logoText || 'ح'}
          </div>
          <div className="mb-2 rounded-full border border-[#B8922B]/25 bg-white/90 px-3 py-1 text-xs font-black text-[#8A6A00] shadow-sm backdrop-blur">{item.providerType}</div>
        </div>

        <h3 className="text-2xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-[#304333]">{item.summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniTrust label="رخام" value="طبيعي" />
          <MiniTrust label="جرانيت" value="تشطيبات" />
          <MiniTrust label="كوارتز" value="مطابخ" />
          <MiniTrust label="UAE" value="حسب الطلب" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/75 px-3 py-1 text-xs font-bold text-[#304333]"><MapPin className="h-3.5 w-3.5 text-[#8A6A00]" /> {item.city} - {item.area}</span>
          {item.specialties?.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white/80 px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}
        </div>

        <ActionRow href={item.href} whatsapp={item.whatsapp} primary="عرض الملف" premium />
      </div>
    </CardShell>
  );
}

function MiniTrust({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E6DCC8] bg-white/70 px-3 py-3 text-center shadow-sm">
      <div className="text-sm font-black text-[#8A6A00]">{label}</div>
      <div className="mt-1 text-[11px] font-bold text-[#304333]">{value}</div>
    </div>
  );
}

function PremiumEntityCard({ item }) {
  const isOffer = item.entityType === 'offer';
  const isService = item.entityType === 'service';
  const isProduct = item.entityType === 'product';

  return (
    <CardShell image={item.image} href={item.href} imageClassName="h-44" className="border-[#B8922B]/25 bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] shadow-xl shadow-[#8A6A00]/8">
      <div className="absolute right-4 top-4 flex flex-wrap items-center gap-2">
        <TypePill type={item.entityType} premium />
        <span className="inline-flex items-center gap-1 rounded-full border border-[#B8922B]/30 bg-white/90 px-3 py-1 text-xs font-black text-[#8A6A00] shadow-sm backdrop-blur">
          {isOffer ? <Sparkles className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
          {isOffer ? item.badge : item.priceType}
        </span>
      </div>

      <div className="px-5 pb-5 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-black text-[#8A6A00]">{item.category || 'رخام وجرانيت'}</span>
          {isOffer ? <span className="inline-flex items-center gap-1 text-xs font-bold text-[#304333]"><Clock3 className="h-3.5 w-3.5" /> {item.validUntil}</span> : null}
        </div>

        <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{item.title || item.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-[#304333]">{item.shortDescription || item.summary || item.material}</p>

        <div className="mt-4 rounded-2xl border border-[#E6DCC8] bg-white/70 p-4 text-sm font-semibold text-[#304333]">
          <Store className="ml-2 inline h-4 w-4 text-[#8A6A00]" />
          {item.providerName || item.supplierName}
          {isProduct ? (
            <div className="mt-3 space-y-1 text-xs leading-6">
              <p><span className="font-black text-[#0F3F1A]">الخامة:</span> {item.material}</p>
              <p><span className="font-black text-[#0F3F1A]">النطاق:</span> {item.availableArea}</p>
            </div>
          ) : null}
        </div>

        {isService && item.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white/80 px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}</div> : null}

        <ActionRow href={item.href} primary={isOffer ? 'طلب المعاينة' : isProduct ? 'طلب سعر' : 'اطلب الخدمة'} secondary="تواصل" premium />
      </div>
    </CardShell>
  );
}

export function ProviderCard({ item }) {
  if (isPremium(item)) return <PremiumAlHootProviderCard item={item} />;

  return (
    <CardShell image={item.coverImage} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <TypePill type="provider" />
        {item.verified ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700"><BadgeCheck className="h-3.5 w-3.5" /> موثق</span> : null}
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="-mt-12 mb-4 flex items-end gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-[#F7F2E8] text-2xl font-black text-[#6F5400] shadow-lg">{item.logoText || item.name?.slice(0, 1)}</div>
          <div className="mb-1 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">{item.providerType}</div>
        </div>
        <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-[52px] text-sm font-semibold leading-7 text-gray-600">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-bold text-gray-700"><MapPin className="h-3.5 w-3.5 text-[#6F5400]" /> {item.city} - {item.area}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{item.specialties?.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}</div>
        <ActionRow href={item.href} whatsapp={item.whatsapp} primary="عرض الملف" />
      </div>
    </CardShell>
  );
}

export function ServiceOfferCard({ item }) {
  if (isPremium(item)) return <PremiumEntityCard item={item} />;

  const isOffer = item.entityType === 'offer';
  return (
    <CardShell image={item.image} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2"><TypePill type={isOffer ? 'offer' : 'service'} /><span className="inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">{isOffer ? <Sparkles className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}{isOffer ? item.badge : item.priceType}</span></div>
      <div className="px-5 pb-5 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{item.category || item.providerName}</span>{isOffer ? <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500"><Clock3 className="h-3.5 w-3.5" /> {item.validUntil}</span> : null}</div>
        <h3 className="text-xl font-black leading-tight text-[#0F3F1A]">{item.title}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-gray-600">{item.shortDescription || item.summary}</p>
        <div className="mt-4 rounded-2xl bg-[#FDFBF7] p-3 text-sm font-bold text-gray-700"><Store className="ml-2 inline h-4 w-4 text-[#6F5400]" />{item.providerName}</div>
        {!isOffer && item.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}</div> : null}
        <ActionRow href={item.href} primary={isOffer ? 'استفد من العرض' : 'اطلب عرض'} secondary="اسأل وياك" />
      </div>
    </CardShell>
  );
}

export function ProductCard({ item }) {
  if (isPremium(item)) return <PremiumEntityCard item={item} />;

  return (
    <CardShell image={item.image} href={item.href}>
      <div className="absolute right-4 top-4 flex items-center gap-2"><TypePill type="product" /><span className="rounded-full bg-white/88 px-3 py-1 text-xs font-black text-[#6F5400] shadow-sm backdrop-blur">{item.priceType}</span></div>
      <div className="px-5 pb-5 pt-5">
        <span className="rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-black text-[#6F5400]">{item.category}</span>
        <h3 className="mt-3 text-xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <div className="mt-4 space-y-2 rounded-2xl bg-[#FDFBF7] p-4 text-sm font-semibold text-gray-700"><p><span className="font-black text-[#0F3F1A]">المورد:</span> {item.supplierName}</p><p><span className="font-black text-[#0F3F1A]">الخامة:</span> {item.material}</p><p><span className="font-black text-[#0F3F1A]">متوفر في:</span> {item.availableArea}</p></div>
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

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
const isArkline = (item) => item?.id === 'arkline' || item?.href === '/providers/arkline' || item?.name?.includes('أركلين');

function CardShell({ children, href = '#', className = '' }) {
  return (
    <article className={`group relative overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F3F1A]/10 ${className}`}>
      <Link href={href} className="absolute inset-0 z-10" aria-label="فتح التفاصيل" />
      <div className="relative z-20 pointer-events-none">{children}</div>
    </article>
  );
}

function ImagePanel({ src, alt = '', className = 'h-44', premium = false }) {
  if (!src) return null;
  return (
    <div className={`relative overflow-hidden bg-[#F7F2E8] ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover object-center transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 420px" />
      <div className={premium ? 'absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/35 via-transparent to-transparent' : 'absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/35'} />
    </div>
  );
}

function TypePill({ type, premium = false }) {
  const config = cardTypeConfig[type] || cardTypeConfig.provider;
  const Icon = config.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black shadow-sm backdrop-blur ${premium ? 'border-[#B8922B]/35 bg-[#FFF8E5]/95 text-[#8A6A00]' : 'border-white/50 bg-white/88 text-[#0F3F1A]'}`}>
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
      <a href={whatsapp || href || '#'} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${premium ? 'border-[#B8922B]/35 bg-white text-[#0F3F1A] hover:bg-[#FFF8E5]' : 'border-[#E6DCC8] bg-[#FDFBF7] text-[#0F3F1A] hover:border-[#0F3F1A]'}`}>
        <MessageCircle className="h-4 w-4" />
        {secondary}
      </a>
    </div>
  );
}

function MiniTrust({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E6DCC8] bg-white/80 px-3 py-3 text-center shadow-sm">
      <div className="text-sm font-black text-[#8A6A00]">{label}</div>
      <div className="mt-1 text-[11px] font-bold text-[#304333]">{value}</div>
    </div>
  );
}

function ModernArklineProviderCard({ item }) {
  return (
    <CardShell
      href={item.href}
      className="border-[#D7C7A7] bg-gradient-to-br from-white via-[#FBF8F1] to-[#EEE6D8] shadow-[0_22px_60px_rgba(41,63,45,.13)]"
    >
      <div className="relative h-52 overflow-hidden bg-[#EFE7D8] sm:h-56">
        <Image
          src={item.coverImage || '/images/providers/arkline/arkline-hero-exterior.webp'}
          alt={item.name}
          fill
          className="object-cover object-center transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 92vw, 540px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102F1A]/55 via-transparent to-black/5" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/55 bg-white/88 px-3 py-1.5 text-xs font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
            <Building2 className="h-3.5 w-3.5 text-[#A66B19]" />
            ورشة نجارة وتصميم داخلي
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8C65A]/45 bg-[#0F3F1A]/92 px-3 py-1.5 text-xs font-black text-white shadow-lg backdrop-blur-xl">
            <BadgeCheck className="h-3.5 w-3.5 text-[#F4CA61]" />
            مسجل لدى بيت الريف
          </span>
        </div>
      </div>

      <div className="relative px-5 pb-5 pt-14 md:px-6">
        <div className="absolute -top-12 right-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_12px_0_rgba(96,63,9,.10),0_20px_38px_rgba(52,47,35,.22)]">
          <Image
            src="/images/providers/arkleen-logo.png"
            alt="شعار أركلين"
            fill
            className="object-contain p-1.5"
            sizes="96px"
          />
          <span className="absolute -bottom-1 -left-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4CA61] shadow-md">
            <BadgeCheck className="h-4 w-4" />
          </span>
        </div>

        <div className="mr-28 min-h-[48px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#FFF2CF] px-3 py-1 text-[11px] font-black text-[#8A5C0B]">تأسيس 2015</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">يقبل طلبات الأسعار</span>
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <p className="mt-3 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-[#4F5D52]">{item.summary}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniTrust label="مطابخ" value="حسب المقاس" />
          <MiniTrust label="خزائن" value="تفصيل خاص" />
          <MiniTrust label="أبواب" value="توريد وتركيب" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#E6DCC8] bg-white/88 px-3 py-1 text-xs font-bold text-[#304333]">
            <MapPin className="h-3.5 w-3.5 text-[#A66B19]" />
            {item.city} - {item.area}
          </span>
          {item.specialties?.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white/88 px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>
          ))}
        </div>

        <ActionRow href={item.href} whatsapp={item.whatsapp} primary="فتح الملف الحديث" secondary="واتساب" />
      </div>
    </CardShell>
  );
}

function PremiumAlHootProviderCard({ item }) {
  return (
    <CardShell href={item.href} className="border-[#B8922B]/25 bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] shadow-xl shadow-[#8A6A00]/8">
      <ImagePanel src={item.coverImage} alt={item.name} className="h-44" premium />

      <div className="px-5 pb-5 pt-4">
        <div className="-mt-12 mb-4 flex items-end justify-between gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] border-4 border-white bg-gradient-to-br from-[#FFF8EA] to-[#D4AF37] text-3xl font-black text-[#0F3F1A] shadow-xl">
            {item.logoText || 'ح'}
          </div>
          <div className="mb-2 flex flex-wrap justify-end gap-2">
            <TypePill type="provider" premium />
            {item.verified ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm"><BadgeCheck className="h-3.5 w-3.5" /> موثق</span> : null}
          </div>
        </div>

        <span className="inline-flex rounded-full border border-[#B8922B]/25 bg-white px-3 py-1 text-xs font-black text-[#8A6A00]">{item.providerType}</span>
        <h3 className="mt-3 text-2xl font-black leading-tight text-[#0F3F1A]">{item.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-[#304333]">{item.summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniTrust label="رخام" value="طبيعي" />
          <MiniTrust label="جرانيت" value="تشطيبات" />
          <MiniTrust label="كوارتز" value="مطابخ" />
          <MiniTrust label="UAE" value="حسب الطلب" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-[#304333]"><MapPin className="h-3.5 w-3.5 text-[#8A6A00]" /> {item.city} - {item.area}</span>
          {item.specialties?.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white/80 px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}
        </div>

        <ActionRow href={item.href} whatsapp={item.whatsapp} primary="فتح الملف" secondary="واتساب" premium />
      </div>
    </CardShell>
  );
}

function PremiumEntityCard({ item }) {
  const isOffer = item.entityType === 'offer';
  const isService = item.entityType === 'service';
  const isProduct = item.entityType === 'product';
  const primary = isOffer ? 'طلب المعاينة' : isProduct ? 'طلب السعر' : 'اطلب الخدمة';
  const title = item.title || item.name;

  return (
    <CardShell href={item.href} className="border-[#B8922B]/25 bg-gradient-to-br from-white via-[#FFF8EA] to-[#EFE3CC] shadow-xl shadow-[#8A6A00]/8">
      <ImagePanel src={item.image} alt={title} className="h-44" premium />

      <div className="px-5 pb-5 pt-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <TypePill type={item.entityType} premium />
          <span className="inline-flex items-center gap-1 rounded-full border border-[#B8922B]/30 bg-white px-3 py-1 text-xs font-black text-[#8A6A00] shadow-sm">
            {isOffer ? <Sparkles className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
            {isOffer ? item.badge : item.priceType}
          </span>
        </div>

        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-[#8A6A00]">{item.category || 'رخام وجرانيت'}</span>
        <h3 className="mt-3 text-xl font-black leading-tight text-[#0F3F1A]">{title}</h3>
        <p className="mt-2 line-clamp-3 min-h-[78px] text-sm font-semibold leading-7 text-[#304333]">{item.shortDescription || item.summary || item.material}</p>

        <div className="mt-4 rounded-2xl border border-[#E6DCC8] bg-white/80 p-4 text-sm font-semibold text-[#304333]">
          <Store className="ml-2 inline h-4 w-4 text-[#8A6A00]" />
          {item.providerName || item.supplierName}
          {isProduct ? (
            <div className="mt-3 space-y-1 text-xs leading-6">
              <p><span className="font-black text-[#0F3F1A]">الخامة:</span> {item.material}</p>
              <p><span className="font-black text-[#0F3F1A]">النطاق:</span> {item.availableArea}</p>
            </div>
          ) : null}
          {isOffer ? <p className="mt-3 text-xs font-bold text-[#8A6A00]"><Clock3 className="ml-1 inline h-3.5 w-3.5" /> {item.validUntil}</p> : null}
        </div>

        {isService && item.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-[#E6DCC8] bg-white/80 px-3 py-1 text-xs font-bold text-[#0F3F1A]">{tag}</span>)}</div> : null}

        <ActionRow href={item.href} primary={primary} secondary="فتح الملف" premium />
      </div>
    </CardShell>
  );
}

export function ProviderCard({ item }) {
  if (isArkline(item)) return <ModernArklineProviderCard item={item} />;
  if (isPremium(item)) return <PremiumAlHootProviderCard item={item} />;

  return (
    <CardShell href={item.href}>
      <ImagePanel src={item.coverImage} alt={item.name} />
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
        <div className="mt-4 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 rounded-full bg-[#F7F2E8] px-3 py-1 text-xs font-bold text-gray-700"><MapPin className="h-3.5 w-3.5 text-[#6F5400]" /> {item.city} - {item.area}</span></div>
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
    <CardShell href={item.href}>
      <ImagePanel src={item.image} alt={item.title} />
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
    <CardShell href={item.href}>
      <ImagePanel src={item.image} alt={item.name} />
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

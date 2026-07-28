import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  MapPin,
  MessageCircle,
  Package,
  Wrench,
} from 'lucide-react';

const COPY = {
  ar: {
    servicesEyebrow: 'خدمات منشورة من مزودي المنصة',
    servicesTitle: 'خدمات متاحة الآن',
    servicesDescription: 'هذه بطاقات خدمات فعلية منشورة في قاعدة بيانات بيت الريف ومرتبطة مباشرة بملف المزود.',
    productsEyebrow: 'منتجات منشورة من مزودي المنصة',
    productsTitle: 'منتجات متاحة الآن',
    productsDescription: 'هذه منتجات فعلية منشورة من موردين ومتاجر معتمدة، وليست أمثلة أو بطاقات تجريبية.',
    service: 'خدمة منشورة',
    product: 'منتج منشور',
    verified: 'مزود موثّق',
    provider: 'المزود',
    location: 'نطاق الخدمة',
    openService: 'فتح الخدمة والمزود',
    openProduct: 'فتح المنتج والمورد',
    whatsapp: 'واتساب',
    startingPrice: 'السعر الابتدائي',
    madeToOrder: 'مصنّع حسب الطلب',
    priceNote: 'السعر النهائي بعد مراجعة المقاسات والمواصفات',
    fallbackDescription: 'افتح ملف المزود للاطلاع على التفاصيل وطلب عرض مناسب.',
  },
  en: {
    servicesEyebrow: 'Published services from platform providers',
    servicesTitle: 'Services available now',
    servicesDescription: 'These are live service cards published in the Biet Al Reef database and linked directly to each provider profile.',
    productsEyebrow: 'Published products from platform providers',
    productsTitle: 'Products available now',
    productsDescription: 'These are live products published by approved suppliers and stores, not examples or placeholder cards.',
    service: 'Published service',
    product: 'Published product',
    verified: 'Verified provider',
    provider: 'Provider',
    location: 'Service area',
    openService: 'Open service and provider',
    openProduct: 'Open product and supplier',
    whatsapp: 'WhatsApp',
    startingPrice: 'Starting price',
    madeToOrder: 'Made to order',
    priceNote: 'Final price after dimensions and specifications are reviewed',
    fallbackDescription: 'Open the provider profile to review the details and request a suitable quotation.',
  },
};

export default function PublishedEntityGrid({
  items = [],
  locale = 'ar',
  type = 'service',
}) {
  if (!items.length) return null;
  const isEn = locale === 'en';
  const copy = COPY[isEn ? 'en' : 'ar'];
  const isProduct = type === 'product';
  const DirectionArrow = isEn ? ArrowRight : ArrowLeft;
  const TypeIcon = isProduct ? Package : Wrench;
  const fallbackImage = isProduct
    ? '/images/materials-products-hero.webp'
    : '/images/services-offers-hero.webp';

  return (
    <section
      id={isProduct ? 'published-products' : 'published-services'}
      dir={isEn ? 'ltr' : 'rtl'}
      className="border-y border-[#E6DCC8] bg-white/70 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className={isEn ? 'mb-9 text-left' : 'mb-9 text-right'}>
          <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-[#FFF8E5] px-4 py-1.5 text-xs font-black text-[#8A6A00]">
            {isProduct ? copy.productsEyebrow : copy.servicesEyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">
            {isProduct ? copy.productsTitle : copy.servicesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:text-base">
            {isProduct ? copy.productsDescription : copy.servicesDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_16px_42px_rgba(18,58,70,0.08)]"
            >
              <div className="relative h-48 overflow-hidden bg-[#F7F2E8]">
                <Image
                  src={item.image || fallbackImage}
                  alt={item.name || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/55 via-transparent to-transparent" />
                <span className={`absolute top-4 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/92 px-3 py-1.5 text-xs font-black text-[#0F3F1A] shadow-sm ${isEn ? 'left-4' : 'right-4'}`}>
                  <TypeIcon className="h-3.5 w-3.5 text-[#8A6A00]" />
                  {isProduct ? copy.product : copy.service}
                </span>
                {item.providerVerified ? (
                  <span className={`absolute bottom-4 inline-flex items-center gap-1 rounded-full bg-[#0F3F1A]/92 px-3 py-1.5 text-xs font-black text-[#F7E7A0] ${isEn ? 'left-4' : 'right-4'}`}>
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {copy.verified}
                  </span>
                ) : null}
                {isProduct && item.priceValue ? (
                  <span className={`absolute bottom-4 rounded-2xl border border-white/25 bg-white/95 px-3 py-2 text-sm font-black text-[#0F3F1A] shadow-xl backdrop-blur ${isEn ? 'right-4' : 'left-4'}`}>
                    {isEn ? 'From ' : 'من '} {Number(item.priceValue).toLocaleString(isEn ? 'en-AE' : 'ar-AE')} {item.currency || 'AED'}
                  </span>
                ) : null}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {item.category ? (
                    <span className="rounded-full bg-[#FFF8E5] px-3 py-1 text-xs font-black text-[#8A6A00]">
                      {item.category}
                    </span>
                  ) : null}
                  {isProduct && item.priceLabel ? (
                    <span className="rounded-full border border-[#E6DCC8] px-3 py-1 text-xs font-black text-[#0F3F1A]">
                      {item.priceLabel}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-black leading-8 text-[#0F3F1A]">{item.name}</h3>
                {item.code ? (
                  <p dir="ltr" className={`mt-1 text-[10px] font-black tracking-[0.12em] text-[#8A6A35] ${isEn ? 'text-left' : 'text-right'}`}>{item.code}</p>
                ) : null}
                <p className="mt-2 line-clamp-3 min-h-[72px] text-sm font-semibold leading-6 text-gray-600">
                  {item.description || item.providerSummary || copy.fallbackDescription}
                </p>

                {isProduct && item.priceValue ? (
                  <div className="mt-4 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#FFF9EA] to-[#FDFBF7] p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black text-[#8A6A35]">{copy.startingPrice}</p>
                        <p className="mt-1 text-2xl font-black text-[#0F3F1A]">
                          {Number(item.priceValue).toLocaleString(isEn ? 'en-AE' : 'ar-AE')}
                          <span className="mx-1 text-sm">{item.currency || 'AED'}</span>
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#6A5B43] shadow-sm">
                        {item.priceUnit || copy.madeToOrder}
                      </span>
                    </div>
                    <p className="mt-3 border-t border-[#D4AF37]/20 pt-3 text-xs font-bold leading-5 text-[#6A5B43]">{copy.priceNote}</p>
                  </div>
                ) : null}

                <div className="mt-4 space-y-2 rounded-2xl bg-[#FDFBF7] p-4 text-sm font-bold text-[#304333]">
                  <p className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6A00]" />
                    <span><span className="text-gray-500">{copy.provider}: </span>{item.providerName}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6A00]" />
                    <span><span className="text-gray-500">{copy.location}: </span>{item.location}</span>
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={item.href || item.providerHref}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-3 py-3 text-center text-xs font-black text-white transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]"
                  >
                    {isProduct ? copy.openProduct : copy.openService}
                    <DirectionArrow className="h-4 w-4" />
                  </Link>
                  <a
                    href={item.providerWhatsapp || item.whatsapp || item.href || item.providerHref}
                    target={item.providerWhatsapp ? '_blank' : undefined}
                    rel={item.providerWhatsapp ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-[#FFF8E5] px-3 py-3 text-xs font-black text-[#0F3F1A]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {copy.whatsapp}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

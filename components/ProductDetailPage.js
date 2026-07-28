import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';
import { arkleenTemplate } from '../data/providerTemplates/arkleen';

const SITE_URL = 'https://bietalreef.ae';

const COPY = {
  ar: {
    back: 'العودة إلى منتجات أركلين',
    eyebrow: 'صفحة منتج مستقلة وموثقة',
    startingPrice: 'السعر الابتدائي',
    availability: 'التوفر',
    inStock: 'متاح للطلب الآن',
    outOfStock: 'غير متاح حاليًا',
    preOrder: 'متاح كطلب مسبق',
    backOrder: 'متاح بالطلب اللاحق',
    provider: 'المزود',
    category: 'الفئة',
    code: 'رمز المنتج',
    location: 'نطاق الخدمة',
    request: 'اطلب تفاصيل المنتج',
    whatsapp: 'تواصل عبر واتساب',
    shipping: 'شحن مجاني إلى جميع الإمارات',
    delivery: 'مدة الوصول المعتمدة: 3 أيام',
    returns: 'المنتج مصنّع حسب الطلب ولا يُسترجع إلا عند وجود عيب مصنعي أو مخالفة للمواصفات.',
    policy: 'سياسة التوصيل والإرجاع',
    details: 'تفاصيل المنتج',
    gallery: 'صور المنتج',
    verified: 'مزود موثّق',
    priceNote: 'السعر الظاهر سعر ابتدائي؛ يُعتمد السعر النهائي بعد المقاسات والخامة والتشطيب.',
  },
  en: {
    back: 'Back to ARKLEEN products',
    eyebrow: 'Dedicated verified product page',
    startingPrice: 'Starting price',
    availability: 'Availability',
    inStock: 'Available to order now',
    outOfStock: 'Currently unavailable',
    preOrder: 'Available for preorder',
    backOrder: 'Available on backorder',
    provider: 'Provider',
    category: 'Category',
    code: 'Product code',
    location: 'Service area',
    request: 'Request product details',
    whatsapp: 'Contact on WhatsApp',
    shipping: 'Free shipping across the UAE',
    delivery: 'Approved delivery time: 3 days',
    returns: 'This made-to-order product is non-returnable except for a manufacturing defect or a specification mismatch.',
    policy: 'Shipping and return policy',
    details: 'Product details',
    gallery: 'Product images',
    verified: 'Verified provider',
    priceNote: 'The displayed price is a starting price; the final price is confirmed after dimensions, materials and finishes are approved.',
  },
};

function absoluteImage(src) {
  if (!src) return null;
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

function getGallery(product) {
  const configured = product.providerSlug === 'arkleen'
    ? arkleenTemplate.products.find((item) => item.slug === product.slug)?.gallery || []
    : [];
  return [...new Set([product.image, ...configured].filter(Boolean))];
}

function availabilityLabel(product, copy) {
  if (product.schemaAvailability?.endsWith('/OutOfStock')) return copy.outOfStock;
  if (product.schemaAvailability?.endsWith('/PreOrder')) return copy.preOrder;
  if (product.schemaAvailability?.endsWith('/BackOrder')) return copy.backOrder;
  return copy.inStock;
}

function buildProductSchema(product, canonical, gallery) {
  const offer = Number(product.priceValue) > 0
    ? {
        '@type': 'Offer',
        url: canonical,
        price: Number(product.priceValue).toString(),
        priceCurrency: product.currency || 'AED',
        availability: product.schemaAvailability || 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          '@id': `${SITE_URL}${product.providerHref}#provider`,
          name: product.providerName,
          url: `${SITE_URL}${product.providerHref}`,
        },
        ...(product.providerSlug === 'arkleen'
          ? {
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: 0,
                  currency: product.currency || 'AED',
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: 'AE',
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 0,
                    maxValue: 0,
                    unitCode: 'DAY',
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 3,
                    maxValue: 3,
                    unitCode: 'DAY',
                  },
                },
              },
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'AE',
                returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
              },
            }
          : {}),
      }
    : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    identifier: product.code || product.id,
    sku: product.code || undefined,
    name: product.name,
    description: product.description,
    image: gallery.map(absoluteImage),
    url: canonical,
    brand: {
      '@type': 'Brand',
      name: product.providerName,
    },
    category: product.category,
    ...(product.countryOfOrigin
      ? {
          countryOfOrigin: {
            '@type': 'Country',
            name: product.countryOfOrigin,
          },
        }
      : {}),
    ...(offer ? { offers: offer } : {}),
    ...(product.priceUnit
      ? {
          additionalProperty: {
            '@type': 'PropertyValue',
            name: product.locale === 'en' ? 'Price unit' : 'وحدة السعر',
            value: product.priceUnit,
          },
        }
      : {}),
  };
}

export default function ProductDetailPage({ product, locale = 'ar' }) {
  const isEn = locale === 'en';
  const copy = COPY[isEn ? 'en' : 'ar'];
  const canonical = `${SITE_URL}${product.href}`;
  const alternate = `${SITE_URL}${product.alternateHref}`;
  const gallery = getGallery(product);
  const formattedPrice = Number(product.priceValue) > 0
    ? new Intl.NumberFormat(isEn ? 'en-AE' : 'ar-AE').format(product.priceValue)
    : null;
  const availability = availabilityLabel(product, copy);
  const title = isEn
    ? `${product.name} by ${product.providerName} | ${formattedPrice ? `From AED ${formattedPrice}` : 'Request price'}`
    : `${product.name} من ${product.providerName} | ${formattedPrice ? `يبدأ من ${formattedPrice} درهم` : 'اطلب السعر'}`;
  const requestHref = `/request-quote?provider=${encodeURIComponent(product.providerSlug)}${isEn ? '&lang=en' : ''}&productId=${encodeURIComponent(product.code || product.id)}&product=${encodeURIComponent(product.name)}`;
  const policyHref = `${isEn ? '/en' : ''}/providers/arkleen/shipping-returns`;
  const productSchema = buildProductSchema(product, canonical, gallery);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Products & Stores' : 'المنتجات والمتاجر',
        item: `${SITE_URL}${isEn ? '/en' : ''}/marketplace`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.providerName,
        item: `${SITE_URL}${product.providerHref}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: canonical,
      },
    ],
  };

  const content = (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={product.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={isEn ? alternate : canonical} />
        <link rel="alternate" hrefLang="en-AE" href={isEn ? canonical : alternate} />
        <link rel="alternate" hrefLang="x-default" href={isEn ? alternate : canonical} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={absoluteImage(gallery[0])} />
        {Number(product.priceValue) > 0 ? (
          <>
            <meta property="product:price:amount" content={Number(product.priceValue).toString()} />
            <meta property="product:price:currency" content={product.currency || 'AED'} />
          </>
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([productSchema, breadcrumbSchema]).replace(/</g, '\\u003c'),
          }}
        />
      </Head>

      <main dir={isEn ? 'ltr' : 'rtl'} lang={isEn ? 'en' : 'ar'} className="min-h-screen bg-[#F8F4EC] px-4 py-6 text-[#1D2E22] md:py-10">
        <div className="mx-auto max-w-6xl">
          <Link href={`${product.providerHref}#${product.code || product.id}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-sm">
            <ArrowLeft className={`h-4 w-4 ${isEn ? '' : 'rotate-180'}`} />
            {copy.back}
          </Link>

          <section className="mt-5 overflow-hidden rounded-[2.2rem] border border-[#E2D5BE] bg-white shadow-[0_24px_70px_rgba(66,45,17,.13)]">
            <div className="grid lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[360px] bg-[#E8D5B4] md:min-h-[620px]">
                <Image
                  src={gallery[0]}
                  alt={`${product.name} ${isEn ? 'by' : 'من'} ${product.providerName}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1023px) 100vw,55vw"
                />
              </div>

              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#FFF7E4] px-4 py-2 text-xs font-black text-[#8A611B]">
                  <Package className="h-4 w-4" />
                  {copy.eyebrow}
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{product.name}</h1>
                <p className="mt-5 text-base font-semibold leading-8 text-[#625A50]">{product.description}</p>

                {formattedPrice ? (
                  <div className="mt-6 rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#FFF9EA] to-[#FBF7EF] p-5">
                    <p className="text-xs font-black text-[#8A6A35]">{copy.startingPrice}</p>
                    <p className="mt-2 text-4xl font-black text-[#0F3F1A]">
                      {isEn ? 'AED ' : ''}{formattedPrice}{isEn ? '' : ' درهم'}
                    </p>
                    {product.priceUnit ? <p className="mt-2 text-sm font-black text-[#6A5B43]">{product.priceUnit}</p> : null}
                    <p className="mt-3 border-t border-[#D4AF37]/20 pt-3 text-xs font-bold leading-6 text-[#6A5B43]">{copy.priceNote}</p>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-black text-emerald-700">{copy.availability}</p>
                    <p className="mt-2 flex items-center gap-2 font-black text-[#0F3F1A]"><CheckCircle2 className="h-5 w-5 text-emerald-600" />{availability}</p>
                  </div>
                  <div className="rounded-2xl border border-[#E6DCC8] bg-[#FBF8F1] p-4">
                    <p className="text-xs font-black text-[#8A611B]">{copy.code}</p>
                    <p dir="ltr" className="mt-2 font-mono text-sm font-black text-[#0F3F1A]">{product.code || product.id}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link href={requestHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9EA] px-5 py-3 text-sm font-black text-[#0F3F1A]">
                    {copy.request}
                    <ArrowLeft className={`h-4 w-4 ${isEn ? 'rotate-180' : ''}`} />
                  </Link>
                  <a href={product.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 text-sm font-black text-white">
                    <MessageCircle className="h-5 w-5" />
                    {copy.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.85fr]">
            <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">{copy.details}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [Building2, copy.provider, product.providerName],
                  [Package, copy.category, product.category],
                  [MapPin, copy.location, product.location],
                  [ShieldCheck, copy.verified, product.verified ? copy.verified : product.providerName],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#E6DCC8] bg-[#FBF8F1] p-4">
                    <p className="flex items-center gap-2 text-xs font-black text-[#8A611B]"><Icon className="h-4 w-4" />{label}</p>
                    <p className="mt-2 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
                  </div>
                ))}
              </div>
            </article>

            {product.providerSlug === 'arkleen' ? (
              <article className="rounded-[2rem] border border-[#D4AF37]/35 bg-[#0F3F1A] p-6 text-white shadow-sm md:p-8">
                <h2 className="flex items-center gap-3 text-2xl font-black"><Truck className="h-6 w-6 text-[#F4CA61]" />{copy.policy}</h2>
                <div className="mt-6 space-y-3 text-sm font-bold leading-7 text-white/90">
                  <p>{copy.shipping}</p>
                  <p>{copy.delivery}</p>
                  <p>{copy.returns}</p>
                </div>
                <Link href={policyHref} className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#F4CA61]/55 bg-white/10 px-5 py-3 text-sm font-black text-white">
                  {copy.policy}
                </Link>
              </article>
            ) : null}
          </section>

          {gallery.length > 1 ? (
            <section className="mt-8">
              <h2 className="text-2xl font-black text-[#0F3F1A]">{copy.gallery}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {gallery.slice(1).map((src, index) => (
                  <div key={src} className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm">
                    <Image src={src} alt={`${product.name} ${index + 2}`} fill className="object-cover" sizes="(max-width:767px) 100vw,50vw" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </>
  );

  return isEn
    ? <EnglishLayout>{content}</EnglishLayout>
    : <><Navbar />{content}<Footer showRequestCTA={false} /></>;
}

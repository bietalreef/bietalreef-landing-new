import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bot,
  CheckCircle2,
  Home,
  MessageCircle,
  Package,
  Ruler,
  ShieldCheck,
  Store,
  Tag,
  X,
} from 'lucide-react';
import { buildCardWhatsappUrl } from '../../lib/providerWhatsapp';

const ARKLINE_PROVIDER = {
  id: 'BR-PROV-ARK-001',
  slug: 'arkleen',
  name: 'أركلين',
  whatsapp: '971567797828',
  base: '/images/providers/arkleen-premium/',
};

const ARKLINE_PRODUCTS = {
  'BR-PRD-ARK-001': {
    id: 'BR-PRD-ARK-001',
    slug: 'custom-wooden-kitchen',
    title: 'مطبخ خشبي حسب الطلب',
    category: 'مطابخ',
    cardImage: 'product-custom-kitchen.webp',
    cardImagePosition: 'center',
    gallery: [
      {
        src: 'product-custom-kitchen.webp',
        alt: 'مطبخ خشبي حسب الطلب من أركلين',
      },
      {
        src: 'product-custom-kitchen-detail.webp',
        alt: 'تفاصيل التشطيب والتصنيع في مطبخ أركلين الخشبي',
      },
      {
        src: 'product-custom-kitchen-storage.webp',
        alt: 'حلول التخزين الداخلية في مطبخ أركلين حسب الطلب',
      },
    ],
    price: 980,
    priceUnit: 'للمتر الطولي',
    icon: Home,
    description: 'مطبخ خشبي يُصمم ويُصنع حسب مساحة الموقع، وتوزيع الاستخدام، ونوع الخامة والتشطيب والملحقات المطلوبة.',
    specifications: ['تصنيع حسب المقاس', 'خيارات خامات وتشطيبات', 'ملحقات داخلية حسب الطلب'],
    requiredDetails: [
      'المدينة والمنطقة وموقع المشروع',
      'المقاسات التقريبية أو مخطط المطبخ',
      'نوع الخامة واللون والتشطيب المطلوب',
      'الأجهزة والملحقات المطلوب دمجها',
      'صور الموقع الحالية إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب منتج مطبخ خشبي حسب الطلب من أركلين. اسألني عن المقاسات، توزيع الاستخدام، الخامة، اللون، الأجهزة، الملحقات وصور الموقع قبل التواصل المباشر.',
  },
  'BR-PRD-ARK-002': {
    id: 'BR-PRD-ARK-002',
    slug: 'custom-wardrobe',
    title: 'خزانة ملابس حسب المقاس',
    category: 'خزائن',
    cardImage: 'product-custom-wardrobe.webp',
    cardImagePosition: 'center',
    gallery: [
      {
        src: 'product-custom-wardrobe.webp',
        alt: 'خزانة ملابس حسب المقاس من أركلين',
      },
      {
        src: 'product-custom-wardrobe-detail.webp',
        alt: 'تفاصيل أبواب وتشطيب خزانة أركلين حسب المقاس',
      },
      {
        src: 'product-custom-wardrobe-storage.webp',
        alt: 'التقسيم الداخلي وحلول التخزين في خزانة أركلين',
      },
    ],
    price: 2500,
    priceUnit: 'للوحدة',
    icon: Package,
    description: 'خزانة ملابس بتقسيم داخلي مخصص، تُصنع حسب عرض وارتفاع وعمق المساحة مع خيارات متعددة للأبواب والخامات والتشطيبات.',
    specifications: ['تقسيم داخلي مخصص', 'أبواب سحاب أو مفصلية', 'تشطيبات متعددة'],
    requiredDetails: [
      'المدينة ومكان تركيب الخزانة',
      'العرض والارتفاع والعمق التقريبي',
      'نوع الأبواب المطلوب',
      'التقسيم الداخلي وعدد الأدراج والرفوف',
      'صورة الجدار أو المساحة إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب خزانة ملابس حسب المقاس من أركلين. اسألني عن الأبعاد، نوع الأبواب، التقسيم الداخلي، الخامة، اللون وصورة المساحة قبل التواصل المباشر.',
  },
  'BR-PRD-ARK-003': {
    id: 'BR-PRD-ARK-003',
    slug: 'custom-interior-door',
    title: 'باب داخلي خشبي',
    category: 'أبواب',
    cardImage: 'product-custom-door.webp',
    cardImagePosition: 'center',
    gallery: [
      {
        src: 'product-custom-door.webp',
        alt: 'باب داخلي خشبي حسب الطلب من أركلين',
      },
      {
        src: 'product-custom-door-detail.webp',
        alt: 'تفاصيل الخشب والتشطيب في باب أركلين الداخلي',
      },
      {
        src: 'product-custom-door-opposite.webp',
        alt: 'الجهة المقابلة من باب أركلين الداخلي الخشبي',
      },
    ],
    price: 800,
    priceUnit: 'للقطعة',
    icon: Store,
    description: 'باب داخلي خشبي يُصنع حسب فتحة الباب والتصميم المطلوب، مع اختيار نوع الخشب أو القشرة واللون والإكسسوارات وطريقة التركيب.',
    specifications: ['تصنيع حسب فتحة الباب', 'خيارات خشب وقشرة', 'توريد وتركيب'],
    requiredDetails: [
      'المدينة وموقع المشروع',
      'عدد الأبواب والمقاسات التقريبية',
      'نوع الباب والتصميم المطلوب',
      'نوع الخشب أو القشرة واللون',
      'صور الفتحات أو نموذج مرجعي إن توفر',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب باب داخلي خشبي من أركلين. اسألني عن العدد، مقاسات الفتحات، التصميم، نوع الخشب أو القشرة، اللون، الإكسسوارات وصور الموقع قبل التواصل المباشر.',
  },
};

function buildProductWhatsappMessage(product) {
  const formattedPrice = new Intl.NumberFormat('ar-AE').format(product.price);
  return buildCardWhatsappUrl({
    phone: ARKLINE_PROVIDER.whatsapp,
    locale: 'ar',
    cardType: 'product',
    providerName: ARKLINE_PROVIDER.name,
    providerCode: ARKLINE_PROVIDER.id,
    cardCode: product.id,
    cardId: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: `يبدأ من ${formattedPrice} درهم ${product.priceUnit}`,
    pricingModel: 'سعر ابتدائي · مصنّع حسب الطلب',
    specifications: [...product.specifications, ...product.requiredDetails],
    location: 'العين – مزيد – معسكر الشركات',
    pagePath: `/providers/arkleen#${product.id}`,
  });
}

function buildProductWeyaakHref(product) {
  const query = new URLSearchParams({
    providerId: ARKLINE_PROVIDER.id,
    provider: ARKLINE_PROVIDER.slug,
    productId: product.id,
    product: product.title,
    prompt: product.wayaakPrompt,
  });

  return `/weyaak?${query.toString()}`;
}

function emitProductAction(product, action, extra = {}) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('bietalreef:product-action', {
      detail: {
        providerId: ARKLINE_PROVIDER.id,
        providerSlug: ARKLINE_PROVIDER.slug,
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
        action,
        occurredAt: new Date().toISOString(),
        ...extra,
      },
    })
  );
}

export default function ProviderProductInteraction({ currentPath = '' }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isArklinePage = ['/providers/arkline', '/providers/arkleen'].includes(currentPath.split('?')[0]);

  const products = useMemo(() => ARKLINE_PRODUCTS, []);

  useEffect(() => {
    if (!isArklinePage) return undefined;

    const cards = Array.from(document.querySelectorAll('[data-product-id]'));
    const enhancedTriggers = [];
    const enhancedVisuals = [];

    cards.forEach((card) => {
      const productId = card.getAttribute('data-product-id');
      const product = products[productId];
      if (!product) return;

      const visual = card.firstElementChild;
      if (visual && product.cardImage) {
        const cardImageUrl = `${ARKLINE_PROVIDER.base}${product.cardImage}`;
        visual.style.setProperty(
          'background-image',
          `linear-gradient(180deg, rgba(7, 24, 12, 0.04), rgba(7, 24, 12, 0.52)), url("${cardImageUrl}")`,
          'important'
        );
        visual.style.setProperty('background-position', product.cardImagePosition || 'center', 'important');
        visual.dataset.productCardImage = cardImageUrl;
        enhancedVisuals.push(visual);
      }

      const trigger = card.querySelector('a[href*="productId="]');
      if (!trigger) return;

      trigger.dataset.originalText = trigger.textContent || '';
      trigger.dataset.productDetailsTrigger = productId;
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-label', `عرض تفاصيل منتج ${product.title}`);
      trigger.textContent = 'التفاصيل';
      enhancedTriggers.push(trigger);
    });

    const handleProductClick = (event) => {
      const trigger = event.target.closest('[data-product-details-trigger]');
      if (!trigger) return;

      const product = products[trigger.dataset.productDetailsTrigger];
      if (!product) return;

      event.preventDefault();
      event.stopPropagation();
      setSelectedProduct(product);
      emitProductAction(product, 'details_open');
    };

    document.addEventListener('click', handleProductClick, true);

    return () => {
      document.removeEventListener('click', handleProductClick, true);
      enhancedTriggers.forEach((trigger) => {
        trigger.textContent = trigger.dataset.originalText || 'اطلب تفاصيل المنتج';
        delete trigger.dataset.productDetailsTrigger;
        delete trigger.dataset.originalText;
        trigger.removeAttribute('role');
        trigger.removeAttribute('aria-haspopup');
      });
      enhancedVisuals.forEach((visual) => {
        visual.style.removeProperty('background-image');
        visual.style.removeProperty('background-position');
        delete visual.dataset.productCardImage;
      });
    };
  }, [isArklinePage, products]);

  useEffect(() => {
    if (!selectedProduct) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProduct]);

  if (!isArklinePage || !selectedProduct) return null;

  return (
    <ProductDetailsModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  );
}

function ProductDetailsModal({ product, onClose }) {
  const Icon = product.icon;
  const formattedPrice = new Intl.NumberFormat('ar-AE').format(product.price);
  const whatsappText = buildProductWhatsappMessage(product);
  const wayaakHref = buildProductWeyaakHref(product);
  const gallery = product.gallery?.length
    ? product.gallery
    : [{ src: product.cardImage, alt: product.title }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = gallery[activeImageIndex] || gallery[0];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.id]);

  const selectImage = (index) => {
    setActiveImageIndex(index);
    emitProductAction(product, 'gallery_image_view', {
      imageIndex: index,
      imageSrc: gallery[index]?.src,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arkline-product-dialog-title"
    >
      <button
        type="button"
        aria-label="إغلاق تفاصيل المنتج"
        className="absolute inset-0 bg-[#07150C]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <article
        data-provider-id={ARKLINE_PROVIDER.id}
        data-product-id={product.id}
        className="relative z-10 max-h-[95dvh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,.32)] md:max-h-[92dvh] md:rounded-[2rem]"
      >
        <div className="relative border-b border-[#E6DCC8] bg-[#F3EDE3]">
          <div className="relative h-[42dvh] min-h-[280px] max-h-[540px] overflow-hidden md:h-[54dvh]">
            <Image
              src={`${ARKLINE_PROVIDER.base}${activeImage.src}`}
              alt={activeImage.alt}
              fill
              className="object-contain p-2 md:p-5"
              sizes="(max-width:768px) 100vw,1024px"
              priority
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/94 text-[#0F3F1A] shadow-xl backdrop-blur-xl"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute right-4 top-4 z-20 flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-white/65 bg-white/92 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
                {product.category}
              </span>
              <span dir="ltr" className="inline-flex rounded-full border border-white/55 bg-[#0F3F1A]/86 px-3 py-2 text-[10px] font-black tracking-wide text-white shadow-lg backdrop-blur-xl">
                {product.id}
              </span>
            </div>

            <span className="absolute bottom-4 right-4 z-20 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/70 bg-white/94 p-3 text-[#0F3F1A] shadow-2xl backdrop-blur-xl">
              <Icon className="h-7 w-7" />
            </span>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:px-6 md:py-4">
              {gallery.map((image, index) => {
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={`${image.src}-${index}`}
                    type="button"
                    onClick={() => selectImage(index)}
                    aria-label={`عرض الصورة ${index + 1} من صور ${product.title}`}
                    aria-pressed={isActive}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-white shadow-sm transition md:h-20 md:w-28 ${
                      isActive
                        ? 'border-[#C9952A] ring-2 ring-[#C9952A]/25'
                        : 'border-white hover:border-[#D8C8AA]'
                    }`}
                  >
                    <Image
                      src={`${ARKLINE_PROVIDER.base}${image.src}`}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-5 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#A66B19]">تفاصيل المنتج</span>
              <h3 id="arkline-product-dialog-title" className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
                {product.title}
              </h3>
            </div>
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E6DCC8] bg-[#FFF8E7] text-[#0F3F1A] shadow-sm md:flex">
              <Icon className="h-7 w-7" />
            </span>
          </div>

          <p className="mt-4 text-base leading-8 text-[#625A50] md:text-lg">
            {product.description}
          </p>

          <div className="mt-5 rounded-[1.4rem] border border-[#D4AF37]/35 bg-gradient-to-l from-[#FFF9EA] to-[#FBF7EF] p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#8A6A35]">السعر الابتدائي</p>
                <p className="mt-1 text-3xl font-black text-[#0F3F1A]">
                  {formattedPrice} <span className="text-base">درهم</span>
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#6A5B43] shadow-sm">{product.priceUnit}</span>
            </div>
            <p className="mt-3 border-t border-[#D4AF37]/20 pt-3 text-xs font-bold leading-6 text-[#6A5B43]">
              السعر النهائي يُعتمد بعد مراجعة المقاسات والخامة والتشطيب والملحقات وموقع المشروع.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.specifications.map((specification) => (
              <span
                key={specification}
                className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-2 text-xs font-bold text-[#66583F]"
              >
                {specification}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ProductInfo icon={Tag} title="الفئة" value={product.category} />
            <ProductInfo icon={Ruler} title="التنفيذ" value="حسب المقاسات والمواصفات" />
            <ProductInfo icon={ShieldCheck} title="التسعير" value={`يبدأ من ${formattedPrice} درهم`} />
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-[#E6DCC8] bg-[#FBF7EF] p-5">
            <h4 className="text-lg font-black text-[#0F3F1A]">
              البيانات المطلوبة لهذا المنتج
            </h4>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {product.requiredDetails.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-2xl bg-white p-3 text-sm font-bold leading-6 text-[#4F4A42] shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href={wayaakHref}
              onClick={() => emitProductAction(product, 'wayaak_click')}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white shadow-[0_7px_0_rgba(5,37,13,.16)]"
            >
              <Bot className="h-5 w-5 text-[#F4CA61]" />
              اسأل وياك
            </Link>

            <a
              href={whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => emitProductAction(product, 'whatsapp_click')}
              aria-label={`تواصل مباشر عبر واتساب بشأن منتج ${product.title}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A]"
            >
              <MessageCircle className="h-5 w-5 text-[#159447]" />
              تواصل مباشر
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

function ProductInfo({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.4rem] border border-[#E6DCC8] bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
      </div>
    </div>
  );
}

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

const ARKLINE_PROVIDER = {
  id: 'BR-PROV-ARK-001',
  slug: 'arkline',
  name: 'أركلين',
  whatsapp: '971567797828',
  base: '/images/providers/arkline/',
};

const ARKLINE_PRODUCTS = {
  'BR-PRD-ARK-001': {
    id: 'BR-PRD-ARK-001',
    slug: 'custom-wooden-kitchen',
    title: 'مطبخ خشبي حسب الطلب',
    category: 'مطابخ',
    image: 'arkline-showroom.webp',
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
    image: 'arkline-workshop.webp',
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
    image: 'arkline-production.webp',
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
  const details = product.requiredDetails
    .map((item, index) => `${index + 1}. ${item}:`)
    .join('\n');

  return encodeURIComponent(
    [
      `مرحباً، أرغب في الاستفسار عن منتج «${product.title}» لدى أركلين عبر منصة بيت الريف.`,
      '',
      `معرف المزود: ${ARKLINE_PROVIDER.id}`,
      `معرف المنتج: ${product.id}`,
      '',
      'تفاصيل طلبي:',
      details,
      '',
      'سأرفق الصور أو المخططات المتوفرة في الرسالة التالية.',
    ].join('\n')
  );
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

function emitProductAction(product, action) {
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
      },
    })
  );
}

export default function ProviderProductInteraction({ currentPath = '' }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isArklinePage = currentPath.split('?')[0] === '/providers/arkline';

  const products = useMemo(() => ARKLINE_PRODUCTS, []);

  useEffect(() => {
    if (!isArklinePage) return undefined;

    const cards = Array.from(document.querySelectorAll('[data-product-id]'));
    const enhancedTriggers = [];

    cards.forEach((card) => {
      const productId = card.getAttribute('data-product-id');
      const product = products[productId];
      if (!product) return;

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
  const whatsappText = buildProductWhatsappMessage(product);
  const wayaakHref = buildProductWeyaakHref(product);

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
        className="relative z-10 max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,.32)] md:max-h-[90dvh] md:rounded-[2rem]"
      >
        <div className="relative h-56 overflow-hidden md:h-80">
          <Image
            src={`${ARKLINE_PROVIDER.base}${product.image}`}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw,896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/92 text-[#0F3F1A] shadow-xl backdrop-blur-xl"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-white/45 bg-white/90 px-3 py-2 text-[11px] font-black text-[#0F3F1A] backdrop-blur-xl">
                  منتج أركلين
                </span>
                <span dir="ltr" className="inline-flex rounded-full border border-white/35 bg-black/35 px-3 py-2 text-[10px] font-black tracking-wide text-white backdrop-blur-xl">
                  {product.id}
                </span>
              </div>
              <h3 id="arkline-product-dialog-title" className="mt-3 text-2xl font-black text-white md:text-4xl">
                {product.title}
              </h3>
            </div>

            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/90 text-[#0F3F1A] shadow-2xl backdrop-blur-xl">
              <Icon className="h-7 w-7" />
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <p className="text-base leading-8 text-[#625A50] md:text-lg">
            {product.description}
          </p>

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
            <ProductInfo icon={ShieldCheck} title="التسعير" value="بعد مراجعة التفاصيل" />
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
              href={`https://wa.me/${ARKLINE_PROVIDER.whatsapp}?text=${whatsappText}`}
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

-- Keep ARKLEEN pricing and galleries aligned with the published product cards.
-- Each gallery contains only valid media for the same product.
update public.provider_products product
set price = media.price,
    currency = 'AED',
    price_visibility = 'starting_from',
    gallery = media.gallery::jsonb,
    specifications = coalesce(product.specifications, '{}'::jsonb) || media.unit_specification::jsonb,
    updated_at = now()
from (values
  (
    'custom-wooden-kitchen',
    980::numeric,
    '["/images/providers/arkleen-premium/product-custom-kitchen.webp","/images/providers/arkleen-premium/product-custom-kitchen-detail.webp","/images/providers/arkleen-premium/product-custom-kitchen-storage.webp"]',
    '{"price_unit_ar":"للمتر الطولي","price_unit_en":"per linear metre","unit_code":"MTR"}'
  ),
  (
    'custom-wooden-wardrobe',
    2500::numeric,
    '["/images/providers/arkleen-premium/product-custom-wardrobe.webp","/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp","/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp"]',
    '{"price_unit_ar":"للوحدة","price_unit_en":"per unit","unit_code":"C62"}'
  ),
  (
    'custom-wooden-door',
    800::numeric,
    '["/images/providers/arkleen-premium/product-custom-door.webp","/images/providers/arkleen-premium/product-custom-door-detail.webp"]',
    '{"price_unit_ar":"للقطعة","price_unit_en":"per piece","unit_code":"C62"}'
  )
) media(slug, price, gallery, unit_specification)
where product.provider_id = (
  select id from public.provider_public_profiles where slug = 'arkleen'
)
and product.slug = media.slug;

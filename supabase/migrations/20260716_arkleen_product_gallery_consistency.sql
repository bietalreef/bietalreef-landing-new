-- Keep each ARKLEEN product gallery limited to three views of the same item.
-- The provider cover remains unchanged and existing asset files are preserved.
update public.provider_products product
set gallery = media.gallery::jsonb,
    updated_at = now()
from (values
  ('custom-wooden-kitchen', '["/images/providers/arkleen-premium/product-custom-kitchen.webp","/images/providers/arkleen-premium/product-custom-kitchen-detail.webp","/images/providers/arkleen-premium/product-custom-kitchen-storage.webp"]'),
  ('custom-wooden-wardrobe', '["/images/providers/arkleen-premium/product-custom-wardrobe.webp","/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp","/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp"]'),
  ('custom-wooden-door', '["/images/providers/arkleen-premium/product-custom-door.webp","/images/providers/arkleen-premium/product-custom-door-detail.webp","/images/providers/arkleen-premium/product-custom-door-opposite.webp"]')
) media(slug, gallery)
where product.provider_id = (
  select id from public.provider_public_profiles where slug = 'arkleen'
)
and product.slug = media.slug;

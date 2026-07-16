-- Keep ARKLEEN public cards, admin data and Google Images sources aligned.
-- Stable provider/service/product identifiers remain unchanged.
do $$
declare
  v_provider uuid;
begin
  select id into strict v_provider
  from public.provider_public_profiles
  where slug = 'arkleen';

  update public.provider_public_profiles
  set cover_image_url = '/images/providers/arkleen-premium/profile-cover.webp',
      updated_at = now()
  where id = v_provider;

  update public.provider_services ps
  set image_url = media.image_url,
      updated_at = now()
  from public.platform_services service,
       (values
         ('custom-wooden-kitchens', '/images/providers/arkleen-premium/service-custom-kitchens.webp'),
         ('custom-wardrobes', '/images/providers/arkleen-premium/service-custom-wardrobes.webp'),
         ('wooden-doors-and-decor', '/images/providers/arkleen-premium/service-wooden-doors-decor.webp'),
         ('interior-design-fitout', '/images/providers/arkleen-premium/service-interior-fitout.webp')
       ) media(slug, image_url)
  where ps.provider_id = v_provider
    and ps.service_id = service.id
    and service.slug = media.slug;

  update public.provider_products product
  set image_url = media.image_url,
      gallery = media.gallery::jsonb,
      updated_at = now()
  from (values
    ('custom-wooden-kitchen', '/images/providers/arkleen-premium/product-custom-kitchen.webp', '["/images/providers/arkleen-premium/product-custom-kitchen.webp","/images/providers/arkleen-premium/product-custom-kitchen-detail.webp","/images/providers/arkleen-premium/product-custom-kitchen-storage.webp"]'),
    ('custom-wooden-wardrobe', '/images/providers/arkleen-premium/product-custom-wardrobe.webp', '["/images/providers/arkleen-premium/product-custom-wardrobe.webp","/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp","/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp"]'),
    ('custom-wooden-door', '/images/providers/arkleen-premium/product-custom-door.webp', '["/images/providers/arkleen-premium/product-custom-door.webp","/images/providers/arkleen-premium/product-custom-door-detail.webp","/images/providers/arkleen-premium/product-custom-door-opposite.webp"]')
  ) media(slug, image_url, gallery)
  where product.provider_id = v_provider
    and product.slug = media.slug;
end $$;

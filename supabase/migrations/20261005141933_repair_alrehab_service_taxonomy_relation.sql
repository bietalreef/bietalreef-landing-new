-- Repair an existing published service relation, not a new service or publication.
-- The retired/active taxonomy records have exactly the same Arabic service name.
update public.provider_services ps
set service_id = current_service.id, updated_at = now()
from public.provider_public_profiles p, public.platform_services retired, public.platform_services current_service
where ps.provider_id = p.id and p.slug = 'alrehab-home-clean'
  and p.publication_status = 'published' and p.verification_status = 'verified'
  and ps.is_published and ps.service_id = retired.id
  and retired.slug = 'steam-sofa-cleaning' and not retired.is_active
  and current_service.slug = 'steam-upholstery-cleaning-309' and current_service.is_active
  and current_service.name_ar = retired.name_ar
  and current_service.category_id = retired.category_id;

-- All four published cards already belong to the cleaning category.
insert into public.provider_categories(provider_id, category_id, is_primary)
select p.id, c.id, not exists (
  select 1 from public.provider_categories existing where existing.provider_id = p.id and existing.is_primary
)
from public.provider_public_profiles p, public.platform_categories c
where p.slug = 'alrehab-home-clean' and p.publication_status = 'published'
  and p.verification_status = 'verified' and c.slug = 'cleaning-services' and c.is_active
  and exists (
    select 1 from public.provider_services ps join public.platform_services s on s.id = ps.service_id
    where ps.provider_id = p.id and ps.is_published and s.is_active and s.category_id = c.id
  )
on conflict (provider_id, category_id) do nothing;

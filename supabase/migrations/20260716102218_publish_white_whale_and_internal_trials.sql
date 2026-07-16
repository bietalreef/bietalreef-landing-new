-- Keep provider administration readable for authenticated platform admins.
-- RLS still limits rows through is_platform_admin().
grant select, insert, update, delete
on table public.provider_subscriptions
to authenticated;

update public.provider_public_profiles
set publication_status = 'published',
    verification_status = 'verified',
    is_featured = true,
    years_experience = coalesce(years_experience, 10),
    published_at = coalesce(published_at, now()),
    last_verified_at = now(),
    updated_at = now()
where public_provider_code = 'BR-PROV-HOT-001';

update public.provider_services
set is_published = true,
    updated_at = now()
where provider_id = (
  select id from public.provider_public_profiles
  where public_provider_code = 'BR-PROV-HOT-001'
);

update public.provider_public_profiles p
set plan_id = (
      select id from public.subscription_plans
      where code = 'digital-presence'
      limit 1
    ),
    updated_at = now()
where p.public_provider_code = 'BR-PROV-ALR-001'
  and p.plan_id is null;

with chosen as (
  select p.id as provider_id,
         p.public_provider_code,
         p.plan_id
  from public.provider_public_profiles p
  where p.public_provider_code in (
    'BR-PROV-ARK-001',
    'BR-PROV-ALR-001',
    'BR-PROV-HOT-001'
  )
)
insert into public.provider_subscriptions (
  provider_id,
  plan_id,
  billing_cycle,
  subscription_status,
  setup_fee_paid,
  price_snapshot,
  starts_at,
  expires_at,
  notes
)
select c.provider_id,
       c.plan_id,
       'free',
       'trial',
       false,
       jsonb_build_object(
         'internal_only', true,
         'trial_days', 30,
         'trial_label_ar', 'شهر مجاني',
         'trial_label_en', 'One-month free trial',
         'public_offer', false,
         'provider_code', c.public_provider_code
       ),
       now(),
       now() + interval '1 month',
       'تجربة تشغيل داخلية مجانية لمدة شهر؛ لا تُعرض للعملاء ولا تُنشر كبطاقة عامة.'
from chosen c
where c.plan_id is not null
  and not exists (
    select 1
    from public.provider_subscriptions s
    where s.provider_id = c.provider_id
      and s.subscription_status in ('trial', 'active')
      and (s.expires_at is null or s.expires_at > now())
  );

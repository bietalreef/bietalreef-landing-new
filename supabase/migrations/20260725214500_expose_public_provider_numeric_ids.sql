revoke select on table public.platform_provider_accounts from anon;

grant select (
  provider_public_profile_id,
  provider_numeric_id,
  status
) on table public.platform_provider_accounts to anon;

drop policy if exists platform_provider_accounts_public_id_read
on public.platform_provider_accounts;

create policy platform_provider_accounts_public_id_read
on public.platform_provider_accounts
for select
to anon
using (status = 'active');

-- Keep the validated, rate-limited text overload public for consented website events.
-- The legacy JSON overload predates those guards and is not used by the production client.
revoke execute on function public.track_public_site_event(jsonb)
  from public, anon, authenticated;

grant execute on function public.track_public_site_event(jsonb)
  to service_role;

comment on function public.track_public_site_event(jsonb) is
  'Legacy server-only analytics ingestion. Public clients must use the validated text overload.';

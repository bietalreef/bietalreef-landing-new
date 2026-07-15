const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const ALLOWED_EVENTS = new Set([
  'page_view',
  'page_exit',
  'click',
  'cta_click',
  'provider_view',
  'service_view',
  'product_view',
  'project_view',
  'quote_start',
  'quote_submit',
  'inquiry_start',
  'inquiry_submit',
  'search',
]);

export const config = {
  api: {
    bodyParser: { sizeLimit: '32kb' },
  },
};

function text(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function sameOrigin(req) {
  const origin = text(req.headers.origin, 500);
  if (!origin) return true;

  try {
    const forwardedHost = text(req.headers['x-forwarded-host'], 255);
    const host = forwardedHost || text(req.headers.host, 255);
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}

function sanitizeUtm(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  return Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .map((key) => [key, text(raw[key], 160)])
      .filter(([, value]) => value),
  );
}

function sanitizeMetadata(raw, req) {
  const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const metadata = {};
  const fields = {
    action: 80,
    label: 120,
    target_path: 500,
    provider_slug: 120,
  };

  for (const [key, maxLength] of Object.entries(fields)) {
    const value = text(source[key], maxLength);
    if (value) metadata[key] = value;
  }

  const country = text(req.headers['x-vercel-ip-country'], 8);
  const region = text(req.headers['x-vercel-ip-country-region'], 80);
  const city = text(req.headers['x-vercel-ip-city'], 120);
  if (country) metadata.country = country;
  if (region) metadata.region = region;
  if (city) metadata.city = city;

  return metadata;
}

function normalizePayload(body, req) {
  const eventType = text(body?.eventType, 40);
  const duration = Number(body?.durationSeconds);
  return {
    eventType,
    pagePath: text(body?.pagePath, 500),
    pageTitle: text(body?.pageTitle, 250),
    sectionKey: text(body?.sectionKey, 120),
    durationSeconds: Number.isFinite(duration) ? Math.max(0, Math.min(86400, Math.round(duration))) : null,
    sessionId: text(body?.sessionId, 128),
    deviceId: text(body?.deviceId, 128),
    deviceType: text(body?.deviceType, 32),
    timezone: text(body?.timezone, 80),
    locale: text(body?.locale, 32),
    referrer: text(body?.referrer, 500),
    utm: sanitizeUtm(body?.utm),
    metadata: sanitizeMetadata(body?.metadata, req),
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  if (!sameOrigin(req) || req.headers['x-bietalreef-consent'] !== 'accepted') {
    return res.status(403).json({ ok: false });
  }

  if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
    return res.status(503).json({ ok: false });
  }

  const payload = normalizePayload(req.body, req);
  if (!ALLOWED_EVENTS.has(payload.eventType) || payload.sessionId.length < 8) {
    return res.status(400).json({ ok: false });
  }

  try {
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/track_public_site_event`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLIC_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_event_type: payload.eventType,
        p_page_path: payload.pagePath || null,
        p_page_title: payload.pageTitle || null,
        p_section_key: payload.sectionKey || null,
        p_duration_seconds: payload.durationSeconds,
        p_session_id: payload.sessionId,
        p_device_id: payload.deviceId || null,
        p_device_type: payload.deviceType || null,
        p_timezone: payload.timezone || null,
        p_locale: payload.locale || null,
        p_referrer: payload.referrer || null,
        p_utm: payload.utm,
        p_metadata: payload.metadata,
      }),
    });

    if (!response.ok) {
      console.error('Public analytics RPC failed', { status: response.status });
      return res.status(502).json({ ok: false });
    }

    return res.status(202).json({ ok: true });
  } catch (error) {
    console.error('Public analytics connection failed', { message: error?.message || 'network_error' });
    return res.status(502).json({ ok: false });
  }
}

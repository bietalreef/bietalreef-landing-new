import { analyticsConsent, CONSENT_EVENT } from '../components/PrivacyConsentCenter';

type AnalyticsEvent =
  | 'page_view' | 'page_exit' | 'click' | 'cta_click' | 'provider_view'
  | 'service_view' | 'product_view' | 'project_view'
  | 'quote_start' | 'quote_submit' | 'inquiry_start' | 'inquiry_submit' | 'search';

type TrackOptions = {
  sectionKey?: string;
  durationSeconds?: number;
  metadata?: Record<string, unknown>;
};

const endpoint = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const sessionKey = 'bietalreef.analytics.session';
const deviceKey = 'bietalreef.analytics.device';

function identifier(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const value = crypto.randomUUID();
  storage.setItem(key, value);
  return value;
}

function cleanPath(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    return `${url.pathname}${url.hash ? url.hash.slice(0, 100) : ''}`.slice(0, 500);
  } catch {
    return value.split('?')[0].slice(0, 500);
  }
}

function providerSlug(path = window.location.pathname) {
  const match = path.match(/^\/(?:providers?|service-providers?)\/([^/]+)/i);
  return match?.[1] ? decodeURIComponent(match[1]).slice(0, 120) : undefined;
}

function deviceType() {
  if (window.innerWidth < 768) return 'mobile';
  if (window.innerWidth < 1100) return 'tablet';
  return 'desktop';
}

function campaign() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .map(key => [key, params.get(key)])
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
  );
}

function safeReferrer() {
  if (!document.referrer) return undefined;
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return undefined;
  }
}

export async function trackPublicEvent(eventType: AnalyticsEvent, options: TrackOptions = {}) {
  if (!endpoint || !publishableKey || navigator.doNotTrack === '1' || analyticsConsent() !== 'accepted') return;

  const slug = providerSlug();
  const payload = {
    p_event_type: eventType,
    p_page_path: cleanPath(window.location.href),
    p_page_title: document.title.slice(0, 250),
    p_section_key: options.sectionKey?.slice(0, 120) || null,
    p_duration_seconds: options.durationSeconds ?? null,
    p_session_id: identifier(sessionStorage, sessionKey),
    p_device_id: identifier(localStorage, deviceKey),
    p_device_type: deviceType(),
    p_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone?.slice(0, 80),
    p_locale: navigator.language.slice(0, 32),
    p_referrer: safeReferrer(),
    p_utm: campaign(),
    p_metadata: {
      ...(slug ? { provider_slug: slug } : {}),
      ...(options.metadata || {}),
    },
  };

  try {
    await fetch(`${endpoint}/rest/v1/rpc/track_public_site_event`, {
      method: 'POST',
      keepalive: eventType === 'page_exit',
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics must never interrupt the customer journey.
  }
}

function clickAction(element: Element) {
  const href = element.getAttribute('href') || '';
  const explicit = element.getAttribute('data-analytics-action');
  if (explicit) return explicit.slice(0, 80);
  if (/wa\.me|whatsapp/i.test(href)) return 'whatsapp';
  if (/^tel:/i.test(href)) return 'phone';
  if (/^mailto:/i.test(href)) return 'email';
  if (/maps|goo\.gl/i.test(href)) return 'map';
  if (/instagram|facebook|tiktok|linkedin|youtube/i.test(href)) return 'social';
  if (/quote|عرض-سعر|استفسار|inquiry/i.test(href)) return 'conversion';
  return 'navigation';
}

export function initPublicAnalytics() {
  if (typeof window === 'undefined') return () => undefined;

  let startedAt = Date.now();
  let lastPath = window.location.href;
  const recordPage = () => {
    const slug = providerSlug();
    void trackPublicEvent(slug ? 'provider_view' : 'page_view');
    startedAt = Date.now();
    lastPath = window.location.href;
  };

  const onClick = (event: MouseEvent) => {
    const target = (event.target as Element | null)?.closest('a,button,[data-analytics-event]');
    if (!target) return;
    const action = clickAction(target);
    const label = (target.getAttribute('aria-label') || target.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120);
    const requested = target.getAttribute('data-analytics-event') as AnalyticsEvent | null;
    const eventType = requested || (action === 'navigation' ? 'click' : 'cta_click');
    void trackPublicEvent(eventType, {
      sectionKey: target.closest('[data-analytics-section]')?.getAttribute('data-analytics-section') || undefined,
      metadata: { action, label, target_path: cleanPath(target.getAttribute('href') || '') },
    });
  };

  const onPageChange = () => {
    if (window.location.href === lastPath) return;
    void trackPublicEvent('page_exit', { durationSeconds: Math.round((Date.now() - startedAt) / 1000) });
    recordPage();
  };

  const originalPush = history.pushState.bind(history);
  const originalReplace = history.replaceState.bind(history);
  history.pushState = (...args) => { originalPush(...args); onPageChange(); };
  history.replaceState = (...args) => { originalReplace(...args); onPageChange(); };

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      void trackPublicEvent('page_exit', { durationSeconds: Math.round((Date.now() - startedAt) / 1000) });
    }
  };

  const onConsent = () => {
    if (analyticsConsent() === 'accepted') recordPage();
  };

  document.addEventListener('click', onClick, { capture: true });
  window.addEventListener('popstate', onPageChange);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener(CONSENT_EVENT, onConsent);
  if (analyticsConsent() === 'accepted') recordPage();

  return () => {
    history.pushState = originalPush;
    history.replaceState = originalReplace;
    document.removeEventListener('click', onClick, { capture: true });
    window.removeEventListener('popstate', onPageChange);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener(CONSENT_EVENT, onConsent);
  };
}

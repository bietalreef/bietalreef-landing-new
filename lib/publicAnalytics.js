import { analyticsConsent, CONSENT_EVENT, DEVICE_KEY } from '../components/PrivacyConsentCenter';

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

const SESSION_KEY = 'bietalreef.analytics.session';

function randomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function identifier(storage, key) {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const value = randomId();
    storage.setItem(key, value);
    return value;
  } catch {
    return randomId();
  }
}

function cleanPath(value) {
  try {
    return new URL(value, window.location.origin).pathname.slice(0, 500);
  } catch {
    return String(value || '').split('?')[0].split('#')[0].slice(0, 500);
  }
}

function providerSlug(path = window.location.pathname) {
  const match = path.match(/^\/(?:en\/)?(?:providers?|service-providers?)\/([^/]+)/i);
  if (!match?.[1]) return undefined;
  const slug = decodeURIComponent(match[1]).slice(0, 120).toLowerCase();
  return slug === 'arkline' ? 'arkleen' : slug;
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
      .map((key) => [key, params.get(key)])
      .filter((entry) => Boolean(entry[1])),
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

export async function trackPublicEvent(eventType, options = {}) {
  if (
    typeof window === 'undefined' ||
    !ALLOWED_EVENTS.has(eventType) ||
    navigator.doNotTrack === '1' ||
    analyticsConsent() !== 'accepted'
  ) {
    return;
  }

  const slug = providerSlug();
  const payload = {
    eventType,
    pagePath: cleanPath(window.location.href),
    pageTitle: document.title.slice(0, 250),
    sectionKey: options.sectionKey?.slice(0, 120) || null,
    durationSeconds: Number.isFinite(options.durationSeconds) ? Math.max(0, Math.min(86400, Math.round(options.durationSeconds))) : null,
    sessionId: identifier(window.sessionStorage, SESSION_KEY),
    deviceId: identifier(window.localStorage, DEVICE_KEY),
    deviceType: deviceType(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone?.slice(0, 80) || null,
    locale: navigator.language.slice(0, 32),
    referrer: safeReferrer(),
    utm: campaign(),
    metadata: {
      ...(slug ? { provider_slug: slug } : {}),
      ...(options.metadata || {}),
    },
  };

  try {
    await fetch('/api/analytics-event', {
      method: 'POST',
      keepalive: eventType === 'page_exit',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Bietalreef-Consent': 'accepted',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics must never interrupt the visitor journey.
  }
}

function clickAction(element) {
  const href = element.getAttribute('href') || '';
  const explicit = element.getAttribute('data-analytics-action');
  if (explicit) return explicit.slice(0, 80);
  if (/wa\.me|whatsapp/i.test(href)) return 'whatsapp';
  if (/^tel:/i.test(href)) return 'phone';
  if (/^mailto:/i.test(href)) return 'email';
  if (/maps|goo\.gl/i.test(href)) return 'map';
  if (/instagram|facebook|tiktok|linkedin|youtube/i.test(href)) return 'social';
  if (/quote|request-quote|inquiry/i.test(href)) return 'conversion';
  return 'navigation';
}

export function initPublicAnalytics(router) {
  if (typeof window === 'undefined') return () => undefined;

  let startedAt = Date.now();
  let lastPath = cleanPath(window.location.href);

  const recordPage = () => {
    const slug = providerSlug();
    void trackPublicEvent(slug ? 'provider_view' : 'page_view');
    startedAt = Date.now();
    lastPath = cleanPath(window.location.href);
  };

  const recordExit = () => {
    void trackPublicEvent('page_exit', {
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
    });
  };

  const onClick = (event) => {
    const target = event.target?.closest?.('a,button,[data-analytics-event]');
    if (!target) return;

    const action = clickAction(target);
    const label = (target.getAttribute('aria-label') || target.textContent || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 120);
    const requested = target.getAttribute('data-analytics-event');
    const eventType = ALLOWED_EVENTS.has(requested) ? requested : action === 'navigation' ? 'click' : 'cta_click';

    void trackPublicEvent(eventType, {
      sectionKey: target.closest('[data-analytics-section]')?.getAttribute('data-analytics-section') || undefined,
      metadata: {
        action,
        label,
        target_path: cleanPath(target.getAttribute('href') || ''),
      },
    });
  };

  const onRouteStart = () => recordExit();
  const onRouteComplete = () => {
    const currentPath = cleanPath(window.location.href);
    if (currentPath !== lastPath) recordPage();
  };
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') recordExit();
  };
  const onConsent = () => {
    if (analyticsConsent() === 'accepted') recordPage();
  };

  document.addEventListener('click', onClick, { capture: true });
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener(CONSENT_EVENT, onConsent);
  router?.events?.on('routeChangeStart', onRouteStart);
  router?.events?.on('routeChangeComplete', onRouteComplete);

  if (analyticsConsent() === 'accepted') recordPage();

  return () => {
    document.removeEventListener('click', onClick, { capture: true });
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener(CONSENT_EVENT, onConsent);
    router?.events?.off('routeChangeStart', onRouteStart);
    router?.events?.off('routeChangeComplete', onRouteComplete);
  };
}

import { validateSearchRequest, normalizeSearchRows, recommendOpportunity, ADS_ADAPTER } from '../../../lib/localSeoGrowth.mjs';
const baseHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const MARKETPLACE_ROOT = "https://app.bietalreef.ae/";
const MARKETPLACE_SITEMAP = "https://app.bietalreef.ae/sitemap-index.xml";
const PLATFORM_ROOT = "https://bietalreef.ae/";
const PLATFORM_SITEMAP = "https://bietalreef.ae/sitemap.xml";

function base64Url(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function googleAccessToken(credentials: Record<string, string>): Promise<string> {
  const pem = credentials.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: credentials.client_email,
    scope: ["https://www.googleapis.com/auth/content", "https://www.googleapis.com/auth/webmasters"].join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signature = new Uint8Array(await crypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, key, new TextEncoder().encode(unsigned)));
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${base64Url(signature)}` }),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) throw new Error(`OAuth token failed (${response.status}): ${body.error_description ?? body.error ?? "unknown"}`);
  return body.access_token;
}

async function verifyPlatformAdmin(req: Request) {
  const authorization = req.headers.get("authorization") || "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  if (!authorization || !supabaseUrl || !anonKey) return false;
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/verify_platform_admin`, {
    method: "POST",
    headers: { authorization, apikey: anonKey, "content-type": "application/json" },
    body: "{}",
  });
  if (!response.ok) return false;
  const body = await response.json().catch(() => null);
  if (Array.isArray(body)) return body.some((item) => item?.is_admin === true);
  return body?.is_admin === true;
}

async function inspectUrl(accessToken: string, property: string, inspectionUrl: string, languageCode = "ar-AE") {
  const response = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
    body: JSON.stringify({ inspectionUrl, siteUrl: property, languageCode }),
  });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, result: response.ok ? body.inspectionResult ?? body : null, error: response.ok ? null : body.error?.message ?? "request failed" };
}

async function submitSitemap(accessToken: string, property: string, sitemapUrl: string, rootUrl: string, languageCode = "ar-AE") {
  const auth = { authorization: `Bearer ${accessToken}` };
  const sitemapEndpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const submitResponse = await fetch(sitemapEndpoint, { method: "PUT", headers: auth });
  const submitBody = await submitResponse.json().catch(() => ({}));
  const sitemapStatusResponse = await fetch(sitemapEndpoint, { headers: auth });
  const sitemapStatusBody = await sitemapStatusResponse.json().catch(() => ({}));
  const inspection = await inspectUrl(accessToken, property, rootUrl, languageCode);
  const ok = submitResponse.ok && sitemapStatusResponse.ok;
  return {
    ok,
    sitemap: {
      url: sitemapUrl,
      submitted: submitResponse.ok,
      submitStatus: submitResponse.status,
      submitError: submitResponse.ok ? null : submitBody.error?.message ?? "submission failed",
      statusFetched: sitemapStatusResponse.ok,
      status: sitemapStatusResponse.ok ? sitemapStatusBody : null,
      statusError: sitemapStatusResponse.ok ? null : sitemapStatusBody.error?.message ?? "status lookup failed",
    },
    rootInspection: inspection,
  };
}

async function registryRequest(path: string, options: RequestInit = {}) {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) throw new Error("Registry server configuration unavailable");
  const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/${path}`, {
    ...options, headers: { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json", ...(options.headers || {}) }, signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Registry operation failed (${response.status})`);
  return response.status === 204 ? null : response.json().catch(() => null);
}
async function searchAnalytics(token: string, property: string, input: any) {
  const body = validateSearchRequest(input);
  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
    method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(25000),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Search Analytics failed (${response.status})`);
  return { request: body, rows: normalizeSearchRows(data.rows, body.dimensions), complete: (data.rows || []).length < body.rowLimit,
    limitation: "Search Console returns top rows, not all queries. An empty result is not proof of zero demand." };
}
async function syncRegistry() {
  const response = await fetch(`${PLATFORM_ROOT}api/local-seo-registry`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error("Published registry manifest unavailable");
  const manifest = await response.json();
  if (manifest.version !== 1 || !Array.isArray(manifest.rows) || manifest.rows.length > 500) throw new Error("Invalid registry manifest");
  const rows = manifest.rows.filter((row: any) => /^https:\/\/bietalreef\.ae\/(?:en\/)?uae\/abu-dhabi\/al-ain(?:\/[a-z0-9-]+){0,3}$/.test(row.url) && row.url === row.canonical_url);
  if (rows.length !== manifest.rows.length) throw new Error("Noncanonical registry URL");
  const previous = await registryRequest('local_seo_url_registry?select=url');
  await registryRequest('local_seo_url_registry?on_conflict=url', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows) });
  let withdrawn = 0;
  for (const old of previous) {
    if (rows.some((row: any) => row.url === old.url)) continue;
    await registryRequest(`local_seo_url_registry?url=eq.${encodeURIComponent(old.url)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ indexability_state: 'withdrawn', robots_state: 'not_served', sitemap_eligible: false, provider_ids: [], quality_gate_state: 'failed', quality_gate_reasons: ['missing_current_public_manifest'], recommendation: { state: 'not_ready', why_this_candidate: ['URL is absent from current public source'], auto_publish: false } }) }); withdrawn++;
  }
  return { withdrawn, registered: rows.length, missingServices: manifest.missing_services, auto_publish: false };
}
async function refreshPerformance(token: string, property: string, input: any) {
  const valid = validateSearchRequest({ ...input, dimensions: ['page'] });
  const current = await searchAnalytics(token, property, { ...input, dimensions: ['page'] });
  const queries = await searchAnalytics(token, property, { ...input, dimensions: ['page', 'query'] });
  const days = Math.round((Date.parse(valid.endDate) - Date.parse(valid.startDate)) / 86400000) + 1;
  const prevEnd = new Date(Date.parse(valid.startDate) - 86400000).toISOString().slice(0, 10);
  const prevStart = new Date(Date.parse(valid.startDate) - days * 86400000).toISOString().slice(0, 10);
  const previous = await searchAnalytics(token, property, { startDate: prevStart, endDate: prevEnd, dimensions: ['page'] });
  const registry = (await registryRequest('local_seo_url_registry?select=*')).filter((row: any) => !input.page || row.url === input.page);
  const counts = await registryRequest('rpc/local_seo_conversion_summary', { method: 'POST', body: JSON.stringify({ p_start: valid.startDate, p_end: new Date(Date.parse(valid.endDate) + 86400000).toISOString().slice(0, 10) }) });
  const dayKey = new Date().toISOString();
  let updated = 0;
  for (const row of registry) {
    const metric = current.rows.find((item: any) => item.page === row.url);
    const before = previous.rows.find((item: any) => item.page === row.url);
    const conversion = counts.find((item: any) => PLATFORM_ROOT.slice(0, -1) + item.page_path === row.url) || {};
    const top = queries.rows.filter((item: any) => item.page === row.url).sort((a: any, b: any) => b.impressions - a.impressions).slice(0, 20);
    const opportunity = recommendOpportunity({
      entity: { serviceExists: !!row.service, servicePublished: row.quality_gate_state === 'passed', providerEligible: row.provider_ids.length > 0, coverage: row.quality_gate_state === 'passed', categoryValid: !!row.category },
      content: { useful: row.quality_gate_state === 'passed', sourceReviewed: row.editorial_provenance?.reviewed === true },
      approved: row.editorial_approved === true, rejected: row.editorial_rejected === true,
      search: { ...metric, windowDays: days, complete: !!metric && current.complete, commercialIntent: row.commercial_intent_reviewed === true },
      previous: { ...before, windowDays: days, complete: !!before && previous.complete }, conversions: conversion,
    });
    await registryRequest(`local_seo_url_registry?url=eq.${encodeURIComponent(row.url)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({
      clicks: metric?.clicks ?? null, impressions: metric?.impressions ?? null, ctr: metric?.ctr ?? null, avg_position: metric?.position ?? null,
      top_queries: top, performance_start: valid.startDate, performance_end: valid.endDate, last_performance_sync_at: dayKey,
      performance_state: metric ? 'observed_top_rows' : 'no_returned_row', conversion_summary: { phone_click: Number(conversion.phone_click) || 0, whatsapp_click: Number(conversion.whatsapp_click) || 0, request_quote: Number(conversion.request_quote) || 0 }, recommendation: opportunity,
    }) }); updated++;
  }
  return { updated, windows: { startDate: valid.startDate, endDate: valid.endDate, prevStart, prevEnd }, auto_publish: false, note: 'Conversion window is UTC; Search Console dates are Pacific Time. Clicks are lead intent, not completed jobs.', limitation: current.limitation };
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = ['https://bietalreef.ae', 'https://app.bietalreef.ae', 'https://providers.bietalreef.ae'].includes(origin);
  const jsonHeaders = { ...baseHeaders, ...(allowedOrigin ? { 'access-control-allow-origin': origin, 'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info', 'access-control-allow-methods': 'GET, POST, OPTIONS', vary: 'Origin' } : {}) };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: jsonHeaders });
  try {
    let requestBody: any = {};
    let action = new URL(req.url).searchParams.get("action") || "health";
    if (req.method === "POST") {
      const text = await req.text();
      if (text.length > 16384) return new Response(JSON.stringify({ error: "Request too large" }), { status: 413, headers: jsonHeaders });
      try { requestBody = JSON.parse(text || '{}'); } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: jsonHeaders }); }
      if (typeof requestBody.action === 'string') action = requestBody.action;
    }
    const growthActions = new Set(['search_analytics', 'sync_local_seo_registry', 'refresh_local_seo_performance', 'inspect_local_seo', 'local_seo_report', 'review_local_seo']);
    if (growthActions.has(action)) {
      if (!(await verifyPlatformAdmin(req))) return new Response(JSON.stringify({ error: 'Platform admin authorization required' }), { status: 403, headers: jsonHeaders });
      if (action === 'local_seo_report') return new Response(JSON.stringify({ ok: true, rows: await registryRequest('local_seo_url_registry?select=*'), ads: ADS_ADAPTER, auto_publish: false }), { headers: jsonHeaders });
      if (action === 'review_local_seo') {
        const url = String(requestBody.url || '');
        if (!/^https:\/\/bietalreef\.ae\/(?:en\/)?uae\/abu-dhabi\/al-ain(?:\/[a-z0-9-]+){0,3}$/.test(url) || typeof requestBody.approved !== 'boolean' || typeof requestBody.rejected !== 'boolean' || typeof requestBody.commercialIntent !== 'boolean' || requestBody.approved && requestBody.rejected || typeof requestBody.note !== 'string' || !requestBody.note.trim()) return new Response(JSON.stringify({ error: 'Explicit editorial decision and note required' }), { status: 400, headers: jsonHeaders });
        const rows = await registryRequest(`local_seo_url_registry?select=url&url=eq.${encodeURIComponent(url)}`);
        if (!rows.length) return new Response(JSON.stringify({ error: 'URL not registered' }), { status: 404, headers: jsonHeaders });
        await registryRequest(`local_seo_url_registry?url=eq.${encodeURIComponent(url)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ editorial_approved: requestBody.approved, editorial_rejected: requestBody.rejected, commercial_intent_reviewed: requestBody.commercialIntent, approval_note: requestBody.note.trim().slice(0, 2000), last_editorial_decision_at: new Date().toISOString(), recommendation: { state: requestBody.rejected ? 'rejected' : 'candidate', why_this_candidate: ['Editorial decision updated; refresh evidence'], auto_publish: false } }) });
        return new Response(JSON.stringify({ ok: true, auto_publish: false, robots_changed: false }), { headers: jsonHeaders });
      }
      if (action === 'sync_local_seo_registry') return new Response(JSON.stringify({ ok: true, ...(await syncRegistry()) }), { headers: jsonHeaders });
      if (action === 'search_analytics' || action === 'refresh_local_seo_performance') {
        try { validateSearchRequest(requestBody); } catch (error) { return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid input' }), { status: 400, headers: jsonHeaders }); }
      }
      const credentialsRaw = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
      const searchProperty = Deno.env.get('GOOGLE_SEARCH_CONSOLE_PROPERTY');
      if (!credentialsRaw || !searchProperty) return new Response(JSON.stringify({ error: 'Existing Search Console configuration unavailable' }), { status: 503, headers: jsonHeaders });
      const token = await googleAccessToken(JSON.parse(credentialsRaw));
      if (action === 'search_analytics') return new Response(JSON.stringify({ ok: true, ...(await searchAnalytics(token, searchProperty, requestBody)) }), { headers: jsonHeaders });
      if (action === 'refresh_local_seo_performance') return new Response(JSON.stringify({ ok: true, ...(await refreshPerformance(token, searchProperty, requestBody)) }), { headers: jsonHeaders });
      const url = String(requestBody.url || '');
      if (!/^https:\/\/bietalreef\.ae\/(?:en\/)?uae\/abu-dhabi\/al-ain(?:\/[a-z0-9-]+){0,3}$/.test(url)) return new Response(JSON.stringify({ error: 'Invalid pilot URL' }), { status: 400, headers: jsonHeaders });
      const rows = await registryRequest(`local_seo_url_registry?select=url&url=eq.${encodeURIComponent(url)}`);
      if (!rows.length) return new Response(JSON.stringify({ error: 'URL not registered' }), { status: 404, headers: jsonHeaders });
      const inspection = await inspectUrl(token, searchProperty, url);
      if (inspection.ok) {
        const result = inspection.result?.indexStatusResult || {};
        await registryRequest(`local_seo_url_registry?url=eq.${encodeURIComponent(url)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ inspection_state: result.verdict || 'unknown', google_canonical: result.googleCanonical || null, last_crawl_at: result.lastCrawlTime || null, last_inspected_at: new Date().toISOString() }) });
      }
      return new Response(JSON.stringify({ ...inspection, request_indexing: false }), { status: inspection.ok ? 200 : 502, headers: jsonHeaders });
    }
    const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    const merchantId = Deno.env.get("GOOGLE_MERCHANT_ACCOUNT_ID");
    const property = Deno.env.get("GOOGLE_SEARCH_CONSOLE_PROPERTY");
    if (!raw || !merchantId || !property) {
      return new Response(JSON.stringify({ ok: false, stage: "secrets", configured: { serviceAccount: !!raw, merchantId: !!merchantId, searchConsoleProperty: !!property } }), { status: 500, headers: jsonHeaders });
    }

    const writeActions = new Set(["submit_sitemap", "submit_platform_sitemap"]);
    if (writeActions.has(action) && !(await verifyPlatformAdmin(req))) {
      return new Response(JSON.stringify({ ok: false, action, stage: "authorization", error: "Platform admin authorization is required." }), { status: 403, headers: jsonHeaders });
    }

    const credentials = JSON.parse(raw);
    const accessToken = await googleAccessToken(credentials);
    const auth = { authorization: `Bearer ${accessToken}` };
    const [merchantResponse, searchResponse] = await Promise.all([
      fetch(`https://merchantapi.googleapis.com/accounts/v1/accounts/${encodeURIComponent(merchantId)}`, { headers: auth }),
      fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}`, { headers: auth }),
    ]);
    const merchantBody = await merchantResponse.json().catch(() => ({}));
    const searchBody = await searchResponse.json().catch(() => ({}));

    if (action === "submit_sitemap" || action === "submit_platform_sitemap") {
      if (!searchResponse.ok) return new Response(JSON.stringify({ ok: false, action, stage: "search-console-property", searchConsole: { status: searchResponse.status, property, error: searchBody.error?.message ?? "property check failed" }, checkedAt: new Date().toISOString() }), { status: 502, headers: jsonHeaders });
      const isPlatform = action === "submit_platform_sitemap";
      const targetSitemap = isPlatform ? PLATFORM_SITEMAP : MARKETPLACE_SITEMAP;
      const targetRoot = isPlatform ? PLATFORM_ROOT : MARKETPLACE_ROOT;
      const submission = await submitSitemap(accessToken, property, targetSitemap, targetRoot, isPlatform ? "ar-AE" : "ar-AE");
      let registryStamped = false;
      if (isPlatform && submission.ok) {
        try { await registryRequest('local_seo_url_registry?sitemap_eligible=eq.true', { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ sitemap_last_submitted_at: new Date().toISOString() }) }); registryStamped = true; } catch { /* Sitemap result stays truthful if registry is unavailable. */ }
      }
      return new Response(JSON.stringify({
        registryStamped,
        ok: submission.ok,
        action,
        target: isPlatform ? "platform" : "marketplace",
        searchConsole: { property: searchBody.siteUrl ?? property, permission: searchBody.permissionLevel ?? null },
        ...submission,
        checkedAt: new Date().toISOString(),
      }), { status: submission.ok ? 200 : 502, headers: jsonHeaders });
    }

    if (action === "inspect_root" || action === "inspect_platform_root") {
      const isPlatform = action === "inspect_platform_root";
      const targetRoot = isPlatform ? PLATFORM_ROOT : MARKETPLACE_ROOT;
      const inspection = await inspectUrl(accessToken, property, targetRoot, "ar-AE");
      return new Response(JSON.stringify({ ok: searchResponse.ok && inspection.ok, action, target: isPlatform ? "platform" : "marketplace", searchConsole: { status: searchResponse.status, property: searchBody.siteUrl ?? property, permission: searchBody.permissionLevel ?? null, error: searchResponse.ok ? null : searchBody.error?.message ?? "request failed" }, rootInspection: inspection, checkedAt: new Date().toISOString() }), { status: searchResponse.ok && inspection.ok ? 200 : 502, headers: jsonHeaders });
    }

    const result = {
      ok: merchantResponse.ok && searchResponse.ok,
      action: "health",
      token: "issued",
      merchant: { ok: merchantResponse.ok, status: merchantResponse.status, account: merchantBody.accountId ?? merchantId, name: merchantBody.accountName ?? merchantBody.name ?? null, error: merchantResponse.ok ? null : merchantBody.error?.message ?? "request failed" },
      searchConsole: { ok: searchResponse.ok, status: searchResponse.status, property: searchBody.siteUrl ?? property, permission: searchBody.permissionLevel ?? null, error: searchResponse.ok ? null : searchBody.error?.message ?? "request failed" },
      targets: {
        marketplace: { root: MARKETPLACE_ROOT, sitemap: MARKETPLACE_SITEMAP },
        platform: { root: PLATFORM_ROOT, sitemap: PLATFORM_SITEMAP },
      },
      checkedAt: new Date().toISOString(),
    };
    return new Response(JSON.stringify(result), { status: result.ok ? 200 : 502, headers: jsonHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, stage: "exception", error: error instanceof Error ? error.message : "unknown error", checkedAt: new Date().toISOString() }), { status: 500, headers: jsonHeaders });
  }
});


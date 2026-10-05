// Shared by the existing Search Console Edge Function and tests. No publishing API.
export function validateSearchRequest(input = {}) {
  const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value;
  if (!date(input.startDate) || !date(input.endDate) || input.startDate > input.endDate) throw new Error('Invalid date range');
  if ((Date.parse(input.endDate) - Date.parse(input.startDate)) / 86400000 > 92) throw new Error('Use a window of at most 93 days');
  const dimensions = input.dimensions || ['page', 'query'];
  if (!Array.isArray(dimensions) || !dimensions.length || new Set(dimensions).size !== dimensions.length || dimensions.some(item => !['query', 'page', 'date', 'device', 'country'].includes(item))) throw new Error('Invalid dimensions');
  if (input.page && (!/^https:\/\/bietalreef\.ae\/(?:en\/)?uae\/abu-dhabi\/al-ain(?:\/[a-z0-9-]+){0,3}$/.test(input.page))) throw new Error('Invalid pilot page');
  return { startDate: input.startDate, endDate: input.endDate, dimensions, type: 'web', dataState: 'final', rowLimit: 25000,
    ...(input.page ? { dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: input.page }] }] } : { dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: '/uae/abu-dhabi/al-ain' }] }] }) };
}
export function normalizeSearchRows(rows, dimensions) {
  return (rows || []).map(row => ({ ...Object.fromEntries(dimensions.map((key, i) => [key, String(row.keys?.[i] || '').slice(0, 1000)])),
    clicks: Number(row.clicks) || 0, impressions: Number(row.impressions) || 0, ctr: Number(row.ctr) || 0, position: Number(row.position) || 0 }));
}
export function recommendOpportunity({ entity = {}, content = {}, search = {}, previous = {}, conversions = {}, ads = {}, approved = false, rejected = false } = {}) {
  const reasons = [];
  if (rejected) return { state: 'rejected', why_this_candidate: ['Editorial rejection'], auto_publish: false, score: null };
  const missing = Object.entries({ real_service: entity.serviceExists, published_service: entity.servicePublished, eligible_provider: entity.providerEligible, real_coverage: entity.coverage, valid_category: entity.categoryValid, useful_content: content.useful, source_provenance: content.sourceReviewed }).filter(([, value]) => value !== true).map(([key]) => key);
  if (missing.length) return { state: 'not_ready', why_this_candidate: missing.map(key => 'Missing mandatory gate: ' + key), auto_publish: false, score: null };
  const commercial = search.commercialIntent === true || ads.commercialIntent === true;
  // Compare matching windows only; never infer a trend from unmatched periods.
  const comparable = Boolean(search.windowDays > 0 && search.windowDays === previous.windowDays && search.complete === true && previous.complete === true);
  const rising = comparable && search.impressions > previous.impressions;
  const conversion = ['phone_click', 'whatsapp_click', 'request_quote'].some(key => Number(conversions[key]) > 0) || Number(ads.conversions) > 0;
  const ctrGap = search.peerBenchmark?.matched === true && Number(search.peerBenchmark.ctr) > Number(search.ctr) && Number(search.impressions) > 0;
  if (commercial) reasons.push('Commercial intent reviewed by an editor');
  if (rising) reasons.push('Impressions rose in comparable complete windows');
  if (conversion) reasons.push('Observed lead-intent clicks; not completed jobs or revenue');
  if (ctrGap) reasons.push('CTR below an explicitly matched observed peer benchmark');
  if (!comparable) reasons.push('Trend unavailable: matching complete comparison windows required');
  if (!approved) reasons.push('Waiting for editorial approval');
  const evidence = { commercial_intent: commercial, rising_impressions: rising, conversion_evidence: conversion, observed_ctr_gap: ctrGap };
  // Score is a disclosed evidence count for triage, not a publication threshold.
  return { state: approved && commercial && (rising || conversion || ctrGap) ? 'recommended' : 'candidate',
    why_this_candidate: reasons.length ? reasons : ['Entity and content are ready; search/conversion evidence is pending'], evidence,
    score: Object.values(evidence).filter(Boolean).length, score_definition: 'Count of four disclosed supporting signals; mandatory gates are separate', auto_publish: false };
}
export const ADS_ADAPTER = Object.freeze({ status: 'not_connected', searchTerms: [], conversions: null, reason: 'No Google Ads Search Terms API integration found in the audited project; tracking tags are not an Ads data adapter.' });

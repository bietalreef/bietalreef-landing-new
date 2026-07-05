export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createRequestNumber(prefix = 'BR') {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

function sanitizeAttachments(raw) {
  if (!Array.isArray(raw)) return [];

  return raw
    .slice(0, 4)
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      name: String(item.name || 'image').slice(0, 120),
      type: String(item.type || 'image/jpeg').slice(0, 60),
      size: Number.isFinite(Number(item.size)) ? Number(item.size) : 0,
      data_url: String(item.data_url || '').startsWith('data:image/') ? String(item.data_url || '') : '',
    }))
    .filter((item) => item.data_url && item.size > 0);
}

function normalizePayload(body, requestNumber) {
  const payload = body?.payload && typeof body.payload === 'object' ? body.payload : body || {};
  const attachments = sanitizeAttachments(payload.attachments);
  const currentUtm = payload.utm && typeof payload.utm === 'object' ? payload.utm : {};
  const attachmentMeta = attachments.map((item) => ({
    name: item.name,
    type: item.type,
    size: item.size,
  }));

  return {
    ...payload,
    request_number: requestNumber,
    full_name: String(payload.full_name || '').trim(),
    phone: String(payload.phone || '').trim(),
    email: String(payload.email || '').trim(),
    source_path: String(payload.source_path || '').trim(),
    source_page_title: String(payload.source_page_title || '').trim(),
    attachments,
    image_attachments: attachments,
    attachments_count: attachments.length,
    attachments_meta: attachmentMeta,
    utm: attachments.length > 0 ? { ...currentUtm, attachments_meta: attachmentMeta, attachments_count: attachments.length } : currentUtm,
  };
}

function pickRpc(formType) {
  if (formType === 'quote') return 'submit_public_quote_request';
  if (formType === 'inquiry') return 'submit_public_website_inquiry';
  return null;
}

function clientErrorMessage(rawMessage = '') {
  if (rawMessage.includes('FULL_NAME_REQUIRED')) return 'اكتب الاسم من فضلك.';
  if (rawMessage.includes('INVALID_PHONE')) return 'اكتب رقم هاتف صحيح.';
  if (rawMessage.includes('MESSAGE_REQUIRED')) return 'اكتب تفاصيل الاستفسار بشكل أوضح.';
  if (rawMessage.includes('PROJECT_DESCRIPTION_REQUIRED')) return 'اكتب تفاصيل المشروع أو الخدمة المطلوبة.';
  return 'تعذر إرسال الطلب الآن. حاول مرة أخرى بعد قليل.';
}

function normalizeRpcResult(data, fallbackRequestNumber) {
  const result = Array.isArray(data) ? (data[0] || {}) : (data || {});
  const requestNumber =
    result.request_number ||
    result.request_no ||
    result.lead_number ||
    result.quote_number ||
    result.inquiry_number ||
    fallbackRequestNumber;

  return {
    ok: result.ok !== false,
    ...result,
    request_number: requestNumber,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ ok: false, message: 'إعدادات الربط غير مكتملة.', missing: { SUPABASE_URL: !SUPABASE_URL, SUPABASE_ANON_KEY: !SUPABASE_ANON_KEY } });
  }

  const formType = req.body?.formType;
  const rpcName = pickRpc(formType);
  if (!rpcName) {
    return res.status(400).json({ ok: false, message: 'نوع الطلب غير صحيح.' });
  }

  const requestNumber = createRequestNumber(formType === 'quote' ? 'BRQ' : 'BRI');
  const payload = normalizePayload(req.body, requestNumber);
  payload.user_agent = req.headers['user-agent'] || '';

  try {
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${rpcName}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_payload: payload }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(400).json({ ok: false, message: clientErrorMessage(data?.message || data?.error || ''), error: data?.message || data?.error || 'request_failed' });
    }

    return res.status(200).json(normalizeRpcResult(data, requestNumber));
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'تعذر الاتصال الآن. حاول مرة أخرى.', error: error?.message || 'network_error' });
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function normalizePayload(body) {
  const payload = body?.payload && typeof body.payload === 'object' ? body.payload : body || {};
  return {
    ...payload,
    full_name: String(payload.full_name || '').trim(),
    phone: String(payload.phone || '').trim(),
    email: String(payload.email || '').trim(),
    source_path: String(payload.source_path || '').trim(),
    source_page_title: String(payload.source_page_title || '').trim(),
    utm: payload.utm && typeof payload.utm === 'object' ? payload.utm : {},
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ ok: false, message: 'إعدادات الربط غير مكتملة.' });
  }

  const formType = req.body?.formType;
  const rpcName = pickRpc(formType);
  if (!rpcName) {
    return res.status(400).json({ ok: false, message: 'نوع الطلب غير صحيح.' });
  }

  const payload = normalizePayload(req.body);
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
      return res.status(400).json({ ok: false, message: clientErrorMessage(data?.message), error: data?.message || 'request_failed' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'تعذر الاتصال الآن. حاول مرة أخرى.', error: error?.message || 'network_error' });
  }
}

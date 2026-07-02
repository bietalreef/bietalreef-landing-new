const WEYAK_SYSTEM_PROMPT = `
أنت "وياك"، المساعد الذكي الرسمي لموقع بيت الريف.

نطاقك:
- بيت الريف.
- المقاولات والبناء.
- التصميم الداخلي والخارجي.
- مواد البناء والمنتجات والخدمات والعروض.
- توجيه العميل داخل الموقع وطلب عرض السعر.

قواعد مهمة:
1. تحدث بالعربية بوضوح وبأسلوب خليجي/إماراتي محترم عند الحاجة.
2. لا تخترع أسماء مزودين أو منتجات أو أسعار غير موجودة.
3. إذا سألك العميل عن سعر، وجّهه إلى طلب عرض سعر أو التواصل مع المزود.
4. إذا كان السؤال خارج مجال بيت الريف والبناء، اعتذر بلطف وارجعه للموضوع.
5. اجعل الرد مختصرًا ومفيدًا، واسأل سؤال متابعة واحدًا فقط عند الحاجة.
6. هذه نسخة أولية تعتمد على GPT-4o mini، وسيتم ربطها لاحقًا ببيانات Supabase الحية.
`;

const MODEL = 'gpt-4o-mini';
const WEYAK_VERSION = 'weyak-gpt4o-mini-v2';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Weyak-Version', WEYAK_VERSION);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('Weyak chat missing OPENAI_API_KEY');
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا. يرجى المحاولة لاحقًا.',
      version: WEYAK_VERSION,
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required',
        version: WEYAK_VERSION,
      });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 450,
        messages: [
          { role: 'system', content: WEYAK_SYSTEM_PROMPT },
          { role: 'user', content: message.trim() },
        ],
      }),
    });

    const rawText = await openaiResponse.text();
    let data = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch (parseError) {
      console.error('Weyak OpenAI non-JSON response:', rawText?.slice(0, 500));
      throw parseError;
    }

    if (!openaiResponse.ok) {
      console.error('Weyak OpenAI error:', {
        status: openaiResponse.status,
        body: data,
      });

      return res.status(200).json({
        reply: 'المعذرة، خدمة وياك واجهت مشكلة مؤقتة في الاتصال بالذكاء الاصطناعي. حاول مرة ثانية بعد لحظات.',
        model: MODEL,
        version: WEYAK_VERSION,
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error('Weyak empty OpenAI reply:', data);
      return res.status(200).json({
        reply: 'وصلت رسالتك، لكن لم أتمكن من تجهيز رد مناسب الآن. حاول مرة أخرى.',
        model: MODEL,
        version: WEYAK_VERSION,
      });
    }

    return res.status(200).json({
      reply,
      model: MODEL,
      version: WEYAK_VERSION,
    });
  } catch (error) {
    console.error('Weyak chat fatal error:', error);

    return res.status(200).json({
      reply: 'المعذرة، واجهت مشكلة تقنية بسيطة. حاول مرة ثانية بعد لحظات.',
      model: MODEL,
      version: WEYAK_VERSION,
    });
  }
}

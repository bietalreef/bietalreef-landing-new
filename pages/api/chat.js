import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      reply: 'إعدادات وياك غير مكتملة حاليًا. يرجى المحاولة لاحقًا.',
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      max_tokens: 450,
      messages: [
        { role: 'system', content: WEYAK_SYSTEM_PROMPT },
        { role: 'user', content: message.trim() },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      reply: reply || 'وصلت رسالتك، لكن لم أتمكن من تجهيز رد مناسب الآن. حاول مرة أخرى.',
      model: 'gpt-4o-mini',
    });
  } catch (error) {
    console.error('Weyak chat error:', error);

    return res.status(500).json({
      reply: 'المعذرة، واجهت مشكلة تقنية بسيطة. حاول مرة ثانية بعد لحظات.',
    });
  }
}

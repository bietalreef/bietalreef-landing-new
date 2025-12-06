import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System Prompt for Weyak
const SYSTEM_PROMPT = `
أنت "وياك"، الشريك الذكي والمدير التقني لمنصة "بيت الريف". أنت مب بس وكيل ذكاء اصطناعي، أنت رفيق الدرب الرقمي لكل مستخدم، تتكلم وتفكر كإماراتي أصيل، وتجمع بين الحرفية العالية والروح الطيبة.

شخصيتك:
* المساعد الذكي: تنادي المستخدم "يا طويل العمر" أو "يا الغالي".
* إماراتي أصيل: سوالفك وروحك من روح الإمارات. تستخدم كلمات مثل "أبشر"، "فالك طيب"، "ما عليك زود"، "زهّب عمرك".
* خبير وواثق: تعرف شغلك عدل، وتنفذ المهام بثقة واحترافية.
* إيجابي ومبادر: دايماً متفائل، وتعرض المساعدة قبل ما تنطلب منك.
* يحب يمزح: عندك حس فكاهي خفيف ومحترم.

قواعد السلوك:
1. فالك طيب: نفّذ المطلوب بسرعة واحترافية.
2. العلم الغانم: لا تقول "اكتمل" إلا يوم المستخدم يقول "تم".
3. شورك وهداية الله: اعرض دايماً خيارات ذكية ومبتكرة.
4. الصدق منجاة: لا تدّعي إنك سويت شي وأنت ما سويته.
5. خلك قريب: حافظ على التواصل الودي والإيجابي.

مهمتك الحالية:
مساعدة المستخدم في استكشاف منصة بيت الريف، الإجابة على استفساراته حول البناء والتصميم، وتوجيهه للأدوات المناسبة.
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare messages array with system prompt and history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using GPT-4o for best performance
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}

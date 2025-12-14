import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, threadId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if Assistant ID is configured
    if (!ASSISTANT_ID) {
      // Fallback to Chat Completions if no Assistant ID is provided
      console.warn('No Assistant ID provided, falling back to Chat Completions');
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: `أنت "وياك"، المساعد الذكي لمنصة "بيت الريف" فقط.
          
          تعليمات صارمة جداً:
          1. تخصصك الوحيد هو: البناء، التصميم المعماري، المقاولات، وإدارة المشاريع في الإمارات عبر منصة بيت الريف.
          2. ممنوع منعاً باتاً الإجابة عن أي موضوع آخر (مثل: الطبخ، الدراسة، الرياضة، السياسة، النكت، الطقس، أو أي معلومات عامة).
          3. إذا سألك المستخدم عن شيء خارج تخصصك، قل فوراً وبأدب: "السموحة منك يا الغالي، أنا متخصص فقط في أمور البناء وبيت الريف. آمرني في شي يخص مشروعك؟".
          4. لا تقدم أي "وصفات طهو" أو "مساعدة دراسية" أبداً.
          5. تحدث دائماً باللهجة الإماراتية الودودة والمحترمة.` },
          { role: 'user', content: message }
        ],
      });
      return res.status(200).json({ 
        reply: completion.choices[0].message.content,
        threadId: null 
      });
    }

    let currentThreadId = threadId;

    // 1. Create a Thread if not exists
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // 2. Add a Message to the Thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: "user",
      content: message
    });

    // 3. Run the Assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
      additional_instructions: "أنت 'وياك'، المساعد الذكي لمنصة 'بيت الريف'. مهمتك فقط الإجابة عن الأسئلة المتعلقة ببيت الريف، البناء، التصميم المعماري، والمقاولات في الإمارات. إذا سألك المستخدم عن أي موضوع آخر (مثل الرياضة، السياسة، الطبخ، أو معلومات عامة غير مرتبطة بالبناء)، اعتذر بلطف وقل: 'السموحة منك، أنا متخصص فقط في أمور البناء وبيت الريف. آمرني في شي يخص مشروعك؟'. حافظ على اللهجة الإماراتية الودودة."
    });

    // 4. Poll for the Run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);

    // Wait for completion (simple polling)
    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
        throw new Error(`Run failed with status: ${runStatus.status}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    }

    // 5. Get the latest response
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    
    // Find the last message from the assistant
    const lastMessage = messages.data
      .filter(msg => msg.role === 'assistant')
      .shift();

    if (!lastMessage) {
      throw new Error('No response from assistant');
    }

    const reply = lastMessage.content[0].text.value;

    res.status(200).json({ 
      reply, 
      threadId: currentThreadId 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}

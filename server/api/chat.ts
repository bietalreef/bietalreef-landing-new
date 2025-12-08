import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Assistant ID should be in environment variables, but for now we'll use the one we configured
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || 'asst_5HYarjVP0948TZefFqbYXfVF';

router.post('/chat', async (req, res) => {
  try {
    const { message, threadId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let currentThreadId = threadId;

    // Create a thread if one doesn't exist
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for the run to complete
    // Using 'as any' to bypass strict type checking for the retrieve method which seems to have a mismatch in the installed types
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id as any);
    
    // Wait for completion (simple polling)
    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed' || runStatus.status === 'cancelled' || runStatus.status === 'expired') {
        throw new Error(`Run failed with status: ${runStatus.status}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id as any);
    }

    // Get the latest message
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    
    // Find the last message from the assistant
    const lastMessage = messages.data
      .filter(msg => msg.role === 'assistant')
      .shift();

    if (!lastMessage || !lastMessage.content[0] || lastMessage.content[0].type !== 'text') {
      throw new Error('No valid response from assistant');
    }

    const reply = lastMessage.content[0].text.value;

    res.json({ 
      reply,
      threadId: currentThreadId 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

export default router;

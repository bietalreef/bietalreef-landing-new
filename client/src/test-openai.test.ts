import { describe, it, expect } from 'vitest';
import OpenAI from 'openai';

describe('OpenAI API Key Validation', () => {
  it('should successfully connect to OpenAI API', async () => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    try {
      const models = await openai.models.list();
      expect(models.data.length).toBeGreaterThan(0);
    } catch (error) {
      throw new Error(`Failed to connect to OpenAI API: ${error}`);
    }
  });
});

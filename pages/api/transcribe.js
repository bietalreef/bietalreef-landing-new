import OpenAI from 'openai';
import fs from 'fs';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({});
    
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file.filepath),
      model: 'whisper-1',
      language: 'ar', // Force Arabic language detection
    });

    res.status(200).json({ text: transcription.text });
  } catch (error) {
    console.error('Transcription Error:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
}

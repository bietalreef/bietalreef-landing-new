const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function findAssistant() {
  try {
    console.log('Listing assistants...');
    const myAssistants = await openai.beta.assistants.list({
      order: "desc",
      limit: 20,
    });

    console.log('Found assistants:');
    myAssistants.data.forEach((assistant) => {
      console.log(`- Name: ${assistant.name}, ID: ${assistant.id}`);
    });

    const weyak = myAssistants.data.find(a => a.name && (a.name.includes('وياك') || a.name.toLowerCase().includes('weyaak')));
    
    if (weyak) {
      console.log(`\n✅ Found Weyak Assistant: ${weyak.id}`);
    } else {
      console.log('\n❌ Could not find an assistant named "Weyaak" or "وياك". Please check the name.');
    }
  } catch (error) {
    console.error('Error listing assistants:', error);
  }
}

findAssistant();

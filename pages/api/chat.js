export default async function handler(req, res) {
  if (!process.env.WEYAAK_REASONING_EFFORT) {
    process.env.WEYAAK_REASONING_EFFORT = 'minimal';
  }

  const { default: weyaakAgentHandler } = await import('../../lib/weyaakAgentHandlerV5');
  return weyaakAgentHandler(req, res);
}

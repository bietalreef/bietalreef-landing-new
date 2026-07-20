const PAYLOAD_PROPERTIES = {
  full_name: { type: 'string' },
  phone: { type: 'string' },
  email: { type: 'string' },
  emirate: { type: 'string' },
  city: { type: 'string' },
  service_category: { type: 'string' },
  specifications: { type: 'string' },
  measurements: { type: 'string' },
  budget_range: { type: 'string' },
  timeline: { type: 'string' },
  project_description: { type: 'string' },
  preferred_contact: { type: 'string' },
  inquiry_topic: { type: 'string' },
  message: { type: 'string' },
  business_name: { type: 'string' },
  business_location: { type: 'string' },
  specialty: { type: 'string' },
  service_areas: { type: 'string' },
  license_status: { type: 'string' },
  portfolio_status: { type: 'string' },
};

export const WEYAAK_TOOLS = [
  {
    type: 'function',
    name: 'search_providers',
    description: 'Search live published Biet Alreef providers in Supabase. Call this before mentioning any provider name or saying whether a provider is available. The specialty must match the requested service; a location match alone is never enough.',
    strict: true,
    parameters: {
      type: 'object',
      properties: {
        service: {
          type: 'string',
          description: 'The requested trade or service only, without the city. Examples: نجارة، رخام وجرانيت، تنظيف كنب.',
        },
        city: {
          type: ['string', 'null'],
          description: 'Requested city or area, such as العين. Use null when the user did not specify it.',
        },
        emirate: {
          type: ['string', 'null'],
          description: 'Requested emirate, such as أبوظبي. Use null when unknown.',
        },
      },
      required: ['service', 'city', 'emirate'],
      additionalProperties: false,
    },
  },
];

export const WEYAAK_OUTPUT_FORMAT = {
  type: 'json_schema',
  name: 'weyaak_agent_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      reply: {
        type: 'string',
        description: 'A brief, natural Arabic or English reply in the user language. Ask at most one question.',
      },
      audience: {
        type: 'string',
        enum: ['customer', 'provider', 'unknown'],
      },
      intent: {
        type: 'string',
        enum: [
          'provider_search',
          'service_question',
          'product_search',
          'quote_request',
          'tender',
          'legal',
          'inquiry',
          'provider_subscription',
          'platform_info',
          'out_of_scope',
          'general',
        ],
      },
      match_status: {
        type: 'string',
        enum: ['matched', 'unmatched', 'not_applicable'],
      },
      links: {
        type: 'array',
        maxItems: 5,
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            href: { type: 'string' },
          },
          required: ['label', 'href'],
          additionalProperties: false,
        },
      },
      intake_type: {
        type: 'string',
        enum: ['none', 'quote_request', 'inquiry', 'provider_interest'],
      },
      action: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['none', 'quote_request', 'inquiry', 'provider_interest'],
          },
          ready_to_submit: { type: 'boolean' },
          payload: {
            type: 'object',
            properties: PAYLOAD_PROPERTIES,
            required: Object.keys(PAYLOAD_PROPERTIES),
            additionalProperties: false,
          },
        },
        required: ['type', 'ready_to_submit', 'payload'],
        additionalProperties: false,
      },
    },
    required: ['reply', 'audience', 'intent', 'match_status', 'links', 'intake_type', 'action'],
    additionalProperties: false,
  },
};

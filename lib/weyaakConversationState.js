// Compatibility adapter for the current chat UI.
// The Responses API agent is now the only component allowed to infer intent
// or extract fields from user messages. This adapter preserves server state
// without modifying it.
export function applyAnswerToWeyaakState(state = {}) {
  return {
    audience: state.audience || 'unknown',
    intent: state.intent || 'general',
    payload: { ...(state.payload || {}) },
  };
}

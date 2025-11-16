// MemAgent AI SDK (v2.0) - A thin client for the MemAgent backend service.
// "Give any web app a brain in 1 line of code"

let backendUrl = 'http://localhost:3000';

/**
 * Initializes the SDK.
 * @param {object} config - Optional configuration.
 * @param {string} config.backendUrl - The URL of the MemAgent backend.
 */
export function init(config = {}) {
  if (config.backendUrl) {
    backendUrl = config.backendUrl;
  }
  console.log(`MemAgent SDK initialized to use backend at ${backendUrl}`);
}

/**
 * Sends a query to the backend, gets an AI response enriched with memory,
 * and implicitly saves the interaction.
 * @param {string} userQuery - The user's message.
 * @returns {Promise<object>} An object containing the AI's response and any memory context used.
 */
export async function chat(userQuery) {
  if (!userQuery) {
    throw new Error('Query cannot be empty.');
  }

  const response = await fetch(`${backendUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: userQuery }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get response from backend.');
  }

  return response.json();
}


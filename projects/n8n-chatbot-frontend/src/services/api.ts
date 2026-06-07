/**
 * API Service for n8n Webhook Chat
 */

import type {
  ChatRequest,
  ChatResponse,
} from '../types';

const DEFAULT_WEBHOOK_URL = '/webhook/df5556cd-8e6e-4145-ad04-fa1b769fa7ff';

const STORAGE_KEY = 'n8n_webhook_url';

/**
 * Get webhook URL from localStorage or use default
 */
export function getWebhookUrl(): string {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_WEBHOOK_URL;
}

/**
 * Save webhook URL to localStorage
 */
export function saveWebhookUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY, url);
}

/**
 * Send chat message to n8n webhook
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const webhookUrl = getWebhookUrl();

  console.log('Sending to webhook:', webhookUrl);
  console.log('Request body:', {
    chatInput: request.message,
    sessionId: request.session_id,
  });

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatInput: request.message,
      sessionId: request.session_id,
    }),
  });

  console.log('Response status:', response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'No error details');
    console.error('Error response:', errorText);
    throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Response data:', data);

  // Handle various response formats from n8n
  return {
    output: data.output || data.text || data.response || data.message || '',
    text: data.text || data.output || data.response || data.message || '',
    response: data.response || data.output || data.text || data.message || '',
    message: data.message || data.output || data.text || data.response || '',
  };
}

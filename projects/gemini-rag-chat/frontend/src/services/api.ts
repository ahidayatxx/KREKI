/**
 * API Service for Gemini RAG Chat Backend
 */

import type {
  ChatRequest,
  ChatResponse,
  FileSearchStoreInfo,
  FileSearchStore,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000';


/**
 * Chat API
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to send message');
  }

  return response.json();
}


/**
 * File Search Store API
 */
export async function createFileSearchStore(
  sessionId: string,
  displayName?: string
): Promise<FileSearchStoreInfo> {
  const params = new URLSearchParams();
  if (displayName) params.append('display_name', displayName);

  const response = await fetch(`${API_BASE_URL}/file-search-store?session_id=${sessionId}${displayName ? `&display_name=${encodeURIComponent(displayName)}` : ''}`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to create file search store');
  }

  return response.json();
}


/**
 * Upload file to File Search Store
 */
export async function uploadFile(
  file: File,
  options?: {
    sessionId?: string;
    displayName?: string;
    storeName?: string;
  }
): Promise<{ status: string; store_name: string; filename: string; message: string; gemini_file_name?: string }> {
  const formData = new FormData();
  formData.append('file', file);
  if (options?.sessionId) formData.append('session_id', options.sessionId);
  if (options?.displayName) formData.append('display_name', options.displayName);
  if (options?.storeName) formData.append('store_name', options.storeName);

  const response = await fetch(`${API_BASE_URL}/upload-file`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to upload file');
  }

  return response.json();
}


/**
 * List all File Search Stores
 */
export async function listFileSearchStores(): Promise<{ stores: FileSearchStore[] }> {
  const response = await fetch(`${API_BASE_URL}/file-search-stores`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to list file search stores');
  }

  return response.json();
}


/**
 * Get File Search Store details
 */
export async function getFileSearchStore(storeName: string): Promise<FileSearchStore> {
  const response = await fetch(`${API_BASE_URL}/file-search-store/?store_name=${encodeURIComponent(storeName)}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to get file search store');
  }

  return response.json();
}


/**
 * Delete File Search Store
 */
export async function deleteFileSearchStore(storeName: string, force = false): Promise<{ status: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/file-search-store/?store_name=${encodeURIComponent(storeName)}&force=${force}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to delete file search store');
  }

  return response.json();
}


/**
 * Health Check
 */
export async function healthCheck(): Promise<{ status: string; model: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error('Health check failed');
  }

  return response.json();
}


/**
 * WebSocket Chat Connection
 */
export class WebSocketChatConnection {
  private ws: WebSocket | null = null;
  private sessionId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  connect(
    onMessage: (response: string, citations?: Array<{ source?: string; text?: string }>) => void,
    onError: (error: string) => void,
    onOpen?: () => void,
    onClose?: () => void
  ): void {
    const wsUrl = `${WS_BASE_URL}/ws/chat/${this.sessionId}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        onOpen?.();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.error) {
            onError(data.error);
          } else if (data.response) {
            onMessage(data.response, data.citations);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      this.ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        onError('WebSocket connection error');
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        onClose?.();

        // Attempt to reconnect
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = this.reconnectDelay * this.reconnectAttempts;
          setTimeout(() => {
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            this.connect(onMessage, onError, onOpen, onClose);
          }, delay);
        }
      };
    } catch (e) {
      onError(`Failed to connect: ${e}`);
    }
  }

  sendMessage(message: string, useFileSearch = true): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        message,
        use_file_search: useFileSearch,
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

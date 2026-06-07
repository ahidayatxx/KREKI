// Message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// API Request/Response types for n8n webhook
export interface ChatRequest {
  message: string;
  session_id: string;
}

export interface ChatResponse {
  output?: string;
  text?: string;
  response?: string;
  message?: string;
}

// Session state
export interface SessionState {
  sessionId: string;
}

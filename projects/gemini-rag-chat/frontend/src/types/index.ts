// Message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  source?: string;
  text?: string;
}

// API Request/Response types
export interface ChatRequest {
  message: string;
  session_id: string;
  use_file_search: boolean;
}

export interface ChatResponse {
  response: string;
  citations?: Citation[];
}

export interface FileSearchStoreInfo {
  store_name: string;
  display_name: string;
  document_count: number;
}

export interface FileSearchStore {
  name: string;
  displayName?: string;
  createTime?: string;
  updateTime?: string;
  activeDocumentsCount?: string;
  sizeBytes?: string;
}

// WebSocket types
export interface WebSocketMessage {
  type: 'chat' | 'error' | 'connected' | 'disconnected';
  data?: any;
}

export interface WebSocketChatRequest {
  message: string;
  use_file_search: boolean;
}

// Upload state
export interface UploadState {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

// Session state
export interface SessionState {
  sessionId: string;
  fileSearchStoreName?: string;
  documentCount: number;
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Upload, FileText, Trash2, Plus, X, CheckCircle, FolderPlus, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendChatMessage, uploadFile, listFileSearchStores, getFileSearchStore } from './services/api';
import type { ChatMessage, UploadState, SessionState, FileSearchStore } from './types';

function App() {
  // Session state
  const [sessionState, setSessionState] = useState<SessionState>(() => ({
    sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    documentCount: 0,
  }));

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useFileSearch, setUseFileSearch] = useState(true);

  // Upload state
  const [uploadState, setUploadState] = useState<UploadState | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [availableStores, setAvailableStores] = useState<FileSearchStore[]>([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [showStoreSelector, setShowStoreSelector] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setIsLoading(true);

    // Add placeholder for assistant response
    const assistantId = `msg-${Date.now() + 1}`;
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await sendChatMessage({
        message: messageToSend,
        session_id: sessionState.sessionId,
        use_file_search: useFileSearch,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: response.response, citations: response.citations, timestamp: new Date() }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                role: 'system',
                content: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, useFileSearch, sessionState.sessionId]);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File, storeName?: string) => {
    setUploadState({
      file,
      progress: 0,
      status: 'uploading',
    });

    try {
      setUploadState((prev) => prev ? { ...prev, progress: 20, status: 'processing' } : null);

      // Upload file with specified store name
      const result = await uploadFile(file, {
        sessionId: sessionState.sessionId,
        displayName: file.name,
        storeName: storeName,
      });

      // Update session state with the store name from the upload response
      if (result.store_name && result.store_name !== sessionState.fileSearchStoreName) {
        setSessionState((prev) => ({
          ...prev,
          fileSearchStoreName: result.store_name,
          documentCount: prev.documentCount + 1,
        }));
      } else {
        setSessionState((prev) => ({
          ...prev,
          documentCount: prev.documentCount + 1,
        }));
      }

      setUploadState({
        file,
        progress: 100,
        status: 'completed',
      });

      setTimeout(() => {
        setUploadState(null);
        setShowUploadModal(false);
      }, 1500);
    } catch (error) {
      setUploadState((prev) =>
        prev
          ? {
              ...prev,
              status: 'error',
              error: error instanceof Error ? error.message : 'Failed to upload file',
            }
          : null
      );
    }
  }, [sessionState.sessionId, sessionState.fileSearchStoreName]);

  // Fetch available stores
  const fetchStores = useCallback(async () => {
    setStoresLoading(true);
    try {
      const result = await listFileSearchStores();
      setAvailableStores(result.stores || []);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setStoresLoading(false);
    }
  }, []);

  // Open upload modal and fetch stores
  const handleOpenUploadModal = useCallback(() => {
    setShowUploadModal(true);
    fetchStores();
  }, [fetchStores]);

  // Handle selecting a store to chat with
  const handleSelectChatStore = useCallback(async (storeName: string) => {
    // Fetch store details to get the actual document count
    try {
      const storeDetails = await getFileSearchStore(storeName);
      const docCount = parseInt(storeDetails.activeDocumentsCount || '0', 10);
      setSessionState((prev) => ({
        ...prev,
        fileSearchStoreName: storeName,
        documentCount: docCount,
      }));
    } catch (error) {
      console.error('Failed to fetch store details:', error);
      // Still update the store name even if fetching details fails
      setSessionState((prev) => ({
        ...prev,
        fileSearchStoreName: storeName,
      }));
    }

    // Also update the backend manager so chat uses this store
    await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/select-store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionState.sessionId, store_name: storeName }),
    }).catch(err => console.error('Failed to update store:', err));
  }, [sessionState.sessionId]);

  // Clear chat
  const handleClearChat = () => {
    setMessages([]);
  };

  // Start new chat
  const handleNewChat = () => {
    setSessionState({
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      documentCount: 0,
    });
    setMessages([]);
    setUseFileSearch(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
          >
            <Plus size={18} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Document Count & File Search Store Info */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <FileText size={18} className="text-gemini-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Documents: {sessionState.documentCount}</p>
              {sessionState.fileSearchStoreName && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={sessionState.fileSearchStoreName}>
                  Store: {sessionState.fileSearchStoreName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Clear Chat */}
        <div className="px-4 pb-4">
          <button
            onClick={handleClearChat}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
            <span className="text-sm">Clear Chat</span>
          </button>
        </div>

        {/* File Search Toggle */}
        <div className="px-4 pb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useFileSearch}
              onChange={(e) => setUseFileSearch(e.target.checked)}
              className="w-4 h-4 text-gemini-600 rounded focus:ring-gemini-500"
            />
            <span className="text-sm">Use File Search</span>
          </label>
        </div>

        {/* Store Selector for Chat */}
        {useFileSearch && (
          <div className="px-4 pb-4">
            <button
              onClick={() => {
                setShowStoreSelector(!showStoreSelector);
                if (!showStoreSelector) fetchStores();
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
            >
              <span className="text-sm font-medium">
                {sessionState.fileSearchStoreName
                  ? (availableStores.find(s => s.name === sessionState.fileSearchStoreName)?.displayName || 'Selected Store')
                  : 'Select Store to Chat'}
              </span>
              <Plus size={16} className={`transition-transform ${showStoreSelector ? 'rotate-45' : ''}`} />
            </button>

            {showStoreSelector && (
              <div className="mt-2 border border-gray-200 dark:border-gray-600 rounded-lg max-h-48 overflow-y-auto bg-white dark:bg-gray-700">
                {storesLoading ? (
                  <p className="text-xs text-gray-500 p-2 text-center">Loading...</p>
                ) : availableStores.length === 0 ? (
                  <p className="text-xs text-gray-500 p-2 text-center">No stores available</p>
                ) : (
                  availableStores.map((store) => (
                    <button
                      key={store.name}
                      onClick={() => {
                        handleSelectChatStore(store.name);
                        setShowStoreSelector(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                        sessionState.fileSearchStoreName === store.name ? 'bg-gemini-100 dark:bg-gemini-900' : ''
                      }`}
                    >
                      <div className="font-medium truncate">
                        {store.displayName || store.name.split('/').pop()}
                      </div>
                      <div className="text-gray-500 truncate flex justify-between">
                        <span>{store.activeDocumentsCount || '0'} docs</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleOpenUploadModal}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gemini-600 hover:bg-gemini-700 text-white rounded-lg transition-colors"
          >
            <Upload size={18} />
            <span className="font-medium">Upload Document</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold">Gemini RAG Chat</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {useFileSearch ? 'Chat with your documents using AI-powered search' : 'Chat with Gemini AI'}
          </p>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gemini-100 dark:bg-gemini-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-gemini-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {useFileSearch
                    ? 'Upload documents and ask questions about them. Gemini will search your files to provide accurate answers.'
                    : 'Ask me anything! I can help you with a wide range of topics.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gemini-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <div className="flex items-center gap-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                    <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gemini-500"
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                  }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gemini-600 hover:bg-gemini-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
          uploadState={uploadState}
          availableStores={availableStores}
          storesLoading={storesLoading}
          onRefreshStores={fetchStores}
          currentStoreName={sessionState.fileSearchStoreName}
        />
      )}
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 message-animate ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gemini-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">G</span>
        </div>
      )}
      <div className={`max-w-2xl ${isUser ? 'bg-gemini-600 text-white' : 'bg-gray-100 dark:bg-gray-800'} rounded-2xl px-4 py-3`}>
        {!isUser ? (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs font-semibold mb-2">Citations:</p>
            <div className="space-y-1">
              {message.citations.map((citation, idx) => (
                <div key={idx} className="text-xs bg-gray-50 dark:bg-gray-700 rounded p-2">
                  {citation.source && <p className="font-mono truncate">{citation.source}</p>}
                  {citation.text && <p className="text-gray-500 dark:text-gray-400 line-clamp-2">{citation.text}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Upload Modal Component
function UploadModal({
  onClose,
  onUpload,
  uploadState,
  availableStores,
  storesLoading,
  onRefreshStores,
  currentStoreName,
}: {
  onClose: () => void;
  onUpload: (file: File, storeName?: string) => void;
  uploadState: UploadState | null;
  availableStores: FileSearchStore[];
  storesLoading: boolean;
  onRefreshStores: () => void;
  currentStoreName?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedStoreName, setSelectedStoreName] = useState<string | undefined>(currentStoreName);
  const [createNewStore, setCreateNewStore] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !uploadState) {
      onUpload(file, createNewStore ? undefined : selectedStoreName);
    }
  };

  const handleCreateNewStore = () => {
    setCreateNewStore(true);
    setSelectedStoreName(undefined);
  };

  const handleSelectStore = (storeName: string) => {
    setCreateNewStore(false);
    setSelectedStoreName(storeName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upload Document</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        {!uploadState ? (
          <div className="space-y-4">
            {/* Store Selection Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Select File Search Store</h3>
                <button
                  onClick={onRefreshStores}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Refresh stores"
                >
                  <RefreshCw size={16} className={storesLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              <div className="max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2 space-y-1">
                {storesLoading ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">Loading stores...</p>
                ) : availableStores.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">No stores available</p>
                ) : (
                  availableStores.map((store) => (
                    <button
                      key={store.name}
                      onClick={() => handleSelectStore(store.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedStoreName === store.name && !createNewStore
                          ? 'bg-gemini-100 dark:bg-gemini-900 border border-gemini-500'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {store.displayName || store.name.split('/').pop()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {store.activeDocumentsCount || '0'} docs • {store.name}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <button
                onClick={handleCreateNewStore}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  createNewStore
                    ? 'bg-gemini-100 dark:bg-gemini-900 border border-gemini-500'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <FolderPlus size={16} />
                <span className="text-sm">Create New Store</span>
              </button>
            </div>

            {/* File Upload Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gemini-500 transition-colors"
              >
                <FileText size={40} className="mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click to select a file
                </p>
                <p className="text-xs text-gray-500">
                  Supports: PDF, TXT, MD, DOC, DOCX, JSON, CSV (max 100MB)
                </p>
                {selectedStoreName && !createNewStore && (
                  <p className="text-xs text-gemini-600 mt-2">
                    Will upload to: {availableStores.find(s => s.name === selectedStoreName)?.displayName || selectedStoreName}
                  </p>
                )}
                {createNewStore && (
                  <p className="text-xs text-gemini-600 mt-2">
                    Will create a new store
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.txt,.md,.doc,.docx,.json,.csv"
              />
            </div>
          </div>
        ) : (
          <UploadProgress state={uploadState} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

// Upload Progress Component
function UploadProgress({ state, onClose }: { state: UploadState; onClose: () => void }) {
  if (state.status === 'completed') {
    return (
      <div className="text-center py-4">
        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
        <h3 className="text-lg font-semibold text-green-600 mb-2">Upload Complete!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{state.file.name}</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={24} className="text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Upload Failed</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{state.error || 'Unknown error'}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-4">
        <FileText size={20} className="text-gemini-600" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{state.file.name}</p>
          <p className="text-sm text-gray-500">
            {state.status === 'uploading' ? 'Uploading...' : 'Processing and indexing...'}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gemini-600 h-full transition-all duration-300"
          style={{ width: `${state.progress}%` }}
        />
      </div>
    </div>
  );
}

export default App;

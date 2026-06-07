import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Trash2, Plus, X, Settings, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendChatMessage, getWebhookUrl, saveWebhookUrl } from './services/api';
import type { ChatMessage, SessionState } from './types';

function App() {
  // Session state
  const [sessionState, setSessionState] = useState<SessionState>(() => ({
    sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }));

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => getWebhookUrl());

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
      });

      // Extract response content from various possible formats
      const responseContent = response.output || response.text || response.response || response.message || 'No response content';

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: responseContent, timestamp: new Date() }
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
  }, [input, isLoading, sessionState.sessionId]);

  // Handle saving webhook URL
  const handleSaveWebhookUrl = useCallback((url: string) => {
    saveWebhookUrl(url);
    setWebhookUrl(url);
    setShowSettings(false);
  }, []);

  // Clear chat
  const handleClearChat = () => {
    setMessages([]);
  };

  // Start new chat
  const handleNewChat = () => {
    setSessionState({
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
    setMessages([]);
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

        {/* Session ID Display */}
        <div className="px-4 pb-4">
          <div className="px-3 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Session ID:</p>
            <p className="text-xs text-gray-700 dark:text-gray-300 truncate" title={sessionState.sessionId}>
              {sessionState.sessionId}
            </p>
          </div>
        </div>

        {/* Settings Button */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-n8n-600 hover:bg-n8n-700 text-white rounded-lg transition-colors"
          >
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold">n8n Chatbot</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chat with AI powered by n8n workflow automation
          </p>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-n8n-100 dark:bg-n8n-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-n8n-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Send a message and get responses from your n8n workflow. Configure the webhook URL in settings.
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
                  <div className="w-8 h-8 bg-n8n-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">n8n</span>
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
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-n8n-500"
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
                className="p-3 bg-n8n-600 hover:bg-n8n-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors"
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

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          currentUrl={webhookUrl}
          onSave={handleSaveWebhookUrl}
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
        <div className="w-8 h-8 bg-n8n-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">n8n</span>
        </div>
      )}
      <div className={`max-w-2xl ${isUser ? 'bg-n8n-600 text-white' : 'bg-gray-100 dark:bg-gray-800'} rounded-2xl px-4 py-3`}>
        {!isUser ? (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
}

// Settings Modal Component
function SettingsModal({
  onClose,
  currentUrl,
  onSave,
}: {
  onClose: () => void;
  currentUrl: string;
  onSave: (url: string) => void;
}) {
  const [url, setUrl] = useState(currentUrl);
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setIsValid(validateUrl(newUrl) || newUrl === '');
  };

  const handleSave = () => {
    if (isValid && url.trim()) {
      onSave(url.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">n8n Webhook URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="http://localhost:5678/webhook/test"
              className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${
                !isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-n8n-500'
              }`}
            />
            {!isValid && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid URL</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              The webhook URL of your n8n workflow that accepts chat messages.
            </p>
          </div>

          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Expected Request Format:</strong>
            </p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
              {`{
  "chatInput": "user message",
  "sessionId": "session-123"
}`}
            </pre>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!isValid || !url.trim()}
            className="flex-1 px-4 py-2 bg-n8n-600 hover:bg-n8n-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

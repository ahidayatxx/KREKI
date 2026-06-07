# n8n Chat with Memory - API Documentation

## Overview
This document describes the optimized n8n workflow API for the "Chat with Memory" system. The workflow provides a webhook-based chat interface with conversation memory and Indonesian language support.

## Endpoint Information
- **URL**: `https://your-n8n-instance.com/webhook/chat`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **CORS**: Enabled for web applications

## Request Format

### Basic Request
```json
{
  "message": "Halo, apa kabar?",
  "user_id": "user123", 
  "session_id": "session_456"
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | ✅ Required | User's message (max 2000 characters) |
| `user_id` | string | ❌ Optional | Unique user identifier (defaults to "anonymous") |
| `session_id` | string | ❌ Optional | Session identifier (auto-generated if not provided) |

### Request Validation Rules
- `message` cannot be empty or contain only whitespace
- `message` maximum length: 2000 characters
- `user_id` and `session_id` will be auto-generated if not provided

## Response Format

### Successful Response (200 OK)
```json
{
  "status": "success",
  "response": "Halo! Kabar saya baik, terima kasih sudah bertanya. Bagaimana dengan Anda?",
  "user_id": "user123",
  "session_id": "session_456", 
  "timestamp": "2025-01-25T10:30:00.000Z",
  "message_id": "msg_1737894600000_abc123def",
  "metadata": {
    "model": "anthropic/claude-3-haiku",
    "processing_time": 1250,
    "session_active": true
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | "success" for successful responses |
| `response` | string | AI-generated response in Indonesian |
| `user_id` | string | User identifier used for this conversation |
| `session_id` | string | Session identifier for conversation continuity |
| `timestamp` | string | ISO 8601 timestamp of response generation |
| `message_id` | string | Unique identifier for this message |
| `metadata.model` | string | AI model used for generation |
| `metadata.processing_time` | number | Processing time in milliseconds |
| `metadata.session_active` | boolean | Whether session memory is active |

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "status": "error",
  "error": "Invalid request format",
  "message": "Missing required field: message",
  "timestamp": "2025-01-25T10:30:00.000Z",
  "user_id": null,
  "session_id": null
}
```

### Processing Error (500 Internal Server Error)
```json
{
  "status": "error", 
  "error": "Processing failed",
  "message": "An error occurred while processing your request",
  "timestamp": "2025-01-25T10:30:00.000Z",
  "user_id": "user123",
  "session_id": "session_456",
  "retry_possible": true
}
```

### Common Error Messages
- "Invalid message format" - Missing or invalid message field
- "Message cannot be empty" - Empty message after trimming
- "Message too long. Maximum 2000 characters allowed." - Message exceeds length limit
- "An error occurred while processing your request" - General processing error

## Conversation Memory

### Session Management
- **Memory Window**: 15 messages (improved from original 10)
- **Session Persistence**: Based on `session_id`
- **Auto-generated Sessions**: Format: `session_{user_id}_{timestamp}`
- **Memory Scope**: Per session, isolated across different sessions

### Session Behavior
- Each unique `session_id` maintains its own conversation history
- Memory automatically expires after extended inactivity
- Previous conversation context is included in AI responses
- Sessions can be manually controlled by providing consistent `session_id`

## Usage Examples

### cURL Example
```bash
curl -X POST https://your-n8n-instance.com/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Jelaskan tentang artificial intelligence",
    "user_id": "user123",
    "session_id": "learning_session_001"
  }'
```

### JavaScript/Fetch Example
```javascript
const response = await fetch('https://your-n8n-instance.com/webhook/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Apa itu machine learning?',
    user_id: 'web_user_456',
    session_id: 'web_session_' + Date.now()
  })
});

const data = await response.json();
console.log(data.response);
```

### Python Example
```python
import requests
import json

url = "https://your-n8n-instance.com/webhook/chat"
payload = {
    "message": "Ceritakan tentang teknologi blockchain",
    "user_id": "python_user", 
    "session_id": "research_session_001"
}

response = requests.post(url, json=payload)
data = response.json()

if data["status"] == "success":
    print(f"AI Response: {data['response']}")
else:
    print(f"Error: {data['message']}")
```

## Rate Limiting & Best Practices

### Recommended Usage
- **Request Frequency**: Max 10 requests per minute per session
- **Message Length**: Keep messages concise for better performance
- **Session Management**: Reuse session_id for continuous conversations
- **Error Handling**: Always check response status and handle errors gracefully

### Performance Tips
- Use consistent `session_id` for conversation continuity
- Handle network timeouts (recommend 30-second timeout)
- Implement exponential backoff for retries when `retry_possible: true`
- Cache responses locally to reduce API calls

## Security Considerations

### Data Privacy
- Messages are processed through OpenRouter and Claude 3 Haiku
- Conversation history is temporarily stored in n8n memory
- No persistent data storage beyond session memory window
- HIPAA compliance: Do not send sensitive medical information

### Access Control
- Webhook is publicly accessible (configure authentication if needed)
- CORS enabled for web applications
- Consider implementing API key authentication for production use

## Workflow Features

### Improvements Over Original
1. ✅ **Webhook Integration** - RESTful API instead of manual triggers
2. ✅ **Dynamic Session Management** - User-specific memory sessions
3. ✅ **Enhanced Error Handling** - Comprehensive error responses
4. ✅ **Request Validation** - Input sanitization and limits
5. ✅ **Response Formatting** - Structured API responses
6. ✅ **CORS Support** - Web application compatibility
7. ✅ **Extended Memory** - 15 message history (up from 10)
8. ✅ **Better Prompting** - Enhanced Indonesian language prompts

### AI Configuration
- **Model**: Claude 3 Haiku via OpenRouter
- **Max Tokens**: 800 (increased from 500)
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Language**: Indonesian with professional, helpful tone
- **Context Awareness**: Conversation history integration

## Troubleshooting

### Common Issues
1. **Empty Response**: Check if message field is properly formatted
2. **Session Not Remembered**: Ensure consistent session_id usage
3. **Long Response Times**: Normal processing time is 1-3 seconds
4. **CORS Errors**: Verify CORS headers are enabled in n8n

### Debug Information
- Use `processing_time` in metadata to monitor performance
- Check `message_id` for tracking specific conversations
- Monitor `session_active` status for memory functionality

---

**Version**: 1.0  
**Last Updated**: January 25, 2025  
**Workflow Compatibility**: n8n v1.0+
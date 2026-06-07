# Gemini RAG Chat

A full-stack RAG (Retrieval Augmented Generation) chat application using Google's Gemini File Search API. Features a ChatGPT-like interface for uploading documents and asking questions about them.

![Gemini RAG Chat](https://img.shields.io/badge/Gemini-2.5%20Flash-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green) ![React](https://img.shields.io/badge/React-19-blue)

## Features

- **Document Upload**: Upload PDFs, text files, Markdown, Word docs, and more
- **Semantic Search**: Powered by Gemini's File Search API for intelligent document retrieval
- **Chat Interface**: Clean, ChatGPT-like UI with markdown support
- **Citations**: View source citations for AI-generated responses
- **Real-time Chat**: WebSocket support for streaming responses
- **Dark Mode**: Full dark mode support
- **Session Management**: Multiple chat sessions with document persistence

## Architecture

```
gemini-rag-chat/
├── backend/          # FastAPI backend
│   ├── main.py       # Main application with Gemini integration
│   ├── requirements.txt
│   └── uploads/      # Temporary file storage
└── frontend/         # React TypeScript frontend
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## How It Works

1. **Upload**: Documents are uploaded to the backend
2. **Indexing**: Backend sends files to Gemini File Search Store for chunking, embedding, and indexing
3. **Query**: User questions are sent with File Search tool configuration
4. **Retrieval**: Gemini performs semantic search to find relevant chunks
5. **Generation**: Response is generated with citations to source documents

## Prerequisites

- Python 3.10+
- Node.js 18+
- Gemini API Key from [ai.google.dev](https://ai.google.dev/api)

## Installation

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env and add your GEMINI_API_KEY
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

## Running the Application

### Start Backend

```bash
cd backend
source venv/bin/activate
python main.py
```

Backend will run on `http://localhost:8000`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Chat
- `POST /api/chat` - Send chat message with File Search
- `WS /ws/chat/{session_id}` - WebSocket for streaming chat

### File Management
- `POST /api/upload-file` - Upload file to File Search Store
- `POST /api/file-search-store` - Create new File Search Store
- `GET /api/file-search-stores` - List all File Search Stores
- `GET /api/file-search-store/{store_name}` - Get store details
- `DELETE /api/file-search-store/{store_name}` - Delete store

### Health
- `GET /health` - Health check endpoint

## Supported File Types

- **Documents**: PDF, DOC, DOCX, TXT, MD, RTF
- **Data**: JSON, CSV, XML
- **Code**: JS, TS, PY, Java, C++, etc.
- **Other**: HTML, CSS, and more

Max file size: 100MB per document

## Configuration

### Backend (.env)
```
GEMINI_API_KEY=your_api_key_here
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000
```

## Usage

1. **Upload a Document**: Click "Upload Document" and select a file
2. **Wait for Processing**: The document will be indexed (this may take a moment)
3. **Ask Questions**: Type your question in the chat input
4. **View Citations**: Responses include citations to source documents

## Development

### Backend Development
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```

## Pricing

Gemini File Search pricing:
- **Indexing**: $0.15 per 1M tokens (one-time)
- **Storage**: Free
- **Query**: Free embeddings
- **Retrieval**: Charged as context tokens

## License

MIT License

## References

- [Gemini File Search API](https://ai.google.dev/gemini-api/docs/file-search)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

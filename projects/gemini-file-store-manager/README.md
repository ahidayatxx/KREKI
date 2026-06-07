# Gemini File Store Manager

A modern, full-stack web application to manage Google Gemini File Search Stores and perform Retrieval-Augmented Generation (RAG).

## Features

- **Store Management**: Create and delete File Search stores.
- **File Indexing**: Upload documents (PDF, TXT, etc.) directly into stores.
- **Metadata Support**: Add custom metadata during upload and use metadata filters during queries.
- **RAG Playground**: Interactive chat interface to query your documents using Gemini 2.0 Flash.
- **Real-time Status**: Monitor indexing operations and document status.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Lucide React.
- **Backend**: Next.js Route Handlers, Gemini REST API (v1beta).

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- A Google AI Studio [API Key](https://aistudio.google.com/app/apikey).

### Installation

1. Clone the repository and navigate to the project:
   ```bash
   cd projects/gemini-file-store-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Tips

- **Indexing Delay**: After uploading a file, it might take a few moments to be fully indexed and available for search.
- **Metadata Format**: Use valid JSON arrays for metadata, e.g., `[{"key": "author", "string_value": "Ahmad"}]`.
- **Filtering**: Use the filter bar to restrict searches to specific subsets of your documents using [List Filter Syntax](https://google.aip.dev/160).
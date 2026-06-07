import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'research-assistant-server',
  version: '1.0.0',
});

server.registerPrompt(
  'research',
  {
    title: 'Research Assistant',
    description: 'Answer a query using academic search tools and provide a structured answer with citations.',
    argsSchema: { query: z.string() },
  },
  ({ query }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `You are a research assistant. Your task is to answer the following query: "${query}".

To accomplish this, you must adhere to the following process:

1.  **Search:** Use the 'search_pubmed', 'search_semantic', and 'search_google_scholar' tools to find relevant academic papers.
2.  **Synthesize:** After gathering information, use the 'sequentialthinking' tool to structure a comprehensive and logical answer.
3.  **Cite:** For all information drawn from sources, you must provide in-text citations using the APA 7th Edition format (Author, Year).
4.  **Bibliography:** Conclude your response with a full bibliography of all cited sources, also formatted in APA 7th Edition.

Begin your research for the query: "${query}"`,
        },
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);

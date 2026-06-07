import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'id-news-today-server',
  version: '1.0.0',
});

server.registerPrompt(
  'id-news-today',
  {
    title: 'Indonesian News Today',
    description: 'Get the latest news from major Indonesian news outlets.',
    argsSchema: {},
  },
  () => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `You are a news assistant. Your task is to provide a summary of the latest news from the following Indonesian news websites:
- https://www.detik.com/
- https://www.kompas.id/
- https://www.liputan6.com/
- https://www.cnnindonesia.com/
- https://www.antaranews.com/
- https://www.thejakartapost.com/

To accomplish this, you must adhere to the following process:

1.  **Fetch:** Use the 'web_fetch' tool to get the content from each of the websites.
2.  **Filter:** From the fetched content, identify the news articles published today.
3.  **Summarize:** For each news article, provide a concise summary in Bahasa Indonesia.
4.  **Link:** Include a direct link to the original news article.
5.  **Format:** Present the news in a clear and organized manner, grouped by the news source.

Begin your work.`,
        },
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);

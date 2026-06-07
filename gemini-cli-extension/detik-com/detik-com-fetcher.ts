import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'detik-com-reader',
    version: '1.0.0',
});

server.registerTool('fetch_detik_content', {
    description: 'Fetches content from detik.com and provides a C-Level summary by filtering meaningful news.',
    inputSchema: z.object({
        content: z.string().describe('The raw content of the detik.com page to summarize.'),
    }).shape,
}, async ({ content }) => {
    const lines = content.split('\n');
    const newsItems: { headline: string; body: string }[] = [];
    let currentHeadline = '';
    let currentBody: string[] = [];

    const addNewsItem = () => {
        if (currentHeadline) {
            newsItems.push({ headline: currentHeadline.trim(), body: currentBody.join(' ').trim() });
        }
        currentHeadline = '';
        currentBody = [];
    };

    for (const line of lines) {
        if (line.startsWith('## ') || line.startsWith('### ')) {
            addNewsItem();
            currentHeadline = line.replace(/^(## |### )/, '');
        } else if (currentHeadline && line.trim() !== '') {
            currentBody.push(line.trim());
        } else if (currentHeadline && line.trim() === '') {
            addNewsItem();
        }
    }
    addNewsItem(); // Add the last news item

    const meaningfulKeywords = [
        'politik', 'ekonomi', 'sosial', 'internasional', 'pemerintah', 'DPR', 'BPJS',
        'inflasi', 'pemilu', 'kriminal', 'bencana', 'militer', 'hukum', 'peradilan',
        'pendidikan', 'kesehatan', 'lingkungan', 'bisnis', 'investasi', 'pasar',
        'global', 'nasional', 'daerah', 'perusahaan', 'bank', 'rupiah', 'dollar',
        'ekspor', 'impor', 'pajak', 'subsidi', 'infrastruktur', 'transportasi',
        'energi', 'pertanian', 'industri', 'teknologi', 'digital', 'siber',
        'terorisme', 'korupsi', 'demokrasi', 'hak asasi', 'konflik', 'perang',
        'perdamaian', 'diplomasi', 'hubungan luar negeri', 'presiden', 'menteri',
        'kepolisian', 'tentara', 'mahasiswa', 'buruh', 'petani', 'nelayan', 'masyarakat'
    ];

    const isMeaningful = (text: string) => {
        const lowerText = text.toLowerCase();
        return meaningfulKeywords.some(keyword => lowerText.includes(keyword));
    };

    const meaningfulNews = newsItems.filter(item => isMeaningful(item.headline) || isMeaningful(item.body));

    let summaryText = '';
    if (meaningfulNews.length > 0) {
        summaryText = meaningfulNews.map(item => `* ${item.headline}: ${item.body.substring(0, 150)}...`).join('\n\n');
    } else {
        summaryText = 'No meaningful news found.';
    }

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({ summary: summaryText }),
            },
        ],
    };
});

const transport = new StdioServerTransport();
await server.connect(transport);
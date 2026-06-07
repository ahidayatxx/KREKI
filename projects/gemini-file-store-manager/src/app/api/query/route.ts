import { NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { prompt, storeNames, metadataFilter } = await request.json();
    
    if (!prompt || !storeNames || !Array.isArray(storeNames)) {
      return NextResponse.json({ error: 'Prompt and storeNames (array) are required' }, { status: 400 });
    }
    
    const result = await generateContent(prompt, storeNames, metadataFilter);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
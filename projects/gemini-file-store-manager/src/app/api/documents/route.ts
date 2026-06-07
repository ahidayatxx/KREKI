import { NextResponse } from 'next/server';
import { listDocuments, deleteDocument } from '@/lib/gemini';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeName = searchParams.get('storeName');
    
    if (!storeName) {
      return NextResponse.json({ error: 'Store name is required' }, { status: 400 });
    }
    
    const documents = await listDocuments(storeName);
    return NextResponse.json(documents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const documentName = searchParams.get('documentName');
    
    if (!documentName) {
      return NextResponse.json({ error: 'Document name is required' }, { status: 400 });
    }
    
    const result = await deleteDocument(documentName);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
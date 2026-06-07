
import { NextResponse } from 'next/server';
import { getStore, deleteStore } from '@/lib/gemini';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const storeName = path.join('/');
    const store = await getStore(storeName);
    return NextResponse.json(store);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  let storeName = '';
  try {
    const { path } = await params;
    storeName = path.join('/');
    console.log(`[DELETE] Attempting to delete store: ${storeName}`);
    
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') !== 'false';
    console.log(`[DELETE] Force delete: ${force}`);

    const result = await deleteStore(storeName, force);
    console.log(`[DELETE] Success:`, result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error(`[DELETE] Error deleting store ${storeName}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

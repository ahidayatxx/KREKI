
import { NextResponse } from 'next/server';
import { listStores, createStore } from '@/lib/gemini';

export async function GET() {
  try {
    const stores = await listStores();
    return NextResponse.json(stores);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { displayName } = await request.json();
    if (!displayName) {
      return NextResponse.json({ error: 'Display name is required' }, { status: 400 });
    }
    const store = await createStore(displayName);
    return NextResponse.json(store);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

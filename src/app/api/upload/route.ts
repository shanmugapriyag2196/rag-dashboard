import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding } from '@/lib/openai';
import { upsertVector } from '@/lib/pinecone';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { text, filename, metadata } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    const embedding = await getEmbedding(text);
    const id = uuidv4();

    await upsertVector(id, embedding, {
      text,
      filename: filename || 'unknown',
      ...metadata,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
  }
}
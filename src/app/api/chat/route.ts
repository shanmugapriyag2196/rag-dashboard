import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding, getChatResponse } from '@/lib/openai';
import { queryVectors } from '@/lib/pinecone';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1];

    const embedding = await getEmbedding(lastMessage.content);
    const matches = await queryVectors(embedding, 5);

    const context = matches
      .map((match) => match.metadata?.text || match.metadata?.content || '')
      .filter(Boolean)
      .join('\n\n');

    const response = await getChatResponse(messages, context);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
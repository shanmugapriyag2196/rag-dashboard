import { NextResponse } from 'next/server';
import { queryConversations } from '@/lib/pinecone';

export async function GET() {
  try {
    const matches = await queryConversations(100);
    
    const conversations = matches.map((match) => ({
      id: match.id,
      role: match.metadata?.role || 'unknown',
      content: match.metadata?.content || '',
      timestamp: match.metadata?.timestamp || new Date().toISOString(),
    }));
    
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Conversations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}
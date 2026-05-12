import { NextRequest, NextResponse } from 'next/server';

const PINECONE_ASSISTANT_URL = 'https://prod-1-data.ke.pinecone.io/assistant/chat/invoice-data';
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    // Format messages for Pinecone Assistant API
    const pineconeMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch(PINECONE_ASSISTANT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINECONE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        messages: pineconeMessages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pinecone API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format response for frontend
    return NextResponse.json({
      response: data.message || data.content || data.response || 'No response received',
      sources: data.sources || [],
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { upsertConversation } from '@/lib/pinecone';

const PINECONE_ASSISTANT_URL = 'https://prod-1-data.ke.pinecone.io/assistant/chat/invoice-data';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.PINECONE_API_KEY;
    
    if (!apiKey) {
      console.error('PINECONE_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error', details: 'PINECONE_API_KEY not set' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();
    
    const pineconeMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    if (messages.length > 1) {
      const previousMessages = messages.slice(0, -1);
      for (const msg of previousMessages) {
        try {
          await upsertConversation(uuidv4(), {
            role: msg.role,
            content: msg.content,
            timestamp: new Date().toISOString(),
          });
        } catch (e) {
          console.warn('Failed to save conversation message:', e);
        }
      }
    }

    const response = await fetch(PINECONE_ASSISTANT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: pineconeMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pinecone API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Pinecone API error', status: response.status, details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    let responseText = '';
    let sources: unknown[] = [];
    
    if (typeof data === 'string') {
      responseText = data;
    } else if (data.message?.content) {
      responseText = data.message.content;
      sources = data.citations || [];
    } else if (data.content) {
      responseText = data.content;
    } else if (data.response) {
      responseText = data.response;
    } else if (data.message) {
      responseText = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
    } else {
      responseText = JSON.stringify(data);
    }

    try {
      await upsertConversation(uuidv4(), {
        role: 'assistant',
        content: responseText || 'No response',
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Failed to save assistant response:', e);
    }
    
    return NextResponse.json({
      response: responseText,
      sources: sources,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
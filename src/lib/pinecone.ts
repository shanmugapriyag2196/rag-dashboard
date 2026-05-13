import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return new OpenAI({ apiKey });
};

export const getEmbedding = async (text: string): Promise<number[]> => {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
};

const getPineconeClient = () => {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error('PINECONE_API_KEY is not configured');
  }
  return new Pinecone({ apiKey });
};

export const getIndex = () => {
  const pinecone = getPineconeClient();
  return pinecone.Index(process.env.PINECONE_INDEX_NAME || 'invoice-data');
};

export const getConversationIndex = () => {
  const pinecone = getPineconeClient();
  return pinecone.Index('conversation');
};

export const queryVectors = async (embedding: number[], topK: number = 5) => {
  const index = getIndex();
  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });
  return results.matches || [];
};

export const queryConversations = async (topK: number = 100) => {
  const index = getConversationIndex();
  const results = await index.query({
    vector: new Array(512).fill(0.001),
    topK,
    includeMetadata: true,
  });
  return results.matches || [];
};

export const upsertVector = async (id: string, values: number[], metadata: Record<string, string | number | boolean | string[]>) => {
  const index = getIndex();
  await index.upsert({
    records: [{ id, values, metadata }],
  });
};

export const upsertConversation = async (id: string, metadata: { role: string; content: string; timestamp: string; status?: string }) => {
  const index = getConversationIndex();
  const embedding = await getEmbedding(metadata.content);
  const vector512 = embedding.slice(0, 512);
  await index.upsert({
    records: [{ id, values: vector512, metadata }],
  });
};

export const queryConversationStats = async () => {
  const index = getConversationIndex();
  const results = await index.query({
    vector: new Array(512).fill(0.001),
    topK: 1000,
    includeMetadata: true,
  });

  let successCount = 0;
  let failureCount = 0;

  for (const match of results.matches || []) {
    const status = match.metadata?.status;
    if (status === 'success') successCount++;
    else if (status === 'failure') failureCount++;
  }

  return { successCount, failureCount };
};
import { Pinecone } from '@pinecone-database/pinecone';

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
    vector: new Array(512).fill(0),
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

export const upsertConversation = async (id: string, metadata: { role: string; content: string; timestamp: string }) => {
  const index = getConversationIndex();
  await index.upsert({
    records: [{ id, values: new Array(512).fill(0), metadata }],
  });
};
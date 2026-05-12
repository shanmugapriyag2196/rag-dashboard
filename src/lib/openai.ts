import OpenAI from 'openai';

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

export const getChatResponse = async (
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  context: string
) => {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant that helps users with invoice-related questions. Use the following context to answer questions accurately. If the context doesn't contain relevant information, say so clearly.

Context:
${context}`,
      },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });
  return response.choices[0].message.content;
};
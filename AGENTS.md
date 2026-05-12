<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RAG Invoice Assistant

A Next.js application that provides a chatbot interface for querying invoice data stored in Pinecone vector database.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your credentials:
   - `PINECONE_API_KEY` - Your Pinecone API key
   - `PINECONE_INDEX_NAME` - Your Pinecone index name (default: 'invoices')
   - `OPENAI_API_KEY` - Your OpenAI API key

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## API Endpoints

- `POST /api/chat` - Chat with the assistant
- `POST /api/upload` - Upload invoice documents to Pinecone
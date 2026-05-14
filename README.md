# Purpose
Create RAG Agent for Invoice details. I already uploaded 16 text invoice files to PINECONE Assistant Platform. I want to create Invoice details Dashboard.

# Invoice RAG Assistant

A Next.js chatbot application that answers invoice-related questions by querying data stored in Pinecone vector database.

## Features

- Chat interface for asking invoice questions
- Pinecone vector database integration for document storage
- OpenAI embeddings and GPT-4o-mini for intelligent responses
- Vercel-ready deployment

## Prerequisites

- Node.js 18+
- Pinecone account with an index created
- OpenAI API key

## Setup

1. Clone and install dependencies:
```bash
npm install
```

2. Create `.env.local` with your credentials:
```bash
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
OPENAI_API_KEY=your_openai_api_key
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start chatting.

## API Endpoints

- `POST /api/chat` - Send messages and receive AI responses
- `POST /api/upload` - Upload invoice documents to Pinecone

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts    # Chat endpoint
│   │   └── upload/route.ts  # Document upload
│   ├── components/
│   │   └── ChatInterface.tsx
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── openai.ts     # OpenAI integration
    └── pinecone.ts   # Pinecone integration
```

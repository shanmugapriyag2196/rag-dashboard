import ChatInterface from './components/ChatInterface';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold text-gray-800">Invoice RAG Assistant</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
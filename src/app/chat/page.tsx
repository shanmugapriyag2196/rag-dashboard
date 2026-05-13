'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '../dashboard/components/Sidebar';

interface Source {
  id: string;
  text: string;
  score: number;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your Invoice AI Assistant. I can help you find information about invoices from your Pinecone database.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: `Error: ${data.error}\n${data.details || ''}`
        }]);
      } else {
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: data.response || 'No response received',
          sources: data.sources 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Invoice AI Chat</h1>
          <p className="text-sm text-gray-500">Connected to Pinecone Assistant: invoice-data</p>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className={`px-4 py-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
{msg.sources && msg.sources.length > 0 && (
                         <div className="mt-3 pt-3 border-t border-gray-200">
                           <p className="text-xs font-medium text-gray-600 mb-1">Sources from Pinecone:</p>
                           {msg.sources.map((source, idx) => (
                             <div key={source.id || idx} className="text-xs text-gray-500 mb-1">
                               {source.score && (
                                 <span className="font-mono bg-gray-100 px-1 rounded mr-2">{source.score.toFixed(2)}</span>
                               )}
                               {source.text?.substring(0, 100) || 'No text available'}...
                             </div>
                           ))}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm">AI</div>
                    <div className="px-4 py-3 rounded-lg bg-white rounded-bl-none shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Searching Pinecone</span>
                        <span className="animate-pulse">...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
        <div className="bg-white border-t px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about invoices, payments, billing..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
'use client';

import Sidebar from '../dashboard/components/Sidebar';
import { useEffect, useState } from 'react';

interface Conversation {
  id: string;
  role: string;
  content: string;
  timestamp: string;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        const data = await response.json();
        setConversations(data.conversations || []);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Conversations</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {loading ? (
            <p>Loading conversations...</p>
          ) : conversations.length === 0 ? (
            <p>No conversations found.</p>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <div key={conv.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      conv.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {conv.role}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(conv.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{conv.content}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
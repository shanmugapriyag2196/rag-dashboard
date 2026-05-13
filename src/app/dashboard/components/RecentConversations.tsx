'use client';

export default function RecentConversations() {
  const todayConversations = [
    { id: '1', title: 'Invoice count for April 2025', time: '2 hours ago', messages: 8 },
    { id: '2', title: 'QB processed invoices', time: '5 hours ago', messages: 5 },
    { id: '3', title: 'Email invoice count', time: 'Today', messages: 3 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Today&apos;s Conversations</h2>
      <div className="space-y-2">
        {todayConversations.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No conversations today</p>
        ) : (
          todayConversations.map((conv) => (
            <div key={conv.id} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <p className="font-medium text-gray-800">{conv.title}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{conv.time}</span>
                <span>{conv.messages} messages</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
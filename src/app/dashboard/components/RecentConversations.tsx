interface Conversation {
  id: string;
  title: string;
  time: string;
  messages: number;
}

export default function RecentConversations() {
  const conversations: Conversation[] = [
    { id: '1', title: 'Invoice #12345 status', time: '2 hours ago', messages: 8 },
    { id: '2', title: 'Payment confirmation for PO-789', time: '5 hours ago', messages: 5 },
    { id: '3', title: 'Due date inquiry for invoice #5678', time: '1 day ago', messages: 12 },
    { id: '4', title: 'Vendor payment discrepancy', time: '2 days ago', messages: 6 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Conversations</h2>
      <div className="space-y-3">
        {conversations.map((conv) => (
          <div key={conv.id} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <p className="font-medium text-gray-800">{conv.title}</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{conv.time}</span>
              <span>{conv.messages} messages</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
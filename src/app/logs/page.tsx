'use client';

import Sidebar from '../dashboard/components/Sidebar';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

const logs: Log[] = [
  { id: '1', timestamp: '2024-01-15 10:30:00', level: 'info', message: 'User logged in successfully' },
  { id: '2', timestamp: '2024-01-15 10:25:00', level: 'info', message: 'Document uploaded: Invoice_2024_001.pdf' },
  { id: '3', timestamp: '2024-01-15 10:20:00', level: 'warning', message: 'Search query took longer than expected' },
  { id: '4', timestamp: '2024-01-15 10:15:00', level: 'error', message: 'Failed to process document: Invoice_2024_004.pdf' },
];

export default function LogsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Logs</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        log.level === 'info' ? 'bg-blue-100 text-blue-800' :
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
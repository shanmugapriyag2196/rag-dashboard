'use client';

import Sidebar from '../dashboard/components/Sidebar';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'processed' | 'pending' | 'failed';
}

const documents: Document[] = [
  { id: '1', name: 'Invoice_2024_001.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2 hours ago', status: 'processed' },
  { id: '2', name: 'Invoice_2024_002.pdf', type: 'PDF', size: '1.8 MB', uploadedAt: '5 hours ago', status: 'processed' },
  { id: '3', name: 'Invoice_2024_003.pdf', type: 'PDF', size: '3.2 MB', uploadedAt: '1 day ago', status: 'pending' },
  { id: '4', name: 'Invoice_2024_004.pdf', type: 'PDF', size: '1.5 MB', uploadedAt: '2 days ago', status: 'failed' },
];

export default function DocumentsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.uploadedAt}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'processed' ? 'bg-green-100 text-green-800' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
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
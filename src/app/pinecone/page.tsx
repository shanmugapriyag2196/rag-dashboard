'use client';

import Sidebar from '../dashboard/components/Sidebar';

export default function PineconePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Pinecone Index</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Assistant Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Assistant Name</p>
                  <p className="font-medium">invoice-data</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Host</p>
                  <p className="font-medium truncate">https://prod-1-data.ke.pinecone.io</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">MCP URL</p>
                  <p className="font-medium truncate">https://prod-1-data.ke.pinecone.io/mcp/assistants/invoice-data</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Chat Model</p>
                  <p className="font-medium">GPT-4o</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Vectors</p>
                <p className="text-2xl font-bold">45,672</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Dimension</p>
                <p className="text-2xl font-bold">1,536</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Index Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
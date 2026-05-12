'use client';

import Sidebar from '../dashboard/components/Sidebar';

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Settings configuration will be here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
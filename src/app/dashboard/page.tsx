'use client';

import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import AnalyticsChart from './components/AnalyticsChart';
import QueryCategories from './components/QueryCategories';
import RecentConversations from './components/RecentConversations';
import ChatBot from './components/ChatBot';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back, User Name</h1>
          <p className="text-gray-600 mt-1">VG Invoice AI RAG Assistant</p>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard title="Total Conversations" value="1,248" trend="+12% from last month" />
            <StatsCard title="Total Queries" value="3,421" trend="+8% from last week" />
            <StatsCard title="Vector Records" value="45,672" trend="+2,341 this week" />
            <StatsCard title="Active Users" value="24" trend="5 currently online" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AnalyticsChart />
            </div>
            <div className="space-y-6">
              <QueryStats />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QueryCategories />
            </div>
            <div>
              <RecentConversations />
            </div>
          </div>
        </main>
      </div>
      <ChatBot />
    </div>
  );
}

function QueryStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-sm text-gray-600">Successful Queries</p>
        <p className="text-2xl font-bold text-green-600">3,298</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-sm text-gray-600">Failure Queries</p>
        <p className="text-2xl font-bold text-red-600">123</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-sm text-gray-600">Pending Queries</p>
        <p className="text-2xl font-bold text-yellow-600">0</p>
      </div>
    </div>
  );
}
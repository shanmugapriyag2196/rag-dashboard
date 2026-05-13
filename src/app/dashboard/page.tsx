'use client';

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import AnalyticsChart from './components/AnalyticsChart';
import DocumentStatus from './components/DocumentStatus';
import QueryCategories from './components/QueryCategories';
import RecentConversations from './components/RecentConversations';
import ChatBot from './components/ChatBot';

interface Stats {
  totalConversations: number;
  totalQueries: number;
  vectorRecords: number;
  documentsIndexed: number;
  successfulQueries: number;
  failureQueries: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalConversations: 0,
    totalQueries: 0,
    vectorRecords: 0,
    documentsIndexed: 0,
    successfulQueries: 0,
    failureQueries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [convRes, dashRes] = await Promise.all([
          fetch('/api/conversations'),
          fetch('/api/dashboard-stats'),
        ]);
        const convData = await convRes.json();
        const dashData = await dashRes.json();

        setStats({
          totalConversations: convData.conversations?.length || 0,
          totalQueries: convData.conversations?.length || 0,
          vectorRecords: dashData.filesCount || 0,
          documentsIndexed: dashData.filesCount || 0,
          successfulQueries: dashData.successCount || 0,
          failureQueries: dashData.failureCount || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

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
            <StatsCard title="Total Conversations" value={stats.totalConversations.toString()} />
            <StatsCard title="Total Queries" value={stats.totalQueries.toString()} />
            <StatsCard title="Vector Records" value={stats.vectorRecords.toString()} />
            <StatsCard title="Documents Indexed" value={stats.documentsIndexed.toString()} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AnalyticsChart />
            </div>
            <div className="space-y-6">
              <QueryStats stats={stats} />
              <DocumentStatus />
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

function QueryStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-sm text-gray-600">Successful Queries</p>
        <p className="text-2xl font-bold text-green-600">{stats.successfulQueries}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-sm text-gray-600">Failure Queries</p>
        <p className="text-2xl font-bold text-red-600">{stats.failureQueries}</p>
      </div>
    </div>
  );
}
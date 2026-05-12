'use client';

export default function AnalyticsChart() {
  const data = [
    { day: 'Mon', queries: 120 },
    { day: 'Tue', queries: 150 },
    { day: 'Wed', queries: 180 },
    { day: 'Thu', queries: 140 },
    { day: 'Fri', queries: 200 },
    { day: 'Sat', queries: 90 },
    { day: 'Sun', queries: 110 },
  ];

  const maxQueries = Math.max(...data.map(d => d.queries));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Query Analytics</h2>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
              style={{ height: `${(item.queries / maxQueries) * 100}%` }}
            />
            <span className="text-xs text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
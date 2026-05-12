'use client';

export default function DocumentStatus() {
  const statuses = [
    { label: 'Processed', value: 75, color: 'bg-green-500' },
    { label: 'Pending', value: 15, color: 'bg-yellow-500' },
    { label: 'Failed', value: 10, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Document Status</h2>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="270"
              strokeDashoffset="67.5"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">75%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {statuses.map((status) => (
          <div key={status.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-sm text-gray-600">{status.label}</span>
            </div>
            <span className="text-sm font-medium">{status.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
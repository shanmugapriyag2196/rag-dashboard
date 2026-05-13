'use client';

export default function AnalyticsChart() {
  const data = [
    { day: 'Mon', queries: 120, successful: 115, failures: 5 },
    { day: 'Tue', queries: 150, successful: 145, failures: 5 },
    { day: 'Wed', queries: 180, successful: 170, failures: 10 },
    { day: 'Thu', queries: 140, successful: 135, failures: 5 },
    { day: 'Fri', queries: 200, successful: 190, failures: 10 },
    { day: 'Sat', queries: 90, successful: 88, failures: 2 },
    { day: 'Sun', queries: 110, successful: 108, failures: 2 },
  ];

  const maxQueries = Math.max(...data.map(d => d.queries));
  const chartHeight = 180;

  const points = data.map((item, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = chartHeight - (item.queries / maxQueries) * chartHeight;
    return { x, y, ...item };
  });

  const pathD = points.map((p, i) => 
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Query Analytics</h2>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={pathD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="rgba(59, 130, 246, 0.1)"
          />
          {points.map((p) => (
            <circle key={p.day} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
          ))}
        </svg>
        <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600">
          {data.map((d) => (
            <span key={d.day}>{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
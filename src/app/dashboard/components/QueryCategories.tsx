export default function QueryCategories() {
  const categories = [
    { name: 'Email', count: 2124 },
    { name: 'QuickBooks', count: 1297 },
  ];

  const maxCount = Math.max(...categories.map(c => c.count));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Query Categories</h2>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">{category.name}</span>
              <span className="text-sm font-medium">{category.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(category.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
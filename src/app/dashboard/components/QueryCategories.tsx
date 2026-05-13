export default function QueryCategories() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Query Summary</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Invoice Count</p>
          <p className="text-2xl font-bold text-blue-800">348</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">QB Load Status Count</p>
          <p className="text-2xl font-bold text-green-800">121</p>
        </div>
      </div>
    </div>
  );
}
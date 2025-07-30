export default function DashboardOverview() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-neutral-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome Back!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm">Portfolio Value</h3>
            <p className="text-white text-xl font-semibold">$0.602</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm">NFTs Owned</h3>
            <p className="text-white text-xl font-semibold">0</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm">Collections</h3>
            <p className="text-white text-xl font-semibold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
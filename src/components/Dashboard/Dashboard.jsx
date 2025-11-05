import { useProduction } from '../../contexts/ProductionContext'
import { format } from 'date-fns'

function Dashboard() {
  const { batches, customers, products } = useProduction()

  // Calculate stats
  const activeBatches = batches.filter((b) => b.status === 'growing').length
  const readyBatches = batches.filter((b) => b.status === 'ready').length
  const totalCustomers = customers.length
  const totalBatches = batches.length

  // Get recent batches
  const recentBatches = [...batches]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  // Calculate production by product type
  const productionByType = products.map((product) => {
    const count = batches.filter((b) => b.product === product.name).length
    return { ...product, count }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'seeded':
        return 'bg-blue-100 text-blue-800'
      case 'growing':
        return 'bg-yellow-100 text-yellow-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'harvested':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Batches"
          value={totalBatches}
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Growing"
          value={activeBatches}
          icon="🌱"
          color="yellow"
        />
        <StatCard
          title="Ready to Harvest"
          value={readyBatches}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Customers"
          value={totalCustomers}
          icon="👥"
          color="purple"
        />
      </div>

      {/* Production by Type */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Production by Type</h2>
        <div className="space-y-3">
          {productionByType.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: product.color }}
                />
                <span className="font-medium">{product.name}</span>
              </div>
              <span className="text-gray-600">{product.count} batches</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Batches */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Batches</h2>
        {recentBatches.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No batches yet. Create your first batch in the Production tab!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-left py-2 px-4">Quantity</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBatches.map((batch) => (
                  <tr key={batch.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{batch.product}</td>
                    <td className="py-3 px-4">{batch.quantity} trays</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          batch.status
                        )}`}
                      >
                        {batch.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {format(new Date(batch.createdAt), 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`${colorClasses[color]} text-white text-3xl p-4 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

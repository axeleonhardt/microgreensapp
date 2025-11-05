import { useState } from 'react'
import { useProduction } from '../../contexts/ProductionContext'
import { format } from 'date-fns'

function Production() {
  const { batches, products, addBatch, updateBatch, deleteBatch } = useProduction()
  const [showForm, setShowForm] = useState(false)
  const [editingBatch, setEditingBatch] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const handleAddNew = () => {
    setEditingBatch(null)
    setShowForm(true)
  }

  const handleEdit = (batch) => {
    setEditingBatch(batch)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      deleteBatch(id)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBatch(null)
  }

  // Filter batches
  const filteredBatches = batches.filter((batch) => {
    if (filterStatus === 'all') return true
    return batch.status === filterStatus
  })

  const sortedBatches = [...filteredBatches].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Production Management</h2>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          + New Batch
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2 flex-wrap">
          <FilterButton
            active={filterStatus === 'all'}
            onClick={() => setFilterStatus('all')}
          >
            All ({batches.length})
          </FilterButton>
          <FilterButton
            active={filterStatus === 'seeded'}
            onClick={() => setFilterStatus('seeded')}
          >
            Seeded ({batches.filter((b) => b.status === 'seeded').length})
          </FilterButton>
          <FilterButton
            active={filterStatus === 'growing'}
            onClick={() => setFilterStatus('growing')}
          >
            Growing ({batches.filter((b) => b.status === 'growing').length})
          </FilterButton>
          <FilterButton
            active={filterStatus === 'ready'}
            onClick={() => setFilterStatus('ready')}
          >
            Ready ({batches.filter((b) => b.status === 'ready').length})
          </FilterButton>
          <FilterButton
            active={filterStatus === 'harvested'}
            onClick={() => setFilterStatus('harvested')}
          >
            Harvested ({batches.filter((b) => b.status === 'harvested').length})
          </FilterButton>
        </div>
      </div>

      {/* Batches List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {sortedBatches.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">No batches found</p>
            <p>Create your first batch to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Notes</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedBatches.map((batch) => (
                  <tr key={batch.id} className="border-t hover:bg-gray-50">
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
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                      {batch.notes || '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleEdit(batch)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(batch.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <BatchForm
          batch={editingBatch}
          products={products}
          onSave={(batch) => {
            if (editingBatch) {
              updateBatch(batch)
            } else {
              addBatch(batch)
            }
            handleCloseForm()
          }}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  )
}

// Filter Button Component
function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-green-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

// Batch Form Component
function BatchForm({ batch, products, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    batch || {
      product: products[0]?.name || '',
      quantity: 10,
      status: 'seeded',
      notes: '',
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">
          {batch ? 'Edit Batch' : 'New Batch'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity (trays)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="seeded">Seeded</option>
              <option value="growing">Growing</option>
              <option value="ready">Ready</option>
              <option value="harvested">Harvested</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {batch ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Production

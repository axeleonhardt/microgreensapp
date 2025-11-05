import { useState } from 'react'
import { ProductionProvider } from './contexts/ProductionContext'
import Dashboard from './components/Dashboard/Dashboard'
import Production from './components/Production/Production'
import Customers from './components/Customers/Customers'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'production', name: 'Production', icon: '🌱' },
    { id: 'customers', name: 'Customers', icon: '👥' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'production':
        return <Production />
      case 'customers':
        return <Customers />
      default:
        return <Dashboard />
    }
  }

  return (
    <ProductionProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-green-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">🌱 Microgreens Management System</h1>
            <p className="text-green-100 mt-1">Track your microgreens production efficiently</p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            <p>Microgreens Management System v1.4.0</p>
          </div>
        </footer>
      </div>
    </ProductionProvider>
  )
}

export default App

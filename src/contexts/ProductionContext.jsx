import { createContext, useContext, useReducer, useEffect } from 'react'

const ProductionContext = createContext()

// Initial state
const initialState = {
  batches: [],
  customers: [],
  products: [
    { id: 1, name: 'Broccoli', color: '#22c55e' },
    { id: 2, name: 'Radish', color: '#ef4444' },
    { id: 3, name: 'Sunflower', color: '#eab308' },
    { id: 4, name: 'Pea Shoots', color: '#10b981' },
    { id: 5, name: 'Wheatgrass', color: '#84cc16' },
  ],
}

// Load from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem('microgreensData')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading state:', error)
  }
  return initialState
}

// Action types
const ACTIONS = {
  ADD_BATCH: 'ADD_BATCH',
  UPDATE_BATCH: 'UPDATE_BATCH',
  DELETE_BATCH: 'DELETE_BATCH',
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER: 'DELETE_CUSTOMER',
}

// Reducer
function productionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_BATCH:
      return {
        ...state,
        batches: [...state.batches, action.payload],
      }
    case ACTIONS.UPDATE_BATCH:
      return {
        ...state,
        batches: state.batches.map((batch) =>
          batch.id === action.payload.id ? action.payload : batch
        ),
      }
    case ACTIONS.DELETE_BATCH:
      return {
        ...state,
        batches: state.batches.filter((batch) => batch.id !== action.payload),
      }
    case ACTIONS.ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }
    case ACTIONS.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      }
    case ACTIONS.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      }
    default:
      return state
  }
}

// Provider component
export function ProductionProvider({ children }) {
  const [state, dispatch] = useReducer(productionReducer, initialState, loadState)

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('microgreensData', JSON.stringify(state))
    } catch (error) {
      console.error('Error saving state:', error)
    }
  }, [state])

  // Actions
  const addBatch = (batch) => {
    const newBatch = {
      ...batch,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: ACTIONS.ADD_BATCH, payload: newBatch })
  }

  const updateBatch = (batch) => {
    dispatch({ type: ACTIONS.UPDATE_BATCH, payload: batch })
  }

  const deleteBatch = (id) => {
    dispatch({ type: ACTIONS.DELETE_BATCH, payload: id })
  }

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: ACTIONS.ADD_CUSTOMER, payload: newCustomer })
  }

  const updateCustomer = (customer) => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: customer })
  }

  const deleteCustomer = (id) => {
    dispatch({ type: ACTIONS.DELETE_CUSTOMER, payload: id })
  }

  const value = {
    batches: state.batches,
    customers: state.customers,
    products: state.products,
    addBatch,
    updateBatch,
    deleteBatch,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  }

  return (
    <ProductionContext.Provider value={value}>
      {children}
    </ProductionContext.Provider>
  )
}

// Custom hook
export function useProduction() {
  const context = useContext(ProductionContext)
  if (!context) {
    throw new Error('useProduction must be used within a ProductionProvider')
  }
  return context
}

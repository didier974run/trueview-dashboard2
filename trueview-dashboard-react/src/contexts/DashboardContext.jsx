import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  subscription: null,
  properties: [],
  orders: [],
  stats: {
    videosRemaining: 0,
    totalVideos: 0,
    completedVideos: 0,
    pendingVideos: 0
  },
  loading: false,
  error: null
}

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  SET_SUBSCRIPTION: 'SET_SUBSCRIPTION',
  SET_PROPERTIES: 'SET_PROPERTIES',
  SET_ORDERS: 'SET_ORDERS',
  SET_STATS: 'SET_STATS',
  ADD_PROPERTY: 'ADD_PROPERTY',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  LOGOUT: 'LOGOUT'
}

// Reducer
function dashboardReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload }
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    case actionTypes.SET_USER:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false 
      }
    case actionTypes.SET_SUBSCRIPTION:
      return { ...state, subscription: action.payload }
    case actionTypes.SET_PROPERTIES:
      return { ...state, properties: action.payload }
    case actionTypes.SET_ORDERS:
      return { ...state, orders: action.payload }
    case actionTypes.SET_STATS:
      return { ...state, stats: action.payload }
    case actionTypes.ADD_PROPERTY:
      return { 
        ...state, 
        properties: [...state.properties, action.payload],
        orders: [...state.orders, {
          id: Date.now(),
          propertyId: action.payload.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          ...action.payload
        }]
      }
    case actionTypes.UPDATE_ORDER_STATUS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      }
    case actionTypes.LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}

// Context
const DashboardContext = createContext()

// Provider component
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading user data
    const mockUser = {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      company: 'Smith Real Estate',
      avatar: null
    }

    const mockSubscription = {
      plan: 'Growth Plan',
      price: '£699/month',
      videosIncluded: 4,
      videosUsed: 2,
      videosRemaining: 2,
      nextBilling: '2025-07-10',
      status: 'active'
    }

    const mockProperties = [
      {
        id: 1,
        url: 'https://rightmove.co.uk/property-123',
        address: '123 Oak Street, London',
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 1,
        price: '£450,000',
        status: 'active',
        createdAt: '2025-06-01T10:00:00Z'
      },
      {
        id: 2,
        url: 'https://zoopla.co.uk/property-456',
        address: '456 Pine Avenue, Manchester',
        type: 'House',
        bedrooms: 3,
        bathrooms: 2,
        price: '£320,000',
        status: 'completed',
        createdAt: '2025-05-15T14:30:00Z'
      }
    ]

    const mockOrders = [
      {
        id: 1,
        propertyId: 1,
        propertyUrl: 'https://rightmove.co.uk/property-123',
        musicTrack: 'Upbeat Modern - Electronic/Pop',
        status: 'in_progress',
        createdAt: '2025-06-01T10:00:00Z',
        estimatedCompletion: '2025-06-03T10:00:00Z'
      },
      {
        id: 2,
        propertyId: 2,
        propertyUrl: 'https://zoopla.co.uk/property-456',
        musicTrack: 'Ambient Calm - Nature Sounds',
        status: 'completed',
        createdAt: '2025-05-15T14:30:00Z',
        completedAt: '2025-05-17T16:45:00Z',
        videoUrl: 'https://example.com/video-456.mp4'
      }
    ]

    const mockStats = {
      videosRemaining: 2,
      totalVideos: 4,
      completedVideos: 1,
      pendingVideos: 1
    }

    // Simulate API delay
    setTimeout(() => {
      dispatch({ type: actionTypes.SET_USER, payload: mockUser })
      dispatch({ type: actionTypes.SET_SUBSCRIPTION, payload: mockSubscription })
      dispatch({ type: actionTypes.SET_PROPERTIES, payload: mockProperties })
      dispatch({ type: actionTypes.SET_ORDERS, payload: mockOrders })
      dispatch({ type: actionTypes.SET_STATS, payload: mockStats })
    }, 1000)
  }, [])

  // Actions
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    addProperty: (property) => dispatch({ type: actionTypes.ADD_PROPERTY, payload: property }),
    updateOrderStatus: (orderId, status) => dispatch({ 
      type: actionTypes.UPDATE_ORDER_STATUS, 
      payload: { orderId, status } 
    }),
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  }

  return (
    <DashboardContext.Provider value={{ ...state, ...actions }}>
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

export default DashboardContext


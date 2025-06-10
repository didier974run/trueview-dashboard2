import React, { useState } from 'react'
import { useDashboard } from '../contexts/DashboardContext'
import { 
  FileVideo, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  ExternalLink,
  Calendar,
  Music,
  Search,
  Filter,
  Eye
} from 'lucide-react'

export default function Orders() {
  const { orders, updateOrderStatus } = useDashboard()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.propertyUrl.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'in_progress':
        return Clock
      case 'pending':
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return 'In Progress'
      case 'pending':
        return 'Pending'
      default:
        return 'Unknown'
    }
  }

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Video Orders</h1>
          <p className="text-muted-foreground">Track your video production requests and downloads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="trueview-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="trueview-input pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="trueview-input"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status)
          return (
            <div key={order.id} className="trueview-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileVideo className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">
                        Video Order #{order.id}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(order.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <a 
                          href={order.propertyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 truncate"
                        >
                          {order.propertyUrl}
                        </a>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Music className="h-4 w-4 mr-2" />
                        {order.musicTrack}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ordered: {new Date(order.createdAt).toLocaleDateString()}
                        {order.estimatedCompletion && (
                          <span className="ml-4">
                            • Est. completion: {new Date(order.estimatedCompletion).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  {order.status === 'completed' && order.videoUrl && (
                    <a
                      href={order.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors"
                      title="Download Video"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Progress Bar for In Progress Orders */}
              {order.status === 'in_progress' && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Production Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="trueview-card p-12 text-center">
          <FileVideo className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'You haven\'t placed any video orders yet'
            }
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Order Details #{selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Status</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(selectedOrder.status)}`}>
                    {React.createElement(getStatusIcon(selectedOrder.status), { className: "h-4 w-4 mr-1" })}
                    {getStatusText(selectedOrder.status)}
                  </span>
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedOrder.id, 'in_progress')}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Start Production
                    </button>
                  )}
                </div>
              </div>
              
              {/* Property Details */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Property</h3>
                <a 
                  href={selectedOrder.propertyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {selectedOrder.propertyUrl}
                </a>
              </div>
              
              {/* Music Selection */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Music Track</h3>
                <div className="flex items-center text-muted-foreground">
                  <Music className="h-4 w-4 mr-2" />
                  {selectedOrder.musicTrack}
                </div>
              </div>
              
              {/* Timeline */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ordered: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </div>
                  {selectedOrder.estimatedCompletion && (
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Est. completion: {new Date(selectedOrder.estimatedCompletion).toLocaleDateString()}
                    </div>
                  )}
                  {selectedOrder.completedAt && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed: {new Date(selectedOrder.completedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Download Section */}
              {selectedOrder.status === 'completed' && selectedOrder.videoUrl && (
                <div>
                  <h3 className="font-medium text-foreground mb-2">Download</h3>
                  <a
                    href={selectedOrder.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trueview-button inline-flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


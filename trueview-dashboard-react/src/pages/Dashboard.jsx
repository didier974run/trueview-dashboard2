import React from 'react'
import { useDashboard } from '../contexts/DashboardContext'
import { 
  Video, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Building2,
  Music
} from 'lucide-react'

export default function Dashboard() {
  const { user, subscription, stats, orders, properties } = useDashboard()

  const recentOrders = orders.slice(0, 3)
  const recentProperties = properties.slice(0, 3)

  const statCards = [
    {
      title: 'Videos Remaining',
      value: stats.videosRemaining,
      total: stats.totalVideos,
      icon: Video,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Completed Videos',
      value: stats.completedVideos,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'In Progress',
      value: stats.pendingVideos,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Total Properties',
      value: properties.length,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ]

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="trueview-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your property videos
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{subscription?.plan}</p>
              <p className="text-xs text-muted-foreground">Next billing: {subscription?.nextBilling}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="trueview-card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                    {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="trueview-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <button className="text-sm text-primary hover:text-primary/80">View All</button>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Property Video #{order.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="trueview-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Properties</h2>
            <button className="text-sm text-primary hover:text-primary/80">View All</button>
          </div>
          <div className="space-y-4">
            {recentProperties.length > 0 ? (
              recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {property.address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {property.type} • {property.bedrooms} bed • {property.price}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                    {getStatusText(property.status)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No properties yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="trueview-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <Building2 className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">Add Property</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <Video className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">Request Video</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}


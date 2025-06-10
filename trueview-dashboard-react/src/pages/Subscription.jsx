import React from 'react'
import { useDashboard } from '../contexts/DashboardContext'
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Video,
  Clock,
  Star,
  ArrowUpRight
} from 'lucide-react'

export default function Subscription() {
  const { subscription, stats } = useDashboard()

  const usagePercentage = subscription ? (subscription.videosUsed / subscription.videosIncluded) * 100 : 0

  const features = {
    'Growth Plan': [
      '4 Premium videos per month (60–90 seconds)',
      'Advanced editing and transitions',
      'AI voiceover included',
      'Licensed music selection',
      '48-hour delivery',
      '2 revisions per video',
      'Priority support',
      'Client-facing shareable links'
    ]
  }

  const planFeatures = features[subscription?.plan] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
        <p className="text-muted-foreground">Manage your TrueView Pro plan and billing</p>
      </div>

      {/* Current Plan */}
      <div className="trueview-card p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-xl font-semibold text-foreground">{subscription?.plan}</h2>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-primary">{subscription?.price}</p>
            <p className="text-sm text-muted-foreground">
              Next billing: {subscription?.nextBilling}
            </p>
          </div>
          <div className="text-right">
            <button className="trueview-button">
              Manage Billing
            </button>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Video Usage This Month</span>
            <span className="text-sm text-muted-foreground">
              {subscription?.videosUsed} of {subscription?.videosIncluded} videos used
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0 videos</span>
            <span>{subscription?.videosIncluded} videos</span>
          </div>
        </div>

        {/* Plan Features */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Plan Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {planFeatures.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="trueview-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Videos Remaining</p>
              <p className="text-2xl font-bold text-foreground">{subscription?.videosRemaining}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Video className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="trueview-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed This Month</p>
              <p className="text-2xl font-bold text-foreground">{stats.completedVideos}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="trueview-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingVideos}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="trueview-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Billing History</h2>
        <div className="space-y-3">
          {[
            { date: '2025-06-10', amount: '£699.00', status: 'Paid', invoice: 'INV-2025-06-001' },
            { date: '2025-05-10', amount: '£699.00', status: 'Paid', invoice: 'INV-2025-05-001' },
            { date: '2025-04-10', amount: '£699.00', status: 'Paid', invoice: 'INV-2025-04-001' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{bill.invoice}</p>
                  <p className="text-xs text-muted-foreground">{bill.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">{bill.amount}</span>
                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                  {bill.status}
                </span>
                <button className="text-primary hover:text-primary/80">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="trueview-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Need More Videos?</h2>
            <p className="text-muted-foreground">Upgrade to our Agency Plan for unlimited videos</p>
          </div>
          <Star className="h-6 w-6 text-yellow-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Agency Plan</h3>
            <p className="text-2xl font-bold text-primary mb-2">Custom Pricing</p>
            <p className="text-sm text-muted-foreground mb-4">15+ videos/month</p>
            <ul className="space-y-1 text-sm text-muted-foreground mb-4">
              <li>• Deluxe-level cinematic production</li>
              <li>• AI voiceover + character implementation</li>
              <li>• White-labeled client delivery</li>
              <li>• Dedicated account manager</li>
            </ul>
            <button className="w-full trueview-button">
              Contact Sales
            </button>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Add-On Videos</h3>
            <p className="text-2xl font-bold text-primary mb-2">£175</p>
            <p className="text-sm text-muted-foreground mb-4">Per additional video</p>
            <ul className="space-y-1 text-sm text-muted-foreground mb-4">
              <li>• Same quality as your current plan</li>
              <li>• 48-hour delivery</li>
              <li>• 2 revisions included</li>
              <li>• No commitment required</li>
            </ul>
            <button className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors">
              Purchase Add-On
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


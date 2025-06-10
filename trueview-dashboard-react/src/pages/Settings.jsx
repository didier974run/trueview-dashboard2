import React, { useState } from 'react'
import { useDashboard } from '../contexts/DashboardContext'
import { 
  User, 
  Mail, 
  Building2, 
  Phone,
  Bell,
  Shield,
  Palette,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

export default function Settings() {
  const { user, setUser } = useDashboard()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderNotifications: true,
    marketingEmails: false,
    weeklyReports: true
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette }
  ]

  const handleSaveProfile = (e) => {
    e.preventDefault()
    // Update user context
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone
    })
    // Show success message (in real app, this would be an API call)
    alert('Profile updated successfully!')
  }

  const handleSaveNotifications = () => {
    // Save notification preferences (in real app, this would be an API call)
    alert('Notification preferences updated!')
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    // Change password (in real app, this would be an API call)
    alert('Password changed successfully!')
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="trueview-card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="trueview-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="trueview-input pl-10 w-full"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="trueview-input pl-10 w-full"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company/Agency
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="trueview-input pl-10 w-full"
                        placeholder="Smith Real Estate"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="trueview-input pl-10 w-full"
                        placeholder="+44 7123 456789"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="trueview-button flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="trueview-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Email Updates</h3>
                    <p className="text-sm text-muted-foreground">Receive important account updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailUpdates}
                      onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Order Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get notified when your video orders are updated</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderNotifications}
                      onChange={(e) => setNotifications({ ...notifications, orderNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and product updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Weekly Reports</h3>
                    <p className="text-sm text-muted-foreground">Get weekly summaries of your account activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveNotifications} className="trueview-button flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="trueview-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Security Settings</h2>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="trueview-input pr-10 w-full"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="trueview-input w-full"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="trueview-input w-full"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="trueview-button flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="trueview-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-3">Default Music Preference</h3>
                  <select className="trueview-input w-full">
                    <option value="">No preference</option>
                    <option value="electronic">Electronic/Pop</option>
                    <option value="classical">Classical</option>
                    <option value="ambient">Ambient</option>
                    <option value="corporate">Corporate</option>
                    <option value="acoustic">Acoustic</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-3">Video Quality Preference</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="quality" value="standard" className="mr-2" />
                      <span className="text-sm">Standard (1080p)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="quality" value="premium" className="mr-2" defaultChecked />
                      <span className="text-sm">Premium (4K)</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-3">Time Zone</h3>
                  <select className="trueview-input w-full">
                    <option value="GMT">GMT (London)</option>
                    <option value="EST">EST (New York)</option>
                    <option value="PST">PST (Los Angeles)</option>
                    <option value="CET">CET (Paris)</option>
                  </select>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button className="trueview-button flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


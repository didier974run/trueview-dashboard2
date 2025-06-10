import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from '../contexts/DashboardContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useDashboard()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: 'john.smith@example.com',
    password: 'password123'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'John Smith',
        email: formData.email,
        company: 'Smith Real Estate',
        avatar: null
      }
      
      setUser(mockUser)
      setIsLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'john.smith@example.com',
      password: 'password123'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">TrueView</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to your dashboard</p>
        </div>

        {/* Demo Notice */}
        <div className="trueview-card p-4 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-primary/10 rounded-full">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Demo Account</h3>
              <p className="text-xs text-muted-foreground mb-2">
                This is a demo dashboard. Click below to use pre-filled credentials.
              </p>
              <button
                onClick={handleDemoLogin}
                className="text-xs text-primary hover:text-primary/80 font-medium"
              >
                Use Demo Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="trueview-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="trueview-input pl-10 w-full"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="trueview-input pl-10 pr-10 w-full"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full trueview-button flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-primary hover:text-primary/80 font-medium">
                Contact Sales
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground mb-4">Trusted by real estate professionals</p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <span>✓ 48-hour delivery</span>
            <span>✓ AI-powered videos</span>
            <span>✓ Professional quality</span>
          </div>
        </div>
      </div>
    </div>
  )
}


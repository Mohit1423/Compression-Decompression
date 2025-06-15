import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login data:', formData)
    
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-300 px-1 mb-3">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-green-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 px-1 mb-3">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-green-400"
              placeholder="********"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
          >
            Log In
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/user.slice.js';
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`, formData);
      toast.success("Login successfull");
      dispatch(setUser(response.data.user));
      navigate("/Dashboard");
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
    
    
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
            className="w-full mt-4 bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold transition-colors"
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

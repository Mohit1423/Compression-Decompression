import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signup`, formData);
      toast.success("Account created successfully");
      navigate('/login');
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-gray-400 text-sm">
            Join us and start compressing smarter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300 px-1 mb-3">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-green-400"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300 px-1 mb-3">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-green-400"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 px-1 mb-3">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-green-400"
              placeholder="********"
            />
          </div>

          {formData.password && formData.password.length < 6 && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters.
            </p>
          )}

          <Button
            type="submit"
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
          >
            Sign Up
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup

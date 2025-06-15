import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Home from './components/Home'
import { createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import Signup from './components/SignUp';
import Login from './components/Login';
function App() {
  
   const router = createBrowserRouter([
          {
            path: "/",
            element: <Home />
          },{
            path: "/Login",
            element: <Login />
          },
          {
            path: "/SignUp",
            element: <Signup />
          }
    ])

  return (
  
    <div className="flex flex-col h-screen">
            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
            duration: 4000,
            style: {
              background: '#2e4632', 
              color: '#e8f5e9',       
              fontWeight: 'bold',
              padding: '12px 16px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            },
            success: {
              iconTheme: {
                primary: '#81c784',  
                secondary: '#1b5e20',
              },
              style: {
                border: '1px solid #4caf50',
              }
            },
            error: {
              iconTheme: {
                primary: '#ef5350', 
                secondary: '#fff',
              },
              style: {
                background: '#422727',
                color: '#fff0f0',
                border: '1px solid #ef5350',
              },
            },
          }} />
            <RouterProvider router={router} />
          </div>
  )
}

export default App

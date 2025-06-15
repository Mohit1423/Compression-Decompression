import React from 'react'
import { Link } from "react-router";
import { Button } from "../ui/button";
function Navbar({scrollToSection,FeaturesRef,TestimonialRef,FooterRef}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">FileZipper</div>
        <div className="hidden md:flex gap-6 text-gray-300">
          <p onClick={()=>scrollToSection(FeaturesRef)} className="hover:text-white">Features</p>
          <p onClick={()=>scrollToSection(TestimonialRef)} className="hover:text-white">Testimonials</p>
          <p onClick= {()=>scrollToSection(FooterRef)} className="hover:text-white">Contact</p>
        </div>
        <div className="flex gap-2">
          <Link to="/Login">
           <Button variant="ghost"className="text-white hover:bg-white/10 hover:text-[#3ABDF8] transition-colors">Login</Button>

          </Link>
          <Link to="/SignUp">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
          </Link>
        </div>
    </nav>
  )
}

export default Navbar
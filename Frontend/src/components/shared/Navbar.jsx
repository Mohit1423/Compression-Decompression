import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react'; // Make sure this is installed

function Navbar({ scrollToSection, FeaturesRef, TestimonialRef, FooterRef }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      {/* Left: Burger + Title */}
      <div className="flex items-center gap-3 text-white">
        <div className="md:hidden">
          {menuOpen ? (
            <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
        <div className="text-2xl font-bold">FileZipper</div>
      </div>

      {/* Center: Desktop Nav */}
      <div className="hidden md:flex gap-6 text-gray-300">
        <p onClick={() => handleScroll(FeaturesRef)} className="hover:text-white cursor-pointer">
          Features
        </p>
        <p onClick={() => handleScroll(TestimonialRef)} className="hover:text-white cursor-pointer">
          Testimonials
        </p>
        <p onClick={() => handleScroll(FooterRef)} className="hover:text-white cursor-pointer">
          Contact
        </p>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex gap-2">
        <Link to="/Login">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#3ABDF8] transition-colors">
            Login
          </Button>
        </Link>
        <Link to="/SignUp">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
        </Link>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center gap-4 py-4 md:hidden border-t border-gray-700">
          <p onClick={() => handleScroll(FeaturesRef)} className="hover:text-[#3ABDF8] cursor-pointer">
            Features
          </p>
          <p onClick={() => handleScroll(TestimonialRef)} className="hover:text-[#3ABDF8] cursor-pointer">
            Testimonials
          </p>
          <p onClick={() => handleScroll(FooterRef)} className="hover:text-[#3ABDF8] cursor-pointer">
            Contact
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

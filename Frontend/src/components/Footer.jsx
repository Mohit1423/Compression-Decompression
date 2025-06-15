import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router";

function Footer({FooterRef}) {
  return (
    <footer ref = {FooterRef} className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-2">FileZipper</h3>
            <p className="text-sm">
              Compress and manage your files seamlessly and securely.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/signup" className="hover:text-white">Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p className="text-sm">hello@filezipper.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} FileZipper. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer
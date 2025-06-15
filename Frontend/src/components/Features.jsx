import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router";
import {  Star } from "lucide-react";

function Features({FeaturesRef}) {
  return (
    <section ref = {FeaturesRef} className="px-6 py-20 bg-gray-900 border-y border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FileZipper?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Blazing Fast", desc: "Compress & decompress files in milliseconds." },
            { title: "Secure Storage", desc: "All data is encrypted and stored securely." },
            { title: "Access Anywhere", desc: "All your files available in one dashboard." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 p-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/10 transition"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Star className="mx-auto mb-4 text-indigo-400" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
  )
}

export default Features
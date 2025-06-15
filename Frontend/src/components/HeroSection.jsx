import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Compress. Decompress. <br className="hidden md:block" />
        Anytime, Anywhere.
      </motion.h1>
      <motion.p
        className="text-lg text-gray-400 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Fast, efficient, and secure file compression in one click.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/SignUp">
          <Button className="px-6 py-3 text-lg bg-indigo-600 cursor-pointer hover:bg-indigo-700">
            Get Started
          </Button>
        </Link>
        <Link to="/Login">
          <Button  variant="ghost" className="text-white hover:bg-white/10 px-6 py-3 text-lg hover:text-[#3ABDF8] transition-colors"> Login</Button>

        </Link>
      </motion.div>
    </section>
  );
}

export default HeroSection;

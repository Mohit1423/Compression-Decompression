

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Footer from "./Footer";
import Navbar from "./shared/Navbar";
import { useRef } from "react";
import Testimonials from "./Testimonials";
export default function Home() {
  const FeaturesRef = useRef(null);
  const TestimonialRef = useRef(null);
  const FooterRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <main className="bg-gray-950 text-white scroll-smooth">
      
      
      <Navbar scrollToSection={scrollToSection} FeaturesRef={FeaturesRef} TestimonialRef={TestimonialRef}  FooterRef={FooterRef}/>
      <HeroSection />   
      <Features FeaturesRef={FeaturesRef} />
      <Testimonials TestimonialRef={TestimonialRef} />
      <Footer FooterRef={FooterRef} />
    </main>
  );
}

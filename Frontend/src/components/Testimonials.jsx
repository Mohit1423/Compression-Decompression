import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = ({ TestimonialRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
  {
    id: 1,
    rating: 4,
    text: "The compression tool helped us reduce our deployment package size by over 60%. It's incredibly easy to use and has improved our CI/CD pipeline efficiency.",
    name: "Emily Johnson",
    position: "DevOps Engineer",
    company: "TechCorp",
    avatar: "EJ"
  },
  {
    id: 2,
    rating: 5,
    text: "Absolutely love the UI and speed. I use this tool almost daily to compress log files before archiving. Clean, simple, and effective!",
    name: "John Smith",
    position: "Backend Developer",
    company: "CreativeInc",
    avatar: "JS"
  },
  {
    id: 3,
    rating: 3,
    text: "It's decent for basic usage, though I'd love to see more format support and a batch processing feature. That would make it unbeatable.",
    name: "Alex Chen",
    position: "Product Manager",
    company: "InnovateCo",
    avatar: "AC"
  },
  {
    id: 4,
    rating: 5,
    text: "We integrated the API version of this into our workflow and it just works. Our support team is thrilled with how easy it is to send compressed data securely.",
    name: "Sarah Williams",
    position: "CTO",
    company: "StartupHub",
    avatar: "SW"
  }
];


  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToSlide = (index) => setCurrentIndex(index);

  const renderStars = (rating) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ))
  );

  return (
    <section ref={TestimonialRef} className="bg-gray-950 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Customer Testimonials</h2>
          <p className="text-lg text-gray-400">Real words from real users who love our tool.</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-w-3xl mx-auto">
                    <div className="flex justify-center mb-4">{renderStars(t.rating)}</div>
                    <p className="text-gray-300 italic text-center mb-6">"{t.text}"</p>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mr-4">
                        <span className="font-semibold">{t.avatar}</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white">{t.name}</h4>
                        <p className="text-sm text-gray-400">{t.position}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition z-10"
            aria-label="Next"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'bg-green-400 scale-125' : 'bg-gray-600 hover:bg-green-400/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
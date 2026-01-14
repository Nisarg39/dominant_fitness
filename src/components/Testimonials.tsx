'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  author: string;
  position: string;
  description: string;
  stars: number;
  date: string;
  avatar?: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Marcus Thompson",
    position: "Professional Basketball Player, NBA",
    description: "This program transformed my mental game completely. I went from doubting my abilities to dominating every competition. The performance strategies taught here are game-changing for any serious athlete.",
    stars: 5,
    date: "2023-11-15",
    initials: "MT"
  },
  {
    id: 2,
    author: "Sarah Chen",
    position: "Olympic Track & Field Athlete",
    description: "The training methodology here is unlike anything I've experienced. My speed, agility, and overall athletic performance have reached levels I never thought possible. This is what domination looks like.",
    stars: 5,
    date: "2023-12-02",
    initials: "SC"
  },
  {
    id: 3,
    author: "James Rodriguez",
    position: "Professional Soccer Player",
    description: "From average to exceptional - that's the transformation I experienced. The systematic approach to performance enhancement gave me the edge I needed to dominate my sport at the highest level.",
    stars: 5,
    date: "2024-01-10",
    initials: "JR"
  },
  {
    id: 4,
    author: "Alexandra Williams",
    position: "Professional Tennis Player",
    description: "The mental and physical training protocols here are revolutionary. I've achieved personal bests in every metric since implementing these strategies. This is what separates champions from the rest.",
    stars: 5,
    date: "2024-01-25",
    initials: "AW"
  },
  {
    id: 5,
    author: "Michael Davis",
    position: "Professional Football Player",
    description: "Every aspect of my game improved dramatically. The comprehensive approach to athletic development gave me the tools to consistently outperform my competition and achieve championship-level results.",
    stars: 5,
    date: "2024-02-12",
    initials: "MD"
  },
  {
    id: 6,
    author: "Elena Petrov",
    position: "Professional Track & Field Athlete",
    description: "This program doesn't just train athletes - it creates champions. The transformation in my performance has been remarkable. I've learned what it truly means to dominate in competitive sports.",
    stars: 5,
    date: "2024-02-28",
    initials: "EP"
  }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-[#111111] border border-white/10 p-8 rounded-2xl flex flex-col h-full transition-all duration-300 hover:border-[#fff200]/30 hover:shadow-[0_0_30px_rgba(255,242,0,0.05)]">
      <div className="flex justify-center mb-6">
        <GoogleIcon />
      </div>

      <div className="flex justify-center gap-1 mb-6">
        {[...Array(testimonial.stars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#fff200] text-[#fff200]" />
        ))}
      </div>

      <div className="flex-grow">
        <p className="text-white/80 text-center text-lg leading-relaxed italic mb-8">
          "{testimonial.description}"
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fff200] to-[#e6db00] flex items-center justify-center text-black font-bold text-lg shrink-0">
          {testimonial.initials}
        </div>
        <div className="text-left">
          <h4 className="text-white font-bold leading-none mb-1">{testimonial.author}</h4>
          <p className="text-white/40 text-xs uppercase tracking-wider">{testimonial.date}</p>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1200) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = Array.from({ length: cardsToShow }).map((_, i) => {
    const iconIndex = (currentIndex + i) % testimonials.length;
    return testimonials[iconIndex];
  });

  return (
    <section id="testimonials-section" className="relative py-24 bg-black overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fff200]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fff200]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-montserrat uppercase mb-4"
            style={{
              color: '#fff200',
              textShadow: '0 0 30px rgba(255,242,0,0.2)'
            }}
          >
            CHAMPIONSHIP FEEDBACK
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto italic">
            Trusted by world-class athletes to deliver elite performance results.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout' custom={direction}>
              {visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  layout
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="h-full"
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#fff200] hover:text-black transition-all z-20 group"
          >
            <ChevronLeft className="group-hover:scale-120 transition-transform" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#fff200] hover:text-black transition-all z-20 group"
          >
            <ChevronRight className="group-hover:scale-120 transition-transform" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#fff200]' : 'bg-white/20'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
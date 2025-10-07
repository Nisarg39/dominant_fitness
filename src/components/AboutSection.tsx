'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import PixelCanvas from './PixelCanvas'

// Declare particles.js types for CDN version
declare global {
  interface Window {
    particlesJS?: (id: string, config: ParticlesConfig) => void;
  }
}

interface ParticlesConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string[];
    };
    shape: {
      type: string;
      stroke: {
        width: number;
        color: string;
      };
      polygon: {
        nb_sides: number;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        size_min: number;
        sync: boolean;
      };
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      bubble: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
      push: {
        particles_nb: number;
      };
      remove: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
}

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Card hover state for red background effect
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  
  
  // Section reveal animation state
  const [sectionInView, setSectionInView] = useState(false)
  
  // Set mounted on client side first
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize particles.js effect
  useEffect(() => {
    if (!mounted) return

    // Load particles.js script dynamically
    const loadParticlesScript = () => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (typeof window !== 'undefined' && window.particlesJS) {
          resolve(true)
          return
        }

        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => reject(new Error('Failed to load particles.js'))
        document.head.appendChild(script)
      })
    }

    const initParticles = async () => {
      try {
        await loadParticlesScript()
        
        // Wait a bit for the script to initialize
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.particlesJS) {
            window.particlesJS('particles-js', {
              "particles": {
                "number": {
                  "value": 100,
                  "density": {
                    "enable": true,
                    "value_area": 1000
                  }
                },
                "color": {
                  "value": ["#ca2f2e", "#ff5757", "#dc2626", "#ffffff"]
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#fff"
                  },
                  "polygon": {
                    "nb_sides": 5
                  }
                },
                "opacity": {
                  "value": 0.6,
                  "random": false,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 2,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 120,
                  "color": "#ffffff",
                  "opacity": 0.4,
                  "width": 1
                },
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "grab"
                  },
                  "onclick": {
                    "enable": false
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 140,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 200,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            })
          } else {
            console.error('particlesJS not available after loading')
          }
        }, 100)
      } catch (error) {
        console.error('Error loading particles.js:', error)
      }
    }

    initParticles()
  }, [mounted])

  // Use intersection observer for reveal animations
  const [missionInView, setMissionInView] = useState(false)
  const [valuesInView, setValuesInView] = useState(false)
  const [founderInView, setFounderInView] = useState(false)

  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const founderRef = useRef<HTMLDivElement>(null)
  
  // Refs for individual cards to use with PixelCanvas
  const visionCardRef = useRef<HTMLDivElement>(null)
  const missionCardRef = useRef<HTMLDivElement>(null)
  const valuesCardRef = useRef<HTMLDivElement>(null)
  const founderCardRef = useRef<HTMLDivElement>(null)
  
  // Ref for the unified about card
  const unifiedCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) setSectionInView(true)
          if (entry.target === missionRef.current) setMissionInView(true)
          if (entry.target === valuesRef.current) setValuesInView(true)
          if (entry.target === founderRef.current) setFounderInView(true)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (missionRef.current) observer.observe(missionRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)
    if (founderRef.current) observer.observe(founderRef.current)

    return () => observer.disconnect()
  }, [mounted])

  // Section reveal animation variants
  const sectionRevealVariants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  // Background reveal variants
  const backgroundRevealVariants = {
    initial: {
      opacity: 0,
      scale: 1.1
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const
      }
    }
  }

  // Animation variants for individual cards
  const revealVariants = {
    initial: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 10,
      filter: "blur(10px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }


  // Prevent scroll animations on server side
  if (!mounted) {
    return (
      <section 
        id="about-section" 
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#000000' }}
      >
        <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20">
          <div className="text-center">
            <h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: '#ca2f2e'
              }}
            >
              ABOUT US
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to transforming athletic potential into peak performance through cutting-edge training methodologies and personalized coaching strategies.
            </p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <motion.section 
      ref={sectionRef}
      id="about-section" 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: '#000000'
      }}
      variants={sectionRevealVariants}
      initial="initial"
      animate={sectionInView ? "animate" : "initial"}
    >
      {/* Enhanced SVG Filter Definitions for Modern Effects */}
      <svg className="absolute" style={{ width: 0, height: 0 }}>
        <defs>
          {/* Electric Border Effect */}
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          {/* Glowing Border Effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Animated Glow Effect */}
          <filter id="animated-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur">
              <animate attributeName="stdDeviation" values="2;4;2" dur="3s" repeatCount="indefinite"/>
            </feGaussianBlur>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Dark Theme Background with Gradients */}
      <motion.div 
        className="absolute inset-0 z-0"
        variants={backgroundRevealVariants}
        initial="initial"
        animate={sectionInView ? "animate" : "initial"}
      >
        {/* Main gradient overlays matching HeroSection theme */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            backgroundPosition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            background: `
              linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.9) 100%), 
              linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%), 
              linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9) 100%), 
              radial-gradient(ellipse 60% 80% at 5% 50%, rgba(202,47,46,0.25) 0%, rgba(202,47,46,0.15) 25%, rgba(202,47,46,0.08) 50%, transparent 70%),
              linear-gradient(225deg, rgba(202,47,46,0.1) 0%, transparent 40%)
            `,
            backgroundSize: '200% 200%',
            zIndex: 1
          }}
        />
        
        {/* Cinematic vignette */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.6) 100%)',
            zIndex: 2
          }}
        />

        {/* Advanced transition gradient from hero section */}
        <motion.div 
          className="absolute inset-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%)',
            zIndex: 3
          }}
        />

      </motion.div>

      {/* Particles.js Background */}
      <div 
        id="particles-js"
        className="absolute inset-0 z-5"
        style={{
          width: '100%',
          height: '100%',
          background: '#000000'
        }}
      />

      {/* Background Animation Elements with Parallax */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Parallax animated lines */}
        <motion.div 
          className="bg-interactive-element absolute"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ 
            top: '20%', 
            left: '5%', 
            width: '100px', 
            height: '2px', 
            background: 'linear-gradient(90deg, transparent, rgba(202,47,46,0.3), transparent)'
          }} 
        />
        <motion.div 
          className="bg-interactive-element absolute"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 1.8, delay: 0.8 }}
          style={{ 
            top: '60%', 
            right: '10%', 
            width: '80px', 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
          }} 
        />
        <motion.div 
          className="bg-interactive-element absolute"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          style={{ 
            bottom: '25%', 
            left: '15%', 
            width: '120px', 
            height: '2px', 
            background: 'linear-gradient(90deg, rgba(202,47,46,0.25), transparent)'
          }} 
        />

        {/* Enhanced floating particles with advanced animations */}
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 50, rotate: 0 }}
          animate={{ 
            scale: [0, 1.5, 1, 1.2], 
            opacity: [0, 0.8, 0.6, 0.7], 
            y: [50, 0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4, 
            delay: 0.6, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            top: '15%', 
            left: '20%', 
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            filter: 'blur(0.5px)', 
            background: 'radial-gradient(circle, rgba(202,47,46,1) 0%, rgba(202,47,46,0.6) 70%, transparent 100%)',
            boxShadow: '0 0 30px rgba(202,47,46,0.8), 0 0 60px rgba(202,47,46,0.4)'
          }} 
        />
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 30, rotate: 0 }}
          animate={{ 
            scale: [0, 1.8, 1.2, 1.5], 
            opacity: [0, 0.9, 0.7, 0.8], 
            y: [30, 0, -25, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 5, 
            delay: 0.9, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            top: '40%', 
            left: '70%', 
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            filter: 'blur(0.3px)', 
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 70%, transparent 100%)',
            boxShadow: '0 0 25px rgba(255,255,255,0.6), 0 0 50px rgba(255,255,255,0.3)'
          }} 
        />
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 40, rotate: 0 }}
          animate={{ 
            scale: [0, 1.1, 0.7, 1], 
            opacity: [0, 0.18, 0.12, 0.15], 
            y: [40, 0, -20, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: 3.5, 
            delay: 1.2, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            top: '70%', 
            left: '30%', 
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            filter: 'blur(1px)', 
            background: 'radial-gradient(circle, rgba(202,47,46,0.7) 0%, rgba(202,47,46,0.4) 70%, transparent 100%)',
            boxShadow: '0 0 25px rgba(202,47,46,0.5)'
          }} 
        />

        {/* Additional floating elements for more dynamic feel */}
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, x: 100 }}
          animate={{ 
            scale: [0, 0.8, 1, 0.6], 
            opacity: [0, 0.1, 0.08, 0.05], 
            x: [100, 0, -20, 0]
          }}
          transition={{ 
            duration: 6, 
            delay: 1.8, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            top: '25%', 
            right: '15%', 
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(202,47,46,0.4)',
            boxShadow: '0 0 10px rgba(202,47,46,0.3)'
          }} 
        />
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, x: -80 }}
          animate={{ 
            scale: [0, 1.3, 0.9, 1.1], 
            opacity: [0, 0.12, 0.08, 0.1], 
            x: [-80, 0, 25, 0]
          }}
          transition={{ 
            duration: 4.5, 
            delay: 2.1, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            top: '60%', 
            left: '10%', 
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            boxShadow: '0 0 12px rgba(255,255,255,0.2)'
          }} 
        />

      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 lg:px-8 py-20"
        variants={{
          initial: { opacity: 0, y: 50 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
        initial="initial"
        animate={sectionInView ? "animate" : "initial"}
      >

        {/* Unified About Card with Three Sections */}
        <motion.div 
          ref={missionRef}
          className="mb-16"
          initial={revealVariants.initial}
          animate={missionInView ? revealVariants.animate : revealVariants.initial}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              ref={unifiedCardRef}
              className="relative overflow-hidden transition-all duration-500 ease-out rounded-2xl"
              variants={{
                initial: { 
                  y: 80, 
                  opacity: 0, 
                  scale: 0.9,
                  rotateX: 10 
                },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { 
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* PixelCanvas Effect - Must be first to be behind everything */}
              <PixelCanvas 
                colors="#ca2f2e, #ff5757, #dc2626"
                gap="2"
                speed="120"
                parentRef={unifiedCardRef}
                className="rounded-2xl"
              />
              
              {/* Enhanced Glassmorphism overlay */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.15) 100%)',
                  opacity: 0.4,
                  zIndex: 2
                }}
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
                    backgroundSize: '200% 200%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.7
                  }}
                />
              </div>
              
              {/* Content - Three Sections */}
              <div className="relative z-20 p-8">
                {/* Vision Section - Top */}
                <motion.div 
                  className="mb-12"
                  style={{
                    borderRadius: '16px',
                    padding: '24px'
                  }}
                >
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold mb-6 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: '#ca2f2e',
                      textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                    }}
                    variants={{
                      initial: { y: 40, opacity: 0, scale: 0.9 },
                      animate: { 
                        y: 0, 
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          delay: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      textShadow: '0 4px 8px rgba(202, 47, 46, 0.4)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    VISION
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 leading-relaxed text-lg text-center"
                    variants={{
                      initial: { x: -20, opacity: 0, y: 20 },
                      animate: { 
                        x: 0, 
                        opacity: 1,
                        y: 0,
                        transition: { 
                          duration: 0.7,
                          delay: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }
                    }}
                    whileHover={{
                      color: 'rgba(255, 255, 255, 1)',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    To redefine the future of Indian sport by building a world-class athlete development ecosystem where every athlete, from grassroots to elite, has access to science-led training, holistic support, and a clear pathway to thrive at the highest levels.
                  </motion.p>
                </motion.div>

                {/* Mission and Values Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Mission Section - Left */}
                  <motion.div 
                    style={{
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold mb-6"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#ca2f2e',
                        textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                      }}
                      variants={{
                        initial: { y: 40, opacity: 0 },
                        animate: { 
                          y: 0, 
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            delay: 0.2
                          }
                        }
                      }}
                    >
                      MISSION
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 leading-relaxed"
                      variants={{
                        initial: { x: -20, opacity: 0 },
                        animate: { 
                          x: 0, 
                          opacity: 1,
                          transition: { duration: 0.5 }
                        }
                      }}
                    >
                      We exist to make world-class sport science and coaching accessible in India, empowering athletes at every level to reach their true potential.
                    </motion.p>
                  </motion.div>

                  {/* Values Section - Right */}
                  <motion.div 
                    style={{
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold mb-6"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#ca2f2e',
                        textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                      }}
                      variants={{
                        initial: { y: 40, opacity: 0 },
                        animate: { 
                          y: 0, 
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            delay: 0.2
                          }
                        }
                      }}
                    >
                      CORE VALUES
                    </motion.h3>
                    <motion.div 
                      className="space-y-6"
                      variants={{
                        initial: {},
                        animate: {
                          transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.3
                          }
                        }
                      }}
                    >
                      <motion.div 
                        className="flex items-start space-x-4"
                        variants={{
                          initial: { x: -20, opacity: 0 },
                          animate: { 
                            x: 0, 
                            opacity: 1,
                            transition: { duration: 0.5 }
                          }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            SCIENCE
                          </h4>
                          <p className="text-white/80 text-sm leading-relaxed">
                            Evidence-based, practical methods that deliver results.
                          </p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start space-x-4"
                        variants={{
                          initial: { x: -20, opacity: 0 },
                          animate: { 
                            x: 0, 
                            opacity: 1,
                            transition: { duration: 0.5, delay: 0.1 }
                          }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                          <img 
                            src="/images/svg/004-percentage.svg" 
                            alt="Access" 
                            className="w-5 h-5"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            ACCESS
                          </h4>
                          <p className="text-white/80 text-sm leading-relaxed">
                            High-quality support for every athlete, from grassroots to elite.
                          </p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start space-x-4"
                        variants={{
                          initial: { x: -20, opacity: 0 },
                          animate: { 
                            x: 0, 
                            opacity: 1,
                            transition: { duration: 0.5, delay: 0.2 }
                          }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                          <img 
                            src="/images/svg/005-line-chart.svg" 
                            alt="Growth" 
                            className="w-5 h-5"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            GROWTH
                          </h4>
                          <p className="text-white/80 text-sm leading-relaxed">
                            Relentless pursuit of progress in athletes, coaches, and Indian sport.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Meet the Founder Section */}
        <motion.div 
          ref={founderRef}
          className="mb-20"
          initial={revealVariants.initial}
          animate={founderInView ? revealVariants.animate : revealVariants.initial}
        >
          <h3 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: '#ca2f2e',
              textShadow: '0 2px 4px rgba(0,0,0,0.7)'
            }}
          >
            MEET THE FOUNDER
          </h3>
          <div className="max-w-7xl mx-auto">
            <motion.div 
              ref={founderCardRef}
              className="relative overflow-hidden transition-all duration-500 ease-out rounded-2xl"
              whileHover={{ 
                y: -8,
                transition: { 
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              onHoverStart={() => setHoveredCard('founder')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === 'founder' 
                  ? 'rgba(0, 0, 0, 0.8)' 
                  : 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: hoveredCard === 'founder' 
                  ? '1px solid rgba(202, 47, 46, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: hoveredCard === 'founder' 
                  ? '0 8px 32px rgba(202, 47, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* PixelCanvas Effect */}
              <PixelCanvas 
                colors="#ca2f2e, #ff5757, #dc2626"
                gap="8"
                speed="60"
                parentRef={founderCardRef}
                className="rounded-2xl"
              />
              {/* Glassmorphism overlay */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: hoveredCard === 'founder' 
                    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(202, 47, 46, 0.1) 50%, rgba(0, 0, 0, 0.25) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.15) 100%)',
                  opacity: hoveredCard === 'founder' ? 0.9 : 0.7
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left: Identity */}
                  <div className="text-center lg:text-left lg:col-span-4">
                    <div 
                      className="w-72 h-72 mx-auto lg:mx-0 mb-6 overflow-hidden"
                      style={{
                        background: '#000000',
                        border: '3px solid rgba(202,47,46,0.3)'
                      }}
                    >
                      <img 
                        src="/Om.png" 
                        alt="Founder Photo" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="transition-transform duration-300 hover:scale-110 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
                        priority
                      />
                      <h4 
                        className="text-xl sm:text-2xl font-bold text-white"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                        }}
                      >
                        Om Chavan
                      </h4>
                    </div>
                    <p 
                      className="text-red-400 mt-1 font-semibold"
                      style={{
                        fontFamily: "'Montserrat', sans-serif"
                      }}
                    >
                      Founder & Lead Performance Coach
                    </p>

                    {/* Qualification badges */}
                    <div className="flex flex-wrap gap-2 mt-5 justify-center lg:justify-start">
                      <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white border border-white/15">UKSCA Accredited Coach</span>
                      <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white border border-white/15">M.Sc. Strength & Conditioning (Loughborough, UK)</span>
                      <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white border border-white/15">B.Sc. Exercise & Sport Science (Manipal, India)</span>
                    </div>

                    {/* Region meta removed per request */}

                    {/* CTAs removed per request */}
                  </div>

                  {/* Right: Structured Content */}
                  <div className="space-y-8 lg:col-span-8">
                    {/* Professional Experience */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ duration: 0.5 }}
                    >
                      <h5 
                        className="text-xl md:text-2xl font-bold mb-4"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          color: '#ca2f2e',
                          textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                        }}
                      >
                        Professional Experience
                      </h5>
                      <ul className="space-y-3 text-white/90">
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Applied Sport Science and Strength & Conditioning support for athletes across Rugby, Football, Hockey, Tennis, and Badminton in the UK.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Strength & Conditioning Coach at the Derbyshire Institute of Sport, UK, supporting elite youth athletes.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Worked with Loughborough Women's Rugby 2s and the England Colleges U-17 Hockey Athletes.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Currently developing grassroots athlete programs in India, bringing global sport science standards to the local landscape.</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Athletic Background & Achievements */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h5 
                        className="text-xl md:text-2xl font-bold mb-4"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          color: '#ca2f2e',
                          textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                        }}
                      >
                        Athletic Background & Achievements
                      </h5>
                      <ul className="space-y-3 text-white/90">
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>District- and University-level athlete in football and track & field.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Winner, Reliance Foundation Youth Sports football tournament, Pune 2017 (held at DSK Shivajians).</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>Competed in 100m, 200m, 4x100m relays, and long jump at the intercollegiate and university level.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                          <span>10+ years immersed in competitive sport, now channelling that experience into athlete development.</span>
                        </li>
                      </ul>

                      {/* Sport tags removed per request */}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
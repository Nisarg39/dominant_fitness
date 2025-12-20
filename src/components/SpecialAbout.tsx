'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'

const SpecialAbout = () => {
  const [hoveredHex, setHoveredHex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const performanceComponents = [
    {
      id: 1,
      title: "ATHLETIC DEVELOPMENT",
      subtitle: "PHYSICAL",
      description: "Strength, power, conditioning, mobility - the physical foundation of sport.",
      icon: (
        <div className="flex items-center justify-center w-12 h-12">
          <div className="relative">
            <div className="w-8 h-2 bg-[#fff200] rounded-full animate-pulse" />
            <div className="absolute -left-2 -top-1 w-4 h-4 bg-[#fff200] rounded rotate-45" />
            <div className="absolute -right-2 -top-1 w-4 h-4 bg-[#fff200] rounded rotate-45" />
          </div>
        </div>
      ),
      color: "#fff200",
      stats: { power: 95, speed: 85, endurance: 90 }
    },
    {
      id: 2,
      title: "TECHNICAL ABILITY",
      subtitle: "SKILLS",
      description: "Refining sport-specific skills to compete at your best.",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-[#fff200] rounded-full animate-ping"
              style={{
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
          <div className="absolute w-3 h-3 bg-[#fff200] rounded-full" />
        </div>
      ),
      color: "#fff200",
      stats: { precision: 98, control: 92, technique: 95 }
    },
    {
      id: 3,
      title: "PERFORMANCE TESTING",
      subtitle: "ANALYSIS",
      description: "Test. Train. Retest. Track progress with purpose.",
      icon: (
        <div className="flex items-end justify-center space-x-1 w-12 h-12">
          {[3, 5, 8, 6, 9].map((height, i) => (
            <div
              key={i}
              className="bg-[#fff200] rounded-t animate-pulse"
              style={{ 
                width: '6px', 
                height: `${height * 3}px`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      ),
      color: "#fff200",
      stats: { accuracy: 96, insights: 88, tracking: 94 }
    },
    {
      id: 4,
      title: "SPORTS SCIENCE & TECHNOLOGY",
      subtitle: "TECHNOLOGY",
      description: "Data-Driven Coaching, force-velocity profiling, progress reports, feedback loops",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#fff200] rounded-full">
            <div className="w-full h-full relative">
              <div className="absolute inset-2 bg-[#fff200] rounded-full animate-pulse" />
              <div className="absolute inset-3 bg-black rounded-full" />
              <div className="absolute inset-4 bg-[#fff200] rounded-full animate-ping" />
            </div>
          </div>
        </div>
      ),
      color: "#fff200",
      stats: { focus: 93, reaction: 89, mindset: 97 }
    },
    {
      id: 5,
      title: "MOTOR LEARNING & SKILL ACQUISITION",
      subtitle: "COGNITIVE",
      description: "Co-ordination, movement literacy, proprioception, decision-making",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-2 border-[#fff200] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-0.5 bg-[#fff200]" />
              <div className="w-0.5 h-8 bg-[#fff200] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>
      ),
      color: "#fff200",
      stats: { recovery: 91, flexibility: 86, resilience: 94 }
    },
    {
      id: 6,
      title: "PERFORMANCE NUTRITION",
      subtitle: "NUTRITION",
      description: "Sport-specific fuelling, hydration, supplementation, recovery planning",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-8 h-10 border-2 border-[#fff200] rounded-lg relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[#fff200] opacity-60"
              animate={{ height: ['20%', '80%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      ),
      color: "#fff200",
      stats: { energy: 92, hydration: 95, timing: 88 }
    },
    {
      id: 7,
      title: "RECOVERY & REHAB",
      subtitle: "RECOVERY",
      description: "Return-to-sport, load management, soft-tissue work.",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-2 border-[#fff200] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-0.5 bg-[#fff200] rounded" />
              <div className="w-0.5 h-6 bg-[#fff200] rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>
      ),
      color: "#fff200",
      stats: { recovery: 91, flexibility: 86, resilience: 94 }
    },
    {
      id: 8,
      title: "YOUTH DEVELOPMENT",
      subtitle: "DEVELOPMENT",
      description: "Age-appropriate S&C for long-term success - not burnout.",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 bg-[#fff200] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ),
      color: "#fff200",
      stats: { development: 88, safety: 95, potential: 92 }
    },
    {
      id: 9,
      title: "MENTAL PERFORMANCE",
      subtitle: "MENTAL",
      description: "Confidence, mindset, psychology, visualization, competition readiness",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#fff200] rounded-full">
            <div className="w-full h-full relative">
              <div className="absolute inset-2 bg-[#fff200] rounded-full animate-pulse" />
              <div className="absolute inset-3 bg-black rounded-full" />
              <div className="absolute inset-4 bg-[#fff200] rounded-full animate-ping" />
            </div>
          </div>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-3 bg-[#fff200] origin-bottom"
              style={{
                transformOrigin: 'center 16px',
                transform: `rotate(${i * 45}deg) translateY(-12px)`
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scaleY: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      ),
      color: "#fff200",
      stats: { focus: 93, confidence: 89, mindset: 97 }
    },
    {
      id: 10,
      title: "COACH & PARENT EDUCATION",
      subtitle: "EDUCATION",
      description: "Coach education, workshops, parent-athlete communication",
      icon: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          {[0, 1].map((_, i) => (
            <div key={i} className="relative" style={{ marginLeft: i * 8 }}>
              <motion.div
                className="w-3 h-3 bg-[#fff200] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
              <div className="w-4 h-5 bg-[#fff200] rounded-b-lg mt-1" />
            </div>
          ))}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-[#fff200] rounded opacity-60"
            animate={{
              scaleX: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ),
      color: "#fff200",
      stats: { education: 90, communication: 87, support: 94 }
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-8 md:py-12"
    >

      {/* Subtle Floating Particles */}
      {isMounted && [...Array(8)].map((_, i) => {
        const initialX = Math.random() * window.innerWidth
        const initialY = Math.random() * window.innerHeight
        const targetX = Math.random() * window.innerWidth
        const targetY = Math.random() * window.innerHeight
        const duration = Math.random() * 20 + 10
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#fff200] rounded-full opacity-20"
            initial={{
              x: initialX,
              y: initialY,
            }}
            animate={{
              x: targetX,
              y: targetY,
              opacity: [0.05, 0.3, 0.05],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
            style={{
              filter: 'blur(0.5px)',
            }}
          />
        )
      })}

      {/* Animated Geometric Shapes */}
      {isMounted && [...Array(4)].map((_, i) => {
        const shapes = ['circle', 'triangle', 'logo'];
        const shape = shapes[i % 3];
        const size = Math.random() * 30 + 15;
        const initialX = Math.random() * window.innerWidth
        const initialY = Math.random() * window.innerHeight
        const targetX = Math.random() * window.innerWidth
        const targetY = Math.random() * window.innerHeight
        const duration = Math.random() * 30 + 15
        
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-10"
            initial={{
              x: initialX,
              y: initialY,
              rotate: 0,
            }}
            animate={{
              x: targetX,
              y: targetY,
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            {shape === 'circle' && (
              <div
                className="border-2 border-[#fff200] rounded-full"
                style={{ width: size, height: size }}
              />
            )}
            {shape === 'triangle' && (
              <div
                className="border-2 border-[#fff200]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${size/2}px solid transparent`,
                  borderRight: `${size/2}px solid transparent`,
                  borderBottom: `${size}px solid #fff200`,
                  borderTop: 'none',
                }}
              />
            )}
            {shape === 'logo' && (
              <div
                style={{
                  width: size * 1.5,
                  height: size * 1.5,
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo Shape"
                  width={size * 1.5}
                  height={size * 1.5}
                  style={{
                    opacity: 0.6,
                    filter: 'brightness(0) invert(1)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,242,0,0.3) 1px, transparent 0),
            linear-gradient(0deg, rgba(255,242,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,242,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />

      {/* Dynamic Glow Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(255,242,0,${backgroundGlow}) 0%, transparent 60%)`,
          opacity: backgroundGlow
        }}
      />


      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block">
            <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-black italic tracking-wider mb-2">
              <span className="text-white">How Does One </span>
              <span className="text-[#fff200]">Dominate</span>
              <span className="text-white"> Sport Performance?</span>
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-[#fff200] to-transparent" />
          </div>
        </motion.div>

        {/* STAIRCASE UI LAYOUT */}
        <div className="w-full relative">
          
          {/* Mobile: Left-Aligned Staircase */}
          <div className="block md:hidden -mx-4">
            <div className="relative space-y-1">
              {performanceComponents.map((component, index) => (
                <motion.div
                  key={component.id}
                  className="relative cursor-pointer"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  onMouseEnter={() => setHoveredHex(component.id)}
                  onMouseLeave={() => setHoveredHex(null)}
                >
                  {/* Main Step Bar */}
                  <motion.div
                    className="relative overflow-hidden backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
                      border: `1px solid ${component.color}50`,
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      letterSpacing: `${Math.max(0, (10 - index) / 6)}px`,
                      boxShadow: `0 8px 32px ${component.color}30, inset 0 1px 0 ${component.color}20`,
                      willChange: 'width'
                    }}
                    initial={{ width: `${35 + index * 7}%` }}
                    animate={{
                      width: hoveredHex === component.id ? '90%' : `${35 + index * 7}%`,
                      paddingRight: hoveredHex === component.id ? '2rem' : '1rem'
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.4, 0.0, 0.2, 1],
                      type: "tween"
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs tracking-wider font-mono uppercase" style={{ color: component.color }}>
                        {component.title}
                      </h3>
                      <span className="text-gray-400 font-bold text-xs">#{component.id}</span>
                    </div>
                  </motion.div>

                  {/* Expandable Details - Full Width Below */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: hoveredHex === component.id ? 'auto' : 0,
                      opacity: hoveredHex === component.id ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeInOut",
                      delay: hoveredHex === component.id ? 0.1 : 0
                    }}
                    className="overflow-hidden bg-black/95 backdrop-blur-sm border-l-4 mt-1"
                    style={{
                      borderColor: component.color,
                      width: '88%',
                      marginLeft: '1rem'
                    }}
                  >
                    <div className="p-4">
                      {/* Description */}
                      <div className="mb-4">
                        <div 
                          className="text-xs font-bold uppercase tracking-wider mb-2"
                          style={{ color: component.color }}
                        >
                          {component.subtitle}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {component.description}
                        </p>
                      </div>

                      {/* Compact Stats Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(component.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xs text-gray-400 uppercase mb-1">{key}</div>
                            <div className="text-white font-bold text-sm mb-1">{value}%</div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: component.color }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Left-Aligned Staircase */}
          <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2">
            <div className="relative w-full">
              {/* Stack stairs from bottom to top */}
              <div className="space-y-0">
                {performanceComponents.map((component, index) => {
                  const stairWidth = `${18 + index * 3.5}%` // More compact width progression
                  const isExpanded = hoveredHex === component.id
                  
                  return (
                    <motion.div
                      key={component.id}
                      className="relative cursor-pointer group"
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : {}}
                      transition={{ 
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      onMouseEnter={() => setHoveredHex(component.id)}
                      onMouseLeave={() => setHoveredHex(null)}
                    >
                      {/* Main Stair Step with Inline Expansion */}
                      <motion.div
                        className="relative overflow-hidden backdrop-blur-sm shadow-lg mb-0.5"
                        style={{
                          background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
                          border: `1px solid ${component.color}50`,
                          paddingLeft: '1.5rem',
                          paddingRight: '1rem',
                          paddingTop: '0.6rem',
                          paddingBottom: isExpanded ? '1.2rem' : '0.6rem',
                          letterSpacing: '0.05em',
                          boxShadow: hoveredHex === component.id 
                            ? `0 4px 16px ${component.color}20, 0 0 8px ${component.color}30, inset 0 1px 0 ${component.color}20`
                            : `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 ${component.color}08`,
                          borderRadius: '0',
                          willChange: 'width, height'
                        }}
                        onMouseEnter={() => setHoveredHex(component.id)}
                        onMouseLeave={() => setHoveredHex(null)}
                        initial={{ width: stairWidth }}
                        animate={{
                          width: isExpanded ? '42%' : stairWidth,
                          paddingRight: isExpanded ? '1.5rem' : '1rem',
                          scale: hoveredHex === component.id ? 1.005 : 1
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          type: "tween"
                        }}
                      >
                        {/* Header Section */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `${component.color}20`,
                                border: `1px solid ${component.color}40`
                              }}
                            >
                              <div className="scale-75" style={{ color: component.color }}>
                                {component.icon}
                              </div>
                            </div>
                            <h3 className="font-black text-xs lg:text-sm tracking-wider font-mono uppercase" style={{ color: component.color }}>
                              {component.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span 
                              className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: `${component.color}20`,
                                color: component.color
                              }}
                            >
                              {component.subtitle}
                            </span>
                            <span className="text-gray-400 font-bold text-xs">#{component.id}</span>
                          </div>
                        </div>

                        {/* Expandable Content Inline */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0
                          }}
                          transition={{ 
                            duration: 0.25, 
                            ease: "easeInOut",
                            delay: isExpanded ? 0.1 : 0
                          }}
                          className="overflow-hidden mt-3"
                        >
                          <div className="border-t border-gray-700 pt-3">
                            <div className="grid lg:grid-cols-2 gap-4">
                              {/* Description */}
                              <div>
                                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                                  {component.description}
                                </p>
                              </div>

                              {/* Compact Stats */}
                              <div className="grid grid-cols-3 gap-2">
                                {Object.entries(component.stats).map(([key, value]) => (
                                  <div key={key} className="text-center">
                                    <div className="text-xs text-gray-400 uppercase mb-0.5">{key}</div>
                                    <div className="text-white font-bold text-xs">{value}%</div>
                                    <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden mt-0.5">
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: component.color }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Hover Glow Effect */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `linear-gradient(135deg, rgba(255,255,255,0.1), transparent 70%)`,
                            opacity: hoveredHex === component.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-block">
            <button className="group relative px-8 py-3 bg-black border-2 border-[#fff200] overflow-hidden transition-all duration-300 hover:border-[#fff200]">
              <span className="relative z-10 text-white font-bold uppercase tracking-widest text-sm">
                INITIATE TRAINING
              </span>
              <div className="absolute inset-0 bg-[#fff200] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
            <div className="mt-2 text-xs text-gray-600 font-mono">
              [ PRESS TO ACTIVATE ]
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logo Watermark - Grey Watermark */}
      <motion.div 
        className="absolute top-32 left-1/2 transform -translate-x-1/2 md:top-40 md:left-1/2 md:transform md:-translate-x-1/2 lg:top-48 lg:right-0 lg:left-auto lg:w-1/2 lg:transform-none lg:translate-x-0 flex items-center justify-center pointer-events-none z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative">
          <Image
            src="/images/logo.png"
            alt="Logo Watermark"
            width={350}
            height={350}
            className="md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"
            style={{
              opacity: 0.15,
              filter: 'brightness(0) invert(1) blur(0.5px)'
            }}
            priority
          />
        </div>
      </motion.div>

      {/* Floating Tech Elements with Data Streams */}
      <div className="absolute top-20 left-10 text-[#fff200] opacity-20 font-mono text-xs hidden lg:block">
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SYS.PERF.v2.1
        </motion.div>
        <div className="mt-2 space-y-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-[#fff200] opacity-30"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-20 right-10 text-[#fff200] opacity-20 font-mono text-xs hidden lg:block">
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          PWR.LEVEL.MAX
        </motion.div>
        <div className="mt-2 space-y-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-[#fff200] opacity-30"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Minimal Tech Elements */}
      <div className="absolute top-40 right-20 text-[#fff200] opacity-08 font-mono text-xs hidden lg:block">
        <motion.div
          animate={{ 
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          [ACTIVE]
        </motion.div>
      </div>

      {/* Minimal Data Nodes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 border border-[#fff200] opacity-20"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${30 + Math.floor(i / 3) * 40}%`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-[#fff200] opacity-50" />
          {/* Connection lines */}
          {i < 5 && (
            <motion.div
              className="absolute top-1 left-2 h-px bg-[#fff200] opacity-30"
              animate={{ width: ['0px', '50px', '0px'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          )}
        </motion.div>
      ))}
    </section>
  )
}

export default SpecialAbout
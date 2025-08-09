/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const SpecialAbout1 = () => {
  const [activeComponent, setActiveComponent] = useState<number | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Scroll-based animation setup - tracks core hexagon position relative to viewport center
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["center end", "center start"]
  })
  
  // Pre-compute all transforms to avoid conditional hook calls
  const energySparksOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9, 1], [0, 0.7, 1, 0.5, 0])
  
  // Pre-compute enhanced gradient background transform
  const gradientBackground = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.6, 0.7, 1],
    [
      "radial-gradient(circle at center, rgba(202,47,46,0.04) 0%, rgba(255,87,87,0.02) 15%, transparent 30%)",
      "radial-gradient(circle at center, rgba(202,47,46,0.18) 0%, rgba(255,87,87,0.12) 20%, rgba(220,38,38,0.06) 35%, transparent 50%)",
      "radial-gradient(circle at center, rgba(202,47,46,0.18) 0%, rgba(255,87,87,0.12) 20%, rgba(220,38,38,0.06) 35%, transparent 50%)",
      "radial-gradient(circle at center, rgba(202,47,46,0.18) 0%, rgba(255,87,87,0.12) 20%, rgba(220,38,38,0.06) 35%, transparent 50%)",
      "radial-gradient(circle at center, rgba(202,47,46,0.04) 0%, rgba(255,87,87,0.02) 15%, transparent 30%)"
    ]
  )
  
  // Pre-compute enhanced gradient opacity transform
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8, 1], [0, 0.5, 0.7, 0.7, 0])
  
  // Pre-compute core transforms
  const coreY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['-200px', '-50%', '-50%', '-50%'])
  const coreScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8, 1], [0.8, 1, 1.2, 1.2, 1])
  const coreOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 1], [0.3, 0.7, 1, 1])
  const coreFilter = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6, 0.8, 1], 
    [
      "drop-shadow(0 0 5px rgba(202,47,46,0.2)) drop-shadow(0 0 10px rgba(255,87,87,0.1))",
      "drop-shadow(0 0 12px rgba(202,47,46,0.4)) drop-shadow(0 0 25px rgba(255,87,87,0.2))", 
      "drop-shadow(0 0 20px rgba(202,47,46,0.6)) drop-shadow(0 0 40px rgba(255,87,87,0.3))",
      "drop-shadow(0 0 20px rgba(202,47,46,0.6)) drop-shadow(0 0 40px rgba(255,87,87,0.3))",
      "drop-shadow(0 0 12px rgba(202,47,46,0.4)) drop-shadow(0 0 25px rgba(255,87,46,0.2))"
    ]
  )
  
  // Pre-compute header text transforms
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [0, 0.3, 0.8, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [40, 25, 10, 0])
  const headerScale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [0.9, 0.95, 1, 1])
  
  // Pre-compute orbital ring transforms
  const orbitalOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0, 0.3, 0.6, 0.6, 0])
  const orbitalScale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0.8, 1, 1.1, 1.1, 0.8])
  
  
  // Animation phases based on core hexagon position relative to viewport center:
  // 0.2 to 0.5: Hexagons expand as core approaches viewport center
  // 0.5 to 0.7: Hexagons stay expanded while core is centered in viewport
  // 0.7 to 1: Hexagons contract as core moves past viewport center

  const performanceComponents = [
    {
      id: 1,
      title: "Athletic Development",
      description: "Strength, power, conditioning, mobility - the physical foundation of sport.",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/5073/5073699.png"
          alt="Athletic Development"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ca2f2e",
      category: "Physical"
    },
    {
      id: 2,
      title: "Technical Ability",
      description: "Refining sport-specific skills to compete at your best.",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/7118/7118261.png"
          alt="Technical Ability"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ff5757",
      category: "Skills"
    },
    {
      id: 3,
      title: "Performance Testing",
      description: "Test. Train. Retest. Track progress with purpose.",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/9321/9321497.png"
          alt="Performance Testing"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ca2f2e",
      category: "Analysis"
    },
    {
      id: 4,
      title: "Sports Science & Technology",
      description: "Data-Driven Coaching, force-velocity profiling, progress reports, feedback loops",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/18853/18853543.png"
          alt="Sports Science & Technology"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ff5757",
      category: "Technology"
    },
    {
      id: 5,
      title: "Motor Learning",
      description: "Co-ordination, movement literacy, proprioception, decision-making",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/10446/10446361.png"
          alt="Motor Learning & Skill Acquisition"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ca2f2e",
      category: "Cognitive"
    },
    {
      id: 6,
      title: "Performance Nutrition",
      description: "Sport-specific fuelling, hydration, supplementation, recovery planning",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/10107/10107590.png"
          alt="Performance Nutrition"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ff5757",
      category: "Nutrition"
    },
    {
      id: 7,
      title: "Recovery & Rehab",
      description: "Return-to-sport, load management, soft-tissue work.",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/14795/14795599.png"
          alt="Recovery & Rehab"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ca2f2e",
      category: "Recovery"
    },
    {
      id: 8,
      title: "Youth Development",
      description: "Age-appropriate S&C for long-term success - not burnout.",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/10049/10049504.png"
          alt="Youth Development"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ff5757",
      category: "Development"
    },
    {
      id: 9,
      title: "Mental Performance",
      description: "Confidence, mindset, psychology, visualization, competition readiness",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/2017/2017301.png"
          alt="Mental Performance"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ca2f2e",
      category: "Mental"
    },
    {
      id: 10,
      title: "Coach & Parent Education",
      description: "Coach education, workshops, parent-athlete communication",
      icon: (
        <motion.img
          src="https://cdn-icons-png.flaticon.com/128/9706/9706567.png"
          alt="Coach & Parent Education"
          className="w-8 h-8"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ),
      color: "#ff5757",
      category: "Education"
    }
  ]

  // Pre-compute all component positions (no hooks here)
  const componentPositions = performanceComponents.map((_, index) => {
    // Calculate symmetrical positions in a perfect circle around center
    const angle = (index * 36) - 90; // 360/10 = 36 degrees between each, -90 to start from top
    
    // Use consistent radius values (no client-side checks during render)
    const radiusX = 45; // Horizontal radius
    const radiusY = 40; // Vertical radius (slightly less to compensate for aspect ratio)
    const centerX = 50; // Center at 50% of container
    const centerY = 50; // Center at 50% of container
    
    // Convert polar to cartesian coordinates for perfect circle with aspect ratio compensation
    const finalX = centerX + (Math.cos(angle * Math.PI / 180) * radiusX);
    const finalY = centerY + (Math.sin(angle * Math.PI / 180) * radiusY);
    
    return { 
      left: `${finalX}%`, 
      top: `${finalY}%` 
    }
  })

  // Create individual transforms for each component to avoid hooks in callbacks
  const componentTransforms: Array<{left: any, top: any, scale: any, opacity: any}> = []
  const trailTransforms: Array<{scale: any, opacity: any}> = []
  const labelTransforms: Array<{opacity: any, y: any}> = []
  
  for (let i = 0; i < performanceComponents.length; i++) {
    const position = componentPositions[i];
    
    // Component transforms
    componentTransforms.push({
      left: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.5, 0.8, 1], 
        ['50%', '50%', position.left, position.left, '50%']
      ),
      top: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.5, 0.8, 1], 
        ['50%', '50%', position.top, position.top, '50%']
      ),
      scale: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.5, 0.8, 1], 
        [0, 0, 1, 1, 0]
      ),
      opacity: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.4, 0.8, 1], 
        [0, 0, 1, 1, 0]
      )
    });

    // Trail transforms
    trailTransforms.push({
      scale: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.4, 0.5, 0.8, 1], 
        [0, 1.5, 0, 0, 1.5, 0]
      ),
      opacity: useTransform(
        scrollYProgress, 
        [0, 0.3, 0.4, 0.5, 0.8, 1], 
        [0, 0.6, 0, 0, 0.6, 0]
      )
    });

    // Label transforms
    labelTransforms.push({
      opacity: useTransform(
        scrollYProgress, 
        [0.2, 0.5, 0.7, 1], 
        [0, 1, 1, 0]
      ),
      y: useTransform(
        scrollYProgress, 
        [0.2, 0.5, 0.7, 1], 
        [20, 0, 0, 20]
      )
    });
  }

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black overflow-hidden py-8 md:py-12 lg:py-16 special-about-section flex items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #000000 20%, #020202 40%, #000000 60%, #000000 100%)',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Dynamic sunrise glow effect */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: gradientBackground,
            opacity: gradientOpacity
          }}
        />

        {/* Enhanced Floating Particles - More prominent and diverse */}
        {[
          { left: 10, top: 15, duration: 4.5, delay: 0.5, size: 'w-2 h-2' },
          { left: 25, top: 30, duration: 5.2, delay: 1.0, size: 'w-1.5 h-1.5' },
          { left: 45, top: 20, duration: 4.8, delay: 1.5, size: 'w-2.5 h-2.5' },
          { left: 60, top: 45, duration: 5.5, delay: 0.8, size: 'w-1 h-1' },
          { left: 75, top: 25, duration: 4.2, delay: 2.0, size: 'w-3 h-3' },
          { left: 80, top: 60, duration: 5.8, delay: 0.3, size: 'w-1.5 h-1.5' },
          { left: 90, top: 40, duration: 4.7, delay: 1.8, size: 'w-2 h-2' },
          { left: 15, top: 70, duration: 5.1, delay: 1.2, size: 'w-2.5 h-2.5' },
          { left: 35, top: 80, duration: 4.9, delay: 0.7, size: 'w-1 h-1' },
          { left: 55, top: 65, duration: 5.3, delay: 1.7, size: 'w-2 h-2' },
          { left: 70, top: 85, duration: 4.4, delay: 0.2, size: 'w-1.5 h-1.5' },
          { left: 85, top: 15, duration: 5.6, delay: 1.4, size: 'w-3 h-3' },
          { left: 5, top: 50, duration: 4.6, delay: 1.9, size: 'w-2 h-2' },
          { left: 40, top: 10, duration: 5.4, delay: 0.6, size: 'w-1.5 h-1.5' },
          { left: 65, top: 90, duration: 4.3, delay: 1.6, size: 'w-2.5 h-2.5' }
        ].map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute ${particle.size} bg-red-500 rounded-full`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              boxShadow: '0 0 10px rgba(255, 87, 87, 0.6), 0 0 20px rgba(202, 47, 46, 0.4)',
              filter: 'brightness(1.2)'
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Enhanced Decorative connecting elements for visual flow */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          {/* Enhanced grid connection lines with glow effects */}
          <motion.div 
            className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
            style={{
              boxShadow: '0 0 15px rgba(255, 87, 87, 0.5)',
              filter: 'brightness(1.3)'
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
            style={{
              boxShadow: '0 0 10px rgba(255, 87, 87, 0.4)',
              filter: 'brightness(1.2)'
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute top-2/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{
              boxShadow: '0 0 12px rgba(255, 87, 87, 0.4)',
              filter: 'brightness(1.25)'
            }}
            animate={{
              opacity: [0.35, 0.75, 0.35],
              scaleX: [0.85, 1.05, 0.85]
            }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
          />
          
          {/* Additional vertical connecting elements */}
          <motion.div 
            className="absolute left-1/2 top-1/4 w-0.5 h-1/2 bg-gradient-to-b from-transparent via-red-500/40 to-transparent"
            style={{
              boxShadow: '0 0 10px rgba(255, 87, 87, 0.3)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Diagonal connection lines */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
            style={{
              transform: 'rotate(30deg)',
              transformOrigin: 'left center',
              boxShadow: '0 0 8px rgba(255, 87, 87, 0.3)',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 3 }}
          />
          <motion.div 
            className="absolute top-3/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
            style={{
              transform: 'rotate(-30deg)',
              transformOrigin: 'left center',
              boxShadow: '0 0 8px rgba(255, 87, 87, 0.3)',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 4 }}
          />
        </div>
      </div>


      {/* DOMINATE Performance Matrix */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 w-full">
        
        {/* Energy Core - Central Command Hub */}
        <motion.div 
          className="absolute left-1/2 top-1/2 z-30"
          style={{
            x: '-50%',
            y: coreY,
            scale: coreScale,
            opacity: coreOpacity,
            filter: coreFilter
          }}
        >
          {/* Core Container */}
          <div className="relative inline-block">
            
            {/* Central Power Core with Header Text / Component Details */}
            <div className="relative z-10 flex flex-col items-center justify-center h-[120px] md:h-[250px] lg:h-[300px]">
              {(activeComponent || hoveredComponent) ? (
                /* Show Selected/Hovered Component Details - Centered */
                <div className="flex flex-col items-center justify-center text-center h-full">
                  {(() => {
                    const component = performanceComponents.find(c => c.id === (activeComponent || hoveredComponent));
                    
                    return component ? (
                      <div className="flex flex-col items-center justify-center space-y-1 md:space-y-3">
                        {/* Component Icon - Moved to top */}
                        <div className="flex justify-center">
                          <div 
                            className="w-6 h-6 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${component.color}30, ${component.color}10)`,
                              border: `1px solid ${component.color}60`,
                            }}
                          >
                            <div className="text-white scale-50 md:scale-90">{component.icon}</div>
                          </div>
                        </div>
                        
                        {/* Component Title */}
                        <div className="flex flex-col items-center">
                          <h2 
                            className="text-[10px] md:text-lg lg:text-xl font-bold font-montserrat uppercase leading-tight"
                            style={{
                              color: component.color,
                              textShadow: '0 2px 4px rgba(0,0,0,0.95)',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {component.title}
                          </h2>
                        </div>
                        
                        {/* Description */}
                        <p 
                          className="text-[8px] md:text-base text-white/80 font-medium leading-relaxed text-center px-1 md:px-4 max-w-[120px] md:max-w-md mx-auto"
                          style={{
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                          }}
                        >
                          {component.description}
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>
              ) : (
                /* Show Default Header Text */
                <motion.div 
                  className="flex flex-col items-center justify-center h-full space-y-3"
                  style={{
                    opacity: headerOpacity,
                    y: headerY,
                    scale: headerScale
                  }}
                >
                  {/* Logo at top */}
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
                    <Image
                      src="/images/logo.png"
                      alt="Core Logo"
                      width={96}
                      height={96}
                      className="w-full h-full"
                      style={{
                        opacity: 0.9,
                        filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(202,47,46,0.5)) drop-shadow(0 0 15px rgba(255,87,87,0.2))',
                        objectFit: 'contain'
                      }}
                      priority
                    />
                  </div>
                  
                  {/* Title text */}
                  <div className="text-center">
                    <h2 
                      className="text-xl md:text-2xl lg:text-3xl font-bold font-montserrat uppercase"
                      style={{
                        color: '#ca2f2e',
                        textShadow: '0 2px 4px rgba(0,0,0,0.95)',
                        letterSpacing: '0.05em',
                        lineHeight: '1.1'
                      }}
                    >
                      How To
                      <br/>
                      <span className="text-2xl md:text-3xl lg:text-4xl">DOMINATE</span>
                    </h2>
                    <p 
                      className="text-sm md:text-base text-white/80 font-medium mt-1"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        fontStyle: 'italic'
                      }}
                    >
                      Sport Performance
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Floating Energy Sparks around Text - Conditionally visible */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: (activeComponent || hoveredComponent) ? 0 : energySparksOpacity
                }}
              >
                {[
                  { x: 58, y: -2 },   // 0°
                  { x: 40, y: 40 },   // 45°
                  { x: -2, y: 78 },   // 90°
                  { x: -44, y: 40 },  // 135°
                  { x: -62, y: -2 },  // 180°
                  { x: -44, y: -44 }, // 225°
                  { x: -2, y: -82 },  // 270°
                  { x: 40, y: -44 }   // 315°
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      x: `${pos.x}px`,
                      y: `${pos.y}px`
                    }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.4, 1, 0.4],
                      x: [`${pos.x}px`, `${pos.x + (pos.x > 0 ? 15 : pos.x < 0 ? -15 : 0)}px`, `${pos.x}px`],
                      y: [`${pos.y}px`, `${pos.y + (pos.y > 0 ? 15 : pos.y < 0 ? -15 : 0)}px`, `${pos.y}px`]
                    }}
                    transition={{
                      duration: 2.5 + (i * 0.2),
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Crisscross Texture Pattern - Low opacity background texture */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: orbitalOpacity,
            scale: orbitalScale,
          }}
        >
          {/* Diagonal lines creating crisscross pattern */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`diagonal-1-${i}`}
              className="absolute bg-red-500/10"
              style={{
                width: '1px',
                height: '200%',
                left: `${i * 5}%`,
                top: '-50%',
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 8 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Counter-diagonal lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`diagonal-2-${i}`}
              className="absolute bg-red-400/8"
              style={{
                width: '1px',
                height: '200%',
                left: `${i * 5}%`,
                top: '-50%',
                transform: 'rotate(-45deg)',
                transformOrigin: 'center',
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0.04, 0.12, 0.04],
              }}
              transition={{
                duration: 9 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          
          {/* Fine horizontal grid lines */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`horizontal-${i}`}
              className="absolute bg-red-500/6"
              style={{
                width: '100%',
                height: '1px',
                top: `${i * 6.67}%`,
                left: '0%',
                filter: 'blur(0.3px)'
              }}
              animate={{
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 12 + (i * 0.4),
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
          
          {/* Fine vertical grid lines */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`vertical-${i}`}
              className="absolute bg-red-400/6"
              style={{
                width: '1px',
                height: '100%',
                left: `${i * 6.67}%`,
                top: '0%',
                filter: 'blur(0.3px)'
              }}
              animate={{
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 11 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Symmetrical Performance Matrix Layout */}
        <div className="relative max-w-7xl mx-auto">
          

          {/* Performance Components - Radial Reveal Layout */}
          <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[650px] lg:h-[750px] max-w-6xl mx-auto">
            {performanceComponents.map((component, index) => {
              const transforms = componentTransforms[index];
              const trailEffectTransforms = trailTransforms[index];
              const labelTransformData = labelTransforms[index];
              
              return (
                <motion.div
                  key={component.id}
                  className="group cursor-pointer absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: transforms.left,
                    top: transforms.top,
                    scale: transforms.scale,
                    opacity: transforms.opacity,
                    zIndex: 20
                  }}
                  whileHover={{ 
                    y: -15,
                    transition: { y: { duration: 0.3 } }
                  }}
                >
                  {/* Expanded Hover Area - Invisible larger zone including text labels */}
                  <div
                    className="absolute cursor-pointer"
                    style={{
                      width: '140px',
                      height: '180px', // Extended height to include text labels
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -45%)', // Shifted up slightly to center better with text
                      zIndex: 30,
                      pointerEvents: 'all',
                      borderRadius: '70px', // Oval shape to encompass hexagon and text
                      // Invisible background for debugging: backgroundColor: 'rgba(255,0,0,0.1)'
                    }}
                    onClick={() => {
                      // Only handle clicks on mobile (touch devices)
                      if (window.matchMedia('(hover: none)').matches) {
                        setActiveComponent(activeComponent === component.id ? null : component.id);
                      }
                    }}
                    onMouseEnter={() => {
                      // Only handle hover on desktop (devices that support hover)
                      if (window.matchMedia('(hover: hover)').matches) {
                        setHoveredComponent(component.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia('(hover: hover)').matches) {
                        setHoveredComponent(null);
                      }
                    }}
                  />
                  
                  {/* Launch Trail Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${component.color}40 0%, ${component.color}20 25%, transparent 60%)`,
                      filter: 'blur(8px)',
                      pointerEvents: 'none',
                      scale: trailEffectTransforms.scale,
                      opacity: trailEffectTransforms.opacity
                    }}
                  />

                  {/* Hexagonal Performance Pod - Optimized sizes for mobile */}
                  <motion.div 
                    className="relative w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 transition-all duration-300"
                    style={{
                      background: `conic-gradient(from 0deg, ${component.color}40, ${component.color}20, ${component.color}60, ${component.color}30)`,
                      clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                      filter: `drop-shadow(0 0 15px ${component.color}) brightness(${
                        (activeComponent === component.id || hoveredComponent === component.id) ? 1.6 : 1
                      }) ${
                        (activeComponent === component.id || hoveredComponent === component.id) 
                          ? `drop-shadow(0 0 35px ${component.color}) drop-shadow(0 0 60px ${component.color}80) drop-shadow(0 0 80px ${component.color}60)` 
                          : ''
                      }`,
                      transform: hoveredComponent === component.id ? 'scale(1.08)' : 'scale(1)',
                      pointerEvents: 'none'
                    }}
                    animate={{
                      boxShadow: (activeComponent === component.id || hoveredComponent === component.id) 
                        ? [
                            `0 0 40px ${component.color}, 0 0 80px ${component.color}70, 0 0 120px ${component.color}40, 0 0 160px ${component.color}25`,
                            `0 0 50px ${component.color}, 0 0 100px ${component.color}80, 0 0 150px ${component.color}50, 0 0 200px ${component.color}30`,
                            `0 0 40px ${component.color}, 0 0 80px ${component.color}70, 0 0 120px ${component.color}40, 0 0 160px ${component.color}25`
                          ]
                        : 'none'
                    }}
                    transition={{
                      boxShadow: {
                        duration: 1.5,
                        repeat: (activeComponent === component.id || hoveredComponent === component.id) ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                  >
                  {/* Inner Performance Ring */}
                  <div 
                    className="absolute inset-2 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7))',
                      clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                      border: `2px solid ${component.color}80`,
                      pointerEvents: 'none'
                    }}
                  >
                    <div className="text-white filter drop-shadow-lg scale-75 md:scale-90 lg:scale-100" style={{ pointerEvents: 'none' }}>{component.icon}</div>
                  </div>

                  {/* Performance Meter Lines */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-white/30"
                      style={{
                        height: '12px',
                        left: '50%',
                        top: '8px',
                        transformOrigin: '0 60px',
                        transform: `rotate(${i * 60}deg)`,
                        pointerEvents: 'none'
                      }}
                      animate={{
                        backgroundColor: (activeComponent === component.id || hoveredComponent === component.id)
                          ? [component.color, '#ffffff', component.color]
                          : 'rgba(255,255,255,0.3)',
                        height: (activeComponent === component.id || hoveredComponent === component.id) ? ['12px', '18px', '12px'] : '12px'
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: (activeComponent === component.id || hoveredComponent === component.id) ? Infinity : 0,
                        delay: i * 0.1
                      }}
                    />
                  ))}

                  {/* Energy Pulse Ring */}
                  {(hoveredComponent === component.id || activeComponent === component.id) && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        border: `2px solid ${component.color}`,
                        clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                        pointerEvents: 'none'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  </motion.div>

                {/* Component Data Label - Floating Style - Desktop Only */}
                <motion.div 
                  className="hidden md:block absolute -bottom-12 md:-bottom-14 lg:-bottom-16 left-1/2 transform -translate-x-1/2 text-center min-w-max"
                  style={{
                    opacity: labelTransformData.opacity,
                    y: labelTransformData.y,
                    pointerEvents: 'none'
                  }}
                >
                  <div 
                    className="hidden md:inline-block px-3 py-1 mb-2 rounded-full text-sm font-bold uppercase tracking-wider border whitespace-nowrap"
                    style={{
                      backgroundColor: `${component.color}20`,
                      color: component.color,
                      borderColor: `${component.color}50`,
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    {component.category}
                  </div>
                  
                  <h3 
                    className="font-bold font-montserrat leading-tight transition-all duration-300 whitespace-nowrap max-w-24 md:max-w-28 lg:max-w-32 mx-auto text-[9px] md:text-[10px] lg:text-[11px]"
                    style={{ 
                      color: (activeComponent === component.id || hoveredComponent === component.id) ? component.color : '#ffffff',
                      textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                      transform: hoveredComponent === component.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {component.title}
                  </h3>

                  {/* Performance Indicator Bar */}
                  <motion.div
                    className="w-12 h-0.5 mx-auto mt-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${component.color}30` }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: component.color }}
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: hoveredComponent === component.id ? '100%' : '60%',
                        boxShadow: hoveredComponent === component.id 
                          ? `0 0 8px ${component.color}` 
                          : 'none'
                      }}
                      transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                    />
                  </motion.div>
                </motion.div>

                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

    </section>
  )
}

export default SpecialAbout1
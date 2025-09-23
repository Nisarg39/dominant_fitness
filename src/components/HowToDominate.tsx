'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const HowToDominate = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Scroll-based animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Header animation transforms
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 20, 0, 0])

  // Click handlers for stable interaction
  const handleCardClick = (index: number, event: React.MouseEvent) => {
    // Prevent event bubbling to container
    event.stopPropagation()
    // Toggle: if clicking the same card, close it; otherwise, open the new one
    setActiveCard(activeCard === index ? null : index)
  }

  // Handle clicking on empty space to close all cards
  const handleContainerClick = () => {
    setActiveCard(null)
  }
  
  const performanceComponents = [
    {
      id: 1,
      title: "Athletic Development",
      description: "Strength, power, conditioning, mobility - the physical foundation of sport.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 8.57l1.43 1.43 2.14-2.14 1.43 1.43L3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 2.14-2.14L20.57 14.86zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      ),
      color: "#ca2f2e",
      category: "Physical",
      backgroundImage: "https://i.pinimg.com/736x/06/2f/d2/062fd2f3bd31e3439876d45e8cd80af0.jpg"
    },
    {
      id: 2,
      title: "Technical Ability",
      description: "Refining sport-specific skills to compete at your best.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      color: "#ff5757",
      category: "Skills",
      backgroundImage: "https://e1.pxfuel.com/desktop-wallpaper/584/690/desktop-wallpaper-cristiano-ronaldo-ronaldo-dark.jpg"
    },
    {
      id: 3,
      title: "Performance Testing",
      description: "Test. Train. Retest. Track progress with purpose.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      color: "#ca2f2e",
      category: "Analysis",
      backgroundImage: "https://mcdn.wallpapersafari.com/medium/3/11/4SJOpX.jpg"
    },
    {
      id: 4,
      title: "Sports Science & Technology",
      description: "Data-Driven Coaching, force-velocity profiling, progress reports, feedback loops",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "#ff5757",
      category: "Technology",
      backgroundImage: "https://gearlimits.com/app/uploads/2024/04/gearlimits-sport-wetenschap-de-kracht-van-de-mind-main.jpg"
    },
    {
      id: 5,
      title: "Motor Learning",
      description: "Co-ordination, movement literacy, proprioception, decision-making",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      color: "#ca2f2e",
      category: "Cognitive",
      backgroundImage: "https://as2.ftcdn.net/v2/jpg/15/44/83/39/1000_F_1544833918_VBzV3dZxp7MFCajnzomA5GPiYd0wKj3U.jpg"
    },
    {
      id: 6,
      title: "Performance Nutrition",
      description: "Sport-specific fuelling, hydration, supplementation, recovery planning",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
      ),
      color: "#ff5757",
      category: "Nutrition",
      backgroundImage: "https://media.istockphoto.com/id/525363530/photo/football-player.jpg?s=612x612&w=0&k=20&c=9BP6Xun1t1t5rRuP7p5LGK27BnmK3GbhtYeIisiiHII="
    },
    {
      id: 7,
      title: "Recovery & Rehab",
      description: "Return-to-sport, load management, soft-tissue work",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "#ca2f2e",
      category: "Recovery",
      backgroundImage: "https://media.istockphoto.com/id/1192060388/photo/serious-attractive-muscular-caucasian-sportsman-in-hoodie-standing-in-underground-garage-with.jpg?s=612x612&w=0&k=20&c=QVUF_mwb9SbhU-cN1Pd8YHkro_Y_2penNDc5dZqR9pc="
    },
    {
      id: 8,
      title: "Youth Development",
      description: "Age-appropriate S&C for long-term success - not burnout",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      color: "#ff5757",
      category: "Development",
      backgroundImage: "https://www.shutterstock.com/shutterstock/photos/2409935833/display_1500/stock-photo-confidence-and-strength-female-athlete-in-fencing-gear-showcasing-her-impeccable-form-sword-2409935833.jpg"
    },
    {
      id: 9,
      title: "Mental Performance",
      description: "Confidence, mindset, psychology, visualization, competition readiness",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      color: "#ca2f2e",
      category: "Mental",
      backgroundImage: "https://c1.wallpaperflare.com/preview/616/537/299/athlete-bike-black-and-white-cycle.jpg"
    }
  ]

  return (
    <>
      <style jsx>{`
        @keyframes borderBlink {
          0%, 100% {
            border-color: #ca2f2e;
            box-shadow: 0 0 0 rgba(202, 47, 46, 0);
          }
          50% {
            border-color: #ff5757;
            box-shadow: 0 0 20px rgba(255, 87, 87, 0.6);
          }
        }
      `}</style>
      <section 
        ref={sectionRef}
        className="relative overflow-hidden py-8 md:py-12 lg:py-16 flex items-center justify-center"
        style={{
          minHeight: '100vh',
          scrollBehavior: 'smooth'
        }}
      >
      {/* Background Effects */}
      <div className="absolute inset-0 z-10">
        {/* Floating Particles */}
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
          { left: 55, top: 65, duration: 5.3, delay: 1.7, size: 'w-2 h-2' }
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
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 w-full max-w-7xl">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          style={{
            opacity: headerOpacity,
            y: headerY
          }}
        >
          <div className="flex justify-center mb-6">
                    <Image
                      src="/images/logo.png"
                      alt="Core Logo"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20"
                      style={{
                        opacity: 0.9,
                        filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(202,47,46,0.5)) drop-shadow(0 0 15px rgba(255,87,87,0.2))',
                        objectFit: 'contain'
                      }}
                      priority
                    />
                  </div>
                  
                    <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat uppercase mb-4"
                      style={{
                        color: '#ca2f2e',
                        textShadow: '0 2px 4px rgba(0,0,0,0.95)',
                        letterSpacing: '0.05em',
                        lineHeight: '1.1'
                      }}
                    >
            How To DOMINATE
                    </h2>
                    <p 
            className="text-lg md:text-xl text-white/80 font-medium"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        fontStyle: 'italic'
                      }}
                    >
                      Sport Performance
                    </p>
        </motion.div>

        {/* Desktop Cards Container */}
        <div 
          className="hidden md:block w-full mx-auto p-8"
          onClick={handleContainerClick}
        >
          <div className={`flex flex-row items-stretch overflow-hidden mx-auto h-[450px] ${
            activeCard === null 
              ? 'justify-center' 
              : 'min-w-[600px] max-w-[900px]'
          }`}>
          {performanceComponents.map((component, index) => (
            <div
              key={component.id}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flexGrow: activeCard === index ? 10000 : 0,
                width: activeCard === index ? 'auto' : '60px',
                minWidth: activeCard === index ? 'auto' : '60px',
                maxWidth: activeCard === index ? '600px' : '60px',
                margin: activeCard === index ? '0px' : '8px',
                borderRadius: activeCard === index ? '40px' : '25px',
                backgroundImage: `url(${component.backgroundImage})`,
                backgroundSize: activeCard === index ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                border: `2px solid ${component.color}`,
                transitionDuration: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionProperty: 'flex-grow, width, margin, border-radius, background-size, border',
                willChange: 'flex-grow, width, margin, border-radius, background-size, border'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation = 'borderBlink 0.8s ease-in-out infinite'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animation = 'none'
              }}
              onClick={(event) => handleCardClick(index, event)}
            >
              {/* Shadow Overlay */}
              <div 
                className="absolute left-0 right-0 h-[160px]"
                    style={{
                  bottom: activeCard === index ? '0px' : '-40px',
                  boxShadow: activeCard === index 
                    ? 'inset 0 -160px 160px -160px black, inset 0 -160px 160px -140px black'
                    : 'inset 0 -160px 0px -160px black, inset 0 -160px 0px -140px black',
                  transitionDuration: '0.5s',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionProperty: 'bottom, box-shadow',
                  willChange: 'bottom, box-shadow'
                }}
              />

              {/* Label Container */}
              <div 
                className="flex absolute right-0 items-start"
                    style={{
                  bottom: activeCard === index ? '20px' : '10px',
                  left: activeCard === index ? '20px' : '10px',
                  height: activeCard === index ? 'auto' : '40px',
                  maxHeight: activeCard === index ? '120px' : '40px',
                  transitionDuration: '0.5s',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionProperty: 'bottom, left, height, max-height',
                  willChange: 'bottom, left, height, max-height'
                }}
              >
                {/* Icon */}
                <div 
                  className="flex justify-center items-center min-w-10 max-w-10 h-10 rounded-full bg-black border-2 border-red-500"
                  style={{ color: 'white' }}
                >
                  {component.icon}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-start ml-2.5 text-white max-w-[250px] flex-1">
                  <div 
                    className="relative"
                    style={{
                      left: activeCard === index ? '0px' : '20px',
                      opacity: activeCard === index ? 1 : 0,
                      transitionDuration: '0.5s',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionProperty: 'left, opacity',
                      willChange: 'left, opacity'
                    }}
                  >
                    <div className="font-bold text-xs md:text-sm lg:text-sm leading-tight mb-1">
                      {component.title}
                  </div>
                    <div 
                      className="text-xs md:text-xs lg:text-xs leading-relaxed max-w-[200px] break-words"
                      style={{
                        transitionDelay: activeCard === index ? '100ms' : '0ms',
                        transitionDuration: '0.5s',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionProperty: 'opacity',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal'
                      }}
                    >
                      {component.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              {activeCard === index && (
                <div
                  className="absolute inset-0 rounded-[40px] pointer-events-none"
                      style={{
                    boxShadow: `0 0 30px ${component.color}80, inset 0 0 30px ${component.color}40`
                      }}
                    />
                  )}
            </div>
          ))}
          </div>
        </div>

        {/* Mobile Cards Container */}
        <div 
          className="block md:hidden mt-8 p-4"
          onClick={handleContainerClick}
        >
          <div className="space-y-4">
            {performanceComponents.map((component, index) => (
              <div
                key={component.id}
                className="relative overflow-hidden cursor-pointer rounded-2xl"
                  style={{
                  height: activeCard === index ? '192px' : '56px',
                  backgroundImage: `url(${component.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: `2px solid ${component.color}`,
                  transitionDuration: '0.5s',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionProperty: 'height, border',
                  willChange: 'height, border'
                }}
                onClick={(event) => handleCardClick(index, event)}
              >
                {/* Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="relative z-10 flex items-center h-full p-4">
                  <div 
                    className="flex justify-center items-center w-10 h-10 rounded-full bg-black border-2 border-red-500 mr-3"
                    style={{ color: 'white' }}
                  >
                    {component.icon}
                  </div>
                  
                  <div className="text-white flex-1">
                    <div className="font-bold text-lg">{component.title}</div>
                    {activeCard === index && (
                      <div className="mt-2 text-sm opacity-90">
                        {component.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default HowToDominate
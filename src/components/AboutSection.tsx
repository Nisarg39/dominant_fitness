'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import PixelCanvas from './PixelCanvas'

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Set mounted on client side first
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use intersection observer for reveal animations
  const [missionInView, setMissionInView] = useState(false)
  const [valuesInView, setValuesInView] = useState(false)
  const [founderInView, setFounderInView] = useState(false)

  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const founderRef = useRef<HTMLDivElement>(null)
  const excellenceCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) return

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === missionRef.current) setMissionInView(true)
          if (entry.target === valuesRef.current) setValuesInView(true)
          if (entry.target === founderRef.current) setFounderInView(true)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (missionRef.current) observer.observe(missionRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)
    if (founderRef.current) observer.observe(founderRef.current)

    return () => observer.disconnect()
  }, [mounted])

  // Animation variants
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dark Theme Background with Gradients */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main gradient overlays matching HeroSection theme */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            background: `
              linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.9) 100%), 
              linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%), 
              linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9) 100%), 
              radial-gradient(ellipse 60% 80% at 5% 50%, rgba(202,47,46,0.15) 0%, rgba(202,47,46,0.08) 25%, rgba(202,47,46,0.04) 50%, transparent 70%),
              linear-gradient(225deg, rgba(202,47,46,0.06) 0%, transparent 40%)
            `,
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

        {/* Enhanced floating particles with stagger */}
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 0.1, y: 0 }}
          transition={{ duration: 2, delay: 0.6, ease: "backOut" }}
          style={{ 
            top: '15%', 
            left: '20%', 
            filter: 'blur(2px)', 
            animation: 'float 10s ease-in-out infinite', 
            background: 'rgba(202,47,46,0.6)' 
          }} 
        />
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 0.08, y: 0 }}
          transition={{ duration: 2.5, delay: 0.9, ease: "backOut" }}
          style={{ 
            top: '40%', 
            left: '70%', 
            filter: 'blur(3px)', 
            animation: 'float 12s ease-in-out infinite 2s', 
            background: 'rgba(255,255,255,0.4)' 
          }} 
        />
        <motion.div 
          className="floating-particle absolute"
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 0.12, y: 0 }}
          transition={{ duration: 1.8, delay: 1.2, ease: "backOut" }}
          style={{ 
            top: '70%', 
            left: '30%', 
            filter: 'blur(2px)', 
            animation: 'float 8s ease-in-out infinite 1s', 
            background: 'rgba(202,47,46,0.5)' 
          }} 
        />

      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20">

        {/* Mission Section */}
        <motion.div 
          ref={missionRef}
          className="mb-24"
          initial={revealVariants.initial}
          animate={missionInView ? revealVariants.animate : revealVariants.initial}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: '#ca2f2e',
                textShadow: '0 2px 4px rgba(0,0,0,0.7)'
              }}
              variants={{
                initial: { y: 80, opacity: 0, rotateX: 20 },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
            >
              MISSION
            </motion.h3>
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-lg p-8"
              variants={{
                initial: { scale: 0.9, opacity: 0, y: 40 },
                animate: { 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
            >
              <motion.p 
                className="text-lg text-white/90 leading-relaxed text-center"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.4,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                To empower athletes at every level to achieve their maximum potential through innovative training programs, 
                data-driven performance analysis, and unwavering commitment to excellence. We believe that elite performance 
                is not reserved for the few, but accessible to all who are willing to embrace the process of continuous improvement.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          ref={valuesRef}
          className="mb-24"
          initial={revealVariants.initial}
          animate={valuesInView ? revealVariants.animate : revealVariants.initial}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: '#ca2f2e',
              textShadow: '0 2px 4px rgba(0,0,0,0.7)'
            }}
            variants={{
              initial: { y: 60, opacity: 0 },
              animate: { 
                y: 0, 
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
          >
            VALUES
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {/* Excellence */}
            <motion.div 
              ref={excellenceCardRef}
              className="relative bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center overflow-hidden isolation-isolate border border-red-600/20"
              style={{ 
                '--active-color': '#fecdd3',
                position: 'relative'
              } as React.CSSProperties}
              variants={{
                initial: { 
                  y: 80, 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -20 
                },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                borderColor: "transparent",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <PixelCanvas 
                colors="#ff6b9d, #ff8fab, #c44569, #f8b500, #ff3838"
                gap="3"
                speed="120"
                noFocus={true}
                parentRef={excellenceCardRef}
                className="absolute inset-0 w-full h-full rounded-lg"
              />
              <div 
                className="relative z-10 backdrop-blur-[2px]"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 80%, transparent 100%)'
                }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative z-20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(202,47,46,0.8), rgba(255,87,86,0.7))',
                    border: '2px solid rgba(202,47,46,0.6)',
                    boxShadow: '0 0 0 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)'
                  }}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                >
                  <span 
                    className="text-2xl font-bold text-white relative z-30"
                    style={{
                      textShadow: '0 2px 4px rgba(202,47,46,0.8), 0 0 8px rgba(202,47,46,0.4)',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    E
                  </span>
                </motion.div>
                <div 
                  className="relative"
                  style={{
                    background: 'radial-gradient(ellipse 120% 80% at center, rgba(0,0,0,0.4) 0%, transparent 70%)',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                >
                  <motion.h4 
                    className="text-xl font-bold mb-3 text-white"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      textShadow: '0 0 10px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    EXCELLENCE
                  </motion.h4>
                </div>
                <motion.p 
                  className="text-white/90 text-sm leading-relaxed"
                  style={{
                    textShadow: '0 0 8px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  We pursue perfection in every aspect of training, from technique refinement to mental preparation, 
                  ensuring our athletes reach their peak potential.
                </motion.p>
              </div>
            </motion.div>

            {/* Innovation */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-red-600/20 text-center"
              variants={{
                initial: { 
                  y: 80, 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -20 
                },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(202,47,46,0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(202,47,46,0.3), rgba(255,87,86,0.2))',
                  border: '2px solid rgba(202,47,46,0.4)'
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
              >
                <span className="text-2xl font-bold text-red-400">I</span>
              </motion.div>
              <motion.h4 
                className="text-xl font-bold mb-3 text-white"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                INNOVATION
              </motion.h4>
              <motion.p 
                className="text-white/80 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                We embrace cutting-edge technology and methodologies, constantly evolving our approach to stay 
                ahead of the curve in performance optimization.
              </motion.p>
            </motion.div>

            {/* Dedication */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-red-600/20 text-center"
              variants={{
                initial: { 
                  y: 80, 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -20 
                },
                animate: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(202,47,46,0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(202,47,46,0.3), rgba(255,87,86,0.2))',
                  border: '2px solid rgba(202,47,46,0.4)'
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
              >
                <span className="text-2xl font-bold text-red-400">D</span>
              </motion.div>
              <motion.h4 
                className="text-xl font-bold mb-3 text-white"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                DEDICATION
              </motion.h4>
              <motion.p 
                className="text-white/80 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Our unwavering commitment to each athlete&apos;s journey drives us to provide personalized attention 
                and support every step of the way.
              </motion.p>
            </motion.div>
          </motion.div>
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-600/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Founder Image Placeholder */}
                <div className="text-center">
                  <div 
                    className="w-64 h-64 mx-auto rounded-full mb-6 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(202,47,46,0.2), rgba(255,87,86,0.1))',
                      border: '3px solid rgba(202,47,46,0.3)'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl text-red-400 mb-2">👤</div>
                      <p className="text-red-400/70 text-sm">Founder Photo</p>
                    </div>
                  </div>
                  
                  {/* Logo/Certifications Placeholder */}
                  <div className="flex justify-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(202,47,46,0.1)',
                        border: '1px solid rgba(202,47,46,0.3)'
                      }}
                    >
                      <span className="text-red-400 text-xs">LOGO</span>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(202,47,46,0.1)',
                        border: '1px solid rgba(202,47,46,0.3)'
                      }}
                    >
                      <span className="text-red-400 text-xs">CERT</span>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(202,47,46,0.1)',
                        border: '1px solid rgba(202,47,46,0.3)'
                      }}
                    >
                      <span className="text-red-400 text-xs">AWARD</span>
                    </div>
                  </div>
                </div>

                {/* Founder Info */}
                <div>
                  <h4 
                    className="text-2xl font-bold mb-4 text-white"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                    }}
                  >
                    [FOUNDER NAME]
                  </h4>
                  <p 
                    className="text-red-400 mb-6 font-semibold"
                    style={{
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Founder & Lead Performance Coach
                  </p>
                  <p 
                    className="text-white/90 leading-relaxed mb-6"
                    style={{
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                    }}
                  >
                    With over [X] years of experience in elite sports performance, [Founder Name] has dedicated 
                    their career to unlocking human potential. Having worked with [professional teams/athletes], 
                    they bring a unique blend of scientific knowledge and practical expertise to every training program.
                  </p>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm">• [Certification/Degree 1]</p>
                    <p className="text-white/80 text-sm">• [Certification/Degree 2]</p>
                    <p className="text-white/80 text-sm">• [Notable Achievement/Experience]</p>
                    <p className="text-white/80 text-sm">• [Notable Achievement/Experience]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
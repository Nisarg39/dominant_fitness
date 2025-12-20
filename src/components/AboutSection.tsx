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
      polygon?: {
        nb_sides: number;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim?: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim?: {
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
      bubble?: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse?: {
        distance: number;
        duration: number;
      };
      push?: {
        particles_nb: number;
      };
      remove?: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
}

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Card hover state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Section reveal animation state
  const [sectionInView, setSectionInView] = useState(false)
  const [visionInView, setVisionInView] = useState(false)
  const [missionInView, setMissionInView] = useState(false)
  const [valuesInView, setValuesInView] = useState(false)
  const [founderInView, setFounderInView] = useState(false)

  const visionRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const founderRef = useRef<HTMLDivElement>(null)

  // Refs for individual cards to use with PixelCanvas
  const visionCardRef = useRef<HTMLDivElement>(null)
  const missionCardRef = useRef<HTMLDivElement>(null)
  const valuesCardRef = useRef<HTMLDivElement>(null)
  const founderCardRef = useRef<HTMLDivElement>(null)

  // Set mounted on client side first
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize particles.js effect
  useEffect(() => {
    if (!mounted) return

    const loadParticlesScript = () => {
      return new Promise((resolve, reject) => {
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
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.particlesJS) {
            window.particlesJS('particles-js', {
              "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": ["#fff200", "#fff200", "#fff200", "#ffffff"] },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#fff" } },
                "opacity": { "value": 0.6, "random": false },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 120, "color": "#ffffff", "opacity": 0.4, "width": 1 },
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
              },
              "retina_detect": true
            })
          }
        }, 100)
      } catch (error) {
        console.error('Error loading particles.js:', error)
      }
    }

    initParticles()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const observerOptions = { threshold: 0.1, rootMargin: '-50px' }
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) setSectionInView(true)
          if (entry.target === visionRef.current) setVisionInView(true)
          if (entry.target === missionRef.current) setMissionInView(true)
          if (entry.target === valuesRef.current) setValuesInView(true)
          if (entry.target === founderRef.current) setFounderInView(true)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    if (sectionRef.current) observer.observe(sectionRef.current)
    if (visionRef.current) observer.observe(visionRef.current)
    if (missionRef.current) observer.observe(missionRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)
    if (founderRef.current) observer.observe(founderRef.current)

    return () => observer.disconnect()
  }, [mounted])

  const sectionRevealVariants = {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as any, staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const revealVariants = {
    initial: { opacity: 0, y: 60, scale: 0.9, rotateX: 10, filter: "blur(10px)" },
    animate: {
      opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }
    }
  }

  if (!mounted) return null

  return (
    <motion.section
      ref={sectionRef}
      id="about-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#000000' }}
      variants={sectionRevealVariants}
      initial="initial"
      animate={sectionInView ? "animate" : "initial"}
    >
      <div id="particles-js" className="absolute inset-0 z-5" style={{ background: '#000000' }} />

      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto space-y-12 mb-20">
          {/* Vision Card */}
          <motion.div ref={visionRef} initial={revealVariants.initial} animate={visionInView ? revealVariants.animate : revealVariants.initial}>
            <motion.div
              ref={visionCardRef}
              className="relative overflow-hidden transition-all duration-500 ease-out rounded-2xl group"
              onHoverStart={() => setHoveredCard('vision')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === 'vision' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                boxShadow: hoveredCard === 'vision' ? '0 12px 48px rgba(255, 242, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.5)',
                border: hoveredCard === 'vision' ? '1px solid rgba(255, 242, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ y: -8 }}
            >
              <PixelCanvas colors="#fff200, #fff200, #fff200" gap="8" speed="100" parentRef={visionCardRef} className="rounded-2xl" />
              <div className="relative z-20 p-8 md:p-12 text-center">
                <h3 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>VISION</h3>
                <p className="text-white/90 leading-relaxed text-lg md:text-xl max-w-4xl mx-auto">
                  To redefine the future of Indian sport by building a world-class athlete development ecosystem where every athlete, from grassroots to elite, has access to science-led training, holistic support, and a clear pathway to thrive at the highest levels.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div ref={missionRef} initial={revealVariants.initial} animate={missionInView ? revealVariants.animate : revealVariants.initial}>
              <motion.div
                ref={missionCardRef}
                className="relative h-full overflow-hidden transition-all duration-500 ease-out rounded-2xl group"
                onHoverStart={() => setHoveredCard('mission')}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === 'mission' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: hoveredCard === 'mission' ? '0 12px 48px rgba(255, 242, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.5)',
                  border: hoveredCard === 'mission' ? '1px solid rgba(255, 242, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ y: -8 }}
              >
                <PixelCanvas colors="#fff200, #fff200, #fff200" gap="8" speed="80" parentRef={missionCardRef} className="rounded-2xl" />
                <div className="relative z-20 p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>MISSION</h3>
                  <p className="text-white/90 leading-relaxed text-lg">
                    We exist to make world-class sport science and coaching accessible in India, empowering athletes at every level to reach their true potential.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Values Card */}
            <motion.div ref={valuesRef} initial={revealVariants.initial} animate={valuesInView ? revealVariants.animate : revealVariants.initial}>
              <motion.div
                ref={valuesCardRef}
                className="relative h-full overflow-hidden transition-all duration-500 ease-out rounded-2xl group"
                onHoverStart={() => setHoveredCard('values')}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === 'values' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: hoveredCard === 'values' ? '0 12px 48px rgba(255, 242, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.5)',
                  border: hoveredCard === 'values' ? '1px solid rgba(255, 242, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ y: -8 }}
              >
                <PixelCanvas colors="#fff200, #fff200, #fff200" gap="8" speed="60" parentRef={valuesCardRef} className="rounded-2xl" />
                <div className="relative z-20 p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>CORE VALUES</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'SCIENCE', desc: 'Evidence-based, practical methods that deliver results.', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
                      { title: 'ACCESS', desc: 'High-quality support for every athlete, from grassroots to elite.', img: '/images/svg/004-percentage.svg' },
                      { title: 'GROWTH', desc: 'Relentless pursuit of progress in athletes, coaches, and Indian sport.', img: '/images/svg/005-line-chart.svg' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-[#fff200] flex items-center justify-center flex-shrink-0 shadow-lg">
                          {item.icon ? (
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                          ) : (
                            <img src={item.img} alt={item.title} className="w-6 h-6" style={{ filter: 'brightness(0)' }} />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Founder Section */}
        <motion.div ref={founderRef} initial={revealVariants.initial} animate={founderInView ? revealVariants.animate : revealVariants.initial} className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>MEET THE FOUNDER</h3>
          <motion.div
            ref={founderCardRef}
            className="relative overflow-hidden transition-all duration-500 ease-out rounded-2xl"
            onHoverStart={() => setHoveredCard('founder')}
            onHoverEnd={() => setHoveredCard(null)}
            style={{
              background: hoveredCard === 'founder' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: hoveredCard === 'founder' ? '1px solid rgba(255, 242, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
            }}
            whileHover={{ y: -8 }}
          >
            <PixelCanvas colors="#fff200, #fff200, #fff200" gap="8" speed="60" parentRef={founderCardRef} className="rounded-2xl" />
            <div className="relative z-20 p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Identity & Quals */}
                <div className="text-center lg:text-left lg:col-span-4">
                  <div className="w-full aspect-square max-w-[320px] mx-auto lg:mx-0 mb-8 overflow-hidden border-2 border-[#fff200]/30 rounded-xl relative">
                    <img src="/Om.png" alt="Founder" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Om Chavan
                    </h4>
                  </div>

                  <p className="text-[#fff200] font-bold text-lg mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Founder & Lead Performance Coach</p>

                  <div className="flex flex-col gap-3">
                    <span className="px-4 py-2 text-xs rounded-full bg-white/5 text-white/90 border border-white/10 w-fit mx-auto lg:mx-0">UKSCA Accredited Coach</span>
                    <span className="px-4 py-2 text-xs rounded-full bg-white/5 text-white/90 border border-white/10 w-fit mx-auto lg:mx-0">M.Sc. Strength & Conditioning (Loughborough, UK)</span>
                    <span className="px-4 py-2 text-xs rounded-full bg-white/5 text-white/90 border border-white/10 w-fit mx-auto lg:mx-0">B.Sc. Exercise & Sport Science (Manipal, India)</span>
                  </div>
                </div>

                {/* Right Column: Detailed Experience */}
                <div className="lg:col-span-8 space-y-10">
                  {/* Experience */}
                  <div>
                    <h5 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>Professional Experience</h5>
                    <ul className="space-y-4">
                      {[
                        "Applied Sport Science and Strength & Conditioning support for athletes across Rugby, Football, Hockey, Tennis, and Badminton in the UK.",
                        "Strength & Conditioning Coach at the Derbyshire Institute of Sport, UK, supporting elite youth athletes.",
                        "Worked with Loughborough Women's Rugby 2s and the England Colleges U-17 Hockey Athletes.",
                        "Currently developing grassroots athlete programs in India, bringing global sport science standards to the local landscape."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start text-white/90 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-[#fff200] mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Athletic Background */}
                  <div>
                    <h5 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff200' }}>Athletic Background & Achievements</h5>
                    <ul className="space-y-4">
                      {[
                        "District- and University-level athlete in football and track & field.",
                        "Winner, Reliance Foundation Youth Sports football tournament, Pune 2017 (held at DSK Shivajians).",
                        "Competed in 100m, 200m, 4x100m relays, and long jump at the intercollegiate and university level.",
                        "10+ years immersed in competitive sport, now channelling that experience into athlete development."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start text-white/90 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-[#fff200] mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
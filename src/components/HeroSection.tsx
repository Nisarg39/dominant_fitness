'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [subtitleText, setSubtitleText] = useState('')
  const [taglineVisible, setTaglineVisible] = useState(false)
  const [maskWidth, setMaskWidth] = useState('100%')
  const [maskLeft, setMaskLeft] = useState('0px')
  const [maskOpacity, setMaskOpacity] = useState(1)
  const [underlineWidth, setUnderlineWidth] = useState('0%')
  const [revealedLetters, setRevealedLetters] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fullSubtitle = 'Sport Performance'
  const titleLetters = 'DOMINATE'.split('')
  const subtitleLetters = fullSubtitle.split('')

  const lightningConfig = {
    color: '#ca2f2e',
    shadowColor: '#ff5757',
    thickness: 3,
    branchChance: 0.25,
    branchFactor: 0.6,
    straightness: 0.5,
    maxSegments: 15,
    maxBranches: 2,
    fadeDuration: 800,
  }

  const createCanvasLightning = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, displace: number, branchLevel = 0) => {
    if (displace < lightningConfig.thickness || branchLevel > lightningConfig.maxBranches) {
      ctx.lineWidth = displace * 0.5
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      return
    }

    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    const offsetX = (Math.random() - 0.5) * displace * 2
    const offsetY = (Math.random() - 0.5) * displace * 2

    const adjustedMidX = midX + offsetX * (1 - lightningConfig.straightness)
    const adjustedMidY = midY + offsetY * (1 - lightningConfig.straightness)

    createCanvasLightning(ctx, startX, startY, adjustedMidX, adjustedMidY, displace / 2, branchLevel)
    createCanvasLightning(ctx, adjustedMidX, adjustedMidY, endX, endY, displace / 2, branchLevel)

    if (branchLevel < lightningConfig.maxBranches && Math.random() < lightningConfig.branchChance) {
      const branchEndX = adjustedMidX + (Math.random() - 0.5) * displace * 2
      const branchEndY = adjustedMidY + (Math.random() - 0.5) * displace * 2
      createCanvasLightning(ctx, adjustedMidX, adjustedMidY, branchEndX, branchEndY, displace * lightningConfig.branchFactor, branchLevel + 1)
    }
  }

  const lightningStrike = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * 0.6

    const startPoints = [
      { x: x - 200 + Math.random() * 400, y: 0 },
      { x: 0, y: y - 100 + Math.random() * 200 },
      { x: canvas.width, y: y - 100 + Math.random() * 200 }
    ]
    const startPoint = startPoints[Math.floor(Math.random() * startPoints.length)]

    ctx.strokeStyle = lightningConfig.color
    ctx.shadowColor = lightningConfig.shadowColor
    ctx.shadowBlur = 40
    ctx.lineCap = 'round'

    const boltsCount = 3 + Math.floor(Math.random() * 2)
    for (let i = 0; i < boltsCount; i++) {
      setTimeout(() => {
        ctx.globalAlpha = 1
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Background flash effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(202, 47, 46, 0.08)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const endX = x + (Math.random() - 0.5) * 150
        const endY = Math.min(y + 200 + Math.random() * 200, canvas.height)
        createCanvasLightning(ctx, startPoint.x, startPoint.y, endX, endY, 40)

        let opacity = 1
        const fadeInterval = setInterval(() => {
          opacity -= 0.08
          if (opacity <= 0) {
            clearInterval(fadeInterval)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
          } else {
            ctx.globalAlpha = opacity
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = `rgba(202, 47, 46, ${opacity * 0.08})`
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }
        }, lightningConfig.fadeDuration / 12)
      }, i * 80)
    }
  }

  const generateThunder = () => {
    if (!svgRef.current) return
    
    const svg = svgRef.current
    const ancho = window.innerWidth
    const altura = window.innerHeight
    const xInicio = Math.random() * ancho
    const yInicio = Math.random() * altura * 0.6 // Start from random position in upper 60% of screen
    let yActual = yInicio
    const maxLength = altura * 0.5 // Lightning will be half the viewport height
    const targetY = yInicio + maxLength
    let zigzag = `M${xInicio},${yActual}`
    let grosor = Math.random() * 2 + 1
    let color = Math.random() > 0.5 ? 'rgba(202,47,46,0.8)' : 'rgba(255,87,86,0.7)'
    
    // Continue until we reach half viewport height
    while (yActual < targetY && yActual < altura) {
      let xOffset = (Math.random() - 0.5) * 80
      let yOffset = Math.random() * 60 + 30
      yActual += yOffset
      if (yActual > targetY) yActual = targetY // Ensure we don't exceed half height
      zigzag += ` L${xInicio + xOffset},${yActual}`
      
      if (Math.random() > 0.8) {
        let branchX = xInicio + xOffset + (Math.random() - 0.5) * 30
        let branchY = yActual + Math.random() * 20
        zigzag += ` M${xInicio + xOffset},${yActual} L${branchX},${branchY}`
      }
    }
    
    const linea = document.createElementNS("http://www.w3.org/2000/svg", "path")
    linea.setAttribute("d", zigzag)
    linea.setAttribute("stroke", color)
    linea.setAttribute("stroke-width", grosor.toString())
    linea.setAttribute("stroke-linecap", "round")
    linea.setAttribute("opacity", "0")
    linea.style.animation = 'thunderAppear 0.1s ease-out, thunderFade 0.3s ease-in 0.1s'
    svg.appendChild(linea)
    
    setTimeout(() => {
      if (linea.parentNode) {
        linea.remove()
      }
    }, 400)
  }

  useEffect(() => {
    // Optimized animation sequence
    const animationTimer = setTimeout(() => {
      // Start mask animation - slides from left to right and shrinks
      setMaskLeft('100%')
      setMaskWidth('0px')
      
      // Start subtitle letter-by-letter reveal cohesively with mask animation
      let letterIndex = 0
      const letterRevealSpeed = 35 // Speed per letter in ms - smooth reveal
      
      function revealNextLetter() {
        if (letterIndex < subtitleLetters.length) {
          setRevealedLetters(letterIndex + 1)
          letterIndex++
          setTimeout(revealNextLetter, letterRevealSpeed)
        }
      }
      
      // Start revealing letters shortly after mask starts moving
      setTimeout(() => {
        revealNextLetter()
      }, 100)
      
      // Start underline animation synchronized - moves with the letters
      setTimeout(() => {
        setUnderlineWidth('100%')
      }, 200)
      
      // Show tagline much earlier for energetic feel
      setTimeout(() => {
        setTaglineVisible(true)
      }, 250)
      
      // Fade out mask quickly
      setTimeout(() => {
        setMaskOpacity(0)
      }, 400)
      
    }, 100) // Slight delay for smoother initial load

    // Initialize canvas size
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)

    // Thunder effect interval - less frequent for subtlety
    const thunderInterval = setInterval(() => {
      if (Math.random() > 0.5) generateThunder()
      if (Math.random() > 0.6) lightningStrike()
    }, Math.random() * 12000 + 8000) // Random interval 8-20 seconds

    return () => {
      clearInterval(thunderInterval)
      window.removeEventListener('resize', handleResize)
      clearTimeout(animationTimer)
    }
  }, [])

  return (
    <section 
      id="home-section" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Marquee Background Text */}
      <div className="marquee-bg">
        <div className="marquee">
          <p>DOMINATE • PERFORMANCE • TRAIN • WIN •</p>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(1.1) contrast(1.3) saturate(0.9)',
            opacity: 1
          }}
        >
          <source src="/images/athleteVideo.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced Gradient Overlays for Professional Depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.08) 65%, transparent 85%, transparent 100%), 
              linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.08) 70%, transparent 100%), 
              linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.08) 70%, transparent 100%), 
              radial-gradient(ellipse 60% 80% at 95% 50%, rgba(202,47,46,0.25) 0%, rgba(202,47,46,0.12) 25%, rgba(202,47,46,0.06) 50%, transparent 70%),
              linear-gradient(135deg, rgba(202,47,46,0.08) 0%, transparent 40%)
            `,
            zIndex: 2
          }}
        />
        
        {/* Additional Cinematic Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, transparent 60%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.25) 100%)',
            zIndex: 3
          }}
        />

        {/* Lightning Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 4 }}
        />

        {/* Thunder SVG Container */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        />

        {/* Smooth transition gradient to next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,1) 100%)',
            zIndex: 6
          }}
        />

      </div>

      {/* Background Animation Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Additional Interactive Background Lines */}
        <div className="bg-interactive-element" style={{ top: '25%', left: '10%', width: '120px', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(202,47,46,0.4), transparent)', opacity: 0.2 }} />
        <div className="bg-interactive-element" style={{ top: '45%', right: '15%', width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', opacity: 0.15 }} />
        <div className="bg-interactive-element" style={{ bottom: '30%', left: '20%', width: '100px', height: '2px', background: 'linear-gradient(90deg, rgba(202,47,46,0.3), transparent)', opacity: 0.25 }} />

        {/* Dynamic Data Flow Lines */}
        <div style={{ position: 'absolute', top: '20%', left: '0', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(202,47,46,0.6), transparent)', animation: 'dataFlow 4s ease-in-out infinite', opacity: 0.7 }} />
        <div style={{ position: 'absolute', top: '60%', left: '0', width: '150px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'dataFlow 6s ease-in-out infinite 2s', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: '80%', left: '0', width: '180px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(202,47,46,0.5), transparent)', animation: 'dataFlow 5s ease-in-out infinite 3s', opacity: 0.6 }} />

        {/* Refined Floating Particles - fewer, more subtle */}
        <div className="floating-particle" style={{ top: '15%', left: '20%', opacity: 0.1, filter: 'blur(2px)', animation: 'float 12s ease-in-out infinite', background: 'rgba(202,47,46,0.4)' }} />
        <div className="floating-particle" style={{ top: '40%', left: '70%', opacity: 0.08, filter: 'blur(3px)', animation: 'float 15s ease-in-out infinite 2s', background: 'rgba(255,255,255,0.3)' }} />
        <div className="floating-particle" style={{ top: '65%', left: '35%', opacity: 0.1, filter: 'blur(2px)', animation: 'float 18s ease-in-out infinite 4s', background: 'rgba(202,47,46,0.3)' }} />
        <div className="floating-particle" style={{ top: '80%', left: '85%', opacity: 0.08, filter: 'blur(3px)', animation: 'float 14s ease-in-out infinite 1s', background: 'rgba(255,255,255,0.2)' }} />

        {/* Subtle Geometric Elements */}
        <div className="geometric-accent" style={{ top: '25%', right: '15%', width: '40px', height: '40px', opacity: 0.06, filter: 'blur(1px)', animation: 'rotateGlow 20s linear infinite', border: '1px solid rgba(202,47,46,0.2)' }} />
        <div className="geometric-accent" style={{ top: '60%', right: '30%', width: '30px', height: '30px', transform: 'rotate(45deg)', opacity: 0.08, filter: 'blur(1px)', animation: 'rotateGlow 25s linear infinite 3s', border: '1px solid rgba(202,47,46,0.3)' }} />


        {/* Interactive Corner Elements - moved further to corners */}
        <div style={{ position: 'absolute', top: '1%', left: '1%', width: '30px', height: '30px', borderLeft: '3px solid rgba(202,47,46,0.6)', borderTop: '3px solid rgba(202,47,46,0.6)', animation: 'fadeInUp 1s ease-out, pulse 4s ease-in-out infinite 1s', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: '1%', right: '1%', width: '30px', height: '30px', borderRight: '3px solid rgba(202,47,46,0.6)', borderTop: '3px solid rgba(202,47,46,0.6)', animation: 'fadeInUp 1s ease-out 0.5s, pulse 4s ease-in-out infinite 1.5s', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '1%', left: '1%', width: '30px', height: '30px', borderLeft: '3px solid rgba(202,47,46,0.6)', borderBottom: '3px solid rgba(202,47,46,0.6)', animation: 'fadeInUp 1s ease-out 1s, pulse 4s ease-in-out infinite 2s', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '1%', right: '1%', width: '30px', height: '30px', borderRight: '3px solid rgba(202,47,46,0.6)', borderBottom: '3px solid rgba(202,47,46,0.6)', animation: 'fadeInUp 1s ease-out 1.5s, pulse 4s ease-in-out infinite 2.5s', opacity: 0.4 }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <div className="flex flex-col pt-20 lg:pt-36 pb-20">
            {/* Hero Title */}
            <motion.div 
              className="mb-4 hero-headers-section"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1 
                id="hero-title"
                className="heading font-montserrat uppercase relative overflow-visible text-left"
                style={{
                  color: '#ca2f2e',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.95), 0 8px 16px rgba(0,0,0,0.8), 0 16px 32px rgba(0,0,0,0.6), 0 0 40px rgba(202,47,46,0.15)',
                  marginBottom: '0.2em',
                  position: 'relative',
                  overflow: 'visible',
                  textAlign: 'left',
                  lineHeight: 0.85,
                  textTransform: 'uppercase'
                }}
              >
                <span 
                  id="hero-title-text"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    overflow: 'visible',
                    display: 'inline-block'
                  }}
                >
                  {titleLetters.map((letter, index) => (
                    <span
                      key={index}
                      className="dom-letter inline-block"
                      style={{
                        animation: `letterGlow 3s ease-in-out infinite`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span 
                  id="hero-title-mask"
                  style={{
                    position: 'absolute',
                    left: maskLeft,
                    top: 0,
                    width: maskWidth,
                    height: '100%',
                    background: '#ca2f2e',
                    zIndex: 3,
                    opacity: maskOpacity,
                    transition: 'left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.1s ease 0.4s',
                    overflow: 'visible'
                  }}
                />
              </h1>

              <motion.h2 
                className="subheading fancy-underline font-montserrat uppercase relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.5)',
                  marginTop: '-0.1em',
                  marginBottom: 0,
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)',
                  lineHeight: 1.3,
                  position: 'relative',
                  textAlign: 'left',
                  color: 'rgba(255,255,255,0.98)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: 'uppercase'
                }}
              >
                <span 
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-block'
                  }}
                >
                  {subtitleLetters.map((letter, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        opacity: index < revealedLetters ? 1 : 0,
                        transform: index < revealedLetters ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: `${index * 0.01}s`
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
                <div
                  id="subtitle-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: 0,
                    width: underlineWidth,
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(202, 47, 46) 0%, rgba(255, 87, 86, 0.9) 30%, rgba(202, 47, 46, 0.8) 60%, rgba(202, 47, 46, 0.4) 85%, transparent 100%)',
                    transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    borderRadius: '2px',
                    boxShadow: 'rgba(202, 47, 46, 0.6) 0px 3px 12px, rgba(202, 47, 46, 0.3) 0px 6px 24px, inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-16px',
                    left: 0,
                    width: underlineWidth,
                    height: '6px',
                    background: 'linear-gradient(90deg, rgba(202, 47, 46, 0.2) 0%, rgba(202, 47, 46, 0.1) 50%, transparent 100%)',
                    filter: 'blur(2px)',
                    borderRadius: '3px'
                  }}
                />
              </motion.h2>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="mt-8 flex-grow flex items-end pb-8"
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={{ 
                opacity: taglineVisible ? 1 : 0,
                y: taglineVisible ? 0 : 30,
                rotate: -1
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p 
                className="text-white/95 text-xs sm:text-lg lg:text-xl font-medium leading-relaxed pl-6 border-l-4 border-red-600/70 relative"
                style={{
                  fontStyle: 'italic',
                  transform: 'skewX(-8deg)',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)',
                  filter: 'drop-shadow(0 0 4px rgba(202,47,46,0.1))'
                }}
              >
                Elite performance isn&apos;t a privilege — it&apos;s a process.
                <span 
                  className="absolute left-0 top-0 w-1 h-full shadow-lg shadow-red-600/50" 
                  style={{
                    background: 'linear-gradient(180deg, #ca2f2e 0%, rgba(255, 87, 86, 0.8) 30%, rgba(202, 47, 46, 0.6) 70%, rgba(202, 47, 46, 0.3) 100%)',
                    boxShadow: '0 0 8px rgba(202,47,46,0.4), inset 1px 0 0 rgba(255,255,255,0.1)'
                  }}
                />
                <span 
                  className="absolute left-1 top-0 w-0.5 h-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(202, 47, 46, 0.3) 0%, transparent 100%)',
                    filter: 'blur(1px)'
                  }}
                />
              </p>
            </motion.div>
          </div>

          {/* Right Side - Video Reveal Area */}
          <div className="hidden lg:block relative">
            {/* Video is handled by the background video above */}
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
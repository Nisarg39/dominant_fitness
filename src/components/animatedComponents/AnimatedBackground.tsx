'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'grid' | 'waves' | 'geometric' | 'dots' | 'lines' | 'mesh'
  color?: string
  intensity?: 'low' | 'medium' | 'high'
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}

const AnimatedBackground = ({ 
  variant = 'particles', 
  color = '#ca2f2e', 
  intensity = 'medium',
  speed = 'medium',
  className = ''
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const getSpeedMultiplier = () => {
    switch (speed) {
      case 'slow': return 0.5
      case 'fast': return 2
      default: return 1
    }
  }

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low': return 0.5
      case 'high': return 2
      default: return 1
    }
  }

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5 * getSpeedMultiplier(),
      vy: (Math.random() - 0.5) * 0.5 * getSpeedMultiplier(),
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100
    })

    // Initialize particles
    const particleCount = Math.floor(50 * getIntensityMultiplier())
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Fade out over time
        const lifeRatio = particle.life / particle.maxLife
        particle.opacity = (1 - lifeRatio) * 0.8

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `${color}${Math.floor((1 - distance / 100) * 30).toString(16).padStart(2, '0')}`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })

        // Reset particle when it dies
        if (particle.life >= particle.maxLife) {
          particles[index] = createParticle()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, color, intensity, speed])

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: 0.6 }}
        />
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(${color}20 1px, transparent 1px),
              linear-gradient(90deg, ${color}20 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        <style jsx>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}</style>
      </div>
    )
  }

  if (variant === 'waves') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.05" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z",
                "M0,400 Q300,500 600,400 T1200,400 L1200,800 L0,800 Z",
                "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,500 Q400,400 800,500 T1200,500 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,500 Q400,400 800,500 T1200,500 L1200,800 L0,800 Z",
                "M0,500 Q400,600 800,500 T1200,500 L1200,800 L0,800 Z",
                "M0,500 Q400,400 800,500 T1200,500 L1200,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </svg>
      </div>
    )
  }

  if (variant === 'geometric') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="w-full h-full relative overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, ${color}20, transparent)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                transform: 'rotate(45deg)'
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [45, 405, 45],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="w-full h-full relative">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: color,
                opacity: Math.random() * 0.6 + 0.2
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'lines') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 1200}
              y1={Math.random() * 800}
              x2={Math.random() * 1200}
              y2={Math.random() * 800}
              stroke={color}
              strokeWidth={Math.random() * 2 + 0.5}
              opacity={Math.random() * 0.4 + 0.1}
              animate={{
                x1: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y1: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                x2: [Math.random() * 1200, Math.random() * 1200, Math.random() * 1200],
                y2: [Math.random() * 800, Math.random() * 800, Math.random() * 800],
                opacity: [0.1, 0.5, 0.1]
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (variant === 'mesh') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="w-full h-full relative">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, ${color}15 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, ${color}10 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, ${color}08 0%, transparent 50%)
              `,
              animation: 'meshPulse 6s ease-in-out infinite'
            }}
          />
          <style jsx>{`
            @keyframes meshPulse {
              0%, 100% { 
                background-image: 
                  radial-gradient(circle at 25% 25%, ${color}15 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, ${color}10 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, ${color}08 0%, transparent 50%);
              }
              50% { 
                background-image: 
                  radial-gradient(circle at 75% 25%, ${color}20 0%, transparent 50%),
                  radial-gradient(circle at 25% 75%, ${color}15 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, ${color}12 0%, transparent 50%);
              }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return null
}

export default AnimatedBackground

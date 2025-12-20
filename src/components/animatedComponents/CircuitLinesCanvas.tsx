'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CircuitLinesCanvasProps {
  className?: string
  opacity?: number
  scale?: number
  color?: string
}

const CircuitLinesCanvas = ({ 
  className = '', 
  opacity = 0.6, 
  scale = 1, 
  color = '#fff200' 
}: CircuitLinesCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 })

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Central circle parameters
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const centralRadius = Math.min(dimensions.width, dimensions.height) * 0.08
  const connectionRadius = centralRadius + 2

  // Circuit line parameters
  const outerRadius = Math.min(dimensions.width, dimensions.height) * 0.35
  const numConnectionPoints = 40 // Number of connection points around the central circle

  // Generate connection points around the central circle
  const connectionPoints = Array.from({ length: numConnectionPoints }, (_, i) => {
    const angle = (i * 360) / numConnectionPoints
    const x = centerX + Math.cos((angle * Math.PI) / 180) * connectionRadius
    const y = centerY + Math.sin((angle * Math.PI) / 180) * connectionRadius
    return { x, y, angle }
  })

  // Generate circuit lines extending from each connection point
  const generateCircuitLine = (startX: number, startY: number, angle: number) => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    let currentX = startX
    let currentY = startY
    let currentAngle = angle

    // Create a circuit path with multiple segments
    const numSegments = 3 + Math.floor(Math.random() * 3) // 3-5 segments per line
    const segmentLength = outerRadius / numSegments

    for (let i = 0; i < numSegments; i++) {
      const nextX = currentX + Math.cos((currentAngle * Math.PI) / 180) * segmentLength
      const nextY = currentY + Math.sin((currentAngle * Math.PI) / 180) * segmentLength

      lines.push({
        x1: currentX,
        y1: currentY,
        x2: nextX,
        y2: nextY
      })

      currentX = nextX
      currentY = nextY

      // Add 90-degree turns randomly
      if (i < numSegments - 1 && Math.random() > 0.3) {
        currentAngle += Math.random() > 0.5 ? 90 : -90
      }
    }

    return lines
  }

  // Generate all circuit lines
  const allCircuitLines = connectionPoints.flatMap(point => 
    generateCircuitLine(point.x, point.y, point.angle)
  )

  // Generate end points for circuit lines
  const endPoints = connectionPoints.map(point => {
    const lines = generateCircuitLine(point.x, point.y, point.angle)
    const lastLine = lines[lines.length - 1]
    return { x: lastLine.x2, y: lastLine.y2 }
  })

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity, scale }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full"
      >
        {/* Central empty circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={centralRadius}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Connection points around central circle */}
        {connectionPoints.map((point, index) => (
          <motion.circle
            key={`connection-${index}`}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0.6]
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.02,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          />
        ))}

        {/* Circuit lines */}
        {allCircuitLines.map((line, index) => (
          <motion.line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={color}
            strokeWidth="1"
            opacity="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0, 0.7, 0.5]
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.01,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3
            }}
          />
        ))}

        {/* End points for circuit lines */}
        {endPoints.map((point, index) => (
          <motion.circle
            key={`endpoint-${index}`}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0.6]
            }}
            transition={{
              duration: 1,
              delay: index * 0.03,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2.5
            }}
          />
        ))}

        {/* Animated energy flow along circuit lines */}
        {allCircuitLines.map((line, index) => (
          <motion.circle
            key={`energy-${index}`}
            r="1"
            fill={color}
            opacity="0.9"
            initial={{ 
              cx: line.x1, 
              cy: line.y1,
              scale: 0
            }}
            animate={{ 
              cx: [line.x1, line.x2],
              cy: [line.y1, line.y2],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: index * 0.05,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default CircuitLinesCanvas

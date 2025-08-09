'use client'

import { useEffect, useRef, useCallback } from 'react'

interface AnimatedLinesCanvasProps {
  className?: string
}

interface LineOptions {
  len: number
  count: number
  baseTime: number
  addedTime: number
  dieChance: number
  spawnChance: number
  sparkChance: number
  sparkDist: number
  sparkSize: number
  color: string
  baseLight: number
  addedLight: number
  shadowToTimePropMult: number
  baseLightInputMultiplier: number
  addedLightInputMultiplier: number
  cx: number
  cy: number
  repaintAlpha: number
  hueChange: number
}

class Line {
  private x: number = 0
  private y: number = 0
  private addedX: number = 0
  private addedY: number = 0
  private rad: number = 0
  private lightInputMultiplier: number
  private color: string
  private cumulativeTime: number = 0
  private time: number = 0
  private targetTime: number = 0
  private opts: LineOptions
  private baseRad: number
  private dieX: number
  private dieY: number
  private tick: number

  constructor(opts: LineOptions, baseRad: number, dieX: number, dieY: number, tick: number) {
    this.opts = opts
    this.baseRad = baseRad
    this.dieX = dieX
    this.dieY = dieY
    this.tick = tick
    this.lightInputMultiplier = 0
    this.color = ''
    this.reset()
  }

  reset() {
    // All lines spawn from center and spread outward
    this.x = 0
    this.y = 0
    this.addedX = 0
    this.addedY = 0
    this.rad = Math.random() * Math.PI * 2 // Random direction from center
    this.lightInputMultiplier = this.opts.baseLightInputMultiplier + this.opts.addedLightInputMultiplier * Math.random()
    this.color = this.opts.color.replace('hue', (this.tick * this.opts.hueChange).toString())
    this.cumulativeTime = 0
    this.beginPhase()
  }

  beginPhase() {
    this.x += this.addedX
    this.y += this.addedY
    this.time = 0
    this.targetTime = Math.floor(this.opts.baseTime + this.opts.addedTime * Math.random())
    
    // Subtle direction changes to maintain outward spreading while adding some variation
    const directionChange = this.baseRad * (Math.random() < 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.3)
    this.rad += directionChange
    this.addedX = Math.cos(this.rad)
    this.addedY = Math.sin(this.rad)

    // Extended boundaries to allow lines to travel further
    const extendedDieX = this.dieX * 1.5
    const extendedDieY = this.dieY * 1.5
    
    if (Math.random() < this.opts.dieChance || this.x > extendedDieX || this.x < -extendedDieX || this.y > extendedDieY || this.y < -extendedDieY) {
      this.reset()
    }
  }

  step(ctx: CanvasRenderingContext2D) {
    ++this.time
    ++this.cumulativeTime

    if (this.time >= this.targetTime) {
      this.beginPhase()
    }

    const prop = this.time / this.targetTime
    const wave = Math.sin(prop * Math.PI / 2)
    const x = this.addedX * wave
    const y = this.addedY * wave

    ctx.shadowBlur = prop * this.opts.shadowToTimePropMult
    ctx.fillStyle = ctx.shadowColor = this.color.replace(
      'light', 
      (this.opts.baseLight + this.opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier)).toString()
    )
    
    ctx.fillRect(
      this.opts.cx + (this.x + x) * this.opts.len, 
      this.opts.cy + (this.y + y) * this.opts.len, 
      2, 
      2
    )

    if (Math.random() < this.opts.sparkChance) {
      ctx.fillRect(
        this.opts.cx + (this.x + x) * this.opts.len + Math.random() * this.opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - this.opts.sparkSize / 2,
        this.opts.cy + (this.y + y) * this.opts.len + Math.random() * this.opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - this.opts.sparkSize / 2,
        this.opts.sparkSize,
        this.opts.sparkSize
      )
    }
  }
}

export default function AnimatedLinesCanvas({ className = '' }: AnimatedLinesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const linesRef = useRef<Line[]>([])
  const tickRef = useRef<number>(0)
  const optsRef = useRef<LineOptions>({
    len: 12, // Optimized for center spreading
    count: 120, // Increased count for better center coverage
    baseTime: 2, // Reduced from 6 for faster animation
    addedTime: 4, // Reduced from 10 for faster animation
    dieChance: 0.025, // Slightly increased for faster recycling
    spawnChance: 1,
    sparkChance: 0.2, // More sparks for better effect
    sparkDist: 12,
    sparkSize: 1.5,
    color: 'hsl(hue,100%,light%)',
    baseLight: 45,
    addedLight: 15,
    shadowToTimePropMult: 8,
    baseLightInputMultiplier: 0.015, // Increased for faster light variations
    addedLightInputMultiplier: 0.04, // Increased for faster light variations
    cx: 0,
    cy: 0,
    repaintAlpha: 0.04, // Increased for faster trail fade
    hueChange: 0.2 // Increased for faster color cycling
  })

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Get the parent container dimensions for better coverage
    const parent = canvas.parentElement
    const w = parent ? parent.offsetWidth : window.innerWidth
    const h = parent ? parent.offsetHeight : window.innerHeight
    
    canvas.width = w
    canvas.height = h

    const opts = optsRef.current
    opts.cx = w / 2
    opts.cy = h / 2
  }, [])

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const opts = optsRef.current
    const lines = linesRef.current
    
    ++tickRef.current

    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = 0
    ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'lighter'

    if (lines.length < opts.count && Math.random() < opts.spawnChance) {
      const dieX = canvas.width / 2 / opts.len
      const dieY = canvas.height / 2 / opts.len
      const baseRad = Math.PI * 2 / 6
      lines.push(new Line(opts, baseRad, dieX, dieY, tickRef.current))
    }

    lines.forEach(line => line.step(ctx))

    animationRef.current = requestAnimationFrame(loop)
  }, [])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    updateCanvasSize()
    
    // Clear canvas with black background
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Initialize lines array
    linesRef.current = []
    tickRef.current = 0

    // Start animation loop
    loop()
  }, [updateCanvasSize, loop])

  useEffect(() => {
    initCanvas()

    const handleResize = () => {
      updateCanvasSize()
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (canvas && ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        const opts = optsRef.current
        const parent = canvas.parentElement
        const w = parent ? parent.offsetWidth : window.innerWidth
        const h = parent ? parent.offsetHeight : window.innerHeight
        opts.cx = w / 2
        opts.cy = h / 2
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [initCanvas, updateCanvasSize])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.4,
        // Add subtle blur for depth but allow full spread
        filter: 'blur(0.3px)',
      }}
    />
  )
}
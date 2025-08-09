'use client'

import { useEffect, useRef, useCallback } from 'react'

interface PixelCanvasProps {
  colors?: string
  gap?: string
  speed?: string
  noFocus?: boolean
  className?: string
  parentRef?: React.RefObject<HTMLElement | null>
}

class Pixel {
  private width: number
  private height: number
  private ctx: CanvasRenderingContext2D
  private x: number
  private y: number
  private color: string
  private speed: number
  private size: number
  private sizeStep: number
  private minSize: number
  private maxSizeInteger: number
  private maxSize: number
  private delay: number
  private counter: number
  private counterStep: number
  public isIdle: boolean
  private isReverse: boolean
  private isShimmer: boolean

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = this.getRandomValue(0.1, 0.6) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4 + 0.2
    this.minSize = 0.5
    this.maxSizeInteger = 2.5
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  private getDistanceFromCenter(canvasWidth: number, canvasHeight: number): number {
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const dx = this.x - centerX
    const dy = this.y - centerY
    return Math.sqrt(dx * dx + dy * dy)
  }

  private getIntensityMultiplier(canvasWidth: number, canvasHeight: number): number {
    const maxDistance = Math.sqrt((canvasWidth / 2) ** 2 + (canvasHeight / 2) ** 2)
    const distance = this.getDistanceFromCenter(canvasWidth, canvasHeight)
    const normalizedDistance = distance / maxDistance
    // More visible intensity: 0.25 to 1.0 for clear effect
    return Math.max(0.25, normalizedDistance * 1.0)
  }

  private draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    const intensityMultiplier = this.getIntensityMultiplier(this.width, this.height)
    
    // Apply intensity-based opacity - more visible
    const baseOpacity = this.color.includes('rgba') ? 1 : 0.9
    const opacity = Math.min(1, baseOpacity * intensityMultiplier)

    // Extract RGB values and apply opacity
    let finalColor = this.color
    if (this.color.startsWith('#')) {
      const r = parseInt(this.color.slice(1, 3), 16)
      const g = parseInt(this.color.slice(3, 5), 16)
      const b = parseInt(this.color.slice(5, 7), 16)
      finalColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
    } else if (this.color.startsWith('rgb')) {
      finalColor = this.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
    }

    this.ctx.fillStyle = finalColor
    
    // Calculate position and size, ensuring pixels near edges can extend to cover them
    const drawX = Math.max(0, this.x + centerOffset)
    const drawY = Math.max(0, this.y + centerOffset)
    let drawWidth = this.size
    let drawHeight = this.size
    
    // Extend size for edge pixels to ensure full coverage
    if (this.x + centerOffset + this.size > this.width - 2) {
      drawWidth = this.width - drawX
    }
    if (this.y + centerOffset + this.size > this.height - 2) {
      drawHeight = this.height - drawY
    }
    
    this.ctx.fillRect(drawX, drawY, drawWidth, drawHeight)
  }

  public appear(): void {
    this.isIdle = false

    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true
    }

    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }

    this.draw()
  }

  public disappear(): void {
    this.isShimmer = false
    this.counter = 0

    if (this.size <= 0) {
      this.isIdle = true
      return
    } else {
      this.size -= 0.08
    }

    this.draw()
  }

  private shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }

    if (this.isReverse) {
      this.size -= this.speed
    } else {
      this.size += this.speed
    }
  }
}

export default function PixelCanvas({ 
  colors = "#fecdd3, #fda4af, #e11d48", 
  gap = "6", 
  speed = "80", 
  noFocus = false,
  className = "",
  parentRef
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number>(0)
  const timeIntervalRef = useRef<number>(1000 / 60)
  const timePreviousRef = useRef<number>(performance.now())
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const parsedColors = colors.split(',').map(color => color.trim())
  const gapValue = Math.max(4, Math.min(50, parseInt(gap)))
  const reducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  
  const speedValue = reducedMotion ? 0 : Math.max(0, Math.min(100, parseInt(speed))) * 0.001

  const getDistanceToCanvasCenter = (x: number, y: number, canvas: HTMLCanvasElement): number => {
    const dx = x - canvas.width / 2
    const dy = y - canvas.height / 2
    return Math.sqrt(dx * dx + dy * dy)
  }

  const createPixels = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    pixelsRef.current = []
    
    // Main grid of pixels with extended bounds to reach edges
    for (let x = 0; x <= canvas.width; x += gapValue) {
      for (let y = 0; y <= canvas.height; y += gapValue) {
        // Clamp x and y to canvas bounds to avoid drawing outside
        const clampedX = Math.min(x, canvas.width - 1)
        const clampedY = Math.min(y, canvas.height - 1)
        
        const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
        const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(clampedX, clampedY, canvas)

        pixelsRef.current.push(
          new Pixel(canvas, ctx, clampedX, clampedY, color, speedValue, delay)
        )
      }
    }
    
    // Add extra pixels along the right and bottom edges for better coverage
    const edgeOffset = Math.floor(gapValue / 2)
    
    // Right edge pixels
    for (let y = edgeOffset; y < canvas.height; y += gapValue) {
      const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
      const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(canvas.width - 1, y, canvas)
      pixelsRef.current.push(
        new Pixel(canvas, ctx, canvas.width - 1, y, color, speedValue, delay)
      )
    }
    
    // Bottom edge pixels
    for (let x = edgeOffset; x < canvas.width; x += gapValue) {
      const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
      const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(x, canvas.height - 1, canvas)
      pixelsRef.current.push(
        new Pixel(canvas, ctx, x, canvas.height - 1, color, speedValue, delay)
      )
    }
  }

  const init = useCallback((): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use parent element for sizing - this should be the card element
    const sizeSource = parentRef?.current
    if (!sizeSource) return

    const rect = sizeSource.getBoundingClientRect()
    const width = Math.floor(rect.width)
    const height = Math.floor(rect.height)

    // Set canvas dimensions to match parent exactly
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    // Ensure canvas fills the entire parent including corners
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.right = '0'
    canvas.style.bottom = '0'

    const ctx = canvas.getContext('2d')
    if (ctx) {
      createPixels(canvas, ctx)
    }
  }, [parentRef, createPixels])

  const animate = (fnName: 'appear' | 'disappear'): void => {
    animationRef.current = requestAnimationFrame(() => animate(fnName))

    const timeNow = performance.now()
    const timePassed = timeNow - timePreviousRef.current

    if (timePassed < timeIntervalRef.current) return

    timePreviousRef.current = timeNow - (timePassed % timeIntervalRef.current)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < pixelsRef.current.length; i++) {
      pixelsRef.current[i][fnName]()
    }

    if (pixelsRef.current.every((pixel) => pixel.isIdle)) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }

  const handleAnimation = (name: 'appear' | 'disappear'): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animate(name)
  }

  const handleMouseEnter = useCallback((): void => {
    handleAnimation('appear')
  }, [handleAnimation])

  const handleMouseLeave = useCallback((): void => {
    handleAnimation('disappear')
  }, [handleAnimation])

  const handleFocusIn = useCallback((e: FocusEvent): void => {
    const target = e.currentTarget as HTMLElement
    const relatedTarget = e.relatedTarget as HTMLElement
    if (target.contains(relatedTarget)) return
    handleAnimation('appear')
  }, [handleAnimation])

  const handleFocusOut = useCallback((e: FocusEvent): void => {
    const target = e.currentTarget as HTMLElement
    const relatedTarget = e.relatedTarget as HTMLElement
    if (target.contains(relatedTarget)) return
    handleAnimation('disappear')
  }, [handleAnimation])

  useEffect(() => {
    // Add a small delay to ensure parent element is properly rendered
    const initTimer = setTimeout(() => {
      init()
    }, 150)

    resizeObserverRef.current = new ResizeObserver(() => {
      setTimeout(() => init(), 50) // Small delay for resize
    })
    
    // Only observe the parent element (the card)
    const observeTarget = parentRef?.current
    if (observeTarget) {
      resizeObserverRef.current.observe(observeTarget)
    }

    return () => {
      clearTimeout(initTimer)
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [parentRef, init])

  useEffect(() => {
    // Use parent element for event handling
    const targetElement = parentRef?.current
    if (!targetElement) return

    targetElement.addEventListener('mouseenter', handleMouseEnter)
    targetElement.addEventListener('mouseleave', handleMouseLeave)

    if (!noFocus) {
      targetElement.addEventListener('focusin', handleFocusIn as EventListener)
      targetElement.addEventListener('focusout', handleFocusOut as EventListener)
    }

    return () => {
      targetElement.removeEventListener('mouseenter', handleMouseEnter)
      targetElement.removeEventListener('mouseleave', handleMouseLeave)
      
      if (!noFocus) {
        targetElement.removeEventListener('focusin', handleFocusIn as EventListener)
        targetElement.removeEventListener('focusout', handleFocusOut as EventListener)
      }
    }
  }, [noFocus, parentRef, handleFocusIn, handleFocusOut, handleMouseEnter, handleMouseLeave])

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 block pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        display: 'block',
        zIndex: 0,
        borderRadius: 'inherit'
      }}
    />
  )
}
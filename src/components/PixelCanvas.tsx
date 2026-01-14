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
    this.minSize = 0.5 // Smaller pixels
    this.maxSizeInteger = 3 // Smaller max size
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = 0 // Removed delay for instant feedback
    this.counter = 0
    this.counterStep = 1
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  private getIntensityMultiplier(): number {
    // Subtler intensity for better text visibility
    return 0.4
  }

  private draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    const intensityMultiplier = this.getIntensityMultiplier()

    // Slightly increased opacity for better visibility on hover
    const baseOpacity = 0.45
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
    if (this.x + centerOffset + this.size > this.width - 1) {
      drawWidth = this.width - drawX
    }
    if (this.y + centerOffset + this.size > this.height - 1) {
      drawHeight = this.height - drawY
    }

    // Ensure minimum size for visibility
    drawWidth = Math.max(1, drawWidth)
    drawHeight = Math.max(1, drawHeight)

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

  const createPixels = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    pixelsRef.current = []

    const parsedColors = colors.split(',').map(c => c.trim())
    const gapValue = Math.max(4, Math.min(50, parseInt(gap)))
    const reducedMotion = typeof window !== 'undefined' ?
      window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
    const speedValue = reducedMotion ? 0 : Math.max(0, Math.min(100, parseInt(speed))) * 0.001

    const getDistance = (x: number, y: number): number => {
      const dx = x - canvas.width / 2
      const dy = y - canvas.height / 2
      return Math.sqrt(dx * dx + dy * dy)
    }

    // Faster feedback: use a small multiplier for the distance-based delay
    const delayMultiplier = 0.05

    for (let x = 0; x <= canvas.width; x += gapValue) {
      for (let y = 0; y <= canvas.height; y += gapValue) {
        const cx = Math.min(x, canvas.width - 1)
        const cy = Math.min(y, canvas.height - 1)
        const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
        const delay = reducedMotion ? 0 : getDistance(cx, cy) * delayMultiplier

        pixelsRef.current.push(new Pixel(canvas, ctx, cx, cy, color, speedValue, delay))
      }
    }

    // Edges
    for (let x = 0; x < canvas.width; x += gapValue) {
      const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
      pixelsRef.current.push(new Pixel(canvas, ctx, x, 0, color, speedValue, getDistance(x, 0) * delayMultiplier))
      pixelsRef.current.push(new Pixel(canvas, ctx, x, canvas.height - 1, color, speedValue, getDistance(x, canvas.height - 1) * delayMultiplier))
    }
    for (let y = 0; y < canvas.height; y += gapValue) {
      const color = parsedColors[Math.floor(Math.random() * parsedColors.length)]
      pixelsRef.current.push(new Pixel(canvas, ctx, 0, y, color, speedValue, getDistance(0, y) * delayMultiplier))
      pixelsRef.current.push(new Pixel(canvas, ctx, canvas.width - 1, y, color, speedValue, getDistance(canvas.width - 1, y) * delayMultiplier))
    }
  }, [colors, gap, speed])

  const init = useCallback((): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const sizeSource = parentRef?.current || canvasRef.current?.parentElement
    if (!sizeSource) return

    const rect = sizeSource.getBoundingClientRect()
    // Use offsetWidth/Height as secondary check to ensure we get the full layout size
    const width = Math.floor(rect.width || (sizeSource as HTMLElement).offsetWidth)
    const height = Math.floor(rect.height || (sizeSource as HTMLElement).offsetHeight)

    if (width <= 0 || height <= 0) return

    canvas.width = width
    canvas.height = height
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.right = '0'
    canvas.style.bottom = '0'
    canvas.style.zIndex = '0'
    canvas.style.pointerEvents = 'none'

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

  const handleAnimation = useCallback((name: 'appear' | 'disappear'): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animate(name)
  }, []) // Removed animate from dependency to avoid recreation loops

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
    }, 200)

    // Debounced resize handler to prevent excessive re-initializations
    let resizeTimeout: NodeJS.Timeout
    resizeObserverRef.current = new ResizeObserver((entries) => {
      // Only reinitialize if the size actually changed significantly
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            init()
          }, 100)
        }
      }
    })

    // Attempt to observe parent element
    const observeTarget = parentRef?.current || canvasRef.current?.parentElement
    if (observeTarget) {
      resizeObserverRef.current.observe(observeTarget)
    }

    return () => {
      clearTimeout(initTimer)
      clearTimeout(resizeTimeout)
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [parentRef, init])

  useEffect(() => {
    // Use parent element for event handling, fallback to canvas's parent if ref not set
    const targetElement = parentRef?.current || canvasRef.current?.parentElement
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
  }, [noFocus, handleFocusIn, handleFocusOut, handleMouseEnter, handleMouseLeave, parentRef])

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
        zIndex: 10,
        borderRadius: 'inherit',
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'auto' // Optimize for performance
      }}
    />
  )
}
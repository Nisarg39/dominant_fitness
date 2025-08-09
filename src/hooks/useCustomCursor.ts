'use client'

import { useEffect, useRef } from 'react'

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  
  const mousePosition = useRef({ x: 0, y: 0 })
  const trailPosition = useRef({ x: 0, y: 0 })
  const followerPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasHover = window.matchMedia('(hover: hover)').matches
    const hasFineFontPointer = window.matchMedia('(pointer: fine)').matches
    const isDesktop = hasHover && hasFineFontPointer && !isTouchDevice

    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`
        cursorRef.current.style.top = `${e.clientY - 10}px`
      }
    }

    const animateTrail = () => {
      trailPosition.current.x += (mousePosition.current.x - trailPosition.current.x) * 0.1
      trailPosition.current.y += (mousePosition.current.y - trailPosition.current.y) * 0.1
      
      followerPosition.current.x += (mousePosition.current.x - followerPosition.current.x) * 0.05
      followerPosition.current.y += (mousePosition.current.y - followerPosition.current.y) * 0.05

      if (trailRef.current) {
        trailRef.current.style.left = `${trailPosition.current.x - 4}px`
        trailRef.current.style.top = `${trailPosition.current.y - 4}px`
      }

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPosition.current.x - 20}px`
        followerRef.current.style.top = `${followerPosition.current.y - 20}px`
      }

      requestAnimationFrame(animateTrail)
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
      if (trailRef.current) trailRef.current.style.opacity = '1'
      if (followerRef.current) followerRef.current.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (trailRef.current) trailRef.current.style.opacity = '0'
      if (followerRef.current) followerRef.current.style.opacity = '0'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    animateTrail()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { cursorRef, trailRef, followerRef }
}
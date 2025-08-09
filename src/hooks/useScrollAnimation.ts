'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useInView } from 'framer-motion'

// Professional scroll-based animation hook with performance optimization
export const useScrollAnimation = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Advanced scroll transforms for section transitions
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, -15])

  return {
    containerRef,
    scrollYProgress,
    opacity,
    scale,
    y,
    rotateX
  }
}

// Hook for staggered reveal animations
export const useRevealAnimation = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  })

  const variants = {
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
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }

  return {
    ref,
    isInView,
    variants
  }
}

// Hook for advanced parallax effects
export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return { ref, y, opacity }
}

// Hook for section transition effects
export const useSectionTransition = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(
              (section) => section === entry.target
            )
            if (index !== -1) {
              setCurrentSection(index)
            }
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    )

    // Capture current sections to use in cleanup
    const currentSections = sectionsRef.current
    currentSections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const registerSection = (element: HTMLElement | null) => {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element)
    }
  }

  return {
    currentSection,
    registerSection
  }
}
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home-section', label: 'Home' },
    { href: '#about-section', label: 'About' },
    { href: '#services-section', label: 'Services' },
    { href: '#blogs-section', label: 'Blogs' },
    { href: '#testimonials-section', label: 'Testimonials' },
    { href: '#contact-section', label: 'Contact' },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-center py-6 space-x-6">
          {/* Left Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.slice(0, 3).map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-white/90 hover:text-red-500 transition-all duration-300 font-roboto uppercase tracking-wider"
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  display: 'block',
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center mx-8">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={58}
              height={58}
              className="navbar-logo-animate transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.slice(3).map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-white/90 hover:text-red-500 transition-all duration-300 font-roboto uppercase tracking-wider"
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  display: 'block',
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between py-6 lg:hidden">
          {/* Mobile Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="navbar-logo-animate transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/90 hover:text-red-500 transition-all duration-300 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20
        }}
        className={`lg:hidden bg-black/95 backdrop-blur-md ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleNavClick(item.href)
                  setIsMobileMenuOpen(false)
                }}
                className="text-white/90 hover:text-red-500 transition-colors duration-300 text-sm font-medium py-2 text-left"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navigation
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
    { href: '#portfolio-section', label: 'Portfolio' },
    { href: '#about-section', label: 'About' },
    { href: '#services-section', label: 'Services' },
    { href: '#skills-section', label: 'Skills' },
    { href: '#testimonial-section', label: 'Testimonial' },
    { href: '#journal-section', label: 'Journal' },
    { href: '#contact-section', label: 'Contact' },
  ]

  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-center py-6 space-x-6">
          {/* Left Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.slice(0, 4).map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-red-500 transition-all duration-300 font-roboto uppercase tracking-wider"
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  display: 'block',
                  position: 'relative'
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
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
            {navItems.slice(4).map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-red-500 transition-all duration-300 font-roboto uppercase tracking-wider"
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  display: 'block',
                  position: 'relative'
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
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
              <a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-red-500 transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navigation
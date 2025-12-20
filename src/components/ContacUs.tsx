'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createContactUs } from '@/server/actions/userActions'
// Custom animation components to replace React Bits
const FadeContent = ({ children, duration = 1000, direction = 'up' }: { 
  children: React.ReactNode, 
  duration?: number, 
  direction?: 'up' | 'down' | 'left' | 'right' 
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -50, y: 0 }
      case 'right': return { x: 50, y: 0 }
      case 'down': return { x: 0, y: 50 }
      default: return { x: 0, y: -50 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: duration / 1000, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const SlideInContent = ({ children, duration = 1000, direction = 'right' }: { 
  children: React.ReactNode, 
  duration?: number, 
  direction?: 'up' | 'down' | 'left' | 'right' 
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, y: 0 }
      case 'right': return { x: 100, y: 0 }
      case 'up': return { x: 0, y: -100 }
      case 'down': return { x: 0, y: 100 }
      default: return { x: 100, y: 0 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: duration / 1000, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const StaggeredContent = ({ children, delay = 0, stagger = 100 }: { 
  children: React.ReactNode, 
  delay?: number, 
  stagger?: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        delay: delay / 1000,
        staggerChildren: stagger / 1000 
      }}
    >
      {children}
    </motion.div>
  )
}

const ContacUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})
  const sectionRef = useRef<HTMLElement>(null)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Full name is required' : ''
      case 'email':
        if (value.trim() === '') return 'Email address is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email address' : ''
      case 'phone':
        // Phone is optional, but if provided, must be exactly 10 digits
        if (value.trim() === '') return ''
        const phoneRegex = /^\d{10}$/
        return !phoneRegex.test(value) ? 'Phone number must be exactly 10 digits' : ''
      case 'message':
        return value.trim() === '' ? 'Message is required' : ''
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    // Validate required fields only
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)
    
    // Phone is optional, but validate if provided
    if (formData.phone.trim() !== '') {
      newErrors.phone = validateField('phone', formData.phone)
    }
    
    setErrors(newErrors)
    return Object.values(newErrors).every(error => error === '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Special handling for phone number - only allow digits and limit to 10
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '') // Remove all non-digits
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFocusedField(null)
    setTouched(prev => ({ ...prev, [name]: true }))
    
    // Validate field on blur
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Call server action to save contact data
      const result = await createContactUs(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' })
          setSubmitStatus('idle')
          setErrors({})
          setTouched({})
        }, 3000)
      } else {
        setSubmitStatus('error')
        console.error('Server error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.214-.361a9.86 9.86 0 01-1.378-5.031c0-5.449 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488',
      color: '#25D366',
      url: 'https://wa.me/1234567890'
    },
    {
      name: 'Facebook',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      color: '#1877F2',
      url: 'https://www.facebook.com/profile.php?id=61584778690801&ref=waios.fb_links_xma_control'
    },
    {
      name: 'Instagram',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      color: '#E4405F',
      url: 'https://www.instagram.com/dominateperformance_?igsh=NmU1anp0NW5jZTN5'
    }
  ]

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 20px rgba(255, 242, 0, 0.3)',
      borderColor: '#fff200'
    },
    blur: {
      scale: 1,
      boxShadow: '0 0 0px rgba(255, 242, 0, 0)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    error: {
      scale: 1,
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
      borderColor: '#fff200'
    }
  }

  return (
    <section 
      id="contact-section" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Simple Dark Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Subtle gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.95) 100%),
              radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,242,0,0.05) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Side - Contact Info */}
          <FadeContent duration={1000} direction="left">
            <div className="space-y-8">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h2 
                  className="text-6xl font-bold font-montserrat uppercase mb-4 whitespace-nowrap"
                  style={{
                    color: '#fff200',
                    textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6), 0 0 40px rgba(255,242,0,0.2)',
                    letterSpacing: '0.05em',
                    lineHeight: 0.9
                  }}
                >
                  GET IN TOUCH
                </h2>
                
                <div 
                  className="w-24 h-1 bg-gradient-to-r from-[#fff200] to-[#fff200] mb-6"
                  style={{
                    boxShadow: '0 0 10px rgba(255,242,0,0.5)'
                  }}
                />
                
                <p 
                  className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    fontStyle: 'italic'
                  }}
                >
                  Ready to dominate your performance? Let&apos;s start your journey to excellence.
                </p>
              </motion.div>

              {/* Contact Details */}
              <StaggeredContent delay={200} stagger={100}>
                <div className="space-y-6">
                  <motion.a
                    href="mailto:info@dominateperformance.com"
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #fff200, #fff200)',
                        boxShadow: '0 4px 15px rgba(255,242,0,0.15)'
                      }}
                    >
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm uppercase tracking-wider">Email</p>
                      <p className="text-white font-medium">info@dominateperformance.com</p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="https://wa.me/9309213649"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #fff200, #fff200)',
                        boxShadow: '0 4px 15px rgba(255,242,0,0.15)'
                      }}
                    >
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm uppercase tracking-wider">Phone</p>
                      <p className="text-white font-medium">9309213649</p>
                    </div>
                  </motion.a>

                  <motion.div
                    className="flex items-start space-x-4 group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #fff200, #fff200)',
                        boxShadow: '0 4px 15px rgba(255,242,0,0.15)'
                      }}
                    >
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm uppercase tracking-wider">Location</p>
                      <p className="text-white font-medium">Beside Playshire Sports Club, near Jio-bp pulse, Ubale Nagar, Kharadi, Pune, Maharashtra 412207</p>
                    </div>
                  </motion.div>
                </div>
              </StaggeredContent>

              {/* Social Media Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-8"
              >
                <p className="text-white/70 text-sm uppercase tracking-wider mb-4">Follow Us</p>
                <div className="flex space-x-5">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-14 h-14 rounded-xl flex items-center justify-center group overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #fff200, #fff200)',
                        boxShadow: '0 4px 15px rgba(255,242,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        boxShadow: '0 8px 20px rgba(255,242,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                        background: 'linear-gradient(145deg, #fff200, #e6db00)',
                        transition: { duration: 0.3, ease: 'easeOut' }
                      }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    >
                      {/* Subtle shine effect */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)'
                        }}
                      />

                      <motion.svg
                        className="w-7 h-7 text-black relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path d={social.icon}/>
                      </motion.svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeContent>

          {/* Right Side - Contact Form */}
          <SlideInContent duration={1000} direction="right">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-black/40 backdrop-blur-lg rounded-xl p-8 lg:p-12 border border-white/10"
              style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <label className="block text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Full Name <span className="text-[#fff200]">*</span>
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={handleInputBlur}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.name && touched.name 
                        ? 'border-[#fff200]' 
                        : focusedField === 'name' 
                          ? 'border-[#fff200]' 
                          : 'border-white/20'
                    }`}
                    placeholder="Enter your full name"
                    variants={inputVariants}
                    animate={
                      errors.name && touched.name 
                        ? 'error' 
                        : focusedField === 'name' 
                          ? 'focus' 
                          : 'blur'
                    }
                    required
                  />
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#fff200] text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label className="block text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Email Address <span className="text-[#fff200]">*</span>
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={handleInputBlur}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.email && touched.email 
                        ? 'border-[#fff200]' 
                        : focusedField === 'email' 
                          ? 'border-[#fff200]' 
                          : 'border-white/20'
                    }`}
                    placeholder="Enter your email address"
                    variants={inputVariants}
                    animate={
                      errors.email && touched.email 
                        ? 'error' 
                        : focusedField === 'email' 
                          ? 'focus' 
                          : 'blur'
                    }
                    required
                  />
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#fff200] text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone Input */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <label className="block text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Phone Number <span className="text-white/50">(Optional)</span>
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={handleInputBlur}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.phone && touched.phone 
                        ? 'border-[#fff200]' 
                        : focusedField === 'phone' 
                          ? 'border-[#fff200]' 
                          : 'border-white/20'
                    }`}
                    placeholder="Enter 10-digit phone number (optional)"
                    variants={inputVariants}
                    animate={
                      errors.phone && touched.phone 
                        ? 'error' 
                        : focusedField === 'phone' 
                          ? 'focus' 
                          : 'blur'
                    }
                    maxLength={10}
                  />
                  {errors.phone && touched.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#fff200] text-sm mt-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Input */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <label className="block text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">
                    Message <span className="text-[#fff200]">*</span>
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={handleInputBlur}
                    disabled={isSubmitting}
                    rows={4}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.message && touched.message 
                        ? 'border-[#fff200]' 
                        : focusedField === 'message' 
                          ? 'border-[#fff200]' 
                          : 'border-white/20'
                    }`}
                    placeholder="Tell us about your goals and how we can help you dominate..."
                    variants={inputVariants}
                    animate={
                      errors.message && touched.message 
                        ? 'error' 
                        : focusedField === 'message' 
                          ? 'focus' 
                          : 'blur'
                    }
                    required
                  />
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#fff200] text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group text-base ${
                      isSubmitting ? 'cursor-not-allowed opacity-75 text-white' : 'cursor-pointer text-black'
                    }`}
                    style={{
                      background: isSubmitting
                        ? 'linear-gradient(135deg, #666, #888)'
                        : '#fff200',
                      boxShadow: isSubmitting
                        ? '0 4px 15px rgba(0,0,0,0.3)'
                        : '0 8px 25px rgba(255,242,0,0.2)',
                      border: '2px solid #fff200'
                    }}
                    whileHover={!isSubmitting ? {
                      scale: 1.02,
                      boxShadow: '0 12px 35px rgba(255,242,0,0.3)'
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    animate={isSubmitting ? { 
                      scale: 0.98,
                      transition: { repeat: Infinity, repeatType: "reverse", duration: 1 }
                    } : {}}
                  >
                    {/* Loading background pulse effect */}
                    {isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: 'linear'
                        }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                        }}
                      />
                    )}
                    
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center space-x-3 relative z-10"
                        >
                          <div className="relative">
                            <div className="w-6 h-6 border-2 border-white/20 rounded-full" />
                            <div className="absolute top-0 left-0 w-6 h-6 border-2 border-transparent border-t-white rounded-full animate-spin" />
                          </div>
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            SUBMITTING...
                          </motion.span>
                        </motion.div>
                      ) : submitStatus === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center justify-center space-x-2 relative z-10"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          <span>MESSAGE SENT!</span>
                        </motion.div>
                      ) : submitStatus === 'error' ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center justify-center space-x-2 relative z-10"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                          </svg>
                          <span>ERROR - TRY AGAIN</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center space-x-2 relative z-10"
                        >
                          <span>SEND MESSAGE</span>
                          <motion.svg 
                            className="w-5 h-5" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </motion.svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </SlideInContent>
        </div>
    </div>
    </section>
  )
}

export default ContacUs
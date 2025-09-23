'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInAdmin } from '@/server/actions/adminActions';

export default function AdminSignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
      general: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      // Create FormData to send to server action
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      
      console.log('Sending login request to server...', { username: formData.username });
      
      // Call server action
      const result = await signInAdmin(formDataToSend);
      
      console.log('Server response:', result);
      
      if (result.success && result.adminToken) {
        
        localStorage.setItem('adminToken', result.adminToken);
        console.log('Admin token stored successfully');
        
        // Trigger parent component to update state
        window.location.reload();
      } else {
        console.log('Login failed:', result.message);
        setErrors(prev => ({
          ...prev,
          general: result.message || 'Login failed. Please try again.'
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Geometric accents */}
        <div className="geometric-accent" style={{
          left: '10%',
          top: '20%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div className="geometric-accent" style={{
          right: '15%',
          bottom: '30%',
          width: '40px',
          height: '40px',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
      </div>

      {/* Login Form Container */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.1
        }}
      >
        <div className="glassmorphism-enhanced rounded-2xl p-8 shadow-2xl border border-white/10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8" 
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 animated-text">
              Admin Access
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access the admin dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6" 
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.username 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-white/20 focus:ring-red-500/50 focus:border-red-500/50'
                  }`}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.username && (
                <motion.p 
                  className="mt-1 text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.username}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-white/20 focus:ring-red-500/50 focus:border-red-500/50'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  className="mt-1 text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <motion.div 
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-400">{errors.general}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center" 
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-xs text-gray-500">
              Secure admin access • Protected by encryption
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
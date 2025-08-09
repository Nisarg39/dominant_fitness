'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'

interface ClientWrapperProps {
  children: React.ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const { cursorRef, trailRef, followerRef } = useCustomCursor()

  return (
    <>
      {children}
      
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={trailRef} className="cursor-trail" />
      <div ref={followerRef} className="mouse-follower" />
    </>
  )
}

export default ClientWrapper
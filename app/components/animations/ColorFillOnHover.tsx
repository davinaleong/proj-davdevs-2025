'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface ColorFillOnHoverProps {
  children: ReactNode
  className?: string
  hoverColor?: string
  duration?: number
  direction?: 'left-to-right' | 'right-to-left'
  easing?: string
}

export default function ColorFillOnHover({
  children,
  className = '',
  hoverColor = 'text-blue-500',
  duration = 0.6,
  direction = 'left-to-right',
  easing = 'ease-out'
}: ColorFillOnHoverProps) {

  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {/* Original text */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Colored overlay using clip-path */}
      <motion.div
        className={`absolute inset-0 z-20 ${hoverColor}`}
        style={{
          clipPath: direction === 'left-to-right' 
            ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        }}
        variants={{
          initial: {
            clipPath: direction === 'left-to-right' 
              ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
              : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
          },
          hover: {
            clipPath: direction === 'left-to-right'
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }
        }}
        transition={{
          duration,
          ease: easing === 'ease-out' ? [0.22, 1, 0.36, 1] : easing
        }}
      >
        <span className="select-none">
          {children}
        </span>
      </motion.div>
    </motion.div>
  )
}
'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface PulseOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
  pulseOpacity?: [number, number]
  continuousPulse?: boolean
  disabled?: boolean
}

export default function PulseOnHover({
  children,
  className = '',
  scale = 1.05,
  duration = 0.3,
  pulseOpacity = [1, 0.8],
  continuousPulse = false,
  disabled = false
}: PulseOnHoverProps) {
  const hoverAnimation = disabled ? {} : {
    scale,
    opacity: pulseOpacity[1]
  }

  const continuousAnimation = continuousPulse && !disabled ? {
    scale: [1, 1.02, 1],
    opacity: [pulseOpacity[0], pulseOpacity[1], pulseOpacity[0]]
  } : {}

  const transition = {
    duration,
    ...(continuousPulse && !disabled && {
      repeat: Infinity,
      repeatType: "loop" as const
    })
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        scale: 1, 
        opacity: pulseOpacity[0] 
      }}
      animate={continuousAnimation}
      whileHover={hoverAnimation}
      whileTap={disabled ? {} : { 
        scale: scale * 0.95 
      }}
      transition={transition}
      style={{
        cursor: disabled ? 'default' : 'pointer'
      }}
    >
      {children}
    </motion.div>
  )
}
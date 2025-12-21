'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface SlideUpOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
}

export default function SlideUpOnScroll({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1
}: SlideUpOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: distance 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ 
        once: true,
        amount: threshold 
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth animation
      }}
    >
      {children}
    </motion.div>
  )
}
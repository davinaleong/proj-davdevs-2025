'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface UnderlineOnHoverProps {
  children: ReactNode
  className?: string
  underlineClassName?: string
  thickness?: number
  duration?: number
  direction?: 'left-to-right' | 'center-out' | 'right-to-left'
  color?: string
  offset?: number
}

export default function UnderlineOnHover({
  children,
  className = '',
  underlineClassName = '',
  thickness = 2,
  duration = 0.3,
  direction = 'left-to-right',
  color = 'currentColor',
  offset = 2
}: UnderlineOnHoverProps) {
  const getAnimationVariants = () => {
    switch (direction) {
      case 'center-out':
        return {
          initial: { scaleX: 0, originX: 0.5 },
          hover: { scaleX: 1, originX: 0.5 }
        }
      case 'right-to-left':
        return {
          initial: { scaleX: 0, originX: 1 },
          hover: { scaleX: 1, originX: 1 }
        }
      default: // left-to-right
        return {
          initial: { scaleX: 0, originX: 0 },
          hover: { scaleX: 1, originX: 0 }
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {children}
      <motion.div
        className={`absolute left-0 right-0 ${underlineClassName}`}
        style={{
          bottom: -offset,
          height: thickness,
          backgroundColor: color,
          transformOrigin: variants.initial.originX === 0.5 ? 'center' : 
                          variants.initial.originX === 1 ? 'right' : 'left'
        }}
        variants={{
          initial: {
            scaleX: variants.initial.scaleX,
          },
          hover: {
            scaleX: variants.hover.scaleX,
          }
        }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1]
        }}
      />
    </motion.div>
  )
}
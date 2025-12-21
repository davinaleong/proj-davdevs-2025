'use client'

import { motion } from 'motion/react'
import { ReactNode, useEffect, useState } from 'react'

interface TypingAnimationProps {
  children: ReactNode
  className?: string
  speed?: number
  delay?: number
  showCursor?: boolean
  cursorClassName?: string
  onComplete?: () => void
}

export default function TypingAnimation({
  children,
  className = '',
  speed = 0.05,
  delay = 0,
  showCursor = true,
  cursorClassName = '',
  onComplete
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  // Extract text content from children
  const getText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (Array.isArray(node)) return node.map(getText).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      const element = node as { props: { children?: ReactNode } }
      return getText(element.props.children)
    }
    return ''
  }

  const fullText = getText(children)

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed * 1000)

      return () => clearTimeout(timer)
    } else if (currentIndex >= fullText.length && !isComplete) {
      // Use setTimeout to avoid calling setState synchronously within effect
      const completeTimer = setTimeout(() => {
        setIsComplete(true)
        onComplete?.()
      }, 0)

      return () => clearTimeout(completeTimer)
    }
  }, [currentIndex, fullText, speed, isComplete, onComplete])

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0)
      }, delay * 1000)

      return () => clearTimeout(delayTimer)
    } else {
      // Use setTimeout to avoid calling setState synchronously within effect
      const initTimer = setTimeout(() => {
        setCurrentIndex(0)
      }, 0)

      return () => clearTimeout(initTimer)
    }
  }, [delay])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          className={`inline-block ${cursorClassName}`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: isComplete ? 3 : Infinity,
            ease: "linear"
          }}
        >
          |
        </motion.span>
      )}
    </motion.div>
  )
}
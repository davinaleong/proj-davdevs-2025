'use client'

import { ReactNode } from 'react'

interface GroupProps {
  children: ReactNode
  variant?: 'horizontal' | 'vertical'
  className?: string
}

export default function Group({ 
  children, 
  variant = 'vertical', 
  className = "" 
}: GroupProps) {
  const baseClasses = variant === 'horizontal' ? "flex gap-2" : "flow"
  const finalClassName = `${baseClasses} ${className}`.trim()

  return (
    <div className={finalClassName}>
      {children}
    </div>
  )
}
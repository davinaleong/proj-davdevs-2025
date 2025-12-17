'use client'

import { ReactNode } from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  required?: boolean
  className?: string
}

export default function Label({ 
  children, 
  required = false, 
  className = "", 
  ...props 
}: LabelProps) {
  const baseClasses = "text-sm font-medium"
  const finalClassName = `${baseClasses} ${className}`.trim()

  return (
    <label className={finalClassName} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}
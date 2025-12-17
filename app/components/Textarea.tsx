'use client'

import React, { forwardRef, useId } from 'react'

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  className?: string
  name?: string
  // Textarea-specific attributes
  rows?: number
  cols?: number
  minLength?: number
  maxLength?: number
  wrap?: 'hard' | 'soft' | 'off'
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  placeholder,
  className = '',
  name,
  rows = 4,
  cols,
  minLength,
  maxLength,
  wrap = 'soft',
  resize = 'vertical',
  ...props
}, ref) => {
  const uniqueId = useId()

  // Generate unique ID using React's useId hook with optional name prefix
  const generateId = (): string => {
    const prefix = name || 'textarea'
    return `textarea-${prefix}-${uniqueId}`
  }

  const textareaId = generateId()

  // Build textarea-specific attributes
  const textareaSpecificProps: Record<string, unknown> = {}
  
  if (rows !== undefined) textareaSpecificProps.rows = rows
  if (cols !== undefined) textareaSpecificProps.cols = cols
  if (minLength !== undefined) textareaSpecificProps.minLength = minLength
  if (maxLength !== undefined) textareaSpecificProps.maxLength = maxLength
  if (wrap !== undefined) textareaSpecificProps.wrap = wrap

  // Handle resize styling
  const resizeClass = {
    'none': 'resize-none',
    'both': 'resize',
    'horizontal': 'resize-x',
    'vertical': 'resize-y'
  }[resize]

  const baseClassName = `min-h-[1em] w-full block flex-1 border bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm ${resizeClass}`
  const finalClassName = `${baseClassName} ${className}`.trim()

  return (
    <textarea
      ref={ref}
      id={textareaId}
      className={finalClassName}
      placeholder={placeholder}
      name={name}
      {...textareaSpecificProps}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
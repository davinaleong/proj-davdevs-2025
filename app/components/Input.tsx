'use client'

import { useState, forwardRef, useId } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type InputType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  | 'date' | 'datetime-local' | 'month' | 'time' | 'week'
  | 'color' | 'file' | 'range' | 'checkbox' | 'radio' | 'hidden'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  type?: InputType
  className?: string
  name?: string
  // Type-specific attributes
  minLength?: number
  maxLength?: number
  min?: string | number
  max?: string | number
  step?: string | number
  pattern?: string
  accept?: string // for file inputs
  multiple?: boolean // for file inputs
  checked?: boolean // for checkbox/radio
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  className = '',
  name,
  minLength,
  maxLength,
  min,
  max,
  step,
  pattern,
  accept,
  multiple,
  checked,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)
  const uniqueId = useId()

  // Generate unique ID using React's useId hook with optional name/type prefix
  const generateId = (): string => {
    const prefix = name || type
    return `input-${prefix}-${uniqueId}`
  }

  const inputId = generateId()

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    setInputType(showPassword ? 'password' : 'text')
  }

  // Build type-specific attributes
  const typeSpecificProps: Record<string, unknown> = {}
  
  if (type === 'number' || type === 'range') {
    if (min !== undefined) typeSpecificProps.min = min
    if (max !== undefined) typeSpecificProps.max = max
    if (step !== undefined) typeSpecificProps.step = step
  }
  
  if (type === 'text' || type === 'email' || type === 'password' || type === 'tel' || type === 'url' || type === 'search') {
    if (minLength !== undefined) typeSpecificProps.minLength = minLength
    if (maxLength !== undefined) typeSpecificProps.maxLength = maxLength
    if (pattern !== undefined) typeSpecificProps.pattern = pattern
  }
  
  if (type === 'file') {
    if (accept !== undefined) typeSpecificProps.accept = accept
    if (multiple !== undefined) typeSpecificProps.multiple = multiple
  }
  
  if (type === 'checkbox' || type === 'radio') {
    if (checked !== undefined) typeSpecificProps.checked = checked
  }

  const baseClassName = "min-h-[1em] w-full block flex-1 bg-white dark:bg-black border-none"
  const finalClassName = `${baseClassName} ${className}`.trim()

  // Special rendering for checkbox and radio
  if (type === 'checkbox' || type === 'radio') {
    return (
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`w-4 h-4 ${className}`.trim()}
        name={name}
        {...typeSpecificProps}
        {...props}
      />
    )
  }

  return (
    <div className="relative">
      <input
        ref={ref}
        id={inputId}
        type={type === 'password' ? inputType : type}
        className={finalClassName}
        placeholder={placeholder}
        name={name}
        {...typeSpecificProps}
        {...props}
      />
      
      {/* Password visibility toggle */}
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
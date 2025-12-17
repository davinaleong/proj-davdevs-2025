'use client'

import React, { useState, forwardRef, useId } from 'react'
import { Eye, EyeOff, Check } from 'lucide-react'
import Button from './Button'

type InputType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  | 'date' | 'datetime-local' | 'month' | 'time' | 'week'
  | 'color' | 'file' | 'range' | 'checkbox' | 'radio' | 'hidden'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  type?: InputType
  className?: string
  name?: string
  variant?: 'white' | 'black' | 'blue-500' | 'blue-adaptive' // for checkbox/radio styling
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
  variant = 'blue-adaptive',
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
  const [internalChecked, setInternalChecked] = useState(checked || props.defaultChecked || false)
  const uniqueId = useId()

  // Generate unique ID using React's useId hook with optional name/type prefix
  const generateId = (): string => {
    const prefix = name || type
    return `input-${prefix}-${uniqueId}`
  }

  const inputId = generateId()
  
  // Listen for external changes to radio buttons in the same group
  React.useEffect(() => {
    if (type === 'radio' && name) {
      const handleRadioChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.name === name && target !== document.getElementById(inputId)) {
          // Another radio in our group was selected, uncheck this one
          if (!checked) { // Only update if we're not controlled
            setInternalChecked(false)
          }
        }
      }
      
      document.addEventListener('change', handleRadioChange)
      return () => document.removeEventListener('change', handleRadioChange)
    }
  }, [type, name, inputId, checked])

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

  const baseClassName = "min-h-[1em] w-full block flex-1 bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm"
  const finalClassName = `${baseClassName} ${className}`.trim()

  // Get variant-specific styling for checkbox/radio
  const getVariantStyles = () => {
    const variants = {
      'white': {
        background: 'bg-white',
        border: 'border-gray-300 dark:border-gray-600',
        checkColor: 'text-black',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-100'
      },
      'black': {
        background: 'bg-black dark:bg-white',
        border: 'border-gray-700 dark:border-gray-300', 
        checkColor: 'text-white dark:text-black',
        hoverBg: 'hover:bg-gray-900 dark:hover:bg-gray-100'
      },
      'blue-500': {
        background: 'bg-blue-500',
        border: 'border-blue-500',
        checkColor: 'text-white',
        hoverBg: 'hover:bg-blue-600'
      },
      'blue-adaptive': {
        background: 'bg-blue-700 dark:bg-blue-300',
        border: 'border-blue-700 dark:border-blue-300',
        checkColor: 'text-white dark:text-black',
        hoverBg: 'hover:bg-blue-800 dark:hover:bg-blue-400'
      }
    }
    return variants[variant]
  }

  // Special rendering for checkbox and radio
  if (type === 'checkbox' || type === 'radio') {
    const styles = getVariantStyles()
    // Use controlled vs uncontrolled pattern
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked
    
    const handleClick = () => {
      // Simply trigger the native input click to get proper radio/checkbox behavior
      const nativeInput = document.getElementById(inputId) as HTMLInputElement
      if (nativeInput) {
        nativeInput.click()
      }
    }
    
    return (
      <div className="relative inline-flex">
        {/* Hidden native input for form functionality */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className="sr-only"
          name={name}
          checked={isChecked}
          onChange={(e) => {
            const newChecked = e.target.checked
            
            // Update internal state for uncontrolled components
            if (!isControlled) {
              setInternalChecked(newChecked)
            }
            
            // Call original onChange if provided
            if (props.onChange) {
              props.onChange(e)
            }
          }}
          {...typeSpecificProps}
          {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'onChange'))}
        />
        {/* Custom styled checkbox/radio */}
        <div 
          className={`
            relative inline-flex items-center justify-center
            w-[1em] h-[1em] text-[1em]
            border-2 cursor-pointer transition-all duration-200
            ${type === 'checkbox' ? 'rounded' : 'rounded-full'}
            ${isChecked 
              ? `${styles.background} ${styles.border} ${styles.hoverBg}` 
              : `bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800`
            }
            ${className}
          `}
          onClick={handleClick}
        >
          {isChecked && (
            type === 'checkbox' ? (
              <Check 
                size="0.7em" 
                className={styles.checkColor}
                strokeWidth={3}
              />
            ) : (
              <div 
                className={`w-[0.4em] h-[0.4em] rounded-full ${styles.checkColor === 'text-white' ? 'bg-white' : styles.checkColor === 'text-black' ? 'bg-black' : styles.checkColor === 'text-white dark:text-black' ? 'bg-white dark:bg-black' : 'bg-current'}`}
              />
            )
          )}
        </div>
      </div>
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
        <Button
          type="button"
          onClick={togglePasswordVisibility}
          variant="icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </Button>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
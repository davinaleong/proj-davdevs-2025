'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type InputType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  | 'date' | 'datetime-local' | 'month' | 'time' | 'week'
  | 'color' | 'file' | 'range' | 'checkbox' | 'radio' | 'hidden'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  type?: InputType
  label?: string
  required?: boolean
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
  label,
  placeholder,
  required = false,
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

  // Generate smart defaults based on input type
  const getSmartLabel = (inputType: InputType): string => {
    const labels: Record<InputType, string> = {
      text: 'Text',
      email: 'Email Address',
      password: 'Password',
      number: 'Number',
      tel: 'Phone Number',
      url: 'Website URL',
      search: 'Search',
      date: 'Date',
      'datetime-local': 'Date and Time',
      month: 'Month',
      time: 'Time',
      week: 'Week',
      color: 'Color',
      file: 'File',
      range: 'Range',
      checkbox: 'Checkbox',
      radio: 'Radio',
      hidden: 'Hidden'
    }
    return labels[inputType] || 'Input'
  }

  const getSmartPlaceholder = (inputType: InputType): string => {
    const placeholders: Record<InputType, string> = {
      text: 'Enter text',
      email: 'example@domain.com',
      password: 'Enter your password',
      number: 'Enter number',
      tel: '+1 (555) 123-4567',
      url: 'https://example.com',
      search: 'Search...',
      date: 'YYYY-MM-DD',
      'datetime-local': 'YYYY-MM-DDTHH:MM',
      month: 'YYYY-MM',
      time: 'HH:MM',
      week: 'YYYY-W##',
      color: '#000000',
      file: 'Choose file',
      range: '',
      checkbox: '',
      radio: '',
      hidden: ''
    }
    return placeholders[inputType] || ''
  }

  // Generate ID from name or type
  const generateId = (): string => {
    if (name) return `input-${name}`
    return `input-${type}`
  }

  const finalLabel = label || getSmartLabel(type)
  const finalPlaceholder = placeholder || getSmartPlaceholder(type)
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
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-4 h-4 ${className}`.trim()}
          required={required}
          name={name}
          {...typeSpecificProps}
          {...props}
        />
        <label htmlFor={inputId} className="text-sm font-medium cursor-pointer">
          {finalLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {/* Label */}
      <label htmlFor={inputId} className="text-sm font-medium">
        {finalLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Input Container */}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={type === 'password' ? inputType : type}
          className={finalClassName}
          placeholder={finalPlaceholder}
          required={required}
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
    </div>
  )
})

Input.displayName = 'Input'

export default Input
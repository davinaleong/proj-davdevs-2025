'use client'

import React from 'react'

interface TabProps {
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function Tab({ 
  children, 
  isActive = false, 
  onClick, 
  className = '', 
  disabled = false 
}: TabProps) {
  const baseClasses = 'border bg-white dark:bg-black rounded-sm px-3 py-2'
  const activeClasses = isActive 
    ? 'border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100'
    : 'text-blue-500 border-blue-500'
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer hover:opacity-80'

  return (
    <button
      type="button"
      className={`${baseClasses} ${activeClasses} ${disabledClasses} ${className}`.trim()}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
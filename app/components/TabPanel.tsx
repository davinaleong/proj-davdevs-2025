'use client'

import React from 'react'

interface TabPanelProps {
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

export default function TabPanel({ 
  children, 
  className = '', 
  isActive = true 
}: TabPanelProps) {
  if (!isActive) {
    return null
  }

  return (
    <div className={`border bg-white border-gray-200 dark:bg-black dark:border-gray-800 rounded-sm p-6 ${className}`.trim()}>
      {children}
    </div>
  )
}
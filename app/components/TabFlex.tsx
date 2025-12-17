'use client'

import React from 'react'

interface TabFlexProps {
  children: React.ReactNode
  className?: string
}

export default function TabFlex({ children, className = '' }: TabFlexProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto scrollbar-hide ${className}`.trim()}>
      {children}
    </div>
  )
}
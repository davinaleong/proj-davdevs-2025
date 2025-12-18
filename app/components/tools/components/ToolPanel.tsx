'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ToolPanelProps {
  children: React.ReactNode
  title: string
  description: string
  icon: LucideIcon
  iconClassName?: string
  className?: string
  maxWidth?: string
}

export default function ToolPanel({
  children,
  title,
  description,
  icon: Icon,
  iconClassName = "text-blue-500",
  className = "",
  maxWidth = "max-w-6xl"
}: ToolPanelProps) {
  return (
    <article className={`p-6 ${maxWidth} mx-auto border bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm ${className}`}>
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-sm">
          <Icon size={24} className={iconClassName} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold opacity-75">
            {title}
          </h2>
          <p className="text-sm opacity-75">
            {description}
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {children}
      </div>
    </article>
  )
}
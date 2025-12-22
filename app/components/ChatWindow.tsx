'use client'

import { ReactNode } from 'react'
import Panel from './Panel'

interface ChatWindowProps {
  children: ReactNode
  isOpen: boolean
}

export default function ChatWindow({ children, isOpen }: ChatWindowProps) {
  if (!isOpen) return null
  
  return (
    <Panel 
      className="fixed z-40 bottom-20 right-4 w-100 md:w-150 h-200 flex flex-col gap-4 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700" 
      overwrite={true}
    >
      {children}
    </Panel>
  )
}
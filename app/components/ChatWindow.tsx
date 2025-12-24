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
      className="fixed z-40 bottom-4 right-4 left-4 sm:left-auto sm:right-4 w-full sm:w-80 md:w-96 lg:w-md max-w-lg h-64 sm:h-80 md:h-96 max-h-[80vh] flex flex-col gap-4 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg" 
      overwrite={true}
    >
      {children}
    </Panel>
  )
}
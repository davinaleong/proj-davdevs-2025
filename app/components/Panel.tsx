import { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
  className?: string
}

export default function Panel({ children, className = "" }: PanelProps) {
  return (
    <div className={`border bg-white border-gray-200 dark:bg-black dark:border-gray-800 rounded-sm p-6 ${className}`.trim()}>
      {children}
    </div>
  )
}
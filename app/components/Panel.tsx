import { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
  className?: string
  overwrite?: boolean
}

export default function Panel({ children, className, overwrite = false }: PanelProps) {
  const defaultClasses = "border bg-white border-gray-200 dark:bg-black dark:border-gray-800 rounded-sm p-6"
  
  return (
    <div className={overwrite ? (className || defaultClasses) : `${defaultClasses} ${className || ""}`.trim()}>
      {children}
    </div>
  )
}
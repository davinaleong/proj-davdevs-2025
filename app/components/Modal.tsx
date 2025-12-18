'use client'

import { ReactNode, useEffect } from "react"
import { X } from "lucide-react"
import Button from "./Button"
import Panel from "./Panel"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  showCloseButton?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  variant?: 'default' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ 
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = 'default',
  size = 'md'
}: ModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-md'
      case 'md': return 'max-w-lg' 
      case 'lg': return 'max-w-2xl'
      case 'xl': return 'max-w-4xl'
      default: return 'max-w-lg'
    }
  }

  const getConfirmVariant = () => {
    switch (variant) {
      case 'danger': return 'danger'
      case 'success': return 'success'
      default: return 'primary'
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 grid place-items-center bg-black/50 p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <Panel className={`relative w-full ${getSizeClasses()} min-h-[200px] max-h-[90vh] flex flex-col gap-6 overflow-y-auto`}>
        {showCloseButton && (
          <Button 
            type="button" 
            className="absolute top-4 right-4 z-10" 
            variant="icon"
            onClick={onClose}
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={20} />
          </Button>
        )}

        <header className="pr-12">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
        </header>

        <article className="flex-1 overflow-y-auto">
          {children}
        </article>

        {(confirmText || onConfirm || onCancel) && (
          <footer className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
            {(confirmText || onConfirm) && (
              <Button
                type="button"
                variant={getConfirmVariant()}
                onClick={onConfirm}
              >
                {confirmText || 'Confirm'}
              </Button>
            )}
          </footer>
        )}
      </Panel>
    </div>
  )
}
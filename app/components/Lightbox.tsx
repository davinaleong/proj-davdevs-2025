'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button'
import ImageDisplay from './ImageDisplay'

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  image: LightboxImage;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl max-h-full">
        <Button
          variant="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
        >
          <X size={24} />
        </Button>
        
        <ImageDisplay
          src={image.src}
          alt={image.alt}
          aspectRatio="landscape"
          width={800}
          height={600}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  )
}
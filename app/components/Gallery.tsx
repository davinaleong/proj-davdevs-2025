'use client'

import { useState } from 'react'
import Button from './Button'
import ImageDisplay from './ImageDisplay'
import Lightbox from './Lightbox'

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  maxDisplay?: number;
}

export default function Gallery({ images, maxDisplay = 4 }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  
  const displayImages = images.slice(0, maxDisplay)
  
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }
  
  const handleCloseLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayImages.map((image, index) => (
          <Button
            key={index}
            variant="gallery"
            onClick={() => handleImageClick(image)}
            className="p-0 overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
          >
            <ImageDisplay
              src={image.src}
              alt={image.alt}
              aspectRatio="square"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </Button>
        ))}
      </div>
      
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  )
}
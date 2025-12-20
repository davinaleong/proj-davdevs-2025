'use client'

import Button from './Button'
import ImageDisplay from './ImageDisplay'

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  postType: string;
  maxDisplay?: number;
  onImageClick?: (image: GalleryImage) => void;
}

export default function Gallery({ images, postType, maxDisplay = 9, onImageClick }: GalleryProps) {
  const displayImages = images.slice(0, maxDisplay)
  const imageCount = displayImages.length
  
  const handleImageClick = (image: GalleryImage) => {
    if (onImageClick) {
      onImageClick(image)
    }
  }

  // Determine grid layout based on image count
  const getGridClasses = () => {
    if (imageCount === 1) return ''
    if (imageCount >= 2 && imageCount <= 4) return 'grid grid-cols-2'
    return 'grid grid-cols-3'
  }

  // Determine aspect ratio based on count and post type
  const getAspectRatio = () => {
    if (imageCount === 1) {
      return postType === 'articles' ? 'square' : 'landscape'
    }
    return 'square'
  }

  const aspectRatio = getAspectRatio()
  const dimensions = aspectRatio === 'square' ? { width: 300, height: 300 } : { width: 600, height: 400 }

  return (
    <div className={getGridClasses()}>
      {displayImages.map((image, index) => (
        <Button
          key={index}
          variant="image"
          onClick={() => handleImageClick(image)}
        >
          <ImageDisplay
            src={image.src}
            alt={image.alt}
            aspectRatio={aspectRatio}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-full object-cover"
          />
        </Button>
      ))}
    </div>
  )
}
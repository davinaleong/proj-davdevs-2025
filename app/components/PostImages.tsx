'use client'

import { useState } from 'react'
import Button from './Button'
import ImageDisplay from './ImageDisplay'
import Gallery from './Gallery'
import Lightbox from './Lightbox'

interface PostImage {
  src: string;
  alt: string;
}

interface PostImagesProps {
  images: PostImage[];
  postType: string;
}

export default function PostImages({ images, postType }: PostImagesProps) {
  const [selectedImage, setSelectedImage] = useState<PostImage | null>(null)

  const handleImageClick = (image: PostImage) => {
    setSelectedImage(image)
  }

  const handleCloseLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="rounded-sm overflow-hidden">
        {images.length === 1 ? (
          <div className="flex justify-center">
            <Button
              variant="image"
              onClick={() => handleImageClick(images[0])}
              className="rounded-lg"
            >
              <ImageDisplay
                src={images[0].src}
                alt={images[0].alt}
                aspectRatio={postType === 'articles' ? 'square' : 'landscape'}
                width={postType === 'articles' ? 600 : 800}
                height={postType === 'articles' ? 600 : 500}
                className="rounded-lg"
              />
            </Button>
          </div>
        ) : (
          <Gallery 
            images={images} 
            postType={postType} 
            maxDisplay={9}
            onImageClick={handleImageClick}
          />
        )}
      </div>
      
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          postType={postType}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  )
}
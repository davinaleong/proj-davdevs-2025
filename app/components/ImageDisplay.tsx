import Image from 'next/image'
import PlaceholderLandscape from './../assets/images/placeholders/placeholder-landscape.svg'
import PlaceholderSquare from './../assets/images/placeholders/placeholder-square.svg'

interface ImageDisplayProps {
  src?: string;
  alt: string;
  aspectRatio: 'landscape' | 'square';
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageDisplay({
  src,
  alt,
  aspectRatio,
  width = 600,
  height = 400,
  className = ""
}: ImageDisplayProps) {
  // Select appropriate placeholder based on aspect ratio
  const defaultPlaceholder = aspectRatio === 'landscape' ? PlaceholderLandscape : PlaceholderSquare;
  
  // Use provided src or fall back to placeholder
  const imageSrc = src || defaultPlaceholder;
  
  // Adjust dimensions for square aspect ratio
  const finalWidth = aspectRatio === 'square' ? Math.max(width, height) : width;
  const finalHeight = aspectRatio === 'square' ? Math.max(width, height) : height;
  
  // Apply aspect ratio classes
  const aspectClass = aspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square';
  
  return (
    <div className={`w-full ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        className={`w-full h-full object-cover ${aspectClass}`}
      />
    </div>
  );
}
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import PlaceholderLandscape from './../assets/images/placeholder-landscape.svg'
import PlaceholderSquare from './../assets/images/placeholder-square.svg'

interface CardProps {
  // Content
  title: string;
  description?: string;
  content?: string | ReactNode;
  footerText?: string;
  
  // Image
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAspectRatio?: 'landscape' | 'square';
  
  // Featured flag
  featured?: boolean;
  
  // Links and Actions
  href?: string;
  external?: boolean;
  clickable?: boolean;
  
  // Styling
  className?: string;
  showImage?: boolean;
  showFooter?: boolean;
}

export default function Card({ 
  title,
  description,
  content,
  footerText,
  imageSrc,
  imageAlt = title,
  imageWidth = 600,
  imageHeight = 400,
  imageAspectRatio = 'landscape',
  featured = false,
  href,
  external = false,
  clickable = false,
  className = "",
  showImage = true,
  showFooter = true
}: CardProps) {
  
  const getFeaturedBadgeStyles = () => {
    return "text-white bg-orange-500 text-sm px-3 py-1";
  };

  const getCardStyles = () => {
    const baseStyles = "bg-gray-100 dark:bg-slate-900 border rounded-sm overflow-hidden max-w-sm shadow-md";
    const borderStyle = featured ? "border-orange-500" : "border-gray-200 dark:border-gray-700";
    return `${baseStyles} ${borderStyle} ${className}`;
  };



  const renderImage = () => {
    if (!showImage) return null;
    
    const defaultPlaceholder = imageAspectRatio === 'landscape' ? PlaceholderLandscape : PlaceholderSquare;
    const imgSrc = imageSrc || defaultPlaceholder;
    const aspectClass = imageAspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square';
    
    return (
      <div className="w-full">
        <Image 
          src={imgSrc} 
          alt={imageAlt} 
          width={imageWidth} 
          height={imageHeight} 
          className={`w-full h-full object-cover ${aspectClass}`} 
        />
      </div>
    );
  };

  const renderContent = () => (
    <div className="flex-1">
      {featured && (
        <div className={getFeaturedBadgeStyles()}>Featured</div>
      )}
      
      <header className="p-3">
        <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h4>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        )}
      </header>
      
      {content && (
        <div className="px-3 pb-3">
          {typeof content === 'string' ? (
            <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
              {content}
            </p>
          ) : (
            content
          )}
        </div>
      )}
      
      {showFooter && footerText && (
        <footer className="px-3 pb-3 mt-auto">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {footerText}
          </span>
        </footer>
      )}
    </div>
  );

  const cardContent = (
    <article className={`${getCardStyles()} ${clickable || href ? ' cursor-pointer hover:opacity-80 transition-shadow' : ''}`}>
      {renderImage()}
      {renderContent()}
    </article>
  );

  if (href) {
    const linkProps = external 
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    
    return (
      <Link href={href} {...linkProps} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
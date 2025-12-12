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
  variant?: 'default' | 'minimal' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  
  // Layout
  imagePosition?: 'top' | 'left' | 'right';
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
  variant = 'default',
  size = 'md',
  imagePosition = 'top',
  showImage = true,
  showFooter = true
}: CardProps) {
  
  const getFeaturedBadgeStyles = () => {
    return "text-white bg-blue-500 text-sm px-3 py-1";
  };

  const getCardStyles = () => {
    const baseStyles = "bg-gray-100 dark:bg-slate-900 border rounded-sm overflow-hidden";
    const variants = {
      default: "border-blue-500 shadow-md",
      minimal: "border-gray-200 dark:border-gray-700",
      elevated: "border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
    };
    const sizes = {
      sm: "max-w-xs",
      md: "max-w-sm", 
      lg: "max-w-md"
    };
    return `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  };

  const getLayoutStyles = () => {
    if (imagePosition === 'left' || imagePosition === 'right') {
      return imagePosition === 'left' ? "flex flex-row" : "flex flex-row-reverse";
    }
    return "";
  };

  const renderImage = () => {
    if (!showImage) return null;
    
    const defaultPlaceholder = imageAspectRatio === 'landscape' ? PlaceholderLandscape : PlaceholderSquare;
    const imgSrc = imageSrc || defaultPlaceholder;
    const aspectClass = imageAspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square';
    const widthClass = imagePosition !== 'top' ? 'w-32 flex-shrink-0' : 'w-full';
    
    return (
      <div className={`${widthClass} ${imagePosition !== 'top' ? 'h-32' : ''}`}>
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
    <div className={`flex-1 ${imagePosition !== 'top' ? 'flex flex-col' : ''}`}>
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
    <article className={`${getCardStyles()} ${getLayoutStyles()} ${clickable || href ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}>
      {imagePosition === 'top' && renderImage()}
      {imagePosition !== 'top' && (
        <>
          {renderImage()}
          {renderContent()}
        </>
      )}
      {imagePosition === 'top' && renderContent()}
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
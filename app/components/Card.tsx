import Link from 'next/link'
import { ComponentProps } from 'react'
import ImageDisplay from './ImageDisplay'

type ImageProps = Omit<ComponentProps<typeof ImageDisplay>, 'alt'> & {
  alt?: string;
};

interface CardProps {
  // Content
  title: string;
  description?: string;
  footerText?: string;
  
  // Image
  imageProps?: ImageProps;
  
  // Featured flag
  featured?: boolean;
  
  // Variants
  highlighted?: boolean;
  
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
  footerText,
  imageProps,
  featured = false,
  highlighted = false,
  href,
  external = false,
  clickable = false,
  className = "",
  showImage = true,
  showFooter = true
}: CardProps) {
  
  const getFeaturedBadgeStyles = () => {
    return "upper text-sm text-white bg-orange-500";
  };

  const getCardStyles = () => {
    if (highlighted) {
      const borderStyle = featured ? "border-orange-500" : "border-white";
      const highlightedStyles = `text-white bg-blue-500 border ${borderStyle} rounded-sm overflow-hidden shadow-lg flex flex-col h-full`;
      return `${highlightedStyles} ${className}`;
    }
    
    const baseStyles = "bg-gray-100 dark:bg-slate-900 border rounded-sm overflow-hidden shadow-lg flex flex-col h-full";
    const borderStyle = featured ? "border-orange-500" : "border-blue-500";
    return `${baseStyles} ${borderStyle} ${className}`;
  };



  const renderImage = () => {
    if (!showImage || !imageProps) return null;
    
    const { alt, aspectRatio = "landscape", ...restImageProps } = imageProps;
    
    return (
      <ImageDisplay 
        alt={alt || title}
        aspectRatio={aspectRatio}
        {...restImageProps}
      />
    );
  };

  const renderContent = () => (
    <div className="flex-1">
      {featured && (
        <div className={getFeaturedBadgeStyles()}>Featured</div>
      )}
      
      <header className="flow p-2">
        <h4 className={`text-lg line-clamp-1 font-bold ${highlighted ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </h4>
      </header>

      {description && (
        <p className={`text-sm p-2 ${highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
          {description}
        </p>
      )}
      
      {showFooter && footerText && (
        <footer className="p-2">
          <p className={`text-xs ${highlighted ? 'text-white/75' : 'text-gray-500 dark:text-gray-400'}`}>
            {footerText}
          </p>
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
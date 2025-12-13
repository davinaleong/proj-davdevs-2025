import Link from 'next/link'
import { ReactNode, ComponentProps } from 'react'
import ImageDisplay from './ImageDisplay'

type ImageProps = Omit<ComponentProps<typeof ImageDisplay>, 'alt'> & {
  alt?: string;
};

interface CardProps {
  // Content
  title: string;
  description?: string;
  content?: string | ReactNode;
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
  content,
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
    return "text-white bg-orange-500 text-sm px-3 py-1";
  };

  const getCardStyles = () => {
    if (highlighted) {
      const borderStyle = featured ? "border-orange-500" : "border-white";
      const highlightedStyles = `bg-blue-500 border ${borderStyle} rounded-sm overflow-hidden max-w-sm shadow-md`;
      return `${highlightedStyles} ${className}`;
    }
    
    const baseStyles = "bg-gray-100 dark:bg-slate-900 border rounded-sm overflow-hidden max-w-sm shadow-md";
    const borderStyle = featured ? "border-orange-500" : "border-gray-200 dark:border-gray-700";
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
      
      <header className="p-3">
        <h4 className={`text-lg font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </h4>
        {description && (
          <p className={`text-sm ${highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
            {description}
          </p>
        )}
      </header>
      
      {content && (
        <div className="px-3 pb-3">
          {typeof content === 'string' ? (
            <p className={`text-sm leading-relaxed ${highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-200'}`}>
              {content}
            </p>
          ) : (
            content
          )}
        </div>
      )}
      
      {showFooter && footerText && (
        <footer className="px-3 pb-3 mt-auto">
          <span className={`text-xs ${highlighted ? 'text-white/75' : 'text-gray-500 dark:text-gray-400'}`}>
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
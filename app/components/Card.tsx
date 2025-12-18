import Link from 'next/link'
import { ComponentProps } from 'react'
import ImageDisplay from './ImageDisplay'
import { PostSummary } from '../utils/content'
import { getDateFormatConfig } from '../utils/site-config'

type ImageProps = Omit<ComponentProps<typeof ImageDisplay>, 'alt'> & {
  alt?: string;
};

interface CardProps {
  // Post data
  post: PostSummary;
  
  // Image
  imageProps?: ImageProps;
  
  // Variants
  highlighted?: boolean;
  
  // Links and Actions
  baseHref?: string;
  external?: boolean;
  clickable?: boolean;
  
  // Styling
  className?: string;
  showImage?: boolean;
  showFooter?: boolean;
}

export default function Card({ 
  post,
  imageProps,
  highlighted = false,
  baseHref,
  external = false,
  clickable = false,
  className = "",
  showImage = true,
  showFooter = true
}: CardProps) {
  
  const getFeaturedBadgeStyles = () => {
    return "uppercase text-sm text-white bg-orange-500 p-1";
  };

  const getCardStyles = () => {
    if (highlighted) {
      const borderStyle = post?.featured ? "border-orange-500" : "border-white";
      const highlightedStyles = `text-white bg-blue-500 border ${borderStyle} rounded-sm overflow-hidden shadow-lg flex flex-col h-full`;
      return `${highlightedStyles} ${className}`;
    }
    
    const baseStyles = "bg-gray-100 dark:bg-slate-900 border rounded-sm overflow-hidden shadow-lg flex flex-col h-full";
    const borderStyle = post?.featured ? "border-orange-500" : "border-blue-500";
    return `${baseStyles} ${borderStyle} ${className}`;
  };

  const renderImage = () => {
    if (!showImage) return null;
    
    // Use post images first, then fall back to imageProps
    if (post?.images && post.images.length > 0) {
      const firstImage = post.images[0];
      return (
        <ImageDisplay 
          src={firstImage.src}
          alt={firstImage.alt}
          aspectRatio="landscape"
        />
      );
    }
    
    if (!imageProps) return null;
    
    const { alt, aspectRatio = "landscape", ...restImageProps } = imageProps;
    
    return (
      <ImageDisplay 
        alt={alt || post?.title || 'Image'}
        aspectRatio={aspectRatio}
        {...restImageProps}
      />
    );
  };

  const renderContent = () => {
    const dateConfig = getDateFormatConfig()
    const formattedDate = new Date(post?.date || new Date()).toLocaleDateString(
      dateConfig.locale, 
      dateConfig.options as Intl.DateTimeFormatOptions
    );
    
    return (
      <div className="flex-1">
        {post?.featured && (
          <div className={getFeaturedBadgeStyles()}>Featured</div>
        )}
        
        <header className="flow p-2">
          <h4 className={`text-lg line-clamp-1 font-bold ${highlighted ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
            {post?.title || 'Untitled'}
          </h4>
        </header>

        {post?.description && (
          <p className={`text-sm p-2 ${highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
            {post.description}
          </p>
        )}
        
        {showFooter && (
          <footer className="p-2">
            <p className={`text-xs ${highlighted ? 'text-white/75' : 'text-gray-500 dark:text-gray-400'}`}>
              {formattedDate}
            </p>
          </footer>
        )}
      </div>
    );
  };

  const href = baseHref && post?.slug ? `${baseHref}/${post.slug}` : undefined;
  
  const cardContent = (
    <article className={`${getCardStyles()} ${clickable || href ? ' cursor-pointer hover:opacity-60 transition-shadow' : ''}`}>
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
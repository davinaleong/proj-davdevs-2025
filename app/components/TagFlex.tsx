import { ReactNode, ComponentProps } from 'react'
import Tag from "./Tag"

interface TagData extends Omit<ComponentProps<typeof Tag>, 'children'> {
  label: string;
}

interface TagFlexProps {
  // Option 1: Pass children directly
  children?: ReactNode;
  
  // Option 2: Pass array of tag data
  tags?: TagData[] | string[];
  
  // Styling options
  className?: string;
  
  // Interaction
  onTagClick?: (tag: string | TagData, index: number) => void;
}

export default function TagFlex({ 
  children,
  tags,
  className = "",
  onTagClick
}: TagFlexProps) {
  const containerClasses = `flex flex-wrap gap-2 ${className} print:hidden`;

  // If children are provided, use them directly
  if (children) {
    return (
      <div className={containerClasses}>
        {children}
      </div>
    );
  }

  // If tags array is provided, render tags from data
  if (tags && tags.length > 0) {
    return (
      <div className={containerClasses}>
        {tags.map((tag, index) => {
          // Handle string array
          if (typeof tag === 'string') {
            return (
              <Tag 
                key={`${tag}-${index}`}
                clickable={!!onTagClick}
                onClick={() => onTagClick?.(tag, index)}
              >
                {tag}
              </Tag>
            );
          }
          
          // Handle TagData object array
          return (
            <Tag
              key={`${tag.label}-${index}`}
              clickable={tag.clickable}
              onClick={() => {
                tag.onClick?.();
                onTagClick?.(tag, index);
              }}
              className={tag.className}
            >
              {tag.label}
            </Tag>
          );
        })}
      </div>
    );
  }

  // Empty state
  return <div className={containerClasses} />;
}
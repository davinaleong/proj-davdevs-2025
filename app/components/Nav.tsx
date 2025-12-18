import React, { ReactElement, cloneElement } from 'react'
import LinkButton from './LinkButton'
import Anchor from './Anchor'

interface NavProps {
  children: ReactElement | ReactElement[];
  separator?: ReactElement | string;
  justify?: 'start' | 'center' | 'end';
  fullWidth?: boolean;
  className?: string;
}

export default function Nav({ 
  children, 
  separator,
  justify = 'center',
  fullWidth = false,
  className = ""
}: NavProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  };

  const childrenArray = React.Children.toArray(children) as ReactElement[];
  
  const renderChildren = (): ReactElement[] => {
    if (fullWidth) {
      // For full width, apply flex-1 to each child and space evenly
      return childrenArray.map((child, index) => {
        const existingClassName = (child.props as { className?: string })?.className || '';
        return cloneElement(child, {
          key: index,
          ...(child.props as Record<string, unknown>),
          className: `${existingClassName} flex-1 text-center`.trim()
        } as Record<string, unknown>);
      });
    } else {
      // Regular rendering with separators
      const result: ReactElement[] = [];
      
      childrenArray.forEach((child, index) => {
        result.push(cloneElement(child, { key: index }));
        
        // Add separator between items (but not after the last item)
        if (separator && index < childrenArray.length - 1) {
          if (typeof separator === 'string') {
            result.push(<span key={`sep-${index}`} className="text-gray-400">{separator}</span>);
          } else {
            result.push(cloneElement(separator, { key: `sep-${index}` }));
          }
        }
      });
      
      return result;
    }
  };

  const navClasses = `
    flex flex-wrap items-center
    ${fullWidth ? 'w-full' : justifyClasses[justify]}
    ${fullWidth ? 'divide-x divide-gray-200 dark:divide-gray-700' : 'gap-2'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <nav className={navClasses}>
      {renderChildren()}
    </nav>
  );
}

// Re-export child components for convenience
Nav.LinkButton = LinkButton;
Nav.Anchor = Anchor;
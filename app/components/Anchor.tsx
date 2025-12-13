import Link from 'next/link'
import { ReactNode } from 'react'

interface AnchorProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  variant?: 'default' | 'primary';
}

export default function Anchor({ 
  children, 
  href, 
  external = false,
  className = "",
  variant = 'default'
}: AnchorProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return "underline text-white dark:text-black hover:opacity-80 transition-opacity";
      case 'primary':
      default:
        return "underline text-blue-500 hover:opacity-80 dark:text-blue-300 transition-opacity";
    }
  };
  
  const anchorClasses = `${getVariantClasses()} ${className}`;

  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} {...linkProps} className={anchorClasses}>
      {children}
    </Link>
  );
}
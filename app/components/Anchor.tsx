import Link from 'next/link'
import { ReactNode } from 'react'

interface AnchorProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  variant?: 'white' | 'black' | 'blue-500' | 'blue-300';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Anchor({ 
  children, 
  href, 
  external = false,
  className = "",
  variant = 'blue-500',
  onClick
}: AnchorProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'white':
        return "underline text-white hover:opacity-60";
      case 'black':
        return "underline text-black hover:opacity-60";
      case 'blue-500':
        return "underline text-blue-500 hover:opacity-60";
      case 'blue-300':
        return "underline text-blue-300 hover:opacity-60";
      default:
        return "underline text-blue-500 hover:opacity-60";
    }
  };
  
  const anchorClasses = `${getVariantClasses()} ${className}`;

  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} {...linkProps} className={anchorClasses} onClick={onClick}>
      {children}
    </Link>
  );
}
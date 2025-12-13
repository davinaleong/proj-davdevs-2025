import Link from 'next/link'
import { ReactNode } from 'react'

interface AnchorProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}

export default function Anchor({ 
  children, 
  href, 
  external = false,
  className = ""
}: AnchorProps) {
  const baseClasses = "underline text-blue-500 hover:opacity-80 dark:text-blue-300 transition-opacity";
  const anchorClasses = `${baseClasses} ${className}`;

  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} {...linkProps} className={anchorClasses}>
      {children}
    </Link>
  );
}
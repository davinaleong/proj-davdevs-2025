import Link from 'next/link'
import { ReactNode } from 'react'

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  disabled?: boolean;
}



export default function LinkButton({ 
  children, 
  href, 
  external = false,
  className = "",
  disabled = false
}: LinkButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 rounded-sm shadow-sm font-medium px-4 py-2 text-base text-white bg-blue-500 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const buttonClasses = `${baseClasses} ${disabledClasses} ${className}`;

  if (disabled) {
    return (
      <span className={buttonClasses}>
        {children}
      </span>
    );
  }

  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} {...linkProps} className={buttonClasses}>
      {children}
    </Link>
  );
}
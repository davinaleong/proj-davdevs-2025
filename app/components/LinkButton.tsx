import { ReactNode } from 'react'
import Link from 'next/link'
import { PulseOnHover } from './animations'

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
  const baseClasses = "inline-flex items-center gap-2 rounded-sm shadow-sm font-medium px-4 py-2 text-base text-white bg-blue-500 hover:bg-blue-600";
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
      <PulseOnHover>
        {children}
      </PulseOnHover>
    </Link>
  );
}
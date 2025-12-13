'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 cursor-pointer rounded-sm shadow-lg p-2";
  
  const variantClasses = {
    primary: "text-white bg-blue-500 hover:opacity-80",
    secondary: "text-blue-500 bg-white hover:opacity-80"
  };
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <button 
      type={type}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
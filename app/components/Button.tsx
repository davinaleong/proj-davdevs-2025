'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'gray';
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
  const baseClasses = "inline-flex items-center gap-2 cursor-pointer rounded-sm hover:opacity-60 p-2";
  
  const variantClasses = {
    primary: "text-white bg-blue-500",
    secondary: "text-blue-500 bg-white border border-blue-500",
    success: "text-white bg-green-500",
  danger: "text-white bg-red-500",
    gray: "text-white bg-gray-500"
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
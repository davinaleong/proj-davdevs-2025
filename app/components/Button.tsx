'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children,
  type = 'button',
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 text-white bg-blue-500 hover:opacity-80 cursor-pointer rounded-sm shadow-lg p-2";
  const disabledClasses = disabled 
    ? "bg-gray-500 opacity-50 cursor-not-allowed pointer-events-none" 
    : "";

  const buttonClasses = `${baseClasses} ${disabledClasses} ${className}`;

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
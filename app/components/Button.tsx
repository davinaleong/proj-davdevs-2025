'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'gray' | 'calc-number' | 'calc-function' | 'calc-operation' | 'icon';
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
  const baseClasses = "flex items-center gap-2 cursor-pointer rounded-sm hover:opacity-60 p-2";
  
  const variantClasses = {
    primary: "text-white bg-blue-500",
    secondary: "text-blue-500 bg-gray-50 dark:bg-gray-950 border border-blue-500",
    success: "text-white bg-green-500",
    danger: "text-white bg-red-500",
    gray: "text-white bg-gray-500",
    'calc-number': "font-semibold bg-gray-100 dark:bg-gray-900 text-black dark:text-white",
    'calc-function': "font-semibold bg-gray-200 dark:bg-gray-800 text-black dark:text-white",
    'calc-operation': "bg-blue-300 dark:bg-blue-700 text-black dark:text-white",
    icon: "border border-white dark:border-black text-blue-500 hover:border-blue-500 hover:opacity-60 p-1 bg-transparent"
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
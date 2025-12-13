import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export default function Tag({ 
  children,
  className = "",
  clickable = false,
  onClick
}: TagProps) {
  const baseClasses = "inline-flex items-center text-sm px-2.5 py-1 font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition-colors";
  const interactionClasses = clickable || onClick 
    ? "cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1" 
    : "";

  const tagClasses = `${baseClasses} ${interactionClasses} ${className}`;

  if (clickable || onClick) {
    return (
      <button
        type="button"
        className={tagClasses}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={tagClasses}>
      {children}
    </span>
  );
}
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'neutral' | 'primary-dark' | 'primary-light';
  position?: 'left' | 'center' | 'right';
  className?: string;
}

export default function Section({ 
  children, 
  variant = 'default',
  position = 'center',
  className = ""
}: SectionProps) {
  const variantClasses = {
    default: '',
    primary: 'text-white bg-blue-500',
    neutral: 'text-black bg-slate-100 dark:text-white dark:bg-slate-900',
    'primary-dark': 'text-white bg-blue-700',
    'primary-light': 'text-black bg-blue-300 dark:text-white dark:bg-blue-700'
  };

  const positionClasses = {
    left: 'flex items-center justify-start',
    center: 'flex items-center justify-center',
    right: 'flex items-center justify-end'
  };

  return (
    <section className={`min-h-screen ${positionClasses[position]} ${variantClasses[variant]} ${className}`}>
      <div>
        {children}
      </div>
    </section>
  );
}
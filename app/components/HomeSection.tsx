import Link from 'next/link'
import { ReactNode } from 'react'

interface HomeSectionProps {
  children: ReactNode;
  title: string;
  linkHref?: string;
  linkText?: string;
  variant?: 'default' | 'neutral' | 'primary' | 'primary-dark' | 'primary-light';
  className?: string;
}

export default function HomeSection({ 
  children, 
  title, 
  linkHref, 
  linkText = "View all",
  variant = 'default',
  className = ""
}: HomeSectionProps) {
    const variantClasses = {
        default: '',
        neutral: 'bg-slate-100 dark:bg-slate-900',
        primary: 'bg-blue-500',
        'primary-dark': 'bg-blue-700',
        'primary-light': 'bg-blue-300 dark:bg-blue-700'
    };

    return (
        <section className={`flow ${variantClasses[variant]} ${className}`}>
            <h2 className="font-medium text-center text-2xl lg:text-4xl p-4">{title}</h2>

            <>{children}</>

            {linkHref && (
                <p className="text-center p-4">
                    <Link href={linkHref} className="underline text-blue-500 hover:opacity-80 dark:text-blue-300">
                        {linkText}
                    </Link>
                </p>
            )}
        </section>
    )
}
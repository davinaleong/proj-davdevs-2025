import Link from 'next/link'
import { ReactNode } from 'react'

interface HomeSectionProps {
  children: ReactNode;
  title: string;
  linkHref?: string;
  linkText?: string;
  variant?: 'default' | 'alt' | 'highlighted';
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
        alt: 'bg-slate-100 dark:bg-slate-900',
        highlighted: 'bg-blue-500 dark:bg-blue-300'
    };

    return (
        <section className={`flow ${variantClasses[variant]} ${className}`}>
            <h2 className="font-medium text-center text-2xl lg:text-4xl p-4">{title}</h2>

            <>{children}</>

            {linkHref && (
                <p className="text-center p-4">
                    <Link href={linkHref} className="text-blue-500 hover:opacity-80 dark:text-blue-300">
                        {linkText}
                    </Link>
                </p>
            )}
        </section>
    )
}
import { ReactNode } from 'react'

interface CardGridProps {
    children: ReactNode;
    className?: string;
}

export default function CardGrid({ children, className = "" }: CardGridProps) {
    return (
        <div className={`container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch p-4 ${className}`}>
            {children}
        </div>
    )
}
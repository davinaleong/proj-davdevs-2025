import { ReactNode, ComponentProps } from 'react'
import Anchor from './Anchor'

type AnchorProps = ComponentProps<typeof Anchor>;

interface HomeSectionProps {
  children: ReactNode;
  title: string;
  anchorProps?: AnchorProps;
  variant?: 'default' | 'neutral' | 'primary' | 'primary-dark' | 'primary-light';
  className?: string;
}

export default function HomeSection({ 
  children, 
  title, 
  anchorProps,
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

            {anchorProps && (
                <p className="text-center p-4">
                    <Anchor {...anchorProps} />
                </p>
            )}
        </section>
    )
}
import { ReactNode, ComponentProps } from 'react'
import Anchor from './Anchor'

type AnchorProps = ComponentProps<typeof Anchor>;

interface HomeSectionProps {
  children: ReactNode;
  title: string;
  anchorProps?: AnchorProps;
  variant?: 'default' | 'neutral' | 'primary' | 'primary-dark' | 'primary-light';
  className?: string;
  id?: string;
}

export default function HomeSection({ 
  children, 
  title, 
  anchorProps,
  variant = 'default',
  className = "",
  id
}: HomeSectionProps) {
    const variantClasses = {
        default: '',
        neutral: 'bg-slate-100 dark:bg-slate-900',
        primary: 'text-white bg-blue-500',
        'primary-dark': 'text-white bg-blue-700',
        'primary-light': 'text-black bg-blue-300 dark:text-white dark:bg-blue-700'
    };

    const getAnchorVariant = (): 'white' | 'black' | 'blue-500' | 'blue-300' => {
        switch (variant) {
            case 'default':
            case 'neutral':
                return 'blue-500';
            case 'primary-light':
                return 'black';
            case 'primary':
            case 'primary-dark':
                return 'white';
            default:
                return 'black';
        }
    };

    const getAnchorDarkModeClass = () => {
        switch (variant) {
            case 'default':
            case 'neutral':
                return 'dark:!text-blue-300';
            case 'primary-light':
                return 'dark:!text-white';
            case 'primary':
            case 'primary-dark':
                return '';
            default:
                return 'dark:!text-blue-300';
        }
    };

    return (
        <section id={id} className={`${variantClasses[variant]} ${className}`}>
            <h2 className="font-medium text-center text-2xl lg:text-4xl p-6">{title}</h2>

            <>{children}</>

            {anchorProps && (
                <p className="text-center p-6">
                    <Anchor 
                        {...anchorProps} 
                        variant={getAnchorVariant()}
                        className={getAnchorDarkModeClass()}
                    />
                </p>
            )}
        </section>
    )
}
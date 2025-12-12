import { Menu } from "lucide-react"

interface MenuButtonProps {
    onClick?: () => void;
    className?: string;
    iconSize?: number;
    disabled?: boolean;
    ariaLabel?: string;
}

export default function MenuButton({ 
    onClick, 
    className = "", 
    iconSize = 24, 
    disabled = false,
    ariaLabel = "Open menu"
}: MenuButtonProps) {
    return (
        <button 
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
                inline-flex items-center justify-center 
                p-2 rounded-md 
                text-gray-600 dark:text-gray-300
                hover:text-gray-900 hover:bg-gray-100 
                dark:hover:text-white dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
                ${className}
            `}
        >
            <Menu size={iconSize} />
        </button>
    )
}
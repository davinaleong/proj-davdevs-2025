import { X } from "lucide-react"

interface CloseButtonProps {
    onClick?: () => void;
    className?: string;
    iconSize?: number;
    disabled?: boolean;
    ariaLabel?: string;
    position?: "absolute" | "relative";
    variant?: "default" | "ghost" | "danger";
}

export default function CloseButton({ 
    onClick, 
    className = "", 
    iconSize = 20, 
    disabled = false,
    ariaLabel = "Close",
    position = "absolute",
    variant = "default"
}: CloseButtonProps) {
    const getVariantClasses = () => {
        const variants = {
            default: "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700",
            ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
            danger: "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        }
        return variants[variant]
    }

    const positionClasses = position === "absolute" ? "absolute top-4 right-4" : ""

    return (
        <button 
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
                inline-flex items-center justify-center 
                p-2 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
                ${getVariantClasses()}
                ${positionClasses}
                ${className}
            `}
        >
            <X size={iconSize} />
        </button>
    )
}
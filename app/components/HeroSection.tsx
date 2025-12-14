import { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import Link from 'next/link'

interface HeroProps {
    children?: ReactNode;
    className?: string;
    showArrow?: boolean;
    arrowHref?: string;
    variant?: "gradient" | "responsive";
    height?: "full" | "half";
    id?: string;
}

export default function HeroSection({ 
    children, 
    className = "", 
    showArrow = true,
    arrowHref = "#",
    variant = "gradient",
    height = "full",
    id
}: HeroProps) {
    
    const getVariantClasses = () => {
        switch (variant) {
            case "gradient":
                return "bg-gradient-to-br from-blue-500 to-blue-700 text-white";
            case "responsive":
                return "bg-blue-300 text-black dark:bg-blue-700 dark:text-white";
            default:
                return "bg-gradient-to-br from-blue-500 to-blue-700 text-white";
        }
    };

    const getHeightClasses = () => {
        switch (height) {
            case "half":
                return "min-h-[50vh]";
            case "full":
            default:
                return "min-h-screen";
        }
    };

    return (
      <section id={id} className={`${getHeightClasses()} grid place-items-center p-4 ${getVariantClasses()} ${className}`}>
        <div className="container mx-auto text-center flow">
          {children}
          {showArrow && (
            <div className="mt-12 animate-bounce">
              <Link href={arrowHref} scroll={true} className="block">
                <ChevronDown 
                  size={32} 
                  className="mx-auto cursor-pointer transition-colors text-white hover:text-gray-200"
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    )
}
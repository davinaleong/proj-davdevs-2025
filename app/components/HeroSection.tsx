import { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import Link from 'next/link'

interface HeroProps {
    children?: ReactNode;
    className?: string;
    showArrow?: boolean;
    arrowHref?: string;
    variant?: "gradient" | "responsive" | "bg-image";
    height?: "full" | "half";
    id?: string;
    bgImage?: string;
}

export default function HeroSection({ 
    children, 
    className = "", 
    showArrow = true,
    arrowHref = "#",
    variant = "gradient",
    height = "full",
    id,
    bgImage
}: HeroProps) {
    
    const getVariantClasses = () => {
        switch (variant) {
            case "gradient":
                return "bg-gradient-to-br from-blue-500 to-blue-700 text-white";
            case "responsive":
                return "bg-blue-300 text-black dark:bg-blue-700 dark:text-white";
            case "bg-image":
                return "bg-cover bg-center bg-no-repeat text-white";
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

    const sectionStyle = variant === "bg-image" && bgImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImage})`
    } : {};

    return (
      <section 
        id={id} 
        className={`${getHeightClasses()} grid place-items-center p-4 ${getVariantClasses()} ${className}`}
        style={sectionStyle}
      >
        <div className="container mx-auto text-center flow">
          {children}
          {showArrow && (
            <div className="text-center animate-bounce">
              <Link href={arrowHref} scroll={true} className="block">
                <ChevronDown 
                  size={32} 
                  className="mx-auto cursor-pointer transition-colors hover:opacity-60 print:hidden"
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    )
}
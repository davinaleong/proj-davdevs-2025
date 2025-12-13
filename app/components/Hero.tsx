import { ReactNode } from "react"
import { ChevronDown } from "lucide-react"

interface HeroProps {
    children?: ReactNode;
    className?: string;
    showArrow?: boolean;
    arrowColor?: "white" | "black" | "blue-500" | "blue-100";
    onArrowClick?: () => void;
}

export default function Hero({ 
    children, 
    className = "", 
    showArrow = true, 
    arrowColor = "blue-500",
    onArrowClick 
}: HeroProps) {
    const getArrowColorClass = () => {
        const colorMap = {
            white: "text-white hover:text-gray-200",
            black: "text-black hover:text-gray-800",
            "blue-500": "text-blue-500 hover:text-blue-600",
            "blue-100": "text-blue-100 hover:text-blue-200"
        }
        return colorMap[arrowColor]
    }

    return (
      <section className={`min-h-screen grid place-items-center p-4 ${className}`}>
        <div className="max-w-[60ch] mx-auto text-center flow">
          {children ? children : (
            <>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">Dav/Devs</h1>
              <p>Designing with purpose.<br/>Building with code. Living by faith.</p>
            </>
          )}
          {showArrow && (
            <div className="mt-12 animate-bounce">
              <ChevronDown 
                size={32} 
                className={`mx-auto cursor-pointer transition-colors ${getArrowColorClass()}`}
                onClick={onArrowClick}
              />
            </div>
          )}
        </div>
      </section>
    )
}
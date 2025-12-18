import Link from 'next/link'
import Image from 'next/image'
import { getBrandLink } from "../utils/links"

import Logo from "./../assets/images/logos/logo.svg"

interface BrandProps {
    className?: string;
    logoSize?: number;
    showText?: boolean;
}

export default function Brand({ 
    className = "", 
    logoSize = 16, 
    showText = true 
}: BrandProps) {
    const brandLink = getBrandLink();
    
    return (
        <Link 
            href={brandLink.href}
            className={`flex items-center gap-2 text-blue-500 dark:text-blue-100 ${className}`}
        >
            <Image src={Logo} alt="Dav/Devs Logo" width={logoSize} height={logoSize} />
            {showText && (
                <span className="uppercase font-bold">Dav/Devs</span>
            )}
        </Link>
    )
}
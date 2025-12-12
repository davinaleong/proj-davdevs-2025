import Link from "next/link"
import CloseButton from "./CloseButton"
import { getNavigationLinks, getLinkProps, type LinkItem } from "../utils/links"

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
    const navigationLinks = getNavigationLinks();

    const renderNavigationLink = (link: LinkItem) => {
        const linkProps = getLinkProps(link);
        
        return (
            <li key={link.href}>
                <Link 
                    href={link.href}
                    className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={onClose}
                    {...linkProps}
                >
                    {link.label}
                </Link>
            </li>
        );
    };
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}
            
            {/* Sliding Menu */}
            <aside className={`
                fixed top-0 right-0 min-h-screen w-80 max-w-[90vw] 
                shadow-lg p-4 bg-slate-100 dark:bg-gray-900 z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <CloseButton 
                    onClick={onClose}
                    className="mb-4"
                />

                <nav>
                    <ul className="space-y-2">
                        {navigationLinks.map(renderNavigationLink)}
                    </ul>
                </nav>
            </aside>
        </>
    )
}
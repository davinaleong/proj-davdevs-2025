import Anchor from "./Anchor"
import CloseButton from "./CloseButton"
import { getNavigationLinks, type LinkItem } from "../utils/site-config"

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
    const navigationLinks = getNavigationLinks();

    const renderNavigationLink = (link: LinkItem) => {
        return (
            <li key={link.href}>
                <Anchor 
                    href={link.href}
                    external={link.external}
                    variant="menu"
                    onClick={onClose}
                >
                    {link.label}
                </Anchor>
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
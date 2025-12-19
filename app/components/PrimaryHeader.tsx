import { Smile, Search, Menu } from 'lucide-react'

import Brand from "./Brand"
import Button from "./Button"
import ThemeSwitcherButton from "./ThemeSwitcherButton"
import Anchor from './Anchor'
import Nav from './Nav'
import { getNavigationLinks, type LinkItem } from "../utils/site-config"

interface PrimaryHeaderProps {
    onMenuOpen?: () => void;
    onSearchOpen?: () => void;
}

export default function PrimaryHeader({ onMenuOpen, onSearchOpen }: PrimaryHeaderProps) {
    const navigationLinks = getNavigationLinks();
    
    const renderNavigationLink = (link: LinkItem) => {
        return (
            <li key={link.href}>
                <Anchor 
                    href={link.href}
                    external={link.external}
                    variant="header"
                >
                    {link.label}
                </Anchor>
            </li>
        );
    };

    return (
        <header className="sticky top-0 flex items-center justify-between gap-2 md:gap-8 p-2 bg-slate-100 dark:bg-gray-900 z-30 print:hidden">
            <Brand/>
            <Nav className="hidden md:flex bg-linear-to-r from-slate-100 via-slate-300 to-slate-100 dark:from-gray-900 dark:via-gray-700 dark:to-gray-900 py-2 rounded-sm">
                <ul className="flex-2 flex items-center gap-4 max-w-50 overflow-x-auto">
                    {navigationLinks.map(renderNavigationLink)}
                </ul>
            </Nav>
            <Button 
                onClick={onSearchOpen}
                variant="secondary"
                className="flex-1 justify-start px-3 py-2"
            >
                <Search size={16} />
                <span className="text-gray-500 dark:text-gray-400">Search...</span>
            </Button>
            <ThemeSwitcherButton />
            <Anchor 
                href="/tools" 
                variant="header"
            >
                <Smile size={16} />
            </Anchor>
            <Button 
                onClick={onMenuOpen}
                variant="header"
            >
                <Menu size={24} />
            </Button>
        </header>
    )
}
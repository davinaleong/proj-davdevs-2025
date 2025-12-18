import Link from 'next/link'
import { Smile, Search } from 'lucide-react'

import Brand from "./Brand"
import Button from "./Button"
import MenuButton from "./MenuButton"
import ThemeSwitcherButton from "./ThemeSwitcherButton"

interface PrimaryHeaderProps {
    onMenuOpen?: () => void;
    onSearchOpen?: () => void;
}

export default function PrimaryHeader({ onMenuOpen, onSearchOpen }: PrimaryHeaderProps) {
    return (
        <header className="sticky top-0 flex items-center justify-between gap-2 p-2 bg-slate-100 dark:bg-gray-900 z-30 print:hidden">
            <Brand/>
            <Button 
                onClick={onSearchOpen}
                variant="secondary"
                className="flex-1 justify-start"
                title="Open search modal"
            >
                <Search size={16} />
                <span className="text-gray-500 dark:text-gray-400">Search...</span>
            </Button>
            <ThemeSwitcherButton />
            <Link 
                href="/tools" 
                className="hover:opacity-60"
                title="Browse developer tools"
            >
                <Smile size={16} />
            </Link>
            <MenuButton onClick={onMenuOpen} />
        </header>
    )
}
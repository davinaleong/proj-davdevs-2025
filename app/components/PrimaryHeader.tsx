import Anchor from './Anchor'
import { Smile, Search, Menu } from 'lucide-react'

import Brand from "./Brand"
import Button from "./Button"
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
                className="flex-1 justify-start px-3 py-2"
            >
                <Search size={16} />
                <span className="text-gray-500 dark:text-gray-400">Search...</span>
            </Button>
            <>Nav goes here</>
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
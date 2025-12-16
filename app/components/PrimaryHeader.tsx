import Link from 'next/link'
import { Smile } from 'lucide-react'

import Brand from "./Brand"
import SearchInput from "./SearchInput"
import MenuButton from "./MenuButton"
import ThemeSwitcherButton from "./ThemeSwitcherButton"

interface PrimaryHeaderProps {
    onMenuOpen?: () => void;
}

export default function PrimaryHeader({ onMenuOpen }: PrimaryHeaderProps) {
    return (
        <header className="sticky top-0 flex items-center justify-between gap-2 p-2 bg-slate-100 dark:bg-gray-900 z-30 print:hidden">
            <Brand/>
            <SearchInput 
                className="flex-1" 
                showAutocomplete={true}
                placeholder="Search sermons, pages, navigation..."
            />
            <ThemeSwitcherButton />
            <Link 
                href="/funny" 
                className="hover:opacity-80"
                title="Go to jokes page"
            >
                <Smile size={16} />
            </Link>
            <MenuButton onClick={onMenuOpen} />
        </header>
    )
}
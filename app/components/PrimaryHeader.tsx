import Link from 'next/link'
import { Smile } from 'lucide-react'

import Brand from "./Brand"
import SearchInput from "./SearchInput"
import MenuButton from "./MenuButton"

interface PrimaryHeaderProps {
    onMenuOpen?: () => void;
}

export default function PrimaryHeader({ onMenuOpen }: PrimaryHeaderProps) {
    return (
        <header className="sticky top-0 flex items-center justify-between gap-2 p-2 bg-slate-100 dark:bg-gray-900 z-30">
            <Brand/>
            <SearchInput 
                className="flex-1" 
                showAutocomplete={true}
                placeholder="Search sermons, pages, navigation..."
            />
            <Link 
                href="/funny" 
                className="hover:opacity-80"
                title="Go to jokes page"
            >
                <Smile className="w-5 h-5" />
            </Link>
            <MenuButton onClick={onMenuOpen} />
        </header>
    )
}
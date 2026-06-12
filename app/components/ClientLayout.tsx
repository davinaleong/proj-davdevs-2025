"use client"

import { useState, ReactNode } from "react"
import { usePathname } from "next/navigation"
import PrimaryHeader from "./PrimaryHeader"
import PrimaryFooter from "./PrimaryFooter"
import Menu from "./Menu"
import SearchModal from "./SearchModal"
import Chatbot from "./Chatbot"

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname()
    const isSitePage = !pathname.startsWith("/ebooks/")

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const showChatbot = process.env.NODE_ENV !== "production"

    const openMenu = () => setIsMenuOpen(true)
    const closeMenu = () => setIsMenuOpen(false)
    const openSearch = () => setIsSearchOpen(true)
    const closeSearch = () => setIsSearchOpen(false)

    if (!isSitePage) return <>{children}</>

    return (
        <>
            <PrimaryHeader onMenuOpen={openMenu} onSearchOpen={openSearch} />
            <main className="relative">
                {children}
            </main>
            <Menu isOpen={isMenuOpen} onClose={closeMenu} />
            <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
            {showChatbot && <Chatbot />}
            <PrimaryFooter />
        </>
    )
}
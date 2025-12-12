"use client"

import { useState, ReactNode } from "react"
import PrimaryHeader from "./PrimaryHeader"
import PrimaryFooter from "./PrimaryFooter"
import Menu from "./Menu"

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = () => setIsMenuOpen(true)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            <PrimaryHeader onMenuOpen={openMenu} />
            <main className="relative">
                {children}
            </main>
            <Menu isOpen={isMenuOpen} onClose={closeMenu} />
            <PrimaryFooter />
        </>
    )
}
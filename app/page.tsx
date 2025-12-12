
"use client"

import { useState } from "react"
import PrimaryHeader from "./components/PrimaryHeader"
import Menu from "./components/Menu"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="relative min-h-screen">
      <PrimaryHeader onMenuOpen={openMenu} />
      
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dav/Devs</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Click the menu button in the header to open the sliding navigation menu.
        </p>
      </main>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

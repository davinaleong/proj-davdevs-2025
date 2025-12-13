'use client'

import { Search as SearchIcon } from "lucide-react"
import { useState, useRef, FormEvent } from "react"

interface SearchInputProps {
    onSearch?: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({ 
    onSearch, 
    placeholder = "", 
    className = "" 
}: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm.trim())
        }
    }

    const handleFocusInput = () => {
        inputRef.current?.focus()
    }

    return (
        <form 
            className={`flex items-center gap-2 bg-white dark:bg-blue-300 rounded-sm overflow-hidden ${className}`}
            onSubmit={handleSubmit}
        >
            <label 
                htmlFor="input-search" 
                className="px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-800"
                onClick={handleFocusInput}
            >
                Search
            </label>
            <input 
                ref={inputRef}
                type="text" 
                id="input-search" 
                className="flex-1 px-2 py-2 bg-transparent border-none outline-none text-gray-900 dark:text-gray-800"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                type="submit"
                className="px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-800 hover:text-blue-600 transition-colors"
                onClick={handleFocusInput}
                aria-label="Search"
            >
                <SearchIcon size={16} />
            </button>
        </form>
    )
}
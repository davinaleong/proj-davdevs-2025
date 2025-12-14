'use client'

import { Search as SearchIcon } from "lucide-react"
import { useState, useRef, FormEvent } from "react"

interface SearchInputProps {
    onSearch?: (searchTerm: string) => void;
    onSearchChange?: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({ 
    onSearch, 
    onSearchChange,
    placeholder = "", 
    className = "" 
}: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (onSearch) {
            onSearch(searchTerm.trim())
        }
    }

    const handleInputChange = (value: string) => {
        setSearchTerm(value)
        if (onSearchChange) {
            onSearchChange(value)
        }
    }

    const handleFocusInput = () => {
        inputRef.current?.focus()
    }

    return (
        <form 
            className={`flex items-center gap-2 text-black bg-white dark:bg-blue-300 rounded-sm overflow-hidden ${className}`}
            onSubmit={handleSubmit}
        >
            <label 
                htmlFor="input-search" 
                className="px-3 py-2 cursor-pointer"
                onClick={handleFocusInput}
            >
                Search
            </label>
            <input 
                ref={inputRef}
                type="text" 
                id="input-search" 
                className="flex-1 px-2 py-2 bg-transparent border-none outline-none"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
            />
            <button
                type="submit"
                className="px-3 py-2"
                onClick={handleFocusInput}
            >
                <SearchIcon size={16} />
            </button>
        </form>
    )
}
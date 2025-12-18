'use client'

import { Search as SearchIcon, X } from "lucide-react"
import { useState, useRef, FormEvent, useEffect } from "react"
import { searchResults, SearchResult } from "../utils/search"
import { getAllSearchResults } from "../utils/search-server"
import SearchAutocomplete from "./SearchAutocomplete"

interface SearchInputProps {
    onSearch?: (searchTerm: string) => void;
    onSearchChange?: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
    showAutocomplete?: boolean;
}

export default function SearchInput({ 
    onSearch, 
    onSearchChange,
    placeholder = "Search site...", 
    className = "",
    showAutocomplete = true
}: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResultsData, setSearchResultsData] = useState<SearchResult[]>([])
    const [allSearchData, setAllSearchData] = useState<SearchResult[]>([])
    const [showResults, setShowResults] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (onSearch) {
            onSearch(searchTerm.trim())
        }
        setShowResults(false)
    }

    const handleInputChange = (value: string) => {
        setSearchTerm(value)
        if (onSearchChange) {
            onSearchChange(value)
        }
        
        // Perform live search for autocomplete
        if (showAutocomplete && allSearchData.length > 0) {
            setIsSearching(true)
            if (value.trim()) {
                const results = searchResults(value, allSearchData)
                setSearchResultsData(results)
                setShowResults(true)
            } else {
                setSearchResultsData([])
                setShowResults(false)
            }
            setIsSearching(false)
        }
    }

    const handleClearSearch = () => {
        setSearchTerm("")
        setSearchResultsData([])
        setShowResults(false)
        inputRef.current?.focus()
    }

    const handleResultClick = () => {
        setShowResults(false)
        setSearchTerm("")
    }

    // Load search data on component mount
    useEffect(() => {
        const loadSearchData = async () => {
            try {
                const data = await getAllSearchResults()
                setAllSearchData(data)
            } catch (error) {
                console.error('Failed to load search data:', error)
            }
        }
        
        loadSearchData()
    }, [])

    const handleFocusInput = () => {
        inputRef.current?.focus()
    }

    // Handle clicks outside to close autocomplete
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <form 
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-950 rounded-sm overflow-hidden"
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
                    name="search"
                    autoComplete="off"
                    role="searchbox"
                    aria-label="Search site content"
                    className="flex-1 px-2 py-2 bg-transparent border-none outline-none"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => {
                        if (searchTerm.trim() && showAutocomplete) {
                            setShowResults(true)
                        }
                    }}
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="px-2 py-2 hover:opacity-70"
                        onClick={handleClearSearch}
                        title="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
                <button
                    type="submit"
                    className="px-3 py-2 hover:opacity-70"
                    title="Search"
                >
                    <SearchIcon size={16} />
                </button>
            </form>
            
            {showAutocomplete && (
                <SearchAutocomplete
                    results={searchResultsData}
                    isVisible={showResults}
                    onResultClick={handleResultClick}
                />
            )}
        </div>
    )
}
'use client'

import { useState, useMemo } from 'react'
import { PostSummary, PostType } from '../utils/content'
import ListHeader from "./ListHeader"
import ListFooter from "./ListFooter"
import CardGrid from "./CardGrid"
import Card from "./Card"
import sortOptions from '../config/sort-options.json'

interface PostsListProps {
    posts: PostSummary[]
    postType: PostType
    searchPlaceholder?: string
    baseHref?: string
}

export default function PostsList({ 
    posts, 
    postType, 
    searchPlaceholder,
    baseHref 
}: PostsListProps) {
    // Get default sort value from config
    const defaultSortValue = sortOptions.groups
        .flatMap(group => group.options)
        .find(option => option.value === 'newest')?.value || 'newest'
        
    const [searchTerm, setSearchTerm] = useState("")
    const [sortValue, setSortValue] = useState(defaultSortValue)
    const [currentPage, setCurrentPage] = useState(1)
    
    const ITEMS_PER_PAGE = 24

    // Default values
    const defaultSearchPlaceholder = searchPlaceholder || `Search ${postType}...`
    const defaultBaseHref = baseHref || `/${postType}`

    // Filter and sort posts
    const filteredAndSortedPosts = useMemo(() => {
        let filtered = posts

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchLower) ||
                post.description.toLowerCase().includes(searchLower) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchLower))
            )
        }

        // Sort function mapping
        const sortFunctions: Record<string, (a: PostSummary, b: PostSummary) => number> = {
            'asc': (a, b) => a.title.localeCompare(b.title),
            'desc': (a, b) => b.title.localeCompare(a.title),
            'oldest': (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            'newest': (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        }

        // Apply sorting
        const sortFunction = sortFunctions[sortValue] || sortFunctions[defaultSortValue]
        const sorted = [...filtered].sort(sortFunction)

        return sorted
    }, [posts, searchTerm, sortValue, defaultSortValue])

    // Calculate pagination
    const totalItems = filteredAndSortedPosts.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

    // Handle search
    const handleSearch = (term: string) => {
        setSearchTerm(term)
        setCurrentPage(1) // Reset to first page when searching
    }

    // Handle sort change
    const handleSortChange = (value: string) => {
        setSortValue(value)
        setCurrentPage(1) // Reset to first page when sorting changes
    }

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <>
            <ListHeader 
                onSearch={handleSearch}
                searchPlaceholder={defaultSearchPlaceholder}
                sortValue={sortValue}
                onSortChange={handleSortChange}
            />
            <CardGrid>
                {currentPosts.map((post) => (
                    <Card 
                        key={post.slug}
                        title={post.title}
                        description={post.description}
                        href={`${defaultBaseHref}/${post.slug}`}
                        featured={post.featured}
                        footerText={new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    />
                ))}
            </CardGrid>
            <ListFooter 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-4"
            />
        </>
    )
}
'use client'

import { useState, useMemo } from 'react'
import { PostSummary, PostType } from '../utils/content'
import ListHeader from "./ListHeader"
import ListFooter from "./ListFooter"
import CardGrid from "./CardGrid"
import Card from "./Card"

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
    const [searchTerm, setSearchTerm] = useState("")
    const [sortValue, setSortValue] = useState("newest")
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

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            switch (sortValue) {
                case 'asc':
                    return a.title.localeCompare(b.title)
                case 'desc':
                    return b.title.localeCompare(a.title)
                case 'oldest':
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                case 'newest':
                default:
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
            }
        })

        return sorted
    }, [posts, searchTerm, sortValue])

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
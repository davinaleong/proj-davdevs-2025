"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

export interface EBook {
    slug: string
    title: string
    description: string
    coverImage: string
}

type SortDirection = "asc" | "desc"

interface SortOption {
    value: string
    label: string
    key: keyof EBook
    direction: SortDirection
}

// Generic, extensible sort options. Alphabetical (Title A–Z) is the default.
const SORT_OPTIONS: SortOption[] = [
    { value: "title-asc", label: "Title (A–Z)", key: "title", direction: "asc" },
    { value: "title-desc", label: "Title (Z–A)", key: "title", direction: "desc" },
]

const DEFAULT_SORT = "title-asc"

function sortBooks(books: EBook[], option: SortOption): EBook[] {
    const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true })
    const factor = option.direction === "asc" ? 1 : -1
    return [...books].sort((a, b) =>
        factor * collator.compare(String(a[option.key]), String(b[option.key]))
    )
}

export default function EBooksGrid({ books }: { books: EBook[] }) {
    const [sortValue, setSortValue] = useState(DEFAULT_SORT)

    const sortedBooks = useMemo(() => {
        const option = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0]
        return sortBooks(books, option)
    }, [books, sortValue])

    return (
        <>
            <div className="flex items-center justify-end gap-2 mb-8">
                <label htmlFor="ebook-sort" className="text-sm opacity-60">
                    Sort by
                </label>
                <select
                    id="ebook-sort"
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    className="text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {sortedBooks.map((book) => (
                    <li key={book.slug}>
                        <Link
                            href={`/ebooks/${book.slug}`}
                            className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-2/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={book.coverImage}
                                    alt={`Cover of ${book.title}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-semibold text-lg mb-1">{book.title}</h2>
                                <p className="text-sm opacity-60">{book.description}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "E-Books",
    description: "Browse e-books published by Davina Leong.",
}

interface EBook {
    slug: string
    title: string
    description: string
    coverImage: string
}

const ebooks: EBook[] = [
    {
        slug: "carried-by-grace",
        title: "Carried by Grace",
        description: "A personal journey of faith, grace, and growth.",
        coverImage: "/books/carried-by-grace/0001.png",
    },
]

export default function EBooksPage() {
    return (
        <main className="min-h-screen py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-1 text-sm opacity-50 hover:opacity-100 transition-opacity mb-8">
                    ← Back to Dav/Devs
                </Link>
                <h1 className="text-4xl font-bold mb-4">E-Books</h1>
                <p className="text-lg mb-12 opacity-70">
                    A collection of published works — each with its own story and design.
                </p>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {ebooks.map((book) => (
                        <li key={book.slug}>
                            <Link
                                href={`/ebooks/${book.slug}`}
                                className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
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
            </div>
        </main>
    )
}

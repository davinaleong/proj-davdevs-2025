import Link from "next/link"
import type { Metadata } from "next"
import EBooksGrid, { type EBook } from "./EBooksGrid"

export const metadata: Metadata = {
    title: "E-Books",
    description: "Browse e-books published by Davina Leong.",
}

const ebooks: EBook[] = [
    {
        slug: "carried-guided-held",
        title: "Carried, Guided, Held",
        description: "A trio of encouragement — three e-books gathered into one gift bundle.",
        coverImage: "/books/carried-guided-held/0007.png",
    },
    {
        slug: "daddy-god-is-for-you",
        title: "Daddy God is for You",
        description: "He is not the enemy. He is your Father. A short, Scripture-rooted book.",
        coverImage: "/books/daddy-god-is-for-you/0001.png",
    },
    {
        slug: "carried-by-grace",
        title: "Carried by Grace",
        description: "A personal journey of faith, grace, and growth.",
        coverImage: "/books/carried-by-grace/0001.png",
    },
    {
        slug: "jesus-and-ai",
        title: "Jesus & AI",
        description: "Faith, intelligence, and the future — a biblical lens on artificial intelligence.",
        coverImage: "/books/jesus-and-ai/0001.png",
    },
    {
        slug: "scrolls-for-the-screen-generation",
        title: "Scrolls for the Screen Generation",
        description: "A six-volume devotional series for those living in a screen-saturated world.",
        coverImage: "/books/scrolls-for-the-screen-generation/0000.png",
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
                <EBooksGrid books={ebooks} />
            </div>
        </main>
    )
}

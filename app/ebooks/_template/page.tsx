import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Book Title",
}

export default function BookLandingPage() {
    return (
        <main>
            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20">
                <div className="max-w-5xl mx-auto grid gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Cover */}
                    <div className="flex justify-center">
                        <img
                            src="/books/YOUR-BOOK-SLUG/0001.png"
                            alt="Book Title — Cover"
                            className="w-64 lg:w-80 shadow-2xl"
                        />
                    </div>

                    {/* Copy */}
                    <div className="text-center lg:text-left">
                        <p className="book-prose text-sm uppercase tracking-widest mb-4 opacity-60">
                            A new release
                        </p>
                        <h1 className="book-heading text-5xl lg:text-7xl mb-6 leading-tight">
                            Book Title
                        </h1>
                        <p className="book-prose text-lg mb-10">
                            A short, evocative tagline or opening hook for the book.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <a href="#get-the-book" className="book-btn-primary">
                                Get the Book
                            </a>
                            <a href="#about" className="book-btn-outline">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── About ─────────────────────────────────────────── */}
            <section id="about" className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <hr className="book-divider mb-16" />
                    <h2 className="book-heading text-4xl lg:text-5xl mb-8">
                        About the Book
                    </h2>
                    <p className="book-prose text-lg mb-6">
                        Full description of the book. Who is it for? What will they
                        discover? What makes it worth reading?
                    </p>
                </div>
            </section>

            {/* ── Get the Book ──────────────────────────────────── */}
            <section id="get-the-book" className="py-24 px-6">
                <div className="max-w-2xl mx-auto">
                    <hr className="book-divider mb-16" />
                    <div className="book-card text-center">
                        <h2 className="book-heading text-4xl mb-4">
                            Get Your Copy
                        </h2>
                        <p className="book-prose mb-8 opacity-70">
                            Available in digital and print formats.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="#" className="book-btn-primary">Buy Digital</a>
                            <a href="#" className="book-btn-outline">Buy Print</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Back Cover ────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto flex justify-center">
                    <img
                        src="/books/YOUR-BOOK-SLUG/0002.png"
                        alt="Book Title — Back Cover"
                        className="w-64 lg:w-80 shadow-xl opacity-80"
                    />
                </div>
            </section>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="py-12 px-6 text-center">
                <hr className="book-divider mb-10" />
                <p className="book-prose text-sm opacity-40">
                    &copy; {new Date().getFullYear()} Davina Leong. All rights reserved.
                </p>
                <p className="mt-2">
                    <Link href="/ebooks" className="text-sm opacity-40 hover:opacity-70 transition-opacity">
                        ← All E-Books
                    </Link>
                </p>
            </footer>
        </main>
    )
}

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"

interface IncludedBook {
    slug: string
    title: string
    subtitle: string
    description: string
    coverImage: string
    price: string
}

interface BundleData {
    available: boolean
    price: string
    individualTotal: string
    savings: string
    storeStatus: string
    storeNote: string
    lqCheckoutBase: string
    lqProductId: string
    includes: IncludedBook[]
}

function getBundleData(): BundleData {
    const filePath = path.join(process.cwd(), "app", "content", "ebooks", "carried-guided-held.md")
    const raw = fs.readFileSync(filePath, "utf8")
    const { data } = matter(raw)
    return data as unknown as BundleData
}

export const metadata: Metadata = {
    title: "Carried, Guided, Held",
}

export default function CarriedGuidedHeldPage() {
    const bundle = getBundleData()
    const checkoutUrl = `${bundle.lqCheckoutBase}/${bundle.lqProductId}`

    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="cgh-nav">
                <span className="cgh-heading cgh-nav-title">Carried, Guided, Held</span>
                {bundle.available ? (
                    <a href={checkoutUrl} className="cgh-btn-outline cgh-btn-sm">
                        Get the Bundle
                    </a>
                ) : (
                    <span className="cgh-btn-coming-soon cgh-btn-sm">Coming Soon</span>
                )}
            </header>

            <main className="cgh-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="cgh-section-hero">
                    <div className="cgh-container cgh-hero-grid">
                        {/* Copy */}
                        <div>
                            <p className="cgh-label">A Gift Bundle — 3 E-Books</p>
                            <h1 className="cgh-heading cgh-hero-heading">
                                <span className="cgh-hero-title-white">Carried,</span><br />
                                <span className="cgh-hero-title-white">Guided,</span><br />
                                <span className="cgh-hero-title-white">Held</span>
                            </h1>
                            <p className="cgh-heading cgh-hero-subtitle">A trio of encouragement</p>
                            <p className="cgh-prose cgh-hero-body">
                                Three e-books gathered into one heartfelt collection —{" "}
                                <strong>a gift from a new, budding author</strong> for anyone who needs to
                                know they are carried, guided, and held.
                            </p>
                            <p className="cgh-prose cgh-byline">by Davina Leong</p>
                            <div className="cgh-hero-actions">
                                {bundle.available ? (
                                    <a href={checkoutUrl} className="cgh-btn-primary">
                                        Get the Bundle — {bundle.price}
                                    </a>
                                ) : (
                                    <span className="cgh-btn-coming-soon">Coming Soon</span>
                                )}
                                <a href="#whats-inside" className="cgh-prose cgh-readmore">+ What&apos;s inside</a>
                            </div>
                        </div>

                        {/* Bundle thumbnail */}
                        <div className="cgh-cover-wrap">
                            <img
                                src="/books/carried-guided-held/0007.png"
                                alt="Carried, Guided, Held — Bundle"
                                className="cgh-cover-img"
                            />
                        </div>
                    </div>
                </section>

                {/* ── What's Inside ─────────────────────────────────── */}
                <section id="whats-inside" className="cgh-section-includes">
                    <div className="cgh-container">
                        <div className="cgh-includes-header">
                            <p className="cgh-label">What&apos;s Inside</p>
                            <h2 className="cgh-heading cgh-includes-heading">Three books, one gift</h2>
                            <p className="cgh-prose cgh-includes-sub">
                                Each title stands on its own — together, they tell one story of being held.
                            </p>
                        </div>
                        <div className="cgh-includes-grid">
                            {bundle.includes.map((book, i) => (
                                <article key={book.slug} className="cgh-book-card">
                                    <div className="cgh-book-cover-wrap">
                                        <img
                                            src={book.coverImage}
                                            alt={`${book.title} — Cover`}
                                            className="cgh-book-cover"
                                        />
                                    </div>
                                    <div className="cgh-book-body">
                                        <span className="cgh-book-num">Book {String(i + 1).padStart(2, "0")}</span>
                                        <h3 className="cgh-book-title">{book.title}</h3>
                                        <p className="cgh-book-subtitle">{book.subtitle}</p>
                                        <p className="cgh-prose cgh-book-desc">{book.description}</p>
                                        <span className="cgh-book-price">Individually {book.price}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── The Gift ──────────────────────────────────────── */}
                <section className="cgh-section-gift">
                    <div className="cgh-gift-inner">
                        <p className="cgh-label">The Heart Behind It</p>
                        <h2 className="cgh-heading cgh-gift-heading">
                            Made to be given away.
                        </h2>
                        <p className="cgh-prose cgh-gift-body">
                            <strong>Carried, Guided, Held</strong> brings together three short, honest books
                            written from the heart of a new author — stories of grace in the storm, faith in a
                            changing world, and the unshakable love of a Father.
                        </p>
                        <p className="cgh-prose cgh-gift-body">
                            It&apos;s the kind of bundle you keep for yourself — or pass on to someone who needs
                            a reminder that they were never carrying it all alone.
                        </p>
                        <blockquote className="cgh-quote">
                            &ldquo;Carried by grace. Guided by truth. Held by love.&rdquo;
                            <cite className="cgh-cite">— Carried, Guided, Held</cite>
                        </blockquote>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <section id="get-the-bundle" className="cgh-section-cta">
                    <div className="cgh-cta-inner">
                        <p className="cgh-label cgh-cta-label">Get the Bundle</p>
                        <h2 className="cgh-heading cgh-cta-heading">Three books. One gift.</h2>
                        <p className="cgh-prose cgh-cta-body">
                            Carried by Grace, Jesus &amp; AI, and Daddy God is for You —{" "}
                            <strong>together in one collection.</strong>
                        </p>
                        <div className="cgh-price-wrap">
                            <span className="cgh-price-currency">{bundle.price.replace(/[0-9]/g, "").trim()}</span>
                            <span className="cgh-price-amount">{bundle.price.replace(/[^0-9]/g, "")}</span>
                        </div>
                        <p className="cgh-price-note">
                            <span className="cgh-price-strike">{bundle.individualTotal} individually</span>
                            <span className="cgh-price-save">Save {bundle.savings}</span>
                        </p>
                        {bundle.available ? (
                            <a href={checkoutUrl} className="cgh-btn-black cgh-btn-lg">
                                Get the Bundle — {bundle.price}
                            </a>
                        ) : (
                            <div className="cgh-coming-soon-wrap">
                                <span className="cgh-badge-coming-soon">
                                    <span className="cgh-badge-dot" aria-hidden></span>
                                    {bundle.storeStatus}
                                </span>
                                <p className="cgh-store-note">{bundle.storeNote}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="cgh-footer cgh-prose">
                <p>&copy; {new Date().getFullYear()} Davina Leong. All rights reserved.</p>
                <p>Cover images and content are the property of the author.</p>
                <p style={{ marginTop: "1rem" }}>
                    <a href="/ebooks" className="cgh-footer-back">← All E-Books</a>
                </p>
            </footer>
        </>
    )
}

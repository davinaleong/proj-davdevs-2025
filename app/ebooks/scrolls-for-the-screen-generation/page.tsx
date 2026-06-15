import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"

interface Volume {
    num: string
    title: string
    description: string
    coverImage: string
    backImage: string
}

interface SeriesData {
    title: string
    label: string
    author: string
    description: string
    price: string
    bundlePrice: string
    bundleSavings: string
    storeStatus: string
    storeNote: string
    volumes: Volume[]
}

function getSeriesData(): SeriesData {
    const filePath = path.join(
        process.cwd(),
        "app",
        "content",
        "ebooks",
        "scrolls-for-the-screen-generation.md"
    )
    const raw = fs.readFileSync(filePath, "utf8")
    const { data } = matter(raw)
    return data as unknown as SeriesData
}

export const metadata: Metadata = {
    title: "Scrolls for the Screen Generation",
}

export default function ScrollsPage() {
    const data = getSeriesData()
    const { volumes } = data

    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="sfsg-nav">
                <span className="sfsg-heading sfsg-nav-title">
                    Scrolls for the Screen Generation
                </span>
                <span className="sfsg-btn-coming-soon sfsg-btn-sm">Coming Soon</span>
            </header>

            <main className="sfsg-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="sfsg-section-hero">
                    <div className="sfsg-container sfsg-hero-inner">
                        <p className="sfsg-label">{data.label}</p>
                        <h1 className="sfsg-heading sfsg-hero-heading">
                            <span className="sfsg-hero-title-accent">Scrolls</span>
                            <span className="sfsg-hero-title-light"> for the</span>
                            <br />
                            <span className="sfsg-hero-title-light">Screen Generation</span>
                        </h1>
                        <p className="sfsg-prose sfsg-hero-subtitle">
                            A Six-Volume Devotional Series
                        </p>
                        <p className="sfsg-prose sfsg-hero-body">{data.description}</p>
                        <p className="sfsg-prose sfsg-byline">by {data.author}</p>
                        <div className="sfsg-hero-actions">
                            <a href="#volumes" className="sfsg-btn-outline">
                                Explore the Series
                            </a>
                            <a href="#get-the-series" className="sfsg-prose sfsg-readmore">
                                Get All 6 — {data.bundlePrice} →
                            </a>
                        </div>

                        {/* Cover mosaic */}
                        <div className="sfsg-hero-covers" aria-hidden>
                            {volumes.map((vol) => (
                                <img
                                    key={vol.num}
                                    src={vol.coverImage}
                                    alt=""
                                    className="sfsg-hero-cover"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Volumes ───────────────────────────────────────── */}
                <section id="volumes" className="sfsg-section-volumes">
                    <div className="sfsg-container">
                        <div className="sfsg-section-header">
                            <p className="sfsg-label">The Series</p>
                            <h2 className="sfsg-heading sfsg-section-heading">
                                Six volumes. One faithful voice.
                            </h2>
                        </div>
                        <div className="sfsg-volumes-grid">
                            {volumes.map((vol) => (
                                <article key={vol.num} className="sfsg-vol-card">
                                    <div className="sfsg-vol-cover-wrap">
                                        <img
                                            src={vol.coverImage}
                                            alt={`Vol ${vol.num} — ${vol.title}`}
                                            className="sfsg-vol-cover"
                                        />
                                    </div>
                                    <div className="sfsg-vol-info">
                                        <span className="sfsg-vol-num">Vol {vol.num}</span>
                                        <h3 className="sfsg-heading sfsg-vol-title">{vol.title}</h3>
                                        <p className="sfsg-prose sfsg-vol-body">{vol.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Pricing + CTA ─────────────────────────────────── */}
                <section id="get-the-series" className="sfsg-section-cta">
                    <div className="sfsg-container sfsg-cta-inner">
                        <p className="sfsg-label">Get Your Copy</p>
                        <h2 className="sfsg-heading sfsg-cta-heading">
                            Ancient words.<br />
                            <span className="sfsg-cta-heading-accent">A lifetime of wisdom.</span>
                        </h2>
                        <p className="sfsg-prose sfsg-cta-body">
                            Every volume stands alone. All six together tell a story —
                            of a generation reclaiming its attention, its depth, and its faith.
                        </p>

                        {/* Bundle */}
                        <div className="sfsg-bundle-card">
                            <span className="sfsg-bundle-badge">Best Value</span>
                            <p className="sfsg-prose sfsg-bundle-label">Complete Bundle · All 6 Volumes</p>
                            <div className="sfsg-price-wrap">
                                <span className="sfsg-price-currency">S$</span>
                                <span className="sfsg-price-amount">30</span>
                            </div>
                            <p className="sfsg-prose sfsg-bundle-savings">
                                Save {data.bundleSavings} compared to buying individually
                            </p>
                            <span className="sfsg-badge-coming-soon">
                                <span className="sfsg-badge-dot" aria-hidden></span>
                                {data.storeStatus}
                            </span>
                        </div>

                        {/* Per volume */}
                        <div className="sfsg-individual-wrap">
                            <p className="sfsg-prose sfsg-individual-label">Or purchase volumes individually</p>
                            <div className="sfsg-price-wrap">
                                <span className="sfsg-price-currency">S$</span>
                                <span className="sfsg-price-amount sfsg-price-sm">9</span>
                                <span className="sfsg-prose sfsg-price-each">per volume</span>
                            </div>
                        </div>

                        <p className="sfsg-prose sfsg-store-note">{data.storeNote}</p>
                    </div>
                </section>
            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="sfsg-footer sfsg-prose">
                <p>&copy; {new Date().getFullYear()} Davina Leong. All rights reserved.</p>
                <p>Cover images and content are the property of the author.</p>
                <p style={{ marginTop: "1rem" }}>
                    <a href="/ebooks" className="sfsg-footer-back">← All E-Books</a>
                </p>
            </footer>
        </>
    )
}

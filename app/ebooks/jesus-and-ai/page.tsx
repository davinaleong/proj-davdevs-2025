import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"

interface Theme {
    num: string
    icon: string
    title: string
    body: string
}

interface AboutParagraph {
    text: string
    strong?: string
}

interface EbookData {
    title: string
    label: string
    author: string
    coverImage: string
    backImage: string
    available: boolean
    price: string
    storeStatus: string
    storeNote: string
    heroSubtitle: string
    heroBody: string
    heroBodyStrong: string
    heroBodyEnd: string
    aboutHeading1: string
    aboutHeading2: string
    aboutBody: AboutParagraph[]
    quote: { text: string; citation: string }
    themesLabel: string
    themesHeading: string
    themes: Theme[]
    lqCheckoutBase: string
    lqProductId: string
    ctaLabel: string
    ctaHeading1: string
    ctaHeading2: string
    ctaBody: string
}

function getEbookData(): EbookData {
    const filePath = path.join(process.cwd(), "app", "content", "ebooks", "jesus-and-ai.md")
    const raw = fs.readFileSync(filePath, "utf8")
    const { data } = matter(raw)
    return data as unknown as EbookData
}

export const metadata: Metadata = {
    title: "Jesus & AI",
}

export default function JesusAndAiPage() {
    const data = getEbookData()
    const { themes } = data
    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="jai-nav">
                <span className="jai-heading jai-nav-title">
                    Jesus<span className="jai-nav-dot"> &amp; </span>AI
                </span>
                {data.available ? (
                    <a
                        href={`${data.lqCheckoutBase}/${data.lqProductId}`}
                        className="jai-btn-outline jai-btn-sm"
                    >
                        Get the Book
                    </a>
                ) : (
                    <span className="jai-btn-coming-soon jai-btn-sm">Coming Soon</span>
                )}
            </header>

            <main className="jai-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="jai-section-hero jai-dot-grid">
                    <div className="jai-container jai-hero-grid">
                        {/* Copy */}
                        <div>
                            <p className="jai-label">{data.label}</p>
                            <h1 className="jai-heading jai-hero-heading">
                                <span className="jai-hero-title-white">Jesus</span><br />
                                <span className="jai-hero-title-white">&amp; </span>
                                <span className="jai-hero-title-blue">AI</span>
                            </h1>
                            <p className="jai-hero-subtitle">{data.heroSubtitle}</p>
                            <p className="jai-prose jai-hero-body">
                                {data.heroBody}{" "}
                                <strong>{data.heroBodyStrong}</strong>{" "}
                                {data.heroBodyEnd}
                            </p>
                            <p className="jai-prose jai-byline">by {data.author}</p>
                            <div className="jai-hero-actions">
                                {data.available ? (
                                    <a
                                        href={`${data.lqCheckoutBase}/${data.lqProductId}`}
                                        className="jai-btn-outline"
                                    >
                                        Get the Book — {data.price}
                                    </a>
                                ) : (
                                    <a href="#get-the-book" className="jai-btn-outline">
                                        See Store Status
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Front Cover */}
                        <div className="jai-cover-wrap">
                            <img
                                src={data.coverImage}
                                alt={`${data.title} — Book Cover`}
                                className="jai-cover-img"
                            />
                        </div>
                    </div>
                </section>

                {/* ── About ─────────────────────────────────────────── */}
                <section id="about" className="jai-section-about">
                    <div className="jai-container jai-about-grid">
                        {/* Back cover */}
                        <div className="jai-back-cover-wrap">
                            <img
                                src={data.backImage}
                                alt={`${data.title} — Back Cover`}
                                className="jai-back-cover-img"
                            />
                        </div>

                        {/* About text */}
                        <div>
                            <p className="jai-label">About the Book</p>
                            <h2 className="jai-heading jai-about-heading">
                                {data.aboutHeading1}<br />{data.aboutHeading2}
                            </h2>
                            {data.aboutBody.map((para, i) => (
                                <p key={i} className="jai-prose jai-about-body">
                                    {para.text}{para.strong && <>{" "}<strong>{para.strong}</strong></>}
                                </p>
                            ))}
                            <blockquote className="jai-quote jai-prose">
                                <p>&ldquo;{data.quote.text}&rdquo;</p>
                                <cite className="jai-cite">{data.quote.citation}</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ── Themes ────────────────────────────────────────── */}
                <section className="jai-section-themes jai-dot-grid">
                    <div className="jai-container">
                        <div className="jai-themes-header">
                            <p className="jai-label">{data.themesLabel}</p>
                            <h2 className="jai-heading jai-themes-heading">
                                {data.themesHeading}
                            </h2>
                        </div>
                        <div className="jai-themes-grid">
                            {themes.map((theme) => (
                                <div key={theme.num} className="jai-card jai-card-blue">
                                    <span className="jai-theme-num">{theme.num}</span>
                                    <span className="jai-theme-icon" aria-hidden>{theme.icon}</span>
                                    <h3 className="jai-prose jai-theme-title">{theme.title}</h3>
                                    <p className="jai-prose jai-theme-body">{theme.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <section id="get-the-book" className="jai-section-cta">
                    <div className="jai-cta-inner">
                        <p className="jai-label">{data.ctaLabel}</p>
                        <h2 className="jai-heading jai-cta-heading-white">{data.ctaHeading1}</h2>
                        <h2 className="jai-heading jai-cta-heading-blue">{data.ctaHeading2}</h2>
                        <p className="jai-prose jai-cta-body">{data.ctaBody}</p>
                        <div className="jai-price-wrap">
                            <span className="jai-price-currency">{data.price.replace(/[0-9]/g, "").trim()}</span>
                            <span className="jai-price-amount">{data.price.replace(/[^0-9]/g, "")}</span>
                        </div>
                        <div className="jai-coming-soon-wrap">
                            {data.available ? (
                                <a
                                    href={`${data.lqCheckoutBase}/${data.lqProductId}`}
                                    className="jai-btn-outline"
                                >
                                    Get the Book — {data.price}
                                </a>
                            ) : (
                                <>
                                    <span className="jai-badge-coming-soon">
                                        <span className="jai-badge-dot" aria-hidden></span>
                                        {data.storeStatus}
                                    </span>
                                    <p className="jai-prose jai-store-note">{data.storeNote}</p>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="jai-footer jai-prose">
                <p>&copy; {new Date().getFullYear()} Davina Leong. All rights reserved.</p>
                <p>Cover image and content are the property of the author.</p>
                <p style={{ marginTop: "1rem" }}>
                    <a href="/ebooks" className="jai-footer-back">← All E-Books</a>
                </p>
            </footer>
        </>
    )
}

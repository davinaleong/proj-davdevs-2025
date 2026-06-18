import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"

interface CheckoutData {
    available: boolean
    price: string
    storeStatus: string
    storeNote: string
    lqCheckoutBase: string
    lqProductId: string
}

function getCheckoutData(): CheckoutData {
    const filePath = path.join(process.cwd(), "app", "content", "ebooks", "carried-by-grace.md")
    const raw = fs.readFileSync(filePath, "utf8")
    const { data } = matter(raw)
    return data as unknown as CheckoutData
}

export const metadata: Metadata = {
    title: "Carried by Grace",
}

const themes = [
    {
        title: "Faith Under Pressure",
        body: "Walking through academic and career challenges while clinging to the promises of God — and watching His grace through crisis times.",
    },
    {
        title: "Mental Health & Healing",
        body: "An honest account of mental depression, suicidal ideation, and the supernatural restoration that only Christ can bring.",
    },
    {
        title: "Excellence Through Grace",
        body: "How leaning on Jesus — not self-effort — produced results that surpassed her own expectations in study and in the workplace.",
    },
    {
        title: "Purpose & Calling",
        body: "From surviving to thriving — discovering that every season was preparation, and that God's plan was always greater.",
    },
]

export default function CarriedByGracePage() {
    const checkout = getCheckoutData()
    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="cbg-nav">
                <span className="cbg-heading cbg-nav-title">Carried by Grace</span>
                {checkout.available ? (
                    <a
                        href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                        className="cbg-btn-outline cbg-btn-sm"
                    >
                        Get the Book
                    </a>
                ) : (
                    <span className="cbg-btn-coming-soon cbg-btn-sm">Coming Soon</span>
                )}
            </header>

            <main className="cbg-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="cbg-section-hero">
                    <div className="cbg-container cbg-hero-grid">
                        {/* Copy */}
                        <div>
                            <p className="cbg-label">A Personal Testimony</p>
                            <h1 className="cbg-heading cbg-hero-heading">
                                <span className="cbg-hero-title-white">Carried</span><br />
                                <span className="cbg-hero-title-white">by </span>
                                <em className="cbg-hero-title-gold">Grace</em>
                            </h1>
                            <p className="cbg-heading cbg-hero-subtitle">My Journey with Jesus</p>
                            <p className="cbg-prose cbg-hero-body">
                                From academic pressure to mental battles, from moments of weakness to seasons
                                of breakthrough — through it all,{" "}
                                <strong>one truth remained constant: Jesus is faithful.</strong>
                            </p>
                            <p className="cbg-prose cbg-byline">by Davina Leong</p>
                            <div className="cbg-hero-actions">
                                {checkout.available ? (
                                    <a
                                        href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                                        className="cbg-btn-outline"
                                    >
                                        Get the Book — {checkout.price}
                                    </a>
                                ) : (
                                    <span className="cbg-btn-coming-soon">Coming Soon</span>
                                )}
                                <a href="#about" className="cbg-prose cbg-readmore">+ Read more</a>
                            </div>
                        </div>

                        {/* Cover */}
                        <div className="cbg-cover-wrap">
                            <img
                                src="/books/carried-by-grace/0001.png"
                                alt="Carried by Grace — Book Cover"
                                className="cbg-cover-img"
                            />
                        </div>
                    </div>
                </section>

                {/* ── About ─────────────────────────────────────────── */}
                <section id="about" className="cbg-section-about">
                    <div className="cbg-container cbg-about-grid">
                        {/* Excerpt card */}
                        <div className="cbg-card cbg-excerpt cbg-prose">
                            <p>This is a story of grace, struggle and restoration.</p>
                            <p>
                                From academic pressure to mental battles, from moments of weakness to seasons
                                of breakthrough — through it all, one truth remained constant: Jesus is faithful.
                            </p>
                            <p>
                                Nothing in me earned His favour. Nothing in my failures disqualified me from
                                His grace. Every closed door, every broken dream, every dark night of the soul
                                was quietly, faithfully being woven into something purposeful — something only
                                God could author.
                            </p>
                        </div>

                        {/* About text */}
                        <div>
                            <p className="cbg-label">About the Book</p>
                            <h2 className="cbg-heading cbg-about-heading">
                                A story of grace,<br />struggle, and restoration.
                            </h2>
                            <p className="cbg-prose cbg-about-body">
                                In this personal testimony, Davina shares how the Lord carried her through
                                life&apos;s highs and lows — from the pressures of education and career, to
                                battles with mental health that brought her to her knees.
                            </p>
                            <p className="cbg-prose cbg-about-body">
                                She writes of moments where <strong>everything fell apart</strong>, and of a
                                God who never left: of supernatural provision, of healing, and of being led —
                                sometimes through the wilderness — into purpose.
                            </p>
                            <p className="cbg-prose cbg-about-body">
                                No matter where you are in your journey,{" "}
                                <strong>His grace is sufficient — and His faithfulness never fails.</strong>
                            </p>
                            <blockquote className="cbg-quote cbg-prose">
                                <p>
                                    &ldquo;Do you see a man who excels in his work? He will stand before kings;
                                    he will not stand before unknown men.&rdquo;
                                </p>
                                <cite className="cbg-cite">— Proverbs 22:29 NKJV</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ── Themes ────────────────────────────────────────── */}
                <section className="cbg-section-themes">
                    <div className="cbg-container">
                        <div className="cbg-themes-header">
                            <p className="cbg-label">What&apos;s Inside</p>
                            <h2 className="cbg-heading cbg-themes-heading">
                                Themes woven through every page
                            </h2>
                        </div>
                        <div className="cbg-themes-grid">
                            {themes.map((theme) => (
                                <div key={theme.title} className="cbg-card">
                                    <span className="cbg-theme-icon" aria-hidden>✦</span>
                                    <h3 className="cbg-prose cbg-theme-title">{theme.title}</h3>
                                    <p className="cbg-prose cbg-theme-body">{theme.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <section id="get-the-book" className="cbg-section-cta">
                    <div className="cbg-cta-inner">
                        <p className="cbg-label">Get Your Copy</p>
                        <h2 className="cbg-heading cbg-cta-heading-white">His grace carried her.</h2>
                        <h2 className="cbg-heading cbg-cta-heading-gold">It can carry you too.</h2>
                        <p className="cbg-prose cbg-cta-body">
                            Whether you are in the middle of a storm or just beginning to wonder if God is
                            real — <strong>this testimony is for you.</strong>
                        </p>
                        <div className="cbg-price-wrap">
                            <span className="cbg-price-currency">{checkout.price.replace(/[0-9]/g, "").trim()}</span>
                            <span className="cbg-price-amount">{checkout.price.replace(/[^0-9]/g, "")}</span>
                        </div>
                        {checkout.available ? (
                            <a
                                href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                                className="cbg-btn-outline cbg-btn-lg"
                            >
                                Get the Book — {checkout.price}
                            </a>
                        ) : (
                            <div className="cbg-coming-soon-wrap">
                                <span className="cbg-badge-coming-soon">
                                    <span className="cbg-badge-dot" aria-hidden></span>
                                    {checkout.storeStatus}
                                </span>
                                <p className="cbg-prose cbg-store-note">{checkout.storeNote}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="cbg-footer cbg-prose">
                <p>&copy; {new Date().getFullYear()} Davina Leong. All rights reserved.</p>
                <p>Cover image and content are the property of the author.</p>
                <p style={{marginTop: "1rem"}}>
                    <a href="/ebooks" className="cbg-footer-back">← All E-Books</a>
                </p>
            </footer>
        </>
    )
}

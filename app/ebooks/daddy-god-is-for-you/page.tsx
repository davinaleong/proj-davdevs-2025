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
    const filePath = path.join(process.cwd(), "app", "content", "ebooks", "daddy-god-is-for-you.md")
    const raw = fs.readFileSync(filePath, "utf8")
    const { data } = matter(raw)
    return data as unknown as CheckoutData
}

export const metadata: Metadata = {
    title: "Daddy God is for You",
}

const themes = [
    {
        title: "The Father's Heart",
        body: "Have you ever felt like God was distant, angry, or waiting for you to fail? The gospel tells a very different story about who your Father really is.",
    },
    {
        title: "What Happened at the Cross",
        body: "See how the Father, Son, and Holy Spirit were never divided, never at odds — but united in one self-sacrificial act of love for you.",
    },
    {
        title: "From Gethsemane to the Tomb",
        body: "Walk from the garden to the empty tomb and meet a Daddy God who runs toward His children, never away from them.",
    },
    {
        title: "Freedom from Condemnation",
        body: "If condemnation has been loud in your life, this book is for you. The accuser is not your Father — and in Christ, His arms are open.",
    },
]

export default function DaddyGodPage() {
    const checkout = getCheckoutData()
    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="dgfy-nav">
                <span className="dgfy-heading dgfy-nav-title">Daddy God is for You</span>
                {checkout.available ? (
                    <a
                        href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                        className="dgfy-btn-outline dgfy-btn-sm"
                    >
                        Get the Book
                    </a>
                ) : (
                    <span className="dgfy-btn-coming-soon dgfy-btn-sm">Coming Soon</span>
                )}
            </header>

            <main className="dgfy-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="dgfy-section-hero">
                    <div className="dgfy-container dgfy-hero-grid">
                        {/* Copy */}
                        <div>
                            <p className="dgfy-label">A Short, Scripture-Rooted Book</p>
                            <h1 className="dgfy-heading dgfy-hero-heading">
                                <span className="dgfy-hero-title-brown">Daddy God</span><br />
                                <span className="dgfy-hero-title-soft">is for </span>
                                <span className="dgfy-hero-title-brown">You</span>
                            </h1>
                            <p className="dgfy-heading dgfy-hero-subtitle">Safe in Daddy God&apos;s Love</p>
                            <p className="dgfy-prose dgfy-hero-body">
                                He is not the enemy. He is your Father.{" "}
                                <strong>And in Christ, the Father&apos;s arms are open.</strong>
                            </p>
                            <p className="dgfy-prose dgfy-byline">by Davina Leong</p>
                            <div className="dgfy-hero-actions">
                                {checkout.available ? (
                                    <a
                                        href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                                        className="dgfy-btn-primary"
                                    >
                                        Get the Book — {checkout.price}
                                    </a>
                                ) : (
                                    <span className="dgfy-btn-coming-soon">Coming Soon</span>
                                )}
                                <a href="#about" className="dgfy-prose dgfy-readmore">+ Read more</a>
                            </div>
                        </div>

                        {/* Cover */}
                        <div className="dgfy-cover-wrap">
                            <img
                                src="/books/daddy-god-is-for-you/0001.png"
                                alt="Daddy God is for You — Book Cover"
                                className="dgfy-cover-img"
                            />
                        </div>
                    </div>
                </section>

                {/* ── About ─────────────────────────────────────────── */}
                <section id="about" className="dgfy-section-about">
                    <div className="dgfy-container dgfy-about-grid">
                        {/* Excerpt card */}
                        <div className="dgfy-card dgfy-excerpt dgfy-prose">
                            <p>He is not the enemy. He is your Father.</p>
                            <p>
                                Have you ever felt like God was distant, angry, or waiting for you to fail?
                                The devil wants you to believe exactly that — but the gospel tells a different
                                story.
                            </p>
                            <p>
                                From Gethsemane to the empty tomb, you will see a Daddy God who runs toward His
                                children — not away from them.
                            </p>
                        </div>

                        {/* About text */}
                        <div>
                            <p className="dgfy-label">About the Book</p>
                            <h2 className="dgfy-heading dgfy-about-heading">
                                A Father who runs<br />toward His children.
                            </h2>
                            <p className="dgfy-prose dgfy-about-body">
                                In this short, Scripture-rooted book, Davina walks you through what really
                                happened at the cross: how the <strong>Father, Son, and Holy Spirit</strong>{" "}
                                were never divided, never at odds, but united in one self-sacrificial act of
                                love for you.
                            </p>
                            <p className="dgfy-prose dgfy-about-body">
                                If condemnation has been loud in your life,{" "}
                                <strong>this book is for you.</strong> The accuser is not your Father.
                            </p>
                            <p className="dgfy-prose dgfy-about-body">
                                And in Christ,{" "}
                                <strong>the Father&apos;s arms are open.</strong>
                            </p>
                            <blockquote className="dgfy-quote dgfy-prose">
                                <p>
                                    &ldquo;The Spirit you received brought about your adoption to sonship.
                                    And by Him we cry, &lsquo;Abba, Father.&rsquo;&rdquo;
                                </p>
                                <cite className="dgfy-cite">— Romans 8:15 NIV</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ── Themes ────────────────────────────────────────── */}
                <section className="dgfy-section-themes">
                    <div className="dgfy-container">
                        <div className="dgfy-themes-header">
                            <p className="dgfy-label">What&apos;s Inside</p>
                            <h2 className="dgfy-heading dgfy-themes-heading">
                                The story the gospel really tells
                            </h2>
                        </div>
                        <div className="dgfy-themes-grid">
                            {themes.map((theme) => (
                                <div key={theme.title} className="dgfy-card">
                                    <span className="dgfy-theme-icon" aria-hidden>♡</span>
                                    <h3 className="dgfy-prose dgfy-theme-title">{theme.title}</h3>
                                    <p className="dgfy-prose dgfy-theme-body">{theme.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <section id="get-the-book" className="dgfy-section-cta">
                    <div className="dgfy-cta-inner">
                        <p className="dgfy-label dgfy-cta-label">Get Your Copy</p>
                        <h2 className="dgfy-heading dgfy-cta-heading-cream">He is not the enemy.</h2>
                        <h2 className="dgfy-heading dgfy-cta-heading-soft">He is your Father.</h2>
                        <p className="dgfy-prose dgfy-cta-body">
                            Whether condemnation has been loud in your life or you are only beginning to
                            wonder who God really is — <strong>this book is for you.</strong>
                        </p>
                        <div className="dgfy-price-wrap">
                            <span className="dgfy-price-currency">{checkout.price.replace(/[0-9]/g, "").trim()}</span>
                            <span className="dgfy-price-amount">{checkout.price.replace(/[^0-9]/g, "")}</span>
                        </div>
                        {checkout.available ? (
                            <a
                                href={`${checkout.lqCheckoutBase}/${checkout.lqProductId}`}
                                className="dgfy-btn-cream dgfy-btn-lg"
                            >
                                Get the Book — {checkout.price}
                            </a>
                        ) : (
                            <div className="dgfy-coming-soon-wrap">
                                <span className="dgfy-badge-coming-soon">
                                    <span className="dgfy-badge-dot" aria-hidden></span>
                                    {checkout.storeStatus}
                                </span>
                                <p className="dgfy-prose dgfy-store-note">{checkout.storeNote}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="dgfy-footer dgfy-prose">
                <p>&copy; {new Date().getFullYear()} Davina Leong. All rights reserved.</p>
                <p>Cover image and content are the property of the author.</p>
                <p style={{marginTop: "1rem"}}>
                    <a href="/ebooks" className="dgfy-footer-back">← All E-Books</a>
                </p>
            </footer>
        </>
    )
}

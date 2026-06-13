import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Jesus & AI",
}

const themes = [
    {
        num: "01",
        icon: "[ ]",
        title: "The Image of God in the Age of AI",
        body: "What makes us uniquely human — and why no algorithm can replicate the breath of life God placed in us.",
    },
    {
        num: "02",
        icon: "{ }",
        title: "Fear, Faith, and the Future",
        body: "Moving past anxiety about AI to a posture of wisdom, discernment, and trust in a sovereign God.",
    },
    {
        num: "03",
        icon: "< >",
        title: "Ethics and the Kingdom",
        body: "Navigating real-world questions — bias, automation, creative ownership — through a biblical lens.",
    },
    {
        num: "04",
        icon: "/>",
        title: "Purpose in a Changing World",
        body: "Your calling is not cancelled by AI. Discover how God's eternal purpose for you remains unshakeable.",
    },
]

export default function JesusAndAiPage() {
    return (
        <>
            {/* ── Nav ───────────────────────────────────────────── */}
            <header className="jai-nav">
                <span className="jai-heading jai-nav-title">
                    Jesus<span className="jai-nav-dot"> &amp; </span>AI
                </span>
                <span className="jai-btn-coming-soon jai-btn-sm">Coming Soon</span>
            </header>

            <main className="jai-main">
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="jai-section-hero jai-dot-grid">
                    <div className="jai-container jai-hero-grid">
                        {/* Copy */}
                        <div>
                            <p className="jai-label">An E-Book by Davina Leong</p>
                            <h1 className="jai-heading jai-hero-heading">
                                <span className="jai-hero-title-white">Jesus</span><br />
                                <span className="jai-hero-title-white">&amp; </span>
                                <span className="jai-hero-title-blue">AI</span>
                            </h1>
                            <p className="jai-hero-subtitle">Faith, Intelligence &amp; the Future</p>
                            <p className="jai-prose jai-hero-body">
                                What does it mean to follow Jesus in an age of artificial intelligence?
                                As AI reshapes how we work, create, and relate —{" "}
                                <strong>this book offers a grounded, biblical perspective</strong> on
                                technology, humanity, and the God who never changes.
                            </p>
                            <p className="jai-prose jai-byline">by Davina Leong</p>
                            <div className="jai-hero-actions">
                                <a href="#get-the-book" className="jai-btn-outline">
                                    Get the Book — S$9
                                </a>
                            </div>
                        </div>

                        {/* Front Cover */}
                        <div className="jai-cover-wrap">
                            <img
                                src="/books/jesus-and-ai/0001.png"
                                alt="Jesus &amp; AI — Book Cover"
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
                                src="/books/jesus-and-ai/0002.png"
                                alt="Jesus &amp; AI — Back Cover"
                                className="jai-back-cover-img"
                            />
                        </div>

                        {/* About text */}
                        <div>
                            <p className="jai-label">About the Book</p>
                            <h2 className="jai-heading jai-about-heading">
                                Not a tech manual.<br />Not a theology textbook.
                            </h2>
                            <p className="jai-prose jai-about-body">
                                <em>Jesus &amp; AI</em> is a personal and pastoral exploration of the
                                questions many believers are quietly asking: Should I be afraid of AI?
                                Does God care about algorithms? What does the Bible say about a world
                                being remade by machines?
                            </p>
                            <p className="jai-prose jai-about-body">
                                Written from a place of curiosity and faith, Davina walks through what
                                it means to be image-bearers of God in the age of digital intelligence —
                                holding fast to biblical truth while{" "}
                                <strong>engaging honestly with one of the most significant shifts of our time.</strong>
                            </p>
                            <p className="jai-prose jai-about-body">
                                Whether you are a sceptic, a technologist, or simply a believer
                                navigating a changing world —{" "}
                                <strong>this book is for you.</strong>
                            </p>
                            <blockquote className="jai-quote jai-prose">
                                <p>
                                    &ldquo;For everything there is a season, and a time for every
                                    matter under heaven.&rdquo;
                                </p>
                                <cite className="jai-cite">— Ecclesiastes 3:1 ESV</cite>
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* ── Themes ────────────────────────────────────────── */}
                <section className="jai-section-themes jai-dot-grid">
                    <div className="jai-container">
                        <div className="jai-themes-header">
                            <p className="jai-label">What&apos;s Inside</p>
                            <h2 className="jai-heading jai-themes-heading">
                                Themes woven through every page
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
                        <p className="jai-label">Get Your Copy</p>
                        <h2 className="jai-heading jai-cta-heading-white">Curiosity meets conviction.</h2>
                        <h2 className="jai-heading jai-cta-heading-blue">Faith for the age of machines.</h2>
                        <p className="jai-prose jai-cta-body">
                            A guide for the faithful — grounded in Scripture, honest about
                            technology, and full of hope for what God is doing in this generation.
                        </p>
                        <div className="jai-price-wrap">
                            <span className="jai-price-currency">S$</span>
                            <span className="jai-price-amount">9</span>
                        </div>
                        <div className="jai-coming-soon-wrap">
                            <span className="jai-badge-coming-soon">
                                <span className="jai-badge-dot" aria-hidden></span>
                                Store Under Review
                            </span>
                            <p className="jai-prose jai-store-note">
                                Our LemonSqueezy store is currently pending review by the team.
                                The e-book will be available for purchase at S$9 very soon — check back shortly.
                            </p>
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

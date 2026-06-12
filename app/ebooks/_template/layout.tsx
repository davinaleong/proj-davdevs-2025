import type { Metadata } from "next"
// import { YourFont } from "next/font/google"
import "./styles.css"

// const yourFont = YourFont({ subsets: ["latin"], variable: "--font-primary" })

export const metadata: Metadata = {
    title: {
        default: "Book Title",
        template: "%s | Book Title",
    },
    description: "A short description of the book.",
    icons: {
        icon: [
            { url: "/books/YOUR-BOOK-SLUG/favicon.svg", type: "image/svg+xml" },
            { url: "/books/YOUR-BOOK-SLUG/favicon.png", type: "image/png" },
        ],
        apple: "/books/YOUR-BOOK-SLUG/favicon.png",
    },
}

export default function BookLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" /* className={yourFont.variable} */>
            <body className="book-body antialiased">
                {children}
            </body>
        </html>
    )
}

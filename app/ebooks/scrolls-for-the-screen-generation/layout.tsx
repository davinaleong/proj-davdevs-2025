import type { Metadata } from "next"
import "@fontsource-variable/inter/wght.css"
import "@fontsource-variable/playfair-display/wght.css"
import "./styles.css"

export const metadata: Metadata = {
    title: {
        default: "Scrolls for the Screen Generation",
        template: "%s | Scrolls for the Screen Generation",
    },
    description:
        "A six-volume devotional series for those living in a screen-saturated world. By Davina Leong.",
    icons: {
        icon: [
            { url: "/books/scrolls-for-the-screen-generation/favicon.svg", type: "image/svg+xml" },
            { url: "/books/scrolls-for-the-screen-generation/favicon.png", type: "image/png" },
        ],
        apple: "/books/scrolls-for-the-screen-generation/favicon.png",
    },
}

export default function ScrollsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="sfsg-body">
            {children}
        </div>
    )
}

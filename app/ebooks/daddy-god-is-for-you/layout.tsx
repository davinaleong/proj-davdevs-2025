import type { Metadata } from "next"
import "@fontsource-variable/montserrat/wght.css"
import "@fontsource-variable/montserrat/wght-italic.css"
import "./styles.css"

export const metadata: Metadata = {
    title: {
        default: "Daddy God is for You",
        template: "%s | Daddy God is for You",
    },
    description:
        "He is not the enemy. He is your Father. A short, Scripture-rooted book by Davina Leong.",
    icons: {
        icon: [
            { url: "/books/daddy-god-is-for-you/favicon.svg", type: "image/svg+xml" },
            { url: "/books/daddy-god-is-for-you/favicon.png", type: "image/png" },
        ],
        apple: "/books/daddy-god-is-for-you/favicon.png",
    },
}

export default function DaddyGodLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="dgfy-body">
            {children}
        </div>
    )
}

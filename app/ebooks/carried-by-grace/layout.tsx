import type { Metadata } from "next"
import "@fontsource-variable/inter/wght.css"
import "@fontsource-variable/cormorant-garamond/wght.css"
import "@fontsource-variable/cormorant-garamond/wght-italic.css"
import "./styles.css"

export const metadata: Metadata = {
    title: {
        default: "Carried by Grace",
        template: "%s | Carried by Grace",
    },
    description:
        "A personal journey of faith, grace, and growth by Davina Leong.",
    icons: {
        icon: [
            { url: "/books/carried-by-grace/favicon.svg", type: "image/svg+xml" },
            { url: "/books/carried-by-grace/favicon.png", type: "image/png" },
        ],
        apple: "/books/carried-by-grace/favicon.png",
    },
}

export default function CarriedByGraceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="cbg-body">
            {children}
        </div>
    )
}

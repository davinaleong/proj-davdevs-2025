import type { Metadata } from "next"
import "@fontsource-variable/montserrat/wght.css"
import "@fontsource-variable/montserrat/wght-italic.css"
import "./styles.css"

export const metadata: Metadata = {
    title: {
        default: "Carried, Guided, Held",
        template: "%s | Carried, Guided, Held",
    },
    description:
        "A trio of encouragement — three e-books gathered into one gift bundle by Davina Leong.",
    icons: {
        icon: [
            { url: "/books/carried-guided-held/favicon.svg", type: "image/svg+xml" },
            { url: "/books/carried-guided-held/favicon.png", type: "image/png" },
        ],
        apple: "/books/carried-guided-held/favicon.png",
    },
}

export default function CarriedGuidedHeldLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="cgh-body">
            {children}
        </div>
    )
}

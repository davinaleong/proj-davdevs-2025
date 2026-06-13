import type { Metadata } from "next"
import "@fontsource-variable/montserrat/wght.css"
import "@fontsource-variable/source-code-pro/wght.css"
import "./styles.css"

export const metadata: Metadata = {
    title: {
        default: "Jesus & AI",
        template: "%s | Jesus & AI",
    },
    description:
        "A faith-filled exploration of artificial intelligence through a biblical lens. By Davina Leong.",
}

export default function JesusAndAiLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="jai-body">
            {children}
        </div>
    )
}

import { ArrowLeft } from "lucide-react"
import Section from "./Section"
import Anchor from "./Anchor"

export default function ComingSoon() {
    return (
        <Section>
            <div className="text-center flow">
                <p className="text-4xl lg:text-6xl font-bold">Coming Soon!</p>
                <p>
                    <Anchor href="/" className="inline-flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Anchor>
                </p>
            </div>
        </Section>
    )
}
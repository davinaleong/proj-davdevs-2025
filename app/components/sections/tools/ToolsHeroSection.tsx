import HeroSection from "../../HeroSection"

export default function ToolsHeroSection() {
    return (
        <HeroSection variant="gradient" height="half">
            <div className="flow">
                <h1 className="text-3xl lg:text-6xl font-bold">Tools & Utilities 🛠️</h1>
                <p className="lg:text-xl">Discover a variety of practical tools designed to enhance your productivity, creativity, and daily tasks.</p>
            </div>
        </HeroSection>
    )
}
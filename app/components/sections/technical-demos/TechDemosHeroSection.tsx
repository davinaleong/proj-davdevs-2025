import HeroSection from "../../HeroSection"

export default function TechDemosHeroSection() {
    return (
        <HeroSection variant="gradient" height="half">
            <div className="flow">
                <h1 className="text-3xl lg:text-6xl font-bold">Technical Demos 🖹</h1>
                <p className="lg:text-xl">Sample documents designed for testing duplicate paragraph detection and content comparison across multiple MDX files.</p>
            </div>
        </HeroSection>
    )
}
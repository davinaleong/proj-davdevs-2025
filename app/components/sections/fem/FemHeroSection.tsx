import HeroSection from "../../HeroSection"

export default function FemHeroSection() {
    return (
        <HeroSection variant="gradient" height="half">
            <div className="flow">
                <h1 className="text-3xl lg:text-6xl font-bold">Frontend Mentor Solutions 🎯</h1>
                <p className="lg:text-xl">A curated collection of Frontend Mentor challenges—crafted with clean code, thoughtful UI, and real-world best practices.</p>
            </div>
        </HeroSection>
    )
}
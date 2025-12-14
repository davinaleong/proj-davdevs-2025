import HeroSection from "../../HeroSection"

export default function FaithHeroSection() {
    return (
        <HeroSection variant="gradient" height="half">
            <div className="flow">
                <h1 className="text-3xl lg:text-6xl font-bold">Messages of Faith 🙏✨</h1>
                <p className="lg:text-xl">Discover hope, inspiration, and spiritual growth through heartfelt messages that encourage your journey of faith.</p>
            </div>
        </HeroSection>
    )
}
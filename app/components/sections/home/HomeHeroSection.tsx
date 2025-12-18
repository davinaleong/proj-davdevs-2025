import HeroSection from './../../HeroSection'

export default function HomeHeroSection() {
    return (
        <HeroSection variant="gradient">
            <div className="flow">
                <h1 className="text-4xl lg:text-8xl font-bold">Dav/Devs</h1>
                <p className="lg:text-xl">Designing with purpose. Building with code. Living by faith in <strong>Christ Jesus</strong>.</p>
            </div>
        </HeroSection>
    )
}
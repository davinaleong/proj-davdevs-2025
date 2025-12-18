import HeroSection from "../../HeroSection"
import { getHeroContent } from "../../../utils/site-config"

export default function FemHeroSection() {
    const content = getHeroContent('fem')
    
    if (!content) {
        return null
    }
    
    return (
        <HeroSection variant={content.variant} height={content.height}>
            <div className="flow">
                <h1 className="text-3xl lg:text-6xl font-bold">{content.title}</h1>
                <p className="lg:text-xl">{content.description}</p>
            </div>
        </HeroSection>
    )
}
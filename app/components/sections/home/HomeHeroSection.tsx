import HeroSection from './../../HeroSection'
import { getHeroContent } from '../../../utils/site-config'

export default function HomeHeroSection() {
    const content = getHeroContent('home')
    
    if (!content) {
        return null
    }
    
    return (
        <HeroSection variant={content.variant} height={content.height}>
            <div className="flow">
                <h1 className="text-4xl lg:text-8xl font-bold">{content.title}</h1>
                <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: content.description }} />
            </div>
        </HeroSection>
    )
}
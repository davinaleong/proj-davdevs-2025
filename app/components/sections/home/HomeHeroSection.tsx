import HeroSection from './../../HeroSection'
import { TypingAnimation } from '../../animations'
import { getHeroContent } from '../../../utils/site-config'

export default function HomeHeroSection() {
    const content = getHeroContent('home')
    
    if (!content) {
        return null
    }
    
    return (
        <HeroSection variant={content.variant} height={content.height} showArrow={true} arrowHref="#professional">
            <div className="flow">
                <h1 className="text-4xl lg:text-8xl font-bold">
                    <TypingAnimation>{content.title}</TypingAnimation>
                </h1>
                <p className="lg:text-xl">
                    <TypingAnimation>Designing with purpose. Building with code. Living by faith in Christ Jesus.</TypingAnimation>
                </p>
            </div>
        </HeroSection>
    )
}
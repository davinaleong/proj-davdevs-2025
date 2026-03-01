import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getEnhancedPostsByType } from "../utils/enhanced-content"
import { getHeroContent } from "../utils/site-config"

export default function Tools() {
    // Get all tools posts on server side
    const allTools = getEnhancedPostsByType('tools')
    const heroContent = getHeroContent('tools')

    return (
        <div>
            {heroContent && (
                <HeroSection variant={heroContent.variant} height={heroContent.height} showArrow={true} arrowHref="#list">
                    <div className="flow">
                        <h1 className="text-3xl lg:text-6xl font-bold">{heroContent.title}</h1>
                        <p className="lg:text-xl">{heroContent.description}</p>
                    </div>
                </HeroSection>
            )}
            <PostsList 
                id="list"
                posts={allTools} 
                postType="tools"
                searchPlaceholder="Search tools..."
                baseHref="/tools"
            />
        </div>
    )
}
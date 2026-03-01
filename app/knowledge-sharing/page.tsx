import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getEnhancedPostsByType } from "../utils/enhanced-content"
import { getHeroContent } from "../utils/site-config"

export default function KnowledgeSharing() {
    // Get all sermon posts on server side
    const allKnowledgeSharing = getEnhancedPostsByType('knowledge-sharing')
    const heroContent = getHeroContent('knowledge-sharing')

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
                posts={allKnowledgeSharing} 
                postType="knowledge-sharing"
                searchPlaceholder="Search knowledge sharing..."
                baseHref="/knowledge-sharing"
            />
        </div>
    )
}
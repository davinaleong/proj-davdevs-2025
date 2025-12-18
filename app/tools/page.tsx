import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"
import { getHeroContent } from "../utils/hero-content"

export default function Tools() {
    // Get all tools posts on server side
    const allTools = getPostsByType('tools')
    const heroContent = getHeroContent('tools')

    return (
        <div>
            {heroContent && (
                <HeroSection variant={heroContent.variant} height={heroContent.height}>
                    <div className="flow">
                        <h1 className="text-3xl lg:text-6xl font-bold">{heroContent.title}</h1>
                        <p className="lg:text-xl">{heroContent.description}</p>
                    </div>
                </HeroSection>
            )}
            <PostsList 
                posts={allTools} 
                postType="tools"
                searchPlaceholder="Search tools..."
                baseHref="/tools"
            />
        </div>
    )
}
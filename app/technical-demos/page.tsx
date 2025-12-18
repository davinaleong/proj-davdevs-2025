import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"
import { getHeroContent } from "../utils/site-config"

export default function TechnicalDemosPage() {
    // Get all technical demo posts on server side
    const allTechDemos = getPostsByType('technical-demos')
    const heroContent = getHeroContent('technical-demos')

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
                posts={allTechDemos} 
                postType="technical-demos"
                searchPlaceholder="Search technical demos..."
                baseHref="/technical-demos"
            />
        </div>
    )
}
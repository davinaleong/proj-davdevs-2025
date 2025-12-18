import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"
import { getHeroContent } from "../utils/site-config"

export default function FemSolutions() {
    // Get all fem posts on server side
    const allSolutions = getPostsByType('fem')
    const heroContent = getHeroContent('fem')

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
                posts={allSolutions} 
                postType="fem"
                searchPlaceholder="Search solutions..."
                baseHref="/fem"
            />
        </div>
    )
}
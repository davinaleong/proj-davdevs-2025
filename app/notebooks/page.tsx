import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"
import { getHeroContent } from "../utils/site-config"

export default function Notebooks() {
    // Get all notebooks posts on server side
    const allNotebooks = getPostsByType('notebooks')
    const heroContent = getHeroContent('notebooks')

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
                posts={allNotebooks} 
                postType="notebooks"
                searchPlaceholder="Search notebooks..."
                baseHref="/notebooks"
            />
        </div>
    )
}
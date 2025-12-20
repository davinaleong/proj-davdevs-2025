import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"
import { getHeroContent } from "../utils/site-config"

export default function Articles() {
    // Get all sermon posts on server side
    const allArticles = getPostsByType('articles')
    const heroContent = getHeroContent('Articles')

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
                posts={allArticles} 
                postType="articles"
                searchPlaceholder="Search articles..."
                baseHref="/articles"
            />
        </div>
    )
}
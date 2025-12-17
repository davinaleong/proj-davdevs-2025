import TechDemosHeroSection from "../components/sections/technical-demos/TechDemosHeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function TechnicalDemo() {
    // Get all sermon posts on server side
    const allTechDemos = getPostsByType('technical-demos')

    return (
        <div>
            <TechDemosHeroSection />
            <PostsList 
                posts={allTechDemos} 
                postType="technical-demos"
                searchPlaceholder="Search technical demos..."
                baseHref="/technical-demos"
            />
        </div>
    )
}
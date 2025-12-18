import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function TechnicalDemosPage() {
    // Get all sermon posts on server side
    const allTechDemos = getPostsByType('technical-demos')

    return (
        <div>
            <HeroSection variant="gradient" height="half">
                <div className="flow">
                    <h1 className="text-3xl lg:text-6xl font-bold">Technical Demos 🖹</h1>
                    <p className="lg:text-xl">Sample documents designed for testing duplicate paragraph detection and content comparison across multiple MDX files.</p>
                </div>
            </HeroSection>
            <PostsList 
                posts={allTechDemos} 
                postType="technical-demos"
                searchPlaceholder="Search technical demos..."
                baseHref="/technical-demos"
            />
        </div>
    )
}
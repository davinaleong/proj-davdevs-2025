import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function Tools() {
    // Get all sermon posts on server side
    const allTools = getPostsByType('tools')

    return (
        <div>
            <HeroSection variant="gradient" height="half">
                <div className="flow">
                    <h1 className="text-3xl lg:text-6xl font-bold">Tools & Utilities 🛠️</h1>
                    <p className="lg:text-xl">Discover a variety of practical tools designed to enhance your productivity, creativity, and daily tasks.</p>
                </div>
            </HeroSection>
            <PostsList 
                posts={allTools} 
                postType="tools"
                searchPlaceholder="Search tools..."
                baseHref="/tools"
            />
        </div>
    )
}
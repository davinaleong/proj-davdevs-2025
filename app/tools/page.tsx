import ToolsHeroSection from "../components/sections/tools/ToolsHeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function Tools() {
    // Get all sermon posts on server side
    const allTools = getPostsByType('tools')

    return (
        <div>
            <ToolsHeroSection />
            <PostsList 
                posts={allTools} 
                postType="tools"
                searchPlaceholder="Search tools..."
                baseHref="/tools"
            />
        </div>
    )
}
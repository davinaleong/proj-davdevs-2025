import FaithHeroSection from "../components/sections/faith/FaithHeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function Faith() {
    // Get all sermon posts on server side
    const allSermons = getPostsByType('sermons')

    return (
        <div>
            <FaithHeroSection />
            <PostsList 
                posts={allSermons} 
                postType="sermons"
                searchPlaceholder="Search sermons..."
                baseHref="/faith"
            />
        </div>
    )
}
import FemHeroSection from "../components/sections/fem/FemHeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function FemSolutions() {
    // Get all sermon posts on server side
    const allSolutions = getPostsByType('fem')

    return (
        <div>
            <FemHeroSection />
            <PostsList 
                posts={allSolutions} 
                postType="fem"
                searchPlaceholder="Search solutions..."
                baseHref="/fem"
            />
        </div>
    )
}